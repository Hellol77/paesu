/*****************************************************************************
 * 파일명 : validate.js
 * 작성일 : 2014. 04. 06
 * 작성자 : YeongTak, Jeong
 * 설   명 : Field Validation 관련 클래스 모음
 * ===========================================================================
 * 변경이력:
 * DATE				AUTHOR		DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/


(function($){
	/*
	 * 추가 메소드
	 */
	$.validator.addMethod("required_select", function(value, element, param) {
		if (!this.depend(param, element)) {
			return "dependency-mismatch";
		}
		if (element.nodeName.toLowerCase() === "select") {
			var val = $(element).val();
			return val && val.length > 0;
		}
		if (this.checkable(element)) {
			return this.getLength(value, element) > 0;
		}
		return $.trim(value).length > 0;
	}, "반드시 선택해야 하는 항목입니다.");

	$.validator.addMethod("fixedlength", function(value, element, param) {
	    if(this.getLength(value, element) != param) {
	        return false;
	    }
	    return true;
	}, $.validator.format("반드시 {0} 글자로 입력하십시오."));

	$.validator.addMethod("alphanumeric", function(value, element) {
		return this.optional(element) || /^\w+$/i.test(value);
	}, "영문자 혹은 숫자만 입력 가능합니다.");
	$.validator.addMethod("numalpha", function(value, element) {
		return this.optional(element) || /^\w+$/i.test(value);
	}, "영문자 혹은 숫자만 입력 가능합니다.");

	$.validator.addMethod("extension", function(value, element, param) {
		param = typeof param === "string" ? param.replace(/,/g, "|") : "png|jpe?g|gif";
		return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
	}, "이미지파일 확장자가 아닙니다.");

	$.validator.addMethod("alphabet", function(value, element) {
		var filter=/^[a-zA-Z]+$/;
		return this.optional(element) || filter.test(value);
	}, "영문자만 입력 가능합니다.");

	$.validator.addMethod("hangul", function(value, element) {
		var filter=/^[ㄱ-힣]+$/;
		return this.optional(element) || filter.test(value);
	}, "한글만 입력 가능합니다.");

	$.validator.addMethod("numhan", function(value, element) {
		var filter=/^[0-9ㄱ-힣]+$/;
		return this.optional(element) || filter.test(value);
	}, "숫자 또는 한글만 입력 가능합니다.");

	$.validator.addMethod("alphabethan", function(value, element) {
		var filter=/^[a-zA-Zㄱ-힣]+$/;
		return this.optional(element) || filter.test(value);
	}, "한글 또는 영문만 입력 가능합니다.");

	$.validator.addMethod("nospace", function(value, element) {
		return this.optional(element) || !/\s/g.test(value);
	}, "스페이스는 입력할 수 없습니다.");

	$.validator.addMethod("rangebyte", function(value, element, param) {
		var length = $.isArray( value ) ? value.length : $.validator.getByteLength($.trim(value), element);
		return this.optional(element) || ( length >= param[0] && length <= param[1] );
	}, $.validator.format("{0}에서 {1} byte 글자 사이로 입력하십시오."));

	$.validator.addMethod("maxbyte", function(value, element, param) {
		var length = $.isArray( value ) ? value.length : $.validator.getByteLength($.trim(value), element);
		return this.optional(element) || length <= param;
	}, $.validator.format("최대 {0} byte 글자까지 입력 가능합니다."));

	$.validator.addMethod("minbyte", function(value, element, param) {
		var length = $.isArray( value ) ? value.length : $.validator.getByteLength($.trim(value), element);
		return this.optional(element) || length >= param;
	}, $.validator.format("최소 {0} byte 글자 이상 입력하십시오."));

	$.validator.addMethod("numberFormat", function(value, element) {
		return true;
	}, "숫자만 입력 가능합니다.");

	/*
	 * Translated default messages for the jQuery validation plugin.
	 * Locale: KO (Korean; 한국어)
	 */
	$.extend($.validator.messages, {
		required: "반드시 입력해야 하는 항목입니다.",
		remote: "반드시 수정해야 하는 항목입니다.",
		email: "이메일 형식에 맞게 입력해 주십시오.",
		url: "URL 형식에 맞게 입력해 주십시오.",
		date: "날짜를 YYYY/MM/DD 형식에 맞게 입력해 주십시오.",
		dateISO: "올바른 날짜(ISO)를 입력해 주십시오.",
		number: "정수를 입력해 주십시오.",
		digits: "숫자만 입력 가능합니다.",
		creditcard: "신용카드 번호가 바르지 않습니다.",
		equalTo: "같은 값을 다시 입력하세요.",
		extension: "올바른 확장자가 아닙니다.",
		maxlength: $.validator.format("최대 {0}글자까지 입력 가능합니다."),
		minlength: $.validator.format("최소 {0}글자 이상 입력하십시오."),
		rangelength: $.validator.format("{0}에서 {1} 글자 사이로 입력하십시오."),
		range: $.validator.format("{0} 에서 {1} 사이의 값을 입력해 주십시오."),
		max: $.validator.format("{0} 이하의 값을 입력해 주십시오."),
		min: $.validator.format("{0} 이상의 값을 입력해 주십시오.")
	});

	/*
	 * 전체 소스의 Validator Rule 검색
	 */
	$.validator.setDefaults({
		onkeyup : false,
		onclick : false,
		onfocusout : false,
		onsubmit : false,
		ignoreTitle : true
	});

	$.extend($.validator, {
		getByteLength: function(value, element) {
		    var byteLen = 0;
			for (var i = 0; i < value.length; i++) {
				var c = value.charCodeAt(i);
				if (!((0xAC00 <= c && c <= 0xD7A3) || (0x3131 <= c && c <= 0x318E))) {
					byteLen++;
				} else {
					byteLen = byteLen + 2;
				}
			}
			return byteLen;
		},
		addCustomRules: function(element) {
			// [data-validate-rule], [data-validate-message] 필드의 속성을 찾아서 validator rule에 정의
			var rule = {};
			$.extend(rule, eval('(' + $(element).attr('data-validate-rule') + ')'));
			if ($(element).is('[data-validate-message]')) {
				$.extend(rule, {
					'messages' : eval("(" + $(element).attr('data-validate-message') + ")")
				});
			}
			$(element).rules('add', rule);
		}
	});

}(jQuery));


