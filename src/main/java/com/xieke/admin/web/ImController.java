package com.xieke.admin.web;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.google.common.primitives.ImmutableIntArray;
import com.xieke.admin.annotation.SysLog;
import com.xieke.admin.dto.ResultInfo;
import com.xieke.admin.dto.UserInfo;
import com.xieke.admin.entity.*;
import com.xieke.admin.service.IUserService;
import com.xieke.admin.util.PasswordEncoder;
import com.xieke.admin.util.StringUtils;
import lombok.val;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.session.Session;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.security.auth.Subject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 系统用户表 前端控制器
 * </p>
 *
 * @author Auto Generator
 * @since 2018-07-10
 */
@RestController
@RequestMapping("/im")
public class ImController extends BaseController {

    @Resource
    private IUserService iUserService;

    @GetMapping("/getInit")
    public ResultInfo<ImInit> getImInit() {
        Session session = SecurityUtils.getSubject().getSession();
        UserInfo userInfo = (UserInfo) session.getAttribute("user");
        //获取用户信息
        ImMine imMine = new ImMine();
        imMine.setId(userInfo.getId());
        imMine.setUsername(userInfo.getName());
        imMine.setSign(userInfo.getSign());
        imMine.setStatus("online");
        imMine.setAvatar(userInfo.getAvatar());

        List<ImMine> imMineList = new ArrayList<>();
        User u = new User();
        List<User> userList = iUserService.selectList(new EntityWrapper<>(u));
        userList.forEach(user -> {
            ImMine mine = new ImMine(user.getName(), user.getId(), "online", user.getSign(), user.getAvatar());
            imMineList.add(mine);
        });
        //friend
        ImFriend imFriend = new ImFriend();
        imFriend.setGroupname("中林好友");
        imFriend.setId(1);
        imFriend.setList(imMineList);
        List<ImFriend> imFriendList = new ArrayList<>();
        imFriendList.add(imFriend);
        // grpup
        List<ImGroup> groupList = new ArrayList<>();
        groupList.add(new ImGroup("西安研发部", "101", userInfo.getAvatar()));
        groupList.add(new ImGroup("财务部", "102", userInfo.getAvatar()));
        ImInit imInit = new ImInit();
        imInit.setMine(imMine);
        imInit.setFriend(imFriendList);
        imInit.setGroup(groupList);
        return new ResultInfo(imInit);
    }

    @GetMapping("/getMembers")
    public ResultInfo<ImInit> getMembers(String id) {

        List<ImMine> imMineList = new ArrayList<>();
        User u = new User();
        u.setGlbm(6);
        List<User> userList = iUserService.selectList(new EntityWrapper<>(u));
        userList.forEach(user -> {
            ImMine mine = new ImMine(user.getName(), user.getId(),user.getSign(), user.getAvatar());
            imMineList.add(mine);
        });
        return new ResultInfo(imMineList);
    }

}