layui.use(['form','layer','table'],function(){
    var $ = layui.jquery,
        table = layui.table;

    //数据表列表
    table.render({
        elem: '#tableList',
        url : '/code/listData',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,20,30],
        limit : 10,
        id : "tableListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'tableName', title: '表名', minWidth:100, align:"center"},
            {field: 'engine', title: 'Engine', minWidth:100, align:'center'},
            {field: 'tableComment', title: '表备注', minWidth:100, align:'center'},
            {field: 'createTime', title: '创建时间', minWidth:100, align:'center'}
        ]]
    });

    //搜索
    $(".search_btn").on("click",function(){
        table.reload("tableListTable",{
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                tableName: $(".tableName").val()
            }
        })
    });

    //生成
    $(".add_btn").click(function(){
        var checkStatus = table.checkStatus('tableListTable'),
            data = checkStatus.data;
        if(data.length > 0){
            var tableNames = "";
            data.forEach(function(e){
                tableNames += e.tableName + ",";
            });
            location.href = "/code/generator?tables=" + tableNames;
        }else{
            layer.msg("请选择需要生成的数据表");
        }
    });

})
