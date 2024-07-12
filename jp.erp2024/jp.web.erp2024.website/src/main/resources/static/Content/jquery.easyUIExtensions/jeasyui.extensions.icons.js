/**
* jQuery EasyUI 1.3.4
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI icons Extensions 1.0 beta
* jQuery EasyUI icons \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.icons.js
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
*   7、jeasyui.extensions.toolbar.js v1.0 beta late
*   8、icons/jeasyui.icons.all.js \u548C icons/icon-all.css v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.util.namespace("$.easyui.icons");

    //  \u589E\u52A0\u81EA\u5B9A\u4E49\u6269\u5C55\u65B9\u6CD5 $.easyui.icons.showSelector\uFF1B\u8BE5\u65B9\u6CD5\u5F39\u51FA\u4E00\u4E2A\u56FE\u6807\u9009\u62E9\u6846\u7A97\u53E3\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      options: \u8FD9\u662F\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF1B\u5177\u4F53\u683C\u5F0F\u53C2\u8003 $.easyui.showDialog \u65B9\u6CD5\u7684\u53C2\u6570 options \u7684\u683C\u5F0F\uFF1B
    //               \u8BE5\u53C2\u6570\u683C\u5F0F\u5728 $.easyui.showDialog \u53C2\u6570 options \u683C\u5F0F\u57FA\u7840\u4E0A\u6269\u5C55\u4E86\u5982\u4E0B\u5C5E\u6027\uFF1A
    //          selected:
    //          multiple:
    //          size:
    //          onSelect:
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F39\u51FA\u7A97\u53E3\u7684 easyui-dialog \u63A7\u4EF6\u5BF9\u8C61(jQuery-DOM \u683C\u5F0F)\u3002
    $.easyui.icons.showSelector = function (options) {
        var opts = $.extend({
            width: 520, height: 360,
            title: "\u9009\u62E9\u56FE\u6807",
            iconCls: "icon-hamburg-zoom",
            maximizable: true,
            collapsible: true,
            selected: null,
            multiple: false,
            size: null,
            onSelect: function (value) { }
        }, options);
        opts.size = opts.size || "16";
        opts.title = opts.title + ", " + (opts.multiple ? "\u591A\u9009" : "\u5355\u9009") + ", \u5C3A\u5BF8:" + opts.size;
        var value = opts.selected,
            dia = $.easyui.showDialog($.extend({}, opts, {
                content: "<div class=\"icons-layout\"><div data-options=\"region: 'north', split: false, border: false\" style=\"height: 31px; overflow: hidden;\"><div class=\"icons-toolbar\"></div></div><div data-options=\"region: 'center', border: false\"><div class=\"icons-tabs\"></div></div></div>",
                saveButtonText: "\u786E\u5B9A",
                saveButtonIconCls: "icon-ok",
                enableApplyButton: false,
                topMost: true,
                onSave: function () { if ($.isFunction(opts.onSelect)) { return opts.onSelect.call(this, value); } }
            }));
        $.util.exec(function () {
            var content = dia.find("div.icons-layout").layout({ fit: true }),
                toolbar = content.find("div.icons-toolbar").toolbar(),
                tabs = content.find("div.icons-tabs").tabs({ fit: true, border: false }),
                tabsOpts = tabs.tabs("options"),
                onSelect = tabsOpts.onSelect,
                iconStyles = $.array.filter($.easyui.iconStyles, function (item) {
                    return item.size.indexOf(opts.size) > -1;
                }).sort(function (a, b) { return a.sort - b.sort; }),
                last,
                singleSelect = function (e) {
                    if (last) { last.removeClass("selected"); }
                    last = $(this);
                    last.addClass("selected");
                    value = last.attr("title");
                    refreshToolbar();
                },
                multipleSelect = function (e) {
                    var li = $(this), iconCls = li.attr("title");
                    if (!value) { value = []; }
                    if (!$.isArray(value)) { value = [value]; }
                    $.array[li.hasClass("selected") ? "remove" : "attach"](value, iconCls);
                    li.toggleClass("selected");
                    refreshToolbar();
                };
            dia.setValue = function (val) {
                value = val;
                refreshToolbar();
                refreshCheckedStatus();
            };
            dia.getValue = function () {
                return value;
            };
            tabsOpts.onSelect = function (title, index) {
                if ($.isFunction(onSelect)) { onSelect.apply(this, arguments); }
                var tab = tabs.tabs("getTab", index), tabOpts = tab.panel("options"), style = tabOpts.id;
                if (tab.find("ul.icon-selector-ul").length) { return; }
                var icons = $.array.filter($.easyui.icons[style], opts.size == "32" ?
                        function (icon) { return icon.iconCls.indexOf("32") > -1; } :
                        function (icon) { return icon.iconCls.indexOf("32") == -1; }
                    );
                var ul = $("<ul class='icon-selector-ul'></ul>").appendTo(tab);
                $.each(icons, function () {
                    var li = $("<li></li>").attr("title", this.iconCls).appendTo(ul).click(opts.multiple ? multipleSelect : singleSelect);
                    $("<span>&nbsp;</span>").addClass(this.iconCls).appendTo(li);
                });
                if (opts.size == "32") { ul.addClass("icon-selector-ul-32"); }
            };
            $.util.exec(function () { dia.setValue(value); });
            $.each(iconStyles, function (i, item) {
                tabs.tabs("add", {
                    id: item.style, title: item.name, iconCls: "", closable: false, selected: false, refreshable: false
                });
            });
            if ($.easyui.iconStyles.length) { tabs.tabs("select", 0); }
            function refreshToolbar() {
                var wrapper = toolbar.toolbar("wrapper");
                wrapper.find("td").remove();
                if (value) {
                    if ($.isArray(value)) {
                        var title = value.join("\n"),
                            tip = $("<span>\uFF0C\u8BE6\u60C5</span>").css({
                                color: "Blue"
                            }).attr("title", title),
                            clear = $("<div>\u6E05\u9664\u9009\u62E9</div>").css({
                                color: "Blue", cursor: "pointer",
                                width: 100,
                                textAlign: "right"
                            }).attr("title", "\u6E05\u9664\u6240\u6709\u9009\u62E9\u7684\u9879").click(function () {
                                tabs.find("ul>li.selected").removeClass("selected");
                                dia.setValue(null);
                            });
                        toolbar.toolbar("appendItem", ["\u5F53\u524D\u5171\u9009\u4E2D\u7684\u56FE\u6807\u6570\u91CF\u4E3A\uFF1A", String(value.length), tip, clear]);
                    } else {
                        var icon = $("<a></a>").linkbutton({ plain: true, iconCls: value })
                        toolbar.toolbar("appendItem", ["\u5F53\u524D\u9009\u4E2D\u7684\u56FE\u6807\u503C\u4E3A\uFF1A", icon, value]);
                    }
                } else {
                    toolbar.toolbar("appendItem", "\u5F53\u524D\u6CA1\u6709\u9009\u4E2D\u56FE\u6807");
                }
            };
            function refreshCheckedStatus() {
                var li = dia.dialog("body").find("ul.icon-selector-ul li").removeClass("selected");
                if ($.isArray(value)) {
                    $.each(value, function (i, n) {
                        if (n) { li.find("span." + n).parent().addClass("selected"); }
                    });
                } else {
                    if (value) { last = li.find("span." + value).parent().addClass("selected"); }
                }
            };
        });
        return dia;
    };


    var css =
        "ul.icon-selector-ul { padding: 10px; margin: 0px; }" +
        "ul.icon-selector-ul li { list-style-type: none; float: left; cursor: pointer; margin: 2px; width: 20px; height: 20px; }" +
        "ul.icon-selector-ul li { border-width: 1px; border-color: #fff; border-style: solid; }" +
        "ul.icon-selector-ul li:hover { border-color: Red; }" +
        "ul.icon-selector-ul li span { line-height: 16px; padding-left: 16px; display: inline-block; }" +
        "ul.icon-selector-ul-32 li { width: 36px; height: 36px; }" +
        "ul.icon-selector-ul-32 li span { line-height: 32px; padding-left: 32px; }" +
        "ul.icon-selector-ul li.selected { border-color: Red; background-color: rgb(221, 221, 221); }"
    $.util.addCss(css);


})(jQuery);