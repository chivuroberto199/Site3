from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles # <-- Add this
from fastapi.responses import FileResponse  # <-- Add this
from dotenv import load_dotenv
# ... (rest of your imports stay the same)
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
# --- FRONTEND SERVING LOGIC ---

# ROOT_DIR is your 'backend' folder. 
# .parent takes us to the main project folder.
# Then we go into 'frontend', and finally into 'build'.
FRONTEND_DIR = ROOT_DIR.parent / "frontend" / "build"

if FRONTEND_DIR.exists():
    # Catch-all route to serve the React app
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        file_path = FRONTEND_DIR / full_path
        
        # If the browser asks for a specific file (like CSS, JS, or images), serve it
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        
        # For everything else, serve the React index.html and let React handle the routing
        return FileResponse(FRONTEND_DIR / "index.html")
else:
    logger.warning(f"Frontend folder not found at {FRONTEND_DIR}. Check the path!")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
