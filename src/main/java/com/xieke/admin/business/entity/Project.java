package com.xieke.admin.business.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-03-07 14:10
 */
@Data
@NoArgsConstructor
public class Project {
    /**
     * 项目名称
     */
    private String name;
    /**
     * 项目编号
     */
    private String number;
    /**
     * 立项时间
     */
    private String createTime;
    /**
     * 部门
     */
    private String department;
    /**
     * 项目经理
     */
    private String manager;
    /**
     * 软件开发进度
     */
    private String rjkfjd;
    /**
     * 方案完成情况
     */
    private String fawcqk;
    /**
     * 产品选型完成情况
     */
    private String cpxxwcqk;
    /**
     * 招标组织完成情况
     */
    private String zbzzwcqk;
    /**
     * 用资计划表确定
     */
    private String yzjhbqd;
    /**
     * 合同签订
     */
    private String htqd;
    /**
     * 硬件采购工作
     */

    private String yjcg;
    /**
     * 施工队确认
     */
    private String sgqr;
    /**
     * 集成工作进度
     */
    private String jcjd;


    /**
     * 合同金额
     */
    private String htje;
    /**
     * 回款情况
     */
    private String hkqk;
    /**
     * 未回金额
     */
    private String whje;
    /**
     * 回款时限
     */
    private String whsx;
    /**
     * 回款通知
     */
    private String hktz;

    /**
     * 毛利
     */
    private String ml;

    /**
     * 质保金
     */
    private String zbj;
    /**
     * 质保金退还情况
     */
    private String zbjthqk;

    //录入人
    private String lrr;

    public Project(String createTime, String department, String manager, String name, String number) {
        this.createTime = createTime;
        this.department = department;
        this.manager = manager;
        this.name = name;
        this.number = number;
    }

    @Override
    public String toString() {
        return "Project{" +
                "cpxxwcqk='" + cpxxwcqk + '\'' +
                ", createTime='" + createTime + '\'' +
                ", department='" + department + '\'' +
                ", fawcqk='" + fawcqk + '\'' +
                ", hkqk='" + hkqk + '\'' +
                ", hktz='" + hktz + '\'' +
                ", htje='" + htje + '\'' +
                ", htqd='" + htqd + '\'' +
                ", jcjd='" + jcjd + '\'' +
                ", manager='" + manager + '\'' +
                ", ml='" + ml + '\'' +
                ", name='" + name + '\'' +
                ", number='" + number + '\'' +
                ", rjkfjd='" + rjkfjd + '\'' +
                ", sgqr='" + sgqr + '\'' +
                ", whje='" + whje + '\'' +
                ", whsx='" + whsx + '\'' +
                ", yjcg='" + yjcg + '\'' +
                ", yzjhbqd='" + yzjhbqd + '\'' +
                ", zbj='" + zbj + '\'' +
                ", zbjthqk='" + zbjthqk + '\'' +
                ", zbzzwcqk='" + zbzzwcqk + '\'' +
                '}';
    }
}
