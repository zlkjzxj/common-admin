layui.config({
    base: '/static/layui/'
}).extend({
    treeSelect: 'treeSelect',
}).use(['form', 'layer', 'laydate', 'table', 'laytpl', 'treeSelect',], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table,
        treeSelect = layui.treeSelect
    ;
    //部门翻译
    var departmentList;
    $.post("/dept/listData", {
        available: 1
    }, function (data) {
        departmentList = data.data;
    });
    //主页按部门查询的部门列表
    treeSelect.render({
        // 选择器
        elem: '#departmentSelect',
        // 数据
        // data: '/dept/listDataTreeWithoutCode?pid=1',
        data: '/dept/listDataTreeWithoutCode',
        // 异步加载方式：get/post，默认get
        type: 'get',
        // 占位符
        placeholder: '请选择部门',
        // 是否开启搜索功能：true/false，默认false
        search: false,
        // 一些可定制的样式
        style: {
            folder: {
                enable: true
            },
            line: {
                enable: true
            }
        },
        // 点击回调
        click: function (d) {
            $("#departVal").val(d.current.id);
        }
    })
    //项目经理翻译
    var userList;
    $.post("/user/listDataSelect", {
        available: 1
    }, function (data) {
        userList = data.data;
        initTable();
    });

    //项目列表
    var initTable = function () {
        var tableIns = table.render({
            elem: '#projectList',
            url: '/project/listData',
            cellMinWidth: 95,
            page: true,
            height: "full-175",//高度最大化减去125
            limit: 10,
            limits: [10, 20, 30],
            id: "projectList",
            // skin:'nob',
            // size:"sm",
            even: true,
            // toolbar:true,
            autoSort: true,
            sortType: 'server',
            title: '宜元中林项目表',//导出Excel的时候会用到
            initSort: {//默认排序
                field: 'number' //排序字段，对应 cols 设定的各字段名
                , type: 'asc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
            },
            cols: [[
                {type: "radio", fixed: "left"},
                {field: 'name', title: '项目名称', align: "center", width: 200},
                {field: 'number', title: '项目编号', width: 120, sort: true},
                {
                    field: 'sflx', title: '是否立项', width: 100, align: 'center', templet: function (d) {
                    if (d.sflx === 0) {
                        return '<span class="layui-badge layui-bg-red">否</span>';
                    } else {
                        return '<span class="layui-badge layui-bg-green">是</span>';
                    }
                }
                },
                {field: 'lxsj', title: '立项时间', align: 'center', width: 120, sort: true},
                {field: 'bmmc', title: '部门', align: 'center', width: 120},
                {field: 'userName', title: '项目经理', align: 'center', width: 120},
                {
                    field: 'rjkfjd', title: '软件开发进度', align: 'center', width: 120, templet: function (d) {
                    if (d.rjkfjd === 0) {
                        return '<span class="layui-badge layui-bg-orange">未开始</span>';
                    } else if (d.rjkfjd === 1) {
                        return '<span class="layui-badge layui-bg-orange">工作中</span>';
                    } else if (d.rjkfjd === 2) {
                        return '<span class="layui-badge layui-bg-black">暂停中</span>';
                    } else if (d.rjkfjd === 3) {
                        return '<span class="layui-badge layui-bg-blue">测试中</span>';
                    } else if (d.rjkfjd === 4) {
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
                    if (d.zbzzwcqk === 0) {
                        return '<span class="layui-badge layui-bg-red">未完成</span>';
                    } else if (d.zbzzwcqk === 1) {
                        return '<span class="layui-badge layui-bg-green">完成</span>';
                    } else {
                        return '<span class="layui-badge layui-bg-black">不招标</span>';
                    }
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
                    if (d.yjcg === 0) {
                        return '<span class="layui-badge layui-bg-red">未开始</span>';
                    } else if (d.rjkfjd === 1) {
                        return '<span class="layui-badge layui-bg-blue">销售合同签订中</span>';
                    } else if (d.rjkfjd === 2) {
                        return '<span class="layui-badge layui-bg-orange">进行中</span>';
                    } else if (d.rjkfjd === 3) {
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
                    if (d.jcjd === 0) {
                        return '<span class="layui-badge layui-bg-black">未开始</span>';
                    } else if (d.rjkfjd === 1) {
                        return '<span class="layui-badge layui-bg-orange">到场</span>';
                    } else if (d.rjkfjd === 2) {
                        return '<span class="layui-badge layui-bg-blue">实施</span>';
                    } else if (d.rjkfjd === 3) {
                        return '<span class="layui-badge layui-bg-green">完工</span>';
                    } else if (d.rjkfjd === 4) {
                        return '<span class="layui-badge layui-bg-green">验收</span>';
                    }
                }
                },
                {field: 'htje', title: '合同金额', align: 'center'},
                {field: 'hkqk', title: '回款情况', align: 'center'},
                {field: 'whje', title: '未回金额', align: 'center'},
                {field: 'whsx', title: '未回时限', align: 'center', width: 120,},
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
                //监听行双击事件  layui 新版添加，上面是旧版没有这个方法
                table.on('rowDouble(projectList)', function (obj) {
                    $("#projectId").val(obj.data.id);
                    // $(window).one("resize", function () {
                    var index = layui.layer.open({
                        title: "项目详情流程图",
                        type: 2,
                        area: ["1200px", "750px"],
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
                });
            }
        });
        return tableIns;
    }
    // var tableIns = initTable();
    //监听排序事件
    table.on('sort(projectList)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"

        //尽管我们的 table 自带排序功能，但并没有请求服务端。
        //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
        table.reload('projectList', {
            initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
            , where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                field: obj.field //排序字段
                , order: obj.type //排序方式
            }
        });
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

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function () {
        console.log($("#departVal").val(), $("#departmentSelect").val())
        table.reload("projectList", {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                fuzzySearchVal: $(".searchVal").val(),
                department: $("#departVal").val(),
                xmjx: $("#sfjxSelect").val(),
                sflx: $("#sflxSelect").val(),
                rjkfjd: $("#rjkfjdSelect").val(),
                fawcqk: $("#fawcqkSelect").val(),
                cpxxwcqk: $("#cpxxwcqkSelect").val(),
                zbzzwcqk: $("#zbzzwcqkSelect").val(),
                yzjhbqd: $("#yzjhbqdSelect").val(),
                htqd: $("#htqdSelect").val(),
                yjcg: $("#yjcgSelect").val(),
                sgqr: $("#sgqrSelect").val(),
                jcjd: $("#jcjdSelect").val()
            }
        })
    });

    //添加项目
    function addNews(type, data) {
        // var h = "750px";
        var title = "添加项目";
        if (type === 'add') {

        } else {
            title = "编辑项目";
        }
        //修改项目需要判断是否添加人还是修改人
        var userId = $("#userId").val();
        var index = layui.layer.open({
            title: title,
            type: 2,
            area: ["1200px", "750px"],
            content: "info.html",
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (type === 'edit') {
                    body.find("#id").val(data.id);
                    body.find("#name").val(data.name);
                    body.find("#number").val(data.number.substring(0, 8));
                    body.find("#number1").val(data.number.substring(8, 11));
                    body.find("#sflx").val(data.sflx);
                    body.find("#lxsj").val(data.lxsj);
                    body.find("#dTree").val(data.department);
                    body.find("#manager1").val(data.manager);
                    body.find("#rjkfjd").val(data.rjkfjd);
                    // body.find("input:radio[name='fawcqk']").eq(edit.fawcqk).prop("checked", "checked");
                    body.find(":radio[name='fawcqk'][value='" + data.fawcqk + "']").prop("checked", "true");
                    body.find(":radio[name='cpxxwcqk'][value='" + data.cpxxwcqk + "']").prop("checked", "checked");
                    body.find("#zbzzwcqk").val(data.zbzzwcqk);
                    body.find(":radio[name='yzjhbqd'][value='" + data.yzjhbqd + "']").prop("checked", "checked");
                    body.find(":radio[name='htqd'][value='" + data.htqd + "']").prop("checked", "checked");
                    body.find("#sgqr").val(data.sgqr);

                    body.find("#htje").val(data.htje);
                    body.find("#hkqk").val(data.hkqk);
                    body.find("#whje").val(data.whje);
                    body.find("#whsx").val(data.whsx);
                    body.find("#hktz").val(data.hktz);
                    body.find("#ml").val(data.ml);
                    body.find("#zbj").val(data.zbj);
                    body.find("#zbjthqk").val(data.zbjthqk);


                    if (userId == data.lrr) {
                        //录入人的可改
                        //修改人的不可改
                        body.find("#htje").prop("disabled", true);
                        body.find("#hkqk").prop("disabled", true);
                        body.find("#whje").prop("disabled", true);
                        body.find("#whsx").prop("disabled", true);
                        body.find("#hktz").prop("disabled", true);
                        body.find("#ml").prop("disabled", true);
                        body.find("#zbj").prop("disabled", true);
                        body.find("#zbjthqk").prop("disabled", true);

                        body.find(":checkbox[name='sfjx']").prop("disabled", true);

                    } else if (userId == data.xgr || data.xgr == null) {
                        body.find("#name").prop("disabled", true);
                        body.find("#number").prop("disabled", true);
                        body.find("#sflx").prop("disabled", true);
                        body.find("#lxsj").prop("disabled", true);
                        body.find("#dTree").prop("disabled", true);
                        body.find("#manager").prop("disabled", true);
                        body.find("#rjkfjd").prop("disabled", true);
                        body.find("#fawcqk").prop("disabled", true);
                        body.find(":radio[name='fawcqk']").prop("disabled", true);
                        body.find(":radio[name='cpxxwcqk']").prop("disabled", true);
                        body.find("#zbzzwcqk").prop("disabled", true);
                        body.find(":radio[name='yzjhbqd']").prop("disabled", true);
                        body.find(":radio[name='htqd']").prop("disabled", true);
                        body.find("#yjcg").prop("disabled", true);
                        body.find("#sgqr").prop("disabled", true);
                        body.find("#jcjd").prop("disabled", true);
                    } else {
                        body.find("#htje").prop("disabled", true);
                        body.find("#hkqk").prop("disabled", true);
                        body.find("#whje").prop("disabled", true);
                        body.find("#whsx").prop("disabled", true);
                        body.find("#hktz").prop("disabled", true);
                        body.find("#ml").prop("disabled", true);
                        body.find("#zbj").prop("disabled", true);
                        body.find("#zbjthqk").prop("disabled", true);

                        body.find(":checkbox[name='sfjx']").prop("disabled", true);

                        body.find("#name").prop("disabled", true);
                        body.find("#number").prop("disabled", true);
                        body.find("#sflx").prop("disabled", true);
                        body.find("#lxsj").prop("disabled", true);
                        body.find("#dTree").prop("disabled", true);
                        body.find("#manager").prop("disabled", true);
                        body.find("#rjkfjd").prop("disabled", true);
                        body.find("#fawcqk").prop("disabled", true);
                        body.find(":radio[name='fawcqk']").prop("disabled", true);
                        body.find(":radio[name='cpxxwcqk']").prop("disabled", true);
                        body.find("#zbzzwcqk").prop("disabled", true);
                        body.find(":radio[name='yzjhbqd']").prop("disabled", true);
                        body.find(":radio[name='htqd']").prop("disabled", true);
                        body.find("#yjcg").prop("disabled", true);
                        body.find("#sgqr").prop("disabled", true);
                        body.find("#jcjd").prop("disabled", true);
                        body.find("#addProject").prop("disabled", true).addClass("layui-btn-disabled");
                    }

                    form.render();
                } else {
                    body.find("#number1").val(data);
                    body.find("#htje").prop("disabled", true);
                    body.find("#hkqk").prop("disabled", true);
                    body.find("#whje").prop("disabled", true);
                    body.find("#whsx").prop("disabled", true);
                    body.find("#hktz").prop("disabled", true);
                    body.find("#ml").prop("disabled", true);
                    body.find("#zbj").prop("disabled", true);
                    body.find("#zbjthqk").prop("disabled", true);
                    body.find(":checkbox[name='sfjx']").prop("disabled", true);
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
        // //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        // $(window).on("resize", function () {
        //     layui.layer.full(index);
        // })
    }

    $(".add_btn").click(function () {
        var date = new Date;
        var year = date.getFullYear();
        $.post("/project/getAddSequence?year=" + year, function (data) {
            console.log(data);
            addNews('add', data.data);
        });

    })
    $(".edit_btn").click(function () {
        var checkStatus = table.checkStatus('projectList'),
            data = checkStatus.data;
        if (data.length > 0) {
            addNews('edit', data[0]);
        } else {
            layer.msg("请选择需要修改的项目");
        }
    });
    $(".export_btn").click(function () {
        //将上述表格示例导出为 csv 文件
        var data = table.clearCacheKey(table.cache['projectList']);
        // for (var i = 0, len = data.length; i < len; i++) {
        //     //是否立项
        //     console.log(data[i]['sflx']);
        //     data[i]['sflx'] = isornot(data[i]['sflx'])
        //     console.log(data[i]['sflx']);
        // }
        // console.log(data);
        table.exportFile_project('projectList', data, 'xls'); //data 为该实例中的任意数量的数据
        //可以不依赖table的实例
        /* table.exportFile(['名字','性别','年龄'], [
             ['张三','男','20'],
             ['李四','女','18'],
             ['王五','女','19']
         ], 'xls'); //默认导出 csv，也可以为：xls*/
    })

    //导出数据所需要的翻译

    //是否
    function isornot(value) {
        console.log(value === 1);
        if (value === 1) {
            return '是';
        }
        return '否';
    }

    //通过
    function ispass(value) {
        if (value === 1) {
            return '通过';
        }
        return '未通过';
    }

    //完成
    function iscomplete(value) {
        if (value === 1) {
            return '完成';
        }
        return '未完成';
    }

    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('projectList'),
            data = checkStatus.data;
        console.log(data);
        if (data.length > 0) {
            layer.confirm('确定删除选中的项目？', {icon: 3, title: '提示信息'}, function (index) {
                $.post("/project/del", {
                    id: data[0]['id']
                }, function (data) {
                    var tableIns = initTable();
                    tableIns.reload();
                    layer.close(index);
                })
            })
        } else {
            layer.msg("请选择需要删除的项目");
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