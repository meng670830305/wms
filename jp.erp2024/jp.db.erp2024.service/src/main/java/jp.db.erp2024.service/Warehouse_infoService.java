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
 * 文件:        Warehouse_infoMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/13
 * 负责人:      wangyp
 */

package jp.db.erp2024.service;

import jakarta.annotation.Resource;
import jp.db.erp2024.mapper.Warehouse_infoMapper;
import jp.db.erp2024.pojo.Warehouse_info;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.TimeoutException;

/**
 * Mybatis业务逻辑层Warehouse_infoService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("warehouse_infoService")
public class Warehouse_infoService {
    public Warehouse_infoService() {
    }

    //@Autowired
    @Resource
    private Warehouse_infoMapper warehouse_infoMapper;

    public boolean createWarehouseInfo(Warehouse_info warehouseInfo) throws Exception {
        boolean result = false;
        if (warehouseInfo == null) {
            throw new NullPointerException("createWarehouseInfo(Warehouse_info warehouseInfo)中的warehouseInfo对象为null.");
        }
        if (StringUtils.isBlank(warehouseInfo.getName())) {
            throw new IllegalArgumentException("倉庫名前を空にすることはできません!");
        }
        if (StringUtils.isBlank(warehouseInfo.getDescription())) {
            throw new IllegalArgumentException("倉庫ノートを空にすることはできません!");
        }
        if (null == warehouseInfo.getSort()) {
            throw new IllegalArgumentException("倉庫順番を空にすることはできません!");
        }
        if (null == warehouseInfo.getState()) {
            throw new IllegalArgumentException("倉庫状態を空にすることはできません!");
        }
        final String WHERE = "%s='%s'";
        String where = String.format(WHERE, Warehouse_info._NAME_, warehouseInfo.getName());
        if (this.warehouse_infoMapper.selectCount(where) > 0) {
            throw new IllegalArgumentException("倉庫名前は以前に使用されています。再入力してください!");
        }
        warehouseInfo.setRegion_id(Integer.valueOf(0));//default value
        result = this.warehouse_infoMapper.insert(warehouseInfo) == 1;
        result = warehouseInfo.getId() > 0;
        return result;
    }

    public Warehouse_info getWarehouseInfo(Integer id) throws Exception {
        Warehouse_info obj = new Warehouse_info();
        obj.setId(id);
        return this.warehouse_infoMapper.selectOne(obj);
    }

    public void updateWarehouseInfo(Warehouse_info warehouseInfo) {
        if (warehouseInfo == null) {
            throw new NullPointerException("updateWarehouseInfo(Warehouse_info warehouseInfo)中的warehouseInfo对象为null.");
        }
        if (null == warehouseInfo.getId()) {
            throw new IllegalArgumentException("倉庫番号を空にすることはできません!");
        }
        if (StringUtils.isBlank(warehouseInfo.getName())) {
            throw new IllegalArgumentException("倉庫名前を空にすることはできません!");
        }
        if (StringUtils.isBlank(warehouseInfo.getDescription())) {
            throw new IllegalArgumentException("倉庫ノートを空にすることはできません!");
        }
        if (null == warehouseInfo.getSort()) {
            throw new IllegalArgumentException("倉庫順番を空にすることはできません!");
        }
        if (null == warehouseInfo.getState()) {
            throw new IllegalArgumentException("倉庫状態を空にすることはできません!");
        }
        String where = String.format("%s<>%s AND %s='%s'", Warehouse_info._ID_, warehouseInfo.getId(), Warehouse_info._NAME_, warehouseInfo.getName());
        List<Warehouse_info> warehouseInfoList = this.warehouse_infoMapper.selectWhere(where);
        if (warehouseInfoList.isEmpty()) {
            this.warehouse_infoMapper.update(warehouseInfo);
        } else {
            throw new IllegalArgumentException(String.format("倉庫名前「%s」の他のレコードがすでに存在します!", warehouseInfo.getName()));
        }
    }

    public void deleteWareHouseInfo(Integer id, Integer state) {
        Warehouse_info obj = new Warehouse_info();
        obj.setId(id);
        obj = this.warehouse_infoMapper.selectOne(obj);
        if (obj != null) {
            obj.setState(state);
            this.warehouse_infoMapper.update(obj);
        } else {
            throw new IllegalArgumentException(String.format("倉庫番号「%s」が存在していない!", id));
        }
    }

    public List<Warehouse_info> getWareHouseInfoAll(Integer state) {
        String where = String.format("%s='%s'", Warehouse_info._STATE_, state);
        return this.warehouse_infoMapper.selectWhere(where);
    }
}
