
<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
		
<script type="text/javascript">
	$(document).ready(function(){
		strUrl = "/paesu/selectData";
		var tempObject = new Object();
		var cname = '${cname}';
		var empname = '';
		var approval = -1;
		var keep_mount = 0;
		var genuse_val = 0;
		var runpossible = false;
    	tempObject.report_date = $('#datepicker').val();
    	tempObject.cname = cname;
		util_ajaxPage(strUrl, tempObject, successCallback);
	});
	
	function successCallback(data) {
		empname = data.name;
		approval = data.approval;
		if (isNumber(data.pre_keep_mount) == false) {
			alert("전일 날짜로 이동하셔서 입력해 주세요");
			runpossible = false;
			$("#pre_waterworks").val("0");
			$("#today_waterworks").val("");
			$("#use_waterworks").val("");
			$("#pre_genwaste").val("0");
			$("#today_genwaste").val("");
			$("#use_genwaste").val("");
			$('#keep_mount').val("0");
			$('#subtitle1').val("");
			$('#ml1').val("");
			$('#subtitle2').val("");
			$('#ml2').val("");
			$('#subtitle3').val("");
			$('#ml3').val("");
			$('#subtitle4').val("");
			$('#ml4').val("");
			$('#instead_mount').val("");
			$('#instead_number').val("");
			$('#instead_name').val("");
			$('#keep_mount').val("");
			$('#etc').val("");
			return;
		}
		runpossible = true;
		
		if (!(data.staff_sig == "empty" || data.staff_sig == undefined) && data.staff_sig.length > 0) {
			$('#tdemployee').empty();
			$('#tdemployee').append(data.staff_sig);
			$('#staff_sig').val(data.staff_sig);
			
			
		}
		if (data.staff_sig == "empty" || data.staff_sig == undefined || data.staff_sig.length == 0) {
			$('#tdemployee').empty();
			$('#tdemployee').append("<input type=\"button\" id=\"employee\" name=\"employee\" class=\"employee\" value=\"서명\"  onclick=\"staffSig();\"/>");
			$('#staff_sig').val("");
		}
		
		if (!(data.owner_sig == "empty" || data.owner_sig == undefined) && data.owner_sig.length > 0) {
			$('#tdowner').empty();
			$('#tdowner').append(data.owner_sig);
			$('#owner_sig').val(data.owner_sig);
			
		}
		if (data.owner_sig == "empty" || data.owner_sig == undefined || data.owner_sig.length == 0) {
			$('#tdowner').empty();
			$('#tdowner').append("<input type=\"button\" id=\"ceo\" name=\"ceo\" class=\"ceo\" value=\"서명\"  onclick=\"ownerSig();\"/>");
			$('#owner_sig').val("");
		}
		
		if (data.pre_keep_mount == "-1") {
			$('#keep_mount').val("0");
			keep_mount = 0;
		}
		else {
			$('#keep_mount').val(data.pre_keep_mount);
			keep_mount = Number(data.pre_keep_mount);
		}
		
		if (data.isStart == "0") {
			isStart = 0;
		}
		else if (data.isStart == "1") {
			isStart = 1;
		}
		else {
			isStart = 2;
		}
				
		if (isStart == 1) {
			$('#starttime').val(data.starttime);
			$('#endtime').val(data.endtime);
			$('#pre_waterworks').val(data.pre_waterworks);
			$('#today_waterworks').val(data.today_waterworks);
			$('#use_waterworks').val(data.use_waterworks);
			$('#pre_genwaste').val(data.pre_genwaste);
			$('#today_genwaste').val(data.today_genwaste);
			$('#use_genwaste').val(data.use_genwaste);
			genuse_val = Number(data.use_genwaste);
			$('#keep_mount').val(data.pre_keep_mount);
			$('#subtitle1').val("");
			$('#ml1').val("");
			$('#subtitle2').val("");
			$('#ml2').val("");
			$('#subtitle3').val("");
			$('#ml3').val("");
			$('#subtitle4').val("");
			$('#ml4').val("");
			$('#instead_mount').val("");
			$('#instead_number').val("");
			$('#instead_name').val("");
			$('#keep_mount').val("");
			$('#etc').val("");
			
			$("input:checkbox[id='chkholiday']").prop("checked", false); 
			
		}
		else if (isStart == 2) {
			$('#starttime').val(data.starttime);
			$('#endtime').val(data.endtime);
			$('#pre_waterworks').val(data.pre_waterworks);
			$('#today_waterworks').val(data.today_waterworks);
			$('#use_waterworks').val(data.use_waterworks);
			$('#pre_genwaste').val(data.pre_genwaste);
			$('#today_genwaste').val(data.today_genwaste);
			$('#use_genwaste').val(data.use_genwaste);
			genuse_val = Number(data.use_genwaste);
			$('#subtitle1').val(data.subtitle1);
			$('#ml1').val(data.ml1);
			$('#subtitle2').val(data.subtitle2);
			$('#ml2').val(data.ml2);
			$('#subtitle3').val(data.subtitle3);
			$('#ml3').val(data.ml3);
			$('#subtitle4').val(data.subtitle4);
			$('#ml4').val(data.ml4);
			$('#instead_mount').val(data.instead_mount);
			$('#instead_number').val(data.instead_number);
			$('#instead_name').val(data.instead_name);
			$('#keep_mount').val(data.keep_mount);
			$('#etc').val(data.etc);
		}
		else {
			$("#pre_waterworks").val("0");
			$("#today_waterworks").val("");
			$("#use_waterworks").val("");
			$("#pre_genwaste").val("0");
			$("#today_genwaste").val("");
			$("#use_genwaste").val("");
			genuse_val = 0;
		}
	}
	
	function isNumber(s) {
	  s += ''; // 문자열로 변환
	  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
	  if (s == '' || isNaN(s)) return false;
	  return true;
	}
	
	function report_date_func() {
		strUrl = "/paesu/selectData";
		var tempObject = new Object();
    	tempObject.report_date = $('#datepicker').val();
		util_ajaxPage(strUrl, tempObject, successCallback);
	}
	
	function today_waterworks_func(thisObj) {
		if (isNumber($("#pre_waterworks").val()) == false) {
			return;
		}
		if (isNumber($("#today_waterworks").val()) == false) {
			return;
		}
		use_val = Number($("#today_waterworks").val()) - Number($("#pre_waterworks").val());
		use_val = Math.round(use_val * 10) / 10;
		$("#use_waterworks").val(use_val.toString());
	}
	
	function today_genwaste_func(thisObj) {
		if (isNumber($("#pre_genwaste").val()) == false) {
			return;
		}
		if (isNumber($("#today_genwaste").val()) == false) {
			return;
		}
		genuse_val = Number($("#today_genwaste").val()) - Number($("#pre_genwaste").val());
		genuse_val = Math.round(genuse_val * 10) / 10;
		$("#use_genwaste").val(genuse_val.toString());
		
		instead_mount = 0;
		if (isNumber($("#instead_mount").val()) == true) {
			instead_mount = Number($("#instead_mount").val());
		}
		
		var values = 0;
		values = keep_mount + genuse_val - instead_mount;
		$("#keep_mount").val(values.toString());
	}
	
	function instead_mount_func(thisObj) {		
		instead_mount = 0;
		if (isNumber($("#instead_mount").val()) == true) {
			instead_mount = Number($("#instead_mount").val());
		}
		
		var values = 0;
		values = keep_mount + genuse_val - instead_mount;
		$("#keep_mount").val(values.toString());
		
	}
	
	function staffSig() {
		if (approval == 3) {
			$('#tdemployee').empty();
			$('#tdemployee').append(empname);
		}
		else {
			alert("서명을 할 권한이 없습니다.")
		}
	}
	
	function ownerSig() {	
		if (approval == 4) {
			if ($('#tdemployee').text() == '' || $('#tdemployee').text() == 'empty' || $('#tdemployee').text() == 'undefined') {
				alert("환경기술인 서명을 먼저 완료해 주세요.")
				return;
			}
			$('#tdowner').empty();
			$('#tdowner').append(empname);
		}
		else {
			alert("서명을 할 권한이 없습니다.")
		}
		
	}
	
	function insertSubmit() {
		var formObj = document.forms['mainForm'] || document.mainForm;
		
		var prevDate = new Date($("#datepicker").val());
		prevDate.setDate(prevDate.getDate()-1); //하루 전
		
		if (runpossible == false) {
			alert("전일 날짜로 이동하셔서 입력해 주세요");
			return;
		}
		
		
		if (approval == 3) {
			if ($('#tdemployee').text() != empname) {
				alert("서명 버튼을 눌러주세요.");
				return;
			}
			else {
				$('#staff_sig').val(empname);
			}
		}
		if (approval == 4) {
			if ($('#tdowner').text() != empname) {
				alert("서명 버튼을 눌러주세요.");
				return;
			}
			else {
				$('#owner_sig').val(empname);
			}
		}

		
		if ($("#chkholiday").is(":checked") == false) {
		
			if ($("#today_waterworks").val().length == 0) {
				alert("용수량 금일지침을 입력해 주세요.")
				$("#today_waterworks").focus();
				return;
			}
		}
		
		httpSend('insertSubmit', formObj, function(data) {
			if (data.success == true) {
				// success
				alert('등록되었습니다.');
				navigate("/paesu/list.do");
				//navigate('list', {"code_grp":data.codes.code_grp});
			}
		});
	}
