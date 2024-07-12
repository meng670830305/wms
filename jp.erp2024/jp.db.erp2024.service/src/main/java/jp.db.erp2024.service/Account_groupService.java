/**
 * 业务逻辑层(jp.db.erp2024.service)包
 * <p>
 * wangyp Copyright 2006-2023
 * 文件:        Account_groupMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/7
 * 负责人:      wangyp
 */

package jp.db.erp2024.service;

import jakarta.annotation.Resource;
import jp.com.helper.Lambda;
import jp.db.erp2024.mapper.Account_groupMapper;
import jp.db.erp2024.mapper.Account_usergroupassignMapper;
import jp.db.erp2024.pojo.Account_group;
import jp.db.erp2024.pojo.Account_usergroupassign;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Mybatis业务逻辑层Account_groupService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("account_groupService")
public class Account_groupService {
    public Account_groupService() {
    }

    //@Autowired
    @Resource
    private Account_groupMapper account_groupMapper;
    @Resource
    private Account_usergroupassignMapper account_usergroupassignMapper;

    public List<Account_group> getAccount_groupList(String groupIdString) {
        return this.account_groupMapper.selectWhere(String.format("%s IN (%s)", Account_group._ID_, groupIdString));
    }

    public boolean createGroup(Account_group accountGroup) throws Exception {
        boolean result = false;
        if (accountGroup == null) {
            throw new NullPointerException("createGroup(Account_group accountGroup)中的accountGroup对象为null.");
        }
        if (StringUtils.isBlank(accountGroup.getName())) {
            throw new IllegalArgumentException("用户组名称不能为空!");
        }
        if (StringUtils.isBlank(accountGroup.getDescription())) {
            throw new IllegalArgumentException("用户组描述不能为空!");
        }
        if (null != accountGroup.getSort()) {
            throw new IllegalArgumentException("用户组排序不能为空!");
        }
        String where = String.format("%s='%s'", Account_group._NAME_, accountGroup.getName());
        List<Account_group> accountGroupList = this.account_groupMapper.selectWhere(where);
        if (accountGroupList.isEmpty()) {
            result = this.account_groupMapper.insert(accountGroup) == 1;
            result = accountGroup.getId().intValue() > 0;
        } else {
            throw new IllegalArgumentException(String.format("已经存在用户组名称为'%s'的记录!", accountGroup.getName()));
        }
        return result;
    }

    public Account_group getGroup(Integer groupId) throws Exception {
        Account_group obj = new Account_group();
        obj.setId(Integer.valueOf(groupId));
        return this.account_groupMapper.selectOne(obj);
    }

    public void updateGroup(Account_group accountGroup) throws Exception {
        if (accountGroup == null) {
            throw new NullPointerException("updateGroup(Account_group accountGroup)中的accountGroup对象为null.");
        }
        if (StringUtils.isBlank(accountGroup.getName())) {
            throw new IllegalArgumentException("用户组名称不能为空!");
        }
        if (StringUtils.isBlank(accountGroup.getDescription())) {
            throw new IllegalArgumentException("用户组描述不能为空!");
        }
        if (null != accountGroup.getSort()) {
            throw new IllegalArgumentException("用户组排序不能为空!");
        }
        String where = String.format("%s<>%s AND %s='%s'", Account_group._ID_, accountGroup.getId(), Account_group._NAME_, accountGroup.getName());
        List<Account_group> accountGroupList = this.account_groupMapper.selectWhere(where);
        if (accountGroupList.isEmpty()) {
            this.account_groupMapper.update(accountGroup);
        } else {
            throw new IllegalArgumentException(String.format("已经存在用户组名称为'%s'的其它记录!", accountGroup.getName()));
        }
    }

    public List<Account_group> getUserUnAssignGroupList(Integer userID) throws Exception {
        List<Account_group> result = null;
        String where = String.format("%s=%s", Account_usergroupassign._USERID_, userID);
        List<Account_usergroupassign> accountUserGroupAssignList = this.account_usergroupassignMapper.selectWhere(where);
        List<Integer> groupIdList = Lambda.select(accountUserGroupAssignList, item -> item.getGroupid());
        accountUserGroupAssignList.clear();
        accountUserGroupAssignList = null;
        if (groupIdList.isEmpty()) {
            result = this.account_groupMapper.selectAll();
        } else {
            where = String.format("%s NOT IN (%s)", Account_group._ID_, StringUtils.join(groupIdList, ","));
            groupIdList.clear();
            result = this.account_groupMapper.selectWhere(where);
        }
        groupIdList = null;
        return result;
    }
}
