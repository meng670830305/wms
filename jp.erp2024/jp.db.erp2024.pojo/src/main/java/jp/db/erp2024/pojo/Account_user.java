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
 * 文件:        Account_user.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/16
 * 负责人:      wangyp
 */
 
package jp.db.erp2024.pojo;

import com.alibaba.fastjson2.annotation.JSONField;
import jakarta.validation.constraints.*;

/**
 * Account_user 实体类
 */
@SuppressWarnings("serial")
public class Account_user implements java.io.Serializable, Cloneable , IEntity 
{

    /**
	 *
	 */
    public static final String _ACCOUNT_USER_ = "account_user";
	/**
	 *用户ID
	 */
	public static final String _ID_ = "id";
	/**
	 *昵称
	 */
	public static final String _PETNAME_ = "petname";
	/**
	 *真实姓名
	 */
	public static final String _REALNAME_ = "realname";
	/**
	 *登录账户
	 */
	public static final String _LOGINACCOUNT_ = "loginaccount";
	/**
	 *登录密码
	 */
	public static final String _LOGINPASSWORD_ = "loginpassword";
	/**
	 *最后一次登录时间
	 */
	public static final String _LOGINTIME_ = "logintime";
	/**
	 *最后一次登录IP
	 */
	public static final String _LOGINIP_ = "loginip";
	/**
	 *用户状态[枚举]：正常，冻结，注销.....
	 */
	public static final String _STATUS_ = "status";
	/**
	 *手机/座机
	 */
	public static final String _PHONE_ = "phone";
	/**
	 *邮箱
	 */
	public static final String _EMAIL_ = "email";
	/**
	 *所属组文本(冗余字段,用“,”分割)
	 */
	public static final String _GROUPTEXT_ = "grouptext";
	/**
	 *所属角色(冗余字段，用“,”分割)
	 */
	public static final String _ROLETEXT_ = "roletext";
	/**
	 *所属部门
	 */
	public static final String _DEPARTMENT_ = "department";
	/**
	 *用户HasH,可用于找回密码以及清空用户缓存使用
	 */
	public static final String _HASH_ = "hash";
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
	 *用户ID
	 */
    @NotNull
    @JSONField(name = "id")
	private Integer id = Integer.valueOf(0);
	/**
	 *昵称
	 */
    @Size(min = 0, max = 50 , message = "パラメータ名は50文字以内")
    @JSONField(name = "petname")
	private String petname;
	/**
	 *真实姓名
	 */
    @Size(min = 0, max = 50 , message = "パラメータ名は50文字以内")
    @JSONField(name = "realname")
	private String realname;
	/**
	 *登录账户
	 */
    @Size(min = 0, max = 50 , message = "パラメータ名は50文字以内")
    @JSONField(name = "loginaccount")
	private String loginaccount;
	/**
	 *登录密码
	 */
    @Size(min = 0, max = 50 , message = "パラメータ名は50文字以内")
    @JSONField(name = "loginpassword")
	private String loginpassword;
	/**
	 *最后一次登录时间
	 */
    
    @JSONField(name = "logintime")
	private java.time.LocalDateTime logintime;
	/**
	 *最后一次登录IP
	 */
    @Size(min = 0, max = 50 , message = "パラメータ名は50文字以内")
    @JSONField(name = "loginip")
	private String loginip;
	/**
	 *用户状态[枚举]：正常，冻结，注销.....
	 */
    
    @JSONField(name = "status")
	private Integer status;
	/**
	 *手机/座机
	 */
    @Size(min = 0, max = 50 , message = "パラメータ名は50文字以内")
    @JSONField(name = "phone")
	private String phone;
	/**
	 *邮箱
	 */
    @Size(min = 0, max = 50 , message = "パラメータ名は50文字以内")
    @JSONField(name = "email")
	private String email;
	/**
	 *所属组文本(冗余字段,用“,”分割)
	 */
    @Size(min = 0, max = 1000 , message = "パラメータ名は1000文字以内")
    @JSONField(name = "grouptext")
	private String grouptext;
	/**
	 *所属角色(冗余字段，用“,”分割)
	 */
    @Size(min = 0, max = 1000 , message = "パラメータ名は1000文字以内")
    @JSONField(name = "roletext")
	private String roletext;
	/**
	 *所属部门
	 */
    @Size(min = 0, max = 50 , message = "パラメータ名は50文字以内")
    @JSONField(name = "department")
	private String department;
	/**
	 *用户HasH,可用于找回密码以及清空用户缓存使用
	 */
    @Size(min = 0, max = 50 , message = "パラメータ名は50文字以内")
    @JSONField(name = "hash")
	private String hash;
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
	 *Account_user 无参构造函数
	 */
	public Account_user()
	{
	}
	/**
	 *Account_user 有参构造函数
	 */
	public Account_user
	(
		Integer id,
		String petname,
		String realname,
		String loginaccount,
		String loginpassword,
		java.time.LocalDateTime logintime,
		String loginip,
		Integer status,
		String phone,
		String email,
		String grouptext,
		String roletext,
		String department,
		String hash,
		java.time.LocalDateTime createtime,
		String createusername,
		java.time.LocalDateTime updatetime,
		String updateusername
	)
	{
		this.id = id;
		this.petname = petname;
		this.realname = realname;
		this.loginaccount = loginaccount;
		this.loginpassword = loginpassword;
		this.logintime = logintime;
		this.loginip = loginip;
		this.status = status;
		this.phone = phone;
		this.email = email;
		this.grouptext = grouptext;
		this.roletext = roletext;
		this.department = department;
		this.hash = hash;
		this.createtime = createtime;
		this.createusername = createusername;
		this.updatetime = updatetime;
		this.updateusername = updateusername;
		
	}
    
