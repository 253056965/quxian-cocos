// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
// Learn TypeScript:
export default class MyPoint extends cc.Component {

    @property(cc.Label)
    postion_label: cc.Label = null;
    @property(cc.Label)
    index_label: cc.Label = null;

    @property(cc.Node)
    hitNode: cc.Node = null;

    private _x: number = 0;
    public get x(): number {
        return this._x;
    }
    public set x(value: number) {
        this._x = value;
    }
    private _y: number = 0;
    public get y(): number {
        return this._y;
    }
    public set y(value: number) {
        this._y = value;
    }
    private _index: number = 0;

    // LIFE-CYCLE CALLBACKS:
    onLoad() {

    }
    start() {

    }
    update(dt) {
        this._x = this.node.getPosition().x;
        this._y = this.node.getPosition().y;
        this.postion_label.string = `(${this._x}, ${this._y})`
        this.index_label.string = `${this._index}`
    }

    public setColor(ishit: boolean) {
        if (ishit) {
            this.hitNode.color = cc.color(255, 0, 0, 255)
        } else {
            this.hitNode.color = cc.color(255, 255, 255, 255)
        }

    }
    public get index(): number {
        return this._index;
    }
    public set index(value: number) {
        this._index = value;
    }
}
