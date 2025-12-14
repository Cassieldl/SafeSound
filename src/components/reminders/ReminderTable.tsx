import { 
  Pencil, Trash2, Search, User, BellRing, FileText, Clock, 
  Repeat, Flag, CheckCircle2, XCircle, ClockAlert 
} from "lucide-react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { ReminderFormData } from "@/components/reminders/ReminderForm";

interface ReminderTableProps {
  reminders: ReminderFormData[];
  onEdit: (reminder: ReminderFormData) => void;
  onDelete: (id: number) => void;
}

export const ReminderTable = ({ reminders, onEdit, onDelete }: ReminderTableProps) => {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = reminders.filter((r) => {
    const searchLower = search.toLowerCase();
    return (
      r.titulo_lembrete?.toLowerCase().includes(searchLower) ||
      r.nome_pessoa?.toLowerCase().includes(searchLower)
    );
  });

  const StatusIcon = (status: string) => {
    switch (status) {
      case "Concluido":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "Pendente":
        return <ClockAlert className="w-4 h-4 text-amber-600" />;
      case "Ignorado":
        return <XCircle className="w-4 h-4 text-rose-600" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com busca */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Buscar por paciente ou título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl focus:border-purple-400 focus:ring-purple-200 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-3 px-4 py-2 bg-purple-50 border border-purple-200 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          <p className="text-sm text-gray-700">
            <span className="font-bold text-purple-600">{filtered.length}</span> lembrete(s)
          </p>
        </div>
      </div>

      {/* Tabela estilizada */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200 hover:from-purple-50 hover:to-blue-50">
              <TableHead className="text-gray-700 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-purple-200">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  Paciente
                </div>
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-blue-200">
                    <BellRing className="w-4 h-4 text-blue-600" />
                  </div>
                  Título
                </div>
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-gray-200">
                    <FileText className="w-4 h-4 text-gray-600" />
                  </div>
                  Descrição
                </div>
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-amber-200">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  Horário
                </div>
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-indigo-200">
                    <Repeat className="w-4 h-4 text-indigo-600" />
                  </div>
                  Repetição
                </div>
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-rose-200">
                    <Flag className="w-4 h-4 text-rose-600" />
                  </div>
                  Prioridade
                </div>
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  Status
                </div>
              </TableHead>
              <TableHead className="text-right text-gray-700 font-semibold">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 rounded-full bg-gray-50 border border-gray-200">
                      <BellRing className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">Nenhum lembrete encontrado</p>
                      <p className="text-sm text-gray-500">
                        {search ? "Tente ajustar sua busca" : "Comece criando um novo lembrete"}
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((reminder, idx) => (
                <TableRow 
                  key={idx} 
                  className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-all duration-200 border-b border-gray-100 last:border-0"
                  data-id={idx}
                >
                  <TableCell className="font-semibold text-gray-900">{reminder.nome_pessoa}</TableCell>
                  <TableCell className="font-semibold text-gray-900">{reminder.titulo_lembrete}</TableCell>
                  <TableCell className="text-gray-600 max-w-xs truncate">{reminder.descricao_lembrete}</TableCell>
                  <TableCell className="text-gray-700 font-medium">{reminder.horario_lembrete}</TableCell>

                  <TableCell>
                    <Badge variant="outline" className="border-indigo-200 bg-indigo-50 text-indigo-700 font-medium">
                      {({
                        daily: "Diário",
                        weekly: "Semanal",
                        monthly: "Mensal",
                      } as any)[reminder.repeticao_lembrete] || "Único"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge className={
                      reminder.prioridade_lembrete === "Alta" ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white border-0 shadow-sm" :
                      reminder.prioridade_lembrete === "Média" ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 shadow-sm" :
                      reminder.prioridade_lembrete === "Baixa" ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-sm" :
                      "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-sm"
                    }>
                      {reminder.prioridade_lembrete}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      {StatusIcon(reminder.status_lembrete)}
                      <span>
                        {({
                          Concluido: "Concluído",
                          Pendente: "Pendente",
                          Ignorado: "Ignorado",
                        } as any)[reminder.status_lembrete] || "Desconhecido"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        className="hover:bg-blue-50 hover:text-blue-700 hover:scale-110 transition-all duration-200 rounded-lg"
                        size="icon"
                        variant="ghost"
                        onClick={() => onEdit(reminder)}
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>

                      <Button
                        className="hover:bg-rose-50 hover:text-rose-700 hover:scale-110 transition-all duration-200 rounded-lg"
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteId(idx)}
                      >
                        <Trash2 className="w-4 h-4 text-rose-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog de exclusão */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-white border-gray-200 rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <AlertDialogTitle className="text-xl text-gray-900">Confirmar exclusão</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-600 text-base">
              Tem certeza que deseja excluir este lembrete? Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl px-6">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-to-r from-rose-600 to-rose-700 text-white hover:from-rose-500 hover:to-rose-600 rounded-xl px-6 shadow-lg"
              onClick={() => {
                if (deleteId !== null) onDelete(deleteId);
                setDeleteId(null);
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};