/************************************************************************
 * JQEUI Library
 * 
 * @ Version	: 1.0.5991.559
 * @ Author		: 孙亮
 * @ Date		: 2017-02-27
 * @ Email		: sunliang23456@126.com
 * 
 * Copyright (c) 2013-2016 sunliang23456@126.com. All Rights Reserved.
 * 
 * Licensed under the GPL or commercial licenses.
 * To use it on other terms please contact us: sunliang23456@126.com
 * 
 * 可自由使用和复制,但请保留以上版权信息.
 ************************************************************************/
;

intellisense.annotate(window, {
    'JQEUI': function () {
        /// <signature>
        ///   <summary>Tidebuy函数库.</summary>
        ///   <returns type="JQEUI" />
        /// </signature>
    }
});

intellisense.annotate(JQEUI, {
    //'getId': function () {
    //    /// <signature>
    //    ///     <summary>获取一个不重复ID.</summary>
    //    ///     <returns type="Number">ID.</returns>
    //    /// </signature>
    //    /// <signature>
    //    ///     <summary>获取一个不重复ID.</summary>
    //    ///     <param name="prix" type="String">前缀.</param>
    //    ///     <returns type="String">ID.</returns>
    //    /// </signature>
    //},
    //'tabShow': function () {
    //    /// <signature>
    //    ///     <summary>新建或者替换指定的tabPage页面.</summary>
    //    ///     <param name="title" type="String">待打开tab的标题.</param>
    //    ///     <param name="url" type="String">待打开tab的url.</param>
    //    ///     <param name="img" type="String">[可选参数]待打开tab的图标.</param>
    //    ///     <returns type="jQuery">$.tab对象.</returns>
    //    /// </signature>
    //},
    //'tabClose': function () {
    //    /// <signature>
    //    ///     <summary>关闭指定的tabPage页面.</summary>
    //    ///     <param name="title" type="String">待关闭tab的标题.</param>
    //    ///     <returns type="jQuery">$.tab对象.</returns>
    //    /// </signature>
    //},
    //'tabCloseSelf': function () {
    //    /// <signature>
    //    ///     <summary>关闭调用的该函数标签页.</summary>
    //    /// </signature>
    //},
    //'tabRefresh': function () {
    //    /// <signature>
    //    ///     <summary>刷新指定标题页面.</summary>
    //    ///     <param name="title" type="String">待刷新tab的标题.</param>
    //    ///     <returns type="jQuery">$.tab对象.</returns>
    //    /// </signature>
    //},
    //'tabReload': function () {
    //    /// <signature>
    //    ///     <summary>刷新当前页面.</summary>
    //    /// </signature>
    //},
    'show': function () {
        /// <signature>
        ///     <summary>显示一个自动消失的提示框.</summary>
        ///     <param name="content" type="String">消息内容.</param>
        ///     <returns type="jQuery">$.messager.alert对象.</returns>
        /// </signature>
        /// <signature>
        ///     <summary>显示一个自动消失的提示框.</summary>
        ///     <param name="content" type="String">消息内容.</param>
        ///     <param name="title" type="String">标题.</param>
        ///     <returns type="jQuery">$.messager.alert对象.</returns>
        /// </signature>
        /// <signature>
        ///     <summary>显示一个自动消失的提示框.</summary>
        ///     <param name="content" type="String">消息内容.</param>
        ///     <param name="title" type="String">标题.</param>
        ///     <param name="icon" type="String">图标.</param>
        ///     <returns type="jQuery">$.messager.alert对象.</returns>
        /// </signature>
    },
    'alert': function () {
        /// <signature>
        ///     <summary>显示一个Alert提示框.</summary>
        ///     <param name="content" type="String">消息内容.</param>
        ///     <returns type="jQuery">$.messager.alert对象.</returns>
        /// </signature>
    },
    'error': function () {
        /// <signature>
        ///     <summary>显示一个Error提示框.</summary>
        ///     <param name="content" type="String">消息内容.</param>
        ///     <returns type="jQuery">$.messager.alert对象.</returns>
        /// </signature>
    },
    'info': function () {
        /// <signature>
        ///     <summary>显示一个Info提示框.</summary>
        ///     <param name="content" type="String">消息内容.</param>
        ///     <returns type="jQuery">$.messager.alert对象.</returns>
        /// </signature>
    },
    'warn': function () {
        /// <signature>
        ///     <summary>显示一个Warn提示框.</summary>
        ///     <param name="content" type="String">消息内容.</param>
        ///     <returns type="jQuery">$.messager.alert对象.</returns>
        /// </signature>
    },
    'wait': function () {
        /// <signature>
        ///     <summary>获取当前wait状态.</summary>
        ///     <returns type="Boolean">true=当前正在锁定中;false=未锁定.</returns>
        /// </signature>
        /// <signature>
        ///     <summary>显示/显示wait 层.</summary>
        ///     <param name="message" type="String">消息.null 值将关闭</param>
        ///     <returns type="jQuery">jQuery对象.</returns>
        /// </signature>
        /// <signature>
        ///     <summary>显示/显示wait 层.</summary>
        ///     <returns type="jQuery">jQuery对象.</returns>
        /// </signature>
    },
    'dialog':function(){
        /// <signature>
        ///     <summary>dialog.</summary>        
        ///     <param name="optiosn" type="Object">easyui初始化参数对象.</param>
        ///     <returns type="jQuery">$.dialog对象.</returns>
        /// </signature>
    },
    'confirm':function(){
        /// <signature>
        ///     <summary>confirm.</summary>        
        ///     <param name="optiosn" type="Object">easyui初始化参数对象.</param>
        ///     <returns type="jQuery">$.dialog对象.</returns>
        /// </signature>
    },
    'open': function () {
        /// <signature>
        ///     <summary>打开一个页面.</summary>
        ///     <param name="url" type="String">url.</param>
        /// </signature>
        /// <signature>
        ///     <summary>打开一个页面.</summary>
        ///     <param name="url" type="String">url.</param>
        ///     <param name="target" type="String">同a标签的target属性值.</param>
        /// </signature>
    },
    "download": function () {
        /// <signature>
        ///   <summary>异步下载</summary>
        ///     <param name="url" type="String">url.</param>
        /// </signature>
        /// <signature>
        ///   <summary>异步下载</summary>
        ///     <param name="url" type="String">url.</param>
        ///     <param name="data" type="Object">参数对象.</param>
        /// </signature>
    },
    'getUrlParam': function () {
        /// <signature>
        ///     <summary>获取url指定key名称值.</summary>
        ///     <param name="name" type="String">url指定key名称.</param>
        ///     <returns type="String">url指定key值.不存在返回null</returns>
        /// </signature>
    },
    'getUrlObject': function () {
        /// <signature>
        ///     <summary>将当前url中的查选参数封装到一个对象中.</summary>
        ///     <returns type="Object">对象</returns>
        /// </signature>
    },
    'filterSerialize': function () {
        /// <signature>
        ///     <summary>获取指定selecter下的筛选值.</summary>
        ///     <param name="selecter" type="String">url指定key名称.</param>
        ///     <returns type="Object">序列化后的值.</returns>
        /// </signature>
        /// <signature>
        ///     <summary>获取指定selecter下的筛选值.</summary>
        ///     <param name="selecter" type="String">selecter.</param>
        ///     <param name="filterData" type="Object">待存入的对象.</param>
        ///     <returns type="Object">对象.</returns>
        /// </signature>
    },
    'filterParser':{
        /// <signature>
        ///     <summary>常用筛选解析.</summary>
        ///     <returns type="Object">对象</returns>
        /// </signature>
    },
    'api':function () {
        /// <signature>
        ///     <summary>获取/执行API请求.</summary>
        ///     <param name="url" type="String">url.</param>
        ///     <param name="data" type="String">发送的数据.</param>
        ///     <param name="complete" type="Function">请求完成的回调事件.</param>
        ///     <returns type="Boolean">true=不阻止消息弹出窗；false=阻止弹出消息框.</returns>
        /// </signature>
        /// <signature>
        ///     <summary>获取/执行API请求.</summary>
        ///     <param name="url" type="String">url.</param>
        ///     <param name="data" type="String">发送的数据.</param>
        ///     <param name="success" type="Function">请求成功的回调事件.</param>
        ///     <param name="error" type="Function">请求失败的回调事件.</param>
        ///     <returns type="Boolean">true=不阻止消息弹出窗；false=阻止弹出消息框.</returns>
        /// </signature>
    },
    'ui': {
        /// <signature>
        ///   <summary>通用ui相关.</summary>
        ///     <returns type="Object">对象.</returns>
        /// </signature>
    },
    'grid': {
        /// <signature>
        ///   <summary>easyui 控件 datagrid相关函数.</summary>
        ///     <returns type="Object">对象.</returns>
        /// </signature>
    },
    'tree': {
        /// <signature>
        ///   <summary>easyui 控件 tree相关函数.</summary>
        ///     <returns type="Object">对象.</returns>
        /// </signature>
    }
});


