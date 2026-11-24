import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginaFormulario from "../componentes/formulario/PaginaFormulario.jsx";
import CampoTexto from "../componentes/formulario/CampoTexto.jsx";
import CampoSelecao from "../componentes/formulario/CampoSelecao.jsx";
import GrupoRadio from "../componentes/formulario/GrupoRadio.jsx";
import RegrasSenha from "../componentes/formulario/RegrasSenha.jsx";
import Mensagem from "../componentes/Mensagem.jsx";
import Botao from "../componentes/Botao.jsx";
import { useFormulario } from "../hooks/useFormulario.js";
import { useMensagem } from "../hooks/useMensagem.js";
import { cadastrarCliente } from "../servicos/api.js";
import {
  cpfValido,
  maiorDeIdade,
  mascaraCPF,
  telefoneValido,
  validarCredenciais,
  validarNome
} from "../util/validacoes.js";

const estadosCivis = ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)"];

const escolaridades = [
  { valor: "1º grau incompleto", texto: "1º grau incompleto" },
  { valor: "1º grau completo", texto: "1º grau completo" },
  { valor: "2º grau completo", texto: "2º grau completo" },
  { valor: "Nível superior", texto: "Nível superior" },
  { valor: "Pós-graduado", texto: "Pós-graduado" }
];

const valoresIniciais = {
  email: "",
  senha: "",
  confirmacao: "",
  nome: "",
  cpf: "",
  nascimento: "",
  telefone: "",
  estadoCivil: "Solteiro(a)",
  escolaridade: "2º grau completo"
};

function validar(valores) {
  const erroCredenciais = validarCredenciais(valores.email.trim(), valores.senha, valores.confirmacao);
  if (erroCredenciais) {
    return erroCredenciais;
  }

  const erroNome = validarNome(valores.nome);
  if (erroNome) {
    return erroNome;
  }

  if (valores.cpf === "") {
    return "O CPF deve ser preenchido.";
  }
  if (!cpfValido(valores.cpf)) {
    return "O CPF informado é inválido.";
  }
  if (valores.nascimento === "") {
    return "A data de nascimento deve ser preenchida.";
  }
  if (!maiorDeIdade(valores.nascimento)) {
    return "O cliente deve ter 18 anos ou mais.";
  }
  if (valores.telefone.trim() !== "" && !telefoneValido(valores.telefone)) {
    return "O telefone deve ter formato nacional, ex.: (81) 91234-5678.";
  }
  return "";
}

export default function CadastroCliente() {
  const { valores, alterar, limpar, versao } = useFormulario(valoresIniciais);
  const mensagem = useMensagem();
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);

  async function incluir() {
    const erro = validar(valores);
    if (erro) {
      mensagem.mostrarErro(erro);
      return;
    }

    mensagem.mostrarSucesso("Validação realizada com sucesso");
    setEnviando(true);
    const resposta = await cadastrarCliente({
      login: valores.email.trim(),
      senha: valores.senha,
      nome: valores.nome.trim(),
      cpf: valores.cpf,
      dataNascimento: valores.nascimento,
      telefone: valores.telefone.trim(),
      estadoCivil: valores.estadoCivil,
      escolaridade: valores.escolaridade
    });
    setEnviando(false);

    if (resposta.status === "erro") {
      mensagem.mostrarErro(resposta.mensagem);
      return;
    }

    mensagem.mostrarSucesso("Validação realizada com sucesso. Cliente cadastrado!");
    setTimeout(() => navigate("/login"), 2000);
  }

  function limparCampos() {
    limpar();
    mensagem.limparMensagem();
  }

  return (
    <PaginaFormulario titulo="Cadastro de clientes">
      <table className="tabela-form">
        <tbody>
          <CampoTexto
            key={"email" + versao}
            focar
            id="email"
            rotulo="E-mail (será seu login)"
            valor={valores.email}
            onAlterar={(valor) => alterar("email", valor)}
          />
          <CampoTexto
            id="senha"
            tipo="password"
            rotulo="Senha"
            valor={valores.senha}
            onAlterar={(valor) => alterar("senha", valor)}
          />
          <CampoTexto
            id="confirmacao"
            tipo="password"
            rotulo="Confirmação de senha"
            valor={valores.confirmacao}
            onAlterar={(valor) => alterar("confirmacao", valor)}
          />
        </tbody>
      </table>

      <RegrasSenha />

      <table className="tabela-form">
        <tbody>
          <CampoTexto
            id="nome"
            rotulo="Nome completo"
            valor={valores.nome}
            onAlterar={(valor) => alterar("nome", valor)}
          />
          <CampoTexto
            id="cpf"
            rotulo="CPF"
            placeholder="000.000.000-00"
            valor={valores.cpf}
            onAlterar={(valor) => alterar("cpf", mascaraCPF(valor))}
          />
          <CampoTexto
            id="nascimento"
            tipo="date"
            rotulo="Data de nascimento"
            valor={valores.nascimento}
            onAlterar={(valor) => alterar("nascimento", valor)}
          />
          <CampoTexto
            id="telefone"
            rotulo="Celular / WhatsApp (opcional)"
            placeholder="(81) 91234-5678"
            valor={valores.telefone}
            onAlterar={(valor) => alterar("telefone", valor)}
          />
          <GrupoRadio
            nome="estado-civil"
            rotulo="Estado civil"
            opcoes={estadosCivis}
            valor={valores.estadoCivil}
            onAlterar={(valor) => alterar("estadoCivil", valor)}
          />
          <CampoSelecao
            id="escolaridade"
            rotulo="Escolaridade"
            opcoes={escolaridades}
            valor={valores.escolaridade}
            onAlterar={(valor) => alterar("escolaridade", valor)}
          />
        </tbody>
      </table>

      <Mensagem texto={mensagem.texto} sucesso={mensagem.sucesso} />

      <div className="botoes">
        <Botao texto="Incluir" onClick={incluir} desabilitado={enviando} />
        <Botao texto="Limpar" variante="secundario" onClick={limparCampos} />
        <Botao texto="Voltar" variante="secundario" onClick={() => navigate(-1)} />
      </div>
    </PaginaFormulario>
  );
}
