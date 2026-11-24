const fotos = [
  { imagem: "SalaDeOperacoesTi.webp", legenda: "Sala de operações", descricao: "Sala de operações com mesas redondas, cadeiras e tela de projeção" },
  { imagem: "Datacenters.webp", legenda: "Datacenter", descricao: "Corredor do datacenter com fileiras de racks de servidores" },
  { imagem: "EquipeDeDesenvolvimento.webp", legenda: "Equipe de desenvolvimento", descricao: "Equipe de desenvolvimento reunida em volta de uma mesa analisando projetos" },
  { imagem: "CentralDeSuporte.webp", legenda: "Central de suporte", descricao: "Central de suporte com notebooks e quadro de post-its" }
];

export default function Galeria() {
  return (
    <section id="galeria">
      <h2>Nossas instalações e equipe</h2>
      <div className="galeria">
        {fotos.map((foto) => (
          <figure key={foto.imagem}>
            <img src={"/img/" + foto.imagem} alt={foto.descricao} />
            <figcaption>{foto.legenda}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
