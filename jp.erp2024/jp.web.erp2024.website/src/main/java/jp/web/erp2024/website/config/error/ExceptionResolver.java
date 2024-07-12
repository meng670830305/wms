package jp.web.erp2024.website.config.error;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jp.com.helper.LoggerHelper;
import jp.web.erp2024.website.config.exception.DBDataException;
import jp.web.erp2024.website.config.security.AuthUser;
import jp.web.erp2024.website.config.util.ExUtil;
import jp.web.erp2024.website.config.util.SecurityUtil;
import jp.web.erp2024.website.config.util.SpringUtil;
import jp.web.erp2024.website.config.util.WebUtil;
import jp.web.erp2024.website.service.MailService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.TemplateEngine;

import java.util.HashMap;
import java.util.Map;

public class ExceptionResolver implements HandlerExceptionResolver {
    /**
     * Logger for this class
     */
    private final Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    private String companyName;

    private final String subject;

    private final String to;

    private final MailService mailService;

    private TemplateEngine templateEngine;

    public ExceptionResolver(MailService mailService) {
        this.to = SpringUtil.getProperty("spring.mail.from");
        this.mailService = mailService;
        this.companyName = SpringUtil.getProperty("COMPANY_NAME");
        this.subject = String.format("「%s」ＥＲＰプログラムエラーインフォ", this.companyName);
    }

    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception exception) {
        ExUtil.resetStackTrace(exception);
        String pathAndQuery = WebUtil.getPathAndQuery(request);
        LoggerHelper.error(this.logger, exception, this.subject + String.format("，ERROR URL: %s", pathAndQuery));
        Map<String, Object> map = new HashMap<>(8);
        map.put("company", this.companyName);
        String author;
        AuthUser authUser = SecurityUtil.getLoginUser();
        if (authUser == null) {
            author = null;
        } else {
            author = authUser.getRealName();
        }
        map.put("author", author);
        map.put("path", pathAndQuery);
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        map.put("status", status.value());
        map.put("error", status.getReasonPhrase());
        String message = exception.getMessage();
        if (StringUtils.isEmpty(message)) {
            message = exception.toString();
        }
        map.put("message", message);
        map.put("stackTrace", StringUtils.join(exception.getStackTrace(), "<br/>"));
        map.put("exception", exception);

        if (this.templateEngine == null) {
            this.templateEngine = SpringUtil.getBean(TemplateEngine.class);
        }

        this.mailService.sendThymeleafMail(this.templateEngine, this.to, this.subject, "error/temp.html", map);

        if (WebUtil.isAjaxRequest(request)) {
            //ajax
            return new ModelAndView("exceptionView", "exception", exception);
        } else {
            //浏览器
            if (exception instanceof DBDataException) {
                //用户未登录
                return new ModelAndView("redirect:/Auth/Login");
            } else {
                for (Map.Entry<String, Object> entry : map.entrySet()) {
                    request.setAttribute(entry.getKey(), entry.getValue());
                }
                //错误页
                return new ModelAndView("forward:/error/5xx");
            }
        }
    }

}