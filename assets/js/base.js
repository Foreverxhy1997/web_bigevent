//注意：每次调用$,get()或post或ajax时，
//会先调用ajaxPrefilter函数

$.ajaxPrefilter(function(options){
    // console.log(options.url)
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url        //headers就是请求头对象,这里在通信时一定要设置请求头，这里是要读取本地保存的Token
    if(options.url.indexOf('/my/')!==-1)
    {
        options.headers = {
            Authorization:localStorage.getItem('token')||''
        }
    }

    //全局挂载，为了看是不是直接进入的我们得登录界面，如果是，则要强制跳转到登录界面,从而控制用户的访问权限
    // options.complete = function(res){
    //     console.log('执行了complete回调：')
    //     console.log(res)
    //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
    //     if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
    //         //1.强制清空token
    //         localStorage.removeItem('token')
    //         //2.强制跳转到登录界面
    //         location.href='D:\\Desktop\\04-大事件项目课程资料（第九章大事件后台管理系统项目）\\day1（1-3小节）\\素材\\login.html'
    //     }
    // }
})