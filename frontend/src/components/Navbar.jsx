import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, GitBranch, Split, Scale, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Acasă", icon: Code2 },
  { path: "/backtracking", label: "Backtracking", icon: GitBranch },
  { path: "/divide-et-impera", label: "Divide et Impera", icon: Split },
  { path: "/comparatie", label: "Comparație", icon: Scale },
  { path: "/bibliografie", label: "Bibliografie", icon: BookOpen },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav 
      data-testid="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink 
            to="/" 
            data-testid="navbar-logo"
            className="flex items-center gap-3 group"
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-rose-500 flex items-center justify-center"
            >
              <Code2 className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-outfit font-bold text-xl tracking-tight text-slate-100 hidden sm:block">
              AlgoViz
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                data-testid={`nav-link-${item.path.replace("/", "") || "home"}`}
                className={({ isActive }) =>
                  `nav-link flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-slate-400 hover:text-slate-100"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2 text-slate-400 hover:text-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass border-t border-slate-800"
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                data-testid={`mobile-nav-link-${item.path.replace("/", "") || "home"}`}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
