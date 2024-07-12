package jp.com.filterexpression;

import com.alibaba.fastjson2.annotation.JSONField;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;

/**
 * 表达式筛选方式（此类无法定义到筛选字段中）
 * 
 * @author wangyunpeng
 *
 */
@SuppressWarnings("serial")
public class WhereFieldFilter extends FieldFilter implements Serializable {

	private String _value = null;

	@JSONField(name = "Value")
	public String getValue() {
		return this._value;
	}

	@JSONField(name = "Value")
	public void setValue(String value) {
		this._value = value;
	}

	public WhereFieldFilter(String value) {
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
		list.add(new SqlExpression(this._value));
	}

}
