package jp.com.helper;

/**
 * GUID是一个128位长的数字，一般用16进制表示。
 * 
 * @author wangyunpeng
 */
public class Guid {

	/**
	 * 返回空的GUID
	 * @return 返回00000000-0000-0000-0000-000000000000
	 */
	public static String empty() {
		StringBuffer sb = new StringBuffer();
		for (int i = 1; i <= 32; i++) {
			sb.append("0");
			if (i == 8 || i == 12 || i == 16 || i == 20) {
				sb.append("-");
			}
		}
		return sb.toString();
	}

}
