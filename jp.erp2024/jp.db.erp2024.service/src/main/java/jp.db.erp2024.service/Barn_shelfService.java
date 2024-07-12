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
 * 文件:        Barn_shelfMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/13
 * 负责人:      wangyp
 */

package jp.db.erp2024.service;

import jakarta.annotation.Resource;
//import org.springframework.beans.factory.annotation.Autowired;
import jp.com.helper.ArrayHelper;
import jp.com.helper.Lambda;
import org.springframework.stereotype.Component;

import jp.db.erp2024.pojo.Barn_shelf;
import jp.db.erp2024.mapper.Barn_shelfMapper;

import java.util.List;

/**
 * Mybatis业务逻辑层Barn_shelfService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("barn_shelfService")
public class Barn_shelfService {
    public Barn_shelfService() {
    }

    //@Autowired
    @Resource
    private Barn_shelfMapper barn_shelfMapper;

    public void save(List<Barn_shelf> barnShelfList, Integer state) {
        //this.barn_shelfMapper.
        if (!barnShelfList.isEmpty()) {
            String where = String.format("%s=%s", Barn_shelf._BARN_ID_, Lambda.first(barnShelfList).getBarn_id());
            List<Barn_shelf> barnShelfDBList = this.barn_shelfMapper.selectWhere(where);
            List<Barn_shelf> oldShelfDBList = Lambda.where(barnShelfDBList, item -> !Lambda.contains(barnShelfList, arg -> item.getId().equals(arg.getId())));
            for (Barn_shelf barnShelf : oldShelfDBList) {
                barnShelf.setState(state);
                this.barn_shelfMapper.update(barnShelf);
            }
            Integer zero = Integer.valueOf(0);
            for (Barn_shelf barnShelf : barnShelfList) {
                if (zero.equals(barnShelf.getId())) {
                    this.barn_shelfMapper.insert(barnShelf);
                } else {
                    this.barn_shelfMapper.update(barnShelf);
                }
            }
        }
    }
}
