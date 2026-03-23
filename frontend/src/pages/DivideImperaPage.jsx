import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Split, Info, Lightbulb, Search, ArrowDownUp } from "lucide-react";
import IdeCodeRunner from "../components/IdeCodeRunner";
import { QuizSection } from "../components/QuizCard";
import InteractiveInputBox, { validateArrayInput } from "../components/InteractiveInputBox";
import { ArrayVisualizer } from "../components/AlgorithmVisualizer";

// MergeSort C++ Code
const mergeSortCode = `#include <iostream>
using namespace std;

int a[100], n;

void interclasare(int st, int mij, int dr) {
    int b[100], i = st, j = mij + 1, k = 0;
    while(i <= mij && j <= dr) {
        if(a[i] <= a[j])
            b[k++] = a[i++];
        else
            b[k++] = a[j++];
    }
    while(i <= mij) b[k++] = a[i++];
    while(j <= dr) b[k++] = a[j++];
    for(i = st, k = 0; i <= dr; i++, k++)
        a[i] = b[k];
}

void mergeSort(int st, int dr) {
    if(st < dr) {
        int mij = (st + dr) / 2;
        mergeSort(st, mij);
        mergeSort(mij + 1, dr);
        interclasare(st, mij, dr);
    }
}

int main() {
    cin >> n;
    for(int i = 0; i < n; i++) cin >> a[i];
    mergeSort(0, n - 1);
    for(int i = 0; i < n; i++) cout << a[i] << " ";
    return 0;
}`;

const mergeSortExplanations = [
  "Includem biblioteca standard",
  "Declarăm vectorul a și dimensiunea n",
  "Funcția de interclasare - combină două subșiruri sortate",
  "Inițializăm indicii: i pentru stânga, j pentru dreapta, k pentru rezultat",
  "Cât timp avem elemente în ambele jumătăți",
  "Dacă elementul din stânga e mai mic sau egal",
  "Îl adăugăm în vectorul rezultat",
  "Altfel, adăugăm elementul din dreapta",
  "Copiem elementele rămase din prima jumătate",
  "Copiem elementele rămase din a doua jumătate",
  "Copiem rezultatul înapoi în vectorul original",
  "Funcția principală MergeSort",
  "Condiția de bază: dacă mai avem ce împărți",
  "Calculăm mijlocul",
  "Sortăm recursiv prima jumătate (DIVIDE)",
  "Sortăm recursiv a doua jumătate (DIVIDE)",
  "Combinăm cele două jumătăți sortate (IMPERA)",
  "Funcția main - citim și afișăm",
];

// Binary Search C++ Code
const binarySearchCode = `#include <iostream>
using namespace std;

int a[100], n, x;

int cautareBinara(int st, int dr, int x) {
    if(st > dr)
        return -1;  // Element negăsit
    
    int mij = (st + dr) / 2;
    
    if(a[mij] == x)
        return mij;  // Am găsit elementul
    else if(a[mij] > x)
        return cautareBinara(st, mij - 1, x);
    else
        return cautareBinara(mij + 1, dr, x);
}

int main() {
    cin >> n;
    for(int i = 0; i < n; i++) cin >> a[i];
    cin >> x;
    
    int poz = cautareBinara(0, n - 1, x);
    
    if(poz == -1)
        cout << "Element negasit";
    else
        cout << "Gasit pe pozitia " << poz;
    return 0;
}`;

const binarySearchExplanations = [
  "Includem biblioteca standard",
  "Declarăm vectorul, dimensiunea și elementul căutat",
  "Funcția de căutare binară recursivă",
  "Condiția de bază: dacă st > dr, elementul nu există",
  "Returnăm -1 pentru element negăsit",
  "Calculăm mijlocul intervalului",
  "Dacă am găsit elementul la mijloc",
  "Returnăm poziția (succes!)",
  "Dacă elementul căutat e mai mic decât mijlocul",
  "Căutăm recursiv în jumătatea stângă",
  "Altfel, căutăm în jumătatea dreaptă",
  "Funcția main",
  "Citim vectorul sortat",
  "Citim elementul de căutat",
  "Apelăm căutarea binară",
  "Afișăm rezultatul",
];

