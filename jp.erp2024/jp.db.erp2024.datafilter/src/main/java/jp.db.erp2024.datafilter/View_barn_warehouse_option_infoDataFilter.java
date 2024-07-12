 /*
在pom.xml文件复制下面的内容。
<dependencies>
    <dependency>
        <groupId>jp.com</groupId>
        <artifactId>jp.com.filterexpression</artifactId>
    </dependency>
    <dependency>
        <groupId>jp.db</groupId>
        <artifactId>jp.db.erp2024.pojo</artifactId>
    </dependency>
    <dependency>
        <groupId>jp.db</groupId>
        <artifactId>jp.db.erp2024.mapper</artifactId>
    </dependency>
</dependencies>
 * 
 * 数据过滤(jp.db.erp2024.datafilter)包
 *
 * wangyp Copyright 2006-2023
 * 文件:        View_barn_warehouse_option_infoDataFilter.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/17
 * 负责人:      wangyp
 * 先引用实体(jp.db.erp2024.pojo)项目、引用数据访问层(jp.db.erp2024.mapper)项目、(jp.com.filterexpression)项目、(jp.com.model)项目
 */

package jp.db.erp2024.datafilter;

import jp.com.filterexpression.*;
import jp.com.module.PagedResult;
import jp.db.erp2024.pojo.View_barn_warehouse_option_info;
import jp.db.erp2024.mapper.View_barn_warehouse_option_infoMapper;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 * 过滤查询条件
 */
@SuppressWarnings("serial")
public final class View_barn_warehouse_option_infoDataFilter extends DataFilterBase< View_barn_warehouse_option_info >
{
	/**
	 * 
	 */
    @JSONField(name = "id")
	private IdFieldFilter<Integer> id = null;
	/**
	 * 
	 */
    @JSONField(name = "name")
	private LikeFieldFilter name = null;
	/**
	 * 
	 */
    @JSONField(name = "values")
	private LikeFieldFilter values = null;
	/**
	 * 
	 */
    @JSONField(name = "sort")
	private IdFieldFilter<Integer> sort = null;
	/**
	 * 
	 */
    @JSONField(name = "state")
	private IdFieldFilter<Integer> state = null;
	/**
	 * 
	 */
    @JSONField(name = "warehouse_id")
	private IdFieldFilter<Integer> warehouse_id = null;
	/**
	 * 
	 */
    @JSONField(name = "warehouse_name")
	private LikeFieldFilter warehouse_name = null;
	/**
	 * 
	 */
    @JSONField(name = "warehouse_sort")
	private IdFieldFilter<Integer> warehouse_sort = null;
	/**
	 * 
	 */
    @JSONField(name = "barn_id")
	private IdFieldFilter<Integer> barn_id = null;
	/**
	 * 
	 */
    @JSONField(name = "barn_name")
	private LikeFieldFilter barn_name = null;
	/**
	 * 
	 */
    @JSONField(name = "barn_sort")
	private IdFieldFilter<Integer> barn_sort = null;
	/**
	 * 
	 */
    @JSONField(name = "createtime")
	private RangeFieldFilter<java.time.LocalDateTime> createtime = null;
	/**
	 * 
	 */
    @JSONField(name = "createusername")
	private LikeFieldFilter createusername = null;
	/**
	 * 
	 */
    @JSONField(name = "updatetime")
	private RangeFieldFilter<java.time.LocalDateTime> updatetime = null;
	/**
	 * 
	 */
    @JSONField(name = "updateusername")
	private LikeFieldFilter updateusername = null;
    
	/**
	 * 
	 */
	public View_barn_warehouse_option_infoDataFilter()
	{
	}
	
