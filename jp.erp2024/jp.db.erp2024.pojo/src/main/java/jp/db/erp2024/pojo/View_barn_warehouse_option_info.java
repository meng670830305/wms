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
 * 文件:        View_barn_warehouse_option_info.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/17
 * 负责人:      wangyp
 */
 
package jp.db.erp2024.pojo;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 * View_barn_warehouse_option_info 实体类
 */
@SuppressWarnings("serial")
public class View_barn_warehouse_option_info implements java.io.Serializable, Cloneable
{

    /**
	 *
	 */
    public static final String _VIEW_BARN_WAREHOUSE_OPTION_INFO_ = "view_barn_warehouse_option_info";
	/**
	 *
	 */
	public static final String _ID_ = "id";
	/**
	 *
	 */
	public static final String _NAME_ = "name";
	/**
	 *
	 */
	public static final String _VALUES_ = "values";
	/**
	 *
	 */
	public static final String _SORT_ = "sort";
	/**
	 *
	 */
	public static final String _STATE_ = "state";
	/**
	 *
	 */
	public static final String _WAREHOUSE_ID_ = "warehouse_id";
	/**
	 *
	 */
	public static final String _WAREHOUSE_NAME_ = "warehouse_name";
	/**
	 *
	 */
	public static final String _WAREHOUSE_SORT_ = "warehouse_sort";
	/**
	 *
	 */
	public static final String _BARN_ID_ = "barn_id";
	/**
	 *
	 */
	public static final String _BARN_NAME_ = "barn_name";
	/**
	 *
	 */
	public static final String _BARN_SORT_ = "barn_sort";
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
    @JSONField(name = "id")
	private Integer id;
	/**
	 *
	 */
    @JSONField(name = "name")
	private String name;
	/**
	 *
	 */
    @JSONField(name = "values")
	private String values;
	/**
	 *
	 */
    @JSONField(name = "sort")
	private Integer sort;
	/**
	 *
	 */
    @JSONField(name = "state")
	private Integer state;
	/**
	 *
	 */
    @JSONField(name = "warehouse_id")
	private Integer warehouse_id;
	/**
	 *
	 */
    @JSONField(name = "warehouse_name")
	private String warehouse_name;
	/**
	 *
	 */
    @JSONField(name = "warehouse_sort")
	private Integer warehouse_sort;
	/**
	 *
	 */
    @JSONField(name = "barn_id")
	private Integer barn_id;
	/**
	 *
	 */
    @JSONField(name = "barn_name")
	private String barn_name;
	/**
	 *
	 */
    @JSONField(name = "barn_sort")
	private Integer barn_sort;
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
	 *View_barn_warehouse_option_info 无参构造函数
	 */
	public View_barn_warehouse_option_info()
	{
	}
	/**
	 *View_barn_warehouse_option_info 有参构造函数
	 */
	public View_barn_warehouse_option_info
	(
		Integer id,
		String name,
		String values,
		Integer sort,
		Integer state,
		Integer warehouse_id,
		String warehouse_name,
		Integer warehouse_sort,
		Integer barn_id,
		String barn_name,
		Integer barn_sort,
		java.time.LocalDateTime createtime,
		String createusername,
		java.time.LocalDateTime updatetime,
		String updateusername
	)
	{
		this.id = id;
		this.name = name;
		this.values = values;
		this.sort = sort;
		this.state = state;
		this.warehouse_id = warehouse_id;
		this.warehouse_name = warehouse_name;
		this.warehouse_sort = warehouse_sort;
		this.barn_id = barn_id;
		this.barn_name = barn_name;
		this.barn_sort = barn_sort;
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
    @JSONField(name = "values")
    public String getValues(){
        return this.values;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "values")
    public void setValues(String values){
        this.values = values;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "sort")
    public Integer getSort(){
        return this.sort;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "sort")
    public void setSort(Integer sort){
        this.sort = sort;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "state")
    public Integer getState(){
        return this.state;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "state")
    public void setState(Integer state){
        this.state = state;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "warehouse_id")
    public Integer getWarehouse_id(){
        return this.warehouse_id;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "warehouse_id")
    public void setWarehouse_id(Integer warehouse_id){
        this.warehouse_id = warehouse_id;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "warehouse_name")
    public String getWarehouse_name(){
        return this.warehouse_name;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "warehouse_name")
    public void setWarehouse_name(String warehouse_name){
        this.warehouse_name = warehouse_name;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "warehouse_sort")
    public Integer getWarehouse_sort(){
        return this.warehouse_sort;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "warehouse_sort")
    public void setWarehouse_sort(Integer warehouse_sort){
        this.warehouse_sort = warehouse_sort;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "barn_id")
    public Integer getBarn_id(){
        return this.barn_id;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "barn_id")
    public void setBarn_id(Integer barn_id){
        this.barn_id = barn_id;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "barn_name")
    public String getBarn_name(){
        return this.barn_name;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "barn_name")
    public void setBarn_name(String barn_name){
        this.barn_name = barn_name;
    }
    /**
     * 获取的值
     */
    @JSONField(name = "barn_sort")
    public Integer getBarn_sort(){
        return this.barn_sort;
    }
    /**
     * 设置的值
     */
    @JSONField(name = "barn_sort")
    public void setBarn_sort(Integer barn_sort){
        this.barn_sort = barn_sort;
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

/*
    @Override
	public boolean equals(Object obj) {
		boolean result = false;
		if(obj instanceof View_barn_warehouse_option_info){
			View_barn_warehouse_option_info other = (View_barn_warehouse_option_info)obj;
			result = other.getId().equals(this.getId());
		}
		return result;
	}
*/
    @Override
	public String toString() {
		return "View_barn_warehouse_option_info {"
             + this.id + ','
                     + this.name + ','
                     + this.values + ','
                     + this.sort + ','
                     + this.state + ','
                     + this.warehouse_id + ','
                     + this.warehouse_name + ','
                     + this.warehouse_sort + ','
                     + this.barn_id + ','
                     + this.barn_name + ','
                     + this.barn_sort + ','
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
			_fields = View_barn_warehouse_option_info.class.getDeclaredFields();
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
