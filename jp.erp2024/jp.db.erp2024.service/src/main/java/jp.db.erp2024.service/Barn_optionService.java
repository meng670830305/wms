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
 * 文件:        Barn_optionMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/13
 * 负责人:      wangyp
 */

package jp.db.erp2024.service;

import jakarta.annotation.Resource;
//import org.springframework.beans.factory.annotation.Autowired;
import jp.db.erp2024.pojo.Barn_info;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import jp.db.erp2024.pojo.Barn_option;
import jp.db.erp2024.mapper.Barn_optionMapper;

import java.util.ArrayList;
import java.util.List;

/**
 * Mybatis业务逻辑层Barn_optionService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("barn_optionService")
public class Barn_optionService {
    public Barn_optionService() {
    }

    //@Autowired
    @Resource
    private Barn_optionMapper barn_optionMapper;

    public boolean createBarnOption(Barn_option barnOption) {
        boolean result = false;
        if (barnOption == null) {
            throw new NullPointerException("createBarnOption(Barn_option barnOption)中的barnOption对象为null.");
        }
        if (null == barnOption.getBarn_id()) {
            throw new IllegalArgumentException("倉庫区域番号を空にすることはできません!");
        }
        if (StringUtils.isBlank(barnOption.getName())) {
            throw new IllegalArgumentException("倉庫区域オプション名を空にすることはできません!");
        }
        if (StringUtils.isBlank(barnOption.getValues())) {
            throw new IllegalArgumentException("倉庫区域オプション値を空にすることはできません!");
        }
        if (null == barnOption.getSort()) {
            throw new IllegalArgumentException("倉庫区域オプション順番を空にすることはできません!");
        }
        if (null == barnOption.getState()) {
            throw new IllegalArgumentException("倉庫区域オプション状態を空にすることはできません!");
        }
        String WHERE = "%s='%s'";
        List<String> list = new ArrayList<>(2);
        list.add(String.format(WHERE, Barn_option._BARN_ID_, barnOption.getBarn_id()));
        list.add(String.format(WHERE, Barn_option._NAME_, barnOption.getName()));
        String where = StringUtils.join(list, " AND ");
        if (this.barn_optionMapper.selectCount(where) > 0) {
            throw new IllegalArgumentException("倉庫区域オプション名は以前に使用されています。再入力してください!");
        }
        result = this.barn_optionMapper.insert(barnOption) == 1;
        result = barnOption.getId() > 0;
        return result;
    }

    public Barn_option getBarnOption(Integer id) throws Exception {
        Barn_option obj = new Barn_option();
        obj.setId(id);
        return this.barn_optionMapper.selectOne(obj);
    }

    public void updateBarnOption(Barn_option barnOption) {
        if (barnOption == null) {
            throw new NullPointerException("updateBarnOption(Barn_option barnOption)中的barnOption对象为null.");
        }
        if (null == barnOption.getId()) {
            throw new IllegalArgumentException("倉庫区域オプション番号を空にすることはできません!");
        }
        if (null == barnOption.getBarn_id()) {
            throw new IllegalArgumentException("倉庫区域番号を空にすることはできません!");
        }
        if (StringUtils.isBlank(barnOption.getName())) {
            throw new IllegalArgumentException("倉庫区域オプション名を空にすることはできません!");
        }
        if (StringUtils.isBlank(barnOption.getValues())) {
            throw new IllegalArgumentException("倉庫区域オプション値を空にすることはできません!");
        }
        if (null == barnOption.getSort()) {
            throw new IllegalArgumentException("倉庫区域オプション順番を空にすることはできません!");
        }
        if (null == barnOption.getState()) {
            throw new IllegalArgumentException("倉庫区域オプション状態を空にすることはできません!");
        }
        this.barn_optionMapper.update(barnOption);
    }

    public void deleteBarnOption(Integer id, Integer state) {
        Barn_option obj = new Barn_option();
        obj.setId(id);
        obj = this.barn_optionMapper.selectOne(obj);
        if (obj != null) {
            obj.setState(state);
            this.barn_optionMapper.update(obj);
        } else {
            throw new IllegalArgumentException(String.format("倉庫区域オプション番号「%s」が存在していない!", id));
        }
    }

}
