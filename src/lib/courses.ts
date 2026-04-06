export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  duration: string;
  lessons: number;
  image: string;
  description: string;
  badge?: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "trending", name: "Em Alta", icon: "TrendingUp" },
  { id: "negocios", name: "Negócios & Empreendedorismo", icon: "Briefcase" },
  { id: "tecnologia", name: "Tecnologia & Inovação", icon: "Cpu" },
  { id: "saude", name: "Saúde & Bem-Estar", icon: "Heart" },
  { id: "criativo", name: "Criatividade & Arte", icon: "Palette" },
  { id: "marketing", name: "Marketing Digital", icon: "Megaphone" },
  { id: "financas", name: "Finanças & Investimentos", icon: "DollarSign" },
  { id: "lideranca", name: "Liderança & Gestão", icon: "Users" },
  { id: "comunicacao", name: "Comunicação & Oratória", icon: "Mic" },
  { id: "producao", name: "Produção Audiovisual", icon: "Video" },
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Liderança Estratégica para o Século XXI",
    instructor: "Ricardo Almeida",
    category: "lideranca",
    duration: "2h 15min",
    lessons: 18,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663507494116/HpW8gQ4FfbuLvoESh9jafb/course-business-nJnX3W42UuSEQDpASTgtbt.webp",
    description: "Domine as habilidades essenciais de liderança com um dos maiores executivos do Brasil.",
    badge: "Novo",
    featured: true,
  },
  {
    id: "2",
    title: "Inteligência Artificial Aplicada aos Negócios",
    instructor: "Dra. Marina Santos",
    category: "tecnologia",
    duration: "3h 40min",
    lessons: 24,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663507494116/HpW8gQ4FfbuLvoESh9jafb/course-tech-MLEtoWMcM7vkvZNhE49dcR.webp",
    description: "Aprenda a implementar IA no seu negócio e revolucione seus resultados.",
    badge: "Novo",
    featured: true,
  },
  {
    id: "3",
    title: "Medicina Integrativa e Qualidade de Vida",
    instructor: "Dr. Paulo Mendes",
    category: "saude",
    duration: "1h 50min",
    lessons: 14,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663507494116/HpW8gQ4FfbuLvoESh9jafb/course-health-AgXP42CUo2EbDH7TbQHw7y.webp",
    description: "Descubra como a medicina integrativa pode transformar sua saúde e bem-estar.",
    badge: "Novo",
    featured: true,
  },
  {
    id: "4",
    title: "Arte e Expressão Criativa",
    instructor: "Luísa Ferreira",
    category: "criativo",
    duration: "2h 30min",
    lessons: 20,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663507494116/HpW8gQ4FfbuLvoESh9jafb/course-creative-Aht4QKgeMQhQXkpWrER488.webp",
    description: "Liberte sua criatividade e aprenda técnicas de expressão artística com uma mestre.",
    badge: "Novo",
    featured: true,
  },
  {
    id: "5",
    title: "Marketing Digital de Alta Performance",
    instructor: "Felipe Costa",
    category: "marketing",
    duration: "3h 10min",
    lessons: 22,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description: "Estratégias avançadas de marketing digital para escalar seu negócio online.",
    badge: "Popular",
  },
  {
    id: "6",
    title: "Investimentos e Mercado Financeiro",
    instructor: "Ana Beatriz Lima",
    category: "financas",
    duration: "2h 45min",
    lessons: 19,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    description: "Do básico ao avançado: construa sua carteira de investimentos com segurança.",
    badge: "Popular",
  },
  {
    id: "7",
    title: "Empreendedorismo Digital",
    instructor: "Carlos Eduardo",
    category: "negocios",
    duration: "2h 55min",
    lessons: 21,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    description: "Construa um negócio digital do zero com metodologias comprovadas.",
  },
  {
    id: "8",
    title: "Oratória e Comunicação Persuasiva",
    instructor: "Marcos Vinícius",
    category: "comunicacao",
    duration: "1h 40min",
    lessons: 12,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    description: "Aprenda a se comunicar com impacto e persuadir qualquer audiência.",
  },
  {
    id: "9",
    title: "Produção de Vídeo Profissional",
    instructor: "Juliana Rocha",
    category: "producao",
    duration: "3h 20min",
    lessons: 25,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    description: "Domine as técnicas de produção audiovisual usadas pelos maiores estúdios.",
  },
  {
    id: "10",
    title: "Data Science e Análise de Dados",
    instructor: "Prof. Roberto Silva",
    category: "tecnologia",
    duration: "4h 00min",
    lessons: 30,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    description: "Transforme dados em decisões estratégicas com ciência de dados aplicada.",
  },
  {
    id: "11",
    title: "Gestão de Equipes Remotas",
    instructor: "Patrícia Nunes",
    category: "lideranca",
    duration: "1h 55min",
    lessons: 15,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    description: "Lidere equipes distribuídas com eficiência e mantenha a produtividade.",
  },
  {
    id: "12",
    title: "Nutrição Funcional e Performance",
    instructor: "Dra. Camila Borges",
    category: "saude",
    duration: "2h 10min",
    lessons: 16,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    description: "Otimize sua saúde e performance através da nutrição funcional baseada em evidências.",
  },
];

export function getCoursesByCategory(categoryId: string): Course[] {
  if (categoryId === "trending") {
    return courses.filter((c) => c.featured || c.badge === "Popular");
  }
  return courses.filter((c) => c.category === categoryId);
}
