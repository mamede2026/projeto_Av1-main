// Exibe o link de solicitação de serviços somente após o login
(function () {
  var link = document.getElementById("link-servicos");
  if (link && sessionStorage.getItem("logado") === "1") {
    link.classList.remove("oculto");
  }
})();
