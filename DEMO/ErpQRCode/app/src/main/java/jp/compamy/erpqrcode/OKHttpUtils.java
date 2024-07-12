package jp.compamy.erpqrcode;

import android.util.Base64;

import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.util.Map;

import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;

public class OKHttpUtils {

    public static OkHttpClient getOkHttpClient() {
        return new OkHttpClient.Builder().connectTimeout(Duration.ofSeconds(30L)).build();
    }

    public static void post(String url, Map<String, String> paramMap, Callback callback) {
        FormBody.Builder formBody = new FormBody.Builder(StandardCharsets.UTF_8);
        if (paramMap != null) {
            for (Map.Entry<String, String> entry : paramMap.entrySet()) {
                formBody.add(entry.getKey(), entry.getValue());
            }
        }
        Request request = new Request
                .Builder()
                .url(url)
                .post(formBody.build())
                .build();
        getOkHttpClient().newCall(request).enqueue(callback);
    }

    public static void post(String url, Map<String, String> paramMap, Map<String, String> headMap, Callback callback) {
        FormBody.Builder formBody = new FormBody.Builder(StandardCharsets.UTF_8);
        if (paramMap != null) {
            for (Map.Entry<String, String> entry : paramMap.entrySet()) {
                formBody.add(entry.getKey(), entry.getValue());
            }
        }
        Request.Builder builder = new Request.Builder();
        if (headMap != null) {
            for (Map.Entry<String, String> entry : headMap.entrySet()) {
                builder.addHeader(entry.getKey(), encodeBase64(entry.getValue()));
            }
        }
        Request request = builder
                .url(url)
                .post(formBody.build())
                .build();
        getOkHttpClient().newCall(request).enqueue(callback);
    }

    private static String encodeBase64(String value) {
        byte[] bytes = value.getBytes(StandardCharsets.UTF_8);
        return Base64.encodeToString(bytes, Base64.NO_WRAP);
    }
}
