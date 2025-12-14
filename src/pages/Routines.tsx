import { useState, useEffect } from "react";
import { Plus, CalendarSync, CalendarPlus } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { RoutineTable } from "@/components/routines/RoutineTable";
import { RoutineFormModal } from "@/components/routines/RoutineForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type Routine = {
  idPessoa: number;
  patientName: string;
  id: number;
  name: string;
  description: string;
  scheduler: string;
  frequency: string;
  active: boolean;
  createdAt: string;
};

export default function Routines() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);

  async function loadRoutines() {
    const response = await axios.post(
      "http://localhost/safesound/backend/routines/routines.php?op=list"
    );
    const mapped = response.data.data.map((item: any) => ({
      idPessoa: Number(item.id_pessoa),
      patientName: item.nome_pessoa,
      id: Number(item.id_rotina),
      name: item.nome_rotina,
      description: item.descricao_rotina,
      scheduler: item.horario_rotina,
      frequency: item.frequencia_rotina,
      active: item.ativa_rotina,
      createdAt: item.data_criacao_rotina,
    }));
    setRoutines(mapped);
  }

  useEffect(() => {
    loadRoutines();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-4">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-xl bg-white border border-blue-200 shadow-lg">
                <CalendarSync className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rotinas
              </h1>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-purple-300/50 mb-4"></div>
            <p className="text-gray-600 text-base font-medium">
              Gerencie rotinas e atividades recorrentes
            </p>
          </div>

          <Button
            onClick={() => setIsFormOpen(true)}
            className="gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-300/50 rounded-xl border border-emerald-500/30 px-6 py-6"
          >
            <CalendarPlus className="w-5 h-5" />
            Nova Rotina
          </Button>
        </div>

        {/* Tabela de Rotinas */}
        <div className="rounded-3xl bg-white border border-gray-200 p-6 lg:p-8 shadow-lg">
          <RoutineTable
            routines={routines}
            onEdit={(routine) => {
              setEditingRoutine(routine);
              setIsFormOpen(true);
            }}
            onDelete={async (id) => {
              await axios.delete(`http://localhost/safesound/backend/routines/routines.php?id=${id}`);
              loadRoutines();
            }}
          />
        </div>

        {/* Modal de Formulário */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-gray-200 text-gray-900">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {editingRoutine ? "Editar Rotina" : "Nova Rotina"}
              </DialogTitle>
            </DialogHeader>
            <RoutineFormModal
              routineId={editingRoutine?.id ?? null}
              isOpen={isFormOpen}
              onClose={() => {
                setEditingRoutine(null);
                setIsFormOpen(false);
              }}
              onSuccess={() => {
                setEditingRoutine(null);
                setIsFormOpen(false);
                loadRoutines();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}