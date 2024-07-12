package jp.com.module;

import jp.com.helper.EnumHelper;
import jp.com.helper.IEnumValue;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;

public class EasyUI {

    /* enumFormatter Begin */
    public static <E extends Enum<E>> String enumFormatter(Class<E> type) throws NoSuchFieldException, SecurityException {
        return enumFormatter(type, EnumHelper.getValues(type));
    }

    private static <E extends Enum<E>> boolean isEnumValueImplement(Class<E> type) {
        return IEnumValue.class.isAssignableFrom(type);
    }

    public static <E extends Enum<E>> String enumFormatter(Class<E> type, EnumSet<E> enums) throws NoSuchFieldException, SecurityException {
        StringBuffer sb = new StringBuffer();
        boolean isEnumValue = isEnumValueImplement(type);
        sb.append("function (value, row, index) { switch(value) {");
        for (Enum<E> item : enums) {
            sb.append("case " + (isEnumValue ? ((IEnumValue) item).getValue() : item.ordinal()) + ": return \"" + EnumHelper.getEnumDescription(item) + "\";");
        }
        sb.append("} return \"\";}");
        return sb.toString();
    }

    public static <E extends Enum<E>> String enumFormatter(Class<E> type, List<Enum<E>> enums) throws NoSuchFieldException, SecurityException {
        StringBuffer sb = new StringBuffer();
        boolean isEnumValue = isEnumValueImplement(type);
        sb.append("function (value, row, index) { switch(value) {");
        for (Enum<E> item : enums) {
            sb.append("case " + (isEnumValue ? ((IEnumValue) item).getValue() : item.ordinal()) + ": return \"" + EnumHelper.getEnumDescription(item) + "\";");
        }
        sb.append("} return \"\";}");
        return sb.toString();
    }

    public static <E extends Enum<E>> String enumFormatter(Class<E> type, Enum<E>[] enums) throws NoSuchFieldException, SecurityException {
        StringBuffer sb = new StringBuffer();
        sb.append("function (value, row, index) { switch(value) {");
        for (Enum<E> item : enums) {
            sb.append("case " + item.ordinal() + ": return \"" + EnumHelper.getEnumDescription(item) + "\";");
        }
        sb.append("} return \"\";}");
        return sb.toString();
    }

    public static <E extends Enum<E>> String enumValueFormatter(Class<E> type) throws NoSuchFieldException, NoSuchMethodException, SecurityException {
        return enumValueFormatter(type, EnumHelper.getValues(type));
    }

    public static <E extends Enum<E>> String enumValueFormatter(Class<E> type, EnumSet<E> enums) throws NoSuchFieldException, NoSuchMethodException, SecurityException {
        StringBuffer sb = new StringBuffer();
        boolean isEnumValue = isEnumValueImplement(type);
        sb.append("function (value, row, index) { switch(value) {");
        for (Enum<E> item : enums) {
            sb.append("case " + (isEnumValue ? ((IEnumValue) item).getValue() : item.ordinal()) + ": return \"" + item.toString() + "\";");
        }
        sb.append("} return \"\";}");
        return sb.toString();
    }
    /* enumFormatter End */

    /* enumFilterData Begin */
    public static <E extends Enum<E>> String enumFilterData(Class<E> type) throws NoSuchFieldException, SecurityException {
        return enumFilterData(type, true);
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, Boolean isInclude) throws NoSuchFieldException, SecurityException {
        if (isInclude.booleanValue()) {
            return enumFilterData(type, EnumHelper.getValues(type), "全部", -1);
        } else {
            return enumFilterData(type, EnumHelper.getValues(type), null, 0);
        }
    }

