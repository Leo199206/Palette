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
  EventHandler,
  UIOpacity,
  Button,
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
  @property(Node)
  private colorLayout: Node | null = null;
  @property(Node)
  private toolsLayout: Node | null = null;
  private chooseBrush: boolean = true;
  private chooseEraser: boolean = false;
  private lineWidth: number = 0;
  private eraserWidth = 0;
  private curColor: Color = Color.BLACK;
  private colors: Array<Color> = [
    Color.BLACK,
    Color.RED,
    Color.GREEN,
    Color.BLUE,
    Color.YELLOW,
  ];

  start() {
    this.initBrush();
    this.initEventListener();
  }

  /**
   * 初始化画笔
   */
  private initBrush() {
    this.lineWidth = 5;
    this.eraserWidth = 5;
    this.curColor = Color.BLACK;
    if (this.curBrush) {
      this.curBrush!.initBrush(this.lineWidth, this.curColor);
    }
  }

  /**
   * 初始化触摸时间监听
   */
  private initEventListener() {
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
    //将一个点转换为空间坐标
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
    //将一个点转换为空间坐标
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

  /**
   * 颜色按钮菜单事件
   * @property event 可以通过该对象获取对应的节点
   * @property index
   */
  private actionColorEvent(event: Event, index: number) {
    if (!this.chooseBrush) {
      return;
    }
    this.curColor = this.colors[index];
    this.actionBrushToolEvent();
    let length = this.colorLayout!.children.length;
    for (let i = 0; i < length; i++) {
      let ui = this.colorLayout!.children[i].getComponent(UIOpacity);
      if (i == index) {
        ui!.opacity = 255;
      } else {
        ui!.opacity = 100;
      }
    }
  }

  /**
   * 画笔点击事件
   */
  private actionBrushToolEvent() {
    this.chooseBrush = true;
    this.chooseEraser = false;
    this.curBrush?.setBrushColor(this.curColor!);
    this.toolsLayout!.children[0].getComponent(UIOpacity)!!.opacity = 255;
    this.toolsLayout!.children[1].getComponent(UIOpacity)!!.opacity = 100;
  }

  /**
   * 橡皮擦点击事件
   */
  private actionEraserEvent() {
    this.chooseEraser = true;
    this.chooseBrush = false;
    this.curBrush?.setBrushColor(Color.WHITE);
    this.toolsLayout!.children[0].getComponent(UIOpacity)!!.opacity = 100;
    this.toolsLayout!.children[1].getComponent(UIOpacity)!!.opacity = 255;
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
