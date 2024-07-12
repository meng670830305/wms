package jp.com.module;

import org.apache.commons.lang3.StringUtils;

/**
 * <pre>
 * 网站端页面分页对象
 * </pre>
 *
 * @author wangyunpeng
 * @date 2020/11/7 13:48
 */
public class PagerModel {
    private int PAGE_COUNT = 0;
    private int PAGE_INDEX = 0;
    private String PAGE_URL_PATH = "";
    private String PAGE_URL_PARAMETER = "";

    public PagerModel() {
    }

    public PagerModel(int pageCount, int pageIndex, String pageUrlPath, String pageUrlParameter) {
        this.PAGE_COUNT = pageCount;
        this.PAGE_INDEX = pageIndex;
        this.PAGE_URL_PATH = pageUrlPath;
        if (StringUtils.isNotEmpty(pageUrlParameter) && !pageUrlParameter.startsWith("&")) {
            pageUrlParameter = "&" + pageUrlParameter;
        }
        this.PAGE_URL_PARAMETER = pageUrlParameter;
    }

    public int getPAGE_COUNT() {
        return PAGE_COUNT;
    }

    public void setPAGE_COUNT(int pageCount) {
        this.PAGE_COUNT = pageCount;
    }

    public int getPAGE_INDEX() {
        return PAGE_INDEX;
    }

    public void setPAGE_INDEX(int pageIndex) {
        this.PAGE_INDEX = pageIndex;
    }

    public String getPAGE_URL_PATH() {
        return PAGE_URL_PATH;
    }

    public void setPAGE_URL_PATH(String pageUrlPath) {
        this.PAGE_URL_PATH = pageUrlPath;
    }

    public String getPAGE_URL_PARAMETER() {
        return PAGE_URL_PARAMETER;
    }

    public void setPAGE_URL_PARAMETER(String pageUrlParameter) {
        this.PAGE_URL_PARAMETER = PAGE_URL_PARAMETER;
    }

}