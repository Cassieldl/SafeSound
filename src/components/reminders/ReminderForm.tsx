import { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  Clock,
  AlertTriangle,
  UserRound,
  BellPlus,
  ListTodo,
  CalendarClock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";

export interface ReminderFormData {
  titulo_lembrete: string;
  descricao_lembrete: string;
  horario_lembrete: string;
  repeticao_lembrete: string;
  prioridade_lembrete: string;
  status_lembrete: string;
  id_pessoa: number;
  nome_pessoa?: string;
}

interface Pessoa {
  id_pessoa: number;
  nome_pessoa: string;
}

interface ReminderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminderId?: number;
  onSuccess?: (data: ReminderFormData) => void;
}

export function ReminderFormModal({
  isOpen,
  onClose,
  reminderId,
  onSuccess,
}: ReminderFormModalProps) {
  const [formData, setFormData] = useState<ReminderFormData>({
    titulo_lembrete: "",
    descricao_lembrete: "",
    horario_lembrete: "",
    repeticao_lembrete: "Diário",
    prioridade_lembrete: "Média",
    status_lembrete: "Pendente",
    id_pessoa: 0,
    nome_pessoa: "",
  });

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Carregar as pessoas associadas
    axios
      .get("http://localhost/safesound/backend/patients/patients.php?op=list")
      .then((res) => setPessoas(res.data.data)) // Se o retorno for um array, estamos prontos
      .catch(() => alert("Erro ao carregar pessoas"));
  }, []);

  useEffect(() => {
    if (reminderId && isOpen) {
      setIsLoading(true);
      axios
        .get(
          `http://localhost/safesound/backend/reminders/reminders.php?id=${reminderId}`
        )
        .then((res) => {
          // Garantindo que estamos pegando o objeto correto
          const d = Array.isArray(res.data) ? res.data[0] : res.data;

          setFormData({
            titulo_lembrete: d.titulo_lembrete || "",
            descricao_lembrete: d.descricao_lembrete || "",
            horario_lembrete: d.horario_lembrete
              ? d.horario_lembrete.replace(" ", "T").slice(0, 16)
              : "",
            repeticao_lembrete: d.repeticao_lembrete || "Diário",
            prioridade_lembrete: d.prioridade_lembrete || "Média",
            status_lembrete: d.status_lembrete || "Pendente",
            id_pessoa: d.id_pessoa || 0,
            nome_pessoa: d.nome_pessoa || "",
          });
        })
        .finally(() => setIsLoading(false));
    } else if (!reminderId && isOpen) {
      setFormData({
        titulo_lembrete: "",
        descricao_lembrete: "",
        horario_lembrete: "",
        repeticao_lembrete: "Diário",
        prioridade_lembrete: "Média",
        status_lembrete: "Pendente",
        id_pessoa: 0,
        nome_pessoa: "",
      });
    }
  }, [reminderId, isOpen]);

  const handleSubmit = async () => {
    if (!formData.id_pessoa)
      return alert("Selecione a pessoa associada!");

    try {
      setIsLoading(true);
      const payload = { ...formData };

      if (reminderId) {
        await axios.put(
          `http://localhost/safesound/backend/reminders/reminders.php?id=${reminderId}`,
          payload
        );
        alert("Lembrete atualizado!");
      } else {
        await axios.post(
          `http://localhost/safesound/backend/reminders/reminders.php`,
          payload
        );
        alert("Lembrete criado!");
      }

      onSuccess?.(payload);
      onClose();
    } catch {
      alert("Erro ao salvar lembrete");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg border border-border/40 backdrop-blur-xl bg-card/70 shadow-2xl rounded-2xl">

        {/* HEADER */}
        <DialogHeader>
          <div className="flex items-center gap-3">
            <BellPlus className="w-8 h-8 text-primary drop-shadow" />
            <DialogTitle className="text-2xl font-bold">
              {reminderId ? "Editar Lembrete" : "Novo Lembrete"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid gap-4 py-4">

          {/* TÍTULO */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
            <ListTodo className="w-5 h-5 text-primary" />
            <Input
              placeholder="Título do lembrete"
              value={formData.titulo_lembrete}
              onChange={(e) =>
                setFormData({ ...formData, titulo_lembrete: e.target.value })
              }
              disabled={isLoading}
              className="border-none shadow-none bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          {/* DESCRIÇÃO */}
          <div className="rounded-xl border bg-muted/30 backdrop-blur p-3">
            <Textarea
              placeholder="Descrição"
              value={formData.descricao_lembrete}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  descricao_lembrete: e.target.value,
                })
              }
              rows={3}
              disabled={isLoading}
              className="border-none shadow-none bg-transparent focus-visible:ring-0"
            />
          </div>

          {/* HORÁRIO */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
            <CalendarClock className="w-5 h-5 text-primary" />
            <Input
              type="datetime-local"
              value={formData.horario_lembrete}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  horario_lembrete: e.target.value,
                })
              }
              disabled={isLoading}
              className="border-none shadow-none bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          {/* REPETIÇÃO */}
          <div className="rounded-xl border bg-muted/30 backdrop-blur p-3">
            <select
              value={formData.repeticao_lembrete}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  repeticao_lembrete: e.target.value,
                })
              }
              disabled={isLoading}
              className="w-full bg-card/70 text-white p-2 rounded-lg outline-none"
            >
              <option>Único</option>
              <option>Diário</option>
              <option>Semanal</option>
              <option>Mensal</option>
            </select>
          </div>

          {/* PRIORIDADE */}
          <div className="rounded-xl border bg-muted/30 backdrop-blur p-3">
            <select
              value={formData.prioridade_lembrete}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  prioridade_lembrete: e.target.value,
                })
              }
              disabled={isLoading}
              className="w-full bg-card/70 text-white p-2 rounded-lg outline-none"
            >
              <option>Baixa</option>
              <option>Média</option>
              <option>Alta</option>
            </select>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <select
              value={formData.status_lembrete}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status_lembrete: e.target.value,
                })
              }
              disabled={isLoading}
              className="w-full bg-transparent text-white outline-none"
            >
              <option>Pendente</option>
              <option>Completado</option>
              <option>Ignorado</option>
            </select>
          </div>

          {/* PESSOA */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
            <UserRound className="w-5 h-5 text-primary" />
            <select
              value={formData.id_pessoa || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  id_pessoa: Number(e.target.value),
                })
              }
              disabled={isLoading}
              className="w-full bg-transparent text-white outline-none"
            >
              <option value="">Selecione a pessoa</option>
              {pessoas.map((p) => (
                <option key={p.id_pessoa} value={p.id_pessoa}>
                  {p.nome_pessoa}
                </option>
              ))}
            </select>
          </div>

        </div>

        <DialogFooter className="flex justify-end gap-3">
          <Button variant="destructive" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading} className="bg-primary text-white">
            {reminderId ? "Salvar Alterações" : "Criar Lembrete"}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
