import { _decorator, Component, Node, Graphics, Color } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Brush")
export class Brush extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  @property(Graphics)
  private graphics: Graphics | null = null;
  public x: number = 100;
  start() {
    // [3]
    console.info("Brush start " + this.graphics + "");
    this.setBrushColor(Color.RED);
    this.setBrushLineWidth(10);
    this.setBrushPosition(0, 0);
    // this.drawLine(500, 500);
    // this.graphics?.circle(0,0,200);
    // this.graphics?.fill();
    // this.graphics?.stroke();
  }

  /**
   * 设置笔刷颜色
   * @property color
   */
  public setBrushColor(color: Color) {
    if (this.graphics) {
      this.graphics.strokeColor = color;
      this.graphics.fillColor = color;
    }
  }

  /**
   * 设置画笔位置
   * @property x
   * @property y
   */
  public setBrushPosition(x: number, y: number) {
    if (this.graphics) {
      this.graphics.moveTo(x, y);
    }
  }

  /**
   * 设置画笔宽度
   * @property width
   */
  public setBrushLineWidth(width: number) {
    if (this.graphics) {
      this.graphics.lineWidth = width;
    }
  }

  /**
   * 画线
   * @property x
   * @property y
   */
  public drawLine(x: number, y: number) {
    if (this.graphics) {
        this.graphics.lineTo(x, y);
        this.graphics.stroke();
        this.graphics.moveTo(x, y);
    }
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
