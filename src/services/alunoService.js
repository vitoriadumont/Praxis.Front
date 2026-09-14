import api from "./api";

export async function listarAlunos() {
  const resposta = await api.get("/Alunos");
  return resposta.data;
}