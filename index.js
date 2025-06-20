const express = require("express");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const app = express();
const PORT = process.env.PORT || 3000;

const SPREADSHEET_ID = "1n2iY-fzjaItN9DKF1ozebMOGp7wHEVN56LWlQkoZrdQ";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

async function salvarNoGoogleSheets(data) {
  try {
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // primeira aba

    await sheet.addRow({
      timestamp: new Date().toISOString(),
      rawBody: JSON.stringify(data),
    });

    console.log("✅ Body salvo na planilha!");
  } catch (err) {
    console.error("❌ Erro ao salvar no Google Sheets:", err);
  }
}

console.log("Env vars:", process.env);
console.log("🚀 Starting server - versão TESTE customizada!");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/webhook", (req, res) => {
  console.log("🔥 Webhook RECEBIDO!");
  console.log("Headers:", req.headers);
  console.log("Body:", JSON.stringify(req.body, null, 2));

  salvarNoGoogleSheets(req.body);

  res.status(200).send("Recebido!");
});

app.get("/", (req, res) => {
  res.send("Webhook ativo");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
