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
 * 文件:        Barn_infoMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/13
 * 负责人:      wangyp
 */

package jp.db.erp2024.service;

import jakarta.annotation.Resource;
//import org.springframework.beans.factory.annotation.Autowired;
import jp.db.erp2024.pojo.Warehouse_info;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import jp.db.erp2024.pojo.Barn_info;
import jp.db.erp2024.mapper.Barn_infoMapper;

import java.util.ArrayList;
import java.util.List;

/**
 * Mybatis业务逻辑层Barn_infoService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("barn_infoService")
public class Barn_infoService {
    public Barn_infoService() {
    }

    //@Autowired
    @Resource
    private Barn_infoMapper barn_infoMapper;

    public boolean createBarnInfo(Barn_info barnInfo) throws Exception {
        boolean result = false;
        if (barnInfo == null) {
            throw new NullPointerException("createBarnInfo(Barn_info barnInfo)中的barnInfo对象为null.");
        }
        if (null == barnInfo.getWarehouse_id()) {
            throw new IllegalArgumentException("倉庫番号を空にすることはできません!");
        }
        if (StringUtils.isBlank(barnInfo.getName())) {
            throw new IllegalArgumentException("倉庫区域名前を空にすることはできません!");
        }
        if (StringUtils.isBlank(barnInfo.getDescription())) {
            throw new IllegalArgumentException("倉庫区域ノートを空にすることはできません!");
        }
        if (null == barnInfo.getSort()) {
            throw new IllegalArgumentException("倉庫区域順番を空にすることはできません!");
        }
        if (null == barnInfo.getState()) {
            throw new IllegalArgumentException("倉庫区域状態を空にすることはできません!");
        }

        String WHERE = "%s='%s'";
        String where = String.format(WHERE, Barn_info._NAME_, barnInfo.getName());
        if (this.barn_infoMapper.selectCount(where) > 0) {
            throw new IllegalArgumentException("倉庫区域名前は以前に使用されています。再入力してください!");
        }
        result = this.barn_infoMapper.insert(barnInfo) == 1;
        result = barnInfo.getId() > 0;
        return result;
    }

    public Barn_info getBarnInfo(Integer id) throws Exception {
        Barn_info obj = new Barn_info();
        obj.setId(id);
        return this.barn_infoMapper.selectOne(obj);
    }

    public void updateBarnInfo(Barn_info barnInfo) {
        if (barnInfo == null) {
            throw new NullPointerException("updatebarnInfo(Barn_info barnInfo)中的barnInfo对象为null.");
        }
        if (null == barnInfo.getId()) {
            throw new IllegalArgumentException("倉庫区域番号を空にすることはできません!");
        }
        if (null == barnInfo.getWarehouse_id()) {
            throw new IllegalArgumentException("倉庫番号を空にすることはできません!");
        }
        if (StringUtils.isBlank(barnInfo.getName())) {
            throw new IllegalArgumentException("倉庫区域名前を空にすることはできません!");
        }
        if (StringUtils.isBlank(barnInfo.getDescription())) {
            throw new IllegalArgumentException("倉庫区域ノートを空にすることはできません!");
        }
        if (null == barnInfo.getSort()) {
            throw new IllegalArgumentException("倉庫区域順番を空にすることはできません!");
        }
        if (null == barnInfo.getState()) {
            throw new IllegalArgumentException("倉庫区域状態を空にすることはできません!");
        }
        String where = String.format("%s<>%s AND %s='%s'", Barn_info._ID_, barnInfo.getId(), Barn_info._NAME_, barnInfo.getName());
        List<Barn_info> barnInfoList = this.barn_infoMapper.selectWhere(where);
        if (barnInfoList.isEmpty()) {
            this.barn_infoMapper.update(barnInfo);
        } else {
            throw new IllegalArgumentException(String.format("倉庫区域名前「%s」の他のレコードがすでに存在します!", barnInfo.getName()));
        }
    }

    public void deleteBarnInfo(Integer id, Integer state) {
        Barn_info obj = new Barn_info();
        obj.setId(id);
        obj = this.barn_infoMapper.selectOne(obj);
        if (obj != null) {
            obj.setState(state);
            this.barn_infoMapper.update(obj);
        } else {
            throw new IllegalArgumentException(String.format("倉庫区域番号「%s」が存在していない!", id));
        }
    }

    public List<Barn_info> getBarnInfoList(Integer wareHouseInfoId, Integer state) {
        List<String> list = new ArrayList<>(2);
        list.add(String.format("%s='%s'", Barn_info._WAREHOUSE_ID_, wareHouseInfoId));
        list.add(String.format("%s='%s'", Barn_info._STATE_, state));
        String where = StringUtils.join(list, " AND ");
        return this.barn_infoMapper.selectWhere(where);
    }
}
