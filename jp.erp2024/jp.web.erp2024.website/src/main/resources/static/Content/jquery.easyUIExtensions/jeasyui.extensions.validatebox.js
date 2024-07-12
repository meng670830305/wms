/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI validatebox Extensions 1.0 beta
* jQuery EasyUI validatebox \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.validatebox.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-09-07
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/

/*
\u529F\u80FD\u8BF4\u660E\uFF1A
*/
(function ($, undefined) {


    $.fn.validatebox.extensions = {};


    var rules = {
        //  \u53EA\u5141\u8BB8\u8F93\u5165\u82F1\u6587\u5B57\u6BCD\u6216\u6570\u5B57
        engNum: {
            validator: function (value) {
                return /^[0-9a-zA-Z]*$/.test(value);
            },
            message: '\u8BF7\u8F93\u5165\u82F1\u6587\u5B57\u6BCD\u6216\u6570\u5B57'
        },
        //  \u53EA\u5141\u8BB8\u6C49\u5B57、\u82F1\u6587\u5B57\u6BCD\u6216\u6570\u5B57
        chsEngNum: {
            validator: function (value, param) {
                return /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/.test(value);
            },
            message: '\u53EA\u5141\u8BB8\u6C49\u5B57、\u82F1\u6587\u5B57\u6BCD\u6216\u6570\u5B57\u3002'
        },
        //  \u53EA\u5141\u8BB8\u6C49\u5B57、\u82F1\u6587\u5B57\u6BCD、\u6570\u5B57\u53CA\u4E0B\u5212\u7EBF
        code: {
            validator: function (value, param) {
                return /^[\u0391-\uFFE5\w]+$/.test(value);
            },
            message: '\u53EA\u5141\u8BB8\u6C49\u5B57、\u82F1\u6587\u5B57\u6BCD、\u6570\u5B57\u53CA\u4E0B\u5212\u7EBF.'
        },
        //  \u9A8C\u8BC1\u662F\u5426\u4E3A\u5408\u6CD5\u7684\u7528\u6237\u540D
        name: {
            validator: function (value) { return value.isUserName(); },
            message: "\u7528\u6237\u540D\u4E0D\u5408\u6CD5(\u5B57\u6BCD\u5F00\u5934\uFF0C\u5141\u8BB86-16\u5B57\u8282\uFF0C\u5141\u8BB8\u5B57\u6BCD\u6570\u5B57\u4E0B\u5212\u7EBF)"
        },
        //  \u6307\u5B9A\u5B57\u7B26\u6700\u5C0F\u957F\u5EA6
        minLength: {
            validator: function (value, param) { return rules.length.validator(value, [param[0]]); },
            message: "\u6700\u5C11\u8F93\u5165 {0} \u4E2A\u5B57\u7B26."
        },
        //  \u6307\u5B9A\u5B57\u7B26\u6700\u5927\u957F\u5EA6
        maxLength: {
            validator: function (value, param) { return rules.length.validator(value, [0, param[0]]); },
            message: "\u6700\u591A\u8F93\u5165 {0} \u4E2A\u5B57\u7B26."
        },
        //  \u6307\u5B9A\u5B57\u7B26\u7684\u957F\u5EA6\u8303\u56F4
        length: {
            validator: function (value, param) {
                var len = $.trim(value).length;
                var min = param[0], max = param[1];
                return (!min || len >= min) && (!max || len <= max);
            },
            message: "\u8F93\u5165\u5185\u5BB9\u957F\u5EA6\u5FC5\u987B\u4ECB\u4E8E {0} \u548C {1} \u4E2A\u5B57\u7B26\u6570\u4E4B\u95F4."
        },
        //  \u5FC5\u987B\u5305\u542B\u6307\u5B9A\u7684\u5185\u5BB9
        contains: {
            validator: function (value, param) { return $.string.contains(value, param[0]); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u5305\u542B {0}."
        },
        //  \u4EE5\u6307\u5B9A\u7684\u5B57\u7B26\u5F00\u5934
        startsWith: {
            validator: function (value, param) { return $.string.startsWith(value, param[0]); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u4EE5 {0} \u4F5C\u4E3A\u8D77\u59CB\u5B57\u7B26."
        },
        //  \u4EE5\u6307\u5B9A\u7684\u5B57\u7B26\u7ED3\u675F
        endsWith: {
            validator: function (value, param) { return $.string.endsWith(value, param[0]); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u4EE5 {0} \u4F5C\u4E3A\u8D77\u59CB\u5B57\u7B26."
        },
        //  \u957F\u65E5\u671F\u65F6\u95F4(yyyy-MM-dd hh:mm:ss)\u683C\u5F0F
        longDate: {
            validator: function (value) { return $.string.isLongDate(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u957F\u65E5\u671F\u65F6\u95F4(yyyy-MM-dd hh:mm:ss)\u683C\u5F0F."
        },
        //  \u77ED\u65E5\u671F(yyyy-MM-dd)\u683C\u5F0F
        shortDate: {
            validator: function (value) { return $.string.isShortDate(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u77ED\u65E5\u671F(yyyy-MM-dd)\u683C\u5F0F."
        },
        //  \u957F\u65E5\u671F\u65F6\u95F4(yyyy-MM-dd hh:mm:ss)\u6216\u77ED\u65E5\u671F(yyyy-MM-dd)\u683C\u5F0F
        date: {
            validator: function (value) { return $.string.isDate(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u957F\u65E5\u671F\u65F6\u95F4(yyyy-MM-dd hh:mm:ss)\u6216\u77ED\u65E5\u671F(yyyy-MM-dd)\u683C\u5F0F."
        },
        //  \u7535\u8BDD\u53F7\u7801(\u4E2D\u56FD)\u683C\u5F0F
        tel: {
            validator: function (value) { return $.string.isTel(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u7535\u8BDD\u53F7\u7801(\u4E2D\u56FD)\u683C\u5F0F."
        },
        //  \u79FB\u52A8\u7535\u8BDD\u53F7\u7801(\u4E2D\u56FD)\u683C\u5F0F
        mobile: {
            validator: function (value) { return $.string.isTel(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u79FB\u52A8\u7535\u8BDD\u53F7\u7801(\u4E2D\u56FD)\u683C\u5F0F."
        },
        //  \u7535\u8BDD\u53F7\u7801(\u4E2D\u56FD)\u6216\u79FB\u52A8\u7535\u8BDD\u53F7\u7801(\u4E2D\u56FD)\u683C\u5F0F
        telOrMobile: {
            validator: function (value) { return $.string.isTelOrMobile(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u7535\u8BDD\u53F7\u7801(\u4E2D\u56FD)\u6216\u79FB\u52A8\u7535\u8BDD\u53F7\u7801(\u4E2D\u56FD)\u683C\u5F0F."
        },
        //  \u4F20\u771F\u53F7\u7801(\u4E2D\u56FD)\u683C\u5F0F
        fax: {
            validator: function (value) { return $.string.isFax(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u4F20\u771F\u53F7\u7801(\u4E2D\u56FD)\u683C\u5F0F."
        },
        //  \u7535\u5B50\u90AE\u7BB1(Email)\u5730\u5740\u683C\u5F0F
        email: {
            validator: function (value) { return $.string.isEmail(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u7535\u5B50\u90AE\u7BB1(Email)\u5730\u5740\u683C\u5F0F."
        },
        //  \u90AE\u653F\u7F16\u7801(\u4E2D\u56FD)\u683C\u5F0F
        zipCode: {
            validator: function (value) { return $.string.isZipCode(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u90AE\u653F\u7F16\u7801(\u4E2D\u56FD)\u683C\u5F0F."
        },
        //  \u5FC5\u987B\u5305\u542B\u4E2D\u6587\u6C49\u5B57
        existChinese: {
            validator: function (value) { return $.string.existChinese(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u5305\u542B\u4E2D\u6587\u6C49\u5B57."
        },
        //  \u5FC5\u987B\u662F\u7EAF\u4E2D\u6587\u6C49\u5B57
        chinese: {
            validator: function (value) { return $.string.isChinese(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u7EAF\u4E2D\u6587\u6C49\u5B57."
        },
        //  \u5FC5\u987B\u662F\u7EAF\u82F1\u6587\u5B57\u6BCD
        english: {
            validator: function (value) { return $.string.isEnglish(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u7EAF\u82F1\u6587\u5B57\u6BCD."
        },
        //  \u5FC5\u987B\u662F\u5408\u6CD5\u7684\u6587\u4EF6\u540D(\u4E0D\u80FD\u5305\u542B\u5B57\u7B26 \\/:*?\"<>|)
        fileName: {
            validator: function (value) { return $.string.isFileName(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u5408\u6CD5\u7684\u6587\u4EF6\u540D(\u4E0D\u80FD\u5305\u542B\u5B57\u7B26 \\/:*?\"<>|)."
        },
        //  \u5FC5\u987B\u662F\u6B63\u786E\u7684 IP\u5730\u5740v4 \u683C\u5F0F
        ipv4: {
            validator: function (value) { return $.string.isIPv4(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u6B63\u786E\u7684 IP\u5730\u5740v4 \u683C\u5F0F."
        },
        //  \u5FC5\u987B\u662F\u6B63\u786E\u7684 url \u683C\u5F0F
        url: {
            validator: function (value) { return $.string.isUrl(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u6B63\u786E\u7684 url \u683C\u5F0F."
        },
        //  \u5FC5\u987B\u662F\u6B63\u786E\u7684 IP\u5730\u5740v4 \u6216 url \u683C\u5F0F
        ipv4url: {
            validator: function (value) { return $.string.isUrlOrIPv4(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u6B63\u786E\u7684 IP\u5730\u5740v4 \u6216 url \u683C\u5F0F."
        },
        //  \u5FC5\u987B\u662F\u6B63\u786E\u7684\u8D27\u5E01\u91D1\u989D(\u963F\u62C9\u4F2F\u6570\u5B57\u8868\u793A\u6CD5)\u683C\u5F0F
        currency: {
            validator: function (value) { return $.string.isCurrency(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u6B63\u786E\u7684\u8D27\u5E01\u91D1\u989D(\u963F\u62C9\u4F2F\u6570\u5B57\u8868\u793A\u6CD5)\u683C\u5F0F."
        },
        //  \u5FC5\u987B\u662F\u6B63\u786E QQ \u53F7\u7801\u683C\u5F0F
        qq: {
            validator: function (value) { return $.string.isQQ(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u6B63\u786E QQ \u53F7\u7801\u683C\u5F0F."
        },
        //  \u5FC5\u987B\u662F\u6B63\u786E MSN \u8D26\u6237\u540D\u683C\u5F0F
        msn: {
            validator: function (value) { return $.string.isMSN(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u6B63\u786E MSN \u8D26\u6237\u540D\u683C\u5F0F."
        },
        unNormal: {
            validator: function (value) { return $.string.isUnNormal(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u4E0D\u5305\u542B\u7A7A\u683C\u548C\u975E\u6CD5\u5B57\u7B26Z."
        },
        //  \u5FC5\u987B\u662F\u5408\u6CD5\u7684\u6C7D\u8F66\u8F66\u724C\u53F7\u7801\u683C\u5F0F
        carNo: {
            validator: function (value) { return $.string.isCarNo(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u5408\u6CD5\u7684\u6C7D\u8F66\u8F66\u724C\u53F7\u7801\u683C\u5F0F."
        },
        //  \u5FC5\u987B\u662F\u5408\u6CD5\u7684\u6C7D\u8F66\u53D1\u52A8\u673A\u5E8F\u5217\u53F7\u683C\u5F0F
        carEngineNo: {
            validator: function (value) { return $.string.isCarEngineNo(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u5408\u6CD5\u7684\u6C7D\u8F66\u53D1\u52A8\u673A\u5E8F\u5217\u53F7\u683C\u5F0F."
        },
        //  \u5FC5\u987B\u662F\u5408\u6CD5\u7684\u8EAB\u4EFD\u8BC1\u53F7\u7801(\u4E2D\u56FD)\u683C\u5F0F
        idCard: {
            validator: function (value) { return $.string.isIDCard(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u5408\u6CD5\u7684\u8EAB\u4EFD\u8BC1\u53F7\u7801(\u4E2D\u56FD)\u683C\u5F0F."
        },
        //  \u5FC5\u987B\u662F\u5408\u6CD5\u7684\u6574\u6570\u683C\u5F0F
        integer: {
            validator: function (value) { return $.string.isInteger(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u5408\u6CD5\u7684\u6574\u6570\u683C\u5F0F."
        },
        //  \u5FC5\u987B\u662F\u5408\u6CD5\u7684\u6574\u6570\u683C\u5F0F\u4E14\u503C\u4ECB\u4E8E {0} \u4E0E {1} \u4E4B\u95F4
        integerRange: {
            validator: function (value, param) {
                return $.string.isInteger(value) && ((param[0] || value >= param[0]) && (param[1] || value <= param[1]));
            },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u5408\u6CD5\u7684\u6574\u6570\u683C\u5F0F\u4E14\u503C\u4ECB\u4E8E {0} \u4E0E {1} \u4E4B\u95F4."
        },
        //  \u5FC5\u987B\u662F\u6307\u5B9A\u7C7B\u578B\u7684\u6570\u5B57\u683C\u5F0F
        numeric: {
            validator: function (value, param) { return $.string.isNumeric(value, param ? param[0] : undefined); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u6307\u5B9A\u7C7B\u578B\u7684\u6570\u5B57\u683C\u5F0F."
        },
        //  \u5FC5\u987B\u662F\u6307\u5B9A\u7C7B\u578B\u7684\u6570\u5B57\u683C\u5F0F\u4E14\u4ECB\u4E8E {0} \u4E0E {1} \u4E4B\u95F4
        numericRange: {
            validator: function (value, param) {
                return $.string.isNumeric(value, param ? param[2] : undefined) && ((param[0] || value >= param[0]) && (param[1] || value <= param[1]));
            },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u6307\u5B9A\u7C7B\u578B\u7684\u6570\u5B57\u683C\u5F0F\u4E14\u4ECB\u4E8E {0} \u4E0E {1} \u4E4B\u95F4."
        },
        //  \u5FC5\u987B\u662F\u6B63\u786E\u7684 \u989C\u8272(#FFFFFF\u5F62\u5F0F) \u683C\u5F0F
        color: {
            validator: function (value) { return $.string.isColor(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u6B63\u786E\u7684 \u989C\u8272(#FFFFFF\u5F62\u5F0F) \u683C\u5F0F."
        },
        //  \u5FC5\u987B\u662F\u5B89\u5168\u7684\u5BC6\u7801\u5B57\u7B26(\u7531\u5B57\u7B26\u548C\u6570\u5B57\u7EC4\u6210\uFF0C\u81F3\u5C11 6 \u4F4D)\u683C\u5F0F
        password: {
            validator: function (value) { return $.string.isSafePassword(value); },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u5FC5\u987B\u662F\u5B89\u5168\u7684\u5BC6\u7801\u5B57\u7B26(\u7531\u5B57\u7B26\u548C\u6570\u5B57\u7EC4\u6210\uFF0C\u81F3\u5C11 6 \u4F4D)\u683C\u5F0F."
        },
        //  \u8F93\u5165\u7684\u5B57\u7B26\u5FC5\u987B\u662F\u6307\u5B9A\u7684\u5185\u5BB9\u76F8\u540C
        equals: {
            validator: function (value, param) {
                var val = param[0], type = param[1];
                if (type) {
                    switch (String(type).toLowerCase()) {
                        case "jquery":
                        case "dom":
                            val = $.util.parseJquery(val).val();
                            break;
                        case "id":
                            val = $.util.parseJquery("#" + val).val();
                            break;
                        case "string":
                        default:
                            break;
                    }
                }
                return value === val;
            },
            message: "\u8F93\u5165\u7684\u5185\u5BB9\u4E0D\u5339\u914D."
        }
    };
    $.extend($.fn.validatebox.defaults.rules, rules);




    function initialize(target) {
        var t = $.util.parseJquery(target);
        var opts = t.validatebox("options");
        if (!opts._initialized) {
            setPrompt(target, opts.prompt, opts);
            if (opts.autoFocus) {
                $.util.exec(function () { t.focus(); });
            }
            opts._initialized = true;
        }
    };

    function setPrompt(target, prompt, opts) {
        var t = $.util.parseJquery(target);
        opts = opts || t.validatebox("options");
        opts.prompt = prompt;
        if ($.html5.testProp("placeholder", t[0].nodeName)) {
            t.attr("placeholder", prompt);
        } else {
            if (!$.isFunction(!opts.promptFocus)) {
                opts.promptFocus = function () {
                    if (t.hasClass("validatebox-prompt")) {
                        t.removeClass("validatebox-prompt");
                        if (t.val() == opts.prompt) { t.val(""); }
                    }
                };
                t.focus(opts.promptFocus);
            }
            if (!$.isFunction(!opts.promptBlur)) {
                opts.promptBlur = function () {
                    if ($.string.isNullOrEmpty(t.val())) { t.addClass("validatebox-prompt").val(opts.prompt); }
                }
                t.blur(opts.promptBlur);
            }
            if ($.string.isNullOrEmpty(t.val())) {
                t.addClass("validatebox-prompt").val(opts.prompt);
            }
        }
    }

    var _validate = $.fn.validatebox.methods.isValid;
    function validate(target) {
        var t = $.util.parseJquery(target);
        if (t.hasClass("validatebox-prompt")) { t.removeClass("validatebox-prompt").val(""); }
        return _validate.call(t, t);
    };


    var _validatebox = $.fn.validatebox;
    $.fn.validatebox = function (options, param) {
        if (typeof options == "string") { return _validatebox.apply(this, arguments); }
        options = options || {};
        return this.each(function () {
            var jq = $.util.parseJquery(this), opts = $.extend({}, $.fn.validatebox.parseOptions(this), options);
            _validatebox.call(jq, opts);
            initialize(this);
        });
    };
    $.union($.fn.validatebox, _validatebox);


    var methods = $.fn.validatebox.extensions.methods = {
        //  \u6269\u5C55 easyui-validatebox \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u65B9\u6CD5\uFF1B\u8BBE\u7F6E\u5F53\u524D easyui-validatebox \u63A7\u4EF6\u7684 prompt \u503C\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 prompt \u8868\u793A\u5C06\u88AB\u8BBE\u7F6E\u7684 prompt \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-validatebox \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setPrompt: function (jq, prompt) { return jq.each(function () { setPrompt(this, prompt); }); },

        //  \u91CD\u5199 easyui-validatebox \u7684\u539F\u751F\u65B9\u6CD5\uFF1B\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u6216\u5C5E\u6027\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-validatebox \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        validate: function (jq) { return jq.each(function () { validate(this); }) },

        //  \u91CD\u5199 easyui-validatebox \u7684\u539F\u751F\u65B9\u6CD5\uFF1B\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u6216\u5C5E\u6027\u3002
        isValid: function (jq) { return validate(jq[0]); }
    };
    var defaults = $.fn.validatebox.extensions.defaults = {
        //  \u589E\u52A0 easyui-validatebox \u7684\u6269\u5C55\u5C5E\u6027 prompt\uFF0C\u8BE5\u5C5E\u6027\u529F\u80FD\u7C7B\u4F3C\u4E8E easyui-searchbox \u7684 prompt \u5C5E\u6027\u3002
        //  \u8868\u793A\u8BE5\u9A8C\u8BC1\u8F93\u5165\u6846\u7684\u63D0\u793A\u6587\u672C\uFF1BString \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A null\u3002
        prompt: null,

        //  \u589E\u52A0 easyui-validatebox \u7684\u6269\u5C55\u5C5E\u6027 autoFocus\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u5728\u5F53\u524D\u9875\u9762\u52A0\u8F7D\u5B8C\u6210\u540E\uFF0C\u8BE5 easyui-validatebox \u63A7\u4EF6\u662F\u5426\u81EA\u52A8\u83B7\u5F97\u7126\u70B9\u3002
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        autoFocus: false
    };

    $.extend($.fn.validatebox.defaults, defaults);
    $.extend($.fn.validatebox.methods, methods);

    var css =
        ".validatebox-prompt{ color: #ccc; }";
    $.util.addCss(css);



    //  \u4FEE\u6539 jQuery \u672C\u8EAB\u7684\u6210\u5458\u65B9\u6CD5 val\uFF1B\u4F7F\u4E4B\u652F\u6301 easyui-validatebox \u7684\u6269\u5C55\u5C5E\u6027 prompt\u3002
    var core_val = $.fn.val;
    $.fn.val = function (value) {
        var val, opts;
        if (this.length > 0 && this.is(".validatebox-text.validatebox-prompt") && !$.html5.testProp("placeholder", this[0].nodeName)) {
            opts = this.validatebox("options");
            if (arguments.length == 0) {
                val = core_val.apply(this, arguments);
                return val == opts.prompt ? "" : val;
            }
            if (value && value != opts.prompt) { this.removeClass("validatebox-prompt"); }
        }
        return core_val.apply(this, arguments);
    };


})(jQuery);