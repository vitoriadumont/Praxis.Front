import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { buscarProfessor, criarProfessor, atualizarProfessor } from "../services/professorService";
import "./AlunoForm.css";

export default function ProfessorForm() {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (editando) {
      buscarProfessor(id).then((p) => {
        setNome(p.nome);
        setEmail(p.email);
        setDepartamento(p.departamento);
      });
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSalvando(true);

    const dados = { nome, email, departamento };

    try {
      if (editando) {
        await atualizarProfessor(id, dados);
      } else {
        await criarProfessor(dados);
      }
      navigate("/professores");
    } catch (err) {
      setErro("Erro ao salvar professor. Confira os dados e tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Layout titulo={editando ? "Editar Professor" : "Novo Professor"} subtitulo="2026 — Semestre 2">
      <form className="aluno-form" onSubmit={handleSubmit}>
        <label>Nome</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>E-mail</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Departamento</label>
        <input value={departamento} onChange={(e) => setDepartamento(e.target.value)} required />

        {erro && <p className="aluno-form-erro">{erro}</p>}

        <div className="aluno-form-botoes">
          <button type="button" className="cancelar" onClick={() => navigate("/professores")}>
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