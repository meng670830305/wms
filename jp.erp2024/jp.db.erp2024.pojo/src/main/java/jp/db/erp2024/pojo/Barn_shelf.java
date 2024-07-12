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
 * 文件:        Barn_shelf.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/16
 * 负责人:      wangyp
 */
 
package jp.db.erp2024.pojo;

import com.alibaba.fastjson2.annotation.JSONField;
import jakarta.validation.constraints.*;

/**
 * Barn_shelf 实体类
 */
@SuppressWarnings("serial")
public class Barn_shelf implements java.io.Serializable, Cloneable , IEntity 
{

    /**
	 *仓库房间里摆放物品的具体位置
	 */
    public static final String _BARN_SHELF_ = "barn_shelf";
	/**
	 *PLACEID，主键ID，自增ID
	 */
	public static final String _ID_ = "id";
	/**
	 *BARNID，外键ID
	 */
	public static final String _BARN_ID_ = "barn_id";
	/**
	 *图片ID，外键ID
	 */
	public static final String _IMAGE_ID_ = "image_id";
	/**
	 *SHELF标识码：{"颜色":"红色","重量":"1kg"}
	 */
	public static final String _SHELF_CODE_ = "shelf_code";
	/**
	 *放置SKU的数量
	 */
	public static final String _COUNT_ = "count";
	/**
	 *SHELF排列顺序
	 */
	public static final String _SORT_ = "sort";
	/**
	 *SHELF状态。枚举：-1=删除，0=下架，1=上架
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
	 *PLACEID，主键ID，自增ID
	 */
    @NotNull
    @JSONField(name = "id")
	private Integer id = Integer.valueOf(0);
	/**
	 *BARNID，外键ID
	 */
    
    @JSONField(name = "barn_id")
	private Integer barn_id;
	/**
	 *图片ID，外键ID
	 */
    
    @JSONField(name = "image_id")
	private Integer image_id;
	/**
	 *SHELF标识码：{"颜色":"红色","重量":"1kg"}
	 */
    
    @JSONField(name = "shelf_code")
	private String shelf_code;
	/**
	 *放置SKU的数量
	 */
    
    @JSONField(name = "count")
	private Integer count;
	/**
	 *SHELF排列顺序
	 */
    
    @JSONField(name = "sort")
	private Integer sort;
	/**
	 *SHELF状态。枚举：-1=删除，0=下架，1=上架
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
	 *Barn_shelf 无参构造函数
	 */
	public Barn_shelf()
	{
	}
	/**
	 *Barn_shelf 有参构造函数
	 */
	public Barn_shelf
	(
		Integer id,
		Integer barn_id,
		Integer image_id,
		String shelf_code,
		Integer count,
		Integer sort,
		Integer state,
		java.time.LocalDateTime createtime,
		String createusername,
		java.time.LocalDateTime updatetime,
		String updateusername
	)
	{
		this.id = id;
		this.barn_id = barn_id;
		this.image_id = image_id;
		this.shelf_code = shelf_code;
		this.count = count;
		this.sort = sort;
		this.state = state;
		this.createtime = createtime;
		this.createusername = createusername;
		this.updatetime = updatetime;
		this.updateusername = updateusername;
		
	}
    
    /**
     * 获取PLACEID，主键ID，自增ID的值
     */
    @JSONField(name = "id")
    public Integer getId(){
        return this.id;
    }
    /**
     * 设置PLACEID，主键ID，自增ID的值
     */
    @JSONField(name = "id")
    public void setId(Integer id){
        this.id = id;
    }
    /**
     * 获取BARNID，外键ID的值
     */
    @JSONField(name = "barn_id")
    public Integer getBarn_id(){
        return this.barn_id;
    }
    /**
     * 设置BARNID，外键ID的值
     */
    @JSONField(name = "barn_id")
    public void setBarn_id(Integer barn_id){
        this.barn_id = barn_id;
    }
    /**
     * 获取图片ID，外键ID的值
     */
    @JSONField(name = "image_id")
    public Integer getImage_id(){
        return this.image_id;
    }
    /**
     * 设置图片ID，外键ID的值
     */
    @JSONField(name = "image_id")
    public void setImage_id(Integer image_id){
        this.image_id = image_id;
    }
    /**
     * 获取SHELF标识码：{"颜色":"红色","重量":"1kg"}的值
     */
    @JSONField(name = "shelf_code")
    public String getShelf_code(){
        return this.shelf_code;
    }
    /**
     * 设置SHELF标识码：{"颜色":"红色","重量":"1kg"}的值
     */
    @JSONField(name = "shelf_code")
    public void setShelf_code(String shelf_code){
        this.shelf_code = shelf_code;
    }
    /**
     * 获取放置SKU的数量的值
     */
    @JSONField(name = "count")
    public Integer getCount(){
        return this.count;
    }
    /**
     * 设置放置SKU的数量的值
     */
    @JSONField(name = "count")
    public void setCount(Integer count){
        this.count = count;
    }
    /**
     * 获取SHELF排列顺序的值
     */
    @JSONField(name = "sort")
    public Integer getSort(){
        return this.sort;
    }
    /**
     * 设置SHELF排列顺序的值
     */
    @JSONField(name = "sort")
    public void setSort(Integer sort){
        this.sort = sort;
    }
    /**
     * 获取SHELF状态。枚举：-1=删除，0=下架，1=上架的值
     */
    @JSONField(name = "state")
    public Integer getState(){
        return this.state;
    }
    /**
     * 设置SHELF状态。枚举：-1=删除，0=下架，1=上架的值
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
		if(obj instanceof Barn_shelf){
			Barn_shelf other = (Barn_shelf)obj;
            result = other.getId().equals(this.getId());
		}
		return result;
	}
    
    @Override
	public String toString() {
		return "Barn_shelf {"
             + this.id + ','
                     + this.barn_id + ','
                     + this.image_id + ','
                     + this.shelf_code + ','
                     + this.count + ','
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
			_fields = Barn_shelf.class.getDeclaredFields();
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
