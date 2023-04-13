$(document).ready(function(){
		
		var inlist="";
		$("select[name='row_limit']").change(function(){
				sListView($('#push_adrbok_group_dvcd').val(),'');					
		});				
		
		$("#allck").click(function(){  //연락처 팝업
			$("input[name=cbox]").prop('checked',this.checked);
			//console.log($("input[name=cbox]").length)
		});
		
		$("#allckd").click(function(){  //주소리스트
			$("input[name=ckbox]").prop('checked',this.checked);
			//console.log($("input[name=cbox]").length)
		});

		
		$(document).on("click", '.txt_data .txt a', function(e) {
			if($(this).hasClass('on')) {
				$(this).removeClass('on');
			} else {
				$(this).addClass('on');	
			}
		});
		 $('.tabmenu').tabmenu();
         $("#staff_tree, #staff_tree2").treemenu({delay:300}).openActive();
         
         // 탭메뉴 선택에 따른 이벤트 .
         $(".tabmenu").click(function () {
        	var inx =  $(".tabmenu .on ").index();
        	$(".employee_list").hide();
        	$(".employee_list").eq(inx).show();
        	$('.emList tbody > tr input').attr("checked",false);//체크박스 초기화 
        	});
         
         
});
	
//주소록 메인페이지 리스트 
function sListView(gcode,gb){ 
			
	$("#allckd").removeAttr('checked');
	var gpcode ="";		
	var cmgrp_cd = $('#cmgrp_cd').val();
	var push_adrbok_group_owr_id = $('#push_adrbok_group_owr_id').val();
	var push_sapp_dvcd = $('#push_sapp_dvcd').val();
	var page_num = $('#page_num').val();
	var row_limit = $('#row_limit option:selected').val();
	var searchItem = $('#searchItem option:selected').val();
	var searchTxt = $('#searchTxt').val();
	
	if(gb == ''){
		gb = $('gb').val();			
	}
	
	if(gb == 's'){
		gpcode = "";
		$('gb').val('s');
		
	}else{
		if("" == gcode){
			gpcode = $('#push_adrbok_group_dvcd').val();
		}else{
			$('#push_adrbok_group_dvcd').val(gcode);
			gpcode = gcode;
		}	
		
		searchItem = '';
		searchTxt = '';
		$('gb').val('g');
		
		
	}
	
	//alert("searchTxt="+searchTxt);
	//alert("searchItem="+searchItem);
	
	httpSend('/admin/push/contactStfExlAjax', {'cmgrp_cd':cmgrp_cd,'push_adrbok_group_owr_id':push_adrbok_group_owr_id,'push_adrbok_group_dvcd':gpcode,'page_num':page_num,'row_limit':row_limit,'searchTxt':searchTxt,'searchItem':searchItem}, function(data){
		
			var resultList = data.contSCustList; 
			var content = "<table><tbody>";
			var paging = "";
			if(resultList.length > 0){
				//alert("resultList.length="+resultList.length);
				for(i=0;i<resultList.length;i++){								
					content += "<tr>";
					content += "<td	style='width:20%;'  class='tal'><input type='checkbox' name='ckbox' id='ckbox' CustomTag='"+resultList[i].mpno+"' value='"+resultList[i].gw_stf_cdnm+"' class='no'>"+resultList[i].gw_user_nm+"</td>";
					content += "<td	style='width:15%;'>"+resultList[i].gw_stf_cdnm+"</td>";
					content += "<td	style='width:20%;'>"+resultList[i].gw_dpnm+"</td>";
					content += "<td	style='width:10%;'>"+resultList[i].gw_psinm+"</td>";
					content += "<td	style='width:10%;'>"+resultList[i].gw_jgd_nm+"</td>";
					//content += "<td	style='width:15%;'>"+resultList[i].gw_gnm+"</td>";
					content += "<td	style='width:15%;'>"+resultList[i].push_adrbok_group_nm+"</td>";                       
					content += "</tr>";
				}
			}else{
				content += "<tr><td colspan='7'> 상세정보가 없습니다.</td></tr>";
			}
			
			content +=" </tbody></table>";
			$("#scontList").html(content);	
			if(gb == 's'){	
				$("#result_s").text('검색결과: 총'+resultList.length+'건');			
			}else{
				$("#result_s").text('');
			}
	}); 
	return;
}	

