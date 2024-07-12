package jp.com.filterexpression;

/**
 * 排序
 * @author wangyunpeng
 *
 */
public class SortBuilder {
	/**
	 * 本类不能被实例化
	 */
	private SortBuilder(){
		
	}
	
	/**
	 * 返回正序排序(数值的绝对值大小代表排序的优先级，数值0代表不排序，1的优先级比10的优先级高)
	 * @param propriety
	 * @return
	 */
	public static SortPart asc(int propriety){
		return new SortPart(Math.abs(propriety));
	}
	/**
	 * 返回倒序排序(数值的绝对值大小代表排序的优先级，数值0代表不排序，1的优先级比10的优先级高)
	 * @param propriety
	 * @return
	 */
	public static SortPart desc(int propriety){
		return new SortPart(-Math.abs(propriety));
	}
	
}
