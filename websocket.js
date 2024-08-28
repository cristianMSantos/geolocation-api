const { Server } = require("socket.io");

const configureWebSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST"]
        },
        pingInterval: 25000, // Intervalo de tempo entre pings (default é 25000ms)
        pingTimeout: 60000, // Tempo de espera para um pong antes de desconectar (default é 5000ms)
        transports: ['websocket', 'polling']
    });

    io.on("connection", (socket) => {
        console.log("Cliente conectado");

        socket.on("locationUpdate", (data) => {
            console.log(`Received location update: ${data.latitude}, ${data.longitude} from ${data.deviceId}`);
            io.emit('locationBroadcast', data);
        });

        socket.on("disconnect", (e) => {
            console.log("Cliente desconectado");
            console.log(e);
        });
    });

    return io; // Retorna a instância do Socket.IO
};

module.exports = configureWebSocket;
