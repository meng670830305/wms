package jp.web.erp2024.website.models;

import jp.db.erp2024.pojo.Account_permission;

/**
 * <pre>
 *  JQuery EasyUI里面的TreeGrid控件数据类型.
 *
 *  由于每种类型的数据库表的字段命名规则各不相同(有支持Pascal,有支持Camcel,有的只支持全部大写的,有的只支持全部小写的规则),
 *
 *  再加上java语言不支持动态类型创建对象,所以只能把TreeGrid控件这个数据类型定义到了表示层,而没有封装到tlz.model里面.
 * </pre>
 *
 * @author wangyunpeng
 * @date 2020/3/11 15:26
 */
public class TreeGridAccountPermission extends Account_permission {

    /**
     * TreeGrid控件使用的图标字段名称
     */
    public String iconCls;

    public TreeGridAccountPermission(String id, String name, String parentId, String href, String iconCls, int sort, int isEnable, int canMenu) {
        super.setId(id);
        super.setName(name);
        super.setParentid(parentId);
        super.setHref(href);
        this.iconCls = iconCls;
        super.setSort(sort);
        super.setIsenable(isEnable);
        super.setCanmenu(canMenu);
    }
}
