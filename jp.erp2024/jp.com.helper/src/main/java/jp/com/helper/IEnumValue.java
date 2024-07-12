package jp.com.helper;

/**
 * <pre>
 * 枚举类型的接口
 * </pre>
 *
 * @author wangyunpeng
 * @date 2021/1/10 12:41
 */
public interface IEnumValue<T> {
    /**
     * 获取枚举类型里面某一项的数值
     *
     * @return
     */
    T getValue();
}

