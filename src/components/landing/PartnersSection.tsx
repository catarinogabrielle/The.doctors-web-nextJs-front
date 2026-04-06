import { useInView } from "@/hooks/useInView";

const partners = [
  { name: "Arara Azul Produções", display: "ARARA AZUL" },
  { name: "The Doctors", display: "THE DOCTORS" },
  { name: "Live7", display: "LIVE 7" },
  { name: "Catarino's", display: "CATARINO'S" },
  { name: "THD Lab", display: "THD LAB" },
];

export default function PartnersSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-16 border-t border-b border-white/[0.04]" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
        <p
          className={`text-center text-xs text-white/30 uppercase tracking-[0.2em] mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Parceiros e Produtoras
        </p>
        <div
          className={`flex flex-wrap items-center justify-center gap-8 lg:gap-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="text-white/20 hover:text-white/40 transition-colors font-display text-lg lg:text-xl font-bold tracking-wider"
            >
              {partner.display}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
