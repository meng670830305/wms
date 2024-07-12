/**
 * 
 */
package jp.com.filterexpression;

import com.alibaba.fastjson2.annotation.JSONField;
import org.apache.commons.lang3.StringUtils;

/**
 * 筛选抽象基类
 * 
 * @author wangyunpeng
 *
 */
@SuppressWarnings("serial")
public abstract class FieldFilter implements java.io.Serializable {
	/**
	 * 是否显示关闭按钮，true表示显示，false表示不显示。
	 */
	private boolean _close = true;
	/**
	 * 获取或者设置 排序.(数值的绝对值大小代表排序的优先级，1的优先级比10的优先级高,-1和1的优先级一样高。) 负数：倒序，如 -1 正数：正序，如 2 0：不排序(默认值)
	 */
	private int _sort = 0;
	/**
	 * 获取或者设置字段名称
	 */
	private String _fieldName = StringUtils.EMPTY;
	/**
	 * 获取或者设置字段过滤先后顺序
	 */
	private int _fieldWherePriority = 0;
	/**
	 * 获取或者设置字段排序先后顺序
	 */
	private int _fieldOrderByPriority = 0;

	protected abstract boolean isEmpty();

	public FieldFilter() {
	}

	/**
	 * 获取 是否显示关闭按钮
	 */
	@JSONField(name = "Close")
	public boolean getClose() {
		return _close;
	}

	/**
	 * 设置 是否显示关闭按钮
	 */
	@JSONField(name = "Close")
	public void setClose(boolean close) {
		this._close = close;
	}

	/**
	 * 获取 排序.(数值的绝对值大小代表排序的优先级，1的优先级比10的优先级高,-1和1的优先级一样高。) 负数：倒序，如 -1 正数：正序，如 2 0：不排序(默认值)
	 */
	@JSONField(name = "Sort")
	public int getSort() {
		return this._sort;
	}

	/**
	 * 设置 排序.(数值的绝对值大小代表排序的优先级，1的优先级比10的优先级高,-1和1的优先级一样高。) 负数：倒序，如 -1 正数：正序，如 2 0：不排序(默认值)
	 */
	@JSONField(name = "Sort")
	public void setSort(int sort) {
		this._sort = sort;
	}

	/**
	 * 获取字段名称
	 * 
	 * @return
	 */
	@JSONField(name = "FieldName")
	public String getFieldName() {
		return this._fieldName;
	}

	/**
	 * 设置字段名称
	 * 
	 * @param fieldName
	 */
	@JSONField(name = "FieldName")
	void setFieldName(String fieldName) {
		this._fieldName = fieldName;
	}

	/**
	 * 获取字段过滤先后顺序
	 * 
	 * @return
	 */
	@JSONField(name = "FieldWherePriority")
	int getFieldWherePriority() {
		return this._fieldWherePriority;
	}

	/**
	 * 设置字段过滤先后顺序
	 * 
	 * @param fieldWherePriority
	 */
	@JSONField(name = "FieldWherePriority")
	void setFieldWherePriority(int fieldWherePriority) {
		this._fieldWherePriority = fieldWherePriority;
	}

	/**
	 * 获取字段排序先后顺序
	 * 
	 * @return
	 */
	@JSONField(name = "FieldOrderByPriority")
	int getFieldOrderByPriority() {
		return this._fieldOrderByPriority;
	}

	/**
	 * 设置字段排序先后顺序
	 * 
	 * @param fieldOrderByPriority
	 */
	@JSONField(name = "FieldOrderByPriority")
	void setFieldOrderByPriority(int fieldOrderByPriority) {
		this._fieldOrderByPriority = fieldOrderByPriority;
	}

	public boolean IsEmpty() {
		return this.isEmpty();
	}

	/**
	 * 构建查询条件列表
	 * 
	 * @param list
	 *            查询条件列表
	 */
	abstract void buildCriteria(ExpressionList list);
}
