/**
 * 业务逻辑层(jp.db.erp2024.service)包
 * wangyp Copyright 2006-2023
 * 文件:        Account_grouppermissionassignMapper.java
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

import jp.db.erp2024.pojo.Account_grouppermissionassign;
import jp.db.erp2024.mapper.Account_grouppermissionassignMapper;

import java.util.List;
import java.util.Map;

/**
 * Mybatis业务逻辑层Account_grouppermissionassignService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("account_grouppermissionassignService")
public class Account_grouppermissionassignService {
    public Account_grouppermissionassignService() {
    }

    //@Autowired
    @Resource
    private Account_grouppermissionassignMapper account_grouppermissionassignMapper;

    private final static String GUID_EMPTY_VALUE = Guid.empty();

    public List<Account_grouppermissionassign> getGroupPermissionAssignList(List<String> permissionIDList) {
        if (CollectionUtils.isNotEmpty(permissionIDList)) {
            String where = String.format("%s IN ('%s')", Account_grouppermissionassign._PERMISSIONID_, StringUtils.join(permissionIDList, "','"));
            return this.account_grouppermissionassignMapper.selectWhere(where);
        }
        return this.account_grouppermissionassignMapper.selectAll();
    }

    public boolean hasGroupPermission(Integer groupID, String permissionID) throws Exception {
        String where = String.format("%s=%s AND %s='%s'", Account_grouppermissionassign._GROUPID_, groupID, Account_grouppermissionassign._PERMISSIONID_, permissionID);
        int count = this.account_grouppermissionassignMapper.selectCount(where);
        return count > 0;
    }

    public void deleteGroupPermission(Integer groupID) throws Exception {
        String where = String.format("%s=%s", Account_grouppermissionassign._GROUPID_, groupID);
        this.account_grouppermissionassignMapper.deleteWhere(where);
    }

    public void assignGroupPermission(List<Account_grouppermissionassign> accountGroupPermissionList) throws Exception {
        if (accountGroupPermissionList == null || accountGroupPermissionList.isEmpty()) {
            throw new NullPointerException("assignGroupPermission(List<Account_grouppermissionassign> accountGroupPermissionList)中的accountGroupPermissionList对象为null或者为空集合");
        }

        Map<Integer, List<Account_grouppermissionassign>> groupMap = Lambda.groupByKey(accountGroupPermissionList, item -> item.getGroupid());

        if (groupMap.size() > 1) {
            throw new IllegalArgumentException("一次只能为一个组分配权限!");
        }
        groupMap.clear();
        groupMap = null;
        Integer groupID = accountGroupPermissionList.get(0).getGroupid();
        String where = String.format("%s=%s", Account_grouppermissionassign._GROUPID_, groupID);
        List<Account_grouppermissionassign> allGroupPermissionList = this.account_grouppermissionassignMapper.selectWhere(where);
        // 删除无效的权限
        for (final Account_grouppermissionassign accountGroupPermissionAssign : allGroupPermissionList) {
            if (Lambda.contains(accountGroupPermissionList, item -> item.getPermissionid().equalsIgnoreCase(accountGroupPermissionAssign.getPermissionid()))) {
                continue;
            }
            this.account_grouppermissionassignMapper.delete(accountGroupPermissionAssign);
        }
        // 添加新的权限
        for (final Account_grouppermissionassign accountGroupPermissionAssign : accountGroupPermissionList) {
            if (GUID_EMPTY_VALUE.equalsIgnoreCase(accountGroupPermissionAssign.getPermissionid())) {
                continue;
            }
            if (Lambda.contains(allGroupPermissionList, item -> item.getPermissionid().equalsIgnoreCase(accountGroupPermissionAssign.getPermissionid()))) {
                continue;
            }
            this.account_grouppermissionassignMapper.insert(accountGroupPermissionAssign);
        }
        allGroupPermissionList.clear();
        allGroupPermissionList = null;
    }
}
