/*! OpenRemote or-vaadin-components 1.32.2, or-scheduler 1.32.2 and theme 1.32.2 (AGPL-3.0-or-later, Copyright OpenRemote Inc.) with Vaadin 25.3.4 (Apache-2.0), Lit 3.3.3 (BSD-3-Clause), moment 2.31.0 (MIT), rrule 2.8.1 (BSD-3-Clause), i18next 26.5.10 (MIT) and Inter 4.1.1 (OFL-1.1) - https://github.com/openremote/openremote */
var Uv=Object.create;var Ch=Object.defineProperty;var jv=Object.getOwnPropertyDescriptor;var Hv=Object.getOwnPropertyNames;var Wv=Object.getPrototypeOf,qv=Object.prototype.hasOwnProperty;var Sh=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var Kv=(r,t)=>()=>{try{return t||r((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};var Gv=(r,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Hv(t))!qv.call(r,s)&&s!==e&&Ch(r,s,{get:()=>t[s],enumerable:!(i=jv(t,s))||i.enumerable});return r};var Zv=(r,t,e)=>(e=r!=null?Uv(Wv(r)):{},Gv(t||!r||!r.__esModule?Ch(e,"default",{value:r,enumerable:!0}):e,r));var Bp=Kv((Sd,Fr)=>{(function(r,t){typeof Sd=="object"&&typeof Fr<"u"?Fr.exports=t():typeof define=="function"&&define.amd?define(t):r.moment=t()})(Sd,(function(){"use strict";var r;function t(){return r.apply(null,arguments)}function e(o){r=o}function i(o){return o instanceof Array||Object.prototype.toString.call(o)==="[object Array]"}function s(o){return o!=null&&Object.prototype.toString.call(o)==="[object Object]"}function n(o,l){return Object.prototype.hasOwnProperty.call(o,l)}function a(o){if(Object.getOwnPropertyNames)return Object.getOwnPropertyNames(o).length===0;var l;for(l in o)if(n(o,l))return!1;return!0}function d(o){return o===void 0}function c(o){return typeof o=="number"||Object.prototype.toString.call(o)==="[object Number]"}function f(o){return o instanceof Date||Object.prototype.toString.call(o)==="[object Date]"}function m(o,l){var h=[],u,p=o.length;for(u=0;u<p;++u)h.push(l(o[u],u));return h}function _(o,l){for(var h in l)n(l,h)&&(o[h]=l[h]);return n(l,"toString")&&(o.toString=l.toString),n(l,"valueOf")&&(o.valueOf=l.valueOf),o}function v(o,l,h,u){return eh(o,l,h,u,!0).utc()}function b(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidEra:null,invalidMonth:null,invalidOffset:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],era:null,meridiem:null,rfc2822:!1,weekdayMismatch:!1}}function y(o){return o._pf==null&&(o._pf=b()),o._pf}var T;Array.prototype.some?T=Array.prototype.some:T=function(o){var l=Object(this),h=l.length>>>0,u;for(u=0;u<h;u++)if(u in l&&o.call(this,l[u],u,l))return!0;return!1};function N(o){var l=null,h=!1,u=o._d&&!isNaN(o._d.getTime());if(u&&(l=y(o),h=T.call(l.parsedDateParts,function(p){return p!=null}),u=l.overflow<0&&!l.empty&&!l.invalidEra&&!l.invalidMonth&&!l.invalidOffset&&!l.invalidWeekday&&!l.weekdayMismatch&&!l.nullInput&&!l.invalidFormat&&!l.userInvalidated&&(!l.meridiem||l.meridiem&&h),o._strict&&(u=u&&l.charsLeftOver===0&&l.unusedTokens.length===0&&l.bigHour===void 0)),Object.isFrozen==null||!Object.isFrozen(o))o._isValid=u;else return u;return o._isValid}function $(o){var l=v(NaN);return o!=null?_(y(l),o):y(l).userInvalidated=!0,l}var B=t.momentProperties=[],ne=!1;function se(o,l){var h,u,p,g=B.length;if(d(l._isAMomentObject)||(o._isAMomentObject=l._isAMomentObject),d(l._i)||(o._i=l._i),d(l._f)||(o._f=l._f),d(l._l)||(o._l=l._l),d(l._strict)||(o._strict=l._strict),d(l._tzm)||(o._tzm=l._tzm),d(l._isUTC)||(o._isUTC=l._isUTC),d(l._offset)||(o._offset=l._offset),d(l._pf)||(o._pf=y(l)),d(l._locale)||(o._locale=l._locale),g>0)for(h=0;h<g;h++)u=B[h],p=l[u],d(p)||(o[u]=p);return o}function ye(o){se(this,o),this._d=new Date(o._d!=null?o._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),ne===!1&&(ne=!0,t.updateOffset(this),ne=!1)}function ee(o){return o instanceof ye||o!=null&&o._isAMomentObject!=null}function ft(o){t.suppressDeprecationWarnings===!1&&typeof console<"u"&&console.warn&&console.warn("Deprecation warning: "+o)}function We(o,l){var h=!0;return _(function(){if(t.deprecationHandler!=null&&t.deprecationHandler(null,o),h){var u=[],p,g,x,D=arguments.length;for(g=0;g<D;g++){if(p="",typeof arguments[g]=="object"){p+=`
[`+g+"] ";for(x in arguments[0])n(arguments[0],x)&&(p+=x+": "+arguments[0][x]+", ");p=p.slice(0,-2)}else p=arguments[g];u.push(p)}ft(o+`
Arguments: `+Array.prototype.slice.call(u).join("")+`
`+new Error().stack),h=!1}return l.apply(this,arguments)},l)}var pt={};function Je(o,l){t.deprecationHandler!=null&&t.deprecationHandler(o,l),pt[o]||(ft(l+`
`+new Error().stack),pt[o]=!0)}t.suppressDeprecationWarnings=!1,t.deprecationHandler=null;function st(o){return typeof Function<"u"&&o instanceof Function||Object.prototype.toString.call(o)==="[object Function]"}var Ns={D:"date",dates:"date",date:"date",d:"day",days:"day",day:"day",e:"weekday",weekdays:"weekday",weekday:"weekday",E:"isoWeekday",isoweekdays:"isoWeekday",isoweekday:"isoWeekday",DDD:"dayOfYear",dayofyears:"dayOfYear",dayofyear:"dayOfYear",h:"hour",hours:"hour",hour:"hour",ms:"millisecond",milliseconds:"millisecond",millisecond:"millisecond",m:"minute",minutes:"minute",minute:"minute",M:"month",months:"month",month:"month",Q:"quarter",quarters:"quarter",quarter:"quarter",s:"second",seconds:"second",second:"second",gg:"weekYear",weekyears:"weekYear",weekyear:"weekYear",GG:"isoWeekYear",isoweekyears:"isoWeekYear",isoweekyear:"isoWeekYear",w:"week",weeks:"week",week:"week",W:"isoWeek",isoweeks:"isoWeek",isoweek:"isoWeek",y:"year",years:"year",year:"year"};function he(o){return typeof o=="string"?Ns[o]||Ns[o.toLowerCase()]:void 0}function qe(o){var l={},h,u;for(u in o)n(o,u)&&(h=he(u),h&&(l[h]=o[u]));return l}var $s={date:9,day:11,weekday:11,isoWeekday:11,dayOfYear:4,hour:13,millisecond:16,minute:14,month:8,quarter:7,second:15,weekYear:1,isoWeekYear:1,week:5,isoWeek:5,year:1};function nt(o){var l=[],h;for(h in o)n(o,h)&&l.push({unit:h,priority:$s[h]});return l.sort(function(u,p){return u.priority-p.priority}),l}function _e(o,l,h){var u=""+Math.abs(o),p=l-u.length,g=o>=0;return(g?h?"+":"":"-")+Math.pow(10,Math.max(0,p)).toString().substr(1)+u}var At=/(\[[^\[]*\])|(\\e)|(\\)?(eHHmm|[Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Pt=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Ki={},Se={};function R(o,l,h,u){var p=u;typeof u=="string"&&(p=function(){return this[u]()}),o&&(Se[o]=p),l&&(Se[l[0]]=function(){return _e(p.apply(this,arguments),l[1],l[2])}),h&&(Se[h]=function(){return this.localeData().ordinal(p.apply(this,arguments),o)})}function Ci(o){return o.match(/\[[\s\S]/)?o.replace(/^\[|\]$/g,""):o.replace(/\\/g,"")}function Fs(o){var l=o.match(At),h,u;for(h=0,u=l.length;h<u;h++)Se[l[h]]?l[h]=Se[l[h]]:l[h]=Ci(l[h]);return function(p){var g="",x;for(x=0;x<u;x++)g+=st(l[x])?l[x].call(p,o):l[x];return g}}function Bs(o,l){if(!o.isValid())return o.localeData().invalidDate();l=Od(l,o.localeData());var h="$"+l;return n(Ki,h)||(Ki[h]=Fs(l)),Ki[h](o)}function Od(o,l){var h=5;function u(p){return l.longDateFormat(p)||p}for(Pt.lastIndex=0;h>=0&&Pt.test(o);)o=o.replace(Pt,u),Pt.lastIndex=0,h-=1;return o}var Dd=/\d/,Qe=/\d\d/,Md=/\d{3}/,Jo=/\d{4}/,Vs=/[+-]?\d{6}/,pe=/\d\d?/,Id=/\d\d\d\d?/,Qo=/\d\d\d\d\d\d?/,zs=/\d{1,3}/,ea=/\d{1,4}/,Ys=/[+-]?\d{1,6}/,Gi=/\d+/,Us=/[+-]?\d+/,Wp=/Z|[+-]\d\d:?\d\d/gi,js=/Z|[+-]\d\d(?::?\d\d)?/gi,qp=/[+-]?\d+(\.\d{1,3})?/,Br=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,Zi=/^[1-9]\d?/,ta=/^([1-9]\d|\d)/,Hs;Hs={};function P(o,l,h){Hs[o]=st(l)?l:function(u,p){return u&&h?h:l}}function Kp(o,l){return n(Hs,o)?Hs[o](l._strict,l._locale):new RegExp(Gp(o))}function Gp(o){return Lt(o.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(l,h,u,p,g){return h||u||p||g}))}function Lt(o){return o.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function ot(o){return o<0?Math.ceil(o)||0:Math.floor(o)}function H(o){var l=+o,h=0;return l!==0&&isFinite(l)&&(h=ot(l)),h}var ia={};function le(o,l){var h,u=l,p;for(typeof o=="string"&&(o=[o]),c(l)&&(u=function(g,x){x[l]=H(g)}),p=o.length,h=0;h<p;h++)ia[o[h]]=u}function Xi(o,l){le(o,function(h,u,p,g){p._w=p._w||{},l(h,p._w,p,g)})}function Zp(o,l,h){l!=null&&n(ia,o)&&ia[o](l,h._a,h,o)}function Ws(o){return o%4===0&&o%100!==0||o%400===0}var xe=0,et=1,Ke=2,ke=3,at=4,Rt=5,Si=6,Xp=7,Jp=8;R("Y",0,0,function(){var o=this.year();return o<=9999?_e(o,4):"+"+o}),R(0,["YY",2],0,function(){return this.year()%100}),R(0,["YYYY",4],0,"year"),R(0,["YYYYY",5],0,"year"),R(0,["YYYYYY",6,!0],0,"year"),P("Y",Us),P("YY",pe,Qe),P("YYYY",ea,Jo),P("YYYYY",Ys,Vs),P("YYYYYY",Ys,Vs),le(["YYYYY","YYYYYY"],xe),le("YYYY",function(o,l){l[xe]=o.length===2?t.parseTwoDigitYear(o):H(o)}),le("YY",function(o,l){l[xe]=t.parseTwoDigitYear(o)}),le("Y",function(o,l){l[xe]=parseInt(o,10)});function Vr(o){return Ws(o)?366:365}t.parseTwoDigitYear=function(o){return H(o)+(H(o)>68?1900:2e3)};var Ad=Ji("FullYear",!0);function Qp(){return Ws(this.year())}function Ji(o,l){return function(h){return h!=null?(Pd(this,o,h),t.updateOffset(this,l),this):zr(this,o)}}function zr(o,l){if(!o.isValid())return NaN;var h=o._d,u=o._isUTC;switch(l){case"Milliseconds":return u?h.getUTCMilliseconds():h.getMilliseconds();case"Seconds":return u?h.getUTCSeconds():h.getSeconds();case"Minutes":return u?h.getUTCMinutes():h.getMinutes();case"Hours":return u?h.getUTCHours():h.getHours();case"Date":return u?h.getUTCDate():h.getDate();case"Day":return u?h.getUTCDay():h.getDay();case"Month":return u?h.getUTCMonth():h.getMonth();case"FullYear":return u?h.getUTCFullYear():h.getFullYear();default:return NaN}}function Pd(o,l,h){var u,p,g,x,D;if(!(!o.isValid()||isNaN(h))){switch(u=o._d,p=o._isUTC,l){case"Milliseconds":return void(p?u.setUTCMilliseconds(h):u.setMilliseconds(h));case"Seconds":return void(p?u.setUTCSeconds(h):u.setSeconds(h));case"Minutes":return void(p?u.setUTCMinutes(h):u.setMinutes(h));case"Hours":return void(p?u.setUTCHours(h):u.setHours(h));case"Date":return void(p?u.setUTCDate(h):u.setDate(h));case"FullYear":break;default:return}g=h,x=o.month(),D=o.date(),D=D===29&&x===1&&!Ws(g)?28:D,p?u.setUTCFullYear(g,x,D):u.setFullYear(g,x,D)}}function em(o){return o=he(o),st(this[o])?this[o]():this}function tm(o,l){if(typeof o=="object"){o=qe(o);var h=nt(o),u,p=h.length;for(u=0;u<p;u++)this[h[u].unit](o[h[u].unit])}else if(o=he(o),st(this[o]))return this[o](l);return this}function im(o,l){return(o%l+l)%l}var we;Array.prototype.indexOf?we=Array.prototype.indexOf:we=function(o){var l;for(l=0;l<this.length;++l)if(this[l]===o)return l;return-1};function ra(o,l){if(isNaN(o)||isNaN(l))return NaN;var h=im(l,12);return o+=(l-h)/12,h===1?Ws(o)?29:28:31-h%7%2}R("M",["MM",2],"Mo",function(){return this.month()+1}),R("MMM",0,0,function(o){return this.localeData().monthsShort(this,o)}),R("MMMM",0,0,function(o){return this.localeData().months(this,o)}),P("M",pe,Zi),P("MM",pe,Qe),P("MMM",function(o,l){return l.monthsShortRegex(o)}),P("MMMM",function(o,l){return l.monthsRegex(o)}),le(["M","MM"],function(o,l){l[et]=H(o)-1}),le(["MMM","MMMM"],function(o,l,h,u){var p=h._locale.monthsParse(o,u,h._strict);p!=null?l[et]=p:y(h).invalidMonth=o});var rm="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Ld="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Rd=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,sm=Br,nm=Br,Nd=["monthsParse","longMonthsParse","shortMonthsParse","monthsRegex","monthsShortRegex","monthsStrictRegex","monthsShortStrictRegex"];function om(o,l){var h,u;for(h=0;h<Nd.length;h++)u=Nd[h],n(l,u)||delete o["_"+u]}function am(o,l){return o?i(this._months)?this._months[o.month()]:this._months[(this._months.isFormat||Rd).test(l)?"format":"standalone"][o.month()]:i(this._months)?this._months:this._months.standalone}function lm(o,l){return o?i(this._monthsShort)?this._monthsShort[o.month()]:this._monthsShort[Rd.test(l)?"format":"standalone"][o.month()]:i(this._monthsShort)?this._monthsShort:this._monthsShort.standalone}function dm(o,l,h){var u,p,g,x=o.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],u=0;u<12;++u)g=v([2e3,u]),this._shortMonthsParse[u]=this.monthsShort(g,"").toLocaleLowerCase(),this._longMonthsParse[u]=this.months(g,"").toLocaleLowerCase();return h?l==="MMM"?(p=we.call(this._shortMonthsParse,x),p!==-1?p:null):(p=we.call(this._longMonthsParse,x),p!==-1?p:null):l==="MMM"?(p=we.call(this._shortMonthsParse,x),p!==-1?p:(p=we.call(this._longMonthsParse,x),p!==-1?p:null)):(p=we.call(this._longMonthsParse,x),p!==-1?p:(p=we.call(this._shortMonthsParse,x),p!==-1?p:null))}function hm(o,l,h){var u,p,g;if(this._monthsParseExact)return dm.call(this,o,l,h);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),u=0;u<12;u++){if(p=v([2e3,u]),h&&!this._longMonthsParse[u]&&(this._longMonthsParse[u]=new RegExp("^"+this.months(p,"").replace(".","")+"$","i"),this._shortMonthsParse[u]=new RegExp("^"+this.monthsShort(p,"").replace(".","")+"$","i")),!h&&!this._monthsParse[u]&&(g="^"+this.months(p,"")+"|^"+this.monthsShort(p,""),this._monthsParse[u]=new RegExp(g.replace(".",""),"i")),h&&l==="MMMM"&&this._longMonthsParse[u].test(o))return u;if(h&&l==="MMM"&&this._shortMonthsParse[u].test(o))return u;if(!h&&this._monthsParse[u].test(o))return u}}function $d(o,l){if(!o.isValid())return o;if(typeof l=="string"){if(/^\d+$/.test(l))l=H(l);else if(l=o.localeData().monthsParse(l),!c(l))return o}var h=l,u=o.date();return u=u<29?u:Math.min(u,ra(o.year(),h)),o._isUTC?o._d.setUTCMonth(h,u):o._d.setMonth(h,u),o}function Fd(o){return o!=null?($d(this,o),t.updateOffset(this,!0),this):zr(this,"Month")}function um(){return ra(this.year(),this.month())}function cm(o){return this._monthsParseExact?(n(this,"_monthsRegex")||Bd.call(this),o?this._monthsShortStrictRegex:this._monthsShortRegex):(n(this,"_monthsShortRegex")||(this._monthsShortRegex=sm),this._monthsShortStrictRegex&&o?this._monthsShortStrictRegex:this._monthsShortRegex)}function fm(o){return this._monthsParseExact?(n(this,"_monthsRegex")||Bd.call(this),o?this._monthsStrictRegex:this._monthsRegex):(n(this,"_monthsRegex")||(this._monthsRegex=nm),this._monthsStrictRegex&&o?this._monthsStrictRegex:this._monthsRegex)}function Bd(){function o(V,W){return W.length-V.length}var l=[],h=[],u=[],p,g,x,D;for(p=0;p<12;p++)g=v([2e3,p]),x=Lt(this.monthsShort(g,"")),D=Lt(this.months(g,"")),l.push(x),h.push(D),u.push(D),u.push(x);l.sort(o),h.sort(o),u.sort(o),this._monthsRegex=new RegExp("^("+u.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+h.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+l.join("|")+")","i")}R("d",0,"do","day"),R("dd",0,0,function(o){return this.localeData().weekdaysMin(this,o)}),R("ddd",0,0,function(o){return this.localeData().weekdaysShort(this,o)}),R("dddd",0,0,function(o){return this.localeData().weekdays(this,o)}),R("e",0,0,"weekday"),R("E",0,0,"isoWeekday"),R("eHHmm",0,0,function(){return""+this.weekday()+_e(this.hours(),2)+_e(this.minutes(),2)}),P("d",pe),P("e",pe),P("E",pe),P("eHHmm",Qo),P("dd",function(o,l){return l.weekdaysMinRegex(o)}),P("ddd",function(o,l){return l.weekdaysShortRegex(o)}),P("dddd",function(o,l){return l.weekdaysRegex(o)}),Xi(["dd","ddd","dddd"],function(o,l,h,u){var p=h._locale.weekdaysParse(o,u,h._strict);p!=null?l.d=p:y(h).invalidWeekday=o}),Xi(["d","e","E"],function(o,l,h,u){l[u]=H(o)}),Xi("eHHmm",function(o,l,h){var u=o.length-4;l.e=H(o.substr(0,u)),h._a[ke]=H(o.substr(u,2)),h._a[at]=H(o.substr(u+2))});function pm(o,l){return typeof o!="string"?o:isNaN(o)?(o=l.weekdaysParse(o),typeof o=="number"?o:null):parseInt(o,10)}function mm(o,l){return typeof o=="string"?l.weekdaysParse(o)%7||7:isNaN(o)?null:o}function sa(o,l){return o.slice(l,7).concat(o.slice(0,l))}var _m="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Vd="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),gm="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),vm=Br,ym=Br,bm=Br,zd=["weekdaysParse","fullWeekdaysParse","shortWeekdaysParse","minWeekdaysParse","weekdaysRegex","weekdaysShortRegex","weekdaysMinRegex","weekdaysStrictRegex","weekdaysShortStrictRegex","weekdaysMinStrictRegex"];function xm(o,l){var h,u;for(h=0;h<zd.length;h++)u=zd[h],n(l,u)||delete o["_"+u]}function wm(o,l){var h=i(this._weekdays)?this._weekdays:this._weekdays[o&&o!==!0&&this._weekdays.isFormat.test(l)?"format":"standalone"];return o===!0?sa(h,this._week.dow):o?h[o.day()]:h}function Cm(o){return o===!0?sa(this._weekdaysShort,this._week.dow):o?this._weekdaysShort[o.day()]:this._weekdaysShort}function Sm(o){return o===!0?sa(this._weekdaysMin,this._week.dow):o?this._weekdaysMin[o.day()]:this._weekdaysMin}function km(o,l,h){var u,p,g,x=o.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],u=0;u<7;++u)g=v([2e3,1]).day(u),this._minWeekdaysParse[u]=this.weekdaysMin(g,"").toLocaleLowerCase(),this._shortWeekdaysParse[u]=this.weekdaysShort(g,"").toLocaleLowerCase(),this._weekdaysParse[u]=this.weekdays(g,"").toLocaleLowerCase();return h?l==="dddd"?(p=we.call(this._weekdaysParse,x),p!==-1?p:null):l==="ddd"?(p=we.call(this._shortWeekdaysParse,x),p!==-1?p:null):(p=we.call(this._minWeekdaysParse,x),p!==-1?p:null):l==="dddd"?(p=we.call(this._weekdaysParse,x),p!==-1||(p=we.call(this._shortWeekdaysParse,x),p!==-1)?p:(p=we.call(this._minWeekdaysParse,x),p!==-1?p:null)):l==="ddd"?(p=we.call(this._shortWeekdaysParse,x),p!==-1||(p=we.call(this._weekdaysParse,x),p!==-1)?p:(p=we.call(this._minWeekdaysParse,x),p!==-1?p:null)):(p=we.call(this._minWeekdaysParse,x),p!==-1||(p=we.call(this._weekdaysParse,x),p!==-1)?p:(p=we.call(this._shortWeekdaysParse,x),p!==-1?p:null))}function Em(o,l,h){var u,p,g;if(this._weekdaysParseExact)return km.call(this,o,l,h);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),u=0;u<7;u++){if(p=v([2e3,1]).day(u),h&&!this._fullWeekdaysParse[u]&&(this._fullWeekdaysParse[u]=new RegExp("^"+this.weekdays(p,"").replace(".","\\.?")+"$","i"),this._shortWeekdaysParse[u]=new RegExp("^"+this.weekdaysShort(p,"").replace(".","\\.?")+"$","i"),this._minWeekdaysParse[u]=new RegExp("^"+this.weekdaysMin(p,"").replace(".","\\.?")+"$","i")),this._weekdaysParse[u]||(g="^"+this.weekdays(p,"")+"|^"+this.weekdaysShort(p,"")+"|^"+this.weekdaysMin(p,""),this._weekdaysParse[u]=new RegExp(g.replace(".",""),"i")),h&&l==="dddd"&&this._fullWeekdaysParse[u].test(o))return u;if(h&&l==="ddd"&&this._shortWeekdaysParse[u].test(o))return u;if(h&&l==="dd"&&this._minWeekdaysParse[u].test(o))return u;if(!h&&this._weekdaysParse[u].test(o))return u}}function Tm(o){if(!this.isValid())return o!=null?this:NaN;var l=zr(this,"Day");return o!=null?(o=pm(o,this.localeData()),this.add(o-l,"d")):l}function Om(o){if(!this.isValid())return o!=null?this:NaN;var l=(this.day()+7-this.localeData()._week.dow)%7;return o==null?l:this.add(o-l,"d")}function Dm(o){if(!this.isValid())return o!=null?this:NaN;if(o!=null){var l=mm(o,this.localeData());return this.day(this.day()%7?l:l-7)}else return this.day()||7}function Mm(o){return this._weekdaysParseExact?(n(this,"_weekdaysRegex")||na.call(this),o?this._weekdaysStrictRegex:this._weekdaysRegex):(n(this,"_weekdaysRegex")||(this._weekdaysRegex=vm),this._weekdaysStrictRegex&&o?this._weekdaysStrictRegex:this._weekdaysRegex)}function Im(o){return this._weekdaysParseExact?(n(this,"_weekdaysRegex")||na.call(this),o?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(n(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=ym),this._weekdaysShortStrictRegex&&o?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Am(o){return this._weekdaysParseExact?(n(this,"_weekdaysRegex")||na.call(this),o?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(n(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=bm),this._weekdaysMinStrictRegex&&o?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function na(){function o(De,zt){return zt.length-De.length}var l=[],h=[],u=[],p=[],g,x,D,V,W;for(g=0;g<7;g++)x=v([2e3,1]).day(g),D=Lt(this.weekdaysMin(x,"")),V=Lt(this.weekdaysShort(x,"")),W=Lt(this.weekdays(x,"")),l.push(D),h.push(V),u.push(W),p.push(D),p.push(V),p.push(W);l.sort(o),h.sort(o),u.sort(o),p.sort(o),this._weekdaysRegex=new RegExp("^("+p.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+h.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+l.join("|")+")","i")}function Pm(o){var l,h;om(this,o),xm(this,o);for(h in o)n(o,h)&&(l=o[h],st(l)?this[h]=l:this["_"+h]=l);this._config=o,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)}function oa(o,l){var h=_({},o),u;for(u in l)n(l,u)&&(s(o[u])&&s(l[u])?(h[u]={},_(h[u],o[u]),_(h[u],l[u])):l[u]!=null?h[u]=l[u]:delete h[u]);for(u in o)n(o,u)&&!n(l,u)&&s(o[u])&&(h[u]=_({},h[u]));return h}function aa(o){o!=null&&this.set(o)}var la;Object.keys?la=Object.keys:la=function(o){var l,h=[];for(l in o)n(o,l)&&h.push(l);return h};var Lm={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"};function Rm(o,l,h){var u=this._calendar[o]||this._calendar.sameElse;return st(u)?u.call(l,h):u}var Nm={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};function $m(o){var l=this._longDateFormat[o],h=this._longDateFormat[o.toUpperCase()],u=this._longDateFormatCache;return l||!h?l:u&&u[o]&&u[o].formatUpper===h?u[o].format:(l=h.match(At).map(function(p){return p==="MMMM"||p==="MM"||p==="DD"||p==="dddd"?p.slice(1):p}).join(""),u||(u=this._longDateFormatCache={}),u[o]={formatUpper:h,format:l},l)}var Fm="Invalid date";function Bm(){return this._invalidDate}var Vm="%d",zm=/\d{1,2}/;function Ym(o){return this._ordinal.replace("%d",o)}var Um={future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",w:"a week",ww:"%d weeks",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function Yd(o,l,h,u){var p=this._relativeTime[h];return st(p)?p(o,l,h,u):p.replace(/%d/i,o)}function jm(o,l,h,u){return this.postformat(Yd.call(this,o,l,h,u))}function Ud(o,l){var h=this._relativeTime[o>0?"future":"past"];return st(h)?h(l):h.replace(/%s/i,l)}function Hm(o,l){return this.postformat(Ud.call(this,o,l))}function Wm(o,l,h,u,p,g,x){var D;return o<100&&o>=0?(D=new Date(o+400,l,h,u,p,g,x),isFinite(D.getFullYear())&&D.setFullYear(o)):D=new Date(o,l,h,u,p,g,x),D}function ki(o){var l,h;return o<100&&o>=0?(h=Array.prototype.slice.call(arguments),h[0]=o+400,l=new Date(Date.UTC.apply(null,h)),isFinite(l.getUTCFullYear())&&l.setUTCFullYear(o)):l=new Date(Date.UTC.apply(null,arguments)),l}function qs(o,l,h){var u=7+l-h,p=(7+ki(o,0,u).getUTCDay()-l)%7;return-p+u-1}function jd(o,l,h,u,p){var g=(7+h-u)%7,x=qs(o,u,p),D=1+7*(l-1)+g+x,V,W;return D<=0?(V=o-1,W=Vr(V)+D):D>Vr(o)?(V=o+1,W=D-Vr(o)):(V=o,W=D),{year:V,dayOfYear:W}}function Hd(o,l,h,u){var p=qs(o,h,u),g=Math.floor((l-p-1)/7)+1,x,D;return g<1?(D=o-1,x=g+Nt(D,h,u)):g>Nt(o,h,u)?(x=g-Nt(o,h,u),D=o+1):(D=o,x=g),{week:x,year:D}}function da(o,l,h){return Hd(o.year(),o.dayOfYear(),l,h)}function Wd(o,l,h,u,p){var g=Math.round((ki(o,l,h)-ki(o,0,1))/864e5)+1;return Hd(o,g,u,p)}function Nt(o,l,h){var u=qs(o,l,h),p=qs(o+1,l,h);return(Vr(o)-u+p)/7}R("w",["ww",2],"wo","week"),R("W",["WW",2],"Wo","isoWeek"),P("w",pe,Zi),P("ww",pe,Qe),P("W",pe,Zi),P("WW",pe,Qe),Xi(["w","ww","W","WW"],function(o,l,h,u){l[u.substr(0,1)]=H(o)});function qm(o){return da(o,this._week.dow,this._week.doy).week}var Km={dow:0,doy:6};function Gm(){return this._week.dow}function Zm(){return this._week.doy}function Xm(o){var l=this.localeData().week(this);return o==null?l:this.add((o-l)*7,"d")}function Jm(o){var l=da(this,1,4).week;return o==null?l:this.add((o-l)*7,"d")}function ha(){return this.hours()%12||12}function Qm(){return this.hours()||24}R("H",["HH",2],0,"hour"),R("h",["hh",2],0,ha),R("k",["kk",2],0,Qm),R("hmm",0,0,function(){return""+ha.apply(this)+_e(this.minutes(),2)}),R("hmmss",0,0,function(){return""+ha.apply(this)+_e(this.minutes(),2)+_e(this.seconds(),2)}),R("Hmm",0,0,function(){return""+this.hours()+_e(this.minutes(),2)}),R("Hmmss",0,0,function(){return""+this.hours()+_e(this.minutes(),2)+_e(this.seconds(),2)});function qd(o,l){R(o,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),l)})}qd("a",!0),qd("A",!1);function Kd(o,l){return l._meridiemParse}P("a",Kd),P("A",Kd),P("H",pe,ta),P("h",pe,Zi),P("k",pe,Zi),P("HH",pe,Qe),P("hh",pe,Qe),P("kk",pe,Qe),P("hmm",Id),P("hmmss",Qo),P("Hmm",Id),P("Hmmss",Qo),le(["H","HH"],ke),le(["k","kk"],function(o,l,h){var u=H(o);l[ke]=u===24?0:u}),le(["a","A"],function(o,l,h){h._isPm=h._locale.isPM(o),h._meridiem=o}),le(["h","hh"],function(o,l,h){l[ke]=H(o),y(h).bigHour=!0}),le("hmm",function(o,l,h){var u=o.length-2;l[ke]=H(o.substr(0,u)),l[at]=H(o.substr(u)),y(h).bigHour=!0}),le("hmmss",function(o,l,h){var u=o.length-4,p=o.length-2;l[ke]=H(o.substr(0,u)),l[at]=H(o.substr(u,2)),l[Rt]=H(o.substr(p)),y(h).bigHour=!0}),le("Hmm",function(o,l,h){var u=o.length-2;l[ke]=H(o.substr(0,u)),l[at]=H(o.substr(u))}),le("Hmmss",function(o,l,h){var u=o.length-4,p=o.length-2;l[ke]=H(o.substr(0,u)),l[at]=H(o.substr(u,2)),l[Rt]=H(o.substr(p))});function e_(o){return(o+"").toLowerCase().charAt(0)==="p"}var t_=/[ap]\.?m?\.?/i,i_=Ji("Hours",!0);function r_(o,l,h){return o>11?h?"pm":"PM":h?"am":"AM"}var Gd={calendar:Lm,longDateFormat:Nm,invalidDate:Fm,ordinal:Vm,dayOfMonthOrdinalParse:zm,relativeTime:Um,months:rm,monthsShort:Ld,week:Km,weekdays:_m,weekdaysMin:gm,weekdaysShort:Vd,meridiemParse:t_},de={},Yr={},Ur;function s_(o,l){var h,u=Math.min(o.length,l.length);for(h=0;h<u;h+=1)if(o[h]!==l[h])return h;return u}function ua(o){return o&&o.toLowerCase().replace("_","-")}function n_(o){for(var l=0,h,u,p,g;l<o.length;){for(g=ua(o[l]).split("-"),h=g.length,u=ua(o[l+1]),u=u?u.split("-"):null;h>0;){if(p=Ks(g.slice(0,h).join("-")),p)return p;if(u&&u.length>=h&&s_(g,u)>=h-1)break;h--}l++}return Ur}function o_(o){return typeof o=="string"&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(o)}function Ks(o){var l=null,h,u;if(n(de,o))return de[o];if(u=ua(o),n(de,u))return de[u];if(typeof Fr<"u"&&Fr&&Fr.exports&&o_(u))try{l=Ur._abbr,h=Sh,h("./locale/"+u),ri(l)}catch{de[u]=null}if(n(de,u))return de[u]}function ri(o,l){var h;return o&&(d(l)?h=$t(o):h=ca(o,l),h?Ur=h:typeof console<"u"&&console.warn&&console.warn("Locale "+o+" not found. Did you forget to load it?")),Ur._abbr}function ca(o,l){if(l!==null){var h,u=Gd;if(l.abbr=o,de[o]!=null)Je("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),u=de[o]._config;else if(l.parentLocale!=null)if(de[l.parentLocale]!=null)u=de[l.parentLocale]._config;else if(h=Ks(l.parentLocale),h!=null)u=h._config;else return Yr[l.parentLocale]||(Yr[l.parentLocale]=[]),Yr[l.parentLocale].push({name:o,config:l}),null;return de[o]=new aa(oa(u,l)),Yr[o]&&Yr[o].forEach(function(p){ca(p.name,p.config)}),ri(o),de[o]}else return delete de[o],null}function a_(o,l){var h,u=Ks(o),p=Gd;return u!=null&&(o=u._abbr),l!=null?(de[o]!=null&&de[o].parentLocale!=null?de[o].set(oa(de[o]._config,l)):(u!=null&&(p=u._config),l=oa(p,l),u==null&&(l.abbr=o),h=new aa(l),h.parentLocale=de[o],de[o]=h),ri(o)):de[o]!=null&&(de[o].parentLocale!=null?(de[o]=de[o].parentLocale,o===ri()&&ri(o)):de[o]!=null&&delete de[o]),de[o]}function $t(o){var l;if(o&&o._locale&&o._locale._abbr&&(o=o._locale._abbr),!o)return Ur;if(!i(o)){if(l=Ks(o),l)return l;o=[o]}return n_(o)}function l_(){return la(de)}function fa(o){var l,h=o._a;return h&&y(o).overflow===-2&&(l=h[et]<0||h[et]>11?et:h[Ke]<1||h[Ke]>ra(h[xe],h[et])?Ke:h[ke]<0||h[ke]>24||h[ke]===24&&(h[at]!==0||h[Rt]!==0||h[Si]!==0)?ke:h[at]<0||h[at]>59?at:h[Rt]<0||h[Rt]>59?Rt:h[Si]<0||h[Si]>999?Si:-1,y(o)._overflowDayOfYear&&(l<xe||l>Ke)&&(l=Ke),y(o)._overflowWeeks&&l===-1&&(l=Xp),y(o)._overflowWeekday&&l===-1&&(l=Jp),y(o).overflow=l),o}var d_=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,h_=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,u_=/Z|[+-]\d\d(?::?\d\d)?/,Gs=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/],["YYYYMM",/\d{6}/,!1],["YYYY",/\d{4}/,!1]],pa=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],c_=/^\/?Date\((-?\d+)/i,f_=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,p_={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function Zd(o){var l,h,u=o._i,p=d_.exec(u)||h_.exec(u),g,x,D,V,W=Gs.length,De=pa.length;if(p){for(y(o).iso=!0,l=0,h=W;l<h;l++)if(Gs[l][1].exec(p[1])){x=Gs[l][0],g=Gs[l][2]!==!1;break}if(x==null){o._isValid=!1;return}if(p[3]){for(l=0,h=De;l<h;l++)if(pa[l][1].exec(p[3])){D=(p[2]||" ")+pa[l][0];break}if(D==null){o._isValid=!1;return}}if(!g&&D!=null){o._isValid=!1;return}if(p[4])if(u_.exec(p[4]))V="Z";else{o._isValid=!1;return}o._f=x+(D||"")+(V||""),_a(o)}else o._isValid=!1}function m_(o,l,h,u,p,g){var x=[__(o),Ld.indexOf(l),parseInt(h,10),parseInt(u,10),parseInt(p,10)];return g&&x.push(parseInt(g,10)),x}function __(o){var l=parseInt(o,10);return l<=49?2e3+l:l<=999?1900+l:l}function g_(o){return o.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function v_(o,l,h){if(o){var u=Vd.indexOf(o),p=new Date(l[0],l[1],l[2]).getDay();if(u!==p)return y(h).weekdayMismatch=!0,h._isValid=!1,!1}return!0}function y_(o,l,h){if(o)return p_[o];if(l)return 0;var u=parseInt(h,10),p=u%100,g=(u-p)/100;return g*60+p}function Xd(o){var l=f_.exec(g_(o._i)),h;if(l){if(h=m_(l[4],l[3],l[2],l[5],l[6],l[7]),!v_(l[1],h,o))return;o._a=h,o._tzm=y_(l[8],l[9],l[10]),o._d=ki.apply(null,o._a),o._d.setUTCMinutes(o._d.getUTCMinutes()-o._tzm),y(o).rfc2822=!0}else o._isValid=!1}function b_(o){var l=c_.exec(o._i);if(l!==null){o._d=new Date(+l[1]);return}if(Zd(o),o._isValid===!1)delete o._isValid;else return;if(Xd(o),o._isValid===!1)delete o._isValid;else return;o._strict?o._isValid=!1:t.createFromInputFallback(o)}t.createFromInputFallback=We("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(o){o._d=new Date(o._i+(o._useUTC?" UTC":""))});function jr(o,l,h){return o??l??h}function Jd(o,l,h){var u=Object.prototype.hasOwnProperty.call(o,"_isDefaultDatePartsForWeek"),p=o._isDefaultDatePartsForWeek;o._isDefaultDatePartsForWeek=!!h;try{return t._getDefaultDateParts(o,l,h)}finally{u?o._isDefaultDatePartsForWeek=p:delete o._isDefaultDatePartsForWeek}}function x_(o){var l=o._defaultDatePartsNow;return l?(l.hasValue||(l.value=t.now(),l.hasValue=!0),l.value):t.now()}function w_(o,l,h){var u=h||o._isDefaultDatePartsForWeek,p=u?me(l):new Date(l);return u?[p.year(),p.month(),p.date()]:o._useUTC?[p.getUTCFullYear(),p.getUTCMonth(),p.getUTCDate()]:[p.getFullYear(),p.getMonth(),p.getDate()]}t._getDefaultDateParts=w_;function ma(o){var l,h,u=[],p,g,x,D,V;if(!o._d){for((o._a[xe]==null||o._a[et]==null||o._a[Ke]==null)&&(p=x_(o),g=Jd(o,p)),o._w&&o._a[Ke]==null&&o._a[et]==null&&C_(o,Jd(o,p,!0)),o._dayOfYear!=null&&(D=o._a[xe]!=null?o._a[xe]:g[xe],(o._dayOfYear>Vr(D)||o._dayOfYear===0)&&(y(o)._overflowDayOfYear=!0),h=ki(D,0,o._dayOfYear),o._a[et]=h.getUTCMonth(),o._a[Ke]=h.getUTCDate()),V=o._a[xe]==null||o._a[et]==null||o._a[Ke]==null,l=0;l<3&&o._a[l]==null;++l)o._a[l]=u[l]=g[l];for(;l<7;l++)o._a[l]=u[l]=o._a[l]==null?l===2?1:0:o._a[l];o._a[ke]===24&&o._a[at]===0&&o._a[Rt]===0&&o._a[Si]===0&&(o._nextDay=!0,o._a[ke]=0),o._d=(o._useUTC?ki:Wm).apply(null,u),x=o._useUTC?o._d.getUTCDay():o._d.getDay(),o._tzm!=null&&o._d.setUTCMinutes(o._d.getUTCMinutes()-o._tzm),o._nextDay&&(o._a[ke]=24),o._w&&typeof o._w.d<"u"&&!V&&o._w.d!==x&&(y(o).weekdayMismatch=!0)}}function C_(o,l){var h,u,p,g,x,D,V,W,De;h=o._w,h.GG!=null||h.W!=null||h.E!=null?(x=1,D=4,u=jr(h.GG,o._a[xe],Wd(l[xe],l[et],l[Ke],1,4).year),p=jr(h.W,1),g=jr(h.E,1),(g<1||g>7)&&(W=!0)):(x=o._locale._week.dow,D=o._locale._week.doy,De=Wd(l[xe],l[et],l[Ke],x,D),u=jr(h.gg,o._a[xe],De.year),p=jr(h.w,De.week),h.d!=null?(g=h.d,(g<0||g>6)&&(W=!0)):h.e!=null?(g=h.e+x,(h.e<0||h.e>6)&&(W=!0)):g=x),p<1||p>Nt(u,x,D)?y(o)._overflowWeeks=!0:W!=null?y(o)._overflowWeekday=!0:(V=jd(u,p,g,x,D),o._a[xe]=V.year,o._dayOfYear=V.dayOfYear)}t.ISO_8601=function(){},t.RFC_2822=function(){};function _a(o){if(o._f===t.ISO_8601){Zd(o);return}if(o._f===t.RFC_2822){Xd(o);return}o._a=[],y(o).empty=!0;var l=""+o._i,h,u,p,g,x,D=l.length,V=0,W,De;for(p=Od(o._f,o._locale).match(At)||[],De=p.length,h=0;h<De;h++)g=p[h],u=(l.match(Kp(g,o))||[])[0],u&&(x=l.substr(0,l.indexOf(u)),x.length>0&&y(o).unusedInput.push(x),l=l.slice(l.indexOf(u)+u.length),V+=u.length),Se[g]?(u?y(o).empty=!1:y(o).unusedTokens.push(g),Zp(g,u,o)):o._strict&&!u&&y(o).unusedTokens.push(g);y(o).charsLeftOver=D-V,l.length>0&&y(o).unusedInput.push(l),o._a[ke]<=12&&y(o).bigHour===!0&&o._a[ke]>0&&(y(o).bigHour=void 0),y(o).parsedDateParts=o._a.slice(0),y(o).meridiem=o._meridiem,o._a[ke]=S_(o._locale,o._a[ke],o._meridiem),W=y(o).era,W!==null&&(o._a[xe]=o._locale.erasConvertYear(W,o._a[xe])),ma(o),fa(o)}function S_(o,l,h){var u;return h==null?l:o.meridiemHour!=null?o.meridiemHour(l,h):(o.isPM!=null&&(u=o.isPM(h),u&&l<12&&(l+=12),!u&&l===12&&(l=0)),l)}function k_(o){var l,h,u,p,g,x,D=!1,V={},W=o._f.length;if(W===0){y(o).invalidFormat=!0,o._d=new Date(NaN);return}for(p=0;p<W;p++)g=0,x=!1,l=se({},o),o._useUTC!=null&&(l._useUTC=o._useUTC),l._defaultDatePartsNow=V,l._f=o._f[p],_a(l),N(l)&&(x=!0),g+=y(l).charsLeftOver,g+=y(l).unusedTokens.length*10,y(l).score=g,D?g<u&&(u=g,h=l):(u==null||g<u||x)&&(u=g,h=l,x&&(D=!0));_(o,h||l)}function E_(o){if(!o._d){var l=qe(o._i),h=l.day===void 0?l.date:l.day;o._a=m([l.year,l.month,h,l.hour,l.minute,l.second,l.millisecond],function(u){return u&&parseInt(u,10)}),ma(o)}}function T_(o){var l=new ye(fa(Qd(o)));return l._nextDay&&(l.add(1,"d"),l._nextDay=void 0),l}function Qd(o){var l=o._i,h=o._f;return o._locale=o._locale||$t(o._l),l===null||h===void 0&&l===""?$({nullInput:!0}):(typeof l=="string"&&(o._i=l=o._locale.preparse(l)),ee(l)?new ye(fa(l)):(f(l)?o._d=l:i(h)?k_(o):h?_a(o):O_(o),N(o)||(o._d=null),o))}function O_(o){var l=o._i;d(l)?o._d=new Date(t.now()):f(l)?o._d=new Date(l.valueOf()):typeof l=="string"?b_(o):i(l)?(o._a=m(l.slice(0),function(h){return parseInt(h,10)}),ma(o)):s(l)?E_(o):c(l)?o._d=new Date(l):t.createFromInputFallback(o)}function eh(o,l,h,u,p){var g={};return(l===!0||l===!1)&&(u=l,l=void 0),(h===!0||h===!1)&&(u=h,h=void 0),(s(o)&&a(o)||i(o)&&o.length===0)&&(o=void 0),g._isAMomentObject=!0,g._useUTC=g._isUTC=p,g._l=h,g._i=o,g._f=l,g._strict=u,T_(g)}function me(o,l,h,u){return eh(o,l,h,u,!1)}var D_=We("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var o=me.apply(null,arguments);return this.isValid()&&o.isValid()?o<this?this:o:$()}),M_=We("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var o=me.apply(null,arguments);return this.isValid()&&o.isValid()?o>this?this:o:$()});function th(o,l){var h,u;if(l.length===1&&i(l[0])&&(l=l[0]),!l.length)return me();for(u=0;u<l.length;++u)if(ee(l[u])){h=l[u];break}if(!h)return $();for(++u;u<l.length;++u)ee(l[u])&&(!l[u].isValid()||l[u][o](h))&&(h=l[u]);return h}function I_(){var o=[].slice.call(arguments,0);return th("isBefore",o)}function A_(){var o=[].slice.call(arguments,0);return th("isAfter",o)}var P_=function(){return Date.now?Date.now():+new Date},Hr=["year","quarter","month","week","day","hour","minute","second","millisecond"];function L_(o){var l,h=!1,u,p=Hr.length;for(l in o)if(n(o,l)&&!(we.call(Hr,l)!==-1&&(o[l]==null||!isNaN(o[l]))))return!1;for(u=0;u<p;++u)if(o[Hr[u]]){if(h)return!1;parseFloat(o[Hr[u]])!==H(o[Hr[u]])&&(h=!0)}return!0}function R_(){return this._isValid}function N_(){return mt(NaN)}function Zs(o){var l=qe(o),h=l.year||0,u=l.quarter||0,p=l.month||0,g=l.week||l.isoWeek||0,x=l.day||0,D=l.hour||0,V=l.minute||0,W=l.second||0,De=l.millisecond||0;this._isValid=L_(l),this._milliseconds=+De+W*1e3+V*6e4+D*1e3*60*60,this._days=+x+g*7,this._months=+p+u*3+h*12,this._data={},this._locale=$t(),this._bubble()}function Xs(o){return o instanceof Zs}function ga(o){return o<0?Math.round(-1*o)*-1:Math.round(o)}function $_(o,l,h){var u=Math.min(o.length,l.length),p=Math.abs(o.length-l.length),g=0,x;for(x=0;x<u;x++)H(o[x])!==H(l[x])&&g++;return g+p}function ih(o,l){R(o,0,0,function(){var h=this.utcOffset(),u="+";return h<0&&(h=-h,u="-"),u+_e(~~(h/60),2)+l+_e(~~h%60,2)})}ih("Z",":"),ih("ZZ",""),P("Z",js),P("ZZ",js),le(["Z","ZZ"],function(o,l,h){var u=va(js,o);h._useUTC=!0,h._tzm=u,u===null&&(y(h).invalidOffset=o)});var F_=/([\+\-]|\d\d)/gi;function va(o,l){var h=(l||"").match(o),u,p,g;return h===null||(u=h[h.length-1]||[],p=(u+"").match(F_)||["-",0,0],g=+(p[1]*60)+H(p[2]),H(p[2])>59||(p[0]==="+"?g>840:g>720))?null:g===0?0:p[0]==="+"?g:-g}function ya(o,l){var h,u;return l._isUTC?(h=l.clone(),u=(ee(o)||f(o)?o.valueOf():me(o).valueOf())-h.valueOf(),h._d.setTime(h._d.valueOf()+u),t.updateOffset(h,!1),h):me(o).local()}function ba(o){return-Math.round(o._d.getTimezoneOffset())}t.updateOffset=function(){};function B_(o,l,h){var u=this._offset||0,p;if(!this.isValid())return o!=null?this:NaN;if(o!=null){if(typeof o=="string"){if(o=va(js,o),o===null)return this}else Math.abs(o)<16&&!h&&(o=o*60);return!this._isUTC&&l&&(p=ba(this)),this._offset=o,this._isUTC=!0,p!=null&&this.add(p,"m"),u!==o&&(!l||this._changeInProgress?oh(this,mt(o-u,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,t.updateOffset(this,!0),this._changeInProgress=null)),this}else return this._isUTC?u:ba(this)}function V_(o,l){return o!=null?(typeof o!="string"&&(o=-o),this.utcOffset(o,l),this):-this.utcOffset()}function z_(o){return this.utcOffset(0,o)}function Y_(o){return this._isUTC&&(this.utcOffset(0,o),this._isUTC=!1,o&&this.subtract(ba(this),"m")),this}function U_(){if(this._tzm!=null)this.utcOffset(this._tzm,!1,!0);else if(typeof this._i=="string"){var o=va(Wp,this._i);o!=null?this.utcOffset(o):this.utcOffset(0,!0)}return this}function j_(o){return this.isValid()?(o=o?me(o).utcOffset():0,(this.utcOffset()-o)%60===0):!1}function H_(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function W_(){if(!d(this._isDSTShifted))return this._isDSTShifted;var o={},l;return se(o,this),o=Qd(o),o._a?(l=o._isUTC?v(o._a):me(o._a),this._isDSTShifted=this.isValid()&&$_(o._a,l.toArray())>0):this._isDSTShifted=!1,this._isDSTShifted}function q_(){return this.isValid()?!this._isUTC:!1}function K_(){return this.isValid()?this._isUTC:!1}function rh(){return this.isValid()?this._isUTC&&this._offset===0:!1}var G_=/^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,Z_=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function mt(o,l){var h=o,u=null,p,g,x;return Xs(o)?h={ms:o._milliseconds,d:o._days,M:o._months}:c(o)||!isNaN(+o)?(h={},l?h[l]=+o:h.milliseconds=+o):(u=G_.exec(o))?(p=u[1]==="-"?-1:1,h={y:0,d:H(u[Ke])*p,h:H(u[ke])*p,m:H(u[at])*p,s:H(u[Rt])*p,ms:H(ga(u[Si]*1e3))*p}):(u=Z_.exec(o))?(p=u[1]==="-"?-1:1,h={y:Ei(u[2],p),M:Ei(u[3],p),w:Ei(u[4],p),d:Ei(u[5],p),h:Ei(u[6],p),m:Ei(u[7],p),s:Ei(u[8],p)}):h==null?h={}:typeof h=="object"&&("from"in h||"to"in h)&&(x=X_(me(h.from),me(h.to)),h={},h.ms=x.milliseconds,h.M=x.months),g=new Zs(h),Xs(o)&&n(o,"_locale")&&(g._locale=o._locale),Xs(o)&&n(o,"_isValid")&&(g._isValid=o._isValid),g}mt.fn=Zs.prototype,mt.invalid=N_;function Ei(o,l){var h=o&&parseFloat(o.replace(",","."));return(isNaN(h)?0:h)*l}function sh(o,l){var h={};return h.months=l.month()-o.month()+(l.year()-o.year())*12,o.clone().add(h.months,"M").isAfter(l)&&--h.months,h.milliseconds=+l-+o.clone().add(h.months,"M"),h}function X_(o,l){var h;return o.isValid()&&l.isValid()?(l=ya(l,o),o.isBefore(l)?h=sh(o,l):(h=sh(l,o),h.milliseconds=-h.milliseconds,h.months=-h.months),h):{milliseconds:0,months:0}}function nh(o,l){return function(h,u){var p,g;return u!==null&&!isNaN(+u)&&(Je(l,"moment()."+l+"(period, number) is deprecated. Please use moment()."+l+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),g=h,h=u,u=g),p=mt(h,u),oh(this,p,o),this}}function oh(o,l,h,u){var p=l._milliseconds,g=ga(l._days),x=ga(l._months);o.isValid()&&(u=u??!0,x&&$d(o,zr(o,"Month")+x*h),g&&Pd(o,"Date",zr(o,"Date")+g*h),p&&o._d.setTime(o._d.valueOf()+p*h),u&&t.updateOffset(o,g||x))}var J_=nh(1,"add"),Q_=nh(-1,"subtract");function ah(o){return typeof o=="string"||o instanceof String}function eg(o){return ee(o)||f(o)||ah(o)||c(o)||ig(o)||tg(o)||o===null||o===void 0}function tg(o){var l=s(o)&&!a(o),h=!1,u=["years","year","y","months","month","M","days","day","d","dates","date","D","hours","hour","h","minutes","minute","m","seconds","second","s","milliseconds","millisecond","ms"],p,g,x=u.length;for(p=0;p<x;p+=1)g=u[p],h=h||n(o,g);return l&&h}function ig(o){var l=i(o),h=!1;return l&&(h=o.filter(function(u){return!c(u)&&ah(o)}).length===0),l&&h}function rg(o){var l=s(o)&&!a(o),h=!1,u=["sameDay","nextDay","lastDay","nextWeek","lastWeek","sameElse"],p,g;for(p=0;p<u.length;p+=1)g=u[p],h=h||n(o,g);return l&&h}function sg(o,l){var h=o.diff(l,"days",!0);return h<-6?"sameElse":h<-1?"lastWeek":h<0?"lastDay":h<1?"sameDay":h<2?"nextDay":h<7?"nextWeek":"sameElse"}function ng(o,l){arguments.length===1&&(arguments[0]?eg(arguments[0])?(o=arguments[0],l=void 0):rg(arguments[0])&&(l=arguments[0],o=void 0):(o=void 0,l=void 0));var h=o||me(),u=ya(h,this).startOf("day"),p=t.calendarFormat(this,u)||"sameElse",g=l&&(st(l[p])?l[p].call(this,h):l[p]);return this.format(g||this.localeData().calendar(p,this,me(h)))}function og(){return new ye(this)}function ag(o,l){var h=ee(o)?o:me(o);return this.isValid()&&h.isValid()?(l=he(l)||"millisecond",l==="millisecond"?this.valueOf()>h.valueOf():h.valueOf()<this.clone().startOf(l).valueOf()):!1}function lg(o,l){var h=ee(o)?o:me(o);return this.isValid()&&h.isValid()?(l=he(l)||"millisecond",l==="millisecond"?this.valueOf()<h.valueOf():this.clone().endOf(l).valueOf()<h.valueOf()):!1}function dg(o,l,h,u){var p=ee(o)?o:me(o),g=ee(l)?l:me(l);return this.isValid()&&p.isValid()&&g.isValid()?(u=u||"()",(u[0]==="("?this.isAfter(p,h):!this.isBefore(p,h))&&(u[1]===")"?this.isBefore(g,h):!this.isAfter(g,h))):!1}function hg(o,l){var h=ee(o)?o:me(o),u;return this.isValid()&&h.isValid()?(l=he(l)||"millisecond",l==="millisecond"?this.valueOf()===h.valueOf():(u=h.valueOf(),this.clone().startOf(l).valueOf()<=u&&u<=this.clone().endOf(l).valueOf())):!1}function ug(o,l){return this.isSame(o,l)||this.isAfter(o,l)}function cg(o,l){return this.isSame(o,l)||this.isBefore(o,l)}function fg(o,l,h){var u,p,g;if(!this.isValid())return NaN;if(u=ya(o,this),!u.isValid())return NaN;switch(p=(u.utcOffset()-this.utcOffset())*6e4,l=he(l),l){case"year":g=Js(this,u)/12;break;case"month":g=Js(this,u);break;case"quarter":g=Js(this,u)/3;break;case"second":g=(this-u)/1e3;break;case"minute":g=(this-u)/6e4;break;case"hour":g=(this-u)/36e5;break;case"day":g=(this-u-p)/864e5;break;case"week":g=(this-u-p)/6048e5;break;default:g=this-u}return h?g:ot(g)}function Js(o,l){if(o.date()<l.date())return-Js(l,o);var h=(l.year()-o.year())*12+(l.month()-o.month()),u=o.clone().add(h,"months"),p,g;return l-u<0?(p=o.clone().add(h-1,"months"),g=(l-u)/(u-p)):(p=o.clone().add(h+1,"months"),g=(l-u)/(p-u)),-(h+g)||0}t.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",t.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";function pg(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function mg(o){if(!this.isValid())return null;var l=o!==!0,h=l?this.clone().utc():this;return h.year()<0||h.year()>9999?Bs(h,l?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):st(Date.prototype.toISOString)?l?this.toDate().toISOString():new Date(this.valueOf()+this.utcOffset()*60*1e3).toISOString().replace("Z",Bs(h,"Z")):Bs(h,l?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")}function _g(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var o="moment",l="",h,u,p,g;return this.isLocal()||(o=this.utcOffset()===0?"moment.utc":"moment.parseZone",l="Z"),h="["+o+'("]',u=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",p="-MM-DD[T]HH:mm:ss.SSS",g=l+'[")]',this.format(h+u+p+g)}function gg(o){o||(o=this.isUtc()?t.defaultFormatUtc:t.defaultFormat);var l=Bs(this,o);return this.localeData().postformat(l)}function vg(o,l){return this.isValid()&&(ee(o)&&o.isValid()||me(o).isValid())?mt({to:this,from:o}).locale(this.locale()).humanize(!l):this.localeData().invalidDate()}function yg(o){return this.from(me(),o)}function bg(o,l){return this.isValid()&&(ee(o)&&o.isValid()||me(o).isValid())?mt({from:this,to:o}).locale(this.locale()).humanize(!l):this.localeData().invalidDate()}function xg(o){return this.to(me(),o)}function lh(o){var l;return o===void 0?this._locale._abbr:(l=$t(o),l!=null&&(this._locale=l),this)}var dh=We("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(o){return o===void 0?this.localeData():this.locale(o)});function hh(){return this._locale}var Qs=1e3,Qi=60*Qs,en=60*Qi,uh=(365*400+97)*24*en;function er(o,l){return(o%l+l)%l}function ch(o,l,h){return o<100&&o>=0?new Date(o+400,l,h)-uh:new Date(o,l,h).valueOf()}function fh(o,l,h){return o<100&&o>=0?Date.UTC(o+400,l,h)-uh:Date.UTC(o,l,h)}function wg(o){var l,h;if(o=he(o),o===void 0||o==="millisecond"||!this.isValid())return this;switch(h=this._isUTC?fh:ch,o){case"year":l=h(this.year(),0,1);break;case"quarter":l=h(this.year(),this.month()-this.month()%3,1);break;case"month":l=h(this.year(),this.month(),1);break;case"week":l=h(this.year(),this.month(),this.date()-this.weekday());break;case"isoWeek":l=h(this.year(),this.month(),this.date()-(this.isoWeekday()-1));break;case"day":case"date":l=h(this.year(),this.month(),this.date());break;case"hour":l=this._d.valueOf(),l-=er(l+(this._isUTC?0:this.utcOffset()*Qi),en);break;case"minute":l=this._d.valueOf(),l-=er(l,Qi);break;case"second":l=this._d.valueOf(),l-=er(l,Qs);break}return this._d.setTime(l),t.updateOffset(this,!0),this}function Cg(o){var l,h;if(o=he(o),o===void 0||o==="millisecond"||!this.isValid())return this;switch(h=this._isUTC?fh:ch,o){case"year":l=h(this.year()+1,0,1)-1;break;case"quarter":l=h(this.year(),this.month()-this.month()%3+3,1)-1;break;case"month":l=h(this.year(),this.month()+1,1)-1;break;case"week":l=h(this.year(),this.month(),this.date()-this.weekday()+7)-1;break;case"isoWeek":l=h(this.year(),this.month(),this.date()-(this.isoWeekday()-1)+7)-1;break;case"day":case"date":l=h(this.year(),this.month(),this.date()+1)-1;break;case"hour":l=this._d.valueOf(),l+=en-er(l+(this._isUTC?0:this.utcOffset()*Qi),en)-1;break;case"minute":l=this._d.valueOf(),l+=Qi-er(l,Qi)-1;break;case"second":l=this._d.valueOf(),l+=Qs-er(l,Qs)-1;break}return this._d.setTime(l),t.updateOffset(this,!0),this}function Sg(){return this._d.valueOf()-(this._offset||0)*6e4}function kg(){return Math.floor(this.valueOf()/1e3)}function Eg(){return new Date(this.valueOf())}function Tg(){var o=this;return[o.year(),o.month(),o.date(),o.hour(),o.minute(),o.second(),o.millisecond()]}function Og(){var o=this;return{years:o.year(),months:o.month(),date:o.date(),hours:o.hours(),minutes:o.minutes(),seconds:o.seconds(),milliseconds:o.milliseconds()}}function Dg(){return this.isValid()?this.toISOString():null}function Mg(){return N(this)}function Ig(){return _({},y(this))}function Ag(){return y(this).overflow}function Pg(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}R("N",0,0,"eraAbbr"),R("NN",0,0,"eraAbbr"),R("NNN",0,0,"eraAbbr"),R("NNNN",0,0,"eraName"),R("NNNNN",0,0,"eraNarrow"),R("y",["y",1],"yo","eraYear"),R("y",["yy",2],0,"eraYear"),R("y",["yyy",3],0,"eraYear"),R("y",["yyyy",4],0,"eraYear"),P("N",xa),P("NN",xa),P("NNN",xa),P("NNNN",jg),P("NNNNN",Hg),le(["N","NN","NNN","NNNN","NNNNN"],function(o,l,h,u){var p=h._locale.erasParse(o,u,h._strict);p?y(h).era=p:y(h).invalidEra=o}),P("y",Gi),P("yy",Gi),P("yyy",Gi),P("yyyy",Gi),P("yo",Wg),le(["y","yy","yyy","yyyy"],xe),le(["yo"],function(o,l,h,u){var p;h._locale._eraYearOrdinalRegex&&(p=o.match(h._locale._eraYearOrdinalRegex)),h._locale.eraYearOrdinalParse?l[xe]=h._locale.eraYearOrdinalParse(o,p):l[xe]=parseInt(o,10)});function Lg(o,l){var h,u,p,g=this._eras||$t("en")._eras;for(h=0,u=g.length;h<u;++h)switch(typeof g[h].since==="string"&&(p=t(g[h].since).startOf("day"),g[h].since=p.valueOf()),typeof g[h].until){case"undefined":g[h].until=1/0;break;case"string":p=t(g[h].until).startOf("day").valueOf(),g[h].until=p.valueOf();break}return g}function Rg(o,l,h){var u,p,g=this.eras(),x,D,V;for(o=o.toUpperCase(),u=0,p=g.length;u<p;++u)if(x=g[u].name.toUpperCase(),D=g[u].abbr.toUpperCase(),V=g[u].narrow.toUpperCase(),h)switch(l){case"N":case"NN":case"NNN":if(D===o)return g[u];break;case"NNNN":if(x===o)return g[u];break;case"NNNNN":if(V===o)return g[u];break}else if([x,D,V].indexOf(o)>=0)return g[u]}function Ng(o,l){var h=o.since<=o.until?1:-1;return l===void 0?t(o.since).year():t(o.since).year()+(l-o.offset)*h}function $g(){var o,l,h,u=this.localeData().eras();for(o=0,l=u.length;o<l;++o)if(h=this.clone().startOf("day").valueOf(),u[o].since<=h&&h<=u[o].until||u[o].until<=h&&h<=u[o].since)return u[o].name;return""}function Fg(){var o,l,h,u=this.localeData().eras();for(o=0,l=u.length;o<l;++o)if(h=this.clone().startOf("day").valueOf(),u[o].since<=h&&h<=u[o].until||u[o].until<=h&&h<=u[o].since)return u[o].narrow;return""}function Bg(){var o,l,h,u=this.localeData().eras();for(o=0,l=u.length;o<l;++o)if(h=this.clone().startOf("day").valueOf(),u[o].since<=h&&h<=u[o].until||u[o].until<=h&&h<=u[o].since)return u[o].abbr;return""}function Vg(){var o,l,h,u,p=this.localeData().eras();for(o=0,l=p.length;o<l;++o)if(h=p[o].since<=p[o].until?1:-1,u=this.clone().startOf("day").valueOf(),p[o].since<=u&&u<=p[o].until||p[o].until<=u&&u<=p[o].since)return(this.year()-t(p[o].since).year())*h+p[o].offset;return this.year()}function zg(o){return n(this,"_erasNameRegex")||wa.call(this),o?this._erasNameRegex:this._erasRegex}function Yg(o){return n(this,"_erasAbbrRegex")||wa.call(this),o?this._erasAbbrRegex:this._erasRegex}function Ug(o){return n(this,"_erasNarrowRegex")||wa.call(this),o?this._erasNarrowRegex:this._erasRegex}function xa(o,l){return l.erasAbbrRegex(o)}function jg(o,l){return l.erasNameRegex(o)}function Hg(o,l){return l.erasNarrowRegex(o)}function Wg(o,l){return l._eraYearOrdinalRegex||Gi}function wa(){var o=[],l=[],h=[],u=[],p,g,x,D,V,W=this.eras();for(p=0,g=W.length;p<g;++p)x=Lt(W[p].name),D=Lt(W[p].abbr),V=Lt(W[p].narrow),l.push(x),o.push(D),h.push(V),u.push(x),u.push(D),u.push(V);this._erasRegex=new RegExp("^("+u.join("|")+")","i"),this._erasNameRegex=new RegExp("^("+l.join("|")+")","i"),this._erasAbbrRegex=new RegExp("^("+o.join("|")+")","i"),this._erasNarrowRegex=new RegExp("^("+h.join("|")+")","i")}R(0,["gg",2],0,function(){return this.weekYear()%100}),R(0,["GG",2],0,function(){return this.isoWeekYear()%100});function tn(o,l){R(0,[o,o.length],0,l)}tn("gggg","weekYear"),tn("ggggg","weekYear"),tn("GGGG","isoWeekYear"),tn("GGGGG","isoWeekYear"),P("G",Us),P("g",Us),P("GG",pe,Qe),P("gg",pe,Qe),P("GGGG",ea,Jo),P("gggg",ea,Jo),P("GGGGG",Ys,Vs),P("ggggg",Ys,Vs),Xi(["gggg","ggggg","GGGG","GGGGG"],function(o,l,h,u){l[u.substr(0,2)]=H(o)}),Xi(["gg","GG"],function(o,l,h,u){l[u]=t.parseTwoDigitYear(o)});function qg(o){return ph.call(this,o,this.week(),this.weekday()+this.localeData()._week.dow,this.localeData()._week.dow,this.localeData()._week.doy)}function Kg(o){return ph.call(this,o,this.isoWeek(),this.isoWeekday(),1,4)}function Gg(){return Nt(this.year(),1,4)}function Zg(){return Nt(this.isoWeekYear(),1,4)}function Xg(){var o=this.localeData()._week;return Nt(this.year(),o.dow,o.doy)}function Jg(){var o=this.localeData()._week;return Nt(this.weekYear(),o.dow,o.doy)}function ph(o,l,h,u,p){var g;return o==null?da(this,u,p).year:(g=Nt(o,u,p),l>g&&(l=g),Qg.call(this,o,l,h,u,p))}function Qg(o,l,h,u,p){var g=jd(o,l,h,u,p),x=ki(g.year,0,g.dayOfYear);return this.year(x.getUTCFullYear()),this.month(x.getUTCMonth()),this.date(x.getUTCDate()),this}R("Q",0,"Qo","quarter"),P("Q",Dd),le("Q",function(o,l){l[et]=(H(o)-1)*3});function ev(o){return o==null?Math.ceil((this.month()+1)/3):this.month((o-1)*3+this.month()%3)}R("D",["DD",2],"Do","date"),P("D",pe,Zi),P("DD",pe,Qe),P("Do",function(o,l){return o?l._dayOfMonthOrdinalParse||l._ordinalParse:l._dayOfMonthOrdinalParseLenient}),le(["D","DD"],Ke),le("Do",function(o,l){l[Ke]=H(o.match(pe)[0])});var mh=Ji("Date",!0);R("DDD",["DDDD",3],"DDDo","dayOfYear"),P("DDD",zs),P("DDDD",Md),le(["DDD","DDDD"],function(o,l,h){h._dayOfYear=H(o)});function tv(o){var l=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return o==null?l:this.add(o-l,"d")}R("m",["mm",2],0,"minute"),P("m",pe,ta),P("mm",pe,Qe),le(["m","mm"],at);var iv=Ji("Minutes",!1);R("s",["ss",2],0,"second"),P("s",pe,ta),P("ss",pe,Qe),le(["s","ss"],Rt);var rv=Ji("Seconds",!1);R("S",0,0,function(){return~~(this.millisecond()/100)}),R(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),R(0,["SSS",3],0,"millisecond"),R(0,["SSSS",4],0,function(){return this.millisecond()*10}),R(0,["SSSSS",5],0,function(){return this.millisecond()*100}),R(0,["SSSSSS",6],0,function(){return this.millisecond()*1e3}),R(0,["SSSSSSS",7],0,function(){return this.millisecond()*1e4}),R(0,["SSSSSSSS",8],0,function(){return this.millisecond()*1e5}),R(0,["SSSSSSSSS",9],0,function(){return this.millisecond()*1e6}),P("S",zs,Dd),P("SS",zs,Qe),P("SSS",zs,Md);var si,_h;for(si="SSSS";si.length<=9;si+="S")P(si,Gi);function sv(o,l){l[Si]=H(("0."+o)*1e3)}for(si="S";si.length<=9;si+="S")le(si,sv);_h=Ji("Milliseconds",!1),R("z",0,0,"zoneAbbr"),R("zz",0,0,"zoneName");function nv(){return this._isUTC?"UTC":""}function ov(){return this._isUTC?"Coordinated Universal Time":""}var k=ye.prototype;k.add=J_,k.calendar=ng,k.clone=og,k.diff=fg,k.endOf=Cg,k.format=gg,k.from=vg,k.fromNow=yg,k.to=bg,k.toNow=xg,k.get=em,k.invalidAt=Ag,k.isAfter=ag,k.isBefore=lg,k.isBetween=dg,k.isSame=hg,k.isSameOrAfter=ug,k.isSameOrBefore=cg,k.isValid=Mg,k.lang=dh,k.locale=lh,k.localeData=hh,k.max=M_,k.min=D_,k.parsingFlags=Ig,k.set=tm,k.startOf=wg,k.subtract=Q_,k.toArray=Tg,k.toObject=Og,k.toDate=Eg,k.toISOString=mg,k.inspect=_g,typeof Symbol<"u"&&Symbol.for!=null&&(k[Symbol.for("nodejs.util.inspect.custom")]=function(){return"Moment<"+this.format()+">"}),k.toJSON=Dg,k.toString=pg,k.unix=kg,k.valueOf=Sg,k.creationData=Pg,k.eraName=$g,k.eraNarrow=Fg,k.eraAbbr=Bg,k.eraYear=Vg,k.year=Ad,k.isLeapYear=Qp,k.weekYear=qg,k.isoWeekYear=Kg,k.quarter=k.quarters=ev,k.month=Fd,k.daysInMonth=um,k.week=k.weeks=Xm,k.isoWeek=k.isoWeeks=Jm,k.weeksInYear=Xg,k.weeksInWeekYear=Jg,k.isoWeeksInYear=Gg,k.isoWeeksInISOWeekYear=Zg,k.date=mh,k.day=k.days=Tm,k.weekday=Om,k.isoWeekday=Dm,k.dayOfYear=tv,k.hour=k.hours=i_,k.minute=k.minutes=iv,k.second=k.seconds=rv,k.millisecond=k.milliseconds=_h,k.utcOffset=B_,k.utc=z_,k.local=Y_,k.parseZone=U_,k.hasAlignedHourOffset=j_,k.isDST=H_,k.isLocal=q_,k.isUtcOffset=K_,k.isUtc=rh,k.isUTC=rh,k.zoneAbbr=nv,k.zoneName=ov,k.dates=We("dates accessor is deprecated. Use date instead.",mh),k.months=We("months accessor is deprecated. Use month instead",Fd),k.years=We("years accessor is deprecated. Use year instead",Ad),k.zone=We("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",V_),k.isDSTShifted=We("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",W_);function av(o){return me(o*1e3)}function lv(){return me.apply(null,arguments).parseZone()}function gh(o){return o}var te=aa.prototype;te.calendar=Rm,te.longDateFormat=$m,te.invalidDate=Bm,te.ordinal=Ym,te.preparse=gh,te.postformat=gh,te.relativeTime=jm,te.pastFuture=Hm,te.set=Pm,te.eras=Lg,te.erasParse=Rg,te.erasConvertYear=Ng,te.erasAbbrRegex=Yg,te.erasNameRegex=zg,te.erasNarrowRegex=Ug,te.months=am,te.monthsShort=lm,te.monthsParse=hm,te.monthsRegex=fm,te.monthsShortRegex=cm,te.week=qm,te.firstDayOfYear=Zm,te.firstDayOfWeek=Gm,te.weekdays=wm,te.weekdaysMin=Sm,te.weekdaysShort=Cm,te.weekdaysParse=Em,te.weekdaysRegex=Mm,te.weekdaysShortRegex=Im,te.weekdaysMinRegex=Am,te.isPM=e_,te.meridiem=r_;function rn(o,l,h,u){var p=$t(),g=v().set(u,l);return p[h](g,o)}function vh(o,l,h){if(c(o)&&(l=o,o=void 0),o=o||"",l!=null)return rn(o,l,h,"month");var u,p=[];for(u=0;u<12;u++)p[u]=rn(o,u,h,"month");return p}function Ca(o,l,h,u){typeof o=="boolean"?(c(l)&&(h=l,l=void 0),l=l||""):(l=o,h=l,o=!1,c(l)&&(h=l,l=void 0),l=l||"");var p=$t(),g=o?p._week.dow:0,x,D=[];if(h!=null)return rn(l,(h+g)%7,u,"day");for(x=0;x<7;x++)D[x]=rn(l,(x+g)%7,u,"day");return D}function dv(o,l){return vh(o,l,"months")}function hv(o,l){return vh(o,l,"monthsShort")}function uv(o,l,h){return Ca(o,l,h,"weekdays")}function cv(o,l,h){return Ca(o,l,h,"weekdaysShort")}function fv(o,l,h){return Ca(o,l,h,"weekdaysMin")}ri("en",{eras:[{since:"0001-01-01",until:1/0,offset:1,name:"Anno Domini",narrow:"AD",abbr:"AD"},{since:"0000-12-31",until:-1/0,offset:1,name:"Before Christ",narrow:"BC",abbr:"BC"}],dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(o){var l=o%10,h=H(o%100/10)===1?"th":l===1?"st":l===2?"nd":l===3?"rd":"th";return o+h}}),t.lang=We("moment.lang is deprecated. Use moment.locale instead.",ri),t.langData=We("moment.langData is deprecated. Use moment.localeData instead.",$t);var Ft=Math.abs;function pv(){var o=this._data;return this._milliseconds=Ft(this._milliseconds),this._days=Ft(this._days),this._months=Ft(this._months),o.milliseconds=Ft(o.milliseconds),o.seconds=Ft(o.seconds),o.minutes=Ft(o.minutes),o.hours=Ft(o.hours),o.months=Ft(o.months),o.years=Ft(o.years),this}function yh(o,l,h,u){var p=mt(l,h);return o._milliseconds+=u*p._milliseconds,o._days+=u*p._days,o._months+=u*p._months,o._bubble()}function mv(o,l){return yh(this,o,l,1)}function _v(o,l){return yh(this,o,l,-1)}function bh(o){return o<0?Math.floor(o):Math.ceil(o)}function gv(){var o=this._milliseconds,l=this._days,h=this._months,u=this._data,p,g,x,D,V;return o>=0&&l>=0&&h>=0||o<=0&&l<=0&&h<=0||(o+=bh(Sa(h)+l)*864e5,l=0,h=0),u.milliseconds=o%1e3,p=ot(o/1e3),u.seconds=p%60,g=ot(p/60),u.minutes=g%60,x=ot(g/60),u.hours=x%24,l+=ot(x/24),V=ot(xh(l)),h+=V,l-=bh(Sa(V)),D=ot(h/12),h%=12,u.days=l,u.months=h,u.years=D,this}function xh(o){return o*4800/146097}function Sa(o){return o*146097/4800}function vv(o){if(!this.isValid())return NaN;var l,h,u=this._milliseconds;if(o=he(o),o==="month"||o==="quarter"||o==="year")switch(l=this._days+u/864e5,h=this._months+xh(l),o){case"month":return h;case"quarter":return h/3;case"year":return h/12}else switch(l=this._days+Math.round(Sa(this._months)),o){case"week":return l/7+u/6048e5;case"day":return l+u/864e5;case"hour":return l*24+u/36e5;case"minute":return l*1440+u/6e4;case"second":return l*86400+u/1e3;case"millisecond":return Math.floor(l*864e5)+u;default:throw new Error("Unknown unit "+o)}}function Bt(o){return function(){return this.as(o)}}var wh=Bt("ms"),yv=Bt("s"),bv=Bt("m"),xv=Bt("h"),wv=Bt("d"),Cv=Bt("w"),Sv=Bt("M"),kv=Bt("Q"),Ev=Bt("y"),Tv=wh;function Ov(){return mt(this)}function Dv(o){return o=he(o),this.isValid()?this[o+"s"]():NaN}function Ti(o){return function(){return this.isValid()?this._data[o]:NaN}}var Mv=Ti("milliseconds"),Iv=Ti("seconds"),Av=Ti("minutes"),Pv=Ti("hours"),Lv=Ti("days"),Rv=Ti("months"),Nv=Ti("years");function $v(){return ot(this.days()/7)}var Vt=Math.round,tr={ss:44,s:45,m:45,h:22,d:26,w:null,M:11};function Fv(o,l,h,u,p){return Yd.call(p,l||1,!!h,o,u)}function Bv(o,l,h,u){var p=mt(o).abs(),g=Vt(p.as("s")),x=Vt(p.as("m")),D=Vt(p.as("h")),V=Vt(p.as("d")),W=Vt(p.as("M")),De=Vt(p.as("w")),zt=Vt(p.as("y")),ni=g<=h.ss&&["s",g]||g<h.s&&["ss",g]||x<=1&&["m"]||x<h.m&&["mm",x]||D<=1&&["h"]||D<h.h&&["hh",D]||V<=1&&["d"]||V<h.d&&["dd",V];return h.w!=null&&(ni=ni||De<=1&&["w"]||De<h.w&&["ww",De]),ni=ni||W<=1&&["M"]||W<h.M&&["MM",W]||zt<=1&&["y"]||["yy",zt],ni[2]=l,ni[3]=+o>0,ni[4]=u,Fv.apply(null,ni)}function Vv(o){return o===void 0?Vt:typeof o=="function"?(Vt=o,!0):!1}function zv(o,l){return tr[o]===void 0?!1:l===void 0?tr[o]:(tr[o]=l,o==="s"&&(tr.ss=l-1),!0)}function Yv(o,l){if(!this.isValid())return this.localeData().invalidDate();var h=!1,u=tr,p,g;return typeof o=="object"&&(l=o,o=!1),typeof o=="boolean"&&(h=o),typeof l=="object"&&(u=_(_({},tr),l||{}),l.s!=null&&l.ss==null&&(u.ss=l.s-1)),p=this.localeData(),g=Bv(this,!h,u,p),h&&(g=Ud.call(p,+this,g)),p.postformat(g)}var ka=Math.abs;function ir(o){return(o>0)-(o<0)||+o}function sn(){if(!this.isValid())return this.localeData().invalidDate();var o=ka(this._milliseconds)/1e3,l=ka(this._days),h=ka(this._months),u,p,g,x,D=this.asSeconds(),V,W,De,zt;return D?(u=ot(o/60),p=ot(u/60),o%=60,u%=60,g=ot(h/12),h%=12,x=o?o.toFixed(3).replace(/\.?0+$/,""):"",V=D<0?"-":"",W=ir(this._months)!==ir(D)?"-":"",De=ir(this._days)!==ir(D)?"-":"",zt=ir(this._milliseconds)!==ir(D)?"-":"",V+"P"+(g?W+g+"Y":"")+(h?W+h+"M":"")+(l?De+l+"D":"")+(p||u||o?"T":"")+(p?zt+p+"H":"")+(u?zt+u+"M":"")+(o?zt+x+"S":"")):"P0D"}var X=Zs.prototype;X.isValid=R_,X.abs=pv,X.add=mv,X.subtract=_v,X.as=vv,X.asMilliseconds=wh,X.asSeconds=yv,X.asMinutes=bv,X.asHours=xv,X.asDays=wv,X.asWeeks=Cv,X.asMonths=Sv,X.asQuarters=kv,X.asYears=Ev,X.valueOf=Tv,X._bubble=gv,X.clone=Ov,X.get=Dv,X.milliseconds=Mv,X.seconds=Iv,X.minutes=Av,X.hours=Pv,X.days=Lv,X.weeks=$v,X.months=Rv,X.years=Nv,X.humanize=Yv,X.toISOString=sn,X.toString=sn,X.toJSON=sn,X.locale=lh,X.localeData=hh,X.toIsoString=We("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",sn),X.lang=dh,R("X",0,0,"unix"),R("x",0,0,"valueOf"),P("x",Us),P("X",qp),le("X",function(o,l,h){h._d=new Date(parseFloat(o)*1e3)}),le("x",function(o,l,h){h._d=new Date(H(o))});return t.version="2.31.0",e(me),t.fn=k,t.min=I_,t.max=A_,t.now=P_,t.utc=v,t.unix=av,t.months=dv,t.isDate=f,t.locale=ri,t.invalid=$,t.duration=mt,t.isMoment=ee,t.weekdays=uv,t.parseZone=lv,t.localeData=$t,t.isDuration=Xs,t.monthsShort=hv,t.weekdaysMin=fv,t.defineLocale=ca,t.updateLocale=a_,t.locales=l_,t.weekdaysShort=cv,t.normalizeUnits=he,t.relativeTimeRounding=Vv,t.relativeTimeThreshold=zv,t.calendarFormat=sg,t.prototype=k,t.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"GGGG-[W]WW",MONTH:"YYYY-MM"},t}))});var q=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var nn=globalThis,on=nn.ShadowRoot&&(nn.ShadyCSS===void 0||nn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ea=Symbol(),kh=new WeakMap,Oi=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Ea)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(on&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=kh.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&kh.set(e,t))}return t}toString(){return this.cssText}},z=r=>new Oi(typeof r=="string"?r:r+"",void 0,Ea),C=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((i,s,n)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new Oi(e,r,Ea)},an=(r,t)=>{if(on)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=nn.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},Ta=on?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return z(e)})(r):r;var{is:Xv,defineProperty:Jv,getOwnPropertyDescriptor:Qv,getOwnPropertyNames:ey,getOwnPropertySymbols:ty,getPrototypeOf:iy}=Object,ln=globalThis,Eh=ln.trustedTypes,ry=Eh?Eh.emptyScript:"",sy=ln.reactiveElementPolyfillSupport,Wr=(r,t)=>r,qr={toAttribute(r,t){switch(t){case Boolean:r=r?ry:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},rr=(r,t)=>!Xv(r,t),Th={attribute:!0,type:String,converter:qr,reflect:!1,useDefault:!1,hasChanged:rr};Symbol.metadata??=Symbol("metadata"),ln.litPropertyMetadata??=new WeakMap;var Yt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Th){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Jv(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=Qv(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let d=s?.call(this);n?.call(this,a),this.requestUpdate(t,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Th}static _$Ei(){if(this.hasOwnProperty(Wr("elementProperties")))return;let t=iy(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Wr("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Wr("properties"))){let e=this.properties,i=[...ey(e),...ty(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(Ta(s))}else t!==void 0&&e.push(Ta(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return an(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:qr).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:qr;this._$Em=s;let d=a.fromAttribute(e,n.type);this[s]=d??this._$Ej?.get(s)??d,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let a=this.constructor;if(s===!1&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??rr)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),n!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:a}=n,d=this[s];a!==!0||this._$AL.has(s)||d===void 0||this.C(s,void 0,n,d)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};Yt.elementStyles=[],Yt.shadowRootOptions={mode:"open"},Yt[Wr("elementProperties")]=new Map,Yt[Wr("finalized")]=new Map,sy?.({ReactiveElement:Yt}),(ln.reactiveElementVersions??=[]).push("2.1.2");var ny={attribute:!0,type:String,converter:qr,reflect:!1,hasChanged:rr},oy=(r=ny,t,e)=>{let{kind:i,metadata:s}=e,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),i==="accessor"){let{name:a}=e;return{set(d){let c=t.get.call(this);t.set.call(this,d),this.requestUpdate(a,c,r,!0,d)},init(d){return d!==void 0&&this.C(a,void 0,r,d),d}}}if(i==="setter"){let{name:a}=e;return function(d){let c=this[a];t.call(this,d),this.requestUpdate(a,c,r,!0,d)}}throw Error("Unsupported decorator location: "+i)};function be(r){return(t,e)=>typeof e=="object"?oy(r,t,e):((i,s,n)=>{let a=s.hasOwnProperty(n);return s.constructor.createProperty(n,i),a?Object.getOwnPropertyDescriptor(s,n):void 0})(r,t,e)}function Kr(r){return be({...r,state:!0,attribute:!1})}var Di=(r,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(r,t,e),e);function Oh(r,t){return(e,i,s)=>{let n=a=>a.renderRoot?.querySelector(r)??null;if(t){let{get:a,set:d}=typeof i=="object"?e:s??(()=>{let c=Symbol();return{get(){return this[c]},set(f){this[c]=f}}})();return Di(e,i,{get(){let c=a.call(this);return c===void 0&&(c=n(this),(c!==null||this.hasUpdated)&&d.call(this,c)),c}})}return Di(e,i,{get(){return n(this)}})}}var Da=globalThis,Dh=r=>r,dn=Da.trustedTypes,Mh=dn?dn.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ma="$lit$",Ut=`lit$${Math.random().toFixed(9).slice(2)}$`,Ia="?"+Ut,ay=`<${Ia}>`,Ai=document,Zr=()=>Ai.createComment(""),Xr=r=>r===null||typeof r!="object"&&typeof r!="function",Aa=Array.isArray,Nh=r=>Aa(r)||typeof r?.[Symbol.iterator]=="function",Oa=`[ 	
\f\r]`,Gr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ih=/-->/g,Ah=/>/g,Mi=RegExp(`>|${Oa}(?:([^\\s"'>=/]+)(${Oa}*=${Oa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ph=/'/g,Lh=/"/g,$h=/^(?:script|style|textarea|title)$/i,Pa=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),w=Pa(1),Xw=Pa(2),Jw=Pa(3),lt=Symbol.for("lit-noChange"),oe=Symbol.for("lit-nothing"),Rh=new WeakMap,Ii=Ai.createTreeWalker(Ai,129);function Fh(r,t){if(!Aa(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mh!==void 0?Mh.createHTML(t):t}var Bh=(r,t)=>{let e=r.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",a=Gr;for(let d=0;d<e;d++){let c=r[d],f,m,_=-1,v=0;for(;v<c.length&&(a.lastIndex=v,m=a.exec(c),m!==null);)v=a.lastIndex,a===Gr?m[1]==="!--"?a=Ih:m[1]!==void 0?a=Ah:m[2]!==void 0?($h.test(m[2])&&(s=RegExp("</"+m[2],"g")),a=Mi):m[3]!==void 0&&(a=Mi):a===Mi?m[0]===">"?(a=s??Gr,_=-1):m[1]===void 0?_=-2:(_=a.lastIndex-m[2].length,f=m[1],a=m[3]===void 0?Mi:m[3]==='"'?Lh:Ph):a===Lh||a===Ph?a=Mi:a===Ih||a===Ah?a=Gr:(a=Mi,s=void 0);let b=a===Mi&&r[d+1].startsWith("/>")?" ":"";n+=a===Gr?c+ay:_>=0?(i.push(f),c.slice(0,_)+Ma+c.slice(_)+Ut+b):c+Ut+(_===-2?d:b)}return[Fh(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},Jr=class r{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0,d=t.length-1,c=this.parts,[f,m]=Bh(t,e);if(this.el=r.createElement(f,i),Ii.currentNode=this.el.content,e===2||e===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Ii.nextNode())!==null&&c.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Ma)){let v=m[a++],b=s.getAttribute(_).split(Ut),y=/([.?@])?(.*)/.exec(v);c.push({type:1,index:n,name:y[2],strings:b,ctor:y[1]==="."?un:y[1]==="?"?cn:y[1]==="@"?fn:Li}),s.removeAttribute(_)}else _.startsWith(Ut)&&(c.push({type:6,index:n}),s.removeAttribute(_));if($h.test(s.tagName)){let _=s.textContent.split(Ut),v=_.length-1;if(v>0){s.textContent=dn?dn.emptyScript:"";for(let b=0;b<v;b++)s.append(_[b],Zr()),Ii.nextNode(),c.push({type:2,index:++n});s.append(_[v],Zr())}}}else if(s.nodeType===8)if(s.data===Ia)c.push({type:2,index:n});else{let _=-1;for(;(_=s.data.indexOf(Ut,_+1))!==-1;)c.push({type:7,index:n}),_+=Ut.length-1}n++}}static createElement(t,e){let i=Ai.createElement("template");return i.innerHTML=t,i}};function Pi(r,t,e=r,i){if(t===lt)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=Xr(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=Pi(r,s._$AS(r,t.values),s,i)),t}var hn=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??Ai).importNode(e,!0);Ii.currentNode=s;let n=Ii.nextNode(),a=0,d=0,c=i[0];for(;c!==void 0;){if(a===c.index){let f;c.type===2?f=new sr(n,n.nextSibling,this,t):c.type===1?f=new c.ctor(n,c.name,c.strings,this,t):c.type===6&&(f=new pn(n,this,t)),this._$AV.push(f),c=i[++d]}a!==c?.index&&(n=Ii.nextNode(),a++)}return Ii.currentNode=Ai,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},sr=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=oe,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Pi(this,t,e),Xr(t)?t===oe||t==null||t===""?(this._$AH!==oe&&this._$AR(),this._$AH=oe):t!==this._$AH&&t!==lt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Nh(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==oe&&Xr(this._$AH)?this._$AA.nextSibling.data=t:this.T(Ai.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Jr.createElement(Fh(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new hn(s,this),a=n.u(this.options);n.p(e),this.T(a),this._$AH=n}}_$AC(t){let e=Rh.get(t.strings);return e===void 0&&Rh.set(t.strings,e=new Jr(t)),e}k(t){Aa(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new r(this.O(Zr()),this.O(Zr()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Dh(t).nextSibling;Dh(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Li=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=oe,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=oe}_$AI(t,e=this,i,s){let n=this.strings,a=!1;if(n===void 0)t=Pi(this,t,e,0),a=!Xr(t)||t!==this._$AH&&t!==lt,a&&(this._$AH=t);else{let d=t,c,f;for(t=n[0],c=0;c<n.length-1;c++)f=Pi(this,d[i+c],e,c),f===lt&&(f=this._$AH[c]),a||=!Xr(f)||f!==this._$AH[c],f===oe?t=oe:t!==oe&&(t+=(f??"")+n[c+1]),this._$AH[c]=f}a&&!s&&this.j(t)}j(t){t===oe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},un=class extends Li{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===oe?void 0:t}},cn=class extends Li{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==oe)}},fn=class extends Li{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Pi(this,t,e,0)??oe)===lt)return;let i=this._$AH,s=t===oe&&i!==oe||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==oe&&(i===oe||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},pn=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Pi(this,t)}},Vh={M:Ma,P:Ut,A:Ia,C:1,L:Bh,R:hn,D:Nh,V:Pi,I:sr,H:Li,N:cn,U:fn,B:un,F:pn},ly=Da.litHtmlPolyfillSupport;ly?.(Jr,sr),(Da.litHtmlVersions??=[]).push("3.3.3");var _t=(r,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new sr(t.insertBefore(Zr(),n),n,void 0,e??{})}return s._$AI(r),s};var La=globalThis,S=class extends Yt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=_t(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return lt}};S._$litElement$=!0,S.finalized=!0,La.litElementHydrateSupport?.({LitElement:S});var dy=La.litElementPolyfillSupport;dy?.({LitElement:S});(La.litElementVersions??=[]).push("4.2.2");var nr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},gt=r=>(...t)=>({_$litDirective$:r,values:t}),oi=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var mn=gt(class extends oi{constructor(r){if(super(r),r.type!==nr.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter(t=>r[t]).join(" ")+" "}update(r,[t]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let e=r.element.classList;for(let i of this.st)i in t||(e.remove(i),this.st.delete(i));for(let i in t){let s=!!t[i];s===this.st.has(i)||this.nt?.has(i)||(s?(e.add(i),this.st.add(i)):(e.remove(i),this.st.delete(i)))}return lt}});var _n=C`
  .sr-only {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    clip-path: inset(50%) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;
  }
`;window.Vaadin||={};window.Vaadin.featureFlags||={};function hy(r){return r.replace(/-[a-z]/gu,t=>t[1].toUpperCase())}var jt={};function E(r,t="25.3.4"){if(Object.defineProperty(r,"version",{get(){return t}}),r.experimental){let i=typeof r.experimental=="string"?r.experimental:`${hy(r.is.split("-").slice(1).join("-"))}Component`;if(!window.Vaadin.featureFlags[i]&&!jt[i]){jt[i]=new Set,jt[i].add(r),Object.defineProperty(window.Vaadin.featureFlags,i,{get(){return jt[i].size===0},set(s){s&&jt[i].size>0&&(jt[i].forEach(n=>{customElements.define(n.is,n)}),jt[i].clear())}});return}else if(jt[i]){jt[i].add(r);return}}let e=customElements.get(r.is);if(!e)customElements.define(r.is,r);else{let i=e.version;i&&r.version&&i===r.version?console.warn(`The component ${r.is} has been loaded twice`):console.error(`Tried to define ${r.is} version ${r.version} when version ${e.version} is already in use. Something will probably break.`)}}function zh(r){let t=[];for(;r;){if(r.nodeType===Node.DOCUMENT_NODE){t.push(r);break}if(r.nodeType===Node.DOCUMENT_FRAGMENT_NODE){t.push(r),r=r.host;continue}if(r.assignedSlot){r=r.assignedSlot;continue}r=r.parentNode}return t}function Ra(r){return new Set(r?r.split(" ").filter(Boolean):[])}function Yh(r){return r?[...r].join(" "):""}function Y(r,t,e){e?r.setAttribute(t,e):r.removeAttribute(t)}function Uh(r){return Ra(Array.isArray(r)?r.join(" "):r)}function Na(r,t,e){e=Uh(e);let i=Ra(r.getAttribute(t));e.forEach(s=>i.add(s)),Y(r,t,Yh(i))}function $a(r,t,e){e=Uh(e);let i=Ra(r.getAttribute(t));e.forEach(s=>i.delete(s)),Y(r,t,Yh(i))}function gn(r){return r.nodeType===Node.TEXT_NODE&&r.textContent.trim()===""}function jh(r){return r?!!(r.nodeType===Node.ELEMENT_NODE&&(customElements.get(r.localName)||r.children.length>0)||r.textContent?.trim()):!1}var uy=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,vn=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function cy(){function r(){return!0}return Hh(r)}function fy(){try{return py()?!0:my()?vn?!_y():!cy():!1}catch{return!1}}function py(){return localStorage.getItem("vaadin.developmentmode.force")}function my(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function _y(){return!!(vn&&Object.keys(vn).map(t=>vn[t]).filter(t=>t.productionMode).length>0)}function Hh(r,t){if(typeof r!="function")return;let e=uy.exec(r.toString());if(e)try{r=new Function(e[1])}catch(i){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",i)}return r(t)}window.Vaadin=window.Vaadin||{};var Fa=function(r,t){if(window.Vaadin.developmentMode)return Hh(r,t)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=fy());function gy(){}var Wh=function(){if(typeof Fa=="function")return Fa(gy)};var qh=0,Kh=0,or=[],Ba=!1;function vy(){Ba=!1;let r=or.length;for(let t=0;t<r;t++){let e=or[t];if(e)try{e()}catch(i){setTimeout(()=>{throw i})}}or.splice(0,r),Kh+=r}var Ge={after(r){return{run(t){return window.setTimeout(t,r)},cancel(t){window.clearTimeout(t)}}},run(r,t){return window.setTimeout(r,t)},cancel(r){window.clearTimeout(r)}};var Ri={run(r){return window.requestAnimationFrame(r)},cancel(r){window.cancelAnimationFrame(r)}};var yn={run(r){return window.requestIdleCallback?window.requestIdleCallback(r):window.setTimeout(r,16)},cancel(r){window.cancelIdleCallback?window.cancelIdleCallback(r):window.clearTimeout(r)}};var tt={run(r){Ba||(Ba=!0,queueMicrotask(()=>vy())),or.push(r);let t=qh;return qh+=1,t},cancel(r){let t=r-Kh;if(t>=0){if(!or[t])throw new Error(`invalid async handle: ${r}`);or[t]=null}}};var Qr=new Set,ae=class r{static debounce(t,e,i){return t instanceof r?t._cancelAsync():t=new r,t.setConfig(e,i),t}constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,Qr.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),Qr.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return this._timer!=null}};function bn(r){Qr.add(r)}function yy(){let r=!!Qr.size;return Qr.forEach(t=>{try{t.flush()}catch(e){setTimeout(()=>{throw e})}}),r}var Ni=()=>{let r;do r=yy();while(r)};var Ht=[];function Va(r,t,e=r.getAttribute("dir")){t?r.setAttribute("dir",t):e!=null&&r.removeAttribute("dir")}function za(){return document.documentElement.getAttribute("dir")}function by(){let r=za();Ht.forEach(t=>{Va(t,r)})}var xy=new MutationObserver(by);xy.observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]});var J=r=>class extends r{static get properties(){return{dir:{type:String,value:"",reflectToAttribute:!0,converter:{fromAttribute:e=>e||"",toAttribute:e=>e===""?null:e}}}}get __isRTL(){return this.getAttribute("dir")==="rtl"}connectedCallback(){super.connectedCallback(),(!this.hasAttribute("dir")||this.__restoreSubscription)&&(this.__subscribe(),Va(this,za(),null))}attributeChangedCallback(e,i,s){if(super.attributeChangedCallback(e,i,s),e!=="dir")return;let n=za(),a=s===n&&Ht.indexOf(this)===-1,d=!s&&i&&Ht.indexOf(this)===-1;a||d?(this.__subscribe(),Va(this,n,s)):s!==n&&i===n&&this.__unsubscribe()}disconnectedCallback(){super.disconnectedCallback(),this.__restoreSubscription=Ht.includes(this),this.__unsubscribe()}_valueToNodeAttribute(e,i,s){s==="dir"&&i===""&&!e.hasAttribute("dir")||super._valueToNodeAttribute(e,i,s)}_attributeToProperty(e,i,s){e==="dir"&&!i?this.dir="":super._attributeToProperty(e,i,s)}__subscribe(){Ht.includes(this)||Ht.push(this)}__unsubscribe(){Ht.includes(this)&&Ht.splice(Ht.indexOf(this),1)}};window.Vaadin||(window.Vaadin={});window.Vaadin.registrations||(window.Vaadin.registrations=[]);window.Vaadin.developmentModeCallback||(window.Vaadin.developmentModeCallback={});window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]=function(){Wh()};var Ya,Gh=new Set,K=r=>class extends J(r){static _ensureRegistrations(){let{is:e}=this;if(e&&!Gh.has(e)){window.Vaadin.registrations.push(this),Gh.add(e);let i=window.Vaadin.developmentModeCallback;i&&(Ya=ae.debounce(Ya,yn,()=>{i["vaadin-usage-statistics"]()}),bn(Ya))}}constructor(){super(),document.doctype===null&&console.warn('Vaadin components require the "standards mode" declaration. Please add <!DOCTYPE html> to the HTML document.'),this.constructor._ensureRegistrations()}};var Zh=new WeakMap;function wy(r,t){let e=t;for(;e;){if(Zh.get(e)===r)return!0;e=Object.getPrototypeOf(e)}return!1}function ge(r){return t=>{if(wy(r,t))return t;let e=r(t);return Zh.set(e,r),e}}function $i(r,t){return r.split(".").reduce((e,i)=>e?e[i]:void 0,t)}function Xh(r,t,e){let i=r.split("."),s=i.pop(),n=i.reduce((a,d)=>a[d],e);n[s]=t}var Ua={},Cy=/([A-Z])/gu;function Jh(r){return Ua[r]||(Ua[r]=r.replace(Cy,"-$1").toLowerCase()),Ua[r]}function Qh(r){return r[0].toUpperCase()+r.substring(1)}function ja(r){let[t,e]=r.split("("),i=e.replace(")","").split(",").map(s=>s.trim());return{method:t,observerProps:i}}function Ha(r,t){return Object.prototype.hasOwnProperty.call(r,t)||(r[t]=new Map(r[t])),r[t]}var Sy=r=>{class t extends r{static enabledWarnings=[];static createProperty(i,s){[String,Boolean,Number,Array].includes(s)&&(s={type:s}),s?.reflectToAttribute&&(s.reflect=!0),super.createProperty(i,s)}static getOrCreateMap(i){return Ha(this,i)}static finalize(){if(window.litIssuedWarnings&&(window.litIssuedWarnings.add("no-override-create-property"),window.litIssuedWarnings.add("no-override-get-property-descriptor")),super.finalize(),Array.isArray(this.observers)){let i=this.getOrCreateMap("__complexObservers");this.observers.forEach(s=>{let{method:n,observerProps:a}=ja(s);i.set(n,a)})}}static addCheckedInitializer(i){super.addInitializer(s=>{s instanceof this&&i(s)})}static getPropertyDescriptor(i,s,n){let a=super.getPropertyDescriptor(i,s,n),d=a;if(this.getOrCreateMap("__propKeys").set(i,s),n.sync&&(d={get:a.get,set(c){let f=this[i];rr(c,f)&&(this[s]=c,this.requestUpdate(i,f,n),this.hasUpdated&&this.performUpdate())},configurable:!0,enumerable:!0}),n.readOnly){let c=d.set;this.addCheckedInitializer(f=>{f[`_set${Qh(i)}`]=function(m){c.call(f,m)}}),d={get:d.get,set(){},configurable:!0,enumerable:!0}}if("value"in n&&this.addCheckedInitializer(c=>{let f=typeof n.value=="function"?n.value.call(c):n.value;n.readOnly?c[`_set${Qh(i)}`](f):c[i]=f}),n.observer){let c=n.observer;this.getOrCreateMap("__observers").set(i,c),this.addCheckedInitializer(f=>{f[c]||console.warn(`observer method ${c} not defined`)})}if(n.notify){if(!this.__notifyProps)this.__notifyProps=new Set;else if(!this.hasOwnProperty("__notifyProps")){let c=this.__notifyProps;this.__notifyProps=new Set(c)}this.__notifyProps.add(i)}if(n.computed){let c=`__assignComputed${i}`,f=ja(n.computed);this.prototype[c]=function(...m){this[i]=this[f.method](...m)},this.getOrCreateMap("__computedObservers").set(c,f.observerProps)}return n.attribute||(n.attribute=Jh(i)),d}static get polylitConfig(){return{asyncFirstRender:!1}}connectedCallback(){super.connectedCallback();let{polylitConfig:i}=this.constructor;!this.hasUpdated&&!i.asyncFirstRender&&this.performUpdate()}firstUpdated(){super.firstUpdated(),this.$||(this.$={}),this.renderRoot.querySelectorAll("[id]").forEach(i=>{this.$[i.id]=i})}ready(){}willUpdate(i){this.constructor.__computedObservers&&this.__runComplexObservers(i,this.constructor.__computedObservers)}updated(i){let s=this.__isReadyInvoked;this.__isReadyInvoked=!0,this.constructor.__observers&&this.__runObservers(i,this.constructor.__observers),this.constructor.__complexObservers&&this.__runComplexObservers(i,this.constructor.__complexObservers),this.__dynamicPropertyObservers&&this.__runDynamicObservers(i,this.__dynamicPropertyObservers),this.__dynamicMethodObservers&&this.__runComplexObservers(i,this.__dynamicMethodObservers),this.constructor.__notifyProps&&this.__runNotifyProps(i,this.constructor.__notifyProps),s||this.ready()}setProperties(i){Object.entries(i).forEach(([s,n])=>{let a=this.constructor.__propKeys.get(s),d=this[a];this[a]=n,this.requestUpdate(s,d)}),this.hasUpdated&&this.performUpdate()}_createMethodObserver(i){let s=Ha(this,"__dynamicMethodObservers"),{method:n,observerProps:a}=ja(i);s.set(n,a)}_createPropertyObserver(i,s){Ha(this,"__dynamicPropertyObservers").set(s,i)}__runComplexObservers(i,s){s.forEach((n,a)=>{n.some(d=>i.has(d))&&(this[a]?this[a](...n.map(d=>this[d])):console.warn(`observer method ${a} not defined`))})}__runDynamicObservers(i,s){s.forEach((n,a)=>{i.has(n)&&this[a]&&this[a](this[n],i.get(n))})}__runObservers(i,s){i.forEach((n,a)=>{let d=s.get(a);d!==void 0&&this[d]&&this[d](this[a],n)})}__runNotifyProps(i,s){i.forEach((n,a)=>{s.has(a)&&this.dispatchEvent(new CustomEvent(`${Jh(a)}-changed`,{detail:{value:this[a]}}))})}_get(i,s){return $i(i,s)}_set(i,s,n){Xh(i,s,n)}}return t},O=ge(Sy);var $e=class{constructor(t,e,i={}){this.target=t,this.callback=e,this.forceInitial=i.forceInitial,this._storedNodes=[],this._isSlot=t instanceof HTMLSlotElement,this._connected=!1,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),i.syncInitial?this.flush():this._schedule()}connect(){this.target.addEventListener("slotchange",this._boundSchedule),this._connected=!0}disconnect(){this.target.removeEventListener("slotchange",this._boundSchedule),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,queueMicrotask(()=>{this._scheduled&&this.flush()}))}flush(){this._connected&&(this._scheduled=!1,this._processNodes())}_collectNodes(){let t=this._isSlot?[this.target]:[...this.target.querySelectorAll("slot")];return[...new Set(t.flatMap(e=>e.assignedNodes({flatten:!0})))]}_groupNodesBySlot(t){let e=new Map;return t.forEach(i=>{let s=i.assignedSlot;e.set(s,e.get(s)??[]),e.get(s).push(i)}),e}_collectMovedNodes(t){let e=this._groupNodesBySlot(t),i=this._groupNodesBySlot(this._storedNodes),s=[];return e.forEach((n,a)=>{let d=i.get(a)||[];new Set(d).difference(new Set(n)).size>0||d.forEach((c,f)=>{n.indexOf(c)!==f&&s.push(c)})}),s}_processNodes(){let t=this._collectNodes(),e=t.filter(n=>!this._storedNodes.includes(n)),i=this._storedNodes.filter(n=>!t.includes(n)),s=this._collectMovedNodes(t);(e.length||i.length||s.length||this.forceInitial)&&this.callback({addedNodes:e,currentNodes:t,movedNodes:s,removedNodes:i}),this.forceInitial&&(this.forceInitial=!1),this._storedNodes=t}};function ar(r){try{CSS.registerProperty(r)}catch(t){if(t instanceof DOMException&&t.name==="InvalidModificationError")console.warn(`The CSS property ${r.name} has already been registered.`);else throw t}}var eu=(r,...t)=>{let e=document.createElement("style");e.id=r,e.textContent=t.map(i=>i.toString()).join(`
`),document.head.insertAdjacentElement("afterbegin",e)};var xn=class r extends EventTarget{#e;#t=new Set;#i;#r=!1;constructor(t){super(),this.#e=t,this.#i=new CSSStyleSheet}#n(t){let{propertyName:e}=t;this.#t.has(e)&&this.dispatchEvent(new CustomEvent("property-changed",{detail:{propertyName:e}}))}observe(t){this.connect(),!this.#t.has(t)&&(this.#t.add(t),this.#i.replaceSync(`
      :root::before, :host::before {
        content: '' !important;
        position: absolute !important;
        top: -9999px !important;
        left: -9999px !important;
        visibility: hidden !important;
        transition: 1ms allow-discrete step-end !important;
        transition-property: ${[...this.#t].join(", ")} !important;
      }
    `))}connect(){this.#r||(this.#e.adoptedStyleSheets.unshift(this.#i),this.#s.addEventListener("transitionstart",t=>this.#n(t)),this.#s.addEventListener("transitionend",t=>this.#n(t)),this.#r=!0)}disconnect(){this.#t.clear(),this.#e.adoptedStyleSheets=this.#e.adoptedStyleSheets.filter(t=>t!==this.#i),this.#s.removeEventListener("transitionstart",this.#n),this.#s.removeEventListener("transitionend",this.#n),this.#r=!1}get#s(){return this.#e.documentElement??this.#e.host}static for(t){return t.__cssPropertyObserver||=new r(t),t.__cssPropertyObserver}};function ky(r){let{baseStyles:t,themeStyles:e,elementStyles:i,lumoInjector:s}=r.constructor,n=r.__lumoStyleSheet;return n?[...s.includeBaseStyles?t??i:[],n,...e??[]]:i}function wn(r){an(r.shadowRoot,ky(r))}function Wa(r,t){r.__lumoStyleSheet=t,wn(r)}function Cn(r){r.__lumoStyleSheet=void 0,wn(r)}var tu=new Set;function ai(r){tu.has(r)||(tu.add(r),console.warn(r))}var iu=new WeakMap;function ru(r){try{return r.media.mediaText}catch{return ai('[LumoInjector] Browser denied to access property "mediaText" for some CSS rules, so they were skipped.'),""}}function Ey(r){try{return r.cssRules}catch{return ai('[LumoInjector] Browser denied to access property "cssRules" for some CSS stylesheets, so they were skipped.'),[]}}function su(r,t={tags:new Map,modules:new Map}){for(let e of Ey(r)){if(e instanceof CSSImportRule){let i=ru(e);i.startsWith("lumo_")?t.modules.set(i,[...e.styleSheet.cssRules]):su(e.styleSheet,t);continue}if(e instanceof CSSMediaRule){let i=ru(e);i.startsWith("lumo_")&&t.modules.set(i,[...e.cssRules]);continue}if(e instanceof CSSStyleRule&&e.cssText.includes("-inject")){for(let i of e.style){let s=i.match(/^--_lumo-(.*)-inject-modules$/u)?.[1];if(!s)continue;let n=e.style.getPropertyValue(i);t.tags.set(s,n.split(",").map(a=>a.trim().replace(/'|"/gu,"")))}continue}}return t}function nu(r){let t=new Map,e=new Map;for(let i of r){let s=iu.get(i);s||(s=su(i),iu.set(i,s)),t=new Map([...t,...s.tags]),e=new Map([...e,...s.modules])}return{tags:t,modules:e}}function qa(r){return`--_lumo-${r.is}-inject`}var Sn=class{#e;#t;#i=new Map;#r=new Map;constructor(t=document){this.#e=t,this.handlePropertyChange=this.handlePropertyChange.bind(this),this.#t=xn.for(t),this.#t.addEventListener("property-changed",this.handlePropertyChange)}disconnect(){this.#t.removeEventListener("property-changed",this.handlePropertyChange),this.#i.clear(),this.#r.values().forEach(t=>t.forEach(Cn))}forceUpdate(){for(let t of this.#i.keys())this.#s(t)}componentConnected(t){let{lumoInjector:e}=t.constructor,{is:i}=e;this.#r.set(i,this.#r.get(i)??new Set),this.#r.get(i).add(t);let s=this.#i.get(i);if(s){s.cssRules.length>0&&Wa(t,s);return}this.#n(i);let n=qa(e);this.#t.observe(n)}componentDisconnected(t){let{is:e}=t.constructor.lumoInjector;this.#r.get(e)?.delete(t),Cn(t)}handlePropertyChange(t){let{propertyName:e}=t.detail,i=e.match(/^--_lumo-(.*)-inject$/u)?.[1];i&&this.#s(i)}#n(t){this.#i.set(t,new CSSStyleSheet),this.#s(t)}#s(t){let{tags:e,modules:i}=nu(this.#a),s=(e.get(t)??[]).flatMap(a=>i.get(a)??[]).map(a=>a.cssText).join(`
`),n=this.#i.get(t);n.replaceSync(s),this.#r.get(t)?.forEach(a=>{s?Wa(a,n):Cn(a)})}get#a(){let t=new Set;for(let e of[this.#e,document])t=t.union(new Set(e.styleSheets)),t=t.union(new Set(e.adoptedStyleSheets));return[...t]}};var ou=new Set;function au(r){let t=r.getRootNode();return t.host&&t.host.constructor.version?au(t.host):t}var A=r=>class extends r{static finalize(){super.finalize();let e=qa(this.lumoInjector);this.is&&!ou.has(e)&&(ou.add(e),ar({name:e,syntax:"<number>",inherits:!0,initialValue:"0"}))}static get lumoInjector(){return{is:this.is,includeBaseStyles:!1}}connectedCallback(){super.connectedCallback();let e=au(this);e.__lumoInjectorDisabled||this.isConnected&&(e.__lumoInjector||=new Sn(e),this.__lumoInjector=e.__lumoInjector,this.__lumoInjector.componentConnected(this))}disconnectedCallback(){super.disconnectedCallback(),this.__lumoInjector&&(this.__lumoInjector.componentDisconnected(this),this.__lumoInjector=void 0)}};var bt=r=>class extends r{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(e,i,s){super.attributeChangedCallback(e,i,s),e==="theme"&&this._set_theme(s)}};var kn=[],Ka=new Set,Ga=new Set;function lu(r){return r&&Object.prototype.hasOwnProperty.call(r,"__themes")}function Ty(r){return lu(customElements.get(r))}function Oy(r=[]){return[r].flat(1/0).filter(t=>t instanceof Oi?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function du(r,t){return(r||"").split(" ").some(e=>new RegExp(`^${e.split("*").join(".*")}$`,"u").test(t))}function hu(r){return r.map(t=>t.cssText).join(`
`)}var En="vaadin-themable-mixin-style";function Dy(r,t){let e=document.createElement("style");e.id=En,e.textContent=hu(r),t.content.appendChild(e)}function My(r){if(!r.shadowRoot)return;let t=r.constructor;if(r instanceof S)wn(r);else{let e=r.shadowRoot.getElementById(En),i=t.prototype._template;e.textContent=i.content.getElementById(En).textContent}}function Iy(r){Ka.forEach(t=>{let e=t.deref();e instanceof r?My(e):e||Ka.delete(t)})}function uu(r){if(r.prototype instanceof S)r.elementStyles=r.finalizeStyles(r.styles);else{let t=r.prototype._template;t.content.getElementById(En).textContent=hu(r.getStylesForThis())}Ga.forEach(t=>{let e=customElements.get(t);e!==r&&e.prototype instanceof r&&uu(e)})}function Ay(r,t){let e=r.__themes;return!e||!t?!1:e.some(i=>i.styles.some(s=>t.some(n=>n.cssText===s.cssText)))}function Za(r,t,e={}){t=Oy(t),kn.push({themeFor:r,styles:t,include:e.include,moduleId:e.moduleId}),r&&Ga.forEach(i=>{if(du(r,i)&&Ty(i)){let s=customElements.get(i);Ay(s,t)?console.warn(`Registering styles that already exist for ${i}`):(!window.Vaadin||!window.Vaadin.suppressPostFinalizeStylesWarning)&&console.warn(`The custom element definition for "${i}" was finalized before a style module was registered. Ideally, import component specific style modules before importing the corresponding custom element. This warning can be suppressed by setting "window.Vaadin.suppressPostFinalizeStylesWarning = true".`),uu(s),Iy(s)}})}function Py(r=""){let t=0;return r.startsWith("lumo-")||r.startsWith("material-")?t=1:r.startsWith("vaadin-")&&(t=2),t}function cu(r){let t=[];return r.include&&[].concat(r.include).forEach(e=>{let i=kn.find(s=>s.moduleId===e);i?t.push(...cu(i),...i.styles):console.warn(`Included moduleId ${e} not found in style registry`)},r.styles),t}function Ly(r){let t=`${r}-default-theme`,e=kn.filter(i=>i.moduleId!==t&&du(i.themeFor,r)).map(i=>({...i,styles:[...cu(i),...i.styles],includePriority:Py(i.moduleId)})).sort((i,s)=>s.includePriority-i.includePriority);return e.length>0?e:kn.filter(i=>i.moduleId===t)}var I=r=>class extends bt(r){constructor(){super(),Ka.add(new WeakRef(this))}static finalize(){if(super.finalize(),this.is&&Ga.add(this.is),this.elementStyles)return;let e=this.prototype._template;!e||lu(this)||Dy(this.getStylesForThis(),e)}static finalizeStyles(e){return this.baseStyles=e?[e].flat(1/0):[],this.themeStyles=this.getStylesForThis(),[...this.baseStyles,...this.themeStyles]}static getStylesForThis(){let e=r.__themes||[],i=Object.getPrototypeOf(this.prototype),s=(i?i.constructor.__themes:[])||[];this.__themes=[...e,...s,...Ly(this.is)];let n=this.__themes.flatMap(a=>a.styles);return n.filter((a,d)=>d===n.lastIndexOf(a))}};["--vaadin-text-color","--vaadin-text-color-disabled","--vaadin-text-color-secondary","--vaadin-border-color","--vaadin-border-color-secondary","--vaadin-background-color"].forEach(r=>{ar({name:r,syntax:"<color>",inherits:!0,initialValue:"transparent"})});eu("vaadin-base",C`
    @layer vaadin.base {
      html {
        /* Background color */
        --vaadin-background-color: light-dark(#fff, #222);

        /* Container colors */
        --vaadin-background-container: color-mix(in oklab, var(--vaadin-text-color) 5%, var(--vaadin-background-color));
        --vaadin-background-container-strong: color-mix(
          in oklab,
          var(--vaadin-text-color) 10%,
          var(--vaadin-background-color)
        );

        /* Border colors */
        --vaadin-border-color-secondary: color-mix(in oklab, var(--vaadin-text-color) 24%, transparent);
        --vaadin-border-color: color-mix(in oklab, var(--vaadin-text-color) 48%, transparent); /* Above 3:1 contrast */

        /* Text colors */
        /* Above 3:1 contrast */
        --vaadin-text-color-disabled: color-mix(in oklab, var(--vaadin-text-color) 48%, transparent);
        /* Above 4.5:1 contrast */
        --vaadin-text-color-secondary: color-mix(in oklab, var(--vaadin-text-color) 68%, transparent);
        /* Above 7:1 contrast */
        --vaadin-text-color: light-dark(#1f1f1f, white);

        /* Padding */
        --vaadin-padding-xs: 6px;
        --vaadin-padding-s: 8px;
        --vaadin-padding-m: 12px;
        --vaadin-padding-l: 16px;
        --vaadin-padding-xl: 24px;
        --vaadin-padding-block-container: var(--vaadin-padding-xs);
        --vaadin-padding-inline-container: var(--vaadin-padding-s);

        /* Gap/spacing */
        --vaadin-gap-xs: 6px;
        --vaadin-gap-s: 8px;
        --vaadin-gap-m: 12px;
        --vaadin-gap-l: 16px;
        --vaadin-gap-xl: 24px;

        /* Border radius */
        --vaadin-radius-s: 3px;
        --vaadin-radius-m: 6px;
        --vaadin-radius-l: 12px;

        /* Focus outline */
        --vaadin-focus-ring-width: 2px;
        --vaadin-focus-ring-color: var(--vaadin-text-color);

        /* Icons, used as mask-image */
        --_vaadin-icon-arrow-up: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>');
        --_vaadin-icon-calendar: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>');
        --_vaadin-icon-checkmark: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>');
        --_vaadin-icon-checkmark-small: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>');
        --_vaadin-icon-chevron-down: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>');
        --_vaadin-icon-chevron-right: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>');
        --_vaadin-icon-clock: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>');
        --_vaadin-icon-cross: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>');
        --_vaadin-icon-cross-small: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>');
        --_vaadin-icon-drag: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M11 7c0 .82843-.6716 1.5-1.5 1.5C8.67157 8.5 8 7.82843 8 7s.67157-1.5 1.5-1.5c.8284 0 1.5.67157 1.5 1.5Zm0 5c0 .8284-.6716 1.5-1.5 1.5-.82843 0-1.5-.6716-1.5-1.5s.67157-1.5 1.5-1.5c.8284 0 1.5.6716 1.5 1.5Zm0 5c0 .8284-.6716 1.5-1.5 1.5-.82843 0-1.5-.6716-1.5-1.5s.67157-1.5 1.5-1.5c.8284 0 1.5.6716 1.5 1.5Zm5-10c0 .82843-.6716 1.5-1.5 1.5S13 7.82843 13 7s.6716-1.5 1.5-1.5S16 6.17157 16 7Zm0 5c0 .8284-.6716 1.5-1.5 1.5S13 12.8284 13 12s.6716-1.5 1.5-1.5 1.5.6716 1.5 1.5Zm0 5c0 .8284-.6716 1.5-1.5 1.5S13 17.8284 13 17s.6716-1.5 1.5-1.5 1.5.6716 1.5 1.5Z" fill="currentColor"/></svg>');
        --_vaadin-icon-ellipsis: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>');
        --_vaadin-icon-eye: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>');
        --_vaadin-icon-eye-slash: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>');
        --_vaadin-icon-file: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>');
        --_vaadin-icon-fullscreen: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>');
        --_vaadin-icon-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>');
        --_vaadin-icon-link: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>');
        --_vaadin-icon-menu: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>');
        --_vaadin-icon-minus: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>');
        --_vaadin-icon-paper-airplane: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>');
        --_vaadin-icon-pen: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>');
        --_vaadin-icon-play: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>');
        --_vaadin-icon-plus: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>');
        --_vaadin-icon-redo: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>');
        --_vaadin-icon-refresh: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M22 10C22 10 19.995 7.26822 18.3662 5.63824C16.7373 4.00827 14.4864 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.1031 21 19.5649 18.2543 20.6482 14.5M22 10V4M22 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        --_vaadin-icon-resize: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.5303 7.46967c.2929.29289.2929.76777 0 1.06066L8.53033 18.5304c-.29289.2929-.76777.2929-1.06066 0s-.29289-.7678 0-1.0607L17.4697 7.46967c.2929-.29289.7677-.29289 1.0606 0Zm0 4.50003c.2929.2929.2929.7678 0 1.0607l-5.5 5.5c-.2929.2928-.7677.2928-1.0606 0-.2929-.2929-.2929-.7678 0-1.0607l5.4999-5.5c.2929-.2929.7678-.2929 1.0607 0Zm0 4.5c.2929.2928.2929.7677 0 1.0606l-1 1.0001c-.2929.2928-.7677.2929-1.0606 0-.2929-.2929-.2929-.7678 0-1.0607l1-1c.2929-.2929.7677-.2929 1.0606 0Z" fill="currentColor"/></svg>');
        --_vaadin-icon-slash: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect x="13.7812" y="4.22583" width="1.5" height="16" rx="0.75" transform="rotate(20 13.7812 4.22583)" fill="currentColor"/></svg>');
        --_vaadin-icon-sort: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M7.49854 6.99951C7.92795 6.99951 8.15791 7.50528 7.87549 7.82861L4.37646 11.8296C4.17728 12.0571 3.82272 12.0571 3.62354 11.8296L0.125488 7.82861C-0.157248 7.50531 0.0719873 6.99956 0.501465 6.99951H7.49854ZM3.62354 0.17041C3.82275 -0.0573875 4.17725 -0.0573848 4.37646 0.17041L7.87549 4.17041C8.15825 4.49373 7.92806 5.00049 7.49854 5.00049L0.501465 4.99951C0.0719873 4.99946 -0.157248 4.49371 0.125488 4.17041L3.62354 0.17041Z" fill="black"/></svg>');
        --_vaadin-icon-undo: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>');
        --_vaadin-icon-upload: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>');
        --_vaadin-icon-user: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>');
        --_vaadin-icon-warn: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>');

        /* Cursors for interactive elements */
        --vaadin-clickable-cursor: pointer;
        --vaadin-disabled-cursor: not-allowed;

        /* Use units so that the values can be used in calc() */
        --safe-area-inset-top: env(safe-area-inset-top, 0px);
        --safe-area-inset-right: env(safe-area-inset-right, 0px);
        --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
        --safe-area-inset-left: env(safe-area-inset-left, 0px);
        --safe-area-inset-inline-start: var(--safe-area-inset-left);
        --safe-area-inset-inline-end: var(--safe-area-inset-right);

        &:dir(rtl) {
          --safe-area-inset-inline-start: var(--safe-area-inset-right);
          --safe-area-inset-inline-end: var(--safe-area-inset-left);
        }
      }

      @supports not (color: hsl(0 0 0)) {
        html {
          --_vaadin-safari-17-deg: 1deg;
        }
      }

      @media (forced-colors: active) {
        html {
          --vaadin-background-color: Canvas;
          --vaadin-border-color: CanvasText;
          --vaadin-border-color-secondary: CanvasText;
          --vaadin-text-color-disabled: CanvasText;
          --vaadin-text-color-secondary: CanvasText;
          --vaadin-text-color: CanvasText;
          --vaadin-icon-color: CanvasText;
          --vaadin-focus-ring-color: Highlight;
        }
      }
    }
  `);var fu=C`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: baseline;
    box-sizing: border-box;
    --_border-width: var(--vaadin-badge-border-width, 1px);
    gap: var(--vaadin-badge-gap, 0.25em);
    padding: var(--vaadin-badge-padding, 0 calc(0.5lh - 0.25em));
    font-size: var(--vaadin-badge-font-size, 0.875rem);
    font-family: var(--vaadin-badge-font-family, inherit);
    font-weight: var(--vaadin-badge-font-weight, 500);
    line-height: var(--vaadin-badge-line-height, 1lh);
    color: var(--vaadin-badge-text-color, var(--vaadin-text-color));
    background: var(--vaadin-badge-background, transparent);
    border: var(--_border-width) solid var(--vaadin-badge-border-color, var(--vaadin-border-color));
    border-radius: var(--vaadin-badge-border-radius, 100vh);
    min-width: calc(1lh + var(--_border-width) * 2);
    white-space: nowrap;
    --vaadin-icon-size: 1em;
    /* prevent from stretching */
    height: round(1lh + var(--_border-width) * 2, 0.125rem);
    flex: none;
    /* Only reserve 1lh of space (treat border as an outline) */
    margin: calc(var(--_border-width) * -1);
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='content'] {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host(:not([has-icon])) [part='icon'],
  :host(:not([has-content])) [part='content'],
  :host(:not([has-number])) [part='number'] {
    display: none;
  }

  :host(:is([theme~='filled'], [theme~='dot'])) {
    background: var(--vaadin-text-color);
    color: var(--vaadin-background-color);
  }

  :host([theme~='icon-only']),
  :host([has-icon]:not([has-content], [has-number])) {
    padding: 0;
  }

  :host([theme~='icon-only']),
  :host([theme~='number-only']) {
    gap: 0;
  }

  :host([theme~='dot']) {
    min-width: 0;
    width: round(0.5em, 0.125rem);
    height: round(0.5em, 0.125rem);
    padding: 0;
    margin: 0;
  }

  @media (forced-colors: active) {
    :host {
      --_border-width: 1px !important;
      border: var(--_border-width) solid !important;
    }
  }
`;var es=class extends K(I(O(A(S)))){static get is(){return"vaadin-badge"}static get styles(){return[fu,_n]}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}static get properties(){return{number:{type:Number}}}render(){let t=(this._theme||"").split(" "),e=t.includes("icon-only"),i=t.includes("number-only"),s=t.includes("dot");return w`
      <div part="icon" class="${mn({"sr-only":i||s})}">
        <slot name="icon"></slot>
      </div>
      <div part="number" class="${mn({"sr-only":e||s})}">${this.number}</div>
      <div part="content" class="${mn({"sr-only":i||e||s})}">
        <slot></slot>
      </div>
    `}willUpdate(t){super.willUpdate(t),t.has("number")&&this.toggleAttribute("has-number",this.number!=null)}firstUpdated(){super.firstUpdated(),this.__contentSlot=this.shadowRoot.querySelector("slot:not([name])"),this.__slotObserver=new $e(this.__contentSlot,()=>{this.__updateHasContent()},{syncInitial:!0});let t=this.shadowRoot.querySelector('slot[name="icon"]');this.__iconSlotObserver=new $e(t,({currentNodes:e})=>{this.toggleAttribute("has-icon",e.length>0)},{syncInitial:!0}),this.__textObserver=new MutationObserver(()=>{this.__updateHasContent()}),this.__textObserver.observe(this,{characterData:!0,subtree:!0})}__updateHasContent(){let t=this.__contentSlot.assignedNodes({flatten:!0});this.toggleAttribute("has-content",t.some(e=>!gn(e)))}};E(es);var Ry=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},pu=class extends es{};pu=Ry([q("or-vaadin-badge")],pu);var Ny=0;function xt(){return Ny++}var ie=class extends EventTarget{static generateId(t,e="default"){return`${e}-${t.localName}-${xt()}`}constructor(t,e,i,s={}){super();let{initializer:n,multiple:a,observe:d,useUniqueId:c,uniqueIdPrefix:f}=s;this.host=t,this.slotName=e,this.tagName=i,this.observe=typeof d=="boolean"?d:!0,this.multiple=typeof a=="boolean"?a:!1,this.slotInitializer=n,a&&(this.nodes=[]),c&&(this.defaultId=this.constructor.generateId(t,f||e))}hostConnected(){this.initialized||(this.multiple?this.initMultiple():this.initSingle(),this.observe&&this.observeSlot(),this.initialized=!0)}initSingle(){let t=this.getSlotChild();t?(this.node=t,this.initAddedNode(t)):(t=this.attachDefaultNode(),this.initNode(t))}initMultiple(){let t=this.getSlotChildren();if(t.length===0){let e=this.attachDefaultNode();e&&(this.nodes=[e],this.initNode(e))}else this.nodes=t,t.forEach(e=>{this.initAddedNode(e)})}attachDefaultNode(){let{host:t,slotName:e,tagName:i}=this,s=this.defaultNode;return!s&&i&&(s=document.createElement(i),s instanceof Element&&(e!==""&&s.setAttribute("slot",e),this.defaultNode=s)),s&&(this.node=s,t.appendChild(s)),s}getSlotChildren(){let{slotName:t}=this;return Array.from(this.host.childNodes).filter(e=>e.nodeType===Node.ELEMENT_NODE&&e.hasAttribute("data-slot-ignore")?!1:e.nodeType===Node.ELEMENT_NODE&&e.slot===t||e.nodeType===Node.TEXT_NODE&&e.textContent.trim()&&t==="")}getSlotChild(){return this.getSlotChildren()[0]}initNode(t){let{slotInitializer:e}=this;e&&e(t,this.host)}initCustomNode(t){}teardownNode(t){}initAddedNode(t){t!==this.defaultNode&&(this.initCustomNode(t),this.initNode(t))}observeSlot(){let{slotName:t}=this,e=t===""?"slot:not([name])":`slot[name=${t}]`,i=this.host.shadowRoot.querySelector(e);new $e(i,({addedNodes:s,removedNodes:n})=>{let a=this.multiple?this.nodes:[this.node],d=s.filter(c=>!gn(c)&&!a.includes(c)&&!(c.nodeType===Node.ELEMENT_NODE&&c.hasAttribute("data-slot-ignore")));n.length&&(this.multiple?this.nodes=a.filter(c=>!n.includes(c)):n.includes(this.node)&&(this.node=null),n.forEach(c=>{this.teardownNode(c)})),d?.length>0&&(this.multiple?(this.defaultNode&&this.defaultNode.remove(),this.nodes=[...a,...d].filter(c=>c!==this.defaultNode),d.forEach(c=>{this.initAddedNode(c)})):(this.node&&this.node.remove(),this.node=d[0],this.initAddedNode(this.node)))})}};var ue=class extends ie{constructor(t){super(t,"tooltip"),this.setTarget(t)}initCustomNode(t){t.target=this.target,this.ariaTarget!==void 0&&(t.ariaTarget=this.ariaTarget),this.context!==void 0&&(t.context=this.context),this.manual!==void 0&&(t.manual=this.manual),this.position!==void 0&&(t._position=this.position),this.shouldShow!==void 0&&(t.shouldShow=this.shouldShow),this.manual||this.host.setAttribute("has-tooltip",""),this.#t(t),t.addEventListener("content-changed",this.#e)}teardownNode(t){this.manual||this.host.removeAttribute("has-tooltip"),t.removeEventListener("content-changed",this.#e),this.#t(null)}setAriaTarget(t){this.ariaTarget=t;let e=this.node;e&&(e.ariaTarget=t)}setContext(t){this.context=t;let e=this.node;e&&(e.context=t)}setManual(t){this.manual=t;let e=this.node;e&&(e.manual=t)}setPosition(t){this.position=t;let e=this.node;e&&(e._position=t)}setShouldShow(t){this.shouldShow=t;let e=this.node;e&&(e.shouldShow=t)}setTarget(t){this.target=t;let e=this.node;e&&(e.target=t)}open(t){let e=this.node;e?.isConnected&&e._stateController.open(t)}close(t){let e=this.node;e&&e._stateController.close(t)}#e=t=>{this.#t(t.target)};#t(t){this.dispatchEvent(new CustomEvent("tooltip-changed",{detail:{node:t}}))}};var mu=C`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--vaadin-button-gap, 0 var(--vaadin-gap-s));
    white-space: var(--vaadin-button-label-wrap, normal);
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    user-select: none;
    cursor: var(--vaadin-clickable-cursor);
    box-sizing: border-box;
    flex-shrink: 0;
    height: var(--vaadin-button-height, fit-content);
    margin: var(--vaadin-button-margin, 0);
    padding: var(--vaadin-button-padding, var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container));
    font-family: var(--vaadin-button-font-family, inherit);
    font-size: var(--vaadin-button-font-size, inherit);
    line-height: var(--vaadin-button-line-height, inherit);
    font-weight: var(--vaadin-button-font-weight, 500);
    color: var(--vaadin-button-text-color, var(--vaadin-text-color));
    background: var(--vaadin-button-background, var(--vaadin-background-container));
    background-origin: border-box;
    border: var(--vaadin-button-border-width, 1px) solid
      var(--vaadin-button-border-color, var(--vaadin-border-color-secondary));
    border-radius: var(--vaadin-button-border-radius, var(--vaadin-radius-m));
    touch-action: manipulation;
  }

  :host([hidden]) {
    display: none !important;
  }

  .vaadin-button-container,
  [part='prefix'],
  [part='suffix'] {
    display: contents;
  }

  [part='label'] {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host(:is([focus-ring], :focus-visible)) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: 1px;
  }

  :host([theme~='primary']) {
    --vaadin-button-background: var(--vaadin-text-color);
    --vaadin-button-text-color: var(--vaadin-background-color);
    --vaadin-button-border-color: transparent;
  }

  :host([theme~='tertiary']) {
    background: transparent;
    border-color: transparent;
  }

  :host([disabled]) {
    pointer-events: var(--_vaadin-button-disabled-pointer-events, none);
    cursor: var(--vaadin-disabled-cursor);
    opacity: 0.5;
  }

  :host([disabled][theme~='primary']) {
    --vaadin-button-text-color: var(--vaadin-background-container-strong);
    --vaadin-button-background: var(--vaadin-text-color-disabled);
  }

  @media (forced-colors: active) {
    :host {
      --vaadin-button-border-width: 1px;
      --vaadin-button-background: ButtonFace;
      --vaadin-button-text-color: ButtonText;
    }

    :host([theme~='primary']) {
      forced-color-adjust: none;
      --vaadin-button-background: CanvasText;
      --vaadin-button-text-color: Canvas;
      --vaadin-icon-color: Canvas;
    }

    ::slotted(*) {
      forced-color-adjust: auto;
    }

    :host([disabled]) {
      --vaadin-button-background: transparent !important;
      --vaadin-button-border-color: GrayText !important;
      --vaadin-button-text-color: GrayText !important;
      opacity: 1;
    }
  }
`;var $y=!1,Fy=r=>r,el=typeof document.head.style.touchAction=="string",Tn="__polymerGestures",Xa="__polymerGesturesHandled",Qa="__polymerGesturesTouchAction",_u=25,gu=5,By=2,Vy=["mousedown","mousemove","mouseup","click"],zy=[0,1,4,2],Yy=(function(){try{return new MouseEvent("test",{buttons:1}).buttons===1}catch{return!1}})();function tl(r){return Vy.indexOf(r)>-1}var bu=!1;(function(){try{let r=Object.defineProperty({},"passive",{get(){bu=!0}});window.addEventListener("test",null,r),window.removeEventListener("test",null,r)}catch{}})();function xu(r){if(!(tl(r)||r==="touchend")&&el&&bu&&$y)return{passive:!0}}var Uy=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/u),jy={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function Bi(r){let t=r.type;if(!tl(t))return!1;if(t==="mousemove"){let i=r.buttons??1;return r instanceof window.MouseEvent&&!Yy&&(i=zy[r.which]||0),!!(i&1)}return(r.button??0)===0}function Hy(r){if(r.type==="click"){if(r.detail===0)return!0;let t=li(r);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let e=t.getBoundingClientRect(),i=r.pageX,s=r.pageY;return!(i>=e.left&&i<=e.right&&s>=e.top&&s<=e.bottom)}return!1}var Wt={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Wy(r){let t="auto",e=Cu(r);for(let i=0,s;i<e.length;i++)if(s=e[i],s[Qa]){t=s[Qa];break}return t}function wu(r,t,e){r.movefn=t,r.upfn=e,document.addEventListener("mousemove",t),document.addEventListener("mouseup",e)}function lr(r){document.removeEventListener("mousemove",r.movefn),document.removeEventListener("mouseup",r.upfn),r.movefn=null,r.upfn=null}var Cu=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:r=>r.composedPath&&r.composedPath()||[],di={},Fi=[];function il(r,t){let e=document.elementFromPoint(r,t),i=e;for(;i?.shadowRoot&&!window.ShadyDOM;){let s=i;if(i=i.shadowRoot.elementFromPoint(r,t),s===i)break;i&&(e=i)}return e}function li(r){let t=Cu(r);return t.length>0?t[0]:r.target}function Su(r){let t=r.type,i=r.currentTarget[Tn];if(!i)return;let s=i[t];if(!s)return;if(!r[Xa]&&(r[Xa]={},t.startsWith("touch"))){let a=r.changedTouches[0];if(t==="touchstart"&&r.touches.length===1&&(Wt.touch.id=a.identifier),Wt.touch.id!==a.identifier)return;el||(t==="touchstart"||t==="touchmove")&&qy(r)}let n=r[Xa];if(!n.skip){for(let a=0,d;a<Fi.length;a++)d=Fi[a],s[d.name]&&!n[d.name]&&d.flow&&d.flow.start.indexOf(r.type)>-1&&d.reset&&d.reset();for(let a=0,d;a<Fi.length;a++)d=Fi[a],s[d.name]&&!n[d.name]&&(n[d.name]=!0,d[t](r))}}function qy(r){let t=r.changedTouches[0],e=r.type;if(e==="touchstart")Wt.touch.x=t.clientX,Wt.touch.y=t.clientY,Wt.touch.scrollDecided=!1;else if(e==="touchmove"){if(Wt.touch.scrollDecided)return;Wt.touch.scrollDecided=!0;let i=Wy(r),s=!1,n=Math.abs(Wt.touch.x-t.clientX),a=Math.abs(Wt.touch.y-t.clientY);r.cancelable&&(i==="none"?s=!0:i==="pan-x"?s=a>n:i==="pan-y"&&(s=n>a)),s?r.preventDefault():On("track")}}function qt(r,t,e){return di[t]?(Ky(r,t,e),!0):!1}function ku(r,t,e){return di[t]?(Gy(r,t,e),!0):!1}function Ky(r,t,e){let i=di[t],s=i.deps,n=i.name,a=r[Tn];a||(r[Tn]=a={});for(let d=0,c,f;d<s.length;d++)c=s[d],!(Uy&&tl(c)&&c!=="click")&&(f=a[c],f||(a[c]=f={_count:0}),f._count===0&&r.addEventListener(c,Su,xu(c)),f[n]=(f[n]||0)+1,f._count=(f._count||0)+1);r.addEventListener(t,e),i.touchAction&&Xy(r,i.touchAction)}function Gy(r,t,e){let i=di[t],s=i.deps,n=i.name,a=r[Tn];if(a)for(let d=0,c,f;d<s.length;d++)c=s[d],f=a[c],f?.[n]&&(f[n]=(f[n]||1)-1,f._count=(f._count||1)-1,f._count===0&&r.removeEventListener(c,Su,xu(c)));r.removeEventListener(t,e)}function rl(r){Fi.push(r),r.emits.forEach(t=>{di[t]=r})}function Zy(r){for(let t=0,e;t<Fi.length;t++){e=Fi[t];for(let i=0,s;i<e.emits.length;i++)if(s=e.emits[i],s===r)return e}return null}function Xy(r,t){el&&r instanceof HTMLElement&&tt.run(()=>{r.style.touchAction=t}),r[Qa]=t}function sl(r,t,e){let i=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(i.detail=e,Fy(r).dispatchEvent(i),i.defaultPrevented){let s=e.preventer||e.sourceEvent;s?.preventDefault&&s.preventDefault()}}function On(r){let t=Zy(r);t.info&&(t.info.prevent=!0)}rl({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset(){lr(this.info)},mousedown(r){if(!Bi(r))return;let t=li(r),e=this,i=n=>{Bi(n)||(ts("up",t,n),lr(e.info))},s=n=>{Bi(n)&&ts("up",t,n),lr(e.info)};wu(this.info,i,s),ts("down",t,r)},touchstart(r){ts("down",li(r),r.changedTouches[0],r)},touchend(r){ts("up",li(r),r.changedTouches[0],r)}});function ts(r,t,e,i){t&&sl(t,r,{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:i,prevent(s){return On(s)}})}rl({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove(r){this.moves.length>By&&this.moves.shift(),this.moves.push(r)},movefn:null,upfn:null,prevent:!1},reset(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,lr(this.info)},mousedown(r){if(!Bi(r))return;let t=li(r),e=this,i=n=>{let a=n.clientX,d=n.clientY;vu(e.info,a,d)&&(e.info.state=e.info.started?n.type==="mouseup"?"end":"track":"start",e.info.state==="start"&&On("tap"),e.info.addMove({x:a,y:d}),Bi(n)||(e.info.state="end",lr(e.info)),t&&Ja(e.info,t,n),e.info.started=!0)},s=n=>{e.info.started&&i(n),lr(e.info)};wu(this.info,i,s),this.info.x=r.clientX,this.info.y=r.clientY},touchstart(r){let t=r.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove(r){let t=li(r),e=r.changedTouches[0],i=e.clientX,s=e.clientY;vu(this.info,i,s)&&(this.info.state==="start"&&On("tap"),this.info.addMove({x:i,y:s}),Ja(this.info,t,e),this.info.state="track",this.info.started=!0)},touchend(r){let t=li(r),e=r.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:e.clientX,y:e.clientY}),Ja(this.info,t,e))}});function vu(r,t,e){if(r.prevent)return!1;if(r.started)return!0;let i=Math.abs(r.x-t),s=Math.abs(r.y-e);return i>=gu||s>=gu}function Ja(r,t,e){if(!t)return;let i=r.moves[r.moves.length-2],s=r.moves[r.moves.length-1],n=s.x-r.x,a=s.y-r.y,d,c=0;i&&(d=s.x-i.x,c=s.y-i.y),sl(t,"track",{state:r.state,x:e.clientX,y:e.clientY,dx:n,dy:a,ddx:d,ddy:c,sourceEvent:e,hover(){return il(e.clientX,e.clientY)}})}rl({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown(r){Bi(r)&&(this.info.x=r.clientX,this.info.y=r.clientY)},click(r){Bi(r)&&yu(this.info,r)},touchstart(r){let t=r.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend(r){yu(this.info,r.changedTouches[0],r)}});function yu(r,t,e){let i=Math.abs(t.clientX-r.x),s=Math.abs(t.clientY-r.y),n=li(e||t);!n||jy[n.localName]&&n.hasAttribute("disabled")||(isNaN(i)||isNaN(s)||i<=_u&&s<=_u||Hy(t))&&(r.prevent||sl(n,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:e}))}var Jy=r=>class extends r{static get properties(){return{disabled:{type:Boolean,value:!1,observer:"_disabledChanged",reflectToAttribute:!0,sync:!0}}}_disabledChanged(e){this._setAriaDisabled(e)}_setAriaDisabled(e){Y(this,"aria-disabled",e)}click(){this.disabled||super.click()}},Fe=ge(Jy);var Qy=r=>class extends r{ready(){super.ready(),this.addEventListener("keydown",e=>{this._onKeyDown(e)}),this.addEventListener("keyup",e=>{this._onKeyUp(e)})}_onKeyDown(e){switch(e.key){case"Enter":this._onEnter(e);break;case"Escape":this._onEscape(e);break;default:break}}_onKeyUp(e){}_onEnter(e){}_onEscape(e){}},Be=ge(Qy);var hi=r=>class extends Fe(Be(r)){get _activeKeys(){return[" "]}ready(){super.ready(),qt(this,"down",e=>{this._shouldSetActive(e)&&this._setActive(!0)}),qt(this,"up",()=>{this._setActive(!1)})}disconnectedCallback(){super.disconnectedCallback(),this._setActive(!1)}_shouldSetActive(e){return!this.disabled}_onKeyDown(e){super._onKeyDown(e),this._shouldSetActive(e)&&this._activeKeys.includes(e.key)&&(this._setActive(!0),document.addEventListener("keyup",i=>{this._activeKeys.includes(i.key)&&this._setActive(!1)},{once:!0}))}_setActive(e){this.toggleAttribute("active",e)}};var ol=!1;window.addEventListener("keydown",()=>{ol=!0},{capture:!0});window.addEventListener("mousedown",()=>{ol=!1},{capture:!0});function Kt(){let r=document.activeElement||document.body;for(;r.shadowRoot&&r.shadowRoot.activeElement;)r=r.shadowRoot.activeElement;return r}function ce(){return ol}function Eu(r){let t=r.style;if(t.visibility==="hidden"||t.display==="none")return!0;let e=window.getComputedStyle(r);return e.visibility==="hidden"||e.display==="none"}function eb(r,t){let e=Math.max(r.tabIndex,0),i=Math.max(t.tabIndex,0);return e===0||i===0?i>e:e>i}function tb(r,t){let e=[];for(;r.length>0&&t.length>0;)eb(r[0],t[0])?e.push(t.shift()):e.push(r.shift());return e.concat(r,t)}function nl(r){let t=r.length;if(t<2)return r;let e=Math.ceil(t/2),i=nl(r.slice(0,e)),s=nl(r.slice(e));return tb(i,s)}function Gt(r){return r.checkVisibility?!r.checkVisibility({visibilityProperty:!0}):r.offsetParent===null&&r.clientWidth===0&&r.clientHeight===0?!0:Eu(r)}function Vi(r){return r.matches("input, select, textarea, button, object")?r.matches(":not([disabled])"):r.matches("a[href], area[href], iframe, [tabindex], [contentEditable]")}function Pe(r){return r.getRootNode().activeElement===r}function ib(r){if(!Vi(r))return-1;let t=r.getAttribute("tabindex")||0;return Number(t)}function Tu(r,t){if(r.nodeType!==Node.ELEMENT_NODE||Eu(r))return!1;let e=r,i=ib(e),s=i>0;i>=0&&t.push(e);let n;return e.localName==="slot"?n=e.assignedNodes({flatten:!0}):n=(e.shadowRoot||e).children,[...n].forEach(a=>{s=Tu(a,t)||s}),s}function Dn(r){let t=[];return Tu(r,t)?nl(t):t}var rb=r=>class extends r{get _keyboardActive(){return ce()}ready(){this.addEventListener("focusin",e=>{this._shouldSetFocus(e)&&this._setFocused(!0)}),this.addEventListener("focusout",e=>{this._shouldRemoveFocus(e)&&this._setFocused(!1)}),super.ready()}disconnectedCallback(){super.disconnectedCallback(),this.hasAttribute("focused")&&this._setFocused(!1)}focus(e){super.focus(e),e?.focusVisible!==!1&&this.setAttribute("focus-ring","")}_setFocused(e){this.toggleAttribute("focused",e),this.toggleAttribute("focus-ring",e&&this._keyboardActive)}_shouldSetFocus(e){return!0}_shouldRemoveFocus(e){return!0}},Me=ge(rb);var Mn=r=>class extends Fe(r){static get properties(){return{tabindex:{type:Number,reflectToAttribute:!0,observer:"_tabindexChanged",sync:!0},_lastTabIndex:{type:Number}}}_disabledChanged(e,i){super._disabledChanged(e,i),!this.__shouldAllowFocusWhenDisabled()&&(e?(this.tabindex!==void 0&&(this._lastTabIndex=this.tabindex),this.setAttribute("tabindex","-1")):i&&(this._lastTabIndex!==void 0?this.setAttribute("tabindex",this._lastTabIndex):this.tabindex=void 0))}_tabindexChanged(e){this.__shouldAllowFocusWhenDisabled()||this.disabled&&e!==-1&&(this._lastTabIndex=e,this.setAttribute("tabindex","-1"))}focus(e){(!this.disabled||this.__shouldAllowFocusWhenDisabled())&&super.focus(e)}__shouldAllowFocusWhenDisabled(){return!1}};var sb=["mousedown","mouseup","click","dblclick","keypress","keydown","keyup"],In=r=>class extends hi(Mn(Me(r))){constructor(){super(),this.__onInteractionEvent=this.__onInteractionEvent.bind(this),sb.forEach(e=>{this.addEventListener(e,this.__onInteractionEvent,!0)}),this.tabindex=0}get _activeKeys(){return["Enter"," "]}ready(){super.ready(),this.hasAttribute("role")||this.setAttribute("role","button"),this.__shouldAllowFocusWhenDisabled()&&this.style.setProperty("--_vaadin-button-disabled-pointer-events","auto")}_onKeyDown(e){super._onKeyDown(e),!(e.altKey||e.shiftKey||e.ctrlKey||e.metaKey)&&this._activeKeys.includes(e.key)&&(e.preventDefault(),this.click())}__onInteractionEvent(e){this.__shouldSuppressInteractionEvent(e)&&e.stopImmediatePropagation()}__shouldSuppressInteractionEvent(e){return this.disabled}};var zi=class extends In(K(I(O(A(S))))){static get is(){return"vaadin-button"}static get styles(){return mu}static get properties(){return{disabled:{type:Boolean,value:!1,observer:"_disabledChanged",reflectToAttribute:!0,sync:!0}}}render(){return w`
      <div class="vaadin-button-container" role="presentation">
        <span part="prefix" aria-hidden="true">
          <slot name="prefix"></slot>
        </span>
        <span part="label">
          <slot></slot>
        </span>
        <span part="suffix" aria-hidden="true">
          <slot name="suffix"></slot>
        </span>

        <slot name="tooltip"></slot>
      </div>
    `}ready(){super.ready(),this._tooltipController=new ue(this),this.addController(this._tooltipController)}__shouldAllowFocusWhenDisabled(){return window.Vaadin.featureFlags.accessibleDisabledButtons}};E(zi);var nb=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},Ou=class extends zi{};Ou=nb([q("or-vaadin-button")],Ou);var An=(r,t=r)=>C`
  :host {
    align-items: baseline;
    column-gap: var(--vaadin-${z(t)}-gap, var(--vaadin-gap-s));
    grid-template: none;
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(auto-fill, minmax(0, max-content));
    -webkit-tap-highlight-color: transparent;
    --_cursor: var(--vaadin-clickable-cursor);
    --_marker-color: var(--vaadin-${z(t)}-marker-color, var(--vaadin-${z(t)}-background, var(--vaadin-background-color)));
    --_marker-filter: var(--vaadin-${z(t)}-marker-color, saturate(0) invert(1) hue-rotate(180deg) contrast(100) brightness(100));
  }

  :host(:not([has-label])) {
    column-gap: 0;
  }

  [part='${z(r)}'],
  ::slotted(input),
  [part='label'],
  ::slotted(label) {
    grid-row: 1;
  }

  [part='label'],
  ::slotted(label) {
    font-size: var(--vaadin-${z(t)}-label-font-size, var(--vaadin-input-field-label-font-size, inherit));
    line-height: var(--vaadin-${z(t)}-label-line-height, var(--vaadin-input-field-label-line-height, inherit));
    font-weight: var(--vaadin-${z(t)}-label-font-weight, var(--vaadin-input-field-label-font-weight, 500));
    color: var(--vaadin-${z(t)}-label-color, var(--vaadin-input-field-label-color, var(--vaadin-text-color)));
    word-break: break-word;
    cursor: var(--_cursor);
  }

  [part='${z(r)}'],
  ::slotted(input) {
    grid-column: 1;
  }

  [part='label'],
  [part='helper-text'],
  [part='error-message'] {
    margin-bottom: 0;
    grid-column: 2;
    width: auto;
    min-width: auto;
  }

  [part='helper-text'],
  [part='error-message'] {
    margin-top: var(--_gap-s);
    grid-row: auto;
  }

  /* Baseline vertical alignment */
  :host::before {
    grid-row: 1;
    margin: 0;
    padding: 0;
    border: 0;
  }

  /* visually hidden */
  ::slotted(input) {
    cursor: inherit;
    align-self: stretch;
    appearance: none;
    cursor: var(--_cursor);
    /* Override 16px from iOS UA stylesheet and CSS resets */
    width: auto !important;
    height: auto !important;
    /* Ensure minimum click target (WCAG) */
    margin: min(0px, (24px - 100%) / -2) !important;
    /* Extend the input to cover the gap between the checkbox/radio and label */
    margin-inline-end: calc(min(0px, (24px - 100%) / -2) - var(--vaadin-${z(t)}-gap, var(--vaadin-gap-s))) !important;
  }

  /* Control container (checkbox, radio button) */
  [part='${z(r)}'] {
    background: var(--vaadin-${z(t)}-background, var(--vaadin-background-color));
    border-color: var(--vaadin-${z(t)}-border-color, var(--vaadin-input-field-border-color, var(--vaadin-border-color)));
    border-radius: var(--vaadin-${z(t)}-border-radius, var(--vaadin-radius-s));
    border-style: var(--_border-style, solid);
    --_border-width: var(--vaadin-${z(t)}-border-width, var(--vaadin-input-field-border-width, 1px));
    border-width: var(--_border-width);
    box-sizing: border-box;
    color: var(--_marker-color);
    height: var(--vaadin-${z(t)}-size, round(1.125em, 2px));
    width: var(--vaadin-${z(t)}-size, round(1.125em, 2px));
    position: relative;
    cursor: var(--_cursor);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host(:is([checked], [indeterminate])) {
    --vaadin-${z(t)}-background: var(--vaadin-text-color);
    --vaadin-${z(t)}-border-color: transparent;
  }

  :host([readonly]) {
    --vaadin-${z(r)}-background: transparent;
    --vaadin-${z(r)}-border-color: var(--vaadin-border-color);
    --vaadin-${z(r)}-marker-color: var(--vaadin-text-color);
    --_border-style: dashed;
    --_cursor: var(--vaadin-disabled-cursor);

    [part='label'],
    ::slotted(label) {
      cursor: default;
    }
  }

  :host([disabled]) {
    --vaadin-${z(t)}-background: var(--vaadin-input-field-disabled-background, var(--vaadin-background-container-strong));
    --vaadin-${z(t)}-border-color: transparent;
    --vaadin-${z(t)}-marker-color: var(--vaadin-text-color-disabled);
    --_cursor: var(--vaadin-disabled-cursor);
  }

  /* Focus ring */
  :host([focus-ring]) [part='${z(r)}'] {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--_border-width) * -1);
  }

  :host([focus-ring]:is([checked], [indeterminate])) [part='${z(r)}'] {
    outline-offset: 1px;
  }

  :host([readonly][focus-ring]) [part='${z(r)}'] {
    --vaadin-${z(t)}-border-color: transparent;
    outline-offset: calc(var(--_border-width) * -1);
    outline-style: dashed;
  }

  /* Checked indicator (checkmark, dot) */
  [part='${z(r)}']::after {
    content: '\\2003' / '';
    background: currentColor;
    border-radius: inherit;
    display: flex;
    align-items: center;
    filter: var(--_marker-filter);
  }

  :host(:not([checked], [indeterminate])) [part='${z(r)}']::after {
    opacity: 0;
  }

  /* Reverse variant */
  :host([theme~='reverse']) {
    grid-template-columns: 1fr auto;

    &::before {
      display: none;
    }

    [part='label'],
    [part='helper-text'],
    [part='error-message'] {
      grid-column: 1;
    }

    [part='${z(r)}'],
    ::slotted(input) {
      grid-column: 2;
    }

    ::slotted(input) {
      margin-inline: calc(min(0px, (24px - 100%) / -2) - var(--vaadin-${z(t)}-gap, var(--vaadin-gap-s))) 0 !important;
    }
  }

  @media (forced-colors: active) {
    :host(:is([checked], [indeterminate])) {
      --vaadin-${z(t)}-border-color: CanvasText !important;
    }

    :host(:is([checked], [indeterminate])) [part='${z(r)}'] {
      background: SelectedItem !important;
    }

    :host(:is([checked], [indeterminate])) [part='${z(r)}']::after {
      background: SelectedItemText !important;
    }

    :host([readonly]) [part='${z(r)}']::after {
      background: CanvasText !important;
    }

    :host([disabled]) {
      --vaadin-${z(t)}-border-color: GrayText !important;
    }

    :host([disabled]) [part='${z(r)}']::after {
      background: GrayText !important;
    }
  }
`;var wt=C`
  :host {
    --_helper-below-field: initial;
    --_helper-above-field: ;
    --_no-helper: initial;
    --_has-helper: ;
    --_no-error: initial;
    --_has-error: ;
    --_gap: var(--vaadin-input-field-container-gap, var(--vaadin-gap-xs));
    --_gap-s: round(var(--_gap) / 3, 2px);
    display: inline-grid;
    grid-template:
      'label' auto var(--_helper-above-field, 'helper' auto) 'baseline' 0 'input' 1fr var(
        --_helper-below-field,
        'helper' auto
      )
      'error' auto / 100%;
    height: fit-content;
    outline: none;
    cursor: default;
    -webkit-tap-highlight-color: transparent;
  }

  :host([has-helper]) {
    --_has-helper: initial;
    --_no-helper: ;
  }

  :host([has-error-message]) {
    --_has-error: initial;
    --_no-error: ;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:not([has-label])) [part='label'],
  :host(:not([has-helper])) [part='helper-text'],
  :host(:not([has-error-message])) [part='error-message'] {
    display: none;
  }

  /* Baseline alignment guide */
  :host::before {
    content: '\\2003' / '';
    grid-column: 1;
    grid-row: 1 / baseline;
    align-self: end;
    font-size: var(--vaadin-input-field-value-font-size, inherit);
    line-height: var(--vaadin-input-field-value-line-height, inherit);
    padding: var(
      --vaadin-input-field-padding,
      var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container)
    );
    border: var(--vaadin-input-field-border-width, 1px) solid transparent;
    pointer-events: none;
    margin-bottom: calc(
      var(
          --vaadin-field-baseline-input-height,
          (1lh + var(--vaadin-padding-block-container) * 2 + var(--vaadin-input-field-border-width, 1px) * 2)
        ) *
        -1
    );
  }

  [class$='container'] {
    display: contents;
  }

  [part] {
    grid-column: 1;
  }

  [part='label'] {
    font-size: var(--vaadin-input-field-label-font-size, inherit);
    line-height: var(--vaadin-input-field-label-line-height, inherit);
    font-weight: var(--vaadin-input-field-label-font-weight, 500);
    color: var(--vaadin-input-field-label-color, var(--vaadin-text-color));
    word-break: break-word;
    position: relative;
    grid-area: label;
    margin-bottom: var(--_helper-below-field, var(--_gap)) var(--_helper-above-field, var(--_no-helper, var(--_gap)));
  }

  ::slotted(label) {
    cursor: inherit;
  }

  :host([disabled]) [part='label'],
  :host([disabled]) ::slotted(label) {
    opacity: 0.5;
  }

  :host([disabled]) [part='label'] ::slotted(label) {
    opacity: 1;
  }

  :host([required]) [part='label'] {
    padding-inline-end: 1em;
  }

  [part='required-indicator'] {
    display: inline-block;
    position: absolute;
    width: 1em;
    text-align: center;
    color: var(--vaadin-input-field-required-indicator-color, var(--vaadin-text-color-secondary));
  }

  [part='required-indicator']::after {
    content: var(--vaadin-input-field-required-indicator, '*');
  }

  :host(:not([required])) [part='required-indicator'] {
    display: none;
  }

  [part='label'],
  [part='helper-text'],
  [part='error-message'] {
    width: min-content;
    min-width: 100%;
    box-sizing: border-box;
  }

  [part='input-field'],
  [part='group-field'],
  [part='input-fields'] {
    grid-area: input;
  }

  [part='input-field'] {
    width: var(--vaadin-field-default-width, 12em);
    max-width: 100%;
    min-width: 100%;
  }

  :host([readonly]) [part='input-field'] {
    cursor: default;
  }

  :host([disabled]) [part='input-field'] {
    cursor: var(--vaadin-disabled-cursor);
  }

  [part='helper-text'] {
    font-size: var(--vaadin-input-field-helper-font-size, inherit);
    line-height: var(--vaadin-input-field-helper-line-height, inherit);
    font-weight: var(--vaadin-input-field-helper-font-weight, 400);
    color: var(--vaadin-input-field-helper-color, var(--vaadin-text-color-secondary));
    grid-area: helper;
    margin-top: var(--_helper-above-field, var(--_gap-s)) var(--_helper-below-field, var(--_gap));
    margin-bottom: var(--_helper-above-field, var(--_gap));
  }

  [part='error-message'] {
    font-size: var(--vaadin-input-field-error-font-size, inherit);
    line-height: var(--vaadin-input-field-error-line-height, inherit);
    font-weight: var(--vaadin-input-field-error-font-weight, 400);
    color: var(--vaadin-input-field-error-color, var(--vaadin-text-color));
    display: flex;
    gap: var(--vaadin-gap-xs);
    grid-area: error;
    margin-top: var(--_has-helper, var(--_helper-below-field, var(--_gap-s)) var(--_helper-above-field, var(--_gap)))
      var(--_no-helper, var(--_gap));
  }

  [part='error-message']::before {
    content: '';
    display: inline-block;
    flex: none;
    width: var(--vaadin-icon-size, 1lh);
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-warn) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    background: currentColor;
  }

  :host([theme~='helper-above-field']) {
    --_helper-above-field: initial;
    --_helper-below-field: ;
  }

  @media (forced-colors: active) {
    [part='error-message']::before {
      background: CanvasText;
    }
  }
`;var ob=C`
  [part='checkbox'] {
    color: var(--vaadin-checkbox-checkmark-color, var(--_marker-color));
  }

  [part='checkbox']::after {
    inset: 0;
    mask: var(--_vaadin-icon-checkmark) 50% /
      var(--vaadin-checkbox-checkmark-size, var(--vaadin-checkbox-marker-size, 100%)) no-repeat;
    filter: var(--vaadin-checkbox-checkmark-color, var(--_marker-filter));
  }

  :host([indeterminate]) [part='checkbox']::after {
    mask-image: var(--_vaadin-icon-minus);
  }
`,Du=[wt,An("checkbox"),ob];var ab=r=>class extends Me(Mn(r)){static get properties(){return{autofocus:{type:Boolean},focusElement:{type:Object,readOnly:!0,observer:"_focusElementChanged",sync:!0},_lastTabIndex:{value:0}}}constructor(){super(),this._boundOnBlur=this._onBlur.bind(this),this._boundOnFocus=this._onFocus.bind(this)}ready(){super.ready(),this.autofocus&&!this.disabled&&requestAnimationFrame(()=>{this.focus()})}focus(e){if(this.focusElement&&!this.disabled){if(this.focusElement.focus({preventScroll:!!e?.preventScroll}),!Pe(this.focusElement))return;e?.focusVisible!==!1&&this.setAttribute("focus-ring","")}}blur(){this.focusElement&&this.focusElement.blur()}click(){this.focusElement&&!this.disabled&&this.focusElement.click()}_focusElementChanged(e,i){e?(e.disabled=this.disabled,this._addFocusListeners(e),this.__forwardTabIndex(this.tabindex)):i&&this._removeFocusListeners(i)}_addFocusListeners(e){e.addEventListener("blur",this._boundOnBlur),e.addEventListener("focus",this._boundOnFocus)}_removeFocusListeners(e){e.removeEventListener("blur",this._boundOnBlur),e.removeEventListener("focus",this._boundOnFocus)}_onFocus(e){e.stopPropagation(),this.dispatchEvent(new Event("focus"))}_onBlur(e){e.stopPropagation(),this.dispatchEvent(new Event("blur"))}_shouldSetFocus(e){return e.target===this.focusElement}_shouldRemoveFocus(e){return e.target===this.focusElement}_disabledChanged(e,i){super._disabledChanged(e,i),this.focusElement&&(this.focusElement.disabled=e),e&&this.blur()}_tabindexChanged(e){this.__forwardTabIndex(e)}__forwardTabIndex(e){e!==void 0&&this.focusElement&&(this.focusElement.tabIndex=e,e!==-1&&(this.tabindex=void 0)),this.disabled&&e&&(e!==-1&&(this._lastTabIndex=e),this.tabindex=void 0),e===void 0&&this.hasAttribute("tabindex")&&this.removeAttribute("tabindex")}},Ct=ge(ab);var al=new WeakMap;function lb(r){return al.has(r)||al.set(r,new Set),al.get(r)}function db(r,t){let e=document.createElement("style");e.textContent=r,t===document?document.head.appendChild(e):t.insertBefore(e,t.firstChild)}var hb=r=>class extends r{get slotStyles(){return[]}connectedCallback(){super.connectedCallback(),this.__applySlotStyles()}__applySlotStyles(){let e=this.getRootNode(),i=lb(e);this.slotStyles.forEach(s=>{i.has(s)||(db(s,e),i.add(s))})}},dr=ge(hb);var ub=r=>class extends r{static get properties(){return{stateTarget:{type:Object,observer:"_stateTargetChanged"}}}static get delegateAttrs(){return[]}static get delegateProps(){return[]}ready(){super.ready(),this._createDelegateAttrsObserver(),this._createDelegatePropsObserver()}_stateTargetChanged(e){e&&(this._ensureAttrsDelegated(),this._ensurePropsDelegated())}_createDelegateAttrsObserver(){this._createMethodObserver(`_delegateAttrsChanged(${this.constructor.delegateAttrs.join(", ")})`)}_createDelegatePropsObserver(){this._createMethodObserver(`_delegatePropsChanged(${this.constructor.delegateProps.join(", ")})`)}_ensureAttrsDelegated(){this.constructor.delegateAttrs.forEach(e=>{this._delegateAttribute(e,this[e])})}_ensurePropsDelegated(){this.constructor.delegateProps.forEach(e=>{this._delegateProperty(e,this[e])})}_delegateAttrsChanged(...e){this.constructor.delegateAttrs.forEach((i,s)=>{this._delegateAttribute(i,e[s])})}_delegatePropsChanged(...e){this.constructor.delegateProps.forEach((i,s)=>{this._delegateProperty(i,e[s])})}_delegateAttribute(e,i){this.stateTarget&&(e==="invalid"&&this._delegateAttribute("aria-invalid",i?"true":!1),typeof i=="boolean"?this.stateTarget.toggleAttribute(e,i):Y(this.stateTarget,e,i))}_delegateProperty(e,i){this.stateTarget&&(this.stateTarget[e]=i)}},hr=ge(ub);var cb=r=>class extends r{static get properties(){return{inputElement:{type:Object,readOnly:!0,observer:"_inputElementChanged",sync:!0},type:{type:String,readOnly:!0},value:{type:String,value:"",observer:"_valueChanged",notify:!0,sync:!0}}}constructor(){super(),this._boundOnInput=this._onInput.bind(this),this._boundOnChange=this._onChange.bind(this)}get _hasValue(){return this.value!=null&&this.value!==""}get _inputElementValueProperty(){return"value"}get _inputElementValue(){return this.inputElement?this.inputElement[this._inputElementValueProperty]:void 0}set _inputElementValue(e){this.inputElement&&(this.inputElement[this._inputElementValueProperty]=e)}clear(){this.value="",this._inputElementValue=""}_addInputListeners(e){e.addEventListener("input",this._boundOnInput),e.addEventListener("change",this._boundOnChange)}_removeInputListeners(e){e.removeEventListener("input",this._boundOnInput),e.removeEventListener("change",this._boundOnChange)}_forwardInputValue(e){this.inputElement&&(this._inputElementValue=e??"")}_inputElementChanged(e,i){e?this._addInputListeners(e):i&&this._removeInputListeners(i)}_onInput(e){let i=e.composedPath()[0];this.__userInput=e.isTrusted,this.value=i.value,this.__userInput=!1}_onChange(e){}_toggleHasValue(e){this.toggleAttribute("has-value",e)}_valueChanged(e,i){this._toggleHasValue(this._hasValue),!(e===""&&i===void 0)&&(this.__userInput||this._forwardInputValue(e))}},ui=ge(cb);var Pn=r=>class extends hr(Fe(ui(r))){static get properties(){return{checked:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0,sync:!0}}}static get delegateProps(){return[...super.delegateProps,"checked"]}_onChange(e){let i=e.target;this._toggleChecked(i.checked)}_toggleChecked(e){this.checked=e}};var Ln=class{#e;#t=!1;#i;#r;#n;#s;#a;#o=[];#d=[];constructor(t){this.host=t}setTarget(t){this.#e=t,this.#h(),this.#u(),this.#l(),this.#c()}setRequired(t){this.#t=t,this.#c()}setLabel(t){this.#i=t,this.#h()}setLabelledBy(t){this.#r=t,this.#u()}setDescribedBy(t){this.#n=t,this.#l()}setErrorId(t){this.#s=t,this.#l()}setHelperId(t){this.#a=t,this.#l()}#h(){this.#e&&Y(this.#e,"aria-label",this.#i)}#u(){this.#e&&($a(this.#e,"aria-labelledby",this.#o),this.#o=[this.#r],Na(this.#e,"aria-labelledby",this.#o))}#l(){this.#e&&($a(this.#e,"aria-describedby",this.#d),this.#d=[this.#n,this.#a,this.#s],Na(this.#e,"aria-describedby",this.#d))}#c(){this.#e&&(["input","textarea"].includes(this.#e.localName)||Y(this.#e,"aria-required",this.#t))}};var vt=document.createElement("div");vt.style.position="fixed";vt.style.clip="rect(0px, 0px, 0px, 0px)";vt.setAttribute("aria-live","polite");document.body.appendChild(vt);var Rn;function ur(r,t={}){let e=t.mode||"polite",i=t.timeout??150;e==="alert"?(vt.removeAttribute("aria-live"),vt.removeAttribute("role"),Rn=ae.debounce(Rn,Ri,()=>{vt.setAttribute("role","alert")})):(Rn&&Rn.cancel(),vt.removeAttribute("role"),vt.setAttribute("aria-live",e)),vt.textContent="",setTimeout(()=>{vt.textContent=r},i)}var ci=class extends ie{#e;constructor(t,e,i,s={}){super(t,e,i,{...s,useUniqueId:!0})}initCustomNode(t){this.#t(t),this._notifyChange(t)}teardownNode(t){let e=this.getSlotChild();e&&e!==this.defaultNode?this._notifyChange(e):(this.restoreDefaultNode(),this.updateDefaultNode(this.node))}attachDefaultNode(){let t=super.attachDefaultNode();return t&&this.#t(t),t}restoreDefaultNode(){}updateDefaultNode(t){this._notifyChange(t)}observeNode(t){this.#e&&this.#e.disconnect(),this.#e=new MutationObserver(e=>{e.forEach(i=>{let s=i.target,n=s===this.node;i.type==="attributes"?n&&this.#t(s):(n||s.parentElement===this.node)&&this._notifyChange(this.node)})}),this.#e.observe(t,{attributes:!0,attributeFilter:["id"],childList:!0,subtree:!0,characterData:!0})}_notifyChange(t){this.dispatchEvent(new CustomEvent("slot-content-changed",{detail:{hasContent:jh(t),node:t}}))}#t(t){let e=!this.nodes||t===this.nodes[0];t.nodeType===Node.ELEMENT_NODE&&(!this.multiple||e)&&!t.id&&(t.id=this.defaultId)}};var Nn=class extends ci{constructor(t){super(t,"error-message","div")}setErrorMessage(t){this.errorMessage=t,this.updateDefaultNode(this.node)}setInvalid(t){this.invalid=t,this.updateDefaultNode(this.node)}initAddedNode(t){t!==this.defaultNode&&this.initCustomNode(t)}initNode(t){this.updateDefaultNode(t)}initCustomNode(t){t.textContent&&!this.errorMessage&&(this.errorMessage=t.textContent.trim()),super.initCustomNode(t)}restoreDefaultNode(){this.attachDefaultNode()}updateDefaultNode(t){let{errorMessage:e,invalid:i}=this,s=!!(i&&e&&e.trim()!=="");t&&(t.textContent=s?e:"",t.hidden=!s,s&&ur(e,{mode:"assertive"})),super.updateDefaultNode(t)}};var $n=class extends ci{constructor(t){super(t,"helper",null)}setHelperText(t){this.helperText=t,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){let{helperText:t}=this;if(t&&t.trim()!==""){this.tagName="div";let e=this.attachDefaultNode();this.observeNode(e)}}updateDefaultNode(t){t&&(t.textContent=this.helperText),super.updateDefaultNode(t)}initCustomNode(t){super.initCustomNode(t),this.observeNode(t)}};var cr=class extends ci{constructor(t){super(t,"label","label")}setLabel(t){this.label=t,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){let{label:t}=this;if(t&&t.trim()!==""){let e=this.attachDefaultNode();this.observeNode(e)}}updateDefaultNode(t){t&&(t.textContent=this.label),super.updateDefaultNode(t)}initCustomNode(t){super.initCustomNode(t),this.observeNode(t)}};var Fn=r=>class extends r{static get properties(){return{label:{type:String,observer:"_labelChanged"}}}constructor(){super(),this._labelController=new cr(this),this._labelController.addEventListener("slot-content-changed",e=>{this.toggleAttribute("has-label",e.detail.hasContent)})}get _labelId(){return this._labelNode?.id}get _labelNode(){return this._labelController.node}ready(){super.ready(),this.addController(this._labelController)}_labelChanged(e){this._labelController.setLabel(e)}};var fb=r=>class extends r{static get properties(){return{invalid:{type:Boolean,reflectToAttribute:!0,notify:!0,value:!1,sync:!0},manualValidation:{type:Boolean,value:!1},required:{type:Boolean,reflectToAttribute:!0,sync:!0}}}validate(){let t=this.checkValidity();return this._setInvalid(!t),this.dispatchEvent(new CustomEvent("validated",{detail:{valid:t}})),t}checkValidity(){return!this.required||!!this.value}_setInvalid(t){this._shouldSetInvalid(t)&&(this.invalid=t)}_shouldSetInvalid(t){return!0}_requestValidation(){this.manualValidation||this.validate()}},Bn=ge(fb);var dt=r=>class extends Bn(Fn(r)){static get properties(){return{ariaTarget:{type:Object},errorMessage:{type:String},helperText:{type:String},accessibleName:{type:String},accessibleNameRef:{type:String},accessibleDescriptionRef:{type:String}}}constructor(){super(),this._labelController.addEventListener("slot-content-changed",e=>{this.#e(e)}),this._helperController=new $n(this),this._helperController.addEventListener("slot-content-changed",e=>{this.#t(e)}),this._errorController=new Nn(this),this._errorController.addEventListener("slot-content-changed",e=>{this.#i(e)}),this._fieldAriaController=new Ln(this)}get _errorNode(){return this._errorController.node}get _helperNode(){return this._helperController.node}ready(){super.ready(),this.addController(this._fieldAriaController),this.addController(this._helperController),this.addController(this._errorController)}updated(e){super.updated(e),e.has("invalid")&&this._errorController.setInvalid(this.invalid),e.has("errorMessage")&&this._errorController.setErrorMessage(this.errorMessage),e.has("helperText")&&this._helperController.setHelperText(this.helperText),e.has("ariaTarget")&&this._fieldAriaController.setTarget(this.ariaTarget),e.has("required")&&this._fieldAriaController.setRequired(this.required),e.has("accessibleName")&&this.__updateFieldAriaControllerLabel(),(e.has("accessibleName")||e.has("accessibleNameRef"))&&this.__updateFieldAriaControllerLabelledBy(),e.has("accessibleDescriptionRef")&&this.__updateFieldAriaControllerDescribedBy()}__updateFieldAriaControllerLabel(){this._fieldAriaController.setLabel(this.accessibleName)}__updateFieldAriaControllerLabelledBy(){let e=null;this.accessibleNameRef?e=this.accessibleNameRef:this.hasAttribute("has-label")&&!this.accessibleName&&(e=this._labelNode?.id),this._fieldAriaController.setLabelledBy(e)}__updateFieldAriaControllerDescribedBy(){this._fieldAriaController.setDescribedBy(this.accessibleDescriptionRef)}#e(e){this.__updateFieldAriaControllerLabelledBy()}#t(e){let{hasContent:i}=e.detail;this.toggleAttribute("has-helper",i),i?this._fieldAriaController.setHelperId(this._helperNode?.id):this._fieldAriaController.setHelperId(null)}#i(e){this.toggleAttribute("has-error-message",e.detail.hasContent),setTimeout(()=>{this.invalid?this._fieldAriaController.setErrorId(this._errorNode?.id):this._fieldAriaController.setErrorId(null)})}};var Ve=class extends ie{constructor(t,e,i={}){let{uniqueIdPrefix:s}=i;super(t,"input","input",{initializer:(n,a)=>{a.value&&(n.value=a.value),a.type&&n.setAttribute("type",a.type),n.id=this.defaultId,typeof e=="function"&&e(n)},useUniqueId:!0,uniqueIdPrefix:s})}};var Ie=class{constructor(t,e){this.input=t,e.addEventListener("slot-content-changed",i=>{this.#e(i.detail.node)}),this.#e(e.node)}#e(t){t&&(t.addEventListener("click",this.#t),this.input&&t.setAttribute("for",this.input.id))}#t=()=>{let t=e=>{e.stopImmediatePropagation(),this.input.removeEventListener("click",t)};this.input.addEventListener("click",t)}};var Mu=r=>class extends dr(dt(Pn(Ct(hi(r))))){static get properties(){return{name:{type:String,value:""},readonly:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["__readonlyChanged(readonly, inputElement)"]}static get delegateAttrs(){return[...super.delegateAttrs,"name","invalid","required"]}constructor(){super(),this._setType("checkbox"),this._boundOnInputClick=this._onInputClick.bind(this),this.value="on",this.tabindex=0}get slotStyles(){return[`
          ${this.localName} > input[slot='input'] {
            opacity: 0;
          }
        `]}ready(){super.ready(),this.addController(new Ve(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new Ie(this.inputElement,this._labelController)),this._createPropertyObserver("checked","_checkedChanged")}updated(e){super.updated(e),e.has("required")&&this.required===!1&&this._requestValidation()}_shouldSetActive(e){let[i]=e.composedPath(),s=i===this.inputElement||i.part.contains("required-indicator")||this._labelNode?.contains(i)&&!i.closest("a");return this.readonly||!s?!1:super._shouldSetActive(e)}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("click",this._boundOnInputClick)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("click",this._boundOnInputClick)}_onInputClick(e){this.readonly&&e.preventDefault()}__readonlyChanged(e,i){i&&Y(i,"aria-readonly",e)}checkValidity(){return!this.required||!!this.checked}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}_checkedChanged(e,i){(e||i)&&this._requestValidation()}_onRequiredIndicatorClick(){this._labelNode?.click()}};var yt=class extends Mu(K(I(O(A(S))))){static get is(){return"vaadin-checkbox"}static get styles(){return Du}static get properties(){return{indeterminate:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0}}}static get delegateProps(){return[...super.delegateProps,"indeterminate"]}render(){return w`
      <div class="vaadin-checkbox-container">
        <div part="checkbox" aria-hidden="true"></div>
        <slot name="input"></slot>
        <div part="label">
          <slot name="label"></slot>
          <div part="required-indicator" @click="${this._onRequiredIndicatorClick}"></div>
        </div>
        <div part="helper-text">
          <slot name="helper"></slot>
        </div>
        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>
      <slot name="tooltip"></slot>
    `}ready(){super.ready(),this._tooltipController=new ue(this),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}_toggleChecked(t){this.indeterminate&&(this.indeterminate=!1),super._toggleChecked(t)}};E(yt);var pb=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},Iu=class extends yt{};Iu=pb([q("or-vaadin-checkbox")],Iu);var Vn=C`
  [part='label'],
  [part='helper-text'],
  [part='error-message'] {
    width: auto;
    min-width: auto;
  }

  [part='group-field'] {
    display: flex;
    flex-direction: column;
    gap: var(--vaadin-gap-xs) var(--vaadin-gap-xl);
  }

  :host([theme~='horizontal']) [part='group-field'] {
    flex-flow: row wrap;
    align-items: center;
    padding-block: var(--vaadin-padding-block-container);
    border-block: var(--vaadin-input-field-border-width, 1px) solid transparent;
  }
`;var Au=[wt,Vn];var Pu=r=>class extends dt(Me(Fe(r))){static get properties(){return{value:{type:Array,value:()=>[],notify:!0,sync:!0,observer:"__valueChanged"},readonly:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"__readonlyChanged"}}}constructor(){super(),this.__registerCheckbox=this.__registerCheckbox.bind(this),this.__unregisterCheckbox=this.__unregisterCheckbox.bind(this),this.__onCheckboxCheckedChanged=this.__onCheckboxCheckedChanged.bind(this),this._tooltipController=new ue(this),this._tooltipController.addEventListener("tooltip-changed",e=>{if(e.detail.node?.isConnected){let s=this.__checkboxes.map(n=>n.inputElement);this._tooltipController.setAriaTarget(s)}else this._tooltipController.setAriaTarget([])})}get __checkboxes(){return this.__filterCheckboxes([...this.children])}ready(){super.ready(),this.ariaTarget=this,this.setAttribute("role","group");let e=this.shadowRoot.querySelector("slot:not([name])");this._observer=new $e(e,({addedNodes:i,removedNodes:s})=>{let n=this.__filterCheckboxes(i),a=this.__filterCheckboxes(s);n.forEach(this.__registerCheckbox),a.forEach(this.__unregisterCheckbox);let d=this.__checkboxes.map(c=>c.inputElement);this._tooltipController.setAriaTarget(d),this.__warnOfCheckboxesWithoutValue(n)}),this.addController(this._tooltipController)}checkValidity(){return!this.required||!!(this.value&&this.value.length>0)}__filterCheckboxes(e){return e.filter(i=>i instanceof yt)}__warnOfCheckboxesWithoutValue(e){e.some(s=>{let{value:n}=s;return!s.hasAttribute("value")&&(!n||n==="on")})&&console.warn("Please provide the value attribute to all the checkboxes inside the checkbox group.")}__registerCheckbox(e){e.addEventListener("checked-changed",this.__onCheckboxCheckedChanged),this.disabled&&(e.disabled=!0),this.readonly&&(e.readonly=!0),e.checked?this.__addCheckboxToValue(e.value):this.value&&this.value.includes(e.value)&&(e.checked=!0)}__unregisterCheckbox(e){e.removeEventListener("checked-changed",this.__onCheckboxCheckedChanged),e.checked&&this.__removeCheckboxFromValue(e.value)}_disabledChanged(e,i){super._disabledChanged(e,i),!(!e&&i===void 0)&&i!==e&&this.__checkboxes.forEach(s=>{s.disabled=e})}__addCheckboxToValue(e){this.value?this.value.includes(e)||(this.value=[...this.value,e]):this.value=[e]}__removeCheckboxFromValue(e){this.value&&this.value.includes(e)&&(this.value=this.value.filter(i=>i!==e))}__onCheckboxCheckedChanged(e){let i=e.target;i.checked?this.__addCheckboxToValue(i.value):this.__removeCheckboxFromValue(i.value)}__valueChanged(e,i){e?.length===0&&i===void 0||(this.toggleAttribute("has-value",e?.length>0),this.__checkboxes.forEach(s=>{s.checked=e?.includes(s.value)}),i!==void 0&&this._requestValidation())}__readonlyChanged(e,i){(e||i)&&this.__checkboxes.forEach(s=>{s.readonly=e})}_shouldRemoveFocus(e){return!this.contains(e.relatedTarget)}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}};var is=class extends Pu(K(I(O(A(S))))){static get is(){return"vaadin-checkbox-group"}static get styles(){return Au}render(){return w`
      <div class="vaadin-group-field-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true"></span>
        </div>

        <div part="group-field">
          <slot></slot>
        </div>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <slot name="tooltip"></slot>
    `}};E(is);var mb=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},Lu=class extends is{__filterCheckboxes(r){return r.filter(t=>t instanceof yt)}};Lu=mb([q("or-vaadin-checkbox-group")],Lu);var zn=r=>r.test(navigator.userAgent),ll=r=>r.test(navigator.platform),_b=r=>r.test(navigator.vendor),Ru=zn(/Android/u),JE=zn(/Chrome/u)&&_b(/Google Inc/u),QE=zn(/Firefox/u),gb=ll(/^iPad/u)||ll(/^Mac/u)&&navigator.maxTouchPoints>1,vb=ll(/^iPhone/u),fi=vb||gb,Nu=zn(/^((?!chrome|android).)*safari/iu),Zt=(()=>{try{return document.createEvent("TouchEvent"),!0}catch{return!1}})();var yb=new WeakSet;function $u(r){yb.add(r)}var Yn=class{saveFocus(t){this.focusNode=t||Kt()}restoreFocus(t){let e=this.focusNode;if(!e)return;let i={preventScroll:t?t.preventScroll:!1,focusVisible:t?t.focusVisible:!1};Kt()===document.body?setTimeout(()=>e.focus(i)):e.focus(i),this.focusNode=null}};var dl=[];var Un=class{trapNode=null;constructor(t){this.host=t}get#e(){return Dn(this.trapNode)}get#t(){let t=this.#e;return t.indexOf(t.filter(Pe).pop())}hostConnected(){document.addEventListener("keydown",this.#i)}hostDisconnected(){document.removeEventListener("keydown",this.#i)}trapFocus(t){if(this.trapNode=t,this.#e.length===0)throw this.trapNode=null,new Error("The trap node should have at least one focusable descendant or be focusable itself.");dl.push(this),this.#t===-1&&this.#e[0].focus({focusVisible:ce()})}releaseFocus(){this.trapNode=null,dl.pop()}#i=t=>{if(this.trapNode&&this===Array.from(dl).pop()&&t.key==="Tab"){if(t.defaultPrevented)return;t.preventDefault();let e=t.shiftKey;this.#r(e)}};#r(t=!1){let e=this.#e,i=t?-1:1,s=this.#t,n=(e.length+s+i)%e.length,a=e[n];a.focus({focusVisible:!0}),a.localName==="input"&&a.select()}};var jn=r=>class extends r{static get properties(){return{focusTrap:{type:Boolean,value:!1},autofocus:{type:Boolean,value:!1},restoreFocusOnClose:{type:Boolean,value:!1},restoreFocusNode:{type:HTMLElement}}}static get manageFocus(){return!0}constructor(){super(),this.__manageFocus=this.constructor.manageFocus,this.__manageFocus&&(this.__focusTrapController=new Un(this),this.__focusRestorationController=new Yn)}get _contentRoot(){return this}ready(){super.ready(),this.__manageFocus&&(this.addController(this.__focusTrapController),this.addController(this.__focusRestorationController))}get _focusRoot(){return this.$.overlay}_resetFocus(){if(this.__manageFocus&&(this.focusTrap&&this.__focusTrapController.releaseFocus(),this.restoreFocusOnClose&&this._shouldRestoreFocus())){let e=ce(),i=!e;this.__focusRestorationController.restoreFocus({preventScroll:i,focusVisible:e})}}_saveFocus(){this.__manageFocus&&this.restoreFocusOnClose&&this.__focusRestorationController.saveFocus(this.restoreFocusNode)}_initFocus(){if(!this.__manageFocus||Gt(this._focusRoot))return;let e=Dn(this._focusRoot);e.some(Pe)||(e.find(s=>this.#e(s))??(this.autofocus?e[0]:null))?.focus({focusVisible:ce()}),this.focusTrap&&this.__focusTrapController.trapFocus(this._focusRoot)}_shouldRestoreFocus(){let e=Kt();return e===document.body||this._deepContains(e)}_deepContains(e){if(this._contentRoot.contains(e))return!0;let i=e,s=e.ownerDocument;for(;i&&i!==s&&i!==this._contentRoot;)i=i.parentNode||i.host;return i===this._contentRoot}#e(e){let i=this._focusRoot,s=e;for(;s&&s!==i&&s!==this;){if(s.autofocus&&(s===e||customElements.get(s.localName)))return!0;s=s.assignedSlot||s.parentNode||s.host}return!1}};var Hn=new Set,Wn=()=>[...Hn].filter(r=>!r.hasAttribute("closing")),hl=r=>{let t=Wn(),e=t.indexOf(r);return e===-1?[]:t.slice(e+1)},ul=(r,t)=>r._deepContains(t),Fu=(r,t=e=>!0)=>{let e=Wn().filter(t);return r===e.pop()},Bu=r=>class extends r{get _last(){return Fu(this)}get _isAttached(){return Hn.has(this)}bringToFront(){if(Fu(this))return;let e=hl(this),i=e.filter(s=>s._hasOverlayPositionMixin&&ul(this,s));i.length!==e.length&&[this,...i].forEach(s=>{s.matches(":popover-open")&&(s.hidePopover(),s.showPopover()),s._removeAttachedInstance(),s._appendAttachedInstance()})}_enterModalState(){document.body.style.pointerEvents!=="none"&&(this._previousDocumentPointerEvents=document.body.style.pointerEvents,document.body.style.pointerEvents="none"),Wn().forEach(e=>{e!==this&&e.toggleAttribute("suppressed",!0)})}_exitModalState(){this._previousDocumentPointerEvents!==void 0&&(document.body.style.pointerEvents=this._previousDocumentPointerEvents,delete this._previousDocumentPointerEvents);let e=Wn(),i;for(;(i=e.pop())&&!(i!==this&&(i.toggleAttribute("suppressed",!1),!i.modeless)););}_appendAttachedInstance(){Hn.add(this)}_removeAttachedInstance(){this._isAttached&&Hn.delete(this)}};function Vu(r,t){let e=null,i,s=document.documentElement;function n(){i&&clearTimeout(i),e?.disconnect(),e=null}function a(d=!1,c=1){n();let{left:f,top:m,width:_,height:v}=r.getBoundingClientRect();if(d||t(),!_||!v)return;let b=Math.floor(m),y=Math.floor(s.clientWidth-(f+_)),T=Math.floor(s.clientHeight-(m+v)),N=Math.floor(f),B={rootMargin:`${-b}px ${-y}px ${-T}px ${-N}px`,threshold:Math.max(0,Math.min(1,c))||1},ne=!0;function se(ye){let ee=ye[0].intersectionRatio;if(ee!==c){if(!ne)return a();ee?a(!1,ee):i=setTimeout(()=>{a(!1,1e-7)},1e3)}ne=!1}e=new IntersectionObserver(se,B),e.observe(r)}return a(!0),n}function zu(r){return r.getAnimations().filter(t=>t instanceof CSSAnimation&&t.effect.getComputedTiming().activeDuration>0)}function ve(r,t,e){let i=[r];r.owner&&i.push(r.owner),typeof e=="string"?i.forEach(s=>{s.setAttribute(t,e)}):e?i.forEach(s=>{s.setAttribute(t,"")}):i.forEach(s=>{s.removeAttribute(t)})}var Ze=r=>class extends jn(Bu(r)){static get properties(){return{opened:{type:Boolean,notify:!0,observer:"_openedChanged",reflectToAttribute:!0,sync:!0},owner:{type:Object,sync:!0},model:{type:Object,sync:!0},renderer:{type:Object,sync:!0},modeless:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_modelessChanged",sync:!0},hidden:{type:Boolean,reflectToAttribute:!0,observer:"_hiddenChanged",sync:!0},withBackdrop:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_withBackdropChanged",sync:!0}}}static get observers(){return["_rendererOrDataChanged(renderer, owner, model, opened)"]}get _rendererRoot(){return this}constructor(){super(),this._boundMouseDownListener=this._mouseDownListener.bind(this),this._boundMouseUpListener=this._mouseUpListener.bind(this),this._boundOutsideClickListener=this._outsideClickListener.bind(this),this._boundKeydownListener=this._keydownListener.bind(this),fi&&(this._boundIosResizeListener=()=>this._detectIosNavbar())}firstUpdated(){super.firstUpdated(),this.popover="manual",this.addEventListener("click",()=>{}),this.$.backdrop&&this.$.backdrop.addEventListener("click",()=>{})}connectedCallback(){super.connectedCallback(),this._boundIosResizeListener&&(this._detectIosNavbar(),window.addEventListener("resize",this._boundIosResizeListener)),this.opened&&this._attachOverlay()}disconnectedCallback(){super.disconnectedCallback(),this.__scheduledOpen&&(cancelAnimationFrame(this.__scheduledOpen),this.__scheduledOpen=null),this._boundIosResizeListener&&window.removeEventListener("resize",this._boundIosResizeListener)}requestContentUpdate(){this.renderer&&this.renderer.call(this.owner,this._rendererRoot,this.owner,this.model)}close(e){let i=new CustomEvent("vaadin-overlay-close",{bubbles:!0,cancelable:!0,detail:{overlay:this,sourceEvent:e}});this.dispatchEvent(i),document.body.dispatchEvent(i),i.defaultPrevented||(this.opened=!1)}setBounds(e,i=!0){let s=this.$.overlay,n={...e};i&&s.style.position!=="absolute"&&(s.style.position="absolute"),Object.keys(n).forEach(a=>{n[a]!==null&&!isNaN(n[a])&&(n[a]=`${n[a]}px`)}),Object.assign(s.style,n)}_detectIosNavbar(){if(!this.opened)return;let e=window.innerHeight,s=window.innerWidth>e,n=document.documentElement.clientHeight;s&&n>e?this.style.setProperty("--vaadin-overlay-viewport-bottom",`${n-e}px`):this.style.setProperty("--vaadin-overlay-viewport-bottom","0px")}_shouldAddGlobalListeners(){return!this.modeless}_addGlobalListeners(){this.__hasGlobalListeners||(this.__hasGlobalListeners=!0,document.addEventListener("mousedown",this._boundMouseDownListener),document.addEventListener("mouseup",this._boundMouseUpListener),document.documentElement.addEventListener("click",this._boundOutsideClickListener,!0))}_removeGlobalListeners(){this.__hasGlobalListeners&&(this.__hasGlobalListeners=!1,document.removeEventListener("mousedown",this._boundMouseDownListener),document.removeEventListener("mouseup",this._boundMouseUpListener),document.documentElement.removeEventListener("click",this._boundOutsideClickListener,!0))}_rendererOrDataChanged(e,i,s,n){let a=this._oldOwner!==i||this._oldModel!==s;this._oldModel=s,this._oldOwner=i;let d=this._oldRenderer!==e,c=this._oldRenderer!==void 0;this._oldRenderer=e;let f=this._oldOpened!==n;this._oldOpened=n,d&&c&&(this._rendererRoot.innerHTML="",delete this._rendererRoot._$litPart$),n&&e&&(d||f||a)&&this.requestContentUpdate()}_modelessChanged(e){this.opened&&(this._shouldAddGlobalListeners()?this._addGlobalListeners():this._removeGlobalListeners()),e?this._exitModalState():this.opened&&this._enterModalState(),ve(this,"modeless",e)}_withBackdropChanged(e){ve(this,"with-backdrop",e)}_openedChanged(e,i){if(e){if(!this.isConnected){this.opened=!1;return}this._saveFocus(),this._animatedOpening(),this.__scheduledOpen=requestAnimationFrame(()=>{setTimeout(()=>{this._initFocus();let s=new CustomEvent("vaadin-overlay-open",{detail:{overlay:this},bubbles:!0});this.dispatchEvent(s),document.body.dispatchEvent(s)})}),document.addEventListener("keydown",this._boundKeydownListener),this._shouldAddGlobalListeners()&&this._addGlobalListeners()}else i&&(this.__scheduledOpen&&(cancelAnimationFrame(this.__scheduledOpen),this.__scheduledOpen=null),this._resetFocus(),this._animatedClosing(),document.removeEventListener("keydown",this._boundKeydownListener),this._shouldAddGlobalListeners()&&this._removeGlobalListeners())}_hiddenChanged(e){e&&this.hasAttribute("closing")&&this._flushAnimation("closing")}_enqueueAnimation(e,i){let s=zu(this);if(s.length===0){i();return}let n=`__${e}Handler`,a=()=>{this[n]===a&&(delete this[n],i())};this[n]=a,Promise.all(s.map(d=>d.finished)).then(a,a)}_flushAnimation(e){let i=`__${e}Handler`;typeof this[i]=="function"&&this[i]()}_animatedOpening(){this._isAttached&&this.hasAttribute("closing")&&this._flushAnimation("closing"),this._attachOverlay(),this._appendAttachedInstance(),this.modeless||this._enterModalState(),ve(this,"opening",!0),this._enqueueAnimation("opening",()=>{this._finishOpening()})}_attachOverlay(){this.matches(":popover-open")||this.showPopover()}_finishOpening(){ve(this,"opening",!1)}_finishClosing(){this._detachOverlay(),this._removeAttachedInstance(),this.toggleAttribute("suppressed",!1),ve(this,"closing",!1),this.dispatchEvent(new CustomEvent("vaadin-overlay-closed"))}_animatedClosing(){this.hasAttribute("opening")&&this._flushAnimation("opening"),this._isAttached&&(this._exitModalState(),ve(this,"closing",!0),this.dispatchEvent(new CustomEvent("vaadin-overlay-closing")),this._enqueueAnimation("closing",()=>{this._finishClosing()}))}_detachOverlay(){this.hidePopover()}_mouseDownListener(e){this._mouseDownInside=e.composedPath().indexOf(this.$.overlay)>=0}_mouseUpListener(e){this._mouseUpInside=e.composedPath().indexOf(this.$.overlay)>=0}_shouldCloseOnOutsideClick(e){return this._last}_outsideClickListener(e){if(e.composedPath().includes(this.$.overlay)||this._mouseDownInside||this._mouseUpInside){this._mouseDownInside=!1,this._mouseUpInside=!1;return}if(!this._shouldCloseOnOutsideClick(e))return;let i=new CustomEvent("vaadin-overlay-outside-click",{cancelable:!0,detail:{sourceEvent:e}});this.dispatchEvent(i),this.opened&&!i.defaultPrevented&&(this.close(e),!this.opened&&!this.modeless&&$u(e))}_keydownListener(e){if(!(!this._last||e.defaultPrevented)&&!(!this._shouldAddGlobalListeners()&&!e.composedPath().includes(this._focusRoot))&&e.key==="Escape"){let i=new CustomEvent("vaadin-overlay-escape-press",{cancelable:!0,detail:{sourceEvent:e}});this.dispatchEvent(i),this.opened&&!i.defaultPrevented&&this.close(e)}}};var Yu=[{name:"--vaadin-overlay-animation-duration",syntax:"<time>",initialValue:"0s"},{name:"--vaadin-overlay-animation-delay",syntax:"<time>",initialValue:"0s"},{name:"--vaadin-overlay-animation-timing-function",syntax:"*",initialValue:"ease"},{name:"--vaadin-overlay-opacity-closed",syntax:"<number>",initialValue:"0"},{name:"--vaadin-overlay-translate-closed",syntax:"<length>+ | <percentage>+",initialValue:"0px"},{name:"--vaadin-overlay-scale-closed",syntax:"<number> | <percentage>",initialValue:"1"},{name:"--vaadin-overlay-transform-closed",syntax:"*"}];Yu.forEach(r=>{ar({inherits:!1,...r})});var bb=z(Yu.map(({name:r})=>`${r}: inherit;`).join(`
`)),qn=C`
  :host,
  [part='overlay'],
  [part='backdrop'] {
    ${bb}
  }

  :host(:where([opening], [closing])) {
    /* This empty animation only reports the state, the parts run the visible animation */
    animation-name: --no-op;
    animation-duration: var(--vaadin-overlay-animation-duration);
    animation-delay: var(--vaadin-overlay-animation-delay);
  }

  :host(:where([closing])) [part='overlay'],
  :host(:where([closing])) ::slotted(*) {
    pointer-events: none !important;
  }

  :host(:where([opening], [closing])) :is([part='overlay'], [part='backdrop']) {
    animation-name: --fade, --transform;
    animation-duration: var(--vaadin-overlay-animation-duration);
    animation-timing-function: var(--vaadin-overlay-animation-timing-function);
    animation-delay: var(--vaadin-overlay-animation-delay);
    /* Fill backwards only, so the closed value applies during the delay without overriding theme styles */
    animation-fill-mode: backwards;

    @media (prefers-reduced-motion) {
      animation-name: --fade;
    }
  }

  :host(:where([opening], [closing])) [part='backdrop'] {
    animation-name: --fade;
    animation-timing-function: linear;
    --vaadin-overlay-opacity-closed: 0;
  }

  :host(:where([closing])) :is([part='overlay'], [part='backdrop']) {
    animation-direction: reverse;
    animation-fill-mode: both;
  }

  @keyframes --no-op {
  }

  /* Only the closed state is declared, so the animations end at the value the part already has */
  @keyframes --transform {
    0% {
      transform: var(--vaadin-overlay-transform-closed);
      translate: var(--vaadin-overlay-translate-closed);
      scale: var(--vaadin-overlay-scale-closed);
    }
  }

  @keyframes --fade {
    0% {
      opacity: var(--vaadin-overlay-opacity-closed);
    }
  }
`;var xb=C`
  :host {
    z-index: 200;
    position: fixed;

    /* Despite of what the names say, <vaadin-overlay> is just a container
          for position/sizing/alignment. The actual overlay is the overlay part. */

    /* Default position constraints. Themes can
          override this to adjust the gap between the overlay and the viewport. */
    inset: max(env(safe-area-inset-top, 0px), var(--vaadin-overlay-viewport-inset, 8px))
      max(env(safe-area-inset-right, 0px), var(--vaadin-overlay-viewport-inset, 8px))
      max(env(safe-area-inset-bottom, 0px), var(--vaadin-overlay-viewport-bottom))
      max(env(safe-area-inset-left, 0px), var(--vaadin-overlay-viewport-inset, 8px));

    /* Override native [popover] user agent styles */
    width: auto;
    height: auto;
    border: none;
    padding: 0;
    background-color: transparent;
    overflow: visible;

    /* Use flexbox alignment for the overlay part. */
    display: flex;
    flex-direction: column; /* makes dropdowns sizing easier */
    /* Align to center by default. */
    align-items: center;
    justify-content: center;

    /* Allow centering when max-width/max-height applies. */
    margin: auto;

    /* The host is not clickable, only the overlay part is. */
    pointer-events: none;

    /* Remove tap highlight on touch devices. */
    -webkit-tap-highlight-color: transparent;

    /* CSS API for host */
    --vaadin-overlay-viewport-bottom: 8px;
  }

  :host([hidden]),
  :host(:not([opened]):not([closing])),
  :host(:not([opened]):not([closing])) [part='overlay'] {
    display: none !important;
  }

  :host([suppressed]) [part='overlay'],
  :host([suppressed]) ::slotted(*) {
    pointer-events: none !important;
  }

  [part='overlay'] {
    color: var(--vaadin-overlay-text-color, var(--vaadin-text-color));
    background: var(--vaadin-overlay-background, var(--vaadin-background-color));
    border: var(--vaadin-overlay-border-width, 1px) solid
      var(--vaadin-overlay-border-color, var(--vaadin-border-color-secondary));
    border-radius: var(--vaadin-overlay-border-radius, var(--vaadin-radius-m));
    box-shadow: var(--vaadin-overlay-shadow, 0 8px 24px -4px rgba(0, 0, 0, 0.3));
    box-sizing: border-box;
    max-width: 100%;
    overflow: auto;
    overscroll-behavior: contain;
    pointer-events: auto;
    -webkit-tap-highlight-color: initial;

    /* CSS reset for font styles */
    font: initial;
    letter-spacing: initial;
    text-align: initial;
    text-decoration: initial;
    text-indent: initial;
    text-transform: initial;
    user-select: text;
    white-space: initial;
    word-spacing: initial;

    /* Inherit font-family */
    font-family: inherit;
  }

  [part='backdrop'] {
    background: var(--vaadin-overlay-backdrop-background, rgba(0, 0, 0, 0.2));
    content: '';
    inset: 0;
    pointer-events: auto;
    position: fixed;
    z-index: -1;
  }

  [part='overlay']:focus-visible {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
  }

  @media (forced-colors: active) {
    [part='overlay'] {
      border: 3px solid !important;
    }
  }
`,Xe=[xb,qn];var cl=C`
  /* Optical centering */
  :host::before,
  :host::after {
    content: '';
    flex-basis: 0;
    flex-grow: 1;
  }

  :host::after {
    flex-grow: 1.1;
  }

  :host {
    cursor: default;
    --_overflow-indicator-height: var(--vaadin-dialog-overflow-indicator-height, 1px);
    --_overflow-indicator-color: var(--vaadin-dialog-overflow-indicator-color, var(--vaadin-border-color-secondary));
  }

  [part='overlay']:focus-visible {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
  }

  [part='overlay'] {
    color: var(--vaadin-dialog-text-color, var(--vaadin-overlay-text-color, var(--vaadin-text-color)));
    background: var(--vaadin-dialog-background, var(--vaadin-overlay-background, var(--vaadin-background-color)));
    background-origin: border-box;
    border: var(--vaadin-dialog-border-width, var(--vaadin-overlay-border-width, 1px)) solid
      var(--vaadin-dialog-border-color, var(--vaadin-overlay-border-color, var(--vaadin-border-color-secondary)));
    box-shadow: var(--vaadin-dialog-shadow, var(--vaadin-overlay-shadow, 0 8px 24px -4px rgba(0, 0, 0, 0.3)));
    border-radius: var(--vaadin-dialog-border-radius, var(--vaadin-radius-l));
    width: max-content;
    min-width: min(var(--vaadin-dialog-min-width, 4em), 100%);
    max-width: min(var(--vaadin-dialog-max-width, 100%), 100%);
    max-height: 100%;
  }

  [part='header'],
  [part='header-content'],
  [part='footer'] {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex: none;
    pointer-events: none;
    z-index: 1;
    gap: var(--vaadin-dialog-toolbar-gap, var(--vaadin-gap-s));
  }

  ::slotted(*) {
    pointer-events: auto;
  }

  [part='header'],
  [part='content'],
  [part='footer'] {
    padding: var(--vaadin-dialog-padding, var(--vaadin-padding-l));
  }

  :host([theme~='no-padding']) [part='content'] {
    padding: 0 !important;
  }

  :host(:is([has-header], [has-title])) [part='content'] {
    padding-top: 0;
  }

  :host([has-footer]) [part='content'] {
    padding-bottom: 0;
  }

  [part='header'] {
    flex-wrap: nowrap;
  }

  ::slotted([slot='header-content']),
  ::slotted([slot='title']),
  ::slotted([slot='footer']) {
    display: contents;
  }

  ::slotted([slot='title']) {
    font: inherit !important;
    color: inherit !important;
    overflow-wrap: anywhere;
  }

  [part='title'] {
    color: var(--vaadin-dialog-title-color, var(--vaadin-text-color));
    font-weight: var(--vaadin-dialog-title-font-weight, 600);
    font-size: var(--vaadin-dialog-title-font-size, 1em);
    line-height: var(--vaadin-dialog-title-line-height, inherit);
  }

  [part='header-content'] {
    flex: 1;
  }

  :host([has-title]) [part='header-content'],
  [part='footer'] {
    justify-content: flex-end;
  }

  :host(:not([has-title]):not([has-header])) [part='header'],
  :host(:not([has-header])) [part='header-content'],
  :host(:not([has-title])) [part='title'],
  :host(:not([has-footer])) [part='footer'] {
    display: none !important;
  }

  [part='header'],
  [part='footer'] {
    position: relative;

    &::after {
      content: '';
      opacity: 0;
      position: absolute;
      pointer-events: none;
      height: var(--_overflow-indicator-height);
      top: 100%;
      inset-inline: 0;
      background: linear-gradient(
        var(--_overflow-indicator-dir, to bottom),
        var(--_overflow-indicator-color),
        var(--_overflow-indicator-color) 1px,
        transparent
      );
    }
  }

  [part='footer']::after {
    top: auto;
    bottom: 100%;
    --_overflow-indicator-dir: to top;
  }

  :host([overflow~='top']) [part='header']::after,
  :host([overflow~='bottom']) [part='footer']::after {
    opacity: 1;
  }
`,wb=C`
  [part='overlay'] {
    position: relative;
    overflow: visible;
    display: flex;
  }

  :host([has-bounds-set]) [part='overlay'] {
    min-width: 0;
  }

  :host([has-bounds-set]:not([keep-in-viewport])) [part='overlay'] {
    max-width: none;
    max-height: none;
  }

  /* Content part scrolls by default */
  [part='content'] {
    flex: 1;
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    clip-path: border-box;
  }

  [part='header'],
  :host(:not([has-title], [has-header])) [part='content'] {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  [part='footer'],
  :host(:not([has-footer])) [part='content'] {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  .resizer-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 100%;
    border-radius: calc(
      var(--vaadin-dialog-border-radius, var(--vaadin-radius-l)) - var(
          --vaadin-dialog-border-width,
          var(--vaadin-overlay-border-width, 1px)
        )
    );
  }

  :host(:not([resizable])) .resizer {
    display: none;
  }

  .resizer {
    position: absolute;
    height: 16px;
    width: 16px;
  }

  .resizer.edge {
    height: 8px;
    width: 8px;
    inset: -4px;
  }

  .resizer.edge.n {
    width: auto;
    bottom: auto;
    cursor: ns-resize;
  }

  .resizer.ne {
    top: -4px;
    right: -4px;
    cursor: nesw-resize;
  }

  .resizer.edge.e {
    height: auto;
    left: auto;
    cursor: ew-resize;
  }

  .resizer.se {
    bottom: -4px;
    right: -4px;
    cursor: nwse-resize;
  }

  .resizer.edge.s {
    width: auto;
    top: auto;
    cursor: ns-resize;
  }

  .resizer.sw {
    bottom: -4px;
    left: -4px;
    cursor: nesw-resize;
  }

  .resizer.edge.w {
    height: auto;
    right: auto;
    cursor: ew-resize;
  }

  .resizer.nw {
    top: -4px;
    left: -4px;
    cursor: nwse-resize;
  }
`,Uu=[Xe,cl,wb];var Cb=C`
  :host {
    --vaadin-dialog-min-width: var(--vaadin-confirm-dialog-min-width, 15em);
    --vaadin-dialog-max-width: var(--vaadin-confirm-dialog-max-width, 25em);
  }

  ::slotted([slot='header']) {
    display: contents;
    font: inherit !important;
    color: inherit !important;
  }

  [part='header'] {
    color: var(--vaadin-dialog-title-color, var(--vaadin-text-color));
    font-weight: var(--vaadin-dialog-title-font-weight, 600);
    font-size: var(--vaadin-dialog-title-font-size, 1em);
    line-height: var(--vaadin-dialog-title-line-height, inherit);
  }

  [part='overlay'] {
    display: flex;
    flex-direction: column;
  }

  [part='content'] {
    flex: 1;
  }
`,ju=[Xe,cl,Cb];var fl=class extends Ze(J(I(O(A(S))))){static get is(){return"vaadin-confirm-dialog-overlay"}static get styles(){return ju}static get properties(){return{cancelButtonVisible:{type:Boolean,value:!1},rejectButtonVisible:{type:Boolean,value:!1}}}render(){return w`
      <div part="backdrop" id="backdrop" ?hidden="${!this.withBackdrop}"></div>
      <div part="overlay" id="overlay">
        <header part="header" role="presentation"><slot name="header"></slot></header>
        <div part="content" id="content">
          <div part="message"><slot></slot></div>
        </div>
        <div part="footer" role="toolbar">
          <div part="cancel-button" ?hidden="${!this.cancelButtonVisible}">
            <slot name="cancel-button"></slot>
          </div>
          <div part="reject-button" ?hidden="${!this.rejectButtonVisible}">
            <slot name="reject-button"></slot>
          </div>
          <div part="confirm-button">
            <slot name="confirm-button"></slot>
          </div>
        </div>
      </div>
    `}ready(){super.ready(),this.setAttribute("has-header",""),this.setAttribute("has-footer","")}get _contentRoot(){return this.owner}get _focusRoot(){return this.owner}};E(fl);var re=r=>r??oe;var Kn=r=>class extends r{static get properties(){return{width:{type:String},height:{type:String}}}static get observers(){return["__sizeChanged(width, height)"]}__sizeChanged(e,i){requestAnimationFrame(()=>this.$.overlay.setBounds({width:e,height:i},!1))}};var Hu=r=>class extends Kn(r){static get properties(){return{accessibleDescriptionRef:{type:String},opened:{type:Boolean,reflectToAttribute:!0,value:!1,notify:!0,sync:!0},header:{type:String,value:""},message:{type:String,value:""},confirmText:{type:String,value:"Confirm"},confirmTheme:{type:String,value:"primary"},noCloseOnEsc:{type:Boolean,value:!1},rejectButtonVisible:{type:Boolean,reflectToAttribute:!0,value:!1},rejectText:{type:String,value:"Reject"},rejectTheme:{type:String,value:"error tertiary"},cancelButtonVisible:{type:Boolean,reflectToAttribute:!0,value:!1},cancelText:{type:String,value:"Cancel"},cancelTheme:{type:String,value:"tertiary"},_cancelButton:{type:Object},_confirmButton:{type:Object},_headerNode:{type:Object},_messageNodes:{type:Array,value:()=>[]},_rejectButton:{type:Object}}}static get observers(){return["__updateConfirmButton(_confirmButton, confirmText, confirmTheme)","__updateCancelButton(_cancelButton, cancelText, cancelTheme, cancelButtonVisible)","__updateHeaderNode(_headerNode, header)","__updateMessageNodes(_messageNodes, message)","__updateRejectButton(_rejectButton, rejectText, rejectTheme, rejectButtonVisible)","__accessibleDescriptionRefChanged(_messageNodes, accessibleDescriptionRef)"]}constructor(){super(),this.__cancel=this.__cancel.bind(this),this.__confirm=this.__confirm.bind(this),this.__reject=this.__reject.bind(this)}connectedCallback(){super.connectedCallback(),this.__restoreOpened&&(this.opened=!0)}disconnectedCallback(){super.disconnectedCallback(),setTimeout(()=>{this.isConnected||(this.__restoreOpened=this.opened,this.opened=!1)})}ready(){super.ready(),this.role="alertdialog",this.setAttribute("aria-modal","true"),this.setAttribute("tabindex","0"),this._headerController=new ie(this,"header","h3",{initializer:e=>{this._headerNode=e}}),this.addController(this._headerController),this._messageController=new ie(this,"","div",{multiple:!0,observe:!1,initializer:e=>{this._messageNodes=[...this._messageNodes,e]}}),this.addController(this._messageController),this._cancelController=new ie(this,"cancel-button","vaadin-button",{initializer:e=>{this.__setupSlottedButton("cancel",e)}}),this.addController(this._cancelController),this._rejectController=new ie(this,"reject-button","vaadin-button",{initializer:e=>{this.__setupSlottedButton("reject",e)}}),this.addController(this._rejectController),this._confirmController=new ie(this,"confirm-button","vaadin-button",{initializer:e=>{this.__setupSlottedButton("confirm",e)}}),this.addController(this._confirmController),this._overlayElement=this.$.overlay}updated(e){super.updated(e),e.has("header")&&(this.ariaLabel=this.header||"confirmation")}__onDialogOpened(){this._confirmButton&&this._confirmButton.focus()}__onDialogClosed(){this.dispatchEvent(new CustomEvent("closed"))}__accessibleDescriptionRefChanged(e,i){if(e)if(i)this.removeAttribute("aria-description"),this.setAttribute("aria-describedby",i);else{this.removeAttribute("aria-describedby");let s=e.map(n=>n.textContent.trim()).join(" ");this.setAttribute("aria-description",s)}}__setupSlottedButton(e,i){let s=`_${e}Button`,n=`__${e}`;this[s]&&this[s]!==i&&this[s].remove(),i.addEventListener("click",this[n]),this[s]=i}__updateCancelButton(e,i,s,n){e&&(e===this._cancelController.defaultNode&&(e.textContent=i,e.setAttribute("theme",s)),e.toggleAttribute("hidden",!n))}__updateConfirmButton(e,i,s){e&&e===this._confirmController.defaultNode&&(e.textContent=i,e.setAttribute("theme",s))}__updateHeaderNode(e,i){e&&e===this._headerController.defaultNode&&(e.textContent=i)}__updateMessageNodes(e,i){if(e?.length>0){let s=e.find(n=>n===this._messageController.defaultNode);s&&(s.textContent=i)}}__updateRejectButton(e,i,s,n){e&&(e===this._rejectController.defaultNode&&(e.textContent=i,e.setAttribute("theme",s)),e.toggleAttribute("hidden",!n))}_onOverlayEscapePress(e){this.noCloseOnEsc?e.preventDefault():this.__cancel()}_onOverlayOutsideClick(e){e.preventDefault()}__confirm(){this.dispatchEvent(new CustomEvent("confirm")),this.opened=!1}__cancel(){this.dispatchEvent(new CustomEvent("cancel")),this.opened=!1}__reject(){this.dispatchEvent(new CustomEvent("reject")),this.opened=!1}};var fr=class extends Hu(K(bt(O(S)))){static get is(){return"vaadin-confirm-dialog"}static get styles(){return C`
      :host([opened]),
      :host([opening]),
      :host([closing]) {
        display: block !important;
        position: fixed;
        outline: none;
      }

      :host,
      :host([hidden]) {
        display: none !important;
      }

      :host(:focus-visible) ::part(overlay) {
        outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
      }
    `}render(){return w`
      <vaadin-confirm-dialog-overlay
        id="overlay"
        .owner="${this}"
        .opened="${this.opened}"
        theme="${re(this._theme)}"
        .cancelButtonVisible="${this.cancelButtonVisible}"
        .rejectButtonVisible="${this.rejectButtonVisible}"
        with-backdrop
        restore-focus-on-close
        focus-trap
        exportparts="backdrop, overlay, header, content, message, footer, cancel-button, confirm-button, reject-button"
        @opened-changed="${this._onOpenedChanged}"
        @vaadin-overlay-open="${this.__onDialogOpened}"
        @vaadin-overlay-closed="${this.__onDialogClosed}"
        @vaadin-overlay-outside-click="${this._onOverlayOutsideClick}"
        @vaadin-overlay-escape-press="${this._onOverlayEscapePress}"
      >
        <slot name="header" slot="header"></slot>
        <slot></slot>
        <slot name="cancel-button" slot="cancel-button"></slot>
        <slot name="reject-button" slot="reject-button"></slot>
        <slot name="confirm-button" slot="confirm-button"></slot>
      </vaadin-confirm-dialog-overlay>
    `}_onOpenedChanged(t){this.opened=t.detail.value}};E(fr);function St(r,t,e){return r?t(r):e?.(r)}var Wu=(r,t)=>r===t||r&&t&&typeof r=="object"&&typeof t=="object"&&Object.keys(r).length===Object.keys(t).length&&Object.keys(r).every(e=>Wu(r[e],t[e])),rs={generateUniqueUUID:()=>crypto.randomUUID(),objectsEqual:Wu},qu={};var Sb=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a};var Ku=class extends fr{static get styles(){return[fr.styles,C`
        ::part(header),
        ::part(content) {
          background-color: var(--lumo-contrast-5pct);
          margin-inline-start: 0;
        }
        ::part(header),
        ::part(footer) {
          padding: var(--lumo-space-l);
        }
        ::part(content) {
          padding: 0 var(--lumo-space-l);
        }
      `]}open(){this.setAttribute("opened","true")}close(){this.toggleAttribute("opened",!1)}};Ku=Sb([q("or-vaadin-confirm-dialog")],Ku);var Gn=class{constructor(t){this.host=t}hostConnected(){if(!this.__initialized){this.__initialized=!0;let{host:t}=this;this.__resizeObserver=new ResizeObserver(()=>this.__updateState()),this.__resizeObserver.observe(t.$.resizerContainer),t.$.content.addEventListener("scroll",()=>this.__updateState(!0)),t.shadowRoot.addEventListener("slotchange",()=>this.__updateState(!0))}}update(){this.__updateState(!0)}__updateState(t=!1){cancelAnimationFrame(this.__updateRaf),t?this.__writeState(this.__readState()):this.__updateRaf=requestAnimationFrame(()=>this.__writeState(this.__readState()))}__readState(){let t=this.host.$.content,e="";return t.scrollTop>0&&(e+=" top"),t.scrollTop<t.scrollHeight-t.clientHeight&&(e+=" bottom"),e.trim()}__writeState(t){let{host:e}=this;t.length>0?ve(e,"overflow",t):ve(e,"overflow",null)}};var Gu=r=>class extends Ze(r){static get properties(){return{headerTitle:{type:String},headerRenderer:{type:Object},footerRenderer:{type:Object},keepInViewport:{type:Boolean,reflectToAttribute:!0}}}static get observers(){return["_headerFooterRendererChange(headerRenderer, footerRenderer, opened)","_headerTitleChanged(headerTitle, opened)"]}get _contentRoot(){return this.owner}containsFocus(){return this._deepContains(Kt())}get _rendererRoot(){if(!this.__savedRoot){let e=document.createElement("vaadin-dialog-content");e.style.display="contents",this.owner.appendChild(e),this.__savedRoot=e}return this.__savedRoot}ready(){super.ready(),this.__overflowController=new Gn(this),this.addController(this.__overflowController),this.__resizeObserver=new ResizeObserver(()=>{requestAnimationFrame(()=>{this.__adjustPosition()})}),this.__resizeObserver.observe(this.$.resizerContainer);let e=this.shadowRoot.querySelector('slot[name="header-content"]');this.__headerSlotObserver=new $e(e,({currentNodes:s})=>{ve(this,"has-header",s.length>0),this.__overflowController.update()});let i=this.shadowRoot.querySelector('slot[name="footer"]');this.__footerSlotObserver=new $e(i,({currentNodes:s})=>{ve(this,"has-footer",s.length>0),this.__overflowController.update()}),this.__handleWindowResize=this.__handleWindowResize.bind(this)}updated(e){super.updated(e),(e.has("opened")||e.has("keepInViewport"))&&(this.opened&&this.keepInViewport?window.addEventListener("resize",this.__handleWindowResize):window.removeEventListener("resize",this.__handleWindowResize))}__createContainer(e){let i=document.createElement("vaadin-dialog-content");return i.setAttribute("slot",e),i}__clearContainer(e){e.innerHTML="",delete e._$litPart$}__initContainer(e,i){return e?this.__clearContainer(e):(e=this.__createContainer(i),this.owner.appendChild(e)),e}_headerFooterRendererChange(e,i,s){let n=this.__oldHeaderRenderer!==e;this.__oldHeaderRenderer=e;let a=this.__oldFooterRenderer!==i;this.__oldFooterRenderer=i;let d=this._oldOpenedFooterHeader!==s;this._oldOpenedFooterHeader=s,n&&(e?this.headerContainer=this.__initContainer(this.headerContainer,"header-content"):this.headerContainer&&(this.headerContainer.remove(),this.headerContainer=null)),a&&(i?this.footerContainer=this.__initContainer(this.footerContainer,"footer"):this.footerContainer&&(this.footerContainer.remove(),this.footerContainer=null)),(e&&(n||d)||i&&(a||d))&&s&&this.requestContentUpdate()}_headerTitleChanged(e,i){ve(this,"has-title",!!e),i&&(e||this._oldHeaderTitle)&&this.requestContentUpdate(),this._oldHeaderTitle=e}_headerTitleRenderer(){this.headerTitle?(this.headerTitleElement||(this.headerTitleElement=document.createElement("h2"),this.headerTitleElement.setAttribute("slot","title"),this.headerTitleElement.classList.add("draggable")),this.owner.appendChild(this.headerTitleElement),this.headerTitleElement.textContent=this.headerTitle):this.headerTitleElement&&(this.headerTitleElement.remove(),this.headerTitleElement=null)}requestContentUpdate(){super.requestContentUpdate(),this.headerContainer&&this.headerRenderer&&this.headerRenderer.call(this.owner,this.headerContainer,this.owner),this.footerContainer&&this.footerRenderer&&this.footerRenderer.call(this.owner,this.footerContainer,this.owner),this._headerTitleRenderer(),this.__overflowController?.update()}getBounds(){let e=this.$.overlay.getBoundingClientRect(),i=this.getBoundingClientRect(),s=e.top-i.top,n=e.left-i.left,a=e.width,d=e.height;return{top:s,left:n,width:a,height:d}}setBounds(e,i=!0){super.setBounds(e,i),this.__adjustPosition()}__handleWindowResize(){this.__adjustPosition()}__adjustPosition(){if(!this.opened||!this.keepInViewport)return;let e=getComputedStyle(this.$.overlay);if(e.position!=="absolute")return;let i=this.getBoundingClientRect(),s=this.getBounds(),n=parseFloat(e.width)||s.width,a=parseFloat(e.height)||s.height,d=i.right-i.left-n,c=i.bottom-i.top-a;if(s.left>d||s.top>c){let f=Math.max(0,Math.min(s.left,d)),m=Math.max(0,Math.min(s.top,c));Object.assign(this.$.overlay.style,{left:`${f}px`,top:`${m}px`})}}};var Zn=class r extends Gu(J(I(O(A(S))))){static get is(){return"vaadin-dialog-overlay"}static get styles(){return Uu}get _focusRoot(){return this.owner}render(){return w`
      <div id="backdrop" part="backdrop" ?hidden="${!this.withBackdrop}"></div>
      <div part="overlay" id="overlay">
        <section id="resizerContainer" class="resizer-container">
          <header part="header">
            <div part="title"><slot name="title"></slot></div>
            <div part="header-content"><slot name="header-content"></slot></div>
          </header>
          <div part="content" id="content"><slot></slot></div>
          <footer part="footer"><slot name="footer"></slot></footer>
        </section>
      </div>
    `}bringToFront(t){if(t instanceof Event){let e=t.composedPath();if(hl(this).some(s=>e.includes(s)&&ul(this,s)&&s instanceof r))return}super.bringToFront()}};E(Zn);var Zu=r=>class extends r{static get properties(){return{opened:{type:Boolean,reflectToAttribute:!0,value:!1,notify:!0,sync:!0},noCloseOnOutsideClick:{type:Boolean,value:!1},noCloseOnEsc:{type:Boolean,value:!1},modeless:{type:Boolean,value:!1},noFocusTrap:{type:Boolean,value:!1},noAutofocus:{type:Boolean,value:!1},top:{type:String},left:{type:String},overlayRole:{type:String},keepInViewport:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["__positionChanged(top, left)"]}ready(){super.ready();let e=this.$.overlay;e.addEventListener("vaadin-overlay-outside-click",this._handleOutsideClick.bind(this)),e.addEventListener("vaadin-overlay-escape-press",this._handleEscPress.bind(this)),e.addEventListener("vaadin-overlay-closed",this.__handleOverlayClosed.bind(this)),this._overlayElement=e,this.hasAttribute("role")||(this.role="dialog"),this.setAttribute("tabindex","0")}updated(e){super.updated(e),e.has("overlayRole")&&(this.role=this.overlayRole||"dialog"),e.has("modeless")&&Y(this,"aria-modal",!this.modeless)}__handleOverlayClosed(){this.dispatchEvent(new CustomEvent("closed"))}connectedCallback(){super.connectedCallback(),this.__restoreOpened&&(this.opened=!0)}disconnectedCallback(){super.disconnectedCallback(),setTimeout(()=>{this.isConnected||(this.__restoreOpened=this.opened,this.opened=!1)})}_onOverlayOpened(e){e.detail.value===!1&&(this.opened=!1)}_handleOutsideClick(e){this.noCloseOnOutsideClick&&e.preventDefault()}_handleEscPress(e){this.noCloseOnEsc&&e.preventDefault()}_bringOverlayToFront(e){this.modeless&&this._overlayElement.bringToFront(e)}__positionChanged(e,i){requestAnimationFrame(()=>this.$.overlay.setBounds({top:e,left:i}))}__sizeChanged(e,i){requestAnimationFrame(()=>this.$.overlay.setBounds({width:e,height:i},!1))}};function pi(r){return r.touches?r.touches[0]||r.changedTouches[0]:r}function Xn(r){return r.clientX>=0&&r.clientX<=window.innerWidth&&r.clientY>=0&&r.clientY<=window.innerHeight}var Xu=5,pr=class{#e;start(t){let{clientX:e,clientY:i}=pi(t);this.#e={x:e,y:i}}isClick(t){let{clientX:e,clientY:i}=pi(t);return Math.abs(e-this.#e.x)<Xu&&Math.abs(i-this.#e.y)<Xu}};var Ju=r=>class extends r{static get properties(){return{draggable:{type:Boolean,value:!1,reflectToAttribute:!0},_touchDevice:{type:Boolean,value:Zt},__dragHandleClassName:{type:String}}}ready(){super.ready(),this._originalBounds={},this._originalMouseCoords={},this.__dragTracker=new pr,this._startDrag=this._startDrag.bind(this),this._drag=this._drag.bind(this),this._stopDrag=this._stopDrag.bind(this),this.$.overlay.$.overlay.addEventListener("mousedown",this._startDrag),this.$.overlay.$.overlay.addEventListener("touchstart",this._startDrag)}_startDrag(e){if(!(e.type==="touchstart"&&e.touches.length>1)&&!e.defaultPrevented&&this.draggable&&(e.button===0||e.touches)){let i=this.$.overlay.$.resizerContainer,s=e.target===i,n=e.offsetX>i.clientWidth||e.offsetY>i.clientHeight,a=e.target===this.$.overlay.$.content,d=e.composedPath().some((c,f)=>{if(!c.classList)return!1;let m=c.classList.contains(this.__dragHandleClassName||"draggable"),_=c.classList.contains("draggable-leaf-only"),v=f===0;return _&&v||m&&(!_||v)});if(s&&!n||a||d){e.preventDefault(),this.__dragTracker.start(e),this._originalBounds=this.$.overlay.getBounds();let c=pi(e);this._originalMouseCoords={top:c.pageY,left:c.pageX},window.addEventListener("mouseup",this._stopDrag),window.addEventListener("touchend",this._stopDrag),window.addEventListener("mousemove",this._drag),window.addEventListener("touchmove",this._drag);let{top:f,left:m,width:_,height:v}=this._originalBounds;this.$.overlay.$.overlay.style.position!=="absolute"&&(this.top=f,this.left=m),this.dispatchEvent(new CustomEvent("drag-start",{detail:{width:_,height:v,top:f,left:m}}))}}}_drag(e){let i=pi(e);if(Xn(i)){let s=this._originalBounds.top+(i.pageY-this._originalMouseCoords.top),n=this._originalBounds.left+(i.pageX-this._originalMouseCoords.left);if(this.keepInViewport){let{width:a,height:d}=this._originalBounds,c=this.$.overlay.getBoundingClientRect(),f=c.right-c.left-a,m=c.bottom-c.top-d;n=Math.max(0,Math.min(n,f)),s=Math.max(0,Math.min(s,m))}this.top=s,this.left=n}}_stopDrag(e){this.__dragTracker.isClick(e)&&!this.$.overlay.containsFocus()&&this.focus({preventScroll:!0,focusVisible:ce()}),this.dispatchEvent(new CustomEvent("dragged",{detail:{top:this.top,left:this.left}})),window.removeEventListener("mouseup",this._stopDrag),window.removeEventListener("touchend",this._stopDrag),window.removeEventListener("mousemove",this._drag),window.removeEventListener("touchmove",this._drag)}};var Qu=r=>class extends r{static get properties(){return{renderer:{type:Object},headerTitle:{type:String},headerRenderer:{type:Object},footerRenderer:{type:Object}}}requestContentUpdate(){this._overlayElement&&this._overlayElement.requestContentUpdate()}};var ec=r=>class extends r{static get properties(){return{resizable:{type:Boolean,value:!1,reflectToAttribute:!0}}}ready(){super.ready(),this._originalBounds={},this._originalMouseCoords={},this.__resizeTracker=new pr,this._resizeListeners={start:{},resize:{},stop:{}},this._addResizeListeners()}_addResizeListeners(){["n","e","s","w","nw","ne","se","sw"].forEach(e=>{let i=document.createElement("div");this._resizeListeners.start[e]=s=>this._startResize(s,e),this._resizeListeners.resize[e]=s=>this._resize(s,e),this._resizeListeners.stop[e]=s=>this._stopResize(s,e),e.length===1&&i.classList.add("edge"),i.classList.add("resizer"),i.classList.add(e),i.addEventListener("mousedown",this._resizeListeners.start[e]),i.addEventListener("touchstart",this._resizeListeners.start[e]),this.$.overlay.$.resizerContainer.appendChild(i)})}_startResize(e,i){if(!(e.type==="touchstart"&&e.touches.length>1)&&(e.button===0||e.touches)){e.preventDefault(),this.__resizeTracker.start(e),this._originalBounds=this.$.overlay.getBounds();let s=pi(e);this._originalMouseCoords={top:s.pageY,left:s.pageX},window.addEventListener("mousemove",this._resizeListeners.resize[i]),window.addEventListener("touchmove",this._resizeListeners.resize[i]),window.addEventListener("mouseup",this._resizeListeners.stop[i]),window.addEventListener("touchend",this._resizeListeners.stop[i]),this.$.overlay.setBounds(this._originalBounds),this.$.overlay.setAttribute("has-bounds-set","");let{width:n,height:a,top:d,left:c}=this._originalBounds;this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:n,height:a,top:d,left:c}}))}}_resize(e,i){let s=pi(e);Xn(s)&&i.split("").forEach(a=>{switch(a){case"n":{let d=this._originalBounds.height-(s.pageY-this._originalMouseCoords.top),c=this._originalBounds.top+(s.pageY-this._originalMouseCoords.top);d>40&&(this.top=c,this.height=d);break}case"e":{let d=this._originalBounds.width+(s.pageX-this._originalMouseCoords.left);d>40&&(this.width=d);break}case"s":{let d=this._originalBounds.height+(s.pageY-this._originalMouseCoords.top);d>40&&(this.height=d);break}case"w":{let d=this._originalBounds.width-(s.pageX-this._originalMouseCoords.left),c=this._originalBounds.left+(s.pageX-this._originalMouseCoords.left);d>40&&(this.left=c,this.width=d);break}default:break}})}_stopResize(e,i){this.__resizeTracker.isClick(e)&&!this.$.overlay.containsFocus()&&this.focus({preventScroll:!0,focusVisible:ce()}),window.removeEventListener("mousemove",this._resizeListeners.resize[i]),window.removeEventListener("touchmove",this._resizeListeners.resize[i]),window.removeEventListener("mouseup",this._resizeListeners.stop[i]),window.removeEventListener("touchend",this._resizeListeners.stop[i]),this.dispatchEvent(new CustomEvent("resize",{detail:this._getResizeDimensions()}))}_getResizeDimensions(){let{width:e,height:i,top:s,left:n}=getComputedStyle(this.$.overlay.$.overlay);return{width:e,height:i,top:s,left:n}}};var mr=class extends Kn(Ju(ec(Qu(Zu(bt(K(O(S)))))))){static get is(){return"vaadin-dialog"}static get styles(){return C`
      :host([opened]),
      :host([opening]),
      :host([closing]) {
        display: block !important;
        position: fixed;
        outline: none;
      }

      :host,
      :host([hidden]) {
        display: none !important;
      }

      :host(:focus-visible) ::part(overlay) {
        outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
      }
    `}render(){return w`
      <vaadin-dialog-overlay
        id="overlay"
        .owner="${this}"
        .opened="${this.opened}"
        .headerTitle="${this.headerTitle}"
        .renderer="${this.renderer}"
        .headerRenderer="${this.headerRenderer}"
        .footerRenderer="${this.footerRenderer}"
        .keepInViewport="${this.keepInViewport}"
        @opened-changed="${this._onOverlayOpened}"
        @mousedown="${this._bringOverlayToFront}"
        @touchstart="${this._bringOverlayToFront}"
        theme="${re(this._theme)}"
        .modeless="${this.modeless}"
        .withBackdrop="${!this.modeless}"
        ?resizable="${this.resizable}"
        restore-focus-on-close
        ?focus-trap="${!this.noFocusTrap&&!this.modeless}"
        ?autofocus="${this.modeless?!this.noAutofocus&&!this.noFocusTrap:!this.noFocusTrap}"
        exportparts="backdrop, overlay, header, title, header-content, content, footer"
      >
        <slot name="title" slot="title"></slot>
        <slot name="header-content" slot="header-content"></slot>
        <slot name="footer" slot="footer"></slot>
        <slot></slot>
      </vaadin-dialog-overlay>
    `}updated(t){super.updated(t),t.has("headerTitle")&&(this.ariaLabel=this.headerTitle)}};E(mr);var{I:SD}=Vh;var tc=(r,t)=>t===void 0?r?._$litType$!==void 0:r?._$litType$===t;var ic=r=>r.strings===void 0;var ss=(r,t)=>{let e=r._$AN;if(e===void 0)return!1;for(let i of e)i._$AO?.(t,!1),ss(i,t);return!0},Jn=r=>{let t,e;do{if((t=r._$AM)===void 0)break;e=t._$AN,e.delete(r),r=t}while(e?.size===0)},rc=r=>{for(let t;t=r._$AM;r=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(r))break;e.add(r),Tb(t)}};function kb(r){this._$AN!==void 0?(Jn(this),this._$AM=r,rc(this)):this._$AM=r}function Eb(r,t=!1,e=0){let i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let n=e;n<i.length;n++)ss(i[n],!1),Jn(i[n]);else i!=null&&(ss(i,!1),Jn(i));else ss(this,r)}var Tb=r=>{r.type==nr.CHILD&&(r._$AP??=Eb,r._$AQ??=kb)},Qn=class extends oi{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),rc(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(ss(this,t),Jn(this))}setValue(t){if(ic(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var sc=Symbol("valueNotInitialized"),_r=class extends Qn{constructor(t){if(super(t),t.type!==nr.ELEMENT)throw new Error(`\`${this.constructor.name}\` must be bound to an element.`);this.previousValue=sc}render(t,e){return oe}update(t,[e,i]){return this.hasChanged(i)?(this.host=t.options&&t.options.host,this.element=t.element,this.renderer=e,this.previousValue===sc?this.addRenderer():this.runRenderer(),this.previousValue=Array.isArray(i)?[...i]:i,oe):oe}reconnected(){this.addRenderer()}disconnected(){this.removeRenderer()}addRenderer(){throw new Error("The `addRenderer` method must be implemented.")}runRenderer(){throw new Error("The `runRenderer` method must be implemented.")}removeRenderer(){throw new Error("The `removeRenderer` method must be implemented.")}renderRenderer(t,...e){let i=this.renderer.call(this.host,...e);_t(i,t,{host:this.host})}hasChanged(t){return Array.isArray(t)?!Array.isArray(this.previousValue)||this.previousValue.length!==t.length?!0:t.some((e,i)=>e!==this.previousValue[i]):this.previousValue!==t}};var pl=Symbol("contentUpdateDebouncer"),ns=class extends _r{get rendererProperty(){throw new Error("The `rendererProperty` getter must be implemented.")}addRenderer(){this.element[this.rendererProperty]=(t,e)=>{this.renderRenderer(t,e)}}runRenderer(){this.element[pl]=ae.debounce(this.element[pl],tt,()=>{this.element.requestContentUpdate()})}removeRenderer(){this.element[this.rendererProperty]=null,delete this.element[pl]}},eo=class extends ns{get rendererProperty(){return"renderer"}},to=class extends ns{get rendererProperty(){return"headerRenderer"}},io=class extends ns{get rendererProperty(){return"footerRenderer"}},ml=gt(eo),_l=gt(to),gl=gt(io);var Ob=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a};var nc=class extends mr{static get styles(){return[mr.styles,C`
        ::part(header),
        ::part(content) {
          background-color: var(--lumo-contrast-5pct);
        }
        ::part(header) {
          /* Colour header icons (e.g. the close cross) with the primary colour */
          --internal-or-icon-fill: var(--lumo-primary-color);
        }
        ::part(header),
        ::part(footer) {
          padding: var(--lumo-space-l);
        }
        ::part(content) {
          padding: 0 var(--lumo-space-l);
        }
      `]}open(){this.setAttribute("opened","true")}close(){this.toggleAttribute("opened",!1)}};nc=Ob([q("or-vaadin-dialog")],nc);var ro=r=>class extends hi(Me(r)){static get properties(){return{_hasVaadinItemMixin:{value:!0},selected:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_selectedChanged",sync:!0},_value:String}}get _activeKeys(){return["Enter"," "]}get value(){return this._value??this.textContent.trim()}set value(e){this._value=e}ready(){super.ready();let e=this.getAttribute("value");e!==null&&(this.value=e),this.__shouldAllowFocusWhenDisabled()&&this.style.setProperty("--_vaadin-item-disabled-pointer-events","auto")}focus(e){this.disabled&&!this.__shouldAllowFocusWhenDisabled()||super.focus(e)}_shouldSetActive(e){return!this.disabled&&!(e.type==="keydown"&&e.defaultPrevented)}_selectedChanged(e){this.setAttribute("aria-selected",e)}_disabledChanged(e){super._disabledChanged(e),e&&(this.selected=!1,this.__shouldAllowFocusWhenDisabled()||this.blur())}_onKeyDown(e){super._onKeyDown(e),this._activeKeys.includes(e.key)&&!e.defaultPrevented&&(e.preventDefault(),this.click())}__shouldAllowFocusWhenDisabled(){return!1}};var mi=C`
  :host {
    align-items: center;
    border-radius: var(--vaadin-item-border-radius, var(--vaadin-radius-m));
    box-sizing: border-box;
    cursor: var(--vaadin-clickable-cursor);
    display: flex;
    column-gap: var(--vaadin-item-gap, var(--vaadin-gap-s));
    height: var(--vaadin-item-height, auto);
    padding: var(--vaadin-item-padding, var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container));
    -webkit-tap-highlight-color: transparent;
  }

  :host([focus-ring]) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-focus-ring-width) / -1);
  }

  :host([disabled]) {
    cursor: var(--vaadin-disabled-cursor);
    opacity: 0.5;
    pointer-events: var(--_vaadin-item-disabled-pointer-events, none);
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='checkmark'] {
    color: var(--vaadin-item-checkmark-color, inherit);
    display: var(--vaadin-item-checkmark-display, none);
    visibility: hidden;
  }

  [part='checkmark']::before {
    content: '';
    display: block;
    background: currentColor;
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-checkmark) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    width: var(--vaadin-icon-size, 1lh);
  }

  :host([selected]) [part='checkmark'] {
    visibility: visible;
  }

  [part='content'] {
    flex: 1;
    display: flex;
    align-items: center;
    column-gap: inherit;
    justify-content: var(--vaadin-item-text-align, start);
  }

  @media (forced-colors: active) {
    [part='checkmark']::before {
      background: CanvasText;
    }
  }
`;var Db=C`
  :host([aria-haspopup='true'])::after {
    background: var(--vaadin-text-color-secondary);
    content: '';
    display: block;
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-chevron-down) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    rotate: -90deg;
    width: var(--vaadin-icon-size, 1lh);
  }

  :host([dir='rtl'])::after {
    rotate: 90deg;
  }

  /* TODO would be nice to only reserve the space if
    one or mote items in the list is checkable  */
  :host([menu-item-checked]) [part='checkmark'] {
    visibility: visible;
  }
`,oc=[mi,Db];var ac=oc;var vl=class extends ro(I(J(O(A(S))))){static get is(){return"vaadin-menu-bar-item"}static get styles(){return ac}render(){return w`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}connectedCallback(){super.connectedCallback(),this.setAttribute("role","menuitem")}__shouldAllowFocusWhenDisabled(){return window.Vaadin.featureFlags.accessibleDisabledMenuItems}};E(vl);function lc(r,t){let{scrollLeft:e}=r;return t!=="rtl"?e:r.scrollWidth-r.clientWidth+e}function dc(r,t,e){t!=="rtl"?r.scrollLeft=e:r.scrollLeft=r.clientWidth-r.scrollWidth+e}var so=r=>class extends Be(r){get focused(){return(this._getItems()||[]).find(Pe)}get _vertical(){return!0}get _tabNavigation(){return!1}focus(e){let i=this._getFocusableIndex();i>=0&&this._focus(i,e)}_getFocusableIndex(){let e=this._getItems();return Array.isArray(e)?this._getAvailableIndex(e,0,null,i=>!Gt(i)):-1}_getItems(){return Array.from(this.children)}_onKeyDown(e){if(super._onKeyDown(e),e.metaKey||e.ctrlKey)return;let{key:i,shiftKey:s}=e,n=this._getItems()||[],a=n.indexOf(this.focused),d,c,m=!this._vertical&&this.getAttribute("dir")==="rtl"?-1:1;this.__isPrevKeyPressed(i,s)?(c=-m,d=a-m):this.__isNextKeyPressed(i,s)?(c=m,d=a+m):i==="Home"?(c=1,d=0):i==="End"&&(c=-1,d=n.length-1),d=this._getAvailableIndex(n,d,c,_=>!Gt(_)),!(this._tabNavigation&&i==="Tab"&&(d>a&&e.shiftKey||d<a&&!e.shiftKey||d===a))&&d>=0&&(e.preventDefault(),this._focus(d,{focusVisible:!0,preventScroll:!0},!0))}__isPrevKeyPressed(e,i){return this._vertical?e==="ArrowUp":e==="ArrowLeft"||this._tabNavigation&&e==="Tab"&&i}__isNextKeyPressed(e,i){return this._vertical?e==="ArrowDown":e==="ArrowRight"||this._tabNavigation&&e==="Tab"&&!i}_focus(e,i,s=!1){let n=this._getItems();this._focusItem(n[e],i,s)}_focusItem(e,i){e&&e.focus(i)}_getAvailableIndex(e,i,s,n){let a=e.length,d=i;for(let c=0;typeof d=="number"&&c<a;c+=1,d+=s||1){d<0?d=a-1:d>=a&&(d=0);let f=e[d];if(this._isItemFocusable(f)&&this.__isMatchingItem(f,n))return d}return-1}__isMatchingItem(e,i){return typeof i=="function"?i(e):!0}_isItemFocusable(e){return!e.hasAttribute("disabled")}};var no=r=>class extends so(r){static get properties(){return{disabled:{type:Boolean,value:!1,reflectToAttribute:!0},selected:{type:Number,reflectToAttribute:!0,notify:!0,sync:!0},orientation:{type:String,reflectToAttribute:!0,value:""},items:{type:Array,readOnly:!0,notify:!0},_searchBuf:{type:String,value:""}}}static get observers(){return["_enhanceItems(items, orientation, selected, disabled)"]}constructor(){super(),this._hasVaadinListMixin=!0}get _isRTL(){return!this._vertical&&this.getAttribute("dir")==="rtl"}get _scrollerElement(){return console.warn(`Please implement the '_scrollerElement' property in <${this.localName}>`),this}get _vertical(){return this.orientation!=="horizontal"}focus(e){this._observer&&this._observer.flush();let i=Array.isArray(this.items)?this.items:[],s=this._getAvailableIndex(i,0,null,n=>n.tabIndex===0&&!Gt(n));s>=0?this._focus(s,e):super.focus(e)}ready(){super.ready(),this.addEventListener("click",i=>this._onClick(i));let e=this.shadowRoot.querySelector("slot:not([name])");this._observer=new $e(e,()=>{this._setItems(this._filterItems([...this.children]))})}_getItems(){return this.items}_enhanceItems(e,i,s,n){if(!n&&e){this.setAttribute("aria-orientation",i||"vertical"),e.forEach(d=>Y(d,"orientation",i)),this._setFocusable(s<0||!s?0:s);let a=e[s];e.forEach(d=>{d.selected=d===a}),a&&!a.disabled&&this._scrollToItem(s)}}_filterItems(e){return e.filter(i=>i._hasVaadinItemMixin)}_onClick(e){if(e.metaKey||e.shiftKey||e.ctrlKey||e.defaultPrevented)return;let i=this._filterItems(e.composedPath())[0],s;i&&!i.disabled&&(s=this.items.indexOf(i))>=0&&(this.selected=s)}_searchKey(e,i){this._searchReset=ae.debounce(this._searchReset,Ge.after(500),()=>{this._searchBuf=""}),this._searchBuf+=i.toLowerCase(),this.items.some(n=>this.__isMatchingKey(n))||(this._searchBuf=i.toLowerCase());let s=this._searchBuf.length===1?e+1:e;return this._getAvailableIndex(this.items,s,1,n=>this.__isMatchingKey(n)&&getComputedStyle(n).display!=="none")}__isMatchingKey(e){return e.textContent.replace(/[^\p{L}\p{Nd}]/gu,"").toLowerCase().startsWith(this._searchBuf)}_onKeyDown(e){if(e.metaKey||e.ctrlKey)return;let i=e.key,s=this.items.indexOf(this.focused);if(/[\p{L}\p{Nd}]/u.test(i)&&i.length===1){let n=this._searchKey(s,i);n>=0&&this._focus(n);return}super._onKeyDown(e)}_setFocusable(e){e=this._getAvailableIndex(this.items,e,1);let i=this.items[e];this.items.forEach(s=>{s.tabIndex=s===i?0:-1})}_focus(e,i){this.items.forEach((s,n)=>{s.focused=n===e}),this._setFocusable(e),this._scrollToItem(e),super._focus(e,i??{preventScroll:!0})}_scrollToItem(e){let i=this._getItems()[e];i&&i.scrollIntoView({block:"nearest",inline:"nearest"})}_scroll(e){if(this._vertical)this._scrollerElement.scrollTop+=e;else{let i=this.getAttribute("dir")||"ltr",s=lc(this._scrollerElement,i)+e;dc(this._scrollerElement,i,s)}}_isItemFocusable(e){return e.disabled&&e.__shouldAllowFocusWhenDisabled?e.__shouldAllowFocusWhenDisabled():super._isItemFocusable(e)}};var oo=C`
  :host {
    --vaadin-item-checkmark-display: block;
    display: flex;
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='items'] {
    height: 100%;
    overflow-y: auto;
    width: 100%;
  }

  [part='items'] ::slotted(hr) {
    border-color: var(--vaadin-divider-color, var(--vaadin-border-color-secondary));
    border-width: 0 0 1px;
    margin: 4px 8px;
    margin-inline-start: calc(var(--vaadin-icon-size, 1lh) + var(--vaadin-item-gap, var(--vaadin-gap-s)) + 8px);
  }
`;var yl=class extends no(I(J(O(A(S))))){static get is(){return"vaadin-menu-bar-list-box"}static get styles(){return oo}static get properties(){return{orientation:{type:String,readOnly:!0}}}get _scrollerElement(){return this.shadowRoot.querySelector('[part="items"]')}render(){return w`
      <div part="items">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("role","menu")}};E(yl);var bl={start:"top",end:"bottom"},xl={start:"left",end:"right"},hc=new ResizeObserver(r=>{setTimeout(()=>{r.forEach(t=>{t.target.__overlay&&t.target.__overlay._updatePosition()})})}),_i=r=>class extends r{static get properties(){return{positionTarget:{type:Object,value:null,sync:!0},horizontalAlign:{type:String,value:"start",sync:!0},verticalAlign:{type:String,value:"top",sync:!0},noHorizontalOverlap:{type:Boolean,value:!1,sync:!0},noVerticalOverlap:{type:Boolean,value:!1,sync:!0},requiredVerticalSpace:{type:Number,value:0,sync:!0}}}constructor(){super(),this._hasOverlayPositionMixin=!0,this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}updated(e){if(super.updated(e),e.has("positionTarget")){let s=e.get("positionTarget");this.__oldContentWidth=void 0,this.__oldContentHeight=void 0,(!this.positionTarget&&s||this.positionTarget&&!s&&this.__margins)&&this.__resetPosition()}(e.has("opened")||e.has("positionTarget"))&&this.__updatePositionSettings(this.opened,this.positionTarget),["horizontalAlign","verticalAlign","noHorizontalOverlap","noVerticalOverlap","requiredVerticalSpace"].some(s=>e.has(s))&&this._updatePosition()}__addUpdatePositionEventListeners(){window.visualViewport.addEventListener("resize",this._updatePosition),window.visualViewport.addEventListener("scroll",this.__onScroll,!0),this.__positionTargetAncestorRootNodes=zh(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)}),this.positionTarget&&(this.__observePositionTargetMove=Vu(this.positionTarget,()=>{this._updatePosition()}))}__removeUpdatePositionEventListeners(){window.visualViewport.removeEventListener("resize",this._updatePosition),window.visualViewport.removeEventListener("scroll",this.__onScroll,!0),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null),this.__observePositionTargetMove&&(this.__observePositionTargetMove(),this.__observePositionTargetMove=null)}__updatePositionSettings(e,i){if(this.__removeUpdatePositionEventListeners(),i&&(i.__overlay=null,hc.unobserve(i),e&&(this.__addUpdatePositionEventListeners(),i.__overlay=this,hc.observe(i))),e){let s=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(n=>{this.__margins[n]=parseInt(s[n],10)})),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__onScroll(e){e.target instanceof Node&&this._deepContains(e.target)||this._updatePosition()}__resetPosition(){this.__margins=null,Object.assign(this.style,{justifyContent:"",alignItems:"",top:"",bottom:"",left:"",right:""}),ve(this,"bottom-aligned",!1),ve(this,"top-aligned",!1),ve(this,"end-aligned",!1),ve(this,"start-aligned",!1)}_updatePosition(){if(!this.positionTarget||!this.opened||!this.__margins)return;let e=this.positionTarget.getBoundingClientRect();if(e.width===0&&e.height===0&&this.opened){this.opened=!1;return}let i=this.__shouldAlignStartVertically(e);this.style.justifyContent=i?"flex-start":"flex-end";let s=this.__isRTL,n=this.__shouldAlignStartHorizontally(e,s),a=!s&&n||s&&!n;this.style.alignItems=a?"flex-start":"flex-end";let d=this.getBoundingClientRect(),c=this.__calculatePositionInOneDimension(e,d,this.noVerticalOverlap,bl,this,i),f=this.__calculatePositionInOneDimension(e,d,this.noHorizontalOverlap,xl,this,n);Object.assign(this.style,c,f),ve(this,"bottom-aligned",!i),ve(this,"top-aligned",i),ve(this,"end-aligned",!a),ve(this,"start-aligned",a)}__shouldAlignStartHorizontally(e,i){let s=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;let n=Math.min(window.innerWidth,document.documentElement.clientWidth),a=!i&&this.horizontalAlign==="start"||i&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,s,n,this.__margins,a,this.noHorizontalOverlap,xl)}__shouldAlignStartVertically(e){let i=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;let s=Math.min(window.innerHeight,document.documentElement.clientHeight),n=this.verticalAlign==="top";return this.__shouldAlignStart(e,i,s,this.__margins,n,this.noVerticalOverlap,bl)}__shouldAlignStart(e,i,s,n,a,d,c){let f=s-e[d?c.end:c.start]-n[c.end],m=e[d?c.start:c.end]-n[c.start],_=a?f:m,b=_>(a?m:f)||_>i;return a===b}__adjustBottomProperty(e,i,s){let n;if(e===i.end){if(i.end===bl.end){let a=Math.min(window.innerHeight,document.documentElement.clientHeight);if(s>a&&this.__oldViewportHeight){let d=this.__oldViewportHeight-a;n=s-d}this.__oldViewportHeight=a}if(i.end===xl.end){let a=Math.min(window.innerWidth,document.documentElement.clientWidth);if(s>a&&this.__oldViewportWidth){let d=this.__oldViewportWidth-a;n=s-d}this.__oldViewportWidth=a}}return n}__calculatePositionInOneDimension(e,i,s,n,a,d){let c=d?n.start:n.end,f=d?n.end:n.start,m=parseFloat(a.style[c]||getComputedStyle(a)[c]),_=this.__adjustBottomProperty(c,n,m),v=i[d?n.start:n.end]-e[s===d?n.end:n.start],b=_?`${_}px`:`${m+v*(d?-1:1)}px`;return{[c]:b,[f]:""}}};var uc=r=>class extends jn(_i(r)){static get properties(){return{parentOverlay:{type:Object,readOnly:!0},_theme:{type:String,readOnly:!0,sync:!0}}}static get observers(){return["_themeChanged(_theme)"]}get _contentRoot(){return this._rendererRoot}get _rendererRoot(){if(!this.__savedRoot){let e=document.createElement("div");e.setAttribute("slot","overlay"),e.style.display="contents",this.owner.appendChild(e),this.__savedRoot=e}return this.__savedRoot}ready(){super.ready(),this.restoreFocusOnClose=!0,this.addEventListener("keydown",e=>{if(!e.defaultPrevented&&e.composedPath()[0]===this.$.overlay&&[38,40].indexOf(e.keyCode)>-1){let i=this.owner._menuListBox??this._contentRoot.firstElementChild;i&&Array.isArray(i.items)&&i.items.length&&(e.preventDefault(),e.keyCode===38?i.items[i.items.length-1].focus():i.focus())}})}_themeChanged(){this.close()}_shouldCloseOnOutsideClick(e){return this.parentOverlay||e.composedPath().includes(this)?!1:this.owner.items?!0:super._shouldCloseOnOutsideClick(e)}getBoundaries(){let e=this.getBoundingClientRect(),i=this.$.overlay.getBoundingClientRect(),s=e.bottom-i.height,n=this.parentOverlay;if(n?.hasAttribute("bottom-aligned")){let a=getComputedStyle(n);s=s-parseFloat(a.bottom)-parseFloat(a.height)}return{xMax:e.right-i.width,xMin:e.left+i.width,yMax:s}}_updatePosition(){if(super._updatePosition(),this.positionTarget&&this.parentOverlay&&this.opened){let e=this.$.content,i=getComputedStyle(e);!!this.style.left?this.style.left=`${parseFloat(this.style.left)+parseFloat(i.paddingLeft)}px`:this.style.right=`${parseFloat(this.style.right)+parseFloat(i.paddingRight)}px`,!!this.style.bottom?this.style.bottom=`${parseFloat(this.style.bottom)-parseFloat(i.paddingBottom)}px`:this.style.top=`${parseFloat(this.style.top)-parseFloat(i.paddingTop)}px`}}_shouldRestoreFocus(){return this.parentOverlay?!1:super._shouldRestoreFocus()}_deepContains(e){return this.owner.contains(e)}};var cc=C`
  :host {
    align-items: flex-start;
    justify-content: flex-start;
  }

  :host([right-aligned]),
  :host([end-aligned]) {
    align-items: flex-end;
  }

  :host([bottom-aligned]) {
    justify-content: flex-end;
  }

  [part='backdrop'] {
    background: transparent;
  }

  [part='content'] {
    padding: var(--vaadin-item-overlay-padding, 4px);
  }

  /* TODO keyboard focus becomes visible even when navigating the menu with the mouse */
  [part='overlay']:focus-visible {
    outline: none;
  }
`;var fc=[Xe,cc];var wl=class extends uc(Ze(J(I(O(A(S)))))){static get is(){return"vaadin-menu-bar-overlay"}static get styles(){return fc}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}_shouldCloseOnOutsideClick(t){return t.composedPath().includes(this.owner.listenOn)?!1:super._shouldCloseOnOutsideClick(t)}render(){return w`
      <div id="backdrop" part="backdrop" ?hidden="${!this.withBackdrop}"></div>
      <div part="overlay" id="overlay" tabindex="0">
        <div part="content" id="content">
          <slot></slot>
          <slot name="submenu"></slot>
        </div>
      </div>
    `}};E(wl);var kt=class{#e=null;constructor(t,e){this.query=t,this.callback=e}hostConnected(){this.#i(),this.#e=window.matchMedia(this.query),this.#t(),this.#r(this.#e)}hostDisconnected(){this.#i()}#t(){this.#e&&this.#e.addListener(this.#r)}#i(){this.#e&&this.#e.removeListener(this.#r),this.#e=null}#r=t=>{typeof this.callback=="function"&&this.callback(t.matches)}};var gr=class extends ie{constructor(t){super(t,"tooltip")}initCustomNode(t){t.manual=!0,t.generator||=({item:e})=>e?.tooltip}_getItem(t){return t._item}_getDefaultPosition(t){let e=this._getItem(t);return e.children?.length>0&&!e.disabled?"start":"end"}setTarget(t){let e=this.node;if(!e)return;let i=t?this._getItem(t):null;i?.tooltip?(e.target=t,e.context={item:i},e._position=i.tooltipPosition||this._getDefaultPosition(t)):(e.target=null,e.context={item:null},this.close(!0))}open({trigger:t}){let e=this.node;e?.isConnected&&e.target&&e._stateController.open({hover:t==="hover",focus:t==="focus"})}bringToFront(){this.node?._overlayElement?.bringToFront()}close(t){this.node?._stateController.close(t)}};var pc=r=>class extends r{static get properties(){return{items:{type:Array,sync:!0},_positionTarget:{type:Object,sync:!0}}}get _tagNamePrefix(){return"vaadin-context-menu"}disconnectedCallback(){super.disconnectedCallback(),this._tooltipController.setTarget(null)}__forwardFocus(){let e=this._overlayElement,i=this._menuListBox??e._contentRoot.firstElementChild;e.parentOverlay?e.parentOverlay._contentRoot.querySelector("[expanded]")?.hasAttribute("focused")&&i?i.focus():e.$.overlay.focus():i&&i.focus()}__openSubMenu(e,i){this.__updateSubMenuForItem(e,i);let s=this._overlayElement,n=e._overlayElement;n._setParentOverlay(s),Y(e,"theme",s.getAttribute("theme")),Y(e,"dir",this.dir);let a=n.$.content;a.style.minWidth="",i.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:i._item.children}}))}__updateSubMenuForItem(e,i){e.items=i._item.children,e.listenOn=i,e._positionTarget=i,e._overlayElement.requestContentUpdate()}__createComponent(e){let i;return e.component instanceof HTMLElement?i=e.component:i=document.createElement(e.component||`${this._tagNamePrefix}-item`),i._hasVaadinItemMixin&&(i.setAttribute("role","menuitem"),i.tabIndex=-1),i.localName==="hr"?i.setAttribute("role","separator"):i.setAttribute("aria-haspopup","false"),this._setMenuItemTheme(i,e,this._theme),i._item=e,e.text&&(i.textContent=e.text),e.className&&i.setAttribute("class",e.className),this.__toggleMenuComponentAttribute(i,"menu-item-checked",e.checked),this.__toggleMenuComponentAttribute(i,"disabled",e.disabled),e.children&&e.children.length&&(this.__updateExpanded(i,!1),i.setAttribute("aria-haspopup","true")),i}__initListBox(){let e=document.createElement(`${this._tagNamePrefix}-list-box`);return this._theme&&e.setAttribute("theme",this._theme),e.addEventListener("mouseover",i=>{let s=i.target.closest(`${this._tagNamePrefix}-item`);this._tooltipController.setTarget(s),this._tooltipController.open({trigger:"hover"})}),e.addEventListener("mouseleave",()=>{this._tooltipController.close(!0)}),e.addEventListener("focusin",i=>{if(!ce())return;let s=i.target.closest(`${this._tagNamePrefix}-item`);this._tooltipController.setTarget(s),this._tooltipController.open({trigger:"focus"})}),e.addEventListener("selected-changed",i=>{let{value:s}=i.detail;if(typeof s=="number"){let n=e.items[s]._item;e.selected=null,n.children||this.dispatchEvent(new CustomEvent("item-selected",{detail:{value:n}}))}}),e}__initOverlay(){let e=this._overlayElement;e.$.backdrop.addEventListener("click",()=>{this.close()}),e.addEventListener("vaadin-overlay-outside-click",()=>{this.dispatchEvent(new CustomEvent("items-outside-click"))}),e.addEventListener(Zt?"click":"mouseover",i=>{i.composedPath().includes(this._subMenu)||this.__showSubMenu(i)}),e.addEventListener("keydown",i=>{if(i.composedPath().includes(this._subMenu))return;let{key:s}=i,n=this.__isRTL,a=s==="ArrowRight",d=s==="ArrowLeft";!n&&a||n&&d||s==="Enter"||s===" "?this.__showSubMenu(i):!n&&d||n&&a||s==="Escape"?(s==="Escape"&&i.stopPropagation(),this.close(),this.listenOn.focus()):s==="Tab"&&!i.defaultPrevented&&this.dispatchEvent(new CustomEvent("close-all-menus"))})}__initSubMenu(){let e=document.createElement(this.constructor.is);return e._tooltipController=this._tooltipController,e.__parentMenu=this,e._modeless=!0,e.openOn="opensubmenu",this.addEventListener("opened-changed",i=>{i.detail.value||this._subMenu.close()}),e.addEventListener("close-all-menus",()=>{this.dispatchEvent(new CustomEvent("close-all-menus"))}),e.addEventListener("item-selected",i=>{let{detail:s}=i;this.dispatchEvent(new CustomEvent("item-selected",{detail:s}))}),this.addEventListener("close-all-menus",()=>{this.close()}),this.addEventListener("item-selected",i=>{let s=i.target,n=i.detail.value,a=s.items.indexOf(n);n.keepOpen&&a>-1&&s.opened?(s.__selectedIndex=a,s.requestContentUpdate()):n.keepOpen||this.close()}),e.addEventListener("opened-changed",i=>{if(i.detail.value)this._tooltipController.bringToFront();else{let n=this._listBox.querySelector("[expanded]");n&&this.__updateExpanded(n,!1)}}),e}__showSubMenu(e,i=e.composedPath().find(s=>s.localName===`${this._tagNamePrefix}-item`)){if(!this.__openListenerActive)return;if(this._overlayElement.hasAttribute("opening")){requestAnimationFrame(()=>{this.__showSubMenu(e,i)});return}let s=this._subMenu,n=this._listBox.querySelector("[expanded]");if(i&&i!==n&&!i.disabled){let{children:a}=i._item,c=s._overlayElement._contentRoot.firstElementChild?.focused;if(n&&this.__updateExpanded(n,!1),(!a||!a.length)&&s.close(),!this.opened)return;a?.length?(this.__updateExpanded(i,!0),this.__openSubMenu(s,i)):c?s.listenOn.focus():this._listBox.focused||this._overlayElement.$.overlay.focus()}i?.disabled&&s.close()}get _menuListBox(){return this.__slottedListBox??this._overlayElement._contentRoot.querySelector(`${this._tagNamePrefix}-list-box`)}__itemsRenderer(e,i){this.__initMenu(e,i),this._subMenu.closeOn=i.closeOn,this._listBox.innerHTML="",i.items.forEach(s=>{let n=this.__createComponent(s);this._listBox.appendChild(n)})}_setMenuItemTheme(e,i,s){let n=e.getAttribute("theme")||s;i.theme!=null&&(n=Array.isArray(i.theme)?i.theme.join(" "):i.theme),this.__updateTheme(e,n)}__toggleMenuComponentAttribute(e,i,s){s?(e.setAttribute(i,""),e[`__has-${i}`]=!0):e[`__has-${i}`]&&(e.removeAttribute(i),e[`__has-${i}`]=!1)}__initMenu(e,i){if(e.firstElementChild)this.__updateTheme(this._listBox,this._theme);else{this.__initOverlay();let s=this.__initListBox();this._listBox=s,e.appendChild(s);let n=this.__initSubMenu();n.slot="submenu",this._subMenu=n,this.appendChild(n),requestAnimationFrame(()=>{this.__openListenerActive=!0})}}__updateExpanded(e,i){e.setAttribute("aria-expanded",i.toString()),e.toggleAttribute("expanded",i)}__updateTheme(e,i){Y(e,"theme",i)}close(){this.__parentMenu||this._tooltipController.close(!0)}};var mc=r=>class extends pc(r){static get properties(){return{selector:{type:String},opened:{type:Boolean,reflectToAttribute:!0,observer:"_openedChanged",value:!1,notify:!0,readOnly:!0,sync:!0},openOn:{type:String,value:"vaadin-contextmenu",sync:!0},listenOn:{type:Object,sync:!0,value(){return this}},closeOn:{type:String,value:"click",observer:"_closeOnChanged",sync:!0},renderer:{type:Function,sync:!0},__slottedListBox:{type:Object,sync:!0},_modeless:{type:Boolean,sync:!0},_context:{type:Object,sync:!0},_phone:{type:Boolean},_fullscreen:{type:Boolean},_fullscreenMediaQuery:{type:String,value:"(max-width: 450px), (max-height: 450px)"}}}static get observers(){return["_targetOrOpenOnChanged(listenOn, openOn)","_fullscreenChanged(_fullscreen)"]}constructor(){super(),this._boundOpen=this.open.bind(this),this._boundClose=this.close.bind(this),this._boundPreventDefault=this._preventDefault.bind(this),this.__onGlobalContextMenu=this.__onGlobalContextMenu.bind(this)}connectedCallback(){super.connectedCallback(),this.__boundOnScroll=this.__onScroll.bind(this),window.addEventListener("scroll",this.__boundOnScroll,!0),document.documentElement.addEventListener("contextmenu",this.__onGlobalContextMenu,!0),this.__restoreOpened&&this._setOpened(!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("scroll",this.__boundOnScroll,!0),document.documentElement.removeEventListener("contextmenu",this.__onGlobalContextMenu,!0),this.__restoreOpened=this.opened,setTimeout(()=>{this.isConnected||this.close()})}firstUpdated(){super.firstUpdated(),this._overlayElement=this.$.overlay,this.addController(new kt(this._fullscreenMediaQuery,e=>{this._fullscreen=e})),this._tooltipController||(this._tooltipController=new gr(this),this.addController(this._tooltipController))}updated(e){if(super.updated(e),e.has("renderer")||e.has("items")||e.has("__slottedListBox")){if([this.items,this.renderer,this.__slottedListBox].filter(Boolean).length>1)throw new Error('The "items", "renderer", and slotted "<vaadin-context-menu-list-box>" cannot be used together.');this.items&&this.closeOn==="click"&&(this.closeOn="")}}_onOverlayOpened(e){if(e.target!==this._overlayElement)return;e.detail.value?(this._setOpened(!0),this.__alignOverlayPosition()):this.opened&&this.close()}_onVaadinOverlayOpen(e){e.target===this._overlayElement&&(this.__alignOverlayPosition(),this._overlayElement.style.visibility="",this.__forwardFocus())}_onVaadinOverlayClosed(){this.dispatchEvent(new CustomEvent("closed"))}_targetOrOpenOnChanged(e,i){this._oldListenOn&&this._oldOpenOn&&(this._unlisten(this._oldListenOn,this._oldOpenOn,this._boundOpen),this._oldListenOn.style.webkitTouchCallout="",this._oldListenOn.style.webkitUserSelect="",this._oldListenOn.style.userSelect="",this._oldListenOn=null,this._oldOpenOn=null),e&&i&&(this._listen(e,i,this._boundOpen),this._oldListenOn=e,this._oldOpenOn=i)}_fullscreenChanged(e){this._phone=e}__setListenOnUserSelect(e){let i=e?"none":"";this.listenOn.style.webkitTouchCallout=i,this.listenOn.style.webkitUserSelect=i,this.listenOn.style.userSelect=i,e&&document.getSelection().removeAllRanges()}_closeOnChanged(e,i){let s="vaadin-overlay-outside-click",n=this._overlayElement;i&&this._unlisten(n,i,this._boundClose),e?(this._listen(n,e,this._boundClose),n.removeEventListener(s,this._boundPreventDefault)):n.addEventListener(s,this._boundPreventDefault)}_preventDefault(e){this.items||e.preventDefault()}_openedChanged(e){this.__setListenOnUserSelect(e)}requestContentUpdate(){this._overlayElement&&(this.__preserveMenuState(),this._overlayElement.requestContentUpdate(),this.__restoreMenuState())}close(){super.close(),this._setOpened(!1)}__getComposedPath(e){return e.__composedPath??e.detail?.sourceEvent?.__composedPath??e.composedPath()}_contextTarget(e){if(this.selector){let i=this.listenOn.querySelectorAll(this.selector);return Array.prototype.filter.call(i,s=>this.__getComposedPath(e).indexOf(s)>-1)[0]}else if(this.listenOn&&this.listenOn!==this&&this.position)return this.listenOn;return e.target}open(e){this._overlayElement&&this.__getComposedPath(e).includes(this._overlayElement)||e&&!this.opened&&(this._context={detail:e.detail,target:this._contextTarget(e)},this._context.target&&(e.preventDefault(),e.stopPropagation(),this.__x=this._getEventCoordinate(e,"x"),this.__pageXOffset=window.pageXOffset,this.__y=this._getEventCoordinate(e,"y"),this.__pageYOffset=window.pageYOffset,this._overlayElement.style.visibility="hidden",this._setOpened(!0)))}__preserveMenuState(){let e=this._menuListBox;e&&(this.__focusedIndex=e.items.indexOf(e.focused),this._subMenu&&this._subMenu.opened&&(this.__subMenuIndex=e.items.indexOf(this._subMenu.listenOn)))}__restoreMenuState(){let e=this.__focusedIndex,i=this.__subMenuIndex,s=this.__selectedIndex,n=this._menuListBox;if(n){if(n._observer?.flush(),i>-1){let a=n.items[i];a?Array.isArray(a._item.children)&&a._item.children.length?(this.__updateSubMenuForItem(this._subMenu,a),this._subMenu.requestContentUpdate()):(this._subMenu.close(),this.__focusItem(a)):n.focus()}this.__focusItem(s>-1?n.children[s]:n.items[e])}this.__focusedIndex=void 0,this.__subMenuIndex=void 0,this.__selectedIndex=void 0}__focusItem(e){e&&e.focus({focusVisible:ce()})}__onOverlaySlotChange(e){this.__slottedListBox=e.target.assignedElements().find(i=>i._hasVaadinListMixin)}__onScroll(){if(!this.opened||this.position)return;let e=window.pageYOffset-this.__pageYOffset,i=window.pageXOffset-this.__pageXOffset;this.__adjustPosition("left",-i),this.__adjustPosition("right",i),this.__adjustPosition("top",-e),this.__adjustPosition("bottom",e),this.__pageYOffset+=e,this.__pageXOffset+=i}__adjustPosition(e,i){let n=this._overlayElement.style;n[e]=`${(parseInt(n[e])||0)+i}px`}__alignOverlayPosition(){let e=this._overlayElement;if(e.positionTarget)return;let i=e.style;["top","right","bottom","left"].forEach(_=>i.removeProperty(_)),["right-aligned","end-aligned","bottom-aligned"].forEach(_=>e.removeAttribute(_));let{xMax:s,xMin:n,yMax:a}=e.getBoundaries(),d=this.__x,c=this.__y,f=document.documentElement.clientWidth,m=document.documentElement.clientHeight;this.__isRTL?d>f/2||d>n?i.right=`${Math.max(0,f-d)}px`:(i.left=`${d}px`,this._setEndAligned(e)):d<f/2||d<s?i.left=`${d}px`:(i.right=`${Math.max(0,f-d)}px`,this._setEndAligned(e)),c<m/2||c<a?i.top=`${c}px`:(i.bottom=`${Math.max(0,m-c)}px`,e.setAttribute("bottom-aligned",""))}_setEndAligned(e){e.setAttribute("end-aligned",""),this.__isRTL||e.setAttribute("right-aligned","")}_getEventCoordinate(e,i){if(e.detail instanceof Object){if(e.detail[i])return e.detail[i];if(e.detail.sourceEvent)return this._getEventCoordinate(e.detail.sourceEvent,i)}else{let s=`client${i.toUpperCase()}`,n=e.changedTouches?e.changedTouches[0][s]:e[s];if(n===0){let d=(this.__getComposedPath(e)[0]||e.target).getBoundingClientRect();return i==="x"?d.left:d.top+d.height}return n}}_listen(e,i,s){di[i]?qt(e,i,s):e.addEventListener(i,s)}_unlisten(e,i,s){di[i]?ku(e,i,s):e.removeEventListener(i,s)}__createMouseEvent(e,i,s){return new MouseEvent(e,{bubbles:!0,composed:!0,cancelable:!0,clientX:i,clientY:s})}__focusClosestFocusable(e){let i=e;for(;i;){if(i instanceof HTMLElement&&Vi(i)){i.focus();return}i=i.assignedSlot||i.parentNode||i.host}}__contextMenuAt(e,i){let s=il(e,i);s&&queueMicrotask(()=>{this.__focusClosestFocusable(s),s.dispatchEvent(this.__createMouseEvent("contextmenu",e,i))})}__onGlobalContextMenu(e){this.opened&&(e.shiftKey||(Ru||fi||(e.stopPropagation(),this._overlayElement.__focusRestorationController.focusNode=null,this._overlayElement.addEventListener("vaadin-overlay-closed",s=>{s.target===this._overlayElement&&this.__contextMenuAt(e.clientX,e.clientY)},{once:!0})),e.preventDefault(),this.close()))}};var Cl=class extends mc(J(bt(O(S)))){static get is(){return"vaadin-menu-bar-submenu"}static get styles(){return C`
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none !important;
      }
    `}static get properties(){return{isRoot:{type:Boolean,reflectToAttribute:!0,sync:!0}}}constructor(){super(),this.openOn="opensubmenu"}firstUpdated(t){this._tooltipController=this.parentElement._tooltipController,super.firstUpdated(t)}get _tagNamePrefix(){return"vaadin-menu-bar"}render(){return w`
      <vaadin-menu-bar-overlay
        id="overlay"
        .owner="${this}"
        .opened="${this.opened}"
        .model="${this._context}"
        .modeless="${this._modeless}"
        .renderer="${this.__itemsRenderer}"
        .withBackdrop="${this._phone}"
        .positionTarget="${this._positionTarget}"
        ?no-horizontal-overlap="${!this.isRoot}"
        ?phone="${this._phone}"
        theme="${re(this._theme)}"
        exportparts="backdrop, overlay, content"
        @opened-changed="${this._onOverlayOpened}"
        @vaadin-overlay-open="${this._onVaadinOverlayOpen}"
      >
        <slot name="overlay"></slot>
        <slot name="submenu" slot="submenu"></slot>
      </vaadin-menu-bar-overlay>
    `}_openedChanged(){}__onGlobalContextMenu(){}close(){super.close(),this.isRoot&&this.parentElement._close()}};E(Cl);var _c=C`
  :host {
    flex-shrink: 0;
  }

  :host([focus-ring]) {
    z-index: 1;
  }

  :host([slot='overflow']) {
    margin-inline-end: 0;
  }

  .vaadin-button-container {
    gap: inherit;
  }

  :host(:not([slot='overflow'])[aria-haspopup]) [part='suffix'] {
    display: flex;
    align-items: center;
    gap: inherit;
  }

  :host(:not([slot='overflow'])[aria-haspopup]) [part='suffix']::after {
    background: currentColor;
    content: '';
    height: var(--vaadin-icon-size, 1lh);
    mask: var(--_vaadin-icon-chevron-down) 50% / var(--vaadin-icon-visual-size, 100%) no-repeat;
    width: var(--vaadin-icon-size, 1lh);
  }

  ::slotted(vaadin-menu-bar-item) {
    padding: 0;
    gap: 0;
  }

  ::slotted(vaadin-menu-bar-item)::after {
    display: none;
  }
`;var Sl=class extends zi{static get is(){return"vaadin-menu-bar-button"}static get styles(){return[super.styles,_c]}_onKeyDown(t){this.__triggeredWithActiveKeys=this._activeKeys.includes(t.key),super._onKeyDown(t),this.__triggeredWithActiveKeys=null}_setActive(t){!t&&this.hasAttribute("expanded")||super._setActive(t)}__shouldSuppressInteractionEvent(t){return t.type==="keydown"&&["ArrowLeft","ArrowRight"].includes(t.key)?!1:super.__shouldSuppressInteractionEvent(t)}};E(Sl);var gc=C`
  :host {
    display: block;
    min-width: 0;
  }

  :host([hidden]) {
    display: none !important;
  }

  /* Keep the width measured with all buttons in flow while the host is frozen */
  :host([overflow-frozen]) {
    contain: inline-size !important;
    contain-intrinsic-inline-size: var(--_vaadin-menu-bar-content-width);
  }

  [part='container'] {
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    width: 100%;
    --_gap: var(--vaadin-menu-bar-gap, 0px);
    --_bw: var(--vaadin-button-border-width, 1px);
    gap: var(--_gap);
    --_rad-button: var(--vaadin-button-border-radius, var(--vaadin-radius-m));
  }

  :host(:not([has-single-button])) ::slotted(vaadin-menu-bar-button:not(:first-of-type)) {
    margin-inline-start: min(var(--_bw) * -1 + var(--_gap) * 1000, 0px);
  }

  ::slotted(vaadin-menu-bar-button) {
    border-radius: 0;
  }

  ::slotted([first-visible]),
  :host([has-single-button]) ::slotted([slot='overflow']),
  ::slotted(vaadin-menu-bar-button[theme~='tertiary']) {
    border-start-start-radius: var(--_rad-button);
    border-end-start-radius: var(--_rad-button);
  }

  ::slotted(:is([last-visible], [slot='overflow'])),
  ::slotted(vaadin-menu-bar-button[theme~='tertiary']) {
    border-start-end-radius: var(--_rad-button);
    border-end-end-radius: var(--_rad-button);
  }

  :host([theme~='end-aligned']) ::slotted(vaadin-menu-bar-button[first-visible]),
  :host([theme~='end-aligned'][has-single-button]) ::slotted(vaadin-menu-bar-button) {
    margin-inline-start: auto;
  }
`;var Mb=["__proto__","constructor","prototype"],ao=r=>{if(!r||typeof r!="object")return!1;let t=Object.getPrototypeOf(r);return t===Object.prototype||t===null};function vc(r,t,e){return!ao(r)||!ao(t)||Object.keys(t).forEach(i=>{if(Mb.includes(i))return;let s=t[i];if(ao(s)){if(!Object.hasOwn(r,i)||!ao(r[i])){if(e&&Object.hasOwn(r,i)&&r[i])return;r[i]={}}vc(r[i],s,e)}else e&&Array.isArray(s)?r[i]=[...s]:(!e||s!=null)&&(r[i]=s)}),r}function kl(r,...t){return t.forEach(e=>vc(r,e,!0)),r}var Et=r=>class extends r{static get properties(){return{i18n:{type:Object},__effectiveI18n:{type:Object,sync:!0}}}static get defaultI18n(){return{}}constructor(){super(),this.i18n=kl({},this.constructor.defaultI18n)}get i18n(){return this.__customI18n}set i18n(e){e!==this.__customI18n&&(this.__customI18n=e,this.__effectiveI18n=kl({},this.constructor.defaultI18n,this.__customI18n))}};var lo=new ResizeObserver(r=>{setTimeout(()=>{r.forEach(t=>{t.target.isConnected&&(t.target.resizables?t.target.resizables.forEach(e=>{e._onResize(t.contentRect)}):t.target._onResize(t.contentRect))})})}),Ib=r=>class extends r{get _observeParent(){return!1}connectedCallback(){if(super.connectedCallback(),lo.observe(this),this._observeParent){let e=this.parentNode instanceof ShadowRoot?this.parentNode.host:this.parentNode;e.resizables||(e.resizables=new Set,lo.observe(e)),e.resizables.add(this),this.__parent=e}}disconnectedCallback(){super.disconnectedCallback(),lo.unobserve(this);let e=this.__parent;if(this._observeParent&&e){let i=e.resizables;i&&(i.delete(this),i.size===0&&lo.unobserve(e)),this.__parent=null}}_onResize(e){}},vr=ge(Ib);var ho=class extends gr{_getItem(t){return t.localName==="vaadin-menu-bar-button"?t.item:super._getItem(t)}_getDefaultPosition(t){return t.localName==="vaadin-menu-bar-button"?"bottom":super._getDefaultPosition(t)}};var El=class extends oi{update(t,[{component:e,text:i}]){let{parentNode:s,startNode:n}=t,a=e||(i?document.createTextNode(i):null),d=this.getOldNode(t);return d===a?lt:(d&&a?s.replaceChild(a,d):d?s.removeChild(d):a&&n.after(a),lt)}getOldNode(t){let{startNode:e,endNode:i}=t;return e.nextSibling===i?null:e.nextSibling}},Ab=gt(El),Pb={moreOptions:"More options"},yc=.1,bc=r=>class extends Et(so(vr(Me(Fe(r))))){static get properties(){return{items:{type:Array,sync:!0,value:()=>[]},openOnHover:{type:Boolean},reverseCollapse:{type:Boolean,sync:!0},tabNavigation:{type:Boolean,sync:!0}}}static get defaultI18n(){return Pb}get i18n(){return super.i18n}set i18n(e){super.i18n=e}constructor(){super(),this.__boundOnContextMenuKeydown=this.__onContextMenuKeydown.bind(this)}get focused(){return(this._getItems()||[]).find(Pe)||this._expandedButton}get _vertical(){return!1}get _tabNavigation(){return this.tabNavigation}get _observeParent(){return!0}get _buttons(){return Array.from(this.querySelectorAll("vaadin-menu-bar-button"))}get _hasOverflow(){return this._overflow&&!this._overflow.hasAttribute("hidden")}set _hasOverflow(e){this._overflow&&this._overflow.toggleAttribute("hidden",!e)}ready(){super.ready(),this.setAttribute("role","menubar"),this._subMenuController=new ie(this,"submenu","vaadin-menu-bar-submenu",{initializer:e=>{e.setAttribute("is-root",""),e.addEventListener("item-selected",this.__onItemSelected.bind(this)),e.addEventListener("close-all-menus",this.__onEscapeClose.bind(this)),e._overlayElement._contentRoot.addEventListener("keydown",this.__boundOnContextMenuKeydown),this._subMenu=e}}),this._overflowController=new ie(this,"overflow","vaadin-menu-bar-button",{initializer:e=>{e.setAttribute("hidden","");let i=document.createElement("div");i.setAttribute("aria-hidden","true"),i.innerHTML="&centerdot;".repeat(3),e.appendChild(i),e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded","false"),e.setAttribute("role",this.tabNavigation?"button":"menuitem"),this._overflow=e}}),this._tooltipController=new ho(this),this.addEventListener("mousedown",()=>this._tooltipController.close(!0)),this.addEventListener("mouseleave",()=>this._tooltipController.close()),this.addController(this._tooltipController),this.addController(this._subMenuController),this.addController(this._overflowController),this._container=this.shadowRoot.querySelector('[part="container"]')}updated(e){super.updated(e),(e.has("items")||e.has("_theme")||e.has("disabled"))&&this.__renderButtons(this.items),(e.has("items")||e.has("_theme")||e.has("reverseCollapse"))&&this.__scheduleOverflow(),e.has("items")&&this.__updateSubMenu(),e.has("_theme")&&this._themeChanged(this._theme),e.has("dir")&&Y(this._subMenu,"dir",this.dir),e.has("disabled")&&this._overflow.toggleAttribute("disabled",this.disabled),e.has("tabNavigation")&&this._tabNavigationChanged(this.tabNavigation),e.has("__effectiveI18n")&&this.__i18nChanged(this.__effectiveI18n)}_getItems(){return this._buttons}disconnectedCallback(){super.disconnectedCallback(),this._tooltipController.setTarget(null)}_onResize(){this.__scheduleOverflow()}_themeChanged(e){Y(this._overflow,"theme",e),Y(this._subMenu,"theme",e)}_tabNavigationChanged(e){let i=this.querySelector('[tabindex="0"]');this._buttons.forEach(s=>{i?this._setTabindex(s,s===i):this._setTabindex(s,!1),s.setAttribute("role",e?"button":"menuitem")}),this.setAttribute("role",e?"group":"menubar")}__updateSubMenu(){let e=this._subMenu;if(e?.opened){let i=e._positionTarget;(!i.isConnected||!Array.isArray(i.item.children)||i.item.children.length===0)&&e.close()}}__i18nChanged(e){e?.moreOptions!==void 0&&Y(this._overflow,"aria-label",e.moreOptions)}__getOverflowCount(e){return e.item?.children?.length??0}__restoreButtons(e){e.forEach(i=>{i.style.visibility="",i.style.position="";let s=i.item?.component;s instanceof HTMLElement&&s.getAttribute("role")==="menuitem"&&this.__restoreItem(i,s)})}__restoreState(e){this.__restoreButtons(e),this.__updateOverflow([]),this.toggleAttribute("has-single-button",e.length===1),this.__updateVisibleAttributes(e)}__restoreItem(e,i){e.appendChild(i),i.removeAttribute("role"),i.removeAttribute("aria-expanded"),i.removeAttribute("aria-haspopup"),i.removeAttribute("tabindex")}__updateOverflow(e){this._overflow.item={children:e},this._hasOverflow=e.length>0}__getInlineEnd(e){let{left:i,right:s}=e.getBoundingClientRect();return this.__isRTL?-i:s}__isPastContainerEnd(e){return this.__getInlineEnd(e)>this.__getInlineEnd(this._container)+yc}__getOverflowLayout(e,i){let s=this.__isRTL,n=e.map(m=>m.getBoundingClientRect()),a=n.map(({left:m,right:_})=>s?-m:_),d=this.__getInlineEnd(i),c=this._container.getBoundingClientRect(),f=s?-c.right:c.left;return{starts:n.map(({left:m,right:_})=>s?-_:m),ends:a,margins:e.map(m=>parseFloat(getComputedStyle(m).marginInlineStart)||0),overflowExtent:d-a.at(-1),containerWidth:c.width,contentWidth:d-f}}__getButtonsToCollapse(e,{starts:i,ends:s,margins:n,overflowExtent:a,containerWidth:d}){let c=0,f=e.length-1;for(;c<=f&&n[c]+s[f]-i[c]+a>d+yc;)this.reverseCollapse?c+=1:f-=1;return e.filter((m,_)=>_<c||_>f)}__freezeWidth(e){this.style.setProperty("--_vaadin-menu-bar-content-width",`${e}px`),this.setAttribute("overflow-frozen","")}__unfreezeWidth(){this.style.removeProperty("--_vaadin-menu-bar-content-width"),this.removeAttribute("overflow-frozen")}__setOverflowItems(e,i){let s=e.at(-1),n=this.hasAttribute("overflow-frozen");if(!s||!n&&!this.__isPastContainerEnd(s)){this.__unfreezeWidth();return}this._hasOverflow=!0;let a=this.__getOverflowLayout(e,i),d=this.__getButtonsToCollapse(e,a);d.forEach(c=>{c.style.visibility="hidden",c.style.position="absolute"}),this.__updateOverflow(d.map(c=>c.item)),d.length===0?this.__unfreezeWidth():(n||this.__isPastContainerEnd(i))&&this.__freezeWidth(a.contentWidth)}__scheduleOverflow(){this._overflowDebouncer=ae.debounce(this._overflowDebouncer,tt,()=>{this.__detectOverflow()})}__detectOverflow(){let e=this._overflow,i=this._buttons.filter(d=>d!==e),s=this.__getOverflowCount(e);this.__restoreState(i),this.__setOverflowItems(i,e);let n=this.__getOverflowCount(e);s!==n&&this._subMenu.opened&&this._subMenu.close();let a=n===i.length||n===0&&i.length===1;this.toggleAttribute("has-single-button",a),this.__updateVisibleButtons(i)}__updateVisibleButtons(e){let i=e.filter(s=>s.style.visibility!=="hidden");i.length?i.some(s=>s.getAttribute("tabindex")==="0")||this._setTabindex(i[i.length-1],!0):this._overflow.setAttribute("tabindex","0"),this.__updateVisibleAttributes(i)}__updateVisibleAttributes(e){e.forEach((i,s)=>{i.toggleAttribute("first-visible",s===0),i.toggleAttribute("last-visible",!this._hasOverflow&&s===e.length-1)})}__getButtonTheme(e,i){let s=i,n=e?.theme;return n!=null&&(s=Array.isArray(n)?n.join(" "):n),s}__getComponent(e){let i=e.component,s,n=i instanceof HTMLElement;if(n&&i.localName==="vaadin-menu-bar-item"?s=i:(s=document.createElement("vaadin-menu-bar-item"),s.appendChild(n?i:document.createElement(i))),e.text){let a=s.firstChild||s;a.textContent=e.text}return s}__renderButtons(e=[]){_t(w`
          ${e.map(i=>{let s={...i},n=!!i?.children;return s.component&&(s.component=this.__getComponent(s)),w`
              <vaadin-menu-bar-button
                .item="${s}"
                .disabled="${this.disabled||i.disabled}"
                role="${this.tabNavigation?"button":"menuitem"}"
                aria-haspopup="${re(n?"true":oe)}"
                aria-expanded="${re(n?"false":oe)}"
                class="${re(i.className||oe)}"
                theme="${re(this.__getButtonTheme(i,this._theme)||oe)}"
                @click="${this.__onRootButtonClick}"
                >${Ab(s)}</vaadin-menu-bar-button
              >
            `})}
        `,this,{renderBefore:this._overflow})}__onRootButtonClick(e){let i=e.target;i.item?.component&&!e.composedPath().includes(i.item.component)&&(e.stopPropagation(),i.item.component.click())}_setExpanded(e,i){e.toggleAttribute("expanded",i),e.toggleAttribute("active",i),e.setAttribute("aria-expanded",i?"true":"false")}_setTabindex(e,i){this.tabNavigation&&this._isItemFocusable(e)?e.setAttribute("tabindex","0"):e.setAttribute("tabindex",i?"0":"-1")}_focusItem(e,i,s){let n=s&&this.focused===this._expandedButton;n&&this._close(),super._focusItem(e,i,s),this._buttons.forEach(a=>{this._setTabindex(a,a===e)}),this._tooltipController.setTarget(e),n&&e.item?.children?this.__openSubMenu(e,!0,{keepFocus:!0}):this._subMenu.opened||this._tooltipController.open({trigger:"focus"})}_getButtonFromEvent(e){return Array.from(e.composedPath()).find(i=>i.localName==="vaadin-menu-bar-button")}_shouldSetFocus(e){return e.composedPath().includes(this._subMenu)?!1:super._shouldSetFocus(e)}_shouldRemoveFocus(e){return e.composedPath().includes(this._subMenu)?!1:super._shouldRemoveFocus(e)}_setFocused(e){let i=e?this.__getFocusTarget():null;i?(this._tooltipController.setTarget(i),this._buttons.forEach(s=>{this._setTabindex(s,s===i)}),!this._subMenu.opened&&ce()&&this._tooltipController.open({trigger:"focus"})):this._tooltipController.close(!0)}__getFocusTarget(){let e=this._buttons.find(i=>Pe(i));if(!e){let i=this.tabNavigation?"[focused]":'[tabindex="0"]';e=this.querySelector(`vaadin-menu-bar-button${i}`),Gt(e)&&(e=this._buttons[this._getFocusableIndex()])}return e}_onArrowDown(e){e.preventDefault();let i=this._getButtonFromEvent(e);i===this._expandedButton?this._focusFirstItem():this.__openSubMenu(i,!0)}_onArrowUp(e){e.preventDefault();let i=this._getButtonFromEvent(e);i===this._expandedButton?this._focusLastItem():this.__openSubMenu(i,!0,{focusLast:!0})}_onEscape(e){e.composedPath().includes(this._expandedButton)&&this._close(!0),this._tooltipController.close(!0)}_onKeyDown(e){e.composedPath().includes(this._subMenu)||this._handleKeyDown(e)}_handleKeyDown(e){switch(e.key){case"ArrowDown":this._onArrowDown(e);break;case"ArrowUp":this._onArrowUp(e);break;default:super._onKeyDown(e);break}}_onMouseOver(e){if(e.composedPath().includes(this._subMenu))return;let i=this._getButtonFromEvent(e);this._tooltipController.setTarget(i),i&&i!==this._expandedButton&&i.item.children&&(this.openOnHover||this._subMenu.opened)&&this.__openSubMenu(i,!1),this._subMenu.opened||this._tooltipController.open({trigger:"hover"})}__onContextMenuKeydown(e){let i=Array.from(e.composedPath()).find(s=>s._item);if(i){let s=i.parentNode;e.key==="ArrowUp"&&i===s.items[0]&&this._close(!0);let n=this.__isRTL?"ArrowRight":"ArrowLeft",a=this.__isRTL?"ArrowLeft":"ArrowRight";(e.key===n||e.key===a&&!i._item.children)&&(e.stopImmediatePropagation(),this._handleKeyDown(e)),e.key==="Tab"&&this.tabNavigation&&this._handleKeyDown(e)}}__fireItemSelected(e){this.dispatchEvent(new CustomEvent("item-selected",{detail:{value:e}}))}__onButtonClick(e){let i=this._getButtonFromEvent(e);i&&this.__openSubMenu(i,i.__triggeredWithActiveKeys)}__openSubMenu(e,i,s={}){if(e.disabled)return;let n=this._subMenu,a=e.item;if(n.opened&&(this._close(),n.listenOn===e))return;let d=a?.children;if(!d||d.length===0){this.__fireItemSelected(a);return}n.items=d,n.listenOn=e,n._positionTarget=e;let c=n._overlayElement;c.noVerticalOverlap=!0,this._tooltipController.close(!0),this._expandedButton=e,this._setExpanded(e,!0),this.style.pointerEvents="auto",e.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:d}})),c.addEventListener("vaadin-overlay-open",()=>{if(s.focusLast&&this._focusLastItem(),s.keepFocus){let f={focusVisible:ce()};this._focusItem(this._expandedButton,f,!1)}i||c.$.overlay.focus()},{once:!0})}_focusFirstItem(){this._subMenu._menuListBox.focus()}_focusLastItem(){let e=this._subMenu._menuListBox,i=e.items[e.items.length-1];i&&i.focus()}__onItemSelected(e){e.stopPropagation(),this.__fireItemSelected(e.detail.value)}__onEscapeClose(){this.__deactivateButton(!0)}__deactivateButton(e){let i=this._expandedButton;if(i?.hasAttribute("expanded")){if(this._setExpanded(i,!1),e){let s={focusVisible:ce()};this._focusItem(i,s,!1)}else this._tooltipController.close(!0);this._expandedButton=null}}_close(e=!1){this.style.pointerEvents="",this.__deactivateButton(e),this._subMenu.opened&&this._subMenu.close()}close(){this._close()}_isItemFocusable(e){return e.disabled&&e.__shouldAllowFocusWhenDisabled?e.__shouldAllowFocusWhenDisabled():super._isItemFocusable(e)}};var os=class extends bc(K(I(O(A(S))))){static get is(){return"vaadin-menu-bar"}static get styles(){return gc}render(){return w`
      <div part="container" @click="${this.__onButtonClick}" @mouseover="${this._onMouseOver}">
        <slot></slot>
        <slot name="overflow"></slot>
      </div>

      <slot name="submenu"></slot>

      <slot name="tooltip"></slot>
    `}};E(os);var Lb=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a};var xc=class extends os{};xc=Lb([q("or-vaadin-menu-bar")],xc);var wc=C`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    box-sizing: border-box;
    gap: var(--vaadin-chip-gap, 0);
    background: var(--vaadin-chip-background, var(--vaadin-background-container));
    color: var(--vaadin-chip-text-color, var(--vaadin-text-color));
    font-size: max(11px, var(--vaadin-chip-font-size, 0.875em));
    font-weight: var(--vaadin-chip-font-weight, 500);
    line-height: var(--vaadin-input-field-value-line-height, inherit);
    padding: 0 var(--vaadin-chip-padding, 0.3em);
    height: var(--vaadin-chip-height, calc(1lh / 0.875));
    border-radius: var(--vaadin-chip-border-radius, var(--vaadin-radius-m));
    border: var(--vaadin-chip-border-width, 1px) solid
      var(--vaadin-chip-border-color, var(--vaadin-border-color-secondary));
    cursor: default;
  }

  :host(:not([slot='overflow'])) {
    min-width: min(max-content, var(--vaadin-multi-select-combo-box-chip-min-width, 48px));
  }

  :host([focused]) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-chip-border-width, 1px) * -1);
  }

  [part='label'] {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-block: calc(var(--vaadin-chip-border-width, 1px) * -1);
  }

  [part='remove-button'] {
    flex: none;
    display: block;
    margin-inline-start: auto;
    margin-block: calc(var(--vaadin-chip-border-width, 1px) * -1);
    color: var(--vaadin-chip-remove-button-text-color, var(--vaadin-text-color-secondary));
    cursor: var(--vaadin-clickable-cursor);
    translate: 25%;
  }

  :host(:dir(rtl)) [part='remove-button'] {
    translate: -25%;
  }

  [part='remove-button']::before {
    content: '';
    display: block;
    width: var(--vaadin-icon-size, 1lh);
    height: var(--vaadin-icon-size, 1lh);
    background: currentColor;
    mask-image: var(--_vaadin-icon-cross);
  }

  :host([disabled]) {
    --vaadin-chip-text-color: var(--vaadin-text-color-disabled);
    cursor: var(--vaadin-disabled-cursor);
  }

  :host([hidden]),
  :host(:is([readonly], [disabled], [slot='overflow'])) [part='remove-button'] {
    display: none !important;
  }

  :host([slot='overflow']) {
    position: relative;
    margin-inline-start: 8px;
    min-width: 1.5em;
  }

  :host([slot='overflow'])::before,
  :host([slot='overflow'])::after {
    content: '';
    position: absolute;
    inset: calc(var(--vaadin-chip-border-width, 1px) * -1);
    border-inline-start: 2px solid var(--vaadin-chip-border-color, var(--vaadin-border-color-secondary));
    border-radius: inherit;
  }

  :host([slot='overflow'])::before {
    inset-inline-start: calc(-4px - var(--vaadin-chip-border-width, 1px));
  }

  :host([slot='overflow'])::after {
    inset-inline-start: calc(-8px - var(--vaadin-chip-border-width, 1px));
  }

  :host([count='2']) {
    margin-inline-start: 4px;
  }

  :host([count='1']) {
    margin-inline-start: 0;
  }

  :host([count='2'])::after,
  :host([count='1'])::before,
  :host([count='1'])::after {
    display: none;
  }

  @media (forced-colors: active) {
    :host {
      border: 1px solid !important;
    }

    [part='remove-button']::before {
      background: CanvasText;
    }
  }
`;var Tl=class extends I(O(A(S))){static get is(){return"vaadin-multi-select-combo-box-chip"}static get styles(){return wc}static get properties(){return{disabled:{type:Boolean,reflectToAttribute:!0,sync:!0},readonly:{type:Boolean,reflectToAttribute:!0,sync:!0},label:{type:String,sync:!0},item:{type:Object}}}render(){return w`
      <div part="label">${this.label}</div>
      <div part="remove-button" @click="${this._onRemoveClick}"></div>
    `}_onRemoveClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-removed",{detail:{item:this.item},bubbles:!0,composed:!0}))}};E(Tl);var Cc=C`
  :host {
    display: flex;
    align-items: center;
    --_radius: var(--vaadin-input-field-border-radius, var(--vaadin-radius-m));
    border-radius:
      /* See https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius */
      var(--vaadin-input-field-top-start-radius, var(--_radius))
      var(--vaadin-input-field-top-end-radius, var(--_radius))
      var(--vaadin-input-field-bottom-end-radius, var(--_radius))
      var(--vaadin-input-field-bottom-start-radius, var(--_radius));
    border: var(--vaadin-input-field-border-width, 1px) solid
      var(--vaadin-input-field-border-color, var(--vaadin-border-color));
    box-sizing: border-box;
    cursor: text;
    padding: var(
      --vaadin-input-field-padding,
      var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container)
    );
    gap: var(--vaadin-input-field-gap, var(--vaadin-gap-s));
    background: var(--vaadin-input-field-background, var(--vaadin-background-color));
    color: var(--vaadin-input-field-value-color, var(--vaadin-text-color));
    font-size: var(--vaadin-input-field-value-font-size, inherit);
    line-height: var(--vaadin-input-field-value-line-height, inherit);
    font-weight: var(--vaadin-input-field-value-font-weight, 400);
  }

  :host([dir='rtl']) {
    --_radius: var(--vaadin-input-field-border-radius, var(--vaadin-radius-m));
    border-radius:
      /* Don't use logical props, see https://github.com/vaadin/vaadin-time-picker/issues/145 */
      var(--vaadin-input-field-top-end-radius, var(--_radius))
      var(--vaadin-input-field-top-start-radius, var(--_radius))
      var(--vaadin-input-field-bottom-start-radius, var(--_radius))
      var(--vaadin-input-field-bottom-end-radius, var(--_radius));
  }

  :host([hidden]) {
    display: none !important;
  }

  /* Reset the native input styles */
  ::slotted(:is(input, textarea)) {
    appearance: none;
    align-self: stretch;
    box-sizing: border-box;
    flex: auto;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    height: auto;
    outline: none;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    min-width: 0;
    font: inherit;
    font-size: 1em;
    color: inherit;
    background: transparent;
    cursor: inherit;
    text-align: inherit;
    caret-color: var(--vaadin-input-field-value-color);
  }

  ::slotted(*) {
    flex: none;
  }

  slot[name$='fix'] {
    cursor: auto;
  }

  ::slotted(:is(input, textarea))::placeholder {
    /* Use ::slotted(:is(input, textarea):placeholder-shown) to style the placeholder */
    /* because ::slotted(...)::placeholder does not work in Safari. */
    font: inherit;
    color: inherit;
  }

  ::slotted(:is(input, textarea):placeholder-shown) {
    color: var(--vaadin-input-field-placeholder-color, var(--vaadin-text-color-secondary));
  }

  :host(:focus-within) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-input-field-border-width, 1px) * -1);
  }

  :host([invalid]) {
    --vaadin-input-field-border-color: var(--vaadin-input-field-error-color, var(--vaadin-text-color));
  }

  :host([readonly]) {
    border-style: dashed;
  }

  :host([readonly]:focus-within) {
    outline-style: dashed;
    --vaadin-input-field-border-color: transparent;
  }

  :host([disabled]) {
    --vaadin-input-field-value-color: var(--vaadin-input-field-disabled-text-color, var(--vaadin-text-color-disabled));
    --vaadin-input-field-background: var(
      --vaadin-input-field-disabled-background,
      var(--vaadin-background-container-strong)
    );
    --vaadin-input-field-border-color: transparent;
  }

  :host([theme~='align-start']) slot:not([name])::slotted(*) {
    text-align: start;
  }

  :host([theme~='align-center']) slot:not([name])::slotted(*) {
    text-align: center;
  }

  :host([theme~='align-end']) slot:not([name])::slotted(*) {
    text-align: end;
  }

  :host([theme~='align-left']) slot:not([name])::slotted(*) {
    text-align: left;
  }

  :host([theme~='align-right']) slot:not([name])::slotted(*) {
    text-align: right;
  }

  @media (forced-colors: active) {
    :host {
      --vaadin-input-field-background: Field;
      --vaadin-input-field-value-color: FieldText;
      --vaadin-input-field-placeholder-color: GrayText;
    }

    :host([disabled]) {
      --vaadin-input-field-value-color: GrayText;
      --vaadin-icon-color: GrayText;
    }
  }
`;var as=class extends I(J(O(A(S)))){static get is(){return"vaadin-input-container"}static get styles(){return Cc}static get properties(){return{disabled:{type:Boolean,reflectToAttribute:!0},readonly:{type:Boolean,reflectToAttribute:!0},invalid:{type:Boolean,reflectToAttribute:!0}}}render(){return w`
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
    `}ready(){super.ready(),this.addEventListener("pointerdown",t=>{t.target===this&&t.preventDefault()}),this.addEventListener("click",t=>{t.target===this&&this.shadowRoot.querySelector("slot:not([name])").assignedNodes({flatten:!0}).forEach(e=>e.focus&&e.focus())})}};E(as);var Ol=class extends as{static get is(){return"vaadin-multi-select-combo-box-container"}static get styles(){return[super.styles,C`
        #wrapper {
          display: flex;
          width: 100%;
          min-width: 0;
          gap: var(--_wrapper-gap);
          align-self: start;
        }

        :host([auto-expand-vertically]) #wrapper {
          flex-wrap: wrap;
        }
      `]}static get properties(){return{autoExpandVertically:{type:Boolean,reflectToAttribute:!0}}}render(){return w`
      <div id="wrapper">
        <slot name="prefix"></slot>
        <slot></slot>
      </div>
      <slot name="suffix"></slot>
    `}};E(Ol);var uo=C`
  :host([focused]) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-focus-ring-width) / -1);
  }
`;var co=r=>class extends r{static get properties(){return{index:{type:Number},item:{type:Object},label:{type:String},selected:{type:Boolean,value:!1,reflectToAttribute:!0},focused:{type:Boolean,value:!1,reflectToAttribute:!0},renderer:{type:Function}}}static get observers(){return["__rendererOrItemChanged(renderer, index, item, selected, focused)","__updateLabel(label, renderer)"]}static get observedAttributes(){return[...super.observedAttributes,"hidden"]}attributeChangedCallback(e,i,s){e==="hidden"&&s!==null?this.index=void 0:super.attributeChangedCallback(e,i,s)}connectedCallback(){super.connectedCallback(),this._owner=this.parentNode.owner;let e=this._getHostDir();e&&this.setAttribute("dir",e)}_getHostDir(){return this._owner&&this._owner.$.overlay.getAttribute("dir")}requestContentUpdate(){if(!this.renderer||this.hidden)return;let e={index:this.index,item:this.item,focused:this.focused,selected:this.selected};this.renderer(this,this._owner,e)}__rendererOrItemChanged(e,i,s){s===void 0||i===void 0||(this._oldRenderer!==e&&(this.innerHTML="",delete this._$litPart$,this._oldRenderer=e),e&&this.requestContentUpdate())}__updateLabel(e,i){i||(this.textContent=e)}};var Dl=class extends co(I(J(O(A(S))))){static get is(){return"vaadin-multi-select-combo-box-item"}static get styles(){return[mi,uo]}render(){return w`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}};E(Dl);var fo=r=>class extends _i(r){static get manageFocus(){return!1}constructor(){super(),this.requiredVerticalSpace=200}willUpdate(e){super.willUpdate(e),(e.has("opened")||e.has("positionTarget"))&&this.opened&&this.positionTarget&&this._updateOverlayWidth()}_shouldCloseOnOutsideClick(e){let i=e.composedPath();return!i.includes(this.positionTarget)&&!i.includes(this)}_mouseDownListener(e){super._mouseDownListener(e),this._shouldCloseOnOutsideClick(e)&&!Vi(e.composedPath()[0])&&e.preventDefault()}_updateOverlayWidth(){this.style.setProperty(`--_${this.localName}-default-width`,`${this.positionTarget.offsetWidth}px`)}};var po=C`
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
  }

  @keyframes spin {
    to {
      rotate: 1turn;
    }
  }

  [part='loader'] {
    animation:
      spin var(--vaadin-spinner-animation-duration, 0.7s) linear infinite,
      fade-in 0.15s 0.3s both;
    border: var(--vaadin-spinner-width, 2px) solid var(--vaadin-spinner-color, var(--vaadin-text-color));
    border-radius: 50%;
    box-sizing: border-box;
    height: var(--vaadin-spinner-size, 1lh);
    mask-image: radial-gradient(circle at 50% var(--vaadin-spinner-width, 2px), transparent 40%, #000 70%);
    pointer-events: none;
    width: var(--vaadin-spinner-size, 1lh);
  }

  :host(:not([loading])) [part~='loader'] {
    display: none;
  }

  @media (forced-colors: active) {
    [part='loader'] {
      forced-color-adjust: none;
      --vaadin-spinner-color: CanvasText;
    }
  }
`;var Sc=[po,C`
    :host {
      --vaadin-item-checkmark-display: block;
    }

    [part='overlay'] {
      position: relative;
      width: var(--vaadin-combo-box-overlay-width, var(--_vaadin-combo-box-overlay-default-width, auto));
    }

    [part='content'] {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    :host([loading]) [part='content'] {
      --_items-min-height: calc(var(--vaadin-icon-size, 1lh) + 4px);
    }

    [part='loader'] {
      position: absolute;
      inset: var(--vaadin-item-overlay-padding, 4px);
      inset-block-end: auto;
      inset-inline-start: auto;
      margin: 2px;
    }
  `];var kc=[Sc,C`
    #overlay {
      width: var(
        --vaadin-multi-select-combo-box-overlay-width,
        var(--_vaadin-multi-select-combo-box-overlay-default-width, auto)
      );
    }
  `];var Ml=class extends fo(Ze(J(I(O(A(S)))))){static get is(){return"vaadin-multi-select-combo-box-overlay"}static get styles(){return[Xe,kc]}render(){return w`
      <div part="overlay" id="overlay">
        <div part="loader"></div>
        <div part="content" id="content"><slot></slot></div>
      </div>
    `}};E(Ml);var Le=class{toString(){return""}};var Ec=navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/u),Rb=Ec&&Ec[1]>=8,Tc=3,Oc={_ratio:.5,_scrollerPaddingTop:0,_scrollPosition:0,_physicalSize:0,_physicalAverage:0,_physicalAverageCount:0,_physicalTop:0,_virtualCount:0,_estScrollHeight:0,_scrollHeight:0,_viewportHeight:0,_viewportWidth:0,_physicalItems:null,_physicalSizes:null,_firstVisibleIndexVal:null,_lastVisibleIndexVal:null,_maxPages:2,_templateCost:0,get _physicalBottom(){return this._physicalTop+this._physicalSize},get _scrollBottom(){return this._scrollPosition+this._viewportHeight},get _virtualEnd(){return this._virtualStart+this._physicalCount-1},get _hiddenContentSize(){return this._physicalSize-this._viewportHeight},get _maxScrollTop(){return this._estScrollHeight-this._viewportHeight+this._scrollOffset},get _maxVirtualStart(){let r=this._virtualCount;return Math.max(0,r-this._physicalCount)},get _virtualStart(){return this._virtualStartVal||0},set _virtualStart(r){r=this._clamp(r,0,this._maxVirtualStart),this._virtualStartVal=r},get _physicalStart(){return this._physicalStartVal||0},set _physicalStart(r){r%=this._physicalCount,r<0&&(r=this._physicalCount+r),this._physicalStartVal=r},get _physicalEnd(){return(this._physicalStart+this._physicalCount-1)%this._physicalCount},get _physicalCount(){return this._physicalCountVal||0},set _physicalCount(r){this._physicalCountVal=r},get _optPhysicalSize(){return this._viewportHeight===0?1/0:this._viewportHeight*this._maxPages},get _isVisible(){return!!(this.offsetWidth||this.offsetHeight)},get firstVisibleIndex(){let r=this._firstVisibleIndexVal;if(r==null){let t=this._physicalTop+this._scrollOffset;r=this._iterateItems((e,i)=>{if(t+=this._getPhysicalSizeIncrement(e),t>this._scrollPosition)return i})||0,this._firstVisibleIndexVal=r}return r},get lastVisibleIndex(){let r=this._lastVisibleIndexVal;if(r==null){let t=this._physicalTop+this._scrollOffset;this._iterateItems((e,i)=>{t<this._scrollBottom&&(r=i),t+=this._getPhysicalSizeIncrement(e)}),this._lastVisibleIndexVal=r}return r},get _scrollOffset(){return this._scrollerPaddingTop+this.scrollOffset},_scrollHandler(){let r=Math.max(0,Math.min(this._maxScrollTop,this._scrollTop)),t=r-this._scrollPosition,e=t>=0;if(this._scrollPosition=r,this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,Math.abs(t)>this._physicalSize&&this._physicalSize>0){t-=this._scrollOffset;let i=Math.round(t/this._physicalAverage);this._virtualStart+=i,this._physicalStart+=i,this._physicalTop=Math.min(Math.floor(this._virtualStart)*this._physicalAverage,this._scrollPosition),this._update()}else if(this._physicalCount>0){let i=this._getReusables(e);e?(this._physicalTop=i.physicalTop,this._virtualStart+=i.indexes.length,this._physicalStart+=i.indexes.length):(this._virtualStart-=i.indexes.length,this._physicalStart-=i.indexes.length),this._update(i.indexes,e?null:i.indexes),this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,0),tt)}},_getReusables(r){let t,e,i,s=[],n=this._hiddenContentSize*this._ratio,a=this._virtualStart,d=this._virtualEnd,c=this._physicalCount,f=this._physicalTop+this._scrollOffset,m=this._physicalBottom+this._scrollOffset,_=this._scrollPosition,v=this._scrollBottom;for(r?(t=this._physicalStart,e=_-f):(t=this._physicalEnd,e=m-v);i=this._getPhysicalSizeIncrement(t),e-=i,!(s.length>=c||e<=n);)if(r){if(d+s.length+1>=this._virtualCount||f+i>=_-this._scrollOffset)break;s.push(t),f+=i,t=(t+1)%c}else{if(a-s.length<=0||f+this._physicalSize-i<=v)break;s.push(t),f-=i,t=t===0?c-1:t-1}return{indexes:s,physicalTop:f-this._scrollOffset}},_update(r,t){if(!(r&&r.length===0||this._physicalCount===0)){if(this._assignModels(r),this._updateMetrics(r),t)for(;t.length;){let e=t.pop();this._physicalTop-=this._getPhysicalSizeIncrement(e)}this._positionItems(),this._updateScrollerSize()}},_isClientFull(){return this._scrollBottom!==0&&this._physicalBottom-1>=this._scrollBottom&&this._physicalTop<=this._scrollPosition},_increasePoolIfNeeded(r){let e=this._clamp(this._physicalCount+r,Tc,this._virtualCount-this._virtualStart)-this._physicalCount,i=Math.round(this._physicalCount*.5);if(!(e<0)){if(e>0){let s=window.performance.now();[].push.apply(this._physicalItems,this._createPool(e));for(let n=0;n<e;n++)this._physicalSizes.push(0);this._physicalCount+=e,this._physicalStart>this._physicalEnd&&this._isIndexRendered(this._focusedVirtualIndex)&&this._getPhysicalIndex(this._focusedVirtualIndex)<this._physicalEnd&&(this._physicalStart+=e),this._update(),this._templateCost=(window.performance.now()-s)/e,i=Math.round(this._physicalCount*.5)}this._virtualEnd>=this._virtualCount-1||i===0||(this._isClientFull()?this._physicalSize<this._optPhysicalSize&&this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,this._clamp(Math.round(50/this._templateCost),1,i)),yn):this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,i),tt))}},_render(){if(!(!this.isAttached||!this._isVisible))if(this._physicalCount!==0){let r=this._getReusables(!0);this._physicalTop=r.physicalTop,this._virtualStart+=r.indexes.length,this._physicalStart+=r.indexes.length,this._update(r.indexes),this._update(),this._increasePoolIfNeeded(0)}else this._virtualCount>0&&(this.updateViewportBoundaries(),this._increasePoolIfNeeded(Tc))},_itemsChanged(r){r.path==="items"&&(this._virtualStart=0,this._physicalTop=0,this._virtualCount=this.items?this.items.length:0,this._physicalIndexForKey={},this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._physicalItems||(this._physicalItems=[]),this._physicalSizes||(this._physicalSizes=[]),this._physicalStart=0,this._scrollTop>this._scrollOffset&&this._resetScrollPosition(0),this._debounce("_render",this._render,Ri))},_iterateItems(r,t){let e,i,s,n;if(arguments.length===2&&t){for(n=0;n<t.length;n++)if(e=t[n],i=this._computeVidx(e),(s=r.call(this,e,i))!=null)return s}else{for(e=this._physicalStart,i=this._virtualStart;e<this._physicalCount;e++,i++)if((s=r.call(this,e,i))!=null)return s;for(e=0;e<this._physicalStart;e++,i++)if((s=r.call(this,e,i))!=null)return s}},_computeVidx(r){return r>=this._physicalStart?this._virtualStart+(r-this._physicalStart):this._virtualStart+(this._physicalCount-this._physicalStart)+r},_positionItems(){this._adjustScrollPosition();let r=this._physicalTop;this._iterateItems(t=>{this.translate3d(0,`${r}px`,0,this._physicalItems[t]),r+=this._physicalSizes[t]})},_getPhysicalSizeIncrement(r){return this._physicalSizes[r]},_adjustScrollPosition(){let r=this._virtualStart===0?this._physicalTop:Math.min(this._scrollPosition+this._physicalTop,0);if(r!==0){this._physicalTop-=r;let t=this._scrollPosition;!Rb&&t>0&&this._resetScrollPosition(t-r)}},_resetScrollPosition(r){this.scrollTarget&&r>=0&&(this._scrollTop=r,this._scrollPosition=this._scrollTop)},_updateScrollerSize(r){let t=this._physicalBottom+Math.max(this._virtualCount-this._physicalCount-this._virtualStart,0)*this._physicalAverage;this._estScrollHeight=t,(r||this._scrollHeight===0||this._scrollPosition>=t-this._physicalSize||Math.abs(t-this._scrollHeight)>=this._viewportHeight)&&(this.$.items.style.height=`${t}px`,this._scrollHeight=t)},scrollToIndex(r){if(typeof r!="number"||r<0||r>this.items.length-1||(Ni(),this._physicalCount===0))return;r=this._clamp(r,0,this._virtualCount-1),(!this._isIndexRendered(r)||r>=this._maxVirtualStart)&&(this._virtualStart=r-1),this._assignModels(),this._updateMetrics(),this._physicalTop=this._virtualStart*this._physicalAverage;let t=this._physicalStart,e=this._virtualStart,i=0,s=this._hiddenContentSize;for(;e<r&&i<=s;)i+=this._getPhysicalSizeIncrement(t),t=(t+1)%this._physicalCount,e+=1;this._updateScrollerSize(!0),this._positionItems(),this._resetScrollPosition(this._physicalTop+this._scrollOffset+i),this._increasePoolIfNeeded(0),this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null},_resetAverage(){this._physicalAverage=0,this._physicalAverageCount=0},_resizeHandler(){this._debounce("_render",()=>{this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._isVisible?(this.updateViewportBoundaries(),this.toggleScrollListener(!0),this._resetAverage(),this._render()):this.toggleScrollListener(!1)},Ri)},_isIndexRendered(r){return r>=this._virtualStart&&r<=this._virtualEnd},_getPhysicalIndex(r){return(this._physicalStart+(r-this._virtualStart))%this._physicalCount},_clamp(r,t,e){return Math.min(e,Math.max(t,r))},_debounce(r,t,e){this._debouncers||(this._debouncers={}),this._debouncers[r]=ae.debounce(this._debouncers[r],e,t.bind(this)),bn(this._debouncers[r])}};var Nb=1e5,Il=1e3,ls=class{constructor({createElements:t,updateElement:e,scrollTarget:i,scrollContainer:s,reorderElements:n,elementsContainer:a,__disableHeightPlaceholder:d}){this.isAttached=!0,this._vidxOffset=0,this.createElements=t,this.updateElement=e,this.scrollTarget=i,this.scrollContainer=s,this.reorderElements=n,this.elementsContainer=a||s,this.__disableHeightPlaceholder=d??!1,this._maxPages=1.3,this.__placeholderHeight=200,this.__elementHeightQueue=Array(10),this.timeouts={SCROLL_REORDER:500,PREVENT_OVERSCROLL:500,FIX_INVALID_ITEM_POSITIONING:100},this.__resizeObserver=new ResizeObserver(()=>this._resizeHandler()),getComputedStyle(this.scrollTarget).overflow==="visible"&&(this.scrollTarget.style.overflow="auto"),getComputedStyle(this.scrollContainer).position==="static"&&(this.scrollContainer.style.position="relative"),this.__resizeObserver.observe(this.scrollTarget),this.scrollTarget.addEventListener("scroll",()=>this._scrollHandler()),new ResizeObserver(([{contentRect:f}])=>{let m=f.width===0&&f.height===0;!m&&this.__scrollTargetHidden&&this.scrollTarget.scrollTop!==this._scrollPosition&&(this.scrollTarget.scrollTop=this._scrollPosition),this.__scrollTargetHidden=m}).observe(this.scrollTarget),this.elementsContainer.addEventListener("focusin",()=>this.__onElementFocused()),this.reorderElements&&(this.scrollTarget.addEventListener("mousedown",f=>{f.target===this.scrollTarget&&(this.__mouseDown=!0)}),this.scrollTarget.addEventListener("mouseup",()=>{this.__mouseDown=!1,this.__pendingReorder&&this.__reorderElements()}))}get scrollOffset(){return 0}get adjustedFirstVisibleIndex(){return this.firstVisibleIndex+this._vidxOffset}get adjustedLastVisibleIndex(){return this.lastVisibleIndex+this._vidxOffset}get _maxVirtualIndexOffset(){return this.size-this._virtualCount}__hasPlaceholders(){return this.__getVisibleElements().some(t=>t.__virtualizerPlaceholder)}scrollToIndex(t){if(typeof t!="number"||isNaN(t)||this.size===0||!this.scrollTarget.offsetHeight)return;delete this.__pendingScrollToIndex,this._physicalCount<=3&&this.flush(),t=this._clamp(t,0,this.size-1);let e=this.__getVisibleElements().length,i=Math.floor(t/this.size*this._virtualCount);this._virtualCount-i<e?(i=this._virtualCount-(this.size-t),this._vidxOffset=this._maxVirtualIndexOffset):i<e?t<Il?(i=t,this._vidxOffset=0):(i=Il,this._vidxOffset=t-i):this._vidxOffset=t-i,this.__skipNextVirtualIndexAdjust=!0,super.scrollToIndex(i),this.adjustedFirstVisibleIndex!==t&&this._scrollTop<this._maxScrollTop&&(this._scrollTop-=this.__getIndexScrollOffset(t)||0),this._scrollHandler(),this.__hasPlaceholders()&&(this.__pendingScrollToIndex=t)}flush(){this.scrollTarget.offsetHeight!==0&&(this._resizeHandler(),Ni(),this._scrollHandler(),this.__fixInvalidItemPositioningDebouncer&&this.__fixInvalidItemPositioningDebouncer.flush(),this.__scrollReorderDebouncer&&this.__scrollReorderDebouncer.flush())}hostConnected(){this.scrollTarget.offsetParent&&this.scrollTarget.scrollTop!==this._scrollPosition&&(this.scrollTarget.scrollTop=this._scrollPosition)}update(t=0,e=this.size-1){let i=[];this.__getVisibleElements().forEach(s=>{s.__virtualIndex>=t&&s.__virtualIndex<=e&&(this.__updateElement(s,s.__virtualIndex,!0),i.push(s))}),this.__afterElementsUpdated(i)}_updateMetrics(t){Ni();let e=0,i=0,s=this._physicalAverageCount,n=this._physicalAverage;this._iterateItems((a,d)=>{i+=this._physicalSizes[a];let c=this._physicalSizes[a];this._physicalSizes[a]=Math.ceil(this.__getBorderBoxHeight(this._physicalItems[a])),this._physicalSizes[a]!==c&&(this.__resizeObserver.unobserve(this._physicalItems[a]),this.__resizeObserver.observe(this._physicalItems[a],{box:"border-box"})),e+=this._physicalSizes[a],this._physicalAverageCount+=this._physicalSizes[a]?1:0},t),this._physicalSize=this._physicalSize+e-i,this._physicalAverageCount!==s&&(this._physicalAverage=Math.round((n*s+e)/this._physicalAverageCount))}__getBorderBoxHeight(t){let e=getComputedStyle(t),i=parseFloat(e.height)||0;if(e.boxSizing==="border-box")return i;let s=parseFloat(e.paddingBottom)||0,n=parseFloat(e.paddingTop)||0,a=parseFloat(e.borderBottomWidth)||0,d=parseFloat(e.borderTopWidth)||0;return i+s+n+a+d}__updateElement(t,e,i){t.__virtualizerPlaceholder&&(t.style.paddingTop="",t.style.opacity="",t.__virtualizerPlaceholder=!1),!this.__preventElementUpdates&&(t.__lastUpdatedIndex!==e||i)&&(this.updateElement(t,e),t.__lastUpdatedIndex=e)}__afterElementsUpdated(t){this.__disableHeightPlaceholder||t.forEach(e=>{let i=e.offsetHeight;if(i===0)e.style.paddingTop=`${this.__placeholderHeight}px`,e.style.opacity="0",e.__virtualizerPlaceholder=!0,this.__placeholderClearDebouncer=ae.debounce(this.__placeholderClearDebouncer,Ri,()=>this._resizeHandler());else{this.__elementHeightQueue.push(i),this.__elementHeightQueue.shift();let s=this.__elementHeightQueue.filter(n=>n!==void 0);this.__placeholderHeight=Math.round(s.reduce((n,a)=>n+a,0)/s.length)}}),this.__pendingScrollToIndex!==void 0&&!this.__hasPlaceholders()&&this.scrollToIndex(this.__pendingScrollToIndex)}__getIndexScrollOffset(t){let e=this.__getVisibleElements().find(i=>i.__virtualIndex===t);return e?this.scrollTarget.getBoundingClientRect().top-e.getBoundingClientRect().top:void 0}__restoreScrollOffset(t,e){let i=this.__getIndexScrollOffset(t);e!==void 0&&i!==void 0&&(this._scrollTop+=e-i)}get size(){return this.__size}set size(t){if(t===this.size)return;this.__fixInvalidItemPositioningDebouncer&&this.__fixInvalidItemPositioningDebouncer.cancel(),this._debouncers&&this._debouncers._increasePoolIfNeeded&&this._debouncers._increasePoolIfNeeded.cancel();let e=t>0&&this._scrollTop>0,i,s;e&&(i=this.adjustedFirstVisibleIndex,s=this.__getIndexScrollOffset(i)),this.__size=t,this.__preventElementUpdates=e,this._itemsChanged({path:"items"}),Ni(),e&&(i=Math.min(i,t-1),this.scrollToIndex(i),this.__restoreScrollOffset(i,s)),this.__preventElementUpdates=!1,this._isVisible||this._assignModels(),this.elementsContainer.children.length||requestAnimationFrame(()=>this._resizeHandler()),this._updateScrollerSize(!0),this._resizeHandler(),Ni(),this._debounce("_update",this._update,tt)}get _scrollTop(){return this.scrollTarget.scrollTop}set _scrollTop(t){this.scrollTarget.scrollTop=t}get items(){return{length:Math.min(this.size,Nb)}}get offsetHeight(){return this.scrollTarget.offsetHeight}get $(){return{items:this.scrollContainer}}updateViewportBoundaries(){this._scrollerPaddingTop=parseInt(window.getComputedStyle(this.scrollTarget)["padding-top"],10),this._viewportHeight=this.scrollTarget.offsetHeight}_createPool(t){let e=this.createElements(t),i=document.createDocumentFragment();return e.forEach(s=>{s.style.position="absolute",i.appendChild(s),this.__resizeObserver.observe(s,{box:"border-box"})}),this.elementsContainer.appendChild(i),e}_assignModels(t){let e=[];this._iterateItems((i,s)=>{let n=this._physicalItems[i];n.hidden=s>=this.size,n.hidden?delete n.__lastUpdatedIndex:(n.__virtualIndex=s+(this._vidxOffset||0),this.__updateElement(n,n.__virtualIndex),e.push(n))},t),this.__afterElementsUpdated(e)}_isClientFull(){return setTimeout(()=>{this.__clientFull=!0}),this.__clientFull||super._isClientFull()}translate3d(t,e,i,s){s.style.transform=`translateY(${e})`}toggleScrollListener(){}__getFocusedElement(){return this.__getVisibleElements().find(t=>t.matches(":focus-within"))}__nextFocusableSiblingMissing(t,e){return e.indexOf(t)===e.length-1&&this.size>t.__virtualIndex+1}__previousFocusableSiblingMissing(t,e){return e.indexOf(t)===0&&t.__virtualIndex>0}__onElementFocused(){if(!this.reorderElements)return;let t=this.__getFocusedElement();if(!t)return;let e=this.__getVisibleElements();(this.__previousFocusableSiblingMissing(t,e)||this.__nextFocusableSiblingMissing(t,e))&&this.flush();let i=this.__getVisibleElements();this.__nextFocusableSiblingMissing(t,i)?(this._scrollTop+=Math.ceil(t.getBoundingClientRect().bottom)-Math.floor(this.scrollTarget.getBoundingClientRect().bottom-1),this.flush()):this.__previousFocusableSiblingMissing(t,i)&&(this._scrollTop-=Math.ceil(this.scrollTarget.getBoundingClientRect().top+1)-Math.floor(t.getBoundingClientRect().top),this.flush())}_scrollHandler(){if(this.scrollTarget.offsetHeight===0)return;this._adjustVirtualIndexOffset(this._scrollTop-this._scrollPosition);let t=this._scrollTop-this._scrollPosition;if(super._scrollHandler(),this._physicalCount!==0){let e=t>=0,i=this._getReusables(!e);i.indexes.length&&(this._physicalTop=i.physicalTop,e?(this._virtualStart-=i.indexes.length,this._physicalStart-=i.indexes.length):(this._virtualStart+=i.indexes.length,this._physicalStart+=i.indexes.length),this._resizeHandler())}t&&(this.__fixInvalidItemPositioningDebouncer=ae.debounce(this.__fixInvalidItemPositioningDebouncer,Ge.after(this.timeouts.FIX_INVALID_ITEM_POSITIONING),()=>this.__fixInvalidItemPositioning()),this.__overscrollDebouncer?.isActive()||(this.scrollTarget.style.overscrollBehavior="none"),this.__overscrollDebouncer=ae.debounce(this.__overscrollDebouncer,Ge.after(this.timeouts.PREVENT_OVERSCROLL),()=>{this.scrollTarget.style.overscrollBehavior=null})),this.reorderElements&&(this.__scrollReorderDebouncer=ae.debounce(this.__scrollReorderDebouncer,Ge.after(this.timeouts.SCROLL_REORDER),()=>this.__reorderElements())),this._scrollPosition===0&&this.firstVisibleIndex!==0&&Math.abs(t)>0&&this.scrollToIndex(0)}_resizeHandler(){super._resizeHandler();let t=this.adjustedLastVisibleIndex===this.size-1,e=this._physicalTop-this._scrollPosition;if(t&&e>0){let i=Math.ceil(e/this._physicalAverage);this._virtualStart=Math.max(0,this._virtualStart-i),this._physicalStart=Math.max(0,this._physicalStart-i),super.scrollToIndex(this._virtualCount-1),this.scrollTarget.scrollTop=this.scrollTarget.scrollHeight-this.scrollTarget.clientHeight}}__fixInvalidItemPositioning(){if(!this.scrollTarget.isConnected)return;let t=this._physicalTop>this._scrollTop,e=this._physicalBottom<this._scrollBottom,i=this.adjustedFirstVisibleIndex===0,s=this.adjustedLastVisibleIndex===this.size-1;if(t&&!i||e&&!s){let n=e,a=this._ratio;this._ratio=0,this._scrollPosition=this._scrollTop+(n?-1:1),this._scrollHandler(),this._ratio=a}}_increasePoolIfNeeded(t){if(this._physicalCount>2&&this._physicalAverage>0&&t>0){let i=Math.ceil(this._optPhysicalSize/this._physicalAverage)-this._physicalCount;super._increasePoolIfNeeded(Math.max(t,Math.min(100,i)))}else super._increasePoolIfNeeded(t)}get _optPhysicalSize(){let t=super._optPhysicalSize;return t<=0||this.__hasPlaceholders()?t:t+this.__getItemHeightBuffer()}__getItemHeightBuffer(){if(this._physicalCount===0)return 0;let t=Math.ceil(this._viewportHeight*(this._maxPages-1)/2),e=Math.max(...this._physicalSizes);return e>Math.min(...this._physicalSizes)?Math.max(0,e-t):0}__getVisibleElements(){return Array.from(this.elementsContainer.children).filter(t=>!t.hidden)}__reorderElements(){if(this.__mouseDown){this.__pendingReorder=!0;return}this.__pendingReorder=!1;let t=this._virtualStart+(this._vidxOffset||0),e=this.__getVisibleElements(),i=this.__getFocusedElement()||e[0];if(!i)return;let s=i.__virtualIndex-t,n=e.indexOf(i)-s;if(n>0)for(let a=0;a<n;a++)this.elementsContainer.appendChild(e[a]);else if(n<0)for(let a=e.length+n;a<e.length;a++)this.elementsContainer.insertBefore(e[a],e[0]);if(Nu){let{transform:a}=this.scrollTarget.style;this.scrollTarget.style.transform="translateZ(0)",setTimeout(()=>{this.scrollTarget.style.transform=a})}}_adjustVirtualIndexOffset(t){let e=this._maxVirtualIndexOffset;if(this._virtualCount>=this.size)this._vidxOffset=0;else if(this.__skipNextVirtualIndexAdjust)this.__skipNextVirtualIndexAdjust=!1;else if(Math.abs(t)>1e4){let i=this._scrollTop/(this.scrollTarget.scrollHeight-this.scrollTarget.clientHeight);this._vidxOffset=Math.round(i*e)}else{let i=this._vidxOffset,s=Il,n=100,a,d,c=()=>{a=this.adjustedFirstVisibleIndex,d=this.__getIndexScrollOffset(a)};this._scrollTop===0?i!==0&&(c(),this._vidxOffset=0,super.scrollToIndex(0)):this.firstVisibleIndex<s&&this._vidxOffset>0&&(c(),this._vidxOffset-=Math.min(this._vidxOffset,n),super.scrollToIndex(this.firstVisibleIndex+(i-this._vidxOffset))),this._scrollTop>=this._maxScrollTop&&this._maxScrollTop>0?i!==e&&(c(),this._vidxOffset=e,super.scrollToIndex(this._virtualCount-1)):this.firstVisibleIndex>this._virtualCount-s&&this._vidxOffset<e&&(c(),this._vidxOffset+=Math.min(e-this._vidxOffset,n),super.scrollToIndex(this.firstVisibleIndex-(this._vidxOffset-i))),a!==void 0&&this.__restoreScrollOffset(a,d)}}};Object.setPrototypeOf(ls.prototype,Oc);var mo=class{constructor(t){this.__adapter=new ls(t)}get firstVisibleIndex(){return this.__adapter.adjustedFirstVisibleIndex}get lastVisibleIndex(){return this.__adapter.adjustedLastVisibleIndex}get size(){return this.__adapter.size}set size(t){this.__adapter.size=t}scrollToIndex(t){this.__adapter.scrollToIndex(t)}update(t=0,e=this.size-1){this.__adapter.update(t,e)}flush(){this.__adapter.flush()}hostConnected(){this.__adapter.hostConnected()}};var _o=r=>class extends r{static get properties(){return{items:{type:Array,sync:!0,observer:"__itemsChanged"},focusedIndex:{type:Number,sync:!0,observer:"__focusedIndexChanged"},loading:{type:Boolean,sync:!0,observer:"__loadingChanged"},opened:{type:Boolean,sync:!0,observer:"__openedChanged"},selectedItem:{type:Object,sync:!0,observer:"__selectedItemChanged"},itemClassNameGenerator:{type:Object,observer:"__itemClassNameGeneratorChanged"},owner:{type:Object},getItemLabel:{type:Object},renderer:{type:Object,sync:!0,observer:"__rendererChanged"},theme:{type:String}}}constructor(){super(),this.__boundOnItemClick=this.__onItemClick.bind(this)}get _viewportTotalPaddingBottom(){if(this._cachedViewportTotalPaddingBottom===void 0){let e=window.getComputedStyle(this.$.selector);this._cachedViewportTotalPaddingBottom=[e.paddingBottom,e.borderBottomWidth].map(i=>parseInt(i,10)).reduce((i,s)=>i+s)}return this._cachedViewportTotalPaddingBottom}ready(){super.ready(),this.setAttribute("role","listbox"),this.id=`${this.localName}-${xt()}`,this.__hostTagName=this.constructor.is.replace("-scroller",""),this.addEventListener("click",e=>e.stopPropagation()),this.__patchWheelOverScrolling()}requestContentUpdate(){this.__virtualizer&&(this.items&&(this.__virtualizer.size=this.items.length),this.opened&&this.__virtualizer.update())}scrollIntoView(e,i=!1){if(!this.__virtualizer||!(this.opened&&e>=0))return;let s=[...this.children].find(m=>!m.hidden&&m.index===e);if(!i&&s){let m=s.getBoundingClientRect(),_=this.getBoundingClientRect();if(m.top>=_.top&&m.bottom+this._viewportTotalPaddingBottom<=_.bottom)return}let n=e;if(!i){let m=this._visibleItemsCount();e>this.__virtualizer.lastVisibleIndex-1?(this.__virtualizer.scrollToIndex(e),n=e-m+1):e>this.__virtualizer.firstVisibleIndex&&(n=this.__virtualizer.firstVisibleIndex)}this.__virtualizer.scrollToIndex(Math.max(0,n)),this.__virtualizer.flush();let a=[...this.children].find(m=>!m.hidden&&m.index===e);if(!a)return;if(i){a.scrollIntoView({block:"center"});return}let d=a.getBoundingClientRect(),c=this.getBoundingClientRect(),f=d.bottom+this._viewportTotalPaddingBottom;f>c.bottom?this.scrollTop+=f-c.bottom:d.top<c.top&&(this.scrollTop-=c.top-d.top)}_isItemSelected(e,i){return e instanceof Le?!1:this.owner._isSameItem(e,i)}__initVirtualizer(){this.__virtualizer=new mo({createElements:this.__createElements.bind(this),updateElement:this._updateElement.bind(this),elementsContainer:this,scrollTarget:this,scrollContainer:this.$.selector,reorderElements:!0,__disableHeightPlaceholder:!0})}__itemsChanged(e){e&&this.__virtualizer&&this.requestContentUpdate()}__loadingChanged(){this.requestContentUpdate()}__openedChanged(e){if(e){this.__virtualizer||this.__initVirtualizer(),this.requestContentUpdate(),this.focusedIndex>=0&&!this.loading&&this.scrollIntoView(this.focusedIndex);return}let i=this.__virtualizer&&this.__virtualizer.__adapter;i&&i._scrollPosition>0&&(this.scrollTop=0,i._scrollPosition=0)}__selectedItemChanged(){this.requestContentUpdate()}__itemClassNameGeneratorChanged(e,i){(e||i)&&this.requestContentUpdate()}__focusedIndexChanged(e,i){e!==i&&this.requestContentUpdate(),e>=0&&!this.loading&&this.scrollIntoView(e)}__rendererChanged(e,i){(e||i)&&this.requestContentUpdate()}__createElements(e){return[...Array(e)].map(()=>{let i=document.createElement(`${this.__hostTagName}-item`);return i.addEventListener("click",this.__boundOnItemClick),i.tabIndex="-1",i.style.width="100%",i})}_updateElement(e,i){let s=this.items[i],n=this.focusedIndex,a=this._isItemSelected(s,this.selectedItem);e.setProperties({item:s,index:i,label:this.getItemLabel(s),selected:a,renderer:this.renderer,focused:!this.loading&&n===i}),typeof this.itemClassNameGenerator=="function"?e.className=this.itemClassNameGenerator(s):e.className!==""&&(e.className=""),e.id=`${this.__hostTagName}-item-${i}`,e.setAttribute("role",i!==void 0?"option":!1),e.setAttribute("aria-selected",a.toString()),e.setAttribute("aria-posinset",i+1),e.setAttribute("aria-setsize",this.items.length),Y(e,"theme",this.theme),s instanceof Le&&this.__requestItemByIndex(i)}__onItemClick(e){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{item:e.currentTarget.item}}))}__patchWheelOverScrolling(){this.$.selector.addEventListener("wheel",e=>{let i=this.scrollTop===0,s=this.scrollHeight-this.scrollTop-this.clientHeight<=1;(i&&e.deltaY<0||s&&e.deltaY>0)&&e.preventDefault()})}__requestItemByIndex(e){requestAnimationFrame(()=>{this.dispatchEvent(new CustomEvent("index-requested",{detail:{index:e}}))})}_visibleItemsCount(){return this.__virtualizer.scrollToIndex(this.__virtualizer.firstVisibleIndex),this.__virtualizer.size>0?this.__virtualizer.lastVisibleIndex-this.__virtualizer.firstVisibleIndex+1:0}};var ds=C`
  :host {
    /* Fixes scrollbar disappearing when 'Show scroll bars: Always' enabled in Safari */
    box-shadow: 0 0 0 white;
    display: block;
    min-height: 1px;
    overflow: auto;
    /* Fixes item background from getting on top of scrollbars on Safari */
    transform: translate3d(0, 0, 0);
  }

  #selector {
    border: 0 solid transparent;
    border-width: var(--vaadin-item-overlay-padding, 4px);
    position: relative;
    forced-color-adjust: none;
    min-height: var(--_items-min-height, auto);
  }

  #selector > * {
    forced-color-adjust: auto;
  }
`;var Dc=ds;var Al=class extends _o(O(S)){static get is(){return"vaadin-multi-select-combo-box-scroller"}static get styles(){return Dc}render(){return w`
      <div id="selector">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("aria-multiselectable","true")}_isItemSelected(t){return t instanceof Le||this.owner.readonly?!1:this.owner.selectedItems.some(e=>this.owner._isSameItem(t,e))}_updateElement(t,e){super._updateElement(t,e),t.toggleAttribute("readonly",this.owner.readonly)}};E(Al);var Mc=C`
  [part$='button'] {
    color: var(--vaadin-input-field-button-text-color, var(--vaadin-text-color-secondary));
    cursor: var(--vaadin-clickable-cursor);
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    user-select: none;
    /* Ensure minimum click target (WCAG) */
    padding: max(0px, (24px - var(--vaadin-icon-size, 1lh)) / 2);
    margin: min(0px, (24px - var(--vaadin-icon-size, 1lh)) / -2);
  }

  /* Icon */
  [part$='button']::before {
    background: currentColor;
    content: '';
    display: block;
    height: var(--vaadin-icon-size, 1lh);
    width: var(--vaadin-icon-size, 1lh);
    mask-size: var(--vaadin-icon-visual-size, 100%);
    mask-position: 50%;
    mask-repeat: no-repeat;
  }

  :host(:is(:not([clear-button-visible][has-value]), [disabled], [readonly])) [part~='clear-button'] {
    display: none;
  }

  [part~='clear-button']::before {
    mask-image: var(--_vaadin-icon-cross);
  }

  :host(:is([readonly], [disabled])) [part$='button'] {
    color: var(--vaadin-text-color-disabled);
    cursor: var(--vaadin-disabled-cursor);
  }

  @media (forced-colors: active) {
    [part$='button']::before {
      background: CanvasText;
    }

    :host([disabled]) [part$='button'] {
      color: GrayText;
    }

    :host([disabled]) [part$='button']::before {
      background: GrayText;
    }
  }
`;var ze=[wt,Mc];var Ic=C`
  :host([opened]) {
    pointer-events: auto;
  }

  [part~='toggle-button']::before {
    mask-image: var(--_vaadin-icon-chevron-down);
  }

  :host([readonly]) [part~='toggle-button'] {
    display: none;
  }
`;var Ac=[Ic,C`
    :host {
      max-width: 100%;
      --_input-min-width: var(--vaadin-multi-select-combo-box-input-min-width, 4rem);
      --_chip-min-width: var(--vaadin-multi-select-combo-box-chip-min-width, 48px);
      --_wrapper-gap: var(--vaadin-multi-select-combo-box-chips-gap, 2px);
    }

    #chips {
      display: flex;
      align-items: center;
      gap: var(--vaadin-multi-select-combo-box-chips-gap, 2px);
    }

    ::slotted(input) {
      box-sizing: border-box;
      flex: 1 0 var(--_input-min-width);
    }

    ::slotted([slot='chip']) {
      flex: 0 1 auto;
      overflow: hidden;
    }

    ::slotted([slot='overflow']) {
      flex: none;
    }

    :host(:is([readonly], [disabled])) ::slotted(input) {
      flex-grow: 0;
      flex-basis: 0;
      padding: 0;
    }

    :host([readonly]:not([disabled])) [part~='toggle-button'] {
      display: block;
      color: var(--vaadin-input-field-button-text-color, var(--vaadin-text-color-secondary));
    }

    :host([readonly]:not([disabled])) [part$='button'] {
      cursor: var(--vaadin-clickable-cursor);
    }

    :host([auto-expand-vertically]) #chips {
      display: contents;
    }

    :host([auto-expand-horizontally]) {
      --vaadin-field-default-width: auto;
    }
  `];var go=class r{context;items=[];pendingRequests={};#e={};#t;#i=0;#r=0;constructor(t,e,i,s,n){this.context=t,this.pageSize=e,this.size=i,this.parentCache=s,this.parentCacheIndex=n,this.#r=i||0}get parentItem(){return this.parentCache&&this.parentCache.items[this.parentCacheIndex]}get subCaches(){return Object.values(this.#e)}get isLoading(){return Object.keys(this.pendingRequests).length>0?!0:this.subCaches.some(t=>t.isLoading)}get flatSize(){return this.#r}get pageSize(){return this.#t}set pageSize(t){this.#t=t,this.pendingRequests={},this.subCaches.forEach(e=>{e.pageSize=t})}get size(){return this.#i}set size(t){if(this.#i!==t){if(this.#i=t,this.context.placeholder!==void 0){this.items.length=t||0;for(let i=0;i<t;i++)this.items[i]||=this.context.placeholder}this.items.length>t&&(this.items.length=t||0),Object.keys(this.pendingRequests).forEach(i=>{parseInt(i)*this.pageSize>=this.size&&delete this.pendingRequests[i]})}}recalculateFlatSize(){this.#r=!this.parentItem||this.context.isExpanded(this.parentItem)?this.size+this.subCaches.reduce((t,e)=>(e.recalculateFlatSize(),t+e.flatSize),0):0}setPage(t,e){let i=t*this.pageSize;e.forEach((s,n)=>{let a=i+n;(this.size===void 0||a<this.size)&&(this.items[a]=s)})}getSubCache(t){return this.#e[t]}removeSubCache(t){delete this.#e[t]}removeSubCaches(){this.#e={}}createSubCache(t){let e=new r(this.context,this.pageSize,0,this,t);return this.#e[t]=e,e}getFlatIndex(t){let e=Math.max(0,Math.min(this.size-1,t));return this.subCaches.reduce((i,s)=>{let n=s.parentCacheIndex;return e>n?i+s.flatSize:i},e)}};function Pl(r,t,e=0){let i=t;for(let s of r.subCaches){let n=s.parentCacheIndex;if(i<=n)break;if(i<=n+s.flatSize)return Pl(s,i-n-1,e+1);i-=s.flatSize}return{cache:r,item:r.items[i],index:i,page:Math.floor(i/r.pageSize),level:e}}function Ll({getItemId:r},t,e,i=0,s=0){for(let n=0;n<t.items.length;n++){let a=t.items[n];if(a&&r(a)===r(e))return{cache:t,level:i,item:a,index:n,page:Math.floor(n/t.pageSize),subCache:t.getSubCache(n),flatIndex:s+t.getFlatIndex(n)}}for(let n of t.subCaches){let a=s+t.getFlatIndex(n.parentCacheIndex),d=Ll({getItemId:r},n,e,i+1,a+1);if(d)return d}}function Rl(r,[t,...e],i=0){t===1/0&&(t=r.size-1);let s=r.getFlatIndex(t),n=r.getSubCache(t);return n?.flatSize>0&&e.length?Rl(n,e,i+s+1):i+s}var vo=class extends EventTarget{host;dataProvider;dataProviderParams;isExpanded;getItemId;rootCache;placeholder;isPlaceholder;constructor(t,{size:e,pageSize:i,isExpanded:s,getItemId:n,isPlaceholder:a,placeholder:d,dataProvider:c,dataProviderParams:f}){super(),this.host=t,this.getItemId=n,this.isExpanded=s,this.placeholder=d,this.isPlaceholder=a,this.dataProvider=c,this.dataProviderParams=f,this.rootCache=this.#t(i,e)}get flatSize(){return this.rootCache.flatSize}get pageSize(){return this.rootCache.pageSize}get#e(){return{isExpanded:this.isExpanded,placeholder:this.placeholder}}isLoading(){return this.rootCache.isLoading}setPageSize(t){this.rootCache.pageSize=t}setDataProvider(t){this.dataProvider=t}recalculateFlatSize(){this.rootCache.recalculateFlatSize()}clearCache(){this.rootCache=this.#t(this.rootCache.pageSize,this.rootCache.size)}getFlatIndexContext(t){return Pl(this.rootCache,t)}getItemContext(t){return Ll({getItemId:this.getItemId},this.rootCache,t)}getFlatIndexByPath(t){return Rl(this.rootCache,t)}ensureFlatIndexLoaded(t){let{cache:e,page:i,item:s}=this.getFlatIndexContext(t);this.#r(s)||this.#i(e,i)}ensureFlatIndexHierarchy(t){let{cache:e,item:i,index:s}=this.getFlatIndexContext(t);if(this.#r(i)&&this.isExpanded(i)&&!e.getSubCache(s)){let n=e.createSubCache(s);this.#i(n,0)}}loadFirstPage(){this.#i(this.rootCache,0)}_shouldLoadCachePage(t,e){return!0}#t(t,e){return new go(this.#e,t,e)}#i(t,e){if(!this.dataProvider||t.pendingRequests[e]||!this._shouldLoadCachePage(t,e))return;let i={page:e,pageSize:t.pageSize,parentItem:t.parentItem};this.dataProviderParams&&(i={...i,...this.dataProviderParams()});let s=(n,a)=>{t.pendingRequests[e]===s&&(a!==void 0?t.size=a:i.parentItem&&(t.size=n.length),t.setPage(e,n),this.recalculateFlatSize(),this.dispatchEvent(new CustomEvent("page-received")),delete t.pendingRequests[e],this.dispatchEvent(new CustomEvent("page-loaded")))};t.pendingRequests[e]=s,this.dispatchEvent(new CustomEvent("page-requested")),this.dataProvider(i,s)}#r(t){return this.isPlaceholder?!this.isPlaceholder(t):this.placeholder?t!==this.placeholder:!!t}};var Pc=r=>class extends r{static get properties(){return{pageSize:{type:Number,value:50,observer:"_pageSizeChanged",sync:!0},size:{type:Number,observer:"_sizeChanged",sync:!0},dataProvider:{type:Object,observer:"_dataProviderChanged",sync:!0}}}static get observers(){return["_dataProviderFilterChanged(filter)","_ensureFirstPage(opened)"]}constructor(){super(),this.__dataProviderInitialized=!1,this.__previousDataProviderFilter,this.__dataProviderController=new vo(this,{placeholder:new Le,isPlaceholder:e=>e instanceof Le,dataProviderParams:()=>({filter:this.filter})}),this.__dataProviderController.addEventListener("page-requested",this.__onDataProviderPageRequested.bind(this)),this.__dataProviderController.addEventListener("page-loaded",this.__onDataProviderPageLoaded.bind(this))}ready(){super.ready(),this._scroller.addEventListener("index-requested",e=>{if(!this._shouldFetchData())return;let i=e.detail.index;i!==void 0&&this.__dataProviderController.ensureFlatIndexLoaded(i)}),this.__dataProviderInitialized=!0,this.dataProvider&&this.__synchronizeControllerState()}_dataProviderFilterChanged(e){if(this.__previousDataProviderFilter===void 0&&e===""){this.__previousDataProviderFilter=e;return}this.__previousDataProviderFilter!==e&&(this.__previousDataProviderFilter=e,this.__dataProviderController.rootCache.size=void 0,this.clearCache())}_shouldFetchData(){return this.dataProvider?this.opened||this.filter&&this.filter.length:!1}_ensureFirstPage(e){!this._shouldFetchData()||!e||(this._forceNextRequest||this.size===void 0?(this._forceNextRequest=!1,this.__dataProviderController.loadFirstPage()):this.size>0&&this.__dataProviderController.ensureFlatIndexLoaded(0))}__onDataProviderPageRequested(){this.__synchronizeControllerState()}__onDataProviderPageLoaded(){let{rootCache:e}=this.__dataProviderController;e.items=[...e.items],this.__synchronizeControllerState(),!this.opened&&!this._isInputFocused()&&this._commitValue()}clearCache(){this.dataProvider&&(this.__dataProviderController.clearCache(),this._shouldFetchData()?(this._forceNextRequest=!1,this.__dataProviderController.loadFirstPage()):this._forceNextRequest=!0,this.__synchronizeControllerState())}_sizeChanged(e){let{rootCache:i}=this.__dataProviderController;i.size!==e&&(i.size=e,i.items=[...i.items],this.__synchronizeControllerState())}_filteredItemsChanged(e){if(super._filteredItemsChanged(e),this.dataProvider&&e){let{rootCache:i}=this.__dataProviderController;i.items!==e&&(i.items=e,this.__synchronizeControllerState())}}__synchronizeControllerState(){if(this.__dataProviderInitialized&&this.dataProvider){let{rootCache:e}=this.__dataProviderController;this.setProperties({size:e.size,filteredItems:e.items,loading:this.__dataProviderController.isLoading()})}}_pageSizeChanged(e,i){if(Math.floor(e)!==e||e<1)throw this.pageSize=i,new Error("`pageSize` value must be an integer > 0");this.__dataProviderController.setPageSize(e),this.clearCache()}_dataProviderChanged(e,i){this._ensureItemsOrDataProvider(()=>{this.dataProvider=i}),this.__dataProviderController.setDataProvider(e),this.clearCache()}_ensureItemsOrDataProvider(e){if(this.items!==void 0&&this.dataProvider!==void 0)throw e(),new Error("Using `items` and `dataProvider` together is not supported")}};var Lc=r=>class extends r{static get observers(){return["__clearPendingFocusOnFilter(filter)"]}__focusIndex(e){if(!(typeof e!="number"||Number.isNaN(e)||e<0)&&!this.filter){if(!this._overlayOpened||!this._dropdownItems||this._dropdownItems.length===0){this.__pendingFocusIndex=e;return}if(!(e>=this._dropdownItems.length)){if(this._focusedIndex=e,this._scrollIntoView(e,!0),this.loading){this.__pendingFocusIndex=e;return}delete this.__pendingFocusIndex,requestAnimationFrame(()=>{this.isConnected&&this._updateActiveDescendant(e)})}}}__focusPendingIndexIfNeeded(){this.__pendingFocusIndex!==void 0&&!this.loading&&this.__focusIndex(this.__pendingFocusIndex)}__clearPendingFocusOnFilter(){delete this.__pendingFocusIndex}_onOpened(){super._onOpened(),this.__focusPendingIndexIfNeeded()}__onDataProviderPageLoaded(){super.__onDataProviderPageLoaded(),this.__focusPendingIndexIfNeeded()}};var yo=r=>class extends Be(ui(Fe(Me(r)))){static get properties(){return{opened:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0,sync:!0,observer:"_openedChanged"},autoOpenDisabled:{type:Boolean,sync:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},_focusedIndex:{type:Number,observer:"_focusedIndexChanged",value:-1,sync:!0},_toggleElement:{type:Object,observer:"_toggleElementChanged"},_dropdownItems:{type:Array,sync:!0},_overlayOpened:{type:Boolean,sync:!0,observer:"_overlayOpenedChanged"}}}constructor(){super(),this._scroller,this._closeOnBlurIsPrevented,this._boundOverlaySelectedItemChanged=this._overlaySelectedItemChanged.bind(this),this._boundOnClearButtonMouseDown=this.__onClearButtonMouseDown.bind(this),this._boundOnClick=this._onClick.bind(this),this._boundOnOverlayTouchAction=this._onOverlayTouchAction.bind(this),this._boundOnOverlayClick=this.__onOverlayClick.bind(this),this._boundOnTouchend=this._onTouchend.bind(this)}get _tagNamePrefix(){return"vaadin-combo-box"}_inputElementChanged(e){super._inputElementChanged(e),e&&(e.autocomplete="off",e.autocapitalize="off",e.setAttribute("role","combobox"),e.setAttribute("aria-autocomplete","list"),e.setAttribute("aria-expanded",!!this.opened),e.setAttribute("spellcheck","false"),e.setAttribute("autocorrect","off"))}firstUpdated(){super.firstUpdated(),this._initScroller()}ready(){super.ready(),this._initOverlay(),this.addEventListener("click",this._boundOnClick),this.addEventListener("touchend",this._boundOnTouchend),this.clearElement&&this.clearElement.addEventListener("mousedown",this._boundOnClearButtonMouseDown)}updated(e){super.updated(e),(e.has("opened")||e.has("_dropdownItems")||e.has("loading"))&&(this._overlayOpened=this.opened&&(!!this.loading||this._hasDropdownItems)),["_overlayOpened","_dropdownItems","_focusedIndex","_theme"].some(i=>e.has(i))&&this._updateScroller(),e.has("_overlayOpened")&&this._overlayOpened&&this._updateActiveDescendant(this._focusedIndex)}disconnectedCallback(){super.disconnectedCallback(),this.close()}open(){!this.disabled&&!this.readonly&&(this.opened=!0)}close(){this.opened=!1}_initOverlay(){let e=this.$.overlay;e.addEventListener("touchend",this._boundOnOverlayTouchAction),e.addEventListener("touchmove",this._boundOnOverlayTouchAction),e.addEventListener("click",this._boundOnOverlayClick,!0),e.addEventListener("mousedown",i=>i.preventDefault()),e.addEventListener("opened-changed",i=>{this._overlayOpened=i.detail.value}),e.addEventListener("vaadin-overlay-closed",()=>{this._scroller.items=[],this._onOverlayClosed()}),this._overlayElement=e}_initScroller(){let e=document.createElement(`${this._tagNamePrefix}-scroller`);e.owner=this,e.getItemLabel=this._getItemLabel.bind(this),e.addEventListener("selection-changed",this._boundOverlaySelectedItemChanged),this._renderScroller(e),this._scroller=e}_renderScroller(e){e.setAttribute("slot","overlay"),e.setAttribute("tabindex","-1"),this.appendChild(e)}_updateScroller(){let e=this._overlayOpened;e&&(this._scroller.style.maxHeight=getComputedStyle(this).getPropertyValue(`--${this._tagNamePrefix}-overlay-max-height`)||"65vh");let i=this.hasAttribute("closing");this._scroller.setProperties({items:e||i?this._dropdownItems:[],opened:e,focusedIndex:this._focusedIndex,theme:this._theme})}get _hasDropdownItems(){return!!(this._dropdownItems&&this._dropdownItems.length)}_overlayOpenedChanged(e,i){e?this._onOpened():i&&this._hasDropdownItems&&this.close()}_focusedIndexChanged(e,i){i!==void 0&&this._updateActiveDescendant(e)}_isInputFocused(){return this.inputElement&&Pe(this.inputElement)}_updateActiveDescendant(e){let i=this.inputElement;if(!i)return;let s=this._getItemElements().find(n=>n.index===e);Y(i,"aria-activedescendant",s?.id)}_openedChanged(e,i){if(i===void 0)return;e?!this._isInputFocused()&&!Zt&&this.inputElement&&this.inputElement.focus():(this.__blurOnClick=!1,this.autoselect&&(this.__autoselectPending=!0),this._onClosed());let s=this.inputElement;s&&(s.setAttribute("aria-expanded",!!e),Y(s,"aria-controls",e&&this._scroller.id))}_onOverlayTouchAction(e){if(e.type==="touchend"){this.__blurOnClick=!0;return}this.__blurInputKeepOpened()}__onOverlayClick(){this.__blurOnClick&&(this.__blurOnClick=!1,this.__blurInputKeepOpened())}__blurInputKeepOpened(){this._closeOnBlurIsPrevented=!0,this.inputElement.blur(),this._closeOnBlurIsPrevented=!1}_isClearButton(e){return e.composedPath()[0]===this.clearElement}__onClearButtonMouseDown(e){e.preventDefault(),this.inputElement.focus()}_onClearButtonClick(e){e.preventDefault(),this._onClearAction()}_onToggleButtonClick(e){e.preventDefault(),this.opened?this.close():this.open()}_onHostClick(e){this.autoOpenDisabled||(e.preventDefault(),this.open())}_onClick(e){this.autoselect&&this.inputElement&&this.__autoselectPending&&(this.inputElement.selectionStart!==this.inputElement.selectionEnd||this.inputElement.select()),this.__autoselectPending=!1,this._isClearButton(e)?this._onClearButtonClick(e):e.composedPath().includes(this._toggleElement)?this._onToggleButtonClick(e):this._onHostClick(e)}_onTouchend(e){!this.clearElement||e.composedPath()[0]!==this.clearElement||(e.preventDefault(),this._onClearAction())}_onKeyDown(e){super._onKeyDown(e),e.key==="ArrowDown"?(this._onArrowDown(),e.preventDefault()):e.key==="ArrowUp"&&(this._onArrowUp(),e.preventDefault())}_getItemLabel(e){return e?e.toString():""}_isSameItem(e,i){return e===i}_onArrowDown(){if(this.opened){let e=this._dropdownItems;e&&(this._focusedIndex=Math.min(e.length-1,this._focusedIndex+1),this._prefillFocusedItemLabel())}else this.open()}_onArrowUp(){if(this.opened){if(this._focusedIndex>-1)this._focusedIndex=Math.max(0,this._focusedIndex-1);else{let e=this._dropdownItems;e&&(this._focusedIndex=e.length-1)}this._prefillFocusedItemLabel()}else this.open()}_prefillFocusedItemLabel(){if(this._focusedIndex>-1){let e=this._dropdownItems[this._focusedIndex];this._inputElementValue=this._getItemLabel(e),this._markAllSelectionRange()}}_setSelectionRange(e,i){this._isInputFocused()&&this.inputElement.setSelectionRange&&this.inputElement.setSelectionRange(e,i)}_markAllSelectionRange(){this._inputElementValue!==void 0&&this._setSelectionRange(0,this._inputElementValue.length)}_clearSelectionRange(){if(this._inputElementValue!==void 0){let e=this._inputElementValue?this._inputElementValue.length:0;this._setSelectionRange(e,e)}}_closeOrCommit(){this.opened?this.close():this._commitValue()}_onEnter(e){if(!this._hasValidInputValue()){e.preventDefault(),e.stopPropagation();return}this.opened&&(e.preventDefault(),e.stopPropagation()),this._closeOrCommit()}_hasValidInputValue(){return!0}_onEscape(e){this.autoOpenDisabled&&(this.opened||this.value!==this._inputElementValue&&this._inputElementValue.length>0)?(e.stopPropagation(),this._focusedIndex=-1,this._onEscapeCancel()):this.opened?(e.stopPropagation(),this._focusedIndex>-1?(this._focusedIndex=-1,this._revertInputValue()):this._onEscapeCancel()):this.clearButtonVisible&&this.value&&!this.readonly&&(e.stopPropagation(),this._onClearAction())}_onEscapeCancel(){}_toggleElementChanged(e){e&&(e.addEventListener("mousedown",i=>i.preventDefault()),e.addEventListener("click",()=>{Zt&&!this._isInputFocused()&&document.activeElement.blur()}))}_onClearAction(){}_onOpened(){}_onClosed(){}_onOverlayClosed(){}_commitValue(){}_revertInputValue(){this._inputElementValue=this.value,this._clearSelectionRange()}_onInput(e){!this.opened&&!this._isClearButton(e)&&!this.autoOpenDisabled&&(this.opened=!0)}_getItemElements(){return Array.from(this._scroller.querySelectorAll(`${this._tagNamePrefix}-item`))}_scrollIntoView(e,i=!1){this._scroller&&this._scroller.scrollIntoView(e,i)}_overlaySelectedItemChanged(e){e.stopPropagation(),!this.hasAttribute("closing")&&(e.detail.item instanceof Le||this.opened&&(this._focusedIndex=this._dropdownItems.indexOf(e.detail.item),this.close()))}_setFocused(e){super._setFocused(e),e||(this.__autoselectPending=!1),!e&&!this.readonly&&!this._closeOnBlurIsPrevented&&this._handleFocusOut()}_handleFocusOut(){if(ce()){this._closeOrCommit();return}this.opened?this._overlayOpened||this.close():this._commitValue()}_shouldRemoveFocus(e){return e.relatedTarget&&e.relatedTarget.localName===`${this._tagNamePrefix}-item`?!1:e.relatedTarget===this._overlayElement?(e.composedPath()[0].focus(),!1):!0}};function $b(r){return r!=null}function Rc(r,t){return r.findIndex(e=>e instanceof Le?!1:t(e))}var Nc=r=>class extends yo(r){static get properties(){return{items:{type:Array,sync:!0,observer:"_itemsChanged"},filteredItems:{type:Array,observer:"_filteredItemsChanged",sync:!0},filter:{type:String,value:"",notify:!0,sync:!0},itemLabelGenerator:{type:Object},itemLabelPath:{type:String,value:"label",observer:"_itemLabelPathChanged",sync:!0},itemValuePath:{type:String,value:"value",sync:!0},itemIdPath:{type:String,sync:!0},partialMatchMode:{type:String,value:"none"}}}updated(e){super.updated(e),e.has("filter")&&this._filterChanged(this.filter),e.has("itemLabelGenerator")&&this.requestContentUpdate()}requestContentUpdate(){this._scroller&&(this._scroller.requestContentUpdate(),this._getItemElements().forEach(e=>{e.requestContentUpdate()}))}_onClearButtonClick(e){super._onClearButtonClick(e),this.opened&&this.requestContentUpdate()}_onInput(e){let i=this._inputElementValue;this.filter===i?this._filterChanged(this.filter):this.filter=i,!this.opened&&!this._isClearButton(e)&&!this.autoOpenDisabled&&(this.opened=!0)}_onOpened(){super._onOpened(),this.filter&&this._focusedIndex===-1&&(this._focusedIndex=this.__getItemIndexByFilter(this._dropdownItems))}_getItemLabel(e){if(typeof this.itemLabelGenerator=="function"&&e)return this.itemLabelGenerator(e)||"";let i=e&&this.itemLabelPath?$i(this.itemLabelPath,e):void 0;return i==null&&(i=e?e.toString():""),i}_getItemValue(e){let i=e&&this.itemValuePath?$i(this.itemValuePath,e):void 0;return i===void 0&&(i=e?e.toString():""),i}_isSameItem(e,i){if(this.itemIdPath&&e&&i){let s=$i(this.itemIdPath,e);if(s!==void 0)return s===$i(this.itemIdPath,i)}return super._isSameItem(e,i)}_itemLabelPathChanged(e){typeof e!="string"&&console.error("You should set itemLabelPath to a valid string")}_filterChanged(e){this._scrollIntoView(0),this._focusedIndex=-1,this.items?this.filteredItems=this._filterItems(this.items,e):this._filteredItemsChanged(this.filteredItems)}_itemsChanged(e,i){this._ensureItemsOrDataProvider(()=>{this.items=i}),e?this.filteredItems=e.slice(0):i&&(this.filteredItems=null)}_filteredItemsChanged(e){this._setDropdownItems(e)}_setDropdownItems(e){let i=this._dropdownItems;this._dropdownItems=e;let s=i?i[this._focusedIndex]:null;if(i&&i[this._focusedIndex]instanceof Le&&e[this._focusedIndex]instanceof Le)return;let n=this.__getItemIndexByValue(e,this._getItemValue(s));n>-1?this._focusedIndex=n:this._focusedIndex=this.__getItemIndexByFilter(e)}_filterItems(e,i){return e&&e.filter(n=>(i=i?i.toString().toLowerCase():"",this._getItemLabel(n).toString().toLowerCase().indexOf(i)>-1))}__getItemIndexByValue(e,i){return!e||!$b(i)?-1:Rc(e,s=>this._getItemValue(s)===i)}__getItemIndexByLabel(e,i){return!e||!i?-1:Rc(e,s=>this._getItemLabel(s).toString().toLowerCase()===i.toString().toLowerCase())}__getItemIndexByFilter(e){let i=this.__getItemIndexByLabel(e,this.filter);return i>-1?i:!this.opened||!e||e.length===0||!this.filter||this.allowCustomValue?-1:this.partialMatchMode==="first-match"||this.partialMatchMode==="only-match"&&e.length===1?e[0]instanceof Le?-1:0:-1}};var $c=r=>class extends ui(Be(r)){static get properties(){return{clearButtonVisible:{type:Boolean,reflectToAttribute:!0,value:!1}}}get clearElement(){return console.warn(`Please implement the 'clearElement' property in <${this.localName}>`),null}ready(){super.ready(),this.clearElement&&(this.clearElement.addEventListener("mousedown",e=>this._onClearButtonMouseDown(e)),this.clearElement.addEventListener("click",e=>this._onClearButtonClick(e)))}_onClearButtonClick(e){e.preventDefault(),this._onClearAction()}_onClearButtonMouseDown(e){this._shouldKeepFocusOnClearMousedown()&&e.preventDefault(),Zt||this.inputElement.focus()}_onEscape(e){super._onEscape(e),this.clearButtonVisible&&this.value&&!this.readonly&&(e.stopPropagation(),this._onClearAction())}_onClearAction(){this._inputElementValue="",this.inputElement.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.inputElement.dispatchEvent(new Event("change",{bubbles:!0}))}_shouldKeepFocusOnClearMousedown(){return Pe(this.inputElement)}};var Fb=r=>class extends hr(Bn(ui(r))){static get constraints(){return["required"]}static get delegateAttrs(){return[...super.delegateAttrs,"required"]}ready(){super.ready(),this._createConstraintsObserver()}checkValidity(){return this.inputElement&&this._hasValidConstraints(this.constructor.constraints.map(e=>this[e]))?this.inputElement.checkValidity():!this.invalid}_hasValidConstraints(e){return e.some(i=>this.__isValidConstraint(i))}_createConstraintsObserver(){this._createMethodObserver(`_constraintsChanged(stateTarget, ${this.constructor.constraints.join(", ")})`)}_constraintsChanged(e,...i){if(!e)return;let s=this._hasValidConstraints(i),n=this.__previousHasConstraints&&!s;(this._hasValue||this.invalid)&&s?this._requestValidation():n&&!this.manualValidation&&this._setInvalid(!1),this.__previousHasConstraints=s}_onChange(e){e.stopPropagation(),this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{detail:{sourceEvent:e},bubbles:e.bubbles,cancelable:e.cancelable}))}__isValidConstraint(e){return!!e||e===0}},yr=ge(Fb);var gi=r=>class extends dr(Ct(yr(dt($c(Be(r)))))){static get properties(){return{allowedCharPattern:{type:String,observer:"_allowedCharPatternChanged"},autoselect:{type:Boolean,value:!1},name:{type:String,reflectToAttribute:!0},placeholder:{type:String,reflectToAttribute:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},title:{type:String,reflectToAttribute:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"name","type","placeholder","readonly","invalid","title"]}constructor(){super(),this._boundOnPaste=this._onPaste.bind(this),this._boundOnDrop=this._onDrop.bind(this),this._boundOnBeforeInput=this._onBeforeInput.bind(this)}get slotStyles(){let e=this.localName;return[`
          /* Needed for Safari, where ::slotted(...)::placeholder does not work */
          ${e} > :is(input[slot='input'], textarea[slot='textarea'])::placeholder {
            font: inherit;
            color: inherit;
          }

          /* Override built-in autofill styles */
          ${e} > input[slot='input']:autofill {
            -webkit-text-fill-color: var(--vaadin-input-field-autofill-color, black) !important;
            background-clip: text !important;
          }

          ${e}:has(> input[slot='input']:autofill)::part(input-field) {
            --vaadin-input-field-background: var(--vaadin-input-field-autofill-background, lightyellow) !important;
            --vaadin-input-field-value-color: var(--vaadin-input-field-autofill-color, black) !important;
            --vaadin-input-field-button-text-color: var(--vaadin-input-field-autofill-color, black) !important;
          }
        `]}_onFocus(e){super._onFocus(e),this.autoselect&&this.inputElement&&this.inputElement.select()}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("paste",this._boundOnPaste),e.addEventListener("drop",this._boundOnDrop),e.addEventListener("beforeinput",this._boundOnBeforeInput)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("paste",this._boundOnPaste),e.removeEventListener("drop",this._boundOnDrop),e.removeEventListener("beforeinput",this._boundOnBeforeInput)}_onKeyDown(e){super._onKeyDown(e),this.allowedCharPattern&&!this.__shouldAcceptKey(e)&&e.target===this.inputElement&&(e.preventDefault(),this._markInputPrevented())}_markInputPrevented(){this.setAttribute("input-prevented",""),this._preventInputDebouncer=ae.debounce(this._preventInputDebouncer,Ge.after(200),()=>{this.removeAttribute("input-prevented")})}__shouldAcceptKey(e){return e.metaKey||e.ctrlKey||!e.key||e.key.length!==1||this.__allowedCharRegExp.test(e.key)}_onPaste(e){if(this.allowedCharPattern){let i=e.clipboardData.getData("text");this.__allowedTextRegExp.test(i)||(e.preventDefault(),this._markInputPrevented())}}_onDrop(e){if(this.allowedCharPattern){let i=e.dataTransfer.getData("text");this.__allowedTextRegExp.test(i)||(e.preventDefault(),this._markInputPrevented())}}_onBeforeInput(e){this.allowedCharPattern&&e.data&&!this.__allowedTextRegExp.test(e.data)&&(e.preventDefault(),this._markInputPrevented())}_allowedCharPatternChanged(e){if(e)try{this.__allowedCharRegExp=new RegExp(`^${e}$`,"u"),this.__allowedTextRegExp=new RegExp(`^${e}*$`,"u")}catch(i){console.error(i)}}};var Bb={cleared:"Selection cleared",focused:"focused. Press Backspace to remove",selected:"added to selection",deselected:"removed from selection",total:"{count} items selected"},Fc=r=>class extends Et(Lc(Pc(Nc(gi(vr(r)))))){static get properties(){return{autoExpandHorizontally:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},autoExpandVertically:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},collapseChips:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},itemClassNameGenerator:{type:Object,sync:!0},keepFilter:{type:Boolean,value:!1},loading:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},selectedItems:{type:Array,value:()=>[],notify:!0,sync:!0},allowCustomValue:{type:Boolean,value:!1},placeholder:{type:String,observer:"_placeholderChanged",reflectToAttribute:!0,sync:!0},renderer:{type:Function,sync:!0},selectedItemsOnTop:{type:Boolean,value:!1,sync:!0},value:{type:String},_overflowItems:{type:Array,value:()=>[],sync:!0},_focusedChipIndex:{type:Number,value:-1,observer:"_focusedChipIndexChanged"},_lastFilter:{type:String,sync:!0},_topGroup:{type:Array,observer:"_topGroupChanged",sync:!0},_inputField:{type:Object}}}static get observers(){return["_selectedItemsChanged(selectedItems)","__updateOverflowChip(_overflow, _overflowItems, disabled, readonly)","__updateTopGroup(selectedItemsOnTop, selectedItems, opened)"]}static get defaultI18n(){return Bb}get i18n(){return super.i18n}set i18n(e){super.i18n=e}get slotStyles(){let e=this.localName;return[...super.slotStyles,`
        ${e}[has-value] input::placeholder {
          color: transparent !important;
          forced-color-adjust: none;
        }
      `]}get clearElement(){return this.$.clearButton}get _chips(){return[...this.querySelectorAll('[slot="chip"]')]}get _hasValue(){return this.selectedItems&&this.selectedItems.length>0}get _tagNamePrefix(){return"vaadin-multi-select-combo-box"}ready(){super.ready(),this.addController(new Ve(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new Ie(this.inputElement,this._labelController)),this._tooltipController=new ue(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this._tooltipController.setShouldShow(e=>!e.opened),this._toggleElement=this.$.toggleButton,this._inputField=this.shadowRoot.querySelector('[part="input-field"]'),this._overflowController=new ie(this,"overflow","vaadin-multi-select-combo-box-chip",{initializer:e=>{e.addEventListener("mousedown",i=>this._preventBlur(i)),this._overflow=e}}),this.addController(this._overflowController)}updated(e){super.updated(e),["loading","itemClassNameGenerator","renderer"].forEach(s=>{e.has(s)&&(this._scroller[s]=this[s])}),e.has("selectedItems")&&this.opened&&this.$.overlay._updateOverlayWidth(),["autoExpandHorizontally","autoExpandVertically","collapseChips","disabled","readonly","clearButtonVisible","itemClassNameGenerator"].some(s=>e.has(s))&&this.__updateChips(),e.has("readonly")&&(this._setDropdownItems(this.filteredItems),this.dataProvider&&this.clearCache())}checkValidity(){return this.required&&!this.readonly?this._hasValue:!0}open(){!this.disabled&&!(this.readonly&&this.selectedItems.length===0)&&(this.opened=!0)}clear(){this.__updateSelection([]),ur(this.__effectiveI18n.cleared)}__syncTopGroup(){this._topGroup=this.selectedItemsOnTop?[...this.selectedItems]:[]}clearCache(){this.readonly||(super.clearCache(),this.__syncTopGroup())}_itemsChanged(e,i){super._itemsChanged(e,i),this.__syncTopGroup()}_onHostClick(e){let i=e.composedPath();(i.includes(this._labelNode)||i.includes(this._inputField))&&super._onHostClick(e)}_onClearAction(){this.clear()}_onClosed(){this._ignoreCommitValue=!0,(!this.loading||this.allowCustomValue)&&this._commitValue()}_revertInputValue(){this._inputElementValue=this.filter,this._clearSelectionRange()}_commitValue(){this._lastFilter=this.filter,this._ignoreCommitValue?(this._inputElementValue="",this._focusedIndex=-1,this._ignoreCommitValue=!1):this.__commitUserInput(),(!this.keepFilter||!this.opened)&&(this.filter="")}__commitUserInput(){if(this._focusedIndex>-1){let e=this._dropdownItems[this._focusedIndex];if(this._lastFilter&&this._lastFilter===this._inputElementValue&&this._findIndex(e,this.selectedItems)!==-1){this.__clearInternalValue();return}this.__selectItem(e)}else if(this._inputElementValue){let e=[...this._dropdownItems],i=e[this.__getItemIndexByLabel(e,this._inputElementValue)];if(this.allowCustomValue&&!i){let s=this._inputElementValue;this._lastCustomValue=s,this.__clearInternalValue(!0),this.dispatchEvent(new CustomEvent("custom-value-set",{detail:s,composed:!0,bubbles:!0}))}else!this.allowCustomValue&&!this.opened&&i?this.__selectItem(i):this._inputElementValue=""}}_setFocused(e){let i=!e&&!this._closeOnBlurIsPrevented;i&&(this._ignoreCommitValue=!0),super._setFocused(e),i&&document.hasFocus()&&(this._focusedChipIndex=-1,this._requestValidation()),i&&this.readonly&&this.close()}_onResize(){this.__updateChips()}_delegateAttribute(e,i){if(this.stateTarget){if(e==="required"){this._delegateAttribute("aria-required",i?"true":!1);return}super._delegateAttribute(e,i)}}_placeholderChanged(e){let i=this.__tmpA11yPlaceholder;i!==e&&(this.__savedPlaceholder=e,i&&(this.placeholder=i))}_selectedItemsChanged(e){if(this._toggleHasValue(this._hasValue),this._hasValue){let i=this._mergeItemLabels(e);this.__tmpA11yPlaceholder===void 0&&(this.__savedPlaceholder=this.placeholder),this.__tmpA11yPlaceholder=i,this.placeholder=i}else this.__tmpA11yPlaceholder!==void 0&&(delete this.__tmpA11yPlaceholder,this.placeholder=this.__savedPlaceholder);this.__updateChips(),this.requestContentUpdate()}_topGroupChanged(e){e&&this._setDropdownItems(this.filteredItems)}_hasValidInputValue(){let e=this._focusedIndex<0&&this._inputElementValue!=="";return this.allowCustomValue||!e}_shouldFetchData(){return this.readonly?!1:super._shouldFetchData()}_setDropdownItems(e){super._setDropdownItems(this.__generateDropdownItems(e))}__generateDropdownItems(e){if(this.readonly)return this.selectedItems;if(this.filter||!this.selectedItemsOnTop)return e;if(e?.length&&this._topGroup?.length){let i=e.filter(s=>this._findIndex(s,this._topGroup)===-1);return this._topGroup.concat(i)}return e}_mergeItemLabels(e){return e.map(i=>this._getItemLabel(i)).join(", ")}_findIndex(e,i){return i.findIndex(s=>this._isSameItem(e,s))}__clearInternalValue(e=!1){!this.keepFilter||e?(this.filter="",this._inputElementValue=""):this._inputElementValue=this.filter}__announceItem(e,i,s){let n=i?"selected":"deselected",a=this.__effectiveI18n.total.replace("{count}",s||0);ur(`${e} ${this.__effectiveI18n[n]} ${a}`)}__removeItem(e){let i=[...this.selectedItems];i.splice(this._findIndex(e,i),1),this.__updateSelection(i);let s=this._getItemLabel(e);this.__announceItem(s,!1,i.length)}__selectItem(e){let i=[...this.selectedItems],s=this._findIndex(e,i),n=this._getItemLabel(e),a=!1;if(s!==-1){if(this._lastFilter?.toLowerCase()===n.toLowerCase()){this.__clearInternalValue();return}i.splice(s,1)}else i.push(e),a=!0;this.__updateSelection(i),this.__clearInternalValue(),this.__announceItem(n,a,i.length)}__updateSelection(e){this.selectedItems=e,this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}__updateTopGroup(e,i,s){e?(!s||this.__needToSyncTopGroup())&&(this._topGroup=[...i]):this._topGroup=[]}__needToSyncTopGroup(){return this.itemIdPath?this._topGroup&&this._topGroup.some(e=>{let i=this.selectedItems[this._findIndex(e,this.selectedItems)];return i&&e!==i}):!1}__createChip(e){let i=document.createElement("vaadin-multi-select-combo-box-chip");i.setAttribute("slot","chip"),i.item=e,i.disabled=this.disabled,i.readonly=this.readonly;let s=this._getItemLabel(e);return i.label=s,i.setAttribute("title",s),typeof this.itemClassNameGenerator=="function"&&(i.className=this.itemClassNameGenerator(e)),i.addEventListener("item-removed",n=>this._onItemRemoved(n)),i.addEventListener("mousedown",n=>this._preventBlur(n)),i}__getUsedWidth(e){return parseFloat(getComputedStyle(e).width)}__getWrapperGap(){return parseFloat(getComputedStyle(this._inputField.$.wrapper).columnGap)||0}__getWrapperWidth(){return this.__getUsedWidth(this._inputField.$.wrapper)-this.__getWrapperGap()}__getOverflowWidth(e){let i=this._overflow;i.style.visibility="hidden",i.removeAttribute("hidden"),i.label=`${e}`,i.setAttribute("count",`${e}`);let{marginInlineStart:s,marginInlineEnd:n}=getComputedStyle(i),a=this.__getUsedWidth(i)+parseFloat(s)+parseFloat(n)+this.__getWrapperGap();return i.setAttribute("hidden",""),i.style.visibility="",a}__updateChips(){if(!this._inputField||!this.inputElement)return;if(this._chips.forEach(i=>{i.remove()}),this.selectedItems.length===0){this._overflowItems=[];return}if(this.autoExpandVertically){this.selectedItems.forEach(i=>{this.appendChild(this.__createChip(i))}),this._overflowItems=[];return}let e=parseFloat(getComputedStyle(this.inputElement).flexBasis);this.collapseChips?this._overflowItems=this.__updateChipsCollapsed(this.selectedItems,e):this.autoExpandHorizontally?this._overflowItems=this.__updateChipsHorizontalExpand(this.selectedItems,e):this._overflowItems=this.__updateChipsDefault(this.selectedItems,e)}__renderAllChips(e,i){let s=e.map(a=>{let d=this.__createChip(a);return this.appendChild(d),d}),n=this.__getWrapperWidth()-this.__getUsedWidth(this.$.chips)>=i;return{chips:s,allChipsFit:n}}__updateChipsCollapsed(e,i){let{chips:s,allChipsFit:n}=this.__renderAllChips(e,i);return n?[]:(s.forEach(a=>a.remove()),e.slice())}__updateChipsHorizontalExpand(e,i){let{chips:s,allChipsFit:n}=this.__renderAllChips(e,i);if(n)return[];let a=this.__getWrapperWidth(),d=this.__getOverflowWidth(e.length-1),c=s.length;for(;c>1;){c-=1,s[c].remove();let f=this.__getUsedWidth(this.$.chips);if(a-f>=i+d&&(d=this.__getOverflowWidth(e.length-c),a-f>=i+d))break}if(c===1){let f=parseInt(getComputedStyle(this).getPropertyValue("--_chip-min-width")),m=a-i-d;s[0].style.maxWidth=`${Math.max(f,m)}px`}return e.slice(c)}__updateChipsDefault(e,i){let s=this.__getWrapperWidth()-i,n=parseInt(getComputedStyle(this).getPropertyValue("--_chip-min-width"));for(let a=e.length-1,d=null;a>=0;a--){let c=this.__createChip(e[a]);this.insertBefore(c,d);let f=e.length>1?s-this.__getOverflowWidth(Math.max(a,1)):s;if(this.__getUsedWidth(this.$.chips)>f&&(f<n||d!==null))return c.remove(),e.slice(0,a+1);c.style.maxWidth=`${f}px`,d=c}return[]}__updateOverflowChip(e,i,s,n){if(e){let a=i.length;e.label=`${a}`,e.setAttribute("count",`${a}`),e.setAttribute("title",this._mergeItemLabels(i)),e.toggleAttribute("hidden",a===0),e.disabled=s,e.readonly=n}}_onClearButtonClick(e){e.stopPropagation(),super._onClearButtonClick(e)}_onChange(e){e.stopPropagation()}_onEscape(e){if(this.readonly){e.stopPropagation(),this.opened&&this.close();return}this.clearButtonVisible&&!this.opened&&this.selectedItems&&this.selectedItems.length&&(e.stopPropagation(),this._onClearAction()),super._onEscape(e)}_onEscapeCancel(){this._closeOrCommit()}_onEnter(e){if(this.opened){if(e.preventDefault(),e.stopPropagation(),this.readonly)this.close();else if(this._hasValidInputValue()){let i=this._dropdownItems[this._focusedIndex];this._commitValue(),this._focusedIndex=this._dropdownItems.indexOf(i)}return}super._onEnter(e)}_onArrowDown(){this.readonly?this.opened||this.open():super._onArrowDown()}_onArrowUp(){this.readonly?this.opened||this.open():super._onArrowUp()}_onKeyDown(e){super._onKeyDown(e);let i=this._chips;if(!this.readonly&&i.length>0)switch(e.key){case"Backspace":this._onBackSpace(i);break;case"ArrowLeft":this._onArrowLeft(i,e);break;case"ArrowRight":this._onArrowRight(i,e);break;default:this._focusedChipIndex=-1;break}}_onArrowLeft(e,i){if(this.inputElement.selectionStart!==0)return;let s=this._focusedChipIndex;s!==-1&&i.preventDefault();let n;this.__isRTL?s===e.length-1?n=-1:s>-1&&(n=s+1):s===-1?n=e.length-1:s>0&&(n=s-1),n!==void 0&&(this._focusedChipIndex=n)}_onArrowRight(e,i){if(this.inputElement.selectionStart!==0)return;let s=this._focusedChipIndex;s!==-1&&i.preventDefault();let n;this.__isRTL?s===-1?n=e.length-1:s>0&&(n=s-1):s===e.length-1?n=-1:s>-1&&(n=s+1),n!==void 0&&(this._focusedChipIndex=n)}_onBackSpace(e){if(this.inputElement.selectionStart!==0)return;let i=this._focusedChipIndex;i===-1?this._focusedChipIndex=e.length-1:(this.__removeItem(e[i].item),this._focusedChipIndex=-1)}_focusedChipIndexChanged(e,i){if(e>-1||i>-1){let s=this._chips;if(s.forEach((n,a)=>{n.toggleAttribute("focused",a===e)}),e>-1){let n=s[e].item,a=this._getItemLabel(n);ur(`${a} ${this.__effectiveI18n.focused}`)}}}_overlaySelectedItemChanged(e){e.stopPropagation(),!this.hasAttribute("closing")&&(this.readonly||e.detail.item instanceof Le||this.opened&&(this._lastFilter=this._inputElementValue,this.__selectItem(e.detail.item)))}_onItemRemoved(e){this.__removeItem(e.detail.item)}_preventBlur(e){e.preventDefault()}};var hs=class extends Fc(I(K(O(A(S))))){static get is(){return"vaadin-multi-select-combo-box"}static get styles(){return[ze,Ac]}render(){return w`
      <div class="vaadin-multi-select-combo-box-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" @click="${this.focus}"></span>
        </div>

        <vaadin-multi-select-combo-box-container
          part="input-field"
          .autoExpandVertically="${this.autoExpandVertically}"
          .readonly="${this.readonly}"
          .disabled="${this.disabled}"
          .invalid="${this.invalid}"
          theme="${re(this._theme)}"
        >
          <slot name="overflow" slot="prefix"></slot>
          <div id="chips" part="chips" slot="prefix">
            <slot name="chip"></slot>
          </div>
          <slot name="input"></slot>
          <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
          <div id="toggleButton" part="field-button toggle-button" slot="suffix" aria-hidden="true"></div>
        </vaadin-multi-select-combo-box-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>

      <vaadin-multi-select-combo-box-overlay
        id="overlay"
        exportparts="overlay, content, loader"
        .owner="${this}"
        .dir="${this.dir}"
        .opened="${this._overlayOpened}"
        ?loading="${this.loading}"
        theme="${re(this._theme)}"
        .positionTarget="${this._inputField}"
        no-vertical-overlap
      >
        <slot name="overlay"></slot>
      </vaadin-multi-select-combo-box-overlay>
    `}};E(hs);var Vb=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},Bc=class extends hs{};Bc=Vb([q("or-vaadin-multi-select-combo-box")],Bc);var Vc=C`
  :host([step-buttons-visible]) ::slotted(input) {
    text-align: center;
  }

  [part~='decrease-button']::before {
    mask-image: var(--_vaadin-icon-minus);
  }

  [part~='increase-button']::before {
    mask-image: var(--_vaadin-icon-plus);
  }

  :host([dir='rtl']) [part='input-field'] {
    direction: ltr;
  }

  :host([readonly]) [part$='button'] {
    pointer-events: none;
  }
`;var br=r=>class extends gi(r){static get properties(){return{autocomplete:{type:String},autocorrect:{type:String,reflectToAttribute:!0},autocapitalize:{type:String,reflectToAttribute:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"autocapitalize","autocomplete","autocorrect"]}_inputElementChanged(e,i){super._inputElementChanged(e,i),e&&(e.value&&e.value!==this.value&&(console.warn(`Please define value on the <${this.localName}> component!`),e.value=""),this.value&&(e.value=this.value))}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}_onInput(e){super._onInput(e),this.invalid&&this._requestValidation()}_valueChanged(e,i){super._valueChanged(e,i),i!==void 0&&this.invalid&&this._requestValidation()}};var zc="NaN",Yc=r=>class extends br(r){static get properties(){return{min:{type:Number},max:{type:Number},step:{type:Number},stepButtonsVisible:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["_stepChanged(step, inputElement)"]}static get delegateProps(){return[...super.delegateProps,"min","max"]}static get constraints(){return[...super.constraints,"min","max","step"]}constructor(){super(),this._setType("number"),this.__onWheel=this.__onWheel.bind(this)}get slotStyles(){let e=this.localName;return[`
          ${e} input[type="number"]::-webkit-outer-spin-button,
          ${e} input[type="number"]::-webkit-inner-spin-button {
            appearance: none;
            margin: 0;
          }

          ${e} input[type="number"] {
            appearance: textfield;
          }

          ${e}[dir='rtl'] input[type="number"]::placeholder {
            direction: rtl;
          }

          ${e}[dir='rtl']:not([step-buttons-visible]) input[type="number"]::placeholder {
            text-align: left;
          }
        `]}get clearElement(){return this.$.clearButton}get __hasUnparsableValue(){return this._inputElementValue===zc}ready(){super.ready(),this.addController(new Ve(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new Ie(this.inputElement,this._labelController)),this._tooltipController=new ue(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement)}checkValidity(){return this.inputElement?this.inputElement.checkValidity():!this.invalid}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("wheel",this.__onWheel)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("wheel",this.__onWheel)}__onWheel(e){this.hasAttribute("focused")&&e.preventDefault()}_onDecreaseButtonTouchend(e){e.cancelable&&(e.preventDefault(),this.__blurActiveElement(),this._decreaseValue())}_onIncreaseButtonTouchend(e){e.cancelable&&(e.preventDefault(),this.__blurActiveElement(),this._increaseValue())}__blurActiveElement(){let e=Kt();e&&e!==this.inputElement&&e.blur()}_onDecreaseButtonClick(){this._decreaseValue()}_onIncreaseButtonClick(){this._increaseValue()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;let i=this.step||1,s=parseFloat(this.value);this.value?s<this.min?(e=0,s=this.min):s>this.max&&(e=0,s=this.max):this.min===0&&e<0||this.max===0&&e>0||this.max===0&&this.min===0?(e=0,s=0):(this.max==null||this.max>=0)&&(this.min==null||this.min<=0)?s=0:this.min>0?(s=this.min,this.max<0&&e<0&&(s=this.max),e=0):this.max<0&&(s=this.max,e<0?e=0:this._getIncrement(1,s-i)>this.max?s-=2*i:s-=i);let n=this._getIncrement(e,s);(!this.value||e===0||this._incrementIsInsideTheLimits(e,s))&&(this.inputElement.value=String(parseFloat(n)),this.inputElement.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.__commitValueChange())}_getIncrement(e,i){let s=this.step||1,n=this.min||0,a=Math.max(this._getMultiplier(i),this._getMultiplier(s),this._getMultiplier(n));s*=a,i=Math.round(i*a),n*=a;let d=(i-n)%s;return e>0?(i-d+s)/a:e<0?(i-(d||s))/a:i/a}_getDecimalCount(e){let i=String(e),s=i.indexOf(".");return s===-1?1:i.length-s-1}_getMultiplier(e){if(!isNaN(e))return 10**this._getDecimalCount(e)}_incrementIsInsideTheLimits(e,i){return e<0?this.min==null||this._getIncrement(e,i)>=this.min:e>0?this.max==null||this._getIncrement(e,i)<=this.max:this._getIncrement(e,i)<=this.max&&this._getIncrement(e,i)>=this.min}_isButtonEnabled(e){let i=e*(this.step||1),s=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(i,s)}_stepChanged(e,i){i&&(i.step=e||"any")}_valueChanged(e,i){e&&isNaN(parseFloat(e))?this.value="":typeof this.value!="string"&&(this.value=String(this.value)),super._valueChanged(this.value,i),this.__keepCommittedValue||(this.__committedValue=this.value,this.__committedUnparsableValueStatus=!1)}_onKeyDown(e){e.key==="ArrowUp"?(e.preventDefault(),this._increaseValue()):e.key==="ArrowDown"&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}_onInput(e){this.__keepCommittedValue=!0,super._onInput(e),this.__keepCommittedValue=!1}_onChange(e){e.stopPropagation()}_onClearAction(e){super._onClearAction(e),this.__commitValueChange()}_setFocused(e){super._setFocused(e),e||this.__commitValueChange()}_onEnter(e){super._onEnter(e),this.__commitValueChange()}__commitValueChange(){this.__committedValue!==this.value?(this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))):this.__committedUnparsableValueStatus!==this.__hasUnparsableValue&&(this._requestValidation(),this.dispatchEvent(new CustomEvent("unparsable-change"))),this.__committedValue=this.value,this.__committedUnparsableValueStatus=this.__hasUnparsableValue}get _inputElementValue(){return this.inputElement&&this.inputElement.validity.badInput?zc:super._inputElementValue}set _inputElementValue(e){super._inputElementValue=e}};var us=class extends Yc(I(K(O(A(S))))){static get is(){return"vaadin-number-field"}static get styles(){return[ze,Vc]}render(){return w`
      <div class="vaadin-field-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" @click="${this.focus}"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          .readonly="${this.readonly}"
          .disabled="${this.disabled}"
          .invalid="${this.invalid}"
          theme="${re(this._theme)}"
        >
          <div
            part="field-button decrease-button"
            ?disabled="${!this._isButtonEnabled(-1,this.value,this.min,this.max,this.step)}"
            ?hidden="${!this.stepButtonsVisible}"
            @click="${this._onDecreaseButtonClick}"
            @touchend="${this._onDecreaseButtonTouchend}"
            aria-hidden="true"
            slot="prefix"
          ></div>
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          <slot name="suffix" slot="suffix"></slot>
          <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
          <div
            part="field-button increase-button"
            ?disabled="${!this._isButtonEnabled(1,this.value,this.min,this.max,this.step)}"
            ?hidden="${!this.stepButtonsVisible}"
            @click="${this._onIncreaseButtonClick}"
            @touchend="${this._onIncreaseButtonTouchend}"
            aria-hidden="true"
            slot="suffix"
          ></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>
    `}};E(us);var zb=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},Uc=class extends us{_onEnter(r){return this.dispatchEvent(new CustomEvent("submit",{bubbles:!0,composed:!0})),super._onEnter(r)}};Uc=zb([q("or-vaadin-number-field")],Uc);var Yb=C`
  [part='radio'] {
    border-radius: 50%;
    color: var(--vaadin-radio-button-dot-color, var(--_marker-color));
  }

  [part='radio']::after {
    width: var(--vaadin-radio-button-dot-size, var(--vaadin-radio-button-marker-size, 50%));
    height: var(--vaadin-radio-button-dot-size, var(--vaadin-radio-button-marker-size, 50%));
    border-radius: 50%;
    filter: var(--vaadin-radio-button-dot-color, var(--_marker-filter));
  }
`,jc=[wt,An("radio","radio-button"),Yb];var Hc=r=>class extends dr(Fn(Pn(Ct(hi(r))))){static get properties(){return{name:{type:String,value:""}}}static get delegateAttrs(){return[...super.delegateAttrs,"name"]}constructor(){super(),this._setType("radio"),this.value="on",this.tabindex=0}get slotStyles(){return[`
          ${this.localName} > input[slot='input'] {
            opacity: 0;
          }
        `]}ready(){super.ready(),this.addController(new Ve(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new Ie(this.inputElement,this._labelController))}};var xr=class extends Hc(K(I(O(A(S))))){static get is(){return"vaadin-radio-button"}static get styles(){return jc}render(){return w`
      <div class="vaadin-radio-button-container">
        <div part="radio" aria-hidden="true"></div>
        <slot name="input"></slot>
        <slot name="label"></slot>
      </div>
    `}};E(xr);var Wc=[wt,Vn,C`
    :host([readonly]) ::slotted(vaadin-radio-button) {
      --vaadin-radio-button-background: transparent;
      --vaadin-radio-button-border-color: var(--vaadin-border-color);
      --_marker-color: var(--vaadin-radio-button-marker-color, var(--vaadin-text-color));
      --_marker-filter: none;
      --_border-style: dashed;
      --_cursor: var(--vaadin-disabled-cursor);
    }
  `];var qc=r=>class extends dt(Me(Fe(Be(r)))){static get properties(){return{name:{type:String,observer:"__nameChanged",sync:!0},value:{type:String,notify:!0,value:"",sync:!0,observer:"__valueChanged"},readonly:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0,observer:"__readonlyChanged"},_fieldName:{type:String}}}constructor(){super(),this.__registerRadioButton=this.__registerRadioButton.bind(this),this.__unregisterRadioButton=this.__unregisterRadioButton.bind(this),this.__onRadioButtonCheckedChange=this.__onRadioButtonCheckedChange.bind(this),this._tooltipController=new ue(this),this._tooltipController.addEventListener("tooltip-changed",e=>{if(e.detail.node?.isConnected){let s=this.__radioButtons.map(n=>n.inputElement);this._tooltipController.setAriaTarget(s)}else this._tooltipController.setAriaTarget([])})}get __radioButtons(){return this.__filterRadioButtons([...this.children])}get __selectedRadioButton(){return this.__radioButtons.find(e=>e.checked)}get isHorizontalRTL(){return this.__isRTL&&this._theme!=="vertical"}ready(){super.ready(),this.ariaTarget=this,this.setAttribute("role","radiogroup"),this._fieldName=`${this.localName}-${xt()}`;let e=this.shadowRoot.querySelector("slot:not([name])");this._observer=new $e(e,({addedNodes:i,removedNodes:s})=>{this.__filterRadioButtons(i).reverse().forEach(this.__registerRadioButton),this.__filterRadioButtons(s).forEach(this.__unregisterRadioButton);let n=this.__radioButtons.map(a=>a.inputElement);this._tooltipController.setAriaTarget(n)}),this.addController(this._tooltipController)}updated(e){super.updated(e),e.has("invalid")&&Y(this,"aria-invalid",this.invalid)}__filterRadioButtons(e){return e.filter(i=>i instanceof xr)}_onKeyDown(e){super._onKeyDown(e);let i=e.composedPath().find(s=>s instanceof xr);["ArrowLeft","ArrowUp"].includes(e.key)&&(e.preventDefault(),this.__selectNextRadioButton(i)),["ArrowRight","ArrowDown"].includes(e.key)&&(e.preventDefault(),this.__selectPrevRadioButton(i))}__nameChanged(e){this.__radioButtons.forEach(i=>{i.name=e||this._fieldName})}__selectNextRadioButton(e){let i=this.__radioButtons.indexOf(e);this.__selectIncRadioButton(i,this.isHorizontalRTL?1:-1)}__selectPrevRadioButton(e){let i=this.__radioButtons.indexOf(e);this.__selectIncRadioButton(i,this.isHorizontalRTL?-1:1)}__selectIncRadioButton(e,i){let s=(this.__radioButtons.length+e+i)%this.__radioButtons.length,n=this.__radioButtons[s];n.disabled?this.__selectIncRadioButton(s,i):(n.focusElement.focus(),n.focusElement.click())}__registerRadioButton(e){e.name=this.name||this._fieldName,e.addEventListener("checked-changed",this.__onRadioButtonCheckedChange),(this.disabled||this.readonly)&&(e.disabled=!0),e.checked&&this.__selectRadioButton(e)}__unregisterRadioButton(e){e.removeEventListener("checked-changed",this.__onRadioButtonCheckedChange),e.value===this.value&&this.__selectRadioButton(null)}__onRadioButtonCheckedChange(e){e.target.checked&&this.__selectRadioButton(e.target)}__valueChanged(e,i){if(!(i===void 0&&e==="")){if(e){let s=this.__radioButtons.find(n=>n.value===e);s?(this.__selectRadioButton(s),this.toggleAttribute("has-value",!0)):console.warn(`The radio button with the value "${e}" was not found.`)}else this.__selectRadioButton(null),this.removeAttribute("has-value");i!==void 0&&this._requestValidation()}}__readonlyChanged(e,i){!e&&i===void 0||i!==e&&this.__updateRadioButtonsDisabledProperty()}_disabledChanged(e,i){super._disabledChanged(e,i),!(!e&&i===void 0)&&i!==e&&this.__updateRadioButtonsDisabledProperty()}_shouldRemoveFocus(e){return!this.contains(e.relatedTarget)}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}__selectRadioButton(e){e?this.value=e.value:this.value="",this.__radioButtons.forEach(i=>{i.checked=i===e}),this.readonly&&this.__updateRadioButtonsDisabledProperty()}__updateRadioButtonsDisabledProperty(){this.__radioButtons.forEach(e=>{this.readonly?e.disabled=e!==this.__selectedRadioButton:e.disabled=this.disabled})}};var cs=class extends qc(K(I(O(A(S))))){static get is(){return"vaadin-radio-group"}static get styles(){return Wc}render(){return w`
      <div class="vaadin-group-field-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true"></span>
        </div>

        <div part="group-field">
          <slot></slot>
        </div>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <slot name="tooltip"></slot>
    `}};E(cs);var Ub=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},Kc=class extends cs{};Kc=Ub([q("or-vaadin-radio-group")],Kc);var Nl=class extends ro(I(J(O(A(S))))){static get is(){return"vaadin-select-item"}static get styles(){return mi}static get properties(){return{role:{type:String,value:"option",reflectToAttribute:!0}}}render(){return w`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}};E(Nl);var $l=class extends no(I(J(O(A(S))))){static get is(){return"vaadin-select-list-box"}static get styles(){return oo}static get properties(){return{orientation:{readOnly:!0}}}get _scrollerElement(){return this.shadowRoot.querySelector('[part="items"]')}render(){return w`
      <div part="items">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("role","listbox")}};E($l);var Gc=C`
  :host {
    align-items: flex-start;
    justify-content: flex-start;
  }

  [part='overlay'] {
    min-width: var(--vaadin-select-overlay-width, var(--_vaadin-select-overlay-default-width));
  }

  [part='content'] {
    padding: var(--vaadin-item-overlay-padding, 4px);
  }

  [part='backdrop'] {
    background: transparent;
  }
`;var Zc=r=>class extends _i(Ze(J(r))){willUpdate(e){super.willUpdate(e),(e.has("opened")||e.has("positionTarget"))&&this.opened&&this.positionTarget&&this._updateOverlayWidth()}ready(){super.ready(),this.restoreFocusOnClose=!0}_initFocus(){}get _contentRoot(){return this.owner.__slottedListBox||this._rendererRoot}get _rendererRoot(){if(!this.__savedRoot){let e=document.createElement("div");e.setAttribute("slot","overlay"),this.owner.appendChild(e),this.__savedRoot=e}return this.__savedRoot}_shouldCloseOnOutsideClick(e){return!0}_mouseDownListener(e){super._mouseDownListener(e),e.preventDefault()}_getMenuElement(){let i=this.owner.shadowRoot.querySelector('slot[name="overlay"]').assignedElements();return i.find(s=>s._hasVaadinListMixin)||i.flatMap(s=>[...s.children]).find(s=>s._hasVaadinListMixin)}_updateOverlayWidth(){this.style.setProperty("--_vaadin-select-overlay-default-width",`${this.positionTarget.offsetWidth}px`)}requestContentUpdate(){if(super.requestContentUpdate(),this.owner){let e=this._getMenuElement();this.owner._assignMenuElement(e)}}};var Fl=class extends Zc(I(O(A(S)))){static get is(){return"vaadin-select-overlay"}static get styles(){return[Xe,Gc]}render(){return w`
      <div id="backdrop" part="backdrop" ?hidden="${!this.withBackdrop}"></div>
      <div part="overlay" id="overlay">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `}updated(t){super.updated(t),t.has("renderer")&&this.requestContentUpdate()}};E(Fl);var Xc=C`
  :host {
    min-height: 1lh;
    outline: none;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    display: flex;
    align-items: center;
  }

  ::slotted(*) {
    padding: 0;
    cursor: inherit;
  }

  .vaadin-button-container,
  [part='label'] {
    display: contents;
  }

  :host([placeholder]) {
    color: var(--vaadin-input-field-placeholder-color, var(--vaadin-text-color-secondary));
  }

  :host([disabled]) {
    pointer-events: none;
  }
`;var Bl=class extends In(I(O(A(S)))){static get is(){return"vaadin-select-value-button"}static get styles(){return Xc}render(){return w`
      <div class="vaadin-button-container" role="presentation">
        <span part="label">
          <slot></slot>
        </span>
      </div>
    `}};E(Bl);var Jc=C`
  :host {
    position: relative;
  }

  ::slotted([slot='value']) {
    flex: 1;
  }

  ::slotted(div[slot='overlay']) {
    display: contents;
  }

  :host(:not([focus-ring])) [part='input-field'] {
    outline: none;
  }

  :host([readonly]:not([focus-ring])) [part='input-field'] {
    --vaadin-input-field-border-color: inherit;
  }

  [part='input-field'],
  :host(:not([readonly])) ::slotted([slot='value']) {
    cursor: var(--vaadin-clickable-cursor);
  }

  [part~='toggle-button']::before {
    mask-image: var(--_vaadin-icon-chevron-down);
  }

  :host([readonly]) [part~='toggle-button'] {
    display: none;
  }

  :host([theme~='align-start']) {
    --vaadin-item-text-align: start;
  }

  :host([theme~='align-center']) {
    --vaadin-item-text-align: center;
  }

  :host([theme~='align-end']) {
    --vaadin-item-text-align: end;
  }

  :host([theme~='align-left']) {
    --vaadin-item-text-align: left;
  }

  :host([theme~='align-right']) {
    --vaadin-item-text-align: right;
  }

  :host([theme~='align-start']) ::slotted([slot='value']) {
    justify-content: start;
  }

  :host([theme~='align-center']) ::slotted([slot='value']) {
    justify-content: safe center;
  }

  :host([theme~='align-end']) ::slotted([slot='value']) {
    justify-content: safe end;
  }

  :host([theme~='align-left']) ::slotted([slot='value']) {
    justify-content: left;
  }

  :host([theme~='align-right']) ::slotted([slot='value']) {
    justify-content: right;
  }
`;var bo=class extends ie{constructor(t){super(t,"value","vaadin-select-value-button",{initializer:(e,i)=>{i._setFocusElement(e),i.ariaTarget=e,i.stateTarget=e,e.setAttribute("aria-haspopup","listbox")}})}};var Qc=r=>class extends Ct(hr(Be(dt(r)))){static get properties(){return{items:{type:Array},opened:{type:Boolean,value:!1,notify:!0,observer:"_openedChanged",reflectToAttribute:!0,sync:!0},renderer:{type:Object},value:{type:String,value:"",notify:!0,observer:"_valueChanged",sync:!0},name:{type:String},placeholder:{type:String},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},noVerticalOverlap:{type:Boolean,value:!1},_phone:Boolean,_phoneMediaQuery:{value:"(max-width: 450px), (max-height: 450px)"},_inputContainer:Object,_items:Object,__slottedListBox:{type:Object,sync:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"invalid"]}static get observers(){return["_updateAriaExpanded(opened, focusElement)","_updateSelectedItem(value, _items, placeholder, focusElement)"]}constructor(){super(),this._itemId=`value-${this.localName}-${xt()}`,this._srLabelController=new cr(this),this._srLabelController.slotName="sr-label"}disconnectedCallback(){super.disconnectedCallback(),this.opened=!1}ready(){super.ready(),this._inputContainer=this.shadowRoot.querySelector('[part~="input-field"]'),this._overlayElement=this.$.overlay,this._valueButtonController=new bo(this),this.addController(this._valueButtonController),this.addController(this._srLabelController),this.addController(new kt(this._phoneMediaQuery,e=>{this._phone=e})),this._tooltipController=new ue(this),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.focusElement),this.addController(this._tooltipController)}updated(e){if(super.updated(e),e.has("_phone")&&this.toggleAttribute("phone",this._phone),(e.has("items")||e.has("renderer")||e.has("__slottedListBox"))&&this.__slottedListBox&&(this.items?.length||this.renderer))throw new Error('A slotted <vaadin-select-list-box> cannot be used together with the "items" or "renderer" property.');if(e.has("items")&&this._overlayElement.requestContentUpdate(),e.has("__slottedListBox")){let i=this.__slottedListBox;i?this._assignMenuElement(i):e.get("__slottedListBox")&&(this._menuElement=null,this._items=null,this.__lastMenuElement=null)}e.has("accessibleName")&&this._srLabelController.setLabel(this.accessibleName),e.has("required")&&this.required===!1&&this._requestValidation()}requestContentUpdate(){this._overlayElement&&this._overlayElement.requestContentUpdate()}__onOverlaySlotChange(e){this.__slottedListBox=e.target.assignedElements().find(i=>i._hasVaadinListMixin)}_assignMenuElement(e){e&&e!==this.__lastMenuElement&&(this._menuElement=e,this.__initMenuItems(e),e.addEventListener("items-changed",()=>{this.__initMenuItems(e)}),e.addEventListener("selected-changed",()=>this.__updateValueButton()),e.addEventListener("keydown",i=>this._onKeyDownInside(i),!0),e.addEventListener("click",i=>{let s=i.composedPath().find(n=>n._hasVaadinItemMixin);this.__dispatchChangePending=s?.value!==void 0&&s.value!==this.value,this.opened=!1},!0),this.__lastMenuElement=e),this._menuElement&&this._menuElement.items&&this._updateSelectedItem(this.value,this._menuElement.items)}__initMenuItems(e){e.items&&(this._items=e.items)}_valueChanged(e,i){this.toggleAttribute("has-value",!!e),i!==void 0&&!this.__dispatchChangePending&&this._requestValidation()}_onClick(e){this.disabled||(e.preventDefault(),this.opened=!this.readonly)}_onEscape(e){this.opened&&(e.stopPropagation(),this.opened=!1)}_onToggleMouseDown(e){e.preventDefault(),this.opened||this.focusElement.focus()}_onKeyDown(e){if(super._onKeyDown(e),!(e.altKey||e.shiftKey||e.ctrlKey||e.metaKey)&&e.target===this.focusElement&&!this.readonly&&!this.disabled&&!this.opened){if(/^(Enter|SpaceBar|\s|ArrowDown|Down|ArrowUp|Up)$/u.test(e.key))e.preventDefault(),this.opened=!0;else if(/[\p{L}\p{Nd}]/u.test(e.key)&&e.key.length===1){let s=this._menuElement.selected??-1,n=this._menuElement._searchKey(s,e.key);n>=0&&(this.__dispatchChangePending=!0,this._updateAriaLive(!0),this._menuElement.selected=n)}}}_onKeyDownInside(e){e.key==="Tab"&&(this.focusElement.setAttribute("tabindex","-1"),this._overlayElement.restoreFocusOnClose=!1,this.opened=!1,setTimeout(()=>{this.focusElement.setAttribute("tabindex","0"),this._overlayElement.restoreFocusOnClose=!0}))}_openedChanged(e,i){if(e){if(this.disabled||this.readonly){this.opened=!1;return}this._updateAriaLive(!1);let s=this.hasAttribute("focus-ring");this._openedWithFocusRing=s,s&&this.removeAttribute("focus-ring")}else i&&(this._openedWithFocusRing&&this.setAttribute("focus-ring",""),!this.__dispatchChangePending&&!this._keyboardActive&&this._requestValidation())}_updateAriaExpanded(e,i){i&&i.setAttribute("aria-expanded",e?"true":"false")}_updateAriaLive(e){this.focusElement&&Y(this.focusElement,"aria-live",e&&"polite")}__attachSelectedItem(e){let i,s=e.getAttribute("label");s?i=this.__createItemElement({label:s}):i=e.cloneNode(!0),i._sourceItem=e,this.__appendValueItemElement(i,this.focusElement),i.selected=!0}__createItemElement(e){let i=document.createElement(e.component||"vaadin-select-item");return e.label&&(i.textContent=e.label),e.value&&(i.value=e.value),e.disabled&&(i.disabled=e.disabled),e.className&&(i.className=e.className),i}__appendValueItemElement(e,i){i.appendChild(e),e.removeAttribute("tabindex"),e.removeAttribute("aria-selected"),e.removeAttribute("role"),e.removeAttribute("focused"),e.removeAttribute("focus-ring"),e.removeAttribute("active"),e.setAttribute("id",this._itemId)}__updateValueButton(){let e=this.focusElement;if(!e)return;e.innerHTML="";let i=this._items?this._items[this._menuElement.selected]:void 0;if(e.removeAttribute("placeholder"),this._hasContent(i))this.__attachSelectedItem(i);else if(this.placeholder){let s=this.__createItemElement({label:this.placeholder});this.__appendValueItemElement(s,e),e.setAttribute("placeholder","")}!this._valueChanging&&i&&(this._selectedChanging=!0,this.value=i.value||"",this.__dispatchChangePending&&this.__dispatchChange(),delete this._selectedChanging),this.__updateFieldAriaControllerLabelledBy()}_hasContent(e){if(!e)return!1;let i=!!(e.hasAttribute("label")?e.getAttribute("label"):e.textContent.trim()),s=e.childElementCount>0;return i||s}_updateSelectedItem(e,i,s){if(i){let n=e==null?e:e.toString();this._menuElement.selected=i.reduce((a,d,c)=>a===void 0&&d.value===n?c:a,void 0),this._selectedChanging||(this._valueChanging=!0,this.__updateValueButton(),delete this._valueChanging)}else s&&this.__updateValueButton()}_shouldRemoveFocus(e){return!this.contains(e.relatedTarget)}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}checkValidity(){return!this.required||this.readonly||!!this.value}__defaultRenderer(e,i){if(!this.items||this.items.length===0){e.textContent="";return}let s=e.firstElementChild;s||(s=document.createElement("vaadin-select-list-box"),e.appendChild(s)),s.textContent="",this.items.forEach(n=>{s.appendChild(this.__createItemElement(n))})}__dispatchChange(){this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this.__dispatchChangePending=!1}__updateFieldAriaControllerLabel(){}__updateFieldAriaControllerLabelledBy(){let e;this.accessibleNameRef?e=this.accessibleNameRef:this.accessibleName?e=this._srLabelController.defaultId:this.hasAttribute("has-label")&&(e=this._labelNode?.id);let s=this._items?.[this._menuElement.selected]||this.placeholder?this._itemId:null,n=[e,s].filter(Boolean);n.length>0?this._fieldAriaController.setLabelledBy(n.join(" ")):this._fieldAriaController.setLabelledBy(null)}};var fs=class extends Qc(K(I(O(A(S))))){static get is(){return"vaadin-select"}static get styles(){return[ze,_n,Jc]}render(){return w`
      <div class="vaadin-select-container">
        <div part="label" @click="${this._onClick}">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" @click="${this.focus}"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          .readonly="${this.readonly}"
          .disabled="${this.disabled}"
          .invalid="${this.invalid}"
          theme="${re(this._theme)}"
          @click="${this._onClick}"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="value"></slot>
          <div
            part="field-button toggle-button"
            slot="suffix"
            aria-hidden="true"
            @mousedown="${this._onToggleMouseDown}"
          ></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <vaadin-select-overlay
        id="overlay"
        .owner="${this}"
        .positionTarget="${this._inputContainer}"
        .opened="${this.opened}"
        .withBackdrop="${this._phone}"
        .renderer="${this.__slottedListBox?void 0:this.renderer||this.__defaultRenderer}"
        ?phone="${this._phone}"
        theme="${re(this._theme)}"
        ?no-vertical-overlap="${this.noVerticalOverlap}"
        exportparts="backdrop, overlay, content"
        @opened-changed="${this._onOpenedChanged}"
        @vaadin-overlay-open="${this._onOverlayOpen}"
      >
        <slot name="overlay" @slotchange="${this.__onOverlaySlotChange}"></slot>
      </vaadin-select-overlay>

      <slot name="tooltip"></slot>
      <div class="sr-only">
        <slot name="sr-label"></slot>
      </div>
    `}_onOpenedChanged(t){this.opened=t.detail.value}_onOverlayOpen(){this._menuElement&&this._menuElement.focus({focusVisible:ce()})}};E(fs);var Vl=class extends _r{addRenderer(){this.element.renderer=(t,e)=>{this.renderRenderer(t,e)}}runRenderer(){this.element.requestContentUpdate()}removeRenderer(){this.element.renderer=null}},jb=gt(Vl);var Hb=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},ef=class extends fs{};ef=Hb([q("or-vaadin-select")],ef);var tf=C`
  :host {
    height: auto;
  }

  [part='input-field'] {
    overflow: auto;
    scroll-padding: var(
      --vaadin-input-field-padding,
      var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container)
    );
  }

  ::slotted(textarea) {
    resize: none;
    white-space: pre-wrap;
  }

  [part='input-field'] ::slotted(:not(textarea)),
  [part~='clear-button'] {
    align-self: flex-start;
    position: sticky;
    top: 0;
  }

  [part~='clear-button'] {
    top: min(0px, (24px - 1lh) / -2);
  }

  /* Workaround https://bugzilla.mozilla.org/show_bug.cgi?id=1739079 */
  :host([disabled]) ::slotted(textarea) {
    user-select: none;
  }
`;var xo=class extends ie{constructor(t,e){super(t,"textarea","textarea",{initializer:(i,s)=>{let n=s.getAttribute("value");n&&(i.value=n);let a=s.getAttribute("name");a&&i.setAttribute("name",a),i.id=this.defaultId,typeof e=="function"&&e(i)},useUniqueId:!0})}};var rf=r=>class extends vr(br(r)){static get properties(){return{maxlength:{type:Number},minlength:{type:Number},pattern:{type:String},minRows:{type:Number,value:2,observer:"__minRowsChanged"},maxRows:{type:Number}}}static get delegateAttrs(){return[...super.delegateAttrs,"maxlength","minlength","pattern"]}static get constraints(){return[...super.constraints,"maxlength","minlength","pattern"]}static get observers(){return["__updateMinHeight(minRows, inputElement)","__updateMaxHeight(maxRows, inputElement, _inputField)"]}get clearElement(){return this.$.clearButton}_onResize(){this._updateHeight(),this.__scrollPositionUpdated()}_onScroll(){this.__scrollPositionUpdated()}ready(){super.ready(),this.__textAreaController=new xo(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e}),this.addController(this.__textAreaController),this.addController(new Ie(this.inputElement,this._labelController)),this._inputField=this.shadowRoot.querySelector("[part=input-field]"),this._inputField.addEventListener("wheel",e=>{let i=this._inputField.scrollTop;this._inputField.scrollTop+=e.deltaY,i!==this._inputField.scrollTop&&(e.preventDefault(),this.__scrollPositionUpdated())}),this._updateHeight(),this.__scrollPositionUpdated()}__scrollPositionUpdated(){this._inputField.style.setProperty("--_text-area-vertical-scroll-position","0px"),this._inputField.style.setProperty("--_text-area-vertical-scroll-position",`${this._inputField.scrollTop}px`)}_valueChanged(e,i){super._valueChanged(e,i),this._updateHeight()}_updateHeight(){let e=this.inputElement,i=this._inputField;if(!e||!i)return;let s=i.scrollTop,n=parseFloat(e.style.height),a=this.value?this.value.length:0;if(this._oldValueLength>=a){let c=getComputedStyle(i).height,f=getComputedStyle(e).width;i.style.height=c,e.style.maxWidth=f,e.style.alignSelf="flex-start",e.style.height="auto"}this._oldValueLength=a;let d=e.scrollHeight;Math.abs(d-n)<=1?e.style.height=`${n}px`:d>e.clientHeight&&(e.style.height=`${d}px`),e.style.removeProperty("max-width"),e.style.removeProperty("align-self"),i.style.removeProperty("height"),i.scrollTop=s,this.__updateMaxHeight(this.maxRows)}__updateMinHeight(e){this.inputElement&&this.inputElement===this.__textAreaController.defaultNode&&(this.inputElement.rows=Math.max(e,1))}__updateMaxHeight(e){if(!(!this._inputField||!this.inputElement))if(e){let i=getComputedStyle(this.inputElement),s=getComputedStyle(this._inputField),a=parseFloat(i.lineHeight)*e,d=parseFloat(i.paddingTop)+parseFloat(i.paddingBottom)+parseFloat(i.marginTop)+parseFloat(i.marginBottom)+parseFloat(s.borderTopWidth)+parseFloat(s.borderBottomWidth)+parseFloat(s.paddingTop)+parseFloat(s.paddingBottom),c=Math.ceil(a+d);this._inputField.style.setProperty("max-height",`${c}px`)}else this._inputField.style.removeProperty("max-height")}__minRowsChanged(e){e<1&&console.warn("<vaadin-text-area> minRows must be at least 1.")}scrollToStart(){this._inputField.scrollTop=0}scrollToEnd(){this._inputField.scrollTop=this._inputField.scrollHeight}checkValidity(){if(!super.checkValidity())return!1;if(!this.pattern||!this.inputElement.value)return!0;try{let e=this.inputElement.value.match(this.pattern);return e?e[0]===e.input:!1}catch{return!0}}};var ps=class extends rf(I(K(O(A(S))))){static get is(){return"vaadin-text-area"}static get styles(){return[ze,tf]}render(){return w`
      <div class="vaadin-text-area-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" @click="${this.focus}"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          .readonly="${this.readonly}"
          .disabled="${this.disabled}"
          .invalid="${this.invalid}"
          theme="${re(this._theme)}"
          @scroll="${this._onScroll}"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="textarea"></slot>
          <slot name="suffix" slot="suffix"></slot>
          <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>
    `}ready(){super.ready(),this._tooltipController=new ue(this),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}};E(ps);var sf=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},zl=class extends ps{constructor(){super(...arguments),this.manualresize=!1}_onEnter(r){return r.shiftKey||this.dispatchEvent(new CustomEvent("submit",{bubbles:!0,composed:!0})),super._onEnter(r)}_updateHeight(){var r;if(!this.inputElement)return;let t=(r=this.shadowRoot)==null?void 0:r.querySelector('[part~="input-field"]');if(this.manualresize){t&&(t.style.height="auto",t.style.overflowY="hidden"),this.inputElement.style.overflowY="auto",window.matchMedia("(pointer: coarse)").matches?this.inputElement.style.removeProperty("resize"):this.inputElement.style.resize="vertical";return}this.inputElement.style.removeProperty("resize"),this.inputElement.style.removeProperty("overflow-y"),t&&t.style.removeProperty("overflow-y"),super._updateHeight()}updated(r){var t;super.updated(r),r.has("manualresize")&&(this.manualresize&&((t=this.inputElement)==null||t.style.removeProperty("height")),this._updateHeight())}};sf([be({type:Boolean})],zl.prototype,"manualresize",void 0),zl=sf([q("or-vaadin-text-area")],zl);var nf=r=>class extends br(r){static get properties(){return{maxlength:{type:Number},minlength:{type:Number},pattern:{type:String},inputMode:{type:String,attribute:"inputmode"}}}static get delegateAttrs(){return[...super.delegateAttrs,"maxlength","minlength","pattern","inputMode"]}static get constraints(){return[...super.constraints,"maxlength","minlength","pattern"]}constructor(){super(),this._setType("text")}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new Ve(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new Ie(this.inputElement,this._labelController))}};var ms=class extends nf(I(K(O(A(S))))){static get is(){return"vaadin-text-field"}static get styles(){return[ze]}render(){return w`
      <div class="vaadin-field-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" @click="${this.focus}"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          .readonly="${this.readonly}"
          .disabled="${this.disabled}"
          .invalid="${this.invalid}"
          theme="${re(this._theme)}"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          ${this._renderSuffix()}
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
        <slot name="tooltip"></slot>
      </div>
    `}ready(){super.ready(),this._tooltipController=new ue(this),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}_renderSuffix(){return w`
      <slot name="suffix" slot="suffix"></slot>
      <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
    `}};E(ms);var of=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},Yl=class extends ms{willUpdate(r){super.willUpdate(r),r.has("type")&&this.type!==void 0&&this._setType(this.type)}_onEnter(r){return this.dispatchEvent(new CustomEvent("submit",{bubbles:!0,composed:!0})),super._onEnter(r)}};of([be({type:String})],Yl.prototype,"type",void 0),Yl=of([q("or-vaadin-text-field")],Yl);var Wb=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a};Za("or-vaadin-toggle",C`
    :host {
      /* Public variables, overridable by consumers; the values are defaults with standalone fallbacks */
      --or-toggle-track-width: 30px;
      --or-toggle-track-height: 20px;
      --or-toggle-knob-size: 14px;
      --or-toggle-knob-inset: 3px;
      --or-toggle-radius: var(--lumo-border-radius-l, 12px);
      --or-toggle-track-off-color: var(--lumo-contrast-30pct, #c4c8c4);
      --or-toggle-track-on-color: var(--lumo-primary-color, #47a942);
      --or-toggle-knob-color: var(--lumo-base-color, #ffffff);
      --or-toggle-gap: 6px;
      --or-toggle-transition-duration: 0.15s;

      align-items: center;
      --vaadin-checkbox-gap: var(--or-toggle-gap);
    }

    /*
     * The Vaadin base styles give the label a 500 font weight. Lumo resets that for the checkbox,
     * but that reset is keyed off 'is' (overridden here), so restore the default weight ourselves.
     */
    :host [part="label"],
    :host([has-label]) ::slotted([slot="label"]) {
      font-weight: 400;
    }

    /*
     * Turn the square checkbox part into a pill-shaped track. Selectors are deliberately prefixed
     * with :host(...) to out-specify the Vaadin/Lumo base rules (e.g. the base hides the ::after
     * marker with a high-specificity ':host(:not([checked])) [part=checkbox]::after { opacity: 0 }'
     * rule, which would otherwise hide the knob in the off state).
     */
    :host [part="checkbox"] {
      box-sizing: border-box;
      width: var(--or-toggle-track-width);
      min-width: var(--or-toggle-track-width);
      height: var(--or-toggle-track-height);
      border: none;
      border-radius: var(--or-toggle-radius);
      background: var(--or-toggle-track-off-color);
      transition: background-color var(--or-toggle-transition-duration, 0.15s) ease-in-out;
    }

    :host([checked]) [part="checkbox"] {
      background: var(--or-toggle-track-on-color);
    }

    :host([disabled]) {
      opacity: 0.5;
    }

    /* Replace the checkmark with a sliding knob */
    :host [part="checkbox"]::after {
      content: "";
      position: absolute;
      inset: auto;
      top: 50%;
      width: var(--or-toggle-knob-size);
      height: var(--or-toggle-knob-size);
      min-width: 0;
      border-radius: 50%;
      background: var(--or-toggle-knob-color);
      mask: none;
      -webkit-mask: none;
      filter: none;
      transform: translateY(-50%);
      transition: left var(--or-toggle-transition-duration, 0.15s) ease-in-out;
    }

    :host(:not([checked])) [part="checkbox"]::after {
      opacity: 1;
      left: var(--or-toggle-knob-inset);
    }

    :host([checked]) [part="checkbox"]::after {
      opacity: 1;
      left: calc(var(--or-toggle-track-width) - var(--or-toggle-knob-size) - var(--or-toggle-knob-inset));
    }

    :host([focus-ring]) [part="checkbox"] {
      outline: 2px solid var(--or-toggle-track-on-color);
      outline-offset: 2px;
    }
  `);var af=class extends yt{static get is(){return"or-vaadin-toggle"}_inputElementChanged(r,t){super._inputElementChanged(r,t),r?.setAttribute("role","switch")}};af=Wb([q("or-vaadin-toggle")],af);var wo=r=>t=>class extends t{constructor(){super(...arguments),this._i18nextJustInitialized=!1,this._language=r.language,this.initCallback=e=>{this._i18nextJustInitialized=!0,this.requestUpdate&&this.requestUpdate()},this.langChangedCallback=()=>{this.requestUpdate&&(this._language=r.language,this.requestUpdate("_language"))}}connectedCallback(){r.language||r.on("initialized",this.initCallback),r.on("languageChanged",this.langChangedCallback),super.connectedCallback&&super.connectedCallback()}disconnectedCallback(){r.off("initialized",this.initCallback),r.off("languageChanged",this.langChangedCallback),super.disconnectedCallback&&super.disconnectedCallback()}shouldUpdate(e){return this._i18nextJustInitialized?(this._i18nextJustInitialized=!1,!0):super.shouldUpdate&&super.shouldUpdate(e)}};var F=r=>typeof r=="string",_s=()=>{let r,t,e=new Promise((i,s)=>{r=i,t=s});return e.resolve=r,e.reject=t,e},Co=r=>r==null?"":String(r),qb=(r,t,e)=>{r.forEach(i=>{t[i]&&(e[i]=t[i])})},Kb=/###/g,lf=r=>r&&r.includes("###")?r.replace(Kb,"."):r,df=r=>!r||F(r),gs=(r,t,e)=>{let i=F(t)?t.split("."):t,s=0;for(;s<i.length-1;){if(df(r))return{};let n=lf(i[s]);!r[n]&&e&&(r[n]=new e),Object.prototype.hasOwnProperty.call(r,n)?r=r[n]:r={},++s}return df(r)?{}:{obj:r,k:lf(i[s])}},hf=(r,t,e)=>{let{obj:i,k:s}=gs(r,t,Object);if(i!==void 0||t.length===1){i[s]=e;return}let n=t[t.length-1],a=t.slice(0,t.length-1),d=gs(r,a,Object);for(;d.obj===void 0&&a.length;)n=`${a[a.length-1]}.${n}`,a=a.slice(0,a.length-1),d=gs(r,a,Object),d?.obj&&typeof d.obj[`${d.k}.${n}`]<"u"&&(d.obj=void 0);d.obj[`${d.k}.${n}`]=e},Gb=(r,t,e,i)=>{let{obj:s,k:n}=gs(r,t,Object);s[n]=s[n]||[],s[n].push(e)},ko=(r,t)=>{let{obj:e,k:i}=gs(r,t);if(e&&Object.prototype.hasOwnProperty.call(e,i))return e[i]},Zb=(r,t,e)=>{let i=ko(r,e);return i!==void 0?i:ko(t,e)},gf=(r,t,e)=>{for(let i in t)i!=="__proto__"&&i!=="constructor"&&(Object.prototype.hasOwnProperty.call(r,i)?F(r[i])||r[i]instanceof String||F(t[i])||t[i]instanceof String?e&&(r[i]=t[i]):gf(r[i],t[i],e):r[i]=t[i]);return r},Xt=r=>r.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),Xb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},Jb=r=>F(r)?r.replace(/[&<>"'\/]/g,t=>Xb[t]):r,Hl=class{constructor(t){this.capacity=t,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(t){let e=this.regExpMap.get(t);if(e!==void 0)return e;let i=new RegExp(t);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(t,i),this.regExpQueue.push(t),i}},Qb=[" ",",","?","!",";"],ex=new Hl(20),tx=(r,t,e)=>{t=t||"",e=e||"";let i=Qb.filter(a=>!t.includes(a)&&!e.includes(a));if(i.length===0)return!0;let s=ex.getRegExp(`(${i.map(a=>a==="?"?"\\?":a).join("|")})`),n=!s.test(r);if(!n){let a=r.indexOf(e);a>0&&!s.test(r.substring(0,a))&&(n=!0)}return n},Wl=(r,t,e=".")=>{if(!r)return;if(r[t])return Object.prototype.hasOwnProperty.call(r,t)?r[t]:void 0;let i=t.split(e),s=r;for(let n=0;n<i.length;){if(!s||typeof s!="object")return;let a,d="";for(let c=n;c<i.length;++c)if(c!==n&&(d+=e),d+=i[c],a=s[d],(typeof a=="function"||d==="__proto__")&&!Object.prototype.hasOwnProperty.call(s,d)&&(a=void 0),a!==void 0){if(["string","number","boolean"].includes(typeof a)&&c<i.length-1)continue;n+=c-n+1;break}s=a}return s},Cr=r=>r?.replace(/_/g,"-"),ix={type:"logger",log(r){this.output("log",r)},warn(r){this.output("warn",r)},error(r){this.output("error",r)},output(r,t){console?.[r]?.apply?.(console,t)}},ql=class r{constructor(t,e={}){this.init(t,e)}init(t,e={}){this.prefix=e.prefix||"i18next:",this.logger=t||ix,this.options=e,this.debug=e.debug}log(...t){return this.forward(t,"log","",!0)}warn(...t){return this.forward(t,"warn","",!0)}error(...t){return this.forward(t,"error","")}deprecate(...t){return this.forward(t,"warn","WARNING DEPRECATED: ",!0)}forward(t,e,i,s){return s&&!this.debug?null:(t=t.map(n=>F(n)?n.replace(/[\r\n\x00-\x1F\x7F]/g," "):n),F(t[0])&&(t[0]=`${i}${this.prefix} ${t[0]}`),this.logger[e](t))}create(t){return new r(this.logger,{prefix:`${this.prefix}:${t}:`,...this.options})}clone(t){return t=t||this.options,t.prefix=t.prefix||this.prefix,new r(this.logger,t)}},Tt=new ql,Sr=class{constructor(){this.observers={}}on(t,e){return t.split(" ").forEach(i=>{this.observers[i]||(this.observers[i]=new Map);let s=this.observers[i].get(e)||0;this.observers[i].set(e,s+1)}),this}off(t,e){if(this.observers[t]){if(!e){delete this.observers[t];return}this.observers[t].delete(e)}}once(t,e){let i=(...s)=>{e(...s),this.off(t,i)};return this.on(t,i),this}emit(t,...e){this.observers[t]&&Array.from(this.observers[t].entries()).forEach(([s,n])=>{for(let a=0;a<n;a++)s(...e)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([s,n])=>{for(let a=0;a<n;a++)s(t,...e)})}},uf=new WeakSet,Eo=class extends Sr{constructor(t,e={ns:["translation"],defaultNS:"translation"}){super(),this.data=t||{},this.options=e,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(t){this.options.ns.includes(t)||this.options.ns.push(t)}removeNamespaces(t){let e=this.options.ns.indexOf(t);e>-1&&this.options.ns.splice(e,1)}getResource(t,e,i,s={}){let n=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,a=s.ignoreJSONStructure!==void 0?s.ignoreJSONStructure:this.options.ignoreJSONStructure,d;t.includes(".")?d=t.split("."):(d=[t,e],i&&(Array.isArray(i)?d.push(...i):F(i)&&n?d.push(...i.split(n)):d.push(i)));let c=ko(this.data,d);return!c&&!e&&!i&&t.includes(".")&&(t=d[0],e=d[1],i=d.slice(2).join(".")),c||!a||!F(i)?c:Wl(this.data?.[t]?.[e],i,n)}addResource(t,e,i,s,n={silent:!1}){let a=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator,d=[t,e];i&&(d=d.concat(a?i.split(a):i)),t.includes(".")&&(d=t.split("."),s=e,e=d[1]),this.addNamespaces(e),hf(this.data,d,s),n.silent||this.emit("added",t,e,i,s)}addResources(t,e,i,s={silent:!1}){for(let n in i)(F(i[n])||Array.isArray(i[n]))&&this.addResource(t,e,n,i[n],{silent:!0});s.silent||this.emit("added",t,e,i)}addResourceBundle(t,e,i,s,n,a={silent:!1,skipCopy:!1}){let d=[t,e];t.includes(".")&&(d=t.split("."),s=i,i=e,e=d[1]),this.addNamespaces(e);let c=ko(this.data,d)||{};a.skipCopy||(i=JSON.parse(JSON.stringify(i))),s?gf(c,i,n):c={...c,...i},hf(this.data,d,c),a.silent||this.emit("added",t,e,i)}removeResourceBundle(t,e){this.hasResourceBundle(t,e)&&delete this.data[t][e],this.removeNamespaces(e),this.emit("removed",t,e)}hasResourceBundle(t,e){return this.getResource(t,e)!==void 0}getResourceBundle(t,e){return e||(e=this.options.defaultNS),this.getResource(t,e)}getDataByLanguage(t){return this.data[t]}hasLanguageSomeTranslations(t){let e=this.getDataByLanguage(t);return!!(e&&Object.keys(e)||[]).find(s=>{let n=e[s];return uf.has(n)?!0:!n||Object.keys(n).length===0?!1:(typeof n=="object"&&uf.add(n),!0)})}toJSON(){return this.data}},vf={processors:{},addPostProcessor(r){this.processors[r.name]=r},handle(r,t,e,i,s){return r.forEach(n=>{t=this.processors[n]?.process(t,e,i,s)??t}),t}},yf=Symbol("i18next/PATH_KEY");function rx(){let r=[],t=Object.create(null),e;return t.get=(i,s)=>(e?.revoke?.(),s===yf?r:(r.push(s),e=Proxy.revocable(i,t),e.proxy)),Proxy.revocable(Object.create(null),t).proxy}function wr(r,t){let{[yf]:e}=r(rx()),i=t?.keySeparator??".",s=t?.nsSeparator??":",n=t?.enableSelector==="strict";if(e.length>1&&s){let a=t?.ns,d=n?Array.isArray(a)?a:a?[a]:null:Array.isArray(a)?a:null;if(d&&(n?d:d.length>1?d.slice(1):[]).includes(e[0]))return`${e[0]}${s}${e.slice(1).join(i)}`}return e.join(i)}var Ul=r=>!F(r)&&typeof r!="boolean"&&typeof r!="number",To=class r extends Sr{constructor(t,e={}){super(),qb(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],t,this),this.options=e,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=Tt.create("translator"),this.checkedLoadedFor={}}changeLanguage(t){t&&(this.language=t)}exists(t,e={interpolation:{}}){let i={...e};if(t==null)return!1;let s=this.resolve(t,i);if(s?.res===void 0)return!1;let n=Ul(s.res);return!(i.returnObjects===!1&&n)}extractFromKey(t,e){let i=e.nsSeparator!==void 0?e.nsSeparator:this.options.nsSeparator;i===void 0&&(i=":");let s=e.keySeparator!==void 0?e.keySeparator:this.options.keySeparator,n=e.ns||this.options.defaultNS||[],a=i&&t.includes(i),d=!this.options.userDefinedKeySeparator&&!e.keySeparator&&!this.options.userDefinedNsSeparator&&!e.nsSeparator&&!tx(t,i,s);if(a&&!d){let c=t.match(this.interpolator.nestingRegexp);if(c&&c.length>0)return{key:t,namespaces:F(n)?[n]:n};let f=t.split(i);(i!==s||i===s&&this.options.ns.includes(f[0]))&&(n=f.shift()),t=f.join(s)}return{key:t,namespaces:F(n)?[n]:n}}translate(t,e,i){let s=typeof e=="object"?{...e}:e;if(typeof s!="object"&&this.options.overloadTranslationOptionHandler&&(s=this.options.overloadTranslationOptionHandler(arguments)),typeof s=="object"&&(s={...s}),s||(s={}),t==null)return"";typeof t=="function"&&(t=wr(t,{...this.options,...s})),Array.isArray(t)||(t=[String(t)]),t=t.map(he=>typeof he=="function"?wr(he,{...this.options,...s}):String(he));let n=s.returnDetails!==void 0?s.returnDetails:this.options.returnDetails,a=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,{key:d,namespaces:c}=this.extractFromKey(t[t.length-1],s),f=c[c.length-1],m=s.nsSeparator!==void 0?s.nsSeparator:this.options.nsSeparator;m===void 0&&(m=":");let _=s.lng||this.language,v=s.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(_?.toLowerCase()==="cimode")return v?n?{res:`${f}${m}${d}`,usedKey:d,exactUsedKey:d,usedLng:_,usedNS:f,usedParams:this.getUsedParamsDetails(s)}:`${f}${m}${d}`:n?{res:d,usedKey:d,exactUsedKey:d,usedLng:_,usedNS:f,usedParams:this.getUsedParamsDetails(s)}:d;let b=this.resolve(t,s),y=b?.res,T=b?.usedKey||d,N=b?.exactUsedKey||d,$=["[object Number]","[object Function]","[object RegExp]"],B=s.joinArrays!==void 0?s.joinArrays:this.options.joinArrays,ne=!this.i18nFormat||this.i18nFormat.handleAsObject,se=s.count!==void 0&&!F(s.count),ye=r.hasDefaultValue(s),ee=se?this.pluralResolver.getSuffix(_,s.count,s):"",ft=s.ordinal&&se?this.pluralResolver.getSuffix(_,s.count,{ordinal:!1}):"",We=se&&!s.ordinal&&s.count===0,pt=We&&s[`defaultValue${this.options.pluralSeparator}zero`]||s[`defaultValue${ee}`]||s[`defaultValue${ft}`]||s.defaultValue,Je=y;ne&&!y&&ye&&(Je=pt);let st=Ul(Je),Ns=Object.prototype.toString.apply(Je);if(ne&&Je&&st&&!$.includes(Ns)&&!(F(B)&&Array.isArray(Je))){if(!s.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");let he=this.options.returnedObjectHandler?this.options.returnedObjectHandler(T,Je,{...s,ns:c}):`key '${d} (${this.language})' returned an object instead of string.`;return n?(b.res=he,b.usedParams=this.getUsedParamsDetails(s),b):he}if(a){let he=Array.isArray(Je),qe=he?[]:{},$s=he?N:T;for(let nt in Je)if(Object.prototype.hasOwnProperty.call(Je,nt)){let _e=`${$s}${a}${nt}`;ye&&!y?qe[nt]=this.translate(_e,{...s,defaultValue:Ul(pt)?pt[nt]:void 0,joinArrays:!1,ns:c}):qe[nt]=this.translate(_e,{...s,joinArrays:!1,ns:c}),qe[nt]===_e&&(qe[nt]=Je[nt])}y=qe}}else if(ne&&F(B)&&Array.isArray(y))y=y.join(B),y&&(y=this.extendTranslation(y,t,s,b,i));else{let he=!1,qe=!1;!this.isValidLookup(y)&&ye&&(he=!0,y=pt),this.isValidLookup(y)||(qe=!0,y=d);let nt=(s.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&qe?void 0:y,_e=ye&&pt!==y&&this.options.updateMissing;if(qe||he||_e){if(this.logger.log(_e?"updateKey":"missingKey",_,f,se&&!_e?`${d}${this.pluralResolver.getSuffix(_,s.count,s)}`:d,_e?pt:y),a){let Se=this.resolve(d,{...s,keySeparator:!1});Se&&Se.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let At=[],Pt=this.languageUtils.getFallbackCodes(this.options.fallbackLng,s.lng||this.language);if(this.options.saveMissingTo==="fallback"&&Pt&&Pt[0])for(let Se=0;Se<Pt.length;Se++)At.push(Pt[Se]);else this.options.saveMissingTo==="all"?At=this.languageUtils.toResolveHierarchy(s.lng||this.language):At.push(s.lng||this.language);let Ki=(Se,R,Ci)=>{let Fs=ye&&Ci!==y?Ci:nt;this.options.missingKeyHandler?this.options.missingKeyHandler(Se,f,R,Fs,_e,s):this.backendConnector?.saveMissing&&this.backendConnector.saveMissing(Se,f,R,Fs,_e,s),this.emit("missingKey",Se,f,R,y)};this.options.saveMissing&&(this.options.saveMissingPlurals&&se?At.forEach(Se=>{let R=this.pluralResolver.getSuffixes(Se,s);We&&s[`defaultValue${this.options.pluralSeparator}zero`]&&!R.includes(`${this.options.pluralSeparator}zero`)&&R.push(`${this.options.pluralSeparator}zero`),R.forEach(Ci=>{Ki([Se],d+Ci,s[`defaultValue${Ci}`]||pt)})}):Ki(At,d,pt))}y=this.extendTranslation(y,t,s,b,i),qe&&y===d&&this.options.appendNamespaceToMissingKey&&(y=`${f}${m}${d}`),(qe||he)&&this.options.parseMissingKeyHandler&&(y=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${f}${m}${d}`:d,he?y:void 0,s))}return n?(b.res=y,b.usedParams=this.getUsedParamsDetails(s),b):y}extendTranslation(t,e,i,s,n){if(this.i18nFormat?.parse)t=this.i18nFormat.parse(t,{...this.options.interpolation.defaultVariables,...i},i.lng||this.language||s.usedLng,s.usedNS,s.usedKey,{resolved:s});else if(!i.skipInterpolation){i.interpolation&&this.interpolator.init({...i,interpolation:{...this.options.interpolation,...i.interpolation}});let c=F(t)&&(i?.interpolation?.skipOnVariables!==void 0?i.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables),f;if(c){let _=t.match(this.interpolator.nestingRegexp);f=_&&_.length}let m=i.replace&&!F(i.replace)?i.replace:i;if(this.options.interpolation.defaultVariables&&(m={...this.options.interpolation.defaultVariables,...m}),t=this.interpolator.interpolate(t,m,i.lng||this.language||s.usedLng,i),c){let _=t.match(this.interpolator.nestingRegexp),v=_&&_.length;f<v&&(i.nest=!1)}!i.lng&&s&&s.res&&(i.lng=this.language||s.usedLng),i.nest!==!1&&(t=this.interpolator.nest(t,(..._)=>n?.[0]===_[0]&&!i.context?(this.logger.warn(`It seems you are nesting recursively key: ${_[0]} in key: ${e[0]}`),null):this.translate(..._,e),i)),i.interpolation&&this.interpolator.reset()}let a=i.postProcess||this.options.postProcess,d=F(a)?[a]:a;return t!=null&&d?.length&&i.applyPostProcessor!==!1&&(t=vf.handle(d,t,e,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...s,usedParams:this.getUsedParamsDetails(i)},...i}:i,this)),t}resolve(t,e={}){let i,s,n,a,d;return F(t)&&(t=[t]),Array.isArray(t)&&(t=t.map(c=>typeof c=="function"?wr(c,{...this.options,...e}):c)),t.forEach(c=>{if(this.isValidLookup(i))return;let f=this.extractFromKey(c,e),m=f.key;s=m;let _=f.namespaces;this.options.fallbackNS&&(_=_.concat(this.options.fallbackNS));let v=e.count!==void 0&&!F(e.count),b=v&&!e.ordinal&&e.count===0,y=e.context!==void 0&&(F(e.context)||typeof e.context=="number")&&e.context!=="",T=e.lngs?e.lngs:this.languageUtils.toResolveHierarchy(e.lng||this.language,e.fallbackLng);_.forEach(N=>{this.isValidLookup(i)||(d=N,!this.checkedLoadedFor[`${T[0]}-${N}`]&&this.utils?.hasLoadedNamespace&&!this.utils?.hasLoadedNamespace(d)&&(this.checkedLoadedFor[`${T[0]}-${N}`]=!0,this.logger.warn(`key "${s}" for languages "${T.join(", ")}" won't get resolved as namespace "${d}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),T.forEach($=>{if(this.isValidLookup(i))return;a=$;let B=[m];if(this.i18nFormat?.addLookupKeys)this.i18nFormat.addLookupKeys(B,m,$,N,e);else{let se;v&&(se=this.pluralResolver.getSuffix($,e.count,e));let ye=`${this.options.pluralSeparator}zero`,ee=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(v&&(e.ordinal&&se.startsWith(ee)&&B.push(m+se.replace(ee,this.options.pluralSeparator)),B.push(m+se),b&&B.push(m+ye)),y){let ft=`${m}${this.options.contextSeparator||"_"}${e.context}`;B.push(ft),v&&(e.ordinal&&se.startsWith(ee)&&B.push(ft+se.replace(ee,this.options.pluralSeparator)),B.push(ft+se),b&&B.push(ft+ye))}}let ne;for(;ne=B.pop();)this.isValidLookup(i)||(n=ne,i=this.getResource($,N,ne,e))}))})}),{res:i,usedKey:s,exactUsedKey:n,usedLng:a,usedNS:d}}isValidLookup(t){return t!==void 0&&!(!this.options.returnNull&&t===null)&&!(!this.options.returnEmptyString&&t==="")}getResource(t,e,i,s={}){return this.i18nFormat?.getResource?this.i18nFormat.getResource(t,e,i,s):this.resourceStore.getResource(t,e,i,s)}getUsedParamsDetails(t={}){let e=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],i=t.replace&&!F(t.replace),s=i?t.replace:t;if(i&&typeof t.count<"u"&&(s={...s,count:t.count}),this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),!i){s={...s};for(let n of e)delete s[n]}return s}static hasDefaultValue(t){let e="defaultValue";for(let i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&i.startsWith(e)&&t[i]!==void 0)return!0;return!1}},Oo=class{constructor(t){this.options=t,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Tt.create("languageUtils"),this.resolveHierarchyCache={}}clearCache(){this.resolveHierarchyCache={}}getScriptPartFromCode(t){if(t=Cr(t),!t||!t.includes("-"))return null;let e=t.split("-");return e.length===2||(e.pop(),e[e.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(e.join("-"))}getLanguagePartFromCode(t){if(t=Cr(t),!t||!t.includes("-"))return t;let e=t.split("-");return this.formatLanguageCode(e[0])}formatLanguageCode(t){if(F(t)&&t.includes("-")){let e;try{e=Intl.getCanonicalLocales(t)[0]}catch{}return e&&this.options.lowerCaseLng&&(e=e.toLowerCase()),e||(this.options.lowerCaseLng?t.toLowerCase():t)}return this.options.cleanCode||this.options.lowerCaseLng?t.toLowerCase():t}isSupportedCode(t){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(t=this.getLanguagePartFromCode(t)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.includes(t)}getBestMatchFromCodes(t){if(!t)return null;let e;return t.forEach(i=>{if(e)return;let s=this.formatLanguageCode(i);(!this.options.supportedLngs||this.isSupportedCode(s))&&(e=s)}),!e&&this.options.supportedLngs&&t.forEach(i=>{if(e)return;let s=this.getScriptPartFromCode(i);if(this.isSupportedCode(s))return e=s;let n=this.getLanguagePartFromCode(i);if(this.isSupportedCode(n))return e=n;e=this.options.supportedLngs.find(a=>a===n?!0:!a.includes("-")&&!n.includes("-")?!1:!!(a.includes("-")&&!n.includes("-")&&a.slice(0,a.indexOf("-"))===n))}),e||(e=this.getFallbackCodes(this.options.fallbackLng)[0]),e}getFallbackCodes(t,e){if(!t)return[];if(typeof t=="function"&&(t=t(e)),F(t)&&(t=[t]),Array.isArray(t))return t;if(!e)return t.default||[];let i=t[e];return i||(i=t[this.getScriptPartFromCode(e)]),i||(i=t[this.formatLanguageCode(e)]),i||(i=t[this.getLanguagePartFromCode(e)]),i||(i=t.default),i||[]}toResolveHierarchy(t,e){let i=this.options.fallbackLng,s=Array.isArray(i)?i.join("|"):i;s!==this._cachedFallbackLng&&(this.resolveHierarchyCache={},this._cachedFallbackLng=s);let n=e===void 0||e===!1||F(e),a=e===void 0&&typeof this.options.fallbackLng=="function",d=F(t)&&n&&!a,c=null;if(d){let v;e===void 0?v="undefined":e===!1?v="boolean:false":v=`string:${e}`,c=`${t.length}:${t}|${v}`}if(c!==null){let v=this.resolveHierarchyCache[c];if(v!==void 0)return v.slice()}let f=this.getFallbackCodes((e===!1?[]:e)||this.options.fallbackLng||[],t),m=[],_=v=>{v&&(this.isSupportedCode(v)?m.push(v):this.logger.warn(`rejecting language code not found in supportedLngs: ${v}`))};return F(t)&&(t.includes("-")||t.includes("_"))?(this.options.load!=="languageOnly"&&_(this.formatLanguageCode(t)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&_(this.getScriptPartFromCode(t)),this.options.load!=="currentOnly"&&_(this.getLanguagePartFromCode(t))):F(t)&&_(this.formatLanguageCode(t)),f.forEach(v=>{let b=this.formatLanguageCode(v);m.includes(b)||_(b)}),c!==null?(this.resolveHierarchyCache[c]=m,m.slice()):m}},cf={zero:0,one:1,two:2,few:3,many:4,other:5},ff={select:r=>r===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})},Kl=class{constructor(t,e={}){this.languageUtils=t,this.options=e,this.logger=Tt.create("pluralResolver"),this.pluralRulesCache={}}clearCache(){this.pluralRulesCache={}}getRule(t,e={}){let i=Cr(t==="dev"?"en":t),s=e.ordinal?"ordinal":"cardinal",n=JSON.stringify({cleanedCode:i,type:s});if(n in this.pluralRulesCache)return this.pluralRulesCache[n];let a;try{a=new Intl.PluralRules(i,{type:s})}catch{if(typeof Intl>"u")return this.logger.error("No Intl support, please use an Intl polyfill!"),ff;if(!t.match(/-|_/))return ff;let c=this.languageUtils.getLanguagePartFromCode(t);a=this.getRule(c,e)}return this.pluralRulesCache[n]=a,a}needsPlural(t,e={}){let i=this.getRule(t,e);return i||(i=this.getRule("dev",e)),i?.resolvedOptions().pluralCategories.length>1}getPluralFormsOfKey(t,e,i={}){return this.getSuffixes(t,i).map(s=>`${e}${s}`)}getSuffixes(t,e={}){let i=this.getRule(t,e);return i||(i=this.getRule("dev",e)),i?i.resolvedOptions().pluralCategories.sort((s,n)=>cf[s]-cf[n]).map(s=>`${this.options.prepend}${e.ordinal?`ordinal${this.options.prepend}`:""}${s}`):[]}getSuffix(t,e,i={}){let s=this.getRule(t,i);return s?`${this.options.prepend}${i.ordinal?`ordinal${this.options.prepend}`:""}${s.select(e)}`:(this.logger.warn(`no plural rule found for: ${t}`),this.getSuffix("dev",e,i))}},pf=(r,t,e,i=".",s=!0)=>{let n=Zb(r,t,e);return!n&&s&&F(e)&&(n=Wl(r,e,i),n===void 0&&(n=Wl(t,e,i))),n},Do=class{constructor(t={}){this.logger=Tt.create("interpolator"),this.options=t,this.format=t?.interpolation?.format||(e=>e),this.init(t)}init(t={}){t.interpolation||(t.interpolation={escapeValue:!0});let{escape:e,escapeValue:i,useRawValueToEscape:s,prefix:n,prefixEscaped:a,suffix:d,suffixEscaped:c,formatSeparator:f,unescapeSuffix:m,unescapePrefix:_,nestingPrefix:v,nestingPrefixEscaped:b,nestingSuffix:y,nestingSuffixEscaped:T,nestingOptionsSeparator:N,maxReplaces:$,alwaysFormat:B}=t.interpolation;this.escape=e!==void 0?e:Jb,this.escapeValue=i!==void 0?i:!0,this.useRawValueToEscape=s!==void 0?s:!1,this.prefix=n?Xt(n):a||"{{",this.suffix=d?Xt(d):c||"}}",this.formatSeparator=f||",",this.unescapePrefix=m?"":_?Xt(_):"-",this.unescapeSuffix=this.unescapePrefix?"":m?Xt(m):"",this.nestingPrefix=v?Xt(v):b||Xt("$t("),this.nestingSuffix=y?Xt(y):T||Xt(")"),this.nestingOptionsSeparator=N||",",this.maxReplaces=$||1e3,this.alwaysFormat=B!==void 0?B:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){let t=(e,i)=>e?.source===i?(e.lastIndex=0,e):new RegExp(i,"g");this.regexp=t(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=t(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=t(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']|"[^"]*"|'[^']*'|\\((?:[^()"']|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(t,e,i,s){let n,a,d,c=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},f=T=>{if(!T.includes(this.formatSeparator)){let ne=pf(e,c,T,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(ne,void 0,i,{...s,...e,interpolationkey:T}):ne}let N=T.split(this.formatSeparator),$=N.shift().trim(),B=N.join(this.formatSeparator).trim();return this.format(pf(e,c,$,this.options.keySeparator,this.options.ignoreJSONStructure),B,i,{...s,...e,interpolationkey:$})};this.resetRegExp(),!this.escapeValue&&typeof t=="string"&&/\$t\([^)]*\{[^}]*\{\{/.test(t)&&this.logger.warn("nesting options string contains interpolated variables with escapeValue: false \u2014 if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");let m=s?.missingInterpolationHandler||this.options.missingInterpolationHandler,_=s?.interpolation?.skipOnVariables!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables,v=[{regex:this.regexpUnescape,safeValue:T=>T},{regex:this.regexp,safeValue:T=>this.escapeValue?this.escape(T):T}],b=[],y=0;return v.forEach(T=>{for(d=0;n=T.regex.exec(t);){let N=n.index-y,$=b.find(([se,ye])=>N>=se&&N<ye);if($){T.regex.lastIndex=$[1]+y;continue}let B=n[1].trim();if(a=f(B),a===void 0)if(typeof m=="function"){let se=m(t,n,s);a=F(se)?se:""}else if(s&&Object.prototype.hasOwnProperty.call(s,B))a="";else if(_){a=n[0];continue}else this.logger.warn(`missed to pass in variable ${B} for interpolating ${t}`),a="";else!F(a)&&!this.useRawValueToEscape&&(a=Co(a));let ne=Co(T.safeValue(a));if(t=t.slice(0,n.index)+ne+t.slice(n.index+n[0].length),_?(T.regex===this.regexpUnescape?b.push([n.index,n.index+ne.length]):y+=ne.length-n[0].length,T.regex.lastIndex+=ne.length,T.regex.lastIndex-=n[0].length):T.regex.lastIndex=0,d++,d>=this.maxReplaces)break}}),t}nest(t,e,i={}){let s,n,a,d=(_,v)=>{let b=this.nestingOptionsSeparator;if(!_.includes(b))return _;let y=_.split(new RegExp(`${Xt(b)}[ ]*{`)),T=`{${y[1]}`;_=y[0],T=this.interpolate(T,a);let N=T.match(/'/g),$=T.match(/"/g);((N?.length??0)%2===0&&!$||($?.length??0)%2!==0)&&(T=T.replace(/'/g,'"'));try{a=JSON.parse(T),v&&(a={...v,...a})}catch(B){return this.logger.warn(`failed parsing options string in nesting for key ${_}`,B),`${_}${b}${T}`}return a.defaultValue&&a.defaultValue.includes(this.prefix)&&delete a.defaultValue,_},c=new RegExp(this.nestingRegexp),f="",m=0;for(;s=c.exec(t);){let _=[];a={...i},a=a.replace&&!F(a.replace)?a.replace:a,a.applyPostProcessor=!1,delete a.defaultValue;let v=/{.*}/s.test(s[1])?s[1].lastIndexOf("}")+1:s[1].indexOf(this.formatSeparator);if(v!==-1&&(_=s[1].slice(v).split(this.formatSeparator).map(b=>b.trim()).filter(Boolean),s[1]=s[1].slice(0,v)),n=e(d.call(this,s[1].trim(),a),a),n&&s[0]===t&&!F(n))return n;F(n)||(n=Co(n)),n||(this.logger.warn(`missed to resolve ${s[1]} for nesting ${t}`),n=""),_.length&&(n=_.reduce((b,y)=>this.format(b,y,i.lng,{...i,interpolationkey:s[1].trim()}),n.trim())),f+=t.slice(m,s.index)+Co(n),m=c.lastIndex,this.regexp.lastIndex=0}return m?f+t.slice(m):t}},sx=r=>{let t=r.toLowerCase().trim(),e={};if(r.includes("(")){let i=r.split("(");t=i[0].toLowerCase().trim();let s=i[1].slice(0,-1);t==="currency"&&!s.includes(":")?e.currency||(e.currency=s.trim()):t==="relativetime"&&!s.includes(":")?e.range||(e.range=s.trim()):s.split(";").forEach(a=>{if(a){let[d,...c]=a.split(":"),f=c.join(":").trim().replace(/^'+|'+$/g,""),m=d.trim();e[m]||(e[m]=f),f==="false"&&(e[m]=!1),f==="true"&&(e[m]=!0),isNaN(f)||(e[m]=parseInt(f,10))}})}return{formatName:t,formatOptions:e}},mf=r=>{let t={};return(e,i,s)=>{let n=s;s&&s.interpolationkey&&s.formatParams&&s.formatParams[s.interpolationkey]&&s[s.interpolationkey]&&(n={...n,[s.interpolationkey]:void 0});let a;try{a=i+JSON.stringify(n)}catch{return r(Cr(i),s)(e)}let d=t[a];return d||(d=r(Cr(i),s),t[a]=d),d(e)}},nx=r=>(t,e,i)=>r(Cr(e),i)(t),Gl=class{constructor(t={}){this.logger=Tt.create("formatter"),this.options=t,this.init(t)}init(t,e={interpolation:{}}){this.formatSeparator=e.interpolation.formatSeparator||",";let i=e.cacheInBuiltFormats?mf:nx;this.formats={number:i((s,n)=>{let a=new Intl.NumberFormat(s,{...n});return d=>a.format(d)}),currency:i((s,n)=>{let a=new Intl.NumberFormat(s,{...n,style:"currency"});return d=>a.format(d)}),datetime:i((s,n)=>{let a=new Intl.DateTimeFormat(s,{...n});return d=>a.format(d)}),relativetime:i((s,n)=>{let a=new Intl.RelativeTimeFormat(s,{...n});return d=>a.format(d,n.range||"day")}),list:i((s,n)=>{let a=new Intl.ListFormat(s,{...n});return d=>a.format(d)})}}add(t,e){this.formats[t.toLowerCase().trim()]=e}addCached(t,e){this.formats[t.toLowerCase().trim()]=mf(e)}format(t,e,i,s={}){if(!e||t==null)return t;let n=e.split(this.formatSeparator),a=[];for(let c=0;c<n.length;c++){let f=n[c];for(;f.indexOf("(")>-1&&!f.includes(")")&&c+1<n.length;)f=`${f}${this.formatSeparator}${n[++c]}`;a.push(f)}return a.reduce((c,f)=>{let{formatName:m,formatOptions:_}=sx(f);if(this.formats[m]){let v=c;try{let b=s?.formatParams?.[s.interpolationkey]||{},y=b.locale||b.lng||s.locale||s.lng||i;v=this.formats[m](c,y,{..._,...s,...b})}catch(b){this.logger.warn(b)}return v}else this.logger.warn(`there was no format function for ${m}`);return c},t)}},ox=(r,t)=>{r.pending[t]!==void 0&&(delete r.pending[t],r.pendingCount--)},Zl=class extends Sr{constructor(t,e,i,s={}){super(),this.backend=t,this.store=e,this.services=i,this.languageUtils=i.languageUtils,this.options=s,this.logger=Tt.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=s.maxParallelReads||10,this.readingCalls=0,this.maxRetries=s.maxRetries>=0?s.maxRetries:5,this.retryTimeout=s.retryTimeout>=1?s.retryTimeout:350,this.state={},this.queue=[],this.backend?.init?.(i,s.backend,s)}queueLoad(t,e,i,s){let n={},a={},d={},c={};return t.forEach(f=>{let m=!0;e.forEach(_=>{let v=`${f}|${_}`;!i.reload&&this.store.hasResourceBundle(f,_)?this.state[v]=2:this.state[v]<0||(this.state[v]===1?a[v]===void 0&&(a[v]=!0):(this.state[v]=1,m=!1,a[v]===void 0&&(a[v]=!0),n[v]===void 0&&(n[v]=!0),c[_]===void 0&&(c[_]=!0)))}),m||(d[f]=!0)}),(Object.keys(n).length||Object.keys(a).length)&&this.queue.push({pending:a,pendingCount:Object.keys(a).length,loaded:{},errors:[],callback:s}),{toLoad:Object.keys(n),pending:Object.keys(a),toLoadLanguages:Object.keys(d),toLoadNamespaces:Object.keys(c)}}loaded(t,e,i){let s=t.split("|"),n=s[0],a=s[1];e&&this.emit("failedLoading",n,a,e),!e&&i&&this.store.addResourceBundle(n,a,i,void 0,void 0,{skipCopy:!0}),this.state[t]=e?-1:2,e&&i&&(this.state[t]=0);let d={};this.queue.forEach(c=>{Gb(c.loaded,[n],a),ox(c,t),e&&c.errors.push(e),c.pendingCount===0&&!c.done&&(Object.keys(c.loaded).forEach(f=>{d[f]||(d[f]={});let m=c.loaded[f];m.length&&m.forEach(_=>{d[f][_]===void 0&&(d[f][_]=!0)})}),c.done=!0,c.errors.length?c.callback(c.errors):c.callback())}),this.emit("loaded",d),this.queue=this.queue.filter(c=>!c.done)}read(t,e,i,s=0,n=this.retryTimeout,a){if(!t.length)return a(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:t,ns:e,fcName:i,tried:s,wait:n,callback:a});return}this.readingCalls++;let d=(f,m)=>{if(this.readingCalls--,this.waitingReads.length>0){let _=this.waitingReads.shift();this.read(_.lng,_.ns,_.fcName,_.tried,_.wait,_.callback)}if(f&&m&&s<this.maxRetries){setTimeout(()=>{this.read(t,e,i,s+1,n*2,a)},n);return}a(f,m)},c=this.backend[i].bind(this.backend);if(c.length===2){try{let f=c(t,e);f&&typeof f.then=="function"?f.then(m=>d(null,m)).catch(d):d(null,f)}catch(f){d(f)}return}return c(t,e,d)}prepareLoading(t,e,i={},s){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();F(t)&&(t=this.languageUtils.toResolveHierarchy(t)),F(e)&&(e=[e]);let n=this.queueLoad(t,e,i,s);if(!n.toLoad.length)return n.pending.length||s(),null;n.toLoad.forEach(a=>{this.loadOne(a)})}load(t,e,i){this.prepareLoading(t,e,{},i)}reload(t,e,i){this.prepareLoading(t,e,{reload:!0},i)}loadOne(t,e=""){let i=t.split("|"),s=i[0],n=i[1];this.read(s,n,"read",void 0,void 0,(a,d)=>{a&&this.logger.warn(`${e}loading namespace ${n} for language ${s} failed`,a),!a&&d&&this.logger.log(`${e}loaded namespace ${n} for language ${s}`,d),this.loaded(t,a,d)})}saveMissing(t,e,i,s,n,a={},d=()=>{}){if(this.services?.utils?.hasLoadedNamespace&&!this.services?.utils?.hasLoadedNamespace(e)){this.logger.warn(`did not save key "${i}" as the namespace "${e}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(i==null||i==="")){if(this.backend?.create){let c={...a,isUpdate:n},f=this.backend.create.bind(this.backend);if(f.length<6)try{let m;f.length===5?m=f(t,e,i,s,c):m=f(t,e,i,s),m&&typeof m.then=="function"?m.then(_=>d(null,_)).catch(d):d(null,m)}catch(m){d(m)}else f(t,e,i,s,d,c)}!t||!t[0]||this.store.addResource(t[0],e,i,s)}}},jl=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",enableSelector:!1,partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:r=>{let t={};if(typeof r[1]=="object"&&(t=r[1]),F(r[1])&&(t.defaultValue=r[1]),F(r[2])&&(t.tDescription=r[2]),typeof r[2]=="object"||typeof r[3]=="object"){let e=r[3]||r[2];Object.keys(e).forEach(i=>{t[i]=e[i]})}return t},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),_f=r=>(F(r.ns)&&(r.ns=[r.ns]),F(r.fallbackLng)&&(r.fallbackLng=[r.fallbackLng]),F(r.fallbackNS)&&(r.fallbackNS=[r.fallbackNS]),r.supportedLngs&&!r.supportedLngs.includes("cimode")&&(r.supportedLngs=r.supportedLngs.concat(["cimode"])),r),So=()=>{},ax=r=>{Object.getOwnPropertyNames(Object.getPrototypeOf(r)).forEach(e=>{typeof r[e]=="function"&&(r[e]=r[e].bind(r))})},Xl=class r extends Sr{constructor(t={},e){if(super(),this.options=_f(t),this.services={},this.logger=Tt,this.modules={external:[]},ax(this),e&&!this.isInitialized&&!t.isClone){if(!this.options.initAsync)return this.init(t,e),this;setTimeout(()=>{this.init(t,e)},0)}}init(t={},e){this.isInitializing=!0,typeof t=="function"&&(e=t,t={}),t.defaultNS==null&&t.ns&&(F(t.ns)?t.defaultNS=t.ns:t.ns.includes("translation")||(t.defaultNS=t.ns[0]));let i=jl();this.options={...i,...this.options,..._f(t)},this.options.interpolation={...i.interpolation,...this.options.interpolation},t.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=t.keySeparator),t.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=t.nsSeparator),typeof this.options.overloadTranslationOptionHandler!="function"&&(this.options.overloadTranslationOptionHandler=i.overloadTranslationOptionHandler);let s=f=>f?typeof f=="function"?new f:f:null;if(!this.options.isClone){this.modules.logger?Tt.init(s(this.modules.logger),this.options):Tt.init(null,this.options);let f;this.modules.formatter?f=this.modules.formatter:f=Gl;let m=new Oo(this.options);this.store=new Eo(this.options.resources,this.options);let _=this.services;_.logger=Tt,_.resourceStore=this.store,_.languageUtils=m,_.pluralResolver=new Kl(m,{prepend:this.options.pluralSeparator}),f&&(_.formatter=s(f),_.formatter.init&&_.formatter.init(_,this.options),this.options.interpolation.format=_.formatter.format.bind(_.formatter)),_.interpolator=new Do(this.options),_.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},_.backendConnector=new Zl(s(this.modules.backend),_.resourceStore,_,this.options),_.backendConnector.on("*",(v,...b)=>{this.emit(v,...b)}),this.modules.languageDetector&&(_.languageDetector=s(this.modules.languageDetector),_.languageDetector.init&&_.languageDetector.init(_,this.options.detection,this.options)),this.modules.i18nFormat&&(_.i18nFormat=s(this.modules.i18nFormat),_.i18nFormat.init&&_.i18nFormat.init(this)),this.translator=new To(this.services,this.options),this.translator.on("*",(v,...b)=>{this.emit(v,...b)}),this.modules.external.forEach(v=>{v.init&&v.init(this)})}if(this.format=this.options.interpolation.format,e||(e=So),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){let f=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);f.length>0&&f[0]!=="dev"&&(this.options.lng=f[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(f=>{this[f]=(...m)=>this.store[f](...m)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(f=>{this[f]=(...m)=>(this.store[f](...m),this)});let d=_s(),c=()=>{let f=(m,_)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),d.resolve(_),e(m,_)};if((this.languages||this.isLanguageChangingTo)&&!this.isInitialized)return f(null,this.t.bind(this));this.changeLanguage(this.options.lng,f)};return this.options.resources||!this.options.initAsync?c():setTimeout(c,0),d}loadResources(t,e=So){let i=e,s=F(t)?t:this.language;if(typeof t=="function"&&(i=t),!this.options.resources||this.options.partialBundledLanguages){if(s?.toLowerCase()==="cimode"&&(!this.options.preload||this.options.preload.length===0))return i();let n=[],a=d=>{if(!d||d==="cimode")return;this.services.languageUtils.toResolveHierarchy(d).forEach(f=>{f!=="cimode"&&(n.includes(f)||n.push(f))})};s?a(s):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(c=>a(c)),this.options.preload?.forEach?.(d=>a(d)),this.services.backendConnector.load(n,this.options.ns,d=>{!d&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),i(d)})}else i(null)}reloadResources(t,e,i){let s=_s();return typeof t=="function"&&(i=t,t=void 0),typeof e=="function"&&(i=e,e=void 0),t||(t=this.languages),e||(e=this.options.ns),i||(i=So),this.services.backendConnector.reload(t,e,n=>{s.resolve(),i(n)}),s}use(t){if(!t)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!t.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return t.type==="backend"&&(this.modules.backend=t),(t.type==="logger"||t.log&&t.warn&&t.error)&&(this.modules.logger=t),t.type==="languageDetector"&&(this.modules.languageDetector=t),t.type==="i18nFormat"&&(this.modules.i18nFormat=t),t.type==="postProcessor"&&vf.addPostProcessor(t),t.type==="formatter"&&(this.modules.formatter=t),t.type==="3rdParty"&&this.modules.external.push(t),this}setResolvedLanguage(t){if(!(!t||!this.languages)&&!["cimode","dev"].includes(t)){for(let e=0;e<this.languages.length;e++){let i=this.languages[e];if(!["cimode","dev"].includes(i)&&this.store.hasLanguageSomeTranslations(i)){this.resolvedLanguage=i;break}}!this.resolvedLanguage&&!this.languages.includes(t)&&this.store.hasLanguageSomeTranslations(t)&&(this.resolvedLanguage=t,this.languages.unshift(t))}}changeLanguage(t,e){this.isLanguageChangingTo=t;let i=_s();this.emit("languageChanging",t);let s=d=>{this.language=d,this.languages=this.services.languageUtils.toResolveHierarchy(d),this.resolvedLanguage=void 0,this.setResolvedLanguage(d)},n=(d,c)=>{c?this.isLanguageChangingTo===t&&(s(c),this.translator.changeLanguage(c),this.isLanguageChangingTo=void 0,this.emit("languageChanged",c),this.logger.log("languageChanged",c)):this.isLanguageChangingTo=void 0,i.resolve((...f)=>this.t(...f)),e&&e(d,(...f)=>this.t(...f))},a=d=>{!t&&!d&&this.services.languageDetector&&(d=[]);let c=F(d)?d:d&&d[0],f=this.store.hasLanguageSomeTranslations(c)?c:this.services.languageUtils.getBestMatchFromCodes(F(d)?[d]:d);f&&(this.language||s(f),this.translator.language||this.translator.changeLanguage(f),this.services.languageDetector?.cacheUserLanguage?.(f)),this.loadResources(f,m=>{n(m,f)})};return!t&&this.services.languageDetector&&!this.services.languageDetector.async?a(this.services.languageDetector.detect()):!t&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(a):this.services.languageDetector.detect(a):a(t),i}getFixedT(t,e,i,s){let n=s?.scopeNs,a=(d,c,...f)=>{let m;typeof c!="object"?m=this.options.overloadTranslationOptionHandler([d,c].concat(f)):m={...c},m.lng=m.lng||a.lng,m.lngs=m.lngs||a.lngs;let _=m.ns!==void 0&&m.ns!==null;m.ns=m.ns||a.ns,m.keyPrefix!==""&&(m.keyPrefix=m.keyPrefix||i||a.keyPrefix);let v={...this.options,...m};Array.isArray(n)&&!_&&(v.ns=n),typeof m.keyPrefix=="function"&&(m.keyPrefix=wr(m.keyPrefix,v));let b=this.options.keySeparator||".",y;return m.keyPrefix&&Array.isArray(d)?y=d.map(T=>(typeof T=="function"&&(T=wr(T,v)),`${m.keyPrefix}${b}${T}`)):(typeof d=="function"&&(d=wr(d,v)),y=m.keyPrefix?`${m.keyPrefix}${b}${d}`:d),this.t(y,m)};return F(t)?a.lng=t:a.lngs=t,a.ns=e,a.keyPrefix=i,a}t(...t){return this.translator?.translate(...t)}exists(...t){return this.translator?.exists(...t)}setDefaultNamespace(t){this.options.defaultNS=t}hasLoadedNamespace(t,e={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;let i=e.lng||this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,n=this.languages[this.languages.length-1];if(i.toLowerCase()==="cimode")return!0;let a=(f,m)=>{let _=this.services.backendConnector.state[`${f}|${m}`];return _===-1||_===0||_===2};if(e.precheck){let f=e.precheck(this,a);if(f!==void 0)return f}if(this.hasResourceBundle(i,t)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages)return!0;let{languageUtils:d}=this.services,c=e.lng?d.isSupportedCode(i)&&d.toResolveHierarchy(i,!1)[0]:i;return!!((!c||a(c,t))&&(!s||a(n,t)))}loadNamespaces(t,e){let i=_s();return this.options.ns?(F(t)&&(t=[t]),t.forEach(s=>{this.options.ns.includes(s)||this.options.ns.push(s)}),this.loadResources(s=>{i.resolve(),e&&e(s)}),i):(e&&e(),Promise.resolve())}loadLanguages(t,e){let i=_s();F(t)&&(t=[t]);let s=this.options.preload||[],n=t.filter(a=>!s.includes(a)&&this.services.languageUtils.isSupportedCode(a));return n.length?(this.options.preload=s.concat(n),this.loadResources(a=>{i.resolve(),e&&e(a)}),i):(e&&e(),Promise.resolve())}dir(t){if(t||(t=this.resolvedLanguage||(this.languages?.length>0?this.languages[0]:this.language)),!t)return"rtl";try{let s=new Intl.Locale(t);if(s&&s.getTextInfo){let n=s.getTextInfo();if(n&&n.direction)return n.direction}}catch{}let e=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],i=this.services?.languageUtils||new Oo(jl());return t.toLowerCase().indexOf("-latn")>1?"ltr":e.includes(i.getLanguagePartFromCode(t))||t.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(t={},e){let i=new r(t,e);return i.createInstance=r.createInstance,i}cloneInstance(t={},e=So){let i=t.forkResourceStore;i&&delete t.forkResourceStore;let s={...this.options,preload:!1,...t,isClone:!0},n=new r(s);if((t.debug!==void 0||t.prefix!==void 0)&&(n.logger=n.logger.clone(t)),["store","services","language"].forEach(d=>{n[d]=this[d]}),n.services={...this.services},n.services.utils={hasLoadedNamespace:n.hasLoadedNamespace.bind(n)},i){let d=f=>{let m=Array.isArray(f)?[...f]:{...f};return Object.keys(m).forEach(_=>{m[_]&&typeof m[_]=="object"&&(m[_]=d(m[_]))}),m},c=d(this.store.data);n.store=new Eo(c,s),n.services.resourceStore=n.store}if(t.interpolation){let c={...jl().interpolation,...this.options.interpolation,...t.interpolation},f={...s,interpolation:c};n.services.interpolator=new Do(f)}return n.translator=new To(n.services,s),n.translator.on("*",(d,...c)=>{n.emit(d,...c)}),n.init(s,e),n.translator.options=s,n.translator.backendConnector.services.utils={hasLoadedNamespace:n.hasLoadedNamespace.bind(n)},n}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}},j=Xl.createInstance(),R2=j.createInstance,N2=j.dir,$2=j.init,F2=j.loadResources,B2=j.reloadResources,V2=j.use,z2=j.changeLanguage,Y2=j.getFixedT,U2=j.t,j2=j.exists,H2=j.setDefaultNamespace,W2=j.hasLoadedNamespace,q2=j.loadNamespaces,K2=j.loadLanguages;var lx=C`
  h4 {
    margin: 0;
    padding-bottom: var(--lumo-space-m);
    font-size: var(--lumo-font-size-l);
    font-weight: 600;
    line-height: 125.303%;
  }
`,kr=class extends S{static finalizeStyles(t){return[lx,...super.finalizeStyles(t)]}};var Jl=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},vs=class extends wo(j)(kr){render(){return w` ${this._getTranslatedValue()} `}_getTranslatedValue(){return this.value?j.isInitialized?j.t(this.value,this.options):this.value:""}};vs.styles=C`
    :host {
      display: inline-block;
    }

    :host([hidden]) {
      display: none;
    }
  `,Jl([be({type:String})],vs.prototype,"value",void 0),Jl([be({type:Object})],vs.prototype,"options",void 0),vs=Jl([q("or-translate")],vs);var bf=C`
  [part='overlay'] {
    display: flex;
    flex: auto;
    max-height: var(--vaadin-date-picker-overlay-max-height, 30rem);
    box-sizing: content-box;
    width: var(
      --vaadin-date-picker-overlay-width,
      round(
        var(--vaadin-date-picker-date-width, 2rem) * 7 +
          var(--vaadin-date-picker-month-padding, var(--vaadin-padding-s)) * 2 +
          var(--vaadin-date-picker-year-scroller-width, 3rem),
        1px
      )
    );
    cursor: default;
  }

  :host([fullscreen]) [part='backdrop'] {
    display: block;
  }

  :host([fullscreen]) [part='overlay'] {
    border: none;
    border-radius: 0;
    max-height: 75vh;
    width: 100%;
  }

  [part~='content'] {
    flex: auto;
  }

  @media (max-width: 450px), (max-height: 450px) {
    :host {
      inset: auto 0 0 !important;
    }
  }
`;var xf=r=>class extends _i(Ze(r)){_initFocus(){}_shouldCloseOnOutsideClick(e){return!e.composedPath().includes(this.positionTarget)}_mouseDownListener(e){super._mouseDownListener(e),this._shouldCloseOnOutsideClick(e)&&!Vi(e.composedPath()[0])&&e.preventDefault()}};var Ql=class extends xf(J(I(O(A(S))))){static get is(){return"vaadin-date-picker-overlay"}static get styles(){return[Xe,bf]}render(){return w`
      <div id="backdrop" part="backdrop" ?hidden="${!this.withBackdrop}"></div>
      <div part="overlay" id="overlay">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `}get _contentRoot(){return this.owner._overlayContent}};E(Ql);function Yi(r,t,e){let i=new Date(0,0);return i.setFullYear(r),i.setMonth(t),i.setDate(e),i}function Er(r){return Yi(r.getFullYear(),r.getMonth(),1)}function Tr(r){return Yi(r.getFullYear(),r.getMonth()+1,0)}function dx(r,t){return r*12+t}function Ot(r){return dx(r.getFullYear(),r.getMonth())}function Or(r){return Yi(0,r,1)}function wf(r){let t=r.getDay();t===0&&(t=7);let e=4-t,i=new Date(r.getTime()+e*24*3600*1e3),s=new Date(0,0);s.setFullYear(i.getFullYear());let n=i.getTime()-s.getTime(),a=Math.round(n/(24*3600*1e3));return Math.floor(a/7+1)}function Mo(r){let t=new Date(r);return t.setHours(0,0,0,0),t}function ys(r){return new Date(Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),0,0,0,0))}function Ee(r,t,e=Mo){return r instanceof Date&&t instanceof Date&&e(r).getTime()===e(t).getTime()}function ed(r){return{day:r.getDate(),month:r.getMonth(),year:r.getFullYear()}}function vi(r,t,e,i){let s=!1;if(typeof i=="function"&&r){let n=ed(r);s=i(n)}return(!t||r>=t)&&(!e||r<=e)&&!s}function Dr(r,t,e,i,s){return vi(r,t,e,i)&&!s?.isDateDisabled(r)}function Io(r,t){return t.filter(e=>e!==void 0).reduce((e,i)=>{if(!i)return e;if(!e)return i;let s=Math.abs(r.getTime()-i.getTime()),n=Math.abs(e.getTime()-r.getTime());return s<n?i:e})}function Ao(r){let t=new Date,e=new Date(t);return e.setDate(1),e.setMonth(parseInt(r)+t.getMonth()),e}function Cf(r,t,e=0,i=1){if(t>99)throw new Error("The provided year cannot have more than 2 digits.");if(t<0)throw new Error("The provided year cannot be negative.");let s=t+Math.floor(r.getFullYear()/100)*100;return r<new Date(s-50,e,i)?s-=100:r>new Date(s+50,e,i)&&(s+=100),s}var hx=/^([-+]\d{1,6}|\d{2,4})-(\d{1,2})-(\d{1,2})$/u;function Sf(r){let t=hx.exec(r);if(t)return{year:parseInt(t[1],10),month:parseInt(t[2],10)-1,day:parseInt(t[3],10)}}function yi(r){let t=Sf(r);if(!t)return;let e=Yi(t.year,t.month,t.day);return e.getMonth()===t.month&&e.getDate()===t.day?e:void 0}function kf(r){let t=Sf(r);if(!t)return;let e=new Date(Date.UTC(0,0));return e.setUTCFullYear(t.year),e.setUTCMonth(t.month),e.setUTCDate(t.day),e.getUTCMonth()===t.month&&e.getUTCDate()===t.day?e:void 0}function Ef(r){let t=(c,f="00")=>(f+c).substr((f+c).length-f.length),e="",i="0000",s=r.year;s<0?(s=-s,e="-",i="000000"):r.year>=1e4&&(e="+",i="000000");let n=e+t(s,i),a=t(r.month+1),d=t(r.day);return[n,a,d].join("-")}function bs(r){return r instanceof Date?Ef({year:r.getFullYear(),month:r.getMonth(),day:r.getDate()}):""}function Tf(r){return r instanceof Date?Ef({year:r.getUTCFullYear(),month:r.getUTCMonth(),day:r.getUTCDate()}):""}var Of=document.createElement("template");Of.innerHTML=`
  <style>
    :host {
      display: block;
      overflow: hidden;
      height: 500px;
    }

    #scroller {
      position: relative;
      height: 100%;
      overflow: auto;
      /* Prevent browser scroll anchoring from overriding the virtual scroll position. */
      overflow-anchor: none;
      outline: none;
      overflow-x: hidden;
      scrollbar-width: none;
    }

    #scroller::-webkit-scrollbar {
      display: none;
    }

    .buffer {
      position: absolute;
      width: var(--vaadin-infinite-scroller-buffer-width, 100%);
      box-sizing: border-box;
      top: var(--vaadin-infinite-scroller-buffer-offset, 0);
    }

    ::slotted(div) {
      height: var(--vaadin-infinite-scroller-item-height);
    }
  </style>

  <div id="scroller" tabindex="-1">
    <div class="buffer"></div>
    <div class="buffer"></div>
    <div id="fullHeight"></div>
  </div>
`;var Mr=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(Of.content.cloneNode(!0)),this.bufferSize=20,this._initialScroll=5e5,this._initialIndex=0,this._activated=!1}get active(){return this._activated}set active(t){t&&!this._activated&&(this._createPool(),this._activated=!0)}get bufferOffset(){return this._buffers[0].offsetTop}get itemHeight(){if(!this._itemHeightVal){let t=getComputedStyle(this).getPropertyValue("--vaadin-infinite-scroller-item-height"),e="background-position";this.$.fullHeight.style.setProperty(e,t);let i=getComputedStyle(this.$.fullHeight).getPropertyValue(e);this.$.fullHeight.style.removeProperty(e),this._itemHeightVal=parseFloat(i)}return this._itemHeightVal}get _bufferHeight(){return this.itemHeight*this.bufferSize}get position(){return(this.$.scroller.scrollTop-this._buffers[0].translateY)/this.itemHeight+this._firstIndex}set position(t){this._preventScrollEvent=!0,t>this._firstIndex&&t<this._firstIndex+this.bufferSize*2?this.$.scroller.scrollTop=this.itemHeight*(t-this._firstIndex)+this._buffers[0].translateY:(this._initialIndex=~~t,this.reset(),this._scrollDisabled=!0,this.$.scroller.scrollTop+=t%1*this.itemHeight,this._scrollDisabled=!1)}connectedCallback(){this._ready||(this._ready=!0,this.$={},this.shadowRoot.querySelectorAll("[id]").forEach(t=>{this.$[t.id]=t}),this.$.scroller.addEventListener("scroll",()=>this._scroll()),this._buffers=[...this.shadowRoot.querySelectorAll(".buffer")],this.$.fullHeight.style.height=`${this._initialScroll*2}px`)}disconnectedCallback(){this._debouncerScrollFinish&&this._debouncerScrollFinish.cancel(),this._debouncerUpdateClones&&this._debouncerUpdateClones.cancel(),this.__pendingFinishInit&&cancelAnimationFrame(this.__pendingFinishInit)}forceUpdate(){this._debouncerScrollFinish&&this._debouncerScrollFinish.flush(),this._debouncerUpdateClones&&(this._buffers[0].updated=this._buffers[1].updated=!1,this._updateClones(),this._debouncerUpdateClones.cancel())}_createElement(){}_updateElement(t,e){}_finishInit(){this._initDone||(this._buffers.forEach(t=>{[...t.children].forEach(e=>{this._ensureStampedInstance(e._itemWrapper)})}),this._buffers[0].translateY||this.reset(),this._initDone=!0,this.dispatchEvent(new CustomEvent("init-done")))}_translateBuffer(t){let e=t?1:0;this._buffers[e].translateY=this._buffers[e?0:1].translateY+this._bufferHeight*(e?-1:1),this._buffers[e].style.transform=`translate3d(0, ${this._buffers[e].translateY}px, 0)`,this._buffers[e].updated=!1,this._buffers.reverse()}_scroll(){if(this._scrollDisabled)return;let t=this.$.scroller.scrollTop;(t<this._bufferHeight||t>this._initialScroll*2-this._bufferHeight)&&(this._initialIndex=~~this.position,this.reset());let e=this.itemHeight+this.bufferOffset,i=t>this._buffers[1].translateY+e,s=t<this._buffers[0].translateY+e;(i||s)&&(this._translateBuffer(s),this._updateClones()),this._preventScrollEvent||this.dispatchEvent(new CustomEvent("custom-scroll",{bubbles:!1,composed:!0})),this._preventScrollEvent=!1,this._debouncerScrollFinish=ae.debounce(this._debouncerScrollFinish,Ge.after(200),()=>{let n=this.$.scroller.getBoundingClientRect();!this._isVisible(this._buffers[0],n)&&!this._isVisible(this._buffers[1],n)&&(this.position=this.position)})}reset(){!this._activated||!this.isConnected||(this._itemHeightVal=null,this._scrollDisabled=!0,this.$.scroller.scrollTop=this._initialScroll,this._buffers[0].translateY=this._initialScroll-this._bufferHeight,this._buffers[1].translateY=this._initialScroll,this._buffers.forEach(t=>{t.style.transform=`translate3d(0, ${t.translateY}px, 0)`}),this._buffers[0].updated=this._buffers[1].updated=!1,this._updateClones(!0),this._debouncerUpdateClones=ae.debounce(this._debouncerUpdateClones,Ge.after(200),()=>{this._buffers[0].updated=this._buffers[1].updated=!1,this._updateClones()}),this._scrollDisabled=!1)}_createPool(){let t=this.innerHeight;this._buffers.forEach(e=>{for(let i=0;i<this.bufferSize;i++){let s=document.createElement("div");s.instance={};let n=`vaadin-infinite-scroller-item-content-${xt()}`,a=document.createElement("slot");a.setAttribute("name",n),a._itemWrapper=s,e.appendChild(a),s.setAttribute("slot",n),this.appendChild(s),this.itemHeight*i<=t&&this._ensureStampedInstance(s)}}),this.__pendingFinishInit=requestAnimationFrame(()=>{this._finishInit(),this.__pendingFinishInit=null})}_ensureStampedInstance(t){if(t.firstElementChild)return;let e=t.instance;t.instance=this._createElement(),t.appendChild(t.instance),Object.keys(e).forEach(i=>{t.instance[i]=e[i]})}_updateClones(t){this._firstIndex=Math.round((this._buffers[0].translateY-this._initialScroll)/this.itemHeight)+this._initialIndex;let e=t?this.$.scroller.getBoundingClientRect():void 0;this._buffers.forEach((i,s)=>{if(!i.updated){let n=this._firstIndex+this.bufferSize*s;[...i.children].forEach((a,d)=>{let c=a._itemWrapper;(!t||this._isVisible(c,e))&&this._updateElement(c.instance,n+d)}),i.updated=!0}})}_isVisible(t,e){let i=t.getBoundingClientRect();return i.bottom>e.top&&i.top<e.bottom}};var Df=document.createElement("template");Df.innerHTML=`
  <style>
    :host {
      --vaadin-infinite-scroller-item-height: 270px;
      grid-area: months;
      height: auto;
    }
  </style>
`;var td=class extends Mr{static get is(){return"vaadin-date-picker-month-scroller"}constructor(){super(),this.bufferSize=3,this.shadowRoot.appendChild(Df.content.cloneNode(!0))}_createElement(){return document.createElement("vaadin-month-calendar")}_updateElement(t,e){t.month=Ao(e)}};E(td);var Mf=document.createElement("template");Mf.innerHTML=`
  <style>
    :host {
      --vaadin-infinite-scroller-item-height: 80px;
      width: 50px;
      display: block;
      position: relative;
      grid-area: years;
      height: auto;
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      user-select: none;
      /* Center the year scroller position. */
      --vaadin-infinite-scroller-buffer-offset: 50%;
    }

    :host::before {
      content: '';
      display: block;
      background: transparent;
      width: 0;
      height: 0;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border-width: 6px;
      border-style: solid;
      border-color: transparent;
      border-left-color: #000;
    }
  </style>
`;var id=class extends Mr{static get is(){return"vaadin-date-picker-year-scroller"}constructor(){super(),this.bufferSize=12,this.shadowRoot.appendChild(Mf.content.cloneNode(!0))}_createElement(){return document.createElement("vaadin-date-picker-year")}_updateElement(t,e){t.year=this._yearAfterXYears(e)}_yearAfterXYears(t){let e=new Date,i=new Date(e);return i.setFullYear(parseInt(t)+e.getFullYear()),i.getFullYear()}};E(id);var If=C`
  :host {
    display: block;
    height: 100%;
  }

  [part='year-number'] {
    align-items: center;
    display: flex;
    height: 50%;
    justify-content: center;
    transform: translateY(-50%);
    color: var(--vaadin-text-color-secondary);
  }

  :host([current]) [part='year-number'] {
    color: var(--vaadin-date-picker-year-scroller-current-year-color, var(--vaadin-text-color));
  }
`;var rd=class extends I(O(A(S))){static get is(){return"vaadin-date-picker-year"}static get styles(){return If}static get properties(){return{year:{type:String,sync:!0},selectedDate:{type:Object,sync:!0}}}render(){return w`
      <div part="year-number">${this.year}</div>
      <div part="year-separator" aria-hidden="true"></div>
    `}updated(t){super.updated(t),t.has("year")&&this.toggleAttribute("current",this.year===new Date().getFullYear()),(t.has("year")||t.has("selectedDate"))&&this.toggleAttribute("selected",this.selectedDate&&this.selectedDate.getFullYear()===this.year)}};E(rd);var Af=C`
  :host {
    display: block;
    padding: var(--vaadin-date-picker-month-padding, var(--vaadin-padding-s));
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    user-select: none;
  }

  [part='month-header'] {
    color: var(--vaadin-date-picker-month-header-color, var(--vaadin-text-color));
    font-size: var(--vaadin-date-picker-month-header-font-size, 0.9375rem);
    font-weight: var(--vaadin-date-picker-month-header-font-weight, 500);
    line-height: 1;
    margin-bottom: 0.75rem;
    text-align: center;
  }

  table {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  thead,
  tbody,
  tr {
    display: contents;
  }

  [part~='weekday'] {
    color: var(--vaadin-date-picker-weekday-color, var(--vaadin-text-color-secondary));
    font-size: var(--vaadin-date-picker-weekday-font-size, 0.75rem);
    font-weight: var(--vaadin-date-picker-weekday-font-weight, 500);
    margin-bottom: 0.375rem;
  }

  /* Week numbers are on a separate row, don't reserve space on weekday row. */
  [part~='weekday']:empty {
    display: none;
  }

  [part~='week-number'] {
    grid-column: -1 / 1;
    color: var(--vaadin-date-picker-week-number-color, var(--vaadin-text-color-secondary));
    font-size: var(--vaadin-date-picker-week-number-font-size, 0.7rem);
    line-height: 1;
    margin-top: 0.125em;
    margin-bottom: 0.125em;
    gap: 0.25em;
  }

  [part~='week-number']::after {
    content: '';
    height: 1px;
    flex: 1;
    background: var(
      --vaadin-date-picker-week-divider-color,
      var(--vaadin-divider-color, var(--vaadin-border-color-secondary))
    );
  }

  [part~='weekday'],
  [part~='week-number'],
  [part~='date'] {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 0;
  }

  [part~='date'] {
    border-radius: var(--vaadin-date-picker-date-border-radius, var(--vaadin-radius-m));
    position: relative;
    height: var(--vaadin-date-picker-date-height, 2rem);
    cursor: var(--vaadin-clickable-cursor);
    outline: none;
  }

  [part~='date']:empty {
    pointer-events: none !important;
  }

  [part~='date']::after {
    border-radius: inherit;
    content: '';
    position: absolute;
    z-index: -1;
    height: min(2em, 100%);
    aspect-ratio: 1;
  }

  :where([part~='date']:focus-visible)::after {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-focus-ring-width) * -1);
  }

  [part~='today'] {
    color: var(--vaadin-date-picker-date-today-color, var(--vaadin-text-color));
  }

  [part~='selected'] {
    color: var(--vaadin-date-picker-date-selected-color, var(--vaadin-background-color));
  }

  [part~='selected']::after {
    background: var(--vaadin-date-picker-date-selected-background, var(--vaadin-text-color));
    outline-offset: 1px;
  }

  [disabled] {
    cursor: var(--vaadin-disabled-cursor);
    color: var(--vaadin-date-picker-date-disabled-color, var(--vaadin-text-color-disabled));
    opacity: 0.7;
  }

  [hidden] {
    display: none;
  }

  @media (forced-colors: active) {
    [part~='week-number']::after {
      background: CanvasText;
    }

    [part~='today'] {
      font-weight: 600;
    }

    [part~='selected'] {
      forced-color-adjust: none;
      --vaadin-date-picker-date-selected-color: SelectedItemText;
      color: SelectedItemText !important;
      --vaadin-date-picker-date-selected-background: SelectedItem;
    }

    [disabled] {
      color: GrayText !important;
    }
  }
`;var Pf=r=>class extends Me(r){static get properties(){return{month:{type:Object,value:new Date,sync:!0},selectedDate:{type:Object,notify:!0,sync:!0},focusedDate:{type:Object},showWeekNumbers:{type:Boolean,value:!1},i18n:{type:Object},ignoreTaps:{type:Boolean},minDate:{type:Date,value:null,sync:!0},maxDate:{type:Date,value:null,sync:!0},isDateDisabled:{type:Function,value:()=>!1},_dateMetadataController:{type:Object,attribute:!1,sync:!0},enteredDate:{type:Date},disabled:{type:Boolean,reflectToAttribute:!0,computed:"__computeDisabled(month, minDate, maxDate)"},_days:{type:Array,computed:"__computeDays(month, i18n, minDate, maxDate, isDateDisabled)"},_weeks:{type:Array,computed:"__computeWeeks(_days)"},_notTapping:{type:Boolean},__hasFocus:{type:Boolean}}}static get observers(){return["__focusedDateChanged(focusedDate, _days)","_showWeekNumbersChanged(showWeekNumbers, i18n)"]}get focusableDateElement(){return[...this.shadowRoot.querySelectorAll("[part~=date]")].find(e=>Ee(e.date,this.focusedDate))}ready(){super.ready(),qt(this.$.monthGrid,"tap",this._handleTap.bind(this))}_setFocused(e){super._setFocused(e),this.__hasFocus=e}__computeDisabled(e,i,s){let n=Er(e),a=Tr(e);return i&&s&&i.getFullYear()===s.getFullYear()&&i.getFullYear()===e.getFullYear()&&i.getMonth()===s.getMonth()&&i.getMonth()===e.getMonth()&&s.getDate()-i.getDate()>=0?!1:!vi(n,i,s)&&!vi(a,i,s)}_getTitle(e,i){if(!(e===void 0||i===void 0))return i.formatTitle(i.monthNames[e.getMonth()],e.getFullYear())}_onMonthGridTouchStart(){this._notTapping=!1,setTimeout(()=>{this._notTapping=!0},300)}_dateAdd(e,i){e.setDate(e.getDate()+i)}_applyFirstDayOfWeek(e,i){if(!(e===void 0||i===void 0))return e.slice(i).concat(e.slice(0,i))}__computeWeekDayNames(e,i){if(e===void 0||i===void 0)return[];let{weekdays:s,weekdaysShort:n,firstDayOfWeek:a}=e,d=this._applyFirstDayOfWeek(n,a);return this._applyFirstDayOfWeek(s,a).map((f,m)=>({weekDay:f,weekDayShort:d[m]})).slice(0,7)}__focusedDateChanged(e,i){let s=Array.isArray(i)&&i.some(n=>Ee(n,e));Y(this,"aria-hidden",!s)}_getDate(e){return e?e.getDate():""}__computeShowWeekSeparator(e,i){return e&&i?.firstDayOfWeek===1}_isToday(e){return Ee(new Date,e)}__computeDays(e,i){if(e===void 0||i===void 0)return[];let s=Er(e);for(;s.getDay()!==i.firstDayOfWeek;)this._dateAdd(s,-1);let n=[],a=s.getMonth(),d=e.getMonth();for(;s.getMonth()===d||s.getMonth()===a;)n.push(s.getMonth()===d?new Date(s.getTime()):null),this._dateAdd(s,1);return n}__computeWeeks(e){return e.reduce((i,s,n)=>(n%7===0&&i.push([]),i[i.length-1].push(s),i),[])}_handleTap(e){!this.ignoreTaps&&!this._notTapping&&e.target.date&&!e.target.hasAttribute("disabled")&&(this.selectedDate=e.target.date,this.dispatchEvent(new CustomEvent("date-tap",{detail:{date:e.target.date},bubbles:!0,composed:!0})))}_preventDefault(e){e.preventDefault()}__computeWeekNumber(e){let i=e.reduce((s,n)=>!s&&n?n:s);return wf(i)}__computeDayAriaLabel(e){if(!e)return"";let i=`${this._getDate(e)} ${this.i18n.monthNames[e.getMonth()]} ${e.getFullYear()}, ${this.i18n.weekdays[e.getDay()]}`;return this._isToday(e)&&(i+=`, ${this.i18n.today}`),i}_showWeekNumbersChanged(e,i){this.toggleAttribute("week-numbers",this.__computeShowWeekSeparator(e,i))}__computeDatePart(e,i,s,n,a,d,c,f){let m=["date"];this.__isDayDisabled(e,n,a,d)&&m.push("disabled"),e&&this.__isMonthPending()&&m.push("loading"),Ee(e,i)&&(f||Ee(e,c))&&m.push("focused"),this.__isDaySelected(e,s)&&m.push("selected"),this._isToday(e)&&m.push("today"),e<Mo(new Date)&&m.push("past"),e>Mo(new Date)&&m.push("future");let _=e&&this._dateMetadataController?.getMetadata(e)?.part;return _&&typeof _=="string"&&m.push(_),m.join(" ")}__isDaySelected(e,i){return Ee(e,i)}__computeDayAriaSelected(e,i){return String(this.__isDaySelected(e,i))}__isMonthPending(){return!!this._dateMetadataController?.isMonthPending(this.month)}__isDayDisabled(e,i,s,n){return!Dr(e,i,s,n,this._dateMetadataController)}__computeDayAriaDisabled(e,i,s,n){return e===void 0||!!!this._dateMetadataController?.provider&&i===void 0&&s===void 0&&n===void 0?"false":String(this.__isDayDisabled(e,i,s,n))}__computeDayTabIndex(e,i){return Ee(e,i)?"0":"-1"}};var sd=class extends Pf(I(O(A(S)))){static get is(){return"vaadin-month-calendar"}static get styles(){return Af}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}render(){let t=this.__computeWeekDayNames(this.i18n,this.showWeekNumbers),e=this._weeks,i=!this.__computeShowWeekSeparator(this.showWeekNumbers,this.i18n);return w`
      <div part="month-header" id="month-header" aria-hidden="true">${this._getTitle(this.month,this.i18n)}</div>
      <table
        id="monthGrid"
        role="grid"
        aria-labelledby="month-header"
        @touchend="${this._preventDefault}"
        @touchstart="${this._onMonthGridTouchStart}"
      >
        <thead id="weekdays-container">
          <tr role="row" part="weekdays">
            <th part="weekday" aria-hidden="true" ?hidden="${i}"></th>
            ${t.map(s=>w`
                <th role="columnheader" part="weekday" scope="col" abbr="${s.weekDay}" aria-hidden="true">
                  ${s.weekDayShort}
                </th>
              `)}
          </tr>
        </thead>
        <tbody id="days-container">
          ${e.map(s=>w`
              <tr role="row">
                <td part="week-number" aria-hidden="true" ?hidden="${i}">
                  ${this.__computeWeekNumber(s)}
                </td>
                ${s.map(n=>w`
                    <td
                      role="gridcell"
                      part="${this.__computeDatePart(n,this.focusedDate,this.selectedDate,this.minDate,this.maxDate,this.isDateDisabled,this.enteredDate,this.__hasFocus)}"
                      .date="${n}"
                      ?disabled="${this.__isDayDisabled(n,this.minDate,this.maxDate,this.isDateDisabled)}"
                      tabindex="${this.__computeDayTabIndex(n,this.focusedDate)}"
                      aria-selected="${this.__computeDayAriaSelected(n,this.selectedDate)}"
                      aria-disabled="${this.__computeDayAriaDisabled(n,this.minDate,this.maxDate,this.isDateDisabled)}"
                      aria-label="${this.__computeDayAriaLabel(n)}"
                      >${this._getDate(n)}</td
                    >
                  `)}
              </tr>
            `)}
        </tbody>
      </table>
    `}};E(sd);var Lf=C`
  :host {
    display: grid;
    grid-template-areas:
      'header header'
      'months years'
      'toolbar years';
    grid-template-columns: minmax(0, 1fr) 0;
    height: 100%;
    outline: none;
    overflow: hidden;
    position: relative;
  }

  :host([desktop]) {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  :host([fullscreen][years-visible]) {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  [part='years-toggle-button'] {
    display: inline-flex;
    align-items: center;
    border-radius: var(--vaadin-button-border-radius, var(--vaadin-radius-m));
    color: var(--vaadin-text-color);
    font-size: var(--vaadin-button-font-size, inherit);
    font-weight: var(--vaadin-button-font-weight, 500);
    height: var(--vaadin-button-height, auto);
    line-height: var(--vaadin-button-line-height, inherit);
    padding: var(--vaadin-button-padding, var(--vaadin-padding-block-container) var(--vaadin-padding-inline-container));
    cursor: var(--vaadin-clickable-cursor);
  }

  :host([years-visible]) [part='years-toggle-button'] {
    background: var(--vaadin-text-color);
    color: var(--vaadin-background-color);
  }

  [hidden] {
    display: none !important;
  }

  [part='loader'] {
    position: absolute;
    z-index: 1;
    inset-block-start: var(--vaadin-date-picker-month-header-font-size, 0.9375rem);
    inset-inline: 0;
    margin-inline: auto;
  }

  ::slotted([slot='months']) {
    --vaadin-infinite-scroller-item-height: round(
      var(--vaadin-date-picker-month-header-font-size, 0.9375rem) + 0.75rem +
        var(--vaadin-date-picker-date-height, 2rem) * 7 + var(--_vaadin-date-picker-week-numbers-visible, 0) *
        (
          var(--vaadin-date-picker-week-number-font-size, 0.7rem) * 6.25 +
            var(--vaadin-date-picker-month-padding, var(--vaadin-padding-s)) * 3
        ),
      1px
    );
  }

  :host(:not([fullscreen])) ::slotted([slot='months']) {
    border-bottom: 1px solid var(--vaadin-border-color-secondary);
  }

  ::slotted([slot='years']) {
    visibility: hidden;
    background: var(--vaadin-date-picker-year-scroller-background, var(--vaadin-background-container));
    width: var(--vaadin-date-picker-year-scroller-width, 3rem);
    box-sizing: border-box;
    border-inline-start: 1px solid
      var(--vaadin-date-picker-year-scroller-border-color, var(--vaadin-border-color-secondary));
    overflow: visible;
    min-height: 0;
    clip-path: inset(0);
  }

  ::slotted([slot='years'])::before {
    background: var(--vaadin-overlay-background, var(--vaadin-background-color));
    border: 1px solid var(--vaadin-date-picker-year-scroller-border-color, var(--vaadin-border-color-secondary));
    width: 16px;
    height: 16px;
    position: absolute;
    left: auto;
    z-index: 1;
    rotate: 45deg;
    translate: calc(-50% - 1px) -50%;
    transform: none;
  }

  :host([dir='rtl']) ::slotted([slot='years'])::before {
    translate: calc(50% + 1px) -50%;
  }

  :host([desktop]) ::slotted([slot='years']),
  :host([years-visible]) ::slotted([slot='years']) {
    visibility: visible;
  }

  [part='toolbar'] {
    display: flex;
    grid-area: toolbar;
    justify-content: space-between;
    padding: var(--vaadin-date-picker-toolbar-padding, var(--vaadin-padding-s));
  }

  :host([fullscreen]) [part='toolbar'] {
    grid-area: header;
    border-bottom: 1px solid var(--vaadin-border-color-secondary);
  }
`;var Rf=r=>class extends r{static get properties(){return{scrollDuration:{type:Number,value:300},selectedDate:{type:Object,value:null,sync:!0},focusedDate:{type:Object,notify:!0,observer:"_focusedDateChanged",sync:!0},_focusedMonthDate:Number,initialPosition:{type:Object,observer:"_initialPositionChanged",sync:!0},_originDate:{type:Object,value:new Date},_visibleMonthIndex:Number,_desktopMode:{type:Boolean,observer:"_desktopModeChanged"},_desktopMediaQuery:{type:String,value:"(min-width: 375px)"},i18n:{type:Object},showWeekNumbers:{type:Boolean,value:!1},_ignoreTaps:Boolean,_notTapping:Boolean,minDate:{type:Object,sync:!0},maxDate:{type:Object,sync:!0},isDateDisabled:{type:Function},loading:{type:Boolean,value:!1,reflectToAttribute:!0},enteredDate:{type:Date,sync:!0},label:String,_cancelButton:{type:Object},_todayButton:{type:Object},_dateMetadataController:{type:Object,sync:!0},calendars:{type:Array,value:()=>[]},years:{type:Array,value:()=>[]}}}static get observers(){return["__updateCalendarsConfig(calendars, i18n, minDate, maxDate, showWeekNumbers, isDateDisabled, _theme, _dateMetadataController)","__updateCalendarsState(calendars, selectedDate, focusedDate, enteredDate, _ignoreTaps)","__updateCancelButton(_cancelButton, i18n)","__updateYears(years, selectedDate, _theme)"]}disconnectedCallback(){super.disconnectedCallback(),this.cancelLoadVisibleDateMetadata()}updated(e){super.updated(e),e.has("loading")&&Y(this,"aria-busy",this.loading),e.has("i18n")&&Y(this,"aria-label",this.i18n?.dialogAccessibleName),(e.has("calendars")||e.has("_dateMetadataController"))&&this.loadVisibleDateMetadata(),(e.has("_todayButton")||e.has("i18n")||e.has("minDate")||e.has("maxDate")||e.has("isDateDisabled"))&&this.updateTodayButton()}get __useSubMonthScrolling(){return this._monthScroller.clientHeight<this._monthScroller.itemHeight+this._monthScroller.bufferOffset}get focusableDateElement(){return this.calendars.map(e=>e.focusableDateElement).find(Boolean)}_initControllers(){this.addController(new kt(this._desktopMediaQuery,e=>{this._desktopMode=e})),this.addController(new ie(this,"today-button","vaadin-button",{observe:!1,initializer:e=>{e.setAttribute("theme","tertiary"),e.addEventListener("keydown",i=>this.__onTodayButtonKeyDown(i)),e.addEventListener("click",this._onTodayTap.bind(this)),this._todayButton=e}})),this.addController(new ie(this,"cancel-button","vaadin-button",{observe:!1,initializer:e=>{e.setAttribute("theme","tertiary"),e.addEventListener("keydown",i=>this.__onCancelButtonKeyDown(i)),e.addEventListener("click",this._cancel.bind(this)),this._cancelButton=e}})),this.__initMonthScroller(),this.__initYearScroller()}reset(){this._closeYearScroller(),this._monthScroller?.reset(),this._yearScroller?.reset()}focusCancel(){this._cancelButton.focus()}scrollToDate(e,i){let s=this.__useSubMonthScrolling?this._calculateWeekScrollOffset(e):0;this._scrollToPosition(this._differenceInMonths(e,this._originDate)+s,i),this._monthScroller.forceUpdate()}__initMonthScroller(){this.addController(new ie(this,"months","vaadin-date-picker-month-scroller",{observe:!1,initializer:e=>{e.addEventListener("custom-scroll",()=>{this._onMonthScroll()}),e.addEventListener("touchstart",()=>{this._onMonthScrollTouchStart()}),e.addEventListener("keydown",i=>{this.__onMonthCalendarKeyDown(i)}),e.addEventListener("init-done",()=>{let i=[...this.querySelectorAll("vaadin-month-calendar")];i.forEach(s=>{s.addEventListener("selected-date-changed",n=>{this.selectedDate=n.detail.value})}),this.calendars=i}),this._monthScroller=e}}))}__initYearScroller(){this.addController(new ie(this,"years","vaadin-date-picker-year-scroller",{observe:!1,initializer:e=>{e.setAttribute("aria-hidden","true"),qt(e,"tap",i=>{this._onYearTap(i)}),e.addEventListener("custom-scroll",()=>{this._onYearScroll()}),e.addEventListener("touchstart",()=>{this._onYearScrollTouchStart()}),e.addEventListener("init-done",()=>{this.years=[...this.querySelectorAll("vaadin-date-picker-year")]}),this._yearScroller=e}}))}__updateCancelButton(e,i){e&&(e.textContent=i?.cancel)}updateTodayButton(){let e=this._todayButton;e&&(e.textContent=this.i18n?.today,e.disabled=!this._isTodayAllowed())}loadVisibleDateMetadata(){let e=this._dateMetadataController;if(!e)return;let i=(this.calendars??[]).map(s=>s.month).filter(Boolean).map(s=>Ot(s));i.length!==0&&e.ensureRangeLoaded(Or(Math.min(...i)),Or(Math.max(...i)))}cancelLoadVisibleDateMetadata(){this._loadDateMetadataDebouncer?.cancel()}__updateCalendarsConfig(e,i,s,n,a,d,c,f){e?.length&&e.forEach(m=>{m.i18n=i,m.minDate=s,m.maxDate=n,m.isDateDisabled=d,m._dateMetadataController=f,f?.subscribe(m),m.showWeekNumbers=a,Y(m,"theme",c)})}__scheduleLoadVisibleDateMetadata(){this._loadDateMetadataDebouncer=ae.debounce(this._loadDateMetadataDebouncer,Ge.after(200),()=>this.loadVisibleDateMetadata())}__updateCalendarsState(e,i,s,n,a){e?.length&&e.forEach(d=>{d.focusedDate=s,d.selectedDate=i,d.enteredDate=n,d.ignoreTaps=a})}__updateYears(e,i,s){e?.length&&e.forEach(n=>{n.selectedDate=i,Y(n,"theme",s)})}_selectDate(e){return this._dateSelectable(e)?(this.selectedDate=e,this.dispatchEvent(new CustomEvent("date-selected",{detail:{date:e},bubbles:!0,composed:!0})),!0):!1}_desktopModeChanged(e){this.toggleAttribute("desktop",e)}_focusedDateChanged(e){this.revealDate(e)}revealDate(e,i=!0){if(!e)return;let s=this._differenceInMonths(e,this._originDate);if(this.__useSubMonthScrolling){let f=this._calculateWeekScrollOffset(e);this._scrollToPosition(s+f,i);return}let n=this._monthScroller.position>s,d=Math.max(this._monthScroller.itemHeight,this._monthScroller.clientHeight-this._monthScroller.bufferOffset*2)/this._monthScroller.itemHeight,c=this._monthScroller.position+d-1<s;n?this._scrollToPosition(s,i):c&&this._scrollToPosition(s-d+1,i)}_calculateWeekScrollOffset(e){let i=Er(e),s=0;for(;i.getDate()<e.getDate();)i.setDate(i.getDate()+1),i.getDay()===this.i18n.firstDayOfWeek&&(s+=1);return s/6}_initialPositionChanged(e){this._monthScroller&&this._yearScroller&&(this._monthScroller.active=!0,this._yearScroller.active=!0),this.scrollToDate(e)}_repositionYearScroller(){let e=this._monthScroller.position;this._visibleMonthIndex=Math.floor(e),this._yearScroller.position=(e+this._originDate.getMonth())/12,this.__scheduleLoadVisibleDateMetadata()}_repositionMonthScroller(){this._monthScroller.position=this._yearScroller.position*12-this._originDate.getMonth(),this._visibleMonthIndex=Math.floor(this._monthScroller.position),this.__scheduleLoadVisibleDateMetadata()}_onMonthScroll(){this._repositionYearScroller(),this._doIgnoreTaps()}_onYearScroll(){this._repositionMonthScroller(),this._doIgnoreTaps()}_onYearScrollTouchStart(){this._notTapping=!1,setTimeout(()=>{this._notTapping=!0},300),this._repositionMonthScroller()}_onMonthScrollTouchStart(){this._repositionYearScroller()}_doIgnoreTaps(){this._ignoreTaps=!0,this._debouncer=ae.debounce(this._debouncer,Ge.after(300),()=>{this._ignoreTaps=!1})}_onTodayTap(){let e=this._getTodayMidnight();Math.abs(this._monthScroller.position-this._differenceInMonths(e,this._originDate))<.001?(this._selectDate(e),this._close()):this._scrollToCurrentMonth()}_scrollToCurrentMonth(){this.focusedDate&&(this.focusedDate=new Date),this.scrollToDate(new Date,!0)}_onYearTap(e){if(!this._ignoreTaps&&!this._notTapping){let s=(e.detail.y-(this._yearScroller.getBoundingClientRect().top+this._yearScroller.clientHeight/2))/this._yearScroller.itemHeight;this._scrollToPosition(this._monthScroller.position+s*12,!0)}}_scrollToPosition(e,i){if(this._targetPosition!==void 0){this._targetPosition=e;return}if(!i){this._monthScroller.position=e,this._monthScroller.forceUpdate(),this._targetPosition=void 0,this._repositionYearScroller(),this.__tryFocusDate();return}this._targetPosition=e;let s;this._revealPromise=new Promise(f=>{s=f});let n=(f,m,_,v)=>(f/=v/2,f<1?_/2*f*f+m:(f-=1,-_/2*(f*(f-2)-1)+m)),a=0,d=this._monthScroller.position,c=f=>{a||(a=f);let m=f-a;if(m<this.scrollDuration){let _=n(m,d,this._targetPosition-d,this.scrollDuration);this._monthScroller.position=_,window.requestAnimationFrame(c)}else this.dispatchEvent(new CustomEvent("scroll-animation-finished",{bubbles:!0,composed:!0,detail:{position:this._targetPosition,oldPosition:d}})),this._monthScroller.position=this._targetPosition,this._monthScroller.forceUpdate(),this._targetPosition=void 0,s(),this._revealPromise=void 0;setTimeout(this._repositionYearScroller.bind(this),1)};window.requestAnimationFrame(c)}_toggleYearScroller(){this.toggleAttribute("years-visible")}_closeYearScroller(){this.removeAttribute("years-visible")}_yearAfterXMonths(e){return Ao(e).getFullYear()}_differenceInMonths(e,i){return Ot(e)-Ot(i)}_clear(){this._selectDate("")}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_cancel(){this.focusedDate=this.selectedDate,this._close()}__toggleDate(e){Ee(e,this.selectedDate)?(this._clear(),this.focusedDate=e):this._selectDate(e)}__onMonthCalendarKeyDown(e){let i=!1;switch(e.key){case"ArrowDown":this._moveFocusByDays(7),i=!0;break;case"ArrowUp":this._moveFocusByDays(-7),i=!0;break;case"ArrowRight":this._moveFocusByDays(this.__isRTL?-1:1),i=!0;break;case"ArrowLeft":this._moveFocusByDays(this.__isRTL?1:-1),i=!0;break;case"Enter":this._selectDate(this.focusedDate)&&(this._close(),i=!0);break;case" ":this.__toggleDate(this.focusedDate),i=!0;break;case"Home":this._moveFocusInsideMonth(this.focusedDate,"minDate"),i=!0;break;case"End":this._moveFocusInsideMonth(this.focusedDate,"maxDate"),i=!0;break;case"PageDown":this._moveFocusByMonths(e.shiftKey?12:1),i=!0;break;case"PageUp":this._moveFocusByMonths(e.shiftKey?-12:-1),i=!0;break;case"Tab":this._onTabKeyDown(e,"calendar");break;default:break}i&&(e.preventDefault(),e.stopPropagation())}_onTabKeyDown(e,i){switch(e.stopPropagation(),i){case"calendar":e.shiftKey&&(e.preventDefault(),this.hasAttribute("fullscreen")?this.focusCancel():this.__focusInput());break;case"today":e.shiftKey&&(e.preventDefault(),this.focusDateElement());break;case"cancel":e.shiftKey||(e.preventDefault(),this.hasAttribute("fullscreen")?this.focusDateElement():this.__focusInput());break;default:break}}__onTodayButtonKeyDown(e){e.key==="Tab"&&this._onTabKeyDown(e,"today")}__onCancelButtonKeyDown(e){e.key==="Tab"&&this._onTabKeyDown(e,"cancel")}__focusInput(){this.dispatchEvent(new CustomEvent("focus-input",{bubbles:!0,composed:!0}))}__tryFocusDate(){if(this.__pendingDateFocus){let i=this.focusableDateElement;i&&Ee(i.date,this.__pendingDateFocus)&&(delete this.__pendingDateFocus,i.focus())}}async focusDate(e,i){let s=e||this.selectedDate||this.initialPosition||new Date;this.focusedDate=s,i||(this._focusedMonthDate=s.getDate()),await this.focusDateElement(!1)}async focusDateElement(e=!0){this.__pendingDateFocus=this.focusedDate,this.calendars.length||await new Promise(i=>{requestAnimationFrame(()=>{setTimeout(()=>{i()})})}),e&&this.revealDate(this.focusedDate),this._revealPromise&&await this._revealPromise,this.__tryFocusDate()}_focusClosestDate(e){this.focusDate(Io(e,[this.minDate,this.maxDate]))}_focusAllowedDate(e,i,s){this._dateAllowed(e,void 0,void 0,()=>!1)?this.focusDate(e,s):this._dateAllowed(this.focusedDate)?i>0?this.focusDate(this.maxDate):this.focusDate(this.minDate):this._focusClosestDate(this.focusedDate)}_getDateDiff(e,i){return Yi(this.focusedDate.getFullYear(),this.focusedDate.getMonth()+e,i?this.focusedDate.getDate()+i:1)}_moveFocusByDays(e){let i=this._getDateDiff(0,e);this._focusAllowedDate(i,e,!1)}_moveFocusByMonths(e){let i=this._getDateDiff(e),s=i.getMonth();this._focusedMonthDate||(this._focusedMonthDate=this.focusedDate.getDate()),i.setDate(this._focusedMonthDate),i.getMonth()!==s&&i.setDate(0),this._focusAllowedDate(i,e,!0)}_moveFocusInsideMonth(e,i){let s=i==="minDate"?Er(e):Tr(e);this._dateAllowed(s)?this.focusDate(s):this._dateAllowed(e)?this.focusDate(this[i]):this._focusClosestDate(e)}_dateAllowed(e,i=this.minDate,s=this.maxDate,n=this.isDateDisabled){return vi(e,i,s,n)}_dateSelectable(e){return Dr(e,this.minDate,this.maxDate,this.isDateDisabled,this._dateMetadataController)}_isTodayAllowed(){return this._dateSelectable(this._getTodayMidnight())}_getTodayMidnight(){let e=new Date;return Yi(e.getFullYear(),e.getMonth(),e.getDate())}};var nd=class extends Rf(I(J(O(A(S))))){static get is(){return"vaadin-date-picker-overlay-content"}static get styles(){return[po,Lf]}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}render(){return w`
      <slot name="months"></slot>
      <slot name="years"></slot>

      <div part="loader" aria-hidden="true"></div>

      <div role="toolbar" part="toolbar">
        <slot name="today-button"></slot>
        <div
          part="years-toggle-button"
          ?hidden="${this._desktopMode}"
          aria-hidden="true"
          @click="${this._toggleYearScroller}"
        >
          ${this._yearAfterXMonths(this._visibleMonthIndex)}
        </div>
        <slot name="cancel-button"></slot>
      </div>
    `}firstUpdated(){super.firstUpdated(),this.setAttribute("role","dialog"),this._initControllers()}};E(nd);var Nf=C`
  :host([opened]) {
    pointer-events: auto;
  }

  :host([week-numbers]) {
    --_vaadin-date-picker-week-numbers-visible: 1;
  }

  :host([dir='rtl']) [part='input-field'] {
    direction: ltr;
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input)::placeholder {
    direction: rtl;
    text-align: left;
  }

  [part~='toggle-button']::before {
    mask-image: var(--_vaadin-icon-calendar);
  }

  :host([readonly]) [part~='toggle-button'] {
    display: none;
  }
`;var Ir=new WeakMap,Po=new WeakMap,Lo={},od=0,$f=r=>r?.nodeType===Node.ELEMENT_NODE,ad=(...r)=>{console.error(`Error: ${r.join(" ")}. Skip setting aria-hidden.`)},ux=(r,t)=>$f(r)?t.map(e=>{if(!$f(e))return ad(e,"is not a valid element"),null;let i=e;for(;i&&i!==r;){if(r.contains(i))return e;i=i.getRootNode().host}return ad(e,"is not contained inside",r),null}).filter(e=>!!e):(ad(r,"is not a valid element"),[]),cx=(r,t,e,i)=>{let s=ux(t,Array.isArray(r)?r:[r]);Lo[e]||(Lo[e]=new WeakMap);let n=Lo[e],a=[],d=new Set,c=new Set(s),f=_=>{if(!_||d.has(_))return;d.add(_);let v=_.assignedSlot;v&&f(v),f(_.parentNode||_.host)};s.forEach(f);let m=_=>{if(!_||c.has(_))return;let v=_.shadowRoot;(v?[..._.children,...v.children]:[..._.children]).forEach(y=>{if(!["template","script","style"].includes(y.localName))if(d.has(y))m(y);else{let T=y.getAttribute(i),N=T!==null&&T!=="false",$=(Ir.get(y)||0)+1,B=(n.get(y)||0)+1;Ir.set(y,$),n.set(y,B),a.push(y),$===1&&N&&Po.set(y,!0),B===1&&y.setAttribute(e,"true"),N||y.setAttribute(i,"true")}})};return m(t),d.clear(),od+=1,()=>{a.forEach(_=>{let v=Ir.get(_)-1,b=n.get(_)-1;Ir.set(_,v),n.set(_,b),v||(Po.has(_)?Po.delete(_):_.removeAttribute(i)),b||_.removeAttribute(e)}),od-=1,od||(Ir=new WeakMap,Ir=new WeakMap,Po=new WeakMap,Lo={})}},Ff=(r,t=document.body,e="data-aria-hidden")=>{let i=Array.from(Array.isArray(r)?r:[r]);return t&&i.push(...Array.from(t.querySelectorAll("[aria-live]"))),cx(i,t,e,"aria-hidden")};var AV="inert"in HTMLElement.prototype;var Ro=class{constructor(t){this.host=t,t.addEventListener("opened-changed",()=>{t.opened||this.#e(!1)}),t.addEventListener("blur",()=>this.#e(!0)),t.addEventListener("touchstart",()=>this.#e(!0))}#e(t){this.host.inputElement&&(this.host.inputElement.inputMode=t?"":"none")}};var ld=12;function Bf(r){return Math.floor(r/ld)*ld}var fx=Object.freeze({pending:!0});function px(r){return typeof r?.date=="string"?yi(r.date):void 0}function mx(r,t){let e=new Map(r.map(i=>[i,new Map]));return Array.isArray(t)?t.forEach(i=>{let s=px(i);s?e.get(Ot(s))?.set(s.getDate(),i):ai("Ignored `dateMetadataProvider` entries whose `date` is not an ISO 8601 date.")}):t!=null&&ai("Expected `dateMetadataProvider` to return an array of date metadata objects."),e}var No=class{host;provider=null;#e;#t=new Map;#i=new Set;#r=0;#n;constructor(t,e){this.host=t,this.#e=e}hostConnected(){this.#o()}subscribe(t){this.#i.add(t)}isLoading(){for(let{pending:t}of this.#t.values())if(t)return!0;return!1}setProvider(t){let e=t??null;this.provider!==e&&(this.provider=e,this.clearCache())}clearCache(){this.#t.clear(),this.#r+=1,this.#o()}isMonthLoaded(t){return!!this.#s(t)}isMonthPending(t){return!!t&&!!this.#t.get(Ot(t))?.pending}getMetadata(t){return this.#s(t)?.entries.get(t.getDate())}isDateDisabled(t){return!!this.getMetadata(t)?.disabled}ensureRangeLoaded(t,e){if(!this.provider||!t||!e)return;let i=Bf(Ot(t)),s=Bf(Ot(e))+ld-1,n=[];for(let a=i;a<=s;a++)this.#t.has(a)||n.push(a);n.length>0&&this.#a(n)}#s(t){let e=t&&this.#t.get(Ot(t));return e&&!e.pending?e:void 0}async#a(t){let e=this.#r;t.forEach(n=>this.#t.set(n,fx)),this.#o();let i={start:bs(Or(t[0])),end:bs(Tr(Or(t.at(-1))))},s;try{let n=await this.provider(i);s=mx(t,n)}catch(n){console.error(n)}e===this.#r&&(t.forEach(n=>{s?this.#t.set(n,{pending:!1,entries:s.get(n)}):this.#t.delete(n)}),this.#o())}#o(){this.#i.forEach(t=>t.requestUpdate()),this.#e&&(this.#n=ae.debounce(this.#n,tt,()=>{this.host.isConnected&&this.#e()}))}};var $o=Object.freeze({monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],firstDayOfWeek:0,today:"Today",cancel:"Cancel",dialogAccessibleName:"Calendar",referenceDate:"",formatDate(r){let t=String(r.year).replace(/\d+/u,e=>"0000".substr(e.length)+e);return[r.month+1,r.day,t].join("/")},parseDate(r){let t=r.split("/"),e=new Date,i,s=e.getMonth(),n=e.getFullYear();if(t.length===3){if(s=parseInt(t[0])-1,i=parseInt(t[1]),n=parseInt(t[2]),t[2].length<3&&n>=0){let a=yi(this.referenceDate)||new Date;n=Cf(a,n,s,i)}}else t.length===2?(s=parseInt(t[0])-1,i=parseInt(t[1])):t.length===1&&(i=parseInt(t[0]));if(i!==void 0)return{day:i,month:s,year:n}},formatTitle:(r,t)=>`${r} ${t}`}),Vf=r=>class extends Et(Ct(yr(Be(r)))){static get properties(){return{_selectedDate:{type:Object,sync:!0},_focusedDate:{type:Object,sync:!0},value:{type:String,notify:!0,value:"",sync:!0},initialPosition:{type:String},opened:{type:Boolean,reflectToAttribute:!0,notify:!0,observer:"_openedChanged",sync:!0},autoOpenDisabled:{type:Boolean,sync:!0},showWeekNumbers:{type:Boolean,value:!1,sync:!0},_fullscreen:{type:Boolean,value:!1,sync:!0},_fullscreenMediaQuery:{value:"(max-width: 450px), (max-height: 450px)"},min:{type:String,sync:!0},max:{type:String,sync:!0},isDateDisabled:{type:Function},dateMetadataProvider:{type:Function},_minDate:{type:Date,computed:"__computeMinOrMaxDate(min)"},_maxDate:{type:Date,computed:"__computeMinOrMaxDate(max)"},_noInput:{type:Boolean,computed:"_isNoInput(inputElement, _fullscreen, _ios, __effectiveI18n, opened, autoOpenDisabled)"},_ios:{type:Boolean,value:fi},_focusOverlayOnOpen:Boolean,_overlayContent:{type:Object,sync:!0},__enteredDate:{type:Date,sync:!0}}}static get observers(){return["_selectedDateChanged(_selectedDate, __effectiveI18n)","_focusedDateChanged(_focusedDate, __effectiveI18n)","__updateOverlayContent(_overlayContent, __effectiveI18n, label, _minDate, _maxDate, _focusedDate, _selectedDate, showWeekNumbers, isDateDisabled, __enteredDate)","__updateOverlayContentTheme(_overlayContent, _theme)","__updateOverlayContentFullScreen(_overlayContent, _fullscreen)"]}static get defaultI18n(){return $o}static get constraints(){return[...super.constraints,"min","max","dateMetadataProvider"]}constructor(){super(),this._boundOnClick=this._onClick.bind(this),this._boundOnScroll=this._onScroll.bind(this),this._dateMetadataController=new No(this,()=>this.__onDateMetadataChanged()),this.addController(this._dateMetadataController)}get i18n(){return super.i18n}set i18n(e){super.i18n=e}get _inputElementValue(){return super._inputElementValue}set _inputElementValue(e){super._inputElementValue=e;let i=this.__parseDate(e);this.__setEnteredDate(i)}get __unparsableValue(){return!this._inputElementValue||this.__parseDate(this._inputElementValue)?"":this._inputElementValue}_onFocus(e){super._onFocus(e),this._noInput&&!ce()&&(this.__ignoreInternalBlur=!0,e.target.blur(),this.__ignoreInternalBlur=!1)}_onBlur(e){super._onBlur(e),!this.__ignoreInternalBlur&&(this.opened||(this.__commitParsedOrFocusedDate(),document.hasFocus()&&this._requestValidation()))}ready(){super.ready(),this.addEventListener("click",this._boundOnClick),this.addController(new kt(this._fullscreenMediaQuery,e=>{this._fullscreen=e})),this.addController(new Ro(this)),this._overlayElement=this.$.overlay}updated(e){super.updated(e),e.has("dateMetadataProvider")&&(this._dateMetadataController.setProvider(this.dateMetadataProvider),this.__reloadDateMetadata()),(e.has("showWeekNumbers")||e.has("__effectiveI18n"))&&this.toggleAttribute("week-numbers",this.showWeekNumbers&&this.__effectiveI18n.firstDayOfWeek===1)}disconnectedCallback(){super.disconnectedCallback(),this.opened=!1}focus(e){this._noInput&&!ce()?this.open():super.focus(e)}open(){!this.disabled&&!this.readonly&&(this.opened=!0)}close(){this.$.overlay.close()}clearCache(){this._dateMetadataController.clearCache(),this.__reloadDateMetadata()}__reloadDateMetadata(){this.opened&&this._overlayContent?.loadVisibleDateMetadata(),this.__ensureSelectedDateLoaded()}__ensureContent(){if(this._overlayContent)return;let e=document.createElement("vaadin-date-picker-overlay-content");e.setAttribute("slot","overlay"),this.appendChild(e),this._overlayContent=e,e.addEventListener("close",()=>{this._close()}),e.addEventListener("focus-input",this._focusAndSelect.bind(this)),e.addEventListener("date-tap",i=>{this.__commitDate(i.detail.date),this._close()}),e.addEventListener("date-selected",i=>{this.__commitDate(i.detail.date)}),e.addEventListener("focusin",()=>{this._keyboardActive&&this._setFocused(!0)}),e.addEventListener("focusout",i=>{this._shouldRemoveFocus(i)&&this._setFocused(!1)}),e.addEventListener("focused-date-changed",i=>{this._focusedDate=i.detail.value}),e.addEventListener("click",i=>i.stopPropagation())}__parseDate(e){if(!this.__effectiveI18n.parseDate)return;let i=this.__effectiveI18n.parseDate(e);if(i&&(i=yi(`${i.year}-${i.month+1}-${i.day}`)),i&&!isNaN(i.getTime()))return i}__formatDate(e){if(this.__effectiveI18n.formatDate)return this.__effectiveI18n.formatDate(ed(e))}checkValidity(){let e=this._inputElementValue,i=!e||!!this._selectedDate&&e===this.__formatDate(this._selectedDate),s=!this._selectedDate||Dr(this._selectedDate,this._minDate,this._maxDate,this.isDateDisabled,this._dateMetadataController),n=!0;return this.inputElement&&this.inputElement.checkValidity&&(n=this.inputElement.checkValidity()),i&&s&&n}__ensureSelectedDateLoaded(){let e=this._dateMetadataController,i=!!(e?.provider&&this._selectedDate&&!e.isMonthLoaded(this._selectedDate));this.__awaitingProviderValidation=i,i&&e.ensureRangeLoaded(this._selectedDate,this._selectedDate)}__onDateMetadataChanged(){let e=this._dateMetadataController;this._overlayContent&&(this._overlayContent.loading=e.isLoading(),this._overlayContent.updateTodayButton()),this.__awaitingProviderValidation&&this._selectedDate&&e.isMonthLoaded(this._selectedDate)&&(this.__awaitingProviderValidation=!1,this._requestValidation())}_shouldSetFocus(e){return!this._shouldKeepFocusRing}_shouldKeepFocusOnClearMousedown(){return this.opened?!0:super._shouldKeepFocusOnClearMousedown()}_shouldRemoveFocus(e){let{relatedTarget:i}=e;return this.opened&&i!==null&&i!==document.body&&!this.contains(i)&&!this._overlayContent.contains(i)?!0:!this.opened}_setFocused(e){super._setFocused(e),this._shouldKeepFocusRing=e&&this._keyboardActive}__commitValueChange(){let e=this.__unparsableValue;this.__committedValue!==this.value?(this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))):this.__committedUnparsableValue!==e&&(this._requestValidation(),this.dispatchEvent(new CustomEvent("unparsable-change"))),this.__committedValue=this.value,this.__committedUnparsableValue=e}__commitDate(e){this.__keepCommittedValue=!0,this._selectedDate=e,this.__keepCommittedValue=!1,this.__commitValueChange()}_close(){this._focus(),this.close()}_isNoInput(e,i,s,n,a,d){return!e||i&&(!d||a)||s&&a||!n.parseDate}_formatISO(e){return bs(e)}_inputElementChanged(e){super._inputElementChanged(e),e&&(e.autocomplete="off",e.setAttribute("role","combobox"),e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded",!!this.opened),this._applyInputValue(this._selectedDate))}_openedChanged(e){e&&this.__ensureContent(),this.inputElement&&this.inputElement.setAttribute("aria-expanded",e)}_selectedDateChanged(e,i){e===void 0||i===void 0||(this.__keepInputValue||this._applyInputValue(e),this.value=this._formatISO(e),this._ignoreFocusedDateChange=!0,this._focusedDate=e,this._ignoreFocusedDateChange=!1,this.__ensureSelectedDateLoaded())}_focusedDateChanged(e,i){e===void 0||i===void 0||!this._ignoreFocusedDateChange&&!this._noInput&&this._applyInputValue(e)}_valueChanged(e,i){let s=yi(e);if(e&&!s){this.value=i;return}e?Ee(this._selectedDate,s)||(this._selectedDate=s,i!==void 0&&this._requestValidation()):this._selectedDate=null,this.__keepCommittedValue||(this.__committedValue=this.value,this.__committedUnparsableValue=""),this._toggleHasValue(this._hasValue)}__updateOverlayContent(e,i,s,n,a,d,c,f,m,_){e&&(e._dateMetadataController=this._dateMetadataController,e.i18n=i,e.label=s,e.minDate=n,e.maxDate=a,e.focusedDate=d,e.selectedDate=c,e.showWeekNumbers=f,e.isDateDisabled=m,e.enteredDate=_)}__updateOverlayContentTheme(e,i){e&&Y(e,"theme",i)}__updateOverlayContentFullScreen(e,i){e&&e.toggleAttribute("fullscreen",i)}_onOverlayEscapePress(e){e.stopPropagation(),this._focusedDate=this._selectedDate,this._applyInputValue(this._selectedDate),this._close()}_onOverlayOpened(){let e=this._overlayContent;e.reset();let i=this._getInitialPosition();e.initialPosition=i;let s=e.focusedDate||i;e.scrollToDate(s),this._ignoreFocusedDateChange=!0,e.focusedDate=s,this._ignoreFocusedDateChange=!1,window.addEventListener("scroll",this._boundOnScroll,!0),this._focusOverlayOnOpen?(e.focusDateElement(),this._focusOverlayOnOpen=!1):this._focus();let n=this.inputElement;this._noInput&&n&&(n.blur(),this._overlayContent.focusDateElement());let a=this._noInput?e:this;this.__showOthers=Ff(a)}_getInitialPosition(){let e=yi(this.initialPosition),i=this._selectedDate||this._overlayContent.initialPosition||e||new Date;return e||vi(i,this._minDate,this._maxDate,this.isDateDisabled)?i:this._minDate||this._maxDate?Io(i,[this._minDate,this._maxDate]):new Date}__commitParsedOrFocusedDate(){if(this._ignoreFocusedDateChange=!0,this.__effectiveI18n.parseDate){let e=this._inputElementValue||"",i=this.__parseDate(e);i?this.__commitDate(i):(this.__keepInputValue=!0,this.__commitDate(null),this.__keepInputValue=!1)}else this._focusedDate&&this.__commitDate(this._focusedDate);this._ignoreFocusedDateChange=!1}_onOverlayClosed(){this._overlayContent?.cancelLoadVisibleDateMetadata(),this.__showOthers&&(this.__showOthers(),this.__showOthers=null),window.removeEventListener("scroll",this._boundOnScroll,!0),this.__commitParsedOrFocusedDate(),this.inputElement&&this.inputElement.selectionStart&&(this.inputElement.selectionStart=this.inputElement.selectionEnd),!this.value&&!this._keyboardActive&&this._requestValidation(),(!this.inputElement||!Pe(this.inputElement))&&this._setFocused(!1)}_onScroll(e){(e.target===window||!this._overlayContent.contains(e.target))&&this._overlayContent._repositionYearScroller()}_focus(){this._noInput||this.inputElement.focus()}_focusAndSelect(){this._focus(),this._setSelectionRange(0,this._inputElementValue.length)}_applyInputValue(e){this._inputElementValue=e?this.__formatDate(e):""}_setSelectionRange(e,i){this.inputElement&&this.inputElement.setSelectionRange(e,i)}_onChange(e){e.stopPropagation()}_onClick(e){e.composedPath().includes(this._overlayElement)||this._isClearButton(e)||this._onHostClick(e)}_onHostClick(e){(!this.autoOpenDisabled||this._noInput)&&(e.preventDefault(),this.open())}_onClearButtonClick(e){e.preventDefault(),this.__commitDate(null)}_onKeyDown(e){switch(super._onKeyDown(e),this._noInput&&["Tab","Escape"].indexOf(e.key)===-1&&e.preventDefault(),e.key){case"ArrowDown":case"ArrowUp":e.preventDefault(),this.opened?this._overlayContent.focusDateElement():(this._focusOverlayOnOpen=!0,this.open());break;case"Tab":this.opened&&(e.preventDefault(),e.stopPropagation(),this._setSelectionRange(0,0),e.shiftKey?this._overlayContent.focusCancel():this._overlayContent.focusDateElement());break;default:break}}_onEnter(e){e.composedPath().includes(this._overlayContent)||(this.opened?this.close():this.__commitParsedOrFocusedDate())}_onEscape(e){if(this.opened){this._onOverlayEscapePress(e);return}if(this.clearButtonVisible&&this.value&&!this.readonly){e.stopPropagation(),this._onClearButtonClick(e);return}this.inputElement.value===""?this.__commitDate(null):this._applyInputValue(this._selectedDate)}_isClearButton(e){return e.composedPath()[0]===this.clearElement}_onInput(){!this.opened&&this._inputElementValue&&!this.autoOpenDisabled&&this.open();let e=this.__parseDate(this._inputElementValue||"");e&&(this._ignoreFocusedDateChange=!0,Ee(e,this._focusedDate)||(this._focusedDate=e),this._ignoreFocusedDateChange=!1),this.__setEnteredDate(e)}__setEnteredDate(e){e?Ee(this.__enteredDate,e)||(this.__enteredDate=e):this.__enteredDate=null}__computeMinOrMaxDate(e){return yi(e)}};var xs=class extends Vf(gi(I(K(O(A(S)))))){static get is(){return"vaadin-date-picker"}static get styles(){return[ze,Nf]}static get properties(){return{_positionTarget:{type:Object,sync:!0}}}get clearElement(){return this.$.clearButton}render(){return w`
      <div class="vaadin-date-picker-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" @click="${this.focus}"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          .readonly="${this.readonly}"
          .disabled="${this.disabled}"
          .invalid="${this.invalid}"
          theme="${re(this._theme)}"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
          <div part="field-button toggle-button" slot="suffix" aria-hidden="true" @click="${this._toggle}"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>

      <vaadin-date-picker-overlay
        id="overlay"
        .owner="${this}"
        ?fullscreen="${this._fullscreen}"
        theme="${re(this._theme)}"
        .opened="${this.opened}"
        @opened-changed="${this._onOpenedChanged}"
        @vaadin-overlay-open="${this._onOverlayOpened}"
        @vaadin-overlay-close="${this._onVaadinOverlayClose}"
        @vaadin-overlay-closing="${this._onOverlayClosed}"
        restore-focus-on-close
        no-vertical-overlap
        exportparts="backdrop, overlay, content"
        .restoreFocusNode="${this.inputElement}"
        .positionTarget="${this._positionTarget}"
      >
        <slot name="overlay"></slot>
      </vaadin-date-picker-overlay>
    `}ready(){super.ready(),this.addController(new Ve(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e},{uniqueIdPrefix:"search-input"})),this.addController(new Ie(this.inputElement,this._labelController)),this._tooltipController=new ue(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this._tooltipController.setShouldShow(e=>!e.opened),this._positionTarget=this.shadowRoot.querySelector('[part="input-field"]'),this.shadowRoot.querySelector('[part="field-button toggle-button"]').addEventListener("mousedown",e=>e.preventDefault())}_onOpenedChanged(t){this.opened=t.detail.value}_onVaadinOverlayClose(t){let e=t.detail.sourceEvent;e?.composedPath().includes(this)&&!e.composedPath().includes(this._overlayElement)&&t.preventDefault()}_toggle(t){t.stopPropagation(),this.$.overlay.opened?this.close():this.open()}};E(xs);function Ar(r){return r(),j.on("languageChanged",r),()=>j.off("languageChanged",r)}function Fo(){let r=ws(void 0,{day:"2-digit",month:"2-digit",year:"numeric"}),t=r.formatToParts(0).map(f=>f.type).filter(f=>f==="day"||f==="month"||f==="year"),e=_x(),i=ws(e,{month:"long"}),s=ws(e,{weekday:"long"}),n=ws(e,{weekday:"short"}),a=new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(0,"day"),d={monthNames:Array.from({length:12},(f,m)=>i.format(Date.UTC(2e3,m,1))),weekdays:Array.from({length:7},(f,m)=>s.format(Date.UTC(2e3,0,2+m))),weekdaysShort:Array.from({length:7},(f,m)=>n.format(Date.UTC(2e3,0,2+m))),today:a.charAt(0).toLocaleUpperCase(e)+a.slice(1),formatDate:f=>vx(r,f),parseDate:f=>yx(t,f)},c=gx(r.resolvedOptions().locale);return c!==void 0&&(d.firstDayOfWeek=c),j.exists("cancel")&&(d.cancel=j.t("cancel")),d}function Bo(){var r,t;let e=ws(void 0,{hour:"numeric",minute:"2-digit"});if(!e.resolvedOptions().hour12)return{};let i=e.resolvedOptions().locale,[s,n]=[0,12].map(m=>{var _,v;return(v=(_=e.formatToParts(Date.UTC(2e3,0,1,m)).find(b=>b.type==="dayPeriod"))==null?void 0:_.value)!=null?v:m<12?"AM":"PM"}),a=e.formatToParts(Date.UTC(2e3,0,1,1,2)).map(m=>m.type==="literal"?Object.assign(Object.assign({},m),{value:m.value.replace(/\s/gu," ")}):m),d=(t=(r=a.find((m,_)=>{var v;return m.type==="literal"&&((v=a[_-1])==null?void 0:v.type)==="hour"}))==null?void 0:r.value)!=null?t:":",c=wx(d),f=m=>m.toLocaleLowerCase(i).replace(/[\s.]/gu,"");return{formatTime:m=>xx(m,a,d,s,n),parseTime:m=>Cx(m,c,f(s),f(n),f)}}function _x(){var r;let t=j.language;if(t)try{return Intl.DateTimeFormat.supportedLocalesOf((r=qu[t])!=null?r:t)[0]}catch{return}}function ws(r,t){return new Intl.DateTimeFormat(r,Object.assign(Object.assign({},t),{timeZone:"UTC",numberingSystem:"latn"}))}function gx(r){var t,e;let i=new Intl.Locale(r),s=(e=(t=i.getWeekInfo)==null?void 0:t.call(i))!=null?e:i.weekInfo;return s&&s.firstDay%7}function vx(r,{day:t,month:e,year:i}){let s=new Date(0);return s.setUTCFullYear(i,e,t),r.formatToParts(s).map(n=>n.type==="year"?String(i).padStart(4,"0"):n.value).join("")}function yx(r,t){var e;let i=(e=t.match(/\d+/gu))!=null?e:[];if(i.length<1||i.length>3)return;let s=["day"];i.length===3?s=r:i.length===2&&(s=r.filter(m=>m!=="year"));let n=Object.fromEntries(s.map((m,_)=>[m,i[_]])),a=new Date,d=parseInt(n.day),c=n.month===void 0?a.getMonth():parseInt(n.month)-1,f=a.getFullYear();return n.year!==void 0&&(f=n.year.length<3?bx(a,parseInt(n.year),c,d):parseInt(n.year)),{day:d,month:c,year:f}}function bx(r,t,e,i){let s=t+100*Math.floor(r.getFullYear()/100);return r<new Date(s-50,e,i)?s-=100:r>new Date(s+50,e,i)&&(s+=100),s}function xx(r,t,e,i,s){if(!r)return"";let n=(c,f=2)=>String(c).padStart(f,"0"),a=Number(r.hours),d=n(r.minutes);return r.seconds!==void 0&&(d+=`${e}${n(r.seconds)}`),r.milliseconds!==void 0&&(d+=`.${n(r.milliseconds,3)}`),t.map(c=>{switch(c.type){case"hour":return c.value.length===2?n(a%12||12):String(a%12||12);case"minute":return d;case"dayPeriod":return a<12?i:s;default:return c.value}}).join("")}function wx(r){let t=r.replace(/[.*+?^${}()|[\]\\]/gu,"\\$&");return RegExp(`^\\s*(\\D*?)\\s*(\\d{1,2})(?:${t}(\\d{1,2})(?:${t}(\\d{1,2})(?:\\.(\\d{1,3}))?)?)?\\s*(\\D*?)\\s*$`,"u")}function Cx(r,t,e,i,s){let n=t.exec(r);if(!n)return;let[,a,d,c,f,m,_]=n,v=[a,_].map(s).filter($=>$);if(v.length>1)return;let[b]=v,y=parseInt(d),T=c===void 0?0:parseInt(c),N=f===void 0?void 0:parseInt(f);if(b){let $=e.startsWith(b),B=i.startsWith(b);if($===B||y<1||y>12)return;y=y%12+12*!!B}if(!(y>23)&&!(T>59)&&!((N??0)>59))return{hours:y,minutes:T,seconds:N,milliseconds:m===void 0?void 0:parseInt(m.padEnd(3,"0"))}}var Sx=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},zf=class extends xs{connectedCallback(){super.connectedCallback(),this._stopLanguageSync=Ar(()=>{this.i18n=Fo()})}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this._stopLanguageSync)==null||r.call(this)}};zf=Sx([q("or-vaadin-date-picker")],zf);var dd=class extends co(I(J(O(A(S))))){static get is(){return"vaadin-time-picker-item"}static get styles(){return[mi,uo]}render(){return w`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}};E(dd);var Yf=C`
  :host {
    --vaadin-item-checkmark-display: block;
  }

  #overlay {
    width: var(--vaadin-time-picker-overlay-width, var(--_vaadin-time-picker-overlay-default-width, auto));
  }

  [part='content'] {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;var hd=class extends fo(Ze(J(I(O(A(S)))))){static get is(){return"vaadin-time-picker-overlay"}static get styles(){return[Xe,Yf]}render(){return w`
      <div part="overlay" id="overlay">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `}};E(hd);var ud=class extends _o(O(S)){static get is(){return"vaadin-time-picker-scroller"}static get styles(){return ds}render(){return w`
      <div id="selector">
        <slot></slot>
      </div>
    `}};E(ud);var Uf=C`
  :host([opened]) {
    pointer-events: auto;
  }

  [part~='toggle-button']::before {
    mask-image: var(--_vaadin-icon-clock);
  }

  :host([readonly]) [part~='toggle-button'] {
    display: none;
  }

  /* See https://github.com/vaadin/vaadin-time-picker/issues/145 */
  :host([dir='rtl']) [part='input-field'] {
    direction: ltr;
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input)::placeholder {
    direction: rtl;
    text-align: left;
  }
`;var jf=r=>class extends yr(r){static get properties(){return{pattern:{type:String}}}static get delegateAttrs(){return[...super.delegateAttrs,"pattern"]}static get constraints(){return[...super.constraints,"pattern"]}};function bi(r){if(!r)return"";let t=(i=0,s="00")=>(s+i).substr((s+i).length-s.length),e=`${t(r.hours)}:${t(r.minutes)}`;return r.seconds!==void 0&&(e+=`:${t(r.seconds)}`),r.milliseconds!==void 0&&(e+=`.${t(r.milliseconds,"000")}`),e}var kx="(\\d|[0-1]\\d|2[0-3])",Hf="(\\d|[0-5]\\d)",Ex=Hf,Tx="(\\d{1,3})",Ox=new RegExp(`^${kx}(?::${Hf}(?::${Ex}(?:\\.${Tx})?)?)?$`,"u");function Dt(r){let t=Ox.exec(r);if(t){if(t[4])for(;t[4].length<3;)t[4]+="0";return{hours:t[1],minutes:t[2],seconds:t[3],milliseconds:t[4]}}}function Dx(r){let t=r==null?60:parseFloat(r);if(t%3600===0)return 1;if(t%60===0||!t)return 2;if(t%1===0)return 3;if(t<1)return 4}function Cs(r,t){if(!r)return r;let e=Dx(t);return{...r,hours:parseInt(r.hours),minutes:parseInt(r.minutes||0),seconds:e<3?void 0:parseInt(r.seconds||0),milliseconds:e<4?void 0:parseInt(r.milliseconds||0)}}var Vo=Object.freeze({formatTime:bi,parseTime:Dt}),Wf="00:00:00.000",qf="23:59:59.999",Kf=r=>class extends Et(jf(yo(gi(r)))){static get properties(){return{value:{type:String,notify:!0,value:"",sync:!0},min:{type:String,value:"",sync:!0},max:{type:String,value:"",sync:!0},step:{type:Number,sync:!0},_comboBoxValue:{type:String,sync:!0},_inputContainer:{type:Object}}}static get observers(){return["__updateAriaAttributes(_dropdownItems, opened, inputElement)"]}static get defaultI18n(){return Vo}static get constraints(){return[...super.constraints,"min","max"]}get _tagNamePrefix(){return"vaadin-time-picker"}get clearElement(){return this.$.clearButton}get i18n(){return super.i18n}set i18n(e){super.i18n=e}get __unparsableValue(){return this._inputElementValue&&!this.__effectiveI18n.parseTime(this._inputElementValue)?this._inputElementValue:""}ready(){super.ready(),this.addController(new Ve(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e},{uniqueIdPrefix:"search-input"})),this.addController(new Ie(this.inputElement,this._labelController)),this._inputContainer=this.shadowRoot.querySelector('[part~="input-field"]'),this._toggleElement=this.$.toggleButton,this._tooltipController=new ue(this),this._tooltipController.setShouldShow(e=>!e.opened),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}updated(e){if(super.updated(e),["__effectiveI18n","min","max","step"].some(i=>e.has(i))&&this.__updateDropdownItems(),e.has("step")){let i=this.__getTimeObject(this.value);this.value=bi(i),this.__updateInputValue(i)}e.has("__effectiveI18n")&&this.value&&this.__updateInputValue(this.__getTimeObject(this.value)),(e.has("value")||e.has("_dropdownItems"))&&(this._scroller.selectedItem=this._dropdownItems?.find(i=>i.value===this.value))}checkValidity(){return!!(this.inputElement.checkValidity()&&(!this.value||this._timeAllowed(Dt(this.value)))&&(!this._comboBoxValue||this.__effectiveI18n.parseTime(this._comboBoxValue)))}_getItemLabel(e){return e?e.label:""}_onClosed(){this._commitValue()}_onEscapeCancel(){this._inputElementValue=this._comboBoxValue,this._closeOrCommit()}_onClearAction(){this.__setValueFromText(""),this.__commitValueChange()}_onInput(e){this._focusedIndex=-1,super._onInput(e)}_commitValue(){if(this._focusedIndex>-1){let e=this._dropdownItems[this._focusedIndex];this.__setValueFromTime(Dt(e.value)),this._focusedIndex=-1}else this._inputElementValue!==this._comboBoxValue&&this.__setValueFromText(this._inputElementValue||"");this.__commitValueChange(),this._clearSelectionRange()}_revertInputValue(){this._inputElementValue=this._comboBoxValue,this._clearSelectionRange()}_setFocused(e){super._setFocused(e),!e&&!this._closeOnBlurIsPrevented&&document.hasFocus()&&this._requestValidation()}__validDayDivisor(e){return!e||24*3600%e===0||e<1&&e%1*1e3%1===0}_onKeyDown(e){if(super._onKeyDown(e),this.readonly||this.disabled||this._dropdownItems.length)return;let i=this.__validDayDivisor(this.step)&&this.step||60;e.keyCode===40?this.__onArrowPressWithStep(-i):e.keyCode===38&&this.__onArrowPressWithStep(i)}__onArrowPressWithStep(e){let i=this.__addStep(this.__getMsec(this.__memoValue),e);this.__memoValue=i,(this.__effectiveI18n.formatTime(i)||"")!==this._comboBoxValue&&this.__setValueFromTime(i),this.__commitValueChange()}__commitValueChange(){let e=this.__unparsableValue;this.__committedValue!==this.value?(this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))):this.__committedUnparsableValue!==e&&(this._requestValidation(),this.dispatchEvent(new CustomEvent("unparsable-change"))),this.__committedValue=this.value,this.__committedUnparsableValue=e}__getMsec(e){let i=(e?.hours||0)*60*60*1e3;return i+=(e?.minutes||0)*60*1e3,i+=(e?.seconds||0)*1e3,i+=parseInt(e?.milliseconds)||0,i}__truncateTime(e){return Cs(e,this.step)}__getTimeObject(e){return this.__truncateTime(Dt(e))}__getTimeFromMsec(e){let i=Math.floor(e/1e3/60/60);e-=i*1e3*60*60;let s=Math.floor(e/1e3/60);e-=s*1e3*60;let n=Math.floor(e/1e3);return e-=n*1e3,{hours:i<24?i:0,minutes:s,seconds:n,milliseconds:e}}__addStep(e,i){e===0&&i<0&&(e=1440*60*1e3);let s=i*1e3,n=e%s;return s<0&&n?e-=n:s>0&&n?e-=n-s:e+=s,this.__getTimeFromMsec(e)}__updateDropdownItems(){let e=this.__getMsec(this.__getTimeObject(this.min||Wf)),i=this.__getMsec(this.__getTimeObject(this.max||qf));this._dropdownItems=this.__generateDropdownList(e,i,this.step)}__updateAriaAttributes(e,i,s){e===void 0||s===void 0||(e.length===0?(s.removeAttribute("role"),s.removeAttribute("aria-expanded")):(s.setAttribute("role","combobox"),s.setAttribute("aria-expanded",!!i)))}__generateDropdownList(e,i,s){if(s<900||!this.__validDayDivisor(s))return[];let n=(s||3600)*1e3,a=[];for(let d=e;d<=i;d+=n){let c=Cs(this.__getTimeFromMsec(d),s),f=this.__effectiveI18n.formatTime(c);a.push({label:f,value:bi(c)})}return a}_valueChanged(e,i){let s=this.__memoValue=this.__getTimeObject(e),n=bi(s);this.__keepCommittedValue||(this.__committedValue=e,this.__committedUnparsableValue=""),e!==""&&e!==null&&!s?this.value=i??"":e!==n?this.value=n:this.__keepCommittedValue||this.__updateInputValue(s),this._toggleHasValue(this._hasValue)}__setUncommittedValue(e){this.__keepCommittedValue=!0,this.value=e,this.__keepCommittedValue=!1}__setValueFromTime(e){let i=this.__truncateTime(e);this.__setUncommittedValue(bi(i)),this.__updateInputValue(i)}__setValueFromText(e){let i=e?this.__effectiveI18n.parseTime(e):void 0;if(i){this.__setValueFromTime(i);return}this.__setUncommittedValue(""),this._inputElementValue=e,this._comboBoxValue=e}__updateInputValue(e){let i=this.__effectiveI18n.formatTime(e)||"";this._inputElementValue=i,this._comboBoxValue=i}_timeAllowed(e){let i=Dt(this.min||Wf),s=Dt(this.max||qf);return(!i||this.__getMsec(e)>=this.__getMsec(i))&&(!s||this.__getMsec(e)<=this.__getMsec(s))}_onClearButtonClick(e){e.stopPropagation(),super._onClearButtonClick(e),this.opened&&this._scroller.requestContentUpdate()}_onHostClick(e){let i=e.composedPath();(i.includes(this._labelNode)||i.includes(this._inputContainer))&&super._onHostClick(e)}_onChange(e){e.stopPropagation()}};var Ss=class extends Kf(I(K(O(A(S))))){static get is(){return"vaadin-time-picker"}static get styles(){return[ze,Uf]}render(){return w`
      <div class="vaadin-time-picker-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" @click="${this.focus}"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          .readonly="${this.readonly}"
          .disabled="${this.disabled}"
          .invalid="${this.invalid}"
          theme="${re(this._theme)}"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
          <div id="toggleButton" part="field-button toggle-button" slot="suffix" aria-hidden="true"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>

      <vaadin-time-picker-overlay
        id="overlay"
        dir="ltr"
        .owner="${this}"
        .opened="${this._overlayOpened}"
        theme="${re(this._theme)}"
        .positionTarget="${this._inputContainer}"
        no-vertical-overlap
        exportparts="overlay, content"
      >
        <slot name="overlay"></slot>
      </vaadin-time-picker-overlay>
    `}};E(Ss);var Gf=C`
  .vaadin-date-time-picker-container {
    width: calc(var(--vaadin-field-default-width, 12em) * 2 + var(--vaadin-date-time-picker-gap, var(--vaadin-gap-s)));
  }

  [part='input-fields'] {
    display: flex;
    gap: var(--vaadin-date-time-picker-gap, var(--vaadin-gap-s));
  }

  [part='input-fields'] ::slotted([slot='date-picker']) {
    min-width: 0;
    flex: 1 1 auto;
  }

  [part='input-fields'] ::slotted([slot='time-picker']) {
    min-width: 0;
    flex: 1 1.65 auto;
  }
`;var Mx=Object.keys($o),Ix=Object.keys(Vo),Ax={...$o,...Vo},zo=class extends ie{constructor(t,e){super(t,`${e}-picker`,`vaadin-${e}-picker`,{initializer:(i,s)=>{let n=`__${e}Picker`;s[n]=i}})}},Zf=r=>class extends Et(dt(Me(Fe(r)))){static get properties(){return{name:{type:String},value:{type:String,notify:!0,value:"",observer:"__valueChanged",sync:!0},min:{type:String,observer:"__minChanged",sync:!0},max:{type:String,observer:"__maxChanged",sync:!0},__minDateTime:{type:Date,value:"",sync:!0},__maxDateTime:{type:Date,value:"",sync:!0},datePlaceholder:{type:String,sync:!0},timePlaceholder:{type:String,sync:!0},step:{type:Number,sync:!0},initialPosition:{type:String,sync:!0},defaultTime:{type:String,sync:!0},showWeekNumbers:{type:Boolean,value:!1,sync:!0},dateMetadataProvider:{type:Function,sync:!0},autoOpenDisabled:{type:Boolean,sync:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},autofocus:{type:Boolean},__selectedDateTime:{type:Date,sync:!0},__datePicker:{type:Object,sync:!0,observer:"__datePickerChanged"},__timePicker:{type:Object,sync:!0,observer:"__timePickerChanged"}}}static get observers(){return["__selectedDateTimeChanged(__selectedDateTime)","__datePlaceholderChanged(datePlaceholder, __datePicker)","__timePlaceholderChanged(timePlaceholder, __timePicker)","__stepChanged(step, __timePicker)","__initialPositionChanged(initialPosition, __datePicker)","__showWeekNumbersChanged(showWeekNumbers, __datePicker)","__dateMetadataProviderChanged(dateMetadataProvider, __datePicker)","__requiredChanged(required, __datePicker, __timePicker)","__invalidChanged(invalid, __datePicker, __timePicker)","__disabledChanged(disabled, __datePicker, __timePicker)","__readonlyChanged(readonly, __datePicker, __timePicker)","__i18nChanged(__effectiveI18n, __datePicker, __timePicker)","__autoOpenDisabledChanged(autoOpenDisabled, __datePicker, __timePicker)","__themeChanged(_theme, __datePicker, __timePicker)","__pickersChanged(__datePicker, __timePicker)","__labelOrAccessibleNameChanged(label, accessibleName, __effectiveI18n, __datePicker, __timePicker)"]}static get defaultI18n(){return Ax}constructor(){super(),this.__defaultDateMinMaxValue=void 0,this.__defaultTimeMinValue="00:00:00.000",this.__defaultTimeMaxValue="23:59:59.999",this.__onGlobalClick=this.__onGlobalClick.bind(this),this.__changeEventHandler=this.__changeEventHandler.bind(this),this.__valueChangedEventHandler=this.__valueChangedEventHandler.bind(this),this.__openedChangedEventHandler=this.__openedChangedEventHandler.bind(this)}get i18n(){return super.i18n}set i18n(e){super.i18n=e}get __pickers(){return[this.__datePicker,this.__timePicker]}get __filledPickers(){return this.__pickers.filter(e=>e.value||e.__unparsableValue)}get __formattedValue(){let e=this.__pickers.map(i=>i.value);return e.every(Boolean)?e.join("T"):""}get __unparsableValue(){return this.__filledPickers.length>0&&!this.__pickers.every(e=>e.value)?this.__pickers.map(e=>e.value||e.__unparsableValue).join("T"):""}ready(){super.ready(),this._datePickerController=new zo(this,"date"),this.addController(this._datePickerController),this._timePickerController=new zo(this,"time"),this.addController(this._timePickerController),this.autofocus&&!this.disabled&&window.requestAnimationFrame(()=>this.focus()),this.setAttribute("role","group"),this._tooltipController=new ue(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setShouldShow(e=>e.__datePicker&&!e.__datePicker.opened&&e.__timePicker&&!e.__timePicker.opened),this.ariaTarget=this}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.__onGlobalClick,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.__onGlobalClick,!0)}focus(e){this.__datePicker&&this.__datePicker.focus(e)}__onGlobalClick(e){if(!(this.__datePicker.opened||this.__timePicker.opened))return;e.composedPath().every(n=>![this.__datePicker,this.__datePicker.$.overlay,this.__timePicker,this.__timePicker.$.overlay].includes(n))&&(this.__outsideClickInProgress=!0,setTimeout(()=>{this.__outsideClickInProgress=!1}))}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this.__commitPendingValueChange()}_shouldRemoveFocus(e){let i=e.relatedTarget;return!(this.__datePicker.opened||this.__timePicker.opened||this.__datePicker.contains(i)||this.__timePicker.contains(i))}__syncI18n(e,i,s){let n={};s.forEach(a=>{i?.hasOwnProperty(a)&&(n[a]=i[a])}),e.i18n=n}__changeEventHandler(e){if(e.stopPropagation(),e.target===this.__datePicker&&this.__datePicker.value&&!(this.__timePicker.value||this.__timePicker.__unparsableValue)){let n=this.__normalizeDefaultTime();n&&(this.__timePicker.value=n)}let i=this.invalid,s=this.__filledPickers;s.length===1&&s[0].checkValidity()&&!i||this.__hasPendingValueChange&&this.__commitPendingValueChange()}__openedChangedEventHandler(){let e=this.__datePicker.opened||this.__timePicker.opened;this.style.pointerEvents=e?"auto":"",!e&&this.__outsideClickInProgress&&this.__commitPendingValueChange(),!e&&!this.contains(this.getRootNode().activeElement)&&super._setFocused(!1)}__addInputListeners(e){e.addEventListener("change",this.__changeEventHandler),e.addEventListener("unparsable-change",this.__changeEventHandler),e.addEventListener("value-changed",this.__valueChangedEventHandler),e.addEventListener("opened-changed",this.__openedChangedEventHandler)}__removeInputListeners(e){e.removeEventListener("change",this.__changeEventHandler),e.removeEventListener("unparsable-change",this.__changeEventHandler),e.removeEventListener("value-changed",this.__valueChangedEventHandler),e.removeEventListener("opened-changed",this.__openedChangedEventHandler)}__isDefaultPicker(e,i){let s=this[`_${i}PickerController`];return s&&e===s.defaultNode}__datePickerChanged(e,i){e&&(i&&(this.__removeInputListeners(i),i.remove()),this.__addInputListeners(e),this.__isDefaultPicker(e,"date")||(this.datePlaceholder=e.placeholder,this.initialPosition=e.initialPosition,this.showWeekNumbers=e.showWeekNumbers,this.dateMetadataProvider=e.dateMetadataProvider),e.min=this.__formatDateISO(this.__minDateTime,this.__defaultDateMinMaxValue),e.max=this.__formatDateISO(this.__maxDateTime,this.__defaultDateMinMaxValue),e.manualValidation=!0)}__timePickerChanged(e,i){e&&(i&&(this.__removeInputListeners(i),i.remove()),this.__addInputListeners(e),this.__isDefaultPicker(e,"time")||(this.timePlaceholder=e.placeholder,this.step=e.step),this.__updateTimePickerMinMax(),e.manualValidation=!0)}__updateTimePickerMinMax(){if(this.__timePicker&&this.__datePicker){let e=this.__parseDate(this.__datePicker.value),i=Ee(this.__minDateTime,this.__maxDateTime,ys);this.__minDateTime&&Ee(e,this.__minDateTime,ys)||i?this.__timePicker.min=this.__dateToIsoTimeString(this.__minDateTime):this.__timePicker.min=this.__defaultTimeMinValue,this.__maxDateTime&&Ee(e,this.__maxDateTime,ys)||i?this.__timePicker.max=this.__dateToIsoTimeString(this.__maxDateTime):this.__timePicker.max=this.__defaultTimeMaxValue}}__i18nChanged(e,i,s){i&&this.__isDefaultPicker(i,"date")&&this.__syncI18n(i,e,Mx),s&&this.__isDefaultPicker(s,"time")&&this.__syncI18n(s,e,Ix)}__labelOrAccessibleNameChanged(e,i,s,n,a){let d=i||e||"";n&&(n.accessibleName=`${d} ${s.dateLabel||""}`.trim()),a&&(a.accessibleName=`${d} ${s.timeLabel||""}`.trim())}__datePlaceholderChanged(e,i){i&&(i.placeholder=e)}__timePlaceholderChanged(e,i){i&&(i.placeholder=e)}__stepChanged(e,i){i&&i.step!==e&&(i.step=e)}__initialPositionChanged(e,i){i&&(i.initialPosition=e)}__showWeekNumbersChanged(e,i){i&&(i.showWeekNumbers=e)}__dateMetadataProviderChanged(e,i){i&&(i.dateMetadataProvider=e)}__invalidChanged(e,i,s){i&&(i.invalid=e),s&&(s.invalid=e)}__requiredChanged(e,i,s){i&&(i.required=e),s&&(s.required=e),this.__oldRequired&&!e&&this._requestValidation(),this.__oldRequired=e}__disabledChanged(e,i,s){i&&(i.disabled=e),s&&(s.disabled=e)}__readonlyChanged(e,i,s){i&&(i.readonly=e),s&&(s.readonly=e)}__parseDate(e){return kf(e)}__formatDateISO(e,i){return e?Tf(e):i}__parseDateTime(e){let[i,s]=e.split("T");if(!(i&&s))return;let n=this.__parseDate(i);if(!n)return;let a=Dt(s);if(a)return n.setUTCHours(parseInt(a.hours)),n.setUTCMinutes(parseInt(a.minutes||0)),n.setUTCSeconds(parseInt(a.seconds||0)),n.setUTCMilliseconds(parseInt(a.milliseconds||0)),n}__formatDateTime(e){if(!e)return"";let i=this.__formatDateISO(e,""),s=this.__dateToIsoTimeString(e);return`${i}T${s}`}__formatTimeISO(e){return bi(Cs(e,this.step))}__dateToIsoTimeString(e){return this.__formatTimeISO({hours:e.getUTCHours(),minutes:e.getUTCMinutes(),seconds:e.getUTCSeconds(),milliseconds:e.getUTCMilliseconds()})}__normalizeDefaultTime(){if(!this.defaultTime)return"";let e=Dt(this.defaultTime);return e?this.__formatTimeISO(e):(ai(`<vaadin-date-time-picker> Ignored "defaultTime" that is not a valid ISO 8601 time: ${this.defaultTime}`),"")}clearCache(){this.__datePicker?.clearCache()}checkValidity(){let e=this.__pickers.some(n=>!n.checkValidity()),i=this.__filledPickers.length===1,s=this.required&&this.__pickers.some(n=>!n.value);return!e&&!s&&!i}__commitPendingValueChange(){this._requestValidation(),this.__committedValue!==this.value?this.dispatchEvent(new CustomEvent("change",{bubbles:!0})):this.__committedUnparsableValue!==this.__unparsableValue&&this.dispatchEvent(new CustomEvent("unparsable-change")),this.__committedValue=this.value,this.__committedUnparsableValue=this.__unparsableValue}get __hasPendingValueChange(){return this.__committedValue!==this.value||this.__committedUnparsableValue!==this.__unparsableValue}__dateTimeEquals(e,i){return Ee(e,i,ys)?e.getUTCHours()===i.getUTCHours()&&e.getUTCMinutes()===i.getUTCMinutes()&&e.getUTCSeconds()===i.getUTCSeconds()&&e.getUTCMilliseconds()===i.getUTCMilliseconds():!1}__handleDateTimeChange(e,i,s,n){if(!s){this[e]="",this[i]="";return}let a=this.__parseDateTime(s);if(!a){this[e]=n;return}this.__dateTimeEquals(this[i],a)||(this[i]=a)}__valueChanged(e,i){this.__handleDateTimeChange("value","__selectedDateTime",e,i),this.__keepCommittedValue||(this.__committedValue=e,this.__committedUnparsableValue=""),this.toggleAttribute("has-value",!!e),this.__updateTimePickerMinMax()}__dispatchChange(){this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}__minChanged(e,i){this.__handleDateTimeChange("min","__minDateTime",e,i),this.__datePicker&&(this.__datePicker.min=this.__formatDateISO(this.__minDateTime,this.__defaultDateMinMaxValue)),this.__updateTimePickerMinMax(),this.__datePicker&&this.__timePicker&&this.value&&this._requestValidation()}__maxChanged(e,i){this.__handleDateTimeChange("max","__maxDateTime",e,i),this.__datePicker&&(this.__datePicker.max=this.__formatDateISO(this.__maxDateTime,this.__defaultDateMinMaxValue)),this.__updateTimePickerMinMax(),this.__datePicker&&this.__timePicker&&this.value&&this._requestValidation()}__selectedDateTimeChanged(e){let i=this.__formatDateTime(e);if(this.value!==i&&(this.value=i),!!(this.__datePicker&&this.__datePicker.$)&&!this.__ignoreInputValueChange){this.__ignoreInputValueChange=!0;let[n,a]=this.value.split("T");this.__datePicker.value=n||"",this.__timePicker.value=a||"",this.__ignoreInputValueChange=!1}}__valueChangedEventHandler(){this.__ignoreInputValueChange||(this.__ignoreInputValueChange=!0,this.__keepCommittedValue=!0,this.__updateTimePickerMinMax(),this.value=this.__formattedValue,this.__keepCommittedValue=!1,this.__ignoreInputValueChange=!1)}__autoOpenDisabledChanged(e,i,s){i&&(i.autoOpenDisabled=e),s&&(s.autoOpenDisabled=e)}__themeChanged(e,i,s){!i||!s||[i,s].forEach(n=>Y(n,"theme",e))}__pickersChanged(e,i){!e||!i||this.__isDefaultPicker(e,"date")===this.__isDefaultPicker(i,"time")&&(e.value?this.__valueChangedEventHandler():this.value&&(this.__selectedDateTimeChanged(this.__selectedDateTime),(this.min&&this.__minDateTime||this.max&&this.__maxDateTime)&&this._requestValidation()))}};var ks=class extends Zf(I(K(O(A(S))))){static get is(){return"vaadin-date-time-picker"}static get styles(){return[ze,Gf]}render(){return w`
      <div class="vaadin-date-time-picker-container">
        <div part="label" @click="${this.focus}">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true"></span>
        </div>

        <div part="input-fields">
          <slot name="date-picker" id="dateSlot"></slot>
          <slot name="time-picker" id="timeSlot"></slot>
        </div>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <slot name="tooltip"></slot>
    `}};E(ks);var Px=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},Xf=class extends ks{static getLocalizedISOString(r,t,e=!1){if(!r||Number.isNaN(r.getTime()))return;let i="YYYY-MM-DDTHH:mm",s=6e4;t!==void 0&&t%60!=0&&(i=t%1==0?"YYYY-MM-DDTHH:mm:ss":"YYYY-MM-DDTHH:mm:ss.sss",s=t%1==0?1e3:1);let n=e?new Date(Math.ceil(r.getTime()/s)*s):r;return new Date(n.getTime()-6e4*n.getTimezoneOffset()).toISOString().slice(0,i.length)}static getStep(r){var t;let e=((t=r?.momentJsFormat)!=null?t:"").replace(/\[[^\]]*\]/gu,""),i=e.replace(/LTS/gu,"");return r?.fractionalSecondDigits||/[Sx]/u.test(i)?.001:r?.second||r?.timeStyle&&r.timeStyle!=="short"||e.includes("LTS")||/[sX]/u.test(i)?1:void 0}connectedCallback(){super.connectedCallback(),this._stopLanguageSync=Ar(()=>{this.i18n=Object.assign(Object.assign({},Fo()),Bo())})}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this._stopLanguageSync)==null||r.call(this)}};Xf=Px([q("or-vaadin-date-time-picker")],Xf);var Lx=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a},Jf=class extends Ss{connectedCallback(){super.connectedCallback(),this._stopLanguageSync=Ar(()=>{this.i18n=Bo()})}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this._stopLanguageSync)==null||r.call(this)}};Jf=Lx([q("or-vaadin-time-picker")],Jf);var ht;(function(r){r.BUTTON="button",r.BUTTON_TOGGLE="button-toggle",r.BUTTON_MOMENTARY="button-momentary",r.CHECKBOX="checkbox",r.CHECKBOX_LIST="checkbox-list",r.COLOUR="color",r.DATE="date",r.DATETIME="datetime-local",r.EMAIL="email",r.JSON="json",r.JSON_OBJECT="json-object",r.MONTH="month",r.NUMBER="number",r.BIG_INT="big-int",r.PASSWORD="password",r.RADIO="radio",r.SWITCH="switch",r.RANGE="range",r.TELEPHONE="tel",r.TEXT="text",r.TEXTAREA="textarea",r.TIME="time",r.URL="url",r.WEEK="week",r.SELECT="select",r.LIST="list",r.CRON="cron",r.DURATION="duration",r.DURATION_TIME="duration-time",r.DURATION_PERIOD="duration-period"})(ht||(ht={}));var Es=["MO","TU","WE","TH","FR","SA","SU"],Te=(function(){function r(t,e){if(e===0)throw new Error("Can't create weekday with n == 0");this.weekday=t,this.n=e}return r.fromStr=function(t){return new r(Es.indexOf(t))},r.prototype.nth=function(t){return this.n===t?this:new r(this.weekday,t)},r.prototype.equals=function(t){return this.weekday===t.weekday&&this.n===t.n},r.prototype.toString=function(){var t=Es[this.weekday];return this.n&&(t=(this.n>0?"+":"")+String(this.n)+t),t},r.prototype.getJsWeekday=function(){return this.weekday===6?0:this.weekday+1},r})();var fe=function(r){return r!=null},it=function(r){return typeof r=="number"},cd=function(r){return typeof r=="string"&&Es.includes(r)},Re=Array.isArray,ut=function(r,t){t===void 0&&(t=r),arguments.length===1&&(t=r,r=0);for(var e=[],i=r;i<t;i++)e.push(i);return e};var G=function(r,t){var e=0,i=[];if(Re(r))for(;e<t;e++)i[e]=[].concat(r);else for(;e<t;e++)i[e]=r;return i},Qf=function(r){return Re(r)?r:[r]};function Ui(r,t,e){e===void 0&&(e=" ");var i=String(r);return t=t>>0,i.length>t?String(i):(t=t-i.length,t>e.length&&(e+=G(e,t/e.length)),e.slice(0,t)+String(i))}var ep=function(r,t,e){var i=r.split(t);return e?i.slice(0,e).concat([i.slice(e).join(t)]):i},Ye=function(r,t){var e=r%t;return e*t<0?e+t:e},Yo=function(r,t){return{div:Math.floor(r/t),mod:Ye(r,t)}},rt=function(r){return!fe(r)||r.length===0},Ce=function(r){return!rt(r)},Z=function(r,t){return Ce(r)&&r.indexOf(t)!==-1};var Mt=function(r,t,e,i,s,n){return i===void 0&&(i=0),s===void 0&&(s=0),n===void 0&&(n=0),new Date(Date.UTC(r,t-1,e,i,s,n))},Rx=[31,28,31,30,31,30,31,31,30,31,30,31],ip=1e3*60*60*24,Uo=9999,rp=Mt(1970,1,1),Nx=[6,0,1,2,3,4,5];var Pr=function(r){return r%4===0&&r%100!==0||r%400===0},fd=function(r){return r instanceof Date},ji=function(r){return fd(r)&&!isNaN(r.getTime())};var $x=function(r,t){var e=r.getTime(),i=t.getTime(),s=e-i;return Math.round(s/ip)},Ts=function(r){return $x(r,rp)},jo=function(r){return new Date(rp.getTime()+r*ip)},Fx=function(r){var t=r.getUTCMonth();return t===1&&Pr(r.getUTCFullYear())?29:Rx[t]},Jt=function(r){return Nx[r.getUTCDay()]},pd=function(r,t){var e=Mt(r,t+1,1);return[Jt(e),Fx(e)]},Ho=function(r,t){return t=t||r,new Date(Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()))},Wo=function(r){var t=new Date(r.getTime());return t},md=function(r){for(var t=[],e=0;e<r.length;e++)t.push(Wo(r[e]));return t},Qt=function(r){r.sort(function(t,e){return t.getTime()-e.getTime()})},Lr=function(r,t){t===void 0&&(t=!0);var e=new Date(r);return[Ui(e.getUTCFullYear().toString(),4,"0"),Ui(e.getUTCMonth()+1,2,"0"),Ui(e.getUTCDate(),2,"0"),"T",Ui(e.getUTCHours(),2,"0"),Ui(e.getUTCMinutes(),2,"0"),Ui(e.getUTCSeconds(),2,"0"),t?"Z":""].join("")},Os=function(r){var t=/^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/,e=t.exec(r);if(!e)throw new Error("Invalid UNTIL value: ".concat(r));return new Date(Date.UTC(parseInt(e[1],10),parseInt(e[2],10)-1,parseInt(e[3],10),parseInt(e[5],10)||0,parseInt(e[6],10)||0,parseInt(e[7],10)||0))},tp=function(r,t){var e=r.toLocaleString("sv-SE",{timeZone:t});return e.replace(" ","T")+"Z"},sp=function(r,t){var e=Intl.DateTimeFormat().resolvedOptions().timeZone,i=new Date(tp(r,e)),s=new Date(tp(r,t??"UTC")),n=s.getTime()-i.getTime();return new Date(r.getTime()-n)};var Bx=(function(){function r(t,e){this.minDate=null,this.maxDate=null,this._result=[],this.total=0,this.method=t,this.args=e,t==="between"?(this.maxDate=e.inc?e.before:new Date(e.before.getTime()-1),this.minDate=e.inc?e.after:new Date(e.after.getTime()+1)):t==="before"?this.maxDate=e.inc?e.dt:new Date(e.dt.getTime()-1):t==="after"&&(this.minDate=e.inc?e.dt:new Date(e.dt.getTime()+1))}return r.prototype.accept=function(t){++this.total;var e=this.minDate&&t<this.minDate,i=this.maxDate&&t>this.maxDate;if(this.method==="between"){if(e)return!0;if(i)return!1}else if(this.method==="before"){if(i)return!1}else if(this.method==="after")return e?!0:(this.add(t),!1);return this.add(t)},r.prototype.add=function(t){return this._result.push(t),!0},r.prototype.getValue=function(){var t=this._result;switch(this.method){case"all":case"between":return t;default:return t.length?t[t.length-1]:null}},r.prototype.clone=function(){return new r(this.method,this.args)},r})(),ei=Bx;var _d=function(r,t){return _d=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,i){e.__proto__=i}||function(e,i){for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s])},_d(r,t)};function Rr(r,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");_d(r,t);function e(){this.constructor=r}r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}var Ne=function(){return Ne=Object.assign||function(t){for(var e,i=1,s=arguments.length;i<s;i++){e=arguments[i];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t},Ne.apply(this,arguments)};function M(r,t,e){if(e||arguments.length===2)for(var i=0,s=t.length,n;i<s;i++)(n||!(i in t))&&(n||(n=Array.prototype.slice.call(t,0,i)),n[i]=t[i]);return r.concat(n||Array.prototype.slice.call(t))}var Vx=(function(r){Rr(t,r);function t(e,i,s){var n=r.call(this,e,i)||this;return n.iterator=s,n}return t.prototype.add=function(e){return this.iterator(e,this._result.length)?(this._result.push(e),!0):!1},t})(ei),gd=Vx;var zx={dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],tokens:{SKIP:/^[ \r\n\t]+|^\.$/,number:/^[1-9][0-9]*/,numberAsText:/^(one|two|three)/i,every:/^every/i,"day(s)":/^days?/i,"weekday(s)":/^weekdays?/i,"week(s)":/^weeks?/i,"hour(s)":/^hours?/i,"minute(s)":/^minutes?/i,"month(s)":/^months?/i,"year(s)":/^years?/i,on:/^(on|in)/i,at:/^(at)/i,the:/^the/i,first:/^first/i,second:/^second/i,third:/^third/i,nth:/^([1-9][0-9]*)(\.|th|nd|rd|st)/i,last:/^last/i,for:/^for/i,"time(s)":/^times?/i,until:/^(un)?til/i,monday:/^mo(n(day)?)?/i,tuesday:/^tu(e(s(day)?)?)?/i,wednesday:/^we(d(n(esday)?)?)?/i,thursday:/^th(u(r(sday)?)?)?/i,friday:/^fr(i(day)?)?/i,saturday:/^sa(t(urday)?)?/i,sunday:/^su(n(day)?)?/i,january:/^jan(uary)?/i,february:/^feb(ruary)?/i,march:/^mar(ch)?/i,april:/^apr(il)?/i,may:/^may/i,june:/^june?/i,july:/^july?/i,august:/^aug(ust)?/i,september:/^sep(t(ember)?)?/i,october:/^oct(ober)?/i,november:/^nov(ember)?/i,december:/^dec(ember)?/i,comma:/^(,\s*|(and|or)\s*)+/i}},Hi=zx;var np=function(r,t){return r.indexOf(t)!==-1},Yx=function(r){return r.toString()},Ux=function(r,t,e){return"".concat(t," ").concat(e,", ").concat(r)},jx=(function(){function r(t,e,i,s){if(e===void 0&&(e=Yx),i===void 0&&(i=Hi),s===void 0&&(s=Ux),this.text=[],this.language=i||Hi,this.gettext=e,this.dateFormatter=s,this.rrule=t,this.options=t.options,this.origOptions=t.origOptions,this.origOptions.bymonthday){var n=[].concat(this.options.bymonthday),a=[].concat(this.options.bynmonthday);n.sort(function(m,_){return m-_}),a.sort(function(m,_){return _-m}),this.bymonthday=n.concat(a),this.bymonthday.length||(this.bymonthday=null)}if(fe(this.origOptions.byweekday)){var d=Re(this.origOptions.byweekday)?this.origOptions.byweekday:[this.origOptions.byweekday],c=String(d);this.byweekday={allWeeks:d.filter(function(m){return!m.n}),someWeeks:d.filter(function(m){return!!m.n}),isWeekdays:c.indexOf("MO")!==-1&&c.indexOf("TU")!==-1&&c.indexOf("WE")!==-1&&c.indexOf("TH")!==-1&&c.indexOf("FR")!==-1&&c.indexOf("SA")===-1&&c.indexOf("SU")===-1,isEveryDay:c.indexOf("MO")!==-1&&c.indexOf("TU")!==-1&&c.indexOf("WE")!==-1&&c.indexOf("TH")!==-1&&c.indexOf("FR")!==-1&&c.indexOf("SA")!==-1&&c.indexOf("SU")!==-1};var f=function(m,_){return m.weekday-_.weekday};this.byweekday.allWeeks.sort(f),this.byweekday.someWeeks.sort(f),this.byweekday.allWeeks.length||(this.byweekday.allWeeks=null),this.byweekday.someWeeks.length||(this.byweekday.someWeeks=null)}else this.byweekday=null}return r.isFullyConvertible=function(t){var e=!0;if(!(t.options.freq in r.IMPLEMENTED)||t.origOptions.until&&t.origOptions.count)return!1;for(var i in t.origOptions){if(np(["dtstart","tzid","wkst","freq"],i))return!0;if(!np(r.IMPLEMENTED[t.options.freq],i))return!1}return e},r.prototype.isFullyConvertible=function(){return r.isFullyConvertible(this.rrule)},r.prototype.toString=function(){var t=this.gettext;if(!(this.options.freq in r.IMPLEMENTED))return t("RRule error: Unable to fully convert this rrule to text");if(this.text=[t("every")],this[L.FREQUENCIES[this.options.freq]](),this.options.until){this.add(t("until"));var e=this.options.until;this.add(this.dateFormatter(e.getUTCFullYear(),this.language.monthNames[e.getUTCMonth()],e.getUTCDate()))}else this.options.count&&this.add(t("for")).add(this.options.count.toString()).add(this.plural(this.options.count)?t("times"):t("time"));return this.isFullyConvertible()||this.add(t("(~ approximate)")),this.text.join("")},r.prototype.HOURLY=function(){var t=this.gettext;this.options.interval!==1&&this.add(this.options.interval.toString()),this.add(this.plural(this.options.interval)?t("hours"):t("hour"))},r.prototype.MINUTELY=function(){var t=this.gettext;this.options.interval!==1&&this.add(this.options.interval.toString()),this.add(this.plural(this.options.interval)?t("minutes"):t("minute"))},r.prototype.DAILY=function(){var t=this.gettext;this.options.interval!==1&&this.add(this.options.interval.toString()),this.byweekday&&this.byweekday.isWeekdays?this.add(this.plural(this.options.interval)?t("weekdays"):t("weekday")):this.add(this.plural(this.options.interval)?t("days"):t("day")),this.origOptions.bymonth&&(this.add(t("in")),this._bymonth()),this.bymonthday?this._bymonthday():this.byweekday?this._byweekday():this.origOptions.byhour&&this._byhour()},r.prototype.WEEKLY=function(){var t=this.gettext;this.options.interval!==1&&this.add(this.options.interval.toString()).add(this.plural(this.options.interval)?t("weeks"):t("week")),this.byweekday&&this.byweekday.isWeekdays?this.options.interval===1?this.add(this.plural(this.options.interval)?t("weekdays"):t("weekday")):this.add(t("on")).add(t("weekdays")):this.byweekday&&this.byweekday.isEveryDay?this.add(this.plural(this.options.interval)?t("days"):t("day")):(this.options.interval===1&&this.add(t("week")),this.origOptions.bymonth&&(this.add(t("in")),this._bymonth()),this.bymonthday?this._bymonthday():this.byweekday&&this._byweekday(),this.origOptions.byhour&&this._byhour())},r.prototype.MONTHLY=function(){var t=this.gettext;this.origOptions.bymonth?(this.options.interval!==1&&(this.add(this.options.interval.toString()).add(t("months")),this.plural(this.options.interval)&&this.add(t("in"))),this._bymonth()):(this.options.interval!==1&&this.add(this.options.interval.toString()),this.add(this.plural(this.options.interval)?t("months"):t("month"))),this.bymonthday?this._bymonthday():this.byweekday&&this.byweekday.isWeekdays?this.add(t("on")).add(t("weekdays")):this.byweekday&&this._byweekday()},r.prototype.YEARLY=function(){var t=this.gettext;this.origOptions.bymonth?(this.options.interval!==1&&(this.add(this.options.interval.toString()),this.add(t("years"))),this._bymonth()):(this.options.interval!==1&&this.add(this.options.interval.toString()),this.add(this.plural(this.options.interval)?t("years"):t("year"))),this.bymonthday?this._bymonthday():this.byweekday&&this._byweekday(),this.options.byyearday&&this.add(t("on the")).add(this.list(this.options.byyearday,this.nth,t("and"))).add(t("day")),this.options.byweekno&&this.add(t("in")).add(this.plural(this.options.byweekno.length)?t("weeks"):t("week")).add(this.list(this.options.byweekno,void 0,t("and")))},r.prototype._bymonthday=function(){var t=this.gettext;this.byweekday&&this.byweekday.allWeeks?this.add(t("on")).add(this.list(this.byweekday.allWeeks,this.weekdaytext,t("or"))).add(t("the")).add(this.list(this.bymonthday,this.nth,t("or"))):this.add(t("on the")).add(this.list(this.bymonthday,this.nth,t("and")))},r.prototype._byweekday=function(){var t=this.gettext;this.byweekday.allWeeks&&!this.byweekday.isWeekdays&&this.add(t("on")).add(this.list(this.byweekday.allWeeks,this.weekdaytext)),this.byweekday.someWeeks&&(this.byweekday.allWeeks&&this.add(t("and")),this.add(t("on the")).add(this.list(this.byweekday.someWeeks,this.weekdaytext,t("and"))))},r.prototype._byhour=function(){var t=this.gettext;this.add(t("at")).add(this.list(this.origOptions.byhour,void 0,t("and")))},r.prototype._bymonth=function(){this.add(this.list(this.options.bymonth,this.monthtext,this.gettext("and")))},r.prototype.nth=function(t){t=parseInt(t.toString(),10);var e,i=this.gettext;if(t===-1)return i("last");var s=Math.abs(t);switch(s){case 1:case 21:case 31:e=s+i("st");break;case 2:case 22:e=s+i("nd");break;case 3:case 23:e=s+i("rd");break;default:e=s+i("th")}return t<0?e+" "+i("last"):e},r.prototype.monthtext=function(t){return this.language.monthNames[t-1]},r.prototype.weekdaytext=function(t){var e=it(t)?(t+1)%7:t.getJsWeekday();return(t.n?this.nth(t.n)+" ":"")+this.language.dayNames[e]},r.prototype.plural=function(t){return t%100!==1},r.prototype.add=function(t){return this.text.push(" "),this.text.push(t),this},r.prototype.list=function(t,e,i,s){var n=this;s===void 0&&(s=","),Re(t)||(t=[t]);var a=function(c,f,m){for(var _="",v=0;v<c.length;v++)v!==0&&(v===c.length-1?_+=" "+m+" ":_+=f+" "),_+=c[v];return _};e=e||function(c){return c.toString()};var d=function(c){return e&&e.call(n,c)};return i?a(t.map(d),s,i):t.map(d).join(s+" ")},r})(),It=jx;var Hx=(function(){function r(t){this.done=!0,this.rules=t}return r.prototype.start=function(t){return this.text=t,this.done=!1,this.nextSymbol()},r.prototype.isDone=function(){return this.done&&this.symbol===null},r.prototype.nextSymbol=function(){var t,e;this.symbol=null,this.value=null;do{if(this.done)return!1;var i=void 0;t=null;for(var s in this.rules){i=this.rules[s];var n=i.exec(this.text);n&&(t===null||n[0].length>t[0].length)&&(t=n,e=s)}if(t!=null&&(this.text=this.text.substr(t[0].length),this.text===""&&(this.done=!0)),t==null){this.done=!0,this.symbol=null,this.value=null;return}}while(e==="SKIP");return this.symbol=e,this.value=t,!0},r.prototype.accept=function(t){if(this.symbol===t){if(this.value){var e=this.value;return this.nextSymbol(),e}return this.nextSymbol(),!0}return!1},r.prototype.acceptNumber=function(){return this.accept("number")},r.prototype.expect=function(t){if(this.accept(t))return!0;throw new Error("expected "+t+" but found "+this.symbol)},r})();function Ds(r,t){t===void 0&&(t=Hi);var e={},i=new Hx(t.tokens);if(!i.start(r))return null;return s(),e;function s(){i.expect("every");var v=i.acceptNumber();if(v&&(e.interval=parseInt(v[0],10)),i.isDone())throw new Error("Unexpected end");switch(i.symbol){case"day(s)":e.freq=L.DAILY,i.nextSymbol()&&(a(),_());break;case"weekday(s)":e.freq=L.WEEKLY,e.byweekday=[L.MO,L.TU,L.WE,L.TH,L.FR],i.nextSymbol(),a(),_();break;case"week(s)":e.freq=L.WEEKLY,i.nextSymbol()&&(n(),a(),_());break;case"hour(s)":e.freq=L.HOURLY,i.nextSymbol()&&(n(),_());break;case"minute(s)":e.freq=L.MINUTELY,i.nextSymbol()&&(n(),_());break;case"month(s)":e.freq=L.MONTHLY,i.nextSymbol()&&(n(),_());break;case"year(s)":e.freq=L.YEARLY,i.nextSymbol()&&(n(),_());break;case"monday":case"tuesday":case"wednesday":case"thursday":case"friday":case"saturday":case"sunday":e.freq=L.WEEKLY;var b=i.symbol.substr(0,2).toUpperCase();if(e.byweekday=[L[b]],!i.nextSymbol())return;for(;i.accept("comma");){if(i.isDone())throw new Error("Unexpected end");var y=c();if(!y)throw new Error("Unexpected symbol "+i.symbol+", expected weekday");e.byweekday.push(L[y]),i.nextSymbol()}a(),m(),_();break;case"january":case"february":case"march":case"april":case"may":case"june":case"july":case"august":case"september":case"october":case"november":case"december":if(e.freq=L.YEARLY,e.bymonth=[d()],!i.nextSymbol())return;for(;i.accept("comma");){if(i.isDone())throw new Error("Unexpected end");var T=d();if(!T)throw new Error("Unexpected symbol "+i.symbol+", expected month");e.bymonth.push(T),i.nextSymbol()}n(),_();break;default:throw new Error("Unknown symbol")}}function n(){var v=i.accept("on"),b=i.accept("the");if(v||b)do{var y=f(),T=c(),N=d();if(y)T?(i.nextSymbol(),e.byweekday||(e.byweekday=[]),e.byweekday.push(L[T].nth(y))):(e.bymonthday||(e.bymonthday=[]),e.bymonthday.push(y),i.accept("day(s)"));else if(T)i.nextSymbol(),e.byweekday||(e.byweekday=[]),e.byweekday.push(L[T]);else if(i.symbol==="weekday(s)")i.nextSymbol(),e.byweekday||(e.byweekday=[L.MO,L.TU,L.WE,L.TH,L.FR]);else if(i.symbol==="week(s)"){i.nextSymbol();var $=i.acceptNumber();if(!$)throw new Error("Unexpected symbol "+i.symbol+", expected week number");for(e.byweekno=[parseInt($[0],10)];i.accept("comma");){if($=i.acceptNumber(),!$)throw new Error("Unexpected symbol "+i.symbol+"; expected monthday");e.byweekno.push(parseInt($[0],10))}}else if(N)i.nextSymbol(),e.bymonth||(e.bymonth=[]),e.bymonth.push(N);else return}while(i.accept("comma")||i.accept("the")||i.accept("on"))}function a(){var v=i.accept("at");if(v)do{var b=i.acceptNumber();if(!b)throw new Error("Unexpected symbol "+i.symbol+", expected hour");for(e.byhour=[parseInt(b[0],10)];i.accept("comma");){if(b=i.acceptNumber(),!b)throw new Error("Unexpected symbol "+i.symbol+"; expected hour");e.byhour.push(parseInt(b[0],10))}}while(i.accept("comma")||i.accept("at"))}function d(){switch(i.symbol){case"january":return 1;case"february":return 2;case"march":return 3;case"april":return 4;case"may":return 5;case"june":return 6;case"july":return 7;case"august":return 8;case"september":return 9;case"october":return 10;case"november":return 11;case"december":return 12;default:return!1}}function c(){switch(i.symbol){case"monday":case"tuesday":case"wednesday":case"thursday":case"friday":case"saturday":case"sunday":return i.symbol.substr(0,2).toUpperCase();default:return!1}}function f(){switch(i.symbol){case"last":return i.nextSymbol(),-1;case"first":return i.nextSymbol(),1;case"second":return i.nextSymbol(),i.accept("last")?-2:2;case"third":return i.nextSymbol(),i.accept("last")?-3:3;case"nth":var v=parseInt(i.value[1],10);if(v<-366||v>366)throw new Error("Nth out of range: "+v);return i.nextSymbol(),i.accept("last")?-v:v;default:return!1}}function m(){i.accept("on"),i.accept("the");var v=f();if(v)for(e.bymonthday=[v],i.nextSymbol();i.accept("comma");){if(v=f(),!v)throw new Error("Unexpected symbol "+i.symbol+"; expected monthday");e.bymonthday.push(v),i.nextSymbol()}}function _(){if(i.symbol==="until"){var v=Date.parse(i.text);if(!v)throw new Error("Cannot parse until date:"+i.text);e.until=new Date(v)}else i.accept("for")&&(e.count=parseInt(i.value[0],10),i.expect("number"))}}var U;(function(r){r[r.YEARLY=0]="YEARLY",r[r.MONTHLY=1]="MONTHLY",r[r.WEEKLY=2]="WEEKLY",r[r.DAILY=3]="DAILY",r[r.HOURLY=4]="HOURLY",r[r.MINUTELY=5]="MINUTELY",r[r.SECONDLY=6]="SECONDLY"})(U||(U={}));function Ms(r){return r<U.HOURLY}var op=function(r,t){return t===void 0&&(t=Hi),new L(Ds(r,t)||void 0)},Nr=["count","until","interval","byweekday","bymonthday","bymonth"];It.IMPLEMENTED=[];It.IMPLEMENTED[U.HOURLY]=Nr;It.IMPLEMENTED[U.MINUTELY]=Nr;It.IMPLEMENTED[U.DAILY]=["byhour"].concat(Nr);It.IMPLEMENTED[U.WEEKLY]=Nr;It.IMPLEMENTED[U.MONTHLY]=Nr;It.IMPLEMENTED[U.YEARLY]=["byweekno","byyearday"].concat(Nr);var ap=function(r,t,e,i){return new It(r,t,e,i).toString()},lp=It.isFullyConvertible;var $r=(function(){function r(t,e,i,s){this.hour=t,this.minute=e,this.second=i,this.millisecond=s||0}return r.prototype.getHours=function(){return this.hour},r.prototype.getMinutes=function(){return this.minute},r.prototype.getSeconds=function(){return this.second},r.prototype.getMilliseconds=function(){return this.millisecond},r.prototype.getTime=function(){return(this.hour*60*60+this.minute*60+this.second)*1e3+this.millisecond},r})();var dp=(function(r){Rr(t,r);function t(e,i,s,n,a,d,c){var f=r.call(this,n,a,d,c)||this;return f.year=e,f.month=i,f.day=s,f}return t.fromDate=function(e){return new this(e.getUTCFullYear(),e.getUTCMonth()+1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.valueOf()%1e3)},t.prototype.getWeekday=function(){return Jt(new Date(this.getTime()))},t.prototype.getTime=function(){return new Date(Date.UTC(this.year,this.month-1,this.day,this.hour,this.minute,this.second,this.millisecond)).getTime()},t.prototype.getDay=function(){return this.day},t.prototype.getMonth=function(){return this.month},t.prototype.getYear=function(){return this.year},t.prototype.addYears=function(e){this.year+=e},t.prototype.addMonths=function(e){if(this.month+=e,this.month>12){var i=Math.floor(this.month/12),s=Ye(this.month,12);this.month=s,this.year+=i,this.month===0&&(this.month=12,--this.year)}},t.prototype.addWeekly=function(e,i){i>this.getWeekday()?this.day+=-(this.getWeekday()+1+(6-i))+e*7:this.day+=-(this.getWeekday()-i)+e*7,this.fixDay()},t.prototype.addDaily=function(e){this.day+=e,this.fixDay()},t.prototype.addHours=function(e,i,s){for(i&&(this.hour+=Math.floor((23-this.hour)/e)*e);;){this.hour+=e;var n=Yo(this.hour,24),a=n.div,d=n.mod;if(a&&(this.hour=d,this.addDaily(a)),rt(s)||Z(s,this.hour))break}},t.prototype.addMinutes=function(e,i,s,n){for(i&&(this.minute+=Math.floor((1439-(this.hour*60+this.minute))/e)*e);;){this.minute+=e;var a=Yo(this.minute,60),d=a.div,c=a.mod;if(d&&(this.minute=c,this.addHours(d,!1,s)),(rt(s)||Z(s,this.hour))&&(rt(n)||Z(n,this.minute)))break}},t.prototype.addSeconds=function(e,i,s,n,a){for(i&&(this.second+=Math.floor((86399-(this.hour*3600+this.minute*60+this.second))/e)*e);;){this.second+=e;var d=Yo(this.second,60),c=d.div,f=d.mod;if(c&&(this.second=f,this.addMinutes(c,!1,s,n)),(rt(s)||Z(s,this.hour))&&(rt(n)||Z(n,this.minute))&&(rt(a)||Z(a,this.second)))break}},t.prototype.fixDay=function(){if(!(this.day<=28)){var e=pd(this.year,this.month-1)[1];if(!(this.day<=e))for(;this.day>e;){if(this.day-=e,++this.month,this.month===13&&(this.month=1,++this.year,this.year>Uo))return;e=pd(this.year,this.month-1)[1]}}},t.prototype.add=function(e,i){var s=e.freq,n=e.interval,a=e.wkst,d=e.byhour,c=e.byminute,f=e.bysecond;switch(s){case U.YEARLY:return this.addYears(n);case U.MONTHLY:return this.addMonths(n);case U.WEEKLY:return this.addWeekly(n,a);case U.DAILY:return this.addDaily(n);case U.HOURLY:return this.addHours(n,i,d);case U.MINUTELY:return this.addMinutes(n,i,d,c);case U.SECONDLY:return this.addSeconds(n,i,d,c,f)}},t})($r);function vd(r){for(var t=[],e=Object.keys(r),i=0,s=e;i<s.length;i++){var n=s[i];Z(cp,n)||t.push(n),fd(r[n])&&!ji(r[n])&&t.push(n)}if(t.length)throw new Error("Invalid options: "+t.join(", "));return Ne({},r)}function hp(r){var t=Ne(Ne({},Is),vd(r));if(fe(t.byeaster)&&(t.freq=L.YEARLY),!(fe(t.freq)&&L.FREQUENCIES[t.freq]))throw new Error("Invalid frequency: ".concat(t.freq," ").concat(r.freq));if(t.dtstart||(t.dtstart=new Date(new Date().setMilliseconds(0))),fe(t.wkst)?it(t.wkst)||(t.wkst=t.wkst.weekday):t.wkst=L.MO.weekday,fe(t.bysetpos)){it(t.bysetpos)&&(t.bysetpos=[t.bysetpos]);for(var e=0;e<t.bysetpos.length;e++){var i=t.bysetpos[e];if(i===0||!(i>=-366&&i<=366))throw new Error("bysetpos must be between 1 and 366, or between -366 and -1")}}if(!(t.byweekno||Ce(t.byweekno)||Ce(t.byyearday)||t.bymonthday||Ce(t.bymonthday)||fe(t.byweekday)||fe(t.byeaster)))switch(t.freq){case L.YEARLY:t.bymonth||(t.bymonth=t.dtstart.getUTCMonth()+1),t.bymonthday=t.dtstart.getUTCDate();break;case L.MONTHLY:t.bymonthday=t.dtstart.getUTCDate();break;case L.WEEKLY:t.byweekday=[Jt(t.dtstart)];break}if(fe(t.bymonth)&&!Re(t.bymonth)&&(t.bymonth=[t.bymonth]),fe(t.byyearday)&&!Re(t.byyearday)&&it(t.byyearday)&&(t.byyearday=[t.byyearday]),!fe(t.bymonthday))t.bymonthday=[],t.bynmonthday=[];else if(Re(t.bymonthday)){for(var s=[],n=[],e=0;e<t.bymonthday.length;e++){var i=t.bymonthday[e];i>0?s.push(i):i<0&&n.push(i)}t.bymonthday=s,t.bynmonthday=n}else t.bymonthday<0?(t.bynmonthday=[t.bymonthday],t.bymonthday=[]):(t.bynmonthday=[],t.bymonthday=[t.bymonthday]);if(fe(t.byweekno)&&!Re(t.byweekno)&&(t.byweekno=[t.byweekno]),!fe(t.byweekday))t.bynweekday=null;else if(it(t.byweekday))t.byweekday=[t.byweekday],t.bynweekday=null;else if(cd(t.byweekday))t.byweekday=[Te.fromStr(t.byweekday).weekday],t.bynweekday=null;else if(t.byweekday instanceof Te)!t.byweekday.n||t.freq>L.MONTHLY?(t.byweekday=[t.byweekday.weekday],t.bynweekday=null):(t.bynweekday=[[t.byweekday.weekday,t.byweekday.n]],t.byweekday=null);else{for(var a=[],d=[],e=0;e<t.byweekday.length;e++){var c=t.byweekday[e];if(it(c)){a.push(c);continue}else if(cd(c)){a.push(Te.fromStr(c).weekday);continue}!c.n||t.freq>L.MONTHLY?a.push(c.weekday):d.push([c.weekday,c.n])}t.byweekday=Ce(a)?a:null,t.bynweekday=Ce(d)?d:null}return fe(t.byhour)?it(t.byhour)&&(t.byhour=[t.byhour]):t.byhour=t.freq<L.HOURLY?[t.dtstart.getUTCHours()]:null,fe(t.byminute)?it(t.byminute)&&(t.byminute=[t.byminute]):t.byminute=t.freq<L.MINUTELY?[t.dtstart.getUTCMinutes()]:null,fe(t.bysecond)?it(t.bysecond)&&(t.bysecond=[t.bysecond]):t.bysecond=t.freq<L.SECONDLY?[t.dtstart.getUTCSeconds()]:null,{parsedOptions:t}}function up(r){var t=r.dtstart.getTime()%1e3;if(!Ms(r.freq))return[];var e=[];return r.byhour.forEach(function(i){r.byminute.forEach(function(s){r.bysecond.forEach(function(n){e.push(new $r(i,s,n,t))})})}),e}function Ps(r){var t=r.split(`
`).map(Wx).filter(function(e){return e!==null});return Ne(Ne({},t[0]),t[1])}function As(r){var t={},e=/DTSTART(?:;TZID=([^:=]+?))?(?::|=)([^;\s]+)/i.exec(r);if(!e)return t;var i=e[1],s=e[2];return i&&(t.tzid=i),t.dtstart=Os(s),t}function Wx(r){if(r=r.replace(/^\s+|\s+$/,""),!r.length)return null;var t=/^([A-Z]+?)[:;]/.exec(r.toUpperCase());if(!t)return fp(r);var e=t[1];switch(e.toUpperCase()){case"RRULE":case"EXRULE":return fp(r);case"DTSTART":return As(r);default:throw new Error("Unsupported RFC prop ".concat(e," in ").concat(r))}}function fp(r){var t=r.replace(/^RRULE:/i,""),e=As(t),i=r.replace(/^(?:RRULE|EXRULE):/i,"").split(";");return i.forEach(function(s){var n=s.split("="),a=n[0],d=n[1];switch(a.toUpperCase()){case"FREQ":e.freq=U[d.toUpperCase()];break;case"WKST":e.wkst=ct[d.toUpperCase()];break;case"COUNT":case"INTERVAL":case"BYSETPOS":case"BYMONTH":case"BYMONTHDAY":case"BYYEARDAY":case"BYWEEKNO":case"BYHOUR":case"BYMINUTE":case"BYSECOND":var c=qx(d),f=a.toLowerCase();e[f]=c;break;case"BYWEEKDAY":case"BYDAY":e.byweekday=Kx(d);break;case"DTSTART":case"TZID":var m=As(r);e.tzid=m.tzid,e.dtstart=m.dtstart;break;case"UNTIL":e.until=Os(d);break;case"BYEASTER":e.byeaster=Number(d);break;default:throw new Error("Unknown RRULE property '"+a+"'")}}),e}function qx(r){if(r.indexOf(",")!==-1){var t=r.split(",");return t.map(pp)}return pp(r)}function pp(r){return/^[+-]?\d+$/.test(r)?Number(r):r}function Kx(r){var t=r.split(",");return t.map(function(e){if(e.length===2)return ct[e];var i=e.match(/^([+-]?\d{1,2})([A-Z]{2})$/);if(!i||i.length<3)throw new SyntaxError("Invalid weekday string: ".concat(e));var s=Number(i[1]),n=i[2],a=ct[n].weekday;return new Te(a,s)})}var Wi=(function(){function r(t,e){if(isNaN(t.getTime()))throw new RangeError("Invalid date passed to DateWithZone");this.date=t,this.tzid=e}return Object.defineProperty(r.prototype,"isUTC",{get:function(){return!this.tzid||this.tzid.toUpperCase()==="UTC"},enumerable:!1,configurable:!0}),r.prototype.toString=function(){var t=Lr(this.date.getTime(),this.isUTC);return this.isUTC?":".concat(t):";TZID=".concat(this.tzid,":").concat(t)},r.prototype.getTime=function(){return this.date.getTime()},r.prototype.rezonedDate=function(){return this.isUTC?this.date:sp(this.date,this.tzid)},r})();function Ls(r){for(var t=[],e="",i=Object.keys(r),s=Object.keys(Is),n=0;n<i.length;n++)if(i[n]!=="tzid"&&Z(s,i[n])){var a=i[n].toUpperCase(),d=r[i[n]],c="";if(!(!fe(d)||Re(d)&&!d.length)){switch(a){case"FREQ":c=L.FREQUENCIES[r.freq];break;case"WKST":it(d)?c=new Te(d).toString():c=d.toString();break;case"BYWEEKDAY":a="BYDAY",c=Qf(d).map(function(b){return b instanceof Te?b:Re(b)?new Te(b[0],b[1]):new Te(b)}).toString();break;case"DTSTART":e=Gx(d,r.tzid);break;case"UNTIL":c=Lr(d,!r.tzid);break;default:if(Re(d)){for(var f=[],m=0;m<d.length;m++)f[m]=String(d[m]);c=f.toString()}else c=String(d)}c&&t.push([a,c])}}var _=t.map(function(b){var y=b[0],T=b[1];return"".concat(y,"=").concat(T.toString())}).join(";"),v="";return _!==""&&(v="RRULE:".concat(_)),[e,v].filter(function(b){return!!b}).join(`
`)}function Gx(r,t){return r?"DTSTART"+new Wi(new Date(r),t).toString():""}function Zx(r,t){return Array.isArray(r)?!Array.isArray(t)||r.length!==t.length?!1:r.every(function(e,i){return e.getTime()===t[i].getTime()}):r instanceof Date?t instanceof Date&&r.getTime()===t.getTime():r===t}var mp=(function(){function r(){this.all=!1,this.before=[],this.after=[],this.between=[]}return r.prototype._cacheAdd=function(t,e,i){e&&(e=e instanceof Date?Wo(e):md(e)),t==="all"?this.all=e:(i._value=e,this[t].push(i))},r.prototype._cacheGet=function(t,e){var i=!1,s=e?Object.keys(e):[],n=function(m){for(var _=0;_<s.length;_++){var v=s[_];if(!Zx(e[v],m[v]))return!0}return!1},a=this[t];if(t==="all")i=this.all;else if(Re(a))for(var d=0;d<a.length;d++){var c=a[d];if(!(s.length&&n(c))){i=c._value;break}}if(!i&&this.all){for(var f=new ei(t,e),d=0;d<this.all.length&&f.accept(this.all[d]);d++);i=f.getValue(),this._cacheAdd(t,i,e)}return Re(i)?md(i):i instanceof Date?Wo(i):i},r})();var _p=M(M(M(M(M(M(M(M(M(M(M(M(M([],G(1,31),!0),G(2,28),!0),G(3,31),!0),G(4,30),!0),G(5,31),!0),G(6,30),!0),G(7,31),!0),G(8,31),!0),G(9,30),!0),G(10,31),!0),G(11,30),!0),G(12,31),!0),G(1,7),!0),gp=M(M(M(M(M(M(M(M(M(M(M(M(M([],G(1,31),!0),G(2,29),!0),G(3,31),!0),G(4,30),!0),G(5,31),!0),G(6,30),!0),G(7,31),!0),G(8,31),!0),G(9,30),!0),G(10,31),!0),G(11,30),!0),G(12,31),!0),G(1,7),!0),Xx=ut(1,29),Jx=ut(1,30),xi=ut(1,31),Ue=ut(1,32),vp=M(M(M(M(M(M(M(M(M(M(M(M(M([],Ue,!0),Jx,!0),Ue,!0),xi,!0),Ue,!0),xi,!0),Ue,!0),Ue,!0),xi,!0),Ue,!0),xi,!0),Ue,!0),Ue.slice(0,7),!0),yp=M(M(M(M(M(M(M(M(M(M(M(M(M([],Ue,!0),Xx,!0),Ue,!0),xi,!0),Ue,!0),xi,!0),Ue,!0),Ue,!0),xi,!0),Ue,!0),xi,!0),Ue,!0),Ue.slice(0,7),!0),Qx=ut(-28,0),ew=ut(-29,0),wi=ut(-30,0),je=ut(-31,0),bp=M(M(M(M(M(M(M(M(M(M(M(M(M([],je,!0),ew,!0),je,!0),wi,!0),je,!0),wi,!0),je,!0),je,!0),wi,!0),je,!0),wi,!0),je,!0),je.slice(0,7),!0),xp=M(M(M(M(M(M(M(M(M(M(M(M(M([],je,!0),Qx,!0),je,!0),wi,!0),je,!0),wi,!0),je,!0),je,!0),wi,!0),je,!0),wi,!0),je,!0),je.slice(0,7),!0),wp=[0,31,60,91,121,152,182,213,244,274,305,335,366],Cp=[0,31,59,90,120,151,181,212,243,273,304,334,365],yd=(function(){for(var r=[],t=0;t<55;t++)r=r.concat(ut(7));return r})();function Sp(r,t){var e=Mt(r,1,1),i=Pr(r)?366:365,s=Pr(r+1)?366:365,n=Ts(e),a=Jt(e),d=Ne(Ne({yearlen:i,nextyearlen:s,yearordinal:n,yearweekday:a},tw(r)),{wnomask:null});if(rt(t.byweekno))return d;d.wnomask=G(0,i+7);var c,f,m=c=Ye(7-a+t.wkst,7);m>=4?(m=0,f=d.yearlen+Ye(a-t.wkst,7)):f=i-m;for(var _=Math.floor(f/7),v=Ye(f,7),b=Math.floor(_+v/4),y=0;y<t.byweekno.length;y++){var T=t.byweekno[y];if(T<0&&(T+=b+1),T>0&&T<=b){var N=void 0;T>1?(N=m+(T-1)*7,m!==c&&(N-=7-c)):N=m;for(var $=0;$<7&&(d.wnomask[N]=1,N++,d.wdaymask[N]!==t.wkst);$++);}}if(Z(t.byweekno,1)){var N=m+b*7;if(m!==c&&(N-=7-c),N<i)for(var y=0;y<7&&(d.wnomask[N]=1,N+=1,d.wdaymask[N]!==t.wkst);y++);}if(m){var B=void 0;if(Z(t.byweekno,-1))B=-1;else{var ne=Jt(Mt(r-1,1,1)),se=Ye(7-ne.valueOf()+t.wkst,7),ye=Pr(r-1)?366:365,ee=void 0;se>=4?(se=0,ee=ye+Ye(ne-t.wkst,7)):ee=i-m,B=Math.floor(52+Ye(ee,7)/4)}if(Z(t.byweekno,B))for(var N=0;N<m;N++)d.wnomask[N]=1}return d}function tw(r){var t=Pr(r)?366:365,e=Mt(r,1,1),i=Jt(e);return t===365?{mmask:_p,mdaymask:yp,nmdaymask:xp,wdaymask:yd.slice(i),mrange:Cp}:{mmask:gp,mdaymask:vp,nmdaymask:bp,wdaymask:yd.slice(i),mrange:wp}}function kp(r,t,e,i,s,n){var a={lastyear:r,lastmonth:t,nwdaymask:[]},d=[];if(n.freq===L.YEARLY)if(rt(n.bymonth))d=[[0,e]];else for(var c=0;c<n.bymonth.length;c++)t=n.bymonth[c],d.push(i.slice(t-1,t+1));else n.freq===L.MONTHLY&&(d=[i.slice(t-1,t+1)]);if(rt(d))return a;a.nwdaymask=G(0,e);for(var c=0;c<d.length;c++)for(var f=d[c],m=f[0],_=f[1]-1,v=0;v<n.bynweekday.length;v++){var b=void 0,y=n.bynweekday[v],T=y[0],N=y[1];N<0?(b=_+(N+1)*7,b-=Ye(s[b]-T,7)):(b=m+(N-1)*7,b+=Ye(7-s[b]+T,7)),m<=b&&b<=_&&(a.nwdaymask[b]=1)}return a}function Ep(r,t){t===void 0&&(t=0);var e=r%19,i=Math.floor(r/100),s=r%100,n=Math.floor(i/4),a=i%4,d=Math.floor((i+8)/25),c=Math.floor((i-d+1)/3),f=Math.floor(19*e+i-n-c+15)%30,m=Math.floor(s/4),_=s%4,v=Math.floor(32+2*a+2*m-f-_)%7,b=Math.floor((e+11*f+22*v)/451),y=Math.floor((f+v-7*b+114)/31),T=(f+v-7*b+114)%31+1,N=Date.UTC(r,y-1,T+t),$=Date.UTC(r,0,1);return[Math.ceil((N-$)/(1e3*60*60*24))]}var iw=(function(){function r(t){this.options=t}return r.prototype.rebuild=function(t,e){var i=this.options;if(t!==this.lastyear&&(this.yearinfo=Sp(t,i)),Ce(i.bynweekday)&&(e!==this.lastmonth||t!==this.lastyear)){var s=this.yearinfo,n=s.yearlen,a=s.mrange,d=s.wdaymask;this.monthinfo=kp(t,e,n,a,d,i)}fe(i.byeaster)&&(this.eastermask=Ep(t,i.byeaster))},Object.defineProperty(r.prototype,"lastyear",{get:function(){return this.monthinfo?this.monthinfo.lastyear:null},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"lastmonth",{get:function(){return this.monthinfo?this.monthinfo.lastmonth:null},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"yearlen",{get:function(){return this.yearinfo.yearlen},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"yearordinal",{get:function(){return this.yearinfo.yearordinal},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"mrange",{get:function(){return this.yearinfo.mrange},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"wdaymask",{get:function(){return this.yearinfo.wdaymask},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"mmask",{get:function(){return this.yearinfo.mmask},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"wnomask",{get:function(){return this.yearinfo.wnomask},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"nwdaymask",{get:function(){return this.monthinfo?this.monthinfo.nwdaymask:[]},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"nextyearlen",{get:function(){return this.yearinfo.nextyearlen},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"mdaymask",{get:function(){return this.yearinfo.mdaymask},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"nmdaymask",{get:function(){return this.yearinfo.nmdaymask},enumerable:!1,configurable:!0}),r.prototype.ydayset=function(){return[ut(this.yearlen),0,this.yearlen]},r.prototype.mdayset=function(t,e){for(var i=this.mrange[e-1],s=this.mrange[e],n=G(null,this.yearlen),a=i;a<s;a++)n[a]=a;return[n,i,s]},r.prototype.wdayset=function(t,e,i){for(var s=G(null,this.yearlen+7),n=Ts(Mt(t,e,i))-this.yearordinal,a=n,d=0;d<7&&(s[n]=n,++n,this.wdaymask[n]!==this.options.wkst);d++);return[s,a,n]},r.prototype.ddayset=function(t,e,i){var s=G(null,this.yearlen),n=Ts(Mt(t,e,i))-this.yearordinal;return s[n]=n,[s,n,n+1]},r.prototype.htimeset=function(t,e,i,s){var n=this,a=[];return this.options.byminute.forEach(function(d){a=a.concat(n.mtimeset(t,d,i,s))}),Qt(a),a},r.prototype.mtimeset=function(t,e,i,s){var n=this.options.bysecond.map(function(a){return new $r(t,e,a,s)});return Qt(n),n},r.prototype.stimeset=function(t,e,i,s){return[new $r(t,e,i,s)]},r.prototype.getdayset=function(t){switch(t){case U.YEARLY:return this.ydayset.bind(this);case U.MONTHLY:return this.mdayset.bind(this);case U.WEEKLY:return this.wdayset.bind(this);case U.DAILY:return this.ddayset.bind(this);default:return this.ddayset.bind(this)}},r.prototype.gettimeset=function(t){switch(t){case U.HOURLY:return this.htimeset.bind(this);case U.MINUTELY:return this.mtimeset.bind(this);case U.SECONDLY:return this.stimeset.bind(this)}},r})(),Tp=iw;function Op(r,t,e,i,s,n){for(var a=[],d=0;d<r.length;d++){var c=void 0,f=void 0,m=r[d];m<0?(c=Math.floor(m/t.length),f=Ye(m,t.length)):(c=Math.floor((m-1)/t.length),f=Ye(m-1,t.length));for(var _=[],v=e;v<i;v++){var b=n[v];fe(b)&&_.push(b)}var y=void 0;c<0?y=_.slice(c)[0]:y=_[c];var T=t[f],N=jo(s.yearordinal+y),$=Ho(N,T);Z(a,$)||a.push($)}return Qt(a),a}function qo(r,t){var e=t.dtstart,i=t.freq,s=t.interval,n=t.until,a=t.bysetpos,d=t.count;if(d===0||s===0)return ti(r);var c=dp.fromDate(e),f=new Tp(t);f.rebuild(c.year,c.month);for(var m=nw(f,c,t);;){var _=f.getdayset(i)(c.year,c.month,c.day),v=_[0],b=_[1],y=_[2],T=sw(v,b,y,f,t);if(Ce(a))for(var N=Op(a,m,b,y,f,v),$=0;$<N.length;$++){var B=N[$];if(n&&B>n)return ti(r);if(B>=e){var ne=Dp(B,t);if(!r.accept(ne)||d&&(--d,!d))return ti(r)}}else for(var $=b;$<y;$++){var se=v[$];if(fe(se))for(var ye=jo(f.yearordinal+se),ee=0;ee<m.length;ee++){var ft=m[ee],B=Ho(ye,ft);if(n&&B>n)return ti(r);if(B>=e){var ne=Dp(B,t);if(!r.accept(ne)||d&&(--d,!d))return ti(r)}}}if(t.interval===0||(c.add(t,T),c.year>Uo))return ti(r);Ms(i)||(m=f.gettimeset(i)(c.hour,c.minute,c.second,0)),f.rebuild(c.year,c.month)}}function rw(r,t,e){var i=e.bymonth,s=e.byweekno,n=e.byweekday,a=e.byeaster,d=e.bymonthday,c=e.bynmonthday,f=e.byyearday;return Ce(i)&&!Z(i,r.mmask[t])||Ce(s)&&!r.wnomask[t]||Ce(n)&&!Z(n,r.wdaymask[t])||Ce(r.nwdaymask)&&!r.nwdaymask[t]||a!==null&&!Z(r.eastermask,t)||(Ce(d)||Ce(c))&&!Z(d,r.mdaymask[t])&&!Z(c,r.nmdaymask[t])||Ce(f)&&(t<r.yearlen&&!Z(f,t+1)&&!Z(f,-r.yearlen+t)||t>=r.yearlen&&!Z(f,t+1-r.yearlen)&&!Z(f,-r.nextyearlen+t-r.yearlen))}function Dp(r,t){return new Wi(r,t.tzid).rezonedDate()}function ti(r){return r.getValue()}function sw(r,t,e,i,s){for(var n=!1,a=t;a<e;a++){var d=r[a];n=rw(i,d,s),n&&(r[d]=null)}return n}function nw(r,t,e){var i=e.freq,s=e.byhour,n=e.byminute,a=e.bysecond;return Ms(i)?up(e):i>=L.HOURLY&&Ce(s)&&!Z(s,t.hour)||i>=L.MINUTELY&&Ce(n)&&!Z(n,t.minute)||i>=L.SECONDLY&&Ce(a)&&!Z(a,t.second)?[]:r.gettimeset(i)(t.hour,t.minute,t.second,t.millisecond)}var ct={MO:new Te(0),TU:new Te(1),WE:new Te(2),TH:new Te(3),FR:new Te(4),SA:new Te(5),SU:new Te(6)},Is={freq:U.YEARLY,dtstart:null,interval:1,wkst:ct.MO,count:null,until:null,tzid:null,bysetpos:null,bymonth:null,bymonthday:null,bynmonthday:null,byyearday:null,byweekno:null,byweekday:null,bynweekday:null,byhour:null,byminute:null,bysecond:null,byeaster:null},cp=Object.keys(Is),L=(function(){function r(t,e){t===void 0&&(t={}),e===void 0&&(e=!1),this._cache=e?null:new mp,this.origOptions=vd(t);var i=hp(t).parsedOptions;this.options=i}return r.parseText=function(t,e){return Ds(t,e)},r.fromText=function(t,e){return op(t,e)},r.fromString=function(t){return new r(r.parseString(t)||void 0)},r.prototype._iter=function(t){return qo(t,this.options)},r.prototype._cacheGet=function(t,e){return this._cache?this._cache._cacheGet(t,e):!1},r.prototype._cacheAdd=function(t,e,i){if(this._cache)return this._cache._cacheAdd(t,e,i)},r.prototype.all=function(t){if(t)return this._iter(new gd("all",{},t));var e=this._cacheGet("all");return e===!1&&(e=this._iter(new ei("all",{})),this._cacheAdd("all",e)),e},r.prototype.between=function(t,e,i,s){if(i===void 0&&(i=!1),!ji(t)||!ji(e))throw new Error("Invalid date passed in to RRule.between");var n={before:e,after:t,inc:i};if(s)return this._iter(new gd("between",n,s));var a=this._cacheGet("between",n);return a===!1&&(a=this._iter(new ei("between",n)),this._cacheAdd("between",a,n)),a},r.prototype.before=function(t,e){if(e===void 0&&(e=!1),!ji(t))throw new Error("Invalid date passed in to RRule.before");var i={dt:t,inc:e},s=this._cacheGet("before",i);return s===!1&&(s=this._iter(new ei("before",i)),this._cacheAdd("before",s,i)),s},r.prototype.after=function(t,e){if(e===void 0&&(e=!1),!ji(t))throw new Error("Invalid date passed in to RRule.after");var i={dt:t,inc:e},s=this._cacheGet("after",i);return s===!1&&(s=this._iter(new ei("after",i)),this._cacheAdd("after",s,i)),s},r.prototype.count=function(){return this.all().length},r.prototype.toString=function(){return Ls(this.origOptions)},r.prototype.toText=function(t,e,i){return ap(this,t,e,i)},r.prototype.isFullyConvertibleToText=function(){return lp(this)},r.prototype.clone=function(){return new r(this.origOptions)},r.FREQUENCIES=["YEARLY","MONTHLY","WEEKLY","DAILY","HOURLY","MINUTELY","SECONDLY"],r.YEARLY=U.YEARLY,r.MONTHLY=U.MONTHLY,r.WEEKLY=U.WEEKLY,r.DAILY=U.DAILY,r.HOURLY=U.HOURLY,r.MINUTELY=U.MINUTELY,r.SECONDLY=U.SECONDLY,r.MO=ct.MO,r.TU=ct.TU,r.WE=ct.WE,r.TH=ct.TH,r.FR=ct.FR,r.SA=ct.SA,r.SU=ct.SU,r.parseString=Ps,r.optionsToString=Ls,r})();function Mp(r,t,e,i,s,n){var a={},d=r.accept;function c(v,b){e.forEach(function(y){y.between(v,b,!0).forEach(function(T){a[Number(T)]=!0})})}s.forEach(function(v){var b=new Wi(v,n).rezonedDate();a[Number(b)]=!0}),r.accept=function(v){var b=Number(v);return isNaN(b)?d.call(this,v):!a[b]&&(c(new Date(b-1),new Date(b+1)),!a[b])?(a[b]=!0,d.call(this,v)):!0},r.method==="between"&&(c(r.args.after,r.args.before),r.accept=function(v){var b=Number(v);return a[b]?!0:(a[b]=!0,d.call(this,v))});for(var f=0;f<i.length;f++){var m=new Wi(i[f],n).rezonedDate();if(!r.accept(new Date(m.getTime())))break}t.forEach(function(v){qo(r,v.options)});var _=r._result;switch(Qt(_),r.method){case"all":case"between":return _;case"before":return _.length&&_[_.length-1]||null;default:return _.length&&_[0]||null}}var Ip={dtstart:null,cache:!1,unfold:!1,forceset:!1,compatible:!1,tzid:null};function ow(r,t){var e=[],i=[],s=[],n=[],a=As(r),d=a.dtstart,c=a.tzid,f=uw(r,t.unfold);return f.forEach(function(m){var _;if(m){var v=hw(m),b=v.name,y=v.parms,T=v.value;switch(b.toUpperCase()){case"RRULE":if(y.length)throw new Error("unsupported RRULE parm: ".concat(y.join(",")));e.push(Ps(m));break;case"RDATE":var N=(_=/RDATE(?:;TZID=([^:=]+))?/i.exec(m))!==null&&_!==void 0?_:[],$=N[1];$&&!c&&(c=$),i=i.concat(Ap(T,y));break;case"EXRULE":if(y.length)throw new Error("unsupported EXRULE parm: ".concat(y.join(",")));s.push(Ps(T));break;case"EXDATE":n=n.concat(Ap(T,y));break;case"DTSTART":break;default:throw new Error("unsupported property: "+b)}}}),{dtstart:d,tzid:c,rrulevals:e,rdatevals:i,exrulevals:s,exdatevals:n}}function aw(r,t){var e=ow(r,t),i=e.rrulevals,s=e.rdatevals,n=e.exrulevals,a=e.exdatevals,d=e.dtstart,c=e.tzid,f=t.cache===!1;if(t.compatible&&(t.forceset=!0,t.unfold=!0),t.forceset||i.length>1||s.length||n.length||a.length){var m=new xd(f);return m.dtstart(d),m.tzid(c||void 0),i.forEach(function(v){m.rrule(new L(bd(v,d,c),f))}),s.forEach(function(v){m.rdate(v)}),n.forEach(function(v){m.exrule(new L(bd(v,d,c),f))}),a.forEach(function(v){m.exdate(v)}),t.compatible&&t.dtstart&&m.rdate(d),m}var _=i[0]||{};return new L(bd(_,_.dtstart||t.dtstart||d,_.tzid||t.tzid||c),f)}function Ko(r,t){return t===void 0&&(t={}),aw(r,lw(t))}function bd(r,t,e){return Ne(Ne({},r),{dtstart:t,tzid:e})}function lw(r){var t=[],e=Object.keys(r),i=Object.keys(Ip);if(e.forEach(function(s){Z(i,s)||t.push(s)}),t.length)throw new Error("Invalid options: "+t.join(", "));return Ne(Ne({},Ip),r)}function dw(r){if(r.indexOf(":")===-1)return{name:"RRULE",value:r};var t=ep(r,":",1),e=t[0],i=t[1];return{name:e,value:i}}function hw(r){var t=dw(r),e=t.name,i=t.value,s=e.split(";");if(!s)throw new Error("empty property name");return{name:s[0].toUpperCase(),parms:s.slice(1),value:i}}function uw(r,t){if(t===void 0&&(t=!1),r=r&&r.trim(),!r)throw new Error("Invalid empty string");if(!t)return r.split(/\s/);for(var e=r.split(`
`),i=0;i<e.length;){var s=e[i]=e[i].replace(/\s+$/g,"");s?i>0&&s[0]===" "?(e[i-1]+=s.slice(1),e.splice(i,1)):i+=1:e.splice(i,1)}return e}function cw(r){r.forEach(function(t){if(!/(VALUE=DATE(-TIME)?)|(TZID=)/.test(t))throw new Error("unsupported RDATE/EXDATE parm: "+t)})}function Ap(r,t){return cw(t),r.split(",").map(function(e){return Os(e)})}function Pp(r){var t=this;return function(e){if(e!==void 0&&(t["_".concat(r)]=e),t["_".concat(r)]!==void 0)return t["_".concat(r)];for(var i=0;i<t._rrule.length;i++){var s=t._rrule[i].origOptions[r];if(s)return s}}}var xd=(function(r){Rr(t,r);function t(e){e===void 0&&(e=!1);var i=r.call(this,{},e)||this;return i.dtstart=Pp.apply(i,["dtstart"]),i.tzid=Pp.apply(i,["tzid"]),i._rrule=[],i._rdate=[],i._exrule=[],i._exdate=[],i}return t.prototype._iter=function(e){return Mp(e,this._rrule,this._exrule,this._rdate,this._exdate,this.tzid())},t.prototype.rrule=function(e){Lp(e,this._rrule)},t.prototype.exrule=function(e){Lp(e,this._exrule)},t.prototype.rdate=function(e){Rp(e,this._rdate)},t.prototype.exdate=function(e){Rp(e,this._exdate)},t.prototype.rrules=function(){return this._rrule.map(function(e){return Ko(e.toString())})},t.prototype.exrules=function(){return this._exrule.map(function(e){return Ko(e.toString())})},t.prototype.rdates=function(){return this._rdate.map(function(e){return new Date(e.getTime())})},t.prototype.exdates=function(){return this._exdate.map(function(e){return new Date(e.getTime())})},t.prototype.valueOf=function(){var e=[];return!this._rrule.length&&this._dtstart&&(e=e.concat(Ls({dtstart:this._dtstart}))),this._rrule.forEach(function(i){e=e.concat(i.toString().split(`
`))}),this._exrule.forEach(function(i){e=e.concat(i.toString().split(`
`).map(function(s){return s.replace(/^RRULE:/,"EXRULE:")}).filter(function(s){return!/^DTSTART/.test(s)}))}),this._rdate.length&&e.push(Np("RDATE",this._rdate,this.tzid())),this._exdate.length&&e.push(Np("EXDATE",this._exdate,this.tzid())),e},t.prototype.toString=function(){return this.valueOf().join(`
`)},t.prototype.clone=function(){var e=new t(!!this._cache);return this._rrule.forEach(function(i){return e.rrule(i.clone())}),this._exrule.forEach(function(i){return e.exrule(i.clone())}),this._rdate.forEach(function(i){return e.rdate(new Date(i.getTime()))}),this._exdate.forEach(function(i){return e.exdate(new Date(i.getTime()))}),e},t})(L);function Lp(r,t){if(!(r instanceof L))throw new TypeError(String(r)+" is not RRule instance");Z(t.map(String),String(r))||t.push(r)}function Rp(r,t){if(!(r instanceof Date))throw new TypeError(String(r)+" is not Date instance");Z(t.map(Number),Number(r))||(t.push(r),Qt(t))}function Np(r,t,e){var i=!e||e.toUpperCase()==="UTC",s=i?"".concat(r,":"):"".concat(r,";TZID=").concat(e,":"),n=t.map(function(a){return Lr(a.valueOf(),i)}).join(",");return"".concat(s).concat(n)}var $p={YEARLY:"rrule.frequency.YEARLY",MONTHLY:"rrule.frequency.MONTHLY",WEEKLY:"rrule.frequency.WEEKLY",DAILY:"rrule.frequency.DAILY",HOURLY:"rrule.frequency.HOURLY",MINUTELY:"rrule.frequency.MINUTELY",SECONDLY:"rrule.frequency.SECONDLY"},Go=["bymonth","byweekno","byyearday","bymonthday","byweekday","byhour","byminute","bysecond"],ii={SECONDLY:["byweekno"],MINUTELY:["byweekno"],HOURLY:["byweekno"],DAILY:["byweekno","byyearday"],WEEKLY:["byweekno","byyearday","bymonthday"],MONTHLY:["byweekno","byyearday"],YEARLY:[]},qi=["bymonth","byweekno","byyearday","byhour","byminute","bysecond"],fw={SECONDLY:["bymonthday","byweekday",...qi,...ii.SECONDLY],MINUTELY:["bymonthday","byweekday",...qi,...ii.MINUTELY],HOURLY:["bymonthday","byweekday",...qi,...ii.HOURLY],DAILY:["bymonthday","byweekday",...qi,...ii.DAILY],WEEKLY:["bymonthday",...qi,...ii.WEEKLY],MONTHLY:["byweekday",...qi,...ii.MONTHLY],YEARLY:["bymonthday","byweekday",...qi,...ii.YEARLY]},wd={MO:"monday",TU:"tuesday",WE:"wednesday",TH:"thursday",FR:"friday",SA:"saturday",SU:"sunday"},Cd={1:"january",2:"february",3:"march",4:"april",5:"may",6:"june",7:"july",8:"august",9:"september",10:"october",11:"november",12:"december"},He;(function(r){r.default="default",r.period="period",r.recurrence="recurrence"})(He||(He={}));var Fp={never:"never",until:"schedule.ends.until",count:"schedule.ends.count"};var Q=Zv(Bp()),Ae=function(r,t,e,i){var s,n=arguments.length,a=n<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,t,e,i);else for(var d=r.length-1;d>=0;d--)(s=r[d])&&(a=(n<3?s(a):n>3?s(t,e,a):s(t,e))||a);return n>3&&a&&Object.defineProperty(t,e,a),a};function Rs(r,t){return Array.from({length:t-r+1},(e,i)=>r+i)}var pw=Rs(-53,53).filter(Boolean),mw=Rs(-366,366).filter(Boolean),_w=Rs(-31,31).filter(Boolean),gw=Rs(1,24),Vp=Rs(1,60),Zo=class r extends CustomEvent{constructor(t){super(r.NAME,{detail:{value:t},bubbles:!0,composed:!0})}};Zo.NAME="or-scheduler-changed";var Xo=class r extends CustomEvent{constructor(){super(r.NAME,{bubbles:!0,composed:!0})}};Xo.NAME="or-scheduler-removed";var Oe=class extends wo(j)(kr){constructor(){super(...arguments),this.defaultEventTypeLabel="default",this.disableNegativeByPartValues=!1,this.disabledFrequencies=[],this.disabledRRuleParts=[],this.disabledByPartCombinations=ii,this.header="scheduleActivity",this.isAllDay=!0,this.open=!1,this.removable=!1,this.schedule=this.defaultSchedule,this.timezoneOffset=0,this._count=1,this._ends="never",this._eventType=He.default,this._until=(0,Q.default)().toDate()}get _scheduleWithOffset(){return this._applyTimezoneOffset(this.schedule,this.timezoneOffset)}set _scheduleWithOffset(r){this.schedule=this._applyTimezoneOffset(r,-this.timezoneOffset)}get _timeLabel(){if(this._eventType===He.default)return w`<or-translate
        value="${this.defaultEventTypeLabel}"
        .options="${this._getDefaultMessageOptions()}"
      ></or-translate>`;if(this._scheduleWithOffset){let r=this._scheduleWithOffset;if(r.recurrence){let e=(0,Q.default)(r.end).diff(r.start,"days"),i={start:(0,Q.default)(r.start).format("HH:mm"),end:(0,Q.default)(r.end).format("HH:mm")},s=w``;this.isAllDay&&e>0?s=w`<or-translate value="forDays" .options="${{days:e,count:e}}"></or-translate>`:e>0?s=w`<or-translate
            value="fromToDays"
            .options="${Object.assign(Object.assign({},i),{days:e,count:e})}"
          ></or-translate>`:e===0&&(s=w`<or-translate value="fromTo" .options="${i}"></or-translate>`);let n=w`<span>&nbsp;${s}</span>`,a=Object.values(Cd).map(m=>j.t(m)),d=Object.values(wd).map(m=>j.t(m)),c=[d.pop(),...d],f=this._rrule.toText(m=>j.t(`rrule.${m}`),{dayNames:c,monthNames:a,tokens:{}});return w`<span class="time-label"><span>${f}</span>${n}</span>`}let t=this.isAllDay?"DD-MM-YYYY":"DD-MM-YYYY HH:mm";return w`<or-translate
        value="activeFromTo"
        .options="${{start:(0,Q.default)(r.start).format(t),end:(0,Q.default)(r.end).format(t)}}"
      ></or-translate>`}}connectedCallback(){var r,t,e;super.connectedCallback();let i=this._applyTimezoneOffset((r=this.schedule)!=null?r:this.defaultSchedule,this.timezoneOffset);if(i?.start&&i?.start){let s=(0,Q.default)(i?.start),n=(0,Q.default)(i?.end);this.isAllDay=s.isSame(s.clone().startOf("day"))&&n.isSame(n.clone().endOf("day"))}if((t=this.schedule)!=null&&t.recurrence){let s=L.fromString(this.schedule.recurrence).origOptions;s.until?this._until=(0,Q.default)(s.until).toDate():s.count&&(this._count=s.count)}!this.schedule||rs.objectsEqual(this.schedule,this.defaultSchedule)?this._eventType=He.default:this._eventType=(e=this.schedule)!=null&&e.recurrence?He.recurrence:He.period}shouldUpdate(r){var t,e,i,s,n,a,d;return this.schedule&&!this.schedule.end&&((t=this.defaultSchedule)!=null&&t.end)&&(this.schedule=Object.assign(Object.assign({},this.schedule),{end:this.defaultSchedule.end})),r.has("schedule")&&((e=this._scheduleWithOffset)!=null&&e.recurrence?this._rrule=L.fromString(this._scheduleWithOffset.recurrence):this._eventType===He.default&&((i=this.defaultSchedule)!=null&&i.recurrence)&&(this._rrule=L.fromString(this.defaultSchedule.recurrence))),r.has("_rrule")&&this._rrule&&(this._byRRuleParts=Go.filter(c=>{var f;return!((f=this.disabledByPartCombinations[U[this._rrule.options.freq]])!=null&&f.includes(c))}).filter(c=>!this.disabledRRuleParts.includes(c)),this._ends=((n=(s=this._rrule)==null?void 0:s.origOptions)==null?void 0:n.until)&&"until"||((d=(a=this._rrule)==null?void 0:a.origOptions)==null?void 0:d.count)&&"count"||"never"),super.shouldUpdate(r)}_setAllDay(){let r=this._scheduleWithOffset;if(this.isAllDay&&this._eventType!==He.default){let t=(0,Q.default)(r?.start).startOf("day").valueOf(),e=(0,Q.default)(r?.end).endOf("day").valueOf();this._scheduleWithOffset=Object.assign(Object.assign({},r),{start:t,end:e})}}_getRRule(r=this._rrule){var t,e,i;return(i=(e=(t=r?.toString())==null?void 0:t.split("RRULE:"))==null?void 0:e[1])==null?void 0:i.replace(/(UNTIL=\d+T\d+)Z/,"$1")}_setRRuleValue(r,t){var e;let i=(e=this._rrule)==null?void 0:e.origOptions,s=this._scheduleWithOffset;if(t==="interval"||t==="freq"||t.startsWith("by"))if(t==="byweekday")i.byweekday=r.map(n=>L[n]);else if(t==="freq"){for(let n of Go)delete i[n];i[t]=r}else i[t]=r;else if(t==="start"){let[n,a,d]=r.split("-").map(Number),c=(0,Q.default)(s.start).set({year:n,month:a-1,date:d});i&&(i.dtstart=c.toDate()),s.start=c.valueOf()}else if(t==="end"){let[n,a,d]=r.split("-").map(Number);s.end=(0,Q.default)(s.end).set({year:n,month:a-1,date:d}).toDate().getTime()}else if(t==="start-time"){let[n,a]=r.split(":");i?i.dtstart=(0,Q.default)(s.start).set({hour:n,minute:a,second:0,millisecond:0}).toDate():i=new L({dtstart:(0,Q.default)(s.start).set({hour:n,minute:a,second:0,millisecond:0}).toDate()}).origOptions,s.start=(0,Q.default)(i.dtstart).toDate().getTime()}else if(t==="end-time"){let[n,a]=r.split(":");s.end=(0,Q.default)(s.end).set({hour:n,minute:a,second:0,millisecond:0}).toDate().getTime()}else switch(t){case"all-day":this.isAllDay=r;break;case"recurrence-ends":r==="until"?(i.until=this._until,delete i.count):(r==="count"?i.count=this._count:delete i.count,delete i.until),this._ends=r;break;case"until":this._until=new Date(r),i.until=this._until;break;case"count":this._count=r,i.count=this._count}this._eventType===He.recurrence?(this._rrule=new L(i),this._scheduleWithOffset=Object.assign(Object.assign({},s),{recurrence:this._getRRule()})):this._scheduleWithOffset=Object.assign({},s)}_setCalendarEventType(r){var t,e,i,s,n,a,d,c,f,m;let _=r.target.value;this._eventType=_;let v=(0,Q.default)().startOf("day");if(_===He.default){this.schedule={start:(e=(t=this.defaultSchedule)==null?void 0:t.start)!=null?e:v.valueOf()-this.timezoneOffset,end:(s=(i=this.defaultSchedule)==null?void 0:i.end)!=null?s:v.endOf("day").valueOf()-this.timezoneOffset};let y=(n=this.defaultSchedule)==null?void 0:n.recurrence;this._rrule=y?L.fromString(y):void 0;return}let b={start:(d=(a=this._scheduleWithOffset)==null?void 0:a.start)!=null?d:v.valueOf(),end:(f=(c=this._scheduleWithOffset)==null?void 0:c.end)!=null?f:v.endOf("day").valueOf()};_===He.period?this._scheduleWithOffset=b:this._scheduleWithOffset=Object.assign(Object.assign({},b),{recurrence:(m=this._getRRule())!=null?m:"FREQ=DAILY"})}_applyTimezoneOffset(r,t){if(r){let{start:e,end:i,recurrence:s}=Object.assign({},r);if(s&&L.fromString(s).origOptions.until){let n=L.fromString(s).origOptions;n.until=new Date(Number(n.until)+t),s=this._getRRule(new L(n))}return{start:e!=null?e+t:e,end:i!=null?i+t:i,recurrence:s}}}_getDefaultMessageOptions(){var r,t;return{date:Q.default.utc((r=this.defaultSchedule)==null?void 0:r.start).format("YYYY-MM-DD"),time:Q.default.utc((t=this.defaultSchedule)==null?void 0:t.start).format("HH:mm")}}render(){return w`
      <or-vaadin-button style="max-width: 100%" @click="${()=>this._dialog.open()}"
        >${this._timeLabel}</or-vaadin-button
      >
      <or-vaadin-dialog
        id="scheduler"
        header-title="${j.t(this.header)}"
        ?opened="${this.open}"
        @closed="${this._onClose}"
        ${_l(this._getDialogHeader,[])}
        ${ml(this._getDialogContent,[this.defaultSchedule,this.defaultEventTypeLabel,this.disabledFrequencies,this.disabledRRuleParts,this.header,this.isAllDay,this.schedule,this.timezoneOffset,this._count,this._ends,this._rrule])}
        ${gl(this._getDialogFooter,[])}
      ></or-vaadin-dialog>
    `}_getDialogHeader(){return w`
      <vaadin-button theme="tertiary" @click="${this._onClose}">
        <or-icon icon="mdi:close"></or-icon>
      </vaadin-button>
    `}_getDialogContent(){let r=[{value:"default",label:j.t(this.defaultEventTypeLabel,this._getDefaultMessageOptions())},{value:"period",label:j.t("planPeriod")},{value:"recurrence",label:j.t("planRecurrence")}];return w` <style>
        /* Showing just a number is not intuitive when using numbers as options */
        vaadin-multi-select-combo-box-chip[slot="overflow"]::part(label)::before {
          content: "+";
        }

        vaadin-checkbox {
          font-weight: 600;
        }

        .period {
          display: flex;
          flex: 1;
          gap: 2px;
        }

        .section {
          background-color: white;
          border-radius: var(--lumo-border-radius-m);
          display: flex;
          flex-direction: column;
          padding: var(--lumo-space-l);
        }

        .label {
          margin-left: 10px;
        }
        or-vaadin-number-field[disabled] + .label {
          color: var(--lumo-contrast-20pct);
          user-select: revert;
          -webkit-user-select: none;
        }

        @media only screen and (min-width: 768px) {
          or-vaadin-date-picker[combined] {
            --vaadin-input-field-top-end-radius: 0;
            --vaadin-input-field-bottom-end-radius: 0;
          }
          or-vaadin-time-picker {
            --vaadin-input-field-top-start-radius: 0;
            --vaadin-input-field-bottom-start-radius: 0;
          }
        }

        @media only screen and (max-width: 768px) {
          .period {
            flex-wrap: wrap;
          }
        }
      </style>
      <div style="display: flex; flex-direction: column; gap: var(--lumo-space-m)">
        <div id="event-type" class="section">
          <h4><or-translate value="schedule.type"></or-translate></h4>
          <or-vaadin-select
            style="flex: 1"
            .value="${this._eventType}"
            .items="${r}"
            @change="${this._setCalendarEventType}"
          ></or-vaadin-select>
        </div>
        ${St(this._eventType!==He.default,()=>this._getPeriodTemplate())}
        ${St(this._eventType===He.recurrence,()=>this._getRepeatTemplate())}
        ${St(this._eventType===He.recurrence,()=>this._getEndsTemplate())}
      </div>`}_getDialogFooter(){return w`
      ${St(this.removable,()=>w` <or-vaadin-button
            style="background-color: unset; margin-right: auto"
            theme="error"
            @click="${this._onDelete}"
          >
            <or-icon icon="or:trash" style="--or-icon-fill: white"></or-icon>
            <or-translate value="schedule.delete"></or-translate>
          </or-vaadin-button>`)}
      <or-vaadin-button theme="primary" @click="${this._onSave}"
        ><or-translate value="schedule.save"></or-translate
      ></or-vaadin-button>
    `}_onClose(){this._dialog.close()}_onDelete(){this._dialog.close(),this.dispatchEvent(new Xo)}_onSave(){var r;this._setAllDay(),this.dispatchEvent(new Zo((r=this.schedule)!=null?r:this.defaultSchedule)),this._dialog.close()}_onPartChange(r,t,e){return i=>{if(t==="detail"){rs.objectsEqual(i.detail.value,e,!0)||this._setRRuleValue(i.detail.value,r);return}this._setRRuleValue(i.target[t],r)}}_isAllowedFrequency(r){return r!=="SECONDLY"&&!this.disabledFrequencies.includes(r)}_getRepeatTemplate(){var r,t,e,i,s;let n=(t=(r=this._rrule)==null?void 0:r.origOptions.interval)!=null?t:1,a=(i=(e=this._rrule)==null?void 0:e.origOptions.freq)!=null?i:U.DAILY,d=Object.entries($p).map(([c,f])=>({value:String(U[c]),label:j.t(f,{count:n})})).filter(({value:c})=>this._isAllowedFrequency(U[c]));return w` <div id="recurrence" class="section">
      <h4><or-translate value="schedule.repeat"></or-translate></h4>
      <div style="display: flex; gap: 8px">
        ${St(!((s=this.disabledRRuleParts)!=null&&s.includes("interval")),()=>w`
            <or-vaadin-number-field
              min="1"
              max="9"
              step-buttons-visible
              style="width: 106px"
              .value="${n}"
              @change="${this._onPartChange("interval","value")}"
            >
            </or-vaadin-number-field>
          `)}
        <or-vaadin-select
          style="flex: 1;"
          .value="${a.toString()}"
          .items="${d}"
          @change="${this._onPartChange("freq","value")}"
        >
        </or-vaadin-select>
      </div>
      ${St(Go.some(c=>{var f;return(f=this._byRRuleParts)==null?void 0:f.includes(c)}),()=>w`
          <h4 style="margin-top: var(--lumo-space-l)">
            <or-translate value="schedule.repeatOn"></or-translate>
          </h4>
          <div>${this._getByRulePart("bymonth",ht.CHECKBOX_LIST,Object.entries(Cd))}</div>
          <div>
            ${this._getByRulePart("byweekno",ht.SELECT,pw)}
            ${this._getByRulePart("byyearday",ht.SELECT,mw)}
            ${this._getByRulePart("bymonthday",ht.SELECT,_w)}
          </div>
          <div>${this._getByRulePart("byweekday",ht.CHECKBOX_LIST,Object.entries(wd))}</div>
          <div>
            ${this._getByRulePart("byhour",ht.SELECT,gw)}
            ${this._getByRulePart("byminute",ht.SELECT,Vp)}
            ${this._getByRulePart("bysecond",ht.SELECT,Vp)}
          </div>
        `)}
    </div>`}_getByRulePart(r,t,e){var i,s,n,a;if(!((i=this._byRRuleParts)!=null&&i.includes(r)))return;let d=(a=(n=(s=this._rrule)==null?void 0:s.origOptions)==null?void 0:n[r])!=null?a:[],c=r==="byweekday"?d?.map(String):Array.isArray(d)?d:[d];return t===ht.CHECKBOX_LIST?w`
          <or-vaadin-checkbox-group .value="${c}" @value-changed="${this._onPartChange(r,"detail",c)}">
            ${e.map(([f,m])=>w`<vaadin-checkbox theme="button" value="${f}" label="${j.t(m).slice(0,3)}"></vaadin-checkbox>`)}
          </or-vaadin-checkbox-group>
        `:w`
          <or-vaadin-multi-select-combo-box
            .selectedItems="${c}"
            .label="${j.t(`rrule.${r}`)}"
            .items="${this.disableNegativeByPartValues?e.filter(f=>+f>0):e}"
            @selected-items-changed="${this._onPartChange(r,"detail",c)}"
          >
          </or-vaadin-multi-select-combo-box>
        `}_getPeriodTemplate(){let r=this._scheduleWithOffset;return w` <div id="period" class="section">
      <h4><or-translate value="period"></or-translate></h4>
      <div style="display: flex; gap: 8px">
        <div class="period">
          <or-vaadin-date-picker
            style="text-transform: capitalize"
            ?combined="${!this.isAllDay}"
            .value="${(0,Q.default)(r.start).format("YYYY-MM-DD")}"
            @change="${this._onPartChange("start","value")}"
            label="${j.t("from")}"
            .max="${(0,Q.default)(r.end).format("YYYY-MM-DD")}"
          >
          </or-vaadin-date-picker>
          <or-vaadin-time-picker
            style="margin-top: auto"
            ?hidden=${this.isAllDay}
            .value="${(0,Q.default)(r.start).format("HH:mm")}"
            @change="${this._onPartChange("start-time","value")}"
            .max="${(0,Q.default)(r.end).isSameOrBefore((0,Q.default)(r.start),"day")&&(0,Q.default)(r.end).format("HH:mm")}"
          >
          </or-vaadin-time-picker>
        </div>
        <div class="period">
          <or-vaadin-date-picker
            style="text-transform: capitalize"
            ?combined="${!this.isAllDay}"
            .value="${(0,Q.default)(r.end).format("YYYY-MM-DD")}"
            @change="${this._onPartChange("end","value")}"
            label="${j.t("to")}"
            .min="${(0,Q.default)(r.start).format("YYYY-MM-DD")}"
          >
          </or-vaadin-date-picker>
          <or-vaadin-time-picker
            style="margin-top: auto"
            ?hidden=${this.isAllDay}
            .value="${(0,Q.default)(r.end).format("HH:mm")}"
            @change="${this._onPartChange("end-time","value")}"
            .min="${(0,Q.default)(r.end).isSameOrBefore((0,Q.default)(r.start),"day")&&(0,Q.default)(r.start).format("HH:mm")}"
          >
          </or-vaadin-time-picker>
        </div>
      </div>
      <or-vaadin-checkbox
        .checked=${this.isAllDay}
        @change="${this._onPartChange("all-day","checked")}"
        .label="${j.t("allDay")}"
      ></or-vaadin-checkbox>
    </div>`}_getEndsTemplate(){return w` <div id="recurrence-ends" class="section">
      <h4><or-translate value="schedule._ends"></or-translate></h4>
      <div style="display: flex; gap: 8px;">
        <or-vaadin-radio-group
          style="padding-right: 10px; width: unset"
          .value="${this._ends}"
          theme="vertical"
          @change="${this._onPartChange("recurrence-ends","value")}"
        >
          ${Object.entries(Fp).filter(([r])=>{var t;return!((t=this.disabledRRuleParts)!=null&&t.includes(r))}).map(([r,t])=>w`
                <vaadin-radio-button style="margin: 6px 0" value="${r}" label="${j.t(t)}"></vaadin-radio-button>
              `)}
        </or-vaadin-radio-group>
        <div style="display: flex; flex-direction: column; flex: 1; ">
          ${St(!this.disabledRRuleParts.includes("until"),()=>w` <or-vaadin-date-time-picker
                style="margin-top: auto; padding: var(--lumo-space-s) 0"
                ?disabled="${this._ends!=="until"}"
                .value="${(0,Q.default)(this._until).format("YYYY-MM-DDTHH:mm")}"
                @change="${this._onPartChange("until","value")}"
              >
              </or-vaadin-date-time-picker>`)}
          ${St(!this.disabledRRuleParts.includes("count"),()=>w`<div style="display: inline-flex">
                <or-vaadin-number-field
                  ?disabled="${this._ends!=="count"}"
                  min="1"
                  style="width: 120px"
                  step-buttons-visible
                  .value="${this._count}"
                  @change="${this._onPartChange("count","value")}"
                >
                </or-vaadin-number-field
                ><or-translate
                  class="label"
                  value="schedule.count"
                  ?disabled="${this._ends!=="count"}"
                  .options="${{count:+this._count}}"
                >
                </or-translate>
              </div>`)}
        </div>
      </div>
    </div>`}};Oe.styles=C`
    or-vaadin-dialog::part(overlay) {
      max-width: 600px;
    }

    .time-label {
      display: flex;
      & > :first-child {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
  `,Ae([be({type:Object})],Oe.prototype,"defaultSchedule",void 0),Ae([be({type:String})],Oe.prototype,"defaultEventTypeLabel",void 0),Ae([be({type:Boolean})],Oe.prototype,"disableNegativeByPartValues",void 0),Ae([be({type:Array})],Oe.prototype,"disabledFrequencies",void 0),Ae([be({type:Array})],Oe.prototype,"disabledRRuleParts",void 0),Ae([be({type:Object})],Oe.prototype,"disabledByPartCombinations",void 0),Ae([be({type:String})],Oe.prototype,"header",void 0),Ae([be({type:Boolean})],Oe.prototype,"isAllDay",void 0),Ae([be({type:Boolean})],Oe.prototype,"open",void 0),Ae([be({type:Boolean})],Oe.prototype,"removable",void 0),Ae([be({type:Object})],Oe.prototype,"schedule",void 0),Ae([be({type:Number})],Oe.prototype,"timezoneOffset",void 0),Ae([Kr()],Oe.prototype,"_count",void 0),Ae([Kr()],Oe.prototype,"_ends",void 0),Ae([Kr()],Oe.prototype,"_eventType",void 0),Ae([Kr()],Oe.prototype,"_rrule",void 0),Ae([Oh("#scheduler")],Oe.prototype,"_dialog",void 0),Oe=Ae([q("or-scheduler")],Oe);var vw=C`
  :host {
    display: block;
    position: relative;
    --vaadin-overlay-animation-duration: 0.3s;
    transition-duration: var(--vaadin-overlay-animation-duration);
  }

  :host([closing]) [part='overlay'] {
    animation-fill-mode: both;
  }

  :host([slot^='top']) {
    display: flex;
    align-items: end;
    --vaadin-overlay-translate-closed: 0% -30%;
  }

  :host([slot^='bottom']) {
    --vaadin-overlay-translate-closed: 0% 30%;
  }

  /* Cards on the sides slide in horizontally, once the vertical collapse is done */
  @media (min-width: 600px) and (min-height: 600px) {
    :host([slot$='start']) {
      --vaadin-overlay-translate-closed: -30% 0%;
      --vaadin-overlay-animation-delay: var(--vaadin-overlay-animation-duration);
    }

    :host([slot$='end']) {
      --vaadin-overlay-translate-closed: 30% 0%;
      --vaadin-overlay-animation-delay: var(--vaadin-overlay-animation-duration);
    }
  }

  :host([closing]) {
    animation-direction: reverse;
    animation-duration: var(--vaadin-overlay-animation-duration);
    animation-delay: var(--vaadin-overlay-animation-duration);
    transition-delay: var(--vaadin-overlay-animation-duration);
  }

  /* Cards scale down in place instead of sliding back out */
  /* WebKit/Safari needs these to be explicitly set on the part=overlay element as well */
  :host([closing]),
  :host([closing]) [part='overlay'] {
    --vaadin-overlay-translate-closed: 0%;
    --vaadin-overlay-scale-closed: 0.98;
    --vaadin-overlay-animation-delay: 0s;
  }

  [part='overlay'] {
    pointer-events: auto;
    box-sizing: border-box;
    width: var(--vaadin-notification-width, 40ch);
    max-width: 100%;
    padding: var(--vaadin-notification-padding, var(--vaadin-padding-s));
    background: var(--vaadin-notification-background, var(--vaadin-background-container));
    border: var(--vaadin-notification-border-width, 1px) solid
      var(--vaadin-notification-border-color, var(--vaadin-border-color-secondary));
    box-shadow: var(--vaadin-notification-shadow, 0 8px 24px -4px rgba(0, 0, 0, 0.3));
    border-radius: var(--vaadin-notification-border-radius, var(--vaadin-radius-l));
    cursor: default;
  }

  @media (forced-colors: active) {
    [part='overlay'] {
      border: 3px solid !important;
    }
  }

  /* The other cards make room for a card that opens, and close the gap when it is removed */
  @media (prefers-reduced-motion: no-preference) {
    @supports (interpolate-size: allow-keywords) {
      :host {
        interpolate-size: allow-keywords;
        transition-property: height, margin-top, margin-bottom;
      }

      @starting-style {
        :host([opening]:not(:nth-child(1 of [slot='middle']))),
        :host([closing]) {
          height: 0;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
      }

      :host([closing]) {
        height: 0;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        transition-delay: var(--vaadin-overlay-animation-duration);
      }
    }

    /* Without interpolate-size, only the margins animate, and max-height stands in for the height */
    @supports not (interpolate-size: allow-keywords) {
      :host([opening]:not(:nth-child(1 of [slot='middle']))),
      :host([closing]) {
        animation-name: --notification-max-height, --notification-margins;
        animation-duration: calc(var(--vaadin-overlay-animation-duration) * 2 + var(--vaadin-overlay-animation-delay));
        animation-delay: 0s;
        animation-timing-function: ease-in-out, cubic-bezier(0.4, 1.1, 0, 1);
      }
    }
  }

  @media (prefers-reduced-motion) {
    /* The height animation of the fallback above is a keyframe animation, not a transition */
    :host(:is([opening], [closing])) {
      animation-name: --fade !important;
    }
  }

  @keyframes --notification-max-height {
    0% {
      max-height: 0;
    }

    50% {
      max-height: 20em;
    }
  }

  @keyframes --notification-margins {
    0% {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
`,zp=[qn,vw];var Yp=C`
  :host {
    /* How much space to reserve for overlay box shadow, to prevent clipping it with overflow:auto */
    --_paint-area: 2em;
    /* Space between notifications and the viewport */
    --_padding: var(--vaadin-notification-viewport-inset, var(--vaadin-padding-s));
    /* Space between notifications */
    --_gap: var(--vaadin-notification-container-gap, var(--vaadin-gap-s));
    display: grid;
    /* top-stretch, top and bottom regions, bottom-stretch */
    grid-template-rows: auto 1fr auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: max(env(safe-area-inset-top, 0px), var(--_padding)) max(env(safe-area-inset-right, 0px), var(--_padding))
      max(env(safe-area-inset-bottom, 0px), var(--_padding)) max(env(safe-area-inset-left, 0px), var(--_padding));
    border: 0;
    background: transparent;
    pointer-events: none;
    interpolate-size: allow-keywords;
  }

  :host > * {
    grid-column: 1;
  }

  [region-group] {
    position: relative;
    grid-row: 2 / 3;
  }

  [region] {
    max-width: 100%;
    max-height: 100%;
    pointer-events: auto;
    scrollbar-width: none;
  }

  /* scrollbar-width is supported since Safari 18.2, use the following for earlier */
  [region]::-webkit-scrollbar {
    display: none;
  }

  [region='top-stretch'] {
    grid-row: 1;
    z-index: 2;
    --vaadin-notification-width: 100%;
  }

  [region='bottom-stretch'] {
    grid-row: 3;
    z-index: 2;
    --vaadin-notification-width: 100%;
  }

  [region='middle'],
  [region-group] > [region] {
    position: absolute;
  }

  [region='middle'] {
    position: fixed;
    top: 50%;
    left: 50%;
    translate: round(-50%, 1px) round(-50%, 1px);
    max-width: calc(100% - var(--_padding) * 2);
  }

  [region]:where(:hover, :focus-within) {
    z-index: 1;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--_paint-area);
  }

  [region]:not([region='middle'], [region$='center']):where(:hover, :focus-within) {
    margin-inline: calc(var(--_paint-area) * -1);
  }

  [region]:not([region='middle']):where(:hover, :focus-within) {
    margin-block: calc(var(--_paint-area) * -1);
  }

  [region-group='top'] > [region] {
    top: 0;
  }

  [region-group='bottom'] > [region] {
    bottom: 0;
  }

  [region-group] > [region$='start'] {
    inset-inline-start: 0;
  }

  [region-group] > [region$='center'] {
    left: 50%;
    translate: round(-50%, 1px);
  }

  [region-group] > [region$='end'] {
    inset-inline-end: 0;
  }

  ::slotted(*) {
    margin-bottom: var(--_gap);
  }

  :is([region^='bottom'], [region='middle']) ::slotted(*) {
    margin-top: var(--_gap);
    margin-bottom: 0;
  }
`;var Up=r=>class extends r{static get properties(){return{overlayClass:{type:String},_overlayElement:{type:Object}}}static get observers(){return["__updateOverlayClassNames(overlayClass, _overlayElement)"]}__updateOverlayClassNames(e,i){if(!i||e===void 0)return;let{classList:s}=i;if(this.__initialClasses||(this.__initialClasses=new Set(s)),Array.isArray(this.__previousClasses)){let a=this.__previousClasses.filter(d=>!this.__initialClasses.has(d));a.length>0&&s.remove(...a)}let n=typeof e=="string"?e.split(" ").filter(Boolean):[];n.length>0&&s.add(...n),this.__previousClasses=n}};var jp=r=>class extends r{static get properties(){return{opened:{type:Boolean,value:!1,sync:!0,observer:"_openedChanged"}}}constructor(){super(),this._boundVaadinOverlayClose=this._onVaadinOverlayClose.bind(this),fi&&(this._boundIosResizeListener=()=>this._detectIosNavbar())}firstUpdated(t){super.firstUpdated(t),this.popover="manual"}bringToFront(){this.matches(":popover-open")&&(this.hidePopover(),this.showPopover())}_openedChanged(t){t?(document.body.appendChild(this),this.showPopover(),document.addEventListener("vaadin-overlay-close",this._boundVaadinOverlayClose),this._boundIosResizeListener&&(this._detectIosNavbar(),window.addEventListener("resize",this._boundIosResizeListener))):(document.body.removeChild(this),this.hidePopover(),document.removeEventListener("vaadin-overlay-close",this._boundVaadinOverlayClose),this._boundIosResizeListener&&window.removeEventListener("resize",this._boundIosResizeListener))}_detectIosNavbar(){let t=window.innerHeight,i=window.innerWidth>t,s=document.documentElement.clientHeight;i&&s>t?this.style.bottom=`${s-t}px`:this.style.bottom="0"}_onVaadinOverlayClose(t){t.detail.sourceEvent?.composedPath().indexOf(this)>=0&&t.preventDefault()}},Hp=r=>class extends bt(Up(r)){static get properties(){return{assertive:{type:Boolean,value:!1,sync:!0},duration:{type:Number,value:5e3,sync:!0},opened:{type:Boolean,value:!1,notify:!0,sync:!0,observer:"_openedChanged"},position:{type:String,value:"bottom-start",observer:"_positionChanged",sync:!0},renderer:{type:Function,sync:!0}}}static get observers(){return["_durationChanged(duration, opened)","_rendererChanged(renderer, opened, _overlayElement)"]}static show(t,e){let i=customElements.get("vaadin-notification");return tc(t)?i._createAndShowNotification(s=>{_t(t,s)},e):i._createAndShowNotification(s=>{s.innerText=t},e)}static _createAndShowNotification(t,e){let i=document.createElement("vaadin-notification");return e&&Number.isFinite(e.duration)&&(i.duration=e.duration),e?.position&&(i.position=e.position),e?.assertive&&(i.assertive=e.assertive),e?.theme&&i.setAttribute("theme",e.theme),e?.className&&(i.overlayClass=e.className),i.renderer=t,document.body.appendChild(i),i.opened=!0,i.addEventListener("opened-changed",s=>{s.detail.value||i.remove()}),i}get _container(){let t=customElements.get("vaadin-notification");return t._container||(t._container=document.createElement("vaadin-notification-container"),document.body.appendChild(t._container)),t._container}get _card(){return this._overlayElement}ready(){super.ready(),this._overlayElement=this.shadowRoot.querySelector("vaadin-notification-card")}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected||(this.opened=!1)})}requestContentUpdate(){!this.renderer||!this._card||this.renderer(this._card,this)}__computeAriaLive(t){return t?"assertive":"polite"}_rendererChanged(t,e,i){if(!i)return;let s=this._oldRenderer!==t;this._oldRenderer=t,s&&(i.innerHTML="",delete i._$litPart$),e&&(this._didAnimateNotificationAppend||this._animatedAppendNotificationCard(),this.requestContentUpdate())}open(){this.opened=!0}close(){this.opened=!1}_openedChanged(t){t?(this._container.opened=!0,this._animatedAppendNotificationCard()):this._card&&this._closeNotificationCard()}__cleanUpOpeningClosingState(){this._card.removeAttribute("opening"),this._card.removeAttribute("closing"),this._card.removeEventListener("animationend",this.__animationEndListener)}__shouldAnimateCard(){let t=getComputedStyle(this._card),e=t.getPropertyValue("animation-name"),i=t.getPropertyValue("animation-duration").split(",").some(s=>parseFloat(s)>0);return t.getPropertyValue("display")!=="none"&&e&&e!=="none"&&i}__onCardAnimationEnd(t){this.__animationEndListener=e=>{e.target===this._card&&t()},this._card.addEventListener("animationend",this.__animationEndListener)}_animatedAppendNotificationCard(){this._card?(this.__cleanUpOpeningClosingState(),this._card.setAttribute("opening",""),this._appendNotificationCard(),this.__shouldAnimateCard()?this.__onCardAnimationEnd(()=>this.__cleanUpOpeningClosingState()):this.__cleanUpOpeningClosingState(),this._didAnimateNotificationAppend=!0):this._didAnimateNotificationAppend=!1}_appendNotificationCard(){if(this._card){if(!this._container.shadowRoot.querySelector(`slot[name="${this.position}"]`)){console.warn(`Invalid alignment parameter provided: position=${this.position}`);return}this._container.firstElementChild&&this._container.bringToFront(),this._card.slot=this.position,this._container.firstElementChild&&/top/u.test(this.position)?this._container.insertBefore(this._card,this._container.firstElementChild):this._container.appendChild(this._card)}}_removeNotificationCard(){this._card&&(this._card.parentNode&&this._card.parentNode.removeChild(this._card),this._card.removeAttribute("closing"),this._container.opened=!!this._container.firstElementChild,this.dispatchEvent(new CustomEvent("closed")))}_closeNotificationCard(){this._durationTimeoutId&&clearTimeout(this._durationTimeoutId),this._animatedRemoveNotificationCard()}_animatedRemoveNotificationCard(){this.__cleanUpOpeningClosingState(),this._card.setAttribute("closing",""),this.__shouldAnimateCard()?this.__onCardAnimationEnd(()=>{this._removeNotificationCard(),this.__cleanUpOpeningClosingState()}):this._removeNotificationCard()}_positionChanged(){this.opened&&this._animatedAppendNotificationCard()}_durationChanged(t,e){e&&(clearTimeout(this._durationTimeoutId),t>0&&(this._durationTimeoutId=setTimeout(()=>this.close(),t)))}};var kd=class extends jp(I(K(O(A(S))))){static get is(){return"vaadin-notification-container"}static get styles(){return Yp}render(){return w`
      <div region="top-stretch"><slot name="top-stretch"></slot></div>
      <div region-group="top">
        <div region="top-start"><slot name="top-start"></slot></div>
        <div region="top-center"><slot name="top-center"></slot></div>
        <div region="top-end"><slot name="top-end"></slot></div>
      </div>
      <div region="middle"><slot name="middle"></slot></div>
      <div region-group="bottom">
        <div region="bottom-start"><slot name="bottom-start"></slot></div>
        <div region="bottom-center"><slot name="bottom-center"></slot></div>
        <div region="bottom-end"><slot name="bottom-end"></slot></div>
      </div>
      <div region="bottom-stretch"><slot name="bottom-stretch"></slot></div>
    `}},Ed=class extends I(O(A(S))){static get is(){return"vaadin-notification-card"}static get styles(){return zp}render(){return w`
      <div part="overlay">
        <div part="content">
          <slot></slot>
        </div>
      </div>
    `}ready(){super.ready(),this.setAttribute("role","alert")}},Td=class extends Hp(K(I(O(S)))){static get is(){return"vaadin-notification"}static get styles(){return C`
      :host {
        display: none !important;
      }
    `}render(){return w`
      <vaadin-notification-card
        theme="${re(this._theme)}"
        aria-live="${this.__computeAriaLive(this.assertive)}"
      ></vaadin-notification-card>
    `}};E(kd);E(Ed);E(Td);export{fw as INTUITIVE_NOT_APPLICABLE,j as i18next};
/*! Bundled license information:

moment/moment.js:
  (*! moment.js *)
  (*! version : 2.31.0 *)
  (*! authors : Tim Wood, Iskren Chernev, Moment.js contributors *)
  (*! license : MIT *)
  (*! momentjs.com *)

@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/reactive-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
lit-html/directive.js:
lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
lit-html/directives/when.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@vaadin/a11y-base/src/styles/sr-only-styles.js:
@vaadin/component-base/src/define.js:
@vaadin/component-base/src/dom-utils.js:
@vaadin/component-base/src/dir-mixin.js:
@vaadin/component-base/src/element-mixin.js:
@vaadin/component-base/src/polylit-mixin.js:
@vaadin/vaadin-themable-mixin/src/css-property-observer.js:
@vaadin/vaadin-themable-mixin/src/css-utils.js:
@vaadin/vaadin-themable-mixin/src/lumo-injector.js:
@vaadin/vaadin-themable-mixin/lumo-injection-mixin.js:
@vaadin/component-base/src/unique-id-utils.js:
@vaadin/component-base/src/slot-controller.js:
@vaadin/a11y-base/src/disabled-mixin.js:
@vaadin/a11y-base/src/keyboard-mixin.js:
@vaadin/a11y-base/src/active-mixin.js:
@vaadin/a11y-base/src/focus-utils.js:
@vaadin/a11y-base/src/focus-mixin.js:
@vaadin/a11y-base/src/tabindex-mixin.js:
@vaadin/field-base/src/styles/checkable-base-styles.js:
@vaadin/field-base/src/styles/field-base-styles.js:
@vaadin/a11y-base/src/delegate-focus-mixin.js:
@vaadin/component-base/src/slot-styles-mixin.js:
@vaadin/component-base/src/delegate-state-mixin.js:
@vaadin/field-base/src/input-mixin.js:
@vaadin/field-base/src/checked-mixin.js:
@vaadin/a11y-base/src/field-aria-controller.js:
@vaadin/field-base/src/error-controller.js:
@vaadin/field-base/src/helper-controller.js:
@vaadin/field-base/src/label-controller.js:
@vaadin/field-base/src/label-mixin.js:
@vaadin/field-base/src/validate-mixin.js:
@vaadin/field-base/src/field-mixin.js:
@vaadin/field-base/src/input-controller.js:
@vaadin/field-base/src/labelled-input-controller.js:
@vaadin/component-base/src/browser-utils.js:
@vaadin/a11y-base/src/focus-restoration-controller.js:
@vaadin/a11y-base/src/focus-trap-controller.js:
@vaadin/component-base/src/dir-utils.js:
@vaadin/component-base/src/media-query-controller.js:
@vaadin/component-base/src/resize-mixin.js:
@vaadin/multi-select-combo-box/src/styles/vaadin-multi-select-combo-box-chip-base-styles.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-chip.js:
@vaadin/input-container/src/styles/vaadin-input-container-base-styles.js:
@vaadin/input-container/src/vaadin-input-container.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-container.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-item.js:
@vaadin/multi-select-combo-box/src/styles/vaadin-multi-select-combo-box-overlay-base-styles.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-overlay.js:
@vaadin/component-base/src/virtualizer-iron-list-adapter.js:
@vaadin/multi-select-combo-box/src/styles/vaadin-multi-select-combo-box-scroller-base-styles.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-scroller.js:
@vaadin/field-base/src/styles/button-base-styles.js:
@vaadin/field-base/src/styles/input-field-shared-styles.js:
@vaadin/multi-select-combo-box/src/styles/vaadin-multi-select-combo-box-base-styles.js:
@vaadin/component-base/src/data-provider-controller/cache.js:
@vaadin/component-base/src/data-provider-controller/helpers.js:
@vaadin/component-base/src/data-provider-controller/data-provider-controller.js:
@vaadin/field-base/src/clear-button-mixin.js:
@vaadin/field-base/src/input-constraints-mixin.js:
@vaadin/field-base/src/input-control-mixin.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-mixin.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box.js:
@vaadin/number-field/src/styles/vaadin-number-field-base-styles.js:
@vaadin/field-base/src/input-field-mixin.js:
@vaadin/number-field/src/vaadin-number-field-mixin.js:
@vaadin/number-field/src/vaadin-number-field.js:
@vaadin/text-area/src/styles/vaadin-text-area-base-styles.js:
@vaadin/field-base/src/text-area-controller.js:
@vaadin/text-area/src/vaadin-text-area-mixin.js:
@vaadin/text-area/src/vaadin-text-area.js:
@vaadin/text-field/src/vaadin-text-field-mixin.js:
@vaadin/field-base/src/virtual-keyboard-controller.js:
@vaadin/field-base/src/pattern-mixin.js:
  (**
   * @license
   * Copyright (c) 2021 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/vaadin-usage-statistics/vaadin-usage-statistics-collect.js:
  (*! vaadin-dev-mode:start
    (function () {
  'use strict';
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  
  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  
  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  
  var getPolymerVersion = function getPolymerVersion() {
    return window.Polymer && window.Polymer.version;
  };
  
  var StatisticsGatherer = function () {
    function StatisticsGatherer(logger) {
      classCallCheck(this, StatisticsGatherer);
  
      this.now = new Date().getTime();
      this.logger = logger;
    }
  
    createClass(StatisticsGatherer, [{
      key: 'frameworkVersionDetectors',
      value: function frameworkVersionDetectors() {
        return {
          'Flow': function Flow() {
            if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
              var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
                return window.Vaadin.Flow.clients[key];
              }).filter(function (client) {
                return client.getVersionInfo;
              }).map(function (client) {
                return client.getVersionInfo().flow;
              });
              if (flowVersions.length > 0) {
                return flowVersions[0];
              }
            }
          },
          'Vaadin Framework': function VaadinFramework() {
            if (window.vaadin && window.vaadin.clients) {
              var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
                return client.getVersionInfo;
              }).map(function (client) {
                return client.getVersionInfo().vaadinVersion;
              });
              if (frameworkVersions.length > 0) {
                return frameworkVersions[0];
              }
            }
          },
          'AngularJs': function AngularJs() {
            if (window.angular && window.angular.version && window.angular.version) {
              return window.angular.version.full;
            }
          },
          'Angular': function Angular() {
            if (window.ng) {
              var tags = document.querySelectorAll("[ng-version]");
              if (tags.length > 0) {
                return tags[0].getAttribute("ng-version");
              }
              return "Unknown";
            }
          },
          'Backbone.js': function BackboneJs() {
            if (window.Backbone) {
              return window.Backbone.VERSION;
            }
          },
          'React': function React() {
            var reactSelector = '[data-reactroot], [data-reactid]';
            if (!!document.querySelector(reactSelector)) {
              // React does not publish the version by default
              return "unknown";
            }
          },
          'Ember': function Ember() {
            if (window.Em && window.Em.VERSION) {
              return window.Em.VERSION;
            } else if (window.Ember && window.Ember.VERSION) {
              return window.Ember.VERSION;
            }
          },
          'jQuery': function (_jQuery) {
            function jQuery() {
              return _jQuery.apply(this, arguments);
            }
  
            jQuery.toString = function () {
              return _jQuery.toString();
            };
  
            return jQuery;
          }(function () {
            if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
              return jQuery.prototype.jquery;
            }
          }),
          'Polymer': function Polymer() {
            var version = getPolymerVersion();
            if (version) {
              return version;
            }
          },
          'LitElement': function LitElement() {
            var version = window.litElementVersions && window.litElementVersions[0];
            if (version) {
              return version;
            }
          },
          'LitHtml': function LitHtml() {
            var version = window.litHtmlVersions && window.litHtmlVersions[0];
            if (version) {
              return version;
            }
          },
          'Vue.js': function VueJs() {
            if (window.Vue) {
              return window.Vue.version;
            }
          }
        };
      }
    }, {
      key: 'getUsedVaadinElements',
      value: function getUsedVaadinElements(elements) {
        var version = getPolymerVersion();
        var elementClasses = void 0;
        // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
        // Check all locations calling the method getEntries() in
        // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
        // Currently it is only used by BootstrapHandler.
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: components classes are stored in window.Vaadin
          elementClasses = Object.keys(window.Vaadin).map(function (c) {
            return window.Vaadin[c];
          }).filter(function (c) {
            return c.is;
          });
        } else {
          // Polymer 3: components classes are stored in window.Vaadin.registrations
          elementClasses = window.Vaadin.registrations || [];
        }
        elementClasses.forEach(function (klass) {
          var version = klass.version ? klass.version : "0.0.0";
          elements[klass.is] = { version: version };
        });
      }
    }, {
      key: 'getUsedVaadinThemes',
      value: function getUsedVaadinThemes(themes) {
        ['Lumo', 'Material'].forEach(function (themeName) {
          var theme;
          var version = getPolymerVersion();
          if (version && version.indexOf('2') === 0) {
            // Polymer 2: themes are stored in window.Vaadin
            theme = window.Vaadin[themeName];
          } else {
            // Polymer 3: themes are stored in custom element registry
            theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
          }
          if (theme && theme.version) {
            themes[themeName] = { version: theme.version };
          }
        });
      }
    }, {
      key: 'getFrameworks',
      value: function getFrameworks(frameworks) {
        var detectors = this.frameworkVersionDetectors();
        Object.keys(detectors).forEach(function (framework) {
          var detector = detectors[framework];
          try {
            var version = detector();
            if (version) {
              frameworks[framework] = { version: version };
            }
          } catch (e) {}
        });
      }
    }, {
      key: 'gather',
      value: function gather(storage) {
        var storedStats = storage.read();
        var gatheredStats = {};
        var types = ["elements", "frameworks", "themes"];
  
        types.forEach(function (type) {
          gatheredStats[type] = {};
          if (!storedStats[type]) {
            storedStats[type] = {};
          }
        });
  
        var previousStats = JSON.stringify(storedStats);
  
        this.getUsedVaadinElements(gatheredStats.elements);
        this.getFrameworks(gatheredStats.frameworks);
        this.getUsedVaadinThemes(gatheredStats.themes);
  
        var now = this.now;
        types.forEach(function (type) {
          var keys = Object.keys(gatheredStats[type]);
          keys.forEach(function (key) {
            if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
              storedStats[type][key] = { firstUsed: now };
            }
            // Discards any previously logged version number
            storedStats[type][key].version = gatheredStats[type][key].version;
            storedStats[type][key].lastUsed = now;
          });
        });
  
        var newStats = JSON.stringify(storedStats);
        storage.write(newStats);
        if (newStats != previousStats && Object.keys(storedStats).length > 0) {
          this.logger.debug("New stats: " + newStats);
        }
      }
    }]);
    return StatisticsGatherer;
  }();
  
  var StatisticsStorage = function () {
    function StatisticsStorage(key) {
      classCallCheck(this, StatisticsStorage);
  
      this.key = key;
    }
  
    createClass(StatisticsStorage, [{
      key: 'read',
      value: function read() {
        var localStorageStatsString = localStorage.getItem(this.key);
        try {
          return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
        } catch (e) {
          return {};
        }
      }
    }, {
      key: 'write',
      value: function write(data) {
        localStorage.setItem(this.key, data);
      }
    }, {
      key: 'clear',
      value: function clear() {
        localStorage.removeItem(this.key);
      }
    }, {
      key: 'isEmpty',
      value: function isEmpty() {
        var storedStats = this.read();
        var empty = true;
        Object.keys(storedStats).forEach(function (key) {
          if (Object.keys(storedStats[key]).length > 0) {
            empty = false;
          }
        });
  
        return empty;
      }
    }]);
    return StatisticsStorage;
  }();
  
  var StatisticsSender = function () {
    function StatisticsSender(url, logger) {
      classCallCheck(this, StatisticsSender);
  
      this.url = url;
      this.logger = logger;
    }
  
    createClass(StatisticsSender, [{
      key: 'send',
      value: function send(data, errorHandler) {
        var logger = this.logger;
  
        if (navigator.onLine === false) {
          logger.debug("Offline, can't send");
          errorHandler();
          return;
        }
        logger.debug("Sending data to " + this.url);
  
        var req = new XMLHttpRequest();
        req.withCredentials = true;
        req.addEventListener("load", function () {
          // Stats sent, nothing more to do
          logger.debug("Response: " + req.responseText);
        });
        req.addEventListener("error", function () {
          logger.debug("Send failed");
          errorHandler();
        });
        req.addEventListener("abort", function () {
          logger.debug("Send aborted");
          errorHandler();
        });
        req.open("POST", this.url);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(data);
      }
    }]);
    return StatisticsSender;
  }();
  
  var StatisticsLogger = function () {
    function StatisticsLogger(id) {
      classCallCheck(this, StatisticsLogger);
  
      this.id = id;
    }
  
    createClass(StatisticsLogger, [{
      key: '_isDebug',
      value: function _isDebug() {
        return localStorage.getItem("vaadin." + this.id + ".debug");
      }
    }, {
      key: 'debug',
      value: function debug(msg) {
        if (this._isDebug()) {
          console.info(this.id + ": " + msg);
        }
      }
    }]);
    return StatisticsLogger;
  }();
  
  var UsageStatistics = function () {
    function UsageStatistics() {
      classCallCheck(this, UsageStatistics);
  
      this.now = new Date();
      this.timeNow = this.now.getTime();
      this.gatherDelay = 10; // Delay between loading this file and gathering stats
      this.initialDelay = 24 * 60 * 60;
  
      this.logger = new StatisticsLogger("statistics");
      this.storage = new StatisticsStorage("vaadin.statistics.basket");
      this.gatherer = new StatisticsGatherer(this.logger);
      this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
    }
  
    createClass(UsageStatistics, [{
      key: 'maybeGatherAndSend',
      value: function maybeGatherAndSend() {
        var _this = this;
  
        if (localStorage.getItem(UsageStatistics.optOutKey)) {
          return;
        }
        this.gatherer.gather(this.storage);
        setTimeout(function () {
          _this.maybeSend();
        }, this.gatherDelay * 1000);
      }
    }, {
      key: 'lottery',
      value: function lottery() {
        return true;
      }
    }, {
      key: 'currentMonth',
      value: function currentMonth() {
        return this.now.getYear() * 12 + this.now.getMonth();
      }
    }, {
      key: 'maybeSend',
      value: function maybeSend() {
        var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
        var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));
  
        if (!firstUse) {
          // Use a grace period to avoid interfering with tests, incognito mode etc
          firstUse = this.timeNow;
          localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
        }
  
        if (this.timeNow < firstUse + this.initialDelay * 1000) {
          this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
          return;
        }
        if (this.currentMonth() <= monthProcessed) {
          this.logger.debug("This month has already been processed");
          return;
        }
        localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
        // Use random sampling
        if (this.lottery()) {
          this.logger.debug("Congratulations, we have a winner!");
        } else {
          this.logger.debug("Sorry, no stats from you this time");
          return;
        }
  
        this.send();
      }
    }, {
      key: 'send',
      value: function send() {
        // Ensure we have the latest data
        this.gatherer.gather(this.storage);
  
        // Read, send and clean up
        var data = this.storage.read();
        data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
        data["usageStatisticsVersion"] = UsageStatistics.version;
        var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
        var self = this;
        this.sender.send(info + JSON.stringify(data), function () {
          // Revert the 'month processed' flag
          localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
        });
      }
    }], [{
      key: 'version',
      get: function get$1() {
        return '2.1.2';
      }
    }, {
      key: 'firstUseKey',
      get: function get$1() {
        return 'vaadin.statistics.firstuse';
      }
    }, {
      key: 'monthProcessedKey',
      get: function get$1() {
        return 'vaadin.statistics.monthProcessed';
      }
    }, {
      key: 'optOutKey',
      get: function get$1() {
        return 'vaadin.statistics.optout';
      }
    }]);
    return UsageStatistics;
  }();
  
  try {
    window.Vaadin = window.Vaadin || {};
    window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
    window.Vaadin.usageStatsChecker.maybeGatherAndSend();
  } catch (e) {
    // Intentionally ignored as this is not a problem in the app being developed
  }
  
  }());
  
    vaadin-dev-mode:end **)

@vaadin/component-base/src/async.js:
  (**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   *)

@vaadin/component-base/src/debounce.js:
@vaadin/component-base/src/gestures.js:
  (**
  @license
  Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  *)

@vaadin/component-base/src/path-utils.js:
@vaadin/component-base/src/slot-observer.js:
@vaadin/select/src/button-controller.js:
@vaadin/component-base/src/overlay-class-mixin.js:
  (**
   * @license
   * Copyright (c) 2023 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/component-base/src/css-utils.js:
@vaadin/component-base/src/i18n-mixin.js:
@vaadin/component-base/src/styles/loader-styles.js:
  (**
   * @license
   * Copyright (c) 2025 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/component-base/src/warnings.js:
@vaadin/vaadin-themable-mixin/src/lumo-modules.js:
@vaadin/component-base/src/virtualizer.js:
  (**
   * @license
   * Copyright (c) 2000 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/vaadin-themable-mixin/vaadin-theme-property-mixin.js:
@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js:
@vaadin/component-base/src/styles/style-props.js:
@vaadin/button/src/styles/vaadin-button-base-styles.js:
@vaadin/button/src/vaadin-button-mixin.js:
@vaadin/button/src/vaadin-button.js:
@vaadin/checkbox/src/styles/vaadin-checkbox-base-styles.js:
@vaadin/checkbox/src/vaadin-checkbox-mixin.js:
@vaadin/checkbox/src/vaadin-checkbox.js:
@vaadin/overlay/src/vaadin-overlay-focus-mixin.js:
@vaadin/overlay/src/vaadin-overlay-stack-mixin.js:
@vaadin/overlay/src/vaadin-overlay-mixin.js:
@vaadin/overlay/src/styles/vaadin-overlay-animation-base-styles.js:
@vaadin/overlay/src/styles/vaadin-overlay-base-styles.js:
@vaadin/dialog/src/styles/vaadin-dialog-overlay-base-styles.js:
@vaadin/dialog/src/vaadin-dialog-size-mixin.js:
@vaadin/dialog/src/vaadin-dialog-overflow-controller.js:
@vaadin/dialog/src/vaadin-dialog-overlay-mixin.js:
@vaadin/dialog/src/vaadin-dialog-overlay.js:
@vaadin/dialog/src/vaadin-dialog-base-mixin.js:
@vaadin/dialog/src/vaadin-dialog-utils.js:
@vaadin/dialog/src/vaadin-dialog-draggable-mixin.js:
@vaadin/dialog/src/vaadin-dialog-renderer-mixin.js:
@vaadin/dialog/src/vaadin-dialog-resizable-mixin.js:
@vaadin/dialog/src/vaadin-dialog.js:
@vaadin/dialog/src/lit/renderer-directives.js:
@vaadin/item/src/vaadin-item-mixin.js:
@vaadin/item/src/styles/vaadin-item-base-styles.js:
@vaadin/a11y-base/src/list-mixin.js:
@vaadin/list-box/src/styles/vaadin-list-box-base-styles.js:
@vaadin/overlay/src/vaadin-overlay-position-mixin.js:
@vaadin/radio-group/src/styles/vaadin-radio-button-base-styles.js:
@vaadin/radio-group/src/vaadin-radio-button-mixin.js:
@vaadin/radio-group/src/vaadin-radio-button.js:
@vaadin/radio-group/src/styles/vaadin-radio-group-base-styles.js:
@vaadin/radio-group/src/vaadin-radio-group-mixin.js:
@vaadin/radio-group/src/vaadin-radio-group.js:
@vaadin/select/src/vaadin-select-item.js:
@vaadin/select/src/vaadin-select-list-box.js:
@vaadin/select/src/styles/vaadin-select-overlay-base-styles.js:
@vaadin/select/src/vaadin-select-overlay-mixin.js:
@vaadin/select/src/vaadin-select-overlay.js:
@vaadin/select/src/styles/vaadin-select-value-button-base-styles.js:
@vaadin/select/src/vaadin-select-value-button.js:
@vaadin/select/src/styles/vaadin-select-base-styles.js:
@vaadin/select/src/vaadin-select-base-mixin.js:
@vaadin/select/src/vaadin-select.js:
@vaadin/select/src/lit/renderer-directives.js:
@vaadin/text-field/src/vaadin-text-field.js:
@vaadin/vaadin-themable-mixin/register-styles.js:
@vaadin/notification/src/styles/vaadin-notification-card-base-styles.js:
@vaadin/notification/src/styles/vaadin-notification-container-base-styles.js:
@vaadin/notification/src/vaadin-notification-mixin.js:
@vaadin/notification/src/vaadin-notification.js:
  (**
   * @license
   * Copyright (c) 2017 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/badge/src/styles/vaadin-badge-base-styles.js:
@vaadin/badge/src/vaadin-badge.js:
@vaadin/component-base/src/event-utils.js:
@vaadin/component-base/src/object-utils.js:
  (**
   * @license
   * Copyright (c) 2026 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/component-base/src/tooltip-controller.js:
@vaadin/a11y-base/src/announce.js:
@vaadin/component-base/src/slot-child-observe-controller.js:
@vaadin/a11y-base/src/keyboard-direction-mixin.js:
  (**
   * @license
   * Copyright (c) 2022 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/field-base/src/styles/group-base-styles.js:
@vaadin/checkbox-group/src/styles/vaadin-checkbox-group-base-styles.js:
@vaadin/checkbox-group/src/vaadin-checkbox-group-mixin.js:
@vaadin/checkbox-group/src/vaadin-checkbox-group.js:
@vaadin/confirm-dialog/src/styles/vaadin-confirm-dialog-overlay-base-styles.js:
@vaadin/confirm-dialog/src/vaadin-confirm-dialog-overlay.js:
@vaadin/confirm-dialog/src/vaadin-confirm-dialog-mixin.js:
@vaadin/confirm-dialog/src/vaadin-confirm-dialog.js:
@vaadin/time-picker/src/vaadin-time-picker-item.js:
@vaadin/time-picker/src/styles/vaadin-time-picker-overlay-base-styles.js:
@vaadin/time-picker/src/vaadin-time-picker-overlay.js:
@vaadin/time-picker/src/styles/vaadin-time-picker-scroller-base-styles.js:
@vaadin/time-picker/src/vaadin-time-picker-scroller.js:
@vaadin/time-picker/src/styles/vaadin-time-picker-base-styles.js:
@vaadin/time-picker/src/vaadin-time-picker-helper.js:
@vaadin/time-picker/src/vaadin-time-picker-mixin.js:
@vaadin/time-picker/src/vaadin-time-picker.js:
  (**
   * @license
   * Copyright (c) 2018 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/overlay/src/vaadin-overlay-utils.js:
  (**
   * @license
   * Copyright (c) 2024 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@vaadin/lit-renderer/src/lit-renderer.js:
@vaadin/context-menu/src/styles/vaadin-context-menu-item-base-styles.js:
@vaadin/context-menu/src/vaadin-menu-overlay-mixin.js:
@vaadin/context-menu/src/styles/vaadin-menu-overlay-base-styles.js:
@vaadin/context-menu/src/vaadin-context-menu-tooltip-controller.js:
@vaadin/context-menu/src/vaadin-contextmenu-items-mixin.js:
@vaadin/context-menu/src/vaadin-context-menu-mixin.js:
@vaadin/date-picker/src/styles/vaadin-date-picker-overlay-base-styles.js:
@vaadin/date-picker/src/vaadin-date-picker-overlay.js:
@vaadin/date-picker/src/vaadin-date-picker-helper.js:
@vaadin/date-picker/src/vaadin-infinite-scroller.js:
@vaadin/date-picker/src/vaadin-date-picker-month-scroller.js:
@vaadin/date-picker/src/vaadin-date-picker-year-scroller.js:
@vaadin/date-picker/src/styles/vaadin-date-picker-year-base-styles.js:
@vaadin/date-picker/src/vaadin-date-picker-year.js:
@vaadin/date-picker/src/styles/vaadin-month-calendar-base-styles.js:
@vaadin/date-picker/src/vaadin-month-calendar-mixin.js:
@vaadin/date-picker/src/vaadin-month-calendar.js:
@vaadin/date-picker/src/styles/vaadin-date-picker-overlay-content-base-styles.js:
@vaadin/date-picker/src/vaadin-date-picker-overlay-content-mixin.js:
@vaadin/date-picker/src/vaadin-date-picker-overlay-content.js:
@vaadin/date-picker/src/styles/vaadin-date-picker-base-styles.js:
@vaadin/date-picker/src/vaadin-date-metadata-controller.js:
@vaadin/date-picker/src/vaadin-date-picker-mixin.js:
@vaadin/date-picker/src/vaadin-date-picker.js:
  (**
   * @license
   * Copyright (c) 2016 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/menu-bar/src/styles/vaadin-menu-bar-item-base-styles.js:
@vaadin/menu-bar/src/vaadin-menu-bar-item.js:
@vaadin/menu-bar/src/vaadin-menu-bar-list-box.js:
@vaadin/menu-bar/src/styles/vaadin-menu-bar-overlay-base-styles.js:
@vaadin/menu-bar/src/vaadin-menu-bar-overlay.js:
@vaadin/menu-bar/src/vaadin-menu-bar-submenu.js:
@vaadin/menu-bar/src/styles/vaadin-menu-bar-button-base-styles.js:
@vaadin/menu-bar/src/vaadin-menu-bar-button.js:
@vaadin/menu-bar/src/styles/vaadin-menu-bar-base-styles.js:
@vaadin/menu-bar/src/vaadin-menu-bar-tooltip-controller.js:
@vaadin/menu-bar/src/vaadin-menu-bar-mixin.js:
@vaadin/menu-bar/src/vaadin-menu-bar.js:
@vaadin/date-time-picker/src/styles/vaadin-date-time-picker-base-styles.js:
@vaadin/date-time-picker/src/vaadin-date-time-picker-mixin.js:
@vaadin/date-time-picker/src/vaadin-date-time-picker.js:
  (**
   * @license
   * Copyright (c) 2019 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/combo-box/src/styles/vaadin-combo-box-item-base-styles.js:
@vaadin/combo-box/src/vaadin-combo-box-item-mixin.js:
@vaadin/combo-box/src/vaadin-combo-box-overlay-mixin.js:
@vaadin/combo-box/src/styles/vaadin-combo-box-overlay-base-styles.js:
@vaadin/combo-box/src/vaadin-combo-box-placeholder.js:
@vaadin/combo-box/src/vaadin-combo-box-scroller-mixin.js:
@vaadin/combo-box/src/styles/vaadin-combo-box-scroller-base-styles.js:
@vaadin/combo-box/src/styles/vaadin-combo-box-base-styles.js:
@vaadin/combo-box/src/vaadin-combo-box-data-provider-mixin.js:
@vaadin/combo-box/src/vaadin-combo-box-focus-index-mixin.js:
@vaadin/combo-box/src/vaadin-combo-box-base-mixin.js:
@vaadin/combo-box/src/vaadin-combo-box-items-mixin.js:
@vaadin/date-picker/src/vaadin-date-picker-overlay-mixin.js:
  (**
   * @license
   * Copyright (c) 2015 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/component-base/src/iron-list-core.js:
  (**
   * @license
   * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   *)

@vaadin/a11y-base/src/aria-hidden.js:
  (**
   * @license
   * Copyright (c) 2017 Anton Korzunov
   * SPDX-License-Identifier: MIT
   *)
*/
