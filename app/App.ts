import * as PIXI from "pixi.js";
import { AIController, KeyboardPlayerController, Player } from "./Player";
import { Keyboard, Keys } from "./Keyboard";
import { Ball } from "./Ball";

window.onload = () => {
  let app = new PIXI.Application({ width: 640, height: 360 });
  document.body.appendChild(app.view);
  const k = new Keyboard();

  let player1 = new Player(
    k,
    app.screen,
    { x: 50, y: 100 },
    0xac1e9e,
    new KeyboardPlayerController(Keys.z, Keys.s)
  );
  app.stage.addChild(player1);
  app.ticker.add(player1.update);

  let ball = new Ball(app.screen, [player1]);
  app.stage.addChild(ball);
  app.ticker.add(ball.update);

  let player2 = new Player(
    k,
    app.screen,
    { x: 590, y: 100 },
    0xac1e9e,
    new AIController(ball)
  );
  app.stage.addChild(player2);
  app.ticker.add(player2.update);

  ball.addToCollision(player2);
};
