/**
 * 业务逻辑层(jp.db.erp2024.service)包
 * wangyp Copyright 2006-2023
 * 文件:        Account_usergroupassignMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/7
 * 负责人:      wangyp
 */

package jp.db.erp2024.service;

import cn.hutool.core.lang.func.Func1;
import jakarta.annotation.Resource;
//import org.springframework.beans.factory.annotation.Autowired;
import jp.com.helper.Date8Helper;
import jp.com.helper.Lambda;
import jp.db.erp2024.mapper.Account_groupMapper;
import jp.db.erp2024.mapper.Account_userMapper;
import jp.db.erp2024.pojo.Account_group;
import jp.db.erp2024.pojo.Account_user;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import jp.db.erp2024.pojo.Account_usergroupassign;
import jp.db.erp2024.mapper.Account_usergroupassignMapper;

import java.util.Calendar;
import java.util.List;

/**
 * Mybatis业务逻辑层Account_usergroupassignService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("account_usergroupassignService")
public class Account_usergroupassignService {
    public Account_usergroupassignService() {
    }

    //@Autowired
    @Resource
    private Account_usergroupassignMapper account_usergroupassignMapper;
    @Resource
    private Account_groupMapper account_groupMapper;
    @Resource
    private Account_userMapper account_userMapper;

    public List<Account_usergroupassign> getAccount_usergroupassignList(Integer userID) {
        return this.account_usergroupassignMapper.selectWhere(String.format("%s=%s", Account_usergroupassign._USERID_, userID));
    }

    public void assignUserGroup(Account_usergroupassign accountUserGroupAssign) throws Exception {
        if (accountUserGroupAssign == null) {
            throw new IllegalArgumentException("assignUserGroup(Account_usergroupassign accountUserGroupAssign)的accountUserGroupAssign为空对象.");
        }
        if (accountUserGroupAssign.getExpiredtime().getYear() == 1900) {
            accountUserGroupAssign.setExpiredtime(Date8Helper.maxValue());
        }
        Account_usergroupassign accountUserGroupAssignDB = this.account_usergroupassignMapper.selectOne(accountUserGroupAssign);
        if (accountUserGroupAssignDB != null) {
            accountUserGroupAssignDB.setExpiredtime(accountUserGroupAssign.getExpiredtime());
            accountUserGroupAssignDB.setRemark(accountUserGroupAssign.getRemark());
            this.account_usergroupassignMapper.update(accountUserGroupAssignDB);
        } else {
            this.account_usergroupassignMapper.insert(accountUserGroupAssign);
            // 更新用户表
            this.changeUserGroupText(accountUserGroupAssign.getUserid());
        }
    }

    private void changeUserGroupText(Integer userID) throws Exception {
        Account_user obj = new Account_user();
        obj.setId(userID);
        Account_user accountUser = this.account_userMapper.selectOne(obj);
        if (accountUser == null) {
            return;
        }
        String where = String.format("%s=%s", Account_usergroupassign._USERID_, userID);
        List<Account_usergroupassign> accountUserGroupAssignList = this.account_usergroupassignMapper.selectWhere(where);
        List<Integer> groupIDList = Lambda.select(accountUserGroupAssignList, item -> item.getGroupid());
        groupIDList = Lambda.distinct(groupIDList);
        if (groupIDList.isEmpty()) {
            accountUser.setGrouptext("");
        } else {
            String groupIdsWhere = String.format("%s IN (%s)", Account_group._ID_, StringUtils.join(groupIDList, ","));
            groupIDList.clear();
            List<Account_group> accountGroupList = this.account_groupMapper.selectWhere(groupIdsWhere);
            List<String> groupNameList = Lambda.select(accountGroupList, item -> item.getName());
            accountGroupList.clear();
            accountGroupList = null;
            accountUser.setGrouptext(StringUtils.join(groupNameList, ","));
            groupNameList.clear();
            groupNameList = null;
        }
        groupIDList = null;
        this.account_userMapper.update(accountUser);
    }

    public Account_usergroupassign getUserGroupAssign(Integer userGroupAssignID) throws Exception {
        Account_usergroupassign obj = new Account_usergroupassign();
        obj.setId(userGroupAssignID);
        return this.account_usergroupassignMapper.selectOne(obj);
    }

    public void deleteUserGroupAssign(Integer userGroupAssignID) throws Exception {
        Account_usergroupassign obj = new Account_usergroupassign();
        obj.setId(userGroupAssignID);
        Account_usergroupassign accountUserGroupAssign = this.account_usergroupassignMapper.selectOne(obj);
        if (accountUserGroupAssign == null) {
            return;
        }
        this.account_usergroupassignMapper.delete(accountUserGroupAssign);
        // 更新用户表
        this.changeUserGroupText(accountUserGroupAssign.getUserid());
    }
}
