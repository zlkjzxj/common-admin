package com.xieke.admin.business.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.xieke.admin.business.service.IProjectService;
import com.xieke.admin.dto.ProjectInfo;
import com.xieke.admin.entity.Project;
import com.xieke.admin.mapper.ProjectMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
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
public class ProjectServiceImpl extends ServiceImpl<ProjectMapper, Project> implements IProjectService {
    @Resource
    private ProjectMapper projectMapper;

    @Override
    public ProjectInfo findProjectbyId(Integer id) {
        return projectMapper.findProjectbyId(id);
    }

    @Override
    public List<ProjectInfo> findProjectByFuzzySearchVal(ProjectInfo project) {
        return projectMapper.findProjectByFuzzySearchVal(project);
    }

}