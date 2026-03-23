import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, HelpCircle, ArrowRight } from "lucide-react";

export const QuizCard = ({
  question,
  options,
  correctIndex,
  explanation,
  onAnswer,
  questionNumber,
  totalQuestions,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (index) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    setShowExplanation(true);
    if (onAnswer) {
      onAnswer(index === correctIndex);
    }
  };

  const isCorrect = selectedIndex === correctIndex;

  return (
    <motion.div
      data-testid="quiz-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 lg:p-8"
    >
      {/* Question header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1">
          <span className="text-sm text-slate-500 font-mono">
            Întrebarea {questionNumber}/{totalQuestions}
          </span>
          <h3 className="text-lg font-semibold text-slate-100 mt-1 leading-relaxed">
            {question}
          </h3>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isThisCorrect = index === correctIndex;
          const showResult = selectedIndex !== null;

          let stateClass = "";
          if (showResult) {
            if (isThisCorrect) {
              stateClass = "correct";
            } else if (isSelected && !isThisCorrect) {
              stateClass = "incorrect";
            }
          }

          return (
            <motion.button
              key={index}
              data-testid={`quiz-option-${index}`}
              onClick={() => handleSelect(index)}
              disabled={selectedIndex !== null}
              whileHover={selectedIndex === null ? { scale: 1.01 } : {}}
              whileTap={selectedIndex === null ? { scale: 0.99 } : {}}
              className={`quiz-option w-full text-left p-4 rounded-xl border transition-all ${
                stateClass === "correct"
                  ? "border-emerald-500 bg-emerald-500/10"
                  : stateClass === "incorrect"
                  ? "border-rose-500 bg-rose-500/10"
                  : "border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/5"
              } ${selectedIndex !== null ? "cursor-default" : "cursor-pointer"}`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-semibold ${
                    stateClass === "correct"
                      ? "bg-emerald-500 text-white"
                      : stateClass === "incorrect"
                      ? "bg-rose-500 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span
                  className={`flex-1 ${
                    showResult && isThisCorrect
                      ? "text-emerald-400"
                      : showResult && isSelected
                      ? "text-rose-400"
                      : "text-slate-300"
                  }`}
                >
                  {option}
                </span>
                {showResult && isThisCorrect && (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                )}
                {showResult && isSelected && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden"
          >
            <div
              className={`p-4 rounded-xl ${
                isCorrect ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-rose-500/10 border border-rose-500/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="font-semibold text-emerald-400">Corect!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span className="font-semibold text-rose-400">Incorect</span>
                  </>
                )}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const QuizSection = ({ quizzes, title }) => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
    setTimeout(() => {
      if (currentQuiz < quizzes.length - 1) {
        setCurrentQuiz((prev) => prev + 1);
      } else {
        setCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div data-testid="quiz-section" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-100 font-outfit">{title}</h2>
        <div className="flex items-center gap-2 text-sm font-mono">
          <span className="text-slate-500">Scor:</span>
          <span className="text-cyan-400 font-semibold">
            {score}/{quizzes.length}
          </span>
        </div>
      </div>

      {!completed ? (
        <QuizCard
          key={currentQuiz}
          question={quizzes[currentQuiz].question}
          options={quizzes[currentQuiz].options}
          correctIndex={quizzes[currentQuiz].correctIndex}
          explanation={quizzes[currentQuiz].explanation}
          onAnswer={handleAnswer}
          questionNumber={currentQuiz + 1}
          totalQuestions={quizzes.length}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center"
        >
          <div
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
              score === quizzes.length
                ? "bg-emerald-500/20"
                : score >= quizzes.length / 2
                ? "bg-cyan-500/20"
                : "bg-rose-500/20"
            }`}
          >
            <span className="text-3xl font-bold font-mono">
              {Math.round((score / quizzes.length) * 100)}%
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Quiz Finalizat!</h3>
          <p className="text-slate-400 mb-6">
            Ai răspuns corect la {score} din {quizzes.length} întrebări.
          </p>
          <button
            data-testid="quiz-reset-button"
            onClick={resetQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            Încearcă din nou
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default QuizCard;
