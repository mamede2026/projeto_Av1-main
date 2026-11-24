import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginaFormulario from "../componentes/formulario/PaginaFormulario.jsx";
import CampoTexto from "../componentes/formulario/CampoTexto.jsx";
import Mensagem from "../componentes/Mensagem.jsx";
import Botao from "../componentes/Botao.jsx";
import TabelaServicos from "../componentes/servicos/TabelaServicos.jsx";
import { useFormulario } from "../hooks/useFormulario.js";
import { useMensagem } from "../hooks/useMensagem.js";
import { cadastrarServico, consultarServicos } from "../servicos/api.js";

const valoresIniciais = { nome: "", preco: "", prazo: "" };

function validar(valores) {
  const camposVazios = [];
  if (valores.nome.trim() === "") {
    camposVazios.push("Nome do serviço");
  }
  if (valores.preco.trim() === "") {
    camposVazios.push("Preço");
  }
  if (valores.prazo.trim() === "") {
    camposVazios.push("Prazo de atendimento");
  }
  if (camposVazios.length > 0) {
    return "Preencha o(s) campo(s) obrigatório(s): " + camposVazios.join(", ") + ".";
  }

  const preco = Number(valores.preco.replace(",", "."));
  if (!preco || preco <= 0) {
    return "O preço deve ser um número maior que zero (ex.: 150,00).";
  }

  const prazo = Number(valores.prazo);
  if (!Number.isInteger(prazo) || prazo <= 0) {
    return "O prazo deve ser um número inteiro de dias maior que zero.";
  }
  return "";
}

export default function CadastroServico() {
  const { valores, alterar, limpar, versao } = useFormulario(valoresIniciais);
  const mensagem = useMensagem();
  const navigate = useNavigate();
  const [servicos, setServicos] = useState([]);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    carregarServicos();
  }, []);

  async function carregarServicos() {
    const resposta = await consultarServicos();
    if (resposta.status === "sucesso") {
      setServicos(resposta.servicos);
    } else {
      mensagem.mostrarErro(resposta.mensagem);
    }
  }

  async function cadastrar() {
    const erro = validar(valores);
    if (erro) {
      mensagem.mostrarErro(erro);
      return;
    }

    setEnviando(true);
    const resposta = await cadastrarServico({
      nome: valores.nome.trim(),
      preco: Number(valores.preco.replace(",", ".")),
      prazo: Number(valores.prazo)
    });
    setEnviando(false);

    if (resposta.status === "erro") {
      mensagem.mostrarErro(resposta.mensagem);
      return;
    }

    limpar();
    mensagem.mostrarSucesso("Serviço de TI cadastrado com sucesso!");
    carregarServicos();
  }

  function limparCampos() {
    limpar();
    mensagem.limparMensagem();
  }

  return (
    <PaginaFormulario titulo="Cadastro de serviços de TI">
      <table className="tabela-form">
        <tbody>
          <CampoTexto
            key={"nome" + versao}
            focar
            id="nome"
            rotulo="Nome do serviço"
            placeholder="Ex.: Suporte técnico remoto"
            valor={valores.nome}
            onAlterar={(valor) => alterar("nome", valor)}
            onEnter={cadastrar}
          />
          <CampoTexto
            id="preco"
            rotulo="Preço (R$)"
            placeholder="Ex.: 150,00"
            valor={valores.preco}
            onAlterar={(valor) => alterar("preco", valor)}
            onEnter={cadastrar}
          />
          <CampoTexto
            id="prazo"
            rotulo="Prazo de atendimento (dias)"
            placeholder="Ex.: 3"
            valor={valores.prazo}
            onAlterar={(valor) => alterar("prazo", valor)}
            onEnter={cadastrar}
          />
        </tbody>
      </table>
      <p className="obs-obrigatorio">Todos os campos são de preenchimento obrigatório.</p>

      <Mensagem texto={mensagem.texto} sucesso={mensagem.sucesso} />

      <div className="botoes">
        <Botao texto="Cadastrar serviço" onClick={cadastrar} desabilitado={enviando} />
        <Botao texto="Limpar" variante="secundario" onClick={limparCampos} />
        <Botao texto="Voltar" variante="secundario" onClick={() => navigate(-1)} />
      </div>

      <h2 className="subtitulo">Serviços de TI cadastrados</h2>
      <TabelaServicos servicos={servicos} />
    </PaginaFormulario>
  );
}
