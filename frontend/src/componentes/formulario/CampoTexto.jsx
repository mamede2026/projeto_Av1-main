export default function CampoTexto({ id, rotulo, valor, onAlterar, onEnter, tipo = "text", placeholder, focar }) {
  function aoDigitar(evento) {
    onAlterar(evento.target.value);
  }

  function aoPressionarTecla(evento) {
    if (evento.key === "Enter" && onEnter) {
      onEnter();
    }
  }

  return (
    <tr>
      <td>
        <label htmlFor={id}>{rotulo}</label>
      </td>
      <td>
        <input
          id={id}
          type={tipo}
          value={valor}
          placeholder={placeholder}
          autoFocus={focar}
          onChange={aoDigitar}
          onKeyDown={aoPressionarTecla}
        />
      </td>
    </tr>
  );
}
