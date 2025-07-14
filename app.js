let user = JSON.parse(localStorage.getItem("user"));
let chats = JSON.parse(localStorage.getItem("chats")) || [];

if (!user) location.href = "index.html";

document.getElementById("profile").innerHTML = `
  <img src="${user.avatar}" />
  <div><strong>${user.name}</strong><br>ID: ${user.id}</div>
`;

function renderChats() {
  const search = document.getElementById("search").value.toLowerCase();
  const chatList = document.getElementById("chatList");
  chatList.innerHTML = "";

  chats
    .filter(c => c.name.toLowerCase().includes(search) || c.id.includes(search))
    .forEach(chat => {
      const div = document.createElement("div");
      div.className = "chat-item";
      div.textContent = chat.name + " (ID: " + chat.id + ")";
      div.onclick = () => openChat(chat);
      chatList.appendChild(div);
    });
}

function openChat(chat) {
  const view = document.getElementById("chatView");
  view.innerHTML = `
    <h3>Чат с ${chat.name}</h3>
    <div>🔒 Пока что только интерфейс :)</div>
  `;
}

function openSettings() {
  document.getElementById("settings").classList.remove("hidden");
}

function closeSettings() {
  document.getElementById("settings").classList.add("hidden");
}

function saveSettings() {
  const newName = document.getElementById("newName").value;
  if (newName) {
    user.name = newName;
    localStorage.setItem("user", JSON.stringify(user));
    location.reload();
  }
}

renderChats();
