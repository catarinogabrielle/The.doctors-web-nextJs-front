import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[oklch(0.06_0.005_250/0.95)] backdrop-blur-xl border-t border-white/[0.06] py-3 transition-all duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] flex items-center justify-between">
        <div className="hidden sm:block">
          <span className="text-sm text-white/60">
            A partir de{" "}
            <span className="text-gold font-semibold">R$49/mês</span>
            {" "}para todos os cursos
          </span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="#planos"
            className="flex-1 sm:flex-none shimmer inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:scale-105 transition-transform"
          >
            Começar Agora
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
