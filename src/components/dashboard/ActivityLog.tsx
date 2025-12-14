import { Card } from "@/components/ui/card";
import { Clock, CheckCircle2, AlertCircle, Bell, Repeat, MessageCircle } from "lucide-react";

interface Activity {
  id: string;
  type: "reminder" | "routine" | "interaction";
  title: string;
  time: string;
  status: "completed" | "pending" | "missed";
}

interface ActivityLogProps {
  activities: Activity[];
}

const typeConfig = {
  reminder: { 
    icon: Bell, 
    color: "text-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
    borderColor: "border-purple-200",
    glowColor: "shadow-purple-200/50"
  },
  routine: { 
    icon: Repeat, 
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
    glowColor: "shadow-blue-200/50"
  },
  interaction: { 
    icon: MessageCircle, 
    color: "text-amber-600",
    bgGradient: "from-amber-50 to-amber-100",
    borderColor: "border-amber-200",
    glowColor: "shadow-amber-200/50"
  },
};

const statusConfig = {
  completed: { 
    icon: CheckCircle2, 
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    border: "border-emerald-200"
  },
  pending: { 
    icon: Clock, 
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    border: "border-amber-200"
  },
  missed: { 
    icon: AlertCircle, 
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    border: "border-rose-200"
  },
};

export const ActivityLog = ({ activities }: ActivityLogProps) => {
  return (
    <Card className="p-8 bg-white border-gray-200 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] hover:border-purple-300 shadow-lg">
      <div className="mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Registro de Atividades
        </h3>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-purple-300/50"></div>
      </div>
      
      <div className="flex flex-col gap-3">
        {activities.map((activity) => {
          const TypeIcon = typeConfig[activity.type].icon;
          const typeColor = typeConfig[activity.type].color;
          const typeGradient = typeConfig[activity.type].bgGradient;
          const borderColor = typeConfig[activity.type].borderColor;
          const glowColor = typeConfig[activity.type].glowColor;
          const StatusIcon = statusConfig[activity.status].icon;
          const statusColor = statusConfig[activity.status].color;
          const statusBg = statusConfig[activity.status].bgColor;
          const statusBorder = statusConfig[activity.status].border;
          
          return (
            <div
              key={activity.id}
              className={`group relative flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r ${typeGradient} border ${borderColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${glowColor} cursor-pointer overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:translate-x-full transform -translate-x-full"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className={`p-3 rounded-xl bg-white border ${borderColor} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md`}>
                  <TypeIcon className={`w-6 h-6 ${typeColor}`} />
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-gray-900 font-semibold text-base group-hover:text-gray-950 transition-colors">
                    {activity.title}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {activity.time}
                  </span>
                </div>
              </div>
              
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${statusBg} border ${statusBorder} relative z-10 group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                <span className={`text-xs font-semibold ${statusColor} capitalize hidden sm:inline`}>
                  {activity.status === "completed" ? "Concluído" : 
                   activity.status === "pending" ? "Pendente" : "Perdido"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">
            Total de atividades registradas
          </span>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {activities.length}
          </span>
        </div>
      </div>
    </Card>
  );
};

// Exemplo de uso com dados de demonstração
export default function App() {
  const sampleActivities: Activity[] = [
    {
      id: "1",
      type: "reminder",
      title: "Tomar medicação",
      time: "Há 2 horas",
      status: "completed"
    },
    {
      id: "2",
      type: "routine",
      title: "Exercícios matinais",
      time: "Há 4 horas",
      status: "completed"
    },
    {
      id: "3",
      type: "interaction",
      title: "Conversa com terapeuta",
      time: "Há 6 horas",
      status: "pending"
    },
    {
      id: "4",
      type: "reminder",
      title: "Beber água",
      time: "Há 8 horas",
      status: "missed"
    },
    {
      id: "5",
      type: "routine",
      title: "Meditação noturna",
      time: "Há 10 horas",
      status: "completed"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <ActivityLog activities={sampleActivities} />
      </div>
    </div>
  );
}