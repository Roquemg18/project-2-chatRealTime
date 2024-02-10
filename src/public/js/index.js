
const socket = io();
const chatBox = document.getElementById("chatBox");
let username = "";

fetch("/login/username")
  .then((response) => response.json())
  .then((data) => {
    username = data.username;
  })
  .catch((error) => {
    console.error("Error al obtener el nombre de usuario:", error);
  });

chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        User: username,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

socket.on("actualizarChat", (data) => {
  const log = document.getElementById("messageLogs");
  let messages = "";
  data.forEach((message) => {
    messages = messages + `${message.User}: ${message.message} </br>`;
  });
  log.innerHTML = messages;
});
