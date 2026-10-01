import api from "./api";

export async function listarDisciplinas() {
  const resposta = await api.get("/Disciplinas");
  return resposta.data;
}

export async function buscarDisciplina(id) {
  const resposta = await api.get(`/Disciplinas/${id}`);
  return resposta.data;
}

export async function criarDisciplina(dados) {
  const resposta = await api.post("/Disciplinas", dados);
  return resposta.data;
}

export async function atualizarDisciplina(id, dados) {
  await api.put(`/Disciplinas/${id}`, dados);
}

export async function excluirDisciplina(id) {
  await api.delete(`/Disciplinas/${id}`);
}