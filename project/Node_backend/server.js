const express = require("express");
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
