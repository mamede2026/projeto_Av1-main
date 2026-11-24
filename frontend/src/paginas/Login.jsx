import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PaginaFormulario from "../componentes/formulario/PaginaFormulario.jsx";
import CampoTexto from "../componentes/formulario/CampoTexto.jsx";
import Mensagem from "../componentes/Mensagem.jsx";
import Botao from "../componentes/Botao.jsx";
import { useFormulario } from "../hooks/useFormulario.js";
import { useMensagem } from "../hooks/useMensagem.js";
import { useSessao } from "../contexto/SessaoContext.jsx";
import { autenticar } from "../servicos/api.js";
import { validarLogin } from "../util/validacoes.js";

export default function Login() {
  const { valores, alterar, limpar, versao } = useFormulario({ login: "", senha: "" });
  const mensagem = useMensagem();
  const { entrar } = useSessao();
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);

  async function realizarLogin() {
    const login = valores.login.trim();

    const erroLogin = validarLogin(login);
    if (erroLogin) {
      mensagem.mostrarErro(erroLogin);
      return;
    }
    if (valores.senha === "") {
      mensagem.mostrarErro("A senha deve ser preenchida.");
      return;
    }

    mensagem.mostrarSucesso("Validação realizada com sucesso");
    setEnviando(true);
    const resposta = await autenticar(login, valores.senha);
    setEnviando(false);

    if (resposta.status === "erro") {
      mensagem.mostrarErro(resposta.mensagem);
      return;
    }
    if (!resposta.autenticado) {
      mensagem.mostrarErro("Login ou senha incorretos.");
      return;
    }

    mensagem.mostrarSucesso("Validação realizada com sucesso. Login efetuado!");
    entrar(login);
    setTimeout(() => navigate("/"), 1500);
  }

  function limparCampos() {
    limpar();
    mensagem.limparMensagem();
  }

  return (
    <PaginaFormulario titulo="Login de clientes">
      <table className="tabela-form">
        <tbody>
          <CampoTexto
            key={"login" + versao}
            focar
            id="login"
            rotulo="Login (e-mail)"
            valor={valores.login}
            onAlterar={(valor) => alterar("login", valor)}
            onEnter={realizarLogin}
          />
          <CampoTexto
            id="senha"
            tipo="password"
            rotulo="Senha"
            valor={valores.senha}
            onAlterar={(valor) => alterar("senha", valor)}
            onEnter={realizarLogin}
          />
        </tbody>
      </table>

      <Mensagem texto={mensagem.texto} sucesso={mensagem.sucesso} />

      <div className="botoes">
        <Botao texto="Realizar Login" onClick={realizarLogin} desabilitado={enviando} />
        <Botao texto="Limpar" variante="secundario" onClick={limparCampos} />
      </div>

      <div className="links">
        <Link to="/troca-senha">Quero trocar minha senha</Link>
        <Link to="/cadastro">Ainda não sou cliente: cadastre-se</Link>
        <Link to="/">← Voltar à página inicial</Link>
      </div>
    </PaginaFormulario>
  );
}
