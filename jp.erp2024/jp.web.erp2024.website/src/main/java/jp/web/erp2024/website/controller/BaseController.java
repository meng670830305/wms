package jp.web.erp2024.website.controller;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import jp.com.helper.Date8Helper;
import jp.com.helper.LoggerHelper;
import jp.com.module.HtmlHelper;
import jp.com.module.JsonManager;
import jp.db.erp2024.pojo.IEntity;
import jp.web.erp2024.website.config.exception.ValidatorException;
import jp.web.erp2024.website.config.security.AuthUser;
import jp.web.erp2024.website.config.security.PermissionContext;
import jp.web.erp2024.website.config.util.SecurityUtil;
import jp.web.erp2024.website.config.util.ValidatorUtil;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AccountExpiredException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public abstract class BaseController {

    private final org.slf4j.Logger _logger = org.slf4j.LoggerFactory.getLogger(this.getClass());
    /**
     * 在thymeleaf中，使用jQuery EasyUI DataGrid过滤数据的关键字
     */
    protected static final String FILTER_DATA = "FILTER_DATA";
    /**
     * 在thymeleaf中，使用对象模型过滤数据的关键字
     */
    protected static final String MODEL = "MODEL";

    /**
     * 在thymeleaf中，使用对象模型列表数据的关键字
     */
    protected static final String LIST = "LIST";

    /**
     * 在thymeleaf中，使用对象模型字典数据的关键字
     */
    protected static final String MAP = "MAP";

    protected static final String PERMISSION_CONTEXT = "PERMISSION_CONTEXT";

    protected static final String PERMISSIONS = "PERMISSIONS";

    protected static final String HTML_HELPER = "HTML_HELPER";

    protected static final String E_STATE = "E_STATE";

    private final AccountExpiredException accountExpiredException = new AccountExpiredException("用户长时间未操作,请重新登录!");

    @Resource
    protected PermissionContext permissionContext;

    protected HtmlHelper htmlHelper = new HtmlHelper();

    protected abstract String getViewName(String viewName);

    protected String getFullViewName(String... viewNames) {
        return this.combineViewPath(viewNames);
    }

    private String combineViewPath(String... paths) {
        final String DirectorySeparatorCharJar = "/";
        String path = null;
        int length = paths.length;
        List<String> pathList = new ArrayList<>(length);
        for (int i = 0; i < length; i++) {
            path = paths[i];
            int lastIndex = path.lastIndexOf(DirectorySeparatorCharJar);
            if (lastIndex == path.length() - 1) {
                path = path.substring(0, lastIndex);
            }
            if (0 == path.indexOf(DirectorySeparatorCharJar)) {
                path = path.substring(1);
            }
            pathList.add(path);
        }
        return StringUtils.join(pathList.toArray(), DirectorySeparatorCharJar);
    }

    protected void insertEntityInfo(IEntity entity) {
        LocalDateTime now = Date8Helper.now();
        entity.setCreatetime(now);
        entity.setUpdatetime(now);
        AuthUser authUser = SecurityUtil.getLoginUser();
        if (authUser == null) {
            throw this.accountExpiredException;
        } else {
            entity.setUpdateusername(authUser.getRealName());
            entity.setCreateusername(authUser.getRealName());
        }
        this.validatorModel(entity);
    }

    protected void updateEntityInfo(IEntity entity) {
        entity.setUpdatetime(Date8Helper.now());
        AuthUser authUser = SecurityUtil.getLoginUser();
        if (authUser == null) {
            throw this.accountExpiredException;
        } else {
            entity.setUpdateusername(authUser.getRealName());
        }
        this.validatorModel(entity);
    }


    /**
     * 校验数据类型，实体类型的字段是否符合规范
     *
     * @param objects
     * @param <T>
     */
    protected <T> void validatorModel(T... objects) {
        Map<String, String> validateMap = null;
        for (T object : objects) {
            validateMap = ValidatorUtil.validate(object);
            if (MapUtils.isNotEmpty(validateMap)) {
                // LoggerHelper.error(this._logger, StringUtils.join(validateMap));
                validateMap.forEach((key, value) -> {
                    LoggerHelper.error(this._logger, key + ":" + value);
                });
                throw new ValidatorException(StringUtils.join(validateMap));
            }
        }
    }

    protected String json(Object object) {
        return JsonManager.serialize(object);
    }

    protected String getSuccess() {
        return JsonManager.getSuccess();
    }

    protected String getSuccess(String msg) {
        return JsonManager.getSuccess((Object) null, msg);
    }

    protected String getSuccess(Object data) {
        return JsonManager.getSuccess(data, null);
    }

    protected String getSuccess(Integer totalCount, Object rows) {
        return JsonManager.getSuccess(totalCount, rows);
    }

    protected String getError() {
        return this.getError("保存失敗している!");
    }

    protected String getError(String msg) {
        return this.getError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, msg);
    }

    protected String getError(int code, String msg) {
        return JsonManager.getError(code, msg);
    }

}
