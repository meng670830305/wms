package jp.com.filterexpression;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 * 排列顺序优先级
 * 
 * @author wangyunpeng
 *
 */
public class SortPart {
	/**
	 * 排列顺序优先级数值
	 */
	private int _propriety = 0;

	/**
	 * 
	 * @return 返回排列顺序优先级数值
	 */
	@JSONField(name = "Propriety")
	public int getPropriety() {
		return this._propriety;
	}

	/**
	 * 
	 * @param propriety
	 *            设置排列顺序优先级数值
	 */
	public void setPropriety(int propriety) {
		this._propriety = propriety;
	}

	/**
	 * 
	 * @param propriety
	 *            设置排列顺序优先级数值
	 */
	public SortPart(int propriety) {
		this._propriety = propriety;
	}

	@Override
	public String toString() {
		if (this._propriety == 0) {
			return "不排序";
		} else if (this._propriety > 0) {
			return String.format("正序:第%d排序字段", this._propriety);
		} else {
			return String.format("倒序:第%d排序字段", -this._propriety);
		}
	}
}
