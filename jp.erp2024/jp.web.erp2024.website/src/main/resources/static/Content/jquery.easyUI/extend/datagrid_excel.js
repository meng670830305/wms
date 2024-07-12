/**
* Jquery easyui datagrid,treegrid\u652F\u6301js\u5BFC\u51FAexcel\u6570\u636E,\u4FEE\u6539\u81EAextgrid\u5BFC\u51FAexcel. wangyunpeng. 2015-12-09.
* allows for downloading of grid data (store) directly into excel
* Method: extracts data of gridPanel store, uses columnModel to construct XML excel document,
* converts to Base64, then loads everything into a data URL link.
*
* @author Animal <extjs support team>
*
*/
$.extend($.fn.datagrid.methods, {
    getExcelXml: function(jq, param) {
        var worksheet = this.createWorksheet(jq, param);
        return '<?xml version="1.0" encoding="utf-8"?>' +//xml\u7533\u660E\u6709\u95EE\u9898\uFF0C\u4EE5\u4FEE\u6B63\uFF0C\u6CE8\u610F\u662Futf-8\u7F16\u7801\uFF0C\u5982\u679C\u662Fgb2312\uFF0C\u9700\u8981\u4FEE\u6539\u52A8\u6001\u9875\u6587\u4EF6\u7684\u5199\u5165\u7F16\u7801
		        '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office">' +
		        '<o:DocumentProperties><o:Title>' + param.title + '</o:Title></o:DocumentProperties>' +
		        '<ss:ExcelWorkbook>' +
		        '<ss:WindowHeight>' + worksheet.height + '</ss:WindowHeight>' +
		        '<ss:WindowWidth>' + worksheet.width + '</ss:WindowWidth>' +
		        '<ss:ProtectStructure>False</ss:ProtectStructure>' +
		        '<ss:ProtectWindows>False</ss:ProtectWindows>' +
		        '</ss:ExcelWorkbook>' +
		        '<ss:Styles>' +
		        '<ss:Style ss:ID="Default">' +
		        '<ss:Alignment ss:Vertical="Top"  />' +
		        '<ss:Font ss:FontName="arial" ss:Size="10" />' +
		        '<ss:Borders>' +
		        '<ss:Border  ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top" />' +
		        '<ss:Border  ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom" />' +
		        '<ss:Border  ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left" />' +
		        '<ss:Border ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right" />' +
		        '</ss:Borders>' +
		        '<ss:Interior />' +
		        '<ss:NumberFormat />' +
		        '<ss:Protection />' +
		        '</ss:Style>' +
		        '<ss:Style ss:ID="title">' +
		        '<ss:Borders />' +
		        '<ss:Font />' +
		        '<ss:Alignment  ss:Vertical="Center" ss:Horizontal="Center" />' +
		        '<ss:NumberFormat ss:Format="@" />' +
		        '</ss:Style>' +
		        '<ss:Style ss:ID="headercell">' +
		        '<ss:Font ss:Bold="1" ss:Size="10" />' +
		        '<ss:Alignment  ss:Horizontal="Center" />' +
		        '<ss:Interior ss:Pattern="Solid"  />' +
		        '</ss:Style>' +
		        '<ss:Style ss:ID="even">' +
		        '<ss:Interior ss:Pattern="Solid"  />' +
		        '</ss:Style>' +
		        '<ss:Style ss:Parent="even" ss:ID="evendate">' +
		        '<ss:NumberFormat ss:Format="yyyy-mm-dd" />' +
		        '</ss:Style>' +
		        '<ss:Style ss:Parent="even" ss:ID="evenint">' +
		        '<ss:NumberFormat ss:Format="0" />' +
		        '</ss:Style>' +
		        '<ss:Style ss:Parent="even" ss:ID="evenfloat">' +
		        '<ss:NumberFormat ss:Format="0.00" />' +
		        '</ss:Style>' +
		        '<ss:Style ss:ID="odd">' +
		        '<ss:Interior ss:Pattern="Solid"  />' +
		        '</ss:Style>' +
		        '<ss:Style ss:Parent="odd" ss:ID="odddate">' +
		        '<ss:NumberFormat ss:Format="yyyy-mm-dd" />' +
		        '</ss:Style>' +
		        '<ss:Style ss:Parent="odd" ss:ID="oddint">' +
		        '<ss:NumberFormat ss:Format="0" />' +
		        '</ss:Style>' +
		        '<ss:Style ss:Parent="odd" ss:ID="oddfloat">' +
		        '<ss:NumberFormat ss:Format="0.00" />' +
		        '</ss:Style>' +
		        '</ss:Styles>' +
		        worksheet.xml +
		        '</ss:Workbook>';
    },
    getColumn: function(jq, colName) {
    	return $(jq).datagrid('getColumnOption', colName);
    },
    getAllColumns: function (jq) {
    	return Array.union($(jq).datagrid('getColumnFields', true), $(jq).datagrid('getColumnFields'));
    },
    getAllNodes: function(jqTree) {
        return this.getChildNodeList(jqTree, jqTree.treegrid('getRoots'));
    },
    getChildNodeList: function(jqTree, nodes) {
        var childNodeList = [];
        if (nodes && nodes.length > 0) {
            var node = null;
            for (var i = 0; i < nodes.length; i++) {
                childNodeList.push(node = nodes[i]);
                childNodeList = childNodeList.concat(this.getChildNodeList(jqTree, node.children));
            }
        }
        return childNodeList;
    },
    createWorksheet: function(jq, param) {
        // Calculate cell data types and extra class names which affect formatting
        var cellType = [];
        var cellTypeClass = [];
        //var cm = this.getColumnModel();
        var totalWidthInPixels = 0;
        var colXml = '';
        var headerXml = '';
        var visibleColumnCountReduction = 0;
        var cfs = this.getAllColumns(jq);
        var colCount = cfs.length;
        for (var i = 0; i < colCount; i++) {
            if (cfs[i] != '') {
            	var column = this.getColumn(jq, cfs[i]);
            	if (column.hidden) {
            		continue;
            	}
                totalWidthInPixels += column.width;
                if (cfs[i] === "") {
                    cellType.push("None");
                    cellTypeClass.push("");
                    ++visibleColumnCountReduction;
                }
                else {
                    colXml += '<ss:Column ss:AutoFitWidth="1" ss:Width="130" />';
                    headerXml += '<ss:Cell ss:StyleID="headercell">' +
                    			 '<ss:Data ss:Type="String">' + column.title + '</ss:Data>' +
                			 	 '<ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>';
                    cellType.push("String");
                    cellTypeClass.push("");
                }
            }
        }
        var visibleColumnCount = cellType.length - visibleColumnCountReduction;
        var result = {
            height: 9000,
            width: Math.floor(totalWidthInPixels * 30) + 50
        };
        var rows = null;
        if (param.type == "treegrid") {
        	rows = this.getAllNodes($(jq));
        } else if (param.type == "datagrid") {
        	rows = $(jq).datagrid('getRows');
        } else {
        	rows = [];
        }
        // Generate worksheet header details.
        var t = '<ss:Worksheet ss:Name="' + param.title + '">' +
		        '<ss:Names>' +
		        '<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'' + param.title + '\'!R1:R2" />' +
		        '</ss:Names>' +
		        '<ss:Table x:FullRows="1" x:FullColumns="1"' +
		        ' ss:ExpandedColumnCount="' + (visibleColumnCount + 2) +
		        '" ss:ExpandedRowCount="' + (rows.length + 2) + '">' +
		        colXml +
		        '<ss:Row ss:AutoFitHeight="1">' +
		        headerXml +
		        '</ss:Row>';
        // Generate the data rows from the data in the Store
        //for (var i = 0, it = this.store.data.items, l = it.length; i < l; i++) {
        for (var i = 0, it = rows, l = it.length; i < l; i++) {
            t += '<ss:Row>';
            var cellClass = (i & 1) ? 'odd' : 'even';
            r = it[i];
            var k = 0;
            for (var j = 0; j < colCount; j++) {
                if (cfs[j] != '') {
                	if (this.getColumn(jq, cfs[j]).hidden) {
                		continue;
                	}
                    var v = r[cfs[j]];
                    if (cellType[k] !== "None") {
                        t += '<ss:Cell ss:StyleID="' + cellClass + cellTypeClass[k] + '"><ss:Data ss:Type="' + cellType[k] + '">';
                        if (cellType[k] == 'DateTime') {
                            t += v.format('Y-m-d');
                        } else {
                            t += v;
                        }
                        t += '</ss:Data></ss:Cell>';
                    }
                    k++;
                }
            }
            t += '</ss:Row>';
        }
        result.xml = t + '</ss:Table>' +
			        '<x:WorksheetOptions>' +
			        '<x:PageSetup>' +
			        '<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />' +
			        '<x:Footer x:Data="Page &P of &N" x:Margin="0.5" />' +
			        '<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />' +
			        '</x:PageSetup>' +
			        '<x:FitToPage />' +
			        '<x:Print>' +
			        '<x:PrintErrors>Blank</x:PrintErrors>' +
			        '<x:FitWidth>1</x:FitWidth>' +
			        '<x:FitHeight>32767</x:FitHeight>' +
			        '<x:ValidPrinterInfo />' +
			        '<x:VerticalResolution>600</x:VerticalResolution>' +
			        '</x:Print>' +
			        '<x:Selected />' +
			        '<x:DoNotDisplayGridlines />' +
			        '<x:ProtectObjects>False</x:ProtectObjects>' +
			        '<x:ProtectScenarios>False</x:ProtectScenarios>' +
			        '</x:WorksheetOptions>' +
			        '</ss:Worksheet>';
        return result;
    }
});