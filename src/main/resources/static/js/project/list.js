layui.config({
    base: '/static/'
}).extend({
    treeSelect: 'layui/treeSelect',
    transcode: "js/transcode"
}).use(['form', 'layer', 'laydate', 'table', 'laytpl', 'treeSelect', 'transcode'], function () {
        var form = layui.form,
            layer = parent.layer === undefined ? layui.layer : top.layer,
            $ = layui.jquery,
            table = layui.table,
            treeSelect = layui.treeSelect,
            transcode = layui.transcode
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
                    {field: 'name', title: '项目名称', align: "left", width: 250},
                    {field: 'number', title: '项目编号', width: 150, sort: true},
                    {field: 'bmmc', title: '部门', align: 'center', width: 120},
                    {field: 'userName', title: '项目经理', align: 'center', width: 120},
                    {field: 'lxsj', title: '立项时间', align: 'center', width: 120, sort: true},
                    {
                        field: 'sflx', title: '是否立项', width: 100, align: 'center', templet: function (d) {
                            if (d.sflx === 0) {
                                return '<span class="layui-badge layui-bg-red">否</span>';
                            } else {
                                return '<span class="layui-badge layui-bg-green">是</span>';
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
                            } else {
                                return '<span class="layui-badge layui-bg-black">无</span>';
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
                            } else {
                                return '<span class="layui-badge layui-bg-black">无</span>';
                            }
                        }
                    },
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
                            } else {
                                return '<span class="layui-badge layui-bg-black">无</span>';
                            }
                        }
                    },
                    {
                        field: 'htje', title: '合同金额', align: 'right', width: 150, templet: function (d) {
                            return formatNumber(d.htje);
                        }
                    },
                    {
                        field: 'hkqk', title: '回款金额', align: 'right', width: 150, templet: function (d) {
                            return formatNumber(d.hkqk);
                        }
                    },
                    {
                        field: 'whje', title: '未回金额', align: 'right', width: 150, templet: function (d) {
                            return formatNumber(d.whje);
                        }
                    },
                    {field: 'whsx', title: '未回时限', align: 'center', width: 120,},
                    {
                        field: 'hktz', title: '回款通知', align: 'center', templet: function (d) {
                            if (d.hktz === 1) {
                                return '<span class="layui-badge layui-bg-green">已下达</span>';
                            } else {
                                return '<span class="layui-badge layui-bg-red">未下达</span>';
                            }
                        }
                    },
                    {
                        field: 'ml', title: '毛利', align: 'right', width: 150, templet: function (d) {
                            return formatNumber(d.ml);
                        }
                    },
                    {
                        field: 'zbj', title: '质保金', align: 'right', width: 150, templet: function (d) {
                            return formatNumber(d.zbj);
                        }
                    },
                    {
                        field: 'zbjthqk', title: '质保金退还情况', width: 150, align: 'center', templet: function (d) {
                            if (d.zbjthqk === 1) {
                                return '<span class="layui-badge layui-bg-green">已退还</span>';
                            } else {
                                return '<span class="layui-badge layui-bg-red">未退还</span>';
                            }
                        }
                    },
                    {
                        field: 'zbjthsx', title: '质保金退换时限', width: 150, align: 'center'
                    },
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
            } else if (value === 1) {
                return '<span class="layui-badge layui-bg-green">完成</span>';
            } else {
                return '<span class="layui-badge layui-bg-yellow">无</span>';
            }
        }

        function isPass(value) {
            if (value === 0) {
                return '<span class="layui-badge layui-bg-red">未通过</span>';
            } else if (value === 1) {
                return '<span class="layui-badge layui-bg-green">通过</span>';
            } else {
                return '<span class="layui-badge layui-bg-yellow">无</span>';
            }
        }

        //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
        $(".search_btn").on("click", function () {
            var htje = $("#htjeSearch").val();
            var hkqk = $("#yhjeSearch").val();
            console.log(htje)
            if (htje !== '') {
                if (htje.indexOf("-") > 0) {
                    var a = htje.split("-")[0];
                    var b = htje.split("-")[1];
                    if (isNaN(a) || isNaN(b)) {
                        console.log("xxx")
                        layer.msg("合同金额输入有误")
                        return;
                    }
                } else {
                    if (isNaN(htje)) {
                        console.log("vvv")
                        layer.msg("合同金额输入有误")
                        return;
                    }

                }

            }
            if (hkqk !== '') {
                if (hkqk.indexOf("-") > 0) {
                    var a = hkqk.split("-")[0];
                    var b = hkqk.split("-")[1];
                    if (isNaN(a) || isNaN(b)) {
                        layer.msg("已回金额输入有误")
                        return;
                    }
                } else {
                    if (isNaN(hkqk)) {
                        layer.msg("已回金额输入有误")
                        return;
                    }

                }

            }
            table.reload("projectList", {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    fuzzySearchVal: $(".searchVal").val(),
                    department: $("#departVal").val(),
                    xmjx: $("#xmjxSelect").val(),
                    sflx: $("#sflxSelect").val(),
                    rjkfjd: $("#rjkfjdSelect").val(),
                    fawcqk: $("#fawcqkSelect").val(),
                    cpxxwcqk: $("#cpxxwcqkSelect").val(),
                    zbzzwcqk: $("#zbzzwcqkSelect").val(),
                    yzjhbqd: $("#yzjhbqdSelect").val(),
                    htqd: $("#htqdSelect").val(),
                    yjcg: $("#yjcgSelect").val(),
                    sgqr: $("#sgqrSelect").val(),
                    jcjd: $("#jcjdSelect").val(),
                    hktz: $("#hktzSelect").val(),
                    zbjthqk: $("#zbjthqkSelect").val(),
                    htje: htje,
                    hkqk: hkqk
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
                    // area: 'auto',
                    content: "info.html",
                    success: function (layero, index) {
                        var body = layui.layer.getChildFrame('body', index);
                        body.find("#addoredit").val(type);
                        //项目编号年份初始化放到这， 不然在info.js初始化的话，编辑的时候还没初始化完就去赋值，就有问题了
                        var date = new Date;
                        var year = date.getFullYear();
                        body.find("#year").append("<option value=" + year + ">" + year + "</option>");
                        body.find("#year").append("<option value=" + (year - 1) + ">" + (year - 1) + "</option>");
                        //只有项目管理员才能点击项目结项
                        if (type === 'edit') {//编辑项目的人员,先赋值
                            console.log("我过来编辑了")
                            var permissionCodes = sessionStorage.getItem("permissionCodes");

                            body.find("#id").val(data.id);
                            body.find("#name").val(data.name);
                            body.find("#year").val(data.number.substring(0, 4));
                            body.find("#year1").val(data.number.substring(0, 4));
                            body.find("#number").val(data.number.substring(4, 8));
                            body.find("#number1").val(data.number.substring(8, 11));
                            body.find("#number11").val(data.number.substring(8, 11));
                            data.sflx === 1 ? body.find(":radio[name='sflx'][value=1]").prop("checked", true) : body.find(":radio[name='sflx'][value=0]").prop("checked", true);
                            body.find("#lxsj").val(data.lxsj);
                            body.find("#dTree").val(data.department);
                            body.find("#manager1").val(data.manager);
                            body.find("#rjkfjd").val(data.rjkfjd);
                            // body.find("input:radio[name='fawcqk']").eq(edit.fawcqk).prop("checked", "checked");
                            body.find("#fawcqk").val(data.fawcqk);
                            body.find("#cpxxwcqk").val(data.cpxxwcqk);
                            body.find("#zbzzwcqk").val(data.zbzzwcqk);
                            body.find("#yzjhbqd").val(data.zbzzwcqk);
                            body.find("#htqd").val(data.zbzzwcqk);
                            body.find("#sgqr").val(data.sgqr);
                            body.find("#htje").val(data.htje === '0' ? '' : formatNumber(data.htje));
                            body.find("#hkqk").val(data.hkqk === '0' ? '' : formatNumber(data.hkqk));
                            body.find("#whje").val(data.whje === '0' ? '' : formatNumber(data.whje));
                            body.find("#whsx").val(data.whsx);
                            data.hktz === 1 ? body.find(":radio[name='hktz'][value=1]").prop("checked", true) : body.find(":radio[name='hktz'][value=0]").prop("checked", true);
                            body.find("#ml").val(data.ml === '0' ? '' : formatNumber(data.ml));
                            body.find("#zbj").val(data.zbj === '0' ? '' : formatNumber(data.zbj));
                            data.zbjthqk === 1 ? body.find(":radio[name='zbjthqk'][value=1]").prop("checked", true) : body.find(":radio[name='zbjthqk'][value=0]").prop("checked", true);
                            body.find("#zbjthsx").val(data.zbjthsx);
                            data.sfzj === 1 ? body.find(":checkbox[name='sfzj']").prop("checked", true) : body.find(":checkbox[name='sfzj']").prop("checked", false);
                            // data.sfzj === 1 ? body.find(":checkbox[name='sfzj']").prop("disabled", true) : body.find(":checkbox[name='sfzj']").prop("disabled", false);
                            data.xmjx === 1 ? body.find(":checkbox[name='xmjx']").prop("checked", true) : body.find(":checkbox[name='xmjx']").prop("checked", false);
                            // data.xmjx === 1 ? body.find(":checkbox[name='xmjx']").prop("disabled", true) : body.find(":checkbox[name='xmjx']").prop("disabled", false);
                            //判断编辑人是不是录入人，如果是让他编辑项目这部分，且不能结项
                            if (userId == data.lrr) {
                                console.log("我是录入人来修改了")
                                body.find("#htje").prop("disabled", true);
                                body.find("#hkqk").prop("disabled", true);
                                body.find("#whje").prop("disabled", true);
                                body.find("#whsx").prop("disabled", true);
                                body.find(":radio[name='hktz']").prop("disabled", true);
                                body.find("#ml").prop("disabled", true);
                                body.find("#zbj").prop("disabled", true);
                                body.find(":radio[name='zbjthqk']").prop("disabled", true);
                                body.find("#zbjthsx").prop("disabled", true);
                                if (permissionCodes.indexOf("project:xmgl") > 0) {//判断是否有项目管理权限

                                    if (data.xmjx == 1) {//如果已经结项，那么结项按钮就不能点了
                                        body.find(":checkbox[name='xmjx']").prop("disabled", true);
                                    } else {
                                        body.find(":checkbox[name='xmjx']").prop("disabled", false);
                                    }
                                    if (data.sfzj == 1) {//如果已经追加，那么追加按钮也就不能点了
                                        body.find(":checkbox[name='sfzj']").prop("disabled", true);
                                    } else {
                                        body.find(":checkbox[name='sfzj']").prop("disabled", false);
                                    }
                                } else {
                                    body.find(":checkbox[name='xmjx']").prop("disabled", true);
                                    body.find(":checkbox[name='sfzj']").prop("disabled", true);
                                }

                            } else {//不是录入人
                                console.log("我不是录入人来修改")
                                //判断是否有财务权限
                                if (permissionCodes.indexOf("project:cw") > 0) {//判断是否有项目管理权限
                                    console.log("我是财务人员来修改")
                                    body.find("#name").prop("disabled", true);
                                    body.find("#year").prop("disabled", true);
                                    body.find("#number").prop("disabled", true);
                                    body.find(":radio[name='sflx']").prop("disabled", true);
                                    body.find("#lxsj").prop("disabled", true);
                                    body.find("#dTree").prop("disabled", true);
                                    body.find("#manager").prop("disabled", true);
                                    body.find("#rjkfjd").prop("disabled", true);
                                    body.find("#fawcqk").prop("disabled", true);
                                    body.find("#cpxxwcqk").prop("disabled", true);
                                    body.find("#zbzzwcqk").prop("disabled", true);
                                    body.find("#yzjhbqd").prop("disabled", true);
                                    body.find("#htqd").prop("disabled", true);
                                    body.find("#yjcg").prop("disabled", true);
                                    body.find("#sgqr").prop("disabled", true);
                                    body.find("#jcjd").prop("disabled", true);
                                    body.find(":checkbox[name='xmjx']").prop("disabled", true);
                                    body.find(":checkbox[name='sfzj']").prop("disabled", true);

                                } else {//是否项目管理员
                                    console.log("我是其他人员")
                                    body.find("#htje").prop("disabled", true);
                                    body.find("#hkqk").prop("disabled", true);
                                    body.find("#whje").prop("disabled", true);
                                    body.find("#whsx").prop("disabled", true);
                                    body.find(":radio[name='hktz']").prop("disabled", true);
                                    body.find("#ml").prop("disabled", true);
                                    body.find("#zbj").prop("disabled", true);
                                    body.find(":radio[name='zbjthqk']").prop("disabled", true);
                                    body.find("#zbjthsx").prop("disabled", true);

                                    body.find("#name").prop("disabled", true);
                                    body.find("#year").prop("disabled", true);
                                    body.find("#number").prop("disabled", true);
                                    body.find(":radio[name='sflx']").prop("disabled", true);
                                    body.find("#lxsj").prop("disabled", true);
                                    // body.find("#dTree").nextElementSibling.children.prop("disabled", true);
                                    body.find("#manager").prop("disabled", true);
                                    body.find("#rjkfjd").prop("disabled", true);
                                    body.find("#fawcqk").prop("disabled", true);
                                    body.find("#cpxxwcqk").prop("disabled", true);
                                    body.find("#zbzzwcqk").prop("disabled", true);
                                    body.find("#yzjhbqd").prop("disabled", true);
                                    body.find("#htqd").prop("disabled", true);
                                    body.find("#yjcg").prop("disabled", true);
                                    body.find("#sgqr").prop("disabled", true);
                                    body.find("#jcjd").prop("disabled", true);
                                    body.find(":checkbox[name='xmjx']").prop("disabled", true);
                                    body.find(":checkbox[name='sfzj']").prop("disabled", true);

                                    if (permissionCodes.indexOf("project:xmgl") > 0) {//判断是否有项目管理权限
                                        console.log("我不是录入人，我是管理员来修改")
                                        if (data.xmjx == 1) {//如果已经结项，那么结项按钮就不能点了
                                            body.find(":checkbox[name='xmjx']").prop("disabled", true);
                                        } else {
                                            body.find(":checkbox[name='xmjx']").prop("disabled", false);
                                        }
                                        if (data.sfzj == 1) {//如果已经追加，那么追加按钮也就不能点了
                                            body.find(":checkbox[name='sfzj']").prop("disabled", true);
                                        } else {
                                            body.find(":checkbox[name='sfzj']").prop("disabled", false);
                                        }
                                    }
                                }
                            }
                            form.render('select');
                            form.render('checkbox');
                            form.render();
                        }
                        else {//添加项目的人员
                            console.log("我过来添加了")
                            body.find("#number1").val(data);
                            body.find("#htje").prop("disabled", true);
                            body.find("#hkqk").prop("disabled", true);
                            body.find("#whje").prop("disabled", true);
                            body.find("#whsx").prop("disabled", true);
                            body.find(":radio[name='hktz']").prop("disabled", true);
                            body.find("#ml").prop("disabled", true);
                            body.find("#zbj").prop("disabled", true);
                            body.find(":radio[name='zbjthqk']").prop("disabled", true);
                            body.find("#zbjthsx").prop("disabled", true);
                            form.render();
                        }
                        setTimeout(function () {
                            layui.layer.tips('点击此处返回项目列表', '.layui-layer-setwin .layui-layer-close', {
                                tips: 3
                            });
                        }, 500)
                    }
                }
            )
// layer.iframeAuto(index);
// layui.layer.full(index);
// //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
// $(window).on("resize", function () {
//     layui.layer.full(index);
// })
        }

        function formatNumber(value) {
            if (value != null) {
                if (/^[0-9]+(\.[0-9]{2})?$/.test(value) && value.indexOf(",") < 0) {
                    value = parseFloat(value).toFixed(2);
                    value = value.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                }
            } else {
                return '';
            }
            return value;
        }

        $(".add_btn").click(function () {
            var date = new Date;
            var year = date.getFullYear();
            $.post("/project/getAddSequence?year=" + year, function (data) {
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

        function getExplorer() {
            /*var explorer = window.navigator.userAgent;
            console.log(explorer);
            //ie
            if (explorer.indexOf("MSIE") >= 0) {
                return 'ie';
            }
            //firefox
            else if (explorer.indexOf("Firefox") >= 0) {
                return 'Firefox';
            }
            //Chrome
            else if (explorer.indexOf("Chrome") >= 0) {
                return 'Chrome';
            }
            //Opera
            else if (explorer.indexOf("Opera") >= 0) {
                return 'Opera';
            }
            //Safari
            else if (explorer.indexOf("Safari") >= 0) {
                return 'Safari';
            }*/
            if (!!window.ActiveXObject || "ActiveXObject" in window)
                return "ie";
            else
                return "other";
        }

        function exportForIe(curTbl) {//整个表格拷贝到EXCEL中
            var element = document.getElementById("ieexporttable");
            element.innerHTML = curTbl;
            var oXL = new ActiveXObject("Excel.Application");

            //创建AX对象excel
            var oWB = oXL.Workbooks.Add();
            //获取workbook对象
            var xlsheet = oWB.Worksheets(1);
            //激活当前sheet
            var sel = document.body.createTextRange();
            sel.moveToElementText(element); //把表格中的内容移到TextRange中
            sel.select;
            //全选TextRange中内容
            sel.execCommand("Copy");
            //复制TextRange中内容
            xlsheet.Paste();
            //粘贴到活动的EXCEL中
            oXL.Visible = true;
            //设置excel可见属性

            try {
                var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
            } catch (e) {
                print("Nested catch caught " + e);
            } finally {
                oWB.SaveAs(fname);

                oWB.Close(savechanges = false);
                //xls.visible = false;
                oXL.Quit();
                oXL = null;
                //结束excel进程，退出完成
                //window.setInterval("Cleanup();",1);
                // idTmr = window.setInterval("Cleanup();", 1);
            }
        }

        function exportForOther(vals, btn) {
            //Worksheet名
            var worksheet = 'Sheet1'
            var uri = 'data:application/vnd.ms-excel;base64,';

            //下载的表格模板数据
            var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office"';
            template += 'xmlns:x = "urn:schemas-microsoft-com:office:excel"';
            template += 'xmlns = "http://www.w3.org/TR/REC-html40">';
            template += '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>\'\n';
            template += '           <x:Name>' + worksheet + '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>\'\n';
            template += '            </x:ExcelWorkbook></xml><![endif]--></head>';
            template += '<body>' + vals + '</body></html >';
            //下载模板
            // window.location.download = "项目汇总表.xls";
            // window.location.href = uri + window.btoa(unescape(encodeURIComponent(template)))
            var element = document.getElementsByClassName(btn)[0];
            console.log(element);
            element.download = "项目汇总表.xls";
            element.href = uri + window.btoa(unescape(encodeURIComponent(template)));
            console.log("xxxx");
        }

        function Cleanup() {
            window.clearInterval(idTmr);
            CollectGarbage();
        }

        $(".export_btn").click(function () {
            var l_index = 111;
            var data = table.clearCacheKey(table.cache['projectList']);
            var arry = [];
            for (var i in data) {
                arry.push(data[i]);
            }
            exportFile_project(arry, "export_btn", l_index); //data 为该实例中的任意数量的数据
        })
        $(".exportall_btn").click(function () {
            var l_index = 111;
            $.ajax({
                url: '/project/listData',
                method: 'POST',
                dataType: 'json',
                success: function (res) {
                    if (res.data) {
                        //开始导出
                        console.log(res.data);
                        exportFile_project(res.data, "exportall_btn", l_index); //data 为该实例中的任意数量的数据
                    } else {
                        layer.msg(res.msg);
                    }
                },
                error: function (e) {
                    layer.msg(e.msg);
                }
            })
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
            } else if (value === 1) {
                return '未通过';
            } else {
                return '无';
            }
        }

//完成
        function iscomplete(value) {
            if (value === 1) {
                return '完成';
            } else if (value === 1) {
                return '未完成';
            } else {
                return '无';
            }
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
//表格导出_项目导出专用
        var exportFile_project = function (data, btn, l_index) {
            var vals = "<table border='1'>";
            vals += "<tr><td  colspan='25' style='font-weight: bold;font-size: 15px;border: 0px;' align='center'>项目进度汇总表</td></tr>"
            //表头
            vals += "<tr>";
            vals += "<td rowspan='2'>序号</td>";
            vals += "<td rowspan='2'>项目名称</td>";
            vals += "<td rowspan='2'>项目编号</td>";
            vals += "<td rowspan='2'>部门</td>";
            vals += "<td rowspan='2'>项目经理</td>";
            vals += "<td rowspan='2'>项目立项时间</td>";
            vals += "<td rowspan='2'>是否立项</td>";
            // vals += "<td>项目审批结果</td>";
            vals += "<td align='center'>方案完成情况</td>";
            vals += "<td align='center'>产品选型完成情况</td>";
            vals += "<td colspan='2' align='center'>招标组织完成情况</td>";
            vals += "<td align='center'>用资计划表确定</td>";
            vals += "<td align='center'>合同签订</td>";
            vals += "<td align='center'>硬件采购工作</td>";
            vals += "<td align='center'>施工队确认</td>";
            vals += "<td align='center'>集成工作进度</td>";
            vals += "<td align='center'>软件开发工作进度</td>";
            vals += "<td colspan='9' align='center'>回款进度</td>";
            vals += "<td align='center'>项目结项</td>";
            vals += "</tr>";

            vals += "<tr>";
            vals += "<td align='center'>是■  否□</td>";
            vals += "<td align='center'>完成■ 未完成□</td>";
            vals += "<td align='center'>有■ 无□</td>";
            vals += "<td align='center'>完成■ 未完成□</td>";
            vals += "<td align='center'>完成■ 未完成□</td>";
            vals += "<td align='center'>完成■ 未完成□</td>";
            vals += "<td align='center'>开始,进行中,完成</td>";
            vals += "<td align='center'>完成■ 未完成□</td>";
            vals += "<td align='center'>到场,实施,完工,验收</td>";
            vals += "<td align='center'>工作中,暂停中,测试中,完工</td>";
            vals += "<td align='center'>合同金额</td>";
            vals += "<td align='center'>回款金额</td>";
            vals += "<td align='center'>未回金额</td>";
            vals += "<td align='center'>未回时限</td>";
            vals += "<td align='center'>回款通知</td>";
            vals += "<td align='center'>毛利</td>";
            vals += "<td align='center'>质保金</td>";
            vals += "<td align='center'>质保金退还情况</td>";
            vals += "<td align='center'>质保金退还时限</td>";
            vals += "<td align='center'>是■  否□</td>";
            vals += "</tr>";
            data.forEach(function (item, index) {
                vals += ("<tr>");
                vals += "<td>" + (index + 1) + "</td>";
                vals += "<td>" + item.name + "</td>";
                vals += "<td>" + item.number + "</td>";
                vals += "<td>" + item.bmmc + "</td>";
                vals += "<td>" + item.userName + "</td>";
                vals += "<td>" + item.lxsj + "</td>";
                vals += "<td align='center'>" + (item.sflx == 1 ? '是' : '否') + "</td>";
                vals += "<td align='center'>" + (item.fawcqk == 1 ? '完成' : '未完成') + "</td>";
                vals += "<td align='center'>" + (item.cpxxwcqk == 1 ? '完成' : '未完成') + "</td>";
                vals += "<td align='center'>" + zbzzwcqk(item.zbzzwcqk) + "</td>";
                vals += "<td align='center'>" + zbzzwcqk(item.zbzzwcqk) + "</td>";
                vals += "<td align='center'>" + (item.yzjhbqd == 1 ? '通过' : '未通过') + "</td>";
                vals += "<td align='center'>" + (item.htqd == 1 ? '完成' : '未完成') + "</td>";
                vals += "<td align='center'>" + yjcg(item.yjcg) + "</td>";
                vals += "<td align='center'>" + sgqr(item.sgqr) + "</td>";
                vals += "<td align='center'>" + jcjd(item.jcjd) + "</td>";
                vals += "<td align='center'>" + rjkfjd(item.rjkfjd) + "</td>";
                vals += "<td align='center'>" + (item.htje != null ? item.htje : '') + "</td>";
                vals += "<td align='center'>" + (item.hkqk != null ? item.hkqk : '') + "</td>";
                vals += "<td align='center'>" + (item.whje != null ? item.whje : '') + "</td>";
                vals += "<td align='center'>" + (item.whsx != null ? item.whsx.substr(0, 9) : '') + "</td>";
                vals += "<td align='center'>" + (item.hktz == 1 ? '已下达' : '未下达') + "</td>";
                vals += "<td align='center'>" + (item.ml != null ? item.ml : '') + "</td>";
                vals += "<td align='center'>" + (item.zbj != null ? item.zbj : '') + "</td>";
                vals += "<td align='center'>" + (item.zbjthqk == 1 ? '已退还' : '未退还') + "</td>";
                vals += "<td align='center'>" + (item.zbjthsx != null ? item.zbjthsx : '') + "</td>";
                vals += "<td align='center'>" + (item.xmjx == 1 ? '是' : '否') + "</td>";
                vals += ("</tr>");
            })
            vals += "</table>"
            if (getExplorer() == 'ie') {
                exportForIe(vals);
            } else {
                exportForOther(vals, btn);
            }
            // layer.close(l_index);

        }

//导出翻译
        function rjkfjd(data) {
            var value = "";
            switch (data) {
                case 0:
                    value = "未开始";
                    break;
                case 1:
                    value = "工作中";
                    break;
                case 2:
                    value = "暂停中";
                    break;
                case 3:
                    value = "测试中";
                    break;
                case 4:
                    value = "完工";
                    break;
            }
            return value;
        }

        function zbzzwcqk(data) {
            var value = "";
            switch (data) {
                case 0:
                    value = "未完成";
                    break;
                case 1:
                    value = "完成";
                    break;
                case 2:
                    value = "不招标";
                    break;
            }
            return value;
        }

        function yjcg(data) {
            var value = "";
            switch (data) {
                case 0:
                    value = "未开始";
                    break;
                case 1:
                    value = "销售合同签订中";
                    break;
                case 2:
                    value = "进行中";
                    break;
                case 3:
                    value = "完成";
                    break;
            }
            return value;
        }

        function sgqr(data) {
            var value = "";
            switch (data) {
                case 0:
                    value = "未完成";
                    break;
                case 1:
                    value = "完成";
                    break;
                case 2:
                    value = "无";
                    break;
            }
            return value;
        }

        function jcjd(data) {
            var value = "";
            switch (data) {
                case 0:
                    value = "未开始";
                    break;
                case 1:
                    value = "工作中";
                    break;
                case 2:
                    value = "暂停中";
                    break;
                case 3:
                    value = "测试中";
                    break;
                case 4:
                    value = "完工";
                    break;
            }
            return value;

        }

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

    }
)