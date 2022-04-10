const express = require("express");

const socket = require("socket.io");
const axios = require("axios");
const fs = require("fs");
// C:\Users\Hp\Desktop\Years\FYP\Fyp_group\Fyp_project\fyp_project\project\Node_backend>
// C:\Users\Hp\Desktop\Years\FYP\Fyp_group\Fyp_project\fyp_project\project\frontend\my-app>
const app = express();

// Store Images in Nodejs backend /images/userid/imagename and
// store its path in database which flask can then access.

// Store Images in S3 bucket () save img link in database and then flask will use that to access img

app.use(express.json());
// const port = 5000
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

const cors = require("cors");
app.use(cors());

const Routes = require("./routes");
const roomRoutes = require("./roomRoutes");

app.use("/routes", Routes);
// app.use("/routes", Flask);
app.use("/roomRoutes", roomRoutes);

app.get("/test1", async (req, res) => {
  console.log("Pycheck Checks out");

  let url = "http://127.0.0.1:5000/Pycheck";
  await axios({
    method: "get",
    url,
    auth: {
      username: "the_username",
      password: "the_password",
    },
  })
    .then(function (response) {
      returners = response.data;
      // res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error, "problem here");
    });

  res.status(200).json({ msg: "Working", returners });
});

app.get("/image/:imgName", async (req, res) => {
  console.log("Pycheck Checks out");
  let url = "http://127.0.0.1:5000/Pycheck";
  var imgdata;
  fs.readFile("C:/Users/Hp/Desktop/demo_image.jpg", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    imgdata = data;
  });

  await axios({
    method: "post",
    url,
    headers: {
      "Content-Type": imageFile.type,
    },
    data: {
      imgdata,
    },
    auth: {
      username: "the_username",
      password: "the_password",
    },
  })
    .then(function (response) {
      returners = response.data;
      // res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error, "problem here");
    });

  res.status(200).json({ msg: "Working", returners });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

var server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.use(express.static('public'));

let connectedUser = [];
let connectUser = {};

function checkroom(data, room) {
  let tmp = null;
  for (let i = 0; i < data.length; i++) {
    tmp = data[i];
    if (tmp.room_id === room) {
      return i;
    }
  }
  return -1;
}

function writeFile(data, room) {
  fs.writeFile(`log_files/${room}`, content, { flag: "a" }, (err) => {});
}

let io = socket(server, {
  cors: {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
  },
});

const { protect2 } = require("./middleware/auth_socket");

// middleware
io.use((socket, next) => protect2(socket, next)).on(
  "connection",
  async (socket) => {
    console.log("made socket connection", socket.id);

    const user = socket.user;
    const room = socket.room;
    // joined room
    socket.join(room._id.toString());

    // write into the log_file
    let date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");

    content = `${date} : ${user._id.toString()} : ${user.first_name} ${
      user.last_name
    } joined the room.\n`;

    writeFile(content, room._id.toString());

    // check whether the admin is already connected
    let datax = checkroom(connectedUser, room._id.toString());

    if (user._id.toString() === room.adminID.toString()) {
      if (datax === -1) {
        connectUser = {
          user_id: user._id.toString(),
          room_id: room._id.toString(),
          socket_id: socket.id,
        };
        connectedUser.push(connectUser);

        // emit admin socket_id to client
        // socket.to(room._id.toString()).emit("get-id", socket.id);
      } else {
        connectedUser[datax].socket_id = socket.id;
        // console.log(connectedUser);
        // socket.to(room._id.toString()).emit("get-id", socket.id);
      }
      socket.to(room._id.toString()).emit("restart");
    }
    // else {
    //   // emit client socket id to itself
    //   socket.emit("me", socket.id);
    // }

    // calluser listener
    // socket.on("callUser", (data) => {
    //   console.log(data.from, data.user_id, data.name);
    //   io.to(data.userToCall).emit("callUser", {
    //     signal: data.signalData,
    //     from: data.from,
    //     user_id: data.user_id,
    //     name: data.name,
    //   });
    // });

    socket.on("callUser", (data) => {
      // console.log(data.from, data.user_id, data.name);
      console.log(
        "call user",
        socket.id,
        user._id.toString(),
        `${user.first_name} ${user.last_name}`
      );
      datax = checkroom(connectedUser, room._id.toString());

      if (datax !== -1) {
        io.to(connectedUser[datax].socket_id).emit("callUser", {
          signal: data.signalData,
          from: socket.id,
          user_id: user._id.toString(),
          name: `${user.first_name} ${user.last_name}`,
        });
      }
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("disconnect", (reason) => {
      // console.log("disconnect");
      // socket.broadcast.emit("callEnded");
      content = `${date} : ${user._id.toString()} : ${user.first_name} ${
        user.last_name
      } disconnected the room.\n`;

      writeFile(content, room._id.toString());

      datax = checkroom(connectedUser, room._id.toString());
      console.log(
        "disconnect",
        reason,
        user._id.toString(),
        room.adminID.toString(),
        socket.id
      );
      if (user._id.toString() === room.adminID.toString()) {
        console.log("enter null");
        // console.log(connectedUser);
        connectedUser.splice(datax, 1);
        // console.log(connectedUser);
      } else {
        if (connectedUser[datax] && connectedUser[datax].socket_id !== null) {
          io.to(connectedUser[datax].socket_id).emit(
            "disconnectx",
            user._id.toString()
          );
        }
      }
    });

    // console.log(io.sockets.adapter.rooms.get(room._id.toString()).size);
    // Handle chat event
    socket.on("chat", function (data) {
      console.log(data);
      io.sockets.emit("chat", data);
    });

    socket.on("media-data", async function (data) {
      // console.log(data);
      // console.log(connectedUser[0].socket_id, connectedUser[0].user_id);
      // console.log(data);
      // fs.writeFile(
      //   `image_files/${user._id.toString()}.jpeg`,
      //   data,
      //   { flag: "w" },
      //   (err) => {}
      // );
      let url = "http://127.0.0.1:4000/PyImg";
      await axios({
        method: "post",
        url,
        data: {
          image_string: data,
          id: user._id.toString(),
        },
      })
        .then(function (response) {
          // returners = response.data;
          console.log("response", response.data);
          datax = checkroom(connectedUser, room._id.toString());
          if (datax !== -1) {
            io.to(connectedUser[datax].socket_id).emit(
              "facial-response",
              response.data,
              user._id.toString()
            );
          }
          // res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error, "problem here");
        });

      // socket.to(connectUser.socket_id).emit("recieve-data", data);
    });

    // Handle typing event
    socket.on("typing", function (data) {
      socket.broadcast.emit("typing", data);
    });
  }
);
