package jp.com.filterexpression;

import com.alibaba.fastjson2.annotation.JSONField;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;

/**
 * 模糊筛选条件
 * 
 * @author wangyunpeng
 *
 */
@SuppressWarnings("serial")
@FieldOrderByAttribute(priority = 40)
public class LikeFieldFilter extends FieldFilter implements Serializable {
	private String _op = " LIKE ";
	private String _value = null;
	private LikeMode _mode = null;

	@JSONField(name = "Value")
	public String getValue() {
		return this._value;
	}

	@JSONField(name = "Value")
	public void setValue(String value) {
		this._value = value;
	}

	@JSONField(name = "Model")
	public LikeMode getMode() {
		return this._mode;
	}

	@JSONField(name = "Model")
	public void setMode(LikeMode mode) {
		this._mode = mode;
	}

	/**
	 * @return the _op
	 */
	public String getOp() {
		return this._op;
	}

	/**
	 * @param op
	 *            the _op to set
	 */
	public void setOp(String op) {
		this._op = op;
	}

	public LikeFieldFilter() {
		this((String) null);
	}

	public LikeFieldFilter(String value) {
		this(value, LikeMode.AnyWhere);
	}

	public LikeFieldFilter(String value, LikeMode mode) {
		this._value = value;
		this._mode = mode;
	}

	public LikeFieldFilter(char value) {
		this(String.valueOf(value), LikeMode.AnyWhere);
	}

	public LikeFieldFilter(char value, LikeMode mode) {
		this(String.valueOf(value), mode);
	}

	public LikeFieldFilter(int value) {
		this(String.valueOf(value), LikeMode.AnyWhere);
	}

	public LikeFieldFilter(int value, LikeMode mode) {
		this(String.valueOf(value), mode);
	}

	public LikeFieldFilter(long value) {
		this(String.valueOf(value), LikeMode.AnyWhere);
	}

	public LikeFieldFilter(long value, LikeMode mode) {
		this(String.valueOf(value), mode);
	}

	public LikeFieldFilter(float value) {
		this(String.valueOf(value), LikeMode.AnyWhere);
	}

	public LikeFieldFilter(float value, LikeMode mode) {
		this(String.valueOf(value), mode);
	}

	public LikeFieldFilter(double value) {
		this(String.valueOf(value), LikeMode.AnyWhere);
	}

	public LikeFieldFilter(double value, LikeMode mode) {
		this(String.valueOf(value), mode);
	}

	@Override
	protected boolean isEmpty() {
		return StringUtils.isBlank(this._value);
	}

	@Override
	void buildCriteria(ExpressionList list) {
		if (this.isEmpty()) {
			return;
		}
		if (this._mode == LikeMode.AnyWhere) {
			list.add(new SimpleExpression(super.getFieldName(), MatchMode.ANYWHERE.toMatchString(this._value), this._op));
		} else if (this._mode == LikeMode.End) {
			list.add(new SimpleExpression(super.getFieldName(), MatchMode.END.toMatchString(this._value), this._op));
		} else if (this._mode == LikeMode.Exact) {
			list.add(new SimpleExpression(super.getFieldName(), MatchMode.EXACT.toMatchString(this._value), this._op));
		} else if (this._mode == LikeMode.Start) {
			list.add(new SimpleExpression(super.getFieldName(), MatchMode.START.toMatchString(this._value), this._op));
		} else if (this._mode == LikeMode.EmptyOrNull) {
			list.add(new SimpleExpression(super.getFieldName(), null, " IS "));
			list.add(new SimpleExpression(super.getFieldName(), "\'\'", " = "));
		}
	}

}
