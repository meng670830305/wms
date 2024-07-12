/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI tabs Extensions 1.0 beta
* jQuery EasyUI tabs \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.tabs.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-09-29
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


    $.fn.tabs.extensions = {};


    function initTabsPanelPaddingTopLine(target) {
        var tabs = $.util.parseJquery(target), opts = tabs.tabs("options"), position = opts.tabPosition;
        if ($.isNumeric(opts.lineHeight) && opts.lineHeight > 0) {
            if (!$.array.contains(["top", "bottom", "left", "right"], position)) { position = "top"; }
            tabs.children("div.tabs-panels").css("padding-" + position, opts.lineHeight.toString() + "px").children().children().css("border-" + position + "-width", "1px");
        }
    };

    var _onContextMenu = $.fn.tabs.defaults.onContextMenu;
    var onContextMenu = function (e, title, index) {
        if ($.isFunction(_onContextMenu)) { _onContextMenu.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.tabs("options");
        if (opts.enableConextMenu) {
            e.preventDefault();
            var panel = t.tabs("getTab", index),
                panelOpts = panel.panel("options"),
                leftTabs = t.tabs("leftClosableTabs", index),
                rightTabs = t.tabs("rightClosableTabs", index),
                otherTabs = t.tabs("otherClosableTabs", index),
                allTabs = t.tabs("closableTabs"),
                selected = t.tabs("isSelected", index),
                m1 = { text: "\u663E\u793A\u9009\u9879\u5361\u7684 option", iconCls: "icon-standard-application-form", disabled: !opts.showOption, handler: function () { t.tabs("showOption", index); } },
                m2 = { text: "\u5173\u95ED\u9009\u9879\u5361", iconCls: "icon-standard-application-form-delete", disabled: !panelOpts.closable, handler: function () { t.tabs("closeClosable", index); } },
                m3 = { text: "\u5173\u95ED\u5176\u4ED6\u9009\u9879\u5361", iconCls: "icon-standard-cancel", disabled: !otherTabs.length, handler: function () { t.tabs("closeOtherClosable", index); } },
                m4 = { text: "\u5237\u65B0\u9009\u9879\u5361", iconCls: "icon-standard-table-refresh", disabled: !panelOpts.refreshable, handler: function () { t.tabs("refresh", index); } },
                m5 = { text: "\u5173\u95ED\u5DE6\u4FA7\u9009\u9879\u5361", iconCls: "icon-standard-tab-close-left", disabled: !leftTabs.length, handler: function () { t.tabs("closeLeftClosable", index); } },
                m6 = { text: "\u5173\u95ED\u53F3\u4FA7\u9009\u9879\u5361", iconCls: "icon-standard-tab-close-right", disabled: !rightTabs.length, handler: function () { t.tabs("closeRightClosable", index); } },
                m7 = { text: "\u5173\u95ED\u6240\u6709\u9009\u9879\u5361", iconCls: "icon-standard-cross", disabled: !allTabs.length, handler: function () { t.tabs("closeAllClosable"); } },
                m8 = { text: "\u65B0\u5EFA\u9009\u9879\u5361", iconCls: "icon-standard-tab-add", disabled: !opts.enableNewTabMenu, handler: function () { t.tabs("newTab", index); } },
                m9 = { text: "\u91CD\u590D\u9009\u9879\u5361", iconCls: "icon-standard-control-repeat", disabled: !panelOpts.repeatable, handler: function () { t.tabs("repeat", index); } };
            var items = [];
            if ($.array.likeArray(opts.contextMenu) && !$.util.isString(opts.contextMenu)) { $.array.merge(items, opts.contextMenu); }
            if (opts.showOption) { $.array.merge(items, "-", m1); }
            $.array.merge(items, panelOpts.closable ? ["-", m2, m3] : ["-", m3]);
            if (panelOpts.refreshable) { $.array.merge(items, "-", m4); }
            $.array.merge(items, "-", m5, m6, m7);
            if (panelOpts.repeatable || opts.enableNewTabMenu) {
                var mm = [];
                if (opts.enableNewTabMenu) { mm.push(m8); }
                if (panelOpts.repeatable) { mm.push(m9); }
                $.array.merge(items, "-", mm);
            }
            items = parseContextMenuMap(e, title, index, items, t);
            if (items[0] == "-") { $.array.removeAt(items, 0); }
            $.easyui.showMenu({ left: e.pageX, top: e.pageY, items: items });
        }
    };
    function parseContextMenuMap(e, title, index, menus, tabs) {
        return $.array.map(menus, function (value) {
            if (!value || $.util.isString(value)) { return value; }
            var ret = $.extend({}, value);
            ret.id = $.isFunction(value.id) ? value.id.call(ret, e, title, index, tabs) : value.id;
            ret.text = $.isFunction(value.text) ? value.text.call(ret, e, title, index, tabs) : value.text;
            ret.iconCls = $.isFunction(value.iconCls) ? value.iconCls.call(ret, e, title, index, tabs) : value.iconCls;
            ret.disabled = $.isFunction(value.disabled) ? value.disabled.call(ret, e, title, index, tabs) : value.disabled;
            ret.hideOnClick = $.isFunction(value.hideOnClick) ? value.hideOnClick.call(ret, e, title, index, tabs) : value.hideOnClick;
            ret.onclick = $.isFunction(value.onclick) ? function (e, item, menu) { value.onclick.call(this, e, title, index, tabs, item, menu); } : value.onclick;
            ret.handler = $.isFunction(value.handler) ? function (e, item, menu) { value.handler.call(this, e, title, index, tabs, item, menu); } : value.handler;
            if (ret.children && ret.children.length) { ret.children = parseContextMenuMap(e, title, index, ret.children, tabs); }
            return ret;
        });
    };


    var _updateTab = $.fn.tabs.methods.update;
    function updateTab(target, param) {
        param = $.extend({ tab: null, options: null }, param);
        var tabs = $.util.parseJquery(target), opts = tabs.tabs("options"),
            index = tabs.tabs("getTabIndex", param.tab),
            panelOpts = $.union({}, param.options, $.fn.tabs.extensions.panelOptions),
            tools = panelOpts.tools,
            onLoad = panelOpts.onLoad,
            loadCall = function () {
                //$.easyui.messager.progress("close");
                $.easyui.loaded(true);
            },
            refreshButton = {
                iconCls: "icon-mini-refresh", handler: function () {
                    var title = $(this).parent().prev().find("span.tabs-title").text();
                    if (title) { $.util.exec(function () { tabs.tabs("refresh", title); }); }
                }
            };
        if (panelOpts.refreshable) {
            if ($.array.likeArray(panelOpts.tools)) {
                panelOpts.tools = $.array.merge([], panelOpts.tools, refreshButton);
            } else {
                panelOpts.tools = [refreshButton];
            }
        }
        if (opts.showUpdateProgress && (!$.string.isNullOrWhiteSpace(panelOpts.href) || !$.string.isNullOrWhiteSpace(panelOpts.content)) && (panelOpts.selected || tabs.tabs("getSelected") == param.tab)) {
            //$.easyui.messager.progress({ title: "\u64CD\u4F5C\u63D0\u9192", msg: "\u6B63\u5728\u52A0\u8F7D...", interval: 100 });
            $.easyui.loading({ msg: "<div style=\"font-size:12px\">\u6B63\u5728\u52A0\u8F7D\u9875\u9762,\u8BF7\u7A0D\u540E...</div>" });
            window.setTimeout(function () { $.easyui.loaded(true); }, 1000);
            if (!panelOpts.iniframe) {
                panelOpts.onLoad = function () {
                    if ($.isFunction(onLoad)) { onLoad.apply(this, arguments); }
                    $.util.exec(loadCall);
                    $.util.parseJquery(this).panel("options").onLoad = onLoad;
                };
            }
        }
        var ret = _updateTab.call(tabs, tabs, { tab: param.tab, options: panelOpts });
        var tab = tabs.tabs("getTab", index);
        panelOpts = tab.panel("options");
        panelOpts.tools = tools;
        initTabsPanelPaddingTopLine(target);
        var li = tabs.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li").eq(index).off("dblclick.closeOnDblClick").on("dblclick.closeOnDblClick", function () {
            if (panelOpts.closeOnDblClick && panelOpts.closable) { tabs.tabs("close", panelOpts.title); }
        });
        if (panelOpts.closeOnDblClick && panelOpts.closable) { li.attr("title", "\u53CC\u51FB\u6B64\u9009\u9879\u5361\u6807\u9898\u53EF\u4EE5\u5C06\u5176\u5173\u95ED"); }
        if (opts.showUpdateProgress && panelOpts.iniframe) {
            $.util.exec(function () { tab.panel("iframe").bind("load", loadCall); });
        }
        return ret;
    };

    function refreshTab(target, which) {
        var tabs = $.util.parseJquery(target), opts = tabs.tabs("options"),
            panel = tabs.tabs("getTab", which), panelOpts = panel.panel("options"),
            index = tabs.tabs("getTabIndex", panel);
        if ($.string.isNullOrWhiteSpace(panelOpts.href) && $.string.isNullOrWhiteSpace(panelOpts.content)) { return; }
        tabs.tabs("update", { tab: panel, options: panelOpts });
        if ($.isFunction(opts.onRefresh)) { opts.onRefresh.call(target, opts.title, index); }
    };

    function isSelected(target, which) {
        var tabs = $.util.parseJquery(target), selected = tabs.tabs("getSelected"), index = tabs.tabs("getTabIndex", selected);
        var thisTab = tabs.tabs("getTab", which), thisIndex = tabs.tabs("getTabIndex", thisTab);
        return thisIndex == index;
    };

    function isClosable(target, which) {
        var tabs = $.util.parseJquery(target), panel = tabs.tabs("getTab", which), panelOpts = panel.panel("options");
        return panelOpts.closable;
    };

    function newTab(target, which) {
        var content = $("<table></table>").css({ width: "95%", height: "100%" }),
            txtTitle = $("<input type='text' style='width: 98%;'/>"),
            txtHref = $("<input type='text' style='width: 98%;'/>"),
            ckRefreshable = $("<input id='refreshable' type='checkbox' checked='true' />"),
            ckIniframe = $("<input id='iniframe' type='checkbox' />"),
            lblRefreshable = $("<label>\u662F\u5426\u53EF\u5237\u65B0</label>"),
            lblIniframe = $("<label>\u662F\u5426\u5D4C\u81F3 IFRAME(\u6D4F\u89C8\u5668\u5185\u90E8\u7A97\u4F53) \u4E2D</label>");

        var tr1 = $("<tr></tr>").append("<td width='24%' align='right'>\u9009\u9879\u5361\u6807\u9898\uFF1A</td>").appendTo(content);
        var tr2 = $("<tr></tr>").append("<td width='24%' align='right'>\u8DEF\u5F84(href)\uFF1A</td>").appendTo(content);
        var tr3 = $("<tr></tr>").appendTo(content);
        $("<td></td>").append(txtTitle).appendTo(tr1);
        $("<td></td>").append(txtHref).appendTo(tr2);
        $("<td width='24%' align='right'></td>").append(ckRefreshable).append(lblRefreshable).appendTo(tr3);
        $("<td align='right'></td>").append(ckIniframe).append(lblIniframe).appendTo(tr3);

        which = which || 0;
        var tabs = $.util.parseJquery(target),
            index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", tabs.tabs("getTab", which)),
            header = tabs.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li:eq(" + index + ")"),
            offset = header.offset(), position = $.extend({}, { left: offset.left + 10, top: offset.top + 10 });
        var dialogOptions = $.extend({
            iconCls: "icon-standard-application-form",
            title: "\u65B0\u5EFA\u9009\u9879\u5361 - \u8BBE\u7F6E\u53C2\u6570",
            width: 400,
            height: 165,
            maximizable: false,
            resizable: false,
            autoVCenter: false,
            autoHCenter: false,
            enableSaveButton: false,
            topMost: false,
            applyButtonText: "\u6253\u5F00",
            onApply: function (dia) {
                var title = txtTitle.val(), href = txtHref.val();
                href = href || $.fn.tabs.extensions.panelOptions.href;
                if ($.string.isNullOrWhiteSpace(title)) { title = "\u65B0\u5EFA\u9009\u9879\u5361"; }
                var i = 0; while (tabs.tabs("getTab", title = title + (i ? i : ""))) { i++; }
                if ($.string.isNullOrWhiteSpace(href)) { $.easyui.messager.show("\u64CD\u4F5C\u63D0\u9192", "\u8BF7\u8F93\u5165\u8981\u521B\u5EFA\u7684\u9009\u9879\u5361\u7684\u8DEF\u5F84\uFF01", "info"); txtHref.focus(); return; }
                var iniframe = ckIniframe.prop("checked"), refreshable = ckRefreshable.prop("checked");
                tabs.tabs("add", { title: title, href: href, refreshable: refreshable, closable: true, iniframe: iniframe });
                dia.dialog("close");
            },
            content: content
        }, position);
        var dia = $.easyui.showDialog(dialogOptions);
        $.util.exec(function () {
            var enter = dia.find(">div.dialog-button>a:first");
            txtTitle.keydown(function (e) { if (e.which == 13) { txtHref.focus(); } });
            txtHref.keydown(function (e) { if (e.which == 13) { ckRefreshable.focus(); } });
            ckRefreshable.keydown(function (e) { if (e.which == 13) { ckIniframe.focus(); } });
            ckIniframe.keydown(function (e) { if (e.which == 13) { enter.focus(); } });
            lblRefreshable.click(function () { ckRefreshable.click(); });
            lblIniframe.click(function () { ckIniframe.click(); });
            enter.focus();
            txtTitle.focus();
        });
    };

    function repeatTab(target, which) {
        var tabs = $.util.parseJquery(target), panel = tabs.tabs("getTab", which), panelOpts = panel.panel("options");
        var opts = $.extend({}, panelOpts, { selected: true, closable: true }), i = 2, title = opts.title;
        while (tabs.tabs("getTab", opts.title = title + "-" + i.toString())) { i++; }
        tabs.tabs("add", opts);
    };

    function getTabOption(target, which) {
        var tabs = $.util.parseJquery(target), tab = tabs.tabs("getTab", which), tabOpts = tab.panel("options");
        return tabOpts;
    };

    function getSelectedOption(target) {
        var t = $.util.parseJquery(target), tab = t.tabs("getSelected"), tabOpts = tab.panel("options");
        return tabOpts;
    };

    function getSelectedIndex(target) {
        var t = $.util.parseJquery(target), tab = t.tabs("getSelected"), index = t.tabs("getTabIndex", tab);
        return index;
    };

    function getSelectedTitle(target) {
        var t = $.util.parseJquery(target), tabOpts = t.tabs("getSelectedOption"), title = tabOpts.title;
        return title;
    };

    function leftTabs(target, which) {
        var tabs = $.util.parseJquery(target), index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", tabs.tabs("getTab", which)),
            panels = tabs.tabs("tabs");
        return $.array.range(panels, 0, index);
    };

    function rightTabs(target, which) {
        var tabs = $.util.parseJquery(target), index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", tabs.tabs("getTab", which)),
            panels = tabs.tabs("tabs");
        return $.array.range(panels, index + 1);
    };

    function otherTabs(target, which) {
        var tabs = $.util.parseJquery(target), index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", tabs.tabs("getTab", which)),
            panels = tabs.tabs("tabs");
        return $.array.merge($.array.range(panels, 0, index), $.array.range(panels, index + 1));
    };

    var closableFinder = function (val) {
        if ($.util.isJqueryObject(val) && val.length) {
            var state = $.data(val[0], "panel");
            return state && state.options && state.options.closable;
        } else { return false; }
    };

    function closableTabs(target) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("tabs");
        return $.array.filter(panels, closableFinder);
    };

    function leftClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("leftTabs", which);
        return $.array.filter(panels, closableFinder);
    };

    function rightClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("rightTabs", which);
        return $.array.filter(panels, closableFinder);
    };

    function otherClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("otherTabs", which);
        return $.array.filter(panels, closableFinder);
    };

    function closeLeftTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("leftTabs", which);
        $.each(panels, function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeRightTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("rightTabs", which);
        $.each(panels, function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeOtherTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("otherTabs", which);
        $.each(panels, function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeAllTabs(target) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("tabs");
        $.each($.array.clone(panels), function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeClosableTab(target, which) {
        var tabs = $.util.parseJquery(target), panel = tabs.tabs("getTab", which);
        if (panel && panel.panel("options").closable) {
            var index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", panel);
            tabs.tabs("close", index);
        }
    };

    function closeLeftClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("leftClosableTabs", which);
        $.each($.array.clone(panels), function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeRightClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("rightClosableTabs", which);
        $.each($.array.clone(panels), function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeOtherClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("otherClosableTabs", which);
        $.each($.array.clone(panels), function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function closeAllClosableTabs(target, which) {
        var tabs = $.util.parseJquery(target), panels = tabs.tabs("closableTabs", which);
        $.each($.array.clone(panels), function () { tabs.tabs("close", tabs.tabs("getTabIndex", this)); });
    };

    function showOption(target, which) {
        which = which || 0;
        var tabs = $.util.parseJquery(target), panel = tabs.tabs("getTab", which), panelOpts = panel.panel("options");
        var index = $.isNumeric(which) ? which : tabs.tabs("getTabIndex", panel),
            header = tabs.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li:eq(" + index + ")"),
            offset = header.offset(), position = $.extend({}, { left: offset.left + 10, top: offset.top + 10 });
        $.easyui.showOption(panelOpts, {
            iconCls: "icon-standard-application-form", title: "\u663E\u793A\u9009\u9879\u5361 " + panelOpts.title + " \u7684 option \u503C",
            left: position.left, top: position.top, topMost: false
        });
    };

    function moveTab(tabTarget, param) {
        if (!param || param.source == undefined || param.target == undefined || !param.point) { return; }
        var source = param.source, target = param.target,
            point = $.array.contains(["before", "after"], param.point) ? param.point : "before",
            t = $.util.parseJquery(tabTarget), tabs = t.tabs("tabs"),
            sourcePanel = t.tabs("getTab", source), targetPanel = t.tabs("getTab", target),
            sourceIndex = t.tabs("getTabIndex", sourcePanel),
            sourceHeader = sourcePanel.panel("header"), targetHeader = targetPanel.panel("header");
        if (!sourcePanel || !targetPanel) { return; }

        $.array.removeAt(tabs, sourceIndex);
        var targetIndex = $.array.indexOf(tabs, targetPanel);
        $.array.insert(tabs, point == "before" ? targetIndex : targetIndex + 1, sourcePanel);

        sourcePanel = sourcePanel.panel("panel"); targetPanel = targetPanel.panel("panel");
        targetPanel[point](sourcePanel); targetHeader[point](sourceHeader);
    };

    function insertTab(tabTarget, options) {
        var target = options.target, t = $.util.parseJquery(tabTarget);
        options.target = undefined;
        t.tabs("add", options);
        var tabs = t.tabs("tabs");
        t.tabs("move", { source: tabs.length - 1, target: target, point: "before" });
    };

    function setTitle(target, param) {
        if (!param || !(param.which || $.isNumeric(param.which)) || !param.title) { return; }
        var t = $.util.parseJquery(target), tab = t.tabs("getTab", param.which);
        tab.panel("setTitle", param.title);
    };

    var panelOptions = $.fn.tabs.extensions.panelOptions = {

        //  \u8BE5\u9009\u9879\u5361\u7684 href \u662F\u5426\u5728 iframe \u4E2D\u6253\u5F00\u3002
        iniframe: false,

        //  \u8BE5\u9009\u9879\u5361\u662F\u5426\u5177\u6709\u91CD\u590D\u6253\u5F00\u529F\u80FD
        repeatable: false,

        //  \u8BE5\u9009\u9879\u5361\u662F\u5426\u5177\u6709\u5237\u65B0\u529F\u80FD\u3002
        refreshable: true,

        //  \u53CC\u51FB\u9009\u9879\u5361\u6807\u9898\u662F\u5426\u80FD\u5C06\u5176\u5173\u95ED\uFF0C\u5F53\u8BE5\u9009\u9879\u5361 closable: true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u6709\u6548\u3002
        closeOnDblClick: true,

        href: null,

        iconCls: "icon-standard-application-form"
    };
    var methods = $.fn.tabs.extensions.methods = {
        //  \u8986\u76D6 easyui-tabs \u7684\u539F\u751F\u65B9\u6CD5 update\uFF0C\u4EE5\u652F\u6301\u6269\u5C55\u7684\u529F\u80FD\uFF1B
        update: function (jq, param) { return jq.each(function () { updateTab(this, param); }); },

        //  \u5237\u65B0\u6307\u5B9A\u7684\u9009\u9879\u5361\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u8868\u793A\u88AB\u5237\u65B0\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        refresh: function (jq, which) { return jq.each(function () { refreshTab(this, which); }); },

        //  \u5224\u65AD\u6307\u5B9A\u7684\u9009\u9879\u5361\u662F\u5426\u88AB\u9009\u4E2D\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u8981\u5224\u65AD\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u6307\u5B9A\u7684\u9009\u9879\u5361\u88AB\u9009\u4E2D\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isSelected: function (jq, which) { return isSelected(jq[0], which); },

        //  \u5224\u65AD\u6307\u5B9A\u7684\u9009\u9879\u5361\u662F\u5426\u53EF\u5173\u95ED(closable:true)\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u8981\u5224\u65AD\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u6307\u5B9A\u7684\u9009\u9879\u5361\u53EF\u88AB\u5173\u95ED(closable:true)\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isClosable: function (jq, which) { return isClosable(jq[0], which); },

        //  \u5F39\u51FA\u4E00\u4E2A easyui-dialog\uFF0C\u53EF\u4EE5\u5728\u8BE5 dialog \u4E2D\u8F93\u5165\u53C2\u6570\u4EE5\u5728\u5F53\u524D\u9009\u9879\u5361\u7EC4\u4EF6\u4E2D\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u9009\u9879\u5361\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\uFF0C\u53EF\u9009\uFF0C\u9ED8\u8BA4\u4E3A 0\uFF1B\u8BE5\u53C2\u6570\u7528\u4E8E\u6307\u793A\u5F39\u51FA\u7684 easyui-dialog \u51FA\u73B0\u7684\u4F4D\u7F6E\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        newTab: function (jq, which) { return jq.each(function () { newTab(this, which); }); },

        //  \u521B\u5EFA\u4E00\u4E2A\u548C\u6307\u5B9A\u9009\u9879\u5361\u76F8\u540C\u5185\u5BB9\u7684\u65B0\u9009\u9879\u5361\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        repeat: function (jq, which) { return jq.each(function () { repeatTab(this, which); }); },

        //  \u83B7\u53D6\u6307\u5B9A\u9009\u9879\u5361\u7684\u5C5E\u6027\u503C\u96C6\u5408(option)\uFF1B
        getTabOption: function (jq, which) { return getTabOption(jq[0], which); },

        //  \u83B7\u53D6\u5F53\u524D\u9009\u4E2D\u7684\u9009\u9879\u5361\u7684\u5C5E\u6027\u503C\u96C6\u5408 (option)\uFF1B
        getSelectedOption: function (jq) { return getSelectedOption(jq[0]); },

        //  \u83B7\u53D6\u5F53\u524D\u9009\u4E2D\u7684\u9009\u9879\u5361\u7684\u7D22\u5F15\u53F7\uFF1B
        getSelectedIndex: function (jq) { return getSelectedIndex(jq[0]); },

        //  \u83B7\u53D6\u5F53\u524D\u9009\u4E2D\u7684\u9009\u9879\u5361\u7684\u6807\u9898\u3002
        getSelectedTitle: function (jq) { return getSelectedTitle(jq[0]); },

        //  \u83B7\u53D6\u6307\u5B9A\u9009\u9879\u5361\u7684\u5DE6\u4FA7\u6240\u6709\u9009\u9879\u5361\u5143\u7D20\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u8868\u793A\u9009\u9879\u5361\u9875\u7684 panel(jQuery) \u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u6307\u5B9A\u9009\u9879\u5361\u5DE6\u4FA7\u6CA1\u6709\u5176\u4ED6\u9009\u9879\u5361\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u6570\u7EC4\u3002
        leftTabs: function (jq, which) { return leftTabs(jq[0], which); },

        //  \u83B7\u53D6\u6307\u5B9A\u9009\u9879\u5361\u7684\u53F3\u4FA7\u6240\u6709\u9009\u9879\u5361\u5143\u7D20\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u8868\u793A\u9009\u9879\u5361\u9875\u7684 panel(jQuery) \u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u6307\u5B9A\u9009\u9879\u5361\u53F3\u4FA7\u6CA1\u6709\u5176\u4ED6\u9009\u9879\u5361\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u6570\u7EC4\u3002
        rightTabs: function (jq, which) { return rightTabs(jq[0], which); },

        //  \u83B7\u53D6\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6\u4E2D\u9664\u6307\u5B9A\u9009\u9879\u5361\u9875\u5728\u7684\u5176\u4ED6\u6240\u6709\u9009\u9879\u5361\u5143\u7D20\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u8868\u793A\u9009\u9879\u5361\u9875\u7684 panel(jQuery) \u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6\u9664\u6307\u5B9A\u7684\u9009\u9879\u5361\u9875\u5916\u6CA1\u6709\u5176\u4ED6\u9009\u9879\u5361\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u6570\u7EC4\u3002
        otherTabs: function (jq, which) { return otherTabs(jq[0], which); },

        //  \u83B7\u53D6\u6240\u6709\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\u9875\u5143\u7D20\u96C6\u5408\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u8868\u793A\u9009\u9879\u5361\u9875\u7684 panel(jQuery) \u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u6CA1\u6709\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u6570\u7EC4\u3002
        closableTabs: function (jq) { return closableTabs(jq[0]); },

        //  \u83B7\u53D6\u6307\u5B9A\u9009\u9879\u5361\u5DE6\u4FA7\u7684\u6240\u6709\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\u5143\u7D20\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u8868\u793A\u9009\u9879\u5361\u9875\u7684 panel(jQuery) \u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u6307\u5B9A\u9009\u9879\u5361\u5DE6\u4FA7\u6CA1\u6709\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u6570\u7EC4\u3002
        leftClosableTabs: function (jq, which) { return leftClosableTabs(jq[0], which); },

        //  \u83B7\u53D6\u6307\u5B9A\u9009\u9879\u5361\u53F3\u4FA7\u7684\u6240\u6709\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\u5143\u7D20\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u8868\u793A\u9009\u9879\u5361\u9875\u7684 panel(jQuery) \u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u6307\u5B9A\u9009\u9879\u5361\u53F3\u4FA7\u6CA1\u6709\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u6570\u7EC4\u3002
        rightClosableTabs: function (jq, which) { return rightClosableTabs(jq[0], which); },

        //  \u83B7\u53D6\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6\u4E2D\u9664\u6307\u5B9A\u9009\u9879\u5361\u9875\u5728\u7684\u5176\u4ED6\u6240\u6709\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\u5143\u7D20\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u8868\u793A\u9009\u9879\u5361\u9875\u7684 panel(jQuery) \u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6\u9664\u6307\u5B9A\u7684\u9009\u9879\u5361\u9875\u5916\u6CA1\u6709\u5176\u4ED6\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u6570\u7EC4\u3002
        otherClosableTabs: function (jq, which) { return otherClosableTabs(jq[0], which); },

        //  \u5173\u95ED\u6307\u5B9A\u9009\u9879\u5361\u5DE6\u4FA7\u7684\u6240\u6709\u9009\u9879\u5361\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        closeLeft: function (jq, which) { return jq.each(function () { closeLeftTabs(this, which); }); },

        //  \u5173\u95ED\u6307\u5B9A\u9009\u9879\u5361\u53F3\u4FA7\u7684\u6240\u6709\u9009\u9879\u5361\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        closeRight: function (jq, which) { return jq.each(function () { closeRightTabs(this, which); }); },

        //  \u5173\u95ED\u9664\u6307\u5B9A\u9009\u9879\u5361\u5916\u7684\u5176\u4ED6\u6240\u6709\u9009\u9879\u5361\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        closeOther: function (jq, which) { return jq.each(function () { closeOtherTabs(this, which); }); },

        //  \u5173\u95ED\u6240\u6709\u9009\u9879\u5361\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        closeAll: function (jq) { return jq.each(function () { closeAllTabs(this); }); },

        //  \u6307\u5B9A\u6307\u5B9A\u7684\u9009\u9879\u5361\uFF0C\u4F46\u662F\u5982\u679C\u8BE5\u9009\u9879\u5361\u4E0D\u53EF\u88AB\u5173\u95ED(closable:false)\uFF0C\u5219\u4E0D\u6267\u884C\u4EFB\u4F55\u52A8\u4F5C\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        closeClosable: function (jq, which) { return jq.each(function () { closeClosableTab(this, which); }); },

        //  \u6307\u5B9A\u6307\u5B9A\u7684\u9009\u9879\u5361\u5DE6\u4FA7\u7684\u6240\u6709\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        closeLeftClosable: function (jq, which) { return jq.each(function () { closeLeftClosableTabs(this, which); }); },

        //  \u6307\u5B9A\u6307\u5B9A\u7684\u9009\u9879\u5361\u53F3\u4FA7\u7684\u6240\u6709\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        closeRightClosable: function (jq, which) { return jq.each(function () { closeRightClosableTabs(this, which); }); },

        //  \u6307\u5B9A\u9664\u6307\u5B9A\u9009\u9879\u5361\u5916\u7684\u6240\u6709\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        closeOtherClosable: function (jq, which) { return jq.each(function () { closeOtherClosableTabs(this, which); }); },

        //  \u6307\u5B9A\u6240\u6709\u53EF\u5173\u95ED\u7684\u9009\u9879\u5361\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        closeAllClosable: function (jq) { return jq.each(function () { closeAllClosableTabs(this); }); },

        //  \u4EE5 easyui-dialog \u7684\u65B9\u5F0F\u5F39\u51FA\u4E00\u4E2A dialog \u5BF9\u8BDD\u6846\u7A97\u4F53\uFF0C\u8BE5\u7A97\u4F53\u4E2D\u663E\u793A\u6307\u5B9A\u9009\u9879\u5361\u7684\u6240\u6709\u5C5E\u6027\u503C(options)\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      which:  \u6307\u5B9A\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7 \u6216\u8005 \u6807\u9898\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        showOption: function (jq, which) { return jq.each(function () { showOption(this, which); }); },

        //  \u5C06\u6307\u5B9A\u7684 easyui-tabs tab-panel \u9009\u9879\u5361\u9875\u79FB\u52A8\u81F3\u53E6\u4E00\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param:  \u8FD9\u662F\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          source: Integer \u6216 String \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u8981\u79FB\u52A8\u7684 tab-panel \u7684\u7D22\u5F15\u53F7\u6216\u8005\u6807\u9898 title \u503C\uFF1B
        //          target: Integer \u6216 String \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u79FB\u52A8\u76EE\u6807\u4F4D\u7F6E\u7684 tab-panel \u7684\u7D22\u5F15\u53F7\u6216\u8005\u6807\u9898 title \u503C\uFF1B
        //          point:  \u79FB\u52A8\u5230\u76EE\u6807\u4F4D\u7F6E\u7684\u65B9\u5F0F\uFF0CString \u7C7B\u578B\u503C\uFF0C\u4EC5\u9650\u4E8E\u5B9A\u4E49\u4E3A\u5982\u4E0B\u503C\uFF1A
        //              "before":   \u8868\u793A\u628A source \u9009\u9879\u5361\u79FB\u52A8\u81F3 target \u9009\u9879\u5361\u7684\u524D\u9762\uFF0C\u9ED8\u8BA4\u503C\uFF1B
        //              "after":    \u8868\u793A\u628A source \u9009\u9879\u5361\u79FB\u52A8\u81F3 target \u9009\u9879\u5361\u7684\u540E\u9762\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        move: function (jq, param) { return jq.each(function () { moveTab(this, param); }); },

        //  \u5728\u5F53\u524D easyui-tabs \u7EC4\u4EF6\u4E0A\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u9009\u9879\u5361\uFF0C\u5E76\u5C06\u5176\u79FB\u52A8\u81F3\u6307\u5B9A\u9009\u9879\u5361\u7684\u524D\u4E00\u683C\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      options:  \u8868\u793A\u8981\u521B\u5EFA\u7684\u65B0\u9009\u9879\u5361\u7684\u5C5E\u6027\uFF1B\u662F\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF1B
        //          \u8BE5\u5BF9\u8C61\u7684\u5404\u9879\u5C5E\u6027\u53C2\u8003 easyui-tabs \u4E2D add \u65B9\u6CD5\u7684\u53C2\u6570 options\uFF0C\u5E76\u5728\u6B64\u57FA\u7840\u4E0A\u589E\u52A0\u4E86\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          target: Integer \u6216 String \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u79FB\u52A8\u4F4D\u7F6E\u7684 tab-panel \u7684\u7D22\u5F15\u53F7\u6216\u8005\u6807\u9898 title \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        insert: function (jq, options) { return jq.each(function () { insertTab(this, options); }); },

        //  \u91CD\u8BBE\u6307\u5B9A\u9009\u9879\u5361\u7684\u6807\u9898\u540D\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param:  \u8FD9\u662F\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          which: \u9700\u8981\u91CD\u8BBE\u6807\u9898\u540D\u7684\u9009\u9879\u5361\u7684 \u7D22\u5F15\u53F7(index) \u6216\u8005\u539F\u6807\u9898\u540D(title)\uFF1B
        //          title: \u65B0\u7684\u6807\u9898\u540D\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D\u9009\u9879\u5361\u63A7\u4EF6 easyui-tabs \u7684 jQuery \u5BF9\u8C61\u3002
        setTitle: function (jq, param) { return jq.each(function () { setTitle(this, param); }); }
    };
    var defaults = $.fn.tabs.extensions.defaults = {
        //  \u589E\u52A0 easyui-tabs \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u524D\u9009\u9879\u5361\u6807\u9898\u680F\u548C\u9009\u9879\u5361\u7684 pane-body \u4E4B\u95F4\u7684\u7A7A\u767D\u533A\u57DF\u9AD8(\u5BBD)\u5EA6(px)\uFF1B
        //  \u8BE5\u53C2\u6570\u662F\u4E00\u4E2A Number \u6570\u503C\uFF0C\u9ED8\u8BA4\u4E3A 2.
        lineHeight: 2,

        //  \u662F\u5426\u542F\u7528\u70B9\u51FB\u9009\u9879\u5361\u5934\u7684\u53F3\u952E\u83DC\u5355\u3002
        enableConextMenu: true,

        //  \u662F\u5426\u542F\u7528 \u201C\u521B\u5EFA\u65B0\u9009\u9879\u5361\u201D \u7684\u53F3\u952E\u83DC\u5355\u3002
        enableNewTabMenu: false,

        //  \u5B9A\u4E49 easyui-tabs \u7684 onRefresh \u4E8B\u4EF6\uFF0C\u5F53\u8C03\u7528 easyui-tabs \u7684 refresh \u65B9\u6CD5\u540E\uFF0C\u5C06\u89E6\u53D1\u8BE5\u4E8B\u4EF6\u3002
        onRefresh: function (title, index) { },

        //  \u5B9A\u4E49\u5F53 enableContextMenu \u4E3A true \u65F6\uFF0C\u53F3\u952E\u70B9\u51FB\u9009\u9879\u5361\u6807\u9898\u65F6\u5019\u5F39\u51FA\u7684\u81EA\u5B9A\u4E49\u53F3\u952E\u83DC\u5355\u9879\u5185\u5BB9\uFF1B
        //  \u8FD9\u662F\u4E00\u4E2A\u6570\u7EC4\u683C\u5F0F\u5BF9\u8C61\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A menu-item \u5143\u7D20\uFF1B\u8BE5 menu-item \u5143\u7D20\u683C\u5F0F\u5B9A\u4E49\u5982\u4E0B\uFF1A
        //      id:         \u8868\u793A\u83DC\u5355\u9879\u7684 id\uFF1B
        //      text:       \u8868\u793A\u83DC\u5355\u9879\u7684\u663E\u793A\u6587\u672C\uFF1B
        //      iconCls:    \u8868\u793A\u83DC\u5355\u9879\u7684\u5DE6\u4FA7\u663E\u793A\u56FE\u6807\uFF1B
        //      disabled:   \u8868\u793A\u83DC\u5355\u9879\u662F\u5426\u88AB\u7981\u7528(\u7981\u7528\u7684\u83DC\u5355\u9879\u70B9\u51FB\u65E0\u6548)\uFF1B
        //      hideOnClick:    \u8868\u793A\u8BE5\u83DC\u5355\u9879\u70B9\u51FB\u540E\u6574\u4E2A\u53F3\u952E\u83DC\u5355\u662F\u5426\u7ACB\u5373\u81EA\u52A8\u9690\u85CF\uFF1B
        //      bold:           Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B\u8868\u793A\u8BE5\u83DC\u5355\u9879\u662F\u5426\u5B57\u4F53\u52A0\u7C97\uFF1B
        //      style:          JSON-Object \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A null\uFF1B\u8868\u793A\u8981\u9644\u52A0\u5230\u8BE5\u83DC\u5355\u9879\u7684\u6837\u5F0F\uFF1B
        //      handler:    \u8868\u793A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u683C\u5F0F\u4E3A function(e, title, index, tabs, item, menu)\uFF0C\u5176\u4E2D this \u6307\u5411\u83DC\u5355\u9879\u672C\u8EAB
        contextMenu: null,

        //  \u8986\u76D6 easyui-tabs \u7684\u539F\u751F\u4E8B\u4EF6\u5C5E\u6027 onContextMenu\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        onContextMenu: onContextMenu,

        //  \u589E\u52A0 easyui-tabs \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1B\u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u53F3\u952E\u70B9\u51FB\u9009\u9879\u5361\u5934\u65F6\uFF0C\u662F\u5426\u663E\u793A "\u663E\u793A\u8BE5\u9009\u9879\u5361\u7684 option" \u83DC\u5355\u9879\u3002
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        showOption: false,

        //  \u589E\u52A0 easyui-tabs \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1B\u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u6DFB\u52A0\u6216\u8005\u66F4\u65B0\u9009\u9879\u5361\u65F6\uFF0C\u662F\u5426\u663E\u793A\u906E\u853D\u5C42\u8FDB\u5EA6\u6761\u6548\u679C\u3002
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        showUpdateProgress: true
    };

    $.extend($.fn.tabs.defaults, defaults);
    $.extend($.fn.tabs.methods, methods);




    function closeCurrentTab(target, iniframe) {
        iniframe = iniframe && !$.util.isTopMost ? true : false;
        var current = $.util.parseJquery(target),
            currentTabs = current.currentTabs(),
            index;
        if (!iniframe && currentTabs.length) {
            index = current.currentTabIndex();
            if (index > -1) { currentTabs.tabs("close", index); }
        } else {
            var jq = $.util.parent.$;
            current = jq.util.parseJquery($.util.currentFrame);
            currentTabs = current.currentTabs();
            if (currentTabs.length) {
                index = current.currentTabIndex();
                if (index > -1) { currentTabs.tabs("close", index); }
            }
        }
    };

    $.fn.extend({
        //  \u6269\u5C55 jQuery \u5BF9\u8C61\u7684\u5B9E\u4F8B\u65B9\u6CD5\uFF1B\u7528\u4E8E\u5173\u95ED\u5F53\u524D\u5BF9\u8C61\u6240\u5728\u7684 easyui-tabs \u5F53\u524D\u9009\u9879\u5361(\u652F\u6301\u5F53\u524D\u9009\u9879\u5361\u9875\u9762\u4E3A iframe \u52A0\u8F7D\u7684\u60C5\u51B5)\u3002
        //  \u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      iniframe: Boolean \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u662F\u5426\u4E3A\u5173\u95ED\u5F53\u524D\u5BF9\u8C61\u6240\u5728\u7684\u7236\u7EA7\u9875\u9762\u7684\u9009\u9879\u5361\uFF1B\u9ED8\u8BA4\u4E3A false\u3002
        //          \u5982\u679C\u5F53\u524D\u9875\u9762\u4E3A\u9876\u7EA7\u9875\u9762\uFF0C
        //          \u6216\u8005\u5F53\u524D\u5BF9\u8C61\u5728 iframe \u4E2D\u4F46\u662F\u4E0D\u5728\u5F53\u524Diframe\u4E2D\u7684\u67D0\u4E2A easyui-tabs \u5185\uFF0C\u5219\u53C2\u6570\u53C2\u6570 inframe \u65E0\u6548\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D jQuery \u94FE\u5F0F\u5BF9\u8C61(\u5B9E\u9645\u4E0A\u8FD4\u56DE\u7684 jQuery \u5BF9\u8C61\u4E2D\uFF0C\u6240\u5305\u542B\u7684\u5143\u7D20\u5DF2\u7ECF\u88AB\u9500\u6BC1\uFF0C\u56E0\u4E3A\u5176\u5BB9\u5668 tab-panel \u88AB\u5173\u95ED\u9500\u6BC1\u4E86)\u3002
        closeCurrentTab: function (iniframe) { return this.each(function () { closeCurrentTab(this, iniframe); }); }
    });


})(jQuery);