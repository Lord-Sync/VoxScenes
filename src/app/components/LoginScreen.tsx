"use client";

import { Play, Mail, Chrome, UserCircle } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 animate-in fade-in duration-700">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-in zoom-in duration-500">
              <Play className="w-12 h-12 text-white" fill="white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-700">
            Learn Flix
          </h1>
          <p className="text-gray-400 text-lg animate-in slide-in-from-bottom-4 duration-700 delay-100">
            Aprenda inglês com séries, filmes e IA
          </p>
        </div>

        {/* Login Buttons */}
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-200">
          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
          >
            <Chrome className="w-5 h-5" />
            Continuar com Google
          </button>

          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <Mail className="w-5 h-5" />
            Continuar com Email
          </button>

          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-all duration-300 hover:scale-105 border border-gray-700"
          >
            <UserCircle className="w-5 h-5" />
            Entrar como Convidado
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 pt-8 animate-in slide-in-from-bottom-4 duration-700 delay-300">
          <FeatureCard icon="🎬" text="Séries & Filmes" />
          <FeatureCard icon="🤖" text="Professor IA" />
          <FeatureCard icon="🎯" text="Atividades" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-xs text-gray-400">{text}</p>
    </div>
  );
}
