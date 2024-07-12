package jp.web.erp2024.website.config.converter;

import org.apache.commons.beanutils.Converter;
import org.apache.commons.lang3.StringUtils;

public class StringArrayConcatConverter implements Converter {

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object convert(Class type, Object value) {
		Object obj = null;
		if (String.class.equals(type)) {
			if (value instanceof String[]) {
				String[] values = (String[]) value;
				obj = type.cast(StringUtils.join(values, ","));// [".jpg",".gif",".bmp"]=>".jpg,.gif,.bmp"
			}
		}
		return obj;
	}
}
