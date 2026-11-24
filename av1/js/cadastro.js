var form = document.getElementById("form-cadastro");
var msg = document.getElementById("msg");
var cpf = document.getElementById("cpf");

// CPF: somente dígitos 0-9 e máscara NNN.NNN.NNN-NN
cpf.addEventListener("keypress", function (e) {
  if (!/[0-9]/.test(e.key)) e.preventDefault();
});
cpf.addEventListener("input", function () {
  cpf.value = mascaraCPF(cpf.value);
});

document.getElementById("btn-incluir").addEventListener("click", function () {
  var erro = erroCredenciais(
    document.getElementById("email").value.trim(),
    document.getElementById("senha").value,
    document.getElementById("confirma").value
  );
  if (!erro) erro = erroNome(document.getElementById("nome").value);
  if (!erro && !cpf.value) erro = "O CPF deve ser preenchido.";
  if (!erro && !cpfValido(cpf.value)) erro = "O CPF informado é inválido.";

  var nasc = document.getElementById("nascimento").value;
  if (!erro && !nasc) erro = "A data de nascimento deve ser preenchida.";
  if (!erro && !maiorDeIdade(nasc)) erro = "O cliente deve ter 18 anos ou mais.";

  var tel = document.getElementById("telefone").value;
  if (!erro && tel.trim() && !telefoneValido(tel)) {
    erro = "O telefone deve ter formato nacional, ex.: (81) 91234-5678.";
  }

  var email = document.getElementById("email").value.trim();
  if (!erro && buscarUsuario(email)) erro = "Já existe um usuário cadastrado com este e-mail.";

  if (erro) return mostrarMensagem(msg, erro);

  var usuarios = lerUsuarios();
  usuarios.push({
    nome: document.getElementById("nome").value.trim().replace(/\s+/g, " "),
    email: email,
    senha: document.getElementById("senha").value,
    cpf: cpf.value,
    nascimento: nasc,
    telefone: tel.trim()
  });
  salvarUsuarios(usuarios);
  mostrarMensagem(msg, "Validação realizada com sucesso", true);
});

document.getElementById("btn-limpar").addEventListener("click", function () {
  form.reset(); // restaura radio (Solteiro) e select (2º grau completo) pelos atributos HTML
  msg.textContent = "";
  document.getElementById("email").focus();
});

document.getElementById("btn-voltar").addEventListener("click", function () {
  voltar("index.html");
});
