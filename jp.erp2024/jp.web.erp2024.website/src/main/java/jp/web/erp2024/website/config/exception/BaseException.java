package jp.web.erp2024.website.config.exception;

/**
 * <pre>
 * 程序异常基类
 * </pre>
 */
public abstract class BaseException extends RuntimeException {

    private static final long serialVersionUID = -2536027893927956359L;

    public BaseException(Throwable e) {
        super(e.getMessage(), e);
    }

    public BaseException(String message) {
        super(message);
    }

    public BaseException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
