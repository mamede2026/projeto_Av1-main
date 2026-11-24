import { Link } from "react-router-dom";
import Cabecalho from "../componentes/Cabecalho.jsx";
import Rodape from "../componentes/Rodape.jsx";
import VideoInstitucional from "../componentes/inicial/VideoInstitucional.jsx";
import Galeria from "../componentes/inicial/Galeria.jsx";
import ServicosDestaque from "../componentes/inicial/ServicosDestaque.jsx";
import TabelaFundadores from "../componentes/inicial/TabelaFundadores.jsx";
import { useSessao } from "../contexto/SessaoContext.jsx";
import "../css/inicial.css";

export default function PaginaInicial() {
  const { login, sair } = useSessao();

  return (
    <>
      <Cabecalho frase="Tecnologia que impulsiona o seu negócio, do suporte à nuvem.">
        <Link to="/login">Login</Link>
        <Link to="/cadastro">Cadastre-se</Link>
        {login && <Link to="/carrinho">Solicitar serviços de TI</Link>}
        {login && <Link to="/servicos/novo">Cadastrar serviço de TI</Link>}
        {login && <Link to="/" onClick={sair}>Sair</Link>}
      </Cabecalho>

      <main className="pagina-inicial">
        <section id="historia">
          <h2>Nossa história</h2>
          <p>
            A <strong>CesarSchoolTi</strong> nasceu em <em>2026</em>, de uma aula de projetos, quando três amigos
            resolveram unir experiência em redes, desenvolvimento e suporte. Hoje ajudamos os{" "}
            <mark>processos internos da CESAR School</mark> com um time especializado e atendimento próximo.
          </p>
          <p>
            Nosso compromisso é simples: <strong>resolver rápido, explicar claramente e cobrar com transparência</strong>.
          </p>
        </section>

        <VideoInstitucional />
        <Galeria />
        <ServicosDestaque />
        <TabelaFundadores />
      </main>

      <Rodape />
    </>
  );
}
