import db from "../db.js";

export function lerClientePorLogin(login) {
  return db.prepare("SELECT * FROM cliente WHERE login = ?").get(login);
}

export function autenticar(login, senha) {
  if (!login || !senha) {
    return false;
  }

  const cliente = lerClientePorLogin(login);

  if (!cliente) {
    return false;
  }

  return cliente.senha === senha;
}

export function trocarSenha(login, senhaAtual, novaSenha) {
  if (!autenticar(login, senhaAtual)) {
    return "Login ou senha atual incorretos.";
  }

  try {
    db.prepare("UPDATE cliente SET senha = ? WHERE login = ?").run(novaSenha, login);
  } catch (erro) {
    return "Erro ao trocar a senha: " + erro.message;
  }
}

export function cadastrarCliente(cliente) {
  try {
    if (lerClientePorLogin(cliente.login)) {
      return "Já existe um cliente cadastrado com este login.";
    }

    db.prepare(`
      INSERT INTO cliente (login, senha, nome, cpf, data_nascimento, telefone, estado_civil, escolaridade)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      cliente.login,
      cliente.senha,
      cliente.nome,
      cliente.cpf,
      cliente.dataNascimento,
      cliente.telefone,
      cliente.estadoCivil,
      cliente.escolaridade
    );
  } catch (erro) {
    return "Erro ao cadastrar o cliente: " + erro.message;
  }
}
