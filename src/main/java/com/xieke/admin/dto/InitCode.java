package com.xieke.admin.dto;

import com.xieke.admin.entity.Code;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-05-10 14:54
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InitCode {
    private Map<String, List<Code>> codeMap;
    private Map<String, String> paramMap;
}
