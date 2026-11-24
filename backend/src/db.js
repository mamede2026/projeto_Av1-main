import Database from "better-sqlite3";
import fs from "node:fs";

fs.mkdirSync("dados", { recursive: true });

const db = new Database("dados/cesarschoolti.db");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS cliente (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    login           TEXT NOT NULL UNIQUE COLLATE NOCASE,
    senha           TEXT NOT NULL,
    nome            TEXT NOT NULL,
    cpf             TEXT NOT NULL,
    data_nascimento TEXT NOT NULL,
    telefone        TEXT,
    estado_civil    TEXT NOT NULL,
    escolaridade    TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS servico_ti (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nome       TEXT    NOT NULL,
    preco      REAL    NOT NULL,
    prazo_dias INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS solicitacao_servico (
    numero        INTEGER PRIMARY KEY AUTOINCREMENT,
    data_pedido   TEXT    NOT NULL,
    status        TEXT    NOT NULL,
    preco         REAL    NOT NULL,
    data_prevista TEXT    NOT NULL,
    servico_id    INTEGER NOT NULL REFERENCES servico_ti (id),
    cliente_id    INTEGER NOT NULL REFERENCES cliente (id)
  );
`);

const totalServicos = db.prepare("SELECT COUNT(*) AS total FROM servico_ti").get().total;

if (totalServicos === 0) {
  const inserirServico = db.prepare("INSERT INTO servico_ti (nome, preco, prazo_dias) VALUES (?, ?, ?)");
  inserirServico.run("Suporte técnico remoto", 150, 1);
  inserirServico.run("Manutenção de computadores", 280, 3);
  inserirServico.run("Configuração de rede", 450, 5);
  inserirServico.run("Desenvolvimento de site", 2500, 20);
  inserirServico.run("Backup e nuvem", 600, 7);
}

const totalClientes = db.prepare("SELECT COUNT(*) AS total FROM cliente").get().total;

if (totalClientes === 0) {
  const resultado = db.prepare(`
    INSERT INTO cliente (login, senha, nome, cpf, data_nascimento, telefone, estado_civil, escolaridade)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "admin@cesarschoolti.com.br",
    "Admin@123",
    "Administrador CesarSchoolTi",
    "529.982.247-25",
    "1990-01-15",
    "(81) 99999-8888",
    "Solteiro(a)",
    "Nível superior"
  );
  const clienteId = resultado.lastInsertRowid;

  const inserirSolicitacao = db.prepare(`
    INSERT INTO solicitacao_servico (numero, data_pedido, status, preco, data_prevista, servico_id, cliente_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  inserirSolicitacao.run(1001, "2026-08-03", "CONCLUÍDO", 150, "2026-08-04", 1, clienteId);
  inserirSolicitacao.run(1002, "2026-08-20", "EM ANDAMENTO", 450, "2026-08-25", 3, clienteId);
  inserirSolicitacao.run(1003, "2026-09-10", "EM ELABORAÇÃO", 600, "2026-09-17", 5, clienteId);
}

export default db;
