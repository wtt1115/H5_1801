require(['config'],function(){
    require(['jquery','common'],function($){

           $('#header').load('common_html/headerone.html');
            $('#footer').load('common_html/footerone.html');

        let username = document.querySelector('#username');
        let password = document.querySelector('#password');
        let confirm_pwd = document.querySelector('#confirm_pwd');
        let btnReg = document.querySelector('#btnReg');
        let phone = document.querySelector('#phone');
        let checkbox = document.querySelector('#checkbox');

        let reg = document.querySelector('.reg');
        let group = username.parentNode;

        let txt = username.nextElementSibling;
        let mCode = document.querySelector('#mCode');
        let sCode = document.querySelector('#sCode');
        let res1 = document.querySelector('.res1');
        let res2 = document.querySelector('.res2');
        let res3 = document.querySelector('.res3');
        let res4 = document.querySelector('.res4');


    //随机验证码
    function showCode(){
        function Code(){
            var res = parseInt(Math.random()*10000);
            if(res<10){
                res = '000' + res;
            }else if(res<100){
                res = '00' +res;
            }else if(res<1000){
                res = '0' +res;
            }
            return res;
        }
        sCode.innerHTML = Code();
    }
    showCode();
    // 点击验证码随机换数字 
    sCode.onclick= function(){
        showCode();
    }

    //随机颜色
    function rColor(){
        var r = parseInt(Math.random()*256);
        var g = parseInt(Math.random()*256);
        var b = parseInt(Math.random()*256);

        return 'rgb('+r+','+g+','+b+')';
    }
    document.getElementById('sCode').style.backgroundColor = rColor();
    document.getElementById('sCode').style.color = rColor();    

    // 验证用户名是否被占用
        username.onblur = function(){

            let _username = username.value;

            ajax({
                url:'../api/register.php',
                data:{username:_username},
                success:function(data){
                    if(data === 'success'){
                        group.classList.remove('has-error');
                        group.classList.add('has-success');

                        txt.innerHTML = '';
                    }else{
                        group.classList.remove('has-success' )
                        group.classList.add('has-error');

                        txt.innerHTML = _username +'这个用户名太受欢迎，请换一个'
                    }
                }
            })
        }




        //注册
        btnReg.onclick = function(e){
            e = e ||window.event;
            let _username = username.value;
            let _password = password.value;
            let _confirm_pwd = confirm_pwd.value;
            let _phone =phone.value;
            let _mCode = mCode.value;


                  // 连接数据库
            ajax({
                url:'../api/register.php',
                data:{
                    username:_username,
                    password:_password,
                    phone:_phone,
                    type:'reg'
                },
                success:function(data){
                    console.log(data)
                    if(data =='success'){
                        reg.innerHTML = '用户名注册成功！';
                    }
                }
            })


           
            // 判断部分
            if(_username==""  && _password=="" &&  _phone==""){
                   txt.innerHTML = '用户名、密码和手机号码不能为空';
                   return false;
                }else if(!/^[a-z][\w\-]{5,19}$/i.test(_username)){
                    txt.innerHTML = '用户名不合法';
                    return false;
                }else if(!/^[^\s]{5,19}$/.test(_password)){
                     res1.innerHTML = '密码不合法';
                    return false;
                }else if(_password!=_confirm_pwd){
                    res2.innerHTML = '两次输入密码不一致，请重新输入！';
                    return false;
                }else if(_mCode!=sCode.innerHTML){
                    res3.innerHTML = '验证码输入不正确';
                    return false;
                }else if(checkbox.checked ==''){
                     res4.innerHTML = '请勾选协议';
                   return false;
                 }else if(_mCode === sCode.innerHTML){
                   // res3.innerHTML = '注册成功！请登录';
                   location.href="../html/login.html"
                   return false;
                 }




            
             }


        });     
    });