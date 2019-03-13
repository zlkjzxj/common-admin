package com.xieke.admin.web;

import com.xieke.admin.dto.ResultInfo;
import com.xieke.admin.service.ICodeService;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 数据表 前端控制器
 * </p>
 *
 * @author 邪 客
 * @since 2018-12-25
 */
@Controller
@RequestMapping("/code")
public class CodeController extends BaseController {

    @Resource
    private ICodeService iCodeService;

    @RequestMapping("/*")
    public void toHtml(){

    }

    @RequestMapping("/listData")
    @RequiresPermissions("code:view")
    public @ResponseBody
        ResultInfo<Map<String, Object>> listData(String tableName, Integer page, Integer limit){

        Map<String, Object> map = new HashMap<>();
        map.put("tableName", tableName);
        map.put("offset", (page - 1) * limit);
        map.put("limit", limit);
        List<Map<String, Object>> mapList = iCodeService.queryList(map);
        for (Map m : mapList){
            m.put("createTime", String.valueOf(m.get("createTime")).substring(0,19));
        }
        int total = iCodeService.queryTotal(map);

        return new ResultInfo(mapList, total);
    }

    /**
     * 生成代码
     */
    @RequestMapping("/generator")
    public void generator(String tables, HttpServletResponse response) throws IOException {
        byte[] data = iCodeService.generatorCode(tables.split(","));

        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=\"code-generator.zip\"");
        response.addHeader("Content-Length", "" + data.length);
        response.setContentType("application/octet-stream; charset=UTF-8");

        IOUtils.write(data, response.getOutputStream());
    }

}