const ESPECIAIS_PERMITIDOS = "@#$%&*!?/\\|-_+.=";
const CARACTERES_PROIBIDOS = "¨{}[]´`~^:;<>,“‘";

export function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validarLogin(login) {
  if (login === "") {
    return "O login (e-mail) deve ser preenchido.";
  }
  if (!emailValido(login)) {
    return "O login deve ter formato de e-mail válido.";
  }
  return "";
}

export function validarSenha(senha) {
  if (senha === "") {
    return "A senha deve ser preenchida.";
  }
  if (senha.length < 6) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }

  for (const letra of senha) {
    if (CARACTERES_PROIBIDOS.includes(letra)) {
      return "A senha contém o caractere não permitido: " + letra;
    }
  }

  if (!/[0-9]/.test(senha)) {
    return "A senha deve ter pelo menos um número.";
  }
  if (!/[A-Z]/.test(senha)) {
    return "A senha deve ter pelo menos uma letra maiúscula.";
  }

  let temEspecial = false;
  for (const letra of senha) {
    if (ESPECIAIS_PERMITIDOS.includes(letra)) {
      temEspecial = true;
    }
  }
  if (!temEspecial) {
    return "A senha deve ter pelo menos um caractere especial permitido.";
  }

  return "";
}

export function validarCredenciais(email, senha, confirmacao) {
  const erroLogin = validarLogin(email);
  if (erroLogin) {
    return erroLogin;
  }

  const erroSenha = validarSenha(senha);
  if (erroSenha) {
    return erroSenha;
  }

  if (confirmacao === "") {
    return "A confirmação de senha deve ser preenchida.";
  }
  if (senha !== confirmacao) {
    return "A senha e a confirmação não conferem.";
  }
  return "";
}

export function validarNome(nome) {
  nome = nome.trim();

  if (nome === "") {
    return "O nome deve ser preenchido.";
  }

  const palavras = nome.split(/\s+/);
  if (palavras.length < 2) {
    return "O nome deve ter pelo menos duas palavras.";
  }
  if (palavras[0].length < 2) {
    return "A primeira palavra do nome deve ter pelo menos 2 caracteres.";
  }

  for (const letra of nome) {
    const especial = ESPECIAIS_PERMITIDOS.includes(letra) || CARACTERES_PROIBIDOS.includes(letra);
    const numero = /[0-9]/.test(letra);
    if (especial || numero) {
      return "O nome não pode conter caracteres especiais ou números.";
    }
  }
  return "";
}

export function cpfValido(cpf) {
  const numeros = cpf.replace(/\D/g, "");

  if (numeros.length !== 11) {
    return false;
  }
  if (/^(\d)\1+$/.test(numeros)) {
    return false;
  }

  for (let posicao = 9; posicao < 11; posicao++) {
    let soma = 0;
    for (let i = 0; i < posicao; i++) {
      soma = soma + Number(numeros[i]) * (posicao + 1 - i);
    }
    const digito = ((soma * 10) % 11) % 10;
    if (digito !== Number(numeros[posicao])) {
      return false;
    }
  }
  return true;
}

export function mascaraCPF(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  let resultado = numeros.slice(0, 3);
  if (numeros.length > 3) {
    resultado = resultado + "." + numeros.slice(3, 6);
  }
  if (numeros.length > 6) {
    resultado = resultado + "." + numeros.slice(6, 9);
  }
  if (numeros.length > 9) {
    resultado = resultado + "-" + numeros.slice(9);
  }
  return resultado;
}

export function telefoneValido(telefone) {
  return /^(\(\d{2}\)|\d{2})\s?9?\d{4}-?\d{4}$/.test(telefone.trim());
}

export function maiorDeIdade(dataNascimento) {
  const partes = dataNascimento.split("-");
  const ano = Number(partes[0]);
  const mes = Number(partes[1]) - 1;
  const dia = Number(partes[2]);

  const dataDos18Anos = new Date(ano + 18, mes, dia);
  return dataDos18Anos <= new Date();
}
