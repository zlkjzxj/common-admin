package com.xieke.admin.web;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.plugins.pagination.PageHelper;
import com.xieke.admin.annotation.SysLog;
import com.xieke.admin.dto.ResultInfo;
import com.xieke.admin.dto.UserInfo;
import com.xieke.admin.entity.User;
import com.xieke.admin.service.IUserService;
import com.xieke.admin.util.Constant;
import com.xieke.admin.util.PasswordEncoder;
import com.xieke.admin.util.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.session.Session;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.xieke.admin.util.Constant.DEFAULT_AVATAR;
import static com.xieke.admin.util.Constant.DEFAULT_PASS;

/**
 * <p>
 * 系统用户表 前端控制器
 * </p>
 *
 * @author Auto Generator
 * @since 2018-07-10
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController {

    @Resource
    private IUserService iUserService;

    @RequestMapping("/*")
    public void toHtml() {

    }

    @RequestMapping("/unlock")
    @ResponseBody
    public ResultInfo<Boolean> unlock(@RequestParam("password") String password) {
        UserInfo userInfo = this.getUserInfo();
        SimpleHash simpleHash = new SimpleHash("md5", password, userInfo.getCredentialsSalt(), 2);
        if (simpleHash.toString().equals(userInfo.getPassWord())) {
            return new ResultInfo<>(true);
        }
        return new ResultInfo<>(false);
    }

    @RequestMapping("/listData")
//    @RequiresPermissions("user:view")
    public @ResponseBody
    ResultInfo<List<User>> listData(User user, Integer page, Integer limit) {
        EntityWrapper<User> wrapper = new EntityWrapper<>(user);
        if (user != null && user.getUserName() != null) {
            wrapper.like("user_name", user.getUserName());
            user.setUserName(null);
        }
        if (user != null && user.getName() != null) {
            wrapper.like("name", user.getName());
            user.setName(null);
        }
        if (user != null && user.getGlbm() != null) {
            //是宜元中林的时候取消掉部门参数
            if (user.getGlbm() != 1) {
                wrapper.eq("glbm", user.getGlbm());
            }
            user.setGlbm(null);
        }
        Page<User> pageObj = iUserService.selectPage(new Page<>(page, limit), wrapper);
        return new ResultInfo<>(pageObj.getRecords(), pageObj.getTotal());
    }

    @RequestMapping("/listDataSelect")
//    @RequiresPermissions("user:view")
    public @ResponseBody
    ResultInfo<List<User>> listDataSelect(User user) {
        EntityWrapper<User> wrapper = new EntityWrapper<>(user);
        if (user != null && user.getGlbm() != null) {
            wrapper.eq("glbm", user.getGlbm());
            user.setGlbm(null);
        }
        List<User> userList = iUserService.selectList(wrapper);
        return new ResultInfo<>(userList);
    }

    @SysLog("添加用户操作")
    @RequestMapping("/add")
    @RequiresPermissions("user:add")
    public @ResponseBody
    ResultInfo<Boolean> add(User user) {
        User oldUser = iUserService.findUserInfo(user.getUserName());
        if (oldUser != null) {
            return new ResultInfo<>("此登录名称已经存在！");
        }
        Map<String, String> map = PasswordEncoder.enCodePassWord(user.getUserName(), user.getPassWord());
        user.setSalt(map.get(PasswordEncoder.SALT));
        user.setPassWord(map.get(PasswordEncoder.PASSWORD));
        user.setAvatar(DEFAULT_AVATAR);
        boolean b = iUserService.insert(user);
        return new ResultInfo<>(b);
    }

    @SysLog("删除用户操作")
    @RequestMapping("/delBatch")
    @RequiresPermissions("user:del")
    public @ResponseBody
    ResultInfo<Boolean> delBatch(Integer[] idArr) {
        boolean b = iUserService.deleteBatchIds(Arrays.asList(idArr));
        return new ResultInfo<>(b);
    }

    @SysLog("修改用户操作")
    @RequestMapping("/edit")
    @RequiresPermissions("user:edit")
    public @ResponseBody
    ResultInfo<Boolean> edit(User user) {
        User us = iUserService.selectById(user.getId());
        us.setName(user.getName());
        us.setUserName(user.getUserName());
        us.setRoleId(user.getRoleId());
        us.setState(user.getState());
        us.setGlbm(user.getGlbm());
        boolean b = iUserService.updateById(us);
        return new ResultInfo<>(b);
    }

    @SysLog("本人修改用户操作")
    @RequestMapping("/userEdit")
    public @ResponseBody
    ResultInfo<Boolean> userEdit(@RequestParam("avatarFile") MultipartFile avatarFile, User user) {
        UserInfo userInfo = this.getUserInfo();
        User us = iUserService.selectById(userInfo.getId());
        String avatarStr = "";
        if (avatarFile != null) {
            try {
                avatarStr = Base64Utils.encodeToString(avatarFile.getBytes());
                us.setAvatar(Constant.BASE64_PIC_HEADER + avatarStr);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if (!StringUtils.isEmpty(user.getName())) {
            us.setName(user.getName());
        }
        if (!StringUtils.isEmpty(user.getPassWord())) {
            Map<String, String> map = PasswordEncoder.enCodePassWord(us.getUserName(), user.getPassWord());
            us.setSalt(map.get(PasswordEncoder.SALT));
            us.setPassWord(map.get(PasswordEncoder.PASSWORD));
        }
        boolean b = iUserService.updateById(us);
        Session session = SecurityUtils.getSubject().getSession();
        if (b && !"".equals(avatarStr)) {
            session.setAttribute("avatar", Constant.BASE64_PIC_HEADER + avatarStr);
        }
        if (b && !StringUtils.isEmpty(user.getName())) {
            session.setAttribute("userName", userInfo.getName());
        }
        return new ResultInfo<>(b);
    }

    @SysLog("本人修改用户密码")
    @RequestMapping("/userPassEdit")
    public @ResponseBody
    ResultInfo<Boolean> userPassEdit(User user) {
        UserInfo userInfo = this.getUserInfo();
        User us = iUserService.selectById(userInfo.getId());
        if (!StringUtils.isEmpty(user.getPassWord())) {
            Map<String, String> map = PasswordEncoder.enCodePassWord(us.getUserName(), user.getPassWord());
            us.setSalt(map.get(PasswordEncoder.SALT));
            us.setPassWord(map.get(PasswordEncoder.PASSWORD));
        }
        boolean b = iUserService.updateById(us);
        return new ResultInfo<>(b);
    }

    @SysLog("重置密码")
    @RequestMapping("/resetPass")
    public @ResponseBody
    ResultInfo<Boolean> resetPass(User user) {
        User us = iUserService.selectById(user.getId());
        if (us != null) {
            Map<String, String> map = PasswordEncoder.enCodePassWord(us.getUserName(), DEFAULT_PASS);
            us.setSalt(map.get(PasswordEncoder.SALT));
            us.setPassWord(map.get(PasswordEncoder.PASSWORD));
            boolean b = iUserService.updateById(us);
            return new ResultInfo<>(b);
        }
        return new ResultInfo<>("重置密码失败");
    }

    @RequestMapping("/centerDate")
    public @ResponseBody
    ResultInfo<UserInfo> centerDate() {
        UserInfo userInfo = this.getUserInfo();
        BeanUtils.copyProperties(iUserService.selectById(userInfo.getId()), userInfo);
        return new ResultInfo<>(userInfo);
    }


    /**
     * 查询用户数量
     */
    @RequestMapping("/count")
    public @ResponseBody
    ResultInfo<Integer> count() {
        return new ResultInfo<>(iUserService.selectCount(new EntityWrapper<>()));
    }

}