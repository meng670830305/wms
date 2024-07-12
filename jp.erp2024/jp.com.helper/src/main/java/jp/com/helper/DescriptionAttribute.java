/**
 * 
 */
package jp.com.helper;

import org.apache.commons.lang3.StringUtils;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 模式实现C#中的DescriptionAttribute。
 * 
 * @author wangyunpeng
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD, ElementType.TYPE })
public @interface DescriptionAttribute {
	String description() default StringUtils.EMPTY;
}
