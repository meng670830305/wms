package jp.web.erp2024.website.config.error;

import com.alibaba.fastjson2.JSONException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jp.web.erp2024.website.config.util.WebUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import java.lang.reflect.InvocationTargetException;

@ControllerAdvice
public class ExceptionControllerAdvice {

    private final org.slf4j.Logger _logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ModelAndView APIExceptionHandler(HttpServletRequest request, HttpServletResponse response, Exception exception) {
        if (exception instanceof AccountExpiredException || exception instanceof AuthenticationServiceException) {
            this._logger.debug("身份验证失败", exception);
        } else if (exception instanceof UsernameNotFoundException) {
            this._logger.info(exception.getMessage(), exception);
        } else if (exception instanceof NullPointerException) {
            this._logger.error("空指针异常", ((NullPointerException) exception).getMessage());
        } else if (exception instanceof MissingServletRequestParameterException) {
            this._logger.error("缺少必要的请求参数", ((MissingServletRequestParameterException) exception).getMessage());
        } else if (exception instanceof MethodArgumentNotValidException) {
            ObjectError objectError = ((MethodArgumentNotValidException) exception).getBindingResult().getAllErrors().get(0);
            this._logger.error("调用方法参数无效", objectError.getDefaultMessage());
        } else if (exception instanceof InvocationTargetException) {
            Throwable targetException = ((InvocationTargetException) exception).getTargetException();
            if (targetException instanceof RuntimeException) {
                this._logger.error("网站错误信息", (RuntimeException) targetException);
            } else if (targetException instanceof Error) {
                this._logger.error("网站错误信息", (Error) targetException);
            } else if (targetException instanceof Exception) {
                this._logger.error("网站错误信息", (Exception) targetException);
            } else {
                this._logger.error("网站错误信息", targetException);
            }
        } else if (exception instanceof JSONException) {
            this._logger.error("JSON序列化出错", (JSONException) exception);
        } else {
            this._logger.error("网站错误信息", exception);
        }
        if (WebUtil.isAjaxRequest(request)) {
            //ajax
            return new ModelAndView("exceptionView", "exception", exception);
        } else {
            //浏览器
            request.setAttribute("exception", exception);
            return new ModelAndView("forword:/error");
        }
    }

}
