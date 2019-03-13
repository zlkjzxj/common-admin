package com.xieke.admin.business.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.xieke.admin.annotation.SysLog;
import com.xieke.admin.business.entity.Project;
import com.xieke.admin.business.service.IProjectService;
import com.xieke.admin.dto.ResultInfo;
import com.xieke.admin.dto.UserInfo;
import com.xieke.admin.entity.User;
import com.xieke.admin.service.IUserService;
import com.xieke.admin.util.Constant;
import com.xieke.admin.util.PasswordEncoder;
import com.xieke.admin.util.StringUtils;
import com.xieke.admin.web.BaseController;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
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
@Controller
@RequestMapping("/project")
public class ProjectController extends BaseController {

//    @Resource
//    private IProjectService projectService;

    @RequestMapping("/*")
    public void toHtml() {
    }

    @RequestMapping("/listData")
//    @RequiresPermissions("user:view")
    public @ResponseBody
    ResultInfo<List<Project>> listData(Project project, Integer page, Integer limit) {
//        EntityWrapper<Project> wrapper = new EntityWrapper<>(project);
//        if (project != null && project.getManager() != null) {
//            wrapper.like("name", project.getName());
//            project.setManager(null);
//        }
//        Page<Project> pageObj = projectService.selectPage(new Page<>(page, limit), wrapper);
        Project project1 = new Project("2018-03-20", "111", "张三", "研发项目", "ZL123456");
        Constant.PROJECT_LIST.add(project1);

//        return new ResultInfo<>(pageObj.getRecords(), pageObj.getTotal());
        return new ResultInfo<>(Constant.PROJECT_LIST, Constant.PROJECT_LIST.size());
    }

}