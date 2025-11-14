"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Settings, Heart, BookOpen, Repeat } from "lucide-react";

interface LessonScreenProps {
  onNavigate: (screen: string) => void;
  onAddXP: (amount: number) => void;
}

const vocabulary = [
  { word: "Coffee", translation: "Café", context: "Usado em contextos informais e formais" },
  { word: "How are you?", translation: "Como você está?", context: "Cumprimento comum em inglês" },
  { word: "Great", translation: "Ótimo", context: "Expressão de entusiasmo" },
];

const idioms = [
  { phrase: "Break the ice", meaning: "Quebrar o gelo", explanation: "Iniciar uma conversa em situação desconfortável" },
  { phrase: "Piece of cake", meaning: "Moleza", explanation: "Algo muito fácil de fazer" },
];

export default function LessonScreen({ onNavigate, onAddXP }: LessonScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState<"en" | "pt" | "both">("both");
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Video Player */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Friends - The One with the Coffee</h1>
              <p className="text-gray-400 mt-1">Nível: A1-A2 • Duração: 5 min</p>
            </div>
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`p-3 rounded-full transition-all duration-300 ${
                isFavorited
                  ? "bg-pink-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <Heart className="w-6 h-6" fill={isFavorited ? "white" : "none"} />
            </button>
          </div>

          {/* Video Container */}
          <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=675&fit=crop"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            
            {/* Subtitles Overlay */}
            <div className="absolute bottom-20 left-0 right-0 px-8 space-y-2">
              {(showSubtitles === "en" || showSubtitles === "both") && (
                <div className="text-center">
                  <p className="text-white text-xl font-medium bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                    Hey, how are you doing today?
                  </p>
                </div>
              )}
              {(showSubtitles === "pt" || showSubtitles === "both") && (
                <div className="text-center">
                  <p className="text-yellow-400 text-lg bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                    Ei, como você está hoje?
                  </p>
                </div>
              )}
            </div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-black" fill="black" />
                ) : (
                  <Play className="w-10 h-10 text-black ml-1" fill="black" />
                )}
              </button>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden cursor-pointer">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-1/3"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="text-white hover:text-purple-400 transition-colors">
                    <SkipBack className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </button>
                  <button className="text-white hover:text-purple-400 transition-colors">
                    <SkipForward className="w-6 h-6" />
                  </button>
                  <button className="text-white hover:text-purple-400 transition-colors">
                    <Repeat className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {/* Subtitle Toggle */}
                  <select
                    value={showSubtitles}
                    onChange={(e) => setShowSubtitles(e.target.value as any)}
                    className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm border border-gray-700 focus:outline-none focus:border-purple-500"
                  >
                    <option value="en">EN</option>
                    <option value="pt">PT</option>
                    <option value="both">EN + PT</option>
                  </select>

                  {/* Speed Control */}
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm border border-gray-700 focus:outline-none focus:border-purple-500"
                  >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                  </select>

                  <button className="text-white hover:text-purple-400 transition-colors">
                    <Volume2 className="w-6 h-6" />
                  </button>
                  <button className="text-white hover:text-purple-400 transition-colors">
                    <Settings className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vocabulary */}
          <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              Vocabulário Essencial
            </h3>
            <div className="space-y-3">
              {vocabulary.map((item, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-white font-semibold text-lg">{item.word}</span>
                    <span className="text-purple-400">{item.translation}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.context}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Idioms */}
          <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">Expressões Idiomáticas</h3>
            <div className="space-y-3">
              {idioms.map((item, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-white font-semibold">{item.phrase}</span>
                    <span className="text-pink-400 text-sm">{item.meaning}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grammar Notes */}
        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">📝 Notas Gramaticais</h3>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-purple-400">Present Simple:</strong> Usado para rotinas e fatos gerais.
              Exemplo: "I drink coffee every morning"
            </p>
            <p>
              <strong className="text-purple-400">Question Form:</strong> How are you? = Como você está?
              Estrutura: How + verbo to be + sujeito
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              onAddXP(50);
              onNavigate("activities");
            }}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            Fazer Atividades (+50 XP)
          </button>
          <button className="flex-1 px-6 py-4 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700">
            Repetir Lição
          </button>
        </div>
      </div>
    </div>
  );
}
