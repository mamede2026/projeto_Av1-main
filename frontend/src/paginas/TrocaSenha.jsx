import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginaFormulario from "../componentes/formulario/PaginaFormulario.jsx";
import CampoTexto from "../componentes/formulario/CampoTexto.jsx";
import RegrasSenha from "../componentes/formulario/RegrasSenha.jsx";
import Mensagem from "../componentes/Mensagem.jsx";
import Botao from "../componentes/Botao.jsx";
import { useFormulario } from "../hooks/useFormulario.js";
import { useMensagem } from "../hooks/useMensagem.js";
import { trocarSenha } from "../servicos/api.js";
import { validarCredenciais } from "../util/validacoes.js";

const valoresIniciais = { login: "", senhaAtual: "", novaSenha: "", confirmacao: "" };

function validar(valores) {
  if (valores.login.trim() === "") {
    return "O login (e-mail) deve ser preenchido.";
  }
  if (valores.senhaAtual === "") {
    return "A senha atual deve ser preenchida.";
  }

  const erro = validarCredenciais(valores.login.trim(), valores.novaSenha, valores.confirmacao);
  if (erro) {
    return erro;
  }

  if (valores.novaSenha === valores.senhaAtual) {
    return "A nova senha deve ser diferente da senha atual.";
  }
  return "";
}

export default function TrocaSenha() {
  const { valores, alterar, limpar, versao } = useFormulario(valoresIniciais);
  const mensagem = useMensagem();
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);

  async function realizarTroca() {
    const erro = validar(valores);
    if (erro) {
      mensagem.mostrarErro(erro);
      return;
    }

    mensagem.mostrarSucesso("Validação realizada com sucesso");
    setEnviando(true);
    const resposta = await trocarSenha(valores.login.trim(), valores.senhaAtual, valores.novaSenha);
    setEnviando(false);

    if (resposta.status === "erro") {
      mensagem.mostrarErro(resposta.mensagem);
      return;
    }

    mensagem.mostrarSucesso("Validação realizada com sucesso. Senha alterada!");
    setTimeout(() => navigate(-1), 1500);
  }

  function limparCampos() {
    limpar();
    mensagem.limparMensagem();
  }

  return (
    <PaginaFormulario titulo="Troca de senha de clientes">
      <table className="tabela-form">
        <tbody>
          <CampoTexto
            key={"login" + versao}
            focar
            id="login"
            rotulo="Login (e-mail)"
            valor={valores.login}
            onAlterar={(valor) => alterar("login", valor)}
            onEnter={realizarTroca}
          />
          <CampoTexto
            id="senhaAtual"
            tipo="password"
            rotulo="Senha atual"
            valor={valores.senhaAtual}
            onAlterar={(valor) => alterar("senhaAtual", valor)}
            onEnter={realizarTroca}
          />
          <CampoTexto
            id="novaSenha"
            tipo="password"
            rotulo="Nova senha"
            valor={valores.novaSenha}
            onAlterar={(valor) => alterar("novaSenha", valor)}
            onEnter={realizarTroca}
          />
          <CampoTexto
            id="confirmacao"
            tipo="password"
            rotulo="Confirmação da nova senha"
            valor={valores.confirmacao}
            onAlterar={(valor) => alterar("confirmacao", valor)}
            onEnter={realizarTroca}
          />
        </tbody>
      </table>

      <RegrasSenha />
      <Mensagem texto={mensagem.texto} sucesso={mensagem.sucesso} />

      <div className="botoes">
        <Botao texto="Troca Senha" onClick={realizarTroca} desabilitado={enviando} />
        <Botao texto="Limpar" variante="secundario" onClick={limparCampos} />
        <Botao texto="Voltar" variante="secundario" onClick={() => navigate(-1)} />
      </div>
    </PaginaFormulario>
  );
}
