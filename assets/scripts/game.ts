import {
  _decorator,
  Component,
  Node,
  Color,
  Canvas,
  UITransform,
  EventTouch,
  systemEvent,
  SystemEvent,
} from "cc";
import { Brush } from "./brush";
import { Test } from "./test";
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;
  @property(Brush)
  private curBrush: Brush | null = null;
  private lineWidth: number = 0;
  private eraserWidth = 0;
  private currentColor: Color | null = null;

  start() {
    // [3]
    this.lineWidth = 1;
    this.eraserWidth = 10;
    this.currentColor = Color.BLACK;
    console.info("start curBrush=" + this.curBrush?.x + "");
    this.node.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this,true);
    this.node.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this,true);
  }

  /**
   * 监听触摸事件
   * @property event
   */
  onTouchStart(event: EventTouch) {
    let pos = event.getLocation();
    this.curBrush?.setBrushPosition(pos.x, pos.y);
  }

  /**
   * 触摸移动事件
   */
  onTouchMove(event: EventTouch) {
    let pos = event.getLocation();
    console.info("onTouchMove x=" + pos.x + " y=" + pos.y);
    this.curBrush?.drawLine(pos.x, pos.y);
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
