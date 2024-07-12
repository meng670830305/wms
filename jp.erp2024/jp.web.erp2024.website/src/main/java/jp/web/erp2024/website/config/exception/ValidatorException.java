package jp.web.erp2024.website.config.exception;

/**
 * <pre>
 * 验证信息异常
 * </pre>
 */
public class ValidatorException extends BaseException {

    private static final long serialVersionUID = 3320523566073304968L;

    public ValidatorException(Throwable e) {
        super(e.getMessage(), e);
    }

    public ValidatorException(String message) {
        super(message);
    }

    public ValidatorException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
