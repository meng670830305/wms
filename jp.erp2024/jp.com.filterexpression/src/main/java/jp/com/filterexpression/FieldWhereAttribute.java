/**
 * 
 */
package jp.com.filterexpression;

import org.apache.commons.lang3.StringUtils;

/**
 * @author wangyunpeng
 *
 */
public @interface FieldWhereAttribute {
	/**
	 * 指定字段名称
	 * @return
	 */
	String name() default StringUtils.EMPTY;
	/**
	 * 优先级（过滤where）
	 * @return
	 */
	int priority() default 0;
}
