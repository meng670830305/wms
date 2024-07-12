(function (w, $, JQEUI) {
    if (!JQEUI) return;
    JQEUI.extend(JQEUI, {
        megerCell: function(table, colStart, colEnd) {
            if (table == undefined || table == null) {
                return;
            }
            let val, count, start;
            for (let col = colEnd; col >= colStart; col--) {
                count = 1;
                val = "";
                let i = 0;
                for (; i < table.rows.length; i++) {
                    if (col <  table.rows[i].cells.length) {
                        if (val == table.rows[i].cells[col].innerHTML && val != "") {
                            count++;
                        } else {
                            val = table.rows[i].cells[col].innerHTML;
                            if (count > 1) {
                                start = i - count;
                                table.rows[start].cells[col].rowSpan = count;
                                for (var j = start + 1; j < i; j++) {
                                    table.rows[j].removeChild(table.rows[j].cells[col]);
                                }
                                count = 1;
                            }
                        }
                    }
                }
                if (count > 1) {
                    start = i - count;
                    table.rows[start].cells[col].rowSpan = count;
                    for (let j = start + 1; j < i; j++) {
                        table.rows[j].removeChild(table.rows[j].cells[col]);
                    }
                }
            }
        }
    });
})(window, jQuery, JQEUI);