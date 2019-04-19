$(function () {
    wowInt();
    findTel();
    phoneTargetSelf();

    $(window).scroll(function(){
        if($(this).scrollTop()>0){
            $('body').addClass('scrollHeader');
        }else{
            $('body').removeClass('scrollHeader'); 
        }
    });

    
    //微信
    $(".wechat").click(function () {
        var url=$(this).data("img")
        var title=""
        title+="<div class='weixin-box'>"
        title+="<i class='c'>x</i>"
        title+="<h2>微信二维码</h2>"
        title+="<div class='img'><img src='"+ url +"' width='100px;' height='100px;'></div>"
        title+="<p>扫一扫</p>"
        title+="</div>"
        $("body").remove(".weixin");
        $("body").append(title)
        //var op="http://service.weibo.com/share/share.php?url='"+ url +"'&title='"+ title +"'&searchPic=false"
        //window.open(op)
    })
    
    $(document).on("click",".weixin-box .c",function(){
        $(".weixin-box").remove();
    })
    //end

    //主导航
    if($(window).width()>1279){
        search();
        $(document).click(function(){           
             $(".search_wrap").slideUp(200);
             $(".head_search").removeClass("on");
        })

        $(".nav>ul>li").hover(function() {
            $(this).find(".navlist").stop().slideDown();
        }, function() {
            $(this).find(".navlist").stop().slideUp();
        });
    }else{
        $(".navlist").siblings("span").addClass("cur");
        $(document).on('click','.nav_phone_btn',function(){
            $('.nav_phone_btn').toggleClass('visible_nav');
            $('body').toggleClass('body_nav_phone');
        });
        $(".nav>ul>li>span").click(function(){
            $(this).parent("li").siblings().find("span").removeClass("on");
            $(this).parent("li").siblings().find(".navlist").slideUp();
            $(this).toggleClass("on");
            $(this).siblings(".navlist").slideToggle();
        })
    }
    //


    //--------------tab-box
    $(".tab-box .tab-a").each(function() {
        $(this).click(function() {

            $(this).addClass("on").siblings().removeClass("on");
            var ii=$(this).index();
            //$.getScript("../js/ratio-img.js");
            $(this).parents(".tab-box").find(".tab-b").eq(ii).show().siblings().hide();
            $(".inews_more a").eq(ii).addClass("on").siblings().removeClass("on");
            wowInt1();
        });   
    })
    $(".tab-box").each(function (i) {
        $(this).find(".tab-a:eq(0)").click();
    });
    
    //end
    $(window).resize();
})


function search(){
   $(".head_search").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
       $(this).toggleClass("on");
       $(".search_wrap").slideToggle(200);
    })
    $(".search_box_text").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
       
    })
}



document.onreadystatechange = function(){
    if(document.readyState == 'complete') $(".loading_animate").fadeOut();
    //$(window).scrollTop(0);
}

function wowInt(){
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset:0,
            mobile: false,
            live: true
        });
        wow.init();
    };
}

function wowInt1(){
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        var wow = new WOW({
            boxClass: 'index-part01 .ind-p01-bb li',
            animateClass: 'animated',
            offset:0,
            mobile: false,
            live: true
        });
        var wow1 = new WOW({
            boxClass: 'index-part01 .ind-p01-bb .tab-b a.more',
            animateClass: 'animated',
            offset:0,
            mobile: false,
            live: true
        });
        wow.init();
        wow1.init();
    };
}



/*手机端链接改为本窗口打开*/
function phoneTargetSelf(context){  
  if ($(window).width()<1024) {
    if(context==undefined){
      context=$(document);
    }
    $('a',context).each(function(){
      var target=$(this);
      var link=target.attr('target');
      target.attr('target','_self');
    })
  }
}


/*电话链接取消默认事件并添加样式*/
function findTel(context){
  if ($(window).width()>1024) {
    var condition = /^tel\:([0-9\-]+)|tel\:\+([0-9\-]+)$/;
    if(context==undefined){
      context=$(document);
    }
    $('a',context).each(function(index, el) {
      var target=$(this);
      var href=target.attr('href');
      if (condition.test(href)) {
        target.addClass('tel_link');
        target.on('click',function(event){
          event.preventDefault();
        })
      }
    });
  }
}



