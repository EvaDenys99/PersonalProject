const express = require("express");
const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 8080;
const io = require("socket.io")(server);

const five = require("johnny-five");
const board = new five.Board({
  repl: false
});
const controller = "PCA9685";

board.on("ready", function() {
  console.log("Johnny-five connected");
  // Initialize the servo instances
  // Servo myServo1; // Front Left Pivot Servo
  const FLPServo = new five.Servo({
    controller,
    pin: 13
  });

  // Servo myServo2; // Front Left Lift Servo
  const FLLServo = new five.Servo({
    controller,
    pin: 15
  });

  // Servo myServo3; // Back Left Pivot Servo
  const BLPServo = new five.Servo({
    controller,
    pin: 3
  });
  // Servo myServo4; // Back Left Lift Servo
  const BLLServo = new five.Servo({
    controller,
    pin: 1
  });
  // Servo myServo5; // Back Right Pivot Servo
  const BRPServo = new five.Servo({
    controller,
    pin: 2
  });
  // Servo myServo6; // Back Right Lift Servo
  const BRLServo = new five.Servo({
    controller,
    pin: 0
  });
  // Servo myServo7; // Front Right Pivot Servo
  const FRPServo = new five.Servo({
    controller,
    pin: 12
  });
  // Servo myServo8; // Front Right Lift Servo
  const FRLServo = new five.Servo({
    controller,
    pin: 14
  });
  //
  const delay = t => new Promise(resolve => setTimeout(resolve, t));
  //centreer alle servos = zet alle angles op 90°
  const center_servos = () => {
    FLPServo.to(90);
    FLLServo.to(90);
    BLPServo.to(90);
    BLLServo.to(90);
    BRPServo.to(90);
    BRLServo.to(90);
    FRPServo.to(90);
    FRLServo.to(90);
  };
  //kantel nr links
  const lean_left = () => {
    FLLServo.to(15);
    BLLServo.to(15);
    BRLServo.to(150);
    FRLServo.to(150);
  };
  //kantel nr rechts
  const lean_right = () => {
    FLLServo.to(150);
    BLLServo.to(150);
    BRLServo.to(15);
    FRLServo.to(15);
  };
  //buiging maken
  const bowPart01 = () => {
    FLLServo.to(15);
    FRLServo.to(15);
  };
  const bowPart02 = () => {
    FLLServo.to(90);
    FRLServo.to(90);
  };
  const bow = () => {
    center_servos();
    delay(200).then(() => bowPart01());
    delay(900).then(() => bowPart02());
    delay(1600).then(() => console.log("bow done"));
  };
  //dansen
  const dance = () => {
    center_servos();
    delay(100).then(() => lean_left());
    delay(400).then(() => lean_right());
    delay(700).then(() => lean_left());
    delay(1000).then(() => lean_right());
    delay(1300).then(() => lean_left());
    delay(1600).then(() => lean_right());
    delay(1900).then(() => lean_left());
    delay(2700).then(() => center_servos());
    delay(3000).then(() => bow());
    center_servos();
    console.log("done dancing");
  };

  io.on("connection", function(socket) {
    //
    socket.on("forward", function(msg) {
      console.log("vooruit");
    });
    socket.on("backward", function(msg) {
      console.log("achteruit");
    });
    socket.on("left", function(msg) {
      console.log("links");
    });
    socket.on("right", function(msg) {
      console.log("rechts");
    });
    socket.on("bow", function(msg) {
      //console.log("buig");
      bow();
    });
    socket.on("dance", function(msg) {
      //console.log("dans");
      dance();
    });
    socket.on("wave", function(msg) {
      console.log("zwaai");
    });
    socket.on("lean_left", function(msg) {
      //console.log("lean left");
      lean_left();
    });
    socket.on("lean_right", function(msg) {
      //console.log("lean right");
      lean_right();
    });
    socket.on("center", function(msg) {
      //console.log("centreer alle servos");
      center_servos();
    });
  });
});

app.use(express.static("public"));

server.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
