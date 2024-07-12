package jp.com.helper;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;

/**
 * 基础数据类型转换帮助类
 *
 * @author wangyunpeng
 * @date 2020/11/7 13:48
 */
public class TypeParseHelper {
    /**
     * 将对象转换成Int数据类型
     *
     * @param object
     * @return
     */
    public static int strToInt32(Object object) {
        int result = 0;
        if (object instanceof String) {
            result = strToInt32((String) object);
        } else if (object != null) {
            result = strToInt32(object.toString());
        }
        return result;
    }

    /**
     * 将对象转换成Integer数据类型
     *
     * @param object
     * @return
     */
    public static Integer strToInteger(Object object) {
        return Integer.valueOf(strToInt32(object));
    }

    /**
     * 将字符串转换成Int数据类型
     *
     * @param string 要转换的字符串
     * @return
     */
    public static int strToInt32(String string) {
        int result = 0;
        if (StringUtils.isNotBlank(string)) {
            try {
                result = Integer.parseInt(string);
            } catch (NumberFormatException e) {
                result = 0;
            }
        }
        return result;
    }

    /**
     * 将字符串转换成Integer数据类型
     *
     * @param string
     * @return
     */
    public static Integer strToInteger(String string) {
        return Integer.valueOf(strToInt32(string));
    }

    public static Integer strTryToInteger(String string) {
        return strTryToInteger(string, 0);
    }

    public static Integer strTryToInteger(String string, Integer defaultVaule) {
        try {
            return Integer.valueOf(strToInt32(string));
        } catch (Exception e) {
            return defaultVaule;
        }

    }

    /**
     * 将字符串数组转换成Int数组类型
     *
     * @param strings
     * @return
     */
    public static int[] strsToInt32s(String[] strings) {
        int[] results = null;
        if (strings != null) {
            int length = strings.length;
            results = new int[length];
            for (int i = 0; i < length; i++) {
                results[i] = TypeParseHelper.strToInt32(strings[i]);
            }
        }
        return results;
    }

    /**
     * 将字符串数组转换成Integer数组类型
     *
     * @param strings
     * @return
     */
    public static Integer[] strsToIntegers(String[] strings) {
        Integer[] results = null;
        if (strings != null) {
            int length = strings.length;
            results = new Integer[length];
            for (int i = 0; i < length; i++) {
                results[i] = Integer.valueOf(TypeParseHelper.strToInt32(strings[i]));
            }
        }
        return results;
    }

    /**
     * 将对象转换成long数据类型
     *
     * @param object
     * @return
     */
    public static long strTolong(Object object) {
        long result = 0L;
        if (object instanceof String) {
            result = strToLong((String) object);
        } else if (object != null) {
            result = strToLong(object.toString());
        }
        return result;
    }

    /**
     * 将对象转换成Long数据类型
     *
     * @param object
     * @return
     */
    public static Long strToLong(Object object) {
        return Long.valueOf(strTolong(object));
    }

    /**
     * 将字符串转换成long数据类型
     *
     * @param string 要转换的字符串
     * @return
     */
    public static long strTolong(String string) {
        long result = 0L;
        if (StringUtils.isNotBlank(string)) {
            try {
                result = Long.parseLong(string);
            } catch (NumberFormatException e) {
                result = 0L;
            }
        }
        return result;
    }

    /**
     * 将字符串转换成Long数据类型
     *
     * @param string 要转换的字符串
     * @return
     */
    public static Long strToLong(String string) {
        return Long.valueOf(strTolong(string));
    }

    /**
     * 将对象转换成boolean数据类型
     *
     * @param object
     * @return
     */
    public static boolean strToboolean(Object object) {
        boolean result = false;
        if (object instanceof String) {
            result = strToBoolean((String) object);
        } else if (object != null) {
            result = strToBoolean(object.toString());
        }
        return result;
    }

    /**
     * 将对象转换成Boolean数据类型
     *
     * @param object
     * @return
     */
    public static Boolean strToBoolean(Object object) {
        return Boolean.valueOf(strToboolean(object));
    }

    /**
     * 将字符串转换成boolean数据类型
     *
     * @param string
     * @return
     */
    public static boolean strToboolean(String string) {
        boolean result = false;
        if (StringUtils.isNotBlank(string)) {
            result = BooleanUtils.toBoolean(string);
        }
        return result;
    }

    /**
     * 将字符串转换成Boolean数据类型
     *
     * @param string
     * @return
     */
    public static Boolean strToBoolean(String string) {
        return Boolean.valueOf(strToboolean(string));
    }

    /**
     * 将对象转换成double数据类型
     *
     * @param object
     * @return
     */
    public static double strTodouble(Object object) {
        double result = 0.0D;
        if (object instanceof String) {
            result = strToDouble((String) object);
        } else if (object != null) {
            result = strToDouble(object.toString());
        }
        return result;
    }

