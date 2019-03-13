package com.xieke.admin.service.impl;

import com.xieke.admin.mapper.CodeMapper;
import com.xieke.admin.service.ICodeService;
import com.xieke.admin.util.GenUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;

@Service
public class CodeServiceImpl implements ICodeService {

    @Resource
    private CodeMapper codeMapper;

    public List<Map<String, Object>> queryList(Map<String, Object> map) {
        return codeMapper.queryList(map);
    }

    public int queryTotal(Map<String, Object> map) {
        return codeMapper.queryTotal(map);
    }

    private Map<String, String> queryTable(String tableName) {
        return codeMapper.queryTable(tableName);
    }

    private List<Map<String, String>> queryColumns(String tableName) {
        return codeMapper.queryColumns(tableName);
    }

    public byte[] generatorCode(String[] tableNames) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ZipOutputStream zip = new ZipOutputStream(outputStream);

        for(String tableName : tableNames){
            //查询表信息
            Map<String, String> table = queryTable(tableName);
            //查询列信息
            List<Map<String, String>> columns = queryColumns(tableName);
            //生成代码
            GenUtils.generatorCode(table, columns, zip);
        }
        IOUtils.closeQuietly(zip);
        return outputStream.toByteArray();
    }

}