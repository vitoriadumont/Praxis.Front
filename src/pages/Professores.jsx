import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { listarProfessores } from "../services/professorService";
import "./Alunos.css";

export default function Professores() {
  const [professores, setProfessores] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    listarProfessores()
      .then(setProfessores)
      .finally(() => setCarregando(false));
  }, []);

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
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.email}</td>
                  <td>{p.departamento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}