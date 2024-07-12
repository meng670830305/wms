package jp.com.helper;

import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.*;

/**
 * 枚举帮助类
 *
 * @author wangyunpeng
 * @date 2020/11/7 13:48
 */
public class EnumHelper {
    /**
     * 通过枚举值获取它的描述
     *
     * @param item
     * @return
     * @throws NoSuchFieldException
     * @throws SecurityException
     */
    public static <E extends Enum<E>> String getEnumDescription(Enum<E> item) throws NoSuchFieldException, SecurityException {
        String description = item.name();
        Field field = item.getClass().getField(description);
        DescriptionAttribute descriptionAttribute = field.getAnnotation(DescriptionAttribute.class);
        if (descriptionAttribute != null && StringUtils.isNotBlank(descriptionAttribute.description())) {
            description = descriptionAttribute.description();
        }
        return description;
    }

    /**
     * 返回枚举类型的字典集合
     *
     * @param enumType 枚举类型
     * @param <E>
     * @return
     */
    public static <T, E extends Enum<E>> Map<T, String> getEnumMap(Class<E> enumType) {
        EnumSet<E> enumSet = EnumSet.allOf(enumType);
        Map<T, String> enumMap = new LinkedHashMap<T, String>(enumSet.size());
        enumSet.stream().forEachOrdered(x -> enumMap.put(((IEnumValue<T>) x).getValue(), x.name()));
        return enumMap;
    }

    /**
     * 返回枚举类型的数组（返回EnumSet<E>类型的数组）
     *
     * @param enumType 枚举类型
     * @param <E>
     * @return
     */
    public static <E extends Enum<E>> EnumSet<E> getValues(Class<E> enumType) {
        return EnumSet.allOf(enumType);
    }

    /**
     * 将枚举的名称转成枚举类型的对象
     *
     * @param enumType 枚举类型
     * @param enumName 枚举名称
     * @return
     */
    public static <E extends Enum<E>> E name2Enum(Class<E> enumType, String enumName) {
        return Enum.valueOf(enumType, enumName);
    }

    /**
     * 将枚举类型的对象转成枚举的数值
     *
     * @param enumValue
     * @param <E>
     * @return
     */
    public static <T, E extends Enum<E>> T enum2Value(E enumValue) {
        return Objects.requireNonNull((IEnumValue<T>) enumValue).getValue();
    }

    /**
     * 将枚举类型的对象转成枚举的名称
     *
     * @param enumValue 枚举值
     * @return
     */
    public static <E extends Enum<E>> String enum2Name(E enumValue) {
        return enumValue.name();
    }

    /**
     * 将枚举类型的值转成枚举的名称
     *
     * @param enumType 枚举类型
     * @param value    枚举类型某一个的值
     * @param <E>
     * @return
     */
    public static <T, E extends Enum<E>> String value2Name(Class<E> enumType, T value) {
        return value2Name(getValues(enumType), value);
    }

    /**
     * 将枚举类型的值转成枚举的名称
     *
     * @param values 枚举类型里所有的值
     * @param value  枚举类型某一个的值
     * @param <E>
     * @return
     */
    public static <T, E extends Enum<E>> String value2Name(EnumSet<E> values, T value) {
        String name = null;
        Optional<E> optional = values.stream().filter(item -> Objects.requireNonNull((IEnumValue<T>) item).getValue() == value).findFirst();
        if (optional.isPresent()) {
            name = optional.get().name();
        }
        return name;
    }

    /**
     * 将一组字符串内容转换成指定枚举类型的数组
     *
     * @param enumType  枚举类型
     * @param enumNames 枚举名称
     * @return
     */
    public static <E extends Enum<E>> E[] names2Enums(Class<E> enumType, String... enumNames) {
        int length = enumNames.length;
        E[] enums = (E[]) Array.newInstance(enumType, length);
        for (int i = 0; i < length; i++) {
            enums[i] = name2Enum(enumType, enumNames[i]);
        }
        return enums;
    }

    /**
     * 将一组枚举值转换成指定枚举类型的数组
     *
     * @param enumType   枚举类型
     * @param enumValues 枚举值
     * @param <E>
     * @return
     */
    public static <T, E extends Enum<E>> E[] values2Enums(Class<E> enumType, T... enumValues) {
        int length = enumValues.length;
        EnumSet<E> values = getValues(enumType);
        String[] names = new String[length];
        for (int i = 0; i < length; i++) {
            names[i] = value2Name(values, enumValues[i]);
        }
        return names2Enums(enumType, names);
    }

    /**
     * 得到枚举值对应的枚举顺序的索引，默认从0开始。
     *
     * @param enumValue 枚举值
     * @return 索引
     */
    public static <E extends Enum<E>> int enmu2Ordinal(E enumValue) {
        return enumValue.ordinal();
    }

    /**
     * 将枚举顺序的索引转成枚举类值
     *
     * @param enumType 枚举类型
     * @param ordinal  索引
     * @return
     */
    public static <E extends Enum<E>> E ordinal2Enum(Class<E> enumType, int ordinal) {
        return enumType.getEnumConstants()[ordinal];
    }

}
