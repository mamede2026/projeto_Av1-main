async function chamarApi(metodo, caminho, dados) {
  try {
    const resposta = await fetch("/api" + caminho, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: dados ? JSON.stringify(dados) : undefined
    });
    return await resposta.json();
  } catch {
    return { status: "erro", mensagem: "Não foi possível conectar ao servidor." };
  }
}

export function autenticar(login, senha) {
  return chamarApi("POST", "/autenticacao", { login, senha });
}

export function trocarSenha(login, senhaAtual, novaSenha) {
  return chamarApi("PUT", "/clientes/senha", { login, senhaAtual, novaSenha });
}

export function cadastrarCliente(cliente) {
  return chamarApi("POST", "/clientes", cliente);
}

export function lerCliente(login) {
  return chamarApi("GET", "/clientes/" + encodeURIComponent(login));
}

export function cadastrarServico(servico) {
  return chamarApi("POST", "/servicos", servico);
}

export function consultarServicos() {
  return chamarApi("GET", "/servicos");
}

export function consultarSolicitacoes(login) {
  return chamarApi("GET", "/solicitacoes/" + encodeURIComponent(login));
}

export function atualizarSolicitacoes(login, solicitacoes) {
  return chamarApi("PUT", "/solicitacoes/" + encodeURIComponent(login), { solicitacoes });
}
