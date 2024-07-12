/************************************************************************
 * JQEUI Library
 *
 * Licensed under the GPL or commercial licenses.
 * To use it on other terms please contact us: sunliang23456@126.com
 * 
 * 可自由使用和复制,但请保留以上版权信息.
 ************************************************************************/
;

(function (window, $) {

    var _export = {}, easyUIVersion = window.easyUI ? window.easyUI.version : '1.5.0',
    dataFormatter = function (fwt) {
        return function (value, row, index) {
            //return (!value || value == "/Date(-62135596800000)/") ? "" : /^\/Date/.test(value) ? eval(value.replace(/\/Date\((\d+)\)\//gi, "new Date($1)")).format(fwt) : value;
            //if (!value || value == "/Date(-62135596800000)/")
            //    return "";
            //value = value.indexOf("+") > -1 ? "/Date(" + value.slice(6, 19) + ")/" : value;
            return /^\/Date/.test(value) ? eval(value.replace(/\/Date\((.*?)\)\//gi, "new Date($1)")).format(fwt) : value;
        }
    }, aop = function (func, proxyObject, context) {
        var funcAop = proxyObject;
        var proxy = function () {
            var r = { args: arguments, returnValue: undefined, error: undefined, context: context || this, func: func, stop/*是否阻止运行*/: false };
            try {
                !r.stop && funcAop.before && funcAop.before.call(r.context, r);
                !r.stop && func && (r.returnValue = func.apply(r.context, arguments));
                !r.stop && funcAop.after && funcAop.after.call(r.context, r);
            } catch (e) {
                r.error = e;
                funcAop.error && funcAop.error.call(r.context, r);
            }
            funcAop.complete && funcAop.complete.call(r.context, r);
            return r.returnValue;
        };
        proxy.toString = function () {
            return "{Proxy}\r\n{\r\n"
                    + "\tfunc: " + (func || "null").toString().replace(/\s+/g, ' ') + ",\r\n"
                    + "\tbefore: " + (proxyObject.before || "null").toString().replace(/\s+/g, ' ') + ",\r\n"
                    + "\tafter:" + (proxyObject.after || "null").toString().replace(/\s+/g, ' ') + ",\r\n"
                    + "\terror:" + (proxyObject.error || "null").toString().replace(/\s+/g, ' ') + ",\r\n"
                    + "\tcomplete:" + (proxyObject.complete || "null").toString().replace(/\s+/g, ' ') + "\r\n"
                + "}";
        };
        return proxy;
    }, cache = {
        _: {},
        each: function (func) {
            if (typeof (func) != 'function') return;
            $.each(this._, function (i, item) {
                func.call(item, i, item);
            });
        },
        set: function (key, value) {
            return this._[key] = value;
        },
        get: function (key) {
            if (this._.hasOwnProperty(key)) return this._[key];
            return null;
        },
        pop: function (key) {
            var data = this.get(key);
            delete this._[key];
            return data;
        }
    };
    //
    _export.aop = aop;
    _export.cahce = function (methods) {
        switch (methods) {
            case 'each':
            case 'set':
            case 'get':
            case 'pop':
                return cache[methods].apply(cache, Array.prototype.slice.call(arguments, 1));
        }
        if (arguments.length == 1) return cache.get(arguments[0]);
        if (arguments[1] == null) {
            return cache.pop(arguments[0]);
        }
        return cache.set(arguments[0], arguments[1]);
    };
    _export.extend = function (value) {
        for (var i = 0; i < arguments.length; i++) {
            $.extend(true, _export, arguments[i]);
        }
        return _export;
    };

    //跨域探测
    _export.CORS = true;
    try { _export.CORS = !(top.location.host == self.location.host); }
    catch (e) { _export.CORS = false; }


    //dialog
    $.extend(_export, {
        dialog: function (options) {
            options = $.extend({}, {
                buttons: null, shadow: false, closed: true, timeout: false, iframe: true, modal: true, position: 'center', top: undefined, left: undefined
            }, options);
            var dig = $('<div></div>').appendTo(options.locale ? options.locale : "body"), iframe, debugName;
            if (options.locale) {
                options.inline = true;
            }
            if (options.iniframe) {
                options.iframe = true; options.iniframe = undefined;
            }
            if (typeof (options.width) == 'string' && options.width.indexOf('%') > 0) {
                options.width = $(window).width() * parseFloat(options.width.replace('%', '')) / 100;
            }
            if (typeof (options.height) == 'string' && options.height.indexOf('%') > 0) {
                options.height = $(window).height() * parseFloat(options.height.replace('%', '')) / 100;
            }
            if (options.href && options.iframe) {
                dig.addClass('window-iframe');
            }
            var timeout = options.timeout, _timerID, _timer;
            if (typeof (timeout) === "number" && timeout > 0) {
                _timer = function () {
                    _timerID = setTimeout(function () {
                        if (dig.length && dig.data("dialog")) {
                            dig.dialog("close");
                        }
                    }, timeout);
                };
                options.onOpen = aop(options.onOpen, {
                    after: function (ctx) {
                        dig.dialog("dialog").hover(function () {
                            clearTimeout(_timerID);
                        }, function () {
                            _timer();
                        });
                    }
                });
                options.onClose = aop(options.onClose, {
                    after: function (ctx) {
                        if (_timerID) {
                            clearTimeout(_timerID);
                        }
                    }
                });
            }
            if (options.autoDestroy == undefined || options.autoDestroy) {
                options.onClose = aop(options.onClose, {
                    after: function (ctx) {
                        dig.dialog("destroy");
                    }
                });
            }
            if (options.iframe) {
                options.onLoad = aop(options.onLoad, {
                    before: function (ctx) {
                        iframe = dig.children('iframe');
                    }
                });
            }
            if (options.buttons) {
                $.each(options.buttons, function () {
                    var handler = this.handler || this.click;
                    if ($.isFunction(handler)) {
                        this.handler = function () {
                            handler.call(dig, dig, iframe ? iframe[0] : undefined); return false;
                        };
                    }
                });
            }
            dig.dialog(options);
            //options = dig.dialog("options");
            //if (easyUIVersion == '1.3.3') {
            //    dig.panel('header').addClass(options.headerCls);
            //    dig.window('window').addClass(options.cls);
            //}
            var position = {};
            if (options.position) {
                var d = dig.dialog('dialog'), offsetW, offsetH, timerID, kp = function () {
                    offsetW = $(window)._outerWidth() - d.width(), offsetH = $(window)._outerHeight() - d.height()
                    switch (options.position) {
                        case 'topLeft': position = { left: 5, top: 5 }; break;
                        case 'topCenter': position = { left: Math.ceil(offsetW / 2), top: 5 }; break;
                        case 'topRight': position = { left: offsetW - 5, top: 5 }; break;
                        case 'centerLeft': position = { left: 10, top: Math.ceil(offsetH / 2) }; break;
                            //case 'center': style = { left: Math.ceil(offsetW / 2), top: Math.ceil(offsetH / 2) }; break;
                        case 'centerRight': position = { left: offsetW - 10, top: Math.ceil(offsetH / 2) }; break;
                        case 'bottomLeft': position = { left: 10, top: offsetH - 10 }; break;
                        case 'bottomCenter': position = { left: Math.ceil(offsetW / 2), top: offsetH - 10 }; break;
                        case 'bottomRight': position = { left: offsetW - 10, top: offsetH - 10 }; break;
                        default: position = { left: Math.ceil(offsetW / 2), top: Math.ceil(offsetH / 2) }; break;
                    }
                }, resize = function () {
                    if (timerID) clearTimeout(timerID);
                    timerID = setTimeout(function () {
                        kp();
                        dig.dialog('move', position);
                    }, 100);
                };
                dig.panel("options").onClose = aop(options.onClose, {
                    before: function (ctx) {
                        clearTimeout(timerID);
                        $(window).off("resize", resize);
                    }
                });
                $(window).on("resize", resize);
                kp();
            } else {
                position = {
                    left: options.left || Math.ceil(($(window)._outerWidth() - options.width) / 2),
                    top: options.top || Math.ceil(($(window)._outerHeight() - options.height) / 2)
                };
            }
            dig.dialog('move', position).dialog('open');
            if (timeout > 0) {
                _timer();
            }
            return dig;
        },
        show: function (content, title, icon, position, timeout) {
            if (!_export.CORS && top != self) {
                try {
                    return top.JQEUI.show(content, title, icon, position, timeout);
                } catch (e) {
                }
            }
            if (typeof (timeout) != 'number') timeout = 0;
            return JQEUI.dialog({
                modal: false,
                width: 300,
                height: 'auto',
                timeout: timeout,
                minHeight: 50,
                title: title || '提示',
                position: position,
                cls: 'messager-window',
                bodyCls: 'messager-body',
                headerCls: 'messager-header',
                content: '<div class="' + (icon ? 'messager-icon messager-' + icon : '') + '"></div><div>' + content.replace(/\r\n|\n/g, '<br/>') + '</div><div style="clear:both;"/>'
            });
        },
        alert: function (content) {
            return this.show(content, '系统消息', null, arguments[1] || 'center', 0);
        },
        error: function (content) {
            return this.show(content, '错误', 'error', arguments[1] || 'bottomRight', 8000);
        },
        info: function (content) {
            return this.show(content, '提示', 'info', arguments[1] || 'bottomRight', 8000);
        },
        warn: function (content) {
            return this.show(content, '警告', 'warning', arguments[1] || 'center', 0);
        },
        confirm: function (content, callback) {
            if (!_export.CORS && top != self) {
                try {
                    return top.JQEUI.confirm(content, callback);
                } catch (e) {
                }
            }
            return JQEUI.dialog({
                width: 300,
                iframe: false,
                title: "请确认",
                cls: 'messager-window',
                bodyCls: 'messager-body',
                headerCls: 'messager-header',
                content: '<div class="messager-icon messager-question"></div><div>' + content + '</div><div style="clear:both;"/>',
                buttons: [{
                    text: '确定',
                    iconCls: 'icon-ok',
                    handler: function () {
                        callback.call(this, true);
                        this.dialog('close');
                    }
                }, {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        callback.call(this, false);
                        this.dialog('close');
                    }
                }]
            });
        },
        waited: false,
        wait: function (content) {
            if (arguments.length == 0) {//state
                return this.waited;
            }
            if (!content) {//hide
                var locale = cache.pop('wait');
                if (locale) {
                    locale.mask.parent().removeClass("mask-container");
                    locale.mask.remove();
                    locale.msg.remove();
                }
                this.waited = false;
            } else {//show
                var opts = { content: content, locale: "body" };
                var locale = $(opts.locale).addClass("mask-container");
                var mask = $("<div></div>").addClass("datagrid-mask").addClass("fixed").css({ display: "block", "z-index": $.fn.window.defaults.zIndex++ }).appendTo(locale);
                var msg = $("<div></div>").addClass("datagrid-mask-msg").addClass("fixed").css({ display: "block", left: "50%", "z-index": $.fn.window.defaults.zIndex++, height: "auto" }).html(opts.content).appendTo(locale);
                msg.css("marginLeft", -msg.outerWidth() / 2);
                cache.set('wait', {
                    mask: mask, msg: msg
                });
                this.waited = true;
                return mask.add(msg);
            }
        },
        open: function (url, target, data) {
            var a = document.createElement("a");
            if (typeof (target) == "object") {
                data = target;
                target = undefined;
            }
            if (data) {
                var q = "";
                $.each(data, function (i, item) {
                    q += i + "=" + encodeURIComponent(item) + "&";
                });
                q = q.substring(0, q.length - 1);
                if (url.indexOf('?') > 0) {
                    url = url + "&" + q;
                } else {
                    url = url + "?" + q;
                }
            }
            a.href = url; //下载地址
            a.target = target || '_blank';

            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
            }, 0);
        }
    });

    //tools
    $.extend(_export, {
        filterSerialize: function (selecter, filterData) {
            if (!filterData) filterData = {};
            $(document.body).focus();
            $(selecter).find('[data-filter]').each(function (index, item) {
                var _it = $(item),
                    filterKey = _it.attr("data-filter"),
                    current = _it.find(".active:first,.filter-form"),
                    parser = _it.attr("data-parser"),
                    value = null
                ;
                if ((parser = current.attr("data-parser"))) {
                    value = JQEUI.filterParser[parser].call(current, current);
                } else if ((parser = _it.attr("data-parser"))) {
                    value = JQEUI.filterParser[parser].call(_it, _it);
                } else if ((parser = current.attr("data-value"))) {
                    value = eval("(" + current.attr("data-value") + ")");
                } else {
                    return true;
                }
                filterData[filterKey] = $.extend(filterData[filterKey], value);
            });
            return filterData;
        },
        filterParser: {
            "compareNumberFilterParser": function (e) {
                if (!e.length) return { Value: null };
                e = parseFloat(e.find("input[name=Value]").val());
                if (e == NaN) e = null;
                return { Value: e };
            },
            "compareBoolFilterParser": function (e) {
                if (!e.length) return { Value: null };
                e = e.find("input[name=Value]").val();

                if (e == "true" || e == "1") e = true;
                else if (e == "false" || e == "0") e = false;
                else e = null;
                return { Value: e };
            },
            "anyNumberFilterParser": function (e) {
                if (!e.length) return { Value: null };
                e = $.trim(e.find("input[name=Value]").val()).split(/[^\d]+/g).map(function (i, item) {
                    return parseFloat(item) || null;
                });
                if (!e || e.length == 0) e = null;
                return { Value: e };
            },
            "likeFilterParser": function (e) {
                if (!e.length) return { Value: null };
                return { Value: e.find("input[name=Value]").val() || null };
            },
            "delimiterFieldFilterParser": function (e) {
                if (!e.length) return { Value: null };
                return { Value: [e.find("input[name=Value]").val() || null] };
            },
            "rangeTimeFilterParser": function (e) {
                if (!e.length) return null;
                var start = e.find("input[name=StartValue]").val(),
                 end = e.find("input[name=EndValue]").val(),
                 now = new Date().format("yyyy-MM-dd ");

                return { StartValue: start == "" ? null : now + start + ":00", EndValue: end == "" ? null : now + end + ":00" };
            },
            "rangeDateTimeFilterParser": function (e) {
                if (!e.length) return null;
                var start = e.find("input[name=StartValue]").val(),
                 end = e.find("input[name=EndValue]").val()
                ;

                return { StartValue: start == "" ? null : start, EndValue: end == "" ? null : end };
            },
            "rangeDateFilterParser": function (e) {
                if (!e.length) return null;
                var start = e.find("input[name=StartValue]").val(),
                 end = e.find("input[name=EndValue]").val()
                ;
                //console.log(start);
                return { StartValue: start == "" ? null : start + " 00:00:00", EndValue: end == "" ? null : end + " 23:59:59" };
            },
            "rangeNumberFilterParser": function (e) {
                if (!e.length) return null;
                var start = e.find("input[name=StartValue]").val(),
                 end = e.find("input[name=EndValue]").val();
                return { StartValue: parseFloat(start) || null, EndValue: parseFloat(end) || null };
            },
            "idFilterParser": function (e) {
                if (!e.length) return null;
                var v = e.find("input[name=Value]").val();
                if (v.length >= 15) v = v.substring(1).replace(/^0+/g, '');
                return {
                    Value: parseFloat(v) || null
                };
            }
        },
        api: function (url, data, success, error) {
            if (JQEUI.waited) return;
            if (success !== false && typeof (success) !== 'function')
                success = function () {
                    return true;
                };
            if (!JQEUI.waited) {
                JQEUI.wait("请稍后,正在提交数据...");
            }
            //if (error == undefined) error = success;
            return $.post(url, data, function (json) {
                if (JQEUI.waited) {
                    JQEUI.wait(null);
                }
                if (!json || json.Success == undefined) {
                    _export.error("提交数据失败!");
                    error && error.call(_export, json, false);
                    return;
                }
                else if (!json.Success) {
                    _export.error(json.Message || '提交数据失败!');
                    error && error.call(_export, json, false);
                    return;
                }
                _export.info(json.Message || '操作成功!');
                success && success.call(_export, json, true);
            });
        },
        jsonDate: function (value) {
            return value ? eval(value.replace(/\/Date\((\d+)\)\//gi, "new Date($1)")) : new Date(0);
        },
        //url函数
        getUrlParam: function (url, name) {
            if (!name) {
                name = url; url = null;
            }
            var reg = new RegExp("(\\?|&)" + name + "=([^&]*)(&|$)", "i");
            var r = (url || window.location.search).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        getUrlObject: function (url) {
            var arr = [], q = url || window.location.search, qs = {}, re = /(?:\?|&)([^&#=]+)=([^&#]+)/ig;
            while ((arr = re.exec(q)) != null) {
                qs[arr[1]] = unescape(arr[2] || "");
            }
            return qs;
        }
    });

    //ui
    $.extend(_export, {
        fullScreen: {
            supports: !!document.cancelFullScreen || !!document.webkitCancelFullScreen || !!document.mozCancelFullScreen || !!document.oCancelFullScreen || !!document.msCancelFullScreen || false,
            cancel: function (elem) { (document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen).call(elem || document); },
            request: function (elem) { (document.documentElement.requestFullScreen || document.documentElement.webkitRequestFullScreen || document.documentElement.mozRequestFullScreen || document.documentElement.oRequestFullScreen || document.documentElement.msRequestFullScreen).call(elem || document.documentElement); },
            isFullScreen: function () { return document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.oFullScreen || document.msFullScreen || false; }
        },
        ui: {
            reset: function (selecter) {
                $(selecter).find('.combo-f,.textbox-f,input[name]').each(function (i, item) {
                    var it = $(this);
                    if (it.data('combo')) {
                        it.combo('reset').combo('clear');
                    }
                    else if (it.data('textbox')) {
                        it.textbox('reset').textbox('clear');
                    } else {
                        it.val('');
                    }
                });
            },
            category: function (selecter, changeCallback, allowParent, allowRoot) {
                var ctl = $(selecter), _changeCallback = changeCallback || function (data) {
                    $(this).trigger("categoryChange", data);
                };
                allowParent = allowParent || false;
                return ctl.tree({
                    lines: true,
                    url: '/Api/Common/CategoryTreeLayerData',
                    queryParams: { "ParentID": 0 },
                    toggleOnClick: false,
                    formatter: function (node) {
                        return node.text + "&nbsp;&nbsp;<span style='color:#999'>[" + node.id + "]</span>";
                    },
                    onBeforeLoad: function (node, param) {
                        if (!node || !param) {
                            return;
                        }
                        if (!allowParent && !node.attributes.hasChildren) {
                            return false;
                        }
                        param.ParentID = node.id;
                    },
                    onBeforeSelect: function (node) {
                        if (node.id === 0 && !allowRoot) {
                            return false;
                        }
                        else if (node.id !== 0 && !allowParent && node.attributes.hasChildren) {
                            return false;
                        }
                        return true;
                    },
                    onClick: function (node) {
                        if (node.id === 0 && !allowRoot) {
                            return false;
                        }
                        else if (node.id !== 0 && !allowParent && node.attributes.hasChildren) {
                            return false;
                        }
                        var parents = [node.text], _this = $(this);
                        var n = _this.tree("getParent", node.target);
                        while (n && n.id) {
                            parents.push(n.text);
                            n = _this.tree("getParent", n.target);
                        }
                        parents.reverse();
                        parents = parents.join(' » ');
                        //ctl.combo("setText", parents);
                        _changeCallback.call(this, {
                            id: node.id, path: parents, name: node.text, hasChildren: node.attributes.hasChildren
                        });
                    }
                });
            },
            category2: function (selecter, changeCallback, onlyLeafChecked) {
                var ctl = $(selecter), _changeCallback = changeCallback || function (data) {
                    $(this).trigger("categoryChange", data);
                }, timer = null, searcher, clear = function () {
                    ctl.find(".tree-node-hidden").removeClass('tree-node-hidden');
                };
                onlyLeafChecked = onlyLeafChecked || true;
                ctl.tree({
                    lines: true,
                    url: '/Api/Common/CategoryTreeData',
                    queryParams: { "ParentID": 0 },
                    toggleOnClick: false,
                    filter: function (q, node) {
                        //if (q=='_$_') return true;
                        return node.text.indexOf(q) >= 0 || node.id == q;
                    },
                    checkbox: function (node) {
                        if (",0,1,11,28,55,129,146,305,342,361,501,638,819,1092,1153,1372,1442,1606,1783,1991,".indexOf(',' + node.id + ',') > -1) {
                            return false;
                        }
                        return true;
                    },
                    formatter: function (node) {
                        return node.text + "&nbsp;&nbsp;<span style='color:#999'>[" + node.id + "]</span>";
                    },
                    //onBeforeCheck: function (node,checked) {
                    //    if (node.id === 0 && !allowRoot) {
                    //        return false;
                    //    }
                    //    else if (node.id !== 0 && !allowParent && node.attributes.hasChildren) {
                    //        return false;
                    //    }
                    //    return true;
                    //},
                    onCheck: function (node) {
                        if (node.id === 0) {
                            return false;
                        }
                        if (timer) timer = clearTimeout(timer);
                        setTimeout(function () {
                            var nodes = ctl.tree('getChecked');	// get checked and indeterminate nodes

                            if (onlyLeafChecked) {
                                nodes = nodes.map(function (i, n) {
                                    return (n.attributes && n.attributes.hasChildren) ? null : n;
                                });
                            }

                            _changeCallback.call(this, {
                                items: nodes,
                                ids: nodes.map(function (i, n) { return n.id }),
                                length: nodes.length,
                            });
                        }, 800);
                    }
                }).css({
                    "position": "absolute",
                    "width": "100%",
                    "top": "34px",
                    "left": "0",
                    "right": "0",
                    "bottom": "0",
                    "overflow": "auto",
                    "border-top": "solid 1px #d3d3d3"
                });
                searcher = $('<input type="text" style="width:100%" name="treeSearch"/>').appendTo(ctl.parent()).searchbox({
                    prompt: "搜索ID/名称...",
                    searcher: function (value) {
                        setTimeout(function () {
                            if (value) {
                                ctl.tree('doFilter', value);
                            } else {
                                clear();
                            }
                            //ctl.tree('doFilter', value || '_$_');

                        });
                    },
                    icons: [{
                        iconCls: 'icon-clear',
                        handler: function (e) {
                            searcher.searchbox("clear");
                            clear();
                            return false;
                        }
                    }]
                });
                searcher.searchbox("textbox").closest('.searchbox').attr("style", "width: 100%;height: 30px;margin-top: 2px;border: none !important;box-shadow: none !important;");

                return ctl;
            }
        }
    });

    //easyui-control
    $.extend(_export, {
        grid: {
            booleanFormatter: function (value, row, index) {
                return value == true ? "<code style='color:#216500'>是</code>" : "<code  style='color:#CC0000'>否</code>";
            },
            enableFormatter: function (value, row, index) {
                return value == true ? "<code style='color:#216500'>启用</code>" : "<code  style='color:#CC0000'>禁用</code>";
            },
            specificationFormatter: function (value, row, index) {
                return (!value) ? "" : value.replace("&", "<br/>");
            },
            newlineFormatter: function (value, row, index) {
                return (!value) ? "" : value.replace("\r\n", "<br/>");
            },
            wraplineFormatter: function (value, row, index) {
                return '<div style="word-wrap: break-word;word-break:break-all;white-space: normal;">' + (value || '') + '</div>'
            },
            dateFormatter: dataFormatter("yyyy-MM-dd"),
            datetimeFormatter: dataFormatter("yyyy-MM-dd hh:mm:ss"),
            timeFormatter: dataFormatter("hh:mm:ss"),
            timespanFormatter: function (value, row, index) {
                var day = (value / (24 * 60 * 60)).toFixed(0).toString();
                var hour = ((value - day * (24 * 60 * 60)) / (60 * 60)).toFixed(0).toString();
                var second = ((value - day * (24 * 60 * 60) - hour * (60 * 60)) / 60).toFixed(0).toString();
                return day + "天" + ("00" + hour).substr(hour.length, 2) + "时" + ("00" + second).substr(second.length, 2) + "分";
            },
            exchangeRateFormatter: function (value, row, index) {
                if (value === null || value === undefined || isNaN(value)) {
                    return ""
                }
                return value.toFixed(2);
            },
            moneyColorfulFormatter: function (value, row, index) {
                if (value == null || value == undefined) {
                    return ""
                }
                value = value + 0.00;
                if (value >= 0) {
                    return "<span style='color:#00f'>" + value.toFixed(2) + "</span>";
                } else {
                    return "<span style='color:#f00'>" + value.toFixed(2) + "</span>";
                }
            },
            moneyFormatter: function (value, row, index) {
                if (value === null || value === undefined || isNaN(value)) {
                    return ""
                }
                value = value + 0.00;
                return value.toFixed(2);
            },
            percentFormatter: function (value, row, index) {
                if (value === null || value === undefined || isNaN(value)) {
                    return ""
                }
                value = value * 100 + 0.00;
                return value.toFixed(2) + "%";
            },
            money4Formatter: function (value, row, index) {
                if (value === null || value === undefined || isNaN(value)) {
                    return ""
                }
                return value.toFixed(4);
            },
            weightFormatter: function (value, row, index) {
                if (value === null || value === undefined || isNaN(value)) {
                    return ""
                }
                return value.toFixed(0);
            }
        }
    });

    //
    window.JQEUI = _export;
})(window, jQuery);

var _numberRule = function (prefix, regexOrFunction, format) {
    var self = this;
    this.prefix = prefix;
    this._format = format || function (value) { if (!value) return ""; value = "0000000000" + String(value); return self.prefix + "-" + value.substr(value.length - 9, 9); };
    this._regex = regexOrFunction;
};

$.extend(_numberRule.prototype, {
    //验证
    verify: function (value) {
        if (!value) {
            return false;
        }
        else if (this._regex instanceof RegExp) {
            return this._regex.test(value);
        }
        else if (typeof (this._regex) == 'function') {
            return this._regex.call(this, value) === true;
        }
    },
    //格式化失败返回 null
    getValue: function (input) {
        if (!input) {
            return null;
        }
        input = $.trim(input);
        if (this._regex instanceof RegExp) {
            var mm = this._regex.exec(input);
            return (!!mm) ? mm[1] : null;
        }
        else if (typeof (this._regex) == 'function') {
            return this._regex.call(this, input) || null;
        }
        return null;
    },
    toNumber: function (value) {
        return this._format.call(this, value);
    }
});
var rule = {
    采购单号: new _numberRule("CG", /^CG-(\d+)$/i),
    收货单号: new _numberRule("SH", /^SH-(\d+)$/i),
    退换单号: new _numberRule("TH", /^TH-(\d+)$/i),
    入库单号: new _numberRule("RK", /^RK-(\d+)$/i),
    //出库单号: new _numberRule("CK", /^CK-(\d+)$/i),
    拣货单号: new _numberRule("JH", /^JH-(\d+)$/i),
    原包裹编号: new _numberRule("BG", /^BG-(\d+)$/i),
    包裹编号: new _numberRule("BG", /^BG-([0-9a-zA-Z]{5})$/i),
    线下包裹编号: new _numberRule("OL", /^OL-([0-9a-zA-Z]{5})$/i),
    物流单号: new _numberRule("WL", /^([A-Za-z0-9]{9,})$/i, function (value) { if (!value) return ""; return value; }),
    货位编号: new _numberRule("HW", /^HW-(\d+)$/i),
    物品编号: new _numberRule("WP", /^WP-([0-9a-zA-Z]{6})$/i),
    原物品编号: new _numberRule("WP", /^WP-(\d+)$/i),
    //重量数值: new _numberRule("ZL", /^([1-9]\d{0,4})|([1-9]\d{0,4}\.[0-9]{1,2})$/i, function (value) { if (!value) return ""; return value; }),
    重量数值: new _numberRule("ZL", /^\d{0,6}$/i, function (value) { if (!value) return ""; return value; }),
    规格编号: new _numberRule("SKU", /^SKU-(\d+)$/i),
    原囤货规格编号: new _numberRule("SKU", /^SKU-(\d+)\(TH?(\d+?)\)$/i),
    囤货规格编号: new _numberRule("SKU", /^SKU-([0-9a-zA-Z]{6})-([?<num>\d+]{3})-([0-9a-zA-Z]{4})$/i),
    出库单号: new _numberRule("CK", /^CK-(\d+)$/i),
    盘货单号: new _numberRule("PH", /^PH-(\d+)$/i),
    囤货单号: new _numberRule("KC", /^KC-(\d+)$/i),
    数字: new _numberRule("@N", /^(<num>\d+)$/i),
    库位编号: new _numberRule("HW", /^HW-([0-9]{2})-([0-9]{2})-([0-9]{2})-([0-9]{2})-([0-9]{3})$/i),
    海外仓编号: new _numberRule("SKU", /^SKU-([0-9a-zA-Z]{6})-([0-9]{1})$/i),
    亚马逊囤货规格编号: new _numberRule("platSKU", /^([a-zA-Z]{1})[0-9a-zA-Z]{9}$/i)
};
JQEUI.extend({
    NUMBER_RULE: rule,
    NUMBER_RULE_PREFIX: {},
    NUMBER_FORMATER: {}
});
var item = null;
for (var name in rule) {
    item = JQEUI.NUMBER_RULE[name];
    JQEUI.NUMBER_RULE_PREFIX[name] = item.prefix;
    JQEUI.NUMBER_FORMATER[name] = item._format;
}