    /**
     * 获取用户ID的值
     */
    @JSONField(name = "id")
    public Integer getId(){
        return this.id;
    }
    /**
     * 设置用户ID的值
     */
    @JSONField(name = "id")
    public void setId(Integer id){
        this.id = id;
    }
    /**
     * 获取昵称的值
     */
    @JSONField(name = "petname")
    public String getPetname(){
        return this.petname;
    }
    /**
     * 设置昵称的值
     */
    @JSONField(name = "petname")
    public void setPetname(String petname){
        this.petname = petname;
    }
    /**
     * 获取真实姓名的值
     */
    @JSONField(name = "realname")
    public String getRealname(){
        return this.realname;
    }
    /**
     * 设置真实姓名的值
     */
    @JSONField(name = "realname")
    public void setRealname(String realname){
        this.realname = realname;
    }
    /**
     * 获取登录账户的值
     */
    @JSONField(name = "loginaccount")
    public String getLoginaccount(){
        return this.loginaccount;
    }
    /**
     * 设置登录账户的值
     */
    @JSONField(name = "loginaccount")
    public void setLoginaccount(String loginaccount){
        this.loginaccount = loginaccount;
    }
    /**
     * 获取登录密码的值
     */
    @JSONField(name = "loginpassword")
    public String getLoginpassword(){
        return this.loginpassword;
    }
    /**
     * 设置登录密码的值
     */
    @JSONField(name = "loginpassword")
    public void setLoginpassword(String loginpassword){
        this.loginpassword = loginpassword;
    }
    /**
     * 获取最后一次登录时间的值
     */
    @JSONField(name = "logintime")
    public java.time.LocalDateTime getLogintime(){
        return this.logintime;
    }
    /**
     * 设置最后一次登录时间的值
     */
    @JSONField(name = "logintime")
    public void setLogintime(java.time.LocalDateTime logintime){
        this.logintime = logintime;
    }
    /**
     * 获取最后一次登录IP的值
     */
    @JSONField(name = "loginip")
    public String getLoginip(){
        return this.loginip;
    }
    /**
     * 设置最后一次登录IP的值
     */
    @JSONField(name = "loginip")
    public void setLoginip(String loginip){
        this.loginip = loginip;
    }
    /**
     * 获取用户状态[枚举]：正常，冻结，注销.....的值
     */
    @JSONField(name = "status")
    public Integer getStatus(){
        return this.status;
    }
    /**
     * 设置用户状态[枚举]：正常，冻结，注销.....的值
     */
    @JSONField(name = "status")
    public void setStatus(Integer status){
        this.status = status;
    }
    /**
     * 获取手机/座机的值
     */
    @JSONField(name = "phone")
    public String getPhone(){
        return this.phone;
    }
    /**
     * 设置手机/座机的值
     */
    @JSONField(name = "phone")
    public void setPhone(String phone){
        this.phone = phone;
    }
    /**
     * 获取邮箱的值
     */
    @JSONField(name = "email")
    public String getEmail(){
        return this.email;
    }
    /**
     * 设置邮箱的值
     */
    @JSONField(name = "email")
    public void setEmail(String email){
        this.email = email;
    }
    /**
     * 获取所属组文本(冗余字段,用“,”分割)的值
     */
    @JSONField(name = "grouptext")
    public String getGrouptext(){
        return this.grouptext;
    }
    /**
     * 设置所属组文本(冗余字段,用“,”分割)的值
     */
    @JSONField(name = "grouptext")
    public void setGrouptext(String grouptext){
        this.grouptext = grouptext;
    }
    /**
     * 获取所属角色(冗余字段，用“,”分割)的值
     */
    @JSONField(name = "roletext")
    public String getRoletext(){
        return this.roletext;
    }
    /**
     * 设置所属角色(冗余字段，用“,”分割)的值
     */
    @JSONField(name = "roletext")
    public void setRoletext(String roletext){
        this.roletext = roletext;
    }
    /**
     * 获取所属部门的值
     */
    @JSONField(name = "department")
    public String getDepartment(){
        return this.department;
    }
    /**
     * 设置所属部门的值
     */
    @JSONField(name = "department")
    public void setDepartment(String department){
        this.department = department;
    }
    /**
     * 获取用户HasH,可用于找回密码以及清空用户缓存使用的值
     */
    @JSONField(name = "hash")
    public String getHash(){
        return this.hash;
    }
    /**
     * 设置用户HasH,可用于找回密码以及清空用户缓存使用的值
     */
    @JSONField(name = "hash")
    public void setHash(String hash){
        this.hash = hash;
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
		if(obj instanceof Account_user){
			Account_user other = (Account_user)obj;
            result = other.getId().equals(this.getId());
		}
		return result;
	}
    
    @Override
	public String toString() {
		return "Account_user {"
             + this.id + ','
                     + this.petname + ','
                     + this.realname + ','
                     + this.loginaccount + ','
                     + this.loginpassword + ','
                     + this.logintime + ','
                     + this.loginip + ','
                     + this.status + ','
                     + this.phone + ','
                     + this.email + ','
                     + this.grouptext + ','
                     + this.roletext + ','
                     + this.department + ','
                     + this.hash + ','
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
			_fields = Account_user.class.getDeclaredFields();
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
