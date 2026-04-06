import { useInView } from "@/hooks/useInView";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Geral",
    items: [
      {
        question: "O que é a THD Academy?",
        answer:
          "A THD Academy é uma plataforma premium de cursos online que oferece conteúdo exclusivo ministrado por profissionais reconhecidos do mercado. Nossa missão é democratizar o acesso ao conhecimento de alta qualidade em diversas áreas como negócios, tecnologia, saúde, criatividade e muito mais.",
      },
      {
        question: "O que está incluído na assinatura?",
        answer:
          "Sua assinatura inclui acesso ilimitado a todos os 50+ cursos disponíveis, novos cursos adicionados mensalmente, aulas em formato de áudio, possibilidade de download para assistir offline (planos selecionados), acesso multiplataforma e certificados de conclusão.",
      },
      {
        question: "Onde posso assistir?",
        answer:
          "Você pode assistir aos cursos em qualquer dispositivo: computador, tablet, celular ou smart TV. Nossa plataforma é totalmente responsiva e oferece a melhor experiência em qualquer tela.",
      },
      {
        question: "Quais cursos são ideais para mim?",
        answer:
          "Oferecemos cursos em diversas categorias. Recomendamos explorar nosso catálogo por categorias de interesse ou utilizar nosso assistente inteligente que pode ajudá-lo a encontrar os cursos mais adequados ao seu perfil e objetivos profissionais.",
      },
    ],
  },
  {
    category: "Preços & Pagamento",
    items: [
      {
        question: "Quanto custa a THD Academy?",
        answer:
          "Oferecemos três planos: Individual (R$49/mês), Premium (R$79/mês) e Empresarial (R$199/mês). Todos os planos são cobrados mensalmente e incluem acesso a todo o catálogo de cursos. Oferecemos desconto especial para pagamento anual.",
      },
      {
        question: "Como funciona a garantia de 30 dias?",
        answer:
          "Se por qualquer motivo você não estiver satisfeito com a plataforma, pode solicitar o reembolso completo dentro dos primeiros 30 dias após a assinatura. Sem perguntas, sem complicações.",
      },
      {
        question: "Como faço para cancelar?",
        answer:
          "Você pode cancelar sua assinatura a qualquer momento diretamente na sua conta. O cancelamento é imediato e você continuará tendo acesso até o final do período já pago.",
      },
    ],
  },
];

export default function FAQSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="faq" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
            Perguntas{" "}
            <span className="text-gold italic">frequentes</span>
          </h2>
          <div className="gold-line w-20 mx-auto mt-6" />
        </div>

        <div
          className={`space-y-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {faqs.map((section) => (
            <div key={section.category}>
              <h3 className="font-display text-lg font-semibold text-gold mb-4">
                {section.category}
              </h3>
              <Accordion type="single" collapsible className="space-y-2">
                {section.items.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`${section.category}-${i}`}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 data-[state=open]:border-gold/20 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-white/90 font-medium text-sm hover:text-gold transition-colors py-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/50 text-sm leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
