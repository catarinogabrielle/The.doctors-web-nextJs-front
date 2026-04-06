import { useInView } from "@/hooks/useInView";
import { BookOpen, Headphones, Download, Monitor, RefreshCw, Shield } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Todos os 50+ cursos",
    description: "Acesso ilimitado a todo o catálogo de cursos e séries originais.",
  },
  {
    icon: Headphones,
    title: "Aulas em áudio",
    description: "Aprenda em qualquer lugar com versões em áudio de todas as aulas.",
  },
  {
    icon: Download,
    title: "Download offline",
    description: "Baixe aulas e assista sem conexão com a internet.",
  },
  {
    icon: Monitor,
    title: "Multiplataforma",
    description: "Assista no desktop, TV, tablet ou celular quando quiser.",
  },
  {
    icon: RefreshCw,
    title: "Novos cursos mensais",
    description: "Conteúdo atualizado com novos cursos adicionados todo mês.",
  },
  {
    icon: Shield,
    title: "Garantia de 30 dias",
    description: "Satisfação garantida ou seu dinheiro de volta em até 30 dias.",
  },
];

export default function BenefitsSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            className={`font-display text-3xl lg:text-5xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            O que está incluído na sua{" "}
            <span className="text-gold italic">assinatura</span>
          </h2>
          <div
            className={`gold-line w-20 mx-auto mt-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className={`group p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-gold/30 hover:bg-white/[0.05] transition-all duration-500 spotlight-hover ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 300}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
