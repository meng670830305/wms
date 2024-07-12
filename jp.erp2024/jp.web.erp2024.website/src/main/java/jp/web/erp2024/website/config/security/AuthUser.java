package jp.web.erp2024.website.config.security;

import jp.db.erp2024.pojo.Account_user;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.io.Serializable;
import java.util.Collection;

/**
 * 登录用户信息
 */
public class AuthUser extends User implements Serializable {

    /**
     * 用户ID
     */
    private Integer iD;
    /**
     * 真实姓名
     */
    private String realName = "";
    /**
     * 邮箱
     */
    private String email = "";

    public Integer getID() {
        return iD;
    }

    public String getRealName() {
        return realName;
    }

    public String getEmail() {
        return email;
    }

    public AuthUser(Account_user accountUser
            , boolean enabled
            , boolean accountNonExpired
            , boolean credentialsNonExpired
            , boolean accountNonLocked
            , Collection<? extends GrantedAuthority> authorities) {
        super(accountUser.getEmail()
                , accountUser.getLoginpassword()
                , enabled
                , accountNonExpired
                , credentialsNonExpired
                , accountNonLocked
                , authorities);
        this.realName = accountUser.getRealname();
        this.email = accountUser.getEmail();
        this.iD = accountUser.getId();
    }

    @Override
    public boolean equals(Object other) {
        return other instanceof AuthUser ? this.iD.equals(((AuthUser) other).iD) : false;
    }

    @Override
    public int hashCode() {
        return this.iD.hashCode();
    }
}
