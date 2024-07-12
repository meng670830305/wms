package jp.compamy.erpqrcode;

import jp.compamy.erpqrcode.model.AuthUser;

public class AppContext {
    private static AppContext instance;

    public static AppContext getInstance() {
        if (instance == null) {
            instance = new AppContext();
        }
        return instance;
    }

    private AuthUser authUser;

    public AuthUser getAuthUser() {
        return authUser;
    }

    public void setAuthUser(AuthUser authUser) {
        this.authUser = authUser;
    }
}
