package jp.db.erp2024.service;

import jakarta.annotation.Resource;
import jp.db.erp2024.mapper.*;
import jp.db.erp2024.pojo.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component("authService")
public class AuthService {

    public AuthService() {
    }

    @Resource
    private Account_permissionMapper account_permissionMapper;
    @Resource
    private Account_grouppermissionassignMapper account_grouppermissionassignMapper;
    @Resource
    private Account_rolepermissionassignMapper account_rolepermissionassignMapper;
    @Resource
    private Account_userpermissionassignMapper account_userpermissionassignMapper;
    @Resource
    private Account_groupMapper account_groupMapper;
    @Resource
    private Account_roleMapper account_roleMapper;

    public List<Account_permission> getPermissionList() {
        return this.account_permissionMapper.selectAll();
    }

    public List<Account_grouppermissionassign> getGroupPermissionAssignList() {
        return this.account_grouppermissionassignMapper.selectAll();
    }

    public List<Account_rolepermissionassign> getRolePermissionAssignList() {
        return this.account_rolepermissionassignMapper.selectAll();
    }


    public List<Account_userpermissionassign> getUserPermissionAssignList() {
        return this.account_userpermissionassignMapper.selectAll();
    }

    public List<Account_group> getGroupList() {
        return this.account_groupMapper.selectAll();
    }

    public List<Account_role> getRoleList() {
        return this.account_roleMapper.selectAll();
    }
}
