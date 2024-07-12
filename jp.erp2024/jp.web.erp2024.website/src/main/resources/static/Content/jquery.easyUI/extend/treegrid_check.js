/**
	 * \u6269\u5C55\u6811\u8868\u683C\u7EA7\u8054\u52FE\u9009\u65B9\u6CD5\uFF1A
	 * @param {Object} container
	 * @param {Object} options
	 * @return {TypeName} 
	 */
$.extend($.fn.treegrid.methods, {
    /**
     * \u7EA7\u8054\u9009\u62E9
     * @param {Object} target
     * @param {Object} param 
     *		param\u5305\u62EC\u4E24\u4E2A\u53C2\u6570:
     *			id:\u52FE\u9009\u7684\u8282\u70B9ID
     *			deepCascade:\u662F\u5426\u6DF1\u5EA6\u7EA7\u8054
     * @return {TypeName} 
     */
    cascadeCheck: function (target, param) {
        var opts = $.data(target[0], "treegrid").options;
        if (opts.singleSelect)
            return;
        var idField = opts.idField;//\u8FD9\u91CC\u7684idField\u5176\u5B9E\u5C31\u662FAPI\u91CC\u65B9\u6CD5\u7684id\u53C2\u6570
        var status = false;//\u7528\u6765\u6807\u8BB0\u5F53\u524D\u8282\u70B9\u7684\u72B6\u6001\uFF0Ctrue:\u52FE\u9009\uFF0Cfalse:\u672A\u52FE\u9009
        var selectNodes = $(target).treegrid('getSelections');//\u83B7\u53D6\u5F53\u524D\u9009\u4E2D\u9879
        for (var i = 0; i < selectNodes.length; i++) {
            if (selectNodes[i][idField] == param.id)
                status = true;
        }
        //\u7EA7\u8054\u9009\u62E9\u7236\u8282\u70B9
        selectParent(target[0], param.id, idField, status);
        selectChildren(target[0], param.id, idField, param.deepCascade, status);
        /**
         * \u7EA7\u8054\u9009\u62E9\u7236\u8282\u70B9
         * @param {Object} target
         * @param {Object} id \u8282\u70B9ID
         * @param {Object} status \u8282\u70B9\u72B6\u6001\uFF0Ctrue:\u52FE\u9009\uFF0Cfalse:\u672A\u52FE\u9009
         * @return {TypeName} 
         */
        function selectParent(target, id, idField, status) {
            var parent = $(target).treegrid('getParent', id);
            if (parent) {
                var parentId = parent[idField];
                if (status)
                    $(target).treegrid('select', parentId);
                else
                    $(target).treegrid('unselect', parentId);
                selectParent(target, parentId, idField, status);
            }
        }
        /**
         * \u7EA7\u8054\u9009\u62E9\u5B50\u8282\u70B9
         * @param {Object} target
         * @param {Object} id \u8282\u70B9ID
         * @param {Object} deepCascade \u662F\u5426\u6DF1\u5EA6\u7EA7\u8054
         * @param {Object} status \u8282\u70B9\u72B6\u6001\uFF0Ctrue:\u52FE\u9009\uFF0Cfalse:\u672A\u52FE\u9009
         * @return {TypeName} 
         */
        function selectChildren(target, id, idField, deepCascade, status) {
            //\u6DF1\u5EA6\u7EA7\u8054\u65F6\u5148\u5C55\u5F00\u8282\u70B9
            if (!status && deepCascade)
                $(target).treegrid('expand', id);
            //\u6839\u636EID\u83B7\u53D6\u4E0B\u5C42\u5B69\u5B50\u8282\u70B9
            var children = $(target).treegrid('getChildren', id);
            for (var i = 0; i < children.length; i++) {
                var childId = children[i][idField];
                if (status)
                    $(target).treegrid('select', childId);
                else
                    $(target).treegrid('unselect', childId);
                selectChildren(target, childId, idField, deepCascade, status);//\u9012\u5F52\u9009\u62E9\u5B50\u8282\u70B9
            }
        }
    }
});