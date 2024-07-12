package jp.com.helper;

import org.apache.commons.collections4.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * <pre>
 * 数组常见操作
 * </pre>
 *
 * @author wangyunpeng
 * @date 2021/3/15 16:02
 * @wechat wyp_blog
 * @company ㍿○○○○
 */
public class ArrayHelper {

    /**
     * 交换数组中指定的两元素的位置
     *
     * @param data
     * @param x
     * @param y
     */
    private static void swap(int[] data, int x, int y) {
        /*
         * int temp = data[x]; data[x] = data[y]; data[y] = temp;
         */

        // 不使用第三个变量
        data[x] = data[x] + data[y];
        data[y] = data[x] - data[y];
        data[x] = data[x] - data[y];
    }

    /**
     * 反转数组的方法
     *
     * @param data 数组
     */
    public void reverse(int[] data) {
        int length = data.length;
        int temp = 0;// 临时变量

        for (int i = 0, size = length / 2; i < size; i++) {
            temp = data[i];
            data[i] = data[length - 1 - i];
            data[length - 1 - i] = temp;
        }
    }

    /**
     * 求两个数组的交集
     *
     * @param array1
     * @param array2
     * @param <T>
     * @return
     */
    public static <T> List<T> intersection(T[] array1, T[] array2) {
        return intersection(Lambda.array2List(array1), Lambda.array2List(array2));
    }

    /**
     * 求两个集合的交集
     *
     * @param list1
     * @param list2
     * @return
     */
    public static <T> List<T> intersection(Iterable<T> list1, Iterable<T> list2) {
        return new ArrayList<>(CollectionUtils.intersection(list1, list2));
    }

    /**
     * 求两个集合的补集
     *
     * @param list1
     * @param list2
     * @param <T>
     * @return
     */
    public static <T> List<T> disjunction(List<T> list1, List<T> list2) {
        return new ArrayList<>(CollectionUtils.disjunction(list1, list2));
    }

    /**
     * 求两个集合的差集
     *
     * @param list1
     * @param list2
     * @param <T>
     * @return
     */
    public static <T> List<T> minus(List<T> list1, List<T> list2) {
        return new ArrayList<>(CollectionUtils.subtract(list1, list2));
    }

    /**
     * 求两个集合的并集
     *
     * @param list1
     * @param list2
     * @param <T>
     * @return
     */
    public static <T> List<T> union(List<T> list1, List<T> list2) {
        return new ArrayList<>(CollectionUtils.union(list1, list2));
    }

    /**
     * 均拆分list方法
     *
     * @param source
     * @param n
     * @param <T>
     * @return
     */
    public static <T> List<List<T>> averageAssign(List<T> source, int n) {
        List<List<T>> result = new ArrayList<List<T>>(n);
        int remaider = source.size() % n;
        int number = source.size() / n;
        int offset = 0;//偏移量
        for (int i = 0; i < n; i++) {
            List<T> value = null;
            if (remaider > 0) {
                value = source.subList(i * number + offset, (i + 1) * number + offset + 1);
                remaider--;
                offset++;
            } else {
                value = source.subList(i * number + offset, (i + 1) * number + offset);
            }
            result.add(value);
        }
        return result;
    }
}
