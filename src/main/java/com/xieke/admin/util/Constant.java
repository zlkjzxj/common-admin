package com.xieke.admin.util;

import com.xieke.admin.business.entity.Project;
import com.xieke.admin.entity.Department;

import java.util.ArrayList;
import java.util.List;

/**
 * 常量工具类
 *
 * @author 邪客
 */
public class Constant {

    //登录错误次数统计
    public static String LOGIN_ERROR_COUNT = "loginErrorCount";
    //最大登录错误次数
    public static int MAX_LOGIN_ERROR_NUM = 5;
    //登录用户ID
    public static String LOGIN_USER_ID = "loginUserId";
    //登录IP地址
    public static String LOGIN_IP_ADDRESS = "loginIpAddress";
    //有错误
    public static String YES_ERROR = "1";
    //无错误
    public static String NOT_ERROR = "0";

    //测试Project 的list
    public static final List<Project> PROJECT_LIST = new ArrayList<>();
    public static final List<Department> DEP_LIST = new ArrayList<>();
//    public static final List<DepTree> DEPTREE_LIST = new ArrayList<>();

}
