package com.xieke.admin.web;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.xieke.admin.annotation.SysLog;
import com.xieke.admin.dto.ResultInfo;
import com.xieke.admin.entity.Param;
import com.xieke.admin.service.IParamService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.List;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-05-05 14:17
 */
@Controller
@RequestMapping("/param")
public class ParamController {

    @Autowired
    private IParamService paramService;

    @RequestMapping("/listData")
//    @RequiresPermissions("code:view")
    public @ResponseBody
    ResultInfo<List<Param>> listData(Param param, Integer page, Integer limit) {
        EntityWrapper<Param> wrapper = new EntityWrapper<>(param);
        Page<Param> pageObj = paramService.selectPage(new Page<>(page, limit), wrapper);
        return new ResultInfo<>(pageObj.getRecords(), pageObj.getTotal());
    }

    @SysLog("保存参数操作")
    @RequestMapping("/save")
//    @RequiresPermissions(value = {"role:add", "role:edit"}, logical = Logical.OR)
    public @ResponseBody
    ResultInfo<Boolean> save(Param param) {
        return new ResultInfo<>(paramService.saveParam(param));
    }

    @SysLog("删除参数操作")
    @RequestMapping("/del")
//    @RequiresPermissions("role:del")
    public @ResponseBody
    ResultInfo<Boolean> delBatch(Integer id) {
        return new ResultInfo<>(paramService.deleteById(id));
    }
}
