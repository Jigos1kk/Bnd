import { createServer } from "node:http"
import { Server } from "socket.io"
import "dotenv/config"

const http = createServer()
const PORT = process.env.PORT || 21024;
const io = new Server(http, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
  console.log("Пользователь подключился:", socket.id);

  socket.on("ping", () => {
    console.log(123);
    
    socket.emit("pong", "Ping Pong!")
  })
});

http.listen(PORT, () => {
    console.log(`Server started! ${PORT}`);
})