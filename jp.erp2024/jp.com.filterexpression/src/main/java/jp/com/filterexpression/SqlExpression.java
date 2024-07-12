package jp.com.filterexpression;

/**
 * @author wangyunpeng
 *
 */
public class SqlExpression extends AbstractExpression {

	private String _sql = null;

	/**
	 * SQL 语句过滤条件
	 * 
	 * @param sql
	 *            SQL语句
	 */
	public SqlExpression(String sql) {
		super();
		this._sql = sql;
	}

	@Override
	public String toString() {
		return this._sql;
	}

}
