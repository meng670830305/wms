/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI dialog Extensions 1.0 beta
* jQuery EasyUI dialog \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.dialog.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-09-02
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*   3、jeasyui.extensions.menu.js v1.0 beta late
*   4、jeasyui.extensions.panel.js v1.0 beta late
*   5、jeasyui.extensions.window.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/

/*
\u529F\u80FD\u8BF4\u660E\uFF1A
*/

(function ($, undefined) {


    $.fn.dialog.extensions = {};



    var easyui = $.util.$.easyui ? $.util.$.easyui : $.easyui,
        cache = easyui.frameMapCache ? easyui.frameMapCache : easyui.frameMapCache = [];

    function resetCache(iframe) {
        var array = $.array.filter(cache, function (val) { return val.current == iframe; }), l = array.length;
        while (l--) { $.array.remove(cache, array[l]); };
    };

    var getParent = function () {
        var current = $.util.currentFrame;
        if (!current) { return $.util.top; }
        var p = $.array.first(cache, function (val) { return val.current == current; });
        return (p && p.parent && p.parent.contentWindow) ? p.parent.contentWindow : $.util.parent;
    };
    //  \u8BE5\u5C5E\u6027\u4EC5\u53EF\u4EE5\u5728\u901A\u8FC7 $.easyui.showDialog \u6253\u5F00\u7684 easyui-dialog \u4E2D\u7684 iframe \u4E2D\u4F7F\u7528\uFF1B
    //  \u8BE5\u5C5E\u6027\u8868\u793A\u7236\u7EA7\u9875\u9762\u7684 window \u5BF9\u8C61\u3002
    $.easyui.parent = getParent();

    //  \u8BE5\u65B9\u6CD5\u4EC5\u53EF\u4EE5\u5728\u901A\u8FC7 $.easyui.showDialog \u6253\u5F00\u7684 easyui-dialog \u4E2D\u7684 iframe \u4E2D\u4F7F\u7528\uFF1B
    //  \u5173\u95ED\u5F53\u524D\u9875\u9762\u6240\u5728\u7684 easyui-dialog \u7A97\u4F53\u3002
    $.easyui.parent.closeDialog = $.easyui.closeCurrentDialog = function () {
        if ($.util.isTopMost) { return; }
        $.easyui.parent.$($.util.currentFrame).closest("div.window-body").dialog("close");
    };

    $.easyui._showDialog = function (opts, currentFrame) {
        if (opts.onApply == null || opts.onApply == undefined) { opts.onApply = opts.onSave; }
        if (opts.onSave == null || opts.onSave == undefined) { opts.onSave = opts.onApply; }

        var _onClose = opts.onClose;
        opts.onClose = function () {
            if ($.isFunction(_onClose)) { _onClose.apply(this, arguments); }
            if (opts.autoDestroy) {
                $(this).dialog("destroy");
            }
        };

        var _onBeforeDestroy = opts.onBeforeDestroy;
        opts.onBeforeDestroy = function () {
            if (opts.iniframe) {
                var iframe = $(this).dialog("iframe");
                resetCache(iframe[0]);
            }
            if ($.isFunction(_onBeforeDestroy)) { _onBeforeDestroy.apply(this, arguments); }
        };

        if (opts.locale) { opts.inline = true; }
        var dialog = $("<div></div>").appendTo(opts.locale ? opts.locale : "body");

        if (!$.util.likeArray(opts.toolbar)) { opts.toolbar = []; }
        if ($.isArray(opts.toolbar)) {
            $.each(opts.toolbar, function () {
                var handler = this.handler;
                if ($.isFunction(handler)) { this.handler = function () { handler.call(dialog, dialog); }; }
            });
            if (!opts.toolbar.length) { opts.toolbar = null; }
        }

        var buttons = [];
        if (opts.enableApplyButton == true) {
            var btnApply = { text: opts.applyButtonText, iconCls: opts.applyButtonIconCls,
                handler: function (dia) {
                    if ($.isFunction(opts.onApply)) { opts.onApply.call(dia, dia); }
                }
            };
            buttons.push(btnApply);
        }
        if (opts.enableSaveButton == true) {
            var btnSave = { text: opts.saveButtonText, iconCls: opts.saveButtonIconCls,
                handler: function (dia) {
                    var isFunc = $.isFunction(opts.onSave);
                    if (!isFunc || isFunc && opts.onSave.call(dia, dia) !== false) { dia.dialog("close"); }
                }
            };
            buttons.push(btnSave);
        }
        if (opts.enableCloseButton == true) {
            var btnClose = { text: opts.closeButtonText, iconCls: opts.closeButtonIconCls,
                handler: function (dia) { dia.dialog("close"); }
            };
            buttons.push(btnClose);
        }
        if (!$.util.likeArray(opts.buttons) || $.util.isString(opts.buttons)) { opts.buttons = []; }
        $.array.merge(opts.buttons, buttons);
        $.each(opts.buttons, function () {
            var handler = this.handler;
            if ($.isFunction(handler)) { this.handler = function () { handler.call(dialog, dialog); }; }
        });
        if (!opts.buttons.length) { opts.buttons = null; }

        opts = dialog.dialog(opts).dialog("options");

        var buttonbar = dialog.dialog("body").children(".dialog-button").each(function () {
            var color = dialog.css("border-bottom-color");
            $(this).addClass("calendar-header").css({ "height": "auto", "border-top-color": color });
        });
        if (!opts.iniframe) {
            if (opts.href) {
                var toolbuttons = dialog.dialog("header").find(".panel-tool a"), bottombuttons = buttonbar.children("a");
                toolbuttons.attr("disabled", "disabled");
                bottombuttons.linkbutton("disable");
                var onLoad = opts.onLoad;
                opts.onLoad = function () {
                    if ($.isFunction(onLoad)) { onLoad.apply(this, arguments); }
                    $.util.exec(function () {
                        toolbuttons.removeAttr("disabled");
                        bottombuttons.linkbutton("enable");
                    });
                };
            }
        }
        var iframe = dialog.dialog("iframe");
        if (iframe.length) {
            //fix[\u5B59\u4EAE]:\u4FEE\u590D\u51FA\u73B0\u6EDA\u52A8\u6761\u9519\u8BEF
            $(iframe[0]).height("99%");
            //end fix
            cache.push({ current: iframe[0], parent: currentFrame });
        }
        return dialog;
    };

    //  \u4EE5 easyui-dialog \u65B9\u6CD5\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u7A97\u53E3\u7684\u9876\u7EA7(\u53EF\u8BBF\u95EE)\u7A97\u4F53\u4E2D\u5F39\u51FA\u5BF9\u8BDD\u6846\u7A97\u53E3\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      options:    \u4E00\u4E2A JSON Object\uFF0C\u5177\u4F53\u683C\u5F0F\u53C2\u8003 easyui-dialog \u5B98\u65B9 api \u4E2D\u7684\u5C5E\u6027\u5217\u8868\u3002
    //          \u8BE5\u53C2\u6570\u5728 easyui-dialog \u5B98\u65B9 api \u6240\u6709\u539F\u5C5E\u6027\u5217\u8868\u57FA\u7840\u4E0A\uFF0C\u589E\u52A0\u5982\u4E0B\u5C5E\u6027\uFF1A
    //          iniframe:
    //          enableSaveButton:
    //          enableApplyButton:
    //          enableCloseButton:
    //          onSave:
    //          onClose:
    //          saveButtonText:
    //          applyButtonText:
    //          closeButtonText:
    //          saveButtonIconCls:
    //          applyButtonIconCls:
    //          closeButtonIconCls:
    //  \u5907\u6CE8\uFF1A
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F39\u51FA\u7684 easyui-dialog \u7684 jQuery \u5BF9\u8C61\u3002
    $.easyui.showDialog = function (options) {
        var opts = $.extend({}, $.easyui.showDialog.defaults, options);
        if (opts.locale) { opts.topMost = false; }
        var currentFrame = $.util.currentFrame, fn = opts.topMost ? $.util.$.easyui._showDialog : $.easyui._showDialog;
        return fn(opts, currentFrame);
    };

    

    //  \u901A\u8FC7\u8C03\u7528 $.easyui.showDialog \u65B9\u6CD5\uFF0C\u4EE5 easyui-dialog \u7684\u65B9\u5F0F\u663E\u793A\u4E00\u4E2A JSON - Object \u5BF9\u8C61\u7684\u6240\u6709\u5C5E\u6027\u503C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      options:    \u9700\u8981\u663E\u793A\u7684 JSON - Object\uFF1B
    //      dialogOption:  \u8BE5\u53C2\u6570\u53EF\u9009\uFF0C\u8868\u793A\u8981\u6253\u5F00\u7684 easyui-dialog \u7684 options\u3002
    //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u4E00\u822C\u7528\u4E8E\u5BF9\u8C61\u503C\u663E\u793A\uFF0C\u4F8B\u5982\u53EF\u4EE5\u7528\u4E8E\u9879\u76EE\u5F00\u53D1\u8FC7\u7A0B\u4E2D\u7684\u53C2\u6570\u663E\u793A\u8C03\u8BD5\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F39\u51FA\u7684 easyui-dialog \u7684 jQuery \u5BF9\u8C61\u3002
    $.easyui.showOption = function (options, dialogOption) {
        options = options || "\u65E0\u6570\u636E\u663E\u793A\u3002";
        dialogOption = dialogOption || {};
        var opts = $.extend({ topMost: $.easyui.showDialog.defaults.topMost }, dialogOption), jq = opts.topMost ? $.util.$ : $;
        var content = jq("<table></table>").css({ padding: "10px", width: "100%" }), type = jq.type(options);
        if ($.array.contains(["array", "object", "function"], type)) {
            for (var key in options) {
                content.append("<tr><td style='text-align: right; width: 100px;'>" + key + ":</td><td>" + options[key] + "</td></tr>");
            }
        } else {
            content.append("<tr><td style='text-align: right; width: 100px;'>options:</td><td>" + String(options) + "</td></tr>");
        }
        $.extend(opts, {
            title: "\u663E\u793A options \u503C",
            width: 480,
            height: 260,
            content: content,
            autoVCenter: false,
            autoHCenter: false,
            enableSaveButton: false,
            enableApplyButton: false
        });
        return $.easyui.showDialog(opts);
    };






    var _refresh = $.fn.dialog.methods.refresh;
    function refresh(target, href) {
        var dia = $.util.parseJquery(target), opts = dia.dialog("options"), panel = dia.dialog("contentPanel"), panelOpts = panel.panel("options");
        href = href ? opts.href = href : opts.href;
        panelOpts.iniframe = opts.iniframe;
        panel.panel("refresh", href);
    };

    function getContentPanel(target) {
        var state = $.data(target, "dialog");
        return state ? state.contentPanel : null;
    };

    function getIframe(target) {
        var panel = getContentPanel(target);
        return panel.panel("iframe");
    };

    function parseExtensionsBegin(options) {
        options._extensionsDialog = { href: options.href, content: options.content, iniframe: options.iniframe };
        if (!options.iniframe) { return; }
        options.href = null;
        options.content = null;
        options.iniframe = false;
    };
    function parseExtensionsEnd(target) {
        var d = $.util.parseJquery(target), opts = d.dialog("options"), exts = opts._extensionsDialog ? opts._extensionsDialog
            : opts._extensionsDialog = { href: opts.href, content: opts.content, iniframe: opts.iniframe };
        opts.href = exts.href; opts.content = exts.content; opts.iniframe = exts.iniframe;
        if (opts.iniframe) { refresh(target, opts.href); }
    };

    var _dialog = $.fn.dialog;
    $.fn.dialog = function (options, param) {
        if (typeof options == "string") { return _dialog.apply(this, arguments); }
        options = options || {};
        return this.each(function () {
            var jq = $.util.parseJquery(this), opts = $.extend({}, $.fn.dialog.parseOptions(this), options);
            parseExtensionsBegin(opts);
            _dialog.call(jq, opts);
            parseExtensionsEnd(this);
        });
    };
    $.union($.fn.dialog, _dialog);


    var methods = $.fn.dialog.extensions.methods = {
        //  \u4FEE\u590D easyui-dialog \u7EC4\u4EF6\u7684 options \u65B9\u6CD5\u8FD4\u56DE\u7684 width \u548C height \u5C5E\u6027\u4E0D\u6B63\u786E\u7684 BUG
        options: function (jq) {
            var state = $.data(jq[0], "dialog"), opts = state.options,
                pp = jq.panel("options");
            $.extend(opts, {
                closed: pp.closed, collapsed: pp.collapsed, minimized: pp.minimized, maximized: pp.maximized,
                width: pp.width, height: pp.height
            });
            return opts;
        },

        //  \u6269\u5C55 easyui-dialog \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u5F53\u524D easyui-dialog \u63A7\u4EF6\u7684\u5185\u5BB9\u9762\u677F panel \u5BF9\u8C61\u3002
        contentPanel: function (jq) { return getContentPanel(jq[0]); },

        //  \u91CD\u5199 easyui-panel \u63A7\u4EF6\u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5 iframe\uFF1B\u83B7\u53D6\u5F53\u524D easyui-dialog \u63A7\u4EF6\u5185\u5BB9\u9762\u677F panel \u5BF9\u8C61\u4E2D\u7684 iframe \u5BF9\u8C61\u3002
        //  \u5907\u6CE8\uFF1A\u5982\u679C inirame: false\uFF0C\u5219\u8BE5\u65B9\u6CD5\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u7684 jQuery \u5BF9\u8C61\u3002
        iframe: function (jq) { return getIframe(jq[0]); },

        //  \u91CD\u5199 easyui-dialog \u63A7\u4EF6\u7684 refresh \u65B9\u6CD5\uFF0C\u7528\u4E8E\u652F\u6301 iniframe \u5C5E\u6027\u3002
        refresh: function (jq, href) { return jq.each(function () { refresh(this, href); }); }
    };
    var defaults = $.fn.dialog.extensions.defaults = $.extend({}, $.fn.window.extensions.defaults, {});

    $.extend($.fn.dialog.defaults, defaults);
    $.extend($.fn.dialog.methods, methods);



    //  \u5B9A\u4E49 $.easyui.showDialog \u65B9\u6CD5\u6253\u5F00 easyui-dialog \u7A97\u4F53\u7684\u9ED8\u8BA4\u5C5E\u6027\u3002
    //  \u5907\u6CE8\uFF1A\u8BE5\u9ED8\u8BA4\u5C5E\u6027\u5B9A\u4E49\u4EC5\u5728\u65B9\u6CD5 $.easyui.showDialog \u4E2D\u88AB\u8C03\u7528\u3002
    $.easyui.showDialog.defaults = {
        title: "\u65B0\u5EFA\u5BF9\u8BDD\u6846",
        iconCls: "icon-standard-application-form",
        width: 600,
        height: 360,
        modal: true,
        collapsible: false,
        maximizable: false,
        closable: true,
        draggable: true,
        resizable: true,
        shadow: true,
        minimizable: false,

        href: null,

        //  \u8868\u793A\u5F39\u51FA\u7684 easyui-dialog \u7A97\u4F53\u662F\u5426\u5728\u5173\u95ED\u65F6\u81EA\u52A8\u9500\u6BC1\u5E76\u91CA\u653E\u6D4F\u89C8\u5668\u8D44\u6E90\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        autoDestroy: true,

        //  \u8868\u793A\u5C06\u8981\u6253\u5F00\u7684 easyui-dialog \u7684\u7236\u7EA7\u5BB9\u5668\uFF1B\u53EF\u4EE5\u662F\u4E00\u4E2A\u8868\u793A jQuery \u5143\u7D20\u9009\u62E9\u5668\u7684\u8868\u8FBE\u5F0F\u5B57\u7B26\u4E32\uFF0C\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A html-dom \u6216 jQuery-dom \u5BF9\u8C61\u3002
        //  \u6CE8\u610F\uFF1A\u5982\u679C\u8BBE\u7F6E\u4E86\u8BE5\u53C2\u6570\uFF0C\u5219 topMost \u5C5E\u6027\u5C06\u81EA\u52A8\u8BBE\u7F6E\u4E3A false\u3002
        //      \u5982\u679C\u4E3A null \u6216\u8005 undefined \u5219\u8868\u793A\u7236\u7EA7\u5BB9\u5668\u4E3A body \u6807\u7B7E\u3002
        locale: null,

        //  \u662F\u5426\u5728\u9876\u7EA7\u7A97\u53E3\u6253\u5F00\u6B64 easyui-dialog \u7EC4\u4EF6\u3002
        topMost: false,

        //  \u662F\u5426\u5728iframe\u52A0\u8F7D\u8FDC\u7A0B href \u9875\u9762\u6570\u636E
        iniframe: false,

        //  \u662F\u5426\u542F\u7528\u4FDD\u5B58\u6309\u94AE\uFF0C\u4FDD\u5B58\u6309\u94AE\u70B9\u51FB\u540E\u4F1A\u5173\u95ED\u6A21\u5F0F\u5BF9\u8BDD\u6846
        enableSaveButton: true,

        //  \u662F\u5426\u542F\u7528\u5E94\u7528\u6309\u94AE
        enableApplyButton: true,

        //  \u662F\u5426\u542F\u7528\u5173\u95ED\u6309\u94AE
        enableCloseButton: true,

        //  \u70B9\u51FB\u4FDD\u5B58\u6309\u94AE\u89E6\u53D1\u7684\u4E8B\u4EF6\uFF0C\u5982\u679C\u8BE5\u4E8B\u4EF6\u8303\u56F4 false\uFF0C\u5219\u70B9\u51FB\u4FDD\u5B58\u540E\u7A97\u53E3\u4E0D\u5173\u95ED\u3002
        onSave: null,

        //  \u70B9\u51FB\u5E94\u7528\u6309\u94AE\u89E6\u53D1\u7684\u4E8B\u4EF6
        onApply: null,

        //  \u5173\u95ED\u7A97\u53E3\u65F6\u5E94\u89E6\u53D1\u7684\u4E8B\u4EF6\uFF0Ceasyui-dialog\u672C\u8EAB\u5C31\u6709
        onClose: null,

        //  \u4FDD\u5B58\u6309\u94AE\u7684\u6587\u5B57\u5185\u5BB9
        saveButtonText: "\u4FDD\u5B58",

        //  \u5E94\u7528\u6309\u94AE\u7684\u6587\u5B57\u5185\u5BB9
        applyButtonText: "\u5E94\u7528",

        //  \u5173\u95ED\u6309\u94AE\u7684\u6587\u5B57\u5185\u5BB9
        closeButtonText: "\u5173\u95ED",

        //  \u4FDD\u5B58\u6309\u94AE\u7684\u56FE\u6807\u6837\u5F0F
        saveButtonIconCls: "icon-save",

        //  \u5E94\u7528\u6309\u94AE\u7684\u56FE\u6807\u6837\u5F0F
        applyButtonIconCls: "icon-ok",

        //  \u5173\u95ED\u6309\u94AE\u7684\u56FE\u6807\u6837\u5F0F
        closeButtonIconCls: "icon-close"
    };



})(jQuery);