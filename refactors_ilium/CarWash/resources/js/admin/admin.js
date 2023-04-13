
(function($) {

	/* 온로드 실행 함수 */
	$(function() {

		/**** gnb ****/
		var $menuTimer;
		var $gnb_container = $("#header .gnb");
		var $gnb_menu = $gnb_container.find(">li>a");
		var $gnb_menu_sub = $gnb_container.find(">li>ul>li>a");
		var $total_width = 0;
		var $new_left = 0;
		
		var $Win_HT = null;

		$gnb_container.find(">li:not(.on)>ul").hide();
		$gnb_container.find(">li.on").addClass("active");

		//초기2차메뉴설정
		$gnb_container.find(">li.on>ul").find("li").each(function(){ $total_width += $(this).outerWidth();});

		//$gnb_container.find(">li.on>ul").css({"width":$total_width+"px","left":$new_left+"px"});
		$gnb_container.find(">li.on>ul").css({"width":($("#header").width())+"px","left":$new_left+"px"});

		//1차메뉴 오버시 하위 2차메뉴 display
		$gnb_menu.bind('mouseover', function(){

			$gnb_container.find(">li>ul")
				.hide()
				.parent().removeClass("on");

			$(this)
				.siblings("ul").fadeIn(200)
				.end()
				.parent().addClass("on");

			$total_width = 0;
			$new_left = 0;

			//가로값설정
			$(this).siblings("ul").find("li").each(function(){
				$total_width += $(this).outerWidth();
			});

			//좌측좌표재설정
			$new_left = ($(this).parent().offset().left+($(this).parent().outerWidth()/2))-($total_width/2);
			if($new_left<0) $new_left = 0;

			//$(this).siblings("ul").css({"width":$total_width+"px","left":$new_left});
			$(this).siblings("ul").css({"width":($("#header").width())+"px","left":$new_left});

			clearTimeout($menuTimer); 
		});

		//2차메뉴 오버시 타임 클리어
		$gnb_menu_sub.bind('mouseover', function(){ clearTimeout($menuTimer); });

		//1,2차메뉴 아웃시 timerSet호출
		$gnb_menu.bind('mouseout',function(){ $menuTimer = setTimeout(timerSet,1000); });
		$gnb_menu_sub.bind('mouseout', function(){ $menuTimer = setTimeout(timerSet,1000); });

		function timerSet(){
			$gnb_container.find(">li>ul")
				.fadeOut(200)
				.parent().removeClass("on");

			$gnb_container.find(">li.active>ul")
				.fadeIn(200)
				.parent().addClass("on");
				
		}
		
		
		//추가
		function Win_height() {
			$Win_HT = $(window).height();
			$('#container').css('min-height',$Win_HT - ($('#header').outerHeight() + $('#footer').outerHeight()));
		}
		
		$(window).load(function(e) {
			
         	Win_height();
		 
        });
		
		$(window).resize(function(e) {
			
            Win_height();
			Pop_WD = $(window).width();
			Pop_HT = $(window).height();		

			if (popck==true) {
				popresize();
			}

			
        });

	});
	/* //온로드 실행 함수 */
	
	
	
	//탭메뉴	
	$.fn.tabmenu = function(options) {
		var $tab_li = $(this).find('>li');
		
		$(this).find('>li:first-child').addClass('on');

		$tab_li.each(function() {
			$(this).find('> a').click(function(e) {
				$tab_li.removeClass('on');
				$(this).parents('li').addClass('on');
            });
		});
	}

	
	
	/* 트리 메뉴 */
	$.fn.openActive = function(activeSel) {
        activeSel = activeSel || ".active";

        var c = this.attr("class");

        this.find(activeSel).each(function(){
            var el = $(this).parent();
            while (el.attr("class") !== c) {
                if(el.prop("tagName") === 'UL') {
                    el.show();
                } else if (el.prop("tagName") === 'LI') {
                    el.removeClass('tree-closed');
                    el.addClass("tree-opened");
                }

                el = el.parent();
            }
        });

        return this;
    }

    $.fn.treemenu = function(options) {
        options = options || {};
        options.delay = options.delay || 0;
        options.openActive = options.openActive || false;
        options.activeSelector = options.activeSelector || "";

        this.addClass("treemenu");
        this.find("> li").each(function() {
            e = $(this);
            var subtree = e.find('> ul');
            var toggler = $('<span>');
            toggler.addClass('toggler');
            e.prepend(toggler);
            if(subtree.length > 0) {
                subtree.hide();

                e.addClass('tree-closed');

                e.find(toggler).click(function() {
                    var li = $(this).parent('li');
                    li.find('> ul').toggle(options.delay);
                    li.toggleClass('tree-opened');
                    li.toggleClass('tree-closed');
                });
                $(this).find('> ul').treemenu(options);
            } else {
                $(this).addClass('tree-empty');
            }
        });

        if (options.openActive) {
            this.openActive(options.activeSelector);
        }

        return this;
    }
	
	
	

})(jQuery);


var Pop_WD = null;
var Pop_HT = null;
var popck = false;

function popresize() {
	$('.layer_bg').css({'width':Pop_WD+'px','height':Pop_HT+'px'});
}


// 레이어팝업
function layer_popopen(attr_ID, popwidth, popheight) {
	var $obj = $('#'+attr_ID+'');
	$obj.css({'display':'block', 'width':$(window).width()+'px','height':$(window).height()+'px'});
	$obj.find('.layerpop').css({'display':'block', 'width':popwidth+'px', 'height':popheight+'px', 'margin-top':-parseInt(popheight/2)+'px','margin-left':-parseInt(popwidth/2)+'px'});
	var body_HT = $obj.find('.pop_head').outerHeight() + $obj.find('.pop_foot').outerHeight();
	$obj.find('.layerpop .pop_body').css({'height':popheight - body_HT-20 +'px'});
	popck = true;
}

function layer_popclose(attr_ID) {
	var $obj = $('#'+attr_ID+'');
	$obj.css('display','none');
	$obj.find('.layerpop').css('display','none');
	popck = false;
}

//튤팁
function Tooltip(obj) {
	var $obj = 	$(obj);
	$obj.find('.hidden').css('display','block');
	
	$obj.mouseleave(function(e) {
        $obj.find('.hidden').css('display','none');
    });
}




	