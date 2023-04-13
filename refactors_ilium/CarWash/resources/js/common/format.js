/*****************************************************************************
 * 파일명 : format.js
 * 작성일 : 2014. 04. 06
 * 작성자 : YeongTak, Jeong
 * 설   명 : 날짜, 금액, 숫자, 주민등록번호/사업자번호, 계좌 포멧
 * ===========================================================================
 * 변경이력:
 * DATE				AUTHOR		DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/


(function($){

})(jQuery);


var format = {
	/**
	 * <pre>
	 * String.format 구현
	 * 
	 * 예) format.stringFormat("{0}는 {1}이다.", param1, param2);
	 * 결과) param1는 param2이다.
	 * </pre>
	 */
	stringFormat : function(str) {
		for(var i = 1; i < arguments.length; i++) {
			var re = new RegExp("\\{" + (i - 1) + "\\}", "g");
			str = str.replace(re, arguments[i]);
		}
		return str;
	},

	/**
	 * <pre>
	 * 날짜 시간 포멧 
	 * ex) 20130101 -> 2013-01-01
	 *     20130101120101 -> 2013-01-01 12:01:01
	 * </pre>
	 * @param strDate : 포멧대상 문자열
	 * @return 포멧된 문자열
	 */
	getDateTypeFormat : function(strDate, separator) {
		if (!separator) {
			separator = "-";
		}
	    var strChangeDate = "";
		if (strDate.length == 8) {
			strChangeDate = strDate.substring(0, 4) + separator + strDate.substring(4, 6) + separator + strDate.substring(6, 8);
		} else if (strDate.length == 14) {
			strChangeDate = strDate.substring(0, 4) + separator + strDate.substring(4, 6) + separator + strDate.substring(6, 8) + " " + strDate.substring(8, 10) + ":" + strDate.substring(10, 12) + ":" + strDate.substring(12, 14);
		}
		return strChangeDate;
	},

	/**
	 * <pre>
	 * 숫자포멧 
	 * ex) 123456 -> 123,456
	 * </pre>
	 * @param str : 포멧대상 문자열
	 * @param ignoreCheck : 잘못된금액 체크여부(기본값: false)
	 * @return 포멧된 문자열
	 */
	getFormatNumber : function(s, ignoreCheck) {
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
	},

	/**
	 * <pre>
	 * 숫자에서 콤마 등 특수문자 제거 ( 소숫점, 마이너스기호 제외 )
	 * </pre> 
	 * @param str : 포멧대상 문자열
	 * @return 포멧된 문자열
	 */
	getNumberUnformat : function(str) {
		var temp = "";
		var afterStr = str + '';
		var len = afterStr.length;
		var pos = 0;
		var ch = '';
		while (pos < len) {
			ch = afterStr.charAt(pos);
			if (((ch >= '0') && (ch <= '9')) || (ch == '-') || (ch == '.')) {
				temp = temp + ch;
			}
			pos = pos + 1;
		}
		return temp;
	},

	/**
	 * <pre>
	 * 숫자를 제외한 문자 제거
	 * </pre> 
	 * @param str : 포멧대상 문자열
	 * @return 포멧된 문자열
	 */
	getOnlyNumFormat : function(str) {
		var temp = "";
		var afterStr = str;
		var len = afterStr.length;
		var pos = 0;
		var ch = '';
		while (pos < len) {
			ch = afterStr.charAt(pos);
			if (((ch >= '0') && (ch <= '9'))) {
				temp = temp + ch;
			}
			pos = pos + 1;
		}
		return temp;
	},

	/**
	 * 카드번호 중간 4자리 *표 표시
	 * <pre>
	 * "1234-5678-****-1234" = formatCardNoWithAsterisk("1234567856781234");
	 * "1234-5678-****-1234" = formatCardNoWithAsterisk("1234-5678-5678-1234");
	 * </pre>
	 */
	formatCardNoWithAsterisk : function( cardNo ) {
		if (cardNo != null && cardNo.length == 16) {
			cardNo = cardNo.substring(0, 4) + "-" + cardNo.substring(4, 8) + "-****-" + cardNo.substring(12, 16);
		}
		return cardNo;
	},

	/**
	 * 전화번호의 마지막 번호를 마스킹.
     * <p>
     * 뒷 4자리 마스킹 처리<br>
     * 입력값이 형식에 안 맞으면 "" 값을 리턴한다.
     * <pre>
     * ex) 010-1111-2222 -> 010-1111-****
     * </pre>
	 */
	formatPhoneNumberWithAsterisk : function( phoneNumber ) {
		if (phoneNumber == null || phoneNumber.length <= 4) {
			return '';
		}
		return phoneNumber.substring(0, phoneNumber.length - 4) + "****";
	}
};
