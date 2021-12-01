import * as PIXI from "pixi.js"
import {Keyboard} from "./Keyboard";
import Utils, {Vector} from "./utils";

export class Player extends PIXI.Graphics {
  speed: Vector = {x: 0, y: 0};
  speedYMax = 3;
  acceleration = 0.5;

  keyboard: Keyboard
  screen: PIXI.Rectangle

  constructor(k: Keyboard, screen: PIXI.Rectangle) {
    super();
    this.keyboard = k
    this.beginFill(0xffffff);
    this.drawRect(0, 0, 10, 100);
    this.setTransform(50, 50)
    this.screen = screen
    console.log(screen)
  }

  update = (delta: number): void => {
    if (this.keyboard.down) {
      this.speed.y = Math.min(this.speed.y + this.acceleration, this.speedYMax);
    } else if (!this.keyboard.down && this.speed.y > 0) {
      this.speed.y = Math.max(this.speed.y - this.acceleration, 0)
    } else {
      this.speed.y = this.keyboard.up ?
        Math.max(this.speed.y - this.acceleration, -this.speedYMax) :
        Math.min(this.speed.y + this.acceleration, 0);
    }

    if (this.transform.position) {
      const newX = this.transform.position.x + (this.speed.x * delta)
      let newY = this.transform.position.y + (this.speed.y * delta)
      newY = Utils.clamp(0, this.screen.height - this.height, newY)
      this.setTransform(newX, newY)
    }
  }
}
