/**
 *
 * 业务逻辑层(jp.db.erp2024.service)包
 *
 * wangyp Copyright 2006-2023
 * 文件:        Account_userpermissionassignMapper.java
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
import org.springframework.stereotype.Component;

import jp.db.erp2024.pojo.Account_userpermissionassign;
import jp.db.erp2024.mapper.Account_userpermissionassignMapper;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Mybatis业务逻辑层Account_userpermissionassignService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("account_userpermissionassignService")
public class Account_userpermissionassignService
{
    public Account_userpermissionassignService()
    {
    }
    
    //@Autowired
    @Resource
	private Account_userpermissionassignMapper account_userpermissionassignMapper;

    private final static String GUID_EMPTY_VALUE = Guid.empty();

    public List<Account_userpermissionassign> getAccount_userpermissionassignList(Integer userID) throws Exception {
        return this.account_userpermissionassignMapper.selectWhere(String.format("%s=%s", Account_userpermissionassign._USERID_, userID));
    }

    public boolean hasUserSpecialPermission(Integer userID, String permissionAssignID) throws Exception {
        String where = String.format("%s=%s AND %s='%s' AND %s=1", Account_userpermissionassign._USERID_, userID, Account_userpermissionassign._PERMISSIONID_, permissionAssignID, Account_userpermissionassign._ISENABLE_);
        int count = this.account_userpermissionassignMapper.selectCount(where);
        return count > 0;
    }

    public void deleteUserSpecialPermission(Integer userID) throws Exception {
        String where = String.format("%s=%s", Account_userpermissionassign._USERID_, userID);
        this.account_userpermissionassignMapper.deleteWhere(where);
    }

    public void assignUserSpecialPermission(List<Account_userpermissionassign> userPermissionAssignList) throws Exception {
        if (userPermissionAssignList == null || userPermissionAssignList.isEmpty()) {
            throw new NullPointerException("assignUserSpecialPermission(List<Account_userpermissionassign> userPermissionAssignList)中的userPermissionAssignList对象为null或者为空集合");
        }
        Map<Integer, List<Account_userpermissionassign>> userMap = Lambda.groupByKey(userPermissionAssignList, item -> item.getUserid());
        if (userMap.size() > 1) {
            throw new IllegalArgumentException("一次只能为一个用户分配权限!");
        }
        userMap.clear();
        userMap = null;
        String updateUserName = userPermissionAssignList.get(0).getUpdateusername();
        LocalDateTime updateTime = userPermissionAssignList.get(0).getUpdatetime();
        Integer userID = userPermissionAssignList.get(0).getUserid();
        String where = String.format("%s=%s", Account_userpermissionassign._USERID_, userID);
        List<Account_userpermissionassign> allUserPermissionList = this.account_userpermissionassignMapper.selectWhere(where);
        // 删除无效的权限
        for (final Account_userpermissionassign accountUserPermissionAssign : allUserPermissionList) {
            if (Lambda.contains(userPermissionAssignList, item -> item.getPermissionid().equalsIgnoreCase(accountUserPermissionAssign.getPermissionid()))) {
                continue;
            }
            accountUserPermissionAssign.setUpdatetime(updateTime);
            accountUserPermissionAssign.setUpdateusername(updateUserName);
            accountUserPermissionAssign.setIsenable(Integer.valueOf(0));
            this.account_userpermissionassignMapper.update(accountUserPermissionAssign);
        }
        // 添加新的权限
        for (final Account_userpermissionassign accountUserPermissionAssign : userPermissionAssignList) {
            if (GUID_EMPTY_VALUE.equalsIgnoreCase(accountUserPermissionAssign.getPermissionid())) {
                continue;
            }
            if (Lambda.contains(allUserPermissionList, item -> item.getPermissionid().equalsIgnoreCase(accountUserPermissionAssign.getPermissionid()))) {
                continue;
            }
            this.account_userpermissionassignMapper.insert(accountUserPermissionAssign);
        }
        allUserPermissionList.clear();
        allUserPermissionList = null;
    }
}
