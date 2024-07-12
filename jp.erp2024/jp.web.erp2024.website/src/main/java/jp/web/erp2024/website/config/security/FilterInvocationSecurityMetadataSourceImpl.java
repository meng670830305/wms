package jp.web.erp2024.website.config.security;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jp.com.helper.JsonHelper;
import jp.com.helper.LoggerHelper;
import jp.db.erp2024.pojo.*;
import jp.db.erp2024.service.AuthService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FilterInvocationSecurityMetadataSourceImpl implements FilterInvocationSecurityMetadataSource {

    private final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    private Map<String, Collection<ConfigAttribute>> _resourceMap = null;

    @Resource
    private AuthService authService;

    @PostConstruct
    public void loadResourceDefine() throws Exception {
        this._resourceMap = new HashMap<String, Collection<ConfigAttribute>>();
        List<Account_permission> accountPermissionList = this.authService.getPermissionList();
        List<Account_grouppermissionassign> accountGroupPermissionAssignList = this.authService.getGroupPermissionAssignList();
        List<Account_rolepermissionassign> accountRolePermissionAssignList = this.authService.getRolePermissionAssignList();
        List<Account_group> accountGroupList = this.authService.getGroupList();
        List<Account_role> accountRoleList = this.authService.getRoleList();
        AuthInfo authInfo = null;
        String accountPermissionHref = null;
        ConfigAttribute configAttribute = null;
        Collection<ConfigAttribute> configAttributeList = null;
        for (Account_permission accountPermission : accountPermissionList) {
            accountPermissionHref = accountPermission.getHref();
            if (StringUtils.isNotBlank(accountPermissionHref)) {
                configAttributeList = new ArrayList<ConfigAttribute>();
                for (Account_grouppermissionassign accountGroupPermissionAssign : accountGroupPermissionAssignList) {
                    if (accountPermission.getId().equals(accountGroupPermissionAssign.getPermissionid())) {
                        for (Account_group accountGroup : accountGroupList) {
                            if (accountGroup.getId().equals(accountGroupPermissionAssign.getGroupid())) {
                                authInfo = new AuthInfo(accountGroup.getId(), accountGroup.getName(), "Group");
                                configAttribute = new SecurityConfig(JsonHelper.serialize(authInfo));
                                configAttributeList.add(configAttribute);
                            }
                        }
                    }
                }
                for (Account_rolepermissionassign accountRolePermissionAssign : accountRolePermissionAssignList) {
                    if (accountPermission.getId().equals(accountRolePermissionAssign.getPermissionid())) {
                        for (Account_role accountRole : accountRoleList) {
                            if (accountRole.getId().equals(accountRolePermissionAssign.getRoleid())) {
                                authInfo = new AuthInfo(accountRole.getId(), accountRole.getName(), "Role");
                                configAttribute = new SecurityConfig(JsonHelper.serialize(authInfo));
                                configAttributeList.add(configAttribute);
                            }
                        }
                    }
                }
                if (configAttributeList.size() > 0) {
                    this._resourceMap.put(accountPermissionHref, configAttributeList);
                }
            }
        }
        accountPermissionList.clear();
        accountPermissionList = null;
        accountGroupPermissionAssignList.clear();
        accountGroupPermissionAssignList = null;
        accountGroupList.clear();
        accountGroupList = null;
    }

    @Override
    public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
        LoggerHelper.debug(this.logger, "getAttributes(Object) - start");
        FilterInvocation filterInvocation = (FilterInvocation) object;
        HttpServletRequest request = filterInvocation.getHttpRequest();
        Iterator<String> iterator = this._resourceMap.keySet().iterator();
        while (iterator.hasNext()) {
            String accountPermissionHref = iterator.next();
            if (new AntPathRequestMatcher(accountPermissionHref).matches(request)) {
                Collection<ConfigAttribute> configAttributeCollection = this._resourceMap.get(accountPermissionHref);
                LoggerHelper.debug(this.logger, "getAttributes(Object) - end");
                return configAttributeCollection;
            }
        }
        LoggerHelper.debug(this.logger, "getAttributes(Object) - end");
        return null;
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return this._resourceMap.values().iterator().next();
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return true;
    }

}
