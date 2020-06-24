const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')

// CORS = Cross-Origin Resource Sharing
const cors = require('cors');



const app = express();

mongoose.connect(
  "mongodb+srv://findadev:findadev@findadev-wmsph.mongodb.net/findadevdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Cors is letting our API be accessible by React
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333);

