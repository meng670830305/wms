package jp.web.erp2024.website.service;

import cn.hutool.core.io.file.FileNameUtil;
import cn.hutool.core.util.CharsetUtil;
import jakarta.annotation.Resource;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeUtility;
import jp.com.helper.LoggerHelper;
import jp.web.erp2024.website.config.exception.WebException;
import jp.web.erp2024.website.config.util.SpringUtil;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.DeprecatedConfigurationProperty;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.Objects;

@Service
public class MailService {

    /**
     * Logger for this class
     */
    private final org.slf4j.Logger _logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    /**
     * Spring Boot 提供了一个发送邮件的简单抽象，使用的是下面这个接口，这里直接注入即可使用
     */
    @Resource
    private JavaMailSender mailSender;

    /**
     * 配置文件中我的qq邮箱
     */
    @Value("${spring.mail.from}")
    private String from;

    private String activeProfile = SpringUtil.getActiveProfile();

    private final String profile = "prod";

    // region 简单文本邮件

    /**
     * 简单文本邮件
     *
     * @param to      收件人
     * @param subject 主题
     * @param content 内容
     */
    public void sendSimpleMail(String to, String subject, String content) {
        this.sendSimpleMail(this.from, to, subject, content);
    }

    /**
     * 简单文本邮件
     *
     * @param from    发件人
     * @param to      收件人
     * @param subject 主题
     * @param content 内容
     */
    public void sendSimpleMail(String from, String to, String subject, String content) {
        this.sendSimpleMail(this.mailSender, from, to, subject, content);
    }

