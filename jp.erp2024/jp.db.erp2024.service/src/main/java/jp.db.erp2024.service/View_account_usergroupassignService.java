/**
 * 在pom.xml文件复制下面的内容。
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.2.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
     <dependencies>
        <!--@Transactional-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
        </dependency>
        <!--@Component-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
        </dependency>
        <dependency>
            <groupId>jp.db.erp2024</groupId>
            <artifactId>jp.db.erp2024.pojo</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>jp.db.erp2024</groupId>
            <artifactId>jp.db.erp2024.mapper</artifactId>
            <version>${project.version}</version>
        </dependency>
    </dependencies>
 * 
 * 业务逻辑层(jp.db.erp2024.service)包
 *
 * wangyp Copyright 2006-2023
 * 文件:        View_account_usergroupassignMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/8
 * 负责人:      wangyp
 */


package jp.db.erp2024.service;

import jakarta.annotation.Resource;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jp.db.erp2024.pojo.View_account_usergroupassign;
import jp.db.erp2024.mapper.View_account_usergroupassignMapper;

/**
 * Mybatis业务逻辑View_account_usergroupassignService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("view_account_usergroupassignService")
public class View_account_usergroupassignService
{
    public View_account_usergroupassignService()
    {
    }
    
    //@Autowired
    @Resource
	private View_account_usergroupassignMapper view_account_usergroupassignMapper;
}
