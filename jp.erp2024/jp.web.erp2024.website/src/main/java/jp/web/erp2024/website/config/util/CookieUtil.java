package jp.web.erp2024.website.config.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * <pre>
 *
 * </pre>
 *
 * @author wangyunpeng
 * @date 2023/11/9 21:07
 * @company ㍿○○○○
 */
public class CookieUtil {
    /**
     * 获取某一个名称的Cookie对象F
     *
     * @param request
     * @param cookieName
     * @return
     */
    public static Cookie getCookie(HttpServletRequest request, String cookieName) {
        Cookie cookie = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie item : cookies) {
            if (item.getName().equalsIgnoreCase(cookieName)) {
                cookie = item;
                break;
            }
        }
        return cookie;
    }

    /**
     * 获取某一个名称的Cookie值
     *
     * @param request
     * @param cookieName
     * @return
     */
    public static String getCookieValue(HttpServletRequest request, String cookieName) {
        String cookieValue = null;
        Cookie cookie = getCookie(request, cookieName);
        if (cookie != null) {
            cookieValue = cookie.getValue();
        }
        return cookieValue;
    }

    /**
     * 设置一个永久的cookie
     *
     * @param response
     * @param cookieName
     * @param cookieValue
     */
    public static void setCookie(HttpServletResponse response, String cookieName, String cookieValue) {
        setCookie(response, cookieName, cookieValue, false, true);
    }

    public static void setCookie(HttpServletResponse response, String cookieName, String cookieValue, boolean secure, boolean httpOnly) {
        Cookie cookie = new Cookie(cookieName, cookieValue);
        cookie.setPath("/");
        cookie.setSecure(secure);
        cookie.setHttpOnly(httpOnly);
        setCookie(response, cookie);
    }

    /**
     * 设置一个永久的cookie
     *
     * @param response
     * @param cookie
     */
    public static void setCookie(HttpServletResponse response, Cookie cookie) {
        response.addCookie(cookie);
    }

    /**
     * 移除cookie
     *
     * @param response
     * @param cookieName
     */
    public static void deleteCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        setCookie(response, cookie);
    }
}
