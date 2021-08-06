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
  Vec3,
  Vec2,
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
    this.node.on(
      SystemEvent.EventType.TOUCH_START,
      this.onTouchStart,
      this,
      true
    );
    this.node.on(
      SystemEvent.EventType.TOUCH_MOVE,
      this.onTouchMove,
      this,
      true
    );
  }

  /**
   * 监听触摸事件
   * @property event
   */
  onTouchStart(event: EventTouch) {
    let pos = event.getUILocation();
    let out = this.convertToNodeSpaceAR(pos);
    console.info("onTouchStart pos x=" + pos.x + " y=" + pos.y);
    console.info("onTouchStart out x=" + out.x + " y=" + out.y);
    this.curBrush?.setBrushPosition(out.x, out.y);
  }

  /**
   * 触摸移动事件
   */
  onTouchMove(event: EventTouch) {
    let pos = event.getUILocation();
    let out = this.convertToNodeSpaceAR(pos);
    console.info("onTouchMove pos x=" + pos.x + " y=" + pos.y);
    console.info("onTouchMove out x=" + out.x + " y=" + out.y);
    this.curBrush?.drawLine(out.x, out.y);
  }

  /**
   * 坐标转换
   */
  private convertToNodeSpaceAR(pos: Vec2): Vec3 {
    let out = new Vec3();
    this.node
      .getComponent(UITransform)
      ?.convertToNodeSpaceAR(new Vec3(pos.x, pos.y, 0), out);
    return out;
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
