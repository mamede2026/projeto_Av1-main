import { Router } from "express";
import { autenticar, cadastrarCliente, lerClientePorLogin, trocarSenha } from "./funcionalidades/clientes.js";
import { cadastrarServico, consultarServicos } from "./funcionalidades/servicosTi.js";
import { atualizarSolicitacoes, consultarSolicitacoes } from "./funcionalidades/solicitacoes.js";

const rotas = Router();

function responder(res, mensagemErro) {
  if (mensagemErro) {
    res.status(400).json({ status: "erro", mensagem: mensagemErro });
  } else {
    res.json({ status: "sucesso" });
  }
}

function responderErro(res, erro) {
  res.status(400).json({ status: "erro", mensagem: erro.message });
}

rotas.post("/autenticacao", (req, res) => {
  const autenticado = autenticar(req.body.login, req.body.senha);
  res.json({ status: "sucesso", autenticado: autenticado });
});

rotas.put("/clientes/senha", (req, res) => {
  const erro = trocarSenha(req.body.login, req.body.senhaAtual, req.body.novaSenha);
  responder(res, erro);
});

rotas.post("/clientes", (req, res) => {
  const erro = cadastrarCliente(req.body);
  responder(res, erro);
});

rotas.get("/clientes/:login", (req, res) => {
  const cliente = lerClientePorLogin(req.params.login);

  if (!cliente) {
    res.status(404).json({ status: "erro", mensagem: "Cliente não encontrado." });
    return;
  }

  res.json({ status: "sucesso", cliente: { nome: cliente.nome, login: cliente.login } });
});

rotas.post("/servicos", (req, res) => {
  const erro = cadastrarServico(req.body);
  responder(res, erro);
});

rotas.get("/servicos", (req, res) => {
  try {
    res.json({ status: "sucesso", servicos: consultarServicos() });
  } catch (erro) {
    responderErro(res, erro);
  }
});

rotas.get("/solicitacoes/:login", (req, res) => {
  try {
    res.json({ status: "sucesso", solicitacoes: consultarSolicitacoes(req.params.login) });
  } catch (erro) {
    responderErro(res, erro);
  }
});

rotas.put("/solicitacoes/:login", (req, res) => {
  const erro = atualizarSolicitacoes(req.params.login, req.body.solicitacoes);
  responder(res, erro);
});

export default rotas;
