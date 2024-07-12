/**
 * 
 */
package jp.com.module;

/**
 * 实体类需要用JQuery EasyUI里面的Tree控件显示数据时需要继承此接口
 * @author wangyunpeng
 *
 */
public interface ITreeData {
	int getParentID();
	void setParentID(int parentID);
	int getID();
	void setID(int id);
	String getName();
	void setName(String name);
	String getDescription();
	void setDescription(String description);
	
}
