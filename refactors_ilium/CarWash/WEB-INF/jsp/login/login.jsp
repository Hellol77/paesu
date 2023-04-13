<%--
/***********************************************
 * <pre>
 * 업무구분명 : 관리자
 * 세부업무구분명 : 관리자 > 로그인
 * 작성자 : 정영탁
 * 설명 : 
 * ----------------------------------------------
 * 변경이력
 * ----------------------------------------------
 * NO 날짜               작성자    내용
 *  1 2014.07.22         정영탁    최초작성
 * </pre>
 ***********************************************/
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/taglib_include.jsp" %>

<script type="text/javascript">
//<![CDATA[
	var serverName ;
	$(function(){
		var frm = document.forms['loginForm'] || document.loginForm;
		// LocalStorage에 저장된 아이디 불러오기
		if (localStorage.getItem('admin.mgr_id')) {
			frm.saveID.checked = true;
			frm.mgr_id.value = localStorage.getItem('admin.mgr_id');
			frm.pwd.focus();
		}
		var hostname = location.hostname.substr(0,1);
		$("#serverName").val(hostname);
		// jQuery.validator 초기화
		validation.initFormValidate(frm);
	
	});

	function submitValidation(formObj) {
		if (!validation.checkFormValidate(formObj)) {
			return false;
		}

		httpSend('loginProcess', formObj, function(responseJson){		
			// success
			document.location.href = responseJson['returnUrl'];
		});
		return false;
	};
	
	function capsLock(e) {
		var keyCode = 0;
		var shiftKey=false;
		keyCode=e.keyCode;
		shiftKey=e.shiftKey;
		if(((keyCode >=65 && keyCode <= 90)&& !shiftKey)||((keyCode >=97 && keyCode <=122)&& shiftKey)){
			$('#capsLockE').show();
			return;
		}else if(keyCode == 13){
			submitValidation($('#loginForm'));
		}else {
			$('#capsLockE').hide();
			return;
		}
	}	

	
//]]>
</script>
<!-- </form> -->
<form method="post" id="loginForm" name="loginForm" action="loginProcess.do" onsubmit="submitValidation(this); return false;">
	<input type="hidden" name="returnUrl" value="/paesu/insert.do" default="/paesu/insert.do" />
	<div class="login_area">
   		 <div id="login_box">
		     <h1></h1>
		    <h2>폐수일지(WMS)</h2>
		        <fieldset>
		            <legend>로그인폼</legend>
		            <ul>
		                <li><span><img src="/resources/images/admin_new/id_text.png" alt="아이디" /></span>
		                <input type="text" id="formLoginID" name="id" class="text1" title="아이디를 입력하세요." maxlength="40" data-validate-rule="{required:true, rangelength:[1,100]}" data-alias="아이디" />
		                </li>
		                <li><span><img src="/resources/images/admin_new/password_text.png" alt="비밀번호" /></span>
		                	<input type="password" id="formLoginPwd" name="pwd" class="text1" title="비밀번호를 입력하세요." maxlength="40" data-validate-rule="{required:true, alphanumeric:false, rangelength:[1,100]}" data-alias="비밀번호" onkeypress="javascript:capsLock(event);" value="" />
		                	<span style="display:none" id="capsLockE">CapsLock이 켜져있습니다.</span> 
		                </li>
		            </ul>
		            <p class="id_save"><input type="checkbox" id="saveID" /> <label for="saveID">아이디저장</label></p>
		            <input type="image" src="/resources/images/admin_new/login_btn.png" alt="login" class="login_btn" />
		        	  <p class="txt1">Copyright 일리움(주). All Rights Reserved</p>
		        	  <p class="txt2">서비스 제휴 및 문의 : 010-4127-6257</p>
		        	  <p class="txt3">ydkwon@ilium.co.kr</p>
		        	  
		        </fieldset> 
		</div>
	</div>
	</form>