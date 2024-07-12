package jp.com.helper;

import cn.hutool.core.util.NumberUtil;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * <pre>
 * 精确的浮点数运算
 * </pre>
 *
 * @author wangyunpeng
 * @date 2021/1/28 17:26
 * @wechat wyp_blog
 */
public class ArithHelper {

    /*
     * 默认除法运算精度
     */
    private static final int DEF_DIV_SCALE = 2;

    /**
     * 提供精确的加法运算
     *
     * @param a
     * @param b
     * @return
     */
    public static Integer add(Integer a, Integer b) {
        return Integer.valueOf(add(a.intValue(), b.intValue()));
    }

    /**
     * 提供精确的加法运算
     *
     * @param a
     * @param b
     * @return
     */
    public static int add(int a, int b) {
        return Integer.sum(a, b);
    }

    /**
     * 提供精确的加法运算
     *
     * @param a
     * @param b
     * @return
     */
    public static Long add(Long a, Long b) {
        return Long.valueOf(add(a.longValue(), b.longValue()));
    }

    /**
     * 提供精确的加法运算
     *
     * @param a
     * @param b
     * @return
     */
    public static long add(long a, long b) {
        return Long.sum(a, b);
    }

    /**
     * 提供精确的加法运算。
     *
     * @param values
     * @return
     */
    public static BigDecimal add(Number... values) {
        return NumberUtil.add(values);
    }

    /**
     * 提供精确的加法运算。
     *
     * @param list
     * @return
     */
    public static BigDecimal add(List<Number> list) {
        return add(list.toArray(new Number[list.size()]));
    }

    /**
     * 提供精确的加法运算。
     *
     * @param v1 被加数
     * @param v2 加数
     * @return 两个参数的和
     */
    public static double add(double v1, double v2) {
        return NumberUtil.add(v1, v2);
    }

    /**
     * 提供精确的加法运算。
     *
     * @param v1 被加数
     * @param v2 加数
     * @return 两个参数的和
     */
    public static double add(float v1, float v2) {
        return NumberUtil.add(v1, v2);
    }

    /**
     * 提供精确的减法运算。
     *
     * @param values
     * @return
     */
    public static BigDecimal sub(Number... values) {
        return NumberUtil.sub(values);
    }

    /**
     * 提供精确的减法运算。
     *
     * @param list
     * @return
     */
    public static BigDecimal sub(List<Number> list) {
        return sub(list.toArray(new Number[list.size()]));
    }

    /**
     * 提供精确的减法运算。
     *
     * @param v1 被减数
     * @param v2 减数
     * @return 两个参数的差
     */
    public static double sub(double v1, double v2) {
        return NumberUtil.sub(v1, v2);
    }

    /**
     * 提供精确的减法运算。
     *
     * @param v1 被减数
     * @param v2 减数
     * @return 两个参数的差
     */
    public static double sub(float v1, float v2) {
        return NumberUtil.sub(v1, v2);
    }

    /**
     * 提供精确的减法运算
     *
     * @param a
     * @param b
     * @return
     */
    public static Integer sub(Integer a, Integer b) {
        return Integer.valueOf(sub(a.intValue(), b.intValue()));
    }

    /**
     * 提供精确的减法运算
     *
     * @param a
     * @param b
     * @return
     */
    public static int sub(int a, int b) {
        return a - b;
    }

    /**
     * 提供精确的乘法运算。
     *
     * @param values
     * @return
     */
    public static BigDecimal mul(Number... values) {
        return NumberUtil.mul(values);
    }

    /**
     * 提供精确的乘法运算。
     *
     * @param list
     * @return
     */
    public static BigDecimal mul(List<Number> list) {
        return mul(list.toArray(new Number[list.size()]));
    }

    /**
     * 提供精确的乘法运算。
     *
     * @param v1 被乘数
     * @param v2 乘数
     * @return 两个参数的积
     */
    public static double mul(double v1, double v2) {
        return NumberUtil.mul(v1, v2);
    }

    /**
     * 提供精确的乘法运算。
     *
     * @param v1 被乘数
     * @param v2 乘数
     * @return 两个参数的积
     */
    public static double mul(float v1, float v2) {
        return NumberUtil.mul(v1, v2);
    }

