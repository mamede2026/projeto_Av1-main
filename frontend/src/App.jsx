import { Navigate, Route, Routes } from "react-router-dom";
import RotaProtegida from "./componentes/RotaProtegida.jsx";
import PaginaInicial from "./paginas/PaginaInicial.jsx";
import Login from "./paginas/Login.jsx";
import TrocaSenha from "./paginas/TrocaSenha.jsx";
import CadastroCliente from "./paginas/CadastroCliente.jsx";
import Carrinho from "./paginas/Carrinho.jsx";
import CadastroServico from "./paginas/CadastroServico.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/login" element={<Login />} />
      <Route path="/troca-senha" element={<TrocaSenha />} />
      <Route path="/cadastro" element={<CadastroCliente />} />
      <Route path="/carrinho" element={<RotaProtegida><Carrinho /></RotaProtegida>} />
      <Route path="/servicos/novo" element={<RotaProtegida><CadastroServico /></RotaProtegida>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
