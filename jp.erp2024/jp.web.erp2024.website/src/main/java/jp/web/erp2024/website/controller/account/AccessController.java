package jp.web.erp2024.website.controller.account;

import cn.hutool.core.lang.UUID;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jp.com.filterexpression.EntityResolverAttribute;
import jp.com.filterexpression.IdFieldFilter;
import jp.com.filterexpression.SortBuilder;
import jp.com.filterexpression.SortPart;
import jp.com.helper.*;
import jp.com.module.PagedResult;
import jp.com.module.TreeData;
import jp.db.erp2024.datafilter.Account_groupDataFilter;
import jp.db.erp2024.datafilter.Account_roleDataFilter;
import jp.db.erp2024.mapper.Account_groupMapper;
import jp.db.erp2024.mapper.Account_roleMapper;
import jp.db.erp2024.pojo.*;
import jp.db.erp2024.service.*;
import jp.web.erp2024.website.config.security.FilterInvocationSecurityMetadataSourceImpl;
import jp.web.erp2024.website.config.util.FormCollection;
import jp.web.erp2024.website.controller.BaseController;
import jp.web.erp2024.website.enums.EAccount_AssignType;
import jp.web.erp2024.website.models.TreeGridAccountPermission;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.HtmlUtils;

import java.util.*;
import java.util.function.Predicate;

@Controller
@RequestMapping(AccessController.CONTROLLER_NAME)
public class AccessController extends BaseController {

    public static final String CONTROLLER_NAME = "/Account/Access";

    private final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    @Override
    protected String getViewName(String viewName) {
        return super.getFullViewName(CONTROLLER_NAME, viewName);
    }

    @Resource
    private FilterInvocationSecurityMetadataSourceImpl urlSecurityMetadataSource;

    @Resource
    private Account_groupMapper account_groupMapper;
    @Resource
    private Account_groupService account_groupService;

    @Resource
    private Account_roleMapper account_roleMapper;
    @Resource
    private Account_roleService account_roleService;

    @Resource
    private Account_permissionService account_permissionService;
    @Resource
    private Account_grouppermissionassignService account_grouppermissionassignService;
    @Resource
    private Account_rolepermissionassignService account_rolepermissionassignService;
    @Resource
    private Account_userpermissionassignService account_userpermissionassignService;

