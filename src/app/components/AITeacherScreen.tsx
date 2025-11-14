"use client";

import { useState } from "react";
import { MessageSquare, Mic, Volume2, Send, Sparkles, TrendingUp, BookOpen, Briefcase, Coffee, Plane, LucideIcon } from "lucide-react";

interface AITeacherScreenProps {
  userLevel: string;
  onAddXP: (amount: number) => void;
}

type Scenario = "casual" | "travel" | "work" | "interview" | "restaurant";

interface ScenarioOption {
  id: Scenario;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface Message {
  role: "user" | "ai";
  text: string;
  feedback?: Feedback;
}

interface Feedback {
  pronunciation: number;
  fluency: number;
  vocabulary: number;
  grammar: number;
  suggestions: string[];
}

const scenarios: ScenarioOption[] = [
  { id: "casual", name: "Conversação Casual", icon: MessageSquare, color: "from-blue-500 to-cyan-500" },
  { id: "travel", name: "Viagem", icon: Plane, color: "from-purple-500 to-pink-500" },
  { id: "work", name: "Trabalho", icon: Briefcase, color: "from-green-500 to-emerald-500" },
  { id: "interview", name: "Entrevista", icon: TrendingUp, color: "from-orange-500 to-red-500" },
  { id: "restaurant", name: "Café / Restaurante", icon: Coffee, color: "from-yellow-500 to-orange-500" },
];

export default function AITeacherScreen({ userLevel, onAddXP }: AITeacherScreenProps) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  const startConversation = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    const greetings: Record<Scenario, string> = {
      casual: "Hi! How's your day going? I'm here to practice casual English conversation with you. Feel free to talk about anything!",
      travel: "Hello! Welcome to the airport. How can I help you today? Let's practice travel-related English!",
      work: "Good morning! Let's discuss your current project. This is a great opportunity to practice professional English.",
      interview: "Hello, please have a seat. Tell me about yourself and why you're interested in this position.",
      restaurant: "Good evening! Welcome to our restaurant. What would you like to order today?"
    };
    setMessages([{ role: "ai", text: greetings[scenario] }]);
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessages: Message[] = [
      ...messages,
      { role: "user", text: inputText }
    ];
    
    // Simulate AI response with feedback
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "ai",
          text: "That's great! Your pronunciation is improving. Let me give you some feedback...",
          feedback: {
            pronunciation: 85,
            fluency: 78,
            vocabulary: 90,
            grammar: 82,
            suggestions: [
              "Try to speak a bit slower for better clarity",
              "Great use of vocabulary!",
              "Consider using 'going to' instead of 'gonna' in formal contexts"
            ]
          }
        }
      ]);
      onAddXP(20);
    }, 1000);
    
    setInputText("");
  };

  if (!selectedScenario) {
    return (
      <div className="min-h-screen bg-black pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white">Professor IA</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Pratique conversação em inglês com inteligência artificial. Receba feedback instantâneo sobre pronúncia, fluência e gramática.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-300">
              <BookOpen className="w-4 h-4" />
              Seu nível atual: {userLevel}
            </div>
          </div>

          {/* Scenarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => startConversation(scenario.id)}
                className="group bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 text-left"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${scenario.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <scenario.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{scenario.name}</h3>
                <p className="text-gray-400 text-sm">
                  Pratique situações reais de {scenario.name.toLowerCase()}
                </p>
              </button>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            <FeatureCard
              emoji="🎤"
              title="Reconhecimento de Voz"
              description="Fale naturalmente e receba feedback em tempo real"
            />
            <FeatureCard
              emoji="🔊"
              title="Voz Natural da IA"
              description="Ouça pronúncia nativa e pratique listening"
            />
            <FeatureCard
              emoji="📊"
              title="Análise Detalhada"
              description="Acompanhe sua evolução em pronúncia, fluência e gramática"
            />
            <FeatureCard
              emoji="💾"
              title="Histórico Completo"
              description="Revise suas conversas e frases aprendidas"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedScenario(null);
                setMessages([]);
              }}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              ← Voltar
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {scenarios.find(s => s.id === selectedScenario)?.name}
              </h2>
              <p className="text-gray-400 text-sm">Conversando com Professor IA</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-900/30 border border-green-500/50 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Ao vivo</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-gray-900 rounded-2xl p-6 min-h-[400px] max-h-[500px] overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[80%] space-y-2">
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
                
                {message.feedback && (
                  <div className="bg-gray-800 rounded-xl p-4 space-y-3">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      Feedback Instantâneo
                    </h4>
                    
                    {/* Scores */}
                    <div className="grid grid-cols-2 gap-3">
                      <ScoreBar label="Pronúncia" value={message.feedback.pronunciation} />
                      <ScoreBar label="Fluência" value={message.feedback.fluency} />
                      <ScoreBar label="Vocabulário" value={message.feedback.vocabulary} />
                      <ScoreBar label="Gramática" value={message.feedback.grammar} />
                    </div>

                    {/* Suggestions */}
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm font-medium">Sugestões:</p>
                      {message.feedback.suggestions.map((suggestion, i) => (
                        <p key={i} className="text-gray-300 text-sm">• {suggestion}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-gray-900 rounded-2xl p-4 space-y-4">
          {/* Voice Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsAISpeaking(!isAISpeaking)}
              className={`p-4 rounded-full transition-all duration-300 ${
                isAISpeaking
                  ? "bg-purple-600 animate-pulse"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <Volume2 className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-6 rounded-full transition-all duration-300 ${
                isRecording
                  ? "bg-red-600 animate-pulse scale-110"
                  : "bg-gradient-to-br from-purple-600 to-pink-600 hover:scale-110"
              }`}
            >
              <Mic className="w-8 h-8 text-white" />
            </button>

            <div className="text-center">
              <p className="text-gray-400 text-sm">
                {isRecording ? "Ouvindo..." : "Clique no microfone para falar"}
              </p>
            </div>
          </div>

          {/* Text Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ou digite sua mensagem..."
              className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={sendMessage}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Phrases */}
        <div className="flex flex-wrap gap-2">
          <QuickPhrase text="Hello, how are you?" onClick={setInputText} />
          <QuickPhrase text="Can you help me?" onClick={setInputText} />
          <QuickPhrase text="I don't understand" onClick={setInputText} />
          <QuickPhrase text="Could you repeat that?" onClick={setInputText} />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors">
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

interface ScoreBarProps {
  label: string;
  value: number;
}

function ScoreBar({ label, value }: ScoreBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{value}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

interface QuickPhraseProps {
  text: string;
  onClick: (text: string) => void;
}

function QuickPhrase({ text, onClick }: QuickPhraseProps) {
  return (
    <button
      onClick={() => onClick(text)}
      className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors"
    >
      {text}
    </button>
  );
}
