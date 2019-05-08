layui.config({
    base: '/static/'
}).extend({
    treeSelect: 'layui/treeSelect',
    transcode: "js/transcode"
}).use(['form', 'layer', 'layedit', 'laydate', 'upload', 'treeSelect', 'transcode'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery,
        treeSelect = layui.treeSelect,
        transcode = layui.transcode
    ;

    form.render('select');//刷新select选择框渲染
    form.on('select(year)', function (d) {
        //判断是编辑还是添加
        console.log(d.value);
        var addoredit = $("#addoredit").val();
        console.log(addoredit === 'edit')
        console.log($("#year1").val(), d.value)
        if (addoredit === 'edit' && $("#year1").val() === d.value) {
            $("#number1").val($("#number11").val());
        } else {
            $.post("/project/getAddSequence?year=" + d.value, function (data) {
                $("#number1").val(data.data);
            });
        }

    });
    // form.on('switch(sfzj)', function (d) {
    //     //判断是编辑还是添加
    //     var checked = d.elem.checked;
    //     var value = $("#number1").val();
    //     if (checked) {
    //         if (value.indexOf("-1") < 0) {
    //             $("#number1").val(value + "-1")
    //         }
    //     } else {
    //         if (value.indexOf("-1") > 0) {
    //             $("#number1").val(value.replace("-1", ""));
    //         }
    //     }
    //
    // });
    treeSelect.render({
        // 选择器
        elem: '#dTree',
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
            $("#department").val(d.current.id);
            $("#dTree").val(d.current.id);
            treeSelect.checkNode('dTree', d.current.id);
            //先清空上次的选项，不然重叠了
            $("#manager").empty();
            //为了保证required 起作用加个空的
            $("#manager").append("<option value=''>请选择项目经理</option>");
            $.ajax({
                url: "/user/listDataSelect",
                data: {glbm: d.current.id},
                success: function (data) {
                    var userList = data.data;
                    userList.forEach(function (e) {
                        $("#manager").append("<option value='" + e.id + "'>" + e.name + "</option>");
                    });
                    form.render('select');//刷新select选择框渲染
                }
            })
        },
        success: function (d) {
            if ($("#dTree").val() !== '') {
                treeSelect.checkNode('dTree', $("#dTree").val());
                $("#department").val($("#dTree").val());
                $("#manager").append("<option value=''>请选择项目经理</option>");
                $.ajax({
                    url: "/user/listDataSelect",
                    data: {glbm: $("#dTree").val()},
                    success: function (data) {
                        var userList = data.data;
                        userList.forEach(function (e) {
                            $("#manager").append("<option value='" + e.id + "'>" + e.name + "</option>");
                        });
                        $("#manager").val($("#manager1").val())
                        form.render('select');//刷新select选择框渲染
                    }
                })
                // treeSelect.click(d);
                // $(".curSelectedNode").click(d);
            }
            // console.log($("#dTree").val());
        }
    })
    // 加载完成后的回调函数

//执行一个laydate实例
    laydate.render({
        elem: '#lxsj',
        theme: 'grid'
        // theme: '#393D49'
        // , calendar: true
    });
    laydate.render({
        elem: '#whsx',
        theme: 'grid'
    });
    laydate.render({
        elem: '#zbjthsx',
        theme: 'grid'
    });
    var project_number_dep = transcode.project_number_dep;
    var project_number_type = transcode.project_number_type;
    var reg = new RegExp(',', "g")
    var dep = project_number_dep.replace(reg, '|');
    var type = project_number_type.replace(reg, '|');
    // var xx = [/^(XS|JC|YW|HL|CW|XZ|RJ|XX)+(JC|DR|ZR|JF|KF|CX|KR|KJ|NB|WB|BH)+$/,]
    var re = new RegExp("^\\+" + (dep) + (type) + "$", "gim");
    form.verify({
        name: [/^[a-zA-Z0-9\u4e00-\u9fa5]{1,40}$/, "项目名只能是长度20内的数字|字母|汉字"],
        //1、编号构成：年度+部门+项目类型+序号+追加
        // pNumber: [/^(\d{4})+(XS|JC|YW|HL|CW|XZ|RJ|XX)+(JC|DR|ZR|JF|KF|CX|KR|KJ|NB|WB|BH)+([0-9][0-9][2-9])+$/, "项目编号格式有误！"],
        pNumber: [re, "项目编号格式有误！"],
        numberOrEmpty: function (value) {
            if (value != '') {
                if (!/\d+(,\d+)*(.[0-9]{1,2})?/.test(value)) {
                    return '请输入正确的数字';
                }
            }
        }
    })

    form.on("submit(addProject)", function (data) {
        //弹出loading
        // var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        if ($("#id").val() === "") {
            var field = Object.assign(data.field, {
                'number': data.field.year + data.field.number + data.field.number1,
                'xmjx': data.field.xmjx == "on" ? 1 : 0
            });
            $.ajax({
                url: '/project/add',
                method: 'POST',
                data: field,
                dataType: 'json',
                success: function (res) {
                    console.log(res)
                    if (res.data) {
                        layer.msg(res.msg);
                        // layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                    } else {
                        layer.msg(res.msg);
                    }
                },
                error: function (e) {
                    layer.msg(e.msg);
                }
            })
        } else {
            var field = Object.assign(data.field, {
                'number': data.field.year + data.field.number + data.field.number1,
                'htje': data.field.htje === "" ? 0 : parseFloat(data.field.htje.replace(/[^\d\.-]/g, "")),
                'hkqk': data.field.hkqk === "" ? 0 : parseFloat(data.field.hkqk.replace(/[^\d\.-]/g, "")),
                'whje': data.field.whje === "" ? 0 : parseFloat(data.field.whje.replace(/[^\d\.-]/g, "")),
                'ml': data.field.ml === "" ? 0 : parseFloat(data.field.ml.replace(/[^\d\.-]/g, "")),
                'zbj': data.field.zbj === "" ? 0 : parseFloat(data.field.zbj.replace(/[^\d\.-]/g, "")),
                'sfzj': data.field.sfzj == "on" ? 1 : 0,
                'xmjx': data.field.xmjx == "on" ? 1 : 0
            });
            $.ajax({
                url: '/project/edit',
                method: 'POST',
                data: field,
                dataType: 'json',
                success: function (res) {
                    if (res.data) {
                        layer.msg(res.msg);
                        //刷新父页面
                        parent.location.reload();
                    } else {
                        layer.msg(res.msg);
                    }
                },
                error: function (e) {
                    layer.msg(e.msg);
                }
            })
        }
        return false;
    })

//预览
    form.on("submit(look)", function () {
        layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问");
        return false;
    })

//创建一个编辑器
    var editIndex = layedit.build('news_content', {
        height: 535,
        uploadImage: {
            url: "../../json/newsImg.json"
        }
    });

})