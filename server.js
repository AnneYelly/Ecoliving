import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyDmvHGN2qj5d5px9TJ4x7jPu9x8kkfEgMk");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

    const systemRules = `
Eres EcoBot, un asistente especializado SOLO en temas de EcoLiving.
Solo puedes responder sobre: ahorro de agua, luz, gas, paneles de consumo,
alertas, registro, login, agua, luz, gas y funciones de la plataforma EcoLiving.
Si alguien te pregunta algo fuera de ese tema, responde:
"Solo puedo ayudarte con temas relacionados a EcoLiving 😊".
`;

    const prompt = systemRules + "\nUsuario: " + userMsg;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error(error);
    res.json({ reply: "Error interno al conectar..." });
  }
});

app.listen(3000, () =>
  console.log("Servidor IA corriendo en http://localhost:3000")
);