    /* EnumSet<E> Begin */
    public static <E extends Enum<E>> String enumFilterData(Class<E> type, Boolean isInclude, EnumSet<E> enums) throws NoSuchFieldException, SecurityException {
        if (isInclude.booleanValue())
            return enumFilterData(type, enums, "全部", -1);
        else
            return enumFilterData(type, enums, "全部", -1);
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, String firstName, Integer firstValue, EnumSet<E> enums) throws NoSuchFieldException, SecurityException {
        return enumFilterData(type, enums, firstName, firstValue);
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, EnumSet<E> enums) throws NoSuchFieldException, SecurityException {
        return enumFilterData(type, enums, null, 0);
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, Boolean isInclude, String firstName, Integer firstValue, EnumSet<E> enums) throws NoSuchFieldException,
            SecurityException {
        if (isInclude.booleanValue()) {
            return enumFilterData(type, enums, "全部", -1);
        } else {
            return enumFilterData(type, enums, firstName, firstValue);
        }
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, EnumSet<E> enums, String firstName, Integer firstValue) throws NoSuchFieldException, SecurityException {
        StringBuffer sb = new StringBuffer();
        sb.append("[");
        boolean isEnumValue = isEnumValueImplement(type);
        if (firstName == null) {
            int i = 0;
            for (Enum<E> item : enums) {
                sb.append("{\"text\":\"" + EnumHelper.getEnumDescription(item) + "\",\"value\":" + (isEnumValue ? ((IEnumValue) item).getValue() : item.ordinal()) + "}");
                if (++i < enums.size()) {
                    sb.append(",");
                }
            }
        } else {
            sb.append("{\"text\":\"" + firstName + "\",\"value\":" + firstValue + "}");
            for (Enum<E> item : enums) {
                sb.append(",{\"text\":\"" + EnumHelper.getEnumDescription(item) + "\",\"value\":" + (isEnumValue ? ((IEnumValue) item).getValue() : item.ordinal()) + "}");
            }
        }
        sb.append("]");
        return sb.toString();
    }

    /* EnumSet<E> End */

    /* Enum<E>[] Begin */
    public static <E extends Enum<E>> String enumFilterData(Class<E> type, Boolean isInclude, Enum<E>[] enums) throws NoSuchFieldException, SecurityException {
        if (isInclude.booleanValue()) {
            return enumFilterData(type, enums, "全部", -1);
        } else {
            List<Enum<E>> enumList = getExcludeEnum(type, enums);
            return enumFilterData(type, enumList, "全部", -1);
        }
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, String firstName, Integer firstValue, Enum<E>[] enums) throws NoSuchFieldException, SecurityException {
        return enumFilterData(type, enums, firstName, firstValue);
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, Enum<E>[] enums) throws NoSuchFieldException, SecurityException {
        return enumFilterData(type, enums, null, 0);
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, Boolean isInclude, String firstName, Integer firstValue, Enum<E>[] enums) throws NoSuchFieldException,
            SecurityException {
        if (isInclude.booleanValue()) {
            return enumFilterData(type, enums, "全部", -1);
        } else {
            List<Enum<E>> enumList = getExcludeEnum(type, enums);
            return enumFilterData(type, enumList, firstName, firstValue);
        }
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, Enum<E>[] enums, String firstName, Integer firstValue) throws NoSuchFieldException, SecurityException {
        StringBuffer sb = new StringBuffer();
        sb.append("[");
        if (firstName == null) {
            int i = 0;
            for (Enum<E> item : enums) {
                sb.append("{\"text\":\"" + EnumHelper.getEnumDescription(item) + "\",\"value\":" + item.ordinal() + "}");
                if (++i < enums.length) {
                    sb.append(",");
                }
            }
        } else {
            sb.append("{\"text\":\"" + firstName + "\",\"value\":" + firstValue + "}");
            for (Enum<E> item : enums) {
                sb.append(",{\"text\":\"" + EnumHelper.getEnumDescription(item) + "\",\"value\":" + item.ordinal() + "}");
            }
        }
        sb.append("]");
        return sb.toString();
    }

    /* Enum<E>[] End */

    /* List<Enum<E>> Begin */
    public static <E extends Enum<E>> String enumFilterData(Class<E> type, Boolean isInclude, List<Enum<E>> enums) throws NoSuchFieldException, SecurityException {
        if (isInclude.booleanValue()) {
            return enumFilterData(type, enums, "全部", -1);
        } else {
            List<Enum<E>> enumList = getExcludeEnum(type, enums);
            return enumFilterData(type, enumList, "全部", -1);
        }
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, String firstName, Integer firstValue, List<Enum<E>> enums) throws NoSuchFieldException,
            SecurityException {
        return enumFilterData(type, enums, firstName, firstValue);
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, List<Enum<E>> enums) throws NoSuchFieldException, SecurityException {
        return enumFilterData(type, enums, null, 0);
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, Boolean isInclude, String firstName, Integer firstValue, List<Enum<E>> enums)
            throws NoSuchFieldException, SecurityException {
        if (isInclude.booleanValue()) {
            return enumFilterData(type, enums, "全部", -1);
        } else {
            List<Enum<E>> enumList = getExcludeEnum(type, enums);
            return enumFilterData(type, enumList, firstName, firstValue);
        }
    }

    public static <E extends Enum<E>> String enumFilterData(Class<E> type, List<Enum<E>> enums, String firstName, Integer firstValue) throws NoSuchFieldException,
            SecurityException {
        StringBuffer sb = new StringBuffer();
        sb.append("[");
        if (firstName == null) {
            int i = 0;
            for (Enum<E> item : enums) {
                sb.append("{\"text\":\"" + EnumHelper.getEnumDescription(item) + "\",\"value\":" + item.ordinal() + "}");
                if (++i < enums.size()) {
                    sb.append(",");
                }
            }
        } else {
            sb.append("{\"text\":\"" + firstName + "\",\"value\":" + firstValue + "}");
            for (Enum<E> item : enums) {
                sb.append(",{\"text\":\"" + EnumHelper.getEnumDescription(item) + "\",\"value\":" + item.ordinal() + "}");
            }
        }
        sb.append("]");
        return sb.toString();
    }

    /* List<Enum<E>> End */


    private static <E extends Enum<E>> List<Enum<E>> getExcludeEnum(Class<E> type, Enum<E>[] enums) {
        List<Enum<E>> enumList = new ArrayList<Enum<E>>();
        EnumSet<E> enumSet = EnumHelper.getValues(type);
        for (Enum<E> item : enums) {
            if (!enumSet.contains(item)) {
                enumList.add(item);
            }
        }
        return enumList;
    }

    private static <E extends Enum<E>> List<Enum<E>> getExcludeEnum(Class<E> type, List<Enum<E>> enums) {
        List<Enum<E>> enumList = new ArrayList<Enum<E>>();
        EnumSet<E> enumSet = EnumHelper.getValues(type);
        for (Enum<E> item : enums) {
            if (!enumSet.contains(item)) {
                enumList.add(item);
            }
        }
        return enumList;
    }

    /**
     * map 转为数组
     * [{text:1,value:'test'}]
     *
     * @param map
     * @return
     */
    public static String mapFilterData(Map<String, String> map) {
        return mapFilterData(map, true);
    }

    public static String mapFilterData(Map<String, String> map, Boolean isInclude) {
        if (isInclude.booleanValue()) {
            return mapFilterData(map, "全部", -1);
        } else {
            return mapFilterData(map, null, 0);
        }
    }

    public static String mapFilterData(Map<String, String> map, String firstName, Integer firstValue) {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        boolean isFirstItem = true;
        if (firstName != null) {
            sb.append("{\"text\":\"").append(firstName).append("\",\"value\":").append(firstValue).append("}");
            isFirstItem = false;
        }

        for (Map.Entry<String, String> entry : map.entrySet()) {
            if (isFirstItem) {
                isFirstItem = false;
            } else {
                sb.append(",");
            }
            sb.append("{\"text\":\"").append(entry.getValue()).append("\",\"value\":").append(entry.getKey()).append("}");
        }

        sb.append("]");
        return sb.toString();
    }

    /**
     * map 转为 obj
     * {1:text}
     *
     * @param map
     * @return
     */
    public static String mapFormatterData(Map<String, String> map) {
        return mapFormatterData(map, true);
    }

    public static String mapFormatterData(Map<String, String> map, Boolean isInclude) {
        if (isInclude.booleanValue()) {
            return mapFormatterData(map, "全部", -1);
        } else {
            return mapFormatterData(map, null, 0);
        }
    }

    public static String mapFormatterData(Map<String, String> map, String firstName, Integer firstValue) {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        boolean isFirstItem = true;
        if (firstName != null) {
            sb.append("\"").append(firstName).append("\":\"").append(firstValue).append("\"");
            isFirstItem = false;
        }

        for (Map.Entry<String, String> entry : map.entrySet()) {
            if (isFirstItem) {
                isFirstItem = false;
            } else {
                sb.append(",");
            }
            sb.append("\"").append(entry.getKey()).append("\":\"").append(entry.getValue()).append("\"");
        }

        sb.append("}");
        return sb.toString();
    }
    /* enumFilterData Begin */
}
