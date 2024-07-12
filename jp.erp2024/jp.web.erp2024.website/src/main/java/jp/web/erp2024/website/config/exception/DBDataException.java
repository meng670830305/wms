package jp.web.erp2024.website.config.exception;

/**
 * <pre>
 * 数据库里面的数据信息异常
 * </pre>
 */
public class DBDataException extends BaseException {

    private static final long serialVersionUID = -5501437704057641156L;

    public DBDataException(Throwable e) {
        super(e.getMessage(), e);
    }

    public DBDataException(String message) {
        super(message);
    }

    public DBDataException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
