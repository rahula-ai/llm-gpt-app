let chats = [];
let currentChat = [];

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const botMsg = addMessage("", "bot");

  const res = await fetch("/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

  typeText(botMsg, data.reply);
}

function addMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");

  const div = document.createElement("div");
  div.className = "message " + sender;
  div.innerText = text;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;

  return div;
}

function typeText(element, text) {
  let i = 0;
  const speed = 20;

  function typing() {
    if (i < text.length) {
      element.innerText += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

function newChat() {
  const history = document.getElementById("history");
  const title = "Chat " + (chats.length + 1);

  const item = document.createElement("div");
  item.innerText = title;

  history.appendChild(item);
  document.getElementById("chat-box").innerHTML = "";
}