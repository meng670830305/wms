package jp.web.erp2024.website.config.security;

import jakarta.annotation.Resource;
import jp.web.erp2024.website.config.mvc.WebMvcConfigurerImpl;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.security.web.session.ConcurrentSessionFilter;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.security.SpringSessionBackedSessionRegistry;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfigurer {

    @Resource
    private AuthenticationProviderImpl authenticationProvider;

    @Resource
    private FilterSecurityInterceptorExtend filterSecurityInterceptorExtend;

    @Resource
    private AuthenticationSuccessHandlerImpl customAuthenticationSuccessHandler;

    @Resource
    private AuthenticationFailureHandlerImpl customAuthenticationFailureHandler;

    @Resource
    private LogoutHandlerImpl logoutHandler;
    @Resource
    private LogoutSuccessHandlerImpl customLogoutSuccessHandler;

    @Resource
    private FindByIndexNameSessionRepository sessionRepository;

    @Resource
    private SessionInformationExpiredStrategyImpl sessionInformationExpiredStrategy;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, HandlerMappingIntrospector introspector) throws Exception {
        MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);
        MvcRequestMatcher[] mvcRequestMatchers = Arrays.stream(WebMvcConfigurerImpl.URL_WHITELIST).map(item -> mvcMatcherBuilder.pattern(item)).toArray(MvcRequestMatcher[]::new);
        http.authorizeHttpRequests(authz -> authz
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                .requestMatchers(mvcRequestMatchers).permitAll()
                .anyRequest().authenticated()
        );

        http
                .formLogin(login -> login
                        .loginPage("/Auth/Login")
                        .usernameParameter("LoginAccount")
                        .passwordParameter("LoginPassword")
                        .successHandler(this.customAuthenticationSuccessHandler)
                        .failureHandler(this.customAuthenticationFailureHandler)
                        .permitAll()
                ).logout(logout -> logout
                        .logoutUrl("/Auth/Logout")
                        .addLogoutHandler(this.logoutHandler)
                        .logoutSuccessHandler(this.customLogoutSuccessHandler)
                        .invalidateHttpSession(true)
                        .deleteCookies("userID")
                        .permitAll()
                )
                .sessionManagement()
                .sessionFixation()
                .migrateSession()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .maximumSessions(1)
                .expiredSessionStrategy(this.sessionInformationExpiredStrategy)
        ;

        http.exceptionHandling();

        http.headers().frameOptions().disable();

        http.cors();

        // 关闭CSRF跨域，否则ajax不允许访问
        //http.csrf().disable();

        // 打开CSRF跨域
        http.csrf()
//             该方法会设置 Cookie 中的 HttpOnly 属性为 false，也就是允许前端通过 js 操作 Cookie
//            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .csrfTokenRepository(new HttpSessionCsrfTokenRepository())
                .requireCsrfProtectionMatcher(
                        httpServletRequest ->
                                httpServletRequest.getMethod().equals("POST")
                                        && !httpServletRequest.getRequestURI().startsWith("/Auth/Logout")
                );

        http.authenticationProvider(this.authenticationProvider);
        http.addFilterBefore(this.filterSecurityInterceptorExtend, FilterSecurityInterceptor.class);

        return http.build();
    }

    @Bean
    public SpringSessionBackedSessionRegistry sessionRegistry() {
        return new SpringSessionBackedSessionRegistry(this.sessionRepository);
    }

}
