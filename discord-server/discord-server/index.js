const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const FormData = require("form-data");

const app = express();
app.use(express.json());
app.use(cors());

const WEBHOOK_URL = process.env.WEBHOOK_URL;

app.post("/send", async (req, res) => {
  const content = req.body.content || "";

  try {
    const form = new FormData();

    // Texte optionnel
    form.append("content", "📄 New PowerShell script received");

    // Fichier txt
    form.append(
      "file",
      Buffer.from(content, "utf-8"),
      {
        filename: "script.txt",
        contentType: "text/plain"
      }
    );

    await fetch(WEBHOOK_URL, {
      method: "POST",
      body: form
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
