package jp.db.erp2024.service;

import cn.hutool.core.lang.func.Func1;
import jakarta.annotation.Resource;
import jp.com.helper.Date8Helper;
import jp.com.helper.Guid;
import jp.com.helper.Lambda;
import jp.db.erp2024.mapper.*;
import jp.db.erp2024.pojo.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Component("menuService")
public class MenuService {

    public MenuService() {
    }

    private static final String GUID_EMPTY_VALUE = Guid.empty();// Guid只读实例，其值保证均为0

    @Resource
    private Account_permissionMapper account_permissionMapper;
    @Resource
    private Account_grouppermissionassignMapper account_grouppermissionassignMapper;
    @Resource
    private Account_rolepermissionassignMapper account_rolepermissionassignMapper;
    @Resource
    private Account_usergroupassignMapper account_usergroupassignMapper;
    @Resource
    private Account_groupMapper account_groupMapper;
    @Resource
    private Account_userroleassignMapper account_userroleassignMapper;
    @Resource
    private Account_roleMapper account_roleMapper;
    @Resource
    private Account_userpermissionassignMapper account_userpermissionassignMapper;

    public List<Account_permission> getUserPermissionList(Integer userID, LocalDateTime time) throws Exception {
        return this.getCachePermission(userID, time);
    }

    private List<Account_permission> getCachePermission(Integer userID, LocalDateTime time) throws Exception {
        List<String> permissionIDList = new ArrayList<String>();
        String permissionID = "";
        // 组
        List<Account_group> accountGroupList = getUserValidGroupList(userID, time);
        if (accountGroupList.size() > 0) {
            List<Integer> userGroupIDList = Lambda.select(accountGroupList, item -> item.getId());
            userGroupIDList = Lambda.distinct(userGroupIDList);
            if (userGroupIDList.size() > 0) {
                String where = String.format("%s in (%s)", Account_grouppermissionassign._GROUPID_, StringUtils.join(userGroupIDList, ','));
                List<Account_grouppermissionassign> accountGroupPermissionAssignList = this.account_grouppermissionassignMapper.selectWhere(where);
                for (Account_grouppermissionassign accountGroupPermissionassign : accountGroupPermissionAssignList) {
                    permissionID = accountGroupPermissionassign.getPermissionid();
                    if (StringUtils.isNoneEmpty(permissionID) && !permissionIDList.contains(permissionID)) {
                        permissionIDList.add(permissionID);
                    }
                }
            }
        }
        // 角色
        List<Account_role> accountRoleList = getUserValidRoleList(userID, time);
        if (accountRoleList.size() > 0) {
            List<Integer> userRoleIDList = Lambda.select(accountRoleList, item -> item.getId());
            userRoleIDList = Lambda.distinct(userRoleIDList);
            if (userRoleIDList.size() > 0) {
                String where = String.format("%s IN (%s)", Account_rolepermissionassign._ROLEID_, StringUtils.join(userRoleIDList, ','));
                List<Account_rolepermissionassign> accountRolePermissionAssignList = this.account_rolepermissionassignMapper.selectWhere(where);
                for (Account_rolepermissionassign accountRolePermissionAssign : accountRolePermissionAssignList) {
                    permissionID = accountRolePermissionAssign.getPermissionid();
                    if (StringUtils.isNoneEmpty(permissionID) && !permissionIDList.contains(permissionID)) {
                        permissionIDList.add(permissionID);
                    }
                }
            }
        }

        // 特殊权限
        List<Account_userpermissionassign> accountUserPermissionAssignList = getUserValidSpecialPermissionList(userID, time);
        Integer assignType = null;
        for (Account_userpermissionassign accountUserPermissionAssign : accountUserPermissionAssignList) {
            assignType = accountUserPermissionAssign.getAssigntype();
            permissionID = accountUserPermissionAssign.getPermissionid();
            if (StringUtils.isNoneEmpty(permissionID)) {
                switch (assignType) {
                    case 1:// EAccount_AssignType.包含.getValue()
                        if (!permissionIDList.contains(permissionID)) {
                            permissionIDList.add(permissionID);
                        }
                        break;
                    default:
                        permissionIDList.remove(permissionID);
                        break;
                }
            }
        }

        List<Account_permission> accountPermissionList = takePermission(permissionIDList);
        permissionIDList.clear();
        permissionIDList = null;

        List<Account_permission> accountPermissionResultList = new ArrayList<Account_permission>();
        if (accountPermissionList.size() > 0) {
            filterPermission(accountPermissionList, accountPermissionResultList, item -> GUID_EMPTY_VALUE.equals(item.getParentid()));
        }
        return accountPermissionResultList;
    }

