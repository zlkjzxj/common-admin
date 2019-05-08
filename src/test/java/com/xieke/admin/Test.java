package com.xieke.admin;

import java.util.regex.Pattern;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-05-08 16:13
 */
public class Test {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
        boolean b = pattern.matcher("111.00").matches();
        System.out.println(b);
    }
}
