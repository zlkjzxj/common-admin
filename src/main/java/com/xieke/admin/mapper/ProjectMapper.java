package com.xieke.admin.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.xieke.admin.dto.ProjectInfo;
import com.xieke.admin.entity.Project;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 * 系统用户表 Mapper 接口
 * </p>
 *
 * @author Auto Generator
 * @since 2018-07-16
 */
@Mapper
public interface ProjectMapper extends BaseMapper<Project> {

    ProjectInfo findProjectbyId(Integer id);

    List<ProjectInfo> findProjectByFuzzySearchVal(ProjectInfo project);

    String getAddSequence();

    Integer getProjectCount(ProjectInfo project);
}
