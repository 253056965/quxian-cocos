import MathUtil from "./MathUtil";

export default class BezierUtil {


    public static productBezier(points: Array<{ x: number, y: number }>): Array<{ x: number, y: number }> {
        let pnumber = points.length;
        let t = 0;
        let path: Array<{ x: number, y: number }> = new Array();
        for (let i = 0; i < 1000; i++) {
            let temppoint: { x: number, y: number } = { x: 0, y: 0 };
            for (let i = 0; i < pnumber; i++) {
                let point = points[i];
                let temp = BezierUtil.productBezierForP(pnumber - 1, i, t, point);
                temppoint = { x: temppoint.x + temp.x, y: temppoint.y + temp.y };
            }
            t = t + 0.001;
            path.push(temppoint);
        }
        return path;
    }

    public static productBezierForP(pn: number, pIndex: number, t: number, point: { x: number, y: number }): { x: number, y: number } {
        let v1 = MathUtil.combination(pn, pIndex);
        let d = Math.pow((1 - t), (pn - pIndex));
        let v3 = Math.pow(t, pIndex);
        let p = v1 * d * v3;
        return { x: p * point.x, y: p * point.y }
    }

    // 算式个数
    /***
     * 把生成的字符串 放到这个网站可以查看生成公式是否正确
     * https://www.codecogs.com/latex/eqneditor.php
     */
    public static productGongShi(pn: number): string {
        let arr: Array<string> = new Array();
        for (let i = 0; i < pn; i++) {
            let str = BezierUtil.productGongShiItem(pn - 1, i);
            arr.push(str);
        }
        return arr.join("+");
    }
    public static productGongShiItem(pn: number, pindex: number): string {
        //\binom{n}{0}P_{0}(1-t)^{n}t^{0}
        let v1 = MathUtil.combination(pn, pindex);
        let v2 = `P_{${pindex}}`
        let v3 = `(1-t)^`;
        let v4 = pn - pindex;
        let v5 = `t^`
        let v6 = pindex;
        let str: Array<string> = new Array();
        if (v1 != 1) {
            str.push(v1 + "");
        }
        str.push(v2);
        if (v4 != 0) {
            str.push(v3);
            str.push(`{${v4}}`);
        }
        if (v6 != 0) {
            str.push(v5);
            str.push(`{${v6}}`)
        }
        return str.join("");
    }


}