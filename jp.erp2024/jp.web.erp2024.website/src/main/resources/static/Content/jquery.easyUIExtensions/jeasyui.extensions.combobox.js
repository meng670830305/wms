/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI combobox Extensions 1.0 beta
* jQuery EasyUI combobox \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.combobox.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-08-13
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {


    $.fn.combobox.extensions = {};


    function getItem(target) {
        var t = $.util.parseJquery(target), opts = t.combobox("options"),
            value = t.combobox("getValue"), data = t.combobox("getData");
        return $.array.first(data, function (val) { return val[opts.valueField] == value; });
    };

    function getItems(target) {
        var t = $.util.parseJquery(target), opts = t.combobox("options"),
            values = t.combobox("getValues"), data = t.combobox("getData");
        return $.array.filter(data, function (val) {
            return $.array.contains(values, val[opts.valueField]);
        });
    };





    var loader = function (param, success, error) {
        var opts = $(this).combobox('options');
        if (!opts.url) return false;
        if (opts.queryParams) {
            var p = $.util.parseMapFunction(opts.queryParams);
            param = $.extend({}, param, p);
        }
        $.ajax({
            type: opts.method, url: opts.url, data: param, dataType: 'json',
            success: function (data) { success(data); },
            error: function () { error.apply(this, arguments); }
        });
    };

    function load(target, param) {
        var t = $.util.parseJquery(target);
        if (!param) { return; }
        if (typeof param === "string") { return t.combobox("reload", param); }
        var opts = t.combobox("options");
        opts.queryParams = param;
        t.combobox("reload");
    }

    var defaults = $.fn.combobox.extensions.defaults = {

        //  \u589E\u52A0 easyui-combobox \u63A7\u4EF6\u9ED8\u8BA4\u53C2\u6570 queryParams\uFF1B\u8BE5\u53C2\u6570\u8868\u793A\u4ECE\u8FDC\u7A0B\u670D\u52A1\u5668\u8C03\u53D6\u6570\u636E\u65F6\u53D1\u9001\u7684\u989D\u5916\u67E5\u8BE2\u53C2\u6570\uFF1B\u8BE5\u53C2\u6570\u5E94\u8BE5\u5B9A\u4E49\u4E3A\u4E00\u4E2A JSON \u5BF9\u8C61\u3002
        //  \u9ED8\u8BA4\u4E3A null\u3002
        queryParams: null,

        //  \u91CD\u65B0\u5B9A\u4E49 easyui-combobox \u63A7\u4EF6\u7684\u9ED8\u8BA4\u5C5E\u6027 loader\uFF0C\u4F7F\u4E4B\u80FD\u5904\u7406 queryParams \u53C2\u6570\u3002
        loader: loader
    };

    var methods = $.fn.combobox.extensions.methods = {

        //  \u589E\u52A0 easyui-combobox \u63A7\u4EF6\u7684 load \u65B9\u6CD5\uFF1B\u8BE5\u65B9\u6CD5\u7528\u4E8E\u4EE5\u6307\u5B9A\u7684\u53C2\u6570\u67E5\u8BE2\u91CD\u65B0\u52A0\u8F7D\u8FDC\u7A0B\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param:  \u53EF\u9009\uFF1B\u53C2\u6570\u7C7B\u578B\u53EF\u4EE5\u5982\u4E0B\uFF1A
        //          String: 
        //          JSON Object: \u8868\u793A\u8981\u53D1\u9001\u81F3\u8FDC\u7A0B\u670D\u52A1\u5668\u67E5\u8BE2\u6570\u636E\u7684\u53C2\u6570\u3002
        load: function (jq, param) { return jq.each(function () { load(this, param); }); },

        //  \u6269\u5C55 easyui-combobox \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u8BE5\u65B9\u6CD5\u7528\u4E8E\u83B7\u53D6\u5F53\u524D\u9009\u62E9\u4E86\u7684\u9879\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A JSON-Object\uFF0C\u8BE5 JSON-Object \u4E3A\u5F53\u524D easyui-combobox \u6570\u636E\u6E90\u4E2D\u7684\u4E00\u4E2A\u5B50\u9879\uFF0C\u5305\u542B idField \u548C textField \u7684\u503C\uFF1B
        //      \u5982\u679C\u5F53\u524D easyui-combobox \u6CA1\u6709\u9009\u4E2D\u4EFB\u4F55\u503C\uFF0C\u5219\u8FD4\u56DE null\u3002
        getItem: function (jq) { return getItem(jq[0]); },

        //  \u6269\u5C55 easyui-combobox \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u8BE5\u65B9\u6CD5\u7528\u4E8E\u83B7\u53D6\u5F53\u524D\u9009\u62E9\u4E86\u7684\u6240\u6709\u9879\u96C6\u5408\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A Array\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u90FD\u662F\u4E00\u4E2A JSON-Object \u4E3A\u5F53\u524D easyui-combobox \u6570\u636E\u6E90\u4E2D\u7684\u4E00\u4E2A\u5B50\u9879\uFF0C\u5305\u542B idField \u548C textField \u7684\u503C\uFF1B
        //      \u5982\u679C\u5F53\u524D easyui-combobox \u6CA1\u6709\u9009\u4E2D\u4EFB\u4F55\u503C\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u6570\u7EC4\u3002
        getItems: function (jq) { return getItems(jq[0]); }
    };

    $.extend($.fn.combobox.defaults, defaults);
    $.extend($.fn.combobox.methods, methods);

})(jQuery);