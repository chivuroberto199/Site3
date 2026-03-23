import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BacktrackingPage from "./pages/BacktrackingPage";
import DivideImperaPage from "./pages/DivideImperaPage";
import ComparatiePage from "./pages/ComparatiePage";
import BibliografiePage from "./pages/BibliografiePage";

function App() {
  return (
    <div className="App min-h-screen bg-[#020617]">
      <div className="noise-overlay" />
      <BrowserRouter>
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/backtracking" element={<BacktrackingPage />} />
            <Route path="/divide-et-impera" element={<DivideImperaPage />} />
            <Route path="/comparatie" element={<ComparatiePage />} />
            <Route path="/bibliografie" element={<BibliografiePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
