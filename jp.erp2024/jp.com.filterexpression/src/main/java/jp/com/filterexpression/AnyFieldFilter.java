package jp.com.filterexpression;

import com.alibaba.fastjson2.annotation.JSONField;

import java.io.Serializable;

/**
 * 多值筛选条件
 * 
 * @author wangyunpeng
 *
 * @param <T>
 */
@SuppressWarnings("serial")
@FieldOrderByAttribute(priority = 30)
public class AnyFieldFilter<T> extends FieldFilter implements Serializable {
	private T[] _value = null;
	private AnyMode _mode = null;

	public AnyFieldFilter() {

	}

	public AnyFieldFilter(T[] value) {
		this(value, AnyMode.Contain);
	}

	public AnyFieldFilter(T[] value, AnyMode mode) {
		this._value = value;
		this._mode = mode;
	}

	/**
	 * @return the _value
	 */
	@JSONField(name = "Value")
	public T[] getValue() {
		return _value;
	}

	/**
	 * @param _value
	 *            the _value to set
	 */
	@JSONField(name = "Value")
	public void setValue(T[] value) {
		this._value = value;
	}

	/**
	 * @return the _mode
	 */
	@JSONField(name = "Mode")
	public AnyMode getMode() {
		return _mode;
	}

	/**
	 * @param _mode
	 *            the _mode to set
	 */
	@JSONField(name = "Mode")
	public void setMode(AnyMode mode) {
		this._mode = mode;
	}

	@Override
	protected boolean isEmpty() {
		return this._value == null || this._value.length == 0;
	}

	@Override
	void buildCriteria(ExpressionList list) {
		if (this.isEmpty()) {
			return;
		}
		if (this._value.length == 1) {
			list.add(new SimpleExpression(super.getFieldName(), this._value[0], " = "));
		} else {
			if (this._mode == AnyMode.Contain) {
				list.add(new InExpression(super.getFieldName(), this._value));
			} else if (this._mode == AnyMode.Exclude) {
				list.add(new NotExpression(super.getFieldName(), this._value));
			}
		}
	}

}
