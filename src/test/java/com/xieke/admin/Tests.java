package com.xieke.admin;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.xieke.admin.entity.Code;
import com.xieke.admin.entity.Param;
import com.xieke.admin.mapper.CodeMapper;
import com.xieke.admin.mapper.ParamMapper;
import com.xieke.admin.util.StringUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.util.ClassUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-04-30 10:21
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
public class Tests {
    @Autowired
    private ParamMapper paramMapper;
    @Autowired
    private CodeMapper codeMapper;

    @Test
    public void test() {
        Param param = new Param();
        param.setCode("init_code");
        Param param1 = paramMapper.selectOne(param);
        String value = param1.getValue();

        Map<String, List<Code>> map = new HashMap<>();
        if (!StringUtils.isEmpty(value)) {
            String[] arrays = value.split(",");
            for (int i = 0; i < arrays.length; i++) {
                EntityWrapper<Code> wrapper = new EntityWrapper<>(new Code());
                wrapper.eq("code", arrays[i]);
                List<Code> codeList = codeMapper.selectList(wrapper);
                map.put(arrays[i], codeList);
            }
        }
        System.out.println(map);

        //把需要翻译的参数打成js文件
        String path = ClassUtils.getDefaultClassLoader().getResource("").getPath();
        String codePath = path + "static/js/translate/";
//        TranslateUtils.putCodeFile(codePath, CODEJSNAME, map, null);
    }
}
