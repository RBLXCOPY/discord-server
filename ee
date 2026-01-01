const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Permet à ton GitHub Pages d'envoyer des requêtes

const WEBHOOK_URL = "https://discord.com/api/webhooks/1456286162359418925/yW8ZAjR5uOpaFJrvN4h8mUgblWJ86Pb4wFjRxzTriPa_LQJkhTr8pUTF0IukHbF9gSR5";

app.post("/send", async (req, res) => {
  const content = req.body.content;
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
