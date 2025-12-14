import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Cake, Phone, MapPin, Edit, Heart, Activity, Bell, Calendar, Smile, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { EmotionalState } from "@/components/dashboard/EmotionalState";
import { SleepPattern } from "@/components/dashboard/SleepPattern";
import { NoiseLevel } from "@/components/dashboard/NoiseLevel";
import { ActivityLog } from "@/components/dashboard/ActivityLog";

import { fetchPatientById } from "@/patients/patientProfile";
import { useState } from "react";
import { PatientFormModal } from "@/patients/patientFormModal";
import { PatientDeleteModal } from "@/patients/patientDeleteModal";

export default function patientProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<{ id: number, name: string } | null>(null);

  const { data: patient, isLoading, isError, refetch } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => fetchPatientById(Number(id)),
  });

  if (isLoading) return <p className="p-6 text-gray-600">Carregando paciente...</p>;
  if (isError || !patient) return <p className="p-6 text-gray-600">Paciente não encontrado</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/idosos">
            <Button variant="ghost" size="icon" className="rounded-xl bg-white border border-gray-200 hover:bg-gray-50 hover:scale-110 transition-all duration-300 shadow-sm">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Perfil</h1>
            <p className="text-gray-600 mt-2 font-medium">Visualização completa dos dados</p>
          </div>
        </div>

        {/* Patient Info Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl hover:border-purple-300 hover:shadow-2xl transition-all duration-500">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <Avatar className="relative w-32 h-32 border-4 border-purple-200 cursor-pointer group-hover:scale-105 transition-transform duration-300 shadow-xl">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-3xl font-bold">
                  {patient.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-3xl font-bold text-gray-900">{patient.name}</h2>
                  <Badge className="bg-purple-100 border-purple-200 text-purple-700 text-sm px-3 py-1">
                    {patient.age} anos
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-300/50 rounded-xl border border-blue-500/30" 
                    onClick={() => setIsModalOpen(true)}>
                    <Edit className="w-4 h-4" />
                    Editar Dados
                  </Button>
                  <Button 
                    className="gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rose-300/50 rounded-xl" 
                    variant="destructive"
                    onClick={() => {
                      setSelectedPatient({ id: patient.id, name: patient.name });
                      setIsDeleteModalOpen(true);
                    }}>
                    <Trash2 className="w-4 h-4"/>
                    Excluir
                  </Button>
                  <PatientFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    patientId={patient.id}
                    onSuccess={() => refetch()}
                  />
                  <PatientDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    patientId={selectedPatient?.id}
                    patientName={selectedPatient?.name}
                    onSuccess={() => refetch()}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                  <div className="p-2.5 rounded-lg bg-white border border-gray-200 shadow-sm">
                    <Cake className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Data de Nascimento</p>
                    <p className="text-sm text-gray-900 font-semibold">{patient.birthday}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                  <div className="p-2.5 rounded-lg bg-white border border-gray-200 shadow-sm">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Telefone</p>
                    <p className="text-sm text-gray-900 font-semibold">{patient.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all duration-300 md:col-span-2">
                  <div className="p-2.5 rounded-lg bg-white border border-gray-200 shadow-sm">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Endereço</p>
                    <p className="text-sm text-gray-900 font-semibold">{patient.address}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-emerald-100 border-emerald-200 text-emerald-700 px-4 py-2 text-sm hover:bg-emerald-200 transition-colors cursor-default">
                  Estado: {patient.emotionalState}
                </Badge>
                <Badge className="bg-gray-100 border-gray-200 text-gray-700 px-4 py-2 text-sm hover:bg-gray-200 transition-colors cursor-default">
                  Última atividade: {patient.lastActivity}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Estado Emocional"
            value="Positivo"
            icon={Smile}
            variant="success"
            trend={{ value: 15, label: "vs. semana passada" }}
          />
          <StatCard
            title="Atividades Hoje"
            value="12"
            icon={Activity}
            variant="primary"
            trend={{ value: 8, label: "vs. ontem" }}
          />
          <StatCard
            title="Lembretes Concluídos"
            value="5/6"
            icon={Bell}
            variant="accent"
          />
          <StatCard
            title="Rotinas Ativas"
            value="3"
            icon={Calendar}
            variant="secondary"
          />
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmotionalState happy={65} neutral={25} sad={10} />
          <SleepPattern sleepTime="22:30" wakeTime="06:45" totalHours={8.25} quality="good" deepSleepHours={2.5} remSleepHours={1.75} naps={0} />
          <NoiseLevel silenceMinutes={420} activeMinutes={180} lightActivityMinutes={60} moderateActivityMinutes={80} intenseActivityMinutes={40} />
          <ActivityLog
            activities={[
              { id: "1", type: "routine", title: "Café da manhã", time: "08:00", status: "completed" },
              { id: "2", type: "reminder", title: "Tomar remédio", time: "10:30", status: "completed" },
              { id: "3", type: "routine", title: "Caminhada", time: "14:00", status: "pending" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}