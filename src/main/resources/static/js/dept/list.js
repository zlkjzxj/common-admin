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

    // 渲染表格
    // layer.load(2);
    treetable.render({
        treeColIndex: 1,
        treeSpid: 0,
        treeIdName: 'id',
        treePidName: 'pid',
        elem: '#depList',
        url: '/dept/listData',
        page: false,
        id: "deptListTable",
        cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'bmmc', width: 300, title: '部门名称'},
            {field: 'isshow', width: 100, title: '是否显示'},
            // {field: 'bmjb', width: 150, title: '主管'},
            {
                title: '操作', width: 200, align: "center", templet: function () {
                    return '<span class="layui-badge layui-bg-blue edit_btn" lay-event="edit">编辑</span>';
                }
            }
        ]],
        done: function () {
            layer.closeAll('loading');
        }
    });


    //添加部门
    function addDept(edit) {
        var h = "330px";
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
                if (edit) {
                    // body.find("#une").remove();
                    // body.find("#pwd1").remove();
                    body.find("#id").val(edit.id);
                    body.find("#bmmc").val(edit.bmmc);
                    body.find("#pid").val(edit.pid);
                    // body.find("#isshow").val(edit.state);
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
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
                $.get("/user/delBatch", {
                    idArr: idArr.toString()
                }, function (data) {
                    layer.close(index);
                    tableIns.reload();
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
        console.log("data", data);
        if (layEvent === 'edit') { //编辑
            addDept(data);
        }
    });
});



