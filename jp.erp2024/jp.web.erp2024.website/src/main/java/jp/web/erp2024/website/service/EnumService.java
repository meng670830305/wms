package jp.web.erp2024.website.service;

import jp.web.erp2024.website.enums.EState;
import org.springframework.stereotype.Service;

/**
 * <pre>
 *
 * </pre>
 *
 * @author wangyunpeng
 * @date 2023/6/11 21:35
 * @company ㍿○○○○
 */
@Service("ENUM_SERVICE")
public class EnumService {

    public Integer EStateName2Value(String name) {
        return EState.name2Value(name);
    }

    public String EStateValue2Name(Integer value) {
        return EState.value2Name(value);
    }

}
