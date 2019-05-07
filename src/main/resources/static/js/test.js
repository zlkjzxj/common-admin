//定义模块
layui.define(function (exports) {
    var obj = {}
    obj.demo = function () {
        console.log("自定义插件")
    }
    exports('test', obj);
});
