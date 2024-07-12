/**
 *
 */
package jp.com.module;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * JQuery EasyUI里面的Tree控件数据类型
 *
 * @author wangyunpeng
 *
 */
public class TreeData {
    public Object id;
    public String text;
    public String state;
    public boolean checked;
    public String iconCls;
    /**
     * 可以直接赋值为href(字符串类型),也可以赋值为Attributes对象,jQuery EasyUI会判断的.
     */
    public Object attributes;
    public String description;
    public List<TreeData> children;

    public TreeData() {

    }

    /**
     * @param id
     * @param text
     * @param state
     * @param checked
     * @param iconCls
     * @param attributes
     * @param description
     * @param children
     */
    public TreeData(Object id, String text, String state, boolean checked, String iconCls, Object attributes, String description, List<TreeData> children) {
        super();
        this.id = id;
        this.text = text;
        this.state = state;
        this.checked = checked;
        this.iconCls = iconCls;
        this.attributes = attributes;
        this.description = description;
        this.children = children;
    }

    public class Attributes {
        public boolean hasChildren;
        public String href;
        public String title;

        public Attributes() {
            super();
        }

        public Attributes(boolean hasChildren) {
            this(hasChildren, "");
        }

        public Attributes(boolean hasChildren, String href) {
            this(hasChildren, href, "");
        }

        public Attributes(boolean hasChildren, String href, String title) {
            this();
            this.hasChildren = hasChildren;
            this.href = href;
            this.title = title;
        }
    }


    public static <T> TreeBuilder<T> build() {
        return new TreeBuilder<T>();
    }

    public static class TreeBuilder<T> {
        private TreeData root = new TreeData();
        private Function<T, Object> nodeIdFunc;
        private BiFunction<T, Object, Boolean> findNodeFunc;
        private Function<T, String> nodeTextFunc;
        private Predicate<T> nodeCheckedFunc = t -> false;

        private TreeBuilder() {
            root.id = -1;
            root.iconCls = "icon-home";
            root.text = "所有节点";
            root.state = "open";
        }

        public TreeBuilder<T> setRoot(TreeData data) {
            if (data != null)
                this.root = data;
            return this;
        }

        public TreeBuilder<T> setRootId(Object id) {
            this.root.id = id;
            return this;
        }

        public TreeBuilder<T> setRootIconCls(String iconCls) {
            this.root.iconCls = iconCls;
            return this;
        }

        public TreeBuilder<T> setRootText(String text) {
            this.root.text = text;
            return this;
        }

        public TreeBuilder<T> setRootState(String state) {
            this.root.state = state;
            return this;
        }

        public TreeBuilder<T> setNodeId(Function<T, Object> func) {
            this.nodeIdFunc = func;
            return this;
        }

        public TreeBuilder<T> setNodeParentId(BiFunction<T, Object, Boolean> func) {
            this.findNodeFunc = func;
            return this;
        }

        public TreeBuilder<T> setNodeText(Function<T, String> func) {
            this.nodeTextFunc = func;
            return this;
        }

        public TreeBuilder<T> setNodeChecked(Predicate<T> func) {
            if (func != null)
                this.nodeCheckedFunc = func;
            return this;
        }


        public TreeData execute(List<T> list) {
            this.root.children = buildTree(list, root.id);
            return this.root;
        }

        private List<TreeData> buildTree(List<T> list, Object parentId) {
            List<TreeData> resultList = new ArrayList<TreeData>();
            if (list.isEmpty())
                return new ArrayList<>(0);
            List<T> childNode = list.stream()
                    .filter(node -> this.findNodeFunc.apply(node, parentId))
                    .collect(Collectors.toList());
            if (childNode.isEmpty())
                return new ArrayList<>(0);
            TreeData treeData = null;
            for (T node : childNode) {
                Object id = this.nodeIdFunc.apply(node);
                treeData = new TreeData();
                treeData.id = id;
                treeData.text = this.nodeTextFunc.apply(node);
                treeData.children = buildTree(list, id);
                treeData.state = treeData.children.isEmpty() ? "open" : "closed";
                treeData.checked = this.nodeCheckedFunc.test(node);
                treeData.attributes = treeData.new Attributes(!treeData.children.isEmpty());
                resultList.add(treeData);
            }
            return resultList;
        }
    }
}
