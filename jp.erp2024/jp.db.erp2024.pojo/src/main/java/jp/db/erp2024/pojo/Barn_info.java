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
 * 文件:        Barn_info.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/16
 * 负责人:      wangyp
 */
 
package jp.db.erp2024.pojo;

import com.alibaba.fastjson2.annotation.JSONField;
import jakarta.validation.constraints.*;

/**
 * Barn_info 实体类
 */
@SuppressWarnings("serial")
public class Barn_info implements java.io.Serializable, Cloneable , IEntity 
{

    /**
	 *仓库房间信息
	 */
    public static final String _BARN_INFO_ = "barn_info";
	/**
	 *仓库房间ID，主键ID，自增ID
	 */
	public static final String _ID_ = "id";
	/**
	 *仓库房间名称
	 */
	public static final String _NAME_ = "name";
	/**
	 *仓库房间简介
	 */
	public static final String _DESCRIPTION_ = "description";
	/**
	 *仓库房间ID，外键ID
	 */
	public static final String _WAREHOUSE_ID_ = "warehouse_id";
	/**
	 *仓库房间类型
	 */
	public static final String _TYPE_ = "type";
	/**
	 *仓库房间排列顺序
	 */
	public static final String _SORT_ = "sort";
	/**
	 *仓库房间状态。枚举：-1=删除，0=下架，1=上架
	 */
	public static final String _STATE_ = "state";
	/**
	 *登録日，自動作成
	 */
	public static final String _CREATETIME_ = "createtime";
	/**
	 *登録人名称
	 */
	public static final String _CREATEUSERNAME_ = "createusername";
	/**
	 *更新日，自動作成
	 */
	public static final String _UPDATETIME_ = "updatetime";
	/**
	 *更新人名称
	 */
	public static final String _UPDATEUSERNAME_ = "updateusername";
        
	/**
	 *仓库房间ID，主键ID，自增ID
	 */
    @NotNull
    @JSONField(name = "id")
	private Integer id = Integer.valueOf(0);
	/**
	 *仓库房间名称
	 */
    @Size(min = 0, max = 255 , message = "パラメータ名は255文字以内")
    @JSONField(name = "name")
	private String name;
	/**
	 *仓库房间简介
	 */
    @Size(min = 0, max = 1000 , message = "パラメータ名は1000文字以内")
    @JSONField(name = "description")
	private String description;
	/**
	 *仓库房间ID，外键ID
	 */
    
    @JSONField(name = "warehouse_id")
	private Integer warehouse_id;
	/**
	 *仓库房间类型
	 */
    
    @JSONField(name = "type")
	private Integer type;
	/**
	 *仓库房间排列顺序
	 */
    
    @JSONField(name = "sort")
	private Integer sort;
	/**
	 *仓库房间状态。枚举：-1=删除，0=下架，1=上架
	 */
    
    @JSONField(name = "state")
	private Integer state;
	/**
	 *登録日，自動作成
	 */
    
    @JSONField(name = "createtime")
	private java.time.LocalDateTime createtime;
	/**
	 *登録人名称
	 */
    @Size(min = 0, max = 64 , message = "パラメータ名は64文字以内")
    @JSONField(name = "createusername")
	private String createusername;
	/**
	 *更新日，自動作成
	 */
    
    @JSONField(name = "updatetime")
	private java.time.LocalDateTime updatetime;
	/**
	 *更新人名称
	 */
    @Size(min = 0, max = 64 , message = "パラメータ名は64文字以内")
    @JSONField(name = "updateusername")
	private String updateusername;
    
	
    
	/**
	 *Barn_info 无参构造函数
	 */
	public Barn_info()
	{
	}
	/**
	 *Barn_info 有参构造函数
	 */
	public Barn_info
	(
		Integer id,
		String name,
		String description,
		Integer warehouse_id,
		Integer type,
		Integer sort,
		Integer state,
		java.time.LocalDateTime createtime,
		String createusername,
		java.time.LocalDateTime updatetime,
		String updateusername
	)
	{
		this.id = id;
		this.name = name;
		this.description = description;
		this.warehouse_id = warehouse_id;
		this.type = type;
		this.sort = sort;
		this.state = state;
		this.createtime = createtime;
		this.createusername = createusername;
		this.updatetime = updatetime;
		this.updateusername = updateusername;
		
	}
    
