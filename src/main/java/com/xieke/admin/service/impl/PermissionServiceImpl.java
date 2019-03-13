package com.xieke.admin.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.xieke.admin.code.ResourceType;
import com.xieke.admin.dto.MenuInfo;
import com.xieke.admin.dto.PermissionInfo;
import com.xieke.admin.entity.Permission;
import com.xieke.admin.ex.BusinessException;
import com.xieke.admin.mapper.PermissionMapper;
import com.xieke.admin.service.IPermissionService;
import com.xieke.admin.util.Constant;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 系统权限表 服务实现类
 * </p>
 *
 * @author Auto Generator
 * @since 2018-07-16
 */
@Service
public class PermissionServiceImpl extends ServiceImpl<PermissionMapper, Permission> implements IPermissionService {

//    @Cacheable("permissionCache")
    @Override
    public List<Permission> getAllPermissions() {
        List<Permission> permissions = this.baseMapper.selectList(new EntityWrapper<>());
        return permissions;
    }

    @CacheEvict(value = "permissionCache", allEntries = true)
    @Override
    public Boolean savePermission(Permission permission) {
        Boolean res = false;
        if (permission.getId()==null) {
            if(permission.getParentId()==null){
                permission.setParentId(0);
                permission.setParentIds("0");
            } else {
                Permission ps = this.baseMapper.selectById(permission.getParentId());
                permission.setParentIds(ps.getParentIds()+"/"+ps.getId());
            }
            res = this.insert(permission);
        } else {
            res = this.updateById(permission);
        }
        return res;
    }

//    @CacheEvict(value = "permissionCache", allEntries = true)
    @Override
    public Boolean delBatchPermission(List<Integer> ids) {
        Boolean res = false;
        //目录和菜单只能单个删除
        if(ids.size() == 1){
            Permission permission = this.selectById(ids.get(0));
            Permission con = new Permission();
            con.setParentId(permission.getId());
            List<Permission> list = this.baseMapper.selectList(new EntityWrapper<>(con));
            if(list!=null&&list.size()>0){
                throw new BusinessException(Constant.YES_ERROR, "有子权限不能删除！");
            }
            res = this.deleteById(ids.get(0));
        } else {
            res = this.baseMapper.deleteBatchIds(ids) > 0;
        }
        return res;
    }

//    @Cacheable(value = "permissionCache")
    @Override
    public List<PermissionInfo> allPermissionInfo() {
        return this.baseMapper.allPermissionInfo();
    }

//    @Cacheable(value = "permissionCache", key="'code:'+#p0")
    @Override
    public List<MenuInfo> getMenuPermissions(String code) {
        List<MenuInfo> menuInfoList = new ArrayList<>();
        EntityWrapper<Permission> wrapper = new EntityWrapper<>();
        Permission permission = new Permission();
        permission.setPermissionCode(code);
        wrapper.setEntity(permission);
        permission = this.selectOne(wrapper);
        Permission con = new Permission();
        con.setParentIds(permission.getParentIds()+"/"+permission.getId());
        con.setAvailable(1);
        wrapper.setEntity(con);
        String[] resourceTypes = { ResourceType.DIRECTORY.getCode(), ResourceType.MENU.getCode() };
        wrapper.in("resource_type", resourceTypes);
        List<Permission> list = this.selectList(wrapper);
        for (Permission ps : list) {
            MenuInfo info = new MenuInfo();
            info.setOnlyId(ps.getId());
            info.setTitle(ps.getPermissionName());
            info.setHref(ps.getUrl());
            if (ps.getResourceType().equals(ResourceType.DIRECTORY.getCode())){
                con = new Permission();
                con.setParentIds(ps.getParentIds()+"/"+ps.getId());
                con.setAvailable(1);
                wrapper.setEntity(con);
                List<Permission> list2 = this.selectList(wrapper);
                List<MenuInfo> subMenuInfoList = new ArrayList<>();
                for (Permission subPs : list2) {
                    MenuInfo subInfo = new MenuInfo();
                    subInfo.setOnlyId(subPs.getId());
                    subInfo.setTitle(subPs.getPermissionName());
                    subInfo.setHref(subPs.getUrl());
                    subMenuInfoList.add(subInfo);
                }
                info.setChildren(subMenuInfoList);
            }
            menuInfoList.add(info);
        }
        return menuInfoList;
    }

//    @Cacheable(value = "permissionCache")
    @Override
    public List<Permission> getTopDirectoryPermissions() {
        Permission permission = new Permission();
        permission.setResourceType(ResourceType.TOP_DIRECTORY.getCode());
        permission.setAvailable(1);
        return this.selectList(new EntityWrapper<>(permission));
    }

}