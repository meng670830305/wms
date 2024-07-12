package jp.web.erp2024.website.config.error;


import jp.web.erp2024.website.config.security.AuthUser;
import jp.web.erp2024.website.config.util.SecurityUtil;
import jp.web.erp2024.website.config.util.SpringUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@Component
public class ExceptionErrorAttributes extends DefaultErrorAttributes {

    private final String company;

    public ExceptionErrorAttributes() {
        this.company = SpringUtil.getProperty("COMPANY_NAME");
    }

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
        //options = options.including(ErrorAttributeOptions.Include.STACK_TRACE, ErrorAttributeOptions.Include.MESSAGE, ErrorAttributeOptions.Include.BINDING_ERRORS);//改从配置文件里出，server.error.include-message=always
        Map<String, Object> map = super.getErrorAttributes(webRequest, options);
        map.put("company", this.company);
        String author;
        AuthUser authUser = SecurityUtil.getLoginUser();
        if (authUser == null) {
            author = null;
        } else {
            author = authUser.getRealName();
        }
        map.put("author", author);
        Object object = webRequest.getAttribute("exception", RequestAttributes.SCOPE_REQUEST);
        if (object instanceof Exception) {
            Exception exception = (Exception) object;
            String message = exception.getMessage();
            if (StringUtils.isEmpty(message)) {
                message = exception.toString();
            }
            map.put("message", message);
            StackTraceElement[] stackTraceElements = exception.getStackTrace();
            map.put("stackTrace", StringUtils.join(stackTraceElements, "<br/>"));
            map.put("exception", exception);
        }
        return map;
    }
}
