/**
 * 
 */
package jp.com.filterexpression;

import java.io.Serializable;

/**
 * 比较操作符
 * 
 * @author wangyunpeng
 *
 */
public enum CompareOperator implements Serializable {
	Equal(0), NotEqual(1), GreaterThan(2), GreaterThanEqual(3), LessThan(4), LessThanEqual(5), Null(6), NotNull(7);

	private int _value = 0;

	private CompareOperator(int value) {
		this._value = value;
	}

	/**
	 * @return the _value
	 */
	public int getValue() {
		return _value;
	}

	/**
	 * @param _value
	 *            the _value to set
	 */
	public void setValue(int value) {
		this._value = value;
	}

	/**
	 * 手写的从int到enum的转换函数
	 * 
	 * @param value
	 * @return
	 */
	public static CompareOperator valueOf(int value) {
		switch (value) {
		case 0:
			return Equal;
		case 1:
			return NotEqual;
		case 2:
			return GreaterThan;
		case 3:
			return GreaterThanEqual;
		case 4:
			return LessThan;
		case 5:
			return LessThanEqual;
		case 6:
			return Null;
		case 7:
			return NotNull;
		default:
			throw new IllegalArgumentException("Cannot deal with CompareOperator enum value: " + value);
		}
	}
}
