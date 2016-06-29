/**
 * AlloyEditor v1.2.3
 *
 * Copyright 2014-present, Liferay, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the GNU LGPL-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function() {
    function deployCKEditor() {
        /*
Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function(){if(window.CKEDITOR&&window.CKEDITOR.dom)return;window.CKEDITOR||(window.CKEDITOR=function(){var a=/(^|.*[\\\/])alloy-editor-no-react\.js(?:\?.*|;.*)?$/i,d={timestamp:"G4CD",version:"4.5.9",revision:"a35abfe",rnd:Math.floor(900*Math.random())+100,_:{pending:[],basePathSrcPattern:a},status:"unloaded",basePath:function(){var b=window.CKEDITOR_BASEPATH||"";if(!b)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var k=c[d].src.match(a);if(k){b=k[1];break}}-1==b.indexOf(":/")&&"//"!=b.slice(0,2)&&(b=0===b.indexOf("/")?location.href.match(/^.*?:\/\/[^\/]*/)[0]+
b:location.href.match(/^[^\?]*\/(?:)/)[0]+b);if(!b)throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';return b}(),getUrl:function(a){-1==a.indexOf(":/")&&0!==a.indexOf("/")&&(a=this.basePath+a);this.timestamp&&"/"!=a.charAt(a.length-1)&&!/[&?]t=/.test(a)&&(a+=(0<=a.indexOf("?")?"\x26":"?")+"t\x3d"+this.timestamp);return a},domReady:function(){function a(){try{document.addEventListener?(document.removeEventListener("DOMContentLoaded",
a,!1),b()):document.attachEvent&&"complete"===document.readyState&&(document.detachEvent("onreadystatechange",a),b())}catch(c){}}function b(){for(var a;a=c.shift();)a()}var c=[];return function(b){function d(){try{document.documentElement.doScroll("left")}catch(f){setTimeout(d,1);return}a()}c.push(b);"complete"===document.readyState&&setTimeout(a,1);if(1==c.length)if(document.addEventListener)document.addEventListener("DOMContentLoaded",a,!1),window.addEventListener("load",a,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",
a);window.attachEvent("onload",a);b=!1;try{b=!window.frameElement}catch(w){}document.documentElement.doScroll&&b&&d()}}}()},b=window.CKEDITOR_GETURL;if(b){var c=d.getUrl;d.getUrl=function(a){return b.call(d,a)||c.call(d,a)}}return d}());
CKEDITOR.event||(CKEDITOR.event=function(){},CKEDITOR.event.implementOn=function(a){var d=CKEDITOR.event.prototype,b;for(b in d)null==a[b]&&(a[b]=d[b])},CKEDITOR.event.prototype=function(){function a(a){var e=d(this);return e[a]||(e[a]=new b(a))}var d=function(a){a=a.getPrivate&&a.getPrivate()||a._||(a._={});return a.events||(a.events={})},b=function(a){this.name=a;this.listeners=[]};b.prototype={getListenerIndex:function(a){for(var b=0,d=this.listeners;b<d.length;b++)if(d[b].fn==a)return b;return-1}};
return{define:function(b,d){var g=a.call(this,b);CKEDITOR.tools.extend(g,d,!0)},on:function(b,d,g,l,k){function q(a,f,y,k){a={name:b,sender:this,editor:a,data:f,listenerData:l,stop:y,cancel:k,removeListener:w};return!1===d.call(g,a)?!1:a.data}function w(){y.removeListener(b,d)}var f=a.call(this,b);if(0>f.getListenerIndex(d)){f=f.listeners;g||(g=this);isNaN(k)&&(k=10);var y=this;q.fn=d;q.priority=k;for(var A=f.length-1;0<=A;A--)if(f[A].priority<=k)return f.splice(A+1,0,q),{removeListener:w};f.unshift(q)}return{removeListener:w}},
once:function(){var a=Array.prototype.slice.call(arguments),b=a[1];a[1]=function(a){a.removeListener();return b.apply(this,arguments)};return this.on.apply(this,a)},capture:function(){CKEDITOR.event.useCapture=1;var a=this.on.apply(this,arguments);CKEDITOR.event.useCapture=0;return a},fire:function(){var a=0,b=function(){a=1},g=0,l=function(){g=1};return function(k,q,w){var f=d(this)[k];k=a;var y=g;a=g=0;if(f){var A=f.listeners;if(A.length)for(var A=A.slice(0),t,D=0;D<A.length;D++){if(f.errorProof)try{t=
A[D].call(this,w,q,b,l)}catch(p){}else t=A[D].call(this,w,q,b,l);!1===t?g=1:"undefined"!=typeof t&&(q=t);if(a||g)break}}q=g?!1:"undefined"==typeof q?!0:q;a=k;g=y;return q}}(),fireOnce:function(a,b,g){b=this.fire(a,b,g);delete d(this)[a];return b},removeListener:function(a,b){var g=d(this)[a];if(g){var l=g.getListenerIndex(b);0<=l&&g.listeners.splice(l,1)}},removeAllListeners:function(){var a=d(this),b;for(b in a)delete a[b]},hasListeners:function(a){return(a=d(this)[a])&&0<a.listeners.length}}}());
CKEDITOR.editor||(CKEDITOR.editor=function(){CKEDITOR._.pending.push([this,arguments]);CKEDITOR.event.call(this)},CKEDITOR.editor.prototype.fire=function(a,d){a in{instanceReady:1,loaded:1}&&(this[a]=!0);return CKEDITOR.event.prototype.fire.call(this,a,d,this)},CKEDITOR.editor.prototype.fireOnce=function(a,d){a in{instanceReady:1,loaded:1}&&(this[a]=!0);return CKEDITOR.event.prototype.fireOnce.call(this,a,d,this)},CKEDITOR.event.implementOn(CKEDITOR.editor.prototype));
CKEDITOR.env||(CKEDITOR.env=function(){var a=navigator.userAgent.toLowerCase(),d=a.match(/edge[ \/](\d+.?\d*)/),b=-1<a.indexOf("trident/"),b=!(!d&&!b),b={ie:b,edge:!!d,webkit:!b&&-1<a.indexOf(" applewebkit/"),air:-1<a.indexOf(" adobeair/"),mac:-1<a.indexOf("macintosh"),quirks:"BackCompat"==document.compatMode&&(!document.documentMode||10>document.documentMode),mobile:-1<a.indexOf("mobile"),iOS:/(ipad|iphone|ipod)/.test(a),isCustomDomain:function(){if(!this.ie)return!1;var a=document.domain,b=window.location.hostname;
return a!=b&&a!="["+b+"]"},secure:"https:"==location.protocol};b.gecko="Gecko"==navigator.product&&!b.webkit&&!b.ie;b.webkit&&(-1<a.indexOf("chrome")?b.chrome=!0:b.safari=!0);var c=0;b.ie&&(c=d?parseFloat(d[1]):b.quirks||!document.documentMode?parseFloat(a.match(/msie (\d+)/)[1]):document.documentMode,b.ie9Compat=9==c,b.ie8Compat=8==c,b.ie7Compat=7==c,b.ie6Compat=7>c||b.quirks);b.gecko&&(d=a.match(/rv:([\d\.]+)/))&&(d=d[1].split("."),c=1E4*d[0]+100*(d[1]||0)+1*(d[2]||0));b.air&&(c=parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
b.webkit&&(c=parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));b.version=c;b.isCompatible=!(b.ie&&7>c)&&!(b.gecko&&4E4>c)&&!(b.webkit&&534>c);b.hidpi=2<=window.devicePixelRatio;b.needsBrFiller=b.gecko||b.webkit||b.ie&&10<c;b.needsNbspFiller=b.ie&&11>c;b.cssClass="cke_browser_"+(b.ie?"ie":b.gecko?"gecko":b.webkit?"webkit":"unknown");b.quirks&&(b.cssClass+=" cke_browser_quirks");b.ie&&(b.cssClass+=" cke_browser_ie"+(b.quirks?"6 cke_browser_iequirks":b.version));b.air&&(b.cssClass+=" cke_browser_air");
b.iOS&&(b.cssClass+=" cke_browser_ios");b.hidpi&&(b.cssClass+=" cke_hidpi");return b}());
"unloaded"==CKEDITOR.status&&function(){CKEDITOR.event.implementOn(CKEDITOR);CKEDITOR.loadFullCore=function(){if("basic_ready"!=CKEDITOR.status)CKEDITOR.loadFullCore._load=1;else{delete CKEDITOR.loadFullCore;var a=document.createElement("script");a.type="text/javascript";a.src=CKEDITOR.basePath+"ckeditor.js";document.getElementsByTagName("head")[0].appendChild(a)}};CKEDITOR.loadFullCoreTimeout=0;CKEDITOR.add=function(a){(this._.pending||(this._.pending=[])).push(a)};(function(){CKEDITOR.domReady(function(){var a=
CKEDITOR.loadFullCore,d=CKEDITOR.loadFullCoreTimeout;a&&(CKEDITOR.status="basic_ready",a&&a._load?a():d&&setTimeout(function(){CKEDITOR.loadFullCore&&CKEDITOR.loadFullCore()},1E3*d))})})();CKEDITOR.status="basic_loaded"}();"use strict";CKEDITOR.VERBOSITY_WARN=1;CKEDITOR.VERBOSITY_ERROR=2;CKEDITOR.verbosity=CKEDITOR.VERBOSITY_WARN|CKEDITOR.VERBOSITY_ERROR;CKEDITOR.warn=function(a,d){CKEDITOR.verbosity&CKEDITOR.VERBOSITY_WARN&&CKEDITOR.fire("log",{type:"warn",errorCode:a,additionalData:d})};
CKEDITOR.error=function(a,d){CKEDITOR.verbosity&CKEDITOR.VERBOSITY_ERROR&&CKEDITOR.fire("log",{type:"error",errorCode:a,additionalData:d})};
CKEDITOR.on("log",function(a){if(window.console&&window.console.log){var d=console[a.data.type]?a.data.type:"log",b=a.data.errorCode;if(a=a.data.additionalData)console[d]("[CKEDITOR] Error code: "+b+".",a);else console[d]("[CKEDITOR] Error code: "+b+".");console[d]("[CKEDITOR] For more information about this error go to http://docs.ckeditor.com/#!/guide/dev_errors-section-"+b)}},null,null,999);CKEDITOR.dom={};
(function(){var a=[],d=CKEDITOR.env.gecko?"-moz-":CKEDITOR.env.webkit?"-webkit-":CKEDITOR.env.ie?"-ms-":"",b=/&/g,c=/>/g,e=/</g,g=/"/g,l=/&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,k={lt:"\x3c",gt:"\x3e",amp:"\x26",quot:'"',nbsp:" ",shy:"­"},q=function(a,f){return"#"==f[0]?String.fromCharCode(parseInt(f.slice(1),10)):k[f]};CKEDITOR.on("reset",function(){a=[]});CKEDITOR.tools={arrayCompare:function(a,f){if(!a&&!f)return!0;if(!a||!f||a.length!=f.length)return!1;for(var b=0;b<a.length;b++)if(a[b]!=f[b])return!1;
return!0},getIndex:function(a,f){for(var b=0;b<a.length;++b)if(f(a[b]))return b;return-1},clone:function(a){var f;if(a&&a instanceof Array){f=[];for(var b=0;b<a.length;b++)f[b]=CKEDITOR.tools.clone(a[b]);return f}if(null===a||"object"!=typeof a||a instanceof String||a instanceof Number||a instanceof Boolean||a instanceof Date||a instanceof RegExp||a.nodeType||a.window===a)return a;f=new a.constructor;for(b in a)f[b]=CKEDITOR.tools.clone(a[b]);return f},capitalize:function(a,f){return a.charAt(0).toUpperCase()+
(f?a.slice(1):a.slice(1).toLowerCase())},extend:function(a){var f=arguments.length,b,c;"boolean"==typeof(b=arguments[f-1])?f--:"boolean"==typeof(b=arguments[f-2])&&(c=arguments[f-1],f-=2);for(var k=1;k<f;k++){var d=arguments[k],p;for(p in d)if(!0===b||null==a[p])if(!c||p in c)a[p]=d[p]}return a},prototypedCopy:function(a){var f=function(){};f.prototype=a;return new f},copy:function(a){var f={},b;for(b in a)f[b]=a[b];return f},isArray:function(a){return"[object Array]"==Object.prototype.toString.call(a)},
isEmpty:function(a){for(var f in a)if(a.hasOwnProperty(f))return!1;return!0},cssVendorPrefix:function(a,f,b){if(b)return d+a+":"+f+";"+a+":"+f;b={};b[a]=f;b[d+a]=f;return b},cssStyleToDomStyle:function(){var a=document.createElement("div").style,f="undefined"!=typeof a.cssFloat?"cssFloat":"undefined"!=typeof a.styleFloat?"styleFloat":"float";return function(a){return"float"==a?f:a.replace(/-./g,function(a){return a.substr(1).toUpperCase()})}}(),buildStyleHtml:function(a){a=[].concat(a);for(var f,
b=[],c=0;c<a.length;c++)if(f=a[c])/@import|[{}]/.test(f)?b.push("\x3cstyle\x3e"+f+"\x3c/style\x3e"):b.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"'+f+'"\x3e');return b.join("")},htmlEncode:function(a){return void 0===a||null===a?"":String(a).replace(b,"\x26amp;").replace(c,"\x26gt;").replace(e,"\x26lt;")},htmlDecode:function(a){return a.replace(l,q)},htmlEncodeAttr:function(a){return CKEDITOR.tools.htmlEncode(a).replace(g,"\x26quot;")},htmlDecodeAttr:function(a){return CKEDITOR.tools.htmlDecode(a)},
transformPlainTextToHtml:function(a,f){var b=f==CKEDITOR.ENTER_BR,c=this.htmlEncode(a.replace(/\r\n/g,"\n")),c=c.replace(/\t/g,"\x26nbsp;\x26nbsp; \x26nbsp;"),k=f==CKEDITOR.ENTER_P?"p":"div";if(!b){var d=/\n{2}/g;if(d.test(c))var p="\x3c"+k+"\x3e",q="\x3c/"+k+"\x3e",c=p+c.replace(d,function(){return q+p})+q}c=c.replace(/\n/g,"\x3cbr\x3e");b||(c=c.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/"+k+"\x3e)"),function(a){return CKEDITOR.tools.repeat(a,2)}));c=c.replace(/^ | $/g,"\x26nbsp;");return c=c.replace(/(>|\s) /g,
function(a,f){return f+"\x26nbsp;"}).replace(/ (?=<)/g,"\x26nbsp;")},getNextNumber:function(){var a=0;return function(){return++a}}(),getNextId:function(){return"cke_"+this.getNextNumber()},getUniqueId:function(){for(var a="e",f=0;8>f;f++)a+=Math.floor(65536*(1+Math.random())).toString(16).substring(1);return a},override:function(a,f){var b=f(a);b.prototype=a.prototype;return b},setTimeout:function(a,f,b,c,k){k||(k=window);b||(b=k);return k.setTimeout(function(){c?a.apply(b,[].concat(c)):a.apply(b)},
f||0)},trim:function(){var a=/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;return function(f){return f.replace(a,"")}}(),ltrim:function(){var a=/^[ \t\n\r]+/g;return function(f){return f.replace(a,"")}}(),rtrim:function(){var a=/[ \t\n\r]+$/g;return function(f){return f.replace(a,"")}}(),indexOf:function(a,f){if("function"==typeof f)for(var b=0,c=a.length;b<c;b++){if(f(a[b]))return b}else{if(a.indexOf)return a.indexOf(f);b=0;for(c=a.length;b<c;b++)if(a[b]===f)return b}return-1},search:function(a,f){var b=CKEDITOR.tools.indexOf(a,
f);return 0<=b?a[b]:null},bind:function(a,f){return function(){return a.apply(f,arguments)}},createClass:function(a){var f=a.$,b=a.base,c=a.privates||a._,k=a.proto;a=a.statics;!f&&(f=function(){b&&this.base.apply(this,arguments)});if(c)var d=f,f=function(){var a=this._||(this._={}),b;for(b in c){var f=c[b];a[b]="function"==typeof f?CKEDITOR.tools.bind(f,this):f}d.apply(this,arguments)};b&&(f.prototype=this.prototypedCopy(b.prototype),f.prototype.constructor=f,f.base=b,f.baseProto=b.prototype,f.prototype.base=
function(){this.base=b.prototype.base;b.apply(this,arguments);this.base=arguments.callee});k&&this.extend(f.prototype,k,!0);a&&this.extend(f,a,!0);return f},addFunction:function(b,f){return a.push(function(){return b.apply(f||this,arguments)})-1},removeFunction:function(b){a[b]=null},callFunction:function(b){var f=a[b];return f&&f.apply(window,Array.prototype.slice.call(arguments,1))},cssLength:function(){var a=/^-?\d+\.?\d*px$/,b;return function(c){b=CKEDITOR.tools.trim(c+"")+"px";return a.test(b)?
b:c||""}}(),convertToPx:function(){var a;return function(b){a||(a=CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e',CKEDITOR.document),CKEDITOR.document.getBody().append(a));return/%$/.test(b)?b:(a.setStyle("width",b),a.$.clientWidth)}}(),repeat:function(a,b){return Array(b+1).join(a)},tryThese:function(){for(var a,b=0,c=arguments.length;b<c;b++){var k=arguments[b];try{a=k();break}catch(d){}}return a},
genKey:function(){return Array.prototype.slice.call(arguments).join("-")},defer:function(a){return function(){var b=arguments,c=this;window.setTimeout(function(){a.apply(c,b)},0)}},normalizeCssText:function(a,b){var c=[],k,d=CKEDITOR.tools.parseCssText(a,!0,b);for(k in d)c.push(k+":"+d[k]);c.sort();return c.length?c.join(";")+";":""},convertRgbToHex:function(a){return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi,function(a,b,c,k){a=[b,c,k];for(b=0;3>b;b++)a[b]=("0"+parseInt(a[b],10).toString(16)).slice(-2);
return"#"+a.join("")})},parseCssText:function(a,b,c){var k={};c&&(c=new CKEDITOR.dom.element("span"),c.setAttribute("style",a),a=CKEDITOR.tools.convertRgbToHex(c.getAttribute("style")||""));if(!a||";"==a)return k;a.replace(/&quot;/g,'"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(a,c,d){b&&(c=c.toLowerCase(),"font-family"==c&&(d=d.toLowerCase().replace(/["']/g,"").replace(/\s*,\s*/g,",")),d=CKEDITOR.tools.trim(d));k[c]=d});return k},writeCssText:function(a,b){var c,k=[];for(c in a)k.push(c+
":"+a[c]);b&&k.sort();return k.join("; ")},objectCompare:function(a,b,c){var k;if(!a&&!b)return!0;if(!a||!b)return!1;for(k in a)if(a[k]!=b[k])return!1;if(!c)for(k in b)if(a[k]!=b[k])return!1;return!0},objectKeys:function(a){var b=[],c;for(c in a)b.push(c);return b},convertArrayToObject:function(a,b){var c={};1==arguments.length&&(b=!0);for(var k=0,d=a.length;k<d;++k)c[a[k]]=b;return c},fixDomain:function(){for(var a;;)try{a=window.parent.document.domain;break}catch(b){a=a?a.replace(/.+?(?:\.|$)/,
""):document.domain;if(!a)break;document.domain=a}return!!a},eventsBuffer:function(a,b,c){function k(){q=(new Date).getTime();d=!1;c?b.call(c):b()}var d,q=0;return{input:function(){if(!d){var b=(new Date).getTime()-q;b<a?d=setTimeout(k,a-b):k()}},reset:function(){d&&clearTimeout(d);d=q=0}}},enableHtml5Elements:function(a,b){for(var c="abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "),
k=c.length,d;k--;)d=a.createElement(c[k]),b&&a.appendChild(d)},checkIfAnyArrayItemMatches:function(a,b){for(var c=0,k=a.length;c<k;++c)if(a[c].match(b))return!0;return!1},checkIfAnyObjectPropertyMatches:function(a,b){for(var c in a)if(c.match(b))return!0;return!1},transparentImageData:"data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",getCookie:function(a){a=a.toLowerCase();for(var b=document.cookie.split(";"),c,k,d=0;d<b.length;d++)if(c=b[d].split("\x3d"),
k=decodeURIComponent(CKEDITOR.tools.trim(c[0]).toLowerCase()),k===a)return decodeURIComponent(1<c.length?c[1]:"");return null},setCookie:function(a,b){document.cookie=encodeURIComponent(a)+"\x3d"+encodeURIComponent(b)+";path\x3d/"},getCsrfToken:function(){var a=CKEDITOR.tools.getCookie("ckCsrfToken");if(!a||40!=a.length){var a=[],b="";if(window.crypto&&window.crypto.getRandomValues)a=new Uint8Array(40),window.crypto.getRandomValues(a);else for(var c=0;40>c;c++)a.push(Math.floor(256*Math.random()));
for(c=0;c<a.length;c++)var k="abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[c]%36),b=b+(.5<Math.random()?k.toUpperCase():k);a=b;CKEDITOR.tools.setCookie("ckCsrfToken",a)}return a}}})();
CKEDITOR.dtd=function(){var a=CKEDITOR.tools.extend,d=function(a,b){for(var c=CKEDITOR.tools.clone(a),k=1;k<arguments.length;k++){b=arguments[k];for(var d in b)delete c[d]}return c},b={},c={},e={address:1,article:1,aside:1,blockquote:1,details:1,div:1,dl:1,fieldset:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,main:1,menu:1,nav:1,ol:1,p:1,pre:1,section:1,table:1,ul:1},g={command:1,link:1,meta:1,noscript:1,script:1,style:1},l={},k={"#":1},q={center:1,dir:1,noframes:1};
a(b,{a:1,abbr:1,area:1,audio:1,b:1,bdi:1,bdo:1,br:1,button:1,canvas:1,cite:1,code:1,command:1,datalist:1,del:1,dfn:1,em:1,embed:1,i:1,iframe:1,img:1,input:1,ins:1,kbd:1,keygen:1,label:1,map:1,mark:1,meter:1,noscript:1,object:1,output:1,progress:1,q:1,ruby:1,s:1,samp:1,script:1,select:1,small:1,span:1,strong:1,sub:1,sup:1,textarea:1,time:1,u:1,"var":1,video:1,wbr:1},k,{acronym:1,applet:1,basefont:1,big:1,font:1,isindex:1,strike:1,style:1,tt:1});a(c,e,b,q);d={a:d(b,{a:1,button:1}),abbr:b,address:c,
area:l,article:c,aside:c,audio:a({source:1,track:1},c),b:b,base:l,bdi:b,bdo:b,blockquote:c,body:c,br:l,button:d(b,{a:1,button:1}),canvas:b,caption:c,cite:b,code:b,col:l,colgroup:{col:1},command:l,datalist:a({option:1},b),dd:c,del:b,details:a({summary:1},c),dfn:b,div:c,dl:{dt:1,dd:1},dt:c,em:b,embed:l,fieldset:a({legend:1},c),figcaption:c,figure:a({figcaption:1},c),footer:c,form:c,h1:b,h2:b,h3:b,h4:b,h5:b,h6:b,head:a({title:1,base:1},g),header:c,hgroup:{h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},hr:l,html:a({head:1,
body:1},c,g),i:b,iframe:k,img:l,input:l,ins:b,kbd:b,keygen:l,label:b,legend:b,li:c,link:l,main:c,map:c,mark:b,menu:a({li:1},c),meta:l,meter:d(b,{meter:1}),nav:c,noscript:a({link:1,meta:1,style:1},b),object:a({param:1},b),ol:{li:1},optgroup:{option:1},option:k,output:b,p:b,param:l,pre:b,progress:d(b,{progress:1}),q:b,rp:b,rt:b,ruby:a({rp:1,rt:1},b),s:b,samp:b,script:k,section:c,select:{optgroup:1,option:1},small:b,source:l,span:b,strong:b,style:k,sub:b,summary:a({h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},b),
sup:b,table:{caption:1,colgroup:1,thead:1,tfoot:1,tbody:1,tr:1},tbody:{tr:1},td:c,textarea:k,tfoot:{tr:1},th:c,thead:{tr:1},time:d(b,{time:1}),title:k,tr:{th:1,td:1},track:l,u:b,ul:{li:1},"var":b,video:a({source:1,track:1},c),wbr:l,acronym:b,applet:a({param:1},c),basefont:l,big:b,center:c,dialog:l,dir:{li:1},font:b,isindex:l,noframes:c,strike:b,tt:b};a(d,{$block:a({audio:1,dd:1,dt:1,figcaption:1,li:1,video:1},e,q),$blockLimit:{article:1,aside:1,audio:1,body:1,caption:1,details:1,dir:1,div:1,dl:1,
fieldset:1,figcaption:1,figure:1,footer:1,form:1,header:1,hgroup:1,main:1,menu:1,nav:1,ol:1,section:1,table:1,td:1,th:1,tr:1,ul:1,video:1},$cdata:{script:1,style:1},$editable:{address:1,article:1,aside:1,blockquote:1,body:1,details:1,div:1,fieldset:1,figcaption:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,main:1,nav:1,p:1,pre:1,section:1},$empty:{area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,
track:1,wbr:1},$inline:b,$list:{dl:1,ol:1,ul:1},$listItem:{dd:1,dt:1,li:1},$nonBodyContent:a({body:1,head:1,html:1},d.head),$nonEditable:{applet:1,audio:1,button:1,embed:1,iframe:1,map:1,object:1,option:1,param:1,script:1,textarea:1,video:1},$object:{applet:1,audio:1,button:1,hr:1,iframe:1,img:1,input:1,object:1,select:1,table:1,textarea:1,video:1},$removeEmpty:{abbr:1,acronym:1,b:1,bdi:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,mark:1,meter:1,output:1,q:1,ruby:1,
s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,time:1,tt:1,u:1,"var":1},$tabIndex:{a:1,area:1,button:1,input:1,object:1,select:1,textarea:1},$tableContent:{caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1},$transparent:{a:1,audio:1,canvas:1,del:1,ins:1,map:1,noscript:1,object:1,video:1},$intermediate:{caption:1,colgroup:1,dd:1,dt:1,figcaption:1,legend:1,li:1,optgroup:1,option:1,rp:1,rt:1,summary:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1}});return d}();
CKEDITOR.dom.event=function(a){this.$=a};
CKEDITOR.dom.event.prototype={getKey:function(){return this.$.keyCode||this.$.which},getKeystroke:function(){var a=this.getKey();if(this.$.ctrlKey||this.$.metaKey)a+=CKEDITOR.CTRL;this.$.shiftKey&&(a+=CKEDITOR.SHIFT);this.$.altKey&&(a+=CKEDITOR.ALT);return a},preventDefault:function(a){var d=this.$;d.preventDefault?d.preventDefault():d.returnValue=!1;a&&this.stopPropagation()},stopPropagation:function(){var a=this.$;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},getTarget:function(){var a=
this.$.target||this.$.srcElement;return a?new CKEDITOR.dom.node(a):null},getPhase:function(){return this.$.eventPhase||2},getPageOffset:function(){var a=this.getTarget().getDocument().$;return{x:this.$.pageX||this.$.clientX+(a.documentElement.scrollLeft||a.body.scrollLeft),y:this.$.pageY||this.$.clientY+(a.documentElement.scrollTop||a.body.scrollTop)}}};CKEDITOR.CTRL=1114112;CKEDITOR.SHIFT=2228224;CKEDITOR.ALT=4456448;CKEDITOR.EVENT_PHASE_CAPTURING=1;CKEDITOR.EVENT_PHASE_AT_TARGET=2;
CKEDITOR.EVENT_PHASE_BUBBLING=3;CKEDITOR.dom.domObject=function(a){a&&(this.$=a)};
CKEDITOR.dom.domObject.prototype=function(){var a=function(a,b){return function(c){"undefined"!=typeof CKEDITOR&&a.fire(b,new CKEDITOR.dom.event(c))}};return{getPrivate:function(){var a;(a=this.getCustomData("_"))||this.setCustomData("_",a={});return a},on:function(d){var b=this.getCustomData("_cke_nativeListeners");b||(b={},this.setCustomData("_cke_nativeListeners",b));b[d]||(b=b[d]=a(this,d),this.$.addEventListener?this.$.addEventListener(d,b,!!CKEDITOR.event.useCapture):this.$.attachEvent&&this.$.attachEvent("on"+
d,b));return CKEDITOR.event.prototype.on.apply(this,arguments)},removeListener:function(a){CKEDITOR.event.prototype.removeListener.apply(this,arguments);if(!this.hasListeners(a)){var b=this.getCustomData("_cke_nativeListeners"),c=b&&b[a];c&&(this.$.removeEventListener?this.$.removeEventListener(a,c,!1):this.$.detachEvent&&this.$.detachEvent("on"+a,c),delete b[a])}},removeAllListeners:function(){var a=this.getCustomData("_cke_nativeListeners"),b;for(b in a){var c=a[b];this.$.detachEvent?this.$.detachEvent("on"+
b,c):this.$.removeEventListener&&this.$.removeEventListener(b,c,!1);delete a[b]}CKEDITOR.event.prototype.removeAllListeners.call(this)}}}();
(function(a){var d={};CKEDITOR.on("reset",function(){d={}});a.equals=function(a){try{return a&&a.$===this.$}catch(c){return!1}};a.setCustomData=function(a,c){var e=this.getUniqueId();(d[e]||(d[e]={}))[a]=c;return this};a.getCustomData=function(a){var c=this.$["data-cke-expando"];return(c=c&&d[c])&&a in c?c[a]:null};a.removeCustomData=function(a){var c=this.$["data-cke-expando"],c=c&&d[c],e,g;c&&(e=c[a],g=a in c,delete c[a]);return g?e:null};a.clearCustomData=function(){this.removeAllListeners();var a=
this.$["data-cke-expando"];a&&delete d[a]};a.getUniqueId=function(){return this.$["data-cke-expando"]||(this.$["data-cke-expando"]=CKEDITOR.tools.getNextNumber())};CKEDITOR.event.implementOn(a)})(CKEDITOR.dom.domObject.prototype);
CKEDITOR.dom.node=function(a){return a?new CKEDITOR.dom[a.nodeType==CKEDITOR.NODE_DOCUMENT?"document":a.nodeType==CKEDITOR.NODE_ELEMENT?"element":a.nodeType==CKEDITOR.NODE_TEXT?"text":a.nodeType==CKEDITOR.NODE_COMMENT?"comment":a.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT?"documentFragment":"domObject"](a):this};CKEDITOR.dom.node.prototype=new CKEDITOR.dom.domObject;CKEDITOR.NODE_ELEMENT=1;CKEDITOR.NODE_DOCUMENT=9;CKEDITOR.NODE_TEXT=3;CKEDITOR.NODE_COMMENT=8;CKEDITOR.NODE_DOCUMENT_FRAGMENT=11;
CKEDITOR.POSITION_IDENTICAL=0;CKEDITOR.POSITION_DISCONNECTED=1;CKEDITOR.POSITION_FOLLOWING=2;CKEDITOR.POSITION_PRECEDING=4;CKEDITOR.POSITION_IS_CONTAINED=8;CKEDITOR.POSITION_CONTAINS=16;
CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype,{appendTo:function(a,d){a.append(this,d);return a},clone:function(a,d){function b(c){c["data-cke-expando"]&&(c["data-cke-expando"]=!1);if(c.nodeType==CKEDITOR.NODE_ELEMENT||c.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)if(d||c.nodeType!=CKEDITOR.NODE_ELEMENT||c.removeAttribute("id",!1),a){c=c.childNodes;for(var e=0;e<c.length;e++)b(c[e])}}function c(b){if(b.type==CKEDITOR.NODE_ELEMENT||b.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT){if(b.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var d=
b.getName();":"==d[0]&&b.renameNode(d.substring(1))}if(a)for(d=0;d<b.getChildCount();d++)c(b.getChild(d))}}var e=this.$.cloneNode(a);b(e);e=new CKEDITOR.dom.node(e);CKEDITOR.env.ie&&9>CKEDITOR.env.version&&(this.type==CKEDITOR.NODE_ELEMENT||this.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)&&c(e);return e},hasPrevious:function(){return!!this.$.previousSibling},hasNext:function(){return!!this.$.nextSibling},insertAfter:function(a){a.$.parentNode.insertBefore(this.$,a.$.nextSibling);return a},insertBefore:function(a){a.$.parentNode.insertBefore(this.$,
a.$);return a},insertBeforeMe:function(a){this.$.parentNode.insertBefore(a.$,this.$);return a},getAddress:function(a){for(var d=[],b=this.getDocument().$.documentElement,c=this.$;c&&c!=b;){var e=c.parentNode;e&&d.unshift(this.getIndex.call({$:c},a));c=e}return d},getDocument:function(){return new CKEDITOR.dom.document(this.$.ownerDocument||this.$.parentNode.ownerDocument)},getIndex:function(a){function d(a,c){var q=c?a.nextSibling:a.previousSibling;return q&&q.nodeType==CKEDITOR.NODE_TEXT?b(q)?d(q,
c):q:null}function b(a){return!a.nodeValue||a.nodeValue==CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE}var c=this.$,e=-1,g;if(!this.$.parentNode||a&&c.nodeType==CKEDITOR.NODE_TEXT&&b(c)&&!d(c)&&!d(c,!0))return-1;do a&&c!=this.$&&c.nodeType==CKEDITOR.NODE_TEXT&&(g||b(c))||(e++,g=c.nodeType==CKEDITOR.NODE_TEXT);while(c=c.previousSibling);return e},getNextSourceNode:function(a,d,b){if(b&&!b.call){var c=b;b=function(a){return!a.equals(c)}}a=!a&&this.getFirst&&this.getFirst();var e;if(!a){if(this.type==
CKEDITOR.NODE_ELEMENT&&b&&!1===b(this,!0))return null;a=this.getNext()}for(;!a&&(e=(e||this).getParent());){if(b&&!1===b(e,!0))return null;a=e.getNext()}return!a||b&&!1===b(a)?null:d&&d!=a.type?a.getNextSourceNode(!1,d,b):a},getPreviousSourceNode:function(a,d,b){if(b&&!b.call){var c=b;b=function(a){return!a.equals(c)}}a=!a&&this.getLast&&this.getLast();var e;if(!a){if(this.type==CKEDITOR.NODE_ELEMENT&&b&&!1===b(this,!0))return null;a=this.getPrevious()}for(;!a&&(e=(e||this).getParent());){if(b&&!1===
b(e,!0))return null;a=e.getPrevious()}return!a||b&&!1===b(a)?null:d&&a.type!=d?a.getPreviousSourceNode(!1,d,b):a},getPrevious:function(a){var d=this.$,b;do b=(d=d.previousSibling)&&10!=d.nodeType&&new CKEDITOR.dom.node(d);while(b&&a&&!a(b));return b},getNext:function(a){var d=this.$,b;do b=(d=d.nextSibling)&&new CKEDITOR.dom.node(d);while(b&&a&&!a(b));return b},getParent:function(a){var d=this.$.parentNode;return d&&(d.nodeType==CKEDITOR.NODE_ELEMENT||a&&d.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)?
new CKEDITOR.dom.node(d):null},getParents:function(a){var d=this,b=[];do b[a?"push":"unshift"](d);while(d=d.getParent());return b},getCommonAncestor:function(a){if(a.equals(this))return this;if(a.contains&&a.contains(this))return a;var d=this.contains?this:this.getParent();do if(d.contains(a))return d;while(d=d.getParent());return null},getPosition:function(a){var d=this.$,b=a.$;if(d.compareDocumentPosition)return d.compareDocumentPosition(b);if(d==b)return CKEDITOR.POSITION_IDENTICAL;if(this.type==
CKEDITOR.NODE_ELEMENT&&a.type==CKEDITOR.NODE_ELEMENT){if(d.contains){if(d.contains(b))return CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING;if(b.contains(d))return CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING}if("sourceIndex"in d)return 0>d.sourceIndex||0>b.sourceIndex?CKEDITOR.POSITION_DISCONNECTED:d.sourceIndex<b.sourceIndex?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING}d=this.getAddress();a=a.getAddress();for(var b=Math.min(d.length,a.length),c=0;c<b;c++)if(d[c]!=
a[c])return d[c]<a[c]?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING;return d.length<a.length?CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING},getAscendant:function(a,d){var b=this.$,c,e;d||(b=b.parentNode);"function"==typeof a?(e=!0,c=a):(e=!1,c=function(b){b="string"==typeof b.nodeName?b.nodeName.toLowerCase():"";return"string"==typeof a?b==a:b in a});for(;b;){if(c(e?new CKEDITOR.dom.node(b):b))return new CKEDITOR.dom.node(b);
try{b=b.parentNode}catch(g){b=null}}return null},hasAscendant:function(a,d){var b=this.$;d||(b=b.parentNode);for(;b;){if(b.nodeName&&b.nodeName.toLowerCase()==a)return!0;b=b.parentNode}return!1},move:function(a,d){a.append(this.remove(),d)},remove:function(a){var d=this.$,b=d.parentNode;if(b){if(a)for(;a=d.firstChild;)b.insertBefore(d.removeChild(a),d);b.removeChild(d)}return this},replace:function(a){this.insertBefore(a);a.remove()},trim:function(){this.ltrim();this.rtrim()},ltrim:function(){for(var a;this.getFirst&&
(a=this.getFirst());){if(a.type==CKEDITOR.NODE_TEXT){var d=CKEDITOR.tools.ltrim(a.getText()),b=a.getLength();if(d)d.length<b&&(a.split(b-d.length),this.$.removeChild(this.$.firstChild));else{a.remove();continue}}break}},rtrim:function(){for(var a;this.getLast&&(a=this.getLast());){if(a.type==CKEDITOR.NODE_TEXT){var d=CKEDITOR.tools.rtrim(a.getText()),b=a.getLength();if(d)d.length<b&&(a.split(d.length),this.$.lastChild.parentNode.removeChild(this.$.lastChild));else{a.remove();continue}}break}CKEDITOR.env.needsBrFiller&&
(a=this.$.lastChild)&&1==a.type&&"br"==a.nodeName.toLowerCase()&&a.parentNode.removeChild(a)},isReadOnly:function(a){var d=this;this.type!=CKEDITOR.NODE_ELEMENT&&(d=this.getParent());CKEDITOR.env.edge&&d&&d.is("textarea","input")&&(a=!0);if(!a&&d&&"undefined"!=typeof d.$.isContentEditable)return!(d.$.isContentEditable||d.data("cke-editable"));for(;d;){if(d.data("cke-editable"))return!1;if(d.hasAttribute("contenteditable"))return"false"==d.getAttribute("contenteditable");d=d.getParent()}return!0}});
CKEDITOR.dom.window=function(a){CKEDITOR.dom.domObject.call(this,a)};CKEDITOR.dom.window.prototype=new CKEDITOR.dom.domObject;
CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype,{focus:function(){this.$.focus()},getViewPaneSize:function(){var a=this.$.document,d="CSS1Compat"==a.compatMode;return{width:(d?a.documentElement.clientWidth:a.body.clientWidth)||0,height:(d?a.documentElement.clientHeight:a.body.clientHeight)||0}},getScrollPosition:function(){var a=this.$;if("pageXOffset"in a)return{x:a.pageXOffset||0,y:a.pageYOffset||0};a=a.document;return{x:a.documentElement.scrollLeft||a.body.scrollLeft||0,y:a.documentElement.scrollTop||
a.body.scrollTop||0}},getFrame:function(){var a=this.$.frameElement;return a?new CKEDITOR.dom.element.get(a):null}});CKEDITOR.dom.document=function(a){CKEDITOR.dom.domObject.call(this,a)};CKEDITOR.dom.document.prototype=new CKEDITOR.dom.domObject;
CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype,{type:CKEDITOR.NODE_DOCUMENT,appendStyleSheet:function(a){if(this.$.createStyleSheet)this.$.createStyleSheet(a);else{var d=new CKEDITOR.dom.element("link");d.setAttributes({rel:"stylesheet",type:"text/css",href:a});this.getHead().append(d)}},appendStyleText:function(a){if(this.$.createStyleSheet){var d=this.$.createStyleSheet("");d.cssText=a}else{var b=new CKEDITOR.dom.element("style",this);b.append(new CKEDITOR.dom.text(a,this));this.getHead().append(b)}return d||
b.$.sheet},createElement:function(a,d){var b=new CKEDITOR.dom.element(a,this);d&&(d.attributes&&b.setAttributes(d.attributes),d.styles&&b.setStyles(d.styles));return b},createText:function(a){return new CKEDITOR.dom.text(a,this)},focus:function(){this.getWindow().focus()},getActive:function(){var a;try{a=this.$.activeElement}catch(d){return null}return new CKEDITOR.dom.element(a)},getById:function(a){return(a=this.$.getElementById(a))?new CKEDITOR.dom.element(a):null},getByAddress:function(a,d){for(var b=
this.$.documentElement,c=0;b&&c<a.length;c++){var e=a[c];if(d)for(var g=-1,l=0;l<b.childNodes.length;l++){var k=b.childNodes[l];if(!0!==d||3!=k.nodeType||!k.previousSibling||3!=k.previousSibling.nodeType)if(g++,g==e){b=k;break}}else b=b.childNodes[e]}return b?new CKEDITOR.dom.node(b):null},getElementsByTag:function(a,d){CKEDITOR.env.ie&&8>=document.documentMode||!d||(a=d+":"+a);return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))},getHead:function(){var a=this.$.getElementsByTagName("head")[0];
return a=a?new CKEDITOR.dom.element(a):this.getDocumentElement().append(new CKEDITOR.dom.element("head"),!0)},getBody:function(){return new CKEDITOR.dom.element(this.$.body)},getDocumentElement:function(){return new CKEDITOR.dom.element(this.$.documentElement)},getWindow:function(){return new CKEDITOR.dom.window(this.$.parentWindow||this.$.defaultView)},write:function(a){this.$.open("text/html","replace");CKEDITOR.env.ie&&(a=a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i,'$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e('+
CKEDITOR.tools.fixDomain+")();\x3c/script\x3e"));this.$.write(a);this.$.close()},find:function(a){return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a))},findOne:function(a){return(a=this.$.querySelector(a))?new CKEDITOR.dom.element(a):null},_getHtml5ShivFrag:function(){var a=this.getCustomData("html5ShivFrag");a||(a=this.$.createDocumentFragment(),CKEDITOR.tools.enableHtml5Elements(a,!0),this.setCustomData("html5ShivFrag",a));return a}});CKEDITOR.dom.nodeList=function(a){this.$=a};
CKEDITOR.dom.nodeList.prototype={count:function(){return this.$.length},getItem:function(a){return 0>a||a>=this.$.length?null:(a=this.$[a])?new CKEDITOR.dom.node(a):null}};CKEDITOR.dom.element=function(a,d){"string"==typeof a&&(a=(d?d.$:document).createElement(a));CKEDITOR.dom.domObject.call(this,a)};CKEDITOR.dom.element.get=function(a){return(a="string"==typeof a?document.getElementById(a)||document.getElementsByName(a)[0]:a)&&(a.$?a:new CKEDITOR.dom.element(a))};CKEDITOR.dom.element.prototype=new CKEDITOR.dom.node;
CKEDITOR.dom.element.createFromHtml=function(a,d){var b=new CKEDITOR.dom.element("div",d);b.setHtml(a);return b.getFirst().remove()};CKEDITOR.dom.element.setMarker=function(a,d,b,c){var e=d.getCustomData("list_marker_id")||d.setCustomData("list_marker_id",CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),g=d.getCustomData("list_marker_names")||d.setCustomData("list_marker_names",{}).getCustomData("list_marker_names");a[e]=d;g[b]=1;return d.setCustomData(b,c)};
CKEDITOR.dom.element.clearAllMarkers=function(a){for(var d in a)CKEDITOR.dom.element.clearMarkers(a,a[d],1)};CKEDITOR.dom.element.clearMarkers=function(a,d,b){var c=d.getCustomData("list_marker_names"),e=d.getCustomData("list_marker_id"),g;for(g in c)d.removeCustomData(g);d.removeCustomData("list_marker_names");b&&(d.removeCustomData("list_marker_id"),delete a[e])};
(function(){function a(a,b){return-1<(" "+a+" ").replace(g," ").indexOf(" "+b+" ")}function d(a){var b=!0;a.$.id||(a.$.id="cke_tmp_"+CKEDITOR.tools.getNextNumber(),b=!1);return function(){b||a.removeAttribute("id")}}function b(a,b){return"#"+a.$.id+" "+b.split(/,\s*/).join(", #"+a.$.id+" ")}function c(a){for(var b=0,c=0,f=l[a].length;c<f;c++)b+=parseInt(this.getComputedStyle(l[a][c])||0,10)||0;return b}var e=document.createElement("_").classList,e="undefined"!==typeof e&&null!==String(e.add).match(/\[Native code\]/gi),
g=/[\n\t\r]/g;CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_ELEMENT,addClass:e?function(a){this.$.classList.add(a);return this}:function(b){var c=this.$.className;c&&(a(c,b)||(c+=" "+b));this.$.className=c||b;return this},removeClass:e?function(a){var b=this.$;b.classList.remove(a);b.className||b.removeAttribute("class");return this}:function(b){var c=this.getAttribute("class");c&&a(c,b)&&((c=c.replace(new RegExp("(?:^|\\s+)"+b+"(?\x3d\\s|$)"),"").replace(/^\s+/,""))?this.setAttribute("class",
c):this.removeAttribute("class"));return this},hasClass:function(b){return a(this.$.className,b)},append:function(a,b){"string"==typeof a&&(a=this.getDocument().createElement(a));b?this.$.insertBefore(a.$,this.$.firstChild):this.$.appendChild(a.$);return a},appendHtml:function(a){if(this.$.childNodes.length){var b=new CKEDITOR.dom.element("div",this.getDocument());b.setHtml(a);b.moveChildren(this)}else this.setHtml(a)},appendText:function(a){null!=this.$.text&&CKEDITOR.env.ie&&9>CKEDITOR.env.version?
this.$.text+=a:this.append(new CKEDITOR.dom.text(a))},appendBogus:function(a){if(a||CKEDITOR.env.needsBrFiller){for(a=this.getLast();a&&a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.rtrim(a.getText());)a=a.getPrevious();a&&a.is&&a.is("br")||(a=this.getDocument().createElement("br"),CKEDITOR.env.gecko&&a.setAttribute("type","_moz"),this.append(a))}},breakParent:function(a,b){var c=new CKEDITOR.dom.range(this.getDocument());c.setStartAfter(this);c.setEndAfter(a);var f=c.extractContents(!1,b||!1);c.insertNode(this.remove());
f.insertAfterNode(this)},contains:document.compareDocumentPosition?function(a){return!!(this.$.compareDocumentPosition(a.$)&16)}:function(a){var b=this.$;return a.type!=CKEDITOR.NODE_ELEMENT?b.contains(a.getParent().$):b!=a.$&&b.contains(a.$)},focus:function(){function a(){try{this.$.focus()}catch(b){}}return function(b){b?CKEDITOR.tools.setTimeout(a,100,this):a.call(this)}}(),getHtml:function(){var a=this.$.innerHTML;return CKEDITOR.env.ie?a.replace(/<\?[^>]*>/g,""):a},getOuterHtml:function(){if(this.$.outerHTML)return this.$.outerHTML.replace(/<\?[^>]*>/,
"");var a=this.$.ownerDocument.createElement("div");a.appendChild(this.$.cloneNode(!0));return a.innerHTML},getClientRect:function(){var a=CKEDITOR.tools.extend({},this.$.getBoundingClientRect());!a.width&&(a.width=a.right-a.left);!a.height&&(a.height=a.bottom-a.top);return a},setHtml:CKEDITOR.env.ie&&9>CKEDITOR.env.version?function(a){try{var b=this.$;if(this.getParent())return b.innerHTML=a;var c=this.getDocument()._getHtml5ShivFrag();c.appendChild(b);b.innerHTML=a;c.removeChild(b);return a}catch(f){this.$.innerHTML=
"";b=new CKEDITOR.dom.element("body",this.getDocument());b.$.innerHTML=a;for(b=b.getChildren();b.count();)this.append(b.getItem(0));return a}}:function(a){return this.$.innerHTML=a},setText:function(){var a=document.createElement("p");a.innerHTML="x";a=a.textContent;return function(b){this.$[a?"textContent":"innerText"]=b}}(),getAttribute:function(){var a=function(a){return this.$.getAttribute(a,2)};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(a){switch(a){case "class":a=
"className";break;case "http-equiv":a="httpEquiv";break;case "name":return this.$.name;case "tabindex":return a=this.$.getAttribute(a,2),0!==a&&0===this.$.tabIndex&&(a=null),a;case "checked":return a=this.$.attributes.getNamedItem(a),(a.specified?a.nodeValue:this.$.checked)?"checked":null;case "hspace":case "value":return this.$[a];case "style":return this.$.style.cssText;case "contenteditable":case "contentEditable":return this.$.attributes.getNamedItem("contentEditable").specified?this.$.getAttribute("contentEditable"):
null}return this.$.getAttribute(a,2)}:a}(),getAttributes:function(a){var b={},c=this.$.attributes,f;a=CKEDITOR.tools.isArray(a)?a:[];for(f=0;f<c.length;f++)-1===CKEDITOR.tools.indexOf(a,c[f].name)&&(b[c[f].name]=c[f].value);return b},getChildren:function(){return new CKEDITOR.dom.nodeList(this.$.childNodes)},getComputedStyle:document.defaultView&&document.defaultView.getComputedStyle?function(a){var b=this.getWindow().$.getComputedStyle(this.$,null);return b?b.getPropertyValue(a):""}:function(a){return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]},
getDtd:function(){var a=CKEDITOR.dtd[this.getName()];this.getDtd=function(){return a};return a},getElementsByTag:CKEDITOR.dom.document.prototype.getElementsByTag,getTabIndex:function(){var a=this.$.tabIndex;return 0!==a||CKEDITOR.dtd.$tabIndex[this.getName()]||0===parseInt(this.getAttribute("tabindex"),10)?a:-1},getText:function(){return this.$.textContent||this.$.innerText||""},getWindow:function(){return this.getDocument().getWindow()},getId:function(){return this.$.id||null},getNameAtt:function(){return this.$.name||
null},getName:function(){var a=this.$.nodeName.toLowerCase();if(CKEDITOR.env.ie&&8>=document.documentMode){var b=this.$.scopeName;"HTML"!=b&&(a=b.toLowerCase()+":"+a)}this.getName=function(){return a};return this.getName()},getValue:function(){return this.$.value},getFirst:function(a){var b=this.$.firstChild;(b=b&&new CKEDITOR.dom.node(b))&&a&&!a(b)&&(b=b.getNext(a));return b},getLast:function(a){var b=this.$.lastChild;(b=b&&new CKEDITOR.dom.node(b))&&a&&!a(b)&&(b=b.getPrevious(a));return b},getStyle:function(a){return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]},
is:function(){var a=this.getName();if("object"==typeof arguments[0])return!!arguments[0][a];for(var b=0;b<arguments.length;b++)if(arguments[b]==a)return!0;return!1},isEditable:function(a){var b=this.getName();return this.isReadOnly()||"none"==this.getComputedStyle("display")||"hidden"==this.getComputedStyle("visibility")||CKEDITOR.dtd.$nonEditable[b]||CKEDITOR.dtd.$empty[b]||this.is("a")&&(this.data("cke-saved-name")||this.hasAttribute("name"))&&!this.getChildCount()?!1:!1!==a?(a=CKEDITOR.dtd[b]||
CKEDITOR.dtd.span,!(!a||!a["#"])):!0},isIdentical:function(a){var b=this.clone(0,1);a=a.clone(0,1);b.removeAttributes(["_moz_dirty","data-cke-expando","data-cke-saved-href","data-cke-saved-name"]);a.removeAttributes(["_moz_dirty","data-cke-expando","data-cke-saved-href","data-cke-saved-name"]);if(b.$.isEqualNode)return b.$.style.cssText=CKEDITOR.tools.normalizeCssText(b.$.style.cssText),a.$.style.cssText=CKEDITOR.tools.normalizeCssText(a.$.style.cssText),b.$.isEqualNode(a.$);b=b.getOuterHtml();a=
a.getOuterHtml();if(CKEDITOR.env.ie&&9>CKEDITOR.env.version&&this.is("a")){var c=this.getParent();c.type==CKEDITOR.NODE_ELEMENT&&(c=c.clone(),c.setHtml(b),b=c.getHtml(),c.setHtml(a),a=c.getHtml())}return b==a},isVisible:function(){var a=(this.$.offsetHeight||this.$.offsetWidth)&&"hidden"!=this.getComputedStyle("visibility"),b,c;a&&CKEDITOR.env.webkit&&(b=this.getWindow(),!b.equals(CKEDITOR.document.getWindow())&&(c=b.$.frameElement)&&(a=(new CKEDITOR.dom.element(c)).isVisible()));return!!a},isEmptyInlineRemoveable:function(){if(!CKEDITOR.dtd.$removeEmpty[this.getName()])return!1;
for(var a=this.getChildren(),b=0,c=a.count();b<c;b++){var f=a.getItem(b);if(f.type!=CKEDITOR.NODE_ELEMENT||!f.data("cke-bookmark"))if(f.type==CKEDITOR.NODE_ELEMENT&&!f.isEmptyInlineRemoveable()||f.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(f.getText()))return!1}return!0},hasAttributes:CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(){for(var a=this.$.attributes,b=0;b<a.length;b++){var c=a[b];switch(c.nodeName){case "class":if(this.getAttribute("class"))return!0;case "data-cke-expando":continue;
default:if(c.specified)return!0}}return!1}:function(){var a=this.$.attributes,b=a.length,c={"data-cke-expando":1,_moz_dirty:1};return 0<b&&(2<b||!c[a[0].nodeName]||2==b&&!c[a[1].nodeName])},hasAttribute:function(){function a(b){var c=this.$.attributes.getNamedItem(b);if("input"==this.getName())switch(b){case "class":return 0<this.$.className.length;case "checked":return!!this.$.checked;case "value":return b=this.getAttribute("type"),"checkbox"==b||"radio"==b?"on"!=this.$.value:!!this.$.value}return c?
c.specified:!1}return CKEDITOR.env.ie?8>CKEDITOR.env.version?function(b){return"name"==b?!!this.$.name:a.call(this,b)}:a:function(a){return!!this.$.attributes.getNamedItem(a)}}(),hide:function(){this.setStyle("display","none")},moveChildren:function(a,b){var c=this.$;a=a.$;if(c!=a){var f;if(b)for(;f=c.lastChild;)a.insertBefore(c.removeChild(f),a.firstChild);else for(;f=c.firstChild;)a.appendChild(c.removeChild(f))}},mergeSiblings:function(){function a(b,c,f){if(c&&c.type==CKEDITOR.NODE_ELEMENT){for(var d=
[];c.data("cke-bookmark")||c.isEmptyInlineRemoveable();)if(d.push(c),c=f?c.getNext():c.getPrevious(),!c||c.type!=CKEDITOR.NODE_ELEMENT)return;if(b.isIdentical(c)){for(var k=f?b.getLast():b.getFirst();d.length;)d.shift().move(b,!f);c.moveChildren(b,!f);c.remove();k&&k.type==CKEDITOR.NODE_ELEMENT&&k.mergeSiblings()}}}return function(b){if(!1===b||CKEDITOR.dtd.$removeEmpty[this.getName()]||this.is("a"))a(this,this.getNext(),!0),a(this,this.getPrevious())}}(),show:function(){this.setStyles({display:"",
visibility:""})},setAttribute:function(){var a=function(a,b){this.$.setAttribute(a,b);return this};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(b,c){"class"==b?this.$.className=c:"style"==b?this.$.style.cssText=c:"tabindex"==b?this.$.tabIndex=c:"checked"==b?this.$.checked=c:"contenteditable"==b?a.call(this,"contentEditable",c):a.apply(this,arguments);return this}:CKEDITOR.env.ie8Compat&&CKEDITOR.env.secure?function(b,c){if("src"==b&&c.match(/^http:\/\//))try{a.apply(this,
arguments)}catch(f){}else a.apply(this,arguments);return this}:a}(),setAttributes:function(a){for(var b in a)this.setAttribute(b,a[b]);return this},setValue:function(a){this.$.value=a;return this},removeAttribute:function(){var a=function(a){this.$.removeAttribute(a)};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(a){"class"==a?a="className":"tabindex"==a?a="tabIndex":"contenteditable"==a&&(a="contentEditable");this.$.removeAttribute(a)}:a}(),removeAttributes:function(a){if(CKEDITOR.tools.isArray(a))for(var b=
0;b<a.length;b++)this.removeAttribute(a[b]);else for(b in a=a||this.getAttributes(),a)a.hasOwnProperty(b)&&this.removeAttribute(b)},removeStyle:function(a){var b=this.$.style;if(b.removeProperty||"border"!=a&&"margin"!=a&&"padding"!=a)b.removeProperty?b.removeProperty(a):b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)),this.$.style.cssText||this.removeAttribute("style");else{var c=["top","left","right","bottom"],f;"border"==a&&(f=["color","style","width"]);for(var b=[],d=0;d<c.length;d++)if(f)for(var e=
0;e<f.length;e++)b.push([a,c[d],f[e]].join("-"));else b.push([a,c[d]].join("-"));for(a=0;a<b.length;a++)this.removeStyle(b[a])}},setStyle:function(a,b){this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]=b;return this},setStyles:function(a){for(var b in a)this.setStyle(b,a[b]);return this},setOpacity:function(a){CKEDITOR.env.ie&&9>CKEDITOR.env.version?(a=Math.round(100*a),this.setStyle("filter",100<=a?"":"progid:DXImageTransform.Microsoft.Alpha(opacity\x3d"+a+")")):this.setStyle("opacity",a)},unselectable:function(){this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
"none"));if(CKEDITOR.env.ie){this.setAttribute("unselectable","on");for(var a,b=this.getElementsByTag("*"),c=0,f=b.count();c<f;c++)a=b.getItem(c),a.setAttribute("unselectable","on")}},getPositionedAncestor:function(){for(var a=this;"html"!=a.getName();){if("static"!=a.getComputedStyle("position"))return a;a=a.getParent()}return null},getDocumentPosition:function(a){var b=0,c=0,f=this.getDocument(),d=f.getBody(),e="BackCompat"==f.$.compatMode;if(document.documentElement.getBoundingClientRect){var t=
this.$.getBoundingClientRect(),g=f.$.documentElement,p=g.clientTop||d.$.clientTop||0,x=g.clientLeft||d.$.clientLeft||0,l=!0;CKEDITOR.env.ie&&(l=f.getDocumentElement().contains(this),f=f.getBody().contains(this),l=e&&f||!e&&l);l&&(CKEDITOR.env.webkit||CKEDITOR.env.ie&&12<=CKEDITOR.env.version?(b=d.$.scrollLeft||g.scrollLeft,c=d.$.scrollTop||g.scrollTop):(c=e?d.$:g,b=c.scrollLeft,c=c.scrollTop),b=t.left+b-x,c=t.top+c-p)}else for(p=this,x=null;p&&"body"!=p.getName()&&"html"!=p.getName();){b+=p.$.offsetLeft-
p.$.scrollLeft;c+=p.$.offsetTop-p.$.scrollTop;p.equals(this)||(b+=p.$.clientLeft||0,c+=p.$.clientTop||0);for(;x&&!x.equals(p);)b-=x.$.scrollLeft,c-=x.$.scrollTop,x=x.getParent();x=p;p=(t=p.$.offsetParent)?new CKEDITOR.dom.element(t):null}a&&(t=this.getWindow(),p=a.getWindow(),!t.equals(p)&&t.$.frameElement&&(a=(new CKEDITOR.dom.element(t.$.frameElement)).getDocumentPosition(a),b+=a.x,c+=a.y));document.documentElement.getBoundingClientRect||!CKEDITOR.env.gecko||e||(b+=this.$.clientLeft?1:0,c+=this.$.clientTop?
1:0);return{x:b,y:c}},scrollIntoView:function(a){var b=this.getParent();if(b){do if((b.$.clientWidth&&b.$.clientWidth<b.$.scrollWidth||b.$.clientHeight&&b.$.clientHeight<b.$.scrollHeight)&&!b.is("body")&&this.scrollIntoParent(b,a,1),b.is("html")){var c=b.getWindow();try{var f=c.$.frameElement;f&&(b=new CKEDITOR.dom.element(f))}catch(d){}}while(b=b.getParent())}},scrollIntoParent:function(a,b,c){var f,d,e,t;function g(b,c){/body|html/.test(a.getName())?a.getWindow().$.scrollBy(b,c):(a.$.scrollLeft+=
b,a.$.scrollTop+=c)}function p(a,b){var c={x:0,y:0};if(!a.is(l?"body":"html")){var f=a.$.getBoundingClientRect();c.x=f.left;c.y=f.top}f=a.getWindow();f.equals(b)||(f=p(CKEDITOR.dom.element.get(f.$.frameElement),b),c.x+=f.x,c.y+=f.y);return c}function x(a,b){return parseInt(a.getComputedStyle("margin-"+b)||0,10)||0}!a&&(a=this.getWindow());e=a.getDocument();var l="BackCompat"==e.$.compatMode;a instanceof CKEDITOR.dom.window&&(a=l?e.getBody():e.getDocumentElement());e=a.getWindow();d=p(this,e);var u=
p(a,e),r=this.$.offsetHeight;f=this.$.offsetWidth;var h=a.$.clientHeight,n=a.$.clientWidth;e=d.x-x(this,"left")-u.x||0;t=d.y-x(this,"top")-u.y||0;f=d.x+f+x(this,"right")-(u.x+n)||0;d=d.y+r+x(this,"bottom")-(u.y+h)||0;(0>t||0<d)&&g(0,!0===b?t:!1===b?d:0>t?t:d);c&&(0>e||0<f)&&g(0>e?e:f,0)},setState:function(a,b,c){b=b||"cke";switch(a){case CKEDITOR.TRISTATE_ON:this.addClass(b+"_on");this.removeClass(b+"_off");this.removeClass(b+"_disabled");c&&this.setAttribute("aria-pressed",!0);c&&this.removeAttribute("aria-disabled");
break;case CKEDITOR.TRISTATE_DISABLED:this.addClass(b+"_disabled");this.removeClass(b+"_off");this.removeClass(b+"_on");c&&this.setAttribute("aria-disabled",!0);c&&this.removeAttribute("aria-pressed");break;default:this.addClass(b+"_off"),this.removeClass(b+"_on"),this.removeClass(b+"_disabled"),c&&this.removeAttribute("aria-pressed"),c&&this.removeAttribute("aria-disabled")}},getFrameDocument:function(){var a=this.$;try{a.contentWindow.document}catch(b){a.src=a.src}return a&&new CKEDITOR.dom.document(a.contentWindow.document)},
copyAttributes:function(a,b){var c=this.$.attributes;b=b||{};for(var f=0;f<c.length;f++){var d=c[f],e=d.nodeName.toLowerCase(),t;if(!(e in b))if("checked"==e&&(t=this.getAttribute(e)))a.setAttribute(e,t);else if(!CKEDITOR.env.ie||this.hasAttribute(e))t=this.getAttribute(e),null===t&&(t=d.nodeValue),a.setAttribute(e,t)}""!==this.$.style.cssText&&(a.$.style.cssText=this.$.style.cssText)},renameNode:function(a){if(this.getName()!=a){var b=this.getDocument();a=new CKEDITOR.dom.element(a,b);this.copyAttributes(a);
this.moveChildren(a);this.getParent(!0)&&this.$.parentNode.replaceChild(a.$,this.$);a.$["data-cke-expando"]=this.$["data-cke-expando"];this.$=a.$;delete this.getName}},getChild:function(){function a(b,c){var f=b.childNodes;if(0<=c&&c<f.length)return f[c]}return function(b){var c=this.$;if(b.slice)for(b=b.slice();0<b.length&&c;)c=a(c,b.shift());else c=a(c,b);return c?new CKEDITOR.dom.node(c):null}}(),getChildCount:function(){return this.$.childNodes.length},disableContextMenu:function(){function a(b){return b.type==
CKEDITOR.NODE_ELEMENT&&b.hasClass("cke_enable_context_menu")}this.on("contextmenu",function(b){b.data.getTarget().getAscendant(a,!0)||b.data.preventDefault()})},getDirection:function(a){return a?this.getComputedStyle("direction")||this.getDirection()||this.getParent()&&this.getParent().getDirection(1)||this.getDocument().$.dir||"ltr":this.getStyle("direction")||this.getAttribute("dir")},data:function(a,b){a="data-"+a;if(void 0===b)return this.getAttribute(a);!1===b?this.removeAttribute(a):this.setAttribute(a,
b);return null},getEditor:function(){var a=CKEDITOR.instances,b,c;for(b in a)if(c=a[b],c.element.equals(this)&&c.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO)return c;return null},find:function(a){var c=d(this);a=new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,a)));c();return a},findOne:function(a){var c=d(this);a=this.$.querySelector(b(this,a));c();return a?new CKEDITOR.dom.element(a):null},forEach:function(a,b,c){if(!(c||b&&this.type!=b))var f=a(this);if(!1!==f){c=this.getChildren();for(var d=
0;d<c.count();d++)f=c.getItem(d),f.type==CKEDITOR.NODE_ELEMENT?f.forEach(a,b):b&&f.type!=b||a(f)}}});var l={width:["border-left-width","border-right-width","padding-left","padding-right"],height:["border-top-width","border-bottom-width","padding-top","padding-bottom"]};CKEDITOR.dom.element.prototype.setSize=function(a,b,d){"number"==typeof b&&(!d||CKEDITOR.env.ie&&CKEDITOR.env.quirks||(b-=c.call(this,a)),this.setStyle(a,b+"px"))};CKEDITOR.dom.element.prototype.getSize=function(a,b){var d=Math.max(this.$["offset"+
CKEDITOR.tools.capitalize(a)],this.$["client"+CKEDITOR.tools.capitalize(a)])||0;b&&(d-=c.call(this,a));return d}})();CKEDITOR.dom.documentFragment=function(a){a=a||CKEDITOR.document;this.$=a.type==CKEDITOR.NODE_DOCUMENT?a.$.createDocumentFragment():a};
CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,insertAfterNode:function(a){a=a.$;a.parentNode.insertBefore(this.$,a.nextSibling)},getHtml:function(){var a=new CKEDITOR.dom.element("div");this.clone(1,1).appendTo(a);return a.getHtml().replace(/\s*data-cke-expando=".*?"/g,"")}},!0,{append:1,appendBogus:1,clone:1,getFirst:1,getHtml:1,getLast:1,getParent:1,getNext:1,getPrevious:1,appendTo:1,moveChildren:1,insertBefore:1,
insertAfterNode:1,replace:1,trim:1,type:1,ltrim:1,rtrim:1,getDocument:1,getChildCount:1,getChild:1,getChildren:1});
(function(){function a(a,b){var c=this.range;if(this._.end)return null;if(!this._.start){this._.start=1;if(c.collapsed)return this.end(),null;c.optimize()}var f,d=c.startContainer;f=c.endContainer;var e=c.startOffset,y=c.endOffset,r,h=this.guard,n=this.type,m=a?"getPreviousSourceNode":"getNextSourceNode";if(!a&&!this._.guardLTR){var z=f.type==CKEDITOR.NODE_ELEMENT?f:f.getParent(),B=f.type==CKEDITOR.NODE_ELEMENT?f.getChild(y):f.getNext();this._.guardLTR=function(a,b){return(!b||!z.equals(a))&&(!B||
!a.equals(B))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||!a.equals(c.root))}}if(a&&!this._.guardRTL){var E=d.type==CKEDITOR.NODE_ELEMENT?d:d.getParent(),g=d.type==CKEDITOR.NODE_ELEMENT?e?d.getChild(e-1):null:d.getPrevious();this._.guardRTL=function(a,b){return(!b||!E.equals(a))&&(!g||!a.equals(g))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||!a.equals(c.root))}}var l=a?this._.guardRTL:this._.guardLTR;r=h?function(a,b){return!1===l(a,b)?!1:h(a,b)}:l;this.current?f=this.current[m](!1,n,r):(a?f.type==CKEDITOR.NODE_ELEMENT&&
(f=0<y?f.getChild(y-1):!1===r(f,!0)?null:f.getPreviousSourceNode(!0,n,r)):(f=d,f.type==CKEDITOR.NODE_ELEMENT&&((f=f.getChild(e))||(f=!1===r(d,!0)?null:d.getNextSourceNode(!0,n,r)))),f&&!1===r(f)&&(f=null));for(;f&&!this._.end;){this.current=f;if(!this.evaluator||!1!==this.evaluator(f)){if(!b)return f}else if(b&&this.evaluator)return!1;f=f[m](!1,n,r)}this.end();return this.current=null}function d(b){for(var c,f=null;c=a.call(this,b);)f=c;return f}CKEDITOR.dom.walker=CKEDITOR.tools.createClass({$:function(a){this.range=
a;this._={}},proto:{end:function(){this._.end=1},next:function(){return a.call(this)},previous:function(){return a.call(this,1)},checkForward:function(){return!1!==a.call(this,0,1)},checkBackward:function(){return!1!==a.call(this,1,1)},lastForward:function(){return d.call(this)},lastBackward:function(){return d.call(this,1)},reset:function(){delete this.current;this._={}}}});var b={block:1,"list-item":1,table:1,"table-row-group":1,"table-header-group":1,"table-footer-group":1,"table-row":1,"table-column-group":1,
"table-column":1,"table-cell":1,"table-caption":1},c={absolute:1,fixed:1};CKEDITOR.dom.element.prototype.isBlockBoundary=function(a){return"none"!=this.getComputedStyle("float")||this.getComputedStyle("position")in c||!b[this.getComputedStyle("display")]?!!(this.is(CKEDITOR.dtd.$block)||a&&this.is(a)):!0};CKEDITOR.dom.walker.blockBoundary=function(a){return function(b){return!(b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary(a))}};CKEDITOR.dom.walker.listItemBoundary=function(){return this.blockBoundary({br:1})};
CKEDITOR.dom.walker.bookmark=function(a,b){function c(a){return a&&a.getName&&"span"==a.getName()&&a.data("cke-bookmark")}return function(f){var d,e;d=f&&f.type!=CKEDITOR.NODE_ELEMENT&&(e=f.getParent())&&c(e);d=a?d:d||c(f);return!!(b^d)}};CKEDITOR.dom.walker.whitespaces=function(a){return function(b){var c;b&&b.type==CKEDITOR.NODE_TEXT&&(c=!CKEDITOR.tools.trim(b.getText())||CKEDITOR.env.webkit&&b.getText()==CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);return!!(a^c)}};CKEDITOR.dom.walker.invisible=
function(a){var b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.env.webkit?1:0;return function(f){b(f)?f=1:(f.type==CKEDITOR.NODE_TEXT&&(f=f.getParent()),f=f.$.offsetWidth<=c);return!!(a^f)}};CKEDITOR.dom.walker.nodeType=function(a,b){return function(c){return!!(b^c.type==a)}};CKEDITOR.dom.walker.bogus=function(a){function b(a){return!g(a)&&!l(a)}return function(c){var f=CKEDITOR.env.needsBrFiller?c.is&&c.is("br"):c.getText&&e.test(c.getText());f&&(f=c.getParent(),c=c.getNext(b),f=f.isBlockBoundary()&&
(!c||c.type==CKEDITOR.NODE_ELEMENT&&c.isBlockBoundary()));return!!(a^f)}};CKEDITOR.dom.walker.temp=function(a){return function(b){b.type!=CKEDITOR.NODE_ELEMENT&&(b=b.getParent());b=b&&b.hasAttribute("data-cke-temp");return!!(a^b)}};var e=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,g=CKEDITOR.dom.walker.whitespaces(),l=CKEDITOR.dom.walker.bookmark(),k=CKEDITOR.dom.walker.temp(),q=function(a){return l(a)||g(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.is(CKEDITOR.dtd.$inline)&&!a.is(CKEDITOR.dtd.$empty)};CKEDITOR.dom.walker.ignored=
function(a){return function(b){b=g(b)||l(b)||k(b);return!!(a^b)}};var w=CKEDITOR.dom.walker.ignored();CKEDITOR.dom.walker.empty=function(a){return function(b){for(var c=0,f=b.getChildCount();c<f;++c)if(!w(b.getChild(c)))return!!a;return!a}};var f=CKEDITOR.dom.walker.empty(),y=CKEDITOR.dom.walker.validEmptyBlockContainers=CKEDITOR.tools.extend(function(a){var b={},c;for(c in a)CKEDITOR.dtd[c]["#"]&&(b[c]=1);return b}(CKEDITOR.dtd.$block),{caption:1,td:1,th:1});CKEDITOR.dom.walker.editable=function(a){return function(b){b=
w(b)?!1:b.type==CKEDITOR.NODE_TEXT||b.type==CKEDITOR.NODE_ELEMENT&&(b.is(CKEDITOR.dtd.$inline)||b.is("hr")||"false"==b.getAttribute("contenteditable")||!CKEDITOR.env.needsBrFiller&&b.is(y)&&f(b))?!0:!1;return!!(a^b)}};CKEDITOR.dom.element.prototype.getBogus=function(){var a=this;do a=a.getPreviousSourceNode();while(q(a));return a&&(CKEDITOR.env.needsBrFiller?a.is&&a.is("br"):a.getText&&e.test(a.getText()))?a:!1}})();
CKEDITOR.dom.range=function(a){this.endOffset=this.endContainer=this.startOffset=this.startContainer=null;this.collapsed=!0;var d=a instanceof CKEDITOR.dom.document;this.document=d?a:a.getDocument();this.root=d?a.getBody():a};
(function(){function a(a){a.collapsed=a.startContainer&&a.endContainer&&a.startContainer.equals(a.endContainer)&&a.startOffset==a.endOffset}function d(a,b,c,d,e){function p(a,b,c,f){var d=c?a.getPrevious():a.getNext();if(f&&k)return d;h||f?b.append(a.clone(!0,e),c):(a.remove(),r&&b.append(a));return d}function g(){var a,b,c,f=Math.min(v.length,I.length);for(a=0;a<f;a++)if(b=v[a],c=I[a],!b.equals(c))return a;return a-1}function l(){var b=J-1,c=H&&w&&!n.equals(m);b<F-1||b<L-1||c?(c?a.moveToPosition(m,
CKEDITOR.POSITION_BEFORE_START):L==b+1&&C?a.moveToPosition(I[b],CKEDITOR.POSITION_BEFORE_END):a.moveToPosition(I[b+1],CKEDITOR.POSITION_BEFORE_START),d&&(b=v[b+1])&&b.type==CKEDITOR.NODE_ELEMENT&&(c=CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e',a.document),c.insertAfter(b),b.mergeSiblings(!1),a.moveToBookmark({startNode:c}))):a.collapse(!0)}a.optimizeBookmark();var k=0===b,r=1==b,h=2==b;b=h||r;var n=a.startContainer,m=a.endContainer,
z=a.startOffset,B=a.endOffset,E,C,H,w,q,Q;if(h&&m.type==CKEDITOR.NODE_TEXT&&n.equals(m))n=a.document.createText(n.substring(z,B)),c.append(n);else{m.type==CKEDITOR.NODE_TEXT?h?Q=!0:m=m.split(B):0<m.getChildCount()?B>=m.getChildCount()?(m=m.getChild(B-1),C=!0):m=m.getChild(B):w=C=!0;n.type==CKEDITOR.NODE_TEXT?h?q=!0:n.split(z):0<n.getChildCount()?0===z?(n=n.getChild(z),E=!0):n=n.getChild(z-1):H=E=!0;for(var v=n.getParents(),I=m.getParents(),J=g(),F=v.length-1,L=I.length-1,K=c,ba,Z,V,fa=-1,N=J;N<=F;N++){Z=
v[N];V=Z.getNext();for(N!=F||Z.equals(I[N])&&F<L?b&&(ba=K.append(Z.clone(0,e))):E?p(Z,K,!1,H):q&&K.append(a.document.createText(Z.substring(z)));V;){if(V.equals(I[N])){fa=N;break}V=p(V,K)}K=ba}K=c;for(N=J;N<=L;N++)if(c=I[N],V=c.getPrevious(),c.equals(v[N]))b&&(K=K.getChild(0));else{N!=L||c.equals(v[N])&&L<F?b&&(ba=K.append(c.clone(0,e))):C?p(c,K,!1,w):Q&&K.append(a.document.createText(c.substring(0,B)));if(N>fa)for(;V;)V=p(V,K,!0);K=ba}h||l()}}function b(){var a=!1,b=CKEDITOR.dom.walker.whitespaces(),
c=CKEDITOR.dom.walker.bookmark(!0),d=CKEDITOR.dom.walker.bogus();return function(e){return c(e)||b(e)?!0:d(e)&&!a?a=!0:e.type==CKEDITOR.NODE_TEXT&&(e.hasAscendant("pre")||CKEDITOR.tools.trim(e.getText()).length)||e.type==CKEDITOR.NODE_ELEMENT&&!e.is(g)?!1:!0}}function c(a){var b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(1);return function(d){return c(d)||b(d)?!0:!a&&l(d)||d.type==CKEDITOR.NODE_ELEMENT&&d.is(CKEDITOR.dtd.$removeEmpty)}}function e(a){return function(){var b;return this[a?
"getPreviousNode":"getNextNode"](function(a){!b&&w(a)&&(b=a);return q(a)&&!(l(a)&&a.equals(b))})}}var g={abbr:1,acronym:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,"var":1},l=CKEDITOR.dom.walker.bogus(),k=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,q=CKEDITOR.dom.walker.editable(),w=CKEDITOR.dom.walker.ignored(!0);CKEDITOR.dom.range.prototype={clone:function(){var a=new CKEDITOR.dom.range(this.root);a._setStartContainer(this.startContainer);
a.startOffset=this.startOffset;a._setEndContainer(this.endContainer);a.endOffset=this.endOffset;a.collapsed=this.collapsed;return a},collapse:function(a){a?(this._setEndContainer(this.startContainer),this.endOffset=this.startOffset):(this._setStartContainer(this.endContainer),this.startOffset=this.endOffset);this.collapsed=!0},cloneContents:function(a){var b=new CKEDITOR.dom.documentFragment(this.document);this.collapsed||d(this,2,b,!1,"undefined"==typeof a?!0:a);return b},deleteContents:function(a){this.collapsed||
d(this,0,null,a)},extractContents:function(a,b){var c=new CKEDITOR.dom.documentFragment(this.document);this.collapsed||d(this,1,c,a,"undefined"==typeof b?!0:b);return c},createBookmark:function(a){var b,c,d,e,p=this.collapsed;b=this.document.createElement("span");b.data("cke-bookmark",1);b.setStyle("display","none");b.setHtml("\x26nbsp;");a&&(d="cke_bm_"+CKEDITOR.tools.getNextNumber(),b.setAttribute("id",d+(p?"C":"S")));p||(c=b.clone(),c.setHtml("\x26nbsp;"),a&&c.setAttribute("id",d+"E"),e=this.clone(),
e.collapse(),e.insertNode(c));e=this.clone();e.collapse(!0);e.insertNode(b);c?(this.setStartAfter(b),this.setEndBefore(c)):this.moveToPosition(b,CKEDITOR.POSITION_AFTER_END);return{startNode:a?d+(p?"C":"S"):b,endNode:a?d+"E":c,serializable:a,collapsed:p}},createBookmark2:function(){function a(b){var f=b.container,d=b.offset,e;e=f;var g=d;e=e.type!=CKEDITOR.NODE_ELEMENT||0===g||g==e.getChildCount()?0:e.getChild(g-1).type==CKEDITOR.NODE_TEXT&&e.getChild(g).type==CKEDITOR.NODE_TEXT;e&&(f=f.getChild(d-
1),d=f.getLength());if(f.type==CKEDITOR.NODE_ELEMENT&&0<d){a:{for(e=f;d--;)if(g=e.getChild(d).getIndex(!0),0<=g){d=g;break a}d=-1}d+=1}if(f.type==CKEDITOR.NODE_TEXT){e=f;for(g=0;(e=e.getPrevious())&&e.type==CKEDITOR.NODE_TEXT;)g+=e.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE,"").length;e=g;f.getText()?d+=e:(g=f.getPrevious(c),e?(d=e,f=g?g.getNext():f.getParent().getFirst()):(f=f.getParent(),d=g?g.getIndex(!0)+1:0))}b.container=f;b.offset=d}function b(a,c){var f=c.getCustomData("cke-fillingChar");
if(f){var d=a.container;f.equals(d)&&(a.offset-=CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length,0>=a.offset&&(a.offset=d.getIndex(),a.container=d.getParent()))}}var c=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT,!0);return function(c){var d=this.collapsed,e={container:this.startContainer,offset:this.startOffset},g={container:this.endContainer,offset:this.endOffset};c&&(a(e),b(e,this.root),d||(a(g),b(g,this.root)));return{start:e.container.getAddress(c),end:d?null:g.container.getAddress(c),
startOffset:e.offset,endOffset:g.offset,normalized:c,collapsed:d,is2:!0}}}(),moveToBookmark:function(a){if(a.is2){var b=this.document.getByAddress(a.start,a.normalized),c=a.startOffset,d=a.end&&this.document.getByAddress(a.end,a.normalized);a=a.endOffset;this.setStart(b,c);d?this.setEnd(d,a):this.collapse(!0)}else b=(c=a.serializable)?this.document.getById(a.startNode):a.startNode,a=c?this.document.getById(a.endNode):a.endNode,this.setStartBefore(b),b.remove(),a?(this.setEndBefore(a),a.remove()):
this.collapse(!0)},getBoundaryNodes:function(){var a=this.startContainer,b=this.endContainer,c=this.startOffset,d=this.endOffset,e;if(a.type==CKEDITOR.NODE_ELEMENT)if(e=a.getChildCount(),e>c)a=a.getChild(c);else if(1>e)a=a.getPreviousSourceNode();else{for(a=a.$;a.lastChild;)a=a.lastChild;a=new CKEDITOR.dom.node(a);a=a.getNextSourceNode()||a}if(b.type==CKEDITOR.NODE_ELEMENT)if(e=b.getChildCount(),e>d)b=b.getChild(d).getPreviousSourceNode(!0);else if(1>e)b=b.getPreviousSourceNode();else{for(b=b.$;b.lastChild;)b=
b.lastChild;b=new CKEDITOR.dom.node(b)}a.getPosition(b)&CKEDITOR.POSITION_FOLLOWING&&(a=b);return{startNode:a,endNode:b}},getCommonAncestor:function(a,b){var c=this.startContainer,d=this.endContainer,c=c.equals(d)?a&&c.type==CKEDITOR.NODE_ELEMENT&&this.startOffset==this.endOffset-1?c.getChild(this.startOffset):c:c.getCommonAncestor(d);return b&&!c.is?c.getParent():c},optimize:function(){var a=this.startContainer,b=this.startOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setStartAfter(a):
this.setStartBefore(a));a=this.endContainer;b=this.endOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setEndAfter(a):this.setEndBefore(a))},optimizeBookmark:function(){var a=this.startContainer,b=this.endContainer;a.is&&a.is("span")&&a.data("cke-bookmark")&&this.setStartAt(a,CKEDITOR.POSITION_BEFORE_START);b&&b.is&&b.is("span")&&b.data("cke-bookmark")&&this.setEndAt(b,CKEDITOR.POSITION_AFTER_END)},trim:function(a,b){var c=this.startContainer,d=this.startOffset,e=this.collapsed;if((!a||
e)&&c&&c.type==CKEDITOR.NODE_TEXT){if(d)if(d>=c.getLength())d=c.getIndex()+1,c=c.getParent();else{var p=c.split(d),d=c.getIndex()+1,c=c.getParent();this.startContainer.equals(this.endContainer)?this.setEnd(p,this.endOffset-this.startOffset):c.equals(this.endContainer)&&(this.endOffset+=1)}else d=c.getIndex(),c=c.getParent();this.setStart(c,d);if(e){this.collapse(!0);return}}c=this.endContainer;d=this.endOffset;b||e||!c||c.type!=CKEDITOR.NODE_TEXT||(d?(d>=c.getLength()||c.split(d),d=c.getIndex()+1):
d=c.getIndex(),c=c.getParent(),this.setEnd(c,d))},enlarge:function(a,b){function c(a){return a&&a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("contenteditable")?null:a}var d=new RegExp(/[^\s\ufeff]/);switch(a){case CKEDITOR.ENLARGE_INLINE:var e=1;case CKEDITOR.ENLARGE_ELEMENT:var p=function(a,b){var c=new CKEDITOR.dom.range(l);c.setStart(a,b);c.setEndAt(l,CKEDITOR.POSITION_BEFORE_END);var c=new CKEDITOR.dom.walker(c),f;for(c.guard=function(a){return!(a.type==CKEDITOR.NODE_ELEMENT&&a.isBlockBoundary())};f=
c.next();){if(f.type!=CKEDITOR.NODE_TEXT)return!1;E=f!=a?f.getText():f.substring(b);if(d.test(E))return!1}return!0};if(this.collapsed)break;var g=this.getCommonAncestor(),l=this.root,k,r,h,n,m,z=!1,B,E;B=this.startContainer;var C=this.startOffset;B.type==CKEDITOR.NODE_TEXT?(C&&(B=!CKEDITOR.tools.trim(B.substring(0,C)).length&&B,z=!!B),B&&((n=B.getPrevious())||(h=B.getParent()))):(C&&(n=B.getChild(C-1)||B.getLast()),n||(h=B));for(h=c(h);h||n;){if(h&&!n){!m&&h.equals(g)&&(m=!0);if(e?h.isBlockBoundary():
!l.contains(h))break;z&&"inline"==h.getComputedStyle("display")||(z=!1,m?k=h:this.setStartBefore(h));n=h.getPrevious()}for(;n;)if(B=!1,n.type==CKEDITOR.NODE_COMMENT)n=n.getPrevious();else{if(n.type==CKEDITOR.NODE_TEXT)E=n.getText(),d.test(E)&&(n=null),B=/[\s\ufeff]$/.test(E);else if((n.$.offsetWidth>(CKEDITOR.env.webkit?1:0)||b&&n.is("br"))&&!n.data("cke-bookmark"))if(z&&CKEDITOR.dtd.$removeEmpty[n.getName()]){E=n.getText();if(d.test(E))n=null;else for(var C=n.$.getElementsByTagName("*"),H=0,w;w=
C[H++];)if(!CKEDITOR.dtd.$removeEmpty[w.nodeName.toLowerCase()]){n=null;break}n&&(B=!!E.length)}else n=null;B&&(z?m?k=h:h&&this.setStartBefore(h):z=!0);if(n){B=n.getPrevious();if(!h&&!B){h=n;n=null;break}n=B}else h=null}h&&(h=c(h.getParent()))}B=this.endContainer;C=this.endOffset;h=n=null;m=z=!1;B.type==CKEDITOR.NODE_TEXT?CKEDITOR.tools.trim(B.substring(C)).length?z=!0:(z=!B.getLength(),C==B.getLength()?(n=B.getNext())||(h=B.getParent()):p(B,C)&&(h=B.getParent())):(n=B.getChild(C))||(h=B);for(;h||
n;){if(h&&!n){!m&&h.equals(g)&&(m=!0);if(e?h.isBlockBoundary():!l.contains(h))break;z&&"inline"==h.getComputedStyle("display")||(z=!1,m?r=h:h&&this.setEndAfter(h));n=h.getNext()}for(;n;){B=!1;if(n.type==CKEDITOR.NODE_TEXT)E=n.getText(),p(n,0)||(n=null),B=/^[\s\ufeff]/.test(E);else if(n.type==CKEDITOR.NODE_ELEMENT){if((0<n.$.offsetWidth||b&&n.is("br"))&&!n.data("cke-bookmark"))if(z&&CKEDITOR.dtd.$removeEmpty[n.getName()]){E=n.getText();if(d.test(E))n=null;else for(C=n.$.getElementsByTagName("*"),H=
0;w=C[H++];)if(!CKEDITOR.dtd.$removeEmpty[w.nodeName.toLowerCase()]){n=null;break}n&&(B=!!E.length)}else n=null}else B=1;B&&z&&(m?r=h:this.setEndAfter(h));if(n){B=n.getNext();if(!h&&!B){h=n;n=null;break}n=B}else h=null}h&&(h=c(h.getParent()))}k&&r&&(g=k.contains(r)?r:k,this.setStartBefore(g),this.setEndAfter(g));break;case CKEDITOR.ENLARGE_BLOCK_CONTENTS:case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:h=new CKEDITOR.dom.range(this.root);l=this.root;h.setStartAt(l,CKEDITOR.POSITION_AFTER_START);h.setEnd(this.startContainer,
this.startOffset);h=new CKEDITOR.dom.walker(h);var q,Q,v=CKEDITOR.dom.walker.blockBoundary(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?{br:1}:null),I=null,J=function(a){if(a.type==CKEDITOR.NODE_ELEMENT&&"false"==a.getAttribute("contenteditable"))if(I){if(I.equals(a)){I=null;return}}else I=a;else if(I)return;var b=v(a);b||(q=a);return b},e=function(a){var b=J(a);!b&&a.is&&a.is("br")&&(Q=a);return b};h.guard=J;h=h.lastBackward();q=q||l;this.setStartAt(q,!q.is("br")&&(!h&&this.checkStartOfBlock()||h&&q.contains(h))?
CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_AFTER_END);if(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS){h=this.clone();h=new CKEDITOR.dom.walker(h);var F=CKEDITOR.dom.walker.whitespaces(),L=CKEDITOR.dom.walker.bookmark();h.evaluator=function(a){return!F(a)&&!L(a)};if((h=h.previous())&&h.type==CKEDITOR.NODE_ELEMENT&&h.is("br"))break}h=this.clone();h.collapse();h.setEndAt(l,CKEDITOR.POSITION_BEFORE_END);h=new CKEDITOR.dom.walker(h);h.guard=a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?e:J;q=I=Q=null;h=h.lastForward();
q=q||l;this.setEndAt(q,!h&&this.checkEndOfBlock()||h&&q.contains(h)?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_BEFORE_START);Q&&this.setEndAfter(Q)}},shrink:function(a,b,c){if(!this.collapsed){a=a||CKEDITOR.SHRINK_TEXT;var d=this.clone(),e=this.startContainer,p=this.endContainer,g=this.startOffset,l=this.endOffset,k=1,r=1;e&&e.type==CKEDITOR.NODE_TEXT&&(g?g>=e.getLength()?d.setStartAfter(e):(d.setStartBefore(e),k=0):d.setStartBefore(e));p&&p.type==CKEDITOR.NODE_TEXT&&(l?l>=p.getLength()?d.setEndAfter(p):
(d.setEndAfter(p),r=0):d.setEndBefore(p));var d=new CKEDITOR.dom.walker(d),h=CKEDITOR.dom.walker.bookmark();d.evaluator=function(b){return b.type==(a==CKEDITOR.SHRINK_ELEMENT?CKEDITOR.NODE_ELEMENT:CKEDITOR.NODE_TEXT)};var n;d.guard=function(b,d){if(h(b))return!0;if(a==CKEDITOR.SHRINK_ELEMENT&&b.type==CKEDITOR.NODE_TEXT||d&&b.equals(n)||!1===c&&b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary()||b.type==CKEDITOR.NODE_ELEMENT&&b.hasAttribute("contenteditable"))return!1;d||b.type!=CKEDITOR.NODE_ELEMENT||
(n=b);return!0};k&&(e=d[a==CKEDITOR.SHRINK_ELEMENT?"lastForward":"next"]())&&this.setStartAt(e,b?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_START);r&&(d.reset(),(d=d[a==CKEDITOR.SHRINK_ELEMENT?"lastBackward":"previous"]())&&this.setEndAt(d,b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_END));return!(!k&&!r)}},insertNode:function(a){this.optimizeBookmark();this.trim(!1,!0);var b=this.startContainer,c=b.getChild(this.startOffset);c?a.insertBefore(c):b.append(a);a.getParent()&&a.getParent().equals(this.endContainer)&&
this.endOffset++;this.setStartBefore(a)},moveToPosition:function(a,b){this.setStartAt(a,b);this.collapse(!0)},moveToRange:function(a){this.setStart(a.startContainer,a.startOffset);this.setEnd(a.endContainer,a.endOffset)},selectNodeContents:function(a){this.setStart(a,0);this.setEnd(a,a.type==CKEDITOR.NODE_TEXT?a.getLength():a.getChildCount())},setStart:function(b,c){b.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[b.getName()]&&(c=b.getIndex(),b=b.getParent());this._setStartContainer(b);this.startOffset=
c;this.endContainer||(this._setEndContainer(b),this.endOffset=c);a(this)},setEnd:function(b,c){b.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[b.getName()]&&(c=b.getIndex()+1,b=b.getParent());this._setEndContainer(b);this.endOffset=c;this.startContainer||(this._setStartContainer(b),this.startOffset=c);a(this)},setStartAfter:function(a){this.setStart(a.getParent(),a.getIndex()+1)},setStartBefore:function(a){this.setStart(a.getParent(),a.getIndex())},setEndAfter:function(a){this.setEnd(a.getParent(),
a.getIndex()+1)},setEndBefore:function(a){this.setEnd(a.getParent(),a.getIndex())},setStartAt:function(b,c){switch(c){case CKEDITOR.POSITION_AFTER_START:this.setStart(b,0);break;case CKEDITOR.POSITION_BEFORE_END:b.type==CKEDITOR.NODE_TEXT?this.setStart(b,b.getLength()):this.setStart(b,b.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setStartBefore(b);break;case CKEDITOR.POSITION_AFTER_END:this.setStartAfter(b)}a(this)},setEndAt:function(b,c){switch(c){case CKEDITOR.POSITION_AFTER_START:this.setEnd(b,
0);break;case CKEDITOR.POSITION_BEFORE_END:b.type==CKEDITOR.NODE_TEXT?this.setEnd(b,b.getLength()):this.setEnd(b,b.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setEndBefore(b);break;case CKEDITOR.POSITION_AFTER_END:this.setEndAfter(b)}a(this)},fixBlock:function(a,b){var c=this.createBookmark(),d=this.document.createElement(b);this.collapse(a);this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);this.extractContents().appendTo(d);d.trim();this.insertNode(d);var e=d.getBogus();e&&e.remove();
d.appendBogus();this.moveToBookmark(c);return d},splitBlock:function(a,b){var c=new CKEDITOR.dom.elementPath(this.startContainer,this.root),d=new CKEDITOR.dom.elementPath(this.endContainer,this.root),e=c.block,p=d.block,g=null;if(!c.blockLimit.equals(d.blockLimit))return null;"br"!=a&&(e||(e=this.fixBlock(!0,a),p=(new CKEDITOR.dom.elementPath(this.endContainer,this.root)).block),p||(p=this.fixBlock(!1,a)));c=e&&this.checkStartOfBlock();d=p&&this.checkEndOfBlock();this.deleteContents();e&&e.equals(p)&&
(d?(g=new CKEDITOR.dom.elementPath(this.startContainer,this.root),this.moveToPosition(p,CKEDITOR.POSITION_AFTER_END),p=null):c?(g=new CKEDITOR.dom.elementPath(this.startContainer,this.root),this.moveToPosition(e,CKEDITOR.POSITION_BEFORE_START),e=null):(p=this.splitElement(e,b||!1),e.is("ul","ol")||e.appendBogus()));return{previousBlock:e,nextBlock:p,wasStartOfBlock:c,wasEndOfBlock:d,elementPath:g}},splitElement:function(a,b){if(!this.collapsed)return null;this.setEndAt(a,CKEDITOR.POSITION_BEFORE_END);
var c=this.extractContents(!1,b||!1),d=a.clone(!1,b||!1);c.appendTo(d);d.insertAfter(a);this.moveToPosition(a,CKEDITOR.POSITION_AFTER_END);return d},removeEmptyBlocksAtEnd:function(){function a(d){return function(a){return b(a)||c(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.isEmptyInlineRemoveable()||d.is("table")&&a.is("caption")?!1:!0}}var b=CKEDITOR.dom.walker.whitespaces(),c=CKEDITOR.dom.walker.bookmark(!1);return function(b){for(var c=this.createBookmark(),d=this[b?"endPath":"startPath"](),e=d.block||
d.blockLimit,g;e&&!e.equals(d.root)&&!e.getFirst(a(e));)g=e.getParent(),this[b?"setEndAt":"setStartAt"](e,CKEDITOR.POSITION_AFTER_END),e.remove(1),e=g;this.moveToBookmark(c)}}(),startPath:function(){return new CKEDITOR.dom.elementPath(this.startContainer,this.root)},endPath:function(){return new CKEDITOR.dom.elementPath(this.endContainer,this.root)},checkBoundaryOfElement:function(a,b){var d=b==CKEDITOR.START,e=this.clone();e.collapse(d);e[d?"setStartAt":"setEndAt"](a,d?CKEDITOR.POSITION_AFTER_START:
CKEDITOR.POSITION_BEFORE_END);e=new CKEDITOR.dom.walker(e);e.evaluator=c(d);return e[d?"checkBackward":"checkForward"]()},checkStartOfBlock:function(){var a=this.startContainer,c=this.startOffset;CKEDITOR.env.ie&&c&&a.type==CKEDITOR.NODE_TEXT&&(a=CKEDITOR.tools.ltrim(a.substring(0,c)),k.test(a)&&this.trim(0,1));this.trim();a=new CKEDITOR.dom.elementPath(this.startContainer,this.root);c=this.clone();c.collapse(!0);c.setStartAt(a.block||a.blockLimit,CKEDITOR.POSITION_AFTER_START);a=new CKEDITOR.dom.walker(c);
a.evaluator=b();return a.checkBackward()},checkEndOfBlock:function(){var a=this.endContainer,c=this.endOffset;CKEDITOR.env.ie&&a.type==CKEDITOR.NODE_TEXT&&(a=CKEDITOR.tools.rtrim(a.substring(c)),k.test(a)&&this.trim(1,0));this.trim();a=new CKEDITOR.dom.elementPath(this.endContainer,this.root);c=this.clone();c.collapse(!1);c.setEndAt(a.block||a.blockLimit,CKEDITOR.POSITION_BEFORE_END);a=new CKEDITOR.dom.walker(c);a.evaluator=b();return a.checkForward()},getPreviousNode:function(a,b,c){var d=this.clone();
d.collapse(1);d.setStartAt(c||this.root,CKEDITOR.POSITION_AFTER_START);c=new CKEDITOR.dom.walker(d);c.evaluator=a;c.guard=b;return c.previous()},getNextNode:function(a,b,c){var d=this.clone();d.collapse();d.setEndAt(c||this.root,CKEDITOR.POSITION_BEFORE_END);c=new CKEDITOR.dom.walker(d);c.evaluator=a;c.guard=b;return c.next()},checkReadOnly:function(){function a(b,c){for(;b;){if(b.type==CKEDITOR.NODE_ELEMENT){if("false"==b.getAttribute("contentEditable")&&!b.data("cke-editable"))return 0;if(b.is("html")||
"true"==b.getAttribute("contentEditable")&&(b.contains(c)||b.equals(c)))break}b=b.getParent()}return 1}return function(){var b=this.startContainer,c=this.endContainer;return!(a(b,c)&&a(c,b))}}(),moveToElementEditablePosition:function(a,b){if(a.type==CKEDITOR.NODE_ELEMENT&&!a.isEditable(!1))return this.moveToPosition(a,b?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START),!0;for(var c=0;a;){if(a.type==CKEDITOR.NODE_TEXT){b&&this.endContainer&&this.checkEndOfBlock()&&k.test(a.getText())?this.moveToPosition(a,
CKEDITOR.POSITION_BEFORE_START):this.moveToPosition(a,b?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START);c=1;break}if(a.type==CKEDITOR.NODE_ELEMENT)if(a.isEditable())this.moveToPosition(a,b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_START),c=1;else if(b&&a.is("br")&&this.endContainer&&this.checkEndOfBlock())this.moveToPosition(a,CKEDITOR.POSITION_BEFORE_START);else if("false"==a.getAttribute("contenteditable")&&a.is(CKEDITOR.dtd.$block))return this.setStartBefore(a),this.setEndAfter(a),
!0;var d=a,e=c,p=void 0;d.type==CKEDITOR.NODE_ELEMENT&&d.isEditable(!1)&&(p=d[b?"getLast":"getFirst"](w));e||p||(p=d[b?"getPrevious":"getNext"](w));a=p}return!!c},moveToClosestEditablePosition:function(a,b){var c,d=0,e,p,g=[CKEDITOR.POSITION_AFTER_END,CKEDITOR.POSITION_BEFORE_START];a?(c=new CKEDITOR.dom.range(this.root),c.moveToPosition(a,g[b?0:1])):c=this.clone();if(a&&!a.is(CKEDITOR.dtd.$block))d=1;else if(e=c[b?"getNextEditableNode":"getPreviousEditableNode"]())d=1,(p=e.type==CKEDITOR.NODE_ELEMENT)&&
e.is(CKEDITOR.dtd.$block)&&"false"==e.getAttribute("contenteditable")?(c.setStartAt(e,CKEDITOR.POSITION_BEFORE_START),c.setEndAt(e,CKEDITOR.POSITION_AFTER_END)):!CKEDITOR.env.needsBrFiller&&p&&e.is(CKEDITOR.dom.walker.validEmptyBlockContainers)?(c.setEnd(e,0),c.collapse()):c.moveToPosition(e,g[b?1:0]);d&&this.moveToRange(c);return!!d},moveToElementEditStart:function(a){return this.moveToElementEditablePosition(a)},moveToElementEditEnd:function(a){return this.moveToElementEditablePosition(a,!0)},getEnclosedNode:function(){var a=
this.clone();a.optimize();if(a.startContainer.type!=CKEDITOR.NODE_ELEMENT||a.endContainer.type!=CKEDITOR.NODE_ELEMENT)return null;var a=new CKEDITOR.dom.walker(a),b=CKEDITOR.dom.walker.bookmark(!1,!0),c=CKEDITOR.dom.walker.whitespaces(!0);a.evaluator=function(a){return c(a)&&b(a)};var d=a.next();a.reset();return d&&d.equals(a.previous())?d:null},getTouchedStartNode:function(){var a=this.startContainer;return this.collapsed||a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.startOffset)||a},getTouchedEndNode:function(){var a=
this.endContainer;return this.collapsed||a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.endOffset-1)||a},getNextEditableNode:e(),getPreviousEditableNode:e(1),scrollIntoView:function(){var a=new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e",this.document),b,c,d,e=this.clone();e.optimize();(d=e.startContainer.type==CKEDITOR.NODE_TEXT)?(c=e.startContainer.getText(),b=e.startContainer.split(e.startOffset),a.insertAfter(e.startContainer)):e.insertNode(a);a.scrollIntoView();
d&&(e.startContainer.setText(c),b.remove());a.remove()},_setStartContainer:function(a){this.startContainer=a},_setEndContainer:function(a){this.endContainer=a}}})();CKEDITOR.POSITION_AFTER_START=1;CKEDITOR.POSITION_BEFORE_END=2;CKEDITOR.POSITION_BEFORE_START=3;CKEDITOR.POSITION_AFTER_END=4;CKEDITOR.ENLARGE_ELEMENT=1;CKEDITOR.ENLARGE_BLOCK_CONTENTS=2;CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS=3;CKEDITOR.ENLARGE_INLINE=4;CKEDITOR.START=1;CKEDITOR.END=2;CKEDITOR.SHRINK_ELEMENT=1;CKEDITOR.SHRINK_TEXT=2;"use strict";
(function(){function a(a){1>arguments.length||(this.range=a,this.forceBrBreak=0,this.enlargeBr=1,this.enforceRealBlocks=0,this._||(this._={}))}function d(a){var b=[];a.forEach(function(a){if("true"==a.getAttribute("contenteditable"))return b.push(a),!1},CKEDITOR.NODE_ELEMENT,!0);return b}function b(a,c,e,g){a:{null==g&&(g=d(e));for(var l;l=g.shift();)if(l.getDtd().p){g={element:l,remaining:g};break a}g=null}if(!g)return 0;if((l=CKEDITOR.filter.instances[g.element.data("cke-filter")])&&!l.check(c))return b(a,
c,e,g.remaining);c=new CKEDITOR.dom.range(g.element);c.selectNodeContents(g.element);c=c.createIterator();c.enlargeBr=a.enlargeBr;c.enforceRealBlocks=a.enforceRealBlocks;c.activeFilter=c.filter=l;a._.nestedEditable={element:g.element,container:e,remaining:g.remaining,iterator:c};return 1}function c(a,b,c){if(!b)return!1;a=a.clone();a.collapse(!c);return a.checkBoundaryOfElement(b,c?CKEDITOR.START:CKEDITOR.END)}var e=/^[\r\n\t ]+$/,g=CKEDITOR.dom.walker.bookmark(!1,!0),l=CKEDITOR.dom.walker.whitespaces(!0),
k=function(a){return g(a)&&l(a)},q={dd:1,dt:1,li:1};a.prototype={getNextParagraph:function(a){var d,l,A,t,D;a=a||"p";if(this._.nestedEditable){if(d=this._.nestedEditable.iterator.getNextParagraph(a))return this.activeFilter=this._.nestedEditable.iterator.activeFilter,d;this.activeFilter=this.filter;if(b(this,a,this._.nestedEditable.container,this._.nestedEditable.remaining))return this.activeFilter=this._.nestedEditable.iterator.activeFilter,this._.nestedEditable.iterator.getNextParagraph(a);this._.nestedEditable=
null}if(!this.range.root.getDtd()[a])return null;if(!this._.started){var p=this.range.clone();l=p.startPath();var x=p.endPath(),G=!p.collapsed&&c(p,l.block),u=!p.collapsed&&c(p,x.block,1);p.shrink(CKEDITOR.SHRINK_ELEMENT,!0);G&&p.setStartAt(l.block,CKEDITOR.POSITION_BEFORE_END);u&&p.setEndAt(x.block,CKEDITOR.POSITION_AFTER_START);l=p.endContainer.hasAscendant("pre",!0)||p.startContainer.hasAscendant("pre",!0);p.enlarge(this.forceBrBreak&&!l||!this.enlargeBr?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:CKEDITOR.ENLARGE_BLOCK_CONTENTS);
p.collapsed||(l=new CKEDITOR.dom.walker(p.clone()),x=CKEDITOR.dom.walker.bookmark(!0,!0),l.evaluator=x,this._.nextNode=l.next(),l=new CKEDITOR.dom.walker(p.clone()),l.evaluator=x,l=l.previous(),this._.lastNode=l.getNextSourceNode(!0,null,p.root),this._.lastNode&&this._.lastNode.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(this._.lastNode.getText())&&this._.lastNode.getParent().isBlockBoundary()&&(x=this.range.clone(),x.moveToPosition(this._.lastNode,CKEDITOR.POSITION_AFTER_END),x.checkEndOfBlock()&&
(x=new CKEDITOR.dom.elementPath(x.endContainer,x.root),this._.lastNode=(x.block||x.blockLimit).getNextSourceNode(!0))),this._.lastNode&&p.root.contains(this._.lastNode)||(this._.lastNode=this._.docEndMarker=p.document.createText(""),this._.lastNode.insertAfter(l)),p=null);this._.started=1;l=p}x=this._.nextNode;p=this._.lastNode;for(this._.nextNode=null;x;){var G=0,u=x.hasAscendant("pre"),r=x.type!=CKEDITOR.NODE_ELEMENT,h=0;if(r)x.type==CKEDITOR.NODE_TEXT&&e.test(x.getText())&&(r=0);else{var n=x.getName();
if(CKEDITOR.dtd.$block[n]&&"false"==x.getAttribute("contenteditable")){d=x;b(this,a,d);break}else if(x.isBlockBoundary(this.forceBrBreak&&!u&&{br:1})){if("br"==n)r=1;else if(!l&&!x.getChildCount()&&"hr"!=n){d=x;A=x.equals(p);break}l&&(l.setEndAt(x,CKEDITOR.POSITION_BEFORE_START),"br"!=n&&(this._.nextNode=x));G=1}else{if(x.getFirst()){l||(l=this.range.clone(),l.setStartAt(x,CKEDITOR.POSITION_BEFORE_START));x=x.getFirst();continue}r=1}}r&&!l&&(l=this.range.clone(),l.setStartAt(x,CKEDITOR.POSITION_BEFORE_START));
A=(!G||r)&&x.equals(p);if(l&&!G)for(;!x.getNext(k)&&!A;){n=x.getParent();if(n.isBlockBoundary(this.forceBrBreak&&!u&&{br:1})){G=1;r=0;A||n.equals(p);l.setEndAt(n,CKEDITOR.POSITION_BEFORE_END);break}x=n;r=1;A=x.equals(p);h=1}r&&l.setEndAt(x,CKEDITOR.POSITION_AFTER_END);x=this._getNextSourceNode(x,h,p);if((A=!x)||G&&l)break}if(!d){if(!l)return this._.docEndMarker&&this._.docEndMarker.remove(),this._.nextNode=null;d=new CKEDITOR.dom.elementPath(l.startContainer,l.root);x=d.blockLimit;G={div:1,th:1,td:1};
d=d.block;!d&&x&&!this.enforceRealBlocks&&G[x.getName()]&&l.checkStartOfBlock()&&l.checkEndOfBlock()&&!x.equals(l.root)?d=x:!d||this.enforceRealBlocks&&d.is(q)?(d=this.range.document.createElement(a),l.extractContents().appendTo(d),d.trim(),l.insertNode(d),t=D=!0):"li"!=d.getName()?l.checkStartOfBlock()&&l.checkEndOfBlock()||(d=d.clone(!1),l.extractContents().appendTo(d),d.trim(),D=l.splitBlock(),t=!D.wasStartOfBlock,D=!D.wasEndOfBlock,l.insertNode(d)):A||(this._.nextNode=d.equals(p)?null:this._getNextSourceNode(l.getBoundaryNodes().endNode,
1,p))}t&&(t=d.getPrevious())&&t.type==CKEDITOR.NODE_ELEMENT&&("br"==t.getName()?t.remove():t.getLast()&&"br"==t.getLast().$.nodeName.toLowerCase()&&t.getLast().remove());D&&(t=d.getLast())&&t.type==CKEDITOR.NODE_ELEMENT&&"br"==t.getName()&&(!CKEDITOR.env.needsBrFiller||t.getPrevious(g)||t.getNext(g))&&t.remove();this._.nextNode||(this._.nextNode=A||d.equals(p)||!p?null:this._getNextSourceNode(d,1,p));return d},_getNextSourceNode:function(a,b,c){function d(a){return!(a.equals(c)||a.equals(e))}var e=
this.range.root;for(a=a.getNextSourceNode(b,null,d);!g(a);)a=a.getNextSourceNode(b,null,d);return a}};CKEDITOR.dom.range.prototype.createIterator=function(){return new a(this)}})();
CKEDITOR.command=function(a,d){this.uiItems=[];this.exec=function(b){if(this.state==CKEDITOR.TRISTATE_DISABLED||!this.checkAllowed())return!1;this.editorFocus&&a.focus();return!1===this.fire("exec")?!0:!1!==d.exec.call(this,a,b)};this.refresh=function(a,b){if(!this.readOnly&&a.readOnly)return!0;if(this.context&&!b.isContextFor(this.context)||!this.checkAllowed(!0))return this.disable(),!0;this.startDisabled||this.enable();this.modes&&!this.modes[a.mode]&&this.disable();return!1===this.fire("refresh",
{editor:a,path:b})?!0:d.refresh&&!1!==d.refresh.apply(this,arguments)};var b;this.checkAllowed=function(c){return c||"boolean"!=typeof b?b=a.activeFilter.checkFeature(this):b};CKEDITOR.tools.extend(this,d,{modes:{wysiwyg:1},editorFocus:1,contextSensitive:!!d.context,state:CKEDITOR.TRISTATE_DISABLED});CKEDITOR.event.call(this)};
CKEDITOR.command.prototype={enable:function(){this.state==CKEDITOR.TRISTATE_DISABLED&&this.checkAllowed()&&this.setState(this.preserveState&&"undefined"!=typeof this.previousState?this.previousState:CKEDITOR.TRISTATE_OFF)},disable:function(){this.setState(CKEDITOR.TRISTATE_DISABLED)},setState:function(a){if(this.state==a||a!=CKEDITOR.TRISTATE_DISABLED&&!this.checkAllowed())return!1;this.previousState=this.state;this.state=a;this.fire("state");return!0},toggleState:function(){this.state==CKEDITOR.TRISTATE_OFF?
this.setState(CKEDITOR.TRISTATE_ON):this.state==CKEDITOR.TRISTATE_ON&&this.setState(CKEDITOR.TRISTATE_OFF)}};CKEDITOR.event.implementOn(CKEDITOR.command.prototype);CKEDITOR.ENTER_P=1;CKEDITOR.ENTER_BR=2;CKEDITOR.ENTER_DIV=3;
CKEDITOR.config={customConfig:"config.js",autoUpdateElement:!0,language:"",defaultLanguage:"en",contentsLangDirection:"",enterMode:CKEDITOR.ENTER_P,forceEnterMode:!1,shiftEnterMode:CKEDITOR.ENTER_BR,docType:"\x3c!DOCTYPE html\x3e",bodyId:"",bodyClass:"",fullPage:!1,height:200,contentsCss:CKEDITOR.getUrl("contents.css"),extraPlugins:"",removePlugins:"",protectedSource:[],tabIndex:0,width:"",baseFloatZIndex:1E4,blockedKeystrokes:[CKEDITOR.CTRL+66,CKEDITOR.CTRL+73,CKEDITOR.CTRL+85]};
(function(){function a(a,b,c,d,e){var h,n;a=[];for(h in b){n=b[h];n="boolean"==typeof n?{}:"function"==typeof n?{match:n}:H(n);"$"!=h.charAt(0)&&(n.elements=h);c&&(n.featureName=c.toLowerCase());var m=n;m.elements=l(m.elements,/\s+/)||null;m.propertiesOnly=m.propertiesOnly||!0===m.elements;var f=/\s*,\s*/,p=void 0;for(p in Q){m[p]=l(m[p],f)||null;var F=m,r=v[p],g=l(m[v[p]],f),z=m[p],E=[],B=!0,L=void 0;g?B=!1:g={};for(L in z)"!"==L.charAt(0)&&(L=L.slice(1),E.push(L),g[L]=!0,B=!1);for(;L=E.pop();)z[L]=
z["!"+L],delete z["!"+L];F[r]=(B?!1:g)||null}m.match=m.match||null;d.push(n);a.push(n)}b=e.elements;e=e.generic;var k;c=0;for(d=a.length;c<d;++c){h=H(a[c]);n=!0===h.classes||!0===h.styles||!0===h.attributes;m=h;p=r=f=void 0;for(f in Q)m[f]=G(m[f]);F=!0;for(p in v){f=v[p];r=m[f];g=[];z=void 0;for(z in r)-1<z.indexOf("*")?g.push(new RegExp("^"+z.replace(/\*/g,".*")+"$")):g.push(z);r=g;r.length&&(m[f]=r,F=!1)}m.nothingRequired=F;m.noProperties=!(m.attributes||m.classes||m.styles);if(!0===h.elements||
null===h.elements)e[n?"unshift":"push"](h);else for(k in m=h.elements,delete h.elements,m)if(b[k])b[k][n?"unshift":"push"](h);else b[k]=[h]}}function d(a,c,d,h){if(!a.match||a.match(c))if(h||k(a,c))if(a.propertiesOnly||(d.valid=!0),d.allAttributes||(d.allAttributes=b(a.attributes,c.attributes,d.validAttributes)),d.allStyles||(d.allStyles=b(a.styles,c.styles,d.validStyles)),!d.allClasses){a=a.classes;c=c.classes;h=d.validClasses;if(a)if(!0===a)a=!0;else{for(var n=0,e=c.length,m;n<e;++n)m=c[n],h[m]||
(h[m]=a(m));a=!1}else a=!1;d.allClasses=a}}function b(a,b,c){if(!a)return!1;if(!0===a)return!0;for(var d in b)c[d]||(c[d]=a(d));return!1}function c(a,b,c){if(!a.match||a.match(b)){if(a.noProperties)return!1;c.hadInvalidAttribute=e(a.attributes,b.attributes)||c.hadInvalidAttribute;c.hadInvalidStyle=e(a.styles,b.styles)||c.hadInvalidStyle;a=a.classes;b=b.classes;if(a){for(var d=!1,h=!0===a,n=b.length;n--;)if(h||a(b[n]))b.splice(n,1),d=!0;a=d}else a=!1;c.hadInvalidClass=a||c.hadInvalidClass}}function e(a,
b){if(!a)return!1;var c=!1,d=!0===a,h;for(h in b)if(d||a(h))delete b[h],c=!0;return c}function g(a,b,c){if(a.disabled||a.customConfig&&!c||!b)return!1;a._.cachedChecks={};return!0}function l(a,b){if(!a)return!1;if(!0===a)return a;if("string"==typeof a)return a=R(a),"*"==a?!0:CKEDITOR.tools.convertArrayToObject(a.split(b));if(CKEDITOR.tools.isArray(a))return a.length?CKEDITOR.tools.convertArrayToObject(a):!1;var c={},d=0,h;for(h in a)c[h]=a[h],d++;return d?c:!1}function k(a,b){if(a.nothingRequired)return!0;
var c,d,h,n;if(h=a.requiredClasses)for(n=b.classes,c=0;c<h.length;++c)if(d=h[c],"string"==typeof d){if(-1==CKEDITOR.tools.indexOf(n,d))return!1}else if(!CKEDITOR.tools.checkIfAnyArrayItemMatches(n,d))return!1;return q(b.styles,a.requiredStyles)&&q(b.attributes,a.requiredAttributes)}function q(a,b){if(!b)return!0;for(var c=0,d;c<b.length;++c)if(d=b[c],"string"==typeof d){if(!(d in a))return!1}else if(!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a,d))return!1;return!0}function w(a){if(!a)return{};
a=a.split(/\s*,\s*/).sort();for(var b={};a.length;)b[a.shift()]="cke-test";return b}function f(a){var b,c,d,h,n={},e=1;for(a=R(a);b=a.match(I);)(c=b[2])?(d=y(c,"styles"),h=y(c,"attrs"),c=y(c,"classes")):d=h=c=null,n["$"+e++]={elements:b[1],classes:c,styles:d,attributes:h},a=a.slice(b[0].length);return n}function y(a,b){var c=a.match(J[b]);return c?R(c[1]):null}function A(a){var b=a.styleBackup=a.attributes.style,c=a.classBackup=a.attributes["class"];a.styles||(a.styles=CKEDITOR.tools.parseCssText(b||
"",1));a.classes||(a.classes=c?c.split(/\s+/):[])}function t(a,b,h,e){var m=0,f;e.toHtml&&(b.name=b.name.replace(F,"$1"));if(e.doCallbacks&&a.elementCallbacks){a:{f=a.elementCallbacks;for(var g=0,r=f.length,z;g<r;++g)if(z=f[g](b)){f=z;break a}f=void 0}if(f)return f}if(e.doTransform&&(f=a._.transformations[b.name])){A(b);for(g=0;g<f.length;++g)n(a,b,f[g]);p(b)}if(e.doFilter){a:{g=b.name;r=a._;a=r.allowedRules.elements[g];f=r.allowedRules.generic;g=r.disallowedRules.elements[g];r=r.disallowedRules.generic;
z=e.skipRequired;var E={valid:!1,validAttributes:{},validClasses:{},validStyles:{},allAttributes:!1,allClasses:!1,allStyles:!1,hadInvalidAttribute:!1,hadInvalidClass:!1,hadInvalidStyle:!1},v,l;if(a||f){A(b);if(g)for(v=0,l=g.length;v<l;++v)if(!1===c(g[v],b,E)){a=null;break a}if(r)for(v=0,l=r.length;v<l;++v)c(r[v],b,E);if(a)for(v=0,l=a.length;v<l;++v)d(a[v],b,E,z);if(f)for(v=0,l=f.length;v<l;++v)d(f[v],b,E,z);a=E}else a=null}if(!a||!a.valid)return h.push(b),1;l=a.validAttributes;var B=a.validStyles;
f=a.validClasses;var g=b.attributes,k=b.styles,r=b.classes;z=b.classBackup;var J=b.styleBackup,C,I,K=[],E=[],H=/^data-cke-/;v=!1;delete g.style;delete g["class"];delete b.classBackup;delete b.styleBackup;if(!a.allAttributes)for(C in g)l[C]||(H.test(C)?C==(I=C.replace(/^data-cke-saved-/,""))||l[I]||(delete g[C],v=!0):(delete g[C],v=!0));if(!a.allStyles||a.hadInvalidStyle){for(C in k)a.allStyles||B[C]?K.push(C+":"+k[C]):v=!0;K.length&&(g.style=K.sort().join("; "))}else J&&(g.style=J);if(!a.allClasses||
a.hadInvalidClass){for(C=0;C<r.length;++C)(a.allClasses||f[r[C]])&&E.push(r[C]);E.length&&(g["class"]=E.sort().join(" "));z&&E.length<z.split(/\s+/).length&&(v=!0)}else z&&(g["class"]=z);v&&(m=1);if(!e.skipFinalValidation&&!x(b))return h.push(b),1}e.toHtml&&(b.name=b.name.replace(L,"cke:$1"));return m}function D(a){var b=[],c;for(c in a)-1<c.indexOf("*")&&b.push(c.replace(/\*/g,".*"));return b.length?new RegExp("^(?:"+b.join("|")+")$"):null}function p(a){var b=a.attributes,c;delete b.style;delete b["class"];
if(c=CKEDITOR.tools.writeCssText(a.styles,!0))b.style=c;a.classes.length&&(b["class"]=a.classes.sort().join(" "))}function x(a){switch(a.name){case "a":if(!(a.children.length||a.attributes.name||a.attributes.id))return!1;break;case "img":if(!a.attributes.src)return!1}return!0}function G(a){if(!a)return!1;if(!0===a)return!0;var b=D(a);return function(c){return c in a||b&&c.match(b)}}function u(){return new CKEDITOR.htmlParser.element("br")}function r(a){return a.type==CKEDITOR.NODE_ELEMENT&&("br"==
a.name||C.$block[a.name])}function h(a,b,c){var d=a.name;if(C.$empty[d]||!a.children.length)"hr"==d&&"br"==b?a.replaceWith(u()):(a.parent&&c.push({check:"it",el:a.parent}),a.remove());else if(C.$block[d]||"tr"==d)if("br"==b)a.previous&&!r(a.previous)&&(b=u(),b.insertBefore(a)),a.next&&!r(a.next)&&(b=u(),b.insertAfter(a)),a.replaceWithChildren();else{var d=a.children,h;b:{h=C[b];for(var n=0,e=d.length,m;n<e;++n)if(m=d[n],m.type==CKEDITOR.NODE_ELEMENT&&!h[m.name]){h=!1;break b}h=!0}if(h)a.name=b,a.attributes=
{},c.push({check:"parent-down",el:a});else{h=a.parent;for(var n=h.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||"body"==h.name,f,g,e=d.length;0<e;)m=d[--e],n&&(m.type==CKEDITOR.NODE_TEXT||m.type==CKEDITOR.NODE_ELEMENT&&C.$inline[m.name])?(f||(f=new CKEDITOR.htmlParser.element(b),f.insertAfter(a),c.push({check:"parent-down",el:f})),f.add(m,0)):(f=null,g=C[h.name]||C.span,m.insertAfter(a),h.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||m.type!=CKEDITOR.NODE_ELEMENT||g[m.name]||c.push({check:"el-up",el:m}));a.remove()}}else d in
{style:1,script:1}?a.remove():(a.parent&&c.push({check:"it",el:a.parent}),a.replaceWithChildren())}function n(a,b,c){var d,h;for(d=0;d<c.length;++d)if(h=c[d],!(h.check&&!a.check(h.check,!1)||h.left&&!h.left(b))){h.right(b,K);break}}function m(a,b){var c=b.getDefinition(),d=c.attributes,h=c.styles,n,e,m,f;if(a.name!=c.element)return!1;for(n in d)if("class"==n)for(c=d[n].split(/\s+/),m=a.classes.join("|");f=c.pop();){if(-1==m.indexOf(f))return!1}else if(a.attributes[n]!=d[n])return!1;for(e in h)if(a.styles[e]!=
h[e])return!1;return!0}function z(a,b){var c,d;"string"==typeof a?c=a:a instanceof CKEDITOR.style?d=a:(c=a[0],d=a[1]);return[{element:c,left:d,right:function(a,c){c.transform(a,b)}}]}function B(a){return function(b){return m(b,a)}}function E(a){return function(b,c){c[a](b)}}var C=CKEDITOR.dtd,H=CKEDITOR.tools.copy,R=CKEDITOR.tools.trim,T=["","p","br","div"];CKEDITOR.FILTER_SKIP_TREE=2;CKEDITOR.filter=function(a){this.allowedContent=[];this.disallowedContent=[];this.elementCallbacks=null;this.disabled=
!1;this.editor=null;this.id=CKEDITOR.tools.getNextNumber();this._={allowedRules:{elements:{},generic:[]},disallowedRules:{elements:{},generic:[]},transformations:{},cachedTests:{}};CKEDITOR.filter.instances[this.id]=this;if(a instanceof CKEDITOR.editor){a=this.editor=a;this.customConfig=!0;var b=a.config.allowedContent;!0===b?this.disabled=!0:(b||(this.customConfig=!1),this.allow(b,"config",1),this.allow(a.config.extraAllowedContent,"extra",1),this.allow(T[a.enterMode]+" "+T[a.shiftEnterMode],"default",
1),this.disallow(a.config.disallowedContent))}else this.customConfig=!1,this.allow(a,"default",1)};CKEDITOR.filter.instances={};CKEDITOR.filter.prototype={allow:function(b,c,d){if(!g(this,b,d))return!1;var h,n;if("string"==typeof b)b=f(b);else if(b instanceof CKEDITOR.style){if(b.toAllowedContentRules)return this.allow(b.toAllowedContentRules(this.editor),c,d);h=b.getDefinition();b={};d=h.attributes;b[h.element]=h={styles:h.styles,requiredStyles:h.styles&&CKEDITOR.tools.objectKeys(h.styles)};d&&(d=
H(d),h.classes=d["class"]?d["class"].split(/\s+/):null,h.requiredClasses=h.classes,delete d["class"],h.attributes=d,h.requiredAttributes=d&&CKEDITOR.tools.objectKeys(d))}else if(CKEDITOR.tools.isArray(b)){for(h=0;h<b.length;++h)n=this.allow(b[h],c,d);return n}a(this,b,c,this.allowedContent,this._.allowedRules);return!0},applyTo:function(a,b,c,d){if(this.disabled)return!1;var n=this,e=[],m=this.editor&&this.editor.config.protectedSource,f,g=!1,p={doFilter:!c,doTransform:!0,doCallbacks:!0,toHtml:b};
a.forEach(function(a){if(a.type==CKEDITOR.NODE_ELEMENT){if("off"==a.attributes["data-cke-filter"])return!1;if(!b||"span"!=a.name||!~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))if(f=t(n,a,e,p),f&1)g=!0;else if(f&2)return!1}else if(a.type==CKEDITOR.NODE_COMMENT&&a.value.match(/^\{cke_protected\}(?!\{C\})/)){var c;a:{var d=decodeURIComponent(a.value.replace(/^\{cke_protected\}/,""));c=[];var h,r,z;if(m)for(r=0;r<m.length;++r)if((z=d.match(m[r]))&&z[0].length==d.length){c=!0;
break a}d=CKEDITOR.htmlParser.fragment.fromHtml(d);1==d.children.length&&(h=d.children[0]).type==CKEDITOR.NODE_ELEMENT&&t(n,h,c,p);c=!c.length}c||e.push(a)}},null,!0);e.length&&(g=!0);var r;a=[];d=T[d||(this.editor?this.editor.enterMode:CKEDITOR.ENTER_P)];for(var z;c=e.pop();)c.type==CKEDITOR.NODE_ELEMENT?h(c,d,a):c.remove();for(;r=a.pop();)if(c=r.el,c.parent)switch(z=C[c.parent.name]||C.span,r.check){case "it":C.$removeEmpty[c.name]&&!c.children.length?h(c,d,a):x(c)||h(c,d,a);break;case "el-up":c.parent.type==
CKEDITOR.NODE_DOCUMENT_FRAGMENT||z[c.name]||h(c,d,a);break;case "parent-down":c.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||z[c.name]||h(c.parent,d,a)}return g},checkFeature:function(a){if(this.disabled||!a)return!0;a.toFeature&&(a=a.toFeature(this.editor));return!a.requiredContent||this.check(a.requiredContent)},disable:function(){this.disabled=!0},disallow:function(b){if(!g(this,b,!0))return!1;"string"==typeof b&&(b=f(b));a(this,b,null,this.disallowedContent,this._.disallowedRules);return!0},
addContentForms:function(a){if(!this.disabled&&a){var b,c,d=[],h;for(b=0;b<a.length&&!h;++b)c=a[b],("string"==typeof c||c instanceof CKEDITOR.style)&&this.check(c)&&(h=c);if(h){for(b=0;b<a.length;++b)d.push(z(a[b],h));this.addTransformations(d)}}},addElementCallback:function(a){this.elementCallbacks||(this.elementCallbacks=[]);this.elementCallbacks.push(a)},addFeature:function(a){if(this.disabled||!a)return!0;a.toFeature&&(a=a.toFeature(this.editor));this.allow(a.allowedContent,a.name);this.addTransformations(a.contentTransformations);
this.addContentForms(a.contentForms);return a.requiredContent&&(this.customConfig||this.disallowedContent.length)?this.check(a.requiredContent):!0},addTransformations:function(a){var b,c;if(!this.disabled&&a){var d=this._.transformations,h;for(h=0;h<a.length;++h){b=a[h];var n=void 0,e=void 0,m=void 0,f=void 0,g=void 0,r=void 0;c=[];for(e=0;e<b.length;++e)m=b[e],"string"==typeof m?(m=m.split(/\s*:\s*/),f=m[0],g=null,r=m[1]):(f=m.check,g=m.left,r=m.right),n||(n=m,n=n.element?n.element:f?f.match(/^([a-z0-9]+)/i)[0]:
n.left.getDefinition().element),g instanceof CKEDITOR.style&&(g=B(g)),c.push({check:f==n?null:f,left:g,right:"string"==typeof r?E(r):r});b=n;d[b]||(d[b]=[]);d[b].push(c)}}},check:function(a,b,c){if(this.disabled)return!0;if(CKEDITOR.tools.isArray(a)){for(var d=a.length;d--;)if(this.check(a[d],b,c))return!0;return!1}var h,e;if("string"==typeof a){e=a+"\x3c"+(!1===b?"0":"1")+(c?"1":"0")+"\x3e";if(e in this._.cachedChecks)return this._.cachedChecks[e];d=f(a).$1;h=d.styles;var m=d.classes;d.name=d.elements;
d.classes=m=m?m.split(/\s*,\s*/):[];d.styles=w(h);d.attributes=w(d.attributes);d.children=[];m.length&&(d.attributes["class"]=m.join(" "));h&&(d.attributes.style=CKEDITOR.tools.writeCssText(d.styles));h=d}else d=a.getDefinition(),h=d.styles,m=d.attributes||{},h&&!CKEDITOR.tools.isEmpty(h)?(h=H(h),m.style=CKEDITOR.tools.writeCssText(h,!0)):h={},h={name:d.element,attributes:m,classes:m["class"]?m["class"].split(/\s+/):[],styles:h,children:[]};var m=CKEDITOR.tools.clone(h),g=[],r;if(!1!==b&&(r=this._.transformations[h.name])){for(d=
0;d<r.length;++d)n(this,h,r[d]);p(h)}t(this,m,g,{doFilter:!0,doTransform:!1!==b,skipRequired:!c,skipFinalValidation:!c});b=0<g.length?!1:CKEDITOR.tools.objectCompare(h.attributes,m.attributes,!0)?!0:!1;"string"==typeof a&&(this._.cachedChecks[e]=b);return b},getAllowedEnterMode:function(){var a=["p","div","br"],b={p:CKEDITOR.ENTER_P,div:CKEDITOR.ENTER_DIV,br:CKEDITOR.ENTER_BR};return function(c,d){var h=a.slice(),n;if(this.check(T[c]))return c;for(d||(h=h.reverse());n=h.pop();)if(this.check(n))return b[n];
return CKEDITOR.ENTER_BR}}(),destroy:function(){delete CKEDITOR.filter.instances[this.id];delete this._;delete this.allowedContent;delete this.disallowedContent}};var Q={styles:1,attributes:1,classes:1},v={styles:"requiredStyles",attributes:"requiredAttributes",classes:"requiredClasses"},I=/^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,J={styles:/{([^}]+)}/,attrs:/\[([^\]]+)\]/,classes:/\(([^\)]+)\)/},F=/^cke:(object|embed|param)$/,
L=/^(object|embed|param)$/,K;K=CKEDITOR.filter.transformationsTools={sizeToStyle:function(a){this.lengthToStyle(a,"width");this.lengthToStyle(a,"height")},sizeToAttribute:function(a){this.lengthToAttribute(a,"width");this.lengthToAttribute(a,"height")},lengthToStyle:function(a,b,c){c=c||b;if(!(c in a.styles)){var d=a.attributes[b];d&&(/^\d+$/.test(d)&&(d+="px"),a.styles[c]=d)}delete a.attributes[b]},lengthToAttribute:function(a,b,c){c=c||b;if(!(c in a.attributes)){var d=a.styles[b],h=d&&d.match(/^(\d+)(?:\.\d*)?px$/);
h?a.attributes[c]=h[1]:"cke-test"==d&&(a.attributes[c]="cke-test")}delete a.styles[b]},alignmentToStyle:function(a){if(!("float"in a.styles)){var b=a.attributes.align;if("left"==b||"right"==b)a.styles["float"]=b}delete a.attributes.align},alignmentToAttribute:function(a){if(!("align"in a.attributes)){var b=a.styles["float"];if("left"==b||"right"==b)a.attributes.align=b}delete a.styles["float"]},matchesStyle:m,transform:function(a,b){if("string"==typeof b)a.name=b;else{var c=b.getDefinition(),d=c.styles,
h=c.attributes,n,m,e,f;a.name=c.element;for(n in h)if("class"==n)for(c=a.classes.join("|"),e=h[n].split(/\s+/);f=e.pop();)-1==c.indexOf(f)&&a.classes.push(f);else a.attributes[n]=h[n];for(m in d)a.styles[m]=d[m]}}}})();
(function(){CKEDITOR.focusManager=function(a){if(a.focusManager)return a.focusManager;this.hasFocus=!1;this.currentActive=null;this._={editor:a};return this};CKEDITOR.focusManager._={blurDelay:200};CKEDITOR.focusManager.prototype={focus:function(a){this._.timer&&clearTimeout(this._.timer);a&&(this.currentActive=a);this.hasFocus||this._.locked||((a=CKEDITOR.currentInstance)&&a.focusManager.blur(1),this.hasFocus=!0,(a=this._.editor.container)&&a.addClass("cke_focus"),this._.editor.fire("focus"))},lock:function(){this._.locked=
1},unlock:function(){delete this._.locked},blur:function(a){function d(){if(this.hasFocus){this.hasFocus=!1;var a=this._.editor.container;a&&a.removeClass("cke_focus");this._.editor.fire("blur")}}if(!this._.locked){this._.timer&&clearTimeout(this._.timer);var b=CKEDITOR.focusManager._.blurDelay;a||!b?d.call(this):this._.timer=CKEDITOR.tools.setTimeout(function(){delete this._.timer;d.call(this)},b,this)}},add:function(a,d){var b=a.getCustomData("focusmanager");if(!b||b!=this){b&&b.remove(a);var b=
"focus",c="blur";d&&(CKEDITOR.env.ie?(b="focusin",c="focusout"):CKEDITOR.event.useCapture=1);var e={blur:function(){a.equals(this.currentActive)&&this.blur()},focus:function(){this.focus(a)}};a.on(b,e.focus,this);a.on(c,e.blur,this);d&&(CKEDITOR.event.useCapture=0);a.setCustomData("focusmanager",this);a.setCustomData("focusmanager_handlers",e)}},remove:function(a){a.removeCustomData("focusmanager");var d=a.removeCustomData("focusmanager_handlers");a.removeListener("blur",d.blur);a.removeListener("focus",
d.focus)}}})();CKEDITOR.keystrokeHandler=function(a){if(a.keystrokeHandler)return a.keystrokeHandler;this.keystrokes={};this.blockedKeystrokes={};this._={editor:a};return this};
(function(){var a,d=function(b){b=b.data;var d=b.getKeystroke(),g=this.keystrokes[d],l=this._.editor;a=!1===l.fire("key",{keyCode:d,domEvent:b});a||(g&&(a=!1!==l.execCommand(g,{from:"keystrokeHandler"})),a||(a=!!this.blockedKeystrokes[d]));a&&b.preventDefault(!0);return!a},b=function(b){a&&(a=!1,b.data.preventDefault(!0))};CKEDITOR.keystrokeHandler.prototype={attach:function(a){a.on("keydown",d,this);if(CKEDITOR.env.gecko&&CKEDITOR.env.mac)a.on("keypress",b,this)}}})();
(function(){CKEDITOR.lang={languages:{af:1,ar:1,bg:1,bn:1,bs:1,ca:1,cs:1,cy:1,da:1,de:1,"de-ch":1,el:1,"en-au":1,"en-ca":1,"en-gb":1,en:1,eo:1,es:1,et:1,eu:1,fa:1,fi:1,fo:1,"fr-ca":1,fr:1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,is:1,it:1,ja:1,ka:1,km:1,ko:1,ku:1,lt:1,lv:1,mk:1,mn:1,ms:1,nb:1,nl:1,no:1,pl:1,"pt-br":1,pt:1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,"sr-latn":1,sr:1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,"zh-cn":1,zh:1},rtl:{ar:1,fa:1,he:1,ku:1,ug:1},load:function(a,d,b){a&&CKEDITOR.lang.languages[a]||(a=
this.detect(d,a));var c=this;d=function(){c[a].dir=c.rtl[a]?"rtl":"ltr";b(a,c[a])};this[a]?d():CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/"+a+".js"),d,this)},detect:function(a,d){var b=this.languages;d=d||navigator.userLanguage||navigator.language||a;var c=d.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),e=c[1],c=c[2];b[e+"-"+c]?e=e+"-"+c:b[e]||(e=null);CKEDITOR.lang.detect=e?function(){return e}:function(a){return a};return e||a}}})();
CKEDITOR.scriptLoader=function(){var a={},d={};return{load:function(b,c,e,g){var l="string"==typeof b;l&&(b=[b]);e||(e=CKEDITOR);var k=b.length,q=[],w=[],f=function(a){c&&(l?c.call(e,a):c.call(e,q,w))};if(0===k)f(!0);else{var y=function(a,b){(b?q:w).push(a);0>=--k&&(g&&CKEDITOR.document.getDocumentElement().removeStyle("cursor"),f(b))},A=function(b,c){a[b]=1;var e=d[b];delete d[b];for(var f=0;f<e.length;f++)e[f](b,c)},t=function(b){if(a[b])y(b,!0);else{var e=d[b]||(d[b]=[]);e.push(y);if(!(1<e.length)){var f=
new CKEDITOR.dom.element("script");f.setAttributes({type:"text/javascript",src:b});c&&(CKEDITOR.env.ie&&11>CKEDITOR.env.version?f.$.onreadystatechange=function(){if("loaded"==f.$.readyState||"complete"==f.$.readyState)f.$.onreadystatechange=null,A(b,!0)}:(f.$.onload=function(){setTimeout(function(){A(b,!0)},0)},f.$.onerror=function(){A(b,!1)}));f.appendTo(CKEDITOR.document.getHead())}}};g&&CKEDITOR.document.getDocumentElement().setStyle("cursor","wait");for(var D=0;D<k;D++)t(b[D])}},queue:function(){function a(){var b;
(b=c[0])&&this.load(b.scriptUrl,b.callback,CKEDITOR,0)}var c=[];return function(d,g){var l=this;c.push({scriptUrl:d,callback:function(){g&&g.apply(this,arguments);c.shift();a.call(l)}});1==c.length&&a.call(this)}}()}}();CKEDITOR.resourceManager=function(a,d){this.basePath=a;this.fileName=d;this.registered={};this.loaded={};this.externals={};this._={waitingList:{}}};
CKEDITOR.resourceManager.prototype={add:function(a,d){if(this.registered[a])throw Error('[CKEDITOR.resourceManager.add] The resource name "'+a+'" is already registered.');var b=this.registered[a]=d||{};b.name=a;b.path=this.getPath(a);CKEDITOR.fire(a+CKEDITOR.tools.capitalize(this.fileName)+"Ready",b);return this.get(a)},get:function(a){return this.registered[a]||null},getPath:function(a){var d=this.externals[a];return CKEDITOR.getUrl(d&&d.dir||this.basePath+a+"/")},getFilePath:function(a){var d=this.externals[a];
return CKEDITOR.getUrl(this.getPath(a)+(d?d.file:this.fileName+".js"))},addExternal:function(a,d,b){a=a.split(",");for(var c=0;c<a.length;c++){var e=a[c];b||(d=d.replace(/[^\/]+$/,function(a){b=a;return""}));this.externals[e]={dir:d,file:b||this.fileName+".js"}}},load:function(a,d,b){CKEDITOR.tools.isArray(a)||(a=a?[a]:[]);for(var c=this.loaded,e=this.registered,g=[],l={},k={},q=0;q<a.length;q++){var w=a[q];if(w)if(c[w]||e[w])k[w]=this.get(w);else{var f=this.getFilePath(w);g.push(f);f in l||(l[f]=
[]);l[f].push(w)}}CKEDITOR.scriptLoader.load(g,function(a,e){if(e.length)throw Error('[CKEDITOR.resourceManager.load] Resource name "'+l[e[0]].join(",")+'" was not found at "'+e[0]+'".');for(var f=0;f<a.length;f++)for(var g=l[a[f]],p=0;p<g.length;p++){var x=g[p];k[x]=this.get(x);c[x]=1}d.call(b,k)},this)}};CKEDITOR.plugins=new CKEDITOR.resourceManager("plugins/","plugin");
CKEDITOR.plugins.load=CKEDITOR.tools.override(CKEDITOR.plugins.load,function(a){var d={};return function(b,c,e){var g={},l=function(b){a.call(this,b,function(a){CKEDITOR.tools.extend(g,a);var b=[],f;for(f in a){var k=a[f],A=k&&k.requires;if(!d[f]){if(k.icons)for(var t=k.icons.split(","),D=t.length;D--;)CKEDITOR.skin.addIcon(t[D],k.path+"icons/"+(CKEDITOR.env.hidpi&&k.hidpi?"hidpi/":"")+t[D]+".png");d[f]=1}if(A)for(A.split&&(A=A.split(",")),k=0;k<A.length;k++)g[A[k]]||b.push(A[k])}if(b.length)l.call(this,
b);else{for(f in g)k=g[f],k.onLoad&&!k.onLoad._called&&(!1===k.onLoad()&&delete g[f],k.onLoad._called=1);c&&c.call(e||window,g)}},this)};l.call(this,b)}});CKEDITOR.plugins.setLang=function(a,d,b){var c=this.get(a);a=c.langEntries||(c.langEntries={});c=c.lang||(c.lang=[]);c.split&&(c=c.split(","));-1==CKEDITOR.tools.indexOf(c,d)&&c.push(d);a[d]=b};CKEDITOR.ui=function(a){if(a.ui)return a.ui;this.items={};this.instances={};this.editor=a;this._={handlers:{}};return this};
CKEDITOR.ui.prototype={add:function(a,d,b){b.name=a.toLowerCase();var c=this.items[a]={type:d,command:b.command||null,args:Array.prototype.slice.call(arguments,2)};CKEDITOR.tools.extend(c,b)},get:function(a){return this.instances[a]},create:function(a){var d=this.items[a],b=d&&this._.handlers[d.type],c=d&&d.command&&this.editor.getCommand(d.command),b=b&&b.create.apply(this,d.args);this.instances[a]=b;c&&c.uiItems.push(b);b&&!b.type&&(b.type=d.type);return b},addHandler:function(a,d){this._.handlers[a]=
d},space:function(a){return CKEDITOR.document.getById(this.spaceId(a))},spaceId:function(a){return this.editor.id+"_"+a}};CKEDITOR.event.implementOn(CKEDITOR.ui);
(function(){function a(a,e,f){CKEDITOR.event.call(this);a=a&&CKEDITOR.tools.clone(a);if(void 0!==e){if(!(e instanceof CKEDITOR.dom.element))throw Error("Expect element of type CKEDITOR.dom.element.");if(!f)throw Error("One of the element modes must be specified.");if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&f==CKEDITOR.ELEMENT_MODE_INLINE)throw Error("Inline element mode is not supported on IE quirks.");if(!b(e,f))throw Error('The specified element mode is not supported on element: "'+e.getName()+'".');
this.element=e;this.elementMode=f;this.name=this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO&&(e.getId()||e.getNameAtt())}else this.elementMode=CKEDITOR.ELEMENT_MODE_NONE;this._={};this.commands={};this.templates={};this.name=this.name||d();this.id=CKEDITOR.tools.getNextId();this.status="unloaded";this.config=CKEDITOR.tools.prototypedCopy(CKEDITOR.config);this.ui=new CKEDITOR.ui(this);this.focusManager=new CKEDITOR.focusManager(this);this.keystrokeHandler=new CKEDITOR.keystrokeHandler(this);this.on("readOnly",
c);this.on("selectionChange",function(a){g(this,a.data.path)});this.on("activeFilterChange",function(){g(this,this.elementPath(),!0)});this.on("mode",c);this.on("instanceReady",function(){this.config.startupFocus&&this.focus()});CKEDITOR.fire("instanceCreated",null,this);CKEDITOR.add(this);CKEDITOR.tools.setTimeout(function(){"destroyed"!==this.status?k(this,a):CKEDITOR.warn("editor-incorrect-destroy")},0,this)}function d(){do var a="editor"+ ++t;while(CKEDITOR.instances[a]);return a}function b(a,
b){return b==CKEDITOR.ELEMENT_MODE_INLINE?a.is(CKEDITOR.dtd.$editable)||a.is("textarea"):b==CKEDITOR.ELEMENT_MODE_REPLACE?!a.is(CKEDITOR.dtd.$nonBodyContent):1}function c(){var a=this.commands,b;for(b in a)e(this,a[b])}function e(a,b){b[b.startDisabled?"disable":a.readOnly&&!b.readOnly?"disable":b.modes[a.mode]?"enable":"disable"]()}function g(a,b,c){if(b){var d,e,h=a.commands;for(e in h)d=h[e],(c||d.contextSensitive)&&d.refresh(a,b)}}function l(a){var b=a.config.customConfig;if(!b)return!1;var b=
CKEDITOR.getUrl(b),c=D[b]||(D[b]={});c.fn?(c.fn.call(a,a.config),CKEDITOR.getUrl(a.config.customConfig)!=b&&l(a)||a.fireOnce("customConfigLoaded")):CKEDITOR.scriptLoader.queue(b,function(){c.fn=CKEDITOR.editorConfig?CKEDITOR.editorConfig:function(){};l(a)});return!0}function k(a,b){a.on("customConfigLoaded",function(){if(b){if(b.on)for(var c in b.on)a.on(c,b.on[c]);CKEDITOR.tools.extend(a.config,b,!0);delete a.config.on}c=a.config;a.readOnly=c.readOnly?!0:a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?
a.element.is("textarea")?a.element.hasAttribute("disabled")||a.element.hasAttribute("readonly"):a.element.isReadOnly():a.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?a.element.hasAttribute("disabled")||a.element.hasAttribute("readonly"):!1;a.blockless=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?!(a.element.is("textarea")||CKEDITOR.dtd[a.element.getName()].p):!1;a.tabIndex=c.tabIndex||a.element&&a.element.getAttribute("tabindex")||0;a.activeEnterMode=a.enterMode=a.blockless?CKEDITOR.ENTER_BR:c.enterMode;
a.activeShiftEnterMode=a.shiftEnterMode=a.blockless?CKEDITOR.ENTER_BR:c.shiftEnterMode;c.skin&&(CKEDITOR.skinName=c.skin);a.fireOnce("configLoaded");a.dataProcessor=new CKEDITOR.htmlDataProcessor(a);a.filter=a.activeFilter=new CKEDITOR.filter(a);q(a)});b&&null!=b.customConfig&&(a.config.customConfig=b.customConfig);l(a)||a.fireOnce("customConfigLoaded")}function q(a){CKEDITOR.skin.loadPart("editor",function(){w(a)})}function w(a){CKEDITOR.lang.load(a.config.language,a.config.defaultLanguage,function(b,
c){var d=a.config.title;a.langCode=b;a.lang=CKEDITOR.tools.prototypedCopy(c);a.title="string"==typeof d||!1===d?d:[a.lang.editor,a.name].join(", ");a.config.contentsLangDirection||(a.config.contentsLangDirection=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.element.getDirection(1):a.lang.dir);a.fire("langLoaded");f(a)})}function f(a){a.getStylesSet(function(b){a.once("loaded",function(){a.fire("stylesSet",{styles:b})},null,null,1);y(a)})}function y(a){var b=a.config,c=b.plugins,d=b.extraPlugins,e=
b.removePlugins;if(d)var h=new RegExp("(?:^|,)(?:"+d.replace(/\s*,\s*/g,"|")+")(?\x3d,|$)","g"),c=c.replace(h,""),c=c+(","+d);if(e)var n=new RegExp("(?:^|,)(?:"+e.replace(/\s*,\s*/g,"|")+")(?\x3d,|$)","g"),c=c.replace(n,"");CKEDITOR.env.air&&(c+=",adobeair");CKEDITOR.plugins.load(c.split(","),function(c){var d=[],h=[],e=[];a.plugins=c;for(var f in c){var g=c[f],r=g.lang,l=null,k=g.requires,v;CKEDITOR.tools.isArray(k)&&(k=k.join(","));if(k&&(v=k.match(n)))for(;k=v.pop();)CKEDITOR.error("editor-plugin-required",
{plugin:k.replace(",",""),requiredBy:f});r&&!a.lang[f]&&(r.split&&(r=r.split(",")),0<=CKEDITOR.tools.indexOf(r,a.langCode)?l=a.langCode:(l=a.langCode.replace(/-.*/,""),l=l!=a.langCode&&0<=CKEDITOR.tools.indexOf(r,l)?l:0<=CKEDITOR.tools.indexOf(r,"en")?"en":r[0]),g.langEntries&&g.langEntries[l]?(a.lang[f]=g.langEntries[l],l=null):e.push(CKEDITOR.getUrl(g.path+"lang/"+l+".js")));h.push(l);d.push(g)}CKEDITOR.scriptLoader.load(e,function(){for(var c=["beforeInit","init","afterInit"],e=0;e<c.length;e++)for(var n=
0;n<d.length;n++){var m=d[n];0===e&&h[n]&&m.lang&&m.langEntries&&(a.lang[m.name]=m.langEntries[h[n]]);if(m[c[e]])m[c[e]](a)}a.fireOnce("pluginsLoaded");b.keystrokes&&a.setKeystroke(a.config.keystrokes);for(n=0;n<a.config.blockedKeystrokes.length;n++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[n]]=1;a.status="loaded";a.fireOnce("loaded");CKEDITOR.fire("instanceLoaded",null,a)})})}function A(){var a=this.element;if(a&&this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO){var b=this.getData();
this.config.htmlEncodeOutput&&(b=CKEDITOR.tools.htmlEncode(b));a.is("textarea")?a.setValue(b):a.setHtml(b);return!0}return!1}a.prototype=CKEDITOR.editor.prototype;CKEDITOR.editor=a;var t=0,D={};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{addCommand:function(a,b){b.name=a.toLowerCase();var c=new CKEDITOR.command(this,b);this.mode&&e(this,c);return this.commands[a]=c},_attachToForm:function(){function a(b){c.updateElement();c._.required&&!d.getValue()&&!1===c.fire("required")&&b.data.preventDefault()}
function b(a){return!!(a&&a.call&&a.apply)}var c=this,d=c.element,e=new CKEDITOR.dom.element(d.$.form);d.is("textarea")&&e&&(e.on("submit",a),b(e.$.submit)&&(e.$.submit=CKEDITOR.tools.override(e.$.submit,function(b){return function(){a();b.apply?b.apply(this):b()}})),c.on("destroy",function(){e.removeListener("submit",a)}))},destroy:function(a){this.fire("beforeDestroy");!a&&A.call(this);this.editable(null);this.filter&&(this.filter.destroy(),delete this.filter);delete this.activeFilter;this.status=
"destroyed";this.fire("destroy");this.removeAllListeners();CKEDITOR.remove(this);CKEDITOR.fire("instanceDestroyed",null,this)},elementPath:function(a){if(!a){a=this.getSelection();if(!a)return null;a=a.getStartElement()}return a?new CKEDITOR.dom.elementPath(a,this.editable()):null},createRange:function(){var a=this.editable();return a?new CKEDITOR.dom.range(a):null},execCommand:function(a,b){var c=this.getCommand(a),d={name:a,commandData:b,command:c};return c&&c.state!=CKEDITOR.TRISTATE_DISABLED&&
!1!==this.fire("beforeCommandExec",d)&&(d.returnValue=c.exec(d.commandData),!c.async&&!1!==this.fire("afterCommandExec",d))?d.returnValue:!1},getCommand:function(a){return this.commands[a]},getData:function(a){!a&&this.fire("beforeGetData");var b=this._.data;"string"!=typeof b&&(b=(b=this.element)&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?b.is("textarea")?b.getValue():b.getHtml():"");b={dataValue:b};!a&&this.fire("getData",b);return b.dataValue},getSnapshot:function(){var a=this.fire("getSnapshot");
"string"!=typeof a&&(a=(a=this.element)&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?a.is("textarea")?a.getValue():a.getHtml():"");return a},loadSnapshot:function(a){this.fire("loadSnapshot",a)},setData:function(a,b,c){var d=!0,e=b;b&&"object"==typeof b&&(c=b.internal,e=b.callback,d=!b.noSnapshot);!c&&d&&this.fire("saveSnapshot");if(e||!c)this.once("dataReady",function(a){!c&&d&&this.fire("saveSnapshot");e&&e.call(a.editor)});a={dataValue:a};!c&&this.fire("setData",a);this._.data=a.dataValue;
!c&&this.fire("afterSetData",a)},setReadOnly:function(a){a=null==a||a;this.readOnly!=a&&(this.readOnly=a,this.keystrokeHandler.blockedKeystrokes[8]=+a,this.editable().setReadOnly(a),this.fire("readOnly"))},insertHtml:function(a,b,c){this.fire("insertHtml",{dataValue:a,mode:b,range:c})},insertText:function(a){this.fire("insertText",a)},insertElement:function(a){this.fire("insertElement",a)},getSelectedHtml:function(a){var b=this.editable(),c=this.getSelection(),c=c&&c.getRanges();if(!b||!c||0===c.length)return null;
for(var d=new CKEDITOR.dom.documentFragment,e,h,n,m=0;m<c.length;m++){var f=c[m],g=f.startContainer;g.getName&&"tr"==g.getName()?(e||(e=g.getAscendant("table").clone(),e.append(g.getAscendant("tbody").clone()),d.append(e),e=e.findOne("tbody")),h&&h.equals(g)||(h=g,n=g.clone(),e.append(n)),n.append(f.cloneContents())):d.append(f.cloneContents())}b=e?d:b.getHtmlFromRange(c[0]);return a?b.getHtml():b},extractSelectedHtml:function(a,b){var c=this.editable(),d=this.getSelection().getRanges();if(!c||0===
d.length)return null;d=d[0];c=c.extractHtmlFromRange(d,b);b||this.getSelection().selectRanges([d]);return a?c.getHtml():c},focus:function(){this.fire("beforeFocus")},checkDirty:function(){return"ready"==this.status&&this._.previousValue!==this.getSnapshot()},resetDirty:function(){this._.previousValue=this.getSnapshot()},updateElement:function(){return A.call(this)},setKeystroke:function(){for(var a=this.keystrokeHandler.keystrokes,b=CKEDITOR.tools.isArray(arguments[0])?arguments[0]:[[].slice.call(arguments,
0)],c,d,e=b.length;e--;)c=b[e],d=0,CKEDITOR.tools.isArray(c)&&(d=c[1],c=c[0]),d?a[c]=d:delete a[c]},addFeature:function(a){return this.filter.addFeature(a)},setActiveFilter:function(a){a||(a=this.filter);this.activeFilter!==a&&(this.activeFilter=a,this.fire("activeFilterChange"),a===this.filter?this.setActiveEnterMode(null,null):this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode),a.getAllowedEnterMode(this.shiftEnterMode,!0)))},setActiveEnterMode:function(a,b){a=a?this.blockless?CKEDITOR.ENTER_BR:
a:this.enterMode;b=b?this.blockless?CKEDITOR.ENTER_BR:b:this.shiftEnterMode;if(this.activeEnterMode!=a||this.activeShiftEnterMode!=b)this.activeEnterMode=a,this.activeShiftEnterMode=b,this.fire("activeEnterModeChange")},showNotification:function(a){alert(a)}})})();CKEDITOR.ELEMENT_MODE_NONE=0;CKEDITOR.ELEMENT_MODE_REPLACE=1;CKEDITOR.ELEMENT_MODE_APPENDTO=2;CKEDITOR.ELEMENT_MODE_INLINE=3;CKEDITOR.htmlParser=function(){this._={htmlPartsRegex:/<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g}};
(function(){var a=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,d={checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,nowrap:1,readonly:1,selected:1};CKEDITOR.htmlParser.prototype={onTagOpen:function(){},onTagClose:function(){},onText:function(){},onCDATA:function(){},onComment:function(){},parse:function(b){for(var c,e,g=0,l;c=this._.htmlPartsRegex.exec(b);){e=c.index;if(e>g)if(g=b.substring(g,e),l)l.push(g);else this.onText(g);
g=this._.htmlPartsRegex.lastIndex;if(e=c[1])if(e=e.toLowerCase(),l&&CKEDITOR.dtd.$cdata[e]&&(this.onCDATA(l.join("")),l=null),!l){this.onTagClose(e);continue}if(l)l.push(c[0]);else if(e=c[3]){if(e=e.toLowerCase(),!/="/.test(e)){var k={},q,w=c[4];c=!!c[5];if(w)for(;q=a.exec(w);){var f=q[1].toLowerCase();q=q[2]||q[3]||q[4]||"";k[f]=!q&&d[f]?f:CKEDITOR.tools.htmlDecodeAttr(q)}this.onTagOpen(e,k,c);!l&&CKEDITOR.dtd.$cdata[e]&&(l=[])}}else if(e=c[2])this.onComment(e)}if(b.length>g)this.onText(b.substring(g,
b.length))}}})();
CKEDITOR.htmlParser.basicWriter=CKEDITOR.tools.createClass({$:function(){this._={output:[]}},proto:{openTag:function(a){this._.output.push("\x3c",a)},openTagClose:function(a,d){d?this._.output.push(" /\x3e"):this._.output.push("\x3e")},attribute:function(a,d){"string"==typeof d&&(d=CKEDITOR.tools.htmlEncodeAttr(d));this._.output.push(" ",a,'\x3d"',d,'"')},closeTag:function(a){this._.output.push("\x3c/",a,"\x3e")},text:function(a){this._.output.push(a)},comment:function(a){this._.output.push("\x3c!--",a,
"--\x3e")},write:function(a){this._.output.push(a)},reset:function(){this._.output=[];this._.indent=!1},getHtml:function(a){var d=this._.output.join("");a&&this.reset();return d}}});"use strict";
(function(){CKEDITOR.htmlParser.node=function(){};CKEDITOR.htmlParser.node.prototype={remove:function(){var a=this.parent.children,d=CKEDITOR.tools.indexOf(a,this),b=this.previous,c=this.next;b&&(b.next=c);c&&(c.previous=b);a.splice(d,1);this.parent=null},replaceWith:function(a){var d=this.parent.children,b=CKEDITOR.tools.indexOf(d,this),c=a.previous=this.previous,e=a.next=this.next;c&&(c.next=a);e&&(e.previous=a);d[b]=a;a.parent=this.parent;this.parent=null},insertAfter:function(a){var d=a.parent.children,
b=CKEDITOR.tools.indexOf(d,a),c=a.next;d.splice(b+1,0,this);this.next=a.next;this.previous=a;a.next=this;c&&(c.previous=this);this.parent=a.parent},insertBefore:function(a){var d=a.parent.children,b=CKEDITOR.tools.indexOf(d,a);d.splice(b,0,this);this.next=a;(this.previous=a.previous)&&(a.previous.next=this);a.previous=this;this.parent=a.parent},getAscendant:function(a){var d="function"==typeof a?a:"string"==typeof a?function(b){return b.name==a}:function(b){return b.name in a},b=this.parent;for(;b&&
b.type==CKEDITOR.NODE_ELEMENT;){if(d(b))return b;b=b.parent}return null},wrapWith:function(a){this.replaceWith(a);a.add(this);return a},getIndex:function(){return CKEDITOR.tools.indexOf(this.parent.children,this)},getFilterContext:function(a){return a||{}}}})();"use strict";CKEDITOR.htmlParser.comment=function(a){this.value=a;this._={isBlockLike:!1}};
CKEDITOR.htmlParser.comment.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_COMMENT,filter:function(a,d){var b=this.value;if(!(b=a.onComment(d,b,this)))return this.remove(),!1;if("string"!=typeof b)return this.replaceWith(b),!1;this.value=b;return!0},writeHtml:function(a,d){d&&this.filter(d);a.comment(this.value)}});"use strict";
(function(){CKEDITOR.htmlParser.text=function(a){this.value=a;this._={isBlockLike:!1}};CKEDITOR.htmlParser.text.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,filter:function(a,d){if(!(this.value=a.onText(d,this.value,this)))return this.remove(),!1},writeHtml:function(a,d){d&&this.filter(d);a.text(this.value)}})})();"use strict";
(function(){CKEDITOR.htmlParser.cdata=function(a){this.value=a};CKEDITOR.htmlParser.cdata.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,filter:function(){},writeHtml:function(a){a.write(this.value)}})})();"use strict";CKEDITOR.htmlParser.fragment=function(){this.children=[];this.parent=null;this._={isBlockLike:!0,hasInlineStarted:!1}};
(function(){function a(a){return a.attributes["data-cke-survive"]?!1:"a"==a.name&&a.attributes.href||CKEDITOR.dtd.$removeEmpty[a.name]}var d=CKEDITOR.tools.extend({table:1,ul:1,ol:1,dl:1},CKEDITOR.dtd.table,CKEDITOR.dtd.ul,CKEDITOR.dtd.ol,CKEDITOR.dtd.dl),b={ol:1,ul:1},c=CKEDITOR.tools.extend({},{html:1},CKEDITOR.dtd.html,CKEDITOR.dtd.body,CKEDITOR.dtd.head,{style:1,script:1}),e={ul:"li",ol:"li",dl:"dd",table:"tbody",tbody:"tr",thead:"tr",tfoot:"tr",tr:"td"};CKEDITOR.htmlParser.fragment.fromHtml=
function(g,l,k){function q(a){var b;if(0<x.length)for(var c=0;c<x.length;c++){var d=x[c],h=d.name,e=CKEDITOR.dtd[h],f=u.name&&CKEDITOR.dtd[u.name];f&&!f[h]||a&&e&&!e[a]&&CKEDITOR.dtd[a]?h==u.name&&(y(u,u.parent,1),c--):(b||(w(),b=1),d=d.clone(),d.parent=u,u=d,x.splice(c,1),c--)}}function w(){for(;G.length;)y(G.shift(),u)}function f(a){if(a._.isBlockLike&&"pre"!=a.name&&"textarea"!=a.name){var b=a.children.length,c=a.children[b-1],d;c&&c.type==CKEDITOR.NODE_TEXT&&((d=CKEDITOR.tools.rtrim(c.value))?
c.value=d:a.children.length=b-1)}}function y(b,c,d){c=c||u||p;var e=u;void 0===b.previous&&(A(c,b)&&(u=c,D.onTagOpen(k,{}),b.returnPoint=c=u),f(b),a(b)&&!b.children.length||c.add(b),"pre"==b.name&&(h=!1),"textarea"==b.name&&(r=!1));b.returnPoint?(u=b.returnPoint,delete b.returnPoint):u=d?c:e}function A(a,b){if((a==p||"body"==a.name)&&k&&(!a.name||CKEDITOR.dtd[a.name][k])){var c,d;return(c=b.attributes&&(d=b.attributes["data-cke-real-element-type"])?d:b.name)&&c in CKEDITOR.dtd.$inline&&!(c in CKEDITOR.dtd.head)&&
!b.isOrphan||b.type==CKEDITOR.NODE_TEXT}}function t(a,b){return a in CKEDITOR.dtd.$listItem||a in CKEDITOR.dtd.$tableContent?a==b||"dt"==a&&"dd"==b||"dd"==a&&"dt"==b:!1}var D=new CKEDITOR.htmlParser,p=l instanceof CKEDITOR.htmlParser.element?l:"string"==typeof l?new CKEDITOR.htmlParser.element(l):new CKEDITOR.htmlParser.fragment,x=[],G=[],u=p,r="textarea"==p.name,h="pre"==p.name;D.onTagOpen=function(e,m,f,g){m=new CKEDITOR.htmlParser.element(e,m);m.isUnknown&&f&&(m.isEmpty=!0);m.isOptionalClose=g;
if(a(m))x.push(m);else{if("pre"==e)h=!0;else{if("br"==e&&h){u.add(new CKEDITOR.htmlParser.text("\n"));return}"textarea"==e&&(r=!0)}if("br"==e)G.push(m);else{for(;!(g=(f=u.name)?CKEDITOR.dtd[f]||(u._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):c,m.isUnknown||u.isUnknown||g[e]);)if(u.isOptionalClose)D.onTagClose(f);else if(e in b&&f in b)f=u.children,(f=f[f.length-1])&&"li"==f.name||y(f=new CKEDITOR.htmlParser.element("li"),u),!m.returnPoint&&(m.returnPoint=u),u=f;else if(e in CKEDITOR.dtd.$listItem&&
!t(e,f))D.onTagOpen("li"==e?"ul":"dl",{},0,1);else if(f in d&&!t(e,f))!m.returnPoint&&(m.returnPoint=u),u=u.parent;else if(f in CKEDITOR.dtd.$inline&&x.unshift(u),u.parent)y(u,u.parent,1);else{m.isOrphan=1;break}q(e);w();m.parent=u;m.isEmpty?y(m):u=m}}};D.onTagClose=function(a){for(var b=x.length-1;0<=b;b--)if(a==x[b].name){x.splice(b,1);return}for(var c=[],d=[],h=u;h!=p&&h.name!=a;)h._.isBlockLike||d.unshift(h),c.push(h),h=h.returnPoint||h.parent;if(h!=p){for(b=0;b<c.length;b++){var e=c[b];y(e,e.parent)}u=
h;h._.isBlockLike&&w();y(h,h.parent);h==u&&(u=u.parent);x=x.concat(d)}"body"==a&&(k=!1)};D.onText=function(a){if(!(u._.hasInlineStarted&&!G.length||h||r)&&(a=CKEDITOR.tools.ltrim(a),0===a.length))return;var b=u.name,f=b?CKEDITOR.dtd[b]||(u._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):c;if(!r&&!f["#"]&&b in d)D.onTagOpen(e[b]||""),D.onText(a);else{w();q();h||r||(a=a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g," "));a=new CKEDITOR.htmlParser.text(a);if(A(u,a))this.onTagOpen(k,{},0,1);u.add(a)}};D.onCDATA=
function(a){u.add(new CKEDITOR.htmlParser.cdata(a))};D.onComment=function(a){w();q();u.add(new CKEDITOR.htmlParser.comment(a))};D.parse(g);for(w();u!=p;)y(u,u.parent,1);f(p);return p};CKEDITOR.htmlParser.fragment.prototype={type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,add:function(a,b){isNaN(b)&&(b=this.children.length);var c=0<b?this.children[b-1]:null;if(c){if(a._.isBlockLike&&c.type==CKEDITOR.NODE_TEXT&&(c.value=CKEDITOR.tools.rtrim(c.value),0===c.value.length)){this.children.pop();this.add(a);return}c.next=
a}a.previous=c;a.parent=this;this.children.splice(b,0,a);this._.hasInlineStarted||(this._.hasInlineStarted=a.type==CKEDITOR.NODE_TEXT||a.type==CKEDITOR.NODE_ELEMENT&&!a._.isBlockLike)},filter:function(a,b){b=this.getFilterContext(b);a.onRoot(b,this);this.filterChildren(a,!1,b)},filterChildren:function(a,b,c){if(this.childrenFilteredBy!=a.id){c=this.getFilterContext(c);if(b&&!this.parent)a.onRoot(c,this);this.childrenFilteredBy=a.id;for(b=0;b<this.children.length;b++)!1===this.children[b].filter(a,
c)&&b--}},writeHtml:function(a,b){b&&this.filter(b);this.writeChildrenHtml(a)},writeChildrenHtml:function(a,b,c){var d=this.getFilterContext();if(c&&!this.parent&&b)b.onRoot(d,this);b&&this.filterChildren(b,!1,d);b=0;c=this.children;for(d=c.length;b<d;b++)c[b].writeHtml(a)},forEach:function(a,b,c){if(!(c||b&&this.type!=b))var d=a(this);if(!1!==d){c=this.children;for(var e=0;e<c.length;e++)d=c[e],d.type==CKEDITOR.NODE_ELEMENT?d.forEach(a,b):b&&d.type!=b||a(d)}},getFilterContext:function(a){return a||
{}}}})();"use strict";
(function(){function a(){this.rules=[]}function d(b,c,d,g){var l,k;for(l in c)(k=b[l])||(k=b[l]=new a),k.add(c[l],d,g)}CKEDITOR.htmlParser.filter=CKEDITOR.tools.createClass({$:function(b){this.id=CKEDITOR.tools.getNextNumber();this.elementNameRules=new a;this.attributeNameRules=new a;this.elementsRules={};this.attributesRules={};this.textRules=new a;this.commentRules=new a;this.rootRules=new a;b&&this.addRules(b,10)},proto:{addRules:function(a,c){var e;"number"==typeof c?e=c:c&&"priority"in c&&(e=
c.priority);"number"!=typeof e&&(e=10);"object"!=typeof c&&(c={});a.elementNames&&this.elementNameRules.addMany(a.elementNames,e,c);a.attributeNames&&this.attributeNameRules.addMany(a.attributeNames,e,c);a.elements&&d(this.elementsRules,a.elements,e,c);a.attributes&&d(this.attributesRules,a.attributes,e,c);a.text&&this.textRules.add(a.text,e,c);a.comment&&this.commentRules.add(a.comment,e,c);a.root&&this.rootRules.add(a.root,e,c)},applyTo:function(a){a.filter(this)},onElementName:function(a,c){return this.elementNameRules.execOnName(a,
c)},onAttributeName:function(a,c){return this.attributeNameRules.execOnName(a,c)},onText:function(a,c,d){return this.textRules.exec(a,c,d)},onComment:function(a,c,d){return this.commentRules.exec(a,c,d)},onRoot:function(a,c){return this.rootRules.exec(a,c)},onElement:function(a,c){for(var d=[this.elementsRules["^"],this.elementsRules[c.name],this.elementsRules.$],g,l=0;3>l;l++)if(g=d[l]){g=g.exec(a,c,this);if(!1===g)return null;if(g&&g!=c)return this.onNode(a,g);if(c.parent&&!c.name)break}return c},
onNode:function(a,c){var d=c.type;return d==CKEDITOR.NODE_ELEMENT?this.onElement(a,c):d==CKEDITOR.NODE_TEXT?new CKEDITOR.htmlParser.text(this.onText(a,c.value)):d==CKEDITOR.NODE_COMMENT?new CKEDITOR.htmlParser.comment(this.onComment(a,c.value)):null},onAttribute:function(a,c,d,g){return(d=this.attributesRules[d])?d.exec(a,g,c,this):g}}});CKEDITOR.htmlParser.filterRulesGroup=a;a.prototype={add:function(a,c,d){this.rules.splice(this.findIndex(c),0,{value:a,priority:c,options:d})},addMany:function(a,
c,d){for(var g=[this.findIndex(c),0],l=0,k=a.length;l<k;l++)g.push({value:a[l],priority:c,options:d});this.rules.splice.apply(this.rules,g)},findIndex:function(a){for(var c=this.rules,d=c.length-1;0<=d&&a<c[d].priority;)d--;return d+1},exec:function(a,c){var d=c instanceof CKEDITOR.htmlParser.node||c instanceof CKEDITOR.htmlParser.fragment,g=Array.prototype.slice.call(arguments,1),l=this.rules,k=l.length,q,w,f,y;for(y=0;y<k;y++)if(d&&(q=c.type,w=c.name),f=l[y],!(a.nonEditable&&!f.options.applyToAll||
a.nestedEditable&&f.options.excludeNestedEditable)){f=f.value.apply(null,g);if(!1===f||d&&f&&(f.name!=w||f.type!=q))return f;null!=f&&(g[0]=c=f)}return c},execOnName:function(a,c){for(var d=0,g=this.rules,l=g.length,k;c&&d<l;d++)k=g[d],a.nonEditable&&!k.options.applyToAll||a.nestedEditable&&k.options.excludeNestedEditable||(c=c.replace(k.value[0],k.value[1]));return c}}})();
(function(){function a(a,d){function m(a){return a||CKEDITOR.env.needsNbspFiller?new CKEDITOR.htmlParser.text(" "):new CKEDITOR.htmlParser.element("br",{"data-cke-bogus":1})}function n(a,d){return function(h){if(h.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var e=[],n=b(h),r,F;if(n)for(f(n,1)&&e.push(n);n;)g(n)&&(r=c(n))&&f(r)&&((F=c(r))&&!g(F)?e.push(r):(m(v).insertAfter(r),r.remove())),n=n.previous;for(n=0;n<e.length;n++)e[n].remove();if(e=!a||!1!==("function"==typeof d?d(h):d))v||CKEDITOR.env.needsBrFiller||
h.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT?v||CKEDITOR.env.needsBrFiller||!(7<document.documentMode||h.name in CKEDITOR.dtd.tr||h.name in CKEDITOR.dtd.$listItem)?(e=b(h),e=!e||"form"==h.name&&"input"==e.name):e=!1:e=!1;e&&h.add(m(a))}}}function f(a,b){if((!v||CKEDITOR.env.needsBrFiller)&&a.type==CKEDITOR.NODE_ELEMENT&&"br"==a.name&&!a.attributes["data-cke-eol"])return!0;var c;return a.type==CKEDITOR.NODE_TEXT&&(c=a.value.match(x))&&(c.index&&((new CKEDITOR.htmlParser.text(a.value.substring(0,c.index))).insertBefore(a),
a.value=c[0]),!CKEDITOR.env.needsBrFiller&&v&&(!b||a.parent.name in z)||!v&&((c=a.previous)&&"br"==c.name||!c||g(c)))?!0:!1}var r={elements:{}},v="html"==d,z=CKEDITOR.tools.extend({},h),E;for(E in z)"#"in u[E]||delete z[E];for(E in z)r.elements[E]=n(v,a.config.fillEmptyBlocks);r.root=n(v,!1);r.elements.br=function(a){return function(b){if(b.parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var d=b.attributes;if("data-cke-bogus"in d||"data-cke-eol"in d)delete d["data-cke-bogus"];else{for(d=b.next;d&&e(d);)d=
d.next;var h=c(b);!d&&g(b.parent)?l(b.parent,m(a)):g(d)&&h&&!g(h)&&m(a).insertBefore(d)}}}}(v);return r}function d(a,b){return a!=CKEDITOR.ENTER_BR&&!1!==b?a==CKEDITOR.ENTER_DIV?"div":"p":!1}function b(a){for(a=a.children[a.children.length-1];a&&e(a);)a=a.previous;return a}function c(a){for(a=a.previous;a&&e(a);)a=a.previous;return a}function e(a){return a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(a.value)||a.type==CKEDITOR.NODE_ELEMENT&&a.attributes["data-cke-bookmark"]}function g(a){return a&&
(a.type==CKEDITOR.NODE_ELEMENT&&a.name in h||a.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)}function l(a,b){var c=a.children[a.children.length-1];a.children.push(b);b.parent=a;c&&(c.next=b,b.previous=c)}function k(a){a=a.attributes;"false"!=a.contenteditable&&(a["data-cke-editable"]=a.contenteditable?"true":1);a.contenteditable="false"}function q(a){a=a.attributes;switch(a["data-cke-editable"]){case "true":a.contenteditable="true";break;case "1":delete a.contenteditable}}function w(a){return a.replace(E,
function(a,b,c){return"\x3c"+b+c.replace(C,function(a,b){return H.test(b)&&-1==c.indexOf("data-cke-saved-"+b)?" data-cke-saved-"+a+" data-cke-"+CKEDITOR.rnd+"-"+a:a})+"\x3e"})}function f(a,b){return a.replace(b,function(a,b,c){0===a.indexOf("\x3ctextarea")&&(a=b+t(c).replace(/</g,"\x26lt;").replace(/>/g,"\x26gt;")+"\x3c/textarea\x3e");return"\x3ccke:encoded\x3e"+encodeURIComponent(a)+"\x3c/cke:encoded\x3e"})}function y(a){return a.replace(Q,function(a,b){return decodeURIComponent(b)})}function A(a){return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
function(a){return"\x3c!--"+G+"{C}"+encodeURIComponent(a).replace(/--/g,"%2D%2D")+"--\x3e"})}function t(a){return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g,function(a,b){return decodeURIComponent(b)})}function D(a,b){var c=b._.dataStore;return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g,function(a,b){return decodeURIComponent(b)}).replace(/\{cke_protected_(\d+)\}/g,function(a,b){return c&&c[b]||""})}function p(a,b){var c=[],d=b.config.protectedSource,h=b._.dataStore||(b._.dataStore=
{id:1}),e=/<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g,d=[/<script[\s\S]*?(<\/script>|$)/gi,/<noscript[\s\S]*?<\/noscript>/gi,/<meta[\s\S]*?\/?>/gi].concat(d);a=a.replace(/\x3c!--[\s\S]*?--\x3e/g,function(a){return"\x3c!--{cke_tempcomment}"+(c.push(a)-1)+"--\x3e"});for(var m=0;m<d.length;m++)a=a.replace(d[m],function(a){a=a.replace(e,function(a,b,d){return c[d]});return/cke_temp(comment)?/.test(a)?a:"\x3c!--{cke_temp}"+(c.push(a)-1)+"--\x3e"});a=a.replace(e,function(a,b,d){return"\x3c!--"+G+(b?"{C}":
"")+encodeURIComponent(c[d]).replace(/--/g,"%2D%2D")+"--\x3e"});a=a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g,function(a){return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g,function(a,b){h[h.id]=decodeURIComponent(b);return"{cke_protected_"+h.id++ +"}"})});return a=a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g,function(a,c,d,h){return"\x3c"+c+d+"\x3e"+D(t(h),b)+"\x3c/"+c+"\x3e"})}CKEDITOR.htmlDataProcessor=function(b){var c,
h,e=this;this.editor=b;this.dataFilter=c=new CKEDITOR.htmlParser.filter;this.htmlFilter=h=new CKEDITOR.htmlParser.filter;this.writer=new CKEDITOR.htmlParser.basicWriter;c.addRules(n);c.addRules(m,{applyToAll:!0});c.addRules(a(b,"data"),{applyToAll:!0});h.addRules(z);h.addRules(B,{applyToAll:!0});h.addRules(a(b,"html"),{applyToAll:!0});b.on("toHtml",function(a){a=a.data;var c=a.dataValue,h,c=p(c,b),c=f(c,T),c=w(c),c=f(c,R),c=c.replace(v,"$1cke:$2"),c=c.replace(J,"\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
c=c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g,"$1$2$2"),c=c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi,"$1data-cke-"+CKEDITOR.rnd+"-$2");h=a.context||b.editable().getName();var e;CKEDITOR.env.ie&&9>CKEDITOR.env.version&&"pre"==h&&(h="div",c="\x3cpre\x3e"+c+"\x3c/pre\x3e",e=1);h=b.document.createElement(h);h.setHtml("a"+c);c=h.getHtml().substr(1);c=c.replace(new RegExp("data-cke-"+CKEDITOR.rnd+"-","ig"),"");e&&(c=c.replace(/^<pre>|<\/pre>$/gi,""));c=c.replace(I,"$1$2");c=y(c);c=t(c);h=!1===a.fixForBody?!1:
d(a.enterMode,b.config.autoParagraph);c=CKEDITOR.htmlParser.fragment.fromHtml(c,a.context,h);h&&(e=c,!e.children.length&&CKEDITOR.dtd[e.name][h]&&(h=new CKEDITOR.htmlParser.element(h),e.add(h)));a.dataValue=c},null,null,5);b.on("toHtml",function(a){a.data.filter.applyTo(a.data.dataValue,!0,a.data.dontFilter,a.data.enterMode)&&b.fire("dataFiltered")},null,null,6);b.on("toHtml",function(a){a.data.dataValue.filterChildren(e.dataFilter,!0)},null,null,10);b.on("toHtml",function(a){a=a.data;var b=a.dataValue,
c=new CKEDITOR.htmlParser.basicWriter;b.writeChildrenHtml(c);b=c.getHtml(!0);a.dataValue=A(b)},null,null,15);b.on("toDataFormat",function(a){var c=a.data.dataValue;a.data.enterMode!=CKEDITOR.ENTER_BR&&(c=c.replace(/^<br *\/?>/i,""));a.data.dataValue=CKEDITOR.htmlParser.fragment.fromHtml(c,a.data.context,d(a.data.enterMode,b.config.autoParagraph))},null,null,5);b.on("toDataFormat",function(a){a.data.dataValue.filterChildren(e.htmlFilter,!0)},null,null,10);b.on("toDataFormat",function(a){a.data.filter.applyTo(a.data.dataValue,
!1,!0)},null,null,11);b.on("toDataFormat",function(a){var c=a.data.dataValue,d=e.writer;d.reset();c.writeChildrenHtml(d);c=d.getHtml(!0);c=t(c);c=D(c,b);a.data.dataValue=c},null,null,15)};CKEDITOR.htmlDataProcessor.prototype={toHtml:function(a,b,c,d){var h=this.editor,e,m,n,f;b&&"object"==typeof b?(e=b.context,c=b.fixForBody,d=b.dontFilter,m=b.filter,n=b.enterMode,f=b.protectedWhitespaces):e=b;e||null===e||(e=h.editable().getName());return h.fire("toHtml",{dataValue:a,context:e,fixForBody:c,dontFilter:d,
filter:m||h.filter,enterMode:n||h.enterMode,protectedWhitespaces:f}).dataValue},toDataFormat:function(a,b){var c,d,h;b&&(c=b.context,d=b.filter,h=b.enterMode);c||null===c||(c=this.editor.editable().getName());return this.editor.fire("toDataFormat",{dataValue:a,filter:d||this.editor.filter,context:c,enterMode:h||this.editor.enterMode}).dataValue}};var x=/(?:&nbsp;|\xa0)$/,G="{cke_protected}",u=CKEDITOR.dtd,r="caption colgroup col thead tfoot tbody".split(" "),h=CKEDITOR.tools.extend({},u.$blockLimit,
u.$block),n={elements:{input:k,textarea:k}},m={attributeNames:[[/^on/,"data-cke-pa-on"],[/^data-cke-expando$/,""]]},z={elements:{embed:function(a){var b=a.parent;if(b&&"object"==b.name){var c=b.attributes.width,b=b.attributes.height;c&&(a.attributes.width=c);b&&(a.attributes.height=b)}},a:function(a){var b=a.attributes;if(!(a.children.length||b.name||b.id||a.attributes["data-cke-saved-name"]))return!1}}},B={elementNames:[[/^cke:/,""],[/^\?xml:namespace$/,""]],attributeNames:[[/^data-cke-(saved|pa)-/,
""],[/^data-cke-.*/,""],["hidefocus",""]],elements:{$:function(a){var b=a.attributes;if(b){if(b["data-cke-temp"])return!1;for(var c=["name","href","src"],d,h=0;h<c.length;h++)d="data-cke-saved-"+c[h],d in b&&delete b[c[h]]}return a},table:function(a){a.children.slice(0).sort(function(a,b){var c,d;a.type==CKEDITOR.NODE_ELEMENT&&b.type==a.type&&(c=CKEDITOR.tools.indexOf(r,a.name),d=CKEDITOR.tools.indexOf(r,b.name));-1<c&&-1<d&&c!=d||(c=a.parent?a.getIndex():-1,d=b.parent?b.getIndex():-1);return c>d?
1:-1})},param:function(a){a.children=[];a.isEmpty=!0;return a},span:function(a){"Apple-style-span"==a.attributes["class"]&&delete a.name},html:function(a){delete a.attributes.contenteditable;delete a.attributes["class"]},body:function(a){delete a.attributes.spellcheck;delete a.attributes.contenteditable},style:function(a){var b=a.children[0];b&&b.value&&(b.value=CKEDITOR.tools.trim(b.value));a.attributes.type||(a.attributes.type="text/css")},title:function(a){var b=a.children[0];!b&&l(a,b=new CKEDITOR.htmlParser.text);
b.value=a.attributes["data-cke-title"]||""},input:q,textarea:q},attributes:{"class":function(a){return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g,""))||!1}}};CKEDITOR.env.ie&&(B.attributes.style=function(a){return a.replace(/(^|;)([^\:]+)/g,function(a){return a.toLowerCase()})});var E=/<(a|area|img|input|source)\b([^>]*)>/gi,C=/([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,H=/^(href|src|name)$/i,R=/(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
T=/(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,Q=/<cke:encoded>([^<]*)<\/cke:encoded>/gi,v=/(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,I=/(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,J=/<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi})();"use strict";
CKEDITOR.htmlParser.element=function(a,d){this.name=a;this.attributes=d||{};this.children=[];var b=a||"",c=b.match(/^cke:(.*)/);c&&(b=c[1]);b=!!(CKEDITOR.dtd.$nonBodyContent[b]||CKEDITOR.dtd.$block[b]||CKEDITOR.dtd.$listItem[b]||CKEDITOR.dtd.$tableContent[b]||CKEDITOR.dtd.$nonEditable[b]||"br"==b);this.isEmpty=!!CKEDITOR.dtd.$empty[a];this.isUnknown=!CKEDITOR.dtd[a];this._={isBlockLike:b,hasInlineStarted:this.isEmpty||!b}};
CKEDITOR.htmlParser.cssStyle=function(a){var d={};((a instanceof CKEDITOR.htmlParser.element?a.attributes.style:a)||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(a,c,e){"font-family"==c&&(e=e.replace(/["']/g,""));d[c.toLowerCase()]=e});return{rules:d,populate:function(a){var c=this.toString();c&&(a instanceof CKEDITOR.dom.element?a.setAttribute("style",c):a instanceof CKEDITOR.htmlParser.element?a.attributes.style=c:a.style=c)},toString:function(){var a=[],c;
for(c in d)d[c]&&a.push(c,":",d[c],";");return a.join("")}}};
(function(){function a(a){return function(b){return b.type==CKEDITOR.NODE_ELEMENT&&("string"==typeof a?b.name==a:b.name in a)}}var d=function(a,b){a=a[0];b=b[0];return a<b?-1:a>b?1:0},b=CKEDITOR.htmlParser.fragment.prototype;CKEDITOR.htmlParser.element.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_ELEMENT,add:b.add,clone:function(){return new CKEDITOR.htmlParser.element(this.name,this.attributes)},filter:function(a,b){var d=this,l,k;b=d.getFilterContext(b);if(b.off)return!0;
if(!d.parent)a.onRoot(b,d);for(;;){l=d.name;if(!(k=a.onElementName(b,l)))return this.remove(),!1;d.name=k;if(!(d=a.onElement(b,d)))return this.remove(),!1;if(d!==this)return this.replaceWith(d),!1;if(d.name==l)break;if(d.type!=CKEDITOR.NODE_ELEMENT)return this.replaceWith(d),!1;if(!d.name)return this.replaceWithChildren(),!1}l=d.attributes;var q,w;for(q in l){for(k=l[q];;)if(w=a.onAttributeName(b,q))if(w!=q)delete l[q],q=w;else break;else{delete l[q];break}w&&(!1===(k=a.onAttribute(b,d,w,k))?delete l[w]:
l[w]=k)}d.isEmpty||this.filterChildren(a,!1,b);return!0},filterChildren:b.filterChildren,writeHtml:function(a,b){b&&this.filter(b);var g=this.name,l=[],k=this.attributes,q,w;a.openTag(g,k);for(q in k)l.push([q,k[q]]);a.sortAttributes&&l.sort(d);q=0;for(w=l.length;q<w;q++)k=l[q],a.attribute(k[0],k[1]);a.openTagClose(g,this.isEmpty);this.writeChildrenHtml(a);this.isEmpty||a.closeTag(g)},writeChildrenHtml:b.writeChildrenHtml,replaceWithChildren:function(){for(var a=this.children,b=a.length;b;)a[--b].insertAfter(this);
this.remove()},forEach:b.forEach,getFirst:function(b){if(!b)return this.children.length?this.children[0]:null;"function"!=typeof b&&(b=a(b));for(var d=0,g=this.children.length;d<g;++d)if(b(this.children[d]))return this.children[d];return null},getHtml:function(){var a=new CKEDITOR.htmlParser.basicWriter;this.writeChildrenHtml(a);return a.getHtml()},setHtml:function(a){a=this.children=CKEDITOR.htmlParser.fragment.fromHtml(a).children;for(var b=0,d=a.length;b<d;++b)a[b].parent=this},getOuterHtml:function(){var a=
new CKEDITOR.htmlParser.basicWriter;this.writeHtml(a);return a.getHtml()},split:function(a){for(var b=this.children.splice(a,this.children.length-a),d=this.clone(),l=0;l<b.length;++l)b[l].parent=d;d.children=b;b[0]&&(b[0].previous=null);0<a&&(this.children[a-1].next=null);this.parent.add(d,this.getIndex()+1);return d},addClass:function(a){if(!this.hasClass(a)){var b=this.attributes["class"]||"";this.attributes["class"]=b+(b?" ":"")+a}},removeClass:function(a){var b=this.attributes["class"];b&&((b=
CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)"+a+"(?:\\s+|$)")," ")))?this.attributes["class"]=b:delete this.attributes["class"])},hasClass:function(a){var b=this.attributes["class"];return b?(new RegExp("(?:^|\\s)"+a+"(?\x3d\\s|$)")).test(b):!1},getFilterContext:function(a){var b=[];a||(a={off:!1,nonEditable:!1,nestedEditable:!1});a.off||"off"!=this.attributes["data-cke-processor"]||b.push("off",!0);a.nonEditable||"false"!=this.attributes.contenteditable?a.nonEditable&&!a.nestedEditable&&
"true"==this.attributes.contenteditable&&b.push("nestedEditable",!0):b.push("nonEditable",!0);if(b.length){a=CKEDITOR.tools.copy(a);for(var d=0;d<b.length;d+=2)a[b[d]]=b[d+1]}return a}},!0)})();
(function(){var a={},d=/{([^}]+)}/g,b=/([\\'])/g,c=/\n/g,e=/\r/g;CKEDITOR.template=function(g){if(a[g])this.output=a[g];else{var l=g.replace(b,"\\$1").replace(c,"\\n").replace(e,"\\r").replace(d,function(a,b){return"',data['"+b+"']\x3d\x3dundefined?'{"+b+"}':data['"+b+"'],'"});this.output=a[g]=Function("data","buffer","return buffer?buffer.push('"+l+"'):['"+l+"'].join('');")}}})();delete CKEDITOR.loadFullCore;CKEDITOR.instances={};CKEDITOR.document=new CKEDITOR.dom.document(document);
CKEDITOR.add=function(a){CKEDITOR.instances[a.name]=a;a.on("focus",function(){CKEDITOR.currentInstance!=a&&(CKEDITOR.currentInstance=a,CKEDITOR.fire("currentInstance"))});a.on("blur",function(){CKEDITOR.currentInstance==a&&(CKEDITOR.currentInstance=null,CKEDITOR.fire("currentInstance"))});CKEDITOR.fire("instance",null,a)};CKEDITOR.remove=function(a){delete CKEDITOR.instances[a.name]};
(function(){var a={};CKEDITOR.addTemplate=function(d,b){var c=a[d];if(c)return c;c={name:d,source:b};CKEDITOR.fire("template",c);return a[d]=new CKEDITOR.template(c.source)};CKEDITOR.getTemplate=function(d){return a[d]}})();(function(){var a=[];CKEDITOR.addCss=function(d){a.push(d)};CKEDITOR.getCss=function(){return a.join("\n")}})();CKEDITOR.on("instanceDestroyed",function(){CKEDITOR.tools.isEmpty(this.instances)&&CKEDITOR.fire("reset")});CKEDITOR.TRISTATE_ON=1;CKEDITOR.TRISTATE_OFF=2;
CKEDITOR.TRISTATE_DISABLED=0;
(function(){CKEDITOR.inline=function(a,d){if(!CKEDITOR.env.isCompatible)return null;a=CKEDITOR.dom.element.get(a);if(a.getEditor())throw'The editor instance "'+a.getEditor().name+'" is already attached to the provided element.';var b=new CKEDITOR.editor(d,a,CKEDITOR.ELEMENT_MODE_INLINE),c=a.is("textarea")?a:null;c?(b.setData(c.getValue(),null,!0),a=CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"'+!!b.readOnly+'" class\x3d"cke_textarea_inline"\x3e'+c.getValue()+"\x3c/div\x3e",CKEDITOR.document),
a.insertAfter(c),c.hide(),c.$.form&&b._attachToForm()):b.setData(a.getHtml(),null,!0);b.on("loaded",function(){b.fire("uiReady");b.editable(a);b.container=a;b.ui.contentsElement=a;b.setData(b.getData(1));b.resetDirty();b.fire("contentDom");b.mode="wysiwyg";b.fire("mode");b.status="ready";b.fireOnce("instanceReady");CKEDITOR.fire("instanceReady",null,b)},null,null,1E4);b.on("destroy",function(){c&&(b.container.clearCustomData(),b.container.remove(),c.show());b.element.clearCustomData();delete b.element});
return b};CKEDITOR.inlineAll=function(){var a,d,b;for(b in CKEDITOR.dtd.$editable)for(var c=CKEDITOR.document.getElementsByTag(b),e=0,g=c.count();e<g;e++)a=c.getItem(e),"true"==a.getAttribute("contenteditable")&&(d={element:a,config:{}},!1!==CKEDITOR.fire("inline",d)&&CKEDITOR.inline(a,d.config))};CKEDITOR.domReady(function(){!CKEDITOR.disableAutoInline&&CKEDITOR.inlineAll()})})();CKEDITOR.replaceClass="ckeditor";
(function(){function a(a,e,g,l){if(!CKEDITOR.env.isCompatible)return null;a=CKEDITOR.dom.element.get(a);if(a.getEditor())throw'The editor instance "'+a.getEditor().name+'" is already attached to the provided element.';var k=new CKEDITOR.editor(e,a,l);l==CKEDITOR.ELEMENT_MODE_REPLACE&&(a.setStyle("visibility","hidden"),k._.required=a.hasAttribute("required"),a.removeAttribute("required"));g&&k.setData(g,null,!0);k.on("loaded",function(){b(k);l==CKEDITOR.ELEMENT_MODE_REPLACE&&k.config.autoUpdateElement&&
a.$.form&&k._attachToForm();k.setMode(k.config.startupMode,function(){k.resetDirty();k.status="ready";k.fireOnce("instanceReady");CKEDITOR.fire("instanceReady",null,k)})});k.on("destroy",d);return k}function d(){var a=this.container,b=this.element;a&&(a.clearCustomData(),a.remove());b&&(b.clearCustomData(),this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE&&(b.show(),this._.required&&b.setAttribute("required","required")),delete this.element)}function b(a){var b=a.name,d=a.element,l=a.elementMode,k=
a.fire("uiSpace",{space:"top",html:""}).html,q=a.fire("uiSpace",{space:"bottom",html:""}).html,w=new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} '+CKEDITOR.env.cssClass+'"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"'+(a.title?' aria-labelledby\x3d"cke_{name}_arialbl"':"")+"\x3e"+(a.title?'\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e':"")+'\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
b=CKEDITOR.dom.element.createFromHtml(w.output({id:a.id,name:b,langDir:a.lang.dir,langCode:a.langCode,voiceLabel:a.title,topHtml:k?'\x3cspan id\x3d"'+a.ui.spaceId("top")+'" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e'+k+"\x3c/span\x3e":"",contentId:a.ui.spaceId("contents"),bottomHtml:q?'\x3cspan id\x3d"'+a.ui.spaceId("bottom")+'" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e'+q+"\x3c/span\x3e":"",outerEl:CKEDITOR.env.ie?"span":"div"}));l==CKEDITOR.ELEMENT_MODE_REPLACE?
(d.hide(),b.insertAfter(d)):d.append(b);a.container=b;a.ui.contentsElement=a.ui.space("contents");k&&a.ui.space("top").unselectable();q&&a.ui.space("bottom").unselectable();d=a.config.width;l=a.config.height;d&&b.setStyle("width",CKEDITOR.tools.cssLength(d));l&&a.ui.space("contents").setStyle("height",CKEDITOR.tools.cssLength(l));b.disableContextMenu();CKEDITOR.env.webkit&&b.on("focus",function(){a.focus()});a.fireOnce("uiReady")}CKEDITOR.replace=function(b,d){return a(b,d,null,CKEDITOR.ELEMENT_MODE_REPLACE)};
CKEDITOR.appendTo=function(b,d,g){return a(b,d,g,CKEDITOR.ELEMENT_MODE_APPENDTO)};CKEDITOR.replaceAll=function(){for(var a=document.getElementsByTagName("textarea"),b=0;b<a.length;b++){var d=null,l=a[b];if(l.name||l.id){if("string"==typeof arguments[0]){if(!(new RegExp("(?:^|\\s)"+arguments[0]+"(?:$|\\s)")).test(l.className))continue}else if("function"==typeof arguments[0]&&(d={},!1===arguments[0](l,d)))continue;this.replace(l,d)}}};CKEDITOR.editor.prototype.addMode=function(a,b){(this._.modes||(this._.modes=
{}))[a]=b};CKEDITOR.editor.prototype.setMode=function(a,b){var d=this,l=this._.modes;if(a!=d.mode&&l&&l[a]){d.fire("beforeSetMode",a);if(d.mode){var k=d.checkDirty(),l=d._.previousModeData,q,w=0;d.fire("beforeModeUnload");d.editable(0);d._.previousMode=d.mode;d._.previousModeData=q=d.getData(1);"source"==d.mode&&l==q&&(d.fire("lockSnapshot",{forceUpdate:!0}),w=1);d.ui.space("contents").setHtml("");d.mode=""}else d._.previousModeData=d.getData(1);this._.modes[a](function(){d.mode=a;void 0!==k&&!k&&
d.resetDirty();w?d.fire("unlockSnapshot"):"wysiwyg"==a&&d.fire("saveSnapshot");setTimeout(function(){d.fire("mode");b&&b.call(d)},0)})}};CKEDITOR.editor.prototype.resize=function(a,b,d,l){var k=this.container,q=this.ui.space("contents"),w=CKEDITOR.env.webkit&&this.document&&this.document.getWindow().$.frameElement;l=l?this.container.getFirst(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_inner")}):k;l.setSize("width",a,!0);w&&(w.style.width="1%");var f=(l.$.offsetHeight||0)-(q.$.clientHeight||
0),k=Math.max(b-(d?0:f),0);b=d?b+f:b;q.setStyle("height",k+"px");w&&(w.style.width="100%");this.fire("resize",{outerHeight:b,contentsHeight:k,outerWidth:a||l.getSize("width")})};CKEDITOR.editor.prototype.getResizable=function(a){return a?this.ui.space("contents"):this.container};CKEDITOR.domReady(function(){CKEDITOR.replaceClass&&CKEDITOR.replaceAll(CKEDITOR.replaceClass)})})();CKEDITOR.config.startupMode="wysiwyg";
(function(){function a(a){var b=a.editor,e=a.data.path,m=e.blockLimit,f=a.data.selection,g=f.getRanges()[0],E;if(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller)if(f=d(f,e))f.appendBogus(),E=CKEDITOR.env.ie;l(b,e.block,m)&&g.collapsed&&!g.getCommonAncestor().isReadOnly()&&(e=g.clone(),e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS),m=new CKEDITOR.dom.walker(e),m.guard=function(a){return!c(a)||a.type==CKEDITOR.NODE_COMMENT||a.isReadOnly()},!m.checkForward()||e.checkStartOfBlock()&&e.checkEndOfBlock())&&
(b=g.fixBlock(!0,b.activeEnterMode==CKEDITOR.ENTER_DIV?"div":"p"),CKEDITOR.env.needsBrFiller||(b=b.getFirst(c))&&b.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/)&&b.remove(),E=1,a.cancel());E&&g.select()}function d(a,b){if(a.isFake)return 0;var d=b.block||b.blockLimit,e=d&&d.getLast(c);if(!(!d||!d.isBlockBoundary()||e&&e.type==CKEDITOR.NODE_ELEMENT&&e.isBlockBoundary()||d.is("pre")||d.getBogus()))return d}function b(a){var b=a.data.getTarget();b.is("input")&&
(b=b.getAttribute("type"),"submit"!=b&&"reset"!=b||a.data.preventDefault())}function c(a){return f(a)&&y(a)}function e(a,b){return function(c){var d=c.data.$.toElement||c.data.$.fromElement||c.data.$.relatedTarget;(d=d&&d.nodeType==CKEDITOR.NODE_ELEMENT?new CKEDITOR.dom.element(d):null)&&(b.equals(d)||b.contains(d))||a.call(this,c)}}function g(a){function b(a){return function(b,h){h&&b.type==CKEDITOR.NODE_ELEMENT&&b.is(f)&&(d=b);if(!(h||!c(b)||a&&t(b)))return!1}}var d,e=a.getRanges()[0];a=a.root;
var f={table:1,ul:1,ol:1,dl:1};if(e.startPath().contains(f)){var g=e.clone();g.collapse(1);g.setStartAt(a,CKEDITOR.POSITION_AFTER_START);a=new CKEDITOR.dom.walker(g);a.guard=b();a.checkBackward();if(d)return g=e.clone(),g.collapse(),g.setEndAt(d,CKEDITOR.POSITION_AFTER_END),a=new CKEDITOR.dom.walker(g),a.guard=b(!0),d=!1,a.checkForward(),d}return null}function l(a,b,c){return!1!==a.config.autoParagraph&&a.activeEnterMode!=CKEDITOR.ENTER_BR&&(a.editable().equals(c)&&!b||b&&"true"==b.getAttribute("contenteditable"))}
function k(a){return a.activeEnterMode!=CKEDITOR.ENTER_BR&&!1!==a.config.autoParagraph?a.activeEnterMode==CKEDITOR.ENTER_DIV?"div":"p":!1}function q(a){var b=a.editor;b.getSelection().scrollIntoView();setTimeout(function(){b.fire("saveSnapshot")},0)}function w(a,b,c){var d=a.getCommonAncestor(b);for(b=a=c?b:a;(a=a.getParent())&&!d.equals(a)&&1==a.getChildCount();)b=a;b.remove()}var f,y,A,t,D,p,x,G,u;CKEDITOR.editable=CKEDITOR.tools.createClass({base:CKEDITOR.dom.element,$:function(a,b){this.base(b.$||
b);this.editor=a;this.status="unloaded";this.hasFocus=!1;this.setup()},proto:{focus:function(){var a;if(CKEDITOR.env.webkit&&!this.hasFocus&&(a=this.editor._.previousActive||this.getDocument().getActive(),this.contains(a))){a.focus();return}try{this.$[CKEDITOR.env.ie&&this.getDocument().equals(CKEDITOR.document)?"setActive":"focus"]()}catch(b){if(!CKEDITOR.env.ie)throw b;}CKEDITOR.env.safari&&!this.isInline()&&(a=CKEDITOR.document.getActive(),a.equals(this.getWindow().getFrame())||this.getWindow().focus())},
on:function(a,b){var c=Array.prototype.slice.call(arguments,0);CKEDITOR.env.ie&&/^focus|blur$/.exec(a)&&(a="focus"==a?"focusin":"focusout",b=e(b,this),c[0]=a,c[1]=b);return CKEDITOR.dom.element.prototype.on.apply(this,c)},attachListener:function(a){!this._.listeners&&(this._.listeners=[]);var b=Array.prototype.slice.call(arguments,1),b=a.on.apply(a,b);this._.listeners.push(b);return b},clearListeners:function(){var a=this._.listeners;try{for(;a.length;)a.pop().removeListener()}catch(b){}},restoreAttrs:function(){var a=
this._.attrChanges,b,c;for(c in a)a.hasOwnProperty(c)&&(b=a[c],null!==b?this.setAttribute(c,b):this.removeAttribute(c))},attachClass:function(a){var b=this.getCustomData("classes");this.hasClass(a)||(!b&&(b=[]),b.push(a),this.setCustomData("classes",b),this.addClass(a))},changeAttr:function(a,b){var c=this.getAttribute(a);b!==c&&(!this._.attrChanges&&(this._.attrChanges={}),a in this._.attrChanges||(this._.attrChanges[a]=c),this.setAttribute(a,b))},insertText:function(a){this.editor.focus();this.insertHtml(this.transformPlainTextToHtml(a),
"text")},transformPlainTextToHtml:function(a){var b=this.editor.getSelection().getStartElement().hasAscendant("pre",!0)?CKEDITOR.ENTER_BR:this.editor.activeEnterMode;return CKEDITOR.tools.transformPlainTextToHtml(a,b)},insertHtml:function(a,b,c){var d=this.editor;d.focus();d.fire("saveSnapshot");c||(c=d.getSelection().getRanges()[0]);p(this,b||"html",a,c);c.select();q(this);this.editor.fire("afterInsertHtml",{})},insertHtmlIntoRange:function(a,b,c){p(this,c||"html",a,b);this.editor.fire("afterInsertHtml",
{intoRange:b})},insertElement:function(a,b){var d=this.editor;d.focus();d.fire("saveSnapshot");var e=d.activeEnterMode,d=d.getSelection(),f=a.getName(),f=CKEDITOR.dtd.$block[f];b||(b=d.getRanges()[0]);this.insertElementIntoRange(a,b)&&(b.moveToPosition(a,CKEDITOR.POSITION_AFTER_END),f&&((f=a.getNext(function(a){return c(a)&&!t(a)}))&&f.type==CKEDITOR.NODE_ELEMENT&&f.is(CKEDITOR.dtd.$block)?f.getDtd()["#"]?b.moveToElementEditStart(f):b.moveToElementEditEnd(a):f||e==CKEDITOR.ENTER_BR||(f=b.fixBlock(!0,
e==CKEDITOR.ENTER_DIV?"div":"p"),b.moveToElementEditStart(f))));d.selectRanges([b]);q(this)},insertElementIntoSelection:function(a){this.insertElement(a)},insertElementIntoRange:function(a,b){var c=this.editor,d=c.config.enterMode,e=a.getName(),f=CKEDITOR.dtd.$block[e];if(b.checkReadOnly())return!1;b.deleteContents(1);b.startContainer.type==CKEDITOR.NODE_ELEMENT&&b.startContainer.is({tr:1,table:1,tbody:1,thead:1,tfoot:1})&&x(b);var g,l;if(f)for(;(g=b.getCommonAncestor(0,1))&&(l=CKEDITOR.dtd[g.getName()])&&
(!l||!l[e]);)g.getName()in CKEDITOR.dtd.span?b.splitElement(g):b.checkStartOfBlock()&&b.checkEndOfBlock()?(b.setStartBefore(g),b.collapse(!0),g.remove()):b.splitBlock(d==CKEDITOR.ENTER_DIV?"div":"p",c.editable());b.insertNode(a);return!0},setData:function(a,b){b||(a=this.editor.dataProcessor.toHtml(a));this.setHtml(a);this.fixInitialSelection();"unloaded"==this.status&&(this.status="ready");this.editor.fire("dataReady")},getData:function(a){var b=this.getHtml();a||(b=this.editor.dataProcessor.toDataFormat(b));
return b},setReadOnly:function(a){this.setAttribute("contenteditable",!a)},detach:function(){this.removeClass("cke_editable");this.status="detached";var a=this.editor;this._.detach();delete a.document;delete a.window},isInline:function(){return this.getDocument().equals(CKEDITOR.document)},fixInitialSelection:function(){function a(){var b=c.getDocument().$,d=b.getSelection(),h;a:if(d.anchorNode&&d.anchorNode==c.$)h=!0;else{if(CKEDITOR.env.webkit&&(h=c.getDocument().getActive())&&h.equals(c)&&!d.anchorNode){h=
!0;break a}h=void 0}h&&(h=new CKEDITOR.dom.range(c),h.moveToElementEditStart(c),b=b.createRange(),b.setStart(h.startContainer.$,h.startOffset),b.collapse(!0),d.removeAllRanges(),d.addRange(b))}function b(){var a=c.getDocument().$,d=a.selection,h=c.getDocument().getActive();"None"==d.type&&h.equals(c)&&(d=new CKEDITOR.dom.range(c),a=a.body.createTextRange(),d.moveToElementEditStart(c),d=d.startContainer,d.type!=CKEDITOR.NODE_ELEMENT&&(d=d.getParent()),a.moveToElementText(d.$),a.collapse(!0),a.select())}
var c=this;if(CKEDITOR.env.ie&&(9>CKEDITOR.env.version||CKEDITOR.env.quirks))this.hasFocus&&(this.focus(),b());else if(this.hasFocus)this.focus(),a();else this.once("focus",function(){a()},null,null,-999)},getHtmlFromRange:function(a){if(a.collapsed)return new CKEDITOR.dom.documentFragment(a.document);a={doc:this.getDocument(),range:a.clone()};G.eol.detect(a,this);G.bogus.exclude(a);G.cell.shrink(a);a.fragment=a.range.cloneContents();G.tree.rebuild(a,this);G.eol.fix(a,this);return new CKEDITOR.dom.documentFragment(a.fragment.$)},
extractHtmlFromRange:function(a,b){var c=u,d={range:a,doc:a.document},e=this.getHtmlFromRange(a);if(a.collapsed)return a.optimize(),e;a.enlarge(CKEDITOR.ENLARGE_INLINE,1);c.table.detectPurge(d);d.bookmark=a.createBookmark();delete d.range;var f=this.editor.createRange();f.moveToPosition(d.bookmark.startNode,CKEDITOR.POSITION_BEFORE_START);d.targetBookmark=f.createBookmark();c.list.detectMerge(d,this);c.table.detectRanges(d,this);c.block.detectMerge(d,this);d.tableContentsRanges?(c.table.deleteRanges(d),
a.moveToBookmark(d.bookmark),d.range=a):(a.moveToBookmark(d.bookmark),d.range=a,a.extractContents(c.detectExtractMerge(d)));a.moveToBookmark(d.targetBookmark);a.optimize();c.fixUneditableRangePosition(a);c.list.merge(d,this);c.table.purge(d,this);c.block.merge(d,this);if(b){c=a.startPath();if(d=a.checkStartOfBlock()&&a.checkEndOfBlock()&&c.block&&!a.root.equals(c.block)){a:{var d=c.block.getElementsByTag("span"),f=0,g;if(d)for(;g=d.getItem(f++);)if(!y(g)){d=!0;break a}d=!1}d=!d}d&&(a.moveToPosition(c.block,
CKEDITOR.POSITION_BEFORE_START),c.block.remove())}else c.autoParagraph(this.editor,a),A(a.startContainer)&&a.startContainer.appendBogus();a.startContainer.mergeSiblings();return e},setup:function(){var a=this.editor;this.attachListener(a,"beforeGetData",function(){var b=this.getData();this.is("textarea")||!1!==a.config.ignoreEmptyParagraph&&(b=b.replace(D,function(a,b){return b}));a.setData(b,null,1)},this);this.attachListener(a,"getSnapshot",function(a){a.data=this.getData(1)},this);this.attachListener(a,
"afterSetData",function(){this.setData(a.getData(1))},this);this.attachListener(a,"loadSnapshot",function(a){this.setData(a.data,1)},this);this.attachListener(a,"beforeFocus",function(){var b=a.getSelection();(b=b&&b.getNative())&&"Control"==b.type||this.focus()},this);this.attachListener(a,"insertHtml",function(a){this.insertHtml(a.data.dataValue,a.data.mode,a.data.range)},this);this.attachListener(a,"insertElement",function(a){this.insertElement(a.data)},this);this.attachListener(a,"insertText",
function(a){this.insertText(a.data)},this);this.setReadOnly(a.readOnly);this.attachClass("cke_editable");a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?this.attachClass("cke_editable_inline"):a.elementMode!=CKEDITOR.ELEMENT_MODE_REPLACE&&a.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO||this.attachClass("cke_editable_themed");this.attachClass("cke_contents_"+a.config.contentsLangDirection);a.keystrokeHandler.blockedKeystrokes[8]=+a.readOnly;a.keystrokeHandler.attach(this);this.on("blur",function(){this.hasFocus=
!1},null,null,-1);this.on("focus",function(){this.hasFocus=!0},null,null,-1);a.focusManager.add(this);this.equals(CKEDITOR.document.getActive())&&(this.hasFocus=!0,a.once("contentDom",function(){a.focusManager.focus(this)},this));this.isInline()&&this.changeAttr("tabindex",a.tabIndex);if(!this.is("textarea")){a.document=this.getDocument();a.window=this.getWindow();var d=a.document;this.changeAttr("spellcheck",!a.config.disableNativeSpellChecker);var e=a.config.contentsLangDirection;this.getDirection(1)!=
e&&this.changeAttr("dir",e);var m=CKEDITOR.getCss();if(m){var e=d.getHead(),l=e.getCustomData("stylesheet");l?m!=l.getText()&&(CKEDITOR.env.ie&&9>CKEDITOR.env.version?l.$.styleSheet.cssText=m:l.setText(m)):(m=d.appendStyleText(m),m=new CKEDITOR.dom.element(m.ownerNode||m.owningElement),e.setCustomData("stylesheet",m),m.data("cke-temp",1))}e=d.getCustomData("stylesheet_ref")||0;d.setCustomData("stylesheet_ref",e+1);this.setCustomData("cke_includeReadonly",!a.config.disableReadonlyStyling);this.attachListener(this,
"click",function(a){a=a.data;var b=(new CKEDITOR.dom.elementPath(a.getTarget(),this)).contains("a");b&&2!=a.$.button&&b.isReadOnly()&&a.preventDefault()});var k={8:1,46:1};this.attachListener(a,"key",function(b){if(a.readOnly)return!0;var c=b.data.domEvent.getKey(),d;if(c in k){b=a.getSelection();var h,e=b.getRanges()[0],m=e.startPath(),n,l,z,c=8==c;CKEDITOR.env.ie&&11>CKEDITOR.env.version&&(h=b.getSelectedElement())||(h=g(b))?(a.fire("saveSnapshot"),e.moveToPosition(h,CKEDITOR.POSITION_BEFORE_START),
h.remove(),e.select(),a.fire("saveSnapshot"),d=1):e.collapsed&&((n=m.block)&&(z=n[c?"getPrevious":"getNext"](f))&&z.type==CKEDITOR.NODE_ELEMENT&&z.is("table")&&e[c?"checkStartOfBlock":"checkEndOfBlock"]()?(a.fire("saveSnapshot"),e[c?"checkEndOfBlock":"checkStartOfBlock"]()&&n.remove(),e["moveToElementEdit"+(c?"End":"Start")](z),e.select(),a.fire("saveSnapshot"),d=1):m.blockLimit&&m.blockLimit.is("td")&&(l=m.blockLimit.getAscendant("table"))&&e.checkBoundaryOfElement(l,c?CKEDITOR.START:CKEDITOR.END)&&
(z=l[c?"getPrevious":"getNext"](f))?(a.fire("saveSnapshot"),e["moveToElementEdit"+(c?"End":"Start")](z),e.checkStartOfBlock()&&e.checkEndOfBlock()?z.remove():e.select(),a.fire("saveSnapshot"),d=1):(l=m.contains(["td","th","caption"]))&&e.checkBoundaryOfElement(l,c?CKEDITOR.START:CKEDITOR.END)&&(d=1))}return!d});a.blockless&&CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller&&this.attachListener(this,"keyup",function(b){b.data.getKeystroke()in k&&!this.getFirst(c)&&(this.appendBogus(),b=a.createRange(),b.moveToPosition(this,
CKEDITOR.POSITION_AFTER_START),b.select())});this.attachListener(this,"dblclick",function(b){if(a.readOnly)return!1;b={element:b.data.getTarget()};a.fire("doubleclick",b)});CKEDITOR.env.ie&&this.attachListener(this,"click",b);CKEDITOR.env.ie&&!CKEDITOR.env.edge||this.attachListener(this,"mousedown",function(b){var c=b.data.getTarget();c.is("img","hr","input","textarea","select")&&!c.isReadOnly()&&(a.getSelection().selectElement(c),c.is("input","textarea","select")&&b.data.preventDefault())});CKEDITOR.env.edge&&
this.attachListener(this,"mouseup",function(b){(b=b.data.getTarget())&&b.is("img")&&a.getSelection().selectElement(b)});CKEDITOR.env.gecko&&this.attachListener(this,"mouseup",function(b){if(2==b.data.$.button&&(b=b.data.getTarget(),!b.getOuterHtml().replace(D,""))){var c=a.createRange();c.moveToElementEditStart(b);c.select(!0)}});CKEDITOR.env.webkit&&(this.attachListener(this,"click",function(a){a.data.getTarget().is("input","select")&&a.data.preventDefault()}),this.attachListener(this,"mouseup",
function(a){a.data.getTarget().is("input","textarea")&&a.data.preventDefault()}));CKEDITOR.env.webkit&&this.attachListener(a,"key",function(b){if(a.readOnly)return!0;b=b.data.domEvent.getKey();if(b in k){var c=8==b,d=a.getSelection().getRanges()[0];b=d.startPath();if(d.collapsed)a:{var h=b.block;if(h&&d[c?"checkStartOfBlock":"checkEndOfBlock"]()&&d.moveToClosestEditablePosition(h,!c)&&d.collapsed){if(d.startContainer.type==CKEDITOR.NODE_ELEMENT){var e=d.startContainer.getChild(d.startOffset-(c?1:
0));if(e&&e.type==CKEDITOR.NODE_ELEMENT&&e.is("hr")){a.fire("saveSnapshot");e.remove();b=!0;break a}}d=d.startPath().block;if(!d||d&&d.contains(h))b=void 0;else{a.fire("saveSnapshot");var f;(f=(c?d:h).getBogus())&&f.remove();f=a.getSelection();e=f.createBookmarks();(c?h:d).moveChildren(c?d:h,!1);b.lastElement.mergeSiblings();w(h,d,!c);f.selectBookmarks(e);b=!0}}else b=!1}else c=d,f=b.block,d=c.endPath().block,f&&d&&!f.equals(d)?(a.fire("saveSnapshot"),(h=f.getBogus())&&h.remove(),c.enlarge(CKEDITOR.ENLARGE_INLINE),
c.deleteContents(),d.getParent()&&(d.moveChildren(f,!1),b.lastElement.mergeSiblings(),w(f,d,!0)),c=a.getSelection().getRanges()[0],c.collapse(1),c.optimize(),""===c.startContainer.getHtml()&&c.startContainer.appendBogus(),c.select(),b=!0):b=!1;if(!b)return;a.getSelection().scrollIntoView();a.fire("saveSnapshot");return!1}},this,null,100)}}},_:{detach:function(){this.editor.setData(this.editor.getData(),0,1);this.clearListeners();this.restoreAttrs();var a;if(a=this.removeCustomData("classes"))for(;a.length;)this.removeClass(a.pop());
if(!this.is("textarea")){a=this.getDocument();var b=a.getHead();if(b.getCustomData("stylesheet")){var c=a.getCustomData("stylesheet_ref");--c?a.setCustomData("stylesheet_ref",c):(a.removeCustomData("stylesheet_ref"),b.removeCustomData("stylesheet").remove())}}this.editor.fire("contentDomUnload");delete this.editor}}});CKEDITOR.editor.prototype.editable=function(a){var b=this._.editable;if(b&&a)return 0;arguments.length&&(b=this._.editable=a?a instanceof CKEDITOR.editable?a:new CKEDITOR.editable(this,
a):(b&&b.detach(),null));return b};CKEDITOR.on("instanceLoaded",function(b){var c=b.editor;c.on("insertElement",function(a){a=a.data;a.type==CKEDITOR.NODE_ELEMENT&&(a.is("input")||a.is("textarea"))&&("false"!=a.getAttribute("contentEditable")&&a.data("cke-editable",a.hasAttribute("contenteditable")?"true":"1"),a.setAttribute("contentEditable",!1))});c.on("selectionChange",function(b){if(!c.readOnly){var d=c.getSelection();d&&!d.isLocked&&(d=c.checkDirty(),c.fire("lockSnapshot"),a(b),c.fire("unlockSnapshot"),
!d&&c.resetDirty())}})});CKEDITOR.on("instanceCreated",function(a){var b=a.editor;b.on("mode",function(){var a=b.editable();if(a&&a.isInline()){var c=b.title;a.changeAttr("role","textbox");a.changeAttr("aria-label",c);c&&a.changeAttr("title",c);var d=b.fire("ariaEditorHelpLabel",{}).label;if(d&&(c=this.ui.space(this.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?"top":"contents"))){var e=CKEDITOR.tools.getNextId(),d=CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"'+e+'" class\x3d"cke_voice_label"\x3e'+
d+"\x3c/span\x3e");c.append(d);a.changeAttr("aria-describedby",e)}}})});CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");f=CKEDITOR.dom.walker.whitespaces(!0);y=CKEDITOR.dom.walker.bookmark(!1,!0);A=CKEDITOR.dom.walker.empty();t=CKEDITOR.dom.walker.bogus();D=/(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;p=function(){function a(b){return b.type==
CKEDITOR.NODE_ELEMENT}function b(c,d){var e,f,m,n,g=[],l=d.range.startContainer;e=d.range.startPath();for(var l=C[l.getName()],z=0,k=c.getChildren(),E=k.count(),B=-1,p=-1,q=0,w=e.contains(C.$list);z<E;++z)e=k.getItem(z),a(e)?(m=e.getName(),w&&m in CKEDITOR.dtd.$list?g=g.concat(b(e,d)):(n=!!l[m],"br"!=m||!e.data("cke-eol")||z&&z!=E-1||(q=(f=z?g[z-1].node:k.getItem(z+1))&&(!a(f)||!f.is("br")),f=f&&a(f)&&C.$block[f.getName()]),-1!=B||n||(B=z),n||(p=z),g.push({isElement:1,isLineBreak:q,isBlock:e.isBlockBoundary(),
hasBlockSibling:f,node:e,name:m,allowed:n}),f=q=0)):g.push({isElement:0,node:e,allowed:1});-1<B&&(g[B].firstNotAllowed=1);-1<p&&(g[p].lastNotAllowed=1);return g}function d(b,c){var e=[],h=b.getChildren(),f=h.count(),m,g=0,l=C[c],z=!b.is(C.$inline)||b.is("br");for(z&&e.push(" ");g<f;g++)m=h.getItem(g),a(m)&&!m.is(l)?e=e.concat(d(m,c)):e.push(m);z&&e.push(" ");return e}function e(b){return a(b.startContainer)&&b.startContainer.getChild(b.startOffset-1)}function f(b){return b&&a(b)&&(b.is(C.$removeEmpty)||
b.is("a")&&!b.isBlockBoundary())}function g(b,c,d,e){var h=b.clone(),f,m;h.setEndAt(c,CKEDITOR.POSITION_BEFORE_END);(f=(new CKEDITOR.dom.walker(h)).next())&&a(f)&&p[f.getName()]&&(m=f.getPrevious())&&a(m)&&!m.getParent().equals(b.startContainer)&&d.contains(m)&&e.contains(f)&&f.isIdentical(m)&&(f.moveChildren(m),f.remove(),g(b,c,d,e))}function E(b,c){function d(b,c){if(c.isBlock&&c.isElement&&!c.node.is("br")&&a(b)&&b.is("br"))return b.remove(),1}var e=c.endContainer.getChild(c.endOffset),h=c.endContainer.getChild(c.endOffset-
1);e&&d(e,b[b.length-1]);h&&d(h,b[0])&&(c.setEnd(c.endContainer,c.endOffset-1),c.collapse())}var C=CKEDITOR.dtd,p={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ul:1,ol:1,li:1,pre:1,dl:1,blockquote:1},q={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},w=CKEDITOR.tools.extend({},C.$inline);delete w.br;return function(p,v,I,J){var F=p.editor,L=!1;"unfiltered_html"==v&&(v="html",L=!0);if(!J.checkReadOnly()){var K=(new CKEDITOR.dom.elementPath(J.startContainer,J.root)).blockLimit||J.root;p={type:v,dontFilter:L,editable:p,
editor:F,range:J,blockLimit:K,mergeCandidates:[],zombies:[]};v=p.range;J=p.mergeCandidates;var H,t;"text"==p.type&&v.shrink(CKEDITOR.SHRINK_ELEMENT,!0,!1)&&(H=CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e",v.document),v.insertNode(H),v.setStartAfter(H));L=new CKEDITOR.dom.elementPath(v.startContainer);p.endPath=K=new CKEDITOR.dom.elementPath(v.endContainer);if(!v.collapsed){var F=K.block||K.blockLimit,x=v.getCommonAncestor();F&&!F.equals(x)&&!F.contains(x)&&v.checkEndOfBlock()&&
p.zombies.push(F);v.deleteContents()}for(;(t=e(v))&&a(t)&&t.isBlockBoundary()&&L.contains(t);)v.moveToPosition(t,CKEDITOR.POSITION_BEFORE_END);g(v,p.blockLimit,L,K);H&&(v.setEndBefore(H),v.collapse(),H.remove());H=v.startPath();if(F=H.contains(f,!1,1))v.splitElement(F),p.inlineStylesRoot=F,p.inlineStylesPeak=H.lastElement;H=v.createBookmark();(F=H.startNode.getPrevious(c))&&a(F)&&f(F)&&J.push(F);(F=H.startNode.getNext(c))&&a(F)&&f(F)&&J.push(F);for(F=H.startNode;(F=F.getParent())&&f(F);)J.push(F);
v.moveToBookmark(H);if(H=I){H=p.range;if("text"==p.type&&p.inlineStylesRoot){t=p.inlineStylesPeak;v=t.getDocument().createText("{cke-peak}");for(J=p.inlineStylesRoot.getParent();!t.equals(J);)v=v.appendTo(t.clone()),t=t.getParent();I=v.getOuterHtml().split("{cke-peak}").join(I)}t=p.blockLimit.getName();if(/^\s+|\s+$/.test(I)&&"span"in CKEDITOR.dtd[t]){var A='\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';I=A+I+A}I=p.editor.dataProcessor.toHtml(I,{context:null,fixForBody:!1,protectedWhitespaces:!!A,
dontFilter:p.dontFilter,filter:p.editor.activeFilter,enterMode:p.editor.activeEnterMode});t=H.document.createElement("body");t.setHtml(I);A&&(t.getFirst().remove(),t.getLast().remove());if((A=H.startPath().block)&&(1!=A.getChildCount()||!A.getBogus()))a:{var y;if(1==t.getChildCount()&&a(y=t.getFirst())&&y.is(q)&&!y.hasAttribute("contenteditable")){A=y.getElementsByTag("*");H=0;for(J=A.count();H<J;H++)if(v=A.getItem(H),!v.is(w))break a;y.moveChildren(y.getParent(1));y.remove()}}p.dataWrapper=t;H=I}if(H){y=
p.range;H=y.document;var u;t=p.blockLimit;J=0;var D,A=[],M,G;I=F=0;var P,W;v=y.startContainer;var L=p.endPath.elements[0],X,K=L.getPosition(v),x=!!L.getCommonAncestor(v)&&K!=CKEDITOR.POSITION_IDENTICAL&&!(K&CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED);v=b(p.dataWrapper,p);for(E(v,y);J<v.length;J++){K=v[J];if(u=K.isLineBreak){u=y;P=t;var S=void 0,aa=void 0;K.hasBlockSibling?u=1:(S=u.startContainer.getAscendant(C.$block,1))&&S.is({div:1,p:1})?(aa=S.getPosition(P),aa==CKEDITOR.POSITION_IDENTICAL||
aa==CKEDITOR.POSITION_CONTAINS?u=0:(P=u.splitElement(S),u.moveToPosition(P,CKEDITOR.POSITION_AFTER_START),u=1)):u=0}if(u)I=0<J;else{u=y.startPath();!K.isBlock&&l(p.editor,u.block,u.blockLimit)&&(G=k(p.editor))&&(G=H.createElement(G),G.appendBogus(),y.insertNode(G),CKEDITOR.env.needsBrFiller&&(D=G.getBogus())&&D.remove(),y.moveToPosition(G,CKEDITOR.POSITION_BEFORE_END));if((u=y.startPath().block)&&!u.equals(M)){if(D=u.getBogus())D.remove(),A.push(u);M=u}K.firstNotAllowed&&(F=1);if(F&&K.isElement){u=
y.startContainer;for(P=null;u&&!C[u.getName()][K.name];){if(u.equals(t)){u=null;break}P=u;u=u.getParent()}if(u)P&&(W=y.splitElement(P),p.zombies.push(W),p.zombies.push(P));else{P=t.getName();X=!J;u=J==v.length-1;P=d(K.node,P);for(var S=[],aa=P.length,ca=0,ea=void 0,Y=0,U=-1;ca<aa;ca++)ea=P[ca]," "==ea?(Y||X&&!ca||(S.push(new CKEDITOR.dom.text(" ")),U=S.length),Y=1):(S.push(ea),Y=0);u&&U==S.length&&S.pop();X=S}}if(X){for(;u=X.pop();)y.insertNode(u);X=0}else y.insertNode(K.node);K.lastNotAllowed&&J<
v.length-1&&((W=x?L:W)&&y.setEndAt(W,CKEDITOR.POSITION_AFTER_START),F=0);y.collapse()}}1!=v.length?D=!1:(D=v[0],D=D.isElement&&"false"==D.node.getAttribute("contenteditable"));D&&(I=!0,u=v[0].node,y.setStartAt(u,CKEDITOR.POSITION_BEFORE_START),y.setEndAt(u,CKEDITOR.POSITION_AFTER_END));p.dontMoveCaret=I;p.bogusNeededBlocks=A}D=p.range;var O;W=p.bogusNeededBlocks;for(X=D.createBookmark();M=p.zombies.pop();)M.getParent()&&(G=D.clone(),G.moveToElementEditStart(M),G.removeEmptyBlocksAtEnd());if(W)for(;M=
W.pop();)CKEDITOR.env.needsBrFiller?M.appendBogus():M.append(D.document.createText(" "));for(;M=p.mergeCandidates.pop();)M.mergeSiblings();D.moveToBookmark(X);if(!p.dontMoveCaret){for(M=e(D);M&&a(M)&&!M.is(C.$empty);){if(M.isBlockBoundary())D.moveToPosition(M,CKEDITOR.POSITION_BEFORE_END);else{if(f(M)&&M.getHtml().match(/(\s|&nbsp;)$/g)){O=null;break}O=D.clone();O.moveToPosition(M,CKEDITOR.POSITION_BEFORE_END)}M=M.getLast(c)}O&&D.moveToRange(O)}}}}();x=function(){function a(b){b=new CKEDITOR.dom.walker(b);
b.guard=function(a,b){if(b)return!1;if(a.type==CKEDITOR.NODE_ELEMENT)return a.is(CKEDITOR.dtd.$tableContent)};b.evaluator=function(a){return a.type==CKEDITOR.NODE_ELEMENT};return b}function b(a,c,d){c=a.getDocument().createElement(c);a.append(c,d);return c}function c(a){var b=a.count(),d;for(b;0<b--;)d=a.getItem(b),CKEDITOR.tools.trim(d.getHtml())||(d.appendBogus(),CKEDITOR.env.ie&&9>CKEDITOR.env.version&&d.getChildCount()&&d.getFirst().remove())}return function(d){var e=d.startContainer,f=e.getAscendant("table",
1),g=!1;c(f.getElementsByTag("td"));c(f.getElementsByTag("th"));f=d.clone();f.setStart(e,0);f=a(f).lastBackward();f||(f=d.clone(),f.setEndAt(e,CKEDITOR.POSITION_BEFORE_END),f=a(f).lastForward(),g=!0);f||(f=e);f.is("table")?(d.setStartAt(f,CKEDITOR.POSITION_BEFORE_START),d.collapse(!0),f.remove()):(f.is({tbody:1,thead:1,tfoot:1})&&(f=b(f,"tr",g)),f.is("tr")&&(f=b(f,f.getParent().is("thead")?"th":"td",g)),(e=f.getBogus())&&e.remove(),d.moveToPosition(f,g?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END))}}();
G={eol:{detect:function(a,b){var c=a.range,d=c.clone(),e=c.clone(),f=new CKEDITOR.dom.elementPath(c.startContainer,b),g=new CKEDITOR.dom.elementPath(c.endContainer,b);d.collapse(1);e.collapse();f.block&&d.checkBoundaryOfElement(f.block,CKEDITOR.END)&&(c.setStartAfter(f.block),a.prependEolBr=1);g.block&&e.checkBoundaryOfElement(g.block,CKEDITOR.START)&&(c.setEndBefore(g.block),a.appendEolBr=1)},fix:function(a,b){var c=b.getDocument(),d;a.appendEolBr&&(d=this.createEolBr(c),a.fragment.append(d));!a.prependEolBr||
d&&!d.getPrevious()||a.fragment.append(this.createEolBr(c),1)},createEolBr:function(a){return a.createElement("br",{attributes:{"data-cke-eol":1}})}},bogus:{exclude:function(a){var b=a.range.getBoundaryNodes(),c=b.startNode,b=b.endNode;!b||!t(b)||c&&c.equals(b)||a.range.setEndBefore(b)}},tree:{rebuild:function(a,b){var c=a.range,d=c.getCommonAncestor(),e=new CKEDITOR.dom.elementPath(d,b),f=new CKEDITOR.dom.elementPath(c.startContainer,b),c=new CKEDITOR.dom.elementPath(c.endContainer,b),g;d.type==
CKEDITOR.NODE_TEXT&&(d=d.getParent());if(e.blockLimit.is({tr:1,table:1})){var l=e.contains("table").getParent();g=function(a){return!a.equals(l)}}else if(e.block&&e.block.is(CKEDITOR.dtd.$listItem)&&(f=f.contains(CKEDITOR.dtd.$list),c=c.contains(CKEDITOR.dtd.$list),!f.equals(c))){var k=e.contains(CKEDITOR.dtd.$list).getParent();g=function(a){return!a.equals(k)}}g||(g=function(a){return!a.equals(e.block)&&!a.equals(e.blockLimit)});this.rebuildFragment(a,b,d,g)},rebuildFragment:function(a,b,c,d){for(var e;c&&
!c.equals(b)&&d(c);)e=c.clone(0,1),a.fragment.appendTo(e),a.fragment=e,c=c.getParent()}},cell:{shrink:function(a){a=a.range;var b=a.startContainer,c=a.endContainer,d=a.startOffset,e=a.endOffset;b.type==CKEDITOR.NODE_ELEMENT&&b.equals(c)&&b.is("tr")&&++d==e&&a.shrink(CKEDITOR.SHRINK_TEXT)}}};u=function(){function a(b,c){var d=b.getParent();if(d.is(CKEDITOR.dtd.$inline))b[c?"insertBefore":"insertAfter"](d)}function b(c,d,e){a(d);a(e,1);for(var f;f=e.getNext();)f.insertAfter(d),d=f;A(c)&&c.remove()}
function c(a,b){var d=new CKEDITOR.dom.range(a);d.setStartAfter(b.startNode);d.setEndBefore(b.endNode);return d}return{list:{detectMerge:function(a,b){var d=c(b,a.bookmark),e=d.startPath(),f=d.endPath(),h=e.contains(CKEDITOR.dtd.$list),g=f.contains(CKEDITOR.dtd.$list);a.mergeList=h&&g&&h.getParent().equals(g.getParent())&&!h.equals(g);a.mergeListItems=e.block&&f.block&&e.block.is(CKEDITOR.dtd.$listItem)&&f.block.is(CKEDITOR.dtd.$listItem);if(a.mergeList||a.mergeListItems)d=d.clone(),d.setStartBefore(a.bookmark.startNode),
d.setEndAfter(a.bookmark.endNode),a.mergeListBookmark=d.createBookmark()},merge:function(a,c){if(a.mergeListBookmark){var d=a.mergeListBookmark.startNode,e=a.mergeListBookmark.endNode,f=new CKEDITOR.dom.elementPath(d,c),g=new CKEDITOR.dom.elementPath(e,c);if(a.mergeList){var n=f.contains(CKEDITOR.dtd.$list),l=g.contains(CKEDITOR.dtd.$list);n.equals(l)||(l.moveChildren(n),l.remove())}a.mergeListItems&&(f=f.contains(CKEDITOR.dtd.$listItem),g=g.contains(CKEDITOR.dtd.$listItem),f.equals(g)||b(g,d,e));
d.remove();e.remove()}}},block:{detectMerge:function(a,b){if(!a.tableContentsRanges&&!a.mergeListBookmark){var c=new CKEDITOR.dom.range(b);c.setStartBefore(a.bookmark.startNode);c.setEndAfter(a.bookmark.endNode);a.mergeBlockBookmark=c.createBookmark()}},merge:function(a,c){if(a.mergeBlockBookmark&&!a.purgeTableBookmark){var d=a.mergeBlockBookmark.startNode,e=a.mergeBlockBookmark.endNode,f=new CKEDITOR.dom.elementPath(d,c),g=new CKEDITOR.dom.elementPath(e,c),f=f.block,g=g.block;f&&g&&!f.equals(g)&&
b(g,d,e);d.remove();e.remove()}}},table:function(){function a(c){var e=[],f,h=new CKEDITOR.dom.walker(c),g=c.startPath().contains(d),m=c.endPath().contains(d),n={};h.guard=function(a,h){if(a.type==CKEDITOR.NODE_ELEMENT){var l="visited_"+(h?"out":"in");if(a.getCustomData(l))return;CKEDITOR.dom.element.setMarker(n,a,l,1)}if(h&&g&&a.equals(g))f=c.clone(),f.setEndAt(g,CKEDITOR.POSITION_BEFORE_END),e.push(f);else if(!h&&m&&a.equals(m))f=c.clone(),f.setStartAt(m,CKEDITOR.POSITION_AFTER_START),e.push(f);
else{if(l=!h)l=a.type==CKEDITOR.NODE_ELEMENT&&a.is(d)&&(!g||b(a,g))&&(!m||b(a,m));l&&(f=c.clone(),f.selectNodeContents(a),e.push(f))}};h.lastForward();CKEDITOR.dom.element.clearAllMarkers(n);return e}function b(a,c){var d=CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED,e=a.getPosition(c);return e===CKEDITOR.POSITION_IDENTICAL?!1:0===(e&d)}var d={td:1,th:1,caption:1};return{detectPurge:function(a){var b=a.range,c=b.clone();c.enlarge(CKEDITOR.ENLARGE_ELEMENT);var c=new CKEDITOR.dom.walker(c),
e=0;c.evaluator=function(a){a.type==CKEDITOR.NODE_ELEMENT&&a.is(d)&&++e};c.checkForward();if(1<e){var c=b.startPath().contains("table"),f=b.endPath().contains("table");c&&f&&b.checkBoundaryOfElement(c,CKEDITOR.START)&&b.checkBoundaryOfElement(f,CKEDITOR.END)&&(b=a.range.clone(),b.setStartBefore(c),b.setEndAfter(f),a.purgeTableBookmark=b.createBookmark())}},detectRanges:function(e,f){var h=c(f,e.bookmark),g=h.clone(),l,k,v=h.getCommonAncestor();v.is(CKEDITOR.dtd.$tableContent)&&!v.is(d)&&(v=v.getAscendant("table",
!0));k=v;v=new CKEDITOR.dom.elementPath(h.startContainer,k);k=new CKEDITOR.dom.elementPath(h.endContainer,k);v=v.contains("table");k=k.contains("table");if(v||k)v&&k&&b(v,k)?(e.tableSurroundingRange=g,g.setStartAt(v,CKEDITOR.POSITION_AFTER_END),g.setEndAt(k,CKEDITOR.POSITION_BEFORE_START),g=h.clone(),g.setEndAt(v,CKEDITOR.POSITION_AFTER_END),l=h.clone(),l.setStartAt(k,CKEDITOR.POSITION_BEFORE_START),l=a(g).concat(a(l))):v?k||(e.tableSurroundingRange=g,g.setStartAt(v,CKEDITOR.POSITION_AFTER_END),h.setEndAt(v,
CKEDITOR.POSITION_AFTER_END)):(e.tableSurroundingRange=g,g.setEndAt(k,CKEDITOR.POSITION_BEFORE_START),h.setStartAt(k,CKEDITOR.POSITION_AFTER_START)),e.tableContentsRanges=l?l:a(h)},deleteRanges:function(a){for(var b;b=a.tableContentsRanges.pop();)b.extractContents(),A(b.startContainer)&&b.startContainer.appendBogus();a.tableSurroundingRange&&a.tableSurroundingRange.extractContents()},purge:function(a){if(a.purgeTableBookmark){var b=a.doc,c=a.range.clone(),b=b.createElement("p");b.insertBefore(a.purgeTableBookmark.startNode);
c.moveToBookmark(a.purgeTableBookmark);c.deleteContents();a.range.moveToPosition(b,CKEDITOR.POSITION_AFTER_START)}}}}(),detectExtractMerge:function(a){return!(a.range.startPath().contains(CKEDITOR.dtd.$listItem)&&a.range.endPath().contains(CKEDITOR.dtd.$listItem))},fixUneditableRangePosition:function(a){a.startContainer.getDtd()["#"]||a.moveToClosestEditablePosition(null,!0)},autoParagraph:function(a,b){var c=b.startPath(),d;l(a,c.block,c.blockLimit)&&(d=k(a))&&(d=b.document.createElement(d),d.appendBogus(),
b.insertNode(d),b.moveToPosition(d,CKEDITOR.POSITION_AFTER_START))}}}()})();
(function(){function a(){var a=this._.fakeSelection,b;a&&(b=this.getSelection(1),b&&b.isHidden()||(a.reset(),a=0));if(!a&&(a=b||this.getSelection(1),!a||a.getType()==CKEDITOR.SELECTION_NONE))return;this.fire("selectionCheck",a);b=this.elementPath();b.compare(this._.selectionPreviousPath)||(CKEDITOR.env.webkit&&(this._.previousActive=this.document.getActive()),this._.selectionPreviousPath=b,this.fire("selectionChange",{selection:a,path:b}))}function d(){A=!0;y||(b.call(this),y=CKEDITOR.tools.setTimeout(b,
200,this))}function b(){y=null;A&&(CKEDITOR.tools.setTimeout(a,0,this),A=!1)}function c(a){return t(a)||a.type==CKEDITOR.NODE_ELEMENT&&!a.is(CKEDITOR.dtd.$empty)?!0:!1}function e(a){function b(c,d){return c&&c.type!=CKEDITOR.NODE_TEXT?a.clone()["moveToElementEdit"+(d?"End":"Start")](c):!1}if(!(a.root instanceof CKEDITOR.editable))return!1;var d=a.startContainer,e=a.getPreviousNode(c,null,d),f=a.getNextNode(c,null,d);return b(e)||b(f,1)||!(e||f||d.type==CKEDITOR.NODE_ELEMENT&&d.isBlockBoundary()&&
d.getBogus())?!0:!1}function g(a){l(a,!1);var b=a.getDocument().createText(u);a.setCustomData("cke-fillingChar",b);return b}function l(a,b){var c=a&&a.removeCustomData("cke-fillingChar");if(c){if(!1!==b){var d=a.getDocument().getSelection().getNative(),e=d&&"None"!=d.type&&d.getRangeAt(0),f=u.length;if(c.getLength()>f&&e&&e.intersectsNode(c.$)){var g=[{node:d.anchorNode,offset:d.anchorOffset},{node:d.focusNode,offset:d.focusOffset}];d.anchorNode==c.$&&d.anchorOffset>f&&(g[0].offset-=f);d.focusNode==
c.$&&d.focusOffset>f&&(g[1].offset-=f)}}c.setText(k(c.getText(),1));g&&(c=a.getDocument().$,d=c.getSelection(),c=c.createRange(),c.setStart(g[0].node,g[0].offset),c.collapse(!0),d.removeAllRanges(),d.addRange(c),d.extend(g[1].node,g[1].offset))}}function k(a,b){return b?a.replace(r,function(a,b){return b?" ":""}):a.replace(u,"")}function q(a){var b=CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"'+(CKEDITOR.env.ie?"display:none":"position:fixed;top:0;left:-1000px")+
'"\x3e\x26nbsp;\x3c/div\x3e',a.document);a.fire("lockSnapshot");a.editable().append(b);var c=a.getSelection(1),d=a.createRange(),e=c.root.on("selectionchange",function(a){a.cancel()},null,null,0);d.setStartAt(b,CKEDITOR.POSITION_AFTER_START);d.setEndAt(b,CKEDITOR.POSITION_BEFORE_END);c.selectRanges([d]);e.removeListener();a.fire("unlockSnapshot");a._.hiddenSelectionContainer=b}function w(a){var b={37:1,39:1,8:1,46:1};return function(c){var d=c.data.getKeystroke();if(b[d]){var e=a.getSelection().getRanges(),
f=e[0];1==e.length&&f.collapsed&&(d=f[38>d?"getPreviousEditableNode":"getNextEditableNode"]())&&d.type==CKEDITOR.NODE_ELEMENT&&"false"==d.getAttribute("contenteditable")&&(a.getSelection().fake(d),c.data.preventDefault(),c.cancel())}}}function f(a){for(var b=0;b<a.length;b++){var c=a[b];c.getCommonAncestor().isReadOnly()&&a.splice(b,1);if(!c.collapsed){if(c.startContainer.isReadOnly())for(var d=c.startContainer,e;d&&!((e=d.type==CKEDITOR.NODE_ELEMENT)&&d.is("body")||!d.isReadOnly());)e&&"false"==
d.getAttribute("contentEditable")&&c.setStartAfter(d),d=d.getParent();d=c.startContainer;e=c.endContainer;var f=c.startOffset,g=c.endOffset,l=c.clone();d&&d.type==CKEDITOR.NODE_TEXT&&(f>=d.getLength()?l.setStartAfter(d):l.setStartBefore(d));e&&e.type==CKEDITOR.NODE_TEXT&&(g?l.setEndAfter(e):l.setEndBefore(e));d=new CKEDITOR.dom.walker(l);d.evaluator=function(d){if(d.type==CKEDITOR.NODE_ELEMENT&&d.isReadOnly()){var e=c.clone();c.setEndBefore(d);c.collapsed&&a.splice(b--,1);d.getPosition(l.endContainer)&
CKEDITOR.POSITION_CONTAINS||(e.setStartAfter(d),e.collapsed||a.splice(b+1,0,e));return!0}return!1};d.next()}}return a}var y,A,t=CKEDITOR.dom.walker.invisible(1),D=function(){function a(b){return function(a){var c=a.editor.createRange();c.moveToClosestEditablePosition(a.selected,b)&&a.editor.getSelection().selectRanges([c]);return!1}}function b(a){return function(b){var c=b.editor,d=c.createRange(),e;(e=d.moveToClosestEditablePosition(b.selected,a))||(e=d.moveToClosestEditablePosition(b.selected,!a));
e&&c.getSelection().selectRanges([d]);c.fire("saveSnapshot");b.selected.remove();e||(d.moveToElementEditablePosition(c.editable()),c.getSelection().selectRanges([d]));c.fire("saveSnapshot");return!1}}var c=a(),d=a(1);return{37:c,38:c,39:d,40:d,8:b(),46:b(1)}}();CKEDITOR.on("instanceCreated",function(b){function c(){var a=e.getSelection();a&&a.removeAllRanges()}var e=b.editor;e.on("contentDom",function(){function b(){I=new CKEDITOR.dom.selection(e.getSelection());I.lock()}function c(){h.removeListener("mouseup",
c);k.removeListener("mouseup",c);var a=CKEDITOR.document.$.selection,b=a.createRange();"None"!=a.type&&b.parentElement().ownerDocument==f.$&&b.select()}var f=e.document,h=CKEDITOR.document,g=e.editable(),n=f.getBody(),k=f.getDocumentElement(),q=g.isInline(),v,I;CKEDITOR.env.gecko&&g.attachListener(g,"focus",function(a){a.removeListener();0!==v&&(a=e.getSelection().getNative())&&a.isCollapsed&&a.anchorNode==g.$&&(a=e.createRange(),a.moveToElementEditStart(g),a.select())},null,null,-2);g.attachListener(g,
CKEDITOR.env.webkit?"DOMFocusIn":"focus",function(){v&&CKEDITOR.env.webkit&&(v=e._.previousActive&&e._.previousActive.equals(f.getActive()));e.unlockSelection(v);v=0},null,null,-1);g.attachListener(g,"mousedown",function(){v=0});if(CKEDITOR.env.ie||q)p?g.attachListener(g,"beforedeactivate",b,null,null,-1):g.attachListener(e,"selectionCheck",b,null,null,-1),g.attachListener(g,CKEDITOR.env.webkit?"DOMFocusOut":"blur",function(){e.lockSelection(I);v=1},null,null,-1),g.attachListener(g,"mousedown",function(){v=
0});if(CKEDITOR.env.ie&&!q){var J;g.attachListener(g,"mousedown",function(a){2==a.data.$.button&&((a=e.document.getSelection())&&a.getType()!=CKEDITOR.SELECTION_NONE||(J=e.window.getScrollPosition()))});g.attachListener(g,"mouseup",function(a){2==a.data.$.button&&J&&(e.document.$.documentElement.scrollLeft=J.x,e.document.$.documentElement.scrollTop=J.y);J=null});if("BackCompat"!=f.$.compatMode){if(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat)k.on("mousedown",function(a){function b(a){a=a.data.$;
if(d){var c=n.$.createTextRange();try{c.moveToPoint(a.clientX,a.clientY)}catch(e){}d.setEndPoint(0>f.compareEndPoints("StartToStart",c)?"EndToEnd":"StartToStart",c);d.select()}}function c(){k.removeListener("mousemove",b);h.removeListener("mouseup",c);k.removeListener("mouseup",c);d.select()}a=a.data;if(a.getTarget().is("html")&&a.$.y<k.$.clientHeight&&a.$.x<k.$.clientWidth){var d=n.$.createTextRange();try{d.moveToPoint(a.$.clientX,a.$.clientY)}catch(e){}var f=d.duplicate();k.on("mousemove",b);h.on("mouseup",
c);k.on("mouseup",c)}});if(7<CKEDITOR.env.version&&11>CKEDITOR.env.version)k.on("mousedown",function(a){a.data.getTarget().is("html")&&(h.on("mouseup",c),k.on("mouseup",c))})}}g.attachListener(g,"selectionchange",a,e);g.attachListener(g,"keyup",d,e);g.attachListener(g,CKEDITOR.env.webkit?"DOMFocusIn":"focus",function(){e.forceNextSelectionCheck();e.selectionChange(1)});if(q&&(CKEDITOR.env.webkit||CKEDITOR.env.gecko)){var F;g.attachListener(g,"mousedown",function(){F=1});g.attachListener(f.getDocumentElement(),
"mouseup",function(){F&&d.call(e);F=0})}else g.attachListener(CKEDITOR.env.ie?g:f.getDocumentElement(),"mouseup",d,e);CKEDITOR.env.webkit&&g.attachListener(f,"keydown",function(a){switch(a.data.getKey()){case 13:case 33:case 34:case 35:case 36:case 37:case 39:case 8:case 45:case 46:l(g)}},null,null,-1);g.attachListener(g,"keydown",w(e),null,null,-1)});e.on("setData",function(){e.unlockSelection();CKEDITOR.env.webkit&&c()});e.on("contentDomUnload",function(){e.unlockSelection()});if(CKEDITOR.env.ie9Compat)e.on("beforeDestroy",
c,null,null,9);e.on("dataReady",function(){delete e._.fakeSelection;delete e._.hiddenSelectionContainer;e.selectionChange(1)});e.on("loadSnapshot",function(){var a=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),b=e.editable().getLast(a);b&&b.hasAttribute("data-cke-hidden-sel")&&(b.remove(),CKEDITOR.env.gecko&&(a=e.editable().getFirst(a))&&a.is("br")&&a.getAttribute("_moz_editor_bogus_node")&&a.remove())},null,null,100);e.on("key",function(a){if("wysiwyg"==e.mode){var b=e.getSelection();if(b.isFake){var c=
D[a.data.keyCode];if(c)return c({editor:e,selected:b.getSelectedElement(),selection:b,keyEvent:a})}}})});if(CKEDITOR.env.webkit)CKEDITOR.on("instanceReady",function(a){var b=a.editor;b.on("selectionChange",function(){var a=b.editable(),c=a.getCustomData("cke-fillingChar");c&&(c.getCustomData("ready")?l(a):c.setCustomData("ready",1))},null,null,-1);b.on("beforeSetMode",function(){l(b.editable())},null,null,-1);b.on("getSnapshot",function(a){a.data&&(a.data=k(a.data))},b,null,20);b.on("toDataFormat",
function(a){a.data.dataValue=k(a.data.dataValue)},null,null,0)});CKEDITOR.editor.prototype.selectionChange=function(b){(b?a:d).call(this)};CKEDITOR.editor.prototype.getSelection=function(a){return!this._.savedSelection&&!this._.fakeSelection||a?(a=this.editable())&&"wysiwyg"==this.mode?new CKEDITOR.dom.selection(a):null:this._.savedSelection||this._.fakeSelection};CKEDITOR.editor.prototype.lockSelection=function(a){a=a||this.getSelection(1);return a.getType()!=CKEDITOR.SELECTION_NONE?(!a.isLocked&&
a.lock(),this._.savedSelection=a,!0):!1};CKEDITOR.editor.prototype.unlockSelection=function(a){var b=this._.savedSelection;return b?(b.unlock(a),delete this._.savedSelection,!0):!1};CKEDITOR.editor.prototype.forceNextSelectionCheck=function(){delete this._.selectionPreviousPath};CKEDITOR.dom.document.prototype.getSelection=function(){return new CKEDITOR.dom.selection(this)};CKEDITOR.dom.range.prototype.select=function(){var a=this.root instanceof CKEDITOR.editable?this.root.editor.getSelection():
new CKEDITOR.dom.selection(this.root);a.selectRanges([this]);return a};CKEDITOR.SELECTION_NONE=1;CKEDITOR.SELECTION_TEXT=2;CKEDITOR.SELECTION_ELEMENT=3;var p="function"!=typeof window.getSelection,x=1;CKEDITOR.dom.selection=function(a){if(a instanceof CKEDITOR.dom.selection){var b=a;a=a.root}var c=a instanceof CKEDITOR.dom.element;this.rev=b?b.rev:x++;this.document=a instanceof CKEDITOR.dom.document?a:a.getDocument();this.root=c?a:this.document.getBody();this.isLocked=0;this._={cache:{}};if(b)return CKEDITOR.tools.extend(this._.cache,
b._.cache),this.isFake=b.isFake,this.isLocked=b.isLocked,this;a=this.getNative();var d,e;if(a)if(a.getRangeAt)d=(e=a.rangeCount&&a.getRangeAt(0))&&new CKEDITOR.dom.node(e.commonAncestorContainer);else{try{e=a.createRange()}catch(f){}d=e&&CKEDITOR.dom.element.get(e.item&&e.item(0)||e.parentElement())}if(!d||d.type!=CKEDITOR.NODE_ELEMENT&&d.type!=CKEDITOR.NODE_TEXT||!this.root.equals(d)&&!this.root.contains(d))this._.cache.type=CKEDITOR.SELECTION_NONE,this._.cache.startElement=null,this._.cache.selectedElement=
null,this._.cache.selectedText="",this._.cache.ranges=new CKEDITOR.dom.rangeList;return this};var G={img:1,hr:1,li:1,table:1,tr:1,td:1,th:1,embed:1,object:1,ol:1,ul:1,a:1,input:1,form:1,select:1,textarea:1,button:1,fieldset:1,thead:1,tfoot:1},u=CKEDITOR.tools.repeat("​",7),r=new RegExp(u+"( )?","g");CKEDITOR.tools.extend(CKEDITOR.dom.selection,{_removeFillingCharSequenceString:k,_createFillingCharSequenceNode:g,FILLING_CHAR_SEQUENCE:u});CKEDITOR.dom.selection.prototype={getNative:function(){return void 0!==
this._.cache.nativeSel?this._.cache.nativeSel:this._.cache.nativeSel=p?this.document.$.selection:this.document.getWindow().$.getSelection()},getType:p?function(){var a=this._.cache;if(a.type)return a.type;var b=CKEDITOR.SELECTION_NONE;try{var c=this.getNative(),d=c.type;"Text"==d&&(b=CKEDITOR.SELECTION_TEXT);"Control"==d&&(b=CKEDITOR.SELECTION_ELEMENT);c.createRange().parentElement()&&(b=CKEDITOR.SELECTION_TEXT)}catch(e){}return a.type=b}:function(){var a=this._.cache;if(a.type)return a.type;var b=
CKEDITOR.SELECTION_TEXT,c=this.getNative();if(!c||!c.rangeCount)b=CKEDITOR.SELECTION_NONE;else if(1==c.rangeCount){var c=c.getRangeAt(0),d=c.startContainer;d==c.endContainer&&1==d.nodeType&&1==c.endOffset-c.startOffset&&G[d.childNodes[c.startOffset].nodeName.toLowerCase()]&&(b=CKEDITOR.SELECTION_ELEMENT)}return a.type=b},getRanges:function(){var a=p?function(){function a(b){return(new CKEDITOR.dom.node(b)).getIndex()}var b=function(b,c){b=b.duplicate();b.collapse(c);var d=b.parentElement();if(!d.hasChildNodes())return{container:d,
offset:0};for(var e=d.children,f,h,g=b.duplicate(),l=0,v=e.length-1,k=-1,m,p;l<=v;)if(k=Math.floor((l+v)/2),f=e[k],g.moveToElementText(f),m=g.compareEndPoints("StartToStart",b),0<m)v=k-1;else if(0>m)l=k+1;else return{container:d,offset:a(f)};if(-1==k||k==e.length-1&&0>m){g.moveToElementText(d);g.setEndPoint("StartToStart",b);g=g.text.replace(/(\r\n|\r)/g,"\n").length;e=d.childNodes;if(!g)return f=e[e.length-1],f.nodeType!=CKEDITOR.NODE_TEXT?{container:d,offset:e.length}:{container:f,offset:f.nodeValue.length};
for(d=e.length;0<g&&0<d;)h=e[--d],h.nodeType==CKEDITOR.NODE_TEXT&&(p=h,g-=h.nodeValue.length);return{container:p,offset:-g}}g.collapse(0<m?!0:!1);g.setEndPoint(0<m?"StartToStart":"EndToStart",b);g=g.text.replace(/(\r\n|\r)/g,"\n").length;if(!g)return{container:d,offset:a(f)+(0<m?0:1)};for(;0<g;)try{h=f[0<m?"previousSibling":"nextSibling"],h.nodeType==CKEDITOR.NODE_TEXT&&(g-=h.nodeValue.length,p=h),f=h}catch(q){return{container:d,offset:a(f)}}return{container:p,offset:0<m?-g:p.nodeValue.length+g}};
return function(){var a=this.getNative(),c=a&&a.createRange(),d=this.getType();if(!a)return[];if(d==CKEDITOR.SELECTION_TEXT)return a=new CKEDITOR.dom.range(this.root),d=b(c,!0),a.setStart(new CKEDITOR.dom.node(d.container),d.offset),d=b(c),a.setEnd(new CKEDITOR.dom.node(d.container),d.offset),a.endContainer.getPosition(a.startContainer)&CKEDITOR.POSITION_PRECEDING&&a.endOffset<=a.startContainer.getIndex()&&a.collapse(),[a];if(d==CKEDITOR.SELECTION_ELEMENT){for(var d=[],e=0;e<c.length;e++){for(var f=
c.item(e),h=f.parentNode,g=0,a=new CKEDITOR.dom.range(this.root);g<h.childNodes.length&&h.childNodes[g]!=f;g++);a.setStart(new CKEDITOR.dom.node(h),g);a.setEnd(new CKEDITOR.dom.node(h),g+1);d.push(a)}return d}return[]}}():function(){var a=[],b,c=this.getNative();if(!c)return a;for(var d=0;d<c.rangeCount;d++){var e=c.getRangeAt(d);b=new CKEDITOR.dom.range(this.root);b.setStart(new CKEDITOR.dom.node(e.startContainer),e.startOffset);b.setEnd(new CKEDITOR.dom.node(e.endContainer),e.endOffset);a.push(b)}return a};
return function(b){var c=this._.cache,d=c.ranges;d||(c.ranges=d=new CKEDITOR.dom.rangeList(a.call(this)));return b?f(new CKEDITOR.dom.rangeList(d.slice())):d}}(),getStartElement:function(){var a=this._.cache;if(void 0!==a.startElement)return a.startElement;var b;switch(this.getType()){case CKEDITOR.SELECTION_ELEMENT:return this.getSelectedElement();case CKEDITOR.SELECTION_TEXT:var c=this.getRanges()[0];if(c){if(c.collapsed)b=c.startContainer,b.type!=CKEDITOR.NODE_ELEMENT&&(b=b.getParent());else{for(c.optimize();b=
c.startContainer,c.startOffset==(b.getChildCount?b.getChildCount():b.getLength())&&!b.isBlockBoundary();)c.setStartAfter(b);b=c.startContainer;if(b.type!=CKEDITOR.NODE_ELEMENT)return b.getParent();if((b=b.getChild(c.startOffset))&&b.type==CKEDITOR.NODE_ELEMENT)for(c=b.getFirst();c&&c.type==CKEDITOR.NODE_ELEMENT;)b=c,c=c.getFirst();else b=c.startContainer}b=b.$}}return a.startElement=b?new CKEDITOR.dom.element(b):null},getSelectedElement:function(){var a=this._.cache;if(void 0!==a.selectedElement)return a.selectedElement;
var b=this,c=CKEDITOR.tools.tryThese(function(){return b.getNative().createRange().item(0)},function(){for(var a=b.getRanges()[0].clone(),c,d,e=2;e&&!((c=a.getEnclosedNode())&&c.type==CKEDITOR.NODE_ELEMENT&&G[c.getName()]&&(d=c));e--)a.shrink(CKEDITOR.SHRINK_ELEMENT);return d&&d.$});return a.selectedElement=c?new CKEDITOR.dom.element(c):null},getSelectedText:function(){var a=this._.cache;if(void 0!==a.selectedText)return a.selectedText;var b=this.getNative(),b=p?"Control"==b.type?"":b.createRange().text:
b.toString();return a.selectedText=b},lock:function(){this.getRanges();this.getStartElement();this.getSelectedElement();this.getSelectedText();this._.cache.nativeSel=null;this.isLocked=1},unlock:function(a){if(this.isLocked){if(a)var b=this.getSelectedElement(),c=!b&&this.getRanges(),d=this.isFake;this.isLocked=0;this.reset();a&&(a=b||c[0]&&c[0].getCommonAncestor())&&a.getAscendant("body",1)&&(d?this.fake(b):b?this.selectElement(b):this.selectRanges(c))}},reset:function(){this._.cache={};this.isFake=
0;var a=this.root.editor;if(a&&a._.fakeSelection)if(this.rev==a._.fakeSelection.rev){delete a._.fakeSelection;var b=a._.hiddenSelectionContainer;if(b){var c=a.checkDirty();a.fire("lockSnapshot");b.remove();a.fire("unlockSnapshot");!c&&a.resetDirty()}delete a._.hiddenSelectionContainer}else CKEDITOR.warn("selection-fake-reset");this.rev=x++},selectElement:function(a){var b=new CKEDITOR.dom.range(this.root);b.setStartBefore(a);b.setEndAfter(a);this.selectRanges([b])},selectRanges:function(a){var b=
this.root.editor,b=b&&b._.hiddenSelectionContainer;this.reset();if(b)for(var b=this.root,c,d=0;d<a.length;++d)c=a[d],c.endContainer.equals(b)&&(c.endOffset=Math.min(c.endOffset,b.getChildCount()));if(a.length)if(this.isLocked){var f=CKEDITOR.document.getActive();this.unlock();this.selectRanges(a);this.lock();f&&!f.equals(this.root)&&f.focus()}else{var k;a:{var q,w;if(1==a.length&&!(w=a[0]).collapsed&&(k=w.getEnclosedNode())&&k.type==CKEDITOR.NODE_ELEMENT&&(w=w.clone(),w.shrink(CKEDITOR.SHRINK_ELEMENT,
!0),(q=w.getEnclosedNode())&&q.type==CKEDITOR.NODE_ELEMENT&&(k=q),"false"==k.getAttribute("contenteditable")))break a;k=void 0}if(k)this.fake(k);else{if(p){w=CKEDITOR.dom.walker.whitespaces(!0);q=/\ufeff|\u00a0/;b={table:1,tbody:1,tr:1};1<a.length&&(k=a[a.length-1],a[0].setEnd(k.endContainer,k.endOffset));k=a[0];a=k.collapsed;var t,u,r;if((c=k.getEnclosedNode())&&c.type==CKEDITOR.NODE_ELEMENT&&c.getName()in G&&(!c.is("a")||!c.getText()))try{r=c.$.createControlRange();r.addElement(c.$);r.select();
return}catch(v){}if(k.startContainer.type==CKEDITOR.NODE_ELEMENT&&k.startContainer.getName()in b||k.endContainer.type==CKEDITOR.NODE_ELEMENT&&k.endContainer.getName()in b)k.shrink(CKEDITOR.NODE_ELEMENT,!0),a=k.collapsed;r=k.createBookmark();b=r.startNode;a||(f=r.endNode);r=k.document.$.body.createTextRange();r.moveToElementText(b.$);r.moveStart("character",1);f?(q=k.document.$.body.createTextRange(),q.moveToElementText(f.$),r.setEndPoint("EndToEnd",q),r.moveEnd("character",-1)):(t=b.getNext(w),u=
b.hasAscendant("pre"),t=!(t&&t.getText&&t.getText().match(q))&&(u||!b.hasPrevious()||b.getPrevious().is&&b.getPrevious().is("br")),u=k.document.createElement("span"),u.setHtml("\x26#65279;"),u.insertBefore(b),t&&k.document.createText("﻿").insertBefore(b));k.setStartBefore(b);b.remove();a?(t?(r.moveStart("character",-1),r.select(),k.document.$.selection.clear()):r.select(),k.moveToPosition(u,CKEDITOR.POSITION_BEFORE_START),u.remove()):(k.setEndBefore(f),f.remove(),r.select())}else{f=this.getNative();
if(!f)return;this.removeAllRanges();for(r=0;r<a.length;r++){if(r<a.length-1&&(t=a[r],u=a[r+1],q=t.clone(),q.setStart(t.endContainer,t.endOffset),q.setEnd(u.startContainer,u.startOffset),!q.collapsed&&(q.shrink(CKEDITOR.NODE_ELEMENT,!0),k=q.getCommonAncestor(),q=q.getEnclosedNode(),k.isReadOnly()||q&&q.isReadOnly()))){u.setStart(t.startContainer,t.startOffset);a.splice(r--,1);continue}k=a[r];u=this.document.$.createRange();k.collapsed&&CKEDITOR.env.webkit&&e(k)&&(q=g(this.root),k.insertNode(q),(t=
q.getNext())&&!q.getPrevious()&&t.type==CKEDITOR.NODE_ELEMENT&&"br"==t.getName()?(l(this.root),k.moveToPosition(t,CKEDITOR.POSITION_BEFORE_START)):k.moveToPosition(q,CKEDITOR.POSITION_AFTER_END));u.setStart(k.startContainer.$,k.startOffset);try{u.setEnd(k.endContainer.$,k.endOffset)}catch(I){if(0<=I.toString().indexOf("NS_ERROR_ILLEGAL_VALUE"))k.collapse(1),u.setEnd(k.endContainer.$,k.endOffset);else throw I;}f.addRange(u)}}this.reset();this.root.fire("selectionchange")}}},fake:function(a){var b=
this.root.editor;this.reset();q(b);var c=this._.cache,d=new CKEDITOR.dom.range(this.root);d.setStartBefore(a);d.setEndAfter(a);c.ranges=new CKEDITOR.dom.rangeList(d);c.selectedElement=c.startElement=a;c.type=CKEDITOR.SELECTION_ELEMENT;c.selectedText=c.nativeSel=null;this.isFake=1;this.rev=x++;b._.fakeSelection=this;this.root.fire("selectionchange")},isHidden:function(){var a=this.getCommonAncestor();a&&a.type==CKEDITOR.NODE_TEXT&&(a=a.getParent());return!(!a||!a.data("cke-hidden-sel"))},createBookmarks:function(a){a=
this.getRanges().createBookmarks(a);this.isFake&&(a.isFake=1);return a},createBookmarks2:function(a){a=this.getRanges().createBookmarks2(a);this.isFake&&(a.isFake=1);return a},selectBookmarks:function(a){for(var b=[],c,d=0;d<a.length;d++){var e=new CKEDITOR.dom.range(this.root);e.moveToBookmark(a[d]);b.push(e)}a.isFake&&(c=b[0].getEnclosedNode(),c&&c.type==CKEDITOR.NODE_ELEMENT||(CKEDITOR.warn("selection-not-fake"),a.isFake=0));a.isFake?this.fake(c):this.selectRanges(b);return this},getCommonAncestor:function(){var a=
this.getRanges();return a.length?a[0].startContainer.getCommonAncestor(a[a.length-1].endContainer):null},scrollIntoView:function(){this.type!=CKEDITOR.SELECTION_NONE&&this.getRanges()[0].scrollIntoView()},removeAllRanges:function(){if(this.getType()!=CKEDITOR.SELECTION_NONE){var a=this.getNative();try{a&&a[p?"empty":"removeAllRanges"]()}catch(b){}this.reset()}}}})();"use strict";CKEDITOR.STYLE_BLOCK=1;CKEDITOR.STYLE_INLINE=2;CKEDITOR.STYLE_OBJECT=3;
(function(){function a(a,b){for(var c,d;(a=a.getParent())&&!a.equals(b);)if(a.getAttribute("data-nostyle"))c=a;else if(!d){var e=a.getAttribute("contentEditable");"false"==e?c=a:"true"==e&&(d=1)}return c}function d(a,b,c,d){return(a.getPosition(b)|d)==d&&(!c.childRule||c.childRule(a))}function b(c){var f=c.document;if(c.collapsed)f=G(this,f),c.insertNode(f),c.moveToPosition(f,CKEDITOR.POSITION_BEFORE_END);else{var g=this.element,h=this._.definition,l,k=h.ignoreReadonly,m=k||h.includeReadonly;null==
m&&(m=c.root.getCustomData("cke_includeReadonly"));var n=CKEDITOR.dtd[g];n||(l=!0,n=CKEDITOR.dtd.span);c.enlarge(CKEDITOR.ENLARGE_INLINE,1);c.trim();var p=c.createBookmark(),q=p.startNode,w=p.endNode,t=q,r;if(!k){var u=c.getCommonAncestor(),k=a(q,u),u=a(w,u);k&&(t=k.getNextSourceNode(!0));u&&(w=u)}for(t.getPosition(w)==CKEDITOR.POSITION_FOLLOWING&&(t=0);t;){k=!1;if(t.equals(w))t=null,k=!0;else{var y=t.type==CKEDITOR.NODE_ELEMENT?t.getName():null,u=y&&"false"==t.getAttribute("contentEditable"),x=y&&
t.getAttribute("data-nostyle");if(y&&t.data("cke-bookmark")){t=t.getNextSourceNode(!0);continue}if(u&&m&&CKEDITOR.dtd.$block[y])for(var A=t,z=e(A),B=void 0,C=z.length,E=0,A=C&&new CKEDITOR.dom.range(A.getDocument());E<C;++E){var B=z[E],R=CKEDITOR.filter.instances[B.data("cke-filter")];if(R?R.check(this):1)A.selectNodeContents(B),b.call(this,A)}z=y?!n[y]||x?0:u&&!m?0:d(t,w,h,T):1;if(z)if(B=t.getParent(),z=h,C=g,E=l,!B||!(B.getDtd()||CKEDITOR.dtd.span)[C]&&!E||z.parentRule&&!z.parentRule(B))k=!0;else{if(r||
y&&CKEDITOR.dtd.$removeEmpty[y]&&(t.getPosition(w)|T)!=T||(r=c.clone(),r.setStartBefore(t)),y=t.type,y==CKEDITOR.NODE_TEXT||u||y==CKEDITOR.NODE_ELEMENT&&!t.getChildCount()){for(var y=t,Y;(k=!y.getNext(H))&&(Y=y.getParent(),n[Y.getName()])&&d(Y,q,h,Q);)y=Y;r.setEndAfter(y)}}else k=!0;t=t.getNextSourceNode(x||u)}if(k&&r&&!r.collapsed){for(var k=G(this,f),u=k.hasAttributes(),x=r.getCommonAncestor(),y={},z={},B={},C={},U,O,da;k&&x;){if(x.getName()==g){for(U in h.attributes)!C[U]&&(da=x.getAttribute(O))&&
(k.getAttribute(U)==da?z[U]=1:C[U]=1);for(O in h.styles)!B[O]&&(da=x.getStyle(O))&&(k.getStyle(O)==da?y[O]=1:B[O]=1)}x=x.getParent()}for(U in z)k.removeAttribute(U);for(O in y)k.removeStyle(O);u&&!k.hasAttributes()&&(k=null);k?(r.extractContents().appendTo(k),r.insertNode(k),D.call(this,k),k.mergeSiblings(),CKEDITOR.env.ie||k.$.normalize()):(k=new CKEDITOR.dom.element("span"),r.extractContents().appendTo(k),r.insertNode(k),D.call(this,k),k.remove(!0));r=null}}c.moveToBookmark(p);c.shrink(CKEDITOR.SHRINK_TEXT);
c.shrink(CKEDITOR.NODE_ELEMENT,!0)}}function c(a){function b(){for(var a=new CKEDITOR.dom.elementPath(d.getParent()),c=new CKEDITOR.dom.elementPath(m.getParent()),e=null,f=null,g=0;g<a.elements.length;g++){var h=a.elements[g];if(h==a.block||h==a.blockLimit)break;n.checkElementRemovable(h,!0)&&(e=h)}for(g=0;g<c.elements.length;g++){h=c.elements[g];if(h==c.block||h==c.blockLimit)break;n.checkElementRemovable(h,!0)&&(f=h)}f&&m.breakParent(f);e&&d.breakParent(e)}a.enlarge(CKEDITOR.ENLARGE_INLINE,1);var c=
a.createBookmark(),d=c.startNode;if(a.collapsed){for(var e=new CKEDITOR.dom.elementPath(d.getParent(),a.root),f,g=0,k;g<e.elements.length&&(k=e.elements[g])&&k!=e.block&&k!=e.blockLimit;g++)if(this.checkElementRemovable(k)){var l;a.collapsed&&(a.checkBoundaryOfElement(k,CKEDITOR.END)||(l=a.checkBoundaryOfElement(k,CKEDITOR.START)))?(f=k,f.match=l?"start":"end"):(k.mergeSiblings(),k.is(this.element)?t.call(this,k):p(k,h(this)[k.getName()]))}if(f){k=d;for(g=0;;g++){l=e.elements[g];if(l.equals(f))break;
else if(l.match)continue;else l=l.clone();l.append(k);k=l}k["start"==f.match?"insertBefore":"insertAfter"](f)}}else{var m=c.endNode,n=this;b();for(e=d;!e.equals(m);)f=e.getNextSourceNode(),e.type==CKEDITOR.NODE_ELEMENT&&this.checkElementRemovable(e)&&(e.getName()==this.element?t.call(this,e):p(e,h(this)[e.getName()]),f.type==CKEDITOR.NODE_ELEMENT&&f.contains(d)&&(b(),f=d.getNext())),e=f}a.moveToBookmark(c);a.shrink(CKEDITOR.NODE_ELEMENT,!0)}function e(a){var b=[];a.forEach(function(a){if("true"==
a.getAttribute("contenteditable"))return b.push(a),!1},CKEDITOR.NODE_ELEMENT,!0);return b}function g(a){var b=a.getEnclosedNode()||a.getCommonAncestor(!1,!0);(a=(new CKEDITOR.dom.elementPath(b,a.root)).contains(this.element,1))&&!a.isReadOnly()&&u(a,this)}function l(a){var b=a.getCommonAncestor(!0,!0);if(a=(new CKEDITOR.dom.elementPath(b,a.root)).contains(this.element,1)){var b=this._.definition,c=b.attributes;if(c)for(var d in c)a.removeAttribute(d,c[d]);if(b.styles)for(var e in b.styles)b.styles.hasOwnProperty(e)&&
a.removeStyle(e)}}function k(a){var b=a.createBookmark(!0),c=a.createIterator();c.enforceRealBlocks=!0;this._.enterMode&&(c.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR);for(var d,e=a.document,f;d=c.getNextParagraph();)!d.isReadOnly()&&(c.activeFilter?c.activeFilter.check(this):1)&&(f=G(this,e,d),w(d,f));a.moveToBookmark(b)}function q(a){var b=a.createBookmark(1),c=a.createIterator();c.enforceRealBlocks=!0;c.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR;for(var d,e;d=c.getNextParagraph();)this.checkElementRemovable(d)&&
(d.is("pre")?((e=this._.enterMode==CKEDITOR.ENTER_BR?null:a.document.createElement(this._.enterMode==CKEDITOR.ENTER_P?"p":"div"))&&d.copyAttributes(e),w(d,e)):t.call(this,d));a.moveToBookmark(b)}function w(a,b){var c=!b;c&&(b=a.getDocument().createElement("div"),a.copyAttributes(b));var d=b&&b.is("pre"),e=a.is("pre"),g=!d&&e;if(d&&!e){e=b;(g=a.getBogus())&&g.remove();g=a.getHtml();g=y(g,/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g,"");g=g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi,"$1");g=g.replace(/([ \t\n\r]+|&nbsp;)/g,
" ");g=g.replace(/<br\b[^>]*>/gi,"\n");if(CKEDITOR.env.ie){var h=a.getDocument().createElement("div");h.append(e);e.$.outerHTML="\x3cpre\x3e"+g+"\x3c/pre\x3e";e.copyAttributes(h.getFirst());e=h.getFirst().remove()}else e.setHtml(g);b=e}else g?b=A(c?[a.getHtml()]:f(a),b):a.moveChildren(b);b.replace(a);if(d){var c=b,k;(k=c.getPrevious(R))&&k.type==CKEDITOR.NODE_ELEMENT&&k.is("pre")&&(d=y(k.getHtml(),/\n$/,"")+"\n\n"+y(c.getHtml(),/^\n/,""),CKEDITOR.env.ie?c.$.outerHTML="\x3cpre\x3e"+d+"\x3c/pre\x3e":
c.setHtml(d),k.remove())}else c&&x(b)}function f(a){var b=[];y(a.getOuterHtml(),/(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi,function(a,b,c){return b+"\x3c/pre\x3e"+c+"\x3cpre\x3e"}).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi,function(a,c){b.push(c)});return b}function y(a,b,c){var d="",e="";a=a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi,function(a,b,c){b&&(d=b);c&&(e=c);return""});return d+a.replace(b,c)+e}function A(a,b){var c;
1<a.length&&(c=new CKEDITOR.dom.documentFragment(b.getDocument()));for(var d=0;d<a.length;d++){var e=a[d],e=e.replace(/(\r\n|\r)/g,"\n"),e=y(e,/^[ \t]*\n/,""),e=y(e,/\n$/,""),e=y(e,/^[ \t]+|[ \t]+$/g,function(a,b){return 1==a.length?"\x26nbsp;":b?" "+CKEDITOR.tools.repeat("\x26nbsp;",a.length-1):CKEDITOR.tools.repeat("\x26nbsp;",a.length-1)+" "}),e=e.replace(/\n/g,"\x3cbr\x3e"),e=e.replace(/[ \t]{2,}/g,function(a){return CKEDITOR.tools.repeat("\x26nbsp;",a.length-1)+" "});if(c){var f=b.clone();f.setHtml(e);
c.append(f)}else b.setHtml(e)}return c||b}function t(a,b){var c=this._.definition,d=c.attributes,c=c.styles,e=h(this)[a.getName()],f=CKEDITOR.tools.isEmpty(d)&&CKEDITOR.tools.isEmpty(c),g;for(g in d)if("class"!=g&&!this._.definition.fullMatch||a.getAttribute(g)==n(g,d[g]))b&&"data-"==g.slice(0,5)||(f=a.hasAttribute(g),a.removeAttribute(g));for(var k in c)this._.definition.fullMatch&&a.getStyle(k)!=n(k,c[k],!0)||(f=f||!!a.getStyle(k),a.removeStyle(k));p(a,e,z[a.getName()]);f&&(this._.definition.alwaysRemoveElement?
x(a,1):!CKEDITOR.dtd.$block[a.getName()]||this._.enterMode==CKEDITOR.ENTER_BR&&!a.hasAttributes()?x(a):a.renameNode(this._.enterMode==CKEDITOR.ENTER_P?"p":"div"))}function D(a){for(var b=h(this),c=a.getElementsByTag(this.element),d,e=c.count();0<=--e;)d=c.getItem(e),d.isReadOnly()||t.call(this,d,!0);for(var f in b)if(f!=this.element)for(c=a.getElementsByTag(f),e=c.count()-1;0<=e;e--)d=c.getItem(e),d.isReadOnly()||p(d,b[f])}function p(a,b,c){if(b=b&&b.attributes)for(var d=0;d<b.length;d++){var e=b[d][0],
f;if(f=a.getAttribute(e)){var g=b[d][1];(null===g||g.test&&g.test(f)||"string"==typeof g&&f==g)&&a.removeAttribute(e)}}c||x(a)}function x(a,b){if(!a.hasAttributes()||b)if(CKEDITOR.dtd.$block[a.getName()]){var c=a.getPrevious(R),d=a.getNext(R);!c||c.type!=CKEDITOR.NODE_TEXT&&c.isBlockBoundary({br:1})||a.append("br",1);!d||d.type!=CKEDITOR.NODE_TEXT&&d.isBlockBoundary({br:1})||a.append("br");a.remove(!0)}else c=a.getFirst(),d=a.getLast(),a.remove(!0),c&&(c.type==CKEDITOR.NODE_ELEMENT&&c.mergeSiblings(),
d&&!c.equals(d)&&d.type==CKEDITOR.NODE_ELEMENT&&d.mergeSiblings())}function G(a,b,c){var d;d=a.element;"*"==d&&(d="span");d=new CKEDITOR.dom.element(d,b);c&&c.copyAttributes(d);d=u(d,a);b.getCustomData("doc_processing_style")&&d.hasAttribute("id")?d.removeAttribute("id"):b.setCustomData("doc_processing_style",1);return d}function u(a,b){var c=b._.definition,d=c.attributes,c=CKEDITOR.style.getStyleText(c);if(d)for(var e in d)a.setAttribute(e,d[e]);c&&a.setAttribute("style",c);return a}function r(a,
b){for(var c in a)a[c]=a[c].replace(C,function(a,c){return b[c]})}function h(a){if(a._.overrides)return a._.overrides;var b=a._.overrides={},c=a._.definition.overrides;if(c){CKEDITOR.tools.isArray(c)||(c=[c]);for(var d=0;d<c.length;d++){var e=c[d],f,g;"string"==typeof e?f=e.toLowerCase():(f=e.element?e.element.toLowerCase():a.element,g=e.attributes);e=b[f]||(b[f]={});if(g){var e=e.attributes=e.attributes||[],h;for(h in g)e.push([h.toLowerCase(),g[h]])}}}return b}function n(a,b,c){var d=new CKEDITOR.dom.element("span");
d[c?"setStyle":"setAttribute"](a,b);return d[c?"getStyle":"getAttribute"](a)}function m(a,b,c){var d=a.document,e=a.getRanges();b=b?this.removeFromRange:this.applyToRange;for(var f,g=e.createIterator();f=g.getNextRange();)b.call(this,f,c);a.selectRanges(e);d.removeCustomData("doc_processing_style")}var z={address:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,p:1,pre:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,time:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,
details:1,datagrid:1,datalist:1},B={a:1,blockquote:1,embed:1,hr:1,img:1,li:1,object:1,ol:1,table:1,td:1,tr:1,th:1,ul:1,dl:1,dt:1,dd:1,form:1,audio:1,video:1},E=/\s*(?:;\s*|$)/,C=/#\((.+?)\)/g,H=CKEDITOR.dom.walker.bookmark(0,1),R=CKEDITOR.dom.walker.whitespaces(1);CKEDITOR.style=function(a,b){if("string"==typeof a.type)return new CKEDITOR.style.customHandlers[a.type](a);var c=a.attributes;c&&c.style&&(a.styles=CKEDITOR.tools.extend({},a.styles,CKEDITOR.tools.parseCssText(c.style)),delete c.style);
b&&(a=CKEDITOR.tools.clone(a),r(a.attributes,b),r(a.styles,b));c=this.element=a.element?"string"==typeof a.element?a.element.toLowerCase():a.element:"*";this.type=a.type||(z[c]?CKEDITOR.STYLE_BLOCK:B[c]?CKEDITOR.STYLE_OBJECT:CKEDITOR.STYLE_INLINE);"object"==typeof this.element&&(this.type=CKEDITOR.STYLE_OBJECT);this._={definition:a}};CKEDITOR.style.prototype={apply:function(a){if(a instanceof CKEDITOR.dom.document)return m.call(this,a.getSelection());if(this.checkApplicable(a.elementPath(),a)){var b=
this._.enterMode;b||(this._.enterMode=a.activeEnterMode);m.call(this,a.getSelection(),0,a);this._.enterMode=b}},remove:function(a){if(a instanceof CKEDITOR.dom.document)return m.call(this,a.getSelection(),1);if(this.checkApplicable(a.elementPath(),a)){var b=this._.enterMode;b||(this._.enterMode=a.activeEnterMode);m.call(this,a.getSelection(),1,a);this._.enterMode=b}},applyToRange:function(a){this.applyToRange=this.type==CKEDITOR.STYLE_INLINE?b:this.type==CKEDITOR.STYLE_BLOCK?k:this.type==CKEDITOR.STYLE_OBJECT?
g:null;return this.applyToRange(a)},removeFromRange:function(a){this.removeFromRange=this.type==CKEDITOR.STYLE_INLINE?c:this.type==CKEDITOR.STYLE_BLOCK?q:this.type==CKEDITOR.STYLE_OBJECT?l:null;return this.removeFromRange(a)},applyToObject:function(a){u(a,this)},checkActive:function(a,b){switch(this.type){case CKEDITOR.STYLE_BLOCK:return this.checkElementRemovable(a.block||a.blockLimit,!0,b);case CKEDITOR.STYLE_OBJECT:case CKEDITOR.STYLE_INLINE:for(var c=a.elements,d=0,e;d<c.length;d++)if(e=c[d],
this.type!=CKEDITOR.STYLE_INLINE||e!=a.block&&e!=a.blockLimit){if(this.type==CKEDITOR.STYLE_OBJECT){var f=e.getName();if(!("string"==typeof this.element?f==this.element:f in this.element))continue}if(this.checkElementRemovable(e,!0,b))return!0}}return!1},checkApplicable:function(a,b,c){b&&b instanceof CKEDITOR.filter&&(c=b);if(c&&!c.check(this))return!1;switch(this.type){case CKEDITOR.STYLE_OBJECT:return!!a.contains(this.element);case CKEDITOR.STYLE_BLOCK:return!!a.blockLimit.getDtd()[this.element]}return!0},
checkElementMatch:function(a,b){var c=this._.definition;if(!a||!c.ignoreReadonly&&a.isReadOnly())return!1;var d=a.getName();if("string"==typeof this.element?d==this.element:d in this.element){if(!b&&!a.hasAttributes())return!0;if(d=c._AC)c=d;else{var d={},e=0,f=c.attributes;if(f)for(var g in f)e++,d[g]=f[g];if(g=CKEDITOR.style.getStyleText(c))d.style||e++,d.style=g;d._length=e;c=c._AC=d}if(c._length){for(var h in c)if("_length"!=h){e=a.getAttribute(h)||"";if("style"==h)a:{d=c[h];"string"==typeof d&&
(d=CKEDITOR.tools.parseCssText(d));"string"==typeof e&&(e=CKEDITOR.tools.parseCssText(e,!0));g=void 0;for(g in d)if(!(g in e)||e[g]!=d[g]&&"inherit"!=d[g]&&"inherit"!=e[g]){d=!1;break a}d=!0}else d=c[h]==e;if(d){if(!b)return!0}else if(b)return!1}if(b)return!0}else return!0}return!1},checkElementRemovable:function(a,b,c){if(this.checkElementMatch(a,b,c))return!0;if(b=h(this)[a.getName()]){var d;if(!(b=b.attributes))return!0;for(c=0;c<b.length;c++)if(d=b[c][0],d=a.getAttribute(d)){var e=b[c][1];if(null===
e)return!0;if("string"==typeof e){if(d==e)return!0}else if(e.test(d))return!0}}return!1},buildPreview:function(a){var b=this._.definition,c=[],d=b.element;"bdo"==d&&(d="span");var c=["\x3c",d],e=b.attributes;if(e)for(var f in e)c.push(" ",f,'\x3d"',e[f],'"');(e=CKEDITOR.style.getStyleText(b))&&c.push(' style\x3d"',e,'"');c.push("\x3e",a||b.name,"\x3c/",d,"\x3e");return c.join("")},getDefinition:function(){return this._.definition}};CKEDITOR.style.getStyleText=function(a){var b=a._ST;if(b)return b;
var b=a.styles,c=a.attributes&&a.attributes.style||"",d="";c.length&&(c=c.replace(E,";"));for(var e in b){var f=b[e],g=(e+":"+f).replace(E,";");"inherit"==f?d+=g:c+=g}c.length&&(c=CKEDITOR.tools.normalizeCssText(c,!0));return a._ST=c+d};CKEDITOR.style.customHandlers={};CKEDITOR.style.addCustomHandler=function(a){var b=function(a){this._={definition:a};this.setup&&this.setup(a)};b.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),{assignedTo:CKEDITOR.STYLE_OBJECT},
a,!0);return this.customHandlers[a.type]=b};var T=CKEDITOR.POSITION_PRECEDING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED,Q=CKEDITOR.POSITION_FOLLOWING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED})();CKEDITOR.styleCommand=function(a,d){this.requiredContent=this.allowedContent=this.style=a;CKEDITOR.tools.extend(this,d,!0)};
CKEDITOR.styleCommand.prototype.exec=function(a){a.focus();this.state==CKEDITOR.TRISTATE_OFF?a.applyStyle(this.style):this.state==CKEDITOR.TRISTATE_ON&&a.removeStyle(this.style)};CKEDITOR.stylesSet=new CKEDITOR.resourceManager("","stylesSet");CKEDITOR.addStylesSet=CKEDITOR.tools.bind(CKEDITOR.stylesSet.add,CKEDITOR.stylesSet);CKEDITOR.loadStylesSet=function(a,d,b){CKEDITOR.stylesSet.addExternal(a,d,"");CKEDITOR.stylesSet.load(a,b)};
CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{attachStyleStateChange:function(a,d){var b=this._.styleStateChangeCallbacks;b||(b=this._.styleStateChangeCallbacks=[],this.on("selectionChange",function(a){for(var d=0;d<b.length;d++){var g=b[d],l=g.style.checkActive(a.data.path,this)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF;g.fn.call(this,l)}}));b.push({style:a,fn:d})},applyStyle:function(a){a.apply(this)},removeStyle:function(a){a.remove(this)},getStylesSet:function(a){if(this._.stylesDefinitions)a(this._.stylesDefinitions);
else{var d=this,b=d.config.stylesCombo_stylesSet||d.config.stylesSet;if(!1===b)a(null);else if(b instanceof Array)d._.stylesDefinitions=b,a(b);else{b||(b="default");var b=b.split(":"),c=b[0];CKEDITOR.stylesSet.addExternal(c,b[1]?b.slice(1).join(":"):CKEDITOR.getUrl("styles.js"),"");CKEDITOR.stylesSet.load(c,function(b){d._.stylesDefinitions=b[c];a(d._.stylesDefinitions)})}}}});
CKEDITOR.dom.comment=function(a,d){"string"==typeof a&&(a=(d?d.$:document).createComment(a));CKEDITOR.dom.domObject.call(this,a)};CKEDITOR.dom.comment.prototype=new CKEDITOR.dom.node;CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype,{type:CKEDITOR.NODE_COMMENT,getOuterHtml:function(){return"\x3c!--"+this.$.nodeValue+"--\x3e"}});"use strict";
(function(){var a={},d={},b;for(b in CKEDITOR.dtd.$blockLimit)b in CKEDITOR.dtd.$list||(a[b]=1);for(b in CKEDITOR.dtd.$block)b in CKEDITOR.dtd.$blockLimit||b in CKEDITOR.dtd.$empty||(d[b]=1);CKEDITOR.dom.elementPath=function(b,e){var g=null,l=null,k=[],q=b,w;e=e||b.getDocument().getBody();do if(q.type==CKEDITOR.NODE_ELEMENT){k.push(q);if(!this.lastElement&&(this.lastElement=q,q.is(CKEDITOR.dtd.$object)||"false"==q.getAttribute("contenteditable")))continue;if(q.equals(e))break;if(!l&&(w=q.getName(),
"true"==q.getAttribute("contenteditable")?l=q:!g&&d[w]&&(g=q),a[w])){if(w=!g&&"div"==w){a:{w=q.getChildren();for(var f=0,y=w.count();f<y;f++){var A=w.getItem(f);if(A.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$block[A.getName()]){w=!0;break a}}w=!1}w=!w}w?g=q:l=q}}while(q=q.getParent());l||(l=e);this.block=g;this.blockLimit=l;this.root=e;this.elements=k}})();
CKEDITOR.dom.elementPath.prototype={compare:function(a){var d=this.elements;a=a&&a.elements;if(!a||d.length!=a.length)return!1;for(var b=0;b<d.length;b++)if(!d[b].equals(a[b]))return!1;return!0},contains:function(a,d,b){var c;"string"==typeof a&&(c=function(b){return b.getName()==a});a instanceof CKEDITOR.dom.element?c=function(b){return b.equals(a)}:CKEDITOR.tools.isArray(a)?c=function(b){return-1<CKEDITOR.tools.indexOf(a,b.getName())}:"function"==typeof a?c=a:"object"==typeof a&&(c=function(b){return b.getName()in
a});var e=this.elements,g=e.length;d&&g--;b&&(e=Array.prototype.slice.call(e,0),e.reverse());for(d=0;d<g;d++)if(c(e[d]))return e[d];return null},isContextFor:function(a){var d;return a in CKEDITOR.dtd.$block?(d=this.contains(CKEDITOR.dtd.$intermediate)||this.root.equals(this.block)&&this.block||this.blockLimit,!!d.getDtd()[a]):!0},direction:function(){return(this.block||this.blockLimit||this.root).getDirection(1)}};
CKEDITOR.dom.text=function(a,d){"string"==typeof a&&(a=(d?d.$:document).createTextNode(a));this.$=a};CKEDITOR.dom.text.prototype=new CKEDITOR.dom.node;
CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype,{type:CKEDITOR.NODE_TEXT,getLength:function(){return this.$.nodeValue.length},getText:function(){return this.$.nodeValue},setText:function(a){this.$.nodeValue=a},split:function(a){var d=this.$.parentNode,b=d.childNodes.length,c=this.getLength(),e=this.getDocument(),g=new CKEDITOR.dom.text(this.$.splitText(a),e);d.childNodes.length==b&&(a>=c?(g=e.createText(""),g.insertAfter(this)):(a=e.createText(""),a.insertAfter(g),a.remove()));return g},substring:function(a,
d){return"number"!=typeof d?this.$.nodeValue.substr(a):this.$.nodeValue.substring(a,d)}});
(function(){function a(a,c,d){var g=a.serializable,l=c[d?"endContainer":"startContainer"],k=d?"endOffset":"startOffset",q=g?c.document.getById(a.startNode):a.startNode;a=g?c.document.getById(a.endNode):a.endNode;l.equals(q.getPrevious())?(c.startOffset=c.startOffset-l.getLength()-a.getPrevious().getLength(),l=a.getNext()):l.equals(a.getPrevious())&&(c.startOffset-=l.getLength(),l=a.getNext());l.equals(q.getParent())&&c[k]++;l.equals(a.getParent())&&c[k]++;c[d?"endContainer":"startContainer"]=l;return c}
CKEDITOR.dom.rangeList=function(a){if(a instanceof CKEDITOR.dom.rangeList)return a;a?a instanceof CKEDITOR.dom.range&&(a=[a]):a=[];return CKEDITOR.tools.extend(a,d)};var d={createIterator:function(){var a=this,c=CKEDITOR.dom.walker.bookmark(),d=[],g;return{getNextRange:function(l){g=void 0===g?0:g+1;var k=a[g];if(k&&1<a.length){if(!g)for(var q=a.length-1;0<=q;q--)d.unshift(a[q].createBookmark(!0));if(l)for(var w=0;a[g+w+1];){var f=k.document;l=0;q=f.getById(d[w].endNode);for(f=f.getById(d[w+1].startNode);;){q=
q.getNextSourceNode(!1);if(f.equals(q))l=1;else if(c(q)||q.type==CKEDITOR.NODE_ELEMENT&&q.isBlockBoundary())continue;break}if(!l)break;w++}for(k.moveToBookmark(d.shift());w--;)q=a[++g],q.moveToBookmark(d.shift()),k.setEnd(q.endContainer,q.endOffset)}return k}}},createBookmarks:function(b){for(var c=[],d,g=0;g<this.length;g++){c.push(d=this[g].createBookmark(b,!0));for(var l=g+1;l<this.length;l++)this[l]=a(d,this[l]),this[l]=a(d,this[l],!0)}return c},createBookmarks2:function(a){for(var c=[],d=0;d<
this.length;d++)c.push(this[d].createBookmark2(a));return c},moveToBookmarks:function(a){for(var c=0;c<this.length;c++)this[c].moveToBookmark(a[c])}}})();
(function(){function a(){return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1]||"skins/"+CKEDITOR.skinName.split(",")[0]+"/")}function d(b){var c=CKEDITOR.skin["ua_"+b],d=CKEDITOR.env;if(c)for(var c=c.split(",").sort(function(a,b){return a>b?-1:1}),e=0,g;e<c.length;e++)if(g=c[e],d.ie&&(g.replace(/^ie/,"")==d.version||d.quirks&&"iequirks"==g)&&(g="ie"),d[g]){b+="_"+c[e];break}return CKEDITOR.getUrl(a()+b+".css")}function b(a,b){g[a]||(CKEDITOR.document.appendStyleSheet(d(a)),g[a]=1);b&&b()}function c(a){var b=
a.getById(l);b||(b=a.getHead().append("style"),b.setAttribute("id",l),b.setAttribute("type","text/css"));return b}function e(a,b,c){var d,e,g;if(CKEDITOR.env.webkit)for(b=b.split("}").slice(0,-1),e=0;e<b.length;e++)b[e]=b[e].split("{");for(var k=0;k<a.length;k++)if(CKEDITOR.env.webkit)for(e=0;e<b.length;e++){g=b[e][1];for(d=0;d<c.length;d++)g=g.replace(c[d][0],c[d][1]);a[k].$.sheet.addRule(b[e][0],g)}else{g=b;for(d=0;d<c.length;d++)g=g.replace(c[d][0],c[d][1]);CKEDITOR.env.ie&&11>CKEDITOR.env.version?
a[k].$.styleSheet.cssText+=g:a[k].$.innerHTML+=g}}var g={};CKEDITOR.skin={path:a,loadPart:function(c,d){CKEDITOR.skin.name!=CKEDITOR.skinName.split(",")[0]?CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a()+"skin.js"),function(){b(c,d)}):b(c,d)},getPath:function(a){return CKEDITOR.getUrl(d(a))},icons:{},addIcon:function(a,b,c,d){a=a.toLowerCase();this.icons[a]||(this.icons[a]={path:b,offset:c||0,bgsize:d||"16px"})},getIconStyle:function(a,b,c,d,e){var g;a&&(a=a.toLowerCase(),b&&(g=this.icons[a+"-rtl"]),
g||(g=this.icons[a]));a=c||g&&g.path||"";d=d||g&&g.offset;e=e||g&&g.bgsize||"16px";a&&(a=a.replace(/'/g,"\\'"));return a&&"background-image:url('"+CKEDITOR.getUrl(a)+"');background-position:0 "+d+"px;background-size:"+e+";"}};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{getUiColor:function(){return this.uiColor},setUiColor:function(a){var b=c(CKEDITOR.document);return(this.setUiColor=function(a){this.uiColor=a;var c=CKEDITOR.skin.chameleon,d="",g="";"function"==typeof c&&(d=c(this,"editor"),g=
c(this,"panel"));a=[[q,a]];e([b],d,a);e(k,g,a)}).call(this,a)}});var l="cke_ui_color",k=[],q=/\$color/g;CKEDITOR.on("instanceLoaded",function(a){if(!CKEDITOR.env.ie||!CKEDITOR.env.quirks){var b=a.editor;a=function(a){a=(a.data[0]||a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();if(!a.getById("cke_ui_color")){a=c(a);k.push(a);var d=b.getUiColor();d&&e([a],CKEDITOR.skin.chameleon(b,"panel"),[[q,d]])}};b.on("panelShow",a);b.on("menuShow",a);b.config.uiColor&&b.setUiColor(b.config.uiColor)}})})();
(function(){if(CKEDITOR.env.webkit)CKEDITOR.env.hc=!1;else{var a=CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e',CKEDITOR.document);a.appendTo(CKEDITOR.document.getHead());try{var d=a.getComputedStyle("border-top-color"),b=a.getComputedStyle("border-right-color");CKEDITOR.env.hc=!(!d||d!=b)}catch(c){CKEDITOR.env.hc=!1}a.remove()}CKEDITOR.env.hc&&(CKEDITOR.env.cssClass+=" cke_hc");CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
CKEDITOR.status="loaded";CKEDITOR.fireOnce("loaded");if(a=CKEDITOR._.pending)for(delete CKEDITOR._.pending,d=0;d<a.length;d++)CKEDITOR.editor.prototype.constructor.apply(a[d][0],a[d][1]),CKEDITOR.add(a[d][0])})();/*
 Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.skin.name="moono";CKEDITOR.skin.ua_editor="ie,iequirks,ie7,ie8,gecko";CKEDITOR.skin.ua_dialog="ie,iequirks,ie7,ie8";
CKEDITOR.skin.chameleon=function(){var b=function(){return function(b,e){for(var a=b.match(/[^#]./g),c=0;3>c;c++){var f=c,d;d=parseInt(a[c],16);d=("0"+(0>e?0|d*(1+e):0|d+(255-d)*e).toString(16)).slice(-2);a[f]=d}return"#"+a.join("")}}(),c=function(){var b=new CKEDITOR.template("background:#{to};background-image:linear-gradient(to bottom,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType\x3d0,startColorstr\x3d'{from}',endColorstr\x3d'{to}');");return function(c,a){return b.output({from:c,
to:a})}}(),f={editor:new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
panel:new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")};
return function(g,e){var a=g.uiColor,a={id:"."+g.id,defaultBorder:b(a,-.1),defaultGradient:c(b(a,.9),a),lightGradient:c(b(a,1),b(a,.7)),mediumGradient:c(b(a,.8),b(a,.5)),ckeButtonOn:c(b(a,.6),b(a,.7)),ckeResizer:b(a,-.4),ckeToolbarSeparator:b(a,.5),ckeColorauto:b(a,.8),dialogBody:b(a,.7),dialogTabSelected:c("#FFFFFF","#FFFFFF"),dialogTabSelectedBorder:"#FFF",elementsPathColor:b(a,-.6),elementsPathBg:a,menubuttonIcon:b(a,.5),menubuttonIconHover:b(a,.3)};return f[e].output(a).replace(/\[/g,"{").replace(/\]/g,
"}")}}();CKEDITOR.plugins.add("basicstyles",{init:function(c){var e=0,d=function(g,d,b,a){if(a){a=new CKEDITOR.style(a);var f=h[b];f.unshift(a);c.attachStyleStateChange(a,function(a){!c.readOnly&&c.getCommand(b).setState(a)});c.addCommand(b,new CKEDITOR.styleCommand(a,{contentForms:f}));c.ui.addButton&&c.ui.addButton(g,{label:d,command:b,toolbar:"basicstyles,"+(e+=10)})}},h={bold:["strong","b",["span",function(a){a=a.styles["font-weight"];return"bold"==a||700<=+a}]],italic:["em","i",["span",function(a){return"italic"==
a.styles["font-style"]}]],underline:["u",["span",function(a){return"underline"==a.styles["text-decoration"]}]],strike:["s","strike",["span",function(a){return"line-through"==a.styles["text-decoration"]}]],subscript:["sub"],superscript:["sup"]},b=c.config,a=c.lang.basicstyles;d("Bold",a.bold,"bold",b.coreStyles_bold);d("Italic",a.italic,"italic",b.coreStyles_italic);d("Underline",a.underline,"underline",b.coreStyles_underline);d("Strike",a.strike,"strike",b.coreStyles_strike);d("Subscript",a.subscript,
"subscript",b.coreStyles_subscript);d("Superscript",a.superscript,"superscript",b.coreStyles_superscript);c.setKeystroke([[CKEDITOR.CTRL+66,"bold"],[CKEDITOR.CTRL+73,"italic"],[CKEDITOR.CTRL+85,"underline"]])}});CKEDITOR.config.coreStyles_bold={element:"strong",overrides:"b"};CKEDITOR.config.coreStyles_italic={element:"em",overrides:"i"};CKEDITOR.config.coreStyles_underline={element:"u"};CKEDITOR.config.coreStyles_strike={element:"s",overrides:"strike"};CKEDITOR.config.coreStyles_subscript={element:"sub"};
CKEDITOR.config.coreStyles_superscript={element:"sup"};(function(){var m={exec:function(g){var a=g.getCommand("blockquote").state,k=g.getSelection(),c=k&&k.getRanges()[0];if(c){var h=k.createBookmarks();if(CKEDITOR.env.ie){var e=h[0].startNode,b=h[0].endNode,d;if(e&&"blockquote"==e.getParent().getName())for(d=e;d=d.getNext();)if(d.type==CKEDITOR.NODE_ELEMENT&&d.isBlockBoundary()){e.move(d,!0);break}if(b&&"blockquote"==b.getParent().getName())for(d=b;d=d.getPrevious();)if(d.type==CKEDITOR.NODE_ELEMENT&&d.isBlockBoundary()){b.move(d);break}}var f=c.createIterator();
f.enlargeBr=g.config.enterMode!=CKEDITOR.ENTER_BR;if(a==CKEDITOR.TRISTATE_OFF){for(e=[];a=f.getNextParagraph();)e.push(a);1>e.length&&(a=g.document.createElement(g.config.enterMode==CKEDITOR.ENTER_P?"p":"div"),b=h.shift(),c.insertNode(a),a.append(new CKEDITOR.dom.text("﻿",g.document)),c.moveToBookmark(b),c.selectNodeContents(a),c.collapse(!0),b=c.createBookmark(),e.push(a),h.unshift(b));d=e[0].getParent();c=[];for(b=0;b<e.length;b++)a=e[b],d=d.getCommonAncestor(a.getParent());for(a={table:1,tbody:1,
tr:1,ol:1,ul:1};a[d.getName()];)d=d.getParent();for(b=null;0<e.length;){for(a=e.shift();!a.getParent().equals(d);)a=a.getParent();a.equals(b)||c.push(a);b=a}for(;0<c.length;)if(a=c.shift(),"blockquote"==a.getName()){for(b=new CKEDITOR.dom.documentFragment(g.document);a.getFirst();)b.append(a.getFirst().remove()),e.push(b.getLast());b.replace(a)}else e.push(a);c=g.document.createElement("blockquote");for(c.insertBefore(e[0]);0<e.length;)a=e.shift(),c.append(a)}else if(a==CKEDITOR.TRISTATE_ON){b=[];
for(d={};a=f.getNextParagraph();){for(e=c=null;a.getParent();){if("blockquote"==a.getParent().getName()){c=a.getParent();e=a;break}a=a.getParent()}c&&e&&!e.getCustomData("blockquote_moveout")&&(b.push(e),CKEDITOR.dom.element.setMarker(d,e,"blockquote_moveout",!0))}CKEDITOR.dom.element.clearAllMarkers(d);a=[];e=[];for(d={};0<b.length;)f=b.shift(),c=f.getParent(),f.getPrevious()?f.getNext()?(f.breakParent(f.getParent()),e.push(f.getNext())):f.remove().insertAfter(c):f.remove().insertBefore(c),c.getCustomData("blockquote_processed")||
(e.push(c),CKEDITOR.dom.element.setMarker(d,c,"blockquote_processed",!0)),a.push(f);CKEDITOR.dom.element.clearAllMarkers(d);for(b=e.length-1;0<=b;b--){c=e[b];a:{d=c;for(var f=0,m=d.getChildCount(),l=void 0;f<m&&(l=d.getChild(f));f++)if(l.type==CKEDITOR.NODE_ELEMENT&&l.isBlockBoundary()){d=!1;break a}d=!0}d&&c.remove()}if(g.config.enterMode==CKEDITOR.ENTER_BR)for(c=!0;a.length;)if(f=a.shift(),"div"==f.getName()){b=new CKEDITOR.dom.documentFragment(g.document);!c||!f.getPrevious()||f.getPrevious().type==
CKEDITOR.NODE_ELEMENT&&f.getPrevious().isBlockBoundary()||b.append(g.document.createElement("br"));for(c=f.getNext()&&!(f.getNext().type==CKEDITOR.NODE_ELEMENT&&f.getNext().isBlockBoundary());f.getFirst();)f.getFirst().remove().appendTo(b);c&&b.append(g.document.createElement("br"));b.replace(f);c=!1}}k.selectBookmarks(h);g.focus()}},refresh:function(g,a){this.setState(g.elementPath(a.block||a.blockLimit).contains("blockquote",1)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF)},context:"blockquote",allowedContent:"blockquote",
requiredContent:"blockquote"};CKEDITOR.plugins.add("blockquote",{init:function(g){g.blockless||(g.addCommand("blockquote",m),g.ui.addButton&&g.ui.addButton("Blockquote",{label:g.lang.blockquote.toolbar,command:"blockquote",toolbar:"blocks,10"}))}})})();CKEDITOR.plugins.add("dialogui",{onLoad:function(){var h=function(b){this._||(this._={});this._["default"]=this._.initValue=b["default"]||"";this._.required=b.required||!1;for(var a=[this._],d=1;d<arguments.length;d++)a.push(arguments[d]);a.push(!0);CKEDITOR.tools.extend.apply(CKEDITOR.tools,a);return this._},v={build:function(b,a,d){return new CKEDITOR.ui.dialog.textInput(b,a,d)}},n={build:function(b,a,d){return new CKEDITOR.ui.dialog[a.type](b,a,d)}},q={isChanged:function(){return this.getValue()!=
this.getInitValue()},reset:function(b){this.setValue(this.getInitValue(),b)},setInitValue:function(){this._.initValue=this.getValue()},resetInitValue:function(){this._.initValue=this._["default"]},getInitValue:function(){return this._.initValue}},r=CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onChange:function(b,a){this._.domOnChangeRegistered||(b.on("load",function(){this.getInputElement().on("change",function(){b.parts.dialog.isVisible()&&this.fire("change",{value:this.getValue()})},
this)},this),this._.domOnChangeRegistered=!0);this.on("change",a)}},!0),x=/^on([A-Z]\w+)/,t=function(b){for(var a in b)(x.test(a)||"title"==a||"type"==a)&&delete b[a];return b},w=function(b){b=b.data.getKeystroke();b==CKEDITOR.SHIFT+CKEDITOR.ALT+36?this.setDirectionMarker("ltr"):b==CKEDITOR.SHIFT+CKEDITOR.ALT+35&&this.setDirectionMarker("rtl")};CKEDITOR.tools.extend(CKEDITOR.ui.dialog,{labeledElement:function(b,a,d,f){if(!(4>arguments.length)){var c=h.call(this,a);c.labelId=CKEDITOR.tools.getNextId()+
"_label";this._.children=[];var e={role:a.role||"presentation"};a.includeLabel&&(e["aria-labelledby"]=c.labelId);CKEDITOR.ui.dialog.uiElement.call(this,b,a,d,"div",null,e,function(){var e=[],g=a.required?" cke_required":"";"horizontal"!=a.labelLayout?e.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label'+g+'" ',' id\x3d"'+c.labelId+'"',c.inputId?' for\x3d"'+c.inputId+'"':"",(a.labelStyle?' style\x3d"'+a.labelStyle+'"':"")+"\x3e",a.label,"\x3c/label\x3e",'\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
a.controlStyle?' style\x3d"'+a.controlStyle+'"':"",' role\x3d"presentation"\x3e',f.call(this,b,a),"\x3c/div\x3e"):(g={type:"hbox",widths:a.widths,padding:0,children:[{type:"html",html:'\x3clabel class\x3d"cke_dialog_ui_labeled_label'+g+'" id\x3d"'+c.labelId+'" for\x3d"'+c.inputId+'"'+(a.labelStyle?' style\x3d"'+a.labelStyle+'"':"")+"\x3e"+CKEDITOR.tools.htmlEncode(a.label)+"\x3c/label\x3e"},{type:"html",html:'\x3cspan class\x3d"cke_dialog_ui_labeled_content"'+(a.controlStyle?' style\x3d"'+a.controlStyle+
'"':"")+"\x3e"+f.call(this,b,a)+"\x3c/span\x3e"}]},CKEDITOR.dialog._.uiElementBuilders.hbox.build(b,g,e));return e.join("")})}},textInput:function(b,a,d){if(!(3>arguments.length)){h.call(this,a);var f=this._.inputId=CKEDITOR.tools.getNextId()+"_textInput",c={"class":"cke_dialog_ui_input_"+a.type,id:f,type:a.type};a.validate&&(this.validate=a.validate);a.maxLength&&(c.maxlength=a.maxLength);a.size&&(c.size=a.size);a.inputStyle&&(c.style=a.inputStyle);var e=this,m=!1;b.on("load",function(){e.getInputElement().on("keydown",
function(a){13==a.data.getKeystroke()&&(m=!0)});e.getInputElement().on("keyup",function(a){13==a.data.getKeystroke()&&m&&(b.getButton("ok")&&setTimeout(function(){b.getButton("ok").click()},0),m=!1);e.bidi&&w.call(e,a)},null,null,1E3)});CKEDITOR.ui.dialog.labeledElement.call(this,b,a,d,function(){var b=['\x3cdiv class\x3d"cke_dialog_ui_input_',a.type,'" role\x3d"presentation"'];a.width&&b.push('style\x3d"width:'+a.width+'" ');b.push("\x3e\x3cinput ");c["aria-labelledby"]=this._.labelId;this._.required&&
(c["aria-required"]=this._.required);for(var e in c)b.push(e+'\x3d"'+c[e]+'" ');b.push(" /\x3e\x3c/div\x3e");return b.join("")})}},textarea:function(b,a,d){if(!(3>arguments.length)){h.call(this,a);var f=this,c=this._.inputId=CKEDITOR.tools.getNextId()+"_textarea",e={};a.validate&&(this.validate=a.validate);e.rows=a.rows||5;e.cols=a.cols||20;e["class"]="cke_dialog_ui_input_textarea "+(a["class"]||"");"undefined"!=typeof a.inputStyle&&(e.style=a.inputStyle);a.dir&&(e.dir=a.dir);if(f.bidi)b.on("load",
function(){f.getInputElement().on("keyup",w)},f);CKEDITOR.ui.dialog.labeledElement.call(this,b,a,d,function(){e["aria-labelledby"]=this._.labelId;this._.required&&(e["aria-required"]=this._.required);var a=['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"',c,'" '],b;for(b in e)a.push(b+'\x3d"'+CKEDITOR.tools.htmlEncode(e[b])+'" ');a.push("\x3e",CKEDITOR.tools.htmlEncode(f._["default"]),"\x3c/textarea\x3e\x3c/div\x3e");return a.join("")})}},checkbox:function(b,
a,d){if(!(3>arguments.length)){var f=h.call(this,a,{"default":!!a["default"]});a.validate&&(this.validate=a.validate);CKEDITOR.ui.dialog.uiElement.call(this,b,a,d,"span",null,null,function(){var c=CKEDITOR.tools.extend({},a,{id:a.id?a.id+"_checkbox":CKEDITOR.tools.getNextId()+"_checkbox"},!0),e=[],d=CKEDITOR.tools.getNextId()+"_label",g={"class":"cke_dialog_ui_checkbox_input",type:"checkbox","aria-labelledby":d};t(c);a["default"]&&(g.checked="checked");"undefined"!=typeof c.inputStyle&&(c.style=c.inputStyle);
f.checkbox=new CKEDITOR.ui.dialog.uiElement(b,c,e,"input",null,g);e.push(' \x3clabel id\x3d"',d,'" for\x3d"',g.id,'"'+(a.labelStyle?' style\x3d"'+a.labelStyle+'"':"")+"\x3e",CKEDITOR.tools.htmlEncode(a.label),"\x3c/label\x3e");return e.join("")})}},radio:function(b,a,d){if(!(3>arguments.length)){h.call(this,a);this._["default"]||(this._["default"]=this._.initValue=a.items[0][1]);a.validate&&(this.validate=a.validate);var f=[],c=this;a.role="radiogroup";a.includeLabel=!0;CKEDITOR.ui.dialog.labeledElement.call(this,
b,a,d,function(){for(var e=[],d=[],g=(a.id?a.id:CKEDITOR.tools.getNextId())+"_radio",k=0;k<a.items.length;k++){var l=a.items[k],h=void 0!==l[2]?l[2]:l[0],n=void 0!==l[1]?l[1]:l[0],p=CKEDITOR.tools.getNextId()+"_radio_input",q=p+"_label",p=CKEDITOR.tools.extend({},a,{id:p,title:null,type:null},!0),h=CKEDITOR.tools.extend({},p,{title:h},!0),r={type:"radio","class":"cke_dialog_ui_radio_input",name:g,value:n,"aria-labelledby":q},u=[];c._["default"]==n&&(r.checked="checked");t(p);t(h);"undefined"!=typeof p.inputStyle&&
(p.style=p.inputStyle);p.keyboardFocusable=!0;f.push(new CKEDITOR.ui.dialog.uiElement(b,p,u,"input",null,r));u.push(" ");new CKEDITOR.ui.dialog.uiElement(b,h,u,"label",null,{id:q,"for":r.id},l[0]);e.push(u.join(""))}new CKEDITOR.ui.dialog.hbox(b,f,e,d);return d.join("")});this._.children=f}},button:function(b,a,d){if(arguments.length){"function"==typeof a&&(a=a(b.getParentEditor()));h.call(this,a,{disabled:a.disabled||!1});CKEDITOR.event.implementOn(this);var f=this;b.on("load",function(){var a=this.getElement();
(function(){a.on("click",function(a){f.click();a.data.preventDefault()});a.on("keydown",function(a){a.data.getKeystroke()in{32:1}&&(f.click(),a.data.preventDefault())})})();a.unselectable()},this);var c=CKEDITOR.tools.extend({},a);delete c.style;var e=CKEDITOR.tools.getNextId()+"_label";CKEDITOR.ui.dialog.uiElement.call(this,b,c,d,"a",null,{style:a.style,href:"javascript:void(0)",title:a.label,hidefocus:"true","class":a["class"],role:"button","aria-labelledby":e},'\x3cspan id\x3d"'+e+'" class\x3d"cke_dialog_ui_button"\x3e'+
CKEDITOR.tools.htmlEncode(a.label)+"\x3c/span\x3e")}},select:function(b,a,d){if(!(3>arguments.length)){var f=h.call(this,a);a.validate&&(this.validate=a.validate);f.inputId=CKEDITOR.tools.getNextId()+"_select";CKEDITOR.ui.dialog.labeledElement.call(this,b,a,d,function(){var c=CKEDITOR.tools.extend({},a,{id:a.id?a.id+"_select":CKEDITOR.tools.getNextId()+"_select"},!0),e=[],d=[],g={id:f.inputId,"class":"cke_dialog_ui_input_select","aria-labelledby":this._.labelId};e.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
a.type,'" role\x3d"presentation"');a.width&&e.push('style\x3d"width:'+a.width+'" ');e.push("\x3e");void 0!==a.size&&(g.size=a.size);void 0!==a.multiple&&(g.multiple=a.multiple);t(c);for(var k=0,l;k<a.items.length&&(l=a.items[k]);k++)d.push('\x3coption value\x3d"',CKEDITOR.tools.htmlEncode(void 0!==l[1]?l[1]:l[0]).replace(/"/g,"\x26quot;"),'" /\x3e ',CKEDITOR.tools.htmlEncode(l[0]));"undefined"!=typeof c.inputStyle&&(c.style=c.inputStyle);f.select=new CKEDITOR.ui.dialog.uiElement(b,c,e,"select",null,
g,d.join(""));e.push("\x3c/div\x3e");return e.join("")})}},file:function(b,a,d){if(!(3>arguments.length)){void 0===a["default"]&&(a["default"]="");var f=CKEDITOR.tools.extend(h.call(this,a),{definition:a,buttons:[]});a.validate&&(this.validate=a.validate);b.on("load",function(){CKEDITOR.document.getById(f.frameId).getParent().addClass("cke_dialog_ui_input_file")});CKEDITOR.ui.dialog.labeledElement.call(this,b,a,d,function(){f.frameId=CKEDITOR.tools.getNextId()+"_fileInput";var b=['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
f.frameId,'" title\x3d"',a.label,'" src\x3d"javascript:void('];b.push(CKEDITOR.env.ie?"(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"})()":"0");b.push(')"\x3e\x3c/iframe\x3e');return b.join("")})}},fileButton:function(b,a,d){var f=this;if(!(3>arguments.length)){h.call(this,a);a.validate&&(this.validate=a.validate);var c=CKEDITOR.tools.extend({},a),e=c.onClick;c.className=(c.className?c.className+" ":"")+"cke_dialog_ui_button";c.onClick=function(c){var d=
a["for"];e&&!1===e.call(this,c)||(b.getContentElement(d[0],d[1]).submit(),this.disable())};b.on("load",function(){b.getContentElement(a["for"][0],a["for"][1])._.buttons.push(f)});CKEDITOR.ui.dialog.button.call(this,b,c,d)}},html:function(){var b=/^\s*<[\w:]+\s+([^>]*)?>/,a=/^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,d=/\/$/;return function(f,c,e){if(!(3>arguments.length)){var m=[],g=c.html;"\x3c"!=g.charAt(0)&&(g="\x3cspan\x3e"+g+"\x3c/span\x3e");var k=c.focus;if(k){var l=this.focus;this.focus=function(){("function"==
typeof k?k:l).call(this);this.fire("focus")};c.isFocusable&&(this.isFocusable=this.isFocusable);this.keyboardFocusable=!0}CKEDITOR.ui.dialog.uiElement.call(this,f,c,m,"span",null,null,"");m=m.join("").match(b);g=g.match(a)||["","",""];d.test(g[1])&&(g[1]=g[1].slice(0,-1),g[2]="/"+g[2]);e.push([g[1]," ",m[1]||"",g[2]].join(""))}}}(),fieldset:function(b,a,d,f,c){var e=c.label;this._={children:a};CKEDITOR.ui.dialog.uiElement.call(this,b,c,f,"fieldset",null,null,function(){var a=[];e&&a.push("\x3clegend"+
(c.labelStyle?' style\x3d"'+c.labelStyle+'"':"")+"\x3e"+e+"\x3c/legend\x3e");for(var b=0;b<d.length;b++)a.push(d[b]);return a.join("")})}},!0);CKEDITOR.ui.dialog.html.prototype=new CKEDITOR.ui.dialog.uiElement;CKEDITOR.ui.dialog.labeledElement.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setLabel:function(b){var a=CKEDITOR.document.getById(this._.labelId);1>a.getChildCount()?(new CKEDITOR.dom.text(b,CKEDITOR.document)).appendTo(a):a.getChild(0).$.nodeValue=b;return this},getLabel:function(){var b=
CKEDITOR.document.getById(this._.labelId);return!b||1>b.getChildCount()?"":b.getChild(0).getText()},eventProcessors:r},!0);CKEDITOR.ui.dialog.button.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{click:function(){return this._.disabled?!1:this.fire("click",{dialog:this._.dialog})},enable:function(){this._.disabled=!1;var b=this.getElement();b&&b.removeClass("cke_disabled")},disable:function(){this._.disabled=!0;this.getElement().addClass("cke_disabled")},isVisible:function(){return this.getElement().getFirst().isVisible()},
isEnabled:function(){return!this._.disabled},eventProcessors:CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onClick:function(b,a){this.on("click",function(){a.apply(this,arguments)})}},!0),accessKeyUp:function(){this.click()},accessKeyDown:function(){this.focus()},keyboardFocusable:!0},!0);CKEDITOR.ui.dialog.textInput.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){return CKEDITOR.document.getById(this._.inputId)},
focus:function(){var b=this.selectParentTab();setTimeout(function(){var a=b.getInputElement();a&&a.$.focus()},0)},select:function(){var b=this.selectParentTab();setTimeout(function(){var a=b.getInputElement();a&&(a.$.focus(),a.$.select())},0)},accessKeyUp:function(){this.select()},setValue:function(b){if(this.bidi){var a=b&&b.charAt(0);(a="‪"==a?"ltr":"‫"==a?"rtl":null)&&(b=b.slice(1));this.setDirectionMarker(a)}b||(b="");return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this,arguments)},
getValue:function(){var b=CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);if(this.bidi&&b){var a=this.getDirectionMarker();a&&(b=("ltr"==a?"‪":"‫")+b)}return b},setDirectionMarker:function(b){var a=this.getInputElement();b?a.setAttributes({dir:b,"data-cke-dir-marker":b}):this.getDirectionMarker()&&a.removeAttributes(["dir","data-cke-dir-marker"])},getDirectionMarker:function(){return this.getInputElement().data("cke-dir-marker")},keyboardFocusable:!0},q,!0);CKEDITOR.ui.dialog.textarea.prototype=
new CKEDITOR.ui.dialog.textInput;CKEDITOR.ui.dialog.select.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){return this._.select.getElement()},add:function(b,a,d){var f=new CKEDITOR.dom.element("option",this.getDialog().getParentEditor().document),c=this.getInputElement().$;f.$.text=b;f.$.value=void 0===a||null===a?b:a;void 0===d||null===d?CKEDITOR.env.ie?c.add(f.$):c.add(f.$,null):c.add(f.$,d);return this},remove:function(b){this.getInputElement().$.remove(b);
return this},clear:function(){for(var b=this.getInputElement().$;0<b.length;)b.remove(0);return this},keyboardFocusable:!0},q,!0);CKEDITOR.ui.dialog.checkbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{getInputElement:function(){return this._.checkbox.getElement()},setValue:function(b,a){this.getInputElement().$.checked=b;!a&&this.fire("change",{value:b})},getValue:function(){return this.getInputElement().$.checked},accessKeyUp:function(){this.setValue(!this.getValue())},eventProcessors:{onChange:function(b,
a){if(!CKEDITOR.env.ie||8<CKEDITOR.env.version)return r.onChange.apply(this,arguments);b.on("load",function(){var a=this._.checkbox.getElement();a.on("propertychange",function(b){b=b.data.$;"checked"==b.propertyName&&this.fire("change",{value:a.$.checked})},this)},this);this.on("change",a);return null}},keyboardFocusable:!0},q,!0);CKEDITOR.ui.dialog.radio.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setValue:function(b,a){for(var d=this._.children,f,c=0;c<d.length&&(f=d[c]);c++)f.getElement().$.checked=
f.getValue()==b;!a&&this.fire("change",{value:b})},getValue:function(){for(var b=this._.children,a=0;a<b.length;a++)if(b[a].getElement().$.checked)return b[a].getValue();return null},accessKeyUp:function(){var b=this._.children,a;for(a=0;a<b.length;a++)if(b[a].getElement().$.checked){b[a].getElement().focus();return}b[0].getElement().focus()},eventProcessors:{onChange:function(b,a){if(!CKEDITOR.env.ie||8<CKEDITOR.env.version)return r.onChange.apply(this,arguments);b.on("load",function(){for(var a=
this._.children,b=this,c=0;c<a.length;c++)a[c].getElement().on("propertychange",function(a){a=a.data.$;"checked"==a.propertyName&&this.$.checked&&b.fire("change",{value:this.getAttribute("value")})})},this);this.on("change",a);return null}}},q,!0);CKEDITOR.ui.dialog.file.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,q,{getInputElement:function(){var b=CKEDITOR.document.getById(this._.frameId).getFrameDocument();return 0<b.$.forms.length?new CKEDITOR.dom.element(b.$.forms[0].elements[0]):
this.getElement()},submit:function(){this.getInputElement().getParent().$.submit();return this},getAction:function(){return this.getInputElement().getParent().$.action},registerEvents:function(b){var a=/^on([A-Z]\w+)/,d,f=function(a,b,c,d){a.on("formLoaded",function(){a.getInputElement().on(c,d,a)})},c;for(c in b)if(d=c.match(a))this.eventProcessors[c]?this.eventProcessors[c].call(this,this._.dialog,b[c]):f(this,this._.dialog,d[1].toLowerCase(),b[c]);return this},reset:function(){function b(){d.$.open();
var b="";f.size&&(b=f.size-(CKEDITOR.env.ie?7:0));var h=a.frameId+"_input";d.$.write(['\x3chtml dir\x3d"'+g+'" lang\x3d"'+k+'"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e','\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"'+g+'" lang\x3d"'+k+'" action\x3d"',CKEDITOR.tools.htmlEncode(f.action),'"\x3e\x3clabel id\x3d"',a.labelId,'" for\x3d"',h,'" style\x3d"display:none"\x3e',CKEDITOR.tools.htmlEncode(f.label),
'\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"',h,'" aria-labelledby\x3d"',a.labelId,'" type\x3d"file" name\x3d"',CKEDITOR.tools.htmlEncode(f.id||"cke_upload"),'" size\x3d"',CKEDITOR.tools.htmlEncode(0<b?b:""),'" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e',CKEDITOR.env.ie?"("+CKEDITOR.tools.fixDomain+")();":"","window.parent.CKEDITOR.tools.callFunction("+e+");","window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction("+m+")}","\x3c/script\x3e"].join(""));
d.$.close();for(b=0;b<c.length;b++)c[b].enable()}var a=this._,d=CKEDITOR.document.getById(a.frameId).getFrameDocument(),f=a.definition,c=a.buttons,e=this.formLoadedNumber,m=this.formUnloadNumber,g=a.dialog._.editor.lang.dir,k=a.dialog._.editor.langCode;e||(e=this.formLoadedNumber=CKEDITOR.tools.addFunction(function(){this.fire("formLoaded")},this),m=this.formUnloadNumber=CKEDITOR.tools.addFunction(function(){this.getInputElement().clearCustomData()},this),this.getDialog()._.editor.on("destroy",function(){CKEDITOR.tools.removeFunction(e);
CKEDITOR.tools.removeFunction(m)}));CKEDITOR.env.gecko?setTimeout(b,500):b()},getValue:function(){return this.getInputElement().$.value||""},setInitValue:function(){this._.initValue=""},eventProcessors:{onChange:function(b,a){this._.domOnChangeRegistered||(this.on("formLoaded",function(){this.getInputElement().on("change",function(){this.fire("change",{value:this.getValue()})},this)},this),this._.domOnChangeRegistered=!0);this.on("change",a)}},keyboardFocusable:!0},!0);CKEDITOR.ui.dialog.fileButton.prototype=
new CKEDITOR.ui.dialog.button;CKEDITOR.ui.dialog.fieldset.prototype=CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);CKEDITOR.dialog.addUIElement("text",v);CKEDITOR.dialog.addUIElement("password",v);CKEDITOR.dialog.addUIElement("textarea",n);CKEDITOR.dialog.addUIElement("checkbox",n);CKEDITOR.dialog.addUIElement("radio",n);CKEDITOR.dialog.addUIElement("button",n);CKEDITOR.dialog.addUIElement("select",n);CKEDITOR.dialog.addUIElement("file",n);CKEDITOR.dialog.addUIElement("fileButton",n);CKEDITOR.dialog.addUIElement("html",
n);CKEDITOR.dialog.addUIElement("fieldset",{build:function(b,a,d){for(var f=a.children,c,e=[],h=[],g=0;g<f.length&&(c=f[g]);g++){var k=[];e.push(k);h.push(CKEDITOR.dialog._.uiElementBuilders[c.type].build(b,c,k))}return new CKEDITOR.ui.dialog[a.type](b,h,e,d,a)}})}});CKEDITOR.DIALOG_RESIZE_NONE=0;CKEDITOR.DIALOG_RESIZE_WIDTH=1;CKEDITOR.DIALOG_RESIZE_HEIGHT=2;CKEDITOR.DIALOG_RESIZE_BOTH=3;CKEDITOR.DIALOG_STATE_IDLE=1;CKEDITOR.DIALOG_STATE_BUSY=2;
(function(){function x(){for(var a=this._.tabIdList.length,b=CKEDITOR.tools.indexOf(this._.tabIdList,this._.currentTabId)+a,c=b-1;c>b-a;c--)if(this._.tabs[this._.tabIdList[c%a]][0].$.offsetHeight)return this._.tabIdList[c%a];return null}function A(){for(var a=this._.tabIdList.length,b=CKEDITOR.tools.indexOf(this._.tabIdList,this._.currentTabId),c=b+1;c<b+a;c++)if(this._.tabs[this._.tabIdList[c%a]][0].$.offsetHeight)return this._.tabIdList[c%a];return null}function K(a,b){for(var c=a.$.getElementsByTagName("input"),
d=0,e=c.length;d<e;d++){var f=new CKEDITOR.dom.element(c[d]);"text"==f.getAttribute("type").toLowerCase()&&(b?(f.setAttribute("value",f.getCustomData("fake_value")||""),f.removeCustomData("fake_value")):(f.setCustomData("fake_value",f.getAttribute("value")),f.setAttribute("value","")))}}function T(a,b){var c=this.getInputElement();c&&(a?c.removeAttribute("aria-invalid"):c.setAttribute("aria-invalid",!0));a||(this.select?this.select():this.focus());b&&alert(b);this.fire("validated",{valid:a,msg:b})}
function U(){var a=this.getInputElement();a&&a.removeAttribute("aria-invalid")}function V(a){var b=CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog",W).output({id:CKEDITOR.tools.getNextNumber(),editorId:a.id,langDir:a.lang.dir,langCode:a.langCode,editorDialogClass:"cke_editor_"+a.name.replace(/\./g,"\\.")+"_dialog",closeTitle:a.lang.common.close,hidpi:CKEDITOR.env.hidpi?"cke_hidpi":""})),c=b.getChild([0,0,0,0,0]),d=c.getChild(0),e=c.getChild(1);a.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);
!CKEDITOR.env.ie||CKEDITOR.env.quirks||CKEDITOR.env.edge||(a="javascript:void(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"}())",CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"'+a+'" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent()));d.unselectable();e.unselectable();return{element:b,parts:{dialog:b.getChild(0),title:d,close:e,tabs:c.getChild(2),contents:c.getChild([3,0,0,0]),
footer:c.getChild([3,0,1,0])}}}function L(a,b,c){this.element=b;this.focusIndex=c;this.tabIndex=0;this.isFocusable=function(){return!b.getAttribute("disabled")&&b.isVisible()};this.focus=function(){a._.currentFocusIndex=this.focusIndex;this.element.focus()};b.on("keydown",function(a){a.data.getKeystroke()in{32:1,13:1}&&this.fire("click")});b.on("focus",function(){this.fire("mouseover")});b.on("blur",function(){this.fire("mouseout")})}function X(a){function b(){a.layout()}var c=CKEDITOR.document.getWindow();
c.on("resize",b);a.on("hide",function(){c.removeListener("resize",b)})}function M(a,b){this._={dialog:a};CKEDITOR.tools.extend(this,b)}function Y(a){function b(b){var c=a.getSize(),k=CKEDITOR.document.getWindow().getViewPaneSize(),q=b.data.$.screenX,n=b.data.$.screenY,r=q-d.x,l=n-d.y;d={x:q,y:n};e.x+=r;e.y+=l;a.move(e.x+h[3]<g?-h[3]:e.x-h[1]>k.width-c.width-g?k.width-c.width+("rtl"==f.lang.dir?0:h[1]):e.x,e.y+h[0]<g?-h[0]:e.y-h[2]>k.height-c.height-g?k.height-c.height+h[2]:e.y,1);b.data.preventDefault()}
function c(){CKEDITOR.document.removeListener("mousemove",b);CKEDITOR.document.removeListener("mouseup",c);if(CKEDITOR.env.ie6Compat){var a=u.getChild(0).getFrameDocument();a.removeListener("mousemove",b);a.removeListener("mouseup",c)}}var d=null,e=null,f=a.getParentEditor(),g=f.config.dialog_magnetDistance,h=CKEDITOR.skin.margins||[0,0,0,0];"undefined"==typeof g&&(g=20);a.parts.title.on("mousedown",function(g){d={x:g.data.$.screenX,y:g.data.$.screenY};CKEDITOR.document.on("mousemove",b);CKEDITOR.document.on("mouseup",
c);e=a.getPosition();if(CKEDITOR.env.ie6Compat){var f=u.getChild(0).getFrameDocument();f.on("mousemove",b);f.on("mouseup",c)}g.data.preventDefault()},a)}function Z(a){function b(b){var c="rtl"==f.lang.dir,n=k.width,q=k.height,G=n+(b.data.$.screenX-m.x)*(c?-1:1)*(a._.moved?1:2),H=q+(b.data.$.screenY-m.y)*(a._.moved?1:2),B=a._.element.getFirst(),B=c&&B.getComputedStyle("right"),C=a.getPosition();C.y+H>p.height&&(H=p.height-C.y);(c?B:C.x)+G>p.width&&(G=p.width-(c?B:C.x));if(e==CKEDITOR.DIALOG_RESIZE_WIDTH||
e==CKEDITOR.DIALOG_RESIZE_BOTH)n=Math.max(d.minWidth||0,G-g);if(e==CKEDITOR.DIALOG_RESIZE_HEIGHT||e==CKEDITOR.DIALOG_RESIZE_BOTH)q=Math.max(d.minHeight||0,H-h);a.resize(n,q);a._.moved||a.layout();b.data.preventDefault()}function c(){CKEDITOR.document.removeListener("mouseup",c);CKEDITOR.document.removeListener("mousemove",b);q&&(q.remove(),q=null);if(CKEDITOR.env.ie6Compat){var a=u.getChild(0).getFrameDocument();a.removeListener("mouseup",c);a.removeListener("mousemove",b)}}var d=a.definition,e=d.resizable;
if(e!=CKEDITOR.DIALOG_RESIZE_NONE){var f=a.getParentEditor(),g,h,p,m,k,q,n=CKEDITOR.tools.addFunction(function(e){k=a.getSize();var d=a.parts.contents;d.$.getElementsByTagName("iframe").length&&(q=CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'),d.append(q));h=k.height-a.parts.contents.getSize("height",!(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.quirks));g=k.width-a.parts.contents.getSize("width",
1);m={x:e.screenX,y:e.screenY};p=CKEDITOR.document.getWindow().getViewPaneSize();CKEDITOR.document.on("mousemove",b);CKEDITOR.document.on("mouseup",c);CKEDITOR.env.ie6Compat&&(d=u.getChild(0).getFrameDocument(),d.on("mousemove",b),d.on("mouseup",c));e.preventDefault&&e.preventDefault()});a.on("load",function(){var b="";e==CKEDITOR.DIALOG_RESIZE_WIDTH?b=" cke_resizer_horizontal":e==CKEDITOR.DIALOG_RESIZE_HEIGHT&&(b=" cke_resizer_vertical");b=CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer'+
b+" cke_resizer_"+f.lang.dir+'" title\x3d"'+CKEDITOR.tools.htmlEncode(f.lang.common.resize)+'" onmousedown\x3d"CKEDITOR.tools.callFunction('+n+', event )"\x3e'+("ltr"==f.lang.dir?"◢":"◣")+"\x3c/div\x3e");a.parts.footer.append(b,1)});f.on("destroy",function(){CKEDITOR.tools.removeFunction(n)})}}function I(a){a.data.preventDefault(1)}function N(a){var b=CKEDITOR.document.getWindow(),c=a.config,d=c.dialog_backgroundCoverColor||"white",e=c.dialog_backgroundCoverOpacity,f=c.baseFloatZIndex,c=CKEDITOR.tools.genKey(d,
e,f),g=z[c];g?g.show():(f=['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ',CKEDITOR.env.ie6Compat?"absolute":"fixed","; z-index: ",f,"; top: 0px; left: 0px; ",CKEDITOR.env.ie6Compat?"":"background-color: "+d,'" class\x3d"cke_dialog_background_cover"\x3e'],CKEDITOR.env.ie6Compat&&(d="\x3chtml\x3e\x3cbody style\x3d\\'background-color:"+d+";\\'\x3e\x3c/body\x3e\x3c/html\x3e",f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'),f.push("void((function(){"+
encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.write( '"+d+"' );document.close();")+"})())"),f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')),f.push("\x3c/div\x3e"),g=CKEDITOR.dom.element.createFromHtml(f.join("")),g.setOpacity(void 0!==e?e:.5),g.on("keydown",I),g.on("keypress",I),g.on("keyup",I),g.appendTo(CKEDITOR.document.getBody()),z[c]=g);a.focusManager.add(g);
u=g;a=function(){var a=b.getViewPaneSize();g.setStyles({width:a.width+"px",height:a.height+"px"})};var h=function(){var a=b.getScrollPosition(),c=CKEDITOR.dialog._.currentTop;g.setStyles({left:a.x+"px",top:a.y+"px"});if(c){do a=c.getPosition(),c.move(a.x,a.y);while(c=c._.parentDialog)}};J=a;b.on("resize",a);a();CKEDITOR.env.mac&&CKEDITOR.env.webkit||g.focus();if(CKEDITOR.env.ie6Compat){var p=function(){h();arguments.callee.prevScrollHandler.apply(this,arguments)};b.$.setTimeout(function(){p.prevScrollHandler=
window.onscroll||function(){};window.onscroll=p},0);h()}}function O(a){u&&(a.focusManager.remove(u),a=CKEDITOR.document.getWindow(),u.hide(),a.removeListener("resize",J),CKEDITOR.env.ie6Compat&&a.$.setTimeout(function(){window.onscroll=window.onscroll&&window.onscroll.prevScrollHandler||null},0),J=null)}var v=CKEDITOR.tools.cssLength,W='\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog '+
CKEDITOR.env.cssClass+' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
CKEDITOR.dialog=function(a,b){function c(){var a=l._.focusList;a.sort(function(a,b){return a.tabIndex!=b.tabIndex?b.tabIndex-a.tabIndex:a.focusIndex-b.focusIndex});for(var b=a.length,c=0;c<b;c++)a[c].focusIndex=c}function d(a){var b=l._.focusList;a=a||0;if(!(1>b.length)){var c=l._.currentFocusIndex;l._.tabBarMode&&0>a&&(c=0);try{b[c].getInputElement().$.blur()}catch(e){}var d=c,g=1<l._.pageCount;do{d+=a;if(g&&!l._.tabBarMode&&(d==b.length||-1==d)){l._.tabBarMode=!0;l._.tabs[l._.currentTabId][0].focus();
l._.currentFocusIndex=-1;return}d=(d+b.length)%b.length;if(d==c)break}while(a&&!b[d].isFocusable());b[d].focus();"text"==b[d].type&&b[d].select()}}function e(b){if(l==CKEDITOR.dialog._.currentTop){var c=b.data.getKeystroke(),e="rtl"==a.lang.dir,g=[37,38,39,40];q=n=0;if(9==c||c==CKEDITOR.SHIFT+9)d(c==CKEDITOR.SHIFT+9?-1:1),q=1;else if(c==CKEDITOR.ALT+121&&!l._.tabBarMode&&1<l.getPageCount())l._.tabBarMode=!0,l._.tabs[l._.currentTabId][0].focus(),l._.currentFocusIndex=-1,q=1;else if(-1!=CKEDITOR.tools.indexOf(g,
c)&&l._.tabBarMode)c=-1!=CKEDITOR.tools.indexOf([e?39:37,38],c)?x.call(l):A.call(l),l.selectPage(c),l._.tabs[c][0].focus(),q=1;else if(13!=c&&32!=c||!l._.tabBarMode)if(13==c)c=b.data.getTarget(),c.is("a","button","select","textarea")||c.is("input")&&"button"==c.$.type||((c=this.getButton("ok"))&&CKEDITOR.tools.setTimeout(c.click,0,c),q=1),n=1;else if(27==c)(c=this.getButton("cancel"))?CKEDITOR.tools.setTimeout(c.click,0,c):!1!==this.fire("cancel",{hide:!0}).hide&&this.hide(),n=1;else return;else this.selectPage(this._.currentTabId),
this._.tabBarMode=!1,this._.currentFocusIndex=-1,d(1),q=1;f(b)}}function f(a){q?a.data.preventDefault(1):n&&a.data.stopPropagation()}var g=CKEDITOR.dialog._.dialogDefinitions[b],h=CKEDITOR.tools.clone(aa),p=a.config.dialog_buttonsOrder||"OS",m=a.lang.dir,k={},q,n;("OS"==p&&CKEDITOR.env.mac||"rtl"==p&&"ltr"==m||"ltr"==p&&"rtl"==m)&&h.buttons.reverse();g=CKEDITOR.tools.extend(g(a),h);g=CKEDITOR.tools.clone(g);g=new P(this,g);h=V(a);this._={editor:a,element:h.element,name:b,contentSize:{width:0,height:0},
size:{width:0,height:0},contents:{},buttons:{},accessKeyMap:{},tabs:{},tabIdList:[],currentTabId:null,currentTabIndex:null,pageCount:0,lastTab:null,tabBarMode:!1,focusList:[],currentFocusIndex:0,hasFocus:!1};this.parts=h.parts;CKEDITOR.tools.setTimeout(function(){a.fire("ariaWidget",this.parts.contents)},0,this);h={position:CKEDITOR.env.ie6Compat?"absolute":"fixed",top:0,visibility:"hidden"};h["rtl"==m?"right":"left"]=0;this.parts.dialog.setStyles(h);CKEDITOR.event.call(this);this.definition=g=CKEDITOR.fire("dialogDefinition",
{name:b,definition:g},a).definition;if(!("removeDialogTabs"in a._)&&a.config.removeDialogTabs){h=a.config.removeDialogTabs.split(";");for(m=0;m<h.length;m++)if(p=h[m].split(":"),2==p.length){var r=p[0];k[r]||(k[r]=[]);k[r].push(p[1])}a._.removeDialogTabs=k}if(a._.removeDialogTabs&&(k=a._.removeDialogTabs[b]))for(m=0;m<k.length;m++)g.removeContents(k[m]);if(g.onLoad)this.on("load",g.onLoad);if(g.onShow)this.on("show",g.onShow);if(g.onHide)this.on("hide",g.onHide);if(g.onOk)this.on("ok",function(b){a.fire("saveSnapshot");
setTimeout(function(){a.fire("saveSnapshot")},0);!1===g.onOk.call(this,b)&&(b.data.hide=!1)});this.state=CKEDITOR.DIALOG_STATE_IDLE;if(g.onCancel)this.on("cancel",function(a){!1===g.onCancel.call(this,a)&&(a.data.hide=!1)});var l=this,t=function(a){var b=l._.contents,c=!1,d;for(d in b)for(var e in b[d])if(c=a.call(this,b[d][e]))return};this.on("ok",function(a){t(function(b){if(b.validate){var c=b.validate(this),d="string"==typeof c||!1===c;d&&(a.data.hide=!1,a.stop());T.call(b,!d,"string"==typeof c?
c:void 0);return d}})},this,null,0);this.on("cancel",function(b){t(function(c){if(c.isChanged())return a.config.dialog_noConfirmCancel||confirm(a.lang.common.confirmCancel)||(b.data.hide=!1),!0})},this,null,0);this.parts.close.on("click",function(a){!1!==this.fire("cancel",{hide:!0}).hide&&this.hide();a.data.preventDefault()},this);this.changeFocus=d;var y=this._.element;a.focusManager.add(y,1);this.on("show",function(){y.on("keydown",e,this);if(CKEDITOR.env.gecko)y.on("keypress",f,this)});this.on("hide",
function(){y.removeListener("keydown",e);CKEDITOR.env.gecko&&y.removeListener("keypress",f);t(function(a){U.apply(a)})});this.on("iframeAdded",function(a){(new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown",e,this,null,0)});this.on("show",function(){c();var b=1<l._.pageCount;a.config.dialog_startupFocusTab&&b?(l._.tabBarMode=!0,l._.tabs[l._.currentTabId][0].focus(),l._.currentFocusIndex=-1):this._.hasFocus||(this._.currentFocusIndex=b?-1:this._.focusList.length-1,g.onFocus?
(b=g.onFocus.call(this))&&b.focus():d(1))},this,null,4294967295);if(CKEDITOR.env.ie6Compat)this.on("load",function(){var a=this.getElement(),b=a.getFirst();b.remove();b.appendTo(a)},this);Y(this);Z(this);(new CKEDITOR.dom.text(g.title,CKEDITOR.document)).appendTo(this.parts.title);for(m=0;m<g.contents.length;m++)(k=g.contents[m])&&this.addPage(k);this.parts.tabs.on("click",function(a){var b=a.data.getTarget();b.hasClass("cke_dialog_tab")&&(b=b.$.id,this.selectPage(b.substring(4,b.lastIndexOf("_"))),
this._.tabBarMode&&(this._.tabBarMode=!1,this._.currentFocusIndex=-1,d(1)),a.data.preventDefault())},this);m=[];k=CKEDITOR.dialog._.uiElementBuilders.hbox.build(this,{type:"hbox",className:"cke_dialog_footer_buttons",widths:[],children:g.buttons},m).getChild();this.parts.footer.setHtml(m.join(""));for(m=0;m<k.length;m++)this._.buttons[k[m].id]=k[m]};CKEDITOR.dialog.prototype={destroy:function(){this.hide();this._.element.remove()},resize:function(){return function(a,b){this._.contentSize&&this._.contentSize.width==
a&&this._.contentSize.height==b||(CKEDITOR.dialog.fire("resize",{dialog:this,width:a,height:b},this._.editor),this.fire("resize",{width:a,height:b},this._.editor),this.parts.contents.setStyles({width:a+"px",height:b+"px"}),"rtl"==this._.editor.lang.dir&&this._.position&&(this._.position.x=CKEDITOR.document.getWindow().getViewPaneSize().width-this._.contentSize.width-parseInt(this._.element.getFirst().getStyle("right"),10)),this._.contentSize={width:a,height:b})}}(),getSize:function(){var a=this._.element.getFirst();
return{width:a.$.offsetWidth||0,height:a.$.offsetHeight||0}},move:function(a,b,c){var d=this._.element.getFirst(),e="rtl"==this._.editor.lang.dir,f="fixed"==d.getComputedStyle("position");CKEDITOR.env.ie&&d.setStyle("zoom","100%");f&&this._.position&&this._.position.x==a&&this._.position.y==b||(this._.position={x:a,y:b},f||(f=CKEDITOR.document.getWindow().getScrollPosition(),a+=f.x,b+=f.y),e&&(f=this.getSize(),a=CKEDITOR.document.getWindow().getViewPaneSize().width-f.width-a),b={top:(0<b?b:0)+"px"},
b[e?"right":"left"]=(0<a?a:0)+"px",d.setStyles(b),c&&(this._.moved=1))},getPosition:function(){return CKEDITOR.tools.extend({},this._.position)},show:function(){var a=this._.element,b=this.definition;a.getParent()&&a.getParent().equals(CKEDITOR.document.getBody())?a.setStyle("display","block"):a.appendTo(CKEDITOR.document.getBody());this.resize(this._.contentSize&&this._.contentSize.width||b.width||b.minWidth,this._.contentSize&&this._.contentSize.height||b.height||b.minHeight);this.reset();this.selectPage(this.definition.contents[0].id);
null===CKEDITOR.dialog._.currentZIndex&&(CKEDITOR.dialog._.currentZIndex=this._.editor.config.baseFloatZIndex);this._.element.getFirst().setStyle("z-index",CKEDITOR.dialog._.currentZIndex+=10);null===CKEDITOR.dialog._.currentTop?(CKEDITOR.dialog._.currentTop=this,this._.parentDialog=null,N(this._.editor)):(this._.parentDialog=CKEDITOR.dialog._.currentTop,this._.parentDialog.getElement().getFirst().$.style.zIndex-=Math.floor(this._.editor.config.baseFloatZIndex/2),CKEDITOR.dialog._.currentTop=this);
a.on("keydown",Q);a.on("keyup",R);this._.hasFocus=!1;for(var c in b.contents)if(b.contents[c]){var a=b.contents[c],d=this._.tabs[a.id],e=a.requiredContent,f=0;if(d){for(var g in this._.contents[a.id]){var h=this._.contents[a.id][g];"hbox"!=h.type&&"vbox"!=h.type&&h.getInputElement()&&(h.requiredContent&&!this._.editor.activeFilter.check(h.requiredContent)?h.disable():(h.enable(),f++))}!f||e&&!this._.editor.activeFilter.check(e)?d[0].addClass("cke_dialog_tab_disabled"):d[0].removeClass("cke_dialog_tab_disabled")}}CKEDITOR.tools.setTimeout(function(){this.layout();
X(this);this.parts.dialog.setStyle("visibility","");this.fireOnce("load",{});CKEDITOR.ui.fire("ready",this);this.fire("show",{});this._.editor.fire("dialogShow",this);this._.parentDialog||this._.editor.focusManager.lock();this.foreach(function(a){a.setInitValue&&a.setInitValue()})},100,this)},layout:function(){var a=this.parts.dialog,b=this.getSize(),c=CKEDITOR.document.getWindow().getViewPaneSize(),d=(c.width-b.width)/2,e=(c.height-b.height)/2;CKEDITOR.env.ie6Compat||(b.height+(0<e?e:0)>c.height||
b.width+(0<d?d:0)>c.width?a.setStyle("position","absolute"):a.setStyle("position","fixed"));this.move(this._.moved?this._.position.x:d,this._.moved?this._.position.y:e)},foreach:function(a){for(var b in this._.contents)for(var c in this._.contents[b])a.call(this,this._.contents[b][c]);return this},reset:function(){var a=function(a){a.reset&&a.reset(1)};return function(){this.foreach(a);return this}}(),setupContent:function(){var a=arguments;this.foreach(function(b){b.setup&&b.setup.apply(b,a)})},
commitContent:function(){var a=arguments;this.foreach(function(b){CKEDITOR.env.ie&&this._.currentFocusIndex==b.focusIndex&&b.getInputElement().$.blur();b.commit&&b.commit.apply(b,a)})},hide:function(){if(this.parts.dialog.isVisible()){this.fire("hide",{});this._.editor.fire("dialogHide",this);this.selectPage(this._.tabIdList[0]);var a=this._.element;a.setStyle("display","none");this.parts.dialog.setStyle("visibility","hidden");for(ba(this);CKEDITOR.dialog._.currentTop!=this;)CKEDITOR.dialog._.currentTop.hide();
if(this._.parentDialog){var b=this._.parentDialog.getElement().getFirst();b.setStyle("z-index",parseInt(b.$.style.zIndex,10)+Math.floor(this._.editor.config.baseFloatZIndex/2))}else O(this._.editor);if(CKEDITOR.dialog._.currentTop=this._.parentDialog)CKEDITOR.dialog._.currentZIndex-=10;else{CKEDITOR.dialog._.currentZIndex=null;a.removeListener("keydown",Q);a.removeListener("keyup",R);var c=this._.editor;c.focus();setTimeout(function(){c.focusManager.unlock();CKEDITOR.env.iOS&&c.window.focus()},0)}delete this._.parentDialog;
this.foreach(function(a){a.resetInitValue&&a.resetInitValue()});this.setState(CKEDITOR.DIALOG_STATE_IDLE)}},addPage:function(a){if(!a.requiredContent||this._.editor.filter.check(a.requiredContent)){for(var b=[],c=a.label?' title\x3d"'+CKEDITOR.tools.htmlEncode(a.label)+'"':"",d=CKEDITOR.dialog._.uiElementBuilders.vbox.build(this,{type:"vbox",className:"cke_dialog_page_contents",children:a.elements,expand:!!a.expand,padding:a.padding,style:a.style||"width: 100%;"},b),e=this._.contents[a.id]={},f=d.getChild(),
g=0;d=f.shift();)d.notAllowed||"hbox"==d.type||"vbox"==d.type||g++,e[d.id]=d,"function"==typeof d.getChild&&f.push.apply(f,d.getChild());g||(a.hidden=!0);b=CKEDITOR.dom.element.createFromHtml(b.join(""));b.setAttribute("role","tabpanel");d=CKEDITOR.env;e="cke_"+a.id+"_"+CKEDITOR.tools.getNextNumber();c=CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"',0<this._.pageCount?" cke_last":"cke_first",c,a.hidden?' style\x3d"display:none"':"",' id\x3d"',e,'"',d.gecko&&!d.hc?"":' href\x3d"javascript:void(0)"',
' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e',a.label,"\x3c/a\x3e"].join(""));b.setAttribute("aria-labelledby",e);this._.tabs[a.id]=[c,b];this._.tabIdList.push(a.id);!a.hidden&&this._.pageCount++;this._.lastTab=c;this.updateStyle();b.setAttribute("name",a.id);b.appendTo(this.parts.contents);c.unselectable();this.parts.tabs.append(c);a.accessKey&&(S(this,this,"CTRL+"+a.accessKey,ca,da),this._.accessKeyMap["CTRL+"+a.accessKey]=a.id)}},selectPage:function(a){if(this._.currentTabId!=a&&!this._.tabs[a][0].hasClass("cke_dialog_tab_disabled")&&
!1!==this.fire("selectPage",{page:a,currentPage:this._.currentTabId})){for(var b in this._.tabs){var c=this._.tabs[b][0],d=this._.tabs[b][1];b!=a&&(c.removeClass("cke_dialog_tab_selected"),d.hide());d.setAttribute("aria-hidden",b!=a)}var e=this._.tabs[a];e[0].addClass("cke_dialog_tab_selected");CKEDITOR.env.ie6Compat||CKEDITOR.env.ie7Compat?(K(e[1]),e[1].show(),setTimeout(function(){K(e[1],1)},0)):e[1].show();this._.currentTabId=a;this._.currentTabIndex=CKEDITOR.tools.indexOf(this._.tabIdList,a)}},
updateStyle:function(){this.parts.dialog[(1===this._.pageCount?"add":"remove")+"Class"]("cke_single_page")},hidePage:function(a){var b=this._.tabs[a]&&this._.tabs[a][0];b&&1!=this._.pageCount&&b.isVisible()&&(a==this._.currentTabId&&this.selectPage(x.call(this)),b.hide(),this._.pageCount--,this.updateStyle())},showPage:function(a){if(a=this._.tabs[a]&&this._.tabs[a][0])a.show(),this._.pageCount++,this.updateStyle()},getElement:function(){return this._.element},getName:function(){return this._.name},
getContentElement:function(a,b){var c=this._.contents[a];return c&&c[b]},getValueOf:function(a,b){return this.getContentElement(a,b).getValue()},setValueOf:function(a,b,c){return this.getContentElement(a,b).setValue(c)},getButton:function(a){return this._.buttons[a]},click:function(a){return this._.buttons[a].click()},disableButton:function(a){return this._.buttons[a].disable()},enableButton:function(a){return this._.buttons[a].enable()},getPageCount:function(){return this._.pageCount},getParentEditor:function(){return this._.editor},
getSelectedElement:function(){return this.getParentEditor().getSelection().getSelectedElement()},addFocusable:function(a,b){if("undefined"==typeof b)b=this._.focusList.length,this._.focusList.push(new L(this,a,b));else{this._.focusList.splice(b,0,new L(this,a,b));for(var c=b+1;c<this._.focusList.length;c++)this._.focusList[c].focusIndex++}},setState:function(a){if(this.state!=a){this.state=a;if(a==CKEDITOR.DIALOG_STATE_BUSY){if(!this.parts.spinner){var b=this.getParentEditor().lang.dir,c={attributes:{"class":"cke_dialog_spinner"},
styles:{"float":"rtl"==b?"right":"left"}};c.styles["margin-"+("rtl"==b?"left":"right")]="8px";this.parts.spinner=CKEDITOR.document.createElement("div",c);this.parts.spinner.setHtml("\x26#8987;");this.parts.spinner.appendTo(this.parts.title,1)}this.parts.spinner.show();this.getButton("ok").disable()}else a==CKEDITOR.DIALOG_STATE_IDLE&&(this.parts.spinner&&this.parts.spinner.hide(),this.getButton("ok").enable());this.fire("state",a)}}};CKEDITOR.tools.extend(CKEDITOR.dialog,{add:function(a,b){this._.dialogDefinitions[a]&&
"function"!=typeof b||(this._.dialogDefinitions[a]=b)},exists:function(a){return!!this._.dialogDefinitions[a]},getCurrent:function(){return CKEDITOR.dialog._.currentTop},isTabEnabled:function(a,b,c){a=a.config.removeDialogTabs;return!(a&&a.match(new RegExp("(?:^|;)"+b+":"+c+"(?:$|;)","i")))},okButton:function(){var a=function(a,c){c=c||{};return CKEDITOR.tools.extend({id:"ok",type:"button",label:a.lang.common.ok,"class":"cke_dialog_ui_button_ok",onClick:function(a){a=a.data.dialog;!1!==a.fire("ok",
{hide:!0}).hide&&a.hide()}},c,!0)};a.type="button";a.override=function(b){return CKEDITOR.tools.extend(function(c){return a(c,b)},{type:"button"},!0)};return a}(),cancelButton:function(){var a=function(a,c){c=c||{};return CKEDITOR.tools.extend({id:"cancel",type:"button",label:a.lang.common.cancel,"class":"cke_dialog_ui_button_cancel",onClick:function(a){a=a.data.dialog;!1!==a.fire("cancel",{hide:!0}).hide&&a.hide()}},c,!0)};a.type="button";a.override=function(b){return CKEDITOR.tools.extend(function(c){return a(c,
b)},{type:"button"},!0)};return a}(),addUIElement:function(a,b){this._.uiElementBuilders[a]=b}});CKEDITOR.dialog._={uiElementBuilders:{},dialogDefinitions:{},currentTop:null,currentZIndex:null};CKEDITOR.event.implementOn(CKEDITOR.dialog);CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);var aa={resizable:CKEDITOR.DIALOG_RESIZE_BOTH,minWidth:600,minHeight:400,buttons:[CKEDITOR.dialog.okButton,CKEDITOR.dialog.cancelButton]},D=function(a,b,c){for(var d=0,e;e=a[d];d++)if(e.id==b||c&&e[c]&&(e=D(e[c],
b,c)))return e;return null},E=function(a,b,c,d,e){if(c){for(var f=0,g;g=a[f];f++){if(g.id==c)return a.splice(f,0,b),b;if(d&&g[d]&&(g=E(g[d],b,c,d,!0)))return g}if(e)return null}a.push(b);return b},F=function(a,b,c){for(var d=0,e;e=a[d];d++){if(e.id==b)return a.splice(d,1);if(c&&e[c]&&(e=F(e[c],b,c)))return e}return null},P=function(a,b){this.dialog=a;for(var c=b.contents,d=0,e;e=c[d];d++)c[d]=e&&new M(a,e);CKEDITOR.tools.extend(this,b)};P.prototype={getContents:function(a){return D(this.contents,
a)},getButton:function(a){return D(this.buttons,a)},addContents:function(a,b){return E(this.contents,a,b)},addButton:function(a,b){return E(this.buttons,a,b)},removeContents:function(a){F(this.contents,a)},removeButton:function(a){F(this.buttons,a)}};M.prototype={get:function(a){return D(this.elements,a,"children")},add:function(a,b){return E(this.elements,a,b,"children")},remove:function(a){F(this.elements,a,"children")}};var J,z={},u,w={},Q=function(a){var b=a.data.$.ctrlKey||a.data.$.metaKey,c=
a.data.$.altKey,d=a.data.$.shiftKey,e=String.fromCharCode(a.data.$.keyCode);(b=w[(b?"CTRL+":"")+(c?"ALT+":"")+(d?"SHIFT+":"")+e])&&b.length&&(b=b[b.length-1],b.keydown&&b.keydown.call(b.uiElement,b.dialog,b.key),a.data.preventDefault())},R=function(a){var b=a.data.$.ctrlKey||a.data.$.metaKey,c=a.data.$.altKey,d=a.data.$.shiftKey,e=String.fromCharCode(a.data.$.keyCode);(b=w[(b?"CTRL+":"")+(c?"ALT+":"")+(d?"SHIFT+":"")+e])&&b.length&&(b=b[b.length-1],b.keyup&&(b.keyup.call(b.uiElement,b.dialog,b.key),
a.data.preventDefault()))},S=function(a,b,c,d,e){(w[c]||(w[c]=[])).push({uiElement:a,dialog:b,key:c,keyup:e||a.accessKeyUp,keydown:d||a.accessKeyDown})},ba=function(a){for(var b in w){for(var c=w[b],d=c.length-1;0<=d;d--)c[d].dialog!=a&&c[d].uiElement!=a||c.splice(d,1);0===c.length&&delete w[b]}},da=function(a,b){a._.accessKeyMap[b]&&a.selectPage(a._.accessKeyMap[b])},ca=function(){};(function(){CKEDITOR.ui.dialog={uiElement:function(a,b,c,d,e,f,g){if(!(4>arguments.length)){var h=(d.call?d(b):d)||
"div",p=["\x3c",h," "],m=(e&&e.call?e(b):e)||{},k=(f&&f.call?f(b):f)||{},q=(g&&g.call?g.call(this,a,b):g)||"",n=this.domId=k.id||CKEDITOR.tools.getNextId()+"_uiElement";b.requiredContent&&!a.getParentEditor().filter.check(b.requiredContent)&&(m.display="none",this.notAllowed=!0);k.id=n;var r={};b.type&&(r["cke_dialog_ui_"+b.type]=1);b.className&&(r[b.className]=1);b.disabled&&(r.cke_disabled=1);for(var l=k["class"]&&k["class"].split?k["class"].split(" "):[],n=0;n<l.length;n++)l[n]&&(r[l[n]]=1);l=
[];for(n in r)l.push(n);k["class"]=l.join(" ");b.title&&(k.title=b.title);r=(b.style||"").split(";");b.align&&(l=b.align,m["margin-left"]="left"==l?0:"auto",m["margin-right"]="right"==l?0:"auto");for(n in m)r.push(n+":"+m[n]);b.hidden&&r.push("display:none");for(n=r.length-1;0<=n;n--)""===r[n]&&r.splice(n,1);0<r.length&&(k.style=(k.style?k.style+"; ":"")+r.join("; "));for(n in k)p.push(n+'\x3d"'+CKEDITOR.tools.htmlEncode(k[n])+'" ');p.push("\x3e",q,"\x3c/",h,"\x3e");c.push(p.join(""));(this._||(this._=
{})).dialog=a;"boolean"==typeof b.isChanged&&(this.isChanged=function(){return b.isChanged});"function"==typeof b.isChanged&&(this.isChanged=b.isChanged);"function"==typeof b.setValue&&(this.setValue=CKEDITOR.tools.override(this.setValue,function(a){return function(c){a.call(this,b.setValue.call(this,c))}}));"function"==typeof b.getValue&&(this.getValue=CKEDITOR.tools.override(this.getValue,function(a){return function(){return b.getValue.call(this,a.call(this))}}));CKEDITOR.event.implementOn(this);
this.registerEvents(b);this.accessKeyUp&&this.accessKeyDown&&b.accessKey&&S(this,a,"CTRL+"+b.accessKey);var t=this;a.on("load",function(){var b=t.getInputElement();if(b){var c=t.type in{checkbox:1,ratio:1}&&CKEDITOR.env.ie&&8>CKEDITOR.env.version?"cke_dialog_ui_focused":"";b.on("focus",function(){a._.tabBarMode=!1;a._.hasFocus=!0;t.fire("focus");c&&this.addClass(c)});b.on("blur",function(){t.fire("blur");c&&this.removeClass(c)})}});CKEDITOR.tools.extend(this,b);this.keyboardFocusable&&(this.tabIndex=
b.tabIndex||0,this.focusIndex=a._.focusList.push(this)-1,this.on("focus",function(){a._.currentFocusIndex=t.focusIndex}))}},hbox:function(a,b,c,d,e){if(!(4>arguments.length)){this._||(this._={});var f=this._.children=b,g=e&&e.widths||null,h=e&&e.height||null,p,m={role:"presentation"};e&&e.align&&(m.align=e.align);CKEDITOR.ui.dialog.uiElement.call(this,a,e||{type:"hbox"},d,"table",{},m,function(){var a=['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];for(p=0;p<c.length;p++){var b="cke_dialog_ui_hbox_child",
d=[];0===p&&(b="cke_dialog_ui_hbox_first");p==c.length-1&&(b="cke_dialog_ui_hbox_last");a.push('\x3ctd class\x3d"',b,'" role\x3d"presentation" ');g?g[p]&&d.push("width:"+v(g[p])):d.push("width:"+Math.floor(100/c.length)+"%");h&&d.push("height:"+v(h));e&&void 0!==e.padding&&d.push("padding:"+v(e.padding));CKEDITOR.env.ie&&CKEDITOR.env.quirks&&f[p].align&&d.push("text-align:"+f[p].align);0<d.length&&a.push('style\x3d"'+d.join("; ")+'" ');a.push("\x3e",c[p],"\x3c/td\x3e")}a.push("\x3c/tr\x3e\x3c/tbody\x3e");
return a.join("")})}},vbox:function(a,b,c,d,e){if(!(3>arguments.length)){this._||(this._={});var f=this._.children=b,g=e&&e.width||null,h=e&&e.heights||null;CKEDITOR.ui.dialog.uiElement.call(this,a,e||{type:"vbox"},d,"div",null,{role:"presentation"},function(){var b=['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];b.push('style\x3d"');e&&e.expand&&b.push("height:100%;");b.push("width:"+v(g||"100%"),";");CKEDITOR.env.webkit&&b.push("float:none;");b.push('"');b.push('align\x3d"',
CKEDITOR.tools.htmlEncode(e&&e.align||("ltr"==a.getParentEditor().lang.dir?"left":"right")),'" ');b.push("\x3e\x3ctbody\x3e");for(var d=0;d<c.length;d++){var k=[];b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');g&&k.push("width:"+v(g||"100%"));h?k.push("height:"+v(h[d])):e&&e.expand&&k.push("height:"+Math.floor(100/c.length)+"%");e&&void 0!==e.padding&&k.push("padding:"+v(e.padding));CKEDITOR.env.ie&&CKEDITOR.env.quirks&&f[d].align&&k.push("text-align:"+f[d].align);0<k.length&&b.push('style\x3d"',
k.join("; "),'" ');b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e',c[d],"\x3c/td\x3e\x3c/tr\x3e")}b.push("\x3c/tbody\x3e\x3c/table\x3e");return b.join("")})}}}})();CKEDITOR.ui.dialog.uiElement.prototype={getElement:function(){return CKEDITOR.document.getById(this.domId)},getInputElement:function(){return this.getElement()},getDialog:function(){return this._.dialog},setValue:function(a,b){this.getInputElement().setValue(a);!b&&this.fire("change",{value:a});return this},getValue:function(){return this.getInputElement().getValue()},
isChanged:function(){return!1},selectParentTab:function(){for(var a=this.getInputElement();(a=a.getParent())&&-1==a.$.className.search("cke_dialog_page_contents"););if(!a)return this;a=a.getAttribute("name");this._.dialog._.currentTabId!=a&&this._.dialog.selectPage(a);return this},focus:function(){this.selectParentTab().getInputElement().focus();return this},registerEvents:function(a){var b=/^on([A-Z]\w+)/,c,d=function(a,b,c,d){b.on("load",function(){a.getInputElement().on(c,d,a)})},e;for(e in a)if(c=
e.match(b))this.eventProcessors[e]?this.eventProcessors[e].call(this,this._.dialog,a[e]):d(this,this._.dialog,c[1].toLowerCase(),a[e]);return this},eventProcessors:{onLoad:function(a,b){a.on("load",b,this)},onShow:function(a,b){a.on("show",b,this)},onHide:function(a,b){a.on("hide",b,this)}},accessKeyDown:function(){this.focus()},accessKeyUp:function(){},disable:function(){var a=this.getElement();this.getInputElement().setAttribute("disabled","true");a.addClass("cke_disabled")},enable:function(){var a=
this.getElement();this.getInputElement().removeAttribute("disabled");a.removeClass("cke_disabled")},isEnabled:function(){return!this.getElement().hasClass("cke_disabled")},isVisible:function(){return this.getInputElement().isVisible()},isFocusable:function(){return this.isEnabled()&&this.isVisible()?!0:!1}};CKEDITOR.ui.dialog.hbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{getChild:function(a){if(1>arguments.length)return this._.children.concat();a.splice||(a=[a]);return 2>
a.length?this._.children[a[0]]:this._.children[a[0]]&&this._.children[a[0]].getChild?this._.children[a[0]].getChild(a.slice(1,a.length)):null}},!0);CKEDITOR.ui.dialog.vbox.prototype=new CKEDITOR.ui.dialog.hbox;(function(){var a={build:function(a,c,d){for(var e=c.children,f,g=[],h=[],p=0;p<e.length&&(f=e[p]);p++){var m=[];g.push(m);h.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a,f,m))}return new CKEDITOR.ui.dialog[c.type](a,h,g,d,c)}};CKEDITOR.dialog.addUIElement("hbox",a);CKEDITOR.dialog.addUIElement("vbox",
a)})();CKEDITOR.dialogCommand=function(a,b){this.dialogName=a;CKEDITOR.tools.extend(this,b,!0)};CKEDITOR.dialogCommand.prototype={exec:function(a){a.openDialog(this.dialogName)},canUndo:!1,editorFocus:1};(function(){var a=/^([a]|[^a])+$/,b=/^\d*$/,c=/^\d*(?:\.\d+)?$/,d=/^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,e=/^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,f=/^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;CKEDITOR.VALIDATE_OR=1;CKEDITOR.VALIDATE_AND=2;CKEDITOR.dialog.validate={functions:function(){var a=
arguments;return function(){var b=this&&this.getValue?this.getValue():a[0],c,d=CKEDITOR.VALIDATE_AND,e=[],f;for(f=0;f<a.length;f++)if("function"==typeof a[f])e.push(a[f]);else break;f<a.length&&"string"==typeof a[f]&&(c=a[f],f++);f<a.length&&"number"==typeof a[f]&&(d=a[f]);var n=d==CKEDITOR.VALIDATE_AND?!0:!1;for(f=0;f<e.length;f++)n=d==CKEDITOR.VALIDATE_AND?n&&e[f](b):n||e[f](b);return n?!0:c}},regex:function(a,b){return function(c){c=this&&this.getValue?this.getValue():c;return a.test(c)?!0:b}},
notEmpty:function(b){return this.regex(a,b)},integer:function(a){return this.regex(b,a)},number:function(a){return this.regex(c,a)},cssLength:function(a){return this.functions(function(a){return e.test(CKEDITOR.tools.trim(a))},a)},htmlLength:function(a){return this.functions(function(a){return d.test(CKEDITOR.tools.trim(a))},a)},inlineStyle:function(a){return this.functions(function(a){return f.test(CKEDITOR.tools.trim(a))},a)},equals:function(a,b){return this.functions(function(b){return b==a},b)},
notEqual:function(a,b){return this.functions(function(b){return b!=a},b)}};CKEDITOR.on("instanceDestroyed",function(a){if(CKEDITOR.tools.isEmpty(CKEDITOR.instances)){for(var b;b=CKEDITOR.dialog._.currentTop;)b.hide();for(var c in z)z[c].remove();z={}}a=a.editor._.storedDialogs;for(var d in a)a[d].destroy()})})();CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{openDialog:function(a,b){var c=null,d=CKEDITOR.dialog._.dialogDefinitions[a];null===CKEDITOR.dialog._.currentTop&&N(this);if("function"==typeof d)c=
this._.storedDialogs||(this._.storedDialogs={}),c=c[a]||(c[a]=new CKEDITOR.dialog(this,a)),b&&b.call(c,c),c.show();else{if("failed"==d)throw O(this),Error('[CKEDITOR.dialog.openDialog] Dialog "'+a+'" failed when loading definition.');"string"==typeof d&&CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d),function(){"function"!=typeof CKEDITOR.dialog._.dialogDefinitions[a]&&(CKEDITOR.dialog._.dialogDefinitions[a]="failed");this.openDialog(a,b)},this,0,1)}CKEDITOR.skin.loadPart("dialog");return c}})})();
CKEDITOR.plugins.add("dialog",{requires:"dialogui",init:function(x){x.on("doubleclick",function(A){A.data.dialog&&x.openDialog(A.data.dialog)},null,null,999)}});(function(){function r(b,a,c){a.type||(a.type="auto");if(c&&!1===b.fire("beforePaste",a)||!a.dataValue&&a.dataTransfer.isEmpty())return!1;a.dataValue||(a.dataValue="");if(CKEDITOR.env.gecko&&"drop"==a.method&&b.toolbox)b.once("afterPaste",function(){b.toolbox.focus()});return b.fire("paste",a)}function y(b){function a(){var a=b.editable();if(CKEDITOR.plugins.clipboard.isCustomCopyCutSupported){var d=function(a){b.readOnly&&"cut"==a.name||n.initPasteDataTransfer(a,b);a.data.preventDefault()};a.on("copy",
d);a.on("cut",d);a.on("cut",function(){b.readOnly||b.extractSelectedHtml()},null,null,999)}a.on(n.mainPasteEvent,function(b){"beforepaste"==n.mainPasteEvent&&p||k(b)});"beforepaste"==n.mainPasteEvent&&(a.on("paste",function(a){v||(e(),a.data.preventDefault(),k(a),f("paste")||b.openDialog("paste"))}),a.on("contextmenu",g,null,null,0),a.on("beforepaste",function(b){!b.data||b.data.$.ctrlKey||b.data.$.shiftKey||g()},null,null,0));a.on("beforecut",function(){!p&&h(b)});var c;a.attachListener(CKEDITOR.env.ie?
a:b.document.getDocumentElement(),"mouseup",function(){c=setTimeout(function(){t()},0)});b.on("destroy",function(){clearTimeout(c)});a.on("keyup",t)}function c(a){return{type:a,canUndo:"cut"==a,startDisabled:!0,exec:function(){"cut"==this.type&&h();var a;var d=this.type;if(CKEDITOR.env.ie)a=f(d);else try{a=b.document.$.execCommand(d,!1,null)}catch(c){a=!1}a||b.showNotification(b.lang.clipboard[this.type+"Error"]);return a}}}function d(){return{canUndo:!1,async:!0,exec:function(b,a){var d=this,c=function(a,
c){a&&r(b,a,!!c);b.fire("afterCommandExec",{name:"paste",command:d,returnValue:!!a})};"string"==typeof a?c({dataValue:a,method:"paste",dataTransfer:n.initPasteDataTransfer()},1):b.getClipboardData(c)}}}function e(){v=1;setTimeout(function(){v=0},100)}function g(){p=1;setTimeout(function(){p=0},10)}function f(a){var d=b.document,c=d.getBody(),e=!1,f=function(){e=!0};c.on(a,f);7<CKEDITOR.env.version?d.$.execCommand(a):d.$.selection.createRange().execCommand(a);c.removeListener(a,f);return e}function h(){if(CKEDITOR.env.ie&&
!CKEDITOR.env.quirks){var a=b.getSelection(),d,c,e;a.getType()==CKEDITOR.SELECTION_ELEMENT&&(d=a.getSelectedElement())&&(c=a.getRanges()[0],e=b.document.createText(""),e.insertBefore(d),c.setStartBefore(e),c.setEndAfter(d),a.selectRanges([c]),setTimeout(function(){d.getParent()&&(e.remove(),a.selectElement(d))},0))}}function l(a,d){var c=b.document,e=b.editable(),f=function(b){b.cancel()},q;if(!c.getById("cke_pastebin")){var g=b.getSelection(),h=g.createBookmarks();CKEDITOR.env.ie&&g.root.fire("selectionchange");
var m=new CKEDITOR.dom.element(!CKEDITOR.env.webkit&&!e.is("body")||CKEDITOR.env.ie?"div":"body",c);m.setAttributes({id:"cke_pastebin","data-cke-temp":"1"});var k=0,c=c.getWindow();CKEDITOR.env.webkit?(e.append(m),m.addClass("cke_editable"),e.is("body")||(k="static"!=e.getComputedStyle("position")?e:CKEDITOR.dom.element.get(e.$.offsetParent),k=k.getDocumentPosition().y)):e.getAscendant(CKEDITOR.env.ie?"body":"html",1).append(m);m.setStyles({position:"absolute",top:c.getScrollPosition().y-k+10+"px",
width:"1px",height:Math.max(1,c.getViewPaneSize().height-20)+"px",overflow:"hidden",margin:0,padding:0});CKEDITOR.env.safari&&m.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select","text"));(k=m.getParent().isReadOnly())?(m.setOpacity(0),m.setAttribute("contenteditable",!0)):m.setStyle("ltr"==b.config.contentsLangDirection?"left":"right","-10000px");b.on("selectionChange",f,null,null,0);if(CKEDITOR.env.webkit||CKEDITOR.env.gecko)q=e.once("blur",f,null,null,-100);k&&m.focus();k=new CKEDITOR.dom.range(m);
k.selectNodeContents(m);var t=k.select();CKEDITOR.env.ie&&(q=e.once("blur",function(){b.lockSelection(t)}));var l=CKEDITOR.document.getWindow().getScrollPosition().y;setTimeout(function(){CKEDITOR.env.webkit&&(CKEDITOR.document.getBody().$.scrollTop=l);q&&q.removeListener();CKEDITOR.env.ie&&e.focus();g.selectBookmarks(h);m.remove();var a;CKEDITOR.env.webkit&&(a=m.getFirst())&&a.is&&a.hasClass("Apple-style-span")&&(m=a);b.removeListener("selectionChange",f);d(m.getHtml())},0)}}function z(){if("paste"==
n.mainPasteEvent)return b.fire("beforePaste",{type:"auto",method:"paste"}),!1;b.focus();e();var a=b.focusManager;a.lock();if(b.editable().fire(n.mainPasteEvent)&&!f("paste"))return a.unlock(),!1;a.unlock();return!0}function q(a){if("wysiwyg"==b.mode)switch(a.data.keyCode){case CKEDITOR.CTRL+86:case CKEDITOR.SHIFT+45:a=b.editable();e();"paste"==n.mainPasteEvent&&a.fire("beforepaste");break;case CKEDITOR.CTRL+88:case CKEDITOR.SHIFT+46:b.fire("saveSnapshot"),setTimeout(function(){b.fire("saveSnapshot")},
50)}}function k(a){var d={type:"auto",method:"paste",dataTransfer:n.initPasteDataTransfer(a)};d.dataTransfer.cacheData();var c=!1!==b.fire("beforePaste",d);c&&n.canClipboardApiBeTrusted(d.dataTransfer,b)?(a.data.preventDefault(),setTimeout(function(){r(b,d)},0)):l(a,function(a){d.dataValue=a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig,"");c&&r(b,d)})}function t(){if("wysiwyg"==b.mode){var a=u("paste");b.getCommand("cut").setState(u("cut"));b.getCommand("copy").setState(u("copy"));b.getCommand("paste").setState(a);
b.fire("pasteState",a)}}function u(a){if(w&&a in{paste:1,cut:1})return CKEDITOR.TRISTATE_DISABLED;if("paste"==a)return CKEDITOR.TRISTATE_OFF;a=b.getSelection();var d=a.getRanges();return a.getType()==CKEDITOR.SELECTION_NONE||1==d.length&&d[0].collapsed?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_OFF}var n=CKEDITOR.plugins.clipboard,p=0,v=0,w=0;(function(){b.on("key",q);b.on("contentDom",a);b.on("selectionChange",function(b){w=b.data.selection.getRanges()[0].checkReadOnly();t()});b.contextMenu&&b.contextMenu.addListener(function(b,
a){w=a.getRanges()[0].checkReadOnly();return{cut:u("cut"),copy:u("copy"),paste:u("paste")}})})();(function(){function a(d,c,e,f,q){var g=b.lang.clipboard[c];b.addCommand(c,e);b.ui.addButton&&b.ui.addButton(d,{label:g,command:c,toolbar:"clipboard,"+f});b.addMenuItems&&b.addMenuItem(c,{label:g,command:c,group:"clipboard",order:q})}a("Cut","cut",c("cut"),10,1);a("Copy","copy",c("copy"),20,4);a("Paste","paste",d(),30,8)})();b.getClipboardData=function(a,d){function c(a){a.removeListener();a.cancel();
d(a.data)}function e(a){a.removeListener();a.cancel();k=!0;d({type:g,dataValue:a.data.dataValue,dataTransfer:a.data.dataTransfer,method:"paste"})}function f(){this.customTitle=a&&a.title}var q=!1,g="auto",k=!1;d||(d=a,a=null);b.on("paste",c,null,null,0);b.on("beforePaste",function(a){a.removeListener();q=!0;g=a.data.type},null,null,1E3);!1===z()&&(b.removeListener("paste",c),q&&b.fire("pasteDialog",f)?(b.on("pasteDialogCommit",e),b.on("dialogHide",function(a){a.removeListener();a.data.removeListener("pasteDialogCommit",
e);setTimeout(function(){k||d(null)},10)})):d(null))}}function A(b){if(CKEDITOR.env.webkit){if(!b.match(/^[^<]*$/g)&&!b.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))return"html"}else if(CKEDITOR.env.ie){if(!b.match(/^([^<]|<br( ?\/)?>)*$/gi)&&!b.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))return"html"}else if(CKEDITOR.env.gecko){if(!b.match(/^([^<]|<br( ?\/)?>)*$/gi))return"html"}else return"html";return"htmlifiedtext"}function B(b,a){function c(a){return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e",
~~(a/2))+(1==a%2?"\x3cbr\x3e":"")}a=a.replace(/\s+/g," ").replace(/> +</g,"\x3e\x3c").replace(/<br ?\/>/gi,"\x3cbr\x3e");a=a.replace(/<\/?[A-Z]+>/g,function(a){return a.toLowerCase()});if(a.match(/^[^<]$/))return a;CKEDITOR.env.webkit&&-1<a.indexOf("\x3cdiv\x3e")&&(a=a.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g,"\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g,"\x3cdiv\x3e\x3c/div\x3e"),a.match(/<div>(<br>|)<\/div>/)&&(a="\x3cp\x3e"+a.replace(/(<div>(<br>|)<\/div>)+/g,function(a){return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length+
1)})+"\x3c/p\x3e"),a=a.replace(/<\/div><div>/g,"\x3cbr\x3e"),a=a.replace(/<\/?div>/g,""));CKEDITOR.env.gecko&&b.enterMode!=CKEDITOR.ENTER_BR&&(CKEDITOR.env.gecko&&(a=a.replace(/^<br><br>$/,"\x3cbr\x3e")),-1<a.indexOf("\x3cbr\x3e\x3cbr\x3e")&&(a="\x3cp\x3e"+a.replace(/(<br>){2,}/g,function(a){return c(a.length/4)})+"\x3c/p\x3e"));return C(b,a)}function D(){function b(){var a={},b;for(b in CKEDITOR.dtd)"$"!=b.charAt(0)&&"div"!=b&&"span"!=b&&(a[b]=1);return a}var a={};return{get:function(c){return"plain-text"==
c?a.plainText||(a.plainText=new CKEDITOR.filter("br")):"semantic-content"==c?((c=a.semanticContent)||(c=new CKEDITOR.filter,c.allow({$1:{elements:b(),attributes:!0,styles:!1,classes:!1}}),c=a.semanticContent=c),c):c?new CKEDITOR.filter(c):null}}}function x(b,a,c){a=CKEDITOR.htmlParser.fragment.fromHtml(a);var d=new CKEDITOR.htmlParser.basicWriter;c.applyTo(a,!0,!1,b.activeEnterMode);a.writeHtml(d);return d.getHtml()}function C(b,a){b.enterMode==CKEDITOR.ENTER_BR?a=a.replace(/(<\/p><p>)+/g,function(a){return CKEDITOR.tools.repeat("\x3cbr\x3e",
a.length/7*2)}).replace(/<\/?p>/g,""):b.enterMode==CKEDITOR.ENTER_DIV&&(a=a.replace(/<(\/)?p>/g,"\x3c$1div\x3e"));return a}function E(b){b.data.preventDefault();b.data.$.dataTransfer.dropEffect="none"}function F(b){var a=CKEDITOR.plugins.clipboard;b.on("contentDom",function(){function c(a,d,c){d.select();r(b,{dataTransfer:c,method:"drop"},1);c.sourceEditor.fire("saveSnapshot");c.sourceEditor.editable().extractHtmlFromRange(a);c.sourceEditor.getSelection().selectRanges([a]);c.sourceEditor.fire("saveSnapshot")}
function d(d,c){d.select();r(b,{dataTransfer:c,method:"drop"},1);a.resetDragDataTransfer()}function e(a,d,c){var e={$:a.data.$,target:a.data.getTarget()};d&&(e.dragRange=d);c&&(e.dropRange=c);!1===b.fire(a.name,e)&&a.data.preventDefault()}function g(a){a.type!=CKEDITOR.NODE_ELEMENT&&(a=a.getParent());return a.getChildCount()}var f=b.editable(),h=CKEDITOR.plugins.clipboard.getDropTarget(b),l=b.ui.space("top"),p=b.ui.space("bottom");a.preventDefaultDropOnElement(l);a.preventDefaultDropOnElement(p);
f.attachListener(h,"dragstart",e);f.attachListener(b,"dragstart",a.resetDragDataTransfer,a,null,1);f.attachListener(b,"dragstart",function(d){a.initDragDataTransfer(d,b)},null,null,2);f.attachListener(b,"dragstart",function(){var d=a.dragRange=b.getSelection().getRanges()[0];CKEDITOR.env.ie&&10>CKEDITOR.env.version&&(a.dragStartContainerChildCount=d?g(d.startContainer):null,a.dragEndContainerChildCount=d?g(d.endContainer):null)},null,null,100);f.attachListener(h,"dragend",e);f.attachListener(b,"dragend",
a.initDragDataTransfer,a,null,1);f.attachListener(b,"dragend",a.resetDragDataTransfer,a,null,100);f.attachListener(h,"dragover",function(a){var b=a.data.getTarget();b&&b.is&&b.is("html")?a.data.preventDefault():CKEDITOR.env.ie&&CKEDITOR.plugins.clipboard.isFileApiSupported&&a.data.$.dataTransfer.types.contains("Files")&&a.data.preventDefault()});f.attachListener(h,"drop",function(d){if(!d.data.$.defaultPrevented){d.data.preventDefault();var c=d.data.getTarget();if(!c.isReadOnly()||c.type==CKEDITOR.NODE_ELEMENT&&
c.is("html")){var c=a.getRangeAtDropPosition(d,b),f=a.dragRange;c&&e(d,f,c)}}},null,null,9999);f.attachListener(b,"drop",a.initDragDataTransfer,a,null,1);f.attachListener(b,"drop",function(e){if(e=e.data){var f=e.dropRange,g=e.dragRange,h=e.dataTransfer;h.getTransferType(b)==CKEDITOR.DATA_TRANSFER_INTERNAL?setTimeout(function(){a.internalDrop(g,f,h,b)},0):h.getTransferType(b)==CKEDITOR.DATA_TRANSFER_CROSS_EDITORS?c(g,f,h):d(f,h)}},null,null,9999)})}CKEDITOR.plugins.add("clipboard",{requires:"dialog",
init:function(b){var a,c=D();b.config.forcePasteAsPlainText?a="plain-text":b.config.pasteFilter?a=b.config.pasteFilter:!CKEDITOR.env.webkit||"pasteFilter"in b.config||(a="semantic-content");b.pasteFilter=c.get(a);y(b);F(b);CKEDITOR.dialog.add("paste",CKEDITOR.getUrl(this.path+"dialogs/paste.js"));b.on("paste",function(a){a.data.dataTransfer||(a.data.dataTransfer=new CKEDITOR.plugins.clipboard.dataTransfer);if(!a.data.dataValue){var c=a.data.dataTransfer,g=c.getData("text/html");if(g)a.data.dataValue=
g,a.data.type="html";else if(g=c.getData("text/plain"))a.data.dataValue=b.editable().transformPlainTextToHtml(g),a.data.type="text"}},null,null,1);b.on("paste",function(a){var b=a.data.dataValue,c=CKEDITOR.dtd.$block;-1<b.indexOf("Apple-")&&(b=b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi," "),"html"!=a.data.type&&(b=b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi,function(a,b){return b.replace(/\t/g,"\x26nbsp;\x26nbsp; \x26nbsp;")})),-1<b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e')&&
(a.data.startsWithEOL=1,a.data.preSniffing="html",b=b.replace(/<br class="Apple-interchange-newline">/,"")),b=b.replace(/(<[^>]+) class="Apple-[^"]*"/gi,"$1"));if(b.match(/^<[^<]+cke_(editable|contents)/i)){var f,h,l=new CKEDITOR.dom.element("div");for(l.setHtml(b);1==l.getChildCount()&&(f=l.getFirst())&&f.type==CKEDITOR.NODE_ELEMENT&&(f.hasClass("cke_editable")||f.hasClass("cke_contents"));)l=h=f;h&&(b=h.getHtml().replace(/<br>$/i,""))}CKEDITOR.env.ie?b=b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g,function(b,
f){return f.toLowerCase()in c?(a.data.preSniffing="html","\x3c"+f):b}):CKEDITOR.env.webkit?b=b.replace(/<\/(\w+)><div><br><\/div>$/,function(b,f){return f in c?(a.data.endsWithEOL=1,"\x3c/"+f+"\x3e"):b}):CKEDITOR.env.gecko&&(b=b.replace(/(\s)<br>$/,"$1"));a.data.dataValue=b},null,null,3);b.on("paste",function(a){a=a.data;var e=a.type,g=a.dataValue,f,h=b.config.clipboard_defaultContentType||"html",l=a.dataTransfer.getTransferType(b);f="html"==e||"html"==a.preSniffing?"html":A(g);"htmlifiedtext"==f&&
(g=B(b.config,g));"text"==e&&"html"==f?g=x(b,g,c.get("plain-text")):l==CKEDITOR.DATA_TRANSFER_EXTERNAL&&b.pasteFilter&&!a.dontFilter&&(g=x(b,g,b.pasteFilter));a.startsWithEOL&&(g='\x3cbr data-cke-eol\x3d"1"\x3e'+g);a.endsWithEOL&&(g+='\x3cbr data-cke-eol\x3d"1"\x3e');"auto"==e&&(e="html"==f||"html"==h?"html":"text");a.type=e;a.dataValue=g;delete a.preSniffing;delete a.startsWithEOL;delete a.endsWithEOL},null,null,6);b.on("paste",function(a){a=a.data;a.dataValue&&(b.insertHtml(a.dataValue,a.type,a.range),
setTimeout(function(){b.fire("afterPaste")},0))},null,null,1E3);b.on("pasteDialog",function(a){setTimeout(function(){b.openDialog("paste",a.data)},0)})}});CKEDITOR.plugins.clipboard={isCustomCopyCutSupported:!CKEDITOR.env.ie&&!CKEDITOR.env.iOS,isCustomDataTypesSupported:!CKEDITOR.env.ie,isFileApiSupported:!CKEDITOR.env.ie||9<CKEDITOR.env.version,mainPasteEvent:CKEDITOR.env.ie&&!CKEDITOR.env.edge?"beforepaste":"paste",canClipboardApiBeTrusted:function(b,a){return b.getTransferType(a)!=CKEDITOR.DATA_TRANSFER_EXTERNAL||
CKEDITOR.env.chrome&&!b.isEmpty()||CKEDITOR.env.gecko&&(b.getData("text/html")||b.getFilesCount())?!0:!1},getDropTarget:function(b){var a=b.editable();return CKEDITOR.env.ie&&9>CKEDITOR.env.version||a.isInline()?a:b.document},fixSplitNodesAfterDrop:function(b,a,c,d){function e(b,c,d){var e=b;e.type==CKEDITOR.NODE_TEXT&&(e=b.getParent());if(e.equals(c)&&d!=c.getChildCount())return b=a.startContainer.getChild(a.startOffset-1),c=a.startContainer.getChild(a.startOffset),b&&b.type==CKEDITOR.NODE_TEXT&&
c&&c.type==CKEDITOR.NODE_TEXT&&(d=b.getLength(),b.setText(b.getText()+c.getText()),c.remove(),a.setStart(b,d),a.collapse(!0)),!0}var g=a.startContainer;"number"==typeof d&&"number"==typeof c&&g.type==CKEDITOR.NODE_ELEMENT&&(e(b.startContainer,g,c)||e(b.endContainer,g,d))},isDropRangeAffectedByDragRange:function(b,a){var c=a.startContainer,d=a.endOffset;return b.endContainer.equals(c)&&b.endOffset<=d||b.startContainer.getParent().equals(c)&&b.startContainer.getIndex()<d||b.endContainer.getParent().equals(c)&&
b.endContainer.getIndex()<d?!0:!1},internalDrop:function(b,a,c,d){var e=CKEDITOR.plugins.clipboard,g=d.editable(),f,h;d.fire("saveSnapshot");d.fire("lockSnapshot",{dontUpdate:1});CKEDITOR.env.ie&&10>CKEDITOR.env.version&&this.fixSplitNodesAfterDrop(b,a,e.dragStartContainerChildCount,e.dragEndContainerChildCount);(h=this.isDropRangeAffectedByDragRange(b,a))||(f=b.createBookmark(!1));e=a.clone().createBookmark(!1);h&&(f=b.createBookmark(!1));b=f.startNode;a=f.endNode;h=e.startNode;a&&b.getPosition(h)&
CKEDITOR.POSITION_PRECEDING&&a.getPosition(h)&CKEDITOR.POSITION_FOLLOWING&&h.insertBefore(b);b=d.createRange();b.moveToBookmark(f);g.extractHtmlFromRange(b,1);a=d.createRange();a.moveToBookmark(e);r(d,{dataTransfer:c,method:"drop",range:a},1);d.fire("unlockSnapshot")},getRangeAtDropPosition:function(b,a){var c=b.data.$,d=c.clientX,e=c.clientY,g=a.getSelection(!0).getRanges()[0],f=a.createRange();if(b.data.testRange)return b.data.testRange;if(document.caretRangeFromPoint)c=a.document.$.caretRangeFromPoint(d,
e),f.setStart(CKEDITOR.dom.node(c.startContainer),c.startOffset),f.collapse(!0);else if(c.rangeParent)f.setStart(CKEDITOR.dom.node(c.rangeParent),c.rangeOffset),f.collapse(!0);else{if(CKEDITOR.env.ie&&8<CKEDITOR.env.version&&g&&a.editable().hasFocus)return g;if(document.body.createTextRange){a.focus();c=a.document.getBody().$.createTextRange();try{for(var h=!1,l=0;20>l&&!h;l++){if(!h)try{c.moveToPoint(d,e-l),h=!0}catch(p){}if(!h)try{c.moveToPoint(d,e+l),h=!0}catch(q){}}if(h){var k="cke-temp-"+(new Date).getTime();
c.pasteHTML('\x3cspan id\x3d"'+k+'"\x3e​\x3c/span\x3e');var t=a.document.getById(k);f.moveToPosition(t,CKEDITOR.POSITION_BEFORE_START);t.remove()}else{var u=a.document.$.elementFromPoint(d,e),n=new CKEDITOR.dom.element(u),r;if(n.equals(a.editable())||"html"==n.getName())return g&&g.startContainer&&!g.startContainer.equals(a.editable())?g:null;r=n.getClientRect();d<r.left?f.setStartAt(n,CKEDITOR.POSITION_AFTER_START):f.setStartAt(n,CKEDITOR.POSITION_BEFORE_END);f.collapse(!0)}}catch(v){return null}}else return null}return f},
initDragDataTransfer:function(b,a){var c=b.data.$?b.data.$.dataTransfer:null,d=new this.dataTransfer(c,a);c?this.dragData&&d.id==this.dragData.id?d=this.dragData:this.dragData=d:this.dragData?d=this.dragData:this.dragData=d;b.data.dataTransfer=d},resetDragDataTransfer:function(){this.dragData=null},initPasteDataTransfer:function(b,a){if(this.isCustomCopyCutSupported&&b&&b.data&&b.data.$){var c=new this.dataTransfer(b.data.$.clipboardData,a);this.copyCutData&&c.id==this.copyCutData.id?(c=this.copyCutData,
c.$=b.data.$.clipboardData):this.copyCutData=c;return c}return new this.dataTransfer(null,a)},preventDefaultDropOnElement:function(b){b&&b.on("dragover",E)}};var p=CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?"cke/id":"Text";CKEDITOR.plugins.clipboard.dataTransfer=function(b,a){b&&(this.$=b);this._={metaRegExp:/^<meta.*?>/i,bodyRegExp:/<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i,fragmentRegExp:/\x3c!--(?:Start|End)Fragment--\x3e/g,data:{},files:[],normalizeType:function(a){a=a.toLowerCase();return"text"==
a||"text/plain"==a?"Text":"url"==a?"URL":a}};this.id=this.getData(p);this.id||(this.id="Text"==p?"":"cke-"+CKEDITOR.tools.getUniqueId());if("Text"!=p)try{this.$.setData(p,this.id)}catch(c){}a&&(this.sourceEditor=a,this.setData("text/html",a.getSelectedHtml(1)),"Text"==p||this.getData("text/plain")||this.setData("text/plain",a.getSelection().getSelectedText()))};CKEDITOR.DATA_TRANSFER_INTERNAL=1;CKEDITOR.DATA_TRANSFER_CROSS_EDITORS=2;CKEDITOR.DATA_TRANSFER_EXTERNAL=3;CKEDITOR.plugins.clipboard.dataTransfer.prototype=
{getData:function(b){b=this._.normalizeType(b);var a=this._.data[b];if(void 0===a||null===a||""===a)try{a=this.$.getData(b)}catch(c){}if(void 0===a||null===a||""===a)a="";"text/html"==b?(a=a.replace(this._.metaRegExp,""),(b=this._.bodyRegExp.exec(a))&&b.length&&(a=b[1],a=a.replace(this._.fragmentRegExp,""))):"Text"==b&&CKEDITOR.env.gecko&&this.getFilesCount()&&"file://"==a.substring(0,7)&&(a="");return a},setData:function(b,a){b=this._.normalizeType(b);this._.data[b]=a;if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported||
"URL"==b||"Text"==b){"Text"==p&&"Text"==b&&(this.id=a);try{this.$.setData(b,a)}catch(c){}}},getTransferType:function(b){return this.sourceEditor?this.sourceEditor==b?CKEDITOR.DATA_TRANSFER_INTERNAL:CKEDITOR.DATA_TRANSFER_CROSS_EDITORS:CKEDITOR.DATA_TRANSFER_EXTERNAL},cacheData:function(){function b(b){b=a._.normalizeType(b);var c=a.getData(b);c&&(a._.data[b]=c)}if(this.$){var a=this,c,d;if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){if(this.$.types)for(c=0;c<this.$.types.length;c++)b(this.$.types[c])}else b("Text"),
b("URL");d=this._getImageFromClipboard();if(this.$&&this.$.files||d){this._.files=[];for(c=0;c<this.$.files.length;c++)this._.files.push(this.$.files[c]);0===this._.files.length&&d&&this._.files.push(d)}}},getFilesCount:function(){return this._.files.length?this._.files.length:this.$&&this.$.files&&this.$.files.length?this.$.files.length:this._getImageFromClipboard()?1:0},getFile:function(b){return this._.files.length?this._.files[b]:this.$&&this.$.files&&this.$.files.length?this.$.files[b]:0===b?
this._getImageFromClipboard():void 0},isEmpty:function(){var b={},a;if(this.getFilesCount())return!1;for(a in this._.data)b[a]=1;if(this.$)if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){if(this.$.types)for(var c=0;c<this.$.types.length;c++)b[this.$.types[c]]=1}else b.Text=1,b.URL=1;"Text"!=p&&(b[p]=0);for(a in b)if(b[a]&&""!==this.getData(a))return!1;return!0},_getImageFromClipboard:function(){var b;if(this.$&&this.$.items&&this.$.items[0])try{if((b=this.$.items[0].getAsFile())&&b.type)return b}catch(a){}}}})();(function(){function q(b,d,a){a=b.config.forceEnterMode||a;"wysiwyg"==b.mode&&(d||(d=b.activeEnterMode),b.elementPath().isContextFor("p")||(d=CKEDITOR.ENTER_BR,a=1),b.fire("saveSnapshot"),d==CKEDITOR.ENTER_BR?t(b,d,null,a):u(b,d,null,a),b.fire("saveSnapshot"))}function v(b){b=b.getSelection().getRanges(!0);for(var d=b.length-1;0<d;d--)b[d].deleteContents();return b[0]}function y(b){var d=b.startContainer.getAscendant(function(a){return a.type==CKEDITOR.NODE_ELEMENT&&"true"==a.getAttribute("contenteditable")},
!0);if(b.root.equals(d))return b;d=new CKEDITOR.dom.range(d);d.moveToRange(b);return d}CKEDITOR.plugins.add("enterkey",{init:function(b){b.addCommand("enter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(b){q(b)}});b.addCommand("shiftEnter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(b){q(b,b.activeShiftEnterMode,1)}});b.setKeystroke([[13,"enter"],[CKEDITOR.SHIFT+13,"shiftEnter"]])}});var z=CKEDITOR.dom.walker.whitespaces(),A=CKEDITOR.dom.walker.bookmark();CKEDITOR.plugins.enterkey={enterBlock:function(b,
d,a,h){if(a=a||v(b)){a=y(a);var f=a.document,k=a.checkStartOfBlock(),m=a.checkEndOfBlock(),l=b.elementPath(a.startContainer),c=l.block,n=d==CKEDITOR.ENTER_DIV?"div":"p",e;if(k&&m){if(c&&(c.is("li")||c.getParent().is("li"))){c.is("li")||(c=c.getParent());a=c.getParent();e=a.getParent();h=!c.hasPrevious();var p=!c.hasNext(),n=b.getSelection(),g=n.createBookmarks(),k=c.getDirection(1),m=c.getAttribute("class"),r=c.getAttribute("style"),q=e.getDirection(1)!=k;b=b.enterMode!=CKEDITOR.ENTER_BR||q||r||m;
if(e.is("li"))h||p?(h&&p&&a.remove(),c[p?"insertAfter":"insertBefore"](e)):c.breakParent(e);else{if(b)if(l.block.is("li")?(e=f.createElement(d==CKEDITOR.ENTER_P?"p":"div"),q&&e.setAttribute("dir",k),r&&e.setAttribute("style",r),m&&e.setAttribute("class",m),c.moveChildren(e)):e=l.block,h||p)e[h?"insertBefore":"insertAfter"](a);else c.breakParent(a),e.insertAfter(a);else if(c.appendBogus(!0),h||p)for(;f=c[h?"getFirst":"getLast"]();)f[h?"insertBefore":"insertAfter"](a);else for(c.breakParent(a);f=c.getLast();)f.insertAfter(a);
c.remove()}n.selectBookmarks(g);return}if(c&&c.getParent().is("blockquote")){c.breakParent(c.getParent());c.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1))||c.getPrevious().remove();c.getNext().getFirst(CKEDITOR.dom.walker.invisible(1))||c.getNext().remove();a.moveToElementEditStart(c);a.select();return}}else if(c&&c.is("pre")&&!m){t(b,d,a,h);return}if(k=a.splitBlock(n)){d=k.previousBlock;c=k.nextBlock;l=k.wasStartOfBlock;b=k.wasEndOfBlock;c?(g=c.getParent(),g.is("li")&&(c.breakParent(g),
c.move(c.getNext(),1))):d&&(g=d.getParent())&&g.is("li")&&(d.breakParent(g),g=d.getNext(),a.moveToElementEditStart(g),d.move(d.getPrevious()));if(l||b){if(d){if(d.is("li")||!w.test(d.getName())&&!d.is("pre"))e=d.clone()}else c&&(e=c.clone());e?h&&!e.is("li")&&e.renameNode(n):g&&g.is("li")?e=g:(e=f.createElement(n),d&&(p=d.getDirection())&&e.setAttribute("dir",p));if(f=k.elementPath)for(h=0,n=f.elements.length;h<n;h++){g=f.elements[h];if(g.equals(f.block)||g.equals(f.blockLimit))break;CKEDITOR.dtd.$removeEmpty[g.getName()]&&
(g=g.clone(),e.moveChildren(g),e.append(g))}e.appendBogus();e.getParent()||a.insertNode(e);e.is("li")&&e.removeAttribute("value");!CKEDITOR.env.ie||!l||b&&d.getChildCount()||(a.moveToElementEditStart(b?d:e),a.select());a.moveToElementEditStart(l&&!b?c:e)}else c.is("li")&&(e=a.clone(),e.selectNodeContents(c),e=new CKEDITOR.dom.walker(e),e.evaluator=function(a){return!(A(a)||z(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in CKEDITOR.dtd.$inline&&!(a.getName()in CKEDITOR.dtd.$empty))},(g=e.next())&&
g.type==CKEDITOR.NODE_ELEMENT&&g.is("ul","ol")&&(CKEDITOR.env.needsBrFiller?f.createElement("br"):f.createText(" ")).insertBefore(g)),c&&a.moveToElementEditStart(c);a.select();a.scrollIntoView()}}},enterBr:function(b,d,a,h){if(a=a||v(b)){var f=a.document,k=a.checkEndOfBlock(),m=new CKEDITOR.dom.elementPath(b.getSelection().getStartElement()),l=m.block,c=l&&m.block.getName();h||"li"!=c?(!h&&k&&w.test(c)?(k=l.getDirection())?(f=f.createElement("div"),f.setAttribute("dir",k),f.insertAfter(l),a.setStart(f,
0)):(f.createElement("br").insertAfter(l),CKEDITOR.env.gecko&&f.createText("").insertAfter(l),a.setStartAt(l.getNext(),CKEDITOR.env.ie?CKEDITOR.POSITION_BEFORE_START:CKEDITOR.POSITION_AFTER_START)):(b="pre"==c&&CKEDITOR.env.ie&&8>CKEDITOR.env.version?f.createText("\r"):f.createElement("br"),a.deleteContents(),a.insertNode(b),CKEDITOR.env.needsBrFiller?(f.createText("﻿").insertAfter(b),k&&(l||m.blockLimit).appendBogus(),b.getNext().$.nodeValue="",a.setStartAt(b.getNext(),CKEDITOR.POSITION_AFTER_START)):
a.setStartAt(b,CKEDITOR.POSITION_AFTER_END)),a.collapse(!0),a.select(),a.scrollIntoView()):u(b,d,a,h)}}};var x=CKEDITOR.plugins.enterkey,t=x.enterBr,u=x.enterBlock,w=/^h[1-6]$/})();(function(){var b={canUndo:!1,exec:function(a){var b=a.document.createElement("hr");a.insertElement(b)},allowedContent:"hr",requiredContent:"hr"};CKEDITOR.plugins.add("horizontalrule",{init:function(a){a.blockless||(a.addCommand("horizontalrule",b),a.ui.addButton&&a.ui.addButton("HorizontalRule",{label:a.lang.horizontalrule.toolbar,command:"horizontalrule",toolbar:"insert,40"}))}})})();(function(){function m(a,b){var e,f;b.on("refresh",function(a){var b=[k],c;for(c in a.data.states)b.push(a.data.states[c]);this.setState(CKEDITOR.tools.search(b,p)?p:k)},b,null,100);b.on("exec",function(b){e=a.getSelection();f=e.createBookmarks(1);b.data||(b.data={});b.data.done=!1},b,null,0);b.on("exec",function(){a.forceNextSelectionCheck();e.selectBookmarks(f)},b,null,100)}var k=CKEDITOR.TRISTATE_DISABLED,p=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add("indent",{init:function(a){var b=CKEDITOR.plugins.indent.genericDefinition;
m(a,a.addCommand("indent",new b(!0)));m(a,a.addCommand("outdent",new b));a.ui.addButton&&(a.ui.addButton("Indent",{label:a.lang.indent.indent,command:"indent",directional:!0,toolbar:"indent,20"}),a.ui.addButton("Outdent",{label:a.lang.indent.outdent,command:"outdent",directional:!0,toolbar:"indent,10"}));a.on("dirChanged",function(b){var f=a.createRange(),l=b.data.node;f.setStartBefore(l);f.setEndAfter(l);for(var n=new CKEDITOR.dom.walker(f),c;c=n.next();)if(c.type==CKEDITOR.NODE_ELEMENT)if(!c.equals(l)&&
c.getDirection())f.setStartAfter(c),n=new CKEDITOR.dom.walker(f);else{var d=a.config.indentClasses;if(d)for(var g="ltr"==b.data.dir?["_rtl",""]:["","_rtl"],h=0;h<d.length;h++)c.hasClass(d[h]+g[0])&&(c.removeClass(d[h]+g[0]),c.addClass(d[h]+g[1]));d=c.getStyle("margin-right");g=c.getStyle("margin-left");d?c.setStyle("margin-left",d):c.removeStyle("margin-left");g?c.setStyle("margin-right",g):c.removeStyle("margin-right")}})}});CKEDITOR.plugins.indent={genericDefinition:function(a){this.isIndent=!!a;
this.startDisabled=!this.isIndent},specificDefinition:function(a,b,e){this.name=b;this.editor=a;this.jobs={};this.enterBr=a.config.enterMode==CKEDITOR.ENTER_BR;this.isIndent=!!e;this.relatedGlobal=e?"indent":"outdent";this.indentKey=e?9:CKEDITOR.SHIFT+9;this.database={}},registerCommands:function(a,b){a.on("pluginsLoaded",function(){for(var a in b)(function(a,b){var e=a.getCommand(b.relatedGlobal),c;for(c in b.jobs)e.on("exec",function(d){d.data.done||(a.fire("lockSnapshot"),b.execJob(a,c)&&(d.data.done=
!0),a.fire("unlockSnapshot"),CKEDITOR.dom.element.clearAllMarkers(b.database))},this,null,c),e.on("refresh",function(d){d.data.states||(d.data.states={});d.data.states[b.name+"@"+c]=b.refreshJob(a,c,d.data.path)},this,null,c);a.addFeature(b)})(this,b[a])})}};CKEDITOR.plugins.indent.genericDefinition.prototype={context:"p",exec:function(){}};CKEDITOR.plugins.indent.specificDefinition.prototype={execJob:function(a,b){var e=this.jobs[b];if(e.state!=k)return e.exec.call(this,a)},refreshJob:function(a,
b,e){b=this.jobs[b];a.activeFilter.checkFeature(this)?b.state=b.refresh.call(this,a,e):b.state=k;return b.state},getContext:function(a){return a.contains(this.context)}}})();(function(){function f(b,c,a){if(!b.getCustomData("indent_processed")){var d=this.editor,l=this.isIndent;if(c){d=b.$.className.match(this.classNameRegex);a=0;d&&(d=d[1],a=CKEDITOR.tools.indexOf(c,d)+1);if(0>(a+=l?1:-1))return;a=Math.min(a,c.length);a=Math.max(a,0);b.$.className=CKEDITOR.tools.ltrim(b.$.className.replace(this.classNameRegex,""));0<a&&b.addClass(c[a-1])}else{c=m(b,a);a=parseInt(b.getStyle(c),10);var g=d.config.indentOffset||40;isNaN(a)&&(a=0);a+=(l?1:-1)*g;if(0>a)return;a=Math.max(a,
0);a=Math.ceil(a/g)*g;b.setStyle(c,a?a+(d.config.indentUnit||"px"):"");""===b.getAttribute("style")&&b.removeAttribute("style")}CKEDITOR.dom.element.setMarker(this.database,b,"indent_processed",1)}}function m(b,c){return"ltr"==(c||b.getComputedStyle("direction"))?"margin-left":"margin-right"}var h=CKEDITOR.dtd.$listItem,p=CKEDITOR.dtd.$list,k=CKEDITOR.TRISTATE_DISABLED,n=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add("indentblock",{requires:"indent",init:function(b){function c(){a.specificDefinition.apply(this,
arguments);this.allowedContent={"div h1 h2 h3 h4 h5 h6 ol p pre ul":{propertiesOnly:!0,styles:d?null:"margin-left,margin-right",classes:d||null}};this.enterBr&&(this.allowedContent.div=!0);this.requiredContent=(this.enterBr?"div":"p")+(d?"("+d.join(",")+")":"{margin-left}");this.jobs={20:{refresh:function(a,b){var e=b.block||b.blockLimit;if(!e.is(h))var c=e.getAscendant(h),e=c&&b.contains(c)||e;e.is(h)&&(e=e.getParent());if(this.enterBr||this.getContext(b)){if(d){var c=d,e=e.$.className.match(this.classNameRegex),
f=this.isIndent,c=e?f?e[1]!=c.slice(-1):!0:f;return c?n:k}return this.isIndent?n:e?CKEDITOR[0>=(parseInt(e.getStyle(m(e)),10)||0)?"TRISTATE_DISABLED":"TRISTATE_OFF"]:k}return k},exec:function(a){var b=a.getSelection(),b=b&&b.getRanges()[0],c;if(c=a.elementPath().contains(p))f.call(this,c,d);else for(b=b.createIterator(),a=a.config.enterMode,b.enforceRealBlocks=!0,b.enlargeBr=a!=CKEDITOR.ENTER_BR;c=b.getNextParagraph(a==CKEDITOR.ENTER_P?"p":"div");)c.isReadOnly()||f.call(this,c,d);return!0}}}}var a=
CKEDITOR.plugins.indent,d=b.config.indentClasses;a.registerCommands(b,{indentblock:new c(b,"indentblock",!0),outdentblock:new c(b,"outdentblock")});CKEDITOR.tools.extend(c.prototype,a.specificDefinition.prototype,{context:{div:1,dl:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ul:1,ol:1,p:1,pre:1,table:1},classNameRegex:d?new RegExp("(?:^|\\s+)("+d.join("|")+")(?\x3d$|\\s)"):null})}})})();(function(){function w(c){function f(b){for(var e=d.startContainer,a=d.endContainer;e&&!e.getParent().equals(b);)e=e.getParent();for(;a&&!a.getParent().equals(b);)a=a.getParent();if(!e||!a)return!1;for(var g=e,e=[],k=!1;!k;)g.equals(a)&&(k=!0),e.push(g),g=g.getNext();if(1>e.length)return!1;g=b.getParents(!0);for(a=0;a<g.length;a++)if(g[a].getName&&p[g[a].getName()]){b=g[a];break}for(var g=l.isIndent?1:-1,a=e[0],e=e[e.length-1],k=CKEDITOR.plugins.list.listToArray(b,q),n=k[e.getCustomData("listarray_index")].indent,
a=a.getCustomData("listarray_index");a<=e.getCustomData("listarray_index");a++)if(k[a].indent+=g,0<g){var h=k[a].parent;k[a].parent=new CKEDITOR.dom.element(h.getName(),h.getDocument())}for(a=e.getCustomData("listarray_index")+1;a<k.length&&k[a].indent>n;a++)k[a].indent+=g;e=CKEDITOR.plugins.list.arrayToList(k,q,null,c.config.enterMode,b.getDirection());if(!l.isIndent){var f;if((f=b.getParent())&&f.is("li"))for(var g=e.listNode.getChildren(),r=[],m,a=g.count()-1;0<=a;a--)(m=g.getItem(a))&&m.is&&m.is("li")&&
r.push(m)}e&&e.listNode.replace(b);if(r&&r.length)for(a=0;a<r.length;a++){for(m=b=r[a];(m=m.getNext())&&m.is&&m.getName()in p;)CKEDITOR.env.needsNbspFiller&&!b.getFirst(x)&&b.append(d.document.createText(" ")),b.append(m);b.insertAfter(f)}e&&c.fire("contentDomInvalidated");return!0}for(var l=this,q=this.database,p=this.context,n=c.getSelection(),n=(n&&n.getRanges()).createIterator(),d;d=n.getNextRange();){for(var b=d.getCommonAncestor();b&&(b.type!=CKEDITOR.NODE_ELEMENT||!p[b.getName()]);){if(c.editable().equals(b)){b=
!1;break}b=b.getParent()}b||(b=d.startPath().contains(p))&&d.setEndAt(b,CKEDITOR.POSITION_BEFORE_END);if(!b){var h=d.getEnclosedNode();h&&h.type==CKEDITOR.NODE_ELEMENT&&h.getName()in p&&(d.setStartAt(h,CKEDITOR.POSITION_AFTER_START),d.setEndAt(h,CKEDITOR.POSITION_BEFORE_END),b=h)}b&&d.startContainer.type==CKEDITOR.NODE_ELEMENT&&d.startContainer.getName()in p&&(h=new CKEDITOR.dom.walker(d),h.evaluator=t,d.startContainer=h.next());b&&d.endContainer.type==CKEDITOR.NODE_ELEMENT&&d.endContainer.getName()in
p&&(h=new CKEDITOR.dom.walker(d),h.evaluator=t,d.endContainer=h.previous());if(b)return f(b)}return 0}function t(c){return c.type==CKEDITOR.NODE_ELEMENT&&c.is("li")}function x(c){return y(c)&&z(c)}var y=CKEDITOR.dom.walker.whitespaces(!0),z=CKEDITOR.dom.walker.bookmark(!1,!0),u=CKEDITOR.TRISTATE_DISABLED,v=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add("indentlist",{requires:"indent",init:function(c){function f(c){l.specificDefinition.apply(this,arguments);this.requiredContent=["ul","ol"];c.on("key",
function(f){if("wysiwyg"==c.mode&&f.data.keyCode==this.indentKey){var n=this.getContext(c.elementPath());!n||this.isIndent&&CKEDITOR.plugins.indentList.firstItemInPath(this.context,c.elementPath(),n)||(c.execCommand(this.relatedGlobal),f.cancel())}},this);this.jobs[this.isIndent?10:30]={refresh:this.isIndent?function(c,f){var d=this.getContext(f),b=CKEDITOR.plugins.indentList.firstItemInPath(this.context,f,d);return d&&this.isIndent&&!b?v:u}:function(c,f){return!this.getContext(f)||this.isIndent?
u:v},exec:CKEDITOR.tools.bind(w,this)}}var l=CKEDITOR.plugins.indent;l.registerCommands(c,{indentlist:new f(c,"indentlist",!0),outdentlist:new f(c,"outdentlist")});CKEDITOR.tools.extend(f.prototype,l.specificDefinition.prototype,{context:{ol:1,ul:1}})}});CKEDITOR.plugins.indentList={};CKEDITOR.plugins.indentList.firstItemInPath=function(c,f,l){var q=f.contains(t);l||(l=f.contains(c));return l&&q&&q.equals(l.getFirst(t))}})();(function(){function n(a,c){c=void 0===c||c;var b;if(c)b=a.getComputedStyle("text-align");else{for(;!a.hasAttribute||!a.hasAttribute("align")&&!a.getStyle("text-align");){b=a.getParent();if(!b)break;a=b}b=a.getStyle("text-align")||a.getAttribute("align")||""}b&&(b=b.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i,""));!b&&c&&(b="rtl"==a.getComputedStyle("direction")?"right":"left");return b}function g(a,c,b){this.editor=a;this.name=c;this.value=b;this.context="p";c=a.config.justifyClasses;var h=a.config.enterMode==
CKEDITOR.ENTER_P?"p":"div";if(c){switch(b){case "left":this.cssClassName=c[0];break;case "center":this.cssClassName=c[1];break;case "right":this.cssClassName=c[2];break;case "justify":this.cssClassName=c[3]}this.cssClassRegex=new RegExp("(?:^|\\s+)(?:"+c.join("|")+")(?\x3d$|\\s)");this.requiredContent=h+"("+this.cssClassName+")"}else this.requiredContent=h+"{text-align}";this.allowedContent={"caption div h1 h2 h3 h4 h5 h6 p pre td th li":{propertiesOnly:!0,styles:this.cssClassName?null:"text-align",
classes:this.cssClassName||null}};a.config.enterMode==CKEDITOR.ENTER_BR&&(this.allowedContent.div=!0)}function l(a){var c=a.editor,b=c.createRange();b.setStartBefore(a.data.node);b.setEndAfter(a.data.node);for(var h=new CKEDITOR.dom.walker(b),d;d=h.next();)if(d.type==CKEDITOR.NODE_ELEMENT)if(!d.equals(a.data.node)&&d.getDirection())b.setStartAfter(d),h=new CKEDITOR.dom.walker(b);else{var e=c.config.justifyClasses;e&&(d.hasClass(e[0])?(d.removeClass(e[0]),d.addClass(e[2])):d.hasClass(e[2])&&(d.removeClass(e[2]),
d.addClass(e[0])));e=d.getStyle("text-align");"left"==e?d.setStyle("text-align","right"):"right"==e&&d.setStyle("text-align","left")}}g.prototype={exec:function(a){var c=a.getSelection(),b=a.config.enterMode;if(c){for(var h=c.createBookmarks(),d=c.getRanges(),e=this.cssClassName,g,f,k=a.config.useComputedState,k=void 0===k||k,m=d.length-1;0<=m;m--)for(g=d[m].createIterator(),g.enlargeBr=b!=CKEDITOR.ENTER_BR;f=g.getNextParagraph(b==CKEDITOR.ENTER_P?"p":"div");)if(!f.isReadOnly()){f.removeAttribute("align");
f.removeStyle("text-align");var l=e&&(f.$.className=CKEDITOR.tools.ltrim(f.$.className.replace(this.cssClassRegex,""))),p=this.state==CKEDITOR.TRISTATE_OFF&&(!k||n(f,!0)!=this.value);e?p?f.addClass(e):l||f.removeAttribute("class"):p&&f.setStyle("text-align",this.value)}a.focus();a.forceNextSelectionCheck();c.selectBookmarks(h)}},refresh:function(a,c){var b=c.block||c.blockLimit;this.setState("body"!=b.getName()&&n(b,this.editor.config.useComputedState)==this.value?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF)}};
CKEDITOR.plugins.add("justify",{init:function(a){if(!a.blockless){var c=new g(a,"justifyleft","left"),b=new g(a,"justifycenter","center"),h=new g(a,"justifyright","right"),d=new g(a,"justifyblock","justify");a.addCommand("justifyleft",c);a.addCommand("justifycenter",b);a.addCommand("justifyright",h);a.addCommand("justifyblock",d);a.ui.addButton&&(a.ui.addButton("JustifyLeft",{label:a.lang.justify.left,command:"justifyleft",toolbar:"align,10"}),a.ui.addButton("JustifyCenter",{label:a.lang.justify.center,
command:"justifycenter",toolbar:"align,20"}),a.ui.addButton("JustifyRight",{label:a.lang.justify.right,command:"justifyright",toolbar:"align,30"}),a.ui.addButton("JustifyBlock",{label:a.lang.justify.block,command:"justifyblock",toolbar:"align,40"}));a.on("dirChanged",l)}}})})();(function(){function I(b,m,e){function c(c){if(!(!(a=d[c?"getFirst":"getLast"]())||a.is&&a.isBlockBoundary()||!(p=m.root[c?"getPrevious":"getNext"](CKEDITOR.dom.walker.invisible(!0)))||p.is&&p.isBlockBoundary({br:1})))b.document.createElement("br")[c?"insertBefore":"insertAfter"](a)}for(var f=CKEDITOR.plugins.list.listToArray(m.root,e),g=[],k=0;k<m.contents.length;k++){var h=m.contents[k];(h=h.getAscendant("li",!0))&&!h.getCustomData("list_item_processed")&&(g.push(h),CKEDITOR.dom.element.setMarker(e,
h,"list_item_processed",!0))}h=null;for(k=0;k<g.length;k++)h=g[k].getCustomData("listarray_index"),f[h].indent=-1;for(k=h+1;k<f.length;k++)if(f[k].indent>f[k-1].indent+1){g=f[k-1].indent+1-f[k].indent;for(h=f[k].indent;f[k]&&f[k].indent>=h;)f[k].indent+=g,k++;k--}var d=CKEDITOR.plugins.list.arrayToList(f,e,null,b.config.enterMode,m.root.getAttribute("dir")).listNode,a,p;c(!0);c();d.replace(m.root);b.fire("contentDomInvalidated")}function B(b,m){this.name=b;this.context=this.type=m;this.allowedContent=
m+" li";this.requiredContent=m}function E(b,m,e,c){for(var f,g;f=b[c?"getLast":"getFirst"](J);)(g=f.getDirection(1))!==m.getDirection(1)&&f.setAttribute("dir",g),f.remove(),e?f[c?"insertBefore":"insertAfter"](e):m.append(f,c)}function F(b){function m(e){var c=b[e?"getPrevious":"getNext"](u);c&&c.type==CKEDITOR.NODE_ELEMENT&&c.is(b.getName())&&(E(b,c,null,!e),b.remove(),b=c)}m();m(1)}function G(b){return b.type==CKEDITOR.NODE_ELEMENT&&(b.getName()in CKEDITOR.dtd.$block||b.getName()in CKEDITOR.dtd.$listItem)&&
CKEDITOR.dtd[b.getName()]["#"]}function C(b,m,e){b.fire("saveSnapshot");e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);var c=e.extractContents();m.trim(!1,!0);var f=m.createBookmark(),g=new CKEDITOR.dom.elementPath(m.startContainer),k=g.block,g=g.lastElement.getAscendant("li",1)||k,h=new CKEDITOR.dom.elementPath(e.startContainer),d=h.contains(CKEDITOR.dtd.$listItem),h=h.contains(CKEDITOR.dtd.$list);k?(k=k.getBogus())&&k.remove():h&&(k=h.getPrevious(u))&&z(k)&&k.remove();(k=c.getLast())&&k.type==CKEDITOR.NODE_ELEMENT&&
k.is("br")&&k.remove();(k=m.startContainer.getChild(m.startOffset))?c.insertBefore(k):m.startContainer.append(c);d&&(c=A(d))&&(g.contains(d)?(E(c,d.getParent(),d),c.remove()):g.append(c));for(;e.checkStartOfBlock()&&e.checkEndOfBlock();){h=e.startPath();c=h.block;if(!c)break;c.is("li")&&(g=c.getParent(),c.equals(g.getLast(u))&&c.equals(g.getFirst(u))&&(c=g));e.moveToPosition(c,CKEDITOR.POSITION_BEFORE_START);c.remove()}e=e.clone();c=b.editable();e.setEndAt(c,CKEDITOR.POSITION_BEFORE_END);e=new CKEDITOR.dom.walker(e);
e.evaluator=function(a){return u(a)&&!z(a)};(e=e.next())&&e.type==CKEDITOR.NODE_ELEMENT&&e.getName()in CKEDITOR.dtd.$list&&F(e);m.moveToBookmark(f);m.select();b.fire("saveSnapshot")}function A(b){return(b=b.getLast(u))&&b.type==CKEDITOR.NODE_ELEMENT&&b.getName()in v?b:null}var v={ol:1,ul:1},K=CKEDITOR.dom.walker.whitespaces(),H=CKEDITOR.dom.walker.bookmark(),u=function(b){return!(K(b)||H(b))},z=CKEDITOR.dom.walker.bogus();CKEDITOR.plugins.list={listToArray:function(b,m,e,c,f){if(!v[b.getName()])return[];
c||(c=0);e||(e=[]);for(var g=0,k=b.getChildCount();g<k;g++){var h=b.getChild(g);h.type==CKEDITOR.NODE_ELEMENT&&h.getName()in CKEDITOR.dtd.$list&&CKEDITOR.plugins.list.listToArray(h,m,e,c+1);if("li"==h.$.nodeName.toLowerCase()){var d={parent:b,indent:c,element:h,contents:[]};f?d.grandparent=f:(d.grandparent=b.getParent(),d.grandparent&&"li"==d.grandparent.$.nodeName.toLowerCase()&&(d.grandparent=d.grandparent.getParent()));m&&CKEDITOR.dom.element.setMarker(m,h,"listarray_index",e.length);e.push(d);
for(var a=0,p=h.getChildCount(),l;a<p;a++)l=h.getChild(a),l.type==CKEDITOR.NODE_ELEMENT&&v[l.getName()]?CKEDITOR.plugins.list.listToArray(l,m,e,c+1,d.grandparent):d.contents.push(l)}}return e},arrayToList:function(b,m,e,c,f){e||(e=0);if(!b||b.length<e+1)return null;for(var g,k=b[e].parent.getDocument(),h=new CKEDITOR.dom.documentFragment(k),d=null,a=e,p=Math.max(b[e].indent,0),l=null,q,n,t=c==CKEDITOR.ENTER_P?"p":"div";;){var r=b[a];g=r.grandparent;q=r.element.getDirection(1);if(r.indent==p){d&&b[a].parent.getName()==
d.getName()||(d=b[a].parent.clone(!1,1),f&&d.setAttribute("dir",f),h.append(d));l=d.append(r.element.clone(0,1));q!=d.getDirection(1)&&l.setAttribute("dir",q);for(g=0;g<r.contents.length;g++)l.append(r.contents[g].clone(1,1));a++}else if(r.indent==Math.max(p,0)+1)r=b[a-1].element.getDirection(1),a=CKEDITOR.plugins.list.arrayToList(b,null,a,c,r!=q?q:null),!l.getChildCount()&&CKEDITOR.env.needsNbspFiller&&7>=k.$.documentMode&&l.append(k.createText(" ")),l.append(a.listNode),a=a.nextIndex;else if(-1==
r.indent&&!e&&g){v[g.getName()]?(l=r.element.clone(!1,!0),q!=g.getDirection(1)&&l.setAttribute("dir",q)):l=new CKEDITOR.dom.documentFragment(k);var d=g.getDirection(1)!=q,y=r.element,D=y.getAttribute("class"),z=y.getAttribute("style"),A=l.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&(c!=CKEDITOR.ENTER_BR||d||z||D),w,B=r.contents.length,x;for(g=0;g<B;g++)if(w=r.contents[g],H(w)&&1<B)A?x=w.clone(1,1):l.append(w.clone(1,1));else if(w.type==CKEDITOR.NODE_ELEMENT&&w.isBlockBoundary()){d&&!w.getDirection()&&
w.setAttribute("dir",q);n=w;var C=y.getAttribute("style");C&&n.setAttribute("style",C.replace(/([^;])$/,"$1;")+(n.getAttribute("style")||""));D&&w.addClass(D);n=null;x&&(l.append(x),x=null);l.append(w.clone(1,1))}else A?(n||(n=k.createElement(t),l.append(n),d&&n.setAttribute("dir",q)),z&&n.setAttribute("style",z),D&&n.setAttribute("class",D),x&&(n.append(x),x=null),n.append(w.clone(1,1))):l.append(w.clone(1,1));x&&((n||l).append(x),x=null);l.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&a!=b.length-1&&(CKEDITOR.env.needsBrFiller&&
(q=l.getLast())&&q.type==CKEDITOR.NODE_ELEMENT&&q.is("br")&&q.remove(),(q=l.getLast(u))&&q.type==CKEDITOR.NODE_ELEMENT&&q.is(CKEDITOR.dtd.$block)||l.append(k.createElement("br")));q=l.$.nodeName.toLowerCase();"div"!=q&&"p"!=q||l.appendBogus();h.append(l);d=null;a++}else return null;n=null;if(b.length<=a||Math.max(b[a].indent,0)<p)break}if(m)for(b=h.getFirst();b;){if(b.type==CKEDITOR.NODE_ELEMENT&&(CKEDITOR.dom.element.clearMarkers(m,b),b.getName()in CKEDITOR.dtd.$listItem&&(e=b,k=f=c=void 0,c=e.getDirection()))){for(f=
e.getParent();f&&!(k=f.getDirection());)f=f.getParent();c==k&&e.removeAttribute("dir")}b=b.getNextSourceNode()}return{listNode:h,nextIndex:a}}};var L=/^h[1-6]$/,J=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);B.prototype={exec:function(b){this.refresh(b,b.elementPath());var m=b.config,e=b.getSelection(),c=e&&e.getRanges();if(this.state==CKEDITOR.TRISTATE_OFF){var f=b.editable();if(f.getFirst(u)){var g=1==c.length&&c[0];(m=g&&g.getEnclosedNode())&&m.is&&this.type==m.getName()&&this.setState(CKEDITOR.TRISTATE_ON)}else m.enterMode==
CKEDITOR.ENTER_BR?f.appendBogus():c[0].fixBlock(1,m.enterMode==CKEDITOR.ENTER_P?"p":"div"),e.selectRanges(c)}for(var m=e.createBookmarks(!0),f=[],k={},c=c.createIterator(),h=0;(g=c.getNextRange())&&++h;){var d=g.getBoundaryNodes(),a=d.startNode,p=d.endNode;a.type==CKEDITOR.NODE_ELEMENT&&"td"==a.getName()&&g.setStartAt(d.startNode,CKEDITOR.POSITION_AFTER_START);p.type==CKEDITOR.NODE_ELEMENT&&"td"==p.getName()&&g.setEndAt(d.endNode,CKEDITOR.POSITION_BEFORE_END);g=g.createIterator();for(g.forceBrBreak=
this.state==CKEDITOR.TRISTATE_OFF;d=g.getNextParagraph();)if(!d.getCustomData("list_block")){CKEDITOR.dom.element.setMarker(k,d,"list_block",1);for(var l=b.elementPath(d),a=l.elements,p=0,l=l.blockLimit,q,n=a.length-1;0<=n&&(q=a[n]);n--)if(v[q.getName()]&&l.contains(q)){l.removeCustomData("list_group_object_"+h);(a=q.getCustomData("list_group_object"))?a.contents.push(d):(a={root:q,contents:[d]},f.push(a),CKEDITOR.dom.element.setMarker(k,q,"list_group_object",a));p=1;break}p||(p=l,p.getCustomData("list_group_object_"+
h)?p.getCustomData("list_group_object_"+h).contents.push(d):(a={root:p,contents:[d]},CKEDITOR.dom.element.setMarker(k,p,"list_group_object_"+h,a),f.push(a)))}}for(q=[];0<f.length;)if(a=f.shift(),this.state==CKEDITOR.TRISTATE_OFF)if(v[a.root.getName()]){c=b;h=a;a=k;g=q;p=CKEDITOR.plugins.list.listToArray(h.root,a);l=[];for(d=0;d<h.contents.length;d++)n=h.contents[d],(n=n.getAscendant("li",!0))&&!n.getCustomData("list_item_processed")&&(l.push(n),CKEDITOR.dom.element.setMarker(a,n,"list_item_processed",
!0));for(var n=h.root.getDocument(),t=void 0,r=void 0,d=0;d<l.length;d++){var y=l[d].getCustomData("listarray_index"),t=p[y].parent;t.is(this.type)||(r=n.createElement(this.type),t.copyAttributes(r,{start:1,type:1}),r.removeStyle("list-style-type"),p[y].parent=r)}a=CKEDITOR.plugins.list.arrayToList(p,a,null,c.config.enterMode);p=void 0;l=a.listNode.getChildCount();for(d=0;d<l&&(p=a.listNode.getChild(d));d++)p.getName()==this.type&&g.push(p);a.listNode.replace(h.root);c.fire("contentDomInvalidated")}else{p=
b;g=a;d=q;l=g.contents;c=g.root.getDocument();h=[];1==l.length&&l[0].equals(g.root)&&(a=c.createElement("div"),l[0].moveChildren&&l[0].moveChildren(a),l[0].append(a),l[0]=a);g=g.contents[0].getParent();for(n=0;n<l.length;n++)g=g.getCommonAncestor(l[n].getParent());t=p.config.useComputedState;p=a=void 0;t=void 0===t||t;for(n=0;n<l.length;n++)for(r=l[n];y=r.getParent();){if(y.equals(g)){h.push(r);!p&&r.getDirection()&&(p=1);r=r.getDirection(t);null!==a&&(a=a&&a!=r?null:r);break}r=y}if(!(1>h.length)){l=
h[h.length-1].getNext();n=c.createElement(this.type);d.push(n);for(t=d=void 0;h.length;)d=h.shift(),t=c.createElement("li"),r=d,r.is("pre")||L.test(r.getName())||"false"==r.getAttribute("contenteditable")?d.appendTo(t):(d.copyAttributes(t),a&&d.getDirection()&&(t.removeStyle("direction"),t.removeAttribute("dir")),d.moveChildren(t),d.remove()),t.appendTo(n);a&&p&&n.setAttribute("dir",a);l?n.insertBefore(l):n.appendTo(g)}}else this.state==CKEDITOR.TRISTATE_ON&&v[a.root.getName()]&&I.call(this,b,a,k);
for(n=0;n<q.length;n++)F(q[n]);CKEDITOR.dom.element.clearAllMarkers(k);e.selectBookmarks(m);b.focus()},refresh:function(b,m){var e=m.contains(v,1),c=m.blockLimit||m.root;e&&c.contains(e)?this.setState(e.is(this.type)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_OFF)}};CKEDITOR.plugins.add("list",{requires:"indentlist",init:function(b){b.blockless||(b.addCommand("numberedlist",new B("numberedlist","ol")),b.addCommand("bulletedlist",new B("bulletedlist","ul")),b.ui.addButton&&
(b.ui.addButton("NumberedList",{label:b.lang.list.numberedlist,command:"numberedlist",directional:!0,toolbar:"list,10"}),b.ui.addButton("BulletedList",{label:b.lang.list.bulletedlist,command:"bulletedlist",directional:!0,toolbar:"list,20"})),b.on("key",function(m){var e=m.data.domEvent.getKey(),c;if("wysiwyg"==b.mode&&e in{8:1,46:1}){var f=b.getSelection().getRanges()[0],g=f&&f.startPath();if(f&&f.collapsed){var k=8==e,h=b.editable(),d=new CKEDITOR.dom.walker(f.clone());d.evaluator=function(a){return u(a)&&
!z(a)};d.guard=function(a,b){return!(b&&a.type==CKEDITOR.NODE_ELEMENT&&a.is("table"))};e=f.clone();if(k){var a;(a=g.contains(v))&&f.checkBoundaryOfElement(a,CKEDITOR.START)&&(a=a.getParent())&&a.is("li")&&(a=A(a))?(c=a,a=a.getPrevious(u),e.moveToPosition(a&&z(a)?a:c,CKEDITOR.POSITION_BEFORE_START)):(d.range.setStartAt(h,CKEDITOR.POSITION_AFTER_START),d.range.setEnd(f.startContainer,f.startOffset),(a=d.previous())&&a.type==CKEDITOR.NODE_ELEMENT&&(a.getName()in v||a.is("li"))&&(a.is("li")||(d.range.selectNodeContents(a),
d.reset(),d.evaluator=G,a=d.previous()),c=a,e.moveToElementEditEnd(c),e.moveToPosition(e.endPath().block,CKEDITOR.POSITION_BEFORE_END)));if(c)C(b,e,f),m.cancel();else{var p=g.contains(v);p&&f.checkBoundaryOfElement(p,CKEDITOR.START)&&(c=p.getFirst(u),f.checkBoundaryOfElement(c,CKEDITOR.START)&&(a=p.getPrevious(u),A(c)?a&&(f.moveToElementEditEnd(a),f.select()):b.execCommand("outdent"),m.cancel()))}}else if(c=g.contains("li")){if(d.range.setEndAt(h,CKEDITOR.POSITION_BEFORE_END),k=(h=c.getLast(u))&&
G(h)?h:c,g=0,(a=d.next())&&a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in v&&a.equals(h)?(g=1,a=d.next()):f.checkBoundaryOfElement(k,CKEDITOR.END)&&(g=2),g&&a){f=f.clone();f.moveToElementEditStart(a);if(1==g&&(e.optimize(),!e.startContainer.equals(c))){for(c=e.startContainer;c.is(CKEDITOR.dtd.$inline);)p=c,c=c.getParent();p&&e.moveToPosition(p,CKEDITOR.POSITION_AFTER_END)}2==g&&(e.moveToPosition(e.endPath().block,CKEDITOR.POSITION_BEFORE_END),f.endPath().block&&f.moveToPosition(f.endPath().block,CKEDITOR.POSITION_AFTER_START));
C(b,e,f);m.cancel()}}else d.range.setEndAt(h,CKEDITOR.POSITION_BEFORE_END),(a=d.next())&&a.type==CKEDITOR.NODE_ELEMENT&&a.is(v)&&(a=a.getFirst(u),g.block&&f.checkStartOfBlock()&&f.checkEndOfBlock()?(g.block.remove(),f.moveToElementEditStart(a),f.select()):A(a)?(f.moveToElementEditStart(a),f.select()):(f=f.clone(),f.moveToElementEditStart(a),C(b,e,f)),m.cancel());setTimeout(function(){b.selectionChange(1)})}}}))}})})();(function(){function h(a,d,f){var b=CKEDITOR.cleanWord;b?f():(a=CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile||d+"filter/default.js"),CKEDITOR.scriptLoader.load(a,f,null,!0));return!b}function k(a){a.data.type="html"}CKEDITOR.plugins.add("pastefromword",{requires:"clipboard",init:function(a){var d=0,f=this.path;a.addCommand("pastefromword",{canUndo:!1,async:!0,exec:function(a){var e=this;d=1;a.once("beforePaste",k);a.getClipboardData({title:a.lang.pastefromword.title},function(c){c&&a.fire("paste",
{type:"html",dataValue:c.dataValue,method:"paste",dataTransfer:CKEDITOR.plugins.clipboard.initPasteDataTransfer()});a.fire("afterCommandExec",{name:"pastefromword",command:e,returnValue:!!c})})}});a.ui.addButton&&a.ui.addButton("PasteFromWord",{label:a.lang.pastefromword.toolbar,command:"pastefromword",toolbar:"clipboard,50"});a.on("pasteState",function(b){a.getCommand("pastefromword").setState(b.data)});a.on("paste",function(b){var e=b.data,c=e.dataValue;if(c&&(d||/(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(c))){e.dontFilter=
!0;var g=h(a,f,function(){if(g)a.fire("paste",e);else if(!a.config.pasteFromWordPromptCleanup||d||confirm(a.lang.pastefromword.confirmCleanup))e.dataValue=CKEDITOR.cleanWord(c,a);d=0});g&&b.cancel()}},null,null,3)}})})();CKEDITOR.plugins.add("removeformat",{init:function(a){a.addCommand("removeFormat",CKEDITOR.plugins.removeformat.commands.removeformat);a.ui.addButton&&a.ui.addButton("RemoveFormat",{label:a.lang.removeformat.toolbar,command:"removeFormat",toolbar:"cleanup,10"})}});
CKEDITOR.plugins.removeformat={commands:{removeformat:{exec:function(a){for(var h=a._.removeFormatRegex||(a._.removeFormatRegex=new RegExp("^(?:"+a.config.removeFormatTags.replace(/,/g,"|")+")$","i")),e=a._.removeAttributes||(a._.removeAttributes=a.config.removeFormatAttributes.split(",")),f=CKEDITOR.plugins.removeformat.filter,m=a.getSelection().getRanges(),n=m.createIterator(),p=function(a){return a.type==CKEDITOR.NODE_ELEMENT},c;c=n.getNextRange();){c.collapsed||c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
var l=c.createBookmark(),b=l.startNode,d=l.endNode,k=function(b){for(var c=a.elementPath(b),e=c.elements,d=1,g;(g=e[d])&&!g.equals(c.block)&&!g.equals(c.blockLimit);d++)h.test(g.getName())&&f(a,g)&&b.breakParent(g)};k(b);if(d)for(k(d),b=b.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT);b&&!b.equals(d);)if(b.isReadOnly()){if(b.getPosition(d)&CKEDITOR.POSITION_CONTAINS)break;b=b.getNext(p)}else k=b.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT),"img"==b.getName()&&b.data("cke-realelement")||!f(a,b)||(h.test(b.getName())?
b.remove(1):(b.removeAttributes(e),a.fire("removeFormatCleanup",b))),b=k;c.moveToBookmark(l)}a.forceNextSelectionCheck();a.getSelection().selectRanges(m)}}},filter:function(a,h){for(var e=a._.removeFormatFilters||[],f=0;f<e.length;f++)if(!1===e[f](h))return!1;return!0}};CKEDITOR.editor.prototype.addRemoveFormatFilter=function(a){this._.removeFormatFilters||(this._.removeFormatFilters=[]);this._.removeFormatFilters.push(a)};CKEDITOR.config.removeFormatTags="b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var";
CKEDITOR.config.removeFormatAttributes="class,style,lang,width,height,align,hspace,valign";(function(){function k(c){return{editorFocus:!1,canUndo:!1,modes:{wysiwyg:1},exec:function(d){if(d.editable().hasFocus){var e=d.getSelection(),b;if(b=(new CKEDITOR.dom.elementPath(e.getCommonAncestor(),e.root)).contains({td:1,th:1},1)){var e=d.createRange(),a=CKEDITOR.tools.tryThese(function(){var a=b.getParent().$.cells[b.$.cellIndex+(c?-1:1)];a.parentNode.parentNode;return a},function(){var a=b.getParent(),a=a.getAscendant("table").$.rows[a.$.rowIndex+(c?-1:1)];return a.cells[c?a.cells.length-1:
0]});if(a||c)if(a)a=new CKEDITOR.dom.element(a),e.moveToElementEditStart(a),e.checkStartOfBlock()&&e.checkEndOfBlock()||e.selectNodeContents(a);else return!0;else{for(var f=b.getAscendant("table").$,a=b.getParent().$.cells,f=new CKEDITOR.dom.element(f.insertRow(-1),d.document),g=0,h=a.length;g<h;g++)f.append((new CKEDITOR.dom.element(a[g],d.document)).clone(!1,!1)).appendBogus();e.moveToElementEditStart(f)}e.select(!0);return!0}}return!1}}}var h={editorFocus:!1,modes:{wysiwyg:1,source:1}},g={exec:function(c){c.container.focusNext(!0,
c.tabIndex)}},f={exec:function(c){c.container.focusPrevious(!0,c.tabIndex)}};CKEDITOR.plugins.add("tab",{init:function(c){for(var d=!1!==c.config.enableTabKeyTools,e=c.config.tabSpaces||0,b="";e--;)b+=" ";if(b)c.on("key",function(a){9==a.data.keyCode&&(c.insertText(b),a.cancel())});if(d)c.on("key",function(a){(9==a.data.keyCode&&c.execCommand("selectNextCell")||a.data.keyCode==CKEDITOR.SHIFT+9&&c.execCommand("selectPreviousCell"))&&a.cancel()});c.addCommand("blur",CKEDITOR.tools.extend(g,h));c.addCommand("blurBack",
CKEDITOR.tools.extend(f,h));c.addCommand("selectNextCell",k());c.addCommand("selectPreviousCell",k(!0))}})})();
CKEDITOR.dom.element.prototype.focusNext=function(k,h){var g=void 0===h?this.getTabIndex():h,f,c,d,e,b,a;if(0>=g)for(b=this.getNextSourceNode(k,CKEDITOR.NODE_ELEMENT);b;){if(b.isVisible()&&0===b.getTabIndex()){d=b;break}b=b.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT)}else for(b=this.getDocument().getBody().getFirst();b=b.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!f)if(!c&&b.equals(this)){if(c=!0,k){if(!(b=b.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;f=1}}else c&&!this.contains(b)&&
(f=1);if(b.isVisible()&&!(0>(a=b.getTabIndex()))){if(f&&a==g){d=b;break}a>g&&(!d||!e||a<e)?(d=b,e=a):d||0!==a||(d=b,e=a)}}d&&d.focus()};
CKEDITOR.dom.element.prototype.focusPrevious=function(k,h){for(var g=void 0===h?this.getTabIndex():h,f,c,d,e=0,b,a=this.getDocument().getBody().getLast();a=a.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!f)if(!c&&a.equals(this)){if(c=!0,k){if(!(a=a.getPreviousSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;f=1}}else c&&!this.contains(a)&&(f=1);if(a.isVisible()&&!(0>(b=a.getTabIndex())))if(0>=g){if(f&&0===b){d=a;break}b>e&&(d=a,e=b)}else{if(f&&b==g){d=a;break}b<g&&(!d||b>e)&&(d=a,e=b)}}d&&d.focus()};(function(){var g=[CKEDITOR.CTRL+90,CKEDITOR.CTRL+89,CKEDITOR.CTRL+CKEDITOR.SHIFT+90],n={8:1,46:1};CKEDITOR.plugins.add("undo",{init:function(a){function b(a){d.enabled&&!1!==a.data.command.canUndo&&d.save()}function c(){d.enabled=a.readOnly?!1:"wysiwyg"==a.mode;d.onChange()}var d=a.undoManager=new e(a),l=d.editingHandler=new k(d),f=a.addCommand("undo",{exec:function(){d.undo()&&(a.selectionChange(),this.fire("afterUndo"))},startDisabled:!0,canUndo:!1}),h=a.addCommand("redo",{exec:function(){d.redo()&&
(a.selectionChange(),this.fire("afterRedo"))},startDisabled:!0,canUndo:!1});a.setKeystroke([[g[0],"undo"],[g[1],"redo"],[g[2],"redo"]]);d.onChange=function(){f.setState(d.undoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);h.setState(d.redoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)};a.on("beforeCommandExec",b);a.on("afterCommandExec",b);a.on("saveSnapshot",function(a){d.save(a.data&&a.data.contentOnly)});a.on("contentDom",l.attachListeners,l);a.on("instanceReady",function(){a.fire("saveSnapshot")});
a.on("beforeModeUnload",function(){"wysiwyg"==a.mode&&d.save(!0)});a.on("mode",c);a.on("readOnly",c);a.ui.addButton&&(a.ui.addButton("Undo",{label:a.lang.undo.undo,command:"undo",toolbar:"undo,10"}),a.ui.addButton("Redo",{label:a.lang.undo.redo,command:"redo",toolbar:"undo,20"}));a.resetUndo=function(){d.reset();a.fire("saveSnapshot")};a.on("updateSnapshot",function(){d.currentImage&&d.update()});a.on("lockSnapshot",function(a){a=a.data;d.lock(a&&a.dontUpdate,a&&a.forceUpdate)});a.on("unlockSnapshot",
d.unlock,d)}});CKEDITOR.plugins.undo={};var e=CKEDITOR.plugins.undo.UndoManager=function(a){this.strokesRecorded=[0,0];this.locked=null;this.previousKeyGroup=-1;this.limit=a.config.undoStackSize||20;this.strokesLimit=25;this.editor=a;this.reset()};e.prototype={type:function(a,b){var c=e.getKeyGroup(a),d=this.strokesRecorded[c]+1;b=b||d>=this.strokesLimit;this.typing||(this.hasUndo=this.typing=!0,this.hasRedo=!1,this.onChange());b?(d=0,this.editor.fire("saveSnapshot")):this.editor.fire("change");this.strokesRecorded[c]=
d;this.previousKeyGroup=c},keyGroupChanged:function(a){return e.getKeyGroup(a)!=this.previousKeyGroup},reset:function(){this.snapshots=[];this.index=-1;this.currentImage=null;this.hasRedo=this.hasUndo=!1;this.locked=null;this.resetType()},resetType:function(){this.strokesRecorded=[0,0];this.typing=!1;this.previousKeyGroup=-1},refreshState:function(){this.hasUndo=!!this.getNextImage(!0);this.hasRedo=!!this.getNextImage(!1);this.resetType();this.onChange()},save:function(a,b,c){var d=this.editor;if(this.locked||
"ready"!=d.status||"wysiwyg"!=d.mode)return!1;var e=d.editable();if(!e||"ready"!=e.status)return!1;e=this.snapshots;b||(b=new f(d));if(!1===b.contents)return!1;if(this.currentImage)if(b.equalsContent(this.currentImage)){if(a||b.equalsSelection(this.currentImage))return!1}else!1!==c&&d.fire("change");e.splice(this.index+1,e.length-this.index-1);e.length==this.limit&&e.shift();this.index=e.push(b)-1;this.currentImage=b;!1!==c&&this.refreshState();return!0},restoreImage:function(a){var b=this.editor,
c;a.bookmarks&&(b.focus(),c=b.getSelection());this.locked={level:999};this.editor.loadSnapshot(a.contents);a.bookmarks?c.selectBookmarks(a.bookmarks):CKEDITOR.env.ie&&(c=this.editor.document.getBody().$.createTextRange(),c.collapse(!0),c.select());this.locked=null;this.index=a.index;this.currentImage=this.snapshots[this.index];this.update();this.refreshState();b.fire("change")},getNextImage:function(a){var b=this.snapshots,c=this.currentImage,d;if(c)if(a)for(d=this.index-1;0<=d;d--){if(a=b[d],!c.equalsContent(a))return a.index=
d,a}else for(d=this.index+1;d<b.length;d++)if(a=b[d],!c.equalsContent(a))return a.index=d,a;return null},redoable:function(){return this.enabled&&this.hasRedo},undoable:function(){return this.enabled&&this.hasUndo},undo:function(){if(this.undoable()){this.save(!0);var a=this.getNextImage(!0);if(a)return this.restoreImage(a),!0}return!1},redo:function(){if(this.redoable()&&(this.save(!0),this.redoable())){var a=this.getNextImage(!1);if(a)return this.restoreImage(a),!0}return!1},update:function(a){if(!this.locked){a||
(a=new f(this.editor));for(var b=this.index,c=this.snapshots;0<b&&this.currentImage.equalsContent(c[b-1]);)--b;c.splice(b,this.index-b+1,a);this.index=b;this.currentImage=a}},updateSelection:function(a){if(!this.snapshots.length)return!1;var b=this.snapshots,c=b[b.length-1];return c.equalsContent(a)&&!c.equalsSelection(a)?(this.currentImage=b[b.length-1]=a,!0):!1},lock:function(a,b){if(this.locked)this.locked.level++;else if(a)this.locked={level:1};else{var c=null;if(b)c=!0;else{var d=new f(this.editor,
!0);this.currentImage&&this.currentImage.equalsContent(d)&&(c=d)}this.locked={update:c,level:1}}},unlock:function(){if(this.locked&&!--this.locked.level){var a=this.locked.update;this.locked=null;if(!0===a)this.update();else if(a){var b=new f(this.editor,!0);a.equalsContent(b)||this.update()}}}};e.navigationKeyCodes={37:1,38:1,39:1,40:1,36:1,35:1,33:1,34:1};e.keyGroups={PRINTABLE:0,FUNCTIONAL:1};e.isNavigationKey=function(a){return!!e.navigationKeyCodes[a]};e.getKeyGroup=function(a){var b=e.keyGroups;
return n[a]?b.FUNCTIONAL:b.PRINTABLE};e.getOppositeKeyGroup=function(a){var b=e.keyGroups;return a==b.FUNCTIONAL?b.PRINTABLE:b.FUNCTIONAL};e.ieFunctionalKeysBug=function(a){return CKEDITOR.env.ie&&e.getKeyGroup(a)==e.keyGroups.FUNCTIONAL};var f=CKEDITOR.plugins.undo.Image=function(a,b){this.editor=a;a.fire("beforeUndoImage");var c=a.getSnapshot();CKEDITOR.env.ie&&c&&(c=c.replace(/\s+data-cke-expando=".*?"/g,""));this.contents=c;b||(this.bookmarks=(c=c&&a.getSelection())&&c.createBookmarks2(!0));a.fire("afterUndoImage")},
h=/\b(?:href|src|name)="[^"]*?"/gi;f.prototype={equalsContent:function(a){var b=this.contents;a=a.contents;CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)&&(b=b.replace(h,""),a=a.replace(h,""));return b!=a?!1:!0},equalsSelection:function(a){var b=this.bookmarks;a=a.bookmarks;if(b||a){if(!b||!a||b.length!=a.length)return!1;for(var c=0;c<b.length;c++){var d=b[c],e=a[c];if(d.startOffset!=e.startOffset||d.endOffset!=e.endOffset||!CKEDITOR.tools.arrayCompare(d.start,e.start)||!CKEDITOR.tools.arrayCompare(d.end,
e.end))return!1}}return!0}};var k=CKEDITOR.plugins.undo.NativeEditingHandler=function(a){this.undoManager=a;this.ignoreInputEvent=!1;this.keyEventsStack=new m;this.lastKeydownImage=null};k.prototype={onKeydown:function(a){var b=a.data.getKey();if(229!==b)if(-1<CKEDITOR.tools.indexOf(g,a.data.getKeystroke()))a.data.preventDefault();else if(this.keyEventsStack.cleanUp(a),a=this.undoManager,this.keyEventsStack.getLast(b)||this.keyEventsStack.push(b),this.lastKeydownImage=new f(a.editor),e.isNavigationKey(b)||
this.undoManager.keyGroupChanged(b))if(a.strokesRecorded[0]||a.strokesRecorded[1])a.save(!1,this.lastKeydownImage,!1),a.resetType()},onInput:function(){if(this.ignoreInputEvent)this.ignoreInputEvent=!1;else{var a=this.keyEventsStack.getLast();a||(a=this.keyEventsStack.push(0));this.keyEventsStack.increment(a.keyCode);this.keyEventsStack.getTotalInputs()>=this.undoManager.strokesLimit&&(this.undoManager.type(a.keyCode,!0),this.keyEventsStack.resetInputs())}},onKeyup:function(a){var b=this.undoManager;
a=a.data.getKey();var c=this.keyEventsStack.getTotalInputs();this.keyEventsStack.remove(a);if(!(e.ieFunctionalKeysBug(a)&&this.lastKeydownImage&&this.lastKeydownImage.equalsContent(new f(b.editor,!0))))if(0<c)b.type(a);else if(e.isNavigationKey(a))this.onNavigationKey(!0)},onNavigationKey:function(a){var b=this.undoManager;!a&&b.save(!0,null,!1)||b.updateSelection(new f(b.editor));b.resetType()},ignoreInputEventListener:function(){this.ignoreInputEvent=!0},attachListeners:function(){var a=this.undoManager.editor,
b=a.editable(),c=this;b.attachListener(b,"keydown",function(a){c.onKeydown(a);if(e.ieFunctionalKeysBug(a.data.getKey()))c.onInput()},null,null,999);b.attachListener(b,CKEDITOR.env.ie?"keypress":"input",c.onInput,c,null,999);b.attachListener(b,"keyup",c.onKeyup,c,null,999);b.attachListener(b,"paste",c.ignoreInputEventListener,c,null,999);b.attachListener(b,"drop",c.ignoreInputEventListener,c,null,999);b.attachListener(b.isInline()?b:a.document.getDocumentElement(),"click",function(){c.onNavigationKey()},
null,null,999);b.attachListener(this.undoManager.editor,"blur",function(){c.keyEventsStack.remove(9)},null,null,999)}};var m=CKEDITOR.plugins.undo.KeyEventsStack=function(){this.stack=[]};m.prototype={push:function(a){a=this.stack.push({keyCode:a,inputs:0});return this.stack[a-1]},getLastIndex:function(a){if("number"!=typeof a)return this.stack.length-1;for(var b=this.stack.length;b--;)if(this.stack[b].keyCode==a)return b;return-1},getLast:function(a){a=this.getLastIndex(a);return-1!=a?this.stack[a]:
null},increment:function(a){this.getLast(a).inputs++},remove:function(a){a=this.getLastIndex(a);-1!=a&&this.stack.splice(a,1)},resetInputs:function(a){if("number"==typeof a)this.getLast(a).inputs=0;else for(a=this.stack.length;a--;)this.stack[a].inputs=0},getTotalInputs:function(){for(var a=this.stack.length,b=0;a--;)b+=this.stack[a].inputs;return b},cleanUp:function(a){a=a.data.$;a.ctrlKey||a.metaKey||this.remove(17);a.shiftKey||this.remove(16);a.altKey||this.remove(18)}}})();(function(){function m(a,d){CKEDITOR.tools.extend(this,{editor:a,editable:a.editable(),doc:a.document,win:a.window},d,!0);this.inline=this.editable.isInline();this.inline||(this.frame=this.win.getFrame());this.target=this[this.inline?"editable":"doc"]}function n(a,d){CKEDITOR.tools.extend(this,d,{editor:a},!0)}function p(a,d){var b=a.editable();CKEDITOR.tools.extend(this,{editor:a,editable:b,inline:b.isInline(),doc:a.document,win:a.window,container:CKEDITOR.document.getBody(),winTop:CKEDITOR.document.getWindow()},
d,!0);this.hidden={};this.visible={};this.inline||(this.frame=this.win.getFrame());this.queryViewport();var c=CKEDITOR.tools.bind(this.queryViewport,this),e=CKEDITOR.tools.bind(this.hideVisible,this),g=CKEDITOR.tools.bind(this.removeAll,this);b.attachListener(this.winTop,"resize",c);b.attachListener(this.winTop,"scroll",c);b.attachListener(this.winTop,"resize",e);b.attachListener(this.win,"scroll",e);b.attachListener(this.inline?b:this.frame,"mouseout",function(a){var b=a.data.$.clientX;a=a.data.$.clientY;
this.queryViewport();(b<=this.rect.left||b>=this.rect.right||a<=this.rect.top||a>=this.rect.bottom)&&this.hideVisible();(0>=b||b>=this.winTopPane.width||0>=a||a>=this.winTopPane.height)&&this.hideVisible()},this);b.attachListener(a,"resize",c);b.attachListener(a,"mode",g);a.on("destroy",g);this.lineTpl=(new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({lineStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
t,this.lineStyle,!0)),tipLeftStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},q,{left:"0px","border-left-color":"red","border-width":"6px 0 6px 6px"},this.tipCss,this.tipLeftStyle,!0)),tipRightStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},q,{right:"0px","border-right-color":"red","border-width":"6px 6px 6px 0"},this.tipCss,this.tipRightStyle,!0))})}function l(a){var d;if(d=a&&a.type==CKEDITOR.NODE_ELEMENT)d=!(r[a.getComputedStyle("float")]||r[a.getAttribute("align")]);return d&&
!u[a.getComputedStyle("position")]}CKEDITOR.plugins.add("lineutils");CKEDITOR.LINEUTILS_BEFORE=1;CKEDITOR.LINEUTILS_AFTER=2;CKEDITOR.LINEUTILS_INSIDE=4;m.prototype={start:function(a){var d=this,b=this.editor,c=this.doc,e,g,f,h,k=CKEDITOR.tools.eventsBuffer(50,function(){b.readOnly||"wysiwyg"!=b.mode||(d.relations={},(g=c.$.elementFromPoint(f,h))&&g.nodeType&&(e=new CKEDITOR.dom.element(g),d.traverseSearch(e),isNaN(f+h)||d.pixelSearch(e,f,h),a&&a(d.relations,f,h)))});this.listener=this.editable.attachListener(this.target,
"mousemove",function(a){f=a.data.$.clientX;h=a.data.$.clientY;k.input()});this.editable.attachListener(this.inline?this.editable:this.frame,"mouseout",function(){k.reset()})},stop:function(){this.listener&&this.listener.removeListener()},getRange:function(){var a={};a[CKEDITOR.LINEUTILS_BEFORE]=CKEDITOR.POSITION_BEFORE_START;a[CKEDITOR.LINEUTILS_AFTER]=CKEDITOR.POSITION_AFTER_END;a[CKEDITOR.LINEUTILS_INSIDE]=CKEDITOR.POSITION_AFTER_START;return function(d){var b=this.editor.createRange();b.moveToPosition(this.relations[d.uid].element,
a[d.type]);return b}}(),store:function(){function a(a,b,c){var e=a.getUniqueId();e in c?c[e].type|=b:c[e]={element:a,type:b}}return function(d,b){var c;b&CKEDITOR.LINEUTILS_AFTER&&l(c=d.getNext())&&c.isVisible()&&(a(c,CKEDITOR.LINEUTILS_BEFORE,this.relations),b^=CKEDITOR.LINEUTILS_AFTER);b&CKEDITOR.LINEUTILS_INSIDE&&l(c=d.getFirst())&&c.isVisible()&&(a(c,CKEDITOR.LINEUTILS_BEFORE,this.relations),b^=CKEDITOR.LINEUTILS_INSIDE);a(d,b,this.relations)}}(),traverseSearch:function(a){var d,b,c;do if(c=a.$["data-cke-expando"],
!(c&&c in this.relations)){if(a.equals(this.editable))break;if(l(a))for(d in this.lookups)(b=this.lookups[d](a))&&this.store(a,b)}while((!a||a.type!=CKEDITOR.NODE_ELEMENT||"true"!=a.getAttribute("contenteditable"))&&(a=a.getParent()))},pixelSearch:function(){function a(a,c,e,g,f){for(var h=0,k;f(e);){e+=g;if(25==++h)break;if(k=this.doc.$.elementFromPoint(c,e))if(k==a)h=0;else if(d(a,k)&&(h=0,l(k=new CKEDITOR.dom.element(k))))return k}}var d=CKEDITOR.env.ie||CKEDITOR.env.webkit?function(a,c){return a.contains(c)}:
function(a,c){return!!(a.compareDocumentPosition(c)&16)};return function(b,c,d){var g=this.win.getViewPaneSize().height,f=a.call(this,b.$,c,d,-1,function(a){return 0<a});c=a.call(this,b.$,c,d,1,function(a){return a<g});if(f)for(this.traverseSearch(f);!f.getParent().equals(b);)f=f.getParent();if(c)for(this.traverseSearch(c);!c.getParent().equals(b);)c=c.getParent();for(;f||c;){f&&(f=f.getNext(l));if(!f||f.equals(c))break;this.traverseSearch(f);c&&(c=c.getPrevious(l));if(!c||c.equals(f))break;this.traverseSearch(c)}}}(),
greedySearch:function(){this.relations={};for(var a=this.editable.getElementsByTag("*"),d=0,b,c,e;b=a.getItem(d++);)if(!b.equals(this.editable)&&b.type==CKEDITOR.NODE_ELEMENT&&(b.hasAttribute("contenteditable")||!b.isReadOnly())&&l(b)&&b.isVisible())for(e in this.lookups)(c=this.lookups[e](b))&&this.store(b,c);return this.relations}};n.prototype={locate:function(){function a(a,b){var c=a.element[b===CKEDITOR.LINEUTILS_BEFORE?"getPrevious":"getNext"]();return c&&l(c)?(a.siblingRect=c.getClientRect(),
b==CKEDITOR.LINEUTILS_BEFORE?(a.siblingRect.bottom+a.elementRect.top)/2:(a.elementRect.bottom+a.siblingRect.top)/2):b==CKEDITOR.LINEUTILS_BEFORE?a.elementRect.top:a.elementRect.bottom}return function(d){var b;this.locations={};for(var c in d)b=d[c],b.elementRect=b.element.getClientRect(),b.type&CKEDITOR.LINEUTILS_BEFORE&&this.store(c,CKEDITOR.LINEUTILS_BEFORE,a(b,CKEDITOR.LINEUTILS_BEFORE)),b.type&CKEDITOR.LINEUTILS_AFTER&&this.store(c,CKEDITOR.LINEUTILS_AFTER,a(b,CKEDITOR.LINEUTILS_AFTER)),b.type&
CKEDITOR.LINEUTILS_INSIDE&&this.store(c,CKEDITOR.LINEUTILS_INSIDE,(b.elementRect.top+b.elementRect.bottom)/2);return this.locations}}(),sort:function(){var a,d,b,c;return function(e,g){a=this.locations;d=[];for(var f in a)for(var h in a[f])if(b=Math.abs(e-a[f][h]),d.length){for(c=0;c<d.length;c++)if(b<d[c].dist){d.splice(c,0,{uid:+f,type:h,dist:b});break}c==d.length&&d.push({uid:+f,type:h,dist:b})}else d.push({uid:+f,type:h,dist:b});return"undefined"!=typeof g?d.slice(0,g):d}}(),store:function(a,
d,b){this.locations[a]||(this.locations[a]={});this.locations[a][d]=b}};var q={display:"block",width:"0px",height:"0px","border-color":"transparent","border-style":"solid",position:"absolute",top:"-6px"},t={height:"0px","border-top":"1px dashed red",position:"absolute","z-index":9999};p.prototype={removeAll:function(){for(var a in this.hidden)this.hidden[a].remove(),delete this.hidden[a];for(a in this.visible)this.visible[a].remove(),delete this.visible[a]},hideLine:function(a){var d=a.getUniqueId();
a.hide();this.hidden[d]=a;delete this.visible[d]},showLine:function(a){var d=a.getUniqueId();a.show();this.visible[d]=a;delete this.hidden[d]},hideVisible:function(){for(var a in this.visible)this.hideLine(this.visible[a])},placeLine:function(a,d){var b,c,e;if(b=this.getStyle(a.uid,a.type)){for(e in this.visible)if(this.visible[e].getCustomData("hash")!==this.hash){c=this.visible[e];break}if(!c)for(e in this.hidden)if(this.hidden[e].getCustomData("hash")!==this.hash){this.showLine(c=this.hidden[e]);
break}c||this.showLine(c=this.addLine());c.setCustomData("hash",this.hash);this.visible[c.getUniqueId()]=c;c.setStyles(b);d&&d(c)}},getStyle:function(a,d){var b=this.relations[a],c=this.locations[a][d],e={};e.width=b.siblingRect?Math.max(b.siblingRect.width,b.elementRect.width):b.elementRect.width;e.top=this.inline?c+this.winTopScroll.y-this.rect.relativeY:this.rect.top+this.winTopScroll.y+c;if(e.top-this.winTopScroll.y<this.rect.top||e.top-this.winTopScroll.y>this.rect.bottom)return!1;this.inline?
e.left=b.elementRect.left-this.rect.relativeX:(0<b.elementRect.left?e.left=this.rect.left+b.elementRect.left:(e.width+=b.elementRect.left,e.left=this.rect.left),0<(b=e.left+e.width-(this.rect.left+this.winPane.width))&&(e.width-=b));e.left+=this.winTopScroll.x;for(var g in e)e[g]=CKEDITOR.tools.cssLength(e[g]);return e},addLine:function(){var a=CKEDITOR.dom.element.createFromHtml(this.lineTpl);a.appendTo(this.container);return a},prepare:function(a,d){this.relations=a;this.locations=d;this.hash=Math.random()},
cleanup:function(){var a,d;for(d in this.visible)a=this.visible[d],a.getCustomData("hash")!==this.hash&&this.hideLine(a)},queryViewport:function(){this.winPane=this.win.getViewPaneSize();this.winTopScroll=this.winTop.getScrollPosition();this.winTopPane=this.winTop.getViewPaneSize();this.rect=this.getClientRect(this.inline?this.editable:this.frame)},getClientRect:function(a){a=a.getClientRect();var d=this.container.getDocumentPosition(),b=this.container.getComputedStyle("position");a.relativeX=a.relativeY=
0;"static"!=b&&(a.relativeY=d.y,a.relativeX=d.x,a.top-=a.relativeY,a.bottom-=a.relativeY,a.left-=a.relativeX,a.right-=a.relativeX);return a}};var r={left:1,right:1,center:1},u={absolute:1,fixed:1};CKEDITOR.plugins.lineutils={finder:m,locator:n,liner:p}})();(function(){function p(a){this.editor=a;this.registered={};this.instances={};this.selected=[];this.widgetHoldingFocusedEditable=this.focused=null;this._={nextId:0,upcasts:[],upcastCallbacks:[],filters:{}};F(this);G(this);this.on("checkWidgets",H);this.editor.on("contentDomInvalidated",this.checkWidgets,this);I(this);J(this);K(this);L(this);M(this)}function g(a,b,c,d,e){var f=a.editor;CKEDITOR.tools.extend(this,d,{editor:f,id:b,inline:"span"==c.getParent().getName(),element:c,data:CKEDITOR.tools.extend({},
"function"==typeof d.defaults?d.defaults():d.defaults),dataReady:!1,inited:!1,ready:!1,edit:g.prototype.edit,focusedEditable:null,definition:d,repository:a,draggable:!1!==d.draggable,_:{downcastFn:d.downcast&&"string"==typeof d.downcast?d.downcasts[d.downcast]:d.downcast}},!0);a.fire("instanceCreated",this);N(this,d);this.init&&this.init();this.inited=!0;(a=this.element.data("cke-widget-data"))&&this.setData(JSON.parse(decodeURIComponent(a)));e&&this.setData(e);this.data.classes||this.setData("classes",
this.getClasses());this.dataReady=!0;r(this);this.fire("data",this.data);this.isInited()&&f.editable().contains(this.wrapper)&&(this.ready=!0,this.fire("ready"))}function q(a,b,c){CKEDITOR.dom.element.call(this,b.$);this.editor=a;this._={};b=this.filter=c.filter;CKEDITOR.dtd[this.getName()].p?(this.enterMode=b?b.getAllowedEnterMode(a.enterMode):a.enterMode,this.shiftEnterMode=b?b.getAllowedEnterMode(a.shiftEnterMode,!0):a.shiftEnterMode):this.enterMode=this.shiftEnterMode=CKEDITOR.ENTER_BR}function O(a,
b){a.addCommand(b.name,{exec:function(a,d){function e(){a.widgets.finalizeCreation(k)}var f=a.widgets.focused;if(f&&f.name==b.name)f.edit();else if(b.insert)b.insert();else if(b.template){var f="function"==typeof b.defaults?b.defaults():b.defaults,f=CKEDITOR.dom.element.createFromHtml(b.template.output(f)),h,l=a.widgets.wrapElement(f,b.name),k=new CKEDITOR.dom.documentFragment(l.getDocument());k.append(l);(h=a.widgets.initOn(f,b,d&&d.startupData))?(f=h.once("edit",function(b){if(b.data.dialog)h.once("dialog",
function(b){b=b.data;var d,f;d=b.once("ok",e,null,null,20);f=b.once("cancel",function(b){b.data&&!1===b.data.hide||a.widgets.destroy(h,!0)});b.once("hide",function(){d.removeListener();f.removeListener()})});else e()},null,null,999),h.edit(),f.removeListener()):e()}},allowedContent:b.allowedContent,requiredContent:b.requiredContent,contentForms:b.contentForms,contentTransformations:b.contentTransformations})}function P(a,b){function c(c,b,d){var e=CKEDITOR.tools.getIndex(a._.upcasts,function(a){return a[2]>
d});0>e&&(e=a._.upcasts.length);a._.upcasts.splice(e,0,[c,b,d])}var d=b.upcast,e=b.upcastPriority||10;if(d)if("string"==typeof d)for(d=d.split(",");d.length;)c(b.upcasts[d.pop()],b.name,e);else c(d,b.name,e)}function t(a,b){a.focused=null;if(b.isInited()){var c=b.editor.checkDirty();a.fire("widgetBlurred",{widget:b});b.setFocused(!1);!c&&b.editor.resetDirty()}}function H(a){a=a.data;if("wysiwyg"==this.editor.mode){var b=this.editor.editable(),c=this.instances,d,e,f,h;if(b){for(d in c)c[d].isReady()&&
!b.contains(c[d].wrapper)&&this.destroy(c[d],!0);if(a&&a.initOnlyNew)c=this.initOnAll();else{var l=b.find(".cke_widget_wrapper"),c=[];d=0;for(e=l.count();d<e;d++){f=l.getItem(d);if(h=!this.getByElement(f,!0)){a:{h=Q;for(var k=f;k=k.getParent();)if(h(k)){h=!0;break a}h=!1}h=!h}h&&b.contains(f)&&(f.addClass("cke_widget_new"),c.push(this.initOn(f.getFirst(g.isDomWidgetElement))))}}a&&a.focusInited&&1==c.length&&c[0].focus()}}}function u(a,b,c){if(!c.allowedContent)return null;var d=this._.filters[a];
d||(this._.filters[a]=d={});(a=d[b])||(d[b]=a=new CKEDITOR.filter(c.allowedContent));return a}function R(a){var b=[],c=a._.upcasts,d=a._.upcastCallbacks;return{toBeWrapped:b,iterator:function(a){var f,h,l,k,m;if("data-cke-widget-wrapper"in a.attributes)return(a=a.getFirst(g.isParserWidgetElement))&&b.push([a]),!1;if("data-widget"in a.attributes)return b.push([a]),!1;if(m=c.length){if(a.attributes["data-cke-widget-upcasted"])return!1;k=0;for(f=d.length;k<f;++k)if(!1===d[k](a))return;for(k=0;k<m;++k)if(f=
c[k],l={},h=f[0](a,l))return h instanceof CKEDITOR.htmlParser.element&&(a=h),a.attributes["data-cke-widget-data"]=encodeURIComponent(JSON.stringify(l)),a.attributes["data-cke-widget-upcasted"]=1,b.push([a,f[1]]),!1}}}}function v(a){return{tabindex:-1,contenteditable:"false","data-cke-widget-wrapper":1,"data-cke-filter":"off","class":"cke_widget_wrapper cke_widget_new cke_widget_"+(a?"inline":"block")}}function w(a,b,c){if(a.type==CKEDITOR.NODE_ELEMENT){var d=CKEDITOR.dtd[a.name];if(d&&!d[c.name]){var d=
a.split(b),e=a.parent;b=d.getIndex();a.children.length||(--b,a.remove());d.children.length||d.remove();return w(e,b,c)}}a.add(c,b)}function x(a,b){return"boolean"==typeof a.inline?a.inline:!!CKEDITOR.dtd.$inline[b]}function Q(a){return a.hasAttribute("data-cke-temp")}function n(a,b,c,d){var e=a.editor;e.fire("lockSnapshot");c?(d=c.data("cke-widget-editable"),d=b.editables[d],a.widgetHoldingFocusedEditable=b,b.focusedEditable=d,c.addClass("cke_widget_editable_focused"),d.filter&&e.setActiveFilter(d.filter),
e.setActiveEnterMode(d.enterMode,d.shiftEnterMode)):(d||b.focusedEditable.removeClass("cke_widget_editable_focused"),b.focusedEditable=null,a.widgetHoldingFocusedEditable=null,e.setActiveFilter(null),e.setActiveEnterMode(null,null));e.fire("unlockSnapshot")}function S(a){a.contextMenu&&a.contextMenu.addListener(function(b){if(b=a.widgets.getByElement(b,!0))return b.fire("contextMenu",{})})}function T(a,b){return CKEDITOR.tools.trim(b)}function L(a){var b=a.editor,c=CKEDITOR.plugins.lineutils;b.on("dragstart",
function(c){var e=c.data.target;g.isDomDragHandler(e)&&(e=a.getByElement(e),c.data.dataTransfer.setData("cke/widget-id",e.id),b.focus(),e.focus())});b.on("drop",function(c){var e=c.data.dataTransfer,f=e.getData("cke/widget-id"),h=e.getTransferType(b),e=b.createRange();""!==f&&h===CKEDITOR.DATA_TRANSFER_CROSS_EDITORS?c.cancel():""!==f&&h==CKEDITOR.DATA_TRANSFER_INTERNAL&&(f=a.instances[f])&&(e.setStartBefore(f.wrapper),e.setEndAfter(f.wrapper),c.data.dragRange=e,delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount,
delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount,c.data.dataTransfer.setData("text/html",b.editable().getHtmlFromRange(e).getHtml()),b.widgets.destroy(f,!0))});b.on("contentDom",function(){var d=b.editable();CKEDITOR.tools.extend(a,{finder:new c.finder(b,{lookups:{"default":function(c){if(!c.is(CKEDITOR.dtd.$listItem)&&c.is(CKEDITOR.dtd.$block)&&!g.isDomNestedEditable(c)&&!a._.draggedWidget.wrapper.contains(c)){var b=g.getNestedEditable(d,c);if(b){c=a._.draggedWidget;if(a.getByElement(b)==
c)return;b=CKEDITOR.filter.instances[b.data("cke-filter")];c=c.requiredContent;if(b&&c&&!b.check(c))return}return CKEDITOR.LINEUTILS_BEFORE|CKEDITOR.LINEUTILS_AFTER}}}}),locator:new c.locator(b),liner:new c.liner(b,{lineStyle:{cursor:"move !important","border-top-color":"#666"},tipLeftStyle:{"border-left-color":"#666"},tipRightStyle:{"border-right-color":"#666"}})},!0)})}function J(a){var b=a.editor;b.on("contentDom",function(){var c=b.editable(),d=c.isInline()?c:b.document,e,f;c.attachListener(d,
"mousedown",function(c){var d=c.data.getTarget();if(!d.type)return!1;e=a.getByElement(d);f=0;e&&(e.inline&&d.type==CKEDITOR.NODE_ELEMENT&&d.hasAttribute("data-cke-widget-drag-handler")?(f=1,a.focused!=e&&b.getSelection().removeAllRanges()):g.getNestedEditable(e.wrapper,d)?e=null:(c.data.preventDefault(),CKEDITOR.env.ie||e.focus()))});c.attachListener(d,"mouseup",function(){f&&e&&e.wrapper&&(f=0,e.focus())});CKEDITOR.env.ie&&c.attachListener(d,"mouseup",function(){setTimeout(function(){e&&e.wrapper&&
c.contains(e.wrapper)&&(e.focus(),e=null)})})});b.on("doubleclick",function(c){var b=a.getByElement(c.data.element);if(b&&!g.getNestedEditable(b.wrapper,c.data.element))return b.fire("doubleclick",{element:c.data.element})},null,null,1)}function K(a){a.editor.on("key",function(b){var c=a.focused,d=a.widgetHoldingFocusedEditable,e;c?e=c.fire("key",{keyCode:b.data.keyCode}):d&&(c=b.data.keyCode,b=d.focusedEditable,c==CKEDITOR.CTRL+65?(c=b.getBogus(),d=d.editor.createRange(),d.selectNodeContents(b),
c&&d.setEndAt(c,CKEDITOR.POSITION_BEFORE_START),d.select(),e=!1):8==c||46==c?(e=d.editor.getSelection().getRanges(),d=e[0],e=!(1==e.length&&d.collapsed&&d.checkBoundaryOfElement(b,CKEDITOR[8==c?"START":"END"]))):e=void 0);return e},null,null,1)}function M(a){function b(c){a.focused&&y(a.focused,"cut"==c.name)}var c=a.editor;c.on("contentDom",function(){var a=c.editable();a.attachListener(a,"copy",b);a.attachListener(a,"cut",b)})}function I(a){var b=a.editor;b.on("selectionCheck",function(){a.fire("checkSelection")});
a.on("checkSelection",a.checkSelection,a);b.on("selectionChange",function(c){var d=(c=g.getNestedEditable(b.editable(),c.data.selection.getStartElement()))&&a.getByElement(c),e=a.widgetHoldingFocusedEditable;e?e===d&&e.focusedEditable.equals(c)||(n(a,e,null),d&&c&&n(a,d,c)):d&&c&&n(a,d,c)});b.on("dataReady",function(){z(a).commit()});b.on("blur",function(){var c;(c=a.focused)&&t(a,c);(c=a.widgetHoldingFocusedEditable)&&n(a,c,null)})}function G(a){var b=a.editor,c={};b.on("toDataFormat",function(b){var e=
CKEDITOR.tools.getNextNumber(),f=[];b.data.downcastingSessionId=e;c[e]=f;b.data.dataValue.forEach(function(c){var b=c.attributes,d;if("data-cke-widget-id"in b){if(b=a.instances[b["data-cke-widget-id"]])d=c.getFirst(g.isParserWidgetElement),f.push({wrapper:c,element:d,widget:b,editables:{}}),"1"!=d.attributes["data-cke-widget-keep-attr"]&&delete d.attributes["data-widget"]}else if("data-cke-widget-editable"in b)return f[f.length-1].editables[b["data-cke-widget-editable"]]=c,!1},CKEDITOR.NODE_ELEMENT,
!0)},null,null,8);b.on("toDataFormat",function(a){if(a.data.downcastingSessionId){a=c[a.data.downcastingSessionId];for(var b,f,h,l,g,m;b=a.shift();){f=b.widget;h=b.element;l=f._.downcastFn&&f._.downcastFn.call(f,h);for(m in b.editables)g=b.editables[m],delete g.attributes.contenteditable,g.setHtml(f.editables[m].getData());l||(l=h);b.wrapper.replaceWith(l)}}},null,null,13);b.on("contentDomUnload",function(){a.destroyAll(!0)})}function F(a){var b=a.editor,c,d;b.on("toHtml",function(b){var d=R(a),h;
for(b.data.dataValue.forEach(d.iterator,CKEDITOR.NODE_ELEMENT,!0);h=d.toBeWrapped.pop();){var l=h[0],k=l.parent;k.type==CKEDITOR.NODE_ELEMENT&&k.attributes["data-cke-widget-wrapper"]&&k.replaceWith(l);a.wrapElement(h[0],h[1])}c=b.data.protectedWhitespaces?3==b.data.dataValue.children.length&&g.isParserWidgetWrapper(b.data.dataValue.children[1]):1==b.data.dataValue.children.length&&g.isParserWidgetWrapper(b.data.dataValue.children[0])},null,null,8);b.on("dataReady",function(){if(d)for(var c=b.editable().find(".cke_widget_wrapper"),
f,h,l=0,k=c.count();l<k;++l)f=c.getItem(l),h=f.getFirst(g.isDomWidgetElement),h.type==CKEDITOR.NODE_ELEMENT&&h.data("widget")?(h.replace(f),a.wrapElement(h)):f.remove();d=0;a.destroyAll(!0);a.initOnAll()});b.on("loadSnapshot",function(c){/data-cke-widget/.test(c.data)&&(d=1);a.destroyAll(!0)},null,null,9);b.on("paste",function(a){a=a.data;a.dataValue=a.dataValue.replace(U,T);a.range&&(a=g.getNestedEditable(b.editable(),a.range.startContainer))&&(a=CKEDITOR.filter.instances[a.data("cke-filter")])&&
b.setActiveFilter(a)});b.on("afterInsertHtml",function(d){d.data.intoRange?a.checkWidgets({initOnlyNew:!0}):(b.fire("lockSnapshot"),a.checkWidgets({initOnlyNew:!0,focusInited:c}),b.fire("unlockSnapshot"))})}function z(a){var b=a.selected,c=[],d=b.slice(0),e=null;return{select:function(a){0>CKEDITOR.tools.indexOf(b,a)&&c.push(a);a=CKEDITOR.tools.indexOf(d,a);0<=a&&d.splice(a,1);return this},focus:function(a){e=a;return this},commit:function(){var f=a.focused!==e,h,g;a.editor.fire("lockSnapshot");for(f&&
(h=a.focused)&&t(a,h);h=d.pop();)b.splice(CKEDITOR.tools.indexOf(b,h),1),h.isInited()&&(g=h.editor.checkDirty(),h.setSelected(!1),!g&&h.editor.resetDirty());f&&e&&(g=a.editor.checkDirty(),a.focused=e,a.fire("widgetFocused",{widget:e}),e.setFocused(!0),!g&&a.editor.resetDirty());for(;h=c.pop();)b.push(h),h.setSelected(!0);a.editor.fire("unlockSnapshot")}}}function A(a,b,c){var d=0;b=B(b);var e=a.data.classes||{},f;if(b){for(e=CKEDITOR.tools.clone(e);f=b.pop();)c?e[f]||(d=e[f]=1):e[f]&&(delete e[f],
d=1);d&&a.setData("classes",e)}}function C(a){a.cancel()}function y(a,b){var c=a.editor,d=c.document;if(!d.getById("cke_copybin")){var e=c.blockless||CKEDITOR.env.ie?"span":"div",f=d.createElement(e),h=d.createElement(e),e=CKEDITOR.env.ie&&9>CKEDITOR.env.version;h.setAttributes({id:"cke_copybin","data-cke-temp":"1"});f.setStyles({position:"absolute",width:"1px",height:"1px",overflow:"hidden"});f.setStyle("ltr"==c.config.contentsLangDirection?"left":"right","-5000px");var g=c.createRange();g.setStartBefore(a.wrapper);
g.setEndAfter(a.wrapper);f.setHtml('\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e'+c.editable().getHtmlFromRange(g).getHtml()+'\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e');c.fire("saveSnapshot");c.fire("lockSnapshot");h.append(f);c.editable().append(h);var k=c.on("selectionChange",C,null,null,0),m=a.repository.on("checkSelection",C,null,null,0);if(e)var n=d.getDocumentElement().$,p=n.scrollTop;g=c.createRange();g.selectNodeContents(f);g.select();e&&(n.scrollTop=p);setTimeout(function(){b||
a.focus();h.remove();k.removeListener();m.removeListener();c.fire("unlockSnapshot");b&&(a.repository.del(a),c.fire("saveSnapshot"))},100)}}function B(a){return(a=(a=a.getDefinition().attributes)&&a["class"])?a.split(/\s+/):null}function D(){var a=CKEDITOR.document.getActive(),b=this.editor,c=b.editable();(c.isInline()?c:b.document.getWindow().getFrame()).equals(a)&&b.focusManager.focus(c)}function E(){CKEDITOR.env.gecko&&this.editor.unlockSelection();CKEDITOR.env.webkit||(this.editor.forceNextSelectionCheck(),
this.editor.selectionChange(1))}function V(a){var b=null;a.on("data",function(){var a=this.data.classes,d;if(b!=a){for(d in b)a&&a[d]||this.removeClass(d);for(d in a)this.addClass(d);b=a}})}function W(a){if(a.draggable){var b=a.editor,c=a.wrapper.getLast(g.isDomDragHandlerContainer),d;c?d=c.findOne("img"):(c=new CKEDITOR.dom.element("span",b.document),c.setAttributes({"class":"cke_reset cke_widget_drag_handler_container",style:"background:rgba(220,220,220,0.5);background-image:url("+b.plugins.widget.path+
"images/handle.png)"}),d=new CKEDITOR.dom.element("img",b.document),d.setAttributes({"class":"cke_reset cke_widget_drag_handler","data-cke-widget-drag-handler":"1",src:CKEDITOR.tools.transparentImageData,width:15,title:b.lang.widget.move,height:15}),a.inline&&d.setAttribute("draggable","true"),c.append(d),a.wrapper.append(c));a.wrapper.on("dragover",function(a){a.data.preventDefault()});a.wrapper.on("mouseenter",a.updateDragHandlerPosition,a);setTimeout(function(){a.on("data",a.updateDragHandlerPosition,
a)},50);if(!a.inline&&(d.on("mousedown",X,a),CKEDITOR.env.ie&&9>CKEDITOR.env.version))d.on("dragstart",function(a){a.data.preventDefault(!0)});a.dragHandlerContainer=c}}function X(a){function b(){var c;for(q.reset();c=g.pop();)c.removeListener();var b=k;c=a.sender;var d=this.repository.finder,e=this.repository.liner,f=this.editor,h=this.editor.editable();CKEDITOR.tools.isEmpty(e.visible)||(b=d.getRange(b[0]),this.focus(),f.fire("drop",{dropRange:b,target:b.startContainer}));h.removeClass("cke_widget_dragging");
e.hideVisible();f.fire("dragend",{target:c})}var c=this.repository.finder,d=this.repository.locator,e=this.repository.liner,f=this.editor,h=f.editable(),g=[],k=[],m,n;this.repository._.draggedWidget=this;var p=c.greedySearch(),q=CKEDITOR.tools.eventsBuffer(50,function(){m=d.locate(p);k=d.sort(n,1);k.length&&(e.prepare(p,m),e.placeLine(k[0]),e.cleanup())});h.addClass("cke_widget_dragging");g.push(h.on("mousemove",function(a){n=a.data.$.clientY;q.input()}));f.fire("dragstart",{target:a.sender});g.push(f.document.once("mouseup",
b,this));h.isInline()||g.push(CKEDITOR.document.once("mouseup",b,this))}function Y(a){var b,c,d=a.editables;a.editables={};if(a.editables)for(b in d)c=d[b],a.initEditable(b,"string"==typeof c?{selector:c}:c)}function Z(a){if(a.mask){var b=a.wrapper.findOne(".cke_widget_mask");b||(b=new CKEDITOR.dom.element("img",a.editor.document),b.setAttributes({src:CKEDITOR.tools.transparentImageData,"class":"cke_reset cke_widget_mask"}),a.wrapper.append(b));a.mask=b}}function aa(a){if(a.parts){var b={},c,d;for(d in a.parts)c=
a.wrapper.findOne(a.parts[d]),b[d]=c;a.parts=b}}function N(a,b){ba(a);aa(a);Y(a);Z(a);W(a);V(a);if(CKEDITOR.env.ie&&9>CKEDITOR.env.version)a.wrapper.on("dragstart",function(c){var b=c.data.getTarget();g.getNestedEditable(a,b)||a.inline&&g.isDomDragHandler(b)||c.data.preventDefault()});a.wrapper.removeClass("cke_widget_new");a.element.addClass("cke_widget_element");a.on("key",function(b){b=b.data.keyCode;if(13==b)a.edit();else{if(b==CKEDITOR.CTRL+67||b==CKEDITOR.CTRL+88){y(a,b==CKEDITOR.CTRL+88);return}if(b in
ca||CKEDITOR.CTRL&b||CKEDITOR.ALT&b)return}return!1},null,null,999);a.on("doubleclick",function(b){a.edit()&&b.cancel()});if(b.data)a.on("data",b.data);if(b.edit)a.on("edit",b.edit)}function ba(a){(a.wrapper=a.element.getParent()).setAttribute("data-cke-widget-id",a.id)}function r(a){a.element.data("cke-widget-data",encodeURIComponent(JSON.stringify(a.data)))}CKEDITOR.plugins.add("widget",{requires:"lineutils,clipboard",onLoad:function(){CKEDITOR.addCss(".cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid yellow;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid yellow}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #ace}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:none;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}")},
beforeInit:function(a){a.widgets=new p(a)},afterInit:function(a){var b=a.widgets.registered,c,d,e;for(d in b)c=b[d],(e=c.button)&&a.ui.addButton&&a.ui.addButton(CKEDITOR.tools.capitalize(c.name,!0),{label:e,command:c.name,toolbar:"insert,10"});S(a)}});p.prototype={MIN_SELECTION_CHECK_INTERVAL:500,add:function(a,b){b=CKEDITOR.tools.prototypedCopy(b);b.name=a;b._=b._||{};this.editor.fire("widgetDefinition",b);b.template&&(b.template=new CKEDITOR.template(b.template));O(this.editor,b);P(this,b);return this.registered[a]=
b},addUpcastCallback:function(a){this._.upcastCallbacks.push(a)},checkSelection:function(){var a=this.editor.getSelection(),b=a.getSelectedElement(),c=z(this),d;if(b&&(d=this.getByElement(b,!0)))return c.focus(d).select(d).commit();a=a.getRanges()[0];if(!a||a.collapsed)return c.commit();a=new CKEDITOR.dom.walker(a);for(a.evaluator=g.isDomWidgetWrapper;b=a.next();)c.select(this.getByElement(b));c.commit()},checkWidgets:function(a){this.fire("checkWidgets",CKEDITOR.tools.copy(a||{}))},del:function(a){if(this.focused===
a){var b=a.editor,c=b.createRange(),d;(d=c.moveToClosestEditablePosition(a.wrapper,!0))||(d=c.moveToClosestEditablePosition(a.wrapper,!1));d&&b.getSelection().selectRanges([c])}a.wrapper.remove();this.destroy(a,!0)},destroy:function(a,b){this.widgetHoldingFocusedEditable===a&&n(this,a,null,b);a.destroy(b);delete this.instances[a.id];this.fire("instanceDestroyed",a)},destroyAll:function(a,b){var c,d,e=this.instances;if(b&&!a){d=b.find(".cke_widget_wrapper");for(var e=d.count(),f=0;f<e;++f)(c=this.getByElement(d.getItem(f),
!0))&&this.destroy(c)}else for(d in e)c=e[d],this.destroy(c,a)},finalizeCreation:function(a){(a=a.getFirst())&&g.isDomWidgetWrapper(a)&&(this.editor.insertElement(a),a=this.getByElement(a),a.ready=!0,a.fire("ready"),a.focus())},getByElement:function(){function a(a){return a.is(b)&&a.data("cke-widget-id")}var b={div:1,span:1};return function(b,d){if(!b)return null;var e=a(b);if(!d&&!e){var f=this.editor.editable();do b=b.getParent();while(b&&!b.equals(f)&&!(e=a(b)))}return this.instances[e]||null}}(),
initOn:function(a,b,c){b?"string"==typeof b&&(b=this.registered[b]):b=this.registered[a.data("widget")];if(!b)return null;var d=this.wrapElement(a,b.name);return d?d.hasClass("cke_widget_new")?(a=new g(this,this._.nextId++,a,b,c),a.isInited()?this.instances[a.id]=a:null):this.getByElement(a):null},initOnAll:function(a){a=(a||this.editor.editable()).find(".cke_widget_new");for(var b=[],c,d=a.count();d--;)(c=this.initOn(a.getItem(d).getFirst(g.isDomWidgetElement)))&&b.push(c);return b},onWidget:function(a){var b=
Array.prototype.slice.call(arguments);b.shift();for(var c in this.instances){var d=this.instances[c];d.name==a&&d.on.apply(d,b)}this.on("instanceCreated",function(c){c=c.data;c.name==a&&c.on.apply(c,b)})},parseElementClasses:function(a){if(!a)return null;a=CKEDITOR.tools.trim(a).split(/\s+/);for(var b,c={},d=0;b=a.pop();)-1==b.indexOf("cke_")&&(c[b]=d=1);return d?c:null},wrapElement:function(a,b){var c=null,d,e;if(a instanceof CKEDITOR.dom.element){d=this.registered[b||a.data("widget")];if(!d)return null;
if((c=a.getParent())&&c.type==CKEDITOR.NODE_ELEMENT&&c.data("cke-widget-wrapper"))return c;a.hasAttribute("data-cke-widget-keep-attr")||a.data("cke-widget-keep-attr",a.data("widget")?1:0);b&&a.data("widget",b);e=x(d,a.getName());c=new CKEDITOR.dom.element(e?"span":"div");c.setAttributes(v(e));c.data("cke-display-name",d.pathName?d.pathName:a.getName());a.getParent(!0)&&c.replace(a);a.appendTo(c)}else if(a instanceof CKEDITOR.htmlParser.element){d=this.registered[b||a.attributes["data-widget"]];if(!d)return null;
if((c=a.parent)&&c.type==CKEDITOR.NODE_ELEMENT&&c.attributes["data-cke-widget-wrapper"])return c;"data-cke-widget-keep-attr"in a.attributes||(a.attributes["data-cke-widget-keep-attr"]=a.attributes["data-widget"]?1:0);b&&(a.attributes["data-widget"]=b);e=x(d,a.name);c=new CKEDITOR.htmlParser.element(e?"span":"div",v(e));c.attributes["data-cke-display-name"]=d.pathName?d.pathName:a.name;d=a.parent;var f;d&&(f=a.getIndex(),a.remove());c.add(a);d&&w(d,f,c)}return c},_tests_createEditableFilter:u};CKEDITOR.event.implementOn(p.prototype);
g.prototype={addClass:function(a){this.element.addClass(a)},applyStyle:function(a){A(this,a,1)},checkStyleActive:function(a){a=B(a);var b;if(!a)return!1;for(;b=a.pop();)if(!this.hasClass(b))return!1;return!0},destroy:function(a){this.fire("destroy");if(this.editables)for(var b in this.editables)this.destroyEditable(b,a);a||("0"==this.element.data("cke-widget-keep-attr")&&this.element.removeAttribute("data-widget"),this.element.removeAttributes(["data-cke-widget-data","data-cke-widget-keep-attr"]),
this.element.removeClass("cke_widget_element"),this.element.replace(this.wrapper));this.wrapper=null},destroyEditable:function(a,b){var c=this.editables[a];c.removeListener("focus",E);c.removeListener("blur",D);this.editor.focusManager.remove(c);b||(this.repository.destroyAll(!1,c),c.removeClass("cke_widget_editable"),c.removeClass("cke_widget_editable_focused"),c.removeAttributes(["contenteditable","data-cke-widget-editable","data-cke-enter-mode"]));delete this.editables[a]},edit:function(){var a=
{dialog:this.dialog},b=this;if(!1===this.fire("edit",a)||!a.dialog)return!1;this.editor.openDialog(a.dialog,function(a){var d,e;!1!==b.fire("dialog",a)&&(d=a.on("show",function(){a.setupContent(b)}),e=a.on("ok",function(){var d,e=b.on("data",function(a){d=1;a.cancel()},null,null,0);b.editor.fire("saveSnapshot");a.commitContent(b);e.removeListener();d&&(b.fire("data",b.data),b.editor.fire("saveSnapshot"))}),a.once("hide",function(){d.removeListener();e.removeListener()}))});return!0},getClasses:function(){return this.repository.parseElementClasses(this.element.getAttribute("class"))},
hasClass:function(a){return this.element.hasClass(a)},initEditable:function(a,b){var c=this._findOneNotNested(b.selector);return c&&c.is(CKEDITOR.dtd.$editable)?(c=new q(this.editor,c,{filter:u.call(this.repository,this.name,a,b)}),this.editables[a]=c,c.setAttributes({contenteditable:"true","data-cke-widget-editable":a,"data-cke-enter-mode":c.enterMode}),c.filter&&c.data("cke-filter",c.filter.id),c.addClass("cke_widget_editable"),c.removeClass("cke_widget_editable_focused"),b.pathName&&c.data("cke-display-name",
b.pathName),this.editor.focusManager.add(c),c.on("focus",E,this),CKEDITOR.env.ie&&c.on("blur",D,this),c._.initialSetData=!0,c.setData(c.getHtml()),!0):!1},_findOneNotNested:function(a){a=this.wrapper.find(a);for(var b,c,d=0;d<a.count();d++)if(b=a.getItem(d),c=b.getAscendant(g.isDomWidgetWrapper),this.wrapper.equals(c))return b;return null},isInited:function(){return!(!this.wrapper||!this.inited)},isReady:function(){return this.isInited()&&this.ready},focus:function(){var a=this.editor.getSelection();
if(a){var b=this.editor.checkDirty();a.fake(this.wrapper);!b&&this.editor.resetDirty()}this.editor.focus()},removeClass:function(a){this.element.removeClass(a)},removeStyle:function(a){A(this,a,0)},setData:function(a,b){var c=this.data,d=0;if("string"==typeof a)c[a]!==b&&(c[a]=b,d=1);else{var e=a;for(a in e)c[a]!==e[a]&&(d=1,c[a]=e[a])}d&&this.dataReady&&(r(this),this.fire("data",c));return this},setFocused:function(a){this.wrapper[a?"addClass":"removeClass"]("cke_widget_focused");this.fire(a?"focus":
"blur");return this},setSelected:function(a){this.wrapper[a?"addClass":"removeClass"]("cke_widget_selected");this.fire(a?"select":"deselect");return this},updateDragHandlerPosition:function(){var a=this.editor,b=this.element.$,c=this._.dragHandlerOffset,b={x:b.offsetLeft,y:b.offsetTop-15};c&&b.x==c.x&&b.y==c.y||(c=a.checkDirty(),a.fire("lockSnapshot"),this.dragHandlerContainer.setStyles({top:b.y+"px",left:b.x+"px",display:"block"}),a.fire("unlockSnapshot"),!c&&a.resetDirty(),this._.dragHandlerOffset=
b)}};CKEDITOR.event.implementOn(g.prototype);g.getNestedEditable=function(a,b){return!b||b.equals(a)?null:g.isDomNestedEditable(b)?b:g.getNestedEditable(a,b.getParent())};g.isDomDragHandler=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-cke-widget-drag-handler")};g.isDomDragHandlerContainer=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass("cke_widget_drag_handler_container")};g.isDomNestedEditable=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-cke-widget-editable")};
g.isDomWidgetElement=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-widget")};g.isDomWidgetWrapper=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute("data-cke-widget-wrapper")};g.isParserWidgetElement=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&!!a.attributes["data-widget"]};g.isParserWidgetWrapper=function(a){return a.type==CKEDITOR.NODE_ELEMENT&&!!a.attributes["data-cke-widget-wrapper"]};q.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype),
{setData:function(a){this._.initialSetData||this.editor.widgets.destroyAll(!1,this);this._.initialSetData=!1;a=this.editor.dataProcessor.toHtml(a,{context:this.getName(),filter:this.filter,enterMode:this.enterMode});this.setHtml(a);this.editor.widgets.initOnAll(this)},getData:function(){return this.editor.dataProcessor.toDataFormat(this.getHtml(),{context:this.getName(),filter:this.filter,enterMode:this.enterMode})}});var U=/^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i,
ca={37:1,38:1,39:1,40:1,8:1,46:1};(function(){function a(){}function b(a,b,e){return e&&this.checkElement(a)?(a=e.widgets.getByElement(a,!0))&&a.checkStyleActive(this):!1}CKEDITOR.style.addCustomHandler({type:"widget",setup:function(a){this.widget=a.widget},apply:function(a){a instanceof CKEDITOR.editor&&this.checkApplicable(a.elementPath(),a)&&a.widgets.focused.applyStyle(this)},remove:function(a){a instanceof CKEDITOR.editor&&this.checkApplicable(a.elementPath(),a)&&a.widgets.focused.removeStyle(this)},
checkActive:function(a,b){return this.checkElementMatch(a.lastElement,0,b)},checkApplicable:function(a,b){return b instanceof CKEDITOR.editor?this.checkElement(a.lastElement):!1},checkElementMatch:b,checkElementRemovable:b,checkElement:function(a){return g.isDomWidgetWrapper(a)?(a=a.getFirst(g.isDomWidgetElement))&&a.data("widget")==this.widget:!1},buildPreview:function(a){return a||this._.definition.name},toAllowedContentRules:function(a){if(!a)return null;a=a.widgets.registered[this.widget];var b,
e={};if(!a)return null;if(a.styleableElements){b=this.getClassesArray();if(!b)return null;e[a.styleableElements]={classes:b,propertiesOnly:!0};return e}return a.styleToAllowedContentRules?a.styleToAllowedContentRules(this):null},getClassesArray:function(){var a=this._.definition.attributes&&this._.definition.attributes["class"];return a?CKEDITOR.tools.trim(a).split(/\s+/):null},applyToRange:a,removeFromRange:a,applyToObject:a})})();CKEDITOR.plugins.widget=g;g.repository=p;g.nestedEditable=q})();CKEDITOR.config.plugins='basicstyles,blockquote,dialogui,dialog,clipboard,enterkey,horizontalrule,indent,indentblock,indentlist,justify,list,pastefromword,removeformat,tab,undo,lineutils,widget';CKEDITOR.config.skin='moono';(function() {var setIcons = function(icons, strip) {var path = CKEDITOR.getUrl( 'plugins/' + strip );icons = icons.split( ',' );for ( var i = 0; i < icons.length; i++ )CKEDITOR.skin.icons[ icons[ i ] ] = { path: path, offset: -icons[ ++i ], bgsize : icons[ ++i ] };};if (CKEDITOR.env.hidpi) setIcons('bold,0,,italic,24,,strike,48,,subscript,72,,superscript,96,,underline,120,,blockquote,144,,copy-rtl,168,,copy,192,,cut-rtl,216,,cut,240,,paste-rtl,264,,paste,288,,horizontalrule,312,,indent-rtl,336,,indent,360,,outdent-rtl,384,,outdent,408,,justifyblock,432,,justifycenter,456,,justifyleft,480,,justifyright,504,,bulletedlist-rtl,528,,bulletedlist,552,,numberedlist-rtl,576,,numberedlist,600,,pastefromword-rtl,624,,pastefromword,648,,removeformat,672,,redo-rtl,696,,redo,720,,undo-rtl,744,,undo,768,','icons_hidpi.png');else setIcons('bold,0,auto,italic,24,auto,strike,48,auto,subscript,72,auto,superscript,96,auto,underline,120,auto,blockquote,144,auto,copy-rtl,168,auto,copy,192,auto,cut-rtl,216,auto,cut,240,auto,paste-rtl,264,auto,paste,288,auto,horizontalrule,312,auto,indent-rtl,336,auto,indent,360,auto,outdent-rtl,384,auto,outdent,408,auto,justifyblock,432,auto,justifycenter,456,auto,justifyleft,480,auto,justifyright,504,auto,bulletedlist-rtl,528,auto,bulletedlist,552,auto,numberedlist-rtl,576,auto,numberedlist,600,auto,pastefromword-rtl,624,auto,pastefromword,648,auto,removeformat,672,auto,redo-rtl,696,auto,redo,720,auto,undo-rtl,744,auto,undo,768,auto','icons.png');})();CKEDITOR.lang.languages={"af":1,"ar":1,"bg":1,"bn":1,"bs":1,"ca":1,"cs":1,"cy":1,"da":1,"de":1,"el":1,"en":1,"en-au":1,"en-ca":1,"en-gb":1,"eo":1,"es":1,"et":1,"eu":1,"fa":1,"fi":1,"fo":1,"fr":1,"fr-ca":1,"gl":1,"gu":1,"he":1,"hi":1,"hr":1,"hu":1,"id":1,"is":1,"it":1,"ja":1,"ka":1,"km":1,"ko":1,"ku":1,"lt":1,"lv":1,"mk":1,"mn":1,"ms":1,"nb":1,"nl":1,"no":1,"pl":1,"pt":1,"pt-br":1,"ro":1,"ru":1,"si":1,"sk":1,"sl":1,"sq":1,"sr":1,"sr-latn":1,"sv":1,"th":1,"tr":1,"tt":1,"ug":1,"uk":1,"vi":1,"zh":1,"zh-cn":1};}());

        if (typeof CKEDITOR !== 'undefined') {
            CKEDITOR.disableAutoInline = true;
        }
    }

    'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function () {
    'use strict';

    /**
     * AlloyEditor static object.
     *
     * @class AlloyEditor
     * @type {Object}
     */

    var AlloyEditor = {
        /**
         * Creates an instance of AlloyEditor.
         *
         * @method editable
         * @static
         * @param {String|Node} node The Node ID or HTMl node, which AlloyEditor should use as an editable area.
         * @param {Object} config Configuration attributes for the current instance of AlloyEditor.
         * @return {Object} An instance of {{#crossLink "Core"}}{{/crossLink}}
         */
        editable: function editable(node, config) {
            config = config || {};
            config.srcNode = node;

            AlloyEditor.implementEventTarget();

            return new AlloyEditor.Core(config);
        },

        /**
         * The full URL for the AlloyEditor installation directory.
         * It is possible to manually provide the base path by setting a
         * global variable named `ALLOYEDITOR_BASEPATH`. This global variable
         * must be set **before** the editor script loading.
         *
         * @method getBasePath
         * @static
         * @return {String} The found base path
         */
        getBasePath: function getBasePath() {
            // Find out the editor directory path, based on its <script> tag.
            var path = window.ALLOYEDITOR_BASEPATH || '';

            if (!path) {
                var scripts = document.getElementsByTagName('script');

                for (var i = 0; i < scripts.length; i++) {
                    var match = scripts[i].src.match(AlloyEditor.regexBasePath);

                    if (match) {
                        path = match[1];
                        break;
                    }
                }
            }

            // In IE (only) the script.src string is the raw value entered in the
            // HTML source. Other browsers return the full resolved URL instead.
            if (path.indexOf(':/') === -1 && path.slice(0, 2) !== '//') {
                // Absolute path.
                if (path.indexOf('/') === 0) {
                    path = location.href.match(/^.*?:\/\/[^\/]*/)[0] + path;
                }
                // Relative path.
                else {
                        path = location.href.match(/^[^\?]*\/(?:)/)[0] + path;
                    }
            }

            if (!path) {
                throw 'The AlloyEditor installation path could not be automatically detected. Please set the global variable "ALLOYEDITOR_BASEPATH" before creating editor instances.';
            }

            return path;
        },

        /**
         * Detects and load the corresponding language file if AlloyEditor language strings are not already present.
         * The function fires a {{#crossLink "AlloyEditor/languageResourcesLoaded:event"}}{{/crossLink}} event
         *
         * @method loadLanguageResources
         * @static
         * @param {Function} callback Optional callback to be called when AlloyEditor loads the language resource.
         */
        loadLanguageResources: function loadLanguageResources(callback) {
            AlloyEditor.implementEventTarget();

            if (AlloyEditor.Lang.isFunction(callback)) {
                if (AlloyEditor.Strings) {
                    setTimeout(callback, 0);
                } else {
                    AlloyEditor.once('languageResourcesLoaded', callback);
                }
            }

            if (!AlloyEditor._langResourceRequested) {
                AlloyEditor._langResourceRequested = true;

                var languages = ['af', 'ar', 'bg', 'bn', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en-au', 'en-ca', 'en-gb', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fo', 'fr-ca', 'fr', 'gl', 'gu', 'he', 'hi', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ka', 'km', 'ko', 'ku', 'lt', 'lv', 'mk', 'mn', 'ms', 'nb', 'nl', 'no', 'pl', 'pt-br', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'sq', 'sr-latn', 'sr', 'sv', 'th', 'tr', 'tt', 'ug', 'uk', 'vi', 'zh-cn', 'zh'];

                var userLanguage = navigator.language || navigator.userLanguage || 'en';

                var parts = userLanguage.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/);
                var lang = parts[1];
                var locale = parts[2];

                if (languages.indexOf(lang + '-' + locale) >= 0) {
                    lang = lang + '-' + locale;
                } else if (languages.indexOf(lang) === -1) {
                    lang = 'en';
                }

                CKEDITOR.scriptLoader.load(AlloyEditor.getUrl('lang/alloy-editor/' + lang + '.js'), function (loaded) {
                    if (loaded) {
                        AlloyEditor.fire('languageResourcesLoaded');
                    }
                }, this);
            }
        },

        /**
         * Gets the full URL for AlloyEditor resources. By default, URLs
         * returned by this function contain a querystring parameter ("t")
         * set to the {@link CKEDITOR#timestamp} value.
         *
         * @method getUrl
         * @static
         * @param {String} resource The resource whose full URL we want to get.
         * It may be a full, absolute, or relative URL.
         * @return {String} The full URL.
         */
        getUrl: function getUrl(resource) {
            var basePath = AlloyEditor.getBasePath();

            // If this is not a full or absolute path.
            if (resource.indexOf(':/') === -1 && resource.indexOf('/') !== 0) {
                resource = basePath + resource;
            }

            // Add the timestamp, except for directories.
            if (CKEDITOR.timestamp && resource.charAt(resource.length - 1) !== '/' && !/[&?]t=/.test(resource)) {
                resource += (resource.indexOf('?') >= 0 ? '&' : '?') + 't=' + CKEDITOR.timestamp;
            }

            return resource;
        },

        /**
         * Implements event firing and subscribing via CKEDITOR.event.
         *
         * @method implementEventTarget
         * @static
         */
        implementEventTarget: function implementEventTarget() {
            if (!AlloyEditor.fire && !AlloyEditor.on) {
                CKEDITOR.event.implementOn(AlloyEditor);
            }
        },

        /**
         * Regular expression which should match the script which have been used to load AlloyEditor.
         *
         * @property regexBasePath
         * @type {RegExp}
         * @static
         */
        regexBasePath: /(^|.*[\\\/])(?:alloy-editor[^/]+|alloy-editor)\.js(?:\?.*|;.*)?$/i,

        /**
         * And object, containing all currently registered buttons in AlloyEditor.
         *
         * @property Buttons
         * @type {Object}
         * @static
         */
        Buttons: {},

        /**
         * And object, containing all currently registered toolbars in AlloyEditor.
         *
         * @property Toolbars
         * @type {Object}
         * @static
         */
        Toolbars: {}

        /**
         * Fired when AlloyEditor detects the browser language and loads the corresponding language file. Once this event
         * is fired, AlloyEditor.Strings will be populated with data.
         *
         * @event languageResourcesLoaded
         */
    };

    if (typeof module !== 'undefined' && _typeof(module.exports) === 'object') {
        module.exports = AlloyEditor;
    }

    if (typeof window !== 'undefined') {
        window.AlloyEditor = AlloyEditor;
    } else if (typeof global !== 'undefined') {
        global.AlloyEditor = AlloyEditor;
    } else if (typeof self !== 'undefined') {
        self.AlloyEditor = AlloyEditor;
    } else {
        this.AlloyEditor = AlloyEditor;
    }
})();

    

    var React = (function() {
        return (0, eval)('this').React;
    }());

    if (typeof React === 'undefined' && typeof AlloyEditor !== 'undefined') {
        React = AlloyEditor.React;
    }

    if (typeof React === 'undefined' && typeof require === 'function') {
        React = require('react');
    }

    var ReactDOM = (function() {
        return (0, eval)('this').ReactDOM;
    }());

    if (typeof ReactDOM === 'undefined' && typeof AlloyEditor !== 'undefined') {
        ReactDOM = AlloyEditor.ReactDOM;
    }

    if (typeof ReactDOM === 'undefined' && typeof require === 'function') {
        ReactDOM = require('react-dom');
    }

    if (typeof window !== 'undefined') {
       deployCKEditor();

        'use strict';

(function () {
    'use strict';

    /**
     * CKEDITOR.tools class utility which adds additional methods to those of CKEditor.
     *
     * @class CKEDITOR.tools
     */

    /**
     * Debounce util function. If a function execution is expensive, it might be debounced. This means
     * that it will be executed after some amount of time after its last call. For example, if we attach a
     * a function on scroll event, it might be called hundreds times per second. In this case it may be
     * debounced with, let's say 100ms. The real execution of this function will happen 100ms after last
     * scroll event.
     *
     * @static
     * @method debounce
     * @param {Function} callback The callback which has to be called after given timeout.
     * @param {Number} timeout Timeout in milliseconds after which the callback will be called.
     * @param {Object} context The context in which the callback will be called. This argument is optional.
     * @param {Array} args An array of arguments which the callback will receive.
     */

    CKEDITOR.tools.debounce = CKEDITOR.tools.debounce || function (callback, timeout, context, args) {
        var debounceHandle;

        var callFn = function callFn() {
            var callContext = context || this;

            clearTimeout(debounceHandle);

            var result = [];

            for (var len = arguments.length, startIndex = 0; startIndex < len; ++startIndex) {
                result.push(arguments[startIndex]);
            }

            var callArgs = result.concat(args || []);

            debounceHandle = setTimeout(function () {
                callback.apply(callContext, callArgs);
            }, timeout);
        };

        callFn.detach = function () {
            clearTimeout(debounceHandle);
        };

        return callFn;
    };
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function () {
    'use strict';

    var REGEX_EMAIL_SCHEME = /^[a-z0-9\u0430-\u044F\._-]+@/i;
    var REGEX_URI_SCHEME = /^(?:[a-z][a-z0-9+\-.]*)\:|^\//i;

    /**
     * Link class utility. Provides methods for create, delete and update links.
     *
     * @class CKEDITOR.Link
     * @constructor
     * @param {Object} editor The CKEditor instance.
     */

    function Link(editor, config) {
        this._editor = editor;
        this.appendProtocol = config && config.appendProtocol === false ? false : true;
    }

    Link.prototype = {
        constructor: Link,

        /**
         * Advances the editor selection to the next available position after a
         * given link or the one in the current selection.
         *
         * @param {CKEDITOR.dom.element} link The link element which link style should be removed.
         * @method advanceSelection
         */
        advanceSelection: function advanceSelection(link) {
            link = link || this.getFromSelection();

            var range = this._editor.getSelection().getRanges()[0];

            if (link) {
                range.moveToElementEditEnd(link);

                var nextNode = range.getNextEditableNode();

                if (nextNode && !this._editor.element.equals(nextNode.getCommonAncestor(link))) {
                    var whitespace = /\s/.exec(nextNode.getText());

                    var offset = whitespace ? whitespace.index + 1 : 0;

                    range.setStart(nextNode, offset);
                    range.setEnd(nextNode, offset);
                }
            }

            this._editor.getSelection().selectRanges([range]);
        },

        /**
         * Create a link with given URI as href.
         *
         * @method create
         * @param {String} URI The URI of the link.
         * @param {Object} attrs A config object with link attributes. These might be arbitrary DOM attributes.
         * @param {Object} modifySelection A config object with an advance attribute to indicate if the selection should be moved after the link creation.
         */
        create: function create(URI, attrs, modifySelection) {
            var selection = this._editor.getSelection();

            var range = selection.getRanges()[0];

            if (range.collapsed) {
                var text = new CKEDITOR.dom.text(URI, this._editor.document);
                range.insertNode(text);
                range.selectNodeContents(text);
            }

            URI = this._getCompleteURI(URI);

            var linkAttrs = CKEDITOR.tools.merge({
                'data-cke-saved-href': URI,
                href: URI
            }, attrs);

            var style = new CKEDITOR.style({
                attributes: linkAttrs,
                element: 'a'
            });

            style.type = CKEDITOR.STYLE_INLINE;
            style.applyToRange(range, this._editor);

            if (modifySelection && modifySelection.advance) {
                this.advanceSelection();
            } else {
                range.select();
            }
        },

        /**
         * Retrieves a link from the current selection.
         *
         * @method getFromSelection
         * @return {CKEDITOR.dom.element} The retrieved link or null if not found.
         */
        getFromSelection: function getFromSelection() {
            var selection = this._editor.getSelection();

            var selectedElement = selection.getSelectedElement();

            if (selectedElement && selectedElement.is('a')) {
                return selectedElement;
            }

            var range = selection.getRanges()[0];

            if (range) {
                range.shrink(CKEDITOR.SHRINK_TEXT);

                return this._editor.elementPath(range.getCommonAncestor()).contains('a', 1);
            }

            return null;
        },

        /**
         * Removes a link from the editor.
         *
         * @param {CKEDITOR.dom.element} link The link element which link style should be removed.
         * @param {Object} modifySelection A config object with an advance attribute to indicate if the selection should be moved after the link creation.
         * @method remove
         */
        remove: function remove(link, modifySelection) {
            var editor = this._editor;

            if (link) {
                if (modifySelection && modifySelection.advance) {
                    this.advanceSelection();
                }

                link.remove(editor);
            } else {
                var style = new CKEDITOR.style({
                    alwaysRemoveElement: 1,
                    element: 'a',
                    type: CKEDITOR.STYLE_INLINE
                });

                // 'removeStyle()' removes the style from the editor's current selection.
                //  We need to force the selection to be the whole link element
                //  to remove it properly.

                var selection = editor.getSelection();
                selection.selectElement(selection.getStartElement());

                editor.removeStyle(style);
            }
        },

        /**
         * Updates the href of an already existing link.
         *
         * @method update
         * @param {Object|String} attrs The attributes to update or remove. Attributes with null values will be removed.
         * @param {CKEDITOR.dom.element} link The link element which href should be removed.
         * @param {Object} modifySelection A config object with an advance attribute to indicate if the selection should be moved after the link creation.
         */
        update: function update(attrs, link, modifySelection) {
            link = link || this.getFromSelection();

            if (typeof attrs === 'string') {
                link.setAttributes({
                    'data-cke-saved-href': attrs,
                    href: attrs
                });
            } else if ((typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs)) === 'object') {
                var removeAttrs = [];
                var setAttrs = {};

                Object.keys(attrs).forEach(function (key) {
                    if (attrs[key] === null) {
                        if (key === 'href') {
                            removeAttrs.push('data-cke-saved-href');
                        }

                        removeAttrs.push(key);
                    } else {
                        if (key === 'href') {
                            setAttrs['data-cke-saved-href'] = attrs[key];
                        }

                        setAttrs[key] = attrs[key];
                    }
                });

                link.removeAttributes(removeAttrs);
                link.setAttributes(setAttrs);
            }

            if (modifySelection && modifySelection.advance) {
                this.advanceSelection(link);
            }
        },

        /**
         * Checks if the URI has an '@' symbol. If it does and the URI looks like an email
         * and doesn't have 'mailto:', 'mailto:' is added to the URI.
         * If it doesn't and the URI doesn't have a scheme, the default 'http' scheme with
         * hierarchical path '//' is added to the URI.
         *
         * @protected
         * @method _getCompleteURI
         * @param {String} URI The URI of the link.
         * @return {String} The URI updated with the protocol.
         */
        _getCompleteURI: function _getCompleteURI(URI) {
            if (REGEX_EMAIL_SCHEME.test(URI)) {
                URI = 'mailto:' + URI;
            } else if (!REGEX_URI_SCHEME.test(URI)) {
                URI = this.appendProtocol ? 'http://' + URI : URI;
            }

            return URI;
        }
    };

    CKEDITOR.Link = CKEDITOR.Link || Link;
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_selectionregion')) {
        return;
    }

    CKEDITOR.SELECTION_TOP_TO_BOTTOM = 0;
    CKEDITOR.SELECTION_BOTTOM_TO_TOP = 1;
    CKEDITOR.SELECTION_LEFT_TO_RIGHT = 2;
    CKEDITOR.SELECTION_RIGHT_TO_LEFT = 3;

    /**
     * SelectionRegion utility class which provides metadata about the selection. The metadata may be the start and end
     * rectangles, caret region, etc. **This class is not intended to be used standalone. Its functions will
     * be merged into each editor instance, so the developer may use them directly via the editor, without making
     * an instance of this class**.
     *
     * @class CKEDITOR.plugins.ae_selectionregion
     * @constructor
     */
    function SelectionRegion() {}

    SelectionRegion.prototype = {
        constructor: SelectionRegion,

        /**
         * Creates selection from two points in page coordinates.
         *
         * @method createSelectionFromPoint
         * @param {Number} x X point in page coordinates.
         * @param {Number} y Y point in page coordinates.
         */
        createSelectionFromPoint: function createSelectionFromPoint(x, y) {
            this.createSelectionFromRange(x, y, x, y);
        },

        /**
         * Creates selection from range. A range consists from two points in page coordinates.
         *
         * @method createSelectionFromRange
         * @param {Number} startX X coordinate of the first point.
         * @param {Number} startY Y coordinate of the first point.
         * @param {Number} endX X coordinate of the second point.
         * @param {Number} endY Y coordinate of the second point.
         */
        createSelectionFromRange: function createSelectionFromRange(startX, startY, endX, endY) {
            var end;
            var endContainer;
            var endOffset;
            var range;
            var start;
            var startContainer;
            var startOffset;

            if (typeof document.caretPositionFromPoint === 'function') {
                start = document.caretPositionFromPoint(startX, startY);
                end = document.caretPositionFromPoint(endX, endY);

                startContainer = start.offsetNode;
                endContainer = end.offsetNode;

                startOffset = start.offset;
                endOffset = end.offset;

                range = this.createRange();
            } else if (typeof document.caretRangeFromPoint === 'function') {
                start = document.caretRangeFromPoint(startX, startY);
                end = document.caretRangeFromPoint(endX, endY);

                startContainer = start.startContainer;
                endContainer = end.startContainer;

                startOffset = start.startOffset;
                endOffset = end.startOffset;

                range = this.createRange();
            }

            if (range && document.getSelection) {
                range.setStart(new CKEDITOR.dom.node(startContainer), startOffset);
                range.setEnd(new CKEDITOR.dom.node(endContainer), endOffset);

                this.getSelection().selectRanges([range]);
            } else if (typeof document.body.createTextRange === 'function') {
                var selection = this.getSelection();

                selection.unlock();

                range = document.body.createTextRange();
                range.moveToPoint(startX, startY);

                var endRange = range.duplicate();
                endRange.moveToPoint(endX, endY);

                range.setEndPoint('EndToEnd', endRange);
                range.select();

                this.getSelection().lock();
            }
        },

        /**
         * Returns the region of the current position of the caret. The points are in page coordinates.
         *
         * @method getCaretRegion
         * @return {Object} Returns object with the following properties:
         * - bottom
         * - left
         * - right
         * - top
         */
        getCaretRegion: function getCaretRegion() {
            var selection = this.getSelection();

            var region = {
                bottom: 0,
                left: 0,
                right: 0,
                top: 0
            };

            var bookmarks = selection.createBookmarks();

            if (!bookmarks.length) {
                return region;
            }

            var bookmarkNodeEl = bookmarks[0].startNode.$;

            bookmarkNodeEl.style.display = 'inline-block';

            region = new CKEDITOR.dom.element(bookmarkNodeEl).getClientRect();

            bookmarkNodeEl.parentNode.removeChild(bookmarkNodeEl);

            var scrollPos = new CKEDITOR.dom.window(window).getScrollPosition();

            region.bottom = scrollPos.y + region.bottom;
            region.left = scrollPos.x + region.left;
            region.right = scrollPos.x + region.right;
            region.top = scrollPos.y + region.top;

            return region;
        },

        /**
         * Returns data for the current selection.
         *
         * @method getSelectionData
         * @return {Object|null} Returns an object with the following data:
         * - element - The currently selected element, if any
         * - text - The selected text
         * - region - The data, returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionRegion:method"}}{{/crossLink}}
         */
        getSelectionData: function getSelectionData() {
            var selection = this.getSelection();

            if (!selection.getNative()) {
                return null;
            }

            var result = {
                element: selection.getSelectedElement(),
                text: selection.getSelectedText()
            };

            result.region = this.getSelectionRegion(selection);

            return result;
        },

        /**
         * Returns the region of the current selection.
         *
         * @method getSelectionRegion
         * @return {Object} Returns object which is being returned from
         * {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getClientRectsRegion:method"}}{{/crossLink}} with three more properties:
         * - direction - the direction of the selection. Can be one of these:
         *   1. CKEDITOR.SELECTION_TOP_TO_BOTTOM
         *   2. CKEDITOR.SELECTION_BOTTOM_TO_TOP
         * - height - The height of the selection region
         * - width - The width of the selection region
         */
        getSelectionRegion: function getSelectionRegion() {
            var region = this.getClientRectsRegion();

            region.direction = this.getSelectionDirection();

            region.height = region.bottom - region.top;
            region.width = region.right - region.left;

            return region;
        },

        /**
         * Returns true if the current selection is empty, false otherwise.
         *
         * @method isSelectionEmpty
         * @return {Boolean} Returns true if the current selection is empty, false otherwise.
         */
        isSelectionEmpty: function isSelectionEmpty() {
            var ranges;

            var selection = this.getSelection();

            return selection.getType() === CKEDITOR.SELECTION_NONE || (ranges = selection.getRanges()) && ranges.length === 1 && ranges[0].collapsed;
        },

        /**
         * Returns object with data about the [client rectangles](https://developer.mozilla.org/en-US/docs/Web/API/Element.getClientRects) of the selection,
         * normalized across browses. All offsets below are in page coordinates.
         *
         * @method getClientRectsRegion
         * @return {Object} Returns object with the following data:
         * - bottom - bottom offset of all client rectangles
         * - left - left offset of all client rectangles
         * - right - right offset of all client rectangles
         * - top - top offset of all client rectangles
         * - startRect - An Object, which contains the following information:
         *     + bottom - bottom offset
         *     + height - the height of the rectangle
         *     + left - left offset of the selection
         *     + right - right offset of the selection
         *     + top - top offset of the selection
         *     + width - the width of the rectangle
         * - endRect - An Object, which contains the following information:
         *     + bottom - bottom offset
         *     + height - the height of the rectangle
         *     + left - left offset of the selection
         *     + right - right offset of the selection
         *     + top - top offset of the selection
         *     + width - the width of the rectangle
         *
         * If there is no native selection, the objects will be filled with 0.
         */
        getClientRectsRegion: function getClientRectsRegion() {
            var selection = this.getSelection();
            var nativeSelection = selection.getNative();

            var defaultRect = {
                bottom: 0,
                height: 0,
                left: 0,
                right: 0,
                top: 0,
                width: 0
            };

            var region = {
                bottom: 0,
                endRect: defaultRect,
                left: 0,
                right: 0,
                top: 0,
                startRect: defaultRect
            };

            if (!nativeSelection) {
                return region;
            }

            var bottom = 0;
            var clientRects;
            var left = Infinity;
            var rangeCount;
            var right = -Infinity;
            var top = Infinity;

            if (nativeSelection.createRange) {
                clientRects = nativeSelection.createRange().getClientRects();
            } else {
                rangeCount = nativeSelection.rangeCount;
                clientRects = nativeSelection.rangeCount > 0 ? nativeSelection.getRangeAt(0).getClientRects() : [];
            }

            if (clientRects.length === 0) {
                region = this.getCaretRegion();
            } else {
                for (var i = 0, length = clientRects.length; i < length; i++) {
                    var item = clientRects[i];

                    if (item.left < left) {
                        left = item.left;
                    }

                    if (item.right > right) {
                        right = item.right;
                    }

                    if (item.top < top) {
                        top = item.top;
                    }

                    if (item.bottom > bottom) {
                        bottom = item.bottom;
                    }
                }

                var scrollPos = new CKEDITOR.dom.window(window).getScrollPosition();

                region.bottom = scrollPos.y + bottom;
                region.left = scrollPos.x + left;
                region.right = scrollPos.x + right;
                region.top = scrollPos.y + top;

                if (clientRects.length) {
                    var endRect = clientRects[clientRects.length - 1];
                    var startRect = clientRects[0];

                    region.endRect = {
                        bottom: scrollPos.y + endRect.bottom,
                        height: endRect.height,
                        left: scrollPos.x + endRect.left,
                        right: scrollPos.x + endRect.right,
                        top: scrollPos.y + endRect.top,
                        width: endRect.width
                    };

                    region.startRect = {
                        bottom: scrollPos.y + startRect.bottom,
                        height: startRect.height,
                        left: scrollPos.x + startRect.left,
                        right: scrollPos.x + startRect.right,
                        top: scrollPos.y + startRect.top,
                        width: startRect.width
                    };
                }
            }

            return region;
        },

        /**
         * Retrieves the direction of the selection. The direction is from top to bottom or from bottom to top.
         * For IE < 9 it is not possible, so the direction for these browsers will be always CKEDITOR.SELECTION_TOP_TO_BOTTOM.
         *
         * @method getSelectionDirection
         * @return {Number} Returns a number which represents selection direction. It might be one of these:
         * - CKEDITOR.SELECTION_TOP_TO_BOTTOM;
         * - CKEDITOR.SELECTION_BOTTOM_TO_TOP;
         */
        getSelectionDirection: function getSelectionDirection() {
            var direction = CKEDITOR.SELECTION_TOP_TO_BOTTOM;
            var selection = this.getSelection();
            var nativeSelection = selection.getNative();

            if (!nativeSelection) {
                return direction;
            }

            var anchorNode;

            if ((anchorNode = nativeSelection.anchorNode) && anchorNode.compareDocumentPosition) {
                var position = anchorNode.compareDocumentPosition(nativeSelection.focusNode);

                if (!position && nativeSelection.anchorOffset > nativeSelection.focusOffset || position === Node.DOCUMENT_POSITION_PRECEDING) {
                    direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
                }
            }

            return direction;
        }
    };

    CKEDITOR.plugins.add('ae_selectionregion', {
        /**
         * Initializer lifecycle implementation for the SelectionRegion plugin.
         *
         * @method init
         * @protected
         * @param {Object} editor The current CKEditor instance.
         */
        init: function init(editor) {
            var attr, hasOwnProperty;

            hasOwnProperty = Object.prototype.hasOwnProperty;

            for (attr in SelectionRegion.prototype) {
                if (hasOwnProperty.call(SelectionRegion.prototype, attr) && typeof editor[attr] === 'undefined') {
                    editor[attr] = SelectionRegion.prototype[attr];
                }
            }
        }
    });
})();
'use strict';

(function () {
    'use strict';

    var IE_NON_DIRECTLY_EDITABLE_ELEMENT = {
        'table': 1,
        'col': 1,
        'colgroup': 1,
        'tbody': 1,
        'td': 1,
        'tfoot': 1,
        'th': 1,
        'thead': 1,
        'tr': 1
    };

    /**
     * Table class utility. Provides methods for create, delete and update tables.
     *
     * @class CKEDITOR.Table
     * @constructor
     * @param {Object} editor The CKEditor instance.
     */

    function Table(editor) {
        this._editor = editor;
    }

    Table.HEADING_BOTH = 'Both';
    Table.HEADING_COL = 'Column';
    Table.HEADING_NONE = 'None';
    Table.HEADING_ROW = 'Row';

    Table.prototype = {
        constructor: Table,

        /**
         * Creates a table.
         *
         * @method create
         * @param {Object} config Table configuration object
         * @return {Object} The created table
         */
        create: function create(config) {
            var editor = this._editor;
            var table = this._createElement('table');

            config = config || {};

            // Generate the rows and cols.
            var tbody = table.append(this._createElement('tbody'));
            var rows = config.rows || 1;
            var cols = config.cols || 1;

            for (var i = 0; i < rows; i++) {
                var row = tbody.append(this._createElement('tr'));
                for (var j = 0; j < cols; j++) {
                    var cell = row.append(this._createElement('td'));

                    cell.appendBogus();
                }
            }

            this.setAttributes(table, config.attrs);
            this.setHeading(table, config.heading);

            // Insert the table element if we're creating one.
            editor.insertElement(table);

            var firstCell = new CKEDITOR.dom.element(table.$.rows[0].cells[0]);
            var range = editor.createRange();
            range.moveToPosition(firstCell, CKEDITOR.POSITION_AFTER_START);
            range.select();

            return table;
        },

        /**
         * Retrieves a table from the current selection.
         *
         * @method getFromSelection
         * @return {CKEDITOR.dom.element} The retrieved table or null if not found.
         */
        getFromSelection: function getFromSelection() {
            var table;
            var selection = this._editor.getSelection();
            var selected = selection.getSelectedElement();

            if (selected && selected.is('table')) {
                table = selected;
            } else {
                var ranges = selection.getRanges();

                if (ranges.length > 0) {
                    // Webkit could report the following range on cell selection (#4948):
                    // <table><tr><td>[&nbsp;</td></tr></table>]

                    /* istanbul ignore else */
                    if (CKEDITOR.env.webkit) {
                        ranges[0].shrink(CKEDITOR.NODE_ELEMENT);
                    }

                    table = this._editor.elementPath(ranges[0].getCommonAncestor(true)).contains('table', 1);
                }
            }

            return table;
        },

        /**
         * Checks if a given table can be considered as editable. This method
         * workarounds a limitation of IE where for some elements (like table),
         * `isContentEditable` returns always false. This is because IE does not support
         * `contenteditable` on such elements. However, despite such elements
         * cannot be set as content editable directly, a content editable SPAN,
         * or DIV element can be placed inside the individual table cells.
         * See https://msdn.microsoft.com/en-us/library/ms537837%28v=VS.85%29.aspx
         *
         * @method isEditable
         * @param {CKEDITOR.dom.element} el The table element to test if editable
         * @return {Boolean}
         */
        isEditable: function isEditable(el) {
            if (!CKEDITOR.env.ie || !el.is(IE_NON_DIRECTLY_EDITABLE_ELEMENT)) {
                return !el.isReadOnly();
            }

            if (el.hasAttribute('contenteditable')) {
                return el.getAttribute('contenteditable') !== 'false';
            }

            return this.isEditable(el.getParent());
        },

        /**
         * Returns which heading style is set for the given table.
         *
         * @method getHeading
         * @param {CKEDITOR.dom.element} table The table to gather the heading from. If null, it will be retrieved from the current selection.
         * @return {String} The heading of the table. Expected values are `CKEDITOR.Table.NONE`, `CKEDITOR.Table.ROW`, `CKEDITOR.Table.COL` and `CKEDITOR.Table.BOTH`.
         */
        getHeading: function getHeading(table) {
            table = table || this.getFromSelection();

            if (!table) {
                return null;
            }

            var rowHeadingSettings = table.$.tHead !== null;

            var colHeadingSettings = true;

            // Check if all of the first cells in every row are TH
            for (var row = 0; row < table.$.rows.length; row++) {
                // If just one cell isn't a TH then it isn't a header column
                var cell = table.$.rows[row].cells[0];

                if (cell && cell.nodeName.toLowerCase() !== 'th') {
                    colHeadingSettings = false;
                    break;
                }
            }

            var headingSettings = Table.HEADING_NONE;

            if (rowHeadingSettings) {
                headingSettings = Table.HEADING_ROW;
            }

            if (colHeadingSettings) {
                headingSettings = headingSettings === Table.HEADING_ROW ? Table.HEADING_BOTH : Table.HEADING_COL;
            }

            return headingSettings;
        },

        /**
         * Removes a table from the editor.
         *
         * @method remove
         * @param {CKEDITOR.dom.element} table The table element which table style should be removed.
         */
        remove: function remove(table) {
            var editor = this._editor;

            if (table) {
                table.remove();
            } else {
                table = editor.elementPath().contains('table', 1);

                if (table) {
                    // If the table's parent has only one child remove it as well (unless it's a table cell, or the editable element) (#5416, #6289, #12110)
                    var parent = table.getParent();
                    var editable = editor.editable();

                    if (parent.getChildCount() === 1 && !parent.is('td', 'th') && !parent.equals(editable)) {
                        table = parent;
                    }

                    var range = editor.createRange();
                    range.moveToPosition(table, CKEDITOR.POSITION_BEFORE_START);
                    table.remove();
                    range.select();
                }
            }
        },

        /**
         * Assigns provided attributes to a table.
         *
         * @method setAttributes
         * @param {Object} table The table to which the attributes should be assigned
         * @param {Object} attrs The attributes which have to be assigned to the table
         */
        setAttributes: function setAttributes(table, attrs) {
            if (attrs) {
                Object.keys(attrs).forEach(function (attr) {
                    table.setAttribute(attr, attrs[attr]);
                });
            }
        },

        /**
         * Sets the appropriate table heading style to a table.
         *
         * @method setHeading
         * @param {CKEDITOR.dom.element} table The table element to which the heading should be set. If null, it will be retrieved from the current selection.
         * @param {String} heading The table heading to be set. Accepted values are: `CKEDITOR.Table.NONE`, `CKEDITOR.Table.ROW`, `CKEDITOR.Table.COL` and `CKEDITOR.Table.BOTH`.
         */
        setHeading: function setHeading(table, heading) {
            table = table || this.getFromSelection();

            var i, newCell;
            var tableHead;
            var tableBody = table.getElementsByTag('tbody').getItem(0);

            var tableHeading = this.getHeading(table);
            var hadColHeading = tableHeading === Table.HEADING_COL || tableHeading === Table.HEADING_BOTH;

            var needColHeading = heading === Table.HEADING_COL || heading === Table.HEADING_BOTH;
            var needRowHeading = heading === Table.HEADING_ROW || heading === Table.HEADING_BOTH;

            // If we need row heading and don't have a <thead> element yet, move the
            // first row of the table to the head and convert the nodes to <th> ones.
            if (!table.$.tHead && needRowHeading) {
                var tableFirstRow = tableBody.getElementsByTag('tr').getItem(0);
                var tableFirstRowChildCount = tableFirstRow.getChildCount();

                // Change TD to TH:
                for (i = 0; i < tableFirstRowChildCount; i++) {
                    var cell = tableFirstRow.getChild(i);

                    // Skip bookmark nodes. (#6155)
                    if (cell.type === CKEDITOR.NODE_ELEMENT && !cell.data('cke-bookmark')) {
                        cell.renameNode('th');
                        cell.setAttribute('scope', 'col');
                    }
                }

                tableHead = this._createElement(table.$.createTHead());
                tableHead.append(tableFirstRow.remove());
            }

            // If we don't need row heading and we have a <thead> element, move the
            // row out of there and into the <tbody> element.
            if (table.$.tHead !== null && !needRowHeading) {
                // Move the row out of the THead and put it in the TBody:
                tableHead = this._createElement(table.$.tHead);

                var previousFirstRow = tableBody.getFirst();

                while (tableHead.getChildCount() > 0) {
                    var newFirstRow = tableHead.getFirst();
                    var newFirstRowChildCount = newFirstRow.getChildCount();

                    for (i = 0; i < newFirstRowChildCount; i++) {
                        newCell = newFirstRow.getChild(i);

                        if (newCell.type === CKEDITOR.NODE_ELEMENT) {
                            newCell.renameNode('td');
                            newCell.removeAttribute('scope');
                        }
                    }

                    newFirstRow.insertBefore(previousFirstRow);
                }

                tableHead.remove();
            }

            tableHeading = this.getHeading(table);
            var hasColHeading = tableHeading === Table.HEADING_COL || tableHeading === Table.HEADING_BOTH;

            // If we need column heading and the table doesn't have it, convert every first cell in
            // every row into a `<th scope="row">` element.
            if (!hasColHeading && needColHeading) {
                for (i = 0; i < table.$.rows.length; i++) {
                    if (table.$.rows[i].cells[0].nodeName.toLowerCase() !== 'th') {
                        newCell = new CKEDITOR.dom.element(table.$.rows[i].cells[0]);
                        newCell.renameNode('th');
                        newCell.setAttribute('scope', 'row');
                    }
                }
            }

            // If we don't need column heading but the table has it, convert every first cell in every
            // row back into a `<td>` element.
            if (hadColHeading && !needColHeading) {
                for (i = 0; i < table.$.rows.length; i++) {
                    var row = new CKEDITOR.dom.element(table.$.rows[i]);

                    if (row.getParent().getName() === 'tbody') {
                        newCell = new CKEDITOR.dom.element(row.$.cells[0]);
                        newCell.renameNode('td');
                        newCell.removeAttribute('scope');
                    }
                }
            }
        },

        /**
         * Creates a new CKEDITOR.dom.element using the passed tag name.
         *
         * @protected
         * @method _createElement
         * @param {String} name The tag name from which an element should be created
         * @return {CKEDITOR.dom.element} Instance of CKEDITOR DOM element class
         */
        _createElement: function _createElement(name) {
            return new CKEDITOR.dom.element(name, this._editor.document);
        }
    };

    CKEDITOR.on('instanceReady', function (event) {
        var headingCommands = [Table.HEADING_NONE, Table.HEADING_ROW, Table.HEADING_COL, Table.HEADING_BOTH];

        var tableUtils = new Table(event.editor);

        headingCommands.forEach(function (heading) {
            event.editor.addCommand('tableHeading' + heading, {
                exec: function exec(editor) {
                    tableUtils.setHeading(null, heading);
                }
            });
        });
    });

    CKEDITOR.Table = CKEDITOR.Table || Table;
})();
'use strict';

(function () {
    'use strict';

    /**
     * CKEDITOR.tools class utility which adds additional methods to those of CKEditor.
     *
     * @class CKEDITOR.tools
     */

    /**
     * Sends a request using the JSONP technique.
     *
     * @method CKEDITOR.tools.jsonp
     * @static
     * @param {CKEDITOR.template} urlTemplate The template of the URL to be requested. All properties
     * passed in `urlParams` can be used, plus a `{callback}`, which represent a JSONP callback, must be defined.
     * @param {Object} urlParams Parameters to be passed to the `urlTemplate`.
     * @param {Function} callback A function to be called in case of success.
     * @param {Function} errorCallback A function to be called in case of failure.
     * @return {Object} An object with the following properties:
     * - id: the transaction ID
     * - a `cancel()` method
     */

    CKEDITOR.tools.jsonp = function (urlTemplate, urlParams, callback, errorCallback) {
        var callbackKey = CKEDITOR.tools.getNextNumber();

        urlParams = urlParams || {};
        urlParams.callback = 'CKEDITOR._.jsonpCallbacks[' + callbackKey + ']';

        if (!CKEDITOR._.jsonpCallbacks) {
            CKEDITOR._.jsonpCallbacks = {};
        }

        CKEDITOR._.jsonpCallbacks[callbackKey] = function (response) {
            setTimeout(function () {
                cleanUp();

                callback(response);
            });
        };

        var scriptElement = new CKEDITOR.dom.element('script');
        scriptElement.setAttribute('src', urlTemplate.output(urlParams));
        scriptElement.on('error', function () {
            cleanUp();

            if (errorCallback) {
                errorCallback();
            }
        });

        function cleanUp() {
            if (scriptElement) {
                scriptElement.remove();
                delete CKEDITOR._.jsonpCallbacks[callbackKey];
                scriptElement = null;
            }
        }

        CKEDITOR.document.getBody().append(scriptElement);

        return {
            cancel: cleanUp,
            id: callbackKey
        };
    };

    /**
     * Returns a new object containing all of the properties of all the supplied
     * objects. The properties from later objects will overwrite those in earlier
     * objects.
     *
     * Passing in a single object will create a shallow copy of it.
     *
     * @static
     * @method merge
     * @param {Object} objects* One or more objects to merge.
     * @return {Object} A new merged object.
     */
    CKEDITOR.tools.merge = CKEDITOR.tools.merge || function () {
        var result = {};

        for (var i = 0; i < arguments.length; ++i) {
            var obj = arguments[i];

            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    result[key] = obj[key];
                }
            }
        }

        return result;
    };

    /**
     * Simulates event on a DOM element.
     *
     * @static
     * @method simulate
     * @param {DOMElement} element The element on which the event shoud be simualted.
     * @param {String} event The name of the event which have to be simulated.
     */
    CKEDITOR.tools.simulate = function (element, event) {
        var eventInstance = document.createEvent('Events');
        eventInstance.initEvent(event, true, false);
        element.dispatchEvent(eventInstance);
    };
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_uicore')) {
        return;
    }

    /**
     * UICore class which will handle user interactions with the editor. These interactions
     * might be triggered via mouse, keyboard or touch devices. The class fill fire an event via
     * CKEditor's event system - "editorInteraction". The UI may listen to this event and
     * execute some actions - for example to show/hide toolbars.
     *
     * By default if user presses the Esc key, 'editorInteraction' event won't be fired. However, this behaviour can be changed
     * by setting {{#crossLink "CKEDITOR.plugins.ae_uicore/allowEsc:attribute"}}{{/crossLink}} config property in editor's configuration to true.
     *
     * @class CKEDITOR.plugins.ae_uicore
     */

    /**
     * Fired when user interacts somehow with the browser. This may be clicking with the mouse, pressing keyboard button,
     * or touching screen. This even will be not fired after each interaction. It will be debounced. By default the timeout
     * is 50ms. This value can be overwritten via {{#crossLink "CKEDITOR.plugins.ae_uicore/timeout:attribute"}}{{/crossLink}}
     * property of editor's configuration, like: editor.config.uicore.timeout = 100
     *
     * @event editorInteraction
     * @param {Object} data An object which contains the following properties:
     * - nativeEvent - The event as received from CKEditor.
     * - selectionData - The data, returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
     */

    /**
     * Fired by UI elements like Toolbars or Buttons when their state changes. The listener updates the live region with the provided data.
     *
     * @event ariaUpdate
     * @param {Object} data An object which contains the following properties:
     * - message - The provided message from the UI element.
     */

    /**
     * If set to true, the editor will still fire {{#crossLink "CKEDITOR.plugins.ae_uicore/editorInteraction:event"}}{{/crossLink}} event,
     * if user presses Esc key.
     *
     * @attribute allowEsc
     * @default false
     * @type Boolean
     */

    /**
     * Specifies the default timeout after which the {{#crossLink "CKEDITOR.plugins.ae_uicore/editorInteraction:event"}}{{/crossLink}} event
     * will be fired.
     *
     * @attribute timeout
     * @default 50 (ms)
     * @type Number
     */

    CKEDITOR.plugins.add('ae_uicore', {
        /**
         * Initializer lifecycle implementation for the UICore plugin.
         *
         * @protected
         * @method init
         * @param {Object} editor The current CKEditor instance.
         */
        init: function init(editor) {
            var ariaState = [];

            var ariaElement = this._createAriaElement(editor.id);

            var uiTasksTimeout = editor.config.uicore ? editor.config.uicore.timeout : 50;

            var handleUI = CKEDITOR.tools.debounce(function (event) {
                ariaState = [];

                if (event.name !== 'keyup' || event.data.$.keyCode !== 27 || editor.config.allowEsc) {
                    var selectionData = editor.getSelectionData();

                    if (selectionData) {
                        editor.fire('editorInteraction', {
                            nativeEvent: event.data.$,
                            selectionData: selectionData
                        });
                    }
                }
            }, uiTasksTimeout);

            var handleAria = CKEDITOR.tools.debounce(function (event) {
                ariaElement.innerHTML = ariaState.join('. ');
            }, uiTasksTimeout);

            var handleMouseLeave = CKEDITOR.tools.debounce(function (event) {
                var aeUINodes = document.querySelectorAll('.ae-ui');

                var found;

                for (var i = 0; i < aeUINodes.length; i++) {
                    if (aeUINodes[i].contains(event.data.$.relatedTarget)) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    handleUI(event);
                }
            }, uiTasksTimeout);

            var handleBlur = function handleBlur(event) {
                var editable = editor.editable();

                editable.removeListener('blur', handleBlur);
                editable.removeListener('keyup', handleUI);
                editable.removeListener('mouseleave', handleMouseLeave);
                editable.removeListener('mouseup', handleUI);

                handleUI(event);
            };

            editor.on('ariaUpdate', function (event) {
                // handleAria is debounced function, so if it is being called multiple times, it will
                // be canceled until some time passes.
                // For that reason here we explicitly append the current message to the list of messages
                // and call handleAria. Since it is debounced, when some timeout passes,
                // all the messages will be applied to the live region and not only the last one.

                ariaState.push(event.data.message);

                handleAria();
            });

            editor.once('contentDom', function () {
                var editable = editor.editable();

                editable.attachListener(editable, 'focus', function (event) {
                    editable.attachListener(editable, 'blur', handleBlur);
                    editable.attachListener(editable, 'keyup', handleUI);
                    editable.attachListener(editable, 'mouseup', handleUI);
                    editable.attachListener(editable, 'mouseleave', handleMouseLeave);

                    handleUI(event);
                });
            });

            editor.on('destroy', function (event) {
                ariaElement.parentNode.removeChild(ariaElement);

                handleUI.detach();
            });
        },

        /**
         * Creates and applies an HTML element to the body of the document which will contain ARIA messages.
         *
         * @protected
         * @method _createAriaElement
         * @param {String} id The provided id of the element. It will be used as prefix for the final element Id.
         * @return {HTMLElement} The created and applied to DOM element.
         */
        _createAriaElement: function _createAriaElement(id) {
            var statusElement = document.createElement('div');

            statusElement.className = 'ae-sr-only';

            statusElement.setAttribute('aria-live', 'polite');
            statusElement.setAttribute('role', 'status');
            statusElement.setAttribute('id', id + 'LiveRegion');

            document.body.appendChild(statusElement);

            return statusElement;
        }
    });
})();
'use strict';

(function () {
    'use strict';

    var isIE = CKEDITOR.env.ie;

    if (CKEDITOR.plugins.get('ae_addimages')) {
        return;
    }

    /**
     * CKEditor plugin which allows Drag&Drop of images directly into the editable area. The image will be encoded
     * as Data URI. An event `beforeImageAdd` will be fired with the list of dropped images. If any of the listeners
     * returns `false` or cancels the event, the images won't be added to the content. Otherwise,
     * an event `imageAdd` will be fired with the inserted element into the editable area.
     *
     * @class CKEDITOR.plugins.ae_addimages
     */

    /**
     * Fired before adding images to the editor.
     * @event beforeImageAdd
     * @param {Array} imageFiles Array of image files
     */

    /**
     * Fired when an image is being added to the editor successfully.
     *
     * @event imageAdd
     * @param {CKEDITOR.dom.element} el The created image with src as Data URI
     * @param {File} file The image file
     */

    CKEDITOR.plugins.add('ae_addimages', {
        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function registers a 'dragenter', 'dragover', 'drop' and `paste` events on the editing area.
         *
         * @method init
         * @param {Object} editor The current editor instance
         */
        init: function init(editor) {
            editor.once('contentDom', function () {
                var editable = editor.editable();

                editable.attachListener(editable, 'dragenter', this._onDragEnter, this, {
                    editor: editor
                });

                editable.attachListener(editable, 'dragover', this._onDragOver, this, {
                    editor: editor
                });

                editable.attachListener(editable, 'drop', this._onDragDrop, this, {
                    editor: editor
                });

                editable.attachListener(editable, 'paste', this._onPaste, this, {
                    editor: editor
                });
            }.bind(this));
        },

        /**
         * Accepts an array of dropped files to the editor. Then, it filters the images and sends them for further
         * processing to {{#crossLink "CKEDITOR.plugins.ae_addimages/_processFile:method"}}{{/crossLink}}
         *
         * @protected
         * @method _handleFiles
         * @param {Array} files Array of dropped files. Only the images from this list will be processed.
         * @param {Object} editor The current editor instance
         */
        _handleFiles: function _handleFiles(files, editor) {
            var file;
            var i;

            var imageFiles = [];

            for (i = 0; i < files.length; i++) {
                file = files[i];

                if (file.type.indexOf('image') === 0) {
                    imageFiles.push(file);
                }
            }

            var result = editor.fire('beforeImageAdd', {
                imageFiles: imageFiles
            });

            if (!!result) {
                for (i = 0; i < files.length; i++) {
                    file = files[i];

                    this._processFile(file, editor);
                }
            }

            return false;
        },

        /**
         * Handles drag drop event. The function will create a selection from the current
         * point and will send a list of files to be processed to
         * {{#crossLink "CKEDITOR.plugins.ae_addimages/_handleFiles:method"}}{{/crossLink}} method.
         *
         * @protected
         * @method _onDragDrop
         * @param {CKEDITOR.dom.event} event dragdrop event, as received natively from CKEditor
         */
        _onDragDrop: function _onDragDrop(event) {
            var nativeEvent = event.data.$;

            new CKEDITOR.dom.event(nativeEvent).preventDefault();

            var editor = event.listenerData.editor;

            event.listenerData.editor.createSelectionFromPoint(nativeEvent.clientX, nativeEvent.clientY);

            this._handleFiles(nativeEvent.dataTransfer.files, editor);
        },

        /**
         * Handles drag enter event. In case of IE, this function will prevent the event.
         *
         * @protected
         * @method _onDragEnter
         * @param {DOM event} event dragenter event, as received natively from CKEditor
         */
        _onDragEnter: function _onDragEnter(event) {
            if (isIE) {
                this._preventEvent(event);
            }
        },

        /**
         * Handles drag over event. In case of IE, this function will prevent the event.
         *
         * @protected
         * @method _onDragOver
         * @param {DOM event} event dragover event, as received natively from CKEditor
         */
        _onDragOver: function _onDragOver(event) {
            if (isIE) {
                this._preventEvent(event);
            }
        },

        /**
         * Checks if the pasted data is image and passes it to
         * {{#crossLink "CKEDITOR.plugins.ae_addimages/_processFile:method"}}{{/crossLink}} for processing.
         *
         * @method _onPaste
         * @protected
         * @param {CKEDITOR.dom.event} event A `paste` event, as received natively from CKEditor
         */
        _onPaste: function _onPaste(event) {
            if (event.data && event.data.$ && event.data.$.clipboardData && event.data.$.clipboardData.items && event.data.$.clipboardData.items.length > 0) {
                var pastedData = event.data.$.clipboardData.items[0];

                if (pastedData.type.indexOf('image') === 0) {
                    var imageFile = pastedData.getAsFile();

                    this._processFile(imageFile, event.listenerData.editor);
                }
            }
        },

        /**
         * Prevents a native event.
         *
         * @protected
         * @method _preventEvent
         * @param {DOM event} event The event to be prevented.
         */
        _preventEvent: function _preventEvent(event) {
            event = new CKEDITOR.dom.event(event.data.$);

            event.preventDefault();
            event.stopPropagation();
        },

        /**
         * Processes an image file. The function creates an img element and sets as source
         * a Data URI, then fires an 'imageAdd' event via CKEditor's event system.
         *
         * @protected
         * @method _preventEvent
         * @param {DOM event} event The event to be prevented.
         */
        _processFile: function _processFile(file, editor) {
            var reader = new FileReader();

            reader.addEventListener('loadend', function () {
                var bin = reader.result;

                var el = CKEDITOR.dom.element.createFromHtml('<img src="' + bin + '">');

                editor.insertElement(el);

                var imageData = {
                    el: el,
                    file: file
                };

                editor.fire('imageAdd', imageData);
            });

            reader.readAsDataURL(file);
        }
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_autolink')) {
        return;
    }

    // Disables the auto URL detection feature in IE, their lacks functionality:
    // They convert the links only on space. We do on space, comma, semicolon and Enter.
    if (/MSIE ([^;]*)|Trident.*; rv:([0-9.]+)/.test(navigator.userAgent)) {
        document.execCommand('AutoUrlDetect', false, false);
    }

    var KEY_BACK = 8;

    var KEY_COMMA = 188;

    var KEY_ENTER = 13;

    var KEY_SEMICOLON = 186;

    var KEY_SPACE = 32;

    var DELIMITERS = [KEY_COMMA, KEY_ENTER, KEY_SEMICOLON, KEY_SPACE];

    var REGEX_LAST_WORD = /[^\s]+/mg;

    var REGEX_URL = /(https?\:\/\/|www\.)(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i;

    /**
     * CKEditor plugin which automatically generates links when user types text which looks like URL.
     *
     * @class CKEDITOR.plugins.ae_autolink
     * @constructor
     */
    CKEDITOR.plugins.add('ae_autolink', {

        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function registers the `keyup` event on the editing area.
         *
         * @method init
         * @param {Object} editor The current editor instance
         */
        init: function init(editor) {
            editor.once('contentDom', function () {
                var editable = editor.editable();

                editable.attachListener(editable, 'keyup', this._onKeyUp, this, {
                    editor: editor
                });
            }.bind(this));
        },

        /**
         * Retrieves the last word introduced by the user. Reads from the current
         * caret position backwards until it finds the first white space.
         *
         * @protected
         * @method _getLastWord
         * @return {String} The last word introduced by user
         */
        _getLastWord: function _getLastWord(editor) {
            var range = editor.getSelection().getRanges()[0];

            var offset = range.startOffset;

            var previousText = '';

            // The user pressed Enter, so we have to look on the previous node
            if (this._currentKeyCode === KEY_ENTER) {
                var previousNode = range.startContainer.getPrevious();

                var lastChild;

                if (previousNode) {
                    // If previous node is a SPACE, (it does not have 'getLast' method),
                    // ignore it and find the previous text node
                    while (!previousNode.getLast) {
                        previousNode = previousNode.getPrevious();
                    }

                    lastChild = previousNode.getLast();

                    // Depending on the browser, the last child node may be a <BR>
                    // (which does not have 'getText' method),
                    // so ignore it and find the previous text node
                    while (lastChild && !lastChild.getText()) {
                        lastChild = lastChild.getPrevious();
                    }
                }

                // Check if the lastChild is already a link
                if (!(lastChild && lastChild.$.href)) {
                    this._startContainer = lastChild;
                    previousText = lastChild ? lastChild.getText() : '';
                    this._offset = previousText.length;
                }
            } else {
                this._startContainer = range.startContainer;

                // Last character is the delimiter, ignore it
                previousText = this._startContainer.getText().substring(0, offset - 1);

                this._offset = offset - 1;
            }

            var lastWord = '';

            var match = previousText.match(REGEX_LAST_WORD);

            if (match) {
                lastWord = match.pop();
            }

            return lastWord;
        },

        /**
         * Checks if the given link is a valid URL.
         *
         * @protected
         * @method isValidURL
         * @param {String} link The link we want to know if it is a valid URL
         * @return {Boolean} Returns true if the link is a valid URL, false otherwise
         */
        _isValidURL: function _isValidURL(link) {
            return REGEX_URL.test(link);
        },

        /**
         * Listens to the `keydown` event and if the keycode is `Backspace`, removes the previously
         * created link.
         *
         * @protected
         * @method _onKeyDown
         * @param {EventFacade} event EventFacade object
         */
        _onKeyDown: function _onKeyDown(event) {
            var nativeEvent = event.data.$;

            var editor = event.listenerData.editor;

            var editable = editor.editable();

            editable.removeListener('keydown', this._onKeyDown);

            if (nativeEvent.keyCode === KEY_BACK) {
                event.cancel();
                event.data.preventDefault();

                this._removeLink(editor);
            }

            this._ckLink = null;
        },

        /**
         * Listens to the `Enter` and `Space` key events in order to check if the last word
         * introduced by the user should be replaced by a link element.
         *
         * @protected
         * @method _onKeyUp
         * @param {EventFacade} event EventFacade object
         */
        _onKeyUp: function _onKeyUp(event) {
            var nativeEvent = event.data.$;

            this._currentKeyCode = nativeEvent.keyCode;

            if (DELIMITERS.indexOf(this._currentKeyCode) !== -1) {
                var editor = event.listenerData.editor;

                var lastWord = this._getLastWord(editor);

                if (this._isValidURL(lastWord)) {
                    this._replaceContentByLink(editor, lastWord);
                }
            }
        },

        /**
         * Replaces content by a link element.
         *
         * @protected
         * @method _replaceContentByLink
         * @param {String} content The text that has to be replaced by an link element
         */
        _replaceContentByLink: function _replaceContentByLink(editor, content) {
            var range = editor.createRange();
            var node = CKEDITOR.dom.element.get(this._startContainer);
            var offset = this._offset;

            // Select the content, so CKEDITOR.Link can properly replace it
            range.setStart(node, offset - content.length);
            range.setEnd(node, offset);
            range.select();

            var ckLink = new CKEDITOR.Link(editor);
            ckLink.create(content);
            this._ckLink = ckLink;

            var linkNode = ckLink.getFromSelection();
            editor.fire('autolinkAdd', linkNode);

            this._subscribeToKeyEvent(editor);

            // Now range is on the link and it is selected. We have to
            // return focus to the caret position.
            range = editor.getSelection().getRanges()[0];

            // If user pressed `Enter`, get the next editable node at position 0,
            // otherwise set the cursor at the next character of the link (the white space)
            if (this._currentKeyCode === KEY_ENTER) {
                var nextEditableNode = range.getNextEditableNode();

                range.setStart(nextEditableNode, 0);
                range.setEnd(nextEditableNode, 0);
            } else {
                var nextNode = range.getNextNode();

                range.setStart(nextNode, 1);
                range.setEnd(nextNode, 1);
            }

            range.select();
        },

        /**
         * Fired when a URL is detected in text and converted to a link.
         *
         * @event autolinkAdd
         * @param {CKEDITOR.dom.element} el Node of the created link.
         */

        /**
         * Removes the created link element, and replaces it by its text.
         *
         * @protected
         * @method _removeLink
         */
        _removeLink: function _removeLink(editor) {
            var range = editor.getSelection().getRanges()[0];
            var caretOffset = range.startOffset;

            // Select the link, so CKEDITOR.Link can properly remove it
            var linkNode = this._startContainer.getNext() || this._startContainer;

            var newRange = editor.createRange();
            newRange.setStart(linkNode, 0);
            newRange.setEndAfter(linkNode);
            newRange.select();

            this._ckLink.remove();

            // Return focus to the caret position
            range.setEnd(range.startContainer, caretOffset);
            range.setStart(range.startContainer, caretOffset);

            range.select();
        },

        /**
         * Subscribe to a key event of the editable aria.
         *
         * @protected
         * @method _subscribeToKeyEvent
         */
        _subscribeToKeyEvent: function _subscribeToKeyEvent(editor) {
            var editable = editor.editable();

            // Change the priority of keydown listener - 1 means the highest priority.
            // In Chrome on pressing `Enter` the listener is not being invoked.
            // See http://dev.ckeditor.com/ticket/11861 for more information.
            editable.attachListener(editable, 'keydown', this._onKeyDown, this, {
                editor: editor
            }, 1);
        }
    });
})();
'use strict';

(function () {
  'use strict';

  if (CKEDITOR.plugins.get('ae_autolist')) {
    return;
  }

  var KEY_BACK = 8;

  var KEY_SPACE = 32;

  var DEFAULT_CONFIG = [{
    regex: /^\*$/,
    type: 'bulletedlist'
  }, {
    regex: /^1\.$/,
    type: 'numberedlist'
  }];

  /**
      * CKEditor plugin which automatically generates ordered/unordered list when user types text which looks like a list.
      *
      * @class CKEDITOR.plugins.ae_autolist
      * @constructor
      */
  CKEDITOR.plugins.add('ae_autolist', {

    /**
    * Initialization of the plugin, part of CKeditor plugin lifecycle.
    * The function registers the `keydown` event on the content editing area.
    *
    * @method init
    * @param {Object} editor The current editor instance
    */
    init: function init(editor) {
      editor.once('contentDom', function () {
        var editable = editor.editable();

        editable.attachListener(editable, 'keydown', this._onKeyDown, this, {
          editor: editor
        });
      }.bind(this));
    },

    /**
    * Checks for pressing the `Backspace` key in order to undo the list creation.
    *
    * @protected
    * @method _checkForBackspaceAndUndo
    * @param {Event} event Event object
    */
    _checkForBackspaceAndUndo: function _checkForBackspaceAndUndo(event) {
      var editor = event.listenerData.editor;

      var nativeEvent = event.data.$;

      var editable = editor.editable();

      editable.removeListener('keydown', this._checkForBackspaceAndUndo);

      if (nativeEvent.keyCode === KEY_BACK) {
        editor.execCommand('undo');
        editor.insertHtml(event.listenerData.bullet + '&nbsp;');
        event.data.preventDefault();
      }
    },

    /**
    * Checks current line to find match with MATCHES object to create OL or UL.
    *
    * @protected
    * @method _checkLine
    * @param {editor} Editor object
    * @return {Object|null} Returns an object which contains the detected list config if any
    */
    _getListConfig: function _getListConfig(editor) {
      var configRegex = editor.config.autolist || DEFAULT_CONFIG;

      var range = editor.getSelection().getRanges()[0];

      var textContainer = range.endContainer.getText();

      var bullet = textContainer.substring(0, range.startOffset);

      var text = textContainer.substring(range.startOffset, textContainer.length);

      var index = 0;

      var regexLen = configRegex.length;

      var autolistCfg = null;

      while (!autolistCfg && regexLen > index) {
        var regexItem = configRegex[index];

        if (regexItem.regex.test(bullet)) {
          autolistCfg = {
            bullet: bullet,
            editor: editor,
            text: text,
            type: regexItem.type
          };

          break;
        }

        index++;
      }

      return autolistCfg;
    },

    /**
    * Create list with different types: Bulleted or Numbered list
    *
    * @protected
    * @method _createList
    * @param {Object} listConfig Object that contains bullet, text and type for creating the list
    */
    _createList: function _createList(listConfig) {
      var editor = listConfig.editor;

      var range = editor.getSelection().getRanges()[0];

      range.endContainer.setText(listConfig.text);
      editor.execCommand(listConfig.type);

      var editable = editor.editable();

      // Subscribe to keydown in order to check if the next key press is `Backspace`.
      // If so, the creation of the list will be discarded.
      editable.attachListener(editable, 'keydown', this._checkForBackspaceAndUndo, this, {
        editor: editor,
        bullet: listConfig.bullet
      }, 1);
    },

    /**
              * Listens to the `Space` key events to check if the last word
              * introduced by the user should be replaced by a list (OL or UL)
              *
              * @protected
              * @method _onKeyDown
              * @param {Event} event Event object
              */
    _onKeyDown: function _onKeyDown(event) {
      var nativeEvent = event.data.$;

      if (nativeEvent.keyCode === KEY_SPACE) {
        var listConfig = this._getListConfig(event.listenerData.editor);

        if (listConfig) {
          event.data.preventDefault();
          this._createList(listConfig);
        }
      }
    }
  });
})();
'use strict';

/**
 * CKEditor plugin: Dragable image resizing
 * https://github.com/sstur/ck-dragresize
 * - Shows semi-transparent overlay while resizing
 * - Enforces Aspect Ratio (unless holding shift)
 * - Snap to size of other images in editor
 * - Escape while dragging cancels resize
 */
(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_dragresize')) {
        return;
    }

    var IMAGE_SNAP_TO_SIZE = 7;

    var isWebkit = 'WebkitAppearance' in document.documentElement.style;

    if (isWebkit) {
        // CSS is added in a compressed form
        CKEDITOR.addCss('img::selection{color:rgba(0,0,0,0)}img.ckimgrsz{outline:1px dashed #000}#ckimgrsz{position:absolute;width:0;height:0;cursor:default;z-index:10001}#ckimgrsz span{display:none;position:absolute;top:0;left:0;width:0;height:0;background-size:100% 100%;opacity:.65;outline:1px dashed #000}#ckimgrsz i{position:absolute;display:block;width:5px;height:5px;background:#fff;border:1px solid #000}#ckimgrsz i.active,#ckimgrsz i:hover{background:#000}#ckimgrsz i.br,#ckimgrsz i.tl{cursor:nwse-resize}#ckimgrsz i.bm,#ckimgrsz i.tm{cursor:ns-resize}#ckimgrsz i.bl,#ckimgrsz i.tr{cursor:nesw-resize}#ckimgrsz i.lm,#ckimgrsz i.rm{cursor:ew-resize}body.dragging-br,body.dragging-br *,body.dragging-tl,body.dragging-tl *{cursor:nwse-resize!important}body.dragging-bm,body.dragging-bm *,body.dragging-tm,body.dragging-tm *{cursor:ns-resize!important}body.dragging-bl,body.dragging-bl *,body.dragging-tr,body.dragging-tr *{cursor:nesw-resize!important}body.dragging-lm,body.dragging-lm *,body.dragging-rm,body.dragging-rm *{cursor:ew-resize!important}');
    }

    /**
     * Initializes the plugin
     */
    CKEDITOR.plugins.add('ae_dragresize', {
        onLoad: function onLoad() {
            if (!isWebkit) {
                return;
            }
        },
        init: function init(editor) {
            if (!isWebkit) {
                return;
            }

            editor.once('contentDom', function (evt) {
                _init(editor);
            });
        }
    });

    function _init(editor) {
        var window = editor.window.$,
            document = editor.document.$;
        var snapToSize = typeof IMAGE_SNAP_TO_SIZE === 'undefined' ? null : IMAGE_SNAP_TO_SIZE;

        var resizer = new Resizer(editor, {
            snapToSize: snapToSize
        });

        document.addEventListener('mousedown', function (e) {
            if (resizer.isHandle(e.target)) {
                resizer.initDrag(e);
            }
        }, false);

        function selectionChange() {
            var selection = editor.getSelection();

            if (!selection) return;
            // If an element is selected and that element is an IMG
            if (selection.getType() !== CKEDITOR.SELECTION_NONE && selection.getStartElement().is('img')) {
                // And we're not right or middle clicking on the image
                if (!window.event || !window.event.button || window.event.button === 0) {
                    resizer.show(selection.getStartElement().$);
                }
            } else {
                resizer.hide();
            }
        }

        editor.on('selectionChange', selectionChange);

        editor.on('getData', function (e) {
            var html = e.data.dataValue || '';
            html = html.replace(/<div id="ckimgrsz"([\s\S]*?)<\/div>/i, '');
            html = html.replace(/\b(ckimgrsz)\b/g, '');
            e.data.dataValue = html;
        });

        editor.on('beforeUndoImage', function () {
            // Remove the handles before undo images are saved
            resizer.hide();
        });

        editor.on('afterUndoImage', function () {
            // Restore the handles after undo images are saved
            selectionChange();
        });

        editor.on('blur', function () {
            // Remove the handles when editor loses focus
            resizer.hide();
        });

        editor.on('beforeModeUnload', function self() {
            editor.removeListener('beforeModeUnload', self);
            resizer.hide();
        });

        editor.on('destroy', function () {
            var resizeElement = document.getElementById('ckimgrsz');

            if (resizeElement) {
                resizeElement.remove();
            }
        });

        // Update the selection when the browser window is resized
        var resizeTimeout;
        editor.window.on('resize', function () {
            // Cancel any resize waiting to happen
            clearTimeout(resizeTimeout);
            // Delay resize to "debounce"
            resizeTimeout = setTimeout(selectionChange, 50);
        });
    }

    function Resizer(editor, cfg) {
        this.editor = editor;
        this.window = editor.window.$;
        this.document = editor.document.$;
        this.cfg = cfg || {};
        this.init();
    }

    Resizer.prototype = {
        init: function init() {
            var container = this.container = this.document.createElement('div');
            container.id = 'ckimgrsz';
            this.preview = this.document.createElement('span');
            container.appendChild(this.preview);
            var handles = this.handles = {
                tl: this.createHandle('tl'),
                tm: this.createHandle('tm'),
                tr: this.createHandle('tr'),
                lm: this.createHandle('lm'),
                rm: this.createHandle('rm'),
                bl: this.createHandle('bl'),
                bm: this.createHandle('bm'),
                br: this.createHandle('br')
            };
            for (var n in handles) {
                container.appendChild(handles[n]);
            }
        },
        createHandle: function createHandle(name) {
            var el = this.document.createElement('i');
            el.classList.add(name);
            return el;
        },
        isHandle: function isHandle(el) {
            var handles = this.handles;
            for (var n in handles) {
                if (handles[n] === el) {
                    return true;
                }
            }
            return false;
        },
        show: function show(el) {
            this.el = el;
            if (this.cfg.snapToSize) {
                this.otherImages = toArray(this.document.getElementsByTagName('img'));
                this.otherImages.splice(this.otherImages.indexOf(el), 1);
            }
            var box = this.box = getBoundingBox(this.window, el);
            positionElement(this.container, box.left, box.top);
            this.document.body.appendChild(this.container);
            this.el.classList.add('ckimgrsz');
            this.showHandles();
        },
        hide: function hide() {
            // Remove class from all img.ckimgrsz
            var elements = this.document.getElementsByClassName('ckimgrsz');
            for (var i = 0; i < elements.length; ++i) {
                elements[i].classList.remove('ckimgrsz');
            }
            this.hideHandles();
            if (this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
        },
        initDrag: function initDrag(e) {
            if (e.button !== 0) {
                //right-click or middle-click
                return;
            }
            var resizer = this;
            var drag = new DragEvent(this.window, this.document);
            drag.onStart = function () {
                resizer.showPreview();
                resizer.isDragging = true;
                resizer.editor.getSelection().lock();
            };
            drag.onDrag = function () {
                resizer.calculateSize(this);
                resizer.updatePreview();
                var box = resizer.previewBox;
                resizer.updateHandles(box, box.left, box.top);
            };
            drag.onRelease = function () {
                resizer.isDragging = false;
                resizer.hidePreview();
                resizer.hide();
                resizer.editor.getSelection().unlock();
                // Save an undo snapshot before the image is permanently changed
                resizer.editor.fire('saveSnapshot');
            };
            drag.onComplete = function () {
                resizer.resizeComplete();
                // Save another snapshot after the image is changed
                resizer.editor.fire('saveSnapshot');
            };
            drag.start(e);
        },
        updateHandles: function updateHandles(box, left, top) {
            left = left || 0;
            top = top || 0;
            var handles = this.handles;
            positionElement(handles.tl, -3 + left, -3 + top);
            positionElement(handles.tm, Math.round(box.width / 2) - 3 + left, -3 + top);
            positionElement(handles.tr, box.width - 4 + left, -3 + top);
            positionElement(handles.lm, -3 + left, Math.round(box.height / 2) - 3 + top);
            positionElement(handles.rm, box.width - 4 + left, Math.round(box.height / 2) - 3 + top);
            positionElement(handles.bl, -3 + left, box.height - 4 + top);
            positionElement(handles.bm, Math.round(box.width / 2) - 3 + left, box.height - 4 + top);
            positionElement(handles.br, box.width - 4 + left, box.height - 4 + top);
        },
        showHandles: function showHandles() {
            var handles = this.handles;
            this.updateHandles(this.box);
            for (var n in handles) {
                handles[n].style.display = 'block';
            }
        },
        hideHandles: function hideHandles() {
            var handles = this.handles;
            for (var n in handles) {
                handles[n].style.display = 'none';
            }
        },
        showPreview: function showPreview() {
            this.preview.style.backgroundImage = 'url("' + this.el.src + '")';
            this.calculateSize();
            this.updatePreview();
            this.preview.style.display = 'block';
        },
        updatePreview: function updatePreview() {
            var box = this.previewBox;
            positionElement(this.preview, box.left, box.top);
            resizeElement(this.preview, box.width, box.height);
        },
        hidePreview: function hidePreview() {
            var box = getBoundingBox(this.window, this.preview);
            this.result = {
                width: box.width,
                height: box.height
            };
            this.preview.style.display = 'none';
        },
        calculateSize: function calculateSize(data) {
            var box = this.previewBox = {
                top: 0,
                left: 0,
                width: this.box.width,
                height: this.box.height
            };
            if (!data) return;
            var attr = data.target.className;
            if (~attr.indexOf('r')) {
                box.width = Math.max(32, this.box.width + data.delta.x);
            }
            if (~attr.indexOf('b')) {
                box.height = Math.max(32, this.box.height + data.delta.y);
            }
            if (~attr.indexOf('l')) {
                box.width = Math.max(32, this.box.width - data.delta.x);
            }
            if (~attr.indexOf('t')) {
                box.height = Math.max(32, this.box.height - data.delta.y);
            }
            //if dragging corner, enforce aspect ratio (unless shift key is being held)
            if (attr.indexOf('m') < 0 && !data.keys.shift) {
                var ratio = this.box.width / this.box.height;
                if (box.width / box.height > ratio) {
                    box.height = Math.round(box.width / ratio);
                } else {
                    box.width = Math.round(box.height * ratio);
                }
            }
            var snapToSize = this.cfg.snapToSize;
            if (snapToSize) {
                var others = this.otherImages;
                for (var i = 0; i < others.length; i++) {
                    var other = getBoundingBox(this.window, others[i]);
                    if (Math.abs(box.width - other.width) <= snapToSize && Math.abs(box.height - other.height) <= snapToSize) {
                        box.width = other.width;
                        box.height = other.height;
                        break;
                    }
                }
            }
            //recalculate left or top position
            if (~attr.indexOf('l')) {
                box.left = this.box.width - box.width;
            }
            if (~attr.indexOf('t')) {
                box.top = this.box.height - box.height;
            }
        },
        resizeComplete: function resizeComplete() {
            resizeElement(this.el, this.result.width, this.result.height);
        }
    };

    function DragEvent(window, document) {
        this.window = window;
        this.document = document;
        this.events = {
            mousemove: bind(this.mousemove, this),
            keydown: bind(this.keydown, this),
            mouseup: bind(this.mouseup, this)
        };
    }

    DragEvent.prototype = {
        start: function start(e) {
            e.preventDefault();
            e.stopPropagation();
            this.target = e.target;
            this.attr = e.target.className;
            this.startPos = {
                x: e.clientX,
                y: e.clientY
            };
            this.update(e);
            var events = this.events;
            this.document.addEventListener('mousemove', events.mousemove, false);
            this.document.addEventListener('keydown', events.keydown, false);
            this.document.addEventListener('mouseup', events.mouseup, false);
            this.document.body.classList.add('dragging-' + this.attr);
            this.onStart && this.onStart();
        },
        update: function update(e) {
            this.currentPos = {
                x: e.clientX,
                y: e.clientY
            };
            this.delta = {
                x: e.clientX - this.startPos.x,
                y: e.clientY - this.startPos.y
            };
            this.keys = {
                shift: e.shiftKey,
                ctrl: e.ctrlKey,
                alt: e.altKey
            };
        },
        mousemove: function mousemove(e) {
            this.update(e);
            this.onDrag && this.onDrag();
            if (e.which === 0) {
                //mouse button released outside window; mouseup wasn't fired (Chrome)
                this.mouseup(e);
            }
        },
        keydown: function keydown(e) {
            //escape key cancels dragging
            if (e.keyCode === 27) {
                this.release();
            }
        },
        mouseup: function mouseup(e) {
            this.update(e);
            this.release();
            this.onComplete && this.onComplete();
        },
        release: function release() {
            this.document.body.classList.remove('dragging-' + this.attr);
            var events = this.events;
            this.document.removeEventListener('mousemove', events.mousemove, false);
            this.document.removeEventListener('keydown', events.keydown, false);
            this.document.removeEventListener('mouseup', events.mouseup, false);
            this.onRelease && this.onRelease();
        }
    };

    //helper functions
    function toArray(obj) {
        var len = obj.length,
            arr = new Array(len);
        for (var i = 0; i < len; i++) {
            arr[i] = obj[i];
        }
        return arr;
    }

    function bind(fn, ctx) {
        if (fn.bind) {
            return fn.bind(ctx);
        }
        return function () {
            fn.apply(ctx, arguments);
        };
    }

    function positionElement(el, left, top) {
        el.style.left = String(left) + 'px';
        el.style.top = String(top) + 'px';
    }

    function resizeElement(el, width, height) {
        el.style.width = String(width) + 'px';
        el.style.height = String(height) + 'px';
    }

    function getBoundingBox(window, el) {
        var rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.pageXOffset,
            top: rect.top + window.pageYOffset,
            width: rect.width,
            height: rect.height
        };
    }
})();
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_embed')) {
        return;
    }

    var REGEX_HTTP = /^https?/;

    CKEDITOR.DEFAULT_AE_EMBED_URL_TPL = '//alloy.iframe.ly/api/oembed?url={url}&callback={callback}';
    CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL = '<div data-ae-embed-url="{url}"></div>';

    /**
     * CKEditor plugin which adds the infrastructure to embed urls as media objects using an oembed
     * service. By default, and for demoing purposes only, the oembed service is hosted in iframe.ly
     * at //alloy.iframe.ly/api/oembed?url={url}&callback={callback}. Note this should be changed to
     * a self-hosted or paid service in production environments. Access to the alloy.iframe.ly endpoint
     * may be restricted per domain due to significant traffic.
     *
     * This plugin adds an `embedUrl` command that can be used to easily embed a URL and transform it
     * to an embedded content.
     *
     * @class CKEDITOR.plugins.ae_embed
     */
    CKEDITOR.plugins.add('ae_embed', {
        requires: 'widget',
        init: function init(editor) {
            var AE_EMBED_URL_TPL = new CKEDITOR.template(editor.config.embedUrlTemplate || CKEDITOR.DEFAULT_AE_EMBED_URL_TPL);
            var AE_EMBED_WIDGET_TPL = new CKEDITOR.template(editor.config.embedWidgetTpl || CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL);

            // Default function to upcast DOM elements to embed widgets.
            // It matches CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL
            var defaultEmbedWidgetUpcastFn = function defaultEmbedWidgetUpcastFn(element, data) {
                if (element.name === 'div' && element.attributes['data-ae-embed-url']) {
                    data.url = element.attributes['data-ae-embed-url'];

                    return true;
                }
            };

            // Create a embedUrl command that can be invoked to easily embed media URLs
            editor.addCommand('embedUrl', {
                exec: function exec(editor, data) {
                    editor.insertHtml(AE_EMBED_WIDGET_TPL.output({
                        url: data.url
                    }));
                }
            });

            // Create a widget to properly handle embed operations
            editor.widgets.add('ae_embed', {
                allowedContent: 'div[!data-ae-embed-url]',
                mask: true,
                requiredContent: 'div[data-ae-embed-url]',

                /**
                 * Listener to be executed every time the widget's data changes. It takes care of
                 * requesting the embed object to the configured oembed service and render it in
                 * the editor
                 *
                 * @method data
                 * @param {event} event Data change event
                 */
                data: function data(event) {
                    var widget = this;
                    var url = event.data.url;

                    if (url) {
                        CKEDITOR.tools.jsonp(AE_EMBED_URL_TPL, {
                            url: encodeURIComponent(url)
                        }, function (response) {
                            if (response.html) {
                                widget.element.setHtml(response.html);
                            } else {
                                widget.element.setHtml(url);
                            }
                        }, function (msg) {
                            widget.element.setHtml(url);
                        });
                    }
                },

                /**
                 * Function used to upcast an element to ae_embed widgets.
                 *
                 * @method upcast
                 * @param {CKEDITOR.htmlParser.element} element The element to be checked
                 * @param {Object} data The object that will be passed to the widget
                 */
                upcast: function upcast(element, data) {
                    var embedWidgetUpcastFn = editor.config.embedWidgetUpcastFn || defaultEmbedWidgetUpcastFn;

                    return embedWidgetUpcastFn(element, data);
                }
            });

            // Add a listener to handle paste events and turn links into embed objects
            editor.once('contentDom', function () {
                editor.on('paste', function (event) {
                    var link = event.data.dataValue;

                    if (REGEX_HTTP.test(link)) {
                        event.stop();

                        editor.execCommand('embedUrl', {
                            url: event.data.dataValue
                        });
                    }
                });
            });

            // Add a listener to handle selection change events and properly detect editor
            // interactions on the widgets without messing with widget native selection
            editor.on('selectionChange', function (event) {
                var selection = editor.getSelection();

                if (selection) {
                    var element = selection.getSelectedElement();

                    if (element) {
                        var widgetElement = element.findOne('[data-widget="ae_embed"]');

                        if (widgetElement) {
                            var region = element.getClientRect();

                            var scrollPosition = new CKEDITOR.dom.window(window).getScrollPosition();
                            region.left -= scrollPosition.x;
                            region.top += scrollPosition.y;

                            region.direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;

                            editor.fire('editorInteraction', {
                                nativeEvent: {},
                                selectionData: {
                                    element: widgetElement,
                                    region: region
                                }
                            });
                        }
                    }
                }
            });

            // Add a filter to skip filtering widget elements
            editor.filter.addElementCallback(function (element) {
                if ('data-ae-embed-url' in element.attributes) {
                    return CKEDITOR.FILTER_SKIP_TREE;
                }
            });
        }
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_imagealignment')) {
        return;
    }

    /**
     * Enum for supported image alignments
     * @type {Object}
     */
    var IMAGE_ALIGNMENT = {
        CENTER: 'center',
        LEFT: 'left',
        RIGHT: 'right'
    };

    /**
     * Enum values for supported image alignments
     * @type {Array}
     */
    var ALIGN_VALUES = [IMAGE_ALIGNMENT.LEFT, IMAGE_ALIGNMENT.RIGHT, IMAGE_ALIGNMENT.CENTER];

    /**
     * Necessary styles for the center alignment
     * @type {Array.<Object>}
     */
    var CENTERED_IMAGE_STYLE = [{
        name: 'display',
        value: 'block'
    }, {
        name: 'margin-left',
        value: '50%'
    }, {
        name: 'transform',
        value: 'translateX(-50%)',
        vendorPrefixes: ['-ms-']
    }];

    /**
     * Retrieves the alignment value of an image.
     *
     * @param {CKEDITOR.dom.element} image The image element
     * @return {String} The alignment value
     */
    var getImageAlignment = function getImageAlignment(image) {
        var imageAlignment = image.getStyle('float');

        if (!imageAlignment || imageAlignment === 'inherit' || imageAlignment === 'none') {
            imageAlignment = image.getAttribute('align');
        }

        if (!imageAlignment) {
            var centeredImage = CENTERED_IMAGE_STYLE.every(function (style) {
                var styleCheck = image.getStyle(style.name) === style.value;

                if (!styleCheck && style.vendorPrefixes) {
                    styleCheck = style.vendorPrefixes.some(function (vendorPrefix) {
                        return image.getStyle(vendorPrefix + style.name) === style.value;
                    });
                }

                return styleCheck;
            });

            imageAlignment = centeredImage ? IMAGE_ALIGNMENT.CENTER : null;
        }

        return imageAlignment;
    };

    /**
     * Removes the alignment value of an image
     *
     * @param {CKEDITOR.dom.element} image The image element
     * @param {String} imageAlignment The image alignment value to be removed
     */
    var removeImageAlignment = function removeImageAlignment(image, imageAlignment) {
        if (imageAlignment === IMAGE_ALIGNMENT.LEFT || imageAlignment === IMAGE_ALIGNMENT.RIGHT) {
            image.removeStyle('float');

            if (imageAlignment === getImageAlignment(image)) {
                image.removeAttribute('align');
            }
        } else if (imageAlignment === IMAGE_ALIGNMENT.CENTER) {
            CENTERED_IMAGE_STYLE.forEach(function (style) {
                image.removeStyle(style.name);

                if (style.vendorPrefixes) {
                    style.vendorPrefixes.forEach(function (vendorPrefix) {
                        image.removeStyle(vendorPrefix + style.name);
                    });
                }
            });
        }
    };

    /**
     * Sets the alignment value of an image
     *
     * @param {CKEDITOR.dom.element} image The image element
     * @param {String} imageAlignment The image alignment value to be set
     */
    var setImageAlignment = function setImageAlignment(image, imageAlignment) {
        removeImageAlignment(image, getImageAlignment(image));

        if (imageAlignment === IMAGE_ALIGNMENT.LEFT || imageAlignment === IMAGE_ALIGNMENT.RIGHT) {
            image.setStyle('float', imageAlignment);
        } else if (imageAlignment === IMAGE_ALIGNMENT.CENTER) {
            CENTERED_IMAGE_STYLE.forEach(function (style) {
                image.setStyle(style.name, style.value);

                if (style.vendorPrefixes) {
                    style.vendorPrefixes.forEach(function (vendorPrefix) {
                        image.setStyle(vendorPrefix + style.name, style.value);
                    });
                }
            });
        }
    };

    /**
     * CKEditor plugin which modifies the justify commands to properly align images. This
     * plugin is an excerpt of CKEditor's original image one that can be found at
     * https://github.com/ckeditor/ckeditor-dev/blob/master/plugins/image/plugin.js
     *
     * @class CKEDITOR.plugins.ae_imagealignment
     */
    CKEDITOR.plugins.add('ae_imagealignment', {
        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function registers a 'paste' event on the editing area.
         *
         * @method afterInit
         * @param {Object} editor The current editor instance
         */
        afterInit: function afterInit(editor) {
            var self = this;

            ALIGN_VALUES.forEach(function (value) {
                var command = editor.getCommand('justify' + value);

                if (command) {
                    command.on('exec', function (event) {
                        var selectionData = editor.getSelectionData();

                        if (selectionData && AlloyEditor.SelectionTest.image({ data: { selectionData: selectionData } })) {
                            var image = selectionData.element;

                            var imageAlignment = getImageAlignment(image);

                            if (imageAlignment === value) {
                                removeImageAlignment(image, value);
                            } else {
                                setImageAlignment(image, value);
                            }

                            event.cancel();

                            self.refreshCommands(editor, new CKEDITOR.dom.elementPath(image));
                        }
                    });

                    command.on('refresh', function (event) {
                        var selectionData = editor.getSelectionData();

                        if (selectionData && AlloyEditor.SelectionTest.image({ data: { selectionData: selectionData } })) {
                            var imageAlignment = getImageAlignment(selectionData.element);

                            this.setState(imageAlignment === value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);

                            event.cancel();
                        }
                    });
                }
            });
        },

        /**
         * Forces a refresh of the modified justify commands. This is needed because the applied changes
         * do not modify the selection, so the refresh is never triggered and the UI does not update
         * properly until the next selectionChange event.
         *
         * @param {CKEDITOR.editor} editor The editor instance
         * @param {CKEDITOR.dom.elementPath} elementPath The path of the selected image
         */
        refreshCommands: function refreshCommands(editor, elementPath) {
            ALIGN_VALUES.forEach(function (value) {
                var command = editor.getCommand('justify' + value);

                if (command) {
                    command.refresh(editor, elementPath);
                }
            });
        }
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_pasteimages')) {
        return;
    }

    /**
     * CKEditor plugin which allows pasting images directly into the editable area. The image will be encoded
     * as Data URI. An event `beforeImageAdd` will be fired with the list of pasted images. If any of the listeners
     * returns `false` or cancels the event, the images won't be added to the content. Otherwise,
     * an event `imageAdd` will be fired with the inserted element into the editable area.
     *
     * @class CKEDITOR.plugins.ae_pasteimages
     */

    /**
     * Fired before adding images to the editor.
     * @event beforeImageAdd
     * @param {Array} imageFiles Array of image files
     */

    /**
     * Fired when an image is being added to the editor successfully.
     *
     * @event imageAdd
     * @param {CKEDITOR.dom.element} el The created image with src as Data URI
     * @param {File} file The image file
     */

    CKEDITOR.plugins.add('ae_pasteimages', {
        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function registers a 'paste' event on the editing area.
         *
         * @method init
         * @param {Object} editor The current editor instance
         */
        init: function init(editor) {
            editor.once('contentDom', function () {
                var editable = editor.editable();

                editable.attachListener(editable, 'paste', this._onPaste, this, {
                    editor: editor
                });
            }.bind(this));
        },

        /**
         * The function creates an img element with src the image data as Data URI.
         * Then, it fires an 'imageAdd' event via CKEditor's event system. The passed
         * params will be:
         * - `el` - the created img element
         * - `file` - the original pasted data
         *
         * @method _onPaste
         * @protected
         * @param {CKEDITOR.dom.event} event A `paste` event, as received natively from CKEditor
         */
        _onPaste: function _onPaste(event) {
            if (event.data.$.clipboardData) {
                var pastedData = event.data.$.clipboardData.items[0];
                var editor = event.listenerData.editor;

                if (pastedData.type.indexOf('image') === 0) {
                    var reader = new FileReader();
                    var imageFile = pastedData.getAsFile();

                    reader.onload = function (event) {
                        var result = editor.fire('beforeImageAdd', {
                            imageFiles: imageFile
                        });

                        if (!!result) {
                            var el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');

                            editor.insertElement(el);

                            var imageData = {
                                el: el,
                                file: imageFile
                            };

                            editor.fire('imageAdd', imageData);
                        }
                    }.bind(this);

                    reader.readAsDataURL(imageFile);
                }
            }
        }
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_placeholder')) {
        return;
    }

    /**
     * CKEditor plugin which allows adding a placeholder to the editor. In this case, if there
     * is no content to the editor, there will be hint to the user.
     *
     * @class CKEDITOR.plugins.ae_placeholder
     */

    /**
     * Specifies the placeholder class which have to be aded to editor when editor is not focuced.
     *
     * @attribute placeholderClass
     * @default ae_placeholder
     * @type String
     */

    CKEDITOR.plugins.add('ae_placeholder', {

        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function registers a 'blur' and 'contentDom' event listeners.
         *
         * @method init
         * @param {Object} editor The current editor instance
         */
        init: function init(editor) {
            editor.on('blur', this._checkEmptyData, this);
            editor.once('contentDom', this._checkEmptyData, this);
        },

        /**
         * Removes any data from the content and adds a class,
         * specified by the "placeholderClass" config attribute.
         *
         * @protected
         * @method _checkEmptyData
         * @param {CKEDITOR.dom.event} editor event, fired from CKEditor
         */
        _checkEmptyData: function _checkEmptyData(event) {
            var editor = event.editor;

            if (editor.getData() === '') {
                var editorNode = new CKEDITOR.dom.element(editor.element.$);

                // Despite getData() returns empty string, the content still may have
                // data - an empty paragraph. This breaks the :empty selector in
                // placeholder's CSS and placeholder does not appear.
                // For that reason, we will intentionally remove any content from editorNode.
                editorNode.setHtml('');

                editorNode.addClass(editor.config.placeholderClass);
            }
        }
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_selectionkeystrokes')) {
        return;
    }

    /**
     * CKEditor plugin that simulates editor interaction events based on manual keystrokes. This
     * can be used to trigger different reactions in the editor.
     *
     * @class CKEDITOR.plugins.ae_selectionkeystrokes
     */
    CKEDITOR.plugins.add('ae_selectionkeystrokes', {
        requires: 'ae_selectionregion',

        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function adds a command to the editor for every defined selectionKeystroke
         * in the configuration and maps it to the specified keystroke.
         *
         * @method init
         * @param {Object} editor The current editor instance
         */
        init: function init(editor) {
            if (editor.config.selectionKeystrokes) {
                editor.config.selectionKeystrokes.forEach(function (selectionKeystroke) {
                    var command = new CKEDITOR.command(editor, {
                        exec: function exec(editor) {
                            editor.fire('editorInteraction', {
                                manualSelection: selectionKeystroke.selection,
                                nativeEvent: {},
                                selectionData: editor.getSelectionData()
                            });
                        }
                    });

                    var commandName = 'selectionKeystroke' + selectionKeystroke.selection;

                    editor.addCommand(commandName, command);
                    editor.setKeystroke(selectionKeystroke.keys, commandName);
                });
            }
        }
    });
})();
'use strict';

/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_tableresize')) {
        return;
    }

    var pxUnit = CKEDITOR.tools.cssLength;

    function getWidth(el) {
        return CKEDITOR.env.ie ? el.$.clientWidth : parseInt(el.getComputedStyle('width'), 10);
    }

    function getBorderWidth(element, side) {
        var computed = element.getComputedStyle('border-' + side + '-width'),
            borderMap = {
            thin: '0px',
            medium: '1px',
            thick: '2px'
        };

        if (computed.indexOf('px') < 0) {
            // look up keywords
            if (computed in borderMap && element.getComputedStyle('border-style') != 'none') {
                computed = borderMap[computed];
            } else {
                computed = 0;
            }
        }

        return parseInt(computed, 10);
    }

    // Gets the table row that contains the most columns.
    function getMasterPillarRow(table) {
        var $rows = table.$.rows,
            maxCells = 0,
            cellsCount,
            $elected,
            $tr;

        for (var i = 0, len = $rows.length; i < len; i++) {
            $tr = $rows[i];
            cellsCount = $tr.cells.length;

            if (cellsCount > maxCells) {
                maxCells = cellsCount;
                $elected = $tr;
            }
        }

        return $elected;
    }

    function buildTableColumnPillars(table) {
        var pillars = [],
            pillarIndex = -1,
            rtl = table.getComputedStyle('direction') === 'rtl';

        // Get the raw row element that cointains the most columns.
        var $tr = getMasterPillarRow(table);

        // Get the tbody element and position, which will be used to set the
        // top and bottom boundaries.
        var tbody = new CKEDITOR.dom.element(table.$.tBodies[0]),
            tbodyPosition = tbody.getDocumentPosition();

        // Loop thorugh all cells, building pillars after each one of them.
        for (var i = 0, len = $tr.cells.length; i < len; i++) {
            // Both the current cell and the successive one will be used in the
            // pillar size calculation.
            var td = new CKEDITOR.dom.element($tr.cells[i]),
                nextTd = $tr.cells[i + 1] && new CKEDITOR.dom.element($tr.cells[i + 1]);

            pillarIndex += td.$.colSpan || 1;

            // Calculate the pillar boundary positions.
            var pillarLeft, pillarRight, pillarWidth;

            var x = td.getDocumentPosition().x;

            // Calculate positions based on the current cell.
            rtl ? pillarRight = x + getBorderWidth(td, 'left') : pillarLeft = x + td.$.offsetWidth - getBorderWidth(td, 'right');

            // Calculate positions based on the next cell, if available.
            if (nextTd) {
                x = nextTd.getDocumentPosition().x;

                rtl ? pillarLeft = x + nextTd.$.offsetWidth - getBorderWidth(nextTd, 'right') : pillarRight = x + getBorderWidth(nextTd, 'left');
            }
            // Otherwise calculate positions based on the table (for last cell).
            else {
                    x = table.getDocumentPosition().x;

                    rtl ? pillarLeft = x : pillarRight = x + table.$.offsetWidth;
                }

            pillarWidth = Math.max(pillarRight - pillarLeft, 4);

            // The pillar should reflects exactly the shape of the hovered
            // column border line.
            pillars.push({
                table: table,
                index: pillarIndex,
                x: pillarLeft,
                y: tbodyPosition.y,
                width: pillarWidth,
                height: tbody.$.offsetHeight,
                rtl: rtl
            });
        }

        return pillars;
    }

    function getPillarAtPosition(pillars, positionX) {
        for (var i = 0, len = pillars.length; i < len; i++) {
            var pillar = pillars[i];

            if (positionX >= pillar.x && positionX <= pillar.x + pillar.width) {
                return pillar;
            }
        }

        return null;
    }

    function cancel(evt) {
        (evt.data || evt).preventDefault();
    }

    function columnResizer(editor) {
        var pillar, document, resizer, isResizing, startOffset, currentShift;

        var leftSideCells, rightSideCells, leftShiftBoundary, rightShiftBoundary;

        function detach() {
            pillar = null;
            currentShift = 0;
            isResizing = 0;

            document.removeListener('mouseup', onMouseUp);
            resizer.removeListener('mousedown', onMouseDown);
            resizer.removeListener('mousemove', onMouseMove);

            document.getBody().setStyle('cursor', 'auto');
        }

        function resizeStart() {
            // Before starting to resize, figure out which cells to change
            // and the boundaries of this resizing shift.

            var columnIndex = pillar.index,
                map = CKEDITOR.tools.buildTableMap(pillar.table),
                leftColumnCells = [],
                rightColumnCells = [],
                leftMinSize = Number.MAX_VALUE,
                rightMinSize = leftMinSize,
                rtl = pillar.rtl;

            for (var i = 0, len = map.length; i < len; i++) {
                var row = map[i],
                    leftCell = row[columnIndex + (rtl ? 1 : 0)],
                    rightCell = row[columnIndex + (rtl ? 0 : 1)];

                leftCell = leftCell && new CKEDITOR.dom.element(leftCell);
                rightCell = rightCell && new CKEDITOR.dom.element(rightCell);

                if (!leftCell || !rightCell || !leftCell.equals(rightCell)) {
                    leftCell && (leftMinSize = Math.min(leftMinSize, getWidth(leftCell)));
                    rightCell && (rightMinSize = Math.min(rightMinSize, getWidth(rightCell)));

                    leftColumnCells.push(leftCell);
                    rightColumnCells.push(rightCell);
                }
            }

            // Cache the list of cells to be resized.
            leftSideCells = leftColumnCells;
            rightSideCells = rightColumnCells;

            // Cache the resize limit boundaries.
            leftShiftBoundary = pillar.x - leftMinSize;
            rightShiftBoundary = pillar.x + rightMinSize;

            resizer.setOpacity(0.5);
            startOffset = parseInt(resizer.getStyle('left'), 10);
            currentShift = 0;
            isResizing = 1;

            resizer.on('mousemove', onMouseMove);

            // Prevent the native drag behavior otherwise 'mousemove' won't fire.
            document.on('dragstart', cancel);
        }

        function resizeEnd() {
            isResizing = 0;

            resizer.setOpacity(0);

            currentShift && resizeColumn();

            var table = pillar.table;
            setTimeout(function () {
                table.removeCustomData('_cke_table_pillars');
            }, 0);

            document.removeListener('dragstart', cancel);
        }

        function resizeColumn() {
            var rtl = pillar.rtl,
                cellsCount = rtl ? rightSideCells.length : leftSideCells.length;

            // Perform the actual resize to table cells, only for those by side of the pillar.
            for (var i = 0; i < cellsCount; i++) {
                var leftCell = leftSideCells[i],
                    rightCell = rightSideCells[i],
                    table = pillar.table;

                // Defer the resizing to avoid any interference among cells.
                CKEDITOR.tools.setTimeout(function (leftCell, leftOldWidth, rightCell, rightOldWidth, tableWidth, sizeShift) {
                    // 1px is the minimum valid width (#11626).
                    leftCell && leftCell.setStyle('width', pxUnit(Math.max(leftOldWidth + sizeShift, 1)));
                    rightCell && rightCell.setStyle('width', pxUnit(Math.max(rightOldWidth - sizeShift, 1)));

                    // If we're in the last cell, we need to resize the table as well
                    if (tableWidth) {
                        table.setStyle('width', pxUnit(tableWidth + sizeShift * (rtl ? -1 : 1)));
                    }
                }, 0, this, [leftCell, leftCell && getWidth(leftCell), rightCell, rightCell && getWidth(rightCell), (!leftCell || !rightCell) && getWidth(table) + getBorderWidth(table, 'left') + getBorderWidth(table, 'right'), currentShift]);
            }
        }

        function onMouseDown(evt) {
            cancel(evt);

            resizeStart();

            document.on('mouseup', onMouseUp, this);
        }

        function onMouseUp(evt) {
            evt.removeListener();

            resizeEnd();
        }

        function onMouseMove(evt) {
            move(evt.data.getPageOffset().x);
        }

        document = editor.document;

        resizer = CKEDITOR.dom.element.createFromHtml('<div data-cke-temp=1 contenteditable=false unselectable=on ' + 'style="position:absolute;cursor:col-resize;filter:alpha(opacity=0);opacity:0;' + 'padding:0;background-color:#004;background-image:none;border:0px none;z-index:10"></div>', document);

        // Clean DOM when editor is destroyed.
        editor.on('destroy', function () {
            resizer.remove();
        });

        // Place the resizer after body to prevent it
        // from being editable.
        document.getDocumentElement().append(resizer);

        this.attachTo = function (targetPillar) {
            // Accept only one pillar at a time.
            if (isResizing) {
                return;
            }

            pillar = targetPillar;

            resizer.setStyles({
                width: pxUnit(targetPillar.width),
                height: pxUnit(targetPillar.height),
                left: pxUnit(targetPillar.x),
                top: pxUnit(targetPillar.y)
            });

            resizer.on('mousedown', onMouseDown, this);

            document.getBody().setStyle('cursor', 'col-resize');

            // Display the resizer to receive events but don't show it,
            // only change the cursor to resizable shape.
            resizer.show();
        };

        var move = this.move = function (posX) {
            if (!pillar) {
                return 0;
            }

            if (!isResizing && (posX < pillar.x || posX > pillar.x + pillar.width)) {
                detach();
                return 0;
            }

            var resizerNewPosition = posX - Math.round(resizer.$.offsetWidth / 2);

            if (isResizing) {
                if (resizerNewPosition === leftShiftBoundary || resizerNewPosition === rightShiftBoundary) {
                    return 1;
                }

                resizerNewPosition = Math.max(resizerNewPosition, leftShiftBoundary);
                resizerNewPosition = Math.min(resizerNewPosition, rightShiftBoundary);

                currentShift = resizerNewPosition - startOffset;
            }

            resizer.setStyle('left', pxUnit(resizerNewPosition));

            return 1;
        };
    }

    function clearPillarsCache(evt) {
        var target = evt.data.getTarget();

        if (evt.name === 'mouseout') {
            // Bypass interal mouse move.
            if (!target.is('table')) {
                return;
            }

            var dest = new CKEDITOR.dom.element(evt.data.$.relatedTarget || evt.data.$.toElement);
            while (dest && dest.$ && !dest.equals(target) && !dest.is('body')) {
                dest = dest.getParent();
            }
            if (!dest || dest.equals(target)) {
                return;
            }
        }

        target.getAscendant('table', 1).removeCustomData('_cke_table_pillars');
        evt.removeListener();
    }

    CKEDITOR.plugins.add('ae_tableresize', {
        requires: 'ae_tabletools',

        init: function init(editor) {
            editor.on('contentDom', function () {
                var resizer,
                    editable = editor.editable();

                // In Classic editor it is better to use document
                // instead of editable so event will work below body.
                editable.attachListener(editable.isInline() ? editable : editor.document, 'mousemove', function (evt) {
                    evt = evt.data;

                    var target = evt.getTarget();

                    // FF may return document and IE8 some UFO (object with no nodeType property...)
                    // instead of an element (#11823).
                    if (target.type !== CKEDITOR.NODE_ELEMENT) {
                        return;
                    }

                    var pageX = evt.getPageOffset().x;

                    // If we're already attached to a pillar, simply move the
                    // resizer.
                    if (resizer && resizer.move(pageX)) {
                        cancel(evt);
                        return;
                    }

                    // Considering table, tr, td, tbody but nothing else.
                    var table, pillars;

                    if (!target.is('table') && !target.getAscendant('tbody', 1)) {
                        return;
                    }

                    table = target.getAscendant('table', 1);

                    // Make sure the table we found is inside the container
                    // (eg. we should not use tables the editor is embedded within)
                    if (!editor.editable().contains(table)) {
                        return;
                    }

                    if (!(pillars = table.getCustomData('_cke_table_pillars'))) {
                        // Cache table pillars calculation result.
                        table.setCustomData('_cke_table_pillars', pillars = buildTableColumnPillars(table));
                        table.on('mouseout', clearPillarsCache);
                        table.on('mousedown', clearPillarsCache);
                    }

                    var pillar = getPillarAtPosition(pillars, pageX);
                    if (pillar) {
                        !resizer && (resizer = new columnResizer(editor));
                        resizer.attachTo(pillar);
                    }
                });
            });
        }
    });
})();
'use strict';

/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

(function () {
	'use strict';

	if (CKEDITOR.plugins.get('ae_tabletools')) {
		return;
	}

	var cellNodeRegex = /^(?:td|th)$/;

	function getSelectedCells(selection) {
		var ranges = selection.getRanges();
		var retval = [];
		var database = {};

		function moveOutOfCellGuard(node) {
			// Apply to the first cell only.
			if (retval.length > 0) return;

			// If we are exiting from the first </td>, then the td should definitely be
			// included.
			if (node.type == CKEDITOR.NODE_ELEMENT && cellNodeRegex.test(node.getName()) && !node.getCustomData('selected_cell')) {
				CKEDITOR.dom.element.setMarker(database, node, 'selected_cell', true);
				retval.push(node);
			}
		}

		for (var i = 0; i < ranges.length; i++) {
			var range = ranges[i];

			if (range.collapsed) {
				// Walker does not handle collapsed ranges yet - fall back to old API.
				var startNode = range.getCommonAncestor();
				var nearestCell = startNode.getAscendant('td', true) || startNode.getAscendant('th', true);
				if (nearestCell) retval.push(nearestCell);
			} else {
				var walker = new CKEDITOR.dom.walker(range);
				var node;
				walker.guard = moveOutOfCellGuard;

				while (node = walker.next()) {
					// If may be possible for us to have a range like this:
					// <td>^1</td><td>^2</td>
					// The 2nd td shouldn't be included.
					//
					// So we have to take care to include a td we've entered only when we've
					// walked into its children.

					if (node.type != CKEDITOR.NODE_ELEMENT || !node.is(CKEDITOR.dtd.table)) {
						var parent = node.getAscendant('td', true) || node.getAscendant('th', true);
						if (parent && !parent.getCustomData('selected_cell')) {
							CKEDITOR.dom.element.setMarker(database, parent, 'selected_cell', true);
							retval.push(parent);
						}
					}
				}
			}
		}

		CKEDITOR.dom.element.clearAllMarkers(database);

		return retval;
	}

	function getFocusElementAfterDelCells(cellsToDelete) {
		var i = 0,
		    last = cellsToDelete.length - 1,
		    database = {},
		    cell,
		    focusedCell,
		    tr;

		while (cell = cellsToDelete[i++]) {
			CKEDITOR.dom.element.setMarker(database, cell, 'delete_cell', true);
		} // 1.first we check left or right side focusable cell row by row;
		i = 0;
		while (cell = cellsToDelete[i++]) {
			if ((focusedCell = cell.getPrevious()) && !focusedCell.getCustomData('delete_cell') || (focusedCell = cell.getNext()) && !focusedCell.getCustomData('delete_cell')) {
				CKEDITOR.dom.element.clearAllMarkers(database);
				return focusedCell;
			}
		}

		CKEDITOR.dom.element.clearAllMarkers(database);

		// 2. then we check the toppest row (outside the selection area square) focusable cell
		tr = cellsToDelete[0].getParent();
		if (tr = tr.getPrevious()) return tr.getLast();

		// 3. last we check the lowerest  row focusable cell
		tr = cellsToDelete[last].getParent();
		if (tr = tr.getNext()) return tr.getChild(0);

		return null;
	}

	function insertRow(selection, insertBefore) {
		var cells = getSelectedCells(selection),
		    firstCell = cells[0],
		    table = firstCell.getAscendant('table'),
		    doc = firstCell.getDocument(),
		    startRow = cells[0].getParent(),
		    startRowIndex = startRow.$.rowIndex,
		    lastCell = cells[cells.length - 1],
		    endRowIndex = lastCell.getParent().$.rowIndex + lastCell.$.rowSpan - 1,
		    endRow = new CKEDITOR.dom.element(table.$.rows[endRowIndex]),
		    rowIndex = insertBefore ? startRowIndex : endRowIndex,
		    row = insertBefore ? startRow : endRow;

		var map = CKEDITOR.tools.buildTableMap(table),
		    cloneRow = map[rowIndex],
		    nextRow = insertBefore ? map[rowIndex - 1] : map[rowIndex + 1],
		    width = map[0].length;

		var newRow = doc.createElement('tr');
		for (var i = 0; cloneRow[i] && i < width; i++) {
			var cell;
			// Check whether there's a spanning row here, do not break it.
			if (cloneRow[i].rowSpan > 1 && nextRow && cloneRow[i] == nextRow[i]) {
				cell = cloneRow[i];
				cell.rowSpan += 1;
			} else {
				cell = new CKEDITOR.dom.element(cloneRow[i]).clone();
				cell.removeAttribute('rowSpan');
				cell.appendBogus();
				newRow.append(cell);
				cell = cell.$;
			}

			i += cell.colSpan - 1;
		}

		insertBefore ? newRow.insertBefore(row) : newRow.insertAfter(row);
	}

	function deleteRows(selectionOrRow) {
		if (selectionOrRow instanceof CKEDITOR.dom.selection) {
			var cells = getSelectedCells(selectionOrRow),
			    firstCell = cells[0],
			    table = firstCell.getAscendant('table'),
			    map = CKEDITOR.tools.buildTableMap(table),
			    startRow = cells[0].getParent(),
			    startRowIndex = startRow.$.rowIndex,
			    lastCell = cells[cells.length - 1],
			    endRowIndex = lastCell.getParent().$.rowIndex + lastCell.$.rowSpan - 1,
			    rowsToDelete = [];

			// Delete cell or reduce cell spans by checking through the table map.
			for (var i = startRowIndex; i <= endRowIndex; i++) {
				var mapRow = map[i],
				    row = new CKEDITOR.dom.element(table.$.rows[i]);

				for (var j = 0; j < mapRow.length; j++) {
					var cell = new CKEDITOR.dom.element(mapRow[j]),
					    cellRowIndex = cell.getParent().$.rowIndex;

					if (cell.$.rowSpan == 1) cell.remove();
					// Row spanned cell.
					else {
							// Span row of the cell, reduce spanning.
							cell.$.rowSpan -= 1;
							// Root row of the cell, root cell to next row.
							if (cellRowIndex == i) {
								var nextMapRow = map[i + 1];
								nextMapRow[j - 1] ? cell.insertAfter(new CKEDITOR.dom.element(nextMapRow[j - 1])) : new CKEDITOR.dom.element(table.$.rows[i + 1]).append(cell, 1);
							}
						}

					j += cell.$.colSpan - 1;
				}

				rowsToDelete.push(row);
			}

			var rows = table.$.rows;

			// Where to put the cursor after rows been deleted?
			// 1. Into next sibling row if any;
			// 2. Into previous sibling row if any;
			// 3. Into table's parent element if it's the very last row.
			var cursorPosition = new CKEDITOR.dom.element(rows[endRowIndex + 1] || (startRowIndex > 0 ? rows[startRowIndex - 1] : null) || table.$.parentNode);

			for (i = rowsToDelete.length; i >= 0; i--) {
				deleteRows(rowsToDelete[i]);
			}return cursorPosition;
		} else if (selectionOrRow instanceof CKEDITOR.dom.element) {
			table = selectionOrRow.getAscendant('table');

			if (table.$.rows.length == 1) table.remove();else selectionOrRow.remove();
		}

		return null;
	}

	function getCellColIndex(cell, isStart) {
		var row = cell.getParent(),
		    rowCells = row.$.cells;

		var colIndex = 0;
		for (var i = 0; i < rowCells.length; i++) {
			var mapCell = rowCells[i];
			colIndex += isStart ? 1 : mapCell.colSpan;
			if (mapCell == cell.$) break;
		}

		return colIndex - 1;
	}

	function getColumnsIndices(cells, isStart) {
		var retval = isStart ? Infinity : 0;
		for (var i = 0; i < cells.length; i++) {
			var colIndex = getCellColIndex(cells[i], isStart);
			if (isStart ? colIndex < retval : colIndex > retval) retval = colIndex;
		}
		return retval;
	}

	function insertColumn(selection, insertBefore) {
		var cells = getSelectedCells(selection),
		    firstCell = cells[0],
		    table = firstCell.getAscendant('table'),
		    startCol = getColumnsIndices(cells, 1),
		    lastCol = getColumnsIndices(cells),
		    colIndex = insertBefore ? startCol : lastCol;

		var map = CKEDITOR.tools.buildTableMap(table),
		    cloneCol = [],
		    nextCol = [],
		    height = map.length;

		for (var i = 0; i < height; i++) {
			cloneCol.push(map[i][colIndex]);
			var nextCell = insertBefore ? map[i][colIndex - 1] : map[i][colIndex + 1];
			nextCol.push(nextCell);
		}

		for (i = 0; i < height; i++) {
			var cell;

			if (!cloneCol[i]) continue;

			// Check whether there's a spanning column here, do not break it.
			if (cloneCol[i].colSpan > 1 && nextCol[i] == cloneCol[i]) {
				cell = cloneCol[i];
				cell.colSpan += 1;
			} else {
				cell = new CKEDITOR.dom.element(cloneCol[i]).clone();
				cell.removeAttribute('colSpan');
				cell.appendBogus();
				cell[insertBefore ? 'insertBefore' : 'insertAfter'].call(cell, new CKEDITOR.dom.element(cloneCol[i]));
				cell = cell.$;
			}

			i += cell.rowSpan - 1;
		}
	}

	function deleteColumns(selectionOrCell) {
		var cells = getSelectedCells(selectionOrCell),
		    firstCell = cells[0],
		    lastCell = cells[cells.length - 1],
		    table = firstCell.getAscendant('table'),
		    map = CKEDITOR.tools.buildTableMap(table),
		    startColIndex,
		    endColIndex,
		    rowsToDelete = [];

		// Figure out selected cells' column indices.
		for (var i = 0, rows = map.length; i < rows; i++) {
			for (var j = 0, cols = map[i].length; j < cols; j++) {
				if (map[i][j] == firstCell.$) startColIndex = j;
				if (map[i][j] == lastCell.$) endColIndex = j;
			}
		}

		// Delete cell or reduce cell spans by checking through the table map.
		for (i = startColIndex; i <= endColIndex; i++) {
			for (j = 0; j < map.length; j++) {
				var mapRow = map[j],
				    row = new CKEDITOR.dom.element(table.$.rows[j]),
				    cell = new CKEDITOR.dom.element(mapRow[i]);

				if (cell.$) {
					if (cell.$.colSpan == 1) cell.remove();
					// Reduce the col spans.
					else cell.$.colSpan -= 1;

					j += cell.$.rowSpan - 1;

					if (!row.$.cells.length) rowsToDelete.push(row);
				}
			}
		}

		var firstRowCells = table.$.rows[0] && table.$.rows[0].cells;

		// Where to put the cursor after columns been deleted?
		// 1. Into next cell of the first row if any;
		// 2. Into previous cell of the first row if any;
		// 3. Into table's parent element;
		var cursorPosition = new CKEDITOR.dom.element(firstRowCells[startColIndex] || (startColIndex ? firstRowCells[startColIndex - 1] : table.$.parentNode));

		// Delete table rows only if all columns are gone (do not remove empty row).
		if (rowsToDelete.length == rows) table.remove();

		return cursorPosition;
	}

	function insertCell(selection, insertBefore) {
		var startElement = selection.getStartElement();
		var cell = startElement.getAscendant('td', 1) || startElement.getAscendant('th', 1);

		if (!cell) return;

		// Create the new cell element to be added.
		var newCell = cell.clone();
		newCell.appendBogus();

		if (insertBefore) newCell.insertBefore(cell);else newCell.insertAfter(cell);
	}

	function deleteCells(selectionOrCell) {
		if (selectionOrCell instanceof CKEDITOR.dom.selection) {
			var cellsToDelete = getSelectedCells(selectionOrCell);
			var table = cellsToDelete[0] && cellsToDelete[0].getAscendant('table');
			var cellToFocus = getFocusElementAfterDelCells(cellsToDelete);

			for (var i = cellsToDelete.length - 1; i >= 0; i--) {
				deleteCells(cellsToDelete[i]);
			}if (cellToFocus) placeCursorInCell(cellToFocus, true);else if (table) table.remove();
		} else if (selectionOrCell instanceof CKEDITOR.dom.element) {
			var tr = selectionOrCell.getParent();
			if (tr.getChildCount() == 1) tr.remove();else selectionOrCell.remove();
		}
	}

	// Remove filler at end and empty spaces around the cell content.
	function trimCell(cell) {
		var bogus = cell.getBogus();
		bogus && bogus.remove();
		cell.trim();
	}

	function placeCursorInCell(cell, placeAtEnd) {
		var docInner = cell.getDocument(),
		    docOuter = CKEDITOR.document;

		// Fixing "Unspecified error" thrown in IE10 by resetting
		// selection the dirty and shameful way (#10308).
		// We can not apply this hack to IE8 because
		// it causes error (#11058).
		if (CKEDITOR.env.ie && CKEDITOR.env.version == 10) {
			docOuter.focus();
			docInner.focus();
		}

		var range = new CKEDITOR.dom.range(docInner);
		if (!range['moveToElementEdit' + (placeAtEnd ? 'End' : 'Start')](cell)) {
			range.selectNodeContents(cell);
			range.collapse(placeAtEnd ? false : true);
		}
		range.select(true);
	}

	function cellInRow(tableMap, rowIndex, cell) {
		var oRow = tableMap[rowIndex];
		if (typeof cell == 'undefined') return oRow;

		for (var c = 0; oRow && c < oRow.length; c++) {
			if (cell.is && oRow[c] == cell.$) return c;else if (c == cell) return new CKEDITOR.dom.element(oRow[c]);
		}
		return cell.is ? -1 : null;
	}

	function cellInCol(tableMap, colIndex) {
		var oCol = [];
		for (var r = 0; r < tableMap.length; r++) {
			var row = tableMap[r];
			oCol.push(row[colIndex]);

			// Avoid adding duplicate cells.
			if (row[colIndex].rowSpan > 1) r += row[colIndex].rowSpan - 1;
		}
		return oCol;
	}

	function mergeCells(selection, mergeDirection, isDetect) {
		var cells = getSelectedCells(selection);

		// Invalid merge request if:
		// 1. In batch mode despite that less than two selected.
		// 2. In solo mode while not exactly only one selected.
		// 3. Cells distributed in different table groups (e.g. from both thead and tbody).
		var commonAncestor;
		if ((mergeDirection ? cells.length != 1 : cells.length < 2) || (commonAncestor = selection.getCommonAncestor()) && commonAncestor.type == CKEDITOR.NODE_ELEMENT && commonAncestor.is('table')) return false;

		var cell,
		    firstCell = cells[0],
		    table = firstCell.getAscendant('table'),
		    map = CKEDITOR.tools.buildTableMap(table),
		    mapHeight = map.length,
		    mapWidth = map[0].length,
		    startRow = firstCell.getParent().$.rowIndex,
		    startColumn = cellInRow(map, startRow, firstCell);

		if (mergeDirection) {
			var targetCell;
			try {
				var rowspan = parseInt(firstCell.getAttribute('rowspan'), 10) || 1;
				var colspan = parseInt(firstCell.getAttribute('colspan'), 10) || 1;

				targetCell = map[mergeDirection == 'up' ? startRow - rowspan : mergeDirection == 'down' ? startRow + rowspan : startRow][mergeDirection == 'left' ? startColumn - colspan : mergeDirection == 'right' ? startColumn + colspan : startColumn];
			} catch (er) {
				return false;
			}

			// 1. No cell could be merged.
			// 2. Same cell actually.
			if (!targetCell || firstCell.$ == targetCell) return false;

			// Sort in map order regardless of the DOM sequence.
			cells[mergeDirection == 'up' || mergeDirection == 'left' ? 'unshift' : 'push'](new CKEDITOR.dom.element(targetCell));
		}

		// Start from here are merging way ignorance (merge up/right, batch merge).
		var doc = firstCell.getDocument(),
		    lastRowIndex = startRow,
		    totalRowSpan = 0,
		    totalColSpan = 0,

		// Use a documentFragment as buffer when appending cell contents.
		frag = !isDetect && new CKEDITOR.dom.documentFragment(doc),
		    dimension = 0;

		for (var i = 0; i < cells.length; i++) {
			cell = cells[i];

			var tr = cell.getParent(),
			    cellFirstChild = cell.getFirst(),
			    colSpan = cell.$.colSpan,
			    rowSpan = cell.$.rowSpan,
			    rowIndex = tr.$.rowIndex,
			    colIndex = cellInRow(map, rowIndex, cell);

			// Accumulated the actual places taken by all selected cells.
			dimension += colSpan * rowSpan;
			// Accumulated the maximum virtual spans from column and row.
			totalColSpan = Math.max(totalColSpan, colIndex - startColumn + colSpan);
			totalRowSpan = Math.max(totalRowSpan, rowIndex - startRow + rowSpan);

			if (!isDetect) {
				// Trim all cell fillers and check to remove empty cells.
				if (trimCell(cell), cell.getChildren().count()) {
					// Merge vertically cells as two separated paragraphs.
					if (rowIndex != lastRowIndex && cellFirstChild && !(cellFirstChild.isBlockBoundary && cellFirstChild.isBlockBoundary({ br: 1 }))) {
						var last = frag.getLast(CKEDITOR.dom.walker.whitespaces(true));
						if (last && !(last.is && last.is('br'))) frag.append('br');
					}

					cell.moveChildren(frag);
				}
				i ? cell.remove() : cell.setHtml('');
			}
			lastRowIndex = rowIndex;
		}

		if (!isDetect) {
			frag.moveChildren(firstCell);

			firstCell.appendBogus();

			if (totalColSpan >= mapWidth) firstCell.removeAttribute('rowSpan');else firstCell.$.rowSpan = totalRowSpan;

			if (totalRowSpan >= mapHeight) firstCell.removeAttribute('colSpan');else firstCell.$.colSpan = totalColSpan;

			// Swip empty <tr> left at the end of table due to the merging.
			var trs = new CKEDITOR.dom.nodeList(table.$.rows),
			    count = trs.count();

			for (i = count - 1; i >= 0; i--) {
				var tailTr = trs.getItem(i);
				if (!tailTr.$.cells.length) {
					tailTr.remove();
					count++;
					continue;
				}
			}

			return firstCell;
		}
		// Be able to merge cells only if actual dimension of selected
		// cells equals to the caculated rectangle.
		else {
				return totalRowSpan * totalColSpan == dimension;
			}
	}

	function verticalSplitCell(selection, isDetect) {
		var cells = getSelectedCells(selection);
		if (cells.length > 1) return false;else if (isDetect) return true;

		var cell = cells[0],
		    tr = cell.getParent(),
		    table = tr.getAscendant('table'),
		    map = CKEDITOR.tools.buildTableMap(table),
		    rowIndex = tr.$.rowIndex,
		    colIndex = cellInRow(map, rowIndex, cell),
		    rowSpan = cell.$.rowSpan,
		    newCell,
		    newRowSpan,
		    newCellRowSpan,
		    newRowIndex;

		if (rowSpan > 1) {
			newRowSpan = Math.ceil(rowSpan / 2);
			newCellRowSpan = Math.floor(rowSpan / 2);
			newRowIndex = rowIndex + newRowSpan;
			var newCellTr = new CKEDITOR.dom.element(table.$.rows[newRowIndex]),
			    newCellRow = cellInRow(map, newRowIndex),
			    candidateCell;

			newCell = cell.clone();

			// Figure out where to insert the new cell by checking the vitual row.
			for (var c = 0; c < newCellRow.length; c++) {
				candidateCell = newCellRow[c];
				// Catch first cell actually following the column.
				if (candidateCell.parentNode == newCellTr.$ && c > colIndex) {
					newCell.insertBefore(new CKEDITOR.dom.element(candidateCell));
					break;
				} else {
					candidateCell = null;
				}
			}

			// The destination row is empty, append at will.
			if (!candidateCell) newCellTr.append(newCell);
		} else {
			newCellRowSpan = newRowSpan = 1;

			newCellTr = tr.clone();
			newCellTr.insertAfter(tr);
			newCellTr.append(newCell = cell.clone());

			var cellsInSameRow = cellInRow(map, rowIndex);
			for (var i = 0; i < cellsInSameRow.length; i++) {
				cellsInSameRow[i].rowSpan++;
			}
		}

		newCell.appendBogus();

		cell.$.rowSpan = newRowSpan;
		newCell.$.rowSpan = newCellRowSpan;
		if (newRowSpan == 1) cell.removeAttribute('rowSpan');
		if (newCellRowSpan == 1) newCell.removeAttribute('rowSpan');

		return newCell;
	}

	function horizontalSplitCell(selection, isDetect) {
		var cells = getSelectedCells(selection);
		if (cells.length > 1) return false;else if (isDetect) return true;

		var cell = cells[0],
		    tr = cell.getParent(),
		    table = tr.getAscendant('table'),
		    map = CKEDITOR.tools.buildTableMap(table),
		    rowIndex = tr.$.rowIndex,
		    colIndex = cellInRow(map, rowIndex, cell),
		    colSpan = cell.$.colSpan,
		    newCell,
		    newColSpan,
		    newCellColSpan;

		if (colSpan > 1) {
			newColSpan = Math.ceil(colSpan / 2);
			newCellColSpan = Math.floor(colSpan / 2);
		} else {
			newCellColSpan = newColSpan = 1;
			var cellsInSameCol = cellInCol(map, colIndex);
			for (var i = 0; i < cellsInSameCol.length; i++) {
				cellsInSameCol[i].colSpan++;
			}
		}
		newCell = cell.clone();
		newCell.insertAfter(cell);
		newCell.appendBogus();

		cell.$.colSpan = newColSpan;
		newCell.$.colSpan = newCellColSpan;
		if (newColSpan == 1) cell.removeAttribute('colSpan');
		if (newCellColSpan == 1) newCell.removeAttribute('colSpan');

		return newCell;
	}

	CKEDITOR.plugins.add('ae_tabletools', {
		init: function init(editor) {
			var lang = editor.lang.table;

			function createDef(def) {
				return CKEDITOR.tools.extend(def || {}, {
					contextSensitive: 1,
					refresh: function refresh(editor, path) {
						this.setState(path.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
					}
				});
			}
			function addCmd(name, def) {
				var cmd = editor.getCommand(name);

				if (cmd) {
					return;
				}

				cmd = editor.addCommand(name, def);
				editor.addFeature(cmd);
			}

			addCmd('rowDelete', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					placeCursorInCell(deleteRows(selection));
				}
			}));

			addCmd('rowInsertBefore', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertRow(selection, true);
				}
			}));

			addCmd('rowInsertAfter', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertRow(selection);
				}
			}));

			addCmd('columnDelete', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					var element = deleteColumns(selection);
					element && placeCursorInCell(element, true);
				}
			}));

			addCmd('columnInsertBefore', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertColumn(selection, true);
				}
			}));

			addCmd('columnInsertAfter', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertColumn(selection);
				}
			}));

			addCmd('cellDelete', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					deleteCells(selection);
				}
			}));

			addCmd('cellMerge', createDef({
				allowedContent: 'td[colspan,rowspan]',
				requiredContent: 'td[colspan,rowspan]',
				exec: function exec(editor) {
					placeCursorInCell(mergeCells(editor.getSelection()), true);
				}
			}));

			addCmd('cellMergeRight', createDef({
				allowedContent: 'td[colspan]',
				requiredContent: 'td[colspan]',
				exec: function exec(editor) {
					placeCursorInCell(mergeCells(editor.getSelection(), 'right'), true);
				}
			}));

			addCmd('cellMergeDown', createDef({
				allowedContent: 'td[rowspan]',
				requiredContent: 'td[rowspan]',
				exec: function exec(editor) {
					placeCursorInCell(mergeCells(editor.getSelection(), 'down'), true);
				}
			}));

			addCmd('cellVerticalSplit', createDef({
				allowedContent: 'td[rowspan]',
				requiredContent: 'td[rowspan]',
				exec: function exec(editor) {
					placeCursorInCell(verticalSplitCell(editor.getSelection()));
				}
			}));

			addCmd('cellHorizontalSplit', createDef({
				allowedContent: 'td[colspan]',
				requiredContent: 'td[colspan]',
				exec: function exec(editor) {
					placeCursorInCell(horizontalSplitCell(editor.getSelection()));
				}
			}));

			addCmd('cellInsertBefore', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertCell(selection, true);
				}
			}));

			addCmd('cellInsertAfter', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertCell(selection);
				}
			}));
		},

		getSelectedCells: getSelectedCells

	});
})();

/**
 * Create a two-dimension array that reflects the actual layout of table cells,
 * with cell spans, with mappings to the original td elements.
 *
 * @param {CKEDITOR.dom.element} table
 * @member CKEDITOR.tools
 */
CKEDITOR.tools.buildTableMap = function (table) {
	var aRows = table.$.rows;

	// Row and Column counters.
	var r = -1;

	var aMap = [];

	for (var i = 0; i < aRows.length; i++) {
		r++;
		!aMap[r] && (aMap[r] = []);

		var c = -1;

		for (var j = 0; j < aRows[i].cells.length; j++) {
			var oCell = aRows[i].cells[j];

			c++;
			while (aMap[r][c]) {
				c++;
			}var iColSpan = isNaN(oCell.colSpan) ? 1 : oCell.colSpan;
			var iRowSpan = isNaN(oCell.rowSpan) ? 1 : oCell.rowSpan;

			for (var rs = 0; rs < iRowSpan; rs++) {
				if (!aMap[r + rs]) aMap[r + rs] = [];

				for (var cs = 0; cs < iColSpan; cs++) {
					aMap[r + rs][c + cs] = aRows[i].cells[j];
				}
			}

			c += iColSpan - 1;
		}
	}
	return aMap;
};
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_buttonbridge')) {
        return;
    }

    /* istanbul ignore next */
    function noop() {}

    // API not yet implemented inside the button bridge. By mocking the unsupported methods, we
    // prevent plugins from crashing if they make use of them.
    //
    // Some methods like `getState` and `setState` clash with React's own state methods. For them,
    // unsupported means that we don't account for the different meaning in the passed or returned
    // arguments.
    var UNSUPPORTED_BUTTON_API = {
        //getState: function() {},
        //setState: function(state) {},
        toFeature: noop
    };

    var BUTTON_DEFS = {};

    /**
     * Generates a ButtonBridge React class for a given button definition if it has not been
     * already created based on the button name and definition.
     *
     * @private
     * @method generateButtonBridge
     * @param {String} buttonName The button's name
     * @param {Object} buttonDefinition The button's definition
     * @return {Object} The generated or already existing React Button Class
     */

    function generateButtonBridge(buttonName, buttonDefinition, editor) {
        var ButtonBridge = AlloyEditor.Buttons[buttonName];

        BUTTON_DEFS[editor.name] = BUTTON_DEFS[editor.name] || {};
        BUTTON_DEFS[editor.name][buttonName] = BUTTON_DEFS[editor.name][buttonName] || buttonDefinition;

        if (!ButtonBridge) {
            ButtonBridge = React.createClass(CKEDITOR.tools.merge(UNSUPPORTED_BUTTON_API, {
                displayName: buttonName,

                propTypes: {
                    editor: React.PropTypes.object.isRequired,
                    tabIndex: React.PropTypes.number
                },

                statics: {
                    key: buttonName
                },

                render: function render() {
                    var editor = this.props.editor.get('nativeEditor');

                    var buttonClassName = 'ae-button ae-button-bridge';

                    var buttonDisplayName = BUTTON_DEFS[editor.name][buttonName].name || BUTTON_DEFS[editor.name][buttonName].command || buttonName;

                    var buttonLabel = BUTTON_DEFS[editor.name][buttonName].label;

                    var buttonType = 'button-' + buttonDisplayName;

                    var iconClassName = 'ae-icon-' + buttonDisplayName;

                    var iconStyle = {};

                    var cssStyle = CKEDITOR.skin.getIconStyle(buttonDisplayName);

                    if (cssStyle) {
                        var cssStyleParts = cssStyle.split(';');

                        iconStyle.backgroundImage = cssStyleParts[0].substring(cssStyleParts[0].indexOf(':') + 1);
                        iconStyle.backgroundPosition = cssStyleParts[1].substring(cssStyleParts[1].indexOf(':') + 1);
                        iconStyle.backgroundSize = cssStyleParts[2].substring(cssStyleParts[2].indexOf(':') + 1);
                    }

                    return React.createElement(
                        'button',
                        { 'aria-label': buttonLabel, className: buttonClassName, 'data-type': buttonType, onClick: this._handleClick, tabIndex: this.props.tabIndex, title: buttonLabel },
                        React.createElement('span', { className: iconClassName, style: iconStyle })
                    );
                },

                _handleClick: function _handleClick(event) {
                    var editor = this.props.editor.get('nativeEditor');

                    var buttonCommand = BUTTON_DEFS[editor.name][buttonName].command;

                    var buttonOnClick = BUTTON_DEFS[editor.name][buttonName].onClick;

                    if (buttonOnClick) {
                        buttonOnClick.call(this);
                    } else {
                        editor.execCommand(buttonCommand);
                    }

                    editor.fire('actionPerformed', this);
                }
            }));

            AlloyEditor.Buttons[buttonName] = ButtonBridge;
        }

        return ButtonBridge;
    }

    /* istanbul ignore else */
    if (!CKEDITOR.plugins.get('button')) {
        CKEDITOR.UI_BUTTON = 'button';

        CKEDITOR.plugins.add('button', {});
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor Button plugin. It takes over the
     * responsibility of registering and creating buttons via:
     * - editor.ui.addButton(name, definition)
     * - editor.ui.add(name, CKEDITOR.UI_BUTTON, definition)
     *
     * @class CKEDITOR.plugins.ae_buttonbridge
     * @requires CKEDITOR.plugins.ae_uibridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_buttonbridge', {
        requires: ['ae_uibridge'],

        /**
         * Set the add handler for UI_BUTTON to our own. We do this in the init phase to override
         * the one in the native plugin in case it's present.
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        init: function init(editor) {
            editor.ui.addButton = function (buttonName, buttonDefinition) {
                this.add(buttonName, CKEDITOR.UI_BUTTON, buttonDefinition);
            };

            editor.ui.addHandler(CKEDITOR.UI_BUTTON, {
                add: generateButtonBridge,
                create: function create(buttonDefinition) {
                    var buttonName = 'buttonBridge' + (Math.random() * 1e9 >>> 0);
                    var ButtonBridge = generateButtonBridge(buttonName, buttonDefinition);

                    return new ButtonBridge();
                }
            });
        }
    });
})();
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_panelmenubuttonbridge')) {
        return;
    }

    /* istanbul ignore next */
    function noop() {}

    // API not yet implemented inside the panel menu button bridge. By mocking the unsupported methods, we
    // prevent plugins from crashing if they make use of them.
    var UNSUPPORTED_PANEL_MENU_BUTTON_API = {
        createPanel: noop
    };

    var PANEL_MENU_DEFS = {};

    /**
     * Generates a PanelMenuButtonBridge React class for a given panelmenubutton definition if it has not been
     * already created based on the panelmenubutton name and definition.
     *
     * @private
     * @method generatePanelMenuButtonBridge
     * @param {String} panelMenuButtonName The panel button name
     * @param {Object} panelMenuButtonDefinition The panel button definition
     * @return {Object} The generated or already existing React PanelMenuButton Class
     */
    var generatePanelMenuButtonBridge = function generatePanelMenuButtonBridge(panelMenuButtonName, panelMenuButtonDefinition, editor) {
        var PanelMenuButtonBridge = AlloyEditor.Buttons[panelMenuButtonName];

        PANEL_MENU_DEFS[editor.name] = PANEL_MENU_DEFS[editor.name] || {};
        PANEL_MENU_DEFS[editor.name][panelMenuButtonName] = PANEL_MENU_DEFS[editor.name][panelMenuButtonName] || panelMenuButtonDefinition;

        if (!PanelMenuButtonBridge) {
            PanelMenuButtonBridge = React.createClass(CKEDITOR.tools.merge(UNSUPPORTED_PANEL_MENU_BUTTON_API, {
                displayName: panelMenuButtonName,

                propTypes: {
                    editor: React.PropTypes.object.isRequired
                },

                statics: {
                    key: panelMenuButtonName
                },

                render: function render() {
                    var editor = this.props.editor.get('nativeEditor');

                    var panelMenuButtonDisplayName = PANEL_MENU_DEFS[editor.name][panelMenuButtonName].name || PANEL_MENU_DEFS[editor.name][panelMenuButtonName].command || panelMenuButtonName;

                    var buttonClassName = 'ae-button ae-button-bridge';

                    var iconClassName = 'ae-icon-' + panelMenuButtonDisplayName;

                    var iconStyle = {};

                    var cssStyle = CKEDITOR.skin.getIconStyle(panelMenuButtonDisplayName);

                    if (cssStyle) {
                        var cssStyleParts = cssStyle.split(';');

                        iconStyle.backgroundImage = cssStyleParts[0].substring(cssStyleParts[0].indexOf(':') + 1);
                        iconStyle.backgroundPosition = cssStyleParts[1].substring(cssStyleParts[1].indexOf(':') + 1);
                        iconStyle.backgroundSize = cssStyleParts[2].substring(cssStyleParts[2].indexOf(':') + 1);
                    }

                    var panel;

                    if (this.props.expanded) {
                        panel = this._getPanel();
                    }

                    return React.createElement(
                        'div',
                        { className: 'ae-container ae-has-dropdown' },
                        React.createElement(
                            'button',
                            { 'aria-expanded': this.props.expanded, 'aria-label': PANEL_MENU_DEFS[editor.name][panelMenuButtonName].label, className: buttonClassName, onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: PANEL_MENU_DEFS[editor.name][panelMenuButtonName].label },
                            React.createElement('span', { className: iconClassName, style: iconStyle })
                        ),
                        panel
                    );
                },

                _getPanel: function _getPanel() {
                    var editor = this.props.editor.get('nativeEditor');

                    var panelMenuButtonOnBlock = PANEL_MENU_DEFS[editor.name][panelMenuButtonName].onBlock;

                    var panel = {
                        hide: this.props.toggleDropdown,
                        show: this.props.toggleDropdown
                    };

                    var blockElement = new CKEDITOR.dom.element('div');

                    var block = {
                        element: blockElement,
                        keys: {}
                    };

                    /* istanbul ignore else */
                    if (panelMenuButtonOnBlock) {
                        panelMenuButtonOnBlock.call(this, panel, block);
                    }

                    // TODO
                    // Use block.keys to configure the panel keyboard navigation

                    return React.createElement(
                        AlloyEditor.ButtonDropdown,
                        { onDismiss: this.props.toggleDropdown },
                        React.createElement('div', { className: blockElement.getAttribute('class'), dangerouslySetInnerHTML: { __html: blockElement.getHtml() } })
                    );
                }
            }));

            AlloyEditor.Buttons[panelMenuButtonName] = PanelMenuButtonBridge;
        }

        return PanelMenuButtonBridge;
    };

    /* istanbul ignore else */
    if (!CKEDITOR.plugins.get('panelmenubutton')) {
        CKEDITOR.UI_PANELBUTTON = 'panelmenubutton';

        CKEDITOR.plugins.add('panelmenubutton', {});
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor PanelButton plugin. It takes over the
     * responsibility of registering and creating buttons via:
     * - editor.ui.addPanelMenuButton(name, definition)
     * - editor.ui.add(name, CKEDITOR.UI_PANELBUTTON, definition)
     *
     * @class CKEDITOR.plugins.ae_panelmenubuttonbridge
     * @requires CKEDITOR.plugins.ae_uibridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_panelmenubuttonbridge', {
        requires: ['ae_uibridge'],

        /**
         * Set the add handler for UI_PANELBUTTON to our own. We do this in the init phase to override
         * the one in the native plugin in case it's present
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        init: function init(editor) {
            editor.ui.addPanelMenuButton = function (panelMenuButtonName, panelMenuButtonDefinition) {
                this.add(panelMenuButtonName, CKEDITOR.UI_PANELBUTTON, panelMenuButtonDefinition);
            };

            editor.ui.addHandler(CKEDITOR.UI_PANELBUTTON, {
                add: generatePanelMenuButtonBridge,
                create: function create(panelMenuButtonDefinition) {
                    var panelMenuButtonName = 'panelMenuButtonBridge' + (Math.random() * 1e9 >>> 0);
                    var PanelMenuButtonBridge = generatePanelMenuButtonBridge(panelMenuButtonName, panelMenuButtonDefinition);

                    return new PanelMenuButtonBridge();
                }
            });
        }
    });
})();
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_richcombobridge')) {
        return;
    }

    /* istanbul ignore next */
    function noop() {}

    // API not yet implemented inside the richcombo bridge. By mocking the unsupported methods, we
    // prevent plugins from crashing if they make use of them.
    //
    // Some methods like `setState` clash with React's own state methods. For them, unsupported means
    // that we don't account for the different meaning in the passed or returned arguments.
    var UNSUPPORTED_RICHCOMBO_API = {
        commit: noop,
        createPanel: noop,
        disable: noop,
        enable: noop,
        getState: noop,
        hideGroup: noop,
        hideItem: noop,
        mark: noop,
        //setState: noop,
        showAll: noop,
        startGroup: noop,
        unmarkAll: noop
    };

    var RICH_COMBO_DEFS = {};

    /**
     * Generates a RichComboBridge React class for a given richcombo definition if it has not been
     * already created based on the richcombo name and definition.
     *
     * @method generateRichComboBridge
     * @private
     * @param {String} richComboName The rich combo name
     * @param {Object} richComboDefinition The rich combo definition
     * @return {Object} The generated or already existing React RichCombo Class
     */
    var generateRichComboBridge = function generateRichComboBridge(richComboName, richComboDefinition, editor) {
        var RichComboBridge = AlloyEditor.Buttons[richComboName];

        RICH_COMBO_DEFS[editor.name] = RICH_COMBO_DEFS[editor.name] || {};
        RICH_COMBO_DEFS[editor.name][richComboName] = RICH_COMBO_DEFS[editor.name][richComboName] || richComboDefinition;
        RICH_COMBO_DEFS[editor.name][richComboName].currentValue = undefined;

        if (!RichComboBridge) {
            RichComboBridge = React.createClass(CKEDITOR.tools.merge(UNSUPPORTED_RICHCOMBO_API, {
                displayName: richComboName,

                propTypes: {
                    editor: React.PropTypes.object.isRequired
                },

                statics: {
                    key: richComboName
                },

                add: function add(value, preview, title) {
                    this._items.push({
                        preview: preview,
                        title: title,
                        value: value
                    });
                },

                componentWillMount: function componentWillMount() {
                    var editor = this.props.editor.get('nativeEditor');

                    var editorCombo = RICH_COMBO_DEFS[editor.name][richComboName];

                    this._items = [];

                    this.setValue = this._setValue;

                    if (editorCombo.init) {
                        editorCombo.init.call(this);
                    }

                    if (editorCombo.onRender) {
                        editorCombo.onRender.call(this);
                    }
                },

                componentWillUnmount: function componentWillUnmount() {
                    this._cacheValue(this.state.value);

                    this.setValue = this._cacheValue;
                },

                getInitialState: function getInitialState() {
                    return {
                        value: RICH_COMBO_DEFS[editor.name][richComboName].currentValue
                    };
                },

                getValue: function getValue() {
                    return this.state.value;
                },

                render: function render() {
                    var editor = this.props.editor.get('nativeEditor');

                    var richComboLabel = RICH_COMBO_DEFS[editor.name][richComboName].currentValue || richComboDefinition.label;

                    var itemsList;

                    if (this.props.expanded) {
                        itemsList = this._getItemsList();
                    }

                    return React.createElement(
                        'div',
                        { className: 'ae-container-dropdown ae-has-dropdown' },
                        React.createElement(
                            'button',
                            { 'aria-expanded': this.props.expanded, 'aria-label': richComboLabel, className: 'ae-toolbar-element', onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: richComboLabel },
                            React.createElement(
                                'div',
                                { className: 'ae-container' },
                                React.createElement(
                                    'span',
                                    { className: 'ae-container-dropdown-selected-item' },
                                    richComboLabel
                                ),
                                React.createElement('span', { className: 'ae-icon-arrow' })
                            )
                        ),
                        itemsList
                    );
                },

                _cacheValue: function _cacheValue(value) {
                    var editor = this.props.editor.get('nativeEditor');

                    RICH_COMBO_DEFS[editor.name][richComboName].currentValue = value;
                },

                _getItems: function _getItems() {
                    var richCombo = this;

                    var items = this._items.map(function (item) {
                        return React.createElement(
                            'li',
                            { key: item.title, role: 'option' },
                            React.createElement('button', { className: 'ae-toolbar-element', dangerouslySetInnerHTML: { __html: item.preview }, 'data-value': item.value, onClick: richCombo._onClick })
                        );
                    });

                    return items;
                },

                _getItemsList: function _getItemsList() {
                    return React.createElement(
                        AlloyEditor.ButtonDropdown,
                        { onDismiss: this.props.toggleDropdown },
                        this._getItems()
                    );
                },

                _onClick: function _onClick(event) {
                    var editor = this.props.editor.get('nativeEditor');

                    var editorCombo = RICH_COMBO_DEFS[editor.name][richComboName];

                    if (editorCombo.onClick) {
                        var newValue = event.currentTarget.getAttribute('data-value');

                        editorCombo.onClick.call(this, newValue);

                        RICH_COMBO_DEFS[editor.name][richComboName].currentValue = newValue;

                        editor.fire('actionPerformed', this);
                    }
                },

                _setValue: function _setValue(value) {
                    this.setState({
                        value: value
                    });
                }
            }));

            AlloyEditor.Buttons[richComboName] = RichComboBridge;
        }

        return RichComboBridge;
    };

    /* istanbul ignore else */
    if (!CKEDITOR.plugins.get('richcombo')) {
        CKEDITOR.UI_RICHCOMBO = 'richcombo';

        CKEDITOR.plugins.add('richcombo', {});
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor RichCombo plugin. It takes over the
     * responsibility of registering and creating rich combo elements via:
     * - editor.ui.addRichCombo(name, definition)
     * - editor.ui.add(name, CKEDITOR.UI_RICHCOMBO, definition)
     *
     * @class CKEDITOR.plugins.ae_richcombobridge
     * @requires CKEDITOR.plugins.ae_uibridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_richcombobridge', {
        requires: ['ae_uibridge'],

        /**
         * Set the add handler for UI_RICHCOMBO to our own. We do this in the init phase to override
         * the one in the original plugin in case it's present
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        init: function init(editor) {
            editor.ui.addRichCombo = function (richComboName, richComboDefinition) {
                this.add(richComboName, CKEDITOR.UI_RICHCOMBO, richComboDefinition);
            };

            editor.ui.addHandler(CKEDITOR.UI_RICHCOMBO, {
                add: generateRichComboBridge,
                create: function create(richComboDefinition) {
                    var richComboName = 'richComboBridge' + (Math.random() * 1e9 >>> 0);
                    var RichComboBridge = generateRichComboBridge(richComboName, richComboDefinition);

                    return new RichComboBridge();
                }
            });
        }
    });
})();
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_uibridge')) {
        return;
    }

    /**
     * CKEditor plugin that extends CKEDITOR.ui.add function so an add handler can be specified
     * on top of the original ones. It bridges the calls to add components via:
     * - editor.ui.add(name, type, definition)
     *
     * @class CKEDITOR.plugins.ae_uibridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_uibridge', {
        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         *
         * @method beforeInit
         * @param {Object} editor The current editor instance
         */
        beforeInit: function beforeInit(editor) {
            var originalUIAddFn = editor.ui.add;

            editor.ui.add = function (name, type, definition) {
                originalUIAddFn.apply(this, arguments);

                var typeHandler = this._.handlers[type];

                if (typeHandler && typeHandler.add) {
                    typeHandler.add(name, definition, editor);
                }
            };
        }
    });
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function () {
    'use strict';

    /**
     * Provides core language utilities.
     *
     * @class Lang
     */

    var Lang = {
        /**
         * Check if the passed value is an array.
         *
         * @static
         * @method isArray
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is an array, false otherwise.
         */
        isArray: function isArray(value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        },

        /**
         * Check if the passed value is boolean.
         *
         * @static
         * @method isBoolean
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is boolean, false otherwise.
         */
        isBoolean: function isBoolean(value) {
            return typeof value === 'boolean';
        },

        /**
         * Check if the passed value is a function.
         *
         * @static
         * @method isFunction
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is a function, false otherwise.
         */
        isFunction: function isFunction(value) {
            return typeof value === 'function';
        },

        /**
         * Check if the passed value is NULL.
         *
         * @static
         * @method isNull
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is NULL, false otherwise.
         */
        isNull: function isNull(value) {
            return value === null;
        },

        /**
         * Check if the passed value is number.
         *
         * @static
         * @method isNumber
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is number, false otherwise.
         */
        isNumber: function isNumber(value) {
            return typeof value === 'number' && isFinite(value);
        },

        /**
         * Check if the passed value is an object
         *
         * @static
         * @method isObject
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is an object, false otherwise.
         */
        isObject: function isObject(value) {
            var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);

            return value && (valueType === 'object' || Lang.isFunction(value));
        },

        /**
         * Check if the passed value is a string.
         *
         * @static
         * @method isString
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is a string, false otherwise.
         */
        isString: function isString(value) {
            return typeof value === 'string';
        },

        /**
         * Adds all properties from the supplier to the receiver.
         * The function will add all properties, not only these owned by the supplier.
         *
         * @static
         * @method mix
         * @param {Object} receiver The object which will receive properties.
         * @param {Object} supplier The object which provides properties.
         * @return {Object} The modified receiver.
         */
        mix: function mix(receiver, supplier) {
            var hasOwnProperty = Object.prototype.hasOwnProperty;

            for (var key in supplier) {
                if (hasOwnProperty.call(supplier, key)) {
                    receiver[key] = supplier[key];
                }
            }
        },

        /**
         * Converts value to Integer.
         *
         * @static
         * @method toInt
         * @param {Any} value The value which have to be converted to Integer.
         * @return {Integer} The converted value.
         */
        toInt: function toInt(value) {
            return parseInt(value, 10);
        }
    };

    AlloyEditor.Lang = Lang;
})();
'use strict';

(function () {
    'use strict';

    var OOP = {
        /**
         * Sets the prototype, constructor and superclass properties to support an inheritance strategy
         * that can chain constructors and methods. Static members will not be inherited.
         *
         * @static
         * @method extend
         * @param {Function} receiver The class which will extend another class.
         * @param {Function} supplier The class which will provide the properties the child class.
         * @param {Object} protoProps Prototype properties to add/override.
         * @param {Object} staticProps Static properties to add/overwrite.
         * @return {Function} The extended class.
         */
        extend: function extend(receiver, supplier, protoProps, staticProps) {
            if (!supplier || !receiver) {
                throw 'extend failed, verify dependencies';
            }

            var supplierProto = supplier.prototype,
                receiverProto = Object.create(supplierProto);
            receiver.prototype = receiverProto;

            receiverProto.constructor = receiver;
            receiver.superclass = supplierProto;

            // assign constructor property
            if (supplier !== Object && supplierProto.constructor === Object.prototype.constructor) {
                supplierProto.constructor = supplier;
            }

            // add prototype overrides
            if (protoProps) {
                AlloyEditor.Lang.mix(receiverProto, protoProps);
            }

            // add object overrides
            if (staticProps) {
                AlloyEditor.Lang.mix(receiver, staticProps);
            }

            return receiver;
        }
    };

    AlloyEditor.OOP = OOP;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Attribute implementation.
     *
     * @class Attribute
     * @constructor
    */

    function Attribute(config) {
        this.__config__ = config || {};
        this.__ATTRS__ = {};
    }

    Attribute.prototype = {
        constructor: Attribute,

        /**
         * Retrieves the value of an attribute.
         *
         * @method get
         * @param {String} attr The attribute which value should be retrieved.
         * @return {Any} The value of the attribute.
         */
        get: function get(attr) {
            var currentAttr = this.constructor.ATTRS[attr];

            if (!currentAttr) {
                return;
            }

            if (!this._isInitialized(attr)) {
                this._init(attr);
            }

            var curValue = this.__ATTRS__[attr];

            if (currentAttr.getter) {
                curValue = this._callStringOrFunction(currentAttr.getter, curValue);
            }

            return curValue;
        },

        /**
         * Sets the value of an attribute.
         *
         * @method set
         * @param {String} attr The attribute which value should be set.
         * @param {Any} value The value which should be set to the attribute.
         */
        set: function set(attr, value) {
            var currentAttr = this.constructor.ATTRS[attr];

            if (!currentAttr) {
                return;
            }

            if (!this._isInitialized(attr)) {
                this._init(attr);
            }

            if (currentAttr.readOnly) {
                return;
            }

            if (currentAttr.writeOnce && this._isInitialized(attr)) {
                return;
            }

            if (currentAttr.validator && !this._callStringOrFunction(currentAttr.validator, value)) {
                return;
            }

            if (currentAttr.setter) {
                value = this._callStringOrFunction(currentAttr.setter, value);
            }

            this.__ATTRS__[attr] = value;
        },

        /**
         * Calls the provided param as function with the supplied arguments.
         * If param provided as string, a corresponding function in this object will
         * be called. If provided param is a function, it will be directly called.
         *
         * @protected
         * @method _callStringOrFunction
         * @param  {String|Function} stringOrFunction The function which should be called
         * @param  {Any|Array} args The arguments which will be provided to the called function
         * @return {Any} The returned value from the called function
         */
        _callStringOrFunction: function _callStringOrFunction(stringOrFunction, args) {
            var result = null;

            if (!AlloyEditor.Lang.isArray(args)) {
                args = [args];
            }

            if (AlloyEditor.Lang.isString(stringOrFunction) && AlloyEditor.Lang.isFunction(this[stringOrFunction])) {
                result = this[stringOrFunction].apply(this, args);
            } else if (AlloyEditor.Lang.isFunction(stringOrFunction)) {
                result = stringOrFunction.apply(this, args);
            }

            return result;
        },

        /**
         * Initializes an attribute. Sets its default value depending on the flags of the
         * attribute and the passed configuration object to the constructor.
         *
         * @protected
         * @method _init
         * @param {String} attr The name of the attribute which have to be initialized.
         */
        _init: function _init(attr) {
            var value;

            var currentAttr = this.constructor.ATTRS[attr];

            // Check if there is default value or passed one via configuration object
            var hasDefaultValue = Object.prototype.hasOwnProperty.call(currentAttr, 'value');
            var hasPassedValueViaConfig = Object.prototype.hasOwnProperty.call(this.__config__, attr);

            // If there is valueFn, set the value to be the result of invocation of this function
            if (currentAttr.valueFn) {
                value = this._callStringOrFunction(currentAttr.valueFn, value);

                this.__ATTRS__[attr] = value;
            }
            // else if the attribute has readOnly flag, set the default value from the attribute,
            // regardless if there is value or not
            else if (currentAttr.readOnly) {
                    value = currentAttr.value;
                }
                // else if the attribute has writeOnce value, set it from the passed configuration or from the
                // default value, in this order. Otherwise, return miserable.
                else if (currentAttr.writeOnce) {
                        if (hasPassedValueViaConfig) {
                            value = this.__config__[attr];
                        } else if (hasDefaultValue) {
                            value = currentAttr.value;
                        } else {
                            return;
                        }
                    }
                    // These two cases below are easy - set the value to be from the passed config or
                    // from the default value, in this order.
                    else if (hasPassedValueViaConfig) {
                            value = this.__config__[attr];
                        } else if (hasDefaultValue) {
                            value = currentAttr.value;
                        }

            // If there is validator, and user passed config object - check the returned value.
            // If it is false, then set as initial value the default one.
            // However, if there is no default value, just return.
            if (currentAttr.validator && hasPassedValueViaConfig && !this._callStringOrFunction(currentAttr.validator, value)) {
                if (hasDefaultValue) {
                    value = currentAttr.value;
                } else {
                    return;
                }
            }

            // If there is setter and user passed config object - pass the value thought the setter.
            // The value might be one from defaultFn, default value or provided from the config.
            if (currentAttr.setter && hasPassedValueViaConfig) {
                value = this._callStringOrFunction(currentAttr.setter, value);
            }

            // Finally, set the value as initial value to the storage with values.
            this.__ATTRS__[attr] = value;
        },

        /**
         * Checks if an attribute is initialized. An attribute is considered as initialized
         * when there is an own property with this name in the local collection of attribute values
         * for the current instance.
         *
         * @protected
         * @method _isInitialized
         * @param {String} attr The attribute which should be checked if it is initialized.
         * @return {Boolean} Returns true if the attribute has been initialized, false otherwise.
         */
        _isInitialized: function _isInitialized(attr) {
            return Object.prototype.hasOwnProperty.call(this.__ATTRS__, attr);
        }
    };

    AlloyEditor.Attribute = Attribute;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Quick and dirty impl of Base class.
     *
     * @class Base
     * @constructor
     */

    function Base(config) {
        Base.superclass.constructor.call(this, config);

        this.init(config);
    }

    AlloyEditor.OOP.extend(Base, AlloyEditor.Attribute, {
        /**
         * Calls the `initializer` method of each class which extends Base starting from the parent to the child.
         * Will pass the configuration object to each initializer method.
         *
         * @method init
         * @param {Object} config Configuration object
         */
        init: function init(config) {
            this._callChain('initializer', config);
        },

        /**
         * Calls the `destructor` method of each class which extends Base starting from the parent to the child.
         *
         * @method destroy
         */
        destroy: function destroy() {
            this._callChain('destructor');
        },

        /**
         * Calls a method of each class, which is being present in the hierarchy starting from parent to the child.
         *
         * @protected
         * @method _callChain
         * @param {String} wat  The method, which should be invoked
         * @param {Object|Array} args The arguments with which the method should be invoked
         */
        _callChain: function _callChain(wat, args) {
            var arr = [];

            var ctor = this.constructor;

            while (ctor) {
                if (AlloyEditor.Lang.isFunction(ctor.prototype[wat])) {
                    arr.push(ctor.prototype[wat]);
                }

                ctor = ctor.superclass ? ctor.superclass.constructor : null;
            }

            arr = arr.reverse();

            args = AlloyEditor.Lang.isArray(args) ? args : [args];

            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];

                item.apply(this, args);
            }
        }
    });

    AlloyEditor.Base = Base;
})();
'use strict';

(function () {
    'use strict';

    var tableSelectionGetArrowBoxClasses = function tableSelectionGetArrowBoxClasses() {
        return 'ae-arrow-box ae-arrow-box-bottom';
    };

    AlloyEditor.SelectionGetArrowBoxClasses = {
        table: tableSelectionGetArrowBoxClasses
    };
})();
'use strict';

(function () {
    'use strict';

    // Default gutter value for toolbar positioning

    var DEFAULT_GUTTER = {
        left: 0,
        top: 0
    };

    /**
     * Centers a Toolbar according to given rectangle
     *
     * @method centerToolbar
     * @param {Object} toolbar The toolbar to be centered
     * @param {Object} rect The rectangle according to which the Toolbar will be centered
     */
    var centerToolbar = function centerToolbar(toolbar, rect) {
        var toolbarNode = ReactDOM.findDOMNode(toolbar);

        var halfNodeWidth = toolbarNode.offsetWidth / 2;
        var scrollPosition = new CKEDITOR.dom.window(window).getScrollPosition();

        var gutter = toolbar.props.gutter || DEFAULT_GUTTER;

        var widgetXY = toolbar.getWidgetXYPoint(rect.left + rect.width / 2 - scrollPosition.x, rect.top + scrollPosition.y, CKEDITOR.SELECTION_BOTTOM_TO_TOP);

        toolbar.moveToPoint([widgetXY[0], widgetXY[1]], [rect.left + rect.width / 2 - halfNodeWidth - scrollPosition.x, rect.top - toolbarNode.offsetHeight + scrollPosition.y - gutter.top]);
    };

    /**
     * Sets the position of a toolbar according to the position of the selected image
     *
     * @method imageSelectionSetPosition
     * @param {Object} payload Payload, should contain the selection data for retrieving the
     * client rectangle of the selected image
     * @return {Boolean} True, in all cases
     */
    var imageSelectionSetPosition = function imageSelectionSetPosition(payload) {
        centerToolbar(this, payload.selectionData.element.getClientRect());

        return true;
    };

    /**
     * Sets the position of a toolbar according to the position of the selected image
     *
     * @method tableSelectionSetPosition
     * @param {Object} payload Object, which contains the selection data for retrieving the
     * client rectangle of the selected table
     * @return {Boolean} True, in all cases
     */
    var tableSelectionSetPosition = function tableSelectionSetPosition(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        var table = new CKEDITOR.Table(nativeEditor).getFromSelection();

        centerToolbar(this, table.getClientRect());

        return true;
    };

    AlloyEditor.SelectionSetPosition = {
        image: imageSelectionSetPosition,
        table: tableSelectionSetPosition
    };
})();
'use strict';

(function () {
    'use strict';

    var _isRangeAtElementEnd = function _isRangeAtElementEnd(range, element) {
        // Finding if a range is at the end of an element is somewhat tricky due to how CKEditor handles
        // ranges. It might depend on wether a source node inside the element is selected or not. For now,
        // we need to cover the following cases:
        //
        // - The text length of the element is the same as the endOffset of the range
        // - Both start and end containers match the element and the start and end offsets are 1

        return element.getText().length === range.endOffset || element.equals(range.startContainer) && element.equals(range.endContainer) && range.startOffset === range.endOffset && range.endOffset === 1;
    };

    var embedSelectionTest = function embedSelectionTest(payload) {
        var selectionData = payload.data.selectionData;

        return !!(selectionData.element && selectionData.element.getAttribute('data-widget') === 'ae_embed');
    };

    var linkSelectionTest = function linkSelectionTest(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');
        var range = nativeEditor.getSelection().getRanges()[0];

        var element;

        return !!(nativeEditor.isSelectionEmpty() && (element = new CKEDITOR.Link(nativeEditor).getFromSelection()) && element.getText().length !== range.endOffset && !element.isReadOnly() && !_isRangeAtElementEnd(range, element));
    };

    var imageSelectionTest = function imageSelectionTest(payload) {
        var selectionData = payload.data.selectionData;

        return !!(selectionData.element && selectionData.element.getName() === 'img' && !selectionData.element.isReadOnly());
    };

    var textSelectionTest = function textSelectionTest(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        var selectionEmpty = nativeEditor.isSelectionEmpty();

        var selectionData = payload.data.selectionData;

        return !!(!selectionData.element && selectionData.region && !selectionEmpty && !nativeEditor.getSelection().getCommonAncestor().isReadOnly());
    };

    var tableSelectionTest = function tableSelectionTest(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        var table = new CKEDITOR.Table(nativeEditor);
        var element = table.getFromSelection();

        return !!(element && table.isEditable(element));
    };

    AlloyEditor.SelectionTest = {
        embed: embedSelectionTest,
        image: imageSelectionTest,
        link: linkSelectionTest,
        table: tableSelectionTest,
        text: textSelectionTest
    };
})();
'use strict';

(function () {
    'use strict';

    var Selections = [{
        name: 'embed',
        buttons: ['embedRemove', 'embedEdit'],
        test: AlloyEditor.SelectionTest.embed
    }, {
        name: 'link',
        buttons: ['linkEdit'],
        test: AlloyEditor.SelectionTest.link
    }, {
        name: 'image',
        buttons: ['imageLeft', 'imageCenter', 'imageRight'],
        setPosition: AlloyEditor.SelectionSetPosition.image,
        test: AlloyEditor.SelectionTest.image
    }, {
        name: 'text',
        buttons: ['styles', 'bold', 'italic', 'underline', 'link', 'twitter'],
        test: AlloyEditor.SelectionTest.text
    }, {
        name: 'table',
        buttons: ['tableHeading', 'tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
        getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
        setPosition: AlloyEditor.SelectionSetPosition.table,
        test: AlloyEditor.SelectionTest.table
    }];

    AlloyEditor.Selections = Selections;
})();
'use strict';

(function () {
    'use strict';

    /**
     * AlloyEditor main class. Creates instance of the editor and provides the user configuration
     * to the UI.
     *
     * @class Core
     * @constructor
     */

    function Core(config) {
        Core.superclass.constructor.call(this, config);
    }

    AlloyEditor.OOP.extend(Core, AlloyEditor.Base, {
        /**
         * Initializer lifecycle implementation for the AlloyEditor class. Creates a CKEditor
         * instance, passing it the provided configuration attributes.
         *
         * @protected
         * @method initializer
         * @param config {Object} Configuration object literal for the editor.
         */
        initializer: function initializer(config) {

            var node = this.get('srcNode');

            if (this.get('enableContentEditable')) {
                node.setAttribute('contenteditable', 'true');
            }

            var editor = CKEDITOR.inline(node);

            editor.config.allowedContent = this.get('allowedContent');

            editor.config.toolbars = this.get('toolbars');

            editor.config.removePlugins = this.get('removePlugins');
            editor.config.extraPlugins = this.get('extraPlugins');
            editor.config.placeholderClass = this.get('placeholderClass');

            editor.config.pasteFromWordRemoveStyles = false;
            editor.config.pasteFromWordRemoveFontStyles = false;

            editor.config.selectionKeystrokes = this.get('selectionKeystrokes');

            AlloyEditor.Lang.mix(editor.config, config);

            editor.once('contentDom', function () {
                if (editor.config.readOnly) {
                    this._addReadOnlyLinkClickListener(editor);
                }

                var editable = editor.editable();

                editable.addClass('ae-editable');

                editable.editor.on('readOnly', this._onReadOnlyChangeFn.bind(this));
            }.bind(this));

            AlloyEditor.loadLanguageResources(this._renderUI.bind(this));

            this._editor = editor;
        },

        /**
         * Destructor lifecycle implementation for the AlloyEdtor class. Destroys the CKEditor
         * instance and destroys all created toolbars.
         *
         * @protected
         * @method destructor
         */
        destructor: function destructor() {
            this._destroyed = true;

            if (this._editorUIElement) {
                ReactDOM.unmountComponentAtNode(this._editorUIElement);
                this._editorUIElement.parentNode.removeChild(this._editorUIElement);
            }

            var nativeEditor = this.get('nativeEditor');

            if (nativeEditor) {
                var editable = nativeEditor.editable();

                if (editable) {
                    editable.removeClass('ae-editable');

                    if (this.get('enableContentEditable')) {
                        this.get('srcNode').setAttribute('contenteditable', 'false');
                    }
                }

                this._clearSelections();

                nativeEditor.destroy();
            }
        },

        /**
         * Clear selections from window object
         *
         * @protected
         * @method _clearSelections
         */
        _clearSelections: function _clearSelections() {
            var nativeEditor = this.get('nativeEditor');
            var isMSSelection = typeof window.getSelection != 'function';

            if (isMSSelection) {
                nativeEditor.document.$.selection.empty();
            } else {
                nativeEditor.document.getWindow().$.getSelection().removeAllRanges();
            }
        },

        /**
         * Method to set default link behavior
         *
         * @protected
         * @method _addReadOnlyLinkClickListener
         * @param {Object} editor
         */
        _addReadOnlyLinkClickListener: function _addReadOnlyLinkClickListener(editor) {
            editor.editable().on('click', this._defaultReadOnlyClickFn, this, {
                editor: editor
            });
        },

        /**
         * Called on `click` event when the editor is in read only mode. Navigates to link's URL or opens
         * the link in a new window.
         *
         * @event readOnlyClick
         * @protected
         * @method _defaultReadOnlyClickFn
         * @param {Object} event The fired `click` event payload
         */
        _defaultReadOnlyClickFn: function _defaultReadOnlyClickFn(event) {
            if (event.listenerData.editor.editable().editor.fire('readOnlyClick', event.data) !== false) {
                var ckElement = new CKEDITOR.dom.elementPath(event.data.getTarget(), this);
                var link = ckElement.lastElement;

                if (link) {
                    var href = link.$.attributes.href ? link.$.attributes.href.value : null;

                    var target = link.$.attributes.target ? link.$.attributes.target.value : null;

                    this._redirectLink(href, target);
                }
            }
        },

        /**
         * Retrieves the native CKEditor instance. Having this, the developer may use the API of CKEditor OOTB.
         *
         * @protected
         * @method _getNativeEditor
         * @return {Object} The current instance of CKEditor.
         */
        _getNativeEditor: function _getNativeEditor() {
            return this._editor;
        },

        /**
         * Fired when readonly value is changed. Adds click event listener to handle links in readonly mode.
         *
         * @protected
         * @method _onReadOnlyChange
         * @param {Object} event The fired event
         */
        _onReadOnlyChangeFn: function _onReadOnlyChangeFn(event) {
            if (event.editor.readOnly) {
                this._addReadOnlyLinkClickListener(event.editor);
            } else {
                event.editor.editable().removeListener('click', this._defaultReadOnlyClickFn);
            }
        },

        /**
         * Redirects the browser to a given link
         *
         * @protected
         * @method _redirectLink
         * @param {string} href The href to take the browser to
         * @param {string=} target Specifies where to display the link
         */
        _redirectLink: function _redirectLink(href, target) {
            if (target && href) {
                window.open(href, target);
            } else if (href) {
                window.location.href = href;
            }
        },

        /**
         * Renders the specified from the user toolbars.
         *
         * @protected
         * @method _renderUI
         */
        _renderUI: function _renderUI() {
            if (!this._destroyed) {
                var editorUIElement = document.createElement('div');
                editorUIElement.className = 'ae-ui';

                var uiNode = this.get('uiNode') || document.body;

                uiNode.appendChild(editorUIElement);

                this._mainUI = ReactDOM.render(React.createElement(AlloyEditor.UI, {
                    editor: this,
                    eventsDelay: this.get('eventsDelay'),
                    toolbars: this.get('toolbars')
                }), editorUIElement);

                this._editorUIElement = editorUIElement;

                this.get('nativeEditor').fire('uiReady');
            }
        },

        /**
         * The function returns an HTML element from the passed value. If the passed value is a string, it should be
         * the Id of the element which have to be retrieved from the DOM.
         * If an HTML Element is passed, the element itself will be returned.
         *
         * @method _toElement
         * @protected
         * @param {!(String|HTMLElement)} value String, which have to correspond to an HTML element from the DOM,
         * or the HTML element itself. If Id is passed, the HTML element will be retrieved from the DOM.
         * @return {HTMLElement} An HTML element.
         */
        _toElement: function _toElement(value) {
            if (AlloyEditor.Lang.isString(value)) {
                value = document.getElementById(value);
            }

            return value;
        },

        /**
         * Validates the allowed content attribute. Look
         * [here](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent) for more information about the
         * supported values.
         *
         * @protected
         * @method _validateAllowedContent
         * @param {Any} The value to be checked
         * @return {Boolean} True if the current value is valid configuration, false otherwise
         */
        _validateAllowedContent: function _validateAllowedContent(value) {
            return AlloyEditor.Lang.isString(value) || AlloyEditor.Lang.isObject(value) || AlloyEditor.Lang.isBoolean(value);
        },

        /**
         * Validates the value of toolbars attribute
         *
         * @protected
         * @method _validateToolbars
         * @param {Any} The value to be checked
         * @return {Boolean} True if the current value is valid toolbars configuration, false otherwise
         */
        _validateToolbars: function _validateToolbars(value) {
            return AlloyEditor.Lang.isObject(value) || AlloyEditor.Lang.isNull(value);
        }
    }, {
        ATTRS: {
            /**
             * Configures the allowed content for the current instance of AlloyEditor.
             * Look on the [official CKEditor API](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent)
             * for more information about the valid values.
             *
             * @property allowedContent
             * @default true
             * @writeOnce
             * @type {Boolean, String, Object}
             */
            allowedContent: {
                validator: '_validateAllowedContent',
                value: true,
                writeOnce: true
            },

            /**
             * Specifies whether AlloyEditor set the contenteditable attribute
             * to "true" on its srcNode.
             *
             * @property enableContentEditable
             * @type Boolean
             * @default true
             * @writeOnce
             */
            enableContentEditable: {
                validator: AlloyEditor.Lang.isBoolean,
                value: true,
                writeOnce: true
            },

            /**
             * The delay (timeout), in ms, after which events such like key or mouse events will be processed.
             *
             * @property eventsDelay
             * @type {Number}
             */
            eventsDelay: {
                validator: AlloyEditor.Lang.isNumber,
                value: 100
            },

            /**
             * Specifies the extra plugins which have to be loaded to the current CKEditor instance in order to
             * make AlloyEditor to work properly.
             *
             * @property extraPlugins
             * @default 'uicore,selectionregion,dragresize,addimages,placeholder,tabletools,tableresize,autolink'
             * @writeOnce
             * @type {String}
             */
            extraPlugins: {
                validator: AlloyEditor.Lang.isString,
                value: 'ae_uicore,ae_selectionregion,ae_selectionkeystrokes,ae_dragresize,ae_imagealignment,ae_addimages,ae_placeholder,ae_tabletools,ae_tableresize,ae_autolink,ae_embed,ae_autolist',
                writeOnce: true
            },

            /**
             * Retrieves the native CKEditor instance. Having this, the developer may use the full API of CKEditor.
             *
             * @property nativeEditor
             * @readOnly
             * @type {Object}
             */
            nativeEditor: {
                getter: '_getNativeEditor',
                readOnly: true
            },

            /**
             * Specifies the class, which should be added by Placeholder plugin
             * {{#crossLink "CKEDITOR.plugins.ae_placeholder}}{{/crossLink}}
             * when editor is not focused.
             *
             * @property placeholderClass
             * @default 'ae-placeholder'
             * @writeOnce
             * @type {String}
             */
            placeholderClass: {
                validator: AlloyEditor.Lang.isString,
                value: 'ae-placeholder',
                writeOnce: true
            },

            /**
             * Specifies the plugins, which come by default with CKEditor, but which are not needed by AlloyEditor.
             * These plugins add the default UI for CKeditor, which is no more needed. Please note that AlloyEdtor
             * comes with its own highly optimized copy of CKEditor (just customized via their official download page).
             * This version does not come with the unneeded plugins, so the value of this property won't be needed.
             * However, if you decide to go with the OOTB version of CKEditor, you will have to remove some of the
             * plugins if you decide to use AlloyEditor. Keep in mind that removing these plugins doesn't remove them
             * entirely from CKEditor. It just removes them from its current instance, in which you will use different
             * UI - those of AlloyEditor. You will be fully able to use both OOTB CKEditor and AlloyEditor on the same
             * page!
             *
             * @property removePlugins
             * @default 'contextmenu,toolbar,elementspath,resize,liststyle,link'
             * @writeOnce
             * @type {String}
             */
            removePlugins: {
                validator: AlloyEditor.Lang.isString,
                value: 'contextmenu,toolbar,elementspath,resize,liststyle,link',
                writeOnce: true
            },

            /**
             * Array of manual selection triggers. They can be configured to manually show a specific selection toolbar
             * by forcing the selection type. A selectionKeystroke item consists of a keys property with a [CKEditor keystroke
             * definition](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-keystrokes) and a selection property with
             * the selection name to trigger.
             *
             * @property selectionKeystrokes
             * @type {Array}
             */
            selectionKeystrokes: {
                validator: AlloyEditor.Lang.isArray,
                value: [{
                    keys: CKEDITOR.CTRL + 76 /*L*/
                    , selection: 'link'
                }, {
                    keys: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76 /*L*/
                    , selection: 'embed'
                }]
            },

            /**
             * The Node ID or HTMl node, which AlloyEditor should use as an editable area.
             *
             * @property srcNode
             * @type String | Node
             * @writeOnce
             */
            srcNode: {
                setter: '_toElement',
                writeOnce: true
            },

            /**
             * The toolbars configuration for this editor instance
             *
             * @property {Object} toolbars
             */
            toolbars: {
                validator: '_validateToolbars',
                value: {
                    add: {
                        buttons: ['image', 'embed', 'camera', 'hline', 'table'],
                        tabIndex: 2
                    },
                    styles: {
                        selections: AlloyEditor.Selections,
                        tabIndex: 1
                    }
                }
            },

            /**
             * The Node ID or HTMl node, where AlloyEditor's UI should be rendered.
             *
             * @property uiNode
             * @type String | Node
             * @writeOnce
             */
            uiNode: {
                setter: '_toElement',
                writeOnce: true
            }
        }
    });

    CKEDITOR.event.implementOn(Core);

    AlloyEditor.Core = Core;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonActionStyle is a mixin that provides applying style implementation for a
     * button based on the `applyStyle` and `removeStyle` API of CKEDITOR.
     *
     * To execute properly, the component has to expose the following methods which can be obtained
     * out of the box using the {{#crossLink "ButtonStyle"}}{{/crossLink}} mixin:
     * - `Function` {{#crossLink "ButtonStyle/isActive"}}{{/crossLink}} to check the active state
     * - `Function` {{#crossLink "ButtonStyle/getStyle"}}{{/crossLink}} to return the style that should be applied
     *
     * @class ButtonActionStyle
     */

    var ButtonActionStyle = {
        /**
         * Removes or applies the component style to the current selection.
         *
         * @method applyStyle
         */
        applyStyle: function applyStyle() {
            if (AlloyEditor.Lang.isFunction(this.isActive) && AlloyEditor.Lang.isFunction(this.getStyle)) {
                var editor = this.props.editor.get('nativeEditor');

                editor.getSelection().lock();

                if (this.isActive()) {
                    editor.removeStyle(this.getStyle());
                } else {
                    editor.applyStyle(this.getStyle());
                }

                editor.getSelection().unlock();

                editor.fire('actionPerformed', this);
            }
        }
    };

    AlloyEditor.ButtonActionStyle = ButtonActionStyle;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonCommandActive is a mixin that provides an `isActive` method to determine if
     * a context-aware command is currently in an active state.
     *
     * @class ButtonCommandActive
     */

    var ButtonCommandActive = {
        /**
         * Checks if the command is active in the current selection.
         *
         * @method isActive
         * @return {Boolean} True if the command is active, false otherwise.
         */
        isActive: function isActive() {
            var editor = this.props.editor.get('nativeEditor');

            var command = editor.getCommand(this.props.command);

            return command ? command.state === CKEDITOR.TRISTATE_ON : false;
        }
    };

    AlloyEditor.ButtonCommandActive = ButtonCommandActive;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonCommand is a mixin that executes a command via CKEDITOR's API.
     *
     * @class ButtonCommand
     */

    var ButtonCommand = {
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The command that should be executed.
             *
             * @property {String} command
             */
            command: React.PropTypes.string.isRequired,

            /**
             * Indicates that the command may cause the editor to have a different.
             *
             * @property {boolean} modifiesSelection
             */
            modifiesSelection: React.PropTypes.bool
        },

        /**
         * Executes a CKEditor command and fires `actionPerformed` event.
         *
         * @param {Object=} data Optional data to be passed to CKEDITOR's `execCommand` method.
         *
         * @method execCommand
         */
        execCommand: function execCommand(data) {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand(this.props.command, data);

            if (this.props.modifiesSelection) {
                editor.selectionChange(true);
            }

            editor.fire('actionPerformed', this);
        }
    };

    AlloyEditor.ButtonCommand = ButtonCommand;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonKeystroke is a mixin that provides a `keystroke` prop that allows configuring
     * a function of the instance to be invoked upon the keystroke activation.
     *
     * @class ButtonKeystroke
     */

    var ButtonKeystroke = {
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The keystroke definition. An object with the following properties:
             * - fn: The function to be executed
             * - keys: The keystroke definition, as expected by http://docs.ckeditor.com/#!/api/CKEDITOR.editor-method-setKeystroke
             * - name: The name for the CKEditor command that will be created. If empty,
             * a random name will be created on the fly
             * @property {Object} keystroke
             */
            keystroke: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         *
         * @method componentWillMount
         */
        componentWillMount: function componentWillMount() {
            var nativeEditor = this.props.editor.get('nativeEditor');
            var keystroke = this.props.keystroke;

            var commandName = keystroke.name || (Math.random() * 1e9 >>> 0).toString();

            var command = nativeEditor.getCommand(commandName);

            if (!command) {
                command = new CKEDITOR.command(nativeEditor, {
                    exec: function (editor) {
                        var keystrokeFn = keystroke.fn;

                        if (AlloyEditor.Lang.isString(keystrokeFn)) {
                            this[keystrokeFn].call(this, editor);
                        } else if (AlloyEditor.Lang.isFunction(keystrokeFn)) {
                            keystrokeFn.call(this, editor);
                        }
                    }.bind(this)
                });

                nativeEditor.addCommand(commandName, command);
            }

            this._defaultKeystrokeCommand = nativeEditor.keystrokeHandler.keystrokes[keystroke.keys];

            nativeEditor.setKeystroke(keystroke.keys, commandName);
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @method componentWillUnmount
         */
        componentWillUnmount: function componentWillUnmount() {
            this.props.editor.get('nativeEditor').setKeystroke(this.props.keystroke.keys, this._defaultKeystrokeCommand);
        }
    };

    AlloyEditor.ButtonKeystroke = ButtonKeystroke;
})();
'use strict';

(function () {
  'use strict';

  /**
   * ButtonCfgProps is a mixin that provides a style prop and some methods to apply the resulting
   * style and checking if it is present in a given path or selection.
   *
   * @class ButtonCfgProps
   */

  var ButtonCfgProps = {
    // Allows validating props being passed to the component.
    propTypes: {
      /**
       * The editor instance where the component is being used.
       *
       * @property {Object} editor
       */
      editor: React.PropTypes.object.isRequired
    },

    /**
     * Merges the properties, passed to the current component with user's configuration
     * via `buttonCfg` property.
     *
     * @method mergeButtonCfgProps
     * @param {Object} props The properties to be merged with the provided configuration for this
     * button. If not passed, the user configuration will be merged with `this.props`
     * @return {Object} The merged properties
     */
    mergeButtonCfgProps: function mergeButtonCfgProps(props) {
      props = props || this.props;

      var nativeEditor = this.props.editor.get('nativeEditor');
      var buttonCfg = nativeEditor.config.buttonCfg || {};
      var result = CKEDITOR.tools.merge(props, buttonCfg[AlloyEditor.ButtonLinkEdit.key]);

      return result;
    }
  };

  AlloyEditor.ButtonCfgProps = ButtonCfgProps;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonStateClasses is a mixin that decorates the domElement of a component
     * with different CSS classes based on the current state of the element.
     *
     * To check for state, the component can expose the following methods:
     * - `Function` **isActive** to check the active state
     * - `Function` **isDisabled** to check the disabled state
     *
     * @class ButtonStateClasses
     */

    var ButtonStateClasses = {
        /**
         * Returns the list of state classes associated to the current element's state, according
         * to the results of the isActive and isDisabled methods.
         *
         * @method getStateClasses
         * @return {String} A string with the state CSS classes.
         */
        getStateClasses: function getStateClasses() {
            var stateClasses = '';

            // Check for active state
            if (AlloyEditor.Lang.isFunction(this.isActive) && this.isActive()) {
                stateClasses += 'ae-button-pressed';
            }

            // Check for disabled state
            if (AlloyEditor.Lang.isFunction(this.isDisabled) && this.isDisabled()) {
                stateClasses += ' ae-button-disabled';
            }

            return stateClasses;
        }
    };

    AlloyEditor.ButtonStateClasses = ButtonStateClasses;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonStyle is a mixin that provides a style prop and some methods to apply the resulting
     * style and checking if it is present in a given path or selection.
     *
     * @class ButtonStyle
     */

    var ButtonStyle = {
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The style the button should handle. Allowed values are:
             * - Object as described by http://docs.ckeditor.com/#!/api/CKEDITOR.style.
             * - String pointing to an object inside the editor instance configuration. For example, `style = 'coreStyles_bold'` will try to
             * retrieve the style object from `editor.config.coreStyles_bold`. Nested properties such as `style = 'myplugin.myConfig.myStyle'`
             * are also supported and will try to retrieve the style object from the editor configuration as well.
             *
             * @property {Object|String} style
             */
            style: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.string])
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         *
         * @method componentWillMount
         */
        componentWillMount: function componentWillMount() {
            var Lang = AlloyEditor.Lang;
            var style = this.props.style;

            if (Lang.isString(style)) {
                var parts = style.split('.');
                var currentMember = this.props.editor.get('nativeEditor').config;
                var property = parts.shift();

                while (property && Lang.isObject(currentMember) && Lang.isObject(currentMember[property])) {
                    currentMember = currentMember[property];
                    property = parts.shift();
                }

                if (Lang.isObject(currentMember)) {
                    style = currentMember;
                }
            }

            this._style = new CKEDITOR.style(style);
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @method componentWillUnmount
         */
        componentWillUnmount: function componentWillUnmount() {
            this._style = null;
        },

        /**
         * Returns instance of CKEDITOR.style which represents the current button style.
         *
         * @method getStyle
         * @return {CKEDITOR.style} The current style representation.
         */
        getStyle: function getStyle() {
            return this._style;
        },

        /**
         * Checks if style is active in the current selection.
         *
         * @method isActive
         * @return {Boolean} True if style is active, false otherwise.
         */
        isActive: function isActive() {
            var result;

            var editor = this.props.editor.get('nativeEditor');

            var elementPath = editor.elementPath();

            result = this.getStyle().checkActive(elementPath, editor);

            return result;
        }
    };

    AlloyEditor.ButtonStyle = ButtonStyle;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ToolbarButtons is a mixin which provides a list of buttons which have to be
     * displayed on the current toolbar depending on user preferences and given state.
     *
     * @class ToolbarButtons
     */

    var ToolbarButtons = {
        /**
         * Analyzes the current selection and the buttons exclusive mode value to figure out which
         * buttons should be present in a given state.
         *
         * @method getToolbarButtons
         * @param {Array} buttons The buttons could be shown, prior to the state filtering.
         * @param {Object} additionalProps Additional props that should be passed down to the buttons.
         * @return {Array} An Array which contains the buttons that should be rendered.
         */
        getToolbarButtons: function getToolbarButtons(buttons, additionalProps) {
            var buttonProps = {};

            var nativeEditor = this.props.editor.get('nativeEditor');
            var buttonCfg = nativeEditor.config.buttonCfg || {};

            var toolbarButtons = this.filterExclusive(buttons.filter(function (button) {
                return button && (AlloyEditor.Buttons[button] || AlloyEditor.Buttons[button.name]);
            }).map(function (button) {
                if (AlloyEditor.Lang.isString(button)) {
                    buttonProps[button] = buttonCfg[button];
                    button = AlloyEditor.Buttons[button];
                } else if (AlloyEditor.Lang.isString(button.name)) {
                    buttonProps[AlloyEditor.Buttons[button.name].key] = CKEDITOR.tools.merge(buttonCfg[button], button.cfg);
                    button = AlloyEditor.Buttons[button.name];
                }

                return button;
            })).map(function (button) {
                var props = this.mergeExclusiveProps({
                    editor: this.props.editor,
                    key: button.key,
                    tabKey: button.key,
                    tabIndex: this.props.trigger && this.props.trigger.props.tabKey === button.key ? 0 : -1,
                    trigger: this.props.trigger
                }, button.key);

                props = this.mergeDropdownProps(props, button.key);

                if (additionalProps) {
                    props = CKEDITOR.tools.merge(props, additionalProps);
                }

                props = CKEDITOR.tools.merge(props, buttonProps[button.key]);

                return React.createElement(button, props);
            }, this);

            return toolbarButtons;
        }
    };

    AlloyEditor.ToolbarButtons = ToolbarButtons;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Provides functionality for displaying Widget Arrow box on top or on bottom of the widget
     * depending on the point of user interaction with the editor.
     *
     * @class WidgetArrowBox
     */

    var WidgetArrowBox = {
        /**
         * Returns the list of arrow box classes associated to the current element's state. It relies
         * on the getInteractionPoint method to calculate the selection direction.
         *
         * @method getArrowBoxClasses
         * @return {String} A string with the arrow box CSS classes.
         */
        getArrowBoxClasses: function getArrowBoxClasses() {
            var arrowBoxClasses = 'ae-arrow-box';

            if (AlloyEditor.Lang.isFunction(this.getInteractionPoint) && this.getInteractionPoint()) {
                if (this.getInteractionPoint().direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    arrowBoxClasses += ' ae-arrow-box-top';
                } else {
                    arrowBoxClasses += ' ae-arrow-box-bottom';
                }
            }

            return arrowBoxClasses;
        }
    };

    AlloyEditor.WidgetArrowBox = WidgetArrowBox;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Provides functionality for managing different dropdowns inside a widget.
     *
     * @class WidgetDropdown
     */

    var WidgetDropdown = {
        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.setState({
                dropdownTrigger: null,
                itemDropdown: null
            });
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         *
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            return {
                dropdownTrigger: null,
                itemDropdown: null
            };
        },

        /**
         * Merges the provided object with two more properties:
         * - expanded - boolean flag which indicates if an widget should be rendered exclusively.
         * - toggleDropdown - function, which can be used by an widget in order to obtain exclusive state.
         *
         * @method mergeDropdownProps
         * @param {Object} obj The properties container which should be merged with the properties, related
         *    to dropdown state.
         * @param {Object} itemKey They key of an React Widget which contains the dropdown.
         * @return {Object} The merged object.
         */
        mergeDropdownProps: function mergeDropdownProps(obj, itemKey) {
            return CKEDITOR.tools.merge(obj, {
                expanded: this.state.itemDropdown === itemKey ? true : false,
                tabIndex: this.state.dropdownTrigger === itemKey ? 0 : -1,
                toggleDropdown: this.toggleDropdown.bind(this, itemKey)
            });
        },

        /**
         * Sets the active dropdown of the widget or discards the toggled item from the state.
         *
         * @method toggleDropdown
         * @param {Object} itemDropdown The widget which requests to toggle its dropdown.
         * @param {Number} toggleDirection User movement direction when toggled via keyboard.
         */
        toggleDropdown: function toggleDropdown(itemDropdown, toggleDirection) {
            this.setState({
                dropdownTrigger: itemDropdown,
                itemDropdown: itemDropdown !== this.state.itemDropdown ? itemDropdown : null
            }, function () {
                if (!this.state.itemDropdown) {
                    if (this.moveFocus) {
                        this.moveFocus(toggleDirection);
                    } else {
                        ReactDOM.findDOMNode(this).focus();
                    }
                }
            });
        }
    };

    AlloyEditor.WidgetDropdown = WidgetDropdown;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Provides functionality for managing exclusive state of an widget.
     * The exclusive state means that a button may request to be the only rendered
     * widget in its parent container. WidgetExclusive will manage this state by
     * filtering and suppressing the other sibling widgets from displaying.
     *
     * @class WidgetExclusive
     */

    var WidgetExclusive = {
        /**
         * Cancels the exclusive state of an widget.
         *
         * @method cancelExclusive
         * @param {Object} itemExclusive The widget which exclusive state should be canceled.
         */
        cancelExclusive: function cancelExclusive(itemExclusive) {
            if (this.state.itemExclusive === itemExclusive) {
                this.setState({
                    itemExclusive: null
                });
            }
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         * Calling this.setState() within this function will not trigger an additional render.
         *
         * @method componentWillReceiveProps
         * @param {Object} nextProps Object containing the current set of properties.
         */
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            // Receiving properties means that the component is being re-rendered.
            // Re-rendering is triggered by editorInteraction, so we have to
            // reset the exclusive state and render the UI according to the new selection.
            this.setState({
                itemExclusive: null
            });
        },

        /**
         * Filters the items and returns only those with exclusive state.
         *
         * @method filterExclusive
         * @param {Array} items The widgets to be filtered.
         * @return {Array|Object} The item with executive state.
         */
        filterExclusive: function filterExclusive(items) {
            return items.filter(function (item) {
                if (this.state.itemExclusive) {
                    if (this.state.itemExclusive === item.key) {
                        return item;
                    }
                } else {
                    return item;
                }
            }.bind(this));
        },

        /**
         * Merges the provided object with three more properties:
         * - cancelExclusive - function, which can be used by a widget in order to cancel executive state.
         * - renderExclusive - boolean flag which indicates if an widget should be rendered exclusively.
         * - requestExclusive - function, which can be used by a widget in order to obtain exclusive state.
         *
         * @method mergeExclusiveProps
         * @param {Object} obj The properties container which should be merged with the properties, related
         *    to exclusive state.
         * @param {Object} itemKey They key of an React Widget which should be rendered exclusively.
         * @return {Object} The merged object.
         */
        mergeExclusiveProps: function mergeExclusiveProps(obj, itemKey) {
            return CKEDITOR.tools.merge(obj, {
                cancelExclusive: this.cancelExclusive.bind(this, itemKey),
                renderExclusive: this.state.itemExclusive === itemKey,
                requestExclusive: this.requestExclusive.bind(this, itemKey)
            });
        },

        /**
         * Requests and sets exclusive state of an widget.
         *
         * @method requestExclusive
         * @param {Object} itemExclusive The widget which requests exclusive state.
         */
        requestExclusive: function requestExclusive(itemExclusive) {
            this.setState({
                itemExclusive: itemExclusive
            });
        }
    };

    AlloyEditor.WidgetExclusive = WidgetExclusive;
})();
'use strict';

(function () {
    'use strict';

    var DIRECTION_NONE = 0;
    var DIRECTION_NEXT = 1;
    var DIRECTION_PREV = -1;

    var ACTION_NONE = 0;
    var ACTION_MOVE_FOCUS = 1;
    var ACTION_DISMISS_FOCUS = 2;

    /**
     * WidgetFocusManager is a mixin that provides keyboard navigation inside a widget. To do this,
     * it exposes the following props and methods:
     *
     * @class WidgetFocusManager
     */
    var WidgetFocusManager = {
        // Allows validating props being passed to the component.
        propTypes: {

            /**
             * Callback method to be invoked when the focus manager is to be dismissed. This happens
             * in the following scenarios if a dismiss callback has been specified:
             * - A dismiss key has been pressed
             * - In a non-circular focus manager, when:
             *     - The active descendant is the first one and a prev key has been pressed.
             *     - The active descendant is the last one and a next key has been pressed.
             *
             * @property {Function} onDismiss
             */
            onDismiss: React.PropTypes.func,

            /**
             * Indicates if focus should be set to the first/last descendant when the limits are reached.
             *
             * @property {boolean} circular
             */
            circular: React.PropTypes.bool.isRequired,

            /**
            * Indicate if should focus the first child of a container
            * @property {Boolean} focusFirstChild
            */
            focusFirstChild: React.PropTypes.bool,

            /**
             * String representing the CSS selector used to define the elements that should be handled.
             *
             * @property {String} descendants
             */
            descendants: React.PropTypes.string.isRequired,

            /**
             * Object representing the keys used to navigate between descendants. The format for the prop is:
             * `{dismiss: value, dismissNext: value, dismissPrev: value, next: value, prev: value}` where
             * value can be both a number or an array of numbers with the allowed keyCodes.
             *
             * @property {Object} keys
             */
            keys: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            this._refresh();
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * Refreshes the descendants list.
         *
         * @method componentDidUpdate
         */
        componentDidUpdate: function componentDidUpdate() {
            this._refresh();
        },

        /**
         * Focuses the current active descendant.
         *
         * Several Widgets can be nested in a component hierarchy by attaching this focus method to
         * the widget DOM node, transferring the DOM focus control to the inner FocusManager.
         *
         * @method focus
         */
        focus: function focus(event) {
            if (!event || this._isValidTarget(event.target)) {
                if (this._descendants) {
                    var activeDescendantEl = this._descendants[this._activeDescendant];
                    // When user clicks with the mouse, the activeElement is already set and there
                    // is no need to focus it. Focusing of the active descendant (usually some button) is required
                    // in case of keyboard navigation, because the focused element might be not the first button,
                    // but the div element, which contains the button.
                    if (document.activeElement !== activeDescendantEl && !this.props.focusFirstChild) {
                        if (this._descendants.indexOf(document.activeElement) === -1) {
                            activeDescendantEl.focus();
                        }
                    }

                    if (event) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }
            }
        },

        /**
         * Handles the key events on a DOM node to execute the appropriate navigation when needed.
         *
         * @param {Object} event The Keyboard event that was detected on the widget DOM node.
         * @method handleKey
         */
        handleKey: function handleKey(event) {
            if (this._isValidTarget(event.target) && this._descendants) {
                var action = this._getFocusAction(event);

                if (action.type) {
                    event.stopPropagation();
                    event.preventDefault();

                    if (action.type === ACTION_MOVE_FOCUS) {
                        this._moveFocus(action.direction);
                    }

                    if (action.type === ACTION_DISMISS_FOCUS) {
                        this.props.onDismiss(action.direction);
                    }
                }
            }
        },

        /**
         * Moves the focus among descendants in the especified direction.
         *
         * @method moveFocus
         * @param {number} direction The direction (1 or -1) of the focus movement among descendants.
         */
        moveFocus: function moveFocus(direction) {
            direction = AlloyEditor.Lang.isNumber(direction) ? direction : 0;

            this._moveFocus(direction);
        },

        /**
         * Returns the action, if any, that a keyboard event in the current focus manager state
         * should produce.
         *
         * @protected
         * @method _getFocusAction
         * @param {object} event The Keyboard event.
         * @return {Object} An action object with type and direction properties.
         */
        _getFocusAction: function _getFocusAction(event) {
            var action = {
                type: ACTION_NONE
            };

            if (this.props.keys) {
                var direction = this._getFocusMoveDirection(event);

                if (direction) {
                    action.direction = direction;
                    action.type = ACTION_MOVE_FOCUS;
                }

                var dismissAction = this._getFocusDismissAction(event, direction);

                if (dismissAction.dismiss) {
                    action.direction = dismissAction.direction;
                    action.type = ACTION_DISMISS_FOCUS;
                }
            }

            return action;
        },

        /**
         * Returns the dismiss action, if any, the focus manager should execute to yield the focus. This
         * will happen in any of these scenarios if a dismiss callback has been specified:
         * - A dismiss key has been pressed
         * - In a non-circular focus manager, when:
         *     - The active descendant is the first one and a prev key has been pressed.
         *     - The active descendant is the last one and a next key has been pressed.
         *
         * @protected
         * @method _getFocusDismissAction
         * @param {Object} event The Keyboard event.
         * @param {Number} focusMoveDirection The focus movement direction (if any).
         * @return {Object} A dismiss action with dismiss and direction properties.
         */
        _getFocusDismissAction: function _getFocusDismissAction(event, focusMoveDirection) {
            var dismissAction = {
                direction: focusMoveDirection,
                dismiss: false
            };

            if (this.props.onDismiss) {
                if (this._isValidKey(event.keyCode, this.props.keys.dismiss)) {
                    dismissAction.dismiss = true;
                }
                if (this._isValidKey(event.keyCode, this.props.keys.dismissNext)) {
                    dismissAction.dismiss = true;
                    dismissAction.direction = DIRECTION_NEXT;
                }
                if (this._isValidKey(event.keyCode, this.props.keys.dismissPrev)) {
                    dismissAction.dismiss = true;
                    dismissAction.direction = DIRECTION_PREV;
                }

                if (!dismissAction.dismiss && !this.props.circular && focusMoveDirection) {
                    dismissAction.dismiss = focusMoveDirection === DIRECTION_PREV && this._activeDescendant === 0 || focusMoveDirection === DIRECTION_NEXT && this._activeDescendant === this._descendants.length - 1;
                }
            }

            return dismissAction;
        },

        /**
         * Returns the direction, if any, in which the focus should be moved. In presence of the
         * shift key modifier, the direction of the movement is inverted.
         *
         * @protected
         * @method _getFocusMoveDirection
         * @param {Object} event The Keyboard event.
         * @return {Number} The computed direction of the expected focus movement.
         */
        _getFocusMoveDirection: function _getFocusMoveDirection(event) {
            var direction = DIRECTION_NONE;

            if (this._isValidKey(event.keyCode, this.props.keys.next)) {
                direction = DIRECTION_NEXT;
            }
            if (this._isValidKey(event.keyCode, this.props.keys.prev)) {
                direction = DIRECTION_PREV;
            }

            if (event.shifKey) {
                direction *= -1;
            }

            return direction;
        },

        /**
         * Indicates if a given keyCode is valid for the given set of keys.
         *
         * @param {Number} keyCode An event keyCode.
         * @param {Array|Number} keys A key set. Can be a number an array of numbers representing the allowed keyCodes.
         *
         * @protected
         * @method _isValidKey
         * @return {Boolean} A boolean value indicating if the key is valid.
         */
        _isValidKey: function _isValidKey(keyCode, keys) {
            return AlloyEditor.Lang.isArray(keys) ? keys.indexOf(keyCode) !== -1 : keyCode === keys;
        },

        /**
         * Indicates if a given element is valid for focus management. User input elements such as
         * input, select or textarea are excluded.
         *
         * @protected
         * @method _isValidKey
         * @param {DOMNode} element A DOM element.
         * @return {Boolean} A boolean value indicating if the element is valid.
         */
        _isValidTarget: function _isValidTarget(element) {
            var tagName = element.tagName.toLowerCase();

            return tagName !== 'input' && tagName !== 'select' && tagName !== 'textarea';
        },

        /**
         * Moves the focus among descendants in the especified direction.
         *
         * @protected
         * @method _moveFocus
         * @param {number} direction The direction (1 or -1) of the focus movement among descendants.
         */
        _moveFocus: function _moveFocus(direction) {
            var numDescendants = this._descendants.length;

            var descendant = this._descendants[this._activeDescendant];

            descendant.setAttribute('tabIndex', -1);

            this._activeDescendant += direction;

            if (this.props.circular) {
                // Calculate proper modulo result since remainder operator doesn't behave in the
                // same way for negative numbers
                this._activeDescendant = (this._activeDescendant % numDescendants + numDescendants) % numDescendants;
            } else {
                this._activeDescendant = Math.max(Math.min(this._activeDescendant, numDescendants - 1), 0);
            }

            descendant = this._descendants[this._activeDescendant];

            descendant.setAttribute('tabIndex', 0);
            descendant.focus();
        },

        /**
         * Refreshes the descendants list by executing the CSS selector again and resets the descendants tabIndex.
         *
         * @protected
         * @method _refresh
         */
        _refresh: function _refresh() {
            var domNode = ReactDOM.findDOMNode(this);

            if (domNode) {
                var descendants = domNode.querySelectorAll(this.props.descendants);

                var priorityDescendants = [];

                this._descendants = [];

                Array.prototype.slice.call(descendants).forEach(function (item) {
                    var dataTabIndex = item.getAttribute('data-tabindex');

                    if (dataTabIndex) {
                        priorityDescendants.push(item);
                    } else {
                        this._descendants.push(item);
                    }
                }.bind(this));

                priorityDescendants = priorityDescendants.sort(function (a, b) {
                    return AlloyEditor.Lang.toInt(a.getAttribute('data-tabindex')) > AlloyEditor.Lang.toInt(b.getAttribute('data-tabindex'));
                });

                this._descendants = priorityDescendants.concat(this._descendants);

                this._activeDescendant = 0;

                this._descendants.some(function (item, index) {
                    if (item.getAttribute('tabindex') === '0') {
                        this._activeDescendant = index;
                        this.focus();

                        return true;
                    }
                }.bind(this));
            }
        }
    };

    AlloyEditor.WidgetFocusManager = WidgetFocusManager;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Provides functionality for calculating the point of interaction of the user with the Editor.
     *
     * @class WidgetInteractionPoint
     */

    var WidgetInteractionPoint = {
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The provided editor event.
             *
             * @property {SyntheticEvent} editorEvent
             */
            editorEvent: React.PropTypes.object
        },

        /**
         * Returns the position, in page coordinates, according to which a widget should appear.
         * Depending on the direction of the selection, the wdiget may appear above of or on bottom of the selection.
         *
         * It depends on the props editorEvent to analyze the following user-interaction parameters:
         * - {Object} selectionData The data about the selection in the editor as returned from
         * {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
         * - {Number} pos Contains the coordinates of the position, considered as most appropriate.
         * This may be the point where the user released the mouse, or just the beginning or the end of
         * the selection.
         *
         * @method getInteractionPoint
         * @return {Object} An Object which contains the following properties:
         * direction, x, y, where x and y are in page coordinates and direction can be one of these:
         * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
         */
        getInteractionPoint: function getInteractionPoint() {
            var eventPayload = this.props.editorEvent ? this.props.editorEvent.data : null;

            if (!eventPayload) {
                return;
            }

            var selectionData = eventPayload.selectionData;

            var pos = {
                x: eventPayload.nativeEvent.pageX,
                y: selectionData.region.top
            };

            var direction = selectionData.region.direction;

            var endRect = selectionData.region.endRect;
            var startRect = selectionData.region.startRect;

            if (endRect && startRect && startRect.top === endRect.top) {
                direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
            }

            var x;
            var y;

            // If we have the point where user released the mouse, show Toolbar at this point
            // otherwise show it on the middle of the selection.
            if (pos.x && pos.y) {
                x = this._getXPoint(selectionData, pos.x);

                if (direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                    y = Math.min(pos.y, selectionData.region.top);
                } else {
                    y = Math.max(pos.y, selectionData.region.bottom);
                }
            } else {
                x = selectionData.region.left + selectionData.region.width / 2;

                if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    y = selectionData.region.bottom;
                } else {
                    y = selectionData.region.top;
                }
            }

            return {
                direction: direction,
                x: x,
                y: y
            };
        },

        /**
         * Returns the position of the Widget.
         *
         * @protected
         * @method _getXPoint
         * @param {Object} selectionData The data about the selection in the editor as
         * returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
         * @param {Object} eventX The X coordinate received from the native event (mouseup).
         * @return {Number} The calculated X point in page coordinates.
         */
        _getXPoint: function _getXPoint(selectionData, eventX) {
            var region = selectionData.region;

            var left = region.startRect ? region.startRect.left : region.left;
            var right = region.endRect ? region.endRect.right : region.right;

            var x;

            if (left < eventX && right > eventX) {
                x = eventX;
            } else {
                var leftDist = Math.abs(left - eventX);
                var rightDist = Math.abs(right - eventX);

                if (leftDist < rightDist) {
                    // user raised the mouse on left on the selection
                    x = left;
                } else {
                    x = right;
                }
            }

            return x;
        }
    };

    AlloyEditor.WidgetInteractionPoint = WidgetInteractionPoint;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Calculates the position where an Widget should be displayed based on the point
     * where user interacted with the editor.
     *
     * @uses WidgetInteractionPoint
     *
     * @class WidgetPosition
     */

    var WidgetPosition = {
        mixins: [AlloyEditor.WidgetInteractionPoint],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * Should the widget to be restricted to the viewport, or not.
             *
             * @property {Boolean} constrainToViewport
             * @default true
             */
            constrainToViewport: React.PropTypes.bool,

            /**
             * The gutter (vertical and horizontal) between the interaction point and where the widget
             * should be rendered.
             *
             * @property {Object} gutter
             * @default {
             *     left: 0,
             *     top: 10
             * }
             */
            gutter: React.PropTypes.object
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         */
        getDefaultProps: function getDefaultProps() {
            return {
                gutter: {
                    left: 0,
                    top: 10
                },
                constrainToViewport: true
            };
        },

        /**
         * Cancels an scheduled animation frame.
         *
         * @method cancelAnimation
         */
        cancelAnimation: function cancelAnimation() {
            if (window.cancelAnimationFrame) {
                window.cancelAnimationFrame(this._animationFrameId);
            }
        },

        /**
         * Returns an object which contains the position of the element in page coordinates,
         * restricted to fit to given viewport.
         *
         * @method getConstrainedPosition
         * @param {Object} attrs The following properties, provided as numbers:
         * - height
         * - left
         * - top
         * - width
         * @param {Object} viewPaneSize Optional. If not provided, the current viewport will be used. Should contain at least these properties:
         * - width
         * @return {Object} An object with `x` and `y` properties, which represent the constrained position of the
         * element.
         */
        getConstrainedPosition: function getConstrainedPosition(attrs, viewPaneSize) {
            viewPaneSize = viewPaneSize || new CKEDITOR.dom.window(window).getViewPaneSize();

            var x = attrs.left;
            var y = attrs.top;

            if (attrs.left + attrs.width > viewPaneSize.width) {
                x -= attrs.left + attrs.width - viewPaneSize.width;
            }

            if (y < 0) {
                y = 0;
            }

            return {
                x: x,
                y: y
            };
        },

        /**
         * Returns the position of the Widget taking in consideration the
         * {{#crossLink "WidgetPosition/gutter:attribute"}}{{/crossLink}} attribute.
         *
         * @protected
         * @method  getWidgetXYPoint
         * @param {Number} left The left offset in page coordinates where Toolbar should be shown.
         * @param {Number} top The top offset in page coordinates where Toolbar should be shown.
         * @param {Number} direction The direction of the selection. May be one of the following:
         * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
         * @return {Array} An Array with left and top offsets in page coordinates.
         */
        getWidgetXYPoint: function getWidgetXYPoint(left, top, direction) {
            var domNode = ReactDOM.findDOMNode(this);

            var gutter = this.props.gutter;

            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM || direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                left = left - gutter.left - domNode.offsetWidth / 2;

                top = direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM ? top + gutter.top : top - domNode.offsetHeight - gutter.top;
            } else if (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT || direction === CKEDITOR.SELECTION_RIGHT_TO_LEFT) {

                left = direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT ? left + gutter.left + domNode.offsetHeight / 2 : left - 3 * domNode.offsetHeight / 2 - gutter.left;

                top = top - gutter.top - domNode.offsetHeight / 2;
            }

            if (left < 0) {
                left = 0;
            }

            if (top < 0) {
                top = 0;
            }

            return [left, top];
        },

        /**
         * Returns true if the widget is visible, false otherwise
         *
         * @method isVisible
         * @return {Boolean} True if the widget is visible, false otherwise
         */
        isVisible: function isVisible() {
            var domNode = ReactDOM.findDOMNode(this);

            if (domNode) {
                var domElement = new CKEDITOR.dom.element(domNode);

                return domElement.hasClass('alloy-editor-visible');
            }

            return false;
        },

        /**
         * Moves a widget from a starting point to a destination point.
         *
         * @method moveToPoint
         * @param  {Object} startPoint The starting point for the movement.
         * @param  {Object} endPoint The destination point for the movement.
         */
        moveToPoint: function moveToPoint(startPoint, endPoint) {
            var domElement = new CKEDITOR.dom.element(ReactDOM.findDOMNode(this));

            domElement.setStyles({
                left: startPoint[0] + 'px',
                top: startPoint[1] + 'px',
                opacity: 0
            });

            domElement.removeClass('alloy-editor-invisible');

            this._animate(function () {
                domElement.addClass('ae-toolbar-transition');
                domElement.addClass('alloy-editor-visible');
                domElement.setStyles({
                    left: endPoint[0] + 'px',
                    top: endPoint[1] + 'px',
                    opacity: 1
                });
            });
        },

        /**
         * Shows the widget with the default animation transition.
         *
         * @method show
         */
        show: function show() {
            var domNode = ReactDOM.findDOMNode(this);

            if (!this.isVisible() && domNode) {
                var interactionPoint = this.getInteractionPoint();

                if (interactionPoint) {
                    var domElement = new CKEDITOR.dom.element(domNode);

                    var finalX, finalY, initialX, initialY;

                    finalX = initialX = parseFloat(domElement.getStyle('left'));
                    finalY = initialY = parseFloat(domElement.getStyle('top'));

                    if (this.props.constrainToViewport) {
                        var res = this.getConstrainedPosition({
                            height: parseFloat(domNode.offsetHeight),
                            left: finalX,
                            top: finalY,
                            width: parseFloat(domNode.offsetWidth)
                        });

                        finalX = res.x;
                        finalY = res.y;
                    }

                    if (interactionPoint.direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                        initialY = this.props.selectionData.region.bottom;
                    } else {
                        initialY = this.props.selectionData.region.top;
                    }

                    this.moveToPoint([initialX, initialY], [finalX, finalY]);
                }
            }
        },

        /**
         * Updates the widget position based on the current interaction point.
         *
         * @method updatePosition
         */
        updatePosition: function updatePosition() {
            var interactionPoint = this.getInteractionPoint();

            var domNode = ReactDOM.findDOMNode(this);

            if (interactionPoint && domNode) {
                var xy = this.getWidgetXYPoint(interactionPoint.x, interactionPoint.y, interactionPoint.direction);

                new CKEDITOR.dom.element(domNode).setStyles({
                    left: xy[0] + 'px',
                    top: xy[1] + 'px'
                });
            }
        },

        /**
         * Requests an animation frame, if possible, to simulate an animation.
         *
         * @protected
         * @method _animate
         * @param {Function} callback The function to be executed on the scheduled frame.
         */
        _animate: function _animate(callback) {
            if (window.requestAnimationFrame) {
                this._animationFrameId = window.requestAnimationFrame(callback);
            } else {
                callback();
            }
        }
    };

    AlloyEditor.WidgetPosition = WidgetPosition;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonBold class provides functionality for styling an selection with strong (bold) style.
     *
     * @uses ButtonCommand
     * @uses ButtonKeystroke
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonBold
     */

    var ButtonBold = React.createClass({
        displayName: 'ButtonBold',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonKeystroke],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default bold
             */
            key: 'bold'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'bold',
                keystroke: {
                    fn: 'execCommand',
                    keys: CKEDITOR.CTRL + 66 /*B*/
                },
                style: 'coreStyles_bold'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.bold, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-bold', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.bold },
                React.createElement('span', { className: 'ae-icon-bold' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonBold.key] = AlloyEditor.ButtonBold = ButtonBold;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonCameraImage class takes photo from camera and inserts it to the content.
     *
     * @class ButtonCameraImage
     */

    var ButtonCameraImage = React.createClass({
        displayName: 'ButtonCameraImage',

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default cameraImage
             */
            key: 'cameraImage'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         */
        getDefaultProps: function getDefaultProps() {
            return {
                videoWidth: 320
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses the take photo button.
         *
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this.refs.buttonTakePhoto).focus();
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @method componentWillUnmount
         */
        componentWillUnmount: function componentWillUnmount() {
            if (this._stream) {
                if (this._stream.stop) {
                    this._stream.stop();
                } else if (this._stream.getVideoTracks) {
                    this._stream.getVideoTracks().forEach(function (track) {
                        track.stop();
                    });
                }
                this._stream = null;
            }
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

            getUserMedia.call(navigator, {
                video: true,
                audio: false
            }, this._handleStreamSuccess, this._handleStreamError);

            return React.createElement(
                'div',
                { className: 'ae-camera' },
                React.createElement(
                    'video',
                    { ref: 'videoContainer' },
                    'Video stream not available.'
                ),
                React.createElement(
                    'button',
                    { className: 'ae-camera-shoot', onClick: this.takePhoto, ref: 'buttonTakePhoto' },
                    'Take photo'
                ),
                React.createElement('canvas', { className: 'ae-camera-canvas', ref: 'canvasContainer' })
            );
        },

        /**
         * Takes photo from the video stream and inserts in into editor's content.
         *
         * @method takePhoto
         */
        takePhoto: function takePhoto() {
            var videoEl = ReactDOM.findDOMNode(this.refs.videoContainer);
            var canvasEl = ReactDOM.findDOMNode(this.refs.canvasContainer);

            var context = canvasEl.getContext('2d');

            var height = this._videoHeight;
            var width = this.props.videoWidth;

            if (width && height) {
                canvasEl.width = width;
                canvasEl.height = height;

                context.drawImage(videoEl, 0, 0, width, height);

                var imgURL = canvasEl.toDataURL('image/png');

                var el = CKEDITOR.dom.element.createFromHtml('<img src="' + imgURL + '">');

                var editor = this.props.editor.get('nativeEditor');

                editor.insertElement(el);

                this.props.cancelExclusive();

                editor.fire('actionPerformed', this);

                editor.fire('imageCameraAdd', el);
            }
        },

        /**
         * Displays error message in case of video stream capturing failure.
         *
         * @protected
         * @method _handleStreamError
         * @param {Event} error The fired event in case of error.
         */
        _handleStreamError: function _handleStreamError(error) {
            window.alert('An error occurred! ' + error);
        },

        /**
         * Starts streaming video in the video element and sets width/height to the video
         * and canvas elements.
         *
         * @method _handleStreamSuccess
         * @param {Object} stream The video stream
         */
        _handleStreamSuccess: function _handleStreamSuccess(stream) {
            var videoEl = ReactDOM.findDOMNode(this.refs.videoContainer);
            var canvasEl = ReactDOM.findDOMNode(this.refs.canvasContainer);

            videoEl.addEventListener('canplay', function (event) {
                var height = videoEl.videoHeight / (videoEl.videoWidth / this.props.videoWidth);

                if (isNaN(height)) {
                    height = this.props.videoWidth / (4 / 3);
                }

                videoEl.setAttribute('width', this.props.videoWidth);
                videoEl.setAttribute('height', height);
                canvasEl.setAttribute('width', this.props.videoWidth);
                canvasEl.setAttribute('height', height);

                this._videoHeight = height;
            }.bind(this), false);

            this._stream = stream;

            if (navigator.mozGetUserMedia) {
                videoEl.mozSrcObject = stream;
            } else {
                videoEl.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }

            videoEl.play();

            ReactDOM.findDOMNode(this.refs.buttonTakePhoto).disabled = false;
        }

        /**
         * Fired when an image is being taken from the camera and added as an element to the editor.
         *
         * @event imageCameraAdd
         * @param {CKEDITOR.dom.element} el The created img element in editor.
         */
    });

    AlloyEditor.ButtonCameraImage = ButtonCameraImage;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonCamera class renders in two different ways:
     *
     * - Normal: Just a button that allows to switch to the edition mode.
     * - Exclusive: Renders ButtonCameraImage in order to take photo from the camera.
     *
     * @class ButtonCamera
     */

    var ButtonCamera = React.createClass({
        displayName: 'ButtonCamera',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default camera
             */
            key: 'camera'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (this.props.renderExclusive) {
                return React.createElement(AlloyEditor.ButtonCameraImage, this.props);
            } else {
                var disabled = !(navigator.getUserMedia || navigator.webkitGetUserMedia && location.protocol === 'https' || navigator.mozGetUserMedia || navigator.msGetUserMedia);

                var label = disabled ? AlloyEditor.Strings.cameraDisabled : AlloyEditor.Strings.camera;

                return React.createElement(
                    'button',
                    { 'aria-label': label, className: 'ae-button', 'data-type': 'button-image-camera', disabled: disabled, onClick: this.props.requestExclusive.bind(ButtonCamera.key), tabIndex: this.props.tabIndex, title: label },
                    React.createElement('span', { className: 'ae-icon-camera' })
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonCamera.key] = AlloyEditor.ButtonCamera = ButtonCamera;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonCode class provides wraps a selection in `pre` element.
     *
     * @uses ButtonActionStyle
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonCode
     */

    var ButtonCode = React.createClass({
        displayName: 'ButtonCode',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default code
             */
            key: 'code'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                style: {
                    element: 'pre'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.code, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-code', onClick: this.applyStyle, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.code },
                React.createElement('span', { className: 'ae-icon-code' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonCode.key] = AlloyEditor.ButtonCode = ButtonCode;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonCommandListItem class is a UI class that renders a ButtonCommand that can be used inside
     * a list as an item, with a string representation of its behaviour.
     *
     * @uses ButtonCommand
     *
     * @class ButtonCommandListItem
     */

    var ButtonCommandListItem = React.createClass({
        displayName: 'ButtonCommandListItem',

        mixins: [AlloyEditor.ButtonCommand],

        propTypes: {
            /**
             * The command label or description to render in the list entry.
             *
             * @property {String} description
             */
            description: React.PropTypes.string.isRequired,

            /**
             * The command icon to render in the list entry.
             *
             * @property {String} icon
             */
            icon: React.PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default buttonCommandListItem
             */
            key: 'buttonCommandListItem'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'button',
                { 'aria-label': this.props.description, className: this._getClassName(), onClick: this.execCommand, tabIndex: this.props.tabIndex },
                this.props.description
            );
        },

        /**
         * Returns the class name of Widget.
         *
         * @method _getClassName
         * @return {String} The class name of the Widget.
         */
        _getClassName: function _getClassName() {
            var className = 'ae-toolbar-element';

            if (this.props.icon) {
                className += ' ae-icon-' + this.props.icon;
            }

            return className;
        }
    });

    AlloyEditor.ButtonCommandListItem = ButtonCommandListItem;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonCommandsList class provides functionality for showing a list of commands that can be
     * executed to the current selection..
     *
     * @uses WidgetFocusManager
     *
     * @class ButtonCommandsList
     */

    var ButtonCommandsList = React.createClass({
        displayName: 'ButtonCommandsList',

        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @property {Array} commands
             */
            commands: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * List id to be used for accessibility purposes such as aria-owns.
             *
             * @property {String} listId
             */
            listId: React.PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default buttonCommandsList
             */
            key: 'buttonCommandsList'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the list node to allow keyboard interaction.
         *
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: false,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the list.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'div',
                { className: 'ae-dropdown ae-arrow-box ae-arrow-box-top-left', onFocus: this.focus, onKeyDown: this.handleKey, tabIndex: '0' },
                React.createElement(
                    'ul',
                    { className: 'ae-listbox', id: this.props.listId, role: 'listbox' },
                    this._renderActions(this.props.commands)
                )
            );
        },

        /**
         * Renders instances of ButtonCommandListItem with the description of the row action that will be executed.
         *
         * @protected
         * @method _renderActions
         * @return {Array} Rendered instances of ButtonCommandListItem class
         */
        _renderActions: function _renderActions(commands) {
            var editor = this.props.editor;
            var items;

            if (commands && commands.length) {
                items = commands.map(function (item) {
                    return React.createElement(
                        'li',
                        { key: item.command, role: 'option' },
                        React.createElement(AlloyEditor.ButtonCommandListItem, { command: item.command, description: typeof item.label === 'string' ? item.label : item.label(), editor: editor })
                    );
                });
            }

            return items;
        }
    });

    AlloyEditor.ButtonCommandsList = ButtonCommandsList;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonDropdown class provides markup and keyboard navigation behaviour to a dropdown
     * opened from a button.
     *
     * @class ButtonDropdown
     */

    var ButtonDropdown = React.createClass({
        displayName: 'ButtonDropdown',

        mixins: [AlloyEditor.WidgetFocusManager],

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: false,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                }
            };
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the dropdown in the configuration.
             *
             * @static
             * @property {String} key
             * @default dropdown
             */
            key: 'dropdown'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'div',
                { className: 'ae-dropdown ae-arrow-box ae-arrow-box-top-left', onFocus: this.focus, onKeyDown: this.handleKey, tabIndex: '0' },
                React.createElement(
                    'ul',
                    { className: 'ae-listbox', role: 'listbox' },
                    this.props.children
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonDropdown.key] = AlloyEditor.ButtonDropdown = ButtonDropdown;
})();
'use strict';

(function () {
    'use strict';

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    /**
     * The ButtonEmbedEdit class provides functionality for creating and editing an embed link in a document.
     * Provides UI for creating and editing an embed link.
     *
     * @class ButtonEmbedEdit
     */
    var ButtonEmbedEdit = React.createClass({
        displayName: 'ButtonEmbedEdit',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default embedEdit
             */
            key: 'embedEdit'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing. This should only happen if the component
         * is rendered in exclusive mode to prevent aggressive focus stealing.
         *
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            if (this.props.renderExclusive || this.props.manualSelection) {
                // We need to wait for the next rendering cycle before focusing to avoid undesired
                // scrolls on the page
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(this._focusLinkInput);
                } else {
                    setTimeout(this._focusLinkInput, 0);
                }
            }
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.replaceState(this.getInitialState());
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         *
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            var editor = this.props.editor.get('nativeEditor');
            var embed;

            var selection = editor.getSelection();

            if (selection) {
                var selectedElement = selection.getSelectedElement();

                if (selectedElement) {
                    embed = selectedElement.findOne('[data-widget="ae_embed"]');
                }
            }

            var href = embed ? embed.getAttribute('data-ae-embed-url') : '';

            return {
                element: embed,
                initialLink: {
                    href: href
                },
                linkHref: href
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var clearLinkStyle = {
                opacity: this.state.linkHref ? 1 : 0
            };

            return React.createElement(
                'div',
                { className: 'ae-container-edit-link' },
                React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.deleteEmbed, className: 'ae-button', 'data-type': 'button-embed-remove', disabled: !this.state.element, onClick: this._removeEmbed, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.deleteEmbed },
                    React.createElement('span', { className: 'ae-icon-bin' })
                ),
                React.createElement(
                    'div',
                    { className: 'ae-container-input xxl' },
                    React.createElement('input', { className: 'ae-input', onChange: this._handleLinkHrefChange, onKeyDown: this._handleKeyDown, placeholder: AlloyEditor.Strings.editLink, ref: 'linkInput', type: 'text', value: this.state.linkHref }),
                    React.createElement('button', { 'aria-label': AlloyEditor.Strings.clearInput, className: 'ae-button ae-icon-remove', onClick: this._clearLink, style: clearLinkStyle, title: AlloyEditor.Strings.clear })
                ),
                React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.confirm, className: 'ae-button', disabled: !this._isValidState(), onClick: this._embedLink, title: AlloyEditor.Strings.confirm },
                    React.createElement('span', { className: 'ae-icon-ok' })
                )
            );
        },

        /**
         * Clears the link input. This only changes the component internal state, but does not
         * affect the link element of the editor. Only the _removeLink and _updateLink methods
         * are translated to the editor element.
         *
         * @protected
         * @method _clearLink
         */
        _clearLink: function _clearLink() {
            this.setState({
                linkHref: ''
            });
        },

        /**
         * Triggers the embedUrl command to transform the link into an embed media object
         *
         * @protected
         * @method _embedLink
         */
        _embedLink: function _embedLink() {
            var nativeEditor = this.props.editor.get('nativeEditor');

            nativeEditor.execCommand('embedUrl', {
                url: this.state.linkHref
            });

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();
        },

        /**
         * Focuses the user cursor on the widget's input.
         *
         * @protected
         * @method _focusLinkInput
         */
        _focusLinkInput: function _focusLinkInput() {
            ReactDOM.findDOMNode(this.refs.linkInput).focus();
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates/updates the link.
         * - Escape: Discards the changes.
         *
         * @protected
         * @method _handleKeyDown
         * @param {SyntheticEvent} event The keyboard event.
         */
        _handleKeyDown: function _handleKeyDown(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
                event.preventDefault();
            }

            if (event.keyCode === KEY_ENTER) {
                this._embedLink();
            } else if (event.keyCode === KEY_ESC) {
                var editor = this.props.editor.get('nativeEditor');

                // We need to cancelExclusive with the bound parameters in case the button is used
                // inside another in exclusive mode (such is the case of the link button)
                this.props.cancelExclusive();

                editor.fire('actionPerformed', this);
            }
        },

        /**
         * Updates the component state when the link input changes on user interaction.
         *
         * @protected
         * @method _handleLinkHrefChange
         * @param {SyntheticEvent} event The change event.
         */
        _handleLinkHrefChange: function _handleLinkHrefChange(event) {
            this.setState({
                linkHref: event.target.value
            });
        },

        /**
         * Verifies that the current link state is valid so the user can save the link. A valid state
         * means that we have a non-empty href that's different from the original one.
         *
         * @method _isValidState
         * @protected
         * @return {Boolean} True if the state is valid, false otherwise
         */
        _isValidState: function _isValidState() {
            var validState = this.state.linkHref && this.state.linkHref !== this.state.initialLink.href;

            return validState;
        },

        /**
         * Removes the embed in the editor element.
         *
         * @protected
         * @method _removeEmbed
         */
        _removeEmbed: function _removeEmbed() {
            var editor = this.props.editor.get('nativeEditor');

            var embedWrapper = this.state.element.getAscendant(function (element) {
                return element.hasClass('cke_widget_wrapper');
            });

            embedWrapper.remove();

            editor.fire('actionPerformed', this);
        }
    });

    AlloyEditor.Buttons[ButtonEmbedEdit.key] = AlloyEditor.ButtonEmbedEdit = ButtonEmbedEdit;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonEmbed class provides functionality for creating and editing an embed link in a document.
     * ButtonEmbed renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonEmbedEdit UI with all the link edition controls.
     *
     * @uses ButtonKeystroke
     *
     * @class ButtonEmbed
     */

    var ButtonEmbed = React.createClass({
        displayName: 'ButtonEmbed',

        mixins: [AlloyEditor.ButtonKeystroke],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default embed
             */
            key: 'embed'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                keystroke: {
                    fn: '_requestExclusive',
                    keys: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76 /*L*/
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (this.props.renderExclusive) {
                return React.createElement(AlloyEditor.ButtonEmbedEdit, this.props);
            } else {
                return React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.link, className: 'ae-button', 'data-type': 'button-embed', onClick: this._requestExclusive, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.link },
                    React.createElement('span', { className: 'ae-icon-add' })
                );
            }
        },

        /**
         * Requests the link button to be rendered in exclusive mode to allow the embedding of a link.
         *
         * @protected
         * @method _requestExclusive
         */
        _requestExclusive: function _requestExclusive() {
            this.props.requestExclusive(ButtonEmbed.key);
        }
    });

    AlloyEditor.Buttons[ButtonEmbed.key] = AlloyEditor.ButtonEmbed = ButtonEmbed;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonH1 class provides wraps a selection in `h1` element.
     *
     * @uses ButtonActionStyle
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonH1
     */

    var ButtonH1 = React.createClass({
        displayName: 'ButtonH1',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default h1
             */
            key: 'h1'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                style: {
                    element: 'h1'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.h1, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-h1', onClick: this.applyStyle, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.h1 },
                React.createElement('span', { className: 'ae-icon-h1' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonH1.key] = AlloyEditor.ButtonH1 = ButtonH1;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonH2 class provides wraps a selection in `h2` element.
     *
     * @uses ButtonActionStyle
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonH2
     */

    var ButtonH2 = React.createClass({
        displayName: 'ButtonH2',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default h2
             */
            key: 'h2'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                style: {
                    element: 'h2'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.h2, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-h2', onClick: this.applyStyle, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.h2 },
                React.createElement('span', { className: 'ae-icon-h2' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonH2.key] = AlloyEditor.ButtonH2 = ButtonH2;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonHline class provides inserts horizontal line.
     *
     * @uses ButtonCommand
     * @uses ButtonStyle
     *
     * @class ButtonHline
     */

    var ButtonHline = React.createClass({
        displayName: 'ButtonHline',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default hline
             */
            key: 'hline'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'horizontalrule',
                style: {
                    element: 'hr'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.horizontalrule, className: 'ae-button', 'data-type': 'button-hline', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.horizontalrule },
                React.createElement('span', { className: 'ae-icon-separator' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonHline.key] = AlloyEditor.ButtonHline = ButtonHline;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonImageAlignCenter class provides functionality for aligning an image in the center.
     *
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     *
     * @class ButtonImageAlignCenter
     */

    var ButtonImageAlignCenter = React.createClass({
        displayName: 'ButtonImageAlignCenter',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default imageCenter
             */
            key: 'imageCenter'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifycenter'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignCenter, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-image-align-center', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignCenter },
                React.createElement('span', { className: 'ae-icon-align-center' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonImageAlignCenter.key] = AlloyEditor.ButtonImageAlignCenter = ButtonImageAlignCenter;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonImageAlignLeft class provides functionality for aligning an image on left.
     *
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     *
     * @class ButtonImageAlignLeft
     */

    var ButtonImageAlignLeft = React.createClass({
        displayName: 'ButtonImageAlignLeft',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default imageLeft
             */
            key: 'imageLeft'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifyleft'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignLeft, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-image-align-left', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignLeft },
                React.createElement('span', { className: 'ae-icon-align-left' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonImageAlignLeft.key] = AlloyEditor.ButtonImageAlignLeft = ButtonImageAlignLeft;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonImageAlignRight class provides functionality for aligning an image on right.
     *
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     *
     * @class ButtonImageAlignRight
     */

    var ButtonImageAlignRight = React.createClass({
        displayName: 'ButtonImageAlignRight',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default imageRight
             */
            key: 'imageRight'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifyright'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignRight, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-image-align-right', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignRight },
                React.createElement('span', { className: 'ae-icon-align-right' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonImageAlignRight.key] = AlloyEditor.ButtonImageAlignRight = ButtonImageAlignRight;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonImage class inserts an image to the content.
     *
     * @class ButtonImage
     */

    var ButtonImage = React.createClass({
        displayName: 'ButtonImage',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default image
             */
            key: 'image'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var inputSyle = { display: 'none' };

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.image, className: 'ae-button', 'data-type': 'button-image', onClick: this.handleClick, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.image },
                    React.createElement('span', { className: 'ae-icon-image' })
                ),
                React.createElement('input', { accept: 'image/*', onChange: this._onInputChange, ref: 'fileInput', style: inputSyle, type: 'file' })
            );
        },

        /**
         * Simulates click on the input element. This will open browser's native file open dialog.
         *
         * @method handleClick
         * @param {SyntheticEvent} event The received click event on the button.
         */
        handleClick: function handleClick(event) {
            ReactDOM.findDOMNode(this.refs.fileInput).click();
        },

        /**
         * On input change, reads the chosen file and fires an event `beforeImageAdd` with the image which will be added
         * to the content. The image file will be passed in the `imageFiles` property.
         * If any of the listeners returns `false` or cancels the event, the image won't be added to the content.
         * Otherwise, an event `imageAdd` will be fired with the inserted element into the editable area.
         * The passed params will be:
         * - `el` - the created img element
         * - `file` - the original image file from the input element
         *
         * @protected
         * @method _onInputChange
         */
        _onInputChange: function _onInputChange() {
            var inputEl = ReactDOM.findDOMNode(this.refs.fileInput);

            // On IE11 the function might be called with an empty array of
            // files. In such a case, no actions will be taken.
            if (!inputEl.files.length) {
                return;
            }

            var reader = new FileReader();
            var file = inputEl.files[0];

            reader.onload = function (event) {
                var editor = this.props.editor.get('nativeEditor');

                var result = editor.fire('beforeImageAdd', {
                    imageFiles: file
                });

                if (!!result) {
                    var el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');

                    editor.insertElement(el);

                    editor.fire('actionPerformed', this);

                    var imageData = {
                        el: el,
                        file: file
                    };

                    editor.fire('imageAdd', imageData);
                }
            }.bind(this);

            reader.readAsDataURL(file);

            inputEl.value = '';
        }

        /**
         * Fired before adding images to the editor.
         *
         * @event beforeImageAdd
         * @param {Array} imageFiles Array of image files
         */

        /**
         * Fired when an image is being added to the editor successfully.
         *
         * @event imageAdd
         * @param {CKEDITOR.dom.element} el The created image with src as Data URI
         * @param {File} file The image file
         */
    });

    AlloyEditor.Buttons[ButtonImage.key] = AlloyEditor.ButtonImage = ButtonImage;
})();
'use strict';

(function () {
    'use strict';

    /**
        * The ButtonIndentBlock class provides functionality for indenting the selected blocks.
        *
        * @uses ButtonCommand
        * @uses ButtonCommandActive
        * @uses ButtonStateClasses
        *
        * @class ButtonIndentBlock
        */

    var ButtonIndentBlock = React.createClass({
        displayName: 'ButtonIndentBlock',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        //Allows validating props being passed to the component
        propTypes: {
            /**
                  * The editor instance where the component is being used.
                  *
                  * @property {Object} editor
                  */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
                  * The name which will be used as an alias of the button in the configuration.
                  *
                  * @static
                  * @property {String} key
                  * @default indentBlock
                  */
            key: 'indentBlock'
        },

        /**
           * Lifecycle. Returns the default values of the properties used in the widget.
           *
           * @method getDefaultProps
           * @return {Object} The default properties.
           */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'indent'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.indent, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-indent-block', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.indent },
                React.createElement('span', { className: 'ae-icon-indent-block' })
            );
        }

    });

    AlloyEditor.Buttons[ButtonIndentBlock.key] = AlloyEditor.ButtonIndentBlock = ButtonIndentBlock;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonItalic class provides functionality for styling an selection with italic (em) style.
     *
     * @uses ButtonCommand
     * @uses ButtonKeystroke
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonItalic
     */

    var ButtonItalic = React.createClass({
        displayName: 'ButtonItalic',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonKeystroke],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default italic
             */
            key: 'italic'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'italic',
                keystroke: {
                    fn: 'execCommand',
                    keys: CKEDITOR.CTRL + 73 /*I*/
                },
                style: 'coreStyles_italic'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.italic, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-italic', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.italic },
                React.createElement('span', { className: 'ae-icon-italic' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonItalic.key] = AlloyEditor.ButtonItalic = ButtonItalic;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonLinkAutocompleteList class provides functionality for showing a list of
     * items that can be selected for the link.
     *
     * @uses WidgetFocusManager
     *
     * @class ButtonLinkAutocompleteList
     */

    var ButtonLinkAutocompleteList = React.createClass({
        displayName: 'ButtonLinkAutocompleteList',

        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * Autocomplete function
             *
             * @property {Function} data
             */
            data: React.PropTypes.func,

            /**
             * Indicates if this is focused when this component is updated
             *
             * @property {Boolean} autocompleteSelected
             */
            autocompleteSelected: React.PropTypes.bool,

            /**
             * The current term to autocomplete for
             *
             * @property {String} term
             */
            term: React.PropTypes.string,

            /**
            * Method to update parent selectautocomplete state
            *
            * @property {Function} setAutocompleteState
            */
            setAutocompleteState: React.PropTypes.func

        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default buttonLinkAutocompleteList
             */
            key: 'buttonLinkAutocompleteList'
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            if (!nextProps.term || nextProps.term !== this.props.term) {
                clearTimeout(this._timeout);

                if (nextProps.term) {
                    this._timeout = setTimeout(this._updateItems, this.props.delay);
                } else {
                    this.setState({
                        items: []
                    });
                }
            }

            if (nextProps.autocompleteSelected) {
                setTimeout(this.focus, 0);
                this.props.setAutocompleteState({
                    selected: false
                });
            }
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @method componentWillUnmount
         */
        componentWillUnmount: function componentWillUnmount() {
            clearTimeout(this._timeout);
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: false,
                data: [],
                delay: 100,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                }
            };
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         *
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            return {
                items: []
            };
        },

        /**
         * Lifecycle. Renders the UI of the list.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (!this.props.expanded || !this.state.items.length) {
                return null;
            }

            return React.createElement(
                AlloyEditor.ButtonDropdown,
                null,
                this._renderAutocompleteItems(this.state.items)
            );
        },

        /**
         * Lifecycle. Invoked before rendering when new props or state are being received.
         * This method is not called for the initial render or when forceUpdate is used.
         *
         * @method  shouldComponentUpdate
         * @return {Boolean} Returns false when the transition to the new props and state will not
         * require a component update.
         */
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            return nextProps.expanded !== this.props.expanded || nextProps.term !== this.props.term || nextState.items !== this.state.items;
        },

        /**
         * Renders a set of list items for the provided items
         *
         * @protected
         * @method _renderAutocompleteItems
         * @param {Array} items List of autocomplete items to render
         * @return {Array} Rendered list item instances
         */
        _renderAutocompleteItems: function _renderAutocompleteItems(items) {
            items = items || [];

            var handleLinkAutocompleteClick = this.props.handleLinkAutocompleteClick;

            return items.map(function (item) {
                return React.createElement(
                    'li',
                    { key: item.url, role: 'option' },
                    React.createElement(
                        'button',
                        { className: 'ae-toolbar-element', onClick: handleLinkAutocompleteClick, 'data-value': item.url },
                        item.title
                    )
                );
            });
        },

        /**
         * Retrieves the data according to {this.props.term} and calls setState() with the returned data
         *
         * @protected
         * @method _updateItems
         */
        _updateItems: function _updateItems() {
            var instance = this;

            if (!this.props.term) {
                return;
            }

            var promise = Promise.resolve(this.props.data(this.props.term));

            promise.then(function (items) {
                if (items.length) {
                    !instance.props.expanded && instance.props.toggleDropdown();
                }

                instance.setState({
                    items: items
                });
            });
        }
    });

    AlloyEditor.ButtonLinkAutocompleteList = ButtonLinkAutocompleteList;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonLinkEdit class provides functionality for creating and editing a link in a document.
     * Provides UI for creating, editing and removing a link.
     *
     * @uses WidgetDropdown
     * @uses WidgetFocusManager
     * @uses ButtonCfgProps
     *
     * @class ButtonLinkEdit
     */

    var ButtonLinkEdit = React.createClass({
        displayName: 'ButtonLinkEdit',

        mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetFocusManager, AlloyEditor.ButtonCfgProps],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the allowed values for the target attribute.
             *
             * @property {Array} allowedTargets
             */
            allowedTargets: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * Indicate if we add http:// protocol to link or not
             *
             * @property {Boolean} appendProtocol
             */
            appendProtocol: React.PropTypes.bool,

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * Default value of the link target attribute.
             *
             * @property {String} defaultLinkTarget
             */
            defaultLinkTarget: React.PropTypes.string,

            /**
             * Indicates whether the link target selector should appear.
             *
             * @property {Boolean} showTargetSelector
             */
            showTargetSelector: React.PropTypes.bool,

            /**
             * List of items to be rendered as possible values for the link or a function, which is
             * supposed to retrieve the data. The function should return a Promise.
             * The returned items must be objects with at least two properties:
             * - title
             * - url
             *
             * @property {Function|Array} data
             */
            data: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.arrayOf(React.PropTypes.object)])
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default linkEdit
             */
            key: 'linkEdit'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing. This should only happen if the component
         * is rendered in exclusive mode to prevent aggressive focus stealing.
         *
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            if (this.props.renderExclusive || this.props.manualSelection) {
                // We need to wait for the next rendering cycle before focusing to avoid undesired
                // scrolls on the page
                this._focusLinkInput();
            }
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.replaceState(this.getInitialState());
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                defaultLinkTarget: '',
                showTargetSelector: true,
                appendProtocol: true,
                autocompleteUrl: '',
                circular: true,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                },
                customIndexStart: true
            };
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         *
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();
            var href = link ? link.getAttribute('href') : '';
            var target = link ? link.getAttribute('target') : this.props.defaultLinkTarget;

            return {
                autocompleteSelected: false,
                element: link,
                initialLink: {
                    href: href,
                    target: target
                },
                linkHref: href,
                linkTarget: target
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var clearLinkStyle = {
                opacity: this.state.linkHref ? 1 : 0
            };

            var targetSelector = {
                editor: this.props.editor,
                handleLinkTargetChange: this._handleLinkTargetChange,
                selectedTarget: this.state.linkTarget || AlloyEditor.Strings.linkTargetDefault
            };

            targetSelector = this.mergeDropdownProps(targetSelector, AlloyEditor.ButtonLinkTargetEdit.key);

            var autocompleteDropdown;

            if (this.props.data) {
                var dataFn = this.props.data;

                if (!AlloyEditor.Lang.isFunction(dataFn)) {
                    var items = this.props.data;

                    dataFn = function dataFn(term) {
                        return items;
                    };
                }

                var autocompleteDropdownProps = {
                    data: dataFn,
                    editor: this.props.editor,
                    handleLinkAutocompleteClick: this._handleLinkAutocompleteClick,
                    onDismiss: this.props.toggleDropdown,
                    term: this.state.linkHref,
                    autocompleteSelected: this.state.autocompleteSelected,
                    setAutocompleteState: this._setAutocompleteState
                };

                autocompleteDropdownProps = this.mergeDropdownProps(autocompleteDropdownProps, AlloyEditor.ButtonLinkAutocompleteList.key);

                autocompleteDropdown = React.createElement(AlloyEditor.ButtonLinkAutocompleteList, autocompleteDropdownProps);
            }

            return React.createElement(
                'div',
                { className: 'ae-container-edit-link' },
                React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.removeLink, className: 'ae-button', disabled: !this.state.element, onClick: this._removeLink, title: AlloyEditor.Strings.remove },
                    React.createElement('span', { className: 'ae-icon-unlink' })
                ),
                React.createElement(
                    'div',
                    { className: 'ae-container-input xxl' },
                    React.createElement(AlloyEditor.ButtonLinkTargetEdit, targetSelector),
                    React.createElement(
                        'div',
                        { className: 'ae-container-input xxl' },
                        React.createElement('input', { className: 'ae-input', onChange: this._handleLinkHrefChange, onKeyDown: this._handleKeyDown, placeholder: AlloyEditor.Strings.editLink, ref: 'linkInput', type: 'text', value: this.state.linkHref }),
                        autocompleteDropdown
                    ),
                    React.createElement('button', { 'aria-label': AlloyEditor.Strings.clearInput, className: 'ae-button ae-icon-remove', onClick: this._clearLink, style: clearLinkStyle, title: AlloyEditor.Strings.clear })
                ),
                React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.confirm, className: 'ae-button', disabled: !this._isValidState(), onClick: this._updateLink, title: AlloyEditor.Strings.confirm },
                    React.createElement('span', { className: 'ae-icon-ok' })
                )
            );
        },

        /**
         * Clears the link input. This only changes the component internal state, but does not
         * affect the link element of the editor. Only the _removeLink and _updateLink methods
         * are translated to the editor element.
         *
         * @protected
         * @method _clearLink
         */
        _clearLink: function _clearLink() {
            this.setState({
                linkHref: ''
            });
        },

        /**
         * Focuses the user cursor on the widget's input.
         *
         * @protected
         * @method _focusLinkInput
         */
        _focusLinkInput: function _focusLinkInput() {
            var instance = this;

            var focusLinkEl = function focusLinkEl() {
                ReactDOM.findDOMNode(instance.refs.linkInput).focus();
            };

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(focusLinkEl);
            } else {
                setTimeout(focusLinkEl, 0);
            }
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates/updates the link.
         * - Escape: Discards the changes.
         *
         * @protected
         * @method _handleKeyDown
         * @param {SyntheticEvent} event The keyboard event.
         */
        _handleKeyDown: function _handleKeyDown(event) {
            if (event.keyCode === 13 || event.keyCode === 27) {
                event.preventDefault();
            }

            if (event.keyCode === 13) {
                this._updateLink();
            } else if (event.keyCode === 40) {
                this.setState({
                    autocompleteSelected: true
                });
            } else if (event.keyCode === 27) {
                var editor = this.props.editor.get('nativeEditor');

                new CKEDITOR.Link(editor).advanceSelection();

                this.props.editor.get('nativeEditor').fire('actionPerformed', this);
            }
        },

        /**
         * Updates the component state when the link input changes on user interaction.
         *
         * @protected
         * @method _handleLinkHrefChange
         * @param {SyntheticEvent} event The change event.
         */
        _handleLinkHrefChange: function _handleLinkHrefChange(event) {
            this.setState({
                linkHref: event.target.value
            });

            this._focusLinkInput();
        },

        /**
         * Updates the component state when the link target changes on user interaction.
         *
         * @protected
         * @method _handleLinkTargetChange
         * @param {SyntheticEvent} event The click event.
         */
        _handleLinkTargetChange: function _handleLinkTargetChange(event) {
            this.setState({
                itemDropdown: null,
                linkTarget: event.target.getAttribute('data-value')
            });

            this._focusLinkInput();
        },

        /**
         * Updates the component state when an autocomplete link result is selected by user interaction.
         *
         * @protected
         * @method _handleLinkAutocompleteClick
         * @param {SyntheticEvent} event The click event.
         */
        _handleLinkAutocompleteClick: function _handleLinkAutocompleteClick(event) {
            this.setState({
                itemDropdown: null,
                linkHref: event.target.getAttribute('data-value')
            });

            this._focusLinkInput();
        },

        /**
         * Verifies that the current link state is valid so the user can save the link. A valid state
         * means that we have a non-empty href and that either that or the link target are different
         * from the original link.
         *
         * @protected
         * @method _isValidState
         * @return {Boolean} [description]
         */
        _isValidState: function _isValidState() {
            var validState = this.state.linkHref && (this.state.linkHref !== this.state.initialLink.href || this.state.linkTarget !== this.state.initialLink.target);

            return validState;
        },

        /**
         * Removes the link in the editor element.
         *
         * @protected
         * @method _removeLink
         */
        _removeLink: function _removeLink() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor);
            var selection = editor.getSelection();
            var bookmarks = selection.createBookmarks();

            linkUtils.remove(this.state.element, { advance: true });

            selection.selectBookmarks(bookmarks);

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();

            editor.fire('actionPerformed', this);
        },

        /**
         * Update autocompleteSelected state to focus and select autocomplete´s dropdown
         *
         * @protected
         * @method _setAutocompleteState
         */
        _setAutocompleteState: function _setAutocompleteState(state) {
            this.setState({
                autocompleteSelected: state.selected
            });
        },

        /**
         * Updates the link in the editor element. If the element didn't exist previously, it will
         * create a new <a> element with the href specified in the link input.
         *
         * @protected
         * @method _updateLink
         */
        _updateLink: function _updateLink() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor, { appendProtocol: this.props.appendProtocol });
            var linkAttrs = {
                target: this.state.linkTarget
            };
            var modifySelection = { advance: true };

            if (this.state.linkHref) {
                if (this.state.element) {
                    linkAttrs.href = this.state.linkHref;

                    linkUtils.update(linkAttrs, this.state.element, modifySelection);
                } else {
                    linkUtils.create(this.state.linkHref, linkAttrs, modifySelection);
                }

                editor.fire('actionPerformed', this);
            }

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();
        }
    });

    AlloyEditor.Buttons[ButtonLinkEdit.key] = AlloyEditor.ButtonLinkEdit = ButtonLinkEdit;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonLinkTargetEdit class provides functionality for changing the target of a link
     * in the document.
     *
     * @class ButtonLinkTargetEdit
     */

    var ButtonLinkTargetEdit = React.createClass({
        displayName: 'ButtonLinkTargetEdit',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the allowed items for the target attribute. Every allowed target is an object
             * with a `label` attribute that will be shown in the dropdown and a `value` attribute
             * that will get set as the link target attribute.
             * @property {Array<object>} allowedTargets
             */
            allowedTargets: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * Label of the current target value.
             *
             * @property {String} selectedTarget
             */
            selectedTarget: React.PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default linkTargetEdit
             */
            key: 'linkTargetEdit'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var buttonTargetsList;

            var handleLinkTargetChange = this.props.handleLinkTargetChange;

            if (this.props.expanded) {
                buttonTargetsList = React.createElement(AlloyEditor.ButtonTargetList, { editor: this.props.editor, onDismiss: this.props.toggleDropdown, handleLinkTargetChange: handleLinkTargetChange });
            }

            return React.createElement(
                'div',
                { className: 'ae-container-edit-link-target ae-container-dropdown ae-container-dropdown-medium ae-has-dropdown', tabIndex: '0' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': this.props.selectedTarget, className: 'ae-toolbar-element', onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: this.props.selectedTarget },
                    React.createElement(
                        'div',
                        { className: 'ae-container' },
                        React.createElement(
                            'span',
                            { className: 'ae-container-dropdown-selected-item' },
                            this.props.selectedTarget
                        ),
                        React.createElement('span', { className: 'ae-icon-arrow' })
                    )
                ),
                buttonTargetsList
            );
        },

        /**
         * Lifecycle. Invoked before rendering when new props or state are being received.
         * This method is not called for the initial render or when forceUpdate is used.
         *
         * @method  shouldComponentUpdate
         * @return {Boolean} Returns false when the transition to the new props and state will not
         * require a component update.
         */
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            return nextProps.expanded !== this.props.expanded || nextProps.selectedTarget !== this.props.selectedTarget;
        }
    });

    AlloyEditor.Buttons[ButtonLinkTargetEdit.key] = AlloyEditor.ButtonLinkTargetEdit = ButtonLinkTargetEdit;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonLink class provides functionality for creating and editing a link in a document. ButtonLink
     * renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonLinkEdit UI with all the link edition controls.
     *
     * @uses ButtonKeystroke
     * @uses ButtonStateClasses
     * @uses ButtonCfgProps
     *
     * @class ButtonLink
     */

    var ButtonLink = React.createClass({
        displayName: 'ButtonLink',

        mixins: [AlloyEditor.ButtonKeystroke, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCfgProps],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default link
             */
            key: 'link'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                keystroke: {
                    fn: '_requestExclusive',
                    keys: CKEDITOR.CTRL + 76 /*L*/
                }
            };
        },

        /**
         * Checks if the current selection is contained within a link.
         *
         * @method isActive
         * @return {Boolean} True if the selection is inside a link, false otherwise.
         */
        isActive: function isActive() {
            return new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection() !== null;
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            if (this.props.renderExclusive) {
                var props = this.mergeButtonCfgProps();

                return React.createElement(AlloyEditor.ButtonLinkEdit, props);
            } else {
                return React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.link, className: cssClass, 'data-type': 'button-link', onClick: this._requestExclusive, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.link },
                    React.createElement('span', { className: 'ae-icon-link' })
                );
            }
        },

        /**
         * Requests the link button to be rendered in exclusive mode to allow the creation of a link.
         *
         * @protected
         * @method _requestExclusive
         */
        _requestExclusive: function _requestExclusive() {
            this.props.requestExclusive(ButtonLink.key);
        }
    });

    AlloyEditor.Buttons[ButtonLink.key] = AlloyEditor.ButtonLink = ButtonLink;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonOrderedList class provides functionality for creating ordered lists in an editor.
     *
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonOrderedList
     */

    var ButtonOrderedList = React.createClass({
        displayName: 'ButtonOrderedList',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default ol
             */
            key: 'ol'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'numberedlist',
                style: {
                    element: 'ol'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.numberedlist, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-ol', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.numberedlist },
                React.createElement('span', { className: 'ae-icon-numbered-list' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonOrderedList.key] = AlloyEditor.ButtonOrderedList = ButtonOrderedList;
})();
'use strict';

(function () {
    'use strict';

    /**
        * The ButtonOutdentBlock class provides functionality for outdenting blocks.
        *
        * @uses ButtonCommand
        * @uses ButtonCommandActive
        * @uses ButtonStateClasses
        *
        * @class ButtonOutdentBlock
        */

    var ButtonOutdentBlock = React.createClass({
        displayName: 'ButtonOutdentBlock',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        //Allows validating props being passed to the component
        propTypes: {
            /**
                  * The editor instance where the component is being used.
                  *
                  * @property {Object} editor
                  */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
                  * The name which will be used as an alias of the button in the configuration.
                  *
                  * @static
                  * @property {String} key
                  * @default indentBlock
                  */
            key: 'outdentBlock'
        },

        /**
           * Lifecycle. Returns the default values of the properties used in the widget.
           *
           * @method getDefaultProps
           * @return {Object} The default properties.
           */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'outdent'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.outdent, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-outdent-block', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.outdent },
                React.createElement('span', { className: 'ae-icon-outdent-block' })
            );
        }

    });

    AlloyEditor.Buttons[ButtonOutdentBlock.key] = AlloyEditor.ButtonOutdentBlock = ButtonOutdentBlock;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonParagraphAlignLeft class provides functionality for aligning a paragraph on left.
     *
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     *
     * @class ButtonParagraphAlignLeft
     */

    var ButtonParagraphAlignLeft = React.createClass({
        displayName: 'ButtonParagraphAlignLeft',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default paragraphLeft
             */
            key: 'paragraphLeft'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifyleft'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignLeft, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-paragraph-align-left', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignLeft },
                React.createElement('span', { className: 'ae-icon-align-left' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphAlignLeft.key] = AlloyEditor.ButtonParagraphAlignLeft = ButtonParagraphAlignLeft;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonParagraphAlignRight class provides functionality for aligning a paragraph on right.
     *
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     *
     * @class ButtonParagraphAlignRight
     */

    var ButtonParagraphAlignRight = React.createClass({
        displayName: 'ButtonParagraphAlignRight',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default paragraphRight
             */
            key: 'paragraphRight'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifyright'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignRight, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-paragraph-align-right', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignRight },
                React.createElement('span', { className: 'ae-icon-align-right' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphAlignRight.key] = AlloyEditor.ButtonParagraphAlignRight = ButtonParagraphAlignRight;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonParagraphCenter class provides functionality for centering a paragraph.
     *
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     *
     * @class ButtonParagraphCenter
     */

    var ButtonParagraphCenter = React.createClass({
        displayName: 'ButtonParagraphCenter',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default paragraphCenter
             */
            key: 'paragraphCenter'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifycenter'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignCenter, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-paragraph-center', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignCenter },
                React.createElement('span', { className: 'ae-icon-align-center' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphCenter.key] = AlloyEditor.ButtonParagraphCenter = ButtonParagraphCenter;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonParagraphJustify class provides functionality for justfying a paragraph.
     *
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     *
     * @class ButtonParagraphJustify
     */

    var ButtonParagraphJustify = React.createClass({
        displayName: 'ButtonParagraphJustify',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default paragraphJustify
             */
            key: 'paragraphJustify'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifyblock'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignJustify, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-paragraph-justify', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignJustify },
                React.createElement('span', { className: 'ae-icon-align-justified' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphJustify.key] = AlloyEditor.ButtonParagraphJustify = ButtonParagraphJustify;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonQuote class wraps a selection in `blockquote` element.
     *
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonQuote
     */

    var ButtonQuote = React.createClass({
        displayName: 'ButtonQuote',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default quote
             */
            key: 'quote'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'blockquote',
                style: {
                    element: 'blockquote'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.quote, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-quote', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.quote },
                React.createElement('span', { className: 'ae-icon-quote' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonQuote.key] = AlloyEditor.ButtonQuote = ButtonQuote;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonRemoveFormat class removes style formatting.
     *
     * @uses ButtonCommand
     *
     * @class ButtonRemoveFormat
     */

    var ButtonRemoveFormat = React.createClass({
        displayName: 'ButtonRemoveFormat',

        mixins: [AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default removeFormat
             */
            key: 'removeFormat'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'removeFormat'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.removeformat, className: 'ae-button', 'data-type': 'button-removeformat', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.removeformat },
                React.createElement('span', { className: 'ae-icon-removeformat' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonRemoveFormat.key] = AlloyEditor.ButtonRemoveFormat = ButtonRemoveFormat;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonStrike class styles a selection with strike style.
     *
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonStrike
     */

    var ButtonStrike = React.createClass({
        displayName: 'ButtonStrike',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default strike
             */
            key: 'strike'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'strike',
                style: 'coreStyles_strike'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.strike, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-strike', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.strike },
                React.createElement('span', { className: 'ae-icon-strike' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonStrike.key] = AlloyEditor.ButtonStrike = ButtonStrike;
})();
"use strict";

(function () {
    'use strict';

    /**
     * The ButtonsStylesListHeader class provides the header of an list of style items.
     *
     * @class ButtonsStylesListHeader
     */

    var ButtonsStylesListHeader = React.createClass({
        displayName: "ButtonsStylesListHeader",

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (this.props.styles && this.props.styles.length) {
                return React.createElement(
                    "span",
                    { className: "ae-list-header" },
                    this.props.name
                );
            } else {
                return null;
            }
        }
    });

    AlloyEditor.ButtonsStylesListHeader = ButtonsStylesListHeader;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonStylesListItemRemove class provides functionality for previewing a style definition
     * inside a list and applying it to the current editor selection.
     *
     * @class ButtonStylesListItemRemove
     */

    var ButtonStylesListItemRemove = React.createClass({
        displayName: 'ButtonStylesListItemRemove',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * Block styles that should be removed in addition to all other inline styles
             *
             * @property {Array} removeBlocks
             * @default ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre']
             */
            removeBlocks: React.PropTypes.array,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        //Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default buttonStylesListItemRemove
             */
            key: 'buttonStylesListItemRemove'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                removeBlocks: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre']
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'li',
                { role: 'option' },
                React.createElement(
                    'button',
                    { className: 'ae-toolbar-element', onClick: this._removeStyles, tabIndex: this.props.tabIndex },
                    AlloyEditor.Strings.normal
                )
            );
        },

        /**
         * Removes all inline styles and configured block elements applied to the current selection.
         *
         * @protected
         * @method _removeStyles
         */
        _removeStyles: function _removeStyles() {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand('removeFormat');

            this.props.removeBlocks.forEach(function (blockItem) {
                var blockStyle = new CKEDITOR.style({ element: blockItem });

                editor.removeStyle(blockStyle);
            });

            editor.fire('actionPerformed', this);
        }
    });

    AlloyEditor.ButtonStylesListItemRemove = ButtonStylesListItemRemove;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonStylesListItem class provides functionality for previewing a style definition
     * inside a list and applying it to the current editor selection.
     *
     * @uses ButtonActionStyle
     * @uses ButtonStyle
     *
     * @class ButtonStylesListItem
     */

    var ButtonStylesListItem = React.createClass({
        displayName: 'ButtonStylesListItem',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonActionStyle],

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default buttonStylesListItem
             */
            key: 'buttonStylesListItem'
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         *
         * @method componentWillMount
         */
        componentWillMount: function componentWillMount() {
            // Styles with wildcard element (*) generate an empty tag in their preview < class="custom-class" />.
            // We default to element span and remove the margins to obtain a more consistent set of previews.
            var styleCfg = {
                element: 'span',
                styles: {
                    margin: 0
                }
            };

            styleCfg = CKEDITOR.tools.merge(styleCfg, this.props.style);

            this._preview = new CKEDITOR.style(styleCfg).buildPreview(this.props.name);
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            // We need to use dangerouselySetInnterHTML since we're not in control of the style
            // preview that is generated by CKEditor.
            return React.createElement('button', { className: 'ae-toolbar-element', dangerouslySetInnerHTML: { __html: this._preview }, onClick: this._onClick, tabIndex: this.props.tabIndex });
        },

        /**
         * Applies the item style to the editor selection.
         *
         * @protected
         * @method _onClick
         */
        _onClick: function _onClick() {
            // Typically, we want the style to be the only one applied to the current selection, so
            // we execute the 'removeFormat' command first. Note that block styles won't be cleaned.
            // However, this is consistent with other editors implementations of this feature.
            this.props.editor.get('nativeEditor').execCommand('removeFormat');

            this.applyStyle();
        }
    });

    AlloyEditor.ButtonStylesListItem = ButtonStylesListItem;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonStylesList class provides functionality for showing a list of styles that can be
     * applied to the current selection..
     *
     * @uses WidgetFocusManager
     *
     * @class ButtonStylesList
     */

    var ButtonStylesList = React.createClass({
        displayName: 'ButtonStylesList',

        mixins: [AlloyEditor.WidgetFocusManager],

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default buttonStylesList
             */
            key: 'buttonStylesList'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the list node to allow keyboard interaction.
         *
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         *
         * @method componentWillMount
         */
        componentWillMount: function componentWillMount() {
            var blockStyles = [];
            var inlineStyles = [];
            var objectStyles = [];

            this.props.styles.forEach(function (item) {
                var style = new CKEDITOR.style(item.style);

                if (style.type === CKEDITOR.STYLE_BLOCK) {
                    blockStyles.push(item);
                } else if (style.type === CKEDITOR.STYLE_INLINE) {
                    inlineStyles.push(item);
                } else if (style.type === CKEDITOR.STYLE_OBJECT) {
                    objectStyles.push(item);
                }
            });

            this._blockStyles = blockStyles;
            this._inlineStyles = inlineStyles;
            this._objectStyles = objectStyles;
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: false,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                },
                showRemoveStylesItem: true
            };
        },

        /**
         * Lifecycle. Renders the UI of the list.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var removeStylesItem;

            if (this.props.showRemoveStylesItem) {
                removeStylesItem = React.createElement(AlloyEditor.ButtonStylesListItemRemove, { editor: this.props.editor, onDismiss: this.props.toggleDropdown });
            }

            return React.createElement(
                'div',
                { className: 'ae-dropdown ae-arrow-box ae-arrow-box-top-left', onFocus: this.focus, onKeyDown: this.handleKey, tabIndex: '0' },
                React.createElement(
                    'ul',
                    { className: 'ae-listbox', role: 'listbox' },
                    removeStylesItem,
                    React.createElement(AlloyEditor.ButtonsStylesListHeader, { name: AlloyEditor.Strings.blockStyles, styles: this._blockStyles }),
                    this._renderStylesItems(this._blockStyles),
                    React.createElement(AlloyEditor.ButtonsStylesListHeader, { name: AlloyEditor.Strings.inlineStyles, styles: this._inlineStyles }),
                    this._renderStylesItems(this._inlineStyles),
                    React.createElement(AlloyEditor.ButtonsStylesListHeader, { name: AlloyEditor.Strings.objectStyles, styles: this._objectStyles }),
                    this._renderStylesItems(this._objectStyles)
                )
            );
        },

        /**
         * Renders instances of ButtonStylesListItem with the preview of the correspondent block, inline or object styles.
         *
         * @protected
         * @method _renderStylesItems
         * @param {Array} styles List of styles for which preview should be rendered.
         * @return {Array} Rendered instances of ButtonStylesListItem class
         */
        _renderStylesItems: function _renderStylesItems(styles) {
            var editor = this.props.editor;
            var items;

            if (styles && styles.length) {
                items = styles.map(function (item) {
                    return React.createElement(
                        'li',
                        { key: item.name, role: 'option' },
                        React.createElement(AlloyEditor.ButtonStylesListItem, { editor: editor, name: item.name, style: item.style })
                    );
                });
            }

            return items;
        }
    });

    AlloyEditor.ButtonStylesList = ButtonStylesList;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonStyles class provides functionality for styling a selection with a list of
     * configurable and customizable styles. The allowed styles follow CKEDITOR.Style configuration
     * (http://docs.ckeditor.com/#!/api/CKEDITOR.style)
     *
     * @class ButtonStyles
     */

    var ButtonStyles = React.createClass({
        displayName: 'ButtonStyles',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @property {Boolean} expanded
             */
            expanded: React.PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * Indicates whether the remove styles item should appear in the styles list.
             *
             * @property {Boolean} expanded
             */
            showRemoveStylesItem: React.PropTypes.bool,

            /**
             * List of the styles the button is able to handle.
             *
             * @property {Array} styles
             */
            styles: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @property {Function} toggleDropdown
             */
            toggleDropdown: React.PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default styles
             */
            key: 'styles'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var activeStyle = AlloyEditor.Strings.normal;

            var styles = this._getStyles();

            styles.forEach(function (item) {
                if (this._checkActive(item.style)) {
                    activeStyle = item.name;
                }
            }.bind(this));

            var buttonStylesList;

            if (this.props.expanded) {
                buttonStylesList = React.createElement(AlloyEditor.ButtonStylesList, { editor: this.props.editor, onDismiss: this.props.toggleDropdown, showRemoveStylesItem: this.props.showRemoveStylesItem, styles: styles });
            }

            return React.createElement(
                'div',
                { className: 'ae-container-dropdown ae-has-dropdown' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': AlloyEditor.Strings.styles + ' ' + activeStyle, className: 'ae-toolbar-element', onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.styles + ' ' + activeStyle },
                    React.createElement(
                        'div',
                        { className: 'ae-container' },
                        React.createElement(
                            'span',
                            { className: 'ae-container-dropdown-selected-item' },
                            activeStyle
                        ),
                        React.createElement('span', { className: 'ae-icon-arrow' })
                    )
                ),
                buttonStylesList
            );
        },

        /**
         * Checks if the given style definition is applied to the current selection in the editor.
         *
         * @protected
         * @method _checkActive
         * @param {Object} styleConfig Style definition as per http://docs.ckeditor.com/#!/api/CKEDITOR.style.
         * @return {Boolean} Returns true if the style is applied to the selection, false otherwise.
         */
        _checkActive: function _checkActive(styleConfig) {
            var nativeEditor = this.props.editor.get('nativeEditor');

            // Styles with wildcard element (*) won't be considered active by CKEditor. Defaulting
            // to a 'span' element works for most of those cases with no defined element.
            styleConfig = CKEDITOR.tools.merge({ element: 'span' }, styleConfig);

            var style = new CKEDITOR.style(styleConfig);

            return style.checkActive(nativeEditor.elementPath(), nativeEditor);
        },

        /**
         * Returns an array of styles. Each style consists from two properties:
         * - name - the style name, for example "h1"
         * - style - an object with one property, called `element` which value
         * represents the style which have to be applied to the element.
         *
         * @method _getStyles
         * @protected
         * @return {Array<object>} An array of objects containing the styles.
         */
        _getStyles: function _getStyles() {
            return this.props.styles || [{
                name: AlloyEditor.Strings.h1,
                style: {
                    element: 'h1'
                }
            }, {
                name: AlloyEditor.Strings.h2,
                style: {
                    element: 'h2'
                }
            }, {
                name: AlloyEditor.Strings.formatted,
                style: {
                    element: 'pre'
                }
            }, {
                name: AlloyEditor.Strings.cite,
                style: {
                    element: 'cite'
                }
            }, {
                name: AlloyEditor.Strings.code,
                style: {
                    element: 'code'
                }
            }];
        }
    });

    AlloyEditor.Buttons[ButtonStyles.key] = AlloyEditor.ButtonStyles = ButtonStyles;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonSubscript class provides functionality for applying subscript style to a text selection.
     *
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonSubscript
     */

    var ButtonSubscript = React.createClass({
        displayName: 'ButtonSubscript',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default subscript
             */
            key: 'subscript'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'subscript',
                style: 'coreStyles_subscript'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.subscript, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-subscript', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.subscript },
                React.createElement('span', { className: 'ae-icon-subscript' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonSubscript.key] = AlloyEditor.ButtonSubscript = ButtonSubscript;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonSuperscript class provides functionality for applying superscript style to a text selection.
     *
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonSuperscript
     */

    var ButtonSuperscript = React.createClass({
        displayName: 'ButtonSuperscript',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default superscript
             */
            key: 'superscript'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'superscript',
                style: 'coreStyles_superscript'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.superscript, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-superscript', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.superscript },
                React.createElement('span', { className: 'ae-icon-superscript' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonSuperscript.key] = AlloyEditor.ButtonSuperscript = ButtonSuperscript;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTableCell class provides functionality to work with table cells.
     *
     * @class ButtonTableCell
     */

    var ButtonTableCell = React.createClass({
        displayName: 'ButtonTableCell',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @property {Array} commands
             */
            commands: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @property {Boolean} expanded
             */
            expanded: React.PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @property {Function} toggleDropdown
             */
            toggleDropdown: React.PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default tableCell
             */
            key: 'tableCell'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var buttonCommandsList;
            var buttonCommandsListId;

            if (this.props.expanded) {
                buttonCommandsListId = ButtonTableCell.key + 'List';
                buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, { commands: this._getCommands(), editor: this.props.editor, listId: buttonCommandsListId, onDismiss: this.props.toggleDropdown });
            }

            return React.createElement(
                'div',
                { className: 'ae-container ae-has-dropdown' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': AlloyEditor.Strings.cell, 'aria-owns': buttonCommandsListId, className: 'ae-button', onClick: this.props.toggleDropdown, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.cell },
                    React.createElement('span', { className: 'ae-icon-cell' })
                ),
                buttonCommandsList
            );
        },

        /**
         * Returns a list of commands. If a list of commands was passed
         * as property `commands`, it will take a precedence over the default ones.
         *
         * @method _getCommands
         * @return {Array} The list of available commands.
         */
        _getCommands: function _getCommands() {
            return this.props.commands || [{
                command: 'cellInsertBefore',
                label: AlloyEditor.Strings.cellInsertBefore
            }, {
                command: 'cellInsertAfter',
                label: AlloyEditor.Strings.cellInsertAfter
            }, {
                command: 'cellDelete',
                label: AlloyEditor.Strings.cellDelete
            }, {
                command: 'cellMerge',
                label: AlloyEditor.Strings.cellMerge
            }, {
                command: 'cellMergeDown',
                label: AlloyEditor.Strings.cellMergeDown
            }, {
                command: 'cellMergeRight',
                label: AlloyEditor.Strings.cellMergeRight
            }, {
                command: 'cellHorizontalSplit',
                label: AlloyEditor.Strings.cellSplitHorizontal
            }, {
                command: 'cellVerticalSplit',
                label: AlloyEditor.Strings.cellSplitVertical
            }];
        }
    });

    AlloyEditor.Buttons[ButtonTableCell.key] = AlloyEditor.ButtonTableCell = ButtonTableCell;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTableColumn class provides functionality to work with table columns.
     *
     * @class ButtonTableColumn
     */

    var ButtonTableColumn = React.createClass({
        displayName: 'ButtonTableColumn',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @property {Array} commands
             */
            commands: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @property {Boolean} expanded
             */
            expanded: React.PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @property {Function} toggleDropdown
             */
            toggleDropdown: React.PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default tableColumn
             */
            key: 'tableColumn'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var buttonCommandsList, buttonCommandsListId;

            if (this.props.expanded) {
                buttonCommandsListId = ButtonTableColumn.key + 'List';
                buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, { commands: this._getCommands(), editor: this.props.editor, listId: buttonCommandsListId, onDismiss: this.props.toggleDropdown });
            }

            return React.createElement(
                'div',
                { className: 'ae-container ae-has-dropdown' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': AlloyEditor.Strings.column, 'aria-owns': buttonCommandsListId, className: 'ae-button', onClick: this.props.toggleDropdown, role: 'listbox', tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.column },
                    React.createElement('span', { className: 'ae-icon-column' })
                ),
                buttonCommandsList
            );
        },

        /**
         * Returns a list of commands. If a list of commands was passed
         * as property `commands`, it will take a precedence over the default ones.
         *
         * @method _getCommands
         * @return {Array} The list of available commands.
         */
        _getCommands: function _getCommands() {
            return this.props.commands || [{
                command: 'columnInsertBefore',
                label: AlloyEditor.Strings.columnInsertBefore
            }, {
                command: 'columnInsertAfter',
                label: AlloyEditor.Strings.columnInsertAfter
            }, {
                command: 'columnDelete',
                label: AlloyEditor.Strings.columnDelete
            }];
        }
    });

    AlloyEditor.Buttons[ButtonTableColumn.key] = AlloyEditor.ButtonTableColumn = ButtonTableColumn;
})();
'use strict';

(function () {
    'use strict';

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    /**
     * The ButtonTableEdit class provides functionality for creating and editing a table in a document.
     * Provides UI for creating a table.
     *
     * @class ButtonTableEdit
     */
    var ButtonTableEdit = React.createClass({
        displayName: 'ButtonTableEdit',

        // Allows validating props being passed to the component.
        propTypes: {

            /**
             * Method to notify the button abandons the exclusive rendering mode.
             *
             * @property {Function} cancelExclusive
             */
            cancelExclusive: React.PropTypes.func.isRequired,

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default tableEdit
             */
            key: 'tableEdit'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         */
        getDefaultProps: function getDefaultProps() {
            return {
                tableAttributes: {
                    border: 1,
                    cellPadding: 0,
                    cellSpacing: 0,
                    style: 'width: 100%'
                }
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing.
         *
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this.refs.rows).focus();
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         *
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            return {
                cols: 3,
                rows: 3
            };
        },

        /**
         * Creates a table.
         *
         * @protected
         * @method _createTable
         */
        _createTable: function _createTable() {
            var editor = this.props.editor.get('nativeEditor');
            var tableUtils = new CKEDITOR.Table(editor);

            tableUtils.create({
                attrs: this.props.tableAttributes,
                cols: this.state.cols,
                rows: this.state.rows
            });

            this.props.cancelExclusive();

            editor.fire('actionPerformed', this);
        },

        /**
         * Handles a change in input value. Sets the provided value from the user back to the input.
         *
         * @protected
         * @method _handleChange
         * @param {String} inputName The name of the input which value should be updated.
         * @param {SyntheticEvent} event The provided event.
         */
        _handleChange: function _handleChange(inputName, event) {
            var state = {};
            state[inputName] = event.target.value;

            this.setState(state);
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates the table.
         * - Escape: Discards the changes.
         *
         * @protected
         * @method _handleKeyDown
         * @param {SyntheticEvent} event The keyboard event.
         */
        _handleKeyDown: function _handleKeyDown(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
                event.preventDefault();
            }

            if (event.keyCode === KEY_ENTER) {
                this._createTable();
            } else if (event.keyCode === KEY_ESC) {
                this.props.cancelExclusive();
            }
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var time = Date.now();
            var rowsId = time + 'rows';
            var colsId = time + 'cols';

            return React.createElement(
                'div',
                { className: 'ae-container-edit-table' },
                React.createElement(
                    'label',
                    { htmlFor: rowsId },
                    'Rows'
                ),
                React.createElement(
                    'div',
                    { className: 'ae-container-input small' },
                    React.createElement('input', { className: 'ae-input', id: rowsId, onChange: this._handleChange.bind(this, 'rows'), min: '1', onKeyDown: this._handleKeyDown, placeholder: 'Rows', ref: 'rows', type: 'number', value: this.state.rows })
                ),
                React.createElement(
                    'label',
                    { htmlFor: colsId },
                    'Cols'
                ),
                React.createElement(
                    'div',
                    { className: 'ae-container-input small' },
                    React.createElement('input', { className: 'ae-input', id: colsId, onChange: this._handleChange.bind(this, 'cols'), min: '1', onKeyDown: this._handleKeyDown, placeholder: 'Colums', ref: 'cols', type: 'number', value: this.state.cols })
                ),
                React.createElement(
                    'button',
                    { 'aria-label': 'Confirm', className: 'ae-button', onClick: this._createTable },
                    React.createElement('span', { className: 'ae-icon-ok' })
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonTableEdit.key] = AlloyEditor.ButtonTableEdit = ButtonTableEdit;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTableHeading class provides functionality to work with table heading.
     *
     * @class ButtonTableHeading
     */

    var ButtonTableHeading = React.createClass({
        displayName: 'ButtonTableHeading',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @property {Array} commands
             */
            commands: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @property {Boolean} expanded
             */
            expanded: React.PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @property {Function} toggleDropdown
             */
            toggleDropdown: React.PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default tableRow
             */
            key: 'tableHeading'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var buttonCommandsList;
            var buttonCommandsListId;

            if (this.props.expanded) {
                buttonCommandsListId = ButtonTableHeading.key + 'List';
                buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, { commands: this._getCommands(), editor: this.props.editor, listId: buttonCommandsListId, onDismiss: this.props.toggleDropdown });
            }

            var activeHeading = new CKEDITOR.Table(this.props.editor.get('nativeEditor')).getHeading();
            var activeHeadingIntro = AlloyEditor.Strings.headers + ':';
            var activeHeadingLabel = AlloyEditor.Strings['headers' + activeHeading];

            return React.createElement(
                'div',
                { className: 'ae-container-dropdown-xl ae-has-dropdown' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': '', className: 'ae-toolbar-element', onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: '' },
                    React.createElement(
                        'div',
                        { className: 'ae-container' },
                        React.createElement(
                            'span',
                            { className: 'ae-container-dropdown-selected-item' },
                            activeHeadingIntro,
                            ' ',
                            React.createElement(
                                'strong',
                                null,
                                activeHeadingLabel
                            )
                        ),
                        React.createElement('span', { className: 'ae-icon-arrow' })
                    )
                ),
                buttonCommandsList
            );
        },

        /**
         * Returns a list of commands. If a list of commands was passed
         * as property `commands`, it will take a precedence over the default ones.
         *
         * @method _getCommands
         * @return {Array} The list of available commands.
         */
        _getCommands: function _getCommands() {
            return this.props.commands || [{
                command: 'tableHeadingNone',
                label: AlloyEditor.Strings.headersNone
            }, {
                command: 'tableHeadingRow',
                label: AlloyEditor.Strings.headersRow
            }, {
                command: 'tableHeadingColumn',
                label: AlloyEditor.Strings.headersColumn
            }, {
                command: 'tableHeadingBoth',
                label: AlloyEditor.Strings.headersBoth
            }];
        }
    });

    AlloyEditor.Buttons[ButtonTableHeading.key] = AlloyEditor.ButtonTableHeading = ButtonTableHeading;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTableRemove class provides functionality for removing a table
     *
     * @class ButtonTableRemove
     */

    var ButtonTableRemove = React.createClass({
        displayName: 'ButtonTableRemove',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default tableRemove
             */
            key: 'tableRemove'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.deleteTable, className: 'ae-button', 'data-type': 'button-table-remove', onClick: this._removeTable, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.deleteTable },
                React.createElement('span', { className: 'ae-icon-bin' })
            );
        },

        /**
         * Removes the table in the editor element.
         *
         * @protected
         * @method _removeTable
         */
        _removeTable: function _removeTable() {
            var editor = this.props.editor.get('nativeEditor');
            var tableUtils = new CKEDITOR.Table(editor);

            tableUtils.remove();

            editor.fire('actionPerformed', this);
        }
    });

    AlloyEditor.Buttons[ButtonTableRemove.key] = AlloyEditor.ButtonTableRemove = ButtonTableRemove;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTableRow class provides functionality to work with table rows.
     *
     * @class ButtonTableRow
     */

    var ButtonTableRow = React.createClass({
        displayName: 'ButtonTableRow',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @property {Array} commands
             */
            commands: React.PropTypes.arrayOf(React.PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @property {Boolean} expanded
             */
            expanded: React.PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @property {Function} toggleDropdown
             */
            toggleDropdown: React.PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default tableRow
             */
            key: 'tableRow'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var buttonCommandsList;
            var buttonCommandsListId;

            if (this.props.expanded) {
                buttonCommandsListId = ButtonTableRow.key + 'List';
                buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, { commands: this._getCommands(), editor: this.props.editor, listId: buttonCommandsListId, onDismiss: this.props.toggleDropdown });
            }

            return React.createElement(
                'div',
                { className: 'ae-container ae-has-dropdown' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': AlloyEditor.Strings.row, 'aria-owns': buttonCommandsListId, className: 'ae-button', onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.row },
                    React.createElement('span', { className: 'ae-icon-row' })
                ),
                buttonCommandsList
            );
        },

        /**
         * Returns a list of commands. If a list of commands was passed
         * as property `commands`, it will take a precedence over the default ones.
         *
         * @method _getCommands
         * @return {Array} The list of available commands.
         */
        _getCommands: function _getCommands() {
            return this.props.commands || [{
                command: 'rowInsertBefore',
                label: AlloyEditor.Strings.rowInsertBefore
            }, {
                command: 'rowInsertAfter',
                label: AlloyEditor.Strings.rowInsertAfter
            }, {
                command: 'rowDelete',
                label: AlloyEditor.Strings.rowDelete
            }];
        }
    });

    AlloyEditor.Buttons[ButtonTableRow.key] = AlloyEditor.ButtonTableRow = ButtonTableRow;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTable class provides functionality for creating and editing a table in a document. ButtonTable
     * renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonTableEdit UI with all the table edition controls.
     *
     * @class ButtonTable
     */

    var ButtonTable = React.createClass({
        displayName: 'ButtonTable',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default table
             */
            key: 'table'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (this.props.renderExclusive) {
                return React.createElement(AlloyEditor.ButtonTableEdit, this.props);
            } else {
                return React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.table, className: 'ae-button', 'data-type': 'button-table', onClick: this.props.requestExclusive, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.table },
                    React.createElement('span', { className: 'ae-icon-table' })
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonTable.key] = AlloyEditor.ButtonTable = ButtonTable;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTargetList class provides functionality for changing the target of a link
     * in the document.
     *
     * @uses WidgetFocusManager
     *
     * @class ButtonTargetList
     */

    var ButtonTargetList = React.createClass({
        displayName: 'ButtonTargetList',

        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default linkTargetEdit
             */
            key: 'targetList'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: true,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var listTargets = this._renderListTargets();

            return React.createElement(
                AlloyEditor.ButtonDropdown,
                this.props,
                listTargets
            );
        },

        /**
         * Returns the the allowed link target items.
         *
         * @protected
         * @method _getAllowedTargetItems
         *
         * @return {Array} The allowed target items.
         */
        _getAllowedTargetItems: function _getAllowedTargetItems() {
            return this.props.allowedLinkTargets || [{
                label: AlloyEditor.Strings.linkTargetDefault,
                value: ''
            }, {
                label: AlloyEditor.Strings.linkTargetSelf,
                value: '_self'
            }, {
                label: AlloyEditor.Strings.linkTargetBlank,
                value: '_blank'
            }, {
                label: AlloyEditor.Strings.linkTargetParent,
                value: '_parent'
            }, {
                label: AlloyEditor.Strings.linkTargetTop,
                value: '_top'
            }];
        },

        /**
         * Renders the allowed link target items.
         *
         * @method _renderListTargets
         * @return {Object} Returns the rendered link items
         */
        _renderListTargets: function _renderListTargets() {
            var targets = this._getAllowedTargetItems();

            var handleLinkTargetChange = this.props.handleLinkTargetChange;

            targets = targets.map(function (target) {
                return React.createElement(
                    'li',
                    { key: target.value, role: 'option' },
                    React.createElement(
                        'button',
                        { className: 'ae-toolbar-element', 'data-value': target.value, onClick: handleLinkTargetChange },
                        target.label
                    )
                );
            });

            return targets;
        }
    });

    AlloyEditor.Buttons[ButtonTargetList.key] = AlloyEditor.ButtonTargetList = ButtonTargetList;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTwitter class provides functionality for creating a link which
     * allows people to tweet part of the content in the editor.
     *
     * @uses ButtonStateClasses
     *
     * @class ButtonTwitter
     */

    var ButtonTwitter = React.createClass({
        displayName: 'ButtonTwitter',

        mixins: [AlloyEditor.ButtonStateClasses],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default twitter
             */
            key: 'twitter'
        },

        /**
         * Creates or removes the twitter link on the selection.
         *
         * @method handleClick
         */
        handleClick: function handleClick() {
            var editor = this.props.editor.get('nativeEditor');

            var linkUtils = new CKEDITOR.Link(editor);

            if (this.isActive()) {
                linkUtils.remove(linkUtils.getFromSelection());
            } else {
                linkUtils.create(this._getHref(), {
                    'class': 'ae-twitter-link',
                    'target': '_blank'
                });
            }

            editor.fire('actionPerformed', this);
        },

        /**
         * Checks if the current selection is contained within a link that points to twitter.com/intent/tweet.
         *
         * @method isActive
         * @return {Boolean} True if the selection is inside a twitter link, false otherwise.
         */
        isActive: function isActive() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();

            return link && link.getAttribute('href').indexOf('twitter.com/intent/tweet') !== -1;
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.twitter, className: cssClass, 'data-type': 'button-twitter', onClick: this.handleClick, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.twitter },
                React.createElement('span', { className: 'ae-icon-twitter' })
            );
        },

        /**
         * Generates the appropriate twitter url based on the selected text and the configuration
         * options received via props.
         *
         * @protected
         * @method _getHref
         * @return {String} A valid twitter url with the selected text and given configuration.
         */
        _getHref: function _getHref() {
            var nativeEditor = this.props.editor.get('nativeEditor');
            var selectedText = nativeEditor.getSelection().getSelectedText();
            var url = this.props.url;
            var via = this.props.via;
            var twitterHref = 'https://twitter.com/intent/tweet?text=' + selectedText;

            if (url) {
                twitterHref += '&url=' + url;
            }

            if (via) {
                twitterHref += '&via=' + via;
            }

            return twitterHref;
        }
    });

    AlloyEditor.Buttons[ButtonTwitter.key] = AlloyEditor.ButtonTwitter = ButtonTwitter;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonUnorderedlist class provides functionality for creating unordered lists in an editor.
     *
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonUnorderedlist
     */

    var ButtonUnorderedlist = React.createClass({
        displayName: 'ButtonUnorderedlist',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default ul
             */
            key: 'ul'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'bulletedlist',
                style: {
                    element: 'ul'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.bulletedlist, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-ul', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.bulletedlist },
                React.createElement('span', { className: 'ae-icon-bulleted-list' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonUnorderedlist.key] = AlloyEditor.ButtonUnorderedlist = ButtonUnorderedlist;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonUnderline class provides functionality for underlying a text selection.
     *
     * @uses ButtonCommand
     * @uses ButtonKeystroke
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     *
     * @class ButtonUnderline
     */

    var ButtonUnderline = React.createClass({
        displayName: 'ButtonUnderline',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonKeystroke],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             */
            tabIndex: React.PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default underline
             */
            key: 'underline'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'underline',
                keystroke: {
                    fn: 'execCommand',
                    keys: CKEDITOR.CTRL + 85 /*U*/
                },
                style: 'coreStyles_underline'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.underline, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-underline', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.underline },
                React.createElement('span', { className: 'ae-icon-underline' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonUnderline.key] = AlloyEditor.ButtonUnderline = ButtonUnderline;
})();
'use strict';

(function () {
    'use strict';

    var POSITION_LEFT = 1;
    var POSITION_RIGHT = 2;

    /**
     * The ToolbarAdd class provides functionality for adding content to the editor.
     *
     * @uses WidgetDropdown
     * @uses WidgetExclusive
     * @uses WidgetFocusManager
     * @uses ToolbarButtons
     * @uses WidgetPosition
     * @uses WidgetArrowBox
     *
     * @class ToolbarAdd
     */
    var ToolbarAdd = React.createClass({
        displayName: 'ToolbarAdd',

        mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager, AlloyEditor.ToolbarButtons, AlloyEditor.WidgetPosition, AlloyEditor.WidgetArrowBox],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The toolbar configuration.
             *
             * @property {Object} config
             */
            config: React.PropTypes.object,

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The payload from "editorInteraction" event
             *
             * @property {Object} editorEvent
             */
            editorEvent: React.PropTypes.object,

            /**
             * The gutter to be applied to the widget when rendered in exclusive mode
             *
             * @property {Object} gutterExclusive
             */
            gutterExclusive: React.PropTypes.object,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * Provides a callback which should be executed when a dismiss key is pressed over a toolbar to return the focus to the editor.
             *
             * @property {Function} onDismiss
             */
            onDismiss: React.PropTypes.func,

            /**
             * Whether the Toolbar should be shown on left or on right of the editable area. Could be one of these:
             * - ToolbarAdd.left
             * - ToolbarAdd.right
             *
             * @property {Enum} position
             */
            position: React.PropTypes.oneOf([POSITION_LEFT, POSITION_RIGHT]),

            /**
             * The data, returned from {{#crossLink "CKEDITOR.plugins.selectionregion/getSelectionData:method"}}{{/crossLink}}
             *
             * @property {Object} selectionData
             */
            selectionData: React.PropTypes.object
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default add
             */
            key: 'add',

            /**
             * Defines the constant for positioning the Toolbar on left of the editable area.
             *
             * @static
             * @property {String} left
             * @default 1
             */
            left: POSITION_LEFT,

            /**
             * Defines the constant for positioning the Toolbar on right of the editable area.
             *
             * @static
             * @property {String} right
             * @default 2
             */
            right: POSITION_RIGHT
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: true,
                descendants: '.ae-button',
                gutterExclusive: {
                    left: 10,
                    top: 0
                },
                keys: {
                    dismiss: [27],
                    next: [39, 40],
                    prev: [37, 38]
                },
                position: POSITION_LEFT
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         *
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            this._updatePosition();
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * This method is not called for the initial render.
         *
         * @method componentDidUpdate
         * @param {Object} prevProps The previous state of the component's properties.
         * @param {Object} prevState Component's previous state.
         */
        componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
            this._updatePosition();

            // In case of exclusive rendering, focus the first descendant (button)
            // so the user will be able to start interacting with the buttons immediately.
            if (this.props.renderExclusive) {
                this.focus();
            }
        },

        /**
         * Lifecycle. Renders the buttons for adding content or hides the toolbar
         * if user interacted with a non-editable element.
         *
         * @method render
         * @return {Object|null} The content which should be rendered.
         */
        render: function render() {
            // Some operations such as `requestExclusive` may force editor to blur which will
            // invalidate the `props.editorEvent` stored value, without causing a `props` change.
            // For example, if the editor is empty, `ae_placeholder` plugin will remove
            // the target from the DOM and will prevent `add` toolbar from rendering.
            //
            // It should be safe to assume that if you have been able to render the toolbar
            // and request the exclusive mode, then rendering might be kept until the exclusive mode is left.
            if (!this.state.itemExclusive && this.props.editorEvent && this.props.editorEvent.data.nativeEvent.target && !this.props.editorEvent.data.nativeEvent.target.isContentEditable) {
                return null;
            }

            var buttons = this._getButtons();
            var className = this._getToolbarClassName();

            return React.createElement(
                'div',
                { 'aria-label': AlloyEditor.Strings.add, className: className, 'data-tabindex': this.props.config.tabIndex || 0, onFocus: this.focus, onKeyDown: this.handleKey, role: 'toolbar', tabIndex: '-1' },
                React.createElement(
                    'div',
                    { className: 'ae-container' },
                    buttons
                )
            );
        },

        /**
         * Returns a list of buttons that will eventually render to HTML.
         *
         * @protected
         * @method _getButtons
         * @return {Object} The buttons which have to be rendered.
         */
        _getButtons: function _getButtons() {
            var buttons;

            if (this.props.renderExclusive) {
                buttons = this.getToolbarButtons(this.props.config.buttons);
            } else {
                if (this.props.selectionData && this.props.selectionData.region) {
                    buttons = React.createElement(
                        'button',
                        { 'aria-label': AlloyEditor.Strings.add, className: 'ae-button ae-button-add', onClick: this.props.requestExclusive.bind(this, ToolbarAdd.key), title: AlloyEditor.Strings.add },
                        React.createElement('span', { className: 'ae-icon-add' })
                    );
                }
            }

            return buttons;
        },

        /**
         * Returns the class name of the toolbar in case of both exclusive and normal mode.
         *
         * @protected
         * @method _getToolbarClassName
         * @return {String} The class name which have to be applied to the DOM element.
         */
        _getToolbarClassName: function _getToolbarClassName() {
            var cssClass = 'ae-toolbar-add';

            if (this.props.renderExclusive) {
                cssClass = 'ae-toolbar ' + this.getArrowBoxClasses();
            }

            return cssClass;
        },

        /**
         * Calculates and sets the position of the toolbar in exclusive or normal mode.
         *
         * @protected
         * @method _updatePosition
         */
        _updatePosition: function _updatePosition() {
            var region;

            // If component is not mounted, there is nothing to do
            if (!ReactDOM.findDOMNode(this)) {
                return;
            }

            if (this.props.renderExclusive) {
                this.updatePosition();
                this.show();
            } else {
                if (this.props.selectionData) {
                    region = this.props.selectionData.region;
                }

                if (region) {
                    var domNode = ReactDOM.findDOMNode(this);
                    var domElement = new CKEDITOR.dom.element(domNode);

                    var startRect = region.startRect || region;
                    var clientRect = this.props.editor.get('nativeEditor').editable().getClientRect();

                    var offsetLeft;

                    var position = this.props.config.position || this.props.position;

                    if (position === POSITION_LEFT) {
                        offsetLeft = clientRect.left - domNode.offsetWidth - this.props.gutterExclusive.left + 'px';
                    } else {
                        offsetLeft = clientRect.right + this.props.gutterExclusive.left + 'px';
                    }

                    domNode.style.left = offsetLeft;
                    domNode.style.top = Math.floor(region.top - domNode.offsetHeight / 2 + startRect.height / 2) + 'px';
                    domNode.style.opacity = 1;

                    domElement.removeClass('ae-arrow-box');

                    this.cancelAnimation();
                }
            }
        }
    });

    AlloyEditor.Toolbars[ToolbarAdd.key] = AlloyEditor.ToolbarAdd = ToolbarAdd;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ToolbarStyles class hosts the buttons for styling a text selection.
     *
     * @uses WidgetDropdown
     * @uses WidgetExclusive
     * @uses WidgetFocusManager
     * @uses ToolbarButtons
     * @uses WidgetPosition
     * @uses WidgetArrowBox
     *
     * @class ToolbarStyles
     */

    var ToolbarStyles = React.createClass({
        displayName: 'ToolbarStyles',

        mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager, AlloyEditor.ToolbarButtons, AlloyEditor.WidgetPosition, AlloyEditor.WidgetArrowBox],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The toolbar configuration.
             *
             * @property {Object} config
             */
            config: React.PropTypes.object,

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The payload from "editorInteraction" event
             *
             * @property {Object} editorEvent
             */
            editorEvent: React.PropTypes.object,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             */
            label: React.PropTypes.string,

            /**
             * Provides a callback which should be executed when a dismiss key is pressed over a toolbar to return the focus to the editor.
             *
             * @property {Function} onDismiss
             */
            onDismiss: React.PropTypes.func,

            /**
             * The data, returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
             *
             * @property {Object} selectionData
             */
            selectionData: React.PropTypes.object
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @static
             * @property {String} key
             * @default styles
             */
            key: 'styles'
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         *
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            this._updatePosition();
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * This method is not called for the initial render.
         *
         * @method componentDidUpdate
         * @param {Object} prevProps The previous state of the component's properties.
         * @param {Object} prevState Component's previous state.
         */
        componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
            this._updatePosition();
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: true,
                descendants: '.ae-input, .ae-button:not([disabled]), .ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    next: [39, 40],
                    prev: [37, 38]
                }
            };
        },

        /**
         * Lifecycle. Renders the buttons for adding content or hides the toolbar
         * if user interacted with a non-editable element.
         *
         * @method render
         * @return {Object|null} The content which should be rendered.
         */
        render: function render() {
            var currentSelection = this._getCurrentSelection();

            if (currentSelection) {
                var getArrowBoxClassesFn = this._getSelectionFunction(currentSelection.getArrowBoxClasses);
                var arrowBoxClasses;

                if (getArrowBoxClassesFn) {
                    arrowBoxClasses = getArrowBoxClassesFn();
                } else {
                    arrowBoxClasses = this.getArrowBoxClasses();
                }

                var cssClasses = 'ae-toolbar-styles ' + arrowBoxClasses;

                var buttons = this.getToolbarButtons(currentSelection.buttons, {
                    manualSelection: this.props.editorEvent ? this.props.editorEvent.data.manualSelection : null,
                    selectionType: currentSelection.name
                });

                return React.createElement(
                    'div',
                    { 'aria-label': AlloyEditor.Strings.styles, className: cssClasses, 'data-tabindex': this.props.config.tabIndex || 0, onFocus: this.focus, onKeyDown: this.handleKey, role: 'toolbar', tabIndex: '-1' },
                    React.createElement(
                        'div',
                        { className: 'ae-container' },
                        buttons
                    )
                );
            }

            return null;
        },

        /**
         * Retrieve a function from String. It converts a fully qualified string into the mapped function.
         *
         * @method _getSelectionFunction
         * @protected
         * @param {Function|String} selectionFn A function, or a fully qualified string pointing to the
         * desired one (e.g. 'AlloyEditor.SelectionTest.image').
         * @return {Function} The mapped function.
         */
        _getSelectionFunction: function _getSelectionFunction(selectionFn) {
            var Lang = AlloyEditor.Lang;
            var selectionFunction;

            if (Lang.isFunction(selectionFn)) {
                selectionFunction = selectionFn;
            } else if (Lang.isString(selectionFn)) {
                var parts = selectionFn.split('.');
                var currentMember = window;
                var property = parts.shift();

                while (property && Lang.isObject(currentMember) && Lang.isObject(currentMember[property])) {
                    currentMember = currentMember[property];
                    property = parts.shift();
                }

                if (Lang.isFunction(currentMember)) {
                    selectionFunction = currentMember;
                }
            }

            return selectionFunction;
        },

        /**
         * Analyzes the current editor selection and returns the selection configuration that matches.
         *
         * @method _getCurrentSelection
         * @protected
         * @return {Object} The matched selection configuration.
         */
        _getCurrentSelection: function _getCurrentSelection() {
            var eventPayload = this.props.editorEvent ? this.props.editorEvent.data : null;
            var selection;

            if (eventPayload) {
                this.props.config.selections.some(function (item) {
                    var testFn = this._getSelectionFunction(item.test);
                    var result;

                    if (testFn) {
                        result = eventPayload.manualSelection === item.name || testFn({
                            data: eventPayload,
                            editor: this.props.editor
                        });
                    }

                    if (result) {
                        selection = item;
                    }

                    return result;
                }, this);
            }

            return selection;
        },

        /**
         * Calculates and sets the position of the toolbar.
         *
         * @protected
         * @method _updatePosition
         */
        _updatePosition: function _updatePosition() {
            // If component is not mounted, there is nothing to do
            if (!ReactDOM.findDOMNode(this)) {
                return;
            }

            var currentSelection = this._getCurrentSelection();
            var result;

            // If current selection has a function called `setPosition`, call it
            // and check the returned value. If false, fallback to the default positioning logic.
            if (currentSelection) {
                var setPositionFn = this._getSelectionFunction(currentSelection.setPosition);

                if (setPositionFn) {
                    result = setPositionFn.call(this, {
                        editor: this.props.editor,
                        editorEvent: this.props.editorEvent,
                        selectionData: this.props.selectionData
                    });
                }
            }

            if (!result) {
                this.updatePosition();
                this.show();
            }
        }
    });

    AlloyEditor.Toolbars[ToolbarStyles.key] = AlloyEditor.ToolbarStyles = ToolbarStyles;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The main editor UI class manages a hierarchy of widgets (toolbars and buttons).
     *
     * @uses WidgetExclusive
     * @uses WidgetFocusManager
     *
     * @class UI
     */

    var UI = React.createClass({
        displayName: 'UI',

        mixins: [AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * Localized messages for live aria updates. Should include the following messages:
             * - noToolbar: Notification for no available toolbar in the editor.
             * - oneToolbar: Notification for just one available toolbar in the editor.
             * - manyToolbars: Notification for more than one available toolbar in the editor.
             *
             * @property {Object} ariaUpdates
             */
            ariaUpdates: React.PropTypes.object,

            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             */
            editor: React.PropTypes.object.isRequired,

            /**
             * The delay (ms), after which key or mouse events will be processed.
             *
             * @property {Number} eventsDelay
             */
            eventsDelay: React.PropTypes.number,

            /**
             * The toolbars configuration for this editor instance
             *
             * @property {Object} toolbars
             */
            toolbars: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         *
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            return {
                hidden: false
            };
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: true,
                descendants: '[class^=ae-toolbar-]',
                eventsDelay: 0,
                keys: {
                    next: 9
                }
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            var editor = this.props.editor.get('nativeEditor');

            editor.on('editorInteraction', this._onEditorInteraction, this);
            editor.on('actionPerformed', this._onActionPerformed, this);
            editor.on('key', this._onEditorKey, this);

            // Set up events for hiding the UI when user stops interacting with the editor.
            // This may happen when he just clicks outside of the editor. However,
            // this does not include a situation when he clicks on some button, part of
            // editor's UI.

            // It is not easy to debounce _setUIHidden on mousedown, because if we
            // debounce it, when the handler is being invoked, the target might be no more part
            // of the editor's UI - onActionPerformed causes re-render.
            this._mousedownListener = function (event) {
                this._setUIHidden(event.target);
            }.bind(this);

            this._keyDownListener = CKEDITOR.tools.debounce(function (event) {
                this._setUIHidden(document.activeElement);
            }, this.props.eventsDelay, this);

            document.addEventListener('mousedown', this._mousedownListener);
            document.addEventListener('keydown', this._keyDownListener);
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * Fires `ariaUpdate` event passing ARIA related messages.
         * Fires `editorUpdate` event passing the previous and current properties and state.
         *
         * @method componentDidUpdate
         */
        componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
            var domNode = ReactDOM.findDOMNode(this);

            var editor = this.props.editor.get('nativeEditor');

            if (domNode) {
                editor.fire('ariaUpdate', {
                    message: this._getAvailableToolbarsMessage(domNode)
                });
            }

            editor.fire('editorUpdate', {
                prevProps: prevProps,
                prevState: prevState,
                props: this.props,
                state: this.state
            });
        },

        _getAriaUpdateTemplate: function _getAriaUpdateTemplate(ariaUpdate) {
            if (!this._ariaUpdateTemplates) {
                this._ariaUpdateTemplates = {};
            }

            if (!this._ariaUpdateTemplates[ariaUpdate]) {
                this._ariaUpdateTemplates[ariaUpdate] = new CKEDITOR.template(this._getAriaUpdates()[ariaUpdate]);
            }

            return this._ariaUpdateTemplates[ariaUpdate];
        },

        /**
         * Returns the templates for ARIA messages.
         *
         * @protected
         * @method _getAriaUpdates
         * @return {Object} ARIA relates messages. Default:
         * {
         *      noToolbar: AlloyEditor.Strings.ariaUpdateNoToolbar,
         *      oneToolbar: AlloyEditor.Strings.ariaUpdateOneToolbar,
         *      manyToolbars: AlloyEditor.Strings.ariaUpdateManyToolbars
         *  }
         */
        _getAriaUpdates: function _getAriaUpdates() {
            return this.props.ariaUpdates || {
                noToolbar: AlloyEditor.Strings.ariaUpdateNoToolbar,
                oneToolbar: AlloyEditor.Strings.ariaUpdateOneToolbar,
                manyToolbars: AlloyEditor.Strings.ariaUpdateManyToolbars
            };
        },

        /**
         * Returns an ARIA message which represents the number of currently available toolbars.
         *
         * @method _getAvailableToolbarsMessage
         * @protected
         * @param {CKEDITOR.dom.element} domNode The DOM node from which the available toolbars will be retrieved.
         * @return {String} The ARIA message for the number of available toolbars
         */
        _getAvailableToolbarsMessage: function _getAvailableToolbarsMessage(domNode) {
            var toolbarsNodeList = domNode.querySelectorAll('[role="toolbar"]');

            if (!toolbarsNodeList.length) {
                return this._getAriaUpdates().noToolbar;
            } else {
                var toolbarNames = Array.prototype.slice.call(toolbarsNodeList).map(function (toolbar) {
                    return toolbar.getAttribute('aria-label');
                });

                var ariaUpdate = toolbarNames.length === 1 ? 'oneToolbar' : 'manyToolbars';

                return this._getAriaUpdateTemplate(ariaUpdate).output({
                    toolbars: toolbarNames.join(',').replace(/,([^,]*)$/, ' and ' + '$1')
                });
            }
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @method componentWillUnmount
         */
        componentWillUnmount: function componentWillUnmount() {
            if (this._mousedownListener) {
                document.removeEventListener('mousedown', this._mousedownListener);
            }

            if (this._keyDownListener) {
                this._keyDownListener.detach();
                document.removeEventListener('keydown', this._keyDownListener);
            }
        },

        /**
         * Lifecycle. Renders the UI of the editor. This may include several toolbars and buttons.
         * The editor's UI also takes care of rendering the items in exclusive mode.
         *
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (this.state.hidden) {
                return null;
            }

            var toolbars = Object.keys(this.props.toolbars).map(function (toolbar) {
                return AlloyEditor.Toolbars[toolbar] || window[toolbar];
            });

            toolbars = this.filterExclusive(toolbars).map(function (toolbar) {
                var props = this.mergeExclusiveProps({
                    config: this.props.toolbars[toolbar.key],
                    editor: this.props.editor,
                    editorEvent: this.state.editorEvent,
                    key: toolbar.key,
                    onDismiss: this._onDismissToolbarFocus,
                    selectionData: this.state.selectionData
                }, toolbar.key);

                return React.createElement(toolbar, props);
            }.bind(this));

            return React.createElement(
                'div',
                { className: 'ae-toolbars', onKeyDown: this.handleKey },
                toolbars
            );
        },

        /**
         * Listener to the editor's `actionPerformed` event. Sets state and redraws the UI of the editor.
         *
         * @protected
         * @method _onActionPerformed
         * @param {SynteticEvent} event The provided event
         */
        _onActionPerformed: function _onActionPerformed(event) {
            var editor = this.props.editor.get('nativeEditor');

            editor.focus();

            this.setState({
                itemExclusive: null,
                selectionData: editor.getSelectionData()
            });
        },

        /**
         * Executed when a dismiss key is pressed over a toolbar to return the focus to the editor.
         *
         * @protected
         * @method _onDismissToolbarFocus
         */
        _onDismissToolbarFocus: function _onDismissToolbarFocus() {
            var editor = this.props.editor.get('nativeEditor');

            editor.focus();
        },

        /**
         * Listener to the editor's `userInteraction` event. Retrieves the data about the user selection and
         * provides it via component's state property.
         *
         * @protected
         * @method _onEditorInteraction
         * @param {SynteticEvent} event The provided event
         */
        _onEditorInteraction: function _onEditorInteraction(event) {
            this.setState({
                editorEvent: event,
                hidden: false,
                itemExclusive: null,
                selectionData: event.data.selectionData
            });
        },

        /**
         * Focuses on the active toolbar when the combination ALT+F10 is pressed inside the editor.
         *
         * @protected
         * @method _onEditorKey
         */
        _onEditorKey: function _onEditorKey(event) {
            var nativeEvent = event.data.domEvent.$;

            if (nativeEvent.altKey && nativeEvent.keyCode === 121) {
                this.focus();
            }
        },

        /**
         * Checks if the target with which the user interacted is part of editor's UI or it is
         * the editable area. If none of these, sets the state of editor's UI to be hidden.
         *
         * @protected
         * @method _setUIHidden
         * @param {DOMElement} target The DOM element with which user interacted lastly.
         */
        _setUIHidden: function _setUIHidden(target) {
            var domNode = ReactDOM.findDOMNode(this);

            if (domNode) {
                var editable = this.props.editor.get('nativeEditor').editable();
                var targetNode = new CKEDITOR.dom.node(target);

                var res = editable.$ === target || editable.contains(targetNode) || new CKEDITOR.dom.element(domNode).contains(targetNode);

                if (!res) {
                    this.setState({
                        hidden: true
                    });
                }
            }
        }
    });

    /**
     * Fired when component updates and when it is rendered in the DOM.
     * The payload consists from a `message` property containing the ARIA message.
     *
     * @event ariaUpdate
     */

    /**
     * Fired when component updates. The payload consists from an object with the following
     * properties:
     * - prevProps - The previous properties of the component
     * - prevState - The previous state of the component
     * - props - The current properties of the component
     * - state - The current state of the component
     *
     * @event ariaUpdate
     */

    AlloyEditor.UI = UI;
})();
    }
}());
