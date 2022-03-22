const express = require("express");
const socket = require('socket.io');
const axios = require('axios');
const fs = require('fs');
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
  console.log("Pycheck Checks out")

  let url = 'http://127.0.0.1:5000/Pycheck';
  await axios({
    method: 'get',
    url,
    auth: {
      username: 'the_username',
      password: 'the_password'
    }
  }).then(function (response) {
    returners = response.data;
    // res.send(JSON.stringify(response.data));
  }).catch(function (error) {
    console.log(error, "problem here");
  });


  res.status(200).json({ msg: "Working", returners })
})

app.get("/image/:imgName", async (req, res) => {
  console.log("Pycheck Checks out")
  let url = 'http://127.0.0.1:5000/Pycheck';
  var imgdata;
  fs.readFile('C:/Users/Hp/Desktop/demo_image.jpg', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
    imgdata = data
  })

  await axios({
    method: 'post',
    url,
    headers: {
      'Content-Type': imageFile.type
    },
    data: {
      imgdata
    },
    auth: {
      username: 'the_username',
      password: 'the_password'
    }
  }).then(function (response) {
    returners = response.data;
    // res.send(JSON.stringify(response.data));
  }).catch(function (error) {
    console.log(error, "problem here");
  });


  res.status(200).json({ msg: "Working", returners })
})

app.get("/", (req, res) => {
  res.send("Hello World");
});

var server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.use(express.static('public'));

var io = socket(server);
io.on('connection', (socket) => {

  console.log('made socket connection', socket.id);

  // Handle chat event
  socket.on('chat', function (data) {
    // console.log(data);
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });

});