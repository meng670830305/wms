package jp.web.erp2024.website.config.util;

import jp.web.erp2024.website.config.security.AuthUser;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;

/**
 * <pre>
 * 获取security操作相关的工具类
 * </pre>
 *
 * @author wangyunpeng
 * @date 2021/7/18 9:19
 * @wechat wyp_blog
 * @company ㍿○○○○
 */
public class SecurityUtil {

    /**
     * 验证当前用户是否登录
     *
     * @return boolean 是否登录
     */
    public static boolean isAuthentication() {
        boolean auth = false;
        SecurityContext context = SecurityContextHolder.getContext();
        if (context != null) {
            Authentication authentication = context.getAuthentication();
            if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
                auth = true;
            }
        }
        return auth;
    }

    /**
     * 得到当前登录的用户信息
     *
     * @return
     */
    public static AuthUser getLoginUser() {
        SecurityContext context = SecurityContextHolder.getContext();
        if (context != null) {
            Authentication authentication = context.getAuthentication();
            if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
                Object principal = authentication.getPrincipal();
                if (principal instanceof AuthUser) {
                    return (AuthUser) principal;
                }
            }
        }
        return null;
    }

    /**
     * 得到当前登录的用户信息
     *
     * @param principal
     * @return
     */
    public static AuthUser getLoginUser(Principal principal) {
        AuthUser authUser = null;
        if (principal instanceof UsernamePasswordAuthenticationToken) {
            UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
            Object object = token.getPrincipal();
            if (object instanceof AuthUser) {
                authUser = (AuthUser) object;
            }
        }
        return authUser;
    }

}
