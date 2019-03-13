package com.xieke.admin.web;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.xieke.admin.dto.ResultInfo;
import com.xieke.admin.entity.Department;
import com.xieke.admin.service.IDepartmentService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
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
@RequestMapping("/dept")
public class DeptController extends BaseController {

    @Resource
    private IDepartmentService iDepartmentService;

    @RequestMapping("/*")
    public void toHtml() {

    }


    @RequestMapping("/listData")
    @RequiresPermissions("dept:view")
    public @ResponseBody
    ResultInfo<List<Department>> listData(Department department, Integer page, Integer limit) {
        page = 1;
        limit = 10;
        EntityWrapper<Department> wrapper = new EntityWrapper<>(department);
        if (department != null && department.getBmmc() != null) {
            wrapper.like("bmmc", department.getBmmc());
            department.setBmmc(null);
        }
        Page pageObj = iDepartmentService.selectPage(new Page<>(page, limit), wrapper);
//        List<Department> list = iDepartmentService.selectList(wrapper);
        return new ResultInfo<>(pageObj.getRecords(), pageObj.getTotal());
    }

}