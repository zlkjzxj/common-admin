package com.xieke.admin.service;

import com.baomidou.mybatisplus.service.IService;
import com.xieke.admin.dto.UserInfo;
import com.xieke.admin.entity.Department;
import com.xieke.admin.entity.User;

import java.util.List;

/**
 * <p>
 * 系统用户表 服务类
 * </p>
 *
 * @author Auto Generator
 * @since 2018-07-16
 */
public interface IDepartmentService extends IService<Department> {

    List<Integer> getAllChildrenDepartment(int id);

    List<Department> findDepartmentHasNOChildren();
}
