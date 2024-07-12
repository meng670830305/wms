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
 * 文件： jp.db.erp2024.mapper.ViewMapper.java
 * 项目名称：工程项目管理 
 * 创建时间：2023/11/13
 * 负责人：wangyp
 */

package jp.db.erp2024.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Param;

/**
 * 视图映射Mapper.xml文件的操作
 * 
 */
public interface ViewMapper<T> {

	/**
	 * 查询全部
	 * 
	 * @return
	 */
	List<T> selectAll();
    
	/**
	 * 条件查询
	 * 
	 * @param where
	 * @return
	 */
	List<T> selectWhere(@Param("where") String where);

    /**
	 * 查询全部（支持排序）
	 * 
	 * @param orderBy
	 * @return
	 */
	List<T> selectSort(@Param("orderBy") String orderBy);

	/**
	 * 分页查询
	 * 
	 * @param offset
     *          (pageIndex - 1) * pageSize
	 * @param pagesize
	 * @param where
	 * @param orderBy
	 * @return
	 */
	List<T> selectPage(@Param("offset") int offset, @Param("pagesize") int pagesize, @Param("where") String where, @Param("orderBy") String orderBy);
    
	/**
	 * 查询满足条件的记录数
	 * 
	 * @param where
	 * @return
	 */
	int selectCount(@Param("where") String where);

}
