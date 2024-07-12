package jp.com.filterexpression;

import jp.com.helper.JsonHelper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * 本类只能在Spring MVC结构中，对Action方法里参数的类型进行定制赋值的操作。
 * 本类只能用来查询，本类等同于ASP.NET MVC中的EntityFilter.cs文件。
 * 
 * @author wangyunpeng
 *
 */
@SuppressWarnings({ "rawtypes", "unchecked" })
public class EntityResolver implements HandlerMethodArgumentResolver {

	/**
	 * 解析Request请求中的参数
	 * 参考文章:
	 * http://blog.csdn.net/truong/article/details/30971317
	 */
	public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest,
			WebDataBinderFactory webDataBinderFactory) throws Exception {

		String filter = nativeWebRequest.getParameter("filter");
		if (StringUtils.isBlank(filter)) {
			return null;
		}

		Class type = methodParameter.getParameterType();
		IDataFilter dataFilter = (IDataFilter) JsonHelper.deserialize(filter, type);
		if (dataFilter == null) {
			return null;
		}
		String pageNumber = nativeWebRequest.getParameter("pageNumber");
		String pageSize = nativeWebRequest.getParameter("pageSize");
		if (StringUtils.isBlank(pageNumber)) {
			pageNumber = String.valueOf(Pager.Min.getPageNumber());
		}
		if (StringUtils.isBlank(pageSize)) {
			pageSize = String.valueOf(Pager.Max.getPageSize());
		}
		if (dataFilter.getPager() == null) {
			dataFilter.setPager(new Pager(Integer.parseInt(pageNumber), Integer.parseInt(pageSize)));
		} else {
			dataFilter.getPager().setPageNumber(Integer.parseInt(pageNumber));
			dataFilter.getPager().setPageSize(Integer.parseInt(pageSize));
		}
		return dataFilter;
	}

	/**
	 * 设置Spring MVC中Action方法里面使用的注解类型
	 */
	public boolean supportsParameter(MethodParameter methodParameter) {
		return methodParameter.hasParameterAnnotation(EntityResolverAttribute.class);
	}

}
