/**
 *  common.js version 1.0
 *
 */

var debugging = true; // or false
if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} };
else if (!debugging && typeof console != "undefined") console.log = function() {};

/**
 * 화면 이동
 * @param strUrl
 * @param objParam
 * @param strTarget
 */
function util_movePage(strUrl, objParam, strTarget, sendFormArea){
    if (strUrl === undefined || strUrl === ""){
        alert("이동할 URL이 설정되지 않았습니다.");
        return;
    }
    
    if (typeof(objParam) !== "object"){
    	objParam = makeInputObject(sendFormArea);
    } 
    
    if (strTarget === undefined || strTarget === null){
    	strTarget = "";
    } else {
    	strTarget = "target=\"" + strTarget + "\"";
    }
    
    // 화면에 추가할 html text를 만든다.
    var strHtml = "";
    //$("#nextForm").remove();
    jQuery.remove("nextForm");
    strHtml += "<form id=\"nextForm\" name=\"nextForm\" method=\"POST\" " + strTarget + " action=\"" + strUrl + ".fpms\">";
    strHtml += util_makeInputTag(objParam, "");// 데이터의 일반, 객체, 배열의 모든 종류의 타입
    strHtml += "</form>";
    
    $("body").append(strHtml);  // 화면에 form 등 생성
    $("#nextForm").submit();    // submit
}


/**
 * ajax통신을 한다. Object data를 받아 처리하고 통신 성공시 특정 펑션을 호출하여 Object를 리턴한다.
 * 
 * @param strUrl -
 *            String - 이동할 URL 주소, .ajax는 생략한다
 * @param objParam -
 *            Object - 파라메타 오브젝트, 파라메타가 없을경우 빈스트링 처리 objParam.noLoading 값을 true로
 *            주면 로딩 이미지 안나타남
 * @param strCallBack -
 *            String - 통신성공시 호출할 펑션명, 미입력시 callAjaxData 펑션을 무조건 호출한다.
 * @bNoLoadingChk - Boolean - ture 일경우 로딩 안나타남
 */
function util_ajaxPage(strUrl, objParam, successCallBack){
	
	if (strUrl === undefined || strUrl === ""){
		alert("이동할 URL이 설정되지 않았습니다.");
		return;
	}
	
		
	$.ajax({
		"type"	: "POST" ,
		"async" : true,
		"url"	: strUrl + ".do",
		"dataType" : "json",
		"data"	: JSON.stringify(objParam),
		"contentType" : "application/json",
		"success" : function (data){
//			if(typeof(data) === 'string'){
//				data = jQuery.parse(data);
//			}
//			data = jQuery.parse(data);
			console.log(data);
			successCallBack(data);
			
//			if(typeof successCallBack === 'function'){
//				successCallBack(data);
//			}else if(typeof successCallBack === 'string'){
//				eval(successCallBack + '(data)');
//
//			}else{
//				//TO DO
//
//			}
		}
		,"error" : function (data){
			
		}
	});
}

/**
 * 동적으로 inputTag를 만든다
 */
function util_makeInputTag(obj, parentKey) {
    var strHtml = "";
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        return String("");        
    } else {
        var n, v;
        for (n in obj) {
            v = obj[n];                
            t = typeof(v);
            if (obj.hasOwnProperty(n)) {
                var inId, inName;
                if("" == parentKey){
                    inId = n, inName = n;
                }else{
                    inId = parentKey + n, inName = parentKey;
                }
                if (t == 'string'){
                    strHtml += "<input name=\"" + inName + "\" id=\"" + inId + "\" type=\"hidden\" value=\'" + v + "\' />";
                }else if (t == "object" && v !== null){// 객체나 배열일 경우 같은 name으로
                                                        // 묶어서 하위에서 재귀적 처리
                    strHtml += util_makeInputTag(v, parentKey + "[" + n + "]"); 
                }else{
                    strHtml += "<input name=\"" + inName + "\" id=\"" + inId + "\" type=\"hidden\" value=\'" + v + "\' />";
                }
            }            
        }            
        return strHtml;
    }    
}

