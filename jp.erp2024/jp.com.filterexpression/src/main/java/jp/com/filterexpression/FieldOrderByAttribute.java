/**
 * 
 */
package jp.com.filterexpression;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 类型排序的先后顺序特性
 * 在定义类型时（类型必须是继承自FieldFilter类型的子类型），单独在定义一个过滤顺序条件
 * @author wangyunpeng
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface FieldOrderByAttribute {
	/**
	 * 优先级（排序order by）
	 * @return
	 */
	int priority() default 0;
}
