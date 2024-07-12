package jp.web.erp2024.website.config.util;

import org.thymeleaf.expression.Numbers;
import org.thymeleaf.util.StringUtils;

import java.util.Locale;

/**
 * <pre>
 * Thymeleaf标签java代码
 * </pre>
 *
 * @author wangyunpeng
 * @date 2021/7/7 6:16
 * @wechat wyp_blog
 * @company ㍿○○○○
 */
public class ThymeleafUtil {

    /**
     * 格式化数字
     *
     * @param target
     * @param minIntegerDigits   整数位至少几位
     * @param thousandsPointType 整数位千分位标识符
     * @param decimalDigits      保留几位小数
     * @param decimalPointType   小数位表示符
     * @return
     */
    public static String formatDecimal(Number target, Integer minIntegerDigits, String thousandsPointType, Integer decimalDigits, String decimalPointType) {
        return new Numbers(Locale.getDefault(Locale.Category.FORMAT)).formatDecimal(target, minIntegerDigits, thousandsPointType, decimalDigits, decimalPointType);
    }

    public static String prepend(Object target, String prefix) {
        return StringUtils.prepend(target, prefix);
    }

    public static String append(Object target, String suffix) {
        return StringUtils.append(target, suffix);
    }

    public static String concat(Object... values) {
        return StringUtils.concat(values);
    }
}
