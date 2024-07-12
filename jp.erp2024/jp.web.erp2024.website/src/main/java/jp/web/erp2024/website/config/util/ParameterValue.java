package jp.web.erp2024.website.config.util;

import jp.com.helper.JsonHelper;

import java.lang.reflect.Array;

class ParameterValue {

    private final String _value;

    ParameterValue(String value) {
        _value = value;
    }

    public Integer getInteger() {
        return Integer.valueOf(this._value);
    }

    public Double getDouble() {
        return Double.valueOf(this._value);
    }

    public Array getArray() {
        return JsonHelper.deserialize(this._value, Array.class);
    }

    public String get() {
        return this._value;
    }
}
