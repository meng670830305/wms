package jp.web.erp2024.website.config.security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 验证用户是否具有页面上某一组按钮的操作权限，该类用在Action上面。
 * 与UnpermissionAttribute正好相反
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface PermissionAttribute {
    String[] value() default {};
}