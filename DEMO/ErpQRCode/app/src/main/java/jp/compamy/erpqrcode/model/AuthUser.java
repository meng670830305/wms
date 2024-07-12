package jp.compamy.erpqrcode.model;

import java.time.LocalDateTime;
import java.time.ZoneId;

public class AuthUser {
    /**
     * 用户ID
     */
    private Integer id;
    /**
     * 用户姓名
     */
    private String name;
    /**
     * 用户ード
     */
    private String code;
    /**
     * 用户角色
     */
    private String role;
    /**
     * 服务器地址
     */
    private String serverAddress;
    /**
     * 登录时间
     */
    private LocalDateTime time = LocalDateTime.now(ZoneId.systemDefault());

    public LocalDateTime getTime() {
        return this.time;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getServerAddress() {
        return serverAddress;
    }

    public void setServerAddress(String serverAddress) {
        this.serverAddress = serverAddress;
    }
}
