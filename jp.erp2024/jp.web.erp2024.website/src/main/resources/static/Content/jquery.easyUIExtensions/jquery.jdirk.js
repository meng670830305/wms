/**
* jQuery JavaScript Library v1.9.1 && v2.0.0
* http://jquery.com/
*
* Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
* Released under the MIT license
* http://jquery.org/license
*
* jQuery Extensions Basic Library \u57FA\u7840\u51FD\u6570\u5DE5\u5177\u5305 v1.0 beta
* jquery.jdirk.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-10-22
*
* \u4F9D\u8D56\u9879\uFF1Ajquery-1.9.1.js late
*
* Copyright 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function (window, $, undefined) {

    //  \u5B9A\u4E49 \u5B57\u7B26\u4E32\u5BF9\u8C61(String) \u6269\u5C55\u5BF9\u8C61\u57FA\u5143
    var coreString = function () { return String.apply(this, arguments); };
    //  \u5B9A\u4E49 \u65E5\u671F\u5BF9\u8C61(Date) \u6269\u5C55\u5BF9\u8C61\u57FA\u5143
    var coreDate = function () { return Date.apply(this, arguments); };
    //  \u5B9A\u4E49 \u6570\u503C\u5BF9\u8C61(Number) \u6269\u5C55\u5BF9\u8C61\u57FA\u5143
    var coreNumber = function () { return Number.apply(this, arguments); };
    //  \u5B9A\u4E49 \u6570\u7EC4\u5BF9\u8C61(Array) \u6269\u5C55\u5BF9\u8C61\u57FA\u5143
    var coreArray = function () { return Array.apply(this, arguments); };
    //  \u5B9A\u4E49 \u5E03\u5C14\u503C\u5BF9\u8C61(Boolean) \u6269\u5C55\u5BF9\u8C61\u57FA\u5143
    var coreBoolean = function () { return Boolean.apply(this, arguments); };
    //  \u5B9A\u4E49 \u901A\u7528\u5DE5\u5177\u65B9\u6CD5 \u6269\u5C55\u5BF9\u8C61\u57FA\u5143
    var coreUtil = function () { return Object.apply(this, arguments); };
    //  \u5B9A\u4E49 \u7A7A\u503C \u96C6\u5408\u57FA\u5143
    var coreNullable = {};
    //  \u5B9A\u4E49 jQuery \u6269\u5C55\u5BF9\u8C61\u57FA\u5143
    var coreJquery = function () { return $.apply(this, arguments); };
    //  \u5B9A\u4E49 HTML5 \u5DE5\u5177\u7EC4\u4EF6\u5BF9\u8C61\u57FA\u5143
    var coreHtml5 = {};

    coreString.fn = coreString.prototype = {};
    coreDate.fn = coreDate.prototype = {};
    coreNumber.fn = coreNumber.prototype = {};
    coreArray.fn = coreArray.prototype = {};
    coreBoolean.fn = coreBoolean.prototype = {};
    coreUtil.fn = coreUtil.prototype = {};
    coreJquery.fn = coreJquery.prototype = {};

    coreNullable.String = new String();
    coreNullable.Function = new Function();
    coreNullable.Date = new Date();
    coreNullable.Bool = new Boolean();
    coreNullable.Object = new Object();
    coreNullable.Number = new Number();

    coreJquery.string = coreString;
    coreJquery.date = coreDate;
    coreJquery.number = coreNumber;
    coreJquery.array = coreArray;
    coreJquery.boolean = coreBoolean;
    coreJquery.util = coreUtil;
    coreJquery.nullable = coreNullable;
    coreJquery.html5 = coreHtml5;



    var document = coreUtil.document = window.document,
        location = coreUtil.location = window.location,
        docElem = coreUtil.docElem = document.documentElement,
        history = coreUtil.history = window.history,
        parent = coreUtil.parent = window.parent,
        top = coreUtil.top = window.top;
    var $$ = coreJquery.emptyJquery = coreJquery.empty$ = coreJquery.$$ = coreUtil.emptyJquery = coreUtil.empty$ = coreUtil.$$ = $();
    var version = "2013-10-22",
        core_array = [],
        core_trim = version.trim,
        core_push = core_array.push,
        core_slice = core_array.slice,
        core_splice = core_array.splice,
        core_sort = core_array.sort,
        core_isArray = Array.isArray;

    //  \u5B9A\u4E49\u7248\u672C
    coreUtil.version = version;

    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript \u5DE5\u5177\uFF0C\u63D0\u4F9B\u5E38\u7528\u7684 js \u5DE5\u5177\u65B9\u6CD5\u3002
    //  \u5305\u62EC\u89E3\u6790\u548C\u5224\u65AD\u5BF9\u8C61\u7684\u7C7B\u578B、url \u89E3\u6790\u7B49\u529F\u80FD\u3002
    ///////////////////////////////////////////////////////////////////////////////////////////////


    //  \u83B7\u53D6\u6307\u5B9A\u5BF9\u8C61\u7684\u7C7B\u578B\u3002
    coreUtil.type = $.type;

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u662F\u7A97\u53E3\uFF08\u6709\u53EF\u80FD\u662FFrame\uFF09\u3002
    coreUtil.isWindow = $.isWindow;

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u662F\u5E03\u5C14\uFF08Boolean\uFF09\u7C7B\u578B\u503C\u3002
    coreUtil.isBoolean = function (obj) { return coreUtil.type(obj) == "boolean"; };

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u662F\u5B57\u7B26\u4E32\uFF08String\uFF09\u7C7B\u578B\u503C\u3002
    coreUtil.isString = function (obj) { return coreUtil.type(obj) == "string"; };

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u662F\u65E5\u671F\uFF08Date\uFF09\u7C7B\u578B\u503C\u3002
    coreUtil.isDate = function (obj) { return coreUtil.type(obj) == "date"; };

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u662F\u6B63\u5219\u8868\u8FBE\u5F0F\uFF08RegExp\uFF09\u3002
    coreUtil.isRegExp = function (obj) { return coreUtil.type(obj) == "regexp"; };

    //  \u6D4B\u8BD5\u4F20\u5165\u7684\u53C2\u6570\u662F\u5426\u662F\u4E00\u4E2A javscript \u5BF9\u8C61\uFF1B
    coreUtil.isObject = function (obj) { return coreUtil.type(obj) == "object"; };

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u662F\u6570\u7EC4\uFF08Array\uFF09\u3002
    coreUtil.isArray = $.isArray;

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u662F\u51FD\u6570\u3002
    //  \u6CE8\u610F\uFF1A\u5728IE\u6D4F\u89C8\u5668\u91CC\uFF0C\u6D4F\u89C8\u5668\u63D0\u4F9B\u7684\u51FD\u6570\u6BD4\u5982'alert'\u8FD8\u6709 DOM \u5143\u7D20\u7684\u65B9\u6CD5\u6BD4\u5982 'getAttribute' \u5C06\u4E0D\u8BA4\u4E3A\u662F\u51FD\u6570\u3002
    coreUtil.isFunction = $.isFunction;

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u662F\u6570\u5B57\u3002
    //  \u65B9\u6CD5\u68C0\u67E5\u5B83\u7684\u53C2\u6570\u662F\u5426\u4EE3\u8868\u4E00\u4E2A\u6570\u503C\u3002\u5982\u679C\u662F\u8FD9\u6837\uFF0C\u5B83\u8FD4\u56DE true\u3002\u5426\u5219\uFF0C\u5B83\u8FD4\u56DEfalse\u3002\u8BE5\u53C2\u6570\u53EF\u4EE5\u662F\u4EFB\u4F55\u7C7B\u578B\u7684\u3002
    coreUtil.isNumeric = $.isNumeric;

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u662F\u7A7A\u5BF9\u8C61\uFF08\u4E0D\u5305\u542B\u4EFB\u4F55\u5C5E\u6027\uFF09\u3002
    //  \u8FD9\u4E2A\u65B9\u6CD5\u65E2\u68C0\u6D4B\u5BF9\u8C61\u672C\u8EAB\u7684\u5C5E\u6027\uFF0C\u4E5F\u68C0\u6D4B\u4ECE\u539F\u578B\u7EE7\u627F\u7684\u5C5E\u6027\uFF08\u56E0\u6B64\u6CA1\u6709\u4F7F\u7528hasOwnProperty\uFF09\u3002
    coreUtil.isEmptyObject = $.isEmptyObject;

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u4E3A\u7A7A\uFF08\u4E0D\u5305\u542B\u4EFB\u4F55\u5C5E\u6027\u7684\u7A7A\u5BF9\u8C61、null、undefined、\u7A7A\u5B57\u7B26\u4E32、\u5168\u7A7A\u683C\uFF09\u3002
    //  \u8FD9\u4E2A\u65B9\u6CD5\u65E2\u68C0\u6D4B\u5BF9\u8C61\u672C\u8EAB\u7684\u5C5E\u6027\uFF0C\u4E5F\u68C0\u6D4B\u4ECE\u539F\u578B\u7EE7\u627F\u7684\u5C5E\u6027\uFF08\u56E0\u6B64\u6CA1\u6709\u4F7F\u7528hasOwnProperty\uFF09\u3002
    coreUtil.isEmptyObjectOrNull = function (obj) {
        switch (coreUtil.type(obj)) {
            case "string":
                return coreString.isNullOrWhiteSpace(obj);
            case "array":
                return obj.length == 0;
            case "date":
                return Date.parse(obj) == 0;
            case "object":
                return coreUtil.isEmptyObject(obj);
        }
        return obj == null || obj == undefined;
    };

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u662F\u7EAF\u7CB9\u7684\u5BF9\u8C61\uFF08\u901A\u8FC7 "{}" \u6216\u8005 "new Object" \u521B\u5EFA\u7684\uFF09\u3002
    coreUtil.isPlainObject = $.isPlainObject;

    //  \u6D4B\u8BD5\u5BF9\u8C61\u662F\u5426\u662F jQuery \u5BF9\u8C61\u3002
    coreUtil.isJqueryObject = function (obj) { return obj != null && obj != undefined && (obj.jquery || obj.constructor === $$.constructor); };

    //  \u5224\u65AD\u5BF9\u8C61\u662F\u5426\u662F\u4E00\u4E2A\u7A7A\u7684 jQuery \u5BF9\u8C61(\u4E0D\u5305\u542B\u4EFB\u4F55 DOM \u5143\u7D20\uFF0C\u5373 length = 0)\u3002
    coreUtil.isEmptyJquery = coreUtil.isEmptyJqueryObject = function (obj) { return coreUtil.isJqueryObject(obj) && !obj.length; };

    //  \u5B9A\u4E49\u4E00\u4E2A\u7A7A\u51FD\u6570
    coreUtil.noop = coreUtil.isFunction($.noop) ? $.noop : function () { };

    //  \u5224\u65AD\u4F20\u5165\u7684\u5B57\u7B26\u4E32\u662F\u5426\u4E3ANull\u6216\u8005\u4E3A\u7A7A\u5B57\u7B26\u4E32\u6216\u8005\u5168\u662F\u7A7A\u683C\u3002
    coreUtil.trim = $.trim;

    //  \u5C06\u4E00\u4E2A DOM \u5BF9\u8C61\u6216\u8005\u8868\u8FBE\u5F0F\u89E3\u6790\u4E3A jQuery \u5BF9\u8C61\uFF1B
    //  \u5982\u679C\u8BE5\u5BF9\u8C61\u672C\u8EAB\u5C31\u5DF2\u7ECF\u662F\u4E00\u4E2A jQuery \u5BF9\u8C61\uFF0C\u5219\u76F4\u63A5\u5C06\u5176\u8FD4\u56DE\u3002
    coreUtil.parseJqueryObject = coreUtil.parseJquery = function (obj) { return coreUtil.isJqueryObject(obj) ? obj : $(obj); };

    //  \u68C0\u6D4B\u4E00\u4E2A\u5BF9\u8C61\u662F\u5426\u4E3A\u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u6216\u8005\u7C7B\u4F3C\u4E8E\u6570\u7EC4\u5BF9\uFF08\u5177\u6709\u6570\u7EC4\u7684\u8BBF\u95EE\u65B9\u5F0F\uFF1A\u5177\u6709 length \u5C5E\u6027、\u4E14\u5177\u6709\u5C5E\u6027\u540D\u4E3A\u6570\u5B57\u7684\u7D22\u5F15\u8BBF\u95EE\u5668\uFF09
    //  \u6CE8\u610F\uFF1A\u6B64\u65B9\u6CD5\u4F20\u5165 \u5B57\u7B26\u4E32 \u65F6\u6267\u884C\uFF0C\u4E5F\u4F1A\u8FD4\u56DE true\uFF0C\u56E0\u4E3A \u5B57\u7B26\u4E32 \u662F\u4E00\u4E2A\u5B57\u7B26\u6570\u7EC4\u3002
    coreUtil.likeArray = function (obj) {
        if (obj == null || obj == undefined) { return false; }
        var length = obj.length, type = coreUtil.type(obj);
        if (coreUtil.isWindow(obj)) { return false; }
        if (obj.nodeType === 1 && length) { return true; }
        return type === "array" || type !== "function" && coreUtil.isNumeric(length) && length >= 0;
    };

    //  \u83B7\u53D6\u5F53\u524D\u9875\u9762 url \u53C2\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8BE5\u65B9\u6CD5\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u90FD\u662F\u4E00\u4E2A JSON \u5BF9\u8C61\uFF0C\u8BE5 JSON \u5BF9\u8C61\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
    //      name:   \u8868\u793A url \u53C2\u6570\u7684\u540D\u79F0\uFF1B
    //      value:  \u8868\u793A url \u53C2\u6570\u7684\u503C\uFF1B
    //  \u4E5F\u53EF\u4EE5\u901A\u8FC7\u6570\u7EC4\u8BBF\u95EE\u5668\u5FEB\u901F\u8BBF\u95EE\u67D0\u4E2A\u7279\u5B9A\u540D\u79F0\u7684\u53C2\u6570\u503C\uFF0C\u65B9\u6CD5\u5982\uFF1AcoreUtil.getRequest()["id"]\u3002
    coreUtil.getRequest = function () {
        var search = window.location.search;
        if (search.substr(0, 1) == "?") { search = search.substr(1, search.length - 1); }
        var result = [];
        if (search.length > 0) {
            var params = search.split("&");
            for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var pos = param.indexOf("=");
                var name = param.substring(0, pos);
                var value = param.substr(pos + 1);
                result.push({ name: name, value: value });
                result[name] = value;
            }
        }
        return result;
    };
    coreUtil.request = coreUtil.getRequest();

    //  \u751F\u6210\u4E00\u4E2A Guid(\u5168\u7403\u552F\u4E00\u6807\u8BC6\u7B26) \u503C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      format: String \u7C7B\u578B\u503C\uFF0C\u4E00\u4E2A\u5355\u683C\u5F0F\u8BF4\u660E\u7B26\uFF0C\u5B83\u6307\u793A\u5982\u4F55\u683C\u5F0F\u5316\u6B64 Guid \u7684\u503C\u3002‎format \u53C2\u6570\u53EF\u4EE5\u662F\uFF1A
    //          "N":    \u8FD4\u56DE\u503C\u7684\u683C\u5F0F 32 \u4F4D(xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)
    //          "D":    \u8FD4\u56DE\u503C\u7684\u683C\u5F0F \u7531\u8FDE\u5B57\u7B26\u5206\u9694\u7684 32 \u4F4D\u6570\u5B57(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    //          "B":    \u8FD4\u56DE\u503C\u7684\u683C\u5F0F \u62EC\u5728\u5927\u62EC\u53F7\u4E2D、\u7531\u8FDE\u5B57\u7B26\u5206\u9694\u7684 32 \u4F4D\u6570\u5B57({xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx})
    //          "P":    \u8FD4\u56DE\u503C\u7684\u683C\u5F0F \u62EC\u5728\u5706\u62EC\u53F7\u4E2D、\u7531\u8FDE\u5B57\u7B26\u5206\u9694\u7684 32 \u4F4D\u6570\u5B57((xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx))
    //          \u5982\u679C format \u4E3A null \u6216\u7A7A\u5B57\u7B26\u4E32 ("")\uFF0C\u5219\u4F7F\u7528 "D"\u3002
    //      length: Number \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u8FD4\u56DE\u5B57\u7B26\u4E32\u7684\u957F\u5EA6\uFF1B\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5219\u5168\u90E8\u8FD4\u56DE\u3002
    coreUtil.guid = function (format, length) {
        format = coreUtil.isString(format) ? format.toLowerCase() : "d";
        var ret = "";
        for (var i = 1; i <= 32; i++) {
            ret += Math.floor(Math.random() * 16.0).toString(16);
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) { ret += "-"; }
        }
        switch (format) {
            case "n": ret = coreString.replaceAll(ret, "-", ""); break;
            case "b": ret = "{" + ret + "}"; break;
            case "p": ret = "(" + ret + ")"; break;
            case "d": default: break;
        }
        return coreUtil.isNumeric(length) && length > 0 && length <= ret.length ? coreString.left(ret, length) : ret;
    };

    //  \u83B7\u53D6\u5F53\u524D\u5E94\u7528\u7A0B\u5E8F\u7684\u5B8C\u6574\u4E3B\u673A\u5730\u5740\u90E8\u5206\uFF0C\u8FD4\u56DE\u7684\u7ED3\u679C\u683C\u5F0F\u5982( http://127.0.0.1 )
    coreUtil.getHostPath = function () {
        var href = window.location.href;
        var pathname = window.location.pathname;
        return href.substr(0, href.lastIndexOf(pathname));
    };
    coreUtil.hostPath = coreUtil.getHostPath();

    //  \u8FD4\u56DE\u5F53\u524D\u9875\u9762\u4E0D\u5E26\u53C2\u6570\u7684\u5B8C\u6574\u8DEF\u5F84\u3002
    coreUtil.currentUri = coreUtil.hostPath + window.location.pathname;

    //  \u8FD4\u56DE\u5F53\u524D\u9875\u9762\u6240\u5728\u76EE\u5F55\u7684\u5B8C\u6574\u8DEF\u5F84\u3002
    coreUtil.currentPath = coreUtil.currentUri.substr(0, coreUtil.currentUri.lastIndexOf("/"));

    //  \u8868\u793A\u5F53\u524D\u5E94\u7528\u7A0B\u5E8F\u6240\u5D4C\u5957\u7684\u865A\u62DF\u76EE\u5F55\u7684\u5C42\u6570\u3002\u9ED8\u8BA4\u4E3A 0\uFF0C\u8868\u793A\u672A\u5D4C\u5957\u865A\u62DF\u76EE\u5F55\u3002
    coreUtil.rootDegree = 0;

    //  \u8FD4\u56DE\u5F53\u524D\u5E94\u7528\u7A0B\u5E8F\uFF08\u542B\u7AD9\u70B9\u540D\u6216\u8005\u865A\u62DF\u76EE\u5F55\u8DEF\u5F84\uFF09\u7684\u5B8C\u6574\u6839\u8DEF\u5F84\u3002
    //  \u8BE5\u65B9\u6CD5\u4F9D\u8D56\u4E8E\u5168\u5C40\u53C2\u6570 coreUtil.rootDegree \u7684\u503C\u3002
    //  coreUtil.rootDegree \u8BE5\u5168\u5C40\u53C2\u6570\u8868\u793A \u865A\u62DF\u76EE\u5F55 \u7684\u5C42\u6570\u3002
    //  coreUtil.rootDegree \u53C2\u6570\u8BBE\u7F6E\u6B63\u786E\uFF0C\u8BE5\u65B9\u6CD5\u65B9\u80FD\u8FD4\u56DE\u6B63\u786E\u7684\u7ED3\u679C\u3002
    //  coreUtil.rootDegree \u9ED8\u8BA4\u503C\u4E3A 0\uFF0C\u5373\u5E94\u7528\u7A0B\u5E8F\u6CA1\u6709\u8BBE\u7F6E\u865A\u62DF\u76EE\u5F55\u3002
    coreUtil.getRootPath = function () {
        var result = coreUtil.hostPath;
        var pathname = window.location.pathname;
        if (pathname.indexOf("/") > -1) {
            var paths = pathname.split("/");
            var temps = new Array();
            for (var i = 0; i < paths.length; i++) { if (paths[i].length > 0) { temps.push(paths[i]); } }
            for (var i = 0; i < coreUtil.rootDegree && i < temps.length; i++) { result += "/" + temps[i]; }
        }
        return result;
    }
    coreUtil.rootPath = coreUtil.getRootPath();

    //  \u6839\u636E\u4F20\u5165\u7684 uri \u5730\u5740\u8FD4\u56DE\u8BE5 uri \u76F8\u5BF9\u4E8E\u5E94\u7528\u7A0B\u5E8F\u7684\u5B8C\u6574\u5BA2\u6237\u7AEF\u8BBF\u95EEurl\u5730\u5740\u3002
    //  \u4F20\u5165\u7684 uri \u5730\u5740\u5E94\u4E3A\u76F8\u5BF9\u4E8E\u5E94\u7528\u7A0B\u5E8F\u6839\u8DEF\u5F84\u7684\u5B8C\u6574\u5730\u5740\u3002
    //  \u8BE5\u65B9\u6CD5\u4F9D\u8D56\u4E8E\u5F53\u524D\u6587\u4EF6\u7684 coreUtil.rootPath \u5C5E\u6027\u3002
    coreUtil.resolveClientUrl = coreUtil.resolveUrl = function (url) {
        url = String(url);
        if (coreString.isNullOrEmpty(url)) { return url; }
        if (coreString.isUrl(url)) { return url; }
        url = coreString.replaceAll(url, "\\", "/");
        while (url.substring(0, 2) == "./" || url.substring(0, 1) == "/") { url = url.substring(1, url.length); }
        var tmps1 = coreUtil.rootPath.split("/");
        var tmps2 = url.split("/");
        while (tmps1.length > 3 && tmps2.length > 1 && tmps2[0] == "..") { tmps1.pop(); tmps2.shift(); }
        while (tmps2.length > 1 && tmps2[0] == "..") { tmps2.shift(); }
        return tmps1.join("/") + "/" + tmps2.join("/");
    };

    //  \u5728\u4E0D\u5F39\u51FA\u5173\u95ED\u63D0\u793A\u786E\u8BA4\u7684\u60C5\u51B5\u4E0B\u76F4\u63A5\u5173\u95ED\u5F53\u524D\u6D4F\u89C8\u5668\u7A97\u53E3\u3002
    coreUtil.closeWindowNoConfirm = function () {
        coreUtil.top.opener = null;
        coreUtil.top.open('', '_self', '');
        coreUtil.top.close();
    };

    //  \u5173\u95ED\u5F53\u524D\u6D4F\u89C8\u5668\u7A97\u53E3\uFF0C\u540C window.close\u3002
    coreUtil.closeWindow = window.close;

    //  \u5C4F\u853D\u5F53\u524D\u9875\u9762\u7684 HTML \u6E90\u4EE3\u7801\u3002
    //  \u6709 bug\uFF0C\u4E0D\u5EFA\u8BAE\u4F7F\u7528\u3002
    coreUtil.shieldSourceCode = function () {
        var source = document.body.innerHTML;  //\u83B7\u53D6\u6587\u6863\u7684\u539F\u6709\u5185\u5BB9
        document.open();                 //\u6253\u5F00\u6587\u6863
        document.close();                //\u5173\u95ED\u6587\u6863
        document.body.innerHTML = source;  //\u91CD\u65B0\u5199\u5165\u65E7\u5185\u5BB9
    };

    //  \u5C4F\u853D\u5F53\u524D\u9875\u9762\u7684\u9F20\u6807\u53F3\u952E\u9ED8\u8BA4\u4E8B\u4EF6\uFF0C\u800C\u8C03\u7528\u6307\u5B9A\u7684\u56DE\u8C03\u51FD\u6570\u3002
    //  \u5982\u679C\u56DE\u8C03\u51FD\u6570\u4E3A\u7A7A\uFF0C\u5219\u70B9\u51FB\u9F20\u6807\u53F3\u952E\u6CA1\u6709\u4EFB\u4F55\u53CD\u5E94\u3002
    coreUtil.shieldContxtMenuEvent = function (callback) {
        document.oncontextmenu = function (e) {
            e.preventDefault();
            if (callback && coreUtil.type(callback) == "function") { callback.apply(this, arguments); }
        };
    };


    function _loadJs(url, callback) {
        url = coreUtil.resolveUrl(url);
        var heads = document.getElementsByTagName("head");
        var scripts = heads[0].getElementsByTagName("script");
        var isFunc = coreUtil.isFunction(callback);
        for (var i = 0; i < scripts.length; i++) {
            var s = scripts[i];
            if (s.src == url) { if (isFunc) { callback.call(s); } return; }
        }
        var done = false;
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.language = "javascript";
        script.src = url;
        script.onload = script.onreadystatechange = function () {
            if (!done && (!script.readyState || script.readyState == "loaded" || script.readyState == "complete")) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if (isFunc) { callback.call(script); }
            }
        };
        heads[0].appendChild(script);
    }
    function _loadCss(url, callback) {
        url = coreUtil.resolveUrl(url);
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.media = "screen";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
        var isFunc = coreUtil.isFunction(callback);
        if (isFunc) { callback.call(link); }
    }

    //  \u52A8\u6001\u5F15\u5165\u4E00\u4E2A\u6216\u591A\u4E2A javascript \u811A\u672C\u6587\u4EF6\u81F3\u5F53\u524D\u9875\u9762\u6587\u6863\uFF0C\u5E76\u5728\u5F15\u5165\u6210\u529F\u540E\u8C03\u7528\u6307\u5B9A\u7684\u56DE\u8C03\u51FD\u6570\u3002
    //  \u53C2\u6570 url \u8868\u793A\u9700\u8981\u8F7D\u5165\u7684 javascript \u811A\u672C\u8DEF\u5F84\uFF1B\u5982\u679C\u9700\u8981\u4E00\u6B21\u6027\u8F7D\u5165\u591A\u4E2A\u811A\u672C\uFF0C\u5219 url \u53EF\u4EE5\u662F\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u6BCF\u4E2A\u5143\u7D20\u8868\u793A javascript \u811A\u672C\u8DEF\u5F84\u3002
    coreUtil.loadJs = function (url, callback) {
        if (coreUtil.likeArray(url) && !coreUtil.isString(url)) {
            for (var i = 0; i < url.length; i++) {
                var fn = (i == url.length - 1) ? callback : null;
                _loadJs(url[i], fn);
            }
        } else { _loadJs(url, callback); }
    };

    //  \u4E00\u6B21\u6027\u6267\u884C\u67D0\u4E2A javascript \u811A\u672C\u6587\u4EF6\uFF0C\u5E76\u5728\u6267\u884C\u6210\u529F\u540E\u8C03\u7528\u6307\u5B9A\u7684\u56DE\u8C03\u51FD\u6570\u3002
    coreUtil.runJs = function (url, callback) {
        var isFunc = coreUtil.isFunction(callback);
        _loadJs(url, function () {
            document.getElementsByTagName("head")[0].removeChild(this);
            if (isFunc) { callback(); }
        });
    };

    //  \u52A8\u6001\u5F15\u5165\u4E00\u4E2A\u6216\u591A\u4E2A css \u6837\u5F0F\u8868\u6587\u4EF6\u81F3\u5F53\u524D\u9875\u9762\u6587\u6863\uFF0C\u5E76\u5728\u5F15\u5165\u6210\u529F\u540E\u8C03\u7528\u6307\u5B9A\u7684\u56DE\u8C03\u51FD\u6570\u3002
    coreUtil.loadCss = function (url, callback) {
        if (coreUtil.likeArray(url) && !coreUtil.isString(url)) {
            for (var i = 0; i < url.length; i++) {
                var fn = (i == url.length - 1) ? callback : null;
                _loadCss(url, fn);
            }
        } else {
            _loadCss(url, callback);
        }
    };

    //  \u5BF9\u67D0\u4E2A\u5BF9\u8C61\u53CA\u5176\u6240\u6709\u53EF\u89C1\u5C5E\u6027\u8FDB\u884C\u591A\u6B21\u5D4C\u5957\u9012\u5F52\u5FAA\u73AF\u8C03\u7528\u67D0\u4E2A\u65B9\u6CD5\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      obj:    \u76EE\u6807\u5BF9\u8C61
    //      call:   \u8981\u88AB\u9488\u5BF9\u76EE\u6807\u5BF9\u8C61\u5FAA\u73AF\u8C03\u7528\u7684\u65B9\u6CD5
    //      times:  \u5D4C\u5957\u7684\u5C42\u6570
    coreUtil.eachCall = function (obj, call, times) {
        if (!coreUtil.isFunction(call)) { return; }
        if (obj == undefined) { obj = coreNullable.Object; }
        if (times == undefined || times < 0) { times = 1; }
        if (times == 0) { return obj; }
        call.call(this, obj);
        for (var i = 1; i <= times; i++) { for (var key in obj) { coreUtil.eachCall.call(this, obj[key], call, times - 1); } }
    };

    //  \u963B\u6B62\u5411\u5BF9\u8C61\u6DFB\u52A0\u65B0\u5C5E\u6027\u3002
    //  \u6A21\u62DF Object.preventExtensions \u65B9\u6CD5\uFF1B
    coreUtil.preventExtensions = function (obj, times) {
        coreUtil.eachCall.call(this, obj, Object.preventExtensions, times);
    };
    //  \u963B\u6B62\u4FEE\u6539\u73B0\u6709\u5C5E\u6027\u7684\u7279\u6027\uFF0C\u5E76\u963B\u6B62\u6DFB\u52A0\u65B0\u5C5E\u6027\u3002
    //  \u6A21\u62DF Object.seal \u65B9\u6CD5\uFF1B
    coreUtil.seal = function (obj, times) {
        coreUtil.eachCall.call(this, obj, Object.seal, times);
    };
    //  \u963B\u6B62\u4FEE\u6539\u73B0\u6709\u5C5E\u6027\u7684\u7279\u6027\u548C\u503C\uFF0C\u5E76\u963B\u6B62\u6DFB\u52A0\u65B0\u5C5E\u6027\u3002
    //  \u6A21\u62DF Object.freeze \u65B9\u6CD5\uFF1B
    coreUtil.freeze = function (obj, times) {
        coreUtil.eachCall.call(this, obj, Object.freeze, times);
    };

    //  \u5728\u6307\u5B9A\u7684\u6BEB\u79D2\u6570\u540E\u8C03\u7528\u51FD\u6570\u6216\u8BA1\u7B97\u8868\u8FBE\u5F0F\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      code:       \u5FC5\u9700\u3002\u8981\u8C03\u7528\u7684\u51FD\u6570\u540E\u8981\u6267\u884C\u7684 JavaScript \u4EE3\u7801\u4E32\u3002
    //      millisec:   \u53EF\u9009\u3002\u5728\u6267\u884C\u4EE3\u7801\u524D\u9700\u7B49\u5F85\u7684\u6BEB\u79D2\u6570\u3002
    //  \u6A21\u62DF setTimeout/setImmediate \u65B9\u6CD5\u3002
    //  \u5907\u6CE8\uFF1A\u5982\u679C\u4E0D\u4F20\u5165\u53C2\u6570 millisec \u6216\u8BE5\u53C2\u6570\u503C\u4E3A 0\uFF0C\u5219\u81EA\u52A8\u8C03\u7528 setImmediate(\u8BE5\u65B9\u6CD5\u76F8\u5BF9\u4E8E setTimeout \u53EF\u4EE5\u6709\u6548\u964D\u4F4E\u6D4F\u89C8\u5668\u8D44\u6E90\u5F00\u9500) \u65B9\u6CD5\uFF1B
    coreUtil.exec = function (code, millisec) {
        if (!code) { return; }
        return !millisec && window.setImmediate ? window.setImmediate(code) : window.setTimeout(code, millisec);
    };



    var _matched, _browser;
    var _userAgentMatch = function (userAgent) {
        userAgent = userAgent.toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(userAgent) ||
		    /(webkit)[ \/]([\w.]+)/.exec(userAgent) ||
		    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(userAgent) ||
		    /(msie) ([\w.]+)/.exec(userAgent) ||
		    userAgent.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent) || [];
        return { browser: match[1] || "", version: match[2] || "0" };
    };
    _matched = _userAgentMatch(window.navigator.userAgent);
    _browser = {};
    if (_matched.browser) { _browser[_matched.browser] = true; _browser.version = _matched.version; }
    if (_browser.chrome) { _browser.webkit = true; } else if (_browser.webkit) { _browser.safari = true; }

    //  \u83B7\u53D6\u6D4F\u89C8\u5668\u7684\u540D\u79F0\u4EE5\u53CA\u7248\u672C\u53F7\u3002
    //  \u5224\u65AD\u6D4F\u89C8\u5668\u7248\u672C\u793A\u4F8B\uFF1A\u5224\u65AD\u6D4F\u89C8\u5668\u662F\u5426\u4E3AIE\uFF1A  coreUtil.browser.msie == true\uFF0C\u5224\u65AD\u6D4F\u89C8\u5668\u662F\u5426\u4E3A Chrome\uFF1Awindow.browser.chrome == true
    //  \u5224\u65AD\u6D4F\u89C8\u5668\u7248\u672C\u53F7\uFF1AcoreUtil.browser.version\uFF0CIE\u4E0B\u53EF\u80FD\u7684\u503C\u4E3A 6.0/7.0/8.0/9.0/10.0 \u7B49\u7B49\u3002
    coreUtil.browser = _browser;




    //  \u5B9A\u4E49\u9ED8\u8BA4\u7684\u5BF9\u8C61\u6BD4\u8F83\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A bool \u503C\u8868\u793A\u4F20\u5165\u7684\u4E24\u4E2A\u5BF9\u8C61\u662F\u5426\u7B49\u503C\u3002
    coreUtil.equalsCompare = function (item1, item2) { return item1 == item2; };

    //  \u5B9A\u4E49\u9ED8\u8BA4\u7684\u6570\u503C\u6BD4\u8F83\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A int \u503C\uFF0C\u8BE5\u8FD4\u56DE\u503C\u7684\u610F\u4E49\u5982\u4E0B\uFF1A
    //      \u5982\u679C\u5927\u4E8E 0\uFF0C\u5219\u8868\u793A a > b\uFF1B
    //      \u5982\u679C\u5C0F\u4E8E 0\uFF0C\u5219\u8868\u793A a < b\uFF1B
    //      \u5982\u679C\u7B49\u4E8E 0\uFF0C\u5219\u8868\u793A a == b\u3002
    coreUtil.numericCompare = function (a, b) {
        if (!coreUtil.isNumeric(a) && coreString.isNumeric(a)) { a = parseFloat(a, 10); }
        if (!coreUtil.isNumeric(b) && coreString.isNumeric(b)) { b = parseFloat(b, 10); }
        if (a > b) { return 1; } else if (a < b) { return -1; } else { return 0; }
    };

    //  \u786E\u8BA4\u4E24\u4E2A javascript \u5BF9\u8C61\u662F\u5426\u7B49\u503C\uFF0C\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570:
    //      item1: \u5F85\u6BD4\u8F83\u7684\u5BF9\u8C611\uFF1B
    //      item2: \u5F85\u6BD4\u8F83\u7684\u5BF9\u8C612\uFF0C\u7528\u4E8E\u548C\u5BF9\u8C611\u8FDB\u884C\u6BD4\u8F83\uFF1B
    //      compare: \u7528\u4E8E\u6BD4\u8F83\u8FD0\u7B97\u7684\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u7528\u4E8E\u6BD4\u8F83 item1 \u662F\u5426\u4E0E item2 \u7B49\u503C\uFF1B\u8BE5\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A bool \u503C\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\u3002
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u5E94\u8BE5\u662F function (item1, item2) { }\uFF0C\u53C2\u6570 item1 \u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u9879、item2 \u8868\u793A\u8981\u8FDB\u884C\u6BD4\u8F83\u7684\u9879\uFF1B
    //          \u5982\u679C\u4E0D\u5B9A\u4E49\u53C2\u6570 compare\uFF0C\u5219\u4F7F\u7528\u9ED8\u8BA4\u7684\u6BD4\u8F83\u8FD0\u7B97\u7B26 "==" \u8FDB\u884C\u503C\u7684\u5339\u914D\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C item1 \u4E0E item2 \u7B49\u503C\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
    coreUtil.equals = function (item1, item2, compare) {
        var isFunc = coreUtil.isFunction(compare);
        if (!isFunc) { compare = coreUtil.equalsCompare; }
        return compare.call(this, item1, item2) == true;
    };

    //  \u6BD4\u8F83\u4E24\u4E2A javascript \u5BF9\u8C61\u7684\u5927\u5C0F\uFF0C\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      item1: \u5F85\u6BD4\u8F83\u7684\u5BF9\u8C611\uFF1B
    //      item2: \u5F85\u6BD4\u8F83\u7684\u5BF9\u8C612\uFF0C\u7528\u4E8E\u548C\u5BF9\u8C611\u8FDB\u884C\u6BD4\u8F83\uFF1B
    //      compare: \u6BD4\u8F83\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u6BD4\u8F83 array \u4E2D\u6CA1\u4E24\u9879\u7684\u5927\u5C0F\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\uFF1B
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u4E3A function (a, b) { }\uFF0C\u53C2\u6570 a、b \u5206\u522B\u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u5F85\u6BD4\u8F83\u5927\u5C0F\u7684\u9879\uFF1B\u8BE5\u51FD\u6570\u5FC5\u987B\u8FD4\u56DE\u4E00\u4E2A\u6570\u503C\u8868\u793A\u6BD4\u8F83\u540E\u7684\u7ED3\u679C\uFF1B
    //              \u5982\u679C a > b \uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A \u5927\u4E8E 0 \u7684\u503C\uFF1B
    //              \u5982\u679C a < b \uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A \u5C0F\u4E8E 0 \u7684\u503C\uFF1B
    //              \u5982\u679C a == b\uFF0C\u5219\u8FD4\u56DE 0\uFF1B
    //          \u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5219\u9ED8\u8BA4\u5C06 array \u4E2D\u7684\u6BCF\u4E00\u9879\u5F53\u4F5C\u6570\u5B57\u6765\u8FDB\u884C\u6BD4\u8F83\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C item1 > item2 \uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A \u5927\u4E8E 0 \u7684\u503C\uFF1B
    //          \u5982\u679C item1 < item2 \uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A \u5C0F\u4E8E 0 \u7684\u503C\uFF1B
    //          \u5982\u679C item1 == item2\uFF0C\u5219\u8FD4\u56DE 0\uFF1B
    coreUtil.compare = function (item1, item2, compare) {
        var isFunc = coreUtil.isFunction(compare);
        if (!isFunc) { compare = coreUtil.numericCompare; }
        return compare.call(this, item1, item2);
    };









    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript \u5B57\u7B26(\u4E32)\u51FD\u6570\u529F\u80FD\u6269\u5145
    /////////////////////////////////////////////////////////////////////////////////////////////// 

    //  \u5224\u65AD\u4F20\u5165\u7684\u5BF9\u8C61\u662F\u5426\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u3002
    coreString.isString = coreUtil.isString;

    //  \u5224\u65AD\u4F20\u5165\u7684\u5B57\u7B26\u4E32\u662F\u5426\u4E3ANull\u6216\u8005\u4E3A\u7A7A\u5B57\u7B26\u4E32\u3002
    coreString.isNullOrEmpty = function (str) { return str === undefined || str === null || str === ""; };
    coreString.prototype.isNullOrEmpty = function () { return coreString.isNullOrEmpty(this); };

    //  \u5224\u65AD\u4F20\u5165\u7684\u5B57\u7B26\u4E32\u662F\u5426\u4E3ANull\u6216\u8005\u4E3A\u7A7A\u5B57\u7B26\u4E32\u6216\u8005\u5168\u662F\u7A7A\u683C\u3002
    coreString.isNullOrWhiteSpace = function (str) { return coreString.isNullOrEmpty(str) || coreString.trim(String(str)) === ""; };
    coreString.prototype.isNullOrWhiteSpace = function () { return coreString.isNullOrWhiteSpace(this); };

    //  \u5224\u65AD\u4F20\u5165\u7684\u5B57\u7B26\u4E32\u662F\u5426\u4E3A HTML \u4EE3\u7801\u6BB5\u3002
    coreString.isHtmlText = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.length >= 3 && str.charAt(0) === "<" && str.charAt(str.length - 1) === ">";
    };
    coreString.prototype.isHtmlText = function () { return coreString.isHtmlText(this); };

    //  \u7528\u65B0\u5B57\u7B26\u4E32\u66FF\u6362\u4E0E\u7ED9\u5B9A\u5B57\u7B26\u4E32\u5339\u914D\u7684\u6240\u6709\u5B50\u4E32\uFF1B\u8BE5\u65B9\u6CD5\u5C06\u8FD4\u56DE\u6E90\u5B57\u7B26\u4E32\u5904\u7406\u540E\u7684\u4E00\u4E2A\u526F\u672C\uFF0C\u800C\u4E0D\u4F1A\u6539\u53D8\u6E90\u5B57\u7B26\u4E32\u7684\u503C\u3002
    coreString.replaceAll = function (str, substr, replacement, ignoreCase) {
        if (!substr || !replacement || substr == replacement) { return str; }
        var regexp = coreUtil.isRegExp(substr) ? substr : new RegExp(String(substr), ignoreCase ? "gm" : "igm");
        return str.replace(regexp, replacement);
    };
    coreString.prototype.replaceAll = function (substr, replacement) { return coreString.replaceAll(this, substr, replacement); };

    //  \u683C\u5F0F\u5316\u5B57\u7B26\u4E32\uFF0C\u7C7B\u4F3C\u4E8E .NET \u4E2D\u7684 string.format \u51FD\u6570\u529F\u80FD
    //  \u4F7F\u7528\u65B9\u6CD5\uFF1AcoreString.format('\u5B57\u7B26\u4E32{0}\u5B57\u7B26\u4E32{1}\u5B57\u7B26\u4E32','\u7B2C\u4E00\u4E2A\u53D8\u91CF','\u7B2C\u4E8C\u4E2A\u53D8\u91CF','\u7B2C\u4E09\u4E2A\u53D8\u91CF', ...'\u7B2C N \u4E2A\u53D8\u91CF');
    //  \u8BE5\u65B9\u6CD5\u5C06\u8FD4\u56DE\u6E90\u5B57\u7B26\u4E32\u5904\u7406\u540E\u7684\u4E00\u4E2A\u526F\u672C\uFF0C\u800C\u4E0D\u4F1A\u6539\u53D8\u6E90\u5B57\u7B26\u4E32\u7684\u503C\u3002
    coreString.format = function (str, arg1, arg2, arg3, argn) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var isArray = coreUtil.likeArray(arg1),
            data = (isArray && !coreUtil.isString(arg1)) || coreUtil.isObject(arg1) ? arg1 : coreArray.range(arguments, 1);
        if (isArray) {
            for (var i = 0; i < data.length; i++) {
                value = data[i] ? data[i] : "";
                str = str.replace(new RegExp("\\{" + i + "}", "gm"), value);
            }
        } else {
            for (var key in data) {
                var value = proxy.call(data, key);
                value = (value == null || value == undefined) ? "" : value;
                str = str.replace(new RegExp("\\{" + key + "}", "gm"), value);
            }
        }
        return str;
        function proxy(key) { try { return eval("this[\"" + key + "\"]"); } catch (ex) { return ""; } }
    };
    coreString.prototype.format = function (arg1, arg2, arg3, argn) {
        arguments = coreArray.insert(arguments, 0, this);
        return coreString.format.apply(this, arguments);
    };

    //  \u5224\u65AD\u5F53\u524D\u5B57\u7B26\u4E32\u5BF9\u8C61\u662F\u5426\u5305\u542B\u6307\u5B9A\u7684\u5B57\u7B26\u4E32\u5185\u5BB9\u3002
    coreString.contains = function (str, val) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return String(str).indexOf(val) > -1;
    };
    coreString.prototype.contains = function (val) { return coreString.contains(this, val); };

    //  \u5B57\u7B26\u4E32\u53CD\u8F6C\uFF1B\u8BE5\u65B9\u6CD5\u5C06\u8FD4\u56DE\u6E90\u5B57\u7B26\u4E32\u5904\u7406\u540E\u7684\u4E00\u4E2A\u526F\u672C\uFF0C\u800C\u4E0D\u4F1A\u6539\u53D8\u6E90\u5B57\u7B26\u4E32\u7684\u503C\u3002
    coreString.reverse = function (str) {
        var charArray = [];
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        for (var i = str.length - 1; i > -1; i--) { charArray.push(str[i]); }
        return charArray.join("");
    };
    coreString.prototype.reverse = function () { return coreString.reverse(this); };

    //  \u53BB\u9664\u5B57\u7B26\u4E32\u5DE6\u8FB9\u7684\u7A7A\u683C\uFF1B\u8BE5\u65B9\u6CD5\u5C06\u8FD4\u56DE\u6E90\u5B57\u7B26\u4E32\u5904\u7406\u540E\u7684\u4E00\u4E2A\u526F\u672C\uFF0C\u800C\u4E0D\u4F1A\u6539\u53D8\u6E90\u5B57\u7B26\u4E32\u7684\u503C\u3002
    coreString.ltrim = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.replace(/(^\s*)/g, "");
    };
    coreString.prototype.ltrim = function () { return coreString.ltrim(this); };

    //  \u53BB\u9664\u5B57\u7B26\u4E32\u53F3\u8FB9\u7684\u7A7A\u683C\uFF1B\u8BE5\u65B9\u6CD5\u5C06\u8FD4\u56DE\u6E90\u5B57\u7B26\u4E32\u5904\u7406\u540E\u7684\u4E00\u4E2A\u526F\u672C\uFF0C\u800C\u4E0D\u4F1A\u6539\u53D8\u6E90\u5B57\u7B26\u4E32\u7684\u503C\u3002
    coreString.rtrim = function () {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.replace(/(\s*$)/g, "");
    };
    coreString.prototype.rtrim = function () { return coreString.rtrim(this); };

    //  \u53BB\u9664\u5B57\u7B26\u4E32\u5DE6\u53F3\u4E24\u8FB9\u7684\u7A7A\u683C\uFF1B\u8BE5\u65B9\u6CD5\u5C06\u8FD4\u56DE\u6E90\u5B57\u7B26\u4E32\u5904\u7406\u540E\u7684\u4E00\u4E2A\u526F\u672C\uFF0C\u800C\u4E0D\u4F1A\u6539\u53D8\u6E90\u5B57\u7B26\u4E32\u7684\u503C\u3002
    coreString.trim = coreUtil.trim;
    coreString.prototype.trim = function () { return coreString.trim(this); };

    //  \u8FD4\u56DE\u4E00\u4E2A\u65B0\u5B57\u7B26\u4E32\uFF0C\u8BE5\u5B57\u7B26\u4E32\u901A\u8FC7\u5728\u6B64\u5B9E\u4F8B\u4E2D\u7684\u5B57\u7B26\u5DE6\u4FA7\u586B\u5145\u7A7A\u683C\u6216\u6307\u5B9A\u5B57\u7B26\u6765\u6765\u8FBE\u5230\u6307\u5B9A\u7684\u603B\u957F\u5EA6\uFF0C\u4ECE\u800C\u4F7F\u8FD9\u4E9B\u5B57\u7B26\u53F3\u5BF9\u9F50\u3002
    coreString.padLeft = function (str, len, paddingChar) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        paddingChar = coreString.isNullOrEmpty(paddingChar) || !paddingChar.length ? " " : paddingChar;
        len = coreUtil.isNumeric(len) ? len : str.length;
        if (str.length < len) { for (; str.length < len; str = paddingChar + str) { } }
        return str;
    };
    coreString.prototype.padLeft = function (len, paddingChar) { return coreString.padLeft(this, len, paddingChar); };

    //  \u8FD4\u56DE\u4E00\u4E2A\u65B0\u5B57\u7B26\u4E32\uFF0C\u8BE5\u5B57\u7B26\u4E32\u901A\u8FC7\u5728\u6B64\u5B57\u7B26\u4E32\u4E2D\u7684\u5B57\u7B26\u53F3\u4FA7\u586B\u5145\u7A7A\u683C\u6216\u6307\u5B9A\u5B57\u7B26\u6765\u8FBE\u5230\u6307\u5B9A\u7684\u603B\u957F\u5EA6\uFF0C\u4ECE\u800C\u4F7F\u8FD9\u4E9B\u5B57\u7B26\u5DE6\u5BF9\u9F50
    coreString.padRight = function (str, len, paddingChar) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        paddingChar = coreString.isNullOrEmpty(paddingChar) || !paddingChar.length ? " " : paddingChar;
        len = coreUtil.isNumeric(len) ? len : str.length;
        if (str.length < len) { for (; str.length < len; str += paddingChar) { } }
        return str;
    };
    coreString.prototype.padRight = function (len, paddingChar) { return coreString.padRight(this, len, paddingChar); };

    //  \u8FD4\u56DE\u5B57\u7B26\u4E32\u4E2D\u7684\u7684\u5B57\u7B26\uFF0C\u6CE8\u610F\u4ECE 0 \u5F00\u59CB\u3002
    coreString.mid = function (str, start, len) {
        if (!start) { start = 0; }
        if (!len) { len = 0; }
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.substr(start, len)
    };
    coreString.prototype.mid = function (start, len) { return coreString.mid(this, start, len); };

    //  \u8BA1\u7B97\u5B57\u7B26\u4E32\u7684\u6253\u5370\u957F\u5EA6\u3002
    coreString.lengthOfPrint = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.replace(/[^\x00-\xff]/g, "**").length;
    };
    coreString.prototype.lengthOfPrint = function () { return coreString.lengthOfPrint(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u4EE5\u6307\u5B9A\u7684\u5B57\u7B26\u4E32\u5F00\u5934\u3002
    coreString.startsWith = function (str, val) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.substr(0, val.length) == val
    };
    coreString.prototype.startsWith = function (val) { return coreString.startsWith(this, val); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u4EE5\u6307\u5B9A\u7684\u5B57\u7B26\u4E32\u7ED3\u5C3E\u3002
    coreString.endsWith = function (str, val) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return str.substr(str.length - val.length) == val;
    };
    coreString.prototype.endsWith = function (val) { return coreString.endsWith(this, val); };

    //  \u622A\u53D6\u5F53\u524D\u5B57\u7B26\u4E32\u5DE6\u8FB9\u7684\u6307\u5B9A\u957F\u5EA6\u5185\u5BB9\u3002
    coreString.left = function (str, len) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        if (!coreUtil.isNumeric(len)) { len = parseInt(len, 10); }
        if (len < 0 || len > str.length) { len = str.length; }
        return str.substr(0, len);
    };
    coreString.prototype.left = function (len) { return coreString.left(this, len); };

    //  \u622A\u53D6\u5F53\u524D\u5B57\u7B26\u4E32\u53F3\u8FB9\u7684\u6307\u5B9A\u957F\u5EA6\u5185\u5BB9\u3002
    coreString.right = function (str, len) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        if (!coreUtil.isNumeric(len)) { len = parseInt(len, 10); }
        if (len < 0 || len > str.length) { len = str.length; }
        return str.substring(str.length - len, str.length);
    };
    coreString.prototype.right = function (len) { return coreString.right(this, len); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684\u957F\u65E5\u671F\u683C\u5F0F\u3002
    coreString.isLongDate = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if (r == null) { return false; }
        var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
    };
    coreString.prototype.isLongDate = function () { return coreString.isLongDate(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684\u6BB5\u65E5\u671F\u683C\u5F0F\u3002
    coreString.isShortDate = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) { return false; }
        var d = new Date(r[1], r[3] - 1, r[4]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    };
    coreString.prototype.isShortDate = function () { return coreString.isShortDate(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684\u65E5\u671F\u683C\u5F0F\u3002
    coreString.isDate = function (str) {
        return coreString.isLongDate(str) || coreString.isShortDate(str);
    };
    coreString.prototype.isDate = function () { return coreString.isDate(this); };

    //  \u5224\u65AD\u5F53\u524D String \u72EC\u4EAB\u662F\u5426\u662F\u6B63\u786E\u7684\u7535\u8BDD\u53F7\u7801\u683C\u5F0F(\u4E2D\u56FD)\u3002
    coreString.isTel = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(str);
    };
    coreString.prototype.isTel = function () { return coreString.isTel(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684\u624B\u673A\u53F7\u7801\u683C\u5F0F(\u4E2D\u56FD)\u3002
    coreString.isMobile = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^(13|15|18)\d{9}$/i.test(str);
    };
    coreString.prototype.isMobile = function () { return coreString.isMobile(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684\u7535\u8BDD\u53F7\u7801\u6216\u8005\u624B\u673A\u53F7\u7801\u683C\u5F0F(\u4E2D\u56FD)
    coreString.isTelOrMobile = function (str) {
        return coreString.isTel(str) || coreString.isMobile(str);
    };
    coreString.prototype.isTelOrMobile = function () { return coreString.isTelOrMobile(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684\u4F20\u771F\u53F7\u7801\u683C\u5F0F
    coreString.isFax = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(str);
    };
    coreString.prototype.isFax = function () { return coreString.isFax(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684 \u7535\u5B50\u90AE\u7BB1\u5730\u5740(Email) \u683C\u5F0F\u3002
    coreString.isEmail = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(str);
    };
    coreString.prototype.isEmail = function () { return coreString.isEmail(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684 \u90AE\u653F\u7F16\u7801(\u4E2D\u56FD) \u683C\u5F0F\u3002
    coreString.isZipCode = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[\d]{6}$/.test(str);
    };
    coreString.prototype.isZipCode = function () { return coreString.isZipCode(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u5426\u5B58\u5728\u6C49\u5B57\u5B57\u7B26\u3002
    coreString.existChinese = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        //[\u4E00-\u9FA5]\u70BA\u6F22\u5B57﹐[\uFE30-\uFFA0]\u70BA\u5168\u89D2\u7B26\u865F
        return /^[\x00-\xff]*$/.test(str);
    };
    coreString.prototype.existChinese = function () { return coreString.existChinese(this); };

    //  \u9A8C\u8BC1\u4E2D\u6587
    coreString.isChinese = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[\u0391-\uFFE5]+$/i.test(str);
    };
    coreString.prototype.isChinese = function () { return coreString.isChinese(this); };

    //  \u9A8C\u8BC1\u82F1\u6587
    coreString.isEnglish = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[A-Za-z]+$/i.test(str);
    };
    coreString.prototype.isEnglish = function () { return coreString.isEnglish(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684 \u6587\u4EF6\u540D\u79F0(\u8DEF\u5F84) \u683C\u5F0F\u3002
    coreString.isFileName = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        //return !/[\\\/\*\?\|:"<>]/g.test(str);
        return !/[\\\/\*\?\|:<>]/g.test(str);
    };
    coreString.prototype.isFileName = function () { return coreString.isFileName(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684 IPv4 \u5730\u5740\u683C\u5F0F\u3002
    coreString.isIPv4 = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        if (reSpaceCheck.test(str)) {
            str.match(reSpaceCheck);
            if (RegExp.$1 <= 255 && RegExp.$1 >= 0
                    && RegExp.$2 <= 255 && RegExp.$2 >= 0
                    && RegExp.$3 <= 255 && RegExp.$3 >= 0
                    && RegExp.$4 <= 255 && RegExp.$4 >= 0) {
                return true;
            } else { return false; }
        } else { return false; }
    };
    coreString.prototype.isIPv4 = function () { return coreString.isIPv4(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684 url \u683C\u5F0F\u3002
    coreString.isUrl = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        //        var strRegex = "^((https|http|ftp|rtsp|mms)?:               //)"
        //    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"    //ftp\u7684user@
        //          + "(([0-9]{1,3}\.){3}[0-9]{1,3}"                          // IP\u5F62\u5F0F\u7684URL- 199.194.52.184
        //          + "|"                                                     // \u5141\u8BB8IP\u548CDOMAIN\uFF08\u57DF\u540D\uFF09
        //          + "([0-9a-z_!~*'()-]+\.)*"                                // \u57DF\u540D- www.
        //          + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\."                  // \u4E8C\u7EA7\u57DF\u540D
        //          + "[a-z]{2,6})"                                           // first level domain- .com or .museum
        //          + "|"                                                     // \u5141\u8BB8\u4E3A\u672C\u673A
        //          + "localhost|127.0.0.1"                                   // \u5141\u8BB8\u4E3A\u672C\u673A\u5730\u5740
        //          + "(:[0-9]{1,4})?"                                        // \u7AEF\u53E3- :80
        //          + "((/?)|"                                                // a slash isn't required if there is no file name
        //          + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var strRegex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        var re = new RegExp(strRegex);
        return re.test(str);
    };
    coreString.prototype.isUrl = function () { return coreString.isUrl(this); };

    //  \u5224\u65AD\u662F\u5426\u4E3A\u5408\u6CD5\u7684 ipv4 \u6216\u8005 url \u683C\u5F0F
    coreString.isUrlOrIPv4 = function (str) {
        return coreString.isUrl(str) || coreString.isIP(str);
    };
    coreString.prototype.isUrlOrIPv4 = function () { return coreString.isUrlOrIPv4(this); };

    //  \u5224\u65AD\u662F\u5426\u4E3A\u5408\u6CD5\u7684\u8D27\u5E01\u683C\u5F0F
    coreString.isCurrency = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^d{0,}(\.\d+)?$/i.test(str);
    };
    coreString.prototype.isCurrency = function () { return coreString.isCurrency(this); };

    //  \u5224\u65AD\u662F\u5426\u4E3A\u5408\u6CD5\u7684 QQ \u53F7\u7801\u683C\u5F0F
    coreString.isQQ = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[1-9]\d{4,11}$/i.test(str);
    };
    coreString.prototype.isQQ = function () { return coreString.isQQ(this); };

    //  \u5224\u65AD\u662F\u5426\u4E3A\u5408\u6CD5\u7684 MSN \u5E10\u53F7\u683C\u5F0F
    coreString.isMSN = function (str) {
        return coreString.isEmail(str);
    };
    coreString.prototype.isMSN = function () { return coreString.isMSN(this); };

    //  \u9A8C\u8BC1\u662F\u5426\u5305\u542B\u7A7A\u683C\u548C\u975E\u6CD5\u5B57\u7B26Z
    coreString.isUnNormal = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /.+/i.test(str);
    };
    coreString.prototype.isUnNormal = function () { return coreString.isUnNormal(this); };

    //  \u9A8C\u8BC1\u662F\u5426\u4E3A\u5408\u6CD5\u7684\u8F66\u724C\u53F7\u7801
    coreString.isCarNo = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(str);
    };
    coreString.prototype.isCarNo = function () { return coreString.isCarNo(this); };

    //  \u9A8C\u8BC1\u662F\u5426\u4E3A\u5408\u6CD5\u7684\u6C7D\u8F66\u53D1\u52A8\u673A\u5E8F\u5217\u53F7
    coreString.isCarEngineNo = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[a-zA-Z0-9]{16}$/.test(str);
    };
    coreString.prototype.isCarEngineNo = function () { return coreString.isCarEngineNo(this); };

    //  \u9A8C\u8BC1\u662F\u5426\u53EF\u4EE5\u4F5C\u4E3A\u5408\u6CD5\u7684\u7528\u6237\u540D\u5B57\u7B26(\u5B57\u6BCD\u5F00\u5934\uFF0C\u5141\u8BB86-16\u5B57\u8282\uFF0C\u5141\u8BB8\u5B57\u6BCD\u6570\u5B57\u4E0B\u5212\u7EBF)
    coreString.isUserName = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(str);
    };
    coreString.prototype.isUserName = function () { return coreString.isUserName(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684 \u8EAB\u4EFD\u8BC1\u53F7\u7801(\u4E2D\u56FD) \u683C\u5F0F\u3002
    coreString.isIDCard = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var iSum = 0;
        var info = "";
        var sId = str;
        var aCity = { 11: "\u5317\u4EAC", 12: "\u5929\u6D25", 13: "\u6CB3\u5317", 14: "\u5C71\u897F", 15: "\u5185\u8499\u53E4", 21: "\u8FBD\u5B81", 22: "\u5409\u6797", 23: "\u9ED1\u9F99\u6C5F", 31: "\u4E0A\u6D77", 32: "\u6C5F\u82CF", 33: "\u6D59\u6C5F", 34: "\u5B89\u5FBD", 35: "\u798F\u5EFA", 36: "\u6C5F\u897F", 37: "\u5C71\u4E1C", 41: "\u6CB3\u5357", 42: "\u6E56\u5317", 43: "\u6E56\u5357", 44: "\u5E7F\u4E1C", 45: "\u5E7F\u897F", 46: "\u6D77\u5357", 50: "\u91CD\u5E86", 51: "\u56DB\u5DDD", 52: "\u8D35\u5DDE", 53: "\u4E91\u5357", 54: "\u897F\u85CF", 61: "\u9655\u897F", 62: "\u7518\u8083", 63: "\u9752\u6D77", 64: "\u5B81\u590F", 65: "\u65B0\u7586", 71: "\u53F0\u6E7E", 81: "\u9999\u6E2F", 82: "\u6FB3\u95E8", 91: "\u56FD\u5916" };
        if (!/^\d{17}(\d|x)$/i.test(sId)) { return false; }
        sId = sId.replace(/x$/i, "a");
        //\u975E\u6CD5\u5730\u533A
        if (aCity[parseInt(sId.substr(0, 2), 10)] == null) { return false; }
        var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"))
        //\u975E\u6CD5\u751F\u65E5
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) { return false; }
        for (var i = 17; i >= 0; i--) { iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11); }
        if (iSum % 11 != 1) { return false; }
        return true;
    };
    coreString.prototype.isIDCard = function () { return coreString.isIDCard(this); };

    //  \u9A8C\u8BC1\u662F\u5426\u4E3A\u6574\u6570\u683C\u5F0F
    coreString.isInteger = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return /^[+]?[1-9]+\d*$/i.test(str);
    };
    coreString.prototype.isInteger = function () { return coreString.isInteger(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684 \u6570\u5B57 \u683C\u5F0F\u3002
    coreString.isNumeric = function (str, flag) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        //\u9A8C\u8BC1\u662F\u5426\u662F\u6570\u5B57
        if (isNaN(str)) { return false; }
        if (arguments.length == 0) { return false; }
        switch (flag) {
            case "":
                return true;
            case "+":        //\u6B63\u6570
                return /(^\+?|^\d?)\d*\.?\d+$/.test(str);
            case "-":        //\u8D1F\u6570
                return /^-\d*\.?\d+$/.test(str);
            case "i":        //\u6574\u6570
                return /(^-?|^\+?|\d)\d+$/.test(str);
            case "+i":        //\u6B63\u6574\u6570
                return /(^\d+$)|(^\+?\d+$)/.test(str);
            case "-i":        //\u8D1F\u6574\u6570
                return /^[-]\d+$/.test(str);
            case "f":        //\u6D6E\u70B9\u6570
                return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(str);
            case "+f":        //\u6B63\u6D6E\u70B9\u6570
                return /(^\+?|^\d?)\d*\.\d+$/.test(str);
            case "-f":        //\u8D1F\u6D6E\u70B9\u6570
                return /^[-]\d*\.\d$/.test(str);
            default:        //\u7F3A\u7701
                return true;
        }
    };
    coreString.prototype.isNumeric = function (flag) { return coreString.isNumeric(this, flag); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u662F\u6B63\u786E\u7684 \u989C\u8272(#FFFFFF\u5F62\u5F0F) \u683C\u5F0F\u3002
    coreString.isColor = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        if (str == "") { return true };
        if (str.length != 7) { return false };
        return (str.search(/\#[a-fA-F0-9]{6}/) != -1);
    };
    coreString.prototype.isColor = function () { return coreString.isColor(this); };

    //  \u5224\u65AD\u5F53\u524D String \u5BF9\u8C61\u662F\u5426\u53EF\u4EE5\u4F5C\u4E3A\u5B89\u5168\u5BC6\u7801\u5B57\u7B26(\u7531\u5B57\u7B26\u548C\u6570\u5B57\u7EC4\u6210\uFF0C\u81F3\u5C11 6 \u4F4D).
    coreString.isSafePassword = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(str));
    };
    coreString.prototype.isSafePassword = function () { return coreString.isSafePassword(this); };

    //  \u8F6C\u6362\u6210\u5168\u89D2
    coreString.toCase = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var tmp = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255) { tmp += String.fromCharCode(str.charCodeAt(i) + 65248); }
            else { tmp += String.fromCharCode(str.charCodeAt(i)); }
        }
        return tmp
    };
    coreString.prototype.toCase = function () { return coreString.toCase(this); };

    //  \u5BF9\u5B57\u7B26\u4E32\u8FDB\u884CHtml\u7F16\u7801\u3002
    coreString.toHtmlEncode = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        var temp = str;
        temp = temp.replace(/&/g, "&amp;");
        temp = temp.replace(/</g, "&lt;");
        temp = temp.replace(/>/g, "&gt;");
        temp = temp.replace(/\'/g, "&apos;");
        temp = temp.replace(/\"/g, "&quot;");
        temp = temp.replace(/\n/g, "<br>");
        temp = temp.replace(/\ /g, "&nbsp;");
        temp = temp.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
        return temp;
    };
    coreString.prototype.toHtmlEncode = function () { return coreString.toHtmlEncode(this); };

    //  \u8F6C\u6362\u6210\u65E5\u671F\u3002
    coreString.toDate = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        try { return new Date(str.replace(/-/g, "\/")); }
        catch (e) { return null; }
    };
    coreString.prototype.toDate = function () { return coreString.toDate(this); };

    //  \u5C06\u5B57\u7B26\u4E32\u5BF9\u8C61\u8F6C\u6362\u6210 \u5E03\u5C14(boolean) \u503C
    coreString.toBoolean = function (str) {
        if (typeof str == "boolean") { return str; }
        str = coreString.isNullOrEmpty(str) ? "" : String(str).toLowerCase();
        str = coreString.trim(str);
        return str == "true" || str == "yes" || str == "y" || str == "t" || str == "1";
    };
    coreString.prototype.toBoolean = function () { return coreString.toBoolean(this); };

    //  \u5C06\u5B57\u7B26\u4E32\u5BF9\u8C61\u8F6C\u6362\u6210 \u6574\u6570(int) \u503C
    coreString.toInteger = function (str) { return parseInt(str); };
    coreString.prototype.toInteger = function () { return coreString.toInteger(this); };

    //  \u5C06\u5B57\u7B26\u4E32\u5BF9\u8C61\u8F6C\u6362\u6210 \u6570\u503C(Number)\u3002
    coreString.toNumber = function (str) { return coreString.toFloat(str); };
    coreString.prototype.toNumber = function () { return coreString.toNumber(this); };

    //  \u5C06\u5B57\u7B26\u4E32\u5BF9\u8C61\u8F6C\u6362\u6210 \u6D6E\u70B9\u6570(float) \u503C
    coreString.toFloat = function (str) { return parseFloat(str); };
    coreString.prototype.toFloat = function () { return coreString.toFloat(this); };

    //  \u5C06\u5B57\u7B26\u4E32\u5BF9\u8C61\u8F6C\u6362\u6210 \u6570\u503C
    coreString.toNumeric = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        str = coreString.trim(str);
        return str.indexOf(".") > -1 ? coreString.toFloat(str) : coreString.toInteger(str);
    };
    coreString.prototype.toNumeric = function () { return coreString.toNumeric(this); };

    //  \u5C06\u5B57\u7B26\u4E32\u5BF9\u8C61\u8F6C\u6362\u6210 \u5BF9\u8C61(Object) \u503C
    coreString.toObject = function (str) { return JSON.parse(str); };
    coreString.prototype.toObject = function () { return coreString.toObject(this); };

    coreString.toJSONString = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        str = coreString.trim(str);
        return str.charAt(0) === "<" && str.charAt(str.length - 1) === ">" && str.length >= 3 ? $(str).text() : str;
    };

    //  \u5C06\u5B57\u7B26\u4E32\u5BF9\u8C61\u8F6C\u6362\u6210 \u51FD\u6570(function) \u503C
    coreString.toFunction = function (str) {
        str = coreString.isNullOrEmpty(str) ? "" : String(str);
        str = coreString.trim(str);
        if (!str.startsWith("function")) { str = "function(){" + str + "}"; }
        str = "{ \"func\": " + str + " }";
        return coreString.toObject(str).func;
    };
    coreString.prototype.toFunction = function () { return coreString.toFunction(this); };




    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript \u7684\u6570\u503C(Number)\u51FD\u6570\u529F\u80FD\u6269\u5145\u3002
    /////////////////////////////////////////////////////////////////////////////////////////////// 

    //  \u5224\u65AD\u5BF9\u8C61\u662F\u5426\u662F\u4E00\u4E2A\u6570\u503C
    coreNumber.isNumber = coreUtil.isNumeric;

    //  \u628A\u4E00\u4E2A\u6570\u5B57/\u6D6E\u70B9\u6570\u820D\u5165\u4E3A\u6307\u5B9A\u7CBE\u5EA6\u7684\u6570\u503C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      num:    \u9700\u8981\u8FDB\u884C\u820D\u5165\u8BA1\u7B97\u7684\u6570\u503C;
    //      precision:  \u820D\u5165\u64CD\u4F5C\u4FDD\u7559\u7684\u7CBE\u5EA6(\u610F\u5373\u4FDD\u7559\u591A\u5C11\u4E3A\u5C0F\u6570)\uFF0C\u9ED8\u8BA4\u4E3A 0;
    coreNumber.round = function (num, precision) {
        if (!$.isNumeric(num)) { throw "\u4F20\u5165\u7684\u53C2\u6570 num \u5FC5\u987B\u662F\u4E00\u4E2A\u6570\u503C"; }
        precision = $.isNumeric(precision) ? precision : 0;
        var str = new Number(num).toFixed(precision);
        return precision ? parseFloat(str) : parseInt(str);
    };
    coreNumber.prototype.round = function (precision) { return coreNumber.round(this, precision); };

    //  \u83B7\u53D6\u6216\u8BBE\u7F6E\u6570\u503C\u5BF9\u8C61\u7684\u7CBE\u5EA6\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u91CD\u8F7D\uFF1A
    //      \u91CD\u8F7D\u4E00\uFF1Afunction(num)\uFF0C\u8BE5\u91CD\u8F7D\u7528\u4E8E\u83B7\u53D6\u6570\u503C\u7684\u7CBE\u5EA6\uFF0C\u8BE5\u91CD\u8F7D\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //              num:    \u9700\u8981\u83B7\u53D6\u7CBE\u5EA6\u7684\u6570\u503C\u3002
    //          \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u6570\u503C num \u7684\u7CBE\u5EA6(\u5C0F\u6570\u4F4D\u6570)\u3002
    //      \u91CD\u8F7D\u4E8C\uFF1Afunction(num, precision)\uFF0C\u8BE5\u91CD\u8F7D\u7528\u4E8E\u8BBE\u7F6E\u6570\u503C\u7684\u7CBE\u5EA6(\u5373\u8FDB\u884C\u6570\u503C\u820D\u5165\u64CD\u4F5C)\uFF0C\u8BE5\u91CD\u8F7D\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //              num:    \u9700\u8981\u8BBE\u7F6E\u7CBE\u5EA6\u7684\u6570\u503C\u3002
    //              precision: \u9700\u8981\u8BBE\u7F6E\u7684\u7CBE\u5EA6\u3002
    //          \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u6570\u503C num \u6309\u7167\u6307\u5B9A\u7684\u7CBE\u5EA6\u8FDB\u884C\u820D\u5165\u64CD\u4F5C\u540E\u7684\u503C\uFF1B
    //          \u5907\u6CE8\uFF1A\u8BE5\u91CD\u8F7D\u4F1A\u8C03\u7528\u51FD\u6570 coreNumber.round \u8FDB\u884C\u6570\u503C\u820D\u5165\u64CD\u4F5C\u3002
    coreNumber.precision = function (num, precision) {
        if (!$.isNumeric(num)) { throw "\u4F20\u5165\u7684\u53C2\u6570 num \u5FC5\u987B\u662F\u4E00\u4E2A\u6570\u503C"; }
        if ($.isNumeric(precision)) { return coreNumber.round(num, precision); } else {
            var str = String(num), i = str.indexOf(".");
            return i == -1 ? 0 : str.length - str.indexOf(".") - 1;
        }
    };

    //  \u5224\u65AD\u4F20\u5165\u7684\u6570\u503C\u662F\u5426\u662F\u4E00\u4E2A\u5947\u6570\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      num:    \u9700\u8981\u5224\u65AD\u7684\u6570\u503C\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 num \u662F\u4E00\u4E2A\u5947\u6570\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
    coreNumber.isOdd = function (num) {
        return (num % 2) == 1;
    };
    coreNumber.prototype.isOdd = function () { return coreNumber.isOdd(this); };

    //  \u5224\u65AD\u4F20\u5165\u7684\u6570\u503C\u662F\u5426\u662F\u4E00\u4E2A\u5076\u6570\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      num:    \u9700\u8981\u5224\u65AD\u7684\u6570\u503C\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 num \u662F\u4E00\u4E2A\u5076\u6570\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
    coreNumber.isEven = function (num) {
        return (num % 2) == 0;
    };
    coreNumber.prototype.isEven = function () { return coreNumber.isEven(this); };




    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript \u7684\u6570\u7EC4\u51FD\u6570\u529F\u80FD\u6269\u5145\u3002
    /////////////////////////////////////////////////////////////////////////////////////////////// 

    //  \u5224\u65AD\u5BF9\u8C61\u662F\u5426\u662F\u4E00\u4E2A\u6570\u7EC4
    coreArray.isArray = core_isArray ? core_isArray : coreUtil.isArray;
    coreUtil.isArray = coreArray.isArray;

    //  \u68C0\u6D4B\u4E00\u4E2A\u5BF9\u8C61\u662F\u5426\u4E3A\u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u6216\u8005\u7C7B\u4F3C\u4E8E\u6570\u7EC4\u5BF9\u8C61\uFF0C\u540C coreUtil.likeArray
    coreArray.likeArray = coreUtil.likeArray;

    //  \u5224\u65AD\u4F20\u5165\u7684 \u6570\u7EC4 \u662F\u5426\u4E3A Null \u6216\u8005\u4E3A\u7A7A\u6570\u7EC4\u3002
    coreArray.isNullOrEmpty = function (array) { return !coreArray.likeArray(array) || !array.length; };
    coreArray.prototype.isNullOrEmpty = function () { return coreArray.isNullOrEmpty(this); };

    //  \u5F80\u6570\u7EC4\u4E2D\u6DFB\u52A0\u4E00\u4E2A\u65B0\u9879\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570:
    //      array:  \u8981\u6DFB\u52A0\u65B0\u9879\u7684\u6570\u7EC4\u5BF9\u8C61\uFF1B
    //      item:   \u88AB\u6DFB\u52A0\u7684\u65B0\u9879\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8BE5\u6570\u7EC4\u6DFB\u52A0\u65B0\u9879\u540E\u7684\u957F\u5EA6\uFF1B
    coreArray.push = function (array, item) {
        if (!coreArray.likeArray(array)) { throw "\u4F20\u5165\u7684\u53C2\u6570 array \u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002"; }
        return core_push.call(array, item);
    };
    coreArray.prototype.push = function (item) { return coreArray.push(this, item); };

    //  \u590D\u5236\u6570\u7EC4\u5185\u7684\u6240\u6709\u9879\u5230\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\u4E2D\uFF0C\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      source: \u6E90\u6570\u636E\u6570\u7EC4\uFF0C\u8BE5\u6570\u7EC4\u5185\u7684\u6240\u6709\u9879\u5C06\u88AB\u8D4B\u503C\u5230\u76EE\u6807\u6570\u7EC4 target \u4E2D\uFF1B
    //      target: \u76EE\u6807\u6570\u7EC4\uFF0C\u6E90\u6570\u7EC4 source \u4E2D\u7684\u6240\u6709\u9879\u5C06\u88AB\u8D4B\u503C\u5230\u8BE5\u6570\u7EC4\u4E2D\uFF1B
    //  \u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u76EE\u6807\u6570\u7EC4 target \u4E2D\u7684\u5143\u7D20\u6570\u91CF\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u6E90\u6570\u7EC4\u6570\u636E\u590D\u5236\u8FC7\u6765\u540E\u7684\u76EE\u6807\u6570\u7EC4 target\u3002
    coreArray.copy = function (source, target) {
        var l = source.length, i = 0;
        if (coreUtil.isNumeric(l)) {
            while (i < l) { core_push.call(target, source[i++]); };
        } else {
            while (source[i] !== undefined) { core_push.call(target, source[i++]); }
        }
        return target;
    };
    coreArray.prototype.copy = function (source) { return coreArray.copy(source, this); };
    coreArray.prototype.copyTo = function (target) { return coreArray.copy(this, target); };

    //  \u521B\u5EFA\u4E00\u4E2A\u548C\u5F53\u524D\u6570\u7EC4\u5BF9\u8C61\u76F8\u540C\u7684\u6570\u7EC4\u5E76\u8FD4\u56DE
    coreArray.clone = function (source) { return coreArray.copy(source, []); };
    coreArray.prototype.clone = function () { return coreArray.clone(this); };

    //  \u786E\u8BA4\u6570\u7EC4\u4E2D\u662F\u5426\u5305\u542B\u6307\u5B9A\u7684\u5143\u7D20\u3002\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u88AB\u68C0\u6D4B\u7684\u6570\u7EC4\uFF1B
    //      item: \u88AB\u68C0\u6D4B\u7684\u5143\u7D20\uFF0C\u5224\u65AD\u8BE5\u5143\u7D20\u662F\u5426\u5B58\u5728\u4E8E\u6570\u7EC4 array \u4E2D\uFF1B
    //      compare: \u7528\u4E8E\u6BD4\u8F83\u8FD0\u7B97\u7684\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u6BD4\u8F83 array \u4E2D\u7684\u6BCF\u4E00\u9879\u662F\u5426\u4E0E item \u7B49\u503C\uFF1B\u8BE5\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A bool \u503C\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\u3002
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u5E94\u8BE5\u662F function (item1, item2) { }\uFF0C\u53C2\u6570 item1 \u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u9879、item2 \u8868\u793A\u8981\u8FDB\u884C\u6BD4\u8F83\u7684\u9879\uFF1B
    //          \u5982\u679C\u4E0D\u5B9A\u4E49\u53C2\u6570 compare\uFF0C\u5219\u4F7F\u7528\u9ED8\u8BA4\u7684\u6BD4\u8F83\u8FD0\u7B97\u7B26 "==" \u8FDB\u884C\u503C\u7684\u5339\u914D\uFF1B
    coreArray.contains = function (array, item, compare) {
        return coreArray.some(array, function (val) { return coreUtil.equals(val, item, compare); });
    };
    coreArray.prototype.contains = function (item, compare) { return coreArray.contains(this, item, compare); };

    //  \u98A0\u5012\u6570\u7EC4\u4E2D\u5143\u7D20\u7684\u987A\u5E8F\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4F20\u5165\u7684\u53C2\u6570 array \u672C\u8EAB\uFF1B\u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 array \u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u7A7A\u6570\u7EC4\u5BF9\u8C61\u3002
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u539F\u6765\u7684\u6570\u7EC4\uFF0C\u800C\u4E0D\u4F1A\u521B\u5EFA\u65B0\u7684\u6570\u7EC4\u3002
    coreArray.reverse = function (array) {
        array = coreArray.likeArray(array) ? array : [];
        if (coreArray.isArray(array)) { array.reverse(); return array; }
        var len = array.length, l = len / 2, j;
        for (var i = 0; i < l; i++) {
            j = len - i - 1;
            var a = array[i];
            var b = array[j];
            array[i] = b;
            array[j] = a;
        }
        return array;
    };

    //  \u5728\u6570\u7EC4\u4E2D\u641C\u7D22\u6307\u5B9A\u7684\u9879\uFF0C\u5E76\u8FD4\u56DE\u6574\u4E2A\u6570\u7EC4\u4E2D\u7B2C\u4E00\u4E2A\u5339\u914D\u9879\u7684\u4ECE\u96F6\u5F00\u59CB\u7684\u7D22\u5F15\uFF0C\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      item:  \u8981\u641C\u7D22\u7684\u9879\uFF1B
    //      startIndex: \u4ECE\u96F6\u5F00\u59CB\u7684\u641C\u7D22\u7684\u8D77\u59CB\u7D22\u5F15\uFF0C\u7A7A\u5217\u8868\u4E2D 0\uFF08\u96F6\uFF09\u4E3A\u6709\u6548\u503C\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF1B\u5982\u679C\u8BE5\u53C2\u6570\u672A\u5B9A\u4E49\u5219\u4ECE 0 \u5F00\u59CB\uFF1B
    //      count: \u8981\u641C\u7D22\u7684\u90E8\u5206\u4E2D\u7684\u5143\u7D20\u6570\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF0C\u5982\u679C\u8BE5\u53C2\u6570\u672A\u5B9A\u4E49\u5219\u641C\u7D22\u81F3\u6570\u7EC4\u7684\u672B\u5C3E\uFF1B
    //      compare: \u7528\u4E8E\u6BD4\u8F83\u8FD0\u7B97\u7684\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u6BD4\u8F83 array \u4E2D\u7684\u6BCF\u4E00\u9879\u662F\u5426\u4E0E item \u7B49\u503C\uFF1B\u8BE5\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A bool \u503C\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\u3002
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u5E94\u8BE5\u662F function (item1, item2) { }\uFF0C\u53C2\u6570 item1 \u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u9879、item2 \u8868\u793A\u8981\u8FDB\u884C\u6BD4\u8F83\u7684\u9879\uFF1B
    //          \u5982\u679C\u4E0D\u5B9A\u4E49\u53C2\u6570 compare\uFF0C\u5219\u4F7F\u7528\u9ED8\u8BA4\u7684\u6BD4\u8F83\u8FD0\u7B97\u7B26 "==" \u8FDB\u884C\u503C\u7684\u5339\u914D\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5728\u6570\u7EC4\u4E2D\u4ECE startIndex \u5F00\u59CB\u5E76\u5305\u542B count \u4E2A\u5143\u7D20\u7684\u5143\u7D20\u8303\u56F4\u5185\u627E\u5230 item \u7684\u7B2C\u4E00\u4E2A\u5339\u914D\u9879\uFF0C\u5219\u4E3A\u8BE5\u9879\u7684\u4ECE\u96F6\u5F00\u59CB\u7684\u7D22\u5F15\uFF1B\u5426\u5219\u4E3A -1\u3002
    //  \u53C2\u8003\uFF1Ahttp://msdn.microsoft.com/ZH-CN/library/ie/ff679977(v=vs.94).aspx
    coreArray.indexOf = function (array, item, startIndex, count, compare) {
        array = coreArray.likeArray(array) ? array : [];
        var result = -1;
        if (!array.length) { return result; }
        if (arguments.length > 2) {
            var c = arguments[arguments.length - 1];
            compare = coreUtil.isFunction(c) ? c : null;
            var s = arguments[2];
            startIndex = coreUtil.isNumeric(s) ? s : 0;
            if (startIndex < 0 || array.length < startIndex) { return result; }
            if (arguments.length > 3) {
                c = arguments[3];
                count = coreUtil.isNumeric(c) ? c : array.length - startIndex;
            } else {
                count = array.length - startIndex;
            }
            if (count < 0 || startIndex + count > array.length) { return result; }
        } else {
            startIndex = 0;
            count = array.length - startIndex;
            compare = null;
        }
        var stopIndex = startIndex + count;
        for (var i = startIndex; i < stopIndex; i++) {
            if (coreUtil.equals(array[i], item, compare)) { result = i; break; }
        }
        return result;
    };
    coreArray.prototype.indexOf = function (item, startIndex, count, compare) { return coreArray.indexOf(this, item, startIndex, count, compare); };

    //  \u5728\u6570\u7EC4\u4E2D\u641C\u7D22\u6307\u5B9A\u7684\u9879\uFF0C\u5E76\u8FD4\u56DE\u6574\u4E2A\u6570\u7EC4\u4E2D\u6700\u540E\u4E00\u4E2A\u5339\u914D\u9879\u7684\u4ECE\u96F6\u5F00\u59CB\u7684\u7D22\u5F15\u3002
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      item:  \u8981\u641C\u7D22\u7684\u9879\uFF1B
    //      startIndex: \u5411\u540E\u641C\u7D22\u7684\u4ECE\u96F6\u5F00\u59CB\u7684\u8D77\u59CB\u7D22\u5F15\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF1B\u5982\u679C\u8BE5\u53C2\u6570\u672A\u5B9A\u4E49\u5219\u4ECE\u6570\u7EC4\u672B\u5C3E\u5F00\u59CB\uFF1B
    //      count: \u8981\u641C\u7D22\u7684\u90E8\u5206\u4E2D\u7684\u5143\u7D20\u6570\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF0C\u5982\u679C\u8BE5\u53C2\u6570\u672A\u5B9A\u4E49\u5219\u641C\u7D22\u81F3\u6570\u7EC4\u7684\u8D77\u59CB\u4F4D\u7F6E\uFF1B
    //      compare: \u7528\u4E8E\u6BD4\u8F83\u8FD0\u7B97\u7684\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u6BD4\u8F83 array \u4E2D\u7684\u6BCF\u4E00\u9879\u662F\u5426\u4E0E item \u7B49\u503C\uFF1B\u8BE5\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A bool \u503C\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\u3002
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u5E94\u8BE5\u662F function (item1, item2) { }\uFF0C\u53C2\u6570 item1 \u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u9879、item2 \u8868\u793A\u8981\u8FDB\u884C\u6BD4\u8F83\u7684\u9879\uFF1B
    //          \u5982\u679C\u4E0D\u5B9A\u4E49\u53C2\u6570 compare\uFF0C\u5219\u4F7F\u7528\u9ED8\u8BA4\u7684\u6BD4\u8F83\u8FD0\u7B97\u7B26 "==" \u8FDB\u884C\u503C\u7684\u5339\u914D\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5728\u6570\u7EC4\u4E2D\u5305\u542B count \u4E2A\u5143\u7D20、\u5728 startIndex \u5904\u7ED3\u5C3E\u7684\u5143\u7D20\u8303\u56F4\u5185\u627E\u5230 item \u7684\u6700\u540E\u4E00\u4E2A\u5339\u914D\u9879\uFF0C\u5219\u4E3A\u8BE5\u9879\u7684\u4ECE\u96F6\u5F00\u59CB\u7684\u7D22\u5F15\uFF1B\u5426\u5219\u4E3A -1\u3002
    //  \u53C2\u8003\uFF1Ahttp://msdn.microsoft.com/ZH-CN/library/ie/ff679972(v=vs.94).aspx
    coreArray.lastIndexOf = function (array, item, startIndex, count, compare) {
        array = coreArray.likeArray(array) ? array : [];
        var result = -1;
        if (!array.length) { return result; }
        if (arguments.length > 2) {
            var c = arguments[arguments.length - 1];
            compare = coreUtil.isFunction(c) ? c : null;
            var s = arguments[2];
            startIndex = coreUtil.isNumeric(s) ? s : 0;
            if (startIndex < 0 || array.length < startIndex) { return result; }
            if (arguments.length > 3) {
                c = arguments[3];
                count = coreUtil.isNumeric(c) ? c : array.length - startIndex;
            } else {
                count = array.length - startIndex;
            }
            if (count < 0 || startIndex + count > array.length) { return result; }
        } else {
            startIndex = 0;
            count = array.length - startIndex;
            compare = null;
        }
        var stopIndex = startIndex + count;
        var begin = array.length - startIndex - 1;
        var end = begin - count;
        for (var i = begin; i > end; i--) {
            if (coreUtil.equals(array[i], item, compare)) { result = i; break; }
        }
        return result;
    };
    coreArray.prototype.lastIndexOf = function (item, startIndex, count, compare) { return coreArray.lastIndexOf(this, item, startIndex, count, compare); };

    //  \u63D0\u53D6\u6307\u5B9A\u6570\u7EC4\u4E2D\u4ECB\u4E8E\u4E24\u4E2A\u6307\u5B9A\u7D22\u5F15\u53F7\u4E4B\u95F4\u7684\u5143\u7D20\u6784\u6210\u7684\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      startIndex: \u5FC5\u9700\u3002\u4E00\u4E2A\u5927\u4E8E\u6216\u7B49\u4E8E 0 \u7684\u6574\u6570\uFF0C\u89C4\u5B9A\u4ECE\u4F55\u5904\u5F00\u59CB\u9009\u53D6\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\u3002
    //      stopIndex: \u53EF\u9009\u3002\u89C4\u5B9A\u4ECE\u4F55\u5904\u7ED3\u675F\u9009\u53D6\u3002\u8BE5\u53C2\u6570\u662F\u6570\u7EC4\u7247\u65AD\u7ED3\u675F\u5904\u7684\u6570\u7EC4\u4E0B\u6807\u3002\u5982\u679C\u6CA1\u6709\u6307\u5B9A\u8BE5\u53C2\u6570\uFF0C\u90A3\u4E48\u5207\u5206\u7684\u6570\u7EC4\u5305\u542B\u4ECE startIndex \u5230\u6570\u7EC4\u7ED3\u675F\u7684\u6240\u6709\u5143\u7D20\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\uFF0C\u5305\u542B\u4ECE startIndex \u5230 stopIndex \uFF08\u4E0D\u5305\u62EC\u8BE5\u5143\u7D20\uFF09\u7684 arrayObject \u4E2D\u7684\u5143\u7D20\u3002
    coreArray.range = function (array, startIndex, stopIndex) {
        array = coreArray.likeArray(array) ? array : [];
        startIndex = coreUtil.isNumeric(startIndex) ? startIndex : 0;
        stopIndex = coreUtil.isNumeric(stopIndex) ? stopIndex : array.length;
        return core_slice.call(array, startIndex, stopIndex);
    };
    coreArray.prototype.range = function (startIndex, stopIndex) { return coreArray.range(this, startIndex, stopIndex); };

    //  \u63D0\u53D6\u6307\u5B9A\u6570\u7EC4\u4E2D\u4ECE startIndex \u4F4D\u7F6E\u5F00\u59CB\u540E\u6307\u5B9A\u6570\u91CF\u7684\u5143\u7D20\u6784\u6210\u7684\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      startIndex: \u4E00\u4E2A\u975E\u8D1F\u7684\u6574\u6570\uFF0C\u89C4\u5B9A\u8981\u63D0\u53D6\u7684\u8D77\u59CB\u4F4D\u7F6E\u7684\u7D22\u5F15\u53F7\uFF1B
    //      length: \u4E00\u4E2A\u975E\u8D1F\u7684\u6574\u6570\uFF0C\u89C4\u5B9A\u8981\u63D0\u53D6\u7684\u5143\u7D20\u7684\u6570\u91CF\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF0C\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5219\u4E00\u76F4\u63D0\u53D6\u5230\u6570\u7EC4\u7684\u672B\u5C3E\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\uFF0C\u5305\u542B\u4ECE startIndex \u5904\u5F00\u59CB\u540E\u957F\u5EA6\u4E3A length \u7684\u6240\u6709\u5143\u7D20\u3002
    coreArray.rangeLen = function (array, startIndex, length) {
        startIndex = coreUtil.isNumeric(startIndex) ? startIndex : 0;
        length = coreUtil.isNumeric(length) ? length : array.length;
        var stopIndex = startIndex + length;
        return coreArray.range(array, startIndex, stopIndex);
    };
    coreArray.prototype.rangeLen = function (startIndex, length) { return coreArray.rangeLen(this, startIndex, length); };

    //  \u5BF9\u6307\u5B9A\u7684\u6570\u7EC4\u8FDB\u884C\u5206\u9875\u5904\u7406\uFF0C\u5E76\u8FD4\u56DE\u5206\u9875\u540E\u7684\u7ED3\u679C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      pageIndex: \u4E00\u4E2A\u975E\u8D1F\u6574\u6570\uFF0C\u8868\u793A\u8981\u8FD4\u56DE\u7684\u6570\u636E\u6240\u5728\u9875\u9762\u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u7B97\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF0C\u5982\u679C\u672A\u5B9A\u4E49\u8BE5\u53C2\u6570\u6216\u4E0D\u5408\u6CD5\uFF0C\u5219\u9ED8\u8BA4\u4E3A 0\uFF1B
    //      pageSize: \u4E00\u4E2A\u975E\u8D1F\u6574\u6570\uFF0C\u8868\u793A\u6BCF\u4E00\u4E2A\u5206\u9875\u9875\u9762\u7684\u5C3A\u5BF8\uFF0C\u5373\u6BCF\u9875\u6709\u591A\u5C11\u884C\u8BB0\u5F55\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF0C\u5982\u679C\u672A\u5B9A\u4E49\u8BE5\u53C2\u6570\u6216\u4E0D\u5408\u6CD5\uFF0C\u5219\u9ED8\u8BA4\u4E3A 10\uFF1B
    //          sortby: \u7528\u4E8E\u6392\u5E8F\u7684\u6BD4\u8F83\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u6BD4\u8F83 array \u4E2D\u6CA1\u4E24\u9879\u7684\u5927\u5C0F\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\uFF1B
    //              \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u4E3A function (a, b) { }\uFF0C\u53C2\u6570 a、b \u5206\u522B\u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u5F85\u6BD4\u8F83\u5927\u5C0F\u7684\u9879\uFF1B\u8BE5\u51FD\u6570\u5FC5\u987B\u8FD4\u56DE\u4E00\u4E2A\u6570\u503C\u8868\u793A\u6BD4\u8F83\u540E\u7684\u7ED3\u679C\uFF1B
    //              \u5982\u679C a > b \uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A \u5927\u4E8E 0 \u7684\u503C\uFF1B
    //              \u5982\u679C a < b \uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A \u5C0F\u4E8E 0 \u7684\u503C\uFF1B
    //              \u5982\u679C a == b\uFF0C\u5219\u8FD4\u56DE 0\uFF1B
    //          \u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5219\u9ED8\u8BA4\u5C06 array \u4E2D\u7684\u6BCF\u4E00\u9879\u5F53\u4F5C\u6570\u5B57\u6765\u8FDB\u884C\u6BD4\u8F83\u3002
    //  \u8BE5\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A\u5177\u6709\u5982\u4E0B\u5C5E\u6027\u7684 JSON \u5BF9\u8C61\uFF1A
    //      pageSize:   \u4E00\u4E2A\u975E\u8D1F\u6574\u6570\uFF0C\u8868\u793A\u6BCF\u4E00\u4E2A\u5206\u9875\u9875\u9762\u7684\u5C3A\u5BF8\uFF0C\u5373\u6BCF\u9875\u6709\u591A\u5C11\u884C\u8BB0\u5F55\uFF1B
    //      pageIndex:  \u4E00\u4E2A\u975E\u8D1F\u6574\u6570\uFF0C\u8868\u793A\u8FD4\u56DE\u7684\u6570\u636E\u6240\u5728\u9875\u9762\u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u7B97\uFF1B
    //      rowCount:   \u4E00\u4E2A\u975E\u8D1F\u6574\u6570\uFF0C\u8868\u793A\u8FD4\u56DE\u7684\u6570\u636E\u7684\u672A\u5206\u9875\u524D\u7684\u603B\u884C\u6570\uFF1B
    //      data:       \u4E00\u4E2A\u6570\u7EC4\uFF0C\u4E3A\u4F20\u5165\u7684\u53C2\u6570 array \u7684\u5B50\u96C6\uFF0C\u8868\u793A\u5206\u9875\u540E\u7684\u9875\u9762\u6570\u636E\uFF1B
    //      pageCount:  \u4E00\u4E2A\u975E\u8D1F\u6574\u6570\uFF0C\u8868\u793A\u6E90\u6570\u636E\u6570\u7EC4\u5206\u9875\u540E\u7684\u603B\u9875\u9762\u6570\u91CF\uFF1B
    //      pageNumber: \u4E00\u4E2A\u975E\u8D1F\u6574\u6570\uFF0C\u8868\u793A\u8FD4\u56DE\u7684\u6570\u636E\u6240\u5728\u7684\u9875\u9762\u7684\u5E8F\u53F7\uFF0C\u4ECE 1 \u5F00\u59CB\u8BA1\u7B97\uFF1B\u540C pageIndex + 1\uFF1B
    //      total:      \u4E00\u4E2A\u975E\u8D1F\u6574\u6570\uFF0C\u540C rowCount\u3002
    coreArray.splitPage = function (array, pageIndex, pageSize, sortby) {
        array = coreArray.likeArray(array) ? array : [];
        if (!pageIndex || !coreUtil.isNumeric(pageIndex) || pageIndex < 0) { pageIndex = 0; }
        if (!pageSize || !coreUtil.isNumeric(pageSize) || pageSize < 1) { pageSize = 10; }
        var isFunc = coreUtil.isFunction(sortby);
        array = isFunc ? coreArray.clone(array).sort(sortby) : array;
        var startIndex = pageIndex * pageSize;
        var stopIndex = (pageIndex + 1) * pageSize;
        var data = coreArray.range(array, startIndex, stopIndex);
        var rowCount = array.length;
        var pageCount = Math.ceil(parseFloat(rowCount) / pageSize);
        var pageNumber = pageIndex + 1;
        var total = rowCount;
        return { pageSize: pageSize, pageIndex: pageIndex, rowCount: rowCount, data: data, pageCount: pageCount, pageNumber: pageNumber, total: total };
    };
    coreArray.prototype.splitPage = function (pageIndex, pageSize, sortby) { return coreArray.splitPage(this, pageIndex, pageSize, sortby); };

    //  \u4ECE\u6570\u7EC4\u4E2D\u79FB\u9664\u4E00\u5B9A\u8303\u56F4\u7684\u5143\u7D20\uFF0C\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      index: \u8981\u79FB\u9664\u7684\u5143\u7D20\u7684\u8303\u56F4\u4ECE\u96F6\u5F00\u59CB\u7684\u8D77\u59CB\u7D22\u5F15\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF0C\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\u5219\u9ED8\u8BA4\u4E3A 0\uFF1B
    //      count: \u8981\u79FB\u9664\u7684\u5143\u7D20\u6570\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF0C\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\u5219\u9ED8\u8BA4\u4E3A\u4ECE index \u8D77\u59CB\u4F4D\u7F6E\u4E00\u76F4\u5230\u6570\u7EC4\u7684\u672B\u5C3E\uFF0C\u53EF\u4EE5\u4E3A 0\u3002
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u73B0\u6709\u7684\u6570\u7EC4\u3002
    coreArray.removeRange = function (array, index, count) {
        if (!coreArray.likeArray(array)) { throw "\u4F20\u5165\u7684\u53C2\u6570 array \u5FC5\u987B\u662F\u4E00\u4E2A\u6570\u7EC4"; }
        index = coreUtil.isNumeric(index) ? index : 0;
        count = coreUtil.isNumeric(count) && count >= 0 ? count : array.length;
        core_splice.call(array, index, count);
        return array;
    };
    coreArray.prototype.removeRange = function (index, count) { return coreArray.removeRange(this, index, count); };

    //  \u79FB\u9664\u6570\u7EC4\u4E2D\u7684\u6307\u5B9A\u7D22\u5F15\u4F4D\u7F6E\u7684\u9879\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF0C\u88AB\u79FB\u9664\u7684\u9879\u5305\u542B\u5728\u8BE5\u6570\u7EC4\u4E2D\uFF1B
    //      index: \u6307\u5B9A\u7684\u7D22\u5F15\u4F4D\u7F6E\uFF0C\u5F53\u68C0\u6D4B\u5230\u6E90\u6570\u636E\u6570\u7EC4\u4E2D\u5B58\u5728\u8BE5\u7D22\u5F15\u9879\u65F6\uFF0C\u5219\u79FB\u9664\u6E90\u6570\u636E\u4E2D\u7684\u8BE5\u7D22\u5F15\u9879\u3002
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u73B0\u6709\u7684\u6570\u7EC4\u3002
    coreArray.removeAt = function (array, index) { return coreArray.removeRange(array, index, 1); };
    coreArray.prototype.removeAt = function (index) { return coreArray.removeAt(this, index); };

    //  \u79FB\u9664\u6570\u7EC4\u4E2D\u7684\u6307\u5B9A\u9879\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF0C\u88AB\u79FB\u9664\u7684\u9879\u5305\u542B\u5728\u8BE5\u6570\u7EC4\u4E2D\uFF1B
    //      item: \u88AB\u79FB\u9664\u7684\u9879\uFF0C\u5F53\u68C0\u6D4B\u5230\u6E90\u6570\u636E\u6570\u7EC4\u4E2D\u5B58\u5728\u8BE5\u9879\u65F6\uFF0C\u5219\u79FB\u9664\u6E90\u6570\u636E\u4E2D\u7684\u8BE5\u9879\uFF1B
    //      compare: \u7528\u4E8E\u6BD4\u8F83\u8FD0\u7B97\u7684\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u6BD4\u8F83 array \u4E2D\u7684\u6BCF\u4E00\u9879\u662F\u5426\u4E0E item \u7B49\u503C\uFF1B\u8BE5\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A bool \u503C\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\u3002
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u5E94\u8BE5\u662F function (item1, item2) { }\uFF0C\u53C2\u6570 item1 \u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u9879、item2 \u8868\u793A\u8981\u8FDB\u884C\u6BD4\u8F83\u7684\u9879\uFF1B
    //          \u5982\u679C\u4E0D\u5B9A\u4E49\u53C2\u6570 compare\uFF0C\u5219\u4F7F\u7528\u9ED8\u8BA4\u7684\u6BD4\u8F83\u8FD0\u7B97\u7B26 "==" \u8FDB\u884C\u503C\u7684\u5339\u914D\uFF1B
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u73B0\u6709\u7684\u6570\u7EC4\u3002
    coreArray.remove = function (array, item, compare) {
        var index = coreArray.indexOf(array, item, compare);
        if (index < 0) { return array; }
        return coreArray.removeAt(array, index);
    };
    coreArray.prototype.remove = function (item, compare) { return coreArray.remove(this, item, compare); };

    //  \u5C06\u53E6\u4E00\u4E2A\u6570\u7EC4\u63D2\u5165\u5230\u5F53\u524D\u6570\u7EC4\u7684\u6307\u5B9A\u7D22\u5F15\u5904\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      index: \u5E94\u63D2\u5165 item \u7684\u4F4D\u7F6E\u7684\u96F6\u59CB\u7D22\u5F15\uFF1B
    //      collect:  \u5305\u542B\u8981\u63D2\u5165\u7684\u5143\u7D20\u7684\u6570\u7EC4\uFF1B\u8BE5\u503C\u53EF\u4EE5\u4E3A null\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u63D2\u5165\u5143\u7D20\u540E\u7684\u6570\u7EC4\u5BF9\u8C61\u672C\u8EAB\uFF1B\u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 array \u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u7A7A\u6570\u7EC4\u5BF9\u8C61\u3002
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u73B0\u6709\u7684\u6570\u7EC4\u3002
    coreArray.insertRange = function (array, index, collect) {
        if (!coreArray.likeArray(array)) { throw "\u4F20\u5165\u7684\u53C2\u6570 array \u5FC5\u987B\u662F\u4E00\u4E2A\u6570\u7EC4"; }
        collect = coreArray.likeArray(collect) ? collect : [];
        if (!coreUtil.isNumeric(index) || index < 0 || index > array.length) { throw "ArgumentOutOfRangeException: \u4F20\u5165\u7684\u7D22\u5F15\u53F7 index \u8D85\u51FA\u6570\u7EC4 array \u7684\u8303\u56F4\u3002"; }
        var part = coreArray.range(array, index);
        coreArray.removeRange(array, index);
        coreArray.copy(collect, array);
        coreArray.copy(part, array);
        return array;
    };
    coreArray.prototype.insertRange = function (index, collect) { return coreArray.insertRange(this, index, collect); };

    //  \u5C06\u5143\u7D20\u63D2\u5165\u6570\u7EC4\u7684\u6307\u5B9A\u7D22\u5F15\u5904\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      index: \u5E94\u63D2\u5165 item \u7684\u4F4D\u7F6E\u7684\u96F6\u59CB\u7D22\u5F15\uFF1B
    //      item:  \u8981\u63D2\u5165\u7684\u5143\u7D20\uFF1B\u8BE5\u503C\u53EF\u4EE5\u4E3A null\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u63D2\u5165\u5143\u7D20\u540E\u7684\u6570\u7EC4\u5BF9\u8C61\u672C\u8EAB\uFF1B\u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 array \u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u7A7A\u6570\u7EC4\u5BF9\u8C61\u3002
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u73B0\u6709\u7684\u6570\u7EC4\u3002
    coreArray.insert = function (array, index, item) {
        var collect = [item];
        return coreArray.insertRange(array, index, collect);
    };
    coreArray.prototype.insert = function (index, item) { return coreArray.insert(this, index, item); };

    //  \u5C06\u53E6\u4E00\u6570\u7EC4\u4E2D\u7684\u5143\u7D20\u590D\u5236\u5230\u5F53\u524D\u6570\u7EC4\u4E2D\u4E00\u5B9A\u8303\u56F4\u7684\u5143\u7D20\u4E0A\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      index: \u4ECE 0 \u5F00\u59CB\u7684\u6570\u7EC4\u7D22\u5F15\uFF0C\u4ECE\u8BE5\u4F4D\u7F6E\u5F00\u59CB\u8D4B\u503C collect \u5143\u7D20\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF0C\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5219\u9ED8\u8BA4\u4E3A\u6570\u7EC4\u7684\u672B\u5C3E\uFF1B
    //      collect: \u8981\u5C06\u5176\u5143\u7D20\u8D4B\u503C\u5230 array \u4E2D\uFF0C\u8BE5\u6570\u7EC4\u672C\u8EAB\u4E0D\u80FD\u4E3A null\uFF0C\u4F46\u5B83\u53EF\u4EE5\u5305\u542B\u4E3Anull \u7684\u5143\u7D20\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8BBE\u7F6E\u5143\u7D20\u540E\u7684\u6570\u7EC4\u5BF9\u8C61\u672C\u8EAB\uFF1B\u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 array \u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u7A7A\u6570\u7EC4\u5BF9\u8C61\u3002
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u73B0\u6709\u6570\u7EC4\u4E2D\u7684\u9879\u3002
    coreArray.setRange = function (array, index, collect) {
        if (!coreArray.likeArray(array)) { throw "\u4F20\u5165\u7684\u53C2\u6570 array \u5FC5\u987B\u662F\u4E00\u4E2A\u6570\u7EC4"; }
        index = coreUtil.isNumeric(index) ? index : 0;
        if (index < 0 || array.length < index) { throw "ArgumentOutOfRangeException: \u4F20\u5165\u7684\u7D22\u5F15\u53F7 index \u8D85\u51FA\u6570\u7EC4 array \u7684\u8303\u56F4\u3002"; }
        collect = coreArray.likeArray(collect) ? collect : [];
        coreArray.removeRange(array, collect.length);
        return coreArray.insertRange(array, index, collect);
    };
    coreArray.prototype.setRange = function (index, collect) { return coreArray.setRange(this, index, collect); }

    //  \u5982\u679C\u6E90\u6570\u7EC4\u4E2D\u4E0D\u5B58\u5728\u6307\u5B9A\u7684\u9879\uFF0C\u5219\u5C06\u8BE5\u9879\u6DFB\u52A0\u5230\u6E90\u6570\u7EC4\u4E2D\uFF1B\u8BE5\u65B9\u6CD5\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      item: \u5C06\u8981\u88AB\u5408\u5E76\u5230\u6E90\u6570\u7EC4\u4E2D\u7684\u9879\uFF0C\u5982\u679C\u6E90\u6570\u7EC4\u4E2D\u4E0D\u5B58\u5728\u8BE5\u9879\uFF0C\u5219\u5C06\u5176\u6DFB\u52A0\u81F3\u6E90\u6570\u7EC4\uFF1B
    //      compare: \u7528\u4E8E\u6BD4\u8F83\u8FD0\u7B97\u7684\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u6BD4\u8F83 array \u4E2D\u7684\u6BCF\u4E00\u9879\u662F\u5426\u4E0E item \u7B49\u503C\uFF1B\u8BE5\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A bool \u503C\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\u3002
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u5E94\u8BE5\u662F function (item1, item2) { }\uFF0C\u53C2\u6570 item1 \u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u9879、item2 \u8868\u793A\u8981\u8FDB\u884C\u6BD4\u8F83\u7684\u9879\uFF1B
    //          \u5982\u679C\u4E0D\u5B9A\u4E49\u53C2\u6570 compare\uFF0C\u5219\u4F7F\u7528\u9ED8\u8BA4\u7684\u6BD4\u8F83\u8FD0\u7B97\u7B26 "==" \u8FDB\u884C\u503C\u7684\u5339\u914D\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u6DFB\u52A0\u5143\u7D20\u540E\u7684\u6570\u7EC4\u5BF9\u8C61\u672C\u8EAB\u3002
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u73B0\u6709\u7684\u6570\u7EC4\u3002
    coreArray.attach = function (array, item, compare) {
        if (!coreArray.contains(array, item, compare)) { array.push(item); }
        return array;
    };
    coreArray.prototype.attach = function (item, compare) { return coreArray.attach(this, item, compare); };

    //  \u53BB\u9664\u6570\u7EC4\u4E2D\u91CD\u590D\u9879\uFF1B\u8BE5\u65B9\u6CD5\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570:
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      compare: \u7528\u4E8E\u6BD4\u8F83\u8FD0\u7B97\u7684\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u6BD4\u8F83 array \u4E2D\u7684\u6BCF\u4E00\u9879\u662F\u5426\u4E0E item \u7B49\u503C\uFF1B\u8BE5\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A bool \u503C\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\u3002
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u5E94\u8BE5\u662F function (item1, item2) { }\uFF0C\u53C2\u6570 item1 \u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u9879、item2 \u8868\u793A\u8981\u8FDB\u884C\u6BD4\u8F83\u7684\u9879\uFF1B
    //          \u5982\u679C\u4E0D\u5B9A\u4E49\u53C2\u6570 compare\uFF0C\u5219\u4F7F\u7528\u9ED8\u8BA4\u7684\u6BD4\u8F83\u8FD0\u7B97\u7B26 "==" \u8FDB\u884C\u503C\u7684\u5339\u914D\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u53BB\u9664\u91CD\u590D\u5143\u7D20\u540E\u7684\u6570\u7EC4\u5BF9\u8C61\u672C\u8EAB\u3002
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u73B0\u6709\u7684\u6570\u7EC4\u3002
    coreArray.distinct = function (array, compare) {
        if (!coreArray.likeArray(array)) { throw "\u4F20\u5165\u7684\u53C2\u6570 array \u5FC5\u987B\u662F\u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002"; }
        var temps = [];
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (i == 0) { temps.push(item); } else { coreArray.attach(temps, item, compare); }
        }
        coreArray.removeRange(array, 0);
        coreArray.copy(temps, array);
        return array;
    };
    coreArray.prototype.distinct = function (compare) { return coreArray.distinct(this, compare); };

    //  \u5408\u5E76\u4E24\u4E2A\u6216\u591A\u4E2A\u6570\u7EC4\uFF1B\u8BE5\u65B9\u6CD5\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570:
    //      array: \u521D\u59CB\u6E90\u6570\u7EC4\uFF0C\u4E4B\u540E\u6240\u6709\u7684\u9879\u90FD\u5C06\u88AB\u5408\u5E76\u5165\u8BE5\u6570\u7EC4\uFF1B
    //      item1: \u7B2C 1 \u4E2A\u5F85\u5408\u5E76\u9879\uFF1B
    //      item2: \u7B2C 2 \u4E2A\u5F85\u5408\u5E76\u9879\uFF1B
    //      item3: \u7B2C 3 \u4E2A\u5F85\u5408\u5E76\u9879\uFF1B
    //      itemn... \u7B2C n \u4E2A\u5F85\u5408\u5E76\u9879\uFF1B
    //  \u5982\u679C\u8981\u8FDB\u884C merge \u64CD\u4F5C\u7684\u53C2\u6570\u662F\u6570\u7EC4\uFF0C\u90A3\u4E48\u6DFB\u52A0\u7684\u662F\u6570\u7EC4\u4E2D\u7684\u5143\u7D20\uFF0C\u800C\u4E0D\u662F\u6570\u7EC4\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5408\u5E76\u591A\u4E2A\u6570\u7EC4(\u5143\u7D20)\u540E\u7684\u6570\u7EC4\u5BF9\u8C61\u672C\u8EAB\u3002
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u73B0\u6709\u7684\u6570\u7EC4\uFF0Citem1、item2、item3、itemn...\u7B49\u6240\u6709\u7684\u53C2\u6570\u9879\u5C06\u88AB\u5408\u5E76\u5165 array \u6570\u7EC4\u3002
    coreUtil.merge = coreArray.merge = function (array, item1, item2, itemn) {
        if (!coreArray.likeArray(array)) { throw "\u4F20\u5165\u7684\u53C2\u6570 array \u5FC5\u987B\u662F\u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002"; }
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                var arg = arguments[i];
                arg = coreArray.likeArray(arg) && !coreUtil.isString(arg) ? arg : [arg];
                coreArray.copy(arg, array);
            }
        }
        return array;
    };
    coreArray.prototype.merge = function () { return coreArray.merge(this, arguments); };

    //  \u5408\u5E76\u4E24\u4E2A\u6216\u591A\u4E2A\u6570\u7EC4\uFF0C\u91CD\u590D\u9879\u5C06\u4E0D\u4F1A\u88AB\u5408\u5E76\uFF1B\u8BE5\u65B9\u6CD5\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570:
    //      array: \u521D\u59CB\u6E90\u6570\u7EC4\uFF1B
    //      compare: \u7528\u4E8E\u6BD4\u8F83\u8FD0\u7B97\u7684\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u6BD4\u8F83 array \u4E2D\u7684\u6BCF\u4E00\u9879\u662F\u5426\u4E0E item \u7B49\u503C\uFF1B\u8BE5\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A bool \u503C\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\u3002
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u5E94\u8BE5\u662F function (item1, item2) { }\uFF0C\u53C2\u6570 item1 \u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u9879、item2 \u8868\u793A\u8981\u8FDB\u884C\u6BD4\u8F83\u7684\u9879\uFF1B
    //          \u5982\u679C\u4E0D\u5B9A\u4E49\u53C2\u6570 compare\uFF0C\u5219\u4F7F\u7528\u9ED8\u8BA4\u7684\u6BD4\u8F83\u8FD0\u7B97\u7B26 "==" \u8FDB\u884C\u503C\u7684\u5339\u914D\uFF1B
    //      item1: \u7B2C 1 \u4E2A\u5F85\u5408\u5E76\u9879\uFF1B
    //      item2: \u7B2C 2 \u4E2A\u5F85\u5408\u5E76\u9879\uFF1B
    //      item3: \u7B2C 3 \u4E2A\u5F85\u5408\u5E76\u9879\uFF1B
    //      itemn... \u7B2C n \u4E2A\u5F85\u5408\u5E76\u9879\uFF1B
    //  \u5982\u679C\u8981\u8FDB\u884C unique \u64CD\u4F5C\u7684\u53C2\u6570\u662F\u6570\u7EC4\uFF0C\u90A3\u4E48\u6DFB\u52A0\u7684\u662F\u6570\u7EC4\u4E2D\u7684\u5143\u7D20\uFF0C\u800C\u4E0D\u662F\u6570\u7EC4\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5408\u5E76\u591A\u4E2A\u6570\u7EC4(\u5143\u7D20)\u540E\u7684\u6570\u7EC4\u5BF9\u8C61\u672C\u8EAB\u3002
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u73B0\u6709\u7684\u6570\u7EC4\uFF0Citem1、item2、item3、itemn...\u7B49\u6240\u6709\u7684\u53C2\u6570\u9879\u5C06\u88AB\u5408\u5E76\u5165 array \u6570\u7EC4\u3002
    //  \u8BE5\u65B9\u6CD5\u4E0E coreArray.merge \u65B9\u6CD5\u7684\u533A\u522B\u5728\u4E8E\uFF1A
    //      merge \u65B9\u6CD5\u4F1A\u5C06\u6E90\u6570\u7EC4\u4E0E\u6240\u6709\u7684 item \u8FDB\u884C\u5408\u5E76\uFF1B
    //      unique \u65B9\u6CD5\u4F1A\u5224\u65AD\u6E90\u6570\u7EC4\u4E2D\u662F\u5426\u5B58\u5728\u76F8\u5E94\u7684 item\uFF0C\u5982\u679C\u5B58\u5728\u5219\u4E0D\u5408\u5E76\uFF1B\u5E76\u4E14\u5982\u679C\u6E90\u6570\u7EC4\u4E2D\u672C\u8EAB\u7684\u5143\u7D20\u5982\u679C\u5B58\u5728\u91CD\u590D\uFF0C\u4E5F\u4F1A\u8FDB\u884C distinct \u5904\u7406\u3002
    coreUtil.unique = coreArray.unique = function (array, compare, item1, item2, itemn) {
        var args = coreArray.clone(arguments);
        args.callee = arguments.callee;
        if (coreUtil.isFunction(compare)) { coreArray.removeAt(args, 1); }
        coreArray.merge.apply(this, args);
        coreArray.distinct(array, compare);
        return array;
    };
    coreArray.prototype.unique = function (compare, item1, item2, itemn) {
        var args = coreArray.clone(arguments);
        args.callee = arguments.callee;
        coreArray.insert(args, 0, this);
        return coreArray.unique.apply(this, args);
    };

    //  \u8FC7\u6EE4\u67E5\u627E\u5F53\u524D\u6570\u7EC4\u4E2D\u7684\u5143\u7D20\uFF0C\u5E76\u8FD4\u56DE\u67E5\u627E\u7684\u7ED3\u679C\uFF1B\u8FD4\u56DE\u7684\u67E5\u627E\u7ED3\u679C\u662F\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      compare: \u5FC5\u9700\u3002 \u4E00\u4E2A\u63A5\u53D7\u6700\u591A\u4E09\u4E2A\u53C2\u6570\u7684\u51FD\u6570\u3002 \u5BF9\u4E8E\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\uFF0C filter \u65B9\u6CD5\u90FD\u4F1A\u8C03\u7528 callbackfn \u51FD\u6570\u4E00\u6B21\u3002
    //          \u8BE5\u56DE\u8C03\u51FD\u6570\u7684\u8BED\u6CD5\u5982\uFF1Afunction callbackfn(value, index, array)\uFF1B
    //          \u5982\u679C\u8BE5\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true\uFF0C\u5219\u8BE5\u5143\u7D20\u5C06\u88AB\u5305\u542B\u5728\u8FD4\u56DE\u7684\u96C6\u5408\u5F53\u4E2D\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u4E00\u4E2A\u5305\u542B\u56DE\u8C03\u51FD\u6570\u4E3A\u5176\u8FD4\u56DE true \u7684\u6240\u6709\u503C\u7684\u65B0\u6570\u7EC4\u3002 \u5982\u679C\u56DE\u8C03\u51FD\u6570\u4E3A array \u7684\u6240\u6709\u5143\u7D20\u8FD4\u56DE false\uFF0C\u5219\u65B0\u6570\u7EC4\u7684\u957F\u5EA6\u4E3A 0\u3002
    //  \u53C2\u8003\uFF1Ahttp://msdn.microsoft.com/ZH-CN/library/ie/ff679973(v=vs.94).aspx
    coreArray.filter = function (array, compare, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isFunction(compare)) { return array; }
        var temps = [];
        for (var i = 0; i < array.length; i++) {
            if (compare.call(thisArg, array[i], i, array) == true) { temps.push(array[i]); }
        }
        return temps;
    };
    coreArray.prototype.filter = function (compare) { return coreArray.filter(this, compare); };

    //  \u5BF9\u6570\u7EC4\u7684\u6BCF\u4E2A\u5143\u7D20\u8C03\u7528\u5B9A\u4E49\u7684\u56DE\u8C03\u51FD\u6570\u5E76\u8FD4\u56DE\u5305\u542B\u7ED3\u679C\u7684\u6570\u7EC4\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array:      \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      callback:   \u5FC5\u9700\u3002 \u4E00\u4E2A\u63A5\u53D7\u6700\u591A\u4E09\u4E2A\u53C2\u6570\u7684\u51FD\u6570\u3002 \u5BF9\u4E8E\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\uFF0C map \u65B9\u6CD5\u90FD\u4F1A\u8C03\u7528 callbackfn \u51FD\u6570\u4E00\u6B21\u3002
    //          \u8BE5\u56DE\u8C03\u51FD\u6570\u8BED\u6CD5\u5982\uFF1Afunction callbackfn(value, index, array1)\uFF1B
    //      thisArg:    \u53EF\u9009\u3002 \u53EF\u5728 callbackfn \u51FD\u6570\u4E2D\u4E3A\u5176\u5F15\u7528 this \u5173\u952E\u5B57\u7684\u5BF9\u8C61\u3002 \u5982\u679C\u7701\u7565 thisArg\uFF0C\u5219 undefined \u5C06\u7528\u4F5C this \u503C\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u5176\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u5747\u4E3A\u5173\u8054\u7684\u539F\u59CB\u6570\u7EC4\u5143\u7D20\u7684\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE\u503C\u7684\u65B0\u6570\u7EC4\u3002
    //  \u5907\u6CE8\uFF1A\u5BF9\u4E8E\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\uFF0C map \u65B9\u6CD5\u90FD\u4F1A\u8C03\u7528 callbackfn \u51FD\u6570\u4E00\u6B21\uFF08\u91C7\u7528\u5347\u5E8F\u7D22\u5F15\u987A\u5E8F\uFF09\u3002 \u4E0D\u4E3A\u6570\u7EC4\u4E2D\u7F3A\u5C11\u7684\u5143\u7D20\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\u3002
    //      \u9664\u4E86\u6570\u7EC4\u5BF9\u8C61\u4E4B\u5916\uFF0C map \u65B9\u6CD5\u53EF\u7531\u5177\u6709 length \u5C5E\u6027\u4E14\u5177\u6709\u5DF2\u6309\u6570\u5B57\u7F16\u5236\u7D22\u5F15\u7684\u5C5E\u6027\u540D\u7684\u4EFB\u4F55\u5BF9\u8C61\u4F7F\u7528\u3002
    //  \u53C2\u8003\uFF1Ahttp://msdn.microsoft.com/ZH-CN/library/ie/ff679976(v=vs.94).aspx
    coreArray.map = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isFunction(callback)) { throw "\u4F20\u5165\u7684\u53C2\u6570 callback \u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u3002"; }
        var temps = [];
        for (var i = 0; i < array.length; i++) {
            var item = callback.call(thisArg, array[i], i, array);
            temps.push(item);
        }
        return temps;
    };
    coreArray.prototype.map = function (callback, thisArg) { return coreArray.map(this, callback, thisArg); };

    //  \u5BF9\u6570\u7EC4\u8FDB\u884C\u683C\u5F0F\u8F6C\u6362\uFF0C\u5C06\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u8F6C\u6362\u6210\u65B0\u7684\u683C\u5F0F\uFF0C\u7136\u540E\u5408\u5E76\u6210\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\u5E76\u8FD4\u56DE\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //  \u8BE5\u65B9\u6CD5\u540C coreArray.map
    coreArray.cast = coreArray.map;
    coreArray.prototype.cast = function (convert) { return coreArray.cast(this, convert); };

    //  \u83B7\u53D6\u6570\u7EC4\u4E2D\u6700\u5927\u503C\u7684\u9879\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570:
    //      array: \u5F85\u67E5\u627E\u7684\u6E90\u6570\u7EC4\uFF1B
    //      compare: \u6BD4\u8F83\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u6BD4\u8F83 array \u4E2D\u6CA1\u4E24\u9879\u7684\u5927\u5C0F\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\uFF1B
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u4E3A function (a, b) { }\uFF0C\u53C2\u6570 a、b \u5206\u522B\u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u5F85\u6BD4\u8F83\u5927\u5C0F\u7684\u9879\uFF1B\u8BE5\u51FD\u6570\u5FC5\u987B\u8FD4\u56DE\u4E00\u4E2A\u6570\u503C\u8868\u793A\u6BD4\u8F83\u540E\u7684\u7ED3\u679C\uFF1B
    //              \u5982\u679C a > b \uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A \u5927\u4E8E 0 \u7684\u503C\uFF1B
    //              \u5982\u679C a < b \uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A \u5C0F\u4E8E 0 \u7684\u503C\uFF1B
    //              \u5982\u679C a == b\uFF0C\u5219\u8FD4\u56DE 0\uFF1B
    //      \u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5219\u9ED8\u8BA4\u5C06 array \u4E2D\u7684\u6BCF\u4E00\u9879\u5F53\u4F5C\u6570\u5B57\u6765\u8FDB\u884C\u6BD4\u8F83\u3002
    coreArray.max = function (array, compare) {
        array = coreArray.likeArray(array) ? array : [];
        if (array.length == 0) { return undefined; }
        if (array.length == 1) { return array[0]; }
        return coreArray.reduce(coreArray.range(array, 1), function (prev, current, index, array) {
            return coreUtil.compare(prev, current, compare) >= 0 ? prev : current;
        }, array[0]);
    };
    coreArray.prototype.max = function (compare) { return coreArray.max(this, compare); };

    //  \u83B7\u53D6\u6570\u7EC4\u4E2D\u503C\u7B49\u4E8E\u6700\u5927\u503C\u7684\u96C6\u5408\u6570\u7EC4\uFF1B\u8BE5\u51FD\u6570\u7684\u53C2\u6570\u5B9A\u4E49\u548C coreArray.max \u76F8\u540C\uFF1B
    //  \u8BE5\u51FD\u6570\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\uFF0C\u5373\u4F7F\u67E5\u627E\u5230\u7684\u7ED3\u679C\u53EA\u6709\u4E00\u9879\uFF1B
    coreArray.maxs = function (array, compare) {
        array = coreArray.likeArray(array) ? array : [];
        var max = coreArray.max(array, compare);
        return coreArray.filter(array, function (item) {
            return coreUtil.compare(item, max, compare) == 0;
        });
    };
    coreArray.prototype.maxs = function (compare) { return coreArray.maxs(this, compare); };

    //  \u83B7\u53D6\u6570\u7EC4\u4E2D\u6700\u5C0F\u503C\u7684\u9879\uFF1B\u8BE5\u51FD\u6570\u7684\u53C2\u6570\u5B9A\u4E49\u548C coreArray.max \u76F8\u540C\uFF1B
    coreArray.min = function (array, compare) {
        array = coreArray.likeArray(array) ? array : [];
        if (array.length == 0) { return undefined; }
        if (array.length == 1) { return array[0]; }
        return coreArray.reduce(coreArray.range(array, 1), function (prev, current, index, array) {
            return coreUtil.compare(current, prev, compare) >= 0 ? prev : current;
        }, array[0]);
    };
    coreArray.prototype.min = function (compare) { return coreArray.min(this, compare); };

    //  \u83B7\u53D6\u6570\u7EC4\u4E2D\u503C\u7B49\u4E8E\u6700\u5C0F\u503C\u7684\u96C6\u5408\uFF1B\u8BE5\u51FD\u6570\u7684\u53C2\u6570\u5B9A\u4E49\u548C coreArray.max \u76F8\u540C\uFF1B
    //  \u8BE5\u51FD\u6570\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\uFF0C\u5373\u4F7F\u67E5\u627E\u5230\u7684\u7ED3\u679C\u53EA\u6709\u4E00\u9879\uFF1B
    coreArray.mins = function (array, compare) {
        array = coreArray.likeArray(array) ? array : [];
        var min = coreArray.min(array, compare);
        return coreArray.filter(array, function (item) {
            return coreUtil.compare(item, min, compare) == 0;
        });
    };
    coreArray.prototype.mins = function (compare) { return coreArray.mins(this, compare); };

    //  \u8BA1\u7B97\u6570\u7EC4\u4E2D\u5404\u9879\u7D2F\u52A0\u540E\u7684\u5408\u8BA1\u503C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570:
    //      array:  \u6E90\u6570\u636E\u6570\u7EC4
    //      callback: \u8F6C\u6362\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u5C06 array \u4E2D\u7684\u6BCF\u4E00\u9879\u8F6C\u6362\u6210\u4E00\u4E2A\u65B0\u7684\u6570\u503C\u5E76\u8F93\u51FA\uFF1B\u5982\u679C\u5B9A\u4E49\u8BE5\u51FD\u6570\uFF0C\u5219\u5176\u5FC5\u987B\u8FD4\u56DE\u4E00\u4E2A\u6570\u503C\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF1B
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u5E94\u8BE5\u662F function (item) { }\uFF0C\u53C2\u6570 item \u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u9879\uFF1B
    //          \u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5219\u9ED8\u8BA4\u5C06 array \u4E2D\u7684\u6BCF\u4E00\u9879\u76F4\u63A5\u76F8\u52A0\u3002
    //      thisArg:    \u53EF\u9009\u3002 \u53EF\u5728 callback \u51FD\u6570\u4E2D\u4E3A\u5176\u5F15\u7528 this \u5173\u952E\u5B57\u7684\u5BF9\u8C61\u3002 \u5982\u679C\u7701\u7565 thisArg\uFF0C\u5219 undefined \u5C06\u7528\u4F5C this \u503C\u3002
    coreArray.sum = function (array, callback, thisArg) {
        var isFunc = coreUtil.isFunction(callback);
        var fn = function (previous, current) {
            return previous + (isFunc ? callback.call(thisArg, current) : current);
        };
        return coreArray.reduce(array, fn, 0);
    };
    coreArray.prototype.sum = function (convert) { return coreArray.sum(this, convert); };

    //  \u8BA1\u7B97\u6570\u7EC4\u4E2D\u5404\u9879\u7D2F\u79EF\u540E\u7684\u5E73\u5747\u503C\uFF1B\u8BE5\u51FD\u6570\u53C2\u6570\u7684\u5B9A\u4E49\u548C coreArray.sum \u4E00\u6837\uFF1B
    coreArray.avg = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        var sum = coreArray.sum(array, callback, thisArg);
        var avg = parseFloat(sum) / array.length;
        return avg;
    };
    coreArray.prototype.avg = function (convert) { return coreArray.avg(this, convert); };

    //  \u4ECE\u6570\u7EC4\u7684\u5F00\u5934\u8FD4\u56DE\u6307\u5B9A\u6570\u91CF\u7684\u8FDE\u7EED\u5143\u7D20\u6784\u6210\u7684\u65B0\u6570\u7EC4\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570:
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      count: \u8981\u63D0\u53D6\u7684\u5143\u7D20\u9879\u7684\u6570\u91CF\uFF0C\u5FC5\u987B\u662F\u4E00\u4E2A\u6B63\u6574\u6570\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF1B\u5982\u679C\u4E0D\u4F20\u5165\u8BE5\u53C2\u6570\u6216\u4F20\u5165\u7684\u503C\u8D85\u51FA\u8303\u56F4\uFF0C\u5219\u9ED8\u8BA4\u4E3A 1\u3002
    coreArray.take = function (array, count) {
        array = coreArray.likeArray(array) ? array : [];
        if (!$.isNumeric(count) || count < 1) { count = 1; }
        var temps = [];
        for (var i = 0; i < array.length; i++) { if (i < count) { temps.push(array[i]); } }
        return temps;
    };
    coreArray.prototype.take = function (count) { return coreArray.take(this, count); };

    //  \u8DF3\u8FC7\u6570\u7EC4\u4E2D\u6307\u5B9A\u6570\u91CF\u7684\u5143\u7D20\uFF0C\u7136\u540E\u8FD4\u56DE\u5269\u4F59\u5143\u7D20\u6784\u6210\u7684\u65B0\u6570\u7EC4\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array: \u6E90\u6570\u636E\u6570\u7EC4\uFF1B
    //      count: \u8FD4\u56DE\u5269\u4F59\u5143\u7D20\u524D\u8981\u8DF3\u8FC7\u7684\u5143\u7D20\u6570\u91CF\uFF0C\u5FC5\u987B\u662F\u4E00\u4E2A\u975E\u8D1F\u6574\u6570\uFF1B\u8BE5\u53C2\u6570\u53EF\u9009\uFF1B\u5982\u679C\u4E0D\u4F20\u5165\u8BE5\u53C2\u6570\u6216\u4F20\u5165\u7684\u503C\u4E3A\u8D1F\u6570\uFF0C\u5219\u9ED8\u8BA4\u4E3A 0\u3002
    coreArray.skip = function (array, count) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isNumeric(count) || count < 0) { count = 0; }
        var temps = [];
        for (var i = count; i < array.length; i++) { temps.push(array[i]); }
        return temps;
    };
    coreArray.prototype.skip = function (count) { return coreArray.skip(this, count); };

    // \u4E3A\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u6267\u884C\u6307\u5B9A\u64CD\u4F5C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array:      \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      callback:   \u5FC5\u9700\u3002 \u4E00\u4E2A\u63A5\u53D7\u6700\u591A\u4E09\u4E2A\u53C2\u6570\u7684\u51FD\u6570\u3002 \u5BF9\u4E8E\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\uFF0C forEach \u90FD\u4F1A\u8C03\u7528 callbackfn \u51FD\u6570\u4E00\u6B21\u3002
    //          \u8BE5\u51FD\u6570\u8BED\u6CD5\u5982\uFF1Afunction callbackfn(value, index, array)\uFF1B
    //      thisArg:    \u53EF\u9009\u3002 \u53EF\u5728 callbackfn \u51FD\u6570\u4E2D\u4E3A\u5176\u5F15\u7528 this \u5173\u952E\u5B57\u7684\u5BF9\u8C61\u3002 \u5982\u679C\u7701\u7565 thisArg\uFF0C\u5219 undefined \u5C06\u7528\u4F5C this \u503C\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4F20\u5165\u7684\u53C2\u6570 array \u672C\u8EAB\u3002
    //  \u5907\u6CE8\uFF1A\u5BF9\u4E8E\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\uFF0C forEach \u65B9\u6CD5\u90FD\u4F1A\u8C03\u7528 callbackfn \u51FD\u6570\u4E00\u6B21\uFF08\u91C7\u7528\u5347\u5E8F\u7D22\u5F15\u987A\u5E8F\uFF09\u3002
    //      \u5982\u679C\u9700\u8981\u9000\u51FA each \u5FAA\u73AF\u53EF\u4F7F\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5176\u5B83\u8FD4\u56DE\u503C\u5C06\u88AB\u5FFD\u7565\u3002
    //      \u9664\u4E86\u6570\u7EC4\u5BF9\u8C61\u4E4B\u5916\uFF0C forEach \u65B9\u6CD5\u53EF\u7531\u5177\u6709 length \u5C5E\u6027\u4E14\u5177\u6709\u5DF2\u6309\u6570\u5B57\u7F16\u5236\u7D22\u5F15\u7684\u5C5E\u6027\u540D\u7684\u4EFB\u4F55\u5BF9\u8C61\u4F7F\u7528\u3002
    //  \u53C2\u8003\uFF1Ahttp://msdn.microsoft.com/ZH-CN/library/ie/ff679980(v=vs.94).aspx
    coreArray.forEach = function (array, callback, thisArg) {
        var isArray = coreArray.likeArray(array), temps = isArray ? array : [], i = 0, length = temps.length;
        if (temps.length == 0) { return; }
        if (!coreUtil.isFunction(callback)) { throw "\u4F20\u5165\u7684\u53C2\u6570 callback \u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u3002"; }
        if (isArray) {
            for (; i < length; i++) { if (callback.call(thisArg, temps[i], i, temps) == false) { break; } }
        } else {
            for (i in temps) { if (callback.call(thisArg, temps[i], i, temps) == false) { break; } }
        }
        return array;
    };
    coreArray.prototype.forEach = function (callback, thisArg) { return coreArray.forEach(this, callback, thisArg); };

    //  \u5BF9\u6570\u7EC4\u4E2D\u7684\u6240\u6709\u5143\u7D20\u8C03\u7528\u6307\u5B9A\u7684\u56DE\u8C03\u51FD\u6570\u3002 \u8BE5\u56DE\u8C03\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4E3A\u7D2F\u79EF\u7ED3\u679C\uFF0C\u5E76\u4E14\u6B64\u8FD4\u56DE\u503C\u5728\u4E0B\u4E00\u6B21\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\u65F6\u4F5C\u4E3A\u53C2\u6570\u63D0\u4F9B\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array:      \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      callback:   \u5FC5\u9700\u3002 \u4E00\u4E2A\u63A5\u53D7\u6700\u591A\u56DB\u4E2A\u53C2\u6570\u7684\u51FD\u6570\u3002 \u5BF9\u4E8E\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\uFF0C reduce \u65B9\u6CD5\u90FD\u4F1A\u8C03\u7528 callbackfn \u51FD\u6570\u4E00\u6B21\u3002
    //          \u8BE5\u56DE\u8C03\u51FD\u6570\u8BED\u6CD5\u5982\uFF1Afunction callbackfn(previousValue, currentValue, currentIndex, array)
    //      initialValue:\u53EF\u9009\u3002 \u5982\u679C\u6307\u5B9A initialValue\uFF0C\u5219\u5B83\u5C06\u7528\u4F5C\u521D\u59CB\u503C\u6765\u542F\u52A8\u7D2F\u79EF\u3002 \u7B2C\u4E00\u6B21\u8C03\u7528 callbackfn \u51FD\u6570\u4F1A\u5C06\u6B64\u503C\u4F5C\u4E3A\u53C2\u6570\u800C\u975E\u6570\u7EC4\u503C\u63D0\u4F9B\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u901A\u8FC7\u6700\u540E\u4E00\u6B21\u8C03\u7528\u56DE\u8C03\u51FD\u6570\u83B7\u5F97\u7684\u7D2F\u79EF\u7ED3\u679C\u3002
    //  \u5F02\u5E38\uFF1A\u5F53\u6EE1\u8DB3\u4E0B\u5217\u4EFB\u4E00\u6761\u4EF6\u65F6\uFF0C\u5C06\u5F15\u53D1 TypeError \u5F02\u5E38\uFF1A
    //      1、callbackfn \u53C2\u6570\u4E0D\u662F\u51FD\u6570\u5BF9\u8C61\u3002
    //      2、\u6570\u7EC4\u4E0D\u5305\u542B\u5143\u7D20\uFF0C\u4E14\u672A\u63D0\u4F9B initialValue\u3002
    //  \u5907\u6CE8\uFF1A\u5982\u679C\u63D0\u4F9B\u4E86 initialValue\uFF0C\u5219 reduce \u65B9\u6CD5\u4F1A\u5BF9\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u8C03\u7528\u4E00\u6B21 callbackfn \u51FD\u6570\uFF08\u6309\u5347\u5E8F\u7D22\u5F15\u987A\u5E8F\uFF09\u3002
    //      \u5982\u679C\u672A\u63D0\u4F9B initialValue\uFF0C\u5219 reduce \u65B9\u6CD5\u4F1A\u5BF9\u4ECE\u7B2C\u4E8C\u4E2A\u5143\u7D20\u5F00\u59CB\u7684\u6BCF\u4E2A\u5143\u7D20\u8C03\u7528 callbackfn \u51FD\u6570\u3002
    //      \u56DE\u8C03\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5728\u4E0B\u4E00\u6B21\u8C03\u7528\u56DE\u8C03\u51FD\u6570\u65F6\u4F5C\u4E3A previousValue \u53C2\u6570\u63D0\u4F9B\u3002 \u6700\u540E\u4E00\u6B21\u8C03\u7528\u56DE\u8C03\u51FD\u6570\u83B7\u5F97\u7684\u8FD4\u56DE\u503C\u4E3A reduce \u65B9\u6CD5\u7684\u8FD4\u56DE\u503C\u3002
    //  \u53C2\u8003\uFF1Ahttp://msdn.microsoft.com/ZH-CN/library/ie/ff679975(v=vs.94).aspx
    coreArray.reduce = function (array, callback, initialValue) {
        if (!coreUtil.isFunction(callback)) { throw "\u4F20\u5165\u7684\u53C2\u6570 callback \u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u3002"; }
        array = coreArray.likeArray(array) ? array : [];
        if (array.length == 0 && (initialValue === undefined)) { throw "\u6570\u7EC4\u4E0D\u5305\u542B\u5143\u7D20\uFF0C\u4E14\u672A\u63D0\u4F9B initialValue\u3002"; }
        var index = 0;
        if (initialValue === undefined) { initialValue = array[0]; index = 1; }
        for (var i = index; i < array.length; i++) {
            initialValue = callback.call(this, initialValue, array[i], i, array);
        }
        return initialValue;
    };
    coreArray.prototype.reduce = function (callback, initialValue) { return coreArray.reduce(this, callback, initialValue); };

    //  \u6309\u964D\u5E8F\u987A\u5E8F\u5BF9\u6570\u7EC4\u4E2D\u7684\u6240\u6709\u5143\u7D20\u8C03\u7528\u6307\u5B9A\u7684\u56DE\u8C03\u51FD\u6570\u3002 \u8BE5\u56DE\u8C03\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4E3A\u7D2F\u79EF\u7ED3\u679C\uFF0C\u5E76\u4E14\u6B64\u8FD4\u56DE\u503C\u5728\u4E0B\u4E00\u6B21\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\u65F6\u4F5C\u4E3A\u53C2\u6570\u63D0\u4F9B\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array:      \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      callback:   \u5FC5\u9700\u3002 \u4E00\u4E2A\u63A5\u53D7\u6700\u591A\u56DB\u4E2A\u53C2\u6570\u7684\u51FD\u6570\u3002 \u5BF9\u4E8E\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\uFF0C reduce \u65B9\u6CD5\u90FD\u4F1A\u8C03\u7528 callbackfn \u51FD\u6570\u4E00\u6B21\u3002
    //          \u8BE5\u56DE\u8C03\u51FD\u6570\u8BED\u6CD5\u5982\uFF1Afunction callbackfn(previousValue, currentValue, currentIndex, array)
    //      initialValue:\u53EF\u9009\u3002 \u5982\u679C\u6307\u5B9A initialValue\uFF0C\u5219\u5B83\u5C06\u7528\u4F5C\u521D\u59CB\u503C\u6765\u542F\u52A8\u7D2F\u79EF\u3002 \u7B2C\u4E00\u6B21\u8C03\u7528 callbackfn \u51FD\u6570\u4F1A\u5C06\u6B64\u503C\u4F5C\u4E3A\u53C2\u6570\u800C\u975E\u6570\u7EC4\u503C\u63D0\u4F9B\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u901A\u8FC7\u6700\u540E\u4E00\u6B21\u8C03\u7528\u56DE\u8C03\u51FD\u6570\u83B7\u5F97\u7684\u7D2F\u79EF\u7ED3\u679C\u3002
    //  \u5F02\u5E38\uFF1A\u5F53\u6EE1\u8DB3\u4E0B\u5217\u4EFB\u4E00\u6761\u4EF6\u65F6\uFF0C\u5C06\u5F15\u53D1 TypeError \u5F02\u5E38\uFF1A
    //      1、callbackfn \u53C2\u6570\u4E0D\u662F\u51FD\u6570\u5BF9\u8C61\u3002
    //      2、\u6570\u7EC4\u4E0D\u5305\u542B\u5143\u7D20\uFF0C\u4E14\u672A\u63D0\u4F9B initialValue\u3002
    //  \u5907\u6CE8\uFF1A\u5982\u679C\u63D0\u4F9B\u4E86 initialValue\uFF0C\u5219 reduceRight \u65B9\u6CD5\u4F1A\u6309\u964D\u5E8F\u7D22\u5F15\u987A\u5E8F\u5BF9\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u8C03\u7528\u4E00\u6B21 callbackfn \u51FD\u6570\u3002
    //      \u5982\u679C\u672A\u63D0\u4F9B initialValue\uFF0C\u5219 reduceRight \u65B9\u6CD5\u4F1A\u6309\u964D\u5E8F\u7D22\u5F15\u987A\u5E8F\u5BF9\u6BCF\u4E2A\u5143\u7D20\uFF08\u4ECE\u5012\u6570\u7B2C\u4E8C\u4E2A\u5143\u7D20\u5F00\u59CB\uFF09\u8C03\u7528 callbackfn \u51FD\u6570\u3002
    //      \u56DE\u8C03\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5728\u4E0B\u4E00\u6B21\u8C03\u7528\u56DE\u8C03\u51FD\u6570\u65F6\u4F5C\u4E3A previousValue \u53C2\u6570\u63D0\u4F9B\u3002 \u6700\u540E\u4E00\u6B21\u8C03\u7528\u56DE\u8C03\u51FD\u6570\u83B7\u5F97\u7684\u8FD4\u56DE\u503C\u4E3A reduceRight \u65B9\u6CD5\u7684\u8FD4\u56DE\u503C\u3002
    //  \u53C2\u8003\uFF1Ahttp://msdn.microsoft.com/ZH-CN/library/ie/ff679979(v=vs.94).aspx
    coreArray.reduceRight = function (array, callback, initialValue) {
        if (!coreUtil.isFunction(callback)) { throw "\u4F20\u5165\u7684\u53C2\u6570 callback \u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u3002"; }
        array = coreArray.likeArray(array) ? array : [];
        if (array.length == 0 && (initialValue === undefined)) { throw "\u6570\u7EC4\u4E0D\u5305\u542B\u5143\u7D20\uFF0C\u4E14\u672A\u63D0\u4F9B initialValue\u3002"; }
        var index = array.length - 1;
        if (initialValue === undefined) { initialValue = array[array.length - 1]; index = array.length - 2; }
        for (var i = index; i > -1; i--) {
            initialValue = callback.call(this, initialValue, array[i], i, array);
        }
        return initialValue;
    };
    coreArray.prototype.reduceRight = function (callback, initialValue) { return coreArray.reduceRight(this, callback, initialValue); };

    //  \u786E\u5B9A\u6570\u7EC4\u7684\u6240\u6709\u6210\u5458\u662F\u5426\u6EE1\u8DB3\u6307\u5B9A\u7684\u6D4B\u8BD5\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array:      \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      callback:   \u5FC5\u9700\u3002 \u4E00\u4E2A\u63A5\u53D7\u6700\u591A\u4E09\u4E2A\u53C2\u6570\u7684\u51FD\u6570\u3002 every \u65B9\u6CD5\u4F1A\u4E3A array1 \u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u8C03\u7528 callbackfn \u51FD\u6570\uFF0C\u76F4\u5230 callbackfn \u8FD4\u56DE false\uFF0C\u6216\u76F4\u5230\u5230\u8FBE\u6570\u7EC4\u7684\u7ED3\u5C3E\u3002
    //      thisArg:    \u53EF\u9009\u3002 \u53EF\u5728 callbackfn \u51FD\u6570\u4E2D\u4E3A\u5176\u5F15\u7528 this \u5173\u952E\u5B57\u7684\u5BF9\u8C61\u3002 \u5982\u679C\u7701\u7565 thisArg\uFF0C\u5219 undefined \u5C06\u7528\u4F5C this \u503C\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C callbackfn \u51FD\u6570\u4E3A\u6240\u6709\u6570\u7EC4\u5143\u7D20\u8FD4\u56DE true\uFF0C\u5219\u4E3A true\uFF1B\u5426\u5219\u4E3A false\u3002 \u5982\u679C\u6570\u7EC4\u6CA1\u6709\u5143\u7D20\uFF0C\u5219 every \u65B9\u6CD5\u5C06\u8FD4\u56DE true\u3002
    //  \u5907\u6CE8\uFF1A\u9664\u4E86\u6570\u7EC4\u5BF9\u8C61\u4E4B\u5916\uFF0C every \u65B9\u6CD5\u53EF\u7531\u5177\u6709 length \u5C5E\u6027\u4E14\u5177\u6709\u5DF2\u6309\u6570\u5B57\u7F16\u5236\u7D22\u5F15\u7684\u5C5E\u6027\u540D\u7684\u4EFB\u4F55\u5BF9\u8C61\u4F7F\u7528\u3002
    //  \u53C2\u8003\uFF1Ahttp://msdn.microsoft.com/ZH-CN/library/ie/ff679981(v=vs.94).aspx
    coreArray.every = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (array.length == 0) { return true; }
        if (!coreUtil.isFunction(callback)) { throw "\u4F20\u5165\u7684\u53C2\u6570 callback \u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u3002"; }
        for (var i = 0; i < array.length; i++) {
            if (callback.call(thisArg, array[i], i, array) == false) { return false; }
        }
        return true;
    };
    coreArray.prototype.every = function (callback, thisArg) { return coreArray.every(this, callback, thisArg); };

    //  \u786E\u5B9A\u6307\u5B9A\u7684\u56DE\u8C03\u51FD\u6570\u662F\u5426\u4E3A\u6570\u7EC4\u4E2D\u7684\u4EFB\u4F55\u5143\u7D20\u5747\u8FD4\u56DE true\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array:      \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      callback:   \u5FC5\u9700\u3002 \u4E00\u4E2A\u63A5\u53D7\u6700\u591A\u4E09\u4E2A\u53C2\u6570\u7684\u51FD\u6570\u3002 some \u65B9\u6CD5\u4F1A\u4E3A array1 \u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u8C03\u7528 callbackfn \u51FD\u6570\uFF0C\u76F4\u5230 callbackfn \u8FD4\u56DE true\uFF0C\u6216\u76F4\u5230\u5230\u8FBE\u6570\u7EC4\u7684\u7ED3\u5C3E\u3002
    //          \u8BE5\u51FD\u6570\u8BED\u6CD5\u5982\uFF1Afunction callbackfn(value, index, array1)
    //      thisArg:    \u53EF\u9009\u3002 \u53EF\u5728 callbackfn \u51FD\u6570\u4E2D\u4E3A\u5176\u5F15\u7528 this \u5173\u952E\u5B57\u7684\u5BF9\u8C61\u3002 \u5982\u679C\u7701\u7565 thisArg\uFF0C\u5219 undefined \u5C06\u7528\u4F5C this \u503C\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C callbackfn \u51FD\u6570\u4E3A\u4EFB\u4F55\u6570\u7EC4\u5143\u7D20\u5747\u8FD4\u56DE true\uFF0C\u5219\u4E3A true\uFF1B\u5426\u5219\u4E3A false\u3002
    //  \u5F02\u5E38\uFF1A\u5982\u679C callbackfn \u53C2\u6570\u4E0D\u662F\u51FD\u6570\u5BF9\u8C61\uFF0C\u5219\u5C06\u5F15\u53D1 TypeError \u5F02\u5E38\u3002
    //  \u5907\u6CE8\uFF1Asome \u65B9\u6CD5\u4F1A\u6309\u5347\u5E8F\u7D22\u5F15\u987A\u5E8F\u5BF9\u6BCF\u4E2A\u6570\u7EC4\u5143\u7D20\u8C03\u7528 callbackfn \u51FD\u6570\uFF0C\u76F4\u5230 callbackfn \u51FD\u6570\u8FD4\u56DE true\u3002 \u5982\u679C\u627E\u5230\u5BFC\u81F4 callbackfn \u8FD4\u56DE true \u7684\u5143\u7D20\uFF0C\u5219 some \u65B9\u6CD5\u4F1A\u7ACB\u5373\u8FD4\u56DE true\u3002 \u5982\u679C\u56DE\u8C03\u4E0D\u5BF9\u4EFB\u4F55\u5143\u7D20\u8FD4\u56DE true\uFF0C\u5219 some \u65B9\u6CD5\u4F1A\u8FD4\u56DE false\u3002
    //      \u9664\u4E86\u6570\u7EC4\u5BF9\u8C61\u4E4B\u5916\uFF0C some \u65B9\u6CD5\u53EF\u7531\u5177\u6709 length \u5C5E\u6027\u4E14\u5177\u6709\u5DF2\u6309\u6570\u5B57\u7F16\u5236\u7D22\u5F15\u7684\u5C5E\u6027\u540D\u7684\u4EFB\u4F55\u5BF9\u8C61\u4F7F\u7528\u3002
    //  \u53C2\u8003\uFF1Ahttp://msdn.microsoft.com/ZH-CN/library/ie/ff679978(v=vs.94).aspx
    coreArray.some = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isFunction(callback)) { throw "\u4F20\u5165\u7684\u53C2\u6570 callback \u4E0D\u662F\u4E00\u4E2A\u51FD\u6570\u3002"; }
        for (var i = 0; i < array.length; i++) {
            if (callback.call(thisArg, array[i], i, array) == true) { return true; }
        }
        return false;
    };
    coreArray.prototype.some = function (callback, thisArg) { return coreArray.some(this, callback, thisArg); };

    //  \u67E5\u627E\u6307\u5B9A\u6570\u7EC4\u4E2D\u7B2C\u4E00\u4E2A\u7B26\u5408\u6761\u4EF6\u5224\u5B9A\u7684\u9879\u4F1A\u5C06\u5176\u8FD4\u56DE\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array:      \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      callback:   \u53EF\u9009\u3002 \u4E00\u4E2A\u63A5\u53D7\u6700\u591A\u4E09\u4E2A\u53C2\u6570\u7684\u51FD\u6570\u3002 first \u65B9\u6CD5\u4F1A\u4E3A array \u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u8C03\u7528 callbackfn \u51FD\u6570\uFF0C\u76F4\u5230 callbackfn \u8FD4\u56DE true\uFF0C\u6216\u76F4\u5230\u5230\u8FBE\u6570\u7EC4\u7684\u7ED3\u5C3E\u3002
    //          \u8BE5\u51FD\u6570\u8BED\u6CD5\u5982\uFF1Afunction callbackfn(value, index, array1)
    //      thisArg:    \u53EF\u9009\u3002 \u53EF\u5728 callbackfn \u51FD\u6570\u4E2D\u4E3A\u5176\u5F15\u7528 this \u5173\u952E\u5B57\u7684\u5BF9\u8C61\u3002 \u5982\u679C\u7701\u7565 thisArg\uFF0C\u5219 undefined \u5C06\u7528\u4F5C this \u503C\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5B9A\u4E49\u4E86\u53C2\u6570 callbackfn \uFF0C\u8FD4\u56DE array \u4E2D\u7B2C\u4E00\u4E2A\u5BFC\u81F4\u56DE\u8C03\u51FD\u6570 callback \u8FD4\u56DE true \u7684\u9879\u76EE\uFF1B
    //      \u5982\u679C\u672A\u5B9A\u4E49\u53C2\u6570 callback\uFF0C\u5219\u8FD4\u56DE array \u4E2D\u7684\u7B2C\u4E00\u4E2A\u5143\u7D20\uFF1B
    //      \u5982\u679C\u6570\u7EC4 array \u4E0D\u5305\u542B\u4EFB\u4F55\u5143\u7D20\uFF0C\u6216\u8005 callback \u56DE\u8C03\u51FD\u6570\u904D\u5386\u5B8C array \u4E2D\u6240\u6709\u5143\u7D20\u540E\u59CB\u7EC8\u672A\u8FD4\u56DE true \u503C\uFF0C\u5219 first \u65B9\u6CD5\u8FD4\u56DE null\u3002
    //  \u5907\u6CE8\uFF1Afirst \u65B9\u6CD5\u4F1A\u6309\u5347\u5E8F\u7D22\u5F15\u987A\u5E8F\u5BF9\u6BCF\u4E2A\u6570\u7EC4\u5143\u7D20\u8C03\u7528 callbackfn \u51FD\u6570\uFF0C\u76F4\u5230 callbackfn \u51FD\u6570\u8FD4\u56DE true\u3002 \u5982\u679C\u627E\u5230\u5BFC\u81F4 callbackfn \u8FD4\u56DE true \u7684\u5143\u7D20\uFF0C\u5219 first \u65B9\u6CD5\u4F1A\u7ACB\u5373\u8FD4\u56DE\u8BE5\u5143\u7D20\u3002 \u5982\u679C\u56DE\u8C03\u4E0D\u5BF9\u4EFB\u4F55\u5143\u7D20\u8FD4\u56DE true\uFF0C\u5219 first \u65B9\u6CD5\u4F1A\u8FD4\u56DE null\u3002
    //      \u9664\u4E86\u6570\u7EC4\u5BF9\u8C61\u4E4B\u5916\uFF0C first \u65B9\u6CD5\u53EF\u7531\u5177\u6709 length \u5C5E\u6027\u4E14\u5177\u6709\u5DF2\u6309\u6570\u5B57\u7F16\u5236\u7D22\u5F15\u7684\u5C5E\u6027\u540D\u7684\u4EFB\u4F55\u5BF9\u8C61\u4F7F\u7528\u3002
    coreArray.first = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isFunction(callback)) { return array.length ? array[0] : null; }
        for (var i = 0; i < array.length; i++) {
            if (callback.call(thisArg, array[i], i, array) == true) { return array[i]; }
        }
        return null;
    };
    coreArray.prototype.first = function (callback, thisArg) { return coreArray.first(this, callback, thisArg); };

    //  \u67E5\u627E\u6307\u5B9A\u6570\u7EC4\u4E2D\u6700\u540E\u4E00\u4E2A\u7B26\u5408\u6761\u4EF6\u5224\u5B9A\u7684\u9879\u4F1A\u5C06\u5176\u8FD4\u56DE\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array:      \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      callback:   \u53EF\u9009\u3002 \u4E00\u4E2A\u63A5\u53D7\u6700\u591A\u4E09\u4E2A\u53C2\u6570\u7684\u51FD\u6570\u3002 last \u65B9\u6CD5\u4F1A\u4ECE array \u7684\u7ED3\u675F\u4F4D\u7F6E\u5176\u4E3A\u5B83\u7684\u6BCF\u4E2A\u5143\u7D20\u8C03\u7528 callbackfn \u51FD\u6570\uFF0C\u76F4\u5230 callbackfn \u8FD4\u56DE true\uFF0C\u6216\u76F4\u5230\u5230\u8FBE\u6570\u7EC4\u7684\u8D77\u59CB\u4F4D\u7F6E\u3002
    //          \u8BE5\u51FD\u6570\u8BED\u6CD5\u5982\uFF1Afunction callbackfn(value, index, array1)
    //      thisArg:    \u53EF\u9009\u3002 \u53EF\u5728 callbackfn \u51FD\u6570\u4E2D\u4E3A\u5176\u5F15\u7528 this \u5173\u952E\u5B57\u7684\u5BF9\u8C61\u3002 \u5982\u679C\u7701\u7565 thisArg\uFF0C\u5219 undefined \u5C06\u7528\u4F5C this \u503C\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5B9A\u4E49\u4E86\u53C2\u6570 callbackfn \uFF0C\u8FD4\u56DE array \u4E2D\u6700\u540E\u4E00\u4E2A\u5BFC\u81F4\u56DE\u8C03\u51FD\u6570 callback \u8FD4\u56DE true \u7684\u9879\u76EE\uFF1B
    //      \u5982\u679C\u672A\u5B9A\u4E49\u53C2\u6570 callback\uFF0C\u5219\u8FD4\u56DE array \u4E2D\u7684\u6700\u540E\u4E00\u4E2A\u5143\u7D20\uFF1B
    //      \u5982\u679C\u6570\u7EC4 array \u4E0D\u5305\u542B\u4EFB\u4F55\u5143\u7D20\uFF0C\u6216\u8005 callback \u56DE\u8C03\u51FD\u6570\u904D\u5386\u5B8C array \u4E2D\u6240\u6709\u5143\u7D20\u540E\u59CB\u7EC8\u672A\u8FD4\u56DE true \u503C\uFF0C\u5219 last \u65B9\u6CD5\u8FD4\u56DE null\u3002
    //  \u5907\u6CE8\uFF1Alast \u65B9\u6CD5\u4F1A\u6309\u964D\u5E8F\u7D22\u5F15\u987A\u5E8F\u5BF9\u6BCF\u4E2A\u6570\u7EC4\u5143\u7D20\u8C03\u7528 callbackfn \u51FD\u6570\uFF0C\u76F4\u5230 callbackfn \u51FD\u6570\u8FD4\u56DE true\u3002 \u5982\u679C\u627E\u5230\u5BFC\u81F4 callbackfn \u8FD4\u56DE true \u7684\u5143\u7D20\uFF0C\u5219 last \u65B9\u6CD5\u4F1A\u7ACB\u5373\u8FD4\u56DE\u8BE5\u5143\u7D20\u3002 \u5982\u679C\u56DE\u8C03\u4E0D\u5BF9\u4EFB\u4F55\u5143\u7D20\u8FD4\u56DE true\uFF0C\u5219 last \u65B9\u6CD5\u4F1A\u8FD4\u56DE null\u3002
    //      \u9664\u4E86\u6570\u7EC4\u5BF9\u8C61\u4E4B\u5916\uFF0C last \u65B9\u6CD5\u53EF\u7531\u5177\u6709 length \u5C5E\u6027\u4E14\u5177\u6709\u5DF2\u6309\u6570\u5B57\u7F16\u5236\u7D22\u5F15\u7684\u5C5E\u6027\u540D\u7684\u4EFB\u4F55\u5BF9\u8C61\u4F7F\u7528\u3002
    coreArray.last = function (array, callback, thisArg) {
        array = coreArray.likeArray(array) ? array : [];
        if (!coreUtil.isFunction(callback)) { return array.length ? array[array.length - 1] : null; }
        for (var i = array.length - 1; i >= 0; i--) {
            if (callback.call(thisArg, array[i], i, array) == true) { return array[i]; }
        }
        return null;
    };
    coreArray.prototype.last = function (callback, thisArg) { return coreArray.last(this, callback, thisArg); };

    //  \u5BF9\u6570\u7EC4\u7684\u5143\u7D20\u8FDB\u884C\u6392\u5E8F\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array:      \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      callback: \u6BD4\u8F83\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u88AB\u5FAA\u73AF\u8C03\u7528\uFF0C\u7528\u4E8E\u6BD4\u8F83 array \u4E2D\u6CA1\u4E24\u9879\u7684\u5927\u5C0F\uFF1B\u8FD9\u662F\u4E00\u4E2A\u53EF\u9009\u53C2\u6570\uFF1B
    //          \u8BE5\u51FD\u6570\u7684\u7B7E\u540D\u4E3A function (a, b) { }\uFF0C\u53C2\u6570 a、b \u5206\u522B\u8868\u793A\u6E90\u6570\u7EC4\u4E2D\u7684\u5F85\u6BD4\u8F83\u5927\u5C0F\u7684\u9879\uFF1B\u8BE5\u51FD\u6570\u5FC5\u987B\u8FD4\u56DE\u4E00\u4E2A\u6570\u503C\u8868\u793A\u6BD4\u8F83\u540E\u7684\u7ED3\u679C\uFF1B
    //              \u5982\u679C a > b \uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A \u5927\u4E8E 0 \u7684\u503C\uFF1B
    //              \u5982\u679C a < b \uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A \u5C0F\u4E8E 0 \u7684\u503C\uFF1B
    //              \u5982\u679C a == b\uFF0C\u5219\u8FD4\u56DE 0\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u6392\u5E8F\u5904\u7406\u540E\u7684\u6570\u7EC4\u5BF9\u8C61\u672C\u8EAB\u3002
    //  \u5907\u6CE8\uFF1A\u5982\u679C\u8C03\u7528\u8BE5\u65B9\u6CD5\u65F6\u6CA1\u6709\u4F7F\u7528\u53C2\u6570\uFF0C\u5C06\u6309\u5B57\u6BCD\u987A\u5E8F\u5BF9\u6570\u7EC4\u4E2D\u7684\u5143\u7D20\u8FDB\u884C\u6392\u5E8F\uFF0C\u8BF4\u5F97\u66F4\u7CBE\u786E\u70B9\uFF0C\u662F\u6309\u7167\u5B57\u7B26\u7F16\u7801\u7684\u987A\u5E8F\u8FDB\u884C\u6392\u5E8F\u3002
    //      \u8981\u5B9E\u73B0\u8FD9\u4E00\u70B9\uFF0C\u9996\u5148\u5E94\u628A\u6570\u7EC4\u7684\u5143\u7D20\u90FD\u8F6C\u6362\u6210\u5B57\u7B26\u4E32\uFF08\u5982\u6709\u5FC5\u8981\uFF09\uFF0C\u4EE5\u4FBF\u8FDB\u884C\u6BD4\u8F83\u3002
    //      \u5982\u679C\u60F3\u6309\u7167\u5176\u4ED6\u6807\u51C6\u8FDB\u884C\u6392\u5E8F\uFF0C\u5C31\u9700\u8981\u63D0\u4F9B\u6BD4\u8F83\u51FD\u6570\uFF0C\u8BE5\u51FD\u6570\u8981\u6BD4\u8F83\u4E24\u4E2A\u503C\uFF0C\u7136\u540E\u8FD4\u56DE\u4E00\u4E2A\u7528\u4E8E\u8BF4\u660E\u8FD9\u4E24\u4E2A\u503C\u7684\u76F8\u5BF9\u987A\u5E8F\u7684\u6570\u5B57\u3002
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u6539\u53D8\u73B0\u6709\u7684\u6570\u7EC4\u3002
    coreArray.sort = function (array, callback) {
        var temps = coreArray.likeArray(array) ? array : [];
        core_sort.call(temps, callback);
        return array;
    }
    coreArray.prototype.sort = function (callback) { return coreArray.sort(this, callback); };

    //  \u83B7\u53D6\u6307\u5B9A\u6570\u7EC4\u7684\u524D N \u9879\u5143\u7D20\u6240\u6784\u6210\u7684\u4E00\u4E2A\u65B0\u6570\u7EC4\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array:  \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      length: \u5FC5\u987B\u3002 \u4E00\u4E2A Number \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u8981\u83B7\u53D6\u7684\u9879\u7684\u6570\u91CF\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u6307\u5B9A\u7684\u6570\u7EC4\u5BF9\u8C61 array \u7684\u524D\u9762\u957F\u5EA6\u4E3A length \u7684\u5143\u7D20\u6240\u6784\u6210\u7684\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\u3002
    //      \u5982\u679C length \u7684\u503C\u4E3A 0\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u6570\u7EC4\uFF1B
    //      \u5982\u679C length \u7684\u503C\u5927\u4E8E array.length\uFF0C\u5219\u8FD4\u56DE array \u7684\u4E00\u4E2A\u526F\u672C\uFF1B
    coreArray.left = function (array, length) {
        array = coreArray.likeArray(array) ? array : [];
        if (!length || !$.isNumeric(length) || length < 0) { return []; }
        if (length > array.length) { return coreArray.clone(array); }
        return coreArray.range(array, 0, length);
    };
    coreArray.prototype.left = function (length) { return coreArray.left(this, length); };

    //  \u83B7\u53D6\u6307\u5B9A\u6570\u7EC4\u7684\u540E N \u9879\u5143\u7D20\u6240\u6784\u6210\u7684\u4E00\u4E2A\u65B0\u6570\u7EC4\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      array:  \u5FC5\u9700\u3002 \u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\u3002
    //      length: \u5FC5\u987B\u3002 \u4E00\u4E2A Number \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u8981\u83B7\u53D6\u7684\u9879\u7684\u6570\u91CF\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u6307\u5B9A\u7684\u6570\u7EC4\u5BF9\u8C61 array \u7684\u540E\u9762\u957F\u5EA6\u4E3A length \u7684\u5143\u7D20\u6240\u6784\u6210\u7684\u4E00\u4E2A\u65B0\u7684\u6570\u7EC4\u3002
    //      \u5982\u679C length \u7684\u503C\u4E3A 0\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u6570\u7EC4\uFF1B
    //      \u5982\u679C length \u7684\u503C\u5927\u4E8E array.length\uFF0C\u5219\u8FD4\u56DE array \u7684\u4E00\u4E2A\u526F\u672C\uFF1B
    coreArray.right = function (array, length) {
        array = coreArray.likeArray(array) ? array : [];
        if (!length || !$.isNumeric(length) || length < 0) { return []; }
        if (length > array.length) { return coreArray.clone(array); }
        return coreArray.range(array, array.length + 1 - length);
    };
    coreArray.prototype.right = function (length) { return coreArray.right(this, length); };








    /////////////////////////////////////////////////////////////////////////////////////////////// 
    //  javascript \u7684\u65E5\u671F\u51FD\u6570\u529F\u80FD\u6269\u5145\u3002
    /////////////////////////////////////////////////////////////////////////////////////////////// 

    //  \u5224\u65AD\u6307\u5B9A\u7684\u5BF9\u8C61\u662F\u5426\u4E3A\u5408\u6CD5\u7684\u65E5\u671F(Date)\u683C\u5F0F\u5BF9\u8C61\uFF1B\u4F20\u5165\u7684\u53C2\u6570\u53EF\u4EE5\u4E3A\u65E5\u671F\u683C\u5F0F\u5B57\u7B26\u4E32\u3002
    coreDate.isDate = function (date) { return coreUtil.isDate(date) || coreString.isDate(date); };

    //  \u5224\u65AD\u6307\u5B9A\u7684\u65E5\u671F\u5B57\u7B26\u4E32\u662F\u5426\u662F\u5408\u6CD5\u7684\u957F\u65E5\u671F\u683C\u5F0F\uFF1B
    //  \u8BE5\u51FD\u6570\u4F9D\u8D56\u4E8E coreString.isLongDate \u51FD\u6570\u3002
    coreDate.isLongDate = function (date) { return coreString.isLongDate(date); };

    //  \u5224\u65AD\u6307\u5B9A\u7684\u65E5\u671F\u5B57\u7B26\u4E32\u662F\u5426\u662F\u5408\u6CD5\u7684\u77ED\u65E5\u671F\u683C\u5F0F\uFF1B
    //  \u8BE5\u51FD\u6570\u4F9D\u8D56\u4E8E coreString.isShortDate \u51FD\u6570\u3002
    coreDate.isShortDate = function (date) { return coreString.isShortDate(date); };

    //  \u5224\u65AD\u6307\u5B9A\u7684\u65E5\u671F\u662F\u5426\u4E3A\u95F0\u5E74\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u53EF\u4EE5\u662F\u4E00\u4E2A \u65E5\u671F(Date) \u5BF9\u8C61\uFF0C\u4E5F\u53EF\u4EE5\u662F\u8868\u793A\u65E5\u671F\u7684\u5B57\u7B26\u4E32\uFF0C\u6216\u8005\u662F\u4E00\u4E2A\u8868\u793A\u5E74\u4EFD\u7684\u6570\u5B57\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u6307\u5B9A\u7684\u65E5\u671F\u662F\u95F0\u5E74\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
    coreDate.isLeapYear = function (date) {
        var y = 0;
        if (coreDate.isDate(date)) {
            y = new Date(date).getYear();
        } else if (window.isNumeric(date)) {
            y = date;
        } else {
            throw "\u4F20\u5165\u7684\u53C2\u6570 date \u7684\u6570\u636E\u7C7B\u578B\u5FC5\u987B\u4E3A Date、String \u6216\u8005 Number\u3002";
        }
        var b = false;
        if (y >= 0) {
            b = (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0);
        } else {
            b = (y % 4 == 1 && y % 100 != 0) || (y % 400 == 1);
        }
        return b;
    };
    coreDate.prototype.isLeapYear = function () { return coreDate.isLeapYear(this); };

    //  \u521B\u5EFA\u4E00\u4E2A\u65B0\u7684 \u65E5\u671F(Date) \u5BF9\u8C61\uFF0C\u8FD4\u56DE\u7684\u503C\u4E0E\u5F53\u524D \u65E5\u671F\u5BF9\u8C61 \u7684\u503C\u76F8\u540C\uFF1B
    coreDate.clone = function (date) {
        var d = 0;
        if (coreDate.isDate(date)) {
            d = new Date(date).getTime();
        } else if (window.isNumeric(date)) {
            d = date;
        } else {
            throw "\u4F20\u5165\u7684\u53C2\u6570 date \u7684\u6570\u636E\u7C7B\u578B\u5FC5\u987B\u4E3A Date、String \u6216\u8005 Number\u3002";
        }
        return new Date(d);
    };
    coreDate.prototype.clone = function () { return coreDate.clone(this); };

    //  \u6BD4\u8F83\u4E24\u4E2A\u65E5\u671F\u5BF9\u8C61\u7684\u5927\u5C0F\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date1: \u7B2C 1 \u4E2A\u5F85\u6BD4\u8F83\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      date2: \u7B2C 2 \u4E2A\u5F85\u6BD4\u8F83\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C date1 > date2\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u5927\u4E8E 0 \u7684\u503C\uFF1B
    //      \u5982\u679C date1 < date2\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u5C0F\u4E8E 0 \u7684\u503C\uFF1B
    //      \u5982\u679C date1 == date2\uFF0C\u5219\u8FD4\u56DE 0\u3002
    coreDate.compare = function (date1, date2) {
        date1 = coreUtil.isDate(date1) ? date1 : new Date(date1);
        date2 = coreUtil.isDate(date2) ? date1 : new Date(date2);
        var d1 = date1.getTime();
        var d2 = date2.getTime();
        return coreUtil.compare(d1, d2);
    };
    coreDate.prototype.compareTo = function (date) { return coreDate.compare(this, date); };
    coreDate.prototype.equals = function (date) { return coreDate.compare(this, date) == 0; };

    //  \u83B7\u53D6\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u5F53\u524D\u8868\u793A\u7684\u5B63\u5EA6\uFF080 - 3\uFF09
    coreDate.getQuarter = function (date) {
        date = coreUtil.isDate(date) ? date : new Date(date);
        var m = date.getMonth();
        var q = 0;
        if (m >= 0 && m < 3) {
            q = 0;
        } else if (m >= 3 && m < 6) {
            q = 1;
        } else if (m >= 6 && m < 9) {
            q = 2;
        } else if (m >= 9 && m < 12) {
            q = 3;
        }
        return q;
    };
    coreDate.prototype.getQuarter = function () { return coreDate.getQuarter(this); };

    //  \u83B7\u53D6\u5F53\u524D\u65E5\u671F\u5BF9\u8C61\u8868\u793A\u6240\u5728\u5468\u7684\u661F\u671F\u51E0\uFF080 - 6\uFF09
    coreDate.getDayOfWeek = function (date) {
        date = coreUtil.isDate(date) ? date : new Date(date);
        return date.getDay();
    };
    coreDate.prototype.getDayOfWeek = function () { return coreDate.getDayOfWeek(this); }

    //  \u83B7\u53D6\u5F53\u524D\u65E5\u671F\u5BF9\u8C61\u6240\u5728\u5E74\u7684\u7B2C\u51E0\u5468\u8BA1\u6570\u3002
    coreDate.getWeek = function (date, weekStart) {
        date = coreUtil.isDate(date) ? date : new Date(date);
        weekStart = (weekStart || 0) - 0;
        if (!coreUtil.isNumeric(weekStart) || weekStart > 6) { weekStart = 0; }
        var year = date.getFullYear();
        var firstDay = new Date(year, 0, 1);
        var firstWeekDays = 7 - firstDay.getDay() + weekStart;
        var dayOfYear = (((new Date(year, date.getMonth(), date.getDate())) - firstDay) / (24 * 3600 * 1000)) + 1;
        return Math.ceil((dayOfYear - firstWeekDays) / 7) + 1;
    };
    coreDate.prototype.getWeek = function (weekStart) { return coreDate.getWeek(this, weekStart); };

    //  \u83B7\u53D6\u5F53\u524D\u65E5\u671F\u5BF9\u8C61\u6240\u5728\u6708\u7684\u7B2C\u51E0\u5468\u8BA1\u6570\u3002
    coreDate.getWeekOfMonth = function (date, weekStart) {
        date = coreUtil.isDate(date) ? date : new Date(date);
        weekStart = (weekStart || 0) - 0;
        if (!coreUtil.isNumeric(weekStart) || weekStart > 6) { weekStart = 0; }
        var dayOfWeek = date.getDay();
        var day = date.getDate();
        return Math.ceil((day - dayOfWeek - 1) / 7) + ((dayOfWeek >= weekStart) ? 1 : 0);
    };
    coreDate.prototype.getWeekOfMonth = function (weekStart) { return coreDate.getWeekOfMonth(this, weekStart); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u7684\u6BEB\u79D2\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      millisec: \u8981\u6DFB\u52A0\u7684\u6BEB\u79D2\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u6BEB\u79D2\u6570\u540E\u7684\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.addTime = function (date, millisec) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(millisec)) { millisec = Date.parse(millisec); }
        return new Date(d + millisec);
    };
    coreDate.prototype.addTime = function (millisec) { return coreDate.addTime(this, millisec); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u7684\u5929\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      days: \u8981\u6DFB\u52A0\u7684\u5929\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u5929\u6570\u540E\u7684\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.addDays = function (date, days) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(days)) { return new Date(d); }
        var millisec = 86400000 * days;
        return new Date(d + millisec);
    };
    coreDate.prototype.addDays = function (days) { return coreDate.addDays(this, days); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u7684\u5C0F\u65F6\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      hours: \u8981\u6DFB\u52A0\u7684\u5C0F\u65F6\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u5C0F\u65F6\u6570\u540E\u7684\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.addHours = function (date, hours) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(hours)) { return new Date(d); }
        var millisec = 3600000 * hours;
        return new Date(d + millisec);
    };
    coreDate.prototype.addHours = function (hours) { return coreDate.addHours(this, hours); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u7684\u6BEB\u79D2\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      millisec: \u8981\u6DFB\u52A0\u7684\u6BEB\u79D2\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u6BEB\u79D2\u6570\u540E\u7684\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.addMilliseconds = function (date, millisec) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(millisec)) { return new Date(d); }
        return new Date(d + millisec);
    };
    coreDate.prototype.addMilliseconds = function (millisec) { return coreDate.addMilliseconds(this, millisec); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u7684\u5206\u949F\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      minutes: \u8981\u6DFB\u52A0\u7684\u5206\u949F\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u5206\u949F\u6570\u540E\u7684\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.addMinutes = function (date, minutes) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(minutes)) { return new Date(d); }
        var millisec = 60000 * minutes;
        return new Date(d + millisec);
    };
    coreDate.prototype.addMinutes = function (minutes) { return coreDate.addMinutes(this, minutes); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u7684\u661F\u671F\u5468\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      weeks: \u8981\u6DFB\u52A0\u7684\u661F\u671F\u5468\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u661F\u671F\u5468\u6570\u540E\u7684\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.addWeeks = function (date, weeks) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(weeks)) { return new Date(d); }
        var millisec = 86400000 * 7 * weeks;
        return new Date(d + millisec);
    };
    coreDate.prototype.addWeeks = function (weeks) { return coreDate.addWeeks(this, weeks); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u7684\u6708\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      months: \u8981\u6DFB\u52A0\u7684\u6708\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u6708\u6570\u540E\u7684\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.addMonths = function (date, months) {
        if (!coreUtil.isDate(date)) { date = new Date(date); }
        if (!coreUtil.isNumeric(months)) { months = 0; }
        return new Date(date.getFullYear(), date.getMonth() + months, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    coreDate.prototype.addMonths = function (months) { return coreDate.addMonths(this, months); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u7684\u79D2\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      seconds: \u8981\u6DFB\u52A0\u7684\u79D2\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u79D2\u6570\u540E\u7684\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.addSeconds = function (date, seconds) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(seconds)) { return new Date(d); }
        var millisec = 1000 * seconds;
        return new Date(d + millisec);
    };
    coreDate.prototype.addSeconds = function (seconds) { return coreDate.addSeconds(this, seconds); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u7684\u767E\u7EB3\u79D2\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      ticks: \u8981\u6DFB\u52A0\u7684\u767E\u7EB3\u79D2\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u767E\u7EB3\u79D2\u6570\u540E\u7684\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.addTicks = function (date, ticks) {
        var d = Date.parse(date);
        if (!coreUtil.isNumeric(ticks)) { return new Date(d); }
        var millisec = 0.000001 * ticks;
        return new Date(d + millisec);
    };
    coreDate.prototype.addTicks = function (ticks) { return coreDate.addTicks(this, ticks); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u7684\u5E74\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      years: \u8981\u6DFB\u52A0\u7684\u5E74\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u5E74\u6570\u540E\u7684\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.addYears = function (date, years) {
        if (!coreUtil.isDate(date)) { date = new Date(date); }
        if (!coreUtil.isNumeric(years)) { years = 0; }
        return new Date(date.getFullYear() + years, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    coreDate.prototype.addYears = function (years) { return coreDate.addYears(this, years); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u7684\u5B63\u5EA6\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      quarters: \u8981\u6DFB\u52A0\u7684\u5B63\u5EA6\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\u3002
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u5B63\u5EA6\u6570\u540E\u7684\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.addQuarters = function (date, quarters) {
        if (!coreUtil.isDate(date)) { date = new Date(date); }
        if (!coreUtil.isNumeric(quarters)) { quarters = 0; }
        return new Date(date.getFullYear(), date.getMonth() + quarters * 3, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    coreDate.prototype.addQuarters = function (quarters) { return coreDate.addQuarters(this, quarters); };

    //  \u7ED9\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u6DFB\u52A0\u6307\u5B9A\u65E5\u671F\u90E8\u5206\u7684\u6307\u5B9A\u6570\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      datepart: \u6307\u5B9A\u7684\u65E5\u671F\u90E8\u5206\uFF0C\u5B57\u7B26\u4E32\u683C\u5F0F\uFF0C\u53EF\u9009\u7684\u503C\u9650\u5B9A\u4E3A\uFF1A
    //          yy \u6216 yyyy:  \u8868\u793A\u5E74\uFF1B
    //          qq \u6216 q:     \u8868\u793A\u5B63\u5EA6\uFF1B
    //          mm \u6216 m:     \u8868\u793A\u6708\uFF1B
    //          dd \u6216 d:     \u8868\u793A\u65E5(\u5929)\uFF1B
    //          wk \u6216 ww:    \u8868\u793A\u5468\uFF1B
    //          hh:          \u8868\u793A\u5C0F\u65F6\uFF1B
    //          mi \u6216 n:     \u8868\u793A\u5206\u949F\uFF1B
    //          ss \u6216 s:     \u8868\u793A\u79D2\uFF1B
    //          ms:          \u8868\u793A\u6BEB\u79D2\uFF1B
    //      number: \u8981\u6DFB\u52A0\u7684\u6307\u5B9A\u65E5\u671F\u90E8\u5206\u7684\u6307\u5B9A\u6570\u91CF\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u8D1F\u6570\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1Adate \u6DFB\u52A0\u6307\u5B9A\u65E5\u671F\u90E8\u5206\u7684\u6307\u5B9A\u6570\u540E\u7684\u4E00\u4E2A\u65B0\u503C\uFF1B\u6CE8\u610F\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u4F1A\u4FEE\u6539\u6E90\u65E5\u671F\u5BF9\u8C61 date\uFF0C\u800C\u662F\u8FD4\u56DE\u4E00\u4E2A\u65B0\u521B\u5EFA\u7684\u65E5\u671F\u5BF9\u8C61\u3002
    coreDate.add = function (date, datepart, number) {
        if (!coreUtil.isString(datepart)) { return date; }
        if (!coreUtil.isNumeric(number)) { return date; }
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = coreDate.addYears(date, number);
                break;
            case "qq":
            case "q":
                d = coreDate.addQuarters(date, number);
                break;
            case "mm":
            case "m":
                d = coreDate.addMonths(date, number);
                break;
            case "dd":
            case "d":
                d = coreDate.addDays(date, number);
                break;
            case "wk":
            case "ww":
                d = coreDate.addWeeks(date, number);
                break;
            case "hh":
                d = coreDate.addHours(date, number);
                break;
            case "mi":
            case "n":
                d = coreDate.addMinutes(date, number);
                break;
            case "ss":
            case "s":
                d = coreDate.addSeconds(date, number);
                break;
            case "ms":
                d = coreDate.addMilliseconds(date, number);
                break;
            default:
                throw "\u4F20\u5165\u7684\u53C2\u6570 datepart \u4E3A\u4E0D\u53EF\u8BC6\u522B\u7684\u503C\u3002";
                break;
        }
        return d;
    };
    coreDate.prototype.add = function (datepart, number) { return coreDate.add(this, datepart, number); };

    //  \u6BD4\u8F83\u4E24\u4E2A\u65E5\u671F\u5BF9\u8C61\u6307\u5B9A\u90E8\u5206\u7684\u5DEE\uFF0C\u5E76\u8FD4\u56DE\u6BD4\u8F83\u7ED3\u679C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      datepart: \u6307\u5B9A\u7684\u65E5\u671F\u90E8\u5206\uFF0C\u5B57\u7B26\u4E32\u683C\u5F0F\uFF0C\u53EF\u9009\u7684\u503C\u9650\u5B9A\u4E3A\uFF1A
    //          yy \u6216 yyyy:  \u8868\u793A\u5E74\uFF1B
    //          qq \u6216 q:     \u8868\u793A\u5B63\u5EA6\uFF1B
    //          mm \u6216 m:     \u8868\u793A\u6708\uFF1B
    //          dd \u6216 d:     \u8868\u793A\u65E5(\u5929)\uFF1B
    //          wk \u6216 ww:    \u8868\u793A\u5468\uFF1B
    //          hh:          \u8868\u793A\u5C0F\u65F6\uFF1B
    //          mi \u6216 n:     \u8868\u793A\u5206\u949F\uFF1B
    //          ss \u6216 s:     \u8868\u793A\u79D2\uFF1B
    //          ms:          \u8868\u793A\u6BEB\u79D2\uFF1B
    //      value: \u8981\u6BD4\u8F83\u7684\u65E5\u671F\u5BF9\u8C61\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE date \u65E5\u671F\u5BF9\u8C61 \u548C value \u65E5\u671F\u5BF9\u8C61 \u6307\u5B9A\u90E8\u5206\u7684\u6570\u503C\u7684\u5DEE\u3002
    coreDate.diff = function (date, datepart, value) {
        if (!coreUtil.isString(datepart)) { return null; }
        value = coreUtil.isDate(value) ? value : new Date(value);
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = value.getFullYear() - date.getFullYear();
                break;
            case "qq":
            case "q":
                var quarter = coreDate.getQuarter(value);
                d = quarter + ((value.getFullYear() - date.getFullYear()) * 3) - quarter;
                break;
            case "mm":
            case "m":
                d = (value.getMonth() + 1) + ((value.getFullYear() - date.getFullYear()) * 12) - (date.getMonth() + 1);
                break;
            case "dd":
            case "d":
                d = parseInt((value - date) / 86400000);
                break;
            case "wk":
            case "ww":
                d = parseInt((value - date) / (86400000 * 7));
                break;
            case "hh":
                d = parseInt((value - date) / 3600000);
                break;
            case "mi":
            case "n":
                d = parseInt((value - date) / 60000);
                break;
            case "ss":
            case "s":
                d = parseInt((value - date) / 1000);
                break;
            case "ms":
                d = value - date;
                break;
            default:
                throw "\u4F20\u5165\u7684\u53C2\u6570 datepart \u4E3A\u4E0D\u53EF\u8BC6\u522B\u7684\u503C\u3002";
                break;
        }
        return d;
    };
    coreDate.prototype.diff = function (datepart, value) { return coreDate.diff(this, datepart, value); };

    //  \u8FD4\u56DE\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u7684\u6307\u5B9A\u90E8\u5206\u7684\u503C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date: \u6E90\u65E5\u671F\u5BF9\u8C61\uFF1B
    //      datepart: \u6307\u5B9A\u7684\u65E5\u671F\u90E8\u5206\uFF0C\u5B57\u7B26\u4E32\u683C\u5F0F\uFF0C\u53EF\u9009\u7684\u503C\u9650\u5B9A\u4E3A\uFF1A
    //          yy \u6216 yyyy:  \u8868\u793A\u5E74\uFF1B
    //          qq \u6216 q:     \u8868\u793A\u5B63\u5EA6\uFF1B
    //          mm \u6216 m:     \u8868\u793A\u6708\uFF1B
    //          dd \u6216 d:     \u8868\u793A\u65E5(\u5929)\uFF1B
    //          wk \u6216 ww:    \u8868\u793A\u5468\uFF1B
    //          hh:          \u8868\u793A\u5C0F\u65F6\uFF1B
    //          mi \u6216 n:     \u8868\u793A\u5206\u949F\uFF1B
    //          ss \u6216 s:     \u8868\u793A\u79D2\uFF1B
    //          ms:          \u8868\u793A\u6BEB\u79D2\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u6307\u5B9A\u65E5\u671F\u5BF9\u8C61\u7684\u6307\u5B9A\u90E8\u5206\u7684\u503C\uFF1B
    coreDate.part = function (date, datepart) {
        if (!coreUtil.isString(datepart)) { return null; }
        date = coreUtil.isDate(date) ? date : new Date(date);
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = date.getFullYear();
                break;
            case "qq":
            case "q":
                d = coreDate.getQuarter(date);
                break;
            case "mm":
            case "m":
                d = date.getMonth();
                break;
            case "dd":
            case "d":
                d = date.getDate();
                break;
            case "wk":
            case "ww":
                d = date.getWeek();
                break;
            case "hh":
                d = date.getHours();
                break;
            case "mi":
            case "n":
                d = date.getMinutes();
                break;
            case "ss":
            case "s":
                d = date.getSeconds();
                break;
            case "ms":
                d = date.getMilliseconds();
                break;
            default:
                throw "\u4F20\u5165\u7684\u53C2\u6570 datepart \u4E3A\u4E0D\u53EF\u8BC6\u522B\u7684\u503C\u3002";
                break;
        }
        return d;
    };
    coreDate.prototype.part = function (datepart) { return coreDate.part(this, datepart); };

    //  \u8FD4\u56DE\u5F53\u524D\u65E5\u671F\u5BF9\u8C61\u7684\u683C\u5F0F\u5316\u5B57\u7B26\u503C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      date:   \u8981\u8FDB\u884C\u683C\u5F0F\u5316\u7684\u65E5\u671F\u5BF9\u8C61
    //      format: \u8FD4\u56DE\u5B57\u7B26\u4E32\u683C\u5F0F\u5B9A\u4E49
    coreDate.format = function (date, format) {
        if (!coreUtil.isDate(date)) { return null; };
        format = coreString.isNullOrWhiteSpace(format) ? format : "yyyy-MM-dd";
        switch (typeof date) {
            case "string":
                date = new Date(date.replace(/-/, "/"));
                break;
            case "number":
                date = new Date(date);
                break;
        }
        var dict = {
            "yyyy": date.getFullYear(),
            "M": date.getMonth() + 1,
            "d": date.getDate(),
            "H": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds(),
            "MM": ("" + (date.getMonth() + 101)).substr(1),
            "dd": ("" + (date.getDate() + 100)).substr(1),
            "HH": ("" + (date.getHours() + 100)).substr(1),
            "mm": ("" + (date.getMinutes() + 100)).substr(1),
            "ss": ("" + (date.getSeconds() + 100)).substr(1)
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
            return dict[arguments[0]];
        });
    };
    coreDate.prototype.format = function (format) { return coreDate.format(this, format); };

    //  \u83B7\u53D6\u5F53\u524D\u65E5\u671F\u65F6\u95F4\u7684\u957F\u5B57\u7B26\u4E32\u683C\u5F0F\uFF0C\u8FD4\u56DE\u7684\u65E5\u671F\u65F6\u95F4\u5B57\u7B26\u4E32\u683C\u5F0F\u5982 \u201C2013\u5E7405\u670816\u65E5 \u661F\u671F\u56DB \u590F\u5B63, \u4E0B\u5348 15:38:11\u201D
    coreDate.toLongDateTimeString = function (date) {
        date = coreUtil.isDate(date) ? date : new Date(date);
        var year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            week = date.getDay(),
            quarter = coreDate.getQuarter(date),
            hoursArray = ["\u5348\u591C", "\u51CC\u6668", "\u65E9\u4E0A", "\u4E0A\u5348", "\u4E2D\u5348", "\u4E0B\u5348", "\u508D\u665A", "\u665A\u4E0A"],
            weekArray = ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"],
            monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            quarterArray = ["\u6625", "\u590F", "\u79CB", "\u51AC"],
            hourSpan = hoursArray[Math.floor(parseFloat(hours) / 3)],
            weekSpan = weekArray[week],
            monthSpan = monthArray[month],
            quarterSpan = quarterArray[quarter];
        return coreString.format(
            "{0}\u5E74{1}\u6708{2}\u65E5 {3} {4}\u5B63, {5} {6}:{7}:{8}",
            year,
            ("" + (month + 101)).substr(1),
            ("" + (day + 100)).substr(1),
            weekSpan,
            quarterSpan,
            hourSpan,
            ("" + (hours + 100)).substr(1),
            ("" + (minutes + 100)).substr(1),
            ("" + (seconds + 100)).substr(1));
    };
    coreDate.prototype.toLongDateTimeString = function () { return coreDate.toLongDateTimeString(this); };





    var _html5ValidateCache = {};
    //  \u6D4B\u8BD5\u6307\u5B9A\u7684 html \u6807\u7B7E\u662F\u5426\u5177\u5907\u76F8\u5E94\u7684\u5C5E\u6027\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      propName:   \u5F85\u6D4B\u8BD5\u7684\u5C5E\u6027\u540D\uFF1B
    //      tagName:    \u88AB\u6D4B\u8BD5\u7684 html \u6807\u7B7E\u540D\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u6307\u5B9A\u7684\u6807\u7B7E\u540D(tagName)\u6240\u8868\u793A\u7684 html \u6807\u7B7E\u5177\u5907\u76F8\u5E94\u7684\u5C5E\u6027\u540D propName\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
    coreHtml5.testProp = function (propName, tagName) {
        propName = coreString.trim(propName);
        tagName = coreString.trim(tagName);
        if (propName) { propName = propName.toLowerCase(); }
        if (tagName) { tagName = tagName.toLowerCase(); }
        var tag = _html5ValidateCache[tagName];
        if (!tag) { _html5ValidateCache[tagName] = tag = document.createElement(tagName); }
        return propName in tag ? true : false;
    };



    //  \u5224\u65AD\u6307\u5B9A\u7684\u5BF9\u8C61\u662F\u5426\u4E3A\u4E00\u4E2A HTML-DOM \u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      obj\uFF1A    \u8981\u5224\u65AD\u7684\u5BF9\u8C61\uFF1B
    //      doc\uFF1A    \u8BE5\u53C2\u6570\u53EF\u9009\uFF1B\u8868\u793A obj \u6240\u5728\u9875\u9762\u7684 document\uFF1B\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5219\u9ED8\u8BA4\u4F7F\u7528\u5F53\u524D\u9875\u9762\u7684 document\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C obj \u662F\u4E00\u4E2A HTML-DOM \u5BF9\u8C61\u4E14\u5B58\u5728\u4E8E\u6307\u5B9A\u7684 document \u4E2D\uFF0C\u5219\u8FD4\u56DE true\uFF1B\u5426\u5219\u8FD4\u56DE false\u3002
    coreUtil.isDOM = function (obj, doc) {
        if (!obj) { return false; }
        doc = doc || document;
        return obj.nodeName && obj.nodeType == 1 && obj.ownerDocument == doc;
    };



    //  \u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\u6D4F\u89C8\u5668\u81EA\u52A8\u7ED9\u6240\u6709 DOM \u5143\u7D20\u589E\u52A0\u552F\u4E00\u6807\u8BC6\u7B26\u7684\u529F\u80FD\u3002
    var _enableUniqueID = false;
    //  \u8BE5\u5C5E\u6027\u8868\u793A\u6D4F\u89C8\u5668\u81EA\u52A8\u7ED9\u6240\u6709 DOM \u5143\u7D20\u589E\u52A0\u7684\u552F\u4E00\u6807\u8BC6\u7B26\u7684\u540D\u79F0\u3002
    coreUtil.uniqueIdName = "uniqueID";

    //  \u83B7\u53D6 HTML DOM \u5BF9\u8C61\u7684 GUID \u503C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      element:    \u5FC5\u987B\uFF0C\u8868\u793A\u9700\u8981\u83B7\u53D6 uniqueID \u5C5E\u6027\u7684 DOM \u5BF9\u8C61\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE element \u5143\u7D20\u7684 uniqueID \u503C\uFF1B\u5982\u679C\u8BE5\u5143\u7D20\u672A\u5B9A\u4E49\u8BE5\u503C\uFF0C\u5219\u8FD4\u56DE undefined\u3002
    coreUtil.getElementUniqueID = function (element) {
        return element != undefined && element != null && element.getAttribute ? element.getAttribute(coreUtil.uniqueIdName) : null;
    };

    //  \u5224\u65AD HTML DOM \u5BF9\u8C61\u662F\u5426\u5177\u6709 uniqueID \u5C5E\u6027\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      element:    \u5FC5\u987B\uFF0C\u8868\u793A\u9700\u8981\u5224\u65AD\u662F\u5426\u5177\u6709 uniqueID \u5C5E\u6027\u7684 DOM \u5BF9\u8C61\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C element \u5143\u7D20\u5177\u6709 uniqueID \u5C5E\u6027\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
    coreUtil.hasUniqueID = function (element) {
        return !coreString.isNullOrWhiteSpace(coreUtil.getElementUniqueID(element));
    };

    //  \u7ED9 HTML DOM \u5BF9\u8C61\u8BBE\u7F6E\u4E00\u4E2A\u65B0\u7684 uniqueID \u503C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      element:    \u5FC5\u987B\uFF0C\u8868\u793A\u9700\u8981\u8BBE\u7F6E uniqueID \u5C5E\u6027\u7684 DOM \u5BF9\u8C61\uFF1B
    //      uniqueID:   \u53EF\u9009\uFF0C\u8868\u793A\u8981\u7ED9 element \u5143\u7D20\u8BBE\u7F6E\u7684 uniqueID \u503C\uFF1B\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u503C\uFF0C\u5219\u4F1A\u8C03\u7528 coreUtil.guid \u65B9\u6CD5\u81EA\u52A8\u751F\u6210\u4E00\u4E2A uniqueID \u503C\u3002
    coreUtil.setElementUniqueID = function (element, uniqueID) {
        if (element == undefined || element == null || !element.setAttribute) { return; }
        var nodeName = (element.nodeName || coreUtil.uniqueIdName) + "_";
        uniqueID = coreString.isNullOrWhiteSpace(uniqueID) ? nodeName + coreUtil.guid("N") : uniqueID;
        element.setAttribute(coreUtil.uniqueIdName, uniqueID, 0);
    };

    //  \u521D\u59CB\u5316 HTML DOM \u5BF9\u8C61\u7684 uniqueID \u503C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      element:    \u5FC5\u987B\uFF0C\u8868\u793A\u9700\u8981\u521D\u59CB\u5316 uniqueID \u5C5E\u6027\u7684 DOM \u5BF9\u8C61\uFF1B
    //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u5224\u65AD element \u5143\u7D20\u662F\u5426\u5177\u6709 uniqueID \u5C5E\u6027\u503C\uFF0C\u5982\u679C\u6709\u5219\u4E0D\u8FDB\u884C\u4EFB\u4F55\u66F4\u6539\uFF1B\u5982\u679C\u6CA1\u6709\u5219\u4E3A\u671F\u8BBE\u7F6E\u4E00\u4E2A\u65B0\u7684 uniqueID \u503C\u3002
    coreUtil.initElementUniqueID = function (element) {
        if (!coreUtil.hasUniqueID(element)) { coreUtil.setElementUniqueID(element) }
    };

    coreUtil._createElement = document.createElement;
    coreUtil._createDocumentFragment = document.createDocumentFragment;

    //  \u91CD\u5199 document.createElement \u65B9\u6CD5\uFF0C\u4F7F\u4E4B\u5728\u521B\u5EFA dom \u5BF9\u8C61\u7684\u540C\u65F6\u8FD8\u7ED9\u5BF9\u8C61\u6DFB\u52A0\u4E00\u4E2A\u552F\u4E00\u6807\u8BC6\u7B26 uniqueID\u3002
    coreUtil.createElement = function () {
        var element = coreUtil._createElement.apply(this, arguments);
        if (!_enableUniqueID) { return element; }
        coreUtil.initElementUniqueID(element);
        return element;
    };

    //  \u91CD\u5199 document.createDocumentFragment \u65B9\u6CD5\uFF0C\u4F7F\u4E4B\u5728\u521B\u5EFA\u6587\u6863\u788E\u7247\u5E76\u5411\u6587\u6863\u788E\u7247\u6DFB\u52A0\u5B50\u8282\u70B9\u65F6\u5411\u5B50\u8282\u70B9\u6DFB\u52A0\u4E00\u4E2A\u552F\u4E00\u6807\u8BC6\u7B26 uniqueID\u3002
    coreUtil.createDocumentFragment = function () {
        var documentFragment = coreUtil._createDocumentFragment.apply(this, arguments);
        if (!_enableUniqueID) { return documentFragment; }
        var appendChild = documentFragment.appendChild;
        documentFragment.appendChild = function (child) {
            $("*", child).add(child).each(function () { coreUtil.initElementUniqueID(this); });
            return appendChild.apply(this, arguments);
        };
        return documentFragment;
    };

    //  \u542F\u7528\u6216\u8005\u7981\u7528\u6D4F\u89C8\u5668\u81EA\u52A8\u7ED9 DOM \u5143\u7D20\u8BBE\u7F6E\u5168\u5C40\u552F\u4E00\u6807\u8BC6\u7B26\u529F\u80FD\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      enableUniqueID\uFF1B\u5FC5\u987B\uFF0C\u5E03\u5C14\u7C7B\u578B\u503C\uFF0C\u8868\u793A\u542F\u7528\u6216\u7981\u7528\u8BE5\u529F\u80FD\uFF1B
    coreUtil.setEnableUniqueID = function (enableUniqueID) {
        enableUniqueID = coreUtil.isBoolean(enableUniqueID) ? enableUniqueID : false;
        _enableUniqueID = enableUniqueID;
        if (enableUniqueID) {
            document.createElement = coreUtil.createElement;
            document.createDocumentFragment = coreUtil.createDocumentFragment;
            $("*").each(function () { coreUtil.initElementUniqueID(this); });
        } else {
            document.createElement = coreUtil._createElement;
            document.createDocumentFragment = coreUtil._createDocumentFragment;
        }
    };

    //  \u542F\u7528\u6D4F\u89C8\u5668\u81EA\u52A8\u7ED9 DOM \u5143\u7D20\u8BBE\u7F6E\u5168\u5C40\u552F\u4E00\u6807\u8BC6\u7B26\u529F\u80FD\uFF1B
    coreUtil.enableUniqueID = function () { coreUtil.setEnableUniqueID(true); };

    //  \u7981\u7528\u6D4F\u89C8\u5668\u81EA\u52A8\u7ED9 DOM \u5143\u7D20\u8BBE\u7F6E\u5168\u5C40\u552F\u4E00\u6807\u8BC6\u7B26\u529F\u80FD\uFF1B
    coreUtil.disableUniqueID = function () { coreUtil.setEnableUniqueID(false); };

    //  \u83B7\u53D6\u6D4F\u89C8\u5668\u662F\u5426\u542F\u7528\u4E86\u81EA\u52A8\u7ED9 DOM \u5143\u7D20\u8BBE\u7F6E\u5168\u5C40\u552F\u4E00\u6807\u8BC6\u7B26\u529F\u80FD\uFF1B
    coreUtil.getEnableUniqueID = function () { return _enableUniqueID; };



    //  \u5224\u65AD\u6307\u5B9A\u7684 window \u5BF9\u8C61\u662F\u5426\u5177\u6709\u53EF\u8BBF\u95EE\u7684\u7236\u7EA7\u9875\u9762\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A Boolean \u503C\uFF1B
    //      \u5F53\u524D\u9875\u9762\u5728\u4E00\u4E2A FRAME/IFRAME \u4E2D\u4E14\u7236\u7EA7\u9875\u9762\u548C\u5F53\u524D\u9875\u9762\u540C\u57DF\uFF0C\u5219\u8FD4\u56DE true\uFF1B
    //      \u5F53\u524D\u9875\u9762\u4E0D\u662F\u5728\u4E00\u4E2A FRAME/IFRAME \u4E2D\u6216\u7236\u7EA7\u9875\u9762\u548C\u5F53\u524D\u9875\u9762\u4E0D\u540C\u57DF\uFF0C\u5219\u8FD4\u56DE false\u3002
    coreUtil.hasParentWindow = function (win) {
        var ret = false;
        try {
            var p = win.parent;
            ret = p && coreUtil.isWindow(p) && coreUtil.isObject(p.document) ? true : false;
        } catch (ex) { }
        return ret;
    };
    //  \u83B7\u53D6\u5F53\u524D\u9875\u9762\u7684\u53EF\u8BBF\u95EE(\u540C\u57DF)\u7684\u9876\u7EA7\u9875\u9762\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A window \u5BF9\u8C61\uFF1B
    coreUtil.getTop = function () {
        var w = window;
        while (coreUtil.hasParentWindow(w) && w != w.parent) { w = w.parent; }
        return w;
    };
    //  \u83B7\u53D6\u5F53\u524D\u9875\u9762\u7684\u53EF\u8BBF\u95EE(\u540C\u57DF)\u7684\u7236\u7EA7\u9875\u9762\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A window \u5BF9\u8C61\uFF1B
    coreUtil.getParent = function () {
        var w = window;
        if (coreUtil.hasParentWindow(w) && w != w.parent) { w = w.parent; }
        return w;
    };

    //  \u83B7\u53D6\u5F53\u524D\u9875\u9762\u6240\u5728\u7236\u7EA7\u9875\u9762\u7684 window \u5BF9\u8C61\uFF1B\u5982\u679C\u7236\u7EA7\u9875\u9762\u4E0D\u53EF\u8BBF\u95EE\uFF0C\u5219\u8FD4\u56DE\u5F53\u524D\u9875\u9762\u7684 window \u5BF9\u8C61\uFF1B
    //  \u5982\u679C\u5F53\u524D\u9875\u9762\u4E3A\u9876\u7EA7\u9875\u9762\u6216\u5F53\u524D\u9875\u9762\u7684\u7236\u7EA7\u9875\u9762\u548C\u5F53\u524D\u9875\u9762\u4E0D\u5728\u540C\u4E00\u4E2A\u57DF\u4E0B\uFF0C\u5219\u8FD4\u56DE\u5F53\u524D\u9875\u9762\u7684 window \u5BF9\u8C61\u3002
    parent = coreUtil.parent = coreUtil.getParent();

    //  \u83B7\u53D6\u5F53\u524D\u9875\u9762\u6240\u5728\u9876\u7EA7\u9875\u9762\u7684 window \u5BF9\u8C61\uFF1B\u5982\u679C\u9876\u7EA7\u9875\u9762\u4E0D\u53EF\u8BBF\u95EE\uFF0C\u5219\u8FD4\u56DE\u6B21\u7EA7\u9875\u9762\u7684 window \u5BF9\u8C61\uFF1B\u4EE5\u6B64\u7C7B\u63A8\u3002
    //  \u5982\u679C\u5F53\u524D\u9875\u9762\u4E3A\u9876\u7EA7\u9875\u9762\u6216\u5F53\u524D\u9875\u9762\u7684\u7236\u7EA7\u9875\u9762\u548C\u5F53\u524D\u9875\u9762\u4E0D\u5728\u540C\u4E00\u4E2A\u57DF\u4E0B\uFF0C\u5219\u8FD4\u56DE\u5F53\u524D\u9875\u9762\u7684 window \u5BF9\u8C61\u3002
    top = coreUtil.top = coreUtil.getTop();

    //  \u5224\u65AD\u5F53\u524D\u6D4F\u89C8\u5668\u7A97\u53E3\u662F\u5426\u4E3A\u9876\u7EA7\u7A97\u53E3\u3002
    coreUtil.isTopMost = coreUtil.isTop = (window == window.top);

    coreUtil.hasParentJquery = function (win) {
        var ret = false;
        try {
            var p = win.parent;
            ret = p && coreUtil.isWindow(p) && coreUtil.isObject(p.document) && coreUtil.isFunction(p.jQuery) ? true : false;
        } catch (ex) { }
        return ret;
    };
    coreUtil.getTopJquery = function () {
        if (coreUtil.isTopMost) { return $; }
        var w = window;
        while (coreUtil.hasParentJquery(w) && w != w.parent) { w = w.parent; }
        return w.jQuery;
    };
    var topJquery = coreUtil.isTopMost ? $ : coreUtil.getTopJquery();

    //  \u83B7\u53D6\u5F53\u524D\u9875\u9762\u6240\u5728\u9876\u7EA7\u7A97\u53E3\u7684 jQuery \u5BF9\u8C61\uFF1B\u5982\u679C\u9876\u7EA7\u7A97\u53E3\u4E0D\u5B58\u5728 jQuery \u5BF9\u8C61\u6216\u8005 jQuery \u5BF9\u8C61\u65E0\u6CD5\u8BBF\u95EE(\u4F8B\u5982\u8DE8\u57DF\u60C5\u51B5\u4E0B) \u5219\u8FD4\u56DE\u6B21\u7EA7 jQuery \u5BF9\u8C61\uFF1B\u4EE5\u6B64\u7C7B\u63A8\uFF1B
    coreUtil.$ = coreUtil.jQuery = coreUtil.topJquery = topJquery;

    //  \u83B7\u53D6\u5305\u542B\u5F53\u524D\u9875\u9762\u7684 iframe \u5BF9\u8C61\u3002
    //  \u5982\u679C\u5F53\u524D\u9875\u9762\u4E3A\u9876\u7EA7\u9875\u9762\u6216\u5F53\u524D\u9875\u9762\u7684\u7236\u7EA7\u9875\u9762\u548C\u5F53\u524D\u9875\u9762\u4E0D\u5728\u540C\u4E00\u4E2A\u57DF\u4E0B\uFF0C\u5219\u8FD4\u56DE null\u3002
    coreUtil.currentFrame = null;

    //  \u83B7\u53D6\u5305\u542B\u5F53\u524D\u9875\u9762\u7684 iframe \u5BF9\u8C61\u7684 id\u3002
    //  \u5982\u679C\u5F53\u524D\u9875\u9762\u4E3A\u9876\u7EA7\u9875\u9762\u6216\u5F53\u524D\u9875\u9762\u7684\u7236\u7EA7\u9875\u9762\u548C\u5F53\u524D\u9875\u9762\u4E0D\u5728\u540C\u4E00\u4E2A\u57DF\u4E0B\uFF0C\u5219\u8FD4\u56DE null\u3002
    coreUtil.currentFrameId = null;

    //  \u83B7\u53D6\u5305\u542B\u5F53\u524D\u9875\u9762\u7684 iframe \u5BF9\u8C61\u7684 uniqueID\u3002
    //  \u5982\u679C\u5F53\u524D\u9875\u9762\u4E3A\u9876\u7EA7\u9875\u9762\u6216\u5F53\u524D\u9875\u9762\u7684\u7236\u7EA7\u9875\u9762\u548C\u5F53\u524D\u9875\u9762\u4E0D\u5728\u540C\u4E00\u4E2A\u57DF\u4E0B\uFF0C\u5219\u8FD4\u56DE null\u3002
    coreUtil.currentFrameUniqueID = null;
    coreUtil.getCurrentFrame = function () {
        if (coreUtil.isTopMost) { return null; }
        var result = null;
        var frames = coreArray.merge([], top.document.getElementsByTagName("iframe"), top.document.getElementsByTagName("frame"));
        var find = function (frame) {
            var win = frame.contentWindow;
            if (win === window) { return frame; }
            try {
                if (!win || !coreUtil.isObject(win.document)) { return null; }
                var fs = coreArray.merge([], win.document.getElementsByTagName("iframe"), win.document.getElementsByTagName("frame"));
                $.each(fs, function () { result = find(this); return result == null; });
            } catch (ex) { }
            return result;
        };
        $.each(frames, function () { result = find(this); return result == null; });
        return result;
    };
    if (!coreUtil.isTopMost) { coreUtil.currentFrame = coreUtil.getCurrentFrame(); }
    if (coreUtil.currentFrame != null) { coreUtil.currentFrameId = coreUtil.currentFrame.id; }
    if (coreUtil.currentFrame != null) { coreUtil.currentFrameUniqueID = coreUtil.getElementUniqueID(coreUtil.currentFrame); }

    //  \u83B7\u53D6\u5F53\u524D\u7126\u70B9\u5BF9\u8C61\uFF1B
    coreUtil.getActiveElement = function () { return $(document.activeElement); };

    //  \u83B7\u53D6\u6216\u8BBE\u7F6E\u5F53\u524D window \u7A97\u4F53\u7684\u5927\u5C0F\uFF1B
    coreUtil.windowSize = function () {
        var length = arguments.length, arg1, arg2, arg1Type, arg2Type,
            getSize = function () {
                var win = $(window);
                return { width: window.innerWidth ? window.innerWidth : win.width(), height: window.innerHeight ? window.innerHeight : win.height() };
            },
            size = getSize();
        if (length == 0) { return size; }
        arg1 = arguments[0];
        arg1Type = coreUtil.type(arg1);
        if (length == 1) {
            arg1 = arguments[0];
            if (arg1Type == "string") { return size[arg1]; }
            if (coreUtil.isPlainObject(arg1) || arg1Type == "function") { coreUtil.windowSize(arg1.width || size.width, arg1.height || size.height); }
        }
        if (length >= 2) {
            arg2 = arguments[1];
            arg2Type = coreUtil.type(arg2);
            if (arg1Type == "string" && arg2Type == "number") {
                var newSize = $.extend({}, size);
                newSize[arg1] = arg2;
                if (size.width != newSize.width || size.height != newSize.height) { window.resizeTo(newSize.width, newSize.height); }
            }
            if (arg1Type == "number" && arg2Type == "number") { window.resizeTo(arg1, arg2); }
        }
    };

    //  \u83B7\u53D6\u6216\u8BBE\u7F6E\u5F53\u524D window \u7A97\u4F53\u7684\u4F4D\u7F6E\uFF1B
    coreUtil.windowOffset = function () {
        var length = arguments.length, arg1, arg2, arg1Type, arg2Type,
            getOffset = function () { return { left: window.screenLeft || window.screenX, top: window.screenTop || window.screenY }; },
            offset = getOffset();
        if (length == 0) { return offset; }
        arg1 = arguments[0];
        arg1Type = coreUtil.type(arg1);
        if (length == 1) {
            arg1 = arguments[0];
            if (arg1Type == "string") { return offset[arg1]; }
            if (coreUtil.isPlainObject(arg1) || arg1Type == "function") { coreUtil.windowOffset(arg1.left || offset.left, arg1.top || offset.top); }
        }
        if (length >= 2) {
            arg2 = arguments[1];
            arg2Type = coreUtil.type(arg2);
            if (arg1Type == "string" && arg2Type == "number") {
                var newOffset = $.extend({}, offset);
                newOffset[arg1] = arg2;
                if (offset.left != newOffset.left || offset.top != newOffset.top) { window.moveTo(newSize.left, newSize.top); }
            }
            if (arg1Type == "number" && arg2Type == "number") { window.moveTo(arg1, arg2); }
        }
    };

    //  \u83B7\u53D6\u6216\u8BBE\u7F6E\u5F53\u524D window \u7A97\u4F53\u7684\u5927\u5C0F\u548C\u4F4D\u7F6E\uFF1B
    coreUtil.windowPosition = function () {
        var length = arguments.length, arg1, arg2, arg3, arg4, arg1Type, arg2Type,
            getPosition = function () { return $.extend(coreUtil.windowSize(), coreUtil.windowOffset()); },
            position = getPosition();
        if (length == 0) { return position; }
        arg1 = arguments[0];
        arg1Type = coreUtil.type(arg1);
        if (length == 1) {
            arg1 = arguments[0];
            if (arg1Type == "string") { return position[arg1]; }
            if (coreUtil.isPlainObject(arg1) || arg1Type == "function") { coreUtil.position(arg1.width || position.width, arg1.height || position.height, arg1.left || position.left, arg1.top || position.top); }
        }
        if (length == 2) {
            arg2 = arguments[1];
            arg2Type = coreUtil.type(arg2);
            if (arg1Type == "string" && arg2Type == "number") {
                var newPosition = $.extend({}, position);
                newPosition[arg1] = arg2;
                if (position.width != newPosition.width || position.height != newPosition.height || position.left != newPosition.left || position.top != newPosition.top) {
                    window.moveTo(newSize.left, newSize.top);
                    coreUtil.windowPosition(newPosition.width, newPosition.height, newPosition.left, newPosition.top);
                }
            }
            if (arg1Type == "number" && arg2Type == "number") { coreUtil.windowSize(arg1, arg2); }
        }
        if (length >= 3) {
            arg2 = arguments[1];
            arg3 = arguments[2];
            arg4 = arguments.length > 3 ? arguments[3] : null;
            coreUtil.windowSize(arg1, arg2);
            coreUtil.windowOffset(arg3, arg4);
        }
    };

    //  \u89E3\u6790\u51FD\u6570\u7684\u8FD0\u884C\u503C\u5E76\u8FD4\u56DE\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      callback:   \u9700\u8981\u89E3\u6790\u7684\u51FD\u6570\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u503C\uFF0C\u4E5F\u53EF\u4EE5\u662F\u51FD\u6570\uFF1B\u5982\u679C\u662F\u51FD\u6570\uFF0C\u5219\u8BE5\u65B9\u6CD5\u8FD4\u56DE\u8BE5\u51FD\u6570\u7684\u8FD0\u884C\u503C\uFF1B
    //      args:       \u8868\u793A\u9700\u8981\u4F20\u5165\u51FD\u6570 callback \u7684\u53C2\u6570\uFF0C\u662F\u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\uFF0C\u8BE5\u53C2\u6570\u53EF\u9009\uFF1B
    //      thisArg:    \u8868\u793A\u4F20\u5165\u51FD\u6570 callback \u5305\u5185\u7684 this \u5F15\u7528\u5BF9\u8C61\uFF0C\u8BE5\u53C2\u6570\u53EF\u9009\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u53C2\u6570 callback \u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u5219\u8FDB\u884C callback.apply(thisArg, args) \u8FD0\u7B97\u540E\u5E76\u5C06\u5176\u8FD4\u56DE\uFF1B\u5426\u5219\u76F4\u63A5\u5C06\u5176\u8FD4\u56DE\u3002
    coreUtil.parseFunction = function (callback, args, thisArg) {
        var val = callback, obj = { length: 0 };
        if (coreUtil.isFunction(callback)) {
            if (coreUtil.likeArray(args) && thisArg) {
                coreArray.copy(args, obj);
                obj.callee = callback;
                val = callback.apply(thisArg, obj);
            } else {
                val = callback();
            }
        }
        return val;
    };

    //  \u89E3\u6790\u952E\u503C\u5BF9\u683C\u5F0F\u5BF9\u8C61\u4E2D\u952E\u503C\u683C\u5F0F\u4E3A key: function \u7684 JSON \u683C\u5F0F\u5BF9\u8C61\u7684\u51FD\u6570\u8FD0\u7B97\u503C\u5E76\u8FD4\u56DE\u89E3\u6790\u540E\u7684\u6570\u636E\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5BF9\u8C61\u4E2D\u6240\u6709\u7684 key: function \u4E2D\u7684 function \u8FD0\u7B97\u540E\u7684\u7ED3\u679C\u4E0E key \u5E8F\u5217\u7EC4\u5408\u6210\u7684\u65B0\u7684\u5BF9\u8C61\u526F\u672C\uFF1B
    //  \u793A\u4F8B\uFF1A var obj = { arg: 20, sex: function () { return "\u7537"; } };
    //         coreUtil.parseMapFunction(obj); 
    //      \u6B64\u65F6\uFF0Cobj \u7684\u503C\u4E3A\uFF1A{ arg: 20, sex: "\u7537" }\u3002
    coreUtil.parseMapFunction = function (obj) {
        var val = {};
        var type = coreUtil.type(obj);
        if (type == "object" || type == "function") {
            for (var key in obj) { val[key] = coreUtil.parseFunction(obj[key]); }
        }
        return val;
    };

    //  \u5C06\u901A\u8FC7 SOA(\u4F8B\u5982 ASP.NET \u4E00\u822C\u5904\u7406\u7A0B\u5E8F \u6216\u8005 WebService) \u65B9\u5F0F\u8FD4\u56DE\u7684\u6570\u636E\u8F6C\u6362\u6210 JSON \u683C\u5F0F\u6570\u636E\u3002
    coreUtil.parseJSON = function (data) {
        var val = null;
        var isString = coreUtil.isString(data);
        if (coreUtil.isPlainObject(data) || (coreUtil.likeArray(data) && !isString)) {
            val = coreUtil.isPlainObject(data.d) ? coreUtil.parseJSON(data.d) : data;
        } else {
            val = $.parseJSON(isString ? coreString.toJSONString(data) : $(data).text());
        }
        return val;
    };

    //  \u91C7\u7528\u540C\u6B65\u53D1\u9001 ajax \u8BF7\u6C42\u7684\u65B9\u5F0F\uFF0C\u4EE5\u6307\u5B9A\u7684\u53C2\u6570\u8BF7\u6C42\u8FDC\u7A0B\u6570\u636E\u5E76\u8FD4\u56DE\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      url:    \u8BF7\u6C42\u7684\u8FDC\u7A0B\u670D\u52A1\u5730\u5740\uFF1B
    //      args:   \u53D1\u9001\u81F3\u8FDC\u7A0B\u670D\u52A1\u7684\u6570\u636E\uFF0C\u5728\u53D1\u9001\u6570\u636E\u4E4B\u524D\u8BE5\u53C2\u6570\u5C06\u4F1A\u88AB\u5E8F\u5217\u5316\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8FDC\u7A0B\u8BF7\u6C42\u7684\u6570\u636E\uFF1B
    //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u4E3A $.ajax \u65B9\u6CD5\u7684\u5FEB\u6377\u8C03\u7528\uFF0C\u91C7\u7528 post \u65B9\u5F0F\u63D0\u4EA4\uFF0C\u5E76\u4E14 async \u5C5E\u6027\u8BBE\u7F6E\u4E3A false\uFF1B
    //      \u5982\u679C\u9700\u8981\u66F4\u52A0\u4E30\u5BCC\u7684 ajax \u8C03\u7528\uFF0C\u8BF7\u4F7F\u7528 $.ajax \u65B9\u6CD5\u3002
    coreUtil.requestAjaxData = function (url, args) {
        var val = null;
        args = coreUtil.parseMapFunction(args);
        $.ajax({
            url: url, type: "POST", data: args, async: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                throw XMLHttpRequest.responseText;
            }, success: function (data, textStatus, jqXHR) { val = data; }
        });
        return val;
    };

    //  \u91C7\u7528\u540C\u6B65\u53D1\u9001 ajax \u8BF7\u6C42\u7684\u65B9\u5F0F\uFF0C\u4EE5\u6307\u5B9A\u7684\u53C2\u6570\u8BF7\u6C42\u8FDC\u7A0B\u5E03\u5C14\u7C7B\u578B\u6570\u636E\u5E76\u8FD4\u56DE\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      url:    \u8BF7\u6C42\u7684\u8FDC\u7A0B\u670D\u52A1\u5730\u5740\uFF1B
    //      args:   \u53D1\u9001\u81F3\u8FDC\u7A0B\u670D\u52A1\u7684\u6570\u636E\uFF0C\u5728\u53D1\u9001\u6570\u636E\u4E4B\u524D\u8BE5\u53C2\u6570\u5C06\u4F1A\u88AB\u5E8F\u5217\u5316\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8FDC\u7A0B\u8BF7\u6C42\u7684\u5E03\u5C14\u6570\u636E\uFF1B
    //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u4E3A $.ajax \u65B9\u6CD5\u7684\u5FEB\u6377\u8C03\u7528\uFF0C\u91C7\u7528 post \u65B9\u5F0F\u63D0\u4EA4\uFF0C\u5E76\u4E14 async \u5C5E\u6027\u8BBE\u7F6E\u4E3A false\uFF1B
    //      \u5982\u679C\u9700\u8981\u66F4\u52A0\u4E30\u5BCC\u7684 ajax \u8C03\u7528\uFF0C\u8BF7\u4F7F\u7528 $.ajax \u65B9\u6CD5\u3002
    coreUtil.requestAjaxBoolean = function (url, args) {
        var data = coreUtil.requestAjaxData(url, args), type = typeof data;
        if (type == "object" || (type == "string" && data.charAt(0) === "<" && data.charAt(data.length - 1) === ">" && data.length >= 3)) { data = $(data).text(); }
        return coreString.toBoolean(data);
    };

    //  \u91C7\u7528\u540C\u6B65\u53D1\u9001 ajax \u8BF7\u6C42\u7684\u65B9\u5F0F\uFF0C\u4EE5\u6307\u5B9A\u7684\u53C2\u6570\u8BF7\u6C42\u8FDC\u7A0B\u6570\u636E\u5E76\u5C06\u5176\u8F6C\u6362\u6210 JSON \u683C\u5F0F\u540E\u8FD4\u56DE\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      url:    \u8BF7\u6C42\u7684\u8FDC\u7A0B\u670D\u52A1\u5730\u5740\uFF1B
    //      args:   \u53D1\u9001\u81F3\u8FDC\u7A0B\u670D\u52A1\u7684\u6570\u636E\uFF0C\u5728\u53D1\u9001\u6570\u636E\u4E4B\u524D\u8BE5\u53C2\u6570\u5C06\u4F1A\u88AB\u5E8F\u5217\u5316\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8F6C\u6362\u6210 JSON \u683C\u5F0F\u540E\u7684\u8FDC\u7A0B\u8BF7\u6C42\u7684\u6570\u636E\uFF1B
    //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u4E3A $.ajax \u65B9\u6CD5\u7684\u5FEB\u6377\u8C03\u7528\uFF0C\u91C7\u7528 post \u65B9\u5F0F\u63D0\u4EA4\uFF0C\u5E76\u4E14 async \u5C5E\u6027\u8BBE\u7F6E\u4E3A false\uFF1B
    //      \u5982\u679C\u9700\u8981\u66F4\u52A0\u4E30\u5BCC\u7684 ajax \u8C03\u7528\uFF0C\u8BF7\u4F7F\u7528 $.ajax \u65B9\u6CD5\u3002
    coreUtil.requestAjaxJson = function (url, args) {
        var data = coreUtil.requestAjaxData(url, args);
        return coreUtil.parseJSON(data);
    };

    //  \u4EE5\u6307\u5B9A\u7684 CSS \u5185\u5BB9\u521B\u5EFA\u4E00\u4E2A CSS \u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      context: \u8868\u793A css \u5185\u5BB9\uFF1B
    //      target:  \u8BE5\u53C2\u6570\u53EF\u9009\uFF1B\u8868\u793A\u5305\u542B\u8BE5 css \u7684 style \u6807\u7B7E\u88AB\u6DFB\u52A0\u5230\u7684\u76EE\u6807\u4F4D\u7F6E\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A DOM \u5BF9\u8C61\u6216\u8005 jQuery \u5BF9\u8C61\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u521B\u5EFA\u7684 CSS \u6807\u7B7E\u7684 jQuery DOM \u5BF9\u8C61\uFF1B
    //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u5728 target \u8868\u793A\u7684 DOM \u5BF9\u8C61\u6216\u5F53\u524D\u9875\u9762\u7684 head \u4E2D\u6DFB\u52A0\u4E00\u4E2A <style type="text/css"></style> \u6807\u7B7E\uFF0C\u6807\u7B7E\u4E2D\u7684\u5185\u5BB9\u5373\u4E3A\u4F20\u5165\u7684 context \u503C\u3002
    coreUtil.addCss = function (context, target) {
        return $("<style>" + context + "</style>").attr("type", "text/css").appendTo(target ? target : "head");
    };

    //  \u901A\u8FC7 javascript \u524D\u7AEF\u672C\u5730\u65B9\u5F0F\u5BFC\u51FA Excel \u6570\u636E\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      options: JSON Object \u7C7B\u578B\uFF1B\u5B9A\u4E49\u5BFC\u51FA\u6570\u636E\u7684\u53C2\u6570\u4FE1\u606F\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
    //          file:   String \u7C7B\u578B\uFF0C\u8868\u793A\u8981\u5BFC\u51FA\u7684\u6587\u4EF6\u540D\uFF1B
    //          columns: Array \u7C7B\u578B\uFF0C\u8868\u793A\u8981\u5BFC\u51FA\u7684 Excel \u6570\u636E\u7684\u5217\u4FE1\u606F\uFF0C\u8BE5\u6570\u7EC4\u4E2D\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u662F\u4E00\u4E2A JSON Object\uFF0C\u8BE5 Object \u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
    //              field:  \u8868\u793A\u6570\u636E\u53C2\u6570 rows \u4E2D\u5BF9\u5E94\u7684\u5217\u5B57\u6BB5\u540D\uFF1B
    //              title:  \u8868\u793A field \u5BF9\u5E94\u7684\u5217\u7684\u6807\u9898(\u5BFC\u51FA\u540E\u663E\u793A\u7684\u540D\u79F0)\uFF0C\u9ED8\u8BA4\u4E3A field \u7684\u503C\uFF1B
    //              width:  \u8868\u793A field \u5BF9\u5E94\u7684\u5217\u7684\u5217\u5BBD(\u5355\u4F4D\uFF1A\u50CF\u7D20)\uFF0C\u9ED8\u8BA4\u4E3A 140\uFF1B
    //              type:   \u8868\u793A field \u5BF9\u5E94\u7684\u5217\u7684\u6570\u636E\u7C7B\u578B\uFF0C\u53EF\u9009\u7684\u503C\u6709 "boolean", "number", "string", "date"\uFF0C\u9ED8\u8BA4\u4E3A "string"\u3002
    //              formatter:  \u8868\u793A field \u5BF9\u5E94\u7684\u5217\u6570\u636E\u5BFC\u51FA\u65F6\u7684\u683C\u5F0F\u5316\u51FD\u6570\uFF1B\u5BFC\u51FA\u7684\u7ED3\u679C\u663E\u793A\u5185\u5BB9\u4E3A\u8BE5\u51FD\u6570\u8FD0\u7B97\u540E\u8FD4\u56DE\u7684\u7ED3\u679C\uFF0CFunction \u7C7B\u578B\uFF0C\u5B9A\u4E49\u53C2\u6570\u5217\u8868\u5982\u4E0B\uFF1A
    //                  field:
    //                  rowIndex:
    //                  rowData:
    //                  array:
    //                  \u9ED8\u8BA4\u503C\u4E3A function (field, rowIndex, rowData, array) { return rowData[field]; }
    //          data: \u5B9E\u9645\u8981\u5BFC\u51FA\u7684\u6570\u636E\uFF1B\u662F\u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u662F\u4E00\u4E2A JSON Object \u5BF9\u8C61\uFF0C\u8868\u793A\u4E00\u884C\u6570\u636E\uFF1B\u8BE5 JSON Object \u4E2D\u7684\u6BCF\u4E00\u4E2A\u5C5E\u6027\u90FD\u8868\u793A\u4E00\u4E2A\u5217\u5B57\u6BB5\u503C\uFF1B
    //              \u5173\u4E8E\u6570\u636E\u7684\u5217\u5B57\u6BB5\u5C5E\u6027\u4FE1\u606F\u7531 columns \u53C2\u6570\u5B9A\u4E49\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A
    //  \u6CE8\u610F\uFF1A\u8BE5\u51FD\u6570\u4E0D\u652F\u6301 ie6\u3002
    coreUtil.exportExcel = function (options) { $.error("\u672A\u5B9E\u73B0"); };






    //  \u83B7\u53D6\u5F53\u524D\u8868\u8FBE\u5F0F\u5339\u914D\u5230\u7684\u6240\u6709\u5143\u7D20\u4E2D\u7684\u7B2C\u4E00\u4E2A\u5143\u7D20\u662F\u5426\u5177\u6709 uniqueID \u5C5E\u6027\u503C\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u5F53\u524D\u8868\u8FBE\u5F0F\u5339\u914D\u5230\u7684\u6240\u6709\u5143\u7D20\u4E2D\u7684\u7B2C\u4E00\u4E2A\u5143\u7D20\u5177\u6709 uniqueID \u5C5E\u6027\u503C\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
    coreJquery.prototype.hasUniqueID = function () { return this.length ? coreUtil.hasUniqueID(this[0]) : false; };

    //  \u83B7\u53D6\u5F53\u524D\u8868\u8FBE\u5F0F\u5339\u914D\u5230\u7684\u6240\u6709\u5143\u7D20\u4E2D\u7684\u7B2C\u4E00\u4E2A\u5143\u7D20\u7684 uniqueID \u5C5E\u6027\u503C\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D\u8868\u8FBE\u5F0F\u6CA1\u6709\u5339\u914D\u7684\u5143\u7D20\uFF0C\u5219\u8FD4\u56DE null\uFF1B\u5426\u5219\u8FD4\u56DE \u6240\u6709\u5143\u7D20\u4E2D\u7684\u7B2C\u4E00\u4E2A\u5143\u7D20\u7684 uniqueID \u5C5E\u6027\u503C\uFF1B
    coreJquery.prototype.getUniqueID = function () { return this.length ? coreUtil.getElementUniqueID(this[0]) : null; };

    //  \u8BBE\u7F6E\u5F53\u524D\u8868\u8FBE\u5F0F\u5339\u914D\u5230\u7684\u6240\u6709\u5143\u7D20\u7684 uniqueID \u5C5E\u6027\u503C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      uniqueID: \u53EF\u9009\uFF0C\u8868\u793A\u8981\u8BBE\u7F6E\u4E3A\u7684 uniqueID \u5C5E\u6027\u503C\uFF1B\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u503C\uFF0C\u5219\u9ED8\u8BA4\u7528 coreUtil.guid() \u4E3A\u5176\u521B\u5EFA\u4E00\u4E2A\u968F\u673A\u503C\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D jquery \u5BF9\u8C61\u7684\u5F15\u7528\u3002
    coreJquery.prototype.setUniqueID = function (uniqueID) { return this.each(function () { coreUtil.setElementUniqueID(this, uniqueID); }); };

    //  \u521D\u59CB\u5316\u5F53\u524D\u8868\u8FBE\u5F0F\u5339\u914D\u5230\u7684\u6240\u6709\u5143\u7D20\u7684 uniqueID \u5C5E\u6027\u503C\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5F53\u524D jquery \u5BF9\u8C61\u7684\u5F15\u7528\u3002
    //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u5FAA\u73AF\u5224\u65AD\u6BCF\u4E00\u4E2A\u5143\u7D20\u662F\u5426\u5177\u6709 uniqueID \u5C5E\u6027\u503C\uFF0C\u5982\u679C\u6709\u5219\u4E0D\u8FDB\u884C\u4EFB\u4F55\u66F4\u6539\uFF1B\u5982\u679C\u6CA1\u6709\u5219\u5176\u671F\u8BBE\u7F6E\u4E00\u4E2A\u65B0\u7684 uniqueID \u503C\u3002
    coreJquery.prototype.initUniqueID = function () { return this.each(function () { coreUtil.initElementUniqueID(this); }); };

    //  \u83B7\u53D6\u6216\u8BBE\u7F6E\u5F53\u524D\u8868\u8FBE\u5F0F\u5143\u7D20\u7684 uniqueID \u5C5E\u6027\u503C\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u91CD\u8F7D\uFF1A
    //      1、function()\uFF1B\u8BE5\u91CD\u8F7D\u8868\u793A\uFF1A\u83B7\u53D6\u5F53\u524D\u8868\u8FBE\u5F0F\u5339\u914D\u5230\u7684\u6240\u6709\u5143\u7D20\u4E2D\u7B2C\u4E00\u4E2A\u5143\u7D20\u7684 uniqueID \u5C5E\u6027\u503C\uFF1B\u7B49\u6548\u4E8E coreJquery.prototype.getUniqueID \u51FD\u6570\uFF1B
    //      2、function(uniqueID)\uFF1B\u8BE5\u91CD\u8F7D\u8868\u793A\uFF1A\u8BBE\u7F6E\u5F53\u524D\u8868\u8FBE\u5F0F\u5339\u914D\u5230\u7684\u6240\u6709\u5143\u7D20\u7684 uniqueID \u5C5E\u6027\u503C\uFF1B\u7B49\u6548\u4E8E coreJquery.prototype.setUniqueID \u51FD\u6570\uFF1B
    coreJquery.prototype.uniqueID = function (uniqueID) {
        return arguments.length == 0 ? this.getUniqueID() : this.setUniqueID(uniqueID);
    };

    //  \u5224\u65AD\u5F53\u524D\u5339\u914D\u5230\u7684\u5143\u7D20\u662F\u5426\u5177\u6709\u7126\u70B9\uFF1B
    coreJquery.prototype.isFocus = function () {
        var elements = $("*", this).add(this);
        for (var i = 0; i < elements.length; i++) { if (document.activeElement == elements[i]) { return true; } }
        return false;
    };

    //  \u6D4B\u8BD5\u5F53\u524D jQuery \u5BF9\u8C61\u662F\u5426\u5305\u542B\u53E6\u4E00\u4E2A DOM \u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      this: \u65B9\u6CD5\u4F53\u5185\u7684 this \u5BF9\u8C61\u5F15\u7528\uFF0C\u8868\u793A\u5F53\u524D jQuery \u5BF9\u8C61\uFF1B
    //      item: DOM\u8282\u70B9\uFF0C\u53EF\u80FD\u88AB\u5176\u4ED6\u5143\u7D20\u6240\u5305\u542B
    //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C item DOM\u8282\u70B9\u5305\u542B\u5728 this \u6307\u5411\u7684\u5F53\u524D jQuery \u5BF9\u8C61\u4E2D\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
    coreJquery.prototype.contains = function (item) {
        var b = false;
        this.each(function () { if ($.contains(this, item)) { b = true; return false; } });
        return b;
    };

    //  \u5982\u679C\u5F53\u524D jQuery \u5BF9\u8C61\u4E0D\u5305\u542B\u6307\u5B9A\u8868\u8FBE\u5F0F\u5339\u914D\u7684\u5143\u7D20\uFF0C\u5219\u628A\u4E0E\u8868\u8FBE\u5F0F\u5339\u914D\u7684\u5143\u7D20\u6DFB\u52A0\u5230jQuery\u5BF9\u8C61\u4E2D\u3002\u8FD9\u4E2A\u51FD\u6570\u53EF\u4EE5\u7528\u4E8E\u8FDE\u63A5\u5206\u522B\u4E0E\u4E24\u4E2A\u8868\u8FBE\u5F0F\u5339\u914D\u7684\u5143\u7D20\u7ED3\u679C\u96C6\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      this: \u65B9\u6CD5\u4F53\u5185\u7684 this \u5BF9\u8C61\u5F15\u7528\uFF0C\u8868\u793A\u5F53\u524D jQuery \u5BF9\u8C61\uFF1B
    //      \u5176\u4ED6\u53C2\u6570\u540C jQuery \u7684\u5B98\u65B9 API \u65B9\u6CD5 jQuery.fn.add \u76F8\u540C\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u5904\u7406\u540E\u7684 this \u7684\u5F15\u7528\u3002
    coreJquery.prototype.attach = function () {
        var t = this;
        $.apply(this, arguments).each(function () {
            if (!t.contains(this)) { core_push.call(t, this); }
        });
        return t;
    };

    //  \u83B7\u53D6\u5339\u914D\u5143\u7D20\u76F8\u5BF9\u6EDA\u52A8\u6761\u9876\u90E8\u7684\u504F\u79FB\u767E\u5206\u6BD4
    coreJquery.prototype.scrollTopP = function () {
        var height = this.height();
        height = height <= 0 ? parseFloat(height) : parseFloat(1);
        return this.scrollTop() / height;
    };

    //  \u83B7\u53D6\u5339\u914D\u5143\u7D20\u76F8\u5BF9\u6EDA\u52A8\u6761\u5DE6\u4FA7\u7684\u504F\u79FB\u767E\u5206\u6BD4
    coreJquery.prototype.scrollLeftP = function () {
        var width = this.width();
        width = width <= 0 ? parseFloat(width) : parseFloat(1);
        return this.scrollLeft() / width;
    };

    //  \u5C06\u5F53\u524D\u8868\u8FBE\u5F0F\u5339\u914D\u5230\u7684\u6240\u6709\u5143\u7D20\u53CA\u5176\u5B50\u5143\u7D20\u5E8F\u5217\u5316\u6210 JSON \u5BF9\u8C61\u5E76\u8FD4\u56DE\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u7C7B\u578B\u7684\u91CD\u8F7D\u65B9\u5F0F\uFF1A
    //      1、Function(Object)\uFF1A\u5176\u4E2D\u53C2\u6570 Object \u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
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
    //      2、Function(String)\uFF1A\u5176\u4E2D\u53C2\u6570 String \u8868\u793A\u5F53\u8303\u56F4\u5185\u5B58\u5728\u91CD\u540D(name \u76F8\u540C\u65F6)\u7684 DOM \u5143\u7D20\u65F6\uFF0C\u5BF9\u91CD\u590D\u5143\u7D20\u7684\u53D6\u503C\u89C4\u5219\uFF1B
    //          \u5176\u53D6\u503C\u8303\u56F4\u548C\u5F53\u53C2\u6570\u683C\u5F0F\u4E3A JSON-Object \u65F6\u7684\u5C5E\u6027 transcript \u4E00\u6837\u3002
    //  \u8FD4\u56DE\u503C\uFF1A\u8BE5\u65B9\u6CD5\u8FD4\u56DE\u4E00\u4E2A JSON Object\uFF0C\u8FD4\u56DE\u5BF9\u8C61\u4E2D\u7684\u6BCF\u4E2A\u6570\u636E\u90FD\u8868\u793A\u4E00\u4E2A\u8868\u5355\u63A7\u4EF6\u503C\u3002
    coreJquery.prototype.serializeObject = function (options) {
        var rCRLF = /\r?\n/g,
	        rsubmitterTypes = /^(?:submit|button|image|reset)$/i,
	        rsubmittable = /^(?:input|select|textarea|keygen)/i,
            rsubmittable_radio = /^(?:radio)$/i,
            rsubmittable_checkbox = /^(?:checkbox)$/i,
            rsubmittable_radiocheckbox = /^(?:checkbox|radio)$/i,
            list, names, ret = {};
        options = options || {};
        var defaults = { onlyEnabled: false, transcript: "cover", overtype: "append", separator: "," },
            opts = $.extend({}, defaults, (typeof options == "string") ? { transcript: options} : options);
        if (!coreArray.contains(["cover", "discard", "overlay"], opts.transcript)) { opts.transcript = defaults.transcript; }
        if (!coreArray.contains(["array", "append"], opts.overtype)) { opts.overtype = defaults.overtype; }

        list = this.map(function () {
            var elements = jQuery.prop(this, "elements"), ret = [];
            $.merge(ret, elements ? $.makeArray(elements) : $(this).find("*"));
            return ret;
        }).filter(function () {
            var type = this.type;
            return this.name && (!opts.onlyEnabled || !$(this).is(":disabled")) &&
				rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type);
        }).map(function (i, elem) {
            var name = elem.name, type = this.type, val = $(this).val(),
                checked = this.checked == undefined || this.checked == null ? null : this.checked;
            return {
                name: name, type: type, checked: checked,
                val: $.isArray(val) ? $.map(val, function (val) { return val ? val.replace(rCRLF, "\r\n") : val; })
                    : (val ? val.replace(rCRLF, "\r\n") : val)
            };
        });
        names = coreArray.distinct(list.map(function (i, elem) { return elem.name; }));
        $.each(names, function (i, name) {
            var elems = list.filter(function (i, elem) { return elem.name == name; }),
                val = elems.length == 1 ? getElemVal(elems[0]) : getElemsVal(elems);
            ret[name] = (val == undefined || val == null) ? null : val;
        });
        function getElemVal(elem) {
            return rsubmittable_radiocheckbox.test(elem.type) ? elem.checked : elem.val;
        };
        function getElemsVal(elems) {
            var items = coreArray.filter(elems, function (elem) {
                return (rsubmittable_radiocheckbox.test(elem.type) && elem.checked == true) || !rsubmittable_radiocheckbox.test(elem.type);
            });
            var values = coreArray.map(items, function (val) { return val.val; });
            switch (opts.transcript) {
                case "cover": return values[values.length - 1];
                case "discard": return values[0];
                case "overlay":
                    return opts.overtype == "array"
                        ? (values.length > 1 ? values : values[0])
                        : values.join(opts.separator);
                default: return values[0];
            }
        };
        return ret;
    };


    //  \u521B\u5EFA\u6216\u5B9A\u4E49\u547D\u540D\u7A7A\u95F4\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      namespace:  \u8981\u521B\u5EFA\u7684\u547D\u540D\u7A7A\u95F4\uFF0C\u4E0D\u540C\u7EA7\u522B\u7684\u547D\u540D\u8BF7\u7528\u7B26\u53F7 "." \u9694\u5F00\uFF0C\u8BF7\u4E0D\u8981\u5305\u542B\u4EFB\u4F55\u7A7A\u683C\uFF1B
    //      callback:   \u53EF\u9009\uFF0C\u521B\u5EFA\u5B8C\u547D\u540D\u7A7A\u95F4\u540E\u6267\u884C\u7684\u56DE\u8C03\u51FD\u6570\uFF1B
    //      thisArg:    \u53EF\u9009\uFF0C\u540C\u53C2\u6570 callback \u4E00\u8D77\u5B9A\u4E49\uFF1B\u8868\u793A callback \u56DE\u8C03\u51FD\u6570\u6267\u884C\u4E2D\u7684 this \u5BF9\u8C61
    coreUtil.namespace = function (namespace, callback, thisArg) {
        var ret = window;
        if (!namespace) { return ret; }
        var names = String(namespace).split(".");
        for (var i = 0; i < names.length; i++) {
            names[i] = coreString.trim(names[i]);
            if (!names[i]) { coreArray.remove(names, names[i--]); }
        }
        $.each(names, function (i, name) {
            ret = (ret[name] == null || ret[name] == undefined) ? (ret[name] = {}) : ret[name];
        });
        if (coreUtil.isFunction(callback)) { callback.call(thisArg); }
        return ret;
    };

    //  \u83B7\u53D6\u6307\u5B9A\u5168\u540D\u79F0\u7684 JavaScript \u7C7B\u578B\u51FD\u6570\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      className   : \u8981\u83B7\u53D6\u7684\u7C7B\u7684\u7C7B\u540D\u79F0\uFF0C\u5BF9\u5E94\u547D\u540D\u7A7A\u95F4\u9650\u5B9A\u540D\u7528\u7B26\u53F7 "." \u9694\u5F00\uFF0C\u8BF7\u4E0D\u8981\u5305\u542B\u4EFB\u4F55\u7A7A\u683C\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A
    //      \u5982\u679C className \u6307\u5B9A\u7684\u7C7B\u578B\u51FD\u6570\u5B58\u5728\uFF0C\u5219\u8FD4\u56DE\u8BE5\u7C7B\u578B\u51FD\u6570\u5BF9\u8C61\uFF1B
    //      \u5982\u679C className \u6307\u5B9A\u7684\u7C7B\u578B\u51FD\u6570\u4E0D\u5B58\u5728\uFF0CclassName \u503C\u4E3A\u7A7A\u5B57\u7B26\u4E32\u6216\u8005 null/undefined\uFF0C\u5426\u5219\u8FD4\u56DE null\u3002
    coreUtil.getDefined = function (className) {
        if (!className) { return null; }
        var names = String(className).split("."), ret = window;
        for (var i = 0; i < names.length; i++) {
            names[i] = coreString.trim(names[i]);
            if (!names[i]) { coreArray.remove(names, names[i--]); }
        }
        $.each(names, function (i, name) {
            ret = (ret == null || ret == undefined || ret[name] == null || ret[name] == undefined) ? null : ret[name];
        });
        return ret;
    };

    //  \u521B\u5EFA\u6216\u5B9A\u4E49\u4E00\u4E2A JavaScript \u7C7B\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      className   : \u8981\u521B\u5EFA\u7684\u7C7B\u7684\u7C7B\u540D\uFF0C\u5BF9\u5E94\u547D\u540D\u7A7A\u95F4\u9650\u5B9A\u540D\u7528\u7B26\u53F7 "." \u9694\u5F00\uFF0C\u8BF7\u4E0D\u8981\u5305\u542B\u4EFB\u4F55\u7A7A\u683C\uFF1B
    //      data        : \u53EF\u9009\uFF1B\u88AB\u521B\u5EFA\u7684\u7C7B\u578B\u9ED8\u8BA4\u5B9A\u4E49\u7684\u6210\u5458\u5C5E\u6027\u6216\u65B9\u6CD5(\u5373 prototype)\uFF1B
    //      createFn    : \u53EF\u9009\uFF1B\u88AB\u521B\u5EFA\u7684\u7C7B\u578B\u7684\u9ED8\u8BA4\u6784\u9020\u51FD\u6570\uFF1B
    //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u88AB\u521B\u5EFA\u7684\u7C7B\u578B\u7684 Function \u5BF9\u8C61\uFF1B
    //  \u6CE8\u610F\uFF1A
    //      \u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 className \u7684\u503C\u4E3A null\uFF0C\u5219\u521B\u5EFA\u7684\u8FD9\u4E2A JavaScript \u7C7B\u4E3A\u533F\u540D\u7C7B\uFF1B
    //      \u5982\u679C\u6307\u5B9A\u6B64\u5B9A\u4E49\u51FD\u6570\u65F6\uFF0CclassName \u6240\u6307\u5B9A\u7684\u5BF9\u8C61\u5DF2\u7ECF\u5B58\u5728\uFF0C\u5219\u8BE5\u5BF9\u8C61\u5C06\u4F1A\u88AB\u8986\u76D6\uFF1B
    //      \u53EF\u4EE5\u7528 coreUtil.getDefined(className) \u6765\u5224\u65AD className \u6240\u6307\u5B9A\u7684\u5BF9\u8C61\u662F\u5426\u5DF2\u7ECF\u5B58\u5728\uFF1B
    coreUtil.define = function (className, data, createFn) {
        if (coreUtil.isFunction(data)) { createFn = data; }
        var p, name, constructor, func;
        if (className) {
            var names = String(className).split(".");
            for (var i = 0; i < names.length; i++) {
                names[i] = coreString.trim(names[i]);
                if (!names[i]) { coreArray.remove(names, names[i--]); }
            }
            if (names[0] != "window") { names.splice(0, 0, "window"); }
            if (names.length > 1) {
                p = coreUtil.namespace(names.slice(0, names.length - 1).join("."));
                name = names[names.length - 1];
            }
        }
        createFn = coreUtil.isFunction(createFn) ? createFn : function () { };
        constructor = function (options) { return createFn.call(this, options); };
        func = function (options) { return new constructor(options); };
        func.defaults = func.fn = func.prototype = constructor.defaults = constructor.fn = constructor.prototype;
        $.extend(func, { extend: $.extend, union: coreJquery.union, init: constructor, inst: createFn });
        $.extend(func.defaults, data, { extend: $.extend, union: coreJquery.union });
        if (p && name) {
            var old = p[name];
            p[name] = func;
            if (old) { coreJquery.union(func, old); }
        }
        return func;
    };

    //  \u4EE5\u6307\u5B9A\u7684\u53C2\u6570\u521B\u5EFA\u4E00\u4E2A\u6307\u5B9A\u7C7B\u578B\u7684\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      className   : \u5FC5\u987B\uFF0CString \u7C7B\u578B\u503C\uFF0C\u6307\u5B9A\u7684\u7C7B\u578B\u51FD\u6570\u540D\u79F0\uFF1B
    //      options     : \u53EF\u9009\uFF0CJSON-Object \u7C7B\u578B\u503C\uFF1B\u6784\u9020 className \u7C7B\u578B\u5BF9\u8C61\u6240\u7528\u7684\u53C2\u6570\uFF0C\u9ED8\u8BA4\u4E3A null\uFF1B
    //      thisArgs    : \u53EF\u9009\uFF0C\u4EFB\u610F\u7C7B\u578B\u503C\uFF1B\u8868\u793A\u6307\u5B9A className \u7C7B\u578B\u51FD\u6570\u65F6\u6307\u5B9A\u51FD\u6570\u5185\u90E8\u7684 this \u5BF9\u8C61\u5F15\u7528\u3002
    //  \u8FD4\u56DE\u503C\uFF1A
    //      \u5982\u679C className \u6307\u5B9A\u7684\u7C7B\u578B\u51FD\u6570\u5B58\u5728\uFF0C\u5219\u8FD4\u56DE\u8BE5\u51FD\u6570\u901A\u8FC7 options \u53C2\u6570\u548C thisArgs \u53C2\u6570\u6240\u6784\u9020\u7684\u5BF9\u8C61\uFF1B
    //      \u5982\u679C className \u6307\u5B9A\u7684\u7C7B\u578B\u51FD\u6570\u4E0D\u5B58\u5728\uFF0C\u5219\u8FD4\u56DE null\u3002
    coreUtil.createDefinedObject = function (className, options) {
        var type = coreUtil.getDefined(className);
        return coreUtil.isFunction(type) ? type(options) : null;
    };



    //  \u4E0B\u6BB5\u4EE3\u7801\u63D0\u4F9B javascript \u63A7\u5236\u6D4F\u89C8\u5668 \u8FDB\u5165/\u9000\u51FA \u5168\u5C4F\u6A21\u5F0F\u7684 API\u3002
    var fullScreen = {
        supports: false, eventName: "", prefix: "", prefixes: "webkit moz o ms khtml".split(" "),
        isFullScreen: function () { }, requestFullScreen: function () { }, cancelFullScreen: function () { }
    };
    if (typeof document.cancelFullScreen != "undefined") {
        fullScreen.supports = true;
    } else {
        for (var i = 0; i < fullScreen.prefixes.length; i++) {
            fullScreen.prefix = fullScreen.prefixes[i];
            if (typeof document[fullScreen.prefix + "CancelFullScreen"] != "undefined") {
                fullScreen.supports = true;
                break;
            }
        }
    }
    if (fullScreen.supports) {
        fullScreen.eventName = fullScreen.prefix + "fullscreenchange";
        fullScreen.isFullScreen = function () {
            switch (this.prefix) {
                case "": return document.fullScreen;
                case "webkit": return document.webkitIsFullScreen;
                default: return document[this.prefix + "FullScreen"];
            }
        };
        fullScreen.requestFullScreen = function (elem) {
            return (this.prefix === "") ? elem.requestFullScreen() : elem[this.prefix + "RequestFullScreen"]();
        };
        fullScreen.cancelFullScreen = function (elem) {
            return (this.prefix === "") ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]();
        };
    }
    coreUtil.requestFullScreen = coreJquery.requestFullScreen = function (selector) {
        if (selector == null || selector == undefined) { selector = document.documentElement; }
        selector = coreUtil.parseJquery(selector);
        return selector.each(function () {
            if (fullScreen.supports) { fullScreen.requestFullScreen(this); }
        });
    };
    coreJquery.prototype.requestFullScreen = function () { return coreJquery.requestFullScreen(this); };
    coreUtil.cancelFullScreen = coreJquery.cancelFullScreen = function (selector) {
        if (selector == null || selector == undefined) { selector = document.documentElement; }
        selector = coreUtil.parseJquery(selector);
        return selector.each(function () {
            if (fullScreen.supports) { fullScreen.cancelFullScreen(this); }
        });
    };
    coreJquery.prototype.cancelFullScreen = function () { return coreJquery.cancelFullScreen(this); };
    coreUtil.supportsFullScreen = fullScreen.supports;
    coreUtil.fullScreen = fullScreen;





    //  \u5143\u7D20\u95EA\u52A8\u7684\u9ED8\u8BA4\u65F6\u95F4\u95F4\u9694\uFF08\u6BEB\u79D2\uFF09\uFF1B\u8BE5\u5C5E\u6027\u4EC5\u9650\u4E8E\u88AB\u65B9\u6CD5 coreUtil.shine \u8C03\u7528\uFF1B
    coreUtil.shineInterval = 100;
    //  \u5143\u7D20\u95EA\u52A8\u7684\u9ED8\u8BA4\u6B21\u6570\uFF1B\u8BE5\u5C5E\u6027\u4EC5\u9650\u4E8E\u88AB\u65B9\u6CD5 coreUtil.shine \u8C03\u7528\uFF1B
    coreUtil.shineTimes = 10;
    //  \u4F7F\u5143\u7D20\u95EA\u52A8
    coreUtil.shine = coreJquery.shine = function (selector, interval, times) {
        if (selector == null || selector == undefined) { return selector; }
        selector = coreUtil.parseJquery(selector);
        if (!coreUtil.isNumeric(interval) || interval <= 40) { interval = coreUtil.shineInterval; }
        if (!coreUtil.isNumeric(times) || times < 4) { times = coreUtil.shineTimes; }
        var a = function () { selector.addClass("jdirk-shine"); };
        var b = function () { selector.removeClass("jdirk-shine"); };
        var run = function () {
            coreUtil.exec(a, interval / 2);
            coreUtil.exec(b, interval);
            times--;
            if (times > 0) { coreUtil.exec(run, interval); }
        };
        coreUtil.exec(run);
        return selector;
    };
    coreJquery.prototype.shine = function (interval, times) { return coreJquery.shine(this, interval, times); };

    //  \u7528\u4E00\u4E2A\u6216\u591A\u4E2A\u5176\u4ED6\u5BF9\u8C61\u6765\u6269\u5C55\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u8FD4\u56DE\u88AB\u6269\u5C55\u7684\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
    //      deep:   \u53EF\u9009\uFF1B\u5982\u679C\u8BBE\u4E3A true\uFF0C\u5219\u9012\u5F52\u5408\u5E76\uFF1B
    //      target: \u53EF\u9009\uFF1B\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u5982\u679C\u9644\u52A0\u7684\u5BF9\u8C61\u88AB\u4F20\u9012\u7ED9\u8FD9\u4E2A\u65B9\u6CD5\u5C06\u90A3\u4E48\u5B83\u5C06\u63A5\u6536\u65B0\u7684\u5C5E\u6027\uFF0C\u5982\u679C\u5B83\u662F\u552F\u4E00\u7684\u53C2\u6570\u5C06\u6269\u5C55jQuery\u7684\u547D\u540D\u7A7A\u95F4\uFF1B
    //      object1:\u5F85\u5408\u5E76\u5230 target \u7684\u5BF9\u8C61\uFF1B
    //      object2:\u5F85\u5408\u5E76\u5230 target \u7684\u5BF9\u8C61\uFF1B
    //      objectN:\u5F85\u5408\u5E76\u5230 target \u7684\u5BF9\u8C61\uFF1B
    //      ...
    //  \u53C2\u8003 jquery-2.0.0.js \u4E2D\u5173\u4E8E jQuery.extend \u4EE5\u53CA jQuery.fn.extend \u65B9\u6CD5\u7684\u5B9A\u4E49\uFF1B
    //  \u6CE8\u610F\uFF1A\u8BE5\u65B9\u6CD5\u4E0E jQuery.extend \u4EE5\u53CA jQuery.fn.extend \u7684\u4E0D\u540C\u4E4B\u5904\u5728\u4E8E\uFF1A
    //      jQuery.extend \u4EE5\u53CA jQuery.fn.extend\uFF1A\u65E0\u8BBA target \u5BF9\u8C61\u4E2D\u662F\u5426\u5B58\u5728 object1、object2、objectN \u7B49\u5F85\u5408\u5E76\u5BF9\u8C61\u4E2D\u76F8\u5E94\u7684\u5C5E\u6027\uFF0C\u5F85\u5408\u5E76\u5BF9\u8C61\u4E2D\u7684\u76F8\u5E94\u5C5E\u6027\u90FD\u5C06\u4F1A\u5408\u5E76\u5230 target \u4E2D\uFF1B
    //      union: \u5982\u679C target \u5BF9\u8C61\u4E2D\u5B58\u5728 object1、object2、objectN \u7B49\u5F85\u5408\u5E76\u5BF9\u8C61\u4E2D\u76F8\u5E94\u7684\u5C5E\u6027\uFF0C\u5219\u8BE5\u5C5E\u6027\u5C06\u4E0D\u4F1A\u88AB\u5408\u5E76\u5230 target \u4E2D\u3002
    var union = coreJquery.union = coreJquery.prototype.union = function () {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") { deep = target; target = arguments[1] || {}; i = 2; }
        if (typeof target !== "object" && !coreUtil.isFunction(target)) { target = {}; }
        if (length === i) { target = this; --i; }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) { continue; }
                    if (deep && copy && (coreUtil.isPlainObject(copy) || (copyIsArray = coreUtil.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && coreUtil.isArray(src) ? src : [];
                        } else {
                            clone = src && coreUtil.isPlainObject(src) ? src : {};
                        }
                        target[name] = union(deep, clone, copy);
                    } else if (copy !== undefined && copy !== null && (src === undefined || src === null)) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };



    union($, coreJquery);
    union($.fn, coreJquery.prototype);

    union(String, coreString);
    union(String.prototype, coreString.fn);
    union(Date, coreDate);
    union(Date.prototype, coreDate.fn);
    union(Number, coreNumber);
    union(Number.prototype, coreNumber.fn);
    union(Array, coreArray);
    union(Array.prototype, coreArray.fn);
    union(Boolean, coreBoolean);
    union(Boolean.prototype, coreBoolean.fn);

    union($.fn, Array.prototype);

    coreUtil.addCss(".jdirk-shine { filter: alpha(opacity=40); opacity: 0.4; }");

    //  _enableUniqueID = true;
    //  \u521D\u59CB\u5316\u6D4F\u89C8\u5668\u7684\u81EA\u52A8\u7ED9 DOM \u5143\u7D20\u521B\u5EFA\u5168\u5C40\u552F\u4E00\u6807\u8BC6\u7B26 uniqueID \u529F\u80FD\uFF1B
    if (_enableUniqueID) {
        $(function () {
            if (!coreUtil.isTopMost && coreUtil.currentFrame && coreUtil.currentFrame != null) { coreUtil.initElementUniqueID(coreUtil.currentFrame); }
            coreUtil.setEnableUniqueID(_enableUniqueID);
        });
    }




    ///////////////////////////////////////////////////////////////////////////////////////////////
    //  \u521D\u59CB\u5316 JSON \u5BF9\u8C61\uFF08\u517C\u5BB9 IE 6、7、8 \u4F7F\u4E4B\u652F\u6301 JSON \u5BF9\u8C61\uFF09
    //  json2.js 2013-05-26
    //  Public Domain. NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    //  See http://www.JSON.org/js.html
    ///////////////////////////////////////////////////////////////////////////////////////////////
    if (typeof JSON !== 'object') { JSON = {}; }
    function f(n) { return n < 10 ? '0' + n : n; }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate()) + 'T' +
                    f(this.getUTCHours()) + ':' +
                    f(this.getUTCMinutes()) + ':' +
                    f(this.getUTCSeconds()) + 'Z'
                : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf(); };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' },
        rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); }
        if (typeof rep === 'function') { value = rep.call(holder, key, value); }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) { return 'null'; }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) { indent += ' '; }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', { '': value });
        };
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); });
            }
            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({ '': j }, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }

})(window, jQuery);