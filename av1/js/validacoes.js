// Validações compartilhadas entre as páginas
var ESPECIAIS_PERMITIDOS = "@#$%&*!?/\\|-_+.=";
var CARACTERES_PROIBIDOS = "¨{}[]´`~^:;<>,“‘";

function emailValido(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// Retorna "" se válida, ou a mensagem do primeiro problema encontrado
function erroSenha(s) {
  if (!s) return "A senha deve ser preenchida.";
  if (s.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
  for (var i = 0; i < s.length; i++) {
    if (CARACTERES_PROIBIDOS.indexOf(s[i]) !== -1) {
      return "A senha contém o caractere não permitido: " + s[i];
    }
  }
  if (!/[0-9]/.test(s)) return "A senha deve ter pelo menos um número.";
  if (!/[A-Z]/.test(s)) return "A senha deve ter pelo menos uma letra maiúscula.";
  var temEspecial = false;
  for (var j = 0; j < s.length; j++) {
    if (ESPECIAIS_PERMITIDOS.indexOf(s[j]) !== -1) temEspecial = true;
  }
  if (!temEspecial) return "A senha deve ter pelo menos um caractere especial permitido.";
  return "";
}

// Valida e-mail + senha + confirmação (troca de senha e cadastro)
function erroCredenciais(email, senha, confirmacao) {
  if (!email) return "O login (e-mail) deve ser preenchido.";
  if (!emailValido(email)) return "O login deve ter formato de e-mail válido.";
  var e = erroSenha(senha);
  if (e) return e;
  if (!confirmacao) return "A confirmação de senha deve ser preenchida.";
  if (senha !== confirmacao) return "A senha e a confirmação não conferem.";
  return "";
}

function erroNome(nome) {
  nome = nome.trim();
  if (!nome) return "O nome deve ser preenchido.";
  var partes = nome.split(/\s+/);
  if (partes.length < 2) return "O nome deve ter pelo menos duas palavras.";
  if (partes[0].length < 2) return "A primeira palavra do nome deve ter pelo menos 2 caracteres.";
  var especiais = ESPECIAIS_PERMITIDOS + CARACTERES_PROIBIDOS;
  for (var i = 0; i < nome.length; i++) {
    if (especiais.indexOf(nome[i]) !== -1 || /[0-9]/.test(nome[i])) {
      return "O nome não pode conter caracteres especiais ou números.";
    }
  }
  return "";
}

function cpfValido(cpf) {
  var d = cpf.replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  for (var t = 9; t < 11; t++) {
    var soma = 0;
    for (var i = 0; i < t; i++) soma += Number(d[i]) * (t + 1 - i);
    var dv = (soma * 10) % 11 % 10;
    if (dv !== Number(d[t])) return false;
  }
  return true;
}

function mascaraCPF(valor) {
  var d = valor.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

// Aceita (81) 91234-5678, (81) 3333-4444, com ou sem máscara
function telefoneValido(t) {
  return /^(\(\d{2}\)|\d{2})\s?9?\d{4}-?\d{4}$/.test(t.trim());
}

// Volta para a página anterior; se a página foi aberta direto, vai para o destino padrão
function voltar(destinoPadrao) {
  if (window.history.length > 1) window.history.back();
  else window.location.href = destinoPadrao;
}

function maiorDeIdade(dataStr) {
  var p = dataStr.split("-");
  var nasc = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  var hoje = new Date();
  var limite = new Date(nasc.getFullYear() + 18, nasc.getMonth(), nasc.getDate());
  return limite <= hoje;
}

// Usuários cadastrados ficam no localStorage, na chave "usuarios" (lista de objetos)
function lerUsuarios() {
  try {
    var v = JSON.parse(localStorage.getItem("usuarios"));
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}

function salvarUsuarios(lista) {
  localStorage.setItem("usuarios", JSON.stringify(lista));
}

function buscarUsuario(email) {
  email = email.toLowerCase();
  return lerUsuarios().filter(function (u) { return u.email.toLowerCase() === email; })[0];
}

// Mostra erro em um label de mensagem e também em alert
function mostrarMensagem(el, texto, sucesso) {
  el.textContent = texto;
  el.className = "mensagem" + (sucesso ? " sucesso" : "");
  alert(texto);
}
