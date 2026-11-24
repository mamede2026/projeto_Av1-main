var form = document.getElementById("form-troca");
var msg = document.getElementById("msg");

document.getElementById("btn-troca").addEventListener("click", function () {
  var erro = erroCredenciais(
    document.getElementById("login").value.trim(),
    document.getElementById("senha").value,
    document.getElementById("confirma").value
  );
  if (erro) return mostrarMensagem(msg, erro);

  var login = document.getElementById("login").value.trim().toLowerCase();
  var usuarios = lerUsuarios();
  var alvo = usuarios.filter(function (u) { return u.email.toLowerCase() === login; })[0];
  if (!alvo) return mostrarMensagem(msg, "Não existe usuário cadastrado com este login.");
  alvo.senha = document.getElementById("senha").value;
  salvarUsuarios(usuarios);

  mostrarMensagem(msg, "Validação realizada com sucesso", true);
  voltar("login.html");
});

document.getElementById("btn-limpar").addEventListener("click", function () {
  form.reset();
  msg.textContent = "";
  document.getElementById("login").focus();
});
