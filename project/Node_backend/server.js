const express = require("express");
const FormData = require("form-data");
const mail = require("./mail");
const socket = require("socket.io");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
// C:\Users\Hp\Desktop\Years\FYP\Fyp_group\Fyp_project\fyp_project\project\Node_backend>
// C:\Users\Hp\Desktop\Years\FYP\Fyp_group\Fyp_project\fyp_project\project\frontend\my-app>
const app = express();

// Store Images in Nodejs backend /images/userid/imagename and
// store its path in database which flask can then access.

// Store Images in S3 bucket () save img link in database and then flask will use that to access img
const path = require('path');
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

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
  fs.writeFile(`log_files/${room}.txt`, content, { flag: "a" }, (err) => {});
}

let io = socket(server, {
  cors: {
    origin: [process.env.Frontend_url, process.env.Frontend_ip],
  },
});

const { protect2 } = require("./middleware/auth_socket");

// middleware
io.use((socket, next) => protect2(socket, next, io)).on(
  "connection",
  async (socket) => {
    console.log("made socket connection", socket.id);

    const user = socket.user;
    const room = socket.room;
    // joined room
    // socket.join(room._id.toString());

    // write into the log_file
    let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });

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
          rollNum: `${user.rollNum}`
        });
      }
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("disconnect", (reason) => {
      // console.log("disconnect");
      // socket.broadcast.emit("callEnded");
      
      
      if(fs.existsSync(`log_files/${room._id.toString()}.txt`)){
      let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
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
          user._id.toString(),
          user.first_name+' '+user.last_name
        );
        let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
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

      let url = process.env.Flask_url + "/PyAudio";
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
              user._id.toString(),
              user.first_name+' '+user.last_name
            );
            let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
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

    socket.on("setting", (data) => {
      console.log(data);
      datax = checkroom(connectedUser, room._id.toString());
      if (connectedUser[datax].user_id === user._id.toString()) {
        const Room = room;

        if (
          data["facial-detection"] !==
          Room.facialDetection[Room.facialDetection.length - 1]
        ) {
          Room.facialDetection.push(data["facial-detection"]);
        }
        if (
          data["audio-detection"] !==
          Room.audioDetection[Room.audioDetection.length - 1]
        ) {
          Room.audioDetection.push(data["audio-detection"]);
        }
        if (
          data["browser"] !==
          Room.browserTracking[Room.browserTracking.length - 1]
        ) {
          Room.browserTracking.push(data["browser"]);
        }
        if (
          parseInt(data["candidate-limit"]) !==
          parseInt(Room.candidateLimit[Room.candidateLimit.length - 1])
        ) {
          Room.candidateLimit.push(data["candidate-limit"]);
        }
        if (data["file-upload"][0]) {
          let fileExt = data["name"].split(".").pop();
          let filename = data["name"].split(".")[0];
          console.log(fileExt, filename);
          console.log(data["file-upload"][0]);

          fs.writeFileSync(
            `question_papers/${data["name"]}`,
            data["file-upload"][0],
            { flag: "w" },
            (err) => {
              console.log(err);
            }
          );

          const form = new FormData();
          form.append(
            "document",
            fs.createReadStream(`question_papers/${data["name"]}`)
          );
          // console.log(path.extname(req.file.originalname));
          form.append("room", room._id.toString());
          form.append("file-type", "." + fileExt);
          const formHeaders = form.getHeaders();
          const url = process.env.Flask_url + "/PyDocument";
          axios
            .post(url, form, {
              headers: {
                ...formHeaders,
              },
            })
            .then(function (response) {
              // returners = response.data;
              console.log("response-document", response.data);
            })
            .catch(function (error) {
              // console.log(error, "problem here");
              console.log("problem with document upload");
              er = true;
            });
          fs.rm(`question_papers/${data["name"]}`, (err) => {
            console.log(err);
          });
          Room.textFile = data["name"];
        }
        console.log(Room);
        Room.save().then(() => {
          const Room2 = {};
        (Room2.adminID = user._id.toString()),
          (Room2.facialDetection = data["facial-detection"]);
        Room2.audioDetection = data["audio-detection"];
        Room2.browserTracking = data["browser"];
        Room2.candidateLimit = data["candidate-limit"];
        console.log('file namee check' ,data["name"],room.textFile);
        (Room2.textFile = data["name"] || room.textFile),
          (Room2._id = room._id.toString());
        
        io.to(connectedUser[datax].socket_id).emit("setting-set", Room2);
        socket
          .to(room._id.toString())
          .emit(
            "monitor",
            data["facial-detection"],
            data["audio-detection"],
            data["browser"]
          );

          let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
            content = `${date} : ${user._id.toString()} : ${user.first_name} ${
              user.last_name
            } Settings have been changed : facial: ${data["facial-detection"]}, audio:${data["audio-detection"]}, browser:${data["browser"]}.\n`;

            writeFile(content, room._id.toString());
            io.to(connectedUser[datax].socket_id).emit("logging", content);
        });
        
      }
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

      let url = process.env.Flask_url+"/PyImg";
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
              user._id.toString(),
              user.first_name+' '+user.last_name
            );
            let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
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
      let url = process.env.Flask_url+"/PyVerify";
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

          let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
            content = `${date} : ${user._id.toString()} : ${user.first_name} ${
              user.last_name
            } user verification : ${response.data}. \n`;

            writeFile(content, room._id.toString());
            io.to(connectedUser[datax].socket_id).emit("logging", content);

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

    socket.on('remove-client', (id,name) => {
      socket.to(room._id.toString()).emit('remove-user',id);
      let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
            content = `${date} : ${id} : ${name} has been removed from the room.\n`;
            writeFile(content,room._id.toString());
            io.to(socket.id).emit("logging", content);
    });

    socket.on("end-exam", () => {
      if (user._id.toString() === room.adminID.toString()) {
        const room2 = room;
        room2.ended = true;
        room2.save().then(() => {
          io.to(room._id.toString()).emit("room-end", true);
          datax = checkroom(connectedUser, room._id.toString());
          connectedUser.splice(datax, 1);

          let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
            content = `${date} : ${user._id.toString()} : ${user.first_name} ${
              user.last_name
            } Room has been ended by Admin.\n`;
            writeFile(content,room._id.toString());
            io.to(socket.id).emit("logging", content);
          
          mail.sendConfirmationEmail(
            user.first_name,
            user.email,
            room._id.toString(),
            "log_file"
          )


          axios.post(process.env.Flask_url + '/DeleteDocument',{
            id: room._id.toString()
          });

            

            

            
         
          
          
        });
        
        // .then(() => {
        //   fs.rmSync(`log_files/${room._id.toString()}.txt`, (err) => {
        //       console.log(err);
        //     });
        // })
      }
    });

    socket.on('tag-admin', (id,name,data) => {
      let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
            content = `${date} : ${id} : ${name} has been ${data} by the admin.\n`;
            writeFile(content,room._id.toString());
            io.to(socket.id).emit("logging", content);
    });

    socket.on('tag-system', (id,name) => {
      let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
            content = `${date} : ${id} : ${name} has been tagged by the System.\n`;
            writeFile(content,room._id.toString());
            io.to(socket.id).emit("logging", content);
    });

    // Handle typing event
    socket.on("typing", function (data) {
      socket.broadcast.emit("typing", data);
    });
  }
);

// https://ec2-35-172-200-95.compute-1.amazonaws.com:3000
