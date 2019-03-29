package com.xieke.admin.entity;

import com.alibaba.druid.filter.AutoLoad;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-03-29 10:46
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImMine {
    private String username;
    private Integer id;
    private String status;
    private String sign;
    private String avatar;

    public ImMine(String username, Integer id, String sign, String avatar) {
        this.username = username;
        this.id = id;
        this.sign = sign;
        this.avatar = avatar;
    }
}