intellisense.annotate(JQEUI.filterParser, {
    "compareNumberFilterParser": function (e) {
    },
    "likeFilterParser": function (e) {
    },
    "anyNumberFilterParser": function (e) {
    },
    "delimiterFieldFilterParser": function (e) {
    },
    "rangeTimeFilterParser": function (e) {
    },
    "rangeDateTimeFilterParser": function (e) {
    },
    "rangeDateFilterParser": function (e) {
    },
    "rangeNumberFilterParser": function (e) {
    }
});



intellisense.annotate(JQEUI.grid, {
    'dateFormatter': function (value, row, index) {
        /// <signature>
        ///     <summary>日期格式化.使用方法：{...,formatter:JQEUI.datagrid.dateFormatter,...}</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据(yyyy-MM-dd).</returns>
        /// </signature>
    },
    'datetimeFormatter': function (value, row, index) {
        /// <signature>
        ///     <summary>日期时间格式化.使用方法：{...,formatter:JQEUI.datagrid.datetimeFormatter,...}</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据(yyyy-MM-dd hh:mm:ss).</returns>
        /// </signature>
    },
    'timeFormatter': function (value, row, index) {
        /// <signature>
        ///     <summary>时间格式化.使用方法：{...,formatter:JQEUI.datagrid.timeFormatter,...}</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据(hh:mm:ss).</returns>
        /// </signature>
    },
    'rangeDayFormatter': function (startFiled, endFiled, fixed, callback) {
        /// <signature>
        ///     <summary>范围[天]格式化.</summary>
        ///     <param name="startFiled" type="String">起始字段.</param>
        ///     <param name="endFiled" type="String">结束字段.</param>
        ///     <param name="fixed" type="Number">精确度.</param>
        ///     <param name="callback" type="Function">回调函数(function(day){}).</param>
        ///     <returns type="Function">格式化函数Function.</returns>
        /// </signature>

    },
    'rangeHourFormatter': function (startFiled, endFiled, fixed, callback) {
        /// <signature>
        ///     <summary>范围[小时]格式化.</summary>
        ///     <param name="startFiled" type="String">起始字段.</param>
        ///     <param name="endFiled" type="String">结束字段.</param>
        ///     <param name="fixed" type="Number">精确度.</param>
        ///     <param name="callback" type="Function">回调函数(function(day){}).</param>
        ///     <returns type="Function">格式化函数Function.</returns>
        /// </signature>
    },
    'rangeSecondFormatter': function (startFiled, endFiled, fixed, callback) {
        /// <signature>
        ///     <summary>范围[秒]格式化.</summary>
        ///     <param name="startFiled" type="String">起始字段.</param>
        ///     <param name="endFiled" type="String">结束字段.</param>
        ///     <param name="fixed" type="Number">精确度.</param>
        ///     <param name="callback" type="Function">回调函数(function(day){}).</param>
        ///     <returns type="Function">格式化函数Function.</returns>
        /// </signature>
    },
    'booleanFormatter': function () {
        /// <signature>
        ///     <summary>是否值格式化</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据.</returns>
        /// </signature>
    },
    'enableFormatter': function () {
        /// <signature>
        ///     <summary>启用\禁用格式化</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据.</returns>
        /// </signature>
    },
    'imageFormatter': function () {
        /// <signature>
        ///     <summary>图片格式化</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据.</returns>
        /// </signature>
    },
    'specificationFormatter': function () {
        /// <signature>
        ///     <summary>规格格式化</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据.</returns>
        /// </signature>
    },
    'exchangeRateFormatter': function () {
        /// <signature>
        ///     <summary>汇率格式化</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据.</returns>
        /// </signature>
    },
    'moneyColorfulFormatter': function () {
        /// <signature>
        ///     <summary>货币格式化(彩色)</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据.</returns>
        /// </signature>
    },
    'moneyFormatter': function () {
        /// <signature>
        ///     <summary>货币格式化</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据.</returns>
        /// </signature>
    },
    'money4Formatter': function () {
        /// <signature>
        ///     <summary>货币格式化(保留4位小数)</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据.</returns>
        /// </signature>
    },
    'weightFormatter': function () {
        /// <signature>
        ///     <summary>重量格式化</summary>
        ///     <param name="value" type="Object">输入值.</param>
        ///     <param name="row" type="Object">行对象.</param>
        ///     <param name="index" type="Number">当前行的索引.</param>
        ///     <returns type="String">返回的格式化数据.</returns>
        /// </signature>
    },
    'loadFilter': function () {
        /// <signature>
        ///     <summary>异步数据回发Filter.使用地方：easyui.datagrid</summary>
        /// </signature>
    }
});





