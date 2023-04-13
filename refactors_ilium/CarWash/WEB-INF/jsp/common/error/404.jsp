<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isErrorPage="true" %>
<%@ include file="/WEB-INF/jsp/include/taglib_include.jsp" %>
<%@page import="com.fas.framework.commons.Const"%>
<%

	String serviceId = (String) request.getAttribute(Const.MESSAGE_HEADER_KEY_SERVICE_ID);

	String notFoundedPage = "";
	try {
		response.setStatus(HttpServletResponse.SC_OK) ;
		String bodyUrl = (String)request.getAttribute(Const.HTTP_ATTRIBUTE_KEY_TILES_BODY_URL);

		org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger("error");

		if (serviceId != null) {
			notFoundedPage = serviceId;
		} else {
			notFoundedPage = request.getRequestURI().toString();
		}

		//logger.error("FILE NOT FOUNDED : {}", notFoundedPage);
	} catch (Exception e) {
		e.printStackTrace();
	}

%>

<script type="text/javascript">

	function lfConfirm() {
		location.href = "<%= notFoundedPage %>";
	}

</script>


			<div class="primary-content" id="primaryContent">
				<fieldset>
					<legend>Error Info</legend>

					<table cellspacing="0" class="tbl-type1 tbl-type1-form" title="">
						<tr>
							<th><span class="label">Error Code</span></th>
							<td colspan="3">
								HTTP 404
							</td>
						</tr>
						<tr>
							<th><span class="label">Error Message</span></th>
							<td colspan="3">
								고객님께서 요청하신 페이지를 찾을 수 없습니다.
							</td>
						</tr>
					</table>
					<div class="btn-center">
						<button class="bg-btn btn-type1" type="button" onclick="lfConfirm();"><span>확인</span></button>
					</div>
				</fieldset>
			</div>
