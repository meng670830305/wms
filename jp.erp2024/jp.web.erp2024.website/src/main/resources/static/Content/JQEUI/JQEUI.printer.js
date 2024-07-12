var CreatedOKLodop7766 = null;

//====判断是否需要安装CLodop云打印服务器:====
function needCLodop() {
    try {
        var ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i) != null) return true;
        if (ua.match(/iPhone|iPod/i) != null) return true;
        if (ua.match(/Android/i) != null) return true;
        if (ua.match(/Edge\D?\d+/i) != null) return true;

        var verTrident = ua.match(/Trident\D?\d+/i);
        var verIE = ua.match(/MSIE\D?\d+/i);
        var verOPR = ua.match(/OPR\D?\d+/i);
        var verFF = ua.match(/Firefox\D?\d+/i);
        var x64 = ua.match(/x64/i);
        if ((verTrident == null) && (verIE == null) && (x64 !== null))
            return true; else
            if (verFF !== null) {
                verFF = verFF[0].match(/\d+/);
                if ((verFF[0] >= 42) || (x64 !== null)) return true;
            } else
                if (verOPR !== null) {
                    verOPR = verOPR[0].match(/\d+/);
                    if (verOPR[0] >= 32) return true;
                } else
                    if ((verTrident == null) && (verIE == null)) {
                        var verChrome = ua.match(/Chrome\D?\d+/i);
                        if (verChrome !== null) {
                            verChrome = verChrome[0].match(/\d+/);
                            if (verChrome[0] >= 42) return true;
                        }
                    }
        return false;
    } catch (err) { return true; }
}

//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    var oscript = document.createElement("script");
    oscript.src = "http://localhost:8000/CLodopfuncs.js?priority=1";
    head.insertBefore(oscript, head.firstChild);

    //引用双端口(8000和18000）避免其中某个被占用：
    oscript = document.createElement("script");
    oscript.src = "http://localhost:18000/CLodopfuncs.js?priority=0";
    head.insertBefore(oscript, head.firstChild);
}