    /**
     * 将对象转换成Double数据类型
     *
     * @param object
     * @return
     */
    public static double strToDouble(Object object) {
        return Double.valueOf(strTodouble(object));
    }

    /**
     * 将字符串转换成double数据类型
     *
     * @param string
     * @return
     */
    public static double strTodouble(String string) {
        double result = 0.0D;
        if (StringUtils.isNotBlank(string)) {
            try {
                result = Double.parseDouble(string);
            } catch (NumberFormatException e) {
                result = 0.0D;
            }
        }
        return result;
    }

    /**
     * 将字符串转换成Double数据类型
     *
     * @param string
     * @return
     */
    public static Double strToDouble(String string) {
        return Double.valueOf(strTodouble(string));
    }

    /**
     * 将对象转换成float数据类型
     *
     * @param object
     * @return
     */
    public static float strTofloat(Object object) {
        float result = 0.0F;
        if (object instanceof String) {
            result = strToFloat((String) object);
        } else if (object != null) {
            result = strToFloat(object.toString());
        }
        return result;
    }

    /**
     * 将对象转换成Float数据类型
     *
     * @param object
     * @return
     */
    public static Float strToFloat(Object object) {
        return Float.valueOf(strTofloat(object));
    }

    /**
     * 将字符串转换成float数据类型
     *
     * @param string
     * @return
     */
    public static float strTofloat(String string) {
        float result = 0.0F;
        if (StringUtils.isNotBlank(string)) {
            try {
                result = Float.parseFloat(string);
            } catch (NumberFormatException e) {
                result = 0.0F;
            }
        }
        return result;
    }

    /**
     * 将字符串转换成Float数据类型
     *
     * @param string
     * @return
     */
    public static Float strToFloat(String string) {
        return Float.valueOf(strTofloat(string));
    }

    /**
     * double转int类型
     *
     * @param value
     * @return
     * @author wangyunpeng
     * @since JDK 1.7.79
     */
    public static int doubleToInt(double value) {
        return DoubleToInt(Double.valueOf(value));
    }

    /**
     * Double转int类型
     *
     * @param value
     * @return
     * @author wangyunpeng
     * @since JDK 1.7.79
     */
    public static int DoubleToInt(Double value) {
        return value.intValue();
    }

    /**
     * double转Integer类型
     *
     * @param value
     * @return
     * @author wangyunpeng
     * @since JDK 1.7.79
     */
    public static Integer doubleToInteger(double value) {
        return DoubleToInteger(Double.valueOf(value));
    }

    /**
     * Double转Integer类型
     *
     * @param value
     * @return
     * @author wangyunpeng
     * @since JDK 1.7.79
     */
    public static Integer DoubleToInteger(Double value) {
        return Integer.valueOf(value.intValue());
    }

    /**
     * double转int类型
     *
     * @param value
     * @return
     * @author wangyunpeng
     * @since JDK 1.7.79
     */
    public static int floatToInt(float value) {
        return FloatToInt(Float.valueOf(value));
    }

    /**
     * Double转int类型
     *
     * @param value
     * @return
     * @author wangyunpeng
     * @since JDK 1.7.79
     */
    public static int FloatToInt(Float value) {
        return value.intValue();
    }

    /**
     * Double转String类型（保留几位小数）
     *
     * @param value
     * @param digits 保留几位小数
     * @return
     * @author wangyunpeng
     * @since JDK 1.7.79
     */
    public static String doubleToString(double value, int digits) {
        if (digits == 2) {
            return new DecimalFormat("0.00").format(value);
        } else if (digits == 1) {
            return new DecimalFormat("0.0").format(value);
        } else {
            return new DecimalFormat("0").format(value);
        }
    }

    /**
     * Double转String类型（最多保留两位小数）
     *
     * @param value
     * @return
     */
    public static String doubleToString(double value) {
        return new DecimalFormat("0.##").format(value);
    }

    /**
     * Double转String类型（保留几位小数）
     *
     * @param value
     * @param digits 保留几位小数
     * @return
     * @author wangyunpeng
     * @since JDK 1.7.79
     */
    public static String DoubleToString(Double value, int digits) {
        if (value == null) {
            return null;
        }
        return doubleToString(value.doubleValue(), digits);
    }

    /**
     * Double转String类型（最多保留两位小数）
     *
     * @param value
     * @return
     */
    public static String DoubleToString(Double value) {
        if (value == null) {
            return null;
        }
        return doubleToString(value.doubleValue());
    }

