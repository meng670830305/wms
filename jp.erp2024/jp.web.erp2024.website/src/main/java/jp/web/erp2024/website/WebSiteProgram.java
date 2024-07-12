package jp.web.erp2024.website;

import jp.web.erp2024.website.config.servlet.InitHttpServletExtend;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@MapperScan(
        basePackages = {
                "jp.db.erp2024.mapper"
        }
)
@SpringBootApplication(
        proxyBeanMethods = false,
        //②
        scanBasePackages = {
                "jp.web.erp2024.website"
                , "jp.db.erp2024.service"
        }
)
@EnableTransactionManagement(proxyTargetClass = true)
@ServletComponentScan(
        basePackageClasses = {
                InitHttpServletExtend.class
        }
)
public class WebSiteProgram {

    public static void main(String[] args) {
        SpringApplication.run(WebSiteProgram.class, args);
    }

}
