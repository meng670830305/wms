/**
 * 在pom.xml文件复制下面的内容。
   <dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
        </dependency>
    </dependencies>
 * 
 * (jp.db.erp2024.mapper)包
 *
 * wangyp Copyright 2006-2023
 * 文件： jp.db.erp2024.mapper.TableMapper.java
 * 项目名称：工程项目管理 
 * 创建时间：2023/11/13
 * 负责人：wangyp
 */

package jp.db.erp2024.mapper;

import org.apache.ibatis.annotations.Param;

/**
 * 表映射Mapper.xml文件的操作
 *
 */
public interface TableMapper<T> extends ViewMapper<T> {

    /**
	 * 插入一条记录
	 * 
	 * @param obj
	 */
	int insert(T obj);
    
    /**
	 * 通过主键删除一条记录
	 * 
	 * @param obj
	 */
    int delete(T obj);
    
	/**
	 * 删除满足条件记录
	 * 
	 * @param where
	 */
	int deleteWhere(@Param("where") String where);

	int update(T obj);
    
    /**
	 * 通过主键查询一条记录
	 * 
	 * @param obj
	 */
	T selectOne(T obj);

}

