import { Card } from "@/components/ui/card";
import { Moon, Sun, CloudMoon, AlarmClock, Zap, Coffee } from "lucide-react";

interface SleepPatternProps {
  sleepTime: string;
  wakeTime: string;
  totalHours: number;
  quality: "good" | "average" | "poor";
  deepSleepHours: number;
  remSleepHours: number;
  naps: number;
}

const qualityConfig = {
  good: {
    color: "text-emerald-700",
    bg: "bg-emerald-100",
    border: "border-emerald-200",
    label: "Boa qualidade",
    icon: "✓"
  },
  average: {
    color: "text-blue-700",
    bg: "bg-blue-100",
    border: "border-blue-200",
    label: "Qualidade média",
    icon: "~"
  },
  poor: {
    color: "text-amber-700",
    bg: "bg-amber-100",
    border: "border-amber-200",
    label: "Atenção necessária",
    icon: "⚠"
  },
};

export const SleepPattern = ({
  sleepTime,
  wakeTime,
  totalHours,
  quality,
  deepSleepHours,
  remSleepHours,
  naps,
}: SleepPatternProps) => {
  const config = qualityConfig[quality];

  return (
    <Card className="p-8 bg-white border-gray-200 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] hover:border-purple-300 shadow-lg">
      <div className="mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Padrão de Sono
        </h3>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-purple-300/50"></div>
      </div>

      <div className="space-y-6">
        {/* Horário de dormir e acordar */}
        <div className="grid grid-cols-2 gap-4">
          <div className="group p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-indigo-200/50 cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-white border border-indigo-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <Moon className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Dormiu às</span>
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
              {sleepTime}h
            </p>
          </div>

          <div className="group p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-amber-200/50 cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-white border border-amber-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <Sun className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Acordou às</span>
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              {wakeTime}h
            </p>
          </div>
        </div>

        {/* Total de sono e qualidade */}
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-md">
                <CloudMoon className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">Total de sono</span>
            </div>
            <div className="flex items-center gap-3">
              <AlarmClock className="w-5 h-5 text-gray-600" />
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {totalHours}h
              </span>
            </div>
          </div>

          <div className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl ${config.bg} border ${config.border} shadow-sm`}>
            <span className="text-lg">{config.icon}</span>
            <span className={`text-sm font-semibold ${config.color}`}>
              {config.label}
            </span>
          </div>

          {/* Novas métricas */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-blue-200/50 cursor-pointer">
              <div className="p-2.5 rounded-xl bg-white border border-blue-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium text-center">Sono Profundo</span>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                {deepSleepHours}h
              </span>
            </div>

            <div className="group p-4 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-amber-200/50 cursor-pointer">
              <div className="p-2.5 rounded-xl bg-white border border-amber-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <Coffee className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">REM</span>
              <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                {remSleepHours}h
              </span>
            </div>

            <div className="group p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-purple-200/50 cursor-pointer">
              <div className="p-2.5 rounded-xl bg-white border border-purple-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <AlarmClock className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Cochilos</span>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                {naps}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Exemplo de uso com dados de demonstração
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <SleepPattern 
          sleepTime="22:30"
          wakeTime="07:15"
          totalHours={8.75}
          quality="good"
          deepSleepHours={2.5}
          remSleepHours={2.0}
          naps={1}
        />
      </div>
    </div>
  );
}