import * as PIXI from "pixi.js"
import {Player} from "./Player";
import {Keyboard} from "./Keyboard";
import {Ball} from "./Ball";

window.onload = () => {
  let app = new PIXI.Application({ width: 640, height: 360 });
  document.body.appendChild(app.view);
  const k = new Keyboard()

  let player = new Player(k, app.screen);
  app.stage.addChild(player);
  app.ticker.add(player.update);

  let ball = new Ball(app.screen, player)
  app.stage.addChild(ball);
  app.ticker.add(ball.update)
};
