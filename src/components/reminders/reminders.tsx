import axios from "axios";

export async function fetchReminders() {
  const url = "http://localhost/safesound/backend/reminders/reminders.php?op=list";

  const response = await axios.get(url);

  return response.data.data.map((item: any) => ({
    id: Number(item.id_lembrete),
    title: item.titulo_rotina,             
    description: item.descricao_lembrete,  
    datetime: item.horario_lembrete,       
    repeat: item.repeticao_lembrete,      
    priority: item.prioridade_lembrete,   
    status: item.status_lembrete,          
    patientName: item.nome_pessoa,
    idPacient: Number(item.id_pessoa),
    createdAt: item.data_criacao_lembrete,
  }));
}
