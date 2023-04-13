
/************************************************************************************************
 * body 및 popup 공통  admin 추가 함수  ( ctl + shift + f)
 ************************************************************************************************/


/**
 * Notes     : 특정 div 영역을(dummy class) 동적으로 추가, 삭제 처리 
 * Use        : srcClassName 변수에는 dummy class를 사용한다. 즉 기존의 style을 제어하기 위한 class 를 사용하지 않는다.
 *	//단순 clone
 *	<input type="button" onclick="rowMultiUtil.addRow('multiClass', 'multiDivId')" >
 *	
 *	//event 포함 clone ( datepicker 등 event 를 포함한 clone 일 필요한 경우 )
 *	<input type="button" onclick="rowMultiUtil.addRow('multiClass', 'multiDivId', true)" >
 */
var rowMultiUtil = {
	 
	 
	 /**
	 *		파라메터 설명 (prefixIndexName): 동적으로 셋팅
	 *  	name="col1" => prefixIndexName[0].col1
	 *	    name="col2" => prefixIndexName[1].col2
	 *	    name="col3" => prefixIndexName[2].col3
	 *     input type=file 형태는 제외한다.
	 */
	makeIndex : function(objId, prefixIndexName, srcClassName) {
		var $objId;

		if (objId.indexOf("#") == 0)
			$objId = $(objId);
		else
			$objId = $("#" + objId);

		$objId.find("." + srcClassName).each(
				function(index) {
					$(this).find("input[type=text], input[type=hidden], input[type=file], select, textarea").each(
							function() {
								if (this.name != null && this.name != "" && this.name.indexOf(prefixIndexName) == -1 ) {
									this.name = prefixIndexName + "["+ index + "]." + this.name;
								}
							});
				});
	},

	addRow : function(srcClassName, addTargetId, withDataAndEvents) {
		var $this = $("." + srcClassName).eq(0);
		var $cloneObj;

		if (withDataAndEvents) {
			$cloneObj = $this.clone(true);
		} else {
			$cloneObj = $this.clone();
		}
		
		var rowCnt = $("." + srcClassName).length;
		
		$cloneObj.find("input, select, textarea").each(function(){
			var name = "";
			var nameArr = $(this).attr("name").split(".");
			var nameHead = "";
			var nameTail = "";
			if(nameArr.length == 2){
				nameHead = nameArr[0];
				nameTail = nameArr[1];
			}
			
			name = nameHead.replace(/[\[\]0-9]/g, "") + "[" + rowCnt  + "]." + nameTail;
			$(this).attr("name", name);
			
			if($(this).is('select')){
				$(this).find('option:first').attr("selected","selected");	
			}else{
				$(this).val("");	
			}
		});
		
		$cloneObj.appendTo("#" + addTargetId);
	},

	delRow : function(obj, delClassName) {
		var $this = $(obj);

		if ($("." + delClassName).length >= 2)
			$this.closest("." + delClassName).remove();
	}
}; 







/*------------------------------------------------------------------------- 
 Spec    : 팝업 처리(get,post) 클래스
 Ex        : width, height 없으면 800,400으로 셋팅
 			   popup.js 사용 이외에 간단한 팝업 처리를 한다.
-------------------------------------------------------------------------*/
var popupUtil = {

	/**
	 * ex) popup.openByPost ('','') or ('','','','','','','') or (null,null,null,null,null,null,null) 
	 * can be null >> '' Or null
	 * 
	 * @param formId
	 *            (required) formId >> id element (not name element)
	 * @param url
	 *            (required)
	 * @param name
	 *            (can be null) default : _blank            
	 * @param intWidth
	 *            (can be null) default : 0 (yes|no|1|0)
	 * @param intHeight
	 *            (can be null) default : 0 (yes|no|1|0)
	 * @param resizeable
	 *            (can be null) default : no (yes|no|1|0)
	 * @param scrollbars
	 *            (can be null) default : no (yes|no|1|0)
	 */
	openByPost : function(formId, url, name, intWidth, intHeight, resizeable, scrollbars) {
		if (formId == null)
			return;
		if (url == null)
			return;
		if (intWidth != null && isNaN(intWidth))
			intWidth = 800;
		if (intHeight != null && isNaN(intHeight))
			intHeight = 400;

		var posX = (screen.availWidth - intWidth) / 2;
		var posY = (screen.availHeight - intHeight) / 2;
		var winoption = "";

		if (resizeable == "yes" || resizeable == 1)
			resizeable = 'yes';
		else
			resizable = 'no';
		if (scrollbars == "yes" || scrollbars == 1)
			scrollbars = 'yes';
		else
			scrollbars = 'no';

		winoption = "toolbar=no,location=no,directories=no,status=no";
		winoption += ",left=" + posX + ",top=" + posY;
		winoption += ",width=" + intWidth + ",height=" + intHeight;
		winoption += ",resizable=" + resizeable + ",scrollbars=" + scrollbars;

		var winObj = window.open('', name, winoption);

		var form = document.getElementById(formId);
		form.action = url;
		form.target = name;
		form.submit();

		winObj.focus();
		form.target = "_self";
	},


	/**
	 * ex) popup.openByGet ('','') or ('','','','','','') or (null,null,null,null,null,null)
	 * can be null >> '' Or null
	 * 
	 * @param url
	 *            (required)
	 * @param name
	 *            (can be null) default : _blank            
	 * @param intWidth
	 *            (can be null) default : 0 (yes|no|1|0)
	 * @param intHeight
	 *            (can be null) default : 0 (yes|no|1|0)
	 * @param resizeable
	 *            (can be null) default : no (yes|no|1|0)
	 * @param scrollbars
	 *            (can be null) default : no (yes|no|1|0)
	 */
	openByGet : function(url, name, intWidth, intHeight, resizeable, scrollbars) {
		if (url == null)
			return;
		if (intWidth != null && isNaN(intWidth))
			intWidth = 800;
		if (intHeight != null && isNaN(intHeight))
			intHeight = 400;

		var posX = (screen.availWidth - intWidth) / 2;
		var posY = (screen.availHeight - intHeight) / 2;
		var winoption = "";

		if (resizeable == "yes" || resizeable == 1)
			resizeable = 'yes';
		else
			resizable = 'no';
		if (scrollbars == "yes" || scrollbars == 1)
			scrollbars = 'yes';
		else
			scrollbars = 'no';

		winoption = "toolbar=no,location=no,directories=no,status=no";
		winoption += ",left=" + posX + ",top=" + posY;
		winoption += ",width=" + intWidth + ",height=" + intHeight;
		winoption += ",resizable=" + resizeable + ",scrollbars=" + scrollbars;

		window.open(url, name, winoption);
	}
};

