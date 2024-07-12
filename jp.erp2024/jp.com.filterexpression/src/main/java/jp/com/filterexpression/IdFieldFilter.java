/**
 * 
 */
package jp.com.filterexpression;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 * @author wangyunpeng
 *
 */
@SuppressWarnings("serial")
@FieldOrderByAttribute(priority=Integer.MIN_VALUE)
public class IdFieldFilter<T> extends FieldFilter implements java.io.Serializable{
	private T _value = null;

	public IdFieldFilter(T value) {
		this._value = value;
	}

	public IdFieldFilter() {
		super();
	}
	
	@JSONField(name = "Value")
	public T getValue() {
		return this._value;
	}

	@JSONField(name = "Value")
	public void setValue(T value) {
		this._value = value;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see tlz.filterexpression.FieldFilter#isEmpty()
	 */
	@Override
	protected boolean isEmpty() {
		return this._value == null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see tlz.filterexpression.FieldFilter#buildCriteria(tlz.filterexpression.ExpressionList)
	 */
	@Override
	void buildCriteria(ExpressionList list) {
		if (this.isEmpty()) {
			return;
		}
		SimpleExpression simpleExpression = new SimpleExpression(super.getFieldName(), this.getValue(), "=");
		list.add(simpleExpression);
	}

}
