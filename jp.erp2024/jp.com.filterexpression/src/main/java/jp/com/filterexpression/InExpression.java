/*
在pom.xml文件复制下面的内容。
<dependencies>
	<dependency>
		<groupId>org.apache.commons</groupId>
		<artifactId>commons-lang3</artifactId>
		<version>3.4</version>
	</dependency>
</dependencies>
*/

package jp.com.filterexpression;

import org.apache.commons.lang3.StringUtils;


/**
 * @author wangyunpeng
 *
 */
public class InExpression extends AbstractExpression {

	private String _propertyName;

	private Object[] _values;

	/**
	 * @param propertyName
	 * @param values
	 */
	public InExpression(String propertyName, Object[] values) {
		super();
		this._propertyName = propertyName;
		Object[] array = new Object[values.length];
		System.arraycopy(values, 0, array, 0, values.length);
		this._values = array;
	}

	@Override
	public String toString() {
		String result = null;
		result = String.format("%s IN (%s)", this._propertyName, StringUtils.join(this._values, ','));
		return result;
	}

}