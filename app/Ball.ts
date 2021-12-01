import * as PIXI from "pixi.js"
import Utils, {Vector} from "./utils";
import {Player} from "./Player";

export class Ball extends PIXI.Graphics {
  speed: Vector = {x: 5, y: 0}
  screen: PIXI.Rectangle
  collisionsToTest: PIXI.Graphics[] = []

  constructor(screen: PIXI.Rectangle, player: Player) {
    super();
    this.beginFill(0xffffff);
    this.drawCircle(0, 0, 5);
    this.setTransform(screen.width / 2, screen.height / 2)
    this.screen = screen
    this.collisionsToTest.push(player)
  }

  update = (delta: number): void => {
    if (this.collisionsToTest.some(this.isColliding)) {
      this.speed.x = -this.speed.x;
      this.speed.y += this.getRandomAngle()
    }
    if (this.transform.position.x + this.width >= this.screen.width) {
      this.speed.x = -this.speed.x;
      this.speed.y += this.getRandomAngle()
    } else if (this.transform.position.x <= 0) {
      this.speed.x = -this.speed.x;
      this.speed.y += this.getRandomAngle()
    }
    if (this.transform.position.y <= 0) {
      this.speed.y = -this.speed.y
      this.speed.x += this.getRandomAngle();
    } else if (this.transform.position.y + this.height >= this.screen.height) {
      this.speed.y = -this.speed.y
      this.speed.x += this.getRandomAngle();
    }
    if (this.transform.position) {
      const newX = this.transform.position.x + (this.speed.x * delta)
      let newY = this.transform.position.y + (this.speed.y * delta)
      newY = Utils.clamp(0, this.screen.height - this.height, newY)
      this.setTransform(newX, newY)
    }
  }

  isColliding = (other: PIXI.Graphics): boolean => {
    const thisBounds = this.getBounds()
    const otherBounds = other.getBounds()
    // console.log(thisBounds, otherBounds)
    console.log(thisBounds.bottom <= otherBounds.top, thisBounds.top >= otherBounds.bottom, thisBounds.left <= otherBounds.right, thisBounds.right >= otherBounds.left)
    let result = thisBounds.bottom >= otherBounds.top && thisBounds.top <= otherBounds.bottom
      && thisBounds.left <= otherBounds.right && thisBounds.right >= otherBounds.left;
    console.log("isColliding", result)
    return result
  }

  getRandomAngle = (): number => {
    let angle = Math.random()
    if (Math.random() > 0.5) {
      angle = -angle
    }
    return angle;
  }
}
