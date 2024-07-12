//fix prototype
Object.equal = function (a, b, deep) {
    //暴力的判断方式是JSON.stringify(a)==JSON.stringify(b)?
    if (!deep) deep = 0;
    //if (!b) { b = a; a = this; }
    if (deep > 20)
        throw new ReferenceError("检测到可以发生循环引用！");
    if (a === b)
        return true;
    if (typeof (a) != typeof (b))
        return false;
    if ((a === undefined && b !== undefined) || (b === undefined && a !== undefined))
        return false;
    if ((a === null && b !== null) || (b === null && a !== null))
        return false;
    if ((isNaN(a) && !isNaN(b)) || (isNaN(b) && !isNaN(a)))
        return false;
    if ((isFinite(a) && !isFinite(b)) || (isFinite(b) && !isFinite(a)))
        return false;
    if (Array.isArray(a)) {
        if (!Array.isArray(b))
            return false;
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; i++) {
            if (!arguments.callee(a[i], b[i], deep++)) {
                return false;
            }
        }
    }
    if (typeof (a) !== 'object') {
        return false;
    }
    var temp = [];
    for (var ai in a) {
        if (!b.hasOwnProperty(ai))
            return false;
        if (!arguments.callee(a[ai], b[ai], deep++))
            return false;
        temp[ai] = true;
    }
    for (var bi in b) {
        if (temp[bi]) continue;
        return false;
    }
    return true;
};

