/**
 * 业务逻辑层(jp.db.erp2024.service)包
 * wangyp Copyright 2006-2023
 * 文件:        Account_userroleassignMapper.java
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
import jp.db.erp2024.mapper.Account_roleMapper;
import jp.db.erp2024.mapper.Account_userMapper;
import jp.db.erp2024.pojo.Account_role;
import jp.db.erp2024.pojo.Account_user;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import jp.db.erp2024.pojo.Account_userroleassign;
import jp.db.erp2024.mapper.Account_userroleassignMapper;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

/**
 * Mybatis业务逻辑层Account_userroleassignService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("account_userroleassignService")
public class Account_userroleassignService {
    public Account_userroleassignService() {
    }

    //@Autowired
    @Resource
    private Account_userroleassignMapper account_userroleassignMapper;
    @Resource
    private Account_userMapper account_userMapper;
    @Resource
    private Account_roleMapper account_roleMapper;


    public List<Account_userroleassign> getAccount_userroleassignList(Integer userID) {
        return this.account_userroleassignMapper.selectWhere(String.format("%s=%s", Account_userroleassign._USERID_, userID));
    }

    public void assignUserRole(Account_userroleassign accountUserRoleAssign) throws Exception {
        if (accountUserRoleAssign == null) {
            throw new IllegalArgumentException("assignUserRole(Account_userroleassign accountUserRoleAssign)的accountUserRoleAssign为空对象.");
        }
        if (accountUserRoleAssign.getExpiredtime().getYear() == 1900) {
            accountUserRoleAssign.setExpiredtime(Date8Helper.maxValue());
        }
        Account_userroleassign accountUserRoleAssignDB = this.account_userroleassignMapper.selectOne(accountUserRoleAssign);
        if (accountUserRoleAssignDB != null) {
            accountUserRoleAssignDB.setExpiredtime(accountUserRoleAssign.getExpiredtime());
            accountUserRoleAssignDB.setRemark(accountUserRoleAssign.getRemark());
            accountUserRoleAssignDB.setIsenable(accountUserRoleAssign.getIsenable());
            this.account_userroleassignMapper.update(accountUserRoleAssignDB);
        } else {
            this.account_userroleassignMapper.insert(accountUserRoleAssign);
            this.changeUserRoleText(accountUserRoleAssign.getUserid());
        }
    }

    private void changeUserRoleText(Integer userID) throws Exception {
        Account_user obj = new Account_user();
        obj.setId(userID);
        Account_user accountUser = this.account_userMapper.selectOne(obj);
        if (accountUser == null) {
            return;
        }
        String where = String.format("%s=%s", Account_userroleassign._USERID_, userID);
        List<Account_userroleassign> accountUserRoleAssignList = this.account_userroleassignMapper.selectWhere(where);
        List<Integer> roleIDList = Lambda.select(accountUserRoleAssignList, item -> item.getRoleid());
        accountUserRoleAssignList.clear();
        accountUserRoleAssignList = null;
        roleIDList = Lambda.distinct(roleIDList);
        if (roleIDList.isEmpty()) {
            accountUser.setRoletext("");
        } else {
            where = String.format("%s IN (%s)", Account_role._ID_, StringUtils.join(roleIDList, ","));
            roleIDList.clear();
            List<Account_role> accountRoleList = this.account_roleMapper.selectWhere(where);
            List<String> roleNameList = Lambda.select(accountRoleList, item -> item.getName());
            accountUser.setRoletext(StringUtils.join(roleNameList, ","));
            roleNameList.clear();
            roleNameList = null;
            accountRoleList.clear();
            accountRoleList = null;
        }
        roleIDList = null;
        this.account_userMapper.update(accountUser);
    }

    public void deleteUserRoleAssign(Integer userRoleAssignID) throws Exception {
        Account_userroleassign obj = new Account_userroleassign();
        obj.setId(userRoleAssignID);
        Account_userroleassign accountUserRoleAssign = this.account_userroleassignMapper.selectOne(obj);
        if (accountUserRoleAssign == null) {
            return;
        }
        this.account_userroleassignMapper.delete(accountUserRoleAssign);
        changeUserRoleText(accountUserRoleAssign.getUserid());
    }

    public Account_userroleassign getUserRoleAssign(Integer id) throws Exception {
        Account_userroleassign obj = new Account_userroleassign();
        obj.setId(id);
        return this.account_userroleassignMapper.selectOne(obj);
    }
}
