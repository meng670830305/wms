package jp.com.filterexpression;

import jp.com.helper.Date8Helper;

import java.time.LocalDateTime;

/**
 * @author wangyunpeng
 */
public class BetweenExpression extends AbstractExpression {

    private Object _high;
    private Object _low;
    private String _propertyName;

    /**
     * @param propertyName 属性名
     * @param low          低值
     * @param high         高值
     */
    public BetweenExpression(String propertyName, Object low, Object high) {
        super();
        this._propertyName = propertyName;
        this._low = low;
        this._high = high;
    }

    @Override
    public String toString() {
        String result = null;
        if (this._low instanceof LocalDateTime && this._high instanceof LocalDateTime) {
            result = String.format(
                    "%s BETWEEN '%s' AND '%s'"
                    , this._propertyName
                    , Date8Helper.toStringYYYY_MM_DD_HH_MM_SS((LocalDateTime) this._low)
                    , Date8Helper.toStringYYYY_MM_DD_HH_MM_SS((LocalDateTime) this._high)
            );
        } else if (this._low instanceof java.util.Date && this._high instanceof java.util.Date) {
            result = String.format(
                    "%s BETWEEN '%s' AND '%s'"
                    , this._propertyName
                    , Date8Helper.toStringYYYY_MM_DD_HH_MM_SS((java.util.Date) this._low)
                    , Date8Helper.toStringYYYY_MM_DD_HH_MM_SS((java.util.Date) this._high)
            );
        } else if (this._low instanceof String && this._high instanceof String) {
            result = String.format("%s BETWEEN '%s' AND '%s'", this._propertyName, this._low, this._high);
        } else {
            result = String.format("%s BETWEEN %s AND %s", this._propertyName, this._low, this._high);
        }
        return result;
    }

}
