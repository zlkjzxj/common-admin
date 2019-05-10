package com.xieke.admin.web;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.xieke.admin.annotation.SysLog;
import com.xieke.admin.dto.InitCode;
import com.xieke.admin.dto.ResultInfo;
import com.xieke.admin.entity.Code;
import com.xieke.admin.entity.Param;
import com.xieke.admin.mapper.CodeMapper;
import com.xieke.admin.mapper.ParamMapper;
import com.xieke.admin.service.ICodeService;
import com.xieke.admin.service.IParamService;
import com.xieke.admin.util.StringUtils;
import com.xieke.admin.util.TranslateUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.xieke.admin.util.Constant.CODE_JS_NAME;

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
    @Resource
    private ParamMapper paramMapper;
    @Resource
    protected CodeMapper codeMapper;

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

    @RequestMapping("/getInitParam")
    public @ResponseBody
    ResultInfo<InitCode> getInitParam() {
        //加载翻译参数
        Param param = new Param();
        param.setCode("init_code");
        Param param1 = paramMapper.selectOne(param);
        String value = param1.getValue();
        //加载部门简称规则
        param.setCode("project_number_dep");
        Param project_number_dep = paramMapper.selectOne(param);
        String project_number_dep_value = project_number_dep.getValue();
        //加载部门简称类型
        param.setCode("project_number_type");
        Param project_number_type = paramMapper.selectOne(param);
        String project_number_type_value = project_number_type.getValue();

        Map<String, List<Code>> codeMap = new HashMap<>(10);
        Map<String, String> paramMap = new HashMap<>(2);
        paramMap.put("project_number_dep", project_number_dep_value);
        paramMap.put("project_number_type", project_number_type_value);
        if (!StringUtils.isEmpty(value)) {
            String[] arrays = value.split(",");
            for (int i = 0; i < arrays.length; i++) {
                EntityWrapper<Code> wrapper = new EntityWrapper<>(new Code());
                wrapper.eq("code", arrays[i]);
                List<Code> codeList = codeMapper.selectList(wrapper);
                codeMap.put(arrays[i], codeList);
            }
        }
        return new ResultInfo<>(new InitCode(codeMap, paramMap));
    }
}
