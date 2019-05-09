package com.xieke.admin.util;

import com.xieke.admin.entity.Code;
import org.apache.commons.collections.CollectionUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-05-05 10:22
 */
public class TranslateUtils {
    public static void putCodeFile(String filePath, String fileName, Map<String, List<Code>> codeMap, Map<String, String> paramMap) {
        try {
            System.out.println("filePath" + filePath);
            System.out.println(filePath.indexOf("!"));
            filePath = filePath.replace("!", "");
            System.out.println("filePath" + filePath);
            File file1 = new File(filePath);
            File[] files = file1.listFiles();
            System.out.println(files.length);
            for (File f : files) {
                System.out.println(f.getName());
            }

            String url = filePath + "static/js/" + fileName;
            System.out.println("url:" + url);
            File file = new File(url);
            if (!file.exists()) {
                file.createNewFile();
            }
            Writer fw = new OutputStreamWriter(new FileOutputStream(file), "UTF-8");
            StringBuffer sb = new StringBuffer("layui.define(function (exports){\n var obj = {};\n");
            //tarnsCode
            for (String s : codeMap.keySet()) {
                sb.append("obj." + s + " = [");
                List<Code> list = codeMap.get(s);
                for (Code code : list) {
                    sb.append("{code:'" + code.getCode() + "',name:'" + code.getCodeName() + "'},");
                }
                sb.deleteCharAt(sb.lastIndexOf(","));
                sb.append("];\n");
            }
            //paramCode
            for (String s : paramMap.keySet()) {
                sb.append("obj." + s + " = '" + paramMap.get(s) + "';\n");
            }
            sb.append("exports('transcode', obj);\n});");
            fw.write(sb.toString());
            fw.close();
            System.out.println("创建代码文件成功。");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