// Quiz Data
const divideImperaQuizzes = [
  {
    question: "Care este principiul de bază al tehnicii Divide et Impera?",
    options: [
      "Sortarea datelor",
      "Împarte problema în subprobleme mai mici, rezolvă-le și combină soluțiile",
      "Căutarea secvențială",
      "Memorarea rezultatelor intermediare"
    ],
    correctIndex: 1,
    explanation: "Divide et Impera împarte problema în subprobleme mai mici (DIVIDE), le rezolvă recursiv, apoi combină soluțiile (IMPERA)."
  },
  {
    question: "Care este complexitatea temporală a algoritmului MergeSort?",
    options: [
      "O(n)",
      "O(n²)",
      "O(n log n)",
      "O(log n)"
    ],
    correctIndex: 2,
    explanation: "MergeSort are complexitate O(n log n) în toate cazurile, deoarece împărțirea se face în log n nivele, iar interclasarea durează O(n) la fiecare nivel."
  },
  {
    question: "De ce căutarea binară necesită un vector sortat?",
    options: [
      "Pentru eficiență",
      "Pentru că compară elementul căutat cu mijlocul și decide în care jumătate să continue",
      "Nu necesită vector sortat",
      "Pentru a folosi mai puțină memorie"
    ],
    correctIndex: 1,
    explanation: "Căutarea binară compară elementul căutat cu cel din mijloc și decide în care jumătate să continue. Această decizie e corectă doar dacă vectorul e sortat."
  },
  {
    question: "Ce rol are funcția de interclasare în MergeSort?",
    options: [
      "Împarte vectorul în două",
      "Combină două subșiruri sortate într-unul singur sortat",
      "Caută elementul minim",
      "Numără elementele"
    ],
    correctIndex: 1,
    explanation: "Interclasarea (merge) combină două subșiruri deja sortate într-un singur șir sortat, în timp liniar."
  },
  {
    question: "Care este complexitatea căutării binare?",
    options: [
      "O(n)",
      "O(n²)",
      "O(n log n)",
      "O(log n)"
    ],
    correctIndex: 3,
    explanation: "Căutarea binară are complexitate O(log n) deoarece la fiecare pas înjumătățim spațiul de căutare."
  }
];

