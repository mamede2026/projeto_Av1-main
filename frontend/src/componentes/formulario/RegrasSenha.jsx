export default function RegrasSenha() {
  return (
    <>
      <output className="regras">
        A senha deve ter <strong>no mínimo 6 caracteres</strong>, com pelo menos{" "}
        <strong>um número</strong>, <strong>uma letra maiúscula</strong> e{" "}
        <strong>um caractere especial permitido</strong>.
      </output>
      <p><strong>Especiais permitidos:</strong> @ # $ % &amp; * ! ? / \ | - _ + . =</p>
      <p><strong>Não permitidos:</strong> ¨ {"{ } [ ]"} ´ ` ~ ^ : ; &lt; &gt; , “ ‘</p>
    </>
  );
}
