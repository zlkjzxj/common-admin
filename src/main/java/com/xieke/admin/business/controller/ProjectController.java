package com.xieke.admin.business.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.xieke.admin.annotation.SysLog;
import com.xieke.admin.business.service.IProjectService;
import com.xieke.admin.dto.ProjectInfo;
import com.xieke.admin.dto.ResultInfo;
import com.xieke.admin.dto.UserInfo;
import com.xieke.admin.entity.Department;
import com.xieke.admin.entity.Permission;
import com.xieke.admin.entity.Project;
import com.xieke.admin.entity.User;
import com.xieke.admin.service.IDepartmentService;
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
import java.util.ArrayList;
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

    private final static String VIEW_ALL_PROJECT = "project:viewall";
    private final static String TOP_DEPARTMENT_ID = "1";
    @Resource
    private IProjectService iProjectService;
    @Resource
    private IDepartmentService iDepartmentService;

    @RequestMapping("/*")
    public void toHtml() {
    }

    protected UserInfo getUserInfo() {
        return (UserInfo) SecurityUtils.getSubject().getPrincipal();
    }

    @RequestMapping("/listData")
//    @RequiresPermissions("project:view")
    public @ResponseBody
    ResultInfo<List<ProjectInfo>> listData(ProjectInfo project, Integer page, Integer limit) {

        UserInfo userInfo = this.getUserInfo();
        //根据要用户权限查询是包含查询所有项目
        List<Permission> permissionList = userInfo.getRoleInfo().getPermissions();
        boolean viewall_flag = false;
        for (Permission p : permissionList) {
            if (VIEW_ALL_PROJECT.equals(p.getPermissionCode())) {
                viewall_flag = true;
                break;
            }
        }
        //定义返回列表，和返回列表总数
        List<ProjectInfo> list = new ArrayList<>();
        Integer count;

        if (TOP_DEPARTMENT_ID.equals(project.getDepartment()) || "".equals(project.getDepartment())) {
            project.setDepartment(null);
        }
        project.setViewall(viewall_flag);
        if (!viewall_flag) {
            EntityWrapper<Department> wrapper2 = new EntityWrapper<>(new Department());
            wrapper2.eq("manager", userInfo.getId());
            //老板看所有,部门经理看部门，项目经理看自己
            //根据用户去判断他是否部门主管，如果是则查小于等于他部门的所有
            Department department = iDepartmentService.selectOne(wrapper2);
            List<Integer> ids;
            if (department != null) {
                ids = iDepartmentService.getAllChildrenDepartment(userInfo.getGlbm());
                //说明有子部门
                if (!ids.isEmpty()) {
                    ids.add(userInfo.getGlbm());
                    project.setIds(ids);
                    //项目经理看自己的项目
                } else {
                    project.setDepartment(userInfo.getGlbm());
                }
            } else {
                //录入人加上，不然我添加的比人的项目我自己就看不见了
                project.setLrr(userInfo.getId());
                project.setManager(userInfo.getId());
            }
        }
        if (page != null && limit != null) {
            project.setLimit1(limit * (page - 1));
            project.setLimit2(limit);
        }
        count = iProjectService.getProjectCount(project);
        list = iProjectService.findProjectByFuzzySearchVal(project);

        return new ResultInfo<>(list, count);
    }

    @RequestMapping("/getObject")
//    @RequiresPermissions("project:view")
    public @ResponseBody
    ResultInfo<ProjectInfo> getObject(Integer id) {
        if (id != null) {
            ProjectInfo project = iProjectService.findProjectbyId(id);
            return new ResultInfo<>(project);
        }
        return new ResultInfo<>("-1", "查无数据");

    }

    @SysLog("添加项目")
    @RequestMapping("/getAddSequence")
    @RequiresPermissions("project:add")
    public @ResponseBody
    ResultInfo<Integer> getAddSequence(String year) {
        String sequence = iProjectService.getAddSequence(year);
        Integer s = Integer.parseInt(sequence) + 1;
        return new ResultInfo<>(s);
    }

    @SysLog("添加项目")
    @RequestMapping("/add")
    @RequiresPermissions("project:add")
    public @ResponseBody
    ResultInfo<Boolean> add(Project project) {
        Project newProject = new Project();
        EntityWrapper<Project> wrapper = new EntityWrapper<>(newProject);
        if (project != null && project.getNumber() != null) {
            wrapper.eq("number", project.getNumber());
            newProject.setNumber(null);
        }
        //判断此项目编号是否存在
        Project oldProject = iProjectService.selectOne(wrapper);
        if (oldProject == null) {
            User user = (User) SecurityUtils.getSubject().getPrincipal();
            project.setLrr(user.getId());
            boolean b = iProjectService.insert(project);
            return new ResultInfo<>("0", "添加成功", b);
        }
        return new ResultInfo<>("-1", "重复添加");
    }

    @SysLog("修改项目")
    @RequestMapping("/edit")
    @RequiresPermissions("project:edit")
    public @ResponseBody
    ResultInfo<Boolean> update(Project project) {

        Project oldProject = iProjectService.selectById(project.getId());

        //判断修改人是否一致
        if (oldProject != null) {
            //获取当前登录用户id
            User user = (User) SecurityUtils.getSubject().getPrincipal();
            Integer userId = user.getId();

            //判断录入人是否一致
            if (userId.equals(oldProject.getLrr())) {
                boolean b = iProjectService.updateById(project);
                return new ResultInfo<>("0", "修改成功", b);

            } else {
                //判断修改人是否为空
                if (null != oldProject.getXgr() && !"".equals(oldProject.getXgr())) {
                    if (userId.equals(oldProject.getXgr())) {
                        boolean b = iProjectService.updateById(project);
                        return new ResultInfo<>("0", "修改成功", b);
                    } else {
                        return new ResultInfo<>("-1", "修改人与上次修改人不一致！");
                    }
                } else {
                    project.setXgr(userId);
                    boolean b = iProjectService.updateById(project);
                    return new ResultInfo<>("0", "修改成功", b);
                }
            }

        }
        return new ResultInfo<>("-1", "修改错误！");
    }

    @SysLog("删除项目操作")
    @RequestMapping("/del")
    @RequiresPermissions("project:del")
    public @ResponseBody
    ResultInfo<Boolean> delBatch(Integer id) {
        boolean b = iProjectService.deleteById(id);
        return new ResultInfo<>(b);
    }

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }
}