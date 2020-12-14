//initializing the express 'sketch' object
let express = require("express");
let app = express();

app.use("/", express.static("public"));

//initialize the HTTP server
let http = require("http");
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("server is listening at port: " + port);
});

//initialize socket.io
let io = require("socket.io")();
io.listen(server);

let viewers = [];

//listening for users to connect
io.sockets.on("connection", (socket) => {
  console.log("mod socket connected : " + socket.id);
  viewers.push(socket.id);
  let viewerCount = viewers.length;

  io.sockets.emit("viewers", viewerCount);
});
