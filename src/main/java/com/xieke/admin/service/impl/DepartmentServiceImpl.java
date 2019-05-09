package com.xieke.admin.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.xieke.admin.dto.UserInfo;
import com.xieke.admin.entity.Department;
import com.xieke.admin.entity.User;
import com.xieke.admin.mapper.DepartmentMapper;
import com.xieke.admin.mapper.UserMapper;
import com.xieke.admin.service.IDepartmentService;
import com.xieke.admin.service.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 系统用户表 服务实现类
 * </p>
 *
 * @author Auto Generator
 * @since 2018-07-16
 */
@Service
public class DepartmentServiceImpl extends ServiceImpl<DepartmentMapper, Department> implements IDepartmentService {

    @Resource
    private DepartmentMapper departmentMapper;

    @Override
    public List<Integer> getAllChildrenDepartment(int id) {
        Department department = new Department();
        EntityWrapper<Department> wrapper = new EntityWrapper<>(department);
        wrapper.eq("pid", id);
        List<Department> departmentList = departmentMapper.selectList(wrapper);
        List<Integer> ids = new ArrayList<>();
        getChilds(departmentList, ids);
        return ids;
    }

    @Override
    public List<Department> findDepartmentHasNOChildren() {
        return departmentMapper.findDepartmentHasNOChildren();
    }

    public void getChilds(List<Department> list, List<Integer> ids) {
        if (!list.isEmpty()) {
            for (Department d : list) {
                ids.add(d.getId());
                Department department = new Department();
                EntityWrapper<Department> wrapper = new EntityWrapper<>(department);
                wrapper.eq("pid", d.getId());
                List<Department> departmentList = departmentMapper.selectList(wrapper);
                if (!departmentList.isEmpty()) {
                    getChilds(departmentList, ids);
                }
            }

        }
    }
}