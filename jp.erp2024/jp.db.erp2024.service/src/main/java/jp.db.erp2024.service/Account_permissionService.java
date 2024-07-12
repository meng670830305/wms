/**
 * 业务逻辑层(jp.db.erp2024.service)包
 *
 * wangyp Copyright 2006-2023
 * 文件:        Account_permissionMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/7
 * 负责人:      wangyp
 */

package jp.db.erp2024.service;

import jakarta.annotation.Resource;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jp.db.erp2024.pojo.Account_permission;
import jp.db.erp2024.mapper.Account_permissionMapper;

import java.util.List;

/**
 * Mybatis业务逻辑层Account_permissionService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("account_permissionService")
public class Account_permissionService
{
    public Account_permissionService()
    {
    }
    
    //@Autowired
    @Resource
	private Account_permissionMapper account_permissionMapper;

    public List<Account_permission> getAccount_permissionList(String permissionIdString) throws Exception {
        return this.account_permissionMapper.selectWhere(String.format("%s IS NOT NULL AND %s IN ('%s')", Account_permission._HREF_, Account_permission._ID_, permissionIdString));
    }

    public List<Account_permission> getPermissionAll() throws Exception {
        return this.account_permissionMapper.selectAll();
    }

    public void createPermission(Account_permission accountPermission) throws Exception {
        this.account_permissionMapper.insert(accountPermission);
    }

    public Account_permission getPermission(String id) throws Exception {
        Account_permission obj = new Account_permission();
        obj.setId(id);
        return this.account_permissionMapper.selectOne(obj);
    }

    public void updatePermission(Account_permission accountPermission) throws Exception {
        this.account_permissionMapper.update(accountPermission);
    }

    public void deletePermission(String id) throws Exception {
        Account_permission obj = new Account_permission();
        obj.setId(id);
        this.account_permissionMapper.delete(obj);
    }
}
