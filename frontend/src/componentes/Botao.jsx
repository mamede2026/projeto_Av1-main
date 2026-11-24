export default function Botao({ texto, onClick, variante, desabilitado }) {
  let classe = "btn";
  if (variante === "secundario") {
    classe = "btn btn-secundario";
  }
  if (variante === "perigo") {
    classe = "btn btn-perigo";
  }

  return (
    <button type="button" className={classe} onClick={onClick} disabled={desabilitado}>
      {texto}
    </button>
  );
}
