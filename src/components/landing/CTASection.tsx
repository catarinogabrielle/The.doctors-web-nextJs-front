import { useInView } from "@/hooks/useInView";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Individual",
    price: "49",
    period: "/mês",
    description: "Perfeito para quem quer começar a aprender",
    features: [
      "Acesso a todos os 50+ cursos",
      "Novos cursos mensais",
      "Aulas em áudio",
      "Assista em 1 dispositivo",
      "Garantia de 30 dias",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: "79",
    period: "/mês",
    description: "A escolha mais popular para profissionais",
    features: [
      "Tudo do plano Individual",
      "Download para assistir offline",
      "Assista em até 3 dispositivos",
      "Certificados de conclusão",
      "Acesso antecipado a lançamentos",
      "Comunidade exclusiva",
    ],
    popular: true,
  },
  {
    name: "Empresarial",
    price: "199",
    period: "/mês",
    description: "Para equipes que buscam excelência",
    features: [
      "Tudo do plano Premium",
      "Até 10 membros da equipe",
      "Relatórios de progresso",
      "Conteúdo personalizado",
      "Suporte prioritário",
      "Treinamento corporativo",
    ],
    popular: false,
  },
];

export default function CTASection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="planos" className="py-24 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] relative">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
            Comece sua jornada{" "}
            <span className="text-gold italic">hoje.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto mt-4">
            Escolha o plano ideal para você. Garantia de 30 dias em todos os planos.
          </p>
          <div className="gold-line w-20 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-700 ${
                plan.popular
                  ? "bg-gold/[0.06] border-2 border-gold/30 scale-[1.02] shadow-xl shadow-gold/5"
                  : "bg-white/[0.03] border border-white/[0.06] hover:border-white/15"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150 + 300}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-gold text-black text-xs font-bold px-4 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-white/40">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-white">
                  R${plan.price}
                </span>
                <span className="text-white/40 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`w-full inline-flex items-center justify-center gap-2 font-semibold py-3 rounded-lg text-sm transition-all duration-300 ${
                  plan.popular
                    ? "shimmer text-white hover:scale-105 hover:shadow-lg hover:shadow-[oklch(0.55_0.22_20/0.3)]"
                    : "bg-white/5 border border-white/15 text-white hover:bg-white/10"
                }`}
              >
                Começar Agora
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
