import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { buscarDisciplina, criarDisciplina, atualizarDisciplina } from "../services/disciplinaService";
import { listarProfessores } from "../services/professorService";
import "./AlunoForm.css";

export default function DisciplinaForm() {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [professores, setProfessores] = useState([]);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    listarProfessores().then(setProfessores);

    if (editando) {
      buscarDisciplina(id).then((d) => {
        setNome(d.nome);
        setCodigo(d.codigo);
        setProfessorId(d.professorId);
      });
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSalvando(true);

    const dados = { nome, codigo, professorId: Number(professorId) };

    try {
      if (editando) {
        await atualizarDisciplina(id, dados);
      } else {
        await criarDisciplina(dados);
      }
      navigate("/disciplinas");
    } catch (err) {
      setErro("Erro ao salvar disciplina. Confira os dados e tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Layout titulo={editando ? "Editar Disciplina" : "Nova Disciplina"} subtitulo="2026 — Semestre 2">
      <form className="aluno-form" onSubmit={handleSubmit}>
        <label>Nome</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>Código</label>
        <input value={codigo} onChange={(e) => setCodigo(e.target.value)} required />

        <label>Professor</label>
        <select
          value={professorId}
          onChange={(e) => setProfessorId(e.target.value)}
          required
          style={{ width: "100%", padding: "10px 12px", marginBottom: "18px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px" }}
        >
          <option value="">Selecione um professor</option>
          {professores.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        {erro && <p className="aluno-form-erro">{erro}</p>}

        <div className="aluno-form-botoes">
          <button type="button" className="cancelar" onClick={() => navigate("/disciplinas")}>
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