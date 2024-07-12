/*************************************************************************************************************
*  页面值快照
**************************************************************************************************************
*
*  @功能：保存页面值到用户浏览器，可用于页面常用值保存，然后下次打开页面恢复;
*  @示例:
*       pageCache.add(document.getElementById("PlatformShopID"));
*       pageCache.add(document.getElementById("PlatformSiteID"));
* 
* 
*       pageCache.add([document.getElementById("PlatformShopID"),document.getElementById("PlatformSiteID")]);
* 
* 
*       pageCache.add("#PlatformSiteID,#PlatformShopID");
*       pageCache.add($("#PlatformSiteID,#PlatformShopID"));
*  @TODO:是否加入过期时间
**************************************************************************************************************/
; (function (window, $, store) {
    if (!store) {
        window.store = { set: function () { }, get: function () { } };
        console.error("页面未加载store插件！");
    }
    var page = window.location.pathname.replace(/\/$|\/(\d+)$/, '');
    var PageCache = function () {
        var list = [];
        //添加一个要保存的表单 dom节点
        // @restoreFunc:恢复页面值函数;可以不传值
        // @storeFunc:存储页面值函数;可以不传值
        this.add = function (dom, restoreFunc, storeFunc) {
            if (!dom) return;
            if (typeof (dom) == "string") {
                dom = $(dom);
            }
            if ($.isArray(dom) || dom instanceof jQuery) {
                for (var i = 0; i < dom.length; i++) {
                    this.add(dom[i], restoreFunc, storeFunc);
                }
                return;
            }

            if (!dom.nodeName || !dom.nodeType) return;
            var className = dom.className;
            var key = $(dom).attr('name') || dom.id;
            var nodeName = dom.nodeName.toLowerCase();
            if (!key) return;
            if (restoreFunc && typeof (restoreFunc) != "function") restoreFunc = null;
            if (storeFunc &&  typeof (storeFunc) != "function") storeFunc = null;
            key = page + ":" + key;
            if (className) {
                className = className.toLowerCase();
                if (className.indexOf('easyui-') > -1) {
                    className = /easyui-([^ "']+)/i.exec(className)[1];
                    if (className == "validatebox") {
                        _add(dom, key, restoreFunc || function (v) {
                            this.val(v);
                        }, storeFunc || function () {
                            return this.val();
                        });
                    } else {
                        _add(dom, key, restoreFunc || function (v) {
                            this.val(v);
                        }, storeFunc || function () {
                            return this[className]("getValue");
                        });
                    }
                }
                return;
            }
            switch (nodeName) {
                case "input":
                case "select":
                case "textarea":
                    _add(dom, key, restoreFunc || function (v) {
                        this.val(v);
                    }, storeFunc || function () {
                        return this.val();
                    });
                    break;
                default:
                    if (restoreFunc && storeFunc){
                        _add(dom, key, restoreFunc, storeFunc);
                    }
                    break;
            }
        };
        //设置一个值
        this.set = function (key, value) {
            store.set(page + ":#" + key, val);
        };
        //获取一个值
        this.get = function (key) {
            return store.get(page + ":#" + key);
        };
        _add = function (dom, key, restoreFunc, storeFunc) {
            var valCache = store.get(key);
            if (valCache){
                restoreFunc.call($(dom), valCache);
            }
            list.push({
                value: valCache,
                dom: $(dom),
                key: key,
                getFunc: storeFunc
            });
        };
        window.onbeforeunload = window.onunload = function () {
            var item;
            try {
                for (var i = 0, len = list.length; i < len; i++) {
                    item = list[i];
                    var val = item.getFunc.call(item.dom);
                    if (val !== item.value) {
                        store.set(item.key, val);
                    }
                }
            } catch (e) {
            }
            return;
        };
    };

    var pageCache = new PageCache();

    window.pageCache = pageCache;
})(window, jQuery, window.store);