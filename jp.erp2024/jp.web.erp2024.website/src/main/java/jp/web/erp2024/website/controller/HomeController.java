package jp.web.erp2024.website.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jp.com.helper.Date8Helper;
import jp.com.helper.Guid;
import jp.com.helper.Lambda;
import jp.com.module.TreeData;
import jp.db.erp2024.pojo.Account_permission;
import jp.db.erp2024.service.MenuService;
import jp.web.erp2024.website.config.security.AuthUser;
import jp.web.erp2024.website.config.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Predicate;

@Controller
@RequestMapping(HomeController.CONTROLLER_NAME)
public class HomeController extends BaseController {

    public static final String CONTROLLER_NAME = "/Home";

    @Override
    protected String getViewName(String viewName) {
        return super.getFullViewName(CONTROLLER_NAME, viewName);
    }

    @Value("${WEB_SITE_NAME}")
    private String WEB_SITE_NAME;

    @Autowired
    private MenuService menuService;

    @RequestMapping(value = {"Index"}, method = RequestMethod.GET)
    public ModelAndView index() {
        AuthUser authUser = SecurityUtil.getLoginUser();
        if (authUser != null) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("WEB_SITE_NAME", WEB_SITE_NAME);
            return new ModelAndView(this.getViewName("Index"), map);
        } else {
            return new ModelAndView("redirect:/Auth/Login");
        }
    }

    @RequestMapping(value = "Welcome", method = RequestMethod.GET)
    public ModelAndView welcome(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView modelAndView = null;
        AuthUser authUser = SecurityUtil.getLoginUser();
        if (authUser != null) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("WEB_SITE_NAME", WEB_SITE_NAME);
            map.put(BaseController.MODEL, authUser);
            modelAndView = new ModelAndView(this.getViewName("Welcome"), map);
        } else {
            modelAndView = new ModelAndView("redirect:/Auth/Login");
        }
        return modelAndView;
    }

    @RequestMapping(value = "GetMenuData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String getMenuData(HttpServletRequest request, HttpServletResponse response) throws Exception {
        AuthUser authUser = SecurityUtil.getLoginUser();
        Integer userID = authUser.getID();
        LocalDateTime time = Date8Helper.now();
        List<Account_permission> accountPermissionResultList = this.menuService.getUserPermissionList(userID, time);
        final String EMPTY = Guid.empty();
        TreeData treeRoot = new TreeData();
        treeRoot.id = EMPTY;
        treeRoot.iconCls = "icon-home";
        treeRoot.state = "open";
        treeRoot.text = WEB_SITE_NAME;
        treeRoot.children = new ArrayList<TreeData>();
        buildMenu(accountPermissionResultList, item -> EMPTY.equals(item.getParentid()) && Integer.valueOf(1).equals(item.getCanmenu()), treeRoot);
        TreeData[] treeDatas = new TreeData[]{treeRoot};
        return super.json(treeDatas);
    }

    private void buildMenu(List<Account_permission> list, Predicate<Account_permission> func, TreeData tree) {
        List<Account_permission> resultList = Lambda.where(list, func);
        resultList = Lambda.orderBy(resultList, new Comparator<Account_permission>() {
            public int compare(Account_permission arg0, Account_permission arg1) {
                return arg0.getSort().compareTo(arg1.getSort());
            }
        });
        TreeData treeData = null;
        for (final Account_permission account_permission : resultList) {
            treeData = new TreeData();
            treeData.id = account_permission.getId();
            treeData.iconCls = account_permission.getIcon();
            treeData.state = "open";
            treeData.text = account_permission.getName();
            treeData.children = new ArrayList<TreeData>();
            treeData.attributes = account_permission.getHref();
            buildMenu(list, item -> item.getParentid().equals(account_permission.getId()) && Integer.valueOf(1).equals(item.getCanmenu()), treeData);
            tree.children.add(treeData);
        }
    }
}
