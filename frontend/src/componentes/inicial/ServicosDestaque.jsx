const servicos = [
  { titulo: "Suporte técnico", texto: "Atendimento remoto e presencial para o dia a dia da sua equipe." },
  { titulo: "Redes e infraestrutura", texto: "Projeto, instalação e monitoramento de redes corporativas." },
  { titulo: "Desenvolvimento", texto: "Sites, sistemas e integrações sob medida." },
  { titulo: "Backup e nuvem", texto: "Seus dados protegidos e disponíveis, sempre." }
];

function CartaoServico({ titulo, texto }) {
  return (
    <article className="card destaque">
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </article>
  );
}

export default function ServicosDestaque() {
  return (
    <section id="servicos">
      <h2>Principais serviços</h2>
      <div className="servicos">
        {servicos.map((servico) => (
          <CartaoServico key={servico.titulo} titulo={servico.titulo} texto={servico.texto} />
        ))}
      </div>
    </section>
  );
}
