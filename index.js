const express = require("express");
const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 5000;
const io = require("socket.io")(server);

const five = require("johnny-five");
const board = new five.Board({
  repl: false
});
const controller = "PCA9685";

// calibration
let da = -12, // Left Front Pivot
  db = 10, // Left Back Pivot
  dc = -18, // Right Back Pivot
  dd = 12; // Right Front Pivot

// servo initial positions + calibration
let a90 = 90 + da,
  a120 = 120 + da,
  a150 = 150 + da,
  a180 = 180 + da;

let b0 = 0 + db,
  b30 = 30 + db,
  b60 = 60 + db,
  b90 = 90 + db;

let c90 = 90 + dc,
  c120 = 120 + dc,
  c150 = 150 + dc,
  c180 = 180 + dc;

let d0 = 0 + dd,
  d30 = 30 + dd,
  d60 = 60 + dd,
  d90 = 90 + dd;

// start polets for servo
let s11 = 90; // Front Left Pivot Servo
let s12 = 90; // Front Left Lift Servo
let s21 = 90; // Back Left Pivot Servo
let s22 = 90; // Back Left Lift Servo
let s31 = 90; // Back Right Pivot Servo
let s32 = 90; // Back Right Lift Servo
let s41 = 90; // Front Right Pivot Servo
let s42 = 90; // Front Right Lift Servo

let spd = 30; // Speed of walking motion, larger the number, the slower the speed
let high = 0; // How high the robot is standing

let goingForward = false;
let goingBackward = false;
let goingRight = false;
let goingLeft = false;

