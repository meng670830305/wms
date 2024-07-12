package jp.web.erp2024.website.config.exception;

/**
 * <pre>
 * SQL相关的异常
 * </pre>
 */
public class SqlException extends BaseException {

    private static final long serialVersionUID = 5158011897789953298L;

    public SqlException(Throwable e) {
        super(e.getMessage(), e);
    }

    public SqlException(String message) {
        super(message);
    }

    public SqlException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
