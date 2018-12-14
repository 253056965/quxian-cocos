import MathUtil from "./MathUtil";

export default class HermiteProduct {

    public static createHer(controlPoints: Array<{ x: number, y: number }>): Array<{ x: number, y: number }> {
        let p0: { x: number, y: number } = null;
        let p1: { x: number, y: number } = null;
        let m0: { x: number, y: number } = null;
        let m1: { x: number, y: number } = null;

        let postions: Array<{ x: number, y: number }> = new Array();
        for (let j = 0; j < controlPoints.length - 1; j++) {
            p0 = controlPoints[j];
            p1 = controlPoints[j + 1];
            if (j > 0) {
                let temp = MathUtil.pointSubtractionForPoint(controlPoints[j + 1], controlPoints[j - 1])
                m0 = MathUtil.pointMultiplyForNumber(temp, 0.5);
            }
            else {
                m0 = MathUtil.pointSubtractionForPoint(controlPoints[j + 1], controlPoints[j]);
            }
            if (j < controlPoints.length - 2) {
                m1 = MathUtil.pointMultiplyForNumber(MathUtil.pointSubtractionForPoint(controlPoints[j + 2], controlPoints[j]), 0.5);
            }
            else {
                m1 = MathUtil.pointSubtractionForPoint(controlPoints[j + 1], controlPoints[j]);
            }

            let numberOfPoints = 20;
            let t;
            let pointStep = 1.0 / numberOfPoints;
            if (j == controlPoints.length - 2) {
                pointStep = 1.0 / (numberOfPoints - 1.0);
                // last point of last segment should reach p1
            }


            for (let i = 0; i < numberOfPoints; i++) {
                t = i * pointStep;

                let c1 = MathUtil.pointMultiplyForNumber(p0, 2.0 * t * t * t - 3.0 * t * t + 1.0);
                let c2 = MathUtil.pointMultiplyForNumber(m0, t * t * t - 2.0 * t * t + t);
                let c3 = MathUtil.pointMultiplyForNumber(p1, -2.0 * t * t * t + 3.0 * t * t);
                let c4 = MathUtil.pointMultiplyForNumber(m1, t * t * t - t * t);


                let b1 = MathUtil.pointAdditionForPoint(c1, c2);
                let b2 = MathUtil.pointAdditionForPoint(c3, c4);
                let position = MathUtil.pointAdditionForPoint(b1, b2);
                postions.push(position);
                // position = (2.0 * t * t * t - 3.0 * t * t + 1.0) * p0
                //     + (t * t * t - 2.0 * t * t + t) * m0
                //         + (-2.0 * t * t * t + 3.0 * t * t) * p1
                //             + (t * t * t - t * t) * m1;

                // if (lastPos != VEC2_IGNORE) {
                //     _drawer -> drawLine(lastPos, position, cocos2d:: Color4F:: RED);
                // }
                //lastPos = position;
            }


        }
        return postions;
    }
}