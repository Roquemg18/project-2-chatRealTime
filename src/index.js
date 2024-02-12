const app = require("./app");
const { port } = require("./config/app.config");
const { Server } = require("socket.io");
const TeamMessage = require("./models/teamMessage.model");

const messages = [];

const httpServer = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("actualizarChat", messages);
  });

  socket.on("teamMessage", async (data) => {
    try {
      const { teamId, message, sender } = data;

      const newTeamMessage = new TeamMessage({
        teamId,
        content: message,
        sender,
      });

      await newTeamMessage.save();
      await TeamMessage.findByIdAndUpdate(
        teamId,
        {
          $push: {
            history: {
              nameUser: sender,
              text: message,
            },
          },
        },
        { new: true }
      );
      const allTeamMessages = await TeamMessage.find({ teamId }).sort({
        timestamp: 1,
      });

      io.emit("updateTeamChat", allTeamMessages);
    } catch (error) {
      console.error("Error al guardar el mensaje de equipo:", error);
    }
  });
});
