package jp.com.helper;

import cn.hutool.crypto.SecureUtil;
import org.apache.commons.lang3.tuple.Pair;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.UUID;

/**
 * <pre>
 * 安全类型
 * </pre>
 *
 * @author wangyunpeng
 * @date 2021/1/26 8:29
 * @wechat wyp_blog
 */
public class SecurityHelper {

    /**
     * MD5加密
     *
     * @param plainText
     * @return
     */
    public static String Md5(String plainText) {
        return SecureUtil.md5(plainText);
    }

    /**
     * 使用PBKDF2WithHmacSHA1算法分别生成Salt和Pwd的值（新增时使用）
     * 如果需要添加用户，保存salt和散列后的密码到数据存储设备
     * 可以和.net里Rfc2898DeriveBytes算法结果互相验证通过
     *
     * @param password 明文的密码
     * @return (密文后的pwd, 密文后的salt)
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     */
    public static Pair<String, String> getPwdHashAndSalt(String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
        char[] passwords = password.toCharArray();
        byte[] salts = getSalt();
        PBEKeySpec pbeKeySpec = new PBEKeySpec(passwords, salts, 1000, 32 * 8);
        SecretKeyFactory pbkdf2WithHmacSHA1 = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] pwdHashs = pbkdf2WithHmacSHA1.generateSecret(pbeKeySpec).getEncoded();
        return Pair.of(toHex(pwdHashs), toHex(salts));
    }

    /**
     * 根据参数pwd、salt使用PBKDF2WithHmacSHA1算法生成Pwd的值（判断合法性时使用）
     * 如果需要验证用户，从数据存储设备中读取salt，使用salt来计算出密码的散列值，并且与保存在数据存储设备中的密文密码进行比较
     * 可以和.net里Rfc2898DeriveBytes算法结果互相验证通过
     *
     * @param password       明文的密码
     * @param pwdHashAndSalt (密文后的pwd, 密文后的salt)
     * @return
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     */
    public static boolean validatePassword(String password, Pair<String, String> pwdHashAndSalt) throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] orgiPwdHashs = fromHex(pwdHashAndSalt.getLeft());
        byte[] salts = fromHex(pwdHashAndSalt.getRight());
        PBEKeySpec pbeKeySpec = new PBEKeySpec(password.toCharArray(), salts, 1000, orgiPwdHashs.length * 8);
        SecretKeyFactory pbkdf2WithHmacSHA1 = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] descPwdHashs = pbkdf2WithHmacSHA1.generateSecret(pbeKeySpec).getEncoded();
        int diff = orgiPwdHashs.length ^ descPwdHashs.length;
        for (int i = 0; i < orgiPwdHashs.length && i < descPwdHashs.length; i++) {
            diff |= orgiPwdHashs[i] ^ descPwdHashs[i];
        }
        return diff == 0;
    }

    /**
     * 得到salt字节数组
     *
     * @return 盐
     * @throws NoSuchAlgorithmException
     */
    private static byte[] getSalt() throws NoSuchAlgorithmException {
        //随机数
        SecureRandom sha1PRNG = SecureRandom.getInstance("SHA1PRNG");
        byte[] salts = new byte[16];
        sha1PRNG.nextBytes(salts);
        return salts;
    }

    /**
     * 将字节数组转base64字符串（或十六进制字符串）
     *
     * @param array 字节数组
     * @return base64字符串（或十六进制字符串）
     */
    private static String toHex(byte[] array) {
        return UtilHelper.toBase64String(array);
//        BigInteger bi = new BigInteger(1, array);
//        String hex = bi.toString(16);
//        int paddingLength = (array.length * 2) - hex.length();
//        if(paddingLength > 0)
//        {
//            return String.format("%0"  +paddingLength + "d", 0) + hex;
//        }else{
//            return hex;
//        }
    }

    /**
     * 将base64字符串转字节数组（将十六进制字符串转字节数组）
     *
     * @param hex base64字符串（或十六进制字符串）
     * @return 字节数组
     */
    private static byte[] fromHex(String hex) {
        return UtilHelper.fromBase64String(hex);
//        byte[] bytes = new byte[hex.length() / 2];
//        for(int i = 0; i<bytes.length ;i++)
//        {
//            bytes[i] = (byte)Integer.parseInt(hex.substring(2 * i, 2 * i + 2), 16);
//        }
//        return bytes;
    }

    public static void main(String[] args) throws NoSuchAlgorithmException, InvalidKeySpecException {
        for (int i = 0; i < 2; i++) {
            String password = UUID.randomUUID().toString();
            System.out.println(password);
            Pair<String, String> pwdHashAndSalt = getPwdHashAndSalt(password);
            System.out.println(pwdHashAndSalt);
            boolean matched = validatePassword(password, pwdHashAndSalt);
            System.out.println(matched);
        }

        String pwd = "8e8757db-409c-441a-8c91-f65b846a2d51";
        String pwdHash, salt, pwdNewHash;
        pwdHash = "bu25h6b7bSo55NTA2EMbA0Iuw3JmeUy5KmtEy91huao=";
        salt = "2NseEQNj+WjCykyhau1j7xwB3/jeFWyvOggjG7A9Fdo=";
        Pair<String, String> pwdHashAndSalt = Pair.of(pwdHash, salt);
        boolean matched = validatePassword(pwd, pwdHashAndSalt);
        System.out.println(matched);
    }
}
