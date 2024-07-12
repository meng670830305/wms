package jp.com.module;

import com.alibaba.fastjson2.annotation.JSONField;

/**
 * <pre>
 * 返回json数据格式
 * </pre>
 *
 * @author wangyunpeng
 */
@SuppressWarnings("serial")
public class JsonModel implements java.io.Serializable {
	/**
	 *
	 */
	public JsonModel() {
		super();
	}

	/**
	 * @param code
	 * @param success
	 * @param error
	 * @param message
	 * @param data
	 */
	public JsonModel(int code, boolean success, String[] error, String message, Object data) {
		super();
		this.code = Integer.valueOf(code);
		this.success = Boolean.valueOf(success);
		this.error = error;
		this.message = message;
		this.data = data;
	}

	/**
	 * @param code
	 * @param success
	 * @param error
	 * @param message
	 * @param data
	 * @param time
	 */
	public JsonModel(int code, boolean success, String[] error, String message, Object data, String time) {
		this(code, success, error, message, data);
		this.time = time;
	}

	/**
	 * 错误码(0表示无错误)
	 */
	private Integer code;
	/**
	 * 是否成功
	 */
	private Boolean success;
	/**
	 * 错误信息
	 */
	private String[] error;
	/**
	 * 消息
	 */
	private String message;
	/**
	 * Json数据
	 */
	private Object data;
	/**
	 * 服务器处理时间
	 */
	private String time = null;
	/**
	 * 服务器响应时间
	 */
	private long responseTicks = java.util.Calendar.getInstance().getTimeInMillis();

	@JSONField(name = "Code")
	public Integer getCode() {
		return this.code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	@JSONField(name = "Success")
	public Boolean getSuccess() {
		return this.success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	@JSONField(name = "Error")
	public String[] getError() {
		return this.error;
	}

	public void setError(String[] error) {
		this.error = error;
	}

	@JSONField(name = "Message")
	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@JSONField(name = "Data")
	public Object getData() {
		return this.data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	/**
	 * @return the time
	 */
	@JSONField(name = "Time")
	public String getTime() {
		return time;
	}

	/**
	 * @param time the time to set
	 */
	public void setTime(String time) {
		this.time = time;
	}

	@JSONField(name = "ResponseTicks")
	public long getResponseTicks() {
		return this.responseTicks;
	}
}