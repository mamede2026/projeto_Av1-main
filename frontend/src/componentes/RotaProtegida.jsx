import { Navigate } from "react-router-dom";
import { useSessao } from "../contexto/SessaoContext.jsx";

export default function RotaProtegida({ children }) {
  const { login } = useSessao();

  if (!login) {
    return <Navigate to="/login" />;
  }
  return children;
}
