package jp.web.erp2024.website.config.mvc;

import jakarta.annotation.Resource;
import jp.com.filterexpression.EntityResolver;
import jp.web.erp2024.website.config.error.ExceptionResolver;
import jp.web.erp2024.website.config.error.ExceptionView;
import jp.web.erp2024.website.config.security.PermissionAttributeInterceptor;
import jp.web.erp2024.website.service.MailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.thymeleaf.extras.minify.dialect.MinifierDialect;

import java.util.List;

@Configuration
public class WebMvcConfigurerImpl implements WebMvcConfigurer {

    @Resource
    private MailService mailService;

    @Bean("exceptionView")
    public ExceptionView exceptionView() {
        return new ExceptionView();
    }

    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        resolvers.add(new ExceptionResolver(this.mailService));
    }

    public static final String[] URL_WHITELIST = {
            "/Auth/**",
            "/Images/**",
            "/Content/**",
            "/favicon.ico"
    };

    @Resource
    private PermissionAttributeInterceptor permissionAttributeInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(this.permissionAttributeInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(URL_WHITELIST)
        ;
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("redirect:/Auth/Login");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
        WebMvcConfigurer.super.addViewControllers(registry);
    }

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        AntPathMatcher matcher = new AntPathMatcher();
        matcher.setCaseSensitive(false);
        configurer
                .setPathMatcher(matcher)
                .setUseTrailingSlashMatch(true)
        ;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new EntityResolver());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                // 设置允许跨域的路由
                .addMapping("/**")
                // 设置允许跨域请求的域名
                .allowedOriginPatterns("*")
                // 设置允许的方法
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS")
                // 是否允许发送Cookie
                .allowCredentials(true)
                // 设置允许跨域请求的头部信息
                .allowedHeaders("*")
                // 设置允许跨域暴露哪些头部信息
                .exposedHeaders("*")
        // 设置跨域允许时间
        //.maxAge(3600)
        ;
    }
    // endregion

    @Bean
    @Profile("prod")
    public MinifierDialect minifierDialect() {
        return new MinifierDialect();
    }
}
