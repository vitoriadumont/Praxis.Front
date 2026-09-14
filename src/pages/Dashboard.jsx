import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { listarAlunos } from "../services/alunoService";
import { listarProfessores } from "../services/professorService";
import { listarDisciplinas } from "../services/disciplinaService";
import "./Dashboard.css";

export default function Dashboard() {
  const [totais, setTotais] = useState({ alunos: 0, professores: 0, disciplinas: 0 });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [alunos, professores, disciplinas] = await Promise.all([
          listarAlunos(),
          listarProfessores(),
          listarDisciplinas(),
        ]);

        setTotais({
          alunos: alunos.length,
          professores: professores.length,
          disciplinas: disciplinas.length,
        });
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard", err);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  return (
    <Layout titulo="Dashboard" subtitulo="2024 — Semestre 1">
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <span className="dashboard-card-numero">{totais.alunos}</span>
            <span className="dashboard-card-label">Total de Alunos</span>
          </div>
          <div className="dashboard-card">
            <span className="dashboard-card-numero">{totais.professores}</span>
            <span className="dashboard-card-label">Professores Ativos</span>
          </div>
          <div className="dashboard-card">
            <span className="dashboard-card-numero">{totais.disciplinas}</span>
            <span className="dashboard-card-label">Disciplinas Ativas</span>
          </div>
        </div>
      )}
    </Layout>
  );
}