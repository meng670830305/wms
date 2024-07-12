package jp.com.helper;

/**
 * <pre>
 * 日志帮助类
 * </pre>
 *
 * @author wangyunpeng
 * @date 2021/5/12 15:58
 * @wechat wyp_blog
 * @company ㍿○○○○
 */
public class LoggerHelper {

    /**
     * 写入程序信息
     *
     * @param logger  日志对象
     * @param message 日志内容
     */
    public static void info(org.slf4j.Logger logger, String message) {
        if (logger.isInfoEnabled()) {
            logger.info(message);
        }
    }

    /**
     * 写入程序信息
     *
     * @param logger 日志对象
     * @param format 格式化字符串，占位符：{}
     * @param args   写入到格式化字符串里面的信息
     */
    public static void info(org.slf4j.Logger logger, String format, Object... args) {
        if (logger.isInfoEnabled()) {
            logger.info(format, args);
        }
    }

    /**
     * 写入程序信息
     *
     * @param logger    日志对象
     * @param exception 异常对象
     * @param format    格式化字符串，占位符： %s 或 %d
     * @param args      写入到格式化字符串里面的信息
     */
    public static void info(org.slf4j.Logger logger, Throwable exception, String format, Object... args) {
        if (logger.isInfoEnabled()) {
            logger.info(String.format(format, args), exception);
        }
    }

    /**
     * 写入调试信息
     *
     * @param logger  日志对象
     * @param message 日志内容
     */
    public static void debug(org.slf4j.Logger logger, String message) {
        if (logger.isDebugEnabled()) {
            logger.debug(message);
        }
    }

    /**
     * 写入调试信息
     *
     * @param logger 日志对象
     * @param format 格式化字符串，占位符：{}
     * @param args   写入到格式化字符串里面的信息
     */
    public static void debug(org.slf4j.Logger logger, String format, Object... args) {
        if (logger.isDebugEnabled()) {
            logger.debug(format, args);
        }
    }

    /**
     * 写入调试信息
     *
     * @param logger    日志对象
     * @param exception 异常对象
     * @param format    格式化字符串，占位符： %s 或 %d
     * @param args      写入到格式化字符串里面的信息
     */
    public static void debug(org.slf4j.Logger logger, Throwable exception, String format, Object... args) {
        if (logger.isDebugEnabled()) {
            logger.debug(String.format(format, args), exception);
        }
    }

    /**
     * 写入跟踪信息
     *
     * @param logger  日志对象
     * @param message 日志内容
     */
    public static void trace(org.slf4j.Logger logger, String message) {
        if (logger.isTraceEnabled()) {
            logger.trace(message);
        }
    }

    /**
     * 写入跟踪信息
     *
     * @param logger 日志对象
     * @param format 格式化字符串，占位符：{}
     * @param args   写入到格式化字符串里面的信息
     */
    public static void trace(org.slf4j.Logger logger, String format, Object... args) {
        if (logger.isTraceEnabled()) {
            logger.trace(format, args);
        }
    }

    /**
     * 写入跟踪信息
     *
     * @param logger    日志对象
     * @param exception 异常对象
     * @param format    格式化字符串，占位符：%s占位符： %s 或 %d
     * @param args      写入到格式化字符串里面的信息
     */
    public static void trace(org.slf4j.Logger logger, Throwable exception, String format, Object... args) {
        if (logger.isTraceEnabled()) {
            logger.trace(String.format(format, args), exception);
        }
    }

    /**
     * 写入警告信息
     *
     * @param logger  日志对象
     * @param message 日志内容
     */
    public static void warn(org.slf4j.Logger logger, String message) {
        if (logger.isWarnEnabled()) {
            logger.warn(message);
        }
    }

    /**
     * 写入警告信息
     *
     * @param logger 日志对象
     * @param format 格式化字符串，占位符：{}
     * @param args   写入到格式化字符串里面的信息
     */
    public static void warn(org.slf4j.Logger logger, String format, Object... args) {
        if (logger.isWarnEnabled()) {
            logger.warn(format, args);
        }
    }

    /**
     * 写入警告信息
     *
     * @param logger    日志对象
     * @param exception 异常对象
     * @param format    格式化字符串，占位符： %s 或 %d
     * @param args      写入到格式化字符串里面的信息
     */
    public static void warn(org.slf4j.Logger logger, Throwable exception, String format, Object... args) {
        if (logger.isWarnEnabled()) {
            logger.warn(String.format(format, args), exception);
        }
    }

    /**
     * 写入错误信息
     *
     * @param logger  日志对象
     * @param message 日志内容
     */
    public static void error(org.slf4j.Logger logger, String message) {
        if (logger.isErrorEnabled()) {
            logger.error(message);
        }
    }

    /**
     * 写入错误信息
     *
     * @param logger 日志对象
     * @param format 格式化字符串，占位符：{}
     * @param args   写入到格式化字符串里面的信息
     */
    public static void error(org.slf4j.Logger logger, String format, Object... args) {
        if (logger.isErrorEnabled()) {
            logger.error(format, args);
        }
    }

    /**
     * 写入错误信息
     *
     * @param logger    日志对象
     * @param exception 异常对象
     * @param format    格式化字符串，占位符： %s 或 %d
     * @param args      写入到格式化字符串里面的信息
     */
    public static void error(org.slf4j.Logger logger, Throwable exception, String format, Object... args) {
        if (logger.isErrorEnabled()) {
            logger.error(String.format(format, args), exception);
        }
    }
}
