package com.xieke.admin.service;


import java.util.List;
import java.util.Map;

/**
 * <p>
 * 数据表表 服务类
 * </p>
 *
 * @author 邪 客
 * @since 2018-12-25
 */
public interface ICodeService {

    List<Map<String, Object>> queryList(Map<String, Object> map);

    int queryTotal(Map<String, Object> map);

    byte[] generatorCode(String[] tableNames);

}
