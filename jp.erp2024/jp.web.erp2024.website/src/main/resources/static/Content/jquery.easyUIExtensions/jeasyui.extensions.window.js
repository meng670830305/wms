/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI window Extensions 1.0 beta
* jQuery EasyUI window \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.window.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-09-22
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*   3、jeasyui.extensions.menu.js v1.0 beta late
*   4、jeasyui.extensions.panel.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/

/*
\u529F\u80FD\u8BF4\u660E\uFF1A
*/
(function ($, undefined) {


    $.fn.window.extensions = {};


    var initialize = function (target) {
        var t = $.util.parseJquery(target);
        var state = $.data(target, "window"), opts = t.window("options");
        if (!opts._initialized) {
            t.window("header").on({
                dblclick: function () {
                    var opts = t.window("options");
                    if (opts.autoRestore) { if (opts.maximized) { t.window("restore"); } else if (opts.maximizable) { t.window("maximize"); } }
                },
                contextmenu: function (e) {
                    var opts = t.window("options");
                    if (opts.enableHeaderContextMenu) {
                        e.preventDefault();
                        var items = [
                            { text: "\u6700\u5927\u5316", iconCls: "panel-tool-max", disabled: !opts.maximized && opts.maximizable ? false : true, onclick: function () { t.window("maximize"); } },
                            { text: "\u6062\u590D", iconCls: "panel-tool-restore", disabled: opts.maximized ? false : true, onclick: function () { t.window("restore"); } },
                            "-",
                            { text: "\u5173\u95ED", iconCls: "panel-tool-close", disabled: !opts.closable, onclick: function () { t.window("close"); } }
                        ];
                        var headerContextMenu = $.array.likeArray(opts.headerContextMenu) ? opts.headerContextMenu : [];
                        if (headerContextMenu.length) { $.array.insertRange(items, 0, $.util.merge([], headerContextMenu, "-")); }
                        items = parseContextMenuMap(e, items, t);
                        $.easyui.showMenu({ items: items, left: e.pageX, top: e.pageY });
                    }
                }
            });
            opts._initialized = true;
        }
        if (opts.draggable) {
            var dragOpts = state.window.draggable("options");
            var _onStartDrag = dragOpts.onStartDrag, _onStopDrag = dragOpts.onStopDrag;
            dragOpts.onStartDrag = function () { _onStartDrag.apply(this, arguments); t.window("body").addClass("window-body-hidden").children().addClass("window-body-hidden-proxy"); };
            dragOpts.onStopDrag = function () { _onStopDrag.apply(this, arguments); t.window("body").removeClass("window-body-hidden").children().removeClass("window-body-hidden-proxy"); };
        }
    };

    function parseContextMenuMap(e, menus, win) {
        return $.array.map(menus, function (value, index) {
            if (!value || $.util.isString(value)) { return value; }
            var ret = $.extend({}, value);
            ret.id = $.isFunction(value.id) ? value.id.call(ret, e, win) : value.id;
            ret.text = $.isFunction(value.text) ? value.text.call(ret, e, win) : value.text;
            ret.iconCls = $.isFunction(value.iconCls) ? value.iconCls.call(ret, e, win) : value.iconCls;
            ret.disabled = $.isFunction(value.disabled) ? value.disabled.call(ret, e, win) : value.disabled;
            ret.hideOnClick = $.isFunction(value.hideOnClick) ? value.hideOnClick.call(ret, e, win) : value.hideOnClick;
            ret.onclick = $.isFunction(value.onclick) ? function (e, item, menu) { value.onclick.call(this, e, win, item, menu); } : value.onclick;
            ret.handler = $.isFunction(value.handler) ? function (e, item, menu) { value.handler.call(this, e, win, item, menu); } : value.handler;
            if (ret.children && ret.children.length) { ret.children = parseContextMenuMap(e, ret.children, win); }
            return ret;
        });
    };


    var _window = $.fn.window;
    $.fn.window = function (options, param) {
        if (typeof options == "string") { return _window.apply(this, arguments); }
        options = options || {};
        return this.each(function () {
            var jq = $.util.parseJquery(this);
            _window.call(jq, options);
            initialize(this);
        });
    };
    $.union($.fn.window, _window);



    var methods = $.fn.window.extensions.methods = {};
    var defaults = $.fn.window.extensions.defaults = $.extend({}, $.fn.panel.extensions.defaults, {

        //  \u6269\u5C55 easyui-window \u4EE5\u53CA easyui-dialog \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u8BE5\u7A97\u53E3\u5BF9\u8C61\u662F\u5426\u5728\u5C4F\u5E55\u5927\u5C0F\u8C03\u6574\u7684\u60C5\u51B5\u4E0B\u81EA\u52A8\u8FDB\u884C\u5DE6\u53F3\u5C45\u4E2D\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        autoHCenter: true,

        //  \u6269\u5C55 easyui-window \u4EE5\u53CA easyui-dialog \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u8BE5\u7A97\u53E3\u5BF9\u8C61\u662F\u5426\u5728\u5C4F\u5E55\u5927\u5C0F\u8C03\u6574\u7684\u60C5\u51B5\u4E0B\u81EA\u52A8\u8FDB\u884C\u4E0A\u4E0B\u5C45\u4E2D\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        autoVCenter: true,

        //  \u6269\u5C55 easyui-window \u4EE5\u53CA easyui-dialog \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u8BE5\u7A97\u53E3\u5BF9\u8C61\u662F\u5426\u5728\u6309\u4E0B ESC\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        autoCloseOnEsc: true,

        //  \u6269\u5C55 easyui-window \u4EE5\u53CA easyui-dialog \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u8BE5\u7A97\u53E3\u662F\u5426\u5728\u53CC\u51FB\u5934\u90E8\u65F6\u81EA\u52A8\u6700\u5927\u5316\u3002
        autoRestore: true,

        //  \u6269\u5C55 easyui-window \u4EE5\u53CA easyui-dialog \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u8BE5\u7A97\u53E3\u7684\u53F3\u952E\u83DC\u5355\u3002
        enableHeaderContextMenu: true,

        //  \u6269\u5C55 easyui-window \u4EE5\u53CA easyui-dialog \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u8BE5\u7A97\u53E3\u7684\u53F3\u952E\u83DC\u5355\uFF1B
        //  \u8FD9\u662F\u4E00\u4E2A\u6570\u7EC4\u683C\u5F0F\u5BF9\u8C61\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A menu-item \u5143\u7D20\uFF1B\u8BE5 menu-item \u5143\u7D20\u683C\u5F0F\u5B9A\u4E49\u5982\u4E0B\uFF1A
        //      id:         \u8868\u793A\u83DC\u5355\u9879\u7684 id\uFF1B
        //      text:       \u8868\u793A\u83DC\u5355\u9879\u7684\u663E\u793A\u6587\u672C\uFF1B
        //      iconCls:    \u8868\u793A\u83DC\u5355\u9879\u7684\u5DE6\u4FA7\u663E\u793A\u56FE\u6807\uFF1B
        //      disabled:   \u8868\u793A\u83DC\u5355\u9879\u662F\u5426\u88AB\u7981\u7528(\u7981\u7528\u7684\u83DC\u5355\u9879\u70B9\u51FB\u65E0\u6548)\uFF1B
        //      hideOnClick:    \u8868\u793A\u8BE5\u83DC\u5355\u9879\u70B9\u51FB\u540E\u6574\u4E2A\u53F3\u952E\u83DC\u5355\u662F\u5426\u7ACB\u5373\u81EA\u52A8\u9690\u85CF\uFF1B
        //      bold:           Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B\u8868\u793A\u8BE5\u83DC\u5355\u9879\u662F\u5426\u5B57\u4F53\u52A0\u7C97\uFF1B
        //      style:          JSON-Object \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A null\uFF1B\u8868\u793A\u8981\u9644\u52A0\u5230\u8BE5\u83DC\u5355\u9879\u7684\u6837\u5F0F\uFF1B
        //      handler:    \u8868\u793A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u683C\u5F0F\u4E3A function(e, win, item, menu)\uFF0C\u5176\u4E2D this \u6307\u5411\u83DC\u5355\u9879\u672C\u8EAB
        headerContextMenu: null
    });

    $.extend($.fn.window.defaults, defaults);
    $.extend($.fn.window.methods, methods);

    $(function () {
        //  \u8BBE\u7F6E\u5F53\u5C4F\u5E55\u5927\u5C0F\u8C03\u6574\u65F6\uFF0C\u6240\u6709 easyui-window \u6216 easyui-dialog \u7A97\u53E3\u5728\u5C5E\u6027 autoHCenter: true \u6216 autoVCenter: true \u7684\u60C5\u51B5\u4E0B\u81EA\u52A8\u5C45\u4E2D\u3002
        $(window).resize(function () {
            $(".panel-body.window-body").each(function () {
                var win = $(this), opts = win.window("options");
                if (opts && opts.draggable) {
                    if (opts.autoHCenter || opts.autoVCenter) {
                        var method = opts.autoHCenter && opts.autoVCenter ? "center" : (opts.autoHCenter ? "hcenter" : "vcenter");
                        win.window(method);
                    } else if (opts.inContainer) { win.window("move"); }
                }
            });
        });

        //  \u5728\u5F53\u524D\u6253\u5F00 modal:true \u7684 easyui-window \u6216\u8005 easyui-dialog \u65F6\uFF0C\u6309 ESC \u952E\u5173\u95ED\u9876\u5C42\u7684 easyui-window \u6216\u8005 easyui-dialog \u5BF9\u8C61\u3002
        $(document).keydown(function (e) {
            if (e.which == 27) {
                $("div.window-mask:last").prevAll("div.panel.window:first").children(".panel-body.window-body").each(function () {
                    var win = $(this), opts = win.window("options");
                    if (opts && opts.closable && opts.autoCloseOnEsc && !win.window("header").find(".panel-tool a").attr("disabled")) {
                        $.util.exec(function () { win.window("close"); });
                    }
                });
            }
        });

        //  \u70B9\u51FB\u6A21\u5F0F\u5BF9\u8BDD\u6846\uFF08\u4F8B\u5982 easyui-messager、easyui-window、easyui-dialog\uFF09\u7684\u80CC\u666F\u906E\u853D\u5C42\u4F7F\u7A97\u53E3\u95EA\u52A8
        $("body").on("click", "div.window-mask:last", function (e) {
            $(this).prevAll("div.panel.window:first").shine();
        });
    });


    var css =
        ".window-body-hidden { background-color: #95b8e7; filter: alpha(opacity=60); opacity: 0.6; }" +
        ".window-body-hidden-proxy { visibility: hidden; }" +
        ".window-proxy { background-color: #0e2d5f; filter: alpha(opacity=60); opacity: 0.6; }";
    $.util.addCss(css);

})(jQuery);