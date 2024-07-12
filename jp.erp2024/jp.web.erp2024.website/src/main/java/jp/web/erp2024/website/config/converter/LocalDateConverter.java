package jp.web.erp2024.website.config.converter;

import jp.com.helper.Date8Helper;
import org.apache.commons.beanutils.Converter;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class LocalDateConverter implements Converter {

    private static Set<String> _Patterns = new HashSet<String>();

    static {
        LocalDateConverter._Patterns.add("yyyyMM");
        LocalDateConverter._Patterns.add("yyyyMMdd");
        LocalDateConverter._Patterns.add("yyyy-MM-dd");
        LocalDateConverter._Patterns.add("yyyy年MM月dd日");
    }

    @SuppressWarnings({"rawtypes" , "unchecked"})
    public Object convert(Class type, Object value) {
        Object object = null;
        if (LocalDate.class.equals(type)) {
            if (value instanceof String) {
                String date = (String) value;
                Iterator<String> iterator = LocalDateConverter._Patterns.iterator();
                while (iterator.hasNext()) {
                    try {
                        object = Date8Helper.toLocalDate(date, iterator.next());
                        break;
                    } catch (DateTimeParseException ex) {
                    }
                }
            }
        }
        return object;
    }
}
