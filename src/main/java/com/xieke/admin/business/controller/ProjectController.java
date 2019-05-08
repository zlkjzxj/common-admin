package com.xieke.admin.business.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.xieke.admin.annotation.SysLog;
import com.xieke.admin.business.service.IProjectService;
import com.xieke.admin.dto.ProjectCountInfo;
import com.xieke.admin.dto.ProjectInfo;
import com.xieke.admin.dto.ResultInfo;
import com.xieke.admin.dto.UserInfo;
import com.xieke.admin.entity.Department;
import com.xieke.admin.entity.Permission;
import com.xieke.admin.entity.Project;
import com.xieke.admin.entity.User;
import com.xieke.admin.service.IDepartmentService;
import com.xieke.admin.util.StringUtils;
import com.xieke.admin.web.BaseController;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.xieke.admin.util.Constant.ZJBJ;

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

    @Override
    protected UserInfo getUserInfo() {
        return (UserInfo) SecurityUtils.getSubject().getPrincipal();
    }

    @RequestMapping("/listData")
//    @RequiresPermissions("project:view")
    public @ResponseBody
    ResultInfo<List<ProjectInfo>> listData(ProjectInfo project, Integer page, Integer limit) {
        //先转义合同金额和回款金额
        String splitChar = "-";
        String htje = project.getHtje();
        if (!StringUtils.isEmpty(htje)) {
            if (project.getHtje().indexOf(splitChar) > 0) {
                project.setHtje1(Double.parseDouble(htje.split("-")[0]));
                project.setHtje2(Double.parseDouble(htje.split("-")[1]));
            } else {
                project.setHtje1(Double.parseDouble(htje));
            }
        }
        String htqk = project.getHkqk();
        if (!StringUtils.isEmpty(htqk)) {
            if (project.getHkqk().indexOf(splitChar) > 0) {
                project.setYhje1(Double.parseDouble(htqk.split("-")[0]));
                project.setYhje2(Double.parseDouble(htqk.split("-")[1]));
            } else {
                project.setYhje1(Double.parseDouble(htqk));
            }
        }

        UserInfo userInfo = this.getUserInfo();
        //根据要用户权限查询是包含查询所有项目
        List<Permission> permissionList = userInfo.getRoleInfo().getPermissions();
        boolean viewAllFlag = false;
        for (Permission p : permissionList) {
            if (VIEW_ALL_PROJECT.equals(p.getPermissionCode())) {
                viewAllFlag = true;
                break;
            }
        }
        //定义返回列表，和返回列表总数
        List<ProjectInfo> list;
        Integer count;

        if (TOP_DEPARTMENT_ID.equals(project.getDepartment()) || "".equals(project.getDepartment())) {
            project.setDepartment(null);
        }
        project.setViewall(viewAllFlag);
        if (!viewAllFlag) {
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
    ResultInfo<String> getAddSequence(String year) {
        String sequence = iProjectService.getAddSequence(year);
        Integer s;
        if (sequence == null) {
            //初始值
            s = 002;
        } else {
            s = Integer.parseInt(sequence) + 1;
        }

        String s1 = String.format("%03d", s);
        return new ResultInfo<>("1", "查询序列成功", s1);
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
            UserInfo user = this.getUserInfo();
            project.setLrr(user.getId());
            boolean b = iProjectService.insert(project);
            return new ResultInfo<>("0", "添加成功", b);
        }
        return new ResultInfo<>("-1", "重复添加");
    }

    @SysLog("修改项目")
    @RequestMapping("/edit")
    @RequiresPermissions("project:edit")
    @Transactional
    public @ResponseBody
    ResultInfo<Boolean> update(Project project) {

        Project oldProject = iProjectService.selectById(project.getId());

        //判断修改人是否一致
        if (oldProject != null) {
            //获取当前登录用户id
            UserInfo user = this.getUserInfo();
            Integer userId = user.getId();
            //判断是否追加，如果追加则新生成一个项目
            if (ZJBJ.equals(project.getSfzj())) {
                EntityWrapper<Project> wrapper = new EntityWrapper<>();
                wrapper.eq("number", project.getNumber() + "-1");
                Project oldZjProject = iProjectService.selectOne(wrapper);
                if (oldZjProject == null) {
                    Project zjProject = new Project();
                    zjProject.setName(project.getName());
                    zjProject.setNumber(project.getNumber() + "-1");
                    zjProject.setSfzj(project.getSfzj());
                    zjProject.setSflx(project.getSflx());
                    zjProject.setLxsj(project.getLxsj());
                    zjProject.setDepartment(project.getDepartment());
                    zjProject.setManager(project.getManager());
                    zjProject.setRjkfjd(project.getRjkfjd());
                    zjProject.setFawcqk(project.getFawcqk());
                    zjProject.setCpxxwcqk(project.getCpxxwcqk());
                    zjProject.setZbzzwcqk(project.getZbzzwcqk());
                    zjProject.setYzjhbqd(project.getYzjhbqd());
                    zjProject.setHtqd(project.getHtqd());
                    zjProject.setYjcg(project.getYjcg());
                    zjProject.setSgqr(project.getSgqr());
                    zjProject.setJcjd(project.getJcjd());
                    zjProject.setLrr(user.getId());
                    iProjectService.updateById(project);
                    boolean b = iProjectService.insert(zjProject);
                    return new ResultInfo<>("0", "追加成功", b);
                }
            }

            //判断录入人是否一致
            if (userId.equals(oldProject.getLrr())) {
                boolean b = iProjectService.updateById(project);
                return new ResultInfo<>("0", "修改成功", b);

            } else {
                project.setXgr(userId);
                boolean b = iProjectService.updateById(project);
                return new ResultInfo<>("0", "修改成功", b);
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

    @RequestMapping("/getProjectCountByDepartment")
    public @ResponseBody
    ResultInfo<List<ProjectCountInfo>> getProjectCountByDepartment() {
        List<ProjectCountInfo> projectCountInfoList = iProjectService.getProjectCountByDepartment();
        return new ResultInfo<>(projectCountInfoList);
    }

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }
}