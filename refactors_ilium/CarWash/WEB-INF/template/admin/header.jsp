<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/javascript">
	//<![CDATA[
	$(function() {
		var hostname = location.hostname.substr(0, 1);
		$("#serverName").val(hostname);

	});
	//]]>
</script>
<div class="head_inner">

	<input type="hidden" name="serverName" value="" />
	<h1></h1>


	<!-- 현재 선택된 메뉴명에 해당하는 li에 on클래스 추가됨 -->
	<div class="log-info">
		<ul class="gnb">
			<li><strong>폐수시설 운영일지</strong></li>
		</ul>
		<img class="usersinfo" src="/resources/images/ilium/userinfo.gif" onclick="javascript:location.href='/paesu/changeinfo.do'" />
	</div>

</div>
<div class="info_bar"></div>
<!-- //header -->
