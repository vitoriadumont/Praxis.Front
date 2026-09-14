import api from "./api";

export async function listarAlunos() {
  const resposta = await api.get("/Alunos");
  return resposta.data;
}

export async function buscarAluno(id) {
  const resposta = await api.get(`/Alunos/${id}`);
  return resposta.data;
}

export async function criarAluno(dados) {
  const resposta = await api.post("/Alunos", dados);
  return resposta.data;
}

export async function atualizarAluno(id, dados) {
  await api.put(`/Alunos/${id}`, dados);
}

export async function excluirAluno(id) {
  await api.delete(`/Alunos/${id}`);
}