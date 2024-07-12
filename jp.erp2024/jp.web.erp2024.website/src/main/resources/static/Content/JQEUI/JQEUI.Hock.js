
(function (window, $, JQEUI) {
    JQEUI.hock = {
        combobox: {},
        tabs: {}
    };

    

    //fix combobox只有一个下拉项的时候会自动选择问题
    JQEUI.hock.combobox.fixSelect = function (selecter) {
        selecter = $(selecter);
        var options = selecter.combobox('options');
        options.onSelect = JQEUI.aop(options.onSelect, {
            before: function (ctx) {
                var ipt = $(this).combobox("textbox")[0], text = ipt.value, item = ctx.args[0];
                if (document.activeElement == ipt) {
                    //calculate.data.SupplierName=text;
                    //calculate.data.SupplierID=0;
                    setTimeout(function () {
                        selecter.combobox("clear").combobox("unselect", item[options.valueField]).combobox("setText", text);
                    }, 0);
                    ctx.stop = true;
                }
            }
        }, selecter[0]);
        selecter.combobox("textbox").off('blur').on('blur', function () {
            selecter.combobox("setValue", this.value);
        });
    }

    //tabs 标签拖动（有个 BUG :iframe内容拖动后会重新加载...）
    //    用法:JQEUI.hock.tabs.dragTab('#tab');
    JQEUI.hock.tabs.dragTab = function (selecter) {
        selecter = $(selecter);
        var state = selecter.data('tabs');
        var options = state.options;
        var tabs = state.tabs;
        var header = selecter.find(' > div.tabs-header > div.tabs-wrap > ul');
        //查找待移动的对象
        var findWhich = function (e, source, siblingsSelector) {
            var result = null;
            $(source).siblings(siblingsSelector).each(function (i, item) {
                var pal = $(this);
                if (pal[0] != source) {
                    var pos = pal.offset();
                    if (e.pageX > pos.left && e.pageX < pos.left + pal.outerWidth()
                            && e.pageY > pos.top && e.pageY < pos.top + pal.outerHeight()) {//在该元素上
                        if (e.pageX > pos.left + pal.outerWidth() / 2) {
                            result = {
                                target: pal,
                                pos: 'right'
                            };
                        } else {
                            result = {
                                target: pal,
                                pos: 'left'
                            }
                        }
                    }
                }
            });
            return result;
        };


        options.dragIndex = -1;
        options.draging = false;
        options.dragEvent = null;
        options.dragProxy = false;
        options.dragSpacer = false;
        options.draggable = function (tabHeader) {

            if (!$(tabHeader).find('a.tabs-close').length) {
                $(tabHeader).addClass('drag-none');
            }
            $(tabHeader).draggable({
                //handle: ">div.image-img-warp",
                deltaX: 0,
                deltaY: 0,
                axis:'h',
                proxy: function (source) {
                    options.draging = true;
                    options.dragProxy = $("<div style='position: absolute; top: 0px; left: 799px; z-index: 9999; width: 106px;outline:solid 1px #e9e9e9;border: solid 1px #fff; border-width: 10px 0 10px 0; text-align: center; background-color: #fff; '></div>");
                    options.dragProxy.css('margin-left', -1 * options.dragEvent.offsetX).css('margin-top', $(source).parent().height()+3);
                    $(source).hide();
                    options.dragProxy.html($(source).html()).width($(source).width()-2).appendTo('body');
                    return options.dragProxy;
                },
                onBeforeDrag: function (e) {
                    //if (!_dragable) return false;
                    options.dragEvent = e;
                },
                onStartDrag: function (e) {
                    $(this).hide();
                    options.dragIndex = $(this).index();
                    options.dragSpacer = $('<li class="tabs-selected drag-none drag-spacer" style="opacity: 0.8;">' + $(this).html() + '</li>').insertAfter(this);
                    options.dragSpacer._outerWidth($(this).outerWidth());
                    options.dragSpacer._outerHeight($(this).outerHeight());
                },
                onDrag: function (e) {
                    var p = findWhich(e, this, 'li:not(.drag-none)');
                    if (p) {
                        if (p.pos == 'left') {
                            options.dragSpacer.insertBefore(p.target);
                        } else {
                            options.dragSpacer.insertAfter(p.target);
                        }
                        e.data.targetDrop = p.target;
                    }
                    else {
                        var c = findWhich(e, undefined, 'li:not(.drag-none)');
                        if (c) {
                            if (c.siblings('.drag-spacer').length == 0) {
                                options.dragSpacer.appendTo(c);
                            }
                        }
                    }
                },
                onStopDrag: function (e) {
                    options.dragSpacer.hide();
                    $(this)
                    .removeAttr("style")
                    .insertAfter(options.dragSpacer).show();
                    options.dragSpacer.remove();
                    options.dragProxy.remove();
                    options.draging = false;


                    //debugger;
                    var newIndex = $(this).index();
                    if (newIndex == options.dragIndex) return;
                    var temp = tabs[options.dragIndex];
                    if (newIndex > 0) {
                        temp.parent().insertAfter(tabs[newIndex - 1].parent());
                    } else {
                        temp.parent().insertBefore(tabs[newIndex - 1].parent());
                    }



                    for (var i = options.dragIndex; i < newIndex; i++) {
                        tabs[i] = tabs[i + 1];
                    }
                    for (var i = options.dragIndex; i > newIndex ; i--) {
                        tabs[i] = tabs[i - 1];
                    }
                    tabs[newIndex] = temp;

                    setTimeout(function () {
                        selecter.tabs('select', newIndex);
                    },0);
                    
                }
            });
        }

        options.onAdd = JQEUI.aop(options.onAdd, {
            after: function (ctx) {
                //args=title,index
                options.draggable(header.children(":eq(" + ctx.args[1] + ")"));
            }
        }, selecter[0]);

        header.each(function (i, item) {
            options.draggable(this);
        });
    };
})(window, jQuery, JQEUI);