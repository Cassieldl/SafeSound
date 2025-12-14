import { TrendingUp, TrendingDown, Users, Activity, Heart, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "primary" | "secondary" | "accent" | "success" | "warning";
  className?: string;
}

const variantStyles = {
  default: {
    bg: "from-gray-50 to-gray-100",
    border: "border-gray-200",
    iconBg: "from-gray-100 to-gray-50",
    iconBorder: "border-gray-200",
    iconColor: "text-gray-600",
    glow: "hover:shadow-gray-200/50"
  },
  primary: {
    bg: "from-purple-50 to-purple-100",
    border: "border-purple-200",
    iconBg: "from-purple-100 to-purple-50",
    iconBorder: "border-purple-200",
    iconColor: "text-purple-600",
    glow: "hover:shadow-purple-200/50"
  },
  secondary: {
    bg: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    iconBg: "from-blue-100 to-blue-50",
    iconBorder: "border-blue-200",
    iconColor: "text-blue-600",
    glow: "hover:shadow-blue-200/50"
  },
  accent: {
    bg: "from-indigo-50 to-indigo-100",
    border: "border-indigo-200",
    iconBg: "from-indigo-100 to-indigo-50",
    iconBorder: "border-indigo-200",
    iconColor: "text-indigo-600",
    glow: "hover:shadow-indigo-200/50"
  },
  success: {
    bg: "from-emerald-50 to-emerald-100",
    border: "border-emerald-200",
    iconBg: "from-emerald-100 to-emerald-50",
    iconBorder: "border-emerald-200",
    iconColor: "text-emerald-600",
    glow: "hover:shadow-emerald-200/50"
  },
  warning: {
    bg: "from-amber-50 to-amber-100",
    border: "border-amber-200",
    iconBg: "from-amber-100 to-amber-50",
    iconBorder: "border-amber-200",
    iconColor: "text-amber-600",
    glow: "hover:shadow-amber-200/50"
  },
};

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatCardProps) => {
  const styles = variantStyles[variant];

  return (
    <Card
      className={cn(
        "group p-6 bg-gradient-to-br border rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer",
        styles.bg,
        styles.border,
        styles.glow,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-3">{title}</p>
          <p className="text-4xl font-bold text-gray-900 tracking-tight group-hover:text-gray-950 transition-colors">
            {value}
          </p>
          {trend && (
            <div className="mt-3 flex items-center gap-2">
              <div className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-lg border shadow-sm",
                trend.value > 0 
                  ? "bg-emerald-100 border-emerald-200" 
                  : "bg-rose-100 border-rose-200"
              )}>
                {trend.value > 0 ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                )}
                <span
                  className={cn(
                    "text-xs font-semibold",
                    trend.value > 0 ? "text-emerald-700" : "text-rose-700"
                  )}
                >
                  {trend.value > 0 ? "+" : ""}
                  {trend.value}%
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium">{trend.label}</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "p-3.5 rounded-xl bg-gradient-to-br border shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
            styles.iconBg,
            styles.iconBorder
          )}
        >
          <Icon className={cn("w-6 h-6", styles.iconColor)} />
        </div>
      </div>
    </Card>
  );
};

// Exemplo de uso com múltiplos cards
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Dashboard de Estatísticas
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-purple-300/50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total de Usuários"
            value="2,547"
            icon={Users}
            variant="primary"
            trend={{ value: 12.5, label: "vs. mês anterior" }}
          />
          
          <StatCard
            title="Atividades Concluídas"
            value="1,284"
            icon={Activity}
            variant="success"
            trend={{ value: 8.2, label: "vs. semana anterior" }}
          />
          
          <StatCard
            title="Taxa de Bem-Estar"
            value="94%"
            icon={Heart}
            variant="warning"
            trend={{ value: -2.1, label: "vs. mês anterior" }}
          />

          <StatCard
            title="Tempo Médio de Sono"
            value="7.5h"
            icon={Clock}
            variant="secondary"
            trend={{ value: 5.3, label: "vs. semana anterior" }}
          />

          <StatCard
            title="Sessões Ativas"
            value="342"
            icon={Activity}
            variant="accent"
            trend={{ value: 15.7, label: "em tempo real" }}
          />

          <StatCard
            title="Engajamento"
            value="89%"
            icon={TrendingUp}
            variant="default"
          />
        </div>
      </div>
    </div>
  );
}