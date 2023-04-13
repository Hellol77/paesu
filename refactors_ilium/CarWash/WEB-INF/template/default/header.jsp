<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

		<!-- # 타이틀 및 GNB  -->
		<h1><a href="/" title="메인페이지로">Title<span></span></a></h1>
		<div class="nav-gnb">
<c:if test="${empty sessionMember.user_id}">
			<a href="/login/login.do">로그인</a> |
			<a href="#none">회원가입</a> |
</c:if>
<c:if test="${not empty sessionMember.user_id}">
			<span><c:out value="${sessionMember.user_name}"/>님 반갑습니다.</span>
</c:if>
			<a href="#none">고객센터</a>
		</div>
		<!--  # 메인메뉴 LNB  -->
		<h2 class="hidden-obj">메인메뉴</h2>
		<div class="nav-lnb">
			<a href="#none" class="lnb1">Menu1<span></span></a>
			<a href="#none" class="lnb2">Menu2<span></span></a>
			<a href="#none" class="lnb3">Menu3<span></span></a>
			<a href="#none" class="lnb4">Menu4<span></span></a>
			<a href="#none" class="lnb5">Menu5<span></span></a>
			<a href="#none" class="lnb6">Menu6<span></span></a>
		</div>
