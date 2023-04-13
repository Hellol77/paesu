<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" errorPage="error/404.jsp" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/jsp/include/taglib_include.jsp" %>

<%
	String serviceType = (String) request.getAttribute("SERVICE_TYPE");
	String contentsPageUrl = (String) request.getAttribute("CONTENTS_PAGE_URL");
%>

<% if ( "tjsp".equals(serviceType) ) { %>
	<jsp:include page="<%= contentsPageUrl %>"></jsp:include>
<% } else { %>
	<script type="text/javascript">
	//<![CDATA[
		$().ready(function(){
			$('#content_load_section').load('<%= contentsPageUrl %>', null, function(data,status,xhr){
				// success
				$("#content_load_section").css('height', '');
			});
		});
	//]]>
	</script>
	
	<div id="content_load_section" style='height:3000px;'>
	</div>
<% } %>
