package jp.web.erp2024.website.controller;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jp.db.erp2024.service.Account_userService;
import jp.web.erp2024.website.config.security.AuthUser;
import jp.web.erp2024.website.config.util.SecurityUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.DeprecatedConfigurationProperty;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(AuthController.CONTROLLER_NAME)
public class AuthController extends BaseController {

    public static final String CONTROLLER_NAME = "/Auth";

    @Override
    protected String getViewName(String viewName) {
        return super.getFullViewName(CONTROLLER_NAME, viewName);
    }

    @Value("${WEB_SITE_NAME}")
    private String WEB_SITE_NAME;

    @Resource
    private Account_userService account_userService;

    /**
     * 自定义登录操作
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    //@RequestMapping(value = "Login", method = RequestMethod.GET)
    @GetMapping(value = "Login")
    public ModelAndView login(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String ipAdressString = this.getIpAddr(request);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("WEB_SITE_NAME", WEB_SITE_NAME);
        map.put("IP_ADDRESS", ipAdressString);
        String message = null;
        String error = StringUtils.join(request.getParameterMap().keySet().toArray());
        if ("usrnot".equalsIgnoreCase(error)) {
            message = "用户名不存在";
        } else if ("pwdcred".equalsIgnoreCase(error)) {
            message = "用户名和密码不匹配";
        } else {
            message = error;
        }
        map.put("MESSAGE", message);
        return new ModelAndView(this.getViewName("Login"), map);
    }

    private String getIpAddr(HttpServletRequest request) {
        String ipAddress = null;
        try {
            ipAddress = request.getHeader("x-forwarded-for");
            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getHeader("Proxy-Client-IP");
            }
            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getHeader("WL-Proxy-Client-IP");
            }
            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getRemoteAddr();
                if (ipAddress.equals("127.0.0.1")) {
                    // 根据网卡取本机配置的IP
                    InetAddress inet = null;
                    try {
                        inet = InetAddress.getLocalHost();
                    } catch (UnknownHostException e) {
                        e.printStackTrace();
                    }
                    ipAddress = inet.getHostAddress();
                }
            }
            // 对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
            if (ipAddress != null && ipAddress.length() > 15) { // "***.***.***.***".length()
                // = 15
                if (ipAddress.indexOf(",") > 0) {
                    ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
                }
            }
        } catch (Exception e) {
            ipAddress = "";
        }

        return ipAddress;
    }

    @Deprecated
    @DeprecatedConfigurationProperty(reason = "Logout操作从Spring Security里面出")
    @RequestMapping("Logout")
    public void logout(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
    }

    @RequestMapping(value = "ChangePassword", method = RequestMethod.GET)
    public ModelAndView changePassword(HttpServletRequest request, HttpServletResponse response) {
        return new ModelAndView(this.getViewName("ChangePassword"));
    }

    @RequestMapping(value = "ChangePasswordSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String changePasswordSave(@RequestParam("oldPassword") String oldPassword, @RequestParam("newPassword") String newPassword) throws Exception {
        AuthUser accountUser = SecurityUtil.getLoginUser();
        try {
            this.account_userService.changePassword(accountUser.getID(), oldPassword, newPassword);
        } catch (Exception e) {
            return super.getError(600, e.getMessage());
        }
        return super.getSuccess("修改密码成功，请重新登录！");
    }

}
