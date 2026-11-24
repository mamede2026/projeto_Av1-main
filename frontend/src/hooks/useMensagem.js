import { useState } from "react";

export function useMensagem() {
  const [texto, setTexto] = useState("");
  const [sucesso, setSucesso] = useState(false);

  function mostrarErro(novoTexto) {
    setTexto(novoTexto);
    setSucesso(false);
  }

  function mostrarSucesso(novoTexto) {
    setTexto(novoTexto);
    setSucesso(true);
  }

  function limparMensagem() {
    setTexto("");
  }

  return { texto, sucesso, mostrarErro, mostrarSucesso, limparMensagem };
}
