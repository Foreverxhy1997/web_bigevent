$(function(){
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    //定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date){
        const dt = new Date(date)

        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth()+1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

        //定义补零的函数
    function padZero(n){
        return n>9?n:'0'+n
    }

    //定义一个查询的参数对象，将来请求数据的时候，
    //需要将请求参数对象提交到服务器
    var q = {
        pagenum:1,//页码值,默认请求第一页数据
        pagesize:2,//每页显示多少条数据，默认显示2条
        cate_id:'',//文章的id
        state:'',//文章的发布状态
    }

    initTable()
    initCate()

    //获取文章列表数据的方法
    function initTable(){
        $.ajax({
            method : 'GET',
            url : '/my/article/list',
            data : q,
            success : function(res){
                if(res.status!==0){
                    return layer.msg('获取文章列表失败！')
                }
                //使用模板引擎渲染页面的数据
                layer.msg('获取文章列表成功！')
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
                //调用渲染分页的方法
                renderPage(res.total)
            }
        })
    }

    // 初始化文章分类的方法
    function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!=0){
                    return layer.msg('获取分类数据失败！')
                }
                var htmlStr = template('tpl-cate',res)
                $('[name = cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    //为筛选表单绑定submit事件
    $('#form-search').on('click',function(e){
        e.preventDefault()
        //获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name = state]').val()
        //为查询参数对象q中的对应属性赋值
        q.cate_id = cate_id
        q.state = state
        //根据最新的筛选条件，重新渲染表格数据
        initTable()
    })

    //定义渲染分页的方法
    function renderPage(total){
        //调用laypage.render()方法来渲染分页的结构
        laypage.render({
            elem:'demo0',//分页容器的ID
            count:total,//总数据条数
            limit:q.pagesize,//每页显示几条数据
            curr:q.pagenum,//设置默认被选中的分页
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],
            jump:function(obj,first){
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr);//得到当前页，以便向服务端请求对应页的数据
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //根据最新的q获取数据渲染列表
                // initTable()  
                if(!first){
                    initTable()
                }             
            }
        })
    }

    //通过代理形式为删除按钮绑定点击时间处理函数
    $('tbody').on('click','#btn-delete',function(){
        var len = $('#btn-delete').length
        console.log(len)
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    if(len===1){
                        q.pagenum = q.pagenum===1?1:q.pagenum-1
                    }
                    initTable()
                }
            })
            layer.close(index);
          });
    })
})