layui.config({
    base: '/static/layui/'
}).extend({
    treeSelect: 'treeSelect'
}).use(['form', 'layer', 'tree', "treeSelect"], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        treeSelect = layui.treeSelect;

    //这是用来生成编辑框主管列表的
    var userList;
    $.post("/user/listDataSelect?glbm=" + $("#id").val(), {
        available: 1
    }, function (data) {
        userList = data.data;
        // depTable();
        //渲染主管
        userList.forEach(function (e) {
            $("#manager").append("<option value='" + e.id + "'>" + e.name + "</option>");
        });
        $("#manager").val($("#managerId").val());//默认选中
        form.render('select');//刷新select选择框渲染
    });
    treeSelect.render({
        // 选择器
        elem: '#pTree',
        // 数据
        // data: '/dept/listDataTreeWithoutCode?pid=1',
        data: '/dept/listDataTreeWithoutCode',
        // 异步加载方式：get/post，默认get
        type: 'get',
        // 占位符
        placeholder: '请选择上级部门',
        // 是否开启搜索功能：true/false，默认false
        search: false,
        // 点击回调
        click: function (d) {
            $("#pid").val(d.current.id);
        },
        // 加载完成后的回调函数
        success: function (d) {
//                选中节点，根据id筛选
            var pid = $("#pid").val();
            console.log(pid)
            treeSelect.checkNode('pTree', pid);

//                获取zTree对象，可以调用zTree方法
//                var treeObj = treeSelect.zTree('tree');
//                console.log(treeObj);

//                刷新树结构
//                treeSelect.refresh();
        }
    });

    form.on("submit(addDept)", function (data) {
        //弹出loading
        var index = top.layer.msg('数据保存中，请稍候...', {icon: 16, time: false, shade: 0.8});
        if ($("#id").val() === "") {
            data.field.manger = "";
            console.log(data.field);
            // var xx = Object.assign(data.field,{manager:""})
            $.post("/dept/add", data.field, function (res) {
                if (res.data) {
                    layer.close(index);
                    layer.msg("添加成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                } else {
                    layer.msg(data.msg);
                }
            })
        } else {
            $.post("/dept/edit", data.field, function (res) {
                if (res.data) {
                    layer.close(index);
                    layer.msg("修改成功！");
                    layer.closeAll("iframe");
                    $("#id").val("");
                    $("#pid").val("");
                    $("#managerId").val("");
                    //刷新父页面
                    parent.location.reload();
                } else {
                    layer.msg(data.msg);
                }
            })
        }
        return false;
    })

})