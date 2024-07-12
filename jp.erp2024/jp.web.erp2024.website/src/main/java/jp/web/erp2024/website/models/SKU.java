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
 * @date 2023/6/23 6:50
 * @company ㍿○○○○
 */
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SKU {

    private Integer id;

    private Collection<String> values;

    private Integer count;

    private Integer state;

    private boolean different;

}
