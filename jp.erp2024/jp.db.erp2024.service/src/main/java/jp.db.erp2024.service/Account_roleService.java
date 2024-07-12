/**
 * 业务逻辑层(jp.db.erp2024.service)包
 *
 * wangyp Copyright 2006-2023
 * 文件:        Account_roleMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/7
 * 负责人:      wangyp
 */

package jp.db.erp2024.service;

import jakarta.annotation.Resource;
import jp.com.helper.Date8Helper;
import jp.com.helper.Lambda;
import jp.db.erp2024.mapper.Account_roleMapper;
import jp.db.erp2024.mapper.Account_userroleassignMapper;
import jp.db.erp2024.pojo.Account_role;
import jp.db.erp2024.pojo.Account_userroleassign;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Mybatis业务逻辑层Account_roleService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("account_roleService")
public class Account_roleService
{
    public Account_roleService()
    {
    }
    
    //@Autowired
    @Resource
	private Account_roleMapper account_roleMapper;
    @Resource
    private Account_userroleassignMapper account_userroleassignMapper;

    public List<Account_role> getAccount_roleList(String roleIdString) {
        return this.account_roleMapper.selectWhere(String.format("%s IN (%s)", Account_role._ID_, roleIdString));
    }

    public boolean createRole(Account_role accountRole) throws Exception {
        boolean result = false;
        if (accountRole == null) {
            throw new NullPointerException("createRole(Account_role accountRole)中的accountRole对象为null.");
        }
        if (StringUtils.isBlank(accountRole.getName())) {
            throw new IllegalArgumentException("角色名称不能为空!");
        }
        if (StringUtils.isBlank(accountRole.getDescription())) {
            throw new IllegalArgumentException("角色描述不能为空!");
        }
        String where = String.format("%s='%s'", Account_role._NAME_, accountRole.getName());
        List<Account_role> accountRoleList = this.account_roleMapper.selectWhere(where);
        if (accountRoleList.isEmpty()) {
            result = this.account_roleMapper.insert(accountRole) == 1;
            result = accountRole.getId() > 0;
        } else {
            throw new IllegalArgumentException(String.format("已经存在角色名称为'%s'的记录!", accountRole.getName()));
        }
        return result;
    }

    public Account_role getRole(Integer roleId) throws Exception {
        Account_role obj = new Account_role();
        obj.setId(roleId);
        return this.account_roleMapper.selectOne(obj);
    }

    public void updateRole(Account_role accountRole) throws Exception {
        if (accountRole == null) {
            throw new NullPointerException("updateRole(Account_role accountRole)中的accountRole对象为null.");
        }
        if (StringUtils.isBlank(accountRole.getName())) {
            throw new IllegalArgumentException("角色名称不能为空!");
        }
        if (StringUtils.isBlank(accountRole.getDescription())) {
            throw new IllegalArgumentException("角色描述不能为空!");
        }
        String where = String.format("%s<>%s AND %s='%s'", Account_role._ID_, accountRole.getId(), Account_role._NAME_, accountRole.getName());
        List<Account_role> accountRoleList = this.account_roleMapper.selectWhere(where);
        if (accountRoleList.isEmpty()) {
            this.account_roleMapper.update(accountRole);
        } else {
            throw new IllegalArgumentException(String.format("已经存在角色名称为'%s'的其它记录!", accountRole.getName()));
        }
    }

    public void deleteRole(Integer roleId) throws Exception {
        Account_role obj = new Account_role();
        obj.setId(roleId);
        this.account_roleMapper.delete(obj);
    }

    public List<Account_role> getUserUnAssignRoleList(Integer userID, LocalDateTime now) throws Exception {
        String where = String.format("%s=%s AND %s=1 AND %s>'%s'", Account_userroleassign._USERID_, userID, Account_userroleassign._ISENABLE_, Account_userroleassign._EXPIREDTIME_, Date8Helper.toStringYYYY_MM_DD_HH_MM_SS(now));
        List<Account_userroleassign> accountUserRoleAssignList = this.account_userroleassignMapper.selectWhere(where);
        List<Integer> roleIdList = Lambda.select(accountUserRoleAssignList, item -> item.getRoleid());
        accountUserRoleAssignList.clear();
        accountUserRoleAssignList = null;
        roleIdList = Lambda.distinct(roleIdList);
        if (roleIdList.isEmpty()) {
            where = String.format("%s=1", Account_role._ISENABLE_);
        } else {
            where = String.format("%s NOT IN (%s) AND %s=1", Account_role._ID_, StringUtils.join(roleIdList, ","), Account_role._ISENABLE_);
        }
        roleIdList.clear();
        roleIdList = null;
        return this.account_roleMapper.selectWhere(where);
    }
}
