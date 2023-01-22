const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();
const cors = require("cors");
const router = require("./routes/authRouter");
var bodyParser = require("body-parser");

var whitelist = [
  "http://localhost:4200",
  "localhost:8000",
  "https://wolken-reiter.netlify.app",
];
var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  },
};

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));
app.use("/", router);

function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}.`);
    });
  } catch (e) {
    console.error(e);
  }
}

start();
