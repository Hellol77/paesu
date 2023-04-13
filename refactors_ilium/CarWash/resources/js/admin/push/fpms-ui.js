/*! fpms UI - v1.1.1 2014.3.10 */

(function ($) {
	$(document).ready(function(){
		
		// page upDown
		$("#stableUp").click(function(){
			var imgSrc = $(this).find('img').attr("src");
			
			if(imgSrc=="images/btn_up.png"){
				$("#stArea").toggle();
				$(this).find('img').attr("src","images/btn_down.png");
				// im.attr("src","second.jpg");
			}else{
				$("#stArea").toggle();
				$(this).find('img').attr("src","images/btn_up.png");
			}
		});

		// jquery ui calendar Customizing
		$(".datepicker").datepicker({
			showOn: "button",
			buttonImage: "images/ico_calendar.png",
			buttonImageOnly: true,
			dateFormat: 'yymmdd',
			monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			changeMonth: true, //월변경가능
			changeYear: true, //년변경가능
			showMonthAfterYear: true //년 뒤에 월 표시
		});
		
		// progressbar 
		$( ".progressbar" ).progressbar({
			value: 37
		});

		$(".osOnoff").buttonset();

	});
})(jQuery);
