/*! OpenRemote or-vaadin-components 1.32.2 and theme 1.32.2 (AGPL-3.0-or-later, Copyright OpenRemote Inc.) with Vaadin 25.3.4 (Apache-2.0), Lit 3.3.3 (BSD-3-Clause) and Inter 4.1.1 (OFL-1.1) - https://github.com/openremote/openremote */
var P=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};var qe=globalThis,We=qe.ShadowRoot&&(qe.ShadyCSS===void 0||qe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Kt=Symbol(),is=new WeakMap,Q=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Kt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(We&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=is.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&is.set(e,t))}return t}toString(){return this.cssText}},u=s=>new Q(typeof s=="string"?s:s+"",void 0,Kt),h=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new Q(e,s,Kt)},Ke=(s,t)=>{if(We)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=qe.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},Gt=We?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return u(e)})(s):s;var{is:Co,defineProperty:wo,getOwnPropertyDescriptor:Io,getOwnPropertyNames:Eo,getOwnPropertySymbols:So,getPrototypeOf:Ao}=Object,Ge=globalThis,ss=Ge.trustedTypes,ko=ss?ss.emptyScript:"",To=Ge.reactiveElementPolyfillSupport,Ae=(s,t)=>s,ke={toAttribute(s,t){switch(t){case Boolean:s=s?ko:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},fe=(s,t)=>!Co(s,t),rs={attribute:!0,type:String,converter:ke,reflect:!1,useDefault:!1,hasChanged:fe};Symbol.metadata??=Symbol("metadata"),Ge.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=rs){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&wo(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:o}=Io(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){let a=r?.call(this);o?.call(this,n),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??rs}static _$Ei(){if(this.hasOwnProperty(Ae("elementProperties")))return;let t=Ao(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Ae("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ae("properties"))){let e=this.properties,i=[...Eo(e),...So(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(Gt(r))}else t!==void 0&&e.push(Gt(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ke(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:ke).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let o=i.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:ke;this._$Em=r;let a=n.fromAttribute(e,o.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(t,e,i,r=!1,o){if(t!==void 0){let n=this.constructor;if(r===!1&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??fe)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,o]of i){let{wrapped:n}=o,a=this[r];n!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,o,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[Ae("elementProperties")]=new Map,R[Ae("finalized")]=new Map,To?.({ReactiveElement:R}),(Ge.reactiveElementVersions??=[]).push("2.1.2");var Po={attribute:!0,type:String,converter:ke,reflect:!1,hasChanged:fe},Mo=(s=Po,t,e)=>{let{kind:i,metadata:r}=e,o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(e.name,s),i==="accessor"){let{name:n}=e;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,l,s,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,s,a),a}}}if(i==="setter"){let{name:n}=e;return function(a){let l=this[n];t.call(this,a),this.requestUpdate(n,l,s,!0,a)}}throw Error("Unsupported decorator location: "+i)};function Yt(s){return(t,e)=>typeof e=="object"?Mo(s,t,e):((i,r,o)=>{let n=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(s,t,e)}var Xt=globalThis,os=s=>s,Ze=Xt.trustedTypes,ns=Ze?Ze.createPolicy("lit-html",{createHTML:s=>s}):void 0,Qt="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,Jt="?"+z,Oo=`<${Jt}>`,te=document,Pe=()=>te.createComment(""),Me=s=>s===null||typeof s!="object"&&typeof s!="function",ei=Array.isArray,us=s=>ei(s)||typeof s?.[Symbol.iterator]=="function",Zt=`[ 	
\f\r]`,Te=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,as=/-->/g,ls=/>/g,J=RegExp(`>|${Zt}(?:([^\\s"'>=/]+)(${Zt}*=${Zt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ds=/'/g,hs=/"/g,ps=/^(?:script|style|textarea|title)$/i,ti=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),m=ti(1),ja=ti(2),Ha=ti(3),ie=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),cs=new WeakMap,ee=te.createTreeWalker(te,129);function fs(s,t){if(!ei(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ns!==void 0?ns.createHTML(t):t}var ms=(s,t)=>{let e=s.length-1,i=[],r,o=t===2?"<svg>":t===3?"<math>":"",n=Te;for(let a=0;a<e;a++){let l=s[a],d,c,p=-1,w=0;for(;w<l.length&&(n.lastIndex=w,c=n.exec(l),c!==null);)w=n.lastIndex,n===Te?c[1]==="!--"?n=as:c[1]!==void 0?n=ls:c[2]!==void 0?(ps.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=J):c[3]!==void 0&&(n=J):n===J?c[0]===">"?(n=r??Te,p=-1):c[1]===void 0?p=-2:(p=n.lastIndex-c[2].length,d=c[1],n=c[3]===void 0?J:c[3]==='"'?hs:ds):n===hs||n===ds?n=J:n===as||n===ls?n=Te:(n=J,r=void 0);let A=n===J&&s[a+1].startsWith("/>")?" ":"";o+=n===Te?l+Oo:p>=0?(i.push(d),l.slice(0,p)+Qt+l.slice(p)+z+A):l+z+(p===-2?a:A)}return[fs(s,o+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},Oe=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,n=0,a=t.length-1,l=this.parts,[d,c]=ms(t,e);if(this.el=s.createElement(d,i),ee.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=ee.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let p of r.getAttributeNames())if(p.endsWith(Qt)){let w=c[n++],A=r.getAttribute(p).split(z),pe=/([.?@])?(.*)/.exec(w);l.push({type:1,index:o,name:pe[2],strings:A,ctor:pe[1]==="."?Qe:pe[1]==="?"?Je:pe[1]==="@"?et:re}),r.removeAttribute(p)}else p.startsWith(z)&&(l.push({type:6,index:o}),r.removeAttribute(p));if(ps.test(r.tagName)){let p=r.textContent.split(z),w=p.length-1;if(w>0){r.textContent=Ze?Ze.emptyScript:"";for(let A=0;A<w;A++)r.append(p[A],Pe()),ee.nextNode(),l.push({type:2,index:++o});r.append(p[w],Pe())}}}else if(r.nodeType===8)if(r.data===Jt)l.push({type:2,index:o});else{let p=-1;for(;(p=r.data.indexOf(z,p+1))!==-1;)l.push({type:7,index:o}),p+=z.length-1}o++}}static createElement(t,e){let i=te.createElement("template");return i.innerHTML=t,i}};function se(s,t,e=s,i){if(t===ie)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl,o=Me(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=se(s,r._$AS(s,t.values),r,i)),t}var Xe=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??te).importNode(e,!0);ee.currentNode=r;let o=ee.nextNode(),n=0,a=0,l=i[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new me(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new tt(o,this,t)),this._$AV.push(d),l=i[++a]}n!==l?.index&&(o=ee.nextNode(),n++)}return ee.currentNode=te,r}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},me=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=se(this,t,e),Me(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==ie&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):us(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==y&&Me(this._$AH)?this._$AA.nextSibling.data=t:this.T(te.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Oe.createElement(fs(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{let o=new Xe(r,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=cs.get(t.strings);return e===void 0&&cs.set(t.strings,e=new Oe(t)),e}k(t){ei(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let o of t)r===e.length?e.push(i=new s(this.O(Pe()),this.O(Pe()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=os(t).nextSibling;os(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},re=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=y}_$AI(t,e=this,i,r){let o=this.strings,n=!1;if(o===void 0)t=se(this,t,e,0),n=!Me(t)||t!==this._$AH&&t!==ie,n&&(this._$AH=t);else{let a=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=se(this,a[i+l],e,l),d===ie&&(d=this._$AH[l]),n||=!Me(d)||d!==this._$AH[l],d===y?t=y:t!==y&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}n&&!r&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Qe=class extends re{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}},Je=class extends re{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}},et=class extends re{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=se(this,t,e,0)??y)===ie)return;let i=this._$AH,r=t===y&&i!==y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==y&&(i===y||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},tt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){se(this,t)}},_s={M:Qt,P:z,A:Jt,C:1,L:ms,R:Xe,D:us,V:se,I:me,H:re,N:Je,U:et,B:Qe,F:tt},$o=Xt.litHtmlPolyfillSupport;$o?.(Oe,me),(Xt.litHtmlVersions??=[]).push("3.3.3");var it=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let o=e?.renderBefore??null;i._$litPart$=r=new me(t.insertBefore(Pe(),o),o,void 0,e??{})}return r._$AI(s),r};var ii=globalThis,f=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=it(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ie}};f._$litElement$=!0,f.finalized=!0,ii.litElementHydrateSupport?.({LitElement:f});var Lo=ii.litElementPolyfillSupport;Lo?.({LitElement:f});(ii.litElementVersions??=[]).push("4.2.2");window.Vaadin||={};window.Vaadin.featureFlags||={};function Vo(s){return s.replace(/-[a-z]/gu,t=>t[1].toUpperCase())}var j={};function _(s,t="25.3.4"){if(Object.defineProperty(s,"version",{get(){return t}}),s.experimental){let i=typeof s.experimental=="string"?s.experimental:`${Vo(s.is.split("-").slice(1).join("-"))}Component`;if(!window.Vaadin.featureFlags[i]&&!j[i]){j[i]=new Set,j[i].add(s),Object.defineProperty(window.Vaadin.featureFlags,i,{get(){return j[i].size===0},set(r){r&&j[i].size>0&&(j[i].forEach(o=>{customElements.define(o.is,o)}),j[i].clear())}});return}else if(j[i]){j[i].add(s);return}}let e=customElements.get(s.is);if(!e)customElements.define(s.is,s);else{let i=e.version;i&&s.version&&i===s.version?console.warn(`The component ${s.is} has been loaded twice`):console.error(`Tried to define ${s.is} version ${s.version} when version ${e.version} is already in use. Something will probably break.`)}}var Do=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,st=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function Bo(){function s(){return!0}return vs(s)}function No(){try{return Fo()?!0:Ro()?st?!zo():!Bo():!1}catch{return!1}}function Fo(){return localStorage.getItem("vaadin.developmentmode.force")}function Ro(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function zo(){return!!(st&&Object.keys(st).map(t=>st[t]).filter(t=>t.productionMode).length>0)}function vs(s,t){if(typeof s!="function")return;let e=Do.exec(s.toString());if(e)try{s=new Function(e[1])}catch(i){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",i)}return s(t)}window.Vaadin=window.Vaadin||{};var si=function(s,t){if(window.Vaadin.developmentMode)return vs(s,t)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=No());function jo(){}var gs=function(){if(typeof si=="function")return si(jo)};var bs=0,ys=0,_e=[],ri=!1;function Ho(){ri=!1;let s=_e.length;for(let t=0;t<s;t++){let e=_e[t];if(e)try{e()}catch(i){setTimeout(()=>{throw i})}}_e.splice(0,s),ys+=s}var q={after(s){return{run(t){return window.setTimeout(t,s)},cancel(t){window.clearTimeout(t)}}},run(s,t){return window.setTimeout(s,t)},cancel(s){window.clearTimeout(s)}};var oe={run(s){return window.requestAnimationFrame(s)},cancel(s){window.cancelAnimationFrame(s)}};var rt={run(s){return window.requestIdleCallback?window.requestIdleCallback(s):window.setTimeout(s,16)},cancel(s){window.cancelIdleCallback?window.cancelIdleCallback(s):window.clearTimeout(s)}};var ne={run(s){ri||(ri=!0,queueMicrotask(()=>Ho())),_e.push(s);let t=bs;return bs+=1,t},cancel(s){let t=s-ys;if(t>=0){if(!_e[t])throw new Error(`invalid async handle: ${s}`);_e[t]=null}}};var $e=new Set,I=class s{static debounce(t,e,i){return t instanceof s?t._cancelAsync():t=new s,t.setConfig(e,i),t}constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,$e.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),$e.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return this._timer!=null}};function ot(s){$e.add(s)}function Uo(){let s=!!$e.size;return $e.forEach(t=>{try{t.flush()}catch(e){setTimeout(()=>{throw e})}}),s}var ae=()=>{let s;do s=Uo();while(s)};var H=[];function oi(s,t,e=s.getAttribute("dir")){t?s.setAttribute("dir",t):e!=null&&s.removeAttribute("dir")}function ni(){return document.documentElement.getAttribute("dir")}function qo(){let s=ni();H.forEach(t=>{oi(t,s)})}var Wo=new MutationObserver(qo);Wo.observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]});var k=s=>class extends s{static get properties(){return{dir:{type:String,value:"",reflectToAttribute:!0,converter:{fromAttribute:e=>e||"",toAttribute:e=>e===""?null:e}}}}get __isRTL(){return this.getAttribute("dir")==="rtl"}connectedCallback(){super.connectedCallback(),(!this.hasAttribute("dir")||this.__restoreSubscription)&&(this.__subscribe(),oi(this,ni(),null))}attributeChangedCallback(e,i,r){if(super.attributeChangedCallback(e,i,r),e!=="dir")return;let o=ni(),n=r===o&&H.indexOf(this)===-1,a=!r&&i&&H.indexOf(this)===-1;n||a?(this.__subscribe(),oi(this,o,r)):r!==o&&i===o&&this.__unsubscribe()}disconnectedCallback(){super.disconnectedCallback(),this.__restoreSubscription=H.includes(this),this.__unsubscribe()}_valueToNodeAttribute(e,i,r){r==="dir"&&i===""&&!e.hasAttribute("dir")||super._valueToNodeAttribute(e,i,r)}_attributeToProperty(e,i,r){e==="dir"&&!i?this.dir="":super._attributeToProperty(e,i,r)}__subscribe(){H.includes(this)||H.push(this)}__unsubscribe(){H.includes(this)&&H.splice(H.indexOf(this),1)}};window.Vaadin||(window.Vaadin={});window.Vaadin.registrations||(window.Vaadin.registrations=[]);window.Vaadin.developmentModeCallback||(window.Vaadin.developmentModeCallback={});window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]=function(){gs()};var ai,xs=new Set,M=s=>class extends k(s){static _ensureRegistrations(){let{is:e}=this;if(e&&!xs.has(e)){window.Vaadin.registrations.push(this),xs.add(e);let i=window.Vaadin.developmentModeCallback;i&&(ai=I.debounce(ai,rt,()=>{i["vaadin-usage-statistics"]()}),ot(ai))}}constructor(){super(),document.doctype===null&&console.warn('Vaadin components require the "standards mode" declaration. Please add <!DOCTYPE html> to the HTML document.'),this.constructor._ensureRegistrations()}};var Cs=new WeakMap;function Ko(s,t){let e=t;for(;e;){if(Cs.get(e)===s)return!0;e=Object.getPrototypeOf(e)}return!1}function x(s){return t=>{if(Ko(s,t))return t;let e=s(t);return Cs.set(e,s),e}}function le(s,t){return s.split(".").reduce((e,i)=>e?e[i]:void 0,t)}function ws(s,t,e){let i=s.split("."),r=i.pop(),o=i.reduce((n,a)=>n[a],e);o[r]=t}var li={},Go=/([A-Z])/gu;function Is(s){return li[s]||(li[s]=s.replace(Go,"-$1").toLowerCase()),li[s]}function Es(s){return s[0].toUpperCase()+s.substring(1)}function di(s){let[t,e]=s.split("("),i=e.replace(")","").split(",").map(r=>r.trim());return{method:t,observerProps:i}}function hi(s,t){return Object.prototype.hasOwnProperty.call(s,t)||(s[t]=new Map(s[t])),s[t]}var Yo=s=>{class t extends s{static enabledWarnings=[];static createProperty(i,r){[String,Boolean,Number,Array].includes(r)&&(r={type:r}),r?.reflectToAttribute&&(r.reflect=!0),super.createProperty(i,r)}static getOrCreateMap(i){return hi(this,i)}static finalize(){if(window.litIssuedWarnings&&(window.litIssuedWarnings.add("no-override-create-property"),window.litIssuedWarnings.add("no-override-get-property-descriptor")),super.finalize(),Array.isArray(this.observers)){let i=this.getOrCreateMap("__complexObservers");this.observers.forEach(r=>{let{method:o,observerProps:n}=di(r);i.set(o,n)})}}static addCheckedInitializer(i){super.addInitializer(r=>{r instanceof this&&i(r)})}static getPropertyDescriptor(i,r,o){let n=super.getPropertyDescriptor(i,r,o),a=n;if(this.getOrCreateMap("__propKeys").set(i,r),o.sync&&(a={get:n.get,set(l){let d=this[i];fe(l,d)&&(this[r]=l,this.requestUpdate(i,d,o),this.hasUpdated&&this.performUpdate())},configurable:!0,enumerable:!0}),o.readOnly){let l=a.set;this.addCheckedInitializer(d=>{d[`_set${Es(i)}`]=function(c){l.call(d,c)}}),a={get:a.get,set(){},configurable:!0,enumerable:!0}}if("value"in o&&this.addCheckedInitializer(l=>{let d=typeof o.value=="function"?o.value.call(l):o.value;o.readOnly?l[`_set${Es(i)}`](d):l[i]=d}),o.observer){let l=o.observer;this.getOrCreateMap("__observers").set(i,l),this.addCheckedInitializer(d=>{d[l]||console.warn(`observer method ${l} not defined`)})}if(o.notify){if(!this.__notifyProps)this.__notifyProps=new Set;else if(!this.hasOwnProperty("__notifyProps")){let l=this.__notifyProps;this.__notifyProps=new Set(l)}this.__notifyProps.add(i)}if(o.computed){let l=`__assignComputed${i}`,d=di(o.computed);this.prototype[l]=function(...c){this[i]=this[d.method](...c)},this.getOrCreateMap("__computedObservers").set(l,d.observerProps)}return o.attribute||(o.attribute=Is(i)),a}static get polylitConfig(){return{asyncFirstRender:!1}}connectedCallback(){super.connectedCallback();let{polylitConfig:i}=this.constructor;!this.hasUpdated&&!i.asyncFirstRender&&this.performUpdate()}firstUpdated(){super.firstUpdated(),this.$||(this.$={}),this.renderRoot.querySelectorAll("[id]").forEach(i=>{this.$[i.id]=i})}ready(){}willUpdate(i){this.constructor.__computedObservers&&this.__runComplexObservers(i,this.constructor.__computedObservers)}updated(i){let r=this.__isReadyInvoked;this.__isReadyInvoked=!0,this.constructor.__observers&&this.__runObservers(i,this.constructor.__observers),this.constructor.__complexObservers&&this.__runComplexObservers(i,this.constructor.__complexObservers),this.__dynamicPropertyObservers&&this.__runDynamicObservers(i,this.__dynamicPropertyObservers),this.__dynamicMethodObservers&&this.__runComplexObservers(i,this.__dynamicMethodObservers),this.constructor.__notifyProps&&this.__runNotifyProps(i,this.constructor.__notifyProps),r||this.ready()}setProperties(i){Object.entries(i).forEach(([r,o])=>{let n=this.constructor.__propKeys.get(r),a=this[n];this[n]=o,this.requestUpdate(r,a)}),this.hasUpdated&&this.performUpdate()}_createMethodObserver(i){let r=hi(this,"__dynamicMethodObservers"),{method:o,observerProps:n}=di(i);r.set(o,n)}_createPropertyObserver(i,r){hi(this,"__dynamicPropertyObservers").set(r,i)}__runComplexObservers(i,r){r.forEach((o,n)=>{o.some(a=>i.has(a))&&(this[n]?this[n](...o.map(a=>this[a])):console.warn(`observer method ${n} not defined`))})}__runDynamicObservers(i,r){r.forEach((o,n)=>{i.has(o)&&this[n]&&this[n](this[o],i.get(o))})}__runObservers(i,r){i.forEach((o,n)=>{let a=r.get(n);a!==void 0&&this[a]&&this[a](this[n],o)})}__runNotifyProps(i,r){i.forEach((o,n)=>{r.has(n)&&this.dispatchEvent(new CustomEvent(`${Is(n)}-changed`,{detail:{value:this[n]}}))})}_get(i,r){return le(i,r)}_set(i,r,o){ws(i,r,o)}}return t},v=x(Yo);function Ss(s){let t=[];for(;s;){if(s.nodeType===Node.DOCUMENT_NODE){t.push(s);break}if(s.nodeType===Node.DOCUMENT_FRAGMENT_NODE){t.push(s),s=s.host;continue}if(s.assignedSlot){s=s.assignedSlot;continue}s=s.parentNode}return t}function ci(s){return new Set(s?s.split(" ").filter(Boolean):[])}function As(s){return s?[...s].join(" "):""}function C(s,t,e){e?s.setAttribute(t,e):s.removeAttribute(t)}function ks(s){return ci(Array.isArray(s)?s.join(" "):s)}function ui(s,t,e){e=ks(e);let i=ci(s.getAttribute(t));e.forEach(r=>i.add(r)),C(s,t,As(i))}function pi(s,t,e){e=ks(e);let i=ci(s.getAttribute(t));e.forEach(r=>i.delete(r)),C(s,t,As(i))}function Ts(s){return s.nodeType===Node.TEXT_NODE&&s.textContent.trim()===""}function Ps(s){return s?!!(s.nodeType===Node.ELEMENT_NODE&&(customElements.get(s.localName)||s.children.length>0)||s.textContent?.trim()):!1}var ve=class{constructor(t,e,i={}){this.target=t,this.callback=e,this.forceInitial=i.forceInitial,this._storedNodes=[],this._isSlot=t instanceof HTMLSlotElement,this._connected=!1,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),i.syncInitial?this.flush():this._schedule()}connect(){this.target.addEventListener("slotchange",this._boundSchedule),this._connected=!0}disconnect(){this.target.removeEventListener("slotchange",this._boundSchedule),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,queueMicrotask(()=>{this._scheduled&&this.flush()}))}flush(){this._connected&&(this._scheduled=!1,this._processNodes())}_collectNodes(){let t=this._isSlot?[this.target]:[...this.target.querySelectorAll("slot")];return[...new Set(t.flatMap(e=>e.assignedNodes({flatten:!0})))]}_groupNodesBySlot(t){let e=new Map;return t.forEach(i=>{let r=i.assignedSlot;e.set(r,e.get(r)??[]),e.get(r).push(i)}),e}_collectMovedNodes(t){let e=this._groupNodesBySlot(t),i=this._groupNodesBySlot(this._storedNodes),r=[];return e.forEach((o,n)=>{let a=i.get(n)||[];new Set(a).difference(new Set(o)).size>0||a.forEach((l,d)=>{o.indexOf(l)!==d&&r.push(l)})}),r}_processNodes(){let t=this._collectNodes(),e=t.filter(o=>!this._storedNodes.includes(o)),i=this._storedNodes.filter(o=>!t.includes(o)),r=this._collectMovedNodes(t);(e.length||i.length||r.length||this.forceInitial)&&this.callback({addedNodes:e,currentNodes:t,movedNodes:r,removedNodes:i}),this.forceInitial&&(this.forceInitial=!1),this._storedNodes=t}};var Zo=0;function ge(){return Zo++}var O=class extends EventTarget{static generateId(t,e="default"){return`${e}-${t.localName}-${ge()}`}constructor(t,e,i,r={}){super();let{initializer:o,multiple:n,observe:a,useUniqueId:l,uniqueIdPrefix:d}=r;this.host=t,this.slotName=e,this.tagName=i,this.observe=typeof a=="boolean"?a:!0,this.multiple=typeof n=="boolean"?n:!1,this.slotInitializer=o,n&&(this.nodes=[]),l&&(this.defaultId=this.constructor.generateId(t,d||e))}hostConnected(){this.initialized||(this.multiple?this.initMultiple():this.initSingle(),this.observe&&this.observeSlot(),this.initialized=!0)}initSingle(){let t=this.getSlotChild();t?(this.node=t,this.initAddedNode(t)):(t=this.attachDefaultNode(),this.initNode(t))}initMultiple(){let t=this.getSlotChildren();if(t.length===0){let e=this.attachDefaultNode();e&&(this.nodes=[e],this.initNode(e))}else this.nodes=t,t.forEach(e=>{this.initAddedNode(e)})}attachDefaultNode(){let{host:t,slotName:e,tagName:i}=this,r=this.defaultNode;return!r&&i&&(r=document.createElement(i),r instanceof Element&&(e!==""&&r.setAttribute("slot",e),this.defaultNode=r)),r&&(this.node=r,t.appendChild(r)),r}getSlotChildren(){let{slotName:t}=this;return Array.from(this.host.childNodes).filter(e=>e.nodeType===Node.ELEMENT_NODE&&e.hasAttribute("data-slot-ignore")?!1:e.nodeType===Node.ELEMENT_NODE&&e.slot===t||e.nodeType===Node.TEXT_NODE&&e.textContent.trim()&&t==="")}getSlotChild(){return this.getSlotChildren()[0]}initNode(t){let{slotInitializer:e}=this;e&&e(t,this.host)}initCustomNode(t){}teardownNode(t){}initAddedNode(t){t!==this.defaultNode&&(this.initCustomNode(t),this.initNode(t))}observeSlot(){let{slotName:t}=this,e=t===""?"slot:not([name])":`slot[name=${t}]`,i=this.host.shadowRoot.querySelector(e);new ve(i,({addedNodes:r,removedNodes:o})=>{let n=this.multiple?this.nodes:[this.node],a=r.filter(l=>!Ts(l)&&!n.includes(l)&&!(l.nodeType===Node.ELEMENT_NODE&&l.hasAttribute("data-slot-ignore")));o.length&&(this.multiple?this.nodes=n.filter(l=>!o.includes(l)):o.includes(this.node)&&(this.node=null),o.forEach(l=>{this.teardownNode(l)})),a?.length>0&&(this.multiple?(this.defaultNode&&this.defaultNode.remove(),this.nodes=[...n,...a].filter(l=>l!==this.defaultNode),a.forEach(l=>{this.initAddedNode(l)})):(this.node&&this.node.remove(),this.node=a[0],this.initAddedNode(this.node)))})}};var T=class extends O{constructor(t){super(t,"tooltip"),this.setTarget(t)}initCustomNode(t){t.target=this.target,this.ariaTarget!==void 0&&(t.ariaTarget=this.ariaTarget),this.context!==void 0&&(t.context=this.context),this.manual!==void 0&&(t.manual=this.manual),this.position!==void 0&&(t._position=this.position),this.shouldShow!==void 0&&(t.shouldShow=this.shouldShow),this.manual||this.host.setAttribute("has-tooltip",""),this.#t(t),t.addEventListener("content-changed",this.#e)}teardownNode(t){this.manual||this.host.removeAttribute("has-tooltip"),t.removeEventListener("content-changed",this.#e),this.#t(null)}setAriaTarget(t){this.ariaTarget=t;let e=this.node;e&&(e.ariaTarget=t)}setContext(t){this.context=t;let e=this.node;e&&(e.context=t)}setManual(t){this.manual=t;let e=this.node;e&&(e.manual=t)}setPosition(t){this.position=t;let e=this.node;e&&(e._position=t)}setShouldShow(t){this.shouldShow=t;let e=this.node;e&&(e.shouldShow=t)}setTarget(t){this.target=t;let e=this.node;e&&(e.target=t)}open(t){let e=this.node;e?.isConnected&&e._stateController.open(t)}close(t){let e=this.node;e&&e._stateController.close(t)}#e=t=>{this.#t(t.target)};#t(t){this.dispatchEvent(new CustomEvent("tooltip-changed",{detail:{node:t}}))}};function be(s){try{CSS.registerProperty(s)}catch(t){if(t instanceof DOMException&&t.name==="InvalidModificationError")console.warn(`The CSS property ${s.name} has already been registered.`);else throw t}}var Ms=(s,...t)=>{let e=document.createElement("style");e.id=s,e.textContent=t.map(i=>i.toString()).join(`
`),document.head.insertAdjacentElement("afterbegin",e)};var nt=class s extends EventTarget{#e;#t=new Set;#i;#s=!1;constructor(t){super(),this.#e=t,this.#i=new CSSStyleSheet}#o(t){let{propertyName:e}=t;this.#t.has(e)&&this.dispatchEvent(new CustomEvent("property-changed",{detail:{propertyName:e}}))}observe(t){this.connect(),!this.#t.has(t)&&(this.#t.add(t),this.#i.replaceSync(`
      :root::before, :host::before {
        content: '' !important;
        position: absolute !important;
        top: -9999px !important;
        left: -9999px !important;
        visibility: hidden !important;
        transition: 1ms allow-discrete step-end !important;
        transition-property: ${[...this.#t].join(", ")} !important;
      }
    `))}connect(){this.#s||(this.#e.adoptedStyleSheets.unshift(this.#i),this.#r.addEventListener("transitionstart",t=>this.#o(t)),this.#r.addEventListener("transitionend",t=>this.#o(t)),this.#s=!0)}disconnect(){this.#t.clear(),this.#e.adoptedStyleSheets=this.#e.adoptedStyleSheets.filter(t=>t!==this.#i),this.#r.removeEventListener("transitionstart",this.#o),this.#r.removeEventListener("transitionend",this.#o),this.#s=!1}get#r(){return this.#e.documentElement??this.#e.host}static for(t){return t.__cssPropertyObserver||=new s(t),t.__cssPropertyObserver}};function Xo(s){let{baseStyles:t,themeStyles:e,elementStyles:i,lumoInjector:r}=s.constructor,o=s.__lumoStyleSheet;return o?[...r.includeBaseStyles?t??i:[],o,...e??[]]:i}function at(s){Ke(s.shadowRoot,Xo(s))}function fi(s,t){s.__lumoStyleSheet=t,at(s)}function lt(s){s.__lumoStyleSheet=void 0,at(s)}var Os=new Set;function mi(s){Os.has(s)||(Os.add(s),console.warn(s))}var $s=new WeakMap;function Ls(s){try{return s.media.mediaText}catch{return mi('[LumoInjector] Browser denied to access property "mediaText" for some CSS rules, so they were skipped.'),""}}function Qo(s){try{return s.cssRules}catch{return mi('[LumoInjector] Browser denied to access property "cssRules" for some CSS stylesheets, so they were skipped.'),[]}}function Vs(s,t={tags:new Map,modules:new Map}){for(let e of Qo(s)){if(e instanceof CSSImportRule){let i=Ls(e);i.startsWith("lumo_")?t.modules.set(i,[...e.styleSheet.cssRules]):Vs(e.styleSheet,t);continue}if(e instanceof CSSMediaRule){let i=Ls(e);i.startsWith("lumo_")&&t.modules.set(i,[...e.cssRules]);continue}if(e instanceof CSSStyleRule&&e.cssText.includes("-inject")){for(let i of e.style){let r=i.match(/^--_lumo-(.*)-inject-modules$/u)?.[1];if(!r)continue;let o=e.style.getPropertyValue(i);t.tags.set(r,o.split(",").map(n=>n.trim().replace(/'|"/gu,"")))}continue}}return t}function Ds(s){let t=new Map,e=new Map;for(let i of s){let r=$s.get(i);r||(r=Vs(i),$s.set(i,r)),t=new Map([...t,...r.tags]),e=new Map([...e,...r.modules])}return{tags:t,modules:e}}function _i(s){return`--_lumo-${s.is}-inject`}var dt=class{#e;#t;#i=new Map;#s=new Map;constructor(t=document){this.#e=t,this.handlePropertyChange=this.handlePropertyChange.bind(this),this.#t=nt.for(t),this.#t.addEventListener("property-changed",this.handlePropertyChange)}disconnect(){this.#t.removeEventListener("property-changed",this.handlePropertyChange),this.#i.clear(),this.#s.values().forEach(t=>t.forEach(lt))}forceUpdate(){for(let t of this.#i.keys())this.#r(t)}componentConnected(t){let{lumoInjector:e}=t.constructor,{is:i}=e;this.#s.set(i,this.#s.get(i)??new Set),this.#s.get(i).add(t);let r=this.#i.get(i);if(r){r.cssRules.length>0&&fi(t,r);return}this.#o(i);let o=_i(e);this.#t.observe(o)}componentDisconnected(t){let{is:e}=t.constructor.lumoInjector;this.#s.get(e)?.delete(t),lt(t)}handlePropertyChange(t){let{propertyName:e}=t.detail,i=e.match(/^--_lumo-(.*)-inject$/u)?.[1];i&&this.#r(i)}#o(t){this.#i.set(t,new CSSStyleSheet),this.#r(t)}#r(t){let{tags:e,modules:i}=Ds(this.#n),r=(e.get(t)??[]).flatMap(n=>i.get(n)??[]).map(n=>n.cssText).join(`
`),o=this.#i.get(t);o.replaceSync(r),this.#s.get(t)?.forEach(n=>{r?fi(n,o):lt(n)})}get#n(){let t=new Set;for(let e of[this.#e,document])t=t.union(new Set(e.styleSheets)),t=t.union(new Set(e.adoptedStyleSheets));return[...t]}};var Bs=new Set;function Ns(s){let t=s.getRootNode();return t.host&&t.host.constructor.version?Ns(t.host):t}var g=s=>class extends s{static finalize(){super.finalize();let e=_i(this.lumoInjector);this.is&&!Bs.has(e)&&(Bs.add(e),be({name:e,syntax:"<number>",inherits:!0,initialValue:"0"}))}static get lumoInjector(){return{is:this.is,includeBaseStyles:!1}}connectedCallback(){super.connectedCallback();let e=Ns(this);e.__lumoInjectorDisabled||this.isConnected&&(e.__lumoInjector||=new dt(e),this.__lumoInjector=e.__lumoInjector,this.__lumoInjector.componentConnected(this))}disconnectedCallback(){super.disconnectedCallback(),this.__lumoInjector&&(this.__lumoInjector.componentDisconnected(this),this.__lumoInjector=void 0)}};var Fs=s=>class extends s{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(e,i,r){super.attributeChangedCallback(e,i,r),e==="theme"&&this._set_theme(r)}};var ht=[],vi=new Set,gi=new Set;function Rs(s){return s&&Object.prototype.hasOwnProperty.call(s,"__themes")}function Jo(s){return Rs(customElements.get(s))}function en(s=[]){return[s].flat(1/0).filter(t=>t instanceof Q?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function zs(s,t){return(s||"").split(" ").some(e=>new RegExp(`^${e.split("*").join(".*")}$`,"u").test(t))}function js(s){return s.map(t=>t.cssText).join(`
`)}var ct="vaadin-themable-mixin-style";function tn(s,t){let e=document.createElement("style");e.id=ct,e.textContent=js(s),t.content.appendChild(e)}function sn(s){if(!s.shadowRoot)return;let t=s.constructor;if(s instanceof f)at(s);else{let e=s.shadowRoot.getElementById(ct),i=t.prototype._template;e.textContent=i.content.getElementById(ct).textContent}}function rn(s){vi.forEach(t=>{let e=t.deref();e instanceof s?sn(e):e||vi.delete(t)})}function Hs(s){if(s.prototype instanceof f)s.elementStyles=s.finalizeStyles(s.styles);else{let t=s.prototype._template;t.content.getElementById(ct).textContent=js(s.getStylesForThis())}gi.forEach(t=>{let e=customElements.get(t);e!==s&&e.prototype instanceof s&&Hs(e)})}function on(s,t){let e=s.__themes;return!e||!t?!1:e.some(i=>i.styles.some(r=>t.some(o=>o.cssText===r.cssText)))}function bi(s,t,e={}){t=en(t),ht.push({themeFor:s,styles:t,include:e.include,moduleId:e.moduleId}),s&&gi.forEach(i=>{if(zs(s,i)&&Jo(i)){let r=customElements.get(i);on(r,t)?console.warn(`Registering styles that already exist for ${i}`):(!window.Vaadin||!window.Vaadin.suppressPostFinalizeStylesWarning)&&console.warn(`The custom element definition for "${i}" was finalized before a style module was registered. Ideally, import component specific style modules before importing the corresponding custom element. This warning can be suppressed by setting "window.Vaadin.suppressPostFinalizeStylesWarning = true".`),Hs(r),rn(r)}})}function nn(s=""){let t=0;return s.startsWith("lumo-")||s.startsWith("material-")?t=1:s.startsWith("vaadin-")&&(t=2),t}function Us(s){let t=[];return s.include&&[].concat(s.include).forEach(e=>{let i=ht.find(r=>r.moduleId===e);i?t.push(...Us(i),...i.styles):console.warn(`Included moduleId ${e} not found in style registry`)},s.styles),t}function an(s){let t=`${s}-default-theme`,e=ht.filter(i=>i.moduleId!==t&&zs(i.themeFor,s)).map(i=>({...i,styles:[...Us(i),...i.styles],includePriority:nn(i.moduleId)})).sort((i,r)=>r.includePriority-i.includePriority);return e.length>0?e:ht.filter(i=>i.moduleId===t)}var b=s=>class extends Fs(s){constructor(){super(),vi.add(new WeakRef(this))}static finalize(){if(super.finalize(),this.is&&gi.add(this.is),this.elementStyles)return;let e=this.prototype._template;!e||Rs(this)||tn(this.getStylesForThis(),e)}static finalizeStyles(e){return this.baseStyles=e?[e].flat(1/0):[],this.themeStyles=this.getStylesForThis(),[...this.baseStyles,...this.themeStyles]}static getStylesForThis(){let e=s.__themes||[],i=Object.getPrototypeOf(this.prototype),r=(i?i.constructor.__themes:[])||[];this.__themes=[...e,...r,...an(this.is)];let o=this.__themes.flatMap(n=>n.styles);return o.filter((n,a)=>a===o.lastIndexOf(n))}};["--vaadin-text-color","--vaadin-text-color-disabled","--vaadin-text-color-secondary","--vaadin-border-color","--vaadin-border-color-secondary","--vaadin-background-color"].forEach(s=>{be({name:s,syntax:"<color>",inherits:!0,initialValue:"transparent"})});Ms("vaadin-base",h`
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
  `);var qs=h`
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
`;var ln=!1,dn=s=>s,Ii=typeof document.head.style.touchAction=="string",Ci="__polymerGestures",yi="__polymerGesturesHandled",wi="__polymerGesturesTouchAction",Ws=25,Ks=5,hn=2,cn=["mousedown","mousemove","mouseup","click"],un=[0,1,4,2],pn=(function(){try{return new MouseEvent("test",{buttons:1}).buttons===1}catch{return!1}})();function Ei(s){return cn.indexOf(s)>-1}var Zs=!1;(function(){try{let s=Object.defineProperty({},"passive",{get(){Zs=!0}});window.addEventListener("test",null,s),window.removeEventListener("test",null,s)}catch{}})();function fn(s){if(!(Ei(s)||s==="touchend")&&Ii&&Zs&&ln)return{passive:!0}}var mn=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/u),_n={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function he(s){let t=s.type;if(!Ei(t))return!1;if(t==="mousemove"){let i=s.buttons??1;return s instanceof window.MouseEvent&&!pn&&(i=un[s.which]||0),!!(i&1)}return(s.button??0)===0}function vn(s){if(s.type==="click"){if(s.detail===0)return!0;let t=W(s);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let e=t.getBoundingClientRect(),i=s.pageX,r=s.pageY;return!(i>=e.left&&i<=e.right&&r>=e.top&&r<=e.bottom)}return!1}var U={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function gn(s){let t="auto",e=Qs(s);for(let i=0,r;i<e.length;i++)if(r=e[i],r[wi]){t=r[wi];break}return t}function Xs(s,t,e){s.movefn=t,s.upfn=e,document.addEventListener("mousemove",t),document.addEventListener("mouseup",e)}function ye(s){document.removeEventListener("mousemove",s.movefn),document.removeEventListener("mouseup",s.upfn),s.movefn=null,s.upfn=null}var Qs=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:s=>s.composedPath&&s.composedPath()||[],Si={},de=[];function bn(s,t){let e=document.elementFromPoint(s,t),i=e;for(;i?.shadowRoot&&!window.ShadyDOM;){let r=i;if(i=i.shadowRoot.elementFromPoint(s,t),r===i)break;i&&(e=i)}return e}function W(s){let t=Qs(s);return t.length>0?t[0]:s.target}function yn(s){let t=s.type,i=s.currentTarget[Ci];if(!i)return;let r=i[t];if(!r)return;if(!s[yi]&&(s[yi]={},t.startsWith("touch"))){let n=s.changedTouches[0];if(t==="touchstart"&&s.touches.length===1&&(U.touch.id=n.identifier),U.touch.id!==n.identifier)return;Ii||(t==="touchstart"||t==="touchmove")&&xn(s)}let o=s[yi];if(!o.skip){for(let n=0,a;n<de.length;n++)a=de[n],r[a.name]&&!o[a.name]&&a.flow&&a.flow.start.indexOf(s.type)>-1&&a.reset&&a.reset();for(let n=0,a;n<de.length;n++)a=de[n],r[a.name]&&!o[a.name]&&(o[a.name]=!0,a[t](s))}}function xn(s){let t=s.changedTouches[0],e=s.type;if(e==="touchstart")U.touch.x=t.clientX,U.touch.y=t.clientY,U.touch.scrollDecided=!1;else if(e==="touchmove"){if(U.touch.scrollDecided)return;U.touch.scrollDecided=!0;let i=gn(s),r=!1,o=Math.abs(U.touch.x-t.clientX),n=Math.abs(U.touch.y-t.clientY);s.cancelable&&(i==="none"?r=!0:i==="pan-x"?r=n>o:i==="pan-y"&&(r=o>n)),r?s.preventDefault():ut("track")}}function Ai(s,t,e){return Si[t]?(Cn(s,t,e),!0):!1}function Cn(s,t,e){let i=Si[t],r=i.deps,o=i.name,n=s[Ci];n||(s[Ci]=n={});for(let a=0,l,d;a<r.length;a++)l=r[a],!(mn&&Ei(l)&&l!=="click")&&(d=n[l],d||(n[l]=d={_count:0}),d._count===0&&s.addEventListener(l,yn,fn(l)),d[o]=(d[o]||0)+1,d._count=(d._count||0)+1);s.addEventListener(t,e),i.touchAction&&In(s,i.touchAction)}function ki(s){de.push(s),s.emits.forEach(t=>{Si[t]=s})}function wn(s){for(let t=0,e;t<de.length;t++){e=de[t];for(let i=0,r;i<e.emits.length;i++)if(r=e.emits[i],r===s)return e}return null}function In(s,t){Ii&&s instanceof HTMLElement&&ne.run(()=>{s.style.touchAction=t}),s[wi]=t}function Ti(s,t,e){let i=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(i.detail=e,dn(s).dispatchEvent(i),i.defaultPrevented){let r=e.preventer||e.sourceEvent;r?.preventDefault&&r.preventDefault()}}function ut(s){let t=wn(s);t.info&&(t.info.prevent=!0)}ki({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset(){ye(this.info)},mousedown(s){if(!he(s))return;let t=W(s),e=this,i=o=>{he(o)||(Le("up",t,o),ye(e.info))},r=o=>{he(o)&&Le("up",t,o),ye(e.info)};Xs(this.info,i,r),Le("down",t,s)},touchstart(s){Le("down",W(s),s.changedTouches[0],s)},touchend(s){Le("up",W(s),s.changedTouches[0],s)}});function Le(s,t,e,i){t&&Ti(t,s,{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:i,prevent(r){return ut(r)}})}ki({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove(s){this.moves.length>hn&&this.moves.shift(),this.moves.push(s)},movefn:null,upfn:null,prevent:!1},reset(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,ye(this.info)},mousedown(s){if(!he(s))return;let t=W(s),e=this,i=o=>{let n=o.clientX,a=o.clientY;Gs(e.info,n,a)&&(e.info.state=e.info.started?o.type==="mouseup"?"end":"track":"start",e.info.state==="start"&&ut("tap"),e.info.addMove({x:n,y:a}),he(o)||(e.info.state="end",ye(e.info)),t&&xi(e.info,t,o),e.info.started=!0)},r=o=>{e.info.started&&i(o),ye(e.info)};Xs(this.info,i,r),this.info.x=s.clientX,this.info.y=s.clientY},touchstart(s){let t=s.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove(s){let t=W(s),e=s.changedTouches[0],i=e.clientX,r=e.clientY;Gs(this.info,i,r)&&(this.info.state==="start"&&ut("tap"),this.info.addMove({x:i,y:r}),xi(this.info,t,e),this.info.state="track",this.info.started=!0)},touchend(s){let t=W(s),e=s.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:e.clientX,y:e.clientY}),xi(this.info,t,e))}});function Gs(s,t,e){if(s.prevent)return!1;if(s.started)return!0;let i=Math.abs(s.x-t),r=Math.abs(s.y-e);return i>=Ks||r>=Ks}function xi(s,t,e){if(!t)return;let i=s.moves[s.moves.length-2],r=s.moves[s.moves.length-1],o=r.x-s.x,n=r.y-s.y,a,l=0;i&&(a=r.x-i.x,l=r.y-i.y),Ti(t,"track",{state:s.state,x:e.clientX,y:e.clientY,dx:o,dy:n,ddx:a,ddy:l,sourceEvent:e,hover(){return bn(e.clientX,e.clientY)}})}ki({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown(s){he(s)&&(this.info.x=s.clientX,this.info.y=s.clientY)},click(s){he(s)&&Ys(this.info,s)},touchstart(s){let t=s.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend(s){Ys(this.info,s.changedTouches[0],s)}});function Ys(s,t,e){let i=Math.abs(t.clientX-s.x),r=Math.abs(t.clientY-s.y),o=W(e||t);!o||_n[o.localName]&&o.hasAttribute("disabled")||(isNaN(i)||isNaN(r)||i<=Ws&&r<=Ws||vn(t))&&(s.prevent||Ti(o,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:e}))}var En=s=>class extends s{static get properties(){return{disabled:{type:Boolean,value:!1,observer:"_disabledChanged",reflectToAttribute:!0,sync:!0}}}_disabledChanged(e){this._setAriaDisabled(e)}_setAriaDisabled(e){C(this,"aria-disabled",e)}click(){this.disabled||super.click()}},K=x(En);var Sn=s=>class extends s{ready(){super.ready(),this.addEventListener("keydown",e=>{this._onKeyDown(e)}),this.addEventListener("keyup",e=>{this._onKeyUp(e)})}_onKeyDown(e){switch(e.key){case"Enter":this._onEnter(e);break;case"Escape":this._onEscape(e);break;default:break}}_onKeyUp(e){}_onEnter(e){}_onEscape(e){}},$=x(Sn);var xe=s=>class extends K($(s)){get _activeKeys(){return[" "]}ready(){super.ready(),Ai(this,"down",e=>{this._shouldSetActive(e)&&this._setActive(!0)}),Ai(this,"up",()=>{this._setActive(!1)})}disconnectedCallback(){super.disconnectedCallback(),this._setActive(!1)}_shouldSetActive(e){return!this.disabled}_onKeyDown(e){super._onKeyDown(e),this._shouldSetActive(e)&&this._activeKeys.includes(e.key)&&(this._setActive(!0),document.addEventListener("keyup",i=>{this._activeKeys.includes(i.key)&&this._setActive(!1)},{once:!0}))}_setActive(e){this.toggleAttribute("active",e)}};var Mi=!1;window.addEventListener("keydown",()=>{Mi=!0},{capture:!0});window.addEventListener("mousedown",()=>{Mi=!1},{capture:!0});function ce(){let s=document.activeElement||document.body;for(;s.shadowRoot&&s.shadowRoot.activeElement;)s=s.shadowRoot.activeElement;return s}function V(){return Mi}function Js(s){let t=s.style;if(t.visibility==="hidden"||t.display==="none")return!0;let e=window.getComputedStyle(s);return e.visibility==="hidden"||e.display==="none"}function An(s,t){let e=Math.max(s.tabIndex,0),i=Math.max(t.tabIndex,0);return e===0||i===0?i>e:e>i}function kn(s,t){let e=[];for(;s.length>0&&t.length>0;)An(s[0],t[0])?e.push(t.shift()):e.push(s.shift());return e.concat(s,t)}function Pi(s){let t=s.length;if(t<2)return s;let e=Math.ceil(t/2),i=Pi(s.slice(0,e)),r=Pi(s.slice(e));return kn(i,r)}function ue(s){return s.checkVisibility?!s.checkVisibility({visibilityProperty:!0}):s.offsetParent===null&&s.clientWidth===0&&s.clientHeight===0?!0:Js(s)}function Oi(s){return s.matches("input, select, textarea, button, object")?s.matches(":not([disabled])"):s.matches("a[href], area[href], iframe, [tabindex], [contentEditable]")}function L(s){return s.getRootNode().activeElement===s}function Tn(s){if(!Oi(s))return-1;let t=s.getAttribute("tabindex")||0;return Number(t)}function er(s,t){if(s.nodeType!==Node.ELEMENT_NODE||Js(s))return!1;let e=s,i=Tn(e),r=i>0;i>=0&&t.push(e);let o;return e.localName==="slot"?o=e.assignedNodes({flatten:!0}):o=(e.shadowRoot||e).children,[...o].forEach(n=>{r=er(n,t)||r}),r}function pt(s){let t=[];return er(s,t)?Pi(t):t}var Pn=s=>class extends s{get _keyboardActive(){return V()}ready(){this.addEventListener("focusin",e=>{this._shouldSetFocus(e)&&this._setFocused(!0)}),this.addEventListener("focusout",e=>{this._shouldRemoveFocus(e)&&this._setFocused(!1)}),super.ready()}disconnectedCallback(){super.disconnectedCallback(),this.hasAttribute("focused")&&this._setFocused(!1)}focus(e){super.focus(e),e?.focusVisible!==!1&&this.setAttribute("focus-ring","")}_setFocused(e){this.toggleAttribute("focused",e),this.toggleAttribute("focus-ring",e&&this._keyboardActive)}_shouldSetFocus(e){return!0}_shouldRemoveFocus(e){return!0}},G=x(Pn);var ft=s=>class extends K(s){static get properties(){return{tabindex:{type:Number,reflectToAttribute:!0,observer:"_tabindexChanged",sync:!0},_lastTabIndex:{type:Number}}}_disabledChanged(e,i){super._disabledChanged(e,i),!this.__shouldAllowFocusWhenDisabled()&&(e?(this.tabindex!==void 0&&(this._lastTabIndex=this.tabindex),this.setAttribute("tabindex","-1")):i&&(this._lastTabIndex!==void 0?this.setAttribute("tabindex",this._lastTabIndex):this.tabindex=void 0))}_tabindexChanged(e){this.__shouldAllowFocusWhenDisabled()||this.disabled&&e!==-1&&(this._lastTabIndex=e,this.setAttribute("tabindex","-1"))}focus(e){(!this.disabled||this.__shouldAllowFocusWhenDisabled())&&super.focus(e)}__shouldAllowFocusWhenDisabled(){return!1}};var Mn=["mousedown","mouseup","click","dblclick","keypress","keydown","keyup"],mt=s=>class extends xe(ft(G(s))){constructor(){super(),this.__onInteractionEvent=this.__onInteractionEvent.bind(this),Mn.forEach(e=>{this.addEventListener(e,this.__onInteractionEvent,!0)}),this.tabindex=0}get _activeKeys(){return["Enter"," "]}ready(){super.ready(),this.hasAttribute("role")||this.setAttribute("role","button"),this.__shouldAllowFocusWhenDisabled()&&this.style.setProperty("--_vaadin-button-disabled-pointer-events","auto")}_onKeyDown(e){super._onKeyDown(e),!(e.altKey||e.shiftKey||e.ctrlKey||e.metaKey)&&this._activeKeys.includes(e.key)&&(e.preventDefault(),this.click())}__onInteractionEvent(e){this.__shouldSuppressInteractionEvent(e)&&e.stopImmediatePropagation()}__shouldSuppressInteractionEvent(e){return this.disabled}};var Ve=class extends mt(M(b(v(g(f))))){static get is(){return"vaadin-button"}static get styles(){return qs}static get properties(){return{disabled:{type:Boolean,value:!1,observer:"_disabledChanged",reflectToAttribute:!0,sync:!0}}}render(){return m`
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
    `}ready(){super.ready(),this._tooltipController=new T(this),this.addController(this._tooltipController)}__shouldAllowFocusWhenDisabled(){return window.Vaadin.featureFlags.accessibleDisabledButtons}};_(Ve);var On=function(s,t,e,i){var r,o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,t,e,i);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(o<3?r(n):o>3?r(t,e,n):r(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n},tr=class extends Ve{};tr=On([P("or-vaadin-button")],tr);var ir=h`
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
`;var $i=class extends b(v(g(f))){static get is(){return"vaadin-multi-select-combo-box-chip"}static get styles(){return ir}static get properties(){return{disabled:{type:Boolean,reflectToAttribute:!0,sync:!0},readonly:{type:Boolean,reflectToAttribute:!0,sync:!0},label:{type:String,sync:!0},item:{type:Object}}}render(){return m`
      <div part="label">${this.label}</div>
      <div part="remove-button" @click="${this._onRemoveClick}"></div>
    `}_onRemoveClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-removed",{detail:{item:this.item},bubbles:!0,composed:!0}))}};_($i);var sr=h`
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
`;var De=class extends b(k(v(g(f)))){static get is(){return"vaadin-input-container"}static get styles(){return sr}static get properties(){return{disabled:{type:Boolean,reflectToAttribute:!0},readonly:{type:Boolean,reflectToAttribute:!0},invalid:{type:Boolean,reflectToAttribute:!0}}}render(){return m`
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
    `}ready(){super.ready(),this.addEventListener("pointerdown",t=>{t.target===this&&t.preventDefault()}),this.addEventListener("click",t=>{t.target===this&&this.shadowRoot.querySelector("slot:not([name])").assignedNodes({flatten:!0}).forEach(e=>e.focus&&e.focus())})}};_(De);var Li=class extends De{static get is(){return"vaadin-multi-select-combo-box-container"}static get styles(){return[super.styles,h`
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
      `]}static get properties(){return{autoExpandVertically:{type:Boolean,reflectToAttribute:!0}}}render(){return m`
      <div id="wrapper">
        <slot name="prefix"></slot>
        <slot></slot>
      </div>
      <slot name="suffix"></slot>
    `}};_(Li);var rr=h`
  :host([focused]) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-focus-ring-width) / -1);
  }
`;var or=s=>class extends s{static get properties(){return{index:{type:Number},item:{type:Object},label:{type:String},selected:{type:Boolean,value:!1,reflectToAttribute:!0},focused:{type:Boolean,value:!1,reflectToAttribute:!0},renderer:{type:Function}}}static get observers(){return["__rendererOrItemChanged(renderer, index, item, selected, focused)","__updateLabel(label, renderer)"]}static get observedAttributes(){return[...super.observedAttributes,"hidden"]}attributeChangedCallback(e,i,r){e==="hidden"&&r!==null?this.index=void 0:super.attributeChangedCallback(e,i,r)}connectedCallback(){super.connectedCallback(),this._owner=this.parentNode.owner;let e=this._getHostDir();e&&this.setAttribute("dir",e)}_getHostDir(){return this._owner&&this._owner.$.overlay.getAttribute("dir")}requestContentUpdate(){if(!this.renderer||this.hidden)return;let e={index:this.index,item:this.item,focused:this.focused,selected:this.selected};this.renderer(this,this._owner,e)}__rendererOrItemChanged(e,i,r){r===void 0||i===void 0||(this._oldRenderer!==e&&(this.innerHTML="",delete this._$litPart$,this._oldRenderer=e),e&&this.requestContentUpdate())}__updateLabel(e,i){i||(this.textContent=e)}};var _t=h`
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
`;var Vi=class extends or(b(k(v(g(f))))){static get is(){return"vaadin-multi-select-combo-box-item"}static get styles(){return[_t,rr]}render(){return m`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}};_(Vi);function nr(s,t){let e=null,i,r=document.documentElement;function o(){i&&clearTimeout(i),e?.disconnect(),e=null}function n(a=!1,l=1){o();let{left:d,top:c,width:p,height:w}=s.getBoundingClientRect();if(a||t(),!p||!w)return;let A=Math.floor(c),pe=Math.floor(r.clientWidth-(d+p)),vo=Math.floor(r.clientHeight-(c+w)),go=Math.floor(d),bo={rootMargin:`${-A}px ${-pe}px ${-vo}px ${-go}px`,threshold:Math.max(0,Math.min(1,l))||1},ts=!0;function yo(xo){let Wt=xo[0].intersectionRatio;if(Wt!==l){if(!ts)return n();Wt?n(!1,Wt):i=setTimeout(()=>{n(!1,1e-7)},1e3)}ts=!1}e=new IntersectionObserver(yo,bo),e.observe(s)}return n(!0),o}function ar(s){return s.getAnimations().filter(t=>t instanceof CSSAnimation&&t.effect.getComputedTiming().activeDuration>0)}function S(s,t,e){let i=[s];s.owner&&i.push(s.owner),typeof e=="string"?i.forEach(r=>{r.setAttribute(t,e)}):e?i.forEach(r=>{r.setAttribute(t,"")}):i.forEach(r=>{r.removeAttribute(t)})}var Di={start:"top",end:"bottom"},Bi={start:"left",end:"right"},lr=new ResizeObserver(s=>{setTimeout(()=>{s.forEach(t=>{t.target.__overlay&&t.target.__overlay._updatePosition()})})}),vt=s=>class extends s{static get properties(){return{positionTarget:{type:Object,value:null,sync:!0},horizontalAlign:{type:String,value:"start",sync:!0},verticalAlign:{type:String,value:"top",sync:!0},noHorizontalOverlap:{type:Boolean,value:!1,sync:!0},noVerticalOverlap:{type:Boolean,value:!1,sync:!0},requiredVerticalSpace:{type:Number,value:0,sync:!0}}}constructor(){super(),this._hasOverlayPositionMixin=!0,this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}updated(e){if(super.updated(e),e.has("positionTarget")){let r=e.get("positionTarget");this.__oldContentWidth=void 0,this.__oldContentHeight=void 0,(!this.positionTarget&&r||this.positionTarget&&!r&&this.__margins)&&this.__resetPosition()}(e.has("opened")||e.has("positionTarget"))&&this.__updatePositionSettings(this.opened,this.positionTarget),["horizontalAlign","verticalAlign","noHorizontalOverlap","noVerticalOverlap","requiredVerticalSpace"].some(r=>e.has(r))&&this._updatePosition()}__addUpdatePositionEventListeners(){window.visualViewport.addEventListener("resize",this._updatePosition),window.visualViewport.addEventListener("scroll",this.__onScroll,!0),this.__positionTargetAncestorRootNodes=Ss(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)}),this.positionTarget&&(this.__observePositionTargetMove=nr(this.positionTarget,()=>{this._updatePosition()}))}__removeUpdatePositionEventListeners(){window.visualViewport.removeEventListener("resize",this._updatePosition),window.visualViewport.removeEventListener("scroll",this.__onScroll,!0),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null),this.__observePositionTargetMove&&(this.__observePositionTargetMove(),this.__observePositionTargetMove=null)}__updatePositionSettings(e,i){if(this.__removeUpdatePositionEventListeners(),i&&(i.__overlay=null,lr.unobserve(i),e&&(this.__addUpdatePositionEventListeners(),i.__overlay=this,lr.observe(i))),e){let r=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(o=>{this.__margins[o]=parseInt(r[o],10)})),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__onScroll(e){e.target instanceof Node&&this._deepContains(e.target)||this._updatePosition()}__resetPosition(){this.__margins=null,Object.assign(this.style,{justifyContent:"",alignItems:"",top:"",bottom:"",left:"",right:""}),S(this,"bottom-aligned",!1),S(this,"top-aligned",!1),S(this,"end-aligned",!1),S(this,"start-aligned",!1)}_updatePosition(){if(!this.positionTarget||!this.opened||!this.__margins)return;let e=this.positionTarget.getBoundingClientRect();if(e.width===0&&e.height===0&&this.opened){this.opened=!1;return}let i=this.__shouldAlignStartVertically(e);this.style.justifyContent=i?"flex-start":"flex-end";let r=this.__isRTL,o=this.__shouldAlignStartHorizontally(e,r),n=!r&&o||r&&!o;this.style.alignItems=n?"flex-start":"flex-end";let a=this.getBoundingClientRect(),l=this.__calculatePositionInOneDimension(e,a,this.noVerticalOverlap,Di,this,i),d=this.__calculatePositionInOneDimension(e,a,this.noHorizontalOverlap,Bi,this,o);Object.assign(this.style,l,d),S(this,"bottom-aligned",!i),S(this,"top-aligned",i),S(this,"end-aligned",!n),S(this,"start-aligned",n)}__shouldAlignStartHorizontally(e,i){let r=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;let o=Math.min(window.innerWidth,document.documentElement.clientWidth),n=!i&&this.horizontalAlign==="start"||i&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,r,o,this.__margins,n,this.noHorizontalOverlap,Bi)}__shouldAlignStartVertically(e){let i=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;let r=Math.min(window.innerHeight,document.documentElement.clientHeight),o=this.verticalAlign==="top";return this.__shouldAlignStart(e,i,r,this.__margins,o,this.noVerticalOverlap,Di)}__shouldAlignStart(e,i,r,o,n,a,l){let d=r-e[a?l.end:l.start]-o[l.end],c=e[a?l.start:l.end]-o[l.start],p=n?d:c,A=p>(n?c:d)||p>i;return n===A}__adjustBottomProperty(e,i,r){let o;if(e===i.end){if(i.end===Di.end){let n=Math.min(window.innerHeight,document.documentElement.clientHeight);if(r>n&&this.__oldViewportHeight){let a=this.__oldViewportHeight-n;o=r-a}this.__oldViewportHeight=n}if(i.end===Bi.end){let n=Math.min(window.innerWidth,document.documentElement.clientWidth);if(r>n&&this.__oldViewportWidth){let a=this.__oldViewportWidth-n;o=r-a}this.__oldViewportWidth=n}}return o}__calculatePositionInOneDimension(e,i,r,o,n,a){let l=a?o.start:o.end,d=a?o.end:o.start,c=parseFloat(n.style[l]||getComputedStyle(n)[l]),p=this.__adjustBottomProperty(l,o,c),w=i[a?o.start:o.end]-e[r===a?o.end:o.start],A=p?`${p}px`:`${c+w*(a?-1:1)}px`;return{[l]:A,[d]:""}}};var dr=s=>class extends vt(s){static get manageFocus(){return!1}constructor(){super(),this.requiredVerticalSpace=200}willUpdate(e){super.willUpdate(e),(e.has("opened")||e.has("positionTarget"))&&this.opened&&this.positionTarget&&this._updateOverlayWidth()}_shouldCloseOnOutsideClick(e){let i=e.composedPath();return!i.includes(this.positionTarget)&&!i.includes(this)}_mouseDownListener(e){super._mouseDownListener(e),this._shouldCloseOnOutsideClick(e)&&!Oi(e.composedPath()[0])&&e.preventDefault()}_updateOverlayWidth(){this.style.setProperty(`--_${this.localName}-default-width`,`${this.positionTarget.offsetWidth}px`)}};var hr=[{name:"--vaadin-overlay-animation-duration",syntax:"<time>",initialValue:"0s"},{name:"--vaadin-overlay-animation-delay",syntax:"<time>",initialValue:"0s"},{name:"--vaadin-overlay-animation-timing-function",syntax:"*",initialValue:"ease"},{name:"--vaadin-overlay-opacity-closed",syntax:"<number>",initialValue:"0"},{name:"--vaadin-overlay-translate-closed",syntax:"<length>+ | <percentage>+",initialValue:"0px"},{name:"--vaadin-overlay-scale-closed",syntax:"<number> | <percentage>",initialValue:"1"},{name:"--vaadin-overlay-transform-closed",syntax:"*"}];hr.forEach(s=>{be({inherits:!1,...s})});var $n=u(hr.map(({name:s})=>`${s}: inherit;`).join(`
`)),cr=h`
  :host,
  [part='overlay'],
  [part='backdrop'] {
    ${$n}
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
`;var Ln=h`
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
`,gt=[Ln,cr];var bt=s=>s.test(navigator.userAgent),Ni=s=>s.test(navigator.platform),Vn=s=>s.test(navigator.vendor),ec=bt(/Android/u),tc=bt(/Chrome/u)&&Vn(/Google Inc/u),ic=bt(/Firefox/u),Dn=Ni(/^iPad/u)||Ni(/^Mac/u)&&navigator.maxTouchPoints>1,Bn=Ni(/^iPhone/u),ur=Bn||Dn,pr=bt(/^((?!chrome|android).)*safari/iu),Be=(()=>{try{return document.createEvent("TouchEvent"),!0}catch{return!1}})();var Nn=new WeakSet;function fr(s){Nn.add(s)}var yt=class{saveFocus(t){this.focusNode=t||ce()}restoreFocus(t){let e=this.focusNode;if(!e)return;let i={preventScroll:t?t.preventScroll:!1,focusVisible:t?t.focusVisible:!1};ce()===document.body?setTimeout(()=>e.focus(i)):e.focus(i),this.focusNode=null}};var Fi=[];var xt=class{trapNode=null;constructor(t){this.host=t}get#e(){return pt(this.trapNode)}get#t(){let t=this.#e;return t.indexOf(t.filter(L).pop())}hostConnected(){document.addEventListener("keydown",this.#i)}hostDisconnected(){document.removeEventListener("keydown",this.#i)}trapFocus(t){if(this.trapNode=t,this.#e.length===0)throw this.trapNode=null,new Error("The trap node should have at least one focusable descendant or be focusable itself.");Fi.push(this),this.#t===-1&&this.#e[0].focus({focusVisible:V()})}releaseFocus(){this.trapNode=null,Fi.pop()}#i=t=>{if(this.trapNode&&this===Array.from(Fi).pop()&&t.key==="Tab"){if(t.defaultPrevented)return;t.preventDefault();let e=t.shiftKey;this.#s(e)}};#s(t=!1){let e=this.#e,i=t?-1:1,r=this.#t,o=(e.length+r+i)%e.length,n=e[o];n.focus({focusVisible:!0}),n.localName==="input"&&n.select()}};var mr=s=>class extends s{static get properties(){return{focusTrap:{type:Boolean,value:!1},autofocus:{type:Boolean,value:!1},restoreFocusOnClose:{type:Boolean,value:!1},restoreFocusNode:{type:HTMLElement}}}static get manageFocus(){return!0}constructor(){super(),this.__manageFocus=this.constructor.manageFocus,this.__manageFocus&&(this.__focusTrapController=new xt(this),this.__focusRestorationController=new yt)}get _contentRoot(){return this}ready(){super.ready(),this.__manageFocus&&(this.addController(this.__focusTrapController),this.addController(this.__focusRestorationController))}get _focusRoot(){return this.$.overlay}_resetFocus(){if(this.__manageFocus&&(this.focusTrap&&this.__focusTrapController.releaseFocus(),this.restoreFocusOnClose&&this._shouldRestoreFocus())){let e=V(),i=!e;this.__focusRestorationController.restoreFocus({preventScroll:i,focusVisible:e})}}_saveFocus(){this.__manageFocus&&this.restoreFocusOnClose&&this.__focusRestorationController.saveFocus(this.restoreFocusNode)}_initFocus(){if(!this.__manageFocus||ue(this._focusRoot))return;let e=pt(this._focusRoot);e.some(L)||(e.find(r=>this.#e(r))??(this.autofocus?e[0]:null))?.focus({focusVisible:V()}),this.focusTrap&&this.__focusTrapController.trapFocus(this._focusRoot)}_shouldRestoreFocus(){let e=ce();return e===document.body||this._deepContains(e)}_deepContains(e){if(this._contentRoot.contains(e))return!0;let i=e,r=e.ownerDocument;for(;i&&i!==r&&i!==this._contentRoot;)i=i.parentNode||i.host;return i===this._contentRoot}#e(e){let i=this._focusRoot,r=e;for(;r&&r!==i&&r!==this;){if(r.autofocus&&(r===e||customElements.get(r.localName)))return!0;r=r.assignedSlot||r.parentNode||r.host}return!1}};var Ct=new Set,wt=()=>[...Ct].filter(s=>!s.hasAttribute("closing")),Fn=s=>{let t=wt(),e=t.indexOf(s);return e===-1?[]:t.slice(e+1)},Rn=(s,t)=>s._deepContains(t),_r=(s,t=e=>!0)=>{let e=wt().filter(t);return s===e.pop()},vr=s=>class extends s{get _last(){return _r(this)}get _isAttached(){return Ct.has(this)}bringToFront(){if(_r(this))return;let e=Fn(this),i=e.filter(r=>r._hasOverlayPositionMixin&&Rn(this,r));i.length!==e.length&&[this,...i].forEach(r=>{r.matches(":popover-open")&&(r.hidePopover(),r.showPopover()),r._removeAttachedInstance(),r._appendAttachedInstance()})}_enterModalState(){document.body.style.pointerEvents!=="none"&&(this._previousDocumentPointerEvents=document.body.style.pointerEvents,document.body.style.pointerEvents="none"),wt().forEach(e=>{e!==this&&e.toggleAttribute("suppressed",!0)})}_exitModalState(){this._previousDocumentPointerEvents!==void 0&&(document.body.style.pointerEvents=this._previousDocumentPointerEvents,delete this._previousDocumentPointerEvents);let e=wt(),i;for(;(i=e.pop())&&!(i!==this&&(i.toggleAttribute("suppressed",!1),!i.modeless)););}_appendAttachedInstance(){Ct.add(this)}_removeAttachedInstance(){this._isAttached&&Ct.delete(this)}};var It=s=>class extends mr(vr(s)){static get properties(){return{opened:{type:Boolean,notify:!0,observer:"_openedChanged",reflectToAttribute:!0,sync:!0},owner:{type:Object,sync:!0},model:{type:Object,sync:!0},renderer:{type:Object,sync:!0},modeless:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_modelessChanged",sync:!0},hidden:{type:Boolean,reflectToAttribute:!0,observer:"_hiddenChanged",sync:!0},withBackdrop:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_withBackdropChanged",sync:!0}}}static get observers(){return["_rendererOrDataChanged(renderer, owner, model, opened)"]}get _rendererRoot(){return this}constructor(){super(),this._boundMouseDownListener=this._mouseDownListener.bind(this),this._boundMouseUpListener=this._mouseUpListener.bind(this),this._boundOutsideClickListener=this._outsideClickListener.bind(this),this._boundKeydownListener=this._keydownListener.bind(this),ur&&(this._boundIosResizeListener=()=>this._detectIosNavbar())}firstUpdated(){super.firstUpdated(),this.popover="manual",this.addEventListener("click",()=>{}),this.$.backdrop&&this.$.backdrop.addEventListener("click",()=>{})}connectedCallback(){super.connectedCallback(),this._boundIosResizeListener&&(this._detectIosNavbar(),window.addEventListener("resize",this._boundIosResizeListener)),this.opened&&this._attachOverlay()}disconnectedCallback(){super.disconnectedCallback(),this.__scheduledOpen&&(cancelAnimationFrame(this.__scheduledOpen),this.__scheduledOpen=null),this._boundIosResizeListener&&window.removeEventListener("resize",this._boundIosResizeListener)}requestContentUpdate(){this.renderer&&this.renderer.call(this.owner,this._rendererRoot,this.owner,this.model)}close(e){let i=new CustomEvent("vaadin-overlay-close",{bubbles:!0,cancelable:!0,detail:{overlay:this,sourceEvent:e}});this.dispatchEvent(i),document.body.dispatchEvent(i),i.defaultPrevented||(this.opened=!1)}setBounds(e,i=!0){let r=this.$.overlay,o={...e};i&&r.style.position!=="absolute"&&(r.style.position="absolute"),Object.keys(o).forEach(n=>{o[n]!==null&&!isNaN(o[n])&&(o[n]=`${o[n]}px`)}),Object.assign(r.style,o)}_detectIosNavbar(){if(!this.opened)return;let e=window.innerHeight,r=window.innerWidth>e,o=document.documentElement.clientHeight;r&&o>e?this.style.setProperty("--vaadin-overlay-viewport-bottom",`${o-e}px`):this.style.setProperty("--vaadin-overlay-viewport-bottom","0px")}_shouldAddGlobalListeners(){return!this.modeless}_addGlobalListeners(){this.__hasGlobalListeners||(this.__hasGlobalListeners=!0,document.addEventListener("mousedown",this._boundMouseDownListener),document.addEventListener("mouseup",this._boundMouseUpListener),document.documentElement.addEventListener("click",this._boundOutsideClickListener,!0))}_removeGlobalListeners(){this.__hasGlobalListeners&&(this.__hasGlobalListeners=!1,document.removeEventListener("mousedown",this._boundMouseDownListener),document.removeEventListener("mouseup",this._boundMouseUpListener),document.documentElement.removeEventListener("click",this._boundOutsideClickListener,!0))}_rendererOrDataChanged(e,i,r,o){let n=this._oldOwner!==i||this._oldModel!==r;this._oldModel=r,this._oldOwner=i;let a=this._oldRenderer!==e,l=this._oldRenderer!==void 0;this._oldRenderer=e;let d=this._oldOpened!==o;this._oldOpened=o,a&&l&&(this._rendererRoot.innerHTML="",delete this._rendererRoot._$litPart$),o&&e&&(a||d||n)&&this.requestContentUpdate()}_modelessChanged(e){this.opened&&(this._shouldAddGlobalListeners()?this._addGlobalListeners():this._removeGlobalListeners()),e?this._exitModalState():this.opened&&this._enterModalState(),S(this,"modeless",e)}_withBackdropChanged(e){S(this,"with-backdrop",e)}_openedChanged(e,i){if(e){if(!this.isConnected){this.opened=!1;return}this._saveFocus(),this._animatedOpening(),this.__scheduledOpen=requestAnimationFrame(()=>{setTimeout(()=>{this._initFocus();let r=new CustomEvent("vaadin-overlay-open",{detail:{overlay:this},bubbles:!0});this.dispatchEvent(r),document.body.dispatchEvent(r)})}),document.addEventListener("keydown",this._boundKeydownListener),this._shouldAddGlobalListeners()&&this._addGlobalListeners()}else i&&(this.__scheduledOpen&&(cancelAnimationFrame(this.__scheduledOpen),this.__scheduledOpen=null),this._resetFocus(),this._animatedClosing(),document.removeEventListener("keydown",this._boundKeydownListener),this._shouldAddGlobalListeners()&&this._removeGlobalListeners())}_hiddenChanged(e){e&&this.hasAttribute("closing")&&this._flushAnimation("closing")}_enqueueAnimation(e,i){let r=ar(this);if(r.length===0){i();return}let o=`__${e}Handler`,n=()=>{this[o]===n&&(delete this[o],i())};this[o]=n,Promise.all(r.map(a=>a.finished)).then(n,n)}_flushAnimation(e){let i=`__${e}Handler`;typeof this[i]=="function"&&this[i]()}_animatedOpening(){this._isAttached&&this.hasAttribute("closing")&&this._flushAnimation("closing"),this._attachOverlay(),this._appendAttachedInstance(),this.modeless||this._enterModalState(),S(this,"opening",!0),this._enqueueAnimation("opening",()=>{this._finishOpening()})}_attachOverlay(){this.matches(":popover-open")||this.showPopover()}_finishOpening(){S(this,"opening",!1)}_finishClosing(){this._detachOverlay(),this._removeAttachedInstance(),this.toggleAttribute("suppressed",!1),S(this,"closing",!1),this.dispatchEvent(new CustomEvent("vaadin-overlay-closed"))}_animatedClosing(){this.hasAttribute("opening")&&this._flushAnimation("opening"),this._isAttached&&(this._exitModalState(),S(this,"closing",!0),this.dispatchEvent(new CustomEvent("vaadin-overlay-closing")),this._enqueueAnimation("closing",()=>{this._finishClosing()}))}_detachOverlay(){this.hidePopover()}_mouseDownListener(e){this._mouseDownInside=e.composedPath().indexOf(this.$.overlay)>=0}_mouseUpListener(e){this._mouseUpInside=e.composedPath().indexOf(this.$.overlay)>=0}_shouldCloseOnOutsideClick(e){return this._last}_outsideClickListener(e){if(e.composedPath().includes(this.$.overlay)||this._mouseDownInside||this._mouseUpInside){this._mouseDownInside=!1,this._mouseUpInside=!1;return}if(!this._shouldCloseOnOutsideClick(e))return;let i=new CustomEvent("vaadin-overlay-outside-click",{cancelable:!0,detail:{sourceEvent:e}});this.dispatchEvent(i),this.opened&&!i.defaultPrevented&&(this.close(e),!this.opened&&!this.modeless&&fr(e))}_keydownListener(e){if(!(!this._last||e.defaultPrevented)&&!(!this._shouldAddGlobalListeners()&&!e.composedPath().includes(this._focusRoot))&&e.key==="Escape"){let i=new CustomEvent("vaadin-overlay-escape-press",{cancelable:!0,detail:{sourceEvent:e}});this.dispatchEvent(i),this.opened&&!i.defaultPrevented&&this.close(e)}}};var gr=h`
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
`;var br=[gr,h`
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
  `];var yr=[br,h`
    #overlay {
      width: var(
        --vaadin-multi-select-combo-box-overlay-width,
        var(--_vaadin-multi-select-combo-box-overlay-default-width, auto)
      );
    }
  `];var Ri=class extends dr(It(k(b(v(g(f)))))){static get is(){return"vaadin-multi-select-combo-box-overlay"}static get styles(){return[gt,yr]}render(){return m`
      <div part="overlay" id="overlay">
        <div part="loader"></div>
        <div part="content" id="content"><slot></slot></div>
      </div>
    `}};_(Ri);var E=class{toString(){return""}};var xr=navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/u),zn=xr&&xr[1]>=8,Cr=3,wr={_ratio:.5,_scrollerPaddingTop:0,_scrollPosition:0,_physicalSize:0,_physicalAverage:0,_physicalAverageCount:0,_physicalTop:0,_virtualCount:0,_estScrollHeight:0,_scrollHeight:0,_viewportHeight:0,_viewportWidth:0,_physicalItems:null,_physicalSizes:null,_firstVisibleIndexVal:null,_lastVisibleIndexVal:null,_maxPages:2,_templateCost:0,get _physicalBottom(){return this._physicalTop+this._physicalSize},get _scrollBottom(){return this._scrollPosition+this._viewportHeight},get _virtualEnd(){return this._virtualStart+this._physicalCount-1},get _hiddenContentSize(){return this._physicalSize-this._viewportHeight},get _maxScrollTop(){return this._estScrollHeight-this._viewportHeight+this._scrollOffset},get _maxVirtualStart(){let s=this._virtualCount;return Math.max(0,s-this._physicalCount)},get _virtualStart(){return this._virtualStartVal||0},set _virtualStart(s){s=this._clamp(s,0,this._maxVirtualStart),this._virtualStartVal=s},get _physicalStart(){return this._physicalStartVal||0},set _physicalStart(s){s%=this._physicalCount,s<0&&(s=this._physicalCount+s),this._physicalStartVal=s},get _physicalEnd(){return(this._physicalStart+this._physicalCount-1)%this._physicalCount},get _physicalCount(){return this._physicalCountVal||0},set _physicalCount(s){this._physicalCountVal=s},get _optPhysicalSize(){return this._viewportHeight===0?1/0:this._viewportHeight*this._maxPages},get _isVisible(){return!!(this.offsetWidth||this.offsetHeight)},get firstVisibleIndex(){let s=this._firstVisibleIndexVal;if(s==null){let t=this._physicalTop+this._scrollOffset;s=this._iterateItems((e,i)=>{if(t+=this._getPhysicalSizeIncrement(e),t>this._scrollPosition)return i})||0,this._firstVisibleIndexVal=s}return s},get lastVisibleIndex(){let s=this._lastVisibleIndexVal;if(s==null){let t=this._physicalTop+this._scrollOffset;this._iterateItems((e,i)=>{t<this._scrollBottom&&(s=i),t+=this._getPhysicalSizeIncrement(e)}),this._lastVisibleIndexVal=s}return s},get _scrollOffset(){return this._scrollerPaddingTop+this.scrollOffset},_scrollHandler(){let s=Math.max(0,Math.min(this._maxScrollTop,this._scrollTop)),t=s-this._scrollPosition,e=t>=0;if(this._scrollPosition=s,this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,Math.abs(t)>this._physicalSize&&this._physicalSize>0){t-=this._scrollOffset;let i=Math.round(t/this._physicalAverage);this._virtualStart+=i,this._physicalStart+=i,this._physicalTop=Math.min(Math.floor(this._virtualStart)*this._physicalAverage,this._scrollPosition),this._update()}else if(this._physicalCount>0){let i=this._getReusables(e);e?(this._physicalTop=i.physicalTop,this._virtualStart+=i.indexes.length,this._physicalStart+=i.indexes.length):(this._virtualStart-=i.indexes.length,this._physicalStart-=i.indexes.length),this._update(i.indexes,e?null:i.indexes),this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,0),ne)}},_getReusables(s){let t,e,i,r=[],o=this._hiddenContentSize*this._ratio,n=this._virtualStart,a=this._virtualEnd,l=this._physicalCount,d=this._physicalTop+this._scrollOffset,c=this._physicalBottom+this._scrollOffset,p=this._scrollPosition,w=this._scrollBottom;for(s?(t=this._physicalStart,e=p-d):(t=this._physicalEnd,e=c-w);i=this._getPhysicalSizeIncrement(t),e-=i,!(r.length>=l||e<=o);)if(s){if(a+r.length+1>=this._virtualCount||d+i>=p-this._scrollOffset)break;r.push(t),d+=i,t=(t+1)%l}else{if(n-r.length<=0||d+this._physicalSize-i<=w)break;r.push(t),d-=i,t=t===0?l-1:t-1}return{indexes:r,physicalTop:d-this._scrollOffset}},_update(s,t){if(!(s&&s.length===0||this._physicalCount===0)){if(this._assignModels(s),this._updateMetrics(s),t)for(;t.length;){let e=t.pop();this._physicalTop-=this._getPhysicalSizeIncrement(e)}this._positionItems(),this._updateScrollerSize()}},_isClientFull(){return this._scrollBottom!==0&&this._physicalBottom-1>=this._scrollBottom&&this._physicalTop<=this._scrollPosition},_increasePoolIfNeeded(s){let e=this._clamp(this._physicalCount+s,Cr,this._virtualCount-this._virtualStart)-this._physicalCount,i=Math.round(this._physicalCount*.5);if(!(e<0)){if(e>0){let r=window.performance.now();[].push.apply(this._physicalItems,this._createPool(e));for(let o=0;o<e;o++)this._physicalSizes.push(0);this._physicalCount+=e,this._physicalStart>this._physicalEnd&&this._isIndexRendered(this._focusedVirtualIndex)&&this._getPhysicalIndex(this._focusedVirtualIndex)<this._physicalEnd&&(this._physicalStart+=e),this._update(),this._templateCost=(window.performance.now()-r)/e,i=Math.round(this._physicalCount*.5)}this._virtualEnd>=this._virtualCount-1||i===0||(this._isClientFull()?this._physicalSize<this._optPhysicalSize&&this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,this._clamp(Math.round(50/this._templateCost),1,i)),rt):this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,i),ne))}},_render(){if(!(!this.isAttached||!this._isVisible))if(this._physicalCount!==0){let s=this._getReusables(!0);this._physicalTop=s.physicalTop,this._virtualStart+=s.indexes.length,this._physicalStart+=s.indexes.length,this._update(s.indexes),this._update(),this._increasePoolIfNeeded(0)}else this._virtualCount>0&&(this.updateViewportBoundaries(),this._increasePoolIfNeeded(Cr))},_itemsChanged(s){s.path==="items"&&(this._virtualStart=0,this._physicalTop=0,this._virtualCount=this.items?this.items.length:0,this._physicalIndexForKey={},this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._physicalItems||(this._physicalItems=[]),this._physicalSizes||(this._physicalSizes=[]),this._physicalStart=0,this._scrollTop>this._scrollOffset&&this._resetScrollPosition(0),this._debounce("_render",this._render,oe))},_iterateItems(s,t){let e,i,r,o;if(arguments.length===2&&t){for(o=0;o<t.length;o++)if(e=t[o],i=this._computeVidx(e),(r=s.call(this,e,i))!=null)return r}else{for(e=this._physicalStart,i=this._virtualStart;e<this._physicalCount;e++,i++)if((r=s.call(this,e,i))!=null)return r;for(e=0;e<this._physicalStart;e++,i++)if((r=s.call(this,e,i))!=null)return r}},_computeVidx(s){return s>=this._physicalStart?this._virtualStart+(s-this._physicalStart):this._virtualStart+(this._physicalCount-this._physicalStart)+s},_positionItems(){this._adjustScrollPosition();let s=this._physicalTop;this._iterateItems(t=>{this.translate3d(0,`${s}px`,0,this._physicalItems[t]),s+=this._physicalSizes[t]})},_getPhysicalSizeIncrement(s){return this._physicalSizes[s]},_adjustScrollPosition(){let s=this._virtualStart===0?this._physicalTop:Math.min(this._scrollPosition+this._physicalTop,0);if(s!==0){this._physicalTop-=s;let t=this._scrollPosition;!zn&&t>0&&this._resetScrollPosition(t-s)}},_resetScrollPosition(s){this.scrollTarget&&s>=0&&(this._scrollTop=s,this._scrollPosition=this._scrollTop)},_updateScrollerSize(s){let t=this._physicalBottom+Math.max(this._virtualCount-this._physicalCount-this._virtualStart,0)*this._physicalAverage;this._estScrollHeight=t,(s||this._scrollHeight===0||this._scrollPosition>=t-this._physicalSize||Math.abs(t-this._scrollHeight)>=this._viewportHeight)&&(this.$.items.style.height=`${t}px`,this._scrollHeight=t)},scrollToIndex(s){if(typeof s!="number"||s<0||s>this.items.length-1||(ae(),this._physicalCount===0))return;s=this._clamp(s,0,this._virtualCount-1),(!this._isIndexRendered(s)||s>=this._maxVirtualStart)&&(this._virtualStart=s-1),this._assignModels(),this._updateMetrics(),this._physicalTop=this._virtualStart*this._physicalAverage;let t=this._physicalStart,e=this._virtualStart,i=0,r=this._hiddenContentSize;for(;e<s&&i<=r;)i+=this._getPhysicalSizeIncrement(t),t=(t+1)%this._physicalCount,e+=1;this._updateScrollerSize(!0),this._positionItems(),this._resetScrollPosition(this._physicalTop+this._scrollOffset+i),this._increasePoolIfNeeded(0),this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null},_resetAverage(){this._physicalAverage=0,this._physicalAverageCount=0},_resizeHandler(){this._debounce("_render",()=>{this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._isVisible?(this.updateViewportBoundaries(),this.toggleScrollListener(!0),this._resetAverage(),this._render()):this.toggleScrollListener(!1)},oe)},_isIndexRendered(s){return s>=this._virtualStart&&s<=this._virtualEnd},_getPhysicalIndex(s){return(this._physicalStart+(s-this._virtualStart))%this._physicalCount},_clamp(s,t,e){return Math.min(e,Math.max(t,s))},_debounce(s,t,e){this._debouncers||(this._debouncers={}),this._debouncers[s]=I.debounce(this._debouncers[s],e,t.bind(this)),ot(this._debouncers[s])}};var jn=1e5,zi=1e3,Ne=class{constructor({createElements:t,updateElement:e,scrollTarget:i,scrollContainer:r,reorderElements:o,elementsContainer:n,__disableHeightPlaceholder:a}){this.isAttached=!0,this._vidxOffset=0,this.createElements=t,this.updateElement=e,this.scrollTarget=i,this.scrollContainer=r,this.reorderElements=o,this.elementsContainer=n||r,this.__disableHeightPlaceholder=a??!1,this._maxPages=1.3,this.__placeholderHeight=200,this.__elementHeightQueue=Array(10),this.timeouts={SCROLL_REORDER:500,PREVENT_OVERSCROLL:500,FIX_INVALID_ITEM_POSITIONING:100},this.__resizeObserver=new ResizeObserver(()=>this._resizeHandler()),getComputedStyle(this.scrollTarget).overflow==="visible"&&(this.scrollTarget.style.overflow="auto"),getComputedStyle(this.scrollContainer).position==="static"&&(this.scrollContainer.style.position="relative"),this.__resizeObserver.observe(this.scrollTarget),this.scrollTarget.addEventListener("scroll",()=>this._scrollHandler()),new ResizeObserver(([{contentRect:d}])=>{let c=d.width===0&&d.height===0;!c&&this.__scrollTargetHidden&&this.scrollTarget.scrollTop!==this._scrollPosition&&(this.scrollTarget.scrollTop=this._scrollPosition),this.__scrollTargetHidden=c}).observe(this.scrollTarget),this.elementsContainer.addEventListener("focusin",()=>this.__onElementFocused()),this.reorderElements&&(this.scrollTarget.addEventListener("mousedown",d=>{d.target===this.scrollTarget&&(this.__mouseDown=!0)}),this.scrollTarget.addEventListener("mouseup",()=>{this.__mouseDown=!1,this.__pendingReorder&&this.__reorderElements()}))}get scrollOffset(){return 0}get adjustedFirstVisibleIndex(){return this.firstVisibleIndex+this._vidxOffset}get adjustedLastVisibleIndex(){return this.lastVisibleIndex+this._vidxOffset}get _maxVirtualIndexOffset(){return this.size-this._virtualCount}__hasPlaceholders(){return this.__getVisibleElements().some(t=>t.__virtualizerPlaceholder)}scrollToIndex(t){if(typeof t!="number"||isNaN(t)||this.size===0||!this.scrollTarget.offsetHeight)return;delete this.__pendingScrollToIndex,this._physicalCount<=3&&this.flush(),t=this._clamp(t,0,this.size-1);let e=this.__getVisibleElements().length,i=Math.floor(t/this.size*this._virtualCount);this._virtualCount-i<e?(i=this._virtualCount-(this.size-t),this._vidxOffset=this._maxVirtualIndexOffset):i<e?t<zi?(i=t,this._vidxOffset=0):(i=zi,this._vidxOffset=t-i):this._vidxOffset=t-i,this.__skipNextVirtualIndexAdjust=!0,super.scrollToIndex(i),this.adjustedFirstVisibleIndex!==t&&this._scrollTop<this._maxScrollTop&&(this._scrollTop-=this.__getIndexScrollOffset(t)||0),this._scrollHandler(),this.__hasPlaceholders()&&(this.__pendingScrollToIndex=t)}flush(){this.scrollTarget.offsetHeight!==0&&(this._resizeHandler(),ae(),this._scrollHandler(),this.__fixInvalidItemPositioningDebouncer&&this.__fixInvalidItemPositioningDebouncer.flush(),this.__scrollReorderDebouncer&&this.__scrollReorderDebouncer.flush())}hostConnected(){this.scrollTarget.offsetParent&&this.scrollTarget.scrollTop!==this._scrollPosition&&(this.scrollTarget.scrollTop=this._scrollPosition)}update(t=0,e=this.size-1){let i=[];this.__getVisibleElements().forEach(r=>{r.__virtualIndex>=t&&r.__virtualIndex<=e&&(this.__updateElement(r,r.__virtualIndex,!0),i.push(r))}),this.__afterElementsUpdated(i)}_updateMetrics(t){ae();let e=0,i=0,r=this._physicalAverageCount,o=this._physicalAverage;this._iterateItems((n,a)=>{i+=this._physicalSizes[n];let l=this._physicalSizes[n];this._physicalSizes[n]=Math.ceil(this.__getBorderBoxHeight(this._physicalItems[n])),this._physicalSizes[n]!==l&&(this.__resizeObserver.unobserve(this._physicalItems[n]),this.__resizeObserver.observe(this._physicalItems[n],{box:"border-box"})),e+=this._physicalSizes[n],this._physicalAverageCount+=this._physicalSizes[n]?1:0},t),this._physicalSize=this._physicalSize+e-i,this._physicalAverageCount!==r&&(this._physicalAverage=Math.round((o*r+e)/this._physicalAverageCount))}__getBorderBoxHeight(t){let e=getComputedStyle(t),i=parseFloat(e.height)||0;if(e.boxSizing==="border-box")return i;let r=parseFloat(e.paddingBottom)||0,o=parseFloat(e.paddingTop)||0,n=parseFloat(e.borderBottomWidth)||0,a=parseFloat(e.borderTopWidth)||0;return i+r+o+n+a}__updateElement(t,e,i){t.__virtualizerPlaceholder&&(t.style.paddingTop="",t.style.opacity="",t.__virtualizerPlaceholder=!1),!this.__preventElementUpdates&&(t.__lastUpdatedIndex!==e||i)&&(this.updateElement(t,e),t.__lastUpdatedIndex=e)}__afterElementsUpdated(t){this.__disableHeightPlaceholder||t.forEach(e=>{let i=e.offsetHeight;if(i===0)e.style.paddingTop=`${this.__placeholderHeight}px`,e.style.opacity="0",e.__virtualizerPlaceholder=!0,this.__placeholderClearDebouncer=I.debounce(this.__placeholderClearDebouncer,oe,()=>this._resizeHandler());else{this.__elementHeightQueue.push(i),this.__elementHeightQueue.shift();let r=this.__elementHeightQueue.filter(o=>o!==void 0);this.__placeholderHeight=Math.round(r.reduce((o,n)=>o+n,0)/r.length)}}),this.__pendingScrollToIndex!==void 0&&!this.__hasPlaceholders()&&this.scrollToIndex(this.__pendingScrollToIndex)}__getIndexScrollOffset(t){let e=this.__getVisibleElements().find(i=>i.__virtualIndex===t);return e?this.scrollTarget.getBoundingClientRect().top-e.getBoundingClientRect().top:void 0}__restoreScrollOffset(t,e){let i=this.__getIndexScrollOffset(t);e!==void 0&&i!==void 0&&(this._scrollTop+=e-i)}get size(){return this.__size}set size(t){if(t===this.size)return;this.__fixInvalidItemPositioningDebouncer&&this.__fixInvalidItemPositioningDebouncer.cancel(),this._debouncers&&this._debouncers._increasePoolIfNeeded&&this._debouncers._increasePoolIfNeeded.cancel();let e=t>0&&this._scrollTop>0,i,r;e&&(i=this.adjustedFirstVisibleIndex,r=this.__getIndexScrollOffset(i)),this.__size=t,this.__preventElementUpdates=e,this._itemsChanged({path:"items"}),ae(),e&&(i=Math.min(i,t-1),this.scrollToIndex(i),this.__restoreScrollOffset(i,r)),this.__preventElementUpdates=!1,this._isVisible||this._assignModels(),this.elementsContainer.children.length||requestAnimationFrame(()=>this._resizeHandler()),this._updateScrollerSize(!0),this._resizeHandler(),ae(),this._debounce("_update",this._update,ne)}get _scrollTop(){return this.scrollTarget.scrollTop}set _scrollTop(t){this.scrollTarget.scrollTop=t}get items(){return{length:Math.min(this.size,jn)}}get offsetHeight(){return this.scrollTarget.offsetHeight}get $(){return{items:this.scrollContainer}}updateViewportBoundaries(){this._scrollerPaddingTop=parseInt(window.getComputedStyle(this.scrollTarget)["padding-top"],10),this._viewportHeight=this.scrollTarget.offsetHeight}_createPool(t){let e=this.createElements(t),i=document.createDocumentFragment();return e.forEach(r=>{r.style.position="absolute",i.appendChild(r),this.__resizeObserver.observe(r,{box:"border-box"})}),this.elementsContainer.appendChild(i),e}_assignModels(t){let e=[];this._iterateItems((i,r)=>{let o=this._physicalItems[i];o.hidden=r>=this.size,o.hidden?delete o.__lastUpdatedIndex:(o.__virtualIndex=r+(this._vidxOffset||0),this.__updateElement(o,o.__virtualIndex),e.push(o))},t),this.__afterElementsUpdated(e)}_isClientFull(){return setTimeout(()=>{this.__clientFull=!0}),this.__clientFull||super._isClientFull()}translate3d(t,e,i,r){r.style.transform=`translateY(${e})`}toggleScrollListener(){}__getFocusedElement(){return this.__getVisibleElements().find(t=>t.matches(":focus-within"))}__nextFocusableSiblingMissing(t,e){return e.indexOf(t)===e.length-1&&this.size>t.__virtualIndex+1}__previousFocusableSiblingMissing(t,e){return e.indexOf(t)===0&&t.__virtualIndex>0}__onElementFocused(){if(!this.reorderElements)return;let t=this.__getFocusedElement();if(!t)return;let e=this.__getVisibleElements();(this.__previousFocusableSiblingMissing(t,e)||this.__nextFocusableSiblingMissing(t,e))&&this.flush();let i=this.__getVisibleElements();this.__nextFocusableSiblingMissing(t,i)?(this._scrollTop+=Math.ceil(t.getBoundingClientRect().bottom)-Math.floor(this.scrollTarget.getBoundingClientRect().bottom-1),this.flush()):this.__previousFocusableSiblingMissing(t,i)&&(this._scrollTop-=Math.ceil(this.scrollTarget.getBoundingClientRect().top+1)-Math.floor(t.getBoundingClientRect().top),this.flush())}_scrollHandler(){if(this.scrollTarget.offsetHeight===0)return;this._adjustVirtualIndexOffset(this._scrollTop-this._scrollPosition);let t=this._scrollTop-this._scrollPosition;if(super._scrollHandler(),this._physicalCount!==0){let e=t>=0,i=this._getReusables(!e);i.indexes.length&&(this._physicalTop=i.physicalTop,e?(this._virtualStart-=i.indexes.length,this._physicalStart-=i.indexes.length):(this._virtualStart+=i.indexes.length,this._physicalStart+=i.indexes.length),this._resizeHandler())}t&&(this.__fixInvalidItemPositioningDebouncer=I.debounce(this.__fixInvalidItemPositioningDebouncer,q.after(this.timeouts.FIX_INVALID_ITEM_POSITIONING),()=>this.__fixInvalidItemPositioning()),this.__overscrollDebouncer?.isActive()||(this.scrollTarget.style.overscrollBehavior="none"),this.__overscrollDebouncer=I.debounce(this.__overscrollDebouncer,q.after(this.timeouts.PREVENT_OVERSCROLL),()=>{this.scrollTarget.style.overscrollBehavior=null})),this.reorderElements&&(this.__scrollReorderDebouncer=I.debounce(this.__scrollReorderDebouncer,q.after(this.timeouts.SCROLL_REORDER),()=>this.__reorderElements())),this._scrollPosition===0&&this.firstVisibleIndex!==0&&Math.abs(t)>0&&this.scrollToIndex(0)}_resizeHandler(){super._resizeHandler();let t=this.adjustedLastVisibleIndex===this.size-1,e=this._physicalTop-this._scrollPosition;if(t&&e>0){let i=Math.ceil(e/this._physicalAverage);this._virtualStart=Math.max(0,this._virtualStart-i),this._physicalStart=Math.max(0,this._physicalStart-i),super.scrollToIndex(this._virtualCount-1),this.scrollTarget.scrollTop=this.scrollTarget.scrollHeight-this.scrollTarget.clientHeight}}__fixInvalidItemPositioning(){if(!this.scrollTarget.isConnected)return;let t=this._physicalTop>this._scrollTop,e=this._physicalBottom<this._scrollBottom,i=this.adjustedFirstVisibleIndex===0,r=this.adjustedLastVisibleIndex===this.size-1;if(t&&!i||e&&!r){let o=e,n=this._ratio;this._ratio=0,this._scrollPosition=this._scrollTop+(o?-1:1),this._scrollHandler(),this._ratio=n}}_increasePoolIfNeeded(t){if(this._physicalCount>2&&this._physicalAverage>0&&t>0){let i=Math.ceil(this._optPhysicalSize/this._physicalAverage)-this._physicalCount;super._increasePoolIfNeeded(Math.max(t,Math.min(100,i)))}else super._increasePoolIfNeeded(t)}get _optPhysicalSize(){let t=super._optPhysicalSize;return t<=0||this.__hasPlaceholders()?t:t+this.__getItemHeightBuffer()}__getItemHeightBuffer(){if(this._physicalCount===0)return 0;let t=Math.ceil(this._viewportHeight*(this._maxPages-1)/2),e=Math.max(...this._physicalSizes);return e>Math.min(...this._physicalSizes)?Math.max(0,e-t):0}__getVisibleElements(){return Array.from(this.elementsContainer.children).filter(t=>!t.hidden)}__reorderElements(){if(this.__mouseDown){this.__pendingReorder=!0;return}this.__pendingReorder=!1;let t=this._virtualStart+(this._vidxOffset||0),e=this.__getVisibleElements(),i=this.__getFocusedElement()||e[0];if(!i)return;let r=i.__virtualIndex-t,o=e.indexOf(i)-r;if(o>0)for(let n=0;n<o;n++)this.elementsContainer.appendChild(e[n]);else if(o<0)for(let n=e.length+o;n<e.length;n++)this.elementsContainer.insertBefore(e[n],e[0]);if(pr){let{transform:n}=this.scrollTarget.style;this.scrollTarget.style.transform="translateZ(0)",setTimeout(()=>{this.scrollTarget.style.transform=n})}}_adjustVirtualIndexOffset(t){let e=this._maxVirtualIndexOffset;if(this._virtualCount>=this.size)this._vidxOffset=0;else if(this.__skipNextVirtualIndexAdjust)this.__skipNextVirtualIndexAdjust=!1;else if(Math.abs(t)>1e4){let i=this._scrollTop/(this.scrollTarget.scrollHeight-this.scrollTarget.clientHeight);this._vidxOffset=Math.round(i*e)}else{let i=this._vidxOffset,r=zi,o=100,n,a,l=()=>{n=this.adjustedFirstVisibleIndex,a=this.__getIndexScrollOffset(n)};this._scrollTop===0?i!==0&&(l(),this._vidxOffset=0,super.scrollToIndex(0)):this.firstVisibleIndex<r&&this._vidxOffset>0&&(l(),this._vidxOffset-=Math.min(this._vidxOffset,o),super.scrollToIndex(this.firstVisibleIndex+(i-this._vidxOffset))),this._scrollTop>=this._maxScrollTop&&this._maxScrollTop>0?i!==e&&(l(),this._vidxOffset=e,super.scrollToIndex(this._virtualCount-1)):this.firstVisibleIndex>this._virtualCount-r&&this._vidxOffset<e&&(l(),this._vidxOffset+=Math.min(e-this._vidxOffset,o),super.scrollToIndex(this.firstVisibleIndex-(this._vidxOffset-i))),n!==void 0&&this.__restoreScrollOffset(n,a)}}};Object.setPrototypeOf(Ne.prototype,wr);var Et=class{constructor(t){this.__adapter=new Ne(t)}get firstVisibleIndex(){return this.__adapter.adjustedFirstVisibleIndex}get lastVisibleIndex(){return this.__adapter.adjustedLastVisibleIndex}get size(){return this.__adapter.size}set size(t){this.__adapter.size=t}scrollToIndex(t){this.__adapter.scrollToIndex(t)}update(t=0,e=this.size-1){this.__adapter.update(t,e)}flush(){this.__adapter.flush()}hostConnected(){this.__adapter.hostConnected()}};var Ir=s=>class extends s{static get properties(){return{items:{type:Array,sync:!0,observer:"__itemsChanged"},focusedIndex:{type:Number,sync:!0,observer:"__focusedIndexChanged"},loading:{type:Boolean,sync:!0,observer:"__loadingChanged"},opened:{type:Boolean,sync:!0,observer:"__openedChanged"},selectedItem:{type:Object,sync:!0,observer:"__selectedItemChanged"},itemClassNameGenerator:{type:Object,observer:"__itemClassNameGeneratorChanged"},owner:{type:Object},getItemLabel:{type:Object},renderer:{type:Object,sync:!0,observer:"__rendererChanged"},theme:{type:String}}}constructor(){super(),this.__boundOnItemClick=this.__onItemClick.bind(this)}get _viewportTotalPaddingBottom(){if(this._cachedViewportTotalPaddingBottom===void 0){let e=window.getComputedStyle(this.$.selector);this._cachedViewportTotalPaddingBottom=[e.paddingBottom,e.borderBottomWidth].map(i=>parseInt(i,10)).reduce((i,r)=>i+r)}return this._cachedViewportTotalPaddingBottom}ready(){super.ready(),this.setAttribute("role","listbox"),this.id=`${this.localName}-${ge()}`,this.__hostTagName=this.constructor.is.replace("-scroller",""),this.addEventListener("click",e=>e.stopPropagation()),this.__patchWheelOverScrolling()}requestContentUpdate(){this.__virtualizer&&(this.items&&(this.__virtualizer.size=this.items.length),this.opened&&this.__virtualizer.update())}scrollIntoView(e,i=!1){if(!this.__virtualizer||!(this.opened&&e>=0))return;let r=[...this.children].find(c=>!c.hidden&&c.index===e);if(!i&&r){let c=r.getBoundingClientRect(),p=this.getBoundingClientRect();if(c.top>=p.top&&c.bottom+this._viewportTotalPaddingBottom<=p.bottom)return}let o=e;if(!i){let c=this._visibleItemsCount();e>this.__virtualizer.lastVisibleIndex-1?(this.__virtualizer.scrollToIndex(e),o=e-c+1):e>this.__virtualizer.firstVisibleIndex&&(o=this.__virtualizer.firstVisibleIndex)}this.__virtualizer.scrollToIndex(Math.max(0,o)),this.__virtualizer.flush();let n=[...this.children].find(c=>!c.hidden&&c.index===e);if(!n)return;if(i){n.scrollIntoView({block:"center"});return}let a=n.getBoundingClientRect(),l=this.getBoundingClientRect(),d=a.bottom+this._viewportTotalPaddingBottom;d>l.bottom?this.scrollTop+=d-l.bottom:a.top<l.top&&(this.scrollTop-=l.top-a.top)}_isItemSelected(e,i){return e instanceof E?!1:this.owner._isSameItem(e,i)}__initVirtualizer(){this.__virtualizer=new Et({createElements:this.__createElements.bind(this),updateElement:this._updateElement.bind(this),elementsContainer:this,scrollTarget:this,scrollContainer:this.$.selector,reorderElements:!0,__disableHeightPlaceholder:!0})}__itemsChanged(e){e&&this.__virtualizer&&this.requestContentUpdate()}__loadingChanged(){this.requestContentUpdate()}__openedChanged(e){if(e){this.__virtualizer||this.__initVirtualizer(),this.requestContentUpdate(),this.focusedIndex>=0&&!this.loading&&this.scrollIntoView(this.focusedIndex);return}let i=this.__virtualizer&&this.__virtualizer.__adapter;i&&i._scrollPosition>0&&(this.scrollTop=0,i._scrollPosition=0)}__selectedItemChanged(){this.requestContentUpdate()}__itemClassNameGeneratorChanged(e,i){(e||i)&&this.requestContentUpdate()}__focusedIndexChanged(e,i){e!==i&&this.requestContentUpdate(),e>=0&&!this.loading&&this.scrollIntoView(e)}__rendererChanged(e,i){(e||i)&&this.requestContentUpdate()}__createElements(e){return[...Array(e)].map(()=>{let i=document.createElement(`${this.__hostTagName}-item`);return i.addEventListener("click",this.__boundOnItemClick),i.tabIndex="-1",i.style.width="100%",i})}_updateElement(e,i){let r=this.items[i],o=this.focusedIndex,n=this._isItemSelected(r,this.selectedItem);e.setProperties({item:r,index:i,label:this.getItemLabel(r),selected:n,renderer:this.renderer,focused:!this.loading&&o===i}),typeof this.itemClassNameGenerator=="function"?e.className=this.itemClassNameGenerator(r):e.className!==""&&(e.className=""),e.id=`${this.__hostTagName}-item-${i}`,e.setAttribute("role",i!==void 0?"option":!1),e.setAttribute("aria-selected",n.toString()),e.setAttribute("aria-posinset",i+1),e.setAttribute("aria-setsize",this.items.length),C(e,"theme",this.theme),r instanceof E&&this.__requestItemByIndex(i)}__onItemClick(e){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{item:e.currentTarget.item}}))}__patchWheelOverScrolling(){this.$.selector.addEventListener("wheel",e=>{let i=this.scrollTop===0,r=this.scrollHeight-this.scrollTop-this.clientHeight<=1;(i&&e.deltaY<0||r&&e.deltaY>0)&&e.preventDefault()})}__requestItemByIndex(e){requestAnimationFrame(()=>{this.dispatchEvent(new CustomEvent("index-requested",{detail:{index:e}}))})}_visibleItemsCount(){return this.__virtualizer.scrollToIndex(this.__virtualizer.firstVisibleIndex),this.__virtualizer.size>0?this.__virtualizer.lastVisibleIndex-this.__virtualizer.firstVisibleIndex+1:0}};var Er=h`
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
`;var Sr=Er;var ji=class extends Ir(v(f)){static get is(){return"vaadin-multi-select-combo-box-scroller"}static get styles(){return Sr}render(){return m`
      <div id="selector">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("aria-multiselectable","true")}_isItemSelected(t){return t instanceof E||this.owner.readonly?!1:this.owner.selectedItems.some(e=>this.owner._isSameItem(t,e))}_updateElement(t,e){super._updateElement(t,e),t.toggleAttribute("readonly",this.owner.readonly)}};_(ji);var B=s=>s??y;var Ar=h`
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
`;var St=h`
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
`;var Y=[St,Ar];var kr=h`
  :host([opened]) {
    pointer-events: auto;
  }

  [part~='toggle-button']::before {
    mask-image: var(--_vaadin-icon-chevron-down);
  }

  :host([readonly]) [part~='toggle-button'] {
    display: none;
  }
`;var Tr=[kr,h`
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
  `];var D=document.createElement("div");D.style.position="fixed";D.style.clip="rect(0px, 0px, 0px, 0px)";D.setAttribute("aria-live","polite");document.body.appendChild(D);var At;function Ce(s,t={}){let e=t.mode||"polite",i=t.timeout??150;e==="alert"?(D.removeAttribute("aria-live"),D.removeAttribute("role"),At=I.debounce(At,oe,()=>{D.setAttribute("role","alert")})):(At&&At.cancel(),D.removeAttribute("role"),D.setAttribute("aria-live",e)),D.textContent="",setTimeout(()=>{D.textContent=s},i)}var kt=class s{context;items=[];pendingRequests={};#e={};#t;#i=0;#s=0;constructor(t,e,i,r,o){this.context=t,this.pageSize=e,this.size=i,this.parentCache=r,this.parentCacheIndex=o,this.#s=i||0}get parentItem(){return this.parentCache&&this.parentCache.items[this.parentCacheIndex]}get subCaches(){return Object.values(this.#e)}get isLoading(){return Object.keys(this.pendingRequests).length>0?!0:this.subCaches.some(t=>t.isLoading)}get flatSize(){return this.#s}get pageSize(){return this.#t}set pageSize(t){this.#t=t,this.pendingRequests={},this.subCaches.forEach(e=>{e.pageSize=t})}get size(){return this.#i}set size(t){if(this.#i!==t){if(this.#i=t,this.context.placeholder!==void 0){this.items.length=t||0;for(let i=0;i<t;i++)this.items[i]||=this.context.placeholder}this.items.length>t&&(this.items.length=t||0),Object.keys(this.pendingRequests).forEach(i=>{parseInt(i)*this.pageSize>=this.size&&delete this.pendingRequests[i]})}}recalculateFlatSize(){this.#s=!this.parentItem||this.context.isExpanded(this.parentItem)?this.size+this.subCaches.reduce((t,e)=>(e.recalculateFlatSize(),t+e.flatSize),0):0}setPage(t,e){let i=t*this.pageSize;e.forEach((r,o)=>{let n=i+o;(this.size===void 0||n<this.size)&&(this.items[n]=r)})}getSubCache(t){return this.#e[t]}removeSubCache(t){delete this.#e[t]}removeSubCaches(){this.#e={}}createSubCache(t){let e=new s(this.context,this.pageSize,0,this,t);return this.#e[t]=e,e}getFlatIndex(t){let e=Math.max(0,Math.min(this.size-1,t));return this.subCaches.reduce((i,r)=>{let o=r.parentCacheIndex;return e>o?i+r.flatSize:i},e)}};function Hi(s,t,e=0){let i=t;for(let r of s.subCaches){let o=r.parentCacheIndex;if(i<=o)break;if(i<=o+r.flatSize)return Hi(r,i-o-1,e+1);i-=r.flatSize}return{cache:s,item:s.items[i],index:i,page:Math.floor(i/s.pageSize),level:e}}function Ui({getItemId:s},t,e,i=0,r=0){for(let o=0;o<t.items.length;o++){let n=t.items[o];if(n&&s(n)===s(e))return{cache:t,level:i,item:n,index:o,page:Math.floor(o/t.pageSize),subCache:t.getSubCache(o),flatIndex:r+t.getFlatIndex(o)}}for(let o of t.subCaches){let n=r+t.getFlatIndex(o.parentCacheIndex),a=Ui({getItemId:s},o,e,i+1,n+1);if(a)return a}}function qi(s,[t,...e],i=0){t===1/0&&(t=s.size-1);let r=s.getFlatIndex(t),o=s.getSubCache(t);return o?.flatSize>0&&e.length?qi(o,e,i+r+1):i+r}var Tt=class extends EventTarget{host;dataProvider;dataProviderParams;isExpanded;getItemId;rootCache;placeholder;isPlaceholder;constructor(t,{size:e,pageSize:i,isExpanded:r,getItemId:o,isPlaceholder:n,placeholder:a,dataProvider:l,dataProviderParams:d}){super(),this.host=t,this.getItemId=o,this.isExpanded=r,this.placeholder=a,this.isPlaceholder=n,this.dataProvider=l,this.dataProviderParams=d,this.rootCache=this.#t(i,e)}get flatSize(){return this.rootCache.flatSize}get pageSize(){return this.rootCache.pageSize}get#e(){return{isExpanded:this.isExpanded,placeholder:this.placeholder}}isLoading(){return this.rootCache.isLoading}setPageSize(t){this.rootCache.pageSize=t}setDataProvider(t){this.dataProvider=t}recalculateFlatSize(){this.rootCache.recalculateFlatSize()}clearCache(){this.rootCache=this.#t(this.rootCache.pageSize,this.rootCache.size)}getFlatIndexContext(t){return Hi(this.rootCache,t)}getItemContext(t){return Ui({getItemId:this.getItemId},this.rootCache,t)}getFlatIndexByPath(t){return qi(this.rootCache,t)}ensureFlatIndexLoaded(t){let{cache:e,page:i,item:r}=this.getFlatIndexContext(t);this.#s(r)||this.#i(e,i)}ensureFlatIndexHierarchy(t){let{cache:e,item:i,index:r}=this.getFlatIndexContext(t);if(this.#s(i)&&this.isExpanded(i)&&!e.getSubCache(r)){let o=e.createSubCache(r);this.#i(o,0)}}loadFirstPage(){this.#i(this.rootCache,0)}_shouldLoadCachePage(t,e){return!0}#t(t,e){return new kt(this.#e,t,e)}#i(t,e){if(!this.dataProvider||t.pendingRequests[e]||!this._shouldLoadCachePage(t,e))return;let i={page:e,pageSize:t.pageSize,parentItem:t.parentItem};this.dataProviderParams&&(i={...i,...this.dataProviderParams()});let r=(o,n)=>{t.pendingRequests[e]===r&&(n!==void 0?t.size=n:i.parentItem&&(t.size=o.length),t.setPage(e,o),this.recalculateFlatSize(),this.dispatchEvent(new CustomEvent("page-received")),delete t.pendingRequests[e],this.dispatchEvent(new CustomEvent("page-loaded")))};t.pendingRequests[e]=r,this.dispatchEvent(new CustomEvent("page-requested")),this.dataProvider(i,r)}#s(t){return this.isPlaceholder?!this.isPlaceholder(t):this.placeholder?t!==this.placeholder:!!t}};var Pr=s=>class extends s{static get properties(){return{pageSize:{type:Number,value:50,observer:"_pageSizeChanged",sync:!0},size:{type:Number,observer:"_sizeChanged",sync:!0},dataProvider:{type:Object,observer:"_dataProviderChanged",sync:!0}}}static get observers(){return["_dataProviderFilterChanged(filter)","_ensureFirstPage(opened)"]}constructor(){super(),this.__dataProviderInitialized=!1,this.__previousDataProviderFilter,this.__dataProviderController=new Tt(this,{placeholder:new E,isPlaceholder:e=>e instanceof E,dataProviderParams:()=>({filter:this.filter})}),this.__dataProviderController.addEventListener("page-requested",this.__onDataProviderPageRequested.bind(this)),this.__dataProviderController.addEventListener("page-loaded",this.__onDataProviderPageLoaded.bind(this))}ready(){super.ready(),this._scroller.addEventListener("index-requested",e=>{if(!this._shouldFetchData())return;let i=e.detail.index;i!==void 0&&this.__dataProviderController.ensureFlatIndexLoaded(i)}),this.__dataProviderInitialized=!0,this.dataProvider&&this.__synchronizeControllerState()}_dataProviderFilterChanged(e){if(this.__previousDataProviderFilter===void 0&&e===""){this.__previousDataProviderFilter=e;return}this.__previousDataProviderFilter!==e&&(this.__previousDataProviderFilter=e,this.__dataProviderController.rootCache.size=void 0,this.clearCache())}_shouldFetchData(){return this.dataProvider?this.opened||this.filter&&this.filter.length:!1}_ensureFirstPage(e){!this._shouldFetchData()||!e||(this._forceNextRequest||this.size===void 0?(this._forceNextRequest=!1,this.__dataProviderController.loadFirstPage()):this.size>0&&this.__dataProviderController.ensureFlatIndexLoaded(0))}__onDataProviderPageRequested(){this.__synchronizeControllerState()}__onDataProviderPageLoaded(){let{rootCache:e}=this.__dataProviderController;e.items=[...e.items],this.__synchronizeControllerState(),!this.opened&&!this._isInputFocused()&&this._commitValue()}clearCache(){this.dataProvider&&(this.__dataProviderController.clearCache(),this._shouldFetchData()?(this._forceNextRequest=!1,this.__dataProviderController.loadFirstPage()):this._forceNextRequest=!0,this.__synchronizeControllerState())}_sizeChanged(e){let{rootCache:i}=this.__dataProviderController;i.size!==e&&(i.size=e,i.items=[...i.items],this.__synchronizeControllerState())}_filteredItemsChanged(e){if(super._filteredItemsChanged(e),this.dataProvider&&e){let{rootCache:i}=this.__dataProviderController;i.items!==e&&(i.items=e,this.__synchronizeControllerState())}}__synchronizeControllerState(){if(this.__dataProviderInitialized&&this.dataProvider){let{rootCache:e}=this.__dataProviderController;this.setProperties({size:e.size,filteredItems:e.items,loading:this.__dataProviderController.isLoading()})}}_pageSizeChanged(e,i){if(Math.floor(e)!==e||e<1)throw this.pageSize=i,new Error("`pageSize` value must be an integer > 0");this.__dataProviderController.setPageSize(e),this.clearCache()}_dataProviderChanged(e,i){this._ensureItemsOrDataProvider(()=>{this.dataProvider=i}),this.__dataProviderController.setDataProvider(e),this.clearCache()}_ensureItemsOrDataProvider(e){if(this.items!==void 0&&this.dataProvider!==void 0)throw e(),new Error("Using `items` and `dataProvider` together is not supported")}};var Mr=s=>class extends s{static get observers(){return["__clearPendingFocusOnFilter(filter)"]}__focusIndex(e){if(!(typeof e!="number"||Number.isNaN(e)||e<0)&&!this.filter){if(!this._overlayOpened||!this._dropdownItems||this._dropdownItems.length===0){this.__pendingFocusIndex=e;return}if(!(e>=this._dropdownItems.length)){if(this._focusedIndex=e,this._scrollIntoView(e,!0),this.loading){this.__pendingFocusIndex=e;return}delete this.__pendingFocusIndex,requestAnimationFrame(()=>{this.isConnected&&this._updateActiveDescendant(e)})}}}__focusPendingIndexIfNeeded(){this.__pendingFocusIndex!==void 0&&!this.loading&&this.__focusIndex(this.__pendingFocusIndex)}__clearPendingFocusOnFilter(){delete this.__pendingFocusIndex}_onOpened(){super._onOpened(),this.__focusPendingIndexIfNeeded()}__onDataProviderPageLoaded(){super.__onDataProviderPageLoaded(),this.__focusPendingIndexIfNeeded()}};var Hn=s=>class extends s{static get properties(){return{inputElement:{type:Object,readOnly:!0,observer:"_inputElementChanged",sync:!0},type:{type:String,readOnly:!0},value:{type:String,value:"",observer:"_valueChanged",notify:!0,sync:!0}}}constructor(){super(),this._boundOnInput=this._onInput.bind(this),this._boundOnChange=this._onChange.bind(this)}get _hasValue(){return this.value!=null&&this.value!==""}get _inputElementValueProperty(){return"value"}get _inputElementValue(){return this.inputElement?this.inputElement[this._inputElementValueProperty]:void 0}set _inputElementValue(e){this.inputElement&&(this.inputElement[this._inputElementValueProperty]=e)}clear(){this.value="",this._inputElementValue=""}_addInputListeners(e){e.addEventListener("input",this._boundOnInput),e.addEventListener("change",this._boundOnChange)}_removeInputListeners(e){e.removeEventListener("input",this._boundOnInput),e.removeEventListener("change",this._boundOnChange)}_forwardInputValue(e){this.inputElement&&(this._inputElementValue=e??"")}_inputElementChanged(e,i){e?this._addInputListeners(e):i&&this._removeInputListeners(i)}_onInput(e){let i=e.composedPath()[0];this.__userInput=e.isTrusted,this.value=i.value,this.__userInput=!1}_onChange(e){}_toggleHasValue(e){this.toggleAttribute("has-value",e)}_valueChanged(e,i){this._toggleHasValue(this._hasValue),!(e===""&&i===void 0)&&(this.__userInput||this._forwardInputValue(e))}},Z=x(Hn);var Or=s=>class extends $(Z(K(G(s)))){static get properties(){return{opened:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0,sync:!0,observer:"_openedChanged"},autoOpenDisabled:{type:Boolean,sync:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},_focusedIndex:{type:Number,observer:"_focusedIndexChanged",value:-1,sync:!0},_toggleElement:{type:Object,observer:"_toggleElementChanged"},_dropdownItems:{type:Array,sync:!0},_overlayOpened:{type:Boolean,sync:!0,observer:"_overlayOpenedChanged"}}}constructor(){super(),this._scroller,this._closeOnBlurIsPrevented,this._boundOverlaySelectedItemChanged=this._overlaySelectedItemChanged.bind(this),this._boundOnClearButtonMouseDown=this.__onClearButtonMouseDown.bind(this),this._boundOnClick=this._onClick.bind(this),this._boundOnOverlayTouchAction=this._onOverlayTouchAction.bind(this),this._boundOnOverlayClick=this.__onOverlayClick.bind(this),this._boundOnTouchend=this._onTouchend.bind(this)}get _tagNamePrefix(){return"vaadin-combo-box"}_inputElementChanged(e){super._inputElementChanged(e),e&&(e.autocomplete="off",e.autocapitalize="off",e.setAttribute("role","combobox"),e.setAttribute("aria-autocomplete","list"),e.setAttribute("aria-expanded",!!this.opened),e.setAttribute("spellcheck","false"),e.setAttribute("autocorrect","off"))}firstUpdated(){super.firstUpdated(),this._initScroller()}ready(){super.ready(),this._initOverlay(),this.addEventListener("click",this._boundOnClick),this.addEventListener("touchend",this._boundOnTouchend),this.clearElement&&this.clearElement.addEventListener("mousedown",this._boundOnClearButtonMouseDown)}updated(e){super.updated(e),(e.has("opened")||e.has("_dropdownItems")||e.has("loading"))&&(this._overlayOpened=this.opened&&(!!this.loading||this._hasDropdownItems)),["_overlayOpened","_dropdownItems","_focusedIndex","_theme"].some(i=>e.has(i))&&this._updateScroller(),e.has("_overlayOpened")&&this._overlayOpened&&this._updateActiveDescendant(this._focusedIndex)}disconnectedCallback(){super.disconnectedCallback(),this.close()}open(){!this.disabled&&!this.readonly&&(this.opened=!0)}close(){this.opened=!1}_initOverlay(){let e=this.$.overlay;e.addEventListener("touchend",this._boundOnOverlayTouchAction),e.addEventListener("touchmove",this._boundOnOverlayTouchAction),e.addEventListener("click",this._boundOnOverlayClick,!0),e.addEventListener("mousedown",i=>i.preventDefault()),e.addEventListener("opened-changed",i=>{this._overlayOpened=i.detail.value}),e.addEventListener("vaadin-overlay-closed",()=>{this._scroller.items=[],this._onOverlayClosed()}),this._overlayElement=e}_initScroller(){let e=document.createElement(`${this._tagNamePrefix}-scroller`);e.owner=this,e.getItemLabel=this._getItemLabel.bind(this),e.addEventListener("selection-changed",this._boundOverlaySelectedItemChanged),this._renderScroller(e),this._scroller=e}_renderScroller(e){e.setAttribute("slot","overlay"),e.setAttribute("tabindex","-1"),this.appendChild(e)}_updateScroller(){let e=this._overlayOpened;e&&(this._scroller.style.maxHeight=getComputedStyle(this).getPropertyValue(`--${this._tagNamePrefix}-overlay-max-height`)||"65vh");let i=this.hasAttribute("closing");this._scroller.setProperties({items:e||i?this._dropdownItems:[],opened:e,focusedIndex:this._focusedIndex,theme:this._theme})}get _hasDropdownItems(){return!!(this._dropdownItems&&this._dropdownItems.length)}_overlayOpenedChanged(e,i){e?this._onOpened():i&&this._hasDropdownItems&&this.close()}_focusedIndexChanged(e,i){i!==void 0&&this._updateActiveDescendant(e)}_isInputFocused(){return this.inputElement&&L(this.inputElement)}_updateActiveDescendant(e){let i=this.inputElement;if(!i)return;let r=this._getItemElements().find(o=>o.index===e);C(i,"aria-activedescendant",r?.id)}_openedChanged(e,i){if(i===void 0)return;e?!this._isInputFocused()&&!Be&&this.inputElement&&this.inputElement.focus():(this.__blurOnClick=!1,this.autoselect&&(this.__autoselectPending=!0),this._onClosed());let r=this.inputElement;r&&(r.setAttribute("aria-expanded",!!e),C(r,"aria-controls",e&&this._scroller.id))}_onOverlayTouchAction(e){if(e.type==="touchend"){this.__blurOnClick=!0;return}this.__blurInputKeepOpened()}__onOverlayClick(){this.__blurOnClick&&(this.__blurOnClick=!1,this.__blurInputKeepOpened())}__blurInputKeepOpened(){this._closeOnBlurIsPrevented=!0,this.inputElement.blur(),this._closeOnBlurIsPrevented=!1}_isClearButton(e){return e.composedPath()[0]===this.clearElement}__onClearButtonMouseDown(e){e.preventDefault(),this.inputElement.focus()}_onClearButtonClick(e){e.preventDefault(),this._onClearAction()}_onToggleButtonClick(e){e.preventDefault(),this.opened?this.close():this.open()}_onHostClick(e){this.autoOpenDisabled||(e.preventDefault(),this.open())}_onClick(e){this.autoselect&&this.inputElement&&this.__autoselectPending&&(this.inputElement.selectionStart!==this.inputElement.selectionEnd||this.inputElement.select()),this.__autoselectPending=!1,this._isClearButton(e)?this._onClearButtonClick(e):e.composedPath().includes(this._toggleElement)?this._onToggleButtonClick(e):this._onHostClick(e)}_onTouchend(e){!this.clearElement||e.composedPath()[0]!==this.clearElement||(e.preventDefault(),this._onClearAction())}_onKeyDown(e){super._onKeyDown(e),e.key==="ArrowDown"?(this._onArrowDown(),e.preventDefault()):e.key==="ArrowUp"&&(this._onArrowUp(),e.preventDefault())}_getItemLabel(e){return e?e.toString():""}_isSameItem(e,i){return e===i}_onArrowDown(){if(this.opened){let e=this._dropdownItems;e&&(this._focusedIndex=Math.min(e.length-1,this._focusedIndex+1),this._prefillFocusedItemLabel())}else this.open()}_onArrowUp(){if(this.opened){if(this._focusedIndex>-1)this._focusedIndex=Math.max(0,this._focusedIndex-1);else{let e=this._dropdownItems;e&&(this._focusedIndex=e.length-1)}this._prefillFocusedItemLabel()}else this.open()}_prefillFocusedItemLabel(){if(this._focusedIndex>-1){let e=this._dropdownItems[this._focusedIndex];this._inputElementValue=this._getItemLabel(e),this._markAllSelectionRange()}}_setSelectionRange(e,i){this._isInputFocused()&&this.inputElement.setSelectionRange&&this.inputElement.setSelectionRange(e,i)}_markAllSelectionRange(){this._inputElementValue!==void 0&&this._setSelectionRange(0,this._inputElementValue.length)}_clearSelectionRange(){if(this._inputElementValue!==void 0){let e=this._inputElementValue?this._inputElementValue.length:0;this._setSelectionRange(e,e)}}_closeOrCommit(){this.opened?this.close():this._commitValue()}_onEnter(e){if(!this._hasValidInputValue()){e.preventDefault(),e.stopPropagation();return}this.opened&&(e.preventDefault(),e.stopPropagation()),this._closeOrCommit()}_hasValidInputValue(){return!0}_onEscape(e){this.autoOpenDisabled&&(this.opened||this.value!==this._inputElementValue&&this._inputElementValue.length>0)?(e.stopPropagation(),this._focusedIndex=-1,this._onEscapeCancel()):this.opened?(e.stopPropagation(),this._focusedIndex>-1?(this._focusedIndex=-1,this._revertInputValue()):this._onEscapeCancel()):this.clearButtonVisible&&this.value&&!this.readonly&&(e.stopPropagation(),this._onClearAction())}_onEscapeCancel(){}_toggleElementChanged(e){e&&(e.addEventListener("mousedown",i=>i.preventDefault()),e.addEventListener("click",()=>{Be&&!this._isInputFocused()&&document.activeElement.blur()}))}_onClearAction(){}_onOpened(){}_onClosed(){}_onOverlayClosed(){}_commitValue(){}_revertInputValue(){this._inputElementValue=this.value,this._clearSelectionRange()}_onInput(e){!this.opened&&!this._isClearButton(e)&&!this.autoOpenDisabled&&(this.opened=!0)}_getItemElements(){return Array.from(this._scroller.querySelectorAll(`${this._tagNamePrefix}-item`))}_scrollIntoView(e,i=!1){this._scroller&&this._scroller.scrollIntoView(e,i)}_overlaySelectedItemChanged(e){e.stopPropagation(),!this.hasAttribute("closing")&&(e.detail.item instanceof E||this.opened&&(this._focusedIndex=this._dropdownItems.indexOf(e.detail.item),this.close()))}_setFocused(e){super._setFocused(e),e||(this.__autoselectPending=!1),!e&&!this.readonly&&!this._closeOnBlurIsPrevented&&this._handleFocusOut()}_handleFocusOut(){if(V()){this._closeOrCommit();return}this.opened?this._overlayOpened||this.close():this._commitValue()}_shouldRemoveFocus(e){return e.relatedTarget&&e.relatedTarget.localName===`${this._tagNamePrefix}-item`?!1:e.relatedTarget===this._overlayElement?(e.composedPath()[0].focus(),!1):!0}};function Un(s){return s!=null}function $r(s,t){return s.findIndex(e=>e instanceof E?!1:t(e))}var Lr=s=>class extends Or(s){static get properties(){return{items:{type:Array,sync:!0,observer:"_itemsChanged"},filteredItems:{type:Array,observer:"_filteredItemsChanged",sync:!0},filter:{type:String,value:"",notify:!0,sync:!0},itemLabelGenerator:{type:Object},itemLabelPath:{type:String,value:"label",observer:"_itemLabelPathChanged",sync:!0},itemValuePath:{type:String,value:"value",sync:!0},itemIdPath:{type:String,sync:!0},partialMatchMode:{type:String,value:"none"}}}updated(e){super.updated(e),e.has("filter")&&this._filterChanged(this.filter),e.has("itemLabelGenerator")&&this.requestContentUpdate()}requestContentUpdate(){this._scroller&&(this._scroller.requestContentUpdate(),this._getItemElements().forEach(e=>{e.requestContentUpdate()}))}_onClearButtonClick(e){super._onClearButtonClick(e),this.opened&&this.requestContentUpdate()}_onInput(e){let i=this._inputElementValue;this.filter===i?this._filterChanged(this.filter):this.filter=i,!this.opened&&!this._isClearButton(e)&&!this.autoOpenDisabled&&(this.opened=!0)}_onOpened(){super._onOpened(),this.filter&&this._focusedIndex===-1&&(this._focusedIndex=this.__getItemIndexByFilter(this._dropdownItems))}_getItemLabel(e){if(typeof this.itemLabelGenerator=="function"&&e)return this.itemLabelGenerator(e)||"";let i=e&&this.itemLabelPath?le(this.itemLabelPath,e):void 0;return i==null&&(i=e?e.toString():""),i}_getItemValue(e){let i=e&&this.itemValuePath?le(this.itemValuePath,e):void 0;return i===void 0&&(i=e?e.toString():""),i}_isSameItem(e,i){if(this.itemIdPath&&e&&i){let r=le(this.itemIdPath,e);if(r!==void 0)return r===le(this.itemIdPath,i)}return super._isSameItem(e,i)}_itemLabelPathChanged(e){typeof e!="string"&&console.error("You should set itemLabelPath to a valid string")}_filterChanged(e){this._scrollIntoView(0),this._focusedIndex=-1,this.items?this.filteredItems=this._filterItems(this.items,e):this._filteredItemsChanged(this.filteredItems)}_itemsChanged(e,i){this._ensureItemsOrDataProvider(()=>{this.items=i}),e?this.filteredItems=e.slice(0):i&&(this.filteredItems=null)}_filteredItemsChanged(e){this._setDropdownItems(e)}_setDropdownItems(e){let i=this._dropdownItems;this._dropdownItems=e;let r=i?i[this._focusedIndex]:null;if(i&&i[this._focusedIndex]instanceof E&&e[this._focusedIndex]instanceof E)return;let o=this.__getItemIndexByValue(e,this._getItemValue(r));o>-1?this._focusedIndex=o:this._focusedIndex=this.__getItemIndexByFilter(e)}_filterItems(e,i){return e&&e.filter(o=>(i=i?i.toString().toLowerCase():"",this._getItemLabel(o).toString().toLowerCase().indexOf(i)>-1))}__getItemIndexByValue(e,i){return!e||!Un(i)?-1:$r(e,r=>this._getItemValue(r)===i)}__getItemIndexByLabel(e,i){return!e||!i?-1:$r(e,r=>this._getItemLabel(r).toString().toLowerCase()===i.toString().toLowerCase())}__getItemIndexByFilter(e){let i=this.__getItemIndexByLabel(e,this.filter);return i>-1?i:!this.opened||!e||e.length===0||!this.filter||this.allowCustomValue?-1:this.partialMatchMode==="first-match"||this.partialMatchMode==="only-match"&&e.length===1?e[0]instanceof E?-1:0:-1}};var qn=["__proto__","constructor","prototype"],Pt=s=>{if(!s||typeof s!="object")return!1;let t=Object.getPrototypeOf(s);return t===Object.prototype||t===null};function Vr(s,t,e){return!Pt(s)||!Pt(t)||Object.keys(t).forEach(i=>{if(qn.includes(i))return;let r=t[i];if(Pt(r)){if(!Object.hasOwn(s,i)||!Pt(s[i])){if(e&&Object.hasOwn(s,i)&&s[i])return;s[i]={}}Vr(s[i],r,e)}else e&&Array.isArray(r)?s[i]=[...r]:(!e||r!=null)&&(s[i]=r)}),s}function Wi(s,...t){return t.forEach(e=>Vr(s,e,!0)),s}var Dr=s=>class extends s{static get properties(){return{i18n:{type:Object},__effectiveI18n:{type:Object,sync:!0}}}static get defaultI18n(){return{}}constructor(){super(),this.i18n=Wi({},this.constructor.defaultI18n)}get i18n(){return this.__customI18n}set i18n(e){e!==this.__customI18n&&(this.__customI18n=e,this.__effectiveI18n=Wi({},this.constructor.defaultI18n,this.__customI18n))}};var Mt=new ResizeObserver(s=>{setTimeout(()=>{s.forEach(t=>{t.target.isConnected&&(t.target.resizables?t.target.resizables.forEach(e=>{e._onResize(t.contentRect)}):t.target._onResize(t.contentRect))})})}),Wn=s=>class extends s{get _observeParent(){return!1}connectedCallback(){if(super.connectedCallback(),Mt.observe(this),this._observeParent){let e=this.parentNode instanceof ShadowRoot?this.parentNode.host:this.parentNode;e.resizables||(e.resizables=new Set,Mt.observe(e)),e.resizables.add(this),this.__parent=e}}disconnectedCallback(){super.disconnectedCallback(),Mt.unobserve(this);let e=this.__parent;if(this._observeParent&&e){let i=e.resizables;i&&(i.delete(this),i.size===0&&Mt.unobserve(e)),this.__parent=null}}_onResize(e){}},Br=x(Wn);var Kn=s=>class extends G(ft(s)){static get properties(){return{autofocus:{type:Boolean},focusElement:{type:Object,readOnly:!0,observer:"_focusElementChanged",sync:!0},_lastTabIndex:{value:0}}}constructor(){super(),this._boundOnBlur=this._onBlur.bind(this),this._boundOnFocus=this._onFocus.bind(this)}ready(){super.ready(),this.autofocus&&!this.disabled&&requestAnimationFrame(()=>{this.focus()})}focus(e){if(this.focusElement&&!this.disabled){if(this.focusElement.focus({preventScroll:!!e?.preventScroll}),!L(this.focusElement))return;e?.focusVisible!==!1&&this.setAttribute("focus-ring","")}}blur(){this.focusElement&&this.focusElement.blur()}click(){this.focusElement&&!this.disabled&&this.focusElement.click()}_focusElementChanged(e,i){e?(e.disabled=this.disabled,this._addFocusListeners(e),this.__forwardTabIndex(this.tabindex)):i&&this._removeFocusListeners(i)}_addFocusListeners(e){e.addEventListener("blur",this._boundOnBlur),e.addEventListener("focus",this._boundOnFocus)}_removeFocusListeners(e){e.removeEventListener("blur",this._boundOnBlur),e.removeEventListener("focus",this._boundOnFocus)}_onFocus(e){e.stopPropagation(),this.dispatchEvent(new Event("focus"))}_onBlur(e){e.stopPropagation(),this.dispatchEvent(new Event("blur"))}_shouldSetFocus(e){return e.target===this.focusElement}_shouldRemoveFocus(e){return e.target===this.focusElement}_disabledChanged(e,i){super._disabledChanged(e,i),this.focusElement&&(this.focusElement.disabled=e),e&&this.blur()}_tabindexChanged(e){this.__forwardTabIndex(e)}__forwardTabIndex(e){e!==void 0&&this.focusElement&&(this.focusElement.tabIndex=e,e!==-1&&(this.tabindex=void 0)),this.disabled&&e&&(e!==-1&&(this._lastTabIndex=e),this.tabindex=void 0),e===void 0&&this.hasAttribute("tabindex")&&this.removeAttribute("tabindex")}},we=x(Kn);var Ki=new WeakMap;function Gn(s){return Ki.has(s)||Ki.set(s,new Set),Ki.get(s)}function Yn(s,t){let e=document.createElement("style");e.textContent=s,t===document?document.head.appendChild(e):t.insertBefore(e,t.firstChild)}var Zn=s=>class extends s{get slotStyles(){return[]}connectedCallback(){super.connectedCallback(),this.__applySlotStyles()}__applySlotStyles(){let e=this.getRootNode(),i=Gn(e);this.slotStyles.forEach(r=>{i.has(r)||(Yn(r,e),i.add(r))})}},Ot=x(Zn);var Nr=s=>class extends Z($(s)){static get properties(){return{clearButtonVisible:{type:Boolean,reflectToAttribute:!0,value:!1}}}get clearElement(){return console.warn(`Please implement the 'clearElement' property in <${this.localName}>`),null}ready(){super.ready(),this.clearElement&&(this.clearElement.addEventListener("mousedown",e=>this._onClearButtonMouseDown(e)),this.clearElement.addEventListener("click",e=>this._onClearButtonClick(e)))}_onClearButtonClick(e){e.preventDefault(),this._onClearAction()}_onClearButtonMouseDown(e){this._shouldKeepFocusOnClearMousedown()&&e.preventDefault(),Be||this.inputElement.focus()}_onEscape(e){super._onEscape(e),this.clearButtonVisible&&this.value&&!this.readonly&&(e.stopPropagation(),this._onClearAction())}_onClearAction(){this._inputElementValue="",this.inputElement.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.inputElement.dispatchEvent(new Event("change",{bubbles:!0}))}_shouldKeepFocusOnClearMousedown(){return L(this.inputElement)}};var $t=class{#e;#t=!1;#i;#s;#o;#r;#n;#l=[];#d=[];constructor(t){this.host=t}setTarget(t){this.#e=t,this.#h(),this.#c(),this.#a(),this.#u()}setRequired(t){this.#t=t,this.#u()}setLabel(t){this.#i=t,this.#h()}setLabelledBy(t){this.#s=t,this.#c()}setDescribedBy(t){this.#o=t,this.#a()}setErrorId(t){this.#r=t,this.#a()}setHelperId(t){this.#n=t,this.#a()}#h(){this.#e&&C(this.#e,"aria-label",this.#i)}#c(){this.#e&&(pi(this.#e,"aria-labelledby",this.#l),this.#l=[this.#s],ui(this.#e,"aria-labelledby",this.#l))}#a(){this.#e&&(pi(this.#e,"aria-describedby",this.#d),this.#d=[this.#o,this.#n,this.#r],ui(this.#e,"aria-describedby",this.#d))}#u(){this.#e&&(["input","textarea"].includes(this.#e.localName)||C(this.#e,"aria-required",this.#t))}};var X=class extends O{#e;constructor(t,e,i,r={}){super(t,e,i,{...r,useUniqueId:!0})}initCustomNode(t){this.#t(t),this._notifyChange(t)}teardownNode(t){let e=this.getSlotChild();e&&e!==this.defaultNode?this._notifyChange(e):(this.restoreDefaultNode(),this.updateDefaultNode(this.node))}attachDefaultNode(){let t=super.attachDefaultNode();return t&&this.#t(t),t}restoreDefaultNode(){}updateDefaultNode(t){this._notifyChange(t)}observeNode(t){this.#e&&this.#e.disconnect(),this.#e=new MutationObserver(e=>{e.forEach(i=>{let r=i.target,o=r===this.node;i.type==="attributes"?o&&this.#t(r):(o||r.parentElement===this.node)&&this._notifyChange(this.node)})}),this.#e.observe(t,{attributes:!0,attributeFilter:["id"],childList:!0,subtree:!0,characterData:!0})}_notifyChange(t){this.dispatchEvent(new CustomEvent("slot-content-changed",{detail:{hasContent:Ps(t),node:t}}))}#t(t){let e=!this.nodes||t===this.nodes[0];t.nodeType===Node.ELEMENT_NODE&&(!this.multiple||e)&&!t.id&&(t.id=this.defaultId)}};var Lt=class extends X{constructor(t){super(t,"error-message","div")}setErrorMessage(t){this.errorMessage=t,this.updateDefaultNode(this.node)}setInvalid(t){this.invalid=t,this.updateDefaultNode(this.node)}initAddedNode(t){t!==this.defaultNode&&this.initCustomNode(t)}initNode(t){this.updateDefaultNode(t)}initCustomNode(t){t.textContent&&!this.errorMessage&&(this.errorMessage=t.textContent.trim()),super.initCustomNode(t)}restoreDefaultNode(){this.attachDefaultNode()}updateDefaultNode(t){let{errorMessage:e,invalid:i}=this,r=!!(i&&e&&e.trim()!=="");t&&(t.textContent=r?e:"",t.hidden=!r,r&&Ce(e,{mode:"assertive"})),super.updateDefaultNode(t)}};var Vt=class extends X{constructor(t){super(t,"helper",null)}setHelperText(t){this.helperText=t,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){let{helperText:t}=this;if(t&&t.trim()!==""){this.tagName="div";let e=this.attachDefaultNode();this.observeNode(e)}}updateDefaultNode(t){t&&(t.textContent=this.helperText),super.updateDefaultNode(t)}initCustomNode(t){super.initCustomNode(t),this.observeNode(t)}};var Ie=class extends X{constructor(t){super(t,"label","label")}setLabel(t){this.label=t,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){let{label:t}=this;if(t&&t.trim()!==""){let e=this.attachDefaultNode();this.observeNode(e)}}updateDefaultNode(t){t&&(t.textContent=this.label),super.updateDefaultNode(t)}initCustomNode(t){super.initCustomNode(t),this.observeNode(t)}};var Fr=s=>class extends s{static get properties(){return{label:{type:String,observer:"_labelChanged"}}}constructor(){super(),this._labelController=new Ie(this),this._labelController.addEventListener("slot-content-changed",e=>{this.toggleAttribute("has-label",e.detail.hasContent)})}get _labelId(){return this._labelNode?.id}get _labelNode(){return this._labelController.node}ready(){super.ready(),this.addController(this._labelController)}_labelChanged(e){this._labelController.setLabel(e)}};var Xn=s=>class extends s{static get properties(){return{invalid:{type:Boolean,reflectToAttribute:!0,notify:!0,value:!1,sync:!0},manualValidation:{type:Boolean,value:!1},required:{type:Boolean,reflectToAttribute:!0,sync:!0}}}validate(){let t=this.checkValidity();return this._setInvalid(!t),this.dispatchEvent(new CustomEvent("validated",{detail:{valid:t}})),t}checkValidity(){return!this.required||!!this.value}_setInvalid(t){this._shouldSetInvalid(t)&&(this.invalid=t)}_shouldSetInvalid(t){return!0}_requestValidation(){this.manualValidation||this.validate()}},Dt=x(Xn);var Ee=s=>class extends Dt(Fr(s)){static get properties(){return{ariaTarget:{type:Object},errorMessage:{type:String},helperText:{type:String},accessibleName:{type:String},accessibleNameRef:{type:String},accessibleDescriptionRef:{type:String}}}constructor(){super(),this._labelController.addEventListener("slot-content-changed",e=>{this.#e(e)}),this._helperController=new Vt(this),this._helperController.addEventListener("slot-content-changed",e=>{this.#t(e)}),this._errorController=new Lt(this),this._errorController.addEventListener("slot-content-changed",e=>{this.#i(e)}),this._fieldAriaController=new $t(this)}get _errorNode(){return this._errorController.node}get _helperNode(){return this._helperController.node}ready(){super.ready(),this.addController(this._fieldAriaController),this.addController(this._helperController),this.addController(this._errorController)}updated(e){super.updated(e),e.has("invalid")&&this._errorController.setInvalid(this.invalid),e.has("errorMessage")&&this._errorController.setErrorMessage(this.errorMessage),e.has("helperText")&&this._helperController.setHelperText(this.helperText),e.has("ariaTarget")&&this._fieldAriaController.setTarget(this.ariaTarget),e.has("required")&&this._fieldAriaController.setRequired(this.required),e.has("accessibleName")&&this.__updateFieldAriaControllerLabel(),(e.has("accessibleName")||e.has("accessibleNameRef"))&&this.__updateFieldAriaControllerLabelledBy(),e.has("accessibleDescriptionRef")&&this.__updateFieldAriaControllerDescribedBy()}__updateFieldAriaControllerLabel(){this._fieldAriaController.setLabel(this.accessibleName)}__updateFieldAriaControllerLabelledBy(){let e=null;this.accessibleNameRef?e=this.accessibleNameRef:this.hasAttribute("has-label")&&!this.accessibleName&&(e=this._labelNode?.id),this._fieldAriaController.setLabelledBy(e)}__updateFieldAriaControllerDescribedBy(){this._fieldAriaController.setDescribedBy(this.accessibleDescriptionRef)}#e(e){this.__updateFieldAriaControllerLabelledBy()}#t(e){let{hasContent:i}=e.detail;this.toggleAttribute("has-helper",i),i?this._fieldAriaController.setHelperId(this._helperNode?.id):this._fieldAriaController.setHelperId(null)}#i(e){this.toggleAttribute("has-error-message",e.detail.hasContent),setTimeout(()=>{this.invalid?this._fieldAriaController.setErrorId(this._errorNode?.id):this._fieldAriaController.setErrorId(null)})}};var Qn=s=>class extends s{static get properties(){return{stateTarget:{type:Object,observer:"_stateTargetChanged"}}}static get delegateAttrs(){return[]}static get delegateProps(){return[]}ready(){super.ready(),this._createDelegateAttrsObserver(),this._createDelegatePropsObserver()}_stateTargetChanged(e){e&&(this._ensureAttrsDelegated(),this._ensurePropsDelegated())}_createDelegateAttrsObserver(){this._createMethodObserver(`_delegateAttrsChanged(${this.constructor.delegateAttrs.join(", ")})`)}_createDelegatePropsObserver(){this._createMethodObserver(`_delegatePropsChanged(${this.constructor.delegateProps.join(", ")})`)}_ensureAttrsDelegated(){this.constructor.delegateAttrs.forEach(e=>{this._delegateAttribute(e,this[e])})}_ensurePropsDelegated(){this.constructor.delegateProps.forEach(e=>{this._delegateProperty(e,this[e])})}_delegateAttrsChanged(...e){this.constructor.delegateAttrs.forEach((i,r)=>{this._delegateAttribute(i,e[r])})}_delegatePropsChanged(...e){this.constructor.delegateProps.forEach((i,r)=>{this._delegateProperty(i,e[r])})}_delegateAttribute(e,i){this.stateTarget&&(e==="invalid"&&this._delegateAttribute("aria-invalid",i?"true":!1),typeof i=="boolean"?this.stateTarget.toggleAttribute(e,i):C(this.stateTarget,e,i))}_delegateProperty(e,i){this.stateTarget&&(this.stateTarget[e]=i)}},Se=x(Qn);var Jn=s=>class extends Se(Dt(Z(s))){static get constraints(){return["required"]}static get delegateAttrs(){return[...super.delegateAttrs,"required"]}ready(){super.ready(),this._createConstraintsObserver()}checkValidity(){return this.inputElement&&this._hasValidConstraints(this.constructor.constraints.map(e=>this[e]))?this.inputElement.checkValidity():!this.invalid}_hasValidConstraints(e){return e.some(i=>this.__isValidConstraint(i))}_createConstraintsObserver(){this._createMethodObserver(`_constraintsChanged(stateTarget, ${this.constructor.constraints.join(", ")})`)}_constraintsChanged(e,...i){if(!e)return;let r=this._hasValidConstraints(i),o=this.__previousHasConstraints&&!r;(this._hasValue||this.invalid)&&r?this._requestValidation():o&&!this.manualValidation&&this._setInvalid(!1),this.__previousHasConstraints=r}_onChange(e){e.stopPropagation(),this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{detail:{sourceEvent:e},bubbles:e.bubbles,cancelable:e.cancelable}))}__isValidConstraint(e){return!!e||e===0}},Rr=x(Jn);var Bt=s=>class extends Ot(we(Rr(Ee(Nr($(s)))))){static get properties(){return{allowedCharPattern:{type:String,observer:"_allowedCharPatternChanged"},autoselect:{type:Boolean,value:!1},name:{type:String,reflectToAttribute:!0},placeholder:{type:String,reflectToAttribute:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},title:{type:String,reflectToAttribute:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"name","type","placeholder","readonly","invalid","title"]}constructor(){super(),this._boundOnPaste=this._onPaste.bind(this),this._boundOnDrop=this._onDrop.bind(this),this._boundOnBeforeInput=this._onBeforeInput.bind(this)}get slotStyles(){let e=this.localName;return[`
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
        `]}_onFocus(e){super._onFocus(e),this.autoselect&&this.inputElement&&this.inputElement.select()}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("paste",this._boundOnPaste),e.addEventListener("drop",this._boundOnDrop),e.addEventListener("beforeinput",this._boundOnBeforeInput)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("paste",this._boundOnPaste),e.removeEventListener("drop",this._boundOnDrop),e.removeEventListener("beforeinput",this._boundOnBeforeInput)}_onKeyDown(e){super._onKeyDown(e),this.allowedCharPattern&&!this.__shouldAcceptKey(e)&&e.target===this.inputElement&&(e.preventDefault(),this._markInputPrevented())}_markInputPrevented(){this.setAttribute("input-prevented",""),this._preventInputDebouncer=I.debounce(this._preventInputDebouncer,q.after(200),()=>{this.removeAttribute("input-prevented")})}__shouldAcceptKey(e){return e.metaKey||e.ctrlKey||!e.key||e.key.length!==1||this.__allowedCharRegExp.test(e.key)}_onPaste(e){if(this.allowedCharPattern){let i=e.clipboardData.getData("text");this.__allowedTextRegExp.test(i)||(e.preventDefault(),this._markInputPrevented())}}_onDrop(e){if(this.allowedCharPattern){let i=e.dataTransfer.getData("text");this.__allowedTextRegExp.test(i)||(e.preventDefault(),this._markInputPrevented())}}_onBeforeInput(e){this.allowedCharPattern&&e.data&&!this.__allowedTextRegExp.test(e.data)&&(e.preventDefault(),this._markInputPrevented())}_allowedCharPatternChanged(e){if(e)try{this.__allowedCharRegExp=new RegExp(`^${e}$`,"u"),this.__allowedTextRegExp=new RegExp(`^${e}*$`,"u")}catch(i){console.error(i)}}};var N=class extends O{constructor(t,e,i={}){let{uniqueIdPrefix:r}=i;super(t,"input","input",{initializer:(o,n)=>{n.value&&(o.value=n.value),n.type&&o.setAttribute("type",n.type),o.id=this.defaultId,typeof e=="function"&&e(o)},useUniqueId:!0,uniqueIdPrefix:r})}};var F=class{constructor(t,e){this.input=t,e.addEventListener("slot-content-changed",i=>{this.#e(i.detail.node)}),this.#e(e.node)}#e(t){t&&(t.addEventListener("click",this.#t),this.input&&t.setAttribute("for",this.input.id))}#t=()=>{let t=e=>{e.stopImmediatePropagation(),this.input.removeEventListener("click",t)};this.input.addEventListener("click",t)}};var ea={cleared:"Selection cleared",focused:"focused. Press Backspace to remove",selected:"added to selection",deselected:"removed from selection",total:"{count} items selected"},zr=s=>class extends Dr(Mr(Pr(Lr(Bt(Br(s)))))){static get properties(){return{autoExpandHorizontally:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},autoExpandVertically:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},collapseChips:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},itemClassNameGenerator:{type:Object,sync:!0},keepFilter:{type:Boolean,value:!1},loading:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},selectedItems:{type:Array,value:()=>[],notify:!0,sync:!0},allowCustomValue:{type:Boolean,value:!1},placeholder:{type:String,observer:"_placeholderChanged",reflectToAttribute:!0,sync:!0},renderer:{type:Function,sync:!0},selectedItemsOnTop:{type:Boolean,value:!1,sync:!0},value:{type:String},_overflowItems:{type:Array,value:()=>[],sync:!0},_focusedChipIndex:{type:Number,value:-1,observer:"_focusedChipIndexChanged"},_lastFilter:{type:String,sync:!0},_topGroup:{type:Array,observer:"_topGroupChanged",sync:!0},_inputField:{type:Object}}}static get observers(){return["_selectedItemsChanged(selectedItems)","__updateOverflowChip(_overflow, _overflowItems, disabled, readonly)","__updateTopGroup(selectedItemsOnTop, selectedItems, opened)"]}static get defaultI18n(){return ea}get i18n(){return super.i18n}set i18n(e){super.i18n=e}get slotStyles(){let e=this.localName;return[...super.slotStyles,`
        ${e}[has-value] input::placeholder {
          color: transparent !important;
          forced-color-adjust: none;
        }
      `]}get clearElement(){return this.$.clearButton}get _chips(){return[...this.querySelectorAll('[slot="chip"]')]}get _hasValue(){return this.selectedItems&&this.selectedItems.length>0}get _tagNamePrefix(){return"vaadin-multi-select-combo-box"}ready(){super.ready(),this.addController(new N(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new F(this.inputElement,this._labelController)),this._tooltipController=new T(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this._tooltipController.setShouldShow(e=>!e.opened),this._toggleElement=this.$.toggleButton,this._inputField=this.shadowRoot.querySelector('[part="input-field"]'),this._overflowController=new O(this,"overflow","vaadin-multi-select-combo-box-chip",{initializer:e=>{e.addEventListener("mousedown",i=>this._preventBlur(i)),this._overflow=e}}),this.addController(this._overflowController)}updated(e){super.updated(e),["loading","itemClassNameGenerator","renderer"].forEach(r=>{e.has(r)&&(this._scroller[r]=this[r])}),e.has("selectedItems")&&this.opened&&this.$.overlay._updateOverlayWidth(),["autoExpandHorizontally","autoExpandVertically","collapseChips","disabled","readonly","clearButtonVisible","itemClassNameGenerator"].some(r=>e.has(r))&&this.__updateChips(),e.has("readonly")&&(this._setDropdownItems(this.filteredItems),this.dataProvider&&this.clearCache())}checkValidity(){return this.required&&!this.readonly?this._hasValue:!0}open(){!this.disabled&&!(this.readonly&&this.selectedItems.length===0)&&(this.opened=!0)}clear(){this.__updateSelection([]),Ce(this.__effectiveI18n.cleared)}__syncTopGroup(){this._topGroup=this.selectedItemsOnTop?[...this.selectedItems]:[]}clearCache(){this.readonly||(super.clearCache(),this.__syncTopGroup())}_itemsChanged(e,i){super._itemsChanged(e,i),this.__syncTopGroup()}_onHostClick(e){let i=e.composedPath();(i.includes(this._labelNode)||i.includes(this._inputField))&&super._onHostClick(e)}_onClearAction(){this.clear()}_onClosed(){this._ignoreCommitValue=!0,(!this.loading||this.allowCustomValue)&&this._commitValue()}_revertInputValue(){this._inputElementValue=this.filter,this._clearSelectionRange()}_commitValue(){this._lastFilter=this.filter,this._ignoreCommitValue?(this._inputElementValue="",this._focusedIndex=-1,this._ignoreCommitValue=!1):this.__commitUserInput(),(!this.keepFilter||!this.opened)&&(this.filter="")}__commitUserInput(){if(this._focusedIndex>-1){let e=this._dropdownItems[this._focusedIndex];if(this._lastFilter&&this._lastFilter===this._inputElementValue&&this._findIndex(e,this.selectedItems)!==-1){this.__clearInternalValue();return}this.__selectItem(e)}else if(this._inputElementValue){let e=[...this._dropdownItems],i=e[this.__getItemIndexByLabel(e,this._inputElementValue)];if(this.allowCustomValue&&!i){let r=this._inputElementValue;this._lastCustomValue=r,this.__clearInternalValue(!0),this.dispatchEvent(new CustomEvent("custom-value-set",{detail:r,composed:!0,bubbles:!0}))}else!this.allowCustomValue&&!this.opened&&i?this.__selectItem(i):this._inputElementValue=""}}_setFocused(e){let i=!e&&!this._closeOnBlurIsPrevented;i&&(this._ignoreCommitValue=!0),super._setFocused(e),i&&document.hasFocus()&&(this._focusedChipIndex=-1,this._requestValidation()),i&&this.readonly&&this.close()}_onResize(){this.__updateChips()}_delegateAttribute(e,i){if(this.stateTarget){if(e==="required"){this._delegateAttribute("aria-required",i?"true":!1);return}super._delegateAttribute(e,i)}}_placeholderChanged(e){let i=this.__tmpA11yPlaceholder;i!==e&&(this.__savedPlaceholder=e,i&&(this.placeholder=i))}_selectedItemsChanged(e){if(this._toggleHasValue(this._hasValue),this._hasValue){let i=this._mergeItemLabels(e);this.__tmpA11yPlaceholder===void 0&&(this.__savedPlaceholder=this.placeholder),this.__tmpA11yPlaceholder=i,this.placeholder=i}else this.__tmpA11yPlaceholder!==void 0&&(delete this.__tmpA11yPlaceholder,this.placeholder=this.__savedPlaceholder);this.__updateChips(),this.requestContentUpdate()}_topGroupChanged(e){e&&this._setDropdownItems(this.filteredItems)}_hasValidInputValue(){let e=this._focusedIndex<0&&this._inputElementValue!=="";return this.allowCustomValue||!e}_shouldFetchData(){return this.readonly?!1:super._shouldFetchData()}_setDropdownItems(e){super._setDropdownItems(this.__generateDropdownItems(e))}__generateDropdownItems(e){if(this.readonly)return this.selectedItems;if(this.filter||!this.selectedItemsOnTop)return e;if(e?.length&&this._topGroup?.length){let i=e.filter(r=>this._findIndex(r,this._topGroup)===-1);return this._topGroup.concat(i)}return e}_mergeItemLabels(e){return e.map(i=>this._getItemLabel(i)).join(", ")}_findIndex(e,i){return i.findIndex(r=>this._isSameItem(e,r))}__clearInternalValue(e=!1){!this.keepFilter||e?(this.filter="",this._inputElementValue=""):this._inputElementValue=this.filter}__announceItem(e,i,r){let o=i?"selected":"deselected",n=this.__effectiveI18n.total.replace("{count}",r||0);Ce(`${e} ${this.__effectiveI18n[o]} ${n}`)}__removeItem(e){let i=[...this.selectedItems];i.splice(this._findIndex(e,i),1),this.__updateSelection(i);let r=this._getItemLabel(e);this.__announceItem(r,!1,i.length)}__selectItem(e){let i=[...this.selectedItems],r=this._findIndex(e,i),o=this._getItemLabel(e),n=!1;if(r!==-1){if(this._lastFilter?.toLowerCase()===o.toLowerCase()){this.__clearInternalValue();return}i.splice(r,1)}else i.push(e),n=!0;this.__updateSelection(i),this.__clearInternalValue(),this.__announceItem(o,n,i.length)}__updateSelection(e){this.selectedItems=e,this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}__updateTopGroup(e,i,r){e?(!r||this.__needToSyncTopGroup())&&(this._topGroup=[...i]):this._topGroup=[]}__needToSyncTopGroup(){return this.itemIdPath?this._topGroup&&this._topGroup.some(e=>{let i=this.selectedItems[this._findIndex(e,this.selectedItems)];return i&&e!==i}):!1}__createChip(e){let i=document.createElement("vaadin-multi-select-combo-box-chip");i.setAttribute("slot","chip"),i.item=e,i.disabled=this.disabled,i.readonly=this.readonly;let r=this._getItemLabel(e);return i.label=r,i.setAttribute("title",r),typeof this.itemClassNameGenerator=="function"&&(i.className=this.itemClassNameGenerator(e)),i.addEventListener("item-removed",o=>this._onItemRemoved(o)),i.addEventListener("mousedown",o=>this._preventBlur(o)),i}__getUsedWidth(e){return parseFloat(getComputedStyle(e).width)}__getWrapperGap(){return parseFloat(getComputedStyle(this._inputField.$.wrapper).columnGap)||0}__getWrapperWidth(){return this.__getUsedWidth(this._inputField.$.wrapper)-this.__getWrapperGap()}__getOverflowWidth(e){let i=this._overflow;i.style.visibility="hidden",i.removeAttribute("hidden"),i.label=`${e}`,i.setAttribute("count",`${e}`);let{marginInlineStart:r,marginInlineEnd:o}=getComputedStyle(i),n=this.__getUsedWidth(i)+parseFloat(r)+parseFloat(o)+this.__getWrapperGap();return i.setAttribute("hidden",""),i.style.visibility="",n}__updateChips(){if(!this._inputField||!this.inputElement)return;if(this._chips.forEach(i=>{i.remove()}),this.selectedItems.length===0){this._overflowItems=[];return}if(this.autoExpandVertically){this.selectedItems.forEach(i=>{this.appendChild(this.__createChip(i))}),this._overflowItems=[];return}let e=parseFloat(getComputedStyle(this.inputElement).flexBasis);this.collapseChips?this._overflowItems=this.__updateChipsCollapsed(this.selectedItems,e):this.autoExpandHorizontally?this._overflowItems=this.__updateChipsHorizontalExpand(this.selectedItems,e):this._overflowItems=this.__updateChipsDefault(this.selectedItems,e)}__renderAllChips(e,i){let r=e.map(n=>{let a=this.__createChip(n);return this.appendChild(a),a}),o=this.__getWrapperWidth()-this.__getUsedWidth(this.$.chips)>=i;return{chips:r,allChipsFit:o}}__updateChipsCollapsed(e,i){let{chips:r,allChipsFit:o}=this.__renderAllChips(e,i);return o?[]:(r.forEach(n=>n.remove()),e.slice())}__updateChipsHorizontalExpand(e,i){let{chips:r,allChipsFit:o}=this.__renderAllChips(e,i);if(o)return[];let n=this.__getWrapperWidth(),a=this.__getOverflowWidth(e.length-1),l=r.length;for(;l>1;){l-=1,r[l].remove();let d=this.__getUsedWidth(this.$.chips);if(n-d>=i+a&&(a=this.__getOverflowWidth(e.length-l),n-d>=i+a))break}if(l===1){let d=parseInt(getComputedStyle(this).getPropertyValue("--_chip-min-width")),c=n-i-a;r[0].style.maxWidth=`${Math.max(d,c)}px`}return e.slice(l)}__updateChipsDefault(e,i){let r=this.__getWrapperWidth()-i,o=parseInt(getComputedStyle(this).getPropertyValue("--_chip-min-width"));for(let n=e.length-1,a=null;n>=0;n--){let l=this.__createChip(e[n]);this.insertBefore(l,a);let d=e.length>1?r-this.__getOverflowWidth(Math.max(n,1)):r;if(this.__getUsedWidth(this.$.chips)>d&&(d<o||a!==null))return l.remove(),e.slice(0,n+1);l.style.maxWidth=`${d}px`,a=l}return[]}__updateOverflowChip(e,i,r,o){if(e){let n=i.length;e.label=`${n}`,e.setAttribute("count",`${n}`),e.setAttribute("title",this._mergeItemLabels(i)),e.toggleAttribute("hidden",n===0),e.disabled=r,e.readonly=o}}_onClearButtonClick(e){e.stopPropagation(),super._onClearButtonClick(e)}_onChange(e){e.stopPropagation()}_onEscape(e){if(this.readonly){e.stopPropagation(),this.opened&&this.close();return}this.clearButtonVisible&&!this.opened&&this.selectedItems&&this.selectedItems.length&&(e.stopPropagation(),this._onClearAction()),super._onEscape(e)}_onEscapeCancel(){this._closeOrCommit()}_onEnter(e){if(this.opened){if(e.preventDefault(),e.stopPropagation(),this.readonly)this.close();else if(this._hasValidInputValue()){let i=this._dropdownItems[this._focusedIndex];this._commitValue(),this._focusedIndex=this._dropdownItems.indexOf(i)}return}super._onEnter(e)}_onArrowDown(){this.readonly?this.opened||this.open():super._onArrowDown()}_onArrowUp(){this.readonly?this.opened||this.open():super._onArrowUp()}_onKeyDown(e){super._onKeyDown(e);let i=this._chips;if(!this.readonly&&i.length>0)switch(e.key){case"Backspace":this._onBackSpace(i);break;case"ArrowLeft":this._onArrowLeft(i,e);break;case"ArrowRight":this._onArrowRight(i,e);break;default:this._focusedChipIndex=-1;break}}_onArrowLeft(e,i){if(this.inputElement.selectionStart!==0)return;let r=this._focusedChipIndex;r!==-1&&i.preventDefault();let o;this.__isRTL?r===e.length-1?o=-1:r>-1&&(o=r+1):r===-1?o=e.length-1:r>0&&(o=r-1),o!==void 0&&(this._focusedChipIndex=o)}_onArrowRight(e,i){if(this.inputElement.selectionStart!==0)return;let r=this._focusedChipIndex;r!==-1&&i.preventDefault();let o;this.__isRTL?r===-1?o=e.length-1:r>0&&(o=r-1):r===e.length-1?o=-1:r>-1&&(o=r+1),o!==void 0&&(this._focusedChipIndex=o)}_onBackSpace(e){if(this.inputElement.selectionStart!==0)return;let i=this._focusedChipIndex;i===-1?this._focusedChipIndex=e.length-1:(this.__removeItem(e[i].item),this._focusedChipIndex=-1)}_focusedChipIndexChanged(e,i){if(e>-1||i>-1){let r=this._chips;if(r.forEach((o,n)=>{o.toggleAttribute("focused",n===e)}),e>-1){let o=r[e].item,n=this._getItemLabel(o);Ce(`${n} ${this.__effectiveI18n.focused}`)}}}_overlaySelectedItemChanged(e){e.stopPropagation(),!this.hasAttribute("closing")&&(this.readonly||e.detail.item instanceof E||this.opened&&(this._lastFilter=this._inputElementValue,this.__selectItem(e.detail.item)))}_onItemRemoved(e){this.__removeItem(e.detail.item)}_preventBlur(e){e.preventDefault()}};var Fe=class extends zr(b(M(v(g(f))))){static get is(){return"vaadin-multi-select-combo-box"}static get styles(){return[Y,Tr]}render(){return m`
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
          theme="${B(this._theme)}"
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
        theme="${B(this._theme)}"
        .positionTarget="${this._inputField}"
        no-vertical-overlap
      >
        <slot name="overlay"></slot>
      </vaadin-multi-select-combo-box-overlay>
    `}};_(Fe);var ta=function(s,t,e,i){var r,o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,t,e,i);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(o<3?r(n):o>3?r(t,e,n):r(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n},jr=class extends Fe{};jr=ta([P("or-vaadin-multi-select-combo-box")],jr);var Hr=h`
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
`;var Nt=s=>class extends Bt(s){static get properties(){return{autocomplete:{type:String},autocorrect:{type:String,reflectToAttribute:!0},autocapitalize:{type:String,reflectToAttribute:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"autocapitalize","autocomplete","autocorrect"]}_inputElementChanged(e,i){super._inputElementChanged(e,i),e&&(e.value&&e.value!==this.value&&(console.warn(`Please define value on the <${this.localName}> component!`),e.value=""),this.value&&(e.value=this.value))}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}_onInput(e){super._onInput(e),this.invalid&&this._requestValidation()}_valueChanged(e,i){super._valueChanged(e,i),i!==void 0&&this.invalid&&this._requestValidation()}};var Ur="NaN",qr=s=>class extends Nt(s){static get properties(){return{min:{type:Number},max:{type:Number},step:{type:Number},stepButtonsVisible:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["_stepChanged(step, inputElement)"]}static get delegateProps(){return[...super.delegateProps,"min","max"]}static get constraints(){return[...super.constraints,"min","max","step"]}constructor(){super(),this._setType("number"),this.__onWheel=this.__onWheel.bind(this)}get slotStyles(){let e=this.localName;return[`
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
        `]}get clearElement(){return this.$.clearButton}get __hasUnparsableValue(){return this._inputElementValue===Ur}ready(){super.ready(),this.addController(new N(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new F(this.inputElement,this._labelController)),this._tooltipController=new T(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement)}checkValidity(){return this.inputElement?this.inputElement.checkValidity():!this.invalid}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("wheel",this.__onWheel)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("wheel",this.__onWheel)}__onWheel(e){this.hasAttribute("focused")&&e.preventDefault()}_onDecreaseButtonTouchend(e){e.cancelable&&(e.preventDefault(),this.__blurActiveElement(),this._decreaseValue())}_onIncreaseButtonTouchend(e){e.cancelable&&(e.preventDefault(),this.__blurActiveElement(),this._increaseValue())}__blurActiveElement(){let e=ce();e&&e!==this.inputElement&&e.blur()}_onDecreaseButtonClick(){this._decreaseValue()}_onIncreaseButtonClick(){this._increaseValue()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;let i=this.step||1,r=parseFloat(this.value);this.value?r<this.min?(e=0,r=this.min):r>this.max&&(e=0,r=this.max):this.min===0&&e<0||this.max===0&&e>0||this.max===0&&this.min===0?(e=0,r=0):(this.max==null||this.max>=0)&&(this.min==null||this.min<=0)?r=0:this.min>0?(r=this.min,this.max<0&&e<0&&(r=this.max),e=0):this.max<0&&(r=this.max,e<0?e=0:this._getIncrement(1,r-i)>this.max?r-=2*i:r-=i);let o=this._getIncrement(e,r);(!this.value||e===0||this._incrementIsInsideTheLimits(e,r))&&(this.inputElement.value=String(parseFloat(o)),this.inputElement.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.__commitValueChange())}_getIncrement(e,i){let r=this.step||1,o=this.min||0,n=Math.max(this._getMultiplier(i),this._getMultiplier(r),this._getMultiplier(o));r*=n,i=Math.round(i*n),o*=n;let a=(i-o)%r;return e>0?(i-a+r)/n:e<0?(i-(a||r))/n:i/n}_getDecimalCount(e){let i=String(e),r=i.indexOf(".");return r===-1?1:i.length-r-1}_getMultiplier(e){if(!isNaN(e))return 10**this._getDecimalCount(e)}_incrementIsInsideTheLimits(e,i){return e<0?this.min==null||this._getIncrement(e,i)>=this.min:e>0?this.max==null||this._getIncrement(e,i)<=this.max:this._getIncrement(e,i)<=this.max&&this._getIncrement(e,i)>=this.min}_isButtonEnabled(e){let i=e*(this.step||1),r=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(i,r)}_stepChanged(e,i){i&&(i.step=e||"any")}_valueChanged(e,i){e&&isNaN(parseFloat(e))?this.value="":typeof this.value!="string"&&(this.value=String(this.value)),super._valueChanged(this.value,i),this.__keepCommittedValue||(this.__committedValue=this.value,this.__committedUnparsableValueStatus=!1)}_onKeyDown(e){e.key==="ArrowUp"?(e.preventDefault(),this._increaseValue()):e.key==="ArrowDown"&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}_onInput(e){this.__keepCommittedValue=!0,super._onInput(e),this.__keepCommittedValue=!1}_onChange(e){e.stopPropagation()}_onClearAction(e){super._onClearAction(e),this.__commitValueChange()}_setFocused(e){super._setFocused(e),e||this.__commitValueChange()}_onEnter(e){super._onEnter(e),this.__commitValueChange()}__commitValueChange(){this.__committedValue!==this.value?(this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))):this.__committedUnparsableValueStatus!==this.__hasUnparsableValue&&(this._requestValidation(),this.dispatchEvent(new CustomEvent("unparsable-change"))),this.__committedValue=this.value,this.__committedUnparsableValueStatus=this.__hasUnparsableValue}get _inputElementValue(){return this.inputElement&&this.inputElement.validity.badInput?Ur:super._inputElementValue}set _inputElementValue(e){super._inputElementValue=e}};var Re=class extends qr(b(M(v(g(f))))){static get is(){return"vaadin-number-field"}static get styles(){return[Y,Hr]}render(){return m`
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
          theme="${B(this._theme)}"
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
    `}};_(Re);var ia=function(s,t,e,i){var r,o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,t,e,i);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(o<3?r(n):o>3?r(t,e,n):r(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n},Wr=class extends Re{_onEnter(s){return this.dispatchEvent(new CustomEvent("submit",{bubbles:!0,composed:!0})),super._onEnter(s)}};Wr=ia([P("or-vaadin-number-field")],Wr);var Kr=s=>class extends xe(G(s)){static get properties(){return{_hasVaadinItemMixin:{value:!0},selected:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_selectedChanged",sync:!0},_value:String}}get _activeKeys(){return["Enter"," "]}get value(){return this._value??this.textContent.trim()}set value(e){this._value=e}ready(){super.ready();let e=this.getAttribute("value");e!==null&&(this.value=e),this.__shouldAllowFocusWhenDisabled()&&this.style.setProperty("--_vaadin-item-disabled-pointer-events","auto")}focus(e){this.disabled&&!this.__shouldAllowFocusWhenDisabled()||super.focus(e)}_shouldSetActive(e){return!this.disabled&&!(e.type==="keydown"&&e.defaultPrevented)}_selectedChanged(e){this.setAttribute("aria-selected",e)}_disabledChanged(e){super._disabledChanged(e),e&&(this.selected=!1,this.__shouldAllowFocusWhenDisabled()||this.blur())}_onKeyDown(e){super._onKeyDown(e),this._activeKeys.includes(e.key)&&!e.defaultPrevented&&(e.preventDefault(),this.click())}__shouldAllowFocusWhenDisabled(){return!1}};var Gi=class extends Kr(b(k(v(g(f))))){static get is(){return"vaadin-select-item"}static get styles(){return _t}static get properties(){return{role:{type:String,value:"option",reflectToAttribute:!0}}}render(){return m`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}};_(Gi);function Gr(s,t){let{scrollLeft:e}=s;return t!=="rtl"?e:s.scrollWidth-s.clientWidth+e}function Yr(s,t,e){t!=="rtl"?s.scrollLeft=e:s.scrollLeft=s.clientWidth-s.scrollWidth+e}var Zr=s=>class extends $(s){get focused(){return(this._getItems()||[]).find(L)}get _vertical(){return!0}get _tabNavigation(){return!1}focus(e){let i=this._getFocusableIndex();i>=0&&this._focus(i,e)}_getFocusableIndex(){let e=this._getItems();return Array.isArray(e)?this._getAvailableIndex(e,0,null,i=>!ue(i)):-1}_getItems(){return Array.from(this.children)}_onKeyDown(e){if(super._onKeyDown(e),e.metaKey||e.ctrlKey)return;let{key:i,shiftKey:r}=e,o=this._getItems()||[],n=o.indexOf(this.focused),a,l,c=!this._vertical&&this.getAttribute("dir")==="rtl"?-1:1;this.__isPrevKeyPressed(i,r)?(l=-c,a=n-c):this.__isNextKeyPressed(i,r)?(l=c,a=n+c):i==="Home"?(l=1,a=0):i==="End"&&(l=-1,a=o.length-1),a=this._getAvailableIndex(o,a,l,p=>!ue(p)),!(this._tabNavigation&&i==="Tab"&&(a>n&&e.shiftKey||a<n&&!e.shiftKey||a===n))&&a>=0&&(e.preventDefault(),this._focus(a,{focusVisible:!0,preventScroll:!0},!0))}__isPrevKeyPressed(e,i){return this._vertical?e==="ArrowUp":e==="ArrowLeft"||this._tabNavigation&&e==="Tab"&&i}__isNextKeyPressed(e,i){return this._vertical?e==="ArrowDown":e==="ArrowRight"||this._tabNavigation&&e==="Tab"&&!i}_focus(e,i,r=!1){let o=this._getItems();this._focusItem(o[e],i,r)}_focusItem(e,i){e&&e.focus(i)}_getAvailableIndex(e,i,r,o){let n=e.length,a=i;for(let l=0;typeof a=="number"&&l<n;l+=1,a+=r||1){a<0?a=n-1:a>=n&&(a=0);let d=e[a];if(this._isItemFocusable(d)&&this.__isMatchingItem(d,o))return a}return-1}__isMatchingItem(e,i){return typeof i=="function"?i(e):!0}_isItemFocusable(e){return!e.hasAttribute("disabled")}};var Xr=s=>class extends Zr(s){static get properties(){return{disabled:{type:Boolean,value:!1,reflectToAttribute:!0},selected:{type:Number,reflectToAttribute:!0,notify:!0,sync:!0},orientation:{type:String,reflectToAttribute:!0,value:""},items:{type:Array,readOnly:!0,notify:!0},_searchBuf:{type:String,value:""}}}static get observers(){return["_enhanceItems(items, orientation, selected, disabled)"]}constructor(){super(),this._hasVaadinListMixin=!0}get _isRTL(){return!this._vertical&&this.getAttribute("dir")==="rtl"}get _scrollerElement(){return console.warn(`Please implement the '_scrollerElement' property in <${this.localName}>`),this}get _vertical(){return this.orientation!=="horizontal"}focus(e){this._observer&&this._observer.flush();let i=Array.isArray(this.items)?this.items:[],r=this._getAvailableIndex(i,0,null,o=>o.tabIndex===0&&!ue(o));r>=0?this._focus(r,e):super.focus(e)}ready(){super.ready(),this.addEventListener("click",i=>this._onClick(i));let e=this.shadowRoot.querySelector("slot:not([name])");this._observer=new ve(e,()=>{this._setItems(this._filterItems([...this.children]))})}_getItems(){return this.items}_enhanceItems(e,i,r,o){if(!o&&e){this.setAttribute("aria-orientation",i||"vertical"),e.forEach(a=>C(a,"orientation",i)),this._setFocusable(r<0||!r?0:r);let n=e[r];e.forEach(a=>{a.selected=a===n}),n&&!n.disabled&&this._scrollToItem(r)}}_filterItems(e){return e.filter(i=>i._hasVaadinItemMixin)}_onClick(e){if(e.metaKey||e.shiftKey||e.ctrlKey||e.defaultPrevented)return;let i=this._filterItems(e.composedPath())[0],r;i&&!i.disabled&&(r=this.items.indexOf(i))>=0&&(this.selected=r)}_searchKey(e,i){this._searchReset=I.debounce(this._searchReset,q.after(500),()=>{this._searchBuf=""}),this._searchBuf+=i.toLowerCase(),this.items.some(o=>this.__isMatchingKey(o))||(this._searchBuf=i.toLowerCase());let r=this._searchBuf.length===1?e+1:e;return this._getAvailableIndex(this.items,r,1,o=>this.__isMatchingKey(o)&&getComputedStyle(o).display!=="none")}__isMatchingKey(e){return e.textContent.replace(/[^\p{L}\p{Nd}]/gu,"").toLowerCase().startsWith(this._searchBuf)}_onKeyDown(e){if(e.metaKey||e.ctrlKey)return;let i=e.key,r=this.items.indexOf(this.focused);if(/[\p{L}\p{Nd}]/u.test(i)&&i.length===1){let o=this._searchKey(r,i);o>=0&&this._focus(o);return}super._onKeyDown(e)}_setFocusable(e){e=this._getAvailableIndex(this.items,e,1);let i=this.items[e];this.items.forEach(r=>{r.tabIndex=r===i?0:-1})}_focus(e,i){this.items.forEach((r,o)=>{r.focused=o===e}),this._setFocusable(e),this._scrollToItem(e),super._focus(e,i??{preventScroll:!0})}_scrollToItem(e){let i=this._getItems()[e];i&&i.scrollIntoView({block:"nearest",inline:"nearest"})}_scroll(e){if(this._vertical)this._scrollerElement.scrollTop+=e;else{let i=this.getAttribute("dir")||"ltr",r=Gr(this._scrollerElement,i)+e;Yr(this._scrollerElement,i,r)}}_isItemFocusable(e){return e.disabled&&e.__shouldAllowFocusWhenDisabled?e.__shouldAllowFocusWhenDisabled():super._isItemFocusable(e)}};var Qr=h`
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
`;var Yi=class extends Xr(b(k(v(g(f))))){static get is(){return"vaadin-select-list-box"}static get styles(){return Qr}static get properties(){return{orientation:{readOnly:!0}}}get _scrollerElement(){return this.shadowRoot.querySelector('[part="items"]')}render(){return m`
      <div part="items">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("role","listbox")}};_(Yi);var Jr=h`
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
`;var eo=s=>class extends vt(It(k(s))){willUpdate(e){super.willUpdate(e),(e.has("opened")||e.has("positionTarget"))&&this.opened&&this.positionTarget&&this._updateOverlayWidth()}ready(){super.ready(),this.restoreFocusOnClose=!0}_initFocus(){}get _contentRoot(){return this.owner.__slottedListBox||this._rendererRoot}get _rendererRoot(){if(!this.__savedRoot){let e=document.createElement("div");e.setAttribute("slot","overlay"),this.owner.appendChild(e),this.__savedRoot=e}return this.__savedRoot}_shouldCloseOnOutsideClick(e){return!0}_mouseDownListener(e){super._mouseDownListener(e),e.preventDefault()}_getMenuElement(){let i=this.owner.shadowRoot.querySelector('slot[name="overlay"]').assignedElements();return i.find(r=>r._hasVaadinListMixin)||i.flatMap(r=>[...r.children]).find(r=>r._hasVaadinListMixin)}_updateOverlayWidth(){this.style.setProperty("--_vaadin-select-overlay-default-width",`${this.positionTarget.offsetWidth}px`)}requestContentUpdate(){if(super.requestContentUpdate(),this.owner){let e=this._getMenuElement();this.owner._assignMenuElement(e)}}};var Zi=class extends eo(b(v(g(f)))){static get is(){return"vaadin-select-overlay"}static get styles(){return[gt,Jr]}render(){return m`
      <div id="backdrop" part="backdrop" ?hidden="${!this.withBackdrop}"></div>
      <div part="overlay" id="overlay">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `}updated(t){super.updated(t),t.has("renderer")&&this.requestContentUpdate()}};_(Zi);var to=h`
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
`;var Xi=class extends mt(b(v(g(f)))){static get is(){return"vaadin-select-value-button"}static get styles(){return to}render(){return m`
      <div class="vaadin-button-container" role="presentation">
        <span part="label">
          <slot></slot>
        </span>
      </div>
    `}};_(Xi);var io=h`
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
`;var so=h`
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
`;var Ft=class{#e=null;constructor(t,e){this.query=t,this.callback=e}hostConnected(){this.#i(),this.#e=window.matchMedia(this.query),this.#t(),this.#s(this.#e)}hostDisconnected(){this.#i()}#t(){this.#e&&this.#e.addListener(this.#s)}#i(){this.#e&&this.#e.removeListener(this.#s),this.#e=null}#s=t=>{typeof this.callback=="function"&&this.callback(t.matches)}};var Rt=class extends O{constructor(t){super(t,"value","vaadin-select-value-button",{initializer:(e,i)=>{i._setFocusElement(e),i.ariaTarget=e,i.stateTarget=e,e.setAttribute("aria-haspopup","listbox")}})}};var ro=s=>class extends we(Se($(Ee(s)))){static get properties(){return{items:{type:Array},opened:{type:Boolean,value:!1,notify:!0,observer:"_openedChanged",reflectToAttribute:!0,sync:!0},renderer:{type:Object},value:{type:String,value:"",notify:!0,observer:"_valueChanged",sync:!0},name:{type:String},placeholder:{type:String},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},noVerticalOverlap:{type:Boolean,value:!1},_phone:Boolean,_phoneMediaQuery:{value:"(max-width: 450px), (max-height: 450px)"},_inputContainer:Object,_items:Object,__slottedListBox:{type:Object,sync:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"invalid"]}static get observers(){return["_updateAriaExpanded(opened, focusElement)","_updateSelectedItem(value, _items, placeholder, focusElement)"]}constructor(){super(),this._itemId=`value-${this.localName}-${ge()}`,this._srLabelController=new Ie(this),this._srLabelController.slotName="sr-label"}disconnectedCallback(){super.disconnectedCallback(),this.opened=!1}ready(){super.ready(),this._inputContainer=this.shadowRoot.querySelector('[part~="input-field"]'),this._overlayElement=this.$.overlay,this._valueButtonController=new Rt(this),this.addController(this._valueButtonController),this.addController(this._srLabelController),this.addController(new Ft(this._phoneMediaQuery,e=>{this._phone=e})),this._tooltipController=new T(this),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.focusElement),this.addController(this._tooltipController)}updated(e){if(super.updated(e),e.has("_phone")&&this.toggleAttribute("phone",this._phone),(e.has("items")||e.has("renderer")||e.has("__slottedListBox"))&&this.__slottedListBox&&(this.items?.length||this.renderer))throw new Error('A slotted <vaadin-select-list-box> cannot be used together with the "items" or "renderer" property.');if(e.has("items")&&this._overlayElement.requestContentUpdate(),e.has("__slottedListBox")){let i=this.__slottedListBox;i?this._assignMenuElement(i):e.get("__slottedListBox")&&(this._menuElement=null,this._items=null,this.__lastMenuElement=null)}e.has("accessibleName")&&this._srLabelController.setLabel(this.accessibleName),e.has("required")&&this.required===!1&&this._requestValidation()}requestContentUpdate(){this._overlayElement&&this._overlayElement.requestContentUpdate()}__onOverlaySlotChange(e){this.__slottedListBox=e.target.assignedElements().find(i=>i._hasVaadinListMixin)}_assignMenuElement(e){e&&e!==this.__lastMenuElement&&(this._menuElement=e,this.__initMenuItems(e),e.addEventListener("items-changed",()=>{this.__initMenuItems(e)}),e.addEventListener("selected-changed",()=>this.__updateValueButton()),e.addEventListener("keydown",i=>this._onKeyDownInside(i),!0),e.addEventListener("click",i=>{let r=i.composedPath().find(o=>o._hasVaadinItemMixin);this.__dispatchChangePending=r?.value!==void 0&&r.value!==this.value,this.opened=!1},!0),this.__lastMenuElement=e),this._menuElement&&this._menuElement.items&&this._updateSelectedItem(this.value,this._menuElement.items)}__initMenuItems(e){e.items&&(this._items=e.items)}_valueChanged(e,i){this.toggleAttribute("has-value",!!e),i!==void 0&&!this.__dispatchChangePending&&this._requestValidation()}_onClick(e){this.disabled||(e.preventDefault(),this.opened=!this.readonly)}_onEscape(e){this.opened&&(e.stopPropagation(),this.opened=!1)}_onToggleMouseDown(e){e.preventDefault(),this.opened||this.focusElement.focus()}_onKeyDown(e){if(super._onKeyDown(e),!(e.altKey||e.shiftKey||e.ctrlKey||e.metaKey)&&e.target===this.focusElement&&!this.readonly&&!this.disabled&&!this.opened){if(/^(Enter|SpaceBar|\s|ArrowDown|Down|ArrowUp|Up)$/u.test(e.key))e.preventDefault(),this.opened=!0;else if(/[\p{L}\p{Nd}]/u.test(e.key)&&e.key.length===1){let r=this._menuElement.selected??-1,o=this._menuElement._searchKey(r,e.key);o>=0&&(this.__dispatchChangePending=!0,this._updateAriaLive(!0),this._menuElement.selected=o)}}}_onKeyDownInside(e){e.key==="Tab"&&(this.focusElement.setAttribute("tabindex","-1"),this._overlayElement.restoreFocusOnClose=!1,this.opened=!1,setTimeout(()=>{this.focusElement.setAttribute("tabindex","0"),this._overlayElement.restoreFocusOnClose=!0}))}_openedChanged(e,i){if(e){if(this.disabled||this.readonly){this.opened=!1;return}this._updateAriaLive(!1);let r=this.hasAttribute("focus-ring");this._openedWithFocusRing=r,r&&this.removeAttribute("focus-ring")}else i&&(this._openedWithFocusRing&&this.setAttribute("focus-ring",""),!this.__dispatchChangePending&&!this._keyboardActive&&this._requestValidation())}_updateAriaExpanded(e,i){i&&i.setAttribute("aria-expanded",e?"true":"false")}_updateAriaLive(e){this.focusElement&&C(this.focusElement,"aria-live",e&&"polite")}__attachSelectedItem(e){let i,r=e.getAttribute("label");r?i=this.__createItemElement({label:r}):i=e.cloneNode(!0),i._sourceItem=e,this.__appendValueItemElement(i,this.focusElement),i.selected=!0}__createItemElement(e){let i=document.createElement(e.component||"vaadin-select-item");return e.label&&(i.textContent=e.label),e.value&&(i.value=e.value),e.disabled&&(i.disabled=e.disabled),e.className&&(i.className=e.className),i}__appendValueItemElement(e,i){i.appendChild(e),e.removeAttribute("tabindex"),e.removeAttribute("aria-selected"),e.removeAttribute("role"),e.removeAttribute("focused"),e.removeAttribute("focus-ring"),e.removeAttribute("active"),e.setAttribute("id",this._itemId)}__updateValueButton(){let e=this.focusElement;if(!e)return;e.innerHTML="";let i=this._items?this._items[this._menuElement.selected]:void 0;if(e.removeAttribute("placeholder"),this._hasContent(i))this.__attachSelectedItem(i);else if(this.placeholder){let r=this.__createItemElement({label:this.placeholder});this.__appendValueItemElement(r,e),e.setAttribute("placeholder","")}!this._valueChanging&&i&&(this._selectedChanging=!0,this.value=i.value||"",this.__dispatchChangePending&&this.__dispatchChange(),delete this._selectedChanging),this.__updateFieldAriaControllerLabelledBy()}_hasContent(e){if(!e)return!1;let i=!!(e.hasAttribute("label")?e.getAttribute("label"):e.textContent.trim()),r=e.childElementCount>0;return i||r}_updateSelectedItem(e,i,r){if(i){let o=e==null?e:e.toString();this._menuElement.selected=i.reduce((n,a,l)=>n===void 0&&a.value===o?l:n,void 0),this._selectedChanging||(this._valueChanging=!0,this.__updateValueButton(),delete this._valueChanging)}else r&&this.__updateValueButton()}_shouldRemoveFocus(e){return!this.contains(e.relatedTarget)}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}checkValidity(){return!this.required||this.readonly||!!this.value}__defaultRenderer(e,i){if(!this.items||this.items.length===0){e.textContent="";return}let r=e.firstElementChild;r||(r=document.createElement("vaadin-select-list-box"),e.appendChild(r)),r.textContent="",this.items.forEach(o=>{r.appendChild(this.__createItemElement(o))})}__dispatchChange(){this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this.__dispatchChangePending=!1}__updateFieldAriaControllerLabel(){}__updateFieldAriaControllerLabelledBy(){let e;this.accessibleNameRef?e=this.accessibleNameRef:this.accessibleName?e=this._srLabelController.defaultId:this.hasAttribute("has-label")&&(e=this._labelNode?.id);let r=this._items?.[this._menuElement.selected]||this.placeholder?this._itemId:null,o=[e,r].filter(Boolean);o.length>0?this._fieldAriaController.setLabelledBy(o.join(" ")):this._fieldAriaController.setLabelledBy(null)}};var ze=class extends ro(M(b(v(g(f))))){static get is(){return"vaadin-select"}static get styles(){return[Y,io,so]}render(){return m`
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
          theme="${B(this._theme)}"
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
        theme="${B(this._theme)}"
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
    `}_onOpenedChanged(t){this.opened=t.detail.value}_onOverlayOpen(){this._menuElement&&this._menuElement.focus({focusVisible:V()})}};_(ze);var jt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qi=s=>(...t)=>({_$litDirective$:s,values:t}),zt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{I:Yv}=_s;var oo=s=>s.strings===void 0;var je=(s,t)=>{let e=s._$AN;if(e===void 0)return!1;for(let i of e)i._$AO?.(t,!1),je(i,t);return!0},Ht=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while(e?.size===0)},no=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),oa(t)}};function sa(s){this._$AN!==void 0?(Ht(this),this._$AM=s,no(this)):this._$AM=s}function ra(s,t=!1,e=0){let i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(i))for(let o=e;o<i.length;o++)je(i[o],!1),Ht(i[o]);else i!=null&&(je(i,!1),Ht(i));else je(this,s)}var oa=s=>{s.type==jt.CHILD&&(s._$AP??=ra,s._$AQ??=sa)},Ut=class extends zt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),no(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(je(this,t),Ht(this))}setValue(t){if(oo(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var ao=Symbol("valueNotInitialized"),qt=class extends Ut{constructor(t){if(super(t),t.type!==jt.ELEMENT)throw new Error(`\`${this.constructor.name}\` must be bound to an element.`);this.previousValue=ao}render(t,e){return y}update(t,[e,i]){return this.hasChanged(i)?(this.host=t.options&&t.options.host,this.element=t.element,this.renderer=e,this.previousValue===ao?this.addRenderer():this.runRenderer(),this.previousValue=Array.isArray(i)?[...i]:i,y):y}reconnected(){this.addRenderer()}disconnected(){this.removeRenderer()}addRenderer(){throw new Error("The `addRenderer` method must be implemented.")}runRenderer(){throw new Error("The `runRenderer` method must be implemented.")}removeRenderer(){throw new Error("The `removeRenderer` method must be implemented.")}renderRenderer(t,...e){let i=this.renderer.call(this.host,...e);it(i,t,{host:this.host})}hasChanged(t){return Array.isArray(t)?!Array.isArray(this.previousValue)||this.previousValue.length!==t.length?!0:t.some((e,i)=>e!==this.previousValue[i]):this.previousValue!==t}};var Ji=class extends qt{addRenderer(){this.element.renderer=(t,e)=>{this.renderRenderer(t,e)}}runRenderer(){this.element.requestContentUpdate()}removeRenderer(){this.element.renderer=null}},na=Qi(Ji);var aa=function(s,t,e,i){var r,o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,t,e,i);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(o<3?r(n):o>3?r(t,e,n):r(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n},lo=class extends ze{};lo=aa([P("or-vaadin-select")],lo);var ho=s=>class extends Nt(s){static get properties(){return{maxlength:{type:Number},minlength:{type:Number},pattern:{type:String},inputMode:{type:String,attribute:"inputmode"}}}static get delegateAttrs(){return[...super.delegateAttrs,"maxlength","minlength","pattern","inputMode"]}static get constraints(){return[...super.constraints,"maxlength","minlength","pattern"]}constructor(){super(),this._setType("text")}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new N(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new F(this.inputElement,this._labelController))}};var He=class extends ho(b(M(v(g(f))))){static get is(){return"vaadin-text-field"}static get styles(){return[Y]}render(){return m`
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
          theme="${B(this._theme)}"
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
    `}ready(){super.ready(),this._tooltipController=new T(this),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}_renderSuffix(){return m`
      <slot name="suffix" slot="suffix"></slot>
      <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
    `}};_(He);var co=function(s,t,e,i){var r,o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,t,e,i);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(o<3?r(n):o>3?r(t,e,n):r(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n},es=class extends He{willUpdate(s){super.willUpdate(s),s.has("type")&&this.type!==void 0&&this._setType(this.type)}_onEnter(s){return this.dispatchEvent(new CustomEvent("submit",{bubbles:!0,composed:!0})),super._onEnter(s)}};co([Yt({type:String})],es.prototype,"type",void 0),es=co([P("or-vaadin-text-field")],es);var uo=(s,t=s)=>h`
  :host {
    align-items: baseline;
    column-gap: var(--vaadin-${u(t)}-gap, var(--vaadin-gap-s));
    grid-template: none;
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(auto-fill, minmax(0, max-content));
    -webkit-tap-highlight-color: transparent;
    --_cursor: var(--vaadin-clickable-cursor);
    --_marker-color: var(--vaadin-${u(t)}-marker-color, var(--vaadin-${u(t)}-background, var(--vaadin-background-color)));
    --_marker-filter: var(--vaadin-${u(t)}-marker-color, saturate(0) invert(1) hue-rotate(180deg) contrast(100) brightness(100));
  }

  :host(:not([has-label])) {
    column-gap: 0;
  }

  [part='${u(s)}'],
  ::slotted(input),
  [part='label'],
  ::slotted(label) {
    grid-row: 1;
  }

  [part='label'],
  ::slotted(label) {
    font-size: var(--vaadin-${u(t)}-label-font-size, var(--vaadin-input-field-label-font-size, inherit));
    line-height: var(--vaadin-${u(t)}-label-line-height, var(--vaadin-input-field-label-line-height, inherit));
    font-weight: var(--vaadin-${u(t)}-label-font-weight, var(--vaadin-input-field-label-font-weight, 500));
    color: var(--vaadin-${u(t)}-label-color, var(--vaadin-input-field-label-color, var(--vaadin-text-color)));
    word-break: break-word;
    cursor: var(--_cursor);
  }

  [part='${u(s)}'],
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
    margin-inline-end: calc(min(0px, (24px - 100%) / -2) - var(--vaadin-${u(t)}-gap, var(--vaadin-gap-s))) !important;
  }

  /* Control container (checkbox, radio button) */
  [part='${u(s)}'] {
    background: var(--vaadin-${u(t)}-background, var(--vaadin-background-color));
    border-color: var(--vaadin-${u(t)}-border-color, var(--vaadin-input-field-border-color, var(--vaadin-border-color)));
    border-radius: var(--vaadin-${u(t)}-border-radius, var(--vaadin-radius-s));
    border-style: var(--_border-style, solid);
    --_border-width: var(--vaadin-${u(t)}-border-width, var(--vaadin-input-field-border-width, 1px));
    border-width: var(--_border-width);
    box-sizing: border-box;
    color: var(--_marker-color);
    height: var(--vaadin-${u(t)}-size, round(1.125em, 2px));
    width: var(--vaadin-${u(t)}-size, round(1.125em, 2px));
    position: relative;
    cursor: var(--_cursor);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host(:is([checked], [indeterminate])) {
    --vaadin-${u(t)}-background: var(--vaadin-text-color);
    --vaadin-${u(t)}-border-color: transparent;
  }

  :host([readonly]) {
    --vaadin-${u(s)}-background: transparent;
    --vaadin-${u(s)}-border-color: var(--vaadin-border-color);
    --vaadin-${u(s)}-marker-color: var(--vaadin-text-color);
    --_border-style: dashed;
    --_cursor: var(--vaadin-disabled-cursor);

    [part='label'],
    ::slotted(label) {
      cursor: default;
    }
  }

  :host([disabled]) {
    --vaadin-${u(t)}-background: var(--vaadin-input-field-disabled-background, var(--vaadin-background-container-strong));
    --vaadin-${u(t)}-border-color: transparent;
    --vaadin-${u(t)}-marker-color: var(--vaadin-text-color-disabled);
    --_cursor: var(--vaadin-disabled-cursor);
  }

  /* Focus ring */
  :host([focus-ring]) [part='${u(s)}'] {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--_border-width) * -1);
  }

  :host([focus-ring]:is([checked], [indeterminate])) [part='${u(s)}'] {
    outline-offset: 1px;
  }

  :host([readonly][focus-ring]) [part='${u(s)}'] {
    --vaadin-${u(t)}-border-color: transparent;
    outline-offset: calc(var(--_border-width) * -1);
    outline-style: dashed;
  }

  /* Checked indicator (checkmark, dot) */
  [part='${u(s)}']::after {
    content: '\\2003' / '';
    background: currentColor;
    border-radius: inherit;
    display: flex;
    align-items: center;
    filter: var(--_marker-filter);
  }

  :host(:not([checked], [indeterminate])) [part='${u(s)}']::after {
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

    [part='${u(s)}'],
    ::slotted(input) {
      grid-column: 2;
    }

    ::slotted(input) {
      margin-inline: calc(min(0px, (24px - 100%) / -2) - var(--vaadin-${u(t)}-gap, var(--vaadin-gap-s))) 0 !important;
    }
  }

  @media (forced-colors: active) {
    :host(:is([checked], [indeterminate])) {
      --vaadin-${u(t)}-border-color: CanvasText !important;
    }

    :host(:is([checked], [indeterminate])) [part='${u(s)}'] {
      background: SelectedItem !important;
    }

    :host(:is([checked], [indeterminate])) [part='${u(s)}']::after {
      background: SelectedItemText !important;
    }

    :host([readonly]) [part='${u(s)}']::after {
      background: CanvasText !important;
    }

    :host([disabled]) {
      --vaadin-${u(t)}-border-color: GrayText !important;
    }

    :host([disabled]) [part='${u(s)}']::after {
      background: GrayText !important;
    }
  }
`;var la=h`
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
`,po=[St,uo("checkbox"),la];var fo=s=>class extends Se(K(Z(s))){static get properties(){return{checked:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0,sync:!0}}}static get delegateProps(){return[...super.delegateProps,"checked"]}_onChange(e){let i=e.target;this._toggleChecked(i.checked)}_toggleChecked(e){this.checked=e}};var mo=s=>class extends Ot(Ee(fo(we(xe(s))))){static get properties(){return{name:{type:String,value:""},readonly:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["__readonlyChanged(readonly, inputElement)"]}static get delegateAttrs(){return[...super.delegateAttrs,"name","invalid","required"]}constructor(){super(),this._setType("checkbox"),this._boundOnInputClick=this._onInputClick.bind(this),this.value="on",this.tabindex=0}get slotStyles(){return[`
          ${this.localName} > input[slot='input'] {
            opacity: 0;
          }
        `]}ready(){super.ready(),this.addController(new N(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new F(this.inputElement,this._labelController)),this._createPropertyObserver("checked","_checkedChanged")}updated(e){super.updated(e),e.has("required")&&this.required===!1&&this._requestValidation()}_shouldSetActive(e){let[i]=e.composedPath(),r=i===this.inputElement||i.part.contains("required-indicator")||this._labelNode?.contains(i)&&!i.closest("a");return this.readonly||!r?!1:super._shouldSetActive(e)}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("click",this._boundOnInputClick)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("click",this._boundOnInputClick)}_onInputClick(e){this.readonly&&e.preventDefault()}__readonlyChanged(e,i){i&&C(i,"aria-readonly",e)}checkValidity(){return!this.required||!!this.checked}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}_checkedChanged(e,i){(e||i)&&this._requestValidation()}_onRequiredIndicatorClick(){this._labelNode?.click()}};var Ue=class extends mo(M(b(v(g(f))))){static get is(){return"vaadin-checkbox"}static get styles(){return po}static get properties(){return{indeterminate:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0}}}static get delegateProps(){return[...super.delegateProps,"indeterminate"]}render(){return m`
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
    `}ready(){super.ready(),this._tooltipController=new T(this),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}_toggleChecked(t){this.indeterminate&&(this.indeterminate=!1),super._toggleChecked(t)}};_(Ue);var da=function(s,t,e,i){var r,o=arguments.length,n=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,t,e,i);else for(var a=s.length-1;a>=0;a--)(r=s[a])&&(n=(o<3?r(n):o>3?r(t,e,n):r(t,e))||n);return o>3&&n&&Object.defineProperty(t,e,n),n};bi("or-vaadin-toggle",h`
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
  `);var _o=class extends Ue{static get is(){return"or-vaadin-toggle"}_inputElementChanged(s,t){super._inputElementChanged(s,t),s?.setAttribute("role","switch")}};_o=da([P("or-vaadin-toggle")],_o);
