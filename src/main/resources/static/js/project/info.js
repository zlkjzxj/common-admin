layui.config({
    base: '/static/layui/'
}).extend({
    treeSelect: 'treeSelect'
}).use(['form', 'layer', 'layedit', 'laydate', 'upload', 'treeSelect'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery,
        treeSelect = layui.treeSelect;

    //初始化项目编号的日期，放在这吧
    var date = new Date;
    var year = date.getFullYear();
    $("#year").append("<option value='" + year + "'>" + year + "</option>");
    $("#year").append("<option value='" + (year + 1) + "'>" + (year + 1) + "</option>");
    form.render('select');//刷新select选择框渲染
    form.on('select(year)', function(d){
        console.log(d)
        $.post("/project/getAddSequence?year=" + year, function (data) {
            console.log(data.data);
            $("#number1").val(data.data);
        });
    });
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
            // treeSelect.checkNode('tree', d.current.id);
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
        , calendar: true
    });
    laydate.render({
        elem: '#whsx',
        theme: 'grid'
        , calendar: true
    });
    form.verify({
        name: [/^[\u4e00-\u9fa5]{1,40}$/, "项目名只能是长度20内的汉字"],
        /* required: [/[\S]+/, "必填项不能为空"],
         phone: [/^1\d{10}$/, "请输入正确的手机号"],
         email: [/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, "邮箱格式不正确"],
         url: [/(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/, "链接格式不正确"],
         number: function(e) {
             if (!e || isNaN(e)) return "只能填写数字"
         },
         date: [/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/, "日期格式不正确"],
         identity: [/(^\d{15}$)|(^\d{17}(x|X|\d)$)/, "请输入正确的身份证号"]*/
        //1、编号构成：年度+部门+项目类型+序号+追加
        // pNumber: [/^(\d{4})+(XS|JC|YW|HL|CW|XZ|RJ|XX)+(JC|DR|ZR|JF|KF|CX|KR|KJ|NB|WB|BH)+([0-9][0-9][2-9])+$/, "项目编号格式有误！"],
        pNumber: [/^(XS|JC|YW|HL|CW|XZ|RJ|XX)+(JC|DR|ZR|JF|KF|CX|KR|KJ|NB|WB|BH)+$/, "项目编号格式有误！"],
    })

    form.on("submit(addProject)", function (data) {
        //弹出loading
        // var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        if ($("#id").val() === "") {
            var field = Object.assign(data.field, {'number': data.field.year + data.field.number + data.field.number1});
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
            $.ajax({
                url: '/project/edit',
                method: 'POST',
                data: data.field,
                dataType: 'json',
                success: function (res) {
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