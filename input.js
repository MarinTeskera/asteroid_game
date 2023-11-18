export class InputHandler {
  constructor() {
    this.keys = {};

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