intellisense.annotate(JQEUI.tree, {
    'loadFilter': function () {
        /// <signature>
        ///     <summary>异步数据回发Filter.使用地方：easyui.tree/treegrid</summary>
        /// </signature>
    }
});


intellisense.annotate(JQEUI.ui, {
    'reset': function () {
        /// <signature>
        ///   <summary>重置页面空间值.</summary>
        ///   <param name="selecter" type="String">选择器或者jQuery</param>
        /// </signature>
    }
});

//C:\Microsoft Visual Studio 11.0\JavaScript\References
intellisense.addEventListener('statementcompletion', function (e) {
    //if (e.targetName !== "erp") return;
    for (var i in e.items) {
        switch (e.items[i].name) {
            case "caller":
            case "constructor":
            case "isPrototypeOf":
            case "propertyIsEnumerable":
            case "caller":
            case "constructor":
            case "isPrototypeOf":
            case "propertyIsEnumerable":
                //case "fn":
                //case "apply":
                //case "hasOwnProperty":
                //case "call":
                //case "prototype":
                //case "arguments":
                delete e.items[i];
                break;
        }
    }

    //    e.items.forEach(function (item) {
    //        if (typeof item.value === "object") {
    //            //item.glyph = 'vs:GlyphGroupClass';
    //            //item.glyph = 'vs:GlyphGroupEnum';
    //            item.glyph = 'vs:GlyphGroupNamespace';
    //        } else if (/*typeof (item.value) == 'number' &&*/ item.name.toUpperCase() == item.name) {
    //            item.glyph = 'vs:GlyphGroupEnum';
    //        }
    //        //item.name = "哈哈哈哈";

    //        //        == item.name[0])
    //        //// Prints out statement completion info: Either (1) the member 
    //        //// list, if the trigger character was typed, or (2) the 
    //        //// statement completion identifiers.
    //        //// e.target represents the object left of the trigger character.
    //        //intellisense.logMessage(
    //        //    e.target ? 'member list requested, target: ' + e.targetName : 'statement completion for current scope requested');

    //        //// Prints out all statement completion items.
    //        //e.items.forEach(function (item) {
    //        //    intellisense.logMessage('[completion item] ' + item.name + ', kind:' + item.kind + ', scope:' + item.scope + ', value:' + item.value);
    //        //});

    //        //for (var i in item) {
    //        //    item.name = item.name + "_" + i;
    //        //}
    //        //item.name = item.name + "_" + typeof (item.value);
    //        //item.name = item.name + "_" + item.parentObject.value;

    //        //if (item.parentObject && item.parentObject._isNamespace) {
    //        //    // The item is a member of a namespace. 

    //        //    // All constructor functions that are part of a namespace 
    //        //    // are considered classes. 
    //        //    // A constructor function starts with
    //        //    // an uppercase letter by convention.  
    //        //    if (typeof item.value == 'function' && (item.name[0].toUpperCase()
    //        //        == item.name[0])) {
    //        //        item.glyph = 'vs:GlyphGroupClass';
    //        //    }

    //        //    // Detect an enumeration by using the _isEnum flag.
    //        //    if (item.value && item.value._isEnum) {
    //        //        item.glyph = 'vs:GlyphGroupEnum';
    //        //    }
    //        //}
    //    });
    //});

    //intellisense.addEventListener('statementcompletionhint', function (e) {
    //    if (e.completionItem.value) {
    //        if (e.completionItem.value._isNamespace) {
    //            e.symbolHelp.symbolDisplayType = 'Namespace';
    //        }
    //        if (e.completionItem.value._isEnum) {
    //            e.symbolHelp.symbolDisplayType = 'Enum';
    //        }
    //    }
    //});

    ////对象的 targetName 属性 和 目标属性 属性排除对象 (如 this 和 window，并确保活动语句完成列表中标识。 
    //intellisense.addEventListener('statementcompletion', function (event) {
    //    if (event.targetName === "this") return;

    //    var filterRegex;

    //    if (event.target === undefined || event.target === window)
    //        filterRegex = /^_.*\d{2,}/;
    //    else
    //        filterRegex = /^_.*/;

    //    event.items = event.items.filter(function (item) {
    //        return !filterRegex.test(item.name);
    //    });
    //});