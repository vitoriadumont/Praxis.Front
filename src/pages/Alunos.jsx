import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { listarAlunos, excluirAluno } from "../services/alunoService";
import "./Alunos.css";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  async function carregar() {
    setCarregando(true);
    try {
      const dados = await listarAlunos();
      setAlunos(dados);
    } catch (err) {
      console.error("Erro ao carregar alunos", err);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleExcluir(id) {
    if (!confirm("Tem certeza que deseja excluir este aluno?")) return;

    try {
      await excluirAluno(id);
      carregar();
    } catch (err) {
      alert("Erro ao excluir aluno.");
    }
  }

  const alunosFiltrados = alunos.filter((a) =>
    a.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Layout titulo="Alunos" subtitulo="2024 — Semestre 1">
      <div className="alunos-topo">
        <input
          className="alunos-busca"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button
          className="alunos-novo"
          onClick={() => navigate("/alunos/novo")}
        >
          + Novo Aluno
        </button>
      </div>

      <div className="alunos-tabela-container">
        {carregando ? (
          <p>Carregando...</p>
        ) : (
          <table className="alunos-tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Curso</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunosFiltrados.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.nome}</td>
                  <td>{aluno.matricula}</td>
                  <td>{aluno.curso}</td>
                  <td className="alunos-acoes">
                    <button onClick={() => navigate(`/alunos/${aluno.id}/editar`)}>
                      Editar
                    </button>
                    <button className="excluir" onClick={() => handleExcluir(aluno.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}