var validation = {
	/**
	 * <pre>
	 * 날짜간크기 체크
	 * date1이 date2보다 크면 false
	 * </pre>
	 * @param date1 : 비교날짜1
	 * @param date2 : 비교날짜2
	 * @return true/false
	 */
	checkDateNo : function(date1, date2) {
		var resultVar = false;
		var Int_data1 = parseInt(date1, 10);
		var Int_data2 = parseInt(date2, 10);
		if (Int_data1 > Int_data2) {
			resultVar = false;
		} else {
			resultVar = true;
		}
		return resultVar;
	},

	/**
	 * <pre>
	 * 주민등록번호/사업자번호 유효성체크 
	 * </pre>
	 * @param field : 주민등록번호/사업자번호 Field
	 * @return true/false
	 */
	checkRegNo : function(field) {
		var Data = field.value;
		var Length = Data.length;
		var Digit = 0;
		var Sum = 0;
		var Resident = ['2', '3', '4', '5', '6', '7', '8', '9', '2', '3', '4', '5'];
		if (Length == 10) {
			if (this.checkDigit(Data, Length) == false) {
				return false;
			} else {
				return true;
			}
		} else if (Length == 13) {
			if (this.checkDigit(Data, Length) == false) {
				return false;
			}
			for (var i = 0; i < 12; i++) {
				Sum += Data.charAt(i) * Resident[i];
			}
			Digit = 11 - (Sum % 11) % 10;
			if ((Sum % 11) % 10 == 0)
				Digit = 1;
			if ((Sum % 11) % 10 == 1)
				Digit = 0;
			if (Data.charAt(12) != Digit) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
		return true;
	},

	/**
	 * <pre>
	 * 해당달의 마지막일을 초과하였는지 체크하는 함수
	 * </pre>
	 * @param sYear : 년필드값
	 * @param sMonth : 달필드값
	 * @param sDay : 날필드값
	 * @param bCheckOk : 체크구분값
	 * @return true/false
	 */
	checkLastDay : function(sYear, sMonth, sDay, bCheckOk) {
		var res = true;
		var LastDay = date.getMaxDay(sYear, sMonth);
		if (sDay > LastDay) {
			if (!bCheckOk) {
				res = bCheckOk;
			}
		}
		return res;
	},

	/**
	 * 숫자여부 확인
	 * @param str : 입력문자
	 * @param len : 체크길이
	 * @return true/false
	 */
	checkDigit : function(str, length) {
		for (var i = 0; i < str.length; i++) {
			if (!util.reDigit.test(str.charAt(i))) {
				return false;
			}
		}
		return true;
	},

	/**
	 * 특수문자 있는지 확인(괄호 제외)
	 * @param str : 입력문자
	 * @param len : 체크길이
	 * @return true/false
	 */
	checkSpecialChar : function(ch) {
		if( ( ch == "~" ) || ( ch == "`" ) || ( ch == "!" ) || ( ch == "@" ) ||
			( ch == "#" ) || ( ch == "$" ) || ( ch == "%" ) || ( ch == "^" ) ||
			( ch == "&" ) || ( ch == "*" ) || ( ch == "-" ) || ( ch == "_" ) ||
			( ch == "+" ) || ( ch == "=" ) || ( ch == "|" ) || ( ch == "\\" ) ||
			( ch == "{" ) || ( ch == "}" ) || ( ch == "[" ) || ( ch == "]" ) ||
			( ch == ";" ) || ( ch == ":" ) || ( ch == "\"" ) || ( ch == "'" ) ||
			( ch == "<" ) || ( ch == ">" ) || ( ch == "," ) || ( ch == "." ) ||
			( ch == "?" ) || ( ch == "/" ) ) {
			return true;
		} else {
			return false;
		}
	},

	/**
	 * <pre>
	 * 입력문자에 영문과 숫자가 포함되는지 체크
	 * @param str : 입력문자
	 * @return 0/1/2
	 *         0 : Include alphabet and digits
	 *         1 : Not include alphabet
	 *         2 : Not include digits
	 * </pre>
	 */
	checkAlphabetAndDigits : function(str) {
		var alphabetValid = false;
		var digitsValid = false;
		for (var i = 0; i < str.length; i++) {
			if (!util.reDigit.test(str.charAt(i))) {
				alphabetValid = true;
			}
			if (!util.reAlphabetic.test(str.charAt(i))) {
				digitsValid = true;
			}
		}
		if (!alphabetValid) {
			return 1;
		} else if (!digitsValid) {
			return 2;
		} else {
			return 0;
		}
	},

	/**
	 * <pre>
	 * 입력필드 숫자 입력
	 * 
	 * (사용예)
	 * <input type="text" name="IchAmt" value="" title="금액 입력" onkeydown="return validation.onlyNumber(event);" />
	 * </pre>
	 */
	onlyNumber : function(ev) {
		ev = ev || window.event;
		var keyVal = ev.keyCode ? ev.keyCode : ev.which ? ev.which : ev.charCode;
		if ( !( (keyVal >= 112 && keyVal <= 123) // F1~F12
				|| keyVal == 8 // backspace
				|| keyVal == 9 // tab
				|| keyVal == 46 // delete
				|| (keyVal >= 35 && keyVal <= 40) // home,end
				|| (!ev.shiftKey && keyVal >= 48 && keyVal <= 57) // number on keyboard
				|| (!ev.shiftKey && keyVal >= 96 && keyVal <= 105)) ) { // number on keypad
			ev.cancelBubble = true;
			ev.returnValue = false;
			return false;
		}
		return true;
	},

	/**
	 * <pre>
	 * 입력필드 영문자 입력
	 * </pre>
	 */
	onlyAlphabet : function(ev) {
		ev = ev || window.event;
		var keyVal = ev.keyCode ? ev.keyCode : ev.which ? ev.which : ev.charCode;
		if ( !(ev.shiftKey || ev.ctrlKey || ev.altKey
				|| (keyVal >= 112 && keyVal <= 123) // F1~F12
				|| keyVal == 8 // backspace
				|| keyVal == 9 // tab
				|| keyVal == 46 // delete
				|| (keyVal >= 35 && keyVal <= 40) // home,end
				|| (keyVal >= 65 && keyVal <= 90) // A-Z
				|| (keyVal >= 97 && keyVal <= 122)) ) { // a-z
			ev.cancelBubble = true;
			ev.returnValue = false;
			return false;
		}
		return true;
	},
	
	/**
	 * <pre>
	 * 입력필드 영문자,숫자 입력
	 * </pre>
	 */
	onlyAlphaNumeric : function(ev) {
		ev = ev || window.event;
		var keyVal = ev.keyCode ? ev.keyCode : ev.which ? ev.which : ev.charCode;
		var isAlphaNumeric = (ev.ctrlKey || ev.altKey
				|| (keyVal >= 112 && keyVal <= 123) // F1~F12
				|| keyVal == 8 // backspace
				|| keyVal == 9 // tab
				|| keyVal == 46 // delete
				|| (keyVal >= 35 && keyVal <= 40) // home,end
				|| (!ev.shiftKey && keyVal >= 48 && keyVal <= 57) // number on keyboard
				|| (!ev.shiftKey && keyVal >= 96 && keyVal <= 105) // number on keypad
				|| (keyVal >= 65 && keyVal <= 90) // A-Z
				|| (keyVal >= 97 && keyVal <= 122)); // a-z
		if (isAlphaNumeric) {
			return true;
		} else {
			ev.cancelBubble = true;
			ev.returnValue = false;
			return false;
		}
	},

	/**
	 * 한글 종성체크
	 * @param str 문자열
	 * @return (0/1/2) : 0=unknown, 1=false, 2=true
	 */
	isJongSung : function(str) {
		var INDETERMINATE = 0;
		var NOJONGSONG = 1;
		var JONGSONG = 2;
		var word = new String(str); /* 숫자가 들어오는 등에 대비해 무조건 문자열로 바꿈 */
		var numStr1 = "013678lmnLMN"; /* '조' 전까지는 0이 받침이 있는걸로 나옴 --; */
		var numStr2 = "2459aefhijkoqrsuvwxyzAEFHIJKOQRSUVWXYZ";
		/* bdgpt들은 읽기에 따라 받침이 있기도 하고 없기도 한다고 판단. */
		/* 대문자는 단독으로 읽을 때를 감안하면 받침 있다고 확정되는 것이 더 적음. */
		if (word == null || word.length < 1) {
			return INDETERMINATE;
		}
		var lastChar = word.charAt(word.length - 1);
		var lastCharCode = word.charCodeAt(word.length - 1);
		if (numStr1.indexOf(lastChar) > -1) {
			return JONGSONG;
		} else if (numStr2.indexOf(lastChar) > -1) {
			return NOJONGSONG;
		}
		if (lastCharCode < 0xac00 || lastCharCode > 0xda0c) {
			return INDETERMINATE;
		} else {
			var lastjongseong = (lastCharCode - 0xAC00) % (21 * 28) % 28;
			if (lastjongseong == 0) {
				return NOJONGSONG;
			} else {
				return JONGSONG;
			}
		}
	},
	/**
	 * 한글 문자열의 종성을 체크한 결과 반환
	 * @param str 문자열
	 * @returns 종성을 포함한 문자열
	 */
	getJongSung : function(str) {
		var un0 = new Array("(은)는", "는", "은");
		return str + un0[validation.isJongSung(str)];
	},

	/**
	 * <pre>
	 * jQuery.validator의 설정값을 이용하여 키 입력의 onkeydown 자동 구현
	 * (적용 rule : digits, alphabet, numalpha, alphanumeric)
	 * 
	 * (사용예)
	 *   $(function() {
	 *     validation.initFormValidate($('#f'));
	 *   });
	 * </pre>
	 * @param frm : 폼 object
	 */
	initFormValidate : function(frm) {
		if (frm == null || frm == undefined || typeof(frm) != 'object') {
			return false;
		}

		// form 태그의 validate 초기화
		$(frm).validate();

		// validator rule의 특정 키 입력 제한을 위한 keydown 이벤트 추가
		$(frm).find('input, select, textarea').filter('[data-validate-rule]').not(":submit, :reset, :image, [disabled]")
		.each(function(i,elem) {
			// [data-validate-rule], [data-validate-message] 필드의 속성을 찾아서 validator rule에 정의
			$.validator.addCustomRules(elem);

			// 키 입력 keydown, blur 이벤트 추가
			var rule = $.extend({}, eval('(' + $(elem).attr('data-validate-rule') + ')'));
			if (rule && (rule.numberFormat || rule.digits || rule.alphabet || rule.numalpha || rule.alphanumeric)) {
				// 한글 입력 제한
				$(elem).css({'-webkit-ime-mode':'disabled', '-moz-ime-mode':'disabled', '-ms-ime-mode':'disabled', 'ime-mode':'disabled'});
				if (rule.numberFormat) { //입력폼의 숫자형 포멧팅
					$(elem).bind('click', function(){
						$(this).val( format.getNumberUnformat( $(this).val() ) );
					});
					$(elem).bind('blur', function(){
						if ($(this).val() == '') {
							$(this).val('0');
						}
						$(this).val( format.getFormatNumber( $(this).val() ) );
					});
				}
				else if (rule.numalpha || rule.alphanumeric) { //키 입력 keydown 이벤트 추가
					$(elem).bind('keydown', validation.onlyAlphaNumeric);
					$(elem).bind('blur', function(ev){
						$(this).val( util.removeChar($(this).val(), /[^a-zA-Z0-9]+$/) );
					});
				}
				else if (rule.alphabet) { //키 입력 keydown 이벤트 추가
					$(elem).bind('keydown', validation.onlyAlphabet);
					$(elem).bind('blur', function(ev){
						$(this).val( util.removeChar($(this).val(), /[^a-zA-Z]+$/) );
					});
				}
				else if (rule.digits) { //키 입력 keydown 이벤트 추가
					$(elem).bind('keydown', validation.onlyNumber);
					$(elem).bind('blur', function(ev){
						$(this).val( util.removeChar($(this).val(), /[^0-9]+$/) );
					});
				}
			}
		});
	},

	/**
	 * <pre>
	 * jQuery.validator를 이용한 FORM 체크
	 * 
	 * (사용예)
	 *   if (!validation.checkFormValidate($('#f'))) {
	 *     return false;
	 *   }
	 * </pre>
	 * @param frm : 폼 object
	 * @return true/false
	 */
	checkFormValidate : function(frm) {
		if (frm == null || frm == undefined || typeof(frm) != 'object') {
			return false;
		}
		var valid = $(frm).validate();
		if (!valid.checkForm()) {
			var elem = valid.errorList[0].element;
			var msg = valid.errorList[0].message;
			var alias = $(elem).attr('data-alias');
			if (alias != null && alias != undefined && alias != '') {
				alert( validation.getJongSung(alias) + ' ' + msg );
			} else {
				alert(msg);
			}
			if ($(elem).attr('type') != 'hidden') {
				$(elem).focus();
			}
			return false;
		}
		return true;
	},

	/**
	 * <pre>
	 * jQuery.validator를 이용한 Field 체크
	 * 
	 * (사용예)
	 *   if (!validation.checkFieldValidate($('#inputfield'))) {
	 *     return false;
	 *   }
	 * </pre>
	 * @param field : 필드 object
	 * @return true/false
	 */
	checkFieldValidate : function(field) {
		if (field == null || field == undefined || typeof(field) != 'object') {
			return false;
		}
		var valid = $(field.form).validate();
		if (!valid.check(field)) {
			var elem = valid.errorList[0].element;
			var msg = valid.errorList[0].message;
			var alias = $(elem).attr('data-alias');
			if (alias != null && alias != undefined && alias != '') {
				alert( validation.getJongSung(alias) + ' ' + msg );
			} else {
				alert(msg);
			}
			if ($(elem).attr('type') != 'hidden') {
				$(elem).focus();
			}
			return false;
		}
		return true;
	}
};
