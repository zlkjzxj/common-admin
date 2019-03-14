package com.xieke.admin.web;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.xieke.admin.annotation.SysLog;
import com.xieke.admin.dto.ResultInfo;
import com.xieke.admin.entity.Department;
import com.xieke.admin.entity.TreeNode;
import com.xieke.admin.entity.User;
import com.xieke.admin.service.IDepartmentService;
import com.xieke.admin.util.Constant;
import com.xieke.admin.util.PasswordEncoder;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    ResultInfo<List<Department>> listData(Department department) {
        EntityWrapper<Department> wrapper = new EntityWrapper<>(department);
        if (department != null && department.getBmmc() != null) {
            wrapper.like("bmmc", department.getBmmc());
            department.setBmmc(null);
        }
//        List<Department> list = iDepartmentService.selectList(wrapper);
        return new ResultInfo<>(iDepartmentService.selectList(wrapper));
    }

    @SysLog("添加部门操作")
    @RequestMapping("/add")
    @RequiresPermissions("dept:add")
    public @ResponseBody
    ResultInfo<Boolean> add(Department department) {
        return new ResultInfo<>(iDepartmentService.insert(department));
    }

    @SysLog("修改部门操作")
    @RequestMapping("/edit")
    @RequiresPermissions("dept:edit")
    public @ResponseBody
    ResultInfo<Boolean> edit(Department department) {

        return new ResultInfo<>(iDepartmentService.updateById(department));
    }

    @RequestMapping("/listDataTree")
    @RequiresPermissions("dept:view")
    public @ResponseBody
    ResultInfo<List<TreeNode>> listDataJson(Department department) {
        EntityWrapper<Department> wrapper = new EntityWrapper<>(department);
        List<Department> list = iDepartmentService.selectList(wrapper);
        List<TreeNode> nodeList = new ArrayList<>();
        list.forEach(node -> {
            TreeNode<TreeNode> treeNode = new TreeNode<>(node.getId(), node.getBmmc(), node.getPid());
            nodeList.add(treeNode);
        });
        return new ResultInfo<>(makeTree(nodeList, 0));
    }

    @RequestMapping("/listDataTreeWithoutCode")
    @RequiresPermissions("dept:view")
    public @ResponseBody
    List<TreeNode> listDataJsonWithoutCode(Department department) {
        EntityWrapper<Department> wrapper = new EntityWrapper<>(department);
        List<Department> list = iDepartmentService.selectList(wrapper);
        List<TreeNode> nodeList = new ArrayList<>();
        list.forEach(node -> {
            TreeNode<TreeNode> treeNode = new TreeNode<>(node.getId(), node.getBmmc(), node.getPid());
            nodeList.add(treeNode);
        });
        return makeTree(nodeList, 0);
    }

    private static List<TreeNode> makeTree(List<TreeNode> TreeNodeList, int pId) {

        //子类
        List<TreeNode> children = TreeNodeList.stream().filter(x -> x.getPid() == pId).collect(Collectors.toList());

        //后辈中的非子类
        List<TreeNode> successor = TreeNodeList.stream().filter(x -> x.getPid() != pId).collect(Collectors.toList());

        children.forEach(x ->
                makeTree(successor, x.getId()).forEach(
                        y -> x.getChildren().add(y)
                )
        );

        return children;

    }
}