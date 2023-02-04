// DEPENDENCIES
const express = require("express");
const cors = require("cors");
// CONFIGURATION


// MIDDLEWARE
const app = express();
app.use(cors({  origin: "*" }));
app.use(express.json());

// ROUTES
app.use('/snacks', require('./controllers/snackController'));
app.use(express.static("./frontend/build"));

app.get('/', (req, res) => {
  res.send("here is the root.");
});

app.get('*', (req, res) => {
  console.log(req.url)
  res.status(404).send("page not found!");
});

app.use((err, req, res, next) => {
  res.status(500).send(err)
})
// EXPORT

module.exports = app;