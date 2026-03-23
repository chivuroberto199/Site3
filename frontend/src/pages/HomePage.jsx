import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GitBranch, Split, ArrowRight, Code2, Sparkles, BookOpen, Users } from "lucide-react";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div data-testid="home-page" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="page-container relative z-10"
        >
          {/* Main Title */}
          <motion.div variants={itemVariants} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Tehnici Algoritmice Fundamentale
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-outfit font-black tracking-tight text-slate-100 leading-tight">
              Backtracking &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">
                Divide et Impera
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">
              Explorează cele mai importante tehnici de programare prin animații interactive, 
              exemple practice în C++ și exerciții care te vor ajuta să înțelegi în profunzime 
              cum funcționează acești algoritmi.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/backtracking"
                data-testid="start-backtracking-btn"
                className="btn-primary inline-flex items-center gap-2"
              >
                Începe cu Backtracking
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/divide-et-impera"
                data-testid="start-divide-btn"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Divide et Impera
                <Split className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="page-container"
        >
          <motion.h2 variants={itemVariants} className="text-2xl lg:text-3xl font-outfit font-bold text-slate-100 mb-12">
            Ce vei învăța
          </motion.h2>

          <div className="bento-grid">
            {/* Backtracking Card - Large */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-7 bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 rounded-2xl p-8 group hover:border-rose-500/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                  <GitBranch className="w-7 h-7 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">Backtracking</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Tehnica de explorare sistematică a tuturor soluțiilor posibile, 
                    cu revenire în caz de impas. Problemele clasice: N-Dame, Permutări, 
                    Labirint, Submulțimi.
                  </p>
                  <Link 
                    to="/backtracking" 
                    className="inline-flex items-center gap-2 mt-4 text-rose-400 hover:text-rose-300 transition-colors text-sm font-medium"
                  >
                    Explorează
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-5 bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-bold font-mono text-cyan-400">5+</p>
                  <p className="text-sm text-slate-500 mt-1">Algoritmi explicați</p>
                </div>
                <div>
                  <p className="text-4xl font-bold font-mono text-emerald-400">10+</p>
                  <p className="text-sm text-slate-500 mt-1">Animații interactive</p>
                </div>
                <div>
                  <p className="text-4xl font-bold font-mono text-rose-400">15+</p>
                  <p className="text-sm text-slate-500 mt-1">Exemple cod C++</p>
                </div>
                <div>
                  <p className="text-4xl font-bold font-mono text-amber-400">20+</p>
                  <p className="text-sm text-slate-500 mt-1">Întrebări quiz</p>
                </div>
              </div>
            </motion.div>

            {/* Divide et Impera Card - Large */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-5 bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-2xl p-8 group hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Split className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">Divide et Impera</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Strategia de a împărți problema în subprobleme mai mici, 
                    a le rezolva recursiv și a combina soluțiile.
                  </p>
                  <Link 
                    to="/divide-et-impera" 
                    className="inline-flex items-center gap-2 mt-4 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                  >
                    Explorează
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Interactive Learning Card */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-7 bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">Învățare Interactivă</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Vizualizează pas cu pas execuția algoritmilor. Introdu propriile tale date 
                    și vezi cum funcționează codul în timp real. Testează-ți cunoștințele 
                    cu quiz-uri tematice.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Authors Section */}
      <section className="py-16 lg:py-24 border-t border-slate-800">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="page-container"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-12">
            <Users className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl lg:text-3xl font-outfit font-bold text-slate-100">
              Realizatori
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                  CR
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">Chivu Roberto Alexandru</h3>
                  <p className="text-slate-500">Co-autor</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Pasionat de algoritmică și structuri de date, cu focus pe tehnici avansate 
                de programare și optimizare.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-rose-500/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center text-2xl font-bold text-white">
                  IA
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">Iorga Alexandru Cristian</h3>
                  <p className="text-slate-500">Co-autor</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Dedicat învățării și predării conceptelor fundamentale de programare 
                într-un mod accesibil și interactiv.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="page-container"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-rose-500/10 border border-slate-800 rounded-3xl p-8 lg:p-12 text-center">
            <BookOpen className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-2xl lg:text-3xl font-outfit font-bold text-slate-100 mb-4">
              Pregătit să începi?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Alege una din tehnicile de programare și începe să explorezi 
              lumea fascinantă a algoritmilor!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/backtracking"
                data-testid="cta-backtracking-btn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500/20 text-rose-400 rounded-xl hover:bg-rose-500/30 transition-colors font-medium"
              >
                <GitBranch className="w-5 h-5" />
                Backtracking
              </Link>
              <Link
                to="/divide-et-impera"
                data-testid="cta-divide-btn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors font-medium"
              >
                <Split className="w-5 h-5" />
                Divide et Impera
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
