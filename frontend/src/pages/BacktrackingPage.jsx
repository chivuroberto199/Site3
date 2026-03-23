import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GitBranch, Play, Pause, RotateCcw, StepForward, Info, Lightbulb } from "lucide-react";
import IdeCodeRunner from "../components/IdeCodeRunner";
import { QuizSection } from "../components/QuizCard";
import InteractiveInputBox, { validateNQueensInput } from "../components/InteractiveInputBox";
import { NQueensBoard, PermutationVisualizer } from "../components/AlgorithmVisualizer";

// N-Queens C++ Code
const nQueensCode = `#include <iostream>
using namespace std;

int n, sol[100];
bool valid(int k) {
    for(int i = 1; i < k; i++)
        if(sol[i] == sol[k] || 
           abs(sol[i]-sol[k]) == abs(i-k))
            return false;
    return true;
}

void afisare() {
    for(int i = 1; i <= n; i++)
        cout << sol[i] << " ";
    cout << endl;
}

void back(int k) {
    for(int i = 1; i <= n; i++) {
        sol[k] = i;
        if(valid(k)) {
            if(k == n)
                afisare();
            else
                back(k + 1);
        }
    }
}

int main() {
    cin >> n;
    back(1);
    return 0;
}`;

const nQueensExplanations = [
  "Includem biblioteca standard pentru input/output",
  "Declarăm variabilele: n = dimensiunea tablei, sol[] = soluția",
  "Funcția valid() verifică dacă poziția curentă e validă",
  "Parcurgem toate damele plasate anterior",
  "Verificăm: aceeași coloană sau pe aceeași diagonală?",
  "Dacă găsim conflict, returnăm false",
  "Poziția e validă, returnăm true",
  "Funcția de afișare a soluției",
  "Afișăm pozițiile damelor pe fiecare linie",
  "Funcția principală de backtracking",
  "Încercăm fiecare coloană de la 1 la n",
  "Plasăm dama pe coloana i",
  "Verificăm dacă poziția e validă",
  "Dacă am plasat toate damele, afișăm soluția",
  "Altfel, continuăm recursiv cu următoarea damă",
  "Funcția main - citim n și apelăm backtracking",
];

// Permutations C++ Code
const permutationsCode = `#include <iostream>
using namespace std;

int n, p[100], folosit[100];

void afisare() {
    for(int i = 1; i <= n; i++)
        cout << p[i] << " ";
    cout << endl;
}

void back(int k) {
    for(int i = 1; i <= n; i++) {
        if(folosit[i] == 0) {
            p[k] = i;
            folosit[i] = 1;
            if(k == n)
                afisare();
            else
                back(k + 1);
            folosit[i] = 0;
        }
    }
}

int main() {
    cin >> n;
    back(1);
    return 0;
}`;

const permutationsExplanations = [
  "Includem biblioteca pentru I/O",
  "n = numărul de elemente, p[] = permutarea, folosit[] = marcaj",
  "Funcția de afișare a permutării curente",
  "Afișăm elementele permutării",
  "Funcția de backtracking - generează permutările",
  "Parcurgem toate valorile posibile de la 1 la n",
  "Verificăm dacă valoarea i nu a fost folosită",
  "Adăugăm i în permutare pe poziția k",
  "Marcăm i ca fiind folosit",
  "Dacă permutarea e completă, o afișăm",
  "Altfel, continuăm recursiv cu poziția k+1",
  "La revenire, demarcăm i (backtrack!)",
  "Main: citim n și începem backtracking de la poziția 1",
];

// Backtracking Quiz Data
const backtrackingQuizzes = [
  {
    question: "Ce este backtracking-ul?",
    options: [
      "O metodă de sortare a datelor",
      "O tehnică de căutare exhaustivă cu revenire",
      "Un algoritm de căutare binară",
      "O structură de date"
    ],
    correctIndex: 1,
    explanation: "Backtracking-ul este o tehnică de căutare exhaustivă care explorează toate soluțiile posibile, revenind (backtrack) când ajunge într-o fundătură."
  },
  {
    question: "În problema N-Dame, de ce verificăm diagonalele?",
    options: [
      "Pentru eficiență",
      "Pentru că damele atacă pe diagonală în șah",
      "Nu e necesar să verificăm diagonalele",
      "Pentru a evita soluțiile duplicate"
    ],
    correctIndex: 1,
    explanation: "În șah, dama poate ataca pe orizontală, verticală și diagonală. Verificăm diagonalele pentru a ne asigura că damele nu se atacă reciproc."
  },
  {
    question: "Care este complexitatea temporală a generării permutărilor?",
    options: [
      "O(n)",
      "O(n²)",
      "O(n!)",
      "O(2ⁿ)"
    ],
    correctIndex: 2,
    explanation: "Generarea tuturor permutărilor are complexitate O(n!) deoarece există n! permutări posibile pentru n elemente."
  },
  {
    question: "Ce înseamnă 'a face backtrack'?",
    options: [
      "A continua pe aceeași cale",
      "A reveni la starea anterioară și a încerca o altă variantă",
      "A opri algoritmul",
      "A găsi soluția optimă"
    ],
    correctIndex: 1,
    explanation: "A face backtrack înseamnă a reveni la starea anterioară după ce am descoperit că calea curentă nu duce la o soluție validă."
  },
  {
    question: "De ce folosim vectorul 'folosit' la permutări?",
    options: [
      "Pentru a sorta elementele",
      "Pentru a marca elementele deja incluse în permutare",
      "Pentru a număra soluțiile",
      "Nu e necesar acest vector"
    ],
    correctIndex: 1,
    explanation: "Vectorul 'folosit' marchează elementele deja incluse în permutarea curentă, pentru a nu le repeta."
  }
];

