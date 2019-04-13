package com.xieke.admin.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-03-29 10:52
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImInit {
    private ImMine mine;
    private List<ImFriend> friend;
    private List<ImGroup> group;
}
