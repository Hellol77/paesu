/*****************************************************************************
 * 파일명 : common.js
 * 작성일 : 2014. 04. 06
 * 작성자 : YeongTak, Jeong
 * 설   명 : 공통 namespace  및 전역상수 정의
 * ===========================================================================
 * 변경이력:
 * DATE				AUTHOR		DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/


$(document).ready(function() {

	var _loadingHtml = '<div id="INGSHOW" class="loading"></div><div id="SHOWBLOCK" class="loading_mask"></div>';
	if (jQuery(document.body).has('.loading').length == 0) {
		jQuery(_loadingHtml).appendTo(document.body).hide();
		jQuery('.loading_mask').css({
			'z-index': '900',
			'position': 'fixed',
			'top': '0',
			'left': '0',
			'width': '100%',
			'height': '100%'
		});
		jQuery('.loading').css({
			'z-index': '1000',
			'position': 'fixed',
			'top': '50%',
			'left': '50%',
			'width': '32px',
			'height': '32px',
			'margin': '-16px 0px 0px -16px',
			'background-image': 'url(/resources/images/ilium/loading.gif)',
			'background-repeat': 'no-repeat',
			'background-position': 'center center'
		});
	}

});


var common = {
		/** show된 Dialog 갯수 Count */
		__progressCount : 0,
		/** 로딩바 show */
		showInitLoadingBar : function() {
			if (common.__progressCount == 0) {
				try {
					// 로딩바 div 표시
					jQuery('#INGSHOW').show();
					jQuery('#SHOWBLOCK').show();
				} catch (e) {}
			}
			common.__progressCount++;
		},
		/** 로딩바 close */
		closeInitLoadingBar : function() {
			common.__progressCount--;
			if (common.__progressCount <= 0) {
				try {
					common.__progressCount = 0;
					// 로딩바 div 숨김
					jQuery('#INGSHOW').hide();
					jQuery('#SHOWBLOCK').hide();
				} catch (e) {}
			}
		},

		/**
		 * 에러 팝업 표시
		 */
		showErrorLayerPop : function(errObject) {
			errObject = errObject || {};
			console.log('에러\n\nresponseJson = ' + JSON.stringify(errObject));

			if (errObject['ERROR_CODE'] == 'WFCO90306') { // RequireLoginInterceptor에서 AuthenticationException
				// 로그인 페이지로 이동
				document.location.href = errObject['ERROR_RETURN_SERVICE_ID'];
			} else {
				if (!errObject['ERROR_MESSAGE']) { return false; }

				common.dialog.alert('오류 메시지', errObject['ERROR_MESSAGE']);
			}
		},

		/**
		 * jQuery UI Dialog
		 */
		dialog : {
			/**
			 * alert 명령어 구현
			 *  - 예제: common.dialog.alert('제목', 'alert 메시지');
			 */
			alert : function(title, msg, callback) {
			    $('<div>' + msg + '</div>').dialog({
					closeText : "닫기",
					resizable : false,
					modal : true,
					title : (title || ''),
					width : 500,
					buttons : {
						'확인' : function() {
							$(this).dialog('close');
							if (typeof(callback) == 'function') {
								callback();
							}
						}
					},
					close : function() {
						$(this).remove();
					}
				});
			},
			/**
			 * confirm 명령어 구현
			 * - 예제: common.dialog.confirm('제목', 'confirm 메시지', function(){ alert('yes callback'); }, function(){ alert('no callback'); });
			 */
			confirm : function(title, msg, yesCallback, noCallback) {
			    $('<div>' + msg + '</div>').dialog({
					closeText : "닫기",
					resizable : false,
					modal : true,
					title : (title || ''),
					width : 500,
					buttons : {
						'확인' : function() {
							$(this).dialog('close');
							$(this).remove();
							if (typeof(yesCallback) == 'function') {
								yesCallback();
							}
						},
						'취소' : function() {
							$(this).dialog('close');
							$(this).remove();
							if (typeof(noCallback) == 'function') {
								noCallback();
							}
						}
					},
					close : function() {
						$(this).remove();
					}
				});
			}
		}

};