function s_list(grade,deptcd,gb){ // 임직원 조직도 리스트
	var cmgrp_cd = $('#cmgrp_cd').val();
	var searchTxt = $('#searchTxt').val();
	var searchItem = $('#searchItem option:selected').val();
	var gw_sbsd_cdnm =$('#gw_sbsd_cdnm option:selected').val();
	
	if(gb !='s'){
		searchItem = '';
		searchTxt = '';
	}
	
		httpSend('/admin/push/stfListAjax', {'cmgrp_cd':cmgrp_cd,'gw_grade':grade,'gw_deptmt_cdnm':deptcd,'searchTxt':searchTxt,'searchItem':searchItem,'gw_sbsd_cdnm':gw_sbsd_cdnm}, function(data){
		
		var resultList = data.stfList; 
		var content = "<table id='m_table'><tbody>";
		if(resultList.length > 0){
					
			for(i=0;i<resultList.length;i++){			
				content += "<tr>";
				content += "<td style='width:20%;'  class='tal'><input type='checkbox' name='cbox' id='cbox' CustomTag='"+resultList[i].mpno+"' value='"+resultList[i].gw_stf_cdnm+"'class='no'>"+resultList[i].gw_user_nm+"</td>";
				content += "<td style='width:15%;'>"+resultList[i].gw_stf_cdnm+"</td>";
				content += "<td style='width:18%;'>"+resultList[i].gw_dpnm+"</td>";
				content += "<td style='width:22%;'>"+resultList[i].gw_psinm+"</td>";
				content += "<td style='width: 8%;'>"+resultList[i].gw_jgd_nm+"</td>";
				content += "<td style='width:17%;'>"+resultList[i].gw_gnm+"</td>";
				content += "</tr>";				
			}	
		}else{
			content += "<tr><td colspan='6'> 상세정보가 없습니다.</td></tr>";
		}
		content += "</tbody></table>";		
		$("#stflist").html(content);
		
		if(gb == 's'){	
				$("#result_s").text('검색결과: 총'+resultList.length+'건');			
		}else{
			$("#result_s").text('');
		}
		
	});
	return;
}
function s_list_popup(grade,deptcd,gb){ // 임직원 조직도 리스트
	var cmgrp_cd = $('#cmgrp_cd').val();
	var searchTxt = $('#searchTxt').val();
	var searchItem = $('#searchItem option:selected').val();
	var gw_sbsd_cdnm =$('#gw_sbsd_cdnm option:selected').val();
	
	if(gb !='s'){
		searchItem = '';
		searchTxt = '';
	}
	
		httpSend('/admin/push/stfListAjax', {'cmgrp_cd':cmgrp_cd,'gw_grade':grade,'gw_deptmt_cdnm':deptcd,'searchTxt':searchTxt,'searchItem':searchItem,'gw_sbsd_cdnm':gw_sbsd_cdnm}, function(data){
		
		var resultList = data.stfList; 
		var content = "<table id='m_table'><tbody>";
		if(resultList.length > 0){
					
			for(i=0;i<resultList.length;i++){			
				content += "<tr>";
				content += "<td style='width:20%;'  class='tal'><input type='checkbox' name='cbox' id='cbox' CustomTag='"+resultList[i].mpno+"' value='"+resultList[i].gw_stf_cdnm+"'class='no'>"+resultList[i].gw_user_nm+"</td>";
				content += "<td style='width:15%;'>"+resultList[i].gw_stf_cdnm+"</td>";
				content += "<td style='width:25%;'>"+resultList[i].gw_dpnm+"</td>";
				content += "<td style='width:20%;'>"+resultList[i].gw_psinm+"</td>";
				content += "<td style='width:20%;'>"+resultList[i].gw_jgd_nm+"</td>";
				content += "</tr>";				
			}	
		}else{
			content += "<tr><td colspan='6'> 상세정보가 없습니다.</td></tr>";
		}
		content += "</tbody></table>";		
		$("#stflist").html(content);
		
		if(gb == 's'){	
				$("#result_s").text('검색결과: 총'+resultList.length+'건');			
		}else{
			$("#result_s").text('');
		}
		
	});
	return;
}
function mv_list(obj,gcode) {
	

	$('#push_adrbok_group_dvcd_m').val(gcode);
	
	if ($(obj).parents('li').hasClass('on')) {
		$(obj).parents('li').removeClass('on');
	} else {
		$(obj).parents('li').parent('ul').find('li.on').removeClass('on');
		$(obj).parents('li').addClass('on');	
	}
}

function cancleBt(){
	$("#push_adrbok_group_nm").val('');	
	
	layer_popclose('group_add');
	layer_popclose('group_move');
	layer_popclose('staff_ads');
	
	window.location.reload();
}

// 그룹관리 레이어팝업 -->

