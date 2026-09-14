import api from "./api";

export async function listarDisciplinas() {
  const resposta = await api.get("/Disciplinas");
  return resposta.data;
}