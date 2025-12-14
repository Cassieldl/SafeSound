import { useState, useEffect } from "react";
import { BellDot, BellPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReminderTable } from "@/components/reminders/ReminderTable";
import { ReminderFormModal, ReminderFormData } from "@/components/reminders/ReminderForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";

export type Reminder = ReminderFormData & {
  id: number;
  createdAt: string;
  nome_pessoa?: string; // só para exibição
};

export default function ReminderPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  async function loadReminders() {
    try {
      const response = await axios.post(
        "http://localhost/safesound/backend/reminders/reminders.php?op=list"
      );
      const mapped: Reminder[] = response.data.data.map((item: any) => ({
        id: Number(item.id_lembrete),
        titulo_lembrete: item.titulo_lembrete || "",
        descricao_lembrete: item.descricao_lembrete || "",
        horario_lembrete: item.horario_lembrete || "",
        repeticao_lembrete: item.repeticao_lembrete || "daily",
        prioridade_lembrete: item.prioridade_lembrete || "medium",
        status_lembrete: item.status_lembrete || "pendent",
        id_pessoa: Number(item.id_pessoa),
        nome_pessoa: item.nome_pessoa || "",
        createdAt: item.data_criacao_lembrete || "",
      }));
      setReminders(mapped);
    } catch {
      alert("Erro ao carregar lembretes");
    }
  }

  useEffect(() => {
    loadReminders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-4">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-xl bg-white border border-purple-200 shadow-lg">
                <BellDot className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lembretes
              </h1>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-purple-300/50 mb-4"></div>
            <p className="text-gray-600 text-base font-medium">
              Gerenciamento de lembretes e notificações dos pacientes
            </p>
          </div>

          <Button
            onClick={() => {
              setEditingReminder(null);
              setIsFormOpen(true);
            }}
            className="gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-300/50 rounded-xl border border-emerald-500/30 px-6 py-6"
          >
            <BellPlus className="w-5 h-5"/>
            Novo Lembrete
          </Button>
        </div>

        {/* Tabela de Lembretes */}
        <div className="rounded-3xl bg-white border border-gray-200 p-6 lg:p-8 shadow-lg">
          <ReminderTable
            reminders={reminders}
            onEdit={(reminder: Reminder) => {
              setEditingReminder(reminder);
              setIsFormOpen(true);
            }}
            onDelete={async (id) => {
              try {
                await axios.delete(
                  `http://localhost/safesound/backend/reminders/reminders.php?id=${id}`
                );
                loadReminders();
              } catch {
                alert("Erro ao excluir lembrete");
              }
            }}
          />
        </div>

        {/* Modal de Formulário */}
        <Dialog open={isFormOpen} onOpenChange={(open) => !open && setIsFormOpen(false)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-gray-200 text-gray-900">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {editingReminder ? "Editar Lembrete" : "Novo Lembrete"}
              </DialogTitle>
            </DialogHeader>
            <ReminderFormModal
              reminderId={editingReminder?.id ?? null}
              isOpen={isFormOpen}
              onClose={() => {
                setEditingReminder(null);
                setIsFormOpen(false);
              }}
              onSuccess={() => {
                setEditingReminder(null);
                setIsFormOpen(false);
                loadReminders();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}