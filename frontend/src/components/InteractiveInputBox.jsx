import { useState } from "react";
import { motion } from "framer-motion";
import { Play, AlertCircle, Check } from "lucide-react";

export const InteractiveInputBox = ({
  label,
  placeholder,
  helperText,
  onSubmit,
  validateInput,
  inputType = "array",
  defaultValue = "",
}) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError("");
    setIsValid(false);

    if (validateInput && newValue.trim()) {
      const validation = validateInput(newValue);
      if (validation.valid) {
        setIsValid(true);
      }
    }
  };

  const handleSubmit = () => {
    if (!value.trim()) {
      setError("Te rog introdu o valoare");
      return;
    }

    if (validateInput) {
      const validation = validateInput(value);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }
    }

    setError("");
    setIsValid(true);
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <motion.div
      data-testid="interactive-input-box"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
    >
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          data-testid="interactive-input"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl font-mono text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-all input-glow ${
            error
              ? "border-rose-500 focus:border-rose-500"
              : isValid
              ? "border-emerald-500 focus:border-emerald-500"
              : "border-slate-700 focus:border-cyan-500"
          }`}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />

        {/* Status indicator */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {error && <AlertCircle className="w-5 h-5 text-rose-500" />}
          {isValid && !error && <Check className="w-5 h-5 text-emerald-500" />}
        </div>
      </div>

      {/* Helper text or error */}
      <div className="mt-2 min-h-[20px]">
        {error ? (
          <p className="text-sm text-rose-400">{error}</p>
        ) : (
          helperText && <p className="text-sm text-slate-500">{helperText}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        data-testid="interactive-input-submit"
        onClick={handleSubmit}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors font-medium"
      >
        <Play className="w-4 h-4" />
        Rulează Algoritmul
      </button>
    </motion.div>
  );
};

// Validation functions
export const validateArrayInput = (value) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return { valid: false, error: "Introdu cel puțin o valoare" };
  }

  const numbers = trimmed.split(",").map((s) => s.trim());
  for (const num of numbers) {
    if (!/^-?\d+$/.test(num)) {
      return { valid: false, error: `"${num}" nu este un număr valid` };
    }
  }

  if (numbers.length < 2) {
    return { valid: false, error: "Introdu cel puțin 2 numere separate prin virgulă" };
  }

  if (numbers.length > 15) {
    return { valid: false, error: "Maximum 15 elemente pentru o vizualizare clară" };
  }

  return { valid: true, data: numbers.map(Number) };
};

export const validateNQueensInput = (value) => {
  const n = parseInt(value.trim());
  if (isNaN(n)) {
    return { valid: false, error: "Introdu un număr întreg" };
  }
  if (n < 4 || n > 8) {
    return { valid: false, error: "N trebuie să fie între 4 și 8" };
  }
  return { valid: true, data: n };
};

export default InteractiveInputBox;
