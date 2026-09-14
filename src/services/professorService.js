import api from "./api";

export async function listarProfessores() {
  const resposta = await api.get("/Professores");
  return resposta.data;
}