package jp.web.erp2024.website.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Collection;

/**
 * <pre>
 *
 * </pre>
 *
 * @author wangyunpeng
 * @date 2023/6/24 23:26
 * @company ㍿○○○○
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OPT {
    private Integer id;
    private String name;
    private Collection<Value> values;
    private Integer sort;
    private Integer state;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Value {
        private String value;
        private Integer state;
    }
}
