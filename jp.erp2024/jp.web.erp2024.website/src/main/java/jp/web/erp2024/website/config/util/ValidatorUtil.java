package jp.web.erp2024.website.config.util;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * <pre>
 * 验证数据对象里面的每个字段是否符合规范
 * </pre>
 *
 * @author wangyunpeng
 * @date 2021/1/25 21:56
 * @wechat wyp_blog
 */
public class ValidatorUtil {

    private static final Validator Validator;

    static {
        //获得验证器实例
        //Configuration<?> config = Validation.byDefaultProvider().configure();
        //ValidatorFactory factory = config.buildValidatorFactory();
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator = factory.getValidator();
        factory.close();
    }

    /**
     * 验证数据对象里面的每个字段是否符合规范
     *
     * @param object 数据对象
     * @param <T>
     * @return
     */
    public static <T> Map<String, String> validate(T object) {
        Set<ConstraintViolation<T>> constraintViolations = Validator.validate(object);
        Map<String, String> messageMap = new HashMap<>();
        for (ConstraintViolation<T> constraintViolation : constraintViolations) {
            messageMap.put(String.format("%s.%s=%s", constraintViolation.getRootBeanClass().getTypeName(), constraintViolation.getPropertyPath().toString(), constraintViolation.getInvalidValue()), constraintViolation.getMessage());
        }
        constraintViolations.clear();
        return messageMap;
    }
}
