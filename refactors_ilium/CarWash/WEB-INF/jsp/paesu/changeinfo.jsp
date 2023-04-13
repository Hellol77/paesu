
<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
		
<script type="text/javascript">
	$(document).ready(function(){
		strUrl = "/paesu/getchangeinfo";
		var tempObject = new Object();
		util_ajaxPage(strUrl, tempObject, successCallback);
	});
	
	function successCallback(data) {
		$('#id').val(data.id);
		$('#pwd').val(data.pwd);
		$('#cmp_phhone').val(data.cmp_phhone);
		$('#email').val(data.email);
		$('#cname').val(data.cname);
		$('#address').val(data.address);
		$('#regnumber').val(data.regnumber);
	}
	
	function saveSubmit() {
		var formObj = document.forms['mainForm'] || document.mainForm;
		
		httpSend('changeSubmit', formObj, function(data) {
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
	<div class="boxLY_area">
            <table class="tbusrty">
                <caption></caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:70%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th colspan="1">아이디</th>
                        <td colspan="1"><input type="text" id="id" name="id" disabled/></td>
                    </tr>
                </tbody>
            </table>
            
            <table class="tbusrty">
                <caption></caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:70%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th colspan="1">패스워드</th>
                        <td colspan="1"><input type="text" id="pwd" name="pwd"/></td>
                    </tr>
                    <tr>
                        <th colspan="1">패스워드확인</th>
                        <td colspan="1"><input type="text" id="pwd_confirm" name="pwd_confirm"/></td>
                    </tr>
                </tbody>
            </table>
            
            <table class="tbusrty">
                <caption></caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:70%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th colspan="1">휴대폰번호</th>
                        <td colspan="1"><input type="text" id="cmp_phhone" name="cmp_phhone"/></td>
                    </tr>
                </tbody>
            </table>
            
            <table class="tbusrty">
                <caption></caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:70%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th colspan="1">이메일</th>
                        <td colspan="1"><input type="text" id="email" name="email"/></td>
                    </tr>
                </tbody>
            </table>
            
            <table class="tbusrty">
                <caption></caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:70%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th colspan="1">사업자상호</th>
                        <td colspan="1"><input type="text" id="cname" name="cname"/></td>
                    </tr>
                </tbody>
            </table>
            
            <table class="tbusrty">
                <caption></caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:70%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th colspan="1">사업자주소</th>
                        <td colspan="1"><input type="text" id="address" name="address"/></td>
                    </tr>
                </tbody>
            </table>
            
            <table class="tbusrty">
                <caption></caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:70%">
                    </colgroup>
                <tbody>
                	<tr>
                        <th colspan="1">사업자등록번호</th>
                        <td colspan="1"><input type="text" id="regnumber" name="regnumber"/></td>
                    </tr>
                </tbody>
            </table>
        </div>

		<div class="changelast">
	     	<a href="javascript:;" class="btnType savesubmit" onclick="saveSubmit();">  변 경  </a>
	     </div>
</form>

	