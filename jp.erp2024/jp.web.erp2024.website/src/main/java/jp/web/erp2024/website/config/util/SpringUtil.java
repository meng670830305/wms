package jp.web.erp2024.website.config.util;

import jakarta.servlet.ServletContext;
import jp.com.helper.Lambda;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 * <pre>
 * spring帮助类，方便在非spring管理环境中获取对象的操作
 * </pre>
 *
 * @author wangyunpeng
 * @date 2021/1/21 18:14
 * @wechat wyp_blog
 */
@Component
public class SpringUtil implements BeanFactoryPostProcessor, ApplicationContextAware {
    /**
     *
     */
    private static ConfigurableListableBeanFactory _BeanFactory;
    /**
     * Spring应用上下文环境
     */
    private static ApplicationContext _ApplicationContext;

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        _BeanFactory = beanFactory;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        _ApplicationContext = applicationContext;
    }

    /**
     * 获取指定名称的对象
     *
     * @param name
     * @param <T>
     * @return 一个以所给名字注册的bean的实例
     * @throws BeansException
     */
    public static <T> T getBean(String name) throws BeansException {
        return (T) _BeanFactory.getBean(name);
    }

    /**
     * 获取指定类型的对象
     *
     * @param clz 指定类型
     * @param <T>
     * @return
     * @throws BeansException
     */
    public static <T> T getBean(Class<T> clz) throws BeansException {
        T result = (T) _BeanFactory.getBean(clz);
        return result;
    }

    /**
     * 获取指定名称的对象
     *
     * @param servletContext
     * @param beanName
     * @return
     */
    public static Object getBean(ServletContext servletContext, String beanName) {
        //通过WebApplicationContextUtils 得到Spring容器的实例。
        WebApplicationContext application = WebApplicationContextUtils.getWebApplicationContext(servletContext);
        //返回Bean的实例。
        return application.getBean(beanName);
    }

    /**
     * 是否包含指定名称的对象
     *
     * @param name
     * @return
     */
    public static boolean containsBean(String name) {
        return _BeanFactory.containsBean(name);
    }

    /**
     * 获取指定名称的类型
     *
     * @param name
     * @return 注册对象的类型
     * @throws NoSuchBeanDefinitionException
     */
    public static Class<?> getType(String name) throws NoSuchBeanDefinitionException {
        return _BeanFactory.getType(name);
    }

    /**
     * 判断以给定名字注册的bean定义是一个singleton还是一个prototype。
     * 如果与给定名字相应的bean定义没有被找到，将会抛出一个异常（NoSuchBeanDefinitionException）
     *
     * @param name
     * @return
     * @throws NoSuchBeanDefinitionException
     */
    public static boolean isSingleton(String name) throws NoSuchBeanDefinitionException {
        return _BeanFactory.isSingleton(name);
    }

    /**
     * 如果给定的bean名字在bean定义中有别名，则返回这些别名
     *
     * @param name
     * @return
     * @throws NoSuchBeanDefinitionException
     */
    public static String[] getAliases(String name) throws NoSuchBeanDefinitionException {
        return _BeanFactory.getAliases(name);
    }

    /**
     * 获取aop代理对象
     *
     * @param invoker
     * @param <T>
     * @return
     */
    public static <T> T getAopProxy(T invoker) {
        return (T) AopContext.currentProxy();
    }

    /**
     * 获取当前的环境配置，无配置返回null
     *
     * @return 当前的环境配置
     */
    public static String[] getActiveProfiles() {
        return _ApplicationContext.getEnvironment().getActiveProfiles();
    }

    /**
     * 获取当前的环境配置，当有多个环境配置时，只获取第一个
     *
     * @return 当前的环境配置
     */
    public static String getActiveProfile() {
        final String[] activeProfiles = getActiveProfiles();
        return Lambda.first(activeProfiles);
    }

    /**
     * 获取某一个属性值
     *
     * @param propertyName 属性名称
     * @return
     */
    public static String getProperty(String propertyName) {
        return _ApplicationContext.getEnvironment().getProperty(propertyName);
    }
}
