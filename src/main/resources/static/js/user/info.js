layui.config({
    base: '/static/layui/'
}).extend({
    treeSelect: 'treeSelect'
}).use(['form', 'layer', 'treeSelect'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        treeSelect = layui.treeSelect;

    treeSelect.render({
        // 选择器
        elem: '#glbmTree',
        // 数据
        data: '/dept/listDataTreeWithoutCode?pid=1',
        // 异步加载方式：get/post，默认get
        type: 'get',
        // 占位符
        placeholder: '请选择部门',
        // 是否开启搜索功能：true/false，默认false
        search: false,
        // 点击回调
        click: function (d) {
            console.log("添加用户点击部门树了：" + d.current.id);
            $("#glbm").val(d.current.id);
            $("#glbmTree").val(d.current.id);
        },
        // 加载完成后的回调函数
        success: function (d) {
            var glbm = window.parent.document.getElementById("sonGlbm").value;
            //部门树被点击之后才能初始化部门下拉列表
            if (glbm != '' && glbm != 1) {
                //虽然这里选中了，但是不点击的话没给glbm赋值，
                $("#glbmTree").val(glbm);
                $("#glbm").val(glbm);
                treeSelect.checkNode('glbmTree', glbm);
            }

            // var treeObj = treeSelect.zTree('tree');
            // console.log(treeObj);

//                刷新树结构
//                treeSelect.refresh();
        }
    })

    $.post("/role/selectListData", {
        available: 1
    }, function (data) {
        var roleList = data.data;
        roleList.forEach(function (e) {
            $("#roleSelect").append("<option value='" + e.id + "'>" + e.roleName + "</option>");
        });
        $("#roleSelect").val($("#roleId").val());//默认选中
        form.render('select');//刷新select选择框渲染
    });

//添加验证规则
    form.verify({
        newPwd: function (value, item) {
            if (value.length < 6) {
                return "密码长度不能小于6位";
            }
        },
        confirmPwd: function (value, item) {
            if (!new RegExp($("#newPwd").val()).test(value)) {
                return "两次输入密码不一致，请重新输入！";
            }
        }
    })

    form.on("submit(addUser)", function (data) {
        //弹出loading
        var index = top.layer.msg('数据保存中，请稍候...', {icon: 16, time: false, shade: 0.8});
        if ($("#id").val() === "") {
            console.log(data.field);
            $.post("/user/add", data.field, function (res) {
                if (res.data) {
                    layer.close(index);
                    layer.msg("添加成功！");
                    // layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                } else {
                    console.log(res);
                    layer.msg(res.msg);
                }
            })
        } else {
            $.post("/user/edit", data.field, function (res) {
                if (res.data) {
                    layer.close(index);
                    layer.msg("修改成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                } else {
                    layer.msg(res.msg);
                }
            })
        }
        return false;
    })

})