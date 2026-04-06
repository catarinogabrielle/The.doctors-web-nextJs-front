import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { categories, getCoursesByCategory } from "@/lib/courses";
import {
  TrendingUp, Briefcase, Cpu, Heart, Palette, Megaphone,
  DollarSign, Users, Mic, Video, Clock, BookOpen, ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Briefcase, Cpu, Heart, Palette, Megaphone,
  DollarSign, Users, Mic, Video,
};

export default function CoursesSection() {
  const [activeCategory, setActiveCategory] = useState("trending");
  const { ref, isVisible } = useInView();
  const filteredCourses = getCoursesByCategory(activeCategory);

  return (
    <section id="cursos" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
            Uma dose de inspiração,
            <br />
            <span className="text-gold italic">sempre que precisar.</span>
          </h2>
          <div className="gold-line w-20 mx-auto mt-6" />
        </div>

        {/* Category tabs */}
        <div
          id="categorias"
          className={`mb-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-gold/15 text-gold border border-gold/30"
                      : "bg-white/[0.03] text-white/60 border border-white/[0.06] hover:text-white hover:border-white/15"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-gold/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/5"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Badge */}
                  {course.badge && (
                    <div className="absolute top-3 left-3 bg-[oklch(0.55_0.22_20)] text-white text-xs font-semibold px-3 py-1 rounded-md">
                      {course.badge}
                    </div>
                  )}

                  {/* Course info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-lg font-bold text-white leading-tight mb-1">
                      {course.title}
                    </h3>
                    <div className="gold-line w-10 my-2" />
                    <p className="text-sm text-gold font-medium">{course.instructor}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="p-4 flex items-center justify-between text-xs text-white/40">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {course.lessons} aulas
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-sm text-white/80 mb-4 leading-relaxed">
                      {course.description}
                    </p>
                    <button className="inline-flex items-center gap-2 shimmer text-white text-sm font-semibold px-6 py-2.5 rounded-lg">
                      Ver Curso
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-gold font-medium hover:text-gold-light transition-colors group"
          >
            Ver todos os cursos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
