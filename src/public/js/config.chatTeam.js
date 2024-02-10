const socket = io();
const chatBoxTeam = document.getElementById("chatBoxTeam");
let username = "";

fetch("/login/username")
  .then((response) => response.json())
  .then((data) => {
    username = data.username;
  })
  .catch((error) => {
    console.error("Error al obtener el nombre de usuario:", error);
    s;
  });

chatBoxTeam.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBoxTeam.value.trim().length > 0) {
      const messageData = {
        sender: username,
        message: chatBoxTeam.value,
        teamId: teamId,
      };
      socket.emit("teamMessage", messageData);
      chatBoxTeam.value = "";
    }
  }
});

socket.on("updateTeamChat", (data) => {
  const log = document.getElementById("messageLogsTeam");
  let messages = "";
  data.forEach((message) => {
    messages += `${message.sender}: ${message.content} </br>`;
  });
  log.innerHTML = messages;
});
