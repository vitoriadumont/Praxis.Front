import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { listarDisciplinas } from "../services/disciplinaService";
import "./Alunos.css";

export default function Disciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    listarDisciplinas()
      .then(setDisciplinas)
      .finally(() => setCarregando(false));
  }, []);

  const filtradas = disciplinas.filter((d) =>
    d.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Layout titulo="Disciplinas" subtitulo="2026 — Semestre 2">
      <div className="alunos-topo">
        <input
          className="alunos-busca"
          placeholder="Buscar por nome ou código..."
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
                <th>Código</th>
                <th>Professor</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((d) => (
                <tr key={d.id}>
                  <td>{d.nome}</td>
                  <td>{d.codigo}</td>
                  <td>{d.nomeProfessor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}