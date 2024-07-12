/**
 *
 */
package jp.web.erp2024.website.enums;


import jp.com.helper.DescriptionAttribute;
import jp.com.helper.IEnumValue;

public enum EAccount_AssignType implements IEnumValue<Integer> {

    @DescriptionAttribute(description = "包含")
    包含(1),
    @DescriptionAttribute(description = "排除")
    排除(2);

    private int value = 0;

    EAccount_AssignType(int value) {
        this.value = Integer.valueOf(value);
    }

    public Integer getValue() {
        return this.value;
    }
}
