const express = require('express');
const http = require('http');
const cors = require("cors");
const configureWebSocket = require('./websocket');

const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = configureWebSocket(httpServer)


const port = 5000;

httpServer.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});