    /**
     * 获取仓库房间ID，主键ID，自增ID的值
     */
    @JSONField(name = "id")
    public Integer getId(){
        return this.id;
    }
    /**
     * 设置仓库房间ID，主键ID，自增ID的值
     */
    @JSONField(name = "id")
    public void setId(Integer id){
        this.id = id;
    }
    /**
     * 获取仓库房间名称的值
     */
    @JSONField(name = "name")
    public String getName(){
        return this.name;
    }
    /**
     * 设置仓库房间名称的值
     */
    @JSONField(name = "name")
    public void setName(String name){
        this.name = name;
    }
    /**
     * 获取仓库房间简介的值
     */
    @JSONField(name = "description")
    public String getDescription(){
        return this.description;
    }
    /**
     * 设置仓库房间简介的值
     */
    @JSONField(name = "description")
    public void setDescription(String description){
        this.description = description;
    }
    /**
     * 获取仓库房间ID，外键ID的值
     */
    @JSONField(name = "warehouse_id")
    public Integer getWarehouse_id(){
        return this.warehouse_id;
    }
    /**
     * 设置仓库房间ID，外键ID的值
     */
    @JSONField(name = "warehouse_id")
    public void setWarehouse_id(Integer warehouse_id){
        this.warehouse_id = warehouse_id;
    }
    /**
     * 获取仓库房间类型的值
     */
    @JSONField(name = "type")
    public Integer getType(){
        return this.type;
    }
    /**
     * 设置仓库房间类型的值
     */
    @JSONField(name = "type")
    public void setType(Integer type){
        this.type = type;
    }
    /**
     * 获取仓库房间排列顺序的值
     */
    @JSONField(name = "sort")
    public Integer getSort(){
        return this.sort;
    }
    /**
     * 设置仓库房间排列顺序的值
     */
    @JSONField(name = "sort")
    public void setSort(Integer sort){
        this.sort = sort;
    }
    /**
     * 获取仓库房间状态。枚举：-1=删除，0=下架，1=上架的值
     */
    @JSONField(name = "state")
    public Integer getState(){
        return this.state;
    }
    /**
     * 设置仓库房间状态。枚举：-1=删除，0=下架，1=上架的值
     */
    @JSONField(name = "state")
    public void setState(Integer state){
        this.state = state;
    }
    /**
     * 获取登録日，自動作成的值
     */
    @JSONField(name = "createtime")
    public java.time.LocalDateTime getCreatetime(){
        return this.createtime;
    }
    /**
     * 设置登録日，自動作成的值
     */
    @JSONField(name = "createtime")
    public void setCreatetime(java.time.LocalDateTime createtime){
        this.createtime = createtime;
    }
    /**
     * 获取登録人名称的值
     */
    @JSONField(name = "createusername")
    public String getCreateusername(){
        return this.createusername;
    }
    /**
     * 设置登録人名称的值
     */
    @JSONField(name = "createusername")
    public void setCreateusername(String createusername){
        this.createusername = createusername;
    }
    /**
     * 获取更新日，自動作成的值
     */
    @JSONField(name = "updatetime")
    public java.time.LocalDateTime getUpdatetime(){
        return this.updatetime;
    }
    /**
     * 设置更新日，自動作成的值
     */
    @JSONField(name = "updatetime")
    public void setUpdatetime(java.time.LocalDateTime updatetime){
        this.updatetime = updatetime;
    }
    /**
     * 获取更新人名称的值
     */
    @JSONField(name = "updateusername")
    public String getUpdateusername(){
        return this.updateusername;
    }
    /**
     * 设置更新人名称的值
     */
    @JSONField(name = "updateusername")
    public void setUpdateusername(String updateusername){
        this.updateusername = updateusername;
    }
	
	

    @Override
	public boolean equals(Object obj) {
		boolean result = false;
		if(obj instanceof Barn_info){
			Barn_info other = (Barn_info)obj;
            result = other.getId().equals(this.getId());
		}
		return result;
	}
    
    @Override
	public String toString() {
		return "Barn_info {"
             + this.id + ','
                     + this.name + ','
                     + this.description + ','
                     + this.warehouse_id + ','
                     + this.type + ','
                     + this.sort + ','
                     + this.state + ','
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
			_fields = Barn_info.class.getDeclaredFields();
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
