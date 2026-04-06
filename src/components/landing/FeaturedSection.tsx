import { useInView } from "@/hooks/useInView";
import { Play, Calendar } from "lucide-react";

const featured = [
  {
    title: "Revolucione Seus Negócios com IA",
    instructors: "Dra. Marina Santos & Prof. Roberto Silva",
    month: "Disponível",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663507494116/HpW8gQ4FfbuLvoESh9jafb/course-tech-MLEtoWMcM7vkvZNhE49dcR.webp",
    description: "Três especialistas em tecnologia ensinam como implementar inteligência artificial de forma prática no seu negócio.",
    large: true,
  },
  {
    title: "A Ciência do Bem-Estar",
    instructors: "Dr. Paulo Mendes",
    month: "Em Breve",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663507494116/HpW8gQ4FfbuLvoESh9jafb/course-health-AgXP42CUo2EbDH7TbQHw7y.webp",
    description: "Descubra os segredos da medicina integrativa para uma vida mais saudável e equilibrada.",
    large: false,
  },
];

export default function FeaturedSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
            Conheça os melhores.
            <br />
            <span className="text-gold italic">Novos cursos todo mês.</span>
          </h2>
          <div className="gold-line w-20 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featured.map((item, i) => (
            <div
              key={item.title}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${item.large ? "lg:row-span-1" : ""}`}
              style={{ transitionDelay: `${i * 200 + 300}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                {/* Month badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span className="text-xs font-medium text-white/80">{item.month}</span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <div className="gold-line w-12 my-3" />
                  <p className="text-sm text-white/60 mb-3">{item.instructors}</p>
                  <p className="text-sm text-white/50 leading-relaxed mb-4 max-w-md">
                    {item.description}
                  </p>
                  <button className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-white/15 transition-all">
                    <Play className="w-4 h-4" />
                    Assistir Trailer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
