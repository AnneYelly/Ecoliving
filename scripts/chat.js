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

async function llamarIA(message) {
    try {
        const res = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await res.json();
        return data.reply;
    } catch (e) {
        return "Error al conectar con el servidor 😢";
    }
}

async function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, "user");
    input.value = "";

    const respuesta = await llamarIA(msg);
    addMessage(respuesta, "bot");
}

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

window.onload = () => {
    setTimeout(() => {
        addMessage("¡Bienvenido a EcoLiving! 🌱 ¿Quieres saber cómo empezar a ahorrar agua, luz y gas?", "bot");
    }, 500);
};
