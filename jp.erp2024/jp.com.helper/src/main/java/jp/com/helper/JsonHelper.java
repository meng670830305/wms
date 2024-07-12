/**
 * (tlz.helper)包
 * <p>
 * wangyp Copyright 2006-2015
 * 文件： JsonHelper.java
 * 项目名称：工程项目管理
 * 创建时间：2015/5/28
 * 负责人：wangyp
 * 首先需要导入fastjson包
 */
/*
 在pom.xml文件复制下面的内容。
 <dependencies>
 <dependency>
 <groupId>com.alibaba</groupId>
 <artifactId>fastjson</artifactId>
 <version>1.2.5</version>
 </dependency>
 </dependencies>
 */

package jp.com.helper;

import cn.hutool.json.serialize.JSONSerializer;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.alibaba.fastjson2.JSONWriter;
import com.alibaba.fastjson2.TypeReference;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * JSON帮助类（fastjson）
 *
 * @author wangyunpeng
 * @date 2020/11/7 13:48
 */
final public class JsonHelper {

    public static final JSONWriter.Feature[] features = {
            JSONWriter.Feature.BrowserCompatible // 所有的中文都会序列化为\\uXXXX这种格式
            , JSONWriter.Feature.WriteMapNullValue // 输出空置字段
            , JSONWriter.Feature.WriteNullListAsEmpty // list字段如果为null，输出为[]，而不是null
            , JSONWriter.Feature.WriteNullNumberAsZero // 数值字段如果为null，输出为0，而不是null
            , JSONWriter.Feature.WriteNullBooleanAsFalse // Boolean字段如果为null，输出为false，而不是null
            , JSONWriter.Feature.WriteNullStringAsEmpty // 字符类型字段如果为null，输出为""，而不是null
            , JSONWriter.Feature.NotWriteDefaultValue
    };

    //static {
    //    serializeConfig = new SerializeConfig();
    //    // serializeConfig.put(java.util.Date.class, new JSONLibDataFormatSerializer()); // 使用和json-lib兼容的日期输出格式
    //    // serializeConfig.put(java.sql.Date.class, new JSONLibDataFormatSerializer()); // 使用和json-lib兼容的日期输出格式
    //
    //    ObjectSerializer objectSerializer = new ObjectSerializer() {
    //        public void write(JSONSerializer serializer, Object object, Object fieldName, Type fieldType, int features) throws IOException {
    //            if (object == null) {
    //                serializer.getWriter().writeNull();
    //                return;
    //            }
    //            Date date = (Date) object;
    //            //String text = String.format("/Date(%d)/", date.getTime());
    //            String text = DateHelper.toStringYYYYMMDDHHMMSS(date);
    //            serializer.write(text);
    //        }
    //    };
    //    serializeConfig.put(Date.class, objectSerializer);
    //    serializeConfig.put(java.sql.Date.class, objectSerializer);
    //    serializeConfig.put(java.sql.Timestamp.class, objectSerializer);
    //
    //    parserConfig = new ParserConfig();
    //    ObjectDeserializer objectDeserializer = new ObjectDeserializer() {
    //        @Override
    //        public <T> T deserialze(DefaultJSONParser serializer, Type type, Object object) {
    //            T t = null;
    //            try {
    //                t = (T) new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(object.toString());
    //            } catch (ParseException e) {
    //                e.printStackTrace();
    //            }
    //            return t;
    //        }
    //
    //        @Override
    //        public int getFastMatchToken() {
    //            return 0;
    //        }
    //    };
    //    parserConfig.putDeserializer(Date.class, objectDeserializer);
    //    parserConfig.putDeserializer(java.sql.Date.class, objectDeserializer);
    //}

    /**
     * 这个类不能实例化
     */
    private JsonHelper() {
    }

    /**
     * 将java类型的对象转换为JSON格式的字符串
     *
     * @param object java类型的对象
     * @return JSON格式的字符串
     */
    public static <T> String serialize(T object) {
        return JSON.toJSONString(object);
    }

    /**
     * 将java类型的对象转换为JSON格式的字符串
     *
     * @param object
     * @param features
     * @return
     */
    public static <T> String serialize(T object, JSONWriter.Feature... features) {
        return JSON.toJSONString(object, features);
    }

    /**
     * 将JSON格式的字符串转换为JSONObject类型的对象
     *
     * @param json
     * @return
     */
    public static JSONObject deserialize(String json) {
        if (StringUtils.isNoneBlank(json)) {
            return JSON.parseObject(json);
        }
        return null;
    }


    /**
     * 将JSON格式的字符串转换为java类型的对象或者java数组类型的对象，注意:不能包括java集合类型
     *
     * @param json JSON格式的字符串
     * @param clz  java类型或者java数组类型，不包括java集合类型
     * @return java类型的对象或者java数组类型的对象，不包括java集合类型的对象
     */
    public static <T> T deserialize(String json, Class<T> clz) {
        if (StringUtils.isNoneBlank(json)) {
            return JSON.parseObject(json, clz);
        }
        return null;
    }

    /**
     * 将JSON格式的字符串转换为java的泛型集合List<T>类型的对象
     *
     * @param json JSON格式的字符串
     * @param clz  指定泛型集合里面的T类型
     * @return List<T>类型的对象
     */
    public static <T> List<T> deserializeList(String json, Class<T> clz) {
        if (StringUtils.isNoneBlank(json)) {
            return JSON.parseArray(json, clz);
        }
        return new ArrayList<T>();
    }

    /**
     * 将JSON格式的字符串转换成Java任意类型的对象
     *
     * @param json JSON格式的字符串
     * @param type Java任意类型
     * @return Java任意类型的对象
     */
    public static <T> T deserializeAny(String json, TypeReference<T> type) {
        if (StringUtils.isNoneBlank(json)) {
            return JSON.parseObject(json, type);
        }
        return null;
    }
}
