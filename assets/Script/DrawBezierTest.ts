import MyPoint from "./Mypoint";
import BezierUtil from "./util/BezierUtil";

const { ccclass, property } = cc._decorator;
@ccclass
export default class DrawTest extends cc.Component {

    @property(cc.Prefab)
    myPoint: cc.Prefab = null;
    private graphics: cc.Graphics = null;
    // LIFE-CYCLE CALLBACKS:
    private array: Array<cc.Node> = new Array();
    private index = -1
    start() {
        // init logic

    }

    onLoad() {
        this.graphics = this.getComponent(cc.Graphics);
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            let p: cc.Vec2 = event.getLocation();
            let p1 = self.node.convertTouchToNodeSpace(event)
            let index = self.getMyPoint(p1.x, p1.y);
            if (index != -1) {
                self.index = index;
                self.array[self.index].getComponent(MyPoint).setColor(true)
                //console.log("我点中了我靠");
                //self.updatepoints();
            }
            console.log(p,p1)
        }, this.node, false);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let p: cc.Vec2 = self.node.convertTouchToNodeSpace(event)
            if (self.index != -1) {
                self.array[self.index].setPosition(p);
                self.updatepoints();
            }
        }, this.node, false);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (self.index != -1) {
                self.array[self.index].getComponent(MyPoint).setColor(false);
                self.updatepoints();
            }
            self.index = -1;
        }, this.node, false);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            if (self.index != -1) {
                self.array[self.index].getComponent(MyPoint).setColor(false);
                self.updatepoints();
            }
            self.index = -1;
        }, this.node, false);


        for (let i = 0; i < 3; i++) {
            let node = cc.instantiate(this.myPoint);
            node.getComponent(MyPoint).index = i;
            node.setPosition(cc.v2(30, 20 * (i + 1)));
            this.node.addChild(node)
            this.array.push(node);
        }
        // let arr: Array<{ x: number, y: number }> = new Array();
        // arr.push({ x: 21.5, y: 621 })
        // arr.push({ x: 564.5, y: 20 })
        // arr.push({ x: 1111.5, y: 621 })
        // let pro = BezierUtil.productBezier(arr)

        // this.graphics.clear();
        // for (let i = 0; i < pro.length - 1; i++) {
        //     let p1 = pro[i];
        //     let p2 = pro[i + 1];
        //     this.drawLine(p1.x, p1.y, p2.x, p2.y);
        //     //console.log(p1.x,",",p1.y)
        // }
        //this.drawLine(80,30,1134,260);

        this.updatepoints();
    }

    public addMyPointsClick() {
        let node = cc.instantiate(this.myPoint);
        node.setPosition(cc.v2(300, 500));
        this.node.addChild(node)
        this.array.push(node);
        this.array.forEach((n,index) => {
          n.getComponent(MyPoint).index=index;
        })
        this.updatepoints()
    }

    /**
     * name
     */
    public delMyPointsClick() {
       let n= this.array.pop()
       n.destroy();
       this.updatepoints()
    }


    private updatepoints() {
        let self = this;
        let array = new Array();
        this.array.forEach((n) => {
            array.push({ x: n.getPosition().x, y: n.getPosition().y });
        })
        let pro = BezierUtil.productBezier(array)
        this.graphics.clear();
        for (let i = 0; i < pro.length - 1; i++) {
            let p1 = pro[i];
            let p2 = pro[i + 1];
            this.drawLine(p1.x, p1.y, p2.x, p2.y);

        }

    }



    private getMyPoint(x: number, y: number): number {
        for (let i = 0; i < this.array.length; i++) {
            let no = this.array[i];
            //console.log(no.getBoundingBox())
            if (no.getBoundingBox().contains(cc.v2(x, y))) {
                return i;
            }
        }
        return -1;
    }


    public drawLine(x, y, rx, ry) {
        this.graphics.moveTo(x, y);
        //this.graphics.lineTo(x, y);
        this.graphics.lineTo(rx, ry);
        this.graphics.stroke();
    }



    update(dt: number) {
        // this.graphics.clear();
        // let cr1x = this.array[0].position.x;
        // let cr1y = this.array[0].position.y;
        // this.graphics.moveTo(cr1x, cr1y);
        // let cr2x = this.array[1].position.x;
        // let cr2y = this.array[1].position.y;

        // let cr3x = this.array[2].position.x;
        // let cr3y = this.array[2].position.y;

        // this.graphics.bezierCurveTo(cr1x, cr1y, cr2x, cr2y, cr3x, cr3y)
        // this.graphics.stroke();
    }

}