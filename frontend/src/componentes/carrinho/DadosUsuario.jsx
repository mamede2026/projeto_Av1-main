export default function DadosUsuario({ nome, login }) {
  return (
    <section id="usuario" className="card">
      <h2>Usuário logado</h2>
      <div className="dados-usuario">
        <p>Nome: <label className="valor">{nome}</label></p>
        <p>Login: <label className="valor">{login}</label></p>
      </div>
    </section>
  );
}
