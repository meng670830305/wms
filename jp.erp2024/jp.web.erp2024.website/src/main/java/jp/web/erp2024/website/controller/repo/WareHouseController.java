package jp.web.erp2024.website.controller.repo;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jp.com.filterexpression.EntityResolverAttribute;
import jp.com.filterexpression.IdFieldFilter;
import jp.com.filterexpression.SortBuilder;
import jp.com.filterexpression.SortPart;
import jp.com.helper.MapHelper;
import jp.com.helper.TypeParseHelper;
import jp.com.module.JsonManager;
import jp.com.module.PagedResult;
import jp.db.erp2024.datafilter.Warehouse_infoDataFilter;
import jp.db.erp2024.mapper.Warehouse_infoMapper;
import jp.db.erp2024.pojo.Warehouse_info;
import jp.db.erp2024.service.Warehouse_infoService;
import jp.web.erp2024.website.config.util.FormCollection;
import jp.web.erp2024.website.controller.BaseController;
import jp.web.erp2024.website.enums.EState;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <pre>
 *
 * </pre>
 *
 * @author wangyunpeng
 * @date 2023/11/13 21:48
 * @company ㍿○○○○
 */
@Controller
@RequestMapping(WareHouseController.CONTROLLER_NAME)
public class WareHouseController extends BaseController {

    public static final String CONTROLLER_NAME = "/Repo/WareHouse";

    @Resource
    private Warehouse_infoMapper warehouse_infoMapper;
    @Resource
    private Warehouse_infoService warehouse_infoService;


    @Override
    protected String getViewName(String viewName) {
        return super.getFullViewName(CONTROLLER_NAME, viewName);
    }

    // region WareHouse
    @RequestMapping(value = "WareHouseList", method = RequestMethod.GET)
    public ModelAndView wareHouseList() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        Warehouse_infoDataFilter filter = new Warehouse_infoDataFilter();

        IdFieldFilter<Integer> sortFieldFilter = new IdFieldFilter<Integer>();
        sortFieldFilter.setSort(SortBuilder.asc(1).getPropriety());
        filter.setSort(sortFieldFilter);

        map.put(BaseController.FILTER_DATA, filter);
        map.put(BaseController.E_STATE, EState.class);
        map.putAll(Warehouse_info.get_Final_Fields());
        map.put(BaseController.PERMISSION_CONTEXT, super.permissionContext);
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("WareHouseList"), map);
    }

    @RequestMapping(value = "WareHouseListData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String wareHouseListData(@EntityResolverAttribute Warehouse_infoDataFilter filter) throws Exception {
        PagedResult<Warehouse_info> pagedResult = filter.getPageResult(this.warehouse_infoMapper);
        return JsonManager.getSuccess(pagedResult.getTotalCount(), pagedResult.getResults());
    }

    @RequestMapping(value = "WareHouseAdd", method = RequestMethod.GET)
    public ModelAndView wareHouseAdd() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.putAll(Warehouse_info.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("WareHouseAdd"), map);
    }

    @RequestMapping(value = "WareHouseAddSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String wareHouseAddSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Warehouse_info warehouseInfo = new Warehouse_info();
        MapHelper.map2Object(map, warehouseInfo);
        super.insertEntityInfo(warehouseInfo);
        if (this.warehouse_infoService.createWarehouseInfo(warehouseInfo)) {
            return super.getSuccess();
        } else {
            return super.getError();
        }
    }

    @RequestMapping(value = "WareHouseEdit/{id}", method = RequestMethod.GET)
    public ModelAndView wareHouseEdit(@PathVariable Integer id) throws Exception {
        Warehouse_info warehouse_info = null;
        if (id > 0) {
            warehouse_info = this.warehouse_infoService.getWarehouseInfo(id);
        } else {
            throw new IllegalArgumentException(String.format("倉庫番号「%s」が存在していない!", id));
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(BaseController.MODEL, warehouse_info);
        map.putAll(Warehouse_info.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("WareHouseEdit"), map);
    }

    @RequestMapping(value = "WareHouseEditSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String wareHouseEditSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Integer id = TypeParseHelper.strToInteger(map.get(Warehouse_info._ID_));
        Warehouse_info warehouse_info = this.warehouse_infoService.getWarehouseInfo(id);
        MapHelper.map2Object(map, warehouse_info);
        super.updateEntityInfo(warehouse_info);
        this.warehouse_infoService.updateWarehouseInfo(warehouse_info);
        return super.getSuccess();
    }


    @RequestMapping(value = "WareHouseDelete", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String wareHouseDelete(@RequestParam("id") Integer id) throws Exception {
        this.warehouse_infoService.deleteWareHouseInfo(id, EState.無効.getValue());
        return super.getSuccess();
    }

    @RequestMapping(value = "GetWareHouseAll", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String getWareHouseAll() throws Exception {
        List<Warehouse_info> wareHouseInfoList = this.warehouse_infoService.getWareHouseInfoAll(EState.有効.getValue());
        return super.json(wareHouseInfoList);
    }

    // endregion
}
