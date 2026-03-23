import { motion, AnimatePresence } from "framer-motion";

// Array visualizer for Divide et Impera algorithms
export const ArrayVisualizer = ({
  array,
  highlightIndices = [],
  comparingIndices = [],
  sortedIndices = [],
  pivotIndex = -1,
  label = "",
  maxValue,
}) => {
  const max = maxValue || Math.max(...array, 1);

  return (
    <motion.div
      data-testid="array-visualizer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900/30 border border-slate-800 rounded-xl p-6"
    >
      {label && (
        <p className="text-sm text-slate-500 font-mono mb-4">{label}</p>
      )}
      <div className="flex items-end gap-2 h-48 justify-center">
        <AnimatePresence mode="popLayout">
          {array.map((value, index) => {
            const isHighlighted = highlightIndices.includes(index);
            const isComparing = comparingIndices.includes(index);
            const isSorted = sortedIndices.includes(index);
            const isPivot = index === pivotIndex;

            let bgColor = "bg-slate-600";
            if (isPivot) bgColor = "bg-cyan-500";
            else if (isSorted) bgColor = "bg-emerald-500";
            else if (isComparing) bgColor = "bg-amber-500";
            else if (isHighlighted) bgColor = "bg-rose-500";

            const height = Math.max((value / max) * 100, 10);

            return (
              <motion.div
                key={`${index}-${value}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex flex-col items-center gap-2"
              >
                <motion.div
                  className={`w-10 sm:w-12 rounded-t-lg ${bgColor} transition-colors duration-300`}
                  style={{ height: `${height}%` }}
                  layoutId={`bar-${index}`}
                />
                <span className="text-xs font-mono text-slate-400">{value}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Tree node for Backtracking visualization
export const TreeNode = ({ value, isActive, isSuccess, isDeadEnd, children, depth = 0 }) => {
  let bgColor = "bg-slate-700";
  let borderColor = "border-slate-600";
  
  if (isActive) {
    bgColor = "bg-cyan-500";
    borderColor = "border-cyan-400";
  } else if (isSuccess) {
    bgColor = "bg-emerald-500";
    borderColor = "border-emerald-400";
  } else if (isDeadEnd) {
    bgColor = "bg-rose-500";
    borderColor = "border-rose-400";
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: depth * 0.1, type: "spring" }}
        className={`w-10 h-10 rounded-full ${bgColor} border-2 ${borderColor} flex items-center justify-center text-white font-mono text-sm shadow-lg`}
      >
        {value}
      </motion.div>
      {children && children.length > 0 && (
        <div className="flex gap-4 mt-4 relative">
          {/* Connecting lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-4">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="#475569"
                strokeWidth="2"
              />
            </svg>
          </div>
          {children}
        </div>
      )}
    </div>
  );
};

// N-Queens board visualizer
export const NQueensBoard = ({ size, queens = [], currentRow = -1, conflicts = [] }) => {
  return (
    <motion.div
      data-testid="nqueens-board"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-block bg-slate-900/50 border border-slate-800 rounded-xl p-4"
    >
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: size * size }).map((_, index) => {
          const row = Math.floor(index / size);
          const col = index % size;
          const isDark = (row + col) % 2 === 1;
          const hasQueen = queens[row] === col;
          const isCurrentRow = row === currentRow;
          const isConflict = conflicts.some(([r, c]) => r === row && c === col);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-sm ${
                isConflict
                  ? "bg-rose-500/30"
                  : isCurrentRow
                  ? "bg-cyan-500/20"
                  : isDark
                  ? "bg-slate-700"
                  : "bg-slate-800"
              }`}
            >
              {hasQueen && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-lg"
                >
                  ♛
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Split array visualization for Divide et Impera
export const SplitArrayVisualizer = ({ leftArray, rightArray, originalArray, step }) => {
  return (
    <motion.div
      data-testid="split-array-visualizer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Original array */}
      {step === "original" && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center gap-2"
        >
          {originalArray.map((val, i) => (
            <motion.div
              key={i}
              className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center font-mono text-sm border border-slate-600"
            >
              {val}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Split arrays */}
      {step === "split" && (
        <div className="flex justify-center gap-8">
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: -20, opacity: 1 }}
            className="flex gap-2"
          >
            {leftArray.map((val, i) => (
              <motion.div
                key={i}
                layoutId={`elem-${i}`}
                className="w-12 h-12 bg-cyan-500/30 rounded-lg flex items-center justify-center font-mono text-sm border border-cyan-500/50"
              >
                {val}
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 20, opacity: 1 }}
            className="flex gap-2"
          >
            {rightArray.map((val, i) => (
              <motion.div
                key={i}
                layoutId={`elem-${leftArray.length + i}`}
                className="w-12 h-12 bg-rose-500/30 rounded-lg flex items-center justify-center font-mono text-sm border border-rose-500/50"
              >
                {val}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Merged/Sorted array */}
      {step === "merge" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center gap-2"
        >
          {[...leftArray, ...rightArray]
            .sort((a, b) => a - b)
            .map((val, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="w-12 h-12 bg-emerald-500/30 rounded-lg flex items-center justify-center font-mono text-sm border border-emerald-500/50"
              >
                {val}
              </motion.div>
            ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// Permutation tree visualizer
export const PermutationVisualizer = ({ currentPermutation = [], available = [], path = [] }) => {
  return (
    <motion.div
      data-testid="permutation-visualizer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900/30 border border-slate-800 rounded-xl p-6"
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500 mb-2">Permutare curentă:</p>
          <div className="flex gap-2">
            {currentPermutation.map((val, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="w-10 h-10 bg-cyan-500/30 rounded-lg flex items-center justify-center font-mono text-sm border border-cyan-500/50"
              >
                {val}
              </motion.div>
            ))}
            {currentPermutation.length === 0 && (
              <span className="text-slate-600 italic">gol</span>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500 mb-2">Elemente disponibile:</p>
          <div className="flex gap-2">
            {available.map((val, i) => (
              <motion.div
                key={i}
                className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center font-mono text-sm border border-slate-600"
              >
                {val}
              </motion.div>
            ))}
            {available.length === 0 && (
              <span className="text-emerald-400 font-medium">✓ Complet!</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArrayVisualizer;
