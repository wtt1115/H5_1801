require(['config'],function(){
    require(['jquery','common'],function($){      
    
             $('#header').load('html/header.html');
             $('#footer').load('html/footer.html');
       
        
        // 大的轮播图
         var oWrap=document.getElementById('wrap')
         var picImg=document.getElementById('pic').getElementsByTagName('img');
         var tabLi=document.getElementById('tab').getElementsByTagName('li');
         var btnDiv=document.getElementById('btn').getElementsByTagName('div');

       
    
    function Banner(oWrap,picImg,tabLi,btnDiv){

          this.wrap = oWrap,
          this.list = picImg,
          this.tab = tabLi,
          this.btn = btnDiv,
          this.index =0,//这些属相必须是私有的

          // console.log(this)
          this.timer = null,
          this.length = this.tab.length
         }

         // 初始化
         Banner.prototype.init= function(){
          var This =this;
          // console.log(this)
          // 默认第一张显示，第一个远点显示红色
          this.list[0].style.display = 'block ';
          this.tab[0].className = 'on';

          for(var i=0;i<this.length;i++){
          // console.log(this.length)//4个
              this.tab[i].index = i;
              this.tab[i].onclick = function(){

                  This.list[This.index].style.display = 'none';
                 This.tab[This.index].className = '';

                 This.index = this.index;
                 This.list[This.index].style.display='block';
                 this.className = 'on';
              }
          }

              for(var i=0;i<this.btn.length;i++){

                  this.btn[i].index = i;
                  // onselectstart 开始选择触发的事件
                  this.btn[i].onselectstart =function(){
                      return false;
                  }

                  this.btn[i].onclick = function(){
                      This.list[This.index].style.display = 'none';
                      This.tab[This.index].className ='';
                      if(this.index){
                          This.index++;
                          This.index%= This.length;
                            
                      }else{
                          This.index--;

                          if(this.index<0 ){
                              This.index %= This.length-1;
                          }
                      }


                      This.list[This.index].style.display = 'block';
                      This.tab[This.index].className = 'on';
                  }
              }
              this.auto();
              this.clear();


         };


         Banner.prototype.auto = function(){
              var This = this;
              This.timer = setInterval(function(){
                  This.list[This.index].style.display = 'none';
                  This.tab[This.index].className = '';
                  This.index++;
                  This.index%= This.length;
                  This.list[This.index].style.display = 'block';
                  This.tab[This.index].className = 'on';
              },2000)
         }



         Banner.prototype.clear = function(){
          var This = this;
          this.wrap.onmouseover = function(){
              clearInterval(This.timer)
          }
          this.wrap.onmouseleave = function(){
              This.auto();
          }
         }



         var banner1 = new Banner(oWrap,picImg,tabLi,btnDiv);
         banner1.init();
        


    
        // 小的轮播图
      
          var gif = document.getElementById('gif');
        var gif1 = document.getElementById('gif1');
        var gif2 = document.getElementById('gif2');

        var index =1;
       
            var timer = setInterval(function(){
                        index++;
                        if(index>5){
                            index=1;
                        }
                        gif.src= 'img/g'+index +'.gif';
                        
                    },2000);
            var timer = setInterval(function(){
                        index++;
                        if(index>5){
                            index=1;
                        }
                       gif1.src= 'img/z'+index +'.gif';
                        
                    },2000);
            var timer = setInterval(function(){
                        index++;
                        if(index>5){
                            index=1;
                        }
                       gif2.src= 'img/h'+index +'.gif';
                        
                    },2000);
   

   

  //走动的时间
  var time = document.getElementById('time');

        showtime();
        // 定时器操作
        
        setInterval(showtime,1000);

        function showtime(){

            var d = new Date();

            var year =d.getFullYear();
            var month = d.getMonth()+1;
            var date = d.getDate();
            //星期
            // var day= d.getDay();

            // var str= '天，一，二，三，四，五，六'.slice('，');

            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            // 补0操作
            hours = hours<10 ? '0'+hours:hours;
            minutes = minutes<10 ? '0'+minutes:minutes;
            seconds = seconds<10 ? '0'+seconds:seconds;



            time.innerHTML = year +'.'+month +'.'+date +'. '+hours +':'+minutes
             +': '+seconds ;
        }
        

        //限时特卖-- 倒计时
        // var jishi = document.querySelector('.jishi');
        // var jilist= jishi.children;console.log(jilist);
        var  countDown= document.getElementById('countDown');
        var  countDown1= document.getElementById('countDown1');
        var  countDown2= document.getElementById('countDown2');
        var  countDown3= document.getElementById('countDown3');
       // 设置结束时间
              var end = '2018-4-30 20:57:33'; 
              var end1 = '2018-4-20 18:00:33';
              var end2 = '2018-4-18 09:00:00';
              var end3 = '2018-4-26 10:00:00';   
        doajishi();
         function doajishi(){
          showTime();
          showTime1();
          showTime2();
          showTime3();

            function showTime(){
           
        
        var timer = setInterval(showTime,1000);
        
            // 2）不断拿当前时间跟结束时间对比，计算差值
            // 3）把差值转换成《剩余时间》
            var offset = Date.parse(end)-Date.now();
            offset = Math.floor(offset/1000);
            
            if(offset<=0){
                // 5）倒计时结束时   
                //         * 隐藏倒计时
                clearInterval(timer);
                countDown.style.display ='none';
                

            }
            // 4）拼接时间格式，写入页面
            var sec = offset%60;
            var min =Math.floor(offset/60)%60;
            var hour = Math.floor(offset/60/60)%24;
            var day = Math.floor(offset/60/60/24);

              sec = sec<10 ? '0'+sec:sec;
            min = min<10 ? '0'+min:min;
            hour = hour<10 ? '0'+hour:hour;

            countDown.innerHTML = '剩余'+day+'天'+hour+'时'+min+'分'+sec+'秒';
            }
        function showTime1(){
           
       
        var timer = setInterval(showTime1,1000);
        
            // 2）不断拿当前时间跟结束时间对比，计算差值
            // 3）把差值转换成《剩余时间》
            var offset1 = Date.parse(end1)-Date.now();
            offset1 = Math.floor(offset1/1000);
            
            if(offset1<=0){
                // 5）倒计时结束时   
                //         * 隐藏倒计时
                clearInterval(timer);
                countDown.style.display ='none';
                

            }
            // 4）拼接时间格式，写入页面
            var sec = offset1%60;
            var min =Math.floor(offset1/60)%60;
            var hour = Math.floor(offset1/60/60)%24;
            var day = Math.floor(offset1/60/60/24);

              sec = sec<10 ? '0'+sec:sec;
            min = min<10 ? '0'+min:min;
            hour = hour<10 ? '0'+hour:hour;

            countDown1.innerHTML = '剩余'+day+'天'+hour+'时'+min+'分'+sec+'秒';
            }

            function showTime2(){
           
       
        var timer = setInterval(showTime2,1000);
        
            // 2）不断拿当前时间跟结束时间对比，计算差值
            // 3）把差值转换成《剩余时间》
            var offset2 = Date.parse(end2)-Date.now();
            offset2 = Math.floor(offset2/1000);
            
            if(offset2<=0){
                // 5）倒计时结束时   
                //         * 隐藏倒计时
                clearInterval(timer);
                countDown.style.display ='none';
                 

            }
            // // 4）拼接时间格式，写入页面
            var sec = offset2%60;
            var min =Math.floor(offset2/60)%60;
            var hour = Math.floor(offset2/60/60)%24;
            var day = Math.floor(offset2/60/60/24);

            sec = sec<10 ? '0'+sec:sec;
            min = min<10 ? '0'+min:min;
            hour = hour<10 ? '0'+hour:hour;

            countDown2.innerHTML = '剩余'+day+'天'+hour+'时'+min+'分'+sec+'秒';
            }
            function showTime3(){
           
       
        var timer = setInterval(showTime3,1000);
        
            // 2）不断拿当前时间跟结束时间对比，计算差值
            // 3）把差值转换成《剩余时间》
            var offset3 = Date.parse(end3)-Date.now();
            offset3 = Math.floor(offset3/1000);
            
            if(offset3<=0){
                // 5）倒计时结束时   
                //         * 隐藏倒计时
                clearInterval(timer);
                countDown.style.display ='none';
                

            }
            // 4）拼接时间格式，写入页面
            var sec = offset3%60;
            var min =Math.floor(offset3/60)%60;
            var hour = Math.floor(offset3/60/60)%24;
            var day = Math.floor(offset3/60/60/24);

           sec = sec<10 ? '0'+sec:sec;
            min = min<10 ? '0'+min:min;
            hour = hour<10 ? '0'+hour:hour;

            countDown3.innerHTML = '剩余'+day+'天'+hour+'时'+min+'分'+sec+'秒';
            }
         }
        
        

// 育儿信息 tab切换

    var tab = document.getElementsByClassName('tab')[0];
        var tabItem = tab.children[0].children;
        // console.log(tabItem)
        var tabContent =tab.children[1].children;
        // console.log(tabContent)
        // 高亮第一部分
        tabItem[0].className = 'active';
        // 隐藏除第一部分以外的部分
            for(var i=0;i<tabItem.length;i++){
                if(i>0){
                  // console.log(tabContent[i])
                    tabContent[i].style.display ='none';

                }
            tabItem[i].onclick = function(){
                var idx;
                for(var i=0;i<tabItem.length;i++){
                    if(tabItem[i]===this){
                        idx=i;
                        console.log(this)//tab.children[0].children[0,1,2,3,4]
                        
                    }
                    tabItem[i].className ='';
                    tabContent[i].style.display ='none';
                }

                this.className='active';
                //tabItem[i]=tabContent[i]
                //tab对应图片
                tabContent[idx].style.display = 'block';
            }
        }

// 商品列表一
  let goodslist1 = document.querySelector('#good1-t');
   let goodslist2 = document.querySelector('#good1-b');
    let goodslist3 = document.querySelector('#goodslist3');
    // console.log(goodslist3)

    let status = [200,304];

    let xhr = new XMLHttpRequest();

    xhr.onload = function(){
            if(status.includes(xhr.status)){
            let data = JSON.parse(xhr.responseText);
            goodslist1.innerHTML = data.map(item=>{
                return `<li data-id="${item.id}" class="onelist">
                <img src="${item.img}" alt="">
                <h4>${item.content}</h4>
                 <p class="price">￥：${item.price}</p>
                </li>`

            }).join('')
            
        }
    }

    xhr.open('get','api/indexone.php',true);
    xhr.send();
    
      let status1 = [200,304];

    let xhr1 = new XMLHttpRequest();
    xhr1.onload = function(){
            if(status1.includes(xhr1.status)){
            let data1 = JSON.parse(xhr1.responseText);
            goodslist2.innerHTML = data1.map(item=>{
                return `<li data-id="${item.id}" class="onelist">
                <img src="${item.img}" alt="">
                <h4>${item.content}</h4>
                 <p class="price">￥：${item.price}</p>
                </li>`

            }).join('')
            
        }
    }

    xhr1.open('get','api/indextwo.php',true);
    xhr1.send();
    // 获取换一批点击事件
    var huan = document.querySelector('.huan');

    huan.onclick = function(){
      
       goodslist1.innerHTML = goodslist2.innerHTML ;
    }
    
// 热门品牌
    let status3 = [200,304];

    let xhr3 = new XMLHttpRequest();
    console.log(xhr3)
    xhr3.onload = function(){
            if(status3.includes(xhr3.status)){
            let data3 = JSON.parse(xhr3.responseText);
            goodslist3.innerHTML = data3.map(item=>{
                return `<li data-id="${item.id}" class="threelist">
                <img src="${item.img}" alt="">
                <h4>${item.content}</h4>
                 <p class="price">￥：${item.price}</p>
                </li>`

            }).join('')
            
        }
    }

    xhr3.open('get','api/indexthree.php',true);
    xhr3.send();

     //    // 相同轮播图部分6个
     
$(function(){
      $(".carousel-content").carousel({
        carousel : ".carousel",//轮播图容器
        indexContainer : ".img-index",//下标容器
        prev : ".carousel-prev",//左按钮
        next : ".carousel-next",//右按钮
        timing : 3000,//自动播放间隔
        animateTime : 700,//动画时间
        autoPlay : true,//是否自动播放 true/false
        direction : "left",//滚动方向 right/left
      });

      $(".carousel-content").hover(function(){
        $(".carousel-prev,.carousel-next").fadeIn(300);
      },function(){
        $(".carousel-prev,.carousel-next").fadeOut(300);
      });

      $(".carousel-prev").hover(function(){
        $(this).find("img").attr("src","img/left2.png");
      },function(){
        $(this).find("img").attr("src","img/left1.png");
      });
      $(".carousel-next").hover(function(){
        $(this).find("img").attr("src","img/right2.png");
      },function(){
        $(this).find("img").attr("src","img/right1.png");
      });
    });


  

  });   
});

  
                        