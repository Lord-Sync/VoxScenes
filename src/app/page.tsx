"use client";

import { useState } from "react";
import { 
  Play, 
  BookOpen, 
  MessageSquare, 
  User, 
  Settings, 
  Home as HomeIcon, 
  Trophy, 
  Flame,
  LucideIcon
} from "lucide-react";

import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import LessonScreen from "./components/LessonScreen";
import ActivitiesScreen from "./components/ActivitiesScreen";
import AITeacherScreen from "./components/AITeacherScreen";
import ProfileScreen from "./components/ProfileScreen";
import SettingsScreen from "./components/SettingsScreen";

type Screen = 
  | "login" 
  | "dashboard" 
  | "lesson" 
  | "activities" 
  | "ai-teacher" 
  | "profile" 
  | "settings";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userXP, setUserXP] = useState(1250);
  const [userStreak, setUserStreak] = useState(7);
  const [userLevel, setUserLevel] = useState("B1");

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen("login");
  };

  const addXP = (amount: number) => {
    setUserXP(prev => prev + amount);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentScreen("dashboard")}>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                VoxScenes
              </span>
            </div>

            {/* User Stats */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">{userStreak} dias</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{userXP} XP</span>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center gap-2">
              <NavButton
                icon={HomeIcon}
                active={currentScreen === "dashboard"}
                onClick={() => setCurrentScreen("dashboard")}
                label="Home"
              />
              <NavButton
                icon={BookOpen}
                active={currentScreen === "lesson"}
                onClick={() => setCurrentScreen("lesson")}
                label="Lição"
              />
              <NavButton
                icon={MessageSquare}
                active={currentScreen === "ai-teacher"}
                onClick={() => setCurrentScreen("ai-teacher")}
                label="Professor IA"
              />
              <NavButton
                icon={User}
                active={currentScreen === "profile"}
                onClick={() => setCurrentScreen("profile")}
                label="Perfil"
              />
              <NavButton
                icon={Settings}
                active={currentScreen === "settings"}
                onClick={() => setCurrentScreen("settings")}
                label="Configurações"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {currentScreen === "dashboard" && <Dashboard onNavigate={setCurrentScreen} />}
        {currentScreen === "lesson" && <LessonScreen onNavigate={setCurrentScreen} onAddXP={addXP} />}
        {currentScreen === "activities" && <ActivitiesScreen onNavigate={setCurrentScreen} onAddXP={addXP} />}
        {currentScreen === "ai-teacher" && <AITeacherScreen userLevel={userLevel} onAddXP={addXP} />}
        {currentScreen === "profile" && (
          <ProfileScreen
            userXP={userXP}
            userStreak={userStreak}
            userLevel={userLevel}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === "settings" && <SettingsScreen />}
      </main>
    </div>
  );
}

interface NavButtonProps {
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
  label: string;
}

function NavButton({ icon: Icon, active, onClick, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-300 ${
        active
          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
          : "text-gray-400 hover:text-white hover:bg-gray-800"
      }`}
      title={label}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
