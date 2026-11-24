export default function VideoInstitucional() {
  return (
    <section id="video">
      <h2>Conheça a empresa</h2>
      <div className="video">
        <iframe
          src="https://www.youtube.com/embed/MaN0iVrcF50?si=K2EAsASO1U101MpL"
          title="Vídeo institucional da CesarSchoolTi"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p className="legenda-video">Vídeo institucional – 1 minuto</p>
    </section>
  );
}
