export class Keyboard {
  up = false;
  down = false;

  constructor() {
    window.addEventListener("keyup", (e) => {
      // console.log(e.key, 'up')
      if (e.key === "ArrowDown") {
        this.down = false
      } else if (e.key === "ArrowUp") {
        this.up = false;
      }
    })
    window.addEventListener("keydown", (e) => {
      // console.log(e.key, 'down')
      if (e.key === "ArrowDown") {
        this.down = true;
      } else if (e.key === "ArrowUp") {
        this.up = true;
      }
    })
  }

}
