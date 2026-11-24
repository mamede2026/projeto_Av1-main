const fundadores = [
  { cargo: "CEO", nome: "João Pedro Mamede", cv: "AI Engineer, com experiência em GenAI e machine learning, além de desenvolvimento de software." },
  { cargo: "CTO", nome: "João Micucci", cv: "Cloud and Software Engineer, arquiteto de sistemas e computação em nuvem." },
  { cargo: "COO", nome: "Mateus Ribeiro", cv: "Administrador e engenheiro de software." }
];

export default function TabelaFundadores() {
  return (
    <section id="fundadores">
      <h2>Fundadores</h2>
      <div className="rolagem">
        <table>
          <thead>
            <tr>
              <th>Cargo</th>
              <th>Nome</th>
              <th>Breve CV</th>
            </tr>
          </thead>
          <tbody>
            {fundadores.map((fundador) => (
              <tr key={fundador.cargo}>
                <td>{fundador.cargo}</td>
                <td>{fundador.nome}</td>
                <td>{fundador.cv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
