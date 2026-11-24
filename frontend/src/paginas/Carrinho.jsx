import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cabecalho from "../componentes/Cabecalho.jsx";
import Rodape from "../componentes/Rodape.jsx";
import Mensagem from "../componentes/Mensagem.jsx";
import Botao from "../componentes/Botao.jsx";
import DadosUsuario from "../componentes/carrinho/DadosUsuario.jsx";
import TabelaSolicitacoes from "../componentes/carrinho/TabelaSolicitacoes.jsx";
import NovaSolicitacao from "../componentes/carrinho/NovaSolicitacao.jsx";
import { useSessao } from "../contexto/SessaoContext.jsx";
import { useMensagem } from "../hooks/useMensagem.js";
import { atualizarSolicitacoes, consultarServicos, consultarSolicitacoes, lerCliente } from "../servicos/api.js";
import { daquiA, hoje } from "../util/formatos.js";
import "../css/carrinho.css";

function compararPorData(a, b) {
  if (a.dataPedido < b.dataPedido) {
    return -1;
  }
  if (a.dataPedido > b.dataPedido) {
    return 1;
  }
  return 0;
}

export default function Carrinho() {
  const { login, sair } = useSessao();
  const mensagem = useMensagem();
  const [nome, setNome] = useState("");
  const [servicos, setServicos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [alterado, setAlterado] = useState(false);
  const [proximaChave, setProximaChave] = useState(1);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setCarregando(true);

    const respostaCliente = await lerCliente(login);
    if (respostaCliente.status === "sucesso") {
      setNome(respostaCliente.cliente.nome);
    }

    const respostaServicos = await consultarServicos();
    if (respostaServicos.status === "sucesso") {
      setServicos(respostaServicos.servicos);
    } else {
      mensagem.mostrarErro(respostaServicos.mensagem);
    }

    const respostaSolicitacoes = await consultarSolicitacoes(login);
    if (respostaSolicitacoes.status === "sucesso") {
      const lista = respostaSolicitacoes.solicitacoes.map((s) => ({ ...s, chave: "s" + s.numero }));
      setSolicitacoes(lista);
      setAlterado(false);
    } else {
      mensagem.mostrarErro(respostaSolicitacoes.mensagem);
    }

    setCarregando(false);
  }

  function incluir(servico) {
    const nova = {
      chave: "n" + proximaChave,
      numero: null,
      dataPedido: hoje(),
      servicoId: servico.id,
      servico: servico.nome,
      status: "EM ELABORAÇÃO",
      preco: servico.preco,
      dataPrevista: daquiA(servico.prazo)
    };
    setSolicitacoes([...solicitacoes, nova]);
    setProximaChave(proximaChave + 1);
    setAlterado(true);
    mensagem.limparMensagem();
  }

  function excluir(chave) {
    setSolicitacoes(solicitacoes.filter((s) => s.chave !== chave));
    setAlterado(true);
    mensagem.limparMensagem();
  }

  async function salvar() {
    setSalvando(true);
    const resposta = await atualizarSolicitacoes(login, solicitacoes);
    setSalvando(false);

    if (resposta.status === "erro") {
      mensagem.mostrarErro(resposta.mensagem);
      return;
    }

    mensagem.mostrarSucesso("Solicitações atualizadas com sucesso!");
    carregarDados();
  }

  function desfazer() {
    mensagem.limparMensagem();
    carregarDados();
  }

  const solicitacoesOrdenadas = [...solicitacoes].sort(compararPorData);
  const botoesDesabilitados = carregando || salvando || !alterado;

  return (
    <>
      <Cabecalho frase="Solicitação de serviços de TI">
        <Link to="/">Página inicial</Link>
        <Link to="/servicos/novo">Cadastrar serviço de TI</Link>
        <Link to="/" onClick={sair}>Sair</Link>
      </Cabecalho>

      <main className="pagina-carrinho">
        <DadosUsuario nome={nome} login={login} />

        <section id="solicitacoes">
          <h2>Solicitações já realizadas</h2>
          <TabelaSolicitacoes solicitacoes={solicitacoesOrdenadas} carregando={carregando} onExcluir={excluir} />

          {alterado && (
            <p className="aviso-pendente">
              Há alterações ainda não gravadas. Clique em <strong>Atualizar solicitações</strong> para salvá-las.
            </p>
          )}

          <Mensagem texto={mensagem.texto} sucesso={mensagem.sucesso} />

          <div className="botoes">
            <Botao texto="Atualizar solicitações" onClick={salvar} desabilitado={botoesDesabilitados} />
            <Botao texto="Desfazer alterações" variante="secundario" onClick={desfazer} desabilitado={botoesDesabilitados} />
          </div>
        </section>

        <NovaSolicitacao servicos={servicos} onIncluir={incluir} />
      </main>

      <Rodape />
    </>
  );
}
