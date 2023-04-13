/*****************************************************************************
 * 파일명 : date.js
 * 작성일 : 2014. 04. 06
 * 작성자 : YeongTak, Jeong
 * 설   명 : 날짜 관련 함수 정의
 * ===========================================================================
 * 변경이력:
 * DATE				AUTHOR		DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/


(function($){

	if ($.datepicker) {
		/*
		 * jQuery.datepicker 설정
		 */
		$.datepicker.regional['ko'] = { // Default regional settings
	        closeText: '닫기',
	        prevText: '이전달',
	        nextText: '다음달',
	        currentText: '오늘',
	        monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)', '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
	        monthNamesShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
	        dayNames: ['일','월','화','수','목','금','토'],
	        dayNamesShort: ['일','월','화','수','목','금','토'],
	        dayNamesMin: ['일','월','화','수','목','금','토'],
	        weekHeader: 'Wk',
	        dateFormat: 'yymmdd', // [mm/dd/yy], [yy-mm-dd], [d M, y], [DD, d MM]
	        firstDay: 0,
	        isRTL: false,
	        yearSuffix: '',
			changeMonth: true, //월변경가능
			changeYear: true, //년변경가능
			showMonthAfterYear: true, //년 뒤에 월 표시
	        showButtonPanel: true //버튼 표시(오늘, 닫기)
		};
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}

})(jQuery);