$.extend(Date.prototype, {
    format: function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份       
            "d+": this.getDate(), //日       
            "h+": this.getHours(),// % 12 == 0 ? 12 : this.getHours() % 12, //12小时       
            "H+": this.getHours(), //小时       
            "m+": this.getMinutes(), //分       
            "s+": this.getSeconds(), //秒       
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度       
            "S": this.getMilliseconds() //毫秒       
        };
        var week = {
            "0": "日",
            "1": "一",
            "2": "二",
            "3": "三",
            "4": "四",
            "5": "五",
            "6": "六"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
    toString: function () {
        return this.format("yyyy/MM/dd HH:mm:ss.S");
    },
    addMonth: function (n) {
        var d = new Date(this.getTime());
        d.setMonth(d.getMonth() + n);
        return d;
    },
    addDay: function (n) {
        var d = new Date(this.getTime());
        d.setDate(d.getDate() + n);
        return d;
    }
});

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {

        var k;
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = +fromIndex || 0;
        if (Math.abs(n) === Infinity) {
            n = 0;
        }
        if (n >= len) {
            return -1;
        }
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (k in o && o[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}

if (!Array.isArray) {
    Array.isArray = function (arg) {
        //return b && b.length && b.push && Array.prototype == b.constructor.prototype;
        return arg && Object.prototype.toString.call(arg) === '[object Array]';
    };
}

$.extend(Array.prototype, {
    insert: function (index, item) {
        this.splice(index, 0, item);
    },
    each: function (iterator, context) {
        if (!context) context = this;
        if (this.length === +this.length) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (iterator.call(context, i, this[i], this) === false)
                    return false;
            }
        } else {
            for (var key in obj) {
                if (this.hasOwnProperty(key)) {
                    if (iterator.call(context, key, this[key], this) === false)
                        return false;
                }
            }
        }
    },
    removeAt: function (index) {
        if (isNaN(index) || index > this.length) { return false; }
        this.splice(index, 1);
        return this;
    },
    remove: function (itemOrCallback, context) {
        if (!itemOrCallback || this.length == 0) { return this; }
        if (typeof (itemOrCallback) == "function") {
            if (!context) context = this;
            for (var i = 0; i < this.length; i++) {
                if (itemOrCallback.call(context, i, this[i]) === true) {
                    this.splice(i, 1);
                    break;
                }
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == itemOrCallback) {
                    this.splice(i, 1);
                    break;
                }
            }
        }
        return this;
    },
    removeAll: function (itemOrCallback, context) {
        if (!itemOrCallback || this.length == 0) { return this; }
        if (typeof (itemOrCallback) == "function") {
            if (!context) context = this;
            for (var i = 0, n = this.length; i < n;) {
                if (itemOrCallback.call(context, i, this[i]) === true) {
                    this.splice(i, 1);
                    n--;
                } else {
                    i++;
                }
            }
        } else {
            for (var i = 0, n = this.length; i < n;) {
                if (this[i] == itemOrCallback) {
                    this.splice(i, 1);
                    n--;
                } else {
                    i++;
                }
            }
        }
        return this;
    },
    contains: function (itemOrFilter, context) {
        if (this.length == 0) return false;
        if (typeof (itemOrFilter) !== 'function') {
            return this.indexOf(itemOrFilter) > -1;
        }
        if (!context) context = this;
        for (var i = 0; i < this.length; i++) {
            if (itemOrFilter.call(context, i, this[i]) === true) {
                return true;
            }
        }
        return false;
    },
    firstOrDefault: function (filter, defaultValue, context) {
        if (this.length == 0) return defaultValue;
        if (typeof (filter) !== 'function') { return this[0]; }
        if (!context) context = this;
        for (var i = 0; i < this.length; i++) {
            if (filter.call(context, i, this[i]) === true) {
                return this[i];
            }
        }
        return defaultValue;
    },
    first: function (filter, context) {
        if (this.length == 0) return null;
        if (typeof (filter) !== 'function') { return this[0]; }
        if (!context) context = this;
        for (var i = 0; i < this.length; i++) {
            if (filter.call(context, i, this[i]) === true) {
                return this[i];
            }
        }
        return null;
    },
    lastOrDefault: function (filter, defaultValue, context) {
        if (this.length == 0) return defaultValue;
        if (typeof (filter) !== 'function') { return this[this.length - 1]; }
        if (!context) context = this;
        for (var i = this.length - 1; i >= 0; i--) {
            if (filter.call(context, i, this[i]) === true) {
                return this[i];
            }
        }
        return defaultValue;
    },
    last: function (filter, context) {
        if (this.length == 0) return null;
        if (!typeof (filter) !== 'function') { return this[this.length - 1]; }
        if (!context) context = this;
        for (var i = this.length - 1; i >= 0; i--) {
            if (filter.call(context, i, this[i]) === true) {
                return this[i];
            }
        }
        return null;
    },
    filter: function (filter, context) {
        var arr = [], item, r;
        if (this.length == 0 || typeof (filter) !== 'function') return arr;
        if (!context) context = this;
        for (var i = 0; i < this.length; i++) {
            item = this[i]
            r = filter.call(context, i, item);
            if (r == true) {
                arr.push(item);
            }
            else if (r = undefined) {
                break;
            }
        }
        return arr;
    },
    maps: function (iterator, context) {
        var arr = [], item, r;
        if (this.length == 0 || typeof (iterator) !== "function") return arr;
        if (!context) context = this;
        for (var i = 0; i < this.length; i++) {
            r = iterator.call(context, i, item = this[i]);
            if (r !== null) {
                arr.push(r);
            }
        }
        return arr;
    },
    sum: function (iterator, context) {
        var n = 0, item, r;
        if (this.length == 0) return NaN;
        if (typeof (iterator) !== "function") iterator = function (l, x) { return x; };
        if (!context) context = this;
        for (var i = 0; i < this.length; i++) {
            r = iterator.call(context, i, item = this[i]);
            if (r && typeof(r)=== "number") {
                n += r;
            }
        }
        return n;
    },
    min: function (iterator, context) {
        var n = Number.MAX_VALUE, item, r = 0;
        if (this.length == 0) return NaN;
        if (typeof (iterator) !== "function") iterator = function (l,x) { return x; };
        if (!context) context = this;
        for (var i = 0; i < this.length; i++) {
            r = iterator.call(context, i, item = this[i]);
            if (typeof (r) === "number" &&   r < n) {
                n =r;
            }
        }
        return n === Number.MAX_VALUE ? NaN : n;
    },
    max: function (iterator, context) {
        var n = Number.MIN_VALUE, item, r = 0;
        if (this.length == 0) return NaN;
        if (typeof (iterator) !== "function") iterator = function (l, x) { return x; };
        if (!context) context = this;
        for (var i = 0; i < this.length; i++) {
            r = iterator.call(context, i, item = this[i]);
            if (typeof (r) === "number" && r > n) {
                n = r;
            }
        }
        return n === Number.MIN_VALUE ? NaN : n;
    },
    group: function (propertyOrFunction, context) {
        var func = null, result = [];
        if (typeof propertyOrFunction == 'function') {
            func = propertyOrFunction;
        } else if (typeof (propertyOrFunction) == 'string') {
            func = function (i, item) {
                return item[propertyOrFunction];
            };
        } else {
            return result;
        }
        if (!context) context = this;
        var equal = Object.equal;
        var len = this.length, item, instance, key, type, find;
        for (var i = 0; i < len; i++) {
            item = this[i];
            key = func.call(context, i, item);
            type = typeof (key);
            find = false;
            for (var m = 0; m < result.length; m++) {
                instance = result[m];
                if (equal(instance.key, key)) {
                    instance.push(item);
                    find = true;
                    break;
                }
            }
            if (!find) {
                instance = [item];
                instance.key = key;
                result.push(instance);
            }
        }
        return result;
    },
    //进行迭代判定的函数,wangyunpeng
    foreach: function (fn) {
        fn = fn || Function.K;
        var a = [];
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < this.length; i++) {
            var res = fn.apply(this, [this[i], i].concat(args));
            if (res != null) a.push(res);
        }
        return a;
    },
    //得到一个数组不重复的元素集合,wangyunpeng
    uniquelize: function () {
        var ra = new Array();
        for (var i = 0; i < this.length; i++) {
            if (!ra.contains(this[i])) {
                ra.push(this[i]);
            }
        }
        return ra;
    }
});

