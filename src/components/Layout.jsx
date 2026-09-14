import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.css";

export default function Layout({ titulo, subtitulo, children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-conteudo">
        <Header titulo={titulo} subtitulo={subtitulo} />
        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
}