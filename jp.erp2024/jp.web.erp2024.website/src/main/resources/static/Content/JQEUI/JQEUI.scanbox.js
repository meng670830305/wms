
(function (w, $, JQEUI) {
    if (!JQEUI) return;
    var _default = {
        excepts: null,
        selecter: null,
        autoClear: true,
        autoKeyDown: true,
        url: null,
        onLoadSuccess: null,
        onLoadError: null,
        onLoadBefore: null,
        data: null,
        dataType: "json"
    };


    var scanbox = function (options) {
        if (!options.selecter) { throw new TypeError("请设置selecter！"); }

        this._setting = $.extend({}, _default, options);
        this._$input = $(this._setting.selecter);
        this._timer = null;
        this._isLocked = false;
        this._color = null;
        this._excepts = this._setting.excepts;

        if (this._$input.length != 1 || this._$input.is("input:text") === false) throw new TypeError("selecter必须是文本框！");

        if (this._setting.autoKeyDown) {
            this._$input.keypress(this, function (e) {
                if (e.keyCode === 13) {
                    var value = $(this).val();
                    if (!value || value.length == 0) return;
                    e.data.match(value);
                }
            }).keyup(this, function (e) {
                if (
                    e.keyCode === 46 //Delete
                    || e.keyCode === 27 //Esc
                    ) {
                    e.data.clear();
                }
            });
        }

        var self = this;
        $(window).focus(function () {
            self._focus();
        }).blur(function () {
            self._timer && (this._timer = window.clearInterval(self._timer));
        });
        if (this._excepts) {
            for (var i = 0; i < this._excepts.length; i++) {
                $(this._excepts[i]).on({
                    focus: function () {
                        self._timer && (self._timer = window.clearInterval(self._timer));
                    },
                    blur: function () {
                        self._focus();
                    }
                });
            }
        }
        this._focus();
    };
    var _errorFormat = function (message, errorStack) { return { Success: false, Data: null, Error: errorStack || new Array(message) || [], Message: message || "网络或服务器异常，请求失败，请您稍后重试！" } };

    scanbox.fn = scanbox.prototype = {
        match: function (number) {
            if (!number) return;
            number = number.replace(/\s+/g, "");
            if (number !== this._$input.val()) {
                this._$input.val(number);
            }
            if (!number || number.length == 0) return;
            this.lock();
            if ($.isFunction(this._setting.onLoadBefore)) {
                var r = this._setting.onLoadBefore.call(this, this._setting, number);
                if (r === false) return;
            }
            var args = { autoUnlock: true, autoClear: true, 'number': number };
            //brfore->success->complete
            //brfore->error->complete
            JQEUI.wait("处理中...");
            $.ajax({
                type: "POST",
                context: this,
                url: this._setting.url,
                data: this._setting.data,
                dataType: this._setting.dataType,
                success: function (data) {
                    this._hock(data || "数据错误！", args);
                    JQEUI.wait(null);
                },
                error: function (xhr, error, statusText) {
                    var data = xhr.responseText || xhr.statusText;
                    if (data[0] == "{" || data[0] == "[") {//可能是 json 字符串
                        try {
                            data = $.parseJSON(data);
                        } catch (e) {
                            //alert(e);
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
                    }
                    this._hock(data, args);
                    JQEUI.wait(null);
                },
                complete: function (xhr) {
                    if (args.autoUnlock === true)
                        this.unlock();
                    if (args.autoClear === true)
                        this.clear();
                }
            });
        },
        info: function (info) {
            this._$input.attr("placeholder", info);
        },
        error: function (msg) {
            this._color = "#f00";
            //this._$input.css("background-color", "#f00");
            JQEUI.error(msg || "发生未知错误！");
            return this;
        },
        clear: function () {
            //this._color = "#fff";
            this._$input.val("");
            return this;
        },
        reset: function () {
            this.clear();
            this._$input.css("background-color", "#fff").removeAttr("disabled").focus();
        },
        setColor: function (color) {
            debugger;
            this._$input.css("background-color", color);
        },
        lock: function () {
            if (this._isLocked == false) {
                this._isLocked = true;
                this._timer = window.clearInterval(this._timer);
                this._color = "#F3EA63";
                this._$input.attr("disabled", "disabled").css("background-color", this._color).blur();
            }
            return this;
        },
        unlock: function () {
            if (this._isLocked == true) {
                this._isLocked = false;
                this._$input.removeAttr("disabled")/*.css("background-color", "#fff")*/.focus();
                if (this._color == "#F3EA63") {//锁定色
                    this._$input.css("background-color", "#fff");
                } else {
                    this._$input.css("background-color", this._color);
                }
                this._focus();
            }
            return this;
        },
        getValue: function () {
            return this._$input.val();
        },
        _focus: function () {
            var self = this;
            if (self._isLocked) return;
            self._timer && window.clearInterval(self._timer);
            self._timer = window.setInterval(function () {
                self._$input.focus();
            }, 2000);
        },
        _hock: function (data, args) {
            if (/*!!data &&*/ $.isPlainObject(data)) {
                if (data.Success == true && data.Data != undefined) {
                    //this._$input.css("background-color", "#0f0");
                    this._color = "#0f0";
                    if ($.isFunction(this._setting.onLoadSuccess)) {
                        try {
                            this._setting.onLoadSuccess.call(this, data.Data || null, args);
                        } catch (e) {
                            //alert(e);
                        }
                    }
                    return;
                }
            }
            this.error(data.Message || data);
            if ($.isFunction(this._setting.onLoadError)) {
                try {
                    this._setting.onLoadError.call(this, data.Data || data, args);
                } catch (e) {
                    //alert(e);
                }
            }
        }
    };

    JQEUI.extend({
        scanbox: function (options) {
            return new scanbox(options || {});
        }
    });
})(window, jQuery, JQEUI);
