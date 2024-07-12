package jp.com.helper;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.LocalDateTimeUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

import java.lang.management.ManagementFactory;
import java.text.ParseException;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.Objects;

/**
 * <pre>
 * Instant：时间戳
 * Duration：持续时间，时间差
 * LocalDate：只包含日期，比如：2016-10-20
 * LocalTime：只包含时间，比如：23:12:10
 * LocalDateTime：包含日期和时间，比如：2016-10-20 23:14:21
 * Period：时间段
 * ZoneOffset：时区偏移量，比如：+8:00
 * ZonedDateTime：带时区的时间
 * Clock：时钟，比如获取目前美国纽约的时间
 *
 * JDK8+日期API的封装
 *
 * https://juejin.im/post/6844903560375697422
 *
 * https://cloud.tencent.com/developer/article/1442102
 *
 * https://www.hutool.cn/docs/#/core/%E6%97%A5%E6%9C%9F%E6%97%B6%E9%97%B4/LocalDateTime%E5%B7%A5%E5%85%B7-LocalDateTimeUtil
 *
 * </pre>
 *
 * @author wangyunpeng
 * @date 2020/10/19 21:08
 */
public class Date8Helper {

    private static final org.slf4j.Logger _logger = org.slf4j.LoggerFactory.getLogger(Date8Helper.class);

    /**
     * 获取服务器启动时间
     */
    public static LocalDateTime getServerStartTime() {
        long time = ManagementFactory.getRuntimeMXBean().getStartTime();
        return fromTime(time);
    }

    /**
     * 获取当前系统时间
     *
     * @return
     */
    public static LocalDateTime now() {
        return now(ZoneId.systemDefault());
    }

    /**
     * 获取当前系统时间，指定某一个时区，例如：America/New_York
     *
     * @param zoneId
     * @return
     */
    public static LocalDateTime now(String zoneId) {
        return now(ZoneId.of(zoneId));
    }


    /**
     * 获取当前系统时间，指定某一个时区，例如：ZoneId.systemDefault()，当前默认时区
     *
     * @param zoneId
     * @return
     */
    public static LocalDateTime now(ZoneId zoneId) {
        return LocalDateTime.now(zoneId);
    }

    /**
     * 获取当前系统时间(不包含小时\分钟\秒\毫秒)
     *
     * @return 获取当前系统时间
     */
    public static LocalDate today() {
        return today(ZoneId.systemDefault());
    }

    /**
     * 获取当前系统时间(不包含小时\分钟\秒\毫秒)，例如：America/New_York
     *
     * @param zoneId
     * @return
     */
    public static LocalDate today(String zoneId) {
        return today(ZoneId.of(zoneId));
    }

    /**
     * 获取当前系统时间(不包含小时\分钟\秒\毫秒)，例如：ZoneId.systemDefault()，当前默认时区
     *
     * @param zoneId
     * @return
     */
    public static LocalDate today(ZoneId zoneId) {
        return LocalDate.now(zoneId);
    }

    /**
     * 返回从1970年1月1日午夜时分到现在经过的毫秒数
     * <p>
     * 如何从Java 8中的LocalDateTime获取毫秒数
     * https://www.itranslater.com/qa/details/2122422023900103680
     *
     * @return
     */
    public static long getTime() {
        return Instant.now().toEpochMilli();
    }

    /**
     * 返回从1970年1月1日午夜时分到指定时间经过的毫秒数
     * <p>
     * 如何从Java 8中的LocalDateTime获取毫秒数
     * https://www.itranslater.com/qa/details/2122422023900103680
     *
     * @param localDateTime 指定时间
     * @return
     */
    public static long getTime(LocalDateTime localDateTime) {
//        return java.sql.Timestamp.valueOf(localDateTime).getTime();
//        return localDateTime.toEpochSecond(ZoneOffset.UTC);
        return Objects.requireNonNull(localDateTime).atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }

