import * as PIXI from "pixi.js";
import { Ball } from "./Ball";
import { Keyboard, Keys } from "./Keyboard";
import Utils, { Vector } from "./utils";

export class Player extends PIXI.Graphics {
  speed: Vector = { x: 0, y: 0 };
  speedYMax = 3;
  acceleration = 0.5;
  playerController: IPlayerController;

  keyboard: Keyboard;
  screen: PIXI.Rectangle;

  constructor(
    k: Keyboard,
    screen: PIXI.Rectangle,
    position: Vector,
    color: number,
    playerController: IPlayerController
  ) {
    super();
    this.keyboard = k;
    this.beginFill(color);
    this.drawRect(0, 0, 10, 100);
    this.setTransform(position.x, position.y);
    this.screen = screen;
    this.playerController = playerController;
    console.log(screen);
  }

  update = (delta: number): void => {
    this.playerController.update(delta, this);
  };
}

export class KeyboardPlayerController implements IPlayerController {
  keyUp: Keys;
  keyDown: Keys;

  constructor(keyUp: Keys, keyDown: Keys) {
    this.keyDown = keyDown;
    this.keyUp = keyUp;
  }

  update = (delta: number, player: Player): void => {
    if (player.keyboard.isKeyDown(this.keyDown)) {
      player.speed.y = Math.min(
        player.speed.y + player.acceleration,
        player.speedYMax
      );
    } else if (
      !player.keyboard.isKeyDown(this.keyDown) &&
      player.speed.y > 0
    ) {
      player.speed.y = Math.max(player.speed.y - player.acceleration, 0);
    } else {
      player.speed.y = player.keyboard.isKeyDown(this.keyUp)
        ? Math.max(player.speed.y - player.acceleration, -player.speedYMax)
        : Math.min(player.speed.y + player.acceleration, 0);
    }

    if (player.transform.position) {
      const newX = player.transform.position.x + player.speed.x * delta;
      let newY = player.transform.position.y + player.speed.y * delta;
      newY = Utils.clamp(0, player.screen.height - player.height, newY);
      player.setTransform(newX, newY);
    }
  };
}

export class AIController implements IPlayerController {

  ball: Ball;

  constructor(ball: Ball) {
    this.ball = ball;
  }

  update = (delta: number, player: Player): void => {
    player.setTransform(player.x, this.ball.y) 

  }

}

export interface IPlayerController {

  update : (delta: number, player: Player)=> void 

}
