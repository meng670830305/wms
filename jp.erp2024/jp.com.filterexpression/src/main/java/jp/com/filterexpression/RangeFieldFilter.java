package jp.com.filterexpression;

import com.alibaba.fastjson2.annotation.JSONField;

import java.io.Serializable;

/**
 * 范围筛选条件
 * 
 * @author wangyunpeng
 *
 * @param <t>
 */
@SuppressWarnings("serial")
@FieldOrderByAttribute(priority = 20)
public class RangeFieldFilter<T> extends FieldFilter implements Serializable {
	private T _startValue = null;
	private T _endValue = null;

	public RangeFieldFilter() {

	}

	@JSONField(name = "StartValue")
	public T getStartValue() {
		return this._startValue;
	}

	@JSONField(name = "StartValue")
	public void setStartValue(T startValue) {
		this._startValue = startValue;
	}

	@JSONField(name = "EndValue")
	public T getEndValue() {
		return this._endValue;
	}

	@JSONField(name = "EndValue")
	public void setEndValue(T endValue) {
		this._endValue = endValue;
	}

	public RangeFieldFilter(T startValue, T endValue) {
		this._startValue = startValue;
		this._endValue = endValue;
	}

	@Override
	protected boolean isEmpty() {
		return this._startValue == null && this._endValue == null;
	}

	@Override
	void buildCriteria(ExpressionList list) {
		if (this.isEmpty()) {
			return;
		}
		if (this._startValue != null && this._endValue != null) {
			list.add(new BetweenExpression(super.getFieldName(), this._startValue, this._endValue));
		} else if (this._startValue != null) {
			list.add(new SimpleExpression(super.getFieldName(), this._startValue, " >= "));
		} else if (this._endValue != null) {
			list.add(new SimpleExpression(super.getFieldName(), this._endValue, " <= "));
		}
	}

}
