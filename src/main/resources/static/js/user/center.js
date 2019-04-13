layui.use(['form', 'layer', 'upload'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        upload = layui.upload,
        $ = layui.jquery;

    $.post("/user/centerDate", function (res) {
        $("#id").val(res.data.id);
        $("#name").val(res.data.name);
        $("#userName").val(res.data.userName);
        $("#roleName").val(res.data.roleInfo.roleName);
        $("#state").val(res.data.state);
        $("#stateStr").val(res.data.state === 1 ? "正常使用" : "限制使用");
    });
    //上传头像
    /*upload.render({
        elem: '#userFaceBtn'
        , url: '/user/updateAvatar'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $('#avatar').attr('src', result);//图片链接（base64）
            })
        }
        , done: function (res, index, upload) { //上传后的回调
            // var num = parseInt(4 * Math.random());  //生成0-4的随机数，随机显示一个头像信息
            // $('#userFace').attr('src', res.data[num].src);
            // window.sessionStorage.setItem('userFace', res.data[num].src);
        }
        //,accept: 'file' //允许上传的文件类型
        //,size: 50 //最大允许上传的文件大小
        //,……
    })*/

    $("#userFaceBtn").on('click', function () {
        $("#avatarFile").trigger('click');
    })

    $("#avatarFile").change(function (event) {
        var files = event.target.files, file;
        if (files && files.length > 0) {
            // 获取目前上传的文件
            file = files[0];// 文件大小校验的动作
            if (file.size > 1024 * 1024 * 2) {
                alert('图片大小不能超过 2MB!');
                return false;
            }
            // 获取 window 的 URL 工具
            var URL = window.URL || window.webkitURL;
            // 通过 file 生成目标 url
            var imgURL = URL.createObjectURL(file);
            //用attr将img的src属性改成获得的url
            $("#userFace").attr("src", imgURL);
            // 使用下面这句可以在内存中释放对此 url 的伺服，跑了之后那个 URL 就无效了
            // URL.revokeObjectURL(imgURL);
        }
    })
    form.on("submit(editUser)", function (data) {
        //弹出loading
        var index = top.layer.msg('数据保存中，请稍候...', {icon: 16, time: false, shade: 0.8});
        var form = document.querySelector(".layui-form");
        console.log(form);
        var formdata = new FormData(form);
        console.log(formdata);
        console.log(formdata.get("name"));
        $.ajax({
            url: "/user/userEdit",
            data: formdata,
            type: 'POST',
            processData: false,  //必须false才会避开jQuery对 formdata 的默认处理
            contentType: false,  //必须false才会自动加上正确的Content-Type
            success: function (res) {
                if (res.data) {
                    layer.close(index);
                    layer.msg("修改成功！");
                    //刷新父页面
                    parent.parent.location.reload();
                } else {
                    layer.msg(data.msg);
                }
            }
        })
        return false;
    })

})