/**
 * 业务逻辑层(jp.db.erp2024.service)包
 * wangyp Copyright 2006-2023
 * 文件:        Account_userMapper.java
 * 项目名称：    工程项目管理
 * 创建时间：    2023/11/7
 * 负责人:      wangyp
 */

package jp.db.erp2024.service;

import cn.hutool.core.lang.UUID;
import jakarta.annotation.Resource;
//import org.springframework.beans.factory.annotation.Autowired;
import jp.com.helper.Date8Helper;
import jp.com.helper.Guid;
import jp.com.helper.SecurityHelper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import jp.db.erp2024.pojo.Account_user;
import jp.db.erp2024.mapper.Account_userMapper;

import java.util.List;

/**
 * Mybatis业务逻辑层Account_userService类型
 */
//springboot 需要指定包扫描的名称
//@SpringBootApplication(scanBasePackages = {"jp.db.erp2024.service"})
@Component("account_userService")
public class Account_userService {
    public Account_userService() {
    }

    //@Autowired
    @Resource
    private Account_userMapper account_userMapper;

    public boolean createUser(Account_user accountUser) throws Exception {
        boolean result = false;
        if (accountUser == null) {
            throw new NullPointerException("createUser(Account_user accountUser)中的accountUser对象为null.");
        }
        if (StringUtils.isBlank(accountUser.getRealname())) {
            throw new IllegalArgumentException("姓名不能为空!");
        }
        if (StringUtils.isBlank(accountUser.getLoginaccount())) {
            throw new IllegalArgumentException("登录账号不能为空!");
        }
        if (StringUtils.isBlank(accountUser.getLoginpassword())) {
            throw new IllegalArgumentException("密码不能为空!");
        }
        if (accountUser.getLoginpassword().length() < 8) {
            throw new IllegalArgumentException("密码长度必须大于等于8位!");
        }
        if (StringUtils.isBlank(accountUser.getEmail())) {
            throw new IllegalArgumentException("邮箱不能为空!");
        }
        if (StringUtils.isBlank(accountUser.getPhone())) {
            throw new IllegalArgumentException("联系手机不能为空!");
        }
        final String WHERE = "%s='%s'";
        String where = String.format(WHERE, Account_user._EMAIL_, accountUser.getEmail());
        if (this.account_userMapper.selectCount(where) > 0) {
            throw new IllegalArgumentException("邮箱已被使用，请重新输入!");
        }
        where = String.format(WHERE, Account_user._REALNAME_, accountUser.getRealname());
        if (this.account_userMapper.selectCount(where) > 0) {
            throw new IllegalArgumentException("姓名已经存在，请重新输入!");
        }
        where = String.format(WHERE, Account_user._LOGINACCOUNT_, accountUser.getLoginaccount());
        if (this.account_userMapper.selectCount(where) > 0) {
            throw new IllegalArgumentException("登录账号已经存在，请重新输入!");
        }
        accountUser.setHash(this.hashBuilder(accountUser));
        accountUser.setLoginpassword(SecurityHelper.Md5(accountUser.getLoginpassword()));
        accountUser.setLogintime(Date8Helper.now());
        result = this.account_userMapper.insert(accountUser) == 1;
        result = accountUser.getId() > 0;
        return result;
    }

    private String hashBuilder(Account_user account_user) {
        return SecurityHelper.Md5(account_user.getId() + account_user.getLoginpassword() + UUID.randomUUID().toString());
    }

    public Account_user getUser(Integer userID) throws Exception {
        Account_user obj = new Account_user();
        obj.setId(userID);
        return this.account_userMapper.selectOne(obj);
    }