/**
 * 화면의 input name 태그 객체화
 */
function makeInputObject(area){
	var paramObj = new Object();
	if(undefined == area) {
		area = $("body");
	}
	
	var inputTagList = area.find("input");
	$.each(inputTagList,function(index, inputTag){
	    var data = $(inputTag);
	    var inputTagName = data.attr("name");
	    var inputTagValue = data.val();
	    if(inputTagName !== undefined && inputTagName !== '' ){
	    	paramObj[inputTagName] = inputTagValue;
	    }
	});
	
	var selectTagList = area.find("select");
	$.each(selectTagList,function(index, selectTag){
	    var data = $(selectTag);
	    var selectTagName = data.attr("name");
	    var selectTagValue = data.val();
	    if(selectTag !== undefined && selectTag !== '' ){
	    	paramObj[selectTagName] = selectTagValue;
	    }
	});
	return paramObj;
}

/**
 * 날짜 조회 입력시 유효성 체크 날짜가 입력될경우 조회시작일이 현재일보다 이후이면 현재일 종료일보다 이후이면 종료일을 조회시작일로 맞춘다.
 * 조회종료일이 현재일보다 이후이면 현재일 시작일보다 이전이면 시작일을 조회종료일로 맞춘다.
 * 
 * 
 * ex ) util_intDateValid("sDate", "eDate");
 */
function util_intDateValid(startDateId, endDateId){
	if(util_chkReturn(startDateId,"s")==""){
		startDateId = "search_from_dt";
	}
	if(util_chkReturn(endDateId,"s")==""){
		endDateId 	= "search_to_dt";
	}
	$startDate 	= $("#"+startDateId);
	$endDate 	= $("#"+endDateId);
	// 조회시작일 유효성 체크
	$startDate.unbind().bind("change", function(){
		if(!util_isValidDate($(this).val())){
			alert("조회시작일이 현재일보다 커질 수 없습니다.");
			$(this).val(util_getDate());
		}
		if(!util_isValidDate($(this).val(), $endDate.val())){
			// alert("조회시작일이 조회종료일보다 커질 수 없습니다.");
			$endDate.val($(this).val());
		}
	});
	// 조회종료일
	$endDate.unbind().bind("change", function(){
		if(!util_isValidDate($(this).val())){
			alert("조회종료일이 현재일보다 커질 수 없습니다.");
			$(this).val(util_getDate());
		}
		if(!util_isValidDate($startDate.val(), $(this).val())){
			// alert("조회종료일이 조회시작일보다 이전일 수 없습니다.");
			$startDate.val($(this).val());
		}
	});
}

/**
 * 두 날짜의 차이를 일자로 구한다.(조회 종료일 - 조회 시작일)
 * 
 * @param strStartCalendarId -
 *            조회 시작일(날짜 ex.2002-01-01)
 * @param strEndCalendarId -
 *            조회 종료일(날짜 ex.2002-01-01)
 * @param strType -
 *            String - 리턴 년: "y", 월: "m", 일: "d"
 * @return 기간에 해당하는 일자
 */
