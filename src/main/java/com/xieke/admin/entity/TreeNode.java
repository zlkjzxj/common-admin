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
    private Integer id;
    private String href;
    private Integer pid;
    private boolean open;
    private boolean spread;
    private boolean checked;
    private List<T> children = new ArrayList<>();

    public TreeNode(Integer id, String name, Integer pid, boolean open, boolean checked) {
        this.name = name;
        this.id = id;
        this.pid = pid;
        this.open = open;
        this.checked = checked;
    }
    public TreeNode(Integer id, String name, Integer pid, boolean spread) {
        this.name = name;
        this.id = id;
        this.pid = pid;
        this.spread = spread;
    }

    public static void main(String[] args) {

        List<TreeNode> TreeNodeList = new ArrayList<>();

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
