package jp.web.erp2024.website.controller;

import cn.hutool.core.io.IoUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jp.com.helper.LoggerHelper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.io.InputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
@RequestMapping("/Resources")
public class ResourcesController {
    private final Pattern regex = Pattern.compile("\\.(.*)\\s?\\{", Pattern.MULTILINE);
    private String icons;
    private final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "IconData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String iconData(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (this.icons == null) {
            ClassPathResource classPathResource = new ClassPathResource("static/Content/jquery.easyUI/1.5.1/themes/icon.css");
            if (classPathResource == null) {
                return "[]";
            }
            String iconsText = null;
            try (InputStream inputStream = classPathResource.getInputStream()) {
                iconsText = IoUtil.readUtf8(inputStream);
            } catch (IOException e) {
                LoggerHelper.error(this.logger, e, "ResourcesController.iconData()");
                return "[]";
            }
            // endregion

            StringBuilder sb = new StringBuilder("[{\"text\":\"无\",\"value\":\"\"}");
            if (StringUtils.isNotBlank(iconsText)) {
                Matcher matcher = this.regex.matcher(iconsText);
                String value = null;
                while (matcher.find()) {
                    value = matcher.group(1).trim();
                    sb.append(String.format(",{\"text\":\"%s\",\"value\":\"%s\"}", value, value));
                }
            }
            sb.append("]");
            this.icons = sb.toString();
            sb = null;
        }
        return this.icons;
    }
}