function util_getDateRange(strStartCalendarId, strEndCalendarId, strType)
{
	var result = "";
    var FORMAT = "-";

    // FORMAT을 포함한 길이 체크
    //if (strStartCalendarId.length != 10 || strEndCalendarId.length != 10)
    //    return null;


    // FORMAT이 있는지 체크
    //if (strStartCalendarId.indexOf(FORMAT) < 0 || strEndCalendarId.indexOf(FORMAT) < 0)
    //   return null;
    // 년도, 월, 일로 분리
    var start_dt = new Array();
    var end_dt = new Array();
    if(strStartCalendarId.length == 10 && strEndCalendarId.length == 10){
    	start_dt = strStartCalendarId.split(FORMAT);
    	end_dt = strEndCalendarId.split(FORMAT);
    }else if(strStartCalendarId.length == 8 && strEndCalendarId.length == 8){
    	start_dt[0] = strStartCalendarId.substring(0,4);
    	start_dt[1] = strStartCalendarId.substring(4,6);
    	start_dt[2] = strStartCalendarId.substring(6,8);
    	end_dt[0] = strEndCalendarId.substring(0,4);
    	end_dt[1] = strEndCalendarId.substring(4,6);
    	end_dt[2] = strEndCalendarId.substring(6,8);
    }else{
    	return null;
    }
    // 월 - 1(자바스크립트는 월이 0부터 시작하기 때문에...)
    // Number()를 이용하여 08, 09월을 10진수로 인식하게 함.
    start_dt[1] = (Number(start_dt[1]) - 1) + "";
    end_dt[1] = (Number(end_dt[1]) - 1) + "";

    var from_dt = new Date(start_dt[0], start_dt[1], start_dt[2]);
    var to_dt = new Date(end_dt[0], end_dt[1], end_dt[2]);
    var interval = (to_dt.getTime() - from_dt.getTime());

    // 년
    if (strType == 'y') {
    	result = interval / 1000 / 60 / 60 / 24;
    	
    // 월
    } else if (strType == 'm') {
    	result = interval / 1000 / 60 / 60 / 24 / 30;
    
    // 일
    } else if (strType == 'm'){
    	result = interval / 1000 / 60 / 60 / 24 / 30 / 12;

    // 일
    } else {
    	result = interval / 1000 / 60 / 60 / 24 / 30 / 12;
    }

    return Math.floor(result);
}

/**
 * 날짜 유효성 체크. 입력날짜가 현재 또는 입력된 기준일보다 후일일 경우 false 기준일 또는 이전일 경우 true반환
 * 
 * @param chkDate
 * @param stdDate
 * @returns {Boolean}
 */
function util_isValidDate(chkDate, stdDate){
	if(util_chkReturn(stdDate,"s")==""){
		stdDate = util_getDate();
	}
	stdDate = stdDate.replace(/[^0-9]/g,"");
	chkDate = chkDate.replace(/[^0-9]/g,"");
	if(util_isDate(chkDate) && stdDate >= chkDate ){
		return true;
	}
	return false;
}

/**
 * 입력된 문자열이 yyyyMMdd의 날짜형식인지 확인한다.
 * 
 * @param -
 *            String - "YYYYMMDD" 형식의 날짜 스트링
 * @returns - Boolean - 날짜형식일경우 true, 날짜가 아닐경우 false
 */
function util_isDate(curdate){
	var i, year, month, day;

	if (util_chkReturn(curdate) == false || curdate.length < 8){
		return false;
	}

	for (i = 0; i < curdate.length; i++) {
		if ((curdate.charAt(i) < "0") || (curdate.charAt(i) > "9")) {
			return false;
		}
	}

	if (util_lTrim(curdate.substring(0, 4), "0").length == 0){
		return false;
	} else {
		year = parseInt(util_lTrim(curdate.substring(0, 4), "0"), 10);
	}

	if (util_lTrim(curdate.substring(4, 6), "0").length == 0){
		return false;
	} else {
		month = parseInt(util_lTrim(curdate.substring(4, 6), "0"), 10);
	}

	if (util_lTrim(curdate.substring(6, 8), "0").length == 0){
		return false;
	} else {
		day = parseInt(util_lTrim(curdate.substring(6, 8), "0"), 10);
	}

	if (year == 0){
		return false;
	}
	if (month == 0 || month > 12){
		return false;
	}

	if (day == 0 || day > util_getLastDay(year, month)){
		return false;
	}

	return true;
}

/**
 * 문자열 좌측의 공백 제거 처리 함수 (null, undefined, 빈스트링일경우 빈스트링 return)
 * 
 * @param strParam
 * @returns
 */
