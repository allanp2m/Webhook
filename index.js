const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/webhook", (req, res) => {
  console.log("🔥 Webhook RECEBIDO!");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  res.status(200).send("Recebido!");
});

app.get("/", (req, res) => {
  res.send("Webhook ativo");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});