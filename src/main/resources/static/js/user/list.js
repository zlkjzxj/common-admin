layui.use(['form', 'layer', 'table', 'tree', 'laypage'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laypage = layui.laypage,
        table = layui.table;

    layui.tree({
        elem: '#depTree',
        skin: 'shihuang',
        nodes: createTree(),
        click: function (node) {
            console.log(node);
            //这里设置值得目的是为了把值传递给添加或修改用户的时候给下拉部门树赋值让其选中
            $("#sonGlbm").val(node.id);
            $("#parentGlbm").val(node.id);
            table.reload("userListTable", {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    glbm: node.id,
                }
            });
        }
    });

    function createTree() {
        var nodes = "";
        $.ajax({
            url: '/dept/listDataTree',
            method: 'GET',
            dataType: 'json',
            async: false,
            success: function (data) {
                console.log(data.data)
                nodes = data.data;
            },
            error: function (e) {
                // top.layer.close(index);
                top.layer.msg("创建部门树失败！");
            }
        })
        return nodes;
    }

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

    //用户列表
    var tableIns = table.render({
        elem: '#userList',
        url: '/user/listData',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 10,
        limits: [10, 20, 30],
        id: "userListTable",
        cols: [[
            {type: "radio", fixed: "left", width: 50},
            {field: 'name', title: '用户名称', minWidth: 100, align: 'center'},
            {field: 'userName', title: '登录名称', minWidth: 100, align: "center"},
            {
                field: 'roleId', title: '角色名称', minWidth: 100, align: 'center', templet: function (d) {
                    var name = "";
                    roleList.forEach(function (e) {
                        if (e.id === d.roleId) {
                            name = e.roleName;
                        }
                    });
                    return name;
                }
            },
            {field: 'glbm', title: '管理部门', minWidth: 100, align: "center"},
            {
                field: 'state', title: '用户状态', minWidth: 100, align: 'center', templet: function (d) {
                    if (d.state === 1) {
                        return '<span class="layui-badge layui-bg-green">启用</span>';
                    } else if (d.state === 0) {
                        return '<span class="layui-badge layui-bg-cyan">禁用</span>';
                    } else {
                        return '<span class="layui-badge layui-bg-orange">锁定</span>';
                    }
                }
            },
            {field: 'updateTime', title: '修改时间', align: 'center', minWidth: 100},
            {field: 'createTime', title: '创建时间', align: 'center', minWidth: 100},
            {
                title: '重置密码', align: 'center', minWidth: 100, templet: function () {
                    return '<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="editPass">重置密码</a>';
                }
            },
        ]],
        done: function (res, curr, count) {
            // 隐藏列
            $(".layui-table-box").find("[data-field='glbm']").css("display", "none");
            /*laypage.render({
                elem: '#userList',
                count: count,
                limit: 5,
                limits: [5, 10, 15]
            })*/
        }
    });

    //搜索
    $(".search_btn").on("click", function () {
        table.reload("userListTable", {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                userName: $(".userName").val(),
                name: $(".name").val(),
                state: $(".state").val(),
                roleId: $(".roleId").val(),
                glbm: $("#parentGlbm").val()
            }
        })
    });

    //添加用户
    function addUser(edit) {
        var h = "440px";
        var title = "添加用户";
        if (edit) {
            h = "400px";
            title = "编辑用户";
            //必须提前设置，不然就没用了
            $("#sonGlbm").val(edit.glbm);
        } else {
            var parentGlbm = $("#parentGlbm").val();
            if (parentGlbm != "") {
                $("#sonGlbm").val(parentGlbm);
            } else {
                $("#sonGlbm").val("");
            }

        }
        layui.layer.open({
            title: title,
            type: 2,
            area: ["420px", h],
            content: "info.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    console.log(edit)
                    body.find("#pwd1").remove();
                    body.find("#id").val(edit.id);
                    body.find("#name").val(edit.name);
                    body.find("#userName").val(edit.userName);
                    body.find("#roleId").val(edit.roleId);
                    body.find("#stateSelect").val(edit.state);
                    form.render();
                }
            }
        })
    }

    $(".add_btn").click(function () {
        addUser();
    });

    $(".edit_btn").click(function () {
        var checkStatus = table.checkStatus('userListTable'),
            data = checkStatus.data;
        if (data.length > 0) {
            addUser(data[0]);
        } else {
            layer.msg("请选择需要修改的用户");
        }
    });

    //重置密码
    table.on('tool(userList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;
        if (layEvent === 'editPass') {
            $.post("/user/resetPass", {id: data.id}, function (e) {
                layer.msg("重置密码成功！");
            });
        }
    });

    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('userListTable'),
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

})
