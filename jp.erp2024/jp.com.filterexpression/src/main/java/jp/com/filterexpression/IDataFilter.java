/**
 * 
 */
package jp.com.filterexpression;

/**
 * 用来获取EasyUI中过滤分页的数据信息。
 * 
 * @author wangyunpeng
 *
 */
public interface IDataFilter<TEntity> {
	/**
	 * 设置分页对象
	 * 
	 * @param pager
	 */
	void setPager(Pager pager);

	/**
	 * 获取分页对象
	 * 
	 * @return
	 */
	Pager getPager();

	/**
	 * 获取过滤器
	 * 
	 * @param list
	 *            过滤条件列表
	 * @return
	 */
	IFilterator getFilterator(ExpressionList list)throws IllegalArgumentException, IllegalAccessException ;
}
