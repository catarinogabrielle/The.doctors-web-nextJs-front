import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Cursos", href: "#cursos" },
    { label: "Categorias", href: "#categorias" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Planos", href: "#planos" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.08_0.005_250/0.92)] backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center font-display font-bold text-black text-sm tracking-tight">
            THD
          </div>
          <span className="font-display text-xl font-bold text-white tracking-tight hidden sm:block">
            Academy
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-gold transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="text-white/70 hover:text-white transition-colors p-2">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/login">
            <a className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Entrar
            </a>
          </Link>
          <a
            href="#planos"
            className="shimmer text-sm font-semibold text-white px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[oklch(0.55_0.22_20/0.3)]"
          >
            Começar Agora
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[oklch(0.1_0.005_250/0.98)] backdrop-blur-xl border-t border-white/5"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-white/80 hover:text-gold transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link href="/login">
                  <a className="text-center text-sm font-medium text-white/80 py-2">
                    Entrar
                  </a>
                </Link>
                <a
                  href="#planos"
                  className="shimmer text-center text-sm font-semibold text-white px-5 py-3 rounded-lg"
                >
                  Começar Agora
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
