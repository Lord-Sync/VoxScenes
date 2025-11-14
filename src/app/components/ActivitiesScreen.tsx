"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, Volume2 } from "lucide-react";

interface ActivitiesScreenProps {
  onNavigate: (screen: string) => void;
  onAddXP: (amount: number) => void;
}

type ActivityType = "fill-blank" | "drag-drop" | "quiz" | "listen-write" | "speaking";

export default function ActivitiesScreen({ onNavigate, onAddXP }: ActivitiesScreenProps) {
  const [currentActivity, setCurrentActivity] = useState<ActivityType>("fill-blank");
  const [score, setScore] = useState(0);
  const [totalQuestions] = useState(5);

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Atividades Interativas</h1>
            <p className="text-gray-400 mt-1">Friends - The One with the Coffee</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
            <Trophy className="w-5 h-5 text-white" />
            <span className="text-white font-bold">{score}/{totalQuestions}</span>
          </div>
        </div>

        {/* Activity Type Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <ActivityButton
            active={currentActivity === "fill-blank"}
            onClick={() => setCurrentActivity("fill-blank")}
            label="Complete a Frase"
          />
          <ActivityButton
            active={currentActivity === "drag-drop"}
            onClick={() => setCurrentActivity("drag-drop")}
            label="Arraste e Solte"
          />
          <ActivityButton
            active={currentActivity === "quiz"}
            onClick={() => setCurrentActivity("quiz")}
            label="Quiz"
          />
          <ActivityButton
            active={currentActivity === "listen-write"}
            onClick={() => setCurrentActivity("listen-write")}
            label="Ouça e Escreva"
          />
          <ActivityButton
            active={currentActivity === "speaking"}
            onClick={() => setCurrentActivity("speaking")}
            label="Speaking"
          />
        </div>

        {/* Activity Content */}
        <div className="bg-gray-900 rounded-2xl p-8">
          {currentActivity === "fill-blank" && <FillBlankActivity onScore={() => setScore(s => s + 1)} />}
          {currentActivity === "drag-drop" && <DragDropActivity onScore={() => setScore(s => s + 1)} />}
          {currentActivity === "quiz" && <QuizActivity onScore={() => setScore(s => s + 1)} />}
          {currentActivity === "listen-write" && <ListenWriteActivity onScore={() => setScore(s => s + 1)} />}
          {currentActivity === "speaking" && <SpeakingActivity onScore={() => setScore(s => s + 1)} />}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Progresso da Atividade</span>
            <span>{Math.round((score / totalQuestions) * 100)}%</span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${(score / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Complete Button */}
        {score >= totalQuestions && (
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/50 rounded-2xl p-8 text-center space-y-4 animate-in zoom-in duration-500">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">Parabéns! 🎉</h3>
            <p className="text-gray-300">Você completou todas as atividades e ganhou 100 XP!</p>
            <button
              onClick={() => {
                onAddXP(100);
                onNavigate("dashboard");
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105"
            >
              Voltar ao Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ActivityButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function ActivityButton({ active, onClick, label }: ActivityButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
      }`}
    >
      {label}
    </button>
  );
}

interface ActivityProps {
  onScore: () => void;
}

function FillBlankActivity({ onScore }: ActivityProps) {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const checkAnswer = () => {
    const correct = answer.toLowerCase().trim() === "coffee";
    setIsCorrect(correct);
    if (correct) onScore();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Complete a frase:</h3>
      <div className="bg-gray-800 rounded-xl p-6">
        <p className="text-lg text-gray-300">
          I would like a cup of <span className="text-purple-400 font-bold">_______</span>, please.
        </p>
      </div>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Digite sua resposta..."
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-purple-500"
      />
      {isCorrect !== null && (
        <div className={`flex items-center gap-2 p-4 rounded-xl ${isCorrect ? "bg-green-900/30 border border-green-500/50" : "bg-red-900/30 border border-red-500/50"}`}>
          {isCorrect ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="text-green-400 font-medium">Correto! Ótimo trabalho!</span>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 text-red-500" />
              <span className="text-red-400 font-medium">Tente novamente!</span>
            </>
          )}
        </div>
      )}
      <button
        onClick={checkAnswer}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
      >
        Verificar Resposta
      </button>
    </div>
  );
}

function DragDropActivity({ onScore }: ActivityProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Arraste as palavras para formar a frase:</h3>
      <div className="bg-gray-800 rounded-xl p-6 min-h-[100px] flex items-center justify-center">
        <p className="text-gray-500">Arraste as palavras aqui...</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {["How", "are", "you", "doing", "today", "?"].map((word, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-move hover:bg-purple-500 transition-colors"
          >
            {word}
          </div>
        ))}
      </div>
      <button
        onClick={onScore}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
      >
        Verificar Ordem
      </button>
    </div>
  );
}

function QuizActivity({ onScore }: ActivityProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Qual é a tradução de &quot;How are you?&quot;</h3>
      <div className="space-y-3">
        {[
          "Como você está?",
          "Onde você está?",
          "Quem é você?",
          "O que você faz?"
        ].map((option, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`w-full text-left px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
              selected === index
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          if (selected === 0) onScore();
        }}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
      >
        Confirmar Resposta
      </button>
    </div>
  );
}

function ListenWriteActivity({ onScore }: ActivityProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Ouça e escreva o que você ouviu:</h3>
      <div className="flex justify-center">
        <button className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <Volume2 className="w-10 h-10 text-white" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Digite o que você ouviu..."
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-purple-500"
      />
      <button
        onClick={onScore}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
      >
        Verificar
      </button>
    </div>
  );
}

function SpeakingActivity({ onScore }: ActivityProps) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Repita a frase:</h3>
      <div className="bg-gray-800 rounded-xl p-6 text-center">
        <p className="text-2xl text-purple-400 font-medium">&quot;How are you doing today?&quot;</p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording
              ? "bg-red-600 animate-pulse"
              : "bg-gradient-to-br from-purple-600 to-pink-600 hover:scale-110"
          }`}
        >
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </button>
      </div>
      <p className="text-center text-gray-400">
        {isRecording ? "Gravando... Fale agora!" : "Clique para gravar sua pronúncia"}
      </p>
      {isRecording && (
        <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4">
          <h4 className="text-white font-medium mb-2">Feedback em tempo real:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Pronúncia:</span>
              <span className="text-green-400">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Fluência:</span>
              <span className="text-yellow-400">70%</span>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={onScore}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
      >
        Enviar Gravação
      </button>
    </div>
  );
}
