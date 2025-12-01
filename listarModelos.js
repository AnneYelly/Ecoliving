import { GoogleAI } from "@google/generative-ai";

const ai = new GoogleAI("AIzaSyDmvHGN2qj5d5px9TJ4x7jPu9x8kkfEgMk");

async function main() {
  const response = await ai.models.list();
  console.log("===== MODELOS DISPONIBLES =====");
  for (const model of response.models) {
    console.log(model.name);
  }
}

main();
