{
  const socket = io.connect("/");

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

  const init = () => {
    socket.on(`connect`, () => {
      console.log(`Connected: ${socket.id}`);
    });
  };
  const handleOnClickForward = e => {
    //console.log(e.currentTarget.value);
    socket.emit(`forward`, e.currentTarget.value);
  };
  const handleOnClickBackward = e => {
    //console.log(e.currentTarget.value);
    socket.emit(`backward`, e.currentTarget.value);
  };
  const handleOnClickLeft = e => {
    //console.log(e.currentTarget.value);
    socket.emit(`left`, e.currentTarget.value);
  };
  const handleOnClickRight = e => {
    // console.log(e.currentTarget.value);
    socket.emit(`right`, e.currentTarget.value);
  };
  const handleOnClickBow = e => {
    //console.log(e.currentTarget.value);
    socket.emit(`bow`, e.currentTarget.value);
  };
  const handleOnClickDance = e => {
    //console.log(e.currentTarget.value);
    socket.emit(`dance`, e.currentTarget.value);
  };
  const handleOnClickWave = e => {
    //console.log(e.currentTarget.value);
    socket.emit(`wave`, e.currentTarget.value);
  };
  const handleOnClickLeanLeft = e => {
    //console.log(e.currentTarget.value);
    socket.emit(`lean_left`, e.currentTarget.value);
  };
  const handleOnClickLeanRight = e => {
    //console.log(e.currentTarget.value);
    socket.emit(`lean_right`, e.currentTarget.value);
  };
  const handleOnClickCenter = e => {
    //console.log(e.currentTarget.value);
    socket.emit(`center`, e.currentTarget.value);
  };

  btnForward.addEventListener(`click`, e => handleOnClickForward(e));
  btnBackwards.addEventListener(`click`, e => handleOnClickBackward(e));
  btnLeft.addEventListener(`click`, e => handleOnClickLeft(e));
  btnRight.addEventListener(`click`, e => handleOnClickRight(e));
  btnBow.addEventListener(`click`, e => handleOnClickBow(e));
  btnDance.addEventListener(`click`, e => handleOnClickDance(e));
  btnWave.addEventListener(`click`, e => handleOnClickWave(e));
  btnLean_left.addEventListener(`click`, e => handleOnClickLeanLeft(e));
  btnLean_right.addEventListener(`click`, e => handleOnClickLeanRight(e));
  btnCenter.addEventListener(`click`, e => handleOnClickCenter(e));

  init();
}
