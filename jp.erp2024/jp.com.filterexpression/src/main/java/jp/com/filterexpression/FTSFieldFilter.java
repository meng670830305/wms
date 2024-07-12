package jp.com.filterexpression;

import com.alibaba.fastjson2.annotation.JSONField;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;

/**
 * 全文索引筛选条件
 * 
 * @author wangyunpeng
 *
 */
@SuppressWarnings("serial")
@FieldOrderByAttribute(priority = 50)
public class FTSFieldFilter extends FieldFilter implements Serializable {
	private String _value = null;

	@JSONField(name = "Value")
	public String getValue() {
		return this._value;
	}

	@JSONField(name = "Value")
	public void setValue(String value) {
		this._value = value;
	}

	public FTSFieldFilter() {

	}

	public FTSFieldFilter(double value) {
		this._value = String.valueOf(value);
	}

	public FTSFieldFilter(float value) {
		this._value = String.valueOf(value);
	}

	public FTSFieldFilter(long value) {
		this._value = String.valueOf(value);
	}

	public FTSFieldFilter(int value) {
		this._value = String.valueOf(value);
	}

	public FTSFieldFilter(char value) {
		this._value = String.valueOf(value);
	}

	public FTSFieldFilter(String value) {
		this._value = value;
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
		list.add(new SqlExpression(String.format(" FREETEXT(%s,%s) ", super.getFieldName(), this._value)));
	}
}
