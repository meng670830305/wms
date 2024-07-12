package jp.com.filterexpression;

/**
 * 过滤规则
 * @author wangyunpeng
 *
 */
public interface IFilterator {
	/**
	 * 获取where条件
	 * @return
	 */
	String getWhere();
	/**
	 * 获取order by条件
	 * @return
	 */
	String getSortField();
}
