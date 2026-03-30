const sendBtn = document.getElementById('sendBtn');
const inputMessage = document.getElementById('inputMessage');
// Poprawka: celujemy w 'chat-window', a nie w nagłówek
const chatWindow = document.getElementById('chat-window');

function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    // Dodajemy klasę ogólną 'message' i specyficzną 'bot-message' lub 'user-message'
    msgDiv.classList.add("message", sender + "-message");

    const textBubble = document.createElement("span");
    textBubble.classList.add("text-bubble");
    textBubble.textContent = text;

    // Tworzenie elementu obrazka awatara
    const iconImg = document.createElement("img");
    iconImg.classList.add("chat-logo");

    if (sender === "bot") {
        iconImg.src = "trener.jpg";
        iconImg.alt = "Bot logo";
    } else {
        iconImg.src = "user.png";
        iconImg.alt = "User logo";
    }

    // Dodajemy awatar i dymek do kontenera wiadomości
    msgDiv.appendChild(iconImg);
    msgDiv.appendChild(textBubble);
    
    // Dodajemy wiadomość do okna czatu
    chatWindow.appendChild(msgDiv);
    
    // Przewijamy na sam dół
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
    const message = inputMessage.value.trim();
    if (!message) return;

    appendMessage(message, "user");
    inputMessage.value = '';
    sendBtn.disabled = true;

    try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        appendMessage(data.reply, "bot");

    } catch (error) {
        appendMessage("Błąd połączenia z serwerem", "bot");
        console.error(error);
    }

    sendBtn.disabled = false;
    inputMessage.focus();
}

sendBtn.addEventListener("click", sendMessage);

inputMessage.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// Opcjonalnie: wiadomość powitalna od bota po załadowaniu strony
window.onload = () => {
    appendMessage("Cześć! Jestem Twoim trenerem AI. W czym mogę Ci dzisiaj pomóc?", "bot");
};