    /**
     * 获取
     */
    @JSONField(name = "id")
	public IdFieldFilter<Integer> getId()
	{
		return this.id;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "id")
	public void setId(IdFieldFilter<Integer> id)
	{
		this.id = id;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "name")
	public LikeFieldFilter getName()
	{
		return this.name;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "name")
	public void setName(LikeFieldFilter name)
	{
		this.name = name;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "values")
	public LikeFieldFilter getValues()
	{
		return this.values;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "values")
	public void setValues(LikeFieldFilter values)
	{
		this.values = values;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "sort")
	public IdFieldFilter<Integer> getSort()
	{
		return this.sort;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "sort")
	public void setSort(IdFieldFilter<Integer> sort)
	{
		this.sort = sort;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "state")
	public IdFieldFilter<Integer> getState()
	{
		return this.state;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "state")
	public void setState(IdFieldFilter<Integer> state)
	{
		this.state = state;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "warehouse_id")
	public IdFieldFilter<Integer> getWarehouse_id()
	{
		return this.warehouse_id;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "warehouse_id")
	public void setWarehouse_id(IdFieldFilter<Integer> warehouse_id)
	{
		this.warehouse_id = warehouse_id;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "warehouse_name")
	public LikeFieldFilter getWarehouse_name()
	{
		return this.warehouse_name;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "warehouse_name")
	public void setWarehouse_name(LikeFieldFilter warehouse_name)
	{
		this.warehouse_name = warehouse_name;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "warehouse_sort")
	public IdFieldFilter<Integer> getWarehouse_sort()
	{
		return this.warehouse_sort;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "warehouse_sort")
	public void setWarehouse_sort(IdFieldFilter<Integer> warehouse_sort)
	{
		this.warehouse_sort = warehouse_sort;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "barn_id")
	public IdFieldFilter<Integer> getBarn_id()
	{
		return this.barn_id;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "barn_id")
	public void setBarn_id(IdFieldFilter<Integer> barn_id)
	{
		this.barn_id = barn_id;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "barn_name")
	public LikeFieldFilter getBarn_name()
	{
		return this.barn_name;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "barn_name")
	public void setBarn_name(LikeFieldFilter barn_name)
	{
		this.barn_name = barn_name;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "barn_sort")
	public IdFieldFilter<Integer> getBarn_sort()
	{
		return this.barn_sort;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "barn_sort")
	public void setBarn_sort(IdFieldFilter<Integer> barn_sort)
	{
		this.barn_sort = barn_sort;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "createtime")
	public RangeFieldFilter<java.time.LocalDateTime> getCreatetime()
	{
		return this.createtime;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "createtime")
	public void setCreatetime(RangeFieldFilter<java.time.LocalDateTime> createtime)
	{
		this.createtime = createtime;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "createusername")
	public LikeFieldFilter getCreateusername()
	{
		return this.createusername;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "createusername")
	public void setCreateusername(LikeFieldFilter createusername)
	{
		this.createusername = createusername;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "updatetime")
	public RangeFieldFilter<java.time.LocalDateTime> getUpdatetime()
	{
		return this.updatetime;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "updatetime")
	public void setUpdatetime(RangeFieldFilter<java.time.LocalDateTime> updatetime)
	{
		this.updatetime = updatetime;
	}
    

    /**
     * 获取
     */
    @JSONField(name = "updateusername")
	public LikeFieldFilter getUpdateusername()
	{
		return this.updateusername;
	}
    
    /**
     * 设置
     */
    @JSONField(name = "updateusername")
	public void setUpdateusername(LikeFieldFilter updateusername)
	{
		this.updateusername = updateusername;
	}
    
    
    /**
	 * 过滤  查询结果
	 * @param mapper
	 * @return
	 * @throws Exception
	 */
	public PagedResult< View_barn_warehouse_option_info > getPageResult(View_barn_warehouse_option_infoMapper mapper) throws Exception
    {
        return this.getPageResult(mapper, "");
    }
    
	/**
	 * 过滤  查询结果
	 * @param mapper
	 * @param andWhere
	 * @return
	 * @throws Exception
	 */
	public PagedResult< View_barn_warehouse_option_info > getPageResult(View_barn_warehouse_option_infoMapper mapper, String andWhere) throws Exception
    {
        ExpressionList expressionList = new ExpressionList();
        IFilterator filterator = super.getFilterator(expressionList);
        String where = filterator.getWhere() + andWhere;
        String sortField = filterator.getSortField();
        expressionList.clear();
        expressionList = null;
        int pageIndex = super.getPager().getPageNumber();
        int pageSize = super.getPager().getPageSize();
        int offset = (pageIndex - 1) * pageSize;
        java.util.List< View_barn_warehouse_option_info > list = mapper.selectPage(offset, pageSize, where, sortField);
        int recordCount = mapper.selectCount(where);
        PagedResult< View_barn_warehouse_option_info > result = new PagedResult< View_barn_warehouse_option_info >(list, pageIndex, pageSize, recordCount);
        return result;
    }
}
