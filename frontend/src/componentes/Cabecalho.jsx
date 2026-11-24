import { Link } from "react-router-dom";

export default function Cabecalho({ frase, children }) {
  return (
    <header className="cabecalho">
      <div>
        <Link to="/">
          <img src="/img/Designer.png" alt="Logo da CesarSchoolTi" height="90" />
        </Link>
        <p>{frase}</p>
      </div>
      <nav>{children}</nav>
    </header>
  );
}
