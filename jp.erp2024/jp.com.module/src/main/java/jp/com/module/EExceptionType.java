/**
 * 
 */
package jp.com.module;

/**
 * 异常类型枚举
 * @author wangyunpeng
 *
 */
public enum EExceptionType {
	/**
	 * 0失败
	 */
	Error(0),
	/**
	 * 1成功
	 */
	Success(1),
	/**
	 * -100系统异常
	 */
	SystemError(-100),
	/**
	 * -101用户未登录
	 */
	NotLogin(-101),
	/**
	 * -102无效的参数信息
	 */
	ArgumentError(-102),
	/**
	 * -103用户在黑名单列表
	 */
	InBlackList(-103);
	
	@SuppressWarnings("unused")
	private int _value = 0;
	
	EExceptionType(int value){
		this._value = value;
	}
}
