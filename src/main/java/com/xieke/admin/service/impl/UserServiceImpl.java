package com.xieke.admin.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.xieke.admin.dto.UserInfo;
import com.xieke.admin.entity.User;
import com.xieke.admin.mapper.UserMapper;
import com.xieke.admin.service.IUserService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 系统用户表 服务实现类
 * </p>
 *
 * @author Auto Generator
 * @since 2018-07-16
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Override
    public UserInfo findUserInfo(String userName) {
        return this.baseMapper.findUserInfo(userName);
    }
}