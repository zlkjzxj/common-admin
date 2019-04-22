package com.xieke.admin;

import com.xieke.admin.business.service.IProjectService;
import com.xieke.admin.dto.ResultInfo;
import org.junit.Test;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-04-22 10:30
 */

public class ProjectTest extends ApplicationTest {

    @Resource
    private IProjectService iProjectService;

    @Test
    public void getAddSequence() {
        String sequence = iProjectService.getAddSequence("2020");
        Integer s;
        if (sequence == null) {
            //初始值
            s = 002;
        } else {
            s = Integer.parseInt(sequence) + 1;
        }

        String s1 = String.format("%03d", s);
        System.out.println(s1);
    }
}