//两个数组的交集,wangyunpeng
Array.intersect = function (a, b) {
    return a.uniquelize().foreach(function (o) {
        return b.contains(o) ? o : null;
    });
};
//两个数组的补集,wangyunpeng
Array.complement = function (a, b) {
    return Array.minus(Array.union(a, b), Array.intersect(a, b));
};
//两个数组的差集,wangyunpeng
Array.minus = function (a, b) {
    return a.uniquelize().foreach(function (o) {
        return b.contains(o) ? null : o;
    });
};
//两个数组的并集,wangyunpeng
Array.union = function (a, b) {
    return a.concat(b).uniquelize();
};

$.extend(String.prototype, {
    padLeft: function (len, char) {
        var temp = this, l = this.length;
        if (l >= len) return temp;
        char = char || ' ';
        while (++l <= len) temp = char + temp;
        return temp;
    },
    padRight: function (len, char) {
        var temp = this, l = this.length;
        if (l >= len) return temp;
        char = char || ' ';
        while (++l <= len) temp = temp + char;
        return temp;
    }
});









//fix jQuery 
(function (window, $) {
    var _errorFormat = function (message, errorStack) { return { Success: false, Data: null, Error: errorStack || new Array(message) || [], Message: message || "网络或服务器异常，请求失败，请您稍后重试！" } };
    //fix jQuery.get/post
    $.each(["get", "post"], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {
            // shift arguments if data argument was omitted
            if ($.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            if ((url.indexOf('?callback=?') > 0 || url.indexOf('&callback=?') > 0) && !type) {
                type = 'jsonp';
            }

            return $.ajax({
                type: method,
                url: url,
                data: data,
                success: callback,
                //contentType: "json",
                global: false,
                error: $.isFunction(callback) ? function (jqXHR, statusText, error) {
                    var i = this.dataTypes.length - 1;
                    var data = jqXHR.responseText;
                    while (i > -1) {
                        if (this.dataTypes[i] == "json") i = -9;
                        i--;
                    }
                    if (i == -10 || data[0] == "{" || data[0] == "[") {//可能是 json 字符串
                        try {
                            data = $.parseJSON(data);
                        } catch (_) {

                        }
                    } else if (data[0] == "<") { //可能是html
                        var htmlArray = $.parseHTML(data);
                        if (htmlArray.length > 0) {
                            for (var i in htmlArray) {
                                if (htmlArray[i].nodeName == "TITLE") {
                                    data = _errorFormat($(htmlArray[i]).text(), new Array(data));//
                                    break;
                                }
                            }
                        }
                    } else { //未知
                        data = _errorFormat(data, new Array(data));//
                    }
                    callback(data, statusText || error, jqXHR);
                } : null,
                dataType: type
            });
        };
    });


    $.fn["doX"] = function (func) {
        this.length && func && func.call(this);
        //if (this.length > 0 && $.isFunction(doFuncation))
        //    doFuncation.call(this, this);
        return this;
    };

    //$.fn.serializeObject = $.fn.fromData = function () {
    //    var g = {}, f = this.serializeArray()
    //    $.each(f, function (i, item) {
    //        g[item.name] = item.value;
    //    });
    //    return g;
    //};
    $.fn.serializeObject = function (options) {
        var data = {},
            items = $(this).find('select[name]:enabled,input[name]:enabled,textarea[name]:enabled'),
            isNumber = /^-?\d+(\.\d+)?$/,
            v,
            options = $.extend({}, options, { autoNumber: true, checkbox: 'join'/*array*/ })
        ;
        items.each(function (i, item) {
            var _item = $(item),
                name = _item.attr('name'),
                type = item.nodeName.toLowerCase() == "input" ? item.type : ""
            ;
            //debugger;
            switch (type) {
                case "checkbox":
                    if (items.filter("[name='" + name + "']").length > 1) {
                        if (item.checked && item.value) {
                            data[name] = (data[name] ? (data[name] + ",") : "") + item.value;
                        }
                    } else {
                        data[name] = !!item.checked;
                    }
                    break;
                case "radio":
                    if (item.checked) {
                        data[name] = _item.val() || true;
                    }
                    break;
                case "submit":
                case "button":
                    break;
                default:
                    v =$.trim( _item.val());
                    if (options.autoNumber && v && isNumber.test(v) && v.length<10) {
                        v = parseFloat(v);
                    }
                    data[name] = v;
                    break;
            }
        });
        return data;
    };
})(window, jQuery)








