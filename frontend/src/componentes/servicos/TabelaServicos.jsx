import { moeda, textoPrazo } from "../../util/formatos.js";

export default function TabelaServicos({ servicos }) {
  return (
    <div className="rolagem servicos-cadastrados">
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Serviço de TI</th>
            <th className="num">Preço</th>
            <th>Prazo</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((servico) => (
            <tr key={servico.id}>
              <td>{servico.id}</td>
              <td>{servico.nome}</td>
              <td className="num">{moeda(servico.preco)}</td>
              <td>{textoPrazo(servico.prazo)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
