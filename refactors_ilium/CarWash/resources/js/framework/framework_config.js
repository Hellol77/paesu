/*****************************************************************************
 * 파일명 : framework_config.js
 * 작성일 : 2014. 04. 06
 * 작성자 : YeongTak, Jeong
 * 설  명 : JavaScript Framework의 설정 값을 정의
 * ===========================================================================
 * 변경이력:
 * DATE				AUTHOR		DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/


/* navigate의 targetpath에 URL 지정 시에 자동으로 적용할 규칙 설정 */
navigateConfig('generateUrl', function(path) {
	return path + '.do';
});
/* $.fn.navigate의 targetpath에 URL 지정 시에 자동으로 적용할 규칙 설정 */
navigateConfig('generateFragmentUrl', function(path) {
	return path + '.frag';
});
/* navigate 호출 시에 적용할 Method 방식 설정 */
navigateConfig('defaultMethod', 'POST');

/* navigate 호출 시에 정상 response인지 여부 판별 */
navigateConfig('validateResponse', function(data, status, xhr) {
	var errflag = xhr.getResponseHeader('ERROR_CODE');
	if (errflag === undefined || errflag === null || errflag === 'undefined' || typeof errflag != typeof '') {
		return true; // success
	}
	return false; // fail
});

/* httpSend의 targetpath에 URL 지정 시에 자동으로 적용할 규칙 설정 */
httpSendConfig('generateUrl', function(service) {
	if (service.indexOf("?") != -1) {
		return service;
	} else {
		return service + '.cmd';
	}
});

/* httpSend 호출 시에 정상 response인지 여부 판별 */
httpSendConfig('validateResponse', function(data, status, xhr) {
	var errflag = xhr.getResponseHeader('ERROR_CODE');
	if (errflag === undefined || errflag === null || errflag === 'undefined' || typeof errflag != typeof '') {
		return true; // success
	}
	return false; // fail
});

/* navigate 호출 성공 시에 기본으로 실행되는 function */
navigateConfig('defaultSuccess', function(data, status, xhr) {
	// success
});

/* navigate 호출 실패 시에 기본으로 실행되는 function */
navigateConfig('defaultError', function(data, status, xhr) {
	var errorMsg = xhr.getResponseHeader('ERROR_MESSAGE');
	errorMsg = decodeURIComponent(errorMsg).split('+').join(' ');
	var orgErrorMsg = xhr.getResponseHeader('ORG_ERROR_MESSAGE');
	orgErrorMsg = decodeURIComponent(orgErrorMsg).split('+').join(' ');

	// default error
	var errorObject = {
		ERROR_CODE : xhr.getResponseHeader('ERROR_CODE'),
		ERROR_MESSAGE : errorMsg,
		ERROR_PROGRAM_NAME : xhr.getResponseHeader('ERROR_PROGRAM_NAME'),
		ERROR_PROGRAM_LINE : xhr.getResponseHeader('ERROR_PROGRAM_LINE'),
		ERROR_SERVER_INFO : xhr.getResponseHeader('ERROR_SERVER_INFO'),
		ORG_ERROR_CODE : xhr.getResponseHeader('ORG_ERROR_CODE'),
		ORG_ERROR_MESSAGE : orgErrorMsg,
		ERROR_RETURN_SERVICE_ID : xhr.getResponseHeader('ERROR_RETURN_SERVICE_ID')
	};
	common.showErrorLayerPop(errorObject);
});

/* navigate 호출 시에 Progress 표시 여부 */
navigateConfig('useProgress', true);

/* navigate 호출 이전에 실행되는 function */
navigateConfig('startProgress', function(frag, callback) {
	common.showInitLoadingBar();

	// 반드시 가장 마지막에 수행
	if (callback != undefined) {
		callback();
	}
});

/* navigate 호출 완료 후에 실행되는 function */
navigateConfig('endProgress', function(frag, callback) {
	if(frag != null || window.browser == 'safari' || window.browser == 'opera' || window.browser == 'mobile'){
		common.closeInitLoadingBar();
	}

	// 반드시 가장 마지막에 수행
	if (callback != undefined) {
		callback();
	}
});

/* httpSend 호출 성공 시에 기본으로 실행되는 function */
httpSendConfig('defaultSuccess', function(responseJson, status, xhr) {
	// success
});

/* httpSend 호출 실패 시에 기본으로 실행되는 function */
httpSendConfig('defaultError', function(responseJson, status, xhr) {
	if (!responseJson || !responseJson['ERROR_CODE']) {
		responseJson = {
			ERROR_CODE : xhr.getResponseHeader('ERROR_CODE'),
			ERROR_MESSAGE : decodeURIComponent(xhr.getResponseHeader('ERROR_MESSAGE')).split('+').join(' ')
		};
	}
	// default error
	common.showErrorLayerPop(responseJson || {});
});

/* httpSend 호출 시에 Progress 표시 여부 */
httpSendConfig('useProgress', true);

/* httpSend 호출 이전에 실행되는 function */
httpSendConfig('startProgress', function(callback) {
	common.showInitLoadingBar();

	// 반드시 가장 마지막에 수행
	if (callback != undefined) {
		callback();
	}
});

/* httpSend 호출 완료 후에 실행되는 function */
httpSendConfig('endProgress', function(callback) {
	common.closeInitLoadingBar();

	// 반드시 가장 마지막에 수행
	if (callback != undefined) {
		callback();
	}
});
