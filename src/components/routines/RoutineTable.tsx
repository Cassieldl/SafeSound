import { 
  Pencil, 
  Trash2, 
  Search, 
  User, 
  Clock, 
  CalendarDays, 
  ListChecks, 
  Activity 
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Routine } from "@/pages/Routines";

interface RoutineTableProps {
  routines: Routine[];
  onEdit: (routine: Routine) => void;
  onDelete: (id: number) => void;
}

export const RoutineTable = ({ routines, onEdit, onDelete }: RoutineTableProps) => {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = routines.filter((r) => {
    const searchLower = search.toLowerCase();
    return (
      (r.name || "").toLowerCase().includes(searchLower) ||
      (r.patientName || "").toLowerCase().includes(searchLower)
    );
  });

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "daily": return "Diário";
      case "weekly": return "Semanal";
      default: return "Personalizado";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com busca */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Buscar por paciente ou rotina..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl focus:border-blue-400 focus:ring-blue-200 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <p className="text-sm text-gray-700">
            <span className="font-bold text-blue-600">{filtered.length}</span> rotina(s)
          </p>
        </div>
      </div>

      {/* Tabela estilizada */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 hover:from-blue-50 hover:to-indigo-50">
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
                    <ListChecks className="w-4 h-4 text-blue-600" />
                  </div>
                  Nome
                </div>
              </TableHead>

              <TableHead className="text-gray-700 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-gray-200">
                    <Activity className="w-4 h-4 text-gray-600" />
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
                    <CalendarDays className="w-4 h-4 text-indigo-600" />
                  </div>
                  Frequência
                </div>
              </TableHead>

              <TableHead className="text-gray-700 font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-emerald-200">
                    <Activity className="w-4 h-4 text-emerald-600" />
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
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 rounded-full bg-gray-50 border border-gray-200">
                      <ListChecks className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">Nenhuma rotina encontrada</p>
                      <p className="text-sm text-gray-500">
                        {search ? "Tente ajustar sua busca" : "Comece criando uma nova rotina"}
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((routine) => (
                <TableRow 
                  key={routine.id}
                  className="hover:bg-pink-100 transition-all duration-200 border-b border-gray-100 last:border-0 cursor-pointer"
                >
                  <TableCell className="font-semibold text-gray-900">{routine.patientName}</TableCell>

                  <TableCell className="font-semibold text-gray-900">{routine.name}</TableCell>

                  <TableCell className="text-gray-600 max-w-xs truncate">{routine.description}</TableCell>

                  <TableCell className="text-gray-700 font-medium">{routine.scheduler}</TableCell>

                  <TableCell>
                    <Badge variant="outline" className="border-indigo-200 bg-indigo-50 text-indigo-700 font-medium">
                      {getFrequencyLabel(routine.frequency)}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge 
                      className={
                        routine.active 
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-sm flex items-center gap-1 w-fit"
                          : "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-sm flex items-center gap-1 w-fit"
                      }
                    >
                      <Activity className="w-3 h-3" />
                      {routine.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost"
                        className="hover:bg-blue-50 hover:text-blue-700 hover:scale-110 transition-all duration-200 rounded-lg"
                        onClick={() => onEdit(routine)}
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </Button>

                      <Button
                        size="icon" 
                        variant="ghost"
                        className="hover:bg-rose-50 hover:text-rose-700 hover:scale-110 transition-all duration-200 rounded-lg"
                        onClick={() => setDeleteId(routine.id)}
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
              Tem certeza que deseja excluir esta rotina? Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl px-6">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-to-r from-rose-600 to-rose-700 text-white hover:from-rose-500 hover:to-rose-600 rounded-xl px-6 shadow-lg"
              onClick={() => {
                if (deleteId) onDelete(deleteId);
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