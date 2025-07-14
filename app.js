let user = JSON.parse(localStorage.getItem("user"));
let allUsers = JSON.parse(localStorage.getItem("users")) || [];

if (!user) location.href = "index.html";

document.getElementById("profile").innerHTML = `
  <img src="${user.avatar}" class="avatar" />
  <div><strong>${user.name}</strong><br>ID: ${user.id}</div>
`;

function renderChats() {
  const search = document.getElementById("search").value.toLowerCase();
  const chatList = document.getElementById("chatList");
  chatList.innerHTML = "";

  allUsers
    .filter(u => u.id !== user.id &&
      (u.name.toLowerCase().includes(search) || u.id.toString().includes(search)))
    .forEach(other => {
      const div = document.createElement("div");
      div.className = "chat-item";
      div.innerHTML = `
        <img src="${other.avatar}" class="avatar" />
        <div>
          <strong>${other.name}</strong><br>ID: ${other.id}
        </div>
      `;
      div.onclick = () => openChat(other);
      chatList.appendChild(div);
    });
}

function openChat(other) {
  const view = document.getElementById("chatView");
  view.innerHTML = `
    <h3>Чат с ${other.name}</h3>
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
  const newName = document.getElementById("newName").value.trim();
  if (newName) {
    user.name = newName;
    localStorage.setItem("user", JSON.stringify(user));

    allUsers = allUsers.map(u => u.id === user.id ? user : u);
    localStorage.setItem("users", JSON.stringify(allUsers));

    location.reload();
  }
}

renderChats();


