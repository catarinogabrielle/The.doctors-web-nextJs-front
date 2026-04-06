import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Olá! Sou o assistente da THD Academy. Posso ajudá-lo a encontrar o curso ideal para você, tirar dúvidas sobre planos ou qualquer outra questão. Como posso ajudar?",
  },
];

const quickReplies = [
  "Quais cursos vocês oferecem?",
  "Qual o melhor plano para mim?",
  "Como funciona a garantia?",
  "Quero falar sobre cursos de tecnologia",
];

function getAutoResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("curso") && (lower.includes("oferec") || lower.includes("disponív") || lower.includes("catálogo") || lower.includes("quais"))) {
    return "Temos mais de 50 cursos exclusivos em diversas áreas: Negócios & Empreendedorismo, Tecnologia & Inovação, Saúde & Bem-Estar, Criatividade & Arte, Marketing Digital, Finanças, Liderança, Comunicação e Produção Audiovisual. Cada curso é ministrado por profissionais reconhecidos no mercado. Posso ajudá-lo a encontrar o curso ideal para seus objetivos!";
  }

  if (lower.includes("plano") || lower.includes("preço") || lower.includes("valor") || lower.includes("quanto custa")) {
    return "Oferecemos 3 planos:\n\n• Individual — R$49/mês: Acesso a todos os cursos, aulas em áudio, 1 dispositivo.\n\n• Premium — R$79/mês (mais popular): Tudo do Individual + download offline, 3 dispositivos, certificados e comunidade exclusiva.\n\n• Empresarial — R$199/mês: Tudo do Premium + até 10 membros, relatórios e suporte prioritário.\n\nTodos incluem garantia de 30 dias. Qual plano lhe interessa mais?";
  }

  if (lower.includes("garantia") || lower.includes("reembolso") || lower.includes("devol")) {
    return "Oferecemos garantia total de 30 dias! Se por qualquer motivo você não estiver satisfeito, basta solicitar o reembolso completo dentro dos primeiros 30 dias. Sem perguntas, sem complicações. Você pode experimentar toda a plataforma sem risco algum.";
  }

  if (lower.includes("tecnologia") || lower.includes("ia") || lower.includes("programação") || lower.includes("data")) {
    return "Na área de Tecnologia & Inovação, temos cursos incríveis como:\n\n• Inteligência Artificial Aplicada aos Negócios com Dra. Marina Santos (3h40, 24 aulas)\n• Data Science e Análise de Dados com Prof. Roberto Silva (4h, 30 aulas)\n\nEsses cursos são perfeitos para quem quer se destacar no mercado de tecnologia. Gostaria de saber mais sobre algum deles?";
  }

  if (lower.includes("negócio") || lower.includes("empreend") || lower.includes("empresa")) {
    return "Para quem busca crescimento profissional e empresarial, recomendo:\n\n• Liderança Estratégica para o Século XXI com Ricardo Almeida\n• Empreendedorismo Digital com Carlos Eduardo\n• Marketing Digital de Alta Performance com Felipe Costa\n\nSão cursos práticos com metodologias comprovadas. Posso detalhar algum deles?";
  }

  if (lower.includes("saúde") || lower.includes("bem-estar") || lower.includes("médic") || lower.includes("nutrição")) {
    return "Na área de Saúde & Bem-Estar, oferecemos:\n\n• Medicina Integrativa e Qualidade de Vida com Dr. Paulo Mendes\n• Nutrição Funcional e Performance com Dra. Camila Borges\n\nSão cursos baseados em evidências científicas que podem transformar sua qualidade de vida. Quer saber mais?";
  }

  if (lower.includes("certificado")) {
    return "Sim! Nos planos Premium e Empresarial, você recebe certificados de conclusão para cada curso finalizado. Os certificados são digitais, verificáveis e podem ser compartilhados no LinkedIn e outras plataformas profissionais. É uma ótima forma de comprovar suas novas habilidades!";
  }

  if (lower.includes("cancelar") || lower.includes("cancelamento")) {
    return "Você pode cancelar sua assinatura a qualquer momento diretamente na sua conta. O cancelamento é imediato e você continuará tendo acesso até o final do período já pago. Mas antes de cancelar, posso ajudá-lo com alguma dúvida ou encontrar conteúdos que sejam mais relevantes para você?";
  }

  return "Obrigado pela sua mensagem! Posso ajudá-lo com informações sobre nossos cursos, planos de assinatura, certificados ou qualquer outra dúvida. O que gostaria de saber?";
}

export default function SalesAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAutoResponse(text);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shimmer text-white shadow-xl shadow-[oklch(0.55_0.22_20/0.3)] flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[oklch(0.55_0.22_20)] animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-4rem)] bg-[oklch(0.1_0.005_250)] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-[oklch(0.08_0.005_250)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Assistente THD</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "assistant"
                        ? "bg-gold/15"
                        : "bg-white/10"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot className="w-4 h-4 text-gold" />
                    ) : (
                      <User className="w-4 h-4 text-white/60" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-white/[0.05] text-white/80"
                        : "bg-gold/15 text-white/90"
                    }`}
                  >
                    {msg.content.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gold" />
                  </div>
                  <div className="bg-white/[0.05] rounded-xl px-4 py-3 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="text-xs bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-gold hover:border-gold/20 rounded-full px-3 py-1.5 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-white/[0.06] bg-[oklch(0.08_0.005_250)]"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/40 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-lg bg-gold/15 text-gold hover:bg-gold/25 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
