/**
* jQuery EasyUI 1.3.4
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI toolbar Plugin Extensions 1.0 beta
* jQuery EasyUI toolbar \u63D2\u4EF6\u6269\u5C55
* jeasyui.plugins.toolbar.js
* \u4E8C\u6B21\u5F00\u53D1 \u6D41\u4E91
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-10-31
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    function initialize(target) {
        var t = $(target), isDiv = /^(?:div)$/i.test(target.nodeName),
            toolbar = isDiv ? t : $("<div></div>").insertAfter(t);
        if (!isDiv) {
            toolbar.attr({ "class": t.attr("class"), "style": t.attr("style") }).removeClass("easyui-toolbar");
            t.children().each(function () { toolbar[0].appendChild(this); });
            t.hide();
        }
        var state = $.data(target, "toolbar"), opts = state.options;
        state.toolbar = toolbar;
        t.addClass("toolbar-f");
        toolbar.addClass("dialog-toolbar toolbar");
        wrapItems(target);
        setSize(target, { width: opts.width, height: opts.height });
        toolbar.bind("_resize", function () {
            setSize(target);
        });
    };

    function wrapItems(target) {
        var t = $(target), state = $.data(target, "toolbar"),
            toolbar = state.toolbar, opts = state.options,
            cc = toolbar.children();
        state.wrapper = $("<table class='toolbar-wrapper' cellspacing='0' cellpadding='0' ></table>").appendTo(toolbar);
        appendItem(target, cc);
    };

    function setSize(target, size) {
        var t = $(target), state = $.data(target, "toolbar"),
            toolbar = state.toolbar, opts = state.options;
        size = $.extend({ width: opts.width, height: opts.height }, size || {});
        toolbar.css({
            width: size.width, height: size.height
        });
        $.extend(opts, size);
        $.util.exec(function () {
            setAlign(target, opts.align);
            setValign(target, opts.valign);
        });
        opts.onResize.call(target, $.isNumeric(size.width) ? size.width : toolbar.width(), $.isNumeric(size.height) ? size.height : toolbar.height());
    };

    function setAlign(target, align) {
        var t = $(target), state = $.data(target, "toolbar"),
            wrapper = state.wrapper, opts = state.options, left = 0;
        opts.align = align;
        wrapper.removeClass("toolbar-align-left toolbar-align-center toolbar-align-right");
        wrapper.addClass("toolbar-align-" + align);
        if (align == "center") {
            var toolbar = state.toolbar, tWidth = toolbar.width(), width = wrapper.width();
            left = Math.max((tWidth - width) / 2, 0);
        }
        wrapper.css("left", left);
    };

    function setValign(target, valign) {
        var t = $(target), state = $.data(target, "toolbar"),
            toolbar = state.toolbar, wrapper = state.wrapper, opts = state.options,
            tHeight = toolbar.height(), height = wrapper.height(), top;
        opts.valign = valign;
        switch (valign) {
            case "top": top = 0; break;
            case "middle": top = (tHeight - height) / 2; break;
            case "bottom": top = tHeight - height; break;
        }
        wrapper.css("top", Math.max(top, 0));
    };


    var itemTypes = {
        separator: {
            init: function (container) {
                return $("<div class='dialog-tool-separator'></div>").appendTo(container);
            }
        },
        label: {
            defaults: { text: " " },
            init: function (container, options) {
                var opts = $.extend({}, this.defaults, options || {});
                return $("<span class='toolbar-item-label'></span>").text(opts.text).appendTo(container);
            }
        },
        button: {
            defaults: { plain: true, iconCls: "icon-ok" },
            init: function (container, options) {
                var opts = $.extend({}, this.defaults, options || {}),
                    fn = $.isFunction(opts.onclick) ? opts.onclick : ($.isFunction(opts.handler) ? opts.handler : null),
                    btn = $("<a class='toolbar-item-button'></a>").appendTo(container).linkbutton(opts);
                if ($.isFunction(fn)) { btn.click(function () { fn.call(this, container); }); }
                return btn;
            },
            enable: function (target) {
                $(target).linkbutton("enable");
            },
            disable: function (target) {
                $(target).linkbutton("disable");
            }
        },
        textbox: {
            defaults: { value: null, disabled: false, width: null },
            init: function (container, options) {
                var opts = $.extend({}, this.defaults, options || {}),
                    box = $("<input type='text' class='toolbar-item-input' />").appendTo(container);
                if (opts.value) { this.setValue(box[0], opts.value); }
                if (opts.disabled) { this.disable(box[0]); }
                if (opts.width) { this.resize(box[0], opts.width); }
                return box;
            },
            setValue: function (target, value) {
                $(target).val(value);
            },
            getValue: function (target) {
                return $(target).val();
            },
            resize: function (target, width) {
                $(target)._outerWidth(width);
            },
            enable: function (target) {
                $(target).attr("disabled", true);
            },
            disable: function (target) {
                $(target).removeAttr("disabled", true);
            }
        },
        checkbox: {
            defaults: { checked: false, disabled: false, text: " " },
            init: function (container, options) {
                options = options || {};
                var opts = $.extend({}, this.defaults, $.util.isString(options) ? { text: options} : options),
                    label = $("<label class='toolbar-item-checkbox'></label>").appendTo(container),
                    box = $("<input type='checkbox' class='toolbar-item-checkbox-input' />").appendTo(label),
                    span = $("<span class='toolbar-item-checkbox-text'></span>").text(opts.text).appendTo(label);
                if (opts.checked) { this.setValue(box[0], opts.checked); }
                if (opts.disabled) { this.disable(box[0]); }
                return box;
            },
            setValue: function (target, value) {
                $(target).attr("checked", value ? true : false);
            },
            getValue: function (target) {
                return $(target)[0].checked;
            },
            enable: function (target) {
                var box = $(target), label = box.parent();
                box.removeAttr("disabled");
                label.find(">span.toolbar-item-checkbox-text").removeClass("toolbar-item-checkbox-disabled");
            },
            disable: function (target) {
                var box = $(target), label = box.parent();
                box.attr("disabled", true);
                label.find(">span.toolbar-item-checkbox-text").addClass("toolbar-item-checkbox-disabled");
            }
        },
        validatebox: {
            defaults: { value: null, disabled: false, width: null },
            init: function (container, options) {
                var opts = $.extend({}, this.defaults, options || {}),
                    box = $("<input type='text' class='toolbar-item-input' />").appendTo(container).validatebox(opts);
                if (opts.value) { this.setValue(box[0], opts.value); }
                if (opts.disabled) { this.disable(box[0]); }
                if (opts.width) { this.resize(box[0], opts.width); }
                return box;
            },
            setValue: function (target, value) {
                $(target).val(value);
            },
            getValue: function (target) {
                return $(target).val();
            },
            resize: function (target, width) {
                $(target)._outerWidth(width);
            },
            enable: function (target) {
                $(target).removeAttr("disabled");
            },
            disable: function (target) {
                $(target).attr("disabled", true);
            }
        },
        numberbox: {
            defaults: { width: null },
            init: function (container, options) {
                var box = $("<input type='text' class='toolbar-item-input' />").appendTo(container).numberbox(options);
                if (options.width) { this.resize(box[0], options.width); }
                return box;
            },
            destroy: function (target) {
                $(target).numberbox("destroy");
            },
            setValue: function (target, value) {
                $(target).numberbox("setValue", value);
            },
            getValue: function (target) {
                return $(target).numberbox("getValue");
            },
            resize: function (target, width) {
                $(target)._outerWidth(width);
            },
            enable: function (target) {
                $(target).numberbox("enable");
            },
            disable: function (target) {
                $(target).numberbox("disable");
            }
        },
        datebox: {
            defaults: {},
            init: function (container, options) {
                var opts = $.extend({}, this.defaults, options || {}),
                    box = $("<input type='text' class='toolbar-item-input' />").appendTo(container).datebox(opts);
                return box;
            },
            destroy: function (target) {
                $(target).datebox("destroy");
            },
            setValue: function (target, value) {
                $(target).datebox("setValue", value);
            },
            getValue: function (target) {
                return $(target).datebox("getValue");
            },
            resize: function (target, width) {
                $(target).datebox("resize", width);
            },
            enable: function (target) {
                $(target).datebox("enable");
            },
            disable: function (target) {
                $(target).datebox("disable");
            }
        },
        combobox: {
            defaults: {},
            init: function (container, options) {
                var opts = $.extend({}, this.defaults, options || {}),
                    box = $("<input type='text' class='toolbar-item-input' />").appendTo(container).combobox(opts);
                return box;
            },
            destroy: function (target) {
                $(target).combobox("destroy");
            },
            setValue: function (target, value) {
                $(target).combobox($.isArray(value) ? "setValues" : "setValue", value);
            },
            getValue: function (target) {
                var combo = $(target), opts = combo.combobox("options");
                return $(target).combobox(opts.multiples ? "getValues" : "getValue");
            },
            resize: function (target, width) {
                $(target).combobox("resize", width);
            },
            enable: function (target) {
                $(target).combobox("enable");
            },
            disable: function (target) {
                $(target).combobox("disable");
            }
        },
        combotree: {
            defaults: {},
            init: function (container, options) {
                var opts = $.extend({}, this.defaults, options || {}),
                    box = $("<input type='text' class='toolbar-item-input' />").appendTo(container).combotree(opts);
                return box;
            },
            destroy: function (target) {
                $(target).combotree("destroy");
            },
            setValue: function (target, value) {
                $(target).combotree($.isArray(value) ? "setValues" : "setValue", value);
            },
            getValue: function (target) {
                var combo = $(target), opts = combo.combotree("options");
                return $(target).combotree(opts.multiples ? "getValues" : "getValue");
            },
            resize: function (target, width) {
                $(target).combotree("resize", width);
            },
            enable: function (target) {
                $(target).combotree("enable");
            },
            disable: function (target) {
                $(target).combotree("disable");
            }
        },
        combogrid: {
            defaults: {},
            init: function (container, options) {
                var opts = $.extend({}, this.defaults, options || {}),
                    box = $("<input type='text' class='toolbar-item-input' />").appendTo(container).combogrid(opts);
                return box;
            },
            destroy: function (target) {
                $(target).combogrid("destroy");
            },
            setValue: function (target, value) {
                $(target).combogrid($.isArray(value) ? "setValues" : "setValue", value);
            },
            getValue: function (target) {
                var combo = $(target), opts = combo.combogrid("options");
                return $(target).combogrid(opts.multiples ? "getValues" : "getValue");
            },
            resize: function (target, width) {
                $(target).combogrid("resize", width);
            },
            enable: function (target) {
                $(target).combogrid("enable");
            },
            disable: function (target) {
                $(target).combogrid("disable");
            }
        }
    };
    var itemOptions = {
        id: null,
        type: "button",
        options: null,
        style: null,
        itemCls: null,
        width: null,
        align: null
    };


    function appendItemDOM(target, item) {
        var t = $(target), state = $.data(target, "toolbar"),
            tr = state.wrapper.find("tr:last"),
            cell = $(item).addClass("toolbar-item"),
            text = cell.text();
        if (!tr.length) { tr = $("<tr class='toolbar-row'></tr>").appendTo(state.wrapper); }
        if (/^(?:div|span)$/i.test(cell[0].nodeName) && $.array.contains(["-", "\u2014", "|"], text)) {
            cell.addClass("dialog-tool-separator").text("");
        }
        $("<td class='toolbar-item-container'></td>").append(cell).appendTo(tr);
    };
    function appendItemString(target, str) {
        if (!str) { return; }
        if ($.array.contains(["-", "\u2014", "|"], str)) {
            appendItemDOM(target, $("<span>-</span>")[0]);
        } else if ($.string.isHtmlText(str)) {
            $(str).each(function () { appendItemDOM(target, this); });
        } else {
            appendItemObject(target, { type: "label", options: { text: str} });
        }
    };
    function appendItemObject(target, options) {
        var opts = $.extend({}, itemOptions, options || {}),
            t = $(target), state = $.data(target, "toolbar"),
            tr = state.wrapper.find("tr:last");
        if (!tr.length) { tr = $("<tr class='toolbar-row'></tr>").appendTo(state.wrapper); }
        var td = $("<td class='toolbar-item-container'></td>").appendTo(tr),
            container = td[0],
            builder = state.options.itemTypes[opts.type];
        var item = builder.init(container, opts.options || opts).addClass("toolbar-item");
        if (opts.id != null && opts.id != undefined) { item.attr("id", opts.id); }
        if (opts.itemCls) { td.addClass(opts.itemCls); }
        if (opts.style) { td.css(opts.style); }
        if (opts.width) { td.css("width", opts.width); }
        if (opts.align) { td.css("text-align", opts.align); }
        $.data(item[0], "toolbar-item-builder", builder);
    }

    function appendItem(target, item, dontSize, index) {
        if (!item) { return; }
        if ($.util.isJqueryObject(item) && item.length) {
            item.each(function () {
                appendItemDOM(target, this, index);
            });
        } else if ($.util.isDOM(item)) {
            appendItemDOM(target, item, index);
        } else if ($.util.isString(item)) {
            appendItemString(target, item, index);
        } else if ($.util.likeArray(item)) {
            $.each(item, function (i, n) {
                appendItem(target, n, true, index);
            });
        } else if ($.isFunction(item)) {
            appendItem(target, item.call(target), true, index);
        } else {
            appendItemObject(target, item, index);
        }
        if (!dontSize) { setSize(target); }
    };


    function removeItem(target, index) {
        if (!$.isNumeric(index)) { return; }
        var t = $(target), wrapper = t.toolbar("wrapper"), tr = wrapper.find("tr:last");
        if (tr.length) {
            var td = tr.find(">td");
            if (td.length >= index && td.length < index) {
                var container = td.eq(index), item = container.find(".toolbar-item"), builder = $.data(item[0], "toolbar-item-builder");
                if (builder && $.isFunction(builder.destroy)) { builder.destroy(item[0]); }
                container.remove();
            }
        }
    };

    function updateItem(target, param) { };


    var loader = function (param, success, error) {
        var opts = $(this).toolbar("options");
        if (!opts.url) {
            return false;
        }
        $.ajax({
            type: opts.method, url: opts.url, data: param, dataType: "json",
            success: function (data) {
                success(data);
            }, error: function () {
                error.apply(this, arguments);
            }
        });
    };
    var loadFilter = function (data) {
        data = $.array.likeArray && !$.util.isString(data) ? data : [];
        return $.array.map(data, function (val) {
            return $.extend({}, itemOptions, val || {});
        });
    };



    $.fn.toolbar = function (options, param) {
        if (typeof options == "string") {
            return $.fn.toolbar.methods[options](this, param);
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "toolbar");
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, "toolbar", {
                    options: $.extend({}, $.fn.toolbar.defaults, $.fn.toolbar.parseOptions(this), options)
                });
            }
            initialize(this);
        });
    };

    $.fn.toolbar.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, ["width", "height", "align", "valign", "itemTypes"]));
    };

    $.fn.toolbar.methods = {

        options: function (jq) { return $.data(jq[0], 'toolbar').options; },

        resize: function (jq, size) { return jq.each(function () { setSize(this, size); }); },

        align: function (jq, align) { return jq.each(function () { setAlign(this, align); }); },

        valign: function (jq, valign) { return jq.each(function () { setValign(this, valign); }); },

        wrapper: function (jq) { return $.data(jq[0], "toolbar").wrapper; },

        toolbar: function (jq) { return $.data(jq[0], "toolbar").toolbar; },

        //  \u5728\u5F53\u524D\u7684 easyui-toolbar \u4E2D\u589E\u52A0\u4E00\u4E2A\u5DE5\u5177\u680F\u9879\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 item \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u7C7B\u578B\uFF1A
        //      1、jQuery-DOM \u5BF9\u8C61\uFF1A
        //      2、HTML-DOM \u5BF9\u8C61\uFF1A
        //      3、String \u7C7B\u578B\uFF1A\u53EF\u4EE5\u4E3A\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //          a\uFF1A"-"、"\u2014"、"|"\uFF0C\u8868\u793A\u5206\u5272\u7EBF\u7684 separator
        //          b\uFF1A"<" \u5F00\u5934\u548C ">" \u7ED3\u5C3E\u5207\u5B57\u7B26\u4E32\u5EA6\u5927\u4E8E\u7B49\u4E8E3\uFF0C\u8868\u793A HTML \u4EE3\u7801\u6BB5\uFF1B
        //          c\uFF1A"\t"、"\n"\uFF0C\u8868\u793A\u6362\u884C
        //          d\uFF1A\u5176\u4ED6\u957F\u5EA6\u5927\u4E8E 0 \u7684\u5B57\u7B26\u4E32\uFF0C\u8868\u793A label\u3002
        //      4、JSON-Object \u5BF9\u8C61\uFF1A
        //          id      : 
        //          type    : $.fn.toolbar.defaults.itemTypes \u4E2D\u5B9A\u4E49\u7684\u5DE5\u5177\u680F\u9879\u7C7B\u578B\uFF0C\u4F8B\u5982 separator、label、button、textbox、checkbox、numberbox、validatebox、combobox、combotree、combogrid \u7B49\uFF1B
        //          options : \u521D\u59CB\u5316\u8BE5\u5DE5\u5177\u680F\u9879\u7684\u53C2\u6570\uFF1B
        //          style   :
        //          itemCls :
        //          width   :
        //          align   :
        //      5、Array \u6570\u7EC4\u7C7B\u578B\uFF1A
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-toolbar \u63A7\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        appendItem: function (jq, item) { return jq.each(function () { appendItem(this, item); }); },

        removeItem: function (jq, index) { return jq.each(function () { removeItem(this, index); }); },

        //  \u5C06\u5F53\u524D easyui-toolbar \u4E2D\u6307\u5B9A\u4F4D\u7F6E\u7684\u5DE5\u5177\u680F\u9879\u66FF\u6362\u6210\u53E6\u4E00\u4E2A\u5DE5\u5177\u680F\u9879\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u4E3A\u4E00\u4E2A JSON-Object\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\u5B9A\u4E49\uFF1A
        //      index:  \u8868\u793A\u8981\u66FF\u6362\u7684\u5DE5\u5177\u680F\u9879\u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF1B
        //      item:   \u53C2\u8003 appendItem \u65B9\u6CD5\u7684\u53C2\u6570 item\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-toolbar \u63A7\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        updateItem: function (jq, param) { return jq.each(function () { updateItem(this, param); }); },

        enableItem: function (jq, index) { },

        disableItem: function (jq, index) { },

        enable: function (jq) { },

        disable: function (jq) { },

        empty: function (jq) { },

        load: function (jq, queryParams) { },

        reload: function (jq) { },

        loadData: function (jq, data) { },

        items: function (jq) { },

        getItem: function (jq, index) { },

        findItem: function (jq, id) { },

        getData: function (jq) { }
    };

    $.fn.toolbar.defaults = {

        method: "post",

        url: null,

        data: null,

        loader: loader,

        loadFilter: loadFilter,

        //  \u8868\u793A easyui-toolbar \u63A7\u4EF6\u7684\u5BBD\u5EA6\uFF0CNumber \u7C7B\u578B\u6570\u503C\uFF1B\u9ED8\u8BA4\u4E3A auto\uFF1B
        width: "auto",

        //  \u8868\u793A easyui-toolbar \u63A7\u4EF6\u7684\u9AD8\u5EA6\uFF0CNumber \u7C7B\u578B\u6570\u503C\uFF1B\u9ED8\u8BA4\u4E3A auto\uFF1B
        height: "auto",

        //  \u8868\u793A easyui-toolbar \u63A7\u4EF6\u7684\u6A2A\u5411\u5BF9\u9F50\u65B9\u5F0F\uFF0C\u53EF\u9009\u7684\u503C\u4E3A "left"、"center" \u6216 "right"\uFF1B\u9ED8\u8BA4\u4E3A "left"\uFF1B
        align: "left",

        //  \u8868\u793A easyui-toolbar \u63A7\u4EF6\u7684\u7EB5\u5411\u5BF9\u9F50\u65B9\u5F0F\uFF0C\u53EF\u9009\u7684\u503C\u4E3A "top"、"middle" \u6216 "bottom"\uFF1B\u9ED8\u8BA4\u4E3A "middle"\uFF1B
        valign: "middle",

        //  \u8868\u793A easyui-toolbar \u7684\u5C3A\u5BF8\u5927\u5C0F\u91CD\u7F6E\u4E8B\u4EF6\uFF1B\u5F53\u63A7\u4EF6\u5927\u5C0F\u88AB\u8C03\u6574\u540E\u89E6\u53D1\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      width: \u88AB\u8BBE\u7F6E\u7684\u65B0\u7684\u5BBD\u5EA6\uFF1B
        //      height: \u88AB\u8BBE\u7F6E\u7684\u65B0\u7684\u544A\u8BC9\u3002
        //  \u56DE\u8C03\u51FD\u6570\u4E2D\u7684 this \u8868\u793A\u5F53\u524D easyui-toolbar \u7684 DOM \u5BF9\u8C61\u3002
        onResize: function (width, height) { },

        //  \u5B9A\u4E49 easyui-toolbar \u63D2\u4EF6\u80FD\u591F\u6DFB\u52A0\u7684\u5DE5\u5177\u680F\u9879\u7C7B\u578B\uFF1B
        //  \u5F00\u53D1\u4EBA\u5458\u53EF\u4EE5\u901A\u8FC7\u6269\u5C55 $.fn.toolbar.defaults.itemTypes \u5C5E\u6027\u6765\u5B9E\u73B0\u5176\u81EA\u5B9A\u4E49\u7684 easyui-toolbar \u5DE5\u5177\u680F\u9879\u7C7B\u578B\uFF1B
        //      \u5C31\u50CF\u6269\u5C55 $.fn.datagrid.defaults.editors \u4E00\u6837\u3002
        //  \u5DF2\u7ECF\u5185\u7F6E\u7684\u5DE5\u5177\u680F\u9879\u7C7B\u578B\u6709\uFF1A
        //      separator   :
        //      label       :
        //      button      :
        //      textbox     :
        //      checkbox    :
        //      validatebox :
        //      numberbox   :
        //      datebox     :
        //      combobox    :
        //      combotree   :
        //      combogrid   :
        itemTypes: itemTypes,

        onLoadSuccess: function (data) { },

        onLoadError: function () { },

        onBeforeLoad: function (param) { }
    };



    $.parser.plugins.push("toolbar");


    var css =
        ".toolbar-f {}" +
        ".toolbar { width: auto; height: auto; min-height: 26px; overflow: hidden; }" +
        ".toolbar-wrapper { position: relative; }" +
        ".toolbar-wrapper td .dialog-tool-separator { height: 22px; margin-left: 2px; margin-right: 2px; }" +
        ".toolbar-align-left { float: left; }" +
        ".toolbar-align-center {}" +
        ".toolbar-align-right { float: right; }" +

        ".toolbar-row {}" +
        ".toolbar-item-container { padding-left: 1px; padding-right: 1px; }" +
        ".toolbar-item, .toolbar-item>* { vertical-align: middle; }" +
        ".toolbar-item-label {}" +
        ".toolbar-item-input {}" +
        ".toolbar-item-button {}" +
        ".toolbar-item-checkbox {}" +
        ".toolbar-item-checkbox-input {}" +
        ".toolbar-item-checkbox-text {}" +
        ".toolbar-item-checkbox-disabled {}" +
        "";
    $.util.addCss(css);

})(jQuery);