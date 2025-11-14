"use client";

import { useState } from "react";
import { User, Trophy, Flame, TrendingUp, Heart, MessageSquare, LogOut, Camera, LucideIcon } from "lucide-react";

interface ProfileScreenProps {
  userXP: number;
  userStreak: number;
  userLevel: string;
  onLogout: () => void;
}

interface Favorite {
  id: number;
  title: string;
  level: string;
}

interface ConversationHistoryItem {
  id: number;
  scenario: string;
  date: string;
  score: number;
}

const favorites: Favorite[] = [
  { id: 1, title: "Friends - Coffee Scene", level: "A1-A2" },
  { id: 2, title: "Breaking Bad - Chemistry", level: "B1-B2" },
  { id: 3, title: "The Office - Interview", level: "A2-B1" },
];

const conversationHistory: ConversationHistoryItem[] = [
  { id: 1, scenario: "Conversação Casual", date: "Hoje", score: 85 },
  { id: 2, scenario: "Viagem", date: "Ontem", score: 78 },
  { id: 3, scenario: "Trabalho", date: "2 dias atrás", score: 92 },
];

export default function ProfileScreen({ userXP, userStreak, userLevel, onLogout }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<"stats" | "favorites" | "history">("stats");

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border-2 border-purple-500 hover:bg-gray-800 transition-colors">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <h2 className="text-3xl font-bold text-white">Estudante Learn Flix</h2>
              <p className="text-gray-400">Aprendendo inglês desde Janeiro 2024</p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <StatBadge icon={Trophy} label="XP Total" value={userXP.toString()} color="yellow" />
                <StatBadge icon={Flame} label="Sequência" value={`${userStreak} dias`} color="orange" />
                <StatBadge icon={TrendingUp} label="Nível" value={userLevel} color="purple" />
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 border border-gray-700"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-800">
          <TabButton
            active={activeTab === "stats"}
            onClick={() => setActiveTab("stats")}
            label="Estatísticas"
          />
          <TabButton
            active={activeTab === "favorites"}
            onClick={() => setActiveTab("favorites")}
            label="Favoritos"
          />
          <TabButton
            active={activeTab === "history"}
            onClick={() => setActiveTab("history")}
            label="Histórico IA"
          />
        </div>

        {/* Tab Content */}
        {activeTab === "stats" && <StatsTab userXP={userXP} userStreak={userStreak} />}
        {activeTab === "favorites" && <FavoritesTab favorites={favorites} />}
        {activeTab === "history" && <HistoryTab history={conversationHistory} />}
      </div>
    </div>
  );
}

interface StatBadgeProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: "yellow" | "orange" | "purple";
}

function StatBadge({ icon: Icon, label, value, color }: StatBadgeProps) {
  const colors: Record<string, string> = {
    yellow: "from-yellow-500 to-orange-500",
    orange: "from-orange-500 to-red-500",
    purple: "from-purple-500 to-pink-500",
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full">
      <div className={`w-8 h-8 bg-gradient-to-br ${colors[color]} rounded-full flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function TabButton({ active, onClick, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium transition-all duration-300 ${
        active
          ? "text-white border-b-2 border-purple-500"
          : "text-gray-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

interface StatsTabProps {
  userXP: number;
  userStreak: number;
}

function StatsTab({ userXP, userStreak }: StatsTabProps) {
  return (
    <div className="space-y-6">
      {/* Skills Progress */}
      <div className="bg-gray-900 rounded-2xl p-6 space-y-6">
        <h3 className="text-xl font-bold text-white">Evolução por Habilidade</h3>
        
        <SkillBar label="Listening" value={75} icon="🎧" />
        <SkillBar label="Speaking" value={65} icon="🗣️" />
        <SkillBar label="Vocabulary" value={82} icon="📚" />
        <SkillBar label="Grammar" value={70} icon="✍️" />
        <SkillBar label="Reading" value={78} icon="📖" />
      </div>

      {/* Activity Chart */}
      <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-bold text-white">Atividade nos Últimos 7 Dias</h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg transition-all duration-500 hover:from-purple-500 hover:to-pink-500"
                style={{ height: `${height}%` }}
              ></div>
              <span className="text-xs text-gray-400">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
        <h3 className="text-xl font-bold text-white">Conquistas Recentes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Achievement emoji="🔥" title="7 Dias" subtitle="Sequência" />
          <Achievement emoji="⭐" title="1000 XP" subtitle="Pontos" />
          <Achievement emoji="🎯" title="50 Lições" subtitle="Completas" />
          <Achievement emoji="🤖" title="IA Master" subtitle="10 Conversas" />
        </div>
      </div>
    </div>
  );
}

interface SkillBarProps {
  label: string;
  value: number;
  icon: string;
}

function SkillBar({ label, value, icon }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span className="text-white font-medium">{label}</span>
        </div>
        <span className="text-purple-400 font-bold">{value}%</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

interface AchievementProps {
  emoji: string;
  title: string;
  subtitle: string;
}

function Achievement({ emoji, title, subtitle }: AchievementProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-750 transition-colors">
      <div className="text-4xl mb-2">{emoji}</div>
      <p className="text-white font-bold">{title}</p>
      <p className="text-gray-400 text-xs">{subtitle}</p>
    </div>
  );
}

interface FavoritesTabProps {
  favorites: Favorite[];
}

function FavoritesTab({ favorites }: FavoritesTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Lições Favoritas</h3>
        <div className="flex items-center gap-2 text-gray-400">
          <Heart className="w-5 h-5" />
          <span>{favorites.length} favoritos</span>
        </div>
      </div>

      <div className="space-y-3">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 rounded-xl p-4 flex items-center justify-between hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h4 className="text-white font-medium">{item.title}</h4>
                <p className="text-gray-400 text-sm">Nível: {item.level}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
              Assistir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface HistoryTabProps {
  history: ConversationHistoryItem[];
}

function HistoryTab({ history }: HistoryTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Histórico de Conversas com IA</h3>
        <div className="flex items-center gap-2 text-gray-400">
          <MessageSquare className="w-5 h-5" />
          <span>{history.length} conversas</span>
        </div>
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{item.scenario}</h4>
                  <p className="text-gray-400 text-sm">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-400">{item.score}%</p>
                <p className="text-gray-400 text-xs">Score médio</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                Ver Detalhes
              </button>
              <button className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors text-sm">
                Continuar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
