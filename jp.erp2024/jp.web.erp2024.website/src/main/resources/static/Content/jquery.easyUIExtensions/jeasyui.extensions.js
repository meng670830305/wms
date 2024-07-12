/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI Generic Plugins Basic Library 1.0 beta
* jQuery EasyUI \u901A\u7528\u63D2\u4EF6\u57FA\u7840\u5E93
* jeasyui.extensions.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-08-21
*
* \u4F9D\u8D56\u9879\uFF1Ajquery.jdirk.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    var coreEasyui = {},
        coreJquery = function () { return $.apply(this, arguments); };

    coreJquery.fn = coreJquery.prototype = {};
    coreJquery.easyui = coreEasyui;

    coreEasyui.getTopEasyuiMessager = function () {
        if ($.util.isTopMost) { return $.messager; }
        return $.util.$ && $.util.$.messager ? $.util.$.messager : $.messager;
    };
    coreEasyui.messager = coreEasyui.getTopEasyuiMessager();

    coreEasyui.getTopEasyuiTooltip = function () {
        if ($.util.isTopMost) { return $.fn.tooltip; }
        return $.util.$ && $.util.$.fn && $.util.$.fn.tooltip ? $.util.$.fn.tooltip : $.fn.tooltip;
    };
    coreEasyui.tooltip = $.fn.tooltip;
    //  \u5BF9\u67D0\u4E2A\u5143\u7D20\u8BBE\u7F6E easyui-tooltip \u5C5E\u6027\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      target:     \u8868\u793A\u8981\u8BBE\u7F6E easyui-tooltip \u7684\u5143\u7D20\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A jQuery \u9009\u62E9\u5668\u5B57\u7B26\u4E32\uFF0C\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A DOM \u5BF9\u8C61\u6216\u8005 jQuery \u5BF9\u8C61\u3002
    //      options:    \u8868\u793A\u521D\u59CB\u5316 easyui-tooltip \u7684\u53C2\u6570\u4FE1\u606F\uFF0C\u4E3A\u4E00\u4E2A JSON-Object\uFF1B
    //  \u5907\u6CE8\uFF1A\u901A\u8FC7\u8BE5\u65B9\u6CD5\u8BBE\u7F6E\u7684 easyui-tooltip \u5C5E\u6027\uFF0C\u5728\u89E6\u53D1 mouseover \u4E8B\u4EF6\u65F6\uFF0C\u52A0\u8F7D easyui-tooltip\uFF0C\u5728 tooltip-tip \u9690\u85CF\u65F6\uFF0Ceasyui-tooltip \u81EA\u52A8\u8C03\u7528 destroy \u9500\u6BC1\uFF1B
    coreEasyui.tooltip.init = function (target, options) {
        var t = $.util.parseJquery(target);
        t.mouseover(function () {
            t.tooltip($.extend({ trackMouse: true }, options, { onHide: function () {
                if ($.isFunction(options.onHide)) { options.onHide.apply(this, arguments); }
                t.tooltip("destroy");
            }
            })).tooltip("show");
        });
    };

    var icons = { "error": "messager-error", "info": "messager-info", "question": "messager-question", "warning": "messager-warning" },
        _show = $.messager.show, _alert = $.messager.alert, _confirm = $.messager.confirm, _prompt = $.messager.prompt,
        defaults = { title: "\u64CD\u4F5C\u63D0\u9192", confirm: "\u60A8\u786E\u8BA4\u8981\u8FDB\u884C\u8BE5\u64CD\u4F5C\uFF1F", prompt: "\u8BF7\u8F93\u5165\u76F8\u5E94\u5185\u5BB9\uFF1A", icon: "info", loading: "\u6B63\u5728\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u7B49..." };

    //  \u91CD\u5199 $.messager.show \u65B9\u6CD5\uFF0C\u4F7F\u5176\u652F\u6301\u56FE\u6807\u4EE5\u53CA\u9ED8\u8BA4\u7684\u5355\u4E2A\u5B57\u7B26\u4E32\u53C2\u6570\u7684\u91CD\u8F7D\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      options:    \u8868\u793A\u9700\u8981\u5F39\u51FA\u6D88\u606F\u7684\u5185\u5BB9、\u56FE\u6807\u548C\u65B9\u5F0F\u7B49\u4FE1\u606F\uFF0C\u8BE5\u53C2\u6570\u7C7B\u578B\u53EF\u4EE5\u4E3A\u5982\u4E0B\uFF1A
    //          JSON Object: \u517C\u5BB9 $.messager.show \u5B98\u65B9\u9ED8\u8BA4 API \u7684\u6240\u6709\u5C5E\u6027\uFF0C\u5E76\u5728\u6B64\u57FA\u7840\u4E0A\u589E\u52A0\u5982\u4E0B\u53C2\u6570\uFF1A
    //              icon: \u8868\u793A\u5F39\u51FA\u6D88\u606F\u7684\u56FE\u6807\uFF0C\u4E3A\u4E00\u4E2A String \u7C7B\u578B\u503C\uFF0C\u8BE5\u503C\u53EF\u9009\u7684\u5185\u5BB9\u4E0E $.messager.alert \u65B9\u6CD5\u7684\u7B2C\u4E09\u4E2A\u53C2\u6570\u53EF\u9009\u5185\u5BB9\u76F8\u540C\uFF1B
    //                  \u5305\u62EC\uFF1A"error", "info", "question", "warning"\uFF1B
    //                  \u5177\u4F53\u5185\u5BB9\u53C2\u89C1 $.messager.alert \u8BE5\u65B9\u6CD5\u7684\u5B98\u65B9\u9ED8\u8BA4 API \u4E2D\u7B2C\u4E09\u4E2A\u53C2\u6570\u53EF\u9009\u5185\u5BB9\u3002
    //              position: \u8868\u793A\u5F39\u51FA\u6D88\u606F\u7684\u4F4D\u7F6E\uFF0C\u4E3A\u4E00\u4E2A String \u7C7B\u578B\u503C\uFF0C\u8BE5\u503C\u53EF\u9009\u7684\u5185\u5BB9\u5B9A\u4E49\u5982\u4E0B\uFF1A
    //                  topLeft: \u5C4F\u5E55\u5DE6\u4E0A\u89D2, topCenter: \u5C4F\u5E55\u4E0A\u65B9\u4E2D\u95F4\uFF0CtopRight: \u5C4F\u5E55\u53F3\u4E0A\u89D2
    //                  centerLeft: \u5C4F\u5E55\u5DE6\u4FA7\u4E2D\u95F4\uFF0Ccenter: \u5C4F\u5E55\u6B63\u4E2D\u95F4\uFF0CcenterRight: \u5C4F\u5E55\u53F3\u4FA7\u4E2D\u95F4
    //                  bottomLeft: \u5C4F\u5E55\u5DE6\u4E0B\u89D2\uFF0CbottomCenter: \u5C4F\u5E55\u4E0B\u65B9\u4E2D\u95F4\uFF0CbottomRight: \u5C4F\u5E55\u53F3\u4E0B\u89D2
    //          String: \u4EE5 icon: "info"、title: "\u64CD\u4F5C\u63D0\u9192"、msg: options \u4E3A\u9ED8\u8BA4\u7684\u65B9\u5F0F\u8C03\u7528\u4E0A\u4E00\u91CD\u8F7D\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F39\u51FA\u7684\u6D88\u606F\u6846 easyui-window \u5BF9\u8C61
    $.messager.show = function (options) {
        var isString = $.util.isString(options) || $.util.isBoolean(options) || $.isNumeric(options);
        if (isString) {
            return arguments.length == 1 ? $.messager.show({ msg: String(options) }) : $.messager.show({ title: options, msg: arguments[1], icon: arguments[2], position: arguments[3] });
        }
        var defaults = $.extend({}, $.messager.defaults, { title: "\u64CD\u4F5C\u63D0\u9192", timeout: 4000, showType: "slide" });
        var position = {
            topLeft: { right: "", left: 0, top: document.body.scrollTop + document.documentElement.scrollTop, bottom: "" },
            topCenter: { right: "", top: document.body.scrollTop + document.documentElement.scrollTop, bottom: "" },
            topRight: { left: "", right: 0, top: document.body.scrollTop + document.documentElement.scrollTop, bottom: "" },
            centerLeft: { left: 0, right: "", bottom: "" },
            center: { right: "", bottom: "" },
            centerRight: { left: "", right: 0, bottom: "" },
            bottomLeft: { left: 0, right: "", top: "", bottom: -document.body.scrollTop - document.documentElement.scrollTop },
            bottomCenter: { right: "", top: "", bottom: -document.body.scrollTop - document.documentElement.scrollTop },
            bottomRight: { left: "", right: 0, top: "", bottom: -document.body.scrollTop - document.documentElement.scrollTop }
        };
        var opts = $.extend({}, defaults, options);
        opts.style = position[options.position] ? position[options.position] : position.topCenter;
        var iconCls = icons[opts.icon] ? icons[opts.icon] : icons.info;
        opts.msg = "<div class='messager-icon " + iconCls + "'></div>" + "<div>" + opts.msg + "</div>";
        return _show(opts);
    };
    $.union($.messager.show, _show);

    //  \u91CD\u5199 $.messager.alert \u65B9\u6CD5\uFF0C\u4F7F\u5176\u652F\u6301\u5982\u4E0B\u7684\u591A\u79CD\u91CD\u8F7D\u65B9\u5F0F\uFF1A
    //      function (message)
    //      function (message, callback)
    //      function (title, message, callback)
    //      function (title, message, icon)
    //      function (title, message, icon, callback)
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F39\u51FA\u7684\u6D88\u606F\u6846 easyui-window \u5BF9\u8C61
    $.messager.alert = function (title, msg, icon, fn) {
        if (arguments.length == 1) { return _alert(defaults.title, arguments[0], defaults.icon); }
        if (arguments.length == 2) {
            if ($.isFunction(arguments[1])) { return _alert(defaults.title, arguments[0], defaults.icon, arguments[1]); }
            if (arguments[1] in icons) { return _alert(defaults.title, arguments[0], arguments[1]); }
            return _alert.apply(this, arguments);
        }
        if (arguments.length == 3) {
            if ($.isFunction(arguments[2])) {
                return (arguments[1] in icons) ? _alert(defaults.title, arguments[0], arguments[1], arguments[2])
                    : _alert(arguments[0], arguments[1], defaults.icon, arguments[2]);
            }
            return _alert.apply(this, arguments);
        }
        return _alert.apply(this, arguments);
    };

    //  \u91CD\u5199 $.messager.confirm \u65B9\u6CD5\uFF0C\u4F7F\u5176\u652F\u6301\u5982\u4E0B\u7684\u591A\u79CD\u91CD\u8F7D\u65B9\u5F0F\uFF1A
    //      function (message)
    //      function (callback)
    //      function (message, callback)
    //      function (title, message)
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F39\u51FA\u7684\u6D88\u606F\u6846 easyui-window \u5BF9\u8C61
    $.messager.confirm = function (title, msg, fn) {
        if (arguments.length == 1) {
            return $.isFunction(arguments[0]) ? _confirm(defaults.title, defaults.confirm, arguments[0]) : _confirm(defaults.title, arguments[0]);
        }
        if (arguments.length == 2) {
            return $.isFunction(arguments[1]) ? _confirm(defaults.title, arguments[0], arguments[1]) : _confirm(arguments[0], arguments[1]);
        }
        return _confirm.apply(this, arguments);
    };

    //  \u589E\u52A0 $.messager.solicit \u65B9\u6CD5\uFF0C\u8BE5\u65B9\u6CD5\u5F39\u51FA\u4E00\u4E2A\u5305\u542B\u4E09\u4E2A\u6309\u94AE("\u662F"、"\u5426" \u548C "\u53D6\u6D88")\u7684\u5BF9\u8BDD\u6846\uFF0C\u70B9\u51FB\u4EFB\u610F\u6309\u94AE\u6216\u8005\u5173\u95ED\u5BF9\u8BDD\u6846\u65F6\uFF0C\u6267\u884C\u6307\u5B9A\u7684\u56DE\u8C03\u51FD\u6570\uFF1B
    //      \u8BE5\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u91CD\u8F7D\u65B9\u5F0F\uFF1A
    //      function (message, callback)
    //      function (title, message, callback)
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F39\u51FA\u7684\u6D88\u606F\u6846 easyui-window \u5BF9\u8C61
    $.messager.solicit = function (title, msg, fn) {
        var options = $.extend({}, (arguments.length == 2) ? { title: defaults.title, msg: arguments[0], fn: arguments[1] }
            : { title: arguments[0], msg: arguments[1], fn: arguments[2] });
        var win = $.messager.confirm(options.title, options.msg, options.fn), opts = win.window("options"), onClose = opts.onClose;
        opts.onClose = function () {
            if ($.isFunction(onClose)) { onClose.apply(this, arguments); }
            if ($.isFunction(options.fn)) { options.fn.call(this, undefined); }
        };
        var button = win.find(">div.messager-button").empty();
        $("<a></a>").linkbutton({ text: "\u662F" }).css("margin-left", "10px").click(function () {
            opts.onClose = onClose; win.window("close"); if ($.isFunction(options.fn)) { options.fn.call(this, true); }
        }).appendTo(button);
        $("<a></a>").linkbutton({ text: "\u5426" }).css("margin-left", "10px").click(function () {
            opts.onClose = onClose; win.window("close"); if ($.isFunction(options.fn)) { options.fn.call(this, false); }
        }).appendTo(button);
        $("<a></a>").linkbutton({ text: "\u53D6\u6D88" }).css("margin-left", "10px").click(function () {
            opts.onClose = onClose; win.window("close"); if ($.isFunction(options.fn)) { options.fn.call(this, undefined); }
        }).appendTo(button);
        return win;
    };

    //  \u91CD\u5199 $.messager.prompt \u65B9\u6CD5\uFF0C\u4F7F\u5176\u652F\u6301\u5982\u4E0B\u7684\u591A\u79CD\u91CD\u8F7D\u65B9\u5F0F\uFF1A
    //      function (callback)
    //      function (message, callback)
    //      function (title, message)
    //      function (title, message, callback)
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F39\u51FA\u7684\u6D88\u606F\u6846 easyui-window \u5BF9\u8C61
    $.messager.prompt = function (title, msg, fn) {
        if (arguments.length == 1) {
            return $.isFunction(arguments[0]) ? _prompt(defaults.title, defaults.prompt, arguments[0]) : _prompt(defaults.title, defaults.prompt);
        }
        if (arguments.length == 2) {
            return $.isFunction(arguments[1]) ? _prompt(defaults.title, arguments[0], arguments[1]) : _prompt(arguments[0], arguments[1]);
        }
        return _prompt.apply(this, arguments);
    };


    //  \u663E\u793A\u7C7B\u4F3C\u4E8E easyui-datagrid \u5728\u52A0\u8F7D\u8FDC\u7A0B\u6570\u636E\u65F6\u663E\u793A\u7684 mask \u72B6\u6001\u5C42\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u91CD\u8F7D\u65B9\u5F0F\uFF1A
    //      function ()
    //      function (options)\uFF0C\u5176\u4E2D options \u4E3A\u4E00\u4E2A\u683C\u5F0F\u4E3A { msg, locale, topMost } \u7684 JSON-Object\uFF1B
    //  \u4E0A\u8FF0\u53C2\u6570\u4E2D\uFF1A
    //      msg \u8868\u793A\u52A0\u8F7D\u663E\u793A\u7684\u6D88\u606F\u6587\u672C\u5185\u5BB9\uFF0C\u9ED8\u8BA4\u4E3A "\u6B63\u5728\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u7B49..."\uFF1B
    //      locale \u8868\u793A\u52A0\u8F7D\u7684\u533A\u57DF\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A jQuery \u5BF9\u8C61\u9009\u62E9\u5668\u5B57\u7B26\u4E32\uFF0C\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A jQuery \u5BF9\u8C61\u6216\u8005 HTML-DOM \u5BF9\u8C61\uFF1B\u9ED8\u8BA4\u4E3A\u5B57\u7B26\u4E32 "body"\u3002
    //      topMost \u4E3A\u4E00\u4E2A\u5E03\u5C14\u7C7B\u578B\u53C2\u6570\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8868\u793A\u662F\u5426\u5728\u9876\u7EA7\u9875\u9762\u52A0\u8F7D\u6B64 mask \u72B6\u6001\u5C42\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F39\u51FA\u7684\u6570\u636E\u52A0\u8F7D\u6846\u548C\u5C42\u7684 jQuery \u5BF9\u8C61\u3002
    coreEasyui.loading = function (options) {
        var opts = { msg: defaults.loading, locale: "body", topMost: false };
        $.extend(opts, options);
        var jq = opts.topMost ? $.util.$ : $, locale = jq.util.parseJquery(opts.locale), array = locale.children().map(function () {
            var zindex = $(this).css("z-index");
            return $.isNumeric(zindex) ? parseInt(zindex) : 0;
        }), zindex = $.array.max(array);
        locale.addClass("mask-container");
        var mask = jq("<div></div>").addClass("datagrid-mask").css({ display: "block", "z-index": ++zindex }).appendTo(locale);
        var msg = jq("<div></div>").addClass("datagrid-mask-msg").css({ display: "block", left: "50%", "z-index": ++zindex,height:"auto" }).html(opts.msg).appendTo(locale);
        msg.css("marginLeft", -msg.outerWidth() / 2);
        return mask.add(msg);
    };

    //  \u5173\u95ED\u7531 $.easyui.loading \u65B9\u6CD5\u663E\u793A\u7684 "\u6B63\u5728\u52A0\u8F7D..." \u72B6\u6001\u5C42\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u91CD\u8F7D\u65B9\u5F0F\uFF1A
    //      function ()
    //      function (locale)
    //      function (locale, topMost)
    //      function (topMost, locale)
    //      function (options)\uFF0C\u5176\u4E2D options \u4E3A\u4E00\u4E2A\u683C\u5F0F\u4E3A { locale, topMost } \u7684 JSON-Object
    coreEasyui.loaded = function (locale, topMost) {
        var opts = { locale: "body", topMost: false };
        if (arguments.length == 1) {
            if ($.isPlainObject(arguments[0])) {
                $.extend(opts, arguments[0]);
            } else if ($.util.isBoolean(arguments[0])) {
                opts.topMost = arguments[0];
            } else {
                opts.locale = arguments[0];
            }
        }
        if (arguments.length == 2) {
            if ($.util.isBoolean(arguments[0])) {
                $.extend(opts, { locale: arguments[1], topMost: arguments[0] });
            } else {
                $.extend(opts, { locale: arguments[0], topMost: arguments[1] });
            }
        }
        var jq = opts.topMost ? $.util.$ : $, locale = jq.util.parseJquery(opts.locale);
        locale.removeClass("mask-container");
        locale.children("div.datagrid-mask-msg,div.datagrid-mask").remove();
    };


    //  \u5907\u6CE8\uFF1A $.messager \u8868\u793A\u5F53\u524D\u9875\u9762\u7684 easyui-messager \u5BF9\u8C61\uFF1B
    //         $.easyui.messager \u8868\u793A\u53EF\u63A7\u9876\u7EA7\u9875\u9762\u7684 easyui-messager \u5BF9\u8C61\uFF1B


    //  \u66F4\u6539 jQuery EasyUI \u4E2D\u90E8\u5206\u63A7\u4EF6\u7684\u56FD\u9645\u5316\u8BED\u8A00\u663E\u793A\u3002
    $.extend($.fn.panel.defaults, { loadingMessage: defaults.loading });
    $.extend($.fn.window.defaults, { loadingMessage: defaults.loading });
    $.extend($.fn.dialog.defaults, { loadingMessage: defaults.loading });

    //  \u66F4\u6539 jeasyui-combo \u7EC4\u4EF6\u7684\u975E\u7A7A\u9A8C\u8BC1\u63D0\u9192\u6D88\u606F\u8BED\u8A00\u3002
    $.extend($.fn.combo.defaults, { missingMessage: $.fn.validatebox.defaults.missingMessage });



    //  \u83B7\u53D6\u6216\u66F4\u6539 jQuery EasyUI \u90E8\u5206\u7EC4\u4EF6\u7684\u901A\u7528\u9519\u8BEF\u63D0\u793A\u51FD\u6570\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u91CD\u8F7D\u65B9\u5F0F\uFF1A
    //      function():         \u83B7\u53D6 jQuery EasyUI \u90E8\u5206\u7EC4\u4EF6\u7684\u901A\u7528\u9519\u8BEF\u63D0\u793A\u51FD\u6570\uFF1B
    //      function(callback): \u66F4\u6539 jQuery EasyUI \u90E8\u5206\u7EC4\u4EF6\u7684\u901A\u7528\u9519\u8BEF\u63D0\u793A\u51FD\u6570\uFF1B
    //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u8BBE\u7F6E\u5982\u4E0B\u7EC4\u4EF6\u7684 onLoadError \u4E8B\u4EF6\uFF1B
    //          easyui-form
    //          easyui-combobox
    //          easyui-combotree
    //          easyui-combogrid
    //          easyui-datagrid
    //          easyui-propertygrid
    //          easyui-tree
    //          easyui-treegrid
    //      \u540C\u65F6\u8FD8\u4F1A\u8BBE\u7F6E jQuery-ajax \u7684\u901A\u7528\u9519\u8BEF\u4E8B\u4EF6 error\u3002
    coreEasyui.ajaxError = function (callback) {
        if (!arguments.length) { return $.fn.form.defaults.onLoadError; }
        $.fn.form.defaults.onLoadError = callback;
        $.fn.combobox.defaults.onLoadError = callback;
        $.fn.combotree.defaults.onLoadError = callback;
        $.fn.combogrid.defaults.onLoadError = callback;
        $.fn.datagrid.defaults.onLoadError = callback;
        $.fn.propertygrid.defaults.onLoadError = callback;
        $.fn.tree.defaults.onLoadError = callback;
        $.fn.treegrid.defaults.onLoadError = callback;
        $.ajaxSetup({ error: callback });
    };

    var onLoadError = function (XMLHttpRequest, textStatus, errorThrown) {
        $.messager.progress("close");
        if (coreEasyui.messager != $.messager) { coreEasyui.messager.progress("close"); }
        var msg = (XMLHttpRequest && !$.string.isNullOrWhiteSpace(XMLHttpRequest.responseText) ?
                "\u5982\u679C\u8BE5\u95EE\u9898\u91CD\u590D\u51FA\u73B0\uFF0C\u8BF7\u8054\u7CFB\u60A8\u7684\u7CFB\u7EDF\u7BA1\u7406\u5458\u5E76\u53CD\u9988\u8BE5\u6545\u969C\u3002<br />" +
                "\u9519\u8BEF\u53F7\uFF1A" + XMLHttpRequest.status + "(" + XMLHttpRequest.statusText + ")\uFF1B<hr />" + XMLHttpRequest.responseText :
                "\u7CFB\u7EDF\u51FA\u73B0\u4E86\u4E00\u4E2A\u672A\u6307\u660E\u7684\u9519\u8BEF\uFF0C\u5982\u679C\u8BE5\u95EE\u9898\u91CD\u590D\u51FA\u73B0\uFF0C\u8BF7\u8054\u7CFB\u60A8\u7684\u7CFB\u7EDF\u7BA1\u7406\u5458\u5E76\u53CD\u9988\u8BE5\u6545\u969C\u3002");
        var win = coreEasyui.messager.alert("\u9519\u8BEF\u63D0\u9192", msg, "error"),
            opts = win.window("options"), panel = win.window("panel"), width =900;  height = panel.outerHeight();
        if (width > 800 || height > 800) { win.window("resize", { width: width > 800 ? 800 : width, height: height > 800 ? 800 : height }); }
        win.window("center");
    };//panel.outerWidth(),

    //  \u66F4\u6539 jQuery EasyUI \u90E8\u5206\u7EC4\u4EF6\u7684\u901A\u7528\u9519\u8BEF\u63D0\u793A\u3002
    //coreEasyui.ajaxError(onLoadError);

    //  \u66F4\u6539 jQuery.ajax \u51FD\u6570\u7684\u90E8\u5206\u9ED8\u8BA4\u5C5E\u6027\u3002
    $.ajaxSetup({
        dataFilter: function (data, type) {
            return $.util.isString(type) && type.toLowerCase(type) == "json" ? $.string.toJSONString(data) : data;
        }
    });


    //  \u5224\u65AD\u5F53\u524D jQuery \u5BF9\u8C61\u662F\u5426\u662F\u6307\u5B9A\u540D\u79F0\u7684\u5DF2\u7ECF\u521D\u59CB\u5316\u597D\u7684 easyui \u63D2\u4EF6\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      pluginName\uFF1A\u8981\u5224\u65AD\u7684\u63D2\u4EF6\u540D\u79F0\uFF0C\u4F8B\u5982 "panel"、"dialog"、"datagrid" \u7B49\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D jQuery \u5BF9\u8C61\u4E2D\u7684\u7B2C\u4E00\u4E2A DOM \u5143\u7D20\u4E3A pluginName \u53C2\u6570\u6240\u793A\u7684 easyui \u63D2\u4EF6\u4E14\u5DF2\u7ECF\u88AB\u521D\u59CB\u5316\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
    coreJquery.fn.isEasyUI = function (pluginName) {
        if (!$.array.contains($.parser.plugins, pluginName)) { $.error($.string.format("\u4F20\u5165\u7684\u53C2\u6570 pluginName: {0} \u4E0D\u662F easyui \u63D2\u4EF6\u540D\u3002")); }
        if (!this.length) { return false; }
        var state = $.data(this[0], pluginName);
        return state && state.options ? true : false;
    };

    //  \u5224\u65AD\u5F53\u524D jQuery \u5BF9\u8C61\u662F\u5426\u662F\u6307\u5B9A\u540D\u79F0\u7684\u5DF2\u7ECF\u521D\u59CB\u5316\u597D\u7684 easyui \u63D2\u4EF6\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      selector:   jQuery \u5BF9\u8C61\u9009\u62E9\u5668\uFF0C\u6216\u8005 DOM \u5BF9\u8C61\uFF0C\u6216\u8005 jQuery \u5BF9\u8C61\u5747\u53EF\uFF1B
    //      pluginName\uFF1A\u8981\u5224\u65AD\u7684\u63D2\u4EF6\u540D\u79F0\uFF0C\u4F8B\u5982 "panel"、"dialog"、"datagrid" \u7B49\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C selector \u6240\u8868\u793A\u7684 jQuery \u5BF9\u8C61\u4E2D\u7684\u7B2C\u4E00\u4E2A DOM \u5143\u7D20\u4E3A pluginName \u53C2\u6570\u6240\u793A\u7684 easyui \u63D2\u4EF6\u4E14\u5DF2\u7ECF\u88AB\u521D\u59CB\u5316\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
    coreEasyui.isEasyUI = function (selector, pluginName) {
        return $.util.parseJquery(selector).isEasyUI(pluginName);
    };



    coreJquery.fn.currentPagination = function () {
        var p = this.closest(".pagination");
        while (p.length && !$.data(p[0], "pagination")) { p = p.parent().closest(".pagination"); }
        return p;
    };

    coreJquery.fn.currentProgressbar = function () {
        var p = this.closest(".progressbar");
        while (p.length && !$.data(p[0], "progressbar")) { p = p.parent().closest(".progressbar"); }
        return p;
    };

    coreJquery.fn.currentPanel = function () {
        var p = this.closest(".panel-body");
        while (p.length && !$.data(p[0], "panel")) { p = p.parent().closest(".panel-body"); }
        return p;
    };

    coreJquery.fn.currentTabPanel = function () {
        var p = this.closest(".panel-body"), panel = p.parent(), panels = panel.parent(), container = panels.parent();
        while (p.length && !($.data(p[0], "panel") && panel.hasClass("panel") && panels.hasClass("tabs-panels") && container.hasClass("tabs-container"))) {
            p = p.parent().closest(".panel-body");
            panel = p.parent();
            panels = panel.parent();
            container = panels.parent();
        }
        return p;
    };

    coreJquery.fn.currentTabIndex = function () {
        var panel = this.currentTabPanel();
        return panel.length ? panel.panel("panel").index() : -1;
    };

    coreJquery.fn.currentTabs = function () {
        var p = this.closest(".tabs-container");
        while (p.length && !$.data(p[0], "tabs")) { p = p.parent().closest(".tabs-container"); }
        return p;
    };

    coreJquery.fn.currentAccordion = function () {
        var p = this.closest(".accordion");
        while (p.length && !$.data(p[0], "accordion")) { p = p.parent().closest(".accordion"); }
        return p;
    };

    coreJquery.fn.currentAccPanel = function () {
        var p = this.closest(".panel-body"), panel = p.parent(), container = panels.parent();
        while (p.length && !($.data(p[0], "panel") && panel.hasClass("panel") && container.hasClass("accordion") && $.data(container[0], "accordion"))) {
            p = p.parent().closest(".panel-body");
            panel = p.parent();
            container = panels.parent();
        }
        return p;
    };

    coreJquery.fn.currentLayout = function () {
        var layout = this.closest(".layout");
        while (layout.length && !$.data(layout[0], "layout")) { layout = layout.closest(".layout"); }
        return layout;
    };

    coreJquery.fn.currentRegion = function () {
        var p = this.closest(".panel.layout-panel"), layout = p.parent(), body = p.children(".panel-body");
        while (p.length && !(layout.hasClass("layout") && $.data(body[0], "panel"))) {
            p = p.parent().closest(".panel.layout-panel");
            layout = p.parent();
            body = p.children(".panel-body");
        }
        return body;
    };

    coreJquery.fn.currentLinkbutton = function () {
        var btn = this.closest(".l-btn");
        while (btn.length && !$.data(btn[0], "linkbutton")) { btn = btn.parent().closest(".layout"); }
        return btn;
    };

    coreJquery.fn.currentCalendar = function () {
        var c = this.closest(".calendar");
        while (c.length && !$.data(c[0], "calendar")) { c = c.parent().closest(".calendar"); }
        return c;
    };

    coreJquery.fn.currentWindow = function () {
        var p = this.closest(".panel-body.window-body");
        while (p.length && !$.data(p[0], "window")) { p = c.parent().closest(".panel-body.window-body"); }
        return p;
    };

    coreJquery.fn.currentDialog = function () {
        var p = this.closest(".panel-body.window-body");
        while (p.length && !$.data(p[0], "dialog")) { p = c.parent().closest(".panel-body.window-body"); }
        return p;
    };

    coreJquery.fn.currentDatagrid = function () {
        var p = this.closest(".datagrid-wrap.panel-body"), dg = p.find(">.datagrid-view>eq(2)");
        while (p.length && !$.data(dg[0], "datagrid")) {
            p = p.parent().closest(".datagrid-wrap.panel-body");
            dg = p.find(">.datagrid-view>eq(2)");
        }
        return dg;
    };

    coreJquery.fn.currentPropertygrid = function () {
        var p = this.closest(".datagrid-wrap.panel-body"), pg = p.find(">.datagrid-view>eq(2)");
        while (p.length && !$.data(pg[0], "propertygrid")) {
            p = p.parent().closest(".datagrid-wrap.panel-body");
            pg = p.find(">.datagrid-view>eq(2)");
        }
        return pg;
    };

    coreJquery.fn.currentTree = function () {
        var t = this.closest(".tree");
        while (t.length && !$.data(t[0], "tree")) { t = t.parent().closest(".tree"); }
        return t;
    };

    coreJquery.fn.currentTreegrid = function () {
        var p = this.closest(".datagrid-wrap.panel-body"), tg = p.find(">.datagrid-view>eq(2)");
        while (p.length && !$.data(tg[0], "treegrid")) {
            p = p.parent().closest(".datagrid-wrap.panel-body");
            tg = p.find(">.datagrid-view>eq(2)");
        }
        return tg;
    };



    $.union(coreJquery);
    $.fn.union(coreJquery.fn);

    var css =
        ".mask-container { position: relative; }";
    $.util.addCss(css);
})(jQuery);