    /**
     * 简单文本邮件
     *
     * @param mailSender 发送邮件的对象
     * @param from       发件人
     * @param to         收件人
     * @param subject    主题
     * @param content    内容
     */
    public void sendSimpleMail(JavaMailSender mailSender, String from, String to, String subject, String content) {
        //if (true) {
        //    LoggerHelper.info(this._logger, "プロジェクト環境でのみメールを送信する。件名「{}」", subject);
        //    return;
        //}
        if (!StringUtils.equalsIgnoreCase(this.activeProfile, this.profile)) {
            LoggerHelper.info(this._logger, "プロジェクト環境でのみメールを送信する。件名「{}」", subject);
            try {
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return;
        }
        //创建SimpleMailMessage对象
        SimpleMailMessage message = new SimpleMailMessage();
        //邮件发送人
        message.setFrom(Objects.requireNonNull(from));
        //邮件接收人
        message.setTo(Objects.requireNonNull(to));
        //邮件主题
        message.setSubject(Objects.requireNonNull(subject));
        //邮件内容
        message.setText(Objects.requireNonNull(content));
        //发送邮件
        mailSender.send(message);
    }

    // endregion 简单文本邮件

    // region html邮件

    /**
     * html邮件
     *
     * @param to      收件人
     * @param cc      抄送人
     * @param subject 主题
     * @param content 内容
     */
    public void sendHtmlMail(String to, String cc, String subject, String content) {
        this.sendHtmlMail(this.from, to, cc, subject, content);
    }

    /**
     * html邮件
     *
     * @param from    发件人
     * @param to      收件人
     * @param cc      抄送人
     * @param subject 主题
     * @param content 内容
     */
    public void sendHtmlMail(String from, String to, String cc, String subject, String content) {
        this.sendHtmlMail(from, to, cc, null, subject, content);
    }

    /**
     * html邮件
     *
     * @param from    发件人
     * @param to      收件人
     * @param cc      抄送人
     * @param bcc     暗送人
     * @param subject 主题
     * @param content 内容
     */
    public void sendHtmlMail(String from, String to, String cc, String bcc, String subject, String content) {
        this.sendHtmlMail(this.mailSender, from, to, cc, bcc, subject, content);
    }

    /**
     * html邮件
     *
     * @param mailSender 发送邮件的对象
     * @param from       发件人
     * @param to         收件人
     * @param cc         抄送人
     * @param bcc        暗送人
     * @param subject    主题
     * @param content    内容
     */
    public void sendHtmlMail(JavaMailSender mailSender, String from, String to, String cc, String bcc, String subject, String content) {
        String[] tos = null, ccs = null, bccs = null;
        if (StringUtils.isNotBlank(to)) {
            //邮件接收人
            tos = StringUtils.split(to, ',');
            for (int i = 0; i < tos.length; i++) {
                tos[i] = StringUtils.trim(tos[i]);
            }
        }
        if (StringUtils.isNotBlank(cc)) {
            //邮件抄送人
            ccs = StringUtils.split(cc, ',');
            for (int i = 0; i < ccs.length; i++) {
                ccs[i] = StringUtils.trim(ccs[i]);
            }
        }
        if (StringUtils.isNotBlank(bcc)) {
            //邮件暗送人
            bccs = StringUtils.split(bcc, ',');
            for (int i = 0; i < bccs.length; i++) {
                bccs[i] = StringUtils.trim(bccs[i]);
            }
        }
        this.sendHtmlMail(mailSender, from, tos, ccs, bccs, subject, content);
    }

    /**
     * html邮件
     *
     * @param mailSender 发送邮件的对象
     * @param from       发件人
     * @param tos        收件人
     * @param ccs        抄送人
     * @param bccs       暗送人
     * @param subject    主题
     * @param content    内容
     */
    public void sendHtmlMail(JavaMailSender mailSender, String from, String[] tos, String[] ccs, String[] bccs, String subject, String content) {
        //if (true) {
        //    LoggerHelper.info(this._logger, "プロジェクト環境でのみメールを送信する。件名「{}」", subject);
        //    return;
        //}
        if (!StringUtils.equalsIgnoreCase(this.activeProfile, this.profile)) {
            LoggerHelper.info(this._logger, "プロジェクト環境でのみメールを送信する。件名「{}」", subject);
            try {
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return;
        }
        try {
            //获取MimeMessage对象
            MimeMessage message = this.mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            //邮件发送人
            helper.setFrom(Objects.requireNonNull(from));
            String to;
            if (ArrayUtils.isNotEmpty(tos)) {
                //邮件接收人
                for (int i = 0; i < tos.length; i++) {
                    tos[i] = StringUtils.trim(tos[i]);
                }
                helper.setTo(tos);
                to = StringUtils.join(tos, "; ");
            } else {
                to = "";
            }
            String cc;
            if (ArrayUtils.isNotEmpty(ccs)) {
                //邮件抄送人
                for (int i = 0; i < ccs.length; i++) {
                    ccs[i] = StringUtils.trim(ccs[i]);
                }
                helper.setCc(ccs);
                cc = StringUtils.join(ccs, "; ");
            } else {
                cc = "";
            }
            String bcc;
            if (ArrayUtils.isNotEmpty(bccs)) {
                //邮件暗送人
                for (int i = 0; i < bccs.length; i++) {
                    bccs[i] = StringUtils.trim(bccs[i]);
                }
                helper.setBcc(bccs);
                bcc = StringUtils.join(bccs, "; ");
            } else {
                bcc = "";
            }
            //邮件主题
            helper.setSubject(Objects.requireNonNull(subject));
            //邮件内容，html格式
            helper.setText(Objects.requireNonNull(content), true);
            //日志信息
            LoggerHelper.debug(this._logger, "電子メールを送信している。件名「{}」", subject);
            LoggerHelper.debug(this._logger, "電子メールを送信している。to「{}」cc「{}」bcc「{}」", to, cc, bcc);
            //发送邮件
            mailSender.send(message);
            //日志信息
            LoggerHelper.debug(this._logger, "電子メールを送信完了でした。to「{}」cc「{}」bcc「{}」", to, cc, bcc);
        } catch (MessagingException e) {
            LoggerHelper.error(this._logger, e, "電子メールを送信失敗しました。");
        }
    }
    // endregion html邮件

    // region 带附件的html邮件

    /**
     * 带附件的html邮件
     *
     * @param to             收件人
     * @param cc             抄送人
     * @param subject        主题
     * @param content        内容
     * @param attachmentFile 附件
     */
    public void sendAttachmentsHtmlMail(String to, String cc, String subject, String content, String attachmentFile) {
        this.sendAttachmentsHtmlMail(this.from, to, cc, subject, content, attachmentFile);
    }

    /**
     * 带附件的html邮件
     *
     * @param from           发件人
     * @param to             收件人
     * @param cc             抄送人
     * @param subject        主题
     * @param content        内容
     * @param attachmentFile 附件
     */
    public void sendAttachmentsHtmlMail(String from, String to, String cc, String subject, String content, String attachmentFile) {
        this.sendAttachmentsHtmlMail(from, to, cc, null, subject, content, attachmentFile);
    }

    /**
     * 带附件的html邮件
     *
     * @param from            发件人
     * @param to              收件人
     * @param cc              抄送人
     * @param bcc             暗送人
     * @param subject         主题
     * @param content         内容
     * @param attachmentFiles 附件
     */
    public void sendAttachmentsHtmlMail(String from, String to, String cc, String bcc, String subject, String content, String attachmentFile) {
        this.sendAttachmentsHtmlMail(this.mailSender, from, to, cc, bcc, subject, content, attachmentFile);
    }

    /**
     * 带附件的html邮件
     *
     * @param mailSender      发送邮件的对象
     * @param from            发件人
     * @param to              收件人
     * @param cc              抄送人
     * @param bcc             暗送人
     * @param subject         主题
     * @param content         内容
     * @param attachmentFiles 附件
     */
    public void sendAttachmentsHtmlMail(JavaMailSender mailSender, String from, String to, String cc, String bcc, String subject, String content, String... attachmentFiles) {
        String[] tos = null, ccs = null, bccs = null;
        if (StringUtils.isNotBlank(to)) {
            //邮件接收人
            tos = StringUtils.split(to, ',');
        }
        if (StringUtils.isNotBlank(cc)) {
            //邮件抄送人
            ccs = StringUtils.split(cc, ',');
        }
        if (StringUtils.isNotBlank(bcc)) {
            //邮件暗送人
            bccs = StringUtils.split(bcc, ',');
        }
        this.sendAttachmentsHtmlMail(mailSender, from, tos, ccs, bccs, subject, content, attachmentFiles);
    }

    /**
     * 带附件的html邮件
     *
     * @param mailSender      发送邮件的对象
     * @param from            发件人
     * @param tos             收件人
     * @param ccs             抄送人
     * @param bccs            暗送人
     * @param subject         主题
     * @param content         内容
     * @param attachmentFiles 附件
     */
    public void sendAttachmentsHtmlMail(JavaMailSender mailSender, String from, String[] tos, String[] ccs, String[] bccs, String subject, String content, String... attachmentFiles) {
        //if (true) {
        //    LoggerHelper.info(this._logger, "プロジェクト環境でのみメールを送信する。件名「{}」", subject);
        //    return;
        //}
        if (!StringUtils.equalsIgnoreCase(this.activeProfile, this.profile)) {
            LoggerHelper.info(this._logger, "プロジェクト環境でのみメールを送信する。件名「{}」", subject);
            try {
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return;
        }
        try {
            //获取MimeMessage对象
            MimeMessage message = this.mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            //邮件发送人
            helper.setFrom(Objects.requireNonNull(from));
            String to;
            if (ArrayUtils.isNotEmpty(tos)) {
                //邮件接收人
                for (int i = 0; i < tos.length; i++) {
                    tos[i] = StringUtils.trim(tos[i]);
                }
                helper.setTo(tos);
                to = StringUtils.join(tos, "; ");
            } else {
                to = "";
            }
            String cc;
            if (ArrayUtils.isNotEmpty(ccs)) {
                //邮件抄送人
                for (int i = 0; i < ccs.length; i++) {
                    ccs[i] = StringUtils.trim(ccs[i]);
                }
                helper.setCc(ccs);
                cc = StringUtils.join(ccs, "; ");
            } else {
                cc = "";
            }
            String bcc;
            if (ArrayUtils.isNotEmpty(bccs)) {
                //邮件暗送人
                for (int i = 0; i < bccs.length; i++) {
                    bccs[i] = StringUtils.trim(bccs[i]);
                }
                helper.setBcc(bccs);
                bcc = StringUtils.join(bccs, "; ");
            } else {
                bcc = "";
            }
            //邮件主题
            helper.setSubject(Objects.requireNonNull(subject));
            //邮件内容，html格式
            helper.setText(Objects.requireNonNull(content), true);
            //邮件附件
            String fileName, fileExtension;
            File file;
            for (String attachmentFile : attachmentFiles) {
                file = new File(attachmentFile);
                fileName = FileNameUtil.getName(file);
                if (StringUtils.isEmpty(fileName)) {
                    throw new WebException(String.format("残念、ディスクに添付ファイル「%s」がありません。", attachmentFile));
                }
                fileExtension = "." + FileNameUtil.getSuffix(file);
                fileName = encodeWord(fileName.replace(fileExtension, ""));
                helper.addAttachment(fileName + fileExtension, new FileSystemResource(file));
            }
            helper.setEncodeFilenames(true);
            //日志信息
            LoggerHelper.info(this._logger, "添付ファイル電子メールを送信している。件名「{}」", subject);
            LoggerHelper.info(this._logger, "添付ファイル電子メールを送信している。to「{}」cc「{}」bcc「{}」", to, cc, bcc);
            //发送邮件
            mailSender.send(message);
            //日志信息
            LoggerHelper.info(this._logger, "添付ファイル電子メールを送信完成しました。to「{}」cc「{}」bcc「{}」", to, cc, bcc);
        } catch (Exception e) {
            LoggerHelper.error(this._logger, e, "添付ファイル電子メールを送信失敗しました。");
        }
    }

    @Async("asyncServiceExecutor")
    public synchronized void sendAttachmentsHtmlMailAsync(JavaMailSender mailSender, String from, String to, String cc, String bcc, String subject, String content, String... attachmentFiles) {
        this.sendAttachmentsHtmlMail(mailSender, from, to, cc, bcc, subject, content, attachmentFiles);
    }

    @Async("asyncServiceExecutor")
    public synchronized void sendAttachmentsHtmlMailAsync(JavaMailSender mailSender, String from, String[] tos, String[] ccs, String[] bccs, String subject, String content, String... attachmentFiles) {
        this.sendAttachmentsHtmlMail(mailSender, from, tos, ccs, bccs, subject, content, attachmentFiles);
    }
    // endregion 带附件的html邮件

    // region 使用thymeleaf模版文件发送邮件

    /**
     * 使用thymeleaf模版文件发送带附件的html邮件
     *
     * @param to              收件人
     * @param subject         主题
     * @param templateFile    模版文件（不要以"/"开头）
     * @param map             数据
     * @param attachmentFiles 附件
     */
    public void sendThymeleafMail(TemplateEngine templateEngine, String to, String subject, String templateFile, Map<String, Object> map, String... attachmentFiles) {
        this.sendThymeleafMail(templateEngine, this.from, to, subject, templateFile, map, attachmentFiles);
    }

    /**
     * 使用thymeleaf模版文件发送带附件的html邮件
     *
     * @param from            发件人
     * @param to              收件人
     * @param subject         主题
     * @param templateFile    模版文件（不要以"/"开头）
     * @param map             数据
     * @param attachmentFiles 附件
     */
    public void sendThymeleafMail(TemplateEngine templateEngine, String from, String to, String subject, String templateFile, Map<String, Object> map, String... attachmentFiles) {
        this.sendThymeleafMail(templateEngine, this.mailSender, from, to, subject, templateFile, map, attachmentFiles);
    }

    /**
     * 使用thymeleaf模版文件发送带附件的html邮件
     *
     * @param mailSender      发送邮件的对象
     * @param from            发件人
     * @param to              收件人
     * @param subject         主题
     * @param templateFile    模版文件（不要以"/"开头）
     * @param map             数据
     * @param attachmentFiles 附件
     */
    public void sendThymeleafMail(TemplateEngine templateEngine, JavaMailSender mailSender, String from, String to, String subject, String templateFile, Map<String, Object> map, String... attachmentFiles) {
        Context context = new Context();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            context.setVariable(entry.getKey(), entry.getValue());
        }
        String content = templateEngine.process(templateFile, context);
        this.sendAttachmentsHtmlMail(mailSender, from, to, null, null, subject, content, attachmentFiles);
    }

    @Async("asyncServiceExecutor")
    public synchronized void sendThymeleafMailAsync(TemplateEngine templateEngine, JavaMailSender mailSender, String from, String to, String subject, String templateFile, Map<String, Object> map, String... attachmentFiles) {
        this.sendThymeleafMail(templateEngine, mailSender, from, to, subject, templateFile, map, attachmentFiles);
    }

    // endregion 使用thymeleaf模版文件发送邮件

    /**
     * 邮件里面带附件文件名的编码方式
     *
     * @param fileName
     * @return
     * @throws UnsupportedEncodingException
     */
    @Deprecated
    @DeprecatedConfigurationProperty(reason = "不用这个方法，还是有乱码出现，改用encodeWord(String)这个方法。")
    private static String encodeText(String fileName) throws UnsupportedEncodingException {
        return MimeUtility.encodeText(fileName, CharsetUtil.UTF_8, "B");//"B","Q"
    }

    /**
     * 邮件里面带附件文件名的编码方式
     *
     * @param fileName
     * @return
     * @throws UnsupportedEncodingException
     */
    private static String encodeWord(String fileName) throws UnsupportedEncodingException {
        return MimeUtility.encodeWord(fileName, CharsetUtil.UTF_8, "B");//"B","Q"
    }

}
