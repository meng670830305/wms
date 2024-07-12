package jp.com.module;

import org.apache.commons.lang3.StringUtils;
import jp.com.helper.Date8Helper;
import jp.com.helper.MapHelper;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;

public class HtmlHelper {
    private static final String HIDDEN_HTML = "<input type=\"hidden\" id=\"%s\" name=\"%s\" value=\"%s\" />";
    private static final String TEXT_HTML = "<input type=\"text\" id=\"%s\" name=\"%s\" value=\"%s\" %s />";
    private static final String PASSWORD_HTML = "<input type=\"password\" id=\"%s\" name=\"%s\" value=\"%s\" %s />";
    private static final String RADIO_HTML = "<input type=\"radio\" id=\"%s\" name=\"%s\" value=\"%s\" %s %s />";
    private static final String CHECKBOX_HTML = "<input type=\"checkbox\" id=\"%s\" name=\"%s\" value=\"%s\" %s %s />";
    private static final String TEXTAREA_HTML = "<textarea id=\"%s\" name=\"%s\" %s>%s</textarea>";
    private static final String A_HTML = "<a href=\"javascript:void(0)\" id=\"%s\" name=\"%s\" data-options=\"%s\" %s title=\"%s\">%s</a>";
    private static final String SELECT_HTML = "<select id=\"%s\" name=\"%s\" %s></select>";

    /**
     * 返回隐藏域的HTML标签
     *
     * @param name
     * @param value
     * @return
     */
    public static String Hidden(String name, Object value) {
        if (value instanceof LocalDateTime) {
            value = Date8Helper.toStringYYYY_MM_DD_HH_MM_SS((LocalDateTime) value);
        } else if (value instanceof Date) {
            value = Date8Helper.toStringYYYY_MM_DD_HH_MM_SS((Date) value);
        }
        return String.format(HIDDEN_HTML, name, name, value);
    }

    /**
     * 返回单行文本框的HTML标签
     *
     * @param name
     * @param value
     * @param htmlAttributes
     * @return
     */
    public static String TextBox(String name, Object value, String... htmlAttributes) {
        Map<String, String> htmlAttributeMap = MapHelper.strings2Map(htmlAttributes);
        StringBuffer sb = new StringBuffer();
        for (Map.Entry<String, String> entry : htmlAttributeMap.entrySet()) {
            sb.append(String.format(" %s=\"%s\"", entry.getKey(), entry.getValue()));
        }
        String attribute = sb.toString();
        if (value instanceof LocalDateTime) {
            value = Date8Helper.toStringYYYY_MM_DD_HH_MM_SS((LocalDateTime) value);
        } else if (value instanceof Date) {
            value = Date8Helper.toStringYYYY_MM_DD_HH_MM_SS((Date) value);
        }
        return String.format(TEXT_HTML, name, name, value, attribute);
    }

    /**
     * 返回密码框的HTML标签
     *
     * @param name
     * @param value
     * @param htmlAttributes
     * @return
     */
    public static String Password(String name, Object value, String... htmlAttributes) {
        Map<String, String> htmlAttributeMap = MapHelper.strings2Map(htmlAttributes);
        StringBuffer sb = new StringBuffer();
        for (Map.Entry<String, String> entry : htmlAttributeMap.entrySet()) {
            sb.append(String.format(" %s=\"%s\"", entry.getKey(), entry.getValue()));
        }
        String attribute = sb.toString();
        return String.format(PASSWORD_HTML, name, name, value, attribute);
    }

    /**
     * 返回多行文本框的HTML标签
     *
     * @param name
     * @param value
     * @param htmlAttributes
     * @return
     */
    public static String TextArea(String name, Object value, String... htmlAttributes) {
        Map<String, String> htmlAttributeMap = MapHelper.strings2Map(htmlAttributes);
        StringBuffer sb = new StringBuffer();
        for (Map.Entry<String, String> entry : htmlAttributeMap.entrySet()) {
            sb.append(String.format(" %s=\"%s\"", entry.getKey(), entry.getValue()));
        }
        String attribute = sb.toString();
        return String.format(TEXTAREA_HTML, name, name, attribute, value);
    }

    /**
     * 返回单选按钮的HTML标签
     *
     * @param id
     * @param name
     * @param value
     * @param checked
     * @return
     */
    public static String RadioButton(String id, String name, Object value, Boolean checked) {
        return RadioButton(id, name, value, checked, new String[0]);
    }

