/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI treegrid Extensions 1.0 beta
* jQuery EasyUI treegrid \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.treegrid.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-09-06
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*   3、jeasyui.extensions.menu.js v1.0 beta late
*   4、jeasyui.extensions.tree.js v1.0 beta late
*   6、jeasyui.extensions.datagrid.js v1.0 beta late
*   6、jeasyui.extensions.panel.js v1.0 beta late \u548C jeasyui.extensions.window.js v1.0 beta late(\u53EF\u9009)
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.fn.treegrid.extensions = {};

    /************************  initExtend Methods Begin  ************************/

    var _update = $.fn.treegrid.methods.update;
    var _append = $.fn.treegrid.methods.append;
    var _insert = $.fn.treegrid.methods.insert;
    var updateRow = function (target, param) {
        if (!param || param.id == undefined || !param.row) { return; }
        var t = $.util.parseJquery(target), opts = t.treegrid("options");
        if ($.isFunction(opts.onBeforeUpdate) && opts.onBeforeUpdate.call(target, param.id, param.row) == false) { return; }
        _update.call(t, t, param);
        initHeaderColumnFilterContainer(t, opts);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, param.id, param.row);
        if ($.isFunction(opts.onUpdate)) { opts.onUpdate.call(target, param.id, param.row); }
    };
    var appendRow = function (target, param) {
        if (!param || !param.data) { return; }
        var t = $.util.parseJquery(target), opts = t.treegrid("options");
        if ($.isFunction(opts.onBeforeAppend) && opts.onBeforeAppend.call(target, param.parent, param.data) == false) { return; }
        _append.call(t, t, param);
        initHeaderColumnFilterContainer(t, opts);
        initRowDndExtensions(t, opts);
        $.each(param.data, function () { initColumnRowTooltip(t, opts, this[opts.idField], this); });
        if ($.isFunction(opts.onAppend)) { opts.onAppend.call(target, param.parent, param.data); }
    };
    var insertRow = function (target, param) {
        if (!param || !param.data || (!param.before && !param.after)) { return; }
        var t = $.util.parseJquery(target), opts = t.treegrid("options");
        if ($.isFunction(opts.onBeforeInsert) && opts.onBeforeInsert.call(target, param.before, param.after, param.data) == false) { return; }
        _insert.call(t, t, param);
        initHeaderColumnFilterContainer(t, opts);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, param.data[opts.idField], param.data);
        resetTeeIndent(t, opts, param.data[opts.idField], opts.treeField);
        if ($.isFunction(opts.onInsert)) { opts.onInsert.call(target, param.before, param.after, param.data); }
    };
    var resetTeeIndent = function (t, opts, id, field) {
        var dom = t.treegrid("getCellDom", { field: field, id: id }),
            level = t.treegrid("getLevel", id), child = t.treegrid("getChildren", id);
        while (dom.find("span.tree-indent,span.tree-hit").length < level) {
            $("<span></span>").addClass("tree-indent").prependTo(dom);
        }
        $.each(child, function () { resetTeeIndent(t, opts, this[opts.idField], field); });
    };

    var getLevel = function (target, id) {
        var t = $.util.parseJquery(target), tr = t.treegrid("getRowDom", id);
        if (!tr || !tr.length) { return 0; }
        return tr.eq(0).parentsUntil("div.datagrid-body", "tr.treegrid-tr-tree").length + 1;
    };


    var freezeColumn = function (target, field) {
        var t = $.util.parseJquery(target), fields = t.treegrid("getColumnFields"), frozenFields = t.treegrid("getColumnFields", true);
        if (!frozenFields || !frozenFields.length || !$.array.contains(fields, field) || $.array.contains(frozenFields, field)) { return; }
        t.treegrid("moveColumn", { source: field, target: frozenFields[frozenFields.length - 1], point: "after" });
    };

    var unfreezeColumn = function (target, field) {
        var t = $.util.parseJquery(target), fields = t.treegrid("getColumnFields"), frozenFields = t.treegrid("getColumnFields", true);
        if (!fields || !fields.length || $.array.contains(fields, field) || !$.array.contains(frozenFields, field)) { return; }
        t.treegrid("moveColumn", { source: field, target: fields[0], point: "before" });
    };

    var moveColumn = function (target, param) {
        if (!param || !param.source || !param.target || param.source == param.target || !param.point) { return; };
        if (!$.array.contains(["before", "after"], param.point)) { param.point = "before"; }
        var t = $.util.parseJquery(target);
        if (t.treegrid("hasMuliRowHeader")) { return; }
        var opts = t.treegrid("options"), sourceFrozen, targetFrozen,
            fields = t.treegrid("getColumnFields"), frozenFields = t.treegrid("getColumnFields", true);
        if ($.array.contains(fields, param.source)) { sourceFrozen = false; }
        if (sourceFrozen == undefined && $.array.contains(frozenFields, param.source)) { sourceFrozen = true; }
        if ($.array.contains(fields, param.target)) { targetFrozen = false; }
        if (targetFrozen == undefined && $.array.contains(frozenFields, param.target)) { targetFrozen = true; }
        if (sourceFrozen == undefined || targetFrozen == undefined) { return; }
        if ($.isFunction(opts.onBeforeMoveColumn) && opts.onBeforeMoveColumn.call(target, param.source, param.target, param.point) == false) { return; }
        var panel = t.treegrid("getPanel"), view = panel.find("div.datagrid-view"),
            view1 = view.find("div.datagrid-view1"), view2 = view.find("div.datagrid-view2"),
            headerRow1 = view1.find("table.datagrid-htable tr.datagrid-header-row"),
            headerRow2 = view2.find("table.datagrid-htable tr.datagrid-header-row"),
            borderRow1 = view1.find("table.datagrid-btable tr.datagrid-row"),
            borderRow2 = view2.find("table.datagrid-btable tr.datagrid-row"),
            sourceHeaderTd = sourceFrozen ? headerRow1.find("td[field=" + param.source + "]") : headerRow2.find("td[field=" + param.source + "]"),
            targetHeaderTd = targetFrozen ? headerRow1.find("td[field=" + param.target + "]") : headerRow2.find("td[field=" + param.target + "]"),
            sourceRow = sourceFrozen ? borderRow1 : borderRow2,
            targetRow = targetFrozen ? borderRow1 : borderRow2;
        if (sourceRow.length != targetRow.length) { return; }
        targetHeaderTd[param.point](sourceHeaderTd);
        targetRow.each(function (i, n) {
            var targetBodyTr = $.util.parseJquery(this), id = targetBodyTr.attr("node-id");
            var targetBodyTd = targetBodyTr.find("td[field=" + param.target + "]"), sourceBodyTd = $(sourceRow[i]).find("td[field=" + param.source + "]");
            targetBodyTd[param.point](sourceBodyTd);
        });

        var sourceOpts = t.treegrid("getColumnOption", param.source), targetOpts = t.treegrid("getColumnOption", param.target),
            sourceColumns = sourceFrozen ? opts.frozenColumns[0] : opts.columns[0],
            targetColumns = targetFrozen ? opts.frozenColumns[0] : opts.columns[0],
            exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        $.array.remove(sourceColumns, sourceOpts);
        var index = $.array.indexOf(targetColumns, targetOpts);
        if (index > -1) { $.array.insert(targetColumns, param.point == "before" ? index : index + 1, sourceOpts); }

        var treeOpts = opts;
        opts = t.datagrid("options");
        sourceOpts = t.datagrid("getColumnOption", param.source);
        targetOpts = t.datagrid("getColumnOption", param.target);
        sourceColumns = sourceFrozen ? opts.frozenColumns[0] : opts.columns[0];
        targetColumns = targetFrozen ? opts.frozenColumns[0] : opts.columns[0];
        $.array.remove(sourceColumns, sourceOpts);
        var index = $.array.indexOf(targetColumns, targetOpts);
        if (index > -1) { $.array.insert(targetColumns, param.point == "before" ? index : index + 1, sourceOpts); }
        opts = treeOpts;

        if (sourceFrozen || targetFrozen && sourceFrozen != targetFrozen) { var data = t.treegrid("getData"); t.treegrid("loadData", data); } else { t.treegrid("fixColumnSize"); }
        if (sourceFrozen) {
            if (!targetFrozen) {
                index = $.array.indexOf(exts.fields, param.target);
                $.array.insert(exts.fields, param.point == "before" ? index : index + 1, param.source);
                $.array.insert(exts.fieldOptions, param.point == "before" ? index : index + 1, sourceOpts);
                $.array.insert(exts.fieldOptionsBackup, param.point == "before" ? index : index + 1, $.extend({}, sourceOpts));
            }
        }
        if (!sourceFrozen) {
            index = $.array.indexOf(exts.fields, param.source);
            if (targetFrozen) {
                $.array.removeAt(exts.fields, index);
                $.array.removeAt(exts.fieldOptions, index);
                $.array.removeAt(exts.fieldOptionsBackup, index);
            } else {
                var fieldOpts = exts.fieldOptions[index], fieldOptsBak = exts.fieldOptionsBackup[index];
                $.array.removeAt(exts.fields, index);
                $.array.removeAt(exts.fieldOptions, index);
                $.array.removeAt(exts.fieldOptionsBackup, index);
                index = $.array.indexOf(exts.fields, param.target);
                $.array.insert(exts.fields, param.point == "before" ? index : index + 1, param.source);
                $.array.insert(exts.fieldOptions, param.point == "before" ? index : index + 1, fieldOpts);
                $.array.insert(exts.fieldOptionsBackup, param.point == "before" ? index : index + 1, fieldOptsBak);
            }
        }
        if ($.isFunction(opts.onMoveColumn)) { opts.onMoveColumn.call(target, param.source, param.target, param.point); }
    }

    var shiftColumn = function (target, param) {
        if (!param || !param.field || !param.point) { return; };
        if (!$.array.contains(["before", "after"], param.point)) { param.point = "before"; }
        var t = $.util.parseJquery(target), fields = t.treegrid("getColumnFields", "all"),
            index = $.array.indexOf(fields, param.field);
        if (index == -1 || (param.point == "before" && index == 0) || (param.point == "after" && index == fields.length - 1)) { return; }
        var target = fields[param.point == "before" ? index - 1 : index + 1];
        t.treegrid("moveColumn", { source: param.field, target: target, point: param.point });
    };

    var deleteColumn = function (target, field) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options"),
            exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        if ($.isFunction(opts.onBeforeDeleteColumn) && opts.onBeforeDeleteColumn.call(target, field) == false) { return; }
        $.fn.datagrid.extensions.removeField(opts, field, exts);
        t.treegrid("getColumnDom", { field: field, header: true }).remove();
        if ($.isFunction(opts.onDeleteColumn)) { opts.onDeleteColumn.call(target, field); }
    };

    var popColumn = function (target, field) {
        var t = $.util.parseJquery(target), colOpts = t.treegrid("getColumnOption", field);
        if (colOpts) { t.treegrid("deleteColumn", field); }
        return colOpts
    };


    var isChecked = function (target, id) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options"), rows = t.treegrid("getChecked");
        return $.array.contains(rows, id, function (val) { return val[opts.idField] == id; });
    };

    var isSelected = function (target, id) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options"), rows = t.treegrid("getSelections");
        return $.array.contains(rows, id, function (val) { return val[opts.idField] == id; });
    };

    var isRootNode = function (target, id) {
        var t = $.util.parseJquery(target), roots = t.treegrid("getRoots"), node = t.treegrid("find", id);
        return node && $.array.contains(roots, node);
    };

    var moveRow = function (target, param) {
        if (!param || !param.source || !param.target || !param.point) { return; }
        if (!$.array.contains(["append", "top", "bottom"], param.point)) { param.point = "append"; }
        var t = $.util.parseJquery(target), opts = t.treegrid("options"),
            sourceNode = t.treegrid("find", param.source), targetNode = t.treegrid("find", param.target);
        if (!sourceNode || !targetNode || sourceNode == targetNode) { return; }
        if ($.isFunction(opts.onBeforeDrop) && opts.onBeforeDrop.call(target, targetNode, sourceNode, param.point) == false) { return; }
        if (t.treegrid("isParent", { id1: param.source, id2: param.target })) { return; }
        var node = t.treegrid("pop", param.source);
        switch (param.point) {
            case "append": t.treegrid("append", { parent: param.target, data: [node] }); break;
            case "top": t.treegrid("insert", { before: param.target, data: node }); break;
            case "bottom": t.treegrid("insert", { after: param.target, data: node }); break;
            default: t.treegrid("append", { parent: param.target, data: [node] }); break;
        }
        if (node && $.isFunction(opts.onDrop)) { opts.onDrop.call(target, targetNode, sourceNode, param.point); }
    };

    var shiftRow = function (target, param) {
        if (!param || !param.id || !param.point || !$.array.contains(["up", "upLevel", "down", "downLevel"], param.point)) { return; }
        var t = $.util.parseJquery(target), opts = t.treegrid("options"), node;
        switch (param.point) {
            case "up": node = t.treegrid("prevRow", param.id); break;
            case "upLevel": node = t.treegrid("getParent", param.id); break;
            case "down": node = t.treegrid("nextRow", param.id); break;
            case "downLevel": node = t.treegrid("prevRow", param.id); break;
            default: break;
        }
        if (!node) { return; }
        t.treegrid("moveRow", { target: node[opts.idField], source: param.id, point: param.point == "up" ? "top" : (param.point == "downLevel" ? "append" : "bottom") });
    };

    var compareNode = function (target, param) {
        if (isChild(target, param)) { return "child"; }
        if (isParent(target, param)) { return "parent"; }
        if (isSibling(target, param)) { return "sibling"; }
        return "normal";
    };

    var isParent = function (target, param) {
        var t = $.util.parseJquery(target), node = t.treegrid("find", param.id2);
        var children = t.treegrid("getChildren", param.id1);
        return $.array.contains(children, node);
    };

    var isChild = function (target, param) {
        var t = $.util.parseJquery(target), node = t.treegrid("find", param.id1);
        var children = t.treegrid("getChildren", param.id2);
        return $.array.contains(children, node);
    };

    var isSibling = function (target, param) {
        var t = $.util.parseJquery(target), p1 = t.treegrid("getParent", param.id1), p2 = t.treegrid("getParent", param.id2);
        return p1 && p2 && p1 == p2;
    };

    var getNextRow = function (target, id) {
        var t = $.util.parseJquery(target);
        var row = t.treegrid("getRowDom", id).nextAll("tr.datagrid-row:first"), rowId = row.attr("node-id");
        if (!row.length || !rowId) { return null; }
        return t.treegrid("find", rowId);
    };

    var getPrevRow = function (target, id) {
        var t = $.util.parseJquery(target);
        var row = t.treegrid("getRowDom", id).prevAll("tr.datagrid-row:first"), rowId = row.attr("node-id");
        if (!row.length || !rowId) { return null; }
        return t.treegrid("find", rowId);
    };

    var getNears = function (target, id) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options");
        if (t.treegrid("isRoot", id)) { return t.treegrid("getRoots"); }
        var p = t.treegrid("getParent", id);
        if (!p) { return t.treegrid("getRoots"); }
        return t.treegrid("getNearChildren", p[opts.idField]);
    };

    var getNearChildren = function (target, id) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options"),
            children = t.treegrid("getChildren", id);
        return $.array.filter(children, function (val) { return t.treegrid("getParent", val[opts.idField])[opts.idField] == id; });
    };


    var enableRowDnd = function (target) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options");
        t.treegrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable({
            disabled: false, revert: true, cursor: "default", deltaX: 10, deltaY: 5,
            proxy: function (source) {
                var tr = $.util.parseJquery(source), id = tr.attr("node-id"), dom = t.treegrid("getRowDom", id).clone();
                var temp = $("<tr></tr>").addClass("datagrid-row datagrid-row-selected");
                $("<td><span class='tree-dnd-icon tree-dnd-no' ></span></td>").appendTo(temp);
                var td = dom.find("td").each(function (i) { if (i < 6) { temp.append(this); } });
                if (td.length > 6) { $("<td>...</td>").css("width", "40px").appendTo(temp); }
                return $("<table></table>").addClass("tree-node-proxy").appendTo("body").append(temp).hide();
                if (tr.closest("table.datagrid-btable").hasClass("datagrid-btable-frozen")) { return false; }
            }, onBeforeDrag: function (e) {
                var tr = $.util.parseJquery(this), id = tr.attr("node-id"), row = t.treegrid("find", id);
                if ($.isFunction(opts.onBeforeDrag) && opts.onBeforeDrag.call(target, row) == false) { return false; }
                if (e.which != 1) { return false; }
                if (e.target.type == "checkbox") { return false; }
                t.treegrid("getRowDom", { id: id, cascade: true }).droppable({ accept: "no-accept" });
            }, onStartDrag: function () {
                var tr = $.util.parseJquery(this), id = tr.attr("node-id"), row = t.treegrid("find", id);
                tr.draggable("proxy").css({ left: -10000, top: -10000 });
                if ($.isFunction(opts.onBeforeDrag)) { opts.onStartDrag.call(target, row); }
            }, onStopDrag: function () {
                var tr = $.util.parseJquery(this), id = tr.attr("node-id"), row = t.treegrid("find", id);
                t.treegrid("getRowDom", { id: id, cascade: true }).droppable({ accept: "tr.datagrid-row" });
                if ($.isFunction(opts.onStopDrag)) { opts.onStopDrag.call(target, row); }
            }, onDrag: function (e) {
                var x1 = e.pageX, y1 = e.pageY, x2 = e.data.startX, y2 = e.data.startY;
                var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                if (d > 15) { $(this).draggable("proxy").show(); }
                this.pageY = e.pageY;
            }
        }).droppable({
            accept: "tr.datagrid-row",
            onDragEnter: function (e, source) {
                var droper = $.util.parseJquery(this), drager = $.util.parseJquery(source),
                    droperId = droper.attr("node-id"), dragerId = drager.attr("node-id"),
                    droperRow = t.treegrid("find", droperId), dragerRow = t.treegrid("find", dragerId),
                    droperRowDom = t.treegrid("getRowDom", droperId),
                    mark = droperRowDom.find("td"), treeFieldDom = droperRowDom.find("td[field=" + opts.treeField + "]");
                var dnd = droper.data("dnd"), data = {
                    droper: droper, drager: drager, droperId: droperId, dragerId: dragerId,
                    droperRow: droperRow, dragerRow: dragerRow, droperRowDom: droperRowDom, mark: mark, treeFieldDom: treeFieldDom
                };
                if (!dnd) { droper.data("dnd", data); } else { $.extend(dnd, data); }
                if ($.isFunction(opts.onDragEnter) && opts.onDragEnter.call(target, droperRow, dragerRow) == false) {
                    setDroppableStatus(drager, false);
                    mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                    treeFieldDom.removeClass("datagrid-header-cell-append");
                }
            },
            onDragOver: function (e, source) {
                var droper = $.util.parseJquery(this), dnd = droper.data("dnd"), drager = dnd.drager,
                    droperId = dnd.droperId, dragerId = dnd.dragerId,
                    droperRow = dnd.droperRow, dragerRow = dnd.dragerRow,
                    mark = dnd.mark, treeFieldDom = dnd.treeFieldDom;
                if (droper.droppable("options").disabled) { return; }
                var pageY = source.pageY, top = droper.offset().top, height = top + droper.outerHeight();
                setDroppableStatus(drager, !t.treegrid("isParent", { id1: dragerId, id2: droperId }));
                mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                treeFieldDom.removeClass("datagrid-header-cell-append");
                if (pageY > top + (height - top) / 2) {
                    if (height - pageY < 5) {
                        mark.addClass("datagrid-header-cell-bottom");
                    } else {
                        treeFieldDom.addClass("datagrid-header-cell-append");
                    }
                } else {
                    if (pageY - top < 5) {
                        mark.addClass("datagrid-header-cell-top");
                    } else {
                        treeFieldDom.addClass("datagrid-header-cell-append");
                    }
                }
                if (opts.onDragOver.call(target, droperRow, dragerRow) == false) {
                    setDroppableStatus(drager, false);
                    mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                    treeFieldDom.removeClass("datagrid-header-cell-append");
                    droper.droppable("disable");
                }
            },
            onDragLeave: function (e, source) {
                var droper = $.util.parseJquery(this), dnd = droper.data("dnd"), drager = dnd.drager,
                    droperRow = dnd.droperRow, dragerRow = dnd.dragerRow, mark = dnd.mark, treeFieldDom = dnd.treeFieldDom;
                setDroppableStatus(drager, false);
                mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                treeFieldDom.removeClass("datagrid-header-cell-append");
                if ($.isFunction(opts.onDragLeave)) { opts.onDragLeave.call(target, droperRow, dragerRow); }
            },
            onDrop: function (e, source) {
                var droper = $.util.parseJquery(this), dnd = droper.data("dnd"),
                    droperId = dnd.droperId, dragerId = dnd.dragerId, mark = dnd.mark, treeFieldDom = dnd.treeFieldDom,
                    point = treeFieldDom.hasClass("datagrid-header-cell-append") ? "append" : (mark.hasClass("datagrid-header-cell-top") ? "top" : "bottom");
                t.treegrid("moveRow", { target: droperId, source: dragerId, point: point });
                mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                treeFieldDom.removeClass("datagrid-header-cell-append");
            }
        });
        opts.dndRow = true;
        function setDroppableStatus(source, state) {
            var icon = source.draggable("proxy").find("span.tree-dnd-icon");
            icon.removeClass("tree-dnd-yes tree-dnd-no").addClass(state ? "tree-dnd-yes" : "tree-dnd-no");
        };
    };

    var disableRowDnd = function (target) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options");
        t.treegrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable("disable");
        opts.dndRow = false;
    };







    var getRows = function (target, cascade) {
        var t = $.util.parseJquery(target);
        return cascade ? t.treegrid("getData") : t.treegrid("getRoots");
    };

    var getColumnData = function (target, param) {
        param = $.isPlainObject(param) ? param : { field: param, cascade: false };
        var field = param.field, cascade = param.cascade,
            t = $.util.parseJquery(target), rows = t.treegrid("getRows", cascade);
        return $.array.map(rows, function (val) { return val[field]; });
    };

    var getRowDom = function (target, param) {
        param = $.isPlainObject(param) ? param : { id: param, cascade: false };
        var id = param.id, cascade = param.cascade ? true : false,
            t = $.util.parseJquery(target), opts = t.treegrid("options"), panel = t.treegrid("getPanel"),
            dom = panel.find(".datagrid-view .datagrid-body tr.datagrid-row[node-id=" + id + "]");
        if (cascade) {
            var children = t.treegrid("getChildren", id);
            $.each(children, function (i, n) { var d = getRowDom(target, n[opts.idField]); dom = dom.add(d); });
        }
        return dom;
    };

    var getNode = function (target, id) {
        return $.util.parseJquery(target).treegrid("find", id);
    };

    var getCellDom = function (target, pos) {
        if (!pos || !pos.field || pos.id == null || pos.id == undefined) { return $(); }
        var t = $.util.parseJquery(target), tr = t.treegrid("getRowDom", pos.id);
        return tr.find("td[field=" + pos.field + "] .datagrid-cell");
    };
    var getCellData = function (target, pos) {
        if (!pos || !pos.field || pos.id == null || pos.id == undefined) { return undefined; }
        var t = $.util.parseJquery(target), row = t.treegrid("find", pos.id);
        return row[pos.field];
    };
    var getCellDisplay = function (target, pos) {
        var t = $.util.parseJquery(target), cell = t.treegrid("getCellDom", pos);
        return cell && cell.length ? cell.text() : undefined;
    };

    var getDistinctRows = function (target, param) {
        param = $.isPlainObject(param) ? param : { field: param, cascade: false };
        var field = param.field, cascade = param.cascade,
            t = $.util.parseJquery(target), fields = t.treegrid("getColumnFields", "all");
        if (!$.array.contains(fields, field)) { return []; }
        var rows = t.treegrid("getRows", cascade), data = $.array.clone(rows);
        $.array.distinct(data, function (a, b) { return a[field] == b[field]; });
        return data;
    };

    var getDistinctColumnData = function (target, param) {
        param = $.isPlainObject(param) ? param : { field: param, cascade: false };
        var field = param.field, cascade = param.cascade,
            t = $.util.parseJquery(target), fields = t.treegrid("getColumnFields", "all");
        if (!$.array.contains(fields, field)) { return []; }
        var data = t.treegrid("getColumnData", { field: field, cascade: cascade });
        $.array.distinct(data, function (a, b) { return a == b; });
        return data;
    };

    var _find = $.fn.treegrid.methods.find;
    var findRow = function (target, param, grid) {
        var t = grid || $.util.parseJquery(target);
        if (!$.isFunction(param)) { return _find.call(t, t, param); }
        var rows = t.treegrid("getRows", true);
        return $.array.first(rows, param);
    };

    var findRows = function (target, param) {
        var t = $.util.parseJquery(target), ret;
        if ($.isFunction(param)) {
            ret = $.array.filter(t.treegrid("getRows", true), param);
        } else if ($.array.likeArray(param) && !$.util.isString(param)) {
            ret = $.array.map(param, function (val) { return findRow(target, val, t); });
            ret = $.array.filter(ret, function (val) { return val != undefined && val != null; });
        } else {
            ret = [findRow(target, param, t)];
        }
        return ret;
    };

    var showRow = function (target, param, grid, options, extensions, refreshable) {
        var t = grid || $.util.parseJquery(target), opts = options || t.treegrid("options"),
            isFunc = $.isFunction(param), val = isFunc ? findRow(target, param, t) : null,
            id = isFunc ? (val ? val[opts.idField] : null) : ($.isPlainObject(param) && (opts.idField in param) ? param[opts.idField] : param);
        if (id == null || id == undefined) { return; }
        var dom = t.treegrid("getRowDom", { id: id, cascade: true }),
            refreshable = (refreshable == null || refreshable == undefined || refreshable == true) ? true : false;
        if (dom.length) {
            var row = isFunc ? val : t.treegrid("find", id),
                exts = extensions || (opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {}));
            exts.filterData = $.isArray(exts.filterData) ? exts.filterData : exts.filterData = [];
            dom.show();
            $.array.remove(exts.filterData, row);
            var children = t.treegrid("getChildren", id);
            $.each(children, function () { $.array.remove(exts.filterData, this); });
            if (refreshable) { refreshColumnFilterStatus(t, opts, exts, rows); }
        }
    };

    var hideRow = function (target, param, grid, options, extensions, refreshable) {
        var t = grid || $.util.parseJquery(target), opts = options || t.treegrid("options"),
            isFunc = $.isFunction(param), val = isFunc ? findRow(target, param, t) : null,
            id = isFunc ? (val ? val[opts.idField] : null) : ($.isPlainObject(param) && (opts.idField in param) ? param[opts.idField] : param);
        if (id == null || id == undefined) { return; }
        var dom = t.treegrid("getRowDom", { id: id, cascade: true }),
            refreshable = (refreshable == null || refreshable == undefined || refreshable == true) ? true : false;
        if (dom.length) {
            var row = isFunc ? val : t.treegrid("find", id),
                exts = extensions || (opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {}));
            exts.filterData = $.isArray(exts.filterData) ? exts.filterData : exts.filterData = [];
            t.treegrid("unselectRow", { id: id, cascade: true }).treegrid("uncheckRow", { id: id, cascade: true });
            dom.hide();
            $.array.unique(exts.filterData, row, t.treegrid("getChildren", id));
            if (refreshable) { refreshColumnFilterStatus(t, opts, exts, rows); }
        }
    };

    var showRows = function (target, param) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options"), rows = t.treegrid("getRows", true), array,
            exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        if (param === true) {
            exts.filterData = [];
            var panel = t.treegrid("getPanel"), icons = panel.find("div.datagrid-header-filter-item-icon");
            panel.find(".datagrid-view .datagrid-body tr.datagrid-row").show();
            setItemIconCls(icons, "tree-checkbox1");
        } else if ($.isFunction(param)) {
            array = $.array.filter(rows, param);
            array = $.array.map(array, function (val) { return val[opts.idField]; });
        } else if ($.array.likeArray(param) && !$.util.isString(param)) {
            array = param;
        } else { array = [param]; }
        if (array) {
            $.each(array, function (index, val) { showRow(target, val, t, opts, exts, false); });
            refreshColumnFilterStatus(t, opts, exts, t.treegrid("getRows"));
        }
    };

    var hideRows = function (target, param) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options"), rows = t.treegrid("getRows", true), array,
            exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        if (param === true) {
            t.treegrid("unselectAll").treegrid("uncheckAll");
            exts.filterData = $.array.clone(rows);
            var panel = t.treegrid("getPanel"), icons = panel.find("div.datagrid-header-filter-item-icon");
            panel.find(".datagrid-view .datagrid-body tr.datagrid-row").hide();
            setItemIconCls(icons, "tree-checkbox0");
        } else if ($.isFunction(param)) {
            array = $.array.filter(rows, param);
            array = $.array.map(array, function (val) { return val[opts.idField]; });
        } else if ($.array.likeArray(param) && !$.util.isString(param)) {
            array = param;
        } else { array = [param]; }
        if (array) {
            $.each(array, function (index, val) { hideRow(target, val, t, opts, exts, false); });
            refreshColumnFilterStatus(t, opts, exts, t.treegrid("getRows"));
        }
    };

    var getHiddenRows = function (target, cascade) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options"),
            exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        if (cascade) { return exts.filterData; }
        var roots = t.treegrid("getRoots");
        return $.array.filter(exts.filterData, function (val) { return $.array.contains(roots, val); });
    };

    var getVisibleRows = function (target, cascade) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options"), rows = t.treegrid("getRows", cascade),
            exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        return $.array.filter(rows, function (val) { return $.array.contains(exts.filterData, val) ? false : true; });
    };

    var deleteRow = function (target, param) {
        var t = $.util.parseJquery(target);
        if (!$.isFunction(param)) { t.treegrid("remove", param); }
        var rows = t.treegrid("getRows", true), opts = t.treegrid("options"), row = $.array.first(rows, param), id = row ? row[opts.idField] : null;
        t.treegrid("remove", id);
    };

    var deleteRows = function (target, param) {
        var isArray = $.array.likeArray(param) && !$.util.isString(param);
        if (isArray) { $.each(param, function (index, val) { deleteRow(target, val); }); return; }
        if ($.isFunction(param)) {
            var t = $.util.parseJquery(target), opts = t.treegrid("options"), rows = t.treegrid("getRows", true), data = $.array.filter(rows, param);
            $.each(function () {
                var node = findRow(target, this[opts.idField], t);
                if (node != null && node != undefined) { t.treegrid("remove", this[opts.idField]); }
            });
        }
    };

    var setColumnTitle = function (target, param) {
        if (param && param.field && param.title) {
            var t = $.util.parseJquery(target), colOpts = t.treegrid("getColumnOption", param.field);
            colOpts.title = param.title;
            t.datagrid("setColumnTitle", param);
        }
    };

    var _select = $.fn.treegrid.methods.select;
    var _unselect = $.fn.treegrid.methods.unselect;
    var selectRow = function (target, param) {
        param = $.isPlainObject(param) ? param : { id: param, cascade: false };
        var id = param.id, cascade = param.cascade ? true : false, t = $.util.parseJquery(target);
        _select.call(t, t, id);
        if (cascade) {
            var opts = t.treegrid("options");
            $.each(t.treegrid("getChildren", id), function () { _select.call(t, t, this[opts.idField]); });
        }
    };

    var unselectRow = function (target, param) {
        param = $.isPlainObject(param) ? param : { id: param, cascade: false };
        var id = param.id, cascade = param.cascade ? true : false, t = $.util.parseJquery(target);
        _unselect.call(t, t, id);
        if (cascade) {
            var opts = t.treegrid("options");
            $.each(t.treegrid("getChildren", id), function () { _unselect.call(t, t, this[opts.idField]); });
        }
    };

    var checkRow = function (target, param) {
        param = $.isPlainObject(param) ? param : { id: param, cascade: false };
        var id = param.id, cascade = param.cascade ? true : false, t = $.util.parseJquery(target);
        t.datagrid("checkRow", id);
        if (cascade) {
            var opts = t.treegrid("options");
            $.each(t.treegrid("getChildren", id), function () { t.datagrid("checkRow", this[opts.idField]); });
        }
    };

    var uncheckRow = function (target, param) {
        param = $.isPlainObject(param) ? param : { id: param, cascade: false };
        var id = param.id, cascade = param.cascade ? true : false, t = $.util.parseJquery(target);
        t.datagrid("uncheckRow", id);
        if (cascade) {
            var opts = t.treegrid("options");
            $.each(t.treegrid("getChildren", id), function () { t.datagrid("uncheckRow", this[opts.idField]); });
        }
    };


    var setColumnFilter = function (target, columnFilter) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options"),
            exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {}),
            panel = t.treegrid("getPanel"),
            selector = "div.datagrid-view div.datagrid-header tr.datagrid-header-row div.datagrid-header-filter-container";
        if (!columnFilter) {
            var headerFields = panel.find(selector), length = headerFields.length, i = 0;
            headerFields.slideUp("slow", function () {
                if (++i == length) {
                    clearHeaderColumnFilter(t, opts);
                    opts.columnFilter = columnFilter;
                }
            });
        } else {
            opts.columnFilter = columnFilter;
            initHeaderColumnFilterContainer(t, opts, exts);
            $.util.exec(function () {
                panel.find(selector).hide().slideDown("slow");
            });
        }
    };

    var columnFilterSelect = function (target, param) {
        var t = $.util.parseJquery(target);
        if ($.util.isBoolean(param)) { t.treegrid(param ? "showRows" : "hideRows", true); return; }
        if (!param || !param.field) { return; }
        var field = param.field, value = param.value, isArray = $.array.likeArray(value) && !$.util.isString(value),
            finder = isArray ? function (val) { return $.array.contains(value, val[field]); } : function (val) { return value == val[field]; },
            rows = t.treegrid("findRows", finder);
        t.treegrid(param.selected ? "showRows" : "hideRows", rows);
    };

    var setOffset = function (target, offset) {
        var t = $.util.parseJquery(target), opts = t.treegrid("options"),
            exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        opts.offset = exts.offset = $.fn.datagrid.extensions.parseOffset(offset);
        t.datagrid("setOffset", opts.offset);
    };

    var livesearch = function (target, param) {
        var t = $.util.parseJquery(target), panel = t.treegrid("getPanel"), opts = t.treegrid("options"), treeField = opts.treeField,
            cells, field, value = param, regular = false, ignoreCase = true, regexp;
        if ($.isPlainObject(param)) {
            value = param.value;
            field = param.field;
            regular = param.regular;
            ignoreCase = param.ignoreCase;
            cells = panel.find("div.datagrid-body tr.datagrid-row td[" + (field ? "field=" + field : "field") + "] div.datagrid-cell");
        } else {
            cells = panel.find("div.datagrid-body tr.datagrid-row td[field] div.datagrid-cell");
        }
        regexp = regular ? new RegExp(value, ignoreCase ? "gm" : "igm") : value;
        cells.each(function () {
            var cell = $(this), td = cell.parent(), field = td.attr("field");
            if (field == treeField) { cell = cell.find("span.tree-title"); }
            cell.find("span.datagrid-cell-hightlight").replaceWith(function () { return $(this).text(); });
            if (!value) { return; }
            var text = cell.html(); if (!text) { return; }
            cell.html($.string.replaceAll(text, value, "<span class='datagrid-cell-hightlight'>" + value + "</span>"));
        });
    };

    var exportGrid = function (target, isAll) {
        isAll = $.string.toBoolean(isAll);
        alert("\u5BFC\u51FA" + (isAll ? "\u5168\u90E8" : "\u5F53\u524D\u9875") + "\u6570\u636E");
    };

    /************************  initExtend Methods   End  ************************/



    var initRowDndExtensions = $.fn.treegrid.extensions.initRowDndExtensions = function (t, opts) {
        opts = opts || t.treegrid("options");
        if (opts.dndRow) { t.treegrid("enableRowDnd"); }
    };

    /************************  initExtend ColumnFilter Begin  ************************/
    function initHeaderColumnFilterContainer(t, opts, exts) {
        exts = exts || (opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {}));
        $.fn.datagrid.extensions.initColumnExtendProperties(t, exts);
        var data = t.treegrid("getData"), oldData = exts.oldData;
        if (data != oldData) { exts.filterData = []; }
        clearHeaderColumnFilter(t, opts);
        if (!opts.columnFilter) { return; }
        exts.oldData = data;
        var header = t.treegrid("getPanel").find("div.datagrid-view div.datagrid-header"),
            headerRows = header.find("table.datagrid-htable tr.datagrid-header-row"),
            headerFields = headerRows.find("td[field]").filter(function () {
                var td = $(this), colspan = td.attr("colspan");
                return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
            }),
            columnFilter = opts.columnFilter = $.extend({ panelHeight: 100, position: "top" }, opts.columnFilter),
            position = $.array.contains(["top", "bottom"], columnFilter.position) ? columnFilter.position : "top",
            panelHeight = columnFilter.panelHeight = $.isNumeric(columnFilter.panelHeight) && columnFilter.panelHeight >= 60 ? columnFilter.panelHeight : 60,
            height = header.height(), rows = t.treegrid("getRows");
        headerFields.each(function () {
            var td = $(this).addClass("datagrid-header-filter").removeClass("datagrid-header-filter-top datagrid-header-filter-bottom"),
                cell = td.find("div.datagrid-cell").addClass("datagrid-header-filter-cell"),
                field = td.attr("field"), colOpts = t.treegrid("getColumnOption", field), colWidth = colOpts.width,
                line = $("<hr />").addClass("datagrid-header-filter-line")[position == "top" ? "prependTo" : "appendTo"](this),
                container = $("<div></div>").attr("field", field).addClass("datagrid-header-filter-container").css({
                    height: columnFilter.panelHeight, width: colWidth
                })[position == "top" ? "prependTo" : "appendTo"](this);
            td.addClass(position == "top" ? "datagrid-header-filter-top" : "datagrid-header-filter-bottom");
            if (field) { initColumnFilterField(t, opts, exts, container, colOpts, rows, headerFields); }
        });
        if (exts.filterData && exts.filterData.length) {
            t.treegrid("hideRows", exts.filterData);
        } else {
            refreshColumnFilterStatus(t, opts, exts, rows, headerFields);
        }
    };

    function clearHeaderColumnFilter(t, opts) {
        if (!opts.columnFilter) { return; }
        var headerFields = t.treegrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
            var td = $(this), colspan = td.attr("colspan");
            return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
        });
        headerFields.removeClass("datagrid-header-filter datagrid-header-filter-top datagrid-header-filter-bottom").find("div.datagrid-cell").removeClass("datagrid-header-filter-cell");
        headerFields.find("hr.datagrid-header-filter-line,div.datagrid-header-filter-container").remove();
        var fields = t.treegrid("getColumnFields", "all");
        t.datagrid("fixColumnSize", fields[fields.length - 1]);
    };

    function initColumnFilterField(t, opts, exts, container, colOpts, rows, headerFields) {
        if (!colOpts.filterable) { return; }
        var field = colOpts.field, distinctVals = t.treegrid("getDistinctColumnData", field),
            filter = $.array.contains(["checkbox", "livebox", "caps", "lower", "none"], colOpts.filter) ? colOpts.filter : "checkbox",
            precision = colOpts.precision, step = colOpts.step;
        switch (filter) {
            case "checkbox": initColumnFilterFieldCheckBox(t, opts, exts, container, field, rows, distinctVals); break;
            case "livebox": initColumnFilterFieldLiveBox(t, opts, container, field, rows); break;
            case "caps":
                initColumnFilerFieldSlider(t, opts, container, field, step, precision, rows, distinctVals, "<=", opts.columnFilter.panelHeight, headerFields);
                break;
            case "lower":
                initColumnFilerFieldSlider(t, opts, container, field, step, precision, rows, distinctVals, ">=", opts.columnFilter.panelHeight, headerFields);
                break;
            case "none": break;
        }
    };

    function initColumnFilterFieldCheckBox(t, opts, exts, container, field, rows, distinctVals) {
        $.each(distinctVals, function (index, text) {
            var item = $("<div></div>").addClass("datagrid-header-filter-item").attr("text", text).appendTo(container),
                itemText = $("<div></div>").addClass("datagrid-header-filter-item-text").text(text).appendTo(item),
                icon = $("<div></div>").addClass("datagrid-header-filter-item-icon").appendTo(item),
                handler = function () {
                    var filterRows = $.array.filter(rows, function (value) { return value[field] == text; }),
                        filterData = t.treegrid("getHiddenRows"),
                        hiddenRows = $.array.filter(filterData, function (value) { return value[field] == text; });
                    t.treegrid(hiddenRows.length ? "showRows" : "hideRows", $.array.map(filterRows, function (val) { return val[opts.idField]; }));
                };
            item.click(handler);
        });
    };

    function initColumnFilterFieldLiveBox(t, opts, container, field, rows) {
        $("<div></div>").addClass("datagrid-header-filter-livebox-text").text("\u6A21\u7CCA\u8FC7\u6EE4\uFF1A").appendTo(container);
        var input = $("<input />").addClass("datagrid-header-filter-livebox").appendTo(container);
        var btn = $("<a />").linkbutton({ plain: true, iconCls: "icon-search" }).appendTo(container).click(function () {
            t.treegrid("showRows", true);
            var val = input.val();
            if ($.string.isNullOrEmpty(val)) { input.focus(); return; }
            var filterRows = $.array.filter(rows, function (value) { return String(value[field]).indexOf(val) == -1; });
            t.treegrid("hideRows", $.array.map(filterRows, function (val) { return val[opts.idField]; }));
            input.focus();
        });
        $("<a />").linkbutton({ plain: true, iconCls: "icon-undo" }).appendTo(container).click(function () {
            var val = input.val();
            if (val) { input.val("").focus(); btn.click(); } else { input.focus(); }
        });
        input.keypress(function (e) { if (e.which == 13) { btn.click(); } });
    };

    function initColumnFilerFieldSlider(t, opts, container, field, step, precision, rows, distinctVals, type, panelHeight, headerFileds) {
        var array = $.array.map(distinctVals, function (val) { val = parseFloat(val); return $.isNumeric(val) ? val : 0; }),
            min = array.length ? $.array.min(array) : 0, max = array.length ? $.array.max(array) : 0,
            maxPrecisionVal = array.length ? $.array.max(array, function (a, b) {
                return $.util.compare($.number.precision(a), $.number.precision(b));
            }) : 0,
            maxPrecision = array.length ? $.number.precision(maxPrecisionVal) : 0,
            height = panelHeight - 45,
            itemWrap = $("<div></div>").addClass("datagrid-header-filter-itemwrap").text(type).appendTo(container),
            sliderWrap = $("<div></div>").addClass("datagrid-header-filter-sliderwrap").css({
                height: height + 10
            })[type == "<=" ? "appendTo" : "prependTo"](container),
            input = $("<input />").addClass("datagrid-header-filter-numeric").appendTo(itemWrap),
            slider = $("<input />").addClass("datagrid-header-filter-slider").appendTo(sliderWrap),
            handler = function (newValue, oldValue) {
                changeSliderValue(t, opts, field, rows, newValue, type, input, slider, headerFileds);
            };
        input.numberbox({ value: type == "<=" ? max : min, min: min, max: max, precision: precision, onChange: handler });
        input.keypress(function (e) { if (e.which == 13) { var val = input.val(); input.numberbox("setValue", $.isNumeric(val) ? val : 0); } });
        slider.slider({
            height: height, mode: "v", showTip: true, value: type == "<=" ? max : min,
            min: min, max: max, rule: [min, "|", max], step: step, onSlideEnd: handler,
            tipFormatter: function (val) { return $.number.round(val || 0, maxPrecision); }
        });
    };

    function changeSliderValue(t, opts, field, rows, value, type, input, slider, headerFileds) {
        var headerFields = headerFileds || t.treegrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
            var td = $(this), colspan = td.attr("colspan");
            return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
        });
        var headerField = headerFields.filter(function () { return $(this).attr("field") == field; });
        input = input ? input : headerField.find(".datagrid-header-filter-numeric");
        slider = slider ? slider : headerField.find(".datagrid-header-filter-slider");
        var filterRows = $.array.filter(rows, function (val) {
            val = parseFloat(val[field]);
            val = $.isNumeric(val) ? val : 0;
            return type == ">=" ? (val < value) : (val > value);
        });
        t.treegrid("showRows", true).treegrid("hideRows", $.array.map(filterRows, function (val) { return val[opts.idField]; }));
        input.numberbox("setValue", value);
        slider.slider("setValue", value);
    };



    function refreshColumnFilterStatus(t, opts, exts, rows, headerFields) {
        if (!opts.columnFilter) { return; }
        headerFields = headerFields || t.treegrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
            var td = $(this), colspan = td.attr("colspan");
            return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
        });
        headerFields.each(function () {
            var td = $(this), field = td.attr("field");
            refreshColumnFilterCellStatus(t, exts, rows, td, field);
        });
    };

    function refreshColumnFilterCellStatus(t, exts, rows, td, field) {
        var colOpts = t.treegrid("getColumnOption", field), precision = colOpts.precision,
            filter = $.array.contains(["checkbox", "livebox", "caps", "lower", "none"], colOpts.filter) ? colOpts.filter : "checkbox";
        switch (filter) {
            case "checkbox": refreshColumnFilterCheckbox(t, exts, rows, td, field); break;
            case "livebox": refreshColumnFilterLiveBox(t, exts, rows, td, field); break;
            case "caps": refreshColumnFilterCaps(t, exts, rows, td, field); break;
            case "lower": refreshColumnFilterLower(t, exts, rows, td, field); break;
            case "none": break;
        };
    };

    function refreshColumnFilterCheckbox(t, exts, rows, td, field) {
        td.find("div.datagrid-header-filter-item").each(function () {
            var item = $(this), text = item.attr("text"), icon = item.find("div.datagrid-header-filter-item-icon");
            var length = $.array.sum(rows, function (val) { return val[field] == text ? 1 : 0; }),
                filterData = t.treegrid("getHiddenRows"),
                hiddenLength = $.array.sum(filterData, function (val) { return val[field] == text ? 1 : 0; }),
                iconCls = hiddenLength == 0 ? "tree-checkbox1" : (hiddenLength >= length ? "tree-checkbox0" : "tree-checkbox2");
            $.easyui.tooltip.init(item, { content: ($.string.isNullOrEmpty(text) ? "\u7A7A\u767D" : text) + ": \u5171" + length + "\u4E2A\u5143\u7D20" });
            setItemIconCls(icon, iconCls);
        });
    };

    function setItemIconCls(icon, iconCls) { icon.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2").addClass(iconCls); };

    //  \u5F53\u8FC7\u6EE4\u5668\u7EC4\u4EF6\u8FDB\u884C\u503C\u7B5B\u9009\u64CD\u4F5C\u540E\uFF0Clivebox \u4EE5\u53CA slider \u4E0D\u66F4\u65B0\uFF0C\u6240\u4EE5\u4E0B\u9762\u8FD9\u4E09\u4E2A\u65B9\u6CD5\u672A\u5B9E\u73B0\u3002
    function refreshColumnFilterLiveBox(t, exts, rows, td, field) { };
    function refreshColumnFilterCaps(t, exts, rows, td, field) { };
    function refreshColumnFilterLower(t, exts, rows, td, field) { };
    /************************  initExtend ColumnFilter   End  ************************/


    /************************  initContextMenu Begin  ************************/
    function initHeaderContextMenu(t, opts, exts) {
        var dgOpts = t.datagrid("options");
        exts.onHeaderContextMenuBak = opts.onHeaderContextMenu;
        opts.onHeaderContextMenu = dgOpts.onHeaderContextMenu = function (e, field) {
            if ($.isFunction(exts.onHeaderContextMenuBak)) { exts.onHeaderContextMenuBak.apply(this, arguments); }
            if (!opts.enableHeaderContextMenu) { return; }
            var eventData = $.fn.datagrid.extensions.parseContextMenuEventData(t, opts, e),
                items = parseHeaderContextMenuItems(t, opts, exts, e, field, eventData);
            $.easyui.showMenu({ items: items, left: e.pageX, top: e.pageY, hideDisabledMenu: opts.hideDisabledMenu });
            e.preventDefault();
        };
    };

    function initRowContextMenu(t, opts, exts) {
        exts.onContextMenuBak = opts.onContextMenu;
        opts.onContextMenu = function (e, row) {
            if ($.isFunction(exts.onContextMenuBak)) { exts.onContextMenuBak.apply(this, arguments); }
            if (opts.selectOnRowContextMenu) { t.treegrid("select", row[opts.idField]); }
            if (!opts.enableRowContextMenu) { return; }
            var eventData = $.fn.datagrid.extensions.parseContextMenuEventData(t, opts, e),
                items = parseRowContextMenuItems(t, opts, exts, e, row, eventData);
            if (opts.autoBindDblClickRow && opts.dblClickRowMenuIndex >= 0 && $.util.likeArray(opts.rowContextMenu) && !$.util.isString(opts.rowContextMenu)
                && opts.rowContextMenu.length > opts.dblClickRowMenuIndex) {
                items[opts.dblClickRowMenuIndex].bold = true;
            }
            $.easyui.showMenu({ items: items, left: e.pageX, top: e.pageY, hideDisabledMenu: opts.hideDisabledMenu });
            e.preventDefault();
        };
    };

    function initHeaderClickMenu(t, opts, exts) {
        if (!opts.enableHeaderClickMenu) { return; }
        t.treegrid("getPanel").find(".datagrid-view .datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
            var td = $(this), colspan = td.attr("colspan");
            return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
        }).find("div.datagrid-cell").each(function () { initHeaderCellClickMenu(t, opts, exts, this); });
    };

    function initHeaderCellClickMenu(t, opts, exts, cell) {
        cell = $.util.parseJquery(cell); cell.off(".hoverArrow");
        var arrow = $("<span class='s-btn-downarrow datagrid-header-cell-arrow'>&nbsp;</span>").click(function (e) {
            var span = $(this), offset = span.offset(), height = span.outerHeight(),
                    field = span.parent().parent().attr("field"),
                    eventData = $.fn.datagrid.extensions.parseContextMenuEventData(t, opts, e),
                    items = parseHeaderContextMenuItems(t, opts, exts, e, field, eventData);
            var mm = $.easyui.showMenu({ items: items, left: offset.left, top: offset.top + height }),
                    mmOpts = mm.menu("options"), onHide = mmOpts.onHide;
            arrow.hidable = false;
            mmOpts.onHide = function () {
                arrow.hidable = true;
                arrow.removeClass("datagrid-header-cell-arrow-show");
                onHide.apply(this, arguments);
            };
            return false;
        }).prependTo(cell);
        cell.on({
            "mouseenter.hoverArrow": function () { arrow.addClass("datagrid-header-cell-arrow-show"); },
            "mouseleave.hoverArrow": function () { if (!$.util.isBoolean(arrow.hidable) || arrow.hidable) { arrow.removeClass("datagrid-header-cell-arrow-show"); } }
        });
    };


    function parseHeaderContextMenuItems(t, opts, exts, e, field, eventData) {
        var items = [], contextMenu = $.util.likeArray(opts.headerContextMenu) && !$.util.isString(opts.headerContextMenu) ? opts.headerContextMenu : [];
        if (contextMenu.length) { $.array.merge(items, contextMenu); }
        var baseItems = parseHeaderBaseContextMenuItems(t, opts, exts, e, field, eventData);
        if (baseItems.length) { $.array.merge(items, "-", baseItems); }
        //Add by sunliang:\u5728\u5217\u5934\u83DC\u5355\u6700\u540E\u589E\u52A0\u83DC\u5355
        colOpts = t.treegrid("getColumnOption", field);
        var headerContextMenuLast = !!colOpts && $.util.likeArray(colOpts.headerContextMenu) && !$.util.isString(colOpts.headerContextMenu) ? colOpts.headerContextMenu : [];
        if (headerContextMenuLast.length) { $.array.merge(items, "-", headerContextMenuLast); }
        //
        items = $.fn.datagrid.extensions.parseHeaderContextMenuMap(e, field, eventData, items, t);
        if (items[0] == "-") { $.array.removeAt(items, 0); }
        return items;
    };

    function parseRowContextMenuItems(t, opts, exts, e, row, eventData) {
        var items = [], contextMenu = $.util.likeArray(opts.rowContextMenu) && !$.util.isString(opts.rowContextMenu) ? opts.rowContextMenu : [];
        if (contextMenu.length) { $.array.merge(items, contextMenu); }
        var baseItems = parseRowBaseContextMenuItems(t, opts, exts, e, row, eventData);
        if (baseItems.length) { $.array.merge(items, "-", baseItems); }
        items = $.fn.treegrid.extensions.parseRowContextMenuMap(e, row, eventData, items, t);
        if (items[0] == "-") { $.array.removeAt(items, 0); }
        return items;
    };


    function parseHeaderBaseContextMenuItems(t, opts, exts, e, field, eventData) {
        var mm = [], exp = opts.exportMenu,
            colOpts = t.treegrid("getColumnOption", field), sortable = t.treegrid("getColumnOption", field).sortable;
        if (typeof exp == "object") { exp = $.extend({ current: false, all: false, submenu: true }, exp); }
        var m1 = {
            text: "\u5347\u5E8F", iconCls: "icon-standard-hmenu-asc", disabled: sortable != true,
            handler: function () { return t.treegrid("sort", { sortName: field, sortOrder: "asc" }); }
        };
        var m2 = {
            text: "\u964D\u5E8F", iconCls: "icon-standard-hmenu-desc", disabled: sortable != true,
            handler: function () { return t.treegrid("sort", { sortName: field, sortOrder: "desc" }); }
        };
        var m3 = {
            text: "\u663E\u793A/\u9690\u85CF\u5217", iconCls: "icon-standard-application-view-columns", disabled: false, children: [
                {
                    text: "\u663E\u793A\u5168\u90E8\u5217", iconCls: function () {
                        var len = exts.fields ? exts.fields.length : 0;
                        var count = $.array.sum(exts.fieldOptions, function (val) { return val.hidden ? 0 : 1; });
                        return count >= len ? "tree-checkbox1" : (count == 0 ? "tree-checkbox0" : "tree-checkbox2");
                    }, hideOnClick: false, handler: function (e, field, eventData, t, item, menu) {
                        $.each(exts.fields, function () { t.treegrid("showColumn", this); });
                        $(this).parent().children("div.menu-item:not(:eq(1))").each(function () {
                            menu.menu("setIcon", { target: this, iconCls: "tree-checkbox1" });
                            menu.menu("enableItem", this);
                        });
                    }
                },
                {
                    text: "\u8FD8\u539F\u9ED8\u8BA4", iconCls: "icon-standard-application-view-tile", hideOnClick: false, handler: function (e, field, eventData, t, item, menu) {
                        $.each(exts.fieldOptionsBackup, function () { t.treegrid(this.hidden == true ? "hideColumn" : "showColumn", this.field); });
                        var mm = $(this).parent();
                        mm.children("div.menu-item:gt(1)").each(function () {
                            var title = $(this).text(), colOpts = $.array.first(exts.fieldOptions, function (val) { return val.title == title; });
                            if (colOpts) { menu.menu("setIcon", { target: this, iconCls: colOpts.hidden ? "tree-checkbox0" : "tree-checkbox1" }); }
                            menu.menu("enableItem", this);
                        });
                        mm.children("div.menu-item:first").each(function () {
                            var len = exts.fields ? exts.fields.length : 0;
                            var count = $.array.sum(exts.fieldOptions, function (val) { return val.hidden ? 0 : 1; });
                            menu.menu("setIcon", { target: this, iconCls: count >= len ? "tree-checkbox1" : (count == 0 ? "tree-checkbox0" : "tree-checkbox2") });
                        });
                    }
                },
                "-"
            ]
        };
        //var m4 = { text: "\u8FC7\u6EE4/\u663E\u793A", iconCls: "icon-standard-application-view-list", disabled: !colOpts.filterable, children: [] };
        var m5 = { text: "\u5BFC\u51FA\u5F53\u524D\u9875", iconCls: "icon-standard-page-white-put", disabled: !(exp == true || exp.current == true), handler: function () { return t.treegrid("exportExcel", false); } };
        var m6 = { text: "\u5BFC\u51FA\u5168\u90E8", iconCls: "icon-standard-page-white-stack", disabled: !(exp == true || exp.all == true), handler: function () { return t.treegrid("exportExcel", true); } };
        $.util.merge(m3.children, parseHeaderColumnsShowHideMenu(t, opts, exts, e, field, eventData));
        //if (colOpts.filterable) { $.util.merge(m4.children, parseHeaderRowsShowHideMenu(t, opts, exts, e, field, eventData)); }
        $.util.merge(mm, [m1, m2, m3]);
        //$.util.merge(mm, [m1, m2, "-", m3, m4]);
        var expMenu = [m5, m6];
        if (exp) { $.array.merge(mm, "-", typeof exp == "object" && !exp.submenu ? expMenu : { text: "\u5BFC\u51FA\u6570\u636E", iconCls: "icon-standard-page-save", children: expMenu }); }
        return mm;
    };

    function parseHeaderColumnsShowHideMenu(t, opts, exts, e, field, eventData) {
        return $.array.map(exts.fieldOptions, function (val) {
            var handler = function (e, field, eventData, t, item, menu) {
                if (val.field == opts.treeField) { $.messager.show("\u6811\u8282\u70B9\u5217\u4E0D\u80FD\u88AB\u9690\u85CF\u3002"); return; }
                var m = $.util.parseJquery(this),
                    count = m.parent().find(".menu-item:gt(1) .tree-checkbox1").length;
                if ((count == 1 && !val.hidden) || !val.hidable) { return; }
                t.treegrid(val.hidden ? "showColumn" : "hideColumn", val.field);
                menu.menu("setIcon", { target: this, iconCls: val.hidden ? "tree-checkbox0" : "tree-checkbox1" });
                count = $.array.sum(exts.fieldOptions, function (val) { return val.hidden ? 0 : 1; });
                var len = exts.fields ? exts.fields.length : 0;
                menu.menu("setIcon", {
                    target: m.parent().children("div.menu-item:first"),
                    iconCls: count >= len ? "tree-checkbox1" : (count == 0 ? "tree-checkbox0" : "tree-checkbox2")
                });
                var mm = m.parent().find(".menu-item:gt(1)").filter(function () { return $(".tree-checkbox1", this).length ? true : false; });
                mm.each(function () { menu.menu(mm.length > 1 ? "enableItem" : "disableItem", this); });
            };
            return {
                text: val.title || val.field, iconCls: val.hidden ? "tree-checkbox0" : "tree-checkbox1", hideOnClick: false,
                disabled: !val.hidable || val.field == opts.treeField ? true : false, handler: handler
            };
        });
    };

    function parseHeaderRowsShowHideMenu(t, opts, exts, e, field, eventData) {
        var rows = t.treegrid("getRows"), distinctVals = t.treegrid("getDistinctColumnData", field),
            mm = [
                {
                    text: "\u5168\u90E8", hideOnClick: false,
                    iconCls: (!exts.filterData || !exts.filterData.length) ? "tree-checkbox1" : (exts.filterData.length >= rows.length ? "tree-checkbox0" : "tree-checkbox2"),
                    handler: function (e, field, eventData, t, item, menu) {
                        if (exts.filterData && exts.filterData.length) {
                            t.treegrid("showRows", true);
                        } else {
                            t.treegrid("hideRows", true);
                        }
                        $(this).parent().children("div.menu-item[hideOnClick=false]").each(function () {
                            menu.menu("setIcon", { target: this, iconCls: exts.filterData && exts.filterData.length ? "tree-checkbox0" : "tree-checkbox1" });
                        });
                    }
                }, "-"
            ];
        var hasMore = distinctVals.length >= 15, data = hasMore ? $.array.left(distinctVals, 10) : distinctVals;
        var items = $.array.map(data, function (val) {
            var filterRows = $.array.filter(rows, function (value) { return value[field] == val; }),
                filterLength = filterRows.length,
                filterData = t.treegrid("getHiddenRows"),
                hiddenLength = $.array.sum(filterData, function (value) { return value[field] == val ? 1 : 0; }),
                iconCls = !hiddenLength ? "tree-checkbox1" : (hiddenLength >= filterLength ? "tree-checkbox0" : "tree-checkbox2");
            var handler = function (e, field, eventData, t, item, menu) {
                var filterData = t.treegrid("getHiddenRows"),
                    hiddenLength = $.array.sum(filterData, function (value) { return value[field] == val ? 1 : 0; });
                t.treegrid(hiddenLength ? "showRows" : "hideRows", $.array.map(filterRows, function (val) { return val[opts.idField]; }));
                menu.menu("setIcon", { target: this, iconCls: hiddenLength ? "tree-checkbox1" : "tree-checkbox0" });
                $(this).parent().children("div.menu-item:first").each(function () {
                    var filterData = t.treegrid("getHiddenRows");
                    menu.menu("setIcon", {
                        target: this,
                        iconCls: (!exts.filterData.length) ? "tree-checkbox1" : (filterData.length >= rows.length ? "tree-checkbox0" : "tree-checkbox2")
                    });
                });
            };
            return { text: val, iconCls: iconCls, hideOnClick: false, handler: handler };
        });
        $.array.merge(mm, items);
        if (hasMore) {
            var colOpt = t.treegrid("getColumnOption", field), title = colOpt.title ? colOpt.title : colOpt.field, handler = function () {
                var checkAll = $("<input />").attr({ type: "button", value: "\u5168\u90E8\u9009\u62E9" }).click(function () {
                    t.treegrid("showRows", true);
                    $(this).parent().find(":checkbox").each(function () { this.checked = true; });
                })
                var uncheckAll = $("<input />").attr({ type: "button", value: "\u5168\u90E8\u4E0D\u9009" }).click(function () {
                    t.treegrid("hideRows", true);
                    $(this).parent().find(":checkbox").each(function () { this.checked = false; });
                });
                $("<div></div>").append("<div>\u5217\uFF1A" + title + "\uFF0C\u5171" + distinctVals.length + "\u9879</div><hr />").css({
                    padding: "10px"
                }).append(checkAll).append(uncheckAll).append("<hr />").each(function () {
                    var win = $(this), ul = $("<ul></ul>").css({ "list-style-type": "decimal", "padding-left": "40px", "line-height": "18px" }).appendTo(win);
                    $.each(distinctVals, function (index, index) {
                        var id = "itemCheckbox_" + $.util.guid("N"),
                            checked = !$.array.some(exts.filterData, function (val) { return val[field] == text; }),
                            itemWrap = $("<li></li>").appendTo(ul),
                            item = $("<input />").attr({ type: "checkbox", id: id, checked: checked }).appendTo(itemWrap),
                            itemText = $("<label></label>").attr("for", id).text(text).appendTo(itemWrap),
                            handler = function () {
                                var filterRows = $.array.filter(rows, function (val) { return val[field] == text; }),
                                    hiddenLength = $.array.sum(exts.filterData, function (val) { return val[field] == text ? 1 : 0; });
                                t.treegrid(hiddenLength ? "showRows" : "hideRows", $.array.map(filterRows, function (val) { return val[opts.idField]; }));
                            };
                        item.click(handler);
                    });
                }).dialog({
                    title: "\u8FC7\u6EE4/\u663E\u793A", iconCls: "icon-standard-application-view-detail", height: 260, width: 220, left: e.pageX, top: e.pageY,
                    collapsible: false, minimizable: false, maximizable: false, closable: true, modal: true, resizable: true,
                    onClose: function () { $.util.parseJquery(this).dialog("destroy"); }
                }).dialog("open");
            };
            $.array.merge(mm, ["-", { text: "\u5904\u7406\u66F4\u591A(\u5171" + distinctVals.length + "\u9879)...", iconCls: "icon-standard-application-view-detail", handler: handler}]);
        }
        return mm;
    };


    function parseRowBaseContextMenuItems(t, opts, exts, e, row, eventData) {
        var mm = [], paging = opts.pagingMenu, toggle = opts.toggleMenu, move = opts.moveMenu, exp = opts.exportMenu, id = row[opts.idField];
        if (typeof paging == "object") { paging = $.extend({ disabled: false, submenu: true }, paging); }
        if (typeof toggle == "object") {
            toggle = $.extend({ expand: true, expandAll: true, collapse: true, collapseAll: true, submenu: false }, toggle);
        }
        if (typeof move == "object") {
            move = $.extend({ up: false, upLevel: false, down: false, downLevel: false, submenu: false }, move);
        }
        if (typeof exp == "object") { exp = $.extend({ current: false, all: false, submenu: true }, exp); }
        var m1 = {
            text: "\u5237\u65B0\u5F53\u524D\u9875", iconCls: "pagination-load", disabled: !opts.refreshMenu,
            handler: function () { t.treegrid("reload"); }
        };
        var m2 = {
            text: "\u9996\u9875", iconCls: "pagination-first", disabled: function () { return !opts.pagination || eventData.page <= 1; },
            handler: function () { if (eventData.page > 1) { eventData.pager.pagination("select", 1); } }
        };
        var m3 = {
            text: "\u4E0A\u4E00\u9875", iconCls: "pagination-prev", disabled: function () { return !opts.pagination || eventData.page <= 1; },
            handler: function () { if (eventData.page > 1) { eventData.pager.pagination("select", eventData.page - 1); } }
        };
        var m4 = {
            text: "\u4E0B\u4E00\u9875", iconCls: "pagination-next", disabled: function () { return !opts.pagination || eventData.page >= eventData.pageCount; },
            handler: function () { if (eventData.page < eventData.pageCount) { eventData.pager.pagination("select", eventData.page + 1); } }
        };
        var m5 = {
            text: "\u672B\u9875", iconCls: "pagination-last", disabled: function () { return !opts.pagination || eventData.page >= eventData.pageCount; },
            handler: function () { if (eventData.page < eventData.pageCount) { eventData.pager.pagination("select", eventData.pageCount); } }
        };

        var m6 = { text: "\u5C55\u5F00\u5F53\u524D\u6240\u6709", iconCls: "icon-metro-expand", disabled: !(toggle == true || toggle.expandAll == true), handler: function () { t.treegrid("expandAll", id); } };
        var m7 = { text: "\u5C55\u5F00\u5F53\u524D", iconCls: "icon-metro-expand2", disabled: !(toggle == true || toggle.expand == true), handler: function () { t.treegrid("expand", id); } };
        var m8 = { text: "\u6298\u53E0\u5F53\u524D", iconCls: "icon-metro-contract2", disabled: !(toggle == true || toggle.collapse == true), handler: function () { t.treegrid("collapse", id); } };
        var m9 = { text: "\u6298\u53E0\u5F53\u524D\u6240\u6709", iconCls: "icon-metro-contract", disabled: !(toggle == true || toggle.collapseAll == true), handler: function () { t.treegrid("collapseAll", id); } };
        var m10 = { text: "\u4E0A\u79FB\u4E00\u7EA7", iconCls: "icon-standard-arrow-up", disabled: !(move == true || move.upLevel == true), handler: function () { t.treegrid("shiftRow", { point: "upLevel", id: id }); } };
        var m11 = { text: "\u4E0A\u79FB", iconCls: "icon-standard-up", disabled: !(move == true || move.up == true), handler: function () { t.treegrid("shiftRow", { point: "up", id: id }); } };
        var m12 = { text: "\u4E0B\u79FB", iconCls: "icon-standard-down", disabled: !(move == true || move.down == true), handler: function () { t.treegrid("shiftRow", { point: "down", id: id }); } };
        var m13 = { text: "\u4E0B\u79FB\u4E00\u7EA7", iconCls: "icon-standard-arrow-down", disabled: !(move == true || move.downLevel == true), handler: function () { t.treegrid("shiftRow", { point: "downLevel", id: id }); } };
        var m14 = { text: "\u5BFC\u51FA\u5F53\u524D\u9875", iconCls: "icon-standard-page-white-put", disabled: !(exp == true || exp.current == true), handler: function () { return t.treegrid("exportExcel", false); } };
        var m15 = { text: "\u5BFC\u51FA\u5168\u90E8", iconCls: "icon-standard-page-white-stack", disabled: !(exp == true || exp.all == true), handler: function () { return t.treegrid("exportExcel", true); } };
        mm.push(m1);
        var pagingMenu = [m2, m3, m4, m5], toggleMenu = [m6, m7, m8, m9], moveMenu = [m10, m11, m12, m13], expMenu = [m14, m15];
        if (t.treegrid("isRoot", id)) {
            $.array.insertRange(toggleMenu, 0, [
                { text: "\u5C55\u5F00\u6240\u6709", iconCls: "icon-standard-arrow-out", handler: function () { t.treegrid("expandAll"); } },
                { text: "\u6298\u53E0\u6240\u6709", iconCls: "icon-standard-arrow-in", handler: function () { t.treegrid("collapseAll"); } }, "-"
            ]);
        }
        if (paging) { $.array.merge(mm, "-", typeof paging == "object" && !paging.submenu ? pagingMenu : { text: "\u7FFB\u9875", iconCls: "", disabled: !(paging == true || !paging.disabled), children: pagingMenu }); }
        if (toggle) { $.array.merge(mm, "-", typeof toggle == "object" && !toggle.submenu ? toggleMenu : { text: "\u5C55\u5F00/\u6298\u53E0", iconCls: "", disabled: !toggle, children: toggleMenu }); }
        if (move) { $.array.merge(mm, "-", typeof move == "object" && !move.submenu ? moveMenu : { text: "\u4E0A/\u4E0B\u79FB\u52A8", iconCls: "", disabled: !move, children: moveMenu }); }
        if (exp) { $.array.merge(mm, "-", typeof exp == "object" && !exp.submenu ? expMenu : { text: "\u5BFC\u51FA\u6570\u636E", iconCls: "icon-standard-page-save", disabled: !exp, children: expMenu }); }
        return mm;
    };


    var parseRowContextMenuMap = $.fn.treegrid.extensions.parseRowContextMenuMap = function (e, row, eventData, contextMenu, t) {
        return $.array.map(contextMenu, function (value, index) {
            if (!value || $.util.isString(value)) { return value; }
            var ret = $.extend({}, value);
            ret.id = $.isFunction(value.id) ? value.id.call(ret, e, row, eventData, t) : value.id;
            ret.text = $.isFunction(value.text) ? value.text.call(ret, e, row, eventData, t) : value.text;
            ret.iconCls = $.isFunction(value.iconCls) ? value.iconCls.call(ret, e, row, eventData, t) : value.iconCls;
            ret.disabled = $.isFunction(value.disabled) ? value.disabled.call(ret, e, row, eventData, t) : value.disabled;
            ret.hideOnClick = $.isFunction(value.hideOnClick) ? value.hideOnClick.call(ret, e, row, eventData, t) : value.hideOnClick;
            ret.onclick = $.isFunction(value.onclick) ? function (e, item, menu) { value.onclick.call(this, e, row, eventData, t, item, menu); } : value.onclick;
            ret.handler = $.isFunction(value.handler) ? function (e, item, menu) { value.handler.call(this, e, row, eventData, t, item, menu); } : value.handler;
            if (ret.children && ret.children.length) { ret.children = parseRowContextMenuMap(e, row, eventData, ret.children, t); }
            return ret;
        });
    };
    /************************  initContextMenu   End  ************************/


    /************************  initDblClickRow Begin  ************************/
    function initDblClickRowEvent(t, opts, exts) {
        exts.onDblClickRowBak = opts.onDblClickRow;
        opts.onDblClickRow = function (row) {
            if ($.isFunction(exts.onDblClickRowBak)) { exts.onDblClickRowBak.apply(this, arguments); }
            //  t.treegrid("select", row[opts.idField]);
            var eventData = $.fn.datagrid.extensions.parseContextMenuEventData(t, opts, null);
            items = parseRowContextMenuItems(t, opts, exts, null, row, eventData);
            if (opts.autoBindDblClickRow && opts.dblClickRowMenuIndex >= 0 && $.util.likeArray(opts.rowContextMenu)
                && !$.util.isString(opts.rowContextMenu) && opts.rowContextMenu.length > opts.dblClickRowMenuIndex) {
                var item = items[opts.dblClickRowMenuIndex], handler = item.handler || item.onclick;
                return handler(null, row, eventData, t, item, null);
            }
            if (opts.autoEditing) { t.treegrid("beginEdit", row[opts.idField]); }
        };
    };
    /************************  initDblClickRow   End  ************************/

    var initTreeGridExtensions = $.fn.treegrid.extensions.initTreeGridExtensions = function (t, opts, exts) {
        opts = opts || t.treegrid("options");
        exts = exts || (opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {}));

        exts.onClickRowBak = opts.onClickRow;
        opts.onClickRow = function (row) {
            if ($.isFunction(exts.onClickRowBak)) { exts.onClickRowBak.apply(this, arguments); }
            if (opts.toggleOnClick) { t.treegrid("toggle", row[opts.idField]); }
        };

        exts.onCheckBak = opts.onCheck;
        opts.onCheck = function (row) {
            if ($.isFunction(exts.onCheckBak)) { exts.onCheckBak.apply(this, arguments); }
            if (opts.cascadeCheck) {
                if (opts.checkOnSelect && opts.singleSelect) { return; }
                var idField = opts.idField, id = row[idField], children, checked, parent = t.treegrid("getParent", id);
                while (parent) {
                    children = t.treegrid("getChildren", parent[idField]);
                    checked = t.treegrid("getChecked");
                    if (!$.array.some(children, function (val) { return !$.array.contains(checked, val); })) {
                        if (!t.treegrid("isChecked", parent[idField])) { t.treegrid("check", parent[idField]); }
                    }
                    parent = t.treegrid("getParent", parent[idField]);
                }
                $.each(t.treegrid("getChildren", id), function (i, n) {
                    if (!t.treegrid("isChecked", n[idField])) { t.treegrid("check", n[idField]); }
                });
            }
        };

        exts.onUncheckBak = opts.onUncheck;
        opts.onUncheck = function (row) {
            if ($.isFunction(exts.onUncheckBak)) { exts.onUncheckBak.apply(this, arguments); }
            if (opts.cascadeCheck) {
                if (opts.checkOnSelect && opts.singleSelect) { return; }
                var idField = opts.idField, id = row[idField], children, checked, parent = t.treegrid("getParent", id);
                while (parent) {
                    children = t.treegrid("getChildren", parent[idField]);
                    checked = t.treegrid("getChecked");
                    if (!$.array.some(children, function (val) { return $.array.contains(checked, val); })) {
                        if (t.treegrid("isChecked", parent[idField])) { t.treegrid("uncheck", parent[idField]); }
                    }
                    parent = t.treegrid("getParent", parent[idField]);
                }
                $.each(t.treegrid("getChildren", id), function (i, n) {
                    t.treegrid("uncheck", n[idField]);
                });
            }
        };
    };


    /************************  initExtend initColumnTooltip Begin  ************************/
    var initColumnTooltip = function (t, opts) {
        t.treegrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").each(function () {
            var tr = $(this), id = tr.attr("node-id"), row = t.treegrid("find", id);
            initColumnRowTooltip(t, opts, id, row, tr);
        });
    };

    var initColumnRowTooltip = function (t, opts, id, row, tr) {
        tr = tr || t.treegrid("getRowDom", id);
        if (opts.rowTooltip) {
            var onShow = function (e) {
                var tt = $(this), text = $.isFunction(opts.rowTooltip) ? opts.rowTooltip.call(tt, row) : buildText(row);
                tt.tooltip("update", text);
            };
            tr.each(function () { $.easyui.tooltip.init(this, { onShow: onShow }); });
        } else {
            tr.children("td[field]").each(function () {
                var td = $(this), field = td.attr("field"), colOpts = t.treegrid("getColumnOption", field);
                if (!colOpts || !colOpts.tooltip) { return; }
                var cell = td.find("div.datagrid-cell"), onShow = function (e) {
                    var tt = $(this), text = $.isFunction(colOpts.tooltip) ? colOpts.tooltip.call(cell, row[field], id, row) : row[field];
                    tt.tooltip("update", text);
                };
                $.easyui.tooltip.init(cell, { onShow: onShow });
            });
        }
        function buildText(row) {
            var cols = t.treegrid("getColumns", "all"), content = $("<table></table>").css({ padding: "5px" }); ;
            $.each(cols, function (i, colOpts) {
                if (!colOpts || !colOpts.field || !colOpts.title) { return; }
                var msg = t.treegrid("getCellDisplay", { field: colOpts.field, id: id });
                content.append("<tr><td style='text-align: right; width: 150px;'>" + colOpts.title + ":</td><td style='width: 250px;'>" + msg + "</td></tr>");
            });
            return content;
        };
    };
    /************************  initExtend initColumnTooltip   End  ************************/


    /************************  initExtend initColumnTooltip   End  ************************/
    var initializeRowExtEditor = function (t, opts, id) {
        if (!opts.extEditing) { return; }
        var tr = t.treegrid("getRowDom", id);
        if (!tr.length) { return; }
        var view = t.treegrid("getPanel").find("div.datagrid-view"),
            view1 = view.find("div.datagrid-view1"),
            view2 = view.find("div.datagrid-view2"),
            body = view2.find("div.datagrid-body"),
            width = view1.outerWidth(), pos = view.position(),
            left = diff > 0 ? diff : 0;
        body.css("position", "relative");
        var height = tr.outerHeight(),
            top = tr.position().top + height + body.scrollTop() - view2.find("div.datagrid-header").outerHeight();
        var p = $("<div></div>").addClass("dialog-button datagrid-rowediting-panel").appendTo(body).css({
            "position": "absolute",
            "display": "block",
            "border": "1px solid #ddd",
            "top": top,
            "padding": '5px 5px'
        }).attr("node-id", id);
        $("<a></a>").linkbutton({ plain: false, iconCls: "icon-ok", text: "\u4FDD\u5B58" }).appendTo(p).click(function () { t.treegrid("endEdit", id); });
        $("<a></a>").linkbutton({ plain: false, iconCls: "icon-cancel", text: "\u53D6\u6D88" }).appendTo(p).click(function () { t.treegrid("cancelEdit", id); });
        var diff = (opts.width - p.outerWidth()) / 2 - width, left = diff > 0 ? diff : 0;
        p.css("left", left);
    };

    var removeRowExtEditor = function (t, body, id) {
        body = body || t.treegrid("getPanel").find("div.datagrid-view div.datagrid-view2 div.datagrid-body");
        body.find("div.datagrid-rowediting-panel[node-id=" + id + "]").remove();
    };

    var disposeRowExtEditor = function (t, opts, id) {
        if (!opts.extEditing) { return; }
        body = t.treegrid("getPanel").find("div.datagrid-view div.datagrid-view2 div.datagrid-body");
        removeRowExtEditor(t, body, id);
    };

    var initSingleEditing = function (t, opts, id) {
        var exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        if (opts.singleEditing) { t.treegrid("endEdit", exts.lastEditingId); }
        exts.lastEditingId = id;
    };
    /************************  initExtend ExtEditor Begin  ************************/



    /******************** initExtensions Begin ********************/
    var initExtensions = $.fn.treegrid.extensions.initExtensions = function (t, opts) {
        var exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        if (exts._initialized) { return; }

        var fields = t.treegrid("getColumnFields", false);
        exts.fields = $.array.filter(fields, function (val) { return t.treegrid("getColumnOption", val).title ? true : false; });
        exts.fieldOptions = $.array.map(exts.fields, function (val) { return t.treegrid("getColumnOption", val); });
        exts.fieldOptionsBackup = $.array.map(exts.fieldOptions, function (val) { return $.extend({}, val); });
        exts.filterData = [];

        initColumnExtensions();
        initOffset();
        initContextMenu();
        initDblClickRow();
        initTreeExtensions();
        function initColumnExtensions() { $.fn.datagrid.extensions.initColumnExtendProperties(t, exts); };
        function initOffset() { t.treegrid("setOffset", opts.offset); };
        function initContextMenu() { initHeaderContextMenu(t, opts, exts); initRowContextMenu(t, opts, exts); initHeaderClickMenu(t, opts, exts); };
        function initDblClickRow() { initDblClickRowEvent(t, opts, exts); };
        function initTreeExtensions() { initTreeGridExtensions(t, opts, exts); };

        var rows = t.datagrid("getRows");
        if (!rows || !rows.length) { initHeaderColumnFilterContainer(t, opts, exts); }

        exts._initialized = true;
    };

    var clearFilterData = $.fn.treegrid.extensions.clearFilterData = function (opts) {
        var exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        exts.filterData = [];
    };

    var loader = $.fn.treegrid.extensions.loader = function (param, success, error) {
        var t = $.util.parseJquery(this), opts = t.treegrid("options");
        initExtensions(t, opts);
        if (!opts.url) { return false; }
        param = $.fn.datagrid.extensions.parsePagingQueryParams(opts, param);
        $.ajax({
            type: opts.method, url: opts.url, data: param, dataType: "json",
            success: function (data) { $.fn.treegrid.extensions.clearFilterData(opts); success(data); },
            error: function () { error.apply(this, arguments); }
        });
    };

    var _onLoadSuccess = $.fn.treegrid.defaults.onLoadSuccess;
    var onLoadSuccess = $.fn.treegrid.extensions.onLoadSuccess = function (data) {
        if ($.isFunction(_onLoadSuccess)) { _onLoadSuccess.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.treegrid("options"),
            exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        initHeaderColumnFilterContainer(t, opts, exts);
        initRowDndExtensions(t, opts);
        initColumnTooltip(t, opts);
    };

    var _onResizeColumn = $.fn.treegrid.defaults.onResizeColumn;
    var onResizeColumn = $.fn.treegrid.extensions.onResizeColumn = function (field, width) {
        if ($.isFunction(_onResizeColumn)) { _onResizeColumn.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.treegrid("options");
        if (opts.columnFilter) {
            var panel = t.treegrid("getPanel"), colOpts = t.treegrid("getColumnOption", field),
                container = panel.find("div.datagrid-header-filter-container[field=" + field + "]");
            container.width(colOpts.width);
        }
    };

    var _onBeforeEdit = $.fn.treegrid.defaults.onBeforeEdit;
    var onBeforeEdit = $.fn.treegrid.extensions.onBeforeEdit = function (row) {
        if ($.isFunction(_onBeforeEdit)) { _onBeforeEdit.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.datagrid("options");
        initializeRowExtEditor(t, opts, row[opts.idField]);
        initSingleEditing(t, opts, row[opts.idField]);
        t.treegrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable("disable");
    }

    var _onAfterEdit = $.fn.treegrid.defaults.onAfterEdit;
    var onAfterEdit = $.fn.treegrid.extensions.onAfterEdit = function (row, changes) {
        if ($.isFunction(_onAfterEdit)) { _onAfterEdit.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.treegrid("options"),
            exts = opts._extensionsTreegrid ? opts._extensionsTreegrid : (opts._extensionsTreegrid = {});
        disposeRowExtEditor(t, opts, row[opts.idField]);
        initHeaderColumnFilterContainer(t, opts, exts);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, row[opts.idField], row);
    }

    var _onCancelEdit = $.fn.treegrid.defaults.onCancelEdit;
    var onCancelEdit = $.fn.treegrid.extensions.onCancelEdit = function (row) {
        if ($.isFunction(_onCancelEdit)) { _onCancelEdit.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.treegrid("options");
        disposeRowExtEditor(t, opts, row[opts.idField]);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, row[opts.idField], row);
    };
    /******************** initExtensions   End ********************/



    var _loadFilter = $.fn.treegrid.defaults.loadFilter;
    var loadFilter = $.fn.treegrid.extensions.loadFilter = function (data, parent) {
        if ($.isFunction(_loadFilter)) { data = _loadFilter.apply(this, arguments); }
        var isArray = $.array.likeArray(data) && !$.util.isString(data), rows = isArray ? data : data.rows;
        if (!rows.length) { return data; }
        var t = $.util.parseJquery(this), opts = t.treegrid("options");
        rows = opts.smooth ? $.fn.tree.extensions.smoothConverter(rows, opts) : rows;
        if (parent != null && parent != undefined) { return isArray ? rows : { total: rows.length, rows: rows }; }
        return isArray ? rows : { total: data.length || rows.length, rows: rows };
    };

    var _onExpand = $.fn.treegrid.defaults.onExpand;
    var onExpand = $.fn.treegrid.extensions.onExpand = function (row) {
        if ($.isFunction(_onExpand)) { _onExpand.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.treegrid("options");
        if (opts.onlyNodeExpand) {
            var rows = t.treegrid("getNears", row[opts.idField]), animate = opts.animate
            opts.animate = false;
            $.each($.array.filter(rows, function (val) { return val[opts.idField] != row[opts.idField] && val.state == "open"; }), function () {
                t.treegrid("collapse", this[opts.idField]);
            });
            opts.animate = animate;
        }
    };


    var methods = $.fn.treegrid.extensions.methods = {

        //  \u8986\u76D6 easyui-treegrid \u7684\u539F\u751F\u65B9\u6CD5\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u5C5E\u6027、\u4E8B\u4EF6\u548C\u6269\u5C55\u529F\u80FD\uFF1B
        update: function (jq, param) { return jq.each(function () { updateRow(this, param); }); },

        //  \u8986\u76D6 easyui-treegrid \u7684\u539F\u751F\u65B9\u6CD5\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u5C5E\u6027、\u4E8B\u4EF6\u548C\u6269\u5C55\u529F\u80FD\uFF1B
        append: function (jq, param) { return jq.each(function () { appendRow(this, param); }); },

        //  \u8986\u76D6 easyui-treegrid \u7684\u539F\u751F\u65B9\u6CD5\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u5C5E\u6027、\u4E8B\u4EF6\u548C\u6269\u5C55\u529F\u80FD\uFF1B
        insert: function (jq, param) { return jq.each(function () { insertRow(this, param); }); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u6307\u5B9A\u7684 tree-node \u662F\u5426\u88AB check\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 id \u8868\u793A\u8981\u5224\u65AD\u7684\u8282\u70B9\u7684 idField \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u53C2\u6570 id \u6240\u8868\u793A\u7684 tree-node \u88AB check\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isChecked: function (jq, id) { return isChecked(jq[0], id); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u6307\u5B9A\u7684 tree-node \u662F\u5426\u88AB select\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 id \u8868\u793A\u8981\u5224\u65AD\u7684\u8282\u70B9\u7684 idField \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u53C2\u6570 id \u6240\u8868\u793A\u7684 tree-node \u88AB select\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isSelected: function (jq, id) { return isSelected(jq[0], id); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u6307\u5B9A\u7684 tree-node \u662F\u5426\u4E3A\u6839\u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      id: \u7528\u4E8E\u5224\u65AD\u7684 tree-node \u5BF9\u8C61\u7684 idField \u503C\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u6307\u5B9A\u7684 jQuery \u5BF9\u8C61\u662F\u8BE5 easyui-treegrid \u7684\u6839\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isRoot: function (jq, id) { return isRootNode(jq[0], id); },

        //  \u91CD\u5199 easyui-treegrid \u7684\u65B9\u6CD5 getLevel\uFF1B\u4FEE\u590D\u8BE5\u65B9\u6CD5\u7684\u90E8\u5206 BUG\uFF1B\u7528\u4E8E\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u7684\u7EA7\u522B\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 target \u8868\u793A\u8981\u83B7\u53D6\u7EA7\u522B\u7684\u8282\u70B9\u7684 idField \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C id \u8868\u793A\u7684\u8282\u70B9\u5B58\u5728\u4E8E\u6B64 easyui-treegrid\uFF0C\u5219\u8FD4\u56DE\u8868\u793A\u5176\u6240\u5728\u8282\u70B9\u7EA7\u522B\u7684\u6570\u5B57(\u4ECE 1 \u5F00\u59CB\u8BA1\u6570)\uFF0C\u5426\u5219\u8FD4\u56DE 0\u3002
        getLevel: function (jq, id) { return getLevel(jq[0], id); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u51BB\u7ED3\u6307\u5B9A\u7684\u5217\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 field \u8868\u793A\u8981\u51BB\u7ED3\u7684\u5217\u7684 field \u503C\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        //  \u6CE8\u610F\uFF1A\u6B64\u65B9\u6CD5\u5728\u591A\u884C\u8868\u5934\u60C5\u51B5\u4E0B\u65E0\u6548\u3002
        //      \u5F53\u524D\u8868\u683C\u5728\u6267\u884C\u6B64\u65B9\u6CD5\u524D\u5FC5\u987B\u5B58\u5728\u81F3\u5C11\u4E00\u4E2A\u51BB\u7ED3\u5217\uFF0C\u5426\u5219\u6B64\u65B9\u6CD5\u65E0\u6548\uFF1B
        freezeColumn: function (jq, field) { return jq.each(function () { freezeColumn(this, field); }); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u53D6\u6D88\u51BB\u7ED3\u6307\u5B9A\u7684\u5217\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 field \u8868\u793A\u8981\u53D6\u6D88\u51BB\u7ED3\u7684\u5217\u7684 field \u503C\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        //  \u6CE8\u610F\uFF1A\u6B64\u65B9\u6CD5\u5728\u591A\u884C\u8868\u5934\u60C5\u51B5\u4E0B\u65E0\u6548\u3002
        //      \u5F53\u524D\u8868\u683C\u5728\u6267\u884C\u6B64\u65B9\u6CD5\u524D\u5FC5\u987B\u5B58\u5728\u81F3\u5C11\u4E00\u4E2A\u975E\u51BB\u7ED3\u5217\uFF0C\u5426\u5219\u6B64\u65B9\u6CD5\u65E0\u6548\uFF1B
        unfreezeColumn: function (jq, field) { return jq.each(function () { unfreezeColumn(this, field); }); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u79FB\u52A8\u6307\u5B9A\u7684\u5217\u5230\u53E6\u4E00\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u4E3A\u4E00\u4E2A JSON-Object\uFF0C\u5B9A\u4E49\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      target: \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u5217\u7684 field \u503C\uFF1B
        //      source: \u8868\u793A\u8981\u79FB\u52A8\u7684\u5217\u7684 field \u503C\uFF1B
        //      point:  \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u5217\u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u9009\u7684\u503C\u5305\u62EC\uFF1A
        //          before: \u8868\u793A\u5C06 source \u5217\u79FB\u52A8\u81F3 target \u5217\u7684\u5DE6\u4FA7\uFF1B
        //          after:  \u8868\u793A\u5C06 source \u5217\u79FB\u52A8\u503C target \u5217\u7684\u53F3\u4FA7\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        //  \u6CE8\u610F\uFF1A\u6B64\u65B9\u6CD5\u5728\u591A\u884C\u8868\u5934\u60C5\u51B5\u4E0B\u65E0\u6548\u3002
        moveColumn: function (jq, param) { return jq.each(function () { moveColumn(this, param); }); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u79FB\u52A8\u6307\u5B9A\u7684\u5217\u632A\u52A8\u4E00\u683C\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u4E3A\u4E00\u4E2A JSON-Object\uFF0C\u5B9A\u4E49\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      field:  \u8868\u793A\u8981\u632A\u52A8\u7684\u5217\u7684 field \u503C\uFF1B
        //      porint: \u8868\u793A\u632A\u52A8 field \u5217\u7684\u65B9\u5F0F\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u9009\u7684\u503C\u5305\u62EC\uFF1A
        //          before: \u8868\u793A\u5C06\u8BE5\u5217\u5411\u5DE6\u632A\u52A8\u4E00\u683C\uFF1B
        //          after:  \u8868\u793A\u5C06\u8BE5\u5217\u5411\u53F3\u632A\u52A8\u4E00\u683C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        //  \u6CE8\u610F\uFF1A\u6B64\u65B9\u6CD5\u5728\u591A\u884C\u8868\u5934\u60C5\u51B5\u4E0B\u65E0\u6548\u3002
        shiftColumn: function (jq, param) { return jq.each(function () { shiftColumn(this, param); }); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5220\u9664\u6307\u5B9A\u7684\u5217\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 field \u8868\u793A\u8981\u5220\u9664\u7684\u5217\u7684 field \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        deleteColumn: function (jq, field) { return jq.each(function () { deleteColumn(this, field); }); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5220\u9664\u6307\u5B9A\u7684\u5217\u5E76\u8FD4\u56DE\u8BE5\u5217\u7684 ColumnOption \u503C\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 field \u8868\u793A\u8981\u5220\u9664\u7684\u5217\u7684 field \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u53C2\u6570 field \u503C\u6240\u8868\u793A\u7684\u5217\u7684 ColumnOption \u503C\u3002\u5982\u679C\u5F53\u524D easyui-treegrid \u4E0D\u5B58\u5728\u8BE5\u5217\uFF0C\u5219\u8FD4\u56DE null\u3002
        popColumn: function (jq, field) { return popColumn(jq[0], param); },


        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u79FB\u52A8\u6307\u5B9A\u7684\u8282\u70B9\u5230\u53E6\u4E00\u4E2A\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param:   \u8FD9\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          target: \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u7684 tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //          source: \u8868\u793A\u8981\u79FB\u52A8\u7684 tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //          point:  \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u9009\u7684\u503C\u5305\u62EC\uFF1A
        //              "append":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u8282\u70B9 target \u7684\u5B50\u8282\u70B9\uFF0C\u9ED8\u8BA4\u503C\uFF1B
        //              "top":      \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4E0A\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //              "bottom":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u8282\u70B9 target \u7684\u4E0B\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u5BF9\u8C61\u3002
        moveRow: function (jq, param) { return jq.each(function () { moveRow(this, param); }); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u79FB\u52A8\u6307\u5B9A\u8282\u70B9\u7684\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u4E3A\u4E00\u4E2A JSON-Object \u7C7B\u578B\u5BF9\u8C61\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      id: \u8868\u793A\u8981\u79FB\u52A8\u7684 tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //      point:  \u8868\u793A\u79FB\u52A8 target \u7684\u65B9\u5F0F\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u9009\u7684\u503C\u62A5\u9519\uFF1A
        //      "up":       \u8868\u793A\u5C06 target \u6240\u8868\u793A\u7684 tree-node \u79FB\u52A8\u5230\u4E0A\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //      "upLevel":  \u8868\u793A\u5C06 target \u6240\u8868\u793A\u7684 tree-node \u79FB\u52A8\u5230\u4E0A\u4E00\u7EA7\u7684\u672B\u5C3E\uFF1B
        //      "down":     \u8868\u793A\u5C06 target \u6240\u8868\u793A\u7684 tree-node \u79FB\u52A8\u5230\u4E0B\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //      "downLevel":\u8868\u793A\u5C06 target \u6240\u8868\u793A\u7684 tree-node \u79FB\u52A8\u5230\u4E0B\u4E00\u7EA7\u7684\u672B\u5C3E\uFF1B
        //      \u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u503C\u6216\u8005\u8BE5\u503C\u4E3A\u7A7A\u6216\u8BE5\u503C\u4E0D\u662F\u4E0A\u9762\u56DB\u4E2A\u4E4B\u4E00\uFF0C\u5219\u4E0D\u8FDB\u884C\u4EFB\u4F55\u64CD\u4F5C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-tree \u7EC4\u4EF6\u7684 jQuery \u5BF9\u8C61\u3002
        shiftRow: function (jq, param) { return jq.each(function () { shiftRow(this, param); }); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u4E24\u4E2A tree-node \u4E4B\u95F4\u7684\u5173\u7CFB\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param\uFF1A  \u8FD9\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          id1:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E00\u4E2A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //          id2:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E8C\u4E2A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A String \u7C7B\u578B\u7684\u503C\uFF1A
        //      \u5982\u679C id1 \u662F id2 \u7684\u5B50\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE "child"\uFF1B
        //      \u5982\u679C id1 \u662F id2 \u7684\u7236\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE "parent"\uFF1B
        //      \u5982\u679C id1 \u548C id2 \u662F\u5177\u6709\u540C\u4E00\u4E2A\u7236\u7EA7\u8282\u70B9\u7684\u5E73\u7EA7\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE "sibling"\uFF1B
        //      \u5982\u679C id1 \u548C id2 \u65E2\u4E0D\u662F\u7236\u5B50\u7EA7\u5173\u7CFB\uFF0C\u4E5F\u4E0D\u662F\u5177\u6709\u540C\u4E00\u4E2A\u7236\u7EA7\u8282\u70B9\u7684\u5E73\u7EA7\u8282\u70B9\u5173\u7CFB\uFF0C\u5219\u8FD4\u56DE "normal"\uFF1B
        compare: function (jq, param) { return compareNode(jq[0], param); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u4E00\u4E2A\u8282\u70B9\u662F\u5426\u4E3A\u53E6\u4E00\u4E2A\u8282\u70B9\u7684\u5B50\u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param\uFF1A  \u8FD9\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          id1:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E00\u4E2A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //          id2:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E8C\u4E2A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C tree-node id1 \u662F tree-node id2 \u7684\u5B50\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isChild: function (jq, param) { return isChild(jq[0], param); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u4E00\u4E2A\u8282\u70B9\u662F\u5426\u4E3A\u53E6\u4E00\u4E2A\u8282\u70B9\u7684\u7236\u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param\uFF1A  \u8FD9\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          id1:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E00\u4E2A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //          id2:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E8C\u4E2A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C tree-node id1 \u662F tree-node id2 \u7684\u7236\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isParent: function (jq, param) { return isParent(jq[0], param); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u4E00\u4E2A\u8282\u70B9\u662F\u5426\u548C\u53E6\u4E00\u4E2A\u8282\u70B9\u4E3A\u5177\u6709\u540C\u4E00\u4E2A\u7236\u8282\u70B9\u7684\u5E73\u7EA7\u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param\uFF1A  \u8FD9\u662F\u4E00\u4E2A JSON-Object\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          id1:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E00\u4E2A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //          id2:    \u7528\u4E8E\u5224\u65AD\u7684\u7B2C\u4E8C\u4E2A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C tree-node id1 \u548C tree-node id2 \u662F\u5177\u6709\u540C\u4E00\u4E2A\u7236\u7EA7\u8282\u70B9\u7684\u5E73\u7EA7\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isSibling: function (jq, param) { return isSibling(jq[0], param); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u7684\u5E73\u7EA7\u4E0B\u4E00\u683C\u4F4D\u7F6E\u7684 tree-node \u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      id:  \u6307\u5B9A\u7684\u8868\u793A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE tree-node id \u7684\u540C\u7EA7\u522B\u4E0B\u4E00\u683C\u4F4D\u7F6E\u7684 tree-node \u8282\u70B9 node \u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u8BE5 tree-node id \u4E3A\u5F53\u524D\u7EA7\u522B\u7684\u6700\u540E\u4E00\u4E2A\u8282\u70B9\u5373\u6CA1\u6709\u4E0B\u4E00\u683C\u8282\u70B9\uFF1B\u5219\u8FD4\u56DE null\u3002
        nextRow: function (jq, id) { return getNextRow(jq[0], id); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u7684\u5E73\u7EA7\u4E0A\u4E00\u683C\u4F4D\u7F6E\u7684 tree-node \u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      id:  \u6307\u5B9A\u7684\u8868\u793A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE tree-node id \u7684\u540C\u7EA7\u522B\u4E0A\u4E00\u683C\u4F4D\u7F6E\u7684 tree-node \u8282\u70B9\u5BF9\u8C61\uFF1B\u8BE5 tree-node \u5BF9\u8C61\u542B\u6709\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      \u5982\u679C\u8BE5 tree-node id \u4E3A\u5F53\u524D\u7EA7\u522B\u7684\u7B2C\u4E00\u4E2A\u8282\u70B9\u5373\u6CA1\u6709\u4E0A\u4E00\u683C\u8282\u70B9\uFF1B\u5219\u8FD4\u56DE null\u3002
        prevRow: function (jq, id) { return getPrevRow(jq[0], id); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u7684\u540C\u7EA7\u6240\u6709\u8282\u70B9(\u5305\u542B\u81EA\u8EAB)\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      id:  \u6307\u5B9A\u7684\u8868\u793A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE tree-node id \u7684\u540C\u7EA7\u522B(\u5177\u6709\u548C\u5F53\u524D tree-node id \u540C\u4E00\u4E2A\u7236\u7EA7\u8282\u70B9)\u6240\u6709\u8282\u70B9\u6784\u6210\u7684\u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 id \u662F\u67D0\u4E2A\u6839\u8282\u70B9\u7684 id \u6216\u8005\u672A\u5B9A\u4E49 id \u53C2\u6570\uFF0C\u5219\u8BE5\u65B9\u6CD5\u548C getRoots \u65B9\u6CD5\u8FD4\u56DE\u7684\u503C\u76F8\u540C\uFF1B
        getNears: function (jq, id) { return getNears(jq[0], id); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u8282\u70B9\u7684\u4E0B\u4E00\u7EA7\u6240\u6709\u8282\u70B9\uFF1B\u8BE5\u65B9\u6CD5\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      id:  \u6307\u5B9A\u7684\u8868\u793A tree-node \u5BF9\u8C61\u7684 idField \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE tree-node id \u7684\u4E0B\u4E00\u7EA7\u6240\u6709\u8282\u70B9\u6784\u6210\u7684\u4E00\u4E2A\u6570\u7EC4\u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u4F20\u5165\u7684\u53C2\u6570 id \u6CA1\u6709\u5B50\u8282\u70B9\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u5305\u542B 0 \u4E2A\u5143\u7D20\u7684\u6570\u7EC4\u3002
        //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u548C getChildren \u7684\u4E0D\u540C\u4E4B\u5904\u5728\u4E8E\uFF0CgetChildren \u65B9\u6CD5\u8FD4\u56DE\u7684\u662F tree-node id \u4E0B\u7684\u6240\u6709\u5B50\u8282\u70B9\u5185\u5BB9\uFF1B
        getNearChildren: function (jq, id) { return getNearChildren(jq[0], id); },


        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u542F\u7528\u5F53\u524D\u8868\u683C\u7684\u884C\u62D6\u52A8\u529F\u80FD\uFF1B\u8BE5\u65B9\u6CD5\u65E0\u53C2\u6570\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        enableRowDnd: function (jq) { return jq.each(function () { enableRowDnd(this); }); },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u7981\u7528\u5F53\u524D\u8868\u683C\u7684\u884C\u62D6\u52A8\u529F\u80FD\uFF1B\u8BE5\u65B9\u6CD5\u65E0\u53C2\u6570\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        disableRowDnd: function (jq) { return jq.each(function () { disableRowDnd(this); }); },




        //  \u83B7\u53D6 easyui-treegrid \u4E2D\u5F53\u524D\u9875\u7684\u884C\u6570\u636E(\u5305\u62EC\u6839\u8282\u70B9\u548C\u5B50\u8282\u70B9)\u6240\u6784\u6210\u7684\u4E00\u4E2A\u96C6\u5408\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 cascade \u5B9A\u4E49\u4E3A\u5982\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8868\u793A\u662F\u5426\u8FDE\u540C\u5B50\u7EA7\u8282\u70B9\u6570\u636E\u4E00\u5E76\u8FD4\u56DE\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u8868\u793A\u4E00\u4E2A node\uFF1B
        //      \u5982\u679C cascade \u4E3A true\uFF0C\u5219\u8FD4\u56DE\u6240\u6709\u6839\u8282\u70B9\u4EE5\u53CA\u5B50\u8282\u70B9\u5408\u5E76\u6240\u6784\u6210\u7684\u4E00\u4E2A\u6570\u7EC4\uFF1B
        //      \u5982\u679C cascade \u4E3A false\uFF0C\u5219\u4EC5\u8FD4\u56DE\u6240\u6709\u6839\u8282\u70B9\u6570\u636E\uFF0C\u540C getRoots \u65B9\u6CD5\uFF1B
        //      \u5982\u679C easyui-treegrid \u7684\u5F53\u524D\u9875\u6CA1\u6709\u6570\u636E\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u957F\u5EA6\u4E3A 0 \u7684\u6570\u7EC4\u3002
        getRows: function (jq, cascade) { return getRows(jq[0], cascade); },

        //  \u83B7\u53D6 easyui-treegrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u5217\u6240\u6709\u884C\u7684\u5355\u5143\u683C\u6570\u636E\u6240\u6784\u6210\u7684\u4E00\u4E2A\u6570\u7EC4\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      1、\u8868\u793A\u8981\u83B7\u53D6\u7684\u5217\u7684 field \u503C\uFF1B
        //      2、JSON-Object \u7C7B\u578B\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          field: \u8981\u83B7\u53D6\u7684\u6570\u636E\u7684\u5217\u7684 field \u540D\uFF1B
        //          cascade\uFF1ABoolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B \u8868\u793A\u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\u4E2D\u662F\u5426\u8FD8\u5305\u62EC\u5B50\u8282\u70B9\u6570\u636E\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u662F\u5176\u6570\u636E\u884C\u7684\u8BE5\u5217\u7684\u503C\uFF0C\u6570\u7EC4\u7684\u957F\u5EA6\u7B49\u4E8E grid.treegrid("getRows", cascade) \u7684\u957F\u5EA6\uFF1B
        //          \u5982\u679C\u4F20\u5165\u7684\u5217\u540D\u4E0D\u5B58\u5728\uFF0C\u5219\u8FD4\u56DE\u6570\u7EC4\u7684\u957F\u5EA6\u540C\u6837\u7B49\u4E8E grid.treegrid("getRows") \u7684\u957F\u5EA6\uFF0C\u53EA\u662F\u6BCF\u4E2A\u5143\u7D20\u7684\u503C\u90FD\u4E3A undefined.
        getColumnData: function (jq, param) { return getColumnData(jq[0], param); },

        //  \u83B7\u53D6 easyui-treegrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u884C\u8282\u70B9\u7684 DOM-jQuery \u5BF9\u8C61\u5143\u7D20\u96C6\u5408\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u4EE5\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      1、\u8868\u793A\u8981\u83B7\u53D6\u7684\u884C\u8282\u70B9\u7684 id \u503C\uFF1B
        //      2、JSON-Object \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u9700\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          id:     \u8868\u793A\u8981\u83B7\u53D6\u7684\u884C\u8282\u70B9\u7684 id \u503C\uFF1B
        //          cascade:Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8868\u793A\u662F\u5426\u8FDE\u540C\u5176\u5B50\u7EA7\u8282\u70B9\u7684 DOM \u884C\u5BF9\u8C61\u4E00\u5E76\u83B7\u53D6\u5E76\u8FD4\u56DE\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D\u9875\u5B58\u5728 id \u6307\u793A\u7684\u884C\uFF0C\u5219\u8FD4\u56DE\u8BE5\u884C\u7684 DOM-jQuery \u5BF9\u8C61\u96C6\u5408\uFF0C\u8BE5\u96C6\u5408\u4E2D\u5305\u542B\u7684 DOM \u8282\u70B9\u7EA7\u522B\u4E3A\u4E00\u7EC4 tr class="datagrid-row" \u5BF9\u8C61\uFF1B
        //          \u5426\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u7684 jQuery \u5BF9\u8C61\u3002
        getRowDom: function (jq, param) { return getRowDom(jq[0], param); },

        //  \u83B7\u53D6\u5F53\u524D easyui-treegrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A id \u7684\u8282\u70B9\u6570\u636E\u5BF9\u8C61\uFF1B\u540C find \u65B9\u6CD5\u3002
        getRowData: function (jq, id) { return getNode(jq[0], id); },

        //  \u83B7\u53D6\u5F53\u524D easyui-treegrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A id \u7684\u8282\u70B9\u6570\u636E\u5BF9\u8C61\uFF1B\u540C find \u65B9\u6CD5\u3002
        getNode: function (jq, id) { return getNode(jq[0], id); },

        //  \u83B7\u53D6\u5F53\u524D easyui-treegrid \u4E2D\u5F53\u524D\u9875\u7684\u591A\u4E2A\u8282\u70B9\u6240\u6784\u6210\u7684\u4E00\u4E2A\u6570\u636E\u96C6\u5408\uFF1B\u540C findRows \u65B9\u6CD5\u3002
        getNodes: function (jq, param) { return findRows(jq[0], param); },

        //  \u83B7\u53D6 easyui-treegrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u5355\u5143\u683C\u7684 Dom-jQuery \u5BF9\u8C61\u5143\u7D20\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 pos \u4E3A\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      field:  \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u5217\uFF1B
        //      id:     \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u884C\u7684\u8282\u70B9 id\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D\u9875\u5B58\u5728\u6307\u5B9A\u5217\u7684\u6307\u5B9A\u884C\uFF0C\u5219\u8FD4\u56DE\u8BE5\u5217\u4E2D\u6307\u5B9A\u884C\u7684 DOM-jQuery \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u4E2D\u5305\u542B\u7684 DOM \u8282\u70B9\u7EA7\u522B\u4E3A\u4E00\u4E2A div class="datagrid-cell" \u5BF9\u8C61\uFF1B
        //          \u5426\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u7684 jQuery \u5BF9\u8C61\u3002
        getCellDom: function (jq, pos) { return getCellDom(jq[0], pos); },

        //  \u83B7\u53D6 easyui-treegrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u5355\u5143\u683C\u7684\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 pos \u4E3A\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      field:  \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u5217\uFF1B
        //      id:     \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u884C\u7684\u8282\u70B9 id\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D\u9875\u5B58\u5728\u6307\u5B9A\u5217\u7684\u6307\u5B9A\u884C\uFF0C\u5219\u8FD4\u56DE\u8BE5\u5217\u4E2D\u6307\u5B9A\u884C\u53CA\u6307\u5B9A\u5217\u7684\u5355\u5143\u683C\u6570\u636E\uFF1B\u5426\u5219\u8FD4\u56DE undefined\u3002
        getCellData: function (jq, pos) { return getCellData(jq[0], pos); },

        //  \u83B7\u53D6 easyui-treegrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u5355\u5143\u683C\u7684\u663E\u793A\u6570\u636E(\u7ECF\u8FC7 formatter \u683C\u5F0F\u5316\u540E\u7684\u663E\u793A\u6570\u636E)\uFF1B
        //  \u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 pos \u4E3A\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      field:  \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u5217\uFF1B
        //      id:     \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u884C\u7684\u8282\u70B9 id\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D\u9875\u5B58\u5728\u6307\u5B9A\u5217\u7684\u6307\u5B9A\u884C\uFF0C\u5219\u8FD4\u56DE\u8BE5\u5217\u4E2D\u6307\u5B9A\u884C\u7684\u5355\u5143\u683C\u7684\u663E\u793A\u6570\u636E(\u7ECF\u8FC7 formatter \u683C\u5F0F\u5316\u540E\u7684\u663E\u793A\u6570\u636E)\uFF1B\u5426\u5219\u8FD4\u56DE undefined\u3002
        getCellDisplay: function (jq, pos) { return getCellDisplay(jq[0], pos); },

        //  \u83B7\u53D6 easyui-treegrid \u6309\u6307\u5B9A\u5217\u7684\u53BB\u91CD\u590D\u9879\u540E\u7684\u884C\u6570\u636E\u96C6\u5408\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      1、\u8868\u793A\u8981\u83B7\u53D6\u7684\u5217\u7684 field \u503C\uFF1B
        //      2、JSON-Object \u7C7B\u578B\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          field: \u8981\u83B7\u53D6\u7684\u6570\u636E\u7684\u5217\u7684 field \u540D\uFF1B
        //          cascade\uFF1ABoolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B \u8868\u793A\u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\u4E2D\u662F\u5426\u8FD8\u5305\u62EC\u5B50\u8282\u70B9\u6570\u636E\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u8868\u793A\u4E00\u4E2A\u884C\u6570\u636E\uFF1B
        //      \u5176\u7ED3\u679C\u76F8\u5F53\u4E8E\u5F53\u524D easyui-treegrid \u63A7\u4EF6\u8C03\u7528 getRows \u8FD4\u56DE\u540E\u5E76\u7ECF\u8FC7\u5BF9\u6307\u5B9A\u5217\u53BB\u91CD\u590D\u9879\u540E\u7684\u7ED3\u679C\uFF1B
        //      \u5982\u679C\u4F20\u5165\u7684\u5217\u540D\u4E0D\u5B58\u5728\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u957F\u5EA6\u4E3A 0 \u7684\u6570\u7EC4\u5BF9\u8C61.
        getDistinctRows: function (jq, param) { return getDistinctRows(jq[0], param); },

        //  \u83B7\u53D6 easyui-treegrid \u6307\u5B9A\u5217\u7684\u503C\u53BB\u91CD\u590D\u9879\u540E\u7684\u6570\u636E\u96C6\u5408\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      1、\u8868\u793A\u8981\u83B7\u53D6\u7684\u5217\u7684 field \u503C\uFF1B
        //      2、JSON-Object \u7C7B\u578B\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          field: \u8981\u83B7\u53D6\u7684\u6570\u636E\u7684\u5217\u7684 field \u540D\uFF1B
        //          cascade\uFF1ABoolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B \u8868\u793A\u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\u4E2D\u662F\u5426\u8FD8\u5305\u62EC\u5B50\u8282\u70B9\u6570\u636E\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u8868\u793A\u67D0\u4E00\u884C\u7684\u76F8\u5E94 field \u5C5E\u6027\u7684\u503C\uFF1B
        //      \u5176\u7ED3\u679C\u76F8\u5F53\u4E8E\u5F53\u524D easyui-treegrid \u63A7\u4EF6\u8C03\u7528 getColumnData \u8FD4\u56DE\u540E\u5E76\u7ECF\u8FC7\u5BF9\u6307\u5B9A\u5217\u53BB\u91CD\u590D\u9879\u540E\u7684\u7ED3\u679C\uFF1B
        //      \u5982\u679C\u4F20\u5165\u7684\u5217\u540D\u4E0D\u5B58\u5728\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u957F\u5EA6\u4E3A 0 \u7684\u6570\u7EC4\u5BF9\u8C61.
        getDistinctColumnData: function (jq, param) { return getDistinctColumnData(jq[0], param); },

        //  \u663E\u793A\u5F53\u524D easyui-treegrid \u5F53\u524D\u9875\u6570\u636E\u4E2D\u6307\u5B9A\u884C\u7684\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //      function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-treegrid \u6240\u6709\u8282\u70B9\u5BF9\u8C61\u96C6\u5408\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A function \u7C7B\u578B\uFF0C\u5219 findRow \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-treegrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8868\u793A\u627E\u5230\u9700\u8981\u67E5\u627E\u7684\u7ED3\u679C\uFF0C\u7ACB\u5373\u505C\u6B62\u5FAA\u73AF\u8C03\u7528\u5E76\u663E\u793A\u8BE5\u884C\u6570\u636E\uFF1B
        //          \u5982\u679C\u56DE\u8C03\u51FD\u6570\u59CB\u7EC8\u672A\u8FD4\u56DE true\uFF0C\u5219\u8BE5\u56DE\u8C03\u51FD\u6570\u4F1A\u4E00\u76F4\u904D\u5386 rows \u76F4\u5230\u6700\u540E\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        showRow: function (jq, param) { return jq.each(function () { showRow(this, param); }); },

        //  \u9690\u85CF\u5F53\u524D easyui-treegrid \u5F53\u524D\u9875\u6570\u636E\u4E2D\u6307\u5B9A\u884C\u7684\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //      function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-treegrid \u6240\u6709\u8282\u70B9\u5BF9\u8C61\u96C6\u5408\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A function \u7C7B\u578B\uFF0C\u5219 findRow \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-treegrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8868\u793A\u627E\u5230\u9700\u8981\u67E5\u627E\u7684\u7ED3\u679C\uFF0C\u7ACB\u5373\u505C\u6B62\u5FAA\u73AF\u8C03\u7528\u5E76\u9690\u85CF\u8BE5\u884C\u6570\u636E\uFF1B
        //          \u5982\u679C\u56DE\u8C03\u51FD\u6570\u59CB\u7EC8\u672A\u8FD4\u56DE true\uFF0C\u5219\u8BE5\u56DE\u8C03\u51FD\u6570\u4F1A\u4E00\u76F4\u904D\u5386 rows \u76F4\u5230\u6700\u540E\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        hideRow: function (jq, param) { return jq.each(function () { hideRow(this, param); }); },

        //  \u663E\u793A\u5F53\u524D easyui-treegrid \u5F53\u524D\u9875\u6570\u636E\u4E2D\u6307\u5B9A\u591A\u884C\u7684\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E09\u79CD\u7C7B\u578B\uFF1A
        //      Function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-treegrid \u6240\u6709\u8282\u70B9\u5BF9\u8C61\u96C6\u5408\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A Function \u7C7B\u578B\uFF0C\u5219 showRows \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-treegrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8BE5\u884C\u6570\u636E\u5C06\u4F1A\u88AB\u663E\u793A\uFF1B
        //      Array \u7C7B\u578B\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u7C7B\u578B\uFF1A
        //          \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //          Function \u7C7B\u578B\uFF1B\u5177\u4F53\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u53C2\u8003 showRow \u65B9\u6CD5\u4E2D param \u53C2\u6570\u4E3A function \u7C7B\u578B\u65F6\u7684\u5B9A\u4E49\uFF1B
        //          \u5F53 param \u53C2\u6570\u5B9A\u4E49\u4E3A Array \u7C7B\u578B\u65F6\uFF0C\u5219 showRows \u65B9\u6CD5\u4F1A\u5BF9\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u5FAA\u73AF\u8C03\u7528 showRow \u65B9\u6CD5\uFF1B
        //      Boolean \u7C7B\u578B\u4E14\u4E3A true\uFF1A\u5219 showRows \u5C06\u4F1A\u663E\u793A easyui-treegrid \u5F53\u524D\u9875\u7684\u6240\u6709\u6570\u636E\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        showRows: function (jq, param) { return jq.each(function () { showRows(this, param); }); },

        //  \u9690\u85CF\u5F53\u524D easyui-treegrid \u5F53\u524D\u9875\u6570\u636E\u4E2D\u6307\u5B9A\u591A\u884C\u7684\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E09\u79CD\u7C7B\u578B\uFF1A
        //      Function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-treegrid \u6240\u6709\u8282\u70B9\u5BF9\u8C61\u96C6\u5408\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A Function \u7C7B\u578B\uFF0C\u5219 hideRows \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-treegrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8BE5\u884C\u6570\u636E\u5C06\u4F1A\u88AB\u9690\u85CF\uFF1B
        //      Array \u7C7B\u578B\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u7C7B\u578B\uFF1A
        //          \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //          Function \u7C7B\u578B\uFF1B\u5177\u4F53\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u53C2\u8003 hideRow \u65B9\u6CD5\u4E2D param \u53C2\u6570\u4E3A function \u7C7B\u578B\u65F6\u7684\u5B9A\u4E49\uFF1B
        //          \u5F53 param \u53C2\u6570\u5B9A\u4E49\u4E3A Array \u7C7B\u578B\u65F6\uFF0C\u5219 hideRows \u65B9\u6CD5\u4F1A\u5BF9\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u5FAA\u73AF\u8C03\u7528 hideRow \u65B9\u6CD5\uFF1B
        //      Boolean \u7C7B\u578B\u4E14\u4E3A true\uFF1A\u5219 hideRows \u5C06\u4F1A\u9690\u85CF easyui-treegrid \u5F53\u524D\u9875\u7684\u6240\u6709\u6570\u636E\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        hideRows: function (jq, param) { return jq.each(function () { hideRows(this, param); }); },

        //  \u83B7\u53D6\u5F53\u524D easyui-treegrid \u5F53\u524D\u9875\u6240\u6709\u9690\u85CF\u7684\u884C\u6570\u636E\u6240\u6784\u6210\u7684\u4E00\u4E2A Array \u5BF9\u8C61\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 cascade \u5B9A\u4E49\u4E3A\u5982\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8868\u793A\u662F\u5426\u8FDE\u540C\u5B50\u7EA7\u8282\u70B9\u6570\u636E\u4E00\u5E76\u8FD4\u56DE\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u8868\u793A\u4E00\u4E2A node\uFF1B
        //      \u5982\u679C cascade \u4E3A true\uFF0C\u5219\u8FD4\u56DE\u6240\u6709\u6839\u8282\u70B9\u4EE5\u53CA\u5B50\u8282\u70B9\u5408\u5E76\u6240\u6784\u6210\u7684\u4E00\u4E2A\u6570\u7EC4\uFF1B
        //      \u5982\u679C cascade \u4E3A false\uFF0C\u5219\u4EC5\u8FD4\u56DE\u6240\u6709\u6839\u8282\u70B9\u6570\u636E\uFF0C\u540C getRoots \u65B9\u6CD5\uFF1B
        //      \u5982\u679C easyui-treegrid \u7684\u5F53\u524D\u9875\u6CA1\u6709\u6570\u636E\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u957F\u5EA6\u4E3A 0 \u7684\u6570\u7EC4\u3002
        getHiddenRows: function (jq, cascade) { return getHiddenRows(jq[0], cascade); },

        //  \u83B7\u53D6\u5F53\u524D easyui-treegrid \u5F53\u524D\u9875\u6240\u6709\u663E\u793A\u7684\u884C\u6570\u636E\u6240\u6784\u6210\u7684\u4E00\u4E2A Array \u5BF9\u8C61\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 cascade \u5B9A\u4E49\u4E3A\u5982\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8868\u793A\u662F\u5426\u8FDE\u540C\u5B50\u7EA7\u8282\u70B9\u6570\u636E\u4E00\u5E76\u8FD4\u56DE\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u8868\u793A\u4E00\u4E2A node\uFF1B
        //      \u5982\u679C cascade \u4E3A true\uFF0C\u5219\u8FD4\u56DE\u6240\u6709\u6839\u8282\u70B9\u4EE5\u53CA\u5B50\u8282\u70B9\u5408\u5E76\u6240\u6784\u6210\u7684\u4E00\u4E2A\u6570\u7EC4\uFF1B
        //      \u5982\u679C cascade \u4E3A false\uFF0C\u5219\u4EC5\u8FD4\u56DE\u6240\u6709\u6839\u8282\u70B9\u6570\u636E\uFF0C\u540C getRoots \u65B9\u6CD5\uFF1B
        //      \u5982\u679C easyui-treegrid \u7684\u5F53\u524D\u9875\u6CA1\u6709\u6570\u636E\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u957F\u5EA6\u4E3A 0 \u7684\u6570\u7EC4\u3002
        getVisibleRows: function (jq, cascade) { return getVisibleRows(jq[0], cascade); },

        //  \u5BF9\u5F53\u524D easyui-treegrid \u4E2D\u8FDB\u884C\u9AD8\u4EAE\u5173\u952E\u8BCD\u67E5\u8BE2\uFF1B\u8BE5\u65B9\u6CD5\u7684 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      1、String \u7C7B\u578B\u503C\uFF1A\u8868\u793A\u8981\u5BF9\u6240\u6709\u5217\u8FDB\u884C\u7684\u9AD8\u4EAE\u67E5\u8BE2\u5173\u952E\u8BCD\uFF1B
        //      2、JSON-Object\uFF1A\u8868\u793A\u5BF9\u7279\u5B9A\u5217\u8FDB\u884C\u9AD8\u4EAE\u67E5\u8BE2\u7684\u53C2\u6570\uFF0C\u8BE5\u5BF9\u8C61\u7C7B\u578B\u53C2\u6570\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          field:      \u8868\u793A\u8981\u8FDB\u884C\u9AD8\u4EAE\u67E5\u8BE2\u7684\u5217\uFF1B
        //          value:      \u8868\u793A\u8981\u8FDB\u884C\u9AD8\u4EAE\u67E5\u8BE2\u7684\u5173\u952E\u8BCD\uFF1B
        //          regular:    Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B\u6307\u793A\u8BE5\u5173\u952E\u8BCD\u662F\u5426\u4E3A\u6B63\u5219\u8868\u8FBE\u5F0F\uFF1B
        //          ignoreCase: Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B\u6307\u793A\u9AD8\u4EAE\u67E5\u8BE2\u65F6\u662F\u5426\u5FFD\u7565\u5927\u5C0F\u5199\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        livesearch: function (jq, param) { return jq.each(function () { livesearch(this, param); }); },

        //  \u91CD\u5199 easyui-treegrid \u7684\u539F\u751F\u65B9\u6CD5 find\uFF0C\u4F7F\u4E4B\u529F\u80FD\u66F4\u52A0\u4E30\u5BCC\u3002
        //  \u83B7\u53D6\u5F53\u524D easyui-treegrid \u5F53\u524D\u9875\u6307\u5B9A id \u7684\u8282\u70B9\u5BF9\u8C61\u5E76\u8FD4\u56DE\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //      function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-treegrid \u6240\u6709\u8282\u70B9\u5BF9\u8C61\u96C6\u5408\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A function \u7C7B\u578B\uFF0C\u5219 findRow \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-treegrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8868\u793A\u627E\u5230\u9700\u8981\u67E5\u627E\u7684\u7ED3\u679C\uFF0C\u7ACB\u5373\u505C\u6B62\u5FAA\u73AF\u8C03\u7528\u5E76\u8FD4\u56DE\u8BE5\u884C\u6570\u636E\uFF1B
        //          \u5982\u679C\u56DE\u8C03\u51FD\u6570\u59CB\u7EC8\u672A\u8FD4\u56DE true\uFF0C\u5219\u8BE5\u56DE\u8C03\u51FD\u6570\u4F1A\u4E00\u76F4\u904D\u5386 rows \u76F4\u5230\u6700\u540E\u5E76\u8FD4\u56DE null\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A JSON-Object\uFF0C\u8868\u793A\u4E00\u4E2A\u884C\u8282\u70B9\u6570\u636E\u5BF9\u8C61\uFF1B\u5982\u679C\u672A\u627E\u5230\u76F8\u5E94\u6570\u636E\uFF0C\u5219\u8FD4\u56DE null\u3002
        find: function (jq, param) { return findRow(jq[0], param); },

        //  \u83B7\u53D6\u5F53\u524D easyui-treegrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A id \u7684\u8282\u70B9\u6570\u636E\u5BF9\u8C61\uFF1B\u540C find \u65B9\u6CD5\u3002
        findRow: function (jq, param) { return findRow(jq[0], param); },

        //  \u83B7\u53D6\u5F53\u524D easyui-treegrid \u5F53\u524D\u9875\u4E0A\u7684\u6307\u5B9A\u884C\u6570\u636E\u96C6\u5408\u5E76\u8FD4\u56DE\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      Function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-treegrid \u6240\u6709\u8282\u70B9\u5BF9\u8C61\u96C6\u5408\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A Function \u7C7B\u578B\uFF0C\u5219 findRows \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-treegrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\u4E2D\u5C06\u4F1A\u5305\u542B\u8BE5\u884C\u6570\u636E\uFF1B
        //          \u5982\u679C\u8BE5\u56DE\u8C03\u51FD\u6570\u59CB\u7EC8\u672A\u8FD4\u56DE true\uFF0C\u5219\u8BE5\u65B9\u6CD5\u6700\u7EC8\u8FD4\u56DE\u4E00\u4E2A\u957F\u5EA6\u4E3A 0 \u7684\u6570\u7EC4\u5BF9\u8C61\u3002
        //      Array \u7C7B\u578B\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u7C7B\u578B\uFF1A
        //          \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //          Function \u7C7B\u578B\uFF1B\u5177\u4F53\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u53C2\u8003 findRow \u65B9\u6CD5\u4E2D param \u53C2\u6570\u4E3A function \u7C7B\u578B\u65F6\u7684\u5B9A\u4E49\uFF1B
        //          \u5F53 param \u53C2\u6570\u5B9A\u4E49\u4E3A Array \u7C7B\u578B\u65F6\uFF0C\u5219 findRows \u65B9\u6CD5\u4F1A\u5BF9\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u5FAA\u73AF\u8C03\u7528 findRow \u65B9\u6CD5\uFF0C\u5E76\u8FC7\u6EE4\u6389 findRow \u65B9\u6CD5\u8FD4\u56DE null \u7684\u7ED3\u679C\u884C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF1B\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F JSON-Object \u7C7B\u578B\uFF0C\u8868\u793A\u4E00\u4E2A\u884C\u6570\u636E\u5BF9\u8C61\uFF1B\u5982\u679C\u672A\u627E\u5230\u76F8\u5E94\u6570\u636E\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u957F\u5EA6\u4E3A 0 \u7684\u6570\u7EC4\u5BF9\u8C61\u3002
        findRows: function (jq, param) { return findRows(jq[0], param); },

        //  \u5220\u9664 easyui-treegrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u7684\u8282\u70B9\u4EE5\u53CA\u5B83\u6240\u6709\u7684\u5B50\u8282\u70B9\uFF1B\u53C2\u6570 param \u8868\u793A\u8981\u5220\u9664\u7684\u5185\u5BB9\uFF1B\u8BE5\u53C2\u6570\u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E09\u79CD\u7C7B\u578B\uFF1A
        //      \u8868\u793A\u8981\u5220\u9664\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //      Function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-treegrid \u6240\u6709\u8282\u70B9\u5BF9\u8C61\u96C6\u5408\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A Function \u7C7B\u578B\uFF0C\u5219 deleteRow \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-treegrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8868\u793A\u67E5\u627E\u5230\u4E86\u9700\u8981\u88AB\u5220\u9664\u7684\u884C\uFF0CdeleteRow \u65B9\u6CD5\u5C06\u4F1A\u5220\u9664\u8BE5\u884C\u6570\u636E\u5E76\u7ACB\u5373\u505C\u6B62\u548C\u8DF3\u51FA\u5FAA\u73AF\u64CD\u4F5C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        deleteRow: function (jq, param) { return jq.each(function () { deleteRow(this, param); }); },

        //  \u5220\u9664\u591A\u884C\u6570\u636E\uFF0C\u53C2\u6570 param \u8868\u793A\u8981\u5220\u9664\u7684\u5185\u5BB9\uFF1B\u8BE5\u53C2\u6570\u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      Function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-treegrid \u6240\u6709\u8282\u70B9\u5BF9\u8C61\u96C6\u5408\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A Function \u7C7B\u578B\uFF0C\u5219 deleteRows \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-treegrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8868\u793A\u67E5\u627E\u5230\u4E86\u9700\u8981\u88AB\u5220\u9664\u7684\u884C\uFF0CdeleteRows \u65B9\u6CD5\u5C06\u4F1A\u5220\u9664\u8BE5\u884C\u6570\u636E\uFF0C\u5E76\u904D\u5386\u4E0B\u4E00\u884C\u6570\u636E\u76F4\u81F3\u6570\u6570\u636E\u96C6\u7684\u672B\u5C3E\uFF1B
        //      Array \u7C7B\u578B\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u76EE\u5747\u8868\u793A\u8981\u5220\u9664\u7684\u884C\u7684\u884C\u7D22\u5F15\u53F7\u6216\u8005 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        deleteRows: function (jq, param) { return jq.each(function () { deleteRows(this, param); }); },

        //  \u8BBE\u7F6E easyui-treegrid \u4E2D\u5217\u7684\u6807\u9898\uFF1B\u53C2\u6570 param \u662F\u4E00\u4E2A json \u5BF9\u8C61\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      field: \u5217\u5B57\u6BB5\u540D\u79F0
        //      title: \u5217\u7684\u65B0\u6807\u9898
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setColumnTitle: function (jq, param) { return jq.each(function () { setColumnTitle(this, param); }); },

        //  \u9009\u4E2D easyui-treegrid \u5F53\u524D\u9875\u7684\u67D0\u884C\u8282\u70B9\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      1、\u8868\u793A\u884C\u8282\u70B9\u7684 id \u503C\uFF1B
        //      2、JSON-Object \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u9700\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          id:     \u8868\u793A\u8981\u83B7\u53D6\u7684\u884C\u8282\u70B9\u7684 id \u503C\uFF1B
        //          cascade:Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8868\u793A\u662F\u5426\u8FDE\u540C\u5176\u5B50\u7EA7\u8282\u70B9\u7684 DOM \u884C\u5BF9\u8C61\u4E00\u5E76\u83B7\u53D6\u5E76\u8FD4\u56DE\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        select: function (jq, param) { return jq.each(function () { selectRow(this, param); }); },

        //  \u4E0D\u9009\u4E2D easyui-treegrid \u5F53\u524D\u9875\u7684\u67D0\u884C\u8282\u70B9\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      1、\u8868\u793A\u884C\u8282\u70B9\u7684 id \u503C\uFF1B
        //      2、JSON-Object \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u9700\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          id:     \u8868\u793A\u8981\u83B7\u53D6\u7684\u884C\u8282\u70B9\u7684 id \u503C\uFF1B
        //          cascade:Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8868\u793A\u662F\u5426\u8FDE\u540C\u5176\u5B50\u7EA7\u8282\u70B9\u7684 DOM \u884C\u5BF9\u8C61\u4E00\u5E76\u83B7\u53D6\u5E76\u8FD4\u56DE\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        unselect: function (jq, param) { return jq.each(function () { unselectRow(this, param); }); },

        //  \u540C select \u65B9\u6CD5\uFF1B
        selectRow: function (jq, param) { return jq.each(function () { selectRow(this, param); }); },

        //  \u540C unselect \u65B9\u6CD5\uFF1B
        unselectRow: function (jq, param) { return jq.each(function () { unselectRow(this, param); }); },

        //  \u9009\u5219 easyui-treegrid \u5F53\u524D\u9875\u7684\u67D0\u884C\u8282\u70B9\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      1、\u8868\u793A\u884C\u8282\u70B9\u7684 id \u503C\uFF1B
        //      2、JSON-Object \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u9700\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          id:     \u8868\u793A\u8981\u83B7\u53D6\u7684\u884C\u8282\u70B9\u7684 id \u503C\uFF1B
        //          cascade:Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8868\u793A\u662F\u5426\u8FDE\u540C\u5176\u5B50\u7EA7\u8282\u70B9\u7684 DOM \u884C\u5BF9\u8C61\u4E00\u5E76\u83B7\u53D6\u5E76\u8FD4\u56DE\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        check: function (jq, param) { return jq.each(function () { checkRow(this, param); }); },

        //  \u4E0D\u9009\u5219 easyui-treegrid \u5F53\u524D\u9875\u7684\u67D0\u884C\u8282\u70B9\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      1、\u8868\u793A\u884C\u8282\u70B9\u7684 id \u503C\uFF1B
        //      2、JSON-Object \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u9700\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          id:     \u8868\u793A\u8981\u83B7\u53D6\u7684\u884C\u8282\u70B9\u7684 id \u503C\uFF1B
        //          cascade:Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8868\u793A\u662F\u5426\u8FDE\u540C\u5176\u5B50\u7EA7\u8282\u70B9\u7684 DOM \u884C\u5BF9\u8C61\u4E00\u5E76\u83B7\u53D6\u5E76\u8FD4\u56DE\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        uncheck: function (jq, param) { return jq.each(function () { uncheckRow(this, param); }); },

        // \u540C check \u65B9\u6CD5\u3002
        checkRow: function (jq, param) { return jq.each(function () { checkRow(this, param); }); },

        // \u540C uncheck \u65B9\u6CD5\u3002
        uncheckRow: function (jq, param) { return jq.each(function () { uncheckRow(this, param); }); },

        //  \u8BBE\u7F6E\u5F53\u524D easyui-treegrid \u63A7\u4EF6\u7684\u8868\u5934\u8FC7\u6EE4\u5668\uFF1B\u8BE5\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      columnFilter: \u53C2\u89C1\u5C5E\u6027 columnFilter
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setColumnFilter: function (jq, columnFilter) { return jq.each(function () { setColumnFilter(this, columnFilter); }); },

        //  \u5BF9\u5F53\u524D easyui-treegrid \u63A7\u4EF6\u6309\u7279\u5B9A\u6761\u4EF6\u8FDB\u884C\u884C\u8FC7\u6EE4/\u663E\u793A\u64CD\u4F5C\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      1、Boolean \u7C7B\u578B\uFF1A\u5982\u679C\u5B9A\u4E49\u4E3A\u8BE5\u7C7B\u578B\uFF0C\u5219\uFF1A
        //          \u5982\u679C\u503C\u5B9A\u4E49\u4E3A true\uFF0C\u5219\u8868\u793A\u9009\u4E2D\u6240\u6709\u7684\u6570\u636E\u5168\u90E8\u4E0D\u8FC7\u6EE4\uFF1B
        //          \u5982\u679C\u503C\u5B9A\u4E49\u4E3A false\uFF0C\u5219\u8868\u793A\u6E05\u7A7A\u6240\u6709\u7684\u6570\u636E\u5168\u90E8\u8FC7\u6EE4\u6389\u800C\u4E0D\u663E\u793A\uFF1B
        //      2、JSON-Object \u7C7B\u578B\uFF1A\u5982\u679C\u5B9A\u4E49\u4E3A\u8BE5\u7C7B\u578B\uFF0C\u5219\u8BE5\u53C2\u6570\u5B9A\u4E49\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          field:  String \u7C7B\u578B\uFF0C\u8868\u793A\u8981\u64CD\u4F5C\u7684\u5217\u7684 field \u503C\uFF1B
        //          selected\uFF1ABoolean\uFF0C\u8868\u793A\u8981\u5BF9 field \u6240\u6307\u793A\u7684\u5217\u8FDB\u884C\u8FC7\u6EE4\u64CD\u4F5C\u7684\u7C7B\u578B\uFF1A
        //              \u5982\u679C\u5B9A\u4E49\u4E3A true\uFF0C\u5219\u8868\u793A\u8FDB\u884C\u9009\u4E2D\u64CD\u4F5C\uFF1B
        //              \u5982\u679C\u5B9A\u4E49\u4E3A false\uFF0C\u5219\u8868\u793A\u8FDB\u884C\u8FC7\u6EE4\u64CD\u4F5C\uFF1B
        //          value:  \u8868\u793A\u8981\u5BF9 field \u6240\u6307\u793A\u7684\u5217\u8FDB\u884C\u8FC7\u6EE4\u64CD\u4F5C\u7684\u503C\uFF0C\u8BE5\u53C2\u6570\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u7C7B\u578B\uFF1A
        //              Array \u7C7B\u578B\uFF1A\u8868\u793A\u4E00\u7EC4\u8981\u8FDB\u884C\u8FC7\u6EE4\u64CD\u4F5C\u7684\u503C\uFF1B
        //              \u975E Array \u7C7B\u578B\uFF1A\u8868\u793A\u8981\u8FDB\u884C\u8FC7\u6EE4\u64CD\u4F5C\u7684\u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        columnFilterSelect: function (jq, param) { return jq.each(function () { columnFilterSelect(this, param); }); },

        //  \u8BBE\u7F6E\u5F53\u524D easyui-treegrid \u63A7\u4EF6\u7684 offset \u5C5E\u6027\uFF1B\u8BE5\u64CD\u4F5C\u80FD\u8BA9 offset \u5373\u53EF\u968F\u6D4F\u89C8\u5668\u7A97\u53E3\u5927\u5C0F\u8C03\u6574\u800C\u751F\u6548\u6216\u7981\u7528\uFF1B
        //  \u5907\u6CE8\uFF1A \u53C2\u6570 offset \u683C\u5F0F\u53C2\u8003\u6269\u5C55\u5C5E\u6027 offset\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setOffset: function (jq, offset) { return jq.each(function () { setOffset(this, offset); }); },

        //  \u5C06\u5F53\u524D\u8868\u683C\u6570\u636E\u5BFC\u51FA\u4E3A excel \u6587\u4EF6\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u4E86\u4E00\u4E2A\u53C2\u6570 isAll\uFF1B
        //  \u53C2\u6570 isAll \u6307\u793A\u662F\u5426\u5BFC\u51FA\u5168\u90E8\u800C\u975E\u4EC5\u5F53\u524D\u9875\u6570\u636E\uFF0C\u5982\u679C\u4E0D\u4F20\u5165\u8BE5\u53C2\u6570\u9ED8\u8BA4\u4E3A false \u5373\u5BFC\u51FA\u5F53\u524D\u9875\u6570\u636E\u3002
        //  \u5F53\u53C2\u6570 isAll \u4E3A true \u5E76\u4E14 remotePaging \u4E3A true \u65F6\uFF0C\u9700\u8981\u5F53\u524D easyui-treegrid \u63A7\u4EF6\u7684 url \u5C5E\u6027\u6307\u793A\u7684\u670D\u52A1\u5668\u6570\u636E\u6E90\u652F\u6301\u67E5\u8BE2\u6240\u6709\u6570\u636E
        //      \uFF08\u4EE5 rows: 0 \u65B9\u5F0F\u4E0D\u5206\u9875\u67E5\u8BE2\u6240\u6709\u6570\u636E\uFF09\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-treegrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        exportExcel: function (jq, isAll) { return jq.each(function () { exportGrid(this, isAll); }); }

    };
    var defaults = $.fn.treegrid.extensions.defaults = {

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u5C4F\u5E55\u5927\u5C0F\u8C03\u6574\u65F6\u5019\u968F\u5C4F\u5E55\u5927\u5C0F\u5C3A\u5BF8\u8C03\u6574\u800C\u81EA\u8EAB\u5927\u5C0F\u8C03\u6574\u7684\u504F\u79FB\u91CF\uFF1B
        //  \u8BE5\u53C2\u6570\u4E3A\u4E00\u4E2A JSON \u683C\u5F0F\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      width: \u8868\u793A\u76F8\u5BF9\u4E8E\u6D4F\u89C8\u5668\u7A97\u53E3\u5BBD\u5EA6\u7684\u504F\u79FB\u91CF\uFF0C\u5982\u679C\u662F\u6B63\u6570\u5219\u5176\u5BBD\u5EA6\u6BD4\u6D4F\u89C8\u5668\u7A97\u53E3\u5927\uFF0C\u53CD\u4E4B\u5219\u5176\u5BBD\u5EA6\u6BD4\u6D4F\u89C8\u5668\u7A97\u53E3\u5C0F\uFF0Cint\u7C7B\u578B\uFF1B
        //      height: \u8868\u793A\u76F8\u5BF9\u4E8E\u6D4F\u89C8\u5668\u7A97\u53E3\u9AD8\u5EA6\u7684\u504F\u79FB\u91CF\uFF0C\u5982\u679C\u662F\u6B63\u6570\u5219\u5176\u9AD8\u5EA6\u6BD4\u6D4F\u89C8\u5668\u7A97\u53E3\u5927\uFF0C\u53CD\u4E4B\u5219\u5176\u9AD8\u5EA6\u6BD4\u6D4F\u89C8\u5668\u7A97\u53E3\u5C0F\uFF0Cint\u7C7B\u578B\uFF1B
        //  \u5907\u6CE8\uFF1A\u8BE5\u53C2\u6570\u9ED8\u8BA4\u4E3A null\uFF0C\u8868\u793A\u4E0D\u968F\u5C4F\u5E55\u5C3A\u5BF8\u5927\u5C0F\u8C03\u6574\u800C\u8C03\u6574\uFF1B
        //      \u5982\u679C\u672A\u5B9A\u4E49 width \u6216\u8005 width: 0\uFF0C\u5219\u8868\u793A\u5C4F\u5E55\u5927\u5C0F\u8C03\u6574\u65F6 easyui-treegrid \u7684 width \u5C5E\u6027\u6491\u6EE1\u5C4F\u5E55\u5BBD\u5EA6\uFF1B
        //      \u5982\u679C\u672A\u5B9A\u4E49 height \u6216\u8005 height: 0\uFF0C\u5219\u8868\u793A\u5C4F\u5E55\u5927\u5C0F\u8C03\u6574\u65F6 easyui-treegrid \u7684 height \u5C5E\u6027\u6491\u6EE1\u5C4F\u5E55\u5BBD\u5EA6\uFF1B
        offset: null,

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u5F53\u524D easyui-treegrid \u63A7\u4EF6\u662F\u5426\u652F\u6301\u5E73\u6ED1\u6570\u636E\u683C\u5F0F\u3002
        //  \u5F53\u652F\u6301\u5E73\u6ED1\u6570\u636E\u683C\u5F0F\u65F6\uFF0C\u6570\u636E\u5143\u7D20\u4E2D\u4E0D\u9700\u8981\u901A\u8FC7\u6307\u5B9A children \u6765\u6307\u5B9A\u5B50\u8282\u70B9\uFF0C\u800C\u662F\u652F\u6301\u901A\u8FC7\u6307\u5B9A\u7684 parentField \u503C\u6240\u8868\u793A\u7684\u5217\u7684\u503C\u6765\u6307\u793A\u5176\u7236\u7EA7\u8282\u70B9\u3002
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        smooth: false,

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u5F53\u524D easyui-treegrid \u63A7\u4EF6\u652F\u6301\u5E73\u6ED1\u6570\u636E\u683C\u5F0F\u65F6\uFF0C\u7A0B\u5E8F\u7528\u54EA\u4E2A field \u8868\u793A\u5F53\u524D\u884C\u6570\u636E\u7684\u7236\u7EA7\u8282\u70B9 idField \u503C
        //  String \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A "pid"\u3002
        parentField: "pid",

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u5F53\u5DE6\u952E\u70B9\u51FB\u5E26\u6709\u5B50\u8282\u70B9\u7684\u6761\u76EE\u65F6\uFF0C\u662F\u5426\u81EA\u52A8\u5C55\u5F00/\u6298\u53E0\u76F8\u5E94\u8282\u70B9\u3002
        //  Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        //  \u5907\u6CE8\uFF1A\u8BE5\u529F\u80FD\u4E0D\u4F1A\u5F71\u54CD\u5230 easyui-treegrid \u7684\u539F\u751F\u4E8B\u4EF6 onClick\u3002
        toggleOnClick: false,

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u540C\u4E00\u7EA7\u83DC\u5355\u8282\u70B9\u4E0B\uFF0C\u53EA\u5141\u8BB8\u4E00\u4E2A\u8282\u70B9\u88AB\u5C55\u5F00\u3002
        //  Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        //  \u5F53\u8BE5\u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u5EFA\u8BAE\u540C\u65F6\u628A animate \u5C5E\u6027\u8BBE\u7F6E\u4E3A false\uFF0C\u4EE5\u514D\u5F71\u54CD\u83DC\u5355\u8054\u52A8\u6298\u53E0\u65F6\u7684\u7F8E\u89C2\u6548\u679C\u3002
        onlyNodeExpand: false,

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u5F53\u524D easyui-treegrid \u63A7\u4EF6\u662F\u5426\u652F\u6301\u7EA7\u8054\u9009\u62E9\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        //  \u5907\u6CE8\uFF1A\u5728\u5F53 checkOnSelect、singleSelect \u8FD9\u4E24\u4E2A\u5C5E\u6027\u90FD\u4E3A true \u7684\u60C5\u51B5\u4E0B\uFF0C\u4E0D\u652F\u6301\u7EA7\u8054\u9009\u62E9\uFF0C\u6B64\u65F6\u5C5E\u6027 cascadeCheck \u65E0\u6548\uFF1B
        cascadeCheck: false,

        //  \u8986\u76D6 easyui-treegrid \u7684\u539F\u751F\u5C5E\u6027 loadFilter\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD(\u652F\u6301\u5E73\u6ED1\u6570\u636E\u683C\u5F0F)\u3002
        loadFilter: loadFilter,

        //  \u8986\u76D6 easyui-treegrid \u7684\u539F\u751F\u4E8B\u4EF6 onExpand\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        onExpand: onExpand,


        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1B
        //      \u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u8BBE\u5B9A\u4E86\u5C5E\u6027 rowContextMenu \u65F6\uFF0C\u662F\u5426\u5C06\u53CC\u51FB\u6570\u636E\u884C onDblClickRow \u4E8B\u4EF6\u7684\u54CD\u5E94\u51FD\u6570
        //      \u8BBE\u7F6E\u4E3A rowContextMenu \u7684\u7B2C "dblClickRowMenuIndex" \u4E2A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u54CD\u5E94\u51FD\u6570\uFF0C\u5E76\u5C06\u8BE5\u83DC\u5355\u9879\u7684\u5B57\u4F53\u52A0\u7C97\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //  \u5907\u6CE8\uFF1A\u5F53\u8BBE\u7F6E\u4E86\u6709\u6548\u7684\u5C5E\u6027 rowContextMenu \u65F6\u5019\uFF0C\u8BE5\u529F\u80FD\u65B9\u6709\u6548\u3002
        //      \u81EA\u52A8\u7ED1\u5B9A\u7684 onDblClickRow \u7684\u56DE\u8C03\u51FD\u6570\u4E2D\u5C06\u4F1A\u8C03\u7528 rowContextMenu \u7684\u7B2C "dblClickRowMenuIndex" \u4E2A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u54CD\u5E94\u51FD\u6570\uFF0C\u4F46\u662F\u56DE\u8C03\u51FD\u6570\u4E2D\u4E0D\u80FD\u7528\u5230\u53C2\u6570 e \u548C menu\u3002
        autoBindDblClickRow: true,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1B
        //  \u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u8BBE\u5B9A\u4E86\u5C5E\u6027 autoBindDblClickRow: true\uFF0C\u53CC\u51FB\u884C\u6570\u636E\u89E6\u53D1\u7684\u53F3\u952E\u83DC\u5355\u9879\u4E8B\u4EF6\u7684\u7D22\u5F15\u53F7\uFF1B
        //      \u610F\u5373\u89E6\u53D1\u7B2C\u51E0\u4E2A\u53F3\u952E\u83DC\u5355\u9879\u4E0A\u7684\u4E8B\u4EF6\u3002
        //  Number \u7C7B\u578B\u503C\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF0C\u9ED8\u8BA4\u4E3A 0\uFF1B
        //  \u5907\u6CE8\uFF1A\u5F53\u8BBE\u7F6E\u4E86\u81EA\u5B9A\u4E49\u5C5E\u6027 autoBindDblClickRow: true\u5E76\u4E14\u8BBE\u7F6E\u4E86\u6709\u6548\u7684\u5C5E\u6027 rowContextMenu \u65F6\uFF0C\u8BE5\u529F\u80FD\u65B9\u6709\u6548\uFF1B
        //      \u5982\u679C\u6B64\u7D22\u5F15\u503C\u8D85\u51FA\u83DC\u5355\u6570\u91CF\u8303\u56F4\uFF0C\u5219\u65E0\u6548\u3002
        dblClickRowMenuIndex: 0,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u70B9\u51FB\u8868\u5934\u6216\u8005\u884C\u6570\u636E\u65F6\u5019\u5F39\u51FA\u83DC\u5355\u4E2D\u5177\u6709 "\u5BFC\u51FA\u6570\u636E" \u83DC\u5355\u7684\u529F\u80FD\uFF1B
        //  \u8BE5\u5C5E\u6027\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u5BFC\u51FA\u6570\u636E\u201D\u83DC\u5355\u9879\u529F\u80FD\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        //      JSON-Object \u7C7B\u578B\uFF0C\u8BE5 JSON-Object \u53EF\u4EE5\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          current:   Boolean \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u201C\u5BFC\u51FA\u5F53\u524D\u9875\u201D\u7684\u83DC\u5355\u9879\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //          all:   Boolean \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u201C\u5BFC\u51FA\u5168\u90E8\u201D\u7684\u83DC\u5355\u9879\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //          submenu:    \u8868\u793A\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\u662F\u5426\u4EE5\u5B50\u83DC\u5355\u65B9\u5F0F\u5448\u73B0\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //  \u5907\u6CE8\uFF1A\u5F53 enableRowContextMenu \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u6709\u6548\u3002
        //  \u5BFC\u51FA\u6570\u636E\u529F\u80FD\u7684\u65B9\u6CD5\u5C1A\u672A\u5B9E\u73B0\uFF0C\u6240\u4EE5...\u5C31\u8BA9\u5B83\u4FDD\u6301\u9ED8\u8BA4\u4E3A false \u5427\u3002
        exportMenu: false,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0CBoolean \u7C7B\u578B\u503C\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\uFF1A
        //      \u5F53\u53F3\u952E\u5355\u51FB\u884C\u6570\u636E\u65F6\u9009\u62E9\u53F3\u952E\u5F53\u524D\u5355\u51FB\u7684\u884C\u7684\u529F\u80FD\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //  \u6CE8\u610F\uFF1A\u5F53\u6B64\u53C2\u6570\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u53F3\u952E\u70B9\u51FB\u884C\u4F1A\u5BF9\u6027\u80FD\u4EA7\u751F\u4E00\u5B9A\u5F71\u54CD\uFF1B\u5F53\u65F6\u6570\u636E\u91CF\u5927(\u5355\u9875\u6570\u636E\u8D85\u8FC7 100 \u884C)\u65F6\u4E0D\u5EFA\u8BAE\u4F7F\u7528\u3002
        selectOnRowContextMenu: false,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0CBoolean \u7C7B\u578B\u503C\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\uFF1A
        //      \u53F3\u952E(\u8868\u5934\u53F3\u952E\u6216\u884C\u53F3\u952E)\u70B9\u51FB\u65F6\u5F39\u51FA\u7684\u83DC\u5355\u9879\uFF0C\u5982\u679C\u662F disabled: true \uFF0C\u5219\u4E0D\u663E\u793A\u7684\u529F\u80FD\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B
        hideDisabledMenu: false,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u8868\u5217\u5934\u53F3\u952E\u83DC\u5355\uFF0C\u4E3A\u4E00\u4E2A Array \u5BF9\u8C61\uFF1B\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u5177\u6709\u5982\u4E0B\u5C5E\u6027:
        //      id:         \u8868\u793A\u83DC\u5355\u9879\u7684 id\uFF1B
        //      text:       \u8868\u793A\u83DC\u5355\u9879\u7684\u663E\u793A\u6587\u672C\uFF1B
        //      iconCls:    \u8868\u793A\u83DC\u5355\u9879\u7684\u5DE6\u4FA7\u663E\u793A\u56FE\u6807\uFF1B
        //      disabled:   \u8868\u793A\u83DC\u5355\u9879\u662F\u5426\u88AB\u7981\u7528(\u7981\u7528\u7684\u83DC\u5355\u9879\u70B9\u51FB\u65E0\u6548)\uFF1B
        //      hideOnClick:    \u8868\u793A\u8BE5\u83DC\u5355\u9879\u70B9\u51FB\u540E\u6574\u4E2A\u53F3\u952E\u83DC\u5355\u662F\u5426\u7ACB\u5373\u81EA\u52A8\u9690\u85CF\uFF1B
        //      bold:           Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B\u8868\u793A\u8BE5\u83DC\u5355\u9879\u662F\u5426\u5B57\u4F53\u52A0\u7C97\uFF1B
        //      style:          JSON-Object \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A null\uFF1B\u8868\u793A\u8981\u9644\u52A0\u5230\u8BE5\u83DC\u5355\u9879\u7684\u6837\u5F0F\uFF1B
        //      handler:    \u8868\u793A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u683C\u5F0F\u4E3A function(e, field, eventData, grid, item, menu)\uFF0C\u5176\u4E2D this \u6307\u5411\u83DC\u5355\u9879\u672C\u8EAB
        //  \u5907\u6CE8\uFF1A\u5177\u4F53\u683C\u5F0F\u53C2\u8003 easyui-treegrid \u7684 toolbar \u5C5E\u6027\u4E3A Array \u5BF9\u8C61\u7C7B\u578B\u7684\u683C\u5F0F\uFF1B
        //      \u5F53 enableHeaderContextMenu \u5C5E\u6027\u4E3A true \u65F6\uFF0C\u8BE5\u8BBE\u7F6E\u65B9\u6709\u6548\u3002
        headerContextMenu: null,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u6570\u636E\u884C\u53F3\u952E\u83DC\u5355\uFF0C\u4E3A\u4E00\u4E2A Array \u5BF9\u8C61\uFF1B\uFF1B\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u5177\u6709\u5982\u4E0B\u5C5E\u6027:
        //      id:         \u8868\u793A\u83DC\u5355\u9879\u7684 id\uFF1B
        //      text:       \u8868\u793A\u83DC\u5355\u9879\u7684\u663E\u793A\u6587\u672C\uFF1B
        //      iconCls:    \u8868\u793A\u83DC\u5355\u9879\u7684\u5DE6\u4FA7\u663E\u793A\u56FE\u6807\uFF1B
        //      disabled:   \u8868\u793A\u83DC\u5355\u9879\u662F\u5426\u88AB\u7981\u7528(\u7981\u7528\u7684\u83DC\u5355\u9879\u70B9\u51FB\u65E0\u6548)\uFF1B
        //      hideOnClick:    \u8868\u793A\u8BE5\u83DC\u5355\u9879\u70B9\u51FB\u540E\u6574\u4E2A\u53F3\u952E\u83DC\u5355\u662F\u5426\u7ACB\u5373\u81EA\u52A8\u9690\u85CF\uFF1B
        //      bold:           Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B\u8868\u793A\u8BE5\u83DC\u5355\u9879\u662F\u5426\u5B57\u4F53\u52A0\u7C97\uFF1B
        //      style:          JSON-Object \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A null\uFF1B\u8868\u793A\u8981\u9644\u52A0\u5230\u8BE5\u83DC\u5355\u9879\u7684\u6837\u5F0F\uFF1B
        //      handler:    \u8868\u793A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u683C\u5F0F\u4E3A function(e, row, eventData, grid, item, menu)\uFF0C\u5176\u4E2D this \u6307\u5411\u83DC\u5355\u9879\u672C\u8EAB
        //  \u5907\u6CE8\uFF1A\u5177\u4F53\u683C\u5F0F\u53C2\u8003 easyui-treegrid \u7684 toolbar \u5C5E\u6027\u4E3A Array \u5BF9\u8C61\u7C7B\u578B\u7684\u683C\u5F0F\uFF1B
        //      \u5F53 enableRowContextMenu \u5C5E\u6027\u4E3A true \u65F6\uFF0C\u8BE5\u8BBE\u7F6E\u65B9\u6709\u6548\u3002
        rowContextMenu: null,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528 easyui-treegrid \u7684\u8868\u5934\u5217\u70B9\u51FB\u6309\u94AE\u83DC\u5355\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002 
        enableHeaderClickMenu: true,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528 easyui-treegrid \u7684\u8868\u5934\u53F3\u952E\u83DC\u5355\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        enableHeaderContextMenu: true,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528 easyui-treegrid \u7684\u884C\u53F3\u952E\u83DC\u5355\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        enableRowContextMenu: true,

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u5C55\u5F00\u5F53\u524D、\u6298\u53E0\u5F53\u524D、\u5C55\u5F00\u5F53\u524D\u6240\u6709、\u6298\u53E0\u5F53\u524D\u6240\u6709\u201D\u83DC\u5355\u9879\u7684\u529F\u80FD\uFF1B
        //  \u8BE5\u5C5E\u6027\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\uFF1B
        //      JSON-Object \u7C7B\u578B\uFF0C\u8BE5 JSON-Object \u53EF\u4EE5\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          expand:     \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u5C55\u5F00\u5F53\u524D\u201D\u83DC\u5355\uFF1B
        //          expandAll:  \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u5C55\u5F00\u5F53\u524D\u6240\u6709\u201D\u83DC\u5355\uFF1B
        //          collapse:   \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u6298\u53E0\u5F53\u524D\u201D\u83DC\u5355\uFF1B
        //          collapseAll: \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u6298\u53E0\u5F53\u524D\u6240\u6709\u201D\u83DC\u5355\uFF1B
        //          submenu:    \u8868\u793A\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\u662F\u5426\u4EE5\u5B50\u83DC\u5355\u65B9\u5F0F\u5448\u73B0\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //          \u4E0A\u9762\u56DB\u4E2A\u5C5E\u6027\uFF0C\u5982\u679C\u53C2\u6570\u7684\u503C\u4E3A\u51FD\u6570\uFF0C\u5219\u51FD\u6570\u7684\u7B7E\u540D\u4E3A function(e, node, treegrid, item, menu)\u3002
        //  \u5907\u6CE8\uFF1A\u5F53 enableRowContextMenu \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u6709\u6548\u3002
        //      \u8FD9\u56DB\u4E2A\u83DC\u5355\u70B9\u51FB\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1 easyui-treegrid \u7684\u6298\u53E0/\u5C55\u5F00\u83DC\u5355\u9879\u7684\u76F8\u5E94\u4E8B\u4EF6\u3002
        toggleMenu: true,

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u4E0A\u79FB、\u4E0B\u79FB、\u4E0A\u79FB\u4E00\u7EA7、\u4E0B\u79FB\u4E00\u7EA7\u201D\u83DC\u5355\u9879\u7684\u529F\u80FD\uFF1B
        //  \u8BE5\u5C5E\u6027\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B
        //      JSON-Object \u7C7B\u578B\uFF0C\u8BE5 JSON-Object \u53EF\u4EE5\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          up:         \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u4E0A\u79FB\u201D\u83DC\u5355\uFF1B
        //          upLevel:    \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u4E0A\u79FB\u4E00\u7EA7\u201D\u83DC\u5355\uFF1B
        //          down:       \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u4E0B\u79FB\u201D\u83DC\u5355\uFF1B
        //          downLevel:  \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u4E0B\u79FB\u4E00\u7EA7\u201D\u83DC\u5355\uFF1B
        //          submenu:    \u8868\u793A\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\u662F\u5426\u4EE5\u5B50\u83DC\u5355\u65B9\u5F0F\u5448\u73B0\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //          \u4E0A\u9762\u56DB\u4E2A\u5C5E\u6027\uFF0C\u5982\u679C\u53C2\u6570\u7684\u503C\u4E3A\u51FD\u6570\uFF0C\u5219\u51FD\u6570\u7684\u7B7E\u540D\u4E3A function(e, node, treegrid, item, menu)\u3002
        //  \u5907\u6CE8\uFF1A\u5F53 enableRowContextMenu \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u6709\u6548\u3002
        //      \u8FD9\u56DB\u4E2A\u83DC\u5355\u70B9\u51FB\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1 easyui-treegrid \u7684 onDrop \u4E8B\u4EF6\u3002
        moveMenu: false,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u7FFB\u9875\u201D\u83DC\u5355\u9879\u7684\u529F\u80FD\uFF1B
        //  \u8BE5\u5C5E\u6027\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u7FFB\u9875\u201D\u83DC\u5355\u9879\u529F\u80FD\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        //      JSON-Object \u7C7B\u578B\uFF0C\u8BE5 JSON-Object \u53EF\u4EE5\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          disabled:   Boolean \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u7FFB\u9875\u201D\u83DC\u5355\u9879\u529F\u80FD\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //          submenu:    \u8868\u793A\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\u662F\u5426\u4EE5\u5B50\u83DC\u5355\u65B9\u5F0F\u5448\u73B0\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //  \u5907\u6CE8\uFF1A\u5F53 enableRowContextMenu \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u6709\u6548\u3002
        pagingMenu: false,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u5237\u65B0\u5F53\u524D\u9875\u201D\u83DC\u5355\u9879\u7684\u529F\u80FD\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        refreshMenu: true,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\u8868\u683C\u7684\u884C\u8282\u70B9\u62D6\u52A8\u529F\u80FD\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        dndRow: false,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\u884C\u6570\u636E\u7684 tooltip \u529F\u80FD\uFF1B
        //  \u8BE5\u5C5E\u6027\u53EF\u4EE5\u662F\u4E00\u4E2A Boolean \u7C7B\u578B\u503C\uFF1B\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A\u683C\u5F0F\u4E3A function(row) \u7684\u56DE\u8C03\u51FD\u6570\uFF1B
        //  \u5982\u679C\u8BE5\u53C2\u6570\u662F\u4E00\u4E2A\u56DE\u8C03\u51FD\u6570\uFF0C\u5219\u8868\u793A\u542F\u7528\u884C\u6570\u636E\u7684 tooltip \u529F\u80FD\uFF0C\u5E76\u4E14\u8BE5\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4E3A tooltip \u7684 content \u503C\u3002
        //  \u9ED8\u8BA4\u4E3A Boolean \u7C7B\u578B\uFF0C\u503C\u4E3A false\u3002
        //  \u6CE8\u610F\uFF1A\u5F53\u542F\u7528\u8BE5\u914D\u7F6E\u5C5E\u6027\u540E\uFF0C\u6240\u6709\u5217\u7684 tootip \u5C5E\u6027\u5C31\u4F1A\u81EA\u52A8\u5931\u6548\u3002
        rowTooltip: false,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u5728\u89E6\u53D1 beginEdit \u4E8B\u4EF6\u540E\uFF0C\u662F\u5426\u6784\u5EFA\u4EFF ext-grid-rowediting \u884C\u7F16\u8F91\u7684\u201C\u4FDD\u5B58\u201D\u548C\u201C\u53D6\u6D88\u201D\u6309\u94AE\u9762\u677F\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        extEditing: true,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u5728\u53CC\u51FB data-row(\u6570\u636E\u884C) \u65F6\uFF0C\u662F\u5426\u81EA\u52A8\u542F\u7528\u8BE5\u884C\u7684\u7F16\u8F91\u529F\u80FD(\u6267\u884C beginEdit \u64CD\u4F5C)\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        //  \u6CE8\u610F\uFF1A\u5F53 autoBindDblClickRow \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u4E14\u83DC\u5355\u9879\u6EE1\u8DB3\u5176\u89E6\u53D1\u6761\u4EF6\u65F6\uFF0CautoEditing \u7684\u53CC\u51FB\u884C\u65F6\u81EA\u52A8\u542F\u7528\u7F16\u8F91\u6548\u679C\u5C06\u4E0D\u4F1A\u89E6\u53D1\u3002
        autoEditing: false,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u5728\u4E00\u4E2A\u65F6\u523B\u53EA\u5141\u8BB8\u4E00\u884C\u6570\u636E\u5F00\u542F\u7F16\u8F91\u72B6\u6001(\u5F53\u67D0\u884C\u6570\u636E\u5F00\u542F\u7F16\u8F91\u72B6\u6001\u65F6\uFF0C\u5176\u4ED6\u6B63\u5728\u7F16\u8F91\u7684\u884C\u5C06\u4F1A\u88AB\u81EA\u52A8\u6267\u884C endEdit \u64CD\u4F5C)\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        singleEditing: true,

        //  \u589E\u52A0 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u524D\u8868\u683C\u7684\u5217\u8FC7\u6EE4\u5668\u8BBE\u7F6E\u53C2\u6570\uFF1B\u8BE5\u53C2\u6570\u662F\u4E00\u4E2A JSON \u683C\u5F0F\u7684\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      panelHeight: \u5217\u8FC7\u6EE4\u5668\u63A7\u4EF6\u9762\u677F\u7684\u9AD8\u5EA6\uFF0C\u9ED8\u8BA4\u4E3A 100\uFF0C\u8BE5\u503C\u6700\u5C0F\u4E3A 60\uFF1B
        //      position:   \u8868\u793A\u5217\u8FC7\u6EE4\u5668\u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u4EE5\u586B\u5165\u7684\u503C\u9650\u5B9A\u5728\u4EE5\u4E0B\u8303\u56F4\uFF1A
        //          "top":  \u8868\u793A\u5217\u8FC7\u6EE4\u5668\u88AB\u653E\u7F6E\u5728\u8868\u5934\u7684\u4E0A\u65B9\uFF1B
        //          "bottom":   \u8868\u793A\u5217\u8FC7\u6EE4\u5668\u88AB\u653E\u7F6E\u5728\u8868\u5934\u7684\u4E0B\u65B9\uFF1B\u9ED8\u8BA4\u503C\u3002
        //  \u5907\u6CE8\uFF1A\u5173\u4E8E\u5217\u8FC7\u6EE4\u5668\u7EC4\u4EF6\u4E2D\u6BCF\u4E2A\u5217\u5177\u4F53\u7684\u8FC7\u6EE4\u6548\u679C\u8BBE\u7F6E\uFF0C\u53C2\u89C1\u6269\u5C55\u7684 ColumnOption \u5C5E\u6027(\u89C1\u672C\u6E90\u7801\u6587\u4EF6\u540E\u9762\u6CE8\u91CA)\uFF1B
        //  \u6CE8\u610F\uFF1A
        //      1、\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5219\u8868\u793A\u5F53\u524D easyui-treegrid \u63A7\u4EF6\u4E0D\u542F\u7528\u5217\u8FC7\u6EE4\u5668\u529F\u80FD\uFF1B\u8BE5\u53C2\u6570\u4E0D\u5F71\u54CD\u8868\u5934\u53F3\u952E\u8FC7\u6EE4\u529F\u80FD\uFF1B
        //      2、\u8BE5\u529F\u80FD\u4E0D\u652F\u6301\u591A\u884C\u8868\u5934\uFF1B\u4E5F\u5C31\u662F\u8BF4\u5982\u679C\u5F53\u524D easyui-treegrid \u8BBE\u7F6E\u4E86\u591A\u884C\u8868\u5934\uFF0C\u5219\u8BE5\u529F\u80FD\u65E0\u6548\uFF1B
        //      3、\u8BE5\u529F\u80FD\u4EC5\u5B9E\u73B0\u672C\u5730\u6570\u636E\u8FC7\u6EE4\uFF0C\u4E5F\u5C31\u662F\u8BF4\u8BE5\u63D2\u4EF6\u4E0D\u4F1A\u5728\u5904\u7406\u8FDC\u7A0B\u6570\u636E\u8BF7\u6C42\u65F6\u5C06\u8FC7\u6EE4\u53C2\u6570\u4FE1\u606F\u53D1\u9001\u5230\u8FDC\u7A0B\u670D\u52A1\u5668\uFF1B
        //      4、\u5F53\u542F\u7528\u8BE5\u529F\u80FD\u65F6\uFF0Ceasyui-treegrid \u7684\u5C5E\u6027 fitColumns \u8BF7\u4FDD\u6301\u9ED8\u8BA4\u503C\u4E3A false\uFF0C\u5426\u5219\u5217\u5934\u8FC7\u6EE4\u5668\u7EC4\u4EF6\u53EF\u80FD\u5BFC\u81F4\u8868\u5934\u5217\u4E0D\u80FD\u5BF9\u9F50\u800C\u5E03\u5C40\u6DF7\u4E71\u3002
        columnFilter: null,

        //  \u8986\u76D6 easyui-treegrid \u7684\u539F\u751F\u5C5E\u6027 loader\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        loader: loader,

        //  \u8986\u76D6 easyui-treegrid \u7684\u539F\u751F\u5C5E\u6027\u4E8B\u4EF6 onLoadSuccess\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        //  \u6CE8\u610F\uFF1A\u5982\u679C\u8C03\u7528\u8005\u9700\u8981\u5728\u81EA\u5DF1\u7684\u4EE3\u7801\u4E2D\u4F7F\u7528\u8BE5\u4E8B\u4EF6\uFF0C\u8BF7\u4EE5\u8986\u76D6\u65B9\u5F0F\u91CD\u5199\uFF0C\u800C\u975E\u76F4\u63A5\u91CD\u5199\u3002
        //  \u8986\u76D6\u65B9\u5F0F\u91CD\u5199\u793A\u4F8B\uFF1A
        //      grid.treegrid({
        //          onLoadSuccess: function(data) {
        //              $.fn.treegrid.extensions.onLoadSuccess.apply(this, arguments);  //\u8FD9\u53E5\u4E00\u5B9A\u8981\u52A0\u4E0A\u3002
        //              ...                                     //\u8FD9\u91CC\u662F\u8C03\u7528\u8005\u7684\u5176\u4ED6\u9644\u52A0\u903B\u8F91\u4EE3\u7801
        //          }
        //      });
        onLoadSuccess: onLoadSuccess,

        //  \u8986\u76D6 easyui-treegrid \u7684\u539F\u751F\u5C5E\u6027\u4E8B\u4EF6 onResizeColumn\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        //  \u6CE8\u610F\uFF1A\u5982\u679C\u8C03\u7528\u8005\u9700\u8981\u5728\u81EA\u5DF1\u7684\u4EE3\u7801\u4E2D\u4F7F\u7528\u8BE5\u4E8B\u4EF6\uFF0C\u8BF7\u4EE5\u8986\u76D6\u65B9\u5F0F\u91CD\u5199\uFF0C\u800C\u975E\u76F4\u63A5\u91CD\u5199\u3002
        //  \u8986\u76D6\u65B9\u5F0F\u91CD\u5199\u793A\u4F8B\uFF1A
        //      grid.treegrid({
        //          onResizeColumn: function(data) {
        //              $.fn.treegrid.extensions.onResizeColumn.apply(this, arguments);  //\u8FD9\u53E5\u4E00\u5B9A\u8981\u52A0\u4E0A\u3002
        //              ...                                     //\u8FD9\u91CC\u662F\u8C03\u7528\u8005\u7684\u5176\u4ED6\u9644\u52A0\u903B\u8F91\u4EE3\u7801
        //          }
        //      });
        onResizeColumn: onResizeColumn,

        //  \u8986\u76D6 easyui-treegrid \u7684\u539F\u751F\u5C5E\u6027\u4E8B\u4EF6 onBeforeEdit\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        onBeforeEdit: onBeforeEdit,

        //  \u8986\u76D6 easyui-treegrid \u7684\u539F\u751F\u5C5E\u6027\u4E8B\u4EF6 onAfterEdit\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        //  \u6CE8\u610F\uFF1A\u5982\u679C\u8C03\u7528\u8005\u9700\u8981\u5728\u81EA\u5DF1\u7684\u4EE3\u7801\u4E2D\u4F7F\u7528\u8BE5\u4E8B\u4EF6\uFF0C\u8BF7\u4EE5\u8986\u76D6\u65B9\u5F0F\u91CD\u5199\uFF0C\u800C\u975E\u76F4\u63A5\u91CD\u5199\u3002
        //  \u8986\u76D6\u65B9\u5F0F\u91CD\u5199\u793A\u4F8B\uFF1A
        //      grid.treegrid({
        //          onAfterEdit: function(data) {
        //              $.fn.treegrid.extensions.onAfterEdit.apply(this, arguments);  //\u8FD9\u53E5\u4E00\u5B9A\u8981\u52A0\u4E0A\u3002
        //              ...                                     //\u8FD9\u91CC\u662F\u8C03\u7528\u8005\u7684\u5176\u4ED6\u9644\u52A0\u903B\u8F91\u4EE3\u7801
        //          }
        //      });
        onAfterEdit: onAfterEdit,

        //  \u8986\u76D6 easyui-treegrid \u7684\u539F\u751F\u5C5E\u6027\u4E8B\u4EF6 onCancelEdit\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        onCancelEdit: onCancelEdit,

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5220\u9664\u6307\u5B9A\u7684\u5217\u524D\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      field:  \u8868\u793A\u8981\u88AB\u5220\u9664\u7684\u5217\u7684 field \u503C\u3002
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u4E0D\u8FDB\u884C\u5220\u9664\u5217\u7684\u64CD\u4F5C\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treegrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onBeforeDeleteColumn: function (field) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5220\u9664\u6307\u5B9A\u7684\u5217\u540E\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      field:  \u8868\u793A\u8981\u88AB\u5220\u9664\u7684\u5217\u7684 field \u503C\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treegrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onDeleteColumn: function (field) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u79FB\u52A8\u6307\u5B9A\u7684\u5217\u524D\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      source:  \u8868\u793A\u8981\u88AB\u79FB\u52A8\u7684\u5217\u7684 field \u503C\u3002
        //      target:  \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u7684\u5217\u7684 field \u503C\u3002
        //      point :  \u8868\u793A\u79FB\u52A8\u7684\u65B9\u5F0F\uFF1B\u8FD9\u662F\u4E00\u4E2A String \u7C7B\u578B\u503C\uFF0C\u53EF\u80FD\u7684\u503C\u5305\u62EC\uFF1A
        //          "before":   \u8868\u793A\u5C06\u5217 source \u79FB\u52A8\u81F3\u5217 target \u7684\u524D\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //          "after" :   \u8868\u793A\u5C06\u5217 source \u79FB\u52A8\u81F3\u5217 target \u7684\u540E\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u4E0D\u8FDB\u884C\u5220\u9664\u5217\u7684\u64CD\u4F5C\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treegrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onBeforeMoveColumn: function (source, target, point) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u79FB\u52A8\u6307\u5B9A\u7684\u5217\u540E\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      source:  \u8868\u793A\u8981\u88AB\u79FB\u52A8\u7684\u5217\u7684 field \u503C\u3002
        //      target:  \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u7684\u5217\u7684 field \u503C\u3002
        //      point :  \u8868\u793A\u79FB\u52A8\u7684\u65B9\u5F0F\uFF1B\u8FD9\u662F\u4E00\u4E2A String \u7C7B\u578B\u503C\uFF0C\u53EF\u80FD\u7684\u503C\u5305\u62EC\uFF1A
        //          "before":   \u8868\u793A\u5C06\u5217 source \u79FB\u52A8\u81F3\u5217 target \u7684\u524D\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //          "after" :   \u8868\u793A\u5C06\u5217 source \u79FB\u52A8\u81F3\u5217 target \u7684\u540E\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treegrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onMoveColumn: function (source, target, point) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u79FB\u52A8 tree-node \u4E4B\u524D\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E09\u4E2A\u53C2\u6570\uFF1A
        //          target: \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u7684 tree-node \u5BF9\u8C61\uFF1B
        //          source: \u8868\u793A\u8981\u79FB\u52A8\u7684 tree-node \u5BF9\u8C61\uFF1B
        //          point:  \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u80FD\u7684\u503C\u5305\u62EC\uFF1A
        //              "append":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u8282\u70B9 target \u7684\u5B50\u8282\u70B9\uFF0C\u9ED8\u8BA4\u503C\uFF1B
        //              "top":      \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4E0A\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //              "bottom":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u8282\u70B9 target \u7684\u4E0B\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treegrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5982\u679C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u4F1A\u7ACB\u5373\u505C\u6B62\u79FB\u52A8\u6570\u636E\u8282\u70B9\u64CD\u4F5C\uFF1B
        onBeforeDrop: function (target, source, point) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u79FB\u52A8 tree-node \u4E4B\u540E\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E09\u4E2A\u53C2\u6570\uFF1A
        //          target: \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u7684 tree-node \u5BF9\u8C61\uFF1B
        //          source: \u8868\u793A\u8981\u79FB\u52A8\u7684 tree-node \u5BF9\u8C61\uFF1B
        //          point:  \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u80FD\u7684\u503C\u5305\u62EC\uFF1A
        //              "append":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u8282\u70B9 target \u7684\u5B50\u8282\u70B9\uFF0C\u9ED8\u8BA4\u503C\uFF1B
        //              "top":      \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4E0A\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //              "bottom":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u8282\u70B9 target \u7684\u4E0B\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treegrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onDrop: function (target, source, point) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u62D6\u52A8 data-row(\u6570\u636E\u884C) \u4E4B\u524D\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      row:    \u8868\u793A\u88AB\u62D6\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treerid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u53D6\u6D88\u5F53\u524D\u7684\u62D6\u52A8 data-row(\u6570\u636E\u884C) \u64CD\u4F5C\u3002
        onBeforeDrag: function (row) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5F00\u59CB\u62D6\u52A8 data-row(\u6570\u636E\u884C) \u65F6\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      row:    \u8868\u793A\u88AB\u62D6\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treerid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onStartDrag: function (row) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u7ED3\u675F\u62D6\u52A8 data-row(\u6570\u636E\u884C) \u65F6\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      row:    \u8868\u793A\u88AB\u62D6\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treerid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onStopDrag: function (row) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5F53\u6709\u5176\u4ED6\u7684 data-row(\u6570\u636E\u884C) \u88AB\u62D6\u52A8\u81F3\u5F53\u524D data-row(\u6570\u636E\u884C) \u65F6\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      target: \u8868\u793A\u5F53\u524D data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\uFF1B
        //      source: \u8868\u793A\u62D6\u52A8\u8FC7\u6765\u7684 data-row(\u6570\u636E\u884C) \u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treerid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u7ACB\u5373\u53D6\u6D88\u5F53\u524D\u7684 data-row(\u6570\u636E\u884C) \u63A5\u6536\u62D6\u52A8\u8FC7\u6765\u5BF9\u8C61\u7684\u64CD\u4F5C\uFF0C\u5E76\u7981\u7528\u5F53\u524D data-row(\u6570\u636E\u884C) \u7684 droppable \u6548\u679C\uFF1B
        onDragEnter: function (target, source) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5F53\u6709\u5176\u4ED6\u7684 data-row(\u6570\u636E\u884C) \u88AB\u62D6\u52A8\u81F3\u5F53\u524D data-row(\u6570\u636E\u884C) \u540E\u5E76\u5728\u4E0A\u9762\u79FB\u52A8\u65F6\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      target: \u8868\u793A\u5F53\u524D data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\uFF1B
        //      source: \u8868\u793A\u62D6\u52A8\u8FC7\u6765\u7684 data-row(\u6570\u636E\u884C) \u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treerid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u7ACB\u5373\u53D6\u6D88\u5F53\u524D\u7684 data-row(\u6570\u636E\u884C) \u63A5\u6536\u62D6\u52A8\u8FC7\u6765\u5BF9\u8C61\u7684\u64CD\u4F5C\uFF0C\u5E76\u7981\u7528\u5F53\u524D data-row(\u6570\u636E\u884C) \u7684 droppable \u6548\u679C\uFF1B
        onDragOver: function (target, source) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5F53\u6709\u5176\u4ED6\u7684 data-row(\u6570\u636E\u884C) \u88AB\u62D6\u52A8\u81F3\u5F53\u524D data-row(\u6570\u636E\u884C) \u540E\u5E76\u62D6\u52A8\u79BB\u5F00\u65F6\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      target: \u8868\u793A\u5F53\u524D data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\uFF1B
        //      source: \u8868\u793A\u62D6\u52A8\u8FC7\u6765\u7684 data-row(\u6570\u636E\u884C) \u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treerid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onDragLeave: function (target, source) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C update \u65B9\u6CD5\u524D\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      id:     \u8868\u793A\u8981\u8FDB\u884C update \u64CD\u4F5C\u7684\u884C\u7684 idField \u503C\uFF1B
        //      row:    \u8868\u793A\u8981\u8FDB\u884C\u66F4\u65B0\u64CD\u4F5C\u7684\u65B0\u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treerid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u7ACB\u5373\u53D6\u6D88\u5373\u5C06\u8981\u6267\u884C\u7684 update \u64CD\u4F5C\u3002
        onBeforeUpdate: function (index, row) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C updateRow \u65B9\u6CD5\u540E\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      id:  \u8868\u793A\u8981\u8FDB\u884C update \u7684\u884C\u7684 idField \u503C
        //      row:    \u8868\u793A\u8981\u8FDB\u884C\u66F4\u65B0\u64CD\u4F5C\u7684\u65B0\u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treerid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onUpdate: function (index, row) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C append \u65B9\u6CD5\u524D\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      parent: \u8868\u793A\u88AB\u6DFB\u52A0\u81F3\u7684\u7236\u7EA7\u8282\u70B9\u7684 idField \u503C\uFF1B\u5982\u679C\u8BE5\u503C\u4E3A null \u6216\u8005\u4E3A undefined\uFF0C\u5219\u8868\u793A\u6570\u636E\u88AB\u6DFB\u52A0\u81F3\u6839\u8282\u70B9\uFF1B
        //      data:   \u8868\u793A\u88AB\u6DFB\u52A0\u7684\u8282\u70B9\u6570\u636E\uFF0C\u662F\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF1B\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u8868\u793A\u8282\u70B9\u6570\u636E\u7684 JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treerid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u7ACB\u5373\u53D6\u6D88\u5373\u5C06\u8981\u6267\u884C\u7684 append \u64CD\u4F5C\u3002
        onBeforeAppend: function (parent, data) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C append \u65B9\u6CD5\u540E\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      parent: \u8868\u793A\u88AB\u6DFB\u52A0\u81F3\u7684\u7236\u7EA7\u8282\u70B9\u7684 idField \u503C\uFF1B\u5982\u679C\u8BE5\u503C\u4E3A null \u6216\u8005\u4E3A undefined\uFF0C\u5219\u8868\u793A\u6570\u636E\u88AB\u6DFB\u52A0\u81F3\u6839\u8282\u70B9\uFF1B
        //      data:   \u8868\u793A\u88AB\u6DFB\u52A0\u7684\u8282\u70B9\u6570\u636E\uFF0C\u662F\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF1B\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u8868\u793A\u8282\u70B9\u6570\u636E\u7684 JSON-Object\u3002
        onAppend: function (parent, data) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C insert \u65B9\u6CD5\u524D\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      before: \u5982\u679C\u8BE5\u53C2\u6570\u6709\u503C\uFF0C\u5219\u5176\u503C\u4E3A\u67D0\u4E2A\u8282\u70B9\u7684 idField \u503C\uFF0C\u8868\u793A\u88AB\u63D2\u5165\u7684\u8282\u70B9\u5C06\u4F1A\u653E\u7F6E\u5728\u8BE5\u8282\u70B9\u4E4B\u524D\uFF1B
        //      after:  \u5982\u679C\u8BE5\u53C2\u6570\u6709\u503C\uFF0C\u5219\u5176\u503C\u4E3A\u67D0\u4E2A\u8282\u70B9\u7684 idField \u503C\uFF0C\u8868\u793A\u88AB\u63D2\u5165\u7684\u8282\u70B9\u5C06\u4F1A\u653E\u7F6E\u5728\u8BE5\u8282\u70B9\u4E4B\u540E\uFF1B
        //      data:   \u8868\u793A\u88AB\u63D2\u5165\u7684\u8282\u70B9\u6570\u636E\uFF0C\u662F\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF1B\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u8868\u793A\u8282\u70B9\u6570\u636E\u7684 JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treerid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u7ACB\u5373\u53D6\u6D88\u5373\u5C06\u8981\u6267\u884C\u7684 insert \u64CD\u4F5C\u3002
        //      \u8BE5\u56DE\u8C03\u51FD\u6570\u7684\u53C2\u6570 before \u548C after\uFF0C\u4E24\u8005\u53EA\u6709\u4E00\u4E2A\u4F1A\u6709\u503C\uFF0C\u53E6\u4E00\u4E2A\u7684\u503C\u5C06\u4F1A\u4E3A null \u6216\u8005 undefined\u3002
        onBeforeInsert: function (before, after, row) { },

        //  \u6269\u5C55 easyui-treegrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C insert \u65B9\u6CD5\u540E\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      before: \u5982\u679C\u8BE5\u53C2\u6570\u6709\u503C\uFF0C\u5219\u5176\u503C\u4E3A\u67D0\u4E2A\u8282\u70B9\u7684 idField \u503C\uFF0C\u8868\u793A\u88AB\u63D2\u5165\u7684\u8282\u70B9\u5C06\u4F1A\u653E\u7F6E\u5728\u8BE5\u8282\u70B9\u4E4B\u524D\uFF1B
        //      after:  \u5982\u679C\u8BE5\u53C2\u6570\u6709\u503C\uFF0C\u5219\u5176\u503C\u4E3A\u67D0\u4E2A\u8282\u70B9\u7684 idField \u503C\uFF0C\u8868\u793A\u88AB\u63D2\u5165\u7684\u8282\u70B9\u5C06\u4F1A\u653E\u7F6E\u5728\u8BE5\u8282\u70B9\u4E4B\u540E\uFF1B
        //      data:   \u8868\u793A\u88AB\u63D2\u5165\u7684\u8282\u70B9\u6570\u636E\uFF0C\u662F\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF1B\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F\u4E00\u4E2A\u8868\u793A\u8282\u70B9\u6570\u636E\u7684 JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-treerid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u7ACB\u5373\u53D6\u6D88\u5373\u5C06\u8981\u6267\u884C\u7684 insert \u64CD\u4F5C\u3002
        //      \u8BE5\u56DE\u8C03\u51FD\u6570\u7684\u53C2\u6570 before \u548C after\uFF0C\u4E24\u8005\u53EA\u6709\u4E00\u4E2A\u4F1A\u6709\u503C\uFF0C\u53E6\u4E00\u4E2A\u7684\u503C\u5C06\u4F1A\u4E3A null \u6216\u8005 undefined\u3002
        onInsert: function (index, row) { }
    };

    $.extend($.fn.treegrid.defaults, defaults);
    $.extend($.fn.treegrid.methods, methods);



    var view = {
        onBeforeRender: function (target, id, data) {
            if ($.isArray(id)) {
                data = { total: id.length, rows: id };
                id = null;
            }
            if (!data) { return false; }
            var state = $.data(target, "treegrid");
            var opts = state.options;
            if (data.length == undefined) {
                if (data.footer) { state.footer = data.footer; }
                if (data.total) { state.total = data.total; }
                data = this.transfer(target, id, data.rows);
            }
            setParent(data.length == undefined ? data.rows : data, id);
            var node = findRow(target, id);
            if (node) {
                if (node.children) {
                    node.children = node.children.concat(data);
                } else {
                    node.children = data;
                }
            } else {
                state.data = state.data.concat(data);
            }
            if (!opts.remoteSort) { this.sort(target, data); }
            this.treeNodes = data;
            this.treeLevel = $(target).treegrid("getLevel", id);

            function setParent(rows, id) {
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    row._parentId = id;
                    if (row.children && row.children.length) {
                        setParent(row.children, row[opts.idField]);
                    }
                }
            };
        }
    };

    $.extend($.fn.treegrid.defaults.view, view);


    //  \u589E\u52A0\u6269\u5C55\u63D2\u4EF6\u4E2D\u8981\u7528\u5230\u7684\u81EA\u5B9A\u4E49\u6837\u5F0F
    var css =
        ".datagrid-body td.datagrid-header-cell-append { border-color: red; border-width: 2px; border-style: dotted; }"
    $.util.addCss(css);

})(jQuery);
