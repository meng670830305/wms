package jp.web.erp2024.website.controller.account;


import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jp.com.filterexpression.EntityResolverAttribute;
import jp.com.filterexpression.IdFieldFilter;
import jp.com.filterexpression.SortBuilder;
import jp.com.filterexpression.SortPart;
import jp.com.helper.Date8Helper;
import jp.com.helper.MapHelper;
import jp.com.helper.TypeParseHelper;
import jp.com.module.PagedResult;
import jp.db.erp2024.datafilter.Account_userDataFilter;
import jp.db.erp2024.datafilter.View_account_usergroupassignDataFilter;
import jp.db.erp2024.datafilter.View_account_userroleassignDataFilter;
import jp.db.erp2024.mapper.Account_userMapper;
import jp.db.erp2024.mapper.View_account_usergroupassignMapper;
import jp.db.erp2024.mapper.View_account_userroleassignMapper;
import jp.db.erp2024.pojo.*;
import jp.db.erp2024.service.*;
import jp.web.erp2024.website.config.event.UserEvent;
import jp.web.erp2024.website.config.security.PermissionAttribute;
import jp.web.erp2024.website.config.security.Permissions;
import jp.web.erp2024.website.config.util.FormCollection;
import jp.web.erp2024.website.controller.BaseController;
import jp.web.erp2024.website.enums.EAccount_UserStatus;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(UserController.CONTROLLER_NAME)
public class UserController extends BaseController {

    public static final String CONTROLLER_NAME = "/Account/User";

    @Override
    protected String getViewName(String viewName) {
        return super.getFullViewName(CONTROLLER_NAME, viewName);
    }

    @Resource
    private ApplicationContext applicationContext;

    @Resource
    private Account_userMapper account_userMapper;
    @Resource
    private Account_userService account_userService;

    @Resource
    private View_account_usergroupassignMapper view_account_usergroupassignMapper;
    @Resource
    private Account_groupService account_groupService;

    @Resource
    private Account_usergroupassignService account_usergroupassignService;
    @Resource
    private Account_roleService account_roleService;

    @Resource
    private View_account_userroleassignMapper view_account_userroleassignMapper;
    @Resource
    private Account_userroleassignService account_userroleassignService;

