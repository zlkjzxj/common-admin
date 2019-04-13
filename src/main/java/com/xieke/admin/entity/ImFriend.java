package com.xieke.admin.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-03-29 10:46
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImFriend {
    private String groupname;
    private Integer id;
    private List<ImMine> list;
}
