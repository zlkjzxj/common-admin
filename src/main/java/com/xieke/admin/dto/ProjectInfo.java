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
    private Integer department;
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
    private String htje;
    private String hkqk;
    private String whje;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date whsx;
    private String hktz;
    private String ml;
    private String zbj;
    private String zbjthqk;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private String zbjthsx;
    private Integer xmjx;
    private Integer sfzj;
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
    //是否查询所有
    private boolean viewall;

}
