<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isErrorPage="true" %>
<%@ include file="/WEB-INF/jsp/include/taglib_include.jsp" %>
<%@page import="com.fas.framework.commons.Const"%>
<%

	String serviceType = (String) request.getAttribute(Const.MESSAGE_HEADER_KEY_SERVICE_TYPE);

	String errorCode = (String) request.getAttribute(Const.PROPERTIES_KEY_CONVERTED_ERROR_CODE);
	String errorMessage = (String) request.getAttribute(Const.PROPERTIES_KEY_ERROR_MESSAGE);
	String programName = (String) request.getAttribute(Const.HTTP_ATTRIBUTE_KEY_ERROR_PROGRAM_NAME);
	String programLine = (String) request.getAttribute(Const.HTTP_ATTRIBUTE_KEY_ERROR_PROGRAM_LINE);
	String serverInfo = (String) request.getAttribute(Const.HTTP_ATTRIBUTE_KEY_ERROR_SERVER_INFO);

	String returnServiceId = (String) request.getAttribute(Const.HTTP_ATTRIBUTE_KEY_ERROR_RETURN_SERVICE_ID);

%>

<script type="text/javascript">

	function lfConfirm() {
<% if (returnServiceId != null && !"".equals(returnServiceId)) { %>
		navigate('<%= returnServiceId %>');
<% } else { %>
		history.back();
<% } %>
	}

</script>


			<div class="primary-content" id="primaryContent">
				<fieldset>
					<legend>Error Info</legend>

					<table cellspacing="0" class="tbl-type1 tbl-type1-form" title="">
						<tr>
							<th><span class="label">Error Code</span></th>
							<td colspan="3">
								<%= errorCode %>
							</td>
						</tr>
						<tr>
							<th><span class="label">Error Message</span></th>
							<td colspan="3">
								<%= errorMessage %>
							</td>
						</tr>
						<tr>
							<th><span class="label">Error Program Name</span></th>
							<td colspan="3">
								<%= programName %>
							</td>
						</tr>
						<tr>
							<th><span class="label">Error Program Line</span></th>
							<td colspan="3">
								<%= programLine %>
							</td>
						</tr>
						<tr>
							<th><span class="label">Error Server Info</span></th>
							<td colspan="3">
								<%= serverInfo %>
							</td>
						</tr>
					</table>
					<div class="btn-center">
						<button class="bg-btn btn-type1" type="button" onclick="lfConfirm();"><span>확인</span></button>
					</div>
				</fieldset>
			</div>
