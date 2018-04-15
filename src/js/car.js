require.config({
  // 配置别名（虚拟路径）
  paths:{
    // 格式：别名:真实路径（基于baseUrl）
    jquery:'../lib/jquery/jquery-3.2.1',
    
  },

  // 配置依赖
  shim:{
    common:['jquery']
  }
 })

require(['jquery','common'],function($){
         $('#header').load('common_html/headerone.html');
         $('#footer').load('common_html/footerone.html')
    //获取元素
    var goodsCart = document.querySelector('#car-goodslist');//购物车的产品
    var btnCheck = document.querySelector('#btnCheck');//结算的事件
    var totalPrice = document.querySelector('#totalPrice');//结算的价格
    //小计的价格
    var btnDel = document.getElementsByClassName('btnDel')[0];
    var goodlist=[];
  // 获得cookie
    function getcookie(){
        
        var cookie=document.cookie;
        cookie=cookie.split('; ');
        cookie.forEach(function(item){
            var arr=item.split('=');
            if(arr[0]=='goodlist'){
                goodlist=JSON.parse(arr[1]);
            }
        });
         // console.log(goodlist);
        return goodlist ;
    }
     read();
    // 读取cookie生成商品
    function read(){
        var goodlist=getcookie();
        var Ttotal =0;
        
        goodsCart.innerHTML=goodlist.map(function(goods){
                Ttotal += goods.price*goods.qty;
            
            return `<li data-guid="${goods.id}" >
                    <input type="checkbox" class="checkbox" name="hobby"/>
                    <sapn>
                        <img src="${goods.img}"  class="imgone"/>
                    </sapn>
                     <span class="content">${goods.name}</spa>
                    <sapn><img src="${goods.imgthree}"  class="imgthree"/></sapn>
                    <sapn class="price">￥：${goods.price}</sapn>
                    <sapn> 
                        <button class="minus">-</button>
                        <input type="text" id="quantity" class="shuliang" value="${goods.qty}"/>
                        <button class="add">+</button>
                    </sapn>
                    <sapn class="toPrice">￥：${Ttotal.toFixed(2)}</sapn>
                    <sapn class="btnDel">[删除]</sapn>
                    </li>`
        }).join('');
       
// console.log(totalPrice)

      totalPrice.innerHTML = '￥：' + Ttotal.toFixed(2);
    }
   
   //对父元素进行事件委托
    goodsCart.onclick = function(e){
        //兼容
        e = e||window.event;
        var target = e.target || e.srcElement;
        
       //删除每一个商品
        if(target.className == 'btnDel'){
            //获取到当前li
            var currentLi = target.parentNode.parentNode;
            var guid = currentLi.getAttribute('data-guid'); 
            for(var i = 0;i<goodlist.length;i++){
                if(goodlist[i].id === guid){
                    goodlist.splice(i,1);
                    break;
                }
            }
            // console.log(i)
            // //重新写入cookie
            Cookie.set('goodlist',JSON.stringify(goodlist)+';path=/');
            //刷新界面
             read();
            return false;
       }
       //商品数量的增加操作
       if(target.className == 'add'){
            //获取到当前li
            var currentLi = target.parentNode.parentNode.parentNode;
            // console.log(currentLi);
            var guid = currentLi.getAttribute('data-guid'); 
            for(var i = 0;i<goodlist.length;i++){
                if(goodlist[i].id === guid){
                    //商品数量的增加
                    var count = goodlist[i].qty++;
                    break;
                }
            }
            //重新写入cookie
            Cookie.set('goodlist',JSON.stringify(goodlist)+';path=/');
            //刷新界面
             read();
            return false;
       }
       //商品数量的减操作
       if(target.className == 'minus'){
            //获取到当前li
            var currentLi = target.parentNode.parentNode.parentNode;
            // console.log(currentLi);
            var guid = currentLi.getAttribute('data-guid');
            
            for(var j = 0;j<goodlist.length;j++){
                // console.log(goodlist[j])
                if(goodlist[j].id === guid){
                    //商品数量的减一
                    var count = goodlist[j].qty--;
                    var input_qty = document.getElementById("quantity").value;
                    input_qty = count ; 
                    // console.log(count);
                    //当数量少于等于1时，删除cookie。
                    if(count<=1){
                       var input_qty = document.getElementById("quantity").value;
                       input_qty=1;
                       alert('商品数量不能小于1')
                    }
                    break;
                }
            }
            
            //重新写入cookie
            Cookie.set('goodlist',JSON.stringify(goodlist)+';path=/');
            //刷新界面
             read();
            return false;
       }
       
    }
       
       var all = document.getElementById('all');
        var fx = document.getElementById('fx');
        var hobby = document.getElementsByName('hobby');
        // 把所有hobby复选框的状态改成与#all一致
        all.onclick = function(){
            for(var i=0;i<hobby.length;i++){
                hobby[i].checked = all.checked;
                fx.checked =isCheckALL();

            }
        }
        // 给每个hobby复选框绑定点击事件
            // 判定#all复选框的勾选状态
            for(var i=0;i<hobby.length;i++){
                hobby[i].onclick = function(){
                    //选取或取消所有选取框isCheckAll(); 

                    fx.checked = isCheckALL();
                


                }
            }
            // 封装#all勾选状态函数
            // * 如果所有的hobby勾选，则#all勾选
            // * 只有有一个hobby未勾选，则#all取消勾选
            function isCheckALL(){
                // 假设hobby全部勾选
                var res = true;
                btnCheck.className ='active';
                for(var i=0;i<hobby.length;i++){
                    if(!hobby[i].checked){
                        res= false;
                        btnCheck.className ='';
                        break
                    }
                }
                return res;
            }

            //下全选
            fx.onclick = function(){
                for(var i=0;i<hobby.length;i++){
                    hobby[i].checked = !hobby[i].checked;
                }
                all.checked = isCheckALL();
                

            }
   });         
    

