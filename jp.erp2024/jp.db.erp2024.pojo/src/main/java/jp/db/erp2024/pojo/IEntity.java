/**
 * 实体(jp.db.erp2024.dao)项目
 *
 * wangyp Copyright 2006-2023
 * 文件:        IEntity.cs
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/13
 * 负责人:      wangyp
 */
package jp.db.erp2024.pojo;
/**
 * 踏浪者实体类公共接口，用来记录表操作的痕迹
 */
public interface IEntity
{
    /**
      * 设置创建时间
      */
    void setCreatetime(java.time.LocalDateTime value);
    /**
      * 获取创建时间
      */
    java.time.LocalDateTime getCreatetime();
    /**
      * 设置创建用户
      */
    void setCreateusername(String value);
    /**
      * 获取创建用户
      */
    String getCreateusername();
    /**
      * 设置更新时间
      */
    void setUpdatetime(java.time.LocalDateTime value);
    /**
      * 获取更新时间
      */
    java.time.LocalDateTime getUpdatetime();
    /**
      * 设置更新用户
      */
    void setUpdateusername(String value);
    /**
      * 获取更新用户
      */
    String getUpdateusername();
}
