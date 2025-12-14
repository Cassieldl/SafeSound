import { useState, useEffect } from "react";
import { Pen, CreditCard, Calendar, Phone, MapPin, UserRound } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export interface PatientFormData {
  nome_pessoa: string;
  sobrenome_pessoa: string;
  telefone_pessoa: string;
  endereco_pessoa: string;
  id_cidade?: number;
  cpf_pessoa?: string; 
  data_nascimento_pessoa?: string; 
}

interface Cidade {
  id_cidade: number;
  nome_cidade: string;
}

interface PatientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: number; 
  onSuccess?: () => void;
}

export function PatientFormModal({ isOpen, onClose, patientId, onSuccess }: PatientFormModalProps) {
  const [formData, setFormData] = useState<PatientFormData>({
    nome_pessoa: "",
    sobrenome_pessoa: "",
    telefone_pessoa: "",
    endereco_pessoa: "",
    id_cidade: undefined,
    cpf_pessoa: "",
    data_nascimento_pessoa: "",
  });
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost/safesound/backend/cities/cities.php?op=list")
      .then(res => setCidades(res.data))
      .catch(() => alert("Erro ao carregar cidades"));
  }, []);

  useEffect(() => {
    if (patientId && isOpen) {
      setIsLoading(true);
      axios.get(`http://localhost/safesound/backend/patients/patients.php?id=${patientId}`)
        .then(res => {
          const d = res.data;
          setFormData({
            nome_pessoa: d.nome_pessoa || "",
            sobrenome_pessoa: d.sobrenome_pessoa || "",
            telefone_pessoa: d.telefone_pessoa || "",
            endereco_pessoa: d.endereco_pessoa || "",
            id_cidade: d.id_cidade ? Number(d.id_cidade) : undefined,
            cpf_pessoa: d.cpf_pessoa || "",
            data_nascimento_pessoa: d.data_nascimento_pessoa || "",
          });
        })
        .finally(() => setIsLoading(false));
    } else if (!patientId && isOpen) {
      setFormData({
        nome_pessoa: "",
        sobrenome_pessoa: "",
        telefone_pessoa: "",
        endereco_pessoa: "",
        id_cidade: undefined,
        cpf_pessoa: "",
        data_nascimento_pessoa: "",
      });
    }
  }, [patientId, isOpen]);

  const handleSubmit = async () => {
    if (!formData.id_cidade) return alert("Selecione uma cidade!");
    if (!patientId && !formData.cpf_pessoa) return alert("Preencha o CPF!");


    try {
      setIsLoading(true);
      if (patientId) {
        await axios.put(`http://localhost/safesound/backend/patients/patients.php?id=${patientId}`, formData);
        alert("Paciente atualizado!");
      } else {
        await axios.post(`http://localhost/safesound/backend/patients/patients.php`, formData);
        alert("Paciente criado!");
      }
      onClose();
      onSuccess?.();
    } catch {
      alert("Erro ao salvar paciente");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg border border-border/40 backdrop-blur-xl bg-card/70 shadow-2xl rounded-2xl">

        <DialogHeader>
          <div className="flex items-center gap-3">
            <UserRound className="w-8 h-8 text-primary drop-shadow" />
            <DialogTitle className="text-2xl font-bold">
              {patientId ? "Editar Paciente" : "Novo Paciente"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid gap-4 py-4">

          {/* Nome */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
            <Pen className="w-5 h-5 text-primary" />
            <Input
              placeholder="Nome"
              value={formData.nome_pessoa}
              onChange={(e) => setFormData({ ...formData, nome_pessoa: e.target.value })}
              disabled={isLoading}
              className="border-none shadow-none bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          {/* Sobrenome */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
            <Input
              placeholder="Sobrenome"
              value={formData.sobrenome_pessoa}
              onChange={(e) => setFormData({ ...formData, sobrenome_pessoa: e.target.value })}
              disabled={isLoading}
              className="border-none shadow-none bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          {/* CPF e Data Nascimento */}
          {!patientId && (
            <>
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
                <CreditCard className="w-5 h-5 text-primary" />
                <Input
                  placeholder="CPF"
                  value={formData.cpf_pessoa}
                  onChange={(e) => setFormData({ ...formData, cpf_pessoa: e.target.value })}
                  disabled={isLoading}
                  className="border-none shadow-none bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
                <Calendar className="w-5 h-5 text-primary" />
                <Input
                  type="date"
                  value={formData.data_nascimento_pessoa}
                  onChange={(e) => setFormData({ ...formData, data_nascimento_pessoa: e.target.value })}
                  disabled={isLoading}
                  className="border-none shadow-none bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
            </>
          )}

          {/* Telefone */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
            <Phone className="w-5 h-5 text-primary" />
            <Input
              placeholder="Telefone"
              value={formData.telefone_pessoa}
              onChange={(e) => setFormData({ ...formData, telefone_pessoa: e.target.value })}
              disabled={isLoading}
              className="border-none shadow-none bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          {/* Endereço */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl border bg-muted/30 backdrop-blur">
            <MapPin className="w-5 h-5 text-primary" />
            <Input
              placeholder="Endereço"
              value={formData.endereco_pessoa}
              onChange={(e) => setFormData({ ...formData, endereco_pessoa: e.target.value })}
              disabled={isLoading}
              className="border-none shadow-none bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          {/* Cidade */}
          <div className="rounded-xl border bg-muted/30 backdrop-blur p-3">
            <select
              value={formData.id_cidade ?? ""}
              onChange={(e) => setFormData({ ...formData, id_cidade: Number(e.target.value) })}
              disabled={isLoading}
              className="w-full bg-card/70 text-white p-2 rounded-lg outline-none"
            >
              <option value="">Selecione uma cidade</option>
              {cidades.map((c) => (
                <option key={c.id_cidade} value={c.id_cidade} className="bg-card/70 text-white">
                  {c.nome_cidade}
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
            {patientId ? "Salvar Alterações" : "Criar Paciente"}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
