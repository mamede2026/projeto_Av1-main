var USUARIO = { nome: "Administrador", email: "admin@cesarschoolti.com.br" };

var SERVICOS = [
  { nome: "Suporte técnico remoto", preco: 150, prazo: 1 },
  { nome: "Manutenção de computadores", preco: 280, prazo: 3 },
  { nome: "Configuração de rede", preco: 450, prazo: 5 },
  { nome: "Desenvolvimento de site", preco: 2500, prazo: 20 },
  { nome: "Backup e nuvem", preco: 600, prazo: 7 }
];

// datas em ISO (aaaa-mm-dd) para facilitar a ordenação
var solicitacoes = [
  { data: "2026-08-03", numero: 1001, servico: "Suporte técnico remoto", status: "CONCLUÍDO", preco: 150, previsao: "2026-08-04" },
  { data: "2026-08-20", numero: 1002, servico: "Configuração de rede", status: "EM ANDAMENTO", preco: 450, previsao: "2026-08-25" },
  { data: "2026-09-10", numero: 1003, servico: "Backup e nuvem", status: "EM ELABORAÇÃO", preco: 600, previsao: "2026-09-17" }
];
var proximoNumero = 1004;

function iso(d) {
  var m = String(d.getMonth() + 1).padStart(2, "0");
  var dia = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + m + "-" + dia;
}
function br(isoStr) {
  var p = isoStr.split("-");
  return p[2] + "/" + p[1] + "/" + p[0];
}
function moeda(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function desenharTabela() {
  solicitacoes.sort(function (a, b) {
    return a.data < b.data ? -1 : a.data > b.data ? 1 : a.numero - b.numero;
  });
  var corpo = document.getElementById("corpo-solicitacoes");
  corpo.innerHTML = "";
  solicitacoes.forEach(function (s) {
    var tr = document.createElement("tr");
    var cols = [br(s.data), s.numero, s.servico, s.status, moeda(s.preco), br(s.previsao)];
    cols.forEach(function (c) {
      var td = document.createElement("td");
      td.textContent = c;
      tr.appendChild(td);
    });
    var tdBtn = document.createElement("td");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-perigo";
    btn.textContent = "Excluir";
    btn.addEventListener("click", function () {
      solicitacoes = solicitacoes.filter(function (x) { return x.numero !== s.numero; });
      desenharTabela();
    });
    tdBtn.appendChild(btn);
    tr.appendChild(tdBtn);
    corpo.appendChild(tr);
  });
}

var selServico = document.getElementById("servico");
SERVICOS.forEach(function (s, i) {
  var o = document.createElement("option");
  o.value = i;
  o.textContent = s.nome;
  selServico.appendChild(o);
});

function atualizarDetalhes() {
  var i = selServico.value;
  var preco = document.getElementById("preco");
  var prazo = document.getElementById("prazo");
  var prevista = document.getElementById("prevista");
  if (i === "") {
    preco.textContent = prazo.textContent = prevista.textContent = "—";
    return;
  }
  var s = SERVICOS[i];
  var d = new Date();
  d.setDate(d.getDate() + s.prazo);
  preco.textContent = moeda(s.preco);
  prazo.textContent = s.prazo + (s.prazo === 1 ? " dia" : " dias");
  prevista.textContent = br(iso(d));
}
selServico.addEventListener("change", atualizarDetalhes);

document.getElementById("btn-incluir").addEventListener("click", function () {
  if (selServico.value === "") {
    alert("Selecione um serviço de TI.");
    return;
  }
  var s = SERVICOS[selServico.value];
  var hoje = new Date();
  var prev = new Date();
  prev.setDate(prev.getDate() + s.prazo);
  solicitacoes.push({
    data: iso(hoje),
    numero: proximoNumero++,
    servico: s.nome,
    status: document.getElementById("status-novo").textContent,
    preco: s.preco,
    previsao: iso(prev)
  });
  desenharTabela();
  selServico.value = "";
  atualizarDetalhes();
});

document.getElementById("usuario-nome").textContent = USUARIO.nome;
document.getElementById("usuario-email").textContent = USUARIO.email;
desenharTabela();
atualizarDetalhes();