    /**
     * float转String类型（保留几位小数）
     *
     * @param value
     * @param digits 保留几位小数
     * @return
     * @author wangyunpeng
     * @since JDK 1.7.79
     */
    public static String floatToString(float value, int digits) {
        return FloatToString(Float.valueOf(value), digits);
    }

    /**
     * float转String类型（最多保留两位小数）
     *
     * @param value
     * @return
     */
    public static String floatToString(float value) {
        return FloatToString(Float.valueOf(value));
    }

    /**
     * Float转String类型（保留几位小数）
     *
     * @param value
     * @param digits 保留几位小数
     * @return
     * @author wangyunpeng
     * @since JDK 1.7.79
     */
    public static String FloatToString(Float value, int digits) {
        if (value == null) {
            return null;
        }
        return doubleToString(value.doubleValue(), digits);
    }

    /**
     * Float转String类型（最多保留两位小数）
     *
     * @param value
     * @return
     */
    public static String FloatToString(Float value) {
        if (value == null) {
            return null;
        }
        return doubleToString(value.doubleValue());
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @return
     */
    public static String floatToPercentString(float value) {
        return FloatToPercentString(Float.valueOf(value));
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @return
     */
    public static String FloatToPercentString(Float value) {
        return doubleToPercentString(value.doubleValue());
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @param scale
     * @return
     */
    public static String floatToPercentString(float value, int scale) {
        return FloatToPercentString(Float.valueOf(value), scale);
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @param scale
     * @return
     */
    public static String FloatToPercentString(Float value, int scale) {
        return doubleToPercentString(value.doubleValue(), scale);
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @return
     */
    public static String doubleToPercentString(double value) {
        return doubleToPercentString(value, 2);
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @return
     */
    public static String DoubleToPercentString(Double value) {
        return doubleToPercentString(value.doubleValue(), 2);
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @param scale
     * @return
     */
    public static String doubleToPercentString(double value, int scale) {
        NumberFormat numberFormat = NumberFormat.getPercentInstance();
        numberFormat.setMaximumFractionDigits(scale);
        //去掉逗号
        numberFormat.setGroupingUsed(false);
        return numberFormat.format(value);
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @param scale
     * @return
     */
    public static String DoubleToPercentString(Double value, int scale) {
        return doubleToPercentString(value.doubleValue(), scale);
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @return
     */
    public static String longToPercentString(long value) {
        NumberFormat numberFormat = NumberFormat.getPercentInstance();
        numberFormat.setMaximumFractionDigits(2);
        //去掉逗号
        numberFormat.setGroupingUsed(false);
        return numberFormat.format(value);
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @return
     */
    public static String LongToPercentString(Long value) {
        return longToPercentString(value.longValue());
    }

    /**
     * int类型转char类型
     *
     * @param i
     * @return
     */
    public static char intToChar(int i) {
        return Character.forDigit(i, 10);
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @return
     */
    public static String intToPercentString(int value) {
        return IntegerToPercentString(Integer.valueOf(value));
    }

    /**
     * 格式化带有 % 的字符串
     *
     * @param value
     * @return
     */
    public static String IntegerToPercentString(Integer value) {
        return longToPercentString(value.longValue());
    }

    /**
     * 将货币格式的字符串转为数字
     *
     * @param currencyString
     * @return
     * @throws ParseException
     */
    public static double currencyStringTodouble(String currencyString) throws ParseException {
        return strTodouble(currencyString.replaceAll("[¥, ]*", ""));
    }

    /**
     * 将数字转为货币格式的字符串(得到的日币符号，有点特殊)
     *
     * @param value
     * @return ￥ 1,234
     */
    public static String intToCurrencyString(int value) {
        return intToCurrencyString(value, 0);
    }

    /**
     * 将数字转为货币格式的字符串(得到的日币符号，有点特殊)
     *
     * @param value
     * @param digits 保留几位小数
     * @return ￥ 1,234
     */
    public static String intToCurrencyString(int value, int digits) {
        return longToCurrencyString(Integer.valueOf(value).longValue(), digits);
    }

    public static String IntegerToCurrencyString(Integer value) {
        return IntegerToCurrencyString(value, 0);
    }

    public static String IntegerToCurrencyString(Integer value, int digits) {
        return longToCurrencyString(value.longValue(), digits);
    }

    public static String longToCurrencyString(long value) {
        return longToCurrencyString(value, 0);
    }

    public static String longToCurrencyString(long value, int digits) {
        NumberFormat numberFormat = NumberFormat.getCurrencyInstance();
        numberFormat.setMaximumFractionDigits(digits);
        return numberFormat.format(value);
    }

    public static String LongToCurrencyString(Long value) {
        return LongToCurrencyString(value, 0);
    }

    public static String LongToCurrencyString(Long value, int digits) {
        return longToCurrencyString(value.longValue(), digits);
    }
}
