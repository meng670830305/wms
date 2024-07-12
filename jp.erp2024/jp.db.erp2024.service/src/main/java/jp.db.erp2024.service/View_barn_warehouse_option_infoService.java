/**
 * 在pom.xml文件复制下面的内容。
 * <dependencies>
 * <dependency>
 * <groupId>org.springframework.boot</groupId>
 * <artifactId>spring-boot-starter</artifactId>
 * </dependency>
 * <dependency>
 * <groupId>jp.db</groupId>
 * <artifactId>jp.db.erp2024.pojo</artifactId>
 * <version>${project.version}</version>
 * </dependency>
 * <dependency>
 * <groupId>jp.db</groupId>
 * <artifactId>jp.db.erp2024.mapper</artifactId>
 * <version>${project.version}</version>
 * </dependency>
 * <dependency>
 * <groupId>jp.com</groupId>
 * <artifactId>jp.com.helper</artifactId>
 * <version>${project.version}</version>
 * </dependency>
 * </dependencies>
 * <p>
 * 业务逻辑层(jp.db.erp2024.service)包
 * <p>
 * wangyp Copyright 2006-2023
 * 文件:        View_barn_warehouse_option_infoMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/17
 * 负责人:      wangyp
 */


package jp.db.erp2024.service;

import jakarta.annotation.Resource;
import jp.com.helper.Lambda;
import jp.db.erp2024.mapper.View_barn_warehouse_option_infoMapper;
import jp.db.erp2024.pojo.View_barn_warehouse_option_info;
import org.springframework.stereotype.Component;

/**
 * Mybatis业务逻辑View_barn_warehouse_option_infoService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("view_barn_warehouse_option_infoService")
public class View_barn_warehouse_option_infoService {
    public View_barn_warehouse_option_infoService() {
    }

    //@Autowired
    @Resource
    private View_barn_warehouse_option_infoMapper view_barn_warehouse_option_infoMapper;

    public View_barn_warehouse_option_info getViewBarnOption(Integer optionId) throws Exception {
        String where = String.format("%s=%s", View_barn_warehouse_option_info._ID_, optionId);
        return Lambda.first(this.view_barn_warehouse_option_infoMapper.selectWhere(where));
    }
}
