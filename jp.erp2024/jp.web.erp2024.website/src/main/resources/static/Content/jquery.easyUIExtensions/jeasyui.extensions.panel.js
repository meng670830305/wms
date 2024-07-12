/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI panel Extensions 1.0 beta
* jQuery EasyUI panel \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.panel.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-09-22
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/

/*
\u529F\u80FD\u8BF4\u660E\uFF1A
*/

(function ($, undefined) {


    $.fn.panel.extensions = {};


    //  easyui-panel、easyui-window、easyui-dialog \u5378\u8F7D\u65F6\u56DE\u6536\u5185\u5B58\uFF0C\u4E3B\u8981\u7528\u4E8E layout、panel(\u53CA\u5176\u7EE7\u627F\u7EC4\u4EF6) \u4F7F\u7528 iframe \u5D4C\u5165\u7F51\u9875\u65F6\u7684\u5185\u5B58\u6CC4\u6F0F\u95EE\u9898
    var onBeforeDestroy = function () {
        $("iframe,frame", this).each(function () {
            try {
                if (this.contentWindow && this.contentWindow.document && this.contentWindow.close) {
                    this.contentWindow.document.write("");
                    this.contentWindow.close();
                }
                if ($.isFunction(window.CollectGarbage)) { window.CollectGarbage(); }
            } catch (ex) { }
        }).remove();
    };
    $.fn.panel.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.window.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.dialog.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.datagrid.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.propertygrid.defaults.onBeforeDestroy = onBeforeDestroy;
    $.fn.treegrid.defaults.onBeforeDestroy = onBeforeDestroy;


    var _onResize = {
        panel: $.fn.panel.defaults.onResize,
        window: $.fn.window.defaults.onResize,
        dialog: $.fn.dialog.defaults.onResize
    };
    var onResize = function (width, height) {
        var p = $.util.parseJquery(this), isWin = p.panel("isWindow"), isDia = p.panel("isDialog"),
            plugin = isDia ? "dialog" : (isWin ? "window" : "panel"),
            _onResizeFn = _onResize[plugin];
        if ($.isFunction(_onResizeFn)) { _onResizeFn.apply(this, arguments); }
        if (!p.panel("inLayout")) {
            var opts = p.panel("options");
            opts.minWidth = $.isNumeric(opts.minWidth) ? opts.minWidth : defaults.minHeight;
            opts.maxWidth = $.isNumeric(opts.maxWidth) ? opts.maxWidth : defaults.maxWidth;
            opts.minHeight = $.isNumeric(opts.minHeight) ? opts.minHeight : defaults.minHeight;
            opts.maxHeight = $.isNumeric(opts.maxHeight) ? opts.maxHeight : defaults.maxHeight;
            var resizable = false;
            if (width > opts.maxWidth) { width = opts.maxWidth; resizable = true; }
            if (width < opts.minWidth) { width = opts.minWidth; resizable = true; }
            if (height > opts.maxHeight) { height = opts.maxHeight; resizable = true; }
            if (height < opts.minHeight) { height = opts.minHeight; resizable = true; }
            if (resizable && !opts.fit) {
                p[plugin]("resize", { width: width, height: height });
            }
        }
    };

    var _onMove = {
        panel: $.fn.panel.defaults.onMove,
        window: $.fn.window.defaults.onMove,
        dialog: $.fn.dialog.defaults.onMove
    };
    var onMove = function (left, top) {
        var p = $.util.parseJquery(this), isWin = p.panel("isWindow"), isDia = p.panel("isDialog"),
            plugin = isDia ? "dialog" : (isWin ? "window" : "panel"),
            _onMoveFn = _onMove[plugin], opts = p.panel("options");
        if ($.isFunction(_onMoveFn)) { _onMoveFn.apply(this, arguments); }
        if (opts.maximized) { return p[plugin]("restore"); }
        if (!opts.inContainer) { return; }
        var panel = p.panel("panel"), parent = panel.parent(), isRoot = parent.is("body"),
            scope = $.extend({}, isRoot ? $.util.windowSize() : { width: parent.innerWidth(), height: parent.innerHeight() }),
            width = $.isNumeric(opts.width) ? opts.width : panel.outerWidth(),
            height = $.isNumeric(opts.height) ? opts.height : panel.outerHeight(),
            moveable = false;
        if (left < 0) { left = 0; moveable = true; }
        if (top < 0) { top = 0; moveable = true; }
        if (moveable) { return p[plugin]("move", { left: left, top: top }); }
        if (left + width > scope.width && left > 0) { left = scope.width - width; moveable = true; }
        if (top + height > scope.height && top > 0) { top = scope.height - height; moveable = true; }
        if (moveable) { return p[plugin]("move", { left: left, top: top }); }
    };



    var inLayout = function (target) {
        var t = $.util.parseJquery(target), body = t.panel("body"), panel = t.panel("panel");
        return body.hasClass("layout-body") && panel.hasClass("layout-panel");
    };

    var inTabs = function (target) {
        var t = $.util.parseJquery(target), panel = t.panel("panel"), panels = panel.parent(), container = panels.parent();
        return panels.hasClass("tabs-panels") && container.hasClass("tabs-container");
    };

    var inAccordion = function (target) {
        var t = $.util.parseJquery(target), panel = t.panel("panel"), container = panel.parent();
        return (container.hasClass("accordion") && $.data(container[0], "accordion")) ? true : false;
    };

    var isWindow = function (target) {
        var t = $.util.parseJquery(target), body = t.panel("body");
        return body.hasClass("window-body") && body.parent().hasClass("window");
    };

    var isDialog = function (target) {
        var t = $.util.parseJquery(target), body = t.panel("body");
        return isWindow(target) && (body.children("div.panel").children("div.panel-body.dialog-content").length ? true : false);
    };





    function parseExtensionsBegin(options) {
        options._extensionsPanel = { href: options.href, content: options.content };
        if (!options.iniframe) { return; }
        options.href = null;
        options.content = null;
    };
    function parseExtensionsEnd(target) {
        var panel = $(target), opts = panel.panel("options"),
                exts = opts._extensionsPanel ? opts._extensionsPanel : opts._extensionsPanel = { href: opts.href, content: opts.content };
        opts.href = exts.href; opts.content = exts.content;
        if (opts.iniframe) { refresh(target, opts.href); }
    };

    var _panel = $.fn.panel;
    $.fn.panel = function (options, param) {
        if (typeof options == "string") { return _panel.apply(this, arguments); }
        options = options || {};
        return this.each(function () {
            var jq = $.util.parseJquery(this), opts = $.extend({}, $.fn.panel.parseOptions(this), options);
            parseExtensionsBegin(opts);
            _panel.call(jq, opts);
            parseExtensionsEnd(this);
        });
    };
    $.union($.fn.panel, _panel);


    var _refresh = $.fn.panel.methods.refresh;
    function refresh(target, href) {
        var p = $.util.parseJquery(target), opts = p.panel("options");
        href = href ? opts.href = href : opts.href;
        if (opts.iniframe) {
            var exts = opts._extensionsPanel ? opts._extensionsPanel : opts._extensionsPanel = { href: opts.href, content: opts.content };
            exts.href = opts.href; exts.content = opts.content;
            opts.href = null;
            opts.content = "<iframe class='panel-iframe' frameborder='0' width='100%' height='100%' marginwidth='0px' marginheight='0px' scrolling='auto'></iframe>";
            _refresh.call(p, p);
            opts.href = exts.href; opts.content = exts.content;
            $.util.exec(function () { getIframe(target).attr("src", href); });
        } else {
            _refresh.call(p, p, href);
        }
    };

    function getIframe(target) {
        var p = $.util.parseJquery(target), body = p.panel("body");
        return body.children("iframe.panel-iframe");
    };

    var _header = $.fn.panel.methods.header;
    function getHeader(target) {
        var t = $.util.parseJquery(target);
        if (!inTabs(target)) { return _header.call(t, t); }
        var panel = t.panel("panel"), index = panel.index(), tabs = panel.closest(".tabs-container");
        return tabs.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li").eq(index);
    };

    var _setTitle = $.fn.panel.methods.setTitle;
    function setTitle(target, title) {
        var t = $.util.parseJquery(target);
        if (!inTabs(target)) { return _setTitle.call(t, t, title); }
        if (!title) { return; }
        var opts = t.panel("options"), header = t.panel("header");
        opts.title = title;
        header.find(">a.tabs-inner>span.tabs-title").text(title);
    };


    var methods = $.fn.panel.extensions.methods = {
        //  \u5224\u65AD\u5F53\u524D easyui-panel \u662F\u5426\u4E3A easyui-layout \u7684 panel \u90E8\u4EF6\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D easyui-panel \u662F easyui-layout \u7684 panel \u90E8\u4EF6\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        inLayout: function (jq) { return inLayout(jq[0]); },

        //  \u5224\u65AD\u5F53\u524D easyui-panel \u662F\u5426\u4E3A easyui-tabs \u7684\u9009\u9879\u5361\u3002
        inTabs: function (jq) { return inTabs(jq[0]); },

        //  \u5224\u65AD\u5F53\u524D easyui-panel \u662F\u5426\u4E3A easyui-accordion \u4E2D\u7684\u4E00\u4E2A\u6298\u53E0\u9762\u677F\u3002
        inAccordion: function (jq) { return inAccordion(jq[0]); },

        //  \u5224\u65AD\u5F53\u524D easyui-panel \u662F\u5426\u4E3A easyui-window \u7EC4\u4EF6\uFF1B
        isWindow: function (jq) { return isWindow(jq[0]); },

        //  \u5224\u65AD\u5F53\u524D easyui-panel \u662F\u5426\u4E3A easyui-dialog \u7EC4\u4EF6\uFF1B
        isDialog: function (jq) { return isDialog(jq[0]); },

        //  \u589E\u52A0 easyui-panel \u63A7\u4EF6\u7684\u6269\u5C55\u65B9\u6CD5\uFF1B\u8BE5\u65B9\u6CD5\u7528\u4E8E\u83B7\u53D6\u5F53\u524D\u5728 iniframe: true \u65F6\u5F53\u524D panel \u63A7\u4EF6\u4E2D\u7684 iframe \u5BB9\u5668\u5BF9\u8C61\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C inirame: false\uFF0C\u5219\u8BE5\u65B9\u6CD5\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u7684 jQuery \u5BF9\u8C61\u3002
        iframe: function (jq) { return getIframe(jq[0]); },

        //  \u91CD\u5199 easyui-panel \u63A7\u4EF6\u7684 refresh \u65B9\u6CD5\uFF0C\u7528\u4E8E\u652F\u6301 iniframe \u5C5E\u6027\u3002
        refresh: function (jq, href) { return jq.each(function () { refresh(this, href); }); },

        //  \u91CD\u5199 easyui-panel \u63A7\u4EF6\u7684 header \u65B9\u6CD5\uFF0C\u652F\u6301\u4F4D\u4E8E easyui-tabs \u4E2D\u7684 tab-panel \u90E8\u4EF6\u83B7\u53D6 header \u5BF9\u8C61\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5 panel \u4F4D\u4E8E easyui-tabs \u4E2D\uFF0C\u5219\u8BE5\u65B9\u6CD5\u8FD4\u56DE easyui-tabs \u7684 div.tabs-header div.tabs-wrap ul.tabs \u4E2D\u5BF9\u5E94\u8BE5 tab-panel \u7684 li \u5BF9\u8C61\u3002
        header: function (jq) { return getHeader(jq[0]); },

        //  \u91CD\u5199 easyui-panel \u63A7\u4EF6\u7684 setTitle \u65B9\u6CD5\uFF0C\u652F\u6301\u4F4D\u4E8E easyui-tabs \u4E2D\u7684 tab-panel \u90E8\u4EF6\u8BBE\u7F6E title \u64CD\u4F5C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-panel \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setTitle: function (jq, title) { return jq.each(function () { setTitle(this, title); }); }
    };
    var defaults = $.fn.panel.extensions.defaults = {

        //  \u589E\u52A0 easyui-panel \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A href \u52A0\u8F7D\u7684\u8FDC\u7A0B\u9875\u9762\u662F\u5426\u88C5\u8F7D\u5728\u4E00\u4E2A iframe \u4E2D\u3002
        iniframe: false,

        //  \u589E\u52A0 easyui-panel \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A easyui-panel \u9762\u677F\u7684\u6700\u5C0F\u5BBD\u5EA6\u3002
        minWidth: 10,

        //  \u589E\u52A0 easyui-panel \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A easyui-panel \u9762\u677F\u7684\u6700\u5927\u5BBD\u5EA6\u3002
        maxWidth: 10000,

        //  \u589E\u52A0 easyui-panel \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A easyui-panel \u9762\u677F\u7684\u6700\u5C0F\u9AD8\u5EA6\u3002
        minHeight: 10,

        //  \u589E\u52A0 easyui-panel \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A easyui-panel \u9762\u677F\u7684\u6700\u5927\u9AD8\u5EA6\u3002
        maxHeight: 10000,

        //  \u589E\u52A0 easyui-panel \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u91CD\u65B0\u5B9A\u4E49\u7684 onResize \u4E8B\u4EF6\u3002\u7528\u4E8E\u6269\u5C55\u56DB\u4E2A\u65B0\u589E\u5C5E\u6027 minWidth、maxWidth、minHeight、maxHeight \u7684\u529F\u80FD\u3002
        onResize: onResize,

        //  \u6269\u5C55 easyui-panel、easyui-window \u4EE5\u53CA easyui-dialog \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u8BE5\u7A97\u53E3\u662F\u5426\u65E0\u6CD5\u79FB\u9664\u7236\u7EA7\u5BF9\u8C61\u8FB9\u754C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        inContainer: true,

        //  \u91CD\u5199 easyui-panel、easyui-window \u4EE5\u53CA easyui-dialog \u63A7\u4EF6\u7684\u539F\u751F\u4E8B\u4EF6 onMove\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        onMove: onMove
    };

    $.extend($.fn.panel.defaults, defaults);
    $.extend($.fn.panel.methods, methods);


    var css =
        "iframe.panel-iframe { margin: 0px; padding: 0px; width: 100%; height: 100%; border: 0px; overflow: auto; }"
    $.util.addCss(css);

})(jQuery);