function util_lTrim(strParam) {
	if (util_chkReturn(strParam, "s") == ""){
		return "";
	}
	
	while (strParam.substring(0, 1) == ' '){
		strParam = strParam.substring(1, strParam.length);
	}
		
	return strParam;
}

/**
 * 해당 년월의 마지막날 구하기
 */
function util_getLastDay(year, month){
	var day = new Date(new Date(year, month, 1)- 86400000).getDate();
	if(year == 9999){
		day = 99;
	}
	if(day.length == 1){
		day = "0"+day;
	}
	return day;
}

/**
 * 서버 날짜를 yyyyMMdd 형식으로 추출한다. strToken 값을 줄경우 해당 구분자를 삽입한다.
 * 
 * @param strToken -
 *            String - 구분자 값, "-"을 입력하면 yyyy-MM-dd 형태로 리턴 "년월일"로 입력시 yyyy년 MM월
 *            dd일 형태로 리턴
 * @returns {String} - 날짜형식의 문자열
 */
function util_getDate(strToken){

	var xhr = new XMLHttpRequest();
	
	/*
	 * if ((location.host).indexOf("localhost") == -1){
	 * xhr.open("POST",location.host, false); } else { xhr.open("POST",
	 * location.protocol + "//" + location.host, false); }
	
	
	xhr.open("POST", location.protocol + "//" + location.host, false);
	xhr.send(null);
	
	var dtServerDate = new Date(xhr.getResponseHeader("Date"));
	2013-05-23 강종철 
	아래 로직으로 수정합니다 
	 */
	
	 
	var dtServerDate =util_getServerTime();
	 
	
	var strYear = "" + dtServerDate.getFullYear();
	var strMonth = "" + (dtServerDate.getMonth() + 1);
	var strDay = "" + dtServerDate.getDate();
	
	if (strMonth.length == 1) {strMonth = "0" + strMonth;}
    if (strDay.length == 1) {strDay = "0" + strDay;}
    
    var strNextToken = "";
    if (util_chkReturn(strToken, "s") != ""){
    	if (strToken == "년월일"){
    		return strYear + "년 " + strMonth + "월 " + strDay + "일";
    	} else {
    		strNextToken = strToken;
    	}
    }
    
    return strYear + strNextToken + strMonth + strNextToken + strDay;
}

/**
 * 서버 시간 Object를 가져 옵니다
 */
function util_getServerTime(){
	var dtServerDate = null;
	/*
	 * 임시. 익스플로어에서 로컬 시간 사용.
	 */
	if(navigator.appName.indexOf("Microsoft")!=-1){
		
		dtServerDate = new Date();
		
	}else{
		var xhr = new XMLHttpRequest();
		var url = location.protocol + "//" +location.host;//+"/getTimeAjax.fpms";
		
		xhr.open("POST",url, false);
		//xhr.open("POST", location.protocol + "//" +location.host+"/products/common/saveWeblog.ajax", false);
		
		//xhr.open("POST", location.host+"?inflow="+inflow, false);
		
		xhr.send(null);
		
		dtServerDate = new Date(xhr.getResponseHeader("Date"));
		
	}
	
	return dtServerDate;
}

/**
 * 입력된 data가 null, undefined 인지 체크 판단하여 key 값에 따른 값을 리턴한다.
 * 
 * @param data
 *            체크할 data
 * @param strReKey
 *            입력안할 경우 : 정상일경우 true, 비정상일 경우 false b : 정상일 경우 true, 비정상일 경우 false
 *            s : 정상일 경우 입력된 data 반환, 비정상일 경우 빈스트링 반환 n : 정상일 경우 입력된 data 반환,
 *            비정상일 경우 0 반환
 * @param returnData
 *            비정상일경우 리턴할 data
 * @param rePlusEnd -
 *            String - 접미어 설정 strReKey 값이 "s"일경우 입력된 값이 정상일 경우 접미어를 붙여서 리턴
 *            비정상이거나 빈스트링일 경우 returnData 값을 리턴
 */
function util_chkReturn(data, strReKey, returnData, rePlusEnd) {
	
	var strType = jQuery.type(data);
	var bCheck = true;
	var bReturnData = true;
	var bRePlusEnd = false;
	var strRePlusEnd = "";
	
	if (strType == "null" || strType == "undefined") {
			bCheck = false;
	}
	
	if (jQuery.type(returnData) == "null" || jQuery.type(returnData) == "undefined"){
		bReturnData = false;
	}
	
	strType = jQuery.type(strReKey);
	
	if (strType == "null" || strType == "undefined" || strReKey == "b" || strReKey == "") {
		return bCheck;
	}
	
	if (rePlusEnd != null && rePlusEnd != undefined) {
		bRePlusEnd = true;
		strRePlusEnd = rePlusEnd;
	}
	
	if (bCheck == true) {
		if (strReKey == "s"){
			if (bRePlusEnd == true && data == ""){
				return returnData;
			} else if (bRePlusEnd == true){
				return data + strRePlusEnd;
			} else {
				if (data == "" && bReturnData == true){
					return returnData;
				} else {
					return data + "";
				}
				
			}
		} else {
			return data;
		}
	} else {
		if (strReKey == "s") {
			if (bReturnData){
				return returnData;
			} else {
				return "";
			}
		} else if (strReKey == "n") {
			if (bReturnData){
				return returnData;
			} else {
				return 0;
			}
		}
	}
	
	return bCheck;
}


/**
 * jQuery 확장 브라우저별 호환이 안되는 기능에 대해 직접 구현하여 jQuery에 확장하여 사용할 경우 추가되는 부분
 * 
 */

jQuery.extend({
	// JSON.stringify구현 JSON.Stringify 5대 브라우저 호환용
	stringify  : function stringify(obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			if (t == "string") obj = '"' + obj + '"';
			return String(obj);        
		} else {
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n];                
				t = typeof(v);
				if (obj.hasOwnProperty(n)) {
					if (t == "string") v = '"' + v.replace(/"/g,"\\\"").replace(/'/g,"\\\'") + '"'; // " 또는
																									// '
																									// 입력시
																									// json이
																									// 깨지는
																									// 문제
																									// 처리
					else if (t == "object" && v !== null) 
						v = jQuery.stringify(v);                    
					json.push((arr ? "" : '"' + n + '":') + String(v));                
				}            
			}            
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}    
	},
	// JSON.parse구현 JSON.parse 5대 브라우저 호환용
	parse  : function parse(str) {
		// 이곳에서 에러가 발생할 경우 대부분 입력값이 잘못된경우입니다.
		// 해당 스트링을 JSON.parse해보시고 같은 에러가 발생한다면 화면에서 수정해주세요
		if(typeof(str) != 'string' || (str.substring(0,1) != "{" && str.substring(0,1) != "[")){
			console.log("입력하신 데이터는 " + String(typeof(str)) + "타입이며 parsing이 불가능 합니다. json객체 타입의 문자열을 입력하세요 " +
					"\n 예상되는 이유 1: 통신에러, 네비게이터 에러시 결과가 HTML형식으로 나올경우 " +
					"\n 예상되는 이유 2: 넣어준 값이 undefined거나 일반 스트링이나 일반 오브젝트일 경우" +
					"\n 해당 내용에 로그를 찍어서 확인하시고 화면에서 수정하시면 됩니다." +
					"\n 입력하신 스트링 :" + str);
			return str;
		}
		return eval("(" + str + ")");
	},
	// Object.keys구현 Object.keys 5대 브라우저 호환용
	keys  : function keys(obj) {
		var arr = new Array();
		for(var item in obj){
			arr[arr.length] = item;
		}
		return arr;
	},
	// jQuery의 remove가 IE구버전에서 하위 엘리멘탈만 삭제하는 경우가 있음.
	// 본 함수는 JQuery.remove("id"); 로 사용하는 javascript 기반이다.
	// object 형식의 엘리먼트에 id가 있다면 처리할 수 있도록 수정 - 20130122 정헌태
	remove : function remove(strId) {
		if (util_chkReturn(strId, "s") != ""){
			if (jQuery.type(strId) == "object"){
				if (util_chkReturn(strId.attr("id"), "s") != ""){
					strId = strId.attr("id");
				}
			}
			
			var oPopForm = document.getElementById(strId);
			
			if (util_chkReturn(oPopForm, "s") == ""){
				return;
			} else {
				oPopForm.parentNode.removeChild(oPopForm);
			}
		} else {
			alert("jQuery.remove() : 잘못된 값으로 해당 function을 호출하였습니다.#1");
		}
	},
	// 특정 엘리먼트의 ID를 넘겨주면 그 하위 엘리먼트를 삭제한다.
	removeChild : function removeChild(tagId){
		if (util_chkReturn(tagId, "s") == ""){
			return ;
		}
		
		var elemId = "";
		
		if (jQuery.type(tagId) == "object"){
			if (util_chkReturn(tagId.attr("id"), "s") != ""){
				elemId = tagId.attr("id");
			}
		} else {
			elemId = tagId;
		}
		
		var elem = document.getElementById(elemId); 
		
		if (util_chkReturn(elem, "s") != ""){
			while (elem.hasChildNodes()){
				elem.removeChild(elem.lastChild );
			}
		} else {
			return;
		}
	} 
})

/**
 * JSONObject 연결. JSON객체를 연결하여 반환한다. 두개의 JSON객체를 연결하여 반환
 * 
 * @param :
 *            jsonObject1, jsonObject2, jsonObject3, ...
 * @ex : util_concatObj(jsonObject1, jsonObject2, jsonObject3, ... );
 */
function util_concatObj(){
	var argElmt = util_concatObj.arguments;
	var arglen 	= argElmt.length;
	
	// 타입검사
	for(var i=0; i<arglen; i++){
		if(typeof argElmt[i] != "object"){
			alert("util_concatObj : 입력하신 데이터는 객체타입이 아닙니다. 입력값을 확인하세요.#2");
			return {};
		}
	}
	
	var returnObj = {};
	
	for(var i=0; i<arglen; i++){
		var obj = argElmt[i];
		for(var item in obj){
			returnObj[item] = obj[item];
		}
	}
	
	return util_copyObj(returnObj);
}

/**
 * JSONObject 복사. JSON객체를 복사하여 반환한다. 화면에서 objCutData를 생성하여 화면에 그려주는 경우 등 오브젝트
 * 자체를 복사할 경우 사용합니다
 * 
 * @param :
 *            jsonObject
 * @ex : util_copyObj(jsonObject);
 */
function util_copyObj(obj){
	if(typeof obj == "object"){
		return jQuery.parse(jQuery.stringify(obj));
	}
	console.log("util_copyObj : 입력하신 데이터는 객체타입이 아닙니다. 입력값을 확인하세요.#1");
	return obj;
}

/**
 * 계좌번호 마스킹 처리(중간 3자리)
 */
function maskingActNo(actNo) {
 if(actNo.length == 12) {
  actNo = actNo.substr(0, 6) + "***" + actNo.substr(9, 3);
 }
 else if(actNo.length == 13) {
  actNo = actNo.substr(0, 7) + "***" + actNo.substr(10, 3);
 }
 return actNo;
} 
 

/**
 * 계좌번호 포맷팅(12자리:000-00-000000-0 / 13자리:000-0000-0000-00)
 */
function transActNo(actNo) {
 if(actNo.length == 12) {
  actNo = actNo.substr(0, 3) + "-" + actNo.substr(3, 2) + "-" + actNo.substr(5, 6) + "-" + actNo.substr(11, 1);
 }
 else if(actNo.length == 13) {
  actNo = actNo.substr(0, 3) + "-" + actNo.substr(3, 4) + "-" + actNo.substr(7, 4) + "-" + actNo.substr(11, 2);
 }
 return actNo;
}
