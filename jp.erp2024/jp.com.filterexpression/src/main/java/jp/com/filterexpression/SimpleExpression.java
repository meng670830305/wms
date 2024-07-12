package jp.com.filterexpression;

/**
 * @author wangyunpeng
 *
 */
public class SimpleExpression extends AbstractExpression {

	private String _propertyName;
	private Object _value;
	private String _op;

	/**
	 * 简单的过滤条件
	 * 
	 * @param propertyName
	 *            属性名称
	 * @param value
	 *            属性值
	 * @param op
	 *            判断条件
	 */
	public SimpleExpression(String propertyName, Object value, String op) {
		super();
		this._propertyName = propertyName;
		this._value = value;
		this._op = op;
	}

	/**
	 * Gets the named Property for the Expression.
	 * 
	 * @return A string that is the name of the Property.
	 */

	public String getPropertyName() {
		return this._propertyName;
	}

	/**
	 * Gets the Value for the Expression.
	 * 
	 * @return An object that is the value for the Expression.
	 */

	public Object getValue() {
		return this._value;
	}

	/**
	 * 判断条件
	 * 
	 * @return
	 */

	public String getOp() {
		return this._op;
	}

	private String valueToStrings() {
		String result = null;
		if (this._value == null) {
			return "null";
		}
		if ((this._value instanceof String) || (this._value instanceof java.util.Date) || (this._value instanceof java.util.UUID)) {
			result = String.format("'%s'", this._value.toString());
		} else {
			result = this._value.toString();
		}
		return result;
	}

	@Override
	public String toString() {
		return this._propertyName + this._op + this.valueToStrings();
	}

}
