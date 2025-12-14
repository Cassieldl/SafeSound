import { useState, useEffect } from "react";
import { PenLine, Calendar, UserRound, ListTodo, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";

export interface RoutineFormData {
  nome_rotina: string;
  descricao_rotina?: string;
  horario_rotina?: string;
  frequencia_rotina?: string;
  ativa_rotina: boolean;
  id_pessoa: number;
  nome_pessoa?: string;
}

interface Pessoa {
  id_pessoa: number;
  nome_pessoa: string;
}

interface RoutineFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  routineId?: number;
  onSuccess?: (data: RoutineFormData) => void;
}

export function RoutineFormModal({ isOpen, onClose, routineId, onSuccess }: RoutineFormModalProps) {
  const [formData, setFormData] = useState<RoutineFormData>({
    nome_rotina: "",
    descricao_rotina: "",
    horario_rotina: "",
    frequencia_rotina: "daily",
    ativa_rotina: true,
    id_pessoa: 0,
    nome_pessoa: "",
  });

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost/safesound/backend/patients/patients.php?op=list")
      .then(res => setPessoas(res.data.data))
      .catch(() => alert("Erro ao carregar pessoas"));
  }, []);

  useEffect(() => {
    if (routineId && isOpen) {
      setIsLoading(true);
      axios.get(`http://localhost/safesound/backend/routines/routines.php?id=${routineId}`)
        .then(res => {
          const d = res.data;
          setFormData({
            nome_rotina: d.nome_rotina || "",
            descricao_rotina: d.descricao_rotina || "",
            horario_rotina: d.horario_rotina || "",
            frequencia_rotina: d.frequencia_rotina || "daily",
            ativa_rotina: d.ativa_rotina === 1,
            id_pessoa: d.id_pessoa || 0,
            nome_pessoa: d.nome_pessoa || "",
          });
        })
        .finally(() => setIsLoading(false));
    } else if (!routineId && isOpen) {
      setFormData({
        nome_rotina: "",
        descricao_rotina: "",
        horario_rotina: "",
        frequencia_rotina: "daily",
        ativa_rotina: true,
        id_pessoa: 0,
        nome_pessoa: "",
      });
    }
  }, [routineId, isOpen]);

  const handleSubmit = async () => {
    if (!formData.id_pessoa) return alert("Selecione a pessoa associada!");

    try {
      setIsLoading(true);
      const payload = { ...formData };
      if (routineId) {
        await axios.put(`http://localhost/safesound/backend/routines/routines.php?id=${routineId}`, payload);
        alert("Rotina atualizada!");
      } else {
        await axios.post(`http://localhost/safesound/backend/routines/routines.php`, payload);
        alert("Rotina criada!");
      }
      onSuccess?.(payload);
      onClose();
    } catch {
      alert("Erro ao salvar rotina");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg border border-border/40 backdrop-blur-xl bg-card/70 shadow-2xl rounded-2xl">

        {/* HEADER COM ÍCONE */}
        <DialogHeader>
          <div className="flex items-center gap-3">
            <PenLine className="w-8 h-8 text-primary drop-shadow" />
            <DialogTitle className="text-2xl font-bold">
              {routineId ? "Editar Rotina" : "Nova Rotina"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid gap-5 py-4">

          {/* NOME DA ROTINA */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
            <ListTodo className="w-5 h-5 text-primary" />
            <Input
              placeholder="Nome da rotina"
              value={formData.nome_rotina}
              onChange={(e) => setFormData({ ...formData, nome_rotina: e.target.value })}
              disabled={isLoading}
              className="border-none shadow-none bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          {/* DESCRIÇÃO */}
          <div className="rounded-xl border bg-muted/30 backdrop-blur p-3">
            <Textarea
              placeholder="Descrição da rotina"
              value={formData.descricao_rotina}
              onChange={(e) => setFormData({ ...formData, descricao_rotina: e.target.value })}
              disabled={isLoading}
              rows={3}
              className="bg-transparent border-none shadow-none focus-visible:ring-0"
            />
          </div>

          {/* HORÁRIO */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
            <Calendar className="w-5 h-5 text-primary" />
            <Input
              type="time"
              value={formData.horario_rotina}
              onChange={(e) => setFormData({ ...formData, horario_rotina: e.target.value })}
              disabled={isLoading}
              className="border-none shadow-none bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          {/* FREQUÊNCIA */}
          <div className="rounded-xl border bg-muted/30 backdrop-blur p-3">
            <select
              value={formData.frequencia_rotina}
              onChange={(e) => setFormData({ ...formData, frequencia_rotina: e.target.value })}
              disabled={isLoading}
              className="w-full bg-card/70 text-white p-2 rounded-lg outline-none"
            >
              <option className="bg-card/70 text-white">Diário</option>
              <option className="bg-card/70 text-white">Semanal</option>
              <option className="bg-card/70 text-white">Personalizado</option>
            </select>
          </div>

          {/* STATUS */}
          <div className="rounded-xl border bg-muted/30 backdrop-blur p-3">
            <select
              value={formData.ativa_rotina ? "active" : "inactive"}
              onChange={(e) => setFormData({ ...formData, ativa_rotina: e.target.value === "active" })}
              disabled={isLoading}
              className="w-full bg-card/70 text-white p-2 rounded-lg outline-none"
            >
              <option className="bg-card/70 text-white" value="active">Ativo</option>
              <option className="bg-card/70 text-white" value="inactive">Inativo</option>
            </select>
          </div>

          {/* PESSOA ASSOCIADA */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
            <UserRound className="w-5 h-5 text-primary" />
            <select
              value={formData.id_pessoa || ""}
              onChange={(e) => setFormData({ ...formData, id_pessoa: Number(e.target.value) })}
              disabled={isLoading}
              className="w-full bg-card/70 text-white p-2 rounded-lg outline-none"
            >
              <option value="">Selecione a pessoa</option>
              {pessoas.map(p => (
                <option key={p.id_pessoa} value={p.id_pessoa} className="bg-card/70 text-white">
                  {p.nome_pessoa}
                </option>
              ))}
            </select>
          </div>

        </div>

        <DialogFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading} className="bg-primary text-white">
            {routineId ? "Salvar Alterações" : "Criar Rotina"}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
