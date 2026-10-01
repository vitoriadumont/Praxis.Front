import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RotaProtegida from "./routes/RotaProtegida";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Alunos from "./pages/Alunos";
import AlunoForm from "./pages/AlunoForm";
import Professores from "./pages/Professores";
import Disciplinas from "./pages/Disciplinas";
import ProfessorForm from "./pages/ProfessorForm";
import DisciplinaForm from "./pages/DisciplinaForm";


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
          <Route path="/professores" element={<RotaProtegida><Professores /></RotaProtegida>} />
          <Route path="/disciplinas" element={<RotaProtegida><Disciplinas /></RotaProtegida>} />
          <Route path="/professores/novo" element={<RotaProtegida><ProfessorForm /></RotaProtegida>} />
          <Route path="/professores/:id/editar" element={<RotaProtegida><ProfessorForm /></RotaProtegida>} />
          <Route path="/disciplinas/novo" element={<RotaProtegida><DisciplinaForm /></RotaProtegida>} />
          <Route path="/disciplinas/:id/editar" element={<RotaProtegida><DisciplinaForm /></RotaProtegida>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;