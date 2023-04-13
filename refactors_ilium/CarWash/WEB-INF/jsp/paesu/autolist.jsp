<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript">
	var isMobile = true;
	var newWateLogs;
	var lsttoday_waste;
	var lstuse_waste;
	var lastDay;
	format = function date2str(x, y) {
	    var z = {
	        M: x.getMonth() + 1,
	        d: x.getDate(),
	        h: x.getHours(),
	        m: x.getMinutes(),
	        s: x.getSeconds()
	    };
	    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
	        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
	    });
	
	    return y.replace(/(y+)/g, function(v) {
	        return x.getFullYear().toString().slice(-v.length)
	    });
	}
	
	function insertSubmit() {
		var formObj = document.forms['listFrm'] || document.listFrm;
		
		var arrDate = [];
		var arrtoday = [];
		var arruse = [];
		
		for (i = 0; i < lastDay; i++) {
			
			strDay = "";
			if (i+1 < 10) {
				strDay = "0" + String(i+1);
			}
			else {
				strDay = String(i+1);
			}
			strDate = $('#selectyear').val() + "-" + $('#selectmonth').val() + "-" + strDay;
			
			todayName = "#edt_today" + String(i);
			useName = "#edt_use" + String(i);

			arrDate.push(strDate);
			arrtoday.push($(todayName).val());
			arruse.push($(useName).val());
		}
		
		$('#lstDate').val(arrDate.join(':'));
		$('#lsttoday').val(arrtoday.join(':'));
		$('#lstuse').val(arruse.join(':'));
			
		httpSend('lstObjectSubmit', formObj, function(data) {
			if (data.success == true) {
				// success
				alert('등록되었습니다.');
				navigate("/paesu/autolist.do");
				//navigate('list', {"code_grp":data.codes.code_grp});
			}
		});
	}
	    
	function isExistDate(day, data) {
		for (k = 0; k < data.length; k++) {
			arrlastdate = data[k].report_date.split("-");
			date = Number(arrlastdate[2]);
			if (day == date) {
				return k;
			}
		}
		return -1;
	}
	
	function moveinput_func(index) {
		navigate('/paesu/insert', {"report_date":newWateLogs[index].report_date});
	}
	
	
	function excel_func(report_date) {
		document.listFrm.action="/paesu/exceldn.do";
		$('#report_date').val(report_date);
		document.listFrm.submit();
	}
</script>
<form id="listFrm" name="listFrm" method="post" action="">
	<input type="hidden" id="lstDate" name="lstDate" />
	<input type="hidden" id="lsttoday" name="lsttoday" />
	<input type="hidden" id="lstuse" name="lstuse" />
	<div id="content" class="content2">
		<div class="date_area">
			<table class="datetable2">
				<colgroup>
	                <col style="width:50%">
	                <col style="width:50%">
	            </colgroup>
				<tbody>
                    <tr>
						<td>
							<select id="selectyear" name="selectyear" class="selectdate"/>
						</td>
						<td>
							<select id="selectmonth" name="selectmonth" class="selectdate"/>
						</td>
                    </tr>
				</tbody>
			</table>
			<a href="javascript:;" class="btnType submit" onclick="insertSubmit();">저장</a>
		</div>
		<div id="list_area" class="list_area">
			<table id="listtbl" class="tbsty3">
                <caption>날짜별 배출량 리스트</caption>
                    <colgroup id="titlegroup" name="titlegroup">

                    </colgroup>
                <tbody>
                    <tr id="trtitle" name="trtitle">
                        
                    </tr>
                    <tr>
                    
                    </tr>
                </tbody>
            </table>
		</div>
		<div class="lastlist">
     		<a href="javascript:;" class="btnType submit" onclick="insertSubmit();">저장</a>
     	</div>
	</div>		
</form>

