package jp.web.erp2024.webapi;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@MapperScan(
        basePackages = {
                "jp.db.erp2024.mapper"
        }
)
@SpringBootApplication(
        proxyBeanMethods = false,
        //②
        scanBasePackages = {
                "jp.web.erp2024.webapi"
                , "jp.db.erp2024.service"
        }
)
public class WebApiProgram {

    public static void main(String[] args) {
        SpringApplication.run(WebApiProgram.class, args);
    }

}
