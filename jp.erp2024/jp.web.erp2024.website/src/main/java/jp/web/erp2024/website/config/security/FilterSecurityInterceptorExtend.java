package jp.web.erp2024.website.config.security;


import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.stereotype.Component;

@Component
public class FilterSecurityInterceptorExtend extends FilterSecurityInterceptor {

    @Resource
    private AccessDecisionManagerImpl accessDecisionManagerImpl;

    @Resource
    private FilterInvocationSecurityMetadataSourceImpl filterInvocationSecurityMetadataSourceImpl;

    @PostConstruct
    public void init() {
        super.setAccessDecisionManager(this.accessDecisionManagerImpl);
        super.setSecurityMetadataSource(this.filterInvocationSecurityMetadataSourceImpl);
    }
}
