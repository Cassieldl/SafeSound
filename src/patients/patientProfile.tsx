import axios from "axios";

function calculateAge(dateStr: string | null) {
  if (!dateStr) return null;

  const birthDate = new Date(dateStr);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const birthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  return birthdayPassed ? age : age - 1;
}

// LISTAGEM
export async function fetchPatients() {
  const url = "http://localhost/safesound/backend/patients/patients.php?op=list";
  const response = await axios.get(url);

  return response.data.data.map((item: any) => ({
    id: Number(item.id_pessoa),
    name: `${item.nome_pessoa} ${item.sobrenome_pessoa}`.trim(),

    birthday: item.data_nascimento_pessoa
      ? new Date(item.data_nascimento_pessoa).toLocaleDateString("pt-BR")
      : null,

    age: calculateAge(item.data_nascimento_pessoa), // 🔥 agora separado

    emotionalState: "neutral",
    lastActivity: "Indefinido",
  }));
}


// BUSCA POR ID
export async function fetchPatientById(id: number | string) {
  const url = `http://localhost/safesound/backend/patients/patients.php?op=list&id=${id}`;
  const response = await axios.get(url);

  if (!response.data.data || response.data.data.length === 0) {
    throw new Error("Paciente não encontrado");
  }

  const item = response.data.data[0];

  return {
    id: Number(item.id_pessoa),
    name: `${item.nome_pessoa} ${item.sobrenome_pessoa}`.trim(),

    birthday: item.data_nascimento_pessoa
      ? new Date(item.data_nascimento_pessoa).toLocaleDateString("pt-BR")
      : null,

    age: calculateAge(item.data_nascimento_pessoa),

    phone: item.telefone_pessoa,
    address: item.endereco_pessoa,
    emotionalState: "neutral",
    lastActivity: "Indefinido",
  };
}
