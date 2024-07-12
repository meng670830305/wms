package jp.com.filterexpression;

import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * 默认实现的过滤规则
 * 
 * @author wangyunpeng
 *
 */
@SuppressWarnings({"serial","unused"})
public class DefaultFilterator implements IFilterator, Serializable {

	private ExpressionList _expressionList = null;
	private Pager _pager = null;
	private List<FieldFilter> _filters = null;

	public DefaultFilterator(ExpressionList expressionList, Pager pager, List<FieldFilter> filters) {
		this._expressionList = expressionList;
		this._pager = pager;

		Collections.sort(filters, new Comparator<FieldFilter>() {
			public int compare(FieldFilter arg0, FieldFilter arg1) {
				if (arg0.getFieldOrderByPriority() == arg1.getFieldOrderByPriority()) {
					return arg0.getFieldWherePriority() - arg1.getFieldWherePriority();// 升序
				}
				return arg0.getFieldOrderByPriority() - arg1.getFieldOrderByPriority();// 升序
			}
		});
		for (FieldFilter item : filters) {
			item.buildCriteria(expressionList);// 开始写入SQL语句中的where条件
		}
		this._filters = filters;
	}

	/**
	 * 获取where条件
	 */
	public String getWhere() {
		String where = StringUtils.join(this._expressionList, " AND ");
		if (StringUtils.isBlank(where)) {
			where = " 1=1 ";
		}
		return where;
	}

	/**
	 * 获取排序字段
	 */
	public String getSortField() {
		String orderBy = null;
		List<FieldFilter> fieldFilterList = new ArrayList<FieldFilter>(this._filters.size());
		for (FieldFilter fieldFilter : this._filters) {
			if (fieldFilter.getSort() != 0) {
				fieldFilterList.add(fieldFilter);
			}
		}
		Collections.sort(fieldFilterList, new Comparator<FieldFilter>() {
			public int compare(FieldFilter arg0, FieldFilter arg1) {
				return Math.abs(arg0.getSort()) - Math.abs(arg1.getSort());// 升序
			}
		});
		List<String> orderByList = new ArrayList<String>(fieldFilterList.size());
		for (FieldFilter fieldFilter : fieldFilterList) {
			orderByList.add(String.format("%s %s", fieldFilter.getFieldName(), fieldFilter.getSort() > 0 ? "ASC" : "DESC"));
		}
		fieldFilterList.clear();
		fieldFilterList = null;
		orderBy = StringUtils.join(orderByList, ",");
		orderByList.clear();
		orderByList = null;
		return orderBy;
	}
}
