layui.use(['form', 'layer', 'layedit', 'laydate', 'upload'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        laypage = layui.laypage,
        upload = layui.upload,
        layedit = layui.layedit,
        laydate = layui.laydate,
        $ = layui.jquery;

    //用于同步编辑器内容到textarea
    layedit.sync(editIndex);

    //上传缩略图
    upload.render({
        elem: '.thumbBox',
        url: '../../json/userface.json',
        method: "get",  //此处是为了演示之用，实际使用中请将此删除，默认用post方式提交
        done: function (res, index, upload) {
            var num = parseInt(4 * Math.random());  //生成0-4的随机数，随机显示一个头像信息
            $('.thumbImg').attr('src', res.data[num].src);
            $('.thumbBox').css("background", "#fff");
        }
    });
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#createTime'
    });
    laydate.render({
        elem: '#whsx'
    });

    //格式化时间
    function filterTime(val) {
        if (val < 10) {
            return "0" + val;
        } else {
            return val;
        }
    }

    //定时发布
    var time = new Date();
    var submitTime = time.getFullYear() + '-' + filterTime(time.getMonth() + 1) + '-' + filterTime(time.getDate()) + ' ' + filterTime(time.getHours()) + ':' + filterTime(time.getMinutes()) + ':' + filterTime(time.getSeconds());
    laydate.render({
        elem: '#release',
        type: 'datetime',
        trigger: "click",
        done: function (value, date, endDate) {
            submitTime = value;
        }
    });
    form.on("radio(release)", function (data) {
        if (data.elem.title == "定时发布") {
            $(".releaseDate").removeClass("layui-hide");
            $(".releaseDate #release").attr("lay-verify", "required");
        } else {
            $(".releaseDate").addClass("layui-hide");
            $(".releaseDate #release").removeAttr("lay-verify");
            submitTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        }
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

    form.on("submit(addNews)", function (data) {
        console.log("formdata", data.field);
        //截取文章内容中的一部分文字放入文章摘要
        // var abstract = layedit.getText(editIndex).substring(0, 50);
        //弹出loading
        // var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        $.ajax({
            url: '/project',
            method: 'POST',
            data: data.field,
            dataType: 'json',
            success: function (data) {
                console.log(data);
            },
            error: function (e) {
                console.error(e);
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