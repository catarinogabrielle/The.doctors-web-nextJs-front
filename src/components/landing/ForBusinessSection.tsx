import { useInView } from "@/hooks/useInView";
import { ArrowRight, Building2, BarChart3, Users, Award } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Equipes de até 10 membros",
    description: "Gerencie o aprendizado de toda a sua equipe em uma única plataforma.",
  },
  {
    icon: BarChart3,
    title: "Relatórios de progresso",
    description: "Acompanhe o desenvolvimento de cada membro com métricas detalhadas.",
  },
  {
    icon: Award,
    title: "Certificados corporativos",
    description: "Certificados personalizados com a marca da sua empresa.",
  },
  {
    icon: Building2,
    title: "Conteúdo personalizado",
    description: "Trilhas de aprendizado customizadas para as necessidades do seu negócio.",
  },
];

export default function ForBusinessSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
              <Building2 className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold font-medium">Para Empresas</span>
            </div>

            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Eleve o nível da{" "}
              <span className="text-gold italic">sua equipe</span>
            </h2>

            <div className="gold-line w-16 mb-6" />

            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-lg">
              Descubra por que as principais organizações confiam na THD Academy para
              o desenvolvimento e treinamento de suas equipes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className={`p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${i * 100 + 400}ms` }}
                >
                  <feature.icon className="w-5 h-5 text-gold mb-2" />
                  <h4 className="text-sm font-semibold text-white mb-1">{feature.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href="#planos"
                className="shimmer inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg text-sm hover:scale-105 transition-transform"
              >
                Falar com Vendas
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-white font-medium px-6 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors"
              >
                Saiba Mais
              </a>
            </div>
          </div>

          {/* Right visual */}
          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Equipe colaborando"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/50 mb-1">Empresas que confiam em nós</div>
                      <div className="font-display text-2xl font-bold text-gold">500+</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/50 mb-1">Satisfação corporativa</div>
                      <div className="font-display text-2xl font-bold text-gold">98%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
