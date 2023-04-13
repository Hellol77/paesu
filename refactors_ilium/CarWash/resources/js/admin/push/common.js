/**
 *  common.js version 1.0
 *
 */



/**
 * yyyyMMdd 타입의 날짜를 받아 년,월,일에 날자를 더하거나 뺀다. 변수 strReType에 'n'을 세팅하면 int형으로 리턴한다.
 * 
 * @param strDate - String - yyyyMMdd 형태의 날짜 스트링
 * @param strType - String - 더하거나 뺄 곳, 년: "y", 월: "m", 일: "d"
 * @param nValue - Intger - 더하건 뺄 값
 * @param strReType - String - 입력하지 않거나 빈스트링일경우 문자형 리턴, "n"등 입력할경우 int형 리턴
 * @returns 문자열 혹은 number 형 yyyyMMdd 리턴
 */
function setCalendar(strDate, strType, nValue, strReType){
	 
	var nYear = parseInt(strDate.substring(0, 4), 10);
	var nMonty = parseInt(strDate.substring(4, 6) - 1, 10);
	var nDate =  parseInt(strDate.substring(6, 8), 10);
	
	if (strType == "y"){
		nYear = nYear + nValue;
	} else if (strType == "m"){
		nMonty = nMonty + nValue;
	} else if (strType == "d"){
		nDate = nDate + nValue;
	}
	
	var dtInDate = new Date(nYear, nMonty, nDate);
	var strYear = "" + dtInDate.getFullYear();
	var strMonth = "" + (dtInDate.getMonth() + 1);
	var strDay = "" + dtInDate.getDate();
	
	if (strMonth.length == 1) {strMonth = "0" + strMonth;}
    if (strDay.length == 1) {strDay = "0" + strDay;}
	
    return strYear + strMonth + strDay;
}

//select 값의 value를 바로 아래 input의 value로 전달
function comboValueToInputValue(el){
	$(el).next("input").val(el.options[el.selectedIndex].value);
}

/** yyyyMMdd 타입의 날짜를 받아 년,월,일에 구분자를 넣어 반환
* 
* @param date - String - yyyyMMdd 형태의 날짜 스트링
* @param inChar - String   yyyy-mm-dd 형태의 날짜 
* @returns 문자열 혹은 number 형 yyyyMMdd 리턴
*/
function preView_dateSet(date, inChar) {
	var svalue = date;
	var syear = svalue.substring(0,4);
	var smonth = svalue.substring(4,6);
	var sdate = svalue.substring(6,8);
	var startDate = syear+""+inChar+""+smonth+""+inChar+""+sdate;
	return startDate;
}

function replaceDate(str){
	str = str.replace(/-/g,"");
	return str;
}
//select option 시/분/초 value 지정
$(function() {
	for (var i=1; i<=24; i++) {
		if(i<10) i = "0" + i;
		option = $("<option/>").attr("value", i).html(i);
		option.appendTo($(".cnt24"));
	}
	for (var i=0; i<=59; i++) {
		if(i<10) i = "0" + i;
		option = $("<option/>").attr("value", i).html(i);
		option.appendTo($(".cnt60"));
	}
});

function checkString(str,id){ //특수문자 제거  onKeyUp="checkString(this.value,'push_adrbok_group_nm');"
	
	var special_pattern=/['~!@#$%^&*\\\'\";:\/?]/gi;
	if(special_pattern.test(str) == true){
		alert("특수문자는 사용할수 없습니다.");
		str = str.replace(special_pattern,"");
		eval("$('#"+id+"')").val(str);
		return false;
	}
	
}

function checkUrlString(str,id){ //url 특수문자 제거  onKeyUp="checkString(this.value,'push_adrbok_group_nm');"
	
	var special_pattern=/['~!@#$%^*\\\'\";]/gi;
	if(special_pattern.test(str) == true){
		alert("특수문자는 사용할수 없습니다.");
		str = str.replace(special_pattern,"");
		eval("$('#"+id+"')").val(str);
		return false;
	}
	
}
/**
 * <pre>
 * 숫자포멧 
 * ex) 123456 -> 123,456
 * </pre>
 * @param str : 포멧대상 문자열
 * @param ignoreCheck : 잘못된금액 체크여부(기본값: false)
 * @return 포멧된 문자열
 */
function getFormatNumber(s, ignoreCheck) {
	var str = s.replace(/\D/g, "");
	if (str == "0") {
		return str;
	}
	if (ignoreCheck == null || ignoreCheck == undefined) {
		ignoreCheck = false;
	}
	var len = str.length;
	var tmp = "";
	var tm2 = "";
	var i = 0;
	if (ignoreCheck) {
		if (str.charAt(i) == '0') {
			alert('잘못된 숫자 입력입니다.\n확인 후 다시 입력해 주시기 바랍니다.');
			return '';
		}
	} else {
		while (str.charAt(i) == '0') {
			i++;
		}
	}
	str = str.substring(i, len);
	len = str.length;
	
	if (len < 3) {
		return str;
	} else {
		var sit = len % 3;
		if (sit > 0) {
			tmp = tmp + str.substring(0, sit) + ',';
			len = len - sit;
		}
		while (len > 3) {
			tmp = tmp + str.substring(sit, sit + 3) + ',';
			len = len - 3;
			sit = sit + 3;
		}
		tmp = tmp + str.substring(sit, sit + 3) + tm2;
		str = tmp;
	}
	return str;
}

/**
 * 입력 값에 스크립트 형식이 있는지 검사 
 * @param str
 * @returns {Boolean}
 */
function checkInputScript(str) {
	var pattern = /<(no)?script[^>]*>.*?<\/(no)?script>/;
	var match = str.match(pattern);
	var result; 
	if(match ==null){ 
		result = false;
	}else {
		result = true;
	}
	return result;
}


/**
 * 전화번호 입력시 특수문자 제거 
 * @param str : this.value
 * @param id  : call input id 
 * @returns {Boolean}
 */
function cknum(str,id){ //숫자외의 문자제거  
		str = str.replace(/[^0-9]/g, '');
		if(str.length > 11) {
			str = str.substring(0,11);
		}
		eval("$('#"+id+"')").val(str);
		return false;	
}