    /**
     * 返回单选按钮的HTML标签
     *
     * @param id
     * @param name
     * @param value
     * @param checked
     * @param htmlAttributes
     * @return
     */
    public static String RadioButton(String id, String name, Object value, Boolean checked, String... htmlAttributes) {
        return String.format(RADIO_HTML, id, name, value, checked.booleanValue() ? "checked=\"checked\"" : "", getAttrubuteWithoutClass(htmlAttributes));
    }

    /**
     * 返回多选按钮的HTML标签
     *
     * @param id
     * @param name
     * @param value
     * @param checked
     * @return
     */
    public static String CheckBox(String id, String name, Object value, Boolean checked) {
        return CheckBox(id, name, value, checked, new String[0]);
    }

    /**
     * 返回多选按钮的HTML标签
     *
     * @param id
     * @param name
     * @param value
     * @param checked
     * @param htmlAttributes
     * @return
     */
    public static String CheckBox(String id, String name, Object value, Boolean checked, String... htmlAttributes) {
        return String.format(CHECKBOX_HTML, id, name, value, checked.booleanValue() ? "checked=\"checked\"" : "", getAttrubuteWithoutClass(htmlAttributes));
    }

    /**
     * 返回Select的HTML标签
     *
     * @param id
     * @param name
     * @param htmlAttributes
     * @return
     */
    public static String Select(String id, String name, String... htmlAttributes) {
        return String.format(SELECT_HTML, id, name, getAttrubuteWithoutClass(htmlAttributes));
    }

    /**
     * 返回超链接按钮的HTML标签（普通按钮）
     *
     * @param text
     * @param id
     * @param icon
     * @return
     */
    public static String Button(String text, String id, String icon) {
        return Button(text, id, icon, new String[0]);
    }

    /**
     * 返回超链接按钮的HTML标签（普通按钮）
     *
     * @param text
     * @param id
     * @param icon
     * @param htmlAttributeMap
     * @return
     */
    public static String Button(String text, String id, String icon, String... htmlAttributes) {
        return A(text, id, icon, false, htmlAttributes);
    }

    /**
     * 返回超链接按钮的HTML标签（扁平风格的按钮）
     *
     * @param text
     * @param id
     * @param icon
     * @return
     */
    public static String PlainButton(String text, String id, String icon) {
        return PlainButton(text, id, icon, new String[0]);
    }

    /**
     * 返回超链接按钮的HTML标签（扁平风格的按钮）
     *
     * @param text
     * @param id
     * @param icon
     * @param htmlAttributeMap
     * @return
     */
    public static String PlainButton(String text, String id, String icon, String... htmlAttributes) {
        return A(text, id, icon, true, htmlAttributes);
    }

    private static String A(String text, String id, String icon, boolean plain, String... htmlAttributes) {
        String dataOption = "plain:" + (plain ? "true" : "false");
        if (StringUtils.isNotBlank(icon)) {
            dataOption += String.format(",iconCls:'%s'", icon);
        }
        if (text == null) {
            text = "";
        }
        return String.format(A_HTML, id, id, dataOption, getAttrubuteWithinClass(htmlAttributes), text, text);
    }

    /**
     * 返回带有class的HTML属性
     *
     * @param htmlAttributes
     * @return
     */
    private static String getAttrubuteWithinClass(String... htmlAttributes) {
        StringBuffer sb = new StringBuffer();
        Map<String, String> htmlAttributeMap = MapHelper.strings2Map(htmlAttributes);
        if (htmlAttributeMap.containsKey("class")) {
            htmlAttributeMap.put("class", htmlAttributeMap.get("class") + " " + "easyui-linkbutton");
        } else {
            htmlAttributeMap.put("class", "easyui-linkbutton");
        }
        for (Map.Entry<String, String> entry : htmlAttributeMap.entrySet()) {
            sb.append(String.format(" %s=\"%s\"", entry.getKey(), entry.getValue()));
        }
        return sb.toString();
    }

    /**
     * 返回不带有class的HTML属性
     *
     * @param htmlAttributes
     * @return
     */
    private static String getAttrubuteWithoutClass(String... htmlAttributes) {
        StringBuffer sb = new StringBuffer();
        Map<String, String> htmlAttributeMap = MapHelper.strings2Map(htmlAttributes);
        for (Map.Entry<String, String> entry : htmlAttributeMap.entrySet()) {
            sb.append(String.format(" %s=\"%s\"", entry.getKey(), entry.getValue()));
        }
        return sb.toString();
    }
}
