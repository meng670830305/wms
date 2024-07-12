JQEUI.extend(JQEUI, {
    download: function (url, data) {
        if (typeof (data) === "string" && data.length > 0) {
            $.error("data must not be serialized");
        }
        var method = ($.browser.mozilla || $.browser.msie) ? "get" : method || "post";
        var form = $("<form></form>"),
            iframe = $("#___dowmload");
        if (iframe.length == 0) { //onload='erp.downloadHook()'
            $("<div style='display:none'><iframe src='javascript:false;' style='display:none' id='___dowmload' name='___dowmload' ></iframe><div>").appendTo($("body"));
            iframe = $("#___dowmload");
            iframe.contents().find("header").append("<base target='_blank'>");

        }
        if (method[0] = 'p') {
            $("<input type='hidden' value='IFrame' name='X-Requested-With' />").appendTo(form);
            $("<input type='hidden' name='X-HTTP-Accept'>").attr("value", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8").appendTo(form);
        }
        $.each(data || {}, function (name, value) {
            if ($.isPlainObject(value)) {
                name = value.name;
                value = value.value;
            }
            $("<input type='hidden' />").attr({name: name, value: value}).appendTo(form);
        });
        iframe.contents().find("body").html(form);
        iframe.load(function () {
            var response = iframe.contents();
            try {
                response = $.parseJSON(response.html());
                if (!response) response = _errorFormat();

            } catch (e) {
                var text = response.find("title").text();
                if (text.length > 1) {
                    erp.showError(text);
                }
            }
            iframe.unbind('load');
            setTimeout(function () {
                iframe.contents().html('');
            }, 1);
        });
        form.attr({"action": url, "method": method});
        form[0].submit();
    },
    export: function (url, fileName) {
        fetch(url).then(function (res) {
            res.blob().then(function (blob) {
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            });
        });
    }
});