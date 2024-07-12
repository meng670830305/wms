/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI form Extensions 1.0 beta
* jQuery EasyUI form \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.form.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-08-05
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {


    $.fn.form.extensions = {};



    var getData = function (target, param) {
        var form = $.util.parseJquery(target);
        return form.serializeObject(param);
    };

    var _submit = $.fn.form.methods.submit;
    var submit = function (target, options) {
        var form = $.util.parseJquery(target);
        if (/^(?:form)$/i.test(this.nodeName)) { return _submit.call(form, form, options); }
        var opts = $.extend({}, $.fn.form.defaults, options || {});
        if (opts.onSubmit && opts.onSubmit.call(target, param) == false) { return; }
        if (!opts.url) { return; }
        var param = form.form("getData");
        $.post(opts.url, param, function (data) { if (opts.success) { opts.success(data); } });
    };



    var load = function (target, data) {
        var form = $.util.parseJquery(target);
        if (!$.data(target, 'form')) {
            $.data(target, 'form', { options: $.extend({}, $.fn.form.defaults) });
        }
        var opts = $.data(target, 'form').options;
        if (typeof data == 'string') {
            var param = {};
            if (opts.onBeforeLoad.call(target, param) == false) return;
            $.ajax({
                url: data,
                data: param,
                dataType: 'json',
                success: function (data) { _load(data); },
                error: function () { opts.onLoadError.apply(target, arguments); }
            });
        } else {
            _load(data);
        }
        function _load(data) {
            for (var name in data) {
                var val = data[name];
                var rr = _checkField(name, val);
                if (!rr.length) {
                    var f = form.find('input[numberboxName="' + name + '"]');
                    if (f.length) {
                        f.numberbox('setValue', val); // set numberbox value
                    } else {
                        $('input[name="' + name + '"]', form).val(val);
                        $('textarea[name="' + name + '"]', form).val(val);
                        $('select[name="' + name + '"]', form).val(val);
                        $('span[name="' + name + '"]', form).text(val);
                        $('label[name="' + name + '"]', form).text(val);
                        $('div[name="' + name + '"]', form).text(val);
                    }
                }
                _loadCombo(name, val);
            }
            opts.onLoadSuccess.call(target, data);
            form.form("validate");
        }
        //  check the checkbox and radio fields
        function _checkField(name, val) {
            var rr = form.find('input[name="' + name + '"][type=radio], input[name="' + name + '"][type=checkbox]');
            rr._propAttr('checked', false);
            rr.each(function () {
                var f = $(this);
                if (f.val() == String(val) || $.inArray(f.val(), val) >= 0) {
                    f._propAttr('checked', true);
                }
            });
            return rr;
        }
        function _loadCombo(name, val) {
            var cc = $.fn.form.comboList;
            var c = form.find('[comboName="' + name + '"]');
            if (c.length) {
                for (var i = 0; i < cc.length; i++) {
                    var type = cc[i];
                    if (c.hasClass(type + '-f')) {
                        if (c[type]('options').multiple) {
                            c[type]('setValues', val);
                        } else {
                            c[type]('setValue', val);
                        }
                        return;
                    }
                }
            }
        }
    }


    var methods = $.fn.form.extensions.methods = {
        //  \u83B7\u53D6 easyui-form \u63A7\u4EF6\u5BB9\u5668\u5185\u6240\u6709\u8868\u5355\u63A7\u4EF6\u7684 JSON \u5E8F\u5217\u5316\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u683C\u5F0F\uFF1A
        //      1、JSON-Object  \uFF1A\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          onlyEnabled:    \u8868\u793A\u8FD4\u56DE\u7684\u7ED3\u679C\u6570\u636E\u4E2D\u662F\u5426\u4EC5\u5305\u542B\u542F\u7528(disabled == false)\u7684 HTML \u8868\u5355\u63A7\u4EF6\uFF1BBoolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        //          transcript :    \u8868\u793A\u5F53\u8303\u56F4\u5185\u5B58\u5728\u91CD\u540D(name \u76F8\u540C\u65F6)\u7684 DOM \u5143\u7D20\u65F6\uFF0C\u5BF9\u91CD\u590D\u5143\u7D20\u7684\u53D6\u503C\u89C4\u5219\uFF1B
        ///                 \u8FD9\u662F\u4E00\u4E2A String \u7C7B\u578B\u503C\uFF0C\u53EF\u9009\u7684\u503C\u9650\u5B9A\u5728\u4EE5\u4E0B\u8303\u56F4\uFF1A
        //              cover  :    \u8986\u76D6\u65B9\u5F0F\uFF0C\u53EA\u53D6\u540E\u9762\u5143\u7D20 \u7684\u503C\uFF0C\u4E22\u5F03\u524D\u9762\u5143\u7D20\u7684\u503C\uFF1B\u9ED8\u8BA4\u503C\uFF1B
        //              discard:    \u4E22\u5F03\u540E\u9762\u5143\u7D20\u7684\u503C\uFF0C\u53EA\u53D6\u524D\u9762\u5143\u7D20\u7684\u503C\uFF1B
        //              overlay:    \u5C06\u6240\u6709\u5143\u7D20\u7684\u503C\u8FDB\u884C\u53E0\u52A0\uFF1B
        //          overtype   :    \u5143\u7D20\u53E0\u52A0\u65B9\u5F0F\uFF0C\u5F53 transcript \u7684\u503C\u5B9A\u4E49\u4E3A "overlay" \u65F6\uFF0C\u6B64\u5C5E\u6027\u65B9\u6709\u6548\uFF1B
        //                  \u8FD9\u662F\u4E00\u4E2A String \u7C7B\u578B\u503C\uFF0C\u53EF\u9009\u7684\u503C\u9650\u5B9A\u5728\u4EE5\u4E0B\u8303\u56F4\uFF1A
        //              array  :    \u5C06\u6240\u6709\u91CD\u590D\u7684\u5143\u7D20\u53E0\u52A0\u4E3A\u4E00\u4E2A\u6570\u7EC4\uFF1B
        //              append :    \u5C06\u6240\u6709\u7684\u91CD\u590D\u5143\u7D20\u53E0\u52A0\u4E3A\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF1B\u9ED8\u8BA4\u503C\uFF1B
        //          separator  :    \u5143\u7D20\u53E0\u52A0\u7684\u5206\u9694\u7B26\uFF0C\u5B9A\u4E49\u5C06\u6240\u6709\u91CD\u540D\u5143\u7D20\u53E0\u52A0\u4E3A\u4E00\u4E2A\u5B57\u7B26\u4E32\u65F6\u7528\u4E8E\u62FC\u63A5\u5B57\u7B26\u4E32\u7684\u5206\u9694\u7B26\uFF1B
        //                  \u8FD9\u662F\u4E00\u4E2A String \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A ","\uFF1B\u5F53 transcript \u7684\u503C\u5B9A\u4E49\u4E3A "overlay" \u4E14 overtype \u7684\u503C\u5B9A\u4E49\u4E3A "append" \u65F6\uFF0C\u6B64\u5C5E\u6027\u65B9\u6709\u6548\u3002
        //      2、String \u7C7B\u578B\u503C:   \u8868\u793A\u5F53\u8303\u56F4\u5185\u5B58\u5728\u91CD\u540D(name \u76F8\u540C\u65F6)\u7684 DOM \u5143\u7D20\u65F6\uFF0C\u5BF9\u91CD\u590D\u5143\u7D20\u7684\u53D6\u503C\u89C4\u5219\uFF1B
        //              \u5176\u53D6\u503C\u8303\u56F4\u548C\u5F53\u53C2\u6570\u683C\u5F0F\u4E3A JSON-Object \u65F6\u7684\u5C5E\u6027 transcript \u4E00\u6837\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8BE5\u65B9\u6CD5\u8FD4\u56DE\u4E00\u4E2A JSON Object\uFF0C\u8FD4\u56DE\u5BF9\u8C61\u4E2D\u7684\u6BCF\u4E2A\u6570\u636E\u90FD\u8868\u793A\u4E00\u4E2A\u8868\u5355\u63A7\u4EF6\u503C\u3002
        getData: function (jq, param) { return getData(jq[0], param); },

        //  \u91CD\u5199 easyui-form \u63A7\u4EF6\u7684 submit \u65B9\u6CD5\uFF0C\u4F7F\u4E4B\u9664\u4E86\u652F\u6301 form \u6807\u7B7E\u63D0\u4EA4\u5916\uFF0C\u8FD8\u652F\u6301 div \u7B49\u5176\u4ED6\u5BB9\u5668\u6807\u7B7E\u7684\u63D0\u4EA4\u3002
        submit: function (jq, options) { return jq.each(function () { submit(this, options); }); },

        //  \u91CD\u5199 easyui-form \u63A7\u4EF6\u7684 load \u65B9\u6CD5\u3002
        load: function (jq, data) { return jq.each(function () { load(this, data); }); }
    };
    var defaults = $.fn.form.extensions.defaults = {};

    $.extend($.fn.form.defaults, defaults);
    $.extend($.fn.form.methods, methods);

    $.fn.form.comboList = ['combobox', 'combotree', 'combogrid', 'datetimebox', 'datebox', 'combo'];
})(jQuery);