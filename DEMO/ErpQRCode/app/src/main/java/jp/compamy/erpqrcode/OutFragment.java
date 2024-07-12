package jp.compamy.erpqrcode;

import static android.app.Activity.RESULT_OK;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

import jp.compamy.erpqrcode.model.KeyValue;

/**
 * <pre>
 *
 * </pre>
 *
 * @author wangyunpeng
 * @date 2023/08/08 15:50
 */
public class OutFragment extends BaseFragment implements View.OnClickListener {

    Button btnOut, btnQrCode1, btnQrCode2, btnReset; // 扫码
    TextView tvShelfCode, tvSkuCode; // 结果
    EditText txtCount;
    Spinner spnAgency, spnMerchant;

    private Logger logger = LoggerFactory.getLogger(OutFragment.class);

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.activity_out, container, false);

        this.btnQrCode1 = (Button) root.findViewById(R.id.btnQrCode1);
        this.btnQrCode1.setOnClickListener(this);
        this.btnQrCode2 = (Button) root.findViewById(R.id.btnQrCode2);
        this.btnQrCode2.setOnClickListener(this);
        this.tvShelfCode = (TextView) root.findViewById(R.id.txtShelfCode);
        this.tvSkuCode = (TextView) root.findViewById(R.id.txtSkuCode);
        this.txtCount = (EditText) root.findViewById(R.id.txtCount);

        this.btnOut = (Button) root.findViewById(R.id.btnOut);
        this.btnOut.setOnClickListener(this);
        this.btnReset = (Button) root.findViewById(R.id.btnReset);
        this.btnReset.setOnClickListener(this);

        this.spnAgency = (Spinner) root.findViewById(R.id.spnAgency);
        this.spnMerchant = (Spinner) root.findViewById(R.id.spnMerchant);

        return root;
    }

    @Override
    public void onStart() {
        super.onStart();
        Map<String, String> headMap = super.getHeadMap();
        String url = super.getUrl("AgencyData");
        super.binder(this.logger, url, headMap, this.spnAgency, "agency", "エージェンシー");
        url = super.getUrl("MerchantData");
        super.binder(this.logger, url, headMap, this.spnMerchant, "merchant", "買い手");
    }

    @Override
    public void onClick(View view) {
        int id = view.getId();
        if (id == R.id.btnQrCode1) {
            this.startQrCode();
        } else if (id == R.id.btnQrCode2) {
            this.startQrCode();
        } else if (id == R.id.btnOut) {
            try {
                this.outAdd();
            } catch (JSONException e) {
                this.logger.error("JSON", e);
                super.show(e.getMessage());
            }
        } else if (id == R.id.btnReset) {
            this.reset();
        }
    }

    private void reset() {
        this.tvShelfCode.setText("");
        this.tvSkuCode.setText("");
        this.txtCount.setText("1");
        this.spnAgency.setSelection(0);
        this.spnMerchant.setSelection(0);
    }

    private void outAdd() throws JSONException {
        JSONObject jsonObject = null;
        String barnid = null, shelfid = null, spuid = null, skuid = null, count = null, agencyid = null, merchantid = null;
        String shelfCode = this.tvShelfCode.getText().toString();
        if (TextUtils.isEmpty(shelfCode)) {
            super.show("先ずはシェルフ情報を取得してください。");
            return;
        } else {
            jsonObject = new JSONObject(shelfCode);
            if (jsonObject.has("bid")) {
                barnid = jsonObject.getString("bid");
            }
            if (jsonObject.has("sid")) {
                shelfid = jsonObject.getString("sid");
            }
        }
        if (TextUtils.isEmpty(barnid)
                || TextUtils.isEmpty(shelfid)) {
            super.show("先ずはシェルフ情報を取得してください。");
            return;
        }
        String skuCode = this.tvSkuCode.getText().toString();
        if (TextUtils.isEmpty(skuCode)) {
            super.show("先ずはＳＫＵ情報を取得してください。");
            return;
        } else {
            jsonObject = new JSONObject(skuCode);
            if (jsonObject.has("spu")) {
                spuid = jsonObject.getString("spu");
            }
            if (jsonObject.has("sku")) {
                skuid = jsonObject.getString("sku");
            }
        }
        if (TextUtils.isEmpty(barnid)
                || TextUtils.isEmpty(shelfid)) {
            super.show("先ずはＳＫＵ情報を取得してください。");
            return;
        }
        KeyValue selectedItem = (KeyValue) this.spnAgency.getSelectedItem();
        if (selectedItem != null) {
            agencyid = selectedItem.getKey();
        } else {
            agencyid = "0";
        }
        selectedItem = (KeyValue) this.spnMerchant.getSelectedItem();
        if (selectedItem != null) {
            merchantid = selectedItem.getKey();
        } else {
            merchantid = "0";
        }
        count = this.txtCount.getText().toString();
        if (TextUtils.isEmpty(count)) {
            super.show("先ずは出荷数量情報を入力してください。");
            return;
        }
        Map<String, String> paramMap = new HashMap<>(7);
        paramMap.put("barnid", barnid);
        paramMap.put("shelfid", shelfid);
        paramMap.put("spuid", spuid);
        paramMap.put("skuid", skuid);
        paramMap.put("agencyid", agencyid);
        paramMap.put("merchantid", merchantid);
        paramMap.put("count", count);

        String url = super.getUrl("OutStore");
        Map<String, String> headMap = super.getHeadMap();

        super.store(this.logger, url, paramMap, headMap, "OutStore", "出荷する"
                , () -> {
                    OutFragment.this.getActivity().runOnUiThread(() -> {
                        OutFragment.super.show("出荷成功している。");
                        OutFragment.this.reset();
                    });
                }
                , null);

    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        //扫描结果回调
        if (requestCode == Constant.REQ_QR_CODE && resultCode == RESULT_OK) {
            Bundle bundle = data.getExtras();
            String scanResult = bundle.getString(Constant.INTENT_EXTRA_KEY_QR_SCAN);
            if (!TextUtils.isEmpty(scanResult)) {
                try {
                    JSONObject jsonObject = new JSONObject(scanResult);
                    String type;
                    if (jsonObject.has("type")) {
                        type = jsonObject.getString("type");
                    } else {
                        type = null;
                    }
                    if ("sku".equalsIgnoreCase(type)) {
                        this.tvSkuCode.setText(scanResult);
                    } else {
                        //将扫描出的信息显示出来
                        this.tvShelfCode.setText(scanResult);
                    }
                } catch (JSONException e) {
                    this.logger.error("JSON 扫描结果", e);
                }
            }
        }
    }

}
