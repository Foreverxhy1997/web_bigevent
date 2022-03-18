$(function(){
    //点击“去注册账号”的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    });

    //点击“去登录”的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取form对象,总之Layui等东西要在用之前去导入才行
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义了一个叫做pwd校验规则,校验密码
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        //校验两次密码是否一致性的规则
        repwd:function(value){
            //拿到密码框和确认密码框中的内容，进行判断
            var pwd = $('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致！'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},
        function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            //模拟人的点击行为
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.post('/api/login',{username:$('#form_login [name=username]').val(),password:$('#form_login [name=password]').val()},
        function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg('登录成功！')
            //将登录成功得到的token字符串，保存到localStorage中
            localStorage.setItem('token',res.token)
            location.href = 'D:\\Desktop\\04-大事件项目课程资料（第九章大事件后台管理系统项目）\\day1（1-3小节）\\素材\\index.html'
        })
    })
});