import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, StepForward, ChevronRight } from "lucide-react";

export const IdeCodeRunner = ({
  code,
  language = "cpp",
  activeLine = -1,
  title = "main.cpp",
  explanations = [],
  currentStep = 0,
  onPlay,
  onPause,
  onReset,
  onStep,
  isPlaying = false,
  showControls = true,
}) => {
  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: "transparent",
      margin: 0,
      padding: "20px",
      fontSize: "14px",
      lineHeight: "1.7",
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: "transparent",
      fontFamily: "'JetBrains Mono', monospace",
    },
  };

  const lines = code.split("\n");

  return (
    <div data-testid="ide-code-runner" className="code-window">
      {/* Window header with macOS dots */}
      <div className="code-window-header">
        <div className="flex gap-2">
          <div className="code-window-dot red" />
          <div className="code-window-dot yellow" />
          <div className="code-window-dot green" />
        </div>
        <span className="ml-4 text-sm text-slate-400 font-mono">{title}</span>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50 bg-slate-900/50">
          <button
            data-testid="code-runner-play"
            onClick={isPlaying ? onPause : onPlay}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm font-medium"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? "Pauză" : "Rulează"}
          </button>
          <button
            data-testid="code-runner-step"
            onClick={onStep}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-medium"
          >
            <StepForward className="w-4 h-4" />
            Pas
          </button>
          <button
            data-testid="code-runner-reset"
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <span className="ml-auto text-sm text-slate-500 font-mono">
            Pas: {currentStep + 1}
          </span>
        </div>
      )}

      {/* Code content with line highlighting */}
      <div className="relative overflow-x-auto">
        <div className="min-w-full">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`flex ${
                index === activeLine
                  ? "bg-cyan-500/15 border-l-[3px] border-cyan-400"
                  : "border-l-[3px] border-transparent"
              }`}
            >
              <span className="w-12 flex-shrink-0 text-right pr-4 py-0.5 text-slate-600 text-sm font-mono select-none">
                {index + 1}
              </span>
              <pre className="flex-1 py-0.5 pr-4">
                <code className="text-sm font-mono">
                  <SyntaxHighlighter
                    language={language}
                    style={customStyle}
                    customStyle={{
                      background: "transparent",
                      padding: 0,
                      margin: 0,
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: "'JetBrains Mono', monospace",
                      },
                    }}
                  >
                    {line || " "}
                  </SyntaxHighlighter>
                </code>
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation panel */}
      {explanations.length > 0 && explanations[currentStep] && (
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-4 bg-slate-800/50 border-t border-slate-700/50"
        >
          <div className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300 leading-relaxed">
              {explanations[currentStep]}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default IdeCodeRunner;
