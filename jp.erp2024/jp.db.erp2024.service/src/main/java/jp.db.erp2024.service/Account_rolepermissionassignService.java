/**
 * 业务逻辑层(jp.db.erp2024.service)包
 * wangyp Copyright 2006-2023
 * 文件:        Account_rolepermissionassignMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/7
 * 负责人:      wangyp
 */

package jp.db.erp2024.service;

import cn.hutool.core.lang.func.Func1;
import jakarta.annotation.Resource;
//import org.springframework.beans.factory.annotation.Autowired;
import jp.com.helper.Guid;
import jp.com.helper.Lambda;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import jp.db.erp2024.pojo.Account_rolepermissionassign;
import jp.db.erp2024.mapper.Account_rolepermissionassignMapper;

import java.util.List;
import java.util.Map;

/**
 * Mybatis业务逻辑层Account_rolepermissionassignService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("account_rolepermissionassignService")
public class Account_rolepermissionassignService {
    public Account_rolepermissionassignService() {
    }

    //@Autowired
    @Resource
    private Account_rolepermissionassignMapper account_rolepermissionassignMapper;

    private final static String GUID_EMPTY_VALUE = Guid.empty();

    public List<Account_rolepermissionassign> getRolePermissionAssignList(List<String> permissionIDList) {
        if (CollectionUtils.isNotEmpty(permissionIDList)) {
            String where = String.format("%s IN ('%s')", Account_rolepermissionassign._PERMISSIONID_, StringUtils.join(permissionIDList, "','"));
            return this.account_rolepermissionassignMapper.selectWhere(where);
        }
        return this.account_rolepermissionassignMapper.selectAll();
    }

    public boolean hasRolePermission(Integer roleID, String permissionID) throws Exception {
        String where = String.format("%s=%s AND %s='%s'", Account_rolepermissionassign._ROLEID_, roleID, Account_rolepermissionassign._PERMISSIONID_, permissionID);
        int count = this.account_rolepermissionassignMapper.selectCount(where);
        return count > 0;
    }

    public void deleteRolePermission(Integer roleID) throws Exception {
        String where = String.format("%s=%s", Account_rolepermissionassign._ROLEID_, roleID);
        this.account_rolepermissionassignMapper.deleteWhere(where);
    }

    public void assignRolePermission(List<Account_rolepermissionassign> accountRolePermissionAssignList) throws Exception {
        if (accountRolePermissionAssignList == null || accountRolePermissionAssignList.isEmpty()) {
            throw new NullPointerException("assignRolePermission(List<Account_rolepermissionassign> accountRolePermissionAssignList)中的accountRolePermissionAssignList对象为null或者为空集合");
        }
        Map<Integer, List<Account_rolepermissionassign>> roleMap = Lambda.groupByKey(accountRolePermissionAssignList, item -> item.getRoleid());
        if (roleMap.size() > 1) {
            throw new IllegalArgumentException("一次只能为一个角色分配权限!");
        }
        roleMap.clear();
        roleMap = null;
        Integer roleID = accountRolePermissionAssignList.get(0).getRoleid();
        String where = String.format("%s=%s", Account_rolepermissionassign._ROLEID_, roleID);
        List<Account_rolepermissionassign> allRolePermissionList = this.account_rolepermissionassignMapper.selectWhere(where);
        // 删除无效的权限
        for (final Account_rolepermissionassign accountRolepPermissionAssign : allRolePermissionList) {
            if (Lambda.contains(accountRolePermissionAssignList, item -> item.getPermissionid().equalsIgnoreCase(accountRolepPermissionAssign.getPermissionid()))) {
                continue;
            }
            this.account_rolepermissionassignMapper.delete(accountRolepPermissionAssign);
        }
        // 添加新的权限
        for (final Account_rolepermissionassign accountRolePermissionAssign : accountRolePermissionAssignList) {
            if (GUID_EMPTY_VALUE.equalsIgnoreCase(accountRolePermissionAssign.getPermissionid())) {
                continue;
            }
            if (Lambda.contains(allRolePermissionList, item -> item.getPermissionid().equalsIgnoreCase(accountRolePermissionAssign.getPermissionid()))) {
                continue;
            }
            this.account_rolepermissionassignMapper.insert(accountRolePermissionAssign);
        }
        allRolePermissionList.clear();
        allRolePermissionList = null;
    }
}