//fix easyui
if ($.fn.menu) {
    $.fn.menu.defaults.zIndex = 1000;
}
if ($.fn.combobox) {
    $.easyui.onLoadError = function (xhr, status, error) {
        if (xhr.Success !== undefined || xhr.Message !== undefined) {
            JQEUI.error(xhr.Message || (xhr.Error && xhr.Error[0]) || "网络或服务器异常，请求失败，请您稍后重试！");
            return;
        }
        if (xhr.status > 0 && xhr.status !== 404) {
            var text = xhr.responseText, msg;
            if (text) {
                if (/^\s+\</.test(text)) {
                    msg = /\[HttpException\]:([^\n\r]+)/i.exec(text);
                    //if (!msg) {
                    //    msg = /<div class="box-body".*?>\s*([^\n\r]+)/i.exec(text);
                    //}
                    if (!msg) {
                        msg = /<title>([^<]+)/i.exec(text);
                    }
                    if (msg) {
                        msg = msg[1];
                    }
                } else if (text.test(/^\s+{/)) {
                    msg = $.parseJSON(text);
                    msg = msg.Message || (msg.Error && msg.Error[0]) || "网络或服务器异常，请求失败，请您稍后重试！";
                }

                if (msg) {
                    JQEUI.error(msg);
                    return;
                }
            }
        }
        JQEUI.error(status);
    };

    $.fn.combobox.defaults.onLoadError = $.easyui.onLoadError;
    $.fn.tree.defaults.onLoadError = $.easyui.onLoadError;
    $.fn.datagrid.defaults.onLoadError = $.easyui.onLoadError;
}