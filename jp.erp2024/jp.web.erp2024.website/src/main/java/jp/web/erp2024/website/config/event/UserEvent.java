package jp.web.erp2024.website.config.event;

import jp.db.erp2024.pojo.Account_user;
import org.springframework.context.ApplicationEvent;

public class UserEvent extends ApplicationEvent {
    private Account_user accountUser;

    public UserEvent(Object source, Account_user accountUser) {
        super(source);
        this.accountUser = accountUser;
    }

    public Account_user getAccountUser() {
        return accountUser;
    }

    public void setAccountUser(Account_user accountUser) {
        this.accountUser = accountUser;
    }
}
