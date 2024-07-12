package jp.web.erp2024.website.config.event;

import jp.com.helper.LoggerHelper;
import jp.db.erp2024.pojo.Account_user;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class UserEventListener implements ApplicationListener<UserEvent> {

    private final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    @Override
    public void onApplicationEvent(UserEvent userEvent) {
        Object source = userEvent.getSource();
        Account_user accountUser = userEvent.getAccountUser();
        // 处理事件，实际项目中可以通知别的微服务或者处理其他逻辑等等
        LoggerHelper.info(this.logger, "事件源：{}, 用户邮箱：{}", source.getClass().getTypeName(), accountUser.getEmail());
    }
}
