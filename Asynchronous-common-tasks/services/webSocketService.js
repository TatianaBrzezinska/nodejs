const { getFilesService } = require("./fileService");
const clients = [];

async function handleWebSocketConnection(ws) {
  console.log("WebSocket connection established");

  clients.push(ws);

  ws.on("message", async (message) => {
    if (message.toString() === "getFiles") {
      try {
        const files = await getFilesService();
        ws.send(JSON.stringify(files));
      } catch (err) {
        console.error("Error:", err);
        ws.send(JSON.stringify({ error: "Error retrieving files" }));
      }
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
}

function broadcast(data) {
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

module.exports = {
  handleWebSocketConnection,
  broadcast,
};
