/*
 * zyFile.js 基于HTML5 文件上传的核心脚本
*/

var ZYFILE = {
        // 选择文件按钮dom对象
        fileInput: null,
        // 上传文件按钮dom对象
        uploadInput: null,
        //拖拽敏感区域
        dragDrop: null,
        // 上传action路径
        url: "",
        // 需要上传的文件数组
        uploadFile: [],
        // 上一次选择的文件数组，方便继续上传使用
        lastUploadFile: [],
        // 存放永久的文件数组，方便删除使用
        perUploadFile: [],
        // 代表文件总个数，因为涉及到继续添加，所以下一次添加需要在它的基础上添加索引
        fileNum: 0,
        /* 提供给外部的接口 */
        // 提供给外部的过滤文件格式等的接口，外部需要把过滤后的文件返回
		filterFile : function(files){ 
			return files;
		},
        // 提供给外部获取选中的文件，供外部实现预览等功能  selectFile:当前选中的文件  allFiles:还没上传的全部文件
		onSelect : function(selectFile){      
			
		},
        // 提供给外部获取删除的单个文件，供外部实现删除效果  file:当前删除的文件  files:删除之后的文件
		onDelete : function(file, files){            
			
		},
        // 提供给外部获取单个文件的上传进度，供外部实现上传进度效果
		onProgress : function(file, loaded, total){  
			
		},
        // 提供给外部获取单个文件上传成功，供外部实现成功效果
		onSuccess : function(file, responseInfo){    
			
		},
        // 提供给外部获取单个文件上传失败，供外部实现失败效果
		onFailure : function(file, responseInfo){    
		
		},
        // 提供给外部获取全部文件上传完成，供外部实现完成效果
		onComplete : function(responseInfo){         
			
		},
		// 获取文件
		funGetFiles: function (e) {
			var self = this;
			// 从事件中获取选中的所有文件
			var files = e.target.files || e.dataTransfer.files;			
			this.uploadFile = this.uploadFile.concat(this.filterFile(files));
					
			// 调用对文件处理的方法
			this.funDealtFiles();
			this.funUploadFiles();
			return true;
		},
		// 处理过滤后的文件，给每个文件设置下标
		funDealtFiles: function () {
			var self = this;
			
			// 执行选择回调
			this.onSelect(this.uploadFile);
			console.info("继续选择");
			console.info(this.uploadFile);
			return this;
		},		
		// 上传多个文件
		funUploadFiles : function(){
		    var self = this; 
		    $.each(this.uploadFile, function (k, v) {
		        $("#pro").show();
				self.funUploadFile(v);
		    });
		    this.uploadFile.length=0;
		},
		// 上传单个个文件
		funUploadFile: function (file) {		    
			var self = this;
			var formdata = new FormData();
			formdata.append("fileList", file);	         		
			var xhr = new XMLHttpRequest();	
		    xhr.upload.addEventListener("progress",	 function(e){		     		        
		        self.onProgress(90);
		    }, false); 		  
		    xhr.addEventListener("load", function(e){	    		
		    
		        self.onSuccess(file, xhr.responseText);		        
		    	if(self.uploadFile.length==0){		    	
		    		self.onComplete("全部完成");
		    	}
		    }, false); 	    
		    xhr.addEventListener("error", function(e){		    
		    	self.onFailure(file, xhr.responseText);
		    }, false);  
			
		    xhr.open("POST", self.url, true);		   
			xhr.setRequestHeader('X-File-Name', unescape(encodeURIComponent(file.name)));
			xhr.send(formdata);
		},	
		
		// 初始化
		init : function(){  
			var self = this; 			
			if(self.fileInput){				
			    this.fileInput.addEventListener("change", function (e) {
					self.funGetFiles(e); 
				}, true);	
			}			
			// 如果上传按钮存在
			//if(self.uploadInput){
			//	// 绑定click事件
			//    this.uploadInput.addEventListener("click", function (e) {			        
			//		self.funUploadFiles(e); 
			//	}, false);	
			//}
		}
};

















