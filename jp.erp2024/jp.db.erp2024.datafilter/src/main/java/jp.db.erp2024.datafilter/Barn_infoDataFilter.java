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
 * 文件:        Barn_infoDataFilter.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/13
 * 负责人:      wangyp
 * 先引用实体(jp.db.erp2024.pojo)项目、引用数据访问层(jp.db.erp2024.mapper)项目、(jp.com.filterexpression)项目、(jp.com.model)项目
 */
 
package jp.db.erp2024.datafilter;

import jp.com.filterexpression.*;
import jp.com.module.PagedResult;
import jp.db.erp2024.pojo.Barn_info;
import jp.db.erp2024.mapper.Barn_infoMapper;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 * 仓库房间信息 过滤查询条件
 */
@SuppressWarnings("serial")
public final class Barn_infoDataFilter extends DataFilterBase< Barn_info >
{

	/**
	 * 仓库房间ID，主键ID，自增ID
	 */
    @JSONField(name = "id")
	private IdFieldFilter<Integer> id = null;
	/**
	 * 仓库房间名称
	 */
    @JSONField(name = "name")
	private LikeFieldFilter name = null;
	/**
	 * 仓库房间简介
	 */
    @JSONField(name = "description")
	private LikeFieldFilter description = null;
	/**
	 * 仓库房间ID，外键ID
	 */
    @JSONField(name = "warehouse_id")
	private IdFieldFilter<Integer> warehouse_id = null;
	/**
	 * 仓库房间类型
	 */
    @JSONField(name = "type")
	private IdFieldFilter<Integer> type = null;
	/**
	 * 仓库房间排列顺序
	 */
    @JSONField(name = "sort")
	private IdFieldFilter<Integer> sort = null;
	/**
	 * 仓库房间状态。枚举：-1=删除，0=下架，1=上架
	 */
    @JSONField(name = "state")
	private IdFieldFilter<Integer> state = null;
	/**
	 * 登録日，自動作成
	 */
    @JSONField(name = "createtime")
	private RangeFieldFilter<java.time.LocalDateTime> createtime = null;
	/**
	 * 登録人名称
	 */
    @JSONField(name = "createusername")
	private LikeFieldFilter createusername = null;
	/**
	 * 更新日，自動作成
	 */
    @JSONField(name = "updatetime")
	private RangeFieldFilter<java.time.LocalDateTime> updatetime = null;
	/**
	 * 更新人名称
	 */
    @JSONField(name = "updateusername")
	private LikeFieldFilter updateusername = null;
    
	/**
	 * 仓库房间信息
	 */
	public Barn_infoDataFilter()
	{
	}
    
	
	/**
     * 获取仓库房间ID，主键ID，自增ID
     */
    @JSONField(name = "id")
	public IdFieldFilter<Integer> getId()
	{
		return this.id;
	}
    
    /**
     * 设置仓库房间ID，主键ID，自增ID
     */
    @JSONField(name = "id")
	public void setId(IdFieldFilter<Integer> id)
	{
		this.id = id;
	}

	/**
     * 获取仓库房间名称
     */
    @JSONField(name = "name")
	public LikeFieldFilter getName()
	{
		return this.name;
	}
    
    /**
     * 设置仓库房间名称
     */
    @JSONField(name = "name")
	public void setName(LikeFieldFilter name)
	{
		this.name = name;
	}

	/**
     * 获取仓库房间简介
     */
    @JSONField(name = "description")
	public LikeFieldFilter getDescription()
	{
		return this.description;
	}
    
    /**
     * 设置仓库房间简介
     */
    @JSONField(name = "description")
	public void setDescription(LikeFieldFilter description)
	{
		this.description = description;
	}

	/**
     * 获取仓库房间ID，外键ID
     */
    @JSONField(name = "warehouse_id")
	public IdFieldFilter<Integer> getWarehouse_id()
	{
		return this.warehouse_id;
	}
    
