package jp.web.erp2024.website.enums;

import jp.com.helper.EnumHelper;
import jp.com.helper.IEnumValue;
import jp.com.helper.Lambda;

import java.util.EnumSet;
import java.util.Map;

/**
 * <pre>
 *
 * </pre>
 *
 * @author wangyunpeng
 * @date 2023/11/15 22:27
 * @company ㍿○○○○
 */
public enum EBarnType implements IEnumValue<Integer> {
    普通(0),
    特別(1)
    ;

    EBarnType(int value) {
        this.value = Integer.valueOf(value);
    }


    private Integer value;

    @Override
    public Integer getValue() {
        return this.value;
    }


    /**
     * 枚举值集合
     */
    private static final EnumSet<EBarnType> EValues = EnumHelper.getValues(EBarnType.class);

    /**
     * 枚举类型的对象转成枚举的数值
     *
     * @param enumValue
     * @return
     */
    public static Integer enum2Value(EBarnType enumValue) {
        return EnumHelper.enum2Value(enumValue);
    }

    /**
     * 枚举名称的字符串转成枚举的数值
     *
     * @param name
     * @return
     */
    public static Integer name2Value(String name) {
        return EnumHelper.name2Enum(EBarnType.class, name).getValue();
    }

    /**
     * 枚举的数值转枚举名称的字符串
     *
     * @param value
     * @return
     */
    public static String value2Name(Integer value) {
        return EnumHelper.value2Name(EValues, value);
    }

    /**
     * 枚举的数值转枚举类型的对象
     *
     * @param value
     * @return
     */
    public static EBarnType value2Enum(Integer value) {
        return EBarnType.valueOf(value2Name(value));
    }

    /**
     * 枚举类型转字典集合
     *
     * @return
     */
    public static Map<String, Integer> enum2Map() {
        return Lambda.orderBy(Lambda.enum2Map(EValues), (c1, c2) -> c2.getValue().compareTo(c1.getValue()));
    }
}
