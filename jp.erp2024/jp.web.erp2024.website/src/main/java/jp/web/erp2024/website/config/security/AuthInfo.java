package jp.web.erp2024.website.config.security;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 * 用户授权信息
 */
public class AuthInfo {
    /**
     * 授权信息ID
     */
    @JSONField(name = "ID", ordinal = 0)
    private Integer ID;
    /**
     * 授权信息名称
     */
    @JSONField(name = "Name", ordinal = 1)
    private String Name;
    /**
     * 授权信息类型
     */
    @JSONField(name = "Type", ordinal = 2)
    private String Type;

    @JSONField(name = "ID", ordinal = 0)
    public Integer getID() {
        return ID;
    }

    @JSONField(name = "ID", ordinal = 0)
    public void setID(Integer ID) {
        this.ID = ID;
    }

    @JSONField(name = "Name", ordinal = 1)
    public String getName() {
        return Name;
    }

    @JSONField(name = "Name", ordinal = 1)
    public void setName(String name) {
        Name = name;
    }

    @JSONField(name = "Type", ordinal = 2)
    public String getType() {
        return Type;
    }

    @JSONField(name = "Type", ordinal = 2)
    public void setType(String type) {
        Type = type;
    }

    public AuthInfo() {
    }

    public AuthInfo(Integer ID, String name, String type) {
        this.ID = ID;
        Name = name;
        Type = type;
    }

    @Override
    public String toString() {
        return "AuthInfo{" +
                "ID='" + ID + '\'' +
                ", Name='" + Name + '\'' +
                ", Type='" + Type + '\'' +
                '}';
    }
}
