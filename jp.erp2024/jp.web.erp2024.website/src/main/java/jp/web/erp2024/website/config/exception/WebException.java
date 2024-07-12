package jp.web.erp2024.website.config.exception;

/**
 * <pre>
 * Web相关的异常
 * </pre>
 */
public class WebException extends BaseException {

    private static final long serialVersionUID = -1572977552044643677L;

    public WebException(Throwable e) {
        super(e.getMessage(), e);
    }

    public WebException(String message) {
        super(message);
    }

    public WebException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
