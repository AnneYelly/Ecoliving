import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyDmvHGN2qj5d5px9TJ4x7jPu9x8kkfEgMk");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const chatBtn = document.getElementById("chatbot-button");
const chatWindow = document.getElementById("chatbot-window");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("chatbot-send");
const input = document.getElementById("chatbot-input");
const msgBox = document.getElementById("chatbot-messages");

chatBtn.onclick = () => (chatWindow.style.display = "flex");
closeChat.onclick = () => (chatWindow.style.display = "none");

function addMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = sender === "user" ? "msg-user" : "msg-bot";
    bubble.innerText = text;
    msgBox.appendChild(bubble);
    msgBox.scrollTop = msgBox.scrollHeight;
}

function respuestasLocales(msg) {
    msg = msg.toLowerCase();

    if (msg === "si" || msg.includes("claro") || msg.includes("quiero aprender") || msg.includes("quiero"))
        return "Perfecto 😊. Primero inicia sesión para personalizar tu experiencia. Arriba a la derecha verás el botón.";

    if (msg === "no")
        return "¡Sin problema! 🌿 Igual estaré aquí si deseas saber cómo ahorrar agua, luz y gas. ¿Quieres saber cómo empezar a ahorrar?";

    if (msg.includes("que es ecoliving") || msg.includes("información") || msg.includes("saber mas"))
        return "EcoLiving es una plataforma que te ayuda a ahorrar agua, luz y gas mediante paneles de consumo, alertas y simuladores.";

    if (msg.includes("iniciar sesión") || msg.includes("login"))
        return "Para iniciar sesión, haz clic en 'Iniciar sesión' arriba a la derecha e ingresa tu correo y contraseña.";

    if (msg.includes("crear cuenta") || msg.includes("registrarme"))
        return "Para crear una cuenta, selecciona el botón 'Registrarme' en la esquina superior derecha.";

    return null;
}

async function llamarIA(message) {
    try {
        const res = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await res.json();
        if (!data.reply || data.reply.trim() === "") return null;

        return data.reply;
    } catch (e) {
        return null;
    }
}

async function sendMessage() {
    const msg = input.value.trim();
    if (msg === "") return;
    addMessage(msg, "user");
    input.value = "";

    let respuesta = respuestasLocales(msg);

    if (respuesta) {
        addMessage(respuesta, "bot");
        return;
    }

    respuesta = await llamarIA(msg);

    if (respuesta) {
        addMessage(respuesta, "bot");
        return;
    }

    addMessage("No entendí 😕", "bot");
    setTimeout(() => {
        addMessage("¡Bienvenido a EcoLiving! 🌱 ¿Quieres saber cómo empezar a ahorrar agua, luz y gas?", "bot");
    }, 700);
}

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

window.onload = () => {
    setTimeout(() => {
        addMessage("¡Bienvenido a EcoLiving! 🌱 ¿Quieres saber cómo empezar a ahorrar agua, luz y gas?", "bot");
    }, 500);
};
