const express = require("express");
const FormData = require("form-data");

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
    } else {
      if (datax !== -1) {
        if (connectedUser[datax] && connectedUser[datax].socket_id !== null) {
          io.to(connectedUser[datax].socket_id).emit("logging", content);
        }
      }
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
      let date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
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
          io.to(connectedUser[datax].socket_id).emit("logging", content);
        }
      }
    });

    // console.log(io.sockets.adapter.rooms.get(room._id.toString()).size);
    // Handle chat event
    socket.on("chat", function (data) {
      console.log(data);
      io.sockets.emit("chat", data);
    });

    socket.on("browser-track", function (data) {
      datax = checkroom(connectedUser, room._id.toString());
      if (connectedUser[datax]) {
        io.to(connectedUser[datax].socket_id).emit(
          "browser-track",
          data,
          user._id.toString()
        );
        let date = new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "");
        content = `${date} : ${user._id.toString()} : ${user.first_name} ${
          user.last_name
        } browser Tracking: ${data}.\n`;

        writeFile(content, room._id.toString());

        io.to(connectedUser[datax].socket_id).emit("logging", content);
      }
    });

    socket.on("audio", async function (data) {
      console.log(data);

      // let config = {
      //   header: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // };

      fs.writeFileSync(
        `audio_files/${user._id.toString()}.m4a`,
        data,
        { flag: "w" },
        (err) => {
          console.log(err);
        }
      );

      const form = new FormData();
      form.append(
        "audio",
        fs.createReadStream(`audio_files/${user._id.toString()}.m4a`)
      );
      form.append("text", user._id.toString());
      form.append("id", room._id.toString());
      const formHeaders = form.getHeaders();

      console.log(data, form);

      let url = "http://127.0.0.1:4000/PyAudio";
      // await axios({
      //   method: "post",
      //   url: url,
      //   data: form,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // })
      await axios
        .post(url, form, {
          headers: {
            ...formHeaders,
          },
        })
        .then(function (response) {
          // returners = response.data;
          console.log("response", response.data);
          datax = checkroom(connectedUser, room._id.toString());
          if (datax !== -1) {
            io.to(connectedUser[datax].socket_id).emit(
              "Audio-response",
              response.data,
              user._id.toString()
            );
            io.to(connectedUser[datax].socket_id).emit(
              "Audio-response",
              response.data,
              user._id.toString()
            );
            let date = new Date()
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, "");
            content = `${date} : ${user._id.toString()} : ${user.first_name} ${
              user.last_name
            } Audio Tracking: ${response.data}.\n`;
            writeFile(content, room._id.toString());
            io.to(connectedUser[datax].socket_id).emit(
              "logging",
              content,
              user._id.toString()
            );
          }
          // res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
          // console.log(error, "problem here");
          console.log("problem with facial detection");
        });
      fs.rm(`audio_files/${user._id.toString()}.m4a`, (err) => {
        console.log(err);
      });
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
      // let config = {
      //   header: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // };
      fs.writeFileSync(
        `image_files/${user._id.toString()}.jpg`,
        data,
        { flag: "w" },
        (err) => {
          console.log(err);
        }
      );

      const form = new FormData();
      form.append(
        "image",
        fs.createReadStream(`image_files/${user._id.toString()}.jpg`)
      );
      form.append("text", user._id.toString());
      const formHeaders = form.getHeaders();

      let url = "http://127.0.0.1:4000/PyImg";
      await axios
        .post(url, form, {
          headers: {
            ...formHeaders,
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
            let date = new Date()
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, "");
            content = `${date} : ${user._id.toString()} : ${user.first_name} ${
              user.last_name
            } Facial Tracking: ${parseInt(response.data * 100)}%.\n`;

            writeFile(content, room._id.toString());

            io.to(connectedUser[datax].socket_id).emit("logging", content);
          }
          // res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
          // console.log(error, "problem here");
          console.log("problem with facial detection");
        });
      fs.rm(`image_files/${user._id.toString()}.jpg`, (err) => {
        console.log(err);
      });

      // socket.to(connectUser.socket_id).emit("recieve-data", data);
    });

    socket.on("media-verify", async function (data) {
      // console.log(data);
      // console.log(connectedUser[0].socket_id, connectedUser[0].user_id);
      // console.log(data);
      // fs.writeFile(
      //   `image_files/${user._id.toString()}.jpeg`,
      //   data,
      //   { flag: "w" },
      //   (err) => {}
      // );
      datax = checkroom(connectedUser, room._id.toString());
      // let config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // };
      fs.writeFileSync(
        `image_files/${user._id.toString()}.jpg`,
        data,
        { flag: "w" },
        (err) => {
          console.log(err);
        }
      );
      const form = new FormData();
      // form.append("image", Buffer.from(data));

      form.append(
        "image",
        fs.createReadStream(`image_files/${user._id.toString()}.jpg`)
      );
      form.append("text", user._id.toString());
      console.log(user.profileUrl);
      if (user.profileUrl.length === 0) {
        io.to(socket.id).emit(
          "media-verified",
          "Please upload images first for verification.",
          user._id.toString()
        );
      }
      for (let i = 0; i < user.profileUrl.length; i++) {
        form.append(`url${i}`, user.profileUrl[i]);
      }
      // const formHeaders = form.getHeaders();
      // if (user.profileUrl && user.profileUrl.length > 0) {
      //   form.append("url", JSON.stringify(user.profileUrl));
      // } else {
      //   io.to(connectedUser[datax].socket_id).emit("logging", "error");
      // }

      // console.log(data, form, {
      //   headers: {
      //     ...formHeaders,
      //   },
      // });

      // form.submit(
      //   {
      //     host: "127.0.0.1:4000",
      //     path: "/PyImg",
      //     headers: { "Content-Type": "multipart/form-data" },
      //   },
      //   function (err, res) {
      //     // console.log(res.statusCode);
      //   }
      // );
      const formHeaders = form.getHeaders();
      let url = "http://127.0.0.1:4000/PyVerify";
      await axios
        .post(url, form, {
          headers: {
            ...formHeaders,
          },
        })
        .then(function (response) {
          // returners = response.data;
          console.log("response", response.data);

          io.to(socket.id).emit(
            "media-verified",
            response.data,
            user._id.toString()
          );

          // res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
          // console.log(error, "problem here");
          console.log("problem with facial detection");
        });

      // socket.to(connectUser.socket_id).emit("recieve-data", data);
      fs.rm(`image_files/${user._id.toString()}.jpg`, (err) => {
        console.log(err);
      });
    });

    // Handle typing event
    socket.on("typing", function (data) {
      socket.broadcast.emit("typing", data);
    });
  }
);
