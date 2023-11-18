// klasa za input
export class InputHandler {
  constructor() {
    this.keys = {};

    // event listener za stiskanje tipki
    window.addEventListener("keydown", (event) => {
      const key = event.key;
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "w",
          "a",
          "s",
          "d",
        ].includes(key)
      ) {
        this.keys[key] = true;
      }
    });

    // event listener za otpustanje tipki
    window.addEventListener("keyup", (event) => {
      const key = event.key;
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "w",
          "a",
          "s",
          "d",
        ].includes(key)
      ) {
        this.keys[key] = false;
      }
    });
  }
}
