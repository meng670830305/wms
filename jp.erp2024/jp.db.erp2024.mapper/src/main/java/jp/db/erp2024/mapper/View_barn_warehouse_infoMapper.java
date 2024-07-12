/**
 * 在pom.xml文件复制下面的内容。
     <dependencies>
        <dependency>
            <groupId>jp.db</groupId>
            <artifactId>jp.db.erp2024.pojo</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
        </dependency>
    </dependencies>
 * 
 * 数据访问层(jp.db.erp2024.mapper)包
 *
 * wangyp Copyright 2006-2023
 * 文件:        View_barn_warehouse_infoMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/15
 * 负责人:      wangyp
 */


package jp.db.erp2024.mapper;

import jp.db.erp2024.pojo.View_barn_warehouse_info;

/**
 * Mybatis数据访问层View_barn_warehouse_info类型
 */
//@org.apache.ibatis.annotations.Mapper
//@org.springframework.stereotype.Repository
public interface View_barn_warehouse_infoMapper extends ViewMapper< View_barn_warehouse_info >
{
   
}