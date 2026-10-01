import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { listarProfessores, excluirProfessor } from "../services/professorService";
import "./Alunos.css";

export default function Professores() {
  const [professores, setProfessores] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  async function carregar() {
    setCarregando(true);
    try {
      const dados = await listarProfessores();
      setProfessores(dados);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleExcluir(id) {
    if (!confirm("Tem certeza que deseja excluir este professor?")) return;
    await excluirProfessor(id);
    carregar();
  }

  const filtrados = professores.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Layout titulo="Professores" subtitulo="2026 — Semestre 2">
      <div className="alunos-topo">
        <input
          className="alunos-busca"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button className="alunos-novo" onClick={() => navigate("/professores/novo")}>
          + Novo Professor
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
                <th>E-mail</th>
                <th>Departamento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.email}</td>
                  <td>{p.departamento}</td>
                  <td className="alunos-acoes">
                    <button onClick={() => navigate(`/professores/${p.id}/editar`)}>
                      Editar
                    </button>
                    <button className="excluir" onClick={() => handleExcluir(p.id)}>
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