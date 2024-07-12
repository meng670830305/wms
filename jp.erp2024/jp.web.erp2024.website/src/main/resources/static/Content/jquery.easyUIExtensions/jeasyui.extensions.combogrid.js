/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI combogrid Extensions 1.0 beta
* jQuery EasyUI combogrid \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.combogrid.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-07-29
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*   3、jeasyui.extensions.menu.js v1.0 beta late
*   4、jeasyui.extensions.datagrid.js v1.0 beta late
*   5、jeasyui.extensions.panel.js v1.0 beta late \u548C jeasyui.extensions.window.js v1.0 beta late(\u53EF\u9009)
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.fn.combogrid.extensions = {};


    var methods = $.fn.combogrid.extensions.methods = {};
    var defaults = $.fn.combogrid.extensions.defaults = $.extend({}, $.fn.datagrid.extensions.defaults, {
        //  \u8986\u76D6 easyui-combogrid \u7684\u4E8B\u4EF6 onLoadSuccess \u4EE5\u652F\u6301 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u529F\u80FD\uFF1B
        onLoadSuccess: function (data) {
            var t = $.util.parseJquery(this), grid = t.combogrid("grid");
            $.fn.datagrid.extensions.defaults.onLoadSuccess.call(grid, data);
        },

        //  \u8986\u76D6 easyui-combogrid \u7684\u4E8B\u4EF6 onResizeColumn \u4EE5\u652F\u6301 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u529F\u80FD\uFF1B
        onResizeColumn: function (field, width) {
            var t = $.util.parseJquery(this), grid = t.combogrid("grid");
            $.fn.datagrid.extensions.defaults.onResizeColumn.call(grid, field, width);
        }
    });

    $.extend($.fn.combogrid.defaults, defaults);
    $.extend($.fn.combogrid.methods, methods);

    //  \u589E\u52A0 easyui-datagrid \u4E2D editors \u5C5E\u6027\u5BF9 easyui-combogrid \u7684\u652F\u6301\u3002
    if ($.fn.datagrid) {
        $.extend($.fn.datagrid.defaults.editors, {
            combogrid: {
                init: function (container, options) {
                    return $("<select class='datagrid-editable-input' ></select>").appendTo(container).combogrid(options);
                },
                destroy: function (target) { $.util.parseJquery(target).combogrid("destroy"); },
                getValue: function (target) {
                    var t = $.util.parseJquery(target), opts = t.combogrid("options");
                    return t.combogrid(opts.multiple ? "getValues" : "getValue");
                },
                setValue: function (target, value) {
                    $.util.parseJquery(target).combogrid($.isArray(value) ? "setValues" : "setValue", value);
                },
                resize: function (target, width) { $(target).combogrid("resize"); }
            }
        });
    }
})(jQuery);