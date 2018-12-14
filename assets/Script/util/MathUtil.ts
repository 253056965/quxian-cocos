export default class MathUtil {
    public static combination(m: number, n: number) {
        return MathUtil.factorial(m, n) / MathUtil.factorial(n, n);//就是Cmn(上面是n，下面是m) = Amn(上面是n，下面是m)/Ann(上下都是n)
    }
    //自定义一个阶乘函数，就是有n个数相乘，从m开始，每个数减1，如factorial(5,4)就是5*(5-1)*(5-2)*(5-3),相乘的数有4个
    public static factorial(m: number, n: number) {
        var num = 1;
        var count = 0;
        for (var i = m; i > 0; i--) {
            if (count == n) {//当循环次数等于指定的相乘个数时，即跳出for循环
                break;
            }
            num = num * i;
            count++;
        }
        return num;
    }

    // 一个坐标乘以一个数 得到一个新坐标
    public static pointMultiplyForNumber(p: { x: number, y: number }, dt: number): { x: number, y: number } {
        return {x: p.x * dt, y: p.y * dt};
    }

    // 一个点 + 一个点 得到一个新点
    public static pointAdditionForPoint(p: { x: number, y: number }, p2: { x: number, y: number }): { x: number, y: number } {
        return { x: (p.x + p2.x), y: (p.y + p2.y) };
    }

    // 一个坐标 减去一个坐标 得到一个新店
    public static pointSubtractionForPoint(p: { x: number, y: number }, p2: { x: number, y: number }): { x: number, y: number } {
        return { x: p.x - p2.x, y: p.y - p2.y }
    }


}