package jp.compamy.erpqrcode;

import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class BaseActivity extends AppCompatActivity {

    protected void show(String info) {
        this.runOnUiThread(() -> {
            Toast.makeText(this, info, Toast.LENGTH_SHORT).show();
        });
    }

}
