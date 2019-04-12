package com.xieke.admin.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-03-07 14:10
 */
@Data
@NoArgsConstructor
public class ProjectInfo {
    private Integer id;
    private String name;
    private String number;
    private Integer sflx;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date lxsj;
    private String department;
    private Integer manager;
    private Integer rjkfjd;
    private Integer fawcqk;
    private Integer cpxxwcqk;
    private Integer zbzzwcqk;
    private Integer yzjhbqd;
    private Integer htqd;
    private Integer yjcg;
    private Integer sgqr;
    private Integer jcjd;
    private Float htje;
    private String hkqk;
    private Float whje;
    private Date whsx;
    private String hktz;
    private Float ml;
    private Float zbj;
    private String zbjthqk;
    private Integer xmjx;
    private Integer lrr;
    private Integer xgr;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date createTime;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date updateTime;

    //添加显示字段
    private String bmmc;
    private String userName;
    //分页用的参数
    private Integer limit1;
    private Integer limit2;
    //分页的总数
    private Integer count;

    //排序的条件和顺序
    private String field;
    private String order;

    //所有子部门的id
    private List<Integer> ids;
    //搜索条件
    private String fuzzySearchVal;

}
