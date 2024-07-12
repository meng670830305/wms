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
 * 文件:        Account_userroleassignDataFilter.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/13
 * 负责人:      wangyp
 * 先引用实体(jp.db.erp2024.pojo)项目、引用数据访问层(jp.db.erp2024.mapper)项目、(jp.com.filterexpression)项目、(jp.com.model)项目
 */
 
package jp.db.erp2024.datafilter;

import jp.com.filterexpression.*;
import jp.com.module.PagedResult;
import jp.db.erp2024.pojo.Account_userroleassign;
import jp.db.erp2024.mapper.Account_userroleassignMapper;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 *  过滤查询条件
 */
@SuppressWarnings("serial")
public final class Account_userroleassignDataFilter extends DataFilterBase< Account_userroleassign >
{

	/**
	 * 用户ID
	 */
    @JSONField(name = "id")
	private IdFieldFilter<Integer> id = null;
	/**
	 * 角色ID(外键)
	 */
    @JSONField(name = "roleid")
	private IdFieldFilter<Integer> roleid = null;
	/**
	 * 用户ID(外键)
	 */
    @JSONField(name = "userid")
	private IdFieldFilter<Integer> userid = null;
	/**
	 * 过期时间
	 */
    @JSONField(name = "expiredtime")
	private RangeFieldFilter<java.time.LocalDateTime> expiredtime = null;
	/**
	 * 是否可用
	 */
    @JSONField(name = "isenable")
	private IdFieldFilter<Integer> isenable = null;
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
	public Account_userroleassignDataFilter()
	{
	}
    
	
	/**
     * 获取用户ID
     */
    @JSONField(name = "id")
	public IdFieldFilter<Integer> getId()
	{
		return this.id;
	}
    
    /**
     * 设置用户ID
     */
    @JSONField(name = "id")
	public void setId(IdFieldFilter<Integer> id)
	{
		this.id = id;
	}

	/**
     * 获取角色ID(外键)
     */
    @JSONField(name = "roleid")
	public IdFieldFilter<Integer> getRoleid()
	{
		return this.roleid;
	}
    
    /**
     * 设置角色ID(外键)
     */
    @JSONField(name = "roleid")
	public void setRoleid(IdFieldFilter<Integer> roleid)
	{
		this.roleid = roleid;
	}

	/**
     * 获取用户ID(外键)
     */
    @JSONField(name = "userid")
	public IdFieldFilter<Integer> getUserid()
	{
		return this.userid;
	}
    
    /**
     * 设置用户ID(外键)
     */
    @JSONField(name = "userid")
	public void setUserid(IdFieldFilter<Integer> userid)
	{
		this.userid = userid;
	}

	/**
     * 获取过期时间
     */
    @JSONField(name = "expiredtime")
	public RangeFieldFilter<java.time.LocalDateTime> getExpiredtime()
	{
		return this.expiredtime;
	}
    
    /**
     * 设置过期时间
     */
    @JSONField(name = "expiredtime")
	public void setExpiredtime(RangeFieldFilter<java.time.LocalDateTime> expiredtime)
	{
		this.expiredtime = expiredtime;
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
	public PagedResult< Account_userroleassign > getPageResult(Account_userroleassignMapper mapper) throws Exception
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
	public PagedResult< Account_userroleassign > getPageResult(Account_userroleassignMapper mapper, String andWhere) throws Exception
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
        java.util.List< Account_userroleassign > list = mapper.selectPage(offset, pageSize, where, sortField);
        int recordCount = mapper.selectCount(where);
        PagedResult< Account_userroleassign > result = new PagedResult< Account_userroleassign >(list, pageIndex, pageSize, recordCount);
        return result;
    }
}
