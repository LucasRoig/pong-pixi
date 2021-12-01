type KeyboardModel = {
  [key: string]: boolean
}

export enum Keys {
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp"
}

export class Keyboard {
  model: KeyboardModel = {}

  constructor() {
    window.addEventListener("keyup", (e) => {
      this.model[e.key] = false
      // console.log(e.key, 'up')
      // if (e.key === "ArrowDown") {
      //   this.down = false
      // } else if (e.key === "ArrowUp") {
      //   this.up = false;
      // }
    })
    window.addEventListener("keydown", (e) => {
      this.model[e.key] = true
      // console.log(e.key, 'down')
      // if (e.key === "ArrowDown") {
      //   this.down = true;
      // } else if (e.key === "ArrowUp") {
      //   this.up = true;
      // }
    })
  }

  isKeyDown = (key: Keys): boolean => {
    return !!this.model[key]
  }

  isKeyUp = (key: Keys): boolean => {
    return !this.isKeyDown(key);
  }
}
