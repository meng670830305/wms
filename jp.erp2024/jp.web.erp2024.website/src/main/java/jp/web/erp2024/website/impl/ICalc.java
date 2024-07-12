package jp.web.erp2024.website.impl;

import jp.com.helper.ArithHelper;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

/**
 * <pre>
 *
 * </pre>
 *
 * @author wangyunpeng
 * @date 2023/6/26 22:39
 * @company ㍿○○○○
 */
public interface ICalc {

    /**
     * 获取指定范围可组合的数量
     *
     * @param valuesList
     * @param start
     * @param end
     * @return
     */
    default int getCount(List<String> valuesList, int start, int end) {
        int count = 0;
        if (valuesList.size() > 0) {
            count = 1;
            for (int i = start; i <= end; i++) {
                count = ArithHelper.mul(count, StringUtils.split(valuesList.get(i), ',').length);
            }
        }
        return count;
    }

    /**
     * 获取所有可组合的数量
     *
     * @param valuesList
     * @return
     */
    default int getAllCount(List<String> valuesList) {
        return this.getCount(valuesList, 0, valuesList.size() - 1);
    }

    /**
     * 获取当前传入end位置之前的所有可组合数量
     *
     * @param valuesList
     * @param end
     * @return
     */
    default int getEndCount(List<String> valuesList, int end) {
        return this.getCount(valuesList, 0, --end);
    }

    /**
     * 获取当前传入start位置之后的所有可组合数量
     *
     * @param valuesList
     * @param start
     * @return
     */
    default int getStartCount(List<String> valuesList, int start) {
        return this.getCount(valuesList, ++start, valuesList.size() - 1);
    }

}
