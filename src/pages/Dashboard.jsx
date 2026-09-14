import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { usuario, logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo(a), {usuario?.nome}!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}