/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI theme Extensions 1.0 beta
* jQuery EasyUI theme \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.theme.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-08-19
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($) {

    $.util.namespace("$.easyui");

    $.easyui.theme = function () {
        if (arguments.length == 0) { return getTheme(); }
        if (arguments.length > 0) {
            if (arguments[0] === true) {
                return setTopTheme($.util.$, arguments[1], arguments[2], arguments[3]);
            } else {
                return arguments[0] === false ? setTheme($, arguments[1], arguments[2], arguments[3]) : setTheme($, arguments[0], arguments[1], arguments[2]);
            }
        }
    };

    function getTheme() {
        //var link = $("link[href$='easyui.css']"), href = link.attr("href"), array = href.split("/");
        var link = $("#themes"), href = link.attr("href"), array = href.split("/");
        return array.length > 1 ? array[array.length - 2] : array[array.length - 1];
    };

    function setTheme(jq, theme, callback, thisArg) {
        //var link = jq("link[href$='easyui.css']"), href = link.attr("href"), array = href.split("/");
        var link = jq("#themes"), href = link.attr("href"), array = href.split("/");
        if (arguments.length > 1) { array[array.length - 2] = theme; } else { jq.array.insert(array, 0, theme); }
        link.attr("href", array.join("/"));
        callbackFunc(callback, theme, thisArg);
    };

    function setTopTheme(jq, theme, callback, thisArg) {
        setTheme(jq, theme);
        jq("iframe,iframe").each(function () {
            try {
                if (jq.util && jq.util.isWindow(this.contentWindow) && jq.util.isObject(this.contentWindow.document)
                    && jq.isFunction(this.contentWindow.$) && this.contentWindow.$.easyui && this.contentWindow.$.easyui.theme) {
                    setTopTheme(this.contentWindow.$, theme);
                }
            } catch (ex) { };
        });
        callbackFunc(callback, theme, thisArg);
    };

    function callbackFunc(callback, theme, thisArg) {
        if (!$.isFunction(callback)) { return; }
        var item = $.array.first($.easyui.theme.dataSource, function (val) { return val.path == theme; });
        if (item) { theme = item; }
        callback.call(thisArg, theme);
    };

    $.easyui.theme.dataSource = [
        { id: 1, name: "\u5929\u7A7A\u84DD(\u9ED8\u8BA4)", path: "default" },
        { id: 2, name: "\u91D1\u5C5E\u9ED1", path: "black" },
        { id: 3, name: "\u94F6\u8272", path: "Silver" },
        { id: 4, name: "\u7070\u973E", path: "gray" },
        //{ id: 5, name: "\u6E05\u6CC9", path: "cupertino" },
        //{ id: 6, name: "\u9ED1\u8272\u8702\u5DE2", path: "dark-hive" },
        //{ id: 7, name: "\u674F\u9EC4", path: "pepper-grinder" },
        //{ id: 8, name: "\u9633\u5149", path: "sunny" },
        { id: 9, name: "\u78C1\u8D34\uFF08\u6807\u51C6\uFF09", path: "metro" },
        { id: 10, name: "\u78C1\u8D34\uFF08\u84DD\uFF09", path: "metro-blue" },
        { id: 11, name: "\u78C1\u8D34\uFF08\u7070\uFF09", path: "metro-gray" },
        { id: 12, name: "\u78C1\u8D34\uFF08\u7EFF\uFF09", path: "metro-green" },
        { id: 13, name: "\u78C1\u8D34\uFF08\u6A59\uFF09", path: "metro-orange" }
        //,
        //{ id: 14, name: "\u78C1\u8D34\uFF08\u7EA2\uFF09", path: "metro-red" }
    ];




})(jQuery);





