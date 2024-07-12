/**
 * 
 */
package jp.com.module;

/**
 * Json错误类型
 * @author Administrator
 *
 */
public enum EJsonErrorType {
	/**
	 * 提示消息
	 */
	Message(0),
	/**
	 * 堆栈
	 */
	Stack(1),
	/*
	 * 详细
	 */
	Detail(2);
	
	@SuppressWarnings("unused")
	private int _value = 0;
	
	EJsonErrorType(int value){
		this._value = value;
	}
}
