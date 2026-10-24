/*! OpenRemote or-vaadin-components 1.32.2 and theme 1.32.2 (AGPL-3.0-or-later, Copyright OpenRemote Inc.) with Vaadin 25.3.4 (Apache-2.0), Lit 3.3.3 (BSD-3-Clause) and Inter 4.1.1 (OFL-1.1) - https://github.com/openremote/openremote */
var w=s=>(i,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,i)}):customElements.define(s,i)};var wt=globalThis,Et=wt.ShadowRoot&&(wt.ShadyCSS===void 0||wt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Di=Symbol(),io=new WeakMap,ge=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==Di)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(Et&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=io.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&io.set(e,i))}return i}toString(){return this.cssText}},b=s=>new ge(typeof s=="string"?s:s+"",void 0,Di),h=(s,...i)=>{let e=s.length===1?s[0]:i.reduce((t,o,r)=>t+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[r+1],s[0]);return new ge(e,s,Di)},St=(s,i)=>{if(Et)s.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),o=wt.litNonce;o!==void 0&&t.setAttribute("nonce",o),t.textContent=e.cssText,s.appendChild(t)}},zi=Et?s=>s:s=>s instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return b(e)})(s):s;var{is:ta,defineProperty:ia,getOwnPropertyDescriptor:sa,getOwnPropertyNames:oa,getOwnPropertySymbols:ra,getPrototypeOf:na}=Object,It=globalThis,so=It.trustedTypes,aa=so?so.emptyScript:"",la=It.reactiveElementPolyfillSupport,Je=(s,i)=>s,et={toAttribute(s,i){switch(i){case Boolean:s=s?aa:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,i){let e=s;switch(i){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Te=(s,i)=>!ta(s,i),oo={attribute:!0,type:String,converter:et,reflect:!1,useDefault:!1,hasChanged:Te};Symbol.metadata??=Symbol("metadata"),It.litPropertyMetadata??=new WeakMap;var ee=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=oo){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),o=this.getPropertyDescriptor(i,t,e);o!==void 0&&ia(this.prototype,i,o)}}static getPropertyDescriptor(i,e,t){let{get:o,set:r}=sa(this.prototype,i)??{get(){return this[e]},set(n){this[e]=n}};return{get:o,set(n){let a=o?.call(this);r?.call(this,n),this.requestUpdate(i,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??oo}static _$Ei(){if(this.hasOwnProperty(Je("elementProperties")))return;let i=na(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(Je("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Je("properties"))){let e=this.properties,t=[...oa(e),...ra(e)];for(let o of t)this.createProperty(o,e[o])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let o=this._$Eu(e,t);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let o of t)e.unshift(zi(o))}else i!==void 0&&e.push(zi(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return St(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),o=this.constructor._$Eu(i,t);if(o!==void 0&&t.reflect===!0){let r=(t.converter?.toAttribute!==void 0?t.converter:et).toAttribute(e,t.type);this._$Em=i,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(i,e){let t=this.constructor,o=t._$Eh.get(i);if(o!==void 0&&this._$Em!==o){let r=t.getPropertyOptions(o),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:et;this._$Em=o;let a=n.fromAttribute(e,r.type);this[o]=a??this._$Ej?.get(o)??a,this._$Em=null}}requestUpdate(i,e,t,o=!1,r){if(i!==void 0){let n=this.constructor;if(o===!1&&(r=this[i]),t??=n.getPropertyOptions(i),!((t.hasChanged??Te)(r,e)||t.useDefault&&t.reflect&&r===this._$Ej?.get(i)&&!this.hasAttribute(n._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:o,wrapped:r},n){t&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,n??e??this[i]),r!==!0||n!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),o===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[o,r]of t){let{wrapped:n}=r,a=this[o];n!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,r,a)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};ee.elementStyles=[],ee.shadowRootOptions={mode:"open"},ee[Je("elementProperties")]=new Map,ee[Je("finalized")]=new Map,la?.({ReactiveElement:ee}),(It.reactiveElementVersions??=[]).push("2.1.2");var da={attribute:!0,type:String,converter:et,reflect:!1,hasChanged:Te},ha=(s=da,i,e)=>{let{kind:t,metadata:o}=e,r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),t==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(e.name,s),t==="accessor"){let{name:n}=e;return{set(a){let l=i.get.call(this);i.set.call(this,a),this.requestUpdate(n,l,s,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,s,a),a}}}if(t==="setter"){let{name:n}=e;return function(a){let l=this[n];i.call(this,a),this.requestUpdate(n,l,s,!0,a)}}throw Error("Unsupported decorator location: "+t)};function tt(s){return(i,e)=>typeof e=="object"?ha(s,i,e):((t,o,r)=>{let n=o.hasOwnProperty(r);return o.constructor.createProperty(r,t),n?Object.getOwnPropertyDescriptor(o,r):void 0})(s,i,e)}var Ni=globalThis,ro=s=>s,kt=Ni.trustedTypes,no=kt?kt.createPolicy("lit-html",{createHTML:s=>s}):void 0,Vi="$lit$",te=`lit$${Math.random().toFixed(9).slice(2)}$`,ji="?"+te,ca=`<${ji}>`,xe=document,st=()=>xe.createComment(""),ot=s=>s===null||typeof s!="object"&&typeof s!="function",Hi=Array.isArray,po=s=>Hi(s)||typeof s?.[Symbol.iterator]=="function",Fi=`[ 	
\f\r]`,it=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ao=/-->/g,lo=/>/g,be=RegExp(`>|${Fi}(?:([^\\s"'>=/]+)(${Fi}*=${Fi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ho=/'/g,co=/"/g,mo=/^(?:script|style|textarea|title)$/i,Ui=s=>(i,...e)=>({_$litType$:s,strings:i,values:e}),p=Ui(1),$d=Ui(2),Bd=Ui(3),V=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),uo=new WeakMap,ye=xe.createTreeWalker(xe,129);function fo(s,i){if(!Hi(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return no!==void 0?no.createHTML(i):i}var _o=(s,i)=>{let e=s.length-1,t=[],o,r=i===2?"<svg>":i===3?"<math>":"",n=it;for(let a=0;a<e;a++){let l=s[a],d,c,_=-1,A=0;for(;A<l.length&&(n.lastIndex=A,c=n.exec(l),c!==null);)A=n.lastIndex,n===it?c[1]==="!--"?n=ao:c[1]!==void 0?n=lo:c[2]!==void 0?(mo.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=be):c[3]!==void 0&&(n=be):n===be?c[0]===">"?(n=o??it,_=-1):c[1]===void 0?_=-2:(_=n.lastIndex-c[2].length,d=c[1],n=c[3]===void 0?be:c[3]==='"'?co:ho):n===co||n===ho?n=be:n===ao||n===lo?n=it:(n=be,o=void 0);let R=n===be&&s[a+1].startsWith("/>")?" ":"";r+=n===it?l+ca:_>=0?(t.push(d),l.slice(0,_)+Vi+l.slice(_)+te+R):l+te+(_===-2?a:R)}return[fo(s,r+(s[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},rt=class s{constructor({strings:i,_$litType$:e},t){let o;this.parts=[];let r=0,n=0,a=i.length-1,l=this.parts,[d,c]=_o(i,e);if(this.el=s.createElement(d,t),ye.currentNode=this.el.content,e===2||e===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(o=ye.nextNode())!==null&&l.length<a;){if(o.nodeType===1){if(o.hasAttributes())for(let _ of o.getAttributeNames())if(_.endsWith(Vi)){let A=c[n++],R=o.getAttribute(_).split(te),Oe=/([.?@])?(.*)/.exec(A);l.push({type:1,index:r,name:Oe[2],strings:R,ctor:Oe[1]==="."?Ot:Oe[1]==="?"?Tt:Oe[1]==="@"?Pt:we}),o.removeAttribute(_)}else _.startsWith(te)&&(l.push({type:6,index:r}),o.removeAttribute(_));if(mo.test(o.tagName)){let _=o.textContent.split(te),A=_.length-1;if(A>0){o.textContent=kt?kt.emptyScript:"";for(let R=0;R<A;R++)o.append(_[R],st()),ye.nextNode(),l.push({type:2,index:++r});o.append(_[A],st())}}}else if(o.nodeType===8)if(o.data===ji)l.push({type:2,index:r});else{let _=-1;for(;(_=o.data.indexOf(te,_+1))!==-1;)l.push({type:7,index:r}),_+=te.length-1}r++}}static createElement(i,e){let t=xe.createElement("template");return t.innerHTML=i,t}};function Ce(s,i,e=s,t){if(i===V)return i;let o=t!==void 0?e._$Co?.[t]:e._$Cl,r=ot(i)?void 0:i._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(s),o._$AT(s,e,t)),t!==void 0?(e._$Co??=[])[t]=o:e._$Cl=o),o!==void 0&&(i=Ce(s,o._$AS(s,i.values),o,t)),i}var Mt=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,o=(i?.creationScope??xe).importNode(e,!0);ye.currentNode=o;let r=ye.nextNode(),n=0,a=0,l=t[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new Pe(r,r.nextSibling,this,i):l.type===1?d=new l.ctor(r,l.name,l.strings,this,i):l.type===6&&(d=new Lt(r,this,i)),this._$AV.push(d),l=t[++a]}n!==l?.index&&(r=ye.nextNode(),n++)}return ye.currentNode=xe,o}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},Pe=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,o){this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=Ce(this,i,e),ot(i)?i===C||i==null||i===""?(this._$AH!==C&&this._$AR(),this._$AH=C):i!==this._$AH&&i!==V&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):po(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==C&&ot(this._$AH)?this._$AA.nextSibling.data=i:this.T(xe.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,o=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=rt.createElement(fo(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===o)this._$AH.p(e);else{let r=new Mt(o,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(i){let e=uo.get(i.strings);return e===void 0&&uo.set(i.strings,e=new rt(i)),e}k(i){Hi(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,o=0;for(let r of i)o===e.length?e.push(t=new s(this.O(st()),this.O(st()),this,this.options)):t=e[o],t._$AI(r),o++;o<e.length&&(this._$AR(t&&t._$AB.nextSibling,o),e.length=o)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=ro(i).nextSibling;ro(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},we=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,o,r){this.type=1,this._$AH=C,this._$AN=void 0,this.element=i,this.name=e,this._$AM=o,this.options=r,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=C}_$AI(i,e=this,t,o){let r=this.strings,n=!1;if(r===void 0)i=Ce(this,i,e,0),n=!ot(i)||i!==this._$AH&&i!==V,n&&(this._$AH=i);else{let a=i,l,d;for(i=r[0],l=0;l<r.length-1;l++)d=Ce(this,a[t+l],e,l),d===V&&(d=this._$AH[l]),n||=!ot(d)||d!==this._$AH[l],d===C?i=C:i!==C&&(i+=(d??"")+r[l+1]),this._$AH[l]=d}n&&!o&&this.j(i)}j(i){i===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},Ot=class extends we{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===C?void 0:i}},Tt=class extends we{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==C)}},Pt=class extends we{constructor(i,e,t,o,r){super(i,e,t,o,r),this.type=5}_$AI(i,e=this){if((i=Ce(this,i,e,0)??C)===V)return;let t=this._$AH,o=i===C&&t!==C||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,r=i!==C&&(t===C||o);o&&this.element.removeEventListener(this.name,this,t),r&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},Lt=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){Ce(this,i)}},vo={M:Vi,P:te,A:ji,C:1,L:_o,R:Mt,D:po,V:Ce,I:Pe,H:we,N:Tt,U:Pt,B:Ot,F:Lt},ua=Ni.litHtmlPolyfillSupport;ua?.(rt,Pe),(Ni.litHtmlVersions??=[]).push("3.3.3");var H=(s,i,e)=>{let t=e?.renderBefore??i,o=t._$litPart$;if(o===void 0){let r=e?.renderBefore??null;t._$litPart$=o=new Pe(i.insertBefore(st(),r),r,void 0,e??{})}return o._$AI(s),o};var qi=globalThis,u=class extends ee{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=H(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};u._$litElement$=!0,u.finalized=!0,qi.litElementHydrateSupport?.({LitElement:u});var pa=qi.litElementPolyfillSupport;pa?.({LitElement:u});(qi.litElementVersions??=[]).push("4.2.2");var Le={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},U=s=>(...i)=>({_$litDirective$:s,values:i}),le=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,t){this._$Ct=i,this._$AM=e,this._$Ci=t}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var $t=U(class extends le{constructor(s){if(super(s),s.type!==Le.ATTRIBUTE||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(i=>s[i]).join(" ")+" "}update(s,[i]){if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(t=>t!=="")));for(let t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}let e=s.element.classList;for(let t of this.st)t in i||(e.remove(t),this.st.delete(t));for(let t in i){let o=!!i[t];o===this.st.has(t)||this.nt?.has(t)||(o?(e.add(t),this.st.add(t)):(e.remove(t),this.st.delete(t)))}return V}});var Bt=h`
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
`;window.Vaadin||={};window.Vaadin.featureFlags||={};function ma(s){return s.replace(/-[a-z]/gu,i=>i[1].toUpperCase())}var ie={};function m(s,i="25.3.4"){if(Object.defineProperty(s,"version",{get(){return i}}),s.experimental){let t=typeof s.experimental=="string"?s.experimental:`${ma(s.is.split("-").slice(1).join("-"))}Component`;if(!window.Vaadin.featureFlags[t]&&!ie[t]){ie[t]=new Set,ie[t].add(s),Object.defineProperty(window.Vaadin.featureFlags,t,{get(){return ie[t].size===0},set(o){o&&ie[t].size>0&&(ie[t].forEach(r=>{customElements.define(r.is,r)}),ie[t].clear())}});return}else if(ie[t]){ie[t].add(s);return}}let e=customElements.get(s.is);if(!e)customElements.define(s.is,s);else{let t=e.version;t&&s.version&&t===s.version?console.warn(`The component ${s.is} has been loaded twice`):console.error(`Tried to define ${s.is} version ${s.version} when version ${e.version} is already in use. Something will probably break.`)}}function go(s){let i=[];for(;s;){if(s.nodeType===Node.DOCUMENT_NODE){i.push(s);break}if(s.nodeType===Node.DOCUMENT_FRAGMENT_NODE){i.push(s),s=s.host;continue}if(s.assignedSlot){s=s.assignedSlot;continue}s=s.parentNode}return i}function Wi(s){return new Set(s?s.split(" ").filter(Boolean):[])}function bo(s){return s?[...s].join(" "):""}function y(s,i,e){e?s.setAttribute(i,e):s.removeAttribute(i)}function yo(s){return Wi(Array.isArray(s)?s.join(" "):s)}function Ki(s,i,e){e=yo(e);let t=Wi(s.getAttribute(i));e.forEach(o=>t.add(o)),y(s,i,bo(t))}function Gi(s,i,e){e=yo(e);let t=Wi(s.getAttribute(i));e.forEach(o=>t.delete(o)),y(s,i,bo(t))}function Rt(s){return s.nodeType===Node.TEXT_NODE&&s.textContent.trim()===""}function xo(s){return s?!!(s.nodeType===Node.ELEMENT_NODE&&(customElements.get(s.localName)||s.children.length>0)||s.textContent?.trim()):!1}var fa=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,Dt=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function _a(){function s(){return!0}return Co(s)}function va(){try{return ga()?!0:ba()?Dt?!ya():!_a():!1}catch{return!1}}function ga(){return localStorage.getItem("vaadin.developmentmode.force")}function ba(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function ya(){return!!(Dt&&Object.keys(Dt).map(i=>Dt[i]).filter(i=>i.productionMode).length>0)}function Co(s,i){if(typeof s!="function")return;let e=fa.exec(s.toString());if(e)try{s=new Function(e[1])}catch(t){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",t)}return s(i)}window.Vaadin=window.Vaadin||{};var Yi=function(s,i){if(window.Vaadin.developmentMode)return Co(s,i)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=va());function xa(){}var wo=function(){if(typeof Yi=="function")return Yi(xa)};var Eo=0,So=0,$e=[],Xi=!1;function Ca(){Xi=!1;let s=$e.length;for(let i=0;i<s;i++){let e=$e[i];if(e)try{e()}catch(t){setTimeout(()=>{throw t})}}$e.splice(0,s),So+=s}var de={after(s){return{run(i){return window.setTimeout(i,s)},cancel(i){window.clearTimeout(i)}}},run(s,i){return window.setTimeout(s,i)},cancel(s){window.clearTimeout(s)}};var Ee={run(s){return window.requestAnimationFrame(s)},cancel(s){window.cancelAnimationFrame(s)}};var zt={run(s){return window.requestIdleCallback?window.requestIdleCallback(s):window.setTimeout(s,16)},cancel(s){window.cancelIdleCallback?window.cancelIdleCallback(s):window.clearTimeout(s)}};var q={run(s){Xi||(Xi=!0,queueMicrotask(()=>Ca())),$e.push(s);let i=Eo;return Eo+=1,i},cancel(s){let i=s-So;if(i>=0){if(!$e[i])throw new Error(`invalid async handle: ${s}`);$e[i]=null}}};var nt=new Set,T=class s{static debounce(i,e,t){return i instanceof s?i._cancelAsync():i=new s,i.setConfig(e,t),i}constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(i,e){this._asyncModule=i,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,nt.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),nt.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return this._timer!=null}};function Ft(s){nt.add(s)}function wa(){let s=!!nt.size;return nt.forEach(i=>{try{i.flush()}catch(e){setTimeout(()=>{throw e})}}),s}var Se=()=>{let s;do s=wa();while(s)};var se=[];function Zi(s,i,e=s.getAttribute("dir")){i?s.setAttribute("dir",i):e!=null&&s.removeAttribute("dir")}function Qi(){return document.documentElement.getAttribute("dir")}function Ea(){let s=Qi();se.forEach(i=>{Zi(i,s)})}var Sa=new MutationObserver(Ea);Sa.observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]});var E=s=>class extends s{static get properties(){return{dir:{type:String,value:"",reflectToAttribute:!0,converter:{fromAttribute:e=>e||"",toAttribute:e=>e===""?null:e}}}}get __isRTL(){return this.getAttribute("dir")==="rtl"}connectedCallback(){super.connectedCallback(),(!this.hasAttribute("dir")||this.__restoreSubscription)&&(this.__subscribe(),Zi(this,Qi(),null))}attributeChangedCallback(e,t,o){if(super.attributeChangedCallback(e,t,o),e!=="dir")return;let r=Qi(),n=o===r&&se.indexOf(this)===-1,a=!o&&t&&se.indexOf(this)===-1;n||a?(this.__subscribe(),Zi(this,r,o)):o!==r&&t===r&&this.__unsubscribe()}disconnectedCallback(){super.disconnectedCallback(),this.__restoreSubscription=se.includes(this),this.__unsubscribe()}_valueToNodeAttribute(e,t,o){o==="dir"&&t===""&&!e.hasAttribute("dir")||super._valueToNodeAttribute(e,t,o)}_attributeToProperty(e,t,o){e==="dir"&&!t?this.dir="":super._attributeToProperty(e,t,o)}__subscribe(){se.includes(this)||se.push(this)}__unsubscribe(){se.includes(this)&&se.splice(se.indexOf(this),1)}};window.Vaadin||(window.Vaadin={});window.Vaadin.registrations||(window.Vaadin.registrations=[]);window.Vaadin.developmentModeCallback||(window.Vaadin.developmentModeCallback={});window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]=function(){wo()};var Ji,Io=new Set,x=s=>class extends E(s){static _ensureRegistrations(){let{is:e}=this;if(e&&!Io.has(e)){window.Vaadin.registrations.push(this),Io.add(e);let t=window.Vaadin.developmentModeCallback;t&&(Ji=T.debounce(Ji,zt,()=>{t["vaadin-usage-statistics"]()}),Ft(Ji))}}constructor(){super(),document.doctype===null&&console.warn('Vaadin components require the "standards mode" declaration. Please add <!DOCTYPE html> to the HTML document.'),this.constructor._ensureRegistrations()}};var Ao=new WeakMap;function Ia(s,i){let e=i;for(;e;){if(Ao.get(e)===s)return!0;e=Object.getPrototypeOf(e)}return!1}function k(s){return i=>{if(Ia(s,i))return i;let e=s(i);return Ao.set(e,s),e}}function Ie(s,i){return s.split(".").reduce((e,t)=>e?e[t]:void 0,i)}function ko(s,i,e){let t=s.split("."),o=t.pop(),r=t.reduce((n,a)=>n[a],e);r[o]=i}var es={},Aa=/([A-Z])/gu;function Mo(s){return es[s]||(es[s]=s.replace(Aa,"-$1").toLowerCase()),es[s]}function Oo(s){return s[0].toUpperCase()+s.substring(1)}function ts(s){let[i,e]=s.split("("),t=e.replace(")","").split(",").map(o=>o.trim());return{method:i,observerProps:t}}function is(s,i){return Object.prototype.hasOwnProperty.call(s,i)||(s[i]=new Map(s[i])),s[i]}var ka=s=>{class i extends s{static enabledWarnings=[];static createProperty(t,o){[String,Boolean,Number,Array].includes(o)&&(o={type:o}),o?.reflectToAttribute&&(o.reflect=!0),super.createProperty(t,o)}static getOrCreateMap(t){return is(this,t)}static finalize(){if(window.litIssuedWarnings&&(window.litIssuedWarnings.add("no-override-create-property"),window.litIssuedWarnings.add("no-override-get-property-descriptor")),super.finalize(),Array.isArray(this.observers)){let t=this.getOrCreateMap("__complexObservers");this.observers.forEach(o=>{let{method:r,observerProps:n}=ts(o);t.set(r,n)})}}static addCheckedInitializer(t){super.addInitializer(o=>{o instanceof this&&t(o)})}static getPropertyDescriptor(t,o,r){let n=super.getPropertyDescriptor(t,o,r),a=n;if(this.getOrCreateMap("__propKeys").set(t,o),r.sync&&(a={get:n.get,set(l){let d=this[t];Te(l,d)&&(this[o]=l,this.requestUpdate(t,d,r),this.hasUpdated&&this.performUpdate())},configurable:!0,enumerable:!0}),r.readOnly){let l=a.set;this.addCheckedInitializer(d=>{d[`_set${Oo(t)}`]=function(c){l.call(d,c)}}),a={get:a.get,set(){},configurable:!0,enumerable:!0}}if("value"in r&&this.addCheckedInitializer(l=>{let d=typeof r.value=="function"?r.value.call(l):r.value;r.readOnly?l[`_set${Oo(t)}`](d):l[t]=d}),r.observer){let l=r.observer;this.getOrCreateMap("__observers").set(t,l),this.addCheckedInitializer(d=>{d[l]||console.warn(`observer method ${l} not defined`)})}if(r.notify){if(!this.__notifyProps)this.__notifyProps=new Set;else if(!this.hasOwnProperty("__notifyProps")){let l=this.__notifyProps;this.__notifyProps=new Set(l)}this.__notifyProps.add(t)}if(r.computed){let l=`__assignComputed${t}`,d=ts(r.computed);this.prototype[l]=function(...c){this[t]=this[d.method](...c)},this.getOrCreateMap("__computedObservers").set(l,d.observerProps)}return r.attribute||(r.attribute=Mo(t)),a}static get polylitConfig(){return{asyncFirstRender:!1}}connectedCallback(){super.connectedCallback();let{polylitConfig:t}=this.constructor;!this.hasUpdated&&!t.asyncFirstRender&&this.performUpdate()}firstUpdated(){super.firstUpdated(),this.$||(this.$={}),this.renderRoot.querySelectorAll("[id]").forEach(t=>{this.$[t.id]=t})}ready(){}willUpdate(t){this.constructor.__computedObservers&&this.__runComplexObservers(t,this.constructor.__computedObservers)}updated(t){let o=this.__isReadyInvoked;this.__isReadyInvoked=!0,this.constructor.__observers&&this.__runObservers(t,this.constructor.__observers),this.constructor.__complexObservers&&this.__runComplexObservers(t,this.constructor.__complexObservers),this.__dynamicPropertyObservers&&this.__runDynamicObservers(t,this.__dynamicPropertyObservers),this.__dynamicMethodObservers&&this.__runComplexObservers(t,this.__dynamicMethodObservers),this.constructor.__notifyProps&&this.__runNotifyProps(t,this.constructor.__notifyProps),o||this.ready()}setProperties(t){Object.entries(t).forEach(([o,r])=>{let n=this.constructor.__propKeys.get(o),a=this[n];this[n]=r,this.requestUpdate(o,a)}),this.hasUpdated&&this.performUpdate()}_createMethodObserver(t){let o=is(this,"__dynamicMethodObservers"),{method:r,observerProps:n}=ts(t);o.set(r,n)}_createPropertyObserver(t,o){is(this,"__dynamicPropertyObservers").set(o,t)}__runComplexObservers(t,o){o.forEach((r,n)=>{r.some(a=>t.has(a))&&(this[n]?this[n](...r.map(a=>this[a])):console.warn(`observer method ${n} not defined`))})}__runDynamicObservers(t,o){o.forEach((r,n)=>{t.has(r)&&this[n]&&this[n](this[r],t.get(r))})}__runObservers(t,o){t.forEach((r,n)=>{let a=o.get(n);a!==void 0&&this[a]&&this[a](this[n],r)})}__runNotifyProps(t,o){t.forEach((r,n)=>{o.has(n)&&this.dispatchEvent(new CustomEvent(`${Mo(n)}-changed`,{detail:{value:this[n]}}))})}_get(t,o){return Ie(t,o)}_set(t,o,r){ko(t,o,r)}}return i},f=k(ka);var $=class{constructor(i,e,t={}){this.target=i,this.callback=e,this.forceInitial=t.forceInitial,this._storedNodes=[],this._isSlot=i instanceof HTMLSlotElement,this._connected=!1,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),t.syncInitial?this.flush():this._schedule()}connect(){this.target.addEventListener("slotchange",this._boundSchedule),this._connected=!0}disconnect(){this.target.removeEventListener("slotchange",this._boundSchedule),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,queueMicrotask(()=>{this._scheduled&&this.flush()}))}flush(){this._connected&&(this._scheduled=!1,this._processNodes())}_collectNodes(){let i=this._isSlot?[this.target]:[...this.target.querySelectorAll("slot")];return[...new Set(i.flatMap(e=>e.assignedNodes({flatten:!0})))]}_groupNodesBySlot(i){let e=new Map;return i.forEach(t=>{let o=t.assignedSlot;e.set(o,e.get(o)??[]),e.get(o).push(t)}),e}_collectMovedNodes(i){let e=this._groupNodesBySlot(i),t=this._groupNodesBySlot(this._storedNodes),o=[];return e.forEach((r,n)=>{let a=t.get(n)||[];new Set(a).difference(new Set(r)).size>0||a.forEach((l,d)=>{r.indexOf(l)!==d&&o.push(l)})}),o}_processNodes(){let i=this._collectNodes(),e=i.filter(r=>!this._storedNodes.includes(r)),t=this._storedNodes.filter(r=>!i.includes(r)),o=this._collectMovedNodes(i);(e.length||t.length||o.length||this.forceInitial)&&this.callback({addedNodes:e,currentNodes:i,movedNodes:o,removedNodes:t}),this.forceInitial&&(this.forceInitial=!1),this._storedNodes=i}};function Be(s){try{CSS.registerProperty(s)}catch(i){if(i instanceof DOMException&&i.name==="InvalidModificationError")console.warn(`The CSS property ${s.name} has already been registered.`);else throw i}}var To=(s,...i)=>{let e=document.createElement("style");e.id=s,e.textContent=i.map(t=>t.toString()).join(`
`),document.head.insertAdjacentElement("afterbegin",e)};var Nt=class s extends EventTarget{#e;#t=new Set;#i;#s=!1;constructor(i){super(),this.#e=i,this.#i=new CSSStyleSheet}#r(i){let{propertyName:e}=i;this.#t.has(e)&&this.dispatchEvent(new CustomEvent("property-changed",{detail:{propertyName:e}}))}observe(i){this.connect(),!this.#t.has(i)&&(this.#t.add(i),this.#i.replaceSync(`
      :root::before, :host::before {
        content: '' !important;
        position: absolute !important;
        top: -9999px !important;
        left: -9999px !important;
        visibility: hidden !important;
        transition: 1ms allow-discrete step-end !important;
        transition-property: ${[...this.#t].join(", ")} !important;
      }
    `))}connect(){this.#s||(this.#e.adoptedStyleSheets.unshift(this.#i),this.#o.addEventListener("transitionstart",i=>this.#r(i)),this.#o.addEventListener("transitionend",i=>this.#r(i)),this.#s=!0)}disconnect(){this.#t.clear(),this.#e.adoptedStyleSheets=this.#e.adoptedStyleSheets.filter(i=>i!==this.#i),this.#o.removeEventListener("transitionstart",this.#r),this.#o.removeEventListener("transitionend",this.#r),this.#s=!1}get#o(){return this.#e.documentElement??this.#e.host}static for(i){return i.__cssPropertyObserver||=new s(i),i.__cssPropertyObserver}};function Ma(s){let{baseStyles:i,themeStyles:e,elementStyles:t,lumoInjector:o}=s.constructor,r=s.__lumoStyleSheet;return r?[...o.includeBaseStyles?i??t:[],r,...e??[]]:t}function Vt(s){St(s.shadowRoot,Ma(s))}function ss(s,i){s.__lumoStyleSheet=i,Vt(s)}function jt(s){s.__lumoStyleSheet=void 0,Vt(s)}var Po=new Set;function os(s){Po.has(s)||(Po.add(s),console.warn(s))}var Lo=new WeakMap;function $o(s){try{return s.media.mediaText}catch{return os('[LumoInjector] Browser denied to access property "mediaText" for some CSS rules, so they were skipped.'),""}}function Oa(s){try{return s.cssRules}catch{return os('[LumoInjector] Browser denied to access property "cssRules" for some CSS stylesheets, so they were skipped.'),[]}}function Bo(s,i={tags:new Map,modules:new Map}){for(let e of Oa(s)){if(e instanceof CSSImportRule){let t=$o(e);t.startsWith("lumo_")?i.modules.set(t,[...e.styleSheet.cssRules]):Bo(e.styleSheet,i);continue}if(e instanceof CSSMediaRule){let t=$o(e);t.startsWith("lumo_")&&i.modules.set(t,[...e.cssRules]);continue}if(e instanceof CSSStyleRule&&e.cssText.includes("-inject")){for(let t of e.style){let o=t.match(/^--_lumo-(.*)-inject-modules$/u)?.[1];if(!o)continue;let r=e.style.getPropertyValue(t);i.tags.set(o,r.split(",").map(n=>n.trim().replace(/'|"/gu,"")))}continue}}return i}function Ro(s){let i=new Map,e=new Map;for(let t of s){let o=Lo.get(t);o||(o=Bo(t),Lo.set(t,o)),i=new Map([...i,...o.tags]),e=new Map([...e,...o.modules])}return{tags:i,modules:e}}function rs(s){return`--_lumo-${s.is}-inject`}var Ht=class{#e;#t;#i=new Map;#s=new Map;constructor(i=document){this.#e=i,this.handlePropertyChange=this.handlePropertyChange.bind(this),this.#t=Nt.for(i),this.#t.addEventListener("property-changed",this.handlePropertyChange)}disconnect(){this.#t.removeEventListener("property-changed",this.handlePropertyChange),this.#i.clear(),this.#s.values().forEach(i=>i.forEach(jt))}forceUpdate(){for(let i of this.#i.keys())this.#o(i)}componentConnected(i){let{lumoInjector:e}=i.constructor,{is:t}=e;this.#s.set(t,this.#s.get(t)??new Set),this.#s.get(t).add(i);let o=this.#i.get(t);if(o){o.cssRules.length>0&&ss(i,o);return}this.#r(t);let r=rs(e);this.#t.observe(r)}componentDisconnected(i){let{is:e}=i.constructor.lumoInjector;this.#s.get(e)?.delete(i),jt(i)}handlePropertyChange(i){let{propertyName:e}=i.detail,t=e.match(/^--_lumo-(.*)-inject$/u)?.[1];t&&this.#o(t)}#r(i){this.#i.set(i,new CSSStyleSheet),this.#o(i)}#o(i){let{tags:e,modules:t}=Ro(this.#n),o=(e.get(i)??[]).flatMap(n=>t.get(n)??[]).map(n=>n.cssText).join(`
`),r=this.#i.get(i);r.replaceSync(o),this.#s.get(i)?.forEach(n=>{o?ss(n,r):jt(n)})}get#n(){let i=new Set;for(let e of[this.#e,document])i=i.union(new Set(e.styleSheets)),i=i.union(new Set(e.adoptedStyleSheets));return[...i]}};var Do=new Set;function zo(s){let i=s.getRootNode();return i.host&&i.host.constructor.version?zo(i.host):i}var g=s=>class extends s{static finalize(){super.finalize();let e=rs(this.lumoInjector);this.is&&!Do.has(e)&&(Do.add(e),Be({name:e,syntax:"<number>",inherits:!0,initialValue:"0"}))}static get lumoInjector(){return{is:this.is,includeBaseStyles:!1}}connectedCallback(){super.connectedCallback();let e=zo(this);e.__lumoInjectorDisabled||this.isConnected&&(e.__lumoInjector||=new Ht(e),this.__lumoInjector=e.__lumoInjector,this.__lumoInjector.componentConnected(this))}disconnectedCallback(){super.disconnectedCallback(),this.__lumoInjector&&(this.__lumoInjector.componentDisconnected(this),this.__lumoInjector=void 0)}};var G=s=>class extends s{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(e,t,o){super.attributeChangedCallback(e,t,o),e==="theme"&&this._set_theme(o)}};var Ut=[],ns=new Set,as=new Set;function Fo(s){return s&&Object.prototype.hasOwnProperty.call(s,"__themes")}function Ta(s){return Fo(customElements.get(s))}function Pa(s=[]){return[s].flat(1/0).filter(i=>i instanceof ge?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function No(s,i){return(s||"").split(" ").some(e=>new RegExp(`^${e.split("*").join(".*")}$`,"u").test(i))}function Vo(s){return s.map(i=>i.cssText).join(`
`)}var qt="vaadin-themable-mixin-style";function La(s,i){let e=document.createElement("style");e.id=qt,e.textContent=Vo(s),i.content.appendChild(e)}function $a(s){if(!s.shadowRoot)return;let i=s.constructor;if(s instanceof u)Vt(s);else{let e=s.shadowRoot.getElementById(qt),t=i.prototype._template;e.textContent=t.content.getElementById(qt).textContent}}function Ba(s){ns.forEach(i=>{let e=i.deref();e instanceof s?$a(e):e||ns.delete(i)})}function jo(s){if(s.prototype instanceof u)s.elementStyles=s.finalizeStyles(s.styles);else{let i=s.prototype._template;i.content.getElementById(qt).textContent=Vo(s.getStylesForThis())}as.forEach(i=>{let e=customElements.get(i);e!==s&&e.prototype instanceof s&&jo(e)})}function Ra(s,i){let e=s.__themes;return!e||!i?!1:e.some(t=>t.styles.some(o=>i.some(r=>r.cssText===o.cssText)))}function ls(s,i,e={}){i=Pa(i),Ut.push({themeFor:s,styles:i,include:e.include,moduleId:e.moduleId}),s&&as.forEach(t=>{if(No(s,t)&&Ta(t)){let o=customElements.get(t);Ra(o,i)?console.warn(`Registering styles that already exist for ${t}`):(!window.Vaadin||!window.Vaadin.suppressPostFinalizeStylesWarning)&&console.warn(`The custom element definition for "${t}" was finalized before a style module was registered. Ideally, import component specific style modules before importing the corresponding custom element. This warning can be suppressed by setting "window.Vaadin.suppressPostFinalizeStylesWarning = true".`),jo(o),Ba(o)}})}function Da(s=""){let i=0;return s.startsWith("lumo-")||s.startsWith("material-")?i=1:s.startsWith("vaadin-")&&(i=2),i}function Ho(s){let i=[];return s.include&&[].concat(s.include).forEach(e=>{let t=Ut.find(o=>o.moduleId===e);t?i.push(...Ho(t),...t.styles):console.warn(`Included moduleId ${e} not found in style registry`)},s.styles),i}function za(s){let i=`${s}-default-theme`,e=Ut.filter(t=>t.moduleId!==i&&No(t.themeFor,s)).map(t=>({...t,styles:[...Ho(t),...t.styles],includePriority:Da(t.moduleId)})).sort((t,o)=>o.includePriority-t.includePriority);return e.length>0?e:Ut.filter(t=>t.moduleId===i)}var v=s=>class extends G(s){constructor(){super(),ns.add(new WeakRef(this))}static finalize(){if(super.finalize(),this.is&&as.add(this.is),this.elementStyles)return;let e=this.prototype._template;!e||Fo(this)||La(this.getStylesForThis(),e)}static finalizeStyles(e){return this.baseStyles=e?[e].flat(1/0):[],this.themeStyles=this.getStylesForThis(),[...this.baseStyles,...this.themeStyles]}static getStylesForThis(){let e=s.__themes||[],t=Object.getPrototypeOf(this.prototype),o=(t?t.constructor.__themes:[])||[];this.__themes=[...e,...o,...za(this.is)];let r=this.__themes.flatMap(n=>n.styles);return r.filter((n,a)=>a===r.lastIndexOf(n))}};["--vaadin-text-color","--vaadin-text-color-disabled","--vaadin-text-color-secondary","--vaadin-border-color","--vaadin-border-color-secondary","--vaadin-background-color"].forEach(s=>{Be({name:s,syntax:"<color>",inherits:!0,initialValue:"transparent"})});To("vaadin-base",h`
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
  `);var Uo=h`
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
`;var at=class extends x(v(f(g(u)))){static get is(){return"vaadin-badge"}static get styles(){return[Uo,Bt]}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}static get properties(){return{number:{type:Number}}}render(){let i=(this._theme||"").split(" "),e=i.includes("icon-only"),t=i.includes("number-only"),o=i.includes("dot");return p`
      <div part="icon" class="${$t({"sr-only":t||o})}">
        <slot name="icon"></slot>
      </div>
      <div part="number" class="${$t({"sr-only":e||o})}">${this.number}</div>
      <div part="content" class="${$t({"sr-only":t||e||o})}">
        <slot></slot>
      </div>
    `}willUpdate(i){super.willUpdate(i),i.has("number")&&this.toggleAttribute("has-number",this.number!=null)}firstUpdated(){super.firstUpdated(),this.__contentSlot=this.shadowRoot.querySelector("slot:not([name])"),this.__slotObserver=new $(this.__contentSlot,()=>{this.__updateHasContent()},{syncInitial:!0});let i=this.shadowRoot.querySelector('slot[name="icon"]');this.__iconSlotObserver=new $(i,({currentNodes:e})=>{this.toggleAttribute("has-icon",e.length>0)},{syncInitial:!0}),this.__textObserver=new MutationObserver(()=>{this.__updateHasContent()}),this.__textObserver.observe(this,{characterData:!0,subtree:!0})}__updateHasContent(){let i=this.__contentSlot.assignedNodes({flatten:!0});this.toggleAttribute("has-content",i.some(e=>!Rt(e)))}};m(at);var Fa=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n},qo=class extends at{};qo=Fa([w("or-vaadin-badge")],qo);var Na=0;function he(){return Na++}var S=class extends EventTarget{static generateId(i,e="default"){return`${e}-${i.localName}-${he()}`}constructor(i,e,t,o={}){super();let{initializer:r,multiple:n,observe:a,useUniqueId:l,uniqueIdPrefix:d}=o;this.host=i,this.slotName=e,this.tagName=t,this.observe=typeof a=="boolean"?a:!0,this.multiple=typeof n=="boolean"?n:!1,this.slotInitializer=r,n&&(this.nodes=[]),l&&(this.defaultId=this.constructor.generateId(i,d||e))}hostConnected(){this.initialized||(this.multiple?this.initMultiple():this.initSingle(),this.observe&&this.observeSlot(),this.initialized=!0)}initSingle(){let i=this.getSlotChild();i?(this.node=i,this.initAddedNode(i)):(i=this.attachDefaultNode(),this.initNode(i))}initMultiple(){let i=this.getSlotChildren();if(i.length===0){let e=this.attachDefaultNode();e&&(this.nodes=[e],this.initNode(e))}else this.nodes=i,i.forEach(e=>{this.initAddedNode(e)})}attachDefaultNode(){let{host:i,slotName:e,tagName:t}=this,o=this.defaultNode;return!o&&t&&(o=document.createElement(t),o instanceof Element&&(e!==""&&o.setAttribute("slot",e),this.defaultNode=o)),o&&(this.node=o,i.appendChild(o)),o}getSlotChildren(){let{slotName:i}=this;return Array.from(this.host.childNodes).filter(e=>e.nodeType===Node.ELEMENT_NODE&&e.hasAttribute("data-slot-ignore")?!1:e.nodeType===Node.ELEMENT_NODE&&e.slot===i||e.nodeType===Node.TEXT_NODE&&e.textContent.trim()&&i==="")}getSlotChild(){return this.getSlotChildren()[0]}initNode(i){let{slotInitializer:e}=this;e&&e(i,this.host)}initCustomNode(i){}teardownNode(i){}initAddedNode(i){i!==this.defaultNode&&(this.initCustomNode(i),this.initNode(i))}observeSlot(){let{slotName:i}=this,e=i===""?"slot:not([name])":`slot[name=${i}]`,t=this.host.shadowRoot.querySelector(e);new $(t,({addedNodes:o,removedNodes:r})=>{let n=this.multiple?this.nodes:[this.node],a=o.filter(l=>!Rt(l)&&!n.includes(l)&&!(l.nodeType===Node.ELEMENT_NODE&&l.hasAttribute("data-slot-ignore")));r.length&&(this.multiple?this.nodes=n.filter(l=>!r.includes(l)):r.includes(this.node)&&(this.node=null),r.forEach(l=>{this.teardownNode(l)})),a?.length>0&&(this.multiple?(this.defaultNode&&this.defaultNode.remove(),this.nodes=[...n,...a].filter(l=>l!==this.defaultNode),a.forEach(l=>{this.initAddedNode(l)})):(this.node&&this.node.remove(),this.node=a[0],this.initAddedNode(this.node)))})}};var P=class extends S{constructor(i){super(i,"tooltip"),this.setTarget(i)}initCustomNode(i){i.target=this.target,this.ariaTarget!==void 0&&(i.ariaTarget=this.ariaTarget),this.context!==void 0&&(i.context=this.context),this.manual!==void 0&&(i.manual=this.manual),this.position!==void 0&&(i._position=this.position),this.shouldShow!==void 0&&(i.shouldShow=this.shouldShow),this.manual||this.host.setAttribute("has-tooltip",""),this.#t(i),i.addEventListener("content-changed",this.#e)}teardownNode(i){this.manual||this.host.removeAttribute("has-tooltip"),i.removeEventListener("content-changed",this.#e),this.#t(null)}setAriaTarget(i){this.ariaTarget=i;let e=this.node;e&&(e.ariaTarget=i)}setContext(i){this.context=i;let e=this.node;e&&(e.context=i)}setManual(i){this.manual=i;let e=this.node;e&&(e.manual=i)}setPosition(i){this.position=i;let e=this.node;e&&(e._position=i)}setShouldShow(i){this.shouldShow=i;let e=this.node;e&&(e.shouldShow=i)}setTarget(i){this.target=i;let e=this.node;e&&(e.target=i)}open(i){let e=this.node;e?.isConnected&&e._stateController.open(i)}close(i){let e=this.node;e&&e._stateController.close(i)}#e=i=>{this.#t(i.target)};#t(i){this.dispatchEvent(new CustomEvent("tooltip-changed",{detail:{node:i}}))}};var Wo=h`
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
`;var Va=!1,ja=s=>s,us=typeof document.head.style.touchAction=="string",Wt="__polymerGestures",ds="__polymerGesturesHandled",cs="__polymerGesturesTouchAction",Ko=25,Go=5,Ha=2,Ua=["mousedown","mousemove","mouseup","click"],qa=[0,1,4,2],Wa=(function(){try{return new MouseEvent("test",{buttons:1}).buttons===1}catch{return!1}})();function ps(s){return Ua.indexOf(s)>-1}var Zo=!1;(function(){try{let s=Object.defineProperty({},"passive",{get(){Zo=!0}});window.addEventListener("test",null,s),window.removeEventListener("test",null,s)}catch{}})();function Qo(s){if(!(ps(s)||s==="touchend")&&us&&Zo&&Va)return{passive:!0}}var Ka=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/u),Ga={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function ke(s){let i=s.type;if(!ps(i))return!1;if(i==="mousemove"){let t=s.buttons??1;return s instanceof window.MouseEvent&&!Wa&&(t=qa[s.which]||0),!!(t&1)}return(s.button??0)===0}function Ya(s){if(s.type==="click"){if(s.detail===0)return!0;let i=ce(s);if(!i.nodeType||i.nodeType!==Node.ELEMENT_NODE)return!0;let e=i.getBoundingClientRect(),t=s.pageX,o=s.pageY;return!(t>=e.left&&t<=e.right&&o>=e.top&&o<=e.bottom)}return!1}var oe={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Xa(s){let i="auto",e=er(s);for(let t=0,o;t<e.length;t++)if(o=e[t],o[cs]){i=o[cs];break}return i}function Jo(s,i,e){s.movefn=i,s.upfn=e,document.addEventListener("mousemove",i),document.addEventListener("mouseup",e)}function Re(s){document.removeEventListener("mousemove",s.movefn),document.removeEventListener("mouseup",s.upfn),s.movefn=null,s.upfn=null}var er=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:s=>s.composedPath&&s.composedPath()||[],ue={},Ae=[];function ms(s,i){let e=document.elementFromPoint(s,i),t=e;for(;t?.shadowRoot&&!window.ShadyDOM;){let o=t;if(t=t.shadowRoot.elementFromPoint(s,i),o===t)break;t&&(e=t)}return e}function ce(s){let i=er(s);return i.length>0?i[0]:s.target}function tr(s){let i=s.type,t=s.currentTarget[Wt];if(!t)return;let o=t[i];if(!o)return;if(!s[ds]&&(s[ds]={},i.startsWith("touch"))){let n=s.changedTouches[0];if(i==="touchstart"&&s.touches.length===1&&(oe.touch.id=n.identifier),oe.touch.id!==n.identifier)return;us||(i==="touchstart"||i==="touchmove")&&Za(s)}let r=s[ds];if(!r.skip){for(let n=0,a;n<Ae.length;n++)a=Ae[n],o[a.name]&&!r[a.name]&&a.flow&&a.flow.start.indexOf(s.type)>-1&&a.reset&&a.reset();for(let n=0,a;n<Ae.length;n++)a=Ae[n],o[a.name]&&!r[a.name]&&(r[a.name]=!0,a[i](s))}}function Za(s){let i=s.changedTouches[0],e=s.type;if(e==="touchstart")oe.touch.x=i.clientX,oe.touch.y=i.clientY,oe.touch.scrollDecided=!1;else if(e==="touchmove"){if(oe.touch.scrollDecided)return;oe.touch.scrollDecided=!0;let t=Xa(s),o=!1,r=Math.abs(oe.touch.x-i.clientX),n=Math.abs(oe.touch.y-i.clientY);s.cancelable&&(t==="none"?o=!0:t==="pan-x"?o=n>r:t==="pan-y"&&(o=r>n)),o?s.preventDefault():Kt("track")}}function dt(s,i,e){return ue[i]?(Qa(s,i,e),!0):!1}function ir(s,i,e){return ue[i]?(Ja(s,i,e),!0):!1}function Qa(s,i,e){let t=ue[i],o=t.deps,r=t.name,n=s[Wt];n||(s[Wt]=n={});for(let a=0,l,d;a<o.length;a++)l=o[a],!(Ka&&ps(l)&&l!=="click")&&(d=n[l],d||(n[l]=d={_count:0}),d._count===0&&s.addEventListener(l,tr,Qo(l)),d[r]=(d[r]||0)+1,d._count=(d._count||0)+1);s.addEventListener(i,e),t.touchAction&&tl(s,t.touchAction)}function Ja(s,i,e){let t=ue[i],o=t.deps,r=t.name,n=s[Wt];if(n)for(let a=0,l,d;a<o.length;a++)l=o[a],d=n[l],d?.[r]&&(d[r]=(d[r]||1)-1,d._count=(d._count||1)-1,d._count===0&&s.removeEventListener(l,tr,Qo(l)));s.removeEventListener(i,e)}function fs(s){Ae.push(s),s.emits.forEach(i=>{ue[i]=s})}function el(s){for(let i=0,e;i<Ae.length;i++){e=Ae[i];for(let t=0,o;t<e.emits.length;t++)if(o=e.emits[t],o===s)return e}return null}function tl(s,i){us&&s instanceof HTMLElement&&q.run(()=>{s.style.touchAction=i}),s[cs]=i}function _s(s,i,e){let t=new Event(i,{bubbles:!0,cancelable:!0,composed:!0});if(t.detail=e,ja(s).dispatchEvent(t),t.defaultPrevented){let o=e.preventer||e.sourceEvent;o?.preventDefault&&o.preventDefault()}}function Kt(s){let i=el(s);i.info&&(i.info.prevent=!0)}fs({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset(){Re(this.info)},mousedown(s){if(!ke(s))return;let i=ce(s),e=this,t=r=>{ke(r)||(lt("up",i,r),Re(e.info))},o=r=>{ke(r)&&lt("up",i,r),Re(e.info)};Jo(this.info,t,o),lt("down",i,s)},touchstart(s){lt("down",ce(s),s.changedTouches[0],s)},touchend(s){lt("up",ce(s),s.changedTouches[0],s)}});function lt(s,i,e,t){i&&_s(i,s,{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:t,prevent(o){return Kt(o)}})}fs({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove(s){this.moves.length>Ha&&this.moves.shift(),this.moves.push(s)},movefn:null,upfn:null,prevent:!1},reset(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,Re(this.info)},mousedown(s){if(!ke(s))return;let i=ce(s),e=this,t=r=>{let n=r.clientX,a=r.clientY;Yo(e.info,n,a)&&(e.info.state=e.info.started?r.type==="mouseup"?"end":"track":"start",e.info.state==="start"&&Kt("tap"),e.info.addMove({x:n,y:a}),ke(r)||(e.info.state="end",Re(e.info)),i&&hs(e.info,i,r),e.info.started=!0)},o=r=>{e.info.started&&t(r),Re(e.info)};Jo(this.info,t,o),this.info.x=s.clientX,this.info.y=s.clientY},touchstart(s){let i=s.changedTouches[0];this.info.x=i.clientX,this.info.y=i.clientY},touchmove(s){let i=ce(s),e=s.changedTouches[0],t=e.clientX,o=e.clientY;Yo(this.info,t,o)&&(this.info.state==="start"&&Kt("tap"),this.info.addMove({x:t,y:o}),hs(this.info,i,e),this.info.state="track",this.info.started=!0)},touchend(s){let i=ce(s),e=s.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:e.clientX,y:e.clientY}),hs(this.info,i,e))}});function Yo(s,i,e){if(s.prevent)return!1;if(s.started)return!0;let t=Math.abs(s.x-i),o=Math.abs(s.y-e);return t>=Go||o>=Go}function hs(s,i,e){if(!i)return;let t=s.moves[s.moves.length-2],o=s.moves[s.moves.length-1],r=o.x-s.x,n=o.y-s.y,a,l=0;t&&(a=o.x-t.x,l=o.y-t.y),_s(i,"track",{state:s.state,x:e.clientX,y:e.clientY,dx:r,dy:n,ddx:a,ddy:l,sourceEvent:e,hover(){return ms(e.clientX,e.clientY)}})}fs({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown(s){ke(s)&&(this.info.x=s.clientX,this.info.y=s.clientY)},click(s){ke(s)&&Xo(this.info,s)},touchstart(s){let i=s.changedTouches[0];this.info.x=i.clientX,this.info.y=i.clientY},touchend(s){Xo(this.info,s.changedTouches[0],s)}});function Xo(s,i,e){let t=Math.abs(i.clientX-s.x),o=Math.abs(i.clientY-s.y),r=ce(e||i);!r||Ga[r.localName]&&r.hasAttribute("disabled")||(isNaN(t)||isNaN(o)||t<=Ko&&o<=Ko||Ya(i))&&(s.prevent||_s(r,"tap",{x:i.clientX,y:i.clientY,sourceEvent:i,preventer:e}))}var il=s=>class extends s{static get properties(){return{disabled:{type:Boolean,value:!1,observer:"_disabledChanged",reflectToAttribute:!0,sync:!0}}}_disabledChanged(e){this._setAriaDisabled(e)}_setAriaDisabled(e){y(this,"aria-disabled",e)}click(){this.disabled||super.click()}},D=k(il);var sl=s=>class extends s{ready(){super.ready(),this.addEventListener("keydown",e=>{this._onKeyDown(e)}),this.addEventListener("keyup",e=>{this._onKeyUp(e)})}_onKeyDown(e){switch(e.key){case"Enter":this._onEnter(e);break;case"Escape":this._onEscape(e);break;default:break}}_onKeyUp(e){}_onEnter(e){}_onEscape(e){}},z=k(sl);var pe=s=>class extends D(z(s)){get _activeKeys(){return[" "]}ready(){super.ready(),dt(this,"down",e=>{this._shouldSetActive(e)&&this._setActive(!0)}),dt(this,"up",()=>{this._setActive(!1)})}disconnectedCallback(){super.disconnectedCallback(),this._setActive(!1)}_shouldSetActive(e){return!this.disabled}_onKeyDown(e){super._onKeyDown(e),this._shouldSetActive(e)&&this._activeKeys.includes(e.key)&&(this._setActive(!0),document.addEventListener("keyup",t=>{this._activeKeys.includes(t.key)&&this._setActive(!1)},{once:!0}))}_setActive(e){this.toggleAttribute("active",e)}};var gs=!1;window.addEventListener("keydown",()=>{gs=!0},{capture:!0});window.addEventListener("mousedown",()=>{gs=!1},{capture:!0});function re(){let s=document.activeElement||document.body;for(;s.shadowRoot&&s.shadowRoot.activeElement;)s=s.shadowRoot.activeElement;return s}function M(){return gs}function sr(s){let i=s.style;if(i.visibility==="hidden"||i.display==="none")return!0;let e=window.getComputedStyle(s);return e.visibility==="hidden"||e.display==="none"}function ol(s,i){let e=Math.max(s.tabIndex,0),t=Math.max(i.tabIndex,0);return e===0||t===0?t>e:e>t}function rl(s,i){let e=[];for(;s.length>0&&i.length>0;)ol(s[0],i[0])?e.push(i.shift()):e.push(s.shift());return e.concat(s,i)}function vs(s){let i=s.length;if(i<2)return s;let e=Math.ceil(i/2),t=vs(s.slice(0,e)),o=vs(s.slice(e));return rl(t,o)}function ne(s){return s.checkVisibility?!s.checkVisibility({visibilityProperty:!0}):s.offsetParent===null&&s.clientWidth===0&&s.clientHeight===0?!0:sr(s)}function ht(s){return s.matches("input, select, textarea, button, object")?s.matches(":not([disabled])"):s.matches("a[href], area[href], iframe, [tabindex], [contentEditable]")}function B(s){return s.getRootNode().activeElement===s}function nl(s){if(!ht(s))return-1;let i=s.getAttribute("tabindex")||0;return Number(i)}function or(s,i){if(s.nodeType!==Node.ELEMENT_NODE||sr(s))return!1;let e=s,t=nl(e),o=t>0;t>=0&&i.push(e);let r;return e.localName==="slot"?r=e.assignedNodes({flatten:!0}):r=(e.shadowRoot||e).children,[...r].forEach(n=>{o=or(n,i)||o}),o}function Gt(s){let i=[];return or(s,i)?vs(i):i}var al=s=>class extends s{get _keyboardActive(){return M()}ready(){this.addEventListener("focusin",e=>{this._shouldSetFocus(e)&&this._setFocused(!0)}),this.addEventListener("focusout",e=>{this._shouldRemoveFocus(e)&&this._setFocused(!1)}),super.ready()}disconnectedCallback(){super.disconnectedCallback(),this.hasAttribute("focused")&&this._setFocused(!1)}focus(e){super.focus(e),e?.focusVisible!==!1&&this.setAttribute("focus-ring","")}_setFocused(e){this.toggleAttribute("focused",e),this.toggleAttribute("focus-ring",e&&this._keyboardActive)}_shouldSetFocus(e){return!0}_shouldRemoveFocus(e){return!0}},F=k(al);var Yt=s=>class extends D(s){static get properties(){return{tabindex:{type:Number,reflectToAttribute:!0,observer:"_tabindexChanged",sync:!0},_lastTabIndex:{type:Number}}}_disabledChanged(e,t){super._disabledChanged(e,t),!this.__shouldAllowFocusWhenDisabled()&&(e?(this.tabindex!==void 0&&(this._lastTabIndex=this.tabindex),this.setAttribute("tabindex","-1")):t&&(this._lastTabIndex!==void 0?this.setAttribute("tabindex",this._lastTabIndex):this.tabindex=void 0))}_tabindexChanged(e){this.__shouldAllowFocusWhenDisabled()||this.disabled&&e!==-1&&(this._lastTabIndex=e,this.setAttribute("tabindex","-1"))}focus(e){(!this.disabled||this.__shouldAllowFocusWhenDisabled())&&super.focus(e)}__shouldAllowFocusWhenDisabled(){return!1}};var ll=["mousedown","mouseup","click","dblclick","keypress","keydown","keyup"],Xt=s=>class extends pe(Yt(F(s))){constructor(){super(),this.__onInteractionEvent=this.__onInteractionEvent.bind(this),ll.forEach(e=>{this.addEventListener(e,this.__onInteractionEvent,!0)}),this.tabindex=0}get _activeKeys(){return["Enter"," "]}ready(){super.ready(),this.hasAttribute("role")||this.setAttribute("role","button"),this.__shouldAllowFocusWhenDisabled()&&this.style.setProperty("--_vaadin-button-disabled-pointer-events","auto")}_onKeyDown(e){super._onKeyDown(e),!(e.altKey||e.shiftKey||e.ctrlKey||e.metaKey)&&this._activeKeys.includes(e.key)&&(e.preventDefault(),this.click())}__onInteractionEvent(e){this.__shouldSuppressInteractionEvent(e)&&e.stopImmediatePropagation()}__shouldSuppressInteractionEvent(e){return this.disabled}};var Me=class extends Xt(x(v(f(g(u))))){static get is(){return"vaadin-button"}static get styles(){return Wo}static get properties(){return{disabled:{type:Boolean,value:!1,observer:"_disabledChanged",reflectToAttribute:!0,sync:!0}}}render(){return p`
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
    `}ready(){super.ready(),this._tooltipController=new P(this),this.addController(this._tooltipController)}__shouldAllowFocusWhenDisabled(){return window.Vaadin.featureFlags.accessibleDisabledButtons}};m(Me);var dl=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n},rr=class extends Me{};rr=dl([w("or-vaadin-button")],rr);var Zt=(s,i=s)=>h`
  :host {
    align-items: baseline;
    column-gap: var(--vaadin-${b(i)}-gap, var(--vaadin-gap-s));
    grid-template: none;
    grid-template-columns: auto 1fr;
    grid-template-rows: repeat(auto-fill, minmax(0, max-content));
    -webkit-tap-highlight-color: transparent;
    --_cursor: var(--vaadin-clickable-cursor);
    --_marker-color: var(--vaadin-${b(i)}-marker-color, var(--vaadin-${b(i)}-background, var(--vaadin-background-color)));
    --_marker-filter: var(--vaadin-${b(i)}-marker-color, saturate(0) invert(1) hue-rotate(180deg) contrast(100) brightness(100));
  }

  :host(:not([has-label])) {
    column-gap: 0;
  }

  [part='${b(s)}'],
  ::slotted(input),
  [part='label'],
  ::slotted(label) {
    grid-row: 1;
  }

  [part='label'],
  ::slotted(label) {
    font-size: var(--vaadin-${b(i)}-label-font-size, var(--vaadin-input-field-label-font-size, inherit));
    line-height: var(--vaadin-${b(i)}-label-line-height, var(--vaadin-input-field-label-line-height, inherit));
    font-weight: var(--vaadin-${b(i)}-label-font-weight, var(--vaadin-input-field-label-font-weight, 500));
    color: var(--vaadin-${b(i)}-label-color, var(--vaadin-input-field-label-color, var(--vaadin-text-color)));
    word-break: break-word;
    cursor: var(--_cursor);
  }

  [part='${b(s)}'],
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
    margin-inline-end: calc(min(0px, (24px - 100%) / -2) - var(--vaadin-${b(i)}-gap, var(--vaadin-gap-s))) !important;
  }

  /* Control container (checkbox, radio button) */
  [part='${b(s)}'] {
    background: var(--vaadin-${b(i)}-background, var(--vaadin-background-color));
    border-color: var(--vaadin-${b(i)}-border-color, var(--vaadin-input-field-border-color, var(--vaadin-border-color)));
    border-radius: var(--vaadin-${b(i)}-border-radius, var(--vaadin-radius-s));
    border-style: var(--_border-style, solid);
    --_border-width: var(--vaadin-${b(i)}-border-width, var(--vaadin-input-field-border-width, 1px));
    border-width: var(--_border-width);
    box-sizing: border-box;
    color: var(--_marker-color);
    height: var(--vaadin-${b(i)}-size, round(1.125em, 2px));
    width: var(--vaadin-${b(i)}-size, round(1.125em, 2px));
    position: relative;
    cursor: var(--_cursor);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host(:is([checked], [indeterminate])) {
    --vaadin-${b(i)}-background: var(--vaadin-text-color);
    --vaadin-${b(i)}-border-color: transparent;
  }

  :host([readonly]) {
    --vaadin-${b(s)}-background: transparent;
    --vaadin-${b(s)}-border-color: var(--vaadin-border-color);
    --vaadin-${b(s)}-marker-color: var(--vaadin-text-color);
    --_border-style: dashed;
    --_cursor: var(--vaadin-disabled-cursor);

    [part='label'],
    ::slotted(label) {
      cursor: default;
    }
  }

  :host([disabled]) {
    --vaadin-${b(i)}-background: var(--vaadin-input-field-disabled-background, var(--vaadin-background-container-strong));
    --vaadin-${b(i)}-border-color: transparent;
    --vaadin-${b(i)}-marker-color: var(--vaadin-text-color-disabled);
    --_cursor: var(--vaadin-disabled-cursor);
  }

  /* Focus ring */
  :host([focus-ring]) [part='${b(s)}'] {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--_border-width) * -1);
  }

  :host([focus-ring]:is([checked], [indeterminate])) [part='${b(s)}'] {
    outline-offset: 1px;
  }

  :host([readonly][focus-ring]) [part='${b(s)}'] {
    --vaadin-${b(i)}-border-color: transparent;
    outline-offset: calc(var(--_border-width) * -1);
    outline-style: dashed;
  }

  /* Checked indicator (checkmark, dot) */
  [part='${b(s)}']::after {
    content: '\\2003' / '';
    background: currentColor;
    border-radius: inherit;
    display: flex;
    align-items: center;
    filter: var(--_marker-filter);
  }

  :host(:not([checked], [indeterminate])) [part='${b(s)}']::after {
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

    [part='${b(s)}'],
    ::slotted(input) {
      grid-column: 2;
    }

    ::slotted(input) {
      margin-inline: calc(min(0px, (24px - 100%) / -2) - var(--vaadin-${b(i)}-gap, var(--vaadin-gap-s))) 0 !important;
    }
  }

  @media (forced-colors: active) {
    :host(:is([checked], [indeterminate])) {
      --vaadin-${b(i)}-border-color: CanvasText !important;
    }

    :host(:is([checked], [indeterminate])) [part='${b(s)}'] {
      background: SelectedItem !important;
    }

    :host(:is([checked], [indeterminate])) [part='${b(s)}']::after {
      background: SelectedItemText !important;
    }

    :host([readonly]) [part='${b(s)}']::after {
      background: CanvasText !important;
    }

    :host([disabled]) {
      --vaadin-${b(i)}-border-color: GrayText !important;
    }

    :host([disabled]) [part='${b(s)}']::after {
      background: GrayText !important;
    }
  }
`;var Y=h`
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
`;var hl=h`
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
`,nr=[Y,Zt("checkbox"),hl];var cl=s=>class extends F(Yt(s)){static get properties(){return{autofocus:{type:Boolean},focusElement:{type:Object,readOnly:!0,observer:"_focusElementChanged",sync:!0},_lastTabIndex:{value:0}}}constructor(){super(),this._boundOnBlur=this._onBlur.bind(this),this._boundOnFocus=this._onFocus.bind(this)}ready(){super.ready(),this.autofocus&&!this.disabled&&requestAnimationFrame(()=>{this.focus()})}focus(e){if(this.focusElement&&!this.disabled){if(this.focusElement.focus({preventScroll:!!e?.preventScroll}),!B(this.focusElement))return;e?.focusVisible!==!1&&this.setAttribute("focus-ring","")}}blur(){this.focusElement&&this.focusElement.blur()}click(){this.focusElement&&!this.disabled&&this.focusElement.click()}_focusElementChanged(e,t){e?(e.disabled=this.disabled,this._addFocusListeners(e),this.__forwardTabIndex(this.tabindex)):t&&this._removeFocusListeners(t)}_addFocusListeners(e){e.addEventListener("blur",this._boundOnBlur),e.addEventListener("focus",this._boundOnFocus)}_removeFocusListeners(e){e.removeEventListener("blur",this._boundOnBlur),e.removeEventListener("focus",this._boundOnFocus)}_onFocus(e){e.stopPropagation(),this.dispatchEvent(new Event("focus"))}_onBlur(e){e.stopPropagation(),this.dispatchEvent(new Event("blur"))}_shouldSetFocus(e){return e.target===this.focusElement}_shouldRemoveFocus(e){return e.target===this.focusElement}_disabledChanged(e,t){super._disabledChanged(e,t),this.focusElement&&(this.focusElement.disabled=e),e&&this.blur()}_tabindexChanged(e){this.__forwardTabIndex(e)}__forwardTabIndex(e){e!==void 0&&this.focusElement&&(this.focusElement.tabIndex=e,e!==-1&&(this.tabindex=void 0)),this.disabled&&e&&(e!==-1&&(this._lastTabIndex=e),this.tabindex=void 0),e===void 0&&this.hasAttribute("tabindex")&&this.removeAttribute("tabindex")}},me=k(cl);var bs=new WeakMap;function ul(s){return bs.has(s)||bs.set(s,new Set),bs.get(s)}function pl(s,i){let e=document.createElement("style");e.textContent=s,i===document?document.head.appendChild(e):i.insertBefore(e,i.firstChild)}var ml=s=>class extends s{get slotStyles(){return[]}connectedCallback(){super.connectedCallback(),this.__applySlotStyles()}__applySlotStyles(){let e=this.getRootNode(),t=ul(e);this.slotStyles.forEach(o=>{t.has(o)||(pl(o,e),t.add(o))})}},De=k(ml);var fl=s=>class extends s{static get properties(){return{stateTarget:{type:Object,observer:"_stateTargetChanged"}}}static get delegateAttrs(){return[]}static get delegateProps(){return[]}ready(){super.ready(),this._createDelegateAttrsObserver(),this._createDelegatePropsObserver()}_stateTargetChanged(e){e&&(this._ensureAttrsDelegated(),this._ensurePropsDelegated())}_createDelegateAttrsObserver(){this._createMethodObserver(`_delegateAttrsChanged(${this.constructor.delegateAttrs.join(", ")})`)}_createDelegatePropsObserver(){this._createMethodObserver(`_delegatePropsChanged(${this.constructor.delegateProps.join(", ")})`)}_ensureAttrsDelegated(){this.constructor.delegateAttrs.forEach(e=>{this._delegateAttribute(e,this[e])})}_ensurePropsDelegated(){this.constructor.delegateProps.forEach(e=>{this._delegateProperty(e,this[e])})}_delegateAttrsChanged(...e){this.constructor.delegateAttrs.forEach((t,o)=>{this._delegateAttribute(t,e[o])})}_delegatePropsChanged(...e){this.constructor.delegateProps.forEach((t,o)=>{this._delegateProperty(t,e[o])})}_delegateAttribute(e,t){this.stateTarget&&(e==="invalid"&&this._delegateAttribute("aria-invalid",t?"true":!1),typeof t=="boolean"?this.stateTarget.toggleAttribute(e,t):y(this.stateTarget,e,t))}_delegateProperty(e,t){this.stateTarget&&(this.stateTarget[e]=t)}},ze=k(fl);var _l=s=>class extends s{static get properties(){return{inputElement:{type:Object,readOnly:!0,observer:"_inputElementChanged",sync:!0},type:{type:String,readOnly:!0},value:{type:String,value:"",observer:"_valueChanged",notify:!0,sync:!0}}}constructor(){super(),this._boundOnInput=this._onInput.bind(this),this._boundOnChange=this._onChange.bind(this)}get _hasValue(){return this.value!=null&&this.value!==""}get _inputElementValueProperty(){return"value"}get _inputElementValue(){return this.inputElement?this.inputElement[this._inputElementValueProperty]:void 0}set _inputElementValue(e){this.inputElement&&(this.inputElement[this._inputElementValueProperty]=e)}clear(){this.value="",this._inputElementValue=""}_addInputListeners(e){e.addEventListener("input",this._boundOnInput),e.addEventListener("change",this._boundOnChange)}_removeInputListeners(e){e.removeEventListener("input",this._boundOnInput),e.removeEventListener("change",this._boundOnChange)}_forwardInputValue(e){this.inputElement&&(this._inputElementValue=e??"")}_inputElementChanged(e,t){e?this._addInputListeners(e):t&&this._removeInputListeners(t)}_onInput(e){let t=e.composedPath()[0];this.__userInput=e.isTrusted,this.value=t.value,this.__userInput=!1}_onChange(e){}_toggleHasValue(e){this.toggleAttribute("has-value",e)}_valueChanged(e,t){this._toggleHasValue(this._hasValue),!(e===""&&t===void 0)&&(this.__userInput||this._forwardInputValue(e))}},fe=k(_l);var Qt=s=>class extends ze(D(fe(s))){static get properties(){return{checked:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0,sync:!0}}}static get delegateProps(){return[...super.delegateProps,"checked"]}_onChange(e){let t=e.target;this._toggleChecked(t.checked)}_toggleChecked(e){this.checked=e}};var Jt=class{#e;#t=!1;#i;#s;#r;#o;#n;#l=[];#d=[];constructor(i){this.host=i}setTarget(i){this.#e=i,this.#h(),this.#c(),this.#a(),this.#u()}setRequired(i){this.#t=i,this.#u()}setLabel(i){this.#i=i,this.#h()}setLabelledBy(i){this.#s=i,this.#c()}setDescribedBy(i){this.#r=i,this.#a()}setErrorId(i){this.#o=i,this.#a()}setHelperId(i){this.#n=i,this.#a()}#h(){this.#e&&y(this.#e,"aria-label",this.#i)}#c(){this.#e&&(Gi(this.#e,"aria-labelledby",this.#l),this.#l=[this.#s],Ki(this.#e,"aria-labelledby",this.#l))}#a(){this.#e&&(Gi(this.#e,"aria-describedby",this.#d),this.#d=[this.#r,this.#n,this.#o],Ki(this.#e,"aria-describedby",this.#d))}#u(){this.#e&&(["input","textarea"].includes(this.#e.localName)||y(this.#e,"aria-required",this.#t))}};var W=document.createElement("div");W.style.position="fixed";W.style.clip="rect(0px, 0px, 0px, 0px)";W.setAttribute("aria-live","polite");document.body.appendChild(W);var ei;function Fe(s,i={}){let e=i.mode||"polite",t=i.timeout??150;e==="alert"?(W.removeAttribute("aria-live"),W.removeAttribute("role"),ei=T.debounce(ei,Ee,()=>{W.setAttribute("role","alert")})):(ei&&ei.cancel(),W.removeAttribute("role"),W.setAttribute("aria-live",e)),W.textContent="",setTimeout(()=>{W.textContent=s},t)}var _e=class extends S{#e;constructor(i,e,t,o={}){super(i,e,t,{...o,useUniqueId:!0})}initCustomNode(i){this.#t(i),this._notifyChange(i)}teardownNode(i){let e=this.getSlotChild();e&&e!==this.defaultNode?this._notifyChange(e):(this.restoreDefaultNode(),this.updateDefaultNode(this.node))}attachDefaultNode(){let i=super.attachDefaultNode();return i&&this.#t(i),i}restoreDefaultNode(){}updateDefaultNode(i){this._notifyChange(i)}observeNode(i){this.#e&&this.#e.disconnect(),this.#e=new MutationObserver(e=>{e.forEach(t=>{let o=t.target,r=o===this.node;t.type==="attributes"?r&&this.#t(o):(r||o.parentElement===this.node)&&this._notifyChange(this.node)})}),this.#e.observe(i,{attributes:!0,attributeFilter:["id"],childList:!0,subtree:!0,characterData:!0})}_notifyChange(i){this.dispatchEvent(new CustomEvent("slot-content-changed",{detail:{hasContent:xo(i),node:i}}))}#t(i){let e=!this.nodes||i===this.nodes[0];i.nodeType===Node.ELEMENT_NODE&&(!this.multiple||e)&&!i.id&&(i.id=this.defaultId)}};var ti=class extends _e{constructor(i){super(i,"error-message","div")}setErrorMessage(i){this.errorMessage=i,this.updateDefaultNode(this.node)}setInvalid(i){this.invalid=i,this.updateDefaultNode(this.node)}initAddedNode(i){i!==this.defaultNode&&this.initCustomNode(i)}initNode(i){this.updateDefaultNode(i)}initCustomNode(i){i.textContent&&!this.errorMessage&&(this.errorMessage=i.textContent.trim()),super.initCustomNode(i)}restoreDefaultNode(){this.attachDefaultNode()}updateDefaultNode(i){let{errorMessage:e,invalid:t}=this,o=!!(t&&e&&e.trim()!=="");i&&(i.textContent=o?e:"",i.hidden=!o,o&&Fe(e,{mode:"assertive"})),super.updateDefaultNode(i)}};var ii=class extends _e{constructor(i){super(i,"helper",null)}setHelperText(i){this.helperText=i,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){let{helperText:i}=this;if(i&&i.trim()!==""){this.tagName="div";let e=this.attachDefaultNode();this.observeNode(e)}}updateDefaultNode(i){i&&(i.textContent=this.helperText),super.updateDefaultNode(i)}initCustomNode(i){super.initCustomNode(i),this.observeNode(i)}};var Ne=class extends _e{constructor(i){super(i,"label","label")}setLabel(i){this.label=i,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){let{label:i}=this;if(i&&i.trim()!==""){let e=this.attachDefaultNode();this.observeNode(e)}}updateDefaultNode(i){i&&(i.textContent=this.label),super.updateDefaultNode(i)}initCustomNode(i){super.initCustomNode(i),this.observeNode(i)}};var si=s=>class extends s{static get properties(){return{label:{type:String,observer:"_labelChanged"}}}constructor(){super(),this._labelController=new Ne(this),this._labelController.addEventListener("slot-content-changed",e=>{this.toggleAttribute("has-label",e.detail.hasContent)})}get _labelId(){return this._labelNode?.id}get _labelNode(){return this._labelController.node}ready(){super.ready(),this.addController(this._labelController)}_labelChanged(e){this._labelController.setLabel(e)}};var vl=s=>class extends s{static get properties(){return{invalid:{type:Boolean,reflectToAttribute:!0,notify:!0,value:!1,sync:!0},manualValidation:{type:Boolean,value:!1},required:{type:Boolean,reflectToAttribute:!0,sync:!0}}}validate(){let i=this.checkValidity();return this._setInvalid(!i),this.dispatchEvent(new CustomEvent("validated",{detail:{valid:i}})),i}checkValidity(){return!this.required||!!this.value}_setInvalid(i){this._shouldSetInvalid(i)&&(this.invalid=i)}_shouldSetInvalid(i){return!0}_requestValidation(){this.manualValidation||this.validate()}},oi=k(vl);var X=s=>class extends oi(si(s)){static get properties(){return{ariaTarget:{type:Object},errorMessage:{type:String},helperText:{type:String},accessibleName:{type:String},accessibleNameRef:{type:String},accessibleDescriptionRef:{type:String}}}constructor(){super(),this._labelController.addEventListener("slot-content-changed",e=>{this.#e(e)}),this._helperController=new ii(this),this._helperController.addEventListener("slot-content-changed",e=>{this.#t(e)}),this._errorController=new ti(this),this._errorController.addEventListener("slot-content-changed",e=>{this.#i(e)}),this._fieldAriaController=new Jt(this)}get _errorNode(){return this._errorController.node}get _helperNode(){return this._helperController.node}ready(){super.ready(),this.addController(this._fieldAriaController),this.addController(this._helperController),this.addController(this._errorController)}updated(e){super.updated(e),e.has("invalid")&&this._errorController.setInvalid(this.invalid),e.has("errorMessage")&&this._errorController.setErrorMessage(this.errorMessage),e.has("helperText")&&this._helperController.setHelperText(this.helperText),e.has("ariaTarget")&&this._fieldAriaController.setTarget(this.ariaTarget),e.has("required")&&this._fieldAriaController.setRequired(this.required),e.has("accessibleName")&&this.__updateFieldAriaControllerLabel(),(e.has("accessibleName")||e.has("accessibleNameRef"))&&this.__updateFieldAriaControllerLabelledBy(),e.has("accessibleDescriptionRef")&&this.__updateFieldAriaControllerDescribedBy()}__updateFieldAriaControllerLabel(){this._fieldAriaController.setLabel(this.accessibleName)}__updateFieldAriaControllerLabelledBy(){let e=null;this.accessibleNameRef?e=this.accessibleNameRef:this.hasAttribute("has-label")&&!this.accessibleName&&(e=this._labelNode?.id),this._fieldAriaController.setLabelledBy(e)}__updateFieldAriaControllerDescribedBy(){this._fieldAriaController.setDescribedBy(this.accessibleDescriptionRef)}#e(e){this.__updateFieldAriaControllerLabelledBy()}#t(e){let{hasContent:t}=e.detail;this.toggleAttribute("has-helper",t),t?this._fieldAriaController.setHelperId(this._helperNode?.id):this._fieldAriaController.setHelperId(null)}#i(e){this.toggleAttribute("has-error-message",e.detail.hasContent),setTimeout(()=>{this.invalid?this._fieldAriaController.setErrorId(this._errorNode?.id):this._fieldAriaController.setErrorId(null)})}};var j=class extends S{constructor(i,e,t={}){let{uniqueIdPrefix:o}=t;super(i,"input","input",{initializer:(r,n)=>{n.value&&(r.value=n.value),n.type&&r.setAttribute("type",n.type),r.id=this.defaultId,typeof e=="function"&&e(r)},useUniqueId:!0,uniqueIdPrefix:o})}};var N=class{constructor(i,e){this.input=i,e.addEventListener("slot-content-changed",t=>{this.#e(t.detail.node)}),this.#e(e.node)}#e(i){i&&(i.addEventListener("click",this.#t),this.input&&i.setAttribute("for",this.input.id))}#t=()=>{let i=e=>{e.stopImmediatePropagation(),this.input.removeEventListener("click",i)};this.input.addEventListener("click",i)}};var ar=s=>class extends De(X(Qt(me(pe(s))))){static get properties(){return{name:{type:String,value:""},readonly:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["__readonlyChanged(readonly, inputElement)"]}static get delegateAttrs(){return[...super.delegateAttrs,"name","invalid","required"]}constructor(){super(),this._setType("checkbox"),this._boundOnInputClick=this._onInputClick.bind(this),this.value="on",this.tabindex=0}get slotStyles(){return[`
          ${this.localName} > input[slot='input'] {
            opacity: 0;
          }
        `]}ready(){super.ready(),this.addController(new j(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new N(this.inputElement,this._labelController)),this._createPropertyObserver("checked","_checkedChanged")}updated(e){super.updated(e),e.has("required")&&this.required===!1&&this._requestValidation()}_shouldSetActive(e){let[t]=e.composedPath(),o=t===this.inputElement||t.part.contains("required-indicator")||this._labelNode?.contains(t)&&!t.closest("a");return this.readonly||!o?!1:super._shouldSetActive(e)}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("click",this._boundOnInputClick)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("click",this._boundOnInputClick)}_onInputClick(e){this.readonly&&e.preventDefault()}__readonlyChanged(e,t){t&&y(t,"aria-readonly",e)}checkValidity(){return!this.required||!!this.checked}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}_checkedChanged(e,t){(e||t)&&this._requestValidation()}_onRequiredIndicatorClick(){this._labelNode?.click()}};var K=class extends ar(x(v(f(g(u))))){static get is(){return"vaadin-checkbox"}static get styles(){return nr}static get properties(){return{indeterminate:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0}}}static get delegateProps(){return[...super.delegateProps,"indeterminate"]}render(){return p`
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
    `}ready(){super.ready(),this._tooltipController=new P(this),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}_toggleChecked(i){this.indeterminate&&(this.indeterminate=!1),super._toggleChecked(i)}};m(K);var gl=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n},lr=class extends K{};lr=gl([w("or-vaadin-checkbox")],lr);var ri=h`
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
`;var dr=[Y,ri];var hr=s=>class extends X(F(D(s))){static get properties(){return{value:{type:Array,value:()=>[],notify:!0,sync:!0,observer:"__valueChanged"},readonly:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"__readonlyChanged"}}}constructor(){super(),this.__registerCheckbox=this.__registerCheckbox.bind(this),this.__unregisterCheckbox=this.__unregisterCheckbox.bind(this),this.__onCheckboxCheckedChanged=this.__onCheckboxCheckedChanged.bind(this),this._tooltipController=new P(this),this._tooltipController.addEventListener("tooltip-changed",e=>{if(e.detail.node?.isConnected){let o=this.__checkboxes.map(r=>r.inputElement);this._tooltipController.setAriaTarget(o)}else this._tooltipController.setAriaTarget([])})}get __checkboxes(){return this.__filterCheckboxes([...this.children])}ready(){super.ready(),this.ariaTarget=this,this.setAttribute("role","group");let e=this.shadowRoot.querySelector("slot:not([name])");this._observer=new $(e,({addedNodes:t,removedNodes:o})=>{let r=this.__filterCheckboxes(t),n=this.__filterCheckboxes(o);r.forEach(this.__registerCheckbox),n.forEach(this.__unregisterCheckbox);let a=this.__checkboxes.map(l=>l.inputElement);this._tooltipController.setAriaTarget(a),this.__warnOfCheckboxesWithoutValue(r)}),this.addController(this._tooltipController)}checkValidity(){return!this.required||!!(this.value&&this.value.length>0)}__filterCheckboxes(e){return e.filter(t=>t instanceof K)}__warnOfCheckboxesWithoutValue(e){e.some(o=>{let{value:r}=o;return!o.hasAttribute("value")&&(!r||r==="on")})&&console.warn("Please provide the value attribute to all the checkboxes inside the checkbox group.")}__registerCheckbox(e){e.addEventListener("checked-changed",this.__onCheckboxCheckedChanged),this.disabled&&(e.disabled=!0),this.readonly&&(e.readonly=!0),e.checked?this.__addCheckboxToValue(e.value):this.value&&this.value.includes(e.value)&&(e.checked=!0)}__unregisterCheckbox(e){e.removeEventListener("checked-changed",this.__onCheckboxCheckedChanged),e.checked&&this.__removeCheckboxFromValue(e.value)}_disabledChanged(e,t){super._disabledChanged(e,t),!(!e&&t===void 0)&&t!==e&&this.__checkboxes.forEach(o=>{o.disabled=e})}__addCheckboxToValue(e){this.value?this.value.includes(e)||(this.value=[...this.value,e]):this.value=[e]}__removeCheckboxFromValue(e){this.value&&this.value.includes(e)&&(this.value=this.value.filter(t=>t!==e))}__onCheckboxCheckedChanged(e){let t=e.target;t.checked?this.__addCheckboxToValue(t.value):this.__removeCheckboxFromValue(t.value)}__valueChanged(e,t){e?.length===0&&t===void 0||(this.toggleAttribute("has-value",e?.length>0),this.__checkboxes.forEach(o=>{o.checked=e?.includes(o.value)}),t!==void 0&&this._requestValidation())}__readonlyChanged(e,t){(e||t)&&this.__checkboxes.forEach(o=>{o.readonly=e})}_shouldRemoveFocus(e){return!this.contains(e.relatedTarget)}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}};var ct=class extends hr(x(v(f(g(u))))){static get is(){return"vaadin-checkbox-group"}static get styles(){return dr}render(){return p`
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
    `}};m(ct);var bl=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n},cr=class extends ct{__filterCheckboxes(s){return s.filter(i=>i instanceof K)}};cr=bl([w("or-vaadin-checkbox-group")],cr);var ni=s=>s.test(navigator.userAgent),ys=s=>s.test(navigator.platform),yl=s=>s.test(navigator.vendor),ur=ni(/Android/u),Bm=ni(/Chrome/u)&&yl(/Google Inc/u),Rm=ni(/Firefox/u),xl=ys(/^iPad/u)||ys(/^Mac/u)&&navigator.maxTouchPoints>1,Cl=ys(/^iPhone/u),Ve=Cl||xl,pr=ni(/^((?!chrome|android).)*safari/iu),ae=(()=>{try{return document.createEvent("TouchEvent"),!0}catch{return!1}})();var wl=new WeakSet;function mr(s){wl.add(s)}var ai=class{saveFocus(i){this.focusNode=i||re()}restoreFocus(i){let e=this.focusNode;if(!e)return;let t={preventScroll:i?i.preventScroll:!1,focusVisible:i?i.focusVisible:!1};re()===document.body?setTimeout(()=>e.focus(t)):e.focus(t),this.focusNode=null}};var xs=[];var li=class{trapNode=null;constructor(i){this.host=i}get#e(){return Gt(this.trapNode)}get#t(){let i=this.#e;return i.indexOf(i.filter(B).pop())}hostConnected(){document.addEventListener("keydown",this.#i)}hostDisconnected(){document.removeEventListener("keydown",this.#i)}trapFocus(i){if(this.trapNode=i,this.#e.length===0)throw this.trapNode=null,new Error("The trap node should have at least one focusable descendant or be focusable itself.");xs.push(this),this.#t===-1&&this.#e[0].focus({focusVisible:M()})}releaseFocus(){this.trapNode=null,xs.pop()}#i=i=>{if(this.trapNode&&this===Array.from(xs).pop()&&i.key==="Tab"){if(i.defaultPrevented)return;i.preventDefault();let e=i.shiftKey;this.#s(e)}};#s(i=!1){let e=this.#e,t=i?-1:1,o=this.#t,r=(e.length+o+t)%e.length,n=e[r];n.focus({focusVisible:!0}),n.localName==="input"&&n.select()}};var di=s=>class extends s{static get properties(){return{focusTrap:{type:Boolean,value:!1},autofocus:{type:Boolean,value:!1},restoreFocusOnClose:{type:Boolean,value:!1},restoreFocusNode:{type:HTMLElement}}}static get manageFocus(){return!0}constructor(){super(),this.__manageFocus=this.constructor.manageFocus,this.__manageFocus&&(this.__focusTrapController=new li(this),this.__focusRestorationController=new ai)}get _contentRoot(){return this}ready(){super.ready(),this.__manageFocus&&(this.addController(this.__focusTrapController),this.addController(this.__focusRestorationController))}get _focusRoot(){return this.$.overlay}_resetFocus(){if(this.__manageFocus&&(this.focusTrap&&this.__focusTrapController.releaseFocus(),this.restoreFocusOnClose&&this._shouldRestoreFocus())){let e=M(),t=!e;this.__focusRestorationController.restoreFocus({preventScroll:t,focusVisible:e})}}_saveFocus(){this.__manageFocus&&this.restoreFocusOnClose&&this.__focusRestorationController.saveFocus(this.restoreFocusNode)}_initFocus(){if(!this.__manageFocus||ne(this._focusRoot))return;let e=Gt(this._focusRoot);e.some(B)||(e.find(o=>this.#e(o))??(this.autofocus?e[0]:null))?.focus({focusVisible:M()}),this.focusTrap&&this.__focusTrapController.trapFocus(this._focusRoot)}_shouldRestoreFocus(){let e=re();return e===document.body||this._deepContains(e)}_deepContains(e){if(this._contentRoot.contains(e))return!0;let t=e,o=e.ownerDocument;for(;t&&t!==o&&t!==this._contentRoot;)t=t.parentNode||t.host;return t===this._contentRoot}#e(e){let t=this._focusRoot,o=e;for(;o&&o!==t&&o!==this;){if(o.autofocus&&(o===e||customElements.get(o.localName)))return!0;o=o.assignedSlot||o.parentNode||o.host}return!1}};var hi=new Set,ci=()=>[...hi].filter(s=>!s.hasAttribute("closing")),Cs=s=>{let i=ci(),e=i.indexOf(s);return e===-1?[]:i.slice(e+1)},ws=(s,i)=>s._deepContains(i),fr=(s,i=e=>!0)=>{let e=ci().filter(i);return s===e.pop()},_r=s=>class extends s{get _last(){return fr(this)}get _isAttached(){return hi.has(this)}bringToFront(){if(fr(this))return;let e=Cs(this),t=e.filter(o=>o._hasOverlayPositionMixin&&ws(this,o));t.length!==e.length&&[this,...t].forEach(o=>{o.matches(":popover-open")&&(o.hidePopover(),o.showPopover()),o._removeAttachedInstance(),o._appendAttachedInstance()})}_enterModalState(){document.body.style.pointerEvents!=="none"&&(this._previousDocumentPointerEvents=document.body.style.pointerEvents,document.body.style.pointerEvents="none"),ci().forEach(e=>{e!==this&&e.toggleAttribute("suppressed",!0)})}_exitModalState(){this._previousDocumentPointerEvents!==void 0&&(document.body.style.pointerEvents=this._previousDocumentPointerEvents,delete this._previousDocumentPointerEvents);let e=ci(),t;for(;(t=e.pop())&&!(t!==this&&(t.toggleAttribute("suppressed",!1),!t.modeless)););}_appendAttachedInstance(){hi.add(this)}_removeAttachedInstance(){this._isAttached&&hi.delete(this)}};function vr(s,i){let e=null,t,o=document.documentElement;function r(){t&&clearTimeout(t),e?.disconnect(),e=null}function n(a=!1,l=1){r();let{left:d,top:c,width:_,height:A}=s.getBoundingClientRect();if(a||i(),!_||!A)return;let R=Math.floor(c),Oe=Math.floor(o.clientWidth-(d+_)),Xn=Math.floor(o.clientHeight-(c+A)),Zn=Math.floor(d),Qn={rootMargin:`${-R}px ${-Oe}px ${-Xn}px ${-Zn}px`,threshold:Math.max(0,Math.min(1,l))||1},to=!0;function Jn(ea){let Ri=ea[0].intersectionRatio;if(Ri!==l){if(!to)return n();Ri?n(!1,Ri):t=setTimeout(()=>{n(!1,1e-7)},1e3)}to=!1}e=new IntersectionObserver(Jn,Qn),e.observe(s)}return n(!0),r}function gr(s){return s.getAnimations().filter(i=>i instanceof CSSAnimation&&i.effect.getComputedTiming().activeDuration>0)}function O(s,i,e){let t=[s];s.owner&&t.push(s.owner),typeof e=="string"?t.forEach(o=>{o.setAttribute(i,e)}):e?t.forEach(o=>{o.setAttribute(i,"")}):t.forEach(o=>{o.removeAttribute(i)})}var Z=s=>class extends di(_r(s)){static get properties(){return{opened:{type:Boolean,notify:!0,observer:"_openedChanged",reflectToAttribute:!0,sync:!0},owner:{type:Object,sync:!0},model:{type:Object,sync:!0},renderer:{type:Object,sync:!0},modeless:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_modelessChanged",sync:!0},hidden:{type:Boolean,reflectToAttribute:!0,observer:"_hiddenChanged",sync:!0},withBackdrop:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_withBackdropChanged",sync:!0}}}static get observers(){return["_rendererOrDataChanged(renderer, owner, model, opened)"]}get _rendererRoot(){return this}constructor(){super(),this._boundMouseDownListener=this._mouseDownListener.bind(this),this._boundMouseUpListener=this._mouseUpListener.bind(this),this._boundOutsideClickListener=this._outsideClickListener.bind(this),this._boundKeydownListener=this._keydownListener.bind(this),Ve&&(this._boundIosResizeListener=()=>this._detectIosNavbar())}firstUpdated(){super.firstUpdated(),this.popover="manual",this.addEventListener("click",()=>{}),this.$.backdrop&&this.$.backdrop.addEventListener("click",()=>{})}connectedCallback(){super.connectedCallback(),this._boundIosResizeListener&&(this._detectIosNavbar(),window.addEventListener("resize",this._boundIosResizeListener)),this.opened&&this._attachOverlay()}disconnectedCallback(){super.disconnectedCallback(),this.__scheduledOpen&&(cancelAnimationFrame(this.__scheduledOpen),this.__scheduledOpen=null),this._boundIosResizeListener&&window.removeEventListener("resize",this._boundIosResizeListener)}requestContentUpdate(){this.renderer&&this.renderer.call(this.owner,this._rendererRoot,this.owner,this.model)}close(e){let t=new CustomEvent("vaadin-overlay-close",{bubbles:!0,cancelable:!0,detail:{overlay:this,sourceEvent:e}});this.dispatchEvent(t),document.body.dispatchEvent(t),t.defaultPrevented||(this.opened=!1)}setBounds(e,t=!0){let o=this.$.overlay,r={...e};t&&o.style.position!=="absolute"&&(o.style.position="absolute"),Object.keys(r).forEach(n=>{r[n]!==null&&!isNaN(r[n])&&(r[n]=`${r[n]}px`)}),Object.assign(o.style,r)}_detectIosNavbar(){if(!this.opened)return;let e=window.innerHeight,o=window.innerWidth>e,r=document.documentElement.clientHeight;o&&r>e?this.style.setProperty("--vaadin-overlay-viewport-bottom",`${r-e}px`):this.style.setProperty("--vaadin-overlay-viewport-bottom","0px")}_shouldAddGlobalListeners(){return!this.modeless}_addGlobalListeners(){this.__hasGlobalListeners||(this.__hasGlobalListeners=!0,document.addEventListener("mousedown",this._boundMouseDownListener),document.addEventListener("mouseup",this._boundMouseUpListener),document.documentElement.addEventListener("click",this._boundOutsideClickListener,!0))}_removeGlobalListeners(){this.__hasGlobalListeners&&(this.__hasGlobalListeners=!1,document.removeEventListener("mousedown",this._boundMouseDownListener),document.removeEventListener("mouseup",this._boundMouseUpListener),document.documentElement.removeEventListener("click",this._boundOutsideClickListener,!0))}_rendererOrDataChanged(e,t,o,r){let n=this._oldOwner!==t||this._oldModel!==o;this._oldModel=o,this._oldOwner=t;let a=this._oldRenderer!==e,l=this._oldRenderer!==void 0;this._oldRenderer=e;let d=this._oldOpened!==r;this._oldOpened=r,a&&l&&(this._rendererRoot.innerHTML="",delete this._rendererRoot._$litPart$),r&&e&&(a||d||n)&&this.requestContentUpdate()}_modelessChanged(e){this.opened&&(this._shouldAddGlobalListeners()?this._addGlobalListeners():this._removeGlobalListeners()),e?this._exitModalState():this.opened&&this._enterModalState(),O(this,"modeless",e)}_withBackdropChanged(e){O(this,"with-backdrop",e)}_openedChanged(e,t){if(e){if(!this.isConnected){this.opened=!1;return}this._saveFocus(),this._animatedOpening(),this.__scheduledOpen=requestAnimationFrame(()=>{setTimeout(()=>{this._initFocus();let o=new CustomEvent("vaadin-overlay-open",{detail:{overlay:this},bubbles:!0});this.dispatchEvent(o),document.body.dispatchEvent(o)})}),document.addEventListener("keydown",this._boundKeydownListener),this._shouldAddGlobalListeners()&&this._addGlobalListeners()}else t&&(this.__scheduledOpen&&(cancelAnimationFrame(this.__scheduledOpen),this.__scheduledOpen=null),this._resetFocus(),this._animatedClosing(),document.removeEventListener("keydown",this._boundKeydownListener),this._shouldAddGlobalListeners()&&this._removeGlobalListeners())}_hiddenChanged(e){e&&this.hasAttribute("closing")&&this._flushAnimation("closing")}_enqueueAnimation(e,t){let o=gr(this);if(o.length===0){t();return}let r=`__${e}Handler`,n=()=>{this[r]===n&&(delete this[r],t())};this[r]=n,Promise.all(o.map(a=>a.finished)).then(n,n)}_flushAnimation(e){let t=`__${e}Handler`;typeof this[t]=="function"&&this[t]()}_animatedOpening(){this._isAttached&&this.hasAttribute("closing")&&this._flushAnimation("closing"),this._attachOverlay(),this._appendAttachedInstance(),this.modeless||this._enterModalState(),O(this,"opening",!0),this._enqueueAnimation("opening",()=>{this._finishOpening()})}_attachOverlay(){this.matches(":popover-open")||this.showPopover()}_finishOpening(){O(this,"opening",!1)}_finishClosing(){this._detachOverlay(),this._removeAttachedInstance(),this.toggleAttribute("suppressed",!1),O(this,"closing",!1),this.dispatchEvent(new CustomEvent("vaadin-overlay-closed"))}_animatedClosing(){this.hasAttribute("opening")&&this._flushAnimation("opening"),this._isAttached&&(this._exitModalState(),O(this,"closing",!0),this.dispatchEvent(new CustomEvent("vaadin-overlay-closing")),this._enqueueAnimation("closing",()=>{this._finishClosing()}))}_detachOverlay(){this.hidePopover()}_mouseDownListener(e){this._mouseDownInside=e.composedPath().indexOf(this.$.overlay)>=0}_mouseUpListener(e){this._mouseUpInside=e.composedPath().indexOf(this.$.overlay)>=0}_shouldCloseOnOutsideClick(e){return this._last}_outsideClickListener(e){if(e.composedPath().includes(this.$.overlay)||this._mouseDownInside||this._mouseUpInside){this._mouseDownInside=!1,this._mouseUpInside=!1;return}if(!this._shouldCloseOnOutsideClick(e))return;let t=new CustomEvent("vaadin-overlay-outside-click",{cancelable:!0,detail:{sourceEvent:e}});this.dispatchEvent(t),this.opened&&!t.defaultPrevented&&(this.close(e),!this.opened&&!this.modeless&&mr(e))}_keydownListener(e){if(!(!this._last||e.defaultPrevented)&&!(!this._shouldAddGlobalListeners()&&!e.composedPath().includes(this._focusRoot))&&e.key==="Escape"){let t=new CustomEvent("vaadin-overlay-escape-press",{cancelable:!0,detail:{sourceEvent:e}});this.dispatchEvent(t),this.opened&&!t.defaultPrevented&&this.close(e)}}};var br=[{name:"--vaadin-overlay-animation-duration",syntax:"<time>",initialValue:"0s"},{name:"--vaadin-overlay-animation-delay",syntax:"<time>",initialValue:"0s"},{name:"--vaadin-overlay-animation-timing-function",syntax:"*",initialValue:"ease"},{name:"--vaadin-overlay-opacity-closed",syntax:"<number>",initialValue:"0"},{name:"--vaadin-overlay-translate-closed",syntax:"<length>+ | <percentage>+",initialValue:"0px"},{name:"--vaadin-overlay-scale-closed",syntax:"<number> | <percentage>",initialValue:"1"},{name:"--vaadin-overlay-transform-closed",syntax:"*"}];br.forEach(s=>{Be({inherits:!1,...s})});var El=b(br.map(({name:s})=>`${s}: inherit;`).join(`
`)),ui=h`
  :host,
  [part='overlay'],
  [part='backdrop'] {
    ${El}
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
`;var Sl=h`
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
`,Q=[Sl,ui];var Es=h`
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
`,Il=h`
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
`,yr=[Q,Es,Il];var Al=h`
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
`,xr=[Q,Es,Al];var Ss=class extends Z(E(v(f(g(u))))){static get is(){return"vaadin-confirm-dialog-overlay"}static get styles(){return xr}static get properties(){return{cancelButtonVisible:{type:Boolean,value:!1},rejectButtonVisible:{type:Boolean,value:!1}}}render(){return p`
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
    `}ready(){super.ready(),this.setAttribute("has-header",""),this.setAttribute("has-footer","")}get _contentRoot(){return this.owner}get _focusRoot(){return this.owner}};m(Ss);var I=s=>s??C;var pi=s=>class extends s{static get properties(){return{width:{type:String},height:{type:String}}}static get observers(){return["__sizeChanged(width, height)"]}__sizeChanged(e,t){requestAnimationFrame(()=>this.$.overlay.setBounds({width:e,height:t},!1))}};var Cr=s=>class extends pi(s){static get properties(){return{accessibleDescriptionRef:{type:String},opened:{type:Boolean,reflectToAttribute:!0,value:!1,notify:!0,sync:!0},header:{type:String,value:""},message:{type:String,value:""},confirmText:{type:String,value:"Confirm"},confirmTheme:{type:String,value:"primary"},noCloseOnEsc:{type:Boolean,value:!1},rejectButtonVisible:{type:Boolean,reflectToAttribute:!0,value:!1},rejectText:{type:String,value:"Reject"},rejectTheme:{type:String,value:"error tertiary"},cancelButtonVisible:{type:Boolean,reflectToAttribute:!0,value:!1},cancelText:{type:String,value:"Cancel"},cancelTheme:{type:String,value:"tertiary"},_cancelButton:{type:Object},_confirmButton:{type:Object},_headerNode:{type:Object},_messageNodes:{type:Array,value:()=>[]},_rejectButton:{type:Object}}}static get observers(){return["__updateConfirmButton(_confirmButton, confirmText, confirmTheme)","__updateCancelButton(_cancelButton, cancelText, cancelTheme, cancelButtonVisible)","__updateHeaderNode(_headerNode, header)","__updateMessageNodes(_messageNodes, message)","__updateRejectButton(_rejectButton, rejectText, rejectTheme, rejectButtonVisible)","__accessibleDescriptionRefChanged(_messageNodes, accessibleDescriptionRef)"]}constructor(){super(),this.__cancel=this.__cancel.bind(this),this.__confirm=this.__confirm.bind(this),this.__reject=this.__reject.bind(this)}connectedCallback(){super.connectedCallback(),this.__restoreOpened&&(this.opened=!0)}disconnectedCallback(){super.disconnectedCallback(),setTimeout(()=>{this.isConnected||(this.__restoreOpened=this.opened,this.opened=!1)})}ready(){super.ready(),this.role="alertdialog",this.setAttribute("aria-modal","true"),this.setAttribute("tabindex","0"),this._headerController=new S(this,"header","h3",{initializer:e=>{this._headerNode=e}}),this.addController(this._headerController),this._messageController=new S(this,"","div",{multiple:!0,observe:!1,initializer:e=>{this._messageNodes=[...this._messageNodes,e]}}),this.addController(this._messageController),this._cancelController=new S(this,"cancel-button","vaadin-button",{initializer:e=>{this.__setupSlottedButton("cancel",e)}}),this.addController(this._cancelController),this._rejectController=new S(this,"reject-button","vaadin-button",{initializer:e=>{this.__setupSlottedButton("reject",e)}}),this.addController(this._rejectController),this._confirmController=new S(this,"confirm-button","vaadin-button",{initializer:e=>{this.__setupSlottedButton("confirm",e)}}),this.addController(this._confirmController),this._overlayElement=this.$.overlay}updated(e){super.updated(e),e.has("header")&&(this.ariaLabel=this.header||"confirmation")}__onDialogOpened(){this._confirmButton&&this._confirmButton.focus()}__onDialogClosed(){this.dispatchEvent(new CustomEvent("closed"))}__accessibleDescriptionRefChanged(e,t){if(e)if(t)this.removeAttribute("aria-description"),this.setAttribute("aria-describedby",t);else{this.removeAttribute("aria-describedby");let o=e.map(r=>r.textContent.trim()).join(" ");this.setAttribute("aria-description",o)}}__setupSlottedButton(e,t){let o=`_${e}Button`,r=`__${e}`;this[o]&&this[o]!==t&&this[o].remove(),t.addEventListener("click",this[r]),this[o]=t}__updateCancelButton(e,t,o,r){e&&(e===this._cancelController.defaultNode&&(e.textContent=t,e.setAttribute("theme",o)),e.toggleAttribute("hidden",!r))}__updateConfirmButton(e,t,o){e&&e===this._confirmController.defaultNode&&(e.textContent=t,e.setAttribute("theme",o))}__updateHeaderNode(e,t){e&&e===this._headerController.defaultNode&&(e.textContent=t)}__updateMessageNodes(e,t){if(e?.length>0){let o=e.find(r=>r===this._messageController.defaultNode);o&&(o.textContent=t)}}__updateRejectButton(e,t,o,r){e&&(e===this._rejectController.defaultNode&&(e.textContent=t,e.setAttribute("theme",o)),e.toggleAttribute("hidden",!r))}_onOverlayEscapePress(e){this.noCloseOnEsc?e.preventDefault():this.__cancel()}_onOverlayOutsideClick(e){e.preventDefault()}__confirm(){this.dispatchEvent(new CustomEvent("confirm")),this.opened=!1}__cancel(){this.dispatchEvent(new CustomEvent("cancel")),this.opened=!1}__reject(){this.dispatchEvent(new CustomEvent("reject")),this.opened=!1}};var je=class extends Cr(x(G(f(u)))){static get is(){return"vaadin-confirm-dialog"}static get styles(){return h`
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
    `}render(){return p`
      <vaadin-confirm-dialog-overlay
        id="overlay"
        .owner="${this}"
        .opened="${this.opened}"
        theme="${I(this._theme)}"
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
    `}_onOpenedChanged(i){this.opened=i.detail.value}};m(je);var Ml=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n};var wr=class extends je{static get styles(){return[je.styles,h`
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
      `]}open(){this.setAttribute("opened","true")}close(){this.toggleAttribute("opened",!1)}};wr=Ml([w("or-vaadin-confirm-dialog")],wr);var mi=class{constructor(i){this.host=i}hostConnected(){if(!this.__initialized){this.__initialized=!0;let{host:i}=this;this.__resizeObserver=new ResizeObserver(()=>this.__updateState()),this.__resizeObserver.observe(i.$.resizerContainer),i.$.content.addEventListener("scroll",()=>this.__updateState(!0)),i.shadowRoot.addEventListener("slotchange",()=>this.__updateState(!0))}}update(){this.__updateState(!0)}__updateState(i=!1){cancelAnimationFrame(this.__updateRaf),i?this.__writeState(this.__readState()):this.__updateRaf=requestAnimationFrame(()=>this.__writeState(this.__readState()))}__readState(){let i=this.host.$.content,e="";return i.scrollTop>0&&(e+=" top"),i.scrollTop<i.scrollHeight-i.clientHeight&&(e+=" bottom"),e.trim()}__writeState(i){let{host:e}=this;i.length>0?O(e,"overflow",i):O(e,"overflow",null)}};var Er=s=>class extends Z(s){static get properties(){return{headerTitle:{type:String},headerRenderer:{type:Object},footerRenderer:{type:Object},keepInViewport:{type:Boolean,reflectToAttribute:!0}}}static get observers(){return["_headerFooterRendererChange(headerRenderer, footerRenderer, opened)","_headerTitleChanged(headerTitle, opened)"]}get _contentRoot(){return this.owner}containsFocus(){return this._deepContains(re())}get _rendererRoot(){if(!this.__savedRoot){let e=document.createElement("vaadin-dialog-content");e.style.display="contents",this.owner.appendChild(e),this.__savedRoot=e}return this.__savedRoot}ready(){super.ready(),this.__overflowController=new mi(this),this.addController(this.__overflowController),this.__resizeObserver=new ResizeObserver(()=>{requestAnimationFrame(()=>{this.__adjustPosition()})}),this.__resizeObserver.observe(this.$.resizerContainer);let e=this.shadowRoot.querySelector('slot[name="header-content"]');this.__headerSlotObserver=new $(e,({currentNodes:o})=>{O(this,"has-header",o.length>0),this.__overflowController.update()});let t=this.shadowRoot.querySelector('slot[name="footer"]');this.__footerSlotObserver=new $(t,({currentNodes:o})=>{O(this,"has-footer",o.length>0),this.__overflowController.update()}),this.__handleWindowResize=this.__handleWindowResize.bind(this)}updated(e){super.updated(e),(e.has("opened")||e.has("keepInViewport"))&&(this.opened&&this.keepInViewport?window.addEventListener("resize",this.__handleWindowResize):window.removeEventListener("resize",this.__handleWindowResize))}__createContainer(e){let t=document.createElement("vaadin-dialog-content");return t.setAttribute("slot",e),t}__clearContainer(e){e.innerHTML="",delete e._$litPart$}__initContainer(e,t){return e?this.__clearContainer(e):(e=this.__createContainer(t),this.owner.appendChild(e)),e}_headerFooterRendererChange(e,t,o){let r=this.__oldHeaderRenderer!==e;this.__oldHeaderRenderer=e;let n=this.__oldFooterRenderer!==t;this.__oldFooterRenderer=t;let a=this._oldOpenedFooterHeader!==o;this._oldOpenedFooterHeader=o,r&&(e?this.headerContainer=this.__initContainer(this.headerContainer,"header-content"):this.headerContainer&&(this.headerContainer.remove(),this.headerContainer=null)),n&&(t?this.footerContainer=this.__initContainer(this.footerContainer,"footer"):this.footerContainer&&(this.footerContainer.remove(),this.footerContainer=null)),(e&&(r||a)||t&&(n||a))&&o&&this.requestContentUpdate()}_headerTitleChanged(e,t){O(this,"has-title",!!e),t&&(e||this._oldHeaderTitle)&&this.requestContentUpdate(),this._oldHeaderTitle=e}_headerTitleRenderer(){this.headerTitle?(this.headerTitleElement||(this.headerTitleElement=document.createElement("h2"),this.headerTitleElement.setAttribute("slot","title"),this.headerTitleElement.classList.add("draggable")),this.owner.appendChild(this.headerTitleElement),this.headerTitleElement.textContent=this.headerTitle):this.headerTitleElement&&(this.headerTitleElement.remove(),this.headerTitleElement=null)}requestContentUpdate(){super.requestContentUpdate(),this.headerContainer&&this.headerRenderer&&this.headerRenderer.call(this.owner,this.headerContainer,this.owner),this.footerContainer&&this.footerRenderer&&this.footerRenderer.call(this.owner,this.footerContainer,this.owner),this._headerTitleRenderer(),this.__overflowController?.update()}getBounds(){let e=this.$.overlay.getBoundingClientRect(),t=this.getBoundingClientRect(),o=e.top-t.top,r=e.left-t.left,n=e.width,a=e.height;return{top:o,left:r,width:n,height:a}}setBounds(e,t=!0){super.setBounds(e,t),this.__adjustPosition()}__handleWindowResize(){this.__adjustPosition()}__adjustPosition(){if(!this.opened||!this.keepInViewport)return;let e=getComputedStyle(this.$.overlay);if(e.position!=="absolute")return;let t=this.getBoundingClientRect(),o=this.getBounds(),r=parseFloat(e.width)||o.width,n=parseFloat(e.height)||o.height,a=t.right-t.left-r,l=t.bottom-t.top-n;if(o.left>a||o.top>l){let d=Math.max(0,Math.min(o.left,a)),c=Math.max(0,Math.min(o.top,l));Object.assign(this.$.overlay.style,{left:`${d}px`,top:`${c}px`})}}};var fi=class s extends Er(E(v(f(g(u))))){static get is(){return"vaadin-dialog-overlay"}static get styles(){return yr}get _focusRoot(){return this.owner}render(){return p`
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
    `}bringToFront(i){if(i instanceof Event){let e=i.composedPath();if(Cs(this).some(o=>e.includes(o)&&ws(this,o)&&o instanceof s))return}super.bringToFront()}};m(fi);var Sr=s=>class extends s{static get properties(){return{opened:{type:Boolean,reflectToAttribute:!0,value:!1,notify:!0,sync:!0},noCloseOnOutsideClick:{type:Boolean,value:!1},noCloseOnEsc:{type:Boolean,value:!1},modeless:{type:Boolean,value:!1},noFocusTrap:{type:Boolean,value:!1},noAutofocus:{type:Boolean,value:!1},top:{type:String},left:{type:String},overlayRole:{type:String},keepInViewport:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["__positionChanged(top, left)"]}ready(){super.ready();let e=this.$.overlay;e.addEventListener("vaadin-overlay-outside-click",this._handleOutsideClick.bind(this)),e.addEventListener("vaadin-overlay-escape-press",this._handleEscPress.bind(this)),e.addEventListener("vaadin-overlay-closed",this.__handleOverlayClosed.bind(this)),this._overlayElement=e,this.hasAttribute("role")||(this.role="dialog"),this.setAttribute("tabindex","0")}updated(e){super.updated(e),e.has("overlayRole")&&(this.role=this.overlayRole||"dialog"),e.has("modeless")&&y(this,"aria-modal",!this.modeless)}__handleOverlayClosed(){this.dispatchEvent(new CustomEvent("closed"))}connectedCallback(){super.connectedCallback(),this.__restoreOpened&&(this.opened=!0)}disconnectedCallback(){super.disconnectedCallback(),setTimeout(()=>{this.isConnected||(this.__restoreOpened=this.opened,this.opened=!1)})}_onOverlayOpened(e){e.detail.value===!1&&(this.opened=!1)}_handleOutsideClick(e){this.noCloseOnOutsideClick&&e.preventDefault()}_handleEscPress(e){this.noCloseOnEsc&&e.preventDefault()}_bringOverlayToFront(e){this.modeless&&this._overlayElement.bringToFront(e)}__positionChanged(e,t){requestAnimationFrame(()=>this.$.overlay.setBounds({top:e,left:t}))}__sizeChanged(e,t){requestAnimationFrame(()=>this.$.overlay.setBounds({width:e,height:t},!1))}};function ve(s){return s.touches?s.touches[0]||s.changedTouches[0]:s}function _i(s){return s.clientX>=0&&s.clientX<=window.innerWidth&&s.clientY>=0&&s.clientY<=window.innerHeight}var Ir=5,He=class{#e;start(i){let{clientX:e,clientY:t}=ve(i);this.#e={x:e,y:t}}isClick(i){let{clientX:e,clientY:t}=ve(i);return Math.abs(e-this.#e.x)<Ir&&Math.abs(t-this.#e.y)<Ir}};var Ar=s=>class extends s{static get properties(){return{draggable:{type:Boolean,value:!1,reflectToAttribute:!0},_touchDevice:{type:Boolean,value:ae},__dragHandleClassName:{type:String}}}ready(){super.ready(),this._originalBounds={},this._originalMouseCoords={},this.__dragTracker=new He,this._startDrag=this._startDrag.bind(this),this._drag=this._drag.bind(this),this._stopDrag=this._stopDrag.bind(this),this.$.overlay.$.overlay.addEventListener("mousedown",this._startDrag),this.$.overlay.$.overlay.addEventListener("touchstart",this._startDrag)}_startDrag(e){if(!(e.type==="touchstart"&&e.touches.length>1)&&!e.defaultPrevented&&this.draggable&&(e.button===0||e.touches)){let t=this.$.overlay.$.resizerContainer,o=e.target===t,r=e.offsetX>t.clientWidth||e.offsetY>t.clientHeight,n=e.target===this.$.overlay.$.content,a=e.composedPath().some((l,d)=>{if(!l.classList)return!1;let c=l.classList.contains(this.__dragHandleClassName||"draggable"),_=l.classList.contains("draggable-leaf-only"),A=d===0;return _&&A||c&&(!_||A)});if(o&&!r||n||a){e.preventDefault(),this.__dragTracker.start(e),this._originalBounds=this.$.overlay.getBounds();let l=ve(e);this._originalMouseCoords={top:l.pageY,left:l.pageX},window.addEventListener("mouseup",this._stopDrag),window.addEventListener("touchend",this._stopDrag),window.addEventListener("mousemove",this._drag),window.addEventListener("touchmove",this._drag);let{top:d,left:c,width:_,height:A}=this._originalBounds;this.$.overlay.$.overlay.style.position!=="absolute"&&(this.top=d,this.left=c),this.dispatchEvent(new CustomEvent("drag-start",{detail:{width:_,height:A,top:d,left:c}}))}}}_drag(e){let t=ve(e);if(_i(t)){let o=this._originalBounds.top+(t.pageY-this._originalMouseCoords.top),r=this._originalBounds.left+(t.pageX-this._originalMouseCoords.left);if(this.keepInViewport){let{width:n,height:a}=this._originalBounds,l=this.$.overlay.getBoundingClientRect(),d=l.right-l.left-n,c=l.bottom-l.top-a;r=Math.max(0,Math.min(r,d)),o=Math.max(0,Math.min(o,c))}this.top=o,this.left=r}}_stopDrag(e){this.__dragTracker.isClick(e)&&!this.$.overlay.containsFocus()&&this.focus({preventScroll:!0,focusVisible:M()}),this.dispatchEvent(new CustomEvent("dragged",{detail:{top:this.top,left:this.left}})),window.removeEventListener("mouseup",this._stopDrag),window.removeEventListener("touchend",this._stopDrag),window.removeEventListener("mousemove",this._drag),window.removeEventListener("touchmove",this._drag)}};var kr=s=>class extends s{static get properties(){return{renderer:{type:Object},headerTitle:{type:String},headerRenderer:{type:Object},footerRenderer:{type:Object}}}requestContentUpdate(){this._overlayElement&&this._overlayElement.requestContentUpdate()}};var Mr=s=>class extends s{static get properties(){return{resizable:{type:Boolean,value:!1,reflectToAttribute:!0}}}ready(){super.ready(),this._originalBounds={},this._originalMouseCoords={},this.__resizeTracker=new He,this._resizeListeners={start:{},resize:{},stop:{}},this._addResizeListeners()}_addResizeListeners(){["n","e","s","w","nw","ne","se","sw"].forEach(e=>{let t=document.createElement("div");this._resizeListeners.start[e]=o=>this._startResize(o,e),this._resizeListeners.resize[e]=o=>this._resize(o,e),this._resizeListeners.stop[e]=o=>this._stopResize(o,e),e.length===1&&t.classList.add("edge"),t.classList.add("resizer"),t.classList.add(e),t.addEventListener("mousedown",this._resizeListeners.start[e]),t.addEventListener("touchstart",this._resizeListeners.start[e]),this.$.overlay.$.resizerContainer.appendChild(t)})}_startResize(e,t){if(!(e.type==="touchstart"&&e.touches.length>1)&&(e.button===0||e.touches)){e.preventDefault(),this.__resizeTracker.start(e),this._originalBounds=this.$.overlay.getBounds();let o=ve(e);this._originalMouseCoords={top:o.pageY,left:o.pageX},window.addEventListener("mousemove",this._resizeListeners.resize[t]),window.addEventListener("touchmove",this._resizeListeners.resize[t]),window.addEventListener("mouseup",this._resizeListeners.stop[t]),window.addEventListener("touchend",this._resizeListeners.stop[t]),this.$.overlay.setBounds(this._originalBounds),this.$.overlay.setAttribute("has-bounds-set","");let{width:r,height:n,top:a,left:l}=this._originalBounds;this.dispatchEvent(new CustomEvent("resize-start",{detail:{width:r,height:n,top:a,left:l}}))}}_resize(e,t){let o=ve(e);_i(o)&&t.split("").forEach(n=>{switch(n){case"n":{let a=this._originalBounds.height-(o.pageY-this._originalMouseCoords.top),l=this._originalBounds.top+(o.pageY-this._originalMouseCoords.top);a>40&&(this.top=l,this.height=a);break}case"e":{let a=this._originalBounds.width+(o.pageX-this._originalMouseCoords.left);a>40&&(this.width=a);break}case"s":{let a=this._originalBounds.height+(o.pageY-this._originalMouseCoords.top);a>40&&(this.height=a);break}case"w":{let a=this._originalBounds.width-(o.pageX-this._originalMouseCoords.left),l=this._originalBounds.left+(o.pageX-this._originalMouseCoords.left);a>40&&(this.left=l,this.width=a);break}default:break}})}_stopResize(e,t){this.__resizeTracker.isClick(e)&&!this.$.overlay.containsFocus()&&this.focus({preventScroll:!0,focusVisible:M()}),window.removeEventListener("mousemove",this._resizeListeners.resize[t]),window.removeEventListener("touchmove",this._resizeListeners.resize[t]),window.removeEventListener("mouseup",this._resizeListeners.stop[t]),window.removeEventListener("touchend",this._resizeListeners.stop[t]),this.dispatchEvent(new CustomEvent("resize",{detail:this._getResizeDimensions()}))}_getResizeDimensions(){let{width:e,height:t,top:o,left:r}=getComputedStyle(this.$.overlay.$.overlay);return{width:e,height:t,top:o,left:r}}};var Ue=class extends pi(Ar(Mr(kr(Sr(G(x(f(u)))))))){static get is(){return"vaadin-dialog"}static get styles(){return h`
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
    `}render(){return p`
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
        theme="${I(this._theme)}"
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
    `}updated(i){super.updated(i),i.has("headerTitle")&&(this.ariaLabel=this.headerTitle)}};m(Ue);var{I:dv}=vo;var Or=(s,i)=>i===void 0?s?._$litType$!==void 0:s?._$litType$===i;var Tr=s=>s.strings===void 0;var ut=(s,i)=>{let e=s._$AN;if(e===void 0)return!1;for(let t of e)t._$AO?.(i,!1),ut(t,i);return!0},vi=s=>{let i,e;do{if((i=s._$AM)===void 0)break;e=i._$AN,e.delete(s),s=i}while(e?.size===0)},Pr=s=>{for(let i;i=s._$AM;s=i){let e=i._$AN;if(e===void 0)i._$AN=e=new Set;else if(e.has(s))break;e.add(s),Pl(i)}};function Ol(s){this._$AN!==void 0?(vi(this),this._$AM=s,Pr(this)):this._$AM=s}function Tl(s,i=!1,e=0){let t=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(i)if(Array.isArray(t))for(let r=e;r<t.length;r++)ut(t[r],!1),vi(t[r]);else t!=null&&(ut(t,!1),vi(t));else ut(this,s)}var Pl=s=>{s.type==Le.CHILD&&(s._$AP??=Tl,s._$AQ??=Ol)},gi=class extends le{constructor(){super(...arguments),this._$AN=void 0}_$AT(i,e,t){super._$AT(i,e,t),Pr(this),this.isConnected=i._$AU}_$AO(i,e=!0){i!==this.isConnected&&(this.isConnected=i,i?this.reconnected?.():this.disconnected?.()),e&&(ut(this,i),vi(this))}setValue(i){if(Tr(this._$Ct))this._$Ct._$AI(i,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=i,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var Lr=Symbol("valueNotInitialized"),qe=class extends gi{constructor(i){if(super(i),i.type!==Le.ELEMENT)throw new Error(`\`${this.constructor.name}\` must be bound to an element.`);this.previousValue=Lr}render(i,e){return C}update(i,[e,t]){return this.hasChanged(t)?(this.host=i.options&&i.options.host,this.element=i.element,this.renderer=e,this.previousValue===Lr?this.addRenderer():this.runRenderer(),this.previousValue=Array.isArray(t)?[...t]:t,C):C}reconnected(){this.addRenderer()}disconnected(){this.removeRenderer()}addRenderer(){throw new Error("The `addRenderer` method must be implemented.")}runRenderer(){throw new Error("The `runRenderer` method must be implemented.")}removeRenderer(){throw new Error("The `removeRenderer` method must be implemented.")}renderRenderer(i,...e){let t=this.renderer.call(this.host,...e);H(t,i,{host:this.host})}hasChanged(i){return Array.isArray(i)?!Array.isArray(this.previousValue)||this.previousValue.length!==i.length?!0:i.some((e,t)=>e!==this.previousValue[t]):this.previousValue!==i}};var Is=Symbol("contentUpdateDebouncer"),pt=class extends qe{get rendererProperty(){throw new Error("The `rendererProperty` getter must be implemented.")}addRenderer(){this.element[this.rendererProperty]=(i,e)=>{this.renderRenderer(i,e)}}runRenderer(){this.element[Is]=T.debounce(this.element[Is],q,()=>{this.element.requestContentUpdate()})}removeRenderer(){this.element[this.rendererProperty]=null,delete this.element[Is]}},bi=class extends pt{get rendererProperty(){return"renderer"}},yi=class extends pt{get rendererProperty(){return"headerRenderer"}},xi=class extends pt{get rendererProperty(){return"footerRenderer"}},Ll=U(bi),$l=U(yi),Bl=U(xi);var Rl=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n};var $r=class extends Ue{static get styles(){return[Ue.styles,h`
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
      `]}open(){this.setAttribute("opened","true")}close(){this.toggleAttribute("opened",!1)}};$r=Rl([w("or-vaadin-dialog")],$r);var Ci=s=>class extends pe(F(s)){static get properties(){return{_hasVaadinItemMixin:{value:!0},selected:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_selectedChanged",sync:!0},_value:String}}get _activeKeys(){return["Enter"," "]}get value(){return this._value??this.textContent.trim()}set value(e){this._value=e}ready(){super.ready();let e=this.getAttribute("value");e!==null&&(this.value=e),this.__shouldAllowFocusWhenDisabled()&&this.style.setProperty("--_vaadin-item-disabled-pointer-events","auto")}focus(e){this.disabled&&!this.__shouldAllowFocusWhenDisabled()||super.focus(e)}_shouldSetActive(e){return!this.disabled&&!(e.type==="keydown"&&e.defaultPrevented)}_selectedChanged(e){this.setAttribute("aria-selected",e)}_disabledChanged(e){super._disabledChanged(e),e&&(this.selected=!1,this.__shouldAllowFocusWhenDisabled()||this.blur())}_onKeyDown(e){super._onKeyDown(e),this._activeKeys.includes(e.key)&&!e.defaultPrevented&&(e.preventDefault(),this.click())}__shouldAllowFocusWhenDisabled(){return!1}};var We=h`
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
`;var Dl=h`
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
`,Br=[We,Dl];var Rr=Br;var As=class extends Ci(v(E(f(g(u))))){static get is(){return"vaadin-menu-bar-item"}static get styles(){return Rr}render(){return p`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}connectedCallback(){super.connectedCallback(),this.setAttribute("role","menuitem")}__shouldAllowFocusWhenDisabled(){return window.Vaadin.featureFlags.accessibleDisabledMenuItems}};m(As);function Dr(s,i){let{scrollLeft:e}=s;return i!=="rtl"?e:s.scrollWidth-s.clientWidth+e}function zr(s,i,e){i!=="rtl"?s.scrollLeft=e:s.scrollLeft=s.clientWidth-s.scrollWidth+e}var wi=s=>class extends z(s){get focused(){return(this._getItems()||[]).find(B)}get _vertical(){return!0}get _tabNavigation(){return!1}focus(e){let t=this._getFocusableIndex();t>=0&&this._focus(t,e)}_getFocusableIndex(){let e=this._getItems();return Array.isArray(e)?this._getAvailableIndex(e,0,null,t=>!ne(t)):-1}_getItems(){return Array.from(this.children)}_onKeyDown(e){if(super._onKeyDown(e),e.metaKey||e.ctrlKey)return;let{key:t,shiftKey:o}=e,r=this._getItems()||[],n=r.indexOf(this.focused),a,l,c=!this._vertical&&this.getAttribute("dir")==="rtl"?-1:1;this.__isPrevKeyPressed(t,o)?(l=-c,a=n-c):this.__isNextKeyPressed(t,o)?(l=c,a=n+c):t==="Home"?(l=1,a=0):t==="End"&&(l=-1,a=r.length-1),a=this._getAvailableIndex(r,a,l,_=>!ne(_)),!(this._tabNavigation&&t==="Tab"&&(a>n&&e.shiftKey||a<n&&!e.shiftKey||a===n))&&a>=0&&(e.preventDefault(),this._focus(a,{focusVisible:!0,preventScroll:!0},!0))}__isPrevKeyPressed(e,t){return this._vertical?e==="ArrowUp":e==="ArrowLeft"||this._tabNavigation&&e==="Tab"&&t}__isNextKeyPressed(e,t){return this._vertical?e==="ArrowDown":e==="ArrowRight"||this._tabNavigation&&e==="Tab"&&!t}_focus(e,t,o=!1){let r=this._getItems();this._focusItem(r[e],t,o)}_focusItem(e,t){e&&e.focus(t)}_getAvailableIndex(e,t,o,r){let n=e.length,a=t;for(let l=0;typeof a=="number"&&l<n;l+=1,a+=o||1){a<0?a=n-1:a>=n&&(a=0);let d=e[a];if(this._isItemFocusable(d)&&this.__isMatchingItem(d,r))return a}return-1}__isMatchingItem(e,t){return typeof t=="function"?t(e):!0}_isItemFocusable(e){return!e.hasAttribute("disabled")}};var Ei=s=>class extends wi(s){static get properties(){return{disabled:{type:Boolean,value:!1,reflectToAttribute:!0},selected:{type:Number,reflectToAttribute:!0,notify:!0,sync:!0},orientation:{type:String,reflectToAttribute:!0,value:""},items:{type:Array,readOnly:!0,notify:!0},_searchBuf:{type:String,value:""}}}static get observers(){return["_enhanceItems(items, orientation, selected, disabled)"]}constructor(){super(),this._hasVaadinListMixin=!0}get _isRTL(){return!this._vertical&&this.getAttribute("dir")==="rtl"}get _scrollerElement(){return console.warn(`Please implement the '_scrollerElement' property in <${this.localName}>`),this}get _vertical(){return this.orientation!=="horizontal"}focus(e){this._observer&&this._observer.flush();let t=Array.isArray(this.items)?this.items:[],o=this._getAvailableIndex(t,0,null,r=>r.tabIndex===0&&!ne(r));o>=0?this._focus(o,e):super.focus(e)}ready(){super.ready(),this.addEventListener("click",t=>this._onClick(t));let e=this.shadowRoot.querySelector("slot:not([name])");this._observer=new $(e,()=>{this._setItems(this._filterItems([...this.children]))})}_getItems(){return this.items}_enhanceItems(e,t,o,r){if(!r&&e){this.setAttribute("aria-orientation",t||"vertical"),e.forEach(a=>y(a,"orientation",t)),this._setFocusable(o<0||!o?0:o);let n=e[o];e.forEach(a=>{a.selected=a===n}),n&&!n.disabled&&this._scrollToItem(o)}}_filterItems(e){return e.filter(t=>t._hasVaadinItemMixin)}_onClick(e){if(e.metaKey||e.shiftKey||e.ctrlKey||e.defaultPrevented)return;let t=this._filterItems(e.composedPath())[0],o;t&&!t.disabled&&(o=this.items.indexOf(t))>=0&&(this.selected=o)}_searchKey(e,t){this._searchReset=T.debounce(this._searchReset,de.after(500),()=>{this._searchBuf=""}),this._searchBuf+=t.toLowerCase(),this.items.some(r=>this.__isMatchingKey(r))||(this._searchBuf=t.toLowerCase());let o=this._searchBuf.length===1?e+1:e;return this._getAvailableIndex(this.items,o,1,r=>this.__isMatchingKey(r)&&getComputedStyle(r).display!=="none")}__isMatchingKey(e){return e.textContent.replace(/[^\p{L}\p{Nd}]/gu,"").toLowerCase().startsWith(this._searchBuf)}_onKeyDown(e){if(e.metaKey||e.ctrlKey)return;let t=e.key,o=this.items.indexOf(this.focused);if(/[\p{L}\p{Nd}]/u.test(t)&&t.length===1){let r=this._searchKey(o,t);r>=0&&this._focus(r);return}super._onKeyDown(e)}_setFocusable(e){e=this._getAvailableIndex(this.items,e,1);let t=this.items[e];this.items.forEach(o=>{o.tabIndex=o===t?0:-1})}_focus(e,t){this.items.forEach((o,r)=>{o.focused=r===e}),this._setFocusable(e),this._scrollToItem(e),super._focus(e,t??{preventScroll:!0})}_scrollToItem(e){let t=this._getItems()[e];t&&t.scrollIntoView({block:"nearest",inline:"nearest"})}_scroll(e){if(this._vertical)this._scrollerElement.scrollTop+=e;else{let t=this.getAttribute("dir")||"ltr",o=Dr(this._scrollerElement,t)+e;zr(this._scrollerElement,t,o)}}_isItemFocusable(e){return e.disabled&&e.__shouldAllowFocusWhenDisabled?e.__shouldAllowFocusWhenDisabled():super._isItemFocusable(e)}};var Si=h`
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
`;var ks=class extends Ei(v(E(f(g(u))))){static get is(){return"vaadin-menu-bar-list-box"}static get styles(){return Si}static get properties(){return{orientation:{type:String,readOnly:!0}}}get _scrollerElement(){return this.shadowRoot.querySelector('[part="items"]')}render(){return p`
      <div part="items">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("role","menu")}};m(ks);var Ms={start:"top",end:"bottom"},Os={start:"left",end:"right"},Fr=new ResizeObserver(s=>{setTimeout(()=>{s.forEach(i=>{i.target.__overlay&&i.target.__overlay._updatePosition()})})}),Ke=s=>class extends s{static get properties(){return{positionTarget:{type:Object,value:null,sync:!0},horizontalAlign:{type:String,value:"start",sync:!0},verticalAlign:{type:String,value:"top",sync:!0},noHorizontalOverlap:{type:Boolean,value:!1,sync:!0},noVerticalOverlap:{type:Boolean,value:!1,sync:!0},requiredVerticalSpace:{type:Number,value:0,sync:!0}}}constructor(){super(),this._hasOverlayPositionMixin=!0,this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}updated(e){if(super.updated(e),e.has("positionTarget")){let o=e.get("positionTarget");this.__oldContentWidth=void 0,this.__oldContentHeight=void 0,(!this.positionTarget&&o||this.positionTarget&&!o&&this.__margins)&&this.__resetPosition()}(e.has("opened")||e.has("positionTarget"))&&this.__updatePositionSettings(this.opened,this.positionTarget),["horizontalAlign","verticalAlign","noHorizontalOverlap","noVerticalOverlap","requiredVerticalSpace"].some(o=>e.has(o))&&this._updatePosition()}__addUpdatePositionEventListeners(){window.visualViewport.addEventListener("resize",this._updatePosition),window.visualViewport.addEventListener("scroll",this.__onScroll,!0),this.__positionTargetAncestorRootNodes=go(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)}),this.positionTarget&&(this.__observePositionTargetMove=vr(this.positionTarget,()=>{this._updatePosition()}))}__removeUpdatePositionEventListeners(){window.visualViewport.removeEventListener("resize",this._updatePosition),window.visualViewport.removeEventListener("scroll",this.__onScroll,!0),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null),this.__observePositionTargetMove&&(this.__observePositionTargetMove(),this.__observePositionTargetMove=null)}__updatePositionSettings(e,t){if(this.__removeUpdatePositionEventListeners(),t&&(t.__overlay=null,Fr.unobserve(t),e&&(this.__addUpdatePositionEventListeners(),t.__overlay=this,Fr.observe(t))),e){let o=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(r=>{this.__margins[r]=parseInt(o[r],10)})),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__onScroll(e){e.target instanceof Node&&this._deepContains(e.target)||this._updatePosition()}__resetPosition(){this.__margins=null,Object.assign(this.style,{justifyContent:"",alignItems:"",top:"",bottom:"",left:"",right:""}),O(this,"bottom-aligned",!1),O(this,"top-aligned",!1),O(this,"end-aligned",!1),O(this,"start-aligned",!1)}_updatePosition(){if(!this.positionTarget||!this.opened||!this.__margins)return;let e=this.positionTarget.getBoundingClientRect();if(e.width===0&&e.height===0&&this.opened){this.opened=!1;return}let t=this.__shouldAlignStartVertically(e);this.style.justifyContent=t?"flex-start":"flex-end";let o=this.__isRTL,r=this.__shouldAlignStartHorizontally(e,o),n=!o&&r||o&&!r;this.style.alignItems=n?"flex-start":"flex-end";let a=this.getBoundingClientRect(),l=this.__calculatePositionInOneDimension(e,a,this.noVerticalOverlap,Ms,this,t),d=this.__calculatePositionInOneDimension(e,a,this.noHorizontalOverlap,Os,this,r);Object.assign(this.style,l,d),O(this,"bottom-aligned",!t),O(this,"top-aligned",t),O(this,"end-aligned",!n),O(this,"start-aligned",n)}__shouldAlignStartHorizontally(e,t){let o=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;let r=Math.min(window.innerWidth,document.documentElement.clientWidth),n=!t&&this.horizontalAlign==="start"||t&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,o,r,this.__margins,n,this.noHorizontalOverlap,Os)}__shouldAlignStartVertically(e){let t=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;let o=Math.min(window.innerHeight,document.documentElement.clientHeight),r=this.verticalAlign==="top";return this.__shouldAlignStart(e,t,o,this.__margins,r,this.noVerticalOverlap,Ms)}__shouldAlignStart(e,t,o,r,n,a,l){let d=o-e[a?l.end:l.start]-r[l.end],c=e[a?l.start:l.end]-r[l.start],_=n?d:c,R=_>(n?c:d)||_>t;return n===R}__adjustBottomProperty(e,t,o){let r;if(e===t.end){if(t.end===Ms.end){let n=Math.min(window.innerHeight,document.documentElement.clientHeight);if(o>n&&this.__oldViewportHeight){let a=this.__oldViewportHeight-n;r=o-a}this.__oldViewportHeight=n}if(t.end===Os.end){let n=Math.min(window.innerWidth,document.documentElement.clientWidth);if(o>n&&this.__oldViewportWidth){let a=this.__oldViewportWidth-n;r=o-a}this.__oldViewportWidth=n}}return r}__calculatePositionInOneDimension(e,t,o,r,n,a){let l=a?r.start:r.end,d=a?r.end:r.start,c=parseFloat(n.style[l]||getComputedStyle(n)[l]),_=this.__adjustBottomProperty(l,r,c),A=t[a?r.start:r.end]-e[o===a?r.end:r.start],R=_?`${_}px`:`${c+A*(a?-1:1)}px`;return{[l]:R,[d]:""}}};var Nr=s=>class extends di(Ke(s)){static get properties(){return{parentOverlay:{type:Object,readOnly:!0},_theme:{type:String,readOnly:!0,sync:!0}}}static get observers(){return["_themeChanged(_theme)"]}get _contentRoot(){return this._rendererRoot}get _rendererRoot(){if(!this.__savedRoot){let e=document.createElement("div");e.setAttribute("slot","overlay"),e.style.display="contents",this.owner.appendChild(e),this.__savedRoot=e}return this.__savedRoot}ready(){super.ready(),this.restoreFocusOnClose=!0,this.addEventListener("keydown",e=>{if(!e.defaultPrevented&&e.composedPath()[0]===this.$.overlay&&[38,40].indexOf(e.keyCode)>-1){let t=this.owner._menuListBox??this._contentRoot.firstElementChild;t&&Array.isArray(t.items)&&t.items.length&&(e.preventDefault(),e.keyCode===38?t.items[t.items.length-1].focus():t.focus())}})}_themeChanged(){this.close()}_shouldCloseOnOutsideClick(e){return this.parentOverlay||e.composedPath().includes(this)?!1:this.owner.items?!0:super._shouldCloseOnOutsideClick(e)}getBoundaries(){let e=this.getBoundingClientRect(),t=this.$.overlay.getBoundingClientRect(),o=e.bottom-t.height,r=this.parentOverlay;if(r?.hasAttribute("bottom-aligned")){let n=getComputedStyle(r);o=o-parseFloat(n.bottom)-parseFloat(n.height)}return{xMax:e.right-t.width,xMin:e.left+t.width,yMax:o}}_updatePosition(){if(super._updatePosition(),this.positionTarget&&this.parentOverlay&&this.opened){let e=this.$.content,t=getComputedStyle(e);!!this.style.left?this.style.left=`${parseFloat(this.style.left)+parseFloat(t.paddingLeft)}px`:this.style.right=`${parseFloat(this.style.right)+parseFloat(t.paddingRight)}px`,!!this.style.bottom?this.style.bottom=`${parseFloat(this.style.bottom)-parseFloat(t.paddingBottom)}px`:this.style.top=`${parseFloat(this.style.top)-parseFloat(t.paddingTop)}px`}}_shouldRestoreFocus(){return this.parentOverlay?!1:super._shouldRestoreFocus()}_deepContains(e){return this.owner.contains(e)}};var Vr=h`
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
`;var jr=[Q,Vr];var Ts=class extends Nr(Z(E(v(f(g(u)))))){static get is(){return"vaadin-menu-bar-overlay"}static get styles(){return jr}static get lumoInjector(){return{...super.lumoInjector,includeBaseStyles:!0}}_shouldCloseOnOutsideClick(i){return i.composedPath().includes(this.owner.listenOn)?!1:super._shouldCloseOnOutsideClick(i)}render(){return p`
      <div id="backdrop" part="backdrop" ?hidden="${!this.withBackdrop}"></div>
      <div part="overlay" id="overlay" tabindex="0">
        <div part="content" id="content">
          <slot></slot>
          <slot name="submenu"></slot>
        </div>
      </div>
    `}};m(Ts);var Ge=class{#e=null;constructor(i,e){this.query=i,this.callback=e}hostConnected(){this.#i(),this.#e=window.matchMedia(this.query),this.#t(),this.#s(this.#e)}hostDisconnected(){this.#i()}#t(){this.#e&&this.#e.addListener(this.#s)}#i(){this.#e&&this.#e.removeListener(this.#s),this.#e=null}#s=i=>{typeof this.callback=="function"&&this.callback(i.matches)}};var Ye=class extends S{constructor(i){super(i,"tooltip")}initCustomNode(i){i.manual=!0,i.generator||=({item:e})=>e?.tooltip}_getItem(i){return i._item}_getDefaultPosition(i){let e=this._getItem(i);return e.children?.length>0&&!e.disabled?"start":"end"}setTarget(i){let e=this.node;if(!e)return;let t=i?this._getItem(i):null;t?.tooltip?(e.target=i,e.context={item:t},e._position=t.tooltipPosition||this._getDefaultPosition(i)):(e.target=null,e.context={item:null},this.close(!0))}open({trigger:i}){let e=this.node;e?.isConnected&&e.target&&e._stateController.open({hover:i==="hover",focus:i==="focus"})}bringToFront(){this.node?._overlayElement?.bringToFront()}close(i){this.node?._stateController.close(i)}};var Hr=s=>class extends s{static get properties(){return{items:{type:Array,sync:!0},_positionTarget:{type:Object,sync:!0}}}get _tagNamePrefix(){return"vaadin-context-menu"}disconnectedCallback(){super.disconnectedCallback(),this._tooltipController.setTarget(null)}__forwardFocus(){let e=this._overlayElement,t=this._menuListBox??e._contentRoot.firstElementChild;e.parentOverlay?e.parentOverlay._contentRoot.querySelector("[expanded]")?.hasAttribute("focused")&&t?t.focus():e.$.overlay.focus():t&&t.focus()}__openSubMenu(e,t){this.__updateSubMenuForItem(e,t);let o=this._overlayElement,r=e._overlayElement;r._setParentOverlay(o),y(e,"theme",o.getAttribute("theme")),y(e,"dir",this.dir);let n=r.$.content;n.style.minWidth="",t.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:t._item.children}}))}__updateSubMenuForItem(e,t){e.items=t._item.children,e.listenOn=t,e._positionTarget=t,e._overlayElement.requestContentUpdate()}__createComponent(e){let t;return e.component instanceof HTMLElement?t=e.component:t=document.createElement(e.component||`${this._tagNamePrefix}-item`),t._hasVaadinItemMixin&&(t.setAttribute("role","menuitem"),t.tabIndex=-1),t.localName==="hr"?t.setAttribute("role","separator"):t.setAttribute("aria-haspopup","false"),this._setMenuItemTheme(t,e,this._theme),t._item=e,e.text&&(t.textContent=e.text),e.className&&t.setAttribute("class",e.className),this.__toggleMenuComponentAttribute(t,"menu-item-checked",e.checked),this.__toggleMenuComponentAttribute(t,"disabled",e.disabled),e.children&&e.children.length&&(this.__updateExpanded(t,!1),t.setAttribute("aria-haspopup","true")),t}__initListBox(){let e=document.createElement(`${this._tagNamePrefix}-list-box`);return this._theme&&e.setAttribute("theme",this._theme),e.addEventListener("mouseover",t=>{let o=t.target.closest(`${this._tagNamePrefix}-item`);this._tooltipController.setTarget(o),this._tooltipController.open({trigger:"hover"})}),e.addEventListener("mouseleave",()=>{this._tooltipController.close(!0)}),e.addEventListener("focusin",t=>{if(!M())return;let o=t.target.closest(`${this._tagNamePrefix}-item`);this._tooltipController.setTarget(o),this._tooltipController.open({trigger:"focus"})}),e.addEventListener("selected-changed",t=>{let{value:o}=t.detail;if(typeof o=="number"){let r=e.items[o]._item;e.selected=null,r.children||this.dispatchEvent(new CustomEvent("item-selected",{detail:{value:r}}))}}),e}__initOverlay(){let e=this._overlayElement;e.$.backdrop.addEventListener("click",()=>{this.close()}),e.addEventListener("vaadin-overlay-outside-click",()=>{this.dispatchEvent(new CustomEvent("items-outside-click"))}),e.addEventListener(ae?"click":"mouseover",t=>{t.composedPath().includes(this._subMenu)||this.__showSubMenu(t)}),e.addEventListener("keydown",t=>{if(t.composedPath().includes(this._subMenu))return;let{key:o}=t,r=this.__isRTL,n=o==="ArrowRight",a=o==="ArrowLeft";!r&&n||r&&a||o==="Enter"||o===" "?this.__showSubMenu(t):!r&&a||r&&n||o==="Escape"?(o==="Escape"&&t.stopPropagation(),this.close(),this.listenOn.focus()):o==="Tab"&&!t.defaultPrevented&&this.dispatchEvent(new CustomEvent("close-all-menus"))})}__initSubMenu(){let e=document.createElement(this.constructor.is);return e._tooltipController=this._tooltipController,e.__parentMenu=this,e._modeless=!0,e.openOn="opensubmenu",this.addEventListener("opened-changed",t=>{t.detail.value||this._subMenu.close()}),e.addEventListener("close-all-menus",()=>{this.dispatchEvent(new CustomEvent("close-all-menus"))}),e.addEventListener("item-selected",t=>{let{detail:o}=t;this.dispatchEvent(new CustomEvent("item-selected",{detail:o}))}),this.addEventListener("close-all-menus",()=>{this.close()}),this.addEventListener("item-selected",t=>{let o=t.target,r=t.detail.value,n=o.items.indexOf(r);r.keepOpen&&n>-1&&o.opened?(o.__selectedIndex=n,o.requestContentUpdate()):r.keepOpen||this.close()}),e.addEventListener("opened-changed",t=>{if(t.detail.value)this._tooltipController.bringToFront();else{let r=this._listBox.querySelector("[expanded]");r&&this.__updateExpanded(r,!1)}}),e}__showSubMenu(e,t=e.composedPath().find(o=>o.localName===`${this._tagNamePrefix}-item`)){if(!this.__openListenerActive)return;if(this._overlayElement.hasAttribute("opening")){requestAnimationFrame(()=>{this.__showSubMenu(e,t)});return}let o=this._subMenu,r=this._listBox.querySelector("[expanded]");if(t&&t!==r&&!t.disabled){let{children:n}=t._item,l=o._overlayElement._contentRoot.firstElementChild?.focused;if(r&&this.__updateExpanded(r,!1),(!n||!n.length)&&o.close(),!this.opened)return;n?.length?(this.__updateExpanded(t,!0),this.__openSubMenu(o,t)):l?o.listenOn.focus():this._listBox.focused||this._overlayElement.$.overlay.focus()}t?.disabled&&o.close()}get _menuListBox(){return this.__slottedListBox??this._overlayElement._contentRoot.querySelector(`${this._tagNamePrefix}-list-box`)}__itemsRenderer(e,t){this.__initMenu(e,t),this._subMenu.closeOn=t.closeOn,this._listBox.innerHTML="",t.items.forEach(o=>{let r=this.__createComponent(o);this._listBox.appendChild(r)})}_setMenuItemTheme(e,t,o){let r=e.getAttribute("theme")||o;t.theme!=null&&(r=Array.isArray(t.theme)?t.theme.join(" "):t.theme),this.__updateTheme(e,r)}__toggleMenuComponentAttribute(e,t,o){o?(e.setAttribute(t,""),e[`__has-${t}`]=!0):e[`__has-${t}`]&&(e.removeAttribute(t),e[`__has-${t}`]=!1)}__initMenu(e,t){if(e.firstElementChild)this.__updateTheme(this._listBox,this._theme);else{this.__initOverlay();let o=this.__initListBox();this._listBox=o,e.appendChild(o);let r=this.__initSubMenu();r.slot="submenu",this._subMenu=r,this.appendChild(r),requestAnimationFrame(()=>{this.__openListenerActive=!0})}}__updateExpanded(e,t){e.setAttribute("aria-expanded",t.toString()),e.toggleAttribute("expanded",t)}__updateTheme(e,t){y(e,"theme",t)}close(){this.__parentMenu||this._tooltipController.close(!0)}};var Ur=s=>class extends Hr(s){static get properties(){return{selector:{type:String},opened:{type:Boolean,reflectToAttribute:!0,observer:"_openedChanged",value:!1,notify:!0,readOnly:!0,sync:!0},openOn:{type:String,value:"vaadin-contextmenu",sync:!0},listenOn:{type:Object,sync:!0,value(){return this}},closeOn:{type:String,value:"click",observer:"_closeOnChanged",sync:!0},renderer:{type:Function,sync:!0},__slottedListBox:{type:Object,sync:!0},_modeless:{type:Boolean,sync:!0},_context:{type:Object,sync:!0},_phone:{type:Boolean},_fullscreen:{type:Boolean},_fullscreenMediaQuery:{type:String,value:"(max-width: 450px), (max-height: 450px)"}}}static get observers(){return["_targetOrOpenOnChanged(listenOn, openOn)","_fullscreenChanged(_fullscreen)"]}constructor(){super(),this._boundOpen=this.open.bind(this),this._boundClose=this.close.bind(this),this._boundPreventDefault=this._preventDefault.bind(this),this.__onGlobalContextMenu=this.__onGlobalContextMenu.bind(this)}connectedCallback(){super.connectedCallback(),this.__boundOnScroll=this.__onScroll.bind(this),window.addEventListener("scroll",this.__boundOnScroll,!0),document.documentElement.addEventListener("contextmenu",this.__onGlobalContextMenu,!0),this.__restoreOpened&&this._setOpened(!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("scroll",this.__boundOnScroll,!0),document.documentElement.removeEventListener("contextmenu",this.__onGlobalContextMenu,!0),this.__restoreOpened=this.opened,setTimeout(()=>{this.isConnected||this.close()})}firstUpdated(){super.firstUpdated(),this._overlayElement=this.$.overlay,this.addController(new Ge(this._fullscreenMediaQuery,e=>{this._fullscreen=e})),this._tooltipController||(this._tooltipController=new Ye(this),this.addController(this._tooltipController))}updated(e){if(super.updated(e),e.has("renderer")||e.has("items")||e.has("__slottedListBox")){if([this.items,this.renderer,this.__slottedListBox].filter(Boolean).length>1)throw new Error('The "items", "renderer", and slotted "<vaadin-context-menu-list-box>" cannot be used together.');this.items&&this.closeOn==="click"&&(this.closeOn="")}}_onOverlayOpened(e){if(e.target!==this._overlayElement)return;e.detail.value?(this._setOpened(!0),this.__alignOverlayPosition()):this.opened&&this.close()}_onVaadinOverlayOpen(e){e.target===this._overlayElement&&(this.__alignOverlayPosition(),this._overlayElement.style.visibility="",this.__forwardFocus())}_onVaadinOverlayClosed(){this.dispatchEvent(new CustomEvent("closed"))}_targetOrOpenOnChanged(e,t){this._oldListenOn&&this._oldOpenOn&&(this._unlisten(this._oldListenOn,this._oldOpenOn,this._boundOpen),this._oldListenOn.style.webkitTouchCallout="",this._oldListenOn.style.webkitUserSelect="",this._oldListenOn.style.userSelect="",this._oldListenOn=null,this._oldOpenOn=null),e&&t&&(this._listen(e,t,this._boundOpen),this._oldListenOn=e,this._oldOpenOn=t)}_fullscreenChanged(e){this._phone=e}__setListenOnUserSelect(e){let t=e?"none":"";this.listenOn.style.webkitTouchCallout=t,this.listenOn.style.webkitUserSelect=t,this.listenOn.style.userSelect=t,e&&document.getSelection().removeAllRanges()}_closeOnChanged(e,t){let o="vaadin-overlay-outside-click",r=this._overlayElement;t&&this._unlisten(r,t,this._boundClose),e?(this._listen(r,e,this._boundClose),r.removeEventListener(o,this._boundPreventDefault)):r.addEventListener(o,this._boundPreventDefault)}_preventDefault(e){this.items||e.preventDefault()}_openedChanged(e){this.__setListenOnUserSelect(e)}requestContentUpdate(){this._overlayElement&&(this.__preserveMenuState(),this._overlayElement.requestContentUpdate(),this.__restoreMenuState())}close(){super.close(),this._setOpened(!1)}__getComposedPath(e){return e.__composedPath??e.detail?.sourceEvent?.__composedPath??e.composedPath()}_contextTarget(e){if(this.selector){let t=this.listenOn.querySelectorAll(this.selector);return Array.prototype.filter.call(t,o=>this.__getComposedPath(e).indexOf(o)>-1)[0]}else if(this.listenOn&&this.listenOn!==this&&this.position)return this.listenOn;return e.target}open(e){this._overlayElement&&this.__getComposedPath(e).includes(this._overlayElement)||e&&!this.opened&&(this._context={detail:e.detail,target:this._contextTarget(e)},this._context.target&&(e.preventDefault(),e.stopPropagation(),this.__x=this._getEventCoordinate(e,"x"),this.__pageXOffset=window.pageXOffset,this.__y=this._getEventCoordinate(e,"y"),this.__pageYOffset=window.pageYOffset,this._overlayElement.style.visibility="hidden",this._setOpened(!0)))}__preserveMenuState(){let e=this._menuListBox;e&&(this.__focusedIndex=e.items.indexOf(e.focused),this._subMenu&&this._subMenu.opened&&(this.__subMenuIndex=e.items.indexOf(this._subMenu.listenOn)))}__restoreMenuState(){let e=this.__focusedIndex,t=this.__subMenuIndex,o=this.__selectedIndex,r=this._menuListBox;if(r){if(r._observer?.flush(),t>-1){let n=r.items[t];n?Array.isArray(n._item.children)&&n._item.children.length?(this.__updateSubMenuForItem(this._subMenu,n),this._subMenu.requestContentUpdate()):(this._subMenu.close(),this.__focusItem(n)):r.focus()}this.__focusItem(o>-1?r.children[o]:r.items[e])}this.__focusedIndex=void 0,this.__subMenuIndex=void 0,this.__selectedIndex=void 0}__focusItem(e){e&&e.focus({focusVisible:M()})}__onOverlaySlotChange(e){this.__slottedListBox=e.target.assignedElements().find(t=>t._hasVaadinListMixin)}__onScroll(){if(!this.opened||this.position)return;let e=window.pageYOffset-this.__pageYOffset,t=window.pageXOffset-this.__pageXOffset;this.__adjustPosition("left",-t),this.__adjustPosition("right",t),this.__adjustPosition("top",-e),this.__adjustPosition("bottom",e),this.__pageYOffset+=e,this.__pageXOffset+=t}__adjustPosition(e,t){let r=this._overlayElement.style;r[e]=`${(parseInt(r[e])||0)+t}px`}__alignOverlayPosition(){let e=this._overlayElement;if(e.positionTarget)return;let t=e.style;["top","right","bottom","left"].forEach(_=>t.removeProperty(_)),["right-aligned","end-aligned","bottom-aligned"].forEach(_=>e.removeAttribute(_));let{xMax:o,xMin:r,yMax:n}=e.getBoundaries(),a=this.__x,l=this.__y,d=document.documentElement.clientWidth,c=document.documentElement.clientHeight;this.__isRTL?a>d/2||a>r?t.right=`${Math.max(0,d-a)}px`:(t.left=`${a}px`,this._setEndAligned(e)):a<d/2||a<o?t.left=`${a}px`:(t.right=`${Math.max(0,d-a)}px`,this._setEndAligned(e)),l<c/2||l<n?t.top=`${l}px`:(t.bottom=`${Math.max(0,c-l)}px`,e.setAttribute("bottom-aligned",""))}_setEndAligned(e){e.setAttribute("end-aligned",""),this.__isRTL||e.setAttribute("right-aligned","")}_getEventCoordinate(e,t){if(e.detail instanceof Object){if(e.detail[t])return e.detail[t];if(e.detail.sourceEvent)return this._getEventCoordinate(e.detail.sourceEvent,t)}else{let o=`client${t.toUpperCase()}`,r=e.changedTouches?e.changedTouches[0][o]:e[o];if(r===0){let a=(this.__getComposedPath(e)[0]||e.target).getBoundingClientRect();return t==="x"?a.left:a.top+a.height}return r}}_listen(e,t,o){ue[t]?dt(e,t,o):e.addEventListener(t,o)}_unlisten(e,t,o){ue[t]?ir(e,t,o):e.removeEventListener(t,o)}__createMouseEvent(e,t,o){return new MouseEvent(e,{bubbles:!0,composed:!0,cancelable:!0,clientX:t,clientY:o})}__focusClosestFocusable(e){let t=e;for(;t;){if(t instanceof HTMLElement&&ht(t)){t.focus();return}t=t.assignedSlot||t.parentNode||t.host}}__contextMenuAt(e,t){let o=ms(e,t);o&&queueMicrotask(()=>{this.__focusClosestFocusable(o),o.dispatchEvent(this.__createMouseEvent("contextmenu",e,t))})}__onGlobalContextMenu(e){this.opened&&(e.shiftKey||(ur||Ve||(e.stopPropagation(),this._overlayElement.__focusRestorationController.focusNode=null,this._overlayElement.addEventListener("vaadin-overlay-closed",o=>{o.target===this._overlayElement&&this.__contextMenuAt(e.clientX,e.clientY)},{once:!0})),e.preventDefault(),this.close()))}};var Ps=class extends Ur(E(G(f(u)))){static get is(){return"vaadin-menu-bar-submenu"}static get styles(){return h`
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none !important;
      }
    `}static get properties(){return{isRoot:{type:Boolean,reflectToAttribute:!0,sync:!0}}}constructor(){super(),this.openOn="opensubmenu"}firstUpdated(i){this._tooltipController=this.parentElement._tooltipController,super.firstUpdated(i)}get _tagNamePrefix(){return"vaadin-menu-bar"}render(){return p`
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
        theme="${I(this._theme)}"
        exportparts="backdrop, overlay, content"
        @opened-changed="${this._onOverlayOpened}"
        @vaadin-overlay-open="${this._onVaadinOverlayOpen}"
      >
        <slot name="overlay"></slot>
        <slot name="submenu" slot="submenu"></slot>
      </vaadin-menu-bar-overlay>
    `}_openedChanged(){}__onGlobalContextMenu(){}close(){super.close(),this.isRoot&&this.parentElement._close()}};m(Ps);var qr=h`
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
`;var Ls=class extends Me{static get is(){return"vaadin-menu-bar-button"}static get styles(){return[super.styles,qr]}_onKeyDown(i){this.__triggeredWithActiveKeys=this._activeKeys.includes(i.key),super._onKeyDown(i),this.__triggeredWithActiveKeys=null}_setActive(i){!i&&this.hasAttribute("expanded")||super._setActive(i)}__shouldSuppressInteractionEvent(i){return i.type==="keydown"&&["ArrowLeft","ArrowRight"].includes(i.key)?!1:super.__shouldSuppressInteractionEvent(i)}};m(Ls);var Wr=h`
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
`;var zl=["__proto__","constructor","prototype"],Ii=s=>{if(!s||typeof s!="object")return!1;let i=Object.getPrototypeOf(s);return i===Object.prototype||i===null};function Kr(s,i,e){return!Ii(s)||!Ii(i)||Object.keys(i).forEach(t=>{if(zl.includes(t))return;let o=i[t];if(Ii(o)){if(!Object.hasOwn(s,t)||!Ii(s[t])){if(e&&Object.hasOwn(s,t)&&s[t])return;s[t]={}}Kr(s[t],o,e)}else e&&Array.isArray(o)?s[t]=[...o]:(!e||o!=null)&&(s[t]=o)}),s}function $s(s,...i){return i.forEach(e=>Kr(s,e,!0)),s}var Ai=s=>class extends s{static get properties(){return{i18n:{type:Object},__effectiveI18n:{type:Object,sync:!0}}}static get defaultI18n(){return{}}constructor(){super(),this.i18n=$s({},this.constructor.defaultI18n)}get i18n(){return this.__customI18n}set i18n(e){e!==this.__customI18n&&(this.__customI18n=e,this.__effectiveI18n=$s({},this.constructor.defaultI18n,this.__customI18n))}};var ki=new ResizeObserver(s=>{setTimeout(()=>{s.forEach(i=>{i.target.isConnected&&(i.target.resizables?i.target.resizables.forEach(e=>{e._onResize(i.contentRect)}):i.target._onResize(i.contentRect))})})}),Fl=s=>class extends s{get _observeParent(){return!1}connectedCallback(){if(super.connectedCallback(),ki.observe(this),this._observeParent){let e=this.parentNode instanceof ShadowRoot?this.parentNode.host:this.parentNode;e.resizables||(e.resizables=new Set,ki.observe(e)),e.resizables.add(this),this.__parent=e}}disconnectedCallback(){super.disconnectedCallback(),ki.unobserve(this);let e=this.__parent;if(this._observeParent&&e){let t=e.resizables;t&&(t.delete(this),t.size===0&&ki.unobserve(e)),this.__parent=null}}_onResize(e){}},Xe=k(Fl);var Mi=class extends Ye{_getItem(i){return i.localName==="vaadin-menu-bar-button"?i.item:super._getItem(i)}_getDefaultPosition(i){return i.localName==="vaadin-menu-bar-button"?"bottom":super._getDefaultPosition(i)}};var Bs=class extends le{update(i,[{component:e,text:t}]){let{parentNode:o,startNode:r}=i,n=e||(t?document.createTextNode(t):null),a=this.getOldNode(i);return a===n?V:(a&&n?o.replaceChild(n,a):a?o.removeChild(a):n&&r.after(n),V)}getOldNode(i){let{startNode:e,endNode:t}=i;return e.nextSibling===t?null:e.nextSibling}},Nl=U(Bs),Vl={moreOptions:"More options"},Gr=.1,Yr=s=>class extends Ai(wi(Xe(F(D(s))))){static get properties(){return{items:{type:Array,sync:!0,value:()=>[]},openOnHover:{type:Boolean},reverseCollapse:{type:Boolean,sync:!0},tabNavigation:{type:Boolean,sync:!0}}}static get defaultI18n(){return Vl}get i18n(){return super.i18n}set i18n(e){super.i18n=e}constructor(){super(),this.__boundOnContextMenuKeydown=this.__onContextMenuKeydown.bind(this)}get focused(){return(this._getItems()||[]).find(B)||this._expandedButton}get _vertical(){return!1}get _tabNavigation(){return this.tabNavigation}get _observeParent(){return!0}get _buttons(){return Array.from(this.querySelectorAll("vaadin-menu-bar-button"))}get _hasOverflow(){return this._overflow&&!this._overflow.hasAttribute("hidden")}set _hasOverflow(e){this._overflow&&this._overflow.toggleAttribute("hidden",!e)}ready(){super.ready(),this.setAttribute("role","menubar"),this._subMenuController=new S(this,"submenu","vaadin-menu-bar-submenu",{initializer:e=>{e.setAttribute("is-root",""),e.addEventListener("item-selected",this.__onItemSelected.bind(this)),e.addEventListener("close-all-menus",this.__onEscapeClose.bind(this)),e._overlayElement._contentRoot.addEventListener("keydown",this.__boundOnContextMenuKeydown),this._subMenu=e}}),this._overflowController=new S(this,"overflow","vaadin-menu-bar-button",{initializer:e=>{e.setAttribute("hidden","");let t=document.createElement("div");t.setAttribute("aria-hidden","true"),t.innerHTML="&centerdot;".repeat(3),e.appendChild(t),e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded","false"),e.setAttribute("role",this.tabNavigation?"button":"menuitem"),this._overflow=e}}),this._tooltipController=new Mi(this),this.addEventListener("mousedown",()=>this._tooltipController.close(!0)),this.addEventListener("mouseleave",()=>this._tooltipController.close()),this.addController(this._tooltipController),this.addController(this._subMenuController),this.addController(this._overflowController),this._container=this.shadowRoot.querySelector('[part="container"]')}updated(e){super.updated(e),(e.has("items")||e.has("_theme")||e.has("disabled"))&&this.__renderButtons(this.items),(e.has("items")||e.has("_theme")||e.has("reverseCollapse"))&&this.__scheduleOverflow(),e.has("items")&&this.__updateSubMenu(),e.has("_theme")&&this._themeChanged(this._theme),e.has("dir")&&y(this._subMenu,"dir",this.dir),e.has("disabled")&&this._overflow.toggleAttribute("disabled",this.disabled),e.has("tabNavigation")&&this._tabNavigationChanged(this.tabNavigation),e.has("__effectiveI18n")&&this.__i18nChanged(this.__effectiveI18n)}_getItems(){return this._buttons}disconnectedCallback(){super.disconnectedCallback(),this._tooltipController.setTarget(null)}_onResize(){this.__scheduleOverflow()}_themeChanged(e){y(this._overflow,"theme",e),y(this._subMenu,"theme",e)}_tabNavigationChanged(e){let t=this.querySelector('[tabindex="0"]');this._buttons.forEach(o=>{t?this._setTabindex(o,o===t):this._setTabindex(o,!1),o.setAttribute("role",e?"button":"menuitem")}),this.setAttribute("role",e?"group":"menubar")}__updateSubMenu(){let e=this._subMenu;if(e?.opened){let t=e._positionTarget;(!t.isConnected||!Array.isArray(t.item.children)||t.item.children.length===0)&&e.close()}}__i18nChanged(e){e?.moreOptions!==void 0&&y(this._overflow,"aria-label",e.moreOptions)}__getOverflowCount(e){return e.item?.children?.length??0}__restoreButtons(e){e.forEach(t=>{t.style.visibility="",t.style.position="";let o=t.item?.component;o instanceof HTMLElement&&o.getAttribute("role")==="menuitem"&&this.__restoreItem(t,o)})}__restoreState(e){this.__restoreButtons(e),this.__updateOverflow([]),this.toggleAttribute("has-single-button",e.length===1),this.__updateVisibleAttributes(e)}__restoreItem(e,t){e.appendChild(t),t.removeAttribute("role"),t.removeAttribute("aria-expanded"),t.removeAttribute("aria-haspopup"),t.removeAttribute("tabindex")}__updateOverflow(e){this._overflow.item={children:e},this._hasOverflow=e.length>0}__getInlineEnd(e){let{left:t,right:o}=e.getBoundingClientRect();return this.__isRTL?-t:o}__isPastContainerEnd(e){return this.__getInlineEnd(e)>this.__getInlineEnd(this._container)+Gr}__getOverflowLayout(e,t){let o=this.__isRTL,r=e.map(c=>c.getBoundingClientRect()),n=r.map(({left:c,right:_})=>o?-c:_),a=this.__getInlineEnd(t),l=this._container.getBoundingClientRect(),d=o?-l.right:l.left;return{starts:r.map(({left:c,right:_})=>o?-_:c),ends:n,margins:e.map(c=>parseFloat(getComputedStyle(c).marginInlineStart)||0),overflowExtent:a-n.at(-1),containerWidth:l.width,contentWidth:a-d}}__getButtonsToCollapse(e,{starts:t,ends:o,margins:r,overflowExtent:n,containerWidth:a}){let l=0,d=e.length-1;for(;l<=d&&r[l]+o[d]-t[l]+n>a+Gr;)this.reverseCollapse?l+=1:d-=1;return e.filter((c,_)=>_<l||_>d)}__freezeWidth(e){this.style.setProperty("--_vaadin-menu-bar-content-width",`${e}px`),this.setAttribute("overflow-frozen","")}__unfreezeWidth(){this.style.removeProperty("--_vaadin-menu-bar-content-width"),this.removeAttribute("overflow-frozen")}__setOverflowItems(e,t){let o=e.at(-1),r=this.hasAttribute("overflow-frozen");if(!o||!r&&!this.__isPastContainerEnd(o)){this.__unfreezeWidth();return}this._hasOverflow=!0;let n=this.__getOverflowLayout(e,t),a=this.__getButtonsToCollapse(e,n);a.forEach(l=>{l.style.visibility="hidden",l.style.position="absolute"}),this.__updateOverflow(a.map(l=>l.item)),a.length===0?this.__unfreezeWidth():(r||this.__isPastContainerEnd(t))&&this.__freezeWidth(n.contentWidth)}__scheduleOverflow(){this._overflowDebouncer=T.debounce(this._overflowDebouncer,q,()=>{this.__detectOverflow()})}__detectOverflow(){let e=this._overflow,t=this._buttons.filter(a=>a!==e),o=this.__getOverflowCount(e);this.__restoreState(t),this.__setOverflowItems(t,e);let r=this.__getOverflowCount(e);o!==r&&this._subMenu.opened&&this._subMenu.close();let n=r===t.length||r===0&&t.length===1;this.toggleAttribute("has-single-button",n),this.__updateVisibleButtons(t)}__updateVisibleButtons(e){let t=e.filter(o=>o.style.visibility!=="hidden");t.length?t.some(o=>o.getAttribute("tabindex")==="0")||this._setTabindex(t[t.length-1],!0):this._overflow.setAttribute("tabindex","0"),this.__updateVisibleAttributes(t)}__updateVisibleAttributes(e){e.forEach((t,o)=>{t.toggleAttribute("first-visible",o===0),t.toggleAttribute("last-visible",!this._hasOverflow&&o===e.length-1)})}__getButtonTheme(e,t){let o=t,r=e?.theme;return r!=null&&(o=Array.isArray(r)?r.join(" "):r),o}__getComponent(e){let t=e.component,o,r=t instanceof HTMLElement;if(r&&t.localName==="vaadin-menu-bar-item"?o=t:(o=document.createElement("vaadin-menu-bar-item"),o.appendChild(r?t:document.createElement(t))),e.text){let n=o.firstChild||o;n.textContent=e.text}return o}__renderButtons(e=[]){H(p`
          ${e.map(t=>{let o={...t},r=!!t?.children;return o.component&&(o.component=this.__getComponent(o)),p`
              <vaadin-menu-bar-button
                .item="${o}"
                .disabled="${this.disabled||t.disabled}"
                role="${this.tabNavigation?"button":"menuitem"}"
                aria-haspopup="${I(r?"true":C)}"
                aria-expanded="${I(r?"false":C)}"
                class="${I(t.className||C)}"
                theme="${I(this.__getButtonTheme(t,this._theme)||C)}"
                @click="${this.__onRootButtonClick}"
                >${Nl(o)}</vaadin-menu-bar-button
              >
            `})}
        `,this,{renderBefore:this._overflow})}__onRootButtonClick(e){let t=e.target;t.item?.component&&!e.composedPath().includes(t.item.component)&&(e.stopPropagation(),t.item.component.click())}_setExpanded(e,t){e.toggleAttribute("expanded",t),e.toggleAttribute("active",t),e.setAttribute("aria-expanded",t?"true":"false")}_setTabindex(e,t){this.tabNavigation&&this._isItemFocusable(e)?e.setAttribute("tabindex","0"):e.setAttribute("tabindex",t?"0":"-1")}_focusItem(e,t,o){let r=o&&this.focused===this._expandedButton;r&&this._close(),super._focusItem(e,t,o),this._buttons.forEach(n=>{this._setTabindex(n,n===e)}),this._tooltipController.setTarget(e),r&&e.item?.children?this.__openSubMenu(e,!0,{keepFocus:!0}):this._subMenu.opened||this._tooltipController.open({trigger:"focus"})}_getButtonFromEvent(e){return Array.from(e.composedPath()).find(t=>t.localName==="vaadin-menu-bar-button")}_shouldSetFocus(e){return e.composedPath().includes(this._subMenu)?!1:super._shouldSetFocus(e)}_shouldRemoveFocus(e){return e.composedPath().includes(this._subMenu)?!1:super._shouldRemoveFocus(e)}_setFocused(e){let t=e?this.__getFocusTarget():null;t?(this._tooltipController.setTarget(t),this._buttons.forEach(o=>{this._setTabindex(o,o===t)}),!this._subMenu.opened&&M()&&this._tooltipController.open({trigger:"focus"})):this._tooltipController.close(!0)}__getFocusTarget(){let e=this._buttons.find(t=>B(t));if(!e){let t=this.tabNavigation?"[focused]":'[tabindex="0"]';e=this.querySelector(`vaadin-menu-bar-button${t}`),ne(e)&&(e=this._buttons[this._getFocusableIndex()])}return e}_onArrowDown(e){e.preventDefault();let t=this._getButtonFromEvent(e);t===this._expandedButton?this._focusFirstItem():this.__openSubMenu(t,!0)}_onArrowUp(e){e.preventDefault();let t=this._getButtonFromEvent(e);t===this._expandedButton?this._focusLastItem():this.__openSubMenu(t,!0,{focusLast:!0})}_onEscape(e){e.composedPath().includes(this._expandedButton)&&this._close(!0),this._tooltipController.close(!0)}_onKeyDown(e){e.composedPath().includes(this._subMenu)||this._handleKeyDown(e)}_handleKeyDown(e){switch(e.key){case"ArrowDown":this._onArrowDown(e);break;case"ArrowUp":this._onArrowUp(e);break;default:super._onKeyDown(e);break}}_onMouseOver(e){if(e.composedPath().includes(this._subMenu))return;let t=this._getButtonFromEvent(e);this._tooltipController.setTarget(t),t&&t!==this._expandedButton&&t.item.children&&(this.openOnHover||this._subMenu.opened)&&this.__openSubMenu(t,!1),this._subMenu.opened||this._tooltipController.open({trigger:"hover"})}__onContextMenuKeydown(e){let t=Array.from(e.composedPath()).find(o=>o._item);if(t){let o=t.parentNode;e.key==="ArrowUp"&&t===o.items[0]&&this._close(!0);let r=this.__isRTL?"ArrowRight":"ArrowLeft",n=this.__isRTL?"ArrowLeft":"ArrowRight";(e.key===r||e.key===n&&!t._item.children)&&(e.stopImmediatePropagation(),this._handleKeyDown(e)),e.key==="Tab"&&this.tabNavigation&&this._handleKeyDown(e)}}__fireItemSelected(e){this.dispatchEvent(new CustomEvent("item-selected",{detail:{value:e}}))}__onButtonClick(e){let t=this._getButtonFromEvent(e);t&&this.__openSubMenu(t,t.__triggeredWithActiveKeys)}__openSubMenu(e,t,o={}){if(e.disabled)return;let r=this._subMenu,n=e.item;if(r.opened&&(this._close(),r.listenOn===e))return;let a=n?.children;if(!a||a.length===0){this.__fireItemSelected(n);return}r.items=a,r.listenOn=e,r._positionTarget=e;let l=r._overlayElement;l.noVerticalOverlap=!0,this._tooltipController.close(!0),this._expandedButton=e,this._setExpanded(e,!0),this.style.pointerEvents="auto",e.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:a}})),l.addEventListener("vaadin-overlay-open",()=>{if(o.focusLast&&this._focusLastItem(),o.keepFocus){let d={focusVisible:M()};this._focusItem(this._expandedButton,d,!1)}t||l.$.overlay.focus()},{once:!0})}_focusFirstItem(){this._subMenu._menuListBox.focus()}_focusLastItem(){let e=this._subMenu._menuListBox,t=e.items[e.items.length-1];t&&t.focus()}__onItemSelected(e){e.stopPropagation(),this.__fireItemSelected(e.detail.value)}__onEscapeClose(){this.__deactivateButton(!0)}__deactivateButton(e){let t=this._expandedButton;if(t?.hasAttribute("expanded")){if(this._setExpanded(t,!1),e){let o={focusVisible:M()};this._focusItem(t,o,!1)}else this._tooltipController.close(!0);this._expandedButton=null}}_close(e=!1){this.style.pointerEvents="",this.__deactivateButton(e),this._subMenu.opened&&this._subMenu.close()}close(){this._close()}_isItemFocusable(e){return e.disabled&&e.__shouldAllowFocusWhenDisabled?e.__shouldAllowFocusWhenDisabled():super._isItemFocusable(e)}};var mt=class extends Yr(x(v(f(g(u))))){static get is(){return"vaadin-menu-bar"}static get styles(){return Wr}render(){return p`
      <div part="container" @click="${this.__onButtonClick}" @mouseover="${this._onMouseOver}">
        <slot></slot>
        <slot name="overflow"></slot>
      </div>

      <slot name="submenu"></slot>

      <slot name="tooltip"></slot>
    `}};m(mt);var jl=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n};var Xr=class extends mt{};Xr=jl([w("or-vaadin-menu-bar")],Xr);var Zr=h`
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
`;var Rs=class extends v(f(g(u))){static get is(){return"vaadin-multi-select-combo-box-chip"}static get styles(){return Zr}static get properties(){return{disabled:{type:Boolean,reflectToAttribute:!0,sync:!0},readonly:{type:Boolean,reflectToAttribute:!0,sync:!0},label:{type:String,sync:!0},item:{type:Object}}}render(){return p`
      <div part="label">${this.label}</div>
      <div part="remove-button" @click="${this._onRemoveClick}"></div>
    `}_onRemoveClick(i){i.stopPropagation(),this.dispatchEvent(new CustomEvent("item-removed",{detail:{item:this.item},bubbles:!0,composed:!0}))}};m(Rs);var Qr=h`
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
`;var ft=class extends v(E(f(g(u)))){static get is(){return"vaadin-input-container"}static get styles(){return Qr}static get properties(){return{disabled:{type:Boolean,reflectToAttribute:!0},readonly:{type:Boolean,reflectToAttribute:!0},invalid:{type:Boolean,reflectToAttribute:!0}}}render(){return p`
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
    `}ready(){super.ready(),this.addEventListener("pointerdown",i=>{i.target===this&&i.preventDefault()}),this.addEventListener("click",i=>{i.target===this&&this.shadowRoot.querySelector("slot:not([name])").assignedNodes({flatten:!0}).forEach(e=>e.focus&&e.focus())})}};m(ft);var Ds=class extends ft{static get is(){return"vaadin-multi-select-combo-box-container"}static get styles(){return[super.styles,h`
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
      `]}static get properties(){return{autoExpandVertically:{type:Boolean,reflectToAttribute:!0}}}render(){return p`
      <div id="wrapper">
        <slot name="prefix"></slot>
        <slot></slot>
      </div>
      <slot name="suffix"></slot>
    `}};m(Ds);var Jr=h`
  :host([focused]) {
    outline: var(--vaadin-focus-ring-width) solid var(--vaadin-focus-ring-color);
    outline-offset: calc(var(--vaadin-focus-ring-width) / -1);
  }
`;var en=s=>class extends s{static get properties(){return{index:{type:Number},item:{type:Object},label:{type:String},selected:{type:Boolean,value:!1,reflectToAttribute:!0},focused:{type:Boolean,value:!1,reflectToAttribute:!0},renderer:{type:Function}}}static get observers(){return["__rendererOrItemChanged(renderer, index, item, selected, focused)","__updateLabel(label, renderer)"]}static get observedAttributes(){return[...super.observedAttributes,"hidden"]}attributeChangedCallback(e,t,o){e==="hidden"&&o!==null?this.index=void 0:super.attributeChangedCallback(e,t,o)}connectedCallback(){super.connectedCallback(),this._owner=this.parentNode.owner;let e=this._getHostDir();e&&this.setAttribute("dir",e)}_getHostDir(){return this._owner&&this._owner.$.overlay.getAttribute("dir")}requestContentUpdate(){if(!this.renderer||this.hidden)return;let e={index:this.index,item:this.item,focused:this.focused,selected:this.selected};this.renderer(this,this._owner,e)}__rendererOrItemChanged(e,t,o){o===void 0||t===void 0||(this._oldRenderer!==e&&(this.innerHTML="",delete this._$litPart$,this._oldRenderer=e),e&&this.requestContentUpdate())}__updateLabel(e,t){t||(this.textContent=e)}};var zs=class extends en(v(E(f(g(u))))){static get is(){return"vaadin-multi-select-combo-box-item"}static get styles(){return[We,Jr]}render(){return p`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}};m(zs);var tn=s=>class extends Ke(s){static get manageFocus(){return!1}constructor(){super(),this.requiredVerticalSpace=200}willUpdate(e){super.willUpdate(e),(e.has("opened")||e.has("positionTarget"))&&this.opened&&this.positionTarget&&this._updateOverlayWidth()}_shouldCloseOnOutsideClick(e){let t=e.composedPath();return!t.includes(this.positionTarget)&&!t.includes(this)}_mouseDownListener(e){super._mouseDownListener(e),this._shouldCloseOnOutsideClick(e)&&!ht(e.composedPath()[0])&&e.preventDefault()}_updateOverlayWidth(){this.style.setProperty(`--_${this.localName}-default-width`,`${this.positionTarget.offsetWidth}px`)}};var sn=h`
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
`;var on=[sn,h`
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
  `];var rn=[on,h`
    #overlay {
      width: var(
        --vaadin-multi-select-combo-box-overlay-width,
        var(--_vaadin-multi-select-combo-box-overlay-default-width, auto)
      );
    }
  `];var Fs=class extends tn(Z(E(v(f(g(u)))))){static get is(){return"vaadin-multi-select-combo-box-overlay"}static get styles(){return[Q,rn]}render(){return p`
      <div part="overlay" id="overlay">
        <div part="loader"></div>
        <div part="content" id="content"><slot></slot></div>
      </div>
    `}};m(Fs);var L=class{toString(){return""}};var nn=navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/u),Hl=nn&&nn[1]>=8,an=3,ln={_ratio:.5,_scrollerPaddingTop:0,_scrollPosition:0,_physicalSize:0,_physicalAverage:0,_physicalAverageCount:0,_physicalTop:0,_virtualCount:0,_estScrollHeight:0,_scrollHeight:0,_viewportHeight:0,_viewportWidth:0,_physicalItems:null,_physicalSizes:null,_firstVisibleIndexVal:null,_lastVisibleIndexVal:null,_maxPages:2,_templateCost:0,get _physicalBottom(){return this._physicalTop+this._physicalSize},get _scrollBottom(){return this._scrollPosition+this._viewportHeight},get _virtualEnd(){return this._virtualStart+this._physicalCount-1},get _hiddenContentSize(){return this._physicalSize-this._viewportHeight},get _maxScrollTop(){return this._estScrollHeight-this._viewportHeight+this._scrollOffset},get _maxVirtualStart(){let s=this._virtualCount;return Math.max(0,s-this._physicalCount)},get _virtualStart(){return this._virtualStartVal||0},set _virtualStart(s){s=this._clamp(s,0,this._maxVirtualStart),this._virtualStartVal=s},get _physicalStart(){return this._physicalStartVal||0},set _physicalStart(s){s%=this._physicalCount,s<0&&(s=this._physicalCount+s),this._physicalStartVal=s},get _physicalEnd(){return(this._physicalStart+this._physicalCount-1)%this._physicalCount},get _physicalCount(){return this._physicalCountVal||0},set _physicalCount(s){this._physicalCountVal=s},get _optPhysicalSize(){return this._viewportHeight===0?1/0:this._viewportHeight*this._maxPages},get _isVisible(){return!!(this.offsetWidth||this.offsetHeight)},get firstVisibleIndex(){let s=this._firstVisibleIndexVal;if(s==null){let i=this._physicalTop+this._scrollOffset;s=this._iterateItems((e,t)=>{if(i+=this._getPhysicalSizeIncrement(e),i>this._scrollPosition)return t})||0,this._firstVisibleIndexVal=s}return s},get lastVisibleIndex(){let s=this._lastVisibleIndexVal;if(s==null){let i=this._physicalTop+this._scrollOffset;this._iterateItems((e,t)=>{i<this._scrollBottom&&(s=t),i+=this._getPhysicalSizeIncrement(e)}),this._lastVisibleIndexVal=s}return s},get _scrollOffset(){return this._scrollerPaddingTop+this.scrollOffset},_scrollHandler(){let s=Math.max(0,Math.min(this._maxScrollTop,this._scrollTop)),i=s-this._scrollPosition,e=i>=0;if(this._scrollPosition=s,this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,Math.abs(i)>this._physicalSize&&this._physicalSize>0){i-=this._scrollOffset;let t=Math.round(i/this._physicalAverage);this._virtualStart+=t,this._physicalStart+=t,this._physicalTop=Math.min(Math.floor(this._virtualStart)*this._physicalAverage,this._scrollPosition),this._update()}else if(this._physicalCount>0){let t=this._getReusables(e);e?(this._physicalTop=t.physicalTop,this._virtualStart+=t.indexes.length,this._physicalStart+=t.indexes.length):(this._virtualStart-=t.indexes.length,this._physicalStart-=t.indexes.length),this._update(t.indexes,e?null:t.indexes),this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,0),q)}},_getReusables(s){let i,e,t,o=[],r=this._hiddenContentSize*this._ratio,n=this._virtualStart,a=this._virtualEnd,l=this._physicalCount,d=this._physicalTop+this._scrollOffset,c=this._physicalBottom+this._scrollOffset,_=this._scrollPosition,A=this._scrollBottom;for(s?(i=this._physicalStart,e=_-d):(i=this._physicalEnd,e=c-A);t=this._getPhysicalSizeIncrement(i),e-=t,!(o.length>=l||e<=r);)if(s){if(a+o.length+1>=this._virtualCount||d+t>=_-this._scrollOffset)break;o.push(i),d+=t,i=(i+1)%l}else{if(n-o.length<=0||d+this._physicalSize-t<=A)break;o.push(i),d-=t,i=i===0?l-1:i-1}return{indexes:o,physicalTop:d-this._scrollOffset}},_update(s,i){if(!(s&&s.length===0||this._physicalCount===0)){if(this._assignModels(s),this._updateMetrics(s),i)for(;i.length;){let e=i.pop();this._physicalTop-=this._getPhysicalSizeIncrement(e)}this._positionItems(),this._updateScrollerSize()}},_isClientFull(){return this._scrollBottom!==0&&this._physicalBottom-1>=this._scrollBottom&&this._physicalTop<=this._scrollPosition},_increasePoolIfNeeded(s){let e=this._clamp(this._physicalCount+s,an,this._virtualCount-this._virtualStart)-this._physicalCount,t=Math.round(this._physicalCount*.5);if(!(e<0)){if(e>0){let o=window.performance.now();[].push.apply(this._physicalItems,this._createPool(e));for(let r=0;r<e;r++)this._physicalSizes.push(0);this._physicalCount+=e,this._physicalStart>this._physicalEnd&&this._isIndexRendered(this._focusedVirtualIndex)&&this._getPhysicalIndex(this._focusedVirtualIndex)<this._physicalEnd&&(this._physicalStart+=e),this._update(),this._templateCost=(window.performance.now()-o)/e,t=Math.round(this._physicalCount*.5)}this._virtualEnd>=this._virtualCount-1||t===0||(this._isClientFull()?this._physicalSize<this._optPhysicalSize&&this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,this._clamp(Math.round(50/this._templateCost),1,t)),zt):this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,t),q))}},_render(){if(!(!this.isAttached||!this._isVisible))if(this._physicalCount!==0){let s=this._getReusables(!0);this._physicalTop=s.physicalTop,this._virtualStart+=s.indexes.length,this._physicalStart+=s.indexes.length,this._update(s.indexes),this._update(),this._increasePoolIfNeeded(0)}else this._virtualCount>0&&(this.updateViewportBoundaries(),this._increasePoolIfNeeded(an))},_itemsChanged(s){s.path==="items"&&(this._virtualStart=0,this._physicalTop=0,this._virtualCount=this.items?this.items.length:0,this._physicalIndexForKey={},this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._physicalItems||(this._physicalItems=[]),this._physicalSizes||(this._physicalSizes=[]),this._physicalStart=0,this._scrollTop>this._scrollOffset&&this._resetScrollPosition(0),this._debounce("_render",this._render,Ee))},_iterateItems(s,i){let e,t,o,r;if(arguments.length===2&&i){for(r=0;r<i.length;r++)if(e=i[r],t=this._computeVidx(e),(o=s.call(this,e,t))!=null)return o}else{for(e=this._physicalStart,t=this._virtualStart;e<this._physicalCount;e++,t++)if((o=s.call(this,e,t))!=null)return o;for(e=0;e<this._physicalStart;e++,t++)if((o=s.call(this,e,t))!=null)return o}},_computeVidx(s){return s>=this._physicalStart?this._virtualStart+(s-this._physicalStart):this._virtualStart+(this._physicalCount-this._physicalStart)+s},_positionItems(){this._adjustScrollPosition();let s=this._physicalTop;this._iterateItems(i=>{this.translate3d(0,`${s}px`,0,this._physicalItems[i]),s+=this._physicalSizes[i]})},_getPhysicalSizeIncrement(s){return this._physicalSizes[s]},_adjustScrollPosition(){let s=this._virtualStart===0?this._physicalTop:Math.min(this._scrollPosition+this._physicalTop,0);if(s!==0){this._physicalTop-=s;let i=this._scrollPosition;!Hl&&i>0&&this._resetScrollPosition(i-s)}},_resetScrollPosition(s){this.scrollTarget&&s>=0&&(this._scrollTop=s,this._scrollPosition=this._scrollTop)},_updateScrollerSize(s){let i=this._physicalBottom+Math.max(this._virtualCount-this._physicalCount-this._virtualStart,0)*this._physicalAverage;this._estScrollHeight=i,(s||this._scrollHeight===0||this._scrollPosition>=i-this._physicalSize||Math.abs(i-this._scrollHeight)>=this._viewportHeight)&&(this.$.items.style.height=`${i}px`,this._scrollHeight=i)},scrollToIndex(s){if(typeof s!="number"||s<0||s>this.items.length-1||(Se(),this._physicalCount===0))return;s=this._clamp(s,0,this._virtualCount-1),(!this._isIndexRendered(s)||s>=this._maxVirtualStart)&&(this._virtualStart=s-1),this._assignModels(),this._updateMetrics(),this._physicalTop=this._virtualStart*this._physicalAverage;let i=this._physicalStart,e=this._virtualStart,t=0,o=this._hiddenContentSize;for(;e<s&&t<=o;)t+=this._getPhysicalSizeIncrement(i),i=(i+1)%this._physicalCount,e+=1;this._updateScrollerSize(!0),this._positionItems(),this._resetScrollPosition(this._physicalTop+this._scrollOffset+t),this._increasePoolIfNeeded(0),this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null},_resetAverage(){this._physicalAverage=0,this._physicalAverageCount=0},_resizeHandler(){this._debounce("_render",()=>{this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._isVisible?(this.updateViewportBoundaries(),this.toggleScrollListener(!0),this._resetAverage(),this._render()):this.toggleScrollListener(!1)},Ee)},_isIndexRendered(s){return s>=this._virtualStart&&s<=this._virtualEnd},_getPhysicalIndex(s){return(this._physicalStart+(s-this._virtualStart))%this._physicalCount},_clamp(s,i,e){return Math.min(e,Math.max(i,s))},_debounce(s,i,e){this._debouncers||(this._debouncers={}),this._debouncers[s]=T.debounce(this._debouncers[s],e,i.bind(this)),Ft(this._debouncers[s])}};var Ul=1e5,Ns=1e3,_t=class{constructor({createElements:i,updateElement:e,scrollTarget:t,scrollContainer:o,reorderElements:r,elementsContainer:n,__disableHeightPlaceholder:a}){this.isAttached=!0,this._vidxOffset=0,this.createElements=i,this.updateElement=e,this.scrollTarget=t,this.scrollContainer=o,this.reorderElements=r,this.elementsContainer=n||o,this.__disableHeightPlaceholder=a??!1,this._maxPages=1.3,this.__placeholderHeight=200,this.__elementHeightQueue=Array(10),this.timeouts={SCROLL_REORDER:500,PREVENT_OVERSCROLL:500,FIX_INVALID_ITEM_POSITIONING:100},this.__resizeObserver=new ResizeObserver(()=>this._resizeHandler()),getComputedStyle(this.scrollTarget).overflow==="visible"&&(this.scrollTarget.style.overflow="auto"),getComputedStyle(this.scrollContainer).position==="static"&&(this.scrollContainer.style.position="relative"),this.__resizeObserver.observe(this.scrollTarget),this.scrollTarget.addEventListener("scroll",()=>this._scrollHandler()),new ResizeObserver(([{contentRect:d}])=>{let c=d.width===0&&d.height===0;!c&&this.__scrollTargetHidden&&this.scrollTarget.scrollTop!==this._scrollPosition&&(this.scrollTarget.scrollTop=this._scrollPosition),this.__scrollTargetHidden=c}).observe(this.scrollTarget),this.elementsContainer.addEventListener("focusin",()=>this.__onElementFocused()),this.reorderElements&&(this.scrollTarget.addEventListener("mousedown",d=>{d.target===this.scrollTarget&&(this.__mouseDown=!0)}),this.scrollTarget.addEventListener("mouseup",()=>{this.__mouseDown=!1,this.__pendingReorder&&this.__reorderElements()}))}get scrollOffset(){return 0}get adjustedFirstVisibleIndex(){return this.firstVisibleIndex+this._vidxOffset}get adjustedLastVisibleIndex(){return this.lastVisibleIndex+this._vidxOffset}get _maxVirtualIndexOffset(){return this.size-this._virtualCount}__hasPlaceholders(){return this.__getVisibleElements().some(i=>i.__virtualizerPlaceholder)}scrollToIndex(i){if(typeof i!="number"||isNaN(i)||this.size===0||!this.scrollTarget.offsetHeight)return;delete this.__pendingScrollToIndex,this._physicalCount<=3&&this.flush(),i=this._clamp(i,0,this.size-1);let e=this.__getVisibleElements().length,t=Math.floor(i/this.size*this._virtualCount);this._virtualCount-t<e?(t=this._virtualCount-(this.size-i),this._vidxOffset=this._maxVirtualIndexOffset):t<e?i<Ns?(t=i,this._vidxOffset=0):(t=Ns,this._vidxOffset=i-t):this._vidxOffset=i-t,this.__skipNextVirtualIndexAdjust=!0,super.scrollToIndex(t),this.adjustedFirstVisibleIndex!==i&&this._scrollTop<this._maxScrollTop&&(this._scrollTop-=this.__getIndexScrollOffset(i)||0),this._scrollHandler(),this.__hasPlaceholders()&&(this.__pendingScrollToIndex=i)}flush(){this.scrollTarget.offsetHeight!==0&&(this._resizeHandler(),Se(),this._scrollHandler(),this.__fixInvalidItemPositioningDebouncer&&this.__fixInvalidItemPositioningDebouncer.flush(),this.__scrollReorderDebouncer&&this.__scrollReorderDebouncer.flush())}hostConnected(){this.scrollTarget.offsetParent&&this.scrollTarget.scrollTop!==this._scrollPosition&&(this.scrollTarget.scrollTop=this._scrollPosition)}update(i=0,e=this.size-1){let t=[];this.__getVisibleElements().forEach(o=>{o.__virtualIndex>=i&&o.__virtualIndex<=e&&(this.__updateElement(o,o.__virtualIndex,!0),t.push(o))}),this.__afterElementsUpdated(t)}_updateMetrics(i){Se();let e=0,t=0,o=this._physicalAverageCount,r=this._physicalAverage;this._iterateItems((n,a)=>{t+=this._physicalSizes[n];let l=this._physicalSizes[n];this._physicalSizes[n]=Math.ceil(this.__getBorderBoxHeight(this._physicalItems[n])),this._physicalSizes[n]!==l&&(this.__resizeObserver.unobserve(this._physicalItems[n]),this.__resizeObserver.observe(this._physicalItems[n],{box:"border-box"})),e+=this._physicalSizes[n],this._physicalAverageCount+=this._physicalSizes[n]?1:0},i),this._physicalSize=this._physicalSize+e-t,this._physicalAverageCount!==o&&(this._physicalAverage=Math.round((r*o+e)/this._physicalAverageCount))}__getBorderBoxHeight(i){let e=getComputedStyle(i),t=parseFloat(e.height)||0;if(e.boxSizing==="border-box")return t;let o=parseFloat(e.paddingBottom)||0,r=parseFloat(e.paddingTop)||0,n=parseFloat(e.borderBottomWidth)||0,a=parseFloat(e.borderTopWidth)||0;return t+o+r+n+a}__updateElement(i,e,t){i.__virtualizerPlaceholder&&(i.style.paddingTop="",i.style.opacity="",i.__virtualizerPlaceholder=!1),!this.__preventElementUpdates&&(i.__lastUpdatedIndex!==e||t)&&(this.updateElement(i,e),i.__lastUpdatedIndex=e)}__afterElementsUpdated(i){this.__disableHeightPlaceholder||i.forEach(e=>{let t=e.offsetHeight;if(t===0)e.style.paddingTop=`${this.__placeholderHeight}px`,e.style.opacity="0",e.__virtualizerPlaceholder=!0,this.__placeholderClearDebouncer=T.debounce(this.__placeholderClearDebouncer,Ee,()=>this._resizeHandler());else{this.__elementHeightQueue.push(t),this.__elementHeightQueue.shift();let o=this.__elementHeightQueue.filter(r=>r!==void 0);this.__placeholderHeight=Math.round(o.reduce((r,n)=>r+n,0)/o.length)}}),this.__pendingScrollToIndex!==void 0&&!this.__hasPlaceholders()&&this.scrollToIndex(this.__pendingScrollToIndex)}__getIndexScrollOffset(i){let e=this.__getVisibleElements().find(t=>t.__virtualIndex===i);return e?this.scrollTarget.getBoundingClientRect().top-e.getBoundingClientRect().top:void 0}__restoreScrollOffset(i,e){let t=this.__getIndexScrollOffset(i);e!==void 0&&t!==void 0&&(this._scrollTop+=e-t)}get size(){return this.__size}set size(i){if(i===this.size)return;this.__fixInvalidItemPositioningDebouncer&&this.__fixInvalidItemPositioningDebouncer.cancel(),this._debouncers&&this._debouncers._increasePoolIfNeeded&&this._debouncers._increasePoolIfNeeded.cancel();let e=i>0&&this._scrollTop>0,t,o;e&&(t=this.adjustedFirstVisibleIndex,o=this.__getIndexScrollOffset(t)),this.__size=i,this.__preventElementUpdates=e,this._itemsChanged({path:"items"}),Se(),e&&(t=Math.min(t,i-1),this.scrollToIndex(t),this.__restoreScrollOffset(t,o)),this.__preventElementUpdates=!1,this._isVisible||this._assignModels(),this.elementsContainer.children.length||requestAnimationFrame(()=>this._resizeHandler()),this._updateScrollerSize(!0),this._resizeHandler(),Se(),this._debounce("_update",this._update,q)}get _scrollTop(){return this.scrollTarget.scrollTop}set _scrollTop(i){this.scrollTarget.scrollTop=i}get items(){return{length:Math.min(this.size,Ul)}}get offsetHeight(){return this.scrollTarget.offsetHeight}get $(){return{items:this.scrollContainer}}updateViewportBoundaries(){this._scrollerPaddingTop=parseInt(window.getComputedStyle(this.scrollTarget)["padding-top"],10),this._viewportHeight=this.scrollTarget.offsetHeight}_createPool(i){let e=this.createElements(i),t=document.createDocumentFragment();return e.forEach(o=>{o.style.position="absolute",t.appendChild(o),this.__resizeObserver.observe(o,{box:"border-box"})}),this.elementsContainer.appendChild(t),e}_assignModels(i){let e=[];this._iterateItems((t,o)=>{let r=this._physicalItems[t];r.hidden=o>=this.size,r.hidden?delete r.__lastUpdatedIndex:(r.__virtualIndex=o+(this._vidxOffset||0),this.__updateElement(r,r.__virtualIndex),e.push(r))},i),this.__afterElementsUpdated(e)}_isClientFull(){return setTimeout(()=>{this.__clientFull=!0}),this.__clientFull||super._isClientFull()}translate3d(i,e,t,o){o.style.transform=`translateY(${e})`}toggleScrollListener(){}__getFocusedElement(){return this.__getVisibleElements().find(i=>i.matches(":focus-within"))}__nextFocusableSiblingMissing(i,e){return e.indexOf(i)===e.length-1&&this.size>i.__virtualIndex+1}__previousFocusableSiblingMissing(i,e){return e.indexOf(i)===0&&i.__virtualIndex>0}__onElementFocused(){if(!this.reorderElements)return;let i=this.__getFocusedElement();if(!i)return;let e=this.__getVisibleElements();(this.__previousFocusableSiblingMissing(i,e)||this.__nextFocusableSiblingMissing(i,e))&&this.flush();let t=this.__getVisibleElements();this.__nextFocusableSiblingMissing(i,t)?(this._scrollTop+=Math.ceil(i.getBoundingClientRect().bottom)-Math.floor(this.scrollTarget.getBoundingClientRect().bottom-1),this.flush()):this.__previousFocusableSiblingMissing(i,t)&&(this._scrollTop-=Math.ceil(this.scrollTarget.getBoundingClientRect().top+1)-Math.floor(i.getBoundingClientRect().top),this.flush())}_scrollHandler(){if(this.scrollTarget.offsetHeight===0)return;this._adjustVirtualIndexOffset(this._scrollTop-this._scrollPosition);let i=this._scrollTop-this._scrollPosition;if(super._scrollHandler(),this._physicalCount!==0){let e=i>=0,t=this._getReusables(!e);t.indexes.length&&(this._physicalTop=t.physicalTop,e?(this._virtualStart-=t.indexes.length,this._physicalStart-=t.indexes.length):(this._virtualStart+=t.indexes.length,this._physicalStart+=t.indexes.length),this._resizeHandler())}i&&(this.__fixInvalidItemPositioningDebouncer=T.debounce(this.__fixInvalidItemPositioningDebouncer,de.after(this.timeouts.FIX_INVALID_ITEM_POSITIONING),()=>this.__fixInvalidItemPositioning()),this.__overscrollDebouncer?.isActive()||(this.scrollTarget.style.overscrollBehavior="none"),this.__overscrollDebouncer=T.debounce(this.__overscrollDebouncer,de.after(this.timeouts.PREVENT_OVERSCROLL),()=>{this.scrollTarget.style.overscrollBehavior=null})),this.reorderElements&&(this.__scrollReorderDebouncer=T.debounce(this.__scrollReorderDebouncer,de.after(this.timeouts.SCROLL_REORDER),()=>this.__reorderElements())),this._scrollPosition===0&&this.firstVisibleIndex!==0&&Math.abs(i)>0&&this.scrollToIndex(0)}_resizeHandler(){super._resizeHandler();let i=this.adjustedLastVisibleIndex===this.size-1,e=this._physicalTop-this._scrollPosition;if(i&&e>0){let t=Math.ceil(e/this._physicalAverage);this._virtualStart=Math.max(0,this._virtualStart-t),this._physicalStart=Math.max(0,this._physicalStart-t),super.scrollToIndex(this._virtualCount-1),this.scrollTarget.scrollTop=this.scrollTarget.scrollHeight-this.scrollTarget.clientHeight}}__fixInvalidItemPositioning(){if(!this.scrollTarget.isConnected)return;let i=this._physicalTop>this._scrollTop,e=this._physicalBottom<this._scrollBottom,t=this.adjustedFirstVisibleIndex===0,o=this.adjustedLastVisibleIndex===this.size-1;if(i&&!t||e&&!o){let r=e,n=this._ratio;this._ratio=0,this._scrollPosition=this._scrollTop+(r?-1:1),this._scrollHandler(),this._ratio=n}}_increasePoolIfNeeded(i){if(this._physicalCount>2&&this._physicalAverage>0&&i>0){let t=Math.ceil(this._optPhysicalSize/this._physicalAverage)-this._physicalCount;super._increasePoolIfNeeded(Math.max(i,Math.min(100,t)))}else super._increasePoolIfNeeded(i)}get _optPhysicalSize(){let i=super._optPhysicalSize;return i<=0||this.__hasPlaceholders()?i:i+this.__getItemHeightBuffer()}__getItemHeightBuffer(){if(this._physicalCount===0)return 0;let i=Math.ceil(this._viewportHeight*(this._maxPages-1)/2),e=Math.max(...this._physicalSizes);return e>Math.min(...this._physicalSizes)?Math.max(0,e-i):0}__getVisibleElements(){return Array.from(this.elementsContainer.children).filter(i=>!i.hidden)}__reorderElements(){if(this.__mouseDown){this.__pendingReorder=!0;return}this.__pendingReorder=!1;let i=this._virtualStart+(this._vidxOffset||0),e=this.__getVisibleElements(),t=this.__getFocusedElement()||e[0];if(!t)return;let o=t.__virtualIndex-i,r=e.indexOf(t)-o;if(r>0)for(let n=0;n<r;n++)this.elementsContainer.appendChild(e[n]);else if(r<0)for(let n=e.length+r;n<e.length;n++)this.elementsContainer.insertBefore(e[n],e[0]);if(pr){let{transform:n}=this.scrollTarget.style;this.scrollTarget.style.transform="translateZ(0)",setTimeout(()=>{this.scrollTarget.style.transform=n})}}_adjustVirtualIndexOffset(i){let e=this._maxVirtualIndexOffset;if(this._virtualCount>=this.size)this._vidxOffset=0;else if(this.__skipNextVirtualIndexAdjust)this.__skipNextVirtualIndexAdjust=!1;else if(Math.abs(i)>1e4){let t=this._scrollTop/(this.scrollTarget.scrollHeight-this.scrollTarget.clientHeight);this._vidxOffset=Math.round(t*e)}else{let t=this._vidxOffset,o=Ns,r=100,n,a,l=()=>{n=this.adjustedFirstVisibleIndex,a=this.__getIndexScrollOffset(n)};this._scrollTop===0?t!==0&&(l(),this._vidxOffset=0,super.scrollToIndex(0)):this.firstVisibleIndex<o&&this._vidxOffset>0&&(l(),this._vidxOffset-=Math.min(this._vidxOffset,r),super.scrollToIndex(this.firstVisibleIndex+(t-this._vidxOffset))),this._scrollTop>=this._maxScrollTop&&this._maxScrollTop>0?t!==e&&(l(),this._vidxOffset=e,super.scrollToIndex(this._virtualCount-1)):this.firstVisibleIndex>this._virtualCount-o&&this._vidxOffset<e&&(l(),this._vidxOffset+=Math.min(e-this._vidxOffset,r),super.scrollToIndex(this.firstVisibleIndex-(this._vidxOffset-t))),n!==void 0&&this.__restoreScrollOffset(n,a)}}};Object.setPrototypeOf(_t.prototype,ln);var Oi=class{constructor(i){this.__adapter=new _t(i)}get firstVisibleIndex(){return this.__adapter.adjustedFirstVisibleIndex}get lastVisibleIndex(){return this.__adapter.adjustedLastVisibleIndex}get size(){return this.__adapter.size}set size(i){this.__adapter.size=i}scrollToIndex(i){this.__adapter.scrollToIndex(i)}update(i=0,e=this.size-1){this.__adapter.update(i,e)}flush(){this.__adapter.flush()}hostConnected(){this.__adapter.hostConnected()}};var dn=s=>class extends s{static get properties(){return{items:{type:Array,sync:!0,observer:"__itemsChanged"},focusedIndex:{type:Number,sync:!0,observer:"__focusedIndexChanged"},loading:{type:Boolean,sync:!0,observer:"__loadingChanged"},opened:{type:Boolean,sync:!0,observer:"__openedChanged"},selectedItem:{type:Object,sync:!0,observer:"__selectedItemChanged"},itemClassNameGenerator:{type:Object,observer:"__itemClassNameGeneratorChanged"},owner:{type:Object},getItemLabel:{type:Object},renderer:{type:Object,sync:!0,observer:"__rendererChanged"},theme:{type:String}}}constructor(){super(),this.__boundOnItemClick=this.__onItemClick.bind(this)}get _viewportTotalPaddingBottom(){if(this._cachedViewportTotalPaddingBottom===void 0){let e=window.getComputedStyle(this.$.selector);this._cachedViewportTotalPaddingBottom=[e.paddingBottom,e.borderBottomWidth].map(t=>parseInt(t,10)).reduce((t,o)=>t+o)}return this._cachedViewportTotalPaddingBottom}ready(){super.ready(),this.setAttribute("role","listbox"),this.id=`${this.localName}-${he()}`,this.__hostTagName=this.constructor.is.replace("-scroller",""),this.addEventListener("click",e=>e.stopPropagation()),this.__patchWheelOverScrolling()}requestContentUpdate(){this.__virtualizer&&(this.items&&(this.__virtualizer.size=this.items.length),this.opened&&this.__virtualizer.update())}scrollIntoView(e,t=!1){if(!this.__virtualizer||!(this.opened&&e>=0))return;let o=[...this.children].find(c=>!c.hidden&&c.index===e);if(!t&&o){let c=o.getBoundingClientRect(),_=this.getBoundingClientRect();if(c.top>=_.top&&c.bottom+this._viewportTotalPaddingBottom<=_.bottom)return}let r=e;if(!t){let c=this._visibleItemsCount();e>this.__virtualizer.lastVisibleIndex-1?(this.__virtualizer.scrollToIndex(e),r=e-c+1):e>this.__virtualizer.firstVisibleIndex&&(r=this.__virtualizer.firstVisibleIndex)}this.__virtualizer.scrollToIndex(Math.max(0,r)),this.__virtualizer.flush();let n=[...this.children].find(c=>!c.hidden&&c.index===e);if(!n)return;if(t){n.scrollIntoView({block:"center"});return}let a=n.getBoundingClientRect(),l=this.getBoundingClientRect(),d=a.bottom+this._viewportTotalPaddingBottom;d>l.bottom?this.scrollTop+=d-l.bottom:a.top<l.top&&(this.scrollTop-=l.top-a.top)}_isItemSelected(e,t){return e instanceof L?!1:this.owner._isSameItem(e,t)}__initVirtualizer(){this.__virtualizer=new Oi({createElements:this.__createElements.bind(this),updateElement:this._updateElement.bind(this),elementsContainer:this,scrollTarget:this,scrollContainer:this.$.selector,reorderElements:!0,__disableHeightPlaceholder:!0})}__itemsChanged(e){e&&this.__virtualizer&&this.requestContentUpdate()}__loadingChanged(){this.requestContentUpdate()}__openedChanged(e){if(e){this.__virtualizer||this.__initVirtualizer(),this.requestContentUpdate(),this.focusedIndex>=0&&!this.loading&&this.scrollIntoView(this.focusedIndex);return}let t=this.__virtualizer&&this.__virtualizer.__adapter;t&&t._scrollPosition>0&&(this.scrollTop=0,t._scrollPosition=0)}__selectedItemChanged(){this.requestContentUpdate()}__itemClassNameGeneratorChanged(e,t){(e||t)&&this.requestContentUpdate()}__focusedIndexChanged(e,t){e!==t&&this.requestContentUpdate(),e>=0&&!this.loading&&this.scrollIntoView(e)}__rendererChanged(e,t){(e||t)&&this.requestContentUpdate()}__createElements(e){return[...Array(e)].map(()=>{let t=document.createElement(`${this.__hostTagName}-item`);return t.addEventListener("click",this.__boundOnItemClick),t.tabIndex="-1",t.style.width="100%",t})}_updateElement(e,t){let o=this.items[t],r=this.focusedIndex,n=this._isItemSelected(o,this.selectedItem);e.setProperties({item:o,index:t,label:this.getItemLabel(o),selected:n,renderer:this.renderer,focused:!this.loading&&r===t}),typeof this.itemClassNameGenerator=="function"?e.className=this.itemClassNameGenerator(o):e.className!==""&&(e.className=""),e.id=`${this.__hostTagName}-item-${t}`,e.setAttribute("role",t!==void 0?"option":!1),e.setAttribute("aria-selected",n.toString()),e.setAttribute("aria-posinset",t+1),e.setAttribute("aria-setsize",this.items.length),y(e,"theme",this.theme),o instanceof L&&this.__requestItemByIndex(t)}__onItemClick(e){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{item:e.currentTarget.item}}))}__patchWheelOverScrolling(){this.$.selector.addEventListener("wheel",e=>{let t=this.scrollTop===0,o=this.scrollHeight-this.scrollTop-this.clientHeight<=1;(t&&e.deltaY<0||o&&e.deltaY>0)&&e.preventDefault()})}__requestItemByIndex(e){requestAnimationFrame(()=>{this.dispatchEvent(new CustomEvent("index-requested",{detail:{index:e}}))})}_visibleItemsCount(){return this.__virtualizer.scrollToIndex(this.__virtualizer.firstVisibleIndex),this.__virtualizer.size>0?this.__virtualizer.lastVisibleIndex-this.__virtualizer.firstVisibleIndex+1:0}};var hn=h`
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
`;var cn=hn;var Vs=class extends dn(f(u)){static get is(){return"vaadin-multi-select-combo-box-scroller"}static get styles(){return cn}render(){return p`
      <div id="selector">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("aria-multiselectable","true")}_isItemSelected(i){return i instanceof L||this.owner.readonly?!1:this.owner.selectedItems.some(e=>this.owner._isSameItem(i,e))}_updateElement(i,e){super._updateElement(i,e),i.toggleAttribute("readonly",this.owner.readonly)}};m(Vs);var un=h`
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
`;var J=[Y,un];var pn=h`
  :host([opened]) {
    pointer-events: auto;
  }

  [part~='toggle-button']::before {
    mask-image: var(--_vaadin-icon-chevron-down);
  }

  :host([readonly]) [part~='toggle-button'] {
    display: none;
  }
`;var mn=[pn,h`
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
  `];var Ti=class s{context;items=[];pendingRequests={};#e={};#t;#i=0;#s=0;constructor(i,e,t,o,r){this.context=i,this.pageSize=e,this.size=t,this.parentCache=o,this.parentCacheIndex=r,this.#s=t||0}get parentItem(){return this.parentCache&&this.parentCache.items[this.parentCacheIndex]}get subCaches(){return Object.values(this.#e)}get isLoading(){return Object.keys(this.pendingRequests).length>0?!0:this.subCaches.some(i=>i.isLoading)}get flatSize(){return this.#s}get pageSize(){return this.#t}set pageSize(i){this.#t=i,this.pendingRequests={},this.subCaches.forEach(e=>{e.pageSize=i})}get size(){return this.#i}set size(i){if(this.#i!==i){if(this.#i=i,this.context.placeholder!==void 0){this.items.length=i||0;for(let t=0;t<i;t++)this.items[t]||=this.context.placeholder}this.items.length>i&&(this.items.length=i||0),Object.keys(this.pendingRequests).forEach(t=>{parseInt(t)*this.pageSize>=this.size&&delete this.pendingRequests[t]})}}recalculateFlatSize(){this.#s=!this.parentItem||this.context.isExpanded(this.parentItem)?this.size+this.subCaches.reduce((i,e)=>(e.recalculateFlatSize(),i+e.flatSize),0):0}setPage(i,e){let t=i*this.pageSize;e.forEach((o,r)=>{let n=t+r;(this.size===void 0||n<this.size)&&(this.items[n]=o)})}getSubCache(i){return this.#e[i]}removeSubCache(i){delete this.#e[i]}removeSubCaches(){this.#e={}}createSubCache(i){let e=new s(this.context,this.pageSize,0,this,i);return this.#e[i]=e,e}getFlatIndex(i){let e=Math.max(0,Math.min(this.size-1,i));return this.subCaches.reduce((t,o)=>{let r=o.parentCacheIndex;return e>r?t+o.flatSize:t},e)}};function js(s,i,e=0){let t=i;for(let o of s.subCaches){let r=o.parentCacheIndex;if(t<=r)break;if(t<=r+o.flatSize)return js(o,t-r-1,e+1);t-=o.flatSize}return{cache:s,item:s.items[t],index:t,page:Math.floor(t/s.pageSize),level:e}}function Hs({getItemId:s},i,e,t=0,o=0){for(let r=0;r<i.items.length;r++){let n=i.items[r];if(n&&s(n)===s(e))return{cache:i,level:t,item:n,index:r,page:Math.floor(r/i.pageSize),subCache:i.getSubCache(r),flatIndex:o+i.getFlatIndex(r)}}for(let r of i.subCaches){let n=o+i.getFlatIndex(r.parentCacheIndex),a=Hs({getItemId:s},r,e,t+1,n+1);if(a)return a}}function Us(s,[i,...e],t=0){i===1/0&&(i=s.size-1);let o=s.getFlatIndex(i),r=s.getSubCache(i);return r?.flatSize>0&&e.length?Us(r,e,t+o+1):t+o}var Pi=class extends EventTarget{host;dataProvider;dataProviderParams;isExpanded;getItemId;rootCache;placeholder;isPlaceholder;constructor(i,{size:e,pageSize:t,isExpanded:o,getItemId:r,isPlaceholder:n,placeholder:a,dataProvider:l,dataProviderParams:d}){super(),this.host=i,this.getItemId=r,this.isExpanded=o,this.placeholder=a,this.isPlaceholder=n,this.dataProvider=l,this.dataProviderParams=d,this.rootCache=this.#t(t,e)}get flatSize(){return this.rootCache.flatSize}get pageSize(){return this.rootCache.pageSize}get#e(){return{isExpanded:this.isExpanded,placeholder:this.placeholder}}isLoading(){return this.rootCache.isLoading}setPageSize(i){this.rootCache.pageSize=i}setDataProvider(i){this.dataProvider=i}recalculateFlatSize(){this.rootCache.recalculateFlatSize()}clearCache(){this.rootCache=this.#t(this.rootCache.pageSize,this.rootCache.size)}getFlatIndexContext(i){return js(this.rootCache,i)}getItemContext(i){return Hs({getItemId:this.getItemId},this.rootCache,i)}getFlatIndexByPath(i){return Us(this.rootCache,i)}ensureFlatIndexLoaded(i){let{cache:e,page:t,item:o}=this.getFlatIndexContext(i);this.#s(o)||this.#i(e,t)}ensureFlatIndexHierarchy(i){let{cache:e,item:t,index:o}=this.getFlatIndexContext(i);if(this.#s(t)&&this.isExpanded(t)&&!e.getSubCache(o)){let r=e.createSubCache(o);this.#i(r,0)}}loadFirstPage(){this.#i(this.rootCache,0)}_shouldLoadCachePage(i,e){return!0}#t(i,e){return new Ti(this.#e,i,e)}#i(i,e){if(!this.dataProvider||i.pendingRequests[e]||!this._shouldLoadCachePage(i,e))return;let t={page:e,pageSize:i.pageSize,parentItem:i.parentItem};this.dataProviderParams&&(t={...t,...this.dataProviderParams()});let o=(r,n)=>{i.pendingRequests[e]===o&&(n!==void 0?i.size=n:t.parentItem&&(i.size=r.length),i.setPage(e,r),this.recalculateFlatSize(),this.dispatchEvent(new CustomEvent("page-received")),delete i.pendingRequests[e],this.dispatchEvent(new CustomEvent("page-loaded")))};i.pendingRequests[e]=o,this.dispatchEvent(new CustomEvent("page-requested")),this.dataProvider(t,o)}#s(i){return this.isPlaceholder?!this.isPlaceholder(i):this.placeholder?i!==this.placeholder:!!i}};var fn=s=>class extends s{static get properties(){return{pageSize:{type:Number,value:50,observer:"_pageSizeChanged",sync:!0},size:{type:Number,observer:"_sizeChanged",sync:!0},dataProvider:{type:Object,observer:"_dataProviderChanged",sync:!0}}}static get observers(){return["_dataProviderFilterChanged(filter)","_ensureFirstPage(opened)"]}constructor(){super(),this.__dataProviderInitialized=!1,this.__previousDataProviderFilter,this.__dataProviderController=new Pi(this,{placeholder:new L,isPlaceholder:e=>e instanceof L,dataProviderParams:()=>({filter:this.filter})}),this.__dataProviderController.addEventListener("page-requested",this.__onDataProviderPageRequested.bind(this)),this.__dataProviderController.addEventListener("page-loaded",this.__onDataProviderPageLoaded.bind(this))}ready(){super.ready(),this._scroller.addEventListener("index-requested",e=>{if(!this._shouldFetchData())return;let t=e.detail.index;t!==void 0&&this.__dataProviderController.ensureFlatIndexLoaded(t)}),this.__dataProviderInitialized=!0,this.dataProvider&&this.__synchronizeControllerState()}_dataProviderFilterChanged(e){if(this.__previousDataProviderFilter===void 0&&e===""){this.__previousDataProviderFilter=e;return}this.__previousDataProviderFilter!==e&&(this.__previousDataProviderFilter=e,this.__dataProviderController.rootCache.size=void 0,this.clearCache())}_shouldFetchData(){return this.dataProvider?this.opened||this.filter&&this.filter.length:!1}_ensureFirstPage(e){!this._shouldFetchData()||!e||(this._forceNextRequest||this.size===void 0?(this._forceNextRequest=!1,this.__dataProviderController.loadFirstPage()):this.size>0&&this.__dataProviderController.ensureFlatIndexLoaded(0))}__onDataProviderPageRequested(){this.__synchronizeControllerState()}__onDataProviderPageLoaded(){let{rootCache:e}=this.__dataProviderController;e.items=[...e.items],this.__synchronizeControllerState(),!this.opened&&!this._isInputFocused()&&this._commitValue()}clearCache(){this.dataProvider&&(this.__dataProviderController.clearCache(),this._shouldFetchData()?(this._forceNextRequest=!1,this.__dataProviderController.loadFirstPage()):this._forceNextRequest=!0,this.__synchronizeControllerState())}_sizeChanged(e){let{rootCache:t}=this.__dataProviderController;t.size!==e&&(t.size=e,t.items=[...t.items],this.__synchronizeControllerState())}_filteredItemsChanged(e){if(super._filteredItemsChanged(e),this.dataProvider&&e){let{rootCache:t}=this.__dataProviderController;t.items!==e&&(t.items=e,this.__synchronizeControllerState())}}__synchronizeControllerState(){if(this.__dataProviderInitialized&&this.dataProvider){let{rootCache:e}=this.__dataProviderController;this.setProperties({size:e.size,filteredItems:e.items,loading:this.__dataProviderController.isLoading()})}}_pageSizeChanged(e,t){if(Math.floor(e)!==e||e<1)throw this.pageSize=t,new Error("`pageSize` value must be an integer > 0");this.__dataProviderController.setPageSize(e),this.clearCache()}_dataProviderChanged(e,t){this._ensureItemsOrDataProvider(()=>{this.dataProvider=t}),this.__dataProviderController.setDataProvider(e),this.clearCache()}_ensureItemsOrDataProvider(e){if(this.items!==void 0&&this.dataProvider!==void 0)throw e(),new Error("Using `items` and `dataProvider` together is not supported")}};var _n=s=>class extends s{static get observers(){return["__clearPendingFocusOnFilter(filter)"]}__focusIndex(e){if(!(typeof e!="number"||Number.isNaN(e)||e<0)&&!this.filter){if(!this._overlayOpened||!this._dropdownItems||this._dropdownItems.length===0){this.__pendingFocusIndex=e;return}if(!(e>=this._dropdownItems.length)){if(this._focusedIndex=e,this._scrollIntoView(e,!0),this.loading){this.__pendingFocusIndex=e;return}delete this.__pendingFocusIndex,requestAnimationFrame(()=>{this.isConnected&&this._updateActiveDescendant(e)})}}}__focusPendingIndexIfNeeded(){this.__pendingFocusIndex!==void 0&&!this.loading&&this.__focusIndex(this.__pendingFocusIndex)}__clearPendingFocusOnFilter(){delete this.__pendingFocusIndex}_onOpened(){super._onOpened(),this.__focusPendingIndexIfNeeded()}__onDataProviderPageLoaded(){super.__onDataProviderPageLoaded(),this.__focusPendingIndexIfNeeded()}};var vn=s=>class extends z(fe(D(F(s)))){static get properties(){return{opened:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0,sync:!0,observer:"_openedChanged"},autoOpenDisabled:{type:Boolean,sync:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},_focusedIndex:{type:Number,observer:"_focusedIndexChanged",value:-1,sync:!0},_toggleElement:{type:Object,observer:"_toggleElementChanged"},_dropdownItems:{type:Array,sync:!0},_overlayOpened:{type:Boolean,sync:!0,observer:"_overlayOpenedChanged"}}}constructor(){super(),this._scroller,this._closeOnBlurIsPrevented,this._boundOverlaySelectedItemChanged=this._overlaySelectedItemChanged.bind(this),this._boundOnClearButtonMouseDown=this.__onClearButtonMouseDown.bind(this),this._boundOnClick=this._onClick.bind(this),this._boundOnOverlayTouchAction=this._onOverlayTouchAction.bind(this),this._boundOnOverlayClick=this.__onOverlayClick.bind(this),this._boundOnTouchend=this._onTouchend.bind(this)}get _tagNamePrefix(){return"vaadin-combo-box"}_inputElementChanged(e){super._inputElementChanged(e),e&&(e.autocomplete="off",e.autocapitalize="off",e.setAttribute("role","combobox"),e.setAttribute("aria-autocomplete","list"),e.setAttribute("aria-expanded",!!this.opened),e.setAttribute("spellcheck","false"),e.setAttribute("autocorrect","off"))}firstUpdated(){super.firstUpdated(),this._initScroller()}ready(){super.ready(),this._initOverlay(),this.addEventListener("click",this._boundOnClick),this.addEventListener("touchend",this._boundOnTouchend),this.clearElement&&this.clearElement.addEventListener("mousedown",this._boundOnClearButtonMouseDown)}updated(e){super.updated(e),(e.has("opened")||e.has("_dropdownItems")||e.has("loading"))&&(this._overlayOpened=this.opened&&(!!this.loading||this._hasDropdownItems)),["_overlayOpened","_dropdownItems","_focusedIndex","_theme"].some(t=>e.has(t))&&this._updateScroller(),e.has("_overlayOpened")&&this._overlayOpened&&this._updateActiveDescendant(this._focusedIndex)}disconnectedCallback(){super.disconnectedCallback(),this.close()}open(){!this.disabled&&!this.readonly&&(this.opened=!0)}close(){this.opened=!1}_initOverlay(){let e=this.$.overlay;e.addEventListener("touchend",this._boundOnOverlayTouchAction),e.addEventListener("touchmove",this._boundOnOverlayTouchAction),e.addEventListener("click",this._boundOnOverlayClick,!0),e.addEventListener("mousedown",t=>t.preventDefault()),e.addEventListener("opened-changed",t=>{this._overlayOpened=t.detail.value}),e.addEventListener("vaadin-overlay-closed",()=>{this._scroller.items=[],this._onOverlayClosed()}),this._overlayElement=e}_initScroller(){let e=document.createElement(`${this._tagNamePrefix}-scroller`);e.owner=this,e.getItemLabel=this._getItemLabel.bind(this),e.addEventListener("selection-changed",this._boundOverlaySelectedItemChanged),this._renderScroller(e),this._scroller=e}_renderScroller(e){e.setAttribute("slot","overlay"),e.setAttribute("tabindex","-1"),this.appendChild(e)}_updateScroller(){let e=this._overlayOpened;e&&(this._scroller.style.maxHeight=getComputedStyle(this).getPropertyValue(`--${this._tagNamePrefix}-overlay-max-height`)||"65vh");let t=this.hasAttribute("closing");this._scroller.setProperties({items:e||t?this._dropdownItems:[],opened:e,focusedIndex:this._focusedIndex,theme:this._theme})}get _hasDropdownItems(){return!!(this._dropdownItems&&this._dropdownItems.length)}_overlayOpenedChanged(e,t){e?this._onOpened():t&&this._hasDropdownItems&&this.close()}_focusedIndexChanged(e,t){t!==void 0&&this._updateActiveDescendant(e)}_isInputFocused(){return this.inputElement&&B(this.inputElement)}_updateActiveDescendant(e){let t=this.inputElement;if(!t)return;let o=this._getItemElements().find(r=>r.index===e);y(t,"aria-activedescendant",o?.id)}_openedChanged(e,t){if(t===void 0)return;e?!this._isInputFocused()&&!ae&&this.inputElement&&this.inputElement.focus():(this.__blurOnClick=!1,this.autoselect&&(this.__autoselectPending=!0),this._onClosed());let o=this.inputElement;o&&(o.setAttribute("aria-expanded",!!e),y(o,"aria-controls",e&&this._scroller.id))}_onOverlayTouchAction(e){if(e.type==="touchend"){this.__blurOnClick=!0;return}this.__blurInputKeepOpened()}__onOverlayClick(){this.__blurOnClick&&(this.__blurOnClick=!1,this.__blurInputKeepOpened())}__blurInputKeepOpened(){this._closeOnBlurIsPrevented=!0,this.inputElement.blur(),this._closeOnBlurIsPrevented=!1}_isClearButton(e){return e.composedPath()[0]===this.clearElement}__onClearButtonMouseDown(e){e.preventDefault(),this.inputElement.focus()}_onClearButtonClick(e){e.preventDefault(),this._onClearAction()}_onToggleButtonClick(e){e.preventDefault(),this.opened?this.close():this.open()}_onHostClick(e){this.autoOpenDisabled||(e.preventDefault(),this.open())}_onClick(e){this.autoselect&&this.inputElement&&this.__autoselectPending&&(this.inputElement.selectionStart!==this.inputElement.selectionEnd||this.inputElement.select()),this.__autoselectPending=!1,this._isClearButton(e)?this._onClearButtonClick(e):e.composedPath().includes(this._toggleElement)?this._onToggleButtonClick(e):this._onHostClick(e)}_onTouchend(e){!this.clearElement||e.composedPath()[0]!==this.clearElement||(e.preventDefault(),this._onClearAction())}_onKeyDown(e){super._onKeyDown(e),e.key==="ArrowDown"?(this._onArrowDown(),e.preventDefault()):e.key==="ArrowUp"&&(this._onArrowUp(),e.preventDefault())}_getItemLabel(e){return e?e.toString():""}_isSameItem(e,t){return e===t}_onArrowDown(){if(this.opened){let e=this._dropdownItems;e&&(this._focusedIndex=Math.min(e.length-1,this._focusedIndex+1),this._prefillFocusedItemLabel())}else this.open()}_onArrowUp(){if(this.opened){if(this._focusedIndex>-1)this._focusedIndex=Math.max(0,this._focusedIndex-1);else{let e=this._dropdownItems;e&&(this._focusedIndex=e.length-1)}this._prefillFocusedItemLabel()}else this.open()}_prefillFocusedItemLabel(){if(this._focusedIndex>-1){let e=this._dropdownItems[this._focusedIndex];this._inputElementValue=this._getItemLabel(e),this._markAllSelectionRange()}}_setSelectionRange(e,t){this._isInputFocused()&&this.inputElement.setSelectionRange&&this.inputElement.setSelectionRange(e,t)}_markAllSelectionRange(){this._inputElementValue!==void 0&&this._setSelectionRange(0,this._inputElementValue.length)}_clearSelectionRange(){if(this._inputElementValue!==void 0){let e=this._inputElementValue?this._inputElementValue.length:0;this._setSelectionRange(e,e)}}_closeOrCommit(){this.opened?this.close():this._commitValue()}_onEnter(e){if(!this._hasValidInputValue()){e.preventDefault(),e.stopPropagation();return}this.opened&&(e.preventDefault(),e.stopPropagation()),this._closeOrCommit()}_hasValidInputValue(){return!0}_onEscape(e){this.autoOpenDisabled&&(this.opened||this.value!==this._inputElementValue&&this._inputElementValue.length>0)?(e.stopPropagation(),this._focusedIndex=-1,this._onEscapeCancel()):this.opened?(e.stopPropagation(),this._focusedIndex>-1?(this._focusedIndex=-1,this._revertInputValue()):this._onEscapeCancel()):this.clearButtonVisible&&this.value&&!this.readonly&&(e.stopPropagation(),this._onClearAction())}_onEscapeCancel(){}_toggleElementChanged(e){e&&(e.addEventListener("mousedown",t=>t.preventDefault()),e.addEventListener("click",()=>{ae&&!this._isInputFocused()&&document.activeElement.blur()}))}_onClearAction(){}_onOpened(){}_onClosed(){}_onOverlayClosed(){}_commitValue(){}_revertInputValue(){this._inputElementValue=this.value,this._clearSelectionRange()}_onInput(e){!this.opened&&!this._isClearButton(e)&&!this.autoOpenDisabled&&(this.opened=!0)}_getItemElements(){return Array.from(this._scroller.querySelectorAll(`${this._tagNamePrefix}-item`))}_scrollIntoView(e,t=!1){this._scroller&&this._scroller.scrollIntoView(e,t)}_overlaySelectedItemChanged(e){e.stopPropagation(),!this.hasAttribute("closing")&&(e.detail.item instanceof L||this.opened&&(this._focusedIndex=this._dropdownItems.indexOf(e.detail.item),this.close()))}_setFocused(e){super._setFocused(e),e||(this.__autoselectPending=!1),!e&&!this.readonly&&!this._closeOnBlurIsPrevented&&this._handleFocusOut()}_handleFocusOut(){if(M()){this._closeOrCommit();return}this.opened?this._overlayOpened||this.close():this._commitValue()}_shouldRemoveFocus(e){return e.relatedTarget&&e.relatedTarget.localName===`${this._tagNamePrefix}-item`?!1:e.relatedTarget===this._overlayElement?(e.composedPath()[0].focus(),!1):!0}};function ql(s){return s!=null}function gn(s,i){return s.findIndex(e=>e instanceof L?!1:i(e))}var bn=s=>class extends vn(s){static get properties(){return{items:{type:Array,sync:!0,observer:"_itemsChanged"},filteredItems:{type:Array,observer:"_filteredItemsChanged",sync:!0},filter:{type:String,value:"",notify:!0,sync:!0},itemLabelGenerator:{type:Object},itemLabelPath:{type:String,value:"label",observer:"_itemLabelPathChanged",sync:!0},itemValuePath:{type:String,value:"value",sync:!0},itemIdPath:{type:String,sync:!0},partialMatchMode:{type:String,value:"none"}}}updated(e){super.updated(e),e.has("filter")&&this._filterChanged(this.filter),e.has("itemLabelGenerator")&&this.requestContentUpdate()}requestContentUpdate(){this._scroller&&(this._scroller.requestContentUpdate(),this._getItemElements().forEach(e=>{e.requestContentUpdate()}))}_onClearButtonClick(e){super._onClearButtonClick(e),this.opened&&this.requestContentUpdate()}_onInput(e){let t=this._inputElementValue;this.filter===t?this._filterChanged(this.filter):this.filter=t,!this.opened&&!this._isClearButton(e)&&!this.autoOpenDisabled&&(this.opened=!0)}_onOpened(){super._onOpened(),this.filter&&this._focusedIndex===-1&&(this._focusedIndex=this.__getItemIndexByFilter(this._dropdownItems))}_getItemLabel(e){if(typeof this.itemLabelGenerator=="function"&&e)return this.itemLabelGenerator(e)||"";let t=e&&this.itemLabelPath?Ie(this.itemLabelPath,e):void 0;return t==null&&(t=e?e.toString():""),t}_getItemValue(e){let t=e&&this.itemValuePath?Ie(this.itemValuePath,e):void 0;return t===void 0&&(t=e?e.toString():""),t}_isSameItem(e,t){if(this.itemIdPath&&e&&t){let o=Ie(this.itemIdPath,e);if(o!==void 0)return o===Ie(this.itemIdPath,t)}return super._isSameItem(e,t)}_itemLabelPathChanged(e){typeof e!="string"&&console.error("You should set itemLabelPath to a valid string")}_filterChanged(e){this._scrollIntoView(0),this._focusedIndex=-1,this.items?this.filteredItems=this._filterItems(this.items,e):this._filteredItemsChanged(this.filteredItems)}_itemsChanged(e,t){this._ensureItemsOrDataProvider(()=>{this.items=t}),e?this.filteredItems=e.slice(0):t&&(this.filteredItems=null)}_filteredItemsChanged(e){this._setDropdownItems(e)}_setDropdownItems(e){let t=this._dropdownItems;this._dropdownItems=e;let o=t?t[this._focusedIndex]:null;if(t&&t[this._focusedIndex]instanceof L&&e[this._focusedIndex]instanceof L)return;let r=this.__getItemIndexByValue(e,this._getItemValue(o));r>-1?this._focusedIndex=r:this._focusedIndex=this.__getItemIndexByFilter(e)}_filterItems(e,t){return e&&e.filter(r=>(t=t?t.toString().toLowerCase():"",this._getItemLabel(r).toString().toLowerCase().indexOf(t)>-1))}__getItemIndexByValue(e,t){return!e||!ql(t)?-1:gn(e,o=>this._getItemValue(o)===t)}__getItemIndexByLabel(e,t){return!e||!t?-1:gn(e,o=>this._getItemLabel(o).toString().toLowerCase()===t.toString().toLowerCase())}__getItemIndexByFilter(e){let t=this.__getItemIndexByLabel(e,this.filter);return t>-1?t:!this.opened||!e||e.length===0||!this.filter||this.allowCustomValue?-1:this.partialMatchMode==="first-match"||this.partialMatchMode==="only-match"&&e.length===1?e[0]instanceof L?-1:0:-1}};var yn=s=>class extends fe(z(s)){static get properties(){return{clearButtonVisible:{type:Boolean,reflectToAttribute:!0,value:!1}}}get clearElement(){return console.warn(`Please implement the 'clearElement' property in <${this.localName}>`),null}ready(){super.ready(),this.clearElement&&(this.clearElement.addEventListener("mousedown",e=>this._onClearButtonMouseDown(e)),this.clearElement.addEventListener("click",e=>this._onClearButtonClick(e)))}_onClearButtonClick(e){e.preventDefault(),this._onClearAction()}_onClearButtonMouseDown(e){this._shouldKeepFocusOnClearMousedown()&&e.preventDefault(),ae||this.inputElement.focus()}_onEscape(e){super._onEscape(e),this.clearButtonVisible&&this.value&&!this.readonly&&(e.stopPropagation(),this._onClearAction())}_onClearAction(){this._inputElementValue="",this.inputElement.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.inputElement.dispatchEvent(new Event("change",{bubbles:!0}))}_shouldKeepFocusOnClearMousedown(){return B(this.inputElement)}};var Wl=s=>class extends ze(oi(fe(s))){static get constraints(){return["required"]}static get delegateAttrs(){return[...super.delegateAttrs,"required"]}ready(){super.ready(),this._createConstraintsObserver()}checkValidity(){return this.inputElement&&this._hasValidConstraints(this.constructor.constraints.map(e=>this[e]))?this.inputElement.checkValidity():!this.invalid}_hasValidConstraints(e){return e.some(t=>this.__isValidConstraint(t))}_createConstraintsObserver(){this._createMethodObserver(`_constraintsChanged(stateTarget, ${this.constructor.constraints.join(", ")})`)}_constraintsChanged(e,...t){if(!e)return;let o=this._hasValidConstraints(t),r=this.__previousHasConstraints&&!o;(this._hasValue||this.invalid)&&o?this._requestValidation():r&&!this.manualValidation&&this._setInvalid(!1),this.__previousHasConstraints=o}_onChange(e){e.stopPropagation(),this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{detail:{sourceEvent:e},bubbles:e.bubbles,cancelable:e.cancelable}))}__isValidConstraint(e){return!!e||e===0}},xn=k(Wl);var Li=s=>class extends De(me(xn(X(yn(z(s)))))){static get properties(){return{allowedCharPattern:{type:String,observer:"_allowedCharPatternChanged"},autoselect:{type:Boolean,value:!1},name:{type:String,reflectToAttribute:!0},placeholder:{type:String,reflectToAttribute:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},title:{type:String,reflectToAttribute:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"name","type","placeholder","readonly","invalid","title"]}constructor(){super(),this._boundOnPaste=this._onPaste.bind(this),this._boundOnDrop=this._onDrop.bind(this),this._boundOnBeforeInput=this._onBeforeInput.bind(this)}get slotStyles(){let e=this.localName;return[`
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
        `]}_onFocus(e){super._onFocus(e),this.autoselect&&this.inputElement&&this.inputElement.select()}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("paste",this._boundOnPaste),e.addEventListener("drop",this._boundOnDrop),e.addEventListener("beforeinput",this._boundOnBeforeInput)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("paste",this._boundOnPaste),e.removeEventListener("drop",this._boundOnDrop),e.removeEventListener("beforeinput",this._boundOnBeforeInput)}_onKeyDown(e){super._onKeyDown(e),this.allowedCharPattern&&!this.__shouldAcceptKey(e)&&e.target===this.inputElement&&(e.preventDefault(),this._markInputPrevented())}_markInputPrevented(){this.setAttribute("input-prevented",""),this._preventInputDebouncer=T.debounce(this._preventInputDebouncer,de.after(200),()=>{this.removeAttribute("input-prevented")})}__shouldAcceptKey(e){return e.metaKey||e.ctrlKey||!e.key||e.key.length!==1||this.__allowedCharRegExp.test(e.key)}_onPaste(e){if(this.allowedCharPattern){let t=e.clipboardData.getData("text");this.__allowedTextRegExp.test(t)||(e.preventDefault(),this._markInputPrevented())}}_onDrop(e){if(this.allowedCharPattern){let t=e.dataTransfer.getData("text");this.__allowedTextRegExp.test(t)||(e.preventDefault(),this._markInputPrevented())}}_onBeforeInput(e){this.allowedCharPattern&&e.data&&!this.__allowedTextRegExp.test(e.data)&&(e.preventDefault(),this._markInputPrevented())}_allowedCharPatternChanged(e){if(e)try{this.__allowedCharRegExp=new RegExp(`^${e}$`,"u"),this.__allowedTextRegExp=new RegExp(`^${e}*$`,"u")}catch(t){console.error(t)}}};var Kl={cleared:"Selection cleared",focused:"focused. Press Backspace to remove",selected:"added to selection",deselected:"removed from selection",total:"{count} items selected"},Cn=s=>class extends Ai(_n(fn(bn(Li(Xe(s)))))){static get properties(){return{autoExpandHorizontally:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},autoExpandVertically:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},collapseChips:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},itemClassNameGenerator:{type:Object,sync:!0},keepFilter:{type:Boolean,value:!1},loading:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},selectedItems:{type:Array,value:()=>[],notify:!0,sync:!0},allowCustomValue:{type:Boolean,value:!1},placeholder:{type:String,observer:"_placeholderChanged",reflectToAttribute:!0,sync:!0},renderer:{type:Function,sync:!0},selectedItemsOnTop:{type:Boolean,value:!1,sync:!0},value:{type:String},_overflowItems:{type:Array,value:()=>[],sync:!0},_focusedChipIndex:{type:Number,value:-1,observer:"_focusedChipIndexChanged"},_lastFilter:{type:String,sync:!0},_topGroup:{type:Array,observer:"_topGroupChanged",sync:!0},_inputField:{type:Object}}}static get observers(){return["_selectedItemsChanged(selectedItems)","__updateOverflowChip(_overflow, _overflowItems, disabled, readonly)","__updateTopGroup(selectedItemsOnTop, selectedItems, opened)"]}static get defaultI18n(){return Kl}get i18n(){return super.i18n}set i18n(e){super.i18n=e}get slotStyles(){let e=this.localName;return[...super.slotStyles,`
        ${e}[has-value] input::placeholder {
          color: transparent !important;
          forced-color-adjust: none;
        }
      `]}get clearElement(){return this.$.clearButton}get _chips(){return[...this.querySelectorAll('[slot="chip"]')]}get _hasValue(){return this.selectedItems&&this.selectedItems.length>0}get _tagNamePrefix(){return"vaadin-multi-select-combo-box"}ready(){super.ready(),this.addController(new j(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new N(this.inputElement,this._labelController)),this._tooltipController=new P(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this._tooltipController.setShouldShow(e=>!e.opened),this._toggleElement=this.$.toggleButton,this._inputField=this.shadowRoot.querySelector('[part="input-field"]'),this._overflowController=new S(this,"overflow","vaadin-multi-select-combo-box-chip",{initializer:e=>{e.addEventListener("mousedown",t=>this._preventBlur(t)),this._overflow=e}}),this.addController(this._overflowController)}updated(e){super.updated(e),["loading","itemClassNameGenerator","renderer"].forEach(o=>{e.has(o)&&(this._scroller[o]=this[o])}),e.has("selectedItems")&&this.opened&&this.$.overlay._updateOverlayWidth(),["autoExpandHorizontally","autoExpandVertically","collapseChips","disabled","readonly","clearButtonVisible","itemClassNameGenerator"].some(o=>e.has(o))&&this.__updateChips(),e.has("readonly")&&(this._setDropdownItems(this.filteredItems),this.dataProvider&&this.clearCache())}checkValidity(){return this.required&&!this.readonly?this._hasValue:!0}open(){!this.disabled&&!(this.readonly&&this.selectedItems.length===0)&&(this.opened=!0)}clear(){this.__updateSelection([]),Fe(this.__effectiveI18n.cleared)}__syncTopGroup(){this._topGroup=this.selectedItemsOnTop?[...this.selectedItems]:[]}clearCache(){this.readonly||(super.clearCache(),this.__syncTopGroup())}_itemsChanged(e,t){super._itemsChanged(e,t),this.__syncTopGroup()}_onHostClick(e){let t=e.composedPath();(t.includes(this._labelNode)||t.includes(this._inputField))&&super._onHostClick(e)}_onClearAction(){this.clear()}_onClosed(){this._ignoreCommitValue=!0,(!this.loading||this.allowCustomValue)&&this._commitValue()}_revertInputValue(){this._inputElementValue=this.filter,this._clearSelectionRange()}_commitValue(){this._lastFilter=this.filter,this._ignoreCommitValue?(this._inputElementValue="",this._focusedIndex=-1,this._ignoreCommitValue=!1):this.__commitUserInput(),(!this.keepFilter||!this.opened)&&(this.filter="")}__commitUserInput(){if(this._focusedIndex>-1){let e=this._dropdownItems[this._focusedIndex];if(this._lastFilter&&this._lastFilter===this._inputElementValue&&this._findIndex(e,this.selectedItems)!==-1){this.__clearInternalValue();return}this.__selectItem(e)}else if(this._inputElementValue){let e=[...this._dropdownItems],t=e[this.__getItemIndexByLabel(e,this._inputElementValue)];if(this.allowCustomValue&&!t){let o=this._inputElementValue;this._lastCustomValue=o,this.__clearInternalValue(!0),this.dispatchEvent(new CustomEvent("custom-value-set",{detail:o,composed:!0,bubbles:!0}))}else!this.allowCustomValue&&!this.opened&&t?this.__selectItem(t):this._inputElementValue=""}}_setFocused(e){let t=!e&&!this._closeOnBlurIsPrevented;t&&(this._ignoreCommitValue=!0),super._setFocused(e),t&&document.hasFocus()&&(this._focusedChipIndex=-1,this._requestValidation()),t&&this.readonly&&this.close()}_onResize(){this.__updateChips()}_delegateAttribute(e,t){if(this.stateTarget){if(e==="required"){this._delegateAttribute("aria-required",t?"true":!1);return}super._delegateAttribute(e,t)}}_placeholderChanged(e){let t=this.__tmpA11yPlaceholder;t!==e&&(this.__savedPlaceholder=e,t&&(this.placeholder=t))}_selectedItemsChanged(e){if(this._toggleHasValue(this._hasValue),this._hasValue){let t=this._mergeItemLabels(e);this.__tmpA11yPlaceholder===void 0&&(this.__savedPlaceholder=this.placeholder),this.__tmpA11yPlaceholder=t,this.placeholder=t}else this.__tmpA11yPlaceholder!==void 0&&(delete this.__tmpA11yPlaceholder,this.placeholder=this.__savedPlaceholder);this.__updateChips(),this.requestContentUpdate()}_topGroupChanged(e){e&&this._setDropdownItems(this.filteredItems)}_hasValidInputValue(){let e=this._focusedIndex<0&&this._inputElementValue!=="";return this.allowCustomValue||!e}_shouldFetchData(){return this.readonly?!1:super._shouldFetchData()}_setDropdownItems(e){super._setDropdownItems(this.__generateDropdownItems(e))}__generateDropdownItems(e){if(this.readonly)return this.selectedItems;if(this.filter||!this.selectedItemsOnTop)return e;if(e?.length&&this._topGroup?.length){let t=e.filter(o=>this._findIndex(o,this._topGroup)===-1);return this._topGroup.concat(t)}return e}_mergeItemLabels(e){return e.map(t=>this._getItemLabel(t)).join(", ")}_findIndex(e,t){return t.findIndex(o=>this._isSameItem(e,o))}__clearInternalValue(e=!1){!this.keepFilter||e?(this.filter="",this._inputElementValue=""):this._inputElementValue=this.filter}__announceItem(e,t,o){let r=t?"selected":"deselected",n=this.__effectiveI18n.total.replace("{count}",o||0);Fe(`${e} ${this.__effectiveI18n[r]} ${n}`)}__removeItem(e){let t=[...this.selectedItems];t.splice(this._findIndex(e,t),1),this.__updateSelection(t);let o=this._getItemLabel(e);this.__announceItem(o,!1,t.length)}__selectItem(e){let t=[...this.selectedItems],o=this._findIndex(e,t),r=this._getItemLabel(e),n=!1;if(o!==-1){if(this._lastFilter?.toLowerCase()===r.toLowerCase()){this.__clearInternalValue();return}t.splice(o,1)}else t.push(e),n=!0;this.__updateSelection(t),this.__clearInternalValue(),this.__announceItem(r,n,t.length)}__updateSelection(e){this.selectedItems=e,this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}__updateTopGroup(e,t,o){e?(!o||this.__needToSyncTopGroup())&&(this._topGroup=[...t]):this._topGroup=[]}__needToSyncTopGroup(){return this.itemIdPath?this._topGroup&&this._topGroup.some(e=>{let t=this.selectedItems[this._findIndex(e,this.selectedItems)];return t&&e!==t}):!1}__createChip(e){let t=document.createElement("vaadin-multi-select-combo-box-chip");t.setAttribute("slot","chip"),t.item=e,t.disabled=this.disabled,t.readonly=this.readonly;let o=this._getItemLabel(e);return t.label=o,t.setAttribute("title",o),typeof this.itemClassNameGenerator=="function"&&(t.className=this.itemClassNameGenerator(e)),t.addEventListener("item-removed",r=>this._onItemRemoved(r)),t.addEventListener("mousedown",r=>this._preventBlur(r)),t}__getUsedWidth(e){return parseFloat(getComputedStyle(e).width)}__getWrapperGap(){return parseFloat(getComputedStyle(this._inputField.$.wrapper).columnGap)||0}__getWrapperWidth(){return this.__getUsedWidth(this._inputField.$.wrapper)-this.__getWrapperGap()}__getOverflowWidth(e){let t=this._overflow;t.style.visibility="hidden",t.removeAttribute("hidden"),t.label=`${e}`,t.setAttribute("count",`${e}`);let{marginInlineStart:o,marginInlineEnd:r}=getComputedStyle(t),n=this.__getUsedWidth(t)+parseFloat(o)+parseFloat(r)+this.__getWrapperGap();return t.setAttribute("hidden",""),t.style.visibility="",n}__updateChips(){if(!this._inputField||!this.inputElement)return;if(this._chips.forEach(t=>{t.remove()}),this.selectedItems.length===0){this._overflowItems=[];return}if(this.autoExpandVertically){this.selectedItems.forEach(t=>{this.appendChild(this.__createChip(t))}),this._overflowItems=[];return}let e=parseFloat(getComputedStyle(this.inputElement).flexBasis);this.collapseChips?this._overflowItems=this.__updateChipsCollapsed(this.selectedItems,e):this.autoExpandHorizontally?this._overflowItems=this.__updateChipsHorizontalExpand(this.selectedItems,e):this._overflowItems=this.__updateChipsDefault(this.selectedItems,e)}__renderAllChips(e,t){let o=e.map(n=>{let a=this.__createChip(n);return this.appendChild(a),a}),r=this.__getWrapperWidth()-this.__getUsedWidth(this.$.chips)>=t;return{chips:o,allChipsFit:r}}__updateChipsCollapsed(e,t){let{chips:o,allChipsFit:r}=this.__renderAllChips(e,t);return r?[]:(o.forEach(n=>n.remove()),e.slice())}__updateChipsHorizontalExpand(e,t){let{chips:o,allChipsFit:r}=this.__renderAllChips(e,t);if(r)return[];let n=this.__getWrapperWidth(),a=this.__getOverflowWidth(e.length-1),l=o.length;for(;l>1;){l-=1,o[l].remove();let d=this.__getUsedWidth(this.$.chips);if(n-d>=t+a&&(a=this.__getOverflowWidth(e.length-l),n-d>=t+a))break}if(l===1){let d=parseInt(getComputedStyle(this).getPropertyValue("--_chip-min-width")),c=n-t-a;o[0].style.maxWidth=`${Math.max(d,c)}px`}return e.slice(l)}__updateChipsDefault(e,t){let o=this.__getWrapperWidth()-t,r=parseInt(getComputedStyle(this).getPropertyValue("--_chip-min-width"));for(let n=e.length-1,a=null;n>=0;n--){let l=this.__createChip(e[n]);this.insertBefore(l,a);let d=e.length>1?o-this.__getOverflowWidth(Math.max(n,1)):o;if(this.__getUsedWidth(this.$.chips)>d&&(d<r||a!==null))return l.remove(),e.slice(0,n+1);l.style.maxWidth=`${d}px`,a=l}return[]}__updateOverflowChip(e,t,o,r){if(e){let n=t.length;e.label=`${n}`,e.setAttribute("count",`${n}`),e.setAttribute("title",this._mergeItemLabels(t)),e.toggleAttribute("hidden",n===0),e.disabled=o,e.readonly=r}}_onClearButtonClick(e){e.stopPropagation(),super._onClearButtonClick(e)}_onChange(e){e.stopPropagation()}_onEscape(e){if(this.readonly){e.stopPropagation(),this.opened&&this.close();return}this.clearButtonVisible&&!this.opened&&this.selectedItems&&this.selectedItems.length&&(e.stopPropagation(),this._onClearAction()),super._onEscape(e)}_onEscapeCancel(){this._closeOrCommit()}_onEnter(e){if(this.opened){if(e.preventDefault(),e.stopPropagation(),this.readonly)this.close();else if(this._hasValidInputValue()){let t=this._dropdownItems[this._focusedIndex];this._commitValue(),this._focusedIndex=this._dropdownItems.indexOf(t)}return}super._onEnter(e)}_onArrowDown(){this.readonly?this.opened||this.open():super._onArrowDown()}_onArrowUp(){this.readonly?this.opened||this.open():super._onArrowUp()}_onKeyDown(e){super._onKeyDown(e);let t=this._chips;if(!this.readonly&&t.length>0)switch(e.key){case"Backspace":this._onBackSpace(t);break;case"ArrowLeft":this._onArrowLeft(t,e);break;case"ArrowRight":this._onArrowRight(t,e);break;default:this._focusedChipIndex=-1;break}}_onArrowLeft(e,t){if(this.inputElement.selectionStart!==0)return;let o=this._focusedChipIndex;o!==-1&&t.preventDefault();let r;this.__isRTL?o===e.length-1?r=-1:o>-1&&(r=o+1):o===-1?r=e.length-1:o>0&&(r=o-1),r!==void 0&&(this._focusedChipIndex=r)}_onArrowRight(e,t){if(this.inputElement.selectionStart!==0)return;let o=this._focusedChipIndex;o!==-1&&t.preventDefault();let r;this.__isRTL?o===-1?r=e.length-1:o>0&&(r=o-1):o===e.length-1?r=-1:o>-1&&(r=o+1),r!==void 0&&(this._focusedChipIndex=r)}_onBackSpace(e){if(this.inputElement.selectionStart!==0)return;let t=this._focusedChipIndex;t===-1?this._focusedChipIndex=e.length-1:(this.__removeItem(e[t].item),this._focusedChipIndex=-1)}_focusedChipIndexChanged(e,t){if(e>-1||t>-1){let o=this._chips;if(o.forEach((r,n)=>{r.toggleAttribute("focused",n===e)}),e>-1){let r=o[e].item,n=this._getItemLabel(r);Fe(`${n} ${this.__effectiveI18n.focused}`)}}}_overlaySelectedItemChanged(e){e.stopPropagation(),!this.hasAttribute("closing")&&(this.readonly||e.detail.item instanceof L||this.opened&&(this._lastFilter=this._inputElementValue,this.__selectItem(e.detail.item)))}_onItemRemoved(e){this.__removeItem(e.detail.item)}_preventBlur(e){e.preventDefault()}};var vt=class extends Cn(v(x(f(g(u))))){static get is(){return"vaadin-multi-select-combo-box"}static get styles(){return[J,mn]}render(){return p`
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
          theme="${I(this._theme)}"
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
        theme="${I(this._theme)}"
        .positionTarget="${this._inputField}"
        no-vertical-overlap
      >
        <slot name="overlay"></slot>
      </vaadin-multi-select-combo-box-overlay>
    `}};m(vt);var Gl=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n},wn=class extends vt{};wn=Gl([w("or-vaadin-multi-select-combo-box")],wn);var En=h`
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
`;var Ze=s=>class extends Li(s){static get properties(){return{autocomplete:{type:String},autocorrect:{type:String,reflectToAttribute:!0},autocapitalize:{type:String,reflectToAttribute:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"autocapitalize","autocomplete","autocorrect"]}_inputElementChanged(e,t){super._inputElementChanged(e,t),e&&(e.value&&e.value!==this.value&&(console.warn(`Please define value on the <${this.localName}> component!`),e.value=""),this.value&&(e.value=this.value))}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}_onInput(e){super._onInput(e),this.invalid&&this._requestValidation()}_valueChanged(e,t){super._valueChanged(e,t),t!==void 0&&this.invalid&&this._requestValidation()}};var Sn="NaN",In=s=>class extends Ze(s){static get properties(){return{min:{type:Number},max:{type:Number},step:{type:Number},stepButtonsVisible:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["_stepChanged(step, inputElement)"]}static get delegateProps(){return[...super.delegateProps,"min","max"]}static get constraints(){return[...super.constraints,"min","max","step"]}constructor(){super(),this._setType("number"),this.__onWheel=this.__onWheel.bind(this)}get slotStyles(){let e=this.localName;return[`
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
        `]}get clearElement(){return this.$.clearButton}get __hasUnparsableValue(){return this._inputElementValue===Sn}ready(){super.ready(),this.addController(new j(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new N(this.inputElement,this._labelController)),this._tooltipController=new P(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement)}checkValidity(){return this.inputElement?this.inputElement.checkValidity():!this.invalid}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("wheel",this.__onWheel)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("wheel",this.__onWheel)}__onWheel(e){this.hasAttribute("focused")&&e.preventDefault()}_onDecreaseButtonTouchend(e){e.cancelable&&(e.preventDefault(),this.__blurActiveElement(),this._decreaseValue())}_onIncreaseButtonTouchend(e){e.cancelable&&(e.preventDefault(),this.__blurActiveElement(),this._increaseValue())}__blurActiveElement(){let e=re();e&&e!==this.inputElement&&e.blur()}_onDecreaseButtonClick(){this._decreaseValue()}_onIncreaseButtonClick(){this._increaseValue()}_decreaseValue(){this._incrementValue(-1)}_increaseValue(){this._incrementValue(1)}_incrementValue(e){if(this.disabled||this.readonly)return;let t=this.step||1,o=parseFloat(this.value);this.value?o<this.min?(e=0,o=this.min):o>this.max&&(e=0,o=this.max):this.min===0&&e<0||this.max===0&&e>0||this.max===0&&this.min===0?(e=0,o=0):(this.max==null||this.max>=0)&&(this.min==null||this.min<=0)?o=0:this.min>0?(o=this.min,this.max<0&&e<0&&(o=this.max),e=0):this.max<0&&(o=this.max,e<0?e=0:this._getIncrement(1,o-t)>this.max?o-=2*t:o-=t);let r=this._getIncrement(e,o);(!this.value||e===0||this._incrementIsInsideTheLimits(e,o))&&(this.inputElement.value=String(parseFloat(r)),this.inputElement.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.__commitValueChange())}_getIncrement(e,t){let o=this.step||1,r=this.min||0,n=Math.max(this._getMultiplier(t),this._getMultiplier(o),this._getMultiplier(r));o*=n,t=Math.round(t*n),r*=n;let a=(t-r)%o;return e>0?(t-a+o)/n:e<0?(t-(a||o))/n:t/n}_getDecimalCount(e){let t=String(e),o=t.indexOf(".");return o===-1?1:t.length-o-1}_getMultiplier(e){if(!isNaN(e))return 10**this._getDecimalCount(e)}_incrementIsInsideTheLimits(e,t){return e<0?this.min==null||this._getIncrement(e,t)>=this.min:e>0?this.max==null||this._getIncrement(e,t)<=this.max:this._getIncrement(e,t)<=this.max&&this._getIncrement(e,t)>=this.min}_isButtonEnabled(e){let t=e*(this.step||1),o=parseFloat(this.value);return!this.value||!this.disabled&&this._incrementIsInsideTheLimits(t,o)}_stepChanged(e,t){t&&(t.step=e||"any")}_valueChanged(e,t){e&&isNaN(parseFloat(e))?this.value="":typeof this.value!="string"&&(this.value=String(this.value)),super._valueChanged(this.value,t),this.__keepCommittedValue||(this.__committedValue=this.value,this.__committedUnparsableValueStatus=!1)}_onKeyDown(e){e.key==="ArrowUp"?(e.preventDefault(),this._increaseValue()):e.key==="ArrowDown"&&(e.preventDefault(),this._decreaseValue()),super._onKeyDown(e)}_onInput(e){this.__keepCommittedValue=!0,super._onInput(e),this.__keepCommittedValue=!1}_onChange(e){e.stopPropagation()}_onClearAction(e){super._onClearAction(e),this.__commitValueChange()}_setFocused(e){super._setFocused(e),e||this.__commitValueChange()}_onEnter(e){super._onEnter(e),this.__commitValueChange()}__commitValueChange(){this.__committedValue!==this.value?(this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))):this.__committedUnparsableValueStatus!==this.__hasUnparsableValue&&(this._requestValidation(),this.dispatchEvent(new CustomEvent("unparsable-change"))),this.__committedValue=this.value,this.__committedUnparsableValueStatus=this.__hasUnparsableValue}get _inputElementValue(){return this.inputElement&&this.inputElement.validity.badInput?Sn:super._inputElementValue}set _inputElementValue(e){super._inputElementValue=e}};var gt=class extends In(v(x(f(g(u))))){static get is(){return"vaadin-number-field"}static get styles(){return[J,En]}render(){return p`
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
          theme="${I(this._theme)}"
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
    `}};m(gt);var Yl=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n},An=class extends gt{_onEnter(s){return this.dispatchEvent(new CustomEvent("submit",{bubbles:!0,composed:!0})),super._onEnter(s)}};An=Yl([w("or-vaadin-number-field")],An);var Xl=h`
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
`,kn=[Y,Zt("radio","radio-button"),Xl];var Mn=s=>class extends De(si(Qt(me(pe(s))))){static get properties(){return{name:{type:String,value:""}}}static get delegateAttrs(){return[...super.delegateAttrs,"name"]}constructor(){super(),this._setType("radio"),this.value="on",this.tabindex=0}get slotStyles(){return[`
          ${this.localName} > input[slot='input'] {
            opacity: 0;
          }
        `]}ready(){super.ready(),this.addController(new j(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new N(this.inputElement,this._labelController))}};var Qe=class extends Mn(x(v(f(g(u))))){static get is(){return"vaadin-radio-button"}static get styles(){return kn}render(){return p`
      <div class="vaadin-radio-button-container">
        <div part="radio" aria-hidden="true"></div>
        <slot name="input"></slot>
        <slot name="label"></slot>
      </div>
    `}};m(Qe);var On=[Y,ri,h`
    :host([readonly]) ::slotted(vaadin-radio-button) {
      --vaadin-radio-button-background: transparent;
      --vaadin-radio-button-border-color: var(--vaadin-border-color);
      --_marker-color: var(--vaadin-radio-button-marker-color, var(--vaadin-text-color));
      --_marker-filter: none;
      --_border-style: dashed;
      --_cursor: var(--vaadin-disabled-cursor);
    }
  `];var Tn=s=>class extends X(F(D(z(s)))){static get properties(){return{name:{type:String,observer:"__nameChanged",sync:!0},value:{type:String,notify:!0,value:"",sync:!0,observer:"__valueChanged"},readonly:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0,observer:"__readonlyChanged"},_fieldName:{type:String}}}constructor(){super(),this.__registerRadioButton=this.__registerRadioButton.bind(this),this.__unregisterRadioButton=this.__unregisterRadioButton.bind(this),this.__onRadioButtonCheckedChange=this.__onRadioButtonCheckedChange.bind(this),this._tooltipController=new P(this),this._tooltipController.addEventListener("tooltip-changed",e=>{if(e.detail.node?.isConnected){let o=this.__radioButtons.map(r=>r.inputElement);this._tooltipController.setAriaTarget(o)}else this._tooltipController.setAriaTarget([])})}get __radioButtons(){return this.__filterRadioButtons([...this.children])}get __selectedRadioButton(){return this.__radioButtons.find(e=>e.checked)}get isHorizontalRTL(){return this.__isRTL&&this._theme!=="vertical"}ready(){super.ready(),this.ariaTarget=this,this.setAttribute("role","radiogroup"),this._fieldName=`${this.localName}-${he()}`;let e=this.shadowRoot.querySelector("slot:not([name])");this._observer=new $(e,({addedNodes:t,removedNodes:o})=>{this.__filterRadioButtons(t).reverse().forEach(this.__registerRadioButton),this.__filterRadioButtons(o).forEach(this.__unregisterRadioButton);let r=this.__radioButtons.map(n=>n.inputElement);this._tooltipController.setAriaTarget(r)}),this.addController(this._tooltipController)}updated(e){super.updated(e),e.has("invalid")&&y(this,"aria-invalid",this.invalid)}__filterRadioButtons(e){return e.filter(t=>t instanceof Qe)}_onKeyDown(e){super._onKeyDown(e);let t=e.composedPath().find(o=>o instanceof Qe);["ArrowLeft","ArrowUp"].includes(e.key)&&(e.preventDefault(),this.__selectNextRadioButton(t)),["ArrowRight","ArrowDown"].includes(e.key)&&(e.preventDefault(),this.__selectPrevRadioButton(t))}__nameChanged(e){this.__radioButtons.forEach(t=>{t.name=e||this._fieldName})}__selectNextRadioButton(e){let t=this.__radioButtons.indexOf(e);this.__selectIncRadioButton(t,this.isHorizontalRTL?1:-1)}__selectPrevRadioButton(e){let t=this.__radioButtons.indexOf(e);this.__selectIncRadioButton(t,this.isHorizontalRTL?-1:1)}__selectIncRadioButton(e,t){let o=(this.__radioButtons.length+e+t)%this.__radioButtons.length,r=this.__radioButtons[o];r.disabled?this.__selectIncRadioButton(o,t):(r.focusElement.focus(),r.focusElement.click())}__registerRadioButton(e){e.name=this.name||this._fieldName,e.addEventListener("checked-changed",this.__onRadioButtonCheckedChange),(this.disabled||this.readonly)&&(e.disabled=!0),e.checked&&this.__selectRadioButton(e)}__unregisterRadioButton(e){e.removeEventListener("checked-changed",this.__onRadioButtonCheckedChange),e.value===this.value&&this.__selectRadioButton(null)}__onRadioButtonCheckedChange(e){e.target.checked&&this.__selectRadioButton(e.target)}__valueChanged(e,t){if(!(t===void 0&&e==="")){if(e){let o=this.__radioButtons.find(r=>r.value===e);o?(this.__selectRadioButton(o),this.toggleAttribute("has-value",!0)):console.warn(`The radio button with the value "${e}" was not found.`)}else this.__selectRadioButton(null),this.removeAttribute("has-value");t!==void 0&&this._requestValidation()}}__readonlyChanged(e,t){!e&&t===void 0||t!==e&&this.__updateRadioButtonsDisabledProperty()}_disabledChanged(e,t){super._disabledChanged(e,t),!(!e&&t===void 0)&&t!==e&&this.__updateRadioButtonsDisabledProperty()}_shouldRemoveFocus(e){return!this.contains(e.relatedTarget)}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}__selectRadioButton(e){e?this.value=e.value:this.value="",this.__radioButtons.forEach(t=>{t.checked=t===e}),this.readonly&&this.__updateRadioButtonsDisabledProperty()}__updateRadioButtonsDisabledProperty(){this.__radioButtons.forEach(e=>{this.readonly?e.disabled=e!==this.__selectedRadioButton:e.disabled=this.disabled})}};var bt=class extends Tn(x(v(f(g(u))))){static get is(){return"vaadin-radio-group"}static get styles(){return On}render(){return p`
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
    `}};m(bt);var Zl=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n},Pn=class extends bt{};Pn=Zl([w("or-vaadin-radio-group")],Pn);var qs=class extends Ci(v(E(f(g(u))))){static get is(){return"vaadin-select-item"}static get styles(){return We}static get properties(){return{role:{type:String,value:"option",reflectToAttribute:!0}}}render(){return p`
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}};m(qs);var Ws=class extends Ei(v(E(f(g(u))))){static get is(){return"vaadin-select-list-box"}static get styles(){return Si}static get properties(){return{orientation:{readOnly:!0}}}get _scrollerElement(){return this.shadowRoot.querySelector('[part="items"]')}render(){return p`
      <div part="items">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("role","listbox")}};m(Ws);var Ln=h`
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
`;var $n=s=>class extends Ke(Z(E(s))){willUpdate(e){super.willUpdate(e),(e.has("opened")||e.has("positionTarget"))&&this.opened&&this.positionTarget&&this._updateOverlayWidth()}ready(){super.ready(),this.restoreFocusOnClose=!0}_initFocus(){}get _contentRoot(){return this.owner.__slottedListBox||this._rendererRoot}get _rendererRoot(){if(!this.__savedRoot){let e=document.createElement("div");e.setAttribute("slot","overlay"),this.owner.appendChild(e),this.__savedRoot=e}return this.__savedRoot}_shouldCloseOnOutsideClick(e){return!0}_mouseDownListener(e){super._mouseDownListener(e),e.preventDefault()}_getMenuElement(){let t=this.owner.shadowRoot.querySelector('slot[name="overlay"]').assignedElements();return t.find(o=>o._hasVaadinListMixin)||t.flatMap(o=>[...o.children]).find(o=>o._hasVaadinListMixin)}_updateOverlayWidth(){this.style.setProperty("--_vaadin-select-overlay-default-width",`${this.positionTarget.offsetWidth}px`)}requestContentUpdate(){if(super.requestContentUpdate(),this.owner){let e=this._getMenuElement();this.owner._assignMenuElement(e)}}};var Ks=class extends $n(v(f(g(u)))){static get is(){return"vaadin-select-overlay"}static get styles(){return[Q,Ln]}render(){return p`
      <div id="backdrop" part="backdrop" ?hidden="${!this.withBackdrop}"></div>
      <div part="overlay" id="overlay">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `}updated(i){super.updated(i),i.has("renderer")&&this.requestContentUpdate()}};m(Ks);var Bn=h`
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
`;var Gs=class extends Xt(v(f(g(u)))){static get is(){return"vaadin-select-value-button"}static get styles(){return Bn}render(){return p`
      <div class="vaadin-button-container" role="presentation">
        <span part="label">
          <slot></slot>
        </span>
      </div>
    `}};m(Gs);var Rn=h`
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
`;var $i=class extends S{constructor(i){super(i,"value","vaadin-select-value-button",{initializer:(e,t)=>{t._setFocusElement(e),t.ariaTarget=e,t.stateTarget=e,e.setAttribute("aria-haspopup","listbox")}})}};var Dn=s=>class extends me(ze(z(X(s)))){static get properties(){return{items:{type:Array},opened:{type:Boolean,value:!1,notify:!0,observer:"_openedChanged",reflectToAttribute:!0,sync:!0},renderer:{type:Object},value:{type:String,value:"",notify:!0,observer:"_valueChanged",sync:!0},name:{type:String},placeholder:{type:String},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},noVerticalOverlap:{type:Boolean,value:!1},_phone:Boolean,_phoneMediaQuery:{value:"(max-width: 450px), (max-height: 450px)"},_inputContainer:Object,_items:Object,__slottedListBox:{type:Object,sync:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"invalid"]}static get observers(){return["_updateAriaExpanded(opened, focusElement)","_updateSelectedItem(value, _items, placeholder, focusElement)"]}constructor(){super(),this._itemId=`value-${this.localName}-${he()}`,this._srLabelController=new Ne(this),this._srLabelController.slotName="sr-label"}disconnectedCallback(){super.disconnectedCallback(),this.opened=!1}ready(){super.ready(),this._inputContainer=this.shadowRoot.querySelector('[part~="input-field"]'),this._overlayElement=this.$.overlay,this._valueButtonController=new $i(this),this.addController(this._valueButtonController),this.addController(this._srLabelController),this.addController(new Ge(this._phoneMediaQuery,e=>{this._phone=e})),this._tooltipController=new P(this),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.focusElement),this.addController(this._tooltipController)}updated(e){if(super.updated(e),e.has("_phone")&&this.toggleAttribute("phone",this._phone),(e.has("items")||e.has("renderer")||e.has("__slottedListBox"))&&this.__slottedListBox&&(this.items?.length||this.renderer))throw new Error('A slotted <vaadin-select-list-box> cannot be used together with the "items" or "renderer" property.');if(e.has("items")&&this._overlayElement.requestContentUpdate(),e.has("__slottedListBox")){let t=this.__slottedListBox;t?this._assignMenuElement(t):e.get("__slottedListBox")&&(this._menuElement=null,this._items=null,this.__lastMenuElement=null)}e.has("accessibleName")&&this._srLabelController.setLabel(this.accessibleName),e.has("required")&&this.required===!1&&this._requestValidation()}requestContentUpdate(){this._overlayElement&&this._overlayElement.requestContentUpdate()}__onOverlaySlotChange(e){this.__slottedListBox=e.target.assignedElements().find(t=>t._hasVaadinListMixin)}_assignMenuElement(e){e&&e!==this.__lastMenuElement&&(this._menuElement=e,this.__initMenuItems(e),e.addEventListener("items-changed",()=>{this.__initMenuItems(e)}),e.addEventListener("selected-changed",()=>this.__updateValueButton()),e.addEventListener("keydown",t=>this._onKeyDownInside(t),!0),e.addEventListener("click",t=>{let o=t.composedPath().find(r=>r._hasVaadinItemMixin);this.__dispatchChangePending=o?.value!==void 0&&o.value!==this.value,this.opened=!1},!0),this.__lastMenuElement=e),this._menuElement&&this._menuElement.items&&this._updateSelectedItem(this.value,this._menuElement.items)}__initMenuItems(e){e.items&&(this._items=e.items)}_valueChanged(e,t){this.toggleAttribute("has-value",!!e),t!==void 0&&!this.__dispatchChangePending&&this._requestValidation()}_onClick(e){this.disabled||(e.preventDefault(),this.opened=!this.readonly)}_onEscape(e){this.opened&&(e.stopPropagation(),this.opened=!1)}_onToggleMouseDown(e){e.preventDefault(),this.opened||this.focusElement.focus()}_onKeyDown(e){if(super._onKeyDown(e),!(e.altKey||e.shiftKey||e.ctrlKey||e.metaKey)&&e.target===this.focusElement&&!this.readonly&&!this.disabled&&!this.opened){if(/^(Enter|SpaceBar|\s|ArrowDown|Down|ArrowUp|Up)$/u.test(e.key))e.preventDefault(),this.opened=!0;else if(/[\p{L}\p{Nd}]/u.test(e.key)&&e.key.length===1){let o=this._menuElement.selected??-1,r=this._menuElement._searchKey(o,e.key);r>=0&&(this.__dispatchChangePending=!0,this._updateAriaLive(!0),this._menuElement.selected=r)}}}_onKeyDownInside(e){e.key==="Tab"&&(this.focusElement.setAttribute("tabindex","-1"),this._overlayElement.restoreFocusOnClose=!1,this.opened=!1,setTimeout(()=>{this.focusElement.setAttribute("tabindex","0"),this._overlayElement.restoreFocusOnClose=!0}))}_openedChanged(e,t){if(e){if(this.disabled||this.readonly){this.opened=!1;return}this._updateAriaLive(!1);let o=this.hasAttribute("focus-ring");this._openedWithFocusRing=o,o&&this.removeAttribute("focus-ring")}else t&&(this._openedWithFocusRing&&this.setAttribute("focus-ring",""),!this.__dispatchChangePending&&!this._keyboardActive&&this._requestValidation())}_updateAriaExpanded(e,t){t&&t.setAttribute("aria-expanded",e?"true":"false")}_updateAriaLive(e){this.focusElement&&y(this.focusElement,"aria-live",e&&"polite")}__attachSelectedItem(e){let t,o=e.getAttribute("label");o?t=this.__createItemElement({label:o}):t=e.cloneNode(!0),t._sourceItem=e,this.__appendValueItemElement(t,this.focusElement),t.selected=!0}__createItemElement(e){let t=document.createElement(e.component||"vaadin-select-item");return e.label&&(t.textContent=e.label),e.value&&(t.value=e.value),e.disabled&&(t.disabled=e.disabled),e.className&&(t.className=e.className),t}__appendValueItemElement(e,t){t.appendChild(e),e.removeAttribute("tabindex"),e.removeAttribute("aria-selected"),e.removeAttribute("role"),e.removeAttribute("focused"),e.removeAttribute("focus-ring"),e.removeAttribute("active"),e.setAttribute("id",this._itemId)}__updateValueButton(){let e=this.focusElement;if(!e)return;e.innerHTML="";let t=this._items?this._items[this._menuElement.selected]:void 0;if(e.removeAttribute("placeholder"),this._hasContent(t))this.__attachSelectedItem(t);else if(this.placeholder){let o=this.__createItemElement({label:this.placeholder});this.__appendValueItemElement(o,e),e.setAttribute("placeholder","")}!this._valueChanging&&t&&(this._selectedChanging=!0,this.value=t.value||"",this.__dispatchChangePending&&this.__dispatchChange(),delete this._selectedChanging),this.__updateFieldAriaControllerLabelledBy()}_hasContent(e){if(!e)return!1;let t=!!(e.hasAttribute("label")?e.getAttribute("label"):e.textContent.trim()),o=e.childElementCount>0;return t||o}_updateSelectedItem(e,t,o){if(t){let r=e==null?e:e.toString();this._menuElement.selected=t.reduce((n,a,l)=>n===void 0&&a.value===r?l:n,void 0),this._selectedChanging||(this._valueChanging=!0,this.__updateValueButton(),delete this._valueChanging)}else o&&this.__updateValueButton()}_shouldRemoveFocus(e){return!this.contains(e.relatedTarget)}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}checkValidity(){return!this.required||this.readonly||!!this.value}__defaultRenderer(e,t){if(!this.items||this.items.length===0){e.textContent="";return}let o=e.firstElementChild;o||(o=document.createElement("vaadin-select-list-box"),e.appendChild(o)),o.textContent="",this.items.forEach(r=>{o.appendChild(this.__createItemElement(r))})}__dispatchChange(){this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this.__dispatchChangePending=!1}__updateFieldAriaControllerLabel(){}__updateFieldAriaControllerLabelledBy(){let e;this.accessibleNameRef?e=this.accessibleNameRef:this.accessibleName?e=this._srLabelController.defaultId:this.hasAttribute("has-label")&&(e=this._labelNode?.id);let o=this._items?.[this._menuElement.selected]||this.placeholder?this._itemId:null,r=[e,o].filter(Boolean);r.length>0?this._fieldAriaController.setLabelledBy(r.join(" ")):this._fieldAriaController.setLabelledBy(null)}};var yt=class extends Dn(x(v(f(g(u))))){static get is(){return"vaadin-select"}static get styles(){return[J,Bt,Rn]}render(){return p`
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
          theme="${I(this._theme)}"
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
        theme="${I(this._theme)}"
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
    `}_onOpenedChanged(i){this.opened=i.detail.value}_onOverlayOpen(){this._menuElement&&this._menuElement.focus({focusVisible:M()})}};m(yt);var Ys=class extends qe{addRenderer(){this.element.renderer=(i,e)=>{this.renderRenderer(i,e)}}runRenderer(){this.element.requestContentUpdate()}removeRenderer(){this.element.renderer=null}},Ql=U(Ys);var Jl=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n},zn=class extends yt{};zn=Jl([w("or-vaadin-select")],zn);var Fn=h`
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
`;var Bi=class extends S{constructor(i,e){super(i,"textarea","textarea",{initializer:(t,o)=>{let r=o.getAttribute("value");r&&(t.value=r);let n=o.getAttribute("name");n&&t.setAttribute("name",n),t.id=this.defaultId,typeof e=="function"&&e(t)},useUniqueId:!0})}};var Nn=s=>class extends Xe(Ze(s)){static get properties(){return{maxlength:{type:Number},minlength:{type:Number},pattern:{type:String},minRows:{type:Number,value:2,observer:"__minRowsChanged"},maxRows:{type:Number}}}static get delegateAttrs(){return[...super.delegateAttrs,"maxlength","minlength","pattern"]}static get constraints(){return[...super.constraints,"maxlength","minlength","pattern"]}static get observers(){return["__updateMinHeight(minRows, inputElement)","__updateMaxHeight(maxRows, inputElement, _inputField)"]}get clearElement(){return this.$.clearButton}_onResize(){this._updateHeight(),this.__scrollPositionUpdated()}_onScroll(){this.__scrollPositionUpdated()}ready(){super.ready(),this.__textAreaController=new Bi(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e}),this.addController(this.__textAreaController),this.addController(new N(this.inputElement,this._labelController)),this._inputField=this.shadowRoot.querySelector("[part=input-field]"),this._inputField.addEventListener("wheel",e=>{let t=this._inputField.scrollTop;this._inputField.scrollTop+=e.deltaY,t!==this._inputField.scrollTop&&(e.preventDefault(),this.__scrollPositionUpdated())}),this._updateHeight(),this.__scrollPositionUpdated()}__scrollPositionUpdated(){this._inputField.style.setProperty("--_text-area-vertical-scroll-position","0px"),this._inputField.style.setProperty("--_text-area-vertical-scroll-position",`${this._inputField.scrollTop}px`)}_valueChanged(e,t){super._valueChanged(e,t),this._updateHeight()}_updateHeight(){let e=this.inputElement,t=this._inputField;if(!e||!t)return;let o=t.scrollTop,r=parseFloat(e.style.height),n=this.value?this.value.length:0;if(this._oldValueLength>=n){let l=getComputedStyle(t).height,d=getComputedStyle(e).width;t.style.height=l,e.style.maxWidth=d,e.style.alignSelf="flex-start",e.style.height="auto"}this._oldValueLength=n;let a=e.scrollHeight;Math.abs(a-r)<=1?e.style.height=`${r}px`:a>e.clientHeight&&(e.style.height=`${a}px`),e.style.removeProperty("max-width"),e.style.removeProperty("align-self"),t.style.removeProperty("height"),t.scrollTop=o,this.__updateMaxHeight(this.maxRows)}__updateMinHeight(e){this.inputElement&&this.inputElement===this.__textAreaController.defaultNode&&(this.inputElement.rows=Math.max(e,1))}__updateMaxHeight(e){if(!(!this._inputField||!this.inputElement))if(e){let t=getComputedStyle(this.inputElement),o=getComputedStyle(this._inputField),n=parseFloat(t.lineHeight)*e,a=parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)+parseFloat(t.marginTop)+parseFloat(t.marginBottom)+parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth)+parseFloat(o.paddingTop)+parseFloat(o.paddingBottom),l=Math.ceil(n+a);this._inputField.style.setProperty("max-height",`${l}px`)}else this._inputField.style.removeProperty("max-height")}__minRowsChanged(e){e<1&&console.warn("<vaadin-text-area> minRows must be at least 1.")}scrollToStart(){this._inputField.scrollTop=0}scrollToEnd(){this._inputField.scrollTop=this._inputField.scrollHeight}checkValidity(){if(!super.checkValidity())return!1;if(!this.pattern||!this.inputElement.value)return!0;try{let e=this.inputElement.value.match(this.pattern);return e?e[0]===e.input:!1}catch{return!0}}};var xt=class extends Nn(v(x(f(g(u))))){static get is(){return"vaadin-text-area"}static get styles(){return[J,Fn]}render(){return p`
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
          theme="${I(this._theme)}"
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
    `}ready(){super.ready(),this._tooltipController=new P(this),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}};m(xt);var Vn=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n},Xs=class extends xt{constructor(){super(...arguments),this.manualresize=!1}_onEnter(s){return s.shiftKey||this.dispatchEvent(new CustomEvent("submit",{bubbles:!0,composed:!0})),super._onEnter(s)}_updateHeight(){var s;if(!this.inputElement)return;let i=(s=this.shadowRoot)==null?void 0:s.querySelector('[part~="input-field"]');if(this.manualresize){i&&(i.style.height="auto",i.style.overflowY="hidden"),this.inputElement.style.overflowY="auto",window.matchMedia("(pointer: coarse)").matches?this.inputElement.style.removeProperty("resize"):this.inputElement.style.resize="vertical";return}this.inputElement.style.removeProperty("resize"),this.inputElement.style.removeProperty("overflow-y"),i&&i.style.removeProperty("overflow-y"),super._updateHeight()}updated(s){var i;super.updated(s),s.has("manualresize")&&(this.manualresize&&((i=this.inputElement)==null||i.style.removeProperty("height")),this._updateHeight())}};Vn([tt({type:Boolean})],Xs.prototype,"manualresize",void 0),Xs=Vn([w("or-vaadin-text-area")],Xs);var jn=s=>class extends Ze(s){static get properties(){return{maxlength:{type:Number},minlength:{type:Number},pattern:{type:String},inputMode:{type:String,attribute:"inputmode"}}}static get delegateAttrs(){return[...super.delegateAttrs,"maxlength","minlength","pattern","inputMode"]}static get constraints(){return[...super.constraints,"maxlength","minlength","pattern"]}constructor(){super(),this._setType("text")}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new j(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new N(this.inputElement,this._labelController))}};var Ct=class extends jn(v(x(f(g(u))))){static get is(){return"vaadin-text-field"}static get styles(){return[J]}render(){return p`
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
          theme="${I(this._theme)}"
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
    `}ready(){super.ready(),this._tooltipController=new P(this),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}_renderSuffix(){return p`
      <slot name="suffix" slot="suffix"></slot>
      <div id="clearButton" part="field-button clear-button" slot="suffix" aria-hidden="true"></div>
    `}};m(Ct);var Hn=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n},Zs=class extends Ct{willUpdate(s){super.willUpdate(s),s.has("type")&&this.type!==void 0&&this._setType(this.type)}_onEnter(s){return this.dispatchEvent(new CustomEvent("submit",{bubbles:!0,composed:!0})),super._onEnter(s)}};Hn([tt({type:String})],Zs.prototype,"type",void 0),Zs=Hn([w("or-vaadin-text-field")],Zs);var ed=function(s,i,e,t){var o,r=arguments.length,n=r<3?i:t===null?t=Object.getOwnPropertyDescriptor(i,e):t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,i,e,t);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n};ls("or-vaadin-toggle",h`
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
  `);var Un=class extends K{static get is(){return"or-vaadin-toggle"}_inputElementChanged(s,i){super._inputElementChanged(s,i),s?.setAttribute("role","switch")}};Un=ed([w("or-vaadin-toggle")],Un);var td=h`
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
`,qn=[ui,td];var Wn=h`
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
`;var Kn=s=>class extends s{static get properties(){return{overlayClass:{type:String},_overlayElement:{type:Object}}}static get observers(){return["__updateOverlayClassNames(overlayClass, _overlayElement)"]}__updateOverlayClassNames(e,t){if(!t||e===void 0)return;let{classList:o}=t;if(this.__initialClasses||(this.__initialClasses=new Set(o)),Array.isArray(this.__previousClasses)){let n=this.__previousClasses.filter(a=>!this.__initialClasses.has(a));n.length>0&&o.remove(...n)}let r=typeof e=="string"?e.split(" ").filter(Boolean):[];r.length>0&&o.add(...r),this.__previousClasses=r}};var Gn=s=>class extends s{static get properties(){return{opened:{type:Boolean,value:!1,sync:!0,observer:"_openedChanged"}}}constructor(){super(),this._boundVaadinOverlayClose=this._onVaadinOverlayClose.bind(this),Ve&&(this._boundIosResizeListener=()=>this._detectIosNavbar())}firstUpdated(i){super.firstUpdated(i),this.popover="manual"}bringToFront(){this.matches(":popover-open")&&(this.hidePopover(),this.showPopover())}_openedChanged(i){i?(document.body.appendChild(this),this.showPopover(),document.addEventListener("vaadin-overlay-close",this._boundVaadinOverlayClose),this._boundIosResizeListener&&(this._detectIosNavbar(),window.addEventListener("resize",this._boundIosResizeListener))):(document.body.removeChild(this),this.hidePopover(),document.removeEventListener("vaadin-overlay-close",this._boundVaadinOverlayClose),this._boundIosResizeListener&&window.removeEventListener("resize",this._boundIosResizeListener))}_detectIosNavbar(){let i=window.innerHeight,t=window.innerWidth>i,o=document.documentElement.clientHeight;t&&o>i?this.style.bottom=`${o-i}px`:this.style.bottom="0"}_onVaadinOverlayClose(i){i.detail.sourceEvent?.composedPath().indexOf(this)>=0&&i.preventDefault()}},Yn=s=>class extends G(Kn(s)){static get properties(){return{assertive:{type:Boolean,value:!1,sync:!0},duration:{type:Number,value:5e3,sync:!0},opened:{type:Boolean,value:!1,notify:!0,sync:!0,observer:"_openedChanged"},position:{type:String,value:"bottom-start",observer:"_positionChanged",sync:!0},renderer:{type:Function,sync:!0}}}static get observers(){return["_durationChanged(duration, opened)","_rendererChanged(renderer, opened, _overlayElement)"]}static show(i,e){let t=customElements.get("vaadin-notification");return Or(i)?t._createAndShowNotification(o=>{H(i,o)},e):t._createAndShowNotification(o=>{o.innerText=i},e)}static _createAndShowNotification(i,e){let t=document.createElement("vaadin-notification");return e&&Number.isFinite(e.duration)&&(t.duration=e.duration),e?.position&&(t.position=e.position),e?.assertive&&(t.assertive=e.assertive),e?.theme&&t.setAttribute("theme",e.theme),e?.className&&(t.overlayClass=e.className),t.renderer=i,document.body.appendChild(t),t.opened=!0,t.addEventListener("opened-changed",o=>{o.detail.value||t.remove()}),t}get _container(){let i=customElements.get("vaadin-notification");return i._container||(i._container=document.createElement("vaadin-notification-container"),document.body.appendChild(i._container)),i._container}get _card(){return this._overlayElement}ready(){super.ready(),this._overlayElement=this.shadowRoot.querySelector("vaadin-notification-card")}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected||(this.opened=!1)})}requestContentUpdate(){!this.renderer||!this._card||this.renderer(this._card,this)}__computeAriaLive(i){return i?"assertive":"polite"}_rendererChanged(i,e,t){if(!t)return;let o=this._oldRenderer!==i;this._oldRenderer=i,o&&(t.innerHTML="",delete t._$litPart$),e&&(this._didAnimateNotificationAppend||this._animatedAppendNotificationCard(),this.requestContentUpdate())}open(){this.opened=!0}close(){this.opened=!1}_openedChanged(i){i?(this._container.opened=!0,this._animatedAppendNotificationCard()):this._card&&this._closeNotificationCard()}__cleanUpOpeningClosingState(){this._card.removeAttribute("opening"),this._card.removeAttribute("closing"),this._card.removeEventListener("animationend",this.__animationEndListener)}__shouldAnimateCard(){let i=getComputedStyle(this._card),e=i.getPropertyValue("animation-name"),t=i.getPropertyValue("animation-duration").split(",").some(o=>parseFloat(o)>0);return i.getPropertyValue("display")!=="none"&&e&&e!=="none"&&t}__onCardAnimationEnd(i){this.__animationEndListener=e=>{e.target===this._card&&i()},this._card.addEventListener("animationend",this.__animationEndListener)}_animatedAppendNotificationCard(){this._card?(this.__cleanUpOpeningClosingState(),this._card.setAttribute("opening",""),this._appendNotificationCard(),this.__shouldAnimateCard()?this.__onCardAnimationEnd(()=>this.__cleanUpOpeningClosingState()):this.__cleanUpOpeningClosingState(),this._didAnimateNotificationAppend=!0):this._didAnimateNotificationAppend=!1}_appendNotificationCard(){if(this._card){if(!this._container.shadowRoot.querySelector(`slot[name="${this.position}"]`)){console.warn(`Invalid alignment parameter provided: position=${this.position}`);return}this._container.firstElementChild&&this._container.bringToFront(),this._card.slot=this.position,this._container.firstElementChild&&/top/u.test(this.position)?this._container.insertBefore(this._card,this._container.firstElementChild):this._container.appendChild(this._card)}}_removeNotificationCard(){this._card&&(this._card.parentNode&&this._card.parentNode.removeChild(this._card),this._card.removeAttribute("closing"),this._container.opened=!!this._container.firstElementChild,this.dispatchEvent(new CustomEvent("closed")))}_closeNotificationCard(){this._durationTimeoutId&&clearTimeout(this._durationTimeoutId),this._animatedRemoveNotificationCard()}_animatedRemoveNotificationCard(){this.__cleanUpOpeningClosingState(),this._card.setAttribute("closing",""),this.__shouldAnimateCard()?this.__onCardAnimationEnd(()=>{this._removeNotificationCard(),this.__cleanUpOpeningClosingState()}):this._removeNotificationCard()}_positionChanged(){this.opened&&this._animatedAppendNotificationCard()}_durationChanged(i,e){e&&(clearTimeout(this._durationTimeoutId),i>0&&(this._durationTimeoutId=setTimeout(()=>this.close(),i)))}};var Qs=class extends Gn(v(x(f(g(u))))){static get is(){return"vaadin-notification-container"}static get styles(){return Wn}render(){return p`
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
    `}},Js=class extends v(f(g(u))){static get is(){return"vaadin-notification-card"}static get styles(){return qn}render(){return p`
      <div part="overlay">
        <div part="content">
          <slot></slot>
        </div>
      </div>
    `}ready(){super.ready(),this.setAttribute("role","alert")}},eo=class extends Yn(x(v(f(u)))){static get is(){return"vaadin-notification"}static get styles(){return h`
      :host {
        display: none !important;
      }
    `}render(){return p`
      <vaadin-notification-card
        theme="${I(this._theme)}"
        aria-live="${this.__computeAriaLive(this.assertive)}"
      ></vaadin-notification-card>
    `}};m(Qs);m(Js);m(eo);
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
*/
