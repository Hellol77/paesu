<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/include/taglib_include.jsp" %>
<script type="text/javascript">
//<![CDATA[

	<c:if test="${not empty message}">
			alert("<c:out value='${message}'/>");
	</c:if>
	<c:choose>
		<c:when test="${not empty parentReload && not empty close}">
			window.opener.location.reload();
			window.close();
		</c:when>
		<c:when test="${empty parentReload && empty url && not empty close}">
			window.close();
		</c:when>
		<c:when test="${empty parentReload && not empty url && not empty close}">
			window.opener.location.href="<c:url value='${url}'/>";
			window.close();
		</c:when>
		<c:when test="${empty parentReload && empty url && empty close}">
			history.back();
		</c:when>
		<c:when test="${empty parentReload && not empty url && empty close}">
			location.replace("<c:url value='${url}'/>");
		</c:when>
	</c:choose>

//]]>
</script>
