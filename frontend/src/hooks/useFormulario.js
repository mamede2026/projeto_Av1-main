import { useState } from "react";

export function useFormulario(valoresIniciais) {
  const [valores, setValores] = useState(valoresIniciais);
  const [versao, setVersao] = useState(0);

  function alterar(campo, valor) {
    setValores({ ...valores, [campo]: valor });
  }

  function limpar() {
    setValores(valoresIniciais);
    setVersao(versao + 1);
  }

  return { valores, alterar, limpar, versao };
}
