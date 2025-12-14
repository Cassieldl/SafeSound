import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User } from "lucide-react";
import axios from "axios";

interface PatientDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: number;
  patientName?: string;
  onSuccess?: () => void;
}

export function PatientDeleteModal({
  isOpen,
  onClose,
  patientId,
  patientName,
  onSuccess
}: PatientDeleteModalProps) {
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/safesound/backend/patients/patients.php?id=${patientId}`);

      toast({
        title: "Paciente removido",
        description: "Excluído com sucesso!",
        duration: 2000,
      });

      onClose();
      onSuccess?.();

      // Voltar para a lista de pacientes
      navigate("/idosos");
    } catch {
      toast({
        title: "Erro",
        description: "Erro ao excluir paciente",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Exclusão de cadastro</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Tem certeza que deseja excluir o paciente:
        </p>

        <div className="flex items-center gap-2 mt-1">
          <User className="w-6 h-6" />
          <p className="font-bold text-lg">{patientName}</p>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
