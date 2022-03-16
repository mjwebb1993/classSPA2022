// 'Import' the Express module instead of http
const express = require("express");
// Initialize the Express application
const app = express();
// Get a port from .env - We use || to provide a default value
const PORT = process.env.PORT || 4040;

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