    // region User
    @RequestMapping(value = "UserList", method = RequestMethod.GET)
    public ModelAndView userList() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        IdFieldFilter<Integer> idFieldFilter = new IdFieldFilter<Integer>();
        idFieldFilter.setSort(SortBuilder.desc(1).getPropriety());
        Account_userDataFilter dataFilter = new Account_userDataFilter();
        dataFilter.setId(idFieldFilter);
        map.put(BaseController.FILTER_DATA, dataFilter);
        map.put("E_ACCOUNT_USER_STATUS", EAccount_UserStatus.class);
        map.putAll(Account_user.get_Final_Fields());
        map.put(BaseController.PERMISSION_CONTEXT, super.permissionContext);
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        map.put("btnAdd", Permissions.权限管理.用户管理.新增用户);
        return new ModelAndView(this.getViewName("UserList"), map);
    }

    @RequestMapping(value = "UserListData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userListData(@EntityResolverAttribute Account_userDataFilter filter) throws Exception {
        PagedResult<Account_user> pagedResult = filter.getPageResult(this.account_userMapper);
        return super.getSuccess(pagedResult.getTotalCount(), pagedResult.getResults());
    }

    @PermissionAttribute(Permissions.权限管理.用户管理.新增用户)
    @RequestMapping(value = "UserAdd", method = RequestMethod.GET)
    public ModelAndView userAdd() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.putAll(Account_user.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("UserAdd"), map);
    }

    @PermissionAttribute(Permissions.权限管理.用户管理.新增用户)
    @RequestMapping(value = "UserAddSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userAddSave(Account_user account_user) throws Exception {
        if (account_user == null) {
            throw new IllegalArgumentException("account_user不能为空!");
        }
        super.insertEntityInfo(account_user);
        if (this.account_userService.createUser(account_user)) {
            //发布自定义用户事件
            UserEvent userEvent = new UserEvent(this, account_user);
            this.applicationContext.publishEvent(userEvent);
            return super.getSuccess();
        } else {
            return super.getError();
        }
    }

    //@PermissionAttribute(Permissions.权限管理.用户管理.编辑用户)
    @RequestMapping(value = "UserEdit/{id}", method = RequestMethod.GET)
    public ModelAndView userEdit(@PathVariable Integer id) throws Exception {
        Account_user account_user = null;
        if (id.intValue() > 0) {
            account_user = this.account_userService.getUser(id);
        } else {
            throw new IllegalArgumentException(String.format("用户ID '%s' 不存在!", id));
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(BaseController.MODEL, account_user);
        map.putAll(Account_user.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("UserEdit"), map);
    }

    //@PermissionAttribute(Permissions.权限管理.用户管理.编辑用户)
    @RequestMapping(value = "UserEditSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userEditSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Integer userId = TypeParseHelper.strToInteger(map.get(Account_user._ID_));
        Account_user account_user = this.account_userService.getUser(userId);
        MapHelper.map2Object(map, account_user);
        super.updateEntityInfo(account_user);
        this.account_userService.updateUser(account_user);
        return super.getSuccess();
    }
    // endregion

    // region UserGroupAssign
    @RequestMapping(value = "UserGroupAssign/{id}", method = RequestMethod.GET)
    public ModelAndView userGroupAssign(@PathVariable Integer id) throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        View_account_usergroupassignDataFilter dataFilter = new View_account_usergroupassignDataFilter();
        dataFilter.setUserid(new IdFieldFilter<Integer>(id));
        map.put(BaseController.FILTER_DATA, dataFilter);
        map.put("USERID", id);
        map.putAll(View_account_usergroupassign.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("UserGroupAssign"), map);
    }

    @RequestMapping(value = "UserGroupAssignData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userGroupAssignData(@EntityResolverAttribute View_account_usergroupassignDataFilter filter) throws Exception {
        PagedResult<View_account_usergroupassign> pagedResult = filter.getPageResult(this.view_account_usergroupassignMapper);
        return super.getSuccess(pagedResult.getTotalCount(), pagedResult.getResults());
    }

    @RequestMapping(value = "GetUserUnAssignGroupList", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String getUserUnAssignGroupList(@RequestParam("userID") Integer userID) throws Exception {
        List<Account_group> list = this.account_groupService.getUserUnAssignGroupList(userID);
        return super.getSuccess(list);
    }

    @RequestMapping(value = "UserGroupAssignAdd", method = RequestMethod.GET)
    public ModelAndView userGroupAssignAdd(@RequestParam("userID") Integer userID) throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("USERID", userID);
        map.putAll(Account_group.get_Final_Fields());
        map.putAll(Account_usergroupassign.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("UserGroupAssignAdd"), map);
    }

    @RequestMapping(value = "UserGroupAssignAddSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userGroupAssignAddSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Account_usergroupassign accountUserGroupAssign = new Account_usergroupassign();
        MapHelper.map2Object(map, accountUserGroupAssign);
        super.insertEntityInfo(accountUserGroupAssign);
        this.account_usergroupassignService.assignUserGroup(accountUserGroupAssign);
        return super.getSuccess();
    }

    @RequestMapping(value = "UserGroupAssignUpdate", method = RequestMethod.GET)
    public ModelAndView userGroupAssignUpdate(@RequestParam("groupAssignID") Integer groupAssignID) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        Account_usergroupassign accountUserGroupAssign = this.account_usergroupassignService.getUserGroupAssign(groupAssignID);
        map.put(BaseController.MODEL, accountUserGroupAssign);
        map.putAll(Account_usergroupassign.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("UserGroupAssignUpdate"), map);
    }

    @RequestMapping(value = "UserGroupAssignUpdateSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userGroupAssignUpdateSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Integer userGroupAssignId = TypeParseHelper.strToInteger(map.get(Account_usergroupassign._ID_));
        Account_usergroupassign accountUserGroupAssign = this.account_usergroupassignService.getUserGroupAssign(userGroupAssignId);
        MapHelper.map2Object(map, accountUserGroupAssign);
        super.updateEntityInfo(accountUserGroupAssign);
        this.account_usergroupassignService.assignUserGroup(accountUserGroupAssign);
        return super.getSuccess();
    }

    @RequestMapping(value = "UserGroupAssignDelete", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userGroupAssignDelete(@RequestParam("groupAssignID") Integer groupAssignID) throws Exception {
        this.account_usergroupassignService.deleteUserGroupAssign(groupAssignID);
        return super.getSuccess();
    }

    // endregion

    // region UserRoleAssign
    @RequestMapping(value = "UserRoleAssign/{id}", method = RequestMethod.GET)
    public ModelAndView userRoleAssign(@PathVariable Integer id) throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        View_account_userroleassignDataFilter dataFilter = new View_account_userroleassignDataFilter();
        dataFilter.setUserid(new IdFieldFilter<Integer>(id));
        map.put(BaseController.FILTER_DATA, dataFilter);
        map.put("USERID", id);
        map.putAll(View_account_userroleassign.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("UserRoleAssign"), map);
    }

    @RequestMapping(value = "UserRoleAssignData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userRoleAssignData(@EntityResolverAttribute View_account_userroleassignDataFilter filter) throws Exception {
        PagedResult<View_account_userroleassign> pagedResult = filter.getPageResult(this.view_account_userroleassignMapper);
        return super.getSuccess(pagedResult.getTotalCount(), pagedResult.getResults());
    }

    @RequestMapping(value = "GetUserUnAssignRoleList", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String getUserUnAssignRoleList(@RequestParam("userID") Integer userID) throws Exception {
        List<Account_role> list = this.account_roleService.getUserUnAssignRoleList(userID, Date8Helper.now());
        return super.getSuccess(list);
    }

    @RequestMapping(value = "UserRoleAssignAdd", method = RequestMethod.GET)
    public ModelAndView userRoleAssignAdd(@RequestParam("userID") Integer userID) throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("USERID", userID);
        map.putAll(Account_role.get_Final_Fields());
        map.putAll(Account_userroleassign.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("UserRoleAssignAdd"), map);
    }

    @RequestMapping(value = "UserRoleAssignAddSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userRoleAssignAddSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Account_userroleassign accountUserRoleAssign = new Account_userroleassign();
        MapHelper.map2Object(map, accountUserRoleAssign);
        super.insertEntityInfo(accountUserRoleAssign);
        this.account_userroleassignService.assignUserRole(accountUserRoleAssign);
        return super.getSuccess();
    }

    @RequestMapping(value = "UserRoleAssignUpdate", method = RequestMethod.GET)
    public ModelAndView userRoleAssignUpdate(@RequestParam("roleAssignID") Integer roleAssignID) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        Account_userroleassign accountUserRoleAssign = this.account_userroleassignService.getUserRoleAssign(roleAssignID);
        map.put(BaseController.MODEL, accountUserRoleAssign);
        map.putAll(Account_userroleassign.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("UserRoleAssignUpdate"), map);
    }

    @RequestMapping(value = "UserRoleAssignUpdateSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userRoleAssignUpdateSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Integer userRoleAssignId = TypeParseHelper.strToInteger(map.get(Account_userroleassign._ID_));
        Account_userroleassign accountUserRoleAssign = this.account_userroleassignService.getUserRoleAssign(userRoleAssignId);
        MapHelper.map2Object(map, accountUserRoleAssign);
        super.updateEntityInfo(accountUserRoleAssign);
        this.account_userroleassignService.assignUserRole(accountUserRoleAssign);
        return super.getSuccess();
    }

    @RequestMapping(value = "UserRoleAssignDelete", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userRoleAssignDelete(@RequestParam("roleAssignID") Integer roleAssignID) throws Exception {
        this.account_userroleassignService.deleteUserRoleAssign(roleAssignID);
        return super.getSuccess();
    }
    // endregion
}
