import axios from "axios";

export async function fetchPatients() {
  const url = "http://localhost/safesound/backend/patients/patients.php?op=list";

  const response = await axios.get(url);

  function calculateAge(dateStr: string) {
  if (!dateStr) return null;

  // Suporta tanto DD/MM/YYYY quanto YYYY-MM-DD
  let formatted = dateStr.includes("/")
    ? dateStr.split("/").reverse().join("-")
    : dateStr;

  const birth = new Date(formatted);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

  return hasBirthdayPassed ? age : age - 1;
  }

  
  return response.data.data.map((item: any) => ({
    id: Number(item.id_pessoa),
    name: `${item.nome_pessoa} ${item.sobrenome_pessoa}`.trim(),
    age: calculateAge(item.data_nascimento_pessoa),
    emotionalState: "neutral",
    lastActivity: "Indefinido",
  }));
  }