import { useState } from "react";
import CampoSelecao from "../formulario/CampoSelecao.jsx";
import Mensagem from "../Mensagem.jsx";
import Botao from "../Botao.jsx";
import { dataBrasileira, daquiA, moeda, textoPrazo } from "../../util/formatos.js";

export default function NovaSolicitacao({ servicos, onIncluir }) {
  const [servicoId, setServicoId] = useState("");
  const [erro, setErro] = useState("");

  const servico = servicos.find((s) => String(s.id) === servicoId);

  let preco = "—";
  let prazo = "—";
  let dataPrevista = "—";
  if (servico) {
    preco = moeda(servico.preco);
    prazo = textoPrazo(servico.prazo);
    dataPrevista = dataBrasileira(daquiA(servico.prazo));
  }

  const opcoes = servicos.map((s) => ({ valor: String(s.id), texto: s.nome }));

  function selecionar(novoId) {
    setServicoId(novoId);
    setErro("");
  }

  function incluir() {
    if (!servico) {
      setErro("Selecione um serviço de TI.");
      return;
    }
    onIncluir(servico);
    setServicoId("");
  }

  return (
    <section id="nova" className="card">
      <h2>Nova solicitação</h2>
      <table className="tabela-form campos-nova">
        <tbody>
          <CampoSelecao
            id="servico"
            rotulo="Serviço de TI"
            textoVazio="Selecione..."
            opcoes={opcoes}
            valor={servicoId}
            onAlterar={selecionar}
          />
          <tr>
            <td>Preço</td>
            <td><label className="valor">{preco}</label></td>
          </tr>
          <tr>
            <td>Prazo de atendimento</td>
            <td><label className="valor">{prazo}</label></td>
          </tr>
          <tr>
            <td>Data prevista de atendimento</td>
            <td><label className="valor">{dataPrevista}</label></td>
          </tr>
          <tr>
            <td>Status</td>
            <td><label className="status-novo">EM ELABORAÇÃO</label></td>
          </tr>
        </tbody>
      </table>
      <Mensagem texto={erro} />
      <div className="botoes">
        <Botao texto="Incluir solicitação" onClick={incluir} />
      </div>
    </section>
  );
}
