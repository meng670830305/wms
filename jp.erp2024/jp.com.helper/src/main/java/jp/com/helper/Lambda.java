package jp.com.helper;

import java.util.*;
import java.util.function.*;
import java.util.stream.Collectors;

/**
 * <pre>
 * 封装Java8中的Lambda表达式。
 * 简化使用Stream操作方法，项目中不在出现 stream() 的方法，统一从这个类里面调用 stream 方法。
 * </pre>
 *
 * @author wangyunpeng
 * @wechat wyp_blog
 * @date 2021/1/17 8:48
 */
public final class Lambda {

    /**
     * 获取集合里第一个元素
     *
     * @param set 泛型集合
     * @param <T> 集合里元素的类型
     * @return
     */
    public final static <T> T first(Set<T> set) {
        return set.stream().findFirst().orElse(null);
    }

    /**
     * 获取集合里第一个元素
     *
     * @param list 泛型集合
     * @param <T>  集合里元素的类型
     * @return
     */
    public final static <T> T first(List<T> list) {
        return list.stream().findFirst().orElse(null);
    }

    /**
     * 获取数组里第一个元素
     *
     * @param array 数组类型
     * @param <T>   数组里元素的类型
     * @return
     */
    public final static <T> T first(T[] array) {
        return Arrays.stream(array).findFirst().orElse(null);
    }

    /**
     * 获取字典集合里第一个元素
     *
     * @param map 字典集合
     * @param <K> 字典里Key的类型
     * @param <V> 字典里Value的类型
     * @return
     */
    public final static <K, V> Map.Entry<K, V> first(Map<K, V> map) {
        return map.entrySet().stream().findFirst().orElse(null);
    }

    /**
     * 获取集合里满足过滤条件的第一个元素
     *
     * @param list      泛型集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param <T>       集合里元素的类型
     * @return
     */
    public final static <T> T first(List<T> list, Predicate<? super T> predicate) {
        return list.stream().filter(predicate).findFirst().orElse(null);
    }

    /**
     * 获取数组里满足过滤条件的第一个元素
     *
     * @param array     数组类型
     * @param predicate 过滤条件，例如：lambda表达式
     * @param <T>       数组里元素的类型
     * @return
     */
    public final static <T> T first(T[] array, Predicate<? super T> predicate) {
        return Arrays.stream(array).filter(predicate).findFirst().orElse(null);
    }

    /**
     * 获取字典集合里满足过滤条件的第一个元素
     *
     * @param map       字典集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param <K>       字典里Key的类型
     * @param <V>       字典里Value的类型
     * @return
     */
    public final static <K, V> Map.Entry<K, V> first(Map<K, V> map, Predicate<? super Map.Entry<K, V>> predicate) {
        return map.entrySet().stream().filter(predicate).findFirst().orElse(null);
    }

    /**
     * 判断字符串集合里面是否包含某一个字符串，不区分大小写
     *
     * @param list  字符串集合
     * @param value 某一个字符串
     * @return
     */
    public final static boolean containsIgnoreCase(List<String> list, String value) {
        return list.stream().anyMatch(item -> item.equalsIgnoreCase(value));
    }

    /**
     * 判断字符串集合里面是否包含某一个字符串，区分大小写
     *
     * @param list  字符串集合
     * @param value 某一个字符串
     * @return
     */
    public final static boolean contains(List<String> list, String value) {
        return list.stream().anyMatch(item -> item.equals(value));
    }

    /**
     * 判断整数集合里面是否包含某一个整数
     *
     * @param list
     * @param value
     * @return
     */
    public final static boolean contains(List<Integer> list, Integer value) {
        return list.stream().anyMatch(item -> item.equals(value));
    }

    /**
     * 判断字符串集合里面是否包含某一个字符串，不区分大小写
     *
     * @param set
     * @param value
     * @return
     */
    public final static boolean containsIgnoreCase(Set<String> set, String value) {
        return set.stream().anyMatch(item -> item.equalsIgnoreCase(value));
    }

    /**
     * 判断泛型集合里面是否包含某一项
     *
     * @param list      泛型集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param <T>       集合里元素的类型
     * @return
     */
    public final static <T> boolean contains(List<T> list, Predicate<? super T> predicate) {
        return list.stream().anyMatch(predicate);
    }

    /**
     * 判断字符串集合里面是否开头包含某一个字符串
     *
     * @param list
     * @param value
     * @return
     */
    public final static boolean startsWith(List<String> list, String value) {
        return list.stream().anyMatch(item -> item.startsWith(value));
    }

    /**
     * 判断字符串数组里面是否包含某一个字符串，不区分大小写
     *
     * @param array 字符串数组
     * @param value 某一个字符串
     * @return
     */
    public final static boolean containsIgnoreCase(String[] array, String value) {
        return Arrays.stream(array).anyMatch(item -> item.equalsIgnoreCase(value));
    }

    /**
     * 判断字符串数组里面是否包含某一个字符串，区分大小写
     *
     * @param array 字符串数组
     * @param value 某一个字符串
     * @return
     */
    public final static boolean contains(String[] array, String value) {
        return Arrays.stream(array).anyMatch(item -> item.equals(value));
    }

    /**
     * 判断整数数组里面是否包含某一个整数
     *
     * @param array 整数数组
     * @param value 某一个整数
     * @return
     */
    public final static boolean contains(Integer[] array, Integer value) {
        return Arrays.stream(array).anyMatch(item -> item.equals(value));
    }


    /**
     * 判断字符串数组里面是否开头包含某一个字符串
     *
     * @param array
     * @param value
     * @return
     */
    public final static boolean startsWith(String[] array, String value) {
        return Arrays.stream(array).anyMatch(item -> item.startsWith(value));
    }

    /**
     * 过滤满足条件的结果
     *
     * @param list      泛型集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param <T>       集合里元素的类型
     * @return
     */
    public final static <T> List<T> where(List<T> list, Predicate<? super T> predicate) {
        return list.stream().filter(predicate).collect(Collectors.toList());
    }

    /**
     * 过滤满足条件的结果
     *
     * @param list      泛型集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param sortField 排序字段，例如：泛型类型名::get属性名
     * @param asc       升序 or 降序
     * @param <T>       集合里元素的类型
     * @param <P>       泛型类型里某一个属性的类型
     * @return
     */
    public final static <T, P extends Comparable<? super P>> List<T> where(List<T> list, Predicate<? super T> predicate, Function<? super T, ? extends P> sortField, boolean asc) {
        if (asc) {
            return list.stream().filter(predicate).sorted(Comparator.comparing(sortField)).collect(Collectors.toList());
        } else {
            return list.stream().filter(predicate).sorted(Comparator.comparing(sortField, Comparator.reverseOrder())).collect(Collectors.toList());
        }
    }

