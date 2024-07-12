package jp.compamy.erpqrcode;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import androidx.annotation.NonNull;

import java.util.LinkedList;
import java.util.List;

/**
 * <pre>
 *
 * </pre>
 *
 * @author wangyunpeng
 * @date 2023/03/23 17:27
 */
public class ActivityUtils {

    private static List<Activity> activities = new LinkedList<>();

    public static void start(@NonNull Context context,
                             @NonNull Class<? extends Activity> activity) {
        context.startActivity(new Intent(context, activity));
    }

    public static void addToList(Activity activity) {
        activities.add(activity);
    }

    public static void removeFromList(Activity activity) {
        int index = activities.indexOf(activity);
        if (index != -1) {
            activities.remove(activity);
        }
    }

    public static Activity currentActivity() {
        return activities.get(0);
    }

    public static void finishAll() {
        for (Activity activity : activities) {
            activity.finish();
        }
    }
}
