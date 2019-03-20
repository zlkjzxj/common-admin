layui.config({
    base: '/static/layui/'
}).extend({
    treetable: 'treetable-lay/treetable'
}).use(['table', 'layer', 'form', 'treetable'], function () {
    var $ = layui.jquery,
        table = layui.table,
        treetable = layui.treetable,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        form = layui.form;

    var roleList;
    $.post("/role/selectListData", {
        available: 1
    }, function (data) {
        roleList = data.data;
        roleList.forEach(function (e) {
            $("#roleSelect").append("<option value='" + e.id + "'>" + e.roleName + "</option>");
        });
        form.render('select');//刷新select选择框渲染
    });
    /*var userList;
    $.post("/user/listDataSelect", {
        available: 1
    }, function (data) {
        userList = data.data;
        // depTable();
        //渲染主管
        console.log(data);
        userList.forEach(function (e) {
            $("#manager").append("<option value='" + e.id + "'>" + e.name + "</option>");
        });
        // $("#manager").val($("#managerId").val());//默认选中
        form.render('select');//刷新select选择框渲染
    });*/
    // 渲染表格
    var depTable = function () {
        treetable.render({
            treeColIndex: 1,
            treeSpid: 0,
            treeIdName: 'id',
            treePidName: 'pid',
            elem: '#depList',
            url: '/dept/listData?glbm=' + $("#id").val(),
            page: false,
            id: "deptListTable",
            cols: [[
                {type: 'checkbox', fixed: 'left'},
                {field: 'bmmc', width: 300, title: '部门名称'},
                {
                    field: 'isshow', width: 100, title: '是否显示', templet: function (d) {
                        return d.isshow === 1 ? '是' : '否';
                    }
                },
                {
                    field: 'manager', width: 100, title: '主管', templet: function (d) {
                        var name = "";
                        userList.forEach(function (e) {
                            if (e.id === d.manager) {
                                name = e.name;
                            }
                        });
                        return name;
                    }
                },
                {
                    title: '操作', width: 200, align: "center", templet: function () {
                        return '<span class="layui-badge layui-bg-blue edit_btn" lay-event="edit">编辑</span>';
                    }
                }
            ]],
            done: function () {
                layer.closeAll('loading');
            }
        })
        ;
    }

    //添加部门
    function addDept(edit) {
        $("#id").val("");
        $("#pid").val("");
        var h = "300px";
        var title = "添加部门";
        if (edit) {
            h = "330px";
            title = "编辑用户";
        }
        layui.layer.open({
            title: title,
            type: 2,
            area: ["420px", h],
            content: "info.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                // body.find("#managerDiv").hide();
                if (edit) {
                    console.log(edit);
                    body.find("#managerDiv").show();
                    body.find("#id").val(edit.id);
                    body.find("#bmmc").val(edit.bmmc);
                    body.find("#pid").val(edit.pid);
                    console.log(edit.isshow)
                    body.find("#isshow").val(edit.isshow);
                    // form.render();
                }
            }
        })
    }


    $(".add_btn").click(function () {
        addDept();
    });

    // $(".edit_btn").click(function () {
    //     var checkStatus = table.checkStatus('deptListTable'),
    //         data = checkStatus.data;
    //     if (data.length > 0) {
    //         addDept(data[0]);
    //     } else {
    //         layer.msg("请选择需要修改的部门");
    //     }
    // });

    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('deptListTable'),
            data = checkStatus.data,
            idArr = [];
        if (data.length > 0) {
            for (var i in data) {
                idArr.push(data[i].id);
            }
            layer.confirm('确定删除选中的用户？', {icon: 3, title: '提示信息'}, function (index) {
                $.get("/dept/delBatch", {
                    idArr: idArr.toString()
                }, function (data) {
                    layer.close(index);
                    depTable();
                    if (data.data) {
                        layer.msg("删除成功！");
                    } else {
                        layer.msg(data.msg);
                    }
                })
            })
        } else {
            layer.msg("请选择需要删除的用户");
        }
    })

    $('#btn-expand').click(function () {
        treetable.expandAll('#depList');
    });

    $('#btn-fold').click(function () {
        treetable.foldAll('#depList');
    });
    //列表操作
    table.on('tool(depList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;
        if (layEvent === 'edit') { //编辑
            addDept(data);
        }
    });
});



