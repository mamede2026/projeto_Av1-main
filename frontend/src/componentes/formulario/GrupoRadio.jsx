export default function GrupoRadio({ nome, rotulo, valor, onAlterar, opcoes }) {
  return (
    <tr>
      <td>{rotulo}</td>
      <td>
        {opcoes.map((opcao) => (
          <label key={opcao} className="opcao-radio">
            <input
              type="radio"
              name={nome}
              value={opcao}
              checked={valor === opcao}
              onChange={() => onAlterar(opcao)}
            />
            {" " + opcao}
          </label>
        ))}
      </td>
    </tr>
  );
}
