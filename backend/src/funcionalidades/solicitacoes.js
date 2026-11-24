import db from "../db.js";
import { lerClientePorLogin } from "./clientes.js";

export function consultarSolicitacoes(login) {
  const cliente = lerClientePorLogin(login);

  if (!cliente) {
    throw new Error("Cliente não encontrado.");
  }

  return db.prepare(`
    SELECT s.numero,
           s.data_pedido   AS dataPedido,
           s.status,
           s.preco,
           s.data_prevista AS dataPrevista,
           s.servico_id    AS servicoId,
           t.nome          AS servico
      FROM solicitacao_servico s
      JOIN servico_ti t ON t.id = s.servico_id
     WHERE s.cliente_id = ?
     ORDER BY s.data_pedido, s.numero
  `).all(cliente.id);
}

export function atualizarSolicitacoes(login, solicitacoes) {
  const cliente = lerClientePorLogin(login);

  if (!cliente) {
    return "Cliente não encontrado.";
  }
  if (!Array.isArray(solicitacoes)) {
    return "A lista de solicitações é inválida.";
  }

  const linhasAtuais = db.prepare("SELECT numero FROM solicitacao_servico WHERE cliente_id = ?").all(cliente.id);
  const numerosAtuais = linhasAtuais.map((linha) => linha.numero);

  const apagar = db.prepare("DELETE FROM solicitacao_servico WHERE cliente_id = ?");
  const inserir = db.prepare(`
    INSERT INTO solicitacao_servico (numero, data_pedido, status, preco, data_prevista, servico_id, cliente_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const substituirTudo = db.transaction(() => {
    apagar.run(cliente.id);

    for (const solicitacao of solicitacoes) {
      let numero = null;
      if (numerosAtuais.includes(solicitacao.numero)) {
        numero = solicitacao.numero;
      }

      inserir.run(
        numero,
        solicitacao.dataPedido,
        solicitacao.status,
        solicitacao.preco,
        solicitacao.dataPrevista,
        solicitacao.servicoId,
        cliente.id
      );
    }
  });

  try {
    substituirTudo();
  } catch (erro) {
    return "Erro ao atualizar as solicitações: " + erro.message;
  }
}
