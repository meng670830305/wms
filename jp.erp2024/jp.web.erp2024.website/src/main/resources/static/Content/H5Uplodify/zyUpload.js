
(function($,undefined){
	$.fn.zyUpload = function(options,param){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("zyUpload - No such method: " + options);
			}
		}

		return this.each(function () {
		    // 保留参数
			var para = {};    
			var self = this;  
			
			var defaults = {
					width            : "700px",  					
					height           : "400px",  					
					itemWidth        : "140px",                     
					itemHeight       : "120px",                     
					url: "/upload/UploadAction",					
					multiple         : true,  						
					dragDrop         : true,  						
					del              : true,  						
					finishDel        : false,  						
					/* 提供给外部的接口方法 */
					onSelect         : function(selectFiles){},
					onDelete		 : function(file, files){},     
					onSuccess		 : function(file, responseInfo){},
					onFailure		 : function(file){},            
					onComplete		 : function(responseInfo){},    
			};
			
			para = $.extend(defaults,options);
			
			this.init = function(){
				this.createHtml();  
				this.createCorePlug();  
			};
			
			/**
			 * 功能：创建上传所使用的html
			 * 参数: 无
			 * 返回: 无
			 */
			this.createHtml = function(){
			    // 设置多选的参数
			    var multiple = "";
			    para.multiple ? multiple = "multiple" : multiple = "";
			    var html = '';
			    // 创建不带有拖动的html
			    html += '<form id="uploadForm" action="' + para.url + '" method="post" enctype="multipart/form-data">';
			    html += '		<div class="upload_main single_main">';
			    html += '			<div id="preview" class="upload_preview">';
			    html += '				<div class="add_upload">';
			    html += '				</div>';
			    html += '			</div>';
			    html += '			<div class="status_bar">';
			    html += '				<div class="btns">';
			    html += '					<input id="fileImage" type="file" size="30" name="fileselect[]" ' + multiple + '>';
			    html += '					<div class="upload_btn" id="upload_btn">开始上传</div>';
			    html += '				</div>';
			   
			    html += '			</div>';
			    html += '		</div>';			    
			    html += '		<div class="upload_submit">';
			    html += '			<button type="button" id="fileSubmit" class="upload_submit_btn">确认上传文件</button>';
			    html += '		</div>';
			    html += '<div class="pro" id="pro" style="float:left;"></div><div class="result"></div>';
			    html += '</form>';
			    $("#demo").append(html);
			    // 初始化html之后绑定按钮的点击事件
			    this.addEvent();
			};
			/**
			 * 功能：过滤上传的文件格式等
			 * 参数: files 本次选择的文件
			 * 返回: 通过的文件
			 */
			this.funFilterEligibleFile = function (files) {
			    // 替换的文件数组
				var arrFiles = [];  
				for (var i = 0, file; file = files[i]; i++) {
					if (file.size >= 51200000) {
						alert('您这个"'+ file.name +'"文件大小过大');	
					} else {
						// 在这里需要判断当前所有文件中
						arrFiles.push(file);	
					}
				}
				return arrFiles;
			};
			/**
			 * 功能：调用核心插件
			 * 参数: 无
			 * 返回: 无
			 */
			this.createCorePlug = function () {			   
			    var result = document.getElementsByClassName('result')[0];			    
			    var pro = new progress({
			        //进度条宽度
			        width: 200,
			        //进度条高度
			        height: 10,
			        //背景颜色
			        bgColor: "#3E4E5E",
			        //前景颜色
			        proColor: "grey",
			        //显示字体颜色
			        fontColor: "#FFFFFF",
			        //默认值
			        val: 10,
			        //显示文字信息
			        text: "#*val*#%",
			        showPresent: true,
			        completeCallback: function (val) {
			            console.log('已完成');			            
			        },
			        changeCallback: function (val) {
			            console.log( + val + '%');			           
			        }
			    });
				var params = {
					fileInput: $("#fileImage").get(0),
					uploadInput: $("#upload_btn").get(0),
					dragDrop: $("#fileDragArea").get(0),
					url: $("#uploadForm").attr("action"),					
					filterFile: function(files) {
						// 过滤合格的文件
						return self.funFilterEligibleFile(files);
					},
					onSelect: function (selectFiles) {
						para.onSelect(selectFiles);  						
					},					
					onProgress: function (value, sign) {					    
					    document.getElementsByClassName('pro')[0].appendChild(pro.getBody());
					    setTimeout(function () {
					        pro.update(value);					        
					    }, 1000);						
					},
					onSuccess: function (file, response) {					    
					    response = $.parseJSON(response);
					    if (response.Success) {
					        this.onProgress(100);
					        result.innerHTML = '上传成功';
					        setTimeout(function () {
					            pro.update(0);
					            result.innerHTML = '';
					            $("#pro").hide();
					        }, 2200);
							para.onSuccess(file, response);
						}
					    else {
					        this.onProgress(0);
					        if (response.Message !=null) {
								JQEUI.error(response.Message);
							} else if (response.message !=null) {
								JQEUI.error(response.message);
							} else {
								JQEUI.error("调试看看是哪个属性吧");
							}
					        result.innerHTML = '上传失败';
					        setTimeout(function () {
					            $("#pro").hide();
					            result.innerHTML = '';
					        }, 2200);
							para.onFailure(file);
					    }					   
					},
					onFailure: function (file) {
					    this.onProgress(0);
					    result.innerHTML = '上传失败';
					    setTimeout(function () {
					        $("#pro").hide();
					        result.innerHTML = '';					        
					    }, 3000);
						para.onFailure(file);
					},
					onComplete: function(response){
						console.info(response);
						para.onComplete(response);
					}	
				};
				
				ZYFILE = $.extend(ZYFILE, params);
				ZYFILE.init();
			};
			
			/**
			 * 功能：绑定事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.addEvent = function () {			  
				// 绑定上传点击事件
				$(".upload_btn").bind("click", function(e){
				    $("#fileImage").click();
	            });
			};
			
			
			// 初始化上传控制层插件
			this.init();
		});
	};
})(jQuery);

