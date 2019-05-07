layui.use(['form', 'layer', 'table'], function () {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table;

    //数据表列表
    var tableIns = table.render({
        elem: '#tableList',
        url: '/param/listData',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 20, 30],
        limit: 10,
        id: "tableList",
        cols: [[
            {type: "radio", fixed: "left", width: 50},
            {field: 'name', title: '参数名称', minWidth: 100, align: "center"},
            {field: 'code', title: '参数代码', minWidth: 100, align: 'center'},
            {field: 'value', title: '参数值', minWidth: 100, align: 'center'},
            {field: 'createTime', title: '创建时间', minWidth: 100, align: 'center'},
            {field: 'updateTime', title: '修改时间', minWidth: 100, align: 'center'}
        ]]
    });

    //搜索
    $(".search_btn").on("click", function () {
        table.reload("tableList", {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                tableName: $(".tableName").val()
            }
        })
    });

    //添加角色
    function addCode(edit) {
        var title = edit === null ? "添加角色" : "编辑角色";
        layui.layer.open({
            title: title,
            type: 2,
            area: ["550px", "300px"],
            content: "info.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find("#id").val(edit.id);
                    body.find(".name").val(edit.name);
                    body.find(".code").val(edit.code);
                    body.find(".value").val(edit.value);
                    form.render();
                }
            }
        })
    }

    $(".add_btn").click(function () {
        addCode(null);
    });

    $(".edit_btn").click(function () {
        var checkStatus = table.checkStatus('tableList'),
            data = checkStatus.data;
        if (data.length > 0) {
            addCode(data[0]);
        } else {
            layer.msg("请选择需要修改的参数");
        }
    });
    //批量删除
    $(".del_btn").click(function () {
        var checkStatus = table.checkStatus('tableList'),
            data = checkStatus.data;
        if (data.length > 0) {
            layer.confirm('确定删除选中的参数s？', {icon: 3, title: '提示信息'}, function (index) {
                $.get("/param/del", {
                    id: data[0].id
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
            layer.msg("请选择需要删除的参数");
        }
    })

})
