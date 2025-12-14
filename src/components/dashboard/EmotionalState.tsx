import { Card } from "@/components/ui/card";
import { Smile, Frown, Meh } from "lucide-react";

interface EmotionalStateProps {
  happy: number;
  neutral: number;
  sad: number;
}

export const EmotionalState = ({ happy, neutral, sad }: EmotionalStateProps) => {
  const total = happy + neutral + sad;
  const happyPercent = (happy / total) * 100;
  const neutralPercent = (neutral / total) * 100;
  const sadPercent = (sad / total) * 100;

  return (
    <Card className="p-8 bg-white border-gray-200 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] hover:border-purple-300 shadow-lg">
      <div className="mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Estado Emocional
        </h3>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-purple-300/50"></div>
      </div>
      
      <div className="space-y-5">
        {/* Feliz */}
        <div className="group space-y-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-200/50 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <span className="text-2xl">😊</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">Feliz</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              {happyPercent.toFixed(0)}%
            </span>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
            <div 
              className="absolute h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700 shadow-md shadow-emerald-300/50"
              style={{ width: `${happyPercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Neutro */}
        <div className="group space-y-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-200/50 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-blue-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <span className="text-2xl">😐</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">Neutro</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              {neutralPercent.toFixed(0)}%
            </span>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
            <div 
              className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700 shadow-md shadow-blue-300/50"
              style={{ width: `${neutralPercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Triste */}
        <div className="group space-y-3 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-200/50 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-amber-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                <span className="text-2xl">😢</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">Triste</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              {sadPercent.toFixed(0)}%
            </span>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
            <div 
              className="absolute h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-700 shadow-md shadow-amber-300/50"
              style={{ width: `${sadPercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">
            Análise baseada em interações do dia
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {total}
          </span>
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
        <EmotionalState 
          happy={45}
          neutral={30}
          sad={25}
        />
      </div>
    </div>
  );
}