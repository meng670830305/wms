package jp.com.module;


import com.alibaba.fastjson2.JSONWriter;
import jp.com.helper.JsonHelper;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * <pre>
 *  返回JSON数据方法
 * </pre>
 * <p>
 * http://www.cnblogs.com/taoweiji/p/3174720.html
 *
 * @author wangyunpeng
 * @date 2020/11/7 13:48
 */
public final class JsonManager {

	public static EJsonErrorType jsonErrorType = EJsonErrorType.Message;

	/**
	 * java数据类型序列化对象到json字符串
	 *
	 * @param object
	 * @return
	 */
	public static String serialize(Object object) {
		return JsonHelper.serialize(object, JsonHelper.features);
	}

	/**
	 * java数据类型序列化对象到json字符串
	 *
	 * @param object
	 * @param features
	 * @return
	 */
	public static String serialize(Object object, JSONWriter.Feature... features) {
		return JsonHelper.serialize(object, features);
	}

	/**
	 * 反序列化json字符串到java数据类型
	 *
	 * @param jsonString
	 * @param cls
	 * @return
	 */
	public static <T> T deserialize(String jsonString, Class<T> cls) {
		return JsonHelper.deserialize(jsonString, cls);
	}

	/**
	 * 返回成功数据
	 *
	 * @return
	 */
	public static String getSuccess() {
		return getSuccess((Object) null, "操作成功!");
	}

	/**
	 * 返回成功数据
	 *
	 * @param msg
	 * @return
	 */
	public static String getSuccess(String msg) {
		return getSuccess((Object) null, msg);
	}

	/**
	 * 返回成功数据
	 *
	 * @param data
	 * @return
	 */
	public static String getSuccess(Object data) {
		return getSuccess(data, null);
	}

	/**
	 * 返回成功数据
	 *
	 * @param data
	 * @param msg
	 * @return
	 */
	public static String getSuccess(Object data, String msg) {
		return getSuccess(data, msg, (String) null);
	}

	public static String getSuccess(Object data, String msg, String time) {
		JsonModel jsonModel = new JsonModel(0, true, null, msg, data, time);
		return get(jsonModel);
	}

	/**
	 * 返回成功数据
	 *
	 * @param totalCount 总条数
	 * @param rows       某一页数据
	 * @return
	 */
	public static String getSuccess(Integer totalCount, Object rows) {
		ListData listData = new ListData(totalCount, rows);
		return getSuccess(listData, null);
	}

	public static String getSuccess(Integer totalCount, Object rows, String time) {
		ListData listData = new ListData(totalCount, rows);
		return getSuccess(listData, (String) null, time);
	}

	/**
	 * 返回成功数据，支持footer数据
	 *
	 * @param totalCount 总条数
	 * @param rows       某一页数据
	 * @param footer     footer数据
	 * @return
	 */
	public static String getSuccess(Integer totalCount, Object rows, Object footer) {
		ListData listData = new ListData(totalCount, rows, footer);
		return getSuccess(listData, null);
	}

	public static String getSuccess(Integer totalCount, Object rows, Object footer, String time) {
		ListData listData = new ListData(totalCount, rows, footer);
		return getSuccess(listData, (String) null, time);
	}

	/**
	 * 返回错误数据
	 *
	 * @param code
	 * @param msg
	 * @return
	 */
	public static String getError(int code, String msg) {
		return getError(Integer.valueOf(code), msg);
	}

	/**
	 * 返回错误数据
	 *
	 * @param code
	 * @param msg
	 * @return
	 */
	public static String getError(Integer code, String msg) {
		return getError(code, msg, (String) null);
	}

	/**
	 * 返回错误数据
	 *
	 * @param code
	 * @param error
	 * @return
	 * @throws IOException
	 */
	public static String getError(Integer code, Throwable error) throws IOException {
		StringBuffer sb = new StringBuffer();
		if (error != null) {
			sb.append(error.getMessage());
			StackTraceElement[] stackTraceElements = error.getStackTrace();
			if (stackTraceElements.length > 0) {
				sb.append('\n');
				sb.append(stackTraceElements[0].toString());
			}
		}
		return getError(code, sb.toString(), error);
	}

	/**
	 * 返回错误数据
	 *
	 * @param code
	 * @param msg
	 * @param error
	 * @return
	 */
	public static String getError(Integer code, String msg, String error) {
		return getError(code, msg, error == null ? null : new String[]{error});
	}

	/**
	 * 返回错误数据
	 *
	 * @param code
	 * @param msg
	 * @param error
	 * @return
	 */
	public static String getError(Integer code, String msg, String[] error) {
		JsonModel jsonModel = new JsonModel(code, false, error, msg, null, null);
		return get(jsonModel);
	}

	/**
	 * 返回错误数据
	 *
	 * @param code
	 * @param msg
	 * @param error
	 * @return
	 * @throws IOException
	 */
	public static String getError(Integer code, String msg, Throwable error) throws IOException {
		return getError(code, msg, new String[]{getException(error)});
	}

	/**
	 * 返回错误数据
	 *
	 * @param code
	 * @param msg
	 * @param error
	 * @return
	 * @throws IOException
	 */
	public static String getError(Integer code, String msg, Throwable[] error) throws IOException {
		JsonModel jsonModel = new JsonModel(code, false, getException(error), msg, null, null);
		return get(jsonModel);
	}

	private static String getException(Throwable error) throws IOException {
		if (error == null)
			return null;
		if (jsonErrorType == EJsonErrorType.Message) {
			return error.getMessage();
		} else if (jsonErrorType == EJsonErrorType.Stack) {
			try (StringWriter sw = new StringWriter()) {
				try (PrintWriter pw = new PrintWriter(sw)) {
					pw.println();
					error.printStackTrace(pw);
				}
				return sw.toString();
			}
		} else {
			return error.toString();
		}
	}

	private static String[] getException(Throwable[] errors) throws IOException {
		if (errors == null)
			return null;
		String[] es = null;
		es = new String[errors.length];
		for (int i = 0; i < errors.length; i++) {
			es[i] = getException(errors[i]);
		}
		return es;
	}

	private static String get(JsonModel jsonModel) {
		if (jsonModel == null) {
			throw new IllegalArgumentException("jsonModel对象不能为空！");
		}
		return JsonHelper.serialize(jsonModel, JsonHelper.features);
	}

}