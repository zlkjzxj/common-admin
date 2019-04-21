package com.xieke.admin.business.service;

import com.baomidou.mybatisplus.service.IService;
import com.xieke.admin.dto.ProjectInfo;
import com.xieke.admin.entity.Project;

import java.util.List;

/**
 * <p>
 * 系统用户表 服务类
 * </p>
 *
 * @author Auto Generator
 * @since 2018-07-16
 */
public interface IProjectService extends IService<Project> {
    ProjectInfo findProjectbyId(Integer id);

    List<ProjectInfo> findProjectByFuzzySearchVal(ProjectInfo project);

    String getAddSequence(String year);

    Integer getProjectCount(ProjectInfo project);

//    Project findProject(String name);

}
