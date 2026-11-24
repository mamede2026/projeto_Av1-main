import db from "../db.js";

export function cadastrarServico(servico) {
  const preco = Number(servico.preco);
  const prazo = Number(servico.prazo);

  if (!servico.nome) {
    return "O nome do serviço de TI deve ser informado.";
  }
  if (!preco || preco <= 0) {
    return "O preço deve ser maior que zero.";
  }
  if (!Number.isInteger(prazo) || prazo <= 0) {
    return "O prazo deve ser um número inteiro de dias maior que zero.";
  }

  try {
    db.prepare("INSERT INTO servico_ti (nome, preco, prazo_dias) VALUES (?, ?, ?)").run(servico.nome, preco, prazo);
  } catch (erro) {
    return "Erro ao cadastrar o serviço de TI: " + erro.message;
  }
}

export function consultarServicos() {
  return db.prepare("SELECT id, nome, preco, prazo_dias AS prazo FROM servico_ti ORDER BY nome").all();
}
