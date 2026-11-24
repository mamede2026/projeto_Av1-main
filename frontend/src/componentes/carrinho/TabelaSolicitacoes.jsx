import LinhaSolicitacao from "./LinhaSolicitacao.jsx";
import { moeda } from "../../util/formatos.js";

export default function TabelaSolicitacoes({ solicitacoes, carregando, onExcluir }) {
  let total = 0;
  for (const solicitacao of solicitacoes) {
    total = total + Number(solicitacao.preco);
  }

  let linhas;
  if (carregando) {
    linhas = <tr><td colSpan={7} className="tabela-vazia">Carregando solicitações...</td></tr>;
  } else if (solicitacoes.length === 0) {
    linhas = <tr><td colSpan={7} className="tabela-vazia">Nenhuma solicitação. Inclua uma abaixo.</td></tr>;
  } else {
    linhas = solicitacoes.map((solicitacao) => (
      <LinhaSolicitacao key={solicitacao.chave} solicitacao={solicitacao} onExcluir={onExcluir} />
    ));
  }

  return (
    <div className="rolagem">
      <table>
        <thead>
          <tr>
            <th>Data do pedido</th>
            <th>Nº</th>
            <th>Serviço</th>
            <th>Status</th>
            <th className="num">Preço</th>
            <th>Data prevista</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>{linhas}</tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>Total</td>
            <td className="num">{moeda(total)}</td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