<script type="text/javascript">
	function today_diswaste_func(thisObj, index) {

		smalledtodayName = "#edt_today" + String(index-1);
		use_wasteName = "#edt_use" + String(index);
		
		if ($(smalledtodayName).val() == 0) {
			return;
		}

		today_use_waste = Number(thisObj.val()) - Number($(smalledtodayName).val());
		$(use_wasteName).val(String(today_use_waste));
	
	}
	
	function use_diswaste_func(thisObj, index) {
		smalledtodayName = "#edt_today" + String(index-1);
		todayName = "#edt_today" + String(index);
		
		if ($(smalledtodayName).val() == 0) {
			return;
		}
		
		today_use_waste = Number(thisObj.val()) + Number($(smalledtodayName).val());
		$(todayName).val(String(today_use_waste));
		
	}

	function successCallback(wastelogs) {
		$("#listtbl tr:not(:first)").remove();
		
		datacnt = wastelogs.length;
		if (datacnt == 0) {
			return;
		}
		
		// 년, 월로 검색한 모든 결과 값.
		newWateLogs = wastelogs;
		
		// 오늘날짜의 년, 월과 검색날짜의 년, 월을 모두 월로 바꿔서 검색의 월과 오늘 날짜의 월을 비교
		// 오늘날짜의 년, 월을 모두 월로 변환
		var today = new Date();
		var todayDate = format(today, 'yyyy-MM-dd');
		var todayYear = Number(todayDate.substring(0, 4));
		var todayMonth = Number(todayDate.substring(5, 7));
		var todayVal = todayYear * 12 + todayMonth;
		
		// 검색날짜의 년, 월을 모두 월로 변환
		var selectYear = Number($('#selectyear').val());
		var selectMonth = Number($('#selectmonth').val());
		var selectVal = selectYear * 12 + selectMonth;
		
		// 검색날짜의 달이 오늘날짜의 달보다 작으면 1일부터 월의 마지막 날까지 모두 리스트로 만들도록 한다.
		if (selectVal < todayVal) {
			var today = new Date();
			var lastDayOfMonth = new Date(selectYear, selectMonth-1, 0);
			lastDay = Number(lastDayOfMonth.getDate());
			
			// 1~마지막날까지 입력할 데이터를 저장할 곳을 배열로 생성한다.
			lsttoday_waste = new Array(lastDay);
			lstuse_waste = new Array(lastDay);
			
			// 1일부터 마지막날까지 루프
			for (dayloop = 1; dayloop <= lastDay; dayloop++) {
				isSameDay = false;
				
				for (i = 0; i < newWateLogs.length; i++) {
					day = Number(newWateLogs[i].report_date.substring(8, 10));
					
					// 검색 결과의 일 중에 loop의 일이 같은 것이 있으면 isSameDay = true로 하고 loop를 빠져나온다.
					if (dayloop == day) {
						isSameDay = true;
						break;
					}
				}
				
				if (isSameDay == true) {
					lsttoday_waste[dayloop-1] = newWateLogs[i].today_diswaste;
					lstuse_waste[dayloop-1] = newWateLogs[i].use_diswaste;
					
					report_date = "<td onclick='moveinput_func(" + i + "); return false;'>" + newWateLogs[i].report_date.substring(5, 10) + "</td>";
					today_diswaste = "<td style='text-align:left;padding-left:10px;'>";
					today_diswaste = today_diswaste + "<input type=\"text\" id=\"edt_today" + dayloop + "\" onchange=\"today_diswaste_func($(this), " + dayloop + "); return false;\"";
					today_diswaste = today_diswaste + "value=\"" +  newWateLogs[i].today_diswaste + "\"\/></td>";
					use_diswaste = "<td style='text-align:left;padding-left:10px;'>";
					use_diswaste = use_diswaste + "<input type=\"text\" id=\"edt_use" + dayloop + "\" onchange=\"use_diswaste_func($(this), " + dayloop + "); return false;\"";
					use_diswaste = use_diswaste + "value=\"" +  newWateLogs[i].use_diswaste + "\"\/></td>";
					status = "<td onclick='moveinput_func(" + i + "); return false;'>" + "입력완료" + "</td>"
					if (isMobile == false) {
						excel = "<td onclick='excel_func(" + "\"" + newWateLogs[i].report_date + "\")'><span class=\"btn_set sm_smt\">" + "다운로드" + "</span></td>";
						row = "<tr>" + report_date + today_diswaste + use_diswaste + status + excel + "</tr>";
					}
					else {
						row = "<tr>" + report_date + today_diswaste + use_diswaste + status + "</tr>";
					}
					$('#listtbl > tbody:last').append(row);
				}
				else {
					strDay = "";
					if (dayloop < 10) {
						strDay = "0" + String(dayloop);
					}
					else {
						strDay = String(dayloop);
					}
					monthDate = $('#selectmonth').val() + "-" + strDay;
					report_date = "<td>" + monthDate + "</td>";
					today_diswaste = "<td style='text-align:left;padding-left:10px;'>";
					today_diswaste = today_diswaste + "<input type=\"text\" id=\"edt_today" + dayloop + "\" onchange=\"today_diswaste_func($(this), " + dayloop + "); return false;\"";
					today_diswaste = today_diswaste + "value=\"\"\/></td>";
					use_diswaste = "<td style='text-align:left;padding-left:10px;'>";
					use_diswaste = use_diswaste + "<input type=\"text\" id=\"edt_use" + dayloop + "\" onchange=\"use_diswaste_func($(this), " + dayloop + "); return false;\"";
					use_diswaste = use_diswaste + "value=\"\"\/></td>";
					status = "<td onclick='moveinput_func(" + i + "); return false;'>" + "입력필요" + "</td>"
					if (isMobile == false) {
						excel = "<td></td>";
						row = "<tr>" + report_date + today_diswaste + use_diswaste + status + excel + "</tr>";
					}
					else {
						row = "<tr>" + report_date + today_diswaste + use_diswaste + status + "</tr>";
					}
					$('#listtbl > tbody:last').append(row);
				}
			}
			
		}
	
		
		/*
		newWateLogs = new Array(lastdate);
		
		predate = 0;
		for (i = 1; i <= lastdate; i++) {
			index = isExistDate(i, wastelogs); // 일지날짜가 있으면 해당 data의 index, 없으면 -1
			if (index > -1) {
				// 날짜가 연속으로 기록되어 있으면 그대로 저장
				if (predate == 0 || predate + 1 == i) {
					lastindex = newWateLogs.length;
					newWateLogs[i-1] = wastelogs[index];
					newWateLogs[i-1].isReal = true;
				}
				// 날짜가 연속으로 기록되어 있지 않으면
				else {
					// 지금까지 저장한 것 중에 가장 마지막 값을 가져옴.
					preWasteLog = newWateLogs[predate-1];
					// 지금 날짜의 폐수 배출량
					thisDisWateAmount = Number(wastelogs[index].today_diswaste);
					// 이전 날짜의 폐수 배출량
					preDisWateAmount = Number(preWasteLog.today_diswaste);
					// 지금 날짜와 이전 날짜 차이 (5일 - 3일 = 2)
					diffdays = i - predate;
					// 지금 날짜의 폐수 배출량과 이전 날짜의 폐수 배출량 차이
					diffDisWateAmount = thisDisWateAmount - preDisWateAmount;
					// 날짜 차이 동안의 폐수 배출량 차이 평균값
					averageDiffAmount = parseInt(diffDisWateAmount / diffdays);
					//기록하지 않은 날짜의 일지를 평균 배출량 차이를 가지고 채워줌.
					for (j = predate+1; j < i; j++) {
						var tempWasteLog = new Object();
						tempWasteLog.report_date = year + "-" + month + "-" + j.toString().padStart(2, "0");
						tempWasteLog.today_diswaste = preDisWateAmount + (averageDiffAmount*(j-predate));
						tempWasteLog.isReal = false;
						newWateLogs[j-1] = tempWasteLog;
					}
					newWateLogs[i-1] = wastelogs[index];
					newWateLogs[i-1].isReal = true;
				}
				predate = i;
			}
		}
		*/
		
		/*
		for (i = 0; i < newWateLogs.length; i++) {
			report_date = "<td onclick='moveinput_func(" + i + "); return false;'>" + newWateLogs[i].report_date + "</td>";
			if (newWateLogs[i].isReal == true) {
				today_diswaste = "<td style='text-align:left;padding-left:10px;' onclick='moveinput_func(" + i + "); return false;'>" + newWateLogs[i].today_diswaste + "</td>";
			}
			else {
				today_diswaste = "<td style='text-align:left;padding-left:10px;color:red;' onclick='moveinput_func(" + i + "); return false;'>" + newWateLogs[i].today_diswaste + "(입력권고값)</td>";
			}
			if (newWateLogs[i].isReal == true) {
				status = "<td onclick='moveinput_func(" + i + "); return false;'>" + "입력완료" + "</td>"
			}
			else {
				status = "<td style='color:red;' onclick='moveinput_func(" + i + "); return false;'>" + "입력필요" + "</td>"
			}
			if (isMobile == false) {
				excel = "<td onclick='excel_func(" + "\"" + newWateLogs[i].report_date + "\")'><span class=\"btn_set sm_smt\">" + "다운로드" + "</span></td>";
				row = "<tr>" + report_date + today_diswaste + status + excel + "</tr>";
			}
			else {
				row = "<tr>" + report_date + today_diswaste + status + "</tr>";
			}
			$('#listtbl > tbody:last').append(row);
		}
		*/
	}

	function searchDate() {
		strUrl = "/paesu/searchAutoList";
		var tempObject = new Object();
		dateval = $('#selectyear').val() + "-" + $('#selectmonth').val();
		tempObject.schmonth = dateval;
		util_ajaxPage(strUrl, tempObject, successCallback);
	}

	$(document).ready(function(){
		var filter = "win16|win32|win64|mac|macintel";
		if ( navigator.platform ) {
			if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
				isMobile = true;
			} else {
				isMobile = false;
			} 
		}
		
		cols = ""
		if (isMobile == false) {
			col = "<col style='width:15%'>";
			$('#titlegroup').append(col);
			col = "<col style='width:35%'>";
			$('#titlegroup').append(col);
			col = "<col style='width:10%'>";
			$('#titlegroup').append(col);
            col = "<col style='width:20%'>";
			$('#titlegroup').append(col);
			col = "<col style='width:20%'>";
			$('#titlegroup').append(col);
			
			trtitle = "<th>날짜</th>";
			$('#trtitle').append(trtitle);
			trtitle = "<th>폐수배출량</th>";
			$('#trtitle').append(trtitle);
			trtitle = "<th>사용량</th>";
			$('#trtitle').append(trtitle);
			trtitle = "<th>상태</th>";
			$('#trtitle').append(trtitle);
			trtitle = "<th>엑셀</th>";
			$('#trtitle').append(trtitle);
		}
		else {
			col = "<col style='width:20%'>";
			$('#titlegroup').append(col);
			col = "<col style='width:30%'>";
			$('#titlegroup').append(col);
			col = "<col style='width:20%'>";
			$('#titlegroup').append(col);
            col = "<col style='width:30%'>";
			$('#titlegroup').append(col);
			
			trtitle = "<th>날짜</th>";
			$('#trtitle').append(trtitle);
			trtitle = "<th>폐수배출량</th>";
			$('#trtitle').append(trtitle);
			trtitle = "<th>사용량</th>";
			$('#trtitle').append(trtitle);
			trtitle = "<th>상태</th>";
			$('#trtitle').append(trtitle);
		}		
		
		today = new Date();   
		year = today.getFullYear().toString();
		month = (today.getMonth() + 1).toString();
		if (month.length < 2) {
			month = "0" + month;
		}
		
		for(var count = 1900; count < 2051; count++){                
            var option = $("<option value='" + count + "'>"+count+"년"+"</option>");
            $('#selectyear').append(option);
        }
		$('#selectyear').val(year);
		
		for(var count = 1; count < 13; count++){
			val = count.toString();
			if (val.length < 2) {
				val = "0" + val;
			}
            var option = $("<option value='" + val + "'>"+val+"월"+"</option>");
            $('#selectmonth').append(option);
        }
		$('#selectmonth').val(month);
		
		$('#selectyear').change(function(){ 
			searchDate();			
	    });
		$('#selectmonth').change(function(){ 
			searchDate();			
	    });
		searchDate();
	});
</script>
 
		