//camera buttons
// const btnCameraLeft = document.querySelector("#camera_left");
// const btnCameraRight = document.querySelector("#camera_right");

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
  // Servo camera
  const CRServo = new five.Servo({
    controller,
    range: [55, 120],
    pin: 11
  });
  //
  const delay = t => new Promise(resolve => setTimeout(resolve, t));
  //centreer alle servos = zet alle angles op 90°
  const center_servos = () => {
    FLPServo.to(90);
    FLLServo.to(100);
    BLPServo.to(90);
    BLLServo.to(90);
    BRPServo.to(90);
    BRLServo.to(90);
    FRPServo.to(90);
    FRLServo.to(90);

    s11 = 90; // Front Left Pivot Servo
    s12 = 90; // Front Left Lift Servo
    s21 = 90; // Back Left Pivot Servo
    s22 = 90; // Back Left Lift Servo
    s31 = 90; // Back Right Pivot Servo
    s32 = 90; // Back Right Lift Servo
    s41 = 90; // Front Right Pivot Servo
    s42 = 90; // Front Right Lift Servo
  };
  //kantel nr links
  const lean_left = () => {
    FLLServo.to(15);
    BLLServo.to(15);
    BRLServo.to(150);
    FRLServo.to(150);
  };
  const trim_left = () => {
    da--; // Left Front Pivot
    db--; // Left Back Pivot
    dc--; // Right Back Pivot
    dd--; // Right Front Pivot
    console.log("trim");
  };
  //kantel nr rechts
  const lean_right = () => {
    FLLServo.to(150);
    BLLServo.to(150);
    BRLServo.to(15);
    FRLServo.to(15);
  };
  const trim_right = () => {
    da++; // Left Front Pivot
    db++; // Left Back Pivot
    dc++; // Right Back Pivot
    dd++; // Right Front Pivot
  };
  //buiging maken
  const bow = async () => {
    center_servos();
    await delay(200);
    FLLServo.to(15);
    FRLServo.to(15);
    await delay(700);
    FLLServo.to(100);
    FRLServo.to(90);
    await delay(700);
    console.log("bow done");
  };
  //dansen
  const dance = async () => {
    center_servos();
    await delay(100);
    lean_left();
    await delay(300);
    lean_right();
    await delay(300);
    lean_left();
    await delay(300);
    lean_right();
    await delay(300);
    lean_left();
    await delay(300);
    lean_right();
    await delay(300);
    lean_left();
    await delay(300);
    lean_right();
    await delay(800);
    center_servos();
    await delay(300);
    bow();
    center_servos();
    console.log("done dancing");
  };
  //wave
  const wave = async () => {
    FLPServo.to(55);
    FLLServo.to(100);
    BLPServo.to(90);
    BLLServo.to(45);
    BRPServo.to(90);
    BRLServo.to(45);
    FRPServo.to(90);
    FRLServo.to(90);

    await delay(200);
    FRLServo.to(0);
    await delay(200);
    FRPServo.to(180);
    await delay(200);
    FRPServo.to(30);
    await delay(300);
    FRPServo.to(180);
    await delay(300);
    FRPServo.to(30);
    await delay(300);
    FRPServo.to(s41);
    await delay(300);
    FRLServo.to(s42);
    await delay(200);
    bow();
    center_servos();
  };
  //1 stap vooruit
  const forward = () => {
    // calculation of points
    // Left Front Pivot
    (a90 = 90 + da), (a120 = 120 + da), (a150 = 150 + da), (a180 = 180 + da);

    // Left Back Pivot
    (b0 = 0 + db), (b30 = 30 + db), (b60 = 60 + db), (b90 = 90 + db);

    // Right Back Pivot
    (c90 = 90 + dc), (c120 = 120 + dc), (c150 = 150 + dc), (c180 = 180 + dc);

    // Right Front Pivot
    (d0 = 0 + dd), (d30 = 30 + dd), (d60 = 60 + dd), (d90 = 90 + dd);

    // set servo positions and speeds needed to walk forward one step
    // (LFP,  LBP, RBP,  RFP, LFL, LBL, RBL, RFL, S1, S2, S3, S4)
    srv(a180, b0, c120, d60, 42, 40, 33, 42, 1, 3, 1, 1);
    srv(a90, b30, c90, d30, 6, 40, 33, 42, 3, 1, 1, 1);
    srv(a90, b30, c90, d30, 42, 40, 33, 42, 3, 1, 1, 1);
    srv(a120, b60, c180, d0, 42, 40, 6, 42, 1, 1, 3, 1);
    srv(a120, b60, c180, d0, 42, 40, 33, 42, 1, 1, 3, 1);
    srv(a150, b90, c150, d90, 42, 40, 33, 6, 1, 1, 1, 3);
    srv(a150, b90, c150, d90, 42, 40, 33, 42, 1, 1, 1, 3);
    srv(a180, b0, c120, d60, 42, 40, 33, 42, 1, 3, 1, 1);
    srv(a180, b0, c120, d60, 42, 40, 33, 42, 1, 3, 1, 1);
    // center_servos();
    console.log("lopen");
  };
  //1 stap achteruit
  const backward = () => {
    // set servo positions and speeds needed to walk backward one step
    // (LFP,  LBP, RBP,  RFP, LFL, LBL, RBL, RFL, S1, S2, S3, S4)
    srv(180, 0, 120, 60, 42, 33, 33, 42, 3, 1, 1, 1);
    srv(150, 90, 150, 90, 42, 18, 33, 42, 1, 3, 1, 1);
    srv(150, 90, 150, 90, 42, 33, 33, 42, 1, 3, 1, 1);
    srv(120, 60, 180, 0, 42, 33, 33, 6, 1, 1, 1, 3);
    srv(120, 60, 180, 0, 42, 33, 33, 42, 1, 1, 1, 3);
    srv(90, 30, 90, 30, 42, 33, 18, 42, 1, 1, 3, 1);
    srv(90, 30, 90, 30, 42, 33, 33, 42, 1, 1, 3, 1);
    srv(180, 0, 120, 60, 6, 33, 33, 42, 3, 1, 1, 1);
  };
  //1 stap naar links
  const turn_left = () => {
    // set servo positions and speeds needed to turn left one step
    // (LFP,  LBP, RBP,  RFP, LFL, LBL, RBL, RFL, S1, S2, S3, S4)
    srv(150, 90, 90, 30, 42, 6, 33, 42, 1, 3, 1, 1);
    srv(150, 90, 90, 30, 42, 33, 33, 42, 1, 3, 1, 1);
    srv(120, 60, 180, 0, 42, 33, 6, 42, 1, 1, 3, 1);
    srv(120, 60, 180, 0, 42, 33, 33, 24, 1, 1, 3, 1);
    srv(90, 30, 150, 90, 42, 33, 33, 6, 1, 1, 1, 3);
    srv(90, 30, 150, 90, 42, 33, 33, 42, 1, 1, 1, 3);
    srv(180, 0, 120, 60, 6, 33, 33, 42, 3, 1, 1, 1);
    srv(180, 0, 120, 60, 42, 33, 33, 33, 3, 1, 1, 1);
  };
  //1stap naar rechts
  const turn_right = () => {
    // set servo positions and speeds needed to turn right one step
    // (LFP,  LBP, RBP,  RFP, LFL, LBL, RBL, RFL, S1, S2, S3, S4)
    srv(90, 30, 150, 90, 6, 33, 33, 42, 3, 1, 1, 1);
    srv(90, 30, 150, 90, 42, 33, 33, 42, 3, 1, 1, 1);
    srv(120, 60, 180, 0, 42, 33, 33, 6, 1, 1, 1, 3);
    srv(120, 60, 180, 0, 42, 33, 33, 42, 1, 1, 1, 3);
    srv(150, 90, 90, 30, 42, 33, 6, 42, 1, 1, 3, 1);
    srv(150, 90, 90, 30, 42, 33, 33, 42, 1, 1, 3, 1);
    srv(180, 0, 120, 60, 42, 6, 33, 42, 1, 3, 1, 1);
    srv(180, 0, 120, 60, 42, 33, 33, 42, 1, 3, 1, 1);
  };
  //snelheid verhogen
  const increase_speed = () => {
    if (spd > 3) {
      spd--;
    }
  };
  //snelheid verlagen
  const decrease_speed = () => {
    if (spd < 50) {
      spd++;
    }
  };
  //in rust
  const rust = () => {
    FLPServo.to(90);
    FLLServo.to(0);
    BLPServo.to(90);
    BLLServo.to(0);
    BRPServo.to(90);
    BRLServo.to(0);
    FRPServo.to(90);
    FRLServo.to(0);
  };

  const srv = async (
    p11,
    p21,
    p31,
    p41,
    p12,
    p22,
    p32,
    p42,
    sp1,
    sp2,
    sp3,
    sp4
  ) => {
    // p11: Front Left Pivot Servo
    // p21: Back Left Pivot Servo
    // p31: Back Right Pivot Servo
    // p41: Front Right Pivot Servo
    // p12: Front Left Lift Servo
    // p22: Back Left Lift Servo
    // p32: Back Right Lift Servo
    // p42: Front Right Lift Servo
    // sp1: Speed 1
    // sp2: Speed 2
    // sp3: Speed 3
    // sp4: Speed 4

    // // Multiply lift servo positions by manual height adjustment
    // p12 = p12 + high * 3;
    // p22 = p22 + high * 3;
    // p32 = p32 + high * 3;
    // p42 = p42 + high * 3;
    while (
      s11 != p11 ||
      s21 != p21 ||
      s31 != p31 ||
      s41 != p41 ||
      s12 != p12 ||
      s22 != p22 ||
      s32 != p32 ||
      s42 != p42
    ) {
      // Front Left Pivot Servo
      if (s11 < p11) {
        // if servo position is less than programmed position
        if (s11 + sp1 <= p11) {
          s11 = s11 + sp1;
        } else {
          s11 = p11;
        } // set servo position equal to servo position plus speed constant
      }

      if (s11 > p11) {
        // if servo position is greater than programmed position
        if (s11 - sp1 >= p11) {
          s11 = s11 - sp1;
        } else {
          s11 = p11;
        } // set servo position equal to servo position minus speed constant
      }

      // Back Left Pivot Servo
      if (s21 < p21) {
        if (s21 + sp2 <= p21) {
          s21 = s21 + sp2;
        } else {
          s21 = p21;
        }
      }

      if (s21 > p21) {
        if (s21 - sp2 >= p21) {
          s21 = s21 - sp2;
        } else {
          s21 = p21;
        }
      }

      // Back Right Pivot Servo
      if (s31 < p31) {
        if (s31 + sp3 <= p31) {
          s31 = s31 + sp3;
        } else {
          s31 = p31;
        }
      }

      if (s31 > p31) {
        if (s31 - sp3 >= p31) {
          s31 = s31 - sp3;
        } else {
          s31 = p31;
        }
      }

      // Front Right Pivot Servo
      if (s41 < p41) {
        if (s41 + sp4 <= p41) {
          s41 = s41 + sp4;
        } else {
          s41 = p41;
        }
      }

      if (s41 > p41) {
        if (s41 - sp4 >= p41) {
          s41 = s41 - sp4;
        } else {
          s41 = p41;
        }
      }

      // Front Left Lift Servo
      if (s12 < p12) {
        if (s12 + sp1 <= p12) {
          s12 = s12 + sp1;
        } else {
          s12 = p12;
        }
      }

      if (s12 > p12) {
        if (s12 - sp1 >= p12) {
          s12 = s12 - sp1;
        } else {
          s12 = p12;
        }
      }

      // Back Left Lift Servo
      if (s22 < p22) {
        if (s22 + sp2 <= p22) {
          s22 = s22 + sp2;
        } else {
          s22 = p22;
        }
      }

      if (s22 > p22) {
        if (s22 - sp2 >= p22) {
          s22 = s22 - sp2;
        } else {
          s22 = p22;
        }
      }

      // Back Right Lift Servo
      if (s32 < p32) {
        if (s32 + sp3 <= p32) {
          s32 = s32 + sp3;
        } else {
          s32 = p32;
        }
      }

      if (s32 > p32) {
        if (s32 - sp3 >= p32) {
          s32 = s32 - sp3;
        } else {
          s32 = p32;
        }
      }

      // Front Right Lift Servo
      if (s42 < p42) {
        if (s42 + sp4 <= p42) {
          s42 = s42 + sp4;
        } else {
          s42 = p42;
        }
      }

      if (s42 > p42) {
        if (s42 - sp4 >= p42) {
          s42 = s42 - sp4;
        } else {
          s42 = p42;
        }
      }
    }
    // Write Pivot Servo Values
    FLPServo.to(s11 + da);
    BLPServo.to(s21 + db);
    BRPServo.to(s31 + dc);
    FRPServo.to(s41 + dd);

    // Write Lift Servos Values
    FLLServo.to(s12);
    BLLServo.to(s22);
    BRLServo.to(s32);
    FRLServo.to(s42);

    // delay(spd).then(() => console.log("next move")); // Delay before next movement
    await delay(spd);
  };
  //camera links
  const camera_links = msg => {
    if (CRServo.value === 120) {
      CRServo.to(82.5);
    } else {
      CRServo.to(55);
      // console.log(msg);
      // msg.classList.add(".disabled");
    }
  };
  //camera right
  const camera_right = () => {
    if (CRServo.value === 55) {
      CRServo.to(82.5);
    } else {
      CRServo.to(120);
    }
  };
  //
  const main = async () => {
    while (goingForward === true) {
      console.log("vooruit gaan");
      forward();
      await delay(1000);
    }
    while (goingBackward === true) {
      console.log("achteruit gaan");
      backward();
      await delay(1000);
    }
    while (goingLeft === true) {
      console.log("links gaan");
      turn_left();
      await delay(1000);
    }
    while (goingRight === true) {
      console.log("rechts gaan");
      turn_right();
      await delay(1000);
    }
    console.log("stop true statement");
    await delay(1000);
    bow();
  };
  //
  io.on("connection", function(socket) {
    //
    socket.on("forward", function(msg) {
      goingForward = true;
      goingBackward = false;
      goingLeft = false;
      goingRight = false;
      main();
    });
    socket.on("backward", function(msg) {
      goingForward = false;
      goingBackward = true;
      goingLeft = false;
      goingRight = false;
      main();
    });
    socket.on("left", function(msg) {
      goingForward = false;
      goingBackward = false;
      goingLeft = true;
      goingRight = false;
      main();
    });
    socket.on("right", function(msg) {
      goingForward = false;
      goingBackward = false;
      goingLeft = false;
      goingRight = true;
      main();
    });
    socket.on("stop", function(msg) {
      goingForward = false;
      goingBackward = false;
      goingLeft = false;
      goingRight = false;
      main();
      console.log("stop");
    });
    socket.on("bow", function(msg) {
      // delay(5000).then(() => bow());
      bow();
    });
    socket.on("dance", function(msg) {
      // delay(5000).then(() => dance());
      dance();
    });
    socket.on("wave", function(msg) {
      // delay(5000).then(() => wave());
      wave();
    });
    socket.on("lean_left", function(msg) {
      // delay(5000).then(() => lean_left());
      lean_left();
    });
    socket.on("lean_right", function(msg) {
      // delay(5000).then(() => lean_right());
      lean_right();
    });
    socket.on("center", function(msg) {
      // delay(5000).then(() => center_servos());
      center_servos();
    });
    socket.on("rust", function(msg) {
      rust();
    });
    socket.on("camera_links", function(msg) {
      camera_links(msg);
    });
    socket.on("camera_right", function(msg) {
      camera_right();
    });
  });
});

app.use(express.static("public"));

server.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
