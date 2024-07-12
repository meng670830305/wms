package jp.web.erp2024.website.config.security;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthenticationFailureHandlerImpl implements AuthenticationFailureHandler {

    public AuthenticationFailureHandlerImpl() {
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        if (e instanceof BadCredentialsException) {
            httpServletResponse.sendRedirect("/Auth/Login?pwdcred");
        } else if (e instanceof UsernameNotFoundException) {
            httpServletResponse.sendRedirect("/Auth/Login?usrnot");
        } else if (e instanceof DisabledException) {
            httpServletResponse.sendRedirect("/Auth/Login?disabled");
        } else if (e instanceof AccountExpiredException) {
            httpServletResponse.sendRedirect("/Auth/Login?expired");
        } else if (e instanceof LockedException) {
            httpServletResponse.sendRedirect("/Auth/Login?locked");
        } else {
            httpServletResponse.sendRedirect("/Auth/Login?error");
        }
    }
}
