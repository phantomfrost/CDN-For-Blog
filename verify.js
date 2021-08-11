vaptcha({
    vid: '6113bac9c108cd3a30dddf82', // 验证单元id
    type: 'invisible', // 显示类型 点击式
    scene: 0, // 场景值 默认0
    container: '#vaptchaContainer', // 容器，可为Element 或者 selector
}).then(function (vaptchaObj) {
    obj = vaptchaObj //将VAPTCHA验证实例保存到局部变量中
    vaptchaObj.render() // 调用验证实例 vpObj 的 render 方法加载验证按钮
    //获取token的方式一：
    //vaptchaObj.renderTokenInput('.login-form')//以form的方式提交数据时，使用此函数向表单添加server,token值
    //获取token的方式二：
    vaptchaObj.listen('pass', function () {
        serverToken=vaptchaObj.getServerToken()
        // 验证成功进行后续操作
        var data = {
            server:serverToken.server,
            token: serverToken.token,
        }
        $.post('login', data, function (r) {
            if (r.code !== 200) {
                console.log('登录失败')
                vaptchaObj.reset() //重置 VAPTCHA
            }
        })
    })
    //关闭验证弹窗时触发
    vaptchaObj.listen('close', function () {
        //验证弹窗关闭触发
    })
    $('button.vsubmit.vbtn').on('click', function () {
   	    vaptchaObj.validate()
    })
})
