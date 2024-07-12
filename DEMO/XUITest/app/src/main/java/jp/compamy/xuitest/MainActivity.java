package jp.compamy.xuitest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import com.xuexiang.xui.widget.dialog.materialdialog.MaterialDialog;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        this.findViewById(R.id.btn_test).setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        new MaterialDialog.Builder(this)
                .iconRes(R.mipmap.ic_launcher_round)
                .title("测试标题")
                .content("测试内容")
                .positiveText("确定")
                .show();

    }
}