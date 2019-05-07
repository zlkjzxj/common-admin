package com.xieke.admin.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.xieke.admin.entity.Param;
import com.xieke.admin.entity.Role;
import com.xieke.admin.mapper.ParamMapper;
import com.xieke.admin.mapper.RoleMapper;
import com.xieke.admin.service.IParamService;
import com.xieke.admin.service.IRoleService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 系统角色表 服务实现类
 * </p>
 *
 * @author Auto Generator
 * @since 2018-07-16
 */
@Service
public class ParamServiceImpl extends ServiceImpl<ParamMapper, Param> implements IParamService {
    @Override
    public Boolean saveParam(Param param) {
        Boolean res = false;
        if (param.getId() == null) {
            res = this.insert(param);
        } else {
            res = this.updateById(param);
        }
        return res;
    }
}