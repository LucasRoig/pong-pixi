import * as PIXI from "pixi.js"
import {Keyboard} from "./Keyboard";

export class Player extends PIXI.Graphics {
  speed = [0,0];
  speedYMax = 3;
  acceleration = 0.1;

  keyboard: Keyboard

  constructor(k: Keyboard) {
    super();
    this.keyboard = k
    this.beginFill(0xffffff);
    this.drawRect(0, 0, 10, 100);
    this.setTransform(50, 50)
  }

  update = (delta: number): void => {
    // console.log(delta, this)
    if (this.keyboard.down) {
      this.speed[1] = Math.min(this.speed[1] + this.acceleration, this.speedYMax);
    } else if (!this.keyboard.down && this.speed[1] > 0) {
      this.speed[1] = Math.max(this.speed[1] - this.acceleration, 0)
    } else {
      this.speed[1] = this.keyboard.up ?
        Math.max(this.speed[1] - this.acceleration, -this.speedYMax) :
        Math.min(this.speed[1] + this.acceleration, 0);
    }

    console.log(this.speed)
    // console.log("down", this.keyboard.down)
    if (this.transform.position) {
      const newX = this.transform.position.x + (this.speed[0] * delta)
      const newY = this.transform.position.y + (this.speed[1] * delta)
      this.setTransform(newX, newY)
    }
  }
}
