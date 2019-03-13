package com.xieke.admin.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.xieke.admin.entity.Role;
import com.xieke.admin.mapper.RoleMapper;
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
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements IRoleService {

    @Override
    public Boolean saveRole(Role role) {
        Boolean res = false;
        if (role.getId() == null) {
            res = this.insert(role);
        } else {
            res = this.updateById(role);
        }
        return res;
    }
}