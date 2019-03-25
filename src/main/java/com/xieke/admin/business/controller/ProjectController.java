package com.xieke.admin.business.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.xieke.admin.annotation.SysLog;
import com.xieke.admin.business.service.IProjectService;
import com.xieke.admin.dto.ResultInfo;
import com.xieke.admin.entity.Project;
import com.xieke.admin.entity.User;
import com.xieke.admin.web.BaseController;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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

    @Resource
    private IProjectService iProjectService;

    @RequestMapping("/*")
    public void toHtml() {
    }

    @RequestMapping("/listData")
    @RequiresPermissions("project:view")
    public @ResponseBody
    ResultInfo<List<Project>> listData(Project project, Integer page, Integer limit) {
        EntityWrapper<Project> wrapper = new EntityWrapper<>(project);
        if (project != null && project.getDepartment() != null) {
            wrapper.eq("department", project.getDepartment());
            project.setDepartment(null);
        }
        Page<Project> pageObj = iProjectService.selectPage(new Page<>(page, limit), wrapper);

        return new ResultInfo<>(pageObj.getRecords(), pageObj.getSize());
    }

    @SysLog("添加项目")
    @RequestMapping("/add")
    @RequiresPermissions("project:add")
    public @ResponseBody
    ResultInfo<Boolean> add(Project project) {
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        project.setLrr(user.getId());
        return new ResultInfo<>(iProjectService.insert(project));
    }

    @SysLog("修改项目")
    @RequestMapping("/edit")
    @RequiresPermissions("project:edit")
    public @ResponseBody
    ResultInfo<Boolean> update(Project project) {
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        project.setLrr(user.getId());
        return new ResultInfo<>(iProjectService.updateById(project));
    }

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }
}