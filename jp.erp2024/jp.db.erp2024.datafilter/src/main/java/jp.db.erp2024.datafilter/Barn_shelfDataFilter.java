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
 * 文件:        Barn_shelfDataFilter.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/13
 * 负责人:      wangyp
 * 先引用实体(jp.db.erp2024.pojo)项目、引用数据访问层(jp.db.erp2024.mapper)项目、(jp.com.filterexpression)项目、(jp.com.model)项目
 */
 
package jp.db.erp2024.datafilter;

import jp.com.filterexpression.*;
import jp.com.module.PagedResult;
import jp.db.erp2024.pojo.Barn_shelf;
import jp.db.erp2024.mapper.Barn_shelfMapper;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 * 仓库房间里摆放物品的具体位置 过滤查询条件
 */
@SuppressWarnings("serial")
public final class Barn_shelfDataFilter extends DataFilterBase< Barn_shelf >
{

	/**
	 * PLACEID，主键ID，自增ID
	 */
    @JSONField(name = "id")
	private IdFieldFilter<Integer> id = null;
	/**
	 * BARNID，外键ID
	 */
    @JSONField(name = "barn_id")
	private IdFieldFilter<Integer> barn_id = null;
	/**
	 * 图片ID，外键ID
	 */
    @JSONField(name = "image_id")
	private IdFieldFilter<Integer> image_id = null;
	/**
	 * SHELF标识码：{"颜色":"红色","重量":"1kg"}
	 */
    @JSONField(name = "shelf_code")
	private LikeFieldFilter shelf_code = null;
	/**
	 * 放置SKU的数量
	 */
    @JSONField(name = "count")
	private IdFieldFilter<Integer> count = null;
	/**
	 * SHELF排列顺序
	 */
    @JSONField(name = "sort")
	private IdFieldFilter<Integer> sort = null;
	/**
	 * SHELF状态。枚举：-1=删除，0=下架，1=上架
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
	 * 仓库房间里摆放物品的具体位置
	 */
	public Barn_shelfDataFilter()
	{
	}
    
	
	/**
     * 获取PLACEID，主键ID，自增ID
     */
    @JSONField(name = "id")
	public IdFieldFilter<Integer> getId()
	{
		return this.id;
	}
    
    /**
     * 设置PLACEID，主键ID，自增ID
     */
    @JSONField(name = "id")
	public void setId(IdFieldFilter<Integer> id)
	{
		this.id = id;
	}

	/**
     * 获取BARNID，外键ID
     */
    @JSONField(name = "barn_id")
	public IdFieldFilter<Integer> getBarn_id()
	{
		return this.barn_id;
	}
    
    /**
     * 设置BARNID，外键ID
     */
    @JSONField(name = "barn_id")
	public void setBarn_id(IdFieldFilter<Integer> barn_id)
	{
		this.barn_id = barn_id;
	}

	/**
     * 获取图片ID，外键ID
     */
    @JSONField(name = "image_id")
	public IdFieldFilter<Integer> getImage_id()
	{
		return this.image_id;
	}
    
    /**
     * 设置图片ID，外键ID
     */
    @JSONField(name = "image_id")
	public void setImage_id(IdFieldFilter<Integer> image_id)
	{
		this.image_id = image_id;
	}

	/**
     * 获取SHELF标识码：{"颜色":"红色","重量":"1kg"}
     */
    @JSONField(name = "shelf_code")
	public LikeFieldFilter getShelf_code()
	{
		return this.shelf_code;
	}
    
    /**
     * 设置SHELF标识码：{"颜色":"红色","重量":"1kg"}
     */
    @JSONField(name = "shelf_code")
	public void setShelf_code(LikeFieldFilter shelf_code)
	{
		this.shelf_code = shelf_code;
	}

	/**
     * 获取放置SKU的数量
     */
    @JSONField(name = "count")
	public IdFieldFilter<Integer> getCount()
	{
		return this.count;
	}
    
    /**
     * 设置放置SKU的数量
     */
    @JSONField(name = "count")
	public void setCount(IdFieldFilter<Integer> count)
	{
		this.count = count;
	}

	/**
     * 获取SHELF排列顺序
     */
    @JSONField(name = "sort")
	public IdFieldFilter<Integer> getSort()
	{
		return this.sort;
	}
    
    /**
     * 设置SHELF排列顺序
     */
    @JSONField(name = "sort")
	public void setSort(IdFieldFilter<Integer> sort)
	{
		this.sort = sort;
	}

	/**
     * 获取SHELF状态。枚举：-1=删除，0=下架，1=上架
     */
    @JSONField(name = "state")
	public IdFieldFilter<Integer> getState()
	{
		return this.state;
	}
    
    /**
     * 设置SHELF状态。枚举：-1=删除，0=下架，1=上架
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
	 * 过滤 仓库房间里摆放物品的具体位置 查询结果
	 * @param mapper
	 * @return
	 * @throws Exception
	 */
	public PagedResult< Barn_shelf > getPageResult(Barn_shelfMapper mapper) throws Exception
    {
        return this.getPageResult(mapper, "");
    }
    
	/**
	 * 过滤 仓库房间里摆放物品的具体位置 查询结果
	 * @param mapper
	 * @param andWhere
	 * @return
	 * @throws Exception
	 */
	public PagedResult< Barn_shelf > getPageResult(Barn_shelfMapper mapper, String andWhere) throws Exception
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
        java.util.List< Barn_shelf > list = mapper.selectPage(offset, pageSize, where, sortField);
        int recordCount = mapper.selectCount(where);
        PagedResult< Barn_shelf > result = new PagedResult< Barn_shelf >(list, pageIndex, pageSize, recordCount);
        return result;
    }
}
