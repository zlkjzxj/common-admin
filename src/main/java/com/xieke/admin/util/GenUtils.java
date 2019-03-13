package com.xieke.admin.util;

import com.xieke.admin.entity.Column;
import com.xieke.admin.entity.Table;
import com.xieke.admin.ex.BusinessException;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.WordUtils;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * 代码生成器   工具类
 */
public class GenUtils {

	public static List<String> getTemplates(){
		List<String> templates = new ArrayList<String>();
		templates.add("codetemplate/Entity.java.vm");
		templates.add("codetemplate/Mapper.java.vm");
		templates.add("codetemplate/Mapper.xml.vm");
		templates.add("codetemplate/Service.java.vm");
		templates.add("codetemplate/ServiceImpl.java.vm");
		templates.add("codetemplate/Controller.java.vm");
		templates.add("codetemplate/list.html.vm");
		templates.add("codetemplate/list.js.vm");
		templates.add("codetemplate/info.html.vm");
		templates.add("codetemplate/info.js.vm");
		templates.add("codetemplate/menu.sql.vm");
		return templates;
	}
	
	/**
	 * 生成代码
	 */
	public static void generatorCode(Map<String, String> table,
			List<Map<String, String>> columns, ZipOutputStream zip){
		//配置信息
		Configuration config = getConfig();
		boolean hasBigDecimal = false;
		//表信息
		Table tab = new Table();
		tab.setTableName(table.get("tableName"));
		tab.setComments(table.get("tableComment"));
		//表名转换成Java类名
		String className = tableToJava(tab.getTableName(), config.getString("tablePrefix"));
		tab.setClassName(className);
		tab.setClassname(StringUtils.uncapitalize(className));
		
		//列信息
		List<Column> columsList = new ArrayList<>();
		for(Map<String, String> column : columns){
			Column col = new Column();
			col.setColumnName(column.get("columnName"));
			col.setDataType(column.get("dataType"));
			col.setComments(column.get("columnComment"));
			col.setExtra(column.get("extra"));
			
			//列名转换成Java属性名
			String attrName = columnToJava(col.getColumnName());
			col.setAttrName(attrName);
			col.setAttrname(StringUtils.uncapitalize(attrName));
			
			//列的数据类型，转换成Java类型
			String attrType = config.getString(col.getDataType(), "unknowType");
			col.setAttrType(attrType);
			if (!hasBigDecimal && attrType.equals("BigDecimal" )) {
				hasBigDecimal = true;
			}
			//是否主键
			if("PRI".equalsIgnoreCase(column.get("columnKey")) && tab.getPk() == null){
				tab.setPk(col);
			}
			
			columsList.add(col);
		}
		tab.setColumns(columsList);
		
		//没主键，则第一个字段为主键
		if(tab.getPk() == null){
			tab.setPk(tab.getColumns().get(0));
		}
		
		//设置velocity资源加载器
		Properties prop = new Properties();  
		prop.put("file.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");  
		Velocity.init(prop);

		String mainPath = config.getString("mainPath" );
		mainPath = StringUtils.isBlank(mainPath) ? "io.renren" : mainPath;
		
		//封装模板数据
		Map<String, Object> map = new HashMap<>();
		map.put("tableName", tab.getTableName());
		map.put("comments", tab.getComments());
		map.put("pk", tab.getPk());
		map.put("className", tab.getClassName());
		map.put("classname", tab.getClassname());
		map.put("pathName", tab.getClassname().toLowerCase());
		map.put("columns", tab.getColumns());
		map.put("hasBigDecimal", hasBigDecimal);
		map.put("package", config.getString("package" ));
		map.put("author", config.getString("author"));
		map.put("email", config.getString("email"));
		map.put("datetime", FormatUtil.formatDate(new Date(), null));
        VelocityContext context = new VelocityContext(map);
        
        //获取模板列表
		List<String> templates = getTemplates();
		for(String template : templates){
			//渲染模板
			StringWriter sw = new StringWriter();
			Template tpl = Velocity.getTemplate(template, "UTF-8");
			tpl.merge(context, sw);
			
			try {
				//添加到zip
				zip.putNextEntry(new ZipEntry(getFileName(template, tab, config.getString("package"))));
				IOUtils.write(sw.toString(), zip, "UTF-8");
				IOUtils.closeQuietly(sw);
				zip.closeEntry();
			} catch (IOException e) {
				throw new BusinessException(Constant.YES_ERROR, "渲染模板失败，表名：" + tab.getTableName());
			}
		}
	}
	
	
	/**
	 * 列名转换成Java属性名
	 */
	public static String columnToJava(String columnName) {
		return WordUtils.capitalizeFully(columnName, new char[]{'_'}).replace("_", "");
	}
	
	/**
	 * 表名转换成Java类名
	 */
	public static String tableToJava(String tableName, String tablePrefix) {
		if(StringUtils.isNotBlank(tablePrefix)){
			tableName = tableName.replace(tablePrefix, "");
		}
		return columnToJava(tableName);
	}
	
	/**
	 * 获取配置信息
	 */
	public static Configuration getConfig(){
		try {
			return new PropertiesConfiguration("generator.properties");
		} catch (ConfigurationException e) {
			throw new BusinessException(Constant.YES_ERROR, "获取配置文件失败:"+ e.getMessage());
		}
	}

	/**
	 * 获取文件名
	 */
	public static String getFileName(String template, Table table, String packageName) {
		String packagePath = "main" + File.separator + "java" + File.separator;
		if (StringUtils.isNotBlank(packageName)) {
			packagePath += packageName.replace(".", File.separator) + File.separator;
		}

		if (template.contains("Entity.java.vm" )) {
			return packagePath + "entity" + File.separator + table.getClassName() + ".java";
		}

		if (template.contains("Mapper.java.vm" )) {
			return packagePath + "mapper" + File.separator + table.getClassName() + "Mapper.java";
		}

		if (template.contains("Service.java.vm" )) {
			return packagePath + "service" + File.separator + "I" + table.getClassName() + "Service.java";
		}

		if (template.contains("ServiceImpl.java.vm" )) {
			return packagePath + "service" + File.separator + "impl" + File.separator + table.getClassName() + "ServiceImpl.java";
		}

		if (template.contains("Controller.java.vm" )) {
			return packagePath + "web" + File.separator + table.getClassName() + "Controller.java";
		}

		if (template.contains("Mapper.xml.vm" )) {
			return "main" + File.separator + "resources" + File.separator + "mapper" + File.separator + table.getClassName() + "Mapper.xml";
		}

		if (template.contains("list.html.vm" )) {
			return "main" + File.separator + "resources" + File.separator + "templates" + File.separator
					+ table.getClassname() + File.separator + "list.html";
		}

		if (template.contains("list.js.vm" )) {
			return "main" + File.separator + "resources" + File.separator + "static" + File.separator + "js" + File.separator
					+ table.getClassname() + File.separator + "list.js";
		}

		if (template.contains("info.html.vm" )) {
			return "main" + File.separator + "resources" + File.separator + "templates" + File.separator
					+ table.getClassname() + File.separator + "info.html";
		}

		if (template.contains("info.js.vm" )) {
			return "main" + File.separator + "resources" + File.separator + "static" + File.separator + "js" + File.separator
					+ table.getClassname() + File.separator + "info.js";
		}

		if (template.contains("menu.sql.vm" )) {
			return table.getClassname() + "_menu.sql";
		}

		return null;
	}

}