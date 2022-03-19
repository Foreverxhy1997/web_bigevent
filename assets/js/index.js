$(function(){
    getUserInfo()

    // 退出登录的行为
    $('#btnLogout').on('click',function(){
        // 提供用户是否确认退出
        layer.confirm('确定退出登录?',{icon:3,title:'提示'},
        function(index){
            // 1.清空本地存储中的Token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href='D:\\Desktop\\04-大事件项目课程资料（第九章大事件后台管理系统项目）\\day1（1-3小节）\\素材\\login.html'
            layer.close(index)
        })
    })
});

// 调用获取用户基本信息
function getUserInfo(){
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },   
    });
}

//渲染用户的头像
function renderAvatar(user){
    //1.获取用户的名称
    var name = user.nickname||user.username
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    //3，按需渲染用户的头像，优先渲染图片头像，后渲染文本头像，并且在有昵称时先用昵称，没有时就用用户名
    if(user.user_pic!==null){
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}