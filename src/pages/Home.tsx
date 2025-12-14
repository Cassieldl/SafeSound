import { Users, LayoutDashboard, Activity, UserRoundPlus, ThermometerSun, Bell, BellPlus, CalendarCheck, CalendarPlus } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { EmotionalState } from "@/components/dashboard/EmotionalState";
import { ActivityLog } from "@/components/dashboard/ActivityLog";
import { SleepPattern } from "@/components/dashboard/SleepPattern";
import { NoiseLevel } from "@/components/dashboard/NoiseLevel";

import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { useNavigate } from "react-router-dom";

  // Mock data - será substituído por dados reais da API
const mockActivities = [
  {
    id: "1",
    type: "reminder" as const,
    title: "Medicação da manhã tomada",
    time: "08:30",
    status: "completed" as const,
  },
  {
    id: "2",
    type: "routine" as const,
    title: "Café da manhã",
    time: "09:15",
    status: "completed" as const,
  },
  {
    id: "3",
    type: "reminder" as const,
    title: "Caminhada programada",
    time: "10:00",
    status: "pending" as const,
  },
  {
    id: "4",
    type: "interaction" as const,
    title: "Conversa com assistente",
    time: "11:30",
    status: "completed" as const,
  },
  {
    id: "5",
    type: "reminder" as const,
    title: "Medicação do almoço",
    time: "12:00",
    status: "missed" as const,
  },
];

  const Index = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="px-6 lg:px-8 py-4 flex items-center gap-2">
          <div className="flex flex-col items-start pb-3">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Visão Geral
            </h1>
          </div>

            <p className="text-sm text-gray-600 mt-1">
              Gerenciamento de lembretes e notificações dos pacientes
            </p>
        </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-6 lg:px-8 py-8 space-y-8 animate-fade-in">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total de Pacientes" value="3" icon={Users} variant="primary" />
          <StatCard title="Lembretes Ativos" value="12" icon={Bell} variant="warning" />
          <StatCard title="Rotinas Completadas" value="8" icon={CalendarCheck} variant="success" />
          <StatCard title="Atividades Hoje" value="34" icon={Activity} variant="accent" />
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna esquerda */}
          <div className="lg:col-span-2 space-y-6">
            <EmotionalState happy={65} neutral={25} sad={10} />

            <SleepPattern
              sleepTime="22:30"
              wakeTime="07:15"
              totalHours={8.75}
              quality="good"
              deepSleepHours={2.5}
              remSleepHours={1.5}
              naps={1}
            />

            <NoiseLevel
              silenceMinutes={180}
              activeMinutes={420}
              lightActivityMinutes={240}
              moderateActivityMinutes={120}
              intenseActivityMinutes={20}
            />
          </div>

          {/* Coluna direita */}
          <div className="lg:col-span-1 gap-14 flex flex-col">
            <WeatherCard />
            <ActivityLog activities={mockActivities} />
          </div>
        </div>

        {/* Ações Rápidas */}
          <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/lembretes")}
              className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 transition-all duration-300 flex flex-col items-start gap-4 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-200/50 hover:border-purple-300 cursor-pointer text-left"
            >
              <div className="p-3 rounded-xl bg-white border border-purple-200 flex items-center justify-center group-hover:bg-purple-50 transition-all duration-300 shadow-md">
                <BellPlus className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors mb-2">
                  Criar Lembrete
                </h4>
                <p className="text-sm text-gray-600">
                  Configure notificações para medicamentos e compromissos
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate("/rotinas")}
              className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 transition-all duration-300 flex flex-col items-start gap-4 hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-200/50 hover:border-emerald-300 cursor-pointer text-left"
            >
              <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-50 transition-all duration-300 shadow-md">
                <CalendarPlus className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors mb-2">
                  Nova Rotina
                </h4>
                <p className="text-sm text-gray-600">
                  Estabeleça atividades diárias para bem-estar
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate("/idosos")}
              className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 transition-all duration-300 flex flex-col items-start gap-4 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-300 cursor-pointer text-left"
            >
              <div className="p-3 rounded-xl bg-white border border-blue-200 flex items-center justify-center group-hover:bg-blue-50 transition-all duration-300 shadow-md">
                <UserRoundPlus className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                  Novo Paciente
                </h4>
                <p className="text-sm text-gray-600">
                  Cadastre um novo paciente no sistema
                </p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;