// 'Import' the Express module instead of http
const express = require("express");
// Require mongoose for accessing mongoDB
const mongoose = require("mongoose");
// Require dotenv to load environment variables
const dotenv = require("dotenv");

// Require models
const pizzas = require("./routers/pizzas");


dotenv.config();

// Initialize the Express application
const app = express();
// Get a port from .env - We use || to provide a default value
const PORT = process.env.PORT || 4040;

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

// =======================
// HERE GOES MIDDLEWARE
// =======================

// Logging all calls to our server
const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

// tell the app to use the middleware
app.use(express.json());
app.use(logging);

// Use Routers
app.use("/pizzas", pizzas);

// Handle the request with HTTP GET method
//  from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(JSON.stringify({ message: "Service healthy" }));
});

app.get("/", (request, response) => {
  response
    .status(418)
    .json({ message: "No Resource Found Here, Please see instructions" });
});

app.post("/", (request, response) => {
  const body = request.body;
  body.date = Date.now();
  response.json(body);
});

// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
