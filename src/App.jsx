import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RotaProtegida from "./routes/RotaProtegida";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Alunos from "./pages/Alunos";
import AlunoForm from "./pages/AlunoForm";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <RotaProtegida>
                <Dashboard />
              </RotaProtegida>
            }
          />
          <Route
            path="/alunos"
            element={
              <RotaProtegida>
                <Alunos />
              </RotaProtegida>
            }
          />
          <Route
            path="/alunos/novo"
            element={
              <RotaProtegida>
                <AlunoForm />
              </RotaProtegida>
            }
          />
          <Route
            path="/alunos/:id/editar"
            element={
              <RotaProtegida>
                <AlunoForm />
              </RotaProtegida>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;