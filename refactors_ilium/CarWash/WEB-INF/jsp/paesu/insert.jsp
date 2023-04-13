
<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
		
<script type="text/javascript">
	var isStart = 0; // 0 : 전전일, 1 : 전일, 2 : 금일
	var pre_compute_guidelines = 0;
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
	
	function isNumber(s) {
		  s += ''; // 문자열로 변환
		  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
		  if (s == '' || isNaN(s)) return false;
		  return true;
		}

	function chkop_func(thisObj) {
		if (thisObj.is(":checked") == true) {
			$('#divop').show();			
		}
		else {
			$('#divop').hide();
		}
	}
	function chkput_func(thisObj) {
		if (thisObj.is(":checked") == true) {
			$('#divput').show();			
		}
		else {
			$('#divput').hide();
		}
	}
	function chkprevent_func(thisObj) {
		if (thisObj.is(":checked") == true) {
			$('#divprevent').show();			
		}
		else {
			$('#divprevent').hide();
		}
	}
	function chkmed_func(thisObj) {
		if (thisObj.is(":checked") == true) {
			$('#divmed').show();			
		}
		else {
			$('#divmed').hide();
		}
	}
	function chksluge_func(thisObj) {
		if (thisObj.is(":checked") == true) {
			$('#divsluge').show();			
		}
		else {
			$('#divsluge').hide();
		}
	}
	function chkdiswastereuse_func(thisObj) {
		if (thisObj.is(":checked") == true) {
			$('#divdiswastereuse').show();			
		}
		else {
			$('#divdiswastereuse').hide();
		}
	}
	
	function chkholiday_func(thisObj) {
		if (thisObj.is(":checked") == true) {
			$("#weather").attr("disabled",true);
			$("#temperature").attr("disabled",true);
			$("#today_waterworks").attr("disabled",true);
			$("#today_underwater").attr("disabled",true);
			$("#today_diswaste").attr("disabled",true);
			$("#compute_guidelines").attr("disabled",true);
			$("#startworking_time").attr("disabled",true);
			$("#endworking_time").attr("disabled",true);
			$("#etc").attr("disabled",true);
			$("#today_genwaste").attr("disabled",true);
			$("#today_reuse").attr("disabled",true);
			$("#carwash_num").attr("disabled",true);
			$("#ml1").attr("disabled",true);
			$("#ml2").attr("disabled",true);
			$("#ml3").attr("disabled",true);
			$("#ml4").attr("disabled",true);
			$("#ml5").attr("disabled",true);
			$("#ml6").attr("disabled",true);
			$("#subtitle1").attr("disabled",true);
			$("#subtitle2").attr("disabled",true);
			$("#subtitle3").attr("disabled",true);
			$("#starttime").attr("disabled",true);
			$("#endtime").attr("disabled",true);
			$("#discharge_sttime").attr("disabled",true);
			$("#discharge_endtime").attr("disabled",true);
			$("#prevent_sttime").attr("disabled",true);
			$("#prevent_endtime").attr("disabled",true);
			$("#med_name1").attr("disabled",true);
			$("#subuse1").attr("disabled",true);
			$("#buy_mount1").attr("disabled",true);
			$("#bal_mount1").attr("disabled",true);
			$("#sub_ect1").attr("disabled",true);
			
			$("#med_name2").attr("disabled",true);
			$("#subuse2").attr("disabled",true);
			$("#buy_mount2").attr("disabled",true);
			$("#bal_mount2").attr("disabled",true);
			$("#sub_ect2").attr("disabled",true);
			
			$("#med_name3").attr("disabled",true);
			$("#subuse3").attr("disabled",true);
			$("#buy_mount3").attr("disabled",true);
			$("#bal_mount3").attr("disabled",true);
			$("#sub_ect3").attr("disabled",true);
			
			$("#med_name4").attr("disabled",true);
			$("#subuse4").attr("disabled",true);
			$("#buy_mount4").attr("disabled",true);
			$("#bal_mount4").attr("disabled",true);
			$("#sub_ect4").attr("disabled",true);
			
			$("#sluge_gen").attr("disabled",true);
			$("#sluge_use").attr("disabled",true);
			$("#sluge_keep").attr("disabled",true);
			$("#sluge_func").attr("disabled",true);
			$("#sluge_place").attr("disabled",true);
			$("#sluge_selfplace").attr("disabled",true);
			$("#instead_name").attr("disabled",true);
			$("#remarks").attr("disabled",true);
			$("#advise").attr("disabled",true);
		}
		else {
			$("#weather").attr("disabled",false);
			$("#temperature").attr("disabled",false);
			$('#today_waterworks').attr("disabled",false);
			$("#today_underwater").attr("disabled",false);
			$("#today_diswaste").attr("disabled",false);
			$("#compute_guidelines").attr("disabled",false);
			$("#startworking_time").attr("disabled",false);
			$("#endworking_time").attr("disabled",false);
			$("#etc").attr("disabled",false);
			$("#today_genwaste").attr("disabled",false);
			$("#today_reuse").attr("disabled",false);
			$("#carwash_num").attr("disabled",false);
			$("#ml1").attr("disabled",false);
			$("#ml2").attr("disabled",false);
			$("#ml3").attr("disabled",false);
			$("#ml4").attr("disabled",false);
			$("#ml5").attr("disabled",false);
			$("#ml6").attr("disabled",false);
			$("#subtitle1").attr("disabled",false);
			$("#subtitle2").attr("disabled",false);
			$("#subtitle3").attr("disabled",false);
			$("#starttime").attr("disabled",false);
			$("#endtime").attr("disabled",false);
			$("#discharge_sttime").attr("disabled",false);
			$("#discharge_endtime").attr("disabled",false);
			$("#prevent_sttime").attr("disabled",false);
			$("#prevent_endtime").attr("disabled",false);
			$("#med_name1").attr("disabled",false);
			$("#subuse1").attr("disabled",false);
			$("#buy_mount1").attr("disabled",false);
			$("#bal_mount1").attr("disabled",false);
			$("#sub_ect1").attr("disabled",false);
			
			$("#med_name2").attr("disabled",false);
			$("#subuse2").attr("disabled",false);
			$("#buy_mount2").attr("disabled",false);
			$("#bal_mount2").attr("disabled",false);
			$("#sub_ect2").attr("disabled",false);
			
			$("#med_name3").attr("disabled",false);
			$("#subuse3").attr("disabled",false);
			$("#buy_mount3").attr("disabled",false);
			$("#bal_mount3").attr("disabled",false);
			$("#sub_ect3").attr("disabled",false);
			
			$("#med_name4").attr("disabled",false);
			$("#subuse4").attr("disabled",false);
			$("#buy_mount4").attr("disabled",false);
			$("#bal_mount4").attr("disabled",false);
			$("#sub_ect4").attr("disabled",false);
			
			$("#sluge_gen").attr("disabled",false);
			$("#sluge_use").attr("disabled",false);
			$("#sluge_keep").attr("disabled",false);
			$("#sluge_func").attr("disabled",false);
			$("#sluge_place").attr("disabled",false);
			$("#sluge_selfplace").attr("disabled",false);
			$("#instead_name").attr("disabled",false);
			$("#remarks").attr("disabled",false);
			$("#advise").attr("disabled",false);
		}
	}
	
	function chk_diswaste_func(thisObj, startMethod) {
		if (thisObj.is(":checked") == false) {
			if (($("#today_waterworks").val() != null) && ($("#today_underwater").val() != null)) {
				intTodayWDiswaste =  Number($("#today_waterworks").val()) + Number($("#today_underwater").val());
				$("#today_diswaste").val(intTodayWDiswaste.toString());
				
				if (isNumber($("#pre_diswaste").val()) == false) {
					return;
				}

				use_val = Number($("#today_diswaste").val()) - Number($("#pre_diswaste").val());
				use_val = Math.round(use_val * 10) / 10;
				$("#use_diswaste").val(use_val.toString());
			}
		}
		else {
			if (startMethod > 1) {
				return
			}
			$("#today_diswaste").val("0");
		}
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
		if ((use_val < 0 || use_val > 200) && (isStart > 0)){
			alert("상수도 입력값을 다시 확인해 주세요.");
			$("#today_waterworks").focus();
			if (use_val > 200) {
				$("#use_waterworks").val(use_val.toString());
			}
			return;
		}
		$("#use_waterworks").val(use_val.toString());
		
		if ($("#chk_diswaste").is(":checked") == false) {
			if ($("#today_underwater").val() != null) {
				intTodayWDiswaste =  Number($("#today_waterworks").val()) + Number($("#today_underwater").val());
				$("#today_diswaste").val(intTodayWDiswaste.toString());
				
				use_val = Number($("#today_diswaste").val()) - Number($("#pre_diswaste").val());
				use_val = Math.round(use_val * 10) / 10;
				$("#use_diswaste").val(use_val.toString());
			}	
		}
	}
	
	function today_underwater_func(thisObj) {
		if (isNumber($("#pre_underwater").val()) == false) {
			return;
		}
		if (isNumber($("#today_underwater").val()) == false) {
			return;
		}
		use_val = Number($("#today_underwater").val()) - Number($("#pre_underwater").val());
		use_val = Math.round(use_val * 10) / 10;
		if ((use_val < 0 || use_val > 200) && (isStart > 0)){
			alert("지하수 입력값을 다시 확인해 주세요.");
			if (use_val > 200) {
				$("#use_underwater").val(use_val.toString());
			}
			$("#today_underwater").focus();
			return;
		}
		$("#use_underwater").val(use_val.toString());
		
		if ($("#chk_diswaste").is(":checked") == false) {
			if ($("#today_diswaste").val() != null) {
				intTodayWDiswaste =  Number($("#today_waterworks").val()) + Number($("#today_underwater").val());
				$("#today_diswaste").val(intTodayWDiswaste.toString());
				
				use_val = Number($("#today_diswaste").val()) - Number($("#pre_diswaste").val());
				use_val = Math.round(use_val * 10) / 10;
				$("#use_diswaste").val(use_val.toString());
			}	
		}
	}
	
	function today_genwaste_func(thisObj) {
		if (isNumber($("#pre_genwaste").val()) == false) {
			return;
		}
		if (isNumber($("#today_genwaste").val()) == false) {
			return;
		}
		$("#use_genwaste").val(use_val.toString());
	}
	
	function today_diswaste_func(thisObj) {
		if (isNumber($("#pre_diswaste").val()) == false) {
			return;
		}
		if (isNumber($("#today_diswaste").val()) == false) {
			return;
		}
		use_val = Number($("#today_diswaste").val()) - Number($("#pre_diswaste").val());
		use_val = Math.round(use_val * 10) / 10;
		if ((use_val < 0 || use_val > 200) && (isStart > 0)){
			alert("폐수배출량 입력값을 다시 확인해 주세요.");
			$("#today_diswaste").focus();
			if (use_val > 200) {
				$("#use_diswaste").val(use_val.toString());
			}
			return;
		}
		$("#use_diswaste").val(use_val.toString());
	}
	
	function today_reuse_func(thisObj) {
		if (isNumber($("#pre_reuse").val()) == false) {
			return;
		}
		if (isNumber($("#today_reuse").val()) == false) {
			return;
		}
		use_val = Number($("#today_reuse").val()) - Number($("#pre_reuse").val());
		$("#use_reuse").val(use_val.toString());
	}
	
	function compute_guidelines_func(thisObj) {
		if (isStart == 0) {
			$("#working_use").val($("#compute_guidelines").val());
		}
		else {
			compute_guidelines = Number($("#compute_guidelines").val());
			
			if (pre_compute_guidelines == undefined) {
				pre_compute_guidelines = 0;
			}
			diff_val = compute_guidelines - pre_compute_guidelines;
			
			diff_val = Math.round(diff_val * 10) / 10;
			
			$("#working_use").val(diff_val.toString());
		}
	}
	
	function carwash_num_func(thisObj) {
		carwash_num = Number($('#carwash_num').val());
		if ($('#ml1').val().length > 0) {
			value = Number($('#ml1').val());
			multival = carwash_num * value;
			$('#detergent').val((multival.toFixed(2)).toString());
		}
		
		if ($('#ml2').val().length > 0) {
			value = Number($('#ml2').val());
			multival = carwash_num * value;
			$('#wax').val((multival.toFixed(2)).toString());
		}
		
		if ($('#ml3').val().length > 0) {
			value = Number($('#ml3').val());
			multival = carwash_num * value;
			$('#pom').val((multival.toFixed(2)).toString());
		}
		
		if ($('#ml4').val().length > 0) {
			value = Number($('#ml4').val());
			multival = carwash_num * value;
			$('#extra1').val((multival.toFixed(2)).toString());
		}
		
		if ($('#ml5').val().length > 0) {
			value = Number($('#ml5').val());
			multival = carwash_num * value;
			$('#extra2').val((multival.toFixed(2)).toString());
		}
		
		if ($('#ml6').val().length > 0) {
			value = Number($('#ml6').val());
			multival = carwash_num * value;
			$('#extra3').val((multival.toFixed(2)).toString());
		}
	}

	function mL1_func(thisObj) {
		if ($('#carwash_num').val().length == 0) {
			alert("세차대수가 없습니다. 세차대수를 입력해주세요.");
			$('#carwash_num').focus();
			return;
		}
		if (thisObj.val().length == 0) {
			return;
		}
		carwash_num = Number($('#carwash_num').val());
		value = Number(thisObj.val());
		multival = carwash_num * value;
		$('#detergent').val((multival.toFixed(2)).toString())
	}
	
	function mL2_func(thisObj) {
		if ($('#carwash_num').val().length == 0) {
			alert("세차대수가 없습니다. 세차대수를 입력해주세요.");
			$('#carwash_num').focus();
			return;
		}
		if (thisObj.val().length == 0) {
			return;
		}
		carwash_num = Number($('#carwash_num').val());
		value = Number(thisObj.val());
		multival = carwash_num * value;
		$('#wax').val((multival.toFixed(2)).toString())
	}
	
	function mL3_func(thisObj) {
		if ($('#carwash_num').val().length == 0) {
			alert("세차대수가 없습니다. 세차대수를 입력해주세요.");
			$('#carwash_num').focus();
			return;
		}
		if (thisObj.val().length == 0) {
			return;
		}
		carwash_num = Number($('#carwash_num').val());
		value = Number(thisObj.val());
		multival = carwash_num * value;
		$('#pom').val((multival.toFixed(2)).toString())
	}
	
	function mL4_func(thisObj) {
		if ($('#carwash_num').val().length == 0) {
			alert("세차대수가 없습니다. 세차대수를 입력해주세요.");
			$('#carwash_num').focus();
			return;
		}
		if (thisObj.val().length == 0) {
			return;
		}
		carwash_num = Number($('#carwash_num').val());
		value = Number(thisObj.val());
		multival = carwash_num * value;
		$('#extra1').val((multival.toFixed(2)).toString())
	}
	
	function mL5_func(thisObj) {
		if ($('#carwash_num').val().length == 0) {
			alert("세차대수가 없습니다. 세차대수를 입력해주세요.");
			$('#carwash_num').focus();
			return;
		}
		if (thisObj.val().length == 0) {
			return;
		}
		carwash_num = Number($('#carwash_num').val());
		value = Number(thisObj.val());
		multival = carwash_num * value;
		$('#extra2').val((multival.toFixed(2)).toString())
	}
	
	function mL6_func(thisObj) {
		if ($('#carwash_num').val().length == 0) {
			alert("세차대수가 없습니다. 세차대수를 입력해주세요.");
			$('#carwash_num').focus();
			return;
		}
		if (thisObj.val().length == 0) {
			return;
		}
		carwash_num = Number($('#carwash_num').val());
		value = Number(thisObj.val());
		multival = carwash_num * value;
		$('#extra3').val((multival.toFixed(2)).toString())
	}

	function successCallback(data) {
		//$('#datepicker').val(data.report_date);
		
		// isStart = 0; 선택한 날짜로 처음 입력이고, 이전날짜로 기록되어 있는 것이 없는 경우
		// isStart = 1; 선택한 날짜로 처음 입력이고, 이전날짜로 기록되어 있는 것이 있는 경우
		// isStart = 2; 선택한 날짜로 입력한 적이 있는 경우
		
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
			$('#discharge_sttime').val(data.discharge_sttime);
			$('#discharge_endtime').val(data.discharge_endtime);
			$('#prevent_sttime').val(data.prevent_sttime);
			$('#prevent_endtime').val(data.prevent_endtime);
			$('#carwash_num').val(data.carwash_num);
			$('#pre_waterworks').val(data.pre_waterworks);
			$('#today_waterworks').val(data.today_waterworks);
			$('#use_waterworks').val(data.use_waterworks);
			$('#waterworks_time').val(data.waterworks_time);
			$('#pre_underwater').val(data.pre_underwater);
			$('#today_underwater').val(data.today_underwater);
			$('#use_underwater').val(data.use_underwater);
			$('#underwater_time').val(data.underwater_time);
			$('#pre_diswaste').val(data.pre_diswaste);
			$('#today_diswaste').val(data.today_diswaste);
			$('#use_diswaste').val(data.use_diswaste);
			$('#startworking_time').val(data.startworking_time);
			$('#endworking_time').val(data.endworking_time);
			$('#working_use').val(data.working_use);
			$('#reading_time').val(data.reading_time);
			$('#compute_guidelines').val(data.compute_guidelines);
			$('#pre_compute_guidelines').val(data.pre_compute_guidelines);
			pre_compute_guidelines = data.pre_compute_guidelines;
			$('#weather').val("");
			$('#temperature').val("");
			$('#carwash_num').val("");
			$('#detergent').val("");
			$('#ml1').val("");
			$('#wax').val("");
			$('#ml2').val("");
			$('#pom').val("");
			$('#ml3').val("");
			$('#subtitle1').val("");
			$('#extra1').val("");
			$('#ml4').val("");
			$('#subtitle2').val("");
			$('#extra2').val("");
			$('#ml5').val("");
			$('#subtitle3').val("");
			$('#extra3').val("");
			$('#ml6').val("");
			$('#today_genwaste').val("");
			$('#today_reuse').val("")
			$('#etc').val("");
			$('#med_name1').val("");
			$('#use_mount1').val("");
			$('#subuse1').val("");
			$('#buy_mount1').val("");
			$('#bal_mount1').val("");
			$('#sub_ect1').val("");
			$('#med_name2').val("");
			$('#use_mount2').val("");
			$('#subuse2').val("");
			$('#buy_mount2').val("");
			$('#bal_mount2').val("");
			$('#sub_ect2').val("");
			$('#med_name3').val("");
			$('#use_mount3').val("");
			$('#subuse3').val("");
			$('#buy_mount3').val("");
			$('#bal_mount3').val("");
			$('#sub_ect3').val("");
			$('#med_name4').val("");
			$('#use_mount4').val("");
			$('#subuse4').val("");
			$('#buy_mount4').val("");
			$('#bal_mount4').val("");
			$('#sub_ect4').val("");
			$('#sluge_gen').val("");
			$('#sluge_use').val("");
			$('#sluge_keep').val("");
			$('#sluge_func').val("");
			$('#sluge_place').val("");
			$('#sluge_selfplace').val("");
			$('#instead_name').val("");
			$('#remarks').val("");
			$('#advise').val("");
			$("input:checkbox[id='chkholiday']").prop("checked", false); 
			
			
			if (data.chkop == "on") {
				$("input:checkbox[id='chkop']").prop("checked", true);  
			}
			else {
				$("input:checkbox[id='chkop']").prop("checked", false); 
			}
			chkop_func($("input:checkbox[id='chkop']"));
			if (data.chkput == "on") {
				$("input:checkbox[id='chkput']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chkput']").prop("checked", false);
			}
			chkput_func($("input:checkbox[id='chkput']"));
			if (data.chkprevent == "on") {
				$("input:checkbox[id='chkprevent']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chkprevent']").prop("checked", false);
			}
			chkprevent_func($("input:checkbox[id='chkprevent']"));
			if (data.chkmed == "on") {
				$("input:checkbox[id='chkmed']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chkmed']").prop("checked", false);
			}
			chkmed_func($("input:checkbox[id='chkmed']"));
			if (data.chkdiswastereuse == "on") {
				$("input:checkbox[id='chkdiswastereuse']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chkdiswastereuse']").prop("checked", false);
			}
			chkdiswastereuse_func($("input:checkbox[id='chkdiswastereuse']"));
			
			if (data.chksluge == "on") {
				$("input:checkbox[id='chksluge']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chksluge']").prop("checked", false);
			}
			chksluge_func($("input:checkbox[id='chksluge']"));
			
			if (data.chk_diswaste == "on") {
				$("input:checkbox[id='chk_diswaste']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chk_diswaste']").prop("checked", false);
			}
			chk_diswaste_func($("input:checkbox[id='chk_diswaste']"), 2);
			
		}
		else if (isStart == 2) {
			$('#weather').val(data.weather);
			$('#temperature').val(data.temperature);
			$('#starttime').val(data.starttime);
			$('#endtime').val(data.endtime);
			$('#discharge_sttime').val(data.discharge_sttime);
			$('#discharge_endtime').val(data.discharge_endtime);
			$('#prevent_sttime').val(data.prevent_sttime);
			$('#prevent_endtime').val(data.prevent_endtime);
			$('#carwash_num').val(data.carwash_num);
			$('#detergent').val(data.detergent);
			$('#ml1').val(data.ml1);
			$('#wax').val(data.wax);
			$('#ml2').val(data.ml2);
			$('#pom').val(data.pom);
			$('#ml3').val(data.ml3);
			$('#subtitle1').val(data.subtitle1);
			$('#extra1').val(data.extra1);
			$('#ml4').val(data.ml4);
			$('#subtitle2').val(data.subtitle2);
			$('#extra2').val(data.extra2);
			$('#ml5').val(data.ml5);
			$('#subtitle3').val(data.subtitle3);
			$('#extra3').val(data.extra3);
			$('#ml6').val(data.ml6);
			$('#pre_waterworks').val(data.pre_waterworks);
			$('#today_waterworks').val(data.today_waterworks);
			$('#use_waterworks').val(data.use_waterworks);
			$('#waterworks_time').val(data.waterworks_time);
			$('#pre_underwater').val(data.pre_underwater);
			$('#today_underwater').val(data.today_underwater);
			$('#use_underwater').val(data.use_underwater);
			$('#underwater_time').val(data.underwater_time);
			$('#pre_genwaste').val(data.pre_genwaste);
			$('#today_genwaste').val(data.today_genwaste);
			$('#use_genwaste').val(data.use_genwaste);
			$('#pre_diswaste').val(data.pre_diswaste);
			$('#today_diswaste').val(data.today_diswaste);
			$('#use_diswaste').val(data.use_diswaste);
			$('#pre_reuse').val(data.pre_reuse);
			$('#today_reuse').val(data.today_reuse);
			$('#use_reuse').val(data.use_reuse);
			$('#startworking_time').val(data.startworking_time);
			$('#endworking_time').val(data.endworking_time);
			$('#working_use').val(data.working_use);
			$('#reading_time').val(data.reading_time);
			$('#etc').val(data.etc);
			$('#med_name1').val(data.med_name1);
			$('#use_mount1').val(data.use_mount1);
			$('#subuse1').val(data.subuse1);
			$('#buy_mount1').val(data.buy_mount1);
			$('#bal_mount1').val(data.bal_mount1);
			$('#sub_ect1').val(data.sub_ect1);
			$('#med_name2').val(data.med_name2);
			$('#use_mount2').val(data.use_mount2);
			$('#subuse2').val(data.subuse2);
			$('#buy_mount2').val(data.buy_mount2);
			$('#bal_mount2').val(data.bal_mount2);
			$('#sub_ect2').val(data.sub_ect2);
			$('#med_name3').val(data.med_name3);
			$('#use_mount3').val(data.use_mount3);
			$('#subuse3').val(data.subuse3);
			$('#buy_mount3').val(data.buy_mount3);
			$('#bal_mount3').val(data.bal_mount3);
			$('#sub_ect3').val(data.sub_ect3);
			$('#med_name4').val(data.med_name4);
			$('#use_mount4').val(data.use_mount4);
			$('#subuse4').val(data.subuse4);
			$('#buy_mount4').val(data.buy_mount4);
			$('#bal_mount4').val(data.bal_mount4);
			$('#sub_ect4').val(data.sub_ect4);
			$('#sluge_gen').val(data.sluge_gen);
			$('#sluge_use').val(data.sluge_use);
			$('#sluge_keep').val(data.sluge_keep);
			$('#sluge_func').val(data.sluge_func);
			$('#sluge_place').val(data.sluge_place);
			$('#sluge_selfplace').val(data.sluge_selfplace);
			$('#instead_name').val(data.instead_name);
			$('#remarks').val(data.remarks);
			$('#advise').val(data.advise);
			$('#compute_guidelines').val(data.compute_guidelines);
			$('#pre_compute_guidelines').val(data.pre_compute_guidelines);
			pre_compute_guidelines = data.pre_compute_guidelines;
			
			if (data.chkop == "on") {
				$("input:checkbox[id='chkop']").prop("checked", true);  
			}
			else {
				$("input:checkbox[id='chkop']").prop("checked", false); 
			}
			chkop_func($("input:checkbox[id='chkop']"));
			if (data.chkput == "on") {
				$("input:checkbox[id='chkput']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chkput']").prop("checked", false);
			}
			chkput_func($("input:checkbox[id='chkput']"));
			if (data.chkprevent == "on") {
				$("input:checkbox[id='chkprevent']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chkprevent']").prop("checked", false);
			}
			chkprevent_func($("input:checkbox[id='chkprevent']"));
			if (data.chkmed == "on") {
				$("input:checkbox[id='chkmed']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chkmed']").prop("checked", false);
			}
			chkmed_func($("input:checkbox[id='chkmed']"));
			if (data.chksluge == "on") {
				$("input:checkbox[id='chksluge']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chksluge']").prop("checked", false);
			}
			chksluge_func($("input:checkbox[id='chksluge']"));
			if (data.chkdiswastereuse == "on") {
				$("input:checkbox[id='chkdiswastereuse']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chkdiswastereuse']").prop("checked", false);
			}
			chkdiswastereuse_func($("input:checkbox[id='chkdiswastereuse']"));
			
			if (data.chkholiday == "on") {
				$("input:checkbox[id='chkholiday']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chkholiday']").prop("checked", false);
			}
			chkholiday_func($("input:checkbox[id='chkholiday']"));
			
			if (data.chk_diswaste == "on") {
				$("input:checkbox[id='chk_diswaste']").prop("checked", true);
			}
			else {
				$("input:checkbox[id='chk_diswaste']").prop("checked", false);
			}
			chk_diswaste_func($("input:checkbox[id='chk_diswaste']"), 2);
			
		}
		else {
			$("#temperature").val("");
			$("#weather").val("");
			$("#pre_waterworks").val("0");
			$("#pre_underwater").val("0");
			$("#pre_diswaste").val("0");
			$('#pre_compute_guidelines').val("0");
			
			$("#today_waterworks").val("");
			$("#today_underwater").val("");
			$("#today_diswaste").val("");
		}
		
	}

	$(document).ready(function(){
		strUrl = "/paesu/selectData";
		var tempObject = new Object();
		var cname = '${cname}';
    	tempObject.report_date = $('#datepicker').val();
    	tempObject.cname = cname;
		util_ajaxPage(strUrl, tempObject, successCallback);
	});
	
	function report_date_func() {
		strUrl = "/paesu/selectData";
		var tempObject = new Object();
    	tempObject.report_date = $('#datepicker').val();
		util_ajaxPage(strUrl, tempObject, successCallback);
	}
	
	function insertSubmit() {
		var formObj = document.forms['mainForm'] || document.mainForm;
		
		var prevDate = new Date($("#datepicker").val());
		prevDate.setDate(prevDate.getDate()-1); //하루 전
		
		if ($("#chkholiday").is(":checked") == false) {
		
			if ($("#today_waterworks").val().length == 0) {
				alert("상수도 금일지침을 입력해 주세요.")
				$("#today_waterworks").focus();
				return;
			}
			else if ($("#today_underwater").val().length == 0) {
				alert("지하수 금일지침을 입력해 주세요.")
				$("#today_underwater").focus();
				return;
			}
			else if ($("#today_diswaste").val().length == 0) {
				alert("폐수배출량 금일지침을 입력해 주세요.")
				$("#today_diswaste").focus();
				return;
			}
			else if ($("#compute_guidelines").val().length == 0) {
				alert("전산전력계지침을 입력해 주세요.")
				$("#compute_guidelines").focus();
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
		 <h3 class="bu4"><strong></strong> 작성일자</h3>
		 <a href="javascript:;" class="btnType submit" onclick="insertSubmit();">저장</a>
		</div>      		
		<div class="boxLY_area">
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
                        <th>날씨</th>
                        <th>온도</th>
                    </tr>
                    <tr>
                        <td><input type="text" id="datepicker" name="report_date" readonly onchange="report_date_func($(this)); return false;"/><span class="spnholiday">휴일</span><input type="checkbox" id="chkholiday" name="chkholiday" class="chkholiday" onchange="chkholiday_func($(this)); return false;"/></td>
                        <td><input type="text" id="weather" name="weather"/></td>
                        <td><input type="text" id="temperature" name="temperature"/></td>
                    </tr>
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div>
	
        <div class="title">
		 <h3 class="bu3"><strong></strong> 사용량과 배출량(필수)</h3>
		</div>
		
        <div class="boxLY_area">
            <table class="tbsty">
                <caption></caption>
                    <colgroup>
                        <col style="width:25%">
                        <col style="width:20%">
                        <col style="width:55%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th colspan="3" style="text-align: center; vertical-align: middle;">상수도(㎥)</th>
                    </tr>
                    <tr>
                        <th style="text-align: center;color:#bab8b1;">전일</th>
                        <th style="text-align: center;color:#bab8b1;">사용량</th>
                        <th style="text-align: center;">금일</th>
                    </tr>
					<tr>
                        <td><input type="number" id="pre_waterworks" name="pre_waterworks" class="nonborder" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                    	<td><input type="number" id="use_waterworks" name="use_waterworks" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                    	<td><input type="number" id="today_waterworks" name="today_waterworks" onchange="today_waterworks_func($(this)); return false;"/></td>
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
                        <th colspan="3" style="text-align: center; vertical-align: middle;">지하수(㎥)</th>
                    </tr>
                    <tr>
                        <th style="text-align: center;color:#bab8b1;">전일</th>
                        <th style="text-align: center;color:#bab8b1;">사용량</th>
                        <th style="text-align: center;">금일</th>
                    </tr>
					<tr>
                        <td><input type="number" id="pre_underwater" name="pre_underwater" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                        <td><input type="number" id="use_underwater" name="use_underwater" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                        <td><input type="number" id="today_underwater" name="today_underwater" onchange="today_underwater_func($(this)); return false;"/></td>
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
                        <th colspan="3" style="text-align: center; vertical-align: middle;">폐수배출량(㎥)
                        	<span id="spn_diswaste" name="spn_diswaste" class="spn_diswaste">사용 유무</span>
                        	<input type="checkbox" id="chk_diswaste" name="chk_diswaste" class="chk_diswaste" checked="checked" onchange="chk_diswaste_func($(this), 1); return false;"/>
                        </th>
                    </tr>
                    <tr>
                        <th style="text-align: center;color:#bab8b1;">전일</th>
                        <th style="text-align: center;color:#bab8b1;">배출량</th>
                        <th style="text-align: center;">금일</th>
                    </tr>
					<tr>
                        <td><input type="number" id="pre_diswaste" name="pre_diswaste" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                        <td><input type="number" id="use_diswaste" name="use_diswaste" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                        <td><input type="number" id="today_diswaste" name="today_diswaste" onchange="today_diswaste_func($(this)); return false;"/></td>
                    </tr>
			</table>
		</div>
			
		
        
        <div class="title">
		 <h3 class="bu3"><strong></strong> 전력 사용량(필수)</h3>
		</div>
		
		<div class="boxLY_area">
            <table class="tbsty">
                <caption></caption>
                    <colgroup>
                        <col style="width:25%">
                        <col style="width:20%">
                        <col style="width:55%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th colspan="3" style="text-align: center; vertical-align: middle;">전산전력계지침</th>
                    </tr>
                    <tr>
                        <th style="text-align: center;color:#bab8b1;">전일</th>
                        <th style="text-align: center;color:#bab8b1;">사용량</th>
                        <th style="text-align: center;">금일</th>
                    </tr>
					<tr>
                        <td><input type="number" id="pre_compute_guidelines" name="pre_compute_guidelines" class="nonborder" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                    	<td><input type="number" id="working_use" name="working_use" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;" readonly/></td>
                    	<td><input type="number" id="compute_guidelines" name="compute_guidelines" onchange="compute_guidelines_func($(this)); return false;"/></td>
                    </tr> 
            	</tbody>
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
                        <td><input type="text" id="startworking_time" name="startworking_time" class="timepicker" value="09:00" placeholder="시간선택" required size="8" maxlength="5"/></td>
                        <td><input type="text" id="endworking_time" name="endworking_time" class="timepicker" value="18:00" placeholder="시간선택" required size="8" maxlength="5"/></td>
                    </tr>
            	</tbody>
            </table>
            <table class="tbsty">
                <caption></caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:70%">
                    </colgroup>
                <tbody>          
                    <tr>
                        <th>참고사항</th>
                        <td><input type="text" id="etc" name="etc"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="title">
		 <h3 class="bu3"> 폐수발생량, 재사용량(선택)<input type="checkbox" id="chkdiswastereuse" name="chkdiswastereuse" class="chk" onchange="chkdiswastereuse_func($(this)); return false;"/></h3>
		</div>
		
        <div id="divdiswastereuse" class="boxLY_area" style="display:none">
            <table class="tbsty">
                <caption>폐수발생량, 사용량 설정</caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:20%">
                        <col style="width:30%">
                        <col style="width:20%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th>폐수발생량(㎥)</th>
                        <td><input type="number" id="today_genwaste" name="today_genwaste"/></td>
 						<th>재사용량(㎥)</th>
                        <td><input type="number" id="today_reuse" name="today_reuse"/></td>                   
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="title">
		 <h3 class="bu3"><strong></strong> 원료 또는 첨가제등의 사용량(선택)</h3>
		</div>
		
        <div class="boxLY_area">
            <table class="tbsty">
                <caption></caption>
                    <colgroup>
                        <col style="width:20%">
                        <col style="width:23%">
                        <col style="width:25%">
                        <col style="width:32%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th colspan="2">세차대수</th>
                        <td colspan="2"><input type="number" id="carwash_num" name="carwash_num" class="firstpart" onchange="carwash_num_func($(this)); return false;"/> 대</td>
                    </tr>
                    <tr>
                        <th>세제</th>
                        <td><input type="text" id="detergent" name="detergent" class="secpart" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;"/></td>
                        <th>세차 1대당</th>
                        <td><input type="number" id="ml1" name="ml1" class="thirdpart" value="0" onchange="mL1_func($(this)); return false;"/> mL</td>
                    </tr>
                    <tr>
                        <th>왁스</th>
                        <td><input type="text" id="wax" name="wax" class="secpart" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;"/></td>
                        <th>세차 1대당</th>
                        <td><input type="number" id="ml2" name="ml2" class="thirdpart" value="0" onchange="mL2_func($(this)); return false;"/> mL</td>
                    </tr>
					<tr>
                        <th>폼</th>
                        <td><input type="text" id="pom" name="pom" class="secpart" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;"/></td>
                        <th>세차 1대당</th>
                        <td><input type="number" id="ml3" name="ml3" class="thirdpart" value="0" onchange="mL3_func($(this)); return false;"/> mL</td>
                    </tr>
                    <tr>
                        <th><input type="text" id="subtitle1" name="subtitle1" class="subtitle"/></th>
                        <td><input type="text" id="extra1" name="extra1" class="secpart" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;"/></td>
                        <th>세차 1대당</th>
                        <td><input type="number" id="ml4" name="ml4" class="thirdpart" value="0" onchange="mL4_func($(this)); return false;"/> mL</td>
                    </tr>
                    <tr>
                        <th><input type="text" id="subtitle2" name="subtitle2" class="subtitle"/></th>
                        <td><input type="text" id="extra2" name="extra2" class="secpart" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;"/></td>
                        <th>세차 1대당</th>
                        <td><input type="number" id="ml5" name="ml5" class="thirdpart" value="0" onchange="mL5_func($(this)); return false;"/> mL</td>
                    </tr>
                    <tr>
                        <th><input type="text" id="subtitle3" name="subtitle3" class="subtitle"/></th>
                        <td><input type="text" id="extra3" name="extra3" class="secpart" style="border:none;border-right:0px; border-top:0px; boder-left:0px; boder-bottom:0px;text-align:center;"/></td>
                        <th>세차 1대당</th>
                        <td><input type="number" id="ml6" name="ml6" class="thirdpart" value="0" onchange="mL6_func($(this)); return false;"/> mL</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
		<div class="title">
		 <h3 class="bu3"> 운영시간(선택)<input type="checkbox" id="chkop" name="chkop" class="chk" onchange="chkop_func($(this)); return false;"/></h3>
		</div>
		
        <div id="divop" class="boxLY_area" style="display:none">
            <table class="tbsty">
                <caption>운영시간 설정</caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:20%">
                        <col style="width:30%">
                        <col style="width:20%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th>시작 시간</th>
                        <td><input type="text" id="starttime" name="starttime" class="timepicker" value="09:00" placeholder="시간선택" required size="8" maxlength="5" autocomplete="off"/></td>
 						<th>종료 시간</th>
                        <td><input type="text" id="endtime" name="endtime" class="timepicker" value="18:00" placeholder="시간선택" required size="8" maxlength="5" autocomplete="off"/></td>                   
                    </tr>
                </tbody>
            </table>
        </div>    
        <div class="title">
         <h3 class="bu3"> 배출시설 가동 시간대(선택)<input type="checkbox" id="chkput" name="chkput" class="chk" onchange="chkput_func($(this)); return false;"/></h3>
		</div>
		
        <div id="divput" class="boxLY_area" style="display:none">
            <table class="tbsty">
                <caption>배출시설시간 설정</caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:20%">
                        <col style="width:30%">
                        <col style="width:20%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th>시작 시간</th>
                        <td><input type="text" id="discharge_sttime" name="discharge_sttime" class="timepicker" value="09:00" placeholder="시간선택" required size="8" maxlength="5"/></td>
                    	<th>종료 시간</th>
                        <td><input type="text" id="discharge_endtime" name="discharge_endtime" class="timepicker" value="18:00" placeholder="시간선택" required size="8" maxlength="5"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="title">
         <h3 class="bu3"> 방지시설 가동 시간대(선택)<input type="checkbox" id="chkprevent" name="chkprevent" class="chk" onchange="chkprevent_func($(this)); return false;"/></h3>

		</div>
		
        <div id="divprevent" class="boxLY_area" style="display:none">
            <table class="tbsty">
                <caption>방지시설시간 설정</caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:20%">
                        <col style="width:30%">
                        <col style="width:20%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th>시작 시간</th>
                        <td><input type="text" id="prevent_sttime" name="prevent_sttime" class="timepicker" value="09:00" placeholder="시간선택" required size="8" maxlength="5"/></td>
                        <th>종료 시간</th>
                        <td><input type="text" id="prevent_endtime" name="prevent_endtime" class="timepicker" value="18:00" placeholder="시간선택" required size="8" maxlength="5"/></td>
                    </tr>

                </tbody>
            </table>
        </div>        
        
        <div class="title">
         <h3 class="bu3"> 약품 사용량(선택)<input type="checkbox" id="chkmed" name="chkmed" class="chk" onchange="chkmed_func($(this)); return false;"/></h3>
		</div>
		
        <div id="divmed" class="boxLY_area" style="display:none">
            <table class="tbsty2">
                <caption></caption>
                    <colgroup>
                        <col style="width:20%">
                        <col style="width:30%">
                        <col style="width:20%">
                        <col style="width:30%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th>약품명</th>
                        <td><input type="text" id="med_name1" name="med_name1"/></td>
                    	<th>사용량</th>
                        <td><input type="number" id="subuse1" name="subuse1" class="subuse"/> mL</td>
                    </tr>
                    <tr>
                        <th>구입량</th>
                        <td><input type="number" id="buy_mount1" name="buy_mount1"/></td>
                        <th>잔고량</th>
                        <td><input type="number" id="bal_mount1" name="bal_mount1"/></td>
                    </tr>
                    <tr>
                        <th>비고</th>
                        <td colspan="3"><input type="text" id="sub_ect1" name="sub_ect1"/></td>
                    </tr>
            	</tbody>
            </table>
            
            <table class="tbsty2">
                <caption></caption>
                    <colgroup>
                        <col style="width:20%">
                        <col style="width:30%">
                        <col style="width:20%">
                        <col style="width:30%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th>약품명</th>
                        <td><input type="text" id="med_name2" name="med_name2"/></td>
                        <th>사용량</th>
                        <td><input type="number" id="subuse2" name="subuse2" class="subuse"/> mL</td>
                    </tr>
                    <tr>
                        <th>구입량</th>
                        <td><input type="text" id="buy_mount2" name="buy_mount2"/></td>
                        <th>잔고량</th>
                        <td><input type="number" id="bal_mount2" name="bal_mount2"/></td>
                    </tr>
                    <tr>
                        <th>비고</th>
                        <td colspan="3"><input type="text" id="sub_ect2" name="sub_ect2"/></td>
                    </tr>
            	</tbody>
            </table>
            <table class="tbsty2">
                <caption></caption>
                    <colgroup>
                        <col style="width:20%">
                        <col style="width:30%">
                        <col style="width:20%">
                        <col style="width:30%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th>약품명</th>
                        <td><input type="text" id="med_name3" name="med_name3"/></td>
                        <th>사용량</th>
                        <td><input type="number" id="subuse3" name="subuse3" class="subuse"/> mL</td>
                    </tr>
                    <tr>
                        <th>구입량</th>
                        <td><input type="text" id="buy_mount3" name="buy_mount3"/></td>
                        <th>잔고량</th>
                        <td><input type="number" id="bal_mount3" name="bal_mount3"/></td>
                    </tr>
                    <tr>
                        <th>비고</th>
                        <td colspan="3"><input type="text" id="sub_ect3" name="sub_ect3"/></td>
                    </tr>
            	</tbody>
            </table>
            <table class="tbsty2">
                <caption></caption>
                    <colgroup>
                        <col style="width:20%">
                        <col style="width:30%">
                        <col style="width:20%">
                        <col style="width:30%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th>약품명</th>
                        <td><input type="text" id="med_name4" name="med_name4"/></td>
                    	<th>사용량</th>
                        <td><input type="number" id="subuse4" name="subuse4" class="subuse"/> mL</td>
                    </tr>
                    <tr>
                        <th>구입량</th>
                        <td><input type="text" id="buy_mount4" name="buy_mount4"/></td>
                    	<th>잔고량</th>
                        <td><input type="number" id="bal_mount4" name="bal_mount4"/></td>
                    </tr>
                    <tr>
                        <th>비고</th>
                        <td colspan="3"><input type="text" id="sub_ect4" name="sub_ect4"/></td>
                    </tr>
            	</tbody>
            </table>
        </div>
        
        <div class="title">
         <h3 class="bu3"> 슬러지 처리시설(선택)<input type="checkbox" id="chksluge" name="chksluge" class="chk" onchange="chksluge_func($(this)); return false;"/></h3>
		</div>
		
        <div id="divsluge" class="boxLY_area" style="display:none">
            <table class="tbsty">
                <caption></caption>
                    <colgroup>
                        <col style="width:25%">
                        <col style="width:24%">
                        <col style="width:25%">
                        <col style="width:25%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th>슬러지발생량</th>
                        <td><input type="text" id="sluge_gen" name="sluge_gen"/></td>
                    	<th>처리량</th>
                        <td><input type="number" id="sluge_use" name="sluge_use"/></td>
                    </tr>
                    <tr>
                        <th>보관량</th>
                        <td><input type="text" id="sluge_keep" name="sluge_keep"/></td>
                        <th>함수율(%)</th>
                        <td><input type="number" id="sluge_func" name="sluge_func"/></td>
                    </tr>
                    <tr>
                        <th>보관장소</th>
                        <td><input type="text" id="sluge_place" name="sluge_place"/></td>
                        <th>처리장소</th>
                        <td><input type="text" id="sluge_selfplace" name="sluge_selfplace"/></td>
                    </tr>
                    <tr>
                        <th colspan="2">위탁처리업소명</th>
                        <td colspan="2"><input type="text" id="instead_name" name="instead_name"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="title">
		 <h3 class="bu3"> 방지시설 고장유무 및 특기사항(선택)</h3>
		</div>
		
        <div class="boxLY_area">
            <textarea rows="3" id="remarks" name="remarks" maxlength="80" style="width:90%;"></textarea>
        </div> 
        
        <div class="title">
		 <h3 class="bu3"> 지도 또는 점검 받은 사항(선택)</h3>
		</div>
		
        <div class="boxLY_area">
            <textarea rows="3" id="advise" name="advise" maxlength="80" style="width:90%;"></textarea>
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
	