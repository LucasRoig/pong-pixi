import * as PIXI from "pixi.js"
import {Player} from "./Player";
import {Keyboard} from "./Keyboard";

window.onload = () => {
  let app = new PIXI.Application({ width: 640, height: 360 });
  document.body.appendChild(app.view);
  const k = new Keyboard()

  let obj = new Player(k);
  app.stage.addChild(obj);
  app.ticker.add(obj.update);


  console.log("yo 123 aze ")
};
