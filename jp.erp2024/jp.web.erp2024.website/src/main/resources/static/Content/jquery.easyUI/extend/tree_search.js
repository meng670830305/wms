/**
 * 1\uFF09\u6269\u5C55jquery easyui tree\u7684\u8282\u70B9\u68C0\u7D22\u65B9\u6CD5\u3002\u4F7F\u7528\u65B9\u6CD5\u5982\u4E0B\uFF1A
 * $("#treeId").tree("search", searchText);	 
 * \u5176\u4E2D\uFF0CtreeId\u4E3Aeasyui tree\u7684\u6839UL\u5143\u7D20\u7684ID\uFF0CsearchText\u4E3A\u68C0\u7D22\u7684\u6587\u672C\u3002
 * \u5982\u679CsearchText\u4E3A\u7A7A\u6216""\uFF0C\u5C06\u6062\u590D\u5C55\u793A\u6240\u6709\u8282\u70B9\u4E3A\u6B63\u5E38\u72B6\u6001
 */
(function ($) {

    $.extend($.fn.tree.methods, {
        /**
		 * \u6269\u5C55easyui tree\u7684\u641C\u7D22\u65B9\u6CD5
		 * @param tree easyui tree\u7684\u6839DOM\u8282\u70B9(UL\u8282\u70B9)\u7684jQuery\u5BF9\u8C61
		 * @param searchText \u68C0\u7D22\u7684\u6587\u672C
		 * @param this-context easyui tree\u7684tree\u5BF9\u8C61
		 */
        search: function (jqTree, searchText) {
            //easyui tree\u7684tree\u5BF9\u8C61\u3002\u53EF\u4EE5\u901A\u8FC7tree.methodName(jqTree)\u65B9\u5F0F\u8C03\u7528easyui tree\u7684\u65B9\u6CD5
            var tree = this;
             
            //\u83B7\u53D6\u6240\u6709\u7684\u6811\u8282\u70B9
            var nodeList = getAllNodes(jqTree, tree);

            //\u5982\u679C\u6CA1\u6709\u641C\u7D22\u6761\u4EF6\uFF0C\u5219\u5C55\u793A\u6240\u6709\u6811\u8282\u70B9
            searchText = $.trim(searchText);
            if (searchText == "") {
                for (var i = 0; i < nodeList.length; i++) {
                    $(".tree-node-targeted", nodeList[i].target).removeClass("tree-node-targeted");
                    $(nodeList[i].target).show();
                }
                //\u5C55\u5F00\u5DF2\u9009\u62E9\u7684\u8282\u70B9\uFF08\u5982\u679C\u4E4B\u524D\u9009\u62E9\u4E86\uFF09
                var selectedNode = tree.getSelected(jqTree);
                if (selectedNode) {
                    tree.expandTo(jqTree, selectedNode.target);
                }
                return;
            }

            //\u641C\u7D22\u5339\u914D\u7684\u8282\u70B9\u5E76\u9AD8\u4EAE\u663E\u793A
            var matchedNodeList = [];
            if (nodeList && nodeList.length > 0) {
                var node = null;
                for (var i = 0; i < nodeList.length; i++) {
                    node = nodeList[i];
                    if (isMatch(searchText, node.id + node.text)) {
                        matchedNodeList.push(node);
                    }
                }

                //\u9690\u85CF\u6240\u6709\u8282\u70B9
                for (var i = 0; i < nodeList.length; i++) {
                    $(".tree-node-targeted", nodeList[i].target).removeClass("tree-node-targeted");
                    $(nodeList[i].target).hide();
                }

                //\u6298\u53E0\u6240\u6709\u8282\u70B9
                tree.collapseAll(jqTree);

                //\u5C55\u793A\u6240\u6709\u5339\u914D\u7684\u8282\u70B9\u4EE5\u53CA\u7236\u8282\u70B9  			
                for (var i = 0; i < matchedNodeList.length; i++) {
                    showMatchedNode(jqTree, tree, matchedNodeList[i]);
                }
            }
        },

        /**
		 * \u5C55\u793A\u8282\u70B9\u7684\u5B50\u8282\u70B9\uFF08\u5B50\u8282\u70B9\u6709\u53EF\u80FD\u5728\u641C\u7D22\u7684\u8FC7\u7A0B\u4E2D\u88AB\u9690\u85CF\u4E86\uFF09
		 * @param node easyui tree\u8282\u70B9
		 */
        showChildren: function (jqTree, node) {
            //easyui tree\u7684tree\u5BF9\u8C61\u3002\u53EF\u4EE5\u901A\u8FC7tree.methodName(jqTree)\u65B9\u5F0F\u8C03\u7528easyui tree\u7684\u65B9\u6CD5
            var tree = this;

            //\u5C55\u793A\u5B50\u8282\u70B9
            if (!tree.isLeaf(jqTree, node.target)) {
                var children = tree.getChildren(jqTree, node.target);
                if (children && children.length > 0) {
                    for (var i = 0; i < children.length; i++) {
                        if ($(children[i].target).is(":hidden")) {
                            $(children[i].target).show();
                        }
                    }
                }
            }
        },

        /**
		 * \u5C06\u6EDA\u52A8\u6761\u6EDA\u52A8\u5230\u6307\u5B9A\u7684\u8282\u70B9\u4F4D\u7F6E\uFF0C\u4F7F\u8BE5\u8282\u70B9\u53EF\u89C1\uFF08\u5982\u679C\u6709\u6EDA\u52A8\u6761\u624D\u6EDA\u52A8\uFF0C\u6CA1\u6709\u6EDA\u52A8\u6761\u5C31\u4E0D\u6EDA\u52A8\uFF09
		 * @param param {
		 * 	  treeContainer: easyui tree\u7684\u5BB9\u5668\uFF08\u5373\u5B58\u5728\u6EDA\u52A8\u6761\u7684\u6811\u5BB9\u5668\uFF09\u3002\u5982\u679C\u4E3Anull\uFF0C\u5219\u53D6easyui tree\u7684\u6839UL\u8282\u70B9\u7684\u7236\u8282\u70B9\u3002
		 *    targetNode:  \u5C06\u8981\u6EDA\u52A8\u5230\u7684easyui tree\u8282\u70B9\u3002\u5982\u679CtargetNode\u4E3A\u7A7A\uFF0C\u5219\u9ED8\u8BA4\u6EDA\u52A8\u5230\u5F53\u524D\u5DF2\u9009\u4E2D\u7684\u8282\u70B9\uFF0C\u5982\u679C\u6CA1\u6709\u9009\u4E2D\u7684\u8282\u70B9\uFF0C\u5219\u4E0D\u6EDA\u52A8
		 * } 
		 */
        scrollTo: function (jqTree, param) {
            //easyui tree\u7684tree\u5BF9\u8C61\u3002\u53EF\u4EE5\u901A\u8FC7tree.methodName(jqTree)\u65B9\u5F0F\u8C03\u7528easyui tree\u7684\u65B9\u6CD5
            var tree = this;

            //\u5982\u679Cnode\u4E3A\u7A7A\uFF0C\u5219\u83B7\u53D6\u5F53\u524D\u9009\u4E2D\u7684node
            var targetNode = param && param.targetNode ? param.targetNode : tree.getSelected(jqTree);

            if (targetNode != null) {
                //\u5224\u65AD\u8282\u70B9\u662F\u5426\u5728\u53EF\u89C6\u533A\u57DF				
                var root = tree.getRoot(jqTree);
                var $targetNode = $(targetNode.target);
                var container = param && param.treeContainer ? param.treeContainer : jqTree.parent();
                var containerH = container.height();
                var nodeOffsetHeight = $targetNode.offset().top - container.offset().top;
                if (nodeOffsetHeight > (containerH - 30)) {
                    var scrollHeight = container.scrollTop() + nodeOffsetHeight - containerH + 30;
                    container.scrollTop(scrollHeight);
                }
            }
        }
    });




    /**
	 * \u5C55\u793A\u641C\u7D22\u5339\u914D\u7684\u8282\u70B9
	 */
    function showMatchedNode(jqTree, tree, node) {
        //\u5C55\u793A\u6240\u6709\u7236\u8282\u70B9
        $(node.target).show();
        $(".tree-title", node.target).addClass("tree-node-targeted");
        var pNode = node;
        while ((pNode = tree.getParent(jqTree, pNode.target))) {
            $(pNode.target).show();
        }
        //\u5C55\u5F00\u5230\u8BE5\u8282\u70B9
        tree.expandTo(jqTree, node.target);
        //\u5982\u679C\u662F\u975E\u53F6\u5B50\u8282\u70B9\uFF0C\u9700\u6298\u53E0\u8BE5\u8282\u70B9\u7684\u6240\u6709\u5B50\u8282\u70B9
        if (!tree.isLeaf(jqTree, node.target)) {
            tree.collapse(jqTree, node.target);
        }
    }

    /**
	 * \u5224\u65ADsearchText\u662F\u5426\u4E0EtargetText\u5339\u914D
	 * @param searchText \u68C0\u7D22\u7684\u6587\u672C
	 * @param targetText \u76EE\u6807\u6587\u672C
	 * @return true-\u68C0\u7D22\u7684\u6587\u672C\u4E0E\u76EE\u6807\u6587\u672C\u5339\u914D\uFF1B\u5426\u5219\u4E3Afalse.
	 */
    function isMatch(searchText, targetText) {
        return $.trim(targetText) != "" && targetText.toLowerCase().indexOf(searchText.toLowerCase()) != -1;
    }

    /**
	 * \u83B7\u53D6easyui tree\u7684\u6240\u6709node\u8282\u70B9
	 */
    function getAllNodes(jqTree, tree) {
        var allNodeList = jqTree.data("allNodeList");
        if (!allNodeList) {
            var roots = tree.getRoots(jqTree);
            allNodeList = getChildNodeList(jqTree, tree, roots);
            jqTree.data("allNodeList", allNodeList);
        }
        return allNodeList;
    }

    /**
	 * \u5B9A\u4E49\u83B7\u53D6easyui tree\u7684\u5B50\u8282\u70B9\u7684\u9012\u5F52\u7B97\u6CD5
	 */
    function getChildNodeList(jqTree, tree, nodes) {
        var childNodeList = [];
        if (nodes && nodes.length > 0) {
            var node = null;
            for (var i = 0; i < nodes.length; i++) {
                node = nodes[i];
                childNodeList.push(node);
                if (!tree.isLeaf(jqTree, node.target)) {
                    var children = tree.getChildren(jqTree, node.target);
                    childNodeList = childNodeList.concat(getChildNodeList(jqTree, tree, children));
                }
            }
        }
        return childNodeList;
    }
})(jQuery);