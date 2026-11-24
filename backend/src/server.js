import express from "express";
import cors from "cors";
import rotas from "./rotas.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", rotas);

app.use((erro, req, res, next) => {
  res.status(500).json({ status: "erro", mensagem: "Erro no servidor: " + erro.message });
});

app.listen(3001, () => {
  console.log("API rodando em http://localhost:3001/api");
});
