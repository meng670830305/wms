package jp.web.erp2024.website.config.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jp.com.helper.LoggerHelper;
import jp.web.erp2024.website.config.util.CookieUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthenticationSuccessHandlerImpl implements AuthenticationSuccessHandler {

    private final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    public AuthenticationSuccessHandlerImpl() {
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();
        if (principal instanceof AuthUser) {
            AuthUser authUser = ((AuthUser) principal);
            CookieUtil.setCookie(httpServletResponse, "authID", authUser.getID().toString());
            LoggerHelper.info(this.logger, "UserName: {}, login success", authUser.getRealName());
        }
        httpServletResponse.sendRedirect("/Home/Index");
    }
}
