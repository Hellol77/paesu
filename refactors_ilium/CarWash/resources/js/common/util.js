/*****************************************************************************
 * 파일명 : util.js
 * 작성일 : 2014. 04. 06
 * 작성자 : YeongTak, Jeong
 * 설   명 : 공통 Util, Cookie 등
 * ===========================================================================
 * 변경이력:
 * DATE				AUTHOR		DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/


(function($){

})(jQuery);


var util = {
	reDigit : /^\d+$/,
	reBnji : /^\d+(\-\d+)?$/,
	reEngName : /^[a-zA-Z. ]+$/,
	reSignedInteger : /^[+|-]?\d+$/,
	reInteger : /^\d+$/,
	reAlphabetic : /^[a-zA-Z]+$/,
	reAlphanumeric : /^[a-zA-Z0-9]+$/,
	reEmail : /^.+\@.+\..+$/,
	reUpperAlphanumeric : /^[A-Z0-9]+$/,
	reLowerAlphanumeric : /^[a-z0-9]+$/,
	reNumeric : /^[0-9]+$/,
	reSignedDigit : /^[+|-]?[\d.|\d]+$/,


    /**
     * 쿠키에 저장된 값을 반환한다.
     * @param name 쿠키 이름
     * @return 쿠키 이름에 대한 값을 반환. 없는 경우에는 ""를 반환.
     */
	getCookie : function(/*String*/name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg) {
                return cookie.getCookieVal(j);
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return "";
	},

    /**
     * 쿠키를 저장한다.
     * @param name 쿠키 이름
     * @param value 쿠키 값
     * @param expires 쿠키의 유효 일
     * @param path
     * @param domain
     * @param secure
     */
	setCookie : function(/*String*/name, /*String*/value, expires, path, domain, secure) {
        if (!path) {
            path = "/";
        }
        document.cookie = name + "=" + escape (value) +
                        ((expires) ? "; expires=" + expires : "") +
                        ((path) ? "; path=" + path : "") +
                        ((domain) ? "; domain=" + domain : "") +
                        ((secure) ? "; secure" : "");
	},

    /**
     * 쿠키를 삭제한다.
     * @param name 삭제할 쿠키 이름
     * @param path
     * @param domain
     */
	deleteCookie : function(/*String*/name, path, domain) {
        if (!path) {
            path = "/";
        }
        if (cookie.getCookie(name)) {
            document.cookie = name + "=" +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
	},

    /**
     * 쿠키를 저장할 때 필요한 적합한 형식의 유효기간을 반환한다.
     * @param days 쿠키가 유효할 일 (예를 들어 3 일 동안 유효해야 하면 3을 입력)
     * @param hours 쿠키가 유효할 시간 (예를 들어 2 시간 동안 유효해야 하면 2를 입력)
     * @param minutes 쿠키가 유효할 분 (예를 들어 30 분 동안 유효해야 하면 30을 입력)
     */
    getExpDate : function(days, hours, minutes) {
        var expDate = new Date( );
        if (typeof days == "number" && typeof hours == "number" && typeof hours == "number") {
            expDate.setDate(expDate.getDate( ) + parseInt(days));
            expDate.setHours(expDate.getHours( ) + parseInt(hours));
            expDate.setMinutes(expDate.getMinutes( ) +
            parseInt(minutes));
            return expDate.toGMTString( );
        }
    },

    /**
     * 쿠키 값을 읽을 때 사용하는 보조 함수
     * @param {Object} offset
     */
    getCookieVal :  function(offset) {
        var endstr = document.cookie.indexOf (";", offset);
        if (endstr == -1) {
            endstr = document.cookie.length;
        }
        return unescape(document.cookie.substring(offset, endstr));
    },

    /**
     * <pre>
     * 폼필드 오브젝트의 종류와 상관없이 주어진 값을 주어진 이름의 객체에 할당
     * util_cfModifyObjValue와 차이점은 selectbox에 값을 할당할 때 해당값으로 selected되도록 함.
     * Text필드에 할당하는 것은 동일
     * </pre>
     * @param objFormField : 오브젝트
     * @param sValue : 특정값
     * @param isNonReset : 값이 없을 경우 초기화 여부
     * @return  
     */
    setObjValue : function(objFormField, sValue, isNonReset) {
    	if (objFormField.type == "select-one") {
    		var isSelected = false;
    		for ( var i = 0; i < objFormField.options.length; i++) {
    			if (objFormField.options[i].value == sValue) {
    				objFormField.options[i].selected = true;
    				isSelected = true;
    			}
    		}
    		if (!isSelected && isNonReset) {
    			objFormField.options[0].selected = true;
    		}
    	} else if (objFormField.type == "text") {
    		objFormField.value = sValue;
    	}
    },

    /**
     * <pre>
     * 특정문자열에서 정규식에 해당하는 문자 제거
     * </pre>
     * @param str1 : 문자열
     * @param rexp : 제거해야 할 문자 정규식
     * @return
     */
    removeChar : function(str, rexp) {
        var str2 = "";
        for (var i = 0; i < str.length; i++) {
            if (!rexp.test(str.charAt(i))) {
                str2 += str.charAt(i);
            }
        }
        return str2;
    },

	/**
	 * 입력값이 한글인지 여부 판별
	 */
	isHangul : function(value) {
		var strarr = new Array(value.length);
		var schar = new Array('/', '.', '>', '<', ',', '?', '}', '{', ' ', '\\', '|', '(', ')', '+', '=');
		var flag = true;
		var i, j;
		for (i = 0; i < value.length; i++) {
			for (j = 0; j < schar.length; j++) {
				if (schar[j] == value.charAt(i)) {
					flag = false;
				}
			}
			strarr[i] = value.charAt(i);
			if ((strarr[i] >= 0) && (strarr[i] <= 9)) {
				flag = false;
			} else if ((strarr[i] >= 'a') && (strarr[i] <= 'z')) {
				flag = false;
			} else if ((strarr[i] >= 'A') && (strarr[i] <= 'Z')) {
				flag = false;
			} else if ((escape(strarr[i]) > '%60') && (escape(strarr[i]) < '%80')) {
				flag = false;
			}
		}
		if (flag) {
			return true;
		} else {
			return false;
		}
	},
	
	/**
	 * 입력값이 이메일 형식인지 여부 체크
	 */
	isEmail : function(value) {
		/* 체크사항 
		- @가 2개이상일 경우 
		- .이 붙어서 나오는 경우 
		-  @.나  .@이 존재하는 경우 
		- 맨처음이.인 경우 
		- @이전에 하나이상의 문자가 있어야 함 
		- @가 하나있어야 함 
		- Domain명에 .이 하나 이상 있어야 함 
		- Domain명의 마지막 문자는 영문자 2~4개이어야 함 
		*/ 
		var check1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;
		var check2 = /^[a-zA-Z0-9\-\.\_]+\@[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4})$/;
		if (!check1.test(value) && check2.test(value)) {
			return true;
		} else {
			return false;
		}
	},

	/**
	 * 입력값이 휴대폰번호 형식인지 여부 판별
	 */
	isHPNo : function( strValue ) {
		var rgEx = /[01](0|1|6|7|8|9)[-](\d{4}|\d{3})[-]\d{4}$/g;
		var chkFlg = rgEx.test(strValue);
		if (!chkFlg) {
			return false;
		}
		if (strValue.length < 10) {
			return false;
		}
		return true;
	},
	
	isHPNo2 : function( strValue ) {
		var rgEx = /[01](0|1|6|7|8|9)(\d{4}|\d{3})\d{4}$/g;
		var chkFlg = rgEx.test(strValue);
		if (!chkFlg) {
			return false;
		}
		if (strValue.length < 10) {
			return false;
		}
		return true;
	},
	
	/**
	 * 입력값이 숫자인지 여부 판별
	 */
	isNumeric : function(value) {
		var pattern = /^[0-9]+$/;
		return (pattern.test(value)) ? true : false;
	},

	/**
	 * 입력값이 영문자인지 여부 판별
	 */
	isAlphabat : function(value) {
		var pattern = /^[a-zA-Z]+$/;
		return (pattern.test(value)) ? true : false;
	},

	/**
	 * 입력값이 영문소문자인지 여부 판별
	 */
	isSmallAlphabat : function(value) {
		var strarr = new Array(value.length);
		var flag = true;
		for (var i = 0; i < value.length; i++) {
			strarr[i] = value.charAt(i);
			if (!((strarr[i] >= 'a') && (strarr[i] <= 'z'))) {
				flag = false;
			}
		}
		if (flag) {
			return true;
		} else {
			return false;
		}
	},

	/**
	 * 입력값이 전화번호 형식인지 여부 판별
	 */
	isPhoneNumberCheck : function(pNumber) {
		var reg = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;		
		return reg.test(pNumber);
	},

	/**
	 * 입력값이 날짜 형식인지 여부 판별(yyyyMMdd)
	 */
	isDate : function( dateStr ) {
		if (dateStr == null || dateStr == undefined || dateStr == "" || dateStr.length < 8) {
			return false;
		}
		dateStr = dateStr.replace(/-/gi, "");
		
		var year = Number(dateStr.substr(0, 4));
		var month = Number(dateStr.substr(4, 2));
		var day = Number(dateStr.substr(6, 2));
		
		if (month < 1 || month > 12) { // check month range
			return false;
		}
		if (day < 1 || day > 31) {
			return false;
		}
		if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
			return false;
		}
		if (month == 2) { // check for february 29th
			var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
			if (day > 29 || (day == 29 && !isleap)) {
				return false;
			}
		}
		
		return true;
	},

	/**
	 * parameter string을 JSON Object로 변환
	 */
	serializeToObject : function(data) {
		if (typeof(data) == 'string') {
			var paramsArray = data.split('&');
			var paramsObj = {};
			for ( var i = 0; i < paramsArray.length; i++) {
				var pair = paramsArray[i].split('=');
				if (pair[0]) {
					var key = decodeURIComponent(pair.shift());
					var value = pair.length > 1 ? pair.join('=') : pair[0];
					if (value != undefined) {
						value = decodeURIComponent(value);
					}
					paramsObj[key] = value;
				}
			}
			return paramsObj;
		}
		return data;
	}
};