function modify(obj) {
	$('#updownmenu').find('li .p_submit, li .input_box').hide();
	$('#updownmenu').find('li .p_modify, li .txt').show();
	$(obj).hide();		
	$(obj).parents('li').find('.txt').hide();
	$(obj).parents('li').find('#push_adrbok_group_nm1').val($(obj).parents('li').find('.txt').text());
	$('#push_adrbok_group_nm2').val($(obj).parents('li').find('.txt').text());
	$(obj).parents('li').find('.input_box, .btn .p_submit').show();
}

function p_submit(obj) {
	$(obj).hide();
	$(obj).parents('li').find('.input_box').hide();
	$(obj).parents('li').find('.txt, .btn .p_modify').show();
}


function select_btn(obj) {
	if ($(obj).parents('li').hasClass('on')) {
		$(obj).parents('li').removeClass('on');
	} else {
		$(obj).parents('li').parent('ul').find('li.on').removeClass('on');
		$(obj).parents('li').addClass('on');	
	}
}


// 사번으로 전화번호 검색 
/*function contactStfListAjax() {
	var contactList = new Array();
	$('#txt_data a').each(function (){
		var gw_stf_cdnm = $(this).attr("rel");
		if(gw_stf_cdnm != "" && gw_stf_cdnm != undefined){
			contactList.push(gw_stf_cdnm);
		}
	});
	if(contactList.length == 0 ) {
		alert("대상이 없습니다. 대상을 선택해주세요. ");
		return;
	}
	
	httpSend('/admin/push/contactToTelnoAjax', {'contactList':contactList}, function(data){
		var result = data.resultList;
			
		if(result == null || result.length == 0 ){
			alert( " 결과가 없습니다. ");
		}else {
			var name = $('#txt_data a').eq(0).text(); 
			var cnt = result.length-1;
			$('#txt_allCnt').val(name+"외 "+cnt+"명");
			$('#step3_preView_targetCnt').text(name+"외 "+cnt+"명");
			$('.class_fw_cnt').text('총'+result.length+'명'); 
			$('#tel_no').val(result.toString());
			layer_popclose('staff_ads');
		}
	}); 
	
}*/
function contactStfListAjax() {
	var cnt = 0;
	var targetTelNo ="";
	$('#txt_data a').each(function (){
		var mpno = $(this).attr("mpno");
		if($.trim(mpno) != "" && $.trim(mpno) != undefined){
			targetTelNo+=mpno + ",";
			cnt++;
		}
	});
	
	if(targetTelNo.lastIndexOf(',') == (targetTelNo.length-1)){
		targetTelNo = targetTelNo.substr(0,targetTelNo.length -1);
	}
	if(cnt == 0 ) {
		alert("대상이 없습니다. 대상을 선택해주세요. ");
		return;
	}
	var name = $('#txt_data a').eq(0).text(); 
	$('#txt_allCnt').val(name+"외 "+(cnt-1)+"명");
	$('#step3_preView_targetCnt').text(name+"외 "+(cnt-1)+"명");
	$('.class_fw_cnt').text('총'+cnt+'명'); 
	$('#tel_no').val(targetTelNo);
	layer_popclose('staff_ads');
}



