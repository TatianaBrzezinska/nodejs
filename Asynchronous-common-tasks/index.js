const express = require("express");
const { WebSocketServer } = require("ws");
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");
const http = require("http");
const { handleWebSocketConnection } = require("./services/webSocketService");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use("/api", uploadRoutes);

const wsServer = http.createServer();
const wss = new WebSocketServer({ server: wsServer });

const server = http.createServer(app);
server.listen(3000, () => {
  console.log("HTTP server started on port 3000");
});

wsServer.listen(3001, () => {
  console.log("WebSocket server started on port 3001");
});

wss.on("connection", handleWebSocketConnection);
