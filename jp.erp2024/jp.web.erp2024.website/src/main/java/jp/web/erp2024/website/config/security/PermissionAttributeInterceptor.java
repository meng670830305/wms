package jp.web.erp2024.website.config.security;


import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jp.web.erp2024.website.config.util.SecurityUtil;
import jp.web.erp2024.website.config.util.WebUtil;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class PermissionAttributeInterceptor implements HandlerInterceptor {

    @Resource
    private PermissionContext permissionContext;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (SecurityUtil.getLoginUser() == null) {
            //没有登录
            response.sendRedirect("/Auth/Login");
            return false;
        }
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            String controllerName = handlerMethod.getBeanType().getSimpleName().replace("Controller", "");
            String actionName = handlerMethod.getMethod().getName();
            final String mSG = String.format("残念，「%s.%s」このアクセス権限がありません。", controllerName, actionName);
            UnpermissionAttribute unpermissionAttribute = handlerMethod.getMethodAnnotation(UnpermissionAttribute.class);
            if (unpermissionAttribute != null) {
                String[] unpermissions = unpermissionAttribute.value();
                if (ArrayUtils.getLength(unpermissions) == 0) {
                    return true;
                } else if (this.permissionContext.hasPermission(unpermissions)) {
                    AccessDeniedException accessDeniedException = new AccessDeniedException(mSG);
                    if (WebUtil.isAjaxRequest(request)) {
                        throw accessDeniedException;
                    } else {
                        response.sendError(HttpServletResponse.SC_FORBIDDEN, accessDeniedException.getMessage());
                        return false;
                    }
                }
            }
            PermissionAttribute permissionAttribute = handlerMethod.getMethodAnnotation(PermissionAttribute.class);
            if (permissionAttribute == null) {
                return true;
            }
            String[] permissions = permissionAttribute.value();
            if (ArrayUtils.getLength(permissions) == 0 || this.permissionContext.hasPermission(permissions)) {
                return true;
            } else {
                AccessDeniedException accessDeniedException = new AccessDeniedException(mSG);
                if (WebUtil.isAjaxRequest(request)) {
                    throw accessDeniedException;
                } else {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, accessDeniedException.getMessage());
                    return false;
                }
            }
        }
        return true;
    }
}