var date = {
	/**
	 * <pre>
	 * 년,월,일,시,분 SelectBox Display
	 * </pre>
	 * @param objId : HTML을 표시할 영역 ID
	 * @param sDate : 날짜
	 * @param selectID : SelectBox ID
	 * @param iType : Display Type
	 * @param iStartYear : 시작 연도
	 * @param iEndYear : 마지막 연도
	 * @param title : 타이틀
	 * @param sMethodStr : 메서드 
	 * @param bHasSpace : 비어있는값 여부(기본값: false)
	 * @return 
	 */
	printDateSelect : function(sDate, selectID, objId, iType, iStartYear, iEndYear, title, sMethodStr, bHasSpace, locale) {
		if (iType == null) iType = 0;
		if (bHasSpace == null || bHasSpace == undefined) bHasSpace = false;
		var yearSelectID = selectID + '_year';
		var monthSelectID = selectID + '_month';
		var dateSelectID = selectID + '_date';
		var timeSelectID = selectID + '_time';
		var minuteSelectID = selectID + '_minute';
		var weekSelectID = selectID + '_week';
		var html = '';
		
		var yearSelectTitle = title + ' 년도 선택';
		var monthSelectTitle1 = title + ' 월 선택';
		var monthSelectTitle2 = title + ' 개월 선택';
		var dateSelectTitle = title + ' 일 선택';
		var timeSelectTitle = title + ' 시 선택';
		var minuteSelectTitle = title + ' 분 선택';
		
		var $objDiv = $("#" + objId);
		if (iType == 0) { // 년, 월, 일
			html += date_cfMakeYearSelect(yearSelectID, sDate.substring(0, 4), iStartYear, iEndYear, bHasSpace, yearSelectTitle, "onChange=date.leapRule('" + selectID + "');") + ' 년 ';
			html += date_cfMakeMonthSelect(monthSelectID, sDate.substring(4, 6), bHasSpace, monthSelectTitle1, "onChange=date.leapRule('" + selectID + "');") + ' 월 ';
			html += date_cfMakeDateSelect(dateSelectID, sDate.substring(6), bHasSpace, sDate.substring(0, 4), sDate.substring(4, 6), dateSelectTitle, sMethodStr) + ' 일';
		} else if (iType == 1) { // 월, 일, 년
			html += date_cfMakeMonthSelect(monthSelectID, sDate.substring(4, 6), null, monthSelectTitle1, "onChange=date.leapRule('" + selectID + "');") + ' 월 ';
			html += date_cfMakeDateSelect(dateSelectID, sDate.substring(6), null, sDate.substring(0, 4), sDate.substring(4, 6), dateSelectTitle, sMethodStr) + ' 일 ';
			html += date_cfMakeYearSelect(yearSelectID, sDate.substring(0, 4), iStartYear, iEndYear, null, yearSelectTitle, "onChange=date.leapRule('" + selectID + "');") + ' 년';
		} else if (iType == 2) { // 월, 년
			html += date_cfMakeYearSelect(yearSelectID, sDate.substring(0, 4), iStartYear, iEndYear, null, yearSelectTitle, "onChange=date.leapRule('" + selectID + "');") + ' 년 ';
			html += date_cfMakeMonthSelect(monthSelectID, sDate.substring(4, 6), null, monthSelectTitle1, null) + ' 월';
		} else if (iType == 3) { // 년
			html += date_cfMakeYearSelect(yearSelectID, sDate.substring(0, 4), iStartYear, iEndYear, null, yearSelectTitle, null) + ' 년';
		} else if (iType == 4) { // 일
			html += date_cfMakeDateSelect(dateSelectID, sDate.substring(6), null, null, null, dateSelectTitle);
		} else if (iType == 5) { // 년, 월, 일, 시, 분
			html += date_cfMakeYearSelect(yearSelectID, sDate.substring(0, 4), iStartYear, iEndYear, null, yearSelectTitle, "onChange=date.leapRule('" + selectID + "');") + ' 년 ';
			html += date_cfMakeMonthSelect(monthSelectID, sDate.substring(4, 6), null, monthSelectTitle1, "onChange=date.leapRule('" + selectID + "');") + ' 월 ';
			html += date_cfMakeDateSelect(dateSelectID, sDate.substring(6, 8), null, sDate.substring(0, 4), sDate.substring(4, 6), dateSelectTitle, sMethodStr) + ' 일 ';
			html += date_cfMakeTimeSelect(timeSelectID, sDate.substring(8, 10), null, timeSelectTitle) + ' 시 ';
			html += date_cfMakeMinSelect(minuteSelectID, sDate.substring(10, 12), null, minuteSelectTitle) + ' 분';
		} else if (iType == 6) { // 월, 일
			html += date_cfMakeMonthSelect(monthSelectID, sDate.substring(4, 6), null, monthSelectTitle2) + ' 개월 ';
			html += date_cfMakeDateSelect(dateSelectID, sDate.substring(6), null, null, null, dateSelectTitle, sMethodStr) + ' 일';
		} else if (iType == 7) { // 년, 월, 일, 요일
			html += date_cfMakeYearSelect(yearSelectID, sDate.substring(0, 4), iStartYear, iEndYear, bHasSpace, yearSelectTitle, "onChange=date.leapRule('" + selectID + "');") + ' 년 ';
			html += date_cfMakeMonthSelect(monthSelectID, sDate.substring(4, 6), bHasSpace, monthSelectTitle1, "onChange=date.leapRule('" + selectID + "');") + ' 월 ';
			html += date_cfMakeDateSelect(dateSelectID, sDate.substring(6), bHasSpace, sDate.substring(0, 4), sDate.substring(4, 6), dateSelectTitle, sMethodStr) + ' 일';
			html += ' <strong id="' + weekSelectID + '">' + this.getWeekName(sDate.substring(0, 4), sDate.substring(4, 6), sDate.substring(6), locale) + '</strong>';
		} else if (iType == 8) { // 년도
			html += date_cfMakeYearSelect(yearSelectID, sDate.substring(0, 4), iStartYear, iEndYear, null, yearSelectTitle, null) + ' 년도';
		} else if (iType == 10) { // 월,년
			html += date_cfMakeMonthSelect(monthSelectID, sDate.substring(4, 6), null, monthSelectTitle1, null) + ' 월 ';
			html += date_cfMakeYearSelect(yearSelectID, sDate.substring(0, 4), iStartYear, iEndYear, null, yearSelectTitle, null) + ' 년 ';
		}
		$objDiv.html(html);
	},

	/**
	 * <pre>
	 * 연도 SelectBox Display
	 * </pre>
	 * @param yearselectID : SelectBox ID
	 * @param sSelectedYear : Selected 연도
	 * @param iStartYear : 시작 연도
	 * @param iEndYear : 마지막 연도
	 * @param bHasSpace : 비어있는값 여부
	 * @param title : SelectBox 타이틀
	 * @param sMethodStr : 메서드 
	 * @return 
	 */
	makeYearSelect : function(yearselectID, sSelectedYear, iStartYear, iEndYear, bHasSpace , title, sMethodStr) {
		if (iStartYear == null) iStartYear = 1900;
		if (iEndYear == null) iEndYear = (new Datge()).getFullYear();
		if (bHasSpace == null) bHasSpace = false;
		var html = "";
		if (sMethodStr != null && sMethodStr != "") {
			html = "<select data-type='select' id='" + yearselectID + "' name='" + yearselectID + "' title='" + title + "' " + sMethodStr + ">";
		} else {
			html = "<select data-type='select' id='" + yearselectID + "' name='" + yearselectID + "' title='" + title + "' >";
		}
		if (bHasSpace)
			html += '<option value="">선택</option>';
		for (var i = iStartYear; i <= iEndYear; i++) {
			if ((i + "") == sSelectedYear) html += '<option value="' + i + '"' + ' selected>' + i + '</option>\n';
			else html += '<option value="' + i + '"' + '>' + i + '</option>\n';
		}
		html += '</select>';
		return html;
	},

	/**
	 * <pre>
	 * 월 SelectBox Display
	 * </pre>
	 * @param monthselectID : SelectBox ID
	 * @param sSelectedMonth : Selected 월
	 * @param bHasSpace : 비어있는값 여부
	 * @param title : SelectBox 타이틀
	 * @param sMethodStr : 메서드
	 * @return 
	 */
	makeMonthSelect : function(monthselectID, sSelectedMonth, bHasSpace, title, sMethodStr) {
		if (bHasSpace == null) bHasSpace = false;
		var html = "";
		var k = "";
		var week = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
		if (sMethodStr != null && sMethodStr != "") {
			html = "<select data-type='select' id='" + monthselectID + "' name='" + monthselectID + "' title='" + title + "' " + sMethodStr + ">";
		} else {
			html = "<select data-type='select' id='" + monthselectID + "' name='" + monthselectID + "' title='" + title + "' >";
		}
		if (bHasSpace) html += '<option value="">선택</option>';
		for (var i = 1; i <= 12; i++) {
			if (i < 10) k = '0' + i;
			else k = "" + i;
			if (k == sSelectedMonth) html += '<option value="' + k + '"' + ' selected>' + week[i - 1] + '</option>\n';
			else html += '<option value="' + k + '"' + '>' + week[i - 1] + '</option>\n';
		}
		html += '</select>';
		return html;
	},

	/**
	 * <pre>
	 * 일 SelectBox Display
	 * </pre>
	 * @param dateselectID : SelectBox ID
	 * @param sSelectedDay : Selected 일
	 * @param bHasSpace : 비어있는값 여부
	 * @param year : 특정연도
	 * @param month : 특정일자
	 * @param title : SelectBox 타이틀
	 * @param sMethodStr : 메서드
	 * @return 
	 */
	makeDateSelect : function(dateselectID, sSelectedDay , bHasSpace, year, month, title, sMethodStr) {
		if (bHasSpace == null) bHasSpace = false;
		var html = "";
		var k = "";
		if (sMethodStr != null && sMethodStr != "") {
			html = "<select data-type='select' id='" + dateselectID + "' name='" + dateselectID + "' title='" + title + "' " + sMethodStr + ">";
		} else {
			html = "<select data-type='select' id='" + dateselectID + "' name='" + dateselectID + "' title='" + title + "' onchange=\"this.disabled=true;\">";
		}
		if (bHasSpace) html += '<option value="">선택</option>';
		var leapEndDate = 31;
		try {
			if (month == null || $.trim(month) == '' || month == undefined) { // month가 비워져 있는 경우
				leapEndDate = 31;
			} else {
				leapEndDate = this.getMaxDay(year, month);
			}
		} catch (e) {
			leapEndDate = 31;
		}
		for (var i = 1; i <= leapEndDate; i++) {
			if (i < 10) k = '0' + i;
			else k = "" + i;
			if (k == sSelectedDay) html += '<option value="' + k + '"' + ' selected>' + k + '</option>';
			else html += '<option value="' + k + '"' + '>' + k + '</option>';
		}
		html += '</select>';
		return html;
	},

	/**
	 * <pre>
	 * 시간 SelectBox Display
	 * </pre>
	 * @param timeselectID : SelectBox ID
	 * @param sSelectedTime : Selected 시간
	 * @param bHasSpace : 비어있는값 여부
	 * @param title : SelectBox 타이틀
	 * @return 
	 */
	makeTimeSelect : function(timeselectID, sSelectedTime, bHasSpace, title) {
		if (bHasSpace == null) bHasSpace = false;
		var html = "";
		var k = "";
		html = "<select data-type='select' id='" + timeselectID + "' name='" + timeselectID + "' title='" + title + "' >";
		if (bHasSpace) html += '<option value="">선택</option>';
		for (var i = 0; i <= 23; i++) {
			if (i < 10) k = '0' + i;
			else k = "" + i;
			if (k == sSelectedTime) html += '<option value="' + k + '"' + ' selected>' + i + '</option>';
			else html += '<option value="' + k + '"' + '>' + i + '</option>';
		}
		html += '</select>';
		return html;
	},

	/**
	 * <pre>
	 * 분 SelectBox Display
	 * </pre>
	 * @param timeselectID : SelectBox ID
	 * @param sSelectedTime : Selected 분
	 * @param bHasSpace : 비어있는값 여부
	 * @param title : SelectBox 타이틀 
	 * @return 
	 */
	makeMinSelect : function(minselectID, sSelectedMin , bHasSpace, title ) {
		if (bHasSpace == null) bHasSpace = false;
		var html = "";
		var k = "";
		html = "<select data-type='select' id='" + minselectID + "' name='" + minselectID + "' title='" + title + "' >";
		if (bHasSpace) html += '<option value="">선택</option>';
		for (var i = 0; i <= 59; i++) {
			if (i < 10) k = '0' + i;
			else k = "" + i;
			if (k == sSelectedMin) html += '<option value="' + k + '"' + ' selected>' + i + '</option>';
			else html += '<option value="' + k + '"' + '>' + i + '</option>';
		}
		html += '</select>';
		return html;
	},

	/**
	 * <pre>
	 * 월마지막날짜 구함 
	 * </pre>
	 * @param year : 해당년
	 * @param month : 해당월
	 * @return 월마지막날짜
	 */
	getMaxDay : function(year, month) {
		if( month ==1 ) return 31;
		if( month ==2 ) {
			var gubun = 28;
			if( (year%4)==0 )gubun=29;
			if( (year%100)==0)gubun=28;
			if( (year%400)==0)gubun=29;
			return gubun;
		}
		if( month==3 ) return 31;
		if( month==4 ) return 30;
		if( month==5 ) return 31;
		if( month==6 ) return 30;
		if( month==7 ) return 31;
		if( month==8 ) return 31;
		if( month==9 ) return 30;
		if( month==10 ) return 31;
		if( month==11 ) return 30;
		if( month==12 ) return 31;
	},

	/**
	 * <pre>
	 * 윤년체크후 일SelectBox 생성
	 * printDateSelect와 같이 사용
	 * </pre>
	 * @param selectID : SelectBox ID
	 * @param fm : Form 이름
	 * @return 
	 */
	leafRule : function(selectID) {
		var $year_selected = $("#" + selectID + "_year option:selected");
		var $month_selected = $("#" + selectID + "_month option:selected");
		var $date_selectbox = $("#" + selectID + "_date");
		var i = 1;
		var k = 1;
		var total_days = this.getMaxDay($year_selected.val(), $month_selected.val());
		$date_selectbox.find("option").not("[value='']").remove(); //삭제
		for (i = 1; i <= total_days; i++) {
			k = i;
			if (i < 10) {
				k = '0' + k;
			}
			$date_selectbox.append($('<option>', {
				value : k,
				text : k
			}));
		}
		$date_selectbox.refresh();
	},

	/**
	 * 특정 날짜의 요일 이름을 반환
	 * @param year : 특정연도
	 * @param month : 특정월
	 * @param date : 특정일자
	 * @return 요일이름(예: 일요일)
	 */
	getWeekName : function(year, month, date, locale) {
		var tmpDate = new Date(year + '/' + month + '/' + date);
		var nWeek = tmpDate.getDay();
		if (locale == 'en' || locale == 'en_US') {
			var weekName = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
			return weekName[nWeek];
		} else {
			var weekName = new Array('일','월','화','수','목','금','토');
			return weekName[nWeek] + '요일';
		}
	},

	/**
	 * <pre>
	 * 입력날짜에서 계산된 날짜를 반환
	 * 
	 * 예)
	 *  calcDate('', 0, 0, 0, 0,'yyyy.MM.dd');  //오늘
	 *  calcDate('', 0, 0,-1, 0,'yyyy.MM.dd');  // Week-1
	 *  calcDate('', 0, 0, 0,-15,'yyyy.MM.dd');   // day-15
	 *  calcDate('', 0,-1, 0, 0,'yyyy.MM.dd');    // month-1
	 * </pre>
	 * @param startDate
	 * @param year
	 * @param month
	 * @param week
	 * @param day
	 * @param dateFormat
	 * @returns
	 */
	calcDate : function(startDate, year, month, week, day, dateFormat) {
		if (dateFormat.length < 1) {
			dateFormat = 'yyyy-MM-dd';
		}
		var dtReturn;
		if (startDate.length < 1) {
			dtReturn = new Date();
		} else {
			dtReturn = new Date(startDate);
		}
		if (year != 0) {
			dtReturn.setYear(dtReturn.getFullYear() + year);
		}
		if (month != 0) {
			dtReturn.setMonth(dtReturn.getMonth() + month);
		}
		if (week != 0) {
			day += (week * 7);
		}
		if (day != 0) {
			dtReturn.setDate(dtReturn.getDate() + day);
		}
		return dtReturn.format(dateFormat);
	},

	/**
	 * 현재 날짜를 반환
	 */
	getNowDate : function(separator) {
		if (separator == null || separator == undefined) {
			separator = '';
		}
		var now = new Date();
		var months = new Array('01','02','03','04','05','06','07','08','09','10','11','12');
		var date = ((now.getDate() < 10) ? "0" : "") + now.getDate();
		return now.getFullYear() + separator + months[now.getMonth()] + separator + date; 
	},

	/**
	 * 현재 시간을 반환
	 */
	getNowTime : function(separator) {
		if (separator == null || separator == undefined) {
			separator = '';
		}
		var date = new Date();
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		var milisec = date.getMilliseconds();
		if (milisec.length == 1) {
			milisec = "00" + milisec;
		} else if (milisec.length == 2) {
			milisec = "0" + milisec;
		}
		return (hour < 10 ? "0" + hour : hour)
			+ separator
			+ (min < 10 ? "0" + min : min)
			+ separator
			+ (sec < 10 ? "0" + sec : sec);
		return retVal;
	},

	/**
	 * 현재시간을 반환(yyyyMMddHHmmssSSSS)
	 */
	getTimeStamp : function() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		var milisec = date.getMilliseconds();
		if (milisec.length == 1) {
			milisec = "00" + milisec;
		} else if (milisec.length == 2) {
			milisec = "0" + milisec;
		}
		
		var retVal = year
			+ (month < 10 ? "0" + month : month)
			+ (day < 10 ? "0" + day : day)
			+ (hour < 10 ? "0" + hour : hour)
			+ (min < 10 ? "0" + min : min) 
			+ (sec < 10 ? "0" + sec : sec)
			+ milisec;
		return retVal;
	},

	/**
	 * 현재날짜에 특정날짜를 더한 값을 반환
	 * @param flag : 구분(year, month, day)
	 * @param num
	 * @returns
	 */
	getAddDate : function(flag, num) {
		var now = new Date();
		switch (flag) {
			case 'year': now.setFullYear(now.getFullYear() + num); break;
			case 'month' : now.setMonth(now.getMonth() + num); break;
			case 'day' : now.setDate(now.getDate()+num); break;
			default: break;
		}
		var months = new Array('01','02','03','04','05','06','07','08','09','10','11','12');
		var date = ((now.getDate() < 10) ? "0" : "") + now.getDate();
		return now.getFullYear() + months[now.getMonth()] + date; 
	},

	/**
	 * 오늘날짜와 입력한 날짜 기간 : days, hours, minutes, seconds 반환
	 */	
	getPeriodDate : function( date , gunbunValue) {
		date = date.replace(/[\.-]/g, "");
		date = date.replace(/:/g, "");
		date = date.replace( /(\s*)/g, "" );
		
		var msecPerMinute = 1000 * 60;
		var msecPerHour = msecPerMinute * 60;
		var msecPerDay = msecPerHour * 24;
		
		var now = new Date(); 
		var dday = Ns.Date.getDateParse02( date ); // 원하는 날짜, 시간 정확하게 초단위까지 기입.
		var interval = dday.getTime() - now.getTime();
		
		var days = interval / msecPerDay; 
		var daysRound = Math.floor(days); 
		var hours = interval / msecPerHour - (24 * daysRound); 
		var hoursRound = Math.floor(hours); 
		var minutes = interval / msecPerMinute - (24 * 60 * daysRound) - (60 * hoursRound); 
		var minutesRound = Math.floor(minutes); 
		var seconds = interval / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound); 
		var secondsRound = Math.round(seconds);
		
		daysRound = parseInt(daysRound, 10) < 10 ? "0" + daysRound : daysRound;
		hoursRound = parseInt(hoursRound, 10) < 10 ? "0" + hoursRound : hoursRound;
		minutesRound = parseInt(minutesRound, 10) < 10 ? "0" + minutesRound : minutesRound;
		secondsRound = parseInt(secondsRound, 10) < 10 ? "0" + secondsRound : secondsRound;
		
		switch (gunbunValue) {
			case "days" 		: return daysRound; break;
			case "hours" 		: return hoursRound; break;
			case "minutes" 		: return minutesRound; break;
			case "seconds" 		: return secondsRound; break;
			case "json" 		: return { day : daysRound, hour:hoursRound, minute:minutesRound, second:secondsRound }; break;
			default: break;
		}
	}
};
