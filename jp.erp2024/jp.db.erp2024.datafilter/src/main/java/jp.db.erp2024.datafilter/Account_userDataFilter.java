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
 * 文件:        Account_userDataFilter.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/13
 * 负责人:      wangyp
 * 先引用实体(jp.db.erp2024.pojo)项目、引用数据访问层(jp.db.erp2024.mapper)项目、(jp.com.filterexpression)项目、(jp.com.model)项目
 */
 
package jp.db.erp2024.datafilter;

import jp.com.filterexpression.*;
import jp.com.module.PagedResult;
import jp.db.erp2024.pojo.Account_user;
import jp.db.erp2024.mapper.Account_userMapper;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 *  过滤查询条件
 */
@SuppressWarnings("serial")
public final class Account_userDataFilter extends DataFilterBase< Account_user >
{

	/**
	 * 用户ID
	 */
    @JSONField(name = "id")
	private IdFieldFilter<Integer> id = null;
	/**
	 * 昵称
	 */
    @JSONField(name = "petname")
	private LikeFieldFilter petname = null;
	/**
	 * 真实姓名
	 */
    @JSONField(name = "realname")
	private LikeFieldFilter realname = null;
	/**
	 * 登录账户
	 */
    @JSONField(name = "loginaccount")
	private LikeFieldFilter loginaccount = null;
	/**
	 * 登录密码
	 */
    @JSONField(name = "loginpassword")
	private LikeFieldFilter loginpassword = null;
	/**
	 * 最后一次登录时间
	 */
    @JSONField(name = "logintime")
	private RangeFieldFilter<java.time.LocalDateTime> logintime = null;
	/**
	 * 最后一次登录IP
	 */
    @JSONField(name = "loginip")
	private LikeFieldFilter loginip = null;
	/**
	 * 用户状态[枚举]：正常，冻结，注销.....
	 */
    @JSONField(name = "status")
	private IdFieldFilter<Integer> status = null;
	/**
	 * 手机/座机
	 */
    @JSONField(name = "phone")
	private LikeFieldFilter phone = null;
	/**
	 * 邮箱
	 */
    @JSONField(name = "email")
	private LikeFieldFilter email = null;
	/**
	 * 所属组文本(冗余字段,用“,”分割)
	 */
    @JSONField(name = "grouptext")
	private LikeFieldFilter grouptext = null;
	/**
	 * 所属角色(冗余字段，用“,”分割)
	 */
    @JSONField(name = "roletext")
	private LikeFieldFilter roletext = null;
	/**
	 * 所属部门
	 */
    @JSONField(name = "department")
	private LikeFieldFilter department = null;
	/**
	 * 用户HasH,可用于找回密码以及清空用户缓存使用
	 */
    @JSONField(name = "hash")
	private LikeFieldFilter hash = null;
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
	public Account_userDataFilter()
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
     * 获取昵称
     */
    @JSONField(name = "petname")
	public LikeFieldFilter getPetname()
	{
		return this.petname;
	}
    
    /**
     * 设置昵称
     */
    @JSONField(name = "petname")
	public void setPetname(LikeFieldFilter petname)
	{
		this.petname = petname;
	}

	/**
     * 获取真实姓名
     */
    @JSONField(name = "realname")
	public LikeFieldFilter getRealname()
	{
		return this.realname;
	}
    
    /**
     * 设置真实姓名
     */
    @JSONField(name = "realname")
	public void setRealname(LikeFieldFilter realname)
	{
		this.realname = realname;
	}

	/**
     * 获取登录账户
     */
    @JSONField(name = "loginaccount")
	public LikeFieldFilter getLoginaccount()
	{
		return this.loginaccount;
	}
    
    /**
     * 设置登录账户
     */
    @JSONField(name = "loginaccount")
	public void setLoginaccount(LikeFieldFilter loginaccount)
	{
		this.loginaccount = loginaccount;
	}

	/**
     * 获取登录密码
     */
    @JSONField(name = "loginpassword")
	public LikeFieldFilter getLoginpassword()
	{
		return this.loginpassword;
	}
    
