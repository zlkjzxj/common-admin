package com.xieke.admin.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.FieldFill;
import com.baomidou.mybatisplus.enums.IdType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-03-07 14:10
 */
@Data
@NoArgsConstructor
@TableName("biz_project")
public class Project {
    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    /**
     * 项目名称
     */
    @TableField("name")
    private String name;
    /**
     * 项目编号
     */
    @TableField("number")
    private String number;
    /**
     * 立项时间
     */
    @TableField(value = "lxsj", fill = FieldFill.INSERT_UPDATE)
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date lxsj;
    /**
     * 部门Id
     */
    @TableField("department")
    private Integer department;
    /**
     * 项目经理Id
     */
    @TableField("manager")
    private Integer manager;
    /**
     * 软件开发进度
     */
    @TableField("rjkfjd")
    private Integer rjkfjd;
    /**
     * 方案完成情况
     */
    @TableField("fawcqk")
    private Integer fawcqk;
    /**
     * 产品选型完成情况
     */
    @TableField("cpxxwcqk")
    private Integer cpxxwcqk;
    /**
     * 招标组织完成情况
     */
    @TableField("zbzzwcqk")
    private Integer zbzzwcqk;
    /**
     * 用资计划表确定
     */
    @TableField("yzjhbqd")
    private Integer yzjhbqd;
    /**
     * 合同签订
     */
    @TableField("htqd")
    private Integer htqd;
    /**
     * 硬件采购工作
     */
    @TableField("yjcg")
    private Integer yjcg;
    /**
     * 施工队确认
     */
    @TableField("sgqr")
    private Integer sgqr;
    /**
     * 集成工作进度
     */
    @TableField("jcjd")
    private Integer jcjd;


    /**
     * 合同金额
     */
    @TableField("htje")
    private Float htje;
    /**
     * 回款情况
     */
    @TableField("hkqk")
    private String hkqk;
    /**
     * 未回金额
     */
    @TableField("whje")
    private Float whje;
    /**
     * 回款时限
     */
    @TableField(value = "whsx", fill = FieldFill.INSERT_UPDATE)
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date whsx;
    /**
     * 回款通知
     */
    @TableField("hktz")
    private String hktz;

    /**
     * 毛利
     */
    @TableField("ml")
    private Float ml;

    /**
     * 质保金
     */
    @TableField("zbj")
    private Float zbj;
    /**
     * 质保金退还情况
     */
    @TableField("zbjthqk")
    private String zbjthqk;

    /**
     * 项目结项
     */
    @TableField("xmjx")
    private Integer xmjx;
    /**
     * 录入人
     */
    @TableField("lrr")
    private Integer lrr;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT_UPDATE)
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date createTime;
    /**
     * 修改时间
     */
    @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date updateTime;

}
