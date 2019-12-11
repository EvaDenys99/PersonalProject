{
  const socket = io.connect("/");
  const delay = t => new Promise(resolve => setTimeout(resolve, t));
  const btnForward = document.querySelector("#forward");
  const btnBackwards = document.querySelector("#backward");
  const btnLeft = document.querySelector("#left");
  const btnRight = document.querySelector("#right");
  const btnBow = document.querySelector("#bow");
  const btnDance = document.querySelector("#dance");
  const btnWave = document.querySelector("#wave");
  const btnLean_left = document.querySelector("#lean_left");
  const btnLean_right = document.querySelector("#lean_right");
  const btnCenter = document.querySelector("#center");
  const btnRust = document.querySelector("#rust");
  const btnTest = document.querySelector("#test");
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

  const init = () => {
    socket.on(`connect`, () => {
      console.log(`Connected: ${socket.id}`);
    });
  };
  const handleOnClickForward = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`forward`, e.currentTarget.value);
  };
  const handleOnClickBackward = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`backward`, e.currentTarget.value);
  };
  const handleOnClickLeft = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`left`, e.currentTarget.value);
  };
  const handleOnClickRight = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`right`, e.currentTarget.value);
  };
  const handleOnClickBow = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`bow`, e.currentTarget.value);
  };
  const handleOnClickDance = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`dance`, e.currentTarget.value);
  };
  const handleOnClickWave = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`wave`, e.currentTarget.value);
  };
  const handleOnClickLeanLeft = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`lean_left`, e.currentTarget.value);
  };
  const handleOnClickLeanRight = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`lean_right`, e.currentTarget.value);
  };
  const handleOnClickCenter = e => {
    show = myShows[Math.floor(Math.random() * myShows.length)];
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`center`, e.currentTarget.value);
  };
  const handleOnClickRust = e => {
    show = "Finally thank you!";
    tekst.innerHTML = show;
    tekst01.innerHTML = show;
    //om het typewriter effect bij elke nieuwe zin toe te voegen
    typewriter.innerHTML = ""; //remove all children
    typewriter.appendChild(tekst); //add the new h1 element

    socket.emit(`rust`, e.currentTarget.value);
  };

  const handleOnMouseDownTest = e => {
    timeOut = setInterval(function() {
      socket.emit(`forwardHold`, e);
    }, 100);
  };
  const handleOnMouseUpTest = e => {
    clearInterval(timeOut);
  };

  btnForward.addEventListener(`mousedown`, e => handleOnClickForward(e));
  btnBackwards.addEventListener(`click`, e => handleOnClickBackward(e));
  btnLeft.addEventListener(`click`, e => handleOnClickLeft(e));
  btnRight.addEventListener(`click`, e => handleOnClickRight(e));
  btnBow.addEventListener(`click`, e => handleOnClickBow(e));
  btnDance.addEventListener(`click`, e => handleOnClickDance(e));
  btnWave.addEventListener(`click`, e => handleOnClickWave(e));
  btnLean_left.addEventListener(`click`, e => handleOnClickLeanLeft(e));
  btnLean_right.addEventListener(`click`, e => handleOnClickLeanRight(e));
  btnCenter.addEventListener(`click`, e => handleOnClickCenter(e));
  btnRust.addEventListener(`click`, e => handleOnClickRust(e));
  btnTest.addEventListener(`mousedown`, e => handleOnMouseDownTest(e));
  btnTest.addEventListener(`mouseup`, e => handleOnMouseUpTest(e));

  init();
}
