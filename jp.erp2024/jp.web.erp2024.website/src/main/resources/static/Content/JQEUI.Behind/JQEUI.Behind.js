(function (window, $, JQEUI) {
    var _top$ = null,
    _top = null
    ;


    if (JQEUI.CORS) {
        _top$ = self.window.$,
        _top = self.window
    } else {
        _top$ = top.window.$,
        _top = top.window
    }



    $.extend(JQEUI, {
        tabShow: function (title, url, img) {
            if (url == ' ' || !url) return;
            //url = url.indexOf("?") > -1 ? url + '&_=' + JQEUI.getId() : url + '?_=' + JQEUI.getId();
            title = title || '新标签';
            if (_top.tabPages.tabs('exists', title)) {

                _top.tabPages.tabs("getTab", title).panel('refresh', url);
                //_top.tabPages.tabs('update', {
                //    tab: _top.tabPages.tabs("getTab", title),
                //    options: {
                //        title: title,
                //        href: url,
                //        iframe: true,
                //        selected: true
                //    }
                //});
                _top.tabPages.tabs('select', title);
            }
            else {
                _top.tabPages.tabs("add", {
                    title: title,
                    href: url,
                    iframe: true,
                    closable: true,
                    refreshable: true,
                    fit: true,
                    iconCls: img || "icon-blank",
                    border: false,
                    selected: true
                });
            }
            return _top.tabPages;
        },
        //关闭tab页面,title 可选参数，默认关闭当前选中tab
        tabClose: function (title) {
            if (title) {
                _top.tabPages.tabs("close", title);
            } else if (_top != self) {
                var tab = _top.tabPages.tabs("getSelected");
                var index = _top.tabPages.tabs('getTabIndex', tab);
                _top.tabPages.tabs("close", index);
            } else {
                window.opener = null;
                window.close();
            }
        },
        //刷新页面
        //   eventNotity：可选参数，是否使用消息通知形式，而不是整页刷新
        tabRefresh: function (title, eventNotity) {
            // &_=  ?_= TODO:添加随机数不缓存onRefresh
            if (!title) return;
            if (eventNotity) {
                var tab = _top.tabPages.tabs("getTab", title);
                if (tab) {
                    var iframe = $(tab).find('iframe');
                    if (iframe.length) {
                        try {
                            var document = iframe[0].contentWindow.document;
                            var ev = document.createEvent('HTMLEvents');
                            ev.initEvent('refresh', false, true);
                            document.dispatchEvent(ev);
                        } catch (e) {
                        }
                    }
                }
            }
            else {
                _top.tabPages.tabs("refresh", title);
            }
        },
        //重新加载页面
        tabReload: function () {
            JQEUI.wait("请稍后,正在刷新页面...");
            self.window.location.reload(true);
        },
        //关闭页面，如果父级中存在tab则关闭标签页,如果父级中存在dialog则关闭对话框。types可选参数
        close: function (types/*dialog tab*/) {
            var tempWindow = self, frameElement, types = types || ["dialog", "tab"], _$, closed = false;
            if (!$.isArray(types)) {
                types = [types];
            }
            while (tempWindow != _top) {
                frameElement = tempWindow.frameElement, _$ = tempWindow.parent.$;
                if (!frameElement || !_$) break;
                var dig = _$(frameElement).closest('.window-body');
                if (dig.length && types.contains("dialog")) {
                    dig.dialog("close");
                    closed = true;
                    break;
                }
                var tabs = _$(frameElement).closest('.tabs-container');
                if (tabs.length && types.contains("tab")) {
                    var tab = tabs.tabs("getSelected");
                    var index = tabs.tabs('getTabIndex', tab);
                    tabs.tabs("close", index);
                    closed = true;
                    break;
                }
                tempWindow = tempWindow.parent;
            }
            if (!closed) {
                JQEUI.tabClose();
            }
        }
    });
})(window, jQuery, JQEUI);


//if ($.fn.validatebox) {
//    $.extend($.fn.validatebox.defaults.rules, {
//        password: {
//            validator: function (value, param) {
//                return /^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\x21-\x7e]+).{8,30}$/.test(value);
//            },
//            message: '必须包含字母、数字、特殊字符，长度在8到30位之间.'
//        }
//    });
//}


//(function (document) {
//    try {
//        if (top.window.__HasMarqueeMessage) return;
//        var marquee = document.createElement('div');
//        var message = "系统通知：为了提供更优质的服务，PMS系统将于今晚18:20-20:20升级维护，在此期间您将无法访问系统，请注意保存您数据。给您带来的不便敬请谅解！";
//        marquee.innerHTML = '<marquee  behavior="scroll"  direction="left"  hspace="10" vspace="0" loop="-1" scrollamount="10" scrolldelay="200" onMouseOut="this.start()" onMouseOver="this.stop()" style="z-index:999999;background-color:#f00;height:30px;line-height:30px;color:#FFFE33;font-size:16px;cursor: default;position: fixed;left: 0;bottom: 0;right: 0;margin: 0;padding: 0;">' + message + '</marquee>';
//        document.body.appendChild && document.body.appendChild(marquee);
//        top.window.__HasMarqueeMessage = true;
//    } catch (e) {

//    }
//})(top.window.document);
