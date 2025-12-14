import { Card } from "@/components/ui/card";
import { AudioLines, MicOff, Zap, Activity } from "lucide-react";

interface NoiseLevelProps {
  silenceMinutes: number;
  activeMinutes: number;
  lightActivityMinutes: number;
  moderateActivityMinutes: number;
  intenseActivityMinutes: number;
}

export const NoiseLevel = ({
  silenceMinutes,
  activeMinutes,
  lightActivityMinutes,
  moderateActivityMinutes,
  intenseActivityMinutes,
}: NoiseLevelProps) => {
  const total = silenceMinutes + activeMinutes;
  const silencePercent = (silenceMinutes / total) * 100;
  const activePercent = (activeMinutes / total) * 100;

  const silenceHours = Math.floor(silenceMinutes / 60);
  const silenceMins = silenceMinutes % 60;
  const activeHours = Math.floor(activeMinutes / 60);
  const activeMins = activeMinutes % 60;

  const lightPercent = (lightActivityMinutes / activeMinutes) * 100;
  const moderatePercent = (moderateActivityMinutes / activeMinutes) * 100;
  const intensePercent = (intenseActivityMinutes / activeMinutes) * 100;

  return (
    <Card className="p-8 bg-white border-gray-200 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] hover:border-purple-300 shadow-lg">
      <div className="mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Nível de Atividade
        </h3>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-purple-300/50"></div>
      </div>

      <div className="space-y-5">
        {/* Silêncio */}
        <div className="group space-y-3 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-gray-200/50 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <MicOff className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">Tempo em silêncio</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
              {silenceHours}h {silenceMins}m
            </span>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
            <div 
              className="absolute h-full bg-gradient-to-r from-gray-500 to-gray-400 rounded-full transition-all duration-700 shadow-md shadow-gray-300/50"
              style={{ width: `${silencePercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Tempo ativo */}
        <div className="group space-y-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-200/50 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <AudioLines className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">Tempo ativo</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              {activeHours}h {activeMins}m
            </span>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
            <div 
              className="absolute h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700 shadow-md shadow-emerald-300/50"
              style={{ width: `${activePercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Subdivisão de atividade */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-blue-200/50 cursor-pointer">
            <div className="p-2.5 rounded-xl bg-white border border-blue-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-gray-600 font-medium">Leve</span>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              {lightActivityMinutes}m
            </span>
          </div>

          <div className="group p-4 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-amber-200/50 cursor-pointer">
            <div className="p-2.5 rounded-xl bg-white border border-amber-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
              <Activity className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs text-gray-600 font-medium">Moderada</span>
            <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              {moderateActivityMinutes}m
            </span>
          </div>

          <div className="group p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-emerald-200/50 cursor-pointer">
            <div className="p-2.5 rounded-xl bg-white border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
              <Zap className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs text-gray-600 font-medium">Intensa</span>
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              {intenseActivityMinutes}m
            </span>
          </div>
        </div>

        {/* Indicador de saúde */}
        <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${activePercent > 60 ? 'bg-emerald-100 border border-emerald-200' : 'bg-amber-100 border border-amber-200'}`}>
              <span className="text-lg">
                {activePercent > 60 ? '💚' : '⚠️'}
              </span>
            </div>
            <span className={`text-sm font-medium ${activePercent > 60 ? 'text-emerald-700' : 'text-amber-700'}`}>
              {activePercent > 60 
                ? "Nível de atividade saudável" 
                : "Considere verificar o paciente"}
            </span>
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
        <NoiseLevel 
          silenceMinutes={180}
          activeMinutes={420}
          lightActivityMinutes={120}
          moderateActivityMinutes={180}
          intenseActivityMinutes={120}
        />
      </div>
    </div>
  );
}