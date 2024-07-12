package jp.compamy.javatextrecognitiondemo2;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.pm.PackageManager;
import android.media.Image;
import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.camera.core.CameraSelector;
import androidx.camera.core.ImageAnalysis;
import androidx.camera.core.ImageProxy;
import androidx.camera.core.Preview;
import androidx.camera.lifecycle.ProcessCameraProvider;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.common.util.concurrent.ListenableFuture;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.japanese.JapaneseTextRecognizerOptions;

import java.util.concurrent.Executors;

import jp.compamy.javatextrecognitiondemo2.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;
    private ProcessCameraProvider cameraProvider;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        requestPermission();
        binding.btnOperation.setOnClickListener(view -> {
            if (cameraProvider != null) {
                binding.btnOperation.setText("点击开始文本识别");
                cameraProvider.unbindAll();
                cameraProvider = null;
            } else {
                binding.btnOperation.setText("点击停止文本识别");
                setupCamera();
            }
        });
    }

    /**
     * 申请相机权限
     */
    private void requestPermission()  {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_CODE);
        } else {
            setupCamera();
        }
    }

    /**
     * 设置相机
     */
    private void setupCamera()  {
        ListenableFuture<ProcessCameraProvider> cameraProviderFuture = ProcessCameraProvider.getInstance(this);
        cameraProviderFuture.addListener(() -> {
            try {
                cameraProvider = cameraProviderFuture.get();
                bindPreview(cameraProvider);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }, ContextCompat.getMainExecutor(this));
    }

    /**
     * 绑定 preview
     */
    private void bindPreview(ProcessCameraProvider cameraProvider) {
        this.cameraProvider = cameraProvider;
        Preview preview = new Preview.Builder().build();
        CameraSelector cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA;
        preview.setSurfaceProvider(binding.preView.getSurfaceProvider());
        ImageAnalysis analysis = new ImageAnalysis.Builder()
                .setOutputImageFormat(ImageAnalysis.OUTPUT_IMAGE_FORMAT_YUV_420_888)
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build();
        analysis.setAnalyzer(Executors.newSingleThreadExecutor(), this::analyzeImage);
        cameraProvider.bindToLifecycle(this, cameraSelector, preview, analysis);
    }

    /**
     * 解析文本
     */
    @SuppressLint("UnsafeOptInUsageError")
    private void analyzeImage(ImageProxy imageProxy) {
        if (imageProxy == null) {
            return;
        }
        Image image = imageProxy.getImage();
        if (image == null) {
            return;
        }
        InputImage inputImage = InputImage.fromMediaImage(image, imageProxy.getImageInfo().getRotationDegrees());
        JapaneseTextRecognizerOptions options = new JapaneseTextRecognizerOptions.Builder().build();
        TextRecognizer recognizer = TextRecognition.getClient(options);
        recognizer.process(inputImage)
                .addOnSuccessListener(result -> {
                    binding.tvContent.setText(result.getText());
                })
                .addOnCompleteListener(task -> {
                    imageProxy.close();
                })
                .addOnFailureListener(e -> {
                    e.printStackTrace();
                    imageProxy.close();
                });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == CAMERA_PERMISSION_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                setupCamera();
            } else {
                Toast.makeText(this, "权限被拒绝", Toast.LENGTH_SHORT).show();
            }
        }
    }

    private static final int CAMERA_PERMISSION_CODE = 100;
}


