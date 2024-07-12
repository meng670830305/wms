package jp.web.erp2024.website.config.servlet;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jp.web.erp2024.website.config.converter.LocalDateConverter;
import jp.web.erp2024.website.config.converter.LocalDateTimeConverter;
import jp.web.erp2024.website.config.converter.StringArrayConcatConverter;
import org.apache.commons.beanutils.ConvertUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;


//@ServletComponentScan(basePackageClasses = InitHttpServletExtend.class)
@WebServlet(name = "InitHttpServlet", asyncSupported = true, loadOnStartup = 0, urlPatterns = "/")
public class InitHttpServletExtend extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        ConvertUtils.register(new LocalDateConverter(), LocalDate.class);
        ConvertUtils.register(new LocalDateTimeConverter(), LocalDateTime.class);
        ConvertUtils.register(new StringArrayConcatConverter(), String[].class);
    }
}