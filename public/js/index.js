{
  let socket;
  const btnForward = document.querySelector("#forward");
  const btnBackwards = document.querySelector("#backward");
  const btnLeft = document.querySelector("#left");
  const btnRight = document.querySelector("#right");
  const btnSit = document.querySelector("#sit");

  const init = () => {
    //
    socket = io.connect(`/`);

    socket.on(`connect`, () => {
      console.log(`Connected: ${socket.id}`);
    });
    socket.on(`forward`, e => {
      console.log(e);
    });
    socket.on(`backward`, e => {
      console.log(e);
    });
    socket.on(`left`, e => {
      console.log(e);
    });
    socket.on(`right`, e => {
      console.log(e);
    });
    socket.on(`sit`, e => {
      console.log(e);
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
  const handleOnClickSit = e => {
    //console.log(e.currentTarget.value);
    socket.emit(`sit`, e.currentTarget.value);
  };

  btnForward.addEventListener(`click`, e => handleOnClickForward(e));
  btnBackwards.addEventListener(`click`, e => handleOnClickBackward(e));
  btnLeft.addEventListener(`click`, e => handleOnClickLeft(e));
  btnRight.addEventListener(`click`, e => handleOnClickRight(e));
  btnSit.addEventListener(`click`, e => handleOnClickSit(e));

  init();
}