    // region Group
    @RequestMapping(value = "GroupList", method = RequestMethod.GET)
    public ModelAndView groupList() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        Account_groupDataFilter dataFilter = new Account_groupDataFilter();
        IdFieldFilter<Integer> sortFieldFilter = new IdFieldFilter<Integer>();
        sortFieldFilter.setSort(SortBuilder.asc(1).getPropriety());
        dataFilter.setSort(sortFieldFilter);
        map.put(BaseController.FILTER_DATA, dataFilter);
        map.putAll(Account_group.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("GroupList"), map);
    }

    @RequestMapping(value = "GroupListData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String groupListData(@EntityResolverAttribute Account_groupDataFilter filter) throws Exception {
        PagedResult<Account_group> pagedResult = filter.getPageResult(this.account_groupMapper);
        return super.getSuccess(pagedResult.getTotalCount(), pagedResult.getResults());
    }

    @RequestMapping(value = "GroupAdd", method = RequestMethod.GET)
    public ModelAndView groupAdd() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.putAll(Account_group.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("GroupAdd"), map);
    }

    @RequestMapping(value = "GroupAddSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String groupAddSave(Account_group accountGroup) throws Exception {
        if (accountGroup == null) {
            throw new IllegalArgumentException("accountGroup不能为空!");
        }
        super.insertEntityInfo(accountGroup);
        if (this.account_groupService.createGroup(accountGroup)) {
            return super.getSuccess();
        } else {
            return super.getError();
        }
    }

    @RequestMapping(value = "GroupEdit/{id}", method = RequestMethod.GET)
    public ModelAndView groupEdit(@PathVariable Integer id) throws Exception {
        Account_group account_group = null;
        if (id > 0) {
            account_group = this.account_groupService.getGroup(id);
        } else {
            throw new IllegalArgumentException(String.format("用户组ID '%s' 不存在!", id));
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(BaseController.MODEL, account_group);
        map.putAll(Account_group.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("GroupEdit"), map);
    }

    @RequestMapping(value = "GroupEditSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String groupEditSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Integer groupId = TypeParseHelper.strToInteger(map.get(Account_group._ID_));
        Account_group account_group = this.account_groupService.getGroup(groupId);
        MapHelper.map2Object(map, account_group);
        super.updateEntityInfo(account_group);
        this.account_groupService.updateGroup(account_group);
        return super.getSuccess();
    }

    // endregion

    // region Role
    @RequestMapping(value = "RoleList", method = RequestMethod.GET)
    public ModelAndView roleList() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        SortPart sortPart = SortBuilder.desc(1);
        IdFieldFilter<Integer> idFieldFilter = new IdFieldFilter<Integer>();
        idFieldFilter.setSort(sortPart.getPropriety());
        Account_roleDataFilter dataFilter = new Account_roleDataFilter();
        dataFilter.setId(idFieldFilter);
        map.put(BaseController.FILTER_DATA, dataFilter);
        map.putAll(Account_role.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("RoleList"), map);
    }

    @RequestMapping(value = "RoleListData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String roleListData(@EntityResolverAttribute Account_roleDataFilter filter) throws Exception {
        PagedResult<Account_role> pagedResult = filter.getPageResult(this.account_roleMapper);
        return super.getSuccess(pagedResult.getTotalCount(), pagedResult.getResults());
    }

    @RequestMapping(value = "RoleAdd", method = RequestMethod.GET)
    public ModelAndView roleAdd() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.putAll(Account_role.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("RoleAdd"), map);
    }

    @RequestMapping(value = "RoleAddSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String roleAddSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Account_role account_role = new Account_role();
        MapHelper.map2Object(map, account_role);
        String value = map.get(Account_role._ISENABLE_);
        boolean check = TypeParseHelper.strToBoolean(value);
        account_role.setIsenable(check ? Integer.valueOf(1) : Integer.valueOf(0));
        super.insertEntityInfo(account_role);
        if (this.account_roleService.createRole(account_role)) {
            return super.getSuccess();
        } else {
            return super.getError();
        }
    }

    @RequestMapping(value = "RoleEdit/{id}", method = RequestMethod.GET)
    public ModelAndView roleEdit(@PathVariable Integer id) throws Exception {
        Account_role account_role = null;
        if (id > 0) {
            account_role = this.account_roleService.getRole(id);
        } else {
            throw new IllegalArgumentException(String.format("角色ID '%s' 不存在!", id));
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(BaseController.MODEL, account_role);
        map.putAll(Account_role.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("RoleEdit"), map);
    }

    @RequestMapping(value = "RoleEditSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String roleEditSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Integer roleId = TypeParseHelper.strToInteger(map.get(Account_role._ID_));
        Account_role account_role = this.account_roleService.getRole(roleId);
        MapHelper.map2Object(map, account_role);
        String value = map.get(Account_role._ISENABLE_);
        boolean check = TypeParseHelper.strToBoolean(value);
        account_role.setIsenable(check ? Integer.valueOf(1) : Integer.valueOf(0));
        super.updateEntityInfo(account_role);
        this.account_roleService.updateRole(account_role);
        return super.getSuccess();
    }

    @RequestMapping(value = "RoleDelete", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String roleDelete(@RequestParam("roleID") Integer roleId) throws Exception {
        this.account_roleService.deleteRole(roleId);
        return super.getSuccess();
    }

    // endregion

    // region Permission
    @RequestMapping(value = "PermissionList", method = RequestMethod.GET)
    public ModelAndView permissionList() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.putAll(Account_permission.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("PermissionList"), map);
    }

    @RequestMapping(value = "PermissionListData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String permissionListData() throws Exception {
        List<Account_permission> accountPermissionList = this.account_permissionService.getPermissionAll();
        accountPermissionList = Lambda.orderBy(accountPermissionList, new Comparator<Account_permission>() {
            public int compare(Account_permission arg0, Account_permission arg1) {
                return arg0.getSort().compareTo(arg1.getSort());
            }
        });
        List<TreeGridAccountPermission> treeGridAccountPermissionList = Lambda.select(accountPermissionList, item -> new TreeGridAccountPermission(item.getId(), item.getName(), item.getParentid(), item.getHref(), item.getIcon(), item.getSort(), item.getIsenable(), item.getCanmenu()));
        return super.json(treeGridAccountPermissionList);
    }

    @RequestMapping(value = "PermissionAdd", method = RequestMethod.GET)
    public ModelAndView permissionAdd() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.putAll(Account_permission.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("PermissionAdd"), map);
    }

    @RequestMapping(value = "GetPermissionTree", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String getPermissionTree() throws Exception {
        List<Account_permission> accountPermissionList = this.account_permissionService.getPermissionAll();
        accountPermissionList = Lambda.orderBy(accountPermissionList, (x, y) -> x.getSort().compareTo(y.getSort()));
        String parentId = Guid.empty();
        TreeData treeRoot = new TreeData();
        treeRoot.id = parentId;
        treeRoot.iconCls = "icon-home";
        treeRoot.state = "close";
        treeRoot.text = "所有权限";
        treeRoot.children = buildPermissionTree(accountPermissionList, parentId);
        TreeData[] treeDatas = new TreeData[]{treeRoot};
        return super.getSuccess(treeDatas);
    }

    private List<TreeData> buildPermissionTree(List<Account_permission> treeDataList, final String parentId) {
        List<TreeData> list = new ArrayList<TreeData>();
        List<Account_permission> treeItemList = Lambda.where(treeDataList, item -> parentId.equalsIgnoreCase(item.getParentid()));
        if (treeItemList.isEmpty()) {
            return list;
        }
        TreeData treeData = null;
        for (Account_permission treeItem : treeItemList) {
            treeData = new TreeData();
            treeData.id = treeItem.getId();
            treeData.iconCls = treeItem.getIcon();
            treeData.text = treeItem.getName();
            treeData.state = "open";
            treeData.children = buildPermissionTree(treeDataList, treeItem.getId());
            treeData.attributes = treeData.new Attributes(!treeData.children.isEmpty(), treeItem.getHref());
            list.add(treeData);
        }
        return list;
    }

    @RequestMapping(value = "PermissionAddSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String permissionAddSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Account_permission account_permission = new Account_permission();
        MapHelper.map2Object(map, account_permission);
        account_permission.setId(UUID.randomUUID().toString());
        String value = map.get(Account_permission._ISENABLE_);
        boolean check = TypeParseHelper.strToBoolean(value);
        account_permission.setIsenable(check ? Integer.valueOf(1) : Integer.valueOf(0));
        value = map.get(Account_permission._CANMENU_);
        check = TypeParseHelper.strToBoolean(value);
        account_permission.setCanmenu(check ? Integer.valueOf(1) : Integer.valueOf(0));
        super.insertEntityInfo(account_permission);
        this.account_permissionService.createPermission(account_permission);
        return super.getSuccess();
    }

    @RequestMapping(value = "PermissionEdit/{id}", method = RequestMethod.GET)
    public ModelAndView permissionEdit(@PathVariable String id) throws Exception {
        Account_permission account_permission = null;
        if (id.equals(Guid.empty())) {
            throw new IllegalArgumentException(String.format("权限ID '%s' 不存在!", id));
        } else {
            account_permission = this.account_permissionService.getPermission(id);
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(BaseController.MODEL, account_permission);
        map.putAll(Account_permission.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("PermissionEdit"), map);
    }

    @RequestMapping(value = "PermissionEditSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String permissionEditSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        String permissionId = map.get(Account_permission._ID_);
        Account_permission accountPermission = this.account_permissionService.getPermission(permissionId);
        MapHelper.map2Object(map, accountPermission);
        super.updateEntityInfo(accountPermission);
        this.account_permissionService.updatePermission(accountPermission);
        return super.getSuccess();
    }

    @RequestMapping(value = "PermissionDelete", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String permissionDelete(@RequestParam("id") String id) throws Exception {
        this.account_permissionService.deletePermission(id);
        return super.getSuccess();
    }

    // endregion

    // region PermissionAssign
    @RequestMapping(value = "PermissionAssign", method = RequestMethod.GET)
    public ModelAndView permissionAssign(@RequestParam("key") Integer key, @RequestParam("type") String type) throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("KEY", key);
        map.put("TYPE", type);
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("PermissionAssign"), map);
    }

    @RequestMapping(value = "PermissionAssignData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String permissionAssignData(@RequestParam("key") final Integer key, @RequestParam("type") String type) throws Exception {
        Predicate<String> predicate = null;
        switch (type) {
            case "group":
                predicate = id -> {
                    boolean result = false;
                    try {
                        result = this.account_grouppermissionassignService.hasGroupPermission(key, id);
                    } catch (Exception e) {
                        LoggerHelper.error(this.logger, e, "AccountGroupPermissionAssignService.hasGroupPermission(key, id)");
                        result = false;
                    }
                    return result;
                };
                break;
            case "role":
                predicate = id -> {
                    boolean result = false;
                    try {
                        result = this.account_rolepermissionassignService.hasRolePermission(key, id);
                    } catch (Exception e) {
                        LoggerHelper.error(this.logger, e, "AccountRolePermissionAssignService.hasRolePermission(key, id)");
                        result = false;
                    }
                    return result;
                };
                break;
            case "user":
                predicate = id -> {
                    boolean result = false;
                    try {
                        result = this.account_userpermissionassignService.hasUserSpecialPermission(key, id);
                    } catch (Exception e) {
                        LoggerHelper.error(this.logger, e, "AccountUserPermissionAssignService.hasUserSpecialPermission(key, id)");
                        result = false;
                    }
                    return result;
                };
                break;
        }
        List<Account_permission> accountPermissionList = this.account_permissionService.getPermissionAll();
        accountPermissionList = Lambda.orderBy(accountPermissionList, (x, y) -> x.getSort().compareTo(y.getSort()));
        TreeData treeRoot = new TreeData();
        treeRoot.id = Guid.empty();
        treeRoot.iconCls = "icon-home";
        treeRoot.text = "所有权限";
        treeRoot.state = "open";
        treeRoot.children = buildData(accountPermissionList, Guid.empty(), predicate);
        treeRoot.attributes = treeRoot.new Attributes(!accountPermissionList.isEmpty(), "");
        TreeData[] treeDatas = new TreeData[]{treeRoot};
        return super.json(treeDatas);
    }

    private List<TreeData> buildData(List<Account_permission> treeDataList, final String parentID, Predicate<String> predicate) {
        List<TreeData> resultList = new ArrayList<TreeData>();
        List<Account_permission> treeItemList = Lambda.where(treeDataList, item -> parentID.equalsIgnoreCase(item.getParentid()));
        if (treeItemList.isEmpty()) {
            return resultList;
        }
        TreeData treeData = null;
        String description;
        for (Account_permission treeItem : treeItemList) {
            treeData = new TreeData();
            treeData.id = treeItem.getId();
            treeData.iconCls = treeItem.getIcon();
            treeData.text = treeItem.getName();
            treeData.state = "open";
            treeData.checked = predicate.test(treeItem.getId());
            treeData.children = buildData(treeDataList, treeItem.getId(), predicate);
            description = treeItem.getDescription();
            if (StringUtils.isNotEmpty(description)) {
                description = HtmlUtils.htmlEscape(treeItem.getDescription());
            } else {
                description = "";
            }
            treeData.attributes = treeData.new Attributes(!treeData.children.isEmpty(), "", description);
            resultList.add(treeData);
        }
        return resultList;
    }

    @RequestMapping(value = "GroupPermissionAssign", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String groupPermissionAssign(@RequestParam("ids") String ids, @RequestParam("groupID") Integer groupID) throws Exception {
        if (ids == null) {
            throw new NullPointerException("参数ids错误!");
        }
        if (ids.length() == 0) {
            this.account_grouppermissionassignService.deleteGroupPermission(groupID);
        } else {
            String[] permissionIDs = StringUtils.split(ids, ",");
            List<Account_grouppermissionassign> groupPermissionList = new ArrayList<Account_grouppermissionassign>(permissionIDs.length);
            Account_grouppermissionassign groupPermission = null;
            for (String permissionID : permissionIDs) {
                groupPermission = new Account_grouppermissionassign();
                groupPermission.setPermissionid(permissionID);
                groupPermission.setGroupid(groupID);
                super.insertEntityInfo(groupPermission);
                groupPermissionList.add(groupPermission);
            }
            permissionIDs = null;
            this.account_grouppermissionassignService.assignGroupPermission(groupPermissionList);
            groupPermissionList.clear();
            groupPermissionList = null;
        }
        this.updatePermission();
        return super.getSuccess();
    }

    @RequestMapping(value = "RolePermissionAssign", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String rolePermissionAssign(@RequestParam("ids") String ids, @RequestParam("roleID") Integer roleID) throws Exception {
        if (ids == null) {
            throw new NullPointerException("参数ids错误!");
        }
        if (ids.length() == 0) {
            this.account_rolepermissionassignService.deleteRolePermission(roleID);
        } else {
            String[] permissionIDs = StringUtils.split(ids, ",");
            List<Account_rolepermissionassign> rolePermissionList = new ArrayList<Account_rolepermissionassign>(permissionIDs.length);
            Account_rolepermissionassign rolePermission = null;
            for (String permissionID : permissionIDs) {
                rolePermission = new Account_rolepermissionassign();
                rolePermission.setPermissionid(permissionID);
                rolePermission.setRoleid(roleID);
                super.insertEntityInfo(rolePermission);
                rolePermissionList.add(rolePermission);
            }
            permissionIDs = null;
            this.account_rolepermissionassignService.assignRolePermission(rolePermissionList);
            rolePermissionList.clear();
            rolePermissionList = null;
        }
        this.updatePermission();
        return super.getSuccess();
    }

    @RequestMapping(value = "UserPermissionAssign", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String userPermissionAssign(@RequestParam("ids") String ids, @RequestParam("userID") Integer userID) throws Exception {
        if (ids == null) {
            throw new NullPointerException("参数ids错误!");
        }
        if (ids.length() == 0) {
            this.account_userpermissionassignService.deleteUserSpecialPermission(userID);
        } else {
            String[] permissionIDs = StringUtils.split(ids, ",");
            List<Account_userpermissionassign> userPermissionList = new ArrayList<Account_userpermissionassign>(permissionIDs.length);
            Account_userpermissionassign userPermission = null;
            for (String permissionID : permissionIDs) {
                userPermission = new Account_userpermissionassign();
                userPermission.setPermissionid(permissionID);
                userPermission.setUserid(userID);
                userPermission.setIsenable(Integer.valueOf(1));
                userPermission.setAssigntype(Integer.valueOf(EAccount_AssignType.包含.getValue()));
                super.insertEntityInfo(userPermission);
                userPermissionList.add(userPermission);
            }
            permissionIDs = null;
            this.account_userpermissionassignService.assignUserSpecialPermission(userPermissionList);
            userPermissionList.clear();
            userPermissionList = null;
        }
        this.updatePermission();
        return super.getSuccess();
    }

    private void updatePermission() throws Exception {
        this.urlSecurityMetadataSource.loadResourceDefine();
    }

    // endregion

}
