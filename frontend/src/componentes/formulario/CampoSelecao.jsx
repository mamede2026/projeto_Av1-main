export default function CampoSelecao({ id, rotulo, valor, onAlterar, opcoes, textoVazio }) {
  function aoSelecionar(evento) {
    onAlterar(evento.target.value);
  }

  return (
    <tr>
      <td>
        <label htmlFor={id}>{rotulo}</label>
      </td>
      <td>
        <select id={id} value={valor} onChange={aoSelecionar}>
          {textoVazio && <option value="">{textoVazio}</option>}
          {opcoes.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>{opcao.texto}</option>
          ))}
        </select>
      </td>
    </tr>
  );
}
