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
        $ = layui.jquery;

    layui.treeSelect.render({
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
        }
    })
    // 加载完成后的回调函数

//执行一个laydate实例
    laydate.render({
        elem: '#lxsj'
    });
    laydate.render({
        elem: '#whsx'
    });


    form.verify({
        projectName: function (val) {
            if (val == '') {
                return "项目名称不能为空";
            }
        },
        projectNumber: function (val) {
            if (val == '') {
                return "项目编号不能为空";
            }
        }
    })
// form.on('submit(*)', function (data) {
//     console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
//     console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
//     console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
//     return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
// });

    form.on("submit(addProject)", function (data) {
        console.log("formdata", data.field);
        //截取文章内容中的一部分文字放入文章摘要
        // var abstract = layedit.getText(editIndex).substring(0, 50);
        //弹出loading
        // var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        $.ajax({
            url: '/project/add',
            method: 'POST',
            data: data.field,
            dataType: 'json',
            success: function (res) {
                if (res.data){
                    layer.close(index);
                    layer.msg("添加成功！");
                    // layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                } else {
                    layer.msg(data.msg);
                }
            },
            error: function (e) {
                layer.msg(e.msg);
            }
        })
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