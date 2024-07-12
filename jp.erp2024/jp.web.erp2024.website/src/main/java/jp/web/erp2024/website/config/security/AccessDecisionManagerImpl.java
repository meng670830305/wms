package jp.web.erp2024.website.config.security;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jp.com.helper.LoggerHelper;
import jp.db.erp2024.pojo.Account_permission;
import jp.db.erp2024.pojo.Account_userpermissionassign;
import jp.db.erp2024.service.Account_permissionService;
import jp.db.erp2024.service.Account_userpermissionassignService;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

@Service
public class AccessDecisionManagerImpl implements AccessDecisionManager {
    /**
     * Logger for this class
     */
    private final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    @Resource
    private Account_userpermissionassignService accountUserPermissionAssignService;
    @Resource
    private Account_permissionService accountPermissionService;

    @Override
    public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes) throws AccessDeniedException, InsufficientAuthenticationException {
        LoggerHelper.debug(this.logger, "decide(Authentication, Object, Collection<ConfigAttribute>) - start");
        FilterInvocation filterInvocation = (FilterInvocation) object;
        HttpServletRequest request = filterInvocation.getHttpRequest();
        if (new AntPathRequestMatcher("/Home/Index").matches(request)) {
            return;
        }
        final String MSG = "很遗憾，您目前没有这个访问权限！";
        if (configAttributes == null) {
            if (this.logger.isDebugEnabled()) {
                this.logger.debug("decide(Authentication, Object, Collection<ConfigAttribute>) - end");
            }
            throw new AccessDeniedException(MSG);
        }
        String configAttributeName = null, authorityName = null;
        Iterator<ConfigAttribute> iterator = configAttributes.iterator();
        while (iterator.hasNext()) {
            configAttributeName = iterator.next().getAttribute();
            for (GrantedAuthority grantedAuthority : authentication.getAuthorities()) {
                authorityName = grantedAuthority.getAuthority();
                if (StringUtils.equalsIgnoreCase(configAttributeName, authorityName)) {
                    LoggerHelper.debug(this.logger, "程序判断到访问URL需要的权限是：{}，当前登录用户所拥有的权限是：{}，授权数据相匹配，验证权限通过。", configAttributeName, authorityName);
                    LoggerHelper.debug(this.logger, "decide(Authentication, Object, Collection<ConfigAttribute>) - end");
                    return;
                }
            }
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof AuthUser) {
            AuthUser accountUser = (AuthUser) principal;
            if (accountUser != null) {
                try {
                    List<Account_userpermissionassign> accountUserPermissionAssignList = this.accountUserPermissionAssignService.getAccount_userpermissionassignList(accountUser.getID());
                    if (CollectionUtils.isNotEmpty(accountUserPermissionAssignList)) {
                        List<String> accountUserPermissionIDList = new ArrayList<String>(accountUserPermissionAssignList.size());
                        for (Account_userpermissionassign accountUserPermissionAssign : accountUserPermissionAssignList) {
                            accountUserPermissionIDList.add(accountUserPermissionAssign.getPermissionid());
                        }
                        accountUserPermissionAssignList.clear();
                        if (CollectionUtils.isNotEmpty(accountUserPermissionIDList)) {
                            String permissionIdString = StringUtils.join(accountUserPermissionIDList, "','");
                            accountUserPermissionIDList.clear();
                            if (StringUtils.isNotBlank(permissionIdString)) {
                                List<Account_permission> accountPermissionList = this.accountPermissionService.getAccount_permissionList(permissionIdString);
                                if (CollectionUtils.isNotEmpty(accountPermissionList)) {
                                    String accountPermissionHref = null;
                                    for (Account_permission accountPermission : accountPermissionList) {
                                        accountPermissionHref = accountPermission.getHref();
                                        if (StringUtils.isNotBlank(accountPermissionHref)) {
                                            if (new AntPathRequestMatcher(accountPermissionHref).matches(request)) {
                                                LoggerHelper.debug(this.logger, "程序判断到访问URL需要的特殊权限是：{}，当前登录用户的邮箱是：{}，授权数据相匹配，验证权限通过。", accountPermission.getName(), accountUser.getEmail());
                                                LoggerHelper.debug(this.logger, "decide(Authentication, Object, Collection<ConfigAttribute>) - end");
                                                return;
                                            }
                                        }
                                    }
                                    accountPermissionList.clear();
                                }
                                accountPermissionList = null;
                            }
                        }
                        accountUserPermissionIDList = null;
                    }
                    accountUserPermissionAssignList = null;
                } catch (Exception e) {
                    LoggerHelper.error(this.logger, e, "程序判断到访问URL需要读取用户的特殊权限失败！");
                }
            }
        }
        throw new InsufficientAuthenticationException(MSG);
    }

    @Override
    public boolean supports(ConfigAttribute attribute) {
        return true;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }

}
