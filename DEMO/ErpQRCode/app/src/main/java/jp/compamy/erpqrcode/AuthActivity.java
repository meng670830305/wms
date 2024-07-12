package jp.compamy.erpqrcode;

import static jp.compamy.erpqrcode.Constant.AUTH_JSON;
import static jp.compamy.erpqrcode.Constant.LOGIN_ACCOUNT;
import static jp.compamy.erpqrcode.Constant.SERVER_ADDRESS;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.text.TextUtils;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;

import com.github.tony19.logback.android.BuildConfig;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import jp.compamy.erpqrcode.model.AuthUser;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AuthActivity extends BaseActivity implements View.OnClickListener {

    EditText txtLoginAccount, txtPassword, txtServerAddress;
    Button btnLogin;

    CheckBox checkBox;

    private Logger logger = LoggerFactory.getLogger(AuthActivity.class);

    private final int REQUEST_CODE_WRITE_EXTERNAL_STORAGE = 1;

    private SharedPreferences sharedPreferences = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.WRITE_EXTERNAL_STORAGE}, REQUEST_CODE_WRITE_EXTERNAL_STORAGE);
        }
        this.setContentView(R.layout.activity_auth);

        this.txtLoginAccount = (EditText) this.findViewById(R.id.txtLoginAccount);
        this.txtPassword = (EditText) this.findViewById(R.id.txtPassword);
        this.txtServerAddress = (EditText) this.findViewById(R.id.txtServerAddress);
        this.btnLogin = (Button) this.findViewById(R.id.btnLogin);
        this.btnLogin.setOnClickListener(this);
        this.checkBox = (CheckBox) this.findViewById(R.id.chkPassword);
        this.checkBox.setOnClickListener(this);

        this.txtPassword.setTransformationMethod(PasswordTransformationMethod.getInstance());
    }

    @Override
    protected void onStart() {
        super.onStart();

        this.sharedPreferences = this.getSharedPreferences();
        String loginAccount = this.sharedPreferences.getString(LOGIN_ACCOUNT, "");
        if (!TextUtils.isEmpty(loginAccount)) {
            this.txtLoginAccount.setText(loginAccount);
        }
        String serverAddress = this.sharedPreferences.getString(SERVER_ADDRESS, "");
        if (!TextUtils.isEmpty(serverAddress)) {
            this.txtServerAddress.setText(serverAddress);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

    }

    @Override
    public void onClick(View view) {
        int id = view.getId();
        if (id == R.id.btnLogin) {
            this.login();
        } else if (id == R.id.chkPassword) {
            if (this.checkBox.isChecked()) {
                this.txtPassword.setTransformationMethod(HideReturnsTransformationMethod.getInstance());
            } else {
                this.txtPassword.setTransformationMethod(PasswordTransformationMethod.getInstance());
            }
        }
    }

    private void login() {
        String loginAccount = this.txtLoginAccount.getText().toString();
        if (TextUtils.isEmpty(loginAccount)) {
            AuthActivity.super.show("ログインIDを入力してください！");
            return;
        }
        String password = this.txtPassword.getText().toString();
        if (TextUtils.isEmpty(password)) {
            AuthActivity.super.show("パスワードを入力してください！");
            return;
        }
        String serverAddress = this.txtServerAddress.getText().toString();
        if (TextUtils.isEmpty(serverAddress)) {
            AuthActivity.super.show("サーバアドレスを入力してください！");
            return;
        }
        String url = String.format(this.getString(R.string.app_url) + "Login", serverAddress);

        Map<String, String> map = new HashMap<>(2);
        map.put("loginName", loginAccount);
        map.put("loginPwd", password);

        OKHttpUtils.post(url, map, new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                AuthActivity.this.logger.error("login error exception:{}", e);
                AuthActivity.super.show(e.getMessage());
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                int code = response.code();
                AuthActivity.this.logger.info("login resonse: http code: {}", code);
                if (code == 200) {
                    String body = response.body().string();
                    try {
                        JSONObject jsonObject = new JSONObject(body);
                        boolean success = false;
                        if (jsonObject.has("Success")) {
                            success = jsonObject.getBoolean("Success");
                        }
                        if (success) {
                            if (jsonObject.has("Data")) {
                                AuthUser authUser = new AuthUser();
                                authUser.setServerAddress(serverAddress);
                                jsonObject = jsonObject.getJSONObject("Data");
                                if (jsonObject.has("id")) {
                                    authUser.setId(Integer.valueOf(jsonObject.getString("id")));
                                } else {
                                    AuthActivity.super.show("ログインID無し");
                                    return;
                                }
                                if (jsonObject.has("name")) {
                                    authUser.setName(jsonObject.getString("name"));
                                } else {
                                    AuthActivity.super.show("ユーザー名前無し");
                                    return;
                                }
                                if (jsonObject.has("code")) {
                                    authUser.setCode(jsonObject.getString("code"));
                                } else {
                                    AuthActivity.super.show("ユーザーコード無し");
                                    return;
                                }
                                if (jsonObject.has("role")) {
                                    authUser.setRole(jsonObject.getString("role"));
                                } else {
                                    AuthActivity.super.show("ユーザー役割無し");
                                    return;
                                }
                                AppContext.getInstance().setAuthUser(authUser);

                                SharedPreferences.Editor editor = AuthActivity.this.sharedPreferences.edit();
                                editor.putString(SERVER_ADDRESS, serverAddress);
                                editor.putString(LOGIN_ACCOUNT, loginAccount);
                                editor.putString(AUTH_JSON, jsonObject.toString());
                                editor.apply();
                                ActivityUtils.start(AuthActivity.this, MainActivity.class);
                            } else {
                                AuthActivity.super.show("ログイン失敗しました");
                            }
                        } else {
                            String message;
                            if (jsonObject.has("Message")) {
                                message = jsonObject.getString("Message");
                            } else {
                                message = "未知错误信息";
                            }
                            AuthActivity.super.show(message);
                        }
                    } catch (JSONException e) {
                        AuthActivity.this.logger.error("login json exception:{}", e);
                    }
                } else {
                    AuthActivity.super.show("ログイン失敗しました");
                }
            }
        });

    }

    private SharedPreferences getSharedPreferences() {
        return this.getSharedPreferences(this.getString(R.string.app_id), Context.MODE_PRIVATE);
    }
}