/*! Bundled license information:

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

@vaadin/component-base/src/define.js:
@vaadin/component-base/src/dir-mixin.js:
@vaadin/component-base/src/element-mixin.js:
@vaadin/component-base/src/polylit-mixin.js:
@vaadin/component-base/src/dom-utils.js:
@vaadin/component-base/src/unique-id-utils.js:
@vaadin/component-base/src/slot-controller.js:
@vaadin/vaadin-themable-mixin/src/css-property-observer.js:
@vaadin/vaadin-themable-mixin/src/css-utils.js:
@vaadin/vaadin-themable-mixin/src/lumo-injector.js:
@vaadin/vaadin-themable-mixin/lumo-injection-mixin.js:
@vaadin/a11y-base/src/disabled-mixin.js:
@vaadin/a11y-base/src/keyboard-mixin.js:
@vaadin/a11y-base/src/active-mixin.js:
@vaadin/a11y-base/src/focus-utils.js:
@vaadin/a11y-base/src/focus-mixin.js:
@vaadin/a11y-base/src/tabindex-mixin.js:
@vaadin/multi-select-combo-box/src/styles/vaadin-multi-select-combo-box-chip-base-styles.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-chip.js:
@vaadin/input-container/src/styles/vaadin-input-container-base-styles.js:
@vaadin/input-container/src/vaadin-input-container.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-container.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-item.js:
@vaadin/component-base/src/browser-utils.js:
@vaadin/a11y-base/src/focus-restoration-controller.js:
@vaadin/a11y-base/src/focus-trap-controller.js:
@vaadin/multi-select-combo-box/src/styles/vaadin-multi-select-combo-box-overlay-base-styles.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-overlay.js:
@vaadin/component-base/src/virtualizer-iron-list-adapter.js:
@vaadin/multi-select-combo-box/src/styles/vaadin-multi-select-combo-box-scroller-base-styles.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-scroller.js:
@vaadin/field-base/src/styles/button-base-styles.js:
@vaadin/field-base/src/styles/field-base-styles.js:
@vaadin/field-base/src/styles/input-field-shared-styles.js:
@vaadin/multi-select-combo-box/src/styles/vaadin-multi-select-combo-box-base-styles.js:
@vaadin/component-base/src/data-provider-controller/cache.js:
@vaadin/component-base/src/data-provider-controller/helpers.js:
@vaadin/component-base/src/data-provider-controller/data-provider-controller.js:
@vaadin/field-base/src/input-mixin.js:
@vaadin/component-base/src/resize-mixin.js:
@vaadin/a11y-base/src/delegate-focus-mixin.js:
@vaadin/component-base/src/slot-styles-mixin.js:
@vaadin/field-base/src/clear-button-mixin.js:
@vaadin/a11y-base/src/field-aria-controller.js:
@vaadin/field-base/src/error-controller.js:
@vaadin/field-base/src/helper-controller.js:
@vaadin/field-base/src/label-controller.js:
@vaadin/field-base/src/label-mixin.js:
@vaadin/field-base/src/validate-mixin.js:
@vaadin/field-base/src/field-mixin.js:
@vaadin/component-base/src/delegate-state-mixin.js:
@vaadin/field-base/src/input-constraints-mixin.js:
@vaadin/field-base/src/input-control-mixin.js:
@vaadin/field-base/src/input-controller.js:
@vaadin/field-base/src/labelled-input-controller.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box-mixin.js:
@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box.js:
@vaadin/number-field/src/styles/vaadin-number-field-base-styles.js:
@vaadin/field-base/src/input-field-mixin.js:
@vaadin/number-field/src/vaadin-number-field-mixin.js:
@vaadin/number-field/src/vaadin-number-field.js:
@vaadin/component-base/src/dir-utils.js:
@vaadin/a11y-base/src/styles/sr-only-styles.js:
@vaadin/component-base/src/media-query-controller.js:
@vaadin/text-field/src/vaadin-text-field-mixin.js:
@vaadin/field-base/src/styles/checkable-base-styles.js:
@vaadin/field-base/src/checked-mixin.js:
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
  (**
   * @license
   * Copyright (c) 2023 - 2026 Vaadin Ltd.
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

@vaadin/component-base/src/css-utils.js:
@vaadin/component-base/src/styles/loader-styles.js:
@vaadin/component-base/src/i18n-mixin.js:
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
@vaadin/item/src/styles/vaadin-item-base-styles.js:
@vaadin/overlay/src/vaadin-overlay-position-mixin.js:
@vaadin/overlay/src/styles/vaadin-overlay-animation-base-styles.js:
@vaadin/overlay/src/styles/vaadin-overlay-base-styles.js:
@vaadin/overlay/src/vaadin-overlay-focus-mixin.js:
@vaadin/overlay/src/vaadin-overlay-stack-mixin.js:
@vaadin/overlay/src/vaadin-overlay-mixin.js:
@vaadin/item/src/vaadin-item-mixin.js:
@vaadin/select/src/vaadin-select-item.js:
@vaadin/a11y-base/src/list-mixin.js:
@vaadin/list-box/src/styles/vaadin-list-box-base-styles.js:
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
@vaadin/checkbox/src/styles/vaadin-checkbox-base-styles.js:
@vaadin/checkbox/src/vaadin-checkbox-mixin.js:
@vaadin/checkbox/src/vaadin-checkbox.js:
@vaadin/vaadin-themable-mixin/register-styles.js:
  (**
   * @license
   * Copyright (c) 2017 - 2026 Vaadin Ltd.
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
  (**
   * @license
   * Copyright (c) 2015 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/overlay/src/vaadin-overlay-utils.js:
  (**
   * @license
   * Copyright (c) 2024 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)

@vaadin/component-base/src/event-utils.js:
@vaadin/component-base/src/object-utils.js:
  (**
   * @license
   * Copyright (c) 2026 - 2026 Vaadin Ltd.
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

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@vaadin/lit-renderer/src/lit-renderer.js:
  (**
   * @license
   * Copyright (c) 2016 - 2026 Vaadin Ltd.
   * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   *)
*/