const BacktrackingPage = () => {
  const [activeTab, setActiveTab] = useState("nqueens");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  
  // N-Queens state
  const [boardSize, setBoardSize] = useState(4);
  const [queens, setQueens] = useState([]);
  const [currentRow, setCurrentRow] = useState(-1);
  const [conflicts, setConflicts] = useState([]);
  
  // Permutation state
  const [permutation, setPermutation] = useState([]);
  const [available, setAvailable] = useState([1, 2, 3]);

  // Animation steps for N-Queens visualization
  const nQueensSteps = [
    { queens: [], row: 0, line: 10, desc: "Începem cu tabla goală, încercăm să plasăm prima damă" },
    { queens: [0], row: 0, line: 11, desc: "Plasăm dama pe linia 1, coloana 1" },
    { queens: [0], row: 1, line: 10, desc: "Trecem la linia 2" },
    { queens: [0, 2], row: 1, line: 12, desc: "Dama pe linia 2, coloana 3 - validă!" },
    { queens: [0, 2], row: 2, line: 10, desc: "Trecem la linia 3" },
    { queens: [0, 2], row: 2, line: 4, desc: "Verificăm coloanele 1,2,3,4 - toate în conflict!", conflicts: [[2,0],[2,1],[2,2],[2,3]] },
    { queens: [0], row: 1, line: 15, desc: "Backtrack! Revenim la linia 2" },
    { queens: [0, 3], row: 1, line: 12, desc: "Încercăm coloana 4 pe linia 2" },
    { queens: [0, 3, 1], row: 2, line: 12, desc: "Linia 3, coloana 2 - validă!" },
    { queens: [0, 3, 1], row: 3, line: 10, desc: "Trecem la linia 4" },
    { queens: [0, 3, 1], row: 3, line: 4, desc: "Toate pozițiile în conflict pe linia 4", conflicts: [[3,0],[3,1],[3,2],[3,3]] },
    { queens: [0, 3], row: 2, line: 15, desc: "Backtrack la linia 3" },
    { queens: [1], row: 0, line: 11, desc: "Backtrack complet, încercăm coloana 2 pe linia 1" },
    { queens: [1, 3], row: 1, line: 12, desc: "Linia 2, coloana 4 - validă!" },
    { queens: [1, 3, 0], row: 2, line: 12, desc: "Linia 3, coloana 1 - validă!" },
    { queens: [1, 3, 0, 2], row: 3, line: 13, desc: "Linia 4, coloana 3 - SOLUȚIE GĂSITĂ!" },
  ];

  const permSteps = [
    { perm: [], avail: [1, 2, 3], line: 5 },
    { perm: [1], avail: [2, 3], line: 7 },
    { perm: [1, 2], avail: [3], line: 7 },
    { perm: [1, 2, 3], avail: [], line: 9 },
    { perm: [1, 2], avail: [3], line: 11 },
    { perm: [1, 3], avail: [2], line: 7 },
    { perm: [1, 3, 2], avail: [], line: 9 },
    { perm: [2], avail: [1, 3], line: 7 },
    { perm: [2, 1], avail: [3], line: 7 },
    { perm: [2, 1, 3], avail: [], line: 9 },
  ];

  const currentSteps = activeTab === "nqueens" ? nQueensSteps : permSteps;
  const currentCode = activeTab === "nqueens" ? nQueensCode : permutationsCode;
  const currentExplanations = activeTab === "nqueens" ? nQueensExplanations : permutationsExplanations;

  const updateVisualization = useCallback((step) => {
    if (activeTab === "nqueens") {
      const stepData = nQueensSteps[step] || nQueensSteps[0];
      setQueens(stepData.queens || []);
      setCurrentRow(stepData.row ?? -1);
      setConflicts(stepData.conflicts || []);
      setActiveLine(stepData.line ?? -1);
    } else {
      const stepData = permSteps[step] || permSteps[0];
      setPermutation(stepData.perm || []);
      setAvailable(stepData.avail || [1, 2, 3]);
      setActiveLine(stepData.line ?? -1);
    }
  }, [activeTab]);

  useEffect(() => {
    updateVisualization(currentStep);
  }, [currentStep, updateVisualization]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= currentSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSteps.length]);

  const handleStep = () => {
    if (currentStep < currentSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    updateVisualization(0);
  };

  const handleCustomInput = (value) => {
    const result = validateNQueensInput(value);
    if (result.valid) {
      setBoardSize(result.data);
      setQueens([]);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  };

  return (
    <div data-testid="backtracking-page" className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 border-b border-slate-800">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
                <GitBranch className="w-6 h-6 text-rose-400" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-outfit font-bold text-slate-100">
                Backtracking
              </h1>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed">
              Backtracking-ul este o tehnică de programare care explorează sistematic 
              toate soluțiile posibile ale unei probleme. Când algoritmul ajunge într-o 
              fundătură (o soluție parțială care nu poate fi extinsă), revine și încearcă 
              o altă cale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Theory Section */}
      <section className="py-12 border-b border-slate-800">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-cyan-400" />
              <h2 className="text-2xl font-outfit font-bold text-slate-100">Concepte Cheie</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-3">Principiul de funcționare</h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1">•</span>
                    Construiește soluția pas cu pas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1">•</span>
                    La fiecare pas, verifică dacă soluția parțială e validă
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1">•</span>
                    Dacă nu e validă, revino și încearcă altă variantă
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1">•</span>
                    Continuă până găsești toate soluțiile
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-3">Probleme Clasice</h3>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">1.</span>
                    Problema celor N dame
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">2.</span>
                    Generarea permutărilor
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">3.</span>
                    Problema labirintului
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">4.</span>
                    Generarea submulțimilor
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-12 border-b border-slate-800">
        <div className="page-container">
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-outfit font-bold text-slate-100">Lecție Interactivă</h2>
          </div>

          {/* Tab Selection */}
          <div className="flex gap-2 mb-8">
            <button
              data-testid="tab-nqueens"
              onClick={() => { setActiveTab("nqueens"); handleReset(); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "nqueens"
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  : "bg-slate-800/50 text-slate-400 border border-slate-700 hover:text-slate-300"
              }`}
            >
              N-Dame
            </button>
            <button
              data-testid="tab-permutations"
              onClick={() => { setActiveTab("permutations"); handleReset(); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "permutations"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-slate-800/50 text-slate-400 border border-slate-700 hover:text-slate-300"
              }`}
            >
              Permutări
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Code Panel */}
            <div>
              <IdeCodeRunner
                code={currentCode}
                activeLine={activeLine}
                title={activeTab === "nqueens" ? "n_dame.cpp" : "permutari.cpp"}
                explanations={activeTab === "nqueens" 
                  ? nQueensSteps.map(s => s.desc) 
                  : permSteps.map((_, i) => `Pas ${i + 1}: Construim permutarea`)
                }
                currentStep={currentStep}
                isPlaying={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onReset={handleReset}
                onStep={handleStep}
              />
            </div>

            {/* Visualization Panel */}
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">
                  {activeTab === "nqueens" ? "Vizualizare Tablă" : "Vizualizare Permutare"}
                </h3>
                
                {activeTab === "nqueens" ? (
                  <div className="flex justify-center">
                    <NQueensBoard
                      size={boardSize}
                      queens={queens}
                      currentRow={currentRow}
                      conflicts={conflicts}
                    />
                  </div>
                ) : (
                  <PermutationVisualizer
                    currentPermutation={permutation}
                    available={available}
                  />
                )}

                {/* Step description */}
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-slate-800/50 rounded-xl"
                >
                  <p className="text-sm text-slate-300">
                    {activeTab === "nqueens" 
                      ? nQueensSteps[currentStep]?.desc 
                      : `Pas ${currentStep + 1}: Construim permutarea ${permutation.join(", ") || "..."}`
                    }
                  </p>
                </motion.div>
              </div>

              {/* Custom Input */}
              {activeTab === "nqueens" && (
                <InteractiveInputBox
                  label="Dimensiune tablă personalizată"
                  placeholder="Introdu N (4-8)"
                  helperText="Introdu un număr între 4 și 8 pentru dimensiunea tablei"
                  validateInput={validateNQueensInput}
                  onSubmit={handleCustomInput}
                  defaultValue="4"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-12">
        <div className="page-container">
          <QuizSection
            title="Test de Cunoștințe - Backtracking"
            quizzes={backtrackingQuizzes}
          />
        </div>
      </section>
    </div>
  );
};

export default BacktrackingPage;
