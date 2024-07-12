package jp.web.erp2024.website.config.security;

import jakarta.annotation.Resource;
import jp.com.helper.*;
import jp.db.erp2024.mapper.Account_userMapper;
import jp.db.erp2024.pojo.*;
import jp.db.erp2024.service.Account_groupService;
import jp.db.erp2024.service.Account_roleService;
import jp.db.erp2024.service.Account_usergroupassignService;
import jp.db.erp2024.service.Account_userroleassignService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class AuthenticationProviderImpl implements AuthenticationProvider {
    private final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    @Resource
    private Account_userMapper account_userMapper;
    @Resource
    private Account_usergroupassignService account_usergroupassignService;
    @Resource
    private Account_groupService account_groupService;
    @Resource
    private Account_userroleassignService account_userroleassignService;
    @Resource
    private Account_roleService account_roleService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String userName = authentication.getName();
        String password = (String) authentication.getCredentials();

        String where = String.format("%s='%s'", Account_user._EMAIL_, userName);
        Account_user accountUser = Lambda.first(this.account_userMapper.selectWhere(where));
        if (accountUser == null) {
            String message = String.format("ユーザー：%s，不存在", userName);
            LoggerHelper.error(this.logger, message);
            throw new UsernameNotFoundException(message);
        }
        if (accountUser.getStatus() != 0) {
            String message = String.format("ユーザー：%s，禁用状态", userName);
            LoggerHelper.error(this.logger, message);
            throw new DisabledException(message);
        }

        String encodePwd = SecurityHelper.Md5(password);
        if (!accountUser.getLoginpassword().equalsIgnoreCase(encodePwd)) {
            throw new BadCredentialsException("密码不正确");
        }

        accountUser.setLogintime(Date8Helper.now());
        this.account_userMapper.update(accountUser);

        AuthInfo authInfo = null;
        SimpleGrantedAuthority grantedAuthority = null;
        Collection<GrantedAuthority> grantedAuthorityList = new ArrayList<GrantedAuthority>();

        List<Account_usergroupassign> accountUserGroupAssignList = this.account_usergroupassignService.getAccount_usergroupassignList(accountUser.getId());
        List<Integer> accountGroupIdList = new ArrayList<Integer>();
        for (Account_usergroupassign accountUserGroupAssign : accountUserGroupAssignList) {
            accountGroupIdList.add(accountUserGroupAssign.getGroupid());
        }
        accountUserGroupAssignList.clear();
        accountUserGroupAssignList = null;
        String groupIdString = StringUtils.join(accountGroupIdList, ',');
        accountGroupIdList.clear();
        accountGroupIdList = null;
        if (StringUtils.isNotBlank(groupIdString)) {
            List<Account_group> accountGroupList = this.account_groupService.getAccount_groupList(groupIdString);
            for (Account_group accountGroup : accountGroupList) {
                authInfo = new AuthInfo(accountGroup.getId(), accountGroup.getName(), "Group");
                grantedAuthority = new SimpleGrantedAuthority(JsonHelper.serialize(authInfo));
                LoggerHelper.debug(this.logger, "ユーザー：[{}]，拥有组织：[{}]，即spring security中的access。", accountUser.getLoginaccount(), accountGroup.getName());
                grantedAuthorityList.add(grantedAuthority);
            }
            accountGroupList.clear();
            accountGroupList = null;
        }

        List<Account_userroleassign> accountUserRoleAssignList = this.account_userroleassignService.getAccount_userroleassignList(accountUser.getId());
        List<Integer> accountRoleIdList = new ArrayList<Integer>();
        for (Account_userroleassign accountUserRoleAssign : accountUserRoleAssignList) {
            accountRoleIdList.add(accountUserRoleAssign.getRoleid());
        }
        accountUserRoleAssignList.clear();
        accountUserRoleAssignList = null;
        String roleIdString = StringUtils.join(accountRoleIdList, ",");
        accountRoleIdList.clear();
        accountRoleIdList = null;
        if (StringUtils.isNotBlank(roleIdString)) {
            List<Account_role> accountRoleList = this.account_roleService.getAccount_roleList(roleIdString);
            for (Account_role accountRole : accountRoleList) {
                authInfo = new AuthInfo(accountRole.getId(), accountRole.getName(), "Role");
                grantedAuthority = new SimpleGrantedAuthority(JsonHelper.serialize(authInfo));
                LoggerHelper.debug(this.logger, "ユーザー：[{}]，拥有角色：[{}]，即spring security中的access。", accountUser.getLoginaccount(), accountRole.getName());
                grantedAuthorityList.add(grantedAuthority);
            }
            accountRoleList.clear();
            accountRoleList = null;
        }

        boolean enabled = true;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;
        AuthUser userExtend = new AuthUser(accountUser, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, grantedAuthorityList);
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userExtend, password, grantedAuthorityList);
        return usernamePasswordAuthenticationToken;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return true;
    }
}
