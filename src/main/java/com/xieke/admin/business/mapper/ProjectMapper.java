package com.xieke.admin.business.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.xieke.admin.business.entity.Project;
import com.xieke.admin.dto.UserInfo;
import com.xieke.admin.entity.User;

/**
 * <p>
 * 系统用户表 Mapper 接口
 * </p>
 *
 * @author Auto Generator
 * @since 2018-07-16
 */
public interface ProjectMapper extends BaseMapper<Project> {

    Project findProject(String name);

}
