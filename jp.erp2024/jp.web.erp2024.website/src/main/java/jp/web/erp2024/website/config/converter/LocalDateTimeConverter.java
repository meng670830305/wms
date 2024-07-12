package jp.web.erp2024.website.config.converter;

import jp.com.helper.Date8Helper;
import org.apache.commons.beanutils.Converter;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class LocalDateTimeConverter implements Converter {

    /**
     * 日期格式集合
     */
    private static Set<String> _Patterns = new HashSet<String>();

    static {
        LocalDateTimeConverter._Patterns.add("yyyy-MM-dd");
        LocalDateTimeConverter._Patterns.add("yyyy-MM-dd HH:mm");
        LocalDateTimeConverter._Patterns.add("yyyy-MM-dd HH:mm:ss");
        LocalDateTimeConverter._Patterns.add("yyyy年MM月dd日");
    }

    /**
     * 日期转换器
     */
    @SuppressWarnings({"rawtypes" , "unchecked"})
    public Object convert(Class type, Object value) {
        Object object = null;
        if (LocalDateTime.class.equals(type)) {
            if (value instanceof String) {
                String date = (String) value;
                Iterator<String> iterator = LocalDateTimeConverter._Patterns.iterator();
                while (iterator.hasNext()) {
                    try {
                        object = Date8Helper.toLocalDateTime(date, iterator.next());
                        break;
                    } catch (DateTimeParseException ex) {
                    }
                }
            }
        }
        return object;
    }
}
