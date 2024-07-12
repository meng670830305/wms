package jp.web.erp2024.website.config.security;

import jakarta.annotation.Resource;
import jp.com.helper.JsonHelper;
import jp.db.erp2024.pojo.Account_grouppermissionassign;
import jp.db.erp2024.pojo.Account_rolepermissionassign;
import jp.db.erp2024.pojo.Account_userpermissionassign;
import jp.db.erp2024.service.Account_grouppermissionassignService;
import jp.db.erp2024.service.Account_rolepermissionassignService;
import jp.db.erp2024.service.Account_userpermissionassignService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PermissionContext {

    @Resource
    private Account_grouppermissionassignService account_grouppermissionassignService;
    @Resource
    private Account_rolepermissionassignService account_rolepermissionassignService;
    @Resource
    private Account_userpermissionassignService account_userpermissionassignService;

    public boolean hasPermission(List<String> permissionList) throws Exception {
        SecurityContext context = SecurityContextHolder.getContext();
        if (context != null) {
            Authentication authentication = context.getAuthentication();
            int size = authentication.getAuthorities().size();
            if (size > 0) {
                String authInfo = null;
                List<AuthInfo> authInfoList = new ArrayList<>(size);
                for (GrantedAuthority grantedAuthority : authentication.getAuthorities()) {
                    authInfo = grantedAuthority.getAuthority();
                    authInfoList.add(JsonHelper.deserialize(authInfo, AuthInfo.class));
                }
                List<Integer> groupIDList = authInfoList.stream().filter(arg -> StringUtils.equalsIgnoreCase("Group", arg.getType())).map(arg -> arg.getID()).collect(Collectors.toList());
                List<Account_grouppermissionassign> account_grouppermissionassignList = this.account_grouppermissionassignService.getGroupPermissionAssignList(permissionList);
                for (Account_grouppermissionassign account_grouppermissionassign : account_grouppermissionassignList) {
                    if (groupIDList.contains(account_grouppermissionassign.getGroupid())) {
                        return true;
                    }
                }
                List<Integer> roleIDList = authInfoList.stream().filter(arg -> StringUtils.equalsIgnoreCase("Role", arg.getType())).map(arg -> arg.getID()).collect(Collectors.toList());
                List<Account_rolepermissionassign> account_rolepermissionassignList = this.account_rolepermissionassignService.getRolePermissionAssignList(permissionList);
                for (Account_rolepermissionassign account_rolepermissionassign : account_rolepermissionassignList) {
                    if (roleIDList.contains(account_rolepermissionassign.getRoleid())) {
                        return true;
                    }
                }
            }

            Object principal = authentication.getPrincipal();
            if (principal instanceof AuthUser) {
                Integer userID = ((AuthUser) principal).getID();
                List<Account_userpermissionassign> account_userpermissionassignList = this.account_userpermissionassignService.getAccount_userpermissionassignList(userID);
                for (Account_userpermissionassign account_userpermissionassign : account_userpermissionassignList) {
                    if (permissionList.contains(account_userpermissionassign.getPermissionid())) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public boolean hasPermission(String... permissions) throws Exception {
        return this.hasPermission(Arrays.asList(permissions));
    }

    public boolean hasPermission(String permission) throws Exception {
        return this.hasPermission(new String[]{permission});
    }
}
