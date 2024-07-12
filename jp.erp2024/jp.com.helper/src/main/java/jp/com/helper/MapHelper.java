package jp.com.helper;

import ognl.Ognl;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.beans.Introspector;
import java.lang.reflect.InvocationTargetException;
import java.net.URI;
import java.net.URL;
import java.util.*;

/**
 * Map类型帮助类
 * <p>
 * http://numen06.iteye.com/blog/2083186?utm_source=tuicool
 *
 * @author wangyunpeng
 * @date 2020/11/7 13:48
 */
@SuppressWarnings("unchecked")
public class MapHelper {

    /**
     * 对象转Map
     *
     * @param object
     * @return
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws NoSuchMethodException
     */
    public static Map<String, String> object2Map(Object object) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        return BeanUtils.describe(object);
    }

    /**
     * Map转对象
     *
     * @param orgi
     * @param desc
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     */
    public static <V> void map2Object(Map<String, V> orgi, Object desc) throws IllegalAccessException, InvocationTargetException {
        BeanUtils.populate(desc, mapKeyToCamelName(orgi));
    }

    /**
     * 将URI中的参数字符串转成Map对象
     *
     * @param uri
     * @return Map对象
     */
    public static Map<String, String> uri2Map(URI uri) {
        if (uri != null) {
            String query = uri.getQuery();
            if (StringUtils.isNotBlank(query)) {
                return strings2Map(StringUtils.split(query, "&"));
            }
        }
        return new HashMap<String, String>(0);
    }

    /**
     * 将URL中的参数字符串转成Map对象
     *
     * @param url
     * @return Map对象
     */
    public static Map<String, String> url2Map(URL url) {
        if (url != null) {
            String query = url.getQuery();
            if (StringUtils.isNotBlank(query)) {
                return strings2Map(StringUtils.split(query, "&"));
            }
        }
        return new HashMap<String, String>(0);
    }

    /**
     * 字符串分割Map（默认分隔符为：=）
     *
     * @param strings
     * @return
     */
    public static Map<String, String> string2Map(String... strings) {
        return strings2Map(strings);
    }

    /**
     * 字符串数组分割Map（默认分隔符为：=）
     *
     * @param strings class=easyui-validatebox required=true
     * @return
     */
    public static Map<String, String> strings2Map(String[] strings) {
        return strings2Map(strings, "=");
    }

    /**
     * 字符串数组分割Map
     *
     * @param strings
     * @param splitSeparator 指定分隔符
     * @return
     */
    public static Map<String, String> strings2Map(String[] strings, String splitSeparator) {
        Map<String, String> map = new HashMap<String, String>(strings.length);
        String[] pairs = null;
        for (String string : strings) {
            pairs = StringUtils.split(string, splitSeparator);
            if (pairs != null && pairs.length == 2) {
                map.put(pairs[0], pairs[1]);
            }
        }
        pairs = null;
        return map;
    }

    /**
     * map转为字符串
     *
     * @param map
     * @return
     * @throws Exception
     */
    public static String map2String(Map<String, String> map) throws Exception {
        StringBuilder html = new StringBuilder();
        for (Map.Entry<String, String> m : map.entrySet()) {
            html.append(m.getKey());
            html.append(":");
            html.append(m.getValue());
            html.append(";");
        }
        return html.toString();
    }

    /**
     * map对象转NameValuePair集合对象
     *
     * @param parameterMap
     * @return
     */
    public static List<NameValuePair> map2NameValuePair(Map<String, String> parameterMap) {
        List<NameValuePair> list = new ArrayList<>(parameterMap.size());
        for (Map.Entry<String, String> entry : parameterMap.entrySet()) {
            list.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
        }
        return list;
    }

    /**
     * map对象转NameValuePair集合对象
     *
     * @param parameterMap
     * @return
     */
    public static List<NameValuePair> maps2NameValuePair(Map<String, String[]> parameterMap) {
        List<NameValuePair> list = new ArrayList<>(parameterMap.size());
        for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
            list.add(new BasicNameValuePair(entry.getKey(), StringUtils.join(entry.getValue(), ',')));
        }
        return list;
    }

    /**
     * 将list转为Map
     *
     * @param list 数据集合
     * @param key  获取key值数据的key
     * @return
     * @throws Exception
     */
    public static <T, K, V> Map<K, V> list2Map(List<T> list, K key) throws Exception {
        if (key == null || list == null || list.size() == 0) {
            return null;
        }
        Map<K, V> map = new HashMap<K, V>();
        for (T t : list) {
            K k = (K) Ognl.getValue(key, t);
            map.put(k, (V) t);
        }
        return map;
    }

    /**
     * 将list转为Map
     *
     * @param list 数据集合
     * @param key  获取key值数据的key
     * @return
     * @throws Exception
     */

    public static <T> Map<String, T> list2TreeMap(List<T> list, String key) throws Exception {

        if (key == null || list == null || list.size() == 0) {
            return null;
        }

        Map<String, T> map = new LinkedHashMap<String, T>();

        for (T t : list) {

            String k = Ognl.getValue(key, t).toString();
            map.put(k, (T) t);
        }

        return map;
    }

    /**
     * T -->ongl(key)--->K类型 ongl(value)-->V类型
     *
     * @param key
     * @param value
     * @return Map(K, V)
     * @throws Exception
     */
    public static <K, V, T> Map<K, V> list2TreeMap1(List<T> list, String key, String value) throws Exception {
        Map<K, V> map = new HashMap<K, V>();
        for (T t : list) {
            K k = (K) Ognl.getValue(key, t);
            V v = (V) Ognl.getValue(value, t);
            map.put(k, v);
        }
        return map;
    }

    /**
     * 将一个Properties对象转化为Map对象
     *
     * @param props
     * @return
     */
    public static Map<String, String> properties2Map(Properties props) {
        Map<String, String> map = new HashMap<String, String>();
        for (Object key : props.keySet()) {
            String propName = (String) key;
            String propValue = (String) props.getProperty(propName);
            map.put(propName, propValue);
        }
        return map;
    }

    /**
     * 将一个Map对象转化为Properties对象
     *
     * @param map
     * @return
     */
    public static Properties map2Properties(Map<String, String> map) {
        Properties properties = new Properties();
        for (Map.Entry<String, String> entry : map.entrySet()) {
            properties.put(entry.getKey(), entry.getValue());
        }
        return properties;
    }

    /**
     * 将Map里面每一个Key的首字母小写
     *
     * @param map
     * @return
     */
    public static <V> Map<String, V> mapKeyToCamelName(Map<String, V> map) {
        Map<String, V> newMap = new HashMap<String, V>(map.size());
        String name = null;
        for (Map.Entry<String, V> entry : map.entrySet()) {
            name = entry.getKey();
            if (name == null) {
                newMap.put(name, entry.getValue());
            } else if (name.length() <= 3 && !name.startsWith(/*Introspector.IS_PREFIX*/"is")) {
                newMap.put(name, entry.getValue());
            } else {
                newMap.put(Introspector.decapitalize(name), entry.getValue());
            }
        }
        return newMap;
    }

    public static void main(String[] args) {
        /*
         * List<Cinema> list = new ArrayList<Cinema>();
         *
         * Cinema cinema = new Cinema(1); CinemaInfo cinemaInfo = new CinemaInfo(1); cinemaInfo.setAddress("北京"); cinema.setCinemaInfo(cinemaInfo); list.add(cinema);
         */
        /*
         * try { String a = (String) Ognl.getValue("cinemaInfo.address", cinema); System.out.println(a); } catch (OgnlException e) { // TODO Auto-generated catch block e.printStackTrace(); }
         */
        try {
            /*
             * Map<CinemaInfo, String> map = list2TreeMap1(list, "cinemaInfo", "cinemaInfo.address"); List<CinemaInfo> cinemaInfos = new ArrayList<CinemaInfo>(map.keySet());
             * System.out.println(cinemaInfos.get(0).getAddress());
             */

            // System.out.println(map);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}
