import { useAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header({ titulo, subtitulo }) {
  const { usuario, logout } = useAuth();

  return (
    <header className="header">
      <div>
        <h2 className="header-titulo">{titulo}</h2>
        {subtitulo && <p className="header-subtitulo">{subtitulo}</p>}
      </div>

      <div className="header-usuario">
        <span>{usuario?.nome}</span>
        <button onClick={logout}>Sair</button>
      </div>
    </header>
  );
}