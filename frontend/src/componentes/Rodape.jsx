import "../css/rodape.css";

export default function Rodape() {
  return (
    <footer className="rodape">
      <table className="layout-rodape">
        <tbody>
          <tr>
            <td>
              <h3>Contatos</h3>
              <ul>
                <li>Telefone: (81) 3333-4444</li>
                <li>WhatsApp: (81) 99999-8888</li>
                <li><a href="mailto:contato@CesarSchoolTi.com.br">contato@CesarSchoolTi.com.br</a></li>
              </ul>
            </td>
            <td>
              <h3>Endereço</h3>
              <address>Rua do Apolo, 77<br />Recife, Pernambuco – PE<br />CEP 50030-230</address>
            </td>
            <td>
              <h3>Formas de pagamento</h3>
              <div className="pagamentos">
                <figure><img src="/img/pag-pix.svg" alt="Pix" /></figure>
                <figure><img src="/img/pag-cartao.svg" alt="Cartão de crédito" /></figure>
                <figure><img src="/img/pag-boleto.svg" alt="Boleto bancário" /></figure>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </footer>
  );
}
