/**
 * 
 */
package jp.com.module;

import java.util.List;

/**
 * @author Administrator
 *
 */
@SuppressWarnings("serial")
public class PagedResult<T> implements java.io.Serializable {
	/**
	 * 结果集
	 */
	private List<T> Results;
	/**
	 * 页数
	 */
	private int PageNumber;
	/**
	 * 获取总页数
	 */
	private int PageCount = this.PageSize > 0 ? (this.TotalCount / this.PageSize + (this.TotalCount % this.PageSize > 1 ? 1 : 0)) : this.TotalCount;;
	/**
	 * 分页大小
	 */
	private int PageSize;
	/**
	 * 当前查询下的所有结果的总数
	 */
	private int TotalCount;
	/**
	 * 获取当前查询结果集中的记录数量
	 */
	private int Count = this.Results != null ? this.Results.size() : 0;

	/**
	 * 
	 */
	public PagedResult() {
		super();
	}

	/**
	 * 不返回分业结果
	 * 
	 * @param results
	 */
	public PagedResult(List<T> results, int totalCount) {
		this.Results = results;
		this.TotalCount = totalCount;
	}

	/**
	 * 返回分页结果
	 * 
	 * @param results
	 * @param pageNumber
	 * @param pageSize
	 * @param totalCount
	 */
	public PagedResult(List<T> results, int pageNumber, int pageSize, int totalCount) {
		super();
		this.Results = results;
		this.PageNumber = pageNumber;
		this.PageSize = pageSize;
		this.TotalCount = totalCount;
	}

	public List<T> getResults() {
		return this.Results;
	}

	public void setResults(List<T> results) {
		this.Results = results;
	}

	public int getPageNumber() {
		return this.PageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.PageNumber = pageNumber;
	}

	public int getPageSize() {
		return this.PageSize;
	}

	public void setPageSize(int pageSize) {
		this.PageSize = pageSize;
	}

	public int getTotalCount() {
		return this.TotalCount;
	}

	public void setTotalCount(int totalCount) {
		this.TotalCount = totalCount;
	}

	public int getPageCount() {
		return this.PageCount;
	}

	public int getCount() {
		return this.Count;
	}

}
