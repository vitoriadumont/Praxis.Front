import api from "./api";

export async function listarProfessores() {
  const resposta = await api.get("/Professores");
  return resposta.data;
}

export async function buscarProfessor(id) {
  const resposta = await api.get(`/Professores/${id}`);
  return resposta.data;
}

export async function criarProfessor(dados) {
  const resposta = await api.post("/Professores", dados);
  return resposta.data;
}

export async function atualizarProfessor(id, dados) {
  await api.put(`/Professores/${id}`, dados);
}

export async function excluirProfessor(id) {
  await api.delete(`/Professores/${id}`);
}