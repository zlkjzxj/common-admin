package com.xieke.admin.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @Description TODO
 * @Author sunny
 * @Date 2019-03-11 16:12
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreeNode<T> {
    private String name;
    private List<T> children = new ArrayList<>();
    private Integer id;
    private String href;
    private Integer pid;

    public TreeNode(Integer id, String name, Integer pid) {
        this.name = name;
        this.id = id;
        this.pid = pid;
    }

    public static void main(String[] args) {

        List<TreeNode> TreeNodeList = new ArrayList<>();

        TreeNodeList.add(new TreeNode(1, "白胡子", 0));
        TreeNodeList.add(new TreeNode(2, "不死鸟", 1));
        TreeNodeList.add(new TreeNode(3, "艾斯", 1));
        TreeNodeList.add(new TreeNode(4, "龙", 0));
        TreeNodeList.add(new TreeNode(5, "路飞", 4));
        TreeNodeList.add(new TreeNode(6, "索隆", 5));
        TreeNodeList.add(new TreeNode(7, "娜美", 5));
        TreeNodeList.add(new TreeNode(8, "罗宾", 5));
        TreeNodeList.add(new TreeNode(9, "乌索普", 5));
//        TreeNodeList.add(new TreeNode(10, "小丑", 100));//小丑的长官Id不存在，所以tree中没有它的信息

        List<TreeNode> tree = makeTree(TreeNodeList, 0);

        System.out.println("-------------------------->");
        System.out.println(tree);
    }

    private static List<TreeNode> makeTree(List<TreeNode> TreeNodeList, int pId) {

        //子类
        List<TreeNode> children = TreeNodeList.stream().filter(x -> x.getPid() == pId).collect(Collectors.toList());

        //后辈中的非子类
        List<TreeNode> successor = TreeNodeList.stream().filter(x -> x.getPid() != pId).collect(Collectors.toList());

        children.forEach(x ->
                makeTree(successor, x.getId()).forEach(
                        y -> x.getChildren().add(y)
                )
        );
       /* children.forEach(treeNode -> {
            makeTree(successor, treeNode.getId()).forEach(node -> {
                if (treeNode.getId().equals(node.getPid())) {
                    treeNode.getChildren().add(node);
                }
            });
        });*/

        return children;

    }
}
