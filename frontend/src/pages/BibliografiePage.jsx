import { motion } from "framer-motion";
import { BookOpen, ExternalLink, FileText, Video, Globe, GraduationCap } from "lucide-react";

const BibliografiePage = () => {
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

  const books = [
    {
      title: "Introduction to Algorithms (CLRS)",
      authors: "Cormen, Leiserson, Rivest, Stein",
      edition: "4th Edition, 2022",
      description: "Biblia algoritmicii - conține explicații detaliate pentru Backtracking și Divide et Impera.",
      isbn: "978-0262046305",
    },
    {
      title: "Algorithms",
      authors: "Robert Sedgewick, Kevin Wayne",
      edition: "4th Edition, 2011",
      description: "Prezentare clară cu vizualizări și implementări în Java.",
      isbn: "978-0321573513",
    },
    {
      title: "The Algorithm Design Manual",
      authors: "Steven S. Skiena",
      edition: "3rd Edition, 2020",
      description: "Ghid practic pentru proiectarea algoritmilor cu exemple din lumea reală.",
      isbn: "978-3030542559",
    },
    {
      title: "Competiții de Informatică",
      authors: "Emanuela Cerchez, Marinel Șerban",
      edition: "Editura Polirom",
      description: "Manual în limba română cu probleme de olimpiadă, include Backtracking și Divide et Impera.",
      isbn: "978-9734651023",
    },
  ];

  const onlineResources = [
    {
      title: "GeeksforGeeks - Backtracking",
      url: "https://www.geeksforgeeks.org/backtracking-algorithms/",
      type: "Article",
      description: "Colecție completă de probleme și explicații pentru Backtracking.",
    },
    {
      title: "GeeksforGeeks - Divide and Conquer",
      url: "https://www.geeksforgeeks.org/divide-and-conquer/",
      type: "Article",
      description: "Tutoriale detaliate pentru tehnica Divide et Impera.",
    },
    {
      title: "Visualgo - Algorithm Visualizations",
      url: "https://visualgo.net/",
      type: "Interactive",
      description: "Vizualizări interactive pentru algoritmi de sortare și căutare.",
    },
    {
      title: "MIT OpenCourseWare - 6.006",
      url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
      type: "Course",
      description: "Curs gratuit de la MIT despre introducere în algoritmi.",
    },
    {
      title: "CS Dojo - YouTube",
      url: "https://www.youtube.com/c/CSDojo",
      type: "Video",
      description: "Explicații video clare pentru concepte de algoritmică.",
    },
    {
      title: "Abdul Bari - YouTube",
      url: "https://www.youtube.com/channel/UCZCFT11CWBi3MHNlGf019nw",
      type: "Video",
      description: "Tutoriale video detaliate pentru algoritmi și structuri de date.",
    },
  ];

  const academicPapers = [
    {
      title: "Backtracking Algorithms: Theory and Applications",
      authors: "Various Authors",
      publication: "Journal of Algorithms, 1985",
      description: "Studiu fundamental despre tehnica backtracking și aplicațiile sale.",
    },
    {
      title: "The Complexity of the N-Queens Problem",
      authors: "I. Rivin, I. Vardi, P. Zimmermann",
      publication: "American Mathematical Monthly, 1994",
      description: "Analiză matematică a complexității problemei celor N dame.",
    },
  ];

  const romanianResources = [
    {
      title: "Pbinfo.ro",
      url: "https://www.pbinfo.ro/",
      description: "Platformă românească cu probleme de informatică pentru liceu, include secțiuni dedicate pentru Backtracking și Divide et Impera.",
    },
    {
      title: "InfoArena",
      url: "https://www.infoarena.ro/",
      description: "Arhivă de probleme de concurs cu soluții și discuții.",
    },
    {
      title: "Codeforces (în română)",
      url: "https://codeforces.com/",
      description: "Platformă internațională de competitive programming cu comunitate activă.",
    },
  ];

  return (
    <div data-testid="bibliografie-page" className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 border-b border-slate-800">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-amber-400" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-outfit font-bold text-slate-100">
                Bibliografie
              </h1>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed">
              Resurse recomandate pentru aprofundarea tehnicilor Backtracking și Divide et Impera. 
              Am compilat o listă de cărți, articole și resurse online care te vor ajuta 
              să înțelegi mai bine acești algoritmi fundamentali.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-12 border-b border-slate-800">
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl font-outfit font-bold text-slate-100">Cărți Recomandate</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {books.map((book, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-amber-500/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{book.title}</h3>
                  <p className="text-sm text-cyan-400 mb-1">{book.authors}</p>
                  <p className="text-xs text-slate-500 mb-3">{book.edition}</p>
                  <p className="text-sm text-slate-400 mb-3">{book.description}</p>
                  <p className="text-xs text-slate-600 font-mono">ISBN: {book.isbn}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Online Resources Section */}
      <section className="py-12 border-b border-slate-800">
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Globe className="w-5 h-5 text-cyan-400" />
              <h2 className="text-2xl font-outfit font-bold text-slate-100">Resurse Online</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onlineResources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {resource.type === "Video" && <Video className="w-4 h-4 text-rose-400" />}
                      {resource.type === "Article" && <FileText className="w-4 h-4 text-emerald-400" />}
                      {resource.type === "Course" && <GraduationCap className="w-4 h-4 text-purple-400" />}
                      {resource.type === "Interactive" && <Globe className="w-4 h-4 text-amber-400" />}
                      <span className="text-xs text-slate-500 uppercase tracking-wide">{resource.type}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-slate-400">{resource.description}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Romanian Resources */}
      <section className="py-12 border-b border-slate-800">
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">🇷🇴</span>
              <h2 className="text-2xl font-outfit font-bold text-slate-100">Resurse în Limba Română</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {romanianResources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/30 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {resource.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <p className="text-sm text-slate-400">{resource.description}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Academic Papers */}
      <section className="py-12 border-b border-slate-800">
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              <h2 className="text-2xl font-outfit font-bold text-slate-100">Lucrări Academice</h2>
            </div>

            <div className="space-y-4">
              {academicPapers.map((paper, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{paper.title}</h3>
                  <p className="text-sm text-cyan-400 mb-1">{paper.authors}</p>
                  <p className="text-xs text-slate-500 mb-3 italic">{paper.publication}</p>
                  <p className="text-sm text-slate-400">{paper.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="py-12">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-rose-500/10 border border-slate-800 rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-outfit font-bold text-slate-100 mb-4">
              Realizatori Proiect
            </h2>
            <p className="text-slate-400 mb-6">
              Acest site educațional a fost realizat cu dedicație pentru a face 
              învățarea algoritmilor mai accesibilă și interactivă.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                  CR
                </div>
                <p className="font-semibold text-slate-100">Chivu Roberto Alexandru</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center text-2xl font-bold text-white">
                  IA
                </div>
                <p className="font-semibold text-slate-100">Iorga Alexandru Cristian</p>
              </div>
            </div>
            <p className="mt-8 text-sm text-slate-500">
              © 2025 - Proiect educațional despre tehnici de programare
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BibliografiePage;