    public void updateUser(Account_user accountUser) throws Exception {
        if (accountUser == null) {
            throw new NullPointerException("updateUser(Account_user accountUser)中的accountUser对象为null.");
        }
        if (StringUtils.isBlank(accountUser.getRealname())) {
            throw new IllegalArgumentException("姓名不能为空!");
        }
        if (StringUtils.isBlank(accountUser.getLoginaccount())) {
            throw new IllegalArgumentException("登录账号不能为空!");
        }
        if (StringUtils.isBlank(accountUser.getLoginpassword())) {
            throw new IllegalArgumentException("密码不能为空!");
        }
        if (accountUser.getLoginpassword().length() < 8) {
            throw new IllegalArgumentException("密码长度必须大于等于8位!");
        }
        if (StringUtils.isBlank(accountUser.getEmail())) {
            throw new IllegalArgumentException("邮箱不能为空!");
        }
        if (StringUtils.isBlank(accountUser.getPhone())) {
            throw new IllegalArgumentException("联系手机不能为空!");
        }
        final String WHERE = "%s='%s' AND %s<>%s";
        String where = String.format(WHERE, Account_user._EMAIL_, accountUser.getEmail(), Account_user._ID_, accountUser.getId());
        if (this.account_userMapper.selectCount(where) > 0) {
            throw new IllegalArgumentException("邮箱已被使用，请重新输入!");
        }
        where = String.format(WHERE, Account_user._REALNAME_, accountUser.getRealname(), Account_user._ID_, accountUser.getId());
        if (this.account_userMapper.selectCount(where) > 0) {
            throw new IllegalArgumentException("姓名已经存在，请重新输入!");
        }
        accountUser.setHash(this.hashBuilder(accountUser));
        accountUser.setLoginpassword(SecurityHelper.Md5(accountUser.getLoginpassword()));
        this.account_userMapper.update(accountUser);
    }

    public void changePassword(Integer userId, String oldPassword, String newPassword) throws Exception {
        if (StringUtils.isBlank(oldPassword) || StringUtils.isBlank(newPassword)) {
            throw new IllegalArgumentException("密码不能为空!");
        }
        if (newPassword.length() < 8) {
            throw new IllegalArgumentException("密码长度必须大于等于8位!");
        }
        if (oldPassword.equals(newPassword)) {
            throw new IllegalArgumentException("新密码和旧新密码不能一样!");
        }
        Account_user accountUser = new Account_user();
        accountUser.setId(userId);
        Account_user account_user = this.account_userMapper.selectOne(accountUser);
        if (account_user == null) {
            throw new IllegalArgumentException(String.format("账户%s不存在!", userId));
        }
        String oldPwd = SecurityHelper.Md5(oldPassword);
        if (!oldPwd.equals(account_user.getLoginpassword())) {
            throw new IllegalArgumentException("旧密码不正确!");
        }
        account_user.setLoginpassword(SecurityHelper.Md5(newPassword));
        account_user.setHash(this.hashBuilder(account_user));
        this.account_userMapper.update(account_user);
    }

    public void forgetPassword(String loginAccount, String email, String phone, String url) throws Exception {
        if (StringUtils.isBlank(loginAccount)) {
            throw new IllegalArgumentException("loginAccount不能为空!");
        }
        if (StringUtils.isBlank(email)) {
            throw new IllegalArgumentException("email不能为空!");
        }
        if (StringUtils.isBlank(phone)) {
            throw new IllegalArgumentException("phone不能为空!");
        }
        if (StringUtils.isBlank(url)) {
            throw new IllegalArgumentException("url不能为空!");
        }
        loginAccount = loginAccount.trim();
        email = email.trim();
        phone = phone.trim();
        url = url.trim();
        String where = String.format("%s='%s' AND %s='%s' AND %s='%s'", Account_user._LOGINACCOUNT_, loginAccount, Account_user._EMAIL_, email, Account_user._PHONE_, phone);
        List<Account_user> accountUserList = this.account_userMapper.selectWhere(where);
        if (accountUserList.isEmpty()) {
            throw new IllegalArgumentException(String.format("账户'%s'不存在!", loginAccount));
        }
        Account_user account_user = accountUserList.get(0);
        if (account_user.getStatus() != 0) {
            throw new IllegalArgumentException(String.format("您的帐户'%s'已被冻结或注销,请联系管理员!", loginAccount));
        }
        account_user.setHash(this.hashBuilder(account_user));
        // 发邮件省略
        this.account_userMapper.update(account_user);
    }

    public void resetPassword(Integer userId, String newPassword) throws Exception {
        if (StringUtils.isBlank(newPassword)) {
            throw new IllegalArgumentException("密码不能为空!");
        }
        Account_user account_user = new Account_user();
        account_user.setId(userId);
        account_user = this.account_userMapper.selectOne(account_user);
        if (account_user == null) {
            throw new IllegalArgumentException(String.format("账户'%s'不存在!", userId));
        }
        account_user.setLoginpassword(SecurityHelper.Md5(newPassword));
        account_user.setHash(this.hashBuilder(account_user));
        this.account_userMapper.update(account_user);
    }
}
