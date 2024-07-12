/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact author: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI datagrid Extensions 1.2.2 release
* jQuery EasyUI datagrid \u7EC4\u4EF6\u6269\u5C55
* jeasyui.extensions.datagrid.js
* \u4E8C\u6B21\u5F00\u53D1 \u9648\u5EFA\u4F1F
* \u6700\u8FD1\u66F4\u65B0\uFF1A2013-09-30
*
* \u4F9D\u8D56\u9879\uFF1A
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*   3、jeasyui.extensions.menu.js v1.0 beta late
*   4、jeasyui.extensions.panel.js v1.0 beta late \u548C jeasyui.extensions.window.js v1.0 beta late(\u53EF\u9009)
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {

    $.fn.datagrid.extensions = {};

    /************************  initExtend Methods Begin  ************************/

    var _updateRow = $.fn.datagrid.methods.updateRow;
    var _appendRow = $.fn.datagrid.methods.appendRow;
    var _insertRow = $.fn.datagrid.methods.insertRow;
    var updateRow = function (target, param) {
        if (!param || !param.row || !$.isNumeric(param.index)) { return; }
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        if ($.isFunction(opts.onBeforeUpdateRow) && opts.onBeforeUpdateRow.call(target, param.index, param.row) == false) { return; }
        _updateRow.call(t, t, param);
        initHeaderColumnFilterContainer(t, opts);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, param.index, param.row);
        if ($.isFunction(opts.onUpdateRow)) { opts.onUpdateRow.call(target, param.index, param.row); }
    };
    var appendRow = function (target, row) {
        if (!row) { return; }
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        if ($.isFunction(opts.onBeforeAppendRow) && opts.onBeforeAppendRow.call(target, row) == false) { return; }
        _appendRow.call(t, t, row);
        var rows = t.datagrid("getRows"), index = rows.length - 1;
        initHeaderColumnFilterContainer(t, opts);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, index, row);
        if ($.isFunction(opts.onAppendRow)) { opts.onAppendRow.call(target, row); }
    };
    var insertRow = function (target, param) {
        if (!param || !param.row || !$.isNumeric(param.index)) { return; }
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        if ($.isFunction(opts.onBeforeInsertRow) && opts.onBeforeInsertRow.call(target, param.index, param.row) == false) { return; }
        _insertRow.call(t, t, param);
        initHeaderColumnFilterContainer(t, opts);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, param.index, param.row);
        if ($.isFunction(opts.onInsertRow)) { opts.onInsertRow.call(target, param.index, param.row); }
    };

    var isChecked = function (target, index) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getChecked"),
            list = $.array.map(rows, function (val) { return t.datagrid("getRowIndex", val); });
        return $.array.contains(list, index);
    };

    var isSelected = function (target, index) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getSelections"),
            list = $.array.map(rows, function (val) { return t.datagrid("getRowIndex", val); });
        return $.array.contains(list, index);
    };

    var freezeColumn = function (target, field) {
        var t = $.util.parseJquery(target), fields = t.datagrid("getColumnFields"), frozenFields = t.datagrid("getColumnFields", true);
        if (!frozenFields || !frozenFields.length || !$.array.contains(fields, field) || $.array.contains(frozenFields, field)) { return; }
        t.datagrid("moveColumn", { source: field, target: frozenFields[frozenFields.length - 1], point: "after" });
    };

    var unfreezeColumn = function (target, field) {
        var t = $.util.parseJquery(target), fields = t.datagrid("getColumnFields"), frozenFields = t.datagrid("getColumnFields", true);
        if (!fields || !fields.length || $.array.contains(fields, field) || !$.array.contains(frozenFields, field)) { return; }
        t.datagrid("moveColumn", { source: field, target: fields[0], point: "before" });
    };

    var moveRow = function (target, param) {
        if (!param || !$.isNumeric(param.source) || !$.isNumeric(param.target) || param.source == param.target || !param.point) { return; }
        if (!$.array.contains(["top", "bottom"], param.point)) { param.point = "top"; }
        var t = $.util.parseJquery(target), opts = t.datagrid("options"), rows = t.datagrid("getRows"),
            sourceRow = rows[param.source], targetRow = rows[param.target];
        if (!sourceRow || !targetRow) { return; }
        if ($.isFunction(opts.onBeforeDrop) && opts.onBeforeDrop.call(target, targetRow, sourceRow, param.point) == false) { return; }
        var row = t.datagrid("popRow", param.source), index = t.datagrid("getRowIndex", targetRow);
        rows = t.datagrid("getRows");
        switch (param.point) {
            case "top": t.datagrid("insertRow", { index: index, row: row }); break;
            case "bottom":
                if (index++ >= rows.length) {
                    t.datagrid("appendRow", row);
                } else {
                    t.datagrid("insertRow", { index: index, row: row });
                }
                break;
            default: break;
        }
        if (row && $.isFunction(opts.onDrop)) { opts.onDrop.call(target, targetRow, sourceRow, param.point); }
    };

    var shiftRow = function (target, param) {
        if (!param || !$.isNumeric(param.index) || !param.point || !$.array.contains(["up", "down"], param.point)) { return; }
        var t = $.util.parseJquery(target), opts = t.datagrid("options"), index = param.point == "up" ? param.index - 1 : param.index + 1,
            point = param.point == "up" ? "top" : "bottom";
        t.datagrid("moveRow", { source: param.index, target: index, point: point });
    };

    var getNextRow = function (target, index) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows"), i = index + 1;
        return rows[i] ? rows[i] : null;
    };

    var getPrevRow = function (target, index) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows"), i = index - 1;
        return rows[i] ? rows[i] : null;
    };

    var popRow = function (target, index) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows"), row = rows[index];
        if (!row) { return null; }
        t.datagrid("deleteRow", index);
        return row;
    };

    var enableRowDnd = function (target) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        t.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable({
            disabled: false, revert: true, cursor: "default", deltaX: 10, deltaY: 5,
            proxy: function (source) {
                var tr = $.util.parseJquery(source), index = parseInt(tr.attr("datagrid-row-index")),
                    dom = t.datagrid("getRowDom", index).clone(),
                    temp = $("<tr></tr>").addClass("datagrid-row datagrid-row-selected");
                $("<td><span class='tree-dnd-icon tree-dnd-no' ></span></td>").appendTo(temp);
                var td = dom.find("td").each(function (i) { if (i < 6) { temp.append(this); } });
                if (td.length > 6) { $("<td>...</td>").css("width", "40px").appendTo(temp); }
                return $("<table></table>").addClass("tree-node-proxy").appendTo("body").append(temp).hide();
            }, onBeforeDrag: function (e) {
                var tr = $.util.parseJquery(this), index = parseInt(tr.attr("datagrid-row-index")), row = t.datagrid("getRowData", index);
                if ($.isFunction(opts.onBeforeDrag) && opts.onBeforeDrag.call(target, index, row) == false) { return false; }
                if (e.which != 1) { return false; }
                if (e.target.type == "checkbox") { return false; }
            }, onStartDrag: function () {
                var tr = $.util.parseJquery(this), index = parseInt(tr.attr("datagrid-row-index")), row = t.datagrid("getRowData", index);
                tr.draggable("proxy").css({ left: -10000, top: -10000 });
                if ($.isFunction(opts.onBeforeDrag)) { opts.onStartDrag.call(target, index, row); }
            }, onStopDrag: function () {
                var tr = $.util.parseJquery(this), index = parseInt(tr.attr("datagrid-row-index")), row = t.datagrid("getRowData", index);
                if ($.isFunction(opts.onStopDrag)) { opts.onStopDrag.call(target, index, row); }
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
                    droperIndex = parseInt(droper.attr("datagrid-row-index")),
                    dragerIndex = parseInt(drager.attr("datagrid-row-index")),
                    droperRow = t.datagrid("getRowData", droperIndex), dragerRow = t.datagrid("getRowData", dragerIndex),
                    droperRowDom = t.datagrid("getRowDom", droperIndex),
                    mark = droperRowDom.find("td");
                var dnd = droper.data("dnd"), data = {
                    droper: droper, drager: drager, droperIndex: droperIndex, dragerIndex: dragerIndex,
                    droperRow: droperRow, dragerRow: dragerRow, droperRowDom: droperRowDom, mark: mark
                };
                if (!dnd) { droper.data("dnd", data); } else { $.extend(dnd, data); }
                if ($.isFunction(opts.onDragEnter) && opts.onDragEnter.call(target, droperRow, dragerRow) == false) {
                    setDroppableStatus(drager, false);
                    mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                    droper.droppable("disable");
                }
            },
            onDragOver: function (e, source) {
                var droper = $.util.parseJquery(this), dnd = droper.data("dnd"), drager = dnd.drager,
                    droperRow = dnd.droperRow, dragerRow = dnd.dragerRow, mark = dnd.mark;
                if (droper.droppable("options").disabled) { return; }
                var pageY = source.pageY, top = droper.offset().top, height = top + droper.outerHeight();
                setDroppableStatus(drager, true);
                mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                if (pageY > top + (height - top) / 2) {
                    mark.addClass("datagrid-header-cell-bottom");
                } else {
                    mark.addClass("datagrid-header-cell-top");
                }
                if (opts.onDragOver.call(target, droperRow, dragerRow) == false) {
                    setDroppableStatus(drager, false);
                    mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                    droper.droppable("disable");
                }
            },
            onDragLeave: function (e, source) {
                var droper = $.util.parseJquery(this), dnd = droper.data("dnd"), drager = dnd.drager,
                    droperRow = dnd.droperRow, dragerRow = dnd.dragerRow, mark = dnd.mark;
                setDroppableStatus(drager, false);
                mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
                if ($.isFunction(opts.onDragLeave)) { opts.onDragLeave.call(target, droperRow, dragerRow); }
            },
            onDrop: function (e, source) {
                var droper = $.util.parseJquery(this), dnd = droper.data("dnd"),
                    droperIndex = dnd.droperIndex, dragerIndex = dnd.dragerIndex, mark = dnd.mark,
                    point = mark.hasClass("datagrid-header-cell-top") ? "top" : "bottom";
                t.datagrid("moveRow", { target: droperIndex, source: dragerIndex, point: point });
                mark.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
            }
        });
        opts.dndRow = true;
        function setDroppableStatus(source, state) {
            var icon = source.draggable("proxy").find("span.tree-dnd-icon");
            icon.removeClass("tree-dnd-yes tree-dnd-no").addClass(state ? "tree-dnd-yes" : "tree-dnd-no");
        };
    };

    var disableRowDnd = function (target) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        t.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable("disable");
        opts.dndRow = false;
    };



    var getNextColumn = function (target, field) {
        var t = $.util.parseJquery(target),
            fields = $.array.merge([], t.datagrid("getColumnFields", true), t.datagrid("getColumnFields", false)),
            index = $.array.indexOf(fields, field);
        if (index == -1 || index + 1 >= fields.length) { return null; }
        return t.datagrid("getColumnOption", fields[index + 1]);
    };

    var getPrevColumn = function (target, field) {
        var t = $.util.parseJquery(target),
            fields = $.array.merge([], t.datagrid("getColumnFields", true), t.datagrid("getColumnFields", false)),
            index = $.array.indexOf(fields, field);
        if (index < 1) { return null; }
        return t.datagrid("getColumnOption", fields[index - 1]);
    };


    var moveColumn = function (target, param) {
        if (!param || !param.source || !param.target || param.source == param.target || !param.point) { return; };
        if (!$.array.contains(["before", "after"], param.point)) { param.point = "before"; }
        var t = $.util.parseJquery(target);
        if (t.datagrid("hasMuliRowHeader")) { return; }
        var opts = t.datagrid("options"), sourceFrozen, targetFrozen,
            fields = t.datagrid("getColumnFields"), frozenFields = t.datagrid("getColumnFields", true);
        if ($.array.contains(fields, param.source)) { sourceFrozen = false; }
        if (sourceFrozen == undefined && $.array.contains(frozenFields, param.source)) { sourceFrozen = true; }
        if ($.array.contains(fields, param.target)) { targetFrozen = false; }
        if (targetFrozen == undefined && $.array.contains(frozenFields, param.target)) { targetFrozen = true; }
        if (sourceFrozen == undefined || targetFrozen == undefined) { return; }
        if ($.isFunction(opts.onBeforeMoveColumn) && opts.onBeforeMoveColumn.call(target, param.source, param.target, param.point) == false) { return; }
        var panel = t.datagrid("getPanel"), view = panel.find("div.datagrid-view"),
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
            var targetBodyTd = $(this).find("td[field=" + param.target + "]"), sourceBodyTd = $(sourceRow[i]).find("td[field=" + param.source + "]");
            targetBodyTd[param.point](sourceBodyTd);
        });
        var sourceOpts = t.datagrid("getColumnOption", param.source), targetOpts = t.datagrid("getColumnOption", param.target),
            sourceColumns = sourceFrozen ? opts.frozenColumns[0] : opts.columns[0],
            targetColumns = targetFrozen ? opts.frozenColumns[0] : opts.columns[0],
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        $.array.remove(sourceColumns, sourceOpts);
        var index = $.array.indexOf(targetColumns, targetOpts);
        if (index > -1) { $.array.insert(targetColumns, param.point == "before" ? index : index + 1, sourceOpts); }
        t.datagrid("fixColumnSize");
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
        var t = $.util.parseJquery(target), fields = t.datagrid("getColumnFields", "all"),
            index = $.array.indexOf(fields, param.field);
        if (index == -1 || (param.point == "before" && index == 0) || (param.point == "after" && index == fields.length - 1)) { return; }
        var target = fields[param.point == "before" ? index - 1 : index + 1];
        t.datagrid("moveColumn", { source: param.field, target: target, point: param.point });
    };


    var deleteColumn = function (target, field) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        if ($.isFunction(opts.onBeforeDeleteColumn) && opts.onBeforeDeleteColumn.call(target, field) == false) { return; }
        removeField(opts, field, exts);
        t.datagrid("getColumnDom", { field: field, header: true }).remove();
        if ($.isFunction(opts.onDeleteColumn)) { opts.onDeleteColumn.call(target, field); }
    };

    var popColumn = function (target, field) {
        var t = $.util.parseJquery(target), colOpts = t.datagrid("getColumnOption", field);
        if (colOpts) { t.datagrid("deleteColumn", field); }
        return colOpts
    };

    var removeField = $.fn.datagrid.extensions.removeField = function (opts, field, exts) {
        var columns, frozen, i = -1, j = -1;
        if ($.array.likeArray(opts.frozenColumns)) {
            $.each(opts.frozenColumns, function (m, x) {
                if ($.array.likeArray(this)) {
                    $.each(this, function (n, y) {
                        if (y.field == field) { j = n; return false; }
                    });
                } else { if (x.field == field) { j = m; return false; } }
                if (j > -1) { i = m; return false; }
            });
            if (j > -1) { frozen = true; }
        }
        if (frozen == undefined && $.array.likeArray(opts.columns)) {
            $.each(opts.columns, function (m, x) {
                if ($.array.likeArray(this)) {
                    $.each(this, function (n, y) {
                        if (y.field == field) { j = n; return false; }
                    });
                } else { if (x.field == field) { j = m; return false; } }
                if (j > -1) { i = m; return false; }
            });
            if (j > -1) { frozen = false; }
        }
        if (j > -1) {
            columns = (frozen ? opts.frozenColumns : opts.columns);
            columns = i > -1 ? columns[i] : columns;
            $.array.removeAt(columns, j);
            index = $.array.indexOf(exts.fields, field);
            $.array.remove(exts.fields, field);
            $.array.removeAt(exts.fieldOptions, index);
            $.array.removeAt(exts.fieldOptionsBackup, index);
        }
    };






    var hasMuliRowHeader = function (target) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options");
        return (opts.columns && opts.columns.length > 1 && opts.columns[1].length > 0)
            || (opts.frozenColumns && opts.frozenColumns.length > 1 && opts.frozenColumns[1].length > 0);
    };

    var findRows = function (target, param) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows"), ret;
        if ($.isFunction(param)) {
            ret = $.array.filter(rows, param);
        } else if ($.array.likeArray(param) && !$.util.isString(param)) {
            ret = $.array.map(param, function (val) { return findRow(target, val, t, rows); });
            ret = $.array.filter(ret, function (val) { return val != undefined && val != null; });
        } else {
            ret = [findRow(target, param, t, rows)];
        }
        return ret;
    };

    var findRow = function (target, param, grid, rows) {
        var t = grid || $.util.parseJquery(target), data = rows || t.datagrid("getRows"), opts = t.datagrid("options");
        return $.array.first(rows, $.isFunction(param) ? param : function (val) { return val[opts.idField] == param; });
    };

    var _deleteRow = $.fn.datagrid.methods.deleteRow;
    var deleteRow = function (target, param) {
        var t = $.util.parseJquery(target), isFunc = $.isFunction(param), index;
        if (isFunc) {
            var rows = t.datagrid("getRows"), row = $.array.first(rows, param), index = t.datagrid("getRowIndex", row);
            if (index > -1) { _deleteRow.call(t, t, index); }
        } else {
            index = $.isNumeric(param) ? param : t.datagrid("getRowIndex", param);
            if ($.isNumeric(index) && index > -1) { _deleteRow.call(t, t, index); }
        }
    };

    var deleteRows = function (target, param) {
        var isArray = $.array.likeArray(param) && !$.util.isString(param);
        if (isArray) { $.each(param, function (index, val) { deleteRow(target, val); }); return; }
        if ($.isFunction(param)) {
            var t = $.util.parseJquery(target), rows = t.datagrid("getRows");
            $.each(rows, function (index, row) {
                if (param.call(this, this, index, rows) == true) {
                    var i = t.datagrid("getRowIndex", this);
                    _deleteRow.call(t, t, i);
                }
            });
        }
    };

    var setColumnTitle = function (target, param) {
        if (param && param.field && param.title) {
            var t = $.util.parseJquery(target), colOpts = t.datagrid("getColumnOption", param.field),
                field = param.field, title = param.title,
                panel = t.datagrid("getPanel"),
                td = panel.find("div.datagrid-view div.datagrid-header tr.datagrid-header-row td[field=" + field + "]");
            if (td.length) { td.find("div.datagrid-cell span:first").html(title); colOpts.title = title; }
        }
    };

    var setColumnWidth = function (target, param) {
        if (param && param.field && param.width && $.isNumeric(param.width)) {
            var state = $.data(target, "datagrid"),
                t = $.util.parseJquery(target),
                opts = t.datagrid("options"),
                colOpts = t.datagrid("getColumnOption", param.field),
                field = param.field, width = param.width,
                cell = t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header tr.datagrid-header-row td[field=" + field + "] div.datagrid-cell");
            if (cell.length) {
                var diff = cell._outerWidth() - parseInt(cell[0].style.width);
                cell.css("height", "");
                colOpts.width = width;
                colOpts.boxWidth = width - diff;
                colOpts.auto = undefined;
                cell.width(colOpts.boxWidth);
                t.datagrid("fixColumnSize", field);
                t.datagrid("fitColumns");
                opts.onResizeColumn.call(target, field, width);
            }
        }
    };

    var sortGrid = function (target, options) {
        options = options || {};
        options = $.extend({ sortName: null, sortOrder: "asc" }, options);
        var t = $.util.parseJquery(target),
            state = $.data(target, "datagrid"),
            opts = t.datagrid("options"),
            col = t.datagrid("getColumnOption", options.sortName);
        if (!col || $.isEmptyObject(col) || !col.sortable || state.resizing) { return; }
        opts.sortName = options.sortName;
        opts.sortOrder = options.sortOrder;
        var cls = "datagrid-sort-" + opts.sortOrder;
        var cells = t.datagrid("getPanel").find(".datagrid-view .datagrid-header td div.datagrid-cell");
        var cell = t.datagrid("getPanel").find(".datagrid-view .datagrid-header td[field='" + options.sortName + "'] div.datagrid-cell");
        if (!cells.length || !cell.length) { return; }
        cells.removeClass("datagrid-sort-asc datagrid-sort-desc");
        cell.addClass(cls);
        /*
        add by sunliang :\u589E\u52A0\u6392\u5E8F\u529F\u80FD
        */
        if ($.isFunction(opts.onSortColumnBefore)) {
            var ret = opts.onSortColumnBefore.call(target, opts.sortName, opts.sortOrder);
            if (ret === false) return;
        }
        if (opts.remoteSort) {
            t.datagrid("reload");
        } else {
            var data = $.data(target, "datagrid").data; t.datagrid("loadData", data);
        }
        opts.onSortColumn.call(target, opts.sortName, opts.sortOrder);
    };

    $.fn.datagrid.extensions.parseOffset = function (offset) {
        var o = { enable: offset ? true : false };
        if (o.enable) { $.extend(o, offset); }
        o.width = $.isNumeric(o.width) ? o.width : 0;
        o.height = $.isNumeric(o.height) ? o.height : 0;
        return o;
    };
    var setOffset = function (target, offset) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        opts.offset = exts.offset = $.fn.datagrid.extensions.parseOffset(offset);
        if (exts.offset && exts.offset.enable) {
            if (!$.isFunction(exts.offsetFunction)) {
                exts.offsetFunction = function () {
                    if (!exts.offset.enable) { return; }
                    var size = $.util.windowSize();
                    t.datagrid("resize", { width: size.width + exts.offset.width, height: size.height + exts.offset.height });
                };
                $(window).resize(exts.offsetFunction);
            }
            exts.offsetFunction();
        }
    };

    var getColumnDom = function (target, param) {
        if ($.string.isNullOrEmpty(param)) { return $(); }
        var t = $.util.parseJquery(target), panel = t.datagrid("getPanel"),
            isObject = !$.string.isString(param),
            field = isObject ? param.field : param,
            header = isObject ? param.header : false,
            dom = panel.find("div.datagrid-view tr.datagrid-row td[field=" + field + "]");
        if (header) { dom = dom.add(panel.find("div.datagrid-view tr.datagrid-header-row td[field=" + field + "]")); }
        return dom;
    };

    var getColumnData = function (target, field) {
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows");
        return $.array.map(rows, function (val) { return val[field]; });
    };

    var getRowDom = function (target, index) {
        if (!$.isNumeric(index) || index < 0) { return $(); }
        var t = $.util.parseJquery(target), panel = t.datagrid("getPanel");
        return panel.find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row[datagrid-row-index=" + index + "]");
    };

    var getRowData = function (target, index) {
        if (!$.isNumeric(index) || index < 0) { return undefined; }
        var t = $.util.parseJquery(target), rows = t.datagrid("getRows");
        return rows[index];
    };

    var getCellDom = function (target, pos) {
        if (!pos || !pos.field || !$.isNumeric(pos.index) || pos.index < 0) { return $(); }
        var t = $.util.parseJquery(target), tr = t.datagrid("getRowDom", pos.index);
        return tr.find("td[field=" + pos.field + "] .datagrid-cell");
    };
    var getCellData = function (target, pos) {
        if (!pos || !pos.field || !$.isNumeric(pos.index) || pos.index < 0) { return; }
        var t = $.util.parseJquery(target), row = t.datagrid("getRowData", pos.index);
        return row[pos.field];
    };
    var getCellDisplay = function (target, pos) {
        var t = $.util.parseJquery(target), td = t.datagrid("getCellDom", pos);
        return td && td.length ? td.text() : undefined;
    };

    var _getColumnFields = $.fn.datagrid.methods.getColumnFields;
    var getColumnFields = function (target, frozen) {
        var t = $.util.parseJquery(target);
        if (frozen == null || frozen == undefined || $.util.isBoolean(frozen)) { return _getColumnFields.call(t, t, frozen); }
        if ($.util.isString(frozen)) {
            return $.array.merge([], _getColumnFields.call(t, t, true), _getColumnFields.call(t, t, false));
        }
    };

    var getDistinctRows = function (target, field) {
        var t = $.util.parseJquery(target), fields = t.datagrid("getColumnFields", "all");
        if (!$.array.contains(fields, field)) { return []; }
        var rows = t.datagrid("getRows"), data = $.array.clone(rows);
        $.array.distinct(data, function (a, b) { return a[field] == b[field]; });
        return data;
    };

    var getDistinctColumnData = function (target, field) {
        var t = $.util.parseJquery(target), fields = t.datagrid("getColumnFields", "all");
        if (!$.array.contains(fields, field)) { return []; }
        var data = t.datagrid("getColumnData", field);
        $.array.distinct(data, function (a, b) { return a == b; });
        return data;
    };

    var getColumns = function (target, frozen) {
        var t = $.util.parseJquery(target), fields = getColumnFields(target, frozen);
        return $.array.map(fields, function (val) { return t.datagrid("getColumnOption", val); });
    };

    var getHiddenColumns = function (target, frozen) {
        var cols = getColumns(target, frozen);
        return $.array.filter(cols, function (val) { return val.hidden ? true : false; });
    };

    var getVisibleColumns = function (target, frozen) {
        var cols = getColumns(target, frozen);
        return $.array.filter(cols, function (val) { return !val.hidden ? true : false; });
    };

    var getHiddenColumnFields = function (target, frozen) {
        var cols = getHiddenColumns(target, frozen);
        return $.array.map(cols, function (val) { return val.field; });
    };

    var getVisibleColumnFields = function (target, frozen) {
        var cols = getVisibleColumns(target, frozen);
        return $.array.map(cols, function (val) { return val.field; });
    };

    var showRow = function (target, param, grid, options, data, extensions, refreshable) {
        var t = grid || $.util.parseJquery(target), rows = data || t.datagrid("getRows"),
            row = $.isFunction(param) ? findRow(target, param, t, rows) : param, index = t.datagrid("getRowIndex", row),
            refreshable = (refreshable == null || refreshable == undefined || refreshable == true) ? true : false;
        if (index > -1) {
            var opts = options || t.datagrid("options"), rowData = t.datagrid("getRowData", index),
                exts = extensions || (opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {}));
            exts.filterData = $.isArray(exts.filterData) ? exts.filterData : exts.filterData = [];
            t.datagrid("getRowDom", index).show();
            $.array.remove(exts.filterData, rowData);
            if (refreshable) { refreshColumnFilterStatus(t, opts, exts, rows); }
        }
    };

    var hideRow = function (target, param, grid, options, data, extensions, refreshable) {
        var t = grid || $.util.parseJquery(target), rows = data || t.datagrid("getRows"),
            row = $.isFunction(param) ? findRow(target, param, t, rows) : param, index = t.datagrid("getRowIndex", row),
            refreshable = refreshable == null || refreshable == undefined || refreshable == true ? true : false;
        if (index > -1) {
            var opts = options || t.datagrid("options"), rowData = t.datagrid("getRowData", index),
                exts = extensions || (opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {}));
            exts.filterData = $.isArray(exts.filterData) ? exts.filterData : [];
            t.datagrid("unselectRow", index).datagrid("uncheckRow", index).datagrid("getRowDom", index).hide();
            $.array.attach(exts.filterData, rowData);
            if (refreshable) { refreshColumnFilterStatus(t, opts, exts, rows); }
        }
    };

    var showRows = function (target, param) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"), rows = t.datagrid("getRows"), array,
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        if (param === true) {
            exts.filterData = [];
            var panel = t.datagrid("getPanel"), icons = panel.find("div.datagrid-header-filter-item-icon");
            panel.find(".datagrid-view .datagrid-body tr.datagrid-row").show();
            setItemIconCls(icons, "tree-checkbox1");
        } else if ($.isFunction(param)) {
            array = $.array.filter(rows, param);
        } else if ($.array.likeArray(param) && !$.util.isString(param)) {
            array = param;
        } else { array = [param]; }
        if (array) {
            $.each(array, function (index, val) { showRow(target, val, t, opts, rows, exts, false); });
            refreshColumnFilterStatus(t, opts, exts, rows);
        }
    };

    var hideRows = function (target, param) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"), rows = t.datagrid("getRows"), array,
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        if (param === true) {
            t.datagrid("unselectAll").datagrid("uncheckAll");
            exts.filterData = $.array.clone(rows);
            var panel = t.datagrid("getPanel"), icons = panel.find("div.datagrid-header-filter-item-icon");
            panel.find(".datagrid-view .datagrid-body tr.datagrid-row").hide();
            setItemIconCls(icons, "tree-checkbox0");
        } else if ($.isFunction(param)) {
            array = $.array.filter(rows, param);
        } else if ($.array.likeArray(param) && !$.util.isString(param)) {
            array = param;
        } else { array = [param]; }
        if (array) {
            $.each(array, function (index, val) { hideRow(target, val, t, opts, rows, exts, false); });
            refreshColumnFilterStatus(t, opts, exts, rows);
        }
    };

    var getHiddenRows = function (target) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        return exts.filterData;
    };

    var getVisibleRows = function (target) {
        var t = $.util.parseJquery(target), opts = t.datagrid("options"), rows = t.datagrid("getRows"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {}),
            filterData = $.isArray(exts.filterData) ? exts.filterData : [];
        return $.array.filter(rows, function (val) { return $.array.contains(filterData, val) ? false : true; });
    };

    var setColumnFilter = function (target, columnFilter) {
        var t = $.util.parseJquery(target),
            opts = t.datagrid("options"), exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {}),
            panel = t.datagrid("getPanel"),
            selector = "div.datagrid-view div.datagrid-header tr.datagrid-header-row div.datagrid-header-filter-container";
        if (!columnFilter) {
            var headerFields = panel.find(selector),
                length = headerFields.length, i = 0;
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
        if ($.util.isBoolean(param)) { t.datagrid(param ? "showRows" : "hideRows", true); return; }
        if (!param || !param.field) { return; }
        var field = param.field, value = param.value, isArray = $.array.likeArray(value) && !$.util.isString(value),
            finder = isArray ? function (val) { return $.array.contains(value, val[field]); } : function (val) { return value == val[field]; },
            rows = t.datagrid("findRows", finder);
        t.datagrid(param.selected ? "showRows" : "hideRows", rows);
    };




    var highlightColumn = function (target, field) {
        var t = $.util.parseJquery(target);
        var state = $.data(t[0], "datagrid"), opts = state.options;
        if (state.highlightField) {
            t.datagrid("getColumnDom", { field: state.highlightField, header: true }).removeClass("datagrid-row-over");
        }
        t.datagrid("getColumnDom", { field: field, header: true }).filter(function () {
            return !$(this).parent().hasClass("datagrid-row-selected");
        }).addClass("datagrid-row-over");
        state.highlightField = field;
    };

    var livesearch = function (target, param) {
        var t = $.util.parseJquery(target), panel = t.datagrid("getPanel"), cells, field, value = param, regular = false, ignoreCase = true, regexp;
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
            var cell = $(this);
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


    var initColumnExtendProperty = $.fn.datagrid.extensions.initColumnExtendProperty = function (colOpts) {
        if (colOpts.tooltip == null || colOpts.tooltip == undefined) { colOpts.tooltip = false; }
        if (colOpts.filterable == null || colOpts.filterable == undefined || !$.util.isBoolean(colOpts.filterable)) { colOpts.filterable = true; }
        if (colOpts.hidable == null || colOpts.hidable == undefined || !$.util.isBoolean(colOpts.hidable)) { colOpts.hidable = true; }
        if (colOpts.filter == null || colOpts.filter == undefined || !$.util.isString(colOpts.filter)) { colOpts.filter = "checkbox"; }
        if (colOpts.precision == null || colOpts.precision == undefined || !$.isNumeric(colOpts.precision)) { colOpts.precision = 1; }
        if (colOpts.step == null || colOpts.step == undefined || !$.isNumeric(colOpts.step)) { colOpts.step = 1; }
    };

    var initColumnExtendProperties = $.fn.datagrid.extensions.initColumnExtendProperties = function (t, exts) {
        if (exts._initializedExtendProperties) { return; }
        var cols = t.datagrid("getColumns", "all");
        $.each(cols, function () { initColumnExtendProperty(this); });
        exts._initializedExtendProperties = true;
    };

    var initRowDndExtensions = $.fn.datagrid.extensions.initRowDndExtensions = function (t, opts) {
        opts = opts || t.datagrid("options");
        if (opts.dndRow) { t.datagrid("enableRowDnd"); }
    };


    /************************  initExtend ColumnFilter Begin  ************************/
    function initHeaderColumnFilterContainer(t, opts, exts) {
        exts = exts || (opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {}));
        initColumnExtendProperties(t, exts);
        var data = t.datagrid("getData"), oldData = exts.oldData;
        if (data != oldData) { exts.filterData = []; }
        clearHeaderColumnFilter(t, opts);
        if (!opts.columnFilter) { return; }
        exts.oldData = data;
        var header = t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header"),
            headerRows = header.find("table.datagrid-htable tr.datagrid-header-row"),
            headerFields = headerRows.find("td[field]").filter(function () {
                var td = $(this), colspan = td.attr("colspan");
                return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
            }),
            columnFilter = opts.columnFilter = $.extend({ panelHeight: 100, position: "top" }, opts.columnFilter),
            position = $.array.contains(["top", "bottom"], columnFilter.position) ? columnFilter.position : "top",
            panelHeight = columnFilter.panelHeight = $.isNumeric(columnFilter.panelHeight) && columnFilter.panelHeight >= 60 ? columnFilter.panelHeight : 60,
            height = header.height(), rows = t.datagrid("getRows");
        headerFields.each(function () {
            var td = $(this).addClass("datagrid-header-filter").removeClass("datagrid-header-filter-top datagrid-header-filter-bottom"),
                cell = td.find("div.datagrid-cell").addClass("datagrid-header-filter-cell"),
                field = td.attr("field"), colOpts = t.datagrid("getColumnOption", field), colWidth = colOpts.width,
                line = $("<hr />").addClass("datagrid-header-filter-line")[position == "top" ? "prependTo" : "appendTo"](this),
                container = $("<div></div>").attr("field", field).addClass("datagrid-header-filter-container").css({
                    height: columnFilter.panelHeight, width: colWidth
                })[position == "top" ? "prependTo" : "appendTo"](this);
            td.addClass(position == "top" ? "datagrid-header-filter-top" : "datagrid-header-filter-bottom");
            if (field) { initColumnFilterField(t, opts, exts, container, colOpts, rows, headerFields); }
        });
        if (exts.filterData && exts.filterData.length) {
            t.datagrid("hideRows", exts.filterData);
        } else {
            refreshColumnFilterStatus(t, opts, exts, rows, headerFields);
        }
    };

    function clearHeaderColumnFilter(t, opts) {
        if (!opts.columnFilter) { return; }
        var headerFields = t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
            var td = $(this), colspan = td.attr("colspan");
            return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
        });
        headerFields.removeClass("datagrid-header-filter datagrid-header-filter-top datagrid-header-filter-bottom").find("div.datagrid-cell").removeClass("datagrid-header-filter-cell");
        headerFields.find("hr.datagrid-header-filter-line,div.datagrid-header-filter-container").remove();
        var fields = t.datagrid("getColumnFields", "all");
        t.datagrid("fixColumnSize", fields[fields.length - 1]);
    };

    function initColumnFilterField(t, opts, exts, container, colOpts, rows, headerFields) {
        if (!colOpts.filterable) { return; }
        var field = colOpts.field, distinctVals = t.datagrid("getDistinctColumnData", field),
            filter = $.array.contains(["checkbox", "livebox", "caps", "lower", "none"], colOpts.filter) ? colOpts.filter : "checkbox",
            precision = colOpts.precision, step = colOpts.step;
        switch (filter) {
            case "checkbox": initColumnFilterFieldCheckBox(t, exts, container, field, rows, distinctVals); break;
            case "livebox": initColumnFilterFieldLiveBox(t, container, field, rows); break;
            case "caps":
                initColumnFilerFieldSlider(t, container, field, step, precision, rows, distinctVals, "<=", opts.columnFilter.panelHeight, headerFields);
                break;
            case "lower":
                initColumnFilerFieldSlider(t, container, field, step, precision, rows, distinctVals, ">=", opts.columnFilter.panelHeight, headerFields);
                break;
            case "none": break;
        }
    };

    function initColumnFilterFieldCheckBox(t, exts, container, field, rows, distinctVals) {
        $.each(distinctVals, function (index, text) {
            var item = $("<div></div>").addClass("datagrid-header-filter-item").attr("text", text).appendTo(container),
                itemText = $("<div></div>").addClass("datagrid-header-filter-item-text").text(text).appendTo(item),
                icon = $("<div></div>").addClass("datagrid-header-filter-item-icon").appendTo(item),
                handler = function () {
                    var filterRows = $.array.filter(rows, function (value) { return value[field] == text; }),
                        hiddenRows = $.array.filter(exts.filterData, function (value) { return value[field] == text; });
                    t.datagrid(hiddenRows.length ? "showRows" : "hideRows", filterRows);
                };
            item.click(handler);
        });
    };

    function initColumnFilterFieldLiveBox(t, container, field, rows) {
        $("<div></div>").addClass("datagrid-header-filter-livebox-text").text("\u6A21\u7CCA\u8FC7\u6EE4\uFF1A").appendTo(container);
        var input = $("<input />").addClass("datagrid-header-filter-livebox").appendTo(container);
        var btn = $("<a />").linkbutton({ plain: true, iconCls: "icon-search" }).appendTo(container).click(function () {
            t.datagrid("showRows", true);
            var val = input.val();
            if ($.string.isNullOrEmpty(val)) { input.focus(); return; }
            var filterRows = $.array.filter(rows, function (value) { return String(value[field]).indexOf(val) == -1; });
            t.datagrid("hideRows", filterRows);
            input.focus();
        });
        $("<a />").linkbutton({ plain: true, iconCls: "icon-undo" }).appendTo(container).click(function () {
            var val = input.val();
            if (val) { input.val("").focus(); btn.click(); } else { input.focus(); }
        });
        input.keypress(function (e) { if (e.which == 13) { btn.click(); } });
    };

    function initColumnFilerFieldSlider(t, container, field, step, precision, rows, distinctVals, type, panelHeight, headerFileds) {
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
                changeSliderValue(t, field, rows, newValue, type, input, slider, headerFileds);
            };
        input.numberbox({ value: type == "<=" ? max : min, min: min, max: max, precision: precision, onChange: handler });
        input.keypress(function (e) { if (e.which == 13) { var val = input.val(); input.numberbox("setValue", $.isNumeric(val) ? val : 0); } });
        slider.slider({
            height: height, mode: "v", showTip: true, value: type == "<=" ? max : min,
            min: min, max: max, rule: [min, "|", max], step: step, onSlideEnd: handler,
            tipFormatter: function (val) { return $.number.round(val || 0, maxPrecision); }
        });
    };

    function changeSliderValue(t, field, rows, value, type, input, slider, headerFileds) {
        var headerFields = headerFileds || t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
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
        t.datagrid("showRows", true).datagrid("hideRows", filterRows);
        input.numberbox("setValue", value);
        slider.slider("setValue", value);
    };



    function refreshColumnFilterStatus(t, opts, exts, rows, headerFields) {
        if (!opts.columnFilter) { return; }
        headerFields = headerFields || t.datagrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
            var td = $(this), colspan = td.attr("colspan");
            return (!colspan || colspan == "1") && !td.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? true : false;
        });
        headerFields.each(function () {
            var td = $(this), field = td.attr("field");
            refreshColumnFilterCellStatus(t, exts, rows, td, field);
        });
    };

    function refreshColumnFilterCellStatus(t, exts, rows, td, field) {
        var colOpts = colOpts = t.datagrid("getColumnOption", field), precision = colOpts.precision,
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
                hiddenLength = $.array.sum(exts.filterData, function (val) { return val[field] == text ? 1 : 0; }),
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



    /************************  initExtend initContextMenu & initDblClickRow Begin  ************************/
    function initHeaderContextMenu(t, opts, exts) {
        exts.onHeaderContextMenuBak = opts.onHeaderContextMenu;
        opts.onHeaderContextMenu = function (e, field) {
            if ($.isFunction(exts.onHeaderContextMenuBak)) { exts.onHeaderContextMenuBak.apply(this, arguments); }
            if (!opts.enableHeaderContextMenu) { return; }
            var eventData = $.fn.datagrid.extensions.parseContextMenuEventData(t, opts, e),
                items = parseHeaderContextMenuItems(t, opts, exts, e, field, eventData);
            $.easyui.showMenu({ items: items, left: e.pageX, top: e.pageY, hideDisabledMenu: opts.hideDisabledMenu });
            e.preventDefault();
        };
    };

    function initRowContextMenu(t, opts, exts) {
        exts.onRowContextMenuBak = opts.onRowContextMenu;
        opts.onRowContextMenu = function (e, rowIndex, rowData) {
            if ($.isFunction(exts.onRowContextMenuBak)) { exts.onRowContextMenuBak.apply(this, arguments); }
            if (opts.selectOnRowContextMenu) { t.datagrid("selectRow", rowIndex); }
            if (!opts.enableRowContextMenu) { return; }
            var eventData = $.fn.datagrid.extensions.parseContextMenuEventData(t, opts, e),
                items = parseRowContextMenuItems(t, opts, exts, e, rowIndex, rowData, eventData);
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
        t.datagrid("getPanel").find(".datagrid-view .datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function () {
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


    function initDblClickRowEvent(t, opts, exts) {
        exts.onDblClickRowBak = opts.onDblClickRow;
        opts.onDblClickRow = function (rowIndex, rowData) {
            if ($.isFunction(exts.onDblClickRowBak)) { exts.onDblClickRowBak.apply(this, arguments); }
            //  t.datagrid("selectRow", rowIndex);
            var eventData = $.fn.datagrid.extensions.parseContextMenuEventData(t, opts, null);
            items = parseRowContextMenuItems(t, opts, exts, null, rowIndex, rowData, eventData);
            if (opts.autoBindDblClickRow && opts.dblClickRowMenuIndex >= 0 && $.util.likeArray(opts.rowContextMenu)
                && !$.util.isString(opts.rowContextMenu) && opts.rowContextMenu.length > opts.dblClickRowMenuIndex) {
                var item = items[opts.dblClickRowMenuIndex], handler = item.handler || item.onclick;
                return handler(null, rowIndex, rowData, eventData, t, item, null);
            }
            if (opts.autoEditing) { t.datagrid("beginEdit", rowIndex); }
        };
    };


    function parseHeaderContextMenuItems(t, opts, exts, e, field, eventData) {
        var items = [], contextMenu = $.util.likeArray(opts.headerContextMenu) && !$.util.isString(opts.headerContextMenu) ? opts.headerContextMenu : [];
        if (contextMenu.length) { $.array.merge(items, contextMenu); }
        var baseItems = parseHeaderBaseContextMenuItems(t, opts, exts, e, field, eventData);
        if (baseItems.length) { $.array.merge(items, "-", baseItems); }
        //Add by sunliang:\u5728\u5217\u5934\u83DC\u5355\u6700\u540E\u589E\u52A0\u83DC\u5355
        colOpts = t.datagrid("getColumnOption", field);
        var headerContextMenuLast = !!colOpts && $.util.likeArray(colOpts.headerContextMenu) && !$.util.isString(colOpts.headerContextMenu) ? colOpts.headerContextMenu : [];
        if (headerContextMenuLast.length) { $.array.merge(items, "-", headerContextMenuLast); }
        //
        items = $.fn.datagrid.extensions.parseHeaderContextMenuMap(e, field, eventData, items, t);
        if (items[0] == "-") { $.array.removeAt(items, 0); }
        return items;
    }

    function parseRowContextMenuItems(t, opts, exts, e, rowIndex, rowData, eventData) {
        var items = [], contextMenu = $.util.likeArray(opts.rowContextMenu) && !$.util.isString(opts.rowContextMenu) ? opts.rowContextMenu : [];
        if (contextMenu.length) { $.array.merge(items, contextMenu); }
        var baseItems = parseRowBaseContextMenuItems(t, opts, exts, e, rowIndex, rowData, eventData);
        if (baseItems.length) { $.array.merge(items, "-", baseItems); }
        items = $.fn.datagrid.extensions.parseRowContextMenuMap(e, rowIndex, rowData, eventData, items, t);
        if (items[0] == "-") { $.array.removeAt(items, 0); }
        return items;
    }



    function parseHeaderBaseContextMenuItems(t, opts, exts, e, field, eventData) {
        var mm = [], exp = opts.exportMenu,
            colOpts = t.datagrid("getColumnOption", field), sortable = t.datagrid("getColumnOption", field).sortable;
        if (typeof exp == "object") { exp = $.extend({ current: false, all: false, submenu: true }, exp); }
        var m1 = {
            text: "\u5347\u5E8F", iconCls: "icon-standard-hmenu-asc", disabled: sortable != true,
            handler: function () { return t.datagrid("sort", { sortName: field, sortOrder: "asc" }); }
        };
        var m2 = {
            text: "\u964D\u5E8F", iconCls: "icon-standard-hmenu-desc", disabled: sortable != true,
            handler: function () { return t.datagrid("sort", { sortName: field, sortOrder: "desc" }); }
        };
        var m3 = {
            text: "\u663E\u793A/\u9690\u85CF\u5217", iconCls: "icon-standard-application-view-columns", disabled: false, children: [
                {
                    text: "\u663E\u793A\u5168\u90E8\u5217", iconCls: function () {
                        var len = exts.fields ? exts.fields.length : 0;
                        var count = $.array.sum(exts.fieldOptions, function (val) { return val.hidden ? 0 : 1; });
                        return count >= len ? "tree-checkbox1" : (count == 0 ? "tree-checkbox0" : "tree-checkbox2");
                    }, hideOnClick: false, handler: function (e, field, eventData, t, item, menu) {
                        $.each(exts.fields, function () { t.datagrid("showColumn", this); });
                        $(this).parent().children("div.menu-item:not(:eq(1))").each(function () {
                            menu.menu("setIcon", { target: this, iconCls: "tree-checkbox1" });
                            menu.menu("enableItem", this);
                        });
                    }
                },
                {
                    text: "\u8FD8\u539F\u9ED8\u8BA4", iconCls: "icon-standard-application-view-tile", hideOnClick: false, handler: function (e, field, eventData, t, item, menu) {
                        $.each(exts.fieldOptionsBackup, function () { t.datagrid(this.hidden == true ? "hideColumn" : "showColumn", this.field); });
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
        //var m4 = { text: "\u8FC7\u6EE4/\u663E\u793A", iconCls: "icon-standard-application-view-columns", disabled: !colOpts.filterable, children: [] };
        var m5 = { text: "\u5BFC\u51FA\u5F53\u524D\u9875", iconCls: "icon-standard-page-white-put", disabled: !(exp == true || exp.current == true), handler: function () { return t.datagrid("exportExcel", false); } };
        var m6 = { text: "\u5BFC\u51FA\u5168\u90E8", iconCls: "icon-standard-page-white-stack", disabled: !(exp == true || exp.all == true), handler: function () { return t.datagrid("exportExcel", true); } };
        $.util.merge(m3.children, parseHeaderColumnsShowHideMenu(t, opts, exts, e, field, eventData));
        //if (colOpts.filterable) { $.util.merge(m4.children, parseHeaderRowsShowHideMenu(t, opts, exts, e, field, eventData)); }
        //$.util.merge(mm, [m1, m2, "-", m3,m4]);
        $.util.merge(mm, [m1, m2, m3]);
        var expMenu = [m5, m6];
        if (exp) { $.array.merge(mm, "-", typeof exp == "object" && !exp.submenu ? expMenu : { text: "\u5BFC\u51FA\u6570\u636E", iconCls: "icon-standard-page-save", children: expMenu }); }
        return mm;
    };

    function parseHeaderColumnsShowHideMenu(t, opts, exts, e, field, eventData) {
        return $.array.map(exts.fieldOptions, function (val) {
            var handler = function (e, field, eventData, t, item, menu) {
                var m = $.util.parseJquery(this),
                    count = m.parent().find(".menu-item:gt(1) .tree-checkbox1").length;
                if ((count == 1 && !val.hidden) || !val.hidable) { return; }
                t.datagrid(val.hidden ? "showColumn" : "hideColumn", val.field);
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
                disabled: !val.hidable ? true : false, handler: handler
            };
        });
    };

    function parseHeaderRowsShowHideMenu(t, opts, exts, e, field, eventData) {
        var rows = t.datagrid("getRows"), distinctVals = t.datagrid("getDistinctColumnData", field),
            mm = [
                {
                    text: "\u5168\u90E8", hideOnClick: false,
                    iconCls: (!exts.filterData || !exts.filterData.length) ? "tree-checkbox1" : (exts.filterData.length >= rows.length ? "tree-checkbox0" : "tree-checkbox2"),
                    handler: function (e, field, eventData, t, item, menu) {
                        if (exts.filterData && exts.filterData.length) {
                            t.datagrid("showRows", true);
                        } else {
                            t.datagrid("hideRows", true);
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
                hiddenLength = $.array.sum(exts.filterData, function (value) { return value[field] == val ? 1 : 0; }),
                iconCls = !hiddenLength ? "tree-checkbox1" : (hiddenLength >= filterLength ? "tree-checkbox0" : "tree-checkbox2");
            var handler = function (e, field, eventData, t, item, menu) {
                var hiddenLength = $.array.sum(exts.filterData, function (value) { return value[field] == val ? 1 : 0; });
                t.datagrid(hiddenLength ? "showRows" : "hideRows", filterRows);
                menu.menu("setIcon", { target: this, iconCls: hiddenLength ? "tree-checkbox1" : "tree-checkbox0" });
                $(this).parent().children("div.menu-item:first").each(function () {
                    menu.menu("setIcon", {
                        target: this,
                        iconCls: (!exts.filterData || !exts.filterData.length) ? "tree-checkbox1" : (exts.filterData.length >= rows.length ? "tree-checkbox0" : "tree-checkbox2")
                    });
                });
            };
            return { text: val, iconCls: iconCls, hideOnClick: false, handler: handler };
        });
        $.array.merge(mm, items);
        if (hasMore) {
            var colOpt = t.datagrid("getColumnOption", field), title = colOpt.title ? colOpt.title : colOpt.field, handler = function () {
                var checkAll = $("<input />").attr({ type: "button", value: "\u5168\u90E8\u9009\u62E9" }).click(function () {
                    t.datagrid("showRows", true);
                    $(this).parent().find(":checkbox").each(function () { this.checked = true; });
                })
                var uncheckAll = $("<input />").attr({ type: "button", value: "\u5168\u90E8\u4E0D\u9009" }).click(function () {
                    t.datagrid("hideRows", true);
                    $(this).parent().find(":checkbox").each(function () { this.checked = false; });
                });
                $("<div></div>").append("<div>\u5217\uFF1A" + title + "\uFF0C\u5171" + distinctVals.length + "\u9879</div><hr />").css({
                    padding: "10px"
                }).append(checkAll).append(uncheckAll).append("<hr />").each(function () {

                    var win = $(this), ul = $("<ul></ul>").css({ "list-style-type": "decimal", "padding-left": "40px", "line-height": "18px" }).appendTo(win);
                    $.each(distinctVals, function (index, text) {
                        var id = "itemCheckbox_" + $.util.guid("N"),
                            checked = !$.array.some(exts.filterData, function (val) { return val[field] == text; }),
                            itemWrap = $("<li></li>").appendTo(ul),
                            item = $("<input />").attr({ type: "checkbox", id: id, checked: checked }).appendTo(itemWrap),
                            itemText = $("<label></label>").attr("for", id).text(text).appendTo(itemWrap),
                            handler = function () {
                                var filterRows = $.array.filter(rows, function (val) { return val[field] == text; }),
                                    hiddenLength = $.array.sum(exts.filterData, function (val) { return val[field] == text ? 1 : 0; });
                                t.datagrid(hiddenLength ? "showRows" : "hideRows", filterRows);
                            };
                        item.click(handler);
                    });
                })
            .dialog({
                title: "\u8FC7\u6EE4/\u663E\u793A", iconCls: "icon-standard-application-view-detail", height: 260, width: 220, left: e.pageX, top: e.pageY,
                collapsible: false, minimizable: false, maximizable: false, closable: true, modal: true, resizable: true,
                onClose: function () { $.util.parseJquery(this).dialog("destroy"); }
            }).dialog("open");
            };
            $.array.merge(mm, ["-", { text: "\u5904\u7406\u66F4\u591A(\u5171" + distinctVals.length + "\u9879)...", iconCls: "icon-standard-application-view-detail", handler: handler }]);
        }
        return mm;
    };



    function parseRowBaseContextMenuItems(t, opts, exts, e, rowIndex, rowData, eventData) {
        var mm = [], paging = opts.pagingMenu, move = opts.moveMenu, exp = opts.exportMenu;
        if (typeof paging == "object") { paging = $.extend({ disabled: false, submenu: true }, paging); }
        if (typeof move == "object") { move = $.extend({ up: false, down: false, submenu: true }, move); }
        if (typeof exp == "object") { exp = $.extend({ current: false, all: false, submenu: true }, exp); }
        var m1 = {
            text: "\u5237\u65B0\u5F53\u524D\u9875", iconCls: "pagination-load", disabled: !opts.refreshMenu,
            handler: function () { t.datagrid("reload"); }
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
        var m6 = { text: "\u79FB\u81F3\u6700\u4E0A", iconCls: "icon-standard-arrow-up", disabled: !(move == true || move.top == true), handler: function () { t.datagrid("moveRow", { source: rowIndex, target: 0, point: "top" }); } };
        var m7 = { text: "\u4E0A\u79FB", iconCls: "icon-standard-up", disabled: !(move == true || move.up == true), handler: function () { t.datagrid("shiftRow", { point: "up", index: rowIndex }); } };
        var m8 = { text: "\u4E0B\u79FB", iconCls: "icon-standard-down", disabled: !(move == true || move.down == true), handler: function () { t.datagrid("shiftRow", { point: "down", index: rowIndex }); } };
        var m9 = {
            text: "\u79FB\u81F3\u6700\u4E0B", iconCls: "icon-standard-arrow-down", disabled: !(move == true || move.bottom == true), handler: function () {
                var rows = t.datagrid("getRows");
                t.datagrid("moveRow", { source: rowIndex, target: rows.length - 1, point: "bottom" });
            }
        };
        var m10 = { text: "\u5BFC\u51FA\u5F53\u524D\u9875", iconCls: "icon-standard-page-white-put", disabled: !(exp == true || exp.current == true), handler: function () { return t.datagrid("exportExcel", false); } };
        var m11 = { text: "\u5BFC\u51FA\u5168\u90E8", iconCls: "icon-standard-page-white-stack", disabled: !(exp == true || exp.all == true), handler: function () { return t.datagrid("exportExcel", true); } };
        mm.push(m1);
        var pagingMenu = [m2, m3, m4, m5], moveMenu = [m6, m7, "-", m8, m9], expMenu = [m10, m11];
        if (paging) { $.array.merge(mm, "-", typeof paging == "object" && !paging.submenu ? pagingMenu : { text: "\u7FFB\u9875", iconCls: "", disabled: !(paging == true || !paging.disabled), children: pagingMenu }); }
        if (move) { $.array.merge(mm, "-", typeof move == "object" && !move.submenu ? moveMenu : { text: "\u4E0A/\u4E0B\u79FB\u52A8", iconCls: "", disabled: !move, children: moveMenu }); }
        if (exp) { $.array.merge(mm, "-", typeof exp == "object" && !exp.submenu ? expMenu : { text: "\u5BFC\u51FA\u6570\u636E", iconCls: "icon-standard-page-save", disabled: !exp, children: expMenu }); }
        return mm;
    };


    $.fn.datagrid.extensions.parseHeaderContextMenuMap = function (e, field, eventData, contextMenu, t) {
        return $.array.map(contextMenu, function (value, index) {
            if (!value || $.util.isString(value)) { return value; }
            var ret = $.extend({}, value);
            ret.id = $.isFunction(value.id) ? value.id.call(ret, e, field, eventData, t) : value.id;
            ret.text = $.isFunction(value.text) ? value.text.call(ret, e, field, eventData, t) : value.text;
            ret.iconCls = $.isFunction(value.iconCls) ? value.iconCls.call(ret, e, field, eventData, t) : value.iconCls;
            ret.disabled = $.isFunction(value.disabled) ? value.disabled.call(ret, e, field, eventData, t) : value.disabled;
            ret.hideOnClick = $.isFunction(value.hideOnClick) ? value.hideOnClick.call(ret, e, field, eventData, t) : value.hideOnClick;
            ret.onclick = $.isFunction(value.onclick) ? function (e, item, menu) { value.onclick.call(this, e, field, eventData, t, item, menu); } : value.onclick;
            ret.handler = $.isFunction(value.handler) ? function (e, item, menu) { value.handler.call(this, e, field, eventData, t, item, menu); } : value.handler;
            ret.custom = value.custom;
            if (ret.children && ret.children.length) { ret.children = $.fn.datagrid.extensions.parseHeaderContextMenuMap(e, field, eventData, ret.children, t); }
            return ret;
        });
    };

    $.fn.datagrid.extensions.parseRowContextMenuMap = function (e, rowIndex, rowData, eventData, contextMenu, t) {
        return $.array.map(contextMenu, function (value, index) {
            if (!value || $.util.isString(value)) { return value; }
            var ret = $.extend({}, value);
            ret.id = $.isFunction(value.id) ? value.id.call(ret, e, rowIndex, rowData, eventData, t) : value.id;
            ret.text = $.isFunction(value.text) ? value.text.call(ret, e, rowIndex, rowData, eventData, t) : value.text;
            ret.iconCls = $.isFunction(value.iconCls) ? value.iconCls.call(ret, e, rowIndex, rowData, eventData, t) : value.iconCls;
            ret.disabled = $.isFunction(value.disabled) ? value.disabled.call(ret, e, rowIndex, rowData, eventData, t) : value.disabled;
            ret.hideOnClick = $.isFunction(value.hideOnClick) ? value.hideOnClick.call(ret, e, rowIndex, rowData, eventData, t) : value.hideOnClick;
            ret.onclick = $.isFunction(value.onclick) ? function (e, item, menu) { value.onclick.call(this, e, rowIndex, rowData, eventData, t, item, menu); } : value.onclick;
            ret.handler = $.isFunction(value.handler) ? function (e, item, menu) { value.handler.call(this, e, rowIndex, rowData, eventData, t, item, menu); } : value.handler;
            if (ret.children && ret.children.length) { ret.children = $.fn.datagrid.extensions.parseRowContextMenuMap(e, rowIndex, rowData, eventData, ret.children, t); }
            return ret;
        });
    };


    $.fn.datagrid.extensions.parseContextMenuEventData = function (t, opts, e) {
        var queryParams = $.fn.datagrid.extensions.parseRemoteQueryParams(opts);
        var pagingParams = $.fn.datagrid.extensions.parsePaginationParams(t, opts);
        return $.extend({}, queryParams, pagingParams, { e: e, grid: t });
    };

    $.fn.datagrid.extensions.parsePaginationParams = function (t, opts) {
        var ret = {};
        if (opts.pagination) {
            var pager = t.datagrid("getPager");
            var pagerOptions = pager.pagination("options");
            var total = pagerOptions.total;
            var pageCount = Math.ceil(parseFloat(total) / parseFloat(pagerOptions.pageSize));
            $.extend(ret, { pager: pager, total: total, pageCount: pageCount });
        }
        return ret;
    };

    $.fn.datagrid.extensions.parseRemoteQueryParams = function (opts) {
        var ret = $.extend({}, opts.queryParams);
        if (opts.pagination) { $.extend(ret, { page: opts.pageNumber, rows: opts.pageSize }); }
        if (opts.sortName) { $.extend(ret, { sort: opts.sortName, order: opts.sortOrder }); }
        ret = $.fn.datagrid.extensions.parsePagingQueryParams(opts, ret);
        return ret;
    };
    /************************  initExtend initContextMenu & initDblClickRow   End  ************************/



    /************************  initExtend initColumnTooltip Begin  ************************/
    var initColumnTooltip = function (t, opts) {
        var rows = t.datagrid("getRows");
        t.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").each(function () {
            var tr = $(this), index = parseInt(tr.attr("datagrid-row-index")), row = rows[index];
            initColumnRowTooltip(t, opts, index, row, tr);
        });
    };

    var initColumnRowTooltip = function (t, opts, index, row, tr) {
        tr = tr || t.datagrid("getRowDom", index);
        if (opts.rowTooltip) {
            var onShow = function (e) {
                var tt = $(this), text = $.isFunction(opts.rowTooltip) ? opts.rowTooltip.call(tr, index, row) : buildText(row);
                tt.tooltip("update", text);
            };
            tr.each(function () { $.easyui.tooltip.init(this, { onShow: onShow }); });
        } else {
            tr.children("td[field]").each(function () {
                var td = $(this), field = td.attr("field"), colOpts = t.datagrid("getColumnOption", field);
                if (!colOpts || !colOpts.tooltip) { return; }
                var cell = td.find("div.datagrid-cell"), onShow = function (e) {
                    var tt = $(this), text = $.isFunction(colOpts.tooltip) ? colOpts.tooltip.call(cell, row[field], index, row) : row[field];
                    tt.tooltip("update", text);
                };
                $.easyui.tooltip.init(cell, { onShow: onShow });
            });
        }
        function buildText(row) {
            var cols = t.datagrid("getColumns", "all"), content = $("<table></table>").css({ padding: "5px" });;
            $.each(cols, function (i, colOpts) {
                if (!colOpts || !colOpts.field || !colOpts.title) { return; }
                var msg = t.datagrid("getCellDisplay", { field: colOpts.field, index: index });
                content.append("<tr><td style='text-align: right; width: 150px;'>" + colOpts.title + ":</td><td style='width: 250px;'>" + msg + "</td></tr>");
            });
            return content;
        };
    };


    /************************  initExtend initColumnTooltip   End  ************************/
    var initializeRowExtEditor = function (t, opts, index) {
        if (!opts.extEditing) { return; }
        var tr = t.datagrid("getRowDom", index);
        if (!tr.length) { return; }
        var view = t.datagrid("getPanel").find("div.datagrid-view"),
            view1 = view.find("div.datagrid-view1"),
            view2 = view.find("div.datagrid-view2"),
            body = view2.find("div.datagrid-body"),
            width = view1.outerWidth(), pos = view.position(),
            left = diff > 0 ? diff : 0;
        body.css("position", "relative");
        var height = tr.outerHeight(),
            top = tr.position().top + height + body.scrollTop() - view2.find("div.datagrid-header").outerHeight();
        var p = $("<div></div>").addClass("dialog-button datagrid-rowediting-panel").appendTo(body).css("top", top).attr("datagrid-row-index", index);
        $("<a></a>").linkbutton({ plain: false, iconCls: "icon-ok", text: "\u4FDD\u5B58" }).appendTo(p).click(function () { t.datagrid("endEdit", index); });
        $("<a></a>").linkbutton({ plain: false, iconCls: "icon-cancel", text: "\u53D6\u6D88" }).appendTo(p).click(function () { t.datagrid("cancelEdit", index); });
        var diff = (opts.width - p.outerWidth()) / 2 - width, left = diff > 0 ? diff : 0;
        p.css("left", left);
    };

    var removeRowExtEditor = function (t, body, index) {
        body = body || t.datagrid("getPanel").find("div.datagrid-view div.datagrid-view2 div.datagrid-body");
        body.find("div.datagrid-rowediting-panel[datagrid-row-index=" + index + "]").remove();
    };

    var disposeRowExtEditor = function (t, opts, index) {
        if (!opts.extEditing) { return; }
        body = t.datagrid("getPanel").find("div.datagrid-view div.datagrid-view2 div.datagrid-body");
        removeRowExtEditor(t, body, index);
    };

    var initSingleEditing = function (t, opts, index) {
        var exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        if (opts.singleEditing) { t.datagrid("endEdit", exts.lastEditingIndex); }
        exts.lastEditingIndex = index;
    };
    /************************  initExtend ExtEditor Begin  ************************/


    /************************  initExtend ExtEditor   End  ************************/




    /************************  initExtend Base Begin  ************************/
    var initExtensions = $.fn.datagrid.extensions.initExtensions = function (t, opts) {
        var exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        if (exts._initialized) { return; }

        var fields = t.datagrid("getColumnFields", false);
        exts.fields = $.array.filter(fields, function (val) { return t.datagrid("getColumnOption", val).title ? true : false; });
        exts.fieldOptions = $.array.map(exts.fields, function (val) { return t.datagrid("getColumnOption", val); });
        exts.fieldOptionsBackup = $.array.map(exts.fieldOptions, function (val) { return $.extend({}, val); });
        exts.filterData = [];

        initColumnExtensions();
        initOffset();
        initContextMenu();
        initDblClickRow();
        function initColumnExtensions() { initColumnExtendProperties(t, exts); };
        function initOffset() { t.datagrid("setOffset", opts.offset); };
        function initContextMenu() { initHeaderContextMenu(t, opts, exts); initRowContextMenu(t, opts, exts); initHeaderClickMenu(t, opts, exts); };
        function initDblClickRow() { initDblClickRowEvent(t, opts, exts); };

        var rows = t.datagrid("getRows");
        if (!rows || !rows.length) { initHeaderColumnFilterContainer(t, opts, exts); }

        exts._initialized = true;
    };

    $.fn.datagrid.extensions.parseOrderbyParams = function (sortName, sortOrder) {
        sortName = $.string.isNullOrWhiteSpace(sortName) ? "" : $.trim(sortName);
        sortOrder = $.string.isNullOrWhiteSpace(sortOrder) ? "" : $.trim(sortOrder);
        sortOrder = sortOrder.toLowerCase();
        if (sortOrder != "asc" && sortOrder != "desc") { sortOrder = "asc"; }
        return $.trim(sortName + " " + sortOrder);
    };

    $.fn.datagrid.extensions.parsePagingQueryParams = function (opts, param) {
        var ret = $.util.parseMapFunction(param);
        if (opts.pagination) {
            ret.pageNumber = ret.page;
            ret.pageSize = ret.rows;
            ret.pageIndex = ret.pageNumber - 1;
        }
        ret.orderby = $.fn.datagrid.extensions.parseOrderbyParams(ret.sort, ret.order);
        return ret;
    };

    var clearFilterData = $.fn.datagrid.extensions.clearFilterData = function (opts) {
        var exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        exts.filterData = [];
    };

    var loader = $.fn.datagrid.extensions.loader = function (param, success, error) {
        var t = $.util.parseJquery(this), opts = t.datagrid("options");
        initExtensions(t, opts);
        if (!opts.url) { return false; }
        param = $.fn.datagrid.extensions.parsePagingQueryParams(opts, param);
        $.ajax({
            type: opts.method, url: opts.url, data: param, dataType: "json",
            success: function (data) { clearFilterData(opts); success(data); },
            error: function () { error.apply(this, arguments); }
        });
    };

    var loadFilter = function (data) {
        return data ? ($.isArray(data) ? { total: data.length, rows: data } : data) : { total: 0, rows: [] };
    };

    var _onLoadSuccess = $.fn.datagrid.defaults.onLoadSuccess;
    var onLoadSuccess = $.fn.datagrid.extensions.onLoadSuccess = function (data) {
        if ($.isFunction(_onLoadSuccess)) { _onLoadSuccess.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.datagrid("options"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        initHeaderColumnFilterContainer(t, opts, exts);
        initRowDndExtensions(t, opts);
        initColumnTooltip(t, opts);
    };

    var _onResizeColumn = $.fn.datagrid.defaults.onResizeColumn;
    var onResizeColumn = $.fn.datagrid.extensions.onResizeColumn = function (field, width) {
        if ($.isFunction(_onResizeColumn)) { _onResizeColumn.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.datagrid("options");
        if (opts.columnFilter) {
            var panel = t.datagrid("getPanel"), colOpts = t.datagrid("getColumnOption", field),
                container = panel.find("div.datagrid-header-filter-container[field=" + field + "]");
            container.width(colOpts.width);
        }
    };

    var _onBeforeEdit = $.fn.datagrid.defaults.onBeforeEdit;
    var onBeforeEdit = $.fn.datagrid.extensions.onBeforeEdit = function (index, row) {
        if ($.isFunction(_onBeforeEdit)) { _onBeforeEdit.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.datagrid("options");
        initializeRowExtEditor(t, opts, index);
        initSingleEditing(t, opts, index);
        t.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable("disable");
    }

    var _onAfterEdit = $.fn.datagrid.defaults.onAfterEdit;
    var onAfterEdit = $.fn.datagrid.extensions.onAfterEdit = function (index, row, changes) {
        if ($.isFunction(_onAfterEdit)) { _onAfterEdit.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.datagrid("options"),
            exts = opts._extensionsDatagrid ? opts._extensionsDatagrid : (opts._extensionsDatagrid = {});
        disposeRowExtEditor(t, opts, index);
        initHeaderColumnFilterContainer(t, opts, exts);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, index, row);
    }

    var _onCancelEdit = $.fn.datagrid.defaults.onCancelEdit;
    var onCancelEdit = $.fn.datagrid.extensions.onCancelEdit = function (index, row) {
        if ($.isFunction(_onCancelEdit)) { _onCancelEdit.apply(this, arguments); }
        var t = $.util.parseJquery(this), opts = t.datagrid("options");
        disposeRowExtEditor(t, opts, index);
        initRowDndExtensions(t, opts);
        initColumnRowTooltip(t, opts, index, row);
    };


    /************************  initExtend Base   End  ************************/





    var methods = $.fn.datagrid.extensions.methods = {

        //  \u8986\u76D6 easyui-datagrid \u7684\u539F\u751F\u65B9\u6CD5\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u5C5E\u6027、\u4E8B\u4EF6\u548C\u6269\u5C55\u529F\u80FD\uFF1B
        updateRow: function (jq, param) { return jq.each(function () { updateRow(this, param); }); },

        //  \u8986\u76D6 easyui-datagrid \u7684\u539F\u751F\u65B9\u6CD5\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u5C5E\u6027、\u4E8B\u4EF6\u548C\u6269\u5C55\u529F\u80FD\uFF1B
        appendRow: function (jq, row) { return jq.each(function () { appendRow(this, row); }); },

        //  \u8986\u76D6 easyui-datagrid \u7684\u539F\u751F\u65B9\u6CD5\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u5C5E\u6027、\u4E8B\u4EF6\u548C\u6269\u5C55\u529F\u80FD\uFF1B
        insertRow: function (jq, param) { return jq.each(function () { insertRow(this, param); }); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u6307\u5B9A\u7684 data-row(\u6570\u636E\u884C) \u662F\u5426\u88AB check\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 index \u8868\u793A\u8981\u5224\u65AD\u7684\u884C\u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u53C2\u6570 index \u6240\u8868\u793A\u7684 data-row(\u6570\u636E\u884C) \u88AB check\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isChecked: function (jq, index) { return isChecked(jq[0], index); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5224\u65AD\u6307\u5B9A\u7684 data-row(\u6570\u636E\u884C) \u662F\u5426\u88AB select\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 index \u8868\u793A\u8981\u5224\u65AD\u7684\u884C\u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u53C2\u6570 index \u6240\u8868\u793A\u7684 data-row(\u6570\u636E\u884C) \u88AB select\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        isSelected: function (jq, index) { return isSelected(jq[0], index); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u51BB\u7ED3\u6307\u5B9A\u7684\u5217\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 field \u8868\u793A\u8981\u51BB\u7ED3\u7684\u5217\u7684 field \u503C\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        //  \u6CE8\u610F\uFF1A\u6B64\u65B9\u6CD5\u5728\u591A\u884C\u8868\u5934\u60C5\u51B5\u4E0B\u65E0\u6548\u3002
        //      \u5F53\u524D\u8868\u683C\u5728\u6267\u884C\u6B64\u65B9\u6CD5\u524D\u5FC5\u987B\u5B58\u5728\u81F3\u5C11\u4E00\u4E2A\u51BB\u7ED3\u5217\uFF0C\u5426\u5219\u6B64\u65B9\u6CD5\u65E0\u6548\uFF1B
        freezeColumn: function (jq, field) { return jq.each(function () { freezeColumn(this, field); }); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u53D6\u6D88\u51BB\u7ED3\u6307\u5B9A\u7684\u5217\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 field \u8868\u793A\u8981\u53D6\u6D88\u51BB\u7ED3\u7684\u5217\u7684 field \u503C\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        //  \u6CE8\u610F\uFF1A\u6B64\u65B9\u6CD5\u5728\u591A\u884C\u8868\u5934\u60C5\u51B5\u4E0B\u65E0\u6548\u3002
        //      \u5F53\u524D\u8868\u683C\u5728\u6267\u884C\u6B64\u65B9\u6CD5\u524D\u5FC5\u987B\u5B58\u5728\u81F3\u5C11\u4E00\u4E2A\u975E\u51BB\u7ED3\u5217\uFF0C\u5426\u5219\u6B64\u65B9\u6CD5\u65E0\u6548\uFF1B
        unfreezeColumn: function (jq, field) { return jq.each(function () { unfreezeColumn(this, field); }); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u79FB\u52A8 easyui-datagrid \u4E2D\u7684\u6307\u5B9A data-row(\u6570\u636E\u884C) \uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u4E3A JSON-Object \u7C7B\u578B\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\u5B9A\u4E49\uFF1A
        //      target: \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u7684 data-row(\u6570\u636E\u884C) \u7D22\u5F15\u53F7(\u4ECE 0 \u5F00\u59CB\u8BA1\u6570)\uFF1B
        //      source: \u8868\u793A\u8981\u79FB\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7D22\u5F15\u53F7(\u4ECE 0 \u5F00\u59CB\u8BA1\u6570)\uFF1B
        //      point:  \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u80FD\u7684\u503C\u5305\u62EC\uFF1A
        //          "top":      \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u4F4D\u7F6E target \u7684\u4E0A\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //          "bottom":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u4F4D\u7F6E target \u7684\u4E0B\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u89E6\u53D1\u79FB\u52A8\u884C\u6570\u636E\u7684\u76F8\u5E94\u4E8B\u4EF6\uFF1B
        moveRow: function (jq, param) { return jq.each(function () { moveRow(this, param); }); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u79FB\u52A8 easyui-datagrid \u4E2D\u7684\u6307\u5B9A data-row(\u6570\u636E\u884C) \u4E00\u884C\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u4E3A JSON-Object \u7C7B\u578B\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\u5B9A\u4E49\uFF1A
        //      index: \u8868\u793A\u8981\u79FB\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7D22\u5F15\u53F7(\u4ECE 0 \u5F00\u59CB\u8BA1\u6570)\uFF1B
        //      point:  \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u80FD\u7684\u503C\u5305\u62EC\uFF1A
        //          "up":      \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u4F4D\u7F6E target \u7684\u4E0A\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //          "down":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u4F4D\u7F6E target \u7684\u4E0B\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        //  \u5907\u6CE8\uFF1A\u8BE5\u65B9\u6CD5\u4F1A\u89E6\u53D1\u79FB\u52A8\u884C\u6570\u636E\u7684\u76F8\u5E94\u4E8B\u4EF6\uFF1B
        shiftRow: function (jq, param) { return jq.each(function () { shiftRow(this, param); }); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u884C\u7684\u4E0B\u4E00\u884C\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 index \u8868\u793A\u6307\u5B9A\u884C\u7684\u884C\u53F7(\u4ECE 0 \u5F00\u59CB)\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u6307\u5B9A\u884C\u7684\u4E0B\u4E00\u884C\u6570\u636E\uFF0C\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u6307\u5B9A\u7684\u884C\u6CA1\u6709\u4E0B\u4E00\u884C\u6570\u636E (\u4F8B\u5982\u8BE5\u884C\u4E3A\u6700\u540E\u4E00\u884C\u7684\u60C5\u51B5\u4E0B)\uFF0C\u5219\u8FD4\u56DE null\u3002
        nextRow: function (jq, index) { return getNextRow(jq[0], index); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u884C\u7684\u4E0A\u4E00\u884C\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 index \u8868\u793A\u6307\u5B9A\u884C\u7684\u884C\u53F7(\u4ECE 0 \u5F00\u59CB)\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u6307\u5B9A\u884C\u7684\u4E0A\u4E00\u884C\u6570\u636E\uFF0C\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u6307\u5B9A\u7684\u884C\u6CA1\u6709\u4E0A\u4E00\u884C\u6570\u636E (\u4F8B\u5982\u8BE5\u884C\u4E3A\u7B2C\u4E00\u884C\u7684\u60C5\u51B5\u4E0B)\uFF0C\u5219\u8FD4\u56DE null\u3002
        prevRow: function (jq, index) { return getPrevRow(jq[0], index); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u4ECE easyui-datagrid \u5F53\u524D\u9875\u4E2D\u5220\u9664\u6307\u5B9A\u7684\u884C\uFF0C\u5E76\u8FD4\u56DE\u8BE5\u884C\u6570\u636E\uFF1B
        //  \u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 index \u8868\u793A\u6307\u5B9A\u884C\u7684\u884C\u53F7(\u4ECE 0 \u5F00\u59CB)\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE index \u6240\u8868\u793A\u7684\u884C\u7684\u6570\u636E\uFF0C\u8FD4\u56DE\u503C\u662F\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF1B
        //      \u5982\u679C\u4E0D\u5B58\u5728\u6307\u5B9A\u7684\u884C(\u4F8B\u5982 easyui-datagrid \u5F53\u524D\u9875\u6CA1\u6709\u6570\u636E\u6216\u8005 index \u8D85\u51FA\u8303\u56F4)\uFF0C\u5219\u8FD4\u56DE null\u3002
        popRow: function (jq, index) { return popRow(jq[0], index); },


        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u542F\u7528\u5F53\u524D\u8868\u683C\u7684\u884C\u62D6\u52A8\u529F\u80FD\uFF1B\u8BE5\u65B9\u6CD5\u65E0\u53C2\u6570\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        enableRowDnd: function (jq) { return jq.each(function () { enableRowDnd(this); }); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u7981\u7528\u5F53\u524D\u8868\u683C\u7684\u884C\u62D6\u52A8\u529F\u80FD\uFF1B\u8BE5\u65B9\u6CD5\u65E0\u53C2\u6570\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        disableRowDnd: function (jq) { return jq.each(function () { disableRowDnd(this); }); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u79FB\u52A8\u6307\u5B9A\u7684\u5217\u5230\u53E6\u4E00\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u4E3A\u4E00\u4E2A JSON-Object\uFF0C\u5B9A\u4E49\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      target: \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u5217\u7684 field \u503C\uFF1B
        //      source: \u8868\u793A\u8981\u79FB\u52A8\u7684\u5217\u7684 field \u503C\uFF1B
        //      point:  \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u5217\u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u9009\u7684\u503C\u5305\u62EC\uFF1A
        //          before: \u8868\u793A\u5C06 source \u5217\u79FB\u52A8\u81F3 target \u5217\u7684\u5DE6\u4FA7\uFF1B
        //          after:  \u8868\u793A\u5C06 source \u5217\u79FB\u52A8\u503C target \u5217\u7684\u53F3\u4FA7\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        //  \u6CE8\u610F\uFF1A\u6B64\u65B9\u6CD5\u5728\u591A\u884C\u8868\u5934\u60C5\u51B5\u4E0B\u65E0\u6548\u3002
        moveColumn: function (jq, param) { return jq.each(function () { moveColumn(this, param); }); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u79FB\u52A8\u6307\u5B9A\u7684\u5217\u632A\u52A8\u4E00\u683C\u4F4D\u7F6E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u4E3A\u4E00\u4E2A JSON-Object\uFF0C\u5B9A\u4E49\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      field:  \u8868\u793A\u8981\u632A\u52A8\u7684\u5217\u7684 field \u503C\uFF1B
        //      porint: \u8868\u793A\u632A\u52A8 field \u5217\u7684\u65B9\u5F0F\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u9009\u7684\u503C\u5305\u62EC\uFF1A
        //          before: \u8868\u793A\u5C06\u8BE5\u5217\u5411\u5DE6\u632A\u52A8\u4E00\u683C\uFF1B
        //          after:  \u8868\u793A\u5C06\u8BE5\u5217\u5411\u53F3\u632A\u52A8\u4E00\u683C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        //  \u6CE8\u610F\uFF1A\u6B64\u65B9\u6CD5\u5728\u591A\u884C\u8868\u5934\u60C5\u51B5\u4E0B\u65E0\u6548\u3002
        shiftColumn: function (jq, param) { return jq.each(function () { shiftColumn(this, param); }); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u5217\u7684\u4E0B\u4E00\u683C\u4F4D\u7F6E\u5217\u7684 \u5217\u5C5E\u6027(columnOption) \u4FE1\u606F\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 field \u8868\u793A\u6307\u5B9A\u5217\u7684 field \u503C\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u5F53\u524D\u6307\u5B9A\u5217\u7684\u4E0B\u4E00\u683C\u4F4D\u7F6E\u7684\u5217\u7684 \u5217\u5C5E\u6027(columnOption) \u4FE1\u606F\u3002
        //      \u5982\u679C\u4E0D\u5B58\u5728\u6307\u5B9A\u7684\u5217\uFF0C\u6216\u8005\u6307\u5B9A\u5217\u7684\u4E0B\u4E00\u683C\u4F4D\u7F6E\u6CA1\u6709\u5176\u4ED6\u5217\uFF0C\u5219\u8FD4\u56DE null\u3002
        nextColumn: function (jq, field) { return getNextColumn(jq[0], field); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u83B7\u53D6\u6307\u5B9A\u5217\u7684\u4E0A\u4E00\u683C\u4F4D\u7F6E\u5217\u7684 \u5217\u5C5E\u6027(columnOption) \u4FE1\u606F\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 field \u8868\u793A\u6307\u5B9A\u5217\u7684 field \u503C\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u5F53\u524D\u6307\u5B9A\u5217\u7684\u4E0A\u4E00\u683C\u4F4D\u7F6E\u7684\u5217\u7684 \u5217\u5C5E\u6027(columnOption) \u4FE1\u606F\u3002
        //      \u5982\u679C\u4E0D\u5B58\u5728\u6307\u5B9A\u7684\u5217\uFF0C\u6216\u8005\u6307\u5B9A\u5217\u7684\u4E0A\u4E00\u683C\u4F4D\u7F6E\u6CA1\u6709\u5176\u4ED6\u5217\uFF0C\u5219\u8FD4\u56DE null\u3002
        prevColumn: function (jq, field) { return getPrevColumn(jq[0], field); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5220\u9664\u6307\u5B9A\u7684\u5217\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 field \u8868\u793A\u8981\u5220\u9664\u7684\u5217\u7684 field \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        deleteColumn: function (jq, field) { return jq.each(function () { deleteColumn(this, field); }); },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF1B\u5220\u9664\u6307\u5B9A\u7684\u5217\u5E76\u8FD4\u56DE\u8BE5\u5217\u7684 ColumnOption \u503C\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 field \u8868\u793A\u8981\u5220\u9664\u7684\u5217\u7684 field \u503C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u53C2\u6570 field \u503C\u6240\u8868\u793A\u7684\u5217\u7684 ColumnOption \u503C\u3002\u5982\u679C\u5F53\u524D easyui-datagrid \u4E0D\u5B58\u5728\u8BE5\u5217\uFF0C\u5219\u8FD4\u56DE null\u3002
        popColumn: function (jq, field) { return popColumn(jq[0], param); },


        //  \u83B7\u53D6 easyui-datagrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u5217\u7684 DOM-jQuery \u5143\u7D20\u5BF9\u8C61\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      param: \u8BE5\u53C2\u6570\u53EF\u4EE5\u5B9A\u4F4D\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //          String \u7C7B\u578B\uFF1A\u8868\u793A\u8981\u83B7\u53D6\u7684 DOM-jQuery \u5143\u7D20\u6240\u5728\u7684\u5217\u7684 field \u540D\uFF1B
        //          JSON-Object \u7C7B\u578B\uFF1A\u5982\u679C\u5B9A\u4E49\u4E3A\u8BE5\u7C7B\u578B\uFF0C\u5219\u8BE5\u53C2\u6570\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //              field:  \u8868\u793A\u8981\u83B7\u53D6\u7684 DOM-jQuery \u5143\u7D20\u6240\u5728\u7684\u5217\u7684 field \u540D\uFF1B
        //              header: Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8868\u793A\u8FD4\u56DE\u7684 DOM-jQuery \u5BF9\u8C61\u4E2D\u662F\u5426\u5305\u542B field \u8868\u793A\u7684\u5217\u7684\u8868\u5934\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D\u9875\u5B58\u5728 field \u503C\u6307\u5B9A\u7684\u5217\uFF0C\u5219\u8FD4\u56DE\u8BE5\u5217\u4E2D\u6307\u5B9A\u884C\u7684 DOM-jQuery \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u4E2D\u5305\u542B\u7684 DOM \u8282\u70B9\u7EA7\u522B\u4E3A\u4E00\u4E2A td[field=field] \u5BF9\u8C61\uFF1B
        //          \u5426\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u7684 jQuery \u5BF9\u8C61\u3002
        //          \u5982\u679C param \u53C2\u6570\u5B9A\u4E49\u4E3A JSON-Object \u7C7B\u578B\uFF0C\u4E14 param.header = true\uFF0C\u5219\u8FD4\u56DE\u7684 DOM-jQuery \u5BF9\u8C61\u4E2D\u5C06\u4F1A\u5305\u542B\u5217\u7684\u8868\u5934\u5143\u7D20\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u5B9A\u4E49\u4E3A String \u7C7B\u578B\u6216\u8005\u5373\u4F7F\u5B9A\u4E49\u4E3A JSON-Object \u7C7B\u578B\u4F46 param.header = false\uFF0C\u5219\u8FD4\u56DE\u7684 DOM-jQuery \u5BF9\u8C61\u4E2D\u4E0D\u5305\u542B\u5217\u7684\u8868\u5934\u5143\u7D20\u3002
        getColumnDom: function (jq, param) { return getColumnDom(jq[0], param); },

        //  \u83B7\u53D6 easyui-datagrid \u4E2D\u5F53\u524D\u4E5F\u6307\u5B9A\u5217\u6240\u6709\u884C\u7684\u5355\u5143\u683C\u6570\u636E\u6240\u6784\u6210\u7684\u4E00\u4E2A\u6570\u7EC4\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      field: \u8981\u83B7\u53D6\u7684\u6570\u636E\u7684\u5217\u7684 field \u540D\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u662F\u5176\u6570\u636E\u884C\u7684\u8BE5\u5217\u7684\u503C\uFF0C\u6570\u7EC4\u7684\u957F\u5EA6\u7B49\u4E8E grid.datagrid("getRows") \u7684\u957F\u5EA6\uFF1B
        //          \u5982\u679C\u4F20\u5165\u7684\u5217\u540D\u4E0D\u5B58\u5728\uFF0C\u5219\u8FD4\u56DE\u6570\u7EC4\u7684\u957F\u5EA6\u540C\u6837\u7B49\u4E8E grid.datagrid("getRows") \u7684\u957F\u5EA6\uFF0C\u53EA\u662F\u6BCF\u4E2A\u5143\u7D20\u7684\u503C\u90FD\u4E3A undefined.
        getColumnData: function (jq, field) { return getColumnData(jq[0], field); },

        //  \u83B7\u53D6 easyui-datagrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u884C\u7684 DOM-jQuery \u5BF9\u8C61\u5143\u7D20\u96C6\u5408\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      index: \u8868\u793A\u8981\u83B7\u53D6\u7684 DOM-Jquery \u5BF9\u8C61\u5143\u7D20\u96C6\u5408\u6240\u5728\u5F53\u524D\u9875\u7684\u884C\u7D22\u5F15\u53F7\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D\u9875\u5B58\u5728 index \u6307\u793A\u7684\u884C\uFF0C\u5219\u8FD4\u56DE\u8BE5\u884C\u7684 DOM-jQuery \u5BF9\u8C61\u96C6\u5408\uFF0C\u8BE5\u96C6\u5408\u4E2D\u5305\u542B\u7684 DOM \u8282\u70B9\u7EA7\u522B\u4E3A\u4E00\u7EC4 tr class="datagrid-row" \u5BF9\u8C61\uFF1B
        //          \u5426\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u7684 jQuery \u5BF9\u8C61\u3002
        getRowDom: function (jq, index) { return getRowDom(jq[0], index); },

        //  \u83B7\u53D6 easyui-datagrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u884C\u7684 rowData\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      index: \u8868\u793A\u8981\u83B7\u53D6\u7684 rowData \u6240\u5728\u5F53\u524D\u9875\u7684\u884C\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D\u9875\u5B58\u5728 index \u6307\u793A\u7684\u884C\uFF0C\u5219\u8FD4\u56DE\u8BE5\u884C\u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF08JSON Object \u683C\u5F0F\uFF09\uFF1B\u5426\u5219\u8FD4\u56DE undefined\u3002
        getRowData: function (jq, index) { return getRowData(jq[0], index); },

        //  \u83B7\u53D6 easyui-datagrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u5355\u5143\u683C\u7684 Dom-jQuery \u5BF9\u8C61\u5143\u7D20\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      pos\uFF1A\u8868\u793A\u5355\u5143\u683C\u7684\u4F4D\u7F6E\uFF0C\u4E3A\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF0C\u8BE5 JSON \u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          field:  \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u5217\uFF1B
        //          index:  \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u884C\u7684\u884C\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D\u9875\u5B58\u5728\u6307\u5B9A\u5217\u7684\u6307\u5B9A\u884C\uFF0C\u5219\u8FD4\u56DE\u8BE5\u5217\u4E2D\u6307\u5B9A\u884C\u7684 DOM-jQuery \u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u4E2D\u5305\u542B\u7684 DOM \u8282\u70B9\u7EA7\u522B\u4E3A\u4E00\u4E2A div class="datagrid-cell" \u5BF9\u8C61\uFF1B
        //          \u5426\u5219\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u7684 jQuery \u5BF9\u8C61\u3002
        getCellDom: function (jq, pos) { return getCellDom(jq[0], pos); },

        //  \u83B7\u53D6 easyui-datagrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u5355\u5143\u683C\u7684\u6570\u636E\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //  pos\uFF1A\u8868\u793A\u5355\u5143\u683C\u7684\u4F4D\u7F6E\uFF0C\u4E3A\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF0C\u8BE5 JSON \u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          field:  \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u5217\uFF1B
        //          index:  \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u884C\u7684\u884C\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D\u9875\u5B58\u5728\u6307\u5B9A\u5217\u7684\u6307\u5B9A\u884C\uFF0C\u5219\u8FD4\u56DE\u8BE5\u5217\u4E2D\u6307\u5B9A\u884C\u53CA\u6307\u5B9A\u5217\u7684\u5355\u5143\u683C\u6570\u636E\uFF1B\u5426\u5219\u8FD4\u56DE undefined\u3002
        getCellData: function (jq, pos) { return getCellData(jq[0], pos); },

        //  \u83B7\u53D6 easyui-datagrid \u4E2D\u5F53\u524D\u9875\u6307\u5B9A\u5355\u5143\u683C\u7684\u663E\u793A\u6570\u636E(\u7ECF\u8FC7 formatter \u683C\u5F0F\u5316\u540E\u7684\u663E\u793A\u6570\u636E)\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //  pos\uFF1A\u8868\u793A\u5355\u5143\u683C\u7684\u4F4D\u7F6E\uFF0C\u4E3A\u4E00\u4E2A JSON-Object \u5BF9\u8C61\uFF0C\u8BE5 JSON \u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          field:  \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u5217\uFF1B
        //          index:  \u8868\u793A\u8981\u83B7\u53D6\u7684\u5355\u5143\u683C\u4F4D\u4E8E\u54EA\u4E2A\u884C\u7684\u884C\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D\u9875\u5B58\u5728\u6307\u5B9A\u5217\u7684\u6307\u5B9A\u884C\uFF0C\u5219\u8FD4\u56DE\u8BE5\u5217\u4E2D\u6307\u5B9A\u884C\u7684\u5355\u5143\u683C\u7684\u663E\u793A\u6570\u636E(\u7ECF\u8FC7 formatter \u683C\u5F0F\u5316\u540E\u7684\u663E\u793A\u6570\u636E)\uFF1B\u5426\u5219\u8FD4\u56DE undefined\u3002
        getCellDisplay: function (jq, pos) { return getCellDisplay(jq[0], pos); },

        //  \u83B7\u53D6 easyui-datagrid \u6240\u6709\u5217\u7684 field \u6240\u7EC4\u6210\u7684\u4E00\u4E2A\u6570\u7EC4\u96C6\u5408\uFF1B\u53C2\u6570 frozen \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u683C\u5F0F\uFF1A
        //      Boolean \u7C7B\u578B\u503C\uFF1A\u5982\u679C\u662F true\uFF0C\u5219\u8868\u793A\u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\u4E2D\u5305\u542B frozen(\u51BB\u7ED3)\u5217\uFF0C\u5982\u679C\u662F false \u5219\u8868\u793A\u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\u4E2D\u4E0D\u5305\u542B frozen(\u51BB\u7ED3)\u5217\uFF1B
        //      String \u7C7B\u578B\u503C\uFF1A\u5982\u679C\u8BE5\u53C2\u6570\u5B9A\u4E49\u4E3A\u4EFB\u610F String \u7C7B\u578B\u503C\uFF0C\u5219\u8FD4\u56DE\u6240\u6709\u5217\u4FE1\u606F(\u5305\u62EC frozen \u51BB\u7ED3\u5217\u548C\u975E\u51BB\u7ED3\u5217)\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C frozen \u53C2\u6570\u5B9A\u4E49\u4E3A Boolean \u4E14\u4E3A true\uFF0C\u5219\u8FD4\u56DE\u6240\u6709 frozen(\u51BB\u7ED3) \u5217\u7684 field \u6240\u6784\u6210\u7684\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF1B
        //      \u5982\u679C frozen \u53C2\u6570\u5B9A\u4E49\u4E3A false\uFF0C\u5219\u8FD4\u56DE\u6240\u6709\u975E frozen(\u975E\u51BB\u7ED3) \u5217\u7684 field \u6240\u6784\u6210\u7684\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF1B
        //      \u5982\u679C frozen \u5B9A\u4E49\u4E3A\u4EFB\u610F\u7684 String \u7C7B\u578B\u503C\uFF0C\u5219\u8FD4\u56DE\u6240\u6709\u5217\u7684 field \u6240\u6784\u6210\u7684\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\u3002
        getColumnFields: function (jq, frozen) { return getColumnFields(jq[0], frozen); },

        //  \u83B7\u53D6 easyui-datagrid \u6309\u6307\u5B9A\u5217\u7684\u53BB\u91CD\u590D\u9879\u540E\u7684\u884C\u6570\u636E\u96C6\u5408\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      field:  \u8981\u83B7\u53D6\u7684\u6570\u636E\u7684\u5217\u7684 field \u540D\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u8868\u793A\u4E00\u4E2A\u884C\u6570\u636E\uFF1B
        //      \u5176\u7ED3\u679C\u76F8\u5F53\u4E8E\u5F53\u524D easyui-datagrid \u63A7\u4EF6\u8C03\u7528 getRows \u8FD4\u56DE\u540E\u5E76\u7ECF\u8FC7\u5BF9\u6307\u5B9A\u5217\u53BB\u91CD\u590D\u9879\u540E\u7684\u7ED3\u679C\uFF1B
        //      \u5982\u679C\u4F20\u5165\u7684\u5217\u540D\u4E0D\u5B58\u5728\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u957F\u5EA6\u4E3A 0 \u7684\u6570\u7EC4\u5BF9\u8C61.
        getDistinctRows: function (jq, field) { return getDistinctRows(jq[0], field); },

        //  \u83B7\u53D6 easyui-datagrid \u6307\u5B9A\u5217\u7684\u503C\u53BB\u91CD\u590D\u9879\u540E\u7684\u6570\u636E\u96C6\u5408\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1B
        //      field:  \u8981\u83B7\u53D6\u7684\u6570\u636E\u7684\u5217\u7684 field \u540D\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u8868\u793A\u67D0\u4E00\u884C\u7684\u76F8\u5E94 field \u5C5E\u6027\u7684\u503C\uFF1B
        //      \u5176\u7ED3\u679C\u76F8\u5F53\u4E8E\u5F53\u524D easyui-datagrid \u63A7\u4EF6\u8C03\u7528 getColumnData \u8FD4\u56DE\u540E\u5E76\u7ECF\u8FC7\u5BF9\u6307\u5B9A\u5217\u53BB\u91CD\u590D\u9879\u540E\u7684\u7ED3\u679C\uFF1B
        //      \u5982\u679C\u4F20\u5165\u7684\u5217\u540D\u4E0D\u5B58\u5728\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u957F\u5EA6\u4E3A 0 \u7684\u6570\u7EC4\u5BF9\u8C61.
        getDistinctColumnData: function (jq, field) { return getDistinctColumnData(jq[0], field); },

        //  \u83B7\u53D6 easyui-datagrid \u6240\u6709\u5217\u7684 columnOption \u6240\u7EC4\u6210\u7684\u4E00\u4E2A\u6570\u7EC4\u96C6\u5408\uFF1B\u53C2\u6570 frozen \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u683C\u5F0F\uFF1A
        //      Boolean \u7C7B\u578B\u503C\uFF1A\u5982\u679C\u662F true\uFF0C\u5219\u8868\u793A\u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\u4E2D\u5305\u542B frozen(\u51BB\u7ED3)\u5217\uFF0C\u5982\u679C\u662F false \u5219\u8868\u793A\u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\u4E2D\u4E0D\u5305\u542B frozen(\u51BB\u7ED3)\u5217\uFF1B
        //      String \u7C7B\u578B\u503C\uFF1A\u5982\u679C\u8BE5\u53C2\u6570\u5B9A\u4E49\u4E3A\u4EFB\u610F String \u7C7B\u578B\u503C\uFF0C\u5219\u8FD4\u56DE\u6240\u6709\u5217\u4FE1\u606F(\u5305\u62EC frozen \u51BB\u7ED3\u5217\u548C\u975E\u51BB\u7ED3\u5217)\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C frozen \u53C2\u6570\u5B9A\u4E49\u4E3A Boolean \u4E14\u4E3A true\uFF0C\u5219\u8FD4\u56DE\u6240\u6709 frozen(\u51BB\u7ED3) \u5217\u7684 columnOption \u6240\u6784\u6210\u7684\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF1B
        //      \u5982\u679C frozen \u53C2\u6570\u5B9A\u4E49\u4E3A false\uFF0C\u5219\u8FD4\u56DE\u6240\u6709\u975E frozen(\u975E\u51BB\u7ED3) \u5217\u7684 columnOption \u6240\u6784\u6210\u7684\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF1B
        //      \u5982\u679C frozen \u5B9A\u4E49\u4E3A\u4EFB\u610F\u7684 String \u7C7B\u578B\u503C\uFF0C\u5219\u8FD4\u56DE\u6240\u6709\u5217\u7684 columnOption \u6240\u6784\u6210\u7684\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\u3002
        getColumns: function (jq, frozen) { return getColumns(jq[0], frozen); },

        //  \u540C getColumns \u65B9\u6CD5\uFF0C\u4F46\u662F\u4EC5\u8FD4\u56DE\u5217\u7684 columnOption.hidden \u503C\u4E3A true \u7684\u5217\u3002
        getHiddenColumns: function (jq, frozen) { return getHiddenColumns(jq[0], frozen); },

        //  \u540C getColumns \u65B9\u6CD5\uFF0C\u4F46\u662F\u4EC5\u8FD4\u56DE\u5217\u7684 columnOption.hidden \u503C\u4E3A false \u7684\u5217\u3002
        getVisibleColumns: function (jq, frozen) { return getVisibleColumns(jq[0], frozen); },

        //  \u540C getColumnFields \u65B9\u6CD5\uFF0C\u4F46\u662F\u4EC5\u8FD4\u56DE\u5217\u7684 columnOption.hidden \u503C\u4E3A true \u7684\u5217\u3002
        getHiddenColumnFields: function (jq, frozen) { return getHiddenColumnFields(jq[0], frozen); },

        //  \u540C getColumnFields \u65B9\u6CD5\uFF0C\u4F46\u662F\u4EC5\u8FD4\u56DE\u5217\u7684 columnOption.hidden \u503C\u4E3A false \u7684\u5217\u3002
        getVisibleColumnFields: function (jq, frozen) { return getVisibleColumnFields(jq[0], frozen); },

        //  \u663E\u793A\u5F53\u524D easyui-datagrid \u5F53\u524D\u9875\u6570\u636E\u4E2D\u6307\u5B9A\u884C\u7684\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //      function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-datagrid \u8C03\u7528 getRows \u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A function \u7C7B\u578B\uFF0C\u5219 findRow \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-datagrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8868\u793A\u627E\u5230\u9700\u8981\u67E5\u627E\u7684\u7ED3\u679C\uFF0C\u7ACB\u5373\u505C\u6B62\u5FAA\u73AF\u8C03\u7528\u5E76\u663E\u793A\u8BE5\u884C\u6570\u636E\uFF1B
        //          \u5982\u679C\u56DE\u8C03\u51FD\u6570\u59CB\u7EC8\u672A\u8FD4\u56DE true\uFF0C\u5219\u8BE5\u56DE\u8C03\u51FD\u6570\u4F1A\u4E00\u76F4\u904D\u5386 rows \u76F4\u5230\u6700\u540E\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        showRow: function (jq, param) { return jq.each(function () { showRow(this, param); }); },

        //  \u9690\u85CF\u5F53\u524D easyui-datagrid \u5F53\u524D\u9875\u6570\u636E\u4E2D\u6307\u5B9A\u884C\u7684\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //      function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-datagrid \u8C03\u7528 getRows \u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A function \u7C7B\u578B\uFF0C\u5219 findRow \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-datagrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8868\u793A\u627E\u5230\u9700\u8981\u67E5\u627E\u7684\u7ED3\u679C\uFF0C\u7ACB\u5373\u505C\u6B62\u5FAA\u73AF\u8C03\u7528\u5E76\u9690\u85CF\u8BE5\u884C\u6570\u636E\uFF1B
        //          \u5982\u679C\u56DE\u8C03\u51FD\u6570\u59CB\u7EC8\u672A\u8FD4\u56DE true\uFF0C\u5219\u8BE5\u56DE\u8C03\u51FD\u6570\u4F1A\u4E00\u76F4\u904D\u5386 rows \u76F4\u5230\u6700\u540E\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        hideRow: function (jq, param) { return jq.each(function () { hideRow(this, param); }); },

        //  \u663E\u793A\u5F53\u524D easyui-datagrid \u5F53\u524D\u9875\u6570\u636E\u4E2D\u6307\u5B9A\u591A\u884C\u7684\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E09\u79CD\u7C7B\u578B\uFF1A
        //      Function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-datagrid \u8C03\u7528 getRows \u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A Function \u7C7B\u578B\uFF0C\u5219 showRows \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-datagrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8BE5\u884C\u6570\u636E\u5C06\u4F1A\u88AB\u663E\u793A\uFF1B
        //      Array \u7C7B\u578B\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u7C7B\u578B\uFF1A
        //          \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //          Function \u7C7B\u578B\uFF1B\u5177\u4F53\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u53C2\u8003 showRow \u65B9\u6CD5\u4E2D param \u53C2\u6570\u4E3A function \u7C7B\u578B\u65F6\u7684\u5B9A\u4E49\uFF1B
        //          \u5F53 param \u53C2\u6570\u5B9A\u4E49\u4E3A Array \u7C7B\u578B\u65F6\uFF0C\u5219 showRows \u65B9\u6CD5\u4F1A\u5BF9\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u5FAA\u73AF\u8C03\u7528 showRow \u65B9\u6CD5\uFF1B
        //      Boolean \u7C7B\u578B\u4E14\u4E3A true\uFF1A\u5219 showRows \u5C06\u4F1A\u663E\u793A easyui-datagrid \u5F53\u524D\u9875\u7684\u6240\u6709\u6570\u636E\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        showRows: function (jq, param) { return jq.each(function () { showRows(this, param); }); },

        //  \u9690\u85CF\u5F53\u524D easyui-datagrid \u5F53\u524D\u9875\u6570\u636E\u4E2D\u6307\u5B9A\u591A\u884C\u7684\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E09\u79CD\u7C7B\u578B\uFF1A
        //      Function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-datagrid \u8C03\u7528 getRows \u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A Function \u7C7B\u578B\uFF0C\u5219 hideRows \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-datagrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8BE5\u884C\u6570\u636E\u5C06\u4F1A\u88AB\u9690\u85CF\uFF1B
        //      Array \u7C7B\u578B\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u7C7B\u578B\uFF1A
        //          \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //          Function \u7C7B\u578B\uFF1B\u5177\u4F53\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u53C2\u8003 hideRow \u65B9\u6CD5\u4E2D param \u53C2\u6570\u4E3A function \u7C7B\u578B\u65F6\u7684\u5B9A\u4E49\uFF1B
        //          \u5F53 param \u53C2\u6570\u5B9A\u4E49\u4E3A Array \u7C7B\u578B\u65F6\uFF0C\u5219 hideRows \u65B9\u6CD5\u4F1A\u5BF9\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u5FAA\u73AF\u8C03\u7528 hideRow \u65B9\u6CD5\uFF1B
        //      Boolean \u7C7B\u578B\u4E14\u4E3A true\uFF1A\u5219 hideRows \u5C06\u4F1A\u9690\u85CF easyui-datagrid \u5F53\u524D\u9875\u7684\u6240\u6709\u6570\u636E\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        hideRows: function (jq, param) { return jq.each(function () { hideRows(this, param); }); },

        //  \u83B7\u53D6\u5F53\u524D easyui-datagrid \u5F53\u524D\u9875\u6240\u6709\u9690\u85CF\u7684\u884C\u6570\u636E\u6240\u6784\u6210\u7684\u4E00\u4E2A Array \u5BF9\u8C61\u3002
        getHiddenRows: function (jq) { return getHiddenRows(jq[0]); },

        //  \u83B7\u53D6\u5F53\u524D easyui-datagrid \u5F53\u524D\u9875\u6240\u6709\u663E\u793A\u7684\u884C\u6570\u636E\u6240\u6784\u6210\u7684\u4E00\u4E2A Array \u5BF9\u8C61\u3002
        getVisibleRows: function (jq) { return getVisibleRows(jq[0]); },

        //  \u4F7F\u5F53\u524D easyui-datagrid \u4E2D\u6307\u5B9A\u7684\u5217 DOM \u5BF9\u8C61\u9AD8\u4EAE\u663E\u793A\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u5982\u4E0B\u53C2\u6570\uFF1A
        //      field: \u8981\u9AD8\u4EAE\u663E\u793A\u7684\u5217\u7684 field \u540D\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        highlightColumn: function (jq, field) { return jq.each(function () { highlightColumn(this, field); }); },

        //  \u5BF9\u5F53\u524D easyui-datagrid \u4E2D\u8FDB\u884C\u9AD8\u4EAE\u5173\u952E\u8BCD\u67E5\u8BE2\uFF1B\u8BE5\u65B9\u6CD5\u7684 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      1、String \u7C7B\u578B\u503C\uFF1A\u8868\u793A\u8981\u5BF9\u6240\u6709\u5217\u8FDB\u884C\u7684\u9AD8\u4EAE\u67E5\u8BE2\u5173\u952E\u8BCD\uFF1B
        //      2、JSON-Object\uFF1A\u8868\u793A\u5BF9\u7279\u5B9A\u5217\u8FDB\u884C\u9AD8\u4EAE\u67E5\u8BE2\u7684\u53C2\u6570\uFF0C\u8BE5\u5BF9\u8C61\u7C7B\u578B\u53C2\u6570\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          field:      \u8868\u793A\u8981\u8FDB\u884C\u9AD8\u4EAE\u67E5\u8BE2\u7684\u5217\uFF1B
        //          value:      \u8868\u793A\u8981\u8FDB\u884C\u9AD8\u4EAE\u67E5\u8BE2\u7684\u5173\u952E\u8BCD\uFF1B
        //          regular:    Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B\u6307\u793A\u8BE5\u5173\u952E\u8BCD\u662F\u5426\u4E3A\u6B63\u5219\u8868\u8FBE\u5F0F\uFF1B
        //          ignoreCase: Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B\u6307\u793A\u9AD8\u4EAE\u67E5\u8BE2\u65F6\u662F\u5426\u5FFD\u7565\u5927\u5C0F\u5199\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        livesearch: function (jq, param) { return jq.each(function () { livesearch(this, param); }); },

        //  \u68C0\u6D4B\u5F53\u524D easyui-datagrid \u63A7\u4EF6\u662F\u5426\u5B58\u5728\u591A\u884C\u8868\u5934\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u5982\u679C\u5F53\u524D easyui-datagrid \u63A7\u4EF6\u8BBE\u7F6E\u4E86\u591A\u884C\u8868\u5934\uFF0C\u5219\u8FD4\u56DE true\uFF0C\u5426\u5219\u8FD4\u56DE false\u3002
        hasMuliRowHeader: function (jq) { return hasMuliRowHeader(jq[0]); },

        //  \u67E5\u627E\u5F53\u524D\u6570\u636E\u9875\u4E0A\u7684\u884C\u6570\u636E\uFF0C\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A JSON \u5BF9\u8C61\uFF1B\u53C2\u6570 param \u8868\u793A\u67E5\u627E\u7684\u5185\u5BB9\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //      function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-datagrid \u8C03\u7528 getRows \u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A function \u7C7B\u578B\uFF0C\u5219 findRow \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-datagrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8868\u793A\u627E\u5230\u9700\u8981\u67E5\u627E\u7684\u7ED3\u679C\uFF0C\u7ACB\u5373\u505C\u6B62\u5FAA\u73AF\u8C03\u7528\u5E76\u8FD4\u56DE\u8BE5\u884C\u6570\u636E\uFF1B
        //          \u5982\u679C\u56DE\u8C03\u51FD\u6570\u59CB\u7EC8\u672A\u8FD4\u56DE true\uFF0C\u5219\u8BE5\u56DE\u8C03\u51FD\u6570\u4F1A\u4E00\u76F4\u904D\u5386 rows \u76F4\u5230\u6700\u540E\u5E76\u8FD4\u56DE null\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A JSON-Object\uFF0C\u8868\u793A\u4E00\u4E2A\u884C\u6570\u636E\u5BF9\u8C61\uFF1B\u5982\u679C\u672A\u627E\u5230\u76F8\u5E94\u6570\u636E\uFF0C\u5219\u8FD4\u56DE null\u3002
        findRow: function (jq, param) { return findRow(jq[0], param); },

        //  \u67E5\u627E\u5F53\u524D\u6570\u636E\u9875\u4E0A\u7684\u884C\u6570\u636E\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      Function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-datagrid \u8C03\u7528 getRows \u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A Function \u7C7B\u578B\uFF0C\u5219 findRows \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-datagrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\u4E2D\u5C06\u4F1A\u5305\u542B\u8BE5\u884C\u6570\u636E\uFF1B
        //          \u5982\u679C\u8BE5\u56DE\u8C03\u51FD\u6570\u59CB\u7EC8\u672A\u8FD4\u56DE true\uFF0C\u5219\u8BE5\u65B9\u6CD5\u6700\u7EC8\u8FD4\u56DE\u4E00\u4E2A\u957F\u5EA6\u4E3A 0 \u7684\u6570\u7EC4\u5BF9\u8C61\u3002
        //      Array \u7C7B\u578B\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u7C7B\u578B\uFF1A
        //          \u5F85\u67E5\u627E\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF1B
        //          Function \u7C7B\u578B\uFF1B\u5177\u4F53\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u53C2\u8003 findRow \u65B9\u6CD5\u4E2D param \u53C2\u6570\u4E3A function \u7C7B\u578B\u65F6\u7684\u5B9A\u4E49\uFF1B
        //          \u5F53 param \u53C2\u6570\u5B9A\u4E49\u4E3A Array \u7C7B\u578B\u65F6\uFF0C\u5219 findRows \u65B9\u6CD5\u4F1A\u5BF9\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u5FAA\u73AF\u8C03\u7528 findRow \u65B9\u6CD5\uFF0C\u5E76\u8FC7\u6EE4\u6389 findRow \u65B9\u6CD5\u8FD4\u56DE null \u7684\u7ED3\u679C\u884C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u4E00\u4E2A Array \u6570\u7EC4\u5BF9\u8C61\uFF1B\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u662F JSON-Object \u7C7B\u578B\uFF0C\u8868\u793A\u4E00\u4E2A\u884C\u6570\u636E\u5BF9\u8C61\uFF1B\u5982\u679C\u672A\u627E\u5230\u76F8\u5E94\u6570\u636E\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u957F\u5EA6\u4E3A 0 \u7684\u6570\u7EC4\u5BF9\u8C61\u3002
        findRows: function (jq, param) { return findRows(jq[0], param); },

        //  \u5220\u9664\u4E00\u884C\u6570\u636E\uFF0C\u91CD\u5199 easyui-datagrid \u672C\u8EAB\u7684 deleteRow \u65B9\u6CD5\uFF1B\u53C2\u6570 param \u8868\u793A\u8981\u5220\u9664\u7684\u5185\u5BB9\uFF1B\u8BE5\u53C2\u6570\u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E09\u79CD\u7C7B\u578B\uFF1A
        //      Number \u7C7B\u578B\uFF0C\u8868\u793A\u8981\u5220\u9664\u7684\u884C\u7D22\u5F15\u53F7\uFF1B
        //      \u8868\u793A\u8981\u5220\u9664\u7684\u884C\u6570\u636E\u7684 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\uFF0C\u6216\u8005\u884C\u6570\u636E\u5BF9\u8C61\uFF1B
        //      Function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-datagrid \u8C03\u7528 getRows \u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A Function \u7C7B\u578B\uFF0C\u5219 deleteRow \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-datagrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8868\u793A\u67E5\u627E\u5230\u4E86\u9700\u8981\u88AB\u5220\u9664\u7684\u884C\uFF0CdeleteRow \u65B9\u6CD5\u5C06\u4F1A\u5220\u9664\u8BE5\u884C\u6570\u636E\u5E76\u7ACB\u5373\u505C\u6B62\u548C\u8DF3\u51FA\u5FAA\u73AF\u64CD\u4F5C\uFF1B
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        deleteRow: function (jq, param) { return jq.each(function () { deleteRow(this, param); }); },

        //  \u5220\u9664\u591A\u884C\u6570\u636E\uFF0C\u53C2\u6570 param \u8868\u793A\u8981\u5220\u9664\u7684\u5185\u5BB9\uFF1B\u8BE5\u53C2\u6570\u53EF\u4EE5\u662F\u4EE5\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
        //      Function \u7C7B\u578B\uFF0C\u8BE5\u56DE\u8C03\u51FD\u6570\u7B7E\u540D\u4E3A function(row, index, rows)\uFF0C\u5176\u4E2D row \u8868\u793A\u884C\u6570\u636E\u5BF9\u8C61、index \u8868\u793A\u884C\u7D22\u5F15\u53F7、rows \u8868\u793A\u5F53\u524D easyui-datagrid \u8C03\u7528 getRows \u8FD4\u56DE\u7684\u7ED3\u679C\u96C6\uFF1B
        //          \u5982\u679C param \u53C2\u6570\u4E3A Function \u7C7B\u578B\uFF0C\u5219 deleteRows \u65B9\u6CD5\u4F1A\u5BF9\u5F53\u524D easyui-datagrid \u7684\u5F53\u524D\u9875\u7684\u6BCF\u4E00\u884C\u6570\u636E\u8C03\u7528\u8BE5\u56DE\u8C03\u51FD\u6570\uFF1B
        //          \u5F53\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE true \u65F6\uFF0C\u5219\u8868\u793A\u67E5\u627E\u5230\u4E86\u9700\u8981\u88AB\u5220\u9664\u7684\u884C\uFF0CdeleteRows \u65B9\u6CD5\u5C06\u4F1A\u5220\u9664\u8BE5\u884C\u6570\u636E\uFF0C\u5E76\u904D\u5386\u4E0B\u4E00\u884C\u6570\u636E\u76F4\u81F3\u6570\u6570\u636E\u96C6\u7684\u672B\u5C3E\uFF1B
        //      Array \u7C7B\u578B\uFF0C\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u76EE\u5747\u8868\u793A\u8981\u5220\u9664\u7684\u884C\u7684\u884C\u7D22\u5F15\u53F7\u6216\u8005 idField(\u4E3B\u952E) \u5B57\u6BB5\u503C\u6216\u8005\u884C\u6570\u636E\u5BF9\u8C61
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        deleteRows: function (jq, param) { return jq.each(function () { deleteRows(this, param); }); },

        //  \u5BF9\u6570\u636E\u5217\u8FDB\u884C\u6392\u5E8F\uFF0C\u53C2\u6570 options \u662F\u4E00\u4E2A JSON \u683C\u5F0F\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u4E86\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      sortName: String \u7C7B\u578B\uFF0C\u6267\u884C\u6392\u5E8F\u7684\u5B57\u6BB5\u540D\uFF0C\u5FC5\u987B\u662F\u5B58\u5728\u4E8E columns \u6216\u8005 frozenColumns \u4E2D\u67D0\u9879\u7684 field \u503C\u3002
        //      sortOrder: String \u7C7B\u578B\uFF0C\u6392\u5E8F\u65B9\u5F0F\uFF0C\u53EF\u8BBE\u5B9A\u7684\u503C\u9650\u5B9A\u4E3A "asc" \u6216 "desc"\uFF0C\u9ED8\u8BA4\u4E3A "asc"
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        sort: function (jq, options) { return jq.each(function () { sortGrid(this, options); }); },

        //  \u8BBE\u7F6E easyui-datagrid \u4E2D\u5217\u7684\u6807\u9898\uFF1B\u53C2\u6570 param \u662F\u4E00\u4E2A json \u5BF9\u8C61\uFF0C\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      field: \u5217\u5B57\u6BB5\u540D\u79F0
        //      title: \u5217\u7684\u65B0\u6807\u9898
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setColumnTitle: function (jq, param) { return jq.each(function () { setColumnTitle(this, param); }); },

        //  \u8BBE\u7F6E easyui-datagrid \u4E2D\u5217\u7684\u5BBD\u5EA6\uFF1B\u53C2\u6570 param \u662F\u4E00\u4E2A JSON \u5BF9\u8C61\uFF0C\u8BE5 JSON \u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      field: \u8981\u8BBE\u7F6E\u5217\u5BBD\u7684\u7684\u5217 field \u503C\uFF1B
        //      width: \u8981\u8BBE\u7F6E\u7684\u5217\u5BBD\u5EA6\uFF0CNumber \u7C7B\u578B\u503C\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setColumnWidth: function (jq, param) { return jq.each(function () { setColumnWidth(this, param); }); },

        //  \u8BBE\u7F6E\u5F53\u524D easyui-datagrid \u63A7\u4EF6\u7684 offset \u5C5E\u6027\uFF1B\u8BE5\u64CD\u4F5C\u80FD\u8BA9 offset \u5373\u53EF\u968F\u6D4F\u89C8\u5668\u7A97\u53E3\u5927\u5C0F\u8C03\u6574\u800C\u751F\u6548\u6216\u7981\u7528\uFF1B
        //  \u5907\u6CE8\uFF1A \u53C2\u6570 offset \u683C\u5F0F\u53C2\u8003\u6269\u5C55\u5C5E\u6027 offset\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setOffset: function (jq, offset) { return jq.each(function () { setOffset(this, offset); }); },

        //  \u8BBE\u7F6E\u5F53\u524D easyui-datagrid \u63A7\u4EF6\u7684\u8868\u5934\u8FC7\u6EE4\u5668\uFF1B\u8BE5\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      columnFilter: \u53C2\u89C1\u5C5E\u6027 columnFilter
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        setColumnFilter: function (jq, columnFilter) { return jq.each(function () { setColumnFilter(this, columnFilter); }); },

        //  \u5BF9\u5F53\u524D easyui-datagrid \u63A7\u4EF6\u6309\u7279\u5B9A\u6761\u4EF6\u8FDB\u884C\u884C\u8FC7\u6EE4/\u663E\u793A\u64CD\u4F5C\uFF1B\u8BE5\u65B9\u6CD5\u7684\u53C2\u6570 param \u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5982\u4E0B\u4E24\u79CD\u7C7B\u578B\uFF1A
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
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        columnFilterSelect: function (jq, param) { return jq.each(function () { columnFilterSelect(this, param); }); },

        //  \u5C06\u5F53\u524D\u8868\u683C\u6570\u636E\u5BFC\u51FA\u4E3A excel \u6587\u4EF6\uFF1B\u8BE5\u51FD\u6570\u5B9A\u4E49\u4E86\u4E00\u4E2A\u53C2\u6570 isAll\uFF1B
        //  \u53C2\u6570 isAll \u6307\u793A\u662F\u5426\u5BFC\u51FA\u5168\u90E8\u800C\u975E\u4EC5\u5F53\u524D\u9875\u6570\u636E\uFF0C\u5982\u679C\u4E0D\u4F20\u5165\u8BE5\u53C2\u6570\u9ED8\u8BA4\u4E3A false \u5373\u5BFC\u51FA\u5F53\u524D\u9875\u6570\u636E\u3002
        //  \u5F53\u53C2\u6570 isAll \u4E3A true \u5E76\u4E14 remotePaging \u4E3A true \u65F6\uFF0C\u9700\u8981\u5F53\u524D easyui-datagrid \u63A7\u4EF6\u7684 url \u5C5E\u6027\u6307\u793A\u7684\u670D\u52A1\u5668\u6570\u636E\u6E90\u652F\u6301\u67E5\u8BE2\u6240\u6709\u6570\u636E
        //      \uFF08\u4EE5 rows: 0 \u65B9\u5F0F\u4E0D\u5206\u9875\u67E5\u8BE2\u6240\u6709\u6570\u636E\uFF09\u3002
        //  \u8FD4\u56DE\u503C\uFF1A\u8FD4\u56DE\u8868\u793A\u5F53\u524D easyui-datagrid \u7EC4\u4EF6\u7684 jQuery \u94FE\u5F0F\u5BF9\u8C61\u3002
        exportExcel: function (jq, isAll) { return jq.each(function () { exportGrid(this, isAll); }); }

    };
    var defaults = $.fn.datagrid.extensions.defaults = {

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u5C4F\u5E55\u5927\u5C0F\u8C03\u6574\u65F6\u5019\u968F\u5C4F\u5E55\u5927\u5C0F\u5C3A\u5BF8\u8C03\u6574\u800C\u81EA\u8EAB\u5927\u5C0F\u8C03\u6574\u7684\u504F\u79FB\u91CF\uFF1B
        //  \u8BE5\u53C2\u6570\u4E3A\u4E00\u4E2A JSON \u683C\u5F0F\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      width: \u8868\u793A\u76F8\u5BF9\u4E8E\u6D4F\u89C8\u5668\u7A97\u53E3\u5BBD\u5EA6\u7684\u504F\u79FB\u91CF\uFF0C\u5982\u679C\u662F\u6B63\u6570\u5219\u5176\u5BBD\u5EA6\u6BD4\u6D4F\u89C8\u5668\u7A97\u53E3\u5927\uFF0C\u53CD\u4E4B\u5219\u5176\u5BBD\u5EA6\u6BD4\u6D4F\u89C8\u5668\u7A97\u53E3\u5C0F\uFF0Cint\u7C7B\u578B\uFF1B
        //      height: \u8868\u793A\u76F8\u5BF9\u4E8E\u6D4F\u89C8\u5668\u7A97\u53E3\u9AD8\u5EA6\u7684\u504F\u79FB\u91CF\uFF0C\u5982\u679C\u662F\u6B63\u6570\u5219\u5176\u9AD8\u5EA6\u6BD4\u6D4F\u89C8\u5668\u7A97\u53E3\u5927\uFF0C\u53CD\u4E4B\u5219\u5176\u9AD8\u5EA6\u6BD4\u6D4F\u89C8\u5668\u7A97\u53E3\u5C0F\uFF0Cint\u7C7B\u578B\uFF1B
        //  \u5907\u6CE8\uFF1A\u8BE5\u53C2\u6570\u9ED8\u8BA4\u4E3A null\uFF0C\u8868\u793A\u4E0D\u968F\u5C4F\u5E55\u5C3A\u5BF8\u5927\u5C0F\u8C03\u6574\u800C\u8C03\u6574\uFF1B
        //      \u5982\u679C\u672A\u5B9A\u4E49 width \u6216\u8005 width: 0\uFF0C\u5219\u8868\u793A\u5C4F\u5E55\u5927\u5C0F\u8C03\u6574\u65F6 easyui-datagrid \u7684 width \u5C5E\u6027\u6491\u6EE1\u5C4F\u5E55\u5BBD\u5EA6\uFF1B
        //      \u5982\u679C\u672A\u5B9A\u4E49 height \u6216\u8005 height: 0\uFF0C\u5219\u8868\u793A\u5C4F\u5E55\u5927\u5C0F\u8C03\u6574\u65F6 easyui-datagrid \u7684 height \u5C5E\u6027\u6491\u6EE1\u5C4F\u5E55\u5BBD\u5EA6\uFF1B
        offset: null,

        //  \u8986\u76D6 easyui-datagrid \u7684\u539F\u751F\u5C5E\u6027 loadFilter\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        loadFilter: loadFilter,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1B
        //      \u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u8BBE\u5B9A\u4E86\u5C5E\u6027 rowContextMenu \u65F6\uFF0C\u662F\u5426\u5C06\u53CC\u51FB\u6570\u636E\u884C onDblClickRow \u4E8B\u4EF6\u7684\u54CD\u5E94\u51FD\u6570
        //      \u8BBE\u7F6E\u4E3A rowContextMenu \u7684\u7B2C "dblClickRowMenuIndex" \u4E2A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u54CD\u5E94\u51FD\u6570\uFF0C\u5E76\u5C06\u8BE5\u83DC\u5355\u9879\u7684\u5B57\u4F53\u52A0\u7C97\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //  \u5907\u6CE8\uFF1A\u5F53\u8BBE\u7F6E\u4E86\u6709\u6548\u7684\u5C5E\u6027 rowContextMenu \u65F6\u5019\uFF0C\u8BE5\u529F\u80FD\u65B9\u6709\u6548\u3002
        //      \u81EA\u52A8\u7ED1\u5B9A\u7684 onDblClickRow \u7684\u56DE\u8C03\u51FD\u6570\u4E2D\u5C06\u4F1A\u8C03\u7528 rowContextMenu \u7684\u7B2C "dblClickRowMenuIndex" \u4E2A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u54CD\u5E94\u51FD\u6570\uFF0C\u4F46\u662F\u56DE\u8C03\u51FD\u6570\u4E2D\u4E0D\u80FD\u7528\u5230\u53C2\u6570 e \u548C menu\u3002
        autoBindDblClickRow: true,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1B
        //  \u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u8BBE\u5B9A\u4E86\u5C5E\u6027 autoBindDblClickRow: true\uFF0C\u53CC\u51FB\u884C\u6570\u636E\u89E6\u53D1\u7684\u53F3\u952E\u83DC\u5355\u9879\u4E8B\u4EF6\u7684\u7D22\u5F15\u53F7\uFF1B
        //      \u610F\u5373\u89E6\u53D1\u7B2C\u51E0\u4E2A\u53F3\u952E\u83DC\u5355\u9879\u4E0A\u7684\u4E8B\u4EF6\u3002
        //  Number \u7C7B\u578B\u503C\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF0C\u9ED8\u8BA4\u4E3A 0\uFF1B
        //  \u5907\u6CE8\uFF1A\u5F53\u8BBE\u7F6E\u4E86\u81EA\u5B9A\u4E49\u5C5E\u6027 autoBindDblClickRow: true\u5E76\u4E14\u8BBE\u7F6E\u4E86\u6709\u6548\u7684\u5C5E\u6027 rowContextMenu \u65F6\uFF0C\u8BE5\u529F\u80FD\u65B9\u6709\u6548\uFF1B
        //      \u5982\u679C\u6B64\u7D22\u5F15\u503C\u8D85\u51FA\u83DC\u5355\u6570\u91CF\u8303\u56F4\uFF0C\u5219\u65E0\u6548\u3002
        dblClickRowMenuIndex: 0,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u70B9\u51FB\u8868\u5934\u6216\u8005\u884C\u6570\u636E\u65F6\u5019\u5F39\u51FA\u83DC\u5355\u4E2D\u5177\u6709 "\u5BFC\u51FA\u6570\u636E" \u83DC\u5355\u7684\u529F\u80FD\uFF1B
        //  \u8BE5\u5C5E\u6027\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u5BFC\u51FA\u6570\u636E\u201D\u83DC\u5355\u9879\u529F\u80FD\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        //      JSON-Object \u7C7B\u578B\uFF0C\u8BE5 JSON-Object \u53EF\u4EE5\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          current:   Boolean \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u201C\u5BFC\u51FA\u5F53\u524D\u9875\u201D\u7684\u83DC\u5355\u9879\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //          all:   Boolean \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u201C\u5BFC\u51FA\u5168\u90E8\u201D\u7684\u83DC\u5355\u9879\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //          submenu:    \u8868\u793A\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\u662F\u5426\u4EE5\u5B50\u83DC\u5355\u65B9\u5F0F\u5448\u73B0\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //  \u5907\u6CE8\uFF1A\u5F53 enableRowContextMenu \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u6709\u6548\u3002
        //  \u5BFC\u51FA\u6570\u636E\u529F\u80FD\u7684\u65B9\u6CD5\u5C1A\u672A\u5B9E\u73B0\uFF0C\u6240\u4EE5...\u5C31\u8BA9\u5B83\u4FDD\u6301\u9ED8\u8BA4\u4E3A false \u5427\u3002
        exportMenu: false,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0CBoolean \u7C7B\u578B\u503C\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\uFF1A
        //      \u5F53\u53F3\u952E\u5355\u51FB\u884C\u6570\u636E\u65F6\u9009\u62E9\u53F3\u952E\u5F53\u524D\u5355\u51FB\u7684\u884C\u7684\u529F\u80FD\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //  \u6CE8\u610F\uFF1A\u5F53\u6B64\u53C2\u6570\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u53F3\u952E\u70B9\u51FB\u884C\u4F1A\u5BF9\u6027\u80FD\u4EA7\u751F\u4E00\u5B9A\u5F71\u54CD\uFF1B\u5F53\u65F6\u6570\u636E\u91CF\u5927(\u5355\u9875\u6570\u636E\u8D85\u8FC7 100 \u884C)\u65F6\u4E0D\u5EFA\u8BAE\u4F7F\u7528\u3002
        selectOnRowContextMenu: false,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0CBoolean \u7C7B\u578B\u503C\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\uFF1A
        //      \u53F3\u952E(\u8868\u5934\u53F3\u952E\u6216\u884C\u53F3\u952E)\u70B9\u51FB\u65F6\u5F39\u51FA\u7684\u83DC\u5355\u9879\uFF0C\u5982\u679C\u662F disabled: true \uFF0C\u5219\u4E0D\u663E\u793A\u7684\u529F\u80FD\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B
        hideDisabledMenu: false,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u8868\u5217\u5934\u53F3\u952E\u83DC\u5355\uFF0C\u4E3A\u4E00\u4E2A Array \u5BF9\u8C61\uFF1B\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u5177\u6709\u5982\u4E0B\u5C5E\u6027:
        //      id:         \u8868\u793A\u83DC\u5355\u9879\u7684 id\uFF1B
        //      text:       \u8868\u793A\u83DC\u5355\u9879\u7684\u663E\u793A\u6587\u672C\uFF1B
        //      iconCls:    \u8868\u793A\u83DC\u5355\u9879\u7684\u5DE6\u4FA7\u663E\u793A\u56FE\u6807\uFF1B
        //      disabled:   \u8868\u793A\u83DC\u5355\u9879\u662F\u5426\u88AB\u7981\u7528(\u7981\u7528\u7684\u83DC\u5355\u9879\u70B9\u51FB\u65E0\u6548)\uFF1B
        //      hideOnClick:    \u8868\u793A\u8BE5\u83DC\u5355\u9879\u70B9\u51FB\u540E\u6574\u4E2A\u53F3\u952E\u83DC\u5355\u662F\u5426\u7ACB\u5373\u81EA\u52A8\u9690\u85CF\uFF1B
        //      bold:           Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B\u8868\u793A\u8BE5\u83DC\u5355\u9879\u662F\u5426\u5B57\u4F53\u52A0\u7C97\uFF1B
        //      style:          JSON-Object \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A null\uFF1B\u8868\u793A\u8981\u9644\u52A0\u5230\u8BE5\u83DC\u5355\u9879\u7684\u6837\u5F0F\uFF1B
        //      handler:    \u8868\u793A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u683C\u5F0F\u4E3A function(e, field, eventData, grid, item, menu)\uFF0C\u5176\u4E2D this \u6307\u5411\u83DC\u5355\u9879\u672C\u8EAB
        //  \u5907\u6CE8\uFF1A\u5177\u4F53\u683C\u5F0F\u53C2\u8003 easyui-datagrid \u7684 toolbar \u5C5E\u6027\u4E3A Array \u5BF9\u8C61\u7C7B\u578B\u7684\u683C\u5F0F\uFF1B
        headerContextMenu: null,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u6570\u636E\u884C\u53F3\u952E\u83DC\u5355\uFF0C\u4E3A\u4E00\u4E2A Array \u5BF9\u8C61\uFF1B\uFF1B\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u5143\u7D20\u90FD\u5177\u6709\u5982\u4E0B\u5C5E\u6027:
        //      id:         \u8868\u793A\u83DC\u5355\u9879\u7684 id\uFF1B
        //      text:       \u8868\u793A\u83DC\u5355\u9879\u7684\u663E\u793A\u6587\u672C\uFF1B
        //      iconCls:    \u8868\u793A\u83DC\u5355\u9879\u7684\u5DE6\u4FA7\u663E\u793A\u56FE\u6807\uFF1B
        //      disabled:   \u8868\u793A\u83DC\u5355\u9879\u662F\u5426\u88AB\u7981\u7528(\u7981\u7528\u7684\u83DC\u5355\u9879\u70B9\u51FB\u65E0\u6548)\uFF1B
        //      hideOnClick:    \u8868\u793A\u8BE5\u83DC\u5355\u9879\u70B9\u51FB\u540E\u6574\u4E2A\u53F3\u952E\u83DC\u5355\u662F\u5426\u7ACB\u5373\u81EA\u52A8\u9690\u85CF\uFF1B
        //      bold:           Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B\u8868\u793A\u8BE5\u83DC\u5355\u9879\u662F\u5426\u5B57\u4F53\u52A0\u7C97\uFF1B
        //      style:          JSON-Object \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A null\uFF1B\u8868\u793A\u8981\u9644\u52A0\u5230\u8BE5\u83DC\u5355\u9879\u7684\u6837\u5F0F\uFF1B
        //      handler:    \u8868\u793A\u83DC\u5355\u9879\u7684\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u683C\u5F0F\u4E3A function(e, rowIndex, rowData, eventData, grid, item, menu)\uFF0C\u5176\u4E2D this \u6307\u5411\u83DC\u5355\u9879\u672C\u8EAB
        //  \u5907\u6CE8\uFF1A\u5177\u4F53\u683C\u5F0F\u53C2\u8003 easyui-datagrid \u7684 toolbar \u5C5E\u6027\u4E3A Array \u5BF9\u8C61\u7C7B\u578B\u7684\u683C\u5F0F\uFF1B
        rowContextMenu: null,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528 easyui-datagrid \u7684\u8868\u5934\u5217\u70B9\u51FB\u6309\u94AE\u83DC\u5355\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002 
        enableHeaderClickMenu: true,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528 easyui-datagrid \u7684\u8868\u5934\u53F3\u952E\u83DC\u5355\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        enableHeaderContextMenu: true,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528 easyui-datagrid \u7684\u884C\u53F3\u952E\u83DC\u5355\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        enableRowContextMenu: true,

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u5C5E\u6027\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u4E0A\u79FB、\u4E0B\u79FB\u201D\u83DC\u5355\u9879\u7684\u529F\u80FD\uFF1B
        //  \u8BE5\u5C5E\u6027\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B
        //      JSON-Object \u7C7B\u578B\uFF0C\u8BE5 JSON-Object \u53EF\u4EE5\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          top:        \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u79FB\u81F3\u6700\u4E0A\u201D\u83DC\u5355\uFF1B
        //          up:         \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u4E0A\u79FB\u201D\u83DC\u5355\uFF1B
        //          down:       \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u4E0B\u79FB\u201D\u83DC\u5355\uFF1B
        //          bottom:     \u5E03\u5C14\u7C7B\u578B\u7684\u503C\uFF0C\u4E5F\u53EF\u662F\u4E00\u4E2A\u8FD4\u56DE\u5E03\u5C14\u503C\u7684\u51FD\u6570\uFF0C\u8868\u793A\u662F\u5426\u663E\u793A\u201C\u79FB\u81F3\u6700\u4E0A\u201D\u83DC\u5355\uFF1B
        //          submenu:    \u8868\u793A\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\u662F\u5426\u4EE5\u5B50\u83DC\u5355\u65B9\u5F0F\u5448\u73B0\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //          \u4E0A\u9762\u56DB\u4E2A\u5C5E\u6027\uFF0C\u5982\u679C\u53C2\u6570\u7684\u503C\u4E3A\u51FD\u6570\uFF0C\u5219\u51FD\u6570\u7684\u7B7E\u540D\u4E3A function(e, node, datagrid, item, menu)\u3002
        //  \u5907\u6CE8\uFF1A\u5F53 enableRowContextMenu \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u6709\u6548\u3002
        //      \u8FD9\u56DB\u4E2A\u83DC\u5355\u70B9\u51FB\u65F6\uFF0C\u4F1A\u81EA\u52A8\u89E6\u53D1 easyui-datagrid \u7684 onDrop \u4E8B\u4EF6\u3002
        moveMenu: false,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u7FFB\u9875\u201D\u83DC\u5355\u9879\u7684\u529F\u80FD\uFF1B
        //  \u8BE5\u5C5E\u6027\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u4EE5\u4E0B\u7C7B\u578B\uFF1A
        //      Boolean \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u7FFB\u9875\u201D\u83DC\u5355\u9879\u529F\u80FD\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        //      JSON-Object \u7C7B\u578B\uFF0C\u8BE5 JSON-Object \u53EF\u4EE5\u5305\u542B\u5982\u4E0B\u5C5E\u6027\uFF1A
        //          disabled:   Boolean \u7C7B\u578B\u503C\uFF0C\u8868\u793A\u662F\u5426\u7981\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u7FFB\u9875\u201D\u83DC\u5355\u9879\u529F\u80FD\uFF0C\u9ED8\u8BA4\u4E3A false\uFF1B
        //          submenu:    \u8868\u793A\u8FD9\u56DB\u4E2A\u83DC\u5355\u9879\u662F\u5426\u4EE5\u5B50\u83DC\u5355\u65B9\u5F0F\u5448\u73B0\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B
        //  \u5907\u6CE8\uFF1A\u5F53 enableRowContextMenu \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u6709\u6548\u3002
        pagingMenu: false,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u5237\u65B0\u5F53\u524D\u9875\u201D\u83DC\u5355\u9879\u7684\u529F\u80FD\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        refreshMenu: true,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\u8868\u683C\u7684\u884C\u8282\u70B9\u62D6\u52A8\u529F\u80FD\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        dndRow: false,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u542F\u7528\u884C\u6570\u636E\u7684 tooltip \u529F\u80FD\uFF1B
        //  \u8BE5\u5C5E\u6027\u53EF\u4EE5\u662F\u4E00\u4E2A Boolean \u7C7B\u578B\u503C\uFF1B\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A\u683C\u5F0F\u4E3A function(rowIndex, rowData) \u7684\u56DE\u8C03\u51FD\u6570\uFF1B
        //  \u5982\u679C\u8BE5\u53C2\u6570\u662F\u4E00\u4E2A\u56DE\u8C03\u51FD\u6570\uFF0C\u5219\u8868\u793A\u542F\u7528\u884C\u6570\u636E\u7684 tooltip \u529F\u80FD\uFF0C\u5E76\u4E14\u8BE5\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u4E3A tooltip \u7684 content \u503C\u3002
        //  \u9ED8\u8BA4\u4E3A Boolean \u7C7B\u578B\uFF0C\u503C\u4E3A false\u3002
        //  \u6CE8\u610F\uFF1A\u5F53\u542F\u7528\u8BE5\u914D\u7F6E\u5C5E\u6027\u540E\uFF0C\u6240\u6709\u5217\u7684 tootip \u5C5E\u6027\u5C31\u4F1A\u81EA\u52A8\u5931\u6548\u3002
        rowTooltip: false,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u5728\u89E6\u53D1 beginEdit \u4E8B\u4EF6\u540E\uFF0C\u662F\u5426\u6784\u5EFA\u4EFF ext-grid-rowediting \u884C\u7F16\u8F91\u7684\u201C\u4FDD\u5B58\u201D\u548C\u201C\u53D6\u6D88\u201D\u6309\u94AE\u9762\u677F\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        extEditing: true,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u5728\u53CC\u51FB data-row(\u6570\u636E\u884C) \u65F6\uFF0C\u662F\u5426\u81EA\u52A8\u542F\u7528\u8BE5\u884C\u7684\u7F16\u8F91\u529F\u80FD(\u6267\u884C beginEdit \u64CD\u4F5C)\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A false\u3002
        //  \u6CE8\u610F\uFF1A\u5F53 autoBindDblClickRow \u5C5E\u6027\u8BBE\u7F6E\u4E3A true \u4E14\u83DC\u5355\u9879\u6EE1\u8DB3\u5176\u89E6\u53D1\u6761\u4EF6\u65F6\uFF0CautoEditing \u7684\u53CC\u51FB\u884C\u65F6\u81EA\u52A8\u542F\u7528\u7F16\u8F91\u6548\u679C\u5C06\u4E0D\u4F1A\u89E6\u53D1\u3002
        autoEditing: false,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u662F\u5426\u5728\u4E00\u4E2A\u65F6\u523B\u53EA\u5141\u8BB8\u4E00\u884C\u6570\u636E\u5F00\u542F\u7F16\u8F91\u72B6\u6001(\u5F53\u67D0\u884C\u6570\u636E\u5F00\u542F\u7F16\u8F91\u72B6\u6001\u65F6\uFF0C\u5176\u4ED6\u6B63\u5728\u7F16\u8F91\u7684\u884C\u5C06\u4F1A\u88AB\u81EA\u52A8\u6267\u884C endEdit \u64CD\u4F5C)\uFF1B
        //  Boolean \u7C7B\u578B\u503C\uFF0C\u9ED8\u8BA4\u4E3A true\u3002
        singleEditing: true,

        //  \u589E\u52A0 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF0C\u8BE5\u5C5E\u6027\u8868\u793A\u5F53\u524D\u8868\u683C\u7684\u5217\u8FC7\u6EE4\u5668\u8BBE\u7F6E\u53C2\u6570\uFF1B\u8BE5\u53C2\u6570\u662F\u4E00\u4E2A JSON \u683C\u5F0F\u7684\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u5B9A\u4E49\u5982\u4E0B\u5C5E\u6027\uFF1A
        //      panelHeight: \u5217\u8FC7\u6EE4\u5668\u63A7\u4EF6\u9762\u677F\u7684\u9AD8\u5EA6\uFF0C\u9ED8\u8BA4\u4E3A 100\uFF0C\u8BE5\u503C\u6700\u5C0F\u4E3A 60\uFF1B
        //      position:   \u8868\u793A\u5217\u8FC7\u6EE4\u5668\u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u4EE5\u586B\u5165\u7684\u503C\u9650\u5B9A\u5728\u4EE5\u4E0B\u8303\u56F4\uFF1A
        //          "top":  \u8868\u793A\u5217\u8FC7\u6EE4\u5668\u88AB\u653E\u7F6E\u5728\u8868\u5934\u7684\u4E0A\u65B9\uFF1B
        //          "bottom":   \u8868\u793A\u5217\u8FC7\u6EE4\u5668\u88AB\u653E\u7F6E\u5728\u8868\u5934\u7684\u4E0B\u65B9\uFF1B\u9ED8\u8BA4\u503C\u3002
        //  \u5907\u6CE8\uFF1A\u5173\u4E8E\u5217\u8FC7\u6EE4\u5668\u7EC4\u4EF6\u4E2D\u6BCF\u4E2A\u5217\u5177\u4F53\u7684\u8FC7\u6EE4\u6548\u679C\u8BBE\u7F6E\uFF0C\u53C2\u89C1\u6269\u5C55\u7684 ColumnOption \u5C5E\u6027(\u89C1\u672C\u6E90\u7801\u6587\u4EF6\u540E\u9762\u6CE8\u91CA)\uFF1B
        //  \u6CE8\u610F\uFF1A
        //      1、\u5982\u679C\u4E0D\u5B9A\u4E49\u8BE5\u53C2\u6570\uFF0C\u5219\u8868\u793A\u5F53\u524D easyui-datagrid \u63A7\u4EF6\u4E0D\u542F\u7528\u5217\u8FC7\u6EE4\u5668\u529F\u80FD\uFF1B\u8BE5\u53C2\u6570\u4E0D\u5F71\u54CD\u8868\u5934\u53F3\u952E\u8FC7\u6EE4\u529F\u80FD\uFF1B
        //      2、\u8BE5\u529F\u80FD\u652F\u6301\u591A\u884C\u8868\u5934\uFF1B\u4F46\u4E0D\u4FDD\u8BC1\u5728\u591A\u884C\u8868\u5934\u60C5\u51B5\u4E0B\u5E03\u5C40\u4E0D\u4F1A\u51FA\u73B0\u6392\u7248\u9519\u8BEF\uFF1B
        //      3、\u8BE5\u529F\u80FD\u4EC5\u5B9E\u73B0\u672C\u5730\u6570\u636E\u8FC7\u6EE4\uFF0C\u4E5F\u5C31\u662F\u8BF4\u8BE5\u63D2\u4EF6\u4E0D\u4F1A\u5728\u5904\u7406\u8FDC\u7A0B\u6570\u636E\u8BF7\u6C42\u65F6\u5C06\u8FC7\u6EE4\u53C2\u6570\u4FE1\u606F\u53D1\u9001\u5230\u8FDC\u7A0B\u670D\u52A1\u5668\uFF1B
        //      4、\u5F53\u542F\u7528\u8BE5\u529F\u80FD\u65F6\uFF0Ceasyui-datagrid \u7684\u5C5E\u6027 fitColumns \u8BF7\u4FDD\u6301\u9ED8\u8BA4\u503C\u4E3A false\uFF0C\u5426\u5219\u5217\u5934\u8FC7\u6EE4\u5668\u7EC4\u4EF6\u53EF\u80FD\u5BFC\u81F4\u8868\u5934\u5217\u4E0D\u80FD\u5BF9\u9F50\u800C\u5E03\u5C40\u6DF7\u4E71\u3002
        columnFilter: null,

        //  \u8986\u76D6 easyui-datagrid \u7684\u539F\u751F\u5C5E\u6027 loader\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002\u8C03\u7528\u8005\u8BF7\u52FF\u5728\u81EA\u5DF1\u7684\u4EE3\u7801\u4E2D\u4F7F\u7528\u8BE5\u5C5E\u6027\uFF0C\u5426\u5219\u6269\u5C55\u529F\u80FD\u65E0\u6548\u3002
        loader: loader,

        //  \u8986\u76D6 easyui-datagrid \u7684\u539F\u751F\u5C5E\u6027\u4E8B\u4EF6 onLoadSuccess\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        //  \u6CE8\u610F\uFF1A\u5982\u679C\u8C03\u7528\u8005\u9700\u8981\u5728\u81EA\u5DF1\u7684\u4EE3\u7801\u4E2D\u4F7F\u7528\u8BE5\u4E8B\u4EF6\uFF0C\u8BF7\u4EE5\u8986\u76D6\u65B9\u5F0F\u91CD\u5199\uFF0C\u800C\u975E\u76F4\u63A5\u91CD\u5199\u3002
        //  \u8986\u76D6\u65B9\u5F0F\u91CD\u5199\u793A\u4F8B\uFF1A
        //      grid.datagrid({
        //          onLoadSuccess: function(data) {
        //              $.fn.datagrid.extensions.onLoadSuccess.apply(this, arguments);  //\u8FD9\u53E5\u4E00\u5B9A\u8981\u52A0\u4E0A\u3002
        //              ...                                     //\u8FD9\u91CC\u662F\u8C03\u7528\u8005\u7684\u5176\u4ED6\u9644\u52A0\u903B\u8F91\u4EE3\u7801
        //          }
        //      });
        onLoadSuccess: onLoadSuccess,

        //  \u8986\u76D6 easyui-datagrid \u7684\u539F\u751F\u5C5E\u6027\u4E8B\u4EF6 onResizeColumn\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        //  \u6CE8\u610F\uFF1A\u5982\u679C\u8C03\u7528\u8005\u9700\u8981\u5728\u81EA\u5DF1\u7684\u4EE3\u7801\u4E2D\u4F7F\u7528\u8BE5\u4E8B\u4EF6\uFF0C\u8BF7\u4EE5\u8986\u76D6\u65B9\u5F0F\u91CD\u5199\uFF0C\u800C\u975E\u76F4\u63A5\u91CD\u5199\u3002
        //  \u8986\u76D6\u65B9\u5F0F\u91CD\u5199\u793A\u4F8B\uFF1A
        //      grid.datagrid({
        //          onResizeColumn: function(data) {
        //              $.fn.datagrid.extensions.onResizeColumn.apply(this, arguments);  //\u8FD9\u53E5\u4E00\u5B9A\u8981\u52A0\u4E0A\u3002
        //              ...                                     //\u8FD9\u91CC\u662F\u8C03\u7528\u8005\u7684\u5176\u4ED6\u9644\u52A0\u903B\u8F91\u4EE3\u7801
        //          }
        //      });
        onResizeColumn: onResizeColumn,

        //  \u8986\u76D6 easyui-datagrid \u7684\u539F\u751F\u5C5E\u6027\u4E8B\u4EF6 onBeforeEdit\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        onBeforeEdit: onBeforeEdit,

        //  \u8986\u76D6 easyui-datagrid \u7684\u539F\u751F\u5C5E\u6027\u4E8B\u4EF6 onAfterEdit\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        //  \u6CE8\u610F\uFF1A\u5982\u679C\u8C03\u7528\u8005\u9700\u8981\u5728\u81EA\u5DF1\u7684\u4EE3\u7801\u4E2D\u4F7F\u7528\u8BE5\u4E8B\u4EF6\uFF0C\u8BF7\u4EE5\u8986\u76D6\u65B9\u5F0F\u91CD\u5199\uFF0C\u800C\u975E\u76F4\u63A5\u91CD\u5199\u3002
        //  \u8986\u76D6\u65B9\u5F0F\u91CD\u5199\u793A\u4F8B\uFF1A
        //      grid.datagrid({
        //          onAfterEdit: function(data) {
        //              $.fn.datagrid.extensions.onAfterEdit.apply(this, arguments);  //\u8FD9\u53E5\u4E00\u5B9A\u8981\u52A0\u4E0A\u3002
        //              ...                                     //\u8FD9\u91CC\u662F\u8C03\u7528\u8005\u7684\u5176\u4ED6\u9644\u52A0\u903B\u8F91\u4EE3\u7801
        //          }
        //      });
        onAfterEdit: onAfterEdit,

        //  \u8986\u76D6 easyui-datagrid \u7684\u539F\u751F\u5C5E\u6027\u4E8B\u4EF6 onCancelEdit\uFF0C\u4EE5\u652F\u6301\u76F8\u5E94\u6269\u5C55\u529F\u80FD\u3002
        onCancelEdit: onCancelEdit,

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5220\u9664\u6307\u5B9A\u7684\u5217\u524D\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      field:  \u8868\u793A\u8981\u88AB\u5220\u9664\u7684\u5217\u7684 field \u503C\u3002
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u4E0D\u8FDB\u884C\u5220\u9664\u5217\u7684\u64CD\u4F5C\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onBeforeDeleteColumn: function (field) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5220\u9664\u6307\u5B9A\u7684\u5217\u540E\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      field:  \u8868\u793A\u8981\u88AB\u5220\u9664\u7684\u5217\u7684 field \u503C\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onDeleteColumn: function (field) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u79FB\u52A8\u6307\u5B9A\u7684\u5217\u524D\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      source:  \u8868\u793A\u8981\u88AB\u79FB\u52A8\u7684\u5217\u7684 field \u503C\u3002
        //      target:  \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u7684\u5217\u7684 field \u503C\u3002
        //      point :  \u8868\u793A\u79FB\u52A8\u7684\u65B9\u5F0F\uFF1B\u8FD9\u662F\u4E00\u4E2A String \u7C7B\u578B\u503C\uFF0C\u53EF\u80FD\u7684\u503C\u5305\u62EC\uFF1A
        //          "before":   \u8868\u793A\u5C06\u5217 source \u79FB\u52A8\u81F3\u5217 target \u7684\u524D\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //          "after" :   \u8868\u793A\u5C06\u5217 source \u79FB\u52A8\u81F3\u5217 target \u7684\u540E\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u4E0D\u8FDB\u884C\u5220\u9664\u5217\u7684\u64CD\u4F5C\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onBeforeMoveColumn: function (source, target, point) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u79FB\u52A8\u6307\u5B9A\u7684\u5217\u540E\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      source:  \u8868\u793A\u8981\u88AB\u79FB\u52A8\u7684\u5217\u7684 field \u503C\u3002
        //      target:  \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u7684\u5217\u7684 field \u503C\u3002
        //      point :  \u8868\u793A\u79FB\u52A8\u7684\u65B9\u5F0F\uFF1B\u8FD9\u662F\u4E00\u4E2A String \u7C7B\u578B\u503C\uFF0C\u53EF\u80FD\u7684\u503C\u5305\u62EC\uFF1A
        //          "before":   \u8868\u793A\u5C06\u5217 source \u79FB\u52A8\u81F3\u5217 target \u7684\u524D\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //          "after" :   \u8868\u793A\u5C06\u5217 source \u79FB\u52A8\u81F3\u5217 target \u7684\u540E\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onMoveColumn: function (source, target, point) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u79FB\u52A8 data-row(\u6570\u636E\u884C) \u4E4B\u524D\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E09\u4E2A\u53C2\u6570\uFF1A
        //      target: \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u7684 data-row(\u6570\u636E\u884C) \u7D22\u5F15\u53F7(\u4ECE 0 \u5F00\u59CB\u8BA1\u6570)\uFF1B
        //      source: \u8868\u793A\u8981\u79FB\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7D22\u5F15\u53F7(\u4ECE 0 \u5F00\u59CB\u8BA1\u6570)\uFF1B
        //      point:  \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u80FD\u7684\u503C\u5305\u62EC\uFF1A
        //          "top":      \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u4F4D\u7F6E target \u7684\u4E0A\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //          "bottom":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u4F4D\u7F6E target \u7684\u4E0B\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5982\u679C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u4F1A\u7ACB\u5373\u505C\u6B62\u79FB\u52A8\u6570\u636E\u884C\u64CD\u4F5C\uFF1B
        onBeforeDrop: function (target, source, point) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u79FB\u52A8 data-row(\u6570\u636E\u884C) \u4E4B\u540E\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E09\u4E2A\u53C2\u6570\uFF1A
        //      target: \u8868\u793A\u76EE\u6807\u4F4D\u7F6E\u7684 data-row(\u6570\u636E\u884C) \u7D22\u5F15\u53F7(\u4ECE 0 \u5F00\u59CB\u8BA1\u6570)\uFF1B
        //      source: \u8868\u793A\u8981\u79FB\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7D22\u5F15\u53F7(\u4ECE 0 \u5F00\u59CB\u8BA1\u6570)\uFF1B
        //      point:  \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u8282\u70B9 target \u7684\u4F4D\u7F6E\uFF0CString \u7C7B\u578B\uFF0C\u53EF\u80FD\u7684\u503C\u5305\u62EC\uFF1A
        //          "top":      \u8868\u793A\u79FB\u52A8\u5230\u76EE\u6807\u4F4D\u7F6E target \u7684\u4E0A\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //          "bottom":   \u8868\u793A\u8FFD\u52A0\u4E3A\u76EE\u6807\u4F4D\u7F6E target \u7684\u4E0B\u4E00\u683C\u4F4D\u7F6E\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onDrop: function (target, source, point) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u62D6\u52A8 data-row(\u6570\u636E\u884C) \u4E4B\u524D\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      index:  \u8868\u793A\u88AB\u62D6\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF1B
        //      row:    \u8868\u793A\u88AB\u62D6\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u53D6\u6D88\u5F53\u524D\u7684\u62D6\u52A8 data-row(\u6570\u636E\u884C) \u64CD\u4F5C\u3002
        onBeforeDrag: function (index, row) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5F00\u59CB\u62D6\u52A8 data-row(\u6570\u636E\u884C) \u65F6\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      index:  \u8868\u793A\u88AB\u62D6\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF1B
        //      row:    \u8868\u793A\u88AB\u62D6\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onStartDrag: function (index, row) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u7ED3\u675F\u62D6\u52A8 data-row(\u6570\u636E\u884C) \u65F6\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      index:  \u8868\u793A\u88AB\u62D6\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF1B
        //      row:    \u8868\u793A\u88AB\u62D6\u52A8\u7684 data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onStopDrag: function (index, row) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5F53\u6709\u5176\u4ED6\u7684 data-row(\u6570\u636E\u884C) \u88AB\u62D6\u52A8\u81F3\u5F53\u524D data-row(\u6570\u636E\u884C) \u65F6\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      target: \u8868\u793A\u5F53\u524D data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\uFF1B
        //      source: \u8868\u793A\u62D6\u52A8\u8FC7\u6765\u7684 data-row(\u6570\u636E\u884C) \u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u7ACB\u5373\u53D6\u6D88\u5F53\u524D\u7684 data-row(\u6570\u636E\u884C) \u63A5\u6536\u62D6\u52A8\u8FC7\u6765\u5BF9\u8C61\u7684\u64CD\u4F5C\uFF0C\u5E76\u7981\u7528\u5F53\u524D data-row(\u6570\u636E\u884C) \u7684 droppable \u6548\u679C\uFF1B
        onDragEnter: function (target, source) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5F53\u6709\u5176\u4ED6\u7684 data-row(\u6570\u636E\u884C) \u88AB\u62D6\u52A8\u81F3\u5F53\u524D data-row(\u6570\u636E\u884C) \u540E\u5E76\u5728\u4E0A\u9762\u79FB\u52A8\u65F6\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      target: \u8868\u793A\u5F53\u524D data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\uFF1B
        //      source: \u8868\u793A\u62D6\u52A8\u8FC7\u6765\u7684 data-row(\u6570\u636E\u884C) \u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u7ACB\u5373\u53D6\u6D88\u5F53\u524D\u7684 data-row(\u6570\u636E\u884C) \u63A5\u6536\u62D6\u52A8\u8FC7\u6765\u5BF9\u8C61\u7684\u64CD\u4F5C\uFF0C\u5E76\u7981\u7528\u5F53\u524D data-row(\u6570\u636E\u884C) \u7684 droppable \u6548\u679C\uFF1B
        onDragOver: function (target, source) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u5F53\u6709\u5176\u4ED6\u7684 data-row(\u6570\u636E\u884C) \u88AB\u62D6\u52A8\u81F3\u5F53\u524D data-row(\u6570\u636E\u884C) \u540E\u5E76\u62D6\u52A8\u79BB\u5F00\u65F6\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      target: \u8868\u793A\u5F53\u524D data-row(\u6570\u636E\u884C) \u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\uFF1B
        //      source: \u8868\u793A\u62D6\u52A8\u8FC7\u6765\u7684 data-row(\u6570\u636E\u884C) \u884C\u6570\u636E\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A JSON-Object\u3002
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datagrid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onDragLeave: function (target, source) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C updateRow \u65B9\u6CD5\u524D\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      index:  \u8868\u793A\u8981\u8FDB\u884C updateRow \u7684\u884C\u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF1B
        //      row:    \u8868\u793A\u8981\u8FDB\u884C\u66F4\u65B0\u64CD\u4F5C\u7684\u65B0\u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datarid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u7ACB\u5373\u53D6\u6D88\u5373\u5C06\u8981\u6267\u884C\u7684 updateRow \u64CD\u4F5C\u3002
        onBeforeUpdateRow: function (index, row) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C updateRow \u65B9\u6CD5\u540E\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      index:  \u8868\u793A\u8981\u8FDB\u884C updateRow \u7684\u884C\u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF1B
        //      row:    \u8868\u793A\u8981\u8FDB\u884C\u66F4\u65B0\u64CD\u4F5C\u7684\u65B0\u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datarid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onUpdateRow: function (index, row) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C appendRow \u65B9\u6CD5\u524D\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      row:    \u8868\u793A\u8981\u8FDB\u884C\u6DFB\u52A0\u884C\u64CD\u4F5C\u7684\u65B0\u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datarid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u7ACB\u5373\u53D6\u6D88\u5373\u5C06\u8981\u6267\u884C\u7684 appendRow \u64CD\u4F5C\u3002
        onBeforeAppendRow: function (row) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C appendRow \u65B9\u6CD5\u540E\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u53C2\u6570\uFF1A
        //      row:    \u8868\u793A\u8981\u8FDB\u884C\u6DFB\u52A0\u884C\u64CD\u4F5C\u7684\u65B0\u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datarid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onAppendRow: function (row) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C insertRow \u65B9\u6CD5\u524D\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      index:  \u8868\u793A\u8981\u8FDB\u884C insertRow \u7684\u884C\u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF1B
        //      row:    \u8868\u793A\u8981\u8FDB\u884C\u63D2\u5165\u884C\u64CD\u4F5C\u7684\u65B0\u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datarid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        //  \u5907\u6CE8\uFF1A\u5982\u679C\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE false\uFF0C\u5219\u7ACB\u5373\u53D6\u6D88\u5373\u5C06\u8981\u6267\u884C\u7684 insertRow \u64CD\u4F5C\u3002
        onBeforeInsertRow: function (index, row) { },

        //  \u6269\u5C55 easyui-datagrid \u7684\u81EA\u5B9A\u4E49\u4E8B\u4EF6\uFF1B\u8BE5\u4E8B\u4EF6\u8868\u793A\u6267\u884C insertRow \u65B9\u6CD5\u540E\u6240\u89E6\u53D1\u7684\u52A8\u4F5C\uFF1B\u8BE5\u4E8B\u4EF6\u56DE\u8C03\u51FD\u6570\u63D0\u4F9B\u5982\u4E0B\u4E24\u4E2A\u53C2\u6570\uFF1A
        //      index:  \u8868\u793A\u8981\u8FDB\u884C insertRow \u7684\u884C\u7684\u7D22\u5F15\u53F7\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\uFF1B
        //      row:    \u8868\u793A\u8981\u8FDB\u884C\u63D2\u5165\u884C\u64CD\u4F5C\u7684\u65B0\u7684\u884C\u6570\u636E\u5BF9\u8C61\uFF1B
        //  \u8BE5\u4E8B\u4EF6\u51FD\u6570\u4E2D\u7684 this \u6307\u5411\u5F53\u524D easyui-datarid \u7684 DOM \u5BF9\u8C61(\u975E jQuery \u5BF9\u8C61)\uFF1B
        onBeforeRow: function (index, row) { }
    };

    //  \u53E6\uFF0C\u589E\u52A0\u4E86 easyui-datagrid \u4E2D\u5217 columnOption \u7684\u90E8\u5206\u81EA\u5B9A\u4E49\u6269\u5C55\u5C5E\u6027\uFF1A
    //      tooltip:    \u53EF\u4EE5\u662F\u4E00\u4E2A Boolean \u7C7B\u578B\uFF0C\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A\u56DE\u8C03\u51FD\u6570\u7C7B\u578B\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u8BE5\u5217\u7684 tooptip \u6548\u679C\uFF1B
    //          \u5982\u679C\u8BE5\u5C5E\u6027\u4E3A Boolean \u7C7B\u578B\uFF0C\u8868\u793A\u662F\u5426\u542F\u7528\u8BE5\u5217\u7684 tooltip\uFF1B
    //          \u5982\u679C\u8BE5\u5C5E\u6027\u4E3A Function \u7C7B\u578B\uFF0C\u5219\u5176\u683C\u5F0F\u4E3A function (value, rowIndex, rowData)\uFF0C\u8868\u793A\u4E3A\u8BE5\u5217\u542F\u7528 tooltip \u7684\u65B9\u5F0F\uFF1B
    //              \u8BE5\u56DE\u8C03\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A String \u7C7B\u578B\u503C\uFF0C\u8868\u793A tooltip \u7684 content \u5185\u5BB9\u3002
    //          \u9ED8\u8BA4\u4E3A Boolean \u7C7B\u578B\u503C\u4E3A false\u3002
    //      filterable: Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B\u8868\u793A\u662F\u5426\u7981\u7528\u8BE5\u5217\u53F3\u952E\u83DC\u5355\u4E2D\u7684 "\u8FC7\u6EE4/\u663E\u793A" \u83DC\u5355\uFF1B
    //      hidable:    Boolean \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A true\uFF1B\u8868\u793A\u8BE5\u5217\u662F\u5426\u53EF\u9690\u85CF\u3002
    //      filter:     String \u7C7B\u578B\uFF1B\u8868\u793A\u8BE5\u5217\u7684\u8FC7\u6EE4\u5668\u7EC4\u4EF6\u7684\u7C7B\u578B\uFF1B\u53EF\u9009\u7684\u503C\u9650\u5B9A\u5728\u4EE5\u4E0B\u8303\u56F4\uFF1A
    //          "none":     \u8868\u793A\u8FC7\u6EE4\u5668\u4E3A\u7A7A\uFF0C\u5373\u8BE5\u5217\u65E0\u8FC7\u6EE4\u5668\u6548\u679C\u3002
    //          "checkbox": \u8868\u793A\u8FC7\u6EE4\u5668\u7684\u7C7B\u578B\u4E3A\u4E00\u7EC4 checkbox \u590D\u9009\u6846\uFF0C\u9ED8\u8BA4\u503C\u3002
    //          "livebox":  \u8868\u793A\u8FC7\u6EE4\u5668\u7684\u7C7B\u578B\u4E3A\u6A21\u7CCA\u67E5\u8BE2\u8FC7\u6EE4\u65B9\u5F0F\uFF1B\u5373\u8FC7\u6EE4\u5668\u7EC4\u4EF6\u4E3A\u4E00\u4E2A\u8F93\u5165\u6846\uFF0C\u6539\u53D8\u8BE5\u8F93\u5165\u6846\u7684\u503C\u540E\uFF0C\u5BF9\u8BE5\u5217\u8FDB\u884C\u6309\u8F93\u5165\u503C\u7684\u8FC7\u6EE4\u5339\u914D\u3002
    //          "caps":     \u8868\u793A\u8FC7\u6EE4\u5668\u7684\u7C7B\u578B\u4E3A slider \u62D6\u52A8\u6761\u63A7\u4EF6\uFF0C\u4E14\u8FC7\u6EE4\u7684\u7ED3\u679C\u4E3A\u53EA\u663E\u793A\u5C0F\u4E8E\u6216\u7B49\u4E8E slider \u9009\u5B9A\u7684\u503C\uFF1B\u53EA\u6709\u8BE5\u5217\u5168\u90E8\u4E3A\u6570\u503C\u6570\u636E\u65F6\uFF0C\u624D\u80FD\u8BBE\u7F6E\u4E3A\u8BE5\u7C7B\u578B\u3002
    //          "lower":    \u8868\u793A\u8FC7\u6EE4\u5668\u7684\u7C7B\u578B\u4E3A slider \u62D6\u52A8\u6761\u63A7\u4EF6\uFF0C\u4E14\u8FC7\u6EE4\u7684\u7ED3\u679C\u4E3A\u53EA\u663E\u793A\u5927\u4E8E\u6216\u7B49\u4E8E slider \u9009\u5B9A\u7684\u503C\uFF1B\u53EA\u6709\u8BE5\u5217\u5168\u90E8\u4E3A\u6570\u503C\u6570\u636E\u65F6\uFF0C\u624D\u80FD\u8BBE\u7F6E\u4E3A\u8BE5\u7C7B\u578B\u3002
    //      precision:  Number \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A 1\uFF1B\u8868\u793A\u8FC7\u6EE4\u5668\u7C7B\u578B(filter)\u4E3A caps \u6216 lower \u65F6\u5019\uFF0Cslider \u7EC4\u5408\u63A7\u4EF6\u7684\u8F93\u5165\u6846\u7684\u6539\u53D8\u503C\u7684\u7CBE\u5EA6(\u4FDD\u7559\u7684\u5C0F\u6570\u4F4D\u6570)\u3002
    //      step:       Number \u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A 1\uFF1B\u8868\u793A\u8FC7\u6EE4\u5668\u7C7B\u578B(filter)\u4E3A caps \u6216 lower \u65F6\u5019\uFF0C\u79FB\u52A8 slider \u63A7\u4EF6\u65F6\u503C\u7684\u6539\u53D8\u503C\u7684\u7CBE\u5EA6(\u6700\u5C0F\u6539\u53D8\u7684\u523B\u5EA6)\u3002
    //
    //  \u5907\u6CE8\uFF1A \u5F53 filterable \u7684\u503C\u8BBE\u7F6E\u4E3A true \u65F6\uFF0C\u53C2\u6570 filter \u65B9\u6709\u6548\uFF1B
    //         \u5F53 filterable \u7684\u503C\u8BBE\u7F6E\u4E3A true \u4E14 filter \u7684\u503C\u4E3A "caps" \u6216 "lower" \u65F6\uFF0C\u53C2\u6570 precision \u548C step \u65B9\u6709\u6548\u3002

    $.extend($.fn.datagrid.defaults, defaults);
    $.extend($.fn.datagrid.methods, methods);

    //  \u589E\u52A0\u6269\u5C55\u63D2\u4EF6\u4E2D\u8981\u7528\u5230\u7684\u81EA\u5B9A\u4E49\u6837\u5F0F
    var css =
        ".datagrid-rowediting-panel { position: absolute; display: block; border: 1px solid #ddd; padding: 5px 5px; }" +
        ".datagrid-body td.datagrid-header-cell-top { border-top-color: red; border-top-width: 2px; border-top-style: dotted; }" +
        ".datagrid-body td.datagrid-header-cell-bottom { border-bottom-color: red; border-bottom-width: 2px; border-bottom-style: dotted; }" +
        ".datagrid-cell-hightlight { font-weight: bold; background-color: Yellow; }" +
        ".datagrid-header-cell-arrow { float: right; cursor: pointer; border-left-style: dotted; display: none; border-left-width: 0px; }" +
        ".datagrid-header-cell-arrow-show { display: inline; border-left-width: 1px; }" +
        ".datagrid-header-filter { text-align: center; overflow: auto; }" +
        ".datagrid-header-filter-top { vertical-align: top; }" +
        ".datagrid-header-filter-bottom { vertical-align: bottom; }" +
        ".datagrid-header-filter-cell { white-space: nowrap; }" +
        ".datagrid-header-filter-line { border-width: 0px; border-top-width: 1px; border-style: dotted; border-color: #ccc; margin-top: 3px; margin-bottom: 3px; }" +
        ".datagrid-header-filter-container { padding-top: 5px; overflow: auto; font-size: 11px; text-align: left; }" +
        ".datagrid-header-filter-livebox-text { margin-left: 10px; margin-top: 10px; overflow: auto; font-size: 11px; text-align: left; }" +
        ".datagrid-header-filter-livebox { margin-left: 10px; width: 60px; height: 12px; font-size: 11px; }" +
        ".datagrid-header-filter-item { overflow: hidden; padding: 0px; margin: 0px; cursor: pointer; white-space: nowrap; margin: 2px; }" +
        ".datagrid-header-filter-item:hover { filter: alpha(opacity=60); opacity: 0.6; }" +
        ".datagrid-header-filter-item-text { padding-left: 20px; float: left; }" +
        ".datagrid-header-filter-item-icon { left: 2px; top: 50%; width: 16px; height: 16px; margin-top: -3px; }" +
        ".datagrid-header-filter-itemwrap { overflow: hidden; padding-left: 5px; white-space: nowrap; height: 20px; }" +
        ".datagrid-header-filter-slider { }" +
        ".datagrid-header-filter-sliderwrap { overflow: hidden; padding-left: 30px; padding-top: 15px; }" +
        ".datagrid-header-filter-sliderwrap .slider-rulelabel span { font-size: 11px; }" +
        ".datagrid-header-filter-numeric { width: 60px; height: 12px; font-size: 11px; }"
    $.util.addCss(css);
})(jQuery);

