export function dataIso(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return ano + "-" + mes + "-" + dia;
}

export function hoje() {
  return dataIso(new Date());
}

export function daquiA(dias) {
  const data = new Date();
  data.setDate(data.getDate() + dias);
  return dataIso(data);
}

export function dataBrasileira(dataIso) {
  const partes = dataIso.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

export function moeda(valor) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function textoPrazo(dias) {
  if (dias === 1) {
    return "1 dia";
  }
  return dias + " dias";
}
