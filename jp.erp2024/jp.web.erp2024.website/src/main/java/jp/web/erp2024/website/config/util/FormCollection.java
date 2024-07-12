/**
 * (tb.web.csharp)包
 * <p>
 * wangyp Copyright 2006-2015
 * 文件： FormCollection.java
 * 项目名称：工程项目管理
 * 创建时间：2015/7/14
 * 负责人：wangyp
 */
package jp.web.erp2024.website.config.util;


//<editor-fold desc="Description">

import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.InvocationTargetException;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Map;
import java.util.Set;

/**
 * 模拟ASP.NET MVC里面的FormCollection类型
 *
 * @author wangyunpeng
 */


public class FormCollection {

    /**
     * 获取Request对象中请求参数的Map对象类型
     *
     * @param request
     * @return
     */
    public static Map<String, String> toMap(HttpServletRequest request) {
        Map<String, String> map = new Hashtable<String, String>();
        Enumeration<String> enumeration = request.getParameterNames();
        String key = null;
        while (enumeration.hasMoreElements()) {
            key = enumeration.nextElement();
            map.put(key, request.getParameter(key));
        }
        return map;
    }

    /**
     * 获取Request对象中请求参数的Map对象类型
     *
     * @param request
     * @return
     */
    public static Map<String, String[]> toMaps(HttpServletRequest request) {
        return request.getParameterMap();
    }

    /**
     * 获取Request对象中请求参数的Map对象类型
     *
     * @param request
     * @return
     */
    public static Map<String, ParameterValue> toParameterValueMap(HttpServletRequest request) {
        Map<String, ParameterValue> map = new Hashtable<String, ParameterValue>();
        Enumeration<String> enumeration = request.getParameterNames();
        String key = null;
        while (enumeration.hasMoreElements()) {
            key = enumeration.nextElement();
            map.put(key, new ParameterValue(request.getParameter(key)));
        }
        return map;
    }

    /**
     * 获取Request对象中请求参数的自定义对象类型
     *
     * @param cls
     * @param request
     * @return
     * @throws InstantiationException
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     */
    public static <T> T toEntity(Class<T> cls, HttpServletRequest request) throws InstantiationException, IllegalAccessException, InvocationTargetException {
        T entity = cls.newInstance();
        // 把请求中的参数取出
        String name = null;
        String[] value = null;
        Map<String, String[]> params = request.getParameterMap();
        Set<Map.Entry<String, String[]>> entries = params.entrySet();
        for (Map.Entry<String, String[]> item : entries) {
            name = item.getKey();
            value = item.getValue();
            if (StringUtils.isNotBlank(name) && value != null) {
                if (value.length == 1) {
                    BeanUtils.copyProperty(entity, name, value[0]);
                } else {
                    // 程序会自动调用StringArrayConcatConverter类型(在这里HttpServletInit.init()设置过)，将String[]数组类型转成String类型，使用","连接数组每一个元素。
                    BeanUtils.copyProperty(entity, name, value);
                }
            }
        }
        return entity;
    }
}
//</editor-fold>
