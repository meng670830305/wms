/**
 * 在pom.xml文件复制下面的内容。
 <dependencies>
    <dependency>
        <groupId>com.alibaba.fastjson2</groupId>
        <artifactId>fastjson2</artifactId>
    </dependency>
 </dependencies>
 * 
 * 实体(jp.db.erp2024.pojo)包
 *
 * wangyp Copyright 2006-2023
 * 文件:        View_account_userroleassign.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/16
 * 负责人:      wangyp
 */
 
package jp.db.erp2024.pojo;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 * View_account_userroleassign 实体类
 */
@SuppressWarnings("serial")
public class View_account_userroleassign implements java.io.Serializable, Cloneable
{

    /**
	 *
	 */
    public static final String _VIEW_ACCOUNT_USERROLEASSIGN_ = "view_account_userroleassign";
	/**
	 *
	 */
	public static final String _ID_ = "id";
	/**
	 *
	 */
	public static final String _ROLEID_ = "roleid";
	/**
	 *
	 */
	public static final String _USERID_ = "userid";
	/**
	 *
	 */
	public static final String _EXPIREDTIME_ = "expiredtime";
	/**
	 *
	 */
	public static final String _ISENABLE_ = "isenable";
	/**
	 *
	 */
	public static final String _REMARK_ = "remark";
	/**
	 *
	 */
	public static final String _CREATETIME_ = "createtime";
	/**
	 *
	 */
	public static final String _CREATEUSERNAME_ = "createusername";
	/**
	 *
	 */
	public static final String _UPDATETIME_ = "updatetime";
	/**
	 *
	 */
	public static final String _UPDATEUSERNAME_ = "updateusername";
	/**
	 *
	 */
	public static final String _NAME_ = "name";
	/**
	 *
	 */
	public static final String _DESCRIPTION_ = "description";
        
	/**
	 *
	 */
    @JSONField(name = "id")
	private Integer id;
	/**
	 *
	 */
    @JSONField(name = "roleid")
	private Integer roleid;
	/**
	 *
	 */
    @JSONField(name = "userid")
	private Integer userid;
	/**
	 *
	 */
    @JSONField(name = "expiredtime")
	private java.time.LocalDateTime expiredtime;
	/**
	 *
	 */
    @JSONField(name = "isenable")
	private Integer isenable;
	/**
	 *
	 */
    @JSONField(name = "remark")
	private String remark;
	/**
	 *
	 */
    @JSONField(name = "createtime")
	private java.time.LocalDateTime createtime;
	/**
	 *
	 */
    @JSONField(name = "createusername")
	private String createusername;
	/**
	 *
	 */
    @JSONField(name = "updatetime")
	private java.time.LocalDateTime updatetime;
	/**
	 *
	 */
    @JSONField(name = "updateusername")
	private String updateusername;
	/**
	 *
	 */
    @JSONField(name = "name")
	private String name;
	/**
	 *
	 */
    @JSONField(name = "description")
	private String description;
    
	/**
	 *View_account_userroleassign 无参构造函数
	 */
	public View_account_userroleassign()
	{
	}
	/**
	 *View_account_userroleassign 有参构造函数
	 */
	public View_account_userroleassign
	(
		Integer id,
		Integer roleid,
		Integer userid,
		java.time.LocalDateTime expiredtime,
		Integer isenable,
		String remark,
		java.time.LocalDateTime createtime,
		String createusername,
		java.time.LocalDateTime updatetime,
		String updateusername,
		String name,
		String description
	)
	{
		this.id = id;
		this.roleid = roleid;
		this.userid = userid;
		this.expiredtime = expiredtime;
		this.isenable = isenable;
		this.remark = remark;
		this.createtime = createtime;
		this.createusername = createusername;
		this.updatetime = updatetime;
		this.updateusername = updateusername;
		this.name = name;
		this.description = description;
		
	}
    
    /**
     * 获取的值
     */
    @JSONField(name = "id")
    public Integer getId(){
        return this.id;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "id")
    public void setId(Integer id){
        this.id = id;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "roleid")
    public Integer getRoleid(){
        return this.roleid;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "roleid")
    public void setRoleid(Integer roleid){
        this.roleid = roleid;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "userid")
    public Integer getUserid(){
        return this.userid;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "userid")
    public void setUserid(Integer userid){
        this.userid = userid;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "expiredtime")
    public java.time.LocalDateTime getExpiredtime(){
        return this.expiredtime;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "expiredtime")
    public void setExpiredtime(java.time.LocalDateTime expiredtime){
        this.expiredtime = expiredtime;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "isenable")
    public Integer getIsenable(){
        return this.isenable;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "isenable")
    public void setIsenable(Integer isenable){
        this.isenable = isenable;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "remark")
    public String getRemark(){
        return this.remark;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "remark")
    public void setRemark(String remark){
        this.remark = remark;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "createtime")
    public java.time.LocalDateTime getCreatetime(){
        return this.createtime;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "createtime")
    public void setCreatetime(java.time.LocalDateTime createtime){
        this.createtime = createtime;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "createusername")
    public String getCreateusername(){
        return this.createusername;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "createusername")
    public void setCreateusername(String createusername){
        this.createusername = createusername;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "updatetime")
    public java.time.LocalDateTime getUpdatetime(){
        return this.updatetime;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "updatetime")
    public void setUpdatetime(java.time.LocalDateTime updatetime){
        this.updatetime = updatetime;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "updateusername")
    public String getUpdateusername(){
        return this.updateusername;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "updateusername")
    public void setUpdateusername(String updateusername){
        this.updateusername = updateusername;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "name")
    public String getName(){
        return this.name;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "name")
    public void setName(String name){
        this.name = name;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "description")
    public String getDescription(){
        return this.description;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "description")
    public void setDescription(String description){
        this.description = description;
    }

/*
    @Override
	public boolean equals(Object obj) {
		boolean result = false;
		if(obj instanceof View_account_userroleassign){
			View_account_userroleassign other = (View_account_userroleassign)obj;
			result = other.getId().equals(this.getId());
		}
		return result;
	}
*/
    @Override
	public String toString() {
		return "View_account_userroleassign {"
             + this.id + ','
                     + this.roleid + ','
                     + this.userid + ','
                     + this.expiredtime + ','
                     + this.isenable + ','
                     + this.remark + ','
                     + this.createtime + ','
                     + this.createusername + ','
                     + this.updatetime + ','
                     + this.updateusername + ','
                     + this.name + ','
                     + this.description
         + '}';
	}
    
    /**
     * 浅拷贝
     *
     * @return
     * @throws CloneNotSupportedException
     */
    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
    
    private static java.lang.reflect.Field[] _fields = null;
    
    public static java.lang.reflect.Field[] get_Fields() {
		if (_fields == null || _fields.length == 0) {
			_fields = View_account_userroleassign.class.getDeclaredFields();
		}
		return _fields;
	}
    
    
	/**
	 * 获取当前类中的所有公共的常量的字段
	 */
	private static java.util.Map<String, String> _finalFieldsMap = null;

	/**
	 * 获取当前类中的所有公共的常量的字段
	 * 
	 * @return 获取当前类中的所有公共的常量的字段
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	public static java.util.Map<String, String> get_Final_Fields() throws IllegalArgumentException, IllegalAccessException {
		if (_finalFieldsMap == null) {
			_finalFieldsMap = new java.util.HashMap<String, String>();
		}
		if (_finalFieldsMap.size() == 0) {
			java.lang.reflect.Field[] fields = get_Fields();
			for (java.lang.reflect.Field field : fields) {
				int modifiers = field.getModifiers();
				if (java.lang.reflect.Modifier.isStatic(modifiers) && java.lang.reflect.Modifier.isFinal(modifiers) && java.lang.reflect.Modifier.isPublic(modifiers)) {
					_finalFieldsMap.put(field.getName(), field.get(null).toString());
				}
			}
		}
		return _finalFieldsMap;
	}
}
