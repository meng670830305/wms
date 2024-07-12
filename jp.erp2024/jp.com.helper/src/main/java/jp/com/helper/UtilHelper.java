package jp.com.helper;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringEscapeUtils;

import java.io.*;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.net.InetAddress;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.net.UnknownHostException;

/**
 * <pre>
 * 应用工具帮助类型
 * </pre>
 *
 * @author wangyunpeng
 * @date 2021/1/15 23:23
 */
public class UtilHelper {

    /**
     * 深拷贝
     *
     * @param source
     * @param <T>
     * @return
     * @throws IOException
     * @throws ClassNotFoundException
     */
    public static <T> T clone(T source) throws IOException, ClassNotFoundException {
        T target = null;
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            try (ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream)) {
                objectOutputStream.writeObject(source);
                // 将流序列化成对象
                try (ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray())) {
                    try (ObjectInputStream objectInputStream = new ObjectInputStream(byteArrayInputStream)) {
                        target = (T) objectInputStream.readObject();
                    }
                }
            }
        }
        return target;
    }

    // region 复制一个对象的所有属性值到另外一个对象的同名属性值上去。

    /**
     * 将一个对象的所有属性值复制到另外一个对象的同名属性上去。(Apache BeanUtils的性能最差)
     * * <p>
     * * org.springframework.beans.BeanUtils比Apache BeanUtils的性能好
     *
     * @param orgi
     * @param desc
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     */
    public static void copyProperties(Object orgi, Object desc) throws IllegalAccessException, InvocationTargetException {
        BeanUtils.copyProperties(orgi, desc);
    }

    /**
     * 将一个对象的所有属性值复制到另外一个对象的同名属性上去。(自定义的，支持属性名不区分大小写)
     *
     * @param srcObject  源对象
     * @param srcFields  源对象字段
     * @param descObject 目标对象
     * @param descFields 目标对象字段
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     */
    public static void copyPropertiesIgnoreCase(Object srcObject, Field[] srcFields, Object descObject, Field[] descFields) throws IllegalArgumentException, IllegalAccessException {
        String descFieldName = null, srcFieldName = null;
        Object fieldValue = null;
        for (Field descField : descFields) {
            descFieldName = descField.getName();
            for (Field srcField : srcFields) {
                srcFieldName = srcField.getName();
                if (descFieldName.equalsIgnoreCase(srcFieldName)) {
                    srcField.setAccessible(true);
                    fieldValue = srcField.get(srcObject);
                    if (fieldValue != null) {
                        descField.setAccessible(true);
                        descField.set(descObject, fieldValue);
                    }
                    break;
                }
            }
        }
    }

    // endregion

    // region Unicode 编码、解码

    /**
     * Unicode 编码,只有超过255的字符才转Unicode，区别于unicodeEncodeAll方法
     *
     * @param srcText
     * @return
     */
    public static String unicodeEncode(String srcText) {
        return StringEscapeUtils.escapeJava(srcText);
    }

    /**
     * Unicode 解码,只有Unicode字符才转字符串，区别于unicodeDecodeAll方法
     *
     * @param srcText
     * @return
     */
    public static String unicodeDecode(String srcText) {
        return StringEscapeUtils.unescapeJava(srcText);
    }

    /**
     * Unicode 编码
     * <p>
     * 字符串转换unicode,所有的字符都转Unicode，区别于unicodeEncode方法
     */
    public static String unicodeEncodeAll(String string) {
        String result = null;
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < string.length(); i++) {
            // 取出每一个字符
            char c = string.charAt(i);
            // 转换为unicode
            sb.append("\\u" + Integer.toHexString(c));
        }
        result = sb.toString();
        sb.delete(0, sb.length() - 1);
        sb = null;
        return result;
    }

    /**
     * Unicode 解码
     * <p>
     * unicode 转字符串,所有的Unicode字符才转字符串，区别于unicodeDecode方法
     */
    public static String unicodeDecodeAll(String unicode) {
        String result = null;
        StringBuffer sb = new StringBuffer();
        String[] hexs = unicode.split("\\\\u");
        for (int i = 1; i < hexs.length; i++) {
            // 转换出每一个代码点
            int hex = Integer.parseInt(hexs[i], 16);
            // 追加成string
            sb.append((char) hex);
        }
        result = sb.toString();
        sb.delete(0, sb.length() - 1);
        sb = null;
        return result;
    }

    // endregion

    // region Base 64 编码、解码

    /**
     * Base64 编码
     *
     * @param srcText
     * @return
     */
    public static String base64Encode(String srcText) {
        return toBase64String(srcText.getBytes());
    }

    /**
     * Base64 解码
     *
     * @param srcText
     * @return
     */
    public static String base64Decode(String srcText) {
        return new String(Base64.decodeBase64(srcText));
    }

    public static String toBase64String(byte[] bytes) {
        return Base64.encodeBase64String(bytes);
    }

    public static byte[] fromBase64String(String string) {
        return Base64.decodeBase64(string);
    }

    // endregion

    // region JSON 与 字符串互相转换

    /**
     * JSON 编码
     *
     * @param srcText
     * @return
     */
    public static String jsonEncode(String srcText) {
        return StringEscapeUtils.escapeJson(srcText);
    }

    /**
     * JSON 解码
     *
     * @param srcText
     * @return
     */
    public static String jsonDecode(String srcText) {
        return StringEscapeUtils.unescapeJson(srcText);
    }

    // endregion

    // region XML 编码、解码

    /**
     * XML 编码
     *
     * @param srcText
     * @return
     */
    public static String xmlEncode(String srcText) {
        return StringEscapeUtils.escapeXml11(srcText);
    }

    /**
     * XML 解码
     *
     * @param srcText
     * @return
     */
    public static String xmlDecode(String srcText) {
        return StringEscapeUtils.unescapeXml(srcText);
    }

    // endregion

    // region HTML 编码、解码

    /**
     * HTML 编码
     * <p>
     * HtmlUtils.htmlEscape(SpringMVC)
     *
     * @param srcText
     * @return
     */
    @Deprecated
    public static String htmlEncode(String srcText) {
        return StringEscapeUtils.escapeHtml4(srcText);
    }

    /**
     * HTML 解码 有问题
     * <p>
     * <p>
     * HtmlUtils.htmlUnescape(SpringMVC)
     *
     * @param srcText
     * @return
     */
    @Deprecated
    public static String htmlDecode(String srcText) {
        return StringEscapeUtils.unescapeHtml4(srcText);
    }

    // endregion

    // region URL 编码、解码

    /**
     * URL 编码
     *
     * @param srcText
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String urlEncode(String srcText) throws UnsupportedEncodingException {
        // return new String(URLCodec.encodeUrl(new BitSet(), srcText.getBytes()));
        return URLEncoder.encode(srcText, "UTF-8");
    }

    /**
     * URL 解码
     *
     * @param srcText
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String urlDecode(String srcText) throws UnsupportedEncodingException {
        // return new String(URLCodec.decodeUrl(srcText.getBytes()));
        return URLDecoder.decode(srcText, "UTF-8");
    }

    // endregion

    // region IP 地址

    /**
     * 获取IP地址
     *
     * @return
     */
    public static String getHostIp() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
        }
        return "127.0.0.1";
    }

    /**
     * 获取主机名
     *
     * @return
     */
    public static String getHostName() {
        try {
            return InetAddress.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
        }
        return "未知";
    }

    /**
     * 是否为内网IP地址
     *
     * @param ip
     * @return
     */
    public static boolean internalIp(String ip) {
        byte[] addr = textToNumericFormatV4(ip);
        return internalIp(addr) || "127.0.0.1".equals(ip);
    }

    private static boolean internalIp(byte[] addr) {
        if (addr == null || addr.length < 2) {
            return true;
        }
        final byte b0 = addr[0];
        final byte b1 = addr[1];
        // 10.x.x.x/8
        final byte SECTION_1 = 0x0A;
        // 172.16.x.x/12
        final byte SECTION_2 = (byte) 0xAC;
        final byte SECTION_3 = (byte) 0x10;
        final byte SECTION_4 = (byte) 0x1F;
        // 192.168.x.x/16
        final byte SECTION_5 = (byte) 0xC0;
        final byte SECTION_6 = (byte) 0xA8;
        switch (b0) {
            case SECTION_1:
                return true;
            case SECTION_2:
                if (b1 >= SECTION_3 && b1 <= SECTION_4) {
                    return true;
                }
            case SECTION_5:
                switch (b1) {
                    case SECTION_6:
                        return true;
                }
            default:
                return false;
        }
    }

    /**
     * 将IPv4地址转换成字节
     *
     * @param text IPv4地址
     * @return byte 字节
     */
    public static byte[] textToNumericFormatV4(String text) {
        if (text.length() == 0) {
            return null;
        }

        byte[] bytes = new byte[4];
        String[] elements = text.split("\\.", -1);
        try {
            long l;
            int i;
            switch (elements.length) {
                case 1:
                    l = Long.parseLong(elements[0]);
                    if ((l < 0L) || (l > 4294967295L)) {
                        return null;
                    }
                    bytes[0] = (byte) (int) (l >> 24 & 0xFF);
                    bytes[1] = (byte) (int) ((l & 0xFFFFFF) >> 16 & 0xFF);
                    bytes[2] = (byte) (int) ((l & 0xFFFF) >> 8 & 0xFF);
                    bytes[3] = (byte) (int) (l & 0xFF);
                    break;
                case 2:
                    l = Integer.parseInt(elements[0]);
                    if ((l < 0L) || (l > 255L)) {
                        return null;
                    }
                    bytes[0] = (byte) (int) (l & 0xFF);
                    l = Integer.parseInt(elements[1]);
                    if ((l < 0L) || (l > 16777215L)) {
                        return null;
                    }
                    bytes[1] = (byte) (int) (l >> 16 & 0xFF);
                    bytes[2] = (byte) (int) ((l & 0xFFFF) >> 8 & 0xFF);
                    bytes[3] = (byte) (int) (l & 0xFF);
                    break;
                case 3:
                    for (i = 0; i < 2; ++i) {
                        l = Integer.parseInt(elements[i]);
                        if ((l < 0L) || (l > 255L)) {
                            return null;
                        }
                        bytes[i] = (byte) (int) (l & 0xFF);
                    }
                    l = Integer.parseInt(elements[2]);
                    if ((l < 0L) || (l > 65535L)) {
                        return null;
                    }
                    bytes[2] = (byte) (int) (l >> 8 & 0xFF);
                    bytes[3] = (byte) (int) (l & 0xFF);
                    break;
                case 4:
                    for (i = 0; i < 4; ++i) {
                        l = Integer.parseInt(elements[i]);
                        if ((l < 0L) || (l > 255L)) {
                            return null;
                        }
                        bytes[i] = (byte) (int) (l & 0xFF);
                    }
                    break;
                default:
                    return null;
            }
        } catch (NumberFormatException e) {
            return null;
        }
        return bytes;
    }

    // endregion

    // region 转换十六进制数
    /**
     * 转换十六进制数
     *
     * @param text
     * @return
     */
    public static String convertHex(String text) {
        return unicodeEncodeAll(text);
    }

    /**
     * 转换十六进制数
     *
     * @param digit
     * @return
     */
    public static String convertHex(Long digit) {
        return convertHex(digit.longValue());
    }

    /**
     * 转换十六进制数
     *
     * @param digit
     * @return
     */
    public static String convertHex(long digit) {
        return Long.toHexString(digit);
    }

    /**
     * 转换十六进制数
     *
     * @param digit
     * @return
     */
    public static String convertHex(Integer digit) {
        return convertHex(digit.intValue());
    }

    /**
     * 转换十六进制数
     *
     * @param digit
     * @return
     */
    public static String convertHex(int digit) {
        return Integer.toHexString(digit);
    }

    // endregion

    public static void main(String[] args) {
        long time = Date8Helper.getTime();
        System.out.println(time);

        String s = convertHex(time);
        System.out.println(s);

        s = unicodeEncodeAll("product is expired");
        System.out.println(s);
        s = unicodeDecodeAll(s);
        System.out.println(s);
        s = unicodeEncodeAll("select min(installed_on) from flyway_schema_history");
        System.out.println(s);
        s = unicodeDecodeAll(s);
        System.out.println(s);
    }
}
