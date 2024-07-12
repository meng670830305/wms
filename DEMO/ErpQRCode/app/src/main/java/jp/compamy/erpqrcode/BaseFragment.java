package jp.compamy.erpqrcode;

import static jp.compamy.erpqrcode.Constant.AUTH_JSON;
import static jp.compamy.erpqrcode.Constant.Authorization;
import static jp.compamy.erpqrcode.Constant.SERVER_ADDRESS;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.fragment.app.Fragment;

import com.google.zxing.activity.CaptureActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jp.compamy.erpqrcode.model.KeyValue;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Response;

public class BaseFragment extends Fragment {

    private SharedPreferences sharedPreferences;

    protected void startQrCode() {
        // 申请相机权限
        if (ActivityCompat.checkSelfPermission(this.getContext(), android.Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            // 申请权限
            if (ActivityCompat.shouldShowRequestPermissionRationale(this.getActivity(), android.Manifest.permission
                    .CAMERA)) {
                Toast.makeText(this.getContext(), "请至权限中心打开本应用的相机访问权限", Toast.LENGTH_SHORT).show();
            }
            ActivityCompat.requestPermissions(this.getActivity(), new String[]{android.Manifest.permission.CAMERA}, Constant.REQ_PERM_CAMERA);
            return;
        }
        // 申请文件读写权限（部分朋友遇到相册选图需要读写权限的情况，这里一并写一下）
        if (ActivityCompat.checkSelfPermission(this.getContext(), android.Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            // 申请权限
            if (ActivityCompat.shouldShowRequestPermissionRationale(this.getActivity(), android.Manifest.permission
                    .WRITE_EXTERNAL_STORAGE)) {
                Toast.makeText(this.getContext(), "请至权限中心打开本应用的文件读写权限", Toast.LENGTH_SHORT).show();
            }
            ActivityCompat.requestPermissions(this.getActivity(), new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, Constant.REQ_PERM_EXTERNAL_STORAGE);
            return;
        }
        // 二维码扫码
        Intent intent = new Intent(this.getActivity(), CaptureActivity.class);
        startActivityForResult(intent, Constant.REQ_QR_CODE);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case Constant.REQ_PERM_CAMERA:
                // 摄像头权限申请
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // 获得授权
                    startQrCode();
                } else {
                    // 被禁止授权
                    Toast.makeText(this.getContext(), "请至权限中心打开本应用的相机访问权限", Toast.LENGTH_LONG).show();
                }
                break;
            case Constant.REQ_PERM_EXTERNAL_STORAGE:
                // 文件读写权限申请
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // 获得授权
                    startQrCode();
                } else {
                    // 被禁止授权
                    Toast.makeText(this.getContext(), "请至权限中心打开本应用的文件读写权限", Toast.LENGTH_LONG).show();
                }
                break;
        }
    }

    @Override
    public void onStart() {
        super.onStart();
        this.sharedPreferences = this.getSharedPreferences();
    }

    private SharedPreferences getSharedPreferences() {
        return this.getContext().getSharedPreferences(this.getString(R.string.app_id), Context.MODE_PRIVATE);
    }

    protected String getUrl(String path) {
        String serverAddress = this.sharedPreferences.getString(SERVER_ADDRESS, "");
        return String.format(this.getString(R.string.app_url) + path, serverAddress);
    }

    protected Map<String, String> getHeadMap() {
        Map<String, String> headMap = new HashMap<>();
        String authJson = this.sharedPreferences.getString(AUTH_JSON, "");
        headMap.put(Authorization, authJson);
        return headMap;
    }

    protected void show(String info) {
        this.getActivity().runOnUiThread(() -> {
            Toast.makeText(this.getContext(), info, Toast.LENGTH_SHORT).show();
        });
    }

    protected void bindSpinner(Spinner spinner, List<KeyValue> keyValueList) {
        this.getActivity().runOnUiThread(() -> {
            ArrayAdapter<KeyValue> adapter = new ArrayAdapter<>(this.getContext(), android.R.layout.simple_spinner_dropdown_item, keyValueList);
            spinner.setAdapter(adapter);
        });
    }


    protected void binder(Logger logger, String url, Map<String, String> headMap, Spinner spinner, String msg1, String msg2) {
        OKHttpUtils.post(url, null, headMap, new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                logger.error(String.format("%s data error exception:{}", msg1), e);
                BaseFragment.this.show(e.getMessage());
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                int code = response.code();
                logger.info("%s data resonse: http code: {}", msg1, code);
                if (code == 200) {
                    try {
                        String body = response.body().string();
                        JSONObject jsonObject = new JSONObject(body);
                        boolean success = false;
                        if (jsonObject.has("Success")) {
                            success = jsonObject.getBoolean("Success");
                        }
                        if (success) {
                            if (jsonObject.has("Data")) {
                                JSONArray jsonArray = jsonObject.getJSONArray("Data");
                                int length = jsonArray.length();
                                KeyValue keyValue;
                                List<KeyValue> keyValueList = new ArrayList<>(length);
                                for (int i = 0; i < length; i++) {
                                    jsonObject = jsonArray.getJSONObject(i);
                                    if (jsonObject.has("id")
                                            && jsonObject.has("name")) {
                                        keyValue = new KeyValue(jsonObject.getString("id"), jsonObject.getString("name"));
                                        keyValueList.add(keyValue);
                                    }
                                }
                                BaseFragment.this.bindSpinner(spinner, keyValueList);
                            } else {
                                BaseFragment.this.show(String.format("%sのデータが取得失敗しました", msg2));
                            }
                        } else {
                            String message;
                            if (jsonObject.has("Message")) {
                                message = jsonObject.getString("Message");
                            } else {
                                message = "不明なエラーメッセージ";
                            }
                            BaseFragment.this.show(message);
                        }
                    } catch (JSONException e) {
                        logger.error(String.format("%s data json exception:{}", msg1), e);
                    }
                } else {
                    BaseFragment.this.show(String.format("%sのデータが取得失敗しました", msg2));
                }
            }
        });
    }


    protected void store(Logger logger
            , String url
            , Map<String, String> paramMap
            , Map<String, String> headMap
            , String msg1, String msg2
            , Runnable successCallBack
            , Runnable failureCallBack) {
        OKHttpUtils.post(url, paramMap, headMap, new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                logger.error(String.format("%s data error exception:{}", msg1), e);
                BaseFragment.this.show(e.getMessage());
                if (failureCallBack != null) {
                    failureCallBack.run();
                }
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                int code = response.code();
                logger.info("%s data resonse: http code: {}", msg1, code);
                if (code == 200) {
                    try {
                        String body = response.body().string();
                        JSONObject jsonObject = new JSONObject(body);
                        boolean success = false;
                        if (jsonObject.has("Success")) {
                            success = jsonObject.getBoolean("Success");
                        }
                        if (success) {
                            if (successCallBack != null) {
                                successCallBack.run();
                            }
                        } else {
                            String message;
                            if (jsonObject.has("Message")) {
                                message = jsonObject.getString("Message");
                            } else {
                                message = "不明なエラーメッセージ";
                            }
                            BaseFragment.this.show(message);
                            if (failureCallBack != null) {
                                failureCallBack.run();
                            }
                        }
                    } catch (JSONException e) {
                        logger.error(String.format("%s data json exception:{}", msg1), e);
                        if (failureCallBack != null) {
                            failureCallBack.run();
                        }
                    }
                } else {
                    BaseFragment.this.show(String.format("%sのデータが登録失敗しました", msg2));
                    if (failureCallBack != null) {
                        failureCallBack.run();
                    }
                }
            }
        });
    }
}
