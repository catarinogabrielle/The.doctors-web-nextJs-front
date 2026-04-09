export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  lessons: number;
  image: string;
  description: string;
  badge?: string;
  featured?: boolean;
  videoUrl: string;
  paymentlink: string;
  teacherphoto: string;
  teacherwork: string;
  teacherinfo: string;
  time: string;
}

export interface BackendCourse {
  id: string;
  title: string;
  image: string;
  teachername: string;
  teacherphoto: string;
  teacherwork: string;
  teacherinfo: string;
  description: string;
  time: string;
  link: string;
  category: string | null;
  paymentlink: string;
  _count: {
    classes: number;
  };
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8443";

export function mapBackendCourses(backendCourses: BackendCourse[]): Course[] {
  return backendCourses.map((c) => ({
    id: c.id,
    title: c.title,
    instructor: c.teachername,
    category: c.category || "trending",
    lessons: c._count.classes,
    image: c.image.startsWith("http") ? c.image : `${API_URL}/files/${c.image}`,
    description: c.description,
    videoUrl: c.link,
    paymentlink: c.paymentlink,
    teacherphoto: c.teacherphoto?.startsWith("http") ? c.teacherphoto : `${API_URL}/files/${c.teacherphoto}`,
    teacherwork: c.teacherwork,
    teacherinfo: c.teacherinfo,
    time: c.time,
  }));
}

export function getCoursesByCategory(courses: Course[], categoryId: string): Course[] {
  if (categoryId === "trending") {
    return courses;
  }
  const filtered = courses.filter((c) => c.category === categoryId);
  return filtered.length > 0 ? filtered : courses;
}

