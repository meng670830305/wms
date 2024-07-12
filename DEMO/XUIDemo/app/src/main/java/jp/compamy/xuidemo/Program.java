package jp.compamy.xuidemo;

import android.app.Application;

import com.xuexiang.xui.XUI;

public class Program extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        XUI.init(this);
        XUI.debug(true);
    }
}