    /**
     * 从从1970年1月1日午夜时分到指定时间经过的毫秒数里得到时间类型的对象
     *
     * @param milliSecond
     * @return
     */
    public static LocalDateTime fromTime(long milliSecond) {
//        return java.sql.Timestamp.from(Instant.ofEpochMilli(milliSecond)).toLocalDateTime();
        return Instant.ofEpochMilli(milliSecond).atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    /**
     * 最小时间
     *
     * @return
     */
    public static LocalDateTime minValue() {
        return LocalDateTime.MIN;
    }

    /**
     * 最大时间
     *
     * @return
     */
    public static LocalDateTime maxValue() {
        return LocalDateTime.MAX;
    }

    // region interval

    /**
     * 返回相差多久，相差多少年月日
     * 比如：2011-02-02 到  2017-03-02 相差 6年，1个月，0天
     *
     * @param startLocalDate
     * @param endLocalDate
     * @return
     */
    public static Period interval(LocalDate startLocalDate, LocalDate endLocalDate) {
        Period period = null;
        if (startLocalDate.isBefore(endLocalDate)) {
            period = Period.between(endLocalDate, startLocalDate);
        } else {
            period = Period.between(startLocalDate, endLocalDate);
        }
//        System.out.println(period.getDays());  //4
//        System.out.println(period.getMonths()); //1
        return period;
//        return "时间相差：" + period.getYears() + " 年 " + period.getMonths() + " 月 " + period.getDays() + " 天 ";
    }

    /**
     * 返回相差多少天
     *
     * @param startLocalDate
     * @param endLocalDate
     * @return
     */
    public static long intervalDays(LocalDate startLocalDate, LocalDate endLocalDate) {
        return interval(startLocalDate, endLocalDate, ChronoUnit.DAYS);
    }

    /**
     * 返回相差几个月
     *
     * @param startLocalDate
     * @param endLocalDate
     * @return
     */
    public static long intervalMonths(LocalDate startLocalDate, LocalDate endLocalDate) {
        return interval(startLocalDate, endLocalDate, ChronoUnit.MONTHS);
    }

    /**
     * 返回相差多少，单位可以自定义
     *
     * @param startLocalDateTime
     * @param endLocalDateTime
     * @param chronoUnit         相差单位（比如：天）
     * @return
     */
    public static long interval(LocalDate startLocalDate, LocalDate endLocalDate, ChronoUnit chronoUnit) {
        long until = 0L;
        if (startLocalDate.isBefore(endLocalDate)) {
            until = chronoUnit.between(startLocalDate, endLocalDate);
        } else {
            until = chronoUnit.between(endLocalDate, startLocalDate);
        }
        return until;
    }

    /**
     * 返回相差多少天
     *
     * @param startLocalDateTime
     * @param endLocalDateTime
     * @return
     */
    public static long intervalDays(LocalDateTime startLocalDateTime, LocalDateTime endLocalDateTime) {
        return interval(startLocalDateTime, endLocalDateTime, ChronoUnit.DAYS);
    }

    /**
     * 返回相差几个月
     *
     * @param startLocalDateTime
     * @param endLocalDateTime
     * @return
     */
    public static long intervalMonths(LocalDateTime startLocalDateTime, LocalDateTime endLocalDateTime) {
        return interval(startLocalDateTime, endLocalDateTime, ChronoUnit.MONTHS);
    }

    /**
     * 返回相差多少，单位可以自定义
     *
     * @param startLocalDateTime
     * @param endLocalDateTime
     * @param chronoUnit         相差单位（比如：天）
     * @return
     */
    public static long interval(LocalDateTime startLocalDateTime, LocalDateTime endLocalDateTime, ChronoUnit chronoUnit) {
        long until = 0L;
        if (startLocalDateTime.isBefore(endLocalDateTime)) {
            until = chronoUnit.between(startLocalDateTime, endLocalDateTime);
        } else {
            until = chronoUnit.between(endLocalDateTime, startLocalDateTime);
        }
        return until;
    }

    /**
     * 返回相差多久，相差多少天时分秒
     *
     * @param startDate
     * @return
     */
    public static String interval(String startDate) {
        LocalDateTime startLocalDateTime = toLocalDateTime(startDate, DatePattern.NORM_DATETIME_PATTERN);
        LocalDateTime endLocalDateTime = now();
        return interval(startLocalDateTime, endLocalDateTime);
    }

    /**
     * 返回相差多久，相差多少天时分秒
     *
     * @param startDate
     * @param endDate
     * @return
     */
    public static String interval(String startDate, String endDate) {
        LocalDateTime startLocalDateTime = toLocalDateTime(startDate, DatePattern.NORM_DATETIME_PATTERN);
        LocalDateTime endLocalDateTime = toLocalDateTime(endDate, DatePattern.NORM_DATETIME_PATTERN);
        return interval(startLocalDateTime, endLocalDateTime);
    }

    /**
     * 返回相差多久，相差多少天时分秒
     *
     * @param startLocalDateTime
     * @param endLocalDateTime
     * @return
     */
    public static String interval(LocalDateTime startLocalDateTime, LocalDateTime endLocalDateTime) {
        final long nd = 1000 * 24 * 60 * 60;
        final long nh = 1000 * 60 * 60;
        final long nm = 1000 * 60;
        final long ns = 1000;
        // 获得两个时间的毫秒时间差异
        long diff = getTime(endLocalDateTime) - getTime(startLocalDateTime);
        // 计算差多少天
        long day = diff / nd;
        // 计算差多少小时
        long hour = diff % nd / nh;
        // 计算差多少分钟
        long min = diff % nd % nh / nm;
        // 计算差多少秒//输出结果
        long sec = diff % nd % nh % nm / ns;
        return day + "天" + hour + "时" + min + "分" + sec + "秒";
    }

    // endregion

    /**
     * 只判断月份和日期是否相同，年份不判断，用来判断生日日期，账单日期
     *
     * @param firstLocalDate
     * @param secondLocalDate
     * @return
     */
    public static boolean sameMonthDay(LocalDate firstLocalDate, LocalDate secondLocalDate) {
        MonthDay firstMonthDay = MonthDay.of(firstLocalDate.getMonth(), firstLocalDate.getDayOfMonth());
        MonthDay secondMonthDay = MonthDay.of(secondLocalDate.getMonth(), secondLocalDate.getDayOfMonth());
        boolean same = firstMonthDay.equals(secondMonthDay);
        return same;
    }

    /**
     * 得到当前月最后一天的日期
     *
     * @return
     */
    public static int getLastDayOfMonth() {
        return getLastDayOfMonth(today());
    }

    /**
     * 得到某个月最后一天的日期
     *
     * @param localDate
     * @return
     */
    public static int getLastDayOfMonth(LocalDate localDate) {
        return Objects.requireNonNull(localDate).with(TemporalAdjusters.lastDayOfMonth()).getDayOfMonth();
    }

    // region LocalDateTime 转换

    /**
     * LocalDate转换为Date
     *
     * @param localDate
     * @return
     */
    public static Date localDate2Date(LocalDate localDate) {
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zonedDateTime = Objects.requireNonNull(localDate).atStartOfDay(zoneId);
        Instant instant = zonedDateTime.toInstant();
        return Date.from(instant);
    }

    /**
     * Date转换为LocalDate
     *
     * @param date
     */
    public static LocalDate date2LocalDate(Date date) {
        ZoneId zoneId = ZoneId.systemDefault();
        Instant instant = Objects.requireNonNull(date).toInstant();
        return instant.atZone(zoneId).toLocalDate();
    }

    /**
     * Date转换为LocalDateTime
     *
     * @param date
     */
    public static LocalDateTime date2LocalDateTime(Date date) {
        Instant instant = Objects.requireNonNull(date).toInstant();
        ZoneId zoneId = ZoneId.systemDefault();
        return instant.atZone(zoneId).toLocalDateTime();
    }

    /**
     * LocalDateTime转换为Date
     *
     * @param localDateTime
     */
    public static Date localDateTime2Date(LocalDateTime localDateTime) {
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zonedDateTime = Objects.requireNonNull(localDateTime).atZone(zoneId);
        Instant instant = zonedDateTime.toInstant();
        return Date.from(instant);
    }

    /**
     * LocalDate转换为LocalDateTime
     *
     * @param localDate
     * @return
     */
    public static LocalDateTime localDate2LocalDateTime(LocalDate localDate) {
        return Objects.requireNonNull(localDate).atTime(LocalTime.MIN);
    }

    /**
     * LocalTime转换为LocalDateTime，日期部分为1970年1月1日
     *
     * @param localTime
     * @return
     */
    public static LocalDateTime localTime2LocalDateTime(LocalTime localTime) {
        return Objects.requireNonNull(localTime).atDate(LocalDate.of(1970, 1, 1));
    }

    /**
     * LocalDateTime转换为LocalDate
     *
     * @param localDateTime
     * @return
     */
    public static LocalDate localDateTime2LocalDate(LocalDateTime localDateTime) {
        return Objects.requireNonNull(localDateTime).toLocalDate();
    }

    /**
     * LocalDateTime转换为LocalTime
     *
     * @param localDateTime
     * @return
     */
    public static LocalTime localDateTime2LocalTime(LocalDateTime localDateTime) {
        return Objects.requireNonNull(localDateTime).toLocalTime();
    }
    // endregion

    // region toString()

    /**
     * 得到yyyy-MM格式的字符串类型
     *
     * @param localDateTime
     * @return
     */
    public static String toStringYYYY_MM(LocalDateTime localDateTime) {
        return toString(localDateTime, DatePattern.NORM_MONTH_PATTERN);
    }

    /**
     * 得到yyyyMM格式的字符串类型
     *
     * @param localDateTime
     * @return
     */
    public static String toStringYYYYMM(LocalDateTime localDateTime) {
        return toString(localDateTime, DatePattern.SIMPLE_MONTH_PATTERN);
    }

    /**
     * 得到yyyy-MM-dd格式的字符串类型
     *
     * @param localDateTime
     * @return
     */
    public static String toStringYYYY_MM_DD(LocalDateTime localDateTime) {
        return toString(localDateTime, DatePattern.NORM_DATE_PATTERN);
    }

    /**
     * 得到yyyyMMdd格式的字符串类型
     *
     * @param localDateTime
     * @return
     */
    public static String toStringYYYYMMDD(LocalDateTime localDateTime) {
        return toString(localDateTime, DatePattern.PURE_DATE_PATTERN);
    }

    /**
     * 得到yyyy-MM-dd-HH-mm格式的字符串类型
     *
     * @param localDateTime
     * @return
     */
    public static String toStringYYYY_MM_DD_HH_MM(LocalDateTime localDateTime) {
        return toString(localDateTime, "yyyy-MM-dd HH:mm");
    }

    public static String toStringYYYY_MM_DDTHH_MM(LocalDateTime localDateTime) {
        return toString(localDateTime, "yyyy-MM-dd'T'HH:mm");
    }

    /**
     * 得到yyyyMMddHHmm格式的字符串类型
     *
     * @param localDateTime
     * @return
     */
    public static String toStringYYYYMMDDHHmm(LocalDateTime localDateTime) {
        return toString(localDateTime, "yyyyMMddHHmm");
    }

    /**
     * 得到yyyy-MM-dd HH:mm:ss格式的字符串类型
     *
     * @param localDateTime
     * @return
     */
    public static String toStringYYYY_MM_DD_HH_MM_SS(LocalDateTime localDateTime) {
        return toString(localDateTime, DatePattern.NORM_DATETIME_PATTERN);
    }

    public static String toStringYYYY_MM_DDTHH_MM_SS(LocalDateTime localDateTime) {
        return toString(localDateTime, "yyyy-MM-dd'T'HH:mm:ss");
    }

    /**
     * 得到yyyyMMddHHmmss格式的字符串类型
     *
     * @param localDateTime
     * @return
     */
    public static String toStringYYYYMMDDHHMMSS(LocalDateTime localDateTime) {
        return toString(localDateTime, DatePattern.PURE_DATETIME_PATTERN);
    }


    /**
     * 得到yyyy-MM格式的字符串类型
     *
     * @param localDate
     * @return
     */
    public static String toStringYYYY_MM(LocalDate localDate) {
        return toString(localDate, DatePattern.NORM_MONTH_PATTERN);
    }

    /**
     * 得到yyyyMM格式的字符串类型
     *
     * @param localDate
     * @return
     */
    public static String toStringYYYYMM(LocalDate localDate) {
        return toString(localDate, DatePattern.SIMPLE_MONTH_PATTERN);
    }

    /**
     * 得到yyyy-MM-dd格式的字符串类型
     *
     * @param localDate
     * @return
     */
    public static String toStringYYYY_MM_DD(LocalDate localDate) {
        return toString(localDate, DatePattern.NORM_DATE_PATTERN);
    }

    /**
     * 得到yyyyMMdd格式的字符串类型
     *
     * @param localDate
     * @return
     */
    public static String toStringYYYYMMDD(LocalDate localDate) {
        return toString(localDate, DatePattern.PURE_DATE_PATTERN);
    }

    /**
     * 得到自定义格式的字符串类型
     *
     * @param localDateTime
     * @param format
     * @return
     */
    public static String toString(LocalDateTime localDateTime, String format) {
        return LocalDateTimeUtil.format(localDateTime, format);
    }

    /**
     * 得到自定义格式的字符串类型
     *
     * @param localDate
     * @param format
     * @return
     */
    public static String toString(LocalDate localDate, String format) {
        return LocalDateTimeUtil.format(localDate, format);
    }

    @Deprecated
    public static String toStringYYYY_MM(Date date) {
        return toString(date, DatePattern.NORM_MONTH_PATTERN);
    }

    @Deprecated
    public static String toStringYYYYMM(Date date) {
        return toString(date, DatePattern.SIMPLE_MONTH_PATTERN);
    }

    @Deprecated
    public static String toStringYYYY_MM_DD(Date date) {
        return toString(date, DatePattern.NORM_DATE_PATTERN);
    }

    @Deprecated
    public static String toStringYYYYMMDD(Date date) {
        return toString(date, DatePattern.PURE_DATE_PATTERN);
    }

    @Deprecated
    public static String toStringYYYY_MM_DD_HH_MM(Date date) {
        return toString(date, "yyyy-MM-dd HH:mm");
    }

    @Deprecated
    public static String toStringYYYY_MM_DDTHH_MM(Date date) {
        return toString(date, "yyyy-MM-dd'T'HH:mm");
    }

    @Deprecated
    public static String toStringYYYYMMDDHHmm(Date date) {
        return toString(date, "yyyyMMddHHmm");
    }

    @Deprecated
    public static String toStringYYYY_MM_DD_HH_MM_SS(Date date) {
        return toString(date, DatePattern.NORM_DATETIME_PATTERN);
    }

    @Deprecated
    public static String toStringYYYY_MM_DDTHH_MM_SS(Date date) {
        return toString(date, "yyyy-MM-dd'T'HH:mm:ss");
    }

    @Deprecated
    public static String toStringYYYYMMDDHHMMSS(Date date) {
        return toString(date, DatePattern.PURE_DATETIME_PATTERN);
    }

    @Deprecated
    public static String toString(Date date, String format) {
        return DateFormatUtils.format(date, format);
    }
    // endregion toString

    // region toLocalDateTime()

    /**
     * 转成LocalDateTime类型
     *
     * @param year
     * @param month
     * @param day
     * @param hour
     * @param minute
     * @param second
     * @return
     */
    public static LocalDateTime toLocalDateTime(int year, int month, int day, int hour, int minute, int second) {
        return LocalDateTime.of(year, month, day, hour, minute, second);
    }

    /**
     * 将自定义格式的字符串转成LocalDateTime类型
     *
     * @param dateTime
     * @param pattern
     * @return
     */
    public static LocalDateTime toLocalDateTime(String dateTime, String pattern) {
        if (StringUtils.isEmpty(dateTime)) {
            return null;
        }
        return LocalDateTimeUtil.parse(dateTime, pattern);
    }

    public static LocalDateTime toLocalDateTime(LocalDate localDate) {
        return localDate.atStartOfDay();
    }

    /**
     * 将yyyy-MM格式的字符串转成LocalDateTime类型
     *
     * @param dateTime
     * @return
     */
    public static LocalDateTime toLocalDateTimeYYYY_MM(String dateTime) {
        return toLocalDateTime(dateTime, DatePattern.NORM_MONTH_PATTERN);
    }

    /**
     * 将yyyyMM格式的字符串转成LocalDateTime类型
     *
     * @param dateTime
     * @return
     */
    public static LocalDateTime toLocalDateTimeYYYYMM(String dateTime) {
        return toLocalDateTime(dateTime, DatePattern.SIMPLE_MONTH_PATTERN);
    }

    /**
     * 将yyyy-MM-dd格式的字符串转成LocalDateTime类型
     *
     * @param dateTime
     * @return
     */
    public static LocalDateTime toLocalDateTimeYYYY_MM_DD(String dateTime) {
        return toLocalDateTime(dateTime, DatePattern.NORM_DATE_PATTERN);
    }

    /**
     * 将yyyyMMdd格式的字符串转成LocalDateTime类型
     *
     * @param dateTime
     * @return
     */
    public static LocalDateTime toLocalDateTimeYYYYMMDD(String dateTime) {
        return toLocalDateTime(dateTime, DatePattern.PURE_DATE_PATTERN);
    }

    /**
     * 将yyyy-MM-dd HH:mm格式的字符串转成LocalDateTime类型
     *
     * @param dateTime
     * @return
     */
    public static LocalDateTime toLocalDateTimeYYYY_MM_DD_HH_MM(String dateTime) {
        return toLocalDateTime(dateTime, "yyyy-MM-dd HH:mm");
    }

    /**
     * 将yyyy-MM-ddTHH:mm格式的字符串转成LocalDateTime类型
     *
     * @param dateTime
     * @return
     */
    public static LocalDateTime toLocalDateTimeYYYY_MM_DDTHH_MM(String dateTime) {
        return toLocalDateTime(dateTime, "yyyy-MM-dd'T'HH:mm");
    }


    /**
     * 将yyyy-MM-dd HH:mm:ss格式的字符串转成LocalDateTime类型
     *
     * @param dateTime
     * @return
     */
    public static LocalDateTime toLocalDateTimeYYYY_MM_DD_HH_MM_SS(String dateTime) {
        return toLocalDateTime(dateTime, DatePattern.NORM_DATETIME_PATTERN);
    }

    /**
     * 将yyyy-MM-ddTHH:mm:ss格式的字符串转成LocalDateTime类型
     *
     * @param dateTime
     * @return
     */
    public static LocalDateTime toLocalDateTimeYYYY_MM_DDTHH_MM_SS(String dateTime) {
        return toLocalDateTime(dateTime, "yyyy-MM-dd'T'HH:mm:ss");
    }

    /**
     * 将yyyyMMddHHmmss格式的字符串转成LocalDateTime类型
     *
     * @param dateTime
     * @return
     */
    public static LocalDateTime toLocalDateTimeYYYYMMDDHHMMSS(String dateTime) {
        return toLocalDateTime(dateTime, DatePattern.PURE_DATETIME_PATTERN);
    }
    // endregion toLocalDateTime()

    // region toLocalDate()

    /**
     * 转成LocalDate类型
     *
     * @param year
     * @param month
     * @param day
     * @return
     */
    public static LocalDate toLocalDate(int year, int month, int day) {
        return LocalDate.of(year, month, day);
    }

    /**
     * 将自定义格式的字符串转成LocalDate类型
     *
     * @param date
     * @param pattern
     * @return
     */
    public static LocalDate toLocalDate(String date, String pattern) {
        if (StringUtils.isEmpty(date)) {
            return null;
        }
        return LocalDateTimeUtil.parseDate(date, pattern);
    }

    public static LocalDate toLocalDate(LocalDateTime localDateTime) {
        return localDateTime.toLocalDate();
    }

    /**
     * 将yyyy-MM格式的字符串转成LocalDate类型
     *
     * @param date
     * @return
     */
    public static LocalDate toLocalDateYYYY_MM(String date) {
        return toLocalDate(date, DatePattern.NORM_MONTH_PATTERN);
    }

    /**
     * 将yyyyMM格式的字符串转成LocalDate类型
     *
     * @param date
     * @return
     */
    public static LocalDate toLocalDateYYYYMM(String date) {
        return toLocalDate(date, DatePattern.SIMPLE_MONTH_PATTERN);
    }

    /**
     * 将yyyy-MM-dd格式的字符串转成LocalDate类型
     *
     * @param date
     * @return
     */
    public static LocalDate toLocalDateYYYY_MM_DD(String date) {
        return toLocalDate(date, DatePattern.NORM_DATE_PATTERN);
    }

    /**
     * 将yyyyMMdd格式的字符串转成LocalDate类型
     *
     * @param date
     * @return
     */
    public static LocalDate toLocalDateYYYYMMDD(String date) {
        return toLocalDate(date, DatePattern.PURE_DATE_PATTERN);
    }
    // endregion toLocalDate()

    // region toDate()

    @Deprecated
    public static Date toDateYYYY_MM(String date) {
        return toDate(date, DatePattern.NORM_MONTH_PATTERN);
    }

    @Deprecated
    public static Date toDateYYYYMM(String date) {
        return toDate(date, DatePattern.SIMPLE_MONTH_PATTERN);
    }

    @Deprecated
    public static Date toDateYYYY_MM_DD(String date) {
        return toDate(date, DatePattern.NORM_DATE_PATTERN);
    }

    @Deprecated
    public static Date toDateYYYYMMDD(String date) {
        return toDate(date, DatePattern.PURE_DATE_PATTERN);
    }

    @Deprecated
    public static Date toDate(String date, String... format) {
        Date result = null;
        try {
            result = DateUtils.parseDate(date, format);
        } catch (ParseException e) {
            LoggerHelper.error(_logger, e, "toDate");
        }
        return result;
    }
    // endregion toDate()

    // region addDays

    /**
     * 以天为单位给指定日期增加天数
     *
     * @param dateTime
     * @param days
     * @return
     */
    public static LocalDateTime addDays(LocalDateTime dateTime, Integer days) {
        return addDays(dateTime, days.longValue());
    }

    /**
     * 以天为单位给指定日期增加天数
     *
     * @param dateTime
     * @param days
     * @return
     */
    public static LocalDateTime addDays(LocalDateTime dateTime, Long days) {
        return addDays(dateTime, days.longValue());
    }

    /**
     * 以天为单位给指定日期增加天数
     *
     * @param dateTime
     * @param days
     * @return
     */
    public static LocalDateTime addDays(LocalDateTime dateTime, int days) {
        return addDays(dateTime, Integer.valueOf(days).longValue());
    }

    /**
     * 以天为单位给指定日期增加天数
     *
     * @param dateTime
     * @param days
     * @return
     */
    public static LocalDateTime addDays(LocalDateTime dateTime, long days) {
        return Objects.requireNonNull(dateTime).plusDays(days);
    }

    /**
     * 以天为单位给指定日期增加天数
     *
     * @param date
     * @param days
     * @return
     */
    public static LocalDate addDays(LocalDate date, Integer days) {
        return addDays(date, days.longValue());
    }

    /**
     * 以天为单位给指定日期增加天数
     *
     * @param date
     * @param days
     * @return
     */
    public static LocalDate addDays(LocalDate date, Long days) {
        return addDays(date, days.longValue());
    }

    /**
     * 以天为单位给指定日期增加天数
     *
     * @param date
     * @param days
     * @return
     */
    public static LocalDate addDays(LocalDate date, int days) {
        return addDays(date, Integer.valueOf(days).longValue());
    }

    /**
     * 以天为单位给指定日期增加天数
     *
     * @param date
     * @param days
     * @return
     */
    public static LocalDate addDays(LocalDate date, long days) {
        return Objects.requireNonNull(date).plusDays(days);
    }

    // endregion addDays

    // region addMonths

    /**
     * 以月为单位给指定日期增加月数
     *
     * @param dateTime
     * @param months
     * @return
     */
    public static LocalDateTime addMonths(LocalDateTime dateTime, Integer months) {
        return addMonths(dateTime, months.longValue());
    }

    /**
     * 以月为单位给指定日期增加月数
     *
     * @param dateTime
     * @param months
     * @return
     */
    public static LocalDateTime addMonths(LocalDateTime dateTime, Long months) {
        return addMonths(dateTime, months.longValue());
    }

    /**
     * 以月为单位给指定日期增加月数
     *
     * @param dateTime
     * @param months
     * @return
     */
    public static LocalDateTime addMonths(LocalDateTime dateTime, int months) {
        return addMonths(dateTime, Integer.valueOf(months).longValue());
    }

    /**
     * 以月为单位给指定日期增加月数
     *
     * @param dateTime
     * @param months
     * @return
     */
    public static LocalDateTime addMonths(LocalDateTime dateTime, long months) {
        return Objects.requireNonNull(dateTime).plusMonths(months);
    }

    /**
     * 以月为单位给指定日期增加月数
     *
     * @param date
     * @param months
     * @return
     */
    public static LocalDate addMonths(LocalDate date, Integer months) {
        return addMonths(date, months.longValue());
    }

    /**
     * 以月为单位给指定日期增加月数
     *
     * @param date
     * @param months
     * @return
     */
    public static LocalDate addMonths(LocalDate date, Long months) {
        return addMonths(date, months.longValue());
    }

    /**
     * 以月为单位给指定日期增加月数
     *
     * @param date
     * @param months
     * @return
     */
    public static LocalDate addMonths(LocalDate date, int months) {
        return addMonths(date, Integer.valueOf(months).longValue());
    }

    /**
     * 以月为单位给指定日期增加月数
     *
     * @param date
     * @param months
     * @return
     */
    public static LocalDate addMonths(LocalDate date, long months) {
        return Objects.requireNonNull(date).plusMonths(months);
    }

    // endregion addMonths

    // region addYears

    /**
     * 以年为单位给指定日期增加年数
     *
     * @param dateTime
     * @param years
     * @return
     */
    public static LocalDateTime addYears(LocalDateTime dateTime, Integer years) {
        return addYears(dateTime, years.longValue());
    }

    /**
     * 以年为单位给指定日期增加年数
     *
     * @param dateTime
     * @param years
     * @return
     */
    public static LocalDateTime addYears(LocalDateTime dateTime, Long years) {
        return addYears(dateTime, years.longValue());
    }

    /**
     * 以年为单位给指定日期增加年数
     *
     * @param dateTime
     * @param years
     * @return
     */
    public static LocalDateTime addYears(LocalDateTime dateTime, int years) {
        return addYears(dateTime, Integer.valueOf(years).longValue());
    }

    /**
     * 以年为单位给指定日期增加年数
     *
     * @param dateTime
     * @param years
     * @return
     */
    public static LocalDateTime addYears(LocalDateTime dateTime, long years) {
        return Objects.requireNonNull(dateTime).plusYears(years);
    }

    /**
     * 以年为单位给指定日期增加年数
     *
     * @param date
     * @param years
     * @return
     */
    public static LocalDate addYears(LocalDate date, Integer years) {
        return addYears(date, years.longValue());
    }

    /**
     * 以年为单位给指定日期增加年数
     *
     * @param date
     * @param years
     * @return
     */
    public static LocalDate addYears(LocalDate date, Long years) {
        return addYears(date, years.longValue());
    }

    /**
     * 以年为单位给指定日期增加年数
     *
     * @param date
     * @param years
     * @return
     */
    public static LocalDate addYears(LocalDate date, int years) {
        return addYears(date, Integer.valueOf(years).longValue());
    }

    /**
     * 以年为单位给指定日期增加年数
     *
     * @param date
     * @param years
     * @return
     */
    public static LocalDate addYears(LocalDate date, long years) {
        return Objects.requireNonNull(date).plusYears(years);
    }

    // endregion addYears

    public static void main(String[] args) {

        LocalDateTime now = now();
        System.out.println(now);

        String string = toStringYYYYMMDDHHMMSS(now);
        System.out.println(string);

        now = toLocalDateTimeYYYYMMDDHHMMSS(string);
        System.out.println(now);

        string = toStringYYYYMMDD(now);
        System.out.println(string);

        now = toLocalDateTimeYYYYMMDD(string);
        System.out.println(now);

        LocalDate today = today();
        System.out.println(today);

        int lastDay = getLastDayOfMonth(LocalDate.of(2021, 2, 2));
        System.out.println(lastDay);

        //查看当前的时区
        ZoneId defaultZone = ZoneId.systemDefault();
        System.out.println(defaultZone); //Asia/Shanghai

//查看美国纽约当前的时间
        ZoneId america = ZoneId.of("America/New_York");
        LocalDateTime shanghaiTime = LocalDateTime.now();
        LocalDateTime americaDateTime = LocalDateTime.now(america);
        System.out.println(shanghaiTime); //2016-11-06T15:20:27.996
        System.out.println(americaDateTime); //2016-11-06T02:20:27.996 ，可以看到美国与北京时间差了13小时

        //带有时区的时间
        ZonedDateTime americaZoneDateTime = ZonedDateTime.now(america);
        System.out.println(americaZoneDateTime); //2016-11-06T02:23:44.863-05:00[America/New_York]

        now = toLocalDateTime(2021, 2, 18, 12, 12, 12);
        long time = getTime(now);
        System.out.println(time);

        now = fromTime(time);
        System.out.println(now);

        time = getTime();
        System.out.println(time);

        time = getTime(americaDateTime);
        System.out.println(time);

        LocalDate kAISHIBI = Date8Helper.toLocalDateYYYYMM("201202");
        LocalDate sYURYOUBI = Date8Helper.toLocalDateYYYYMM("201205");

        long intervalMonths = Date8Helper.intervalMonths(sYURYOUBI, kAISHIBI);
        System.out.println(intervalMonths);

        long intervalDays = Date8Helper.intervalDays(sYURYOUBI, kAISHIBI);
        System.out.println(intervalDays);
    }
}
