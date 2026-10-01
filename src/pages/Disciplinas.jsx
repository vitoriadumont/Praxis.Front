import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { listarDisciplinas, excluirDisciplina } from "../services/disciplinaService";
import "./Alunos.css";

export default function Disciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  async function carregar() {
    setCarregando(true);
    try {
      const dados = await listarDisciplinas();
      setDisciplinas(dados);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleExcluir(id) {
    if (!confirm("Tem certeza que deseja excluir esta disciplina?")) return;
    await excluirDisciplina(id);
    carregar();
  }

  const filtradas = disciplinas.filter((d) =>
    d.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Layout titulo="Disciplinas" subtitulo="2026 — Semestre 2">
      <div className="alunos-topo">
        <input
          className="alunos-busca"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button className="alunos-novo" onClick={() => navigate("/disciplinas/novo")}>
          + Nova Disciplina
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
                <th>Código</th>
                <th>Professor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((d) => (
                <tr key={d.id}>
                  <td>{d.nome}</td>
                  <td>{d.codigo}</td>
                  <td>{d.nomeProfessor}</td>
                  <td className="alunos-acoes">
                    <button onClick={() => navigate(`/disciplinas/${d.id}/editar`)}>
                      Editar
                    </button>
                    <button className="excluir" onClick={() => handleExcluir(d.id)}>
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