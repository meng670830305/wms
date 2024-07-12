(function (window, document) {
    var ieArray = /(msie\s|trident.*rv:)([\w.]+)/i.exec(navigator.userAgent);
    if (ieArray && ieArray.length == 3) {
        window.isIE = true;
        window.ieVerssion = parseInt(ieArray[2]) || 0;
        var cls = " ie ie" + window.ieVerssion;
        for (var i = 8; i <= window.ieVerssion; i++) {
            cls += " ie" + i + "_";
        }
        for (var i = window.ieVerssion + 1; i <= 11; i++) {
            cls += " ie_" + i;
        }
        document.documentElement.className = document.documentElement.className + cls;
        /*
            该脚本会生成如下class:
            ie8
            <html class="ie ie8 ie8_ ie_9 ie_10 ie_11"></html>

            ie9
            <html class="ie ie8 ie8_ ie9_ ie_9 ie_10 ie_11"></html>

            ie10
            <html class="ie ie10 ie8_ ie9_ ie10_ ie_10 ie_11"></html>

            ie11
            <html class="ie ie11 ie8_ ie9_ ie10_ ie11_ ie_11"></html>          
        */


        /*
         * css 条件判断
         *  ie              代表IE浏览器，如 .ie body{color:red}表示ie浏览器背景为红色
         *  ie[8/9/10/11]   代表指定[8/9/10/11]浏览器，如 .ie8 body{color:red}表示ie8浏览器背景为红色
         *  ie_[8/9/10/11]  代表指定[8/9/10/11]之前的所有浏览器，如 .ie_9 body{color:red}表示ie9(含)之前的浏览器背景为红色
         *  ie[8/9/10/11]_  代表指定[8/9/10/11]之后的所有浏览器，如 .ie9_ body{color:red}表示ie9(含)之后的浏览器背景为红色
         */
    }
    if (window.isIE && window.ieVerssion <= 9) {
        var handler = function () {
            var div = document.createElement('div');
            div.className = "ieTip";
            div.innerHTML = '您的浏览器版本过低，将影响使用效果。建议您更换 <a href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html">谷歌浏览器</a> 或者 <a href="http://www.firefox.com.cn/">火狐浏览器</a> 或者 <a href="/Home/IETIP">更多浏览器</a>!';
            document.body.insertBefore(div, document.body.children[0]);
        };

        if (window.addEventListener) {
            window.addEventListener('load', handler, false);
        }
        else if (window.attachEvent) {
            window.attachEvent("onload", handler);
        }
    }
})(window, document);