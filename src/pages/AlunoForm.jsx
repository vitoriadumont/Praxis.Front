import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { buscarAluno, criarAluno, atualizarAluno } from "../services/alunoService";
import "./AlunoForm.css";

export default function AlunoForm() {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (editando) {
      buscarAluno(id).then((aluno) => {
        setNome(aluno.nome);
        setMatricula(aluno.matricula);
        setCurso(aluno.curso);
      });
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSalvando(true);

    const dados = { nome, matricula, curso };

    try {
      if (editando) {
        await atualizarAluno(id, dados);
      } else {
        await criarAluno(dados);
      }
      navigate("/alunos");
    } catch (err) {
      setErro("Erro ao salvar aluno. Confira os dados e tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Layout
      titulo={editando ? "Editar Aluno" : "Novo Aluno"}
      subtitulo="2024 — Semestre 1"
    >
      <form className="aluno-form" onSubmit={handleSubmit}>
        <label>Nome</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>Matrícula</label>
        <input value={matricula} onChange={(e) => setMatricula(e.target.value)} required />

        <label>Curso</label>
        <input value={curso} onChange={(e) => setCurso(e.target.value)} required />

        {erro && <p className="aluno-form-erro">{erro}</p>}

        <div className="aluno-form-botoes">
          <button type="button" className="cancelar" onClick={() => navigate("/alunos")}>
            Cancelar
          </button>
          <button type="submit" disabled={salvando}>
            {salvando ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </Layout>
  );
}