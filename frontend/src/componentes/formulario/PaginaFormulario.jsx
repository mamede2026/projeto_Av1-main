export default function PaginaFormulario({ titulo, children }) {
  return (
    <div className="form-pagina">
      <main>
        <section className="card">
          <img className="logo" src="/img/Designer.png" alt="Logo da CesarSchoolTi" height="90" />
          <h1>{titulo}</h1>
          {children}
        </section>
      </main>
    </div>
  );
}
