<!doctype html>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- css > jQuery -->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/jquery-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/magnific-popup.css" />

	<!-- css -->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/default.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/common.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/jquery-ui-custom.css" />

	<!-- js > jQuery -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery/jquery-ui.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery/jquery.validate.min.js"></script>
	<!--<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery/jquery.sha256.js"></script>-->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery/jquery.magnific-popup.min.js"></script>

	<!-- jqGrid -->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/ui.jqgrid.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery/grid.locale-kr.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery/jquery.jqGrid.min.js"></script>

	<!-- js > F/W -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/framework/framework_controller.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/framework/framework_config.js"></script>

	<!-- 공통 js : common.js, date.js, format.js, util.js, validation.js, popup.js 포함 -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/main.js"></script>

<script type="text/javascript">
	window['APPLICATION_CONTEXT_ROOT'] = '${pageContext.request.contextPath}';
</script>
</head>
<body id="layout1">

<a href="#content" class="nav-skip">주요컨텐츠 바로가기</a>
<!-- header -->
<div class="wrap-header">
	<div id="header">
		<tiles:insertAttribute name="header" />
	</div><!-- //header -->
</div>
<!-- //header -->
<!-- container -->
<div class="wrap-container">
	<div id="container">
		<div id="content">
			<tiles:insertAttribute name="body" />
		</div>
		<hr/>
	</div>
</div>
<!-- //container -->
<!-- footer -->
<div class="wrap-footer">
	<div id="footer">
		<tiles:insertAttribute name="footer" />
	</div><!-- //footer -->
</div>

</body>
</html>