</script>	
	
<form id="mainForm" name="mainForm" method="post">	
	<div id="content" class="content2">		
		<div class="title">
		 <h3 class="bu4"><strong></strong> 연월일</h3>
		 <a href="javascript:;" class="btnType submit" onclick="insertSubmit();">저장</a>
		</div>      		
		<div class="boxLY_area">
			<input type="hidden" id="staff_sig" name="staff_sig" value="empty"/>
			<input type="hidden" id="owner_sig" name="owner_sig" value="empty"/>
            <table class="tbsty">
                <caption>날짜</caption>
                    <colgroup>
                        <col style="width:60%">
                        <col style="width:20%">
                        <col style="width:20%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th>일자</th>
                    </tr>
                    <tr>
                        <td><input type="text" id="datepicker" name="report_date" readonly onchange="report_date_func($(this)); return false;"/><span class="spnholiday">휴일</span><input type="checkbox" id="chkholiday" name="chkholiday" class="chkholiday" onchange="chkholiday_func($(this)); return false;"/></td>
                    </tr>
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="title">
		 <h3 class="bu4"><strong></strong> 결재</h3>
		</div>   
		
        <div class="boxLY_area">
            <table class="tbapprval">
                <caption></caption>
                    <colgroup>
                        <col style="width:50%">
                        <col style="width:50%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th style="text-align: center;color:#bab8b1;">대표자</th>
                        <th style="text-align: center;color:#bab8b1;">환경기술인</th>
                    </tr>
					<tr>
                        <td id="tdowner" name="tdowner" class="tdowner">
                        	<p id="p_ceo" name="p_ceo"/>
                        	<input type="button" id="ceo" name="ceo" class="ceo" value="서명"  onclick="ownerSig();"/>
                        </td>
                    	<td id="tdemployee" name="tdemployee" class="tdemployee">
                    		<p id="p_employee" name="p_employee"/>
                    		<input type="button" id="employee" name="employee" class="employee" value="서명"  onclick="staffSig();"/>
                    	</td>
                    </tr> 
                </tbody>
            </table>
            
            <table class="tbsty">
                <caption></caption>
                    <colgroup>
                        <col style="width:25%">
                        <col style="width:20%">
                        <col style="width:55%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th colspan="3" style="text-align: center; vertical-align: middle;">용수사용량</th>
                    </tr>    
                    <tr>
                        <th style="text-align: center;color:#bab8b1;">전일</th>
                        <th style="text-align: center;color:#bab8b1;">사용량</th>
                        <th style="text-align: center;">금일</th>
                    </tr>
					<tr>
                        <td><input type="number" id="pre_waterworks" name="pre_waterworks" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                        <td><input type="number" id="use_waterworks" name="use_waterworks" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                        <td><input type="number" id="today_waterworks" name="today_waterworks" onchange="today_waterworks_func($(this)); return false;"/></td>
                    </tr>
            </table>
            <table class="tbsty">
                <caption></caption>
                    <colgroup>
                        <col style="width:25%">
                        <col style="width:20%">
                        <col style="width:55%">
                    </colgroup>
                <tbody>                     
                    <tr>
                        <th colspan="3" style="text-align: center; vertical-align: middle;">폐수발생량(㎥)
                        </th>
                    </tr>
                    <tr>
                        <th style="text-align: center;color:#bab8b1;">전일</th>
                        <th style="text-align: center;color:#bab8b1;">발생량</th>
                        <th style="text-align: center;">금일</th>
                    </tr>
					<tr>
                        <td><input type="number" id="pre_genwaste" name="pre_genwaste" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                        <td><input type="number" id="use_genwaste" name="use_genwaste" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                        <td><input type="number" id="today_genwaste" name="today_genwaste" onchange="today_genwaste_func($(this)); return false;"/></td>
                    </tr>
			</table>
		</div>
					
        <div class="boxLY_area">
            <table class="tbsty">
                <caption></caption>
                    <colgroup>
                        <col style="width:50%">
                        <col style="width:50%">
                    </colgroup>
                <tbody>           
                    <tr>
                        <th>가동 시작시간</th>
                        <th>가동 종료시간</th>
                    </tr>
                    <tr>
                        <td><input type="text" id="starttime" name="starttime" class="timepicker" value="09:00" placeholder="시간선택" required size="8" maxlength="5"/></td>
                        <td><input type="text" id="endtime" name="endtime" class="timepicker" value="18:00" placeholder="시간선택" required size="8" maxlength="5"/></td>
                    </tr>
            	</tbody>
            </table>
        </div>
                
        <div class="title">
		 <h3 class="bu3"><strong></strong> 원료 사용량</h3>
		</div>
		
        <div class="boxLY_area">
            <table class="tbsty">
                <caption></caption>
                    <colgroup>
                        <col style="width:55%">
                        <col style="width:45%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th><input type="text" id="subtitle1" name="subtitle1" class="subtitle1"/></th>
                        <td><input type="text" id="ml1" name="ml1"/></td>
                    </tr>
                    <tr>
                        <th><input type="text" id="subtitle2" name="subtitle2" class="subtitle2"/></th>
                        <td><input type="text" id="ml2" name="ml2"/></td>
                    </tr>
                    <tr>
                        <th><input type="text" id="subtitle3" name="subtitle3" class="subtitle3"/></th>
                        <td><input type="text" id="ml3" name="ml3"/></td>
                    </tr>
                    <tr>
                        <th><input type="text" id="subtitle4" name="subtitle4" class="subtitle4"/></th>
                        <td><input type="text" id="ml4" name="ml4"/></td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
           
        <div class="title">
         <h3 class="bu3"> 폐수위탁처리</h3>
		</div>
		
        <div id="divmed" class="boxLY_area">
            <table class="tbsty2">
                <caption></caption>
                    <colgroup>
                        <col style="width:20%">
                        <col style="width:40%">
                        <col style="width:40%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th style="text-align: center; vertical-align: middle;">위탁량(L)</th>
                        <th style="text-align: center; vertical-align: middle;">위탁ㆍ수탁 확인서<br>일련번호</th>
                        <th style="text-align: center; vertical-align: middle;">처리업소명</th>
                    </tr>
					<tr>
                        <td><input type="number" id="instead_mount" name="instead_mount"  onchange="instead_mount_func($(this)); return false;"/></td>
                        <td><input type="text" id="instead_number" name="instead_number"/></td>
                        <td><input type="text" id="instead_name" name="instead_name"></td>
                    </tr>

            	</tbody>
            </table>
            
            <table class="tbsty2">
                <caption></caption>
                    <colgroup>
                        <col style="width:20%">
                        <col style="width:80%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th style="text-align: center; vertical-align: middle;">보관폐수량(L)</th>
                        <th style="text-align: center; vertical-align: middle;">기타중요사항</th>
                    </tr>
					<tr>
                        <td><input type="text" id="keep_mount" name="keep_mount"/></td>
                        <td><input type="text" id="etc" name="etc"/></td>
                    </tr>
            	</tbody>
            </table>
        </div>
                 
     </div>
     
     <div class="last">
     	<a href="javascript:;" class="btnType submit" onclick="insertSubmit();">저장</a>
     </div>

</form>

<script type="text/javascript">
	
	$("#datepicker").datepicker({
		showOn: 'both'
		,buttonImage: '/resources/images/ilium/ico_cal.png'
		,dateFormat: 'yy-mm-dd'
		,changeYear: 'true'
		,changeMonth: 'true'
		,buttonImageOnly: 'true'
		,showOn: "both"
		,yearRange: "1900:2050"
	});
	//$(".ui-datepicker-trigger").css("margin-bottom","-2px");
	
	if ("${report_date}".length > 0) {
		$('#datepicker').datepicker('setDate', '${report_date}');
	}
	else {
		$('#datepicker').datepicker('setDate', 'today');
	}
	
	$(".timepicker").timepicker({
		step: 60,
		timeFormat: "H:i",    //시간:분 으로표시
		disableTouchKeyboard: 'true',
		fontsize: 24

	});
	$('.timepicker').on('click', function(e) {
		e.preventDefault();
		$(this).attr("autocomplete", "off");  
		});
	
</script>
	