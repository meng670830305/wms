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
 * 文件:        Account_usergroupassign.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/16
 * 负责人:      wangyp
 */
 
package jp.db.erp2024.pojo;

import com.alibaba.fastjson2.annotation.JSONField;
import jakarta.validation.constraints.*;

/**
 * Account_usergroupassign 实体类
 */
@SuppressWarnings("serial")
public class Account_usergroupassign implements java.io.Serializable, Cloneable , IEntity 
{

    /**
	 *
	 */
    public static final String _ACCOUNT_USERGROUPASSIGN_ = "account_usergroupassign";
	/**
	 *
	 */
	public static final String _ID_ = "id";
	/**
	 *用户ID(外键)
	 */
	public static final String _USERID_ = "userid";
	/**
	 *组ID(外键)
	 */
	public static final String _GROUPID_ = "groupid";
	/**
	 *过期时间
	 */
	public static final String _EXPIREDTIME_ = "expiredtime";
	/**
	 *备注
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
    @NotNull
    @JSONField(name = "id")
	private Integer id = Integer.valueOf(0);
	/**
	 *用户ID(外键)
	 */
    
    @JSONField(name = "userid")
	private Integer userid;
	/**
	 *组ID(外键)
	 */
    
    @JSONField(name = "groupid")
	private Integer groupid;
	/**
	 *过期时间
	 */
    
    @JSONField(name = "expiredtime")
	private java.time.LocalDateTime expiredtime;
	/**
	 *备注
	 */
    @Size(min = 0, max = 1000 , message = "パラメータ名は1000文字以内")
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
	 *Account_usergroupassign 无参构造函数
	 */
	public Account_usergroupassign()
	{
	}
	/**
	 *Account_usergroupassign 有参构造函数
	 */
	public Account_usergroupassign
	(
		Integer id,
		Integer userid,
		Integer groupid,
		java.time.LocalDateTime expiredtime,
		String remark,
		java.time.LocalDateTime createtime,
		String createusername,
		java.time.LocalDateTime updatetime,
		String updateusername
	)
	{
		this.id = id;
		this.userid = userid;
		this.groupid = groupid;
		this.expiredtime = expiredtime;
		this.remark = remark;
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
     * 获取用户ID(外键)的值
     */
    @JSONField(name = "userid")
    public Integer getUserid(){
        return this.userid;
    }
    /**
     * 设置用户ID(外键)的值
     */
    @JSONField(name = "userid")
    public void setUserid(Integer userid){
        this.userid = userid;
    }
    /**
     * 获取组ID(外键)的值
     */
    @JSONField(name = "groupid")
    public Integer getGroupid(){
        return this.groupid;
    }
    /**
     * 设置组ID(外键)的值
     */
    @JSONField(name = "groupid")
    public void setGroupid(Integer groupid){
        this.groupid = groupid;
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
     * 获取备注的值
     */
    @JSONField(name = "remark")
    public String getRemark(){
        return this.remark;
    }
    /**
     * 设置备注的值
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
	
	

    @Override
	public boolean equals(Object obj) {
		boolean result = false;
		if(obj instanceof Account_usergroupassign){
			Account_usergroupassign other = (Account_usergroupassign)obj;
            result = other.getId().equals(this.getId());
		}
		return result;
	}
    
    @Override
	public String toString() {
		return "Account_usergroupassign {"
             + this.id + ','
                     + this.userid + ','
                     + this.groupid + ','
                     + this.expiredtime + ','
                     + this.remark + ','
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
			_fields = Account_usergroupassign.class.getDeclaredFields();
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