    private List<Account_group> getUserValidGroupList(Integer userID, LocalDateTime time) throws Exception {
        // 组
        List<Account_group> accountGroupList = null;
        String where = String.format("%s=%s AND %s>'%s'", Account_usergroupassign._USERID_, userID, Account_usergroupassign._EXPIREDTIME_, Date8Helper.toStringYYYY_MM_DD_HH_MM_SS(time));
        List<Account_usergroupassign> accountUserGroupAssignList = this.account_usergroupassignMapper.selectWhere(where);
        List<Integer> userGroupIDList = Lambda.select(accountUserGroupAssignList, item -> item.getGroupid());
        userGroupIDList = Lambda.distinct(userGroupIDList);
        if (userGroupIDList.size() > 0) {
            where = String.format("%s IN (%s)", Account_group._ID_, StringUtils.join(userGroupIDList, ','));
            accountGroupList = this.account_groupMapper.selectWhere(where);
        } else {
            accountGroupList = new ArrayList<Account_group>(0);
        }
        return accountGroupList;
    }

    private List<Account_role> getUserValidRoleList(Integer userID, LocalDateTime time) throws Exception {
        // 角色
        List<Account_role> accountRoleList = null;
        String where = String.format("%s=%s AND %s>'%s' AND %s=1", Account_userroleassign._USERID_, userID, Account_userroleassign._EXPIREDTIME_, Date8Helper.toStringYYYY_MM_DD_HH_MM_SS(time), Account_userroleassign._ISENABLE_);
        List<Account_userroleassign> accountUserRoleAssignList = this.account_userroleassignMapper.selectWhere(where);
        List<Integer> userRoleIDList = Lambda.select(accountUserRoleAssignList, item -> item.getRoleid());
        userRoleIDList = Lambda.distinct(userRoleIDList);
        if (userRoleIDList.size() > 0) {
            where = String.format("%s IN (%s) AND %s=1", Account_role._ID_, StringUtils.join(userRoleIDList, ','), Account_role._ISENABLE_);
            accountRoleList = this.account_roleMapper.selectWhere(where);
        } else {
            accountRoleList = new ArrayList<Account_role>(0);
        }
        return accountRoleList;
    }

    private List<Account_userpermissionassign> getUserValidSpecialPermissionList(Integer userID, LocalDateTime time) throws Exception {
        String where = String.format("%s=%s AND %s=1", Account_userpermissionassign._USERID_, userID, Account_userpermissionassign._ISENABLE_);
        return this.account_userpermissionassignMapper.selectWhere(where);
    }

    private List<Account_permission> takePermission(List<String> permissionIDList) throws Exception {
        List<Account_permission> accountPermissionList = null;
        if (permissionIDList.size() > 0) {
            String where = String.format("%s IN ('%s')", Account_permission._ID_, StringUtils.join(permissionIDList, "','"));
            accountPermissionList = this.account_permissionMapper.selectWhere(where);
        } else {
            accountPermissionList = new ArrayList<Account_permission>(0);
        }
        return accountPermissionList;
    }

    private static void filterPermission(List<Account_permission> list, List<Account_permission> result, Predicate<Account_permission> predicate) {
        List<Account_permission> accountPermissionList = Lambda.where(list, predicate);
        for (final Account_permission accountPermission : accountPermissionList) {
            result.add(accountPermission);
            filterPermission(list, result, item -> item.getParentid().equals(accountPermission.getId()));
        }
    }
}
