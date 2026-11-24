var form = document.getElementById("form-login");
var msg = document.getElementById("msg");

document.getElementById("btn-login").addEventListener("click", function () {
  var login = document.getElementById("login").value.trim();
  var senha = document.getElementById("senha").value;

  if (!login) return mostrarMensagem(msg, "O login deve ser preenchido.");
  if (!emailValido(login)) return mostrarMensagem(msg, "O login deve ter formato de e-mail válido.");
  if (!senha) return mostrarMensagem(msg, "A senha deve ser preenchida.");

  var usuario = buscarUsuario(login);
  if (!usuario || usuario.senha !== senha) return mostrarMensagem(msg, "Login ou senha incorretos.");

  mostrarMensagem(msg, "Validação realizada com sucesso", true);
  sessionStorage.setItem("logado", "1");
  window.location.href = "index.html";
});

document.getElementById("btn-limpar").addEventListener("click", function () {
  form.reset();
  msg.textContent = "";
  document.getElementById("login").focus();
});
