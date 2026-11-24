import Botao from "../Botao.jsx";
import { dataBrasileira, moeda } from "../../util/formatos.js";

export default function LinhaSolicitacao({ solicitacao, onExcluir }) {
  const nova = solicitacao.numero === null;

  let numero = solicitacao.numero;
  if (nova) {
    numero = <span className="etiqueta-nova">nova</span>;
  }

  return (
    <tr className={nova ? "linha-nova" : ""}>
      <td>{dataBrasileira(solicitacao.dataPedido)}</td>
      <td>{numero}</td>
      <td>{solicitacao.servico}</td>
      <td>{solicitacao.status}</td>
      <td className="num">{moeda(solicitacao.preco)}</td>
      <td>{dataBrasileira(solicitacao.dataPrevista)}</td>
      <td>
        <Botao texto="Excluir" variante="perigo" onClick={() => onExcluir(solicitacao.chave)} />
      </td>
    </tr>
  );
}
