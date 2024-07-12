/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI menu Extensions 1.0 beta
* jQuery EasyUI menu \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.menu.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-08-24
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/

/*
\u529F\u80FD\u8BF4\u660E\uFF1A
*/
(function ($, undefined) {

    /**
    * initialize the target menu, the function can be invoked only once
    */
    function init(target) {
        var t = $(target).appendTo('body').addClass('menu-top');

        $(document).unbind('.menu').bind('mousedown.menu', function (e) {
            var allMenu = $('body>div.menu:visible');
            var m = $(e.target).closest('div.menu', allMenu);
            if (m.length) { return }
            $('body>div.menu-top:visible').menu('hide');
        });

        var menus = splitMenu(t);
        for (var i = 0; i < menus.length; i++) { createMenu(menus[i]); }

        function splitMenu(menu) {
            var menus = [];
            menu.addClass('menu');
            menus.push(menu);
            if (!menu.hasClass('menu-content')) {
                menu.children('div').each(function () {
                    var submenu = $(this).children('div');
                    if (submenu.length) {
                        submenu.insertAfter(target);
                        this.submenu = submenu; 	// point to the sub menu
                        var mm = splitMenu(submenu);
                        menus = menus.concat(mm);
                    }
                });
            }
            return menus;
        }

        function createMenu(menu) {
            var width = $.parser.parseOptions(menu[0], ['width']).width;
            if (menu.hasClass('menu-content')) {
                menu[0].originalWidth = width || menu._outerWidth();
            } else {
                menu[0].originalWidth = width || 0;
                menu.children('div').each(function () {
                    var item = $(this);
                    if (item.hasClass('menu-sep')) {
                        //item.html('&nbsp;');
                    } else {
                        //var itemOpts = $.extend({}, $.parser.parseOptions(this, ['name', 'iconCls', 'href']), {
                        //  \u6CE8\u91CA\u6389\u4E0A\u4E00\u884C\u4EE3\u7801\uFF0C\u5E76\u6DFB\u52A0\u4E86\u4E0B\u4E00\u884C\u4EE3\u7801\uFF0C\u4EE5\u5B9E\u73B0\u83B7\u53D6 menu-item \u7684\u5C5E\u6027 hideOnClick\uFF0C\u8BE5\u53C2\u6570\u8868\u793A\u662F\u5426\u5728\u70B9\u51FB\u83DC\u5355\u9879\u540E\u83DC\u5355\u81EA\u52A8\u9690\u85CF
                        var itemOpts = $.extend({ hideOnClick: true }, $.parser.parseOptions(this, ['name', 'iconCls', 'href', { hideOnClick: 'boolean' }]), {
                            disabled: (item.attr('disabled') ? true : undefined)
                        });
                        item[0].itemName = itemOpts.name || '';
                        item[0].itemHref = itemOpts.href || '';

                        //  \u6DFB\u52A0\u4E86\u4E0B\u4E00\u884C\u4EE3\u7801\uFF0C\u4EE5\u5B9E\u73B0\u5C06 menu-item \u7684 hideOnClick \u7ED1\u5B9A\u5230\u83DC\u5355\u9879\u4E0A
                        item[0].hideOnClick = (itemOpts.hideOnClick == undefined || itemOpts.hideOnClick == null ? true : itemOpts.hideOnClick);

                        var text = item.addClass('menu-item').html();
                        item.empty().append($('<div class="menu-text"></div>').html(text));
                        if (itemOpts.iconCls) {
                            $('<div class="menu-icon"></div>').addClass(itemOpts.iconCls).appendTo(item);
                        }
                        if (itemOpts.disabled) {
                            setDisabled(target, item[0], true);
                        }
                        if (item[0].submenu) {
                            $('<div class="menu-rightarrow"></div>').appendTo(item); // has sub menu
                        }

                        bindMenuItemEvent(target, item);
                    }
                });
                $('<div class="menu-line"></div>').prependTo(menu);
            }
            setMenuWidth(target, menu);
            menu.hide();

            bindMenuEvent(target, menu);
        }
    }

    function setMenuWidth(target, menu) {
        /*
        var opts = $.data(target, 'menu').options;
        var d = menu.css('display');
        menu.css({
            display: 'block',
            left: -10000
        });

        //  menu.find('div.menu-item')._outerHeight(22);
        var width = 0;
        menu.find('div.menu-text').each(function () {
            var item = $(this);
            if (width < item._outerWidth()) {
                width = item._outerWidth();
            }
            item.closest('div.menu-item')._outerHeight(item._outerHeight() + 2);
        });
        width += 45;
        menu._outerWidth(Math.max((menu[0].originalWidth || 0), width, opts.minWidth));

        menu.css('display', d);*/
    }
    function setMenuWidth2(menu, options) {
        var d = menu.css('display');
        menu.css({
            display: 'block',
            left: -10000
        });

        //		menu.find('div.menu-item')._outerHeight(22);
        var width = menu.width();
        menu.find('div.menu-content *').each(function () {
            if (width < $(this)._outerWidth()) {
                width = $(this)._outerWidth();
            }
        });
        width += 20;
        menu._outerWidth(Math.max((menu[0].originalWidth || 0), width, options.minWidth));

        menu.css('display', d);
    }

    /**
    * bind menu event
    */
    function bindMenuEvent(target, menu) {
        //var state = $.data(target, 'menu');
        //  \u6CE8\u91CA\u6389\u4E0A\u4E00\u884C\u4EE3\u7801\u4EE3\u7801\uFF0C\u5E76\u6DFB\u52A0\u4E0B\u9762\u4E24\u884C\u4EE3\u7801\uFF0C\u4EE5\u5B9E\u73B0\u5F53\u83DC\u5355\u7684 hideOnMouseLeave: true \u65F6\uFF0C\u9F20\u6807\u79FB\u51FA\u83DC\u5355\u63A7\u4EF6\u65F6\u624D\u81EA\u52A8\u9690\u85CF\uFF0C\u5426\u5219\u5219\u662F\u5728\u83DC\u5355\u5931\u53BB\u7126\u70B9\u540E\u624D\u9690\u85CF\u3002
        var state = $.data(target, 'menu'), opts = state.options;
        if (!opts.hideOnMouseLeave) { return; };

        menu.unbind('.menu').bind('mouseenter.menu', function () {
            if (state.timer) {
                clearTimeout(state.timer);
                state.timer = null;
            }
        }).bind('mouseleave.menu', function () {
            state.timer = setTimeout(function () {
                hideAll(target);
            }, 100);
        });
    }

    /**
    * bind menu item event
    */
    function bindMenuItemEvent(target, item) {
        item.unbind('.menu');
        item.bind('click.menu', function () {
            var t = $(this);
            if (t.hasClass('menu-item-disabled')) { return; }
            // only the sub menu clicked can hide all menus
            if (!this.submenu) {
                //hideAll(target);
                //  \u6CE8\u91CA\u6389\u4E0A\u9762\u4E00\u884C\u4EE3\u7801\uFF0C\u5E76\u6DFB\u52A0\u4E0B\u9762\u4E00\u884C\u4EE3\u7801\uFF0C\u4EE5\u5B9E\u73B0\u5F53 menu-item \u7684\u5C5E\u6027 hideOnClick \u4E3A false \u7684\u60C5\u51B5\u4E0B\uFF0C\u70B9\u51FB\u83DC\u5355\u9879\u4E0D\u81EA\u52A8\u9690\u85CF\u83DC\u5355\u63A7\u4EF6\u3002
                if (this.hideOnClick) { hideAll(target); }

                var href = t.attr('href');
                if (href) {
                    location.href = href;
                }
            }
            var item = $(target).menu('getItem', this);
            $.data(target, 'menu').options.onClick.call(target, item);
        }).bind('mouseenter.menu', function (e) {
            // hide other menu
            item.siblings().each(function () {
                if (this.submenu) {
                    hideMenu(this.submenu);
                }
                $(this).removeClass('menu-active');
            });
            // show this menu
            item.addClass('menu-active');

            if ($(this).hasClass('menu-item-disabled')) {
                item.addClass('menu-active-disabled');
                return;
            }

            var submenu = item[0].submenu;
            if (submenu) {
                $(target).menu('show', {
                    menu: submenu,
                    parent: item
                });
            }
        }).bind('mouseleave.menu', function (e) {
            item.removeClass('menu-active menu-active-disabled');
            var submenu = item[0].submenu;
            if (submenu) {
                if (e.pageX >= parseInt(submenu.css('left'))) {
                    item.addClass('menu-active');
                } else {
                    hideMenu(submenu);
                }

            } else {
                item.removeClass('menu-active');
            }
        });
    }

    /**
    * hide top menu and it's all sub menus
    */
    function hideAll(target) {
        var state = $.data(target, 'menu');
        if (state) {
            if ($(target).is(':visible')) {
                hideMenu($(target));
                state.options.onHide.call(target);
            }
        }
        return false;
    }

    /**
    * show the menu, the 'param' object has one or more properties:
    * left: the left position to display
    * top: the top position to display
    * menu: the menu to display, if not defined, the 'target menu' is used
    * parent: the parent menu item to align to
    * alignTo: the element object to align to
    */
    function showMenu(target, param) {
        var left, top;
        param = param || {};
        var menu = $(param.menu || target);
        if (menu.hasClass('menu-top')) {
            var opts = $.data(target, 'menu').options;
            $.extend(opts, param);
            left = opts.left;
            top = opts.top;
            if (opts.alignTo) {
                var at = $(opts.alignTo);
                left = at.offset().left;
                top = at.offset().top + at._outerHeight();
            }
            //  if (param.left != undefined) { left = param.left }
            //  if (param.top != undefined) { top = param.top }
            if (left + menu.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()) {
                left = $(window)._outerWidth() + $(document).scrollLeft() - menu.outerWidth() - 5;
            }
            if (top + menu.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                top -= menu.outerHeight();
            }
        } else {
            var parent = param.parent; // the parent menu item
            left = parent.offset().left + parent.outerWidth() - 2;
            if (left + menu.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft()) {
                left = parent.offset().left - menu.outerWidth() + 2;
            }
            var top = parent.offset().top - 3;
            if (top + menu.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                top = $(window)._outerHeight() + $(document).scrollTop() - menu.outerHeight() - 5;
            }
        }
        menu.css({ left: left, top: top });
        menu.show(0, function () {
            if (!menu[0].shadow) {
                menu[0].shadow = $('<div class="menu-shadow"></div>').insertAfter(menu);
            }
            menu[0].shadow.css({
                display: 'block',
                zIndex: $.fn.menu.defaults.zIndex++,
                left: menu.css('left'),
                top: menu.css('top'),
                width: menu.outerWidth(),
                height: menu.outerHeight()
            });
            menu.css('z-index', $.fn.menu.defaults.zIndex++);
            if (menu.hasClass('menu-top')) {
                $.data(menu[0], 'menu').options.onShow.call(menu[0]);
            }
        });
    }

    function hideMenu(menu) {
        if (!menu) return;

        hideit(menu);
        menu.find('div.menu-item').each(function () {
            if (this.submenu) {
                hideMenu(this.submenu);
            }
            $(this).removeClass('menu-active');
        });

        function hideit(m) {
            m.stop(true, true);
            if (m[0].shadow) {
                m[0].shadow.hide();
            }
            m.hide();
        }
    }

    function findItem(target, text) {
        var result = null;
        var tmp = $('<div></div>');
        function find(menu) {
            menu.children('div.menu-item').each(function () {
                var item = $(target).menu('getItem', this);
                var s = tmp.empty().html(item.text).text();
                if (text == $.trim(s)) {
                    result = item;
                } else if (this.submenu && !result) {
                    find(this.submenu);
                }
            });
        }
        find($(target));
        tmp.remove();
        return result;
    }

    function setDisabled(target, itemEl, disabled) {
        var t = $(itemEl);

        if (disabled) {
            t.addClass('menu-item-disabled');
            if (itemEl.onclick) {
                itemEl.onclick1 = itemEl.onclick;
                itemEl.onclick = null;
            }
        } else {
            t.removeClass('menu-item-disabled');
            if (itemEl.onclick1) {
                itemEl.onclick = itemEl.onclick1;
                itemEl.onclick1 = null;
            }
        }
    }

    function appendItem(target, param) {
        var menu = $(target);
        if (param.parent) {
            if (!param.parent.submenu) {
                var submenu = $('<div class="menu"><div class="menu-line"></div></div>').appendTo('body');
                submenu.hide();
                param.parent.submenu = submenu;
                $('<div class="menu-rightarrow"></div>').appendTo(param.parent);
            }
            menu = param.parent.submenu;
        }
        var item = $('<div class="menu-item"></div>').appendTo(menu);
        $('<div class="menu-text"></div>').html(param.text).appendTo(item);
        if (param.iconCls) $('<div class="menu-icon"></div>').addClass(param.iconCls).appendTo(item);
        if (param.id) item.attr('id', param.id);
        //  if (param.href) item.attr('href', param.href);
        //  if (param.name) item.attr('name', param.name);
        if (param.name) { item[0].itemName = param.name }
        if (param.href) { item[0].itemHref = param.href }
        if (param.onclick) {
            if (typeof param.onclick == 'string') {
                item.attr('onclick', param.onclick);
            } else {
                item[0].onclick = eval(param.onclick);
            }
        }
        if (param.handler) item[0].onclick = eval(param.handler);

        bindMenuItemEvent(target, item);

        if (param.disabled) {
            setDisabled(target, item[0], true);
        }
        bindMenuEvent(target, menu);
        setMenuWidth(target, menu);
    }

    function removeItem(target, itemEl) {
        function removeit(el) {
            if (el.submenu) {
                el.submenu.children('div.menu-item').each(function () {
                    removeit(this);
                });
                var shadow = el.submenu[0].shadow;
                if (shadow) shadow.remove();
                el.submenu.remove();
            }
            $(el).remove();
        }
        removeit(itemEl);
    }

    function destroyMenu(target) {
        $(target).children('div.menu-item').each(function () {
            removeItem(target, this);
        });
        if (target.shadow) target.shadow.remove();
        //



        //
        $(target).remove();
    }

    $.fn.menu = function (options, param) {
        if (typeof options == 'string') { return $.fn.menu.methods[options](this, param); }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'menu');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'menu', { options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), options) });
                init(this);
            }
            $(this).css({ left: state.options.left, top: state.options.top });
        });
    };

    $.fn.menu.methods = {
        options: function (jq) { return $.data(jq[0], 'menu').options; },
        show: function (jq, pos) { return jq.each(function () { showMenu(this, pos); }); },
        hide: function (jq) { return jq.each(function () { hideAll(this); }); },
        destroy: function (jq) { return jq.each(function () { destroyMenu(this); }); },
        setText: function (jq, param) { return jq.each(function () { $(param.target).children('div.menu-text').html(param.text); }); },
        setIcon: function (jq, param) {
            return jq.each(function () {
                var item = $(this).menu('getItem', param.target);
                if (item.iconCls) {
                    $(item.target).children('div.menu-icon').removeClass(item.iconCls).addClass(param.iconCls);
                } else {
                    $('<div class="menu-icon"></div>').addClass(param.iconCls).appendTo(param.target);
                }
            });
        },
        getItem: function (jq, itemEl) {
            var t = $(itemEl);
            var item = {
                target: itemEl,
                id: t.attr('id'),
                text: $.trim(t.children('div.menu-text').html()),
                disabled: t.hasClass('menu-item-disabled'),
                //  href: t.attr('href'),
                //  name: t.attr('name'),
                name: itemEl.itemName,
                href: itemEl.itemHref,
                //  \u589E\u52A0\u4E0B\u9762\u4E00\u884C\u4EE3\u7801\uFF0C\u4F7F\u5F97\u901A\u8FC7 getItem \u65B9\u6CD5\u8FD4\u56DE\u7684 menu-item \u4E2D\u5305\u542B\u5176 hideOnClick \u5C5E\u6027
                hideOnClick: itemEl.hideOnClick,
                onclick: itemEl.onclick
            }
            var icon = t.children('div.menu-icon');
            if (icon.length) {
                var cc = [];
                var aa = icon.attr('class').split(' ');
                for (var i = 0; i < aa.length; i++) {
                    if (aa[i] != 'menu-icon') {
                        cc.push(aa[i]);
                    }
                }
                item.iconCls = cc.join(' ');
            }
            return item;
        },
        findItem: function (jq, text) { return findItem(jq[0], text); },
        appendItem: function (jq, param) { return jq.each(function () { appendItem(this, param); }); },
        removeItem: function (jq, itemEl) { return jq.each(function () { removeItem(this, itemEl); }); },
        enableItem: function (jq, itemEl) { return jq.each(function () { setDisabled(this, itemEl, false); }); },
        disableItem: function (jq, itemEl) { return jq.each(function () { setDisabled(this, itemEl, true); }); }
    };

    $.fn.menu.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, ['left', 'top', { minWidth: 'number', hideOnMouseLeave: "boolean" }]));
    };

    $.fn.menu.defaults = {
        zIndex: 110000, left: 0, top: 0, minWidth: 120,
        onShow: function () { },
        onHide: function () { },
        onClick: function (item) { },

        //  \u6DFB\u52A0 easyui-menu \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1B\u8868\u793A\u662F\u5426\u5F53\u9F20\u6807\u79FB\u51FA\u83DC\u5355\u65F6\uFF0C\u624D\u83DC\u5355\u81EA\u52A8\u9690\u85CF\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        hideOnMouseLeave: true
    };












    var buildMenu = function (options) {
        var guid = $.util.guid("N", 12), id = "easyui_menu_id_" + guid, name = "easyui_menu_name_" + guid;
        var opts = $.extend({}, $.fn.menu.defaults, {
            id: id, name: name, left: window.event ? window.event.clientX : 0, top: window.event ? window.event.clientY : 0,
            items: null, hideDisabledMenu: false, hideOnMouseLeave: false, minWidth: 140
        }, options || {});
        opts.items = $.array.isArray(opts.items) ? opts.items : [];
        var menu = $("<div></div>").attr({ id: id, name: name }).appendTo("body");
        if (!opts.items.length) { opts.items.push({ text: "\u5F53\u524D\u65E0\u83DC\u5355\u9879", disabled: true }); }
        $.each(opts.items, function (i, item) {
            if (opts.hideDisabledMenu && item.disabled) { return; } appendItemToMenu(menu, item, id, menu);
        });
        return { menu: menu, options: opts };
    };

    var appendItemToMenu = function (menu, item, id, menus) {
        if ($.util.isString(item) && $.trim(item) == "-") { $("<div></div>").addClass("menu-sep").appendTo(menu); return; }
        var guid = $.util.guid("N", 12), itemId = id + "_" + guid;
        item = item || {};
        item = $.extend({
            id: itemId, text: "", iconCls: null, href: null, disabled: false,
            onclick: null, handler: null, bold: false, style: null,
            children: null, hideDisabledMenu: false, hideOnClick: true
        }, item);
        var onclick = item.onclick, handler = item.handler;
        item.onclick = undefined; item.handler = undefined;
        item = $.util.parseMapFunction(item);
        item.onclick = onclick; item.handler = handler;
        if (item.hideDisabledMenu && item.disabled) { return; }
        var itemEle = $("<div></div>").attr({
            id: item.id, iconCls: item.iconCls, href: item.href, disabled: item.disabled, hideOnClick: item.hideOnClick
        }).appendTo(menu);
        if (item.style) { itemEle.css(item.style); }
        if ($.isFunction(item.handler)) {
            var handler = item.handler;
            item.onclick = function (e, item, menus) { handler.call(this, e, item, menus); };
        }
        if ($.isFunction(item.onclick)) {
            itemEle.click(function (e) {
                if (itemEle.hasClass("menu-item-disabled")) { return; }
                item.onclick.call(this, e, item, menus);
            });
        }
        if (!!item.custom) {
            itemEle.attr("custom", "true").data("custom", item);
        }
        else {
            var span = $("<span></span>").html(item.text).appendTo(itemEle);
            if (item.bold) { span.css("font-weight", "bold"); }
        }
        var hasChild = item.children && item.children.length ? true : false;
        if (hasChild) {
            var itemNode = $("<div></div>").appendTo(itemEle);
            $.each(item.children, function (i, n) {
                var val = $.util.isString(n) && $.trim(n) == "-" ? n : $.extend({ hideDisabledMenu: item.hideDisabledMenu }, n);
                appendItemToMenu(itemNode, val, itemId, menus);
            });
        }
    };




    var CUSTOM = {
        init: function (item, menus, parent) {
            if (!item || !$.util.isObject(item) || !item.custom) return;
            var opts = $.extend({}, this.defaults, item.custom);
            //fix
            var m = $(parent);
            m.removeAttr("style");
            m.find("div.menu-text").removeClass("menu-text").addClass("menu-content").css({ "background": "transparent", "padding-left": "28px", "padding-top": 3, "padding-bottom": 3 });
            //
            if ($.isFunction(opts.init)) opts.init.call(this, item, parent);
            if (!opts.type || !opts.key) return;
            opts.type = opts.type.toLowerCase()
            //verify
            switch (opts.type) {
                case "calendar":
                case "combo":
                case "combotree":
                case "searchbox":
                case "calendar":
                    opts.range = false;
                    break;
            }
            var container = m.find('div.menu-content:eq(0)');
            if (item.text && item.text.length > 0)
                $("<div></div>")
                    .addClass("menu-text")
                    .html(item.text)
                    .css({
                        "float": "none",
                        "padding-left": 0,
                        "height": 25,
                        "line-height": "25px"
                    })
                    .appendTo(container);
            var _old = item.old = CUSTOM.cache.data(opts.key) || opts.value || {};
            if (opts.range === true) {
                //fix 
                var ctl1 = this.createControl(opts,
                    $("<div></div>")
                    .css("padding", 2)
                    .appendTo(container),
                    _old.startValue,
                    function (value) {
                        var old = item.old || {};
                        old.startValue = value;
                        item.old = old;
                    });
                var ctl2 = this.createControl(opts,
                    $("<div></div>")
                    .css("padding", 2)
                    .appendTo(container),
                    _old.endValue,
                    function (value) {
                        var old = item.old || {};
                        old.endValue = value;
                        item.old = old;
                    });
                $("<a iconCls=\"icon-search\">\u7B5B\u9009</a>")
                    .appendTo($("<div></div>")
                    .appendTo(container))
                    .linkbutton({
                        plain: false
                    }).click(function () {
                        //fix null callback control
                        switch (opts.type) {
                            case "numberbox":
                            case "timespinner":
                            case "numberspinner":
                                item.old.startValue = ctl1[opts.type]("getValue");
                                item.old.endValue = ctl2[opts.type]("getValue");
                                break;
                            case "datebox":
                            case "datetimebox":
                                item.old.startValue = ctl1[opts.type]("getValue");
                                item.old.endValue = ctl2[opts.type]("getValue");
                                if (item.old.startValue == "") item.old.startValue = null;
                                if (item.old.endValue == "") item.old.endValue = null;
                                break;
                        }
                        var old = item.old;
                        CUSTOM.cache.data(opts.key, old);
                        opts.onChange.call(opts, old.startValue, old.endValue);
                        menus.menu("hide");
                    });
            }
            else {
                this.createControl(opts, container, _old, function (value) {
                    //value \u5FC5\u987B\u662F\u7B2C\u4E00\u9879
                    CUSTOM.cache.data(opts.key, value);
                    //opts.onChange.call(opts, value);
                    opts.onChange.apply(opts, arguments);
                    menus.menu("hide");
                });
            }
            CUSTOM.cache.data(opts.key, _old);
            if ($.isFunction(opts.initEnd))
                opts.initEnd.call(this, item, parent);
        },
        createControl: function (opts, container, value, event) {
            var d = null;
            switch (opts.type) {
                case "searchbox":
                    d = $("<input/>").appendTo(container);
                    opts.options.searcher = function (value, name) { event.call(this, value); }
                    d.searchbox(opts.options);
                    d.searchbox("textbox").parent().height(22);
                    d.searchbox("setValue", $.isEmptyObject(value) ? "" : value);
                    break;
                case "combo":
                case "combobox":
                    d = $("<select></select>").appendTo(container);
                    if (opts.options.multiple !== true) {
                        opts.options.onSelect = function (item) {
                            var options = d.combobox("options");
                            //\u591A\u9009\u7684\u65F6\u5019\u53EF\u4EE5\u63A5\u6536\u4E24\u4E2A\u53C2\u6570\uFF1A
                            //  @value\uFF1A\u5F53\u524D\u6240\u9009\u7684\u503C
                            //  @item\uFF1A\u5F53\u524D\u6240\u9009\u7684\u9879\u539F\u59CB\u6570\u636E

                            event.call(this, item[options.valueField], item);
                        };
                    }
                    opts.options.data = opts.data;
                    opts.options.readonly = true;
                    d.combobox(opts.options);
                    if (opts.options.multiple === true) {
                        d.combobox("setValues", value);
                        opts.options = d.combobox("options");
                        //combo-panel-tootsbar
                        var div = $("<div class=\"combo-panel combo-panel-tootsbar\"></div>")
                            .css({
                                "border": d.combo('panel').css("border"),
                                "border-top-style": "none"
                            });
                        $("<a iconCls=\"icon-search\">\u7B5B\u9009</a>").linkbutton({
                            plain: true
                        }).click(function () {
                            var values = d.combobox("getValues");
                            var data = d.combobox("getData");
                            var items = $.map(data, function (n) {
                                return $.inArray(n[opts.options.valueField], values) > -1 ? n : null;
                            });
                            //\u591A\u9009\u7684\u65F6\u5019\u53EF\u4EE5\u63A5\u6536\u4E24\u4E2A\u53C2\u6570\uFF1A
                            //  @values\uFF1A\u5F53\u524D\u6240\u9009\u7684\u503C
                            //  @items\uFF1A\u5F53\u524D\u6240\u9009\u7684\u9879\u539F\u59CB\u6570\u636E
                            event.call(this, values, items);
                        }).appendTo(div);
                        d.combo('panel').parent()
                            .addClass("menu")
                            .attr("ment-panel", "true")
                            .css({
                                "padding": 0,
                                "border-width": 0,
                                "background-color": "transparent",
                                "overflow": "visible"
                            })
                            .append(div);
                        CUSTOM.removeCache.push(d.combo('panel').parent());
                    } else {
                        d.combobox("setValue", value);
                        d.combo('panel').parent()
                            .addClass("menu")
                            .attr("ment-panel", "true")
                            .css({
                                "padding": 0,
                                "border-width": 0,
                                "background-color": "transparent",
                                "overflow": "visible"
                            });
                    }
                    break;
                case "datebox":
                    d = $("<input/>").appendTo(container);
                    opts.options.onSelect = function (date) { if (!!date) { event.call(this, date._$_format("yyyy-MM-dd")); } else { event.call(this, null); } };
                    opts.options.buttons = $.extend([], $.fn.datebox.defaults.buttons);
                    opts.options.buttons.splice(1, 0, {
                        text: '\u6E05\u9664',
                        handler: function (target) {
                            d.datebox("setValue", null);
                            d.combo("hidePanel");
                            event.call(this, null);
                        }
                    });
                    d.datebox(opts.options);
                    d.datebox("setValue", value);
                    d.combo('panel').parent()
                        .addClass("menu")
                        .attr("ment-panel", "true")
                        .css({
                            "padding": 0,
                            "border-width": 0,
                            "background-color": "transparent",
                            "overflow": "visible"
                        });
                    CUSTOM.removeCache.push(d.combo('panel').parent());
                    break;
                case "datetimebox":
                    d = $("<input type='text'/>").appendTo(container);
                    opts.options.onSelect = function (date) { if (!!date) { event.call(this, date._$_format("yyyy-MM-dd hh:mm:ss")); } else { event.call(this, null); } };
                    opts.options.buttons = $.extend([], $.fn.datetimebox.defaults.buttons);
                    opts.options.buttons.splice(1, 0, {
                        text: '\u6E05\u9664',
                        handler: function (target) {
                            d.datetimebox("setValue", null);
                            d.combo("hidePanel");
                            event.call(this, null);
                        }
                    });
                    d.datetimebox(opts.options);
                    d.datetimebox("setValue", value);
                    d.combo('panel').parent()
                        .addClass("menu")
                        .attr("ment-panel", "true")
                        .css({
                            "padding": 0,
                            "border-width": 0,
                            "background-color": "transparent",
                            "overflow": "visible"
                        });
                    CUSTOM.removeCache.push(d.combo('panel').parent());
                    break;
                case "combotree":
                    d = $("<input type='text'/>").appendTo(container);
                    //opts.options.onBeforeSelect = function (node) {
                    //    var isLeaf = d.tree("isLeaf", node.target);
                    //    return isLeaf === true;
                    //};

                    //opts.options.onSelect = function (node) {
                    //    event.call(this, node || {});
                    //};
                    opts.options.data = opts.data;
                    opts.options.readonly = true;
                    d.combotree(opts.options);
                    if (opts.options.multiple === true) {
                        d.combotree('setValues', value);
                        //combo-panel-tootsbar
                        var div = $("<div class=\"combo-panel combo-panel-tootsbar\"></div>")
                            .css({
                                "border": d.combo('panel').css("border"),
                                "border-top-style": "none"
                            });
                        $("<a iconCls=\"icon-search\">\u7B5B\u9009</a>").linkbutton({
                            plain: true
                        }).click(function () {
                            var t = d.combotree("tree");
                            var items = t.tree("getChecked");
                            var values = $.map(items, function (n) {
                                return n.id;
                            });
                            //\u591A\u9009\u7684\u65F6\u5019\u53EF\u4EE5\u63A5\u6536\u4E24\u4E2A\u53C2\u6570\uFF1A
                            //  @values\uFF1A\u5F53\u524D\u6240\u9009\u7684\u503C
                            //  @items\uFF1A\u5F53\u524D\u6240\u9009\u7684\u9879\u539F\u59CB\u6570\u636E
                            event.call(this, values, items);
                        }).appendTo(div);
                        d.combo('panel').parent()
                            .addClass("menu")
                            .attr("ment-panel", "true")
                            .css({
                                "padding": 0,
                                "border-width": 0,
                                "background-color": "transparent",
                                "overflow": "visible"
                            }).append(div);
                    } else {
                        d.combotree('setValue', value);
                        opts.options.onSelect = function (node) {
                            event.call(this, node || {});
                        };
                        d.combo('panel').parent()
                            .addClass("menu")
                            .attr("ment-panel", "true")
                            .css({
                                "padding": 0,
                                "border-width": 0,
                                "background-color": "transparent",
                                "overflow": "visible"
                            });
                    }
                    CUSTOM.removeCache.push(d.combo('panel').parent());
                    break;
                case "calendar":
                    d = $("<div></div>").appendTo(container);
                    opts.options.onSelect = function (date) { if (!!date) { event.call(this, date._$_format("yyyy-MM-dd")); } else { event.call(this, null); } };
                    opts.options.current = new Date(value);
                    opts.options.fit = false;
                    d.calendar(opts.options);
                    break;
                case "numberbox":
                    d = $("<input/>").appendTo(container).addClass("searchbox").height(20).width(opts.options.width || 100);
                    if (opts.range === false) {
                        d.numberbox(opts.options);
                        //d.numberbox("textbox").parent().height(22);
                        d.numberbox("setValue", value);
                        $("<a href=\"#\" iconCls=\"icon-search\">\u7B5B\u9009</a>").appendTo(container).linkbutton({
                            plain: false
                        }).click(function () {
                            event.call(this, d.numberbox("getValue"));
                        });
                        container.children("*").css({ "vertical-align": "middle" });
                    } else {
                        //opts.options.onChange = event;
                        d.numberbox(opts.options);
                        d.numberbox("setValue", value);
                    }
                    break;
                case "numberspinner":
                    d = $("<input/>").appendTo(container);
                    if (opts.range === false) {
                        d.numberspinner(opts.options);
                        //d.numberspinner("textbox").parent().height(22);
                        d.numberspinner("setValue", value);
                        $("<a iconCls=\"icon-search\">\u7B5B\u9009</a>").appendTo(container).linkbutton({
                            plain: false
                        }).click(function () {
                            event.call(this, d.numberspinner("getValue"));
                        });
                        container.children("*").css({ "vertical-align": "middle" });
                    } else {
                        d.numberspinner(opts.options);
                        d.numberspinner("setValue", value);
                    }
                    break;
                case "timespinner":
                    d = $("<input/>").appendTo(container);
                    if (opts.range === false) {
                        d.timespinner(opts.options);
                        //d.timespinner("textbox").parent().height(22);
                        d.timespinner("setValue", value);
                        $("<a iconCls=\"icon-search\">\u7B5B\u9009</a>").appendTo(container).linkbutton({
                            plain: false
                        }).click(function () {
                            event.call(this, d.timespinner("getValue"));
                        });
                        container.children("*").css({ "vertical-align": "middle" });
                    } else {
                        d.timespinner(opts.options);
                        d.timespinner("setValue", value);
                    }
                    break;
                default:
                    break;
            }
            return d;
        },
        cache: $("<br/>"),
        removeCache: [],
        controlType: "combo combobox combotree combogrid numberbox datebox datetimebox calendar spinner numberspinner timespinner timebox searchbox other".split(" "),
        defaults: {
            type: null,
            options: { width: 200 },
            key: "",
            range: false,
            value: null,
            data: null,
            init: function (item, parent) { },
            initEnd: function (item, parent) { },
            onChange: function (start, end) { }//oronChange: function (value) { }
        }
    };
    if (!Date.prototype._$_format) {
        Date.prototype._$_format = function (fmt) { //author: meizz 
            var o = {
                "M+": this.getMonth() + 1,                 //\u6708\u4EFD 
                "d+": this.getDate(),                    //\u65E5 
                "h+": this.getHours(),                   //\u5C0F\u65F6 
                "m+": this.getMinutes(),                 //\u5206 
                "s+": this.getSeconds(),                 //\u79D2 
                "q+": Math.floor((this.getMonth() + 3) / 3), //\u5B63\u5EA6 
                "S": this.getMilliseconds()             //\u6BEB\u79D2 
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
    }


    $.extend($.easyui, {

        //  \u6839\u636E\u6307\u5B9A\u7684\u5C5E\u6027\u521B\u5EFA easyui-menu \u5BF9\u8C61\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      options: JSON \u5BF9\u8C61\u7C7B\u578B\uFF0C\u53C2\u6570\u5C5E\u6027\u7EE7\u627F easyui-menu \u63A7\u4EF6\u7684\u6240\u6709\u5C5E\u6027\u548C\u4E8B\u4EF6\uFF08\u53C2\u8003\u5B98\u65B9 API \u6587\u6863\uFF09\uFF0C\u5E76\u5728\u6B64\u57FA\u7840\u4E0A\u589E\u52A0\u4E86\u5982\u4E0B\u53C2\u6570\uFF1A
        //          id: \u4E00\u4E2A String \u5BF9\u8C61\uFF0C\u8868\u793A\u521B\u5EFA\u7684\u83DC\u5355\u5BF9\u8C61\u7684 ID \u5C5E\u6027\uFF0C\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5C06\u4F1A\u5206\u914D\u4E00\u4E2A\u968F\u673A\u503C\u3002
        //          name: \u4E00\u4E2A String \u5BF9\u8C61\uFF0C\u8868\u793A\u521B\u5EFA\u7684\u83DC\u5355\u5BF9\u8C61\u7684 name \u5C5E\u6027\uFF0C\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5C06\u4F1A\u5206\u914D\u4E00\u4E2A\u968F\u673A\u503C\u3002
        //          hideDisabledMenu: \u4E00\u4E2A Boolean \u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B\u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u83DC\u5355\u9879\u7684 disabled: true\uFF0C\u662F\u5426\u81EA\u52A8\u9690\u85CF\u8BE5\u83DC\u5355\u9879\uFF1B
        //          items: \u4E00\u4E2A Array \u5BF9\u8C61\uFF0C\u8BE5\u6570\u7EC4\u5BF9\u8C61\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u662F\u4E00\u4E2A JSON \u683C\u5F0F\u5BF9\u8C61\u7528\u4E8E\u8868\u793A\u4E00\u4E2A menu item \uFF08\u5173\u4E8E menu item \u5BF9\u8C61\u5C5E\u6027\uFF0C\u53C2\u8003\u5B98\u65B9 API\uFF09\uFF1B
        //                  \u8BE5\u6570\u7EC4\u4E2D\u6BCF\u4E2A\u5143\u7D20\u7684\u5C5E\u6027\uFF0C\u9664 easyui-menu \u4E2D menu item \u5B98\u65B9 API \u5B9A\u4E49\u7684\u5C5E\u6027\u5916\uFF0C\u8FD8\u589E\u52A0\u4E86\u5982\u4E0B\u5C5E\u6027\uFF1A
        //              hideDisabledMenu: \u8BE5\u5C5E\u6027\u8868\u793A\u5728\u5F53\u524D\u5B50\u83DC\u5355\u7EA7\u522B\u4E0B\u5F53\u83DC\u5355\u9879\u7684 disabled: true\uFF0C\u662F\u5426\u81EA\u52A8\u9690\u85CF\u8BE5\u83DC\u5355\u9879\uFF1B\u4E00\u4E2A Boolean \u503C\uFF0C\u53D6\u4E0A\u4E00\u7EA7\u7684 hideDisabledMenu \u503C\uFF1B
        //              handler: \u4E00\u4E2A\u56DE\u8C03\u51FD\u6570\uFF0C\u8868\u793A\u70B9\u51FB\u83DC\u5355\u9879\u65F6\u89E6\u53D1\u7684\u4E8B\u4EF6\uFF1B
        //                  \u56DE\u8C03\u51FD\u6570 handler \u548C\u56DE\u8C03\u51FD\u6570 onclick \u7684\u7B7E\u540D\u90FD\u4E3A function(e, item, menu)\uFF0C\u5176\u4E2D\uFF1A
        //                      e:  \u8868\u793A\u52A8\u4F5C\u4E8B\u4EF6\uFF1B
        //                      item:   \u8868\u793A\u5F53\u524D\u70B9\u51FB\u7684\u83DC\u5355\u9879\u7684 options \u9009\u9879\uFF1B
        //                      menu:   \u8868\u793A\u6574\u4E2A\u83DC\u5355\u63A7\u4EF6\u7684 jQuery \u5BF9\u8C61\u3002
        //                      \u51FD\u6570\u4E2D this \u6307\u5411\u89E6\u53D1\u4E8B\u4EF6\u7684\u5BF9\u8C61\u672C\u8EAB
        //                  \u53E6\uFF0C\u5982\u679C\u540C\u65F6\u5B9A\u4E49\u4E86 onclick \u548C handler\uFF0C\u5219\u53EA\u5904\u7406 handler \u800C\u4E0D\u5904\u7406 onclick\uFF0C\u6240\u4EE5\u8BF7\u4E0D\u8981\u4E24\u4E2A\u56DE\u8C03\u51FD\u6570\u5C5E\u6027\u540C\u65F6\u4F7F\u7528\u3002
        //              children: \u540C\u4E0A\u4E00\u7EA7\u5BF9\u8C61\u7684 items \u5C5E\u6027\uFF0C\u4E3A\u4E00\u4E2A Array \u5BF9\u8C61\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A JSON \u683C\u5F0F\u5BF9\u8C61\uFF0C\u8BE5\u8FD4\u56DE\u7684\u5BF9\u8C61\u4E2D\u5177\u6709\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      menu: \u4F9D\u636E\u4E8E\u4F20\u5165\u53C2\u6570 options \u6784\u5EFA\u51FA\u7684\u83DC\u5355 DOM \u5143\u7D20\u5BF9\u8C61\uFF0C\u8FD9\u662F\u4E00\u4E2A jQuery \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u672A\u521D\u59CB\u5316\u4E3A easyui-menu \u63A7\u4EF6\uFF0C\u800C\u53EA\u662F\u5177\u6709\u8BE5\u63A7\u4EF6\u7684 DOM \u7ED3\u6784\uFF1B
        //      options: \u4F20\u5165\u53C2\u6570 options \u89E3\u6790\u540E\u7684\u7ED3\u679C\uFF0C\u8BE5\u7ED3\u679C\u5C1A\u672A\u7528\u4E8E\u4F46\u53EF\u7528\u4E8E\u521D\u59CB\u5316 menu \u5143\u7D20\u3002
        createMenu: buildMenu,

        //  \u6839\u636E\u6307\u5B9A\u7684\u5C5E\u6027\u521B\u5EFA easyui-menu \u5BF9\u8C61\u5E76\u7ACB\u5373\u663E\u793A\u51FA\u6765\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u7684\u53C2\u6570\u548C\u672C\u63D2\u4EF6\u6587\u4EF6\u4E2D\u7684\u63D2\u4EF6\u65B9\u6CD5 createMenu \u76F8\u540C\uFF1A
        //  \u6CE8\u610F\uFF1A\u672C\u65B9\u6CD5\u4E0E createMenu \u65B9\u6CD5\u4E0D\u540C\u4E4B\u5904\u5728\u4E8E\uFF1A
        //      createMenu: \u4EC5\u6839\u636E\u4F20\u5165\u7684 options \u53C2\u6570\u521B\u5EFA\u51FA\u7B26\u5408 easyui-menu DOM \u7ED3\u6784\u8981\u6C42\u7684 jQuery DOM \u5BF9\u8C61\uFF0C\u4F46\u662F\u8BE5\u5BF9\u8C61\u5E76\u672A\u521D\u59CB\u5316\u4E3A easyui-menu \u63A7\u4EF6\uFF1B
        //      showMenu: \u8BE5\u65B9\u6CD5\u5728 createMenu \u65B9\u6CD5\u7684\u57FA\u7840\u4E0A\uFF0C\u5BF9\u521B\u5EFA\u51FA\u6765\u7684 jQuery DOM \u5BF9\u8C61\u7ACB\u5373\u8FDB\u884C easyui-menu \u7ED3\u6784\u521D\u59CB\u5316\uFF0C\u5E76\u663E\u793A\u51FA\u6765\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A jQuery \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u8868\u793A\u521B\u5EFA\u5E76\u663E\u793A\u51FA\u7684 easyui-menu \u5143\u7D20\uFF0C\u8BE5\u8FD4\u56DE\u7684\u5143\u7D20\u5DF2\u7ECF\u88AB\u521D\u59CB\u5316\u4E3A easyui-menu \u63A7\u4EF6\u3002
        showMenu: function (options) {
            var opts = options || {};
            var onHide1 = $.fn.menu.defaults.onHide, onHide2 = opts.onHide;
            opts.onHide = function () {
                var m = $.util.parseJquery(this);
                if ($.isFunction(onHide1)) { onHide1.apply(this, arguments); }
                if ($.isFunction(onHide2)) { onHide2.apply(this, arguments); }
                $.util.exec(function () { m.menu("destroy"); });
                $.each(CUSTOM.removeCache, function (i, domItem) {
                    if (!!domItem)
                        $(domItem).remove();
                });
                //$("body>div[ment-panel]").remove();
                CUSTOM.removeCache = [];
            };
            var m = buildMenu(opts);
            var mm = m.menu;

            var $mm = mm.menu(m.options);//.menu("show", { left: m.options.left, top: m.options.top });
            $.each(mm.find("div[custom]"), function (i, domItem) {
                var item = $(domItem).data("custom");
                if (!!item)
                    CUSTOM.init.call(CUSTOM, item, mm, domItem);
            });
            setMenuWidth2(mm, m.options);
            $mm.menu("show", { left: m.options.left, top: m.options.top });//item, menus, parent
            return m.menu;
        }
    });

    //  \u53E6\uFF0C\u589E\u52A0 easyui-menu \u63A7\u4EF6\u4E2D menu-item \u7684\u5982\u4E0B\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027:
    //      hideOnClick:    Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B\u8868\u793A\u70B9\u51FB\u8BE5\u83DC\u5355\u9879\u540E\u6574\u4E2A\u83DC\u5355\u662F\u5426\u4F1A\u81EA\u52A8\u9690\u85CF\uFF1B
    //      bold:           Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B\u8868\u793A\u8BE5\u83DC\u5355\u9879\u662F\u5426\u5B57\u4F53\u52A0\u7C97\uFF1B
    //      style:          JSON-Object \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A null\uFF1B\u8868\u793A\u8981\u9644\u52A0\u5230\u8BE5\u83DC\u5355\u9879\u7684\u6837\u5F0F\uFF1B
    //  \u5907\u6CE8\uFF1A\u4E0A\u8FF0\u589E\u52A0\u7684 menu-item \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u53EA\u6709\u901A\u8FC7 $.easyui.createMenu \u6216\u8005 $.easyui.showMenu \u751F\u6210\u83DC\u5355\u65F6\uFF0C\u624D\u6709\u6548\u3002

})(jQuery);