<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript">


	
</script>
<form id="listFrm" name="listFrm" method="post">
	<div id="content" class="content2">
		<div class="date_area">
			<table class="datetable">
				<colgroup>
	                <col style="width:50%">
	                <col style="width:50%">
	            </colgroup>
				<tbody>
                    <tr>
						<td>
							<select id="selectyear" name="selectyear" class="selectdate"/>
						</td>
						<td>
							<select id="selectmonth" name="selectmonth" class="selectdate"/>
						</td>
                    </tr>
				</tbody>
			</table>
		</div>
		<div id="list_area" class="list_area">
			<table id="listtbl" class="tbsty3">
                <caption>날짜별 배출량 리스트</caption>
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:40%">
                        <col style="width:30%">
                    </colgroup>
                <tbody>
                    <tr>
                        <th>날짜</th>
                        <th>폐수배출량</th>
                        <th>상태</th>
                    </tr>
                    <tr>
                    
                    </tr>
                </tbody>
            </table>
		</div>
	</div>		
</form>

<script type="text/javascript">
	$(document).ready(function(){

	});
</script>
 
		
