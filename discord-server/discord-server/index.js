// index.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const FormData = require("form-data");

const app = express();

// Middleware
app.use(express.json({ limit: "2mb" }));
app.use(cors()); // permet à GitHub Pages d'envoyer la requête

// Webhook sécurisé via variable d'environnement Render
const WEBHOOK_URL = process.env.WEBHOOK_URL;
if (!WEBHOOK_URL) {
  console.error("ERROR: WEBHOOK_URL not set in environment variables!");
  process.exit(1);
}

// Route POST /send
app.post("/send", async (req, res) => {
  const content = req.body.content || "";

  // Vérifier qu'il y a quelque chose à envoyer
  if (!content.trim()) {
    return res.status(400).json({ error: "Empty content" });
  }

  try {
    // Création du fichier à envoyer
    const form = new FormData();
    form.append("content", "📄 New PowerShell script received"); // message optionnel
    form.append(
      "file",
      Buffer.from(content, "utf-8"), // transforme le texte en buffer
      { filename: "script.txt", contentType: "text/plain" }
    );

    // Envoi à Discord
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: form
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Discord API error:", text);
      return res.status(response.status).json({ error: text });
    }

    // Réponse au client
    res.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