    /**
     * 设置登录密码
     */
    @JSONField(name = "loginpassword")
	public void setLoginpassword(LikeFieldFilter loginpassword)
	{
		this.loginpassword = loginpassword;
	}

	/**
     * 获取最后一次登录时间
     */
    @JSONField(name = "logintime")
	public RangeFieldFilter<java.time.LocalDateTime> getLogintime()
	{
		return this.logintime;
	}
    
    /**
     * 设置最后一次登录时间
     */
    @JSONField(name = "logintime")
	public void setLogintime(RangeFieldFilter<java.time.LocalDateTime> logintime)
	{
		this.logintime = logintime;
	}

	/**
     * 获取最后一次登录IP
     */
    @JSONField(name = "loginip")
	public LikeFieldFilter getLoginip()
	{
		return this.loginip;
	}
    
    /**
     * 设置最后一次登录IP
     */
    @JSONField(name = "loginip")
	public void setLoginip(LikeFieldFilter loginip)
	{
		this.loginip = loginip;
	}

	/**
     * 获取用户状态[枚举]：正常，冻结，注销.....
     */
    @JSONField(name = "status")
	public IdFieldFilter<Integer> getStatus()
	{
		return this.status;
	}
    
    /**
     * 设置用户状态[枚举]：正常，冻结，注销.....
     */
    @JSONField(name = "status")
	public void setStatus(IdFieldFilter<Integer> status)
	{
		this.status = status;
	}

	/**
     * 获取手机/座机
     */
    @JSONField(name = "phone")
	public LikeFieldFilter getPhone()
	{
		return this.phone;
	}
    
    /**
     * 设置手机/座机
     */
    @JSONField(name = "phone")
	public void setPhone(LikeFieldFilter phone)
	{
		this.phone = phone;
	}

	/**
     * 获取邮箱
     */
    @JSONField(name = "email")
	public LikeFieldFilter getEmail()
	{
		return this.email;
	}
    
    /**
     * 设置邮箱
     */
    @JSONField(name = "email")
	public void setEmail(LikeFieldFilter email)
	{
		this.email = email;
	}

	/**
     * 获取所属组文本(冗余字段,用“,”分割)
     */
    @JSONField(name = "grouptext")
	public LikeFieldFilter getGrouptext()
	{
		return this.grouptext;
	}
    
    /**
     * 设置所属组文本(冗余字段,用“,”分割)
     */
    @JSONField(name = "grouptext")
	public void setGrouptext(LikeFieldFilter grouptext)
	{
		this.grouptext = grouptext;
	}

	/**
     * 获取所属角色(冗余字段，用“,”分割)
     */
    @JSONField(name = "roletext")
	public LikeFieldFilter getRoletext()
	{
		return this.roletext;
	}
    
    /**
     * 设置所属角色(冗余字段，用“,”分割)
     */
    @JSONField(name = "roletext")
	public void setRoletext(LikeFieldFilter roletext)
	{
		this.roletext = roletext;
	}

	/**
     * 获取所属部门
     */
    @JSONField(name = "department")
	public LikeFieldFilter getDepartment()
	{
		return this.department;
	}
    
    /**
     * 设置所属部门
     */
    @JSONField(name = "department")
	public void setDepartment(LikeFieldFilter department)
	{
		this.department = department;
	}

	/**
     * 获取用户HasH,可用于找回密码以及清空用户缓存使用
     */
    @JSONField(name = "hash")
	public LikeFieldFilter getHash()
	{
		return this.hash;
	}
    
    /**
     * 设置用户HasH,可用于找回密码以及清空用户缓存使用
     */
    @JSONField(name = "hash")
	public void setHash(LikeFieldFilter hash)
	{
		this.hash = hash;
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
	public PagedResult< Account_user > getPageResult(Account_userMapper mapper) throws Exception
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
	public PagedResult< Account_user > getPageResult(Account_userMapper mapper, String andWhere) throws Exception
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
        java.util.List< Account_user > list = mapper.selectPage(offset, pageSize, where, sortField);
        int recordCount = mapper.selectCount(where);
        PagedResult< Account_user > result = new PagedResult< Account_user >(list, pageIndex, pageSize, recordCount);
        return result;
    }
}
