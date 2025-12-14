import axios from "axios";

export async function fetchRoutines() {
  const url = "http://localhost/safesound/backend/routines/routines.php?op=list";

  const response = await axios.post(url, {
    start: 0,
    length: 9999,
    search: { value: "" },
    order: [{ column: 1, dir: "asc" }]
  });

  return response.data.data.map((item: any) => ({
    id: Number(item.id_rotina),
    name: item.nome_rotina,
    description: item.descricao_rotina,
    scheduler: item.horario_rotina,
    frequency: item.frequencia_rotina,
    status: item.ativa_rotina == 1 ? "active" : "inactive",
    patientName: item.nome_pessoa,
    date: item.data_cadastro_rotina,
  }));
}
