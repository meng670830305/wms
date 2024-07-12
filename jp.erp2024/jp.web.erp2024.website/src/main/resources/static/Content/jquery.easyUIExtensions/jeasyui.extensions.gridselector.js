/**
* jQuery EasyUI 1.3.4
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI gridselector Extensions 1.0 beta
* jQuery EasyUI gridselector \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.gridselector.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-09-05
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*   3、jeasyui.extensions.menu.js v1.0 beta late
*   4、jeasyui.extensions.panel.js v1.0 beta late
*   5、jeasyui.extensions.window.js v1.0 beta late
*   6、jeasyui.extensions.dialog.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {


    $.easyui.showGridSelector = function (options) {
        var opts = $.extend({
            width: 580, height: 360,
            title: "\u9009\u62E9\u6570\u636E",
            iconCls: "icon-hamburg-zoom",
            maximizable: true,
            collapsible: true,
            selected: null,
            multiple: false,
            onSelect: function (value) { }
        }, options);
        var value = opts.selected,
            dia = $.easyui.showDialog($.extend({}, opts, {
                saveButtonText: "\u786E\u5B9A",
                saveButtonIconCls: "icon-ok",
                enableApplyButton: false,
                topMost: true,
                onSave: function () { if ($.isFunction(opts.onSelect)) { return opts.onSelect.call(this, value); } }
            }));
        return dia;
    };

    $.easyui.showDblGridSelector = function (options) { };

    $.easyui.showTreeSelector = function (options) { };

    $.easyui.showDblTreeSelector = function (options) { };

    $.easyui.showTreeGridSelector = function (options) { };

    $.easyui.showDblTreeGridSelector = function (options) { };





})(jQuery);