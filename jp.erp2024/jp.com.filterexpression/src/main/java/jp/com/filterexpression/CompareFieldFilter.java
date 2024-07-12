package jp.com.filterexpression;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 * 比较筛选条件
 * 
 * @author wangyunpeng
 *
 * @param <T>
 */
@SuppressWarnings("serial")
@FieldOrderByAttribute(priority = 10)
public class CompareFieldFilter<T> extends FieldFilter implements java.io.Serializable {

	private T _value = null;
	private CompareOperator _operator = CompareOperator.Null;

	public CompareFieldFilter() {

	}

	public CompareFieldFilter(T value) {
		this._value = value;
	}

	public CompareFieldFilter(T value, CompareOperator operator) {
		this._value = value;
		this._operator = operator;
	}

	@JSONField(name = "Value")
	public T getValue() {
		return this._value;
	}

	@JSONField(name = "Value")
	public void setValue(T value) {
		this._value = value;
	}

	public CompareOperator getOperator() {
		return this._operator;
	}

	public void setOperator(CompareOperator operator) {
		this._operator = operator;
	}

	@Override
	protected boolean isEmpty() {
		return this._value == null && this._operator != CompareOperator.Null && this._operator != CompareOperator.NotNull;
	}

	@Override
	void buildCriteria(ExpressionList list) {
		if (this.isEmpty()) {
			return;
		}
		if (this._operator == CompareOperator.Equal) {
			list.add(new SimpleExpression(super.getFieldName(), this._value, " = "));
		} else if (this._operator == CompareOperator.NotEqual) {
			list.add(new SimpleExpression(super.getFieldName(), this._value, " <> "));
		} else if (this._operator == CompareOperator.GreaterThan) {
			list.add(new SimpleExpression(super.getFieldName(), this._value, " > "));
		} else if (this._operator == CompareOperator.GreaterThanEqual) {
			list.add(new SimpleExpression(super.getFieldName(), this._value, " >= "));
		} else if (this._operator == CompareOperator.LessThan) {
			list.add(new SimpleExpression(super.getFieldName(), this._value, " < "));
		} else if (this._operator == CompareOperator.LessThanEqual) {
			list.add(new SimpleExpression(super.getFieldName(), this._value, " <= "));
		} else if (this._operator == CompareOperator.Null) {
			list.add(new SimpleExpression(super.getFieldName(), null, " IS "));
		} else if (this._operator == CompareOperator.NotNull) {
			list.add(new SimpleExpression(super.getFieldName(), null, " NOT IS "));
		}
	}

}
