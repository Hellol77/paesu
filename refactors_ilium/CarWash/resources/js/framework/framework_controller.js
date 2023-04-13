/**
 * 설명 : JavaScript UI Framework
 *
 * @Class  fwebui.js
 * @author  FAS 정영탁
 * @since   2016. 09. 05
 * @version 1.0
 *
 * @Copyright (c) Finance All Solutions.
 *--------------------------------------------------------------------
 * Modification Information
 *--------------------------------------------------------------------
 * 수정일               수정자            수정내용
 *--------------------------------------------------------------------
 * 2016. 09. 05.        정영탁          [GBS] 최초생성
 */

var JSON;if (!JSON) {JSON = {};}(function() {'use strict';function f(n) {return n < 10 ? '0' + n : n;}if (typeof Date.prototype.toJSON !== 'function') {Date.prototype.toJSON = function(key) {return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;};String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {return this.valueOf();};}var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\'}, rep;function quote(string) {escapable.lastIndex = 0;return escapable.test(string) ? '"' + string.replace(escapable, function(a) {var c = meta[a];return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);}) + '"' : '"' + string + '"';}function str(key, holder) {var i, k, v, length, mind = gap, partial, value = holder[key];if (value && typeof value === 'object' && typeof value.toJSON === 'function') {value = value.toJSON(key);}if (typeof rep === 'function') {value = rep.call(holder, key, value);}switch (typeof value) {case'string': return quote(value);case'number': return isFinite(value) ? String(value) : 'null';case'boolean': case'null': return String(value);case'object': if (!value) {return'null';}gap += indent;partial = [];if (Object.prototype.toString.apply(value) === '[object Array]') {length = value.length;for (i = 0; i < length; i += 1) {partial[i] = str(i, value) || 'null';}v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';gap = mind;return v;}if (rep && typeof rep === 'object') {length = rep.length;for (i = 0; i < length; i += 1) {if (typeof rep[i] === 'string') {k = rep[i];v = str(k, value);if (v) {partial.push(quote(k) + (gap ? ': ' : ':') + v);}}}}else {for (k in value) {if (Object.prototype.hasOwnProperty.call(value, k)) {v = str(k, value);if (v) {partial.push(quote(k) + (gap ? ': ' : ':') + v);}}}}v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';gap = mind;return v;}}if (typeof JSON.stringify !== 'function') {JSON.stringify = function(value, replacer, space) {var i;gap = '';indent = '';if (typeof space === 'number') {for (i = 0; i < space; i += 1) {indent += ' ';}}else if (typeof space === 'string') {indent = space;}rep = replacer;if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {throw new Error('JSON.stringify');}return str('', {'': value});};}if (typeof JSON.parse !== 'function') {JSON.parse = function(text, reviver) {var j;function walk(holder, key) {var k, v, value = holder[key];if (value && typeof value === 'object') {for (k in value) {if (Object.prototype.hasOwnProperty.call(value, k)) {v = walk(value, k);if (v !== undefined) {value[k] = v;}else {delete value[k];}}}}return reviver.call(holder, key, value);}text = String(text);cx.lastIndex = 0;if (cx.test(text)) {text = text.replace(cx, function(a) {return'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);});}if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {j = eval('(' + text + ')');return typeof reviver === 'function' ? walk({'': j}, '') : j;}throw new SyntaxError('JSON.parse');};}}());

