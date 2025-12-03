import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyB_neb8Lloe634lgAkAAiqnTkAYV_8zmRo";
const genAI = new GoogleGenAI({ apiKey: API_KEY });
const MODEL = "gemini-2.5-flash";

const systemRules = `
Eres EcoBot, el asistente oficial de EcoLiving.
Respondes cálido, claro y humano.
No uses negritas ni símbolos Markdown como ** o *.
Solo hablas de:
Planes y precios
Plan Gratis ($0)
Plan Premium ($4.99/mes)
Paneles de consumo (agua, luz, gas)
Alertas
Registro e inicio de sesión
Ahorro energético con EcoLiving
Si el usuario pregunta algo fuera de EcoLiving, responde:
"Solo puedo ayudarte con temas relacionados a EcoLiving 😊"
`;

function limpiarMarkdown(texto) {
  return texto
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__/g, "")
    .replace(/_/g, "");
}

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

    const response = await genAI.models.generateContent({
      model: MODEL,
      contents: [
        { role: "user", parts: [{ text: systemRules }] },
        { role: "user", parts: [{ text: userMsg }] }
      ]
    });

    let reply = "No pude generar respuesta.";
    const parts = response.candidates?.[0]?.content?.parts;

    if (parts && parts.length > 0) {
      reply = parts.map(p => p.text || "").join(" ").trim();
    }

    reply = limpiarMarkdown(reply);

    res.json({ reply });

  } catch (error) {
    console.error("❌ Error servidor:", error);
    res.json({ reply: "Error interno al conectar..." });
  }
});

app.listen(3000, () =>
  console.log("🔥 EcoBot funcionando en http://localhost:3000")
);

