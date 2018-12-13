import BezierUtil from "./util/BezierUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start() {
    //     // init logic
    //     this.label.string = this.text;

    //    let str=  BezierUtil.productGongShi(6);
    //    console.log(str);
    }
}