function table_add() {

	var inx =  $(".tabmenu .on ").index();
	var ckboxlen=$("input[name='ckbox']:checked").length;
	var cboxlen=$("input[name='cbox']:checked").length;
	
	if(inx == '0'){
		if($("input[name='cbox']:checked").length < 1){ 			
			alert("추가할 대상을 선택해주세요.");
			return;
		}
	}else if(inx =='1'){
		if($("input[name='ckbox']:checked").length < 1){ 			
			alert("추가할 대상을 선택해주세요.");
			return;
		}
	}
	var checkeTarget= $('.emList tbody > tr input:checked');
	$('.emList tbody > tr input:checked').parent().parent().each(function(index, element) {
		var input_id = $(this).find('td').eq(0).find('input').val();
		var $input = $(this).find('td').eq(0).find('input');
		var txt = $(this).find('td').eq(0).text();
		var txt2 = $(this).find('td').eq(3).text();
		var mpno = $input.attr('customtag');
		if ($input.is(":checked") && $input.hasClass('on')) { 
			$(this).find('td').eq(0).find('input').attr('checked',false);
		}
		
        if($input.is(":checked") && $input.hasClass('no')) {
				$(this).find('td').eq(0).find('input').attr('class','on');
				$(this).find('td').eq(0).find('input').attr('checked',false);		
				$('#txt_data').append('<span class="txt"><a href="#none" mpno="'+mpno+'" rel="'+input_id+'">'+txt+'('+txt2+')</a></span>');
				//$('#txt_data').append('<span class="txt"><a href="#none"  rel="'+input_id+'">'+txt+'('+txt2+')</a></span>');
		} 
    });
		$("#allck").removeAttr('checked');
		$("#cnt_data").html('<strong>총 '+$('#txt_data').find('.txt').length+'명</strong>');
}		
function table_add1() {
	var checkeTarget= $('.emList tbody > tr input:checked');
	var regex = /[^0-9]/g;
	var dulleCountNum = Number($("#cnt_data2").text().replace(regex, ''));
	
	$('.emList tbody > tr input:checked').parent().parent().each(function(index, element) {
		var input_id = $(this).find('td').eq(0).find('input').val();
		var $input = $(this).find('td').eq(0).find('input');
		var txt = $(this).find('td').eq(1).find('span').eq(1).text();
		var txt2 = $(this).find('td').eq(2).text();
		
		if ($input.is(":checked") && $input.hasClass('on')) { 
			$(this).find('td').eq(0).find('input').attr('checked',false);
		}
		
		if($("#ap_dc").val() == '04' && $("#cust_target").val() == '05'){	// 둘레길
			if(input_id.substr(0,1) == '1'){
				//그룹 1개이상 체크
				if(!groupCheckFlg){
					alert("하나이상의 그룹을 지정할 수 없습니다.");
					return false;
				}
			}
			if(checkList(input_id)){
				if($input.is(":checked") && $input.hasClass('no')) {
					$(this).find('td').eq(0).find('input').attr('class','on');
					$(this).find('td').eq(0).find('input').attr('checked',false);		
					//$('#txt_data').append('<span class="txt"><a href="#none" rel="'+input_id+'">'+txt+'('+txt2+')</a></span>');
					$(this).closest(".area_box").find('.txt_data').append('<span class="txt"><a href="#none" rel="'+input_id+'">'+txt+'('+txt2+')</a></span>');
				} 
	        	dulleCountNum += Number(txt2.replace(regex, '')); 
			}
			
		
		}else{
		
			if($input.is(":checked") && $input.hasClass('no')) {
					$(this).find('td').eq(0).find('input').attr('class','on');
					$(this).find('td').eq(0).find('input').attr('checked',false);		
					$('#txt_data').append('<span class="txt"><a href="#none" rel="'+input_id+'">'+txt+'('+txt2+')</a></span>');
			} 
		}
    });
	$("#allck").removeAttr('checked');
	
	if($("#ap_dc").val() == '04' && $("#cust_target").val() == '05'){	// 둘레길이면
		$("#cnt_data2").html('<strong>총 '+ dulleCountNum +'명</strong>');
	}else{
		$("#cnt_data").html('<strong>총 '+$('#txt_data').find('.txt').length+'명</strong>');
	}
}
function table_del() {
	
	var regex = /[^0-9]/g;
	var dulleCountNum = Number($("#cnt_data2").text().replace(regex, ''));
	if($('.txt_data').find('.txt').find('a').hasClass('on')){ //선택된 대상이 있을때		
	
		$('.txt_data').find('.txt').each(function(index, element) {
			var a_id = $(this).find('a').attr('rel');
			
			if($(this).find('a').hasClass('on')) {

				$('.emList tbody > tr .on').each(function(){
					if($(this).val() == a_id){
						var txt2 = $(this).parent().parent().find('td').eq(2).text();
						
						$(this).attr("class","no");
						chgOptIdx(a_id);
						dulleCountNum -= Number(txt2.replace(regex, '')); 
					}
				});
				$(this).remove();
			}
		});			
		$("#allck").removeAttr('checked');
		
		if($("#ap_dc").val() == '04' && $("#cust_target").val() == '05'){	// 둘레길이면
			$("#cnt_data2").html('<strong>총 '+ dulleCountNum +'명</strong>');
		}else{
			$(this).closest(".cnt_data").html('<strong>총 '+$(this).closest('.txt_data').find('.txt').length+'명</strong>');
		}
		
		
	}else{
		alert("삭제할 대상이 없습니다.");
	}
}
function table_all_del() {
	if($('.txt_data').find('.txt')){ //선택된 대상이 있을때	
		$('.emList tbody > tr .on').attr("class","no");
		$('.txt_data').html('');
		$(".cnt_data").html('<strong>총 0명</strong>');
		//중복데이터 체크 리셋
		dulleInsertIdxReset();
	}else{
		alert("삭제할 대상이 없습니다.");	
	}
}

