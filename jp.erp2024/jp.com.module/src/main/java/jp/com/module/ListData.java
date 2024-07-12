package jp.com.module;

import com.alibaba.fastjson2.JSONPath;
import com.alibaba.fastjson2.JSONWriter;
import com.alibaba.fastjson2.annotation.JSONField;

/**
 *  <pre>
 *  列表页数据格式
 *  </pre>
 *
 *  @author wangyunpeng
 *  @date 2020/11/7 13:48
 */
public class ListData {
	/**
	 * 总条数
	 */
	private Integer total;
	/**
	 * 某一页数据
	 */
	private Object rows;
	/**
	 * 底部数据
	 */
	private Object footer;

	/**
	 *
	 */
	public ListData() {
		super();
	}

	/**
	 * @param total
	 * @param rows
	 */
	public ListData(Integer total, Object rows) {
		super();
		this.total = total;
		this.rows = rows;
	}

	/**
	 * @param total
	 * @param rows
	 */
	public ListData(Integer total, Object rows, Object footer) {
		super();
		this.total = total;
		this.rows = rows;
		this.footer = footer;
	}

	@JSONField(name = "total")
	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	@JSONField(name = "rows")
	public Object getRows() {
		return rows;
	}

	public void setRows(Object rows) {
		this.rows = rows;
	}

	@JSONField(name = "footer", serializeFeatures = {JSONWriter.Feature.NotWriteDefaultValue})
	public Object getFooter() {
		return footer;
	}

	public void setFooter(Object footer) {
		this.footer = footer;
	}

}