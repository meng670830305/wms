package jp.compamy.javascancodedemo1;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.pm.PackageManager;
import android.media.Image;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.camera.core.CameraSelector;
import androidx.camera.core.ImageAnalysis;
import androidx.camera.core.ImageProxy;
import androidx.camera.core.Preview;
import androidx.camera.lifecycle.ProcessCameraProvider;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.common.util.concurrent.ListenableFuture;
import com.google.mlkit.vision.barcode.BarcodeScanner;
import com.google.mlkit.vision.barcode.BarcodeScanning;
import com.google.mlkit.vision.barcode.common.Barcode;
import com.google.mlkit.vision.common.InputImage;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import jp.compamy.javascancodedemo1.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "CameraX-";
    private ExecutorService cameraExecutors;
    private BarcodeScanner scanner;
    private ListenableFuture<ProcessCameraProvider> cameraProviderFuture;
    private ProcessCameraProvider cameraProvider;
    private Preview previewUseCase;
    private ImageAnalysis analysisUseCase;
    private CameraSelector cameraSelector;
    private final int PERMISSION_WRITE_EX_STR = 1;
    private final String[] PERMISSIONS = {
            Manifest.permission.CAMERA
    };

    private ActivityMainBinding binding;

    @RequiresApi(api = Build.VERSION_CODES.R)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // パーミッションをリクエスト
        permissionRequest();

        // スレッドを作成
        cameraExecutors = Executors.newSingleThreadExecutor();

//        bindCameraUseCases();

        binding.stopButton.setOnClickListener(v -> stopPreview());
        binding.startButton.setOnClickListener(v -> {
            bindCameraUseCases();
        });
    }

    private void bindCameraUseCases() {
        cameraProviderFuture = ProcessCameraProvider.getInstance(this);
        cameraProviderFuture.addListener(() -> {
            try {
                cameraProvider = cameraProviderFuture.get();

                // preview部分にカメラ画像を表示
                previewUseCase = new Preview.Builder().build();
                previewUseCase.setSurfaceProvider(binding.previewView.getSurfaceProvider());

                /*
                スキャンできるバーコードの型を設定しておくことが可能
                未指定の場合は自動判定が可能
                今回はコメントアウト
                 */
//                BarcodeScannerOptions.Builder().setBarcodeFormats(
//                    Barcode.FORMAT_QR_CODE,
//                    Barcode.FORMAT_CODABAR,
//                    Barcode.FORMAT_CODE_128,
//                    Barcode.FORMAT_CODE_39,
//                    Barcode.FORMAT_CODE_93,
//                    Barcode.FORMAT_EAN_8,
//                    Barcode.FORMAT_EAN_13,
//                ).build()

                // CameraSelector.DEFAULT_BACK_CAMERA  背面カメラ
                // CameraSelector.DEFAULT_FRONT_CAMERA 前面カメラ
                cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA;
                scanner = BarcodeScanning.getClient();

                analysisUseCase = new ImageAnalysis.Builder().build();
                analysisUseCase.setAnalyzer(cameraExecutors, imageProxy -> processImageProxy(scanner, imageProxy));

                startPreview();
            } catch (Exception e) {
                Log.e(TAG, e.getMessage());
            }
        }, ContextCompat.getMainExecutor(this));
    }

    @SuppressLint("UnsafeOptInUsageError")
    private void processImageProxy(BarcodeScanner barcodeScanner, ImageProxy imageProxy) {

        Image image = imageProxy.getImage();
        if (image != null) {
            InputImage inputImage = InputImage.fromMediaImage(image, imageProxy.getImageInfo().getRotationDegrees());
            barcodeScanner.process(inputImage)
                    .addOnSuccessListener(barcodeList -> {
                        if (barcodeList.size() > 0) {
                            Barcode barcode = barcodeList.get(0);
                            if (barcode != null) {
                                String value = barcode.getRawValue();
                                if (!value.isEmpty()) {
                                    binding.barcodeView.setText(value);
                                }
                            }
                        }
                    })
                    .addOnFailureListener(e -> Log.e(TAG, e.getMessage()))
                    .addOnCompleteListener(task -> {
                        imageProxy.getImage().close();
                        imageProxy.close();
                    });
        }
    }

    private void startPreview() {
        try {
            cameraProvider.bindToLifecycle(
                    this,
                    cameraSelector,
                    previewUseCase,
                    analysisUseCase
            );
        } catch (IllegalStateException e) {
            Log.e(TAG, e.getMessage());
        } catch (IllegalArgumentException e) {
            Log.e(TAG, e.getMessage());
        }
    }

    private void stopPreview() {
        // previewViewへの投影を停止
        cameraProvider.unbind(previewUseCase);
        // バーコードスキャンを停止
        scanner.close();
    }

    // パーミッションのリクエスト
    private void permissionRequest() {
        if (Build.VERSION.SDK_INT >= 23) {
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, PERMISSIONS, PERMISSION_WRITE_EX_STR);
            } else {
                Log.d("Permission is", "OK");
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_WRITE_EX_STR) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                bindCameraUseCases();
            } else {
                Toast.makeText(this, "权限被拒绝", Toast.LENGTH_SHORT).show();
            }
        }
    }
}


