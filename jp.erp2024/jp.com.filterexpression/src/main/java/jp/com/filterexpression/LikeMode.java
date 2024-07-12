package jp.com.filterexpression;

import java.io.Serializable;

/**
 * @author wangyunpeng
 *
 */
@SuppressWarnings("unused")
public enum LikeMode implements Serializable {
	/**
	 * 任何位置,相当于 like '%value%' 
	 */
	AnyWhere(0), 
	/**
	 * 开始处,相当于 like 'value%'
	 */
	Start(1), 
	/**
	 * 结尾处,相当于 like '%value' 
	 */
	End(2), 
	/**
	 * 精确匹配,相当于 like 'value'
	 */
	Exact(3), 
	/**
	 * 空值
	 */
	EmptyOrNull(4);

	
	private int _value = 0;

	private LikeMode(int value) {
		this._value = value;
	}

	public static LikeMode valueOf(int value) {
		switch (value) {
		case 0:
			return AnyWhere;
		case 1:
			return Start;
		case 2:
			return End;
		case 3:
			return Exact;
		case 4:
			return EmptyOrNull;
		default:
			throw new IllegalArgumentException("Cannot deal with AnyMode enum value: " + value);
		}
	}
}
