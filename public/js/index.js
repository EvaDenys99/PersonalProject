{
  //socket connectie
  const socket = io.connect("/");
  //delay / pauze
  const delay = t => new Promise(resolve => setTimeout(resolve, t));
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
  //test
  const btnTest = document.querySelector("#test");
  //tekst & effect
  const typewriter = document.querySelector(".typewriter");
  const tekst = document.querySelector("#tekst");
  const tekst01 = document.querySelector("#tekst01");
  const myShows = [
    "... Do I have to?",
    "But why, I was just fine being lazy.",
    "Can't I have some peace for 5 g*dd*mn minutes.",
    "Hold my beer.",
    "Getting ready... On my own time.",
    "I am not your slave, stop ordering me around!",
    "Lets crack a cold \n one?",
    "Don't you have something better to do?"
  ];
  let show;
  //
  const init = () => {
    socket.on(`connect`, () => {
      console.log(`Connected: ${socket.id}`);
    });
  };
  //
  const handleOnPointerDownForward = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`forward`, e.currentTarget.value);
  };
  const handleOnPointerDownBackward = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`backward`, e.currentTarget.value);
  };
  const handleOnPointerDownLeft = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`left`, e.currentTarget.value);
  };
  const handleOnPointerDownRight = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`right`, e.currentTarget.value);
  };
  const handleOnPointerDownBow = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`bow`, e.currentTarget.value);
  };
  const handleOnPointerDownDance = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`dance`, e.currentTarget.value);
  };
  const handleOnPointerDownWave = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`wave`, e.currentTarget.value);
  };
  const handleOnPointerDownLeanLeft = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`lean_left`, e.currentTarget.value);
  };
  const handleOnPointerDownLeanRight = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`lean_right`, e.currentTarget.value);
  };
  const handleOnPointerDownCenter = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`center`, e.currentTarget.value);
  };
  const handleOnPointerDownRust = e => {
    show = "Finally thank you!";
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`rust`, e.currentTarget.value);
  };

  let timeOut;
  const handleOnMouseDownTest = e => {
    timeOut = setInterval(function() {
      socket.emit(`forwardHold`, e);
    }, 500);
  };
  const handleOnMouseDownBackward = e => {
    timeOut = setInterval(function() {
      socket.emit(`backwardHold`, e);
    }, 500);
  };
  const handleOnMouseDownLeft = e => {
    timeOut = setInterval(function() {
      socket.emit(`leftHold`, e);
    }, 500);
  };
  const handleOnMouseDownRight = e => {
    timeOut = setInterval(function() {
      socket.emit(`rightHold`, e);
    }, 500);
  };
  const handleOnMouseUpTest = e => {
    clearInterval(timeOut);
    socket.emit(`stop`, e);
  };

  const handleOnPointerDownCameraLeft = e => {
    socket.emit(`camera_links`, e);
  };
  const handleOnPointerDownCameraRight = e => {
    socket.emit(`camera_right`, e);
  };
  //
  btnForward.addEventListener(`pointerdown`, e =>
    handleOnPointerDownForward(e)
  );
  btnForward.addEventListener(`pointerdown`, e => handleOnMouseDownTest(e));
  btnForward.addEventListener(`pointerup`, e => handleOnMouseUpTest(e));
  //
  btnBackwards.addEventListener(`pointerdown`, e =>
    handleOnPointerDownBackward(e)
  );
  btnBackwards.addEventListener(`pointerdown`, e =>
    handleOnMouseDownBackward(e)
  );
  btnBackwards.addEventListener(`pointerup`, e => handleOnMouseUpTest(e));
  //
  btnLeft.addEventListener(`pointerdown`, e => handleOnPointerDownLeft(e));
  btnLeft.addEventListener(`pointerdown`, e => handleOnMouseDownLeft(e));
  btnLeft.addEventListener(`pointerup`, e => handleOnMouseUpTest(e));
  //
  btnRight.addEventListener(`pointerdown`, e => handleOnPointerDownRight(e));
  btnRight.addEventListener(`pointerdown`, e => handleOnMouseDownRight(e));
  btnRight.addEventListener(`pointerup`, e => handleOnMouseUpTest(e));
  //
  btnBow.addEventListener(`pointerdown`, e => handleOnPointerDownBow(e));
  btnDance.addEventListener(`pointerdown`, e => handleOnPointerDownDance(e));
  btnWave.addEventListener(`pointerdown`, e => handleOnPointerDownWave(e));
  btnLean_left.addEventListener(`pointerdown`, e =>
    handleOnPointerDownLeanLeft(e)
  );
  btnLean_right.addEventListener(`pointerdown`, e =>
    handleOnPointerDownLeanRight(e)
  );
  btnCenter.addEventListener(`pointerdown`, e => handleOnPointerDownCenter(e));
  btnRust.addEventListener(`pointerdown`, e => handleOnPointerDownRust(e));
  //

  //
  btnCameraLeft.addEventListener(`pointerdown`, e =>
    handleOnPointerDownCameraLeft(e)
  );
  btnCameraRight.addEventListener(`pointerdown`, e =>
    handleOnPointerDownCameraRight(e)
  );

  init();
}
