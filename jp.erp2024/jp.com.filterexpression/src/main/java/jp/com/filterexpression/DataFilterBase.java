package jp.com.filterexpression;

import com.alibaba.fastjson2.annotation.JSONField;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**
 * 过滤器抽象类
 * 
 * @author wangyunpeng
 *
 */
@SuppressWarnings({ "serial" })
public abstract class DataFilterBase<TEntity> implements IDataFilter<TEntity>, Serializable {
	/**
	 * 获取或者设置 分页对象(可不设定，默认是页码是第1页，分页大小10)
	 */
	private Pager _pager = null;

	/**
	 * 获取 分页对象(可不设定，默认是页码是第1页，分页大小10)
	 */
	@JSONField(name = "Pager")
	public Pager getPager() {
		return this._pager;
	}

	/**
	 * 设置 分页对象(可不设定，默认是页码是第1页，分页大小10)
	 */
	public void setPager(Pager pager) {
		this._pager = pager;
	}

	/**
	 * 获取过滤器
	 * 
	 * @param expressionList
	 *            过滤条件列表
	 * @return
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */

	public IFilterator getFilterator(ExpressionList expressionList) throws IllegalArgumentException, IllegalAccessException {
		Field[] fields = this.getClass().getDeclaredFields();
		List<Field> fieldList = new ArrayList<Field>(fields.length);
		for (Field field : fields) {
			if (FieldFilter.class.isAssignableFrom(field.getType())) {
				//取出所有属性类型判断是否继承自FieldFilter类型的子类型。
				fieldList.add(field);
			}
		}
		fields = null;

		List<FieldFilter> fieldFilterList = new ArrayList<FieldFilter>(fieldList.size());
		int priority = 10;
		FieldFilter fieldFilter = null;
		FieldWhereAttribute fieldWhereAttribute = null;
		FieldOrderByAttribute fieldOrderByAttribute = null;
		for (Field field : fieldList) {
			priority += 10;
			field.setAccessible(true);
			fieldFilter = (FieldFilter) field.get(this);
			if (fieldFilter == null) {
				continue;
			}
			fieldWhereAttribute = field.getAnnotation(FieldWhereAttribute.class);
			if (fieldWhereAttribute != null) {
				if (StringUtils.isBlank(fieldWhereAttribute.name())) {
					fieldFilter.setFieldName(field.getName());
				} else {
					fieldFilter.setFieldName(fieldWhereAttribute.name());
				}
				fieldFilter.setFieldWherePriority(fieldWhereAttribute.priority());
			} else {
				fieldFilter.setFieldName(field.getName());
				fieldFilter.setFieldWherePriority(priority);
			}
			fieldOrderByAttribute = field.getType().getAnnotation(FieldOrderByAttribute.class);
			if (fieldOrderByAttribute != null) {
				fieldFilter.setFieldOrderByPriority(fieldOrderByAttribute.priority());
			} else {
				fieldFilter.setFieldOrderByPriority(Integer.MAX_VALUE);
			}
			fieldFilterList.add(fieldFilter);
		}
		fieldList.clear();
		fieldList = null;
		Pager pager = this.getPager();
		if (pager == null) {
			pager = Pager.Default;
		}
		return new DefaultFilterator(expressionList, pager, fieldFilterList);
	}
}
