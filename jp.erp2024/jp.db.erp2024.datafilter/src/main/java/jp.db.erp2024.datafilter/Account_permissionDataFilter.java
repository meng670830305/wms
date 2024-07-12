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
 * 文件:        Account_permissionDataFilter.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/13
 * 负责人:      wangyp
 * 先引用实体(jp.db.erp2024.pojo)项目、引用数据访问层(jp.db.erp2024.mapper)项目、(jp.com.filterexpression)项目、(jp.com.model)项目
 */
 
package jp.db.erp2024.datafilter;

import jp.com.filterexpression.*;
import jp.com.module.PagedResult;
import jp.db.erp2024.pojo.Account_permission;
import jp.db.erp2024.mapper.Account_permissionMapper;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 *  过滤查询条件
 */
@SuppressWarnings("serial")
public final class Account_permissionDataFilter extends DataFilterBase< Account_permission >
{

	/**
	 * 自增ID
	 */
    @JSONField(name = "id")
	private LikeFieldFilter id = null;
	/**
	 * 父ID
	 */
    @JSONField(name = "parentid")
	private LikeFieldFilter parentid = null;
	/**
	 * 权限KEY
	 */
    @JSONField(name = "permissionkey")
	private LikeFieldFilter permissionkey = null;
	/**
	 * 权限名称
	 */
    @JSONField(name = "name")
	private LikeFieldFilter name = null;
	/**
	 * 描述
	 */
    @JSONField(name = "description")
	private LikeFieldFilter description = null;
	/**
	 * 图标
	 */
    @JSONField(name = "icon")
	private LikeFieldFilter icon = null;
	/**
	 * 是否成为导航菜单
	 */
    @JSONField(name = "canmenu")
	private IdFieldFilter<Integer> canmenu = null;
	/**
	 * 其他数据[Json]
	 */
    @JSONField(name = "data")
	private LikeFieldFilter data = null;
	/**
	 * 导航连接
	 */
    @JSONField(name = "href")
	private LikeFieldFilter href = null;
	/**
	 * 是否可用
	 */
    @JSONField(name = "isenable")
	private IdFieldFilter<Integer> isenable = null;
	/**
	 * 排序
	 */
    @JSONField(name = "sort")
	private IdFieldFilter<Integer> sort = null;
	/**
	 * 备注
	 */
    @JSONField(name = "remark")
	private LikeFieldFilter remark = null;
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
	public Account_permissionDataFilter()
	{
	}
    
	
	/**
     * 获取自增ID
     */
    @JSONField(name = "id")
	public LikeFieldFilter getId()
	{
		return this.id;
	}
    
    /**
     * 设置自增ID
     */
    @JSONField(name = "id")
	public void setId(LikeFieldFilter id)
	{
		this.id = id;
	}

	/**
     * 获取父ID
     */
    @JSONField(name = "parentid")
	public LikeFieldFilter getParentid()
	{
		return this.parentid;
	}
    
    /**
     * 设置父ID
     */
    @JSONField(name = "parentid")
	public void setParentid(LikeFieldFilter parentid)
	{
		this.parentid = parentid;
	}

	/**
     * 获取权限KEY
     */
    @JSONField(name = "permissionkey")
	public LikeFieldFilter getPermissionkey()
	{
		return this.permissionkey;
	}
    
    /**
     * 设置权限KEY
     */
    @JSONField(name = "permissionkey")
	public void setPermissionkey(LikeFieldFilter permissionkey)
	{
		this.permissionkey = permissionkey;
	}

	/**
     * 获取权限名称
     */
    @JSONField(name = "name")
	public LikeFieldFilter getName()
	{
		return this.name;
	}
    
    /**
     * 设置权限名称
     */
    @JSONField(name = "name")
	public void setName(LikeFieldFilter name)
	{
		this.name = name;
	}

	/**
     * 获取描述
     */
    @JSONField(name = "description")
	public LikeFieldFilter getDescription()
	{
		return this.description;
	}
    
    /**
     * 设置描述
     */
    @JSONField(name = "description")
	public void setDescription(LikeFieldFilter description)
	{
		this.description = description;
	}

	/**
     * 获取图标
     */
    @JSONField(name = "icon")
	public LikeFieldFilter getIcon()
	{
		return this.icon;
	}
    
    /**
     * 设置图标
     */
    @JSONField(name = "icon")
	public void setIcon(LikeFieldFilter icon)
	{
		this.icon = icon;
	}

	/**
     * 获取是否成为导航菜单
     */
    @JSONField(name = "canmenu")
	public IdFieldFilter<Integer> getCanmenu()
	{
		return this.canmenu;
	}
    
    /**
     * 设置是否成为导航菜单
     */
    @JSONField(name = "canmenu")
	public void setCanmenu(IdFieldFilter<Integer> canmenu)
	{
		this.canmenu = canmenu;
	}

	/**
     * 获取其他数据[Json]
     */
    @JSONField(name = "data")
	public LikeFieldFilter getData()
	{
		return this.data;
	}
    
    /**
     * 设置其他数据[Json]
     */
    @JSONField(name = "data")
	public void setData(LikeFieldFilter data)
	{
		this.data = data;
	}

	/**
     * 获取导航连接
     */
    @JSONField(name = "href")
	public LikeFieldFilter getHref()
	{
		return this.href;
	}
    
    /**
     * 设置导航连接
     */
    @JSONField(name = "href")
	public void setHref(LikeFieldFilter href)
	{
		this.href = href;
	}

	/**
     * 获取是否可用
     */
    @JSONField(name = "isenable")
	public IdFieldFilter<Integer> getIsenable()
	{
		return this.isenable;
	}
    
    /**
     * 设置是否可用
     */
    @JSONField(name = "isenable")
	public void setIsenable(IdFieldFilter<Integer> isenable)
	{
		this.isenable = isenable;
	}

	/**
     * 获取排序
     */
    @JSONField(name = "sort")
	public IdFieldFilter<Integer> getSort()
	{
		return this.sort;
	}
    
    /**
     * 设置排序
     */
    @JSONField(name = "sort")
	public void setSort(IdFieldFilter<Integer> sort)
	{
		this.sort = sort;
	}

	/**
     * 获取备注
     */
    @JSONField(name = "remark")
	public LikeFieldFilter getRemark()
	{
		return this.remark;
	}
    
    /**
     * 设置备注
     */
    @JSONField(name = "remark")
	public void setRemark(LikeFieldFilter remark)
	{
		this.remark = remark;
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
	public PagedResult< Account_permission > getPageResult(Account_permissionMapper mapper) throws Exception
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
	public PagedResult< Account_permission > getPageResult(Account_permissionMapper mapper, String andWhere) throws Exception
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
        java.util.List< Account_permission > list = mapper.selectPage(offset, pageSize, where, sortField);
        int recordCount = mapper.selectCount(where);
        PagedResult< Account_permission > result = new PagedResult< Account_permission >(list, pageIndex, pageSize, recordCount);
        return result;
    }
}
