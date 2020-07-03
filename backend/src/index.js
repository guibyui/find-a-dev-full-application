const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const http = require("http");
const { setupWebsocket } = require("./websocket");

// CORS = Cross-Origin Resource Sharing
const cors = require("cors");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

app.use(express.json());

mongoose.connect(
  "mongodb+srv://findadev:findadev@findadev-wmsph.mongodb.net/findadevdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  }
);

// Cors is letting our API be accessible by React
app.use(cors());

app.use(routes);

server.listen(3333);

// .use is valid to all application routes.
