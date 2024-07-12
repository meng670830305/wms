/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI linkbutton Extensions 1.0 beta
* jQuery EasyUI linkbutton \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.linkbutton.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-09-02
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.fn.linkbutton.extensions = {};

    function initialize(target) {
        var t = $.util.parseJquery(target), opts = t.linkbutton("options"),
            exts = opts.extensions ? opts.extensions : opts.extensions = {};
        if (!exts._initialized) {
            setStyle(target, opts.style);
            exts._initialized = true;
        }
    };

    function setIcon(target, iconCls) {
        var t = $.util.parseJquery(target), opts = t.linkbutton("options"),
            span = t.find("span.l-btn-empty"), isEmpty = span.length ? true : false;
        if (!isEmpty) { span = t.find("span.l-btn-text"); }
        span.removeClass(opts.iconCls).addClass(iconCls);
        opts.iconCls = iconCls;
    };

    function setText(target, text) {
        var t = $.util.parseJquery(target), opts = t.linkbutton("options"),
            textspan = t.find("span.l-btn-text");
        if (text) {
            textspan.empty().removeClass("l-btn-icon-left l-btn-icon-right").addClass("l-btn-text l-btn-icon-" + opts.iconAlign).addClass(opts.iconCls).text(text);
        } else {
            textspan.empty().removeClass("l-btn-icon-left l-btn-icon-right").removeClass(opts.iconCls);
            $("<span class='l-btn-empty'>&nbsp;</span>").addClass(opts.iconCls).appendTo(textspan);
        }
        opts.text = text;
    };

    function setIconAlign(target, iconAlign) {
        var t = $.util.parseJquery(target), opts = t.linkbutton("options");
        if (!t.find("span.l-btn-empty").length) {
            $.util.exec(function () {
                t.find("span.l-btn-text").removeClass("l-btn-icon-left l-btn-icon-right").addClass("l-btn-icon-" + opts.iconAlign);
            });
        }
        opts.iconAlign = iconAlign;
    }

    function setStyle(target, style) {
        if (style) {
            $.util.parseJquery(target).css(style);
        }
    };

    function setPlain(target, plain) {
        var t = $.util.parseJquery(target), opts = t.linkbutton("options");
        plain = plain ? true : false;
        t[plain ? "addClass" : "removeClass"]("l-btn-plain");
        opts.plain = plain;
    };



    var _linkbutton = $.fn.linkbutton;
    $.fn.linkbutton = function (options, param) {
        if (typeof options == "string") { return _linkbutton.apply(this, arguments); }
        return _linkbutton.apply(this, arguments).each(function () {
            initialize(this);
        });
    };
    $.union($.fn.linkbutton, _linkbutton);


    var defaults = $.fn.linkbutton.extensions.defaults = {
        //  \u589E\u52A0 easyui-linkbutton \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF1B\u8868\u793A linkbutton \u6309\u94AE\u7684\u81EA\u5B9A\u4E49\u6837\u5F0F\u3002
        style: null
    };

    var methods = $.fn.linkbutton.extensions.methods = {
        //  \u589E\u52A0 easyui-linkbutton \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u65B9\u6CD5\uFF1B\u8BBE\u7F6E linkbutton \u6309\u94AE\u7684\u56FE\u6807\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      iconCls:    String \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u8981\u8BBE\u7F6E\u7684\u65B0\u7684\u56FE\u6807\u6837\u5F0F
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-linkbutton \u63A7\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\uFF1B
        setIcon: function (jq, iconCls) { return jq.each(function () { setIcon(this, iconCls); }); },

        //  \u589E\u52A0 easyui-linkbutton \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u65B9\u6CD5\uFF1B\u8BBE\u7F6E linkbutton \u6309\u94AE\u7684\u6587\u5B57\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      text:   String \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u8981\u8BBE\u7F6E\u7684\u65B0\u7684\u6309\u94AE\u6587\u672C\u5185\u5BB9
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-linkbutton \u63A7\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\uFF1B
        setText: function (jq, text) { return jq.each(function () { setText(this, text); }); },

        //  \u589E\u52A0 easyui-linkbutton \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u65B9\u6CD5\uFF1B\u8BBE\u7F6E linkbutton \u6309\u94AE\u7684\u56FE\u6807\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      iconAlign:   String \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u8981\u8BBE\u7F6E\u7684\u6309\u94AE\u7684\u56FE\u6807\u4F4D\u7F6E\uFF1B\u8BE5\u53C2\u6570\u9650\u5B9A\u53D6\u503C "left"、"right"
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-linkbutton \u63A7\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\uFF1B
        setIconAlign: function (jq, iconAlign) { return jq.each(function () { setIconAlign(this, iconAlign); }); },

        //  \u589E\u52A0 easyui-linkbutton \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u65B9\u6CD5\uFF1B\u8BBE\u7F6E linkbutton \u6309\u94AE\u7684\u81EA\u5B9A\u4E49\u6837\u5F0F\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      style:   JSON-Object \u7C7B\u578B\uFF0C\u8868\u793A\u8981\u8BBE\u7F6E\u7684\u6309\u94AE\u7684\u6837\u5F0F
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-linkbutton \u63A7\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\uFF1B
        setStyle: function (jq, style) { return jq.each(function () { setStyle(this, style); }); },

        //  \u589E\u52A0 easyui-linkbutton \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u65B9\u6CD5\uFF1B\u8BBE\u7F6E linkbutton \u6309\u94AE\u7684 plain \u5C5E\u6027\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      plain:   Boolean \u7C7B\u578B\uFF0C\u8868\u793A\u8981\u8BBE\u7F6E\u7684\u6309\u94AE\u7684 plain \u5C5E\u6027\u503C
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-linkbutton \u63A7\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\uFF1B
        setPlain: function (jq, plain) { return jq.each(function () { setPlain(this, plain); }); }
    };

    $.extend($.fn.linkbutton.defaults, defaults);
    $.extend($.fn.linkbutton.methods, methods);

})(jQuery);