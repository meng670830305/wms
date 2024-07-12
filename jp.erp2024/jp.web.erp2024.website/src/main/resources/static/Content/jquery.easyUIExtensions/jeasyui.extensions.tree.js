/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI tree Extensions 1.0 beta
* jQuery EasyUI tree \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.tree.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-09-06
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*   3、jeasyui.extensions.menu.js v1.0 beta late
*   4、jeasyui.extensions.panel.js v1.0 beta late
*   5、jeasyui.extensions.window.js v1.0 beta late
*   6、jeasyui.extensions.dialog.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.fn.tree.extensions = {};


    /******************** initExtensions Methods Begin ********************/

    function isRootNode(treeTarget, target) {
        var t = $.util.parseJquery(treeTarget);
        target = $.util.parseJquery(target)[0];
        return $.array.contains(t.tree("getRoots"), target, function (t1, t2) {
            return t1.target == t2;
        });
    };

    function showOption(treeTarget, target) {
        var t = $.util.parseJquery(treeTarget), opts, pos;
        if (target) {
            target = $.util.parseJquery(target)[0];
            opts = t.tree("getNode", target);
            pos = $.util.parseJquery(target).offset();
        } else {
            opts = t.tree("options");
            pos = t.offset();
        }
        $.extend(pos, { left: pos.left + 25, top: pos.top + 15 });
        $.easyui.showOption(opts, pos);
    };


    function getLevel(treeTarget, target) {
        var t = $.util.parseJquery(treeTarget), node = $.util.parseJquery(target);
        if (!t[0] || !node[0] || !node.is(".tree-node[node-id]") || !$.contains(t[0], node[0])) { return 0; }
        return node.parentsUntil("ul.tree", "ul").length + 1;
    };

    function moveNode(treeTarget, param) {
        if (!param || !param.source || !param.target || !param.point) { return; }
        if (!$.array.contains(["append", "top", "bottom"], param.point)) { param.point = "append"; }
        param.source = $.util.parseJquery(param.source)[0]; param.target = $.util.parseJquery(param.target)[0];
        if (param.source == param.target) { return; }
        var t = $.util.parseJquery(treeTarget), opts = t.tree("options");
        if ($.isFunction(opts.onBeforeDrop) && opts.onBeforeDrop.call(treeTarget, param.target, param.source, param.point) == false) { return; }
        if (t.tree("isParent", { target1: param.source, target2: param.target })) { return; }
        var node = t.tree("pop", param.source);
        switch (param.point) {
            case "append": t.tree("append", { parent: param.target, data: [node] }); break;
            case "top": t.tree("insert", { before: param.target, data: node }); break;
            case "bottom": t.tree("insert", { after: param.target, data: node }); break;
            default: t.tree("append", { parent: param.target, data: [node] }); break;
        }
        if (node && $.isFunction(opts.onDrop)) { opts.onDrop.call(treeTarget, param.target, param.source, param.point); }
    };

    function shiftNode(treeTarget, param) {
        if (!param || !param.target || !param.point || !$.array.contains(["up", "upLevel", "down", "downLevel"], param.point)) { return; }
        param.target = $.util.parseJquery(param.target)[0];
        var t = $.util.parseJquery(treeTarget), source = param.target, targetNode;
        switch (param.point) {
            case "up": targetNode = t.tree("prev", source); break;
            case "upLevel": targetNode = t.tree("getParent", source); break;
            case "down": targetNode = t.tree("next", source); break;
            case "downLevel": targetNode = t.tree("prev", source); break;
            default: break;
        }
        if (!targetNode) { return; }
        t.tree("move", { source: source, target: targetNode.target, point: param.point == "up" ? "top" : (param.point == "downLevel" ? "append" : "bottom") });
    };

    function compareNode(target, param) {
        if (isChild(target, param)) { return "child"; }
        if (isParent(target, param)) { return "parent"; }
        if (isSibling(target, param)) { return "sibling"; }
        return "normal";
    };

    function isChild(target, param) {
        var t = $.util.parseJquery(target),
            target1 = $.util.parseJquery(param.target1)[0], target2 = $.util.parseJquery(param.target2)[0];
        var children = t.tree("getChildren", target2);
        return $.array.some(children, function (val) { return val.target == target1; });
    };

    function isParent(target, param) {
        var t = $.util.parseJquery(target),
            target1 = $.util.parseJquery(param.target1)[0], target2 = $.util.parseJquery(param.target2)[0];
        var children = t.tree("getChildren", target1);
        return $.array.some(children, function (val) { return val.target == target2; });
    };

    function isSibling(target, param) {
        var t = $.util.parseJquery(target),
            target1 = $.util.parseJquery(param.target1)[0], target2 = $.util.parseJquery(param.target2)[0],
            p1 = t.tree("getParent", target1), p2 = t.tree("getParent", target2);
        return p1.target == p2.target;
    };

    function getNextNode(treeTarget, target) {
        var item = $.util.parseJquery(target);
        if (!item.hasClass("tree-node")) { return null; }
        var target = item[0], next = item.closest("li").next().children("div.tree-node");
        if (!next.length) { return null; }
        return next.length ? $.util.parseJquery(treeTarget).tree("getNode", next[0]) : null;
    };

    function getPrevNode(treeTarget, target) {
        var item = $.util.parseJquery(target);
        if (!item.hasClass("tree-node")) { return null; }
        var target = item[0], prev = item.closest("li").prev().children("div.tree-node");
        if (!prev.length) { return null; }
        return prev.length ? $.util.parseJquery(treeTarget).tree("getNode", prev[0]) : null;
    };

    function getNears(treeTarget, target) {
        var t = $.util.parseJquery(treeTarget); target = $.util.parseJquery(target);
        if (!$.contains(t[0], target[0]) || !target.is("div.tree-node")) { return null; }
        return target.closest("ul").find("li>div.tree-node").map(function () {
            return t.tree("getNode", this);
        });
    };

    function getNearChildren(treeTarget, target) {
        var t = $.util.parseJquery(treeTarget); target = $.util.parseJquery(target);
        if (!$.contains(t[0], target[0]) || !target.is("div.tree-node")) { return null; }
        return target.siblings("ul").find("li>div.tree-node").map(function () {
            return t.tree("getNode", this);
        });
    };

    function unselect(treeTarget, target) {
        $.util.parseJquery(target).removeClass("tree-node-selected");
    };

    function remoteLoad(target, param) {
        if (!param) { return $.util.parseJquery(target).tree("reload"); }
        if (typeof param == "string") { $.util.parseJquery(target).tree("options").url = param; return remoteLoad(target, {}); }
        var t = $.util.parseJquery(target), opts = t.tree("options"), queryParams = opts.queryParams;
        opts.queryParams = $.extend({}, queryParams, param);
        t.tree("reload");
    };
    /******************** initExtensions Methods   End ********************/


    function initAutoToggle(t, opts, exts) {
        exts.onClickBak = opts.onClick;
        opts.onClick = function (node) {
            if ($.isFunction(exts.onClickBak)) { exts.onClickBak.apply(this, arguments); }
            if (opts.toggleOnClick) { t.tree("toggle", node.target); }
        };
    };

    function initContextMenu(t, opts, exts) {
        exts.onContextMenuBak = opts.onContextMenu;
        opts.onContextMenu = function (e, node) {
            if ($.isFunction(exts.onContextMenuBak)) { exts.onContextMenuBak.apply(this, arguments); }
            if (opts.selectOnContextMenu) { t.tree("select", node.target); }
            if (opts.enableContextMenu) {
                e.preventDefault();
                var items = parseContextMenuItems(t, opts, e, node);
                if (opts.autoBindDblClick && opts.dblClickMenuIndex >= 0 && $.util.likeArray(opts.contextMenu) && !$.util.isString(opts.contextMenu)
                    && opts.contextMenu.length > opts.dblClickMenuIndex) {
                    items[opts.dblClickMenuIndex].bold = true;
                }
                $.easyui.showMenu({ items: items, left: e.pageX, top: e.pageY });
            }
        };
    };

    function initBindDblClickEvent(t, opts, exts) {
        if (!$.array.likeArray(opts.contextMenu) || $.util.isString(opts.contextMenu) ||
            !opts.contextMenu.length || !opts.autoBindDblClick) { return; }
        opts.onDblClickBak = opts.onDblClick;
        opts.onDblClick = function (node) {
            if ($.isFunction(exts.onDblClickBak)) { exts.onDblClickBak.apply(this, arguments); }
            var items = parseContextMenuItems(t, opts, null, node);
            if (opts.dblClickMenuIndex >= 0 && items.length > opts.dblClickMenuIndex) {
                var item = items[opts.dblClickMenuIndex], handler = item.handler || item || onclick;
                handler(null, node, t, item, null);
            }
        };
    };


    function parseContextMenuItems(t, opts, e, node) {
        var toggle = opts.toggleMenu, move = opts.moveMenu;
        if (typeof toggle == "object") {
            toggle = $.extend({}, { expand: true, expandAll: true, collapse: true, collapseAll: true, submenu: false }, toggle);
        }
        if (typeof move == "object") {
            move = $.extend({}, { up: false, upLevel: false, down: false, downLevel: false, submenu: false }, move);
        }
        var mExpandAll = { text: "\u5C55\u5F00\u5F53\u524D\u6240\u6709", iconCls: "icon-metro-expand", disabled: !(toggle == true || toggle.expandAll == true), handler: function () { t.tree("expandAll", node.target); } };
        var mExpand = { text: "\u5C55\u5F00\u5F53\u524D", iconCls: "icon-metro-expand2", disabled: !(toggle == true || toggle.expand == true), handler: function () { t.tree("expand", node.target); } };
        var mCollapse = { text: "\u6298\u53E0\u5F53\u524D", iconCls: "icon-metro-contract2", disabled: !(toggle == true || toggle.collapse == true), handler: function () { t.tree("collapse", node.target); } };
        var mCollapseAll = { text: "\u6298\u53E0\u5F53\u524D\u6240\u6709", iconCls: "icon-metro-contract", disabled: !(toggle == true || toggle.collapseAll == true), handler: function () { t.tree("collapseAll", node.target); } };

        var mUpLevel = { text: "\u4E0A\u79FB\u4E00\u7EA7", iconCls: "icon-standard-arrow-up", disabled: !(move == true || move.upLevel == true), handler: function () { t.tree("shift", { point: "upLevel", target: node.target }); } };
        var mUp = { text: "\u4E0A\u79FB", iconCls: "icon-standard-up", disabled: !(move == true || move.up == true), handler: function () { t.tree("shift", { point: "up", target: node.target }); } };
        var mDown = { text: "\u4E0B\u79FB", iconCls: "icon-standard-down", disabled: !(move == true || move.down == true), handler: function () { t.tree("shift", { point: "down", target: node.target }); } };
        var mDownLevel = { text: "\u4E0B\u79FB\u4E00\u7EA7", iconCls: "icon-standard-arrow-down", disabled: !(move == true || move.downLevel == true), handler: function () { t.tree("shift", { point: "downLevel", target: node.target }); } };

        var mOpts = { text: "\u663E\u793A option", iconCls: "icon-standard-application-form", disabled: !opts.showOption, handler: function () { t.tree("showOption"); } };

        var menus = [];
        var toggleMenu = [mExpandAll, mExpand, mCollapse, mCollapseAll], moveMenu = [mUpLevel, mUp, mDown, mDownLevel];
        if (t.tree("isRoot", node.target)) {
            $.array.insertRange(toggleMenu, 0, [
                { text: "\u5C55\u5F00\u6240\u6709", iconCls: "icon-standard-arrow-out", handler: function () { t.tree("expandAll"); } },
                { text: "\u6298\u53E0\u6240\u6709", iconCls: "icon-standard-arrow-in", handler: function () { t.tree("collapseAll"); } }, "-"
            ]);
        }
        if ($.array.likeArray(opts.contextMenu)) { $.array.merge(menus, opts.contextMenu, "-"); }
        if (opts.showOption) { $.array.merge(menus, mOpts, "-"); }
        $.array.merge(menus, typeof toggle == "object" && !toggle.submenu
                    ? $.array.merge(toggleMenu, "-") : [{ text: "\u5C55\u5F00/\u6298\u53E0", iconCls: "", disabled: !toggle, children: toggleMenu }, "-"]);
        $.array.merge(menus, typeof move == "object" && !move.submenu
                    ? moveMenu : { text: "\u4E0A/\u4E0B\u79FB(\u7EA7)", iconCls: "", disabled: !move, children: moveMenu });
        return parseContextMenuMap(e, node, menus, t);
    };

    function parseContextMenuMap(e, node, menus, t) {
        return $.array.map(menus, function (value) {
            if (!value || $.util.isString(value)) { return value; }
            var ret = $.extend({}, value);
            ret.id = $.isFunction(value.id) ? value.id.call(ret, e, node, t) : value.id;
            ret.text = $.isFunction(value.text) ? value.text.call(ret, e, node, t) : value.text;
            ret.iconCls = $.isFunction(value.iconCls) ? value.iconCls.call(ret, e, node, t) : value.iconCls;
            ret.disabled = $.isFunction(value.disabled) ? value.disabled.call(ret, e, node, t) : value.disabled;
            ret.hideOnClick = $.isFunction(value.hideOnClick) ? value.hideOnClick.call(ret, e, node, t) : value.hideOnClick;
            ret.onclick = $.isFunction(value.onclick) ? function (e, item, menu) { value.onclick.call(this, e, node, t, item, menu); } : value.onclick;
            ret.handler = $.isFunction(value.handler) ? function (e, item, menu) { value.handler.call(this, e, node, t, item, menu); } : value.handler;
            if (ret.children && ret.children.length) { ret.children = parseContextMenuMap(e, node, ret.children, t); }
            return ret;
        });
    };


    /******************** initExtensions Begin ********************/
    var initExtensions = $.fn.tree.extensions.initExtensions = function (t, opts) {
        var exts = opts._extensions ? opts._extensions : opts._extensions = {};
        if (exts._initialized) { return; }
        initAutoToggle(t, opts, exts);
        initContextMenu(t, opts, exts);
        initBindDblClickEvent(t, opts, exts);
        exts._initialized = true;
    };

    var parseQueryParams = $.fn.tree.extensions.parseQueryParams = function (opts, param) {
        var ret = $.extend({}, param, opts.queryParams);
        return $.util.parseMapFunction(ret);
    };

    var loader = $.fn.tree.extensions.loader = function (param, success, error) {
        var t = $.util.parseJquery(this), opts = t.tree("options");
        initExtensions(t, opts);
        if (!opts.url) { return false; }
        param = parseQueryParams(opts, param);
        $.ajax({
            type: opts.method, url: opts.url, data: param, dataType: "json",
            success: function (data) { success(data); },
            error: function () { error.apply(this, arguments); }
        });
    };

    var _onExpand = $.fn.tree.defaults.onExpand;
    var onExpand = $.fn.tree.extensions.onExpand = function (node) {
        if ($.isFunction(_onExpand)) { _onExpand.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.tree("options");
        if (opts.onlyNodeExpand) {
            var nodes = t.tree("getNears", node.target), animate = opts.animate
            opts.animate = false;
            $.each($.array.filter(nodes, function (val) { return val.target != node.target && val.state == "open"; }), function () {
                t.tree("collapse", this.target);
            });
            opts.animate = animate;
        }
    };

    var _loadFilter = $.fn.tree.defaults.loadFilter;
    var loadFilter = $.fn.tree.extensions.loadFilter = function (data, parent) {
        if ($.isFunction(_loadFilter)) { data = _loadFilter.apply(this, arguments); }
        data = $.array.likeArray(data) && !$.util.isString(data) ? data : [];
        if (!data.length) { return data; }
        var t = $.util.parseJquery(this), opts = t.tree("options");
        return opts.smooth ? $.fn.tree.extensions.smoothConverter(data, opts) : data;
    };
    /******************** initExtensions   End ********************/

    $.fn.tree.extensions.smoothConverter = function (data, opts) {
        data = data || [];
        var ret = data, idField = opts.idField || "id", parentField = opts.parentField || "pid";
        if (opts.smooth) {
            var roots = $.array.filter(data, function (val) {
                if (val[parentField] == null || val[parentField] == undefined) { return true; }
                return !$.array.some(data, function (value) { return val[parentField] == value[idField]; });
            });
            var findChildren = function (array, value) {
                var temps = $.array.filter(array, function (val) {
                    return val[parentField] == null || val[parentField] == undefined ? false : val[parentField] == value[idField];
                });
                return $.array.map(temps, function (val) {
                    var children = findChildren(array, val);
                    if (children.length) {
                        val.children = $.array.likeArray(val.children) && !$.util.isString(val.children) ? val.children : [];
                        $.array.merge(val.children, children);
                    }
                    return val;
                });
            };
            ret = $.array.map(roots, function (val) {
                var children = findChildren(data, val);
                if (children.length) {
                    val.children = $.array.likeArray(val.children) && !$.util.isString(val.children) ? val.children : [];
                    $.array.merge(val.children, children);
                }
                return val;
            });
        }
        return ret;
    };

    var methods = $.fn.tree.extensions.methods = {
        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u5236\u5B9A\u7684 tree-node \u662F\u5426\u4E3A\u6839\u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      target: \u7528\u4E8E\u5224\u65AD\u7684 tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u6307\u5B9A\u7684 jQuery \u5BF9\u8C61\u662F\u8BE5 easyui-tree \u7684\u6839\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isRoot: function (jq, target) { return isRootNode(jq[0], target); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u7528\u4E8E\u663E\u793A\u6307\u5B9A\u8282\u70B9\u6216\u6811\u63A7\u4EF6\u7684\u5C5E\u6027\u4FE1\u606F\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      target: \u8981\u663E\u793A\u5C5E\u6027\u4FE1\u606F\u7684 tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF1B\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5219\u663E\u793A\u6811\u63A7\u4EF6\u7684\u5C5E\u6027\u4FE1\u606F\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-tree \u7EC4\u4EF6\u7684 jQuery \u5BF9\u8C61\u3002
        showOption: function (jq, target) { return jq.each(function () { showOption(this, target); }); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u7528\u4E8E\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u7684\u7EA7\u522B\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 target \u8868\u793A\u8981\u83B7\u53D6\u7EA7\u522B\u7684 tree-node \u8282\u70B9\u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C target \u8868\u793A\u7684 DOM \u5BF9\u8C61\u5B58\u5728\u4E8E\u6B64 easyui-tree\uFF0C\u5219\u8FD4\u56DE\u8868\u793A\u5176\u6240\u5728\u8282\u70B9\u7EA7\u522B\u7684\u6570\u5B57(\u4ECE 1 \u5F00\u59CB\u8BA1\u6570)\uFF0C\u5426\u5219\u8FD4\u56DE 0\u3002
        getLevel: function (jq, target) { return getLevel(jq[0], target); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u79FB\u52A8\u6307\u5B9A\u7684\u8282\u70B9\u5230\u53E6\u4E00\u4E2A\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param:   \u8FD9\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          target: \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u7684 tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //          source: \u8868\u793A\u8981\u79FB\u52A8\u7684 tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //          point:  \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u9009\u7684\u503C\u5305\u62EC\uFF1A
        //              "append":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u8282\u70B9 target \u7684\u5B50\u8282\u70B9\uFF0C\u9ED8\u8BA4\u503C\uFF1B
        //              "top":      \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4E0A\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //              "bottom":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u8282\u70B9 target \u7684\u4E0B\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-tree \u7EC4\u4EF6\u7684 jQuery \u5BF9\u8C61\u3002
        move: function (jq, param) { return jq.each(function () { moveNode(this, param); }); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u79FB\u52A8\u6307\u5B9A\u8282\u70B9\u7684\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param:  \u8FD9\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          target: \u8868\u793A\u8981\u79FB\u52A8\u7684 tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //          point:  \u8868\u793A\u79FB\u52A8 target \u7684\u65B9\u5F0F\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u9009\u7684\u503C\u62A5\u9519\uFF1A
        //              "up":       \u8868\u793A\u5C06 target \u6240\u8868\u793A\u7684 tree-node \u79FB\u52A8\u5230\u4E0A\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //              "upLevel":  \u8868\u793A\u5C06 target \u6240\u8868\u793A\u7684 tree-node \u79FB\u52A8\u5230\u4E0A\u4E00\u7EA7\u7684\u672B\u5C3E\uFF1B
        //              "down":     \u8868\u793A\u5C06 target \u6240\u8868\u793A\u7684 tree-node \u79FB\u52A8\u5230\u4E0B\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //              "downLevel":\u8868\u793A\u5C06 target \u6240\u8868\u793A\u7684 tree-node \u79FB\u52A8\u5230\u4E0B\u4E00\u7EA7\u7684\u672B\u5C3E\uFF1B
        //              \u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u503C\u6216\u8005\u8BE5\u503C\u4E3A\u7A7A\u6216\u8BE5\u503C\u4E0D\u662F\u4E0A\u9762\u56DB\u4E2A\u4E4B\u4E00\uFF0C\u5219\u4E0D\u8FDB\u884C\u4EFB\u4F55\u64CD\u4F5C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-tree \u7EC4\u4EF6\u7684 jQuery \u5BF9\u8C61\u3002
        shift: function (jq, param) { return jq.each(function () { shiftNode(this, param); }); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u4E24\u4E2A tree-node \u4E4B\u95F4\u7684\u5173\u7CFB\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param\uFF1A  \u8FD9\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          target1:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E00\u4E2A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //          target2:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E8C\u4E2A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A String \u7C7B\u578B\u7684\u503C\uFF1A
        //      \u5982\u679C target1 \u662F target2 \u7684\u5B50\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE "child"\uFF1B
        //      \u5982\u679C target1 \u662F target2 \u7684\u7236\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE "parent"\uFF1B
        //      \u5982\u679C target1 \u548C target2 \u662F\u5177\u6709\u540C\u4E00\u4E2A\u7236\u7EA7\u8282\u70B9\u7684\u5E73\u7EA7\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE "sibling"\uFF1B
        //      \u5982\u679C target1 \u548C target2 \u65E2\u4E0D\u662F\u7236\u5B50\u7EA7\u5173\u7CFB\uFF0C\u4E5F\u4E0D\u662F\u5177\u6709\u540C\u4E00\u4E2A\u7236\u7EA7\u8282\u70B9\u7684\u5E73\u7EA7\u8282\u70B9\u5173\u7CFB\uFF0C\u5219\u8FD4\u56DE "normal"\uFF1B
        compare: function (jq, param) { return compareNode(jq[0], param); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u4E00\u4E2A\u8282\u70B9\u662F\u5426\u4E3A\u53E6\u4E00\u4E2A\u8282\u70B9\u7684\u5B50\u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param\uFF1A  \u8FD9\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          target1:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E00\u4E2A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //          target2:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E8C\u4E2A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C tree-node target1 \u662F tree-node target2 \u7684\u5B50\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isChild: function (jq, param) { return isChild(jq[0], param); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u4E00\u4E2A\u8282\u70B9\u662F\u5426\u4E3A\u53E6\u4E00\u4E2A\u8282\u70B9\u7684\u7236\u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param\uFF1A  \u8FD9\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          target1:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E00\u4E2A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //          target2:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E8C\u4E2A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C tree-node target1 \u662F tree-node target2 \u7684\u7236\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isParent: function (jq, param) { return isParent(jq[0], param); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u4E00\u4E2A\u8282\u70B9\u662F\u5426\u548C\u53E6\u4E00\u4E2A\u8282\u70B9\u4E3A\u5177\u6709\u540C\u4E00\u4E2A\u7236\u8282\u70B9\u7684\u5E73\u7EA7\u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param\uFF1A  \u8FD9\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          target1:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E00\u4E2A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //          target2:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E8C\u4E2A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C tree-node target1 \u548C tree-node target2 \u662F\u5177\u6709\u540C\u4E00\u4E2A\u7236\u7EA7\u8282\u70B9\u7684\u5E73\u7EA7\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isSibling: function (jq, param) { return isSibling(jq[0], param); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u7684\u5E73\u7EA7\u4E0B\u4E00\u683C\u4F4D\u7F6E\u7684 tree-node \u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      target:  \u6307\u5B9A\u7684\u8868\u793A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE tree-node target \u7684\u540C\u7EA7\u522B\u4E0B\u4E00\u683C\u4F4D\u7F6E\u7684 tree-node \u8282\u70B9 node \u5BF9\u8C61\uFF1B\u8BE5 node \u5BF9\u8C61\u542B\u6709\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      id、text、iconCls、checked、state、attributes、target\uFF1B
        //      \u5982\u679C\u8BE5 tree-node target \u4E3A\u5F53\u524D\u7EA7\u522B\u7684\u6700\u540E\u4E00\u4E2A\u8282\u70B9\u5373\u6CA1\u6709\u4E0B\u4E00\u683C\u8282\u70B9\uFF1B\u5219\u8FD4\u56DE null\u3002
        next: function (jq, target) { return getNextNode(jq[0], target); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u7684\u5E73\u7EA7\u4E0A\u4E00\u683C\u4F4D\u7F6E\u7684 tree-node \u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      target:  \u6307\u5B9A\u7684\u8868\u793A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE tree-node target \u7684\u540C\u7EA7\u522B\u4E0A\u4E00\u683C\u4F4D\u7F6E\u7684 tree-node \u8282\u70B9\u5BF9\u8C61\uFF1B\u8BE5 tree-node \u5BF9\u8C61\u542B\u6709\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      id、text、iconCls、checked、state、attributes、target\uFF1B
        //      \u5982\u679C\u8BE5 tree-node target \u4E3A\u5F53\u524D\u7EA7\u522B\u7684\u7B2C\u4E00\u4E2A\u8282\u70B9\u5373\u6CA1\u6709\u4E0A\u4E00\u683C\u8282\u70B9\uFF1B\u5219\u8FD4\u56DE null\u3002
        prev: function (jq, target) { return getPrevNode(jq[0], target); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u7684\u540C\u7EA7\u6240\u6709\u8282\u70B9(\u5305\u542B\u81EA\u8EAB)\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      target:  \u6307\u5B9A\u7684\u8868\u793A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE tree-node target \u7684\u540C\u7EA7\u522B(\u5177\u6709\u548C\u5F53\u524D target \u540C\u4E00\u4E2A\u7236\u7EA7\u8282\u70B9)\u6240\u6709\u8282\u70B9\u6784\u6210\u7684\u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\uFF1B
        //      \u6570\u7EC4\u4E2D\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u662F\u4E00\u4E2A\u5305\u542B\u5C5E\u6027 id、text、iconCls、checked、state、attributes、target \u7684 tree-node \u5BF9\u8C61\u3002
        //      \u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 target \u662F\u6839\u8282\u70B9\u6216\u8005\u672A\u5B9A\u4E49 target \u53C2\u6570\uFF0C\u5219\u8BE5\u65B9\u6CD5\u548C getRoots \u65B9\u6CD5\u8FD4\u56DE\u7684\u503C\u76F8\u540C\uFF1B
        //      \u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 target \u4E0D\u662F\u4E00\u4E2A div.tree-node \u6216\u8005\u5176\u4E0D\u5305\u542B\u5728\u5F53\u524D easyui-tree \u4E2D\uFF0C\u5219\u8FD4\u56DE null\u3002
        getNears: function (jq, target) { return getNears(jq[0], target); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u7684\u4E0B\u4E00\u7EA7\u6240\u6709\u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      target:  \u6307\u5B9A\u7684\u8868\u793A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE tree-node target \u7684\u4E0B\u4E00\u7EA7\u6240\u6709\u8282\u70B9\u6784\u6210\u7684\u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\uFF1B
        //      \u6570\u7EC4\u4E2D\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u662F\u4E00\u4E2A\u5305\u542B\u5C5E\u6027 id、text、iconCls、checked、state、attributes、target \u7684 tree-node \u5BF9\u8C61\u3002
        //      \u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 target \u6CA1\u6709\u5B50\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u5305\u542B 0 \u4E2A\u5143\u7D20\u7684\u6570\u7EC4\u3002
        //      \u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 target \u4E0D\u662F\u4E00\u4E2A div.tree-node \u6216\u8005\u5176\u4E0D\u5305\u542B\u5728\u5F53\u524D easyui-tree \u4E2D\uFF0C\u5219\u8FD4\u56DE null\u3002
        //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u548C getChildren \u7684\u4E0D\u540C\u4E4B\u5904\u5728\u4E8E\uFF0CgetChildren \u65B9\u6CD5\u8FD4\u56DE\u7684\u662F target \u4E0B\u7684\u6240\u6709\u5B50\u8282\u70B9\u5185\u5BB9\uFF1B
        getNearChildren: function (jq, target) { return getNearChildren(jq[0], target); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u7528\u4E8E\u53D6\u6D88\u6307\u5B9A\u6811\u8282\u70B9\u7684\u9009\u62E9\u72B6\u6001\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      target:  \u6307\u5B9A\u7684\u8868\u793A tree-node \u7684 jQuery \u6216 DOM \u5BF9\u8C61\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-tree \u7EC4\u4EF6\u7684 jQuery \u5BF9\u8C61\u3002
        unselect: function (jq, target) { return jq.each(function () { unselect(this, target); }); },

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u8BF7\u6C42\u8FDC\u7A0B\u670D\u52A1\u5668\u5730\u5740\u5E76\u52A0\u8F7D\u6570\u636E\uFF0C\u5E76\u5C06\u8FD4\u56DE\u7684\u6570\u636E\u8BBE\u7F6E\u4E3A\u5F53\u524D easyui-tree \u7684\u8282\u70B9\u6570\u636E\u96C6\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param\uFF1A\u8868\u793A\u8981\u8FDB\u884C\u8FDC\u7A0B\u8BF7\u6C42\u7684\u65B9\u5F0F\uFF0C\u8BE5\u53C2\u6570\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //          String \u7C7B\u578B\u503C\uFF1A\u8868\u793A\u4F5C\u4E3A\u8FDC\u7A0B\u6570\u636E\u8BF7\u6C42\u7684\u76EE\u6807 url \u5730\u5740\uFF1B
        //          JSON-Object \u7C7B\u578B\u503C\uFF1A\u8868\u793A\u53D1\u9001\u81F3\u8FDC\u7A0B\u670D\u52A1\u5668\u7684\u67E5\u8BE2\u53C2\u6570\uFF1B
        //      \u5982\u679C\u672A\u5B9A\u4E49\u53C2\u6570 param\uFF0C\u5219\u76F8\u5F53\u4E8E\u76F4\u63A5\u6267\u884C\u4E0D\u5E26\u53C2\u6570 { id } \u7684 reload \u65B9\u6CD5(reload \u65B9\u6CD5\u7684\u6267\u884C\u9ED8\u8BA4\u4F1A\u5C06\u6307\u5B9A\u8282\u70B9\u7684 id \u4F5C\u4E3A\u53C2\u6570\u53D1\u9001\u5230\u8FDC\u7A0B\u670D\u52A1\u5668\u5730\u5740)\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-tree \u7EC4\u4EF6\u7684 jQuery \u5BF9\u8C61\u3002
        load: function (jq, param) { return jq.each(function () { remoteLoad(this, param); }); }
    };
    var defaults = $.fn.tree.extensions.defaults = {

        //  \u589E\u52A0 easyui-tree \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1B
        //      \u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u8BBE\u5B9A\u4E86\u5C5E\u6027 contextMenu \u65F6\uFF0C\u662F\u5426\u5C06\u53CC\u51FB\u6570\u636E\u884C onDblClick \u4E8B\u4EF6\u7684\u54CD\u5E94\u51FD\u6570
        //      \u8BBE\u7F6E\u4E3A contextMenu \u7684\u7B2C\u4E00\u4E2A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u54CD\u5E94\u51FD\u6570\uFF0C\u5E76\u5C06\u8BE5\u83DC\u5355\u9879\u7684\u5B57\u4F53\u52A0\u7C97\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //  \u5907\u6CE8\uFF1A\u5F53\u8BBE\u7F6E\u4E86\u81EA\u5B9A\u4E49\u5C5E\u6027 contextMenu \u65F6\u5019\uFF0C\u8BE5\u529F\u80FD\u65B9\u6709\u6548\u3002
        //      \u81EA\u52A8\u7ED1\u5B9A\u7684 onClick \u7684\u56DE\u8C03\u51FD\u6570\u4E2D\u5C06\u4F1A\u8C03\u7528 contextMenu \u7684\u7B2C "dblClickMenuIndex" \u4E2A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u54CD\u5E94\u51FD\u6570\uFF0C\u4F46\u662F\u56DE\u8C03\u51FD\u6570\u4E2D\u4E0D\u80FD\u7528\u5230\u53C2\u6570 e \u548C menu\u3002
        autoBindDblClick: true,

        //  \u589E\u52A0 easyui-tree \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1B
        //  \u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u8BBE\u5B9A\u4E86\u5C5E\u6027 autoBindDblClick: true\uFF0C\u53CC\u51FB\u884C\u6570\u636E\u89E6\u53D1\u7684\u53F3\u952E\u83DC\u5355\u9879\u4E8B\u4EF6\u7684\u7D22\u5F15\u53F7\uFF1B
        //      \u610F\u5373\u89E6\u53D1\u7B2C\u51E0\u4E2A\u53F3\u952E\u83DC\u5355\u9879\u4E0A\u7684\u4E8B\u4EF6\u3002
        //  Number \u7C7B\u578B\u503C\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF0C\u9ED8\u8BA4\u4E3A 0\uFF1B
        //  \u5907\u6CE8\uFF1A\u5F53\u8BBE\u7F6E\u4E86\u81EA\u5B9A\u4E49\u5C5E\u6027 autoBindDblClick: true \u65F6\uFF0C\u8BE5\u529F\u80FD\u65B9\u6709\u6548\uFF1B\u5982\u679C\u6B64\u7D22\u5F15\u503C\u8D85\u51FA\u83DC\u5355\u6570\u91CF\u8303\u56F4\uFF0C\u5219\u65E0\u6548\u3002
        dblClickMenuIndex: 0,

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u5F53\u524D easyui-tree \u63A7\u4EF6\u662F\u5426\u652F\u6301\u5E73\u6ED1\u6570\u636E\u683C\u5F0F\u3002
        //  \u5F53\u652F\u6301\u5E73\u6ED1\u6570\u636E\u683C\u5F0F\u65F6\uFF0C\u6570\u636E\u5143\u7D20\u4E2D\u4E0D\u9700\u8981\u901A\u8FC7\u6307\u5B9A children \u6765\u6307\u5B9A\u5B50\u8282\u70B9\uFF0C\u800C\u662F\u652F\u6301\u901A\u8FC7 pid \u5C5E\u6027\u6765\u6307\u793A\u5176\u7236\u7EA7\u8282\u70B9\u3002
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        smooth: false,

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u5F53\u53F3\u952E\u70B9\u51FB tree-node \u65F6\uFF0C\u662F\u5426\u81EA\u52A8\u9009\u62E9\u88AB\u70B9\u51FB\u7684 tree-node \u5BF9\u8C61\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B
        selectOnContextMenu: false,

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u5F53\u5DE6\u952E\u70B9\u51FB\u5E26\u6709\u5B50\u8282\u70B9\u7684\u6761\u76EE\u65F6\uFF0C\u662F\u5426\u81EA\u52A8\u5C55\u5F00/\u6298\u53E0\u76F8\u5E94\u8282\u70B9\u3002
        //  Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        //  \u5907\u6CE8\uFF1A\u8BE5\u529F\u80FD\u4E0D\u4F1A\u5F71\u54CD\u5230 easyui-tree \u7684\u539F\u751F\u4E8B\u4EF6 onClick\u3002
        toggleOnClick: false,

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u540C\u4E00\u7EA7\u83DC\u5355\u8282\u70B9\u4E0B\uFF0C\u53EA\u5141\u8BB8\u4E00\u4E2A\u8282\u70B9\u88AB\u5C55\u5F00\u3002
        //  Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        //  \u5F53\u8BE5\u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u5EFA\u8BAE\u540C\u65F6\u628A animate \u5C5E\u6027\u8BBE\u7F6E\u4E3A false\uFF0C\u4EE5\u514D\u5F71\u54CD\u83DC\u5355\u8054\u52A8\u6298\u53E0\u65F6\u7684\u7F8E\u89C2\u6548\u679C\u3002
        onlyNodeExpand: false,

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u5F53\u524D easyui-tree \u7EC4\u4EF6\u7684\u53F3\u952E\u83DC\u5355\u3002
        //  Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        //  \u5907\u6CE8\uFF1A\u8BE5\u529F\u80FD\u4E0D\u4F1A\u5F71\u54CD\u5230 easyui-tree \u7684\u539F\u751F\u4E8B\u4EF6 onContextMenu\u3002
        enableContextMenu: true,

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u5F53\u524D easyui-tree \u7684\u53F3\u952E\u83DC\u5355\uFF1B
        //  \u8FD9\u662F\u4E00\u4E2A\u6570\u7EC4\u7C7B\u578B\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5 JSON-Object \u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      id:         \u8868\u793A\u83DC\u5355\u9879\u7684 id\uFF1B
        //      text:       \u8868\u793A\u83DC\u5355\u9879\u7684\u663E\u793A\u6587\u672C\uFF1B
        //      iconCls:    \u8868\u793A\u83DC\u5355\u9879\u7684\u5DE6\u4FA7\u663E\u793A\u56FE\u6807\uFF1B
        //      disabled:   \u8868\u793A\u83DC\u5355\u9879\u662F\u5426\u88AB\u7981\u7528(\u7981\u7528\u7684\u83DC\u5355\u9879\u70B9\u51FB\u65E0\u6548)\uFF1B
        //      hideOnClick:    \u8868\u793A\u8BE5\u83DC\u5355\u9879\u70B9\u51FB\u540E\u6574\u4E2A\u53F3\u952E\u83DC\u5355\u662F\u5426\u7ACB\u5373\u81EA\u52A8\u9690\u85CF\uFF1B
        //      bold:           Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B\u8868\u793A\u8BE5\u83DC\u5355\u9879\u662F\u5426\u5B57\u4F53\u52A0\u7C97\uFF1B
        //      style:          JSON-Object \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A null\uFF1B\u8868\u793A\u8981\u9644\u52A0\u5230\u8BE5\u83DC\u5355\u9879\u7684\u6837\u5F0F\uFF1B
        //      handler:    \u8868\u793A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u683C\u5F0F\u4E3A function(e, node, tree, item, menu)\uFF0C\u5176\u4E2D this \u6307\u5411\u83DC\u5355\u9879\u672C\u8EAB
        //  \u5907\u6CE8\uFF1A\u5F53 enableContextMenu \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u6709\u6548\u3002
        //  \u5907\u6CE8\uFF1A\u8BE5\u529F\u80FD\u4E0D\u4F1A\u5F71\u54CD\u5230 easyui-tree \u7684\u539F\u751F\u4E8B\u4EF6 onContextMenu\u3002
        contextMenu: null,

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u5C55\u5F00\u5F53\u524D、\u6298\u53E0\u5F53\u524D、\u5C55\u5F00\u5F53\u524D\u6240\u6709、\u6298\u53E0\u5F53\u524D\u6240\u6709\u201D\u83DC\u5355\u9879\u7684\u529F\u80FD\uFF1B
        //  \u8BE5\u5C5E\u6027\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\uFF1B
        //      JSON-Object \u7C7B\u578B\uFF0C\u8BE5 JSON-Object \u53EF\u4EE5\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          expand:     \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u5C55\u5F00\u5F53\u524D\u201D\u83DC\u5355\uFF1B
        //          expandAll:  \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u5C55\u5F00\u5F53\u524D\u6240\u6709\u201D\u83DC\u5355\uFF1B
        //          collapse:   \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u6298\u53E0\u5F53\u524D\u201D\u83DC\u5355\uFF1B
        //          collapseAll: \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u6298\u53E0\u5F53\u524D\u6240\u6709\u201D\u83DC\u5355\uFF1B
        //          submenu:    \u8868\u793A\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\u662F\u5426\u4EE5\u5B50\u83DC\u5355\u65B9\u5F0F\u5448\u73B0\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //          \u4E0A\u9762\u56DB\u4E2A\u5C5E\u6027\uFF0C\u5982\u679C\u53C2\u6570\u7684\u503C\u4E3A\u51FD\u6570\uFF0C\u5219\u51FD\u6570\u7684\u7B7E\u540D\u4E3A function(e, node, tree, item, menu)\u3002
        //  \u5907\u6CE8\uFF1A\u5F53 enableContextMenu \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u6709\u6548\u3002
        //      \u8FD9\u56DB\u4E2A\u83DC\u5355\u70B9\u51FB\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1 easyui-tree \u7684\u6298\u53E0/\u5C55\u5F00\u83DC\u5355\u9879\u7684\u76F8\u5E94\u4E8B\u4EF6\u3002
        toggleMenu: true,

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u4E0A\u79FB、\u4E0B\u79FB、\u4E0A\u79FB\u4E00\u7EA7、\u4E0B\u79FB\u4E00\u7EA7\u201D\u83DC\u5355\u9879\u7684\u529F\u80FD\uFF1B
        //  \u5907\u6CE8\uFF1A\u5F53 enableContextMenu \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u6709\u6548\u3002
        //  \u8BE5\u5C5E\u6027\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B
        //      JSON-Object \u7C7B\u578B\uFF0C\u8BE5 JSON-Object \u53EF\u4EE5\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          up:         \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u4E0A\u79FB\u201D\u83DC\u5355\uFF1B
        //          upLevel:    \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u4E0A\u79FB\u4E00\u7EA7\u201D\u83DC\u5355\uFF1B
        //          down:       \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u4E0B\u79FB\u201D\u83DC\u5355\uFF1B
        //          downLevel:  \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u4E0B\u79FB\u4E00\u7EA7\u201D\u83DC\u5355\uFF1B
        //          submenu:    \u8868\u793A\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\u662F\u5426\u4EE5\u5B50\u83DC\u5355\u65B9\u5F0F\u5448\u73B0\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //          \u4E0A\u9762\u56DB\u4E2A\u5C5E\u6027\uFF0C\u5982\u679C\u53C2\u6570\u7684\u503C\u4E3A\u51FD\u6570\uFF0C\u5219\u51FD\u6570\u7684\u7B7E\u540D\u4E3A function(e, node, tree, item, menu)\u3002
        //      \u8FD9\u56DB\u4E2A\u83DC\u5355\u70B9\u51FB\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1 easyui-tree \u7684 onDrop \u4E8B\u4EF6\u3002
        moveMenu: false,

        //  \u6269\u5C55 easyui-tree \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u5728\u542F\u7528\u53F3\u952E\u83DC\u5355\u7684\u60C5\u51B5\u4E0B\uFF0C\u53F3\u952E\u83DC\u5355\u9879\u4E2D\u662F\u5426\u663E\u793A "\u663E\u793A Tree \u7684 Option" \u83DC\u5355\u9879
        //  Boolean \u7C7B\u578B\u503C\uFF1B\u9ED8\u8BA4\u4E3A false\u3002
        showOption: false,

        //  \u8868\u793A\u5F53\u6267\u884C\u8FDC\u7A0B\u8BF7\u6C42\u83B7\u53D6\u6570\u636E\u65F6\uFF0C\u88AB\u4E00\u5E76\u53D1\u9001\u5230\u670D\u52A1\u5668\u7684\u67E5\u8BE2\u53C2\u6570\uFF0C\u53C2\u8003 easyui-datagrid \u4E2D\u7684 queryParams \u5C5E\u6027\u5B9A\u4E49\uFF1B
        //  \u8FD9\u662F\u4E00\u4E2A JSON-Object \u7C7B\u578B\u53C2\u6570\u5BF9\u8C61\uFF0C\u5176\u4E2D\u6BCF\u4E00\u4E2A\u5C5E\u6027\u7684\u503C\u53EF\u4EE5\u662F\u503C\u7C7B\u578B\uFF0C\u4E5F\u53EF\u4EE5\u662F\u8FD4\u56DE\u503C\u7684\u51FD\u6570\u3002
        queryParams: {},

        //  \u8986\u76D6 easyui-tree \u7684\u539F\u751F\u5C5E\u6027 loader\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        loader: loader,

        //  \u8986\u76D6 easyui-tree \u7684\u539F\u751F\u5C5E\u6027 loadFilter\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD(\u652F\u6301\u5E73\u6ED1\u6570\u636E\u683C\u5F0F)\u3002
        loadFilter: loadFilter,

        //  \u8986\u76D6 easyui-tree \u7684\u539F\u751F\u4E8B\u4EF6 onExpand\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        onExpand: onExpand
    };

    $.extend($.fn.tree.defaults, defaults);
    $.extend($.fn.tree.methods, methods);

})(jQuery);