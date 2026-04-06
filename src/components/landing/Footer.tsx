import { FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Obrigado! Você receberá nossas novidades em breve.");
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[oklch(0.06_0.005_250)]">
      {/* Newsletter */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] py-16">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h3 className="font-display text-2xl font-bold text-white mb-3">
            Fique por dentro das novidades
          </h3>
          <p className="text-white/40 text-sm mb-6">
            Cadastre-se e receba informações sobre novos cursos, instrutores e promoções exclusivas.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
            />
            <button
              type="submit"
              className="shimmer text-white font-semibold px-6 py-3 rounded-lg text-sm hover:scale-105 transition-transform"
            >
              Inscrever
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Empresa</h4>
            <ul className="space-y-2.5">
              {["Sobre Nós", "Carreiras", "Imprensa", "Blog"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Cursos</h4>
            <ul className="space-y-2.5">
              {["Catálogo", "Categorias", "Instrutores", "Certificados"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Suporte</h4>
            <ul className="space-y-2.5">
              {["Central de Ajuda", "Contato", "FAQ", "Termos de Uso"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Para Empresas</h4>
            <ul className="space-y-2.5">
              {["THD for Business", "Planos Corporativos", "Parcerias", "API"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/40 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gold flex items-center justify-center font-display font-bold text-black text-xs">
              THD
            </div>
            <span className="text-sm text-white/30">
              &copy; {new Date().getFullYear()} THD Academy. Todos os direitos reservados.
            </span>
          </div>
          <div className="flex items-center gap-4">
            {[FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-white/30 hover:text-gold transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
