import { Search, UserRoundPlus, UserRoundSearch } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPatients } from "@/patients/patients";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PatientFormModal } from "@/patients/patientFormModal";

export default function Patients() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: patients, isLoading, refetch } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  const filtered = (patients ?? []).filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 lg:p-8 space-y-8 animate-fade-in">

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-4">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-xl bg-white border border-purple-200 shadow-lg">
                <UserRoundSearch className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pacientes
              </h1>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-purple-300/50 mb-4"></div>
            <p className="text-gray-600 text-base font-medium">
              Lista de pacientes cadastrados no sistema
            </p>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-300/50 rounded-xl border border-emerald-500/30 px-6 py-6"
          >
            <UserRoundPlus className="w-5 h-5" />
            Novo Paciente
          </Button>

          <PatientFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => refetch()}
          />
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Buscar pacientes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl focus:border-purple-400 focus:ring-purple-200 transition-all shadow-sm"
          />
        </div>

        {/* Contador */}
        <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl w-fit shadow-sm">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-bold text-purple-600">{filtered.length}</span> paciente(s)
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
              <div className="w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 font-medium">Carregando pacientes...</p>
            </div>
          </div>
        )}

        {/* Lista */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((patient) => (
            <Link key={patient.id} to={`/idosos/${patient.id}`}>
              <Card className="group transition-all duration-300 hover:-translate-y-2 cursor-pointer border-gray-200 rounded-2xl overflow-hidden hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-200/50 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">

                    {/* Avatar */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <Avatar className="relative w-16 h-16 border-2 border-purple-200 group-hover:scale-110 group-hover:border-purple-300 transition-all duration-300 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-lg font-bold">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg truncate text-gray-900 group-hover:text-purple-700 transition-colors">
                        {patient.name}
                      </h3>

                      <p className="text-sm text-gray-600 font-medium mt-1">{patient.age} anos</p>

                      <div className="mt-4 space-y-2">
                        <Badge className="bg-purple-100 border-purple-200 text-purple-700 hover:bg-purple-200 transition-colors">
                          {patient.emotionalState}
                        </Badge>

                        <p className="text-xs text-gray-500 font-medium">
                          Última atividade: <span className="text-gray-700">{patient.lastActivity}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex flex-col items-center gap-4 p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
              <div className="p-4 rounded-full bg-gray-50 border border-gray-200">
                <UserRoundSearch className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum paciente encontrado</h3>
                <p className="text-sm text-gray-600">
                  {search ? "Tente ajustar sua busca" : "Comece adicionando um novo paciente"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}