/**
 * 在pom.xml文件复制下面的内容。
 <dependencies>
    <dependency>
        <groupId>com.alibaba.fastjson2</groupId>
        <artifactId>fastjson2</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
 </dependencies>
 * 
 * 实体(jp.db.erp2024.pojo)包
 *
 * wangyp Copyright 2006-2023
 * 文件:        Account_userpermissionassign.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/16
 * 负责人:      wangyp
 */
 
package jp.db.erp2024.pojo;

import com.alibaba.fastjson2.annotation.JSONField;
import jakarta.validation.constraints.*;

/**
 * Account_userpermissionassign 实体类
 */
@SuppressWarnings("serial")
public class Account_userpermissionassign implements java.io.Serializable, Cloneable , IEntity 
{

    /**
	 *
	 */
    public static final String _ACCOUNT_USERPERMISSIONASSIGN_ = "account_userpermissionassign";
	/**
	 *
	 */
	public static final String _ID_ = "id";
	/**
	 *用户ID
	 */
	public static final String _USERID_ = "userid";
	/**
	 *权限ID
	 */
	public static final String _PERMISSIONID_ = "permissionid";
	/**
	 *分配类型[枚举]:排除，包含
	 */
	public static final String _ASSIGNTYPE_ = "assigntype";
	/**
	 *是否可用
	 */
	public static final String _ISENABLE_ = "isenable";
	/**
	 *过期时间
	 */
	public static final String _EXPIREDTIME_ = "expiredtime";
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
    @NotNull
    @JSONField(name = "id")
	private Integer id = Integer.valueOf(0);
	/**
	 *用户ID
	 */
    
    @JSONField(name = "userid")
	private Integer userid;
	/**
	 *权限ID
	 */
    @Size(min = 0, max = 50 , message = "パラメータ名は50文字以内")
    @JSONField(name = "permissionid")
	private String permissionid;
	/**
	 *分配类型[枚举]:排除，包含
	 */
    
    @JSONField(name = "assigntype")
	private Integer assigntype;
	/**
	 *是否可用
	 */
    
    @JSONField(name = "isenable")
	private Integer isenable;
	/**
	 *过期时间
	 */
    
    @JSONField(name = "expiredtime")
	private java.time.LocalDateTime expiredtime;
	/**
	 *
	 */
    
    @JSONField(name = "createtime")
	private java.time.LocalDateTime createtime;
	/**
	 *
	 */
    @Size(min = 0, max = 64 , message = "パラメータ名は64文字以内")
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
    @Size(min = 0, max = 64 , message = "パラメータ名は64文字以内")
    @JSONField(name = "updateusername")
	private String updateusername;
    
	
    
	/**
	 *Account_userpermissionassign 无参构造函数
	 */
	public Account_userpermissionassign()
	{
	}
	/**
	 *Account_userpermissionassign 有参构造函数
	 */
	public Account_userpermissionassign
	(
		Integer id,
		Integer userid,
		String permissionid,
		Integer assigntype,
		Integer isenable,
		java.time.LocalDateTime expiredtime,
		java.time.LocalDateTime createtime,
		String createusername,
		java.time.LocalDateTime updatetime,
		String updateusername
	)
	{
		this.id = id;
		this.userid = userid;
		this.permissionid = permissionid;
		this.assigntype = assigntype;
		this.isenable = isenable;
		this.expiredtime = expiredtime;
		this.createtime = createtime;
		this.createusername = createusername;
		this.updatetime = updatetime;
		this.updateusername = updateusername;
		
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
     * 获取用户ID的值
     */
    @JSONField(name = "userid")
    public Integer getUserid(){
        return this.userid;
    }
    /**
     * 设置用户ID的值
     */
    @JSONField(name = "userid")
    public void setUserid(Integer userid){
        this.userid = userid;
    }
    /**
     * 获取权限ID的值
     */
    @JSONField(name = "permissionid")
    public String getPermissionid(){
        return this.permissionid;
    }
    /**
     * 设置权限ID的值
     */
    @JSONField(name = "permissionid")
    public void setPermissionid(String permissionid){
        this.permissionid = permissionid;
    }
    /**
     * 获取分配类型[枚举]:排除，包含的值
     */
    @JSONField(name = "assigntype")
    public Integer getAssigntype(){
        return this.assigntype;
    }
    /**
     * 设置分配类型[枚举]:排除，包含的值
     */
    @JSONField(name = "assigntype")
    public void setAssigntype(Integer assigntype){
        this.assigntype = assigntype;
    }
    /**
     * 获取是否可用的值
     */
    @JSONField(name = "isenable")
    public Integer getIsenable(){
        return this.isenable;
    }
    /**
     * 设置是否可用的值
     */
    @JSONField(name = "isenable")
    public void setIsenable(Integer isenable){
        this.isenable = isenable;
    }
    /**
     * 获取过期时间的值
     */
    @JSONField(name = "expiredtime")
    public java.time.LocalDateTime getExpiredtime(){
        return this.expiredtime;
    }
    /**
     * 设置过期时间的值
     */
    @JSONField(name = "expiredtime")
    public void setExpiredtime(java.time.LocalDateTime expiredtime){
        this.expiredtime = expiredtime;
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
	
	

    @Override
	public boolean equals(Object obj) {
		boolean result = false;
		if(obj instanceof Account_userpermissionassign){
			Account_userpermissionassign other = (Account_userpermissionassign)obj;
            result = other.getId().equals(this.getId());
		}
		return result;
	}
    
    @Override
	public String toString() {
		return "Account_userpermissionassign {"
             + this.id + ','
                     + this.userid + ','
                     + this.permissionid + ','
                     + this.assigntype + ','
                     + this.isenable + ','
                     + this.expiredtime + ','
                     + this.createtime + ','
                     + this.createusername + ','
                     + this.updatetime + ','
                     + this.updateusername
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
			_fields = Account_userpermissionassign.class.getDeclaredFields();
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
