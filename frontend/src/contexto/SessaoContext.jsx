import { createContext, useContext, useState } from "react";

const SessaoContext = createContext();

export function SessaoProvider({ children }) {
  const [login, setLogin] = useState(sessionStorage.getItem("login"));

  function entrar(novoLogin) {
    sessionStorage.setItem("login", novoLogin);
    setLogin(novoLogin);
  }

  function sair() {
    sessionStorage.removeItem("login");
    setLogin(null);
  }

  return (
    <SessaoContext.Provider value={{ login, entrar, sair }}>
      {children}
    </SessaoContext.Provider>
  );
}

export function useSessao() {
  return useContext(SessaoContext);
}