const DivideImperaPage = () => {
  const [activeTab, setActiveTab] = useState("mergesort");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  
  // MergeSort visualization state
  const [array, setArray] = useState([38, 27, 43, 3, 9, 82, 10]);
  const [highlightIndices, setHighlightIndices] = useState([]);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  
  // Binary Search state
  const [searchArray] = useState([3, 9, 10, 27, 38, 43, 82]);
  const [searchTarget] = useState(27);
  const [searchRange, setSearchRange] = useState({ left: 0, right: 6 });
  const [midIndex, setMidIndex] = useState(-1);

  // MergeSort animation steps
  const mergeSortSteps = [
    { array: [38, 27, 43, 3, 9, 82, 10], highlight: [], comparing: [], sorted: [], line: 12, desc: "Vector inițial - începem sortarea" },
    { array: [38, 27, 43, 3, 9, 82, 10], highlight: [0, 1, 2, 3], comparing: [], sorted: [], line: 13, desc: "Împărțim: prima jumătate [38, 27, 43, 3]" },
    { array: [38, 27, 43, 3, 9, 82, 10], highlight: [0, 1], comparing: [], sorted: [], line: 14, desc: "Împărțim din nou: [38, 27]" },
    { array: [27, 38, 43, 3, 9, 82, 10], highlight: [], comparing: [0, 1], sorted: [0, 1], line: 6, desc: "Interclasăm: 27 < 38 → [27, 38]" },
    { array: [27, 38, 43, 3, 9, 82, 10], highlight: [2, 3], comparing: [], sorted: [0, 1], line: 14, desc: "Procesăm [43, 3]" },
    { array: [27, 38, 3, 43, 9, 82, 10], highlight: [], comparing: [2, 3], sorted: [0, 1, 2, 3], line: 6, desc: "Interclasăm: 3 < 43 → [3, 43]" },
    { array: [3, 27, 38, 43, 9, 82, 10], highlight: [], comparing: [], sorted: [0, 1, 2, 3], line: 16, desc: "Combinăm [27, 38] și [3, 43] → [3, 27, 38, 43]" },
    { array: [3, 27, 38, 43, 9, 82, 10], highlight: [4, 5, 6], comparing: [], sorted: [0, 1, 2, 3], line: 15, desc: "A doua jumătate: [9, 82, 10]" },
    { array: [3, 27, 38, 43, 9, 10, 82], highlight: [], comparing: [5, 6], sorted: [0, 1, 2, 3, 4, 5, 6], line: 6, desc: "Sortăm [9, 82, 10] → [9, 10, 82]" },
    { array: [3, 9, 10, 27, 38, 43, 82], highlight: [], comparing: [], sorted: [0, 1, 2, 3, 4, 5, 6], line: 16, desc: "FINAL: Combinăm totul → Vector sortat!" },
  ];

  // Binary Search animation steps
  const binarySearchSteps = [
    { left: 0, right: 6, mid: 3, line: 5, desc: "Căutăm 27 în [3,9,10,27,38,43,82]. Mijloc = 27. GĂSIT!" },
    { left: 0, right: 6, mid: 3, line: 7, desc: "a[3] = 27 = x. Element găsit pe poziția 3!" },
  ];

  // For a more complex search example
  const binarySearchStepsAlt = [
    { left: 0, right: 6, mid: 3, line: 5, desc: "Căutăm 9. Mijloc = 27. 9 < 27, căutăm în stânga" },
    { left: 0, right: 2, mid: 1, line: 9, desc: "Interval [0,2]. Mijloc = 9. GĂSIT!" },
  ];

  const currentSteps = activeTab === "mergesort" ? mergeSortSteps : binarySearchSteps;
  const currentCode = activeTab === "mergesort" ? mergeSortCode : binarySearchCode;

  const updateVisualization = useCallback((step) => {
    if (activeTab === "mergesort") {
      const stepData = mergeSortSteps[step] || mergeSortSteps[0];
      setArray(stepData.array);
      setHighlightIndices(stepData.highlight);
      setComparingIndices(stepData.comparing);
      setSortedIndices(stepData.sorted);
      setActiveLine(stepData.line ?? -1);
    } else {
      const stepData = binarySearchSteps[step] || binarySearchSteps[0];
      setSearchRange({ left: stepData.left, right: stepData.right });
      setMidIndex(stepData.mid);
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
      }, 2000);
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

  const handleCustomArray = (value) => {
    const result = validateArrayInput(value);
    if (result.valid) {
      setArray(result.data);
      setCurrentStep(0);
      setIsPlaying(false);
      setHighlightIndices([]);
      setComparingIndices([]);
      setSortedIndices([]);
    }
  };

  return (
    <div data-testid="divide-impera-page" className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 border-b border-slate-800">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Split className="w-6 h-6 text-cyan-400" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-outfit font-bold text-slate-100">
                Divide et Impera
              </h1>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed">
              Divide et Impera (lat. "împarte și cucerește") este o paradigmă fundamentală 
              în algoritmică. Strategia constă în împărțirea problemei în subprobleme mai mici, 
              rezolvarea lor recursivă și combinarea soluțiilor pentru a obține rezultatul final.
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

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                  <span className="text-cyan-400 font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">DIVIDE</h3>
                <p className="text-slate-400 text-sm">
                  Împarte problema în subprobleme mai mici, de aceeași natură cu problema inițială.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                  <span className="text-emerald-400 font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">CONQUER</h3>
                <p className="text-slate-400 text-sm">
                  Rezolvă subproblemele recursiv. Când sunt suficient de mici, rezolvă-le direct.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
                  <span className="text-amber-400 font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">COMBINE</h3>
                <p className="text-slate-400 text-sm">
                  Combină soluțiile subproblemelor pentru a obține soluția problemei originale.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">Algoritmi Clasici</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <ArrowDownUp className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="font-medium text-slate-200">MergeSort</p>
                    <p className="text-sm text-slate-500">Sortare prin interclasare - O(n log n)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <Search className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="font-medium text-slate-200">Căutare Binară</p>
                    <p className="text-sm text-slate-500">Căutare eficientă - O(log n)</p>
                  </div>
                </div>
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
              data-testid="tab-mergesort"
              onClick={() => { setActiveTab("mergesort"); handleReset(); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "mergesort"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-slate-800/50 text-slate-400 border border-slate-700 hover:text-slate-300"
              }`}
            >
              <ArrowDownUp className="w-4 h-4 inline mr-2" />
              MergeSort
            </button>
            <button
              data-testid="tab-binarysearch"
              onClick={() => { setActiveTab("binarysearch"); handleReset(); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "binarysearch"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-slate-800/50 text-slate-400 border border-slate-700 hover:text-slate-300"
              }`}
            >
              <Search className="w-4 h-4 inline mr-2" />
              Căutare Binară
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Code Panel */}
            <div>
              <IdeCodeRunner
                code={currentCode}
                activeLine={activeLine}
                title={activeTab === "mergesort" ? "merge_sort.cpp" : "cautare_binara.cpp"}
                explanations={currentSteps.map(s => s.desc)}
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
                  {activeTab === "mergesort" ? "Vizualizare MergeSort" : "Vizualizare Căutare Binară"}
                </h3>
                
                {activeTab === "mergesort" ? (
                  <ArrayVisualizer
                    array={array}
                    highlightIndices={highlightIndices}
                    comparingIndices={comparingIndices}
                    sortedIndices={sortedIndices}
                    label="Vector curent"
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="flex gap-2 justify-center">
                      {searchArray.map((val, i) => {
                        const inRange = i >= searchRange.left && i <= searchRange.right;
                        const isMid = i === midIndex;
                        
                        return (
                          <motion.div
                            key={i}
                            animate={{
                              scale: isMid ? 1.1 : 1,
                              opacity: inRange ? 1 : 0.3,
                            }}
                            className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono text-sm border ${
                              isMid
                                ? "bg-emerald-500/30 border-emerald-500"
                                : inRange
                                ? "bg-cyan-500/20 border-cyan-500/50"
                                : "bg-slate-800 border-slate-700"
                            }`}
                          >
                            {val}
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-500">
                        Căutăm: <span className="text-emerald-400 font-mono">{searchTarget}</span>
                      </p>
                      <p className="text-sm text-slate-500">
                        Interval: [{searchRange.left}, {searchRange.right}] | Mijloc: {midIndex}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step description */}
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-slate-800/50 rounded-xl"
                >
                  <p className="text-sm text-slate-300">
                    {currentSteps[currentStep]?.desc}
                  </p>
                </motion.div>
              </div>

              {/* Custom Input for MergeSort */}
              {activeTab === "mergesort" && (
                <InteractiveInputBox
                  label="Vector personalizat pentru sortare"
                  placeholder="Ex: 5, 2, 8, 1, 9, 3"
                  helperText="Introdu numere separate prin virgulă (2-15 elemente)"
                  validateInput={validateArrayInput}
                  onSubmit={handleCustomArray}
                  defaultValue="38, 27, 43, 3, 9, 82, 10"
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
            title="Test de Cunoștințe - Divide et Impera"
            quizzes={divideImperaQuizzes}
          />
        </div>
      </section>
    </div>
  );
};

export default DivideImperaPage;
