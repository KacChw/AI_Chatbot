// <!-- <script>
//         const form = document.getElementById('chat-form');
//         const input = document.getElementById('user-input');
//         const chatWindow = document.getElementById('chat-window');

//         form.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const message = input.value.trim();
            
//             if (message) {
//                 addMessage(message, 'user-message');
//                 input.value = '';
                
//                 // Tutaj później dodasz logikę wysyłania do API Twojego bota
//                 setTimeout(() => {
//                     addMessage("Zrozumiałem. Przygotowuję Twój plan...", 'bot-message');
//                 }, 1000);
//             }
//         });

//         function addMessage(text, className) {
//             const msgDiv = document.createElement('div');
//             msgDiv.classList.add('message', className);
//             msgDiv.innerText = text;
//             chatWindow.appendChild(msgDiv);
//             chatWindow.scrollTop = chatWindow.scrollHeight;
//         }
//     </script> -->

function sendMessage(){
    const message=inputMessage.value.trim();

    console.log(message);
}

const sendBtn = document.getElementById('sendBtn');
const inputMessage = document.getElementById('inputMessage');
const chatbox = document.getElementById('chatbox')

sendBtn.addEventListener("click", sendMessage)
inputMessage.addEventListener("keypress", function (e){
    if (e.key === "Enter") sendMessage();
})