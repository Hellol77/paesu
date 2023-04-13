/*****************************************************************************
 * 파일명 : popup.js
 * 작성일 : 2014. 04. 06
 * 작성자 : YeongTak, Jeong
 * 설   명 : 공통 namespace  및 전역상수 정의
 * ===========================================================================
 * 변경이력:
 * DATE				AUTHOR		DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/


(function($){

})(jQuery);


var popup = {
	LAYER_ID : 'LAYER_POPUP_DIV',
	CHILD_UD : 'CHILD_POPUP_DIV',
	FOCUS_LAYER_ID : null,
	FOCUS_CHILD_ID : null,

	/**
	 * 팝업 호출을 위한 레이어 영역을 출력
	 * @param objId
	 */
	createLayer : function(objId) {
		var targetObj = $('body');
		if (objId == null || objId == undefined) {
			objId = popup.LAYER_ID;
		} else {
			targetObj = $('#' + popup.LAYER_ID);
		}
		var html = '';
		html += '<div id="' + objId + '" class="mfp-hide">';
		html += '</div>';

		var objForm = document.getElementById(objId);
		if (objForm == null || objForm == undefined || typeof (objForm) != 'object') {
			targetObj.append(html);
		}
		return $('#' + objId);
	},

	/**
	 * 팝업 호출을 위한 레이어 영역이 생성되어 있는지 여부
	 * @param objId
	 */
	isCreateLayer : function(objId) {
		if (objId == null || objId == undefined) {
			objId = popup.LAYER_ID;
		}
		var objForm = document.getElementById(objId);
		return (objForm == null || objForm == undefined || typeof(objForm) != 'object' ? false : true);
	},

	/**
	 * 레이어 팝업 호출
	 * @param targetpath
	 * @param param
	 * @param option
	 */
	openLayerPopup : function(targetpath, param, option) {
		var _this = popup.createLayer();

		if (option && option.width) {
			_this.css("max-width", option.width);
		} 
		if (option && option.height) {
			_this.css("min-height", option.height);
		}

		// 현재 포커스 저장
		popup.FOCUS_LAYER_ID = $('*:focus');

		return _this.navigate(targetpath, param, option).done(function(){
			// 팝업 옵션 설정
			var _option = $.extend({
				closeOnBgClick : false,
				closeBtnInside: false, 
				showCloseBtn: false,
				modal : false,
				overflowY: 'auto', // Y일경우 팝업 전체 스크롤(기본값: auto)
				tClose : '닫기',
				tLoading : '로딩중...',
				items : {
					src : _this
				},
				type : 'inline'
			}, option);
			$.magnificPopup.open(_option, 0);

			_this.find('.btn-close').bind('click', popup.closeLayerPopup );
			_this.find('.mfp-close').unbind().bind('click', popup.closeLayerPopup );

			// 포커스를 레이어팝업으로 이동
			_this.children().focus();
			
		});
	},

	/**
	 * 레이어 팝업 닫기
	 */
	closeLayerPopup : function() {
		if (!popup.isCreateLayer()) {
			return false;
		}

		$.magnificPopup.close();
		$('#'+popup.LAYER_ID).remove();

		// 저장된 포커스로 이동
		if (popup.FOCUS_LAYER_ID != null) {
			popup.FOCUS_LAYER_ID.focus();
			popup.FOCUS_LAYER_ID = null;
		}
		return false;
	},

	/**
	 * <pre>
	 * 윈도우 팝업 호출
	 * 
	 * (사용예)
	 * popup.openWindowPopup('IPMS0051R.do', $('#f1'), {'width':'500px', 'height':'400px', 'scrollbars':'yes'});
	 * popup.openWindowPopup('IPMS0051R.do', {'acno':'계좌번호'}, {'width':'500px', 'height':'400px', 'scrollbars':'yes'});
	 * </pre>
	 * @param {Object} 
	 * @param {String} path : 이동하고자 하는 경로값
	 * @param {Object} param : 페이지 전환시 다음 페이지로 넘기고자 하는 파라메터 값(FORM or JSON)
	 * @param {JSON} option : window.open API의 specs
	 */
	openWindowPopup : function(path, param, option) {
		// option의 기본값
		var settings = {
			width : 250,
			height : 250,
			location : 'no',
			menubar : 'no',
			toolbar : 'no',
			scrollbars : 'no',
			status : 'no',
			resizable : 'no',
			titlebar : 'no'
		};

		// window.open 옵션 설정
		var _option = $.extend({}, settings, option || {});
		var _param = null;
		if (param && $(param).length > 0 && $(param)[0].tagName == 'FORM') {
			_param = param;
		}
		var _target = path.split('.')[0];
		if (_target.indexOf('/') > -1) {
			_target = _target.substring(_target.lastIndexOf('/') + 1, _target.length);
		}
		var specs = '';
		if (_option && typeof _option == typeof {}) {
			for (var prop in _option) {
				specs += ('' + prop + '=' + _option[prop] + ', ');
			}
			specs = specs.substring(0, specs.length - 2);
		}

		// window open
		var ret = false;
		ret = window.open('', _target, specs);

		// 전송할 form param 셋팅
		var submitform = document.createElement('form');

		if (_param) {
			$.each([ 'action', 'enctype', 'acceptCharset' ], function(i, v) {
				if (v == 'action' && path) {
					return;
				}
				if ($(_param)[0][v] && $(_param)[0][v] != "null") {
					$(submitform).attr(v, $(_param)[0][v]);
				}
			});
		}
		if (_param && $(_param).length > 0 && $(_param)[0].tagName == 'FORM') {
			$(_param).find('input,select,textarea').clone().appendTo(submitform);	// 부모창 form의 input 태그가 사라지는 버그 수정
		}
		else if (param && typeof param == typeof {}) {
			for (var prop in param) {
				$('<input type="hidden" name="' + prop + '"/>').val(param[prop]).appendTo(submitform);
			}
		}

		// window에 form 전송
		if (ret) {
			$(submitform).attr("method", "POST");
			document.body.appendChild(submitform);

			submitform.action = path;
			submitform.target = _target;
			submitform.submit();
			document.body.removeChild(submitform);
		}

		return ret;
	}
};