//====获取LODOP对象的主过程：====
function getLodop(oOBJECT, oEMBED) {
    var strHtmInstall = "<div style=\"z-index:600\"><br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    var strHtmUpdate = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='/Media/install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    var strHtm64_Install = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='/Media/install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    var strHtm64_Update = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='/Media/install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    var strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
    var strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
    var strCLodopInstall = "<br><font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href='/Media/CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面。</font>";
    // var strCLodopUpdate = "<br><font color='#FF00FF'>CLodop云打印服务需升级!点击这里<a href='/Media/CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font></div>";
    var LODOP;
    try {
        var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
        if (needCLodop()) {
            try { LODOP = getCLodop(); } catch (err) { }
            if (!LODOP && document.readyState !== "complete") { alert("C-Lodop没准备好，请稍后再试！"); return; }
            if (!LODOP) {
                JQEUI.genrateInstallPage(strCLodopInstall);
                return;
            } else {
                if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
                if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
            }
        } else {
            var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT != undefined || oEMBED != undefined) {
                if (isIE) LODOP = oOBJECT; else LODOP = oEMBED;
            } else if (CreatedOKLodop7766 == null) {
                LODOP = document.createElement("object");
                LODOP.setAttribute("width", 0);
                LODOP.setAttribute("height", 0);
                LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;z-index:600");
                if (isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else LODOP.setAttribute("type", "application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766 = LODOP;
            } else LODOP = CreatedOKLodop7766;
            //=====Lodop插件未安装时提示下载地址:==========
            if ((LODOP == null) || (typeof (LODOP.VERSION) == "undefined")) {
                if (navigator.userAgent.indexOf('Chrome') >= 0)
                    JQEUI.genrateInstallPage(strHtmChrome);
                if (navigator.userAgent.indexOf('Firefox') >= 0)
                    JQEUI.genrateInstallPage(strHtmFireFox);
                if (is64IE) document.write(strHtm64_Install);
                else if (isIE) document.write(strHtmInstall);
                else JQEUI.genrateInstallPage(strHtmInstall);
                return LODOP;
            }
        }
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
        LODOP.SET_LICENSES("", "508A096D803AB77E32FCE12C0F5C8793", "C94CEE276DB2187AE6B65D56B3FC2848", "");
        //===========================================================
        return LODOP;
    } catch (err) { alert("getLodop出错:" + err); }
};


JQEUI.extend(JQEUI, {
    genrateInstallPage: function (html) {
        if ($("#diaologDiv").length == 0) {
            $("body").append("<div id='diaologDiv'><div>");
        }
        $("#diaologDiv").dialog({
            title: '打印提示',
            width: 400,
            height: 300,
            top: 200,
            maximizable: true,
            resizable: true,
            iniframe: false,
            content: html,
            modal: true,
            buttons: [{
                text: 'クローズ',
                iconCls: 'icon-close',
                handler: function () {
                    $("#diaologDiv").dialog('close');
                }
            }]
        });
    },
    
    //lodopObjId:(object id),lodopEmId:(embed id)
    checkIsInstall: function (lodopObjId, lodopEmId) {
        try {
            var LODOP = getLodop(document.getElementById(lodopObjId), document.getElementById(lodopEmId));
            if ((LODOP != null) && (typeof (LODOP.VERSION) != "undefined")) {
                return true;
            } else {
                JQEUI.showError("Error:本机打印控件未安装或需要升级!");
                return false;
            }
        } catch (err) {
            JQEUI.showError("Error:本机打印控件未安装或需要升级!");
            return false;
        }
    },
    getLodop: function (oOBJECT, oEMBED) {
        var strHtmInstall = "<div style=\"z-index:600\"><br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
        var strHtmUpdate = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='/Media/install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
        var strHtm64_Install = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='/Media/install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
        var strHtm64_Update = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='/Media/install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
        var strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
        var strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
        var strCLodopInstall = "<br><font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href='/Media/CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面。</font>";
        var LODOP;
        try {
            var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
            if (needCLodop()) {
                try { LODOP = getCLodop(); } catch (err) { }
                if (!LODOP && document.readyState !== "complete") { alert("C-Lodop没准备好，请稍后再试！"); return; }
                if (!LODOP) {
                    JQEUI.genrateInstallPage(strCLodopInstall);
                    return;
                } else {
                    if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
                    if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
                }
            } else {
                var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
                //=====如果页面有Lodop就直接使用，没有则新建:==========
                if (oOBJECT != undefined || oEMBED != undefined) {
                    if (isIE) LODOP = oOBJECT; else LODOP = oEMBED;
                } else if (CreatedOKLodop7766 == null) {
                    LODOP = document.createElement("object");
                    LODOP.setAttribute("width", 0);
                    LODOP.setAttribute("height", 0);
                    LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;z-index:600");
                    if (isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                    else LODOP.setAttribute("type", "application/x-print-lodop");
                    document.documentElement.appendChild(LODOP);
                    CreatedOKLodop7766 = LODOP;
                } else LODOP = CreatedOKLodop7766;
                //=====Lodop插件未安装时提示下载地址:==========
                if ((LODOP == null) || (typeof (LODOP.VERSION) == "undefined")) {
                    if (navigator.userAgent.indexOf('Chrome') >= 0)
                        JQEUI.genrateInstallPage(strHtmChrome);
                    if (navigator.userAgent.indexOf('Firefox') >= 0)
                        JQEUI.genrateInstallPage(strHtmFireFox);
                    if (is64IE) document.write(strHtm64_Install);
                    else if (isIE) document.write(strHtmInstall);
                    else JQEUI.genrateInstallPage(strHtmInstall);
                    return LODOP;
                }
            }
            //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
            LODOP.SET_LICENSES("", "508A096D803AB77E32FCE12C0F5C8793", "C94CEE276DB2187AE6B65D56B3FC2848", "");
            //===========================================================
            return LODOP;
        } catch (err) { alert("getLodop出错:" + err); }
    },
    //打印SKU质检合格码,scm. erp.printer.js
    printQualifsSKU: function (lodop, code, specification, qcUserName, pileCode, cooperationCompany, stockSKUidCode, purchaseSKU, goodsID, isPreView) {
        debugger;
        var intPageWidth = 600;
        var intPageHeight = 400;
        var strPageName = 'printQCNum';
        lodop.PRINT_INIT(strPageName);//打印初始化
        lodop.SET_PRINT_PAGESIZE(0, intPageWidth, intPageHeight, strPageName);//设定纸张大小
        lodop.SET_PRINT_STYLEA(0, "FontSize", 10);
        //设置容错级别
        lodop.SET_PRINT_STYLEA(0, "QRCodeVersion", 3);
        lodop.SET_PRINT_STYLEA(0, "QRCodeErrorLevel", "H");
        //打印二维码
        lodop.ADD_PRINT_BARCODE(1, 1, 100, 100, "QRCode", code + '-' + cooperationCompany + "-" + pileCode + "\r\n");

        specification = specification.replace(" ", "").replace("@@", " ");

        lodop.SET_PRINT_STYLEA(0, "FontSize", 10);
        lodop.SET_PRINT_STYLEA(0, "FontColor", "#000000");
        lodop.SET_PRINT_STYLE("FontColor", "#0000FF");

        //打印质检人
        lodop.ADD_PRINT_TEXT(5, 85, 120, 15, "QC:" + qcUserName + "(S:" + stockSKUidCode + ")");

        //打印采购物品码（方便查询）
        lodop.ADD_PRINT_TEXT(25, 85, 150, 50, "WP:" + goodsID + "(S:" + purchaseSKU + ")");

        //打印规格
        lodop.ADD_PRINT_TEXT(45, 85, 150, 50, specification);

        lodop.ADD_PRINT_LINE(78, 0, 78, 251, 0, 1);
        lodop.SET_PRINT_STYLE("FontColor", "#000000");

        //打印SKU 编码
        lodop.ADD_PRINT_TEXT(88, 20, 360, 50, code + '-' + cooperationCompany + "-" + pileCode);
        lodop.SET_PRINT_STYLEA(0, "Bold", 2);
        lodop.SET_PRINT_STYLEA(0, "FontSize", 15);

        if (isPreView) {
            lodop.PREVIEW();
        } else {
            lodop.PRINT();
        }
    },
    ///打印4px  条形码. scm. erp.printer.js
    printQualifsPlat4PX: function (lodop, roductBar, isPreView) {
        var intPageWidth = 600;
        var intPageHeight = 400;

        var strPageName = 'printQCNum';
        lodop.PRINT_INIT(strPageName);//打印初始化
        lodop.SET_PRINT_PAGESIZE(0, intPageWidth, intPageHeight, strPageName);//设定纸张大小

        //lodop.ADD_PRINT_BARCODE(60, 10, 250, 75, "EAN128B", roductBar.imBarNo + "\r\n");

        lodop.ADD_PRINT_BARCODE(10, 10, "RightMargin:0px", "BottomMargin:200px", "EAN128B", roductBar.imBarNo + "\r\n");
        lodop.SET_PRINT_STYLEA(0, "ShowBarText", 0);

        lodop.ADD_PRINT_TEXT(75, 10, 200, 20, roductBar.imBarNo);
        lodop.ADD_PRINT_TEXT(75, 90, 200, 20, "Name:" + roductBar.SkuID);
        lodop.ADD_PRINT_TEXT(89, 10, 200, 20, roductBar.imBarCode);
        lodop.ADD_PRINT_TEXT(100, 10, 200, 20, "Made in China");//(intTop,intLeft,intWidth,intHeight,strContent)
        if (isPreView) {
            lodop.PREVIEW();
        } else {
            lodop.PRINT();
        }
    },
});