$(function(){
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })

    inituserinfo()

    // 获取用户的基础信息
    function inituserinfo(){
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if(res.status!==0){
                    return layer.msg('获取用户信息失败！')
                }
                form.val('info',res.data)
            }
        });
    }

    // 更新用户的基础信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        //发起AJAX数据请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                //调用父页面中的方法，重新渲染
                window.parent.getUserInfo()
            }
        })
    })

    //重置用户的基础信息
    $('#btn_reset').on('click',function(e){
        //阻止表单的默认重置行为
        e.preventDefault()
        //重置后将原来的数据重新弄进去就好了
        inituserinfo()
    })
})

