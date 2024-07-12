package jp.web.erp2024.website.controller.repo;

import com.alibaba.fastjson2.JSONObject;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jp.com.filterexpression.EntityResolverAttribute;
import jp.com.filterexpression.IdFieldFilter;
import jp.com.filterexpression.SortBuilder;
import jp.com.filterexpression.SortPart;
import jp.com.helper.*;
import jp.com.module.JsonManager;
import jp.com.module.PagedResult;
import jp.db.erp2024.datafilter.Barn_optionDataFilter;
import jp.db.erp2024.datafilter.Barn_shelfDataFilter;
import jp.db.erp2024.datafilter.View_barn_warehouse_infoDataFilter;
import jp.db.erp2024.datafilter.View_barn_warehouse_option_infoDataFilter;
import jp.db.erp2024.mapper.*;
import jp.db.erp2024.pojo.*;
import jp.db.erp2024.service.Barn_infoService;
import jp.db.erp2024.service.Barn_optionService;
import jp.db.erp2024.service.Barn_shelfService;
import jp.db.erp2024.service.View_barn_warehouse_option_infoService;
import jp.web.erp2024.website.config.util.FormCollection;
import jp.web.erp2024.website.controller.BaseController;
import jp.web.erp2024.website.enums.EBarnType;
import jp.web.erp2024.website.enums.EState;
import jp.web.erp2024.website.impl.ICalc;
import jp.web.erp2024.website.models.OPT;
import jp.web.erp2024.website.models.SKU;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;
import java.util.stream.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

/**
 * <pre>
 *
 * </pre>
 *
 * @author wangyunpeng
 * @date 2023/11/13 21:49
 * @company ㍿○○○○
 */
@Controller
@RequestMapping(BarnController.CONTROLLER_NAME)
public class BarnController extends BaseController implements ICalc {

    public static final String CONTROLLER_NAME = "/Repo/Barn";

    @Override
    protected String getViewName(String viewName) {
        return super.getFullViewName(CONTROLLER_NAME, viewName);
    }

    @Resource
    private Barn_infoService barn_infoService;

    @Resource
    private Barn_infoMapper barn_infoMapper;

    @Resource
    private View_barn_warehouse_infoMapper view_barn_warehouse_infoMapper;

    @Resource
    private Barn_optionMapper barn_optionMapper;

    @Resource
    private Barn_optionService barn_optionService;

    @Resource
    private View_barn_warehouse_option_infoMapper view_barn_warehouse_option_infoMapper;

    @Resource
    private View_barn_warehouse_option_infoService view_barn_warehouse_option_infoService;

    @Resource
    private Warehouse_infoMapper warehouse_infoMapper;

    @Resource
    private Barn_shelfMapper barn_shelfMapper;

    @Resource
    private Barn_shelfService barn_shelfService;

    // region barn_info

    @RequestMapping(value = "BarnInfoList", method = RequestMethod.GET)
    public ModelAndView barnInfoList(HttpServletRequest request, HttpServletResponse response) throws IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        View_barn_warehouse_infoDataFilter filter = new View_barn_warehouse_infoDataFilter();

        IdFieldFilter<Integer> wareInfoSortFieldFilter = new IdFieldFilter<Integer>();
        wareInfoSortFieldFilter.setSort(SortBuilder.asc(1).getPropriety());
        filter.setWarehouse_sort(wareInfoSortFieldFilter);

        IdFieldFilter<Integer> sortFieldFilter = new IdFieldFilter<Integer>();
        sortFieldFilter.setSort(SortBuilder.asc(2).getPropriety());
        filter.setSort(sortFieldFilter);

        map.put(BaseController.FILTER_DATA, filter);
        map.put("E_BARNTYPE", EBarnType.class);
        map.put(BaseController.E_STATE, EState.class);
        map.putAll(View_barn_warehouse_info.get_Final_Fields());
        map.put(BaseController.PERMISSION_CONTEXT, super.permissionContext);
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("BarnInfoList"), map);
    }

    @RequestMapping(value = "BarnInfoListData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String barnInfoListData(@EntityResolverAttribute View_barn_warehouse_infoDataFilter filter) throws Exception {
        PagedResult<View_barn_warehouse_info> pagedResult = filter.getPageResult(this.view_barn_warehouse_infoMapper);
        return JsonManager.getSuccess(pagedResult.getTotalCount(), pagedResult.getResults());
    }

    @RequestMapping(value = "BarnInfoAdd", method = RequestMethod.GET)
    public ModelAndView barnInfoAdd() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.putAll(Barn_info.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("BarnInfoAdd"), map);
    }

    @RequestMapping(value = "BarnInfoAddSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String barnInfoAddSave(Barn_info barnInfo) throws Exception {
        super.insertEntityInfo(barnInfo);
        if (this.barn_infoService.createBarnInfo(barnInfo)) {
            return super.getSuccess();
        } else {
            return super.getError();
        }
    }

    @RequestMapping(value = "BarnInfoEdit/{id}", method = RequestMethod.GET)
    public ModelAndView barnInfoEdit(@PathVariable Integer id) throws Exception {
        Barn_info barnInfo = null;
        if (id > 0) {
            barnInfo = this.barn_infoService.getBarnInfo(id);
        } else {
            throw new IllegalArgumentException(String.format("倉庫区域番号「%s」が存在していない!", id));
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(BaseController.MODEL, barnInfo);
        map.putAll(Barn_info.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("BarnInfoEdit"), map);
    }

    @RequestMapping(value = "BarnInfoEditSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String barnInfoEditSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Integer id = TypeParseHelper.strToInteger(map.get(Warehouse_info._ID_));
        Barn_info barnInfo = this.barn_infoService.getBarnInfo(id);
        MapHelper.map2Object(map, barnInfo);
        super.updateEntityInfo(barnInfo);
        this.barn_infoService.updateBarnInfo(barnInfo);
        return super.getSuccess();
    }

    @RequestMapping(value = "BarnInfoDelete", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String barnInfoDelete(@RequestParam("id") Integer id) throws Exception {
        this.barn_infoService.deleteBarnInfo(id, EState.無効.getValue());
        return super.getSuccess();
    }

    @RequestMapping(value = "GetBarnInfoList/{wareHouseInfoId}", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String getBarnInfoList(@PathVariable("wareHouseInfoId") Integer wareHouseInfoId) throws Exception {
        List<Barn_info> barnInfoList = this.barn_infoService.getBarnInfoList(wareHouseInfoId, EState.有効.getValue());
        return super.json(barnInfoList);
    }
    // endregion

    // region barn_option
    @RequestMapping(value = "BarnOptionList", method = RequestMethod.GET)
    public ModelAndView barnOptionList(HttpServletRequest request, HttpServletResponse response) throws IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        View_barn_warehouse_option_infoDataFilter filter = new View_barn_warehouse_option_infoDataFilter();

        IdFieldFilter<Integer> wareHoustSortFieldFilter = new IdFieldFilter<Integer>();
        wareHoustSortFieldFilter.setSort(SortBuilder.asc(1).getPropriety());
        filter.setWarehouse_sort(wareHoustSortFieldFilter);

        IdFieldFilter<Integer> barnSortFieldFilter = new IdFieldFilter<Integer>();
        barnSortFieldFilter.setSort(SortBuilder.asc(2).getPropriety());
        filter.setBarn_sort(barnSortFieldFilter);

        IdFieldFilter<Integer> sortFieldFilter = new IdFieldFilter<Integer>();
        sortFieldFilter.setSort(SortBuilder.asc(3).getPropriety());
        filter.setSort(sortFieldFilter);

        map.put(BaseController.FILTER_DATA, filter);
        map.put(BaseController.E_STATE, EState.class);
        map.putAll(View_barn_warehouse_option_info.get_Final_Fields());
        map.put(BaseController.PERMISSION_CONTEXT, super.permissionContext);
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("BarnOptionList"), map);
    }

    @RequestMapping(value = "BarnOptionListData", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String barnOptionListData(@EntityResolverAttribute View_barn_warehouse_option_infoDataFilter filter) throws Exception {
        PagedResult<View_barn_warehouse_option_info> pagedResult = filter.getPageResult(this.view_barn_warehouse_option_infoMapper);
        return JsonManager.getSuccess(pagedResult.getTotalCount(), pagedResult.getResults());
    }

    @RequestMapping(value = "BarnOptionAdd", method = RequestMethod.GET)
    public ModelAndView barnOptionAdd() throws IllegalArgumentException, IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.putAll(View_barn_warehouse_option_info.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("BarnOptionAdd"), map);
    }

    @RequestMapping(value = "BarnOptionAddSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String barnOptionAddSave(Barn_option barnOption) throws Exception {
        super.insertEntityInfo(barnOption);
        if (this.barn_optionService.createBarnOption(barnOption)) {
            return super.getSuccess();
        } else {
            return super.getError();
        }
    }

    @RequestMapping(value = "BarnOptionEdit/{id}", method = RequestMethod.GET)
    public ModelAndView barnOptionEdit(@PathVariable Integer id) throws Exception {
        View_barn_warehouse_option_info viewBarnOption = null;
        if (id > 0) {
            viewBarnOption = this.view_barn_warehouse_option_infoService.getViewBarnOption(id);
        } else {
            throw new IllegalArgumentException(String.format("倉庫オプション番号「%s」が存在していない!", id));
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(BaseController.MODEL, viewBarnOption);
        map.putAll(View_barn_warehouse_option_info.get_Final_Fields());
        map.put(BaseController.HTML_HELPER, super.htmlHelper);
        return new ModelAndView(this.getViewName("BarnOptionEdit"), map);
    }

    @RequestMapping(value = "BarnOptionEditSave", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String barnOptionEditSave(HttpServletRequest request) throws Exception {
        Map<String, String> map = FormCollection.toMap(request);
        Integer id = TypeParseHelper.strToInteger(map.get(Warehouse_info._ID_));
        Barn_option barnOption = this.barn_optionService.getBarnOption(id);
        MapHelper.map2Object(map, barnOption);
        super.updateEntityInfo(barnOption);
        this.barn_optionService.updateBarnOption(barnOption);
        return super.getSuccess();
    }

    @RequestMapping(value = "BarnOptionDelete", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String barnOptionDelete(@RequestParam("id") Integer id) throws Exception {
        this.barn_optionService.deleteBarnOption(id, EState.無効.getValue());
        return super.getSuccess();
    }

    // endregion

    // region barn_shelf
    @RequestMapping(value = "BarnShelfList", method = RequestMethod.GET)
    public ModelAndView barnShelfList(HttpServletRequest request, HttpServletResponse response) throws IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        View_barn_warehouse_infoDataFilter filter = new View_barn_warehouse_infoDataFilter();

        IdFieldFilter<Integer> wareInfoSortFieldFilter = new IdFieldFilter<Integer>();
        wareInfoSortFieldFilter.setSort(SortBuilder.asc(1).getPropriety());
        filter.setWarehouse_sort(wareInfoSortFieldFilter);

        IdFieldFilter<Integer> sortFieldFilter = new IdFieldFilter<Integer>();
        sortFieldFilter.setSort(SortBuilder.asc(2).getPropriety());
        filter.setSort(sortFieldFilter);

        map.put(BaseController.FILTER_DATA, filter);
        map.put(BaseController.E_STATE, EState.class);
        map.put("E_BARNTYPE", EBarnType.class);
        map.putAll(View_barn_warehouse_info.get_Final_Fields());
        map.putAll(Barn_shelf.get_Final_Fields());
        map.put(BaseController.PERMISSION_CONTEXT, super.permissionContext);
        map.put(BaseController.HTML_HELPER, super.htmlHelper);

        Barn_shelfDataFilter shelfDataFilter = new Barn_shelfDataFilter();
        IdFieldFilter<Integer> shelfSortFieldFilter = new IdFieldFilter<Integer>();
        shelfSortFieldFilter.setSort(SortBuilder.asc(1).getPropriety());
        shelfDataFilter.setSort(shelfSortFieldFilter);

        IdFieldFilter<Integer> stateFieldFilter = new IdFieldFilter<>();
        stateFieldFilter.setValue(EState.有効.getValue());
        shelfDataFilter.setState(stateFieldFilter);

        map.put("FILTER_DATA2", shelfDataFilter);

        return new ModelAndView(this.getViewName("BarnShelfList"), map);
    }

    @RequestMapping(value = "BarnShelfSet/{ID}", method = RequestMethod.GET)
    public ModelAndView barnShelfSet(HttpServletRequest request, @PathVariable(value = "ID", required = true) Integer id) throws IllegalAccessException {
        Map<String, Object> map = new HashMap<String, Object>();
        map.putAll(View_barn_warehouse_option_info.get_Final_Fields());

        Barn_info barnInfo = new Barn_info();
        barnInfo.setId(id);
        barnInfo = this.barn_infoMapper.selectOne(barnInfo);
        map.put(BaseController.MODEL, barnInfo);

        String where = String.format("%s=%d", Barn_option._BARN_ID_, id);
        List<Barn_option> barnOptionList = this.barn_optionMapper.selectWhere(where);
        barnOptionList = Lambda.orderBy(barnOptionList, item -> item.getSort(), true);
        List<String> skuNameList = Lambda.select(barnOptionList, item -> item.getName());
        List<String> valuesList = Lambda.select(barnOptionList, item -> item.getValues());
        int allCount = this.getAllCount(valuesList);
        List<List<String>> skuValuesList = new ArrayList<>(allCount);
        for (int i = 0; i < allCount; i++) {
            skuValuesList.add(new ArrayList<>());
        }
        int rowCount = valuesList.size();
        int startCount, endCount, valuesCount, index;
        String value;
        String[] values;
        for (int i = 0; i < rowCount; i++) {
            values = StringUtils.split(valuesList.get(i), ',');
            valuesCount = values.length;
            startCount = this.getStartCount(valuesList, i);
            endCount = this.getEndCount(valuesList, i);
            index = 0;
            for (int j = 0; j < endCount; j++) {
                for (int m = 0; m < valuesCount; m++) {
                    value = values[m];
                    for (int n = 0; n < startCount; n++) {
                        skuValuesList.get(index++).add(value);
                    }
                }
            }
        }
        map.put("SKU_NAME_LIST", skuNameList);
        map.put("SKU_VALUES_LIST", skuValuesList);

        SKU sku = null;
        Barn_option barnOption;
        List<Barn_shelf> barnShelfList = this.barn_shelfMapper.selectWhere(where);
        List<SKU> skuDbList = barnShelfList.stream().map(item -> new SKU(item.getId(), JsonHelper.deserialize(item.getShelf_code(), LinkedHashMap.class).values(), item.getCount(), item.getState(), false)).collect(Collectors.toList());
        List<SKU> skuList = new ArrayList<>(allCount);
        for (List<String> skuValues : skuValuesList) {
            sku = Lambda.first(skuDbList, item -> ArrayHelper.intersection(item.getValues(), skuValues).size() == skuValues.size());
            if (sku == null) {
                sku = new SKU();
                sku.setState(EState.有効.getValue());
                sku.setValues(skuValues);
                sku.setCount(Integer.valueOf(1));
                sku.setDifferent(true);
            } else {
                SKU finalSku = sku;
                barnOption = Lambda.first(barnOptionList, item -> !EState.有効.getValue().equals(item.getState()) && ArrayHelper.intersection(Arrays.stream(StringUtils.split(item.getValues(), ',')).collect(Collectors.toList()), finalSku.getValues()).size() > 0);
                if (barnOption != null) {
                    if (!sku.getState().equals(barnOption.getState())) {
                        sku.setState(barnOption.getState());
                        sku.setDifferent(true);
                    }
                }
            }
            skuList.add(sku);
        }

        List<OPT> optList = new ArrayList<>(barnOptionList.size());
        List<OPT.Value> optValueList = null;
        for (Barn_option barn_option : barnOptionList) {
            values = StringUtils.split(barn_option.getValues(), ',');
            optValueList = new ArrayList<>(values.length);
            for (String val : values) {
                optValueList.add(new OPT.Value(val, barn_option.getState()));
            }
            optList.add(new OPT(barn_option.getId(), barn_option.getName(), optValueList, barn_option.getSort(), barn_option.getState()));
        }

        if (Lambda.first(optList, item -> !EState.有効.getValue().equals(item.getState())) == null) {
            for (OPT opt : optList) {
                if (EState.有効.getValue().equals(opt.getState())) {
                    for (OPT.Value optValue : opt.getValues()) {
                        if (Lambda.first(skuList, arg -> arg.getState().equals(EState.有効.getValue()) && arg.getValues().contains(optValue.getValue())) == null) {
                            optValue.setState(EState.無効.getValue());
                        }
                    }
                }
            }
        }
        map.put(LIST, optList);
        map.put("SKU_LIST", skuList);

        map.put(BaseController.PERMISSION_CONTEXT, super.permissionContext);
        map.put(BaseController.HTML_HELPER, super.htmlHelper);

        return new ModelAndView(this.getViewName("BarnShelfSet"), map);
    }

    @RequestMapping(value = "BarnShelfListData/{ID}", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String barnShelfListData(HttpServletRequest request, @PathVariable(value = "ID", required = true) Integer barnId, @EntityResolverAttribute Barn_shelfDataFilter filter) throws Exception {
        IdFieldFilter<Integer> idFieldFilter = new IdFieldFilter<>();
        idFieldFilter.setValue(barnId);
        filter.setBarn_id(idFieldFilter);
        PagedResult<Barn_shelf> pagedResult = filter.getPageResult(this.barn_shelfMapper);
        return JsonManager.getSuccess(pagedResult.getTotalCount(), pagedResult.getResults());
    }

    @RequestMapping(value = "BarnShelfSetSave", method = RequestMethod.POST, produces = APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public String barnShelfSetSave(HttpServletRequest request) throws Exception {
        String barnId = request.getParameter("barnId");
        String name = request.getParameter("name");
        String value = request.getParameter("value");
        Integer barnID = Integer.valueOf(barnId);
        String[] names = JsonHelper.deserialize(name, String[].class);
        String[] values = JsonHelper.deserialize(value, String[].class);
        int namesLength = names.length;
        int valuesLength = values.length;
        if (namesLength > 0 && valuesLength > 0) {
            String skuId = null;
            Barn_shelf barnShelf = null;
            String[] skus;
            int i = 0, j = 0;
            JSONObject jsonObject = new JSONObject();
            List<Barn_shelf> barnShelfList = new ArrayList<>(valuesLength);
            for (; i < valuesLength; i++) {
                skus = JsonHelper.deserialize(values[i], String[].class);
                if (skus.length == namesLength) {
                    barnShelfList.add(barnShelf = new Barn_shelf());
                    barnShelf.setBarn_id(barnID);
                    j = 0;
                    skuId = skus[j++];
                    if (StringUtils.isNotBlank(skuId)) {
                        barnShelf.setId(Integer.valueOf(skuId));
                        super.updateEntityInfo(barnShelf);
                    } else {
                        super.insertEntityInfo(barnShelf);
                    }
                    barnShelf.setSort(Integer.valueOf(skus[j++]));
                    for (; j < namesLength - 2; j++) {
                        jsonObject.put(names[j], skus[j]);
                    }
                    barnShelf.setShelf_code(JsonHelper.serialize(jsonObject));
                    jsonObject.clear();
                    barnShelf.setCount(Integer.valueOf(skus[j++]));
                    barnShelf.setState(Integer.valueOf(skus[j]));
                }
            }
            this.barn_shelfService.save(barnShelfList, EState.無効.getValue());
        }
        return JsonManager.getSuccess();
    }
    // endregion
}
