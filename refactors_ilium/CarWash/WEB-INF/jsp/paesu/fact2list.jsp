<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript">
	var isMobile = true;
	var newWateLogs;
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
	
	function moveinput_func(report_date) {
		var cname = $('#selectstation').val();
		navigate('/paesu/insert', {"report_date":report_date, "cname":cname});
	}
		
	function excel_func(report_date) {
		document.listFrm.action="/paesu/factexceldn.do";
		$('#report_date').val(report_date);
		document.listFrm.submit();
	}
</script>
<form id="listFrm" name="listFrm" method="post" action="">
	<input type="hidden" id="report_date" name="report_date" />
	<div id="content" class="content2">
		<div class="date_area">
			<div class="date_area1">
				<table class="datetable1">
					<tbody>
	                    <tr>
							<td>
								<select id="selectyear" name="selectyear" class="selectdate"/>
							</td>
						</tr>
					</tbody>
				</table>
				<c:if test="${permission == '2'}">
			
				<table class="datetable1">
					<tbody>
					<tr>
						<td class="tdspanchar">
       						<span id="spanchar" name="spanchar" class="spanchar">초성</span>
                    	</td>
                    	<td  class="tdselectchar">
                    		<select id="selectchar" name="selectchar" class="selectchar"/>
                    	</td>
						</tr>
					</tbody>
				</table>
				</c:if>
			</div>
			<div class="date_area2">
				<table class="datetable2">
					<tbody>
	                    <tr>
							<td>
								<select id="selectmonth" name="selectmonth" class="selectdate"/>
							</td>
						</tr>
					</tbody>
				</table>
				
				<c:if test="${permission == '2'}">
				<table class="datetable2">
					<tbody>
					<tr>
						<td class="tdspanstation">
       						<span id="spanstation" name="spanstation" class="spanstation">주유소</span>
       						<select id="selectstation" name="selectstation" class="selectstation"/>
                    	</td>
						</tr>
					</tbody>
				</table>
				</c:if>
			</div>
		</div>
		
		<div id="list_area" class="list_area">
			<table id="listtbl" class="tbsty3">
                <caption>날짜별 발생량 리스트</caption>
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
	</div>		
</form>

