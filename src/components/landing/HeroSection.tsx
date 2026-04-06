import { motion } from "framer-motion";
import { Play, ArrowRight, Star } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663507494116/HpW8gQ4FfbuLvoESh9jafb/hero-banner-5eUaFxi38KRqDzTcW7EVkS.webp";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="THD Academy Instrutores"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.005_250)] via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8"
          >
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-sm text-white/80 font-medium">Plataforma #1 em cursos premium</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
          >
            Aprenda com{" "}
            <span className="text-gold italic">os melhores</span>
            <br />
            do mercado.
          </motion.h1>

          {/* Gold divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-gold mb-6"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg lg:text-xl text-white/70 leading-relaxed mb-10 max-w-lg"
          >
            Acesso ilimitado a cursos exclusivos ministrados por profissionais
            reconhecidos. Transforme sua carreira hoje.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#planos"
              className="shimmer inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-lg text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[oklch(0.55_0.22_20/0.3)]"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#cursos"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-white font-medium px-8 py-4 rounded-lg text-base transition-all duration-300 hover:bg-white/10 hover:border-white/25"
            >
              <Play className="w-5 h-5" />
              Explorar Cursos
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex gap-8 mt-14 pt-8 border-t border-white/10"
          >
            {[
              { value: "50+", label: "Cursos Exclusivos" },
              { value: "100k+", label: "Alunos Ativos" },
              { value: "4.9", label: "Avaliação Média" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl lg:text-3xl font-bold text-gold">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.08_0.005_250)] to-transparent" />
    </section>
  );
}
