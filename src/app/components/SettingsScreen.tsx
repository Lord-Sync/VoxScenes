"use client";

import { useState } from "react";
import { Settings, Globe, Bell, Volume2, Zap, Moon, LucideIcon } from "lucide-react";

interface SettingsState {
  dualSubtitles: boolean;
  videoSpeed: number;
  interfaceLanguage: string;
  notifications: boolean;
  darkMode: boolean;
  autoplay: boolean;
  soundEffects: boolean;
}

interface SelectOption {
  value: number | string;
  label: string;
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState<SettingsState>({
    dualSubtitles: true,
    videoSpeed: 1.0,
    interfaceLanguage: "pt-BR",
    notifications: true,
    darkMode: true,
    autoplay: false,
    soundEffects: true,
  });

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-purple-400" />
            Configurações
          </h1>
          <p className="text-gray-400">Personalize sua experiência de aprendizado</p>
        </div>

        {/* Video Settings */}
        <SettingsSection title="Configurações de Vídeo" icon={Volume2}>
          <SettingToggle
            label="Legenda Dupla (EN + PT)"
            description="Exibir legendas em inglês e português simultaneamente"
            checked={settings.dualSubtitles}
            onChange={(checked) => updateSetting("dualSubtitles", checked)}
          />

          <SettingSelect
            label="Velocidade Padrão do Vídeo"
            description="Velocidade de reprodução inicial dos vídeos"
            value={settings.videoSpeed}
            onChange={(value) => updateSetting("videoSpeed", parseFloat(value as string))}
            options={[
              { value: 0.5, label: "0.5x (Muito Lento)" },
              { value: 0.75, label: "0.75x (Lento)" },
              { value: 1.0, label: "1x (Normal)" },
              { value: 1.25, label: "1.25x (Rápido)" },
              { value: 1.5, label: "1.5x (Muito Rápido)" },
            ]}
          />

          <SettingToggle
            label="Autoplay"
            description="Reproduzir automaticamente o próximo vídeo"
            checked={settings.autoplay}
            onChange={(checked) => updateSetting("autoplay", checked)}
          />
        </SettingsSection>

        {/* Interface Settings */}
        <SettingsSection title="Interface" icon={Globe}>
          <SettingSelect
            label="Idioma da Interface"
            description="Idioma dos menus e navegação"
            value={settings.interfaceLanguage}
            onChange={(value) => updateSetting("interfaceLanguage", value as string)}
            options={[
              { value: "pt-BR", label: "Português (Brasil)" },
              { value: "en-US", label: "English (US)" },
              { value: "es-ES", label: "Español" },
            ]}
          />

          <SettingToggle
            label="Tema Escuro"
            description="Modo escuro permanente (recomendado)"
            checked={settings.darkMode}
            onChange={(checked) => updateSetting("darkMode", checked)}
            disabled
          />

          <SettingToggle
            label="Efeitos Sonoros"
            description="Sons de feedback e notificações"
            checked={settings.soundEffects}
            onChange={(checked) => updateSetting("soundEffects", checked)}
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notificações" icon={Bell}>
          <SettingToggle
            label="Notificações Push"
            description="Receber lembretes e atualizações"
            checked={settings.notifications}
            onChange={(checked) => updateSetting("notifications", checked)}
          />

          <div className="bg-gray-800 rounded-xl p-4 space-y-3">
            <h4 className="text-white font-medium text-sm">Tipos de Notificação</h4>
            <div className="space-y-2">
              <NotificationOption label="Lembrete diário de prática" />
              <NotificationOption label="Novas lições disponíveis" />
              <NotificationOption label="Conquistas desbloqueadas" />
              <NotificationOption label="Sequência em risco" />
            </div>
          </div>
        </SettingsSection>

        {/* Learning Settings */}
        <SettingsSection title="Aprendizado" icon={Zap}>
          <div className="bg-gray-900 rounded-xl p-4 space-y-3">
            <h4 className="text-white font-medium">Nível de Dificuldade</h4>
            <div className="grid grid-cols-3 gap-2">
              <DifficultyButton label="Iniciante" active />
              <DifficultyButton label="Intermediário" active={false} />
              <DifficultyButton label="Avançado" active={false} />
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 space-y-3">
            <h4 className="text-white font-medium">Meta Diária</h4>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                defaultValue="15"
                className="flex-1 accent-purple-600"
              />
              <span className="text-white font-bold w-16 text-right">15 min</span>
            </div>
            <p className="text-gray-400 text-sm">Tempo de estudo recomendado por dia</p>
          </div>
        </SettingsSection>

        {/* Account Actions */}
        <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-white">Conta</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors text-left">
              Gerenciar Assinatura
            </button>
            <button className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors text-left">
              Exportar Dados
            </button>
            <button className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors text-left">
              Política de Privacidade
            </button>
            <button className="w-full px-4 py-3 bg-red-900/30 text-red-400 rounded-xl hover:bg-red-900/50 transition-colors text-left border border-red-500/30">
              Excluir Conta
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center space-y-2 pt-8">
          <div className="flex items-center justify-center gap-2">
            <Moon className="w-5 h-5 text-purple-400" />
            <p className="text-gray-400 text-sm">Learn Flix v1.0.0</p>
          </div>
          <p className="text-gray-500 text-xs">
            Aprenda inglês com séries, filmes e IA
          </p>
        </div>
      </div>
    </div>
  );
}

interface SettingsSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

function SettingsSection({ title, icon: Icon, children }: SettingsSectionProps) {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <Icon className="w-6 h-6 text-purple-400" />
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

interface SettingToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function SettingToggle({ label, description, checked, onChange, disabled }: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <h4 className="text-white font-medium">{label}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
          checked ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gray-700"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
            checked ? "translate-x-7" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
}

interface SettingSelectProps {
  label: string;
  description: string;
  value: number | string;
  onChange: (value: number | string) => void;
  options: SelectOption[];
}

function SettingSelect({ label, description, value, onChange, options }: SettingSelectProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-white font-medium">{label}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-purple-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface NotificationOptionProps {
  label: string;
}

function NotificationOption({ label }: NotificationOptionProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        defaultChecked
        className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-800"
      />
      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}

interface DifficultyButtonProps {
  label: string;
  active: boolean;
}

function DifficultyButton({ label, active }: DifficultyButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
      }`}
    >
      {label}
    </button>
  );
}