(function($, window) {
	/****************************************
	 * Common Utils
	 ****************************************/
	var exportProperty = function(obj, name, value) {
		obj[name] = value;
	};
	var functionWrapper = function(handler) {
		return function() {
			if (handler) {
				return handler.apply(this, arguments);
			}
		};
	};
	var formToObject = function(form) {
		var o = {};
		var jf = $(form);
		if (form && jf.length > 0 && jf[0].tagName == 'FORM') {
			$.each(jf.serializeArray(), function(i, v) {
				if (o[v.name] !== undefined) {
					if (!o[v.name].push) {
						o[v.name] = [ o[v.name] ];
					}
					o[v.name].push(v.value || '');
				} else {
					o[v.name] = v.value || '';
				}
			});
		}
		return o;
	};
	var qualifyUrl = function(url) {
		var a = document.createElement('a');
		a.href = url;
		return a.href;
	};
	var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	var rstyle = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi;
	var rlink = /<link(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/gi;


	/*******************************************
	 * Navigate API
	 *******************************************/

	// deferred wrapper
	var DeferredWrapper = function(dfd) {
		this.deferred = dfd;
		this.userDone = [];
		this.userFail = [];
		this.userAlways = [];
		this.defaultUserDone = null;
		this.defaultUserFail = null;
		this.defaultUserAlways = null;
	};
	DeferredWrapper.prototype.done = function(callback, isDefault) {
		var state = this.deferred.state();
		if (isDefault) {
			this.defaultUserDone = callback;
		} else if (state == 'pending') {
			this.userDone.push(callback);
		} else if (state == 'resolved' && !this.defaultUserDone) {
			callback();
		}
		return this;
	};
	DeferredWrapper.prototype.fail = function(callback, isDefault) {
		var state = this.deferred.state();
		if (isDefault) {
			this.defaultUserFail = callback;
		} else if (state == 'pending') {
			this.userFail.push(callback);
		} else if (state == 'rejected' && !this.defaultUserFail) {
			callback();
		}
		return this;
	};
	DeferredWrapper.prototype.always = function(callback, isDefault) {
		var state = this.deferred.state();
		if (isDefault) {
			this.defaultUserAlways = callback;
		} else if (state == 'pending') {
			this.userAlways.push(callback);
		} else if (!this.defaultUserAlways) {
			callback();
		}
		return this;
	};
	DeferredWrapper.prototype.register = function(dfd) {
		var userdfd = this;
		dfd = dfd || this.deferred;
		this.deferred = dfd;
		$.each([['done', 'userDone', 'defaultUserDone'],
				['fail', 'userFail', 'defaultUserFail'],
				['always', 'userAlways', 'defaultUserAlways']], function(i, api) {
			dfd[api[0]](function() {
				var arg = arguments;
				if (userdfd[api[1]].length) {
					$.each(userdfd[api[1]], function(idx, el) { el.apply(this, arg); });
				} else if (userdfd[api[2]]) {
					userdfd[api[2]].apply(this, arg);
				}
			});
		});
	};


	/***************************************************************************
	 * Navigate API
	 **************************************************************************/
	var navigateOptions = {};
	navigateOptions['generateUrl'] = null;
	navigateOptions['generateFragmentUrl'] = null;
	navigateOptions['fragmentJSONRequest'] = null;
	navigateOptions['parseScreenId'] = null;
	navigateOptions['frameworkRefresh'] = null;
	navigateOptions['defaultMethod'] = null;
	navigateOptions['commonHeaders'] = {};
	navigateOptions['validateResponse'] = null;
	navigateOptions['forceFragmentLoad'] = null;
	navigateOptions['startProgress'] = null;
	navigateOptions['endProgress'] = null;
	navigateOptions['useProgress'] = null;
	navigateOptions['defaultSuccess'] = null;
	navigateOptions['defaultError'] = null;
	navigateOptions['commonSuccess'] = null;
	navigateOptions['commonError'] = null;
	navigateOptions['preProcessor'] = null;
	navigateOptions['postProcessor'] = null;
	navigateOptions['frameworkRefreshPreprocessor'] = null;
	navigateOptions['additionalParam'] = {};
	navigateOptions['timeout'] = 60 * 1000;

	var showNavigateProgress = function(frag, option, complete) {
		if (!option['useProgress']) {
			if (typeof complete == 'function') {
				complete();
			}
			return;
		}
		if (typeof option['startProgress'] == typeof function() {}) {
			return option['startProgress'](frag, complete);
		}
	};
	var hideNavigateProgress = function(frag, option, complete) {
		if (!option['useProgress']) {
			if (typeof complete == 'function') {
				complete();
			}
			return;
		}
		if (typeof option['endProgress'] == typeof function() {}) {
			return option['endProgress'](frag, complete);
		}
	};

	var defaultProgress = null;
	var defaultStartProgress = function(frag, complete) {
		// defaultStartProgress
	};
	var defaultEndProgress = function(frag, complete) {
		// defaultEndProgress
	};

	var navigateConfigCore = function(option, value) {
		if (!option) {
			return;
		}
		if (typeof option == typeof '') {
			var key = option;
			option = {};
			option[key] = value;
		}
		if (typeof option == typeof {}) {
			for ( var prop in navigateOptions) {
				value = option[prop];
				if (value !== undefined) {
					if (prop == 'additionalParam') {
						if (value) {
							for ( var name in value) {
								navigateOptions[prop][name] = value[name];
							}
						} else {
							navigateOptions[prop] = {};
						}
					} else if (prop == 'commonHeaders') {
						if (value) {
							for ( var name in value) {
								navigateOptions[prop][name] = value[name];
							}
						} else {
							navigateOptions[prop] = {};
						}
					} else {
						navigateOptions[prop] = value;
					}
				}
			}
		}
	};

	var navigateCore = function(path, param, option, loadto) {
		var dfd = $.Deferred();
		var userdfd = new DeferredWrapper(dfd);
		var currentOption = {};
		var fragload = $(navigateOptions['frameworkRefresh']);
		var url = '';
		var dopost = false;
		var headers = {};
		var _param = null; // param이 form이었을 경우, 기존의 form을 보관

		if (loadto) {
			fragload = $(loadto);
		}

		// 옵션
		for ( var prop in navigateOptions) {
			currentOption[prop] = navigateOptions[prop];
		}
		if (option && option['method']) {
			currentOption['defaultMethod'] = option['method'].toUpperCase();
		}

		if (option && option['nofrag'] && !loadto) {
			fragload = $(null);	// $fn.navigate가 아닌 navigate API 호출
		}
		if (option && option['forceFragmentLoad']) {
			currentOption['forceFragmentLoad'] = option['forceFragmentLoad'];
		}

		$.each(['startProgress', 'endProgress', 'preProcessor',
				'postProcessor', 'useProgress' ], function(idx, val) {
			if (option && option[val] !== undefined) {
				currentOption[val] = option[val];
			}
		});
		// $fn.navigate 호출 시 post body를 JSON으로 할 것인지 queryString으로 할 것인지 지정
		if (option && option['fragmentJSONRequest'] !== undefined) {
			currentOption['fragmentJSONRequest'] = option['fragmentJSONRequest'];
		}
		if (option && option['additionalParam']) {
			$.each(option['additionalParam'], function(key, value) {
				currentOption['additionalParam'][key] = value;
			});
		}

		// option에서 validateResponse 설정.
		if (option && option['validateResponse']) {
			currentOption['validateResponse'] = option['validateResponse'];
		}

		// option에서 timeout 설정.
		if (option && option['timeout']) {
			currentOption['timeout'] = option['timeout'];
		}

		// request.header 정보 설정.
		if (option && option['headers']) {
			for ( var prop in option['headers']) {
				headers[prop] = option.headers[prop];
			}
		}

		// 사용자지정 callback 등록.
		// 사용자가 deferred외에 API호출시 명시적으로 callback을 등록하지 않았다면, defaultSuccess/defaultError로 콜백을 대체한다.
		userdfd.register(); // deferred wrapper를 통해 done, fail, always에 사용자 콜백을 우선 호출하도록 등록.
		if (option && option['success']) {
			userdfd.done(option['success']);
		} else if (typeof currentOption['defaultSuccess'] == 'function') {
			userdfd.done(currentOption['defaultSuccess'], true);
		}
		if (option && option['error']) {
			userdfd.fail(option['error']);
		} else if (typeof currentOption['defaultError'] == 'function') {
			userdfd.fail(currentOption['defaultError'], true);
		}
		// common 콜백 처리
		if (typeof currentOption['commonSuccess'] == "function") {
			dfd.done(currentOption['commonSuccess']);
		}
		if (typeof currentOption['commonError'] == "function") {
			dfd.fail(currentOption['commonError']);
		}

		if (currentOption['defaultMethod'] == 'POST') {
			dopost = true;
		}	

		// form submit, ajax load 등을 사용할 때 서버에 전송할 header준비.
		$.each([ 'commonHeaders', 'headers' ], function(idx, val) {
			if (typeof currentOption[val] == typeof {}) {
				for ( var prop in currentOption[val]) {
					if (!headers) {
						headers = {};
					}
					headers[prop] = currentOption[val][prop];
				}
			}
		});

		// param이 form일 경우 object화 한다.
		if (param && $(param).length > 0 && $(param)[0].tagName == 'FORM') {
			_param = param;// 기존의 param을 보관
			param = formToObject(param);
		}

		// 추가 parameter를 merge한다.
		if (currentOption['additionalParam']) {
			$.each(currentOption['additionalParam'], function(key, value) {
				param = param || {};
				param[key] = value;
				if (_param) {
					$(_param).find('[name="' + key + '"]').remove();
					if ($.isArray(value)) {
						$.each(value, function(i, el) {
							var input = $('<input type="hidden" name="' + key + '" class="additionalParam"/>');
							input.val(el);
							$(_param).append(input);
						});
					} else {
						var input = $('<input type="hidden" name="' + key + '" class="additionalParam"/>');
						input.val(value);
						$(_param).append(input);
					}
				}
			});
		}

		if (currentOption['preProcessor']) {
			currentOption['preProcessor'].apply(this, arguments);
		};
		dfd.always(function() {
			hideNavigateProgress(fragload.length ? fragload : null, currentOption);
			if (currentOption['postProcessor']) {
				currentOption['postProcessor'].apply(this, arguments);
			};
		}).always(function() {
			if (_param) { // 전송 완료 후에 추가 파라메터 제거
				$(_param).find('input.additionalParam').remove();
			}
		});

		if (fragload.length > 0) {
			// 부분 화면 전환
			// loadto 없이 Refresh영역에 의한 부분로드를 수행할 때엔 full url로 이동
			url = currentOption['generateFragmentUrl'](path);

			var setup = {
				url : url,
				type : currentOption['defaultMethod'] || 'GET',
				dataType : 'html text',
				headers : headers,
				timeout : currentOption['timeout']
			};
			if (param) {
				if (dopost && currentOption['fragmentJSONRequest'] && !_param) {
					setup.contentType = 'application/json; charset=utf-8';
					setup.processData = false;
					setup.data = JSON.stringify(param);
				} else {
					// Form encoding
					setup.contentType = 'application/x-www-form-urlencoded; charset=utf-8';
					setup.processData = true;
					setup.data = _param ? $(_param).serialize() : param;
				}
			}
			setup.beforeSend = function(xhr, settings) {
				if (!loadto && fragload && navigateOptions['refreshPreprocessor']) {
					navigateOptions['refreshPreprocessor'](xhr, settings);
				}
			};

			// $fn.navigate의 target element를 설정.
			setup.targetElement = fragload;

			var xhrdone = function(data, status, jqxhr) {
				// 정상 response를 판별하는 함수가 있을 경우
				if (currentOption['validateResponse']) {
					// parsing하지 않은 raw data를 건냄. parsing은 validateResponse에서 처리
					if (currentOption['validateResponse'].call(this, data, status, jqxhr) === false) {
						dfd.reject(data, status, jqxhr);
					}
				}
				if (dfd.state() !== 'rejected' || currentOption['forceFragmentLoad']) {
					var appendhtml = data.replace(rscript, '').replace(rstyle, '').replace(rlink, '');
					var regscr;
					var match;
					// IE에서 중첩된 css를 link하는 경우 selector의 사용에 따라 효과가 엉뚱하게 적용되는 현상이 관측됨.
					// 중첩되는 css를 link하지 않는다. 그외에는 script보다 먼저 append되도록 유도한다.
					regscr = new RegExp(rlink);
					var links = $('link[rel="stylesheet"]');
					while (match = regscr.exec(data)) {
						var node = match[0];
						if (/rel="stylesheet"/.test(node)) {
							var href = qualifyUrl(node.match(/href="([^"]+)"/)[1]);
							var passnode = false;
							links.each(function(idx, elem) {
								if (qualifyUrl($(elem).attr('href')) === href) {
									passnode = true;
								}
							});
							if (passnode) {
								continue;
							}
						}
						appendhtml = node + appendhtml;
					}

					regscr = new RegExp(rstyle);
					while (match = regscr.exec(data)) {
						appendhtml = match[0] + appendhtml;
					}
					regscr = new RegExp(rscript);
					var scripts = $('script[type="text/javascript"]');
					while (match = regscr.exec(data)) {
						// script 중복 삽입 배제.
						var node = match[0];
						if (/src=/.test(node)) {
							var src = qualifyUrl(node.match(/src="([^"]+)"/)[1]);
							var passnode = false;
							scripts.each(function(idx, elem) {
								if (qualifyUrl($(elem).attr('src')) === src) {
									// passnode = true; 20130322 중복로드가 허용되어야 한다는 요청 접수.
								}
							});
							if (passnode) {
								continue;
							}
						}
						// android 2.3에서 .html()로 script가 있는 text를 바로 넣을 경우 처리가 되지 않는다.
						// script tag를 찾아서 수동으로 node에 붙여넣는것으로 스크립트를 실행시킬 수 있다.
						// 스크립트는 가장 마지막에 넣는다. script는 dom에 붙었을 때 효력을 발휘한다.
						// 중간 생성한 node에 붙였을때엔 실행없이 사라지거나 IE에서는 권한없음 에러가 발생함.
						appendhtml += match[0];
					}

					// IE9 bug(ajax로 대량의 table cell markup을 수신 시 cell이 밀리는 현상)
					// <td>사이의 공백이나 개행 문자가 있을 경우 발생함.
					if (navigator.appVersion.indexOf("MSIE 9.") != -1) {
						appendhtml = appendhtml.replace(/td>\s+<td/g, 'td><td');
						appendhtml = appendhtml.replace(/tr>\s+<td/g, 'tr><td');
						appendhtml = appendhtml.replace(/td>\s+<tr/g, 'td><tr');
					}

					// reject후의 resolve는 아무 효력을 가지지 못한다.
					fragload.html(appendhtml);
					dfd.resolve(data, status, jqxhr);
				}
			};
			var xhrfail = function(jqxhr, status, error) {
				dfd.reject(jqxhr.responseText, status, jqxhr, error);
			};

			setup.success = xhrdone;
			setup.error = xhrfail;
			showNavigateProgress(fragload.length ? fragload : null, currentOption);
			$.ajax(setup);
		}
		else {
			// 전체 화면 전환
			showNavigateProgress(document.body, currentOption);
			url = navigateOptions['generateUrl'](path);
			// 사용자 지정 method가 없고, navigate시 전송할 param도 없고, header도 없음.
			if (!currentOption['defaultMethod'] && !param) {
				window.location.href = url;
			} else {
				// 사용자 지정 method가 존재하거나, 또는 param이 있음.
				// defaultMethod가 없는 경우 dopost변수는 false. 자동적으로 get request 사용.
				var formclass = 'hiddenform';
				$('head > form.' + formclass).remove(); // 기존 사용한 form 삭제.
				var form = $('<form class="' + formclass + '" style="display:none;"></form>').appendTo('head');
				form.attr('method', dopost ? 'POST' : 'GET');
				form.attr('action', url);

				// navigate의 option에 target 지정이 되어있을 경우.
				if (option && option['target']) {
					form.attr('target', option['target']);
				}

				if (_param) {
					// param으로 form이 들어왔을 경우, form의 attribute와 children을 옮겨온다.
					// html 레이아웃으로 들어가 있는 form에 action, method등의 값을
					// javascript가 변경하지 않도록 이런 루틴으로 작성.
					$.each([ 'action', 'enctype', 'acceptCharset', 'target' ], function(i, v) {
						if (v == 'action' && path) {
							// 만일 navigate로 이동해야 될 경로가 명시되었다면 form의 action값을 가져오지 않는다.
							return;
						}
						if ($(_param)[0][v] && $(_param)[0][v] != "null") {
							form.attr(v, $(_param)[0][v]);
						}
					});
				}
				if (_param && $(_param).length > 0 && $(_param)[0].tagName == 'FORM') {
					var sa = $(_param).serializeArray();
					for (var i = 0; i < sa.length; i++) {
						var el = sa[i];
						$('<input type="hidden" name="' + el.name + '"/>').val(el.value).appendTo(form);
					}
					// serialize()는 file을 유실시키므로 별도 처리
					var file = $(_param).find('input[type="file"]');
					file.each(function(idx, elem) {
						var mark = $('<div style="position:absolute;display:none;">').insertBefore(elem);
						$(elem).appendTo(form);
						dfd.always(function() {
							$(elem).insertAfter(mark);
							mark.remove();
						});
					});
				} else if (param && typeof param == typeof {}) {
					// navigate param으로 object(key-value store)를 넘긴 경우
					// input 태그를 생성하여 post요청 수행
					for ( var prop in param) {
						var item = param[prop];
						if ($.isArray(item)) {
							$.each(item, function(i, value) {
								$('<input type="hidden" name="' + prop + '"/>').val(value).appendTo(form);
							});
						} else {
							$('<input type="hidden" name="' + prop + '"/>').val(item).appendTo(form);
						}
					}
				}
				// IE7에서 form.submit()으로 호출시 이벤트 trigger, 이때 onsubmit 핸들러가 없을경우 "null"스트링이 생성됨.
				// "null"을 true로 인식하고 "null"() 과 같이 함수실행을 시도하면서 예외 발생. 이벤트 사용치 않도록 함.
				form[0].submit();
			}
			dfd.resolve();
		}
		return userdfd;
	};

	var navigateFnWrapper = function(path, param, option) {
		if (this.length) {
			return navigateCore.call(this, path, param, option, this);
		} else {
			return $.Deferred().reject();
		}
	};

	var navigateWrapper = function(path, param, option) {
		return navigateCore(path, param, option);
	};

	var navigateInit = function() {
		exportProperty(window, 'navigate', functionWrapper(navigateWrapper));
		exportProperty(window, 'navigateConfig', functionWrapper(navigateConfigCore));
		exportProperty($.fn, 'navigate', functionWrapper(navigateFnWrapper));

	    // Default 구현 입력
		navigateConfigCore({
			'generateUrl' : function(targetpath) {
				return targetpath;
			},
			'generateFragmentUrl' : function(targetpath) {
				return targetpath;
			},
			'parseScreenId' : function(url) {
			},
			'defaultMethod' : 'POST',
			'validateResponse' : null
		});
		navigateConfigCore('useProgress', false);
		navigateConfigCore('startProgress', defaultStartProgress);
		navigateConfigCore('endProgress', defaultEndProgress);
	};

	navigateInit();


	/***************************************************************************
	 * AJAX API
	 **************************************************************************/
	var iOSJsonPattern = /(\n\r|\r\n|\n|\\n\\r|\\r\\n|\\n)/gi;
	var httpSendOptions = {};
	httpSendOptions['generateUrl'] = null;
	httpSendOptions['applicationId'] = null;
	httpSendOptions['validateResponse'] = null;
	httpSendOptions['defaultOnStart'] = null;
	httpSendOptions['defaultOnEnd'] = null;
	httpSendOptions['async'] = null;
	httpSendOptions['timeout'] = 60 * 1000;
	httpSendOptions['useProgress'] = null;
	httpSendOptions['startProgress'] = null;
	httpSendOptions['endProgress'] = null;
	httpSendOptions['commonHeaders'] = {};
	httpSendOptions['defaultSuccess'] = null;
	httpSendOptions['defaultError'] = null;
	httpSendOptions['commonSuccess'] = null;
	httpSendOptions['commonError'] = null;
	httpSendOptions['preProcessor'] = null;
	httpSendOptions['postProcessor'] = null;
	httpSendOptions['additionalParam'] = {};

	var showHttpProgress = function(option, complete) {
		if (!option['useProgress']) {
			if (typeof complete == 'function') {
				complete();
			}
			return;
		}
		if (typeof option['startProgress'] == typeof function() {}) {
			return option['startProgress'](complete);
		}
	};
	var hideHttpProgress = function(option, complete) {
		if (!option['useProgress']) {
			if (typeof complete == 'function') {
				complete();
			}
			return;
		}
		if (typeof option['endProgress'] == typeof function() {}) {
			return option['endProgress'](complete);
		}
	};

	var defaultHttpProgress = null;
	var defaultHttpStartProgress = function(complete) {
		// defaultHttpStartProgress
	};
	var defaultHttpEndProgress = function(complete) {
		// defaultHttpEndProgress
	};

	var httpConfigCore = function(option, value) {
		if (!option) {
			return;
		}
		if (typeof option == typeof '') {
			var key = option;
			option = {};
			option[key] = value;
		}
		if (typeof option == typeof {}) {
			for ( var prop in httpSendOptions) {
				value = option[prop];
				if (value !== undefined) {
					if (prop == 'additionalParam') {
						if (value) {
							for ( var name in value) {
								httpSendOptions[prop][name] = value[name];
							}
						} else {
							httpSendOptions[prop] = {};
						}
					} else if (prop == 'commonHeaders') {
						if (value) {
							for ( var name in value) {
								httpSendOptions[prop][name] = value[name];
							}
						} else {
							httpSendOptions[prop] = {};
						}
					} else {
						httpSendOptions[prop] = value;
					}
				}
			}
		}
	};

	var httpSendCore = function(service, content, option) {
		var dfd = $.Deferred();
		var userdfd = new DeferredWrapper(dfd);
		var currentOption = {};
		var headers = {};
		var setup = {};
		var _content = false; // content가 form이었을 경우, 기존의 form을 보관
		var multipart = false; // multipart/form-data 전송 여부
		var isFormData = false;

		for ( var prop in httpSendOptions) {
			currentOption[prop] = httpSendOptions[prop];
		}

		$.each([ 'preProcessor', 'postProcessor', 'useProgress' ], function(idx, val) {
			if (option && option[val] !== undefined) {
				currentOption[val] = option[val];
			}
		});

		// content가 form일 경우 object화 한다.
		if (content && $(content).length > 0 && $(content)[0].tagName == 'FORM') {
			_content = content; // 기존의 content를 저장
			content = formToObject(content);
		}

		// multipart/form-data 전송일 경우
		if (_content && (($(_content).attr('enctype') == 'multipart/form-data' || $(_content).attr('encoding') == 'multipart/form-data'))) {
			multipart = true;
		}
		if (content && content.constructor.toString().indexOf('FormData') > -1) {
			multipart = true;
			isFormData = true;
		}

		// 부분 네비게이션 처리시 post body를 JSON으로 할 것인지 queryString으로 할 것인지 옵션
		if (option && option['fragmentJSONRequest'] !== undefined) {
			currentOption['fragmentJSONRequest'] = option['fragmentJSONRequest'];
		}

		if (option && option['additionalParam']) {
			$.each(option['additionalParam'], function(key, value) {
				currentOption['additionalParam'][key] = value;
			});
		}

		if (currentOption['additionalParam']) {
			$.each(currentOption['additionalParam'], function(key, value) {
				content = content || {};
				content[key] = value;
				if (_content) {
					$(_content).find('[name="' + key + '"]').remove();
					if ($.isArray(value)) {
						$.each(value, function(i, el) {
							var input = $('<input type="hidden" name="' + key + '" class="additionalParam"/>');
							input.val(el);
							$(_content).append(input);
						});
					} else {
						var input = $('<input type="hidden" name="' + key + '" class="additionalParam"/>');
						input.val(value);
						$(_content).append(input);
					}
				}
			});
		}

		if (option && option['timeout']) {
			currentOption['timeout'] = option['timeout'];
		}

		// 사용자지정 callback 등록.
		// 사용자가 deferred외에 API호출시 명시적으로 callback을 등록하지 않았다면, defaultSuccess/defaultError로 콜백을 대체한다.
		userdfd.register();
		if (option && option['success']) {
			userdfd.done(option['success']);
		} else if (typeof currentOption['defaultSuccess'] == 'function') {
			userdfd.done(currentOption['defaultSuccess'], true);
		}
		if (option && option['error']) {
			userdfd.fail(option['error']);
		} else if (typeof currentOption['defaultError'] == 'function') {
			userdfd.fail(currentOption['defaultError'], true);
		}
		// common 콜백 처리
		if (typeof currentOption['commonSuccess'] == "function") {
			dfd.done(currentOption['commonSuccess']);
		}
		if (typeof currentOption['commonError'] == "function") {
			dfd.fail(currentOption['commonError']);
		}

		// onstart/onend
		if (option && typeof option.onstart == typeof function() {}) {
			option.onstart();
		} else if (typeof currentOption['defaultOnStart'] == typeof function() {}) {
			currentOption['defaultOnStart']();
		}
		if (option && typeof option.onend == typeof function() {}) {
			dfd.always(option.onend);
		} else if (typeof currentOption['defaultOnEnd'] == typeof function() {}) {
			dfd.always(currentOption['defaultOnEnd']);
		}
		if (currentOption['async'] === false) {
			setup.async = false;
		}
		if (option && option.async === false) {
			setup.async = false;
		} else if (option && option.async === true) {
			setup.async = true;
		}

		// default에 설정되어 있는 common headers의 내용 설정
		if (currentOption['commonHeaders']) {
			for ( var prop in currentOption['commonHeaders']) {
				headers[prop] = currentOption['commonHeaders'][prop];
			}
		}

		// 사용자가 httpSend 호출 시 headers에 넘긴 내용 설정
		if (option && option.headers) {
			for ( var prop in option.headers) {
				headers[prop] = option.headers[prop];
			}
		}

		if (currentOption['preProcessor']) {
			currentOption['preProcessor'].apply(this, arguments);
		};

		if (currentOption['generateUrl']) {
			setup.url = currentOption['generateUrl'](service);
		} else {
			setup.url = service;
		}
		setup.headers = headers;
		setup.type = 'POST';
		if (content) {
			if (currentOption['fragmentJSONRequest'] && !_content) {
				setup.contentType = 'application/json; charset=utf-8';
				setup.processData = false;
				setup.data = JSON.stringify(content);
			} else if (multipart) { // 파일 업로드
				// File Upload
				setup.crossDomain = true;
				setup.contentType = false;
				setup.processData = false;
				setup.cache = false;
				setup.data = (!isFormData && window.FormData ? new FormData(_content) : content);
			} else {
				// Form encoding
				setup.contentType = 'application/x-www-form-urlencoded; charset=utf-8';
				setup.processData = true;
				setup.data = (_content ? $(_content).serialize() : content);
			}
		}
		setup.dataType = 'text';
		setup.timeout = currentOption['timeout'];

		var xhrdone = function(responseText, status, jqxhr) {
			// iOS JSON parsing error 대비.
			var data = $.trim(responseText).replace(iOSJsonPattern, '\\n');
			try {
				data = eval('(' + data + ')');
			} catch (err) {
				dfd.reject(responseText, status, jqxhr);
			}
			if (currentOption['validateResponse']) {
				// parsing 하지 않은 raw data를 건냄. parsing은 validateResponse에서 처리
				if (currentOption['validateResponse'](data, status, jqxhr) === false) {
					dfd.reject(data, 'error', jqxhr);
				}
			}
			if (dfd.state() !== 'rejected') {
				dfd.resolve(data, status, jqxhr);
			}
		};
		var xhrfail = function(jqxhr, status, error) {
			var data = {};
			if (jqxhr.responseText) {
				try {
					var rawdata = $.trim(jqxhr.responseText).replace(iOSJsonPattern, '\\n');
					data = eval('(' + rawdata + ')');
				} catch (err) {
					data = jqxhr.responseText;
				}
			}
			dfd.reject(data, 'error', jqxhr);
		};
		if (setup.async !== false) { // 동기 전송
			var xhr = $.ajax(setup);
			showHttpProgress(currentOption, function() {
				xhr.done(xhrdone);
				xhr.fail(xhrfail);
				xhr.always(function() {
					hideHttpProgress(currentOption);
					if (currentOption['postProcessor']) {
						currentOption['postProcessor'].apply(this, arguments);
					};
				});
			});
		} else if (multipart) { // 파일 업로드
			setup.success = xhrdone;
			setup.error = xhrfail;
			showHttpProgress(currentOption);
			$(_content).ajaxForm(setup);
			hideHttpProgress(currentOption);
			if (currentOption['postProcessor']) {
				currentOption['postProcessor'].apply(this, arguments);
			};
		} else { // 비동기 전송
			setup.success = xhrdone;
			setup.error = xhrfail;
			showHttpProgress(currentOption);
			$.ajax(setup);
			hideHttpProgress(currentOption);
			if (currentOption['postProcessor']) {
				currentOption['postProcessor'].apply(this, arguments);
			};
		}

		return userdfd;
	};

	var httpSendCoreWrapper = function(service, content, success, error, option) {
		if (success && typeof success == typeof function() {}) {
			if (!option) {
				option = {};
			}
			option.success = success;
		}
		if (error && typeof error == typeof function() {}) {
			if (!option) {
				option = {};
			}
			option.error = error;
		}
	    return httpSendCore(service, content, option);
	};

	var httpSendInit = function() {
		exportProperty(window, 'httpSendConfig', functionWrapper(httpConfigCore));
		exportProperty(window, 'httpSend', functionWrapper(httpSendCoreWrapper));
		httpConfigCore('generateUrl', function(service) {
			return service + '.json';
		});
		httpConfigCore('async', true);
		httpConfigCore('useProgress', false);
		httpConfigCore('startProgress', defaultHttpStartProgress);
		httpConfigCore('endProgress', defaultHttpEndProgress);
	};

	httpSendInit();


	/***************************************************************************
	 * UI F/W
	 **************************************************************************/

	var checkBrowser = function() {
		// Browser Check
		if ((/iphone|ipad/gi).test(navigator.appVersion) || (/android/gi).test(navigator.appVersion)) {
			window.browser = 'mobile';
		} else if (navigator.userAgent.toLowerCase().indexOf('msie') !== -1 || navigator.userAgent.toLowerCase().indexOf('trident') !== -1) {
			window.browser = 'ie';
		} else if (navigator.userAgent.toLowerCase().indexOf('chrome') !== -1) {
			window.browser = 'chrome';
		} else if (navigator.userAgent.toLowerCase().indexOf('safari') !== -1) {
			window.browser = 'safari';
		} else if (navigator.userAgent.toLowerCase().indexOf('gecko') !== -1) {
			window.browser = 'firefox';
		} else if (navigator.userAgent.toLowerCase().indexOf('opera') !== -1) {
			window.browser = 'opera';
		}
	};

	var uiInit = function() {
		if (window.console == undefined) { console = { log: function() {} }; }

		checkBrowser();
	};

	uiInit();

})(jQuery, window);
