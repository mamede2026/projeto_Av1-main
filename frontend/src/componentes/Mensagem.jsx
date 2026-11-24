export default function Mensagem({ texto, sucesso }) {
  let classe = "mensagem";
  if (sucesso) {
    classe = "mensagem sucesso";
  }

  return <p className={classe}>{texto}</p>;
}
