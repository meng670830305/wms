/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI combotree Extensions 1.0 beta
* jQuery EasyUI combotree \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.combotree.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-07-29
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*   3、jeasyui.extensions.menu.js v1.0 beta late
*   3、jeasyui.extensions.combo.js v1.0 beta late
*   5、jeasyui.extensions.tree.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.fn.combotree.extensions = {};


    var methods = $.fn.combotree.extensions.methods = {};
    var defaults = $.fn.combotree.extensions.defaults = $.extend({}, $.fn.tree.extensions.defaults, {

        //  \u66F4\u6539\u7EE7\u627F\u4E8E easyui-tree \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027 toggleOnClick \u7684\u9ED8\u8BA4\u503C\uFF0C\u4F7F\u5F97 easyui-combotree \u4E2D tree \u7EC4\u4EF6\u7684\u9875\u8282\u70B9\u5728\u70B9\u51FB\u540E\u4E0D\u81EA\u52A8\u5C55\u5F00/\u6298\u53E0\u5B50\u8282\u70B9\uFF1B
        //  Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        toggleOnClick: false,

        //  \u66F4\u6539\u7EE7\u627F\u4E8E easyui-tree \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027 autoBindDblClick \u7684\u9ED8\u8BA4\u503C\uFF0C\u4F7F\u5F97 easyui-combotree \u4E2D tree \u7EC4\u4EF6\u7684\u9875\u8282\u70B9\u5728\u53CC\u51FB\u540E\u4E0D\u89E6\u53D1\u7B2C\u4E00\u4E2A\u53F3\u952E\u83DC\u5355\u9879\u7684\u4E8B\u4EF6\uFF1B
        //  Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        autoBindDblClick: false
    });

    $.extend($.fn.combotree.defaults, defaults);
    $.extend($.fn.combotree.methods, methods);

})(jQuery);