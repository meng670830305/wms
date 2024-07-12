package jp.web.erp2024.website.config.util;

import jp.com.helper.Lambda;

import java.util.Properties;

/**
 * <pre>
 * 异常处理类型
 * </pre>
 *
 * @author wangyunpeng
 * @date 2021/4/27 19:26
 * @wechat wyp_blog
 * @company ㍿○○○○
 */
public class ExUtil {

    private static final String _Prefix = ExUtil.class.getPackage().getName().split("\\.")[0];

    private static final String newLine = System.getProperties().getProperty("line.separator");

    /**
     * 重置异常堆栈跟踪信息
     *
     * @param ex
     * @author: wangyunpeng
     * @date: 2021/4/27 19:27
     */
    public static void resetStackTrace(Exception ex) {
        ex.setStackTrace(Lambda.where(ex.getStackTrace(), element -> element.getClassName().startsWith(_Prefix), StackTraceElement[]::new));
    }

    /**
     * 获取最基本的错误信息
     *
     * @param error
     * @return: java.lang.String
     * @author: wangyunpeng
     * @date: 2021/4/29 12:25
     */
    public static String getError(Throwable error) {
        StringBuffer sb = new StringBuffer();
        if (error != null) {
            sb.append(error.getMessage());
            StackTraceElement[] stackTraceElements = Lambda.where(error.getStackTrace(), element -> element.getClassName().startsWith(_Prefix), StackTraceElement[]::new);
            for (StackTraceElement stackTraceElement : stackTraceElements) {
                sb.append(newLine);
                sb.append(stackTraceElement.toString());
            }
        }
        return sb.toString();
    }
}
