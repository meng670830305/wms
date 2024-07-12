package jp.web.erp2024.website.config.error;


import com.alibaba.fastjson2.JSONException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jp.com.helper.LoggerHelper;
import jp.com.module.JsonManager;
import jp.web.erp2024.website.config.util.WebUtil;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.servlet.view.AbstractView;

import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

public class ExceptionView extends AbstractView {

    private final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    @Override
    protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (WebUtil.isAjaxRequest(request)) {
            //ajax
            Object object = model.get("exception");
            if (object instanceof Exception) {
                Exception exception = (Exception) object;
                String exceptionMsg = null;
                if (exception instanceof AccountExpiredException || exception instanceof AuthenticationServiceException) {
                    exceptionMsg = JsonManager.getError(HttpServletResponse.SC_UNAUTHORIZED, "登录失效,请重新登录.");
                } else if (exception instanceof UsernameNotFoundException) {
                    exceptionMsg = JsonManager.getError(HttpServletResponse.SC_UNAUTHORIZED, "登录账号有误.");
                } else if (exception instanceof InvocationTargetException) {
                    Throwable targetException = ((InvocationTargetException) exception).getTargetException();
                    if (targetException instanceof RuntimeException) {
                        exceptionMsg = JsonManager.getError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, (RuntimeException) targetException);
                    } else if (targetException instanceof Error) {
                        exceptionMsg = JsonManager.getError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, (Error) targetException);
                    } else if (targetException instanceof Exception) {
                        exceptionMsg = JsonManager.getError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, (Exception) targetException);
                    }
                } else if (exception instanceof JSONException) {
                    exceptionMsg = JsonManager.getError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "JSON序列化出错", (JSONException) exception);
                } else {
                    exceptionMsg = JsonManager.getError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, exception);
                }
                response.setContentType(APPLICATION_JSON_UTF8_VALUE);
                response.setStatus(HttpServletResponse.SC_OK);
                try (Writer writer = response.getWriter()) {
                    writer.write(exceptionMsg.replace("\r\n", "<br/>"));
                } catch (IOException e) {
                    LoggerHelper.error(this.logger, e, "ExceptionView.renderMergedOutputModel()出错了!");
                }
            }
        }
    }

}
