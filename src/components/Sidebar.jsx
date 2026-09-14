import { NavLink } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <GraduationCap size={22} />
        <span className="sidebar-logo-texto">PRÁXIS</span>
      </div>

      <nav className="sidebar-menu">
        <p className="sidebar-menu-titulo">Menu Principal</p>
        <NavLink to="/dashboard" className="sidebar-link">Dashboard</NavLink>
        <NavLink to="/alunos" className="sidebar-link">Alunos</NavLink>
        <NavLink to="/professores" className="sidebar-link">Professores</NavLink>
        <NavLink to="/disciplinas" className="sidebar-link">Disciplinas</NavLink>
      </nav>
    </aside>
  );
}