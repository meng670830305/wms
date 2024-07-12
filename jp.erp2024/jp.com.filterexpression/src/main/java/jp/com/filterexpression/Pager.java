package jp.com.filterexpression;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 * 分页
 * 
 * @author wangyunpeng
 *
 */
public class Pager {

	private Pager() {

	}

	public Pager(int pageIndex, int pageSize) {
		this._pageIndex = Math.max(1, pageIndex);
		this._pageSize = pageSize;
	}

	/**
	 * 当前显示第几页
	 */
	private int _pageIndex = 1;
	private int _pageSize = 10;

	@JSONField(name = "PageNumber")
	public int getPageNumber() {
		return this._pageIndex;
	}

	public void setPageNumber(int pageIndex) {
		this._pageIndex = pageIndex;
	}

	@JSONField(name = "PageSize")
	public int getPageSize() {
		return this._pageSize;
	}

	public void setPageSize(int pageSize) {
		this._pageSize = pageSize;
	}

	public static Pager Default = new Pager();

	public static Pager Max = new Pager(1, Integer.MAX_VALUE);

	public static Pager Min = new Pager(1, 1);

	@Override
	public String toString() {
		return String.format("{PageNumber:%d,PageSize:%d}", this._pageIndex, this._pageSize);
	}
}
