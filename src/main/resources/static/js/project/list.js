layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;
    //部门翻译
    var departmentList;
    $.post("/dept/listData", {
        available: 1
    }, function (data) {
        departmentList = data.data;
    });

    //项目经理翻译
    var userList;
    $.post("/user/listDataSelect", {
        available: 1
    }, function (data) {
        userList = data.data;
    });

    //项目列表
    var tableIns = table.render({
        elem: '#newsList',
        url: '/project/listData',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 10,
        limits: [10, 15, 20, 25],
        id: "newsListTable",
        cols: [[
            {type: "checkbox", fixed: "left"},
            {field: 'name', title: '项目名称', align: "center", width: 200,},
            {field: 'number', title: '项目编号', width: 120,},
            {field: 'lxsj', title: '立项时间', align: 'center', width: 120,},
            {
                field: 'department', title: '部门', align: 'center', width: 120, templet: function (d) {
                    var name = "";

                    for (var i = 0; i < departmentList.length; i++) {
                        if (departmentList[i].id === d.department) {
                            name = departmentList[i].bmmc;
                            break;
                        }
                    }
                    return name;
                }
            },
            {
                field: 'manager', title: '项目经理', align: 'center', width: 120, templet: function (d) {
                    var name = "";
                    for (var i = 0; i < userList.length; i++) {
                        if (userList[i].id === d.manager) {
                            name = userList[i].name;
                            break;
                        }
                    }
                    return name;
                }
            },
            {
                field: 'rjkfjd', title: '软件开发进度', align: 'center', width: 120, templet: function (d) {
                    if (d.rjkfjd === 0) {
                        return '<span class="layui-badge layui-bg-orange">工作中</span>';
                    } else if (d.rjkfjd === 1) {
                        return '<span class="layui-badge layui-bg-black">暂停中</span>';
                    } else if (d.rjkfjd === 2) {
                        return '<span class="layui-badge layui-bg-blue">测试中</span>';
                    } else if (d.rjkfjd === 3) {
                        return '<span class="layui-badge layui-bg-green">完工</span>';
                    }
                }
            },
            {
                field: 'fawcqk', title: '方案完成情况', align: 'center', width: 120, templet: function (d) {
                    return isComplete(d.fawcqk);
                }
            },
            {
                field: 'cpxxwcqk', title: '产品选型情况', align: 'center', width: 120, templet: function (d) {
                    return isComplete(d.cpxxwcqk)
                }
            },
            {
                field: 'zbzzwcqk', title: '招标组织完成情况', align: 'center', width: 140, templet: function (d) {
                    return isPass(d.zbzzwcqk)
                }
            },
            {
                field: 'yzjhbqd', title: '用资计划表确定', align: 'center', width: 140, templet: function (d) {
                    return isPass(d.yzjhbqd)
                }
            },
            {
                field: 'htqd', title: '合同签订', align: 'center', templet: function (d) {
                    return isComplete(d.htqd)
                }
            },
            {
                field: 'yjcg', title: '硬件采购', align: 'center', templet: function (d) {
                    if (d.rjkfjd === 0) {
                        return '<span class="layui-badge layui-bg-orange">开始</span>';
                    } else if (d.rjkfjd === 1) {
                        return '<span class="layui-badge layui-bg-blue">进行中</span>';
                    } else if (d.rjkfjd === 2) {
                        return '<span class="layui-badge layui-bg-green">完成</span>';
                    }
                }
            },
            {
                field: 'sgqr', title: '施工队确认', align: 'center', width: 120, templet: function (d) {
                    return isComplete(d.sgqr)
                }
            },
            {
                field: 'jcjd', title: '集成工作进度', align: 'center', width: 120, templet: function (d) {
                    if (d.rjkfjd === 0) {
                        return '<span class="layui-badge layui-bg-black">到场</span>';
                    } else if (d.rjkfjd === 1) {
                        return '<span class="layui-badge layui-bg-orange">实施</span>';
                    } else if (d.rjkfjd === 2) {
                        return '<span class="layui-badge layui-bg-blue">完工</span>';
                    } else if (d.rjkfjd === 3) {
                        return '<span class="layui-badge layui-bg-green">验收</span>';
                    }
                }
            },
            {field: 'htje', title: '合同金额', align: 'center'},
            {field: 'hkqk', title: '回款情况', align: 'center'},
            {field: 'whje', title: '未回金额', align: 'center'},
            {field: 'whsx', title: '未回时限', align: 'center'},
            {field: 'hktz', title: '回款通知', align: 'center'},
            {field: 'ml', title: '毛利', align: 'center'},
            {field: 'zbj', title: '质保金', align: 'center'},
            {field: 'zbjthqk', title: '质保金退还情况', width: 120, align: 'center'},
            {
                field: 'xmjx', title: '项目结项', align: 'center', templet: function (d) {
                    if (d.xmjx === 0) {
                        return '<span class="layui-badge layui-bg-red">未结项</span>';
                    } else {
                        return '<span class="layui-badge layui-bg-green">已结项</span>';
                    }
                }
            }
        ]],

        done: function (res, curr, count) {
            $('#newsList').next().find('.layui-table-body').find("table").find("tbody").children("tr").on('dblclick', function () {
                var id = JSON.stringify($('#newsList').next().find('.layui-table-body').find("table").find("tbody").find(".layui-table-hover").data('index'));
                var obj = res.data[id];
                console.log(obj.number);
                // $(window).one("resize", function () {
                var index = layui.layer.open({
                    title: "项目详情",
                    type: 2,
                    content: "chart.html",
                    success: function (layero, index) {
                        setTimeout(function () {
                            layui.layer.tips('点击此处返回项目列表', '.layui-layer-setwin .layui-layer-close', {
                                tips: 3
                            });
                        }, 500)
                    }
                })
                layui.layer.full(index);
            })
            // }).resize();
        }
    });

    function isComplete(value) {
        if (value === 0) {
            return '<span class="layui-badge layui-bg-red">未完成</span>';
        } else {
            return '<span class="layui-badge layui-bg-green">完成</span>';
        }
    }

    function isPass(value) {
        if (value === 0) {
            return '<span class="layui-badge layui-bg-red">未通过</span>';
        } else {
            return '<span class="layui-badge layui-bg-green">通过</span>';
        }
    }

    //是否置顶
    form.on('switch(newsTop)', function (data) {
        var index = layer.msg('修改中，请稍候', {icon: 16, time: false, shade: 0.8});
        setTimeout(function () {
            layer.close(index);
            if (data.elem.checked) {
                layer.msg("置顶成功！");
            } else {
                layer.msg("取消置顶成功！");
            }
        }, 500);
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function () {
        if ($(".searchVal").val() != '') {
            table.reload("newsListTable", {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        } else {
            layer.msg("请输入搜索的内容");
        }
    });

    //添加项目
    function addNews(edit) {
        var h = "700px";
        var title = "添加项目";
        if (edit) {
            h = "280px";
            title = "编辑项目";
        }
        layui.layer.open({
            title: title,
            type: 2,
            area: ["1200px", h],
            content: "info.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find(".newsName").val(edit.newsName);
                    body.find(".abstract").val(edit.abstract);
                    body.find(".thumbImg").attr("src", edit.newsImg);
                    body.find("#news_content").val(edit.content);
                    body.find(".newsStatus select").val(edit.newsStatus);
                    body.find(".openness input[name='openness'][title='" + edit.newsLook + "']").prop("checked", "checked");
                    body.find(".newsTop input[name='newsTop']").prop("checked", edit.newsTop);
                    form.render();
                }
                setTimeout(function () {
                    layui.layer.tips('点击此处返回项目列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        // layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        // $(window).on("resize", function () {
        //     layui.layer.full(index);
        // })
    }

    $(".add_btn").click(function () {
        addNews();
    })

    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('newsListTable'),
            data = checkStatus.data,
            newsId = [];
        if (data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].newsId);
            }
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除文章接口",{
                //     newsId : newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            })
        } else {
            layer.msg("请选择需要删除的文章");
        }
    })

    //列表操作
    table.on('tool(newsList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            addNews(data);
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除此文章？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除文章接口",{
                //     newsId : data.newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            });
        } else if (layEvent === 'look') { //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        }
    });

})