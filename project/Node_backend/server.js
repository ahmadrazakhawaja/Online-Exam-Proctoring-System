const express = require("express");
var socket = require("socket.io");
const app = express();

app.use(express.json());
// const port = 5000
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

const cors = require("cors");
app.use(cors());

const Routes = require("./routes");

app.use("/routes", Routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

var server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.use(express.static('public'));

var io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  // Handle chat event
  socket.on("chat", function (data) {
    console.log(data);
    io.sockets.emit("chat", data);
  });

  // Handle typing event
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