    /**
     * 提供精确的乘法运算
     *
     * @param v1
     * @param v2
     * @return
     */
    public static int mul(int v1, int v2) {
        return mul(Integer.valueOf(v1), Integer.valueOf(v2)).intValue();
    }

    /**
     * 提供精确的乘法运算
     *
     * @param v1
     * @param v2
     * @return
     */
    public static Integer mul(Integer v1, Integer v2) {
        return Integer.valueOf(new BigDecimal(v1.toString()).multiply(new BigDecimal(v2.toString())).intValue());
    }

    /**
     * 提供精确的乘法运算
     *
     * @param v1
     * @param v2
     * @return
     */
    public static long mul(long v1, long v2) {
        return mul(Long.valueOf(v1), Long.valueOf(v2)).longValue();
    }

    /**
     * 提供精确的乘法运算
     *
     * @param v1
     * @param v2
     * @return
     */
    public static Long mul(Long v1, Long v2) {
        return Long.valueOf(new BigDecimal(v1.toString()).multiply(new BigDecimal(v2.toString())).longValue());
    }

    /**
     * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指定精度，以后的数字四舍五入。
     *
     * @param v1 被除数
     * @param v2 除数
     * @return 两个参数的商
     */
    public static double div(double v1, double v2) {
        return div(v1, v2, DEF_DIV_SCALE);
    }

    /**
     * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指定精度，以后的数字四舍五入。
     *
     * @param v1    被除数
     * @param v2    除数
     * @param scale 表示表示需要精确到小数点以后几位
     * @return 两个参数的商
     */
    public static double div(double v1, double v2, int scale) {
        return NumberUtil.div(v1, v2, scale);
    }

    /**
     * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指定精度，以后的数字四舍五入。
     *
     * @param v1
     * @param v2
     * @return
     */
    public static BigDecimal div(Number v1, Number v2) {
        return div(v1, v2, DEF_DIV_SCALE);
    }

    /**
     * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指定精度，以后的数字四舍五入。
     *
     * @param v1
     * @param v2
     * @param scale
     * @return
     */
    public static BigDecimal div(Number v1, Number v2, int scale) {
        return NumberUtil.div(v1, v2, scale);
    }

    /**
     * 取余数  BigDecimal
     *
     * @param v1    被除数
     * @param v2    除数
     * @param scale 小数点后保留几位
     * @return 余数
     */
    public static BigDecimal remainder(BigDecimal v1, BigDecimal v2, int scale) {
        return v1.remainder(v2).setScale(scale, BigDecimal.ROUND_HALF_UP);
    }

    /**
     * 提供精确的小数位四舍五入处理。
     *
     * @param value 需要四舍五入的数字
     * @param scale 小数点后保留几位
     * @return 四舍五入后的结果
     */
    public static double round(double value, int scale) {
        if (scale < 0) {
            throw new IllegalArgumentException("The scale must be a positive integer or zero");
        }
        BigDecimal two = new BigDecimal(Double.toString(value));
        BigDecimal one = new BigDecimal("1");
        return two.divide(one, scale, RoundingMode.HALF_UP).doubleValue();
    }

    /**
     * 提供精确的小数位四舍五入处理
     *
     * @param value
     * @param scale
     * @return
     */
    public static double round(BigDecimal value, int scale) {
        if (scale < 0) {
            throw new IllegalArgumentException("The scale must be a positive integer or zero");
        }
        BigDecimal one = new BigDecimal("1");
        return value.divide(one, scale, RoundingMode.HALF_UP).doubleValue();
    }

    /**
     * 取反(小数类型)
     *
     * @param value
     * @return
     */
    public static double negateExact(double value) {
        return mul(value, -1.0D);
    }

    /**
     * 取反(整型)
     *
     * @param value
     * @return
     */
    public static int negateExact(int value) {
        return Math.negateExact(value);
    }

    /**
     * 取反(长整型)
     *
     * @param value
     * @return
     */
    public static long negateExact(long value) {
        return Math.negateExact(value);
    }
}
