layui.use(['form', 'layer', 'tree'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        tree = layui.tree;

    // tree({
    //     elem: "#department"
    //     ,
    //     nodes: [{
    //         name: '常用文件夹',
    //         id: 1,
    //         alias: 'changyong',
    //         children: [{name: '所有未读', id: 11, href: 'http://www.layui.com/', alias: 'weidu'}, {
    //             name: '置顶邮件',
    //             id: 12
    //         }, {name: '标签邮件', id: 13}]
    //     }, {
    //         name: '我的邮箱',
    //         id: 2,
    //         spread: true,
    //         children: [{
    //             name: 'QQ邮箱',
    //             id: 21,
    //             spread: true,
    //             children: [{
    //                 name: '收件箱',
    //                 id: 211,
    //                 children: [{name: '所有未读', id: 2111}, {name: '置顶邮件', id: 2112}, {name: '标签邮件', id: 2113}]
    //             }, {name: '已发出的邮件', id: 212}, {name: '垃圾邮件', id: 213}]
    //         }, {
    //             name: '阿里云邮',
    //             id: 22,
    //             children: [{name: '收件箱', id: 221}, {name: '已发出的邮件', id: 222}, {name: '垃圾邮件', id: 223}]
    //         }]
    //     }]
    //     ,
    //     click: function (node) {
    //         var $select = $($(this)[0].elem).parents(".layui-form-select");
    //         $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='selectID']").val(node.id);
    //     }
    // });

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
            $.post("/user/add", data.field, function (res) {
                if (res.data) {
                    layer.close(index);
                    layer.msg("添加成功！");
                    // layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                } else {
                    layer.msg(data.msg);
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
                    layer.msg(data.msg);
                }
            })
        }
        return false;
    })

})