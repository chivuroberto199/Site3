import { motion } from "framer-motion";
import { Scale, GitBranch, Split, CheckCircle, XCircle, ArrowRight, Clock, Database, Target } from "lucide-react";
import { Link } from "react-router-dom";

const ComparatiePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const comparisonData = [
    {
      aspect: "Principiu de bază",
      backtracking: "Explorare exhaustivă cu revenire la impas",
      divideImpera: "Împarte, rezolvă recursiv, combină",
    },
    {
      aspect: "Abordare",
      backtracking: "Încercare și eroare (trial & error)",
      divideImpera: "Descompunere structurată",
    },
    {
      aspect: "Spațiul soluțiilor",
      backtracking: "Explorează toate posibilitățile",
      divideImpera: "Rezolvă subprobleme independente",
    },
    {
      aspect: "Tip de probleme",
      backtracking: "Probleme de decizie, optimizare combinatorială",
      divideImpera: "Sortare, căutare, probleme geometrice",
    },
    {
      aspect: "Structura soluției",
      backtracking: "Construită incremental",
      divideImpera: "Combinată din soluții parțiale",
    },
    {
      aspect: "Complexitate tipică",
      backtracking: "O(n!) sau O(2ⁿ) - exponențială",
      divideImpera: "O(n log n) - polilogaritmică",
    },
    {
      aspect: "Memorie",
      backtracking: "O(n) pentru stiva de recursie",
      divideImpera: "O(n) sau O(log n) depinde de algoritm",
    },
    {
      aspect: "Optimizare",
      backtracking: "Pruning (tăierea ramurilor)",
      divideImpera: "Alegerea punctului de împărțire",
    },
  ];

  const backtrackingProblems = [
    "Problema celor N Dame",
    "Generarea permutărilor",
    "Problema rucsacului (varianta 0/1)",
    "Sudoku solver",
    "Generarea submulțimilor",
    "Problema labirintului",
    "Colorarea grafurilor",
  ];

  const divideImperaProblems = [
    "MergeSort",
    "QuickSort",
    "Căutare binară",
    "Înmulțirea matricelor (Strassen)",
    "Closest pair of points",
    "Turnurile din Hanoi",
    "Calculul puterii (exponențiere rapidă)",
  ];

  return (
    <div data-testid="comparatie-page" className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 border-b border-slate-800">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Scale className="w-6 h-6 text-purple-400" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-outfit font-bold text-slate-100">
                Comparație
              </h1>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed">
              Deși ambele tehnici folosesc recursivitatea, Backtracking și Divide et Impera 
              abordează problemele în mod fundamental diferit. Înțelegerea acestor diferențe 
              te va ajuta să alegi tehnica potrivită pentru fiecare problemă.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visual Comparison */}
      <section className="py-12 border-b border-slate-800">
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Backtracking Card */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
                    <GitBranch className="w-6 h-6 text-rose-400" />
                  </div>
                  <h2 className="text-2xl font-outfit font-bold text-slate-100">Backtracking</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-200">Scop</p>
                      <p className="text-sm text-slate-400">Găsește toate soluțiile sau o soluție validă</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-200">Complexitate</p>
                      <p className="text-sm text-slate-400">Exponențială - O(n!) sau O(2ⁿ)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-200">Memorie</p>
                      <p className="text-sm text-slate-400">O(n) - stiva de recursie</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-900/50 rounded-xl">
                  <p className="text-sm text-slate-300 italic">
                    "Încearcă toate căile posibile și revino când ajungi într-o fundătură."
                  </p>
                </div>

                <Link
                  to="/backtracking"
                  className="mt-6 inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 text-sm font-medium"
                >
                  Explorează Backtracking
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Divide et Impera Card */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Split className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-outfit font-bold text-slate-100">Divide et Impera</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-200">Scop</p>
                      <p className="text-sm text-slate-400">Rezolvă eficient prin descompunere</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-200">Complexitate</p>
                      <p className="text-sm text-slate-400">Polilogaritmică - O(n log n)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-200">Memorie</p>
                      <p className="text-sm text-slate-400">O(n) sau O(log n)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-900/50 rounded-xl">
                  <p className="text-sm text-slate-300 italic">
                    "Împarte problema, rezolvă părțile, combină soluțiile."
                  </p>
                </div>

                <Link
                  to="/divide-et-impera"
                  className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                >
                  Explorează Divide et Impera
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 border-b border-slate-800">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-outfit font-bold text-slate-100 mb-8">
              Tabel Comparativ Detaliat
            </h2>

            <div className="overflow-x-auto">
              <table className="comparison-table w-full">
                <thead>
                  <tr>
                    <th className="text-slate-300 font-outfit">Aspect</th>
                    <th className="text-rose-400 font-outfit">
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-4 h-4" />
                        Backtracking
                      </div>
                    </th>
                    <th className="text-cyan-400 font-outfit">
                      <div className="flex items-center gap-2">
                        <Split className="w-4 h-4" />
                        Divide et Impera
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="font-medium text-slate-200">{row.aspect}</td>
                      <td className="text-slate-400">{row.backtracking}</td>
                      <td className="text-slate-400">{row.divideImpera}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problems Lists */}
      <section className="py-12 border-b border-slate-800">
        <div className="page-container">
          <h2 className="text-2xl font-outfit font-bold text-slate-100 mb-8">
            Probleme Tipice
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Backtracking Problems */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <GitBranch className="w-5 h-5 text-rose-400" />
                <h3 className="text-lg font-semibold text-slate-100">Probleme Backtracking</h3>
              </div>
              <ul className="space-y-2">
                {backtrackingProblems.map((problem, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-400">
                    <span className="w-6 h-6 rounded bg-rose-500/20 text-rose-400 text-xs flex items-center justify-center font-mono">
                      {index + 1}
                    </span>
                    {problem}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Divide et Impera Problems */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Split className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-slate-100">Probleme Divide et Impera</h3>
              </div>
              <ul className="space-y-2">
                {divideImperaProblems.map((problem, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-400">
                    <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">
                      {index + 1}
                    </span>
                    {problem}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* When to Use */}
      <section className="py-12">
        <div className="page-container">
          <h2 className="text-2xl font-outfit font-bold text-slate-100 mb-8">
            Când să folosești fiecare tehnică?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-rose-400 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Folosește Backtracking când:
              </h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Trebuie să găsești TOATE soluțiile
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Problema are constrângeri care elimină multe variante
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Spațiul de căutare este finit dar mare
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Problema implică alegeri secvențiale
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Folosește Divide et Impera când:
              </h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Problema se poate împărți în subprobleme independente
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Soluțiile subproblemelor se pot combina eficient
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Ai nevoie de performanță bună (O(n log n))
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✓</span>
                  Problema are structură recursivă naturală
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComparatiePage;
