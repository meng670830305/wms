/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI combo Extensions 1.0 beta
* jQuery EasyUI combo \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.combo.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-08-02
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.fn.combo.extensions = {};

    function setPrompt(target, prompt) {
        var t = $.util.parseJquery(target), opts = t.combo("options"), textbox = t.combo("textbox");
        opts.prompt = prompt;
        textbox.validatebox("setPrompt", prompt);
    };

    function setIcon(target, iconCls) {
        var t = $.util.parseJquery(target), state = $.data(target, "combo"), combo = state.combo;
        var arrow = combo.find("span.combo-arrow").removeAttr("class").addClass("combo-arrow");
        if (iconCls) { arrow.addClass(iconCls); }
        t.combo("options").iconCls = iconCls;
    }

    function setRequired(target, required) {
        var t = $.util.parseJquery(target), opts = t.combo("options"), textbox = t.combo("textbox");
        opts.required = textbox.validatebox("options").required = required;
    };

    var _destroy = $.fn.combo.methods.destroy;
    function destroy(target) {
        var t = $(target), opts = t.combo("options");
        if ($.isFunction(opts.onBeforeDestroy) && opts.onBeforeDestroy.call(target) == false) { return; }
        _destroy.call(target, t);
        if ($.isFunction(opts.onDestroy)) { opts.onDestroy.call(target); }
    };

    function getCombo(target) {
        return $.data(target, "combo").combo;
    };




    function initialize(target) {
        var t = $.util.parseJquery(target), state = $.data(target, "combo"),
            opts = t.combo("options"), panel = state.panel,
            combo = state.combo, arrow = combo.find(".combo-arrow"),
            exts = opts.extensions ? opts.extensions : opts.extensions = {};
        if (!exts._initialized) {
            t.combo("textbox").focus(function () {
                if (opts.autoShowPanel && panel.is(":hidden")) { t.combo("showPanel"); }
            });
            arrow.unbind("click.combo").bind("click.combo", function () {
                if (panel.is(":visible")) {
                    t.combo("hidePanel");
                } else {
                    $("div.combo-panel:visible").panel("close");
                    t.combo("showPanel");
                    t.combo("textbox").focus();
                }
            });
            if (opts.iconCls) { t.combo("setIcon", opts.iconCls); }
            if ($.util.browser.msie && combo._outerWidth() != opts.width) {
                $.util.exec(function () { t.combo("resize", opts.width); });
            }
            exts._initialized = true;
        }
    }


    var _combo = $.fn.combo;
    $.fn.combo = function (options, param) {
        if (typeof options == "string") { return _combo.apply(this, arguments); }
        return _combo.apply(this, arguments).each(function () {
            initialize(this);
        });
    };
    $.union($.fn.combo, _combo);


    var defaults = $.fn.combo.extensions.defaults = {
        //  \u589E\u52A0 easyui-combo \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1B\u8868\u793A\u8BE5 combo \u7EC4\u4EF6\u7684 iconCls \u56FE\u6807\u6837\u5F0F\u7C7B\uFF1B
        //  String \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A null\u3002
        iconCls: null,

        //  \u589E\u52A0 easyui-combo \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1B\u8868\u793A\u8BE5 combox \u7EC4\u4EF6\u662F\u5426\u5728 textbox \u6587\u672C\u663E\u793A\u6846\u83B7\u53D6\u7126\u70B9\u65F6\u81EA\u52A8\u6267\u884C showPanel \u65B9\u6CD5\u663E\u793A\u4E0B\u62C9 panel \u9762\u677F\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        autoShowPanel: true,

        onBeforeDestroy: function () { },

        onDestroy: function () { }
    };

    var methods = $.fn.combo.extensions.methods = {
        //  \u6269\u5C55 easyui-combo \u7EC4\u4EF6\u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u7528\u4E8E\u8BBE\u7F6E easyui-combo \u63A7\u4EF6\u7684\u53F3\u4FA7\u663E\u793A\u56FE\u6807\uFF0C\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      iconCls:    String \u7C7B\u578B\u7684\u503C\uFF0C\u8868\u793A\u9700\u8981\u8BBE\u7F6E\u7684\u56FE\u6807\u7684 css \u7C7B\u6837\u5F0F\u540D\uFF0C\u4F8B\u5982 "icon-ok", "icon-save"
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-combo \u63A7\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setIcon: function (jq, iconCls) { return jq.each(function () { setIcon(this, iconCls); }); },

        //  \u6269\u5C55 easyui-combo \u7EC4\u4EF6\u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u7528\u4E8E\u8BBE\u7F6E\u542F\u7528\u6216\u8005\u7981\u7528 easyui-combo \u63A7\u4EF6\u7684\u8868\u5355\u9A8C\u8BC1\u529F\u80FD\uFF0C\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      required:   Boolean \u7C7B\u578B\u7684\u503C\uFF0C\u8868\u793A\u542F\u7528\u6216\u8005\u7981\u7528 easyui-combo \u63A7\u4EF6\u7684\u8868\u5355\u9A8C\u8BC1\u529F\u80FD\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-combo \u63A7\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setRequired: function (jq, required) { return jq.each(function () { setRequired(this, required); }); },

        //  \u6269\u5C55 easyui-combo \u7EC4\u4EF6\u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u7528\u4E8E\u8BBE\u7F6E\u8BE5 combo \u7684 textbox \u8F93\u5165\u6846\u7684 prompt(\u8F93\u5165\u63D0\u793A\u6587\u5B57) \u503C\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      prompt: String \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u8981\u88AB\u8BBE\u7F6E\u7684 prompt \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-combo \u63A7\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setPrompt: function (jq, prompt) { return jq.each(function () { setPrompt(this, prompt); }); },

        destroy: function (jq) { return jq.each(function () { destroy(this); }); },

        combo: function (jq) { return getCombo(jq[0]); }
    };
    $.extend($.fn.combo.defaults, defaults);
    $.extend($.fn.combo.methods, methods);

})(jQuery);