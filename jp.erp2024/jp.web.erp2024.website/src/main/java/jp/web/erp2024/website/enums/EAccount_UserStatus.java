/**
 *
 */
package jp.web.erp2024.website.enums;

import jp.com.helper.DescriptionAttribute;
import jp.com.helper.IEnumValue;

public enum EAccount_UserStatus implements IEnumValue<Integer> {

    @DescriptionAttribute(description = "正常")
    正常(0),
    @DescriptionAttribute(description = "冻结")
    冻结(1),
    @DescriptionAttribute(description = "注销")
    注销(2);

    private int value = 0;

    EAccount_UserStatus(int value) {
        this.value = Integer.valueOf(value);
    }

    public Integer getValue() {
        return this.value;
    }
}
