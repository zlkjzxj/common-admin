package com.xieke.admin.dto;

import com.xieke.admin.entity.User;

import java.io.Serializable;

public class UserInfo extends User implements Serializable {

    private RoleInfo roleInfo;

    public RoleInfo getRoleInfo() {
        return roleInfo;
    }

    public void setRoleInfo(RoleInfo roleInfo) {
        this.roleInfo = roleInfo;
    }

    /**
     * 密码盐.
     * @return
     */
    public String getCredentialsSalt(){
        return this.getUserName() + this.getSalt();
    }
    //重新对盐重新进行了定义，用户名+salt，这样就更加不容易被破解
}