import { useInView } from "@/hooks/useInView";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Carolina Martins",
    role: "Diretora de Marketing",
    text: "Os cursos da THD Academy transformaram completamente minha abordagem profissional. A qualidade do conteúdo é incomparável com qualquer outra plataforma que já usei.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Rafael Oliveira",
    role: "Empreendedor",
    text: "Depois de completar o curso de Empreendedorismo Digital, consegui lançar meu negócio online em apenas 3 meses. O retorno sobre o investimento foi extraordinário.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Fernanda Costa",
    role: "Médica",
    text: "A abordagem dos instrutores é única. Cada aula parece uma mentoria personalizada com os melhores profissionais do mercado. Recomendo para todos.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    name: "Lucas Pereira",
    role: "Desenvolvedor de Software",
    text: "O curso de Data Science mudou minha carreira. Consegui uma promoção em menos de 6 meses aplicando o que aprendi. A plataforma é simplesmente fantástica.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    name: "Mariana Silva",
    role: "CEO, Startup Tech",
    text: "Assino a THD Academy para toda a minha equipe. Os cursos de liderança e gestão elevaram significativamente o desempenho do nosso time.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useInView();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="depoimentos" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
            Veja o que nossos alunos{" "}
            <span className="text-gold italic">estão dizendo.</span>
          </h2>
          <div className="gold-line w-20 mx-auto mt-6" />
        </div>

        {/* Featured testimonial */}
        <div
          className={`max-w-3xl mx-auto mb-12 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 lg:p-12">
            <Quote className="w-10 h-10 text-gold/30 mb-6" />
            <p className="font-display text-xl lg:text-2xl text-white/90 leading-relaxed italic mb-8">
              &ldquo;{testimonials[active].text}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <img
                src={testimonials[active].avatar}
                alt={testimonials[active].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
              />
              <div>
                <div className="font-semibold text-white">{testimonials[active].name}</div>
                <div className="text-sm text-white/40">{testimonials[active].role}</div>
              </div>
              <div className="ml-auto flex gap-1">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active ? "bg-gold w-8" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Small testimonial cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={t.name}
              className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                i === active
                  ? "bg-gold/[0.06] border-gold/20"
                  : "bg-white/[0.02] border-white/[0.04] hover:border-white/10"
              }`}
              onClick={() => setActive(i)}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
              <p className="text-xs text-white/50 line-clamp-2">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
