package com.xieke.admin.web;

import com.xieke.admin.dto.RoleInfo;
import com.xieke.admin.dto.TopDirectoryInfo;
import com.xieke.admin.dto.UserInfo;
import com.xieke.admin.entity.Permission;
import com.xieke.admin.entity.User;
import com.xieke.admin.ex.BusinessException;
import com.xieke.admin.service.IPermissionService;
import com.xieke.admin.service.IUserService;
import com.xieke.admin.util.Constant;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.session.Session;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * @author xieke
 */
@Controller
public class HomeController extends BaseController{

    @Resource
    private IPermissionService iPermissionService;

    @Resource
    private IUserService iUserService;

    @RequestMapping("/*")
    public void toHtml(){

    }

    @RequestMapping({"/","/index"})
    public String index(Model model){

        List<TopDirectoryInfo> topDirectoryList = new ArrayList<>();
        //获取当前用户角色信息
        UserInfo userInfo = this.getUserInfo();
        RoleInfo roleInfo = userInfo.getRoleInfo();
        List<Permission> permissionList = iPermissionService.getTopDirectoryPermissions();
        if(permissionList != null){
            for (Permission ps : permissionList) {
                if(roleInfo.getPermissionIds().contains(","+ps.getId()+",")){
                    topDirectoryList.add(new TopDirectoryInfo(ps.getPermissionName(),ps.getPermissionCode()));
                }
            }
        }
        model.addAttribute("topDirectoryList",topDirectoryList);

        return "index";
    }

    @RequestMapping("/login")
    public String login(HttpServletRequest request) throws BusinessException {

        logger.info("HomeController.login()");

        // 判断是否已登录，如果已登录直接跳转到首页
        UserInfo userInfo = this.getUserInfo();
        if (userInfo != null){
            return "redirect:/";
        }

        // 登录失败从request中获取shiro处理的异常信息.
        // shiroLoginFailure:就是shiro异常类的全类名.
        String exception = (String) request.getAttribute("shiroLoginFailure");
        logger.info("exception=" + exception);
        Session session = SecurityUtils.getSubject().getSession();
        if (exception != null) {
            if (AccountException.class.getName().equals(exception)) {
                logger.info("AccountException ---> 账号或密码错误！");
                throw new BusinessException("1", "账号或密码错误！");
            }else if(IncorrectCredentialsException.class.getName().equals(exception)){
                //密码最多错误输入5次
                int loginErrorCount = Integer.parseInt(session.getAttribute(Constant.LOGIN_ERROR_COUNT) + "");
                if(++loginErrorCount == Constant.MAX_LOGIN_ERROR_NUM){
                    //锁定账号
                    User user = iUserService.selectById(Integer.parseInt(session.getAttribute(Constant.LOGIN_USER_ID) + ""));
                    user.setState(2);
                    iUserService.updateById(user);
                }
                session.setAttribute(Constant.LOGIN_ERROR_COUNT, loginErrorCount);
                logger.info("AccountException ---> 密码错误！");
                throw new BusinessException(Constant.YES_ERROR, "密码错误，您还有" + (Constant.MAX_LOGIN_ERROR_NUM - loginErrorCount) + "机会！");
            }
            else if(DisabledAccountException.class.getName().equals(exception)) {
                logger.info("DisabledAccountException ---> 账号已禁用！");
                throw new BusinessException(Constant.YES_ERROR, "账号已禁用！");
            } else if(LockedAccountException.class.getName().equals(exception)) {
                logger.info("LockedAccountException ---> 账号已锁定！");
                throw new BusinessException(Constant.YES_ERROR, "账号已锁定，请联系管理员解锁！");
            } else if ("kaptchaValidateFailed".equals(exception)) {
                logger.info("kaptchaValidateFailed ---> 验证码错误！");
                throw new BusinessException(Constant.YES_ERROR, "验证码错误！");
            } else {
                logger.info("else ---> " + exception);
                throw new BusinessException(Constant.YES_ERROR, "未知错误！");
            }
        }
        //初始化登录错误次数
        session.setAttribute(Constant.LOGIN_ERROR_COUNT, 0);
        //记录登录IP地址
        session.setAttribute(Constant.LOGIN_IP_ADDRESS, this.getIpAddress(request));

        // 此方法不处理登录成功,由shiro进行处理

        return "login";
    }

}