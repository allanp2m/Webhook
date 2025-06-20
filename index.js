const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

console.log("🚀 Starting server!");

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).send("Recebido!");
});

app.get("/", (req, res) => {
  res.send("Webhook ativo");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