    /**
     * 设置仓库房间ID，外键ID
     */
    @JSONField(name = "warehouse_id")
	public void setWarehouse_id(IdFieldFilter<Integer> warehouse_id)
	{
		this.warehouse_id = warehouse_id;
	}

	/**
     * 获取仓库房间类型
     */
    @JSONField(name = "type")
	public IdFieldFilter<Integer> getType()
	{
		return this.type;
	}
    
    /**
     * 设置仓库房间类型
     */
    @JSONField(name = "type")
	public void setType(IdFieldFilter<Integer> type)
	{
		this.type = type;
	}

	/**
     * 获取仓库房间排列顺序
     */
    @JSONField(name = "sort")
	public IdFieldFilter<Integer> getSort()
	{
		return this.sort;
	}
    
    /**
     * 设置仓库房间排列顺序
     */
    @JSONField(name = "sort")
	public void setSort(IdFieldFilter<Integer> sort)
	{
		this.sort = sort;
	}

	/**
     * 获取仓库房间状态。枚举：-1=删除，0=下架，1=上架
     */
    @JSONField(name = "state")
	public IdFieldFilter<Integer> getState()
	{
		return this.state;
	}
    
    /**
     * 设置仓库房间状态。枚举：-1=删除，0=下架，1=上架
     */
    @JSONField(name = "state")
	public void setState(IdFieldFilter<Integer> state)
	{
		this.state = state;
	}

	/**
     * 获取登録日，自動作成
     */
    @JSONField(name = "createtime")
	public RangeFieldFilter<java.time.LocalDateTime> getCreatetime()
	{
		return this.createtime;
	}
    
    /**
     * 设置登録日，自動作成
     */
    @JSONField(name = "createtime")
	public void setCreatetime(RangeFieldFilter<java.time.LocalDateTime> createtime)
	{
		this.createtime = createtime;
	}

	/**
     * 获取登録人名称
     */
    @JSONField(name = "createusername")
	public LikeFieldFilter getCreateusername()
	{
		return this.createusername;
	}
    
    /**
     * 设置登録人名称
     */
    @JSONField(name = "createusername")
	public void setCreateusername(LikeFieldFilter createusername)
	{
		this.createusername = createusername;
	}

	/**
     * 获取更新日，自動作成
     */
    @JSONField(name = "updatetime")
	public RangeFieldFilter<java.time.LocalDateTime> getUpdatetime()
	{
		return this.updatetime;
	}
    
    /**
     * 设置更新日，自動作成
     */
    @JSONField(name = "updatetime")
	public void setUpdatetime(RangeFieldFilter<java.time.LocalDateTime> updatetime)
	{
		this.updatetime = updatetime;
	}

	/**
     * 获取更新人名称
     */
    @JSONField(name = "updateusername")
	public LikeFieldFilter getUpdateusername()
	{
		return this.updateusername;
	}
    
    /**
     * 设置更新人名称
     */
    @JSONField(name = "updateusername")
	public void setUpdateusername(LikeFieldFilter updateusername)
	{
		this.updateusername = updateusername;
	}
    
     /**
	 * 过滤 仓库房间信息 查询结果
	 * @param mapper
	 * @return
	 * @throws Exception
	 */
	public PagedResult< Barn_info > getPageResult(Barn_infoMapper mapper) throws Exception
    {
        return this.getPageResult(mapper, "");
    }
    
	/**
	 * 过滤 仓库房间信息 查询结果
	 * @param mapper
	 * @param andWhere
	 * @return
	 * @throws Exception
	 */
	public PagedResult< Barn_info > getPageResult(Barn_infoMapper mapper, String andWhere) throws Exception
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
        java.util.List< Barn_info > list = mapper.selectPage(offset, pageSize, where, sortField);
        int recordCount = mapper.selectCount(where);
        PagedResult< Barn_info > result = new PagedResult< Barn_info >(list, pageIndex, pageSize, recordCount);
        return result;
    }
}
