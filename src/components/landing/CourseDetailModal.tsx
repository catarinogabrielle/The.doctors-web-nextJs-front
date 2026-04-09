import { Course } from "@/lib/courses";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Clock, BookOpen, Monitor, Award, ShoppingCart, User,
} from "lucide-react";
import { useEffect, useMemo } from "react";

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
}

export default function CourseDetailModal({ course, onClose }: CourseDetailModalProps) {
  const buyLink = useMemo(() => {
    if (!course?.paymentlink) return "";
    const url = new URL(course.paymentlink);
    const loginUrl = typeof window !== "undefined"
      ? `${window.location.origin}/login`
      : "/login";
    url.searchParams.set("redirect_to", loginUrl);
    return url.toString();
  }, [course?.paymentlink]);

  useEffect(() => {
    if (course) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [course]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {course && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[oklch(0.1_0.005_250)] border border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video */}
            {course.videoUrl && (
              <div className="relative aspect-video w-full rounded-t-2xl overflow-hidden bg-black">
                <iframe
                  src={course.videoUrl}
                  title={course.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 lg:p-8 space-y-6">
              {/* Title & Instructor */}
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-white leading-tight">
                  {course.title}
                </h2>
                <div className="gold-line w-16 my-3" />
                <p className="text-gold font-medium">{course.instructor}</p>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-3">
                {course.time && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-sm text-white/70">
                    <Clock className="w-4 h-4 text-gold" />
                    {course.time} Horas
                  </span>
                )}
                {course.lessons > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-sm text-white/70">
                    <BookOpen className="w-4 h-4 text-gold" />
                    {course.lessons} aulas
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-sm text-white/70">
                  <Monitor className="w-4 h-4 text-gold" />
                  Totalmente online
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-sm text-white/70">
                  <Award className="w-4 h-4 text-gold" />
                  Certificado
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Descrição</h3>
                <p className="text-white/60 leading-relaxed">{course.description}</p>
              </div>

              {/* Instructor */}
              {course.instructor && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  {course.teacherphoto ? (
                    <img
                      src={course.teacherphoto}
                      alt={course.instructor}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gold/30"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center border-2 border-gold/30">
                      <User className="w-7 h-7 text-gold" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold">{course.instructor}</h4>
                    {course.teacherwork && (
                      <p className="text-gold/80 text-sm">{course.teacherwork}</p>
                    )}
                    {course.teacherinfo && (
                      <p className="text-white/50 text-sm mt-1 leading-relaxed">
                        {course.teacherinfo}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Buy button */}
              {course.paymentlink && (
                <a
                  href={buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full shimmer text-white text-base font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/10"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Comprar Curso
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
