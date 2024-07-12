package jp.com.filterexpression;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * 从NHibernate里面取出来的源代码 Represents an strategy for matching strings using "like".
 * 
 * @author wangyunpeng
 *
 */
@SuppressWarnings({"serial","rawtypes", "unchecked"})
public abstract class MatchMode implements Serializable {
	private final String name;
	private static final Map INSTANCES = new HashMap();

	protected MatchMode(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return this.name;
	}

	public abstract String toMatchString(String pattern);

	public static final MatchMode EXACT = new MatchMode("EXACT") {
		@Override
		public String toMatchString(String pattern) {
			return pattern;
		}
	};

	public static final MatchMode START = new MatchMode("START") {
		@Override
		public String toMatchString(String pattern) {
			return pattern + "%";
		}
	};

	public static final MatchMode END = new MatchMode("END") {
		@Override
		public String toMatchString(String pattern) {
			return "%" + pattern;
		}
	};

	public static final MatchMode ANYWHERE = new MatchMode("ANYWHERE") {
		@Override
		public String toMatchString(String pattern) {
			return "%" + pattern + "%";
		}
	};

	/**
	 * 只能放在内部类实现的下面
	 */
	static {
		INSTANCES.put(EXACT.name, EXACT);
		INSTANCES.put(END.name, END);
		INSTANCES.put(START.name, START);
		INSTANCES.put(ANYWHERE.name, ANYWHERE);
	}

}