    /**
     * 过滤满足条件的结果
     *
     * @param array     泛型数组
     * @param predicate 过滤条件，例如：lambda表达式
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>       数组里元素的类型
     * @return
     */
    public final static <T> T[] where(T[] array, Predicate<? super T> predicate, IntFunction<T[]> generator) {
        return Arrays.stream(array).filter(predicate).toArray(generator);
    }

    /**
     * 过滤满足条件的结果
     *
     * @param array     泛型数组
     * @param predicate 过滤条件，例如：lambda表达式
     * @param sortField 排序字段，例如：泛型类型名::get属性名
     * @param asc       升序 or 降序
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>       数组里元素的类型
     * @param <P>       泛型类型里某一个属性的类型
     * @return
     */
    public final static <T, P extends Comparable<? super P>> T[] where(T[] array, Predicate<? super T> predicate, Function<? super T, ? extends P> sortField, boolean asc, IntFunction<T[]> generator) {
        if (asc) {
            return Arrays.stream(array).filter(predicate).sorted(Comparator.comparing(sortField)).toArray(generator);
        } else {
            return Arrays.stream(array).filter(predicate).sorted(Comparator.comparing(sortField, Comparator.reverseOrder())).toArray(generator);
        }
    }

    /**
     * 过滤满足条件的结果
     *
     * @param map       字典集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param <K>       字典里Key的类型
     * @param <V>       字典里Value的类型
     * @return
     */
    public final static <K, V> Map<K, V> where(Map<K, V> map, Predicate<? super Map.Entry<K, V>> predicate) {
        return map.entrySet().stream().filter(predicate).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    /**
     * 泛型集合排序（基础类型）
     *
     * @param list
     * @param <T>
     * @return
     */
    public final static <T extends Comparable<? super T>> List<T> orderby(List<T> list) {
        Collections.sort(list);
        return list;
    }

    /**
     * 泛型集合排序（自定义类型）
     *
     * @param list
     * @param comparator
     * @param <T>
     * @return
     */
    public final static <T> List<T> orderby(List<T> list, Comparator<? super T> comparator) {
        Collections.sort(list, comparator);
        return list;
    }

    /**
     * 泛型数组排序（基础类型）
     *
     * @param array
     * @param <T>
     * @return
     */
    public final static <T extends Comparable<? super T>> T[] orderby(T[] array) {
        Arrays.sort(array);
        return array;
    }

    /**
     * 泛型数组排序（自定义类型）
     *
     * @param array
     * @param comparator
     * @param <T>
     * @return
     */
    public final static <T> T[] orderby(T[] array, Comparator<? super T> comparator) {
        Arrays.sort(array, comparator);
        return array;
    }

    /**
     * 泛型集合排序
     *
     * @param list       泛型集合
     * @param comparator 排序条件
     * @param <T>        集合里元素的类型
     * @param <P>        泛型类型里某一个属性的类型
     * @return
     */
    public final static <T, P extends Comparable<? super P>> List<T> orderBy(List<T> list, Comparator<? super T> comparator) {
        return list.stream().sorted(comparator).collect(Collectors.toList());
    }

    /**
     * 泛型集合排序
     *
     * @param list      泛型集合
     * @param sortField 排序字段，例如：泛型类型名::get属性名
     * @param asc       升序 or 降序
     * @param <T>       集合里元素的类型
     * @param <P>       泛型类型里某一个属性的类型
     * @return
     */
    public final static <T, P extends Comparable<? super P>> List<T> orderBy(List<T> list, Function<? super T, ? extends P> sortField, boolean asc) {
        if (asc) {
            return list.stream().sorted(Comparator.comparing(sortField)).collect(Collectors.toList());
        } else {
            return list.stream().sorted(Comparator.comparing(sortField, Comparator.reverseOrder())).collect(Collectors.toList());
        }
    }

    /**
     * 数组排序
     *
     * @param array     泛型数组
     * @param sortField 排序字段，例如：泛型类型名::get属性名
     * @param asc       升序 or 降序
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>       数组里元素的类型
     * @param <P>       数组类型里某一个属性的类型
     * @return
     */
    public final static <T, P extends Comparable<? super P>> T[] orderBy(T[] array, Function<? super T, ? extends P> sortField, boolean asc, IntFunction<T[]> generator) {
        if (asc) {
            return Arrays.stream(array).sorted(Comparator.comparing(sortField)).toArray(generator);
        } else {
            return Arrays.stream(array).sorted(Comparator.comparing(sortField, Comparator.reverseOrder())).toArray(generator);
        }
    }

    /**
     * 数组排序
     *
     * @param array      泛型数组
     * @param comparator 排序条件
     * @param generator  泛型函数类型，例如：泛型类型名[]::new
     * @param <T>        数组里元素的类型
     * @param <P>        数组类型里某一个属性的类型
     * @return
     */
    public final static <T, P extends Comparable<? super P>> T[] orderBy(T[] array, Comparator<? super T> comparator, IntFunction<T[]> generator) {
        return Arrays.stream(array).sorted(comparator).toArray(generator);
    }

    /**
     * 字典集合按指定条件排序
     *
     * @param unsortMap  未排序的字典集合
     * @param comparator 排序条件
     * @param <K>        字典里Key的类型
     * @param <V>        字典里Value的类型
     * @return
     */
    public final static <K extends Comparable<? super K>, V> Map<K, V> orderBy(Map<K, V> unsortMap, Comparator<Map.Entry<K, V>> comparator) {
        Map<K, V> sortMap = new LinkedHashMap<>(unsortMap.size());
        unsortMap.entrySet().stream().sorted(comparator).forEachOrdered(x -> sortMap.put(x.getKey(), x.getValue()));
        return sortMap;
    }

    /**
     * 字典集合按指定条件排序（键不是集合类型的排序）
     *
     * @param unsortMap  未排序的字典集合
     * @param comparator 排序条件（指定某一个属性排序）
     * @param <K>        字典里Key的类型，某一个属性的类型
     * @param <T>        字典里Value的类型
     * @return
     */
    public final static <K extends Comparable<? super K>, T> Map<K, List<T>> orderByKey(Map<K, List<T>> unsortMap, Comparator<Map.Entry<K, List<T>>> comparator) {
        Map<K, List<T>> sortMap = new LinkedHashMap<>(unsortMap.size());
        //按照Key进行排序
        unsortMap.entrySet().stream().sorted(comparator).forEachOrdered(x -> sortMap.put(x.getKey(), x.getValue()));
        return sortMap;
    }

    /**
     * 字典集合按指定条件排序（键是集合类型的排序）
     *
     * @param unsortMap  未排序的字典集合
     * @param comparator 排序条件（指定多个属性排序）
     * @param <K>        字典里Key的类型，多个属性相同的类型
     * @param <T>        字典里Value的类型
     * @return
     */
    public final static <K extends Comparable<? super K>, T> Map<List<K>, List<T>> orderByKeys(Map<List<K>, List<T>> unsortMap, Comparator<Map.Entry<List<K>, List<T>>> comparator) {
        Map<List<K>, List<T>> sortMap = new LinkedHashMap<>(unsortMap.size());
        //按照Key进行排序
        unsortMap.entrySet().stream().sorted(comparator).forEachOrdered(x -> sortMap.put(x.getKey(), x.getValue()));
        return sortMap;
    }

    /**
     * 字典集合按Key正序排序
     *
     * @param unsortMap 未排序的字典集合
     * @param <K>       字典里Key的类型
     * @param <V>       字典里Value的类型
     * @return
     */
    public final static <K extends Comparable<? super K>, V> Map<K, V> orderByKey(Map<K, V> unsortMap) {
        Map<K, V> sortMap = new LinkedHashMap<>(unsortMap.size());
        //按照Key进行排序
        unsortMap.entrySet().stream().sorted(Map.Entry.comparingByKey()).forEachOrdered(x -> sortMap.put(x.getKey(), x.getValue()));
        return sortMap;
    }

    /**
     * 字典集合按Value正序排序
     *
     * @param unsortMap 未排序的字典集合
     * @param <K>       字典里Key的类型
     * @param <V>       字典里Value的类型
     * @return
     */
    public final static <K, V extends Comparable<? super V>> Map<K, V> orderByValue(Map<K, V> unsortMap) {
        Map<K, V> sortMap = new LinkedHashMap<>(unsortMap.size());
        //按照Value进行排序
        unsortMap.entrySet().stream().sorted(Map.Entry.comparingByValue()).forEachOrdered(x -> sortMap.put(x.getKey(), x.getValue()));
        return sortMap;
    }

    /**
     * 泛型集合转字典集合
     *
     * @param list  泛型集合
     * @param key   Key的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param value Value的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param <T>   集合里元素的类型
     * @param <K>   字典的Key类型
     * @param <V>   字典的Value类型
     * @return
     */
    public final static <T, K, V> Map<K, V> list2Map(List<T> list, Function<? super T, ? extends K> key, Function<? super T, ? extends V> value) {
        return list.stream().collect(Collectors.toMap(key, value));
    }

    /**
     * 泛型集合转字典集合
     *
     * @param list      泛型集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param key       Key的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param value     Value的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param <T>       集合里元素的类型
     * @param <K>       字典的Key类型
     * @param <V>       字典的Value类型
     * @return
     */
    public final static <T, K, V> Map<K, V> list2Map(List<T> list, Predicate<? super T> predicate, Function<? super T, ? extends K> key, Function<? super T, ? extends V> value) {
        return list.stream().filter(predicate).collect(Collectors.toMap(key, value));
    }

    /**
     * 泛型集合转泛型数组
     *
     * @param list      泛型集合
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>       集合里元素的类型
     * @return
     */
    public final static <T> T[] list2Array(List<T> list, IntFunction<T[]> generator) {
        return list.stream().toArray(generator);
    }

    /**
     * 泛型集合转泛型数组
     *
     * @param list      泛型集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>       集合里元素的类型
     * @return
     */
    public final static <T> T[] list2Array(List<T> list, Predicate<? super T> predicate, IntFunction<T[]> generator) {
        return list.stream().filter(predicate).toArray(generator);
    }

    /**
     * 嵌套的泛型集合转泛型集合
     *
     * @param list 嵌套的泛型集合
     * @param <T>  集合里元素的类型
     * @return
     */
    public final static <T> List<T> list22List(List<List<T>> list) {
        return list.stream().flatMap(List::stream).collect(Collectors.toList());
    }

    /**
     * 嵌套的泛型集合转泛型数组
     *
     * @param list      嵌套的泛型集合
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>       集合里元素的类型
     * @return
     */
    public final static <T> T[] list22Array(List<List<T>> list, IntFunction<T[]> generator) {
        return list.stream().flatMap(List::stream).toArray(generator);
    }

    /**
     * 泛型数组转泛型集合
     *
     * @param array 泛型数组
     * @param <T>   数组里元素的类型
     * @return
     */
    public final static <T> List<T> array2list(T... array) {
        return Arrays.asList(array);
    }

    /**
     * 泛型数组转泛型集合
     *
     * @param array 泛型数组
     * @param <T>   数组里元素的类型
     * @return
     */
    public final static <T> List<T> array2List(T[] array) {
        return Arrays.stream(array).collect(Collectors.toList());
    }

    /**
     * 泛型数组转泛型集合
     *
     * @param array     泛型数组
     * @param predicate 过滤条件，例如：lambda表达式
     * @param <T>       数组里元素的类型
     * @return
     */
    public final static <T> List<T> array2List(T[] array, Predicate<? super T> predicate) {
        return Arrays.stream(array).filter(predicate).collect(Collectors.toList());
    }

    /**
     * 泛型集合转泛型集合
     *
     * @param set 泛型集合
     * @param <T> 集合里元素的类型
     * @return
     */
    public final static <T> List<T> set2List(Set<T> set) {
        return set.stream().collect(Collectors.toList());
    }

    /**
     * 泛型数组转字典集合
     *
     * @param array 泛型数组
     * @param key   Key的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param value Value的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param <T>   数组里元素的类型
     * @param <K>   字典的Key类型
     * @param <V>   字典里Value的类型
     * @return
     */
    public final static <T, K, V> Map<K, V> array2Map(T[] array, Function<? super T, ? extends K> key, Function<? super T, ? extends V> value) {
        return Arrays.stream(array).collect(Collectors.toMap(key, value));
    }

    /**
     * 泛型数组转字典集合
     *
     * @param array     泛型数组
     * @param predicate 过滤条件，例如：lambda表达式
     * @param key       Key的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param value     Value的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param <T>       数组里元素的类型
     * @param <K>       字典的Key类型
     * @param <V>       字典里Value的类型
     * @return
     */
    public final static <T, K, V> Map<K, V> array2Map(T[] array, Predicate<? super T> predicate, Function<? super T, ? extends K> key, Function<? super T, ? extends V> value) {
        return Arrays.stream(array).filter(predicate).collect(Collectors.toMap(key, value));
    }

    /**
     * 字典集合转泛型集合
     *
     * @param map    字典集合
     * @param mapper Map.Entry::getValue or Map.Entry::getKey
     * @param <T>
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <T, K, V> List<T> map2List(Map<K, V> map, Function<? super Map.Entry<K, V>, ? extends T> mapper) {
        return map.entrySet().stream().map(mapper).collect(Collectors.toList());
    }

    /**
     * 字典集合转泛型数组
     *
     * @param map       字典集合
     * @param mapper    Map.Entry::getValue or Map.Entry::getKey
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <T, K, V> T[] map2Array(Map<K, V> map, Function<? super Map.Entry<K, V>, ? extends T> mapper, IntFunction<T[]> generator) {
        return map.entrySet().stream().map(mapper).toArray(generator);
    }

    /**
     * 将一个泛型集合重新组合成它里面某一个属性的集合
     *
     * @param list   泛型集合
     * @param mapper 属性字段，lambda表达式
     * @param <T>    集合里元素的类型
     * @param <P>    集合类型里某一个属性的类型
     * @return
     */
    public final static <T, P> List<P> select(List<T> list, Function<? super T, ? extends P> mapper) {
        return list.stream().map(mapper).collect(Collectors.toList());
    }

    /**
     * 将一个泛型集合重新组合成它里面某一个属性的集合
     *
     * @param list      泛型集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param mapper    属性字段，lambda表达式
     * @param <T>       集合里元素的类型
     * @param <P>       集合类型里某一个属性的类型
     * @return
     */
    public final static <T, P> List<P> select(List<T> list, Predicate<? super T> predicate, Function<? super T, ? extends P> mapper) {
        return list.stream().filter(predicate).map(mapper).collect(Collectors.toList());
    }

    /**
     * 将一个泛型数组重新组合成它里面某一个属性的集合
     *
     * @param array  泛型数组
     * @param mapper 属性字段，lambda表达式
     * @param <T>    数组里元素的类型
     * @param <P>    数组类型里某一个属性的类型
     * @return
     */
    public final static <T, P> List<P> select(T[] array, Function<? super T, ? extends P> mapper) {
        return Arrays.stream(array).map(mapper).collect(Collectors.toList());
    }

    /**
     * 将一个泛型数组重新组合成它里面某一个属性的集合
     *
     * @param array     泛型数组
     * @param predicate 过滤条件，例如：lambda表达式
     * @param mapper    属性字段，lambda表达式
     * @param <T>       数组里元素的类型
     * @param <P>       数组类型里某一个属性的类型
     * @return
     */
    public final static <T, P> List<P> select(T[] array, Predicate<? super T> predicate, Function<? super T, ? extends P> mapper) {
        return Arrays.stream(array).filter(predicate).map(mapper).collect(Collectors.toList());
    }

    /**
     * 将一个字典集合重新组合成一个和它相接近的新的字典集合
     *
     * @param map   字典集合
     * @param key   Key的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param value Value的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param <K>   字典的Key类型
     * @param <V>   字典的Value类型
     * @return
     */
    public final static <K, V> Map<K, V> select(Map<K, V> map, Function<? super Map.Entry<K, V>, ? extends K> key, Function<? super Map.Entry<K, V>, ? extends V> value) {
        return map.entrySet().stream().collect(Collectors.toMap(key, value));
    }

    /**
     * 将一个字典集合重新组合成一个和它相接近的新的字典集合
     *
     * @param map       字典集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param key       Key的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param value     Value的字段内容，例如：泛型类型名::get属性名，或：lambda表达式
     * @param <K>       字典的Key类型
     * @param <V>       字典的Value类型
     * @return
     */
    public final static <K, V> Map<K, V> select(Map<K, V> map, Predicate<? super Map.Entry<K, V>> predicate, Function<? super Map.Entry<K, V>, ? extends K> key, Function<? super Map.Entry<K, V>, ? extends V> value) {
        return map.entrySet().stream().filter(predicate).collect(Collectors.toMap(key, value));
    }

    /**
     * 将一个字典集合重新组合成一个泛型集合
     *
     * @param map    字典集合
     * @param mapper 属性字段，lambda表达式
     * @param <K>    字典的Key类型
     * @param <V>    字典的Value类型
     * @param <T>    泛型集合
     * @return
     */
    public final static <K, V, T> List<T> select(Map<K, V> map, Function<? super Map.Entry<K, V>, ? extends T> mapper) {
        return map.entrySet().stream().map(mapper).collect(Collectors.toList());
    }

    /**
     * 将一个泛型集合重新组合成它里面某一个属性的集合
     *
     * @param set    泛型集合
     * @param mapper 属性字段，lambda表达式
     * @param <T>    集合里元素的类型
     * @param <P>    集合类型里某一个属性的类型
     * @return
     */
    public final static <T, P> List<P> select(Set<T> set, Function<? super T, ? extends P> mapper) {
        return set.stream().map(mapper).collect(Collectors.toList());
    }

    /**
     * 将一个泛型集合重新组合成它里面某一个属性的集合
     *
     * @param set       泛型集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param mapper    属性字段，lambda表达式
     * @param <T>       集合里元素的类型
     * @param <P>       集合类型里某一个属性的类型
     * @return
     */
    public final static <T, P> List<P> select(Set<T> set, Predicate<? super T> predicate, Function<? super T, ? extends P> mapper) {
        return set.stream().filter(predicate).map(mapper).collect(Collectors.toList());
    }

    /**
     * 分页获取泛型集合里面的数据
     *
     * @param list      泛型集合
     * @param pageIndex 第几页记录
     * @param pageSize  每页显示几条记录
     * @param <T>
     * @return
     */
    public final static <T> List<T> page(List<T> list, int pageIndex, int pageSize) {
        return list.stream().skip((pageIndex - 1) * pageSize).limit(pageSize).collect(Collectors.toList());
    }

    /**
     * 分页获取泛型数组里面的数据
     *
     * @param array     泛型数组
     * @param pageIndex 第几页记录
     * @param pageSize  每页显示几条记录
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>
     * @return
     */
    public final static <T> T[] page(T[] array, int pageIndex, int pageSize, IntFunction<T[]> generator) {
        return Arrays.stream(array).skip((pageIndex - 1) * pageSize).limit(pageSize).toArray(generator);
    }

    /**
     * 分页获取泛型数组里面的数据
     *
     * @param array     泛型数组
     * @param pageIndex 第几页记录
     * @param pageSize  每页显示几条记录
     * @param <T>
     * @return
     */
    public final static <T> T[] page(T[] array, int pageIndex, int pageSize) {
        return Arrays.copyOfRange(array, (pageIndex - 1) * pageSize, pageIndex * pageSize);
    }

    /**
     * 分页获取字典集合里面的数据
     *
     * @param map       字典集合
     * @param pageIndex 第几页记录
     * @param pageSize  每页显示几条记录
     * @param <K>       字典里Key的类型
     * @param <V>       字典里Value的类型
     * @return
     */
    public final static <K, V> Map<K, V> page(Map<K, V> map, int pageIndex, int pageSize) {
        return map.entrySet().stream().skip((pageIndex - 1) * pageSize).limit(pageSize).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    /**
     * 分页获取泛型集合里面的数据
     *
     * @param list      泛型集合
     * @param pageIndex 第几页记录
     * @param pageSize  每页显示几条记录
     * @param <T>
     * @return
     */
    /**
     * 分页获取泛型集合里面的数据
     *
     * @param list      泛型集合
     * @param pageIndex 第几页记录
     * @param pageSize  每页显示几条记录
     * @param sortField 排序字段，例如：泛型类型名::get属性名
     * @param asc       升序 or 降序
     * @param <T>       集合里元素的类型
     * @param <P>       泛型类型里某一个属性的类型
     * @return
     */
    public final static <T, P extends Comparable<? super P>> List<T> page(List<T> list, int pageIndex, int pageSize, Function<? super T, ? extends P> sortField, boolean asc) {
        if (asc) {
            return list.stream().sorted(Comparator.comparing(sortField)).skip((pageIndex - 1) * pageSize).limit(pageSize).collect(Collectors.toList());
        } else {
            return list.stream().sorted(Comparator.comparing(sortField, Comparator.reverseOrder())).skip((pageIndex - 1) * pageSize).limit(pageSize).collect(Collectors.toList());
        }
    }

    /**
     * 分页获取泛型数组里面的数据
     *
     * @param array     泛型数组
     * @param pageIndex 第几页记录
     * @param pageSize  每页显示几条记录
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>
     * @return
     */
    /**
     * 分页获取泛型数组里面的数据
     *
     * @param array     泛型数组
     * @param pageIndex 第几页记录
     * @param pageSize  每页显示几条记录
     * @param sortField 排序字段，例如：泛型类型名::get属性名
     * @param asc       升序 or 降序
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>       数组里元素的类型
     * @param <P>       泛型数组里某一个属性的类型
     * @return
     */
    public final static <T, P extends Comparable<? super P>> T[] page(T[] array, int pageIndex, int pageSize, Function<? super T, ? extends P> sortField, boolean asc, IntFunction<T[]> generator) {
        if (asc) {
            return Arrays.stream(array).sorted(Comparator.comparing(sortField)).skip((pageIndex - 1) * pageSize).limit(pageSize).toArray(generator);
        } else {
            return Arrays.stream(array).sorted(Comparator.comparing(sortField, Comparator.reverseOrder())).skip((pageIndex - 1) * pageSize).limit(pageSize).toArray(generator);
        }
    }

    /**
     * 分页获取泛型集合里面的数据
     *
     * @param list      泛型集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param pageIndex 第几页记录
     * @param pageSize  每页显示几条记录
     * @param <T>
     * @return
     */
    public final static <T> List<T> page(List<T> list, Predicate<? super T> predicate, int pageIndex, int pageSize) {
        return list.stream().filter(predicate).skip((pageIndex - 1) * pageSize).limit(pageSize).collect(Collectors.toList());
    }

    /**
     * 分页获取泛型数组里面的数据
     *
     * @param array     泛型数组
     * @param predicate 过滤条件，例如：lambda表达式
     * @param pageIndex 第几页记录
     * @param pageSize  每页显示几条记录
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>
     * @return
     */
    public final static <T> T[] page(T[] array, Predicate<? super T> predicate, int pageIndex, int pageSize, IntFunction<T[]> generator) {
        return Arrays.stream(array).filter(predicate).skip((pageIndex - 1) * pageSize).limit(pageSize).toArray(generator);
    }

    /**
     * 分页获取字典集合里面的数据
     *
     * @param map       字典集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param pageIndex 第几页记录
     * @param pageSize  每页显示几条记录
     * @param <K>       字典里Key的类型
     * @param <V>       字典里Value的类型
     * @return
     */
    public final static <K, V> Map<K, V> page(Map<K, V> map, Predicate<? super Map.Entry<K, V>> predicate, int pageIndex, int pageSize) {
        return map.entrySet().stream().filter(predicate).skip((pageIndex - 1) * pageSize).limit(pageSize).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    /**
     * 获取泛型集合里面的前几条数据
     *
     * @param list  泛型集合
     * @param count 前几条记录
     * @param <T>
     * @return
     */
    public final static <T> List<T> top(List<T> list, int count) {
        return list.stream().limit(count).collect(Collectors.toList());
    }

    /**
     * 获取泛型数组里面的前几条数据
     *
     * @param array     泛型数组
     * @param count     前几条记录
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>
     * @return
     */
    public final static <T> T[] top(T[] array, int count, IntFunction<T[]> generator) {
        return Arrays.stream(array).limit(count).toArray(generator);
    }

    /**
     * 获取泛型数组里面的前几条数据
     *
     * @param array 泛型数组
     * @param count 前几条记录
     * @param <T>
     * @return
     */
    public final static <T> T[] top(T[] array, int count) {
        return Arrays.copyOfRange(array, 0, count);
    }

    /**
     * 获取字典集合里面的前几条数据
     *
     * @param map   字典集合
     * @param count 前几条记录
     * @param <K>   字典里Key的类型
     * @param <V>   字典里Value的类型
     * @return
     */
    public final static <K, V> Map<K, V> top(Map<K, V> map, int count) {
        return map.entrySet().stream().limit(count).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    /**
     * 获取泛型集合里面的前几条数据
     *
     * @param list      泛型集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param count     前几条记录
     * @param <T>
     * @return
     */
    public final static <T> List<T> top(List<T> list, Predicate<? super T> predicate, int count) {
        return list.stream().filter(predicate).limit(count).collect(Collectors.toList());
    }

    /**
     * 获取泛型数组里面的前几条数据
     *
     * @param array     泛型数组
     * @param predicate 过滤条件，例如：lambda表达式
     * @param count     前几条记录
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>
     * @return
     */
    public final static <T> T[] top(T[] array, Predicate<? super T> predicate, int count, IntFunction<T[]> generator) {
        return Arrays.stream(array).filter(predicate).limit(count).toArray(generator);
    }

    /**
     * 获取字典集合里面的前几条数据
     *
     * @param map       字典集合
     * @param predicate 过滤条件，例如：lambda表达式
     * @param count     前几条记录
     * @param <K>       字典里Key的类型
     * @param <V>       字典里Value的类型
     * @return
     */
    public final static <K, V> Map<K, V> top(Map<K, V> map, Predicate<? super Map.Entry<K, V>> predicate, int count) {
        return map.entrySet().stream().filter(predicate).limit(count).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    /**
     * 获取泛型集合里面的前几条数据
     *
     * @param list      泛型集合
     * @param count     前几条记录
     * @param sortField 排序字段，例如：泛型类型名::get属性名
     * @param asc       升序 or 降序
     * @param <T>       集合里元素的类型
     * @param <P>       泛型类型里某一个属性的类型
     * @return
     */
    public final static <T, P extends Comparable<? super P>> List<T> top(List<T> list, int count, Function<? super T, ? extends P> sortField, boolean asc) {
        if (asc) {
            return list.stream().sorted(Comparator.comparing(sortField)).limit(count).collect(Collectors.toList());
        } else {
            return list.stream().sorted(Comparator.comparing(sortField, Comparator.reverseOrder())).limit(count).collect(Collectors.toList());
        }
    }

    /**
     * 获取泛型数组里面的前几条数据
     *
     * @param array     泛型数组
     * @param count     前几条记录
     * @param sortField 排序字段，例如：数组类型名::get属性名
     * @param asc       升序 or 降序
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>       数组里元素的类型
     * @param <P>       数组类型里某一个属性的类型
     * @return
     */
    public final static <T, P extends Comparable<? super P>> T[] top(T[] array, int count, Function<? super T, ? extends P> sortField, boolean asc, IntFunction<T[]> generator) {
        if (asc) {
            return Arrays.stream(array).sorted(Comparator.comparing(sortField)).limit(count).toArray(generator);
        } else {
            return Arrays.stream(array).sorted(Comparator.comparing(sortField, Comparator.reverseOrder())).limit(count).toArray(generator);
        }
    }

    /**
     * 泛型数组分组（指定某一个属性分组）
     *
     * @param array        泛型数组
     * @param keyExtractor 分组条件，数组类型里指定某一个属性分组
     * @param <T>          数组里元素的类型
     * @param <K>          数组类型里某一个属性的类型
     * @return
     */
    public final static <T, K extends Comparable<? super K>> Map<K, List<T>> groupByKey(T[] array, Function<T, K> keyExtractor) {
        return Arrays.stream(array).collect(Collectors.groupingBy(keyExtractor, Collectors.toList()));
    }

    /**
     * 泛型数组分组（指定多个属性分组）
     *
     * @param array        泛型数组
     * @param keyExtractor 分组条件，数组类型里指定多个属性分组
     * @param <T>          数组里元素的类型
     * @param <K>          数组类型里某一个属性的类型
     * @return
     */
    public final static <T, K extends Comparable<? super K>> Map<List<K>, List<T>> groupByKeys(T[] array, Function<T, List<K>> keyExtractor) {
        return Arrays.stream(array).collect(Collectors.groupingBy(keyExtractor, Collectors.toList()));
    }

    /**
     * 泛型集合分组（指定某一个属性分组）
     *
     * @param list         泛型集合
     * @param keyExtractor 分组条件，数组类型里指定某一个属性分组
     * @param <T>          集合里元素的类型
     * @param <K>          泛型类型里某一个属性的类型
     * @return
     */
    public final static <T, K extends Comparable<? super K>> Map<K, List<T>> groupByKey(List<T> list, Function<T, K> keyExtractor) {
        return list.stream().collect(Collectors.groupingBy(keyExtractor, Collectors.toList()));
    }

    /**
     * 泛型集合分组（指定多个属性分组）
     *
     * @param list         泛型集合
     * @param keyExtractor 分组条件，泛型类型里指定多个属性分组
     * @param <T>          集合里元素的类型
     * @param <K>          泛型类型里多个属性相同的类型
     * @return
     */
    public final static <T, K extends Comparable<? super K>> Map<List<K>, List<T>> groupByKeys(List<T> list, Function<T, List<K>> keyExtractor) {
        return list.stream().collect(Collectors.groupingBy(keyExtractor, Collectors.toList()));
    }

    /**
     * 泛型数组分组聚合（指定某一个属性分组）
     *
     * @param list
     * @param keyExtractor           分组条件，数组类型里指定某一个属性分组
     * @param aggrField              聚合字段，例如：泛型类型名::get属性名
     * @param <T>
     * @param <K>
     * @param <IntSummaryStatistics>
     * @return
     */
    public final static <T, K extends Comparable<? super K>, IntSummaryStatistics> Map<K, java.util.IntSummaryStatistics> groupByKeyAndAggr(List<T> list, Function<T, K> keyExtractor, ToIntFunction<? super T> aggrField) {
        return list.stream().collect(Collectors.groupingBy(keyExtractor, Collectors.summarizingInt(aggrField)));
    }

    public final static <T, K extends Comparable<? super K>, LongSummaryStatistics> Map<K, java.util.LongSummaryStatistics> groupByKeyAndAggrl(List<T> list, Function<T, K> keyExtractor, ToLongFunction<? super T> aggrField) {
        return list.stream().collect(Collectors.groupingBy(keyExtractor, Collectors.summarizingLong(aggrField)));
    }

    /**
     * 泛型数组分组聚合（指定多个属性分组）
     *
     * @param list
     * @param keyExtractor           分组条件，泛型类型里指定多个属性分组
     * @param aggrField              聚合字段，例如：泛型类型名::get属性名
     * @param <T>
     * @param <K>
     * @param <IntSummaryStatistics>
     * @return
     */
    public final static <T, K extends Comparable<? super K>, IntSummaryStatistics> Map<List<K>, java.util.IntSummaryStatistics> groupByKeysAndAggr(List<T> list, Function<T, List<K>> keyExtractor, ToIntFunction<? super T> aggrField) {
        return list.stream().collect(Collectors.groupingBy(keyExtractor, Collectors.summarizingInt(aggrField)));
    }

    public final static <T, K extends Comparable<? super K>, LongSummaryStatistics> Map<List<K>, java.util.LongSummaryStatistics> groupByKeysAndAggrl(List<T> list, Function<T, List<K>> keyExtractor, ToLongFunction<? super T> aggrField) {
        return list.stream().collect(Collectors.groupingBy(keyExtractor, Collectors.summarizingLong(aggrField)));
    }

    /**
     * 集合去重
     *
     * @param list 泛型集合
     * @param <T>  集合里元素的类型
     * @return
     */
    public final static <T> List<T> distinct(List<T> list) {
        return list.stream().distinct().collect(Collectors.toList());
    }

    /**
     * 集合去重
     *
     * @param list          泛型集合
     * @param distinctField 去重字段，例如：数组类型名::get属性名
     * @param <T>           集合里元素的类型
     * @param <P>
     * @return
     */
    public final static <T, P extends Comparable<? super P>> List<T> distinct(List<T> list, Function<? super T, ? extends P> distinctField) {
        return distinct(list, Comparator.comparing(distinctField));
    }

    /**
     * 集合去重
     *
     * @param list       泛型集合
     * @param comparator 去重字段（多个字段）
     * @param <T>        集合里元素的类型
     * @param <P>
     * @return
     */
    public final static <T, P extends Comparable<? super P>> List<T> distinct(List<T> list, Comparator<? super T> comparator) {
        return list.stream().collect(Collectors.collectingAndThen(Collectors.toCollection(() -> new TreeSet<T>(comparator)), ArrayList::new));
    }

    /**
     * 数组去重
     *
     * @param array
     * @param generator 泛型函数类型，例如：泛型类型名[]::new
     * @param <T>
     * @return
     */
    public final static <T> T[] distinct(T[] array, IntFunction<T[]> generator) {
        return Arrays.stream(array).distinct().toArray(generator);
    }

    /**
     * 集合去重之后，字符串连接
     *
     * @param list      仅限字符串集合
     * @param delimiter 连接字符
     * @return
     */
    public final static String distinct(List<String> list, String delimiter) {
        return list.stream().distinct().collect(Collectors.joining(delimiter));
    }

    /**
     * 数组去重之后，字符串连接
     *
     * @param array     仅限字符串数组
     * @param delimiter 连接字符
     * @return
     */
    public final static String distinct(String[] array, String delimiter) {
        return Arrays.stream(array).distinct().collect(Collectors.joining(delimiter));
    }

    /**
     * 字典集合里根据Key值最大的条件取出结果
     *
     * @param map
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K extends Comparable<? super K>, V> Map.Entry<K, V> maxKey(Map<K, V> map) {
        return map.entrySet().stream().max(Map.Entry.comparingByKey()).get();
    }

    /**
     * 字典集合里根据Value值最大的条件取出结果
     *
     * @param map
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K, V extends Comparable<? super V>> Map.Entry<K, V> maxValue(Map<K, V> map) {
        return map.entrySet().stream().max(Map.Entry.comparingByValue()).get();
    }

    /**
     * 字典集合中根据指定条件取出最大的结果
     *
     * @param map
     * @param comparator (c1, c2) -> c1.getValue().compareTo(c2.getValue())
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K, V> Map.Entry<K, V> max(Map<K, V> map, Comparator<? super Map.Entry<K, V>> comparator) {
        return map.entrySet().stream().max(comparator).get();
    }

    /**
     * 字典集合里根据Key值最大的条件取出结果
     *
     * @param map
     * @param predicate
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K extends Comparable<? super K>, V> Map.Entry<K, V> maxKey(Map<K, V> map, Predicate<? super Map.Entry<K, V>> predicate) {
        return map.entrySet().stream().filter(predicate).max(Map.Entry.comparingByKey()).get();
    }

    /**
     * 字典集合里根据Value值最大的条件取出结果
     *
     * @param map
     * @param predicate
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K, V extends Comparable<? super V>> Map.Entry<K, V> maxValue(Map<K, V> map, Predicate<? super Map.Entry<K, V>> predicate) {
        return map.entrySet().stream().filter(predicate).max(Map.Entry.comparingByValue()).get();
    }

    /**
     * 字典集合中根据指定条件取出最大的结果
     *
     * @param map
     * @param predicate
     * @param comparator (c1, c2) -> c1.getValue().compareTo(c2.getValue())
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K, V> Map.Entry<K, V> max(Map<K, V> map, Predicate<? super Map.Entry<K, V>> predicate, Comparator<? super Map.Entry<K, V>> comparator) {
        return map.entrySet().stream().filter(predicate).max(comparator).get();
    }

    /**
     * 泛型集合中取出最大的结果
     *
     * @param list
     * @param <T>
     * @return
     */
    public final static <T extends Object & Comparable<? super T>> T max(List<T> list) {
        return Collections.max(list);
    }

    /**
     * 泛型集合中取出最大的结果
     *
     * @param list
     * @param comparator 排序字段，例如：lambda或Comparator.comparing(泛型类型名::get属性名)
     * @param <T>
     * @return
     */
    public final static <T> T max(List<T> list, Comparator<? super T> comparator) {
        return list.stream().max(comparator).get();
    }

    /**
     * 泛型集合中取出最大的结果
     *
     * @param list
     * @param sortField 排序字段，例如：泛型类型名::get属性名
     * @param <T>
     * @param <P>
     * @return
     */
    public final static <T, P extends Comparable<? super P>> T max(List<T> list, Function<? super T, ? extends P> sortField) {
        return list.stream().max(Comparator.comparing(sortField)).get();
    }

    /**
     * 泛型集合中取出最大的结果
     *
     * @param list
     * @param predicate
     * @param comparator
     * @param <T>
     * @return
     */
    public final static <T> T max(List<T> list, Predicate<? super T> predicate, Comparator<? super T> comparator) {
        return list.stream().filter(predicate).max(comparator).get();
    }

    /**
     * 泛型集合中取出最大的结果
     *
     * @param list
     * @param predicate
     * @param sortField
     * @param <T>
     * @param <P>
     * @return
     */
    public final static <T, P extends Comparable<? super P>> T max(List<T> list, Predicate<? super T> predicate, Function<? super T, ? extends P> sortField) {
        return list.stream().filter(predicate).max(Comparator.comparing(sortField)).get();
    }

    /**
     * 字典集合里根据Key值最小的条件取出结果
     *
     * @param map
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K extends Comparable<? super K>, V> Map.Entry<K, V> minKey(Map<K, V> map) {
        return map.entrySet().stream().min(Map.Entry.comparingByKey()).get();
    }

    /**
     * 字典集合里根据Value值最小的条件取出结果
     *
     * @param map
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K, V extends Comparable<? super V>> Map.Entry<K, V> minValue(Map<K, V> map) {
        return map.entrySet().stream().min(Map.Entry.comparingByValue()).get();
    }

    /**
     * 字典集合中根据指定条件取出最小的结果
     *
     * @param map
     * @param comparator (c1, c2) -> c1.getValue().compareTo(c2.getValue())
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K, V> Map.Entry<K, V> min(Map<K, V> map, Comparator<? super Map.Entry<K, V>> comparator) {
        return map.entrySet().stream().min(comparator).get();
    }

    /**
     * 字典集合里根据Key值最小的条件取出结果
     *
     * @param map
     * @param predicate
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K extends Comparable<? super K>, V> Map.Entry<K, V> minKey(Map<K, V> map, Predicate<? super Map.Entry<K, V>> predicate) {
        return map.entrySet().stream().filter(predicate).min(Map.Entry.comparingByKey()).get();
    }

    /**
     * 字典集合里根据Value值最小的条件取出结果
     *
     * @param map
     * @param predicate
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K, V extends Comparable<? super V>> Map.Entry<K, V> minValue(Map<K, V> map, Predicate<? super Map.Entry<K, V>> predicate) {
        return map.entrySet().stream().filter(predicate).min(Map.Entry.comparingByValue()).get();
    }

    /**
     * 字典集合中根据指定条件取出最小的结果
     *
     * @param map
     * @param predicate
     * @param comparator (c1, c2) -> c1.getValue().compareTo(c2.getValue())
     * @param <K>
     * @param <V>
     * @return
     */
    public final static <K, V> Map.Entry<K, V> min(Map<K, V> map, Predicate<? super Map.Entry<K, V>> predicate, Comparator<? super Map.Entry<K, V>> comparator) {
        return map.entrySet().stream().filter(predicate).min(comparator).get();
    }

    /**
     * 泛型集合中取出最小的结果
     *
     * @param list
     * @param <T>
     * @return
     */
    public final static <T extends Object & Comparable<? super T>> T min(List<T> list) {
        return Collections.min(list);
    }

    /**
     * 泛型集合中取出最小的结果
     *
     * @param list
     * @param comparator 排序字段，例如：lambda或Comparator.comparing(泛型类型名::get属性名)
     * @param <T>
     * @return
     */
    public final static <T> T min(List<T> list, Comparator<? super T> comparator) {
        return list.stream().min(comparator).get();
    }

    /**
     * 泛型集合中取出最小的结果
     *
     * @param list
     * @param sortField 排序字段，例如：泛型类型名::get属性名
     * @param <T>
     * @param <P>
     * @return
     */
    public final static <T, P extends Comparable<? super P>> T min(List<T> list, Function<? super T, ? extends P> sortField) {
        return list.stream().min(Comparator.comparing(sortField)).get();
    }

    /**
     * 泛型集合中取出最小的结果
     *
     * @param list
     * @param predicate
     * @param comparator
     * @param <T>
     * @return
     */
    public final static <T> T min(List<T> list, Predicate<? super T> predicate, Comparator<? super T> comparator) {
        return list.stream().filter(predicate).min(comparator).get();
    }

    /**
     * 泛型集合中取出最小的结果
     *
     * @param list
     * @param predicate
     * @param sortField
     * @param <T>
     * @param <P>
     * @return
     */
    public final static <T, P extends Comparable<? super P>> T min(List<T> list, Predicate<? super T> predicate, Function<? super T, ? extends P> sortField) {
        return list.stream().filter(predicate).min(Comparator.comparing(sortField)).get();
    }

    /**
     * 泛型集合中计算某一个属性的合计（整数类型的属性字段）
     *
     * @param list
     * @param mapper 合计字段，例如：泛型类型名::get属性名
     * @param <T>
     * @return
     */
    public final static <T> int sumInt(List<T> list, ToIntFunction<? super T> sumField) {
        return list.stream().mapToInt(sumField).sum();
    }

    /**
     * 泛型数组中计算某一个属性的合计（整数类型的属性字段）
     *
     * @param array
     * @param sumField 合计字段，例如：泛型类型名::get属性名
     * @param <T>
     * @return
     */
    public final static <T> int sumInt(T[] array, ToIntFunction<? super T> sumField) {
        return Arrays.stream(array).mapToInt(sumField).sum();
    }

    /**
     * 泛型集合中计算某一个属性的合计（小数类型的属性字段）
     *
     * @param list
     * @param mapper 合计字段，例如：泛型类型名::get属性名
     * @param <T>
     * @return
     */
    public final static <T> double sumDouble(List<T> list, ToDoubleFunction<? super T> sumField) {
        return list.stream().mapToDouble(sumField).sum();
    }

    /**
     * 泛型数组中计算某一个属性的合计（小数类型的属性字段）
     *
     * @param array
     * @param sumField 合计字段，例如：泛型类型名::get属性名
     * @param <T>
     * @return
     */
    public final static <T> double sumDouble(T[] array, ToDoubleFunction<? super T> sumField) {
        return Arrays.stream(array).mapToDouble(sumField).sum();
    }

    /**
     * 字符串数组转int数组
     *
     * @param strings
     * @return
     */
    public final static int[] strings2Ints(String[] strings) {
        return Arrays.stream(strings).mapToInt(Integer::valueOf).toArray();
    }

    /**
     * 字符串数组转Integer集合
     *
     * @param strings
     * @return
     */
    public final static List<Integer> strings2IntegerList(String[] strings) {
        return Arrays.stream(strings2Ints(strings)).boxed().collect(Collectors.toList());
    }

    /**
     * 字符串数组转Integer数组
     *
     * @param strings
     * @return
     */
    public final static Integer[] strings2Integers(String[] strings) {
        return Arrays.stream(strings2Ints(strings)).boxed().toArray(Integer[]::new);
    }

    /**
     * 字符串集合转int数组
     *
     * @param strings
     * @return
     */
    public final static int[] stringList2Ints(List<String> stringList) {
        return stringList.stream().mapToInt(Integer::valueOf).toArray();
    }

    /**
     * 字符串集合转Integer集合
     *
     * @param strings
     * @return
     */
    public final static List<Integer> stringList2IntegerList(List<String> stringList) {
        return Arrays.stream(stringList2Ints(stringList)).boxed().collect(Collectors.toList());
    }

    /**
     * 字符串集合转Integer数组
     *
     * @param strings
     * @return
     */
    public final static Integer[] stringList2Integers(List<String> stringList) {
        return Arrays.stream(stringList2Ints(stringList)).boxed().toArray(Integer[]::new);
    }

    /**
     * 字符串转字符集合
     *
     * @param name
     * @return
     */
    public final static List<Character> string2CharList(String name) {
        return name.chars().mapToObj(c -> (char) c).collect(Collectors.toList());
    }

    /**
     * 字符集合转字符串
     *
     * @param characterList
     * @return
     */
    public final static String charList2String(List<Character> characterList) {
        return characterList.stream().map(String::valueOf).collect(Collectors.joining());
    }

    /**
     * 枚举类型转字典集合
     *
     * @param enumSet
     * @param <E>
     * @param <T>
     * @return
     */
    public final static <E extends Enum<E> & IEnumValue<T>, T> Map<String, T> enum2Map(EnumSet<E> enumSet) {
        return enumSet.stream().collect(Collectors.toMap(item -> item.name(), item -> item.getValue()));
    }
}
