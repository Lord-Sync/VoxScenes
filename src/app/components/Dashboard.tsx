"use client";

import { Play, Star, TrendingUp, Clock, LucideIcon } from "lucide-react";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

interface Lesson {
  id: number;
  title: string;
  level: string;
  levelColor: string;
  image: string;
  progress: number;
  duration: string;
  category: string;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Friends - The One with the Coffee",
    level: "A1-A2",
    levelColor: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=250&fit=crop",
    progress: 65,
    duration: "5 min",
    category: "Iniciante"
  },
  {
    id: 2,
    title: "Breaking Bad - Chemistry Class",
    level: "B1-B2",
    levelColor: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop",
    progress: 30,
    duration: "8 min",
    category: "Intermediário"
  },
  {
    id: 3,
    title: "The Office - Job Interview",
    level: "A2-B1",
    levelColor: "from-green-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=250&fit=crop",
    progress: 0,
    duration: "6 min",
    category: "Iniciante"
  },
  {
    id: 4,
    title: "Stranger Things - School Conversation",
    level: "B1-B2",
    levelColor: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=250&fit=crop",
    progress: 0,
    duration: "7 min",
    category: "Intermediário"
  },
  {
    id: 5,
    title: "The Crown - Royal Speech",
    level: "C1-C2",
    levelColor: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=250&fit=crop",
    progress: 0,
    duration: "10 min",
    category: "Avançado"
  },
  {
    id: 6,
    title: "How I Met Your Mother - Bar Scene",
    level: "A2-B1",
    levelColor: "from-green-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
    progress: 0,
    duration: "5 min",
    category: "Iniciante"
  }
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Hero Banner */}
      <div className="relative h-[400px] bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-purple-900/40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574267432644-f74f8ec55d33?w=1920&h=400&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm">
              <TrendingUp className="w-4 h-4" />
              Dica do dia
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-2xl">
              Pratique 15 minutos por dia e veja resultados em 30 dias
            </h2>
            <p className="text-gray-300 text-lg max-w-xl">
              Estudos mostram que a consistência é mais importante que a quantidade. Comece agora!
            </p>
            <button
              onClick={() => onNavigate("lesson")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <Play className="w-5 h-5" fill="white" />
              Começar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Continue Watching */}
        <Section title="Continue de onde parou" icon={Clock}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.filter(l => l.progress > 0).map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onNavigate={onNavigate} />
            ))}
          </div>
        </Section>

        {/* Iniciante */}
        <Section title="Iniciante (A1-A2)" subtitle="Comece sua jornada no inglês">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.filter(l => l.category === "Iniciante").map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onNavigate={onNavigate} />
            ))}
          </div>
        </Section>

        {/* Intermediário */}
        <Section title="Intermediário (B1-B2)" subtitle="Aprimore suas habilidades">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.filter(l => l.category === "Intermediário").map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onNavigate={onNavigate} />
            ))}
          </div>
        </Section>

        {/* Avançado */}
        <Section title="Avançado (C1-C2)" subtitle="Domine o idioma">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.filter(l => l.category === "Avançado").map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onNavigate={onNavigate} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

function Section({ title, subtitle, icon: Icon, children }: SectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-6 h-6 text-purple-400" />}
        <div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

interface LessonCardProps {
  lesson: Lesson;
  onNavigate: (screen: string) => void;
}

function LessonCard({ lesson, onNavigate }: LessonCardProps) {
  return (
    <div
      onClick={() => onNavigate("lesson")}
      className="group cursor-pointer bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-black ml-1" fill="black" />
          </div>
        </div>

        {/* Level Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 bg-gradient-to-r ${lesson.levelColor} rounded-full text-white text-xs font-bold`}>
          {lesson.level}
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-white text-xs flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {lesson.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
          {lesson.title}
        </h4>

        {/* Progress Bar */}
        {lesson.progress > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Progresso</span>
              <span>{lesson.progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${lesson.levelColor} transition-all duration-500`}
                style={{ width: `${lesson.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {lesson.progress === 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Star className="w-4 h-4" />
            <span>Novo</span>
          </div>
        )}
      </div>
    </div>
  );
}
