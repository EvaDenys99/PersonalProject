{
  //socket connectie
  const socket = io.connect("/");
  //camera buttons
  const btnCameraLeft = document.querySelector("#camera_left");
  const btnCameraRight = document.querySelector("#camera_right");
  //basic besturing buttons
  const btnForward = document.querySelector("#forward");
  const btnBackwards = document.querySelector("#backward");
  const btnLeft = document.querySelector("#left");
  const btnRight = document.querySelector("#right");
  //extra tricks buttons
  const btnBow = document.querySelector("#bow");
  const btnDance = document.querySelector("#dance");
  const btnWave = document.querySelector("#wave");
  const btnLean_left = document.querySelector("#lean_left");
  const btnLean_right = document.querySelector("#lean_right");
  const btnCenter = document.querySelector("#center");
  const btnRust = document.querySelector("#rust");
  //
  const tekst = document.querySelector("#tekst");
  const tekst01 = document.querySelector("#tekst01");
  const myShows = [
    "... Do I have to?",
    "But why...",
    "I was just fine being lazy!",
    "Can't I have some peace.",
    "Just 5 g*dd*mn minutes!",
    "Hold my beer.",
    "Getting ready...",
    "On my own time.",
    "I am not a slave!",
    "Stop ordering me around.",
    "Lets crack a cold one?",
    "Don't you have a life?",
    "Uuurgh...",
    "Noooo...",
    "Let's get this bread.",
    "Yeet.",
    "Let's yeet this wheat.",
    "word",
    "I'm loving it *sarcasm*"
  ];
  let show;
  //
  const init = () => {
    socket.on(`connect`, () => {
      console.log(`Connected: ${socket.id}`);
    });
  };
  //Hammer.js instance aanmaken - button forward
  const moveForward = new Hammer(btnForward);
  // listen to events...
  moveForward.on("press", function(e) {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //
    socket.emit(`forward`, e);
  });
  moveForward.on("pressup", function(e) {
    socket.emit(`stop`, e);
  });
  //Hammer.js instance aanmaken - button backward
  const moveBackward = new Hammer(btnBackwards);
  // listen to events...
  moveBackward.on("press", function(e) {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //
    socket.emit(`backward`, e);
  });
  moveBackward.on("pressup", function(e) {
    socket.emit(`stop`, e);
  });
  //Hammer.js instance aanmaken - button left
  const moveLeft = new Hammer(btnLeft);
  // listen to events...
  moveLeft.on("press", function(e) {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //
    socket.emit(`left`, e);
  });
  moveLeft.on("pressup", function(e) {
    socket.emit(`stop`, e);
  });
  //Hammer.js instance aanmaken - button right
  const moveRight = new Hammer(btnRight);
  // listen to events...
  moveRight.on("press", function(e) {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //
    socket.emit(`right`, e);
  });
  moveRight.on("pressup", function(e) {
    socket.emit(`stop`, e);
  });
  //Hammer.js instance aanmaken - button bow
  const bow = new Hammer(btnBow);
  // listen to events...
  bow.on("tap", function(e) {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //
    socket.emit(`bow`, e);
  });
  //Hammer.js instance aanmaken - button dance
  const dance = new Hammer(btnDance);
  // listen to events...
  dance.on("tap", function(e) {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //
    socket.emit(`dance`, e);
  });
  //Hammer.js instance aanmaken - button wave
  const wave = new Hammer(btnWave);
  // listen to events...
  wave.on("tap", function(e) {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //
    socket.emit(`wave`, e);
  });
  //Hammer.js instance aanmaken - button lean_left
  const lean_left = new Hammer(btnLean_left);
  // listen to events...
  lean_left.on("tap", function(e) {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //
    socket.emit(`lean_left`, e);
  });
  //Hammer.js instance aanmaken - button lean_right
  const lean_right = new Hammer(btnLean_right);
  // listen to events...
  lean_right.on("tap", function(e) {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //
    socket.emit(`lean_right`, e);
  });
  //Hammer.js instance aanmaken - button center
  const center = new Hammer(btnCenter);
  // listen to events...
  center.on("tap", function(e) {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //
    socket.emit(`center`, e);
  });
  //Hammer.js instance aanmaken - button rust
  const rust = new Hammer(btnRust);
  // listen to events...
  rust.on("tap", function(e) {
    show = "Finally thank you!";
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //
    socket.emit(`rust`, e);
  });
  //Hammer.js instance aanmaken - button camera left
  const cameraLeft = new Hammer(btnCameraLeft);
  // listen to events...
  cameraLeft.on("tap", function(e) {
    socket.emit(`camera_links`, e);
  });
  //Hammer.js instance aanmaken - button camera left
  const cameraRight = new Hammer(btnCameraRight);
  // listen to events...
  cameraRight.on("tap", function(e) {
    socket.emit(`camera_right`, e);
  });

  init();
}
