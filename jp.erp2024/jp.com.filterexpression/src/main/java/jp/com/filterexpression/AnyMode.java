package jp.com.filterexpression;

import java.io.Serializable;

/**
 * 
 * @author wangyunpeng
 *
 */
@SuppressWarnings("unused")
public enum AnyMode implements Serializable {
	Contain(0), Exclude(1);

	private int _value = 0;

	private AnyMode(int value) {
		this._value = value;
	}

	public static AnyMode valueOf(int value) {
		switch (value) {
		case 0:
			return Contain;
		case 1:
			return Exclude;
		default:
			throw new IllegalArgumentException("Cannot deal with AnyMode enum value: " + value);
		}
	}
}