<script type="text/javascript">
function successCallback(wastelogs) {
	$("#listtbl tr:not(:first)").remove();
	
	// 년, 월로 검색한 모든 결과 값.
	newWateLogs = wastelogs;
	
	// 오늘날짜의 년, 월과 검색날짜의 년, 월을 모두 월로 바꿔서 검색의 월과 오늘 날짜의 월을 비교
	// 오늘날짜의 년, 월을 모두 월로 변환
	var today = new Date();
	var todayDate = format(today, 'yyyy-MM-dd');
	var todayYear = Number(todayDate.substring(0, 4));
	var todayMonth = Number(todayDate.substring(5, 7));
	var todayDay = Number(todayDate.substring(8, 10));
	var todayVal = todayYear * 12 + todayMonth;
	
	// 검색날짜의 년, 월을 모두 월로 변환
	var selectYear = Number($('#selectyear').val());
	var selectMonth = Number($('#selectmonth').val());
	var selectVal = selectYear * 12 + selectMonth;
	
	// 검색날짜의 달이 오늘날짜의 달보다 작으면 1일부터 월의 마지막 날까지 모두 리스트로 만들도록 한다.
	if (selectVal < todayVal) {
		var today = new Date();
		var lastDayOfMonth = new Date(selectYear, selectMonth, 0);
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
				lsttoday_genwaste[dayloop-1] = newWateLogs[i].today_genwaste;
				lstuse_genwaste[dayloop-1] = newWateLogs[i].use_genwaste;
				
				report_date = "<td onclick='moveinput_func(\"" + newWateLogs[i].report_date + "\"); return false;'>" + newWateLogs[i].report_date.substring(5, 10) + "</td>";
				today_genwaste = "<td onclick='moveinput_func(\"" + newWateLogs[i].report_date + "\"); return false;' style='text-align:left;padding-left:10px;'>";
				today_genwaste = today_genwaste + newWateLogs[i].today_genwaste + "</td>";
				use_genwaste = "<td onclick='moveinput_func(\"" + newWateLogs[i].report_date + "\"); return false;' style='text-align:left;padding-left:10px;'>";
				use_genwaste = use_genwaste + newWateLogs[i].use_genwaste  + "</td>";
				status_list = "<td onclick='moveinput_func(\"" + newWateLogs[i].report_date + "\"); return false;'>" + "입력완료" + "</td>"
				if (isMobile == false) {
					excel = "<td onclick='excel_func(" + "\"" + newWateLogs[i].report_date + "\")'><span class=\"btn_set sm_smt\">" + "다운로드" + "</span></td>";
					row = "<tr>" + report_date + today_genwaste + use_genwaste + status_list + excel + "</tr>";
				}
				else {
					row = "<tr>" + report_date + today_genwaste + use_genwaste + status_list + "</tr>";
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
				fullDate =  $('#selectyear').val() + "-" +$('#selectmonth').val() + "-" + strDay;
				report_date = "<td onclick='moveinput_func(\"" + fullDate + "\"); return false;'>" + monthDate + "</td>";
				today_genwaste = "<td onclick='moveinput_func(\"" + fullDate + "\"); return false;' style='text-align:left;padding-left:10px;'>";
				today_genwaste = today_genwaste + "</td>";
				use_genwaste = "<td onclick='moveinput_func(\"" + fullDate + "\"); return false;' style='text-align:left;padding-left:10px;'>";
				use_genwaste = use_genwaste + "</td>";
				status_list = "<td onclick='moveinput_func(\"" + fullDate + "\"); return false;'>" + "입력필요" + "</td>"
				if (isMobile == false) {
					excel = "<td></td>";
					row = "<tr onclick='moveinput_func(\"" + fullDate + "\"); return false;'>" + report_date + today_genwaste + use_genwaste + status_list + excel + "</tr>";
				}
				else {
					row = "<tr onclick='moveinput_func(\"" + fullDate + "\"); return false;'>" + report_date + today_genwaste + use_genwaste + status_list + "</tr>";
				}
				$('#listtbl > tbody:last').append(row);
			}
		}
		
	}
	else if (selectVal == todayVal) {
		// 1~마지막날까지 입력할 데이터를 저장할 곳을 배열로 생성한다.
		lsttoday_waste = new Array(todayDay);
		lstuse_waste = new Array(todayDay);
		
		// 1일부터 마지막날까지 루프
		for (dayloop = 1; dayloop <= todayDay; dayloop++) {
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
				lsttoday_waste[dayloop-1] = newWateLogs[i].today_genwaste;
				lstuse_waste[dayloop-1] = newWateLogs[i].use_genwaste;
				
				report_date = "<td onclick='moveinput_func(\"" + newWateLogs[i].report_date + "\"); return false;'>" + newWateLogs[i].report_date.substring(5, 10) + "</td>";
				today_genwaste = "<td onclick='moveinput_func(\"" + newWateLogs[i].report_date + "\"); return false;' style='text-align:left;padding-left:10px;'>";
				today_genwaste = today_genwaste + newWateLogs[i].today_genwaste + "</td>";
				use_genwaste = "<td onclick='moveinput_func(\"" + newWateLogs[i].report_date + "\"); return false;' style='text-align:left;padding-left:10px;'>";
				use_genwaste = use_genwaste + newWateLogs[i].use_genwaste  + "</td>";
				status_list = "<td onclick='moveinput_func(\"" + newWateLogs[i].report_date + "\"); return false;'>" + "입력완료" + "</td>"
				if (isMobile == false) {
					excel = "<td onclick='excel_func(" + "\"" + newWateLogs[i].report_date + "\")'><span class=\"btn_set sm_smt\">" + "다운로드" + "</span></td>";
					row = "<tr>" + report_date + today_genwaste + use_genwaste + status_list + excel + "</tr>";
				}
				else {
					row = "<tr>" + report_date + today_genwaste + use_genwaste + status_list + "</tr>";
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
				fullDate =  $('#selectyear').val() + "-" +$('#selectmonth').val() + "-" + strDay;
				report_date = "<td onclick='moveinput_func(\"" + fullDate + "\"); return false;'>" + monthDate + "</td>";
				today_genwaste = "<td onclick='moveinput_func(\"" + fullDate + "\"); return false;' style='text-align:left;padding-left:10px;'>";
				today_genwaste = today_genwaste + "</td>";
				use_genwaste = "<td onclick='moveinput_func(\"" + fullDate + "\"); return false;' style='text-align:left;padding-left:10px;'>";
				use_genwaste = use_genwaste + "</td>";
				status_list = "<td onclick='moveinput_func(\"" + fullDate + "\"); return false;'>" + "입력필요" + "</td>"
				if (isMobile == false) {
					excel = "<td onclick='moveinput_func(\"" + fullDate + "\"); return false;'></td>";
					row = "<tr>" + report_date + today_genwaste + use_genwaste + status_list + excel + "</tr>";
				}
				else {
					row = "<tr>" + report_date + today_genwaste + use_genwaste + status_list + "</tr>";
				}
				$('#listtbl > tbody:last').append(row);
			}
		}
	}
}

function successStationCallback(stationList) {
	$("#selectstation").empty();
	for (i = 0; i < stationList.length; i++) {          
            var option = $("<option value='" + stationList[i].cname + "'>"+stationList[i].cname+"</option>");
            $('#selectstation').append(option);
	}

	if (stationList.length > 0) {
		$('#selectstation').val(stationList[0].cname);
	}
	
	searchDate();
	
}

	function searchDate() {
		strUrl = "/paesu/searchFactList";
		var tempObject = new Object();
		dateval = $('#selectyear').val() + "-" + $('#selectmonth').val();
		tempObject.schmonth = dateval;
		tempObject.cname = "";
		if ($('#selectstation').val() != null) {
			tempObject.cname = $('#selectstation').val();
		}
		
		util_ajaxPage(strUrl, tempObject, successCallback);
	}
	
	function searchFactStation()
	{
		strUrl = "/paesu/searchFactStation";
		var tempObject = new Object();
		charval = $('#selectchar').val();
		tempObject.schchar = charval;
		util_ajaxPage(strUrl, tempObject, successStationCallback);
		
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
			trtitle = "<th>폐수발생량</th>";
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
			trtitle = "<th>폐수발생량</th>";
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
		
		var selectcharData = ["전체", "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
		for (i = 0; i < selectcharData.length; i++) {
			var option = $("<option value='" + selectcharData[i] + "'>"+selectcharData[i]+"</option>");
            $('#selectchar').append(option);
		}
		searchFactStation();
		
		$('#selectyear').change(function(){ 
			searchDate();			
	    });
		$('#selectmonth').change(function(){ 
			searchDate();			
	    });
		$('#selectchar').change(function(){ 
			searchFactStation();
	    });
		$('#selectstation').change(function(){ 
			searchDate();			
	    });
		
		
		
		window.setTimeout(function() {
			searchDate();
		}, 100);
	});
</script>
 
		
