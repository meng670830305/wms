package jp.web.erp2024.website.config.security;


import jakarta.servlet.ServletException;
import org.springframework.security.web.session.SessionInformationExpiredEvent;
import org.springframework.security.web.session.SessionInformationExpiredStrategy;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class SessionInformationExpiredStrategyImpl implements SessionInformationExpiredStrategy {

    @Override
    public void onExpiredSessionDetected(SessionInformationExpiredEvent sessionInformationExpiredEvent) throws IOException, ServletException {
        sessionInformationExpiredEvent.getResponse().sendRedirect("/Auth/Login");
    }
}
