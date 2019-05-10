//获取系统时间
var newDate = '';
var userName = '';
var n = 0;
getLangDate();

//值小于10时，在前面补0
function dateFilter(date) {
    if (date < 10) {
        return "0" + date;
    }
    return date;
}

function getLangDate() {
    var dateObj = new Date(); //表示当前系统时间的Date对象
    var year = dateObj.getFullYear(); //当前系统时间的完整年份值
    var month = dateObj.getMonth() + 1; //当前系统时间的月份值
    var date = dateObj.getDate(); //当前系统时间的月份中的日
    var day = dateObj.getDay(); //当前系统时间中的星期值
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var week = weeks[day]; //根据星期值，从数组中获取对应的星期字符串
    var hour = dateObj.getHours(); //当前系统时间的小时值
    var minute = dateObj.getMinutes(); //当前系统时间的分钟值
    var second = dateObj.getSeconds(); //当前系统时间的秒钟值
    var timeValue = "" + ((hour >= 12) ? (hour >= 18) ? "晚上" : "下午" : "上午"); //当前时间属于上午、晚上还是下午
    newDate = dateFilter(year) + "年" + dateFilter(month) + "月" + dateFilter(date) + "日 " + " " + dateFilter(hour) + ":" + dateFilter(minute) + ":" + dateFilter(second);
    n++;
    if (n === 1) {
        userName = document.getElementById("nowTime").innerHTML;
    }
    document.getElementById("nowTime").innerHTML = userName + "，" + timeValue + "好！ 欢迎使用宜元中林项目管理系统，当前时间为： " + newDate + "　" + week;
    setTimeout("getLangDate()", 1000);
}

layui.use(['form', 'element', 'layer', 'jquery', 'layim'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        element = layui.element, layim = layui.layim,
        $ = layui.jquery;

    //icon动画
    $(".panel a").hover(function () {
        $(this).find(".layui-anim").addClass("layui-anim-scaleSpring");
    }, function () {
        $(this).find(".layui-anim").removeClass("layui-anim-scaleSpring");
    })
    $(".panel a").click(function () {
        parent.addTab($(this));
    })
    //记载翻译code，param
    $.get("/param/getInitParam", function (res) {
        sessionStorage.setItem("initParam", JSON.stringify(res.data));
    })
    //部门数量
    $.get("/dept/count", function (res) {
        $("#totalDep").text(res.data);
    })
    //员工数量
    $.get("/user/count", function (res) {
        $(".userAll #totalUser").text(res.data);
    })
    var zanCount = 100;
    $("#zan").text('西安研发部(获赞个数：)' + zanCount);
    $(".zan").on('click', function (e) {
        zanCount += 1;
        $("#zan").text('西安研发部(获赞个数：)' + zanCount);
        layer.msg("你很赞！");
    })

    //外部图标
    // $.get(iconUrl, function (data) {
    //     $(".outIcons span").text(data.split(".icon-").length - 1);
    // })
    /*layui.use('layim', function (layim) {
        //基础配置
        layim.config({

            init: {
                url: '/im/getInit',
                type: 'get',
            } //获取主面板列表信息，下文会做进一步介绍

            //获取群员接口（返回的数据格式见下文）
            , members: {
                url: '/im/getMembers' //接口地址（返回的数据格式见下文）
                , type: 'get' //默认get，一般可不填
                , data: {id:'101'} //额外参数
            }

            //上传图片接口（返回的数据格式见下文），若不开启图片上传，剔除该项即可
            , uploadImage: {
                url: '' //接口地址
                , type: 'post' //默认post
            }

            //上传文件接口（返回的数据格式见下文），若不开启文件上传，剔除该项即可
            , uploadFile: {
                url: '' //接口地址
                , type: 'post' //默认post
            }
            //扩展工具栏，下文会做进一步介绍（如果无需扩展，剔除该项即可）
            , tool: [{
                alias: 'code' //工具别名
                , title: '代码' //工具名称
                , icon: '&#xe64e;' //工具图标，参考图标文档
            }]

            , msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.html' //消息盒子页面地址，若不开启，剔除该项即可
            , find: layui.cache.dir + 'css/modules/layim/html/find.html' //发现页面地址，若不开启，剔除该项即可
            , chatLog: layui.cache.dir + 'css/modules/layim/html/chatlog.html' //聊天记录页面地址，若不开启，剔除该项即可
        });
    });*/
});