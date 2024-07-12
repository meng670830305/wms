package jp.web.erp2024.website.config.util;

import cn.hutool.core.util.CharsetUtil;
import eu.bitwalker.useragentutils.UserAgent;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.util.Objects;

/**
 * 获取web操作相关的工具类
 *
 * @author wangyunpeng
 * @date 2020/2/26 10:37
 */
public class WebUtil {
    /**
     * Logger for this class
     */
    private static final org.slf4j.Logger _Logger = org.slf4j.LoggerFactory.getLogger(WebUtil.class);

    /**
     * 获取session
     *
     * @param request
     * @return
     */
    public static HttpSession getSession(HttpServletRequest request) {
        return request.getSession();
    }

    /**
     * 获取request
     *
     * @return
     */
    public static HttpServletRequest getRequest() {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        return Objects.requireNonNull(attrs).getRequest();
    }

    /**
     * 获取协议+域名+端口
     *
     * @return 协议+域名字符串
     */
    public static String getDomain(HttpServletRequest request) {
        StringBuffer url = request.getRequestURL();
        return url.delete(url.length() - request.getRequestURI().length(), url.length()).toString();
    }

    /**
     * 获取当前请求的URL里的完整地址(包含：http、domain、path和query)
     *
     * @param request
     * @return
     */
    public static String getCurrentUrl(HttpServletRequest request) {
        StringBuffer requestURLsb = request.getRequestURL();
        String queryString = request.getQueryString();
        if (StringUtils.isNotEmpty(queryString)) {
            requestURLsb.append("?").append(queryString);
        }
        return requestURLsb.toString();
    }

    /**
     * 获取当前请求的URL里的path和query（不包含：http和domain）
     *
     * @param request
     * @return
     */
    public static String getPathAndQuery(HttpServletRequest request) {
        String queryString = request.getQueryString();
        if (StringUtils.isNotEmpty(queryString)) {
            return new StringBuilder(request.getRequestURI()).append("?").append(queryString).toString();
        }
        return request.getRequestURI();
    }

    /**
     * 获取当前请求的URL里的path（不包含：http、domain和query）
     *
     * @param request
     * @return
     */
    public static String getPath(HttpServletRequest request) {
        return request.getRequestURI();
    }

    /**
     * 获取当前请求的URL里的query（不包含：http、domain和path）
     *
     * @param request
     * @return
     */
    public static String getQuery(HttpServletRequest request) {
        return request.getQueryString();
    }

    /**
     * 获取客户端访问ip
     *
     * @return
     */
    public static String getIpAddr(HttpServletRequest request) {
        if (request == null) {
            return "unknown";
        }
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Forwarded-For");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return "0:0:0:0:0:0:0:1".equals(ip) ? "127.0.0.1" : ip;
    }

    /**
     * 把字符串IPv4转换成long
     *
     * @param ipStr 字符串IP
     * @return IP对应的long值
     */
    public static long ipv42Long(String ipStr) {
        String[] ips = ipStr.split("\\.");
        return (Long.valueOf(ips[0]) << 24)
                + (Long.valueOf(ips[1]) << 16)
                + (Long.valueOf(ips[2]) << 8)
                + Long.valueOf(ips[3]);
    }

    /**
     * 把IPv4的long值转换成字符串
     *
     * @param ipLong IPv4的long值
     * @return long值对应的字符串
     */
    public static String long2Ipv4(long ipLong) {
        return new StringBuilder()
                .append(ipLong >>> 24).append(".")
                .append((ipLong >>> 16) & 0xFF).append(".")
                .append((ipLong >>> 8) & 0xFF).append(".")
                .append(ipLong & 0xFF).toString();
    }

    /**
     * 获取客户端userAgent
     *
     * @param request
     * @return
     */
    public static String getAgent(HttpServletRequest request) {
        return request.getHeader(HttpHeaders.USER_AGENT);
    }

    /**
     * 获取 UserAgent
     *
     * @param request
     * @return User-Agent信息
     */
    public static UserAgent getUserAgent(HttpServletRequest request) {
        return UserAgent.parseUserAgentString(getAgent(request));
    }

    /**
     * 是否是Ajax异步请求
     *
     * @param request
     */
    public static boolean isAjaxRequest(HttpServletRequest request) {
        return "XMLHttpRequest".equalsIgnoreCase(request.getHeader("X-Requested-With"));
    }

    /**
     * URL（UTF-8）编码
     *
     * @param value
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String urlEncode(String value) throws UnsupportedEncodingException {
        return URLEncoder.encode(value, CharsetUtil.UTF_8);
    }

    /**
     * 获取服务器IP地址
     *
     * @return
     */
    public static String getHostIp() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
        }
        return "127.0.0.1";
    }

    /**
     * 获取服务器名称
     *
     * @return
     */
    public static String getHostName() {
        try {
            return InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
        }
        return "未知";
    }

    /**
     * 获取服务器端口
     *
     * @return
     */
    public static Integer getPort() {
        return SpringUtil.getBean(ServerProperties.class).getPort();
    }
}
