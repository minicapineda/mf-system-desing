import{s as e}from"./iframe-BPWQ6Z6_.js";import{t}from"./react-CsNLYT7o.js";import{t as n}from"./jsx-runtime-DF9OOFLK.js";import{C as r,H as i,S as a,m as o,o as s,q as c,t as l,w as u,y as d}from"./DefaultPropsProvider-YMkGR71Z.js";var f=e(t());function p(e){let t=f.useRef(e);return d(()=>{t.current=e}),f.useRef((...e)=>(0,t.current)(...e)).current}function m(...e){let t=f.useRef(void 0),n=f.useCallback(t=>{let n=e.map(e=>{if(e==null)return null;if(typeof e==`function`){let n=e,r=n(t);return typeof r==`function`?r:()=>{n(null)}}return e.current=t,()=>{e.current=null}});return()=>{n.forEach(e=>e?.())}},e);return f.useMemo(()=>e.every(e=>e==null)?null:e=>{t.current&&=(t.current(),void 0),e!=null&&(t.current=n(e))},e)}var h={};function g(e,t){let n=f.useRef(h);return n.current===h&&(n.current=e(t)),n}var _=[];function v(e){f.useEffect(e,_)}var y=class e{static create(){return new e}currentId=null;start(e,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},e)}clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear};function b(){let e=g(y.create).current;return v(e.disposeEffect),e}function x(e){try{return e.matches(`:focus-visible`)}catch{}return!1}var S=p,C=m;function w(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function T(e,t){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},T(e,t)}function E(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,T(e,t)}var D=f.createContext(null);function O(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function k(e,t){var n=function(e){return t&&(0,f.isValidElement)(e)?t(e):e},r=Object.create(null);return e&&f.Children.map(e,function(e){return e}).forEach(function(e){r[e.key]=n(e)}),r}function A(e,t){e||={},t||={};function n(n){return n in t?t[n]:e[n]}var r=Object.create(null),i=[];for(var a in e)a in t?i.length&&(r[a]=i,i=[]):i.push(a);var o,s={};for(var c in t){if(r[c])for(o=0;o<r[c].length;o++){var l=r[c][o];s[r[c][o]]=n(l)}s[c]=n(c)}for(o=0;o<i.length;o++)s[i[o]]=n(i[o]);return s}function j(e,t,n){return n[t]==null?e.props[t]:n[t]}function ee(e,t){return k(e.children,function(n){return(0,f.cloneElement)(n,{onExited:t.bind(null,n),in:!0,appear:j(n,`appear`,e),enter:j(n,`enter`,e),exit:j(n,`exit`,e)})})}function M(e,t,n){var r=k(e.children),i=A(t,r);return Object.keys(i).forEach(function(a){var o=i[a];if((0,f.isValidElement)(o)){var s=a in t,c=a in r,l=t[a],u=(0,f.isValidElement)(l)&&!l.props.in;c&&(!s||u)?i[a]=(0,f.cloneElement)(o,{onExited:n.bind(null,o),in:!0,exit:j(o,`exit`,e),enter:j(o,`enter`,e)}):!c&&s&&!u?i[a]=(0,f.cloneElement)(o,{in:!1}):c&&s&&(0,f.isValidElement)(l)&&(i[a]=(0,f.cloneElement)(o,{onExited:n.bind(null,o),in:l.props.in,exit:j(o,`exit`,e),enter:j(o,`enter`,e)}))}}),i}var N=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},te={component:`div`,childFactory:function(e){return e}},P=function(e){E(t,e);function t(t,n){var r=e.call(this,t,n)||this;return r.state={contextValue:{isMounting:!0},handleExited:r.handleExited.bind(O(r)),firstRender:!0},r}var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n=t.children,r=t.handleExited;return{children:t.firstRender?ee(e,r):M(e,n,r),firstRender:!1}},n.handleExited=function(e,t){var n=k(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState(function(t){var n=c({},t.children);return delete n[e.key],{children:n}}))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,r=w(e,[`component`,`childFactory`]),i=this.state.contextValue,a=N(this.state.children).map(n);return delete r.appear,delete r.enter,delete r.exit,t===null?f.createElement(D.Provider,{value:i},a):f.createElement(D.Provider,{value:i},f.createElement(t,r,a))},t}(f.Component);P.propTypes={},P.defaultProps=te;var F=class e{static create(){return new e}static use(){let t=g(e.create).current,[n,r]=f.useState(!1);return t.shouldMount=n,t.setShouldMount=r,f.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=I(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}};function ne(){return F.use()}function I(){let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}var L=n();function R(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:o,in:s,onExited:c,timeout:l}=e,[d,p]=f.useState(!1),m=u(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),h={width:o,height:o,top:-(o/2)+a,left:-(o/2)+i},g=u(n.child,d&&n.childLeaving,r&&n.childPulsate);return!s&&!d&&p(!0),f.useEffect(()=>{if(!s&&c!=null){let e=setTimeout(c,l);return()=>{clearTimeout(e)}}},[c,s,l]),(0,L.jsx)(`span`,{className:m,style:h,children:(0,L.jsx)(`span`,{className:g})})}var z=a(`MuiTouchRipple`,[`root`,`ripple`,`rippleVisible`,`ripplePulsate`,`child`,`childLeaving`,`childPulsate`]),B=550,V=i`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,H=i`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,U=i`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,W=s(`span`,{name:`MuiTouchRipple`,slot:`Root`})({overflow:`hidden`,pointerEvents:`none`,position:`absolute`,zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:`inherit`}),G=s(R,{name:`MuiTouchRipple`,slot:`Ripple`})`
  opacity: 0;
  position: absolute;

  &.${z.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${V};
    animation-duration: ${B}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${z.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${z.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${z.childLeaving} {
    opacity: 0;
    animation-name: ${H};
    animation-duration: ${B}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${z.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${U};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,re=f.forwardRef(function(e,t){let{center:n=!1,classes:r={},className:i,...a}=l({props:e,name:`MuiTouchRipple`}),[o,s]=f.useState([]),c=f.useRef(0),d=f.useRef(null);f.useEffect(()=>{d.current&&=(d.current(),null)},[o]);let p=f.useRef(!1),m=b(),h=f.useRef(null),g=f.useRef(null),_=f.useCallback(e=>{let{pulsate:t,rippleX:n,rippleY:i,rippleSize:a,cb:o}=e;s(e=>[...e,(0,L.jsx)(G,{classes:{ripple:u(r.ripple,z.ripple),rippleVisible:u(r.rippleVisible,z.rippleVisible),ripplePulsate:u(r.ripplePulsate,z.ripplePulsate),child:u(r.child,z.child),childLeaving:u(r.childLeaving,z.childLeaving),childPulsate:u(r.childPulsate,z.childPulsate)},timeout:B,pulsate:t,rippleX:n,rippleY:i,rippleSize:a},c.current)]),c.current+=1,d.current=o},[r]),v=f.useCallback((e={},t={},r=()=>{})=>{let{pulsate:i=!1,center:a=n||t.pulsate,fakeElement:o=!1}=t;if(e?.type===`mousedown`&&p.current){p.current=!1;return}e?.type===`touchstart`&&(p.current=!0);let s=o?null:g.current,c=s?s.getBoundingClientRect():{width:0,height:0,left:0,top:0},l,u,d;if(a||e===void 0||e.clientX===0&&e.clientY===0||!e.clientX&&!e.touches)l=Math.round(c.width/2),u=Math.round(c.height/2);else{let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;l=Math.round(t-c.left),u=Math.round(n-c.top)}if(a)d=Math.sqrt((2*c.width**2+c.height**2)/3),d%2==0&&(d+=1);else{let e=Math.max(Math.abs((s?s.clientWidth:0)-l),l)*2+2,t=Math.max(Math.abs((s?s.clientHeight:0)-u),u)*2+2;d=Math.sqrt(e**2+t**2)}e?.touches?h.current===null&&(h.current=()=>{_({pulsate:i,rippleX:l,rippleY:u,rippleSize:d,cb:r})},m.start(80,()=>{h.current&&=(h.current(),null)})):_({pulsate:i,rippleX:l,rippleY:u,rippleSize:d,cb:r})},[n,_,m]),y=f.useCallback(()=>{v({},{pulsate:!0})},[v]),x=f.useCallback((e,t)=>{if(m.clear(),e?.type===`touchend`&&h.current){h.current(),h.current=null,m.start(0,()=>{x(e,t)});return}h.current=null,s(e=>e.length>0?e.slice(1):e),d.current=t},[m]);return f.useImperativeHandle(t,()=>({pulsate:y,start:v,stop:x}),[y,v,x]),(0,L.jsx)(W,{className:u(z.root,r.root,i),ref:g,...a,children:(0,L.jsx)(P,{component:null,exit:!0,children:o})})});function K(e){return r(`MuiButtonBase`,e)}var q=a(`MuiButtonBase`,[`root`,`disabled`,`focusVisible`]),ie=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:i}=e,a=o({root:[`root`,t&&`disabled`,n&&`focusVisible`]},K,i);return n&&r&&(a.root+=` ${r}`),a},ae=s(`button`,{name:`MuiButtonBase`,slot:`Root`,overridesResolver:(e,t)=>t.root})({display:`inline-flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,boxSizing:`border-box`,WebkitTapHighlightColor:`transparent`,backgroundColor:`transparent`,outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:`pointer`,userSelect:`none`,verticalAlign:`middle`,MozAppearance:`none`,WebkitAppearance:`none`,textDecoration:`none`,color:`inherit`,"&::-moz-focus-inner":{borderStyle:`none`},[`&.${q.disabled}`]:{pointerEvents:`none`,cursor:`default`},"@media print":{colorAdjust:`exact`}}),J=f.forwardRef(function(e,t){let n=l({props:e,name:`MuiButtonBase`}),{action:r,centerRipple:i=!1,children:a,className:o,component:s=`button`,disabled:c=!1,disableRipple:d=!1,disableTouchRipple:p=!1,focusRipple:m=!1,focusVisibleClassName:h,LinkComponent:g=`a`,onBlur:_,onClick:v,onContextMenu:y,onDragLeave:b,onFocus:w,onFocusVisible:T,onKeyDown:E,onKeyUp:D,onMouseDown:O,onMouseLeave:k,onMouseUp:A,onTouchEnd:j,onTouchMove:ee,onTouchStart:M,tabIndex:N=0,TouchRippleProps:te,touchRippleRef:P,type:F,...I}=n,R=f.useRef(null),z=ne(),B=C(z.ref,P),[V,H]=f.useState(!1);c&&V&&H(!1),f.useImperativeHandle(r,()=>({focusVisible:()=>{H(!0),R.current.focus()}}),[]);let U=z.shouldMount&&!d&&!c;f.useEffect(()=>{V&&m&&!d&&z.pulsate()},[d,m,V,z]);let W=Y(z,`start`,O,p),G=Y(z,`stop`,y,p),K=Y(z,`stop`,b,p),q=Y(z,`stop`,A,p),J=Y(z,`stop`,e=>{V&&e.preventDefault(),k&&k(e)},p),X=Y(z,`start`,M,p),oe=Y(z,`stop`,j,p),se=Y(z,`stop`,ee,p),ce=Y(z,`stop`,e=>{x(e.target)||H(!1),_&&_(e)},!1),le=S(e=>{R.current||=e.currentTarget,x(e.target)&&(H(!0),T&&T(e)),w&&w(e)}),Z=()=>{let e=R.current;return s&&s!==`button`&&!(e.tagName===`A`&&e.href)},ue=S(e=>{m&&!e.repeat&&V&&e.key===` `&&z.stop(e,()=>{z.start(e)}),e.target===e.currentTarget&&Z()&&e.key===` `&&e.preventDefault(),E&&E(e),e.target===e.currentTarget&&Z()&&e.key===`Enter`&&!c&&(e.preventDefault(),v&&v(e))}),de=S(e=>{m&&e.key===` `&&V&&!e.defaultPrevented&&z.stop(e,()=>{z.pulsate(e)}),D&&D(e),v&&e.target===e.currentTarget&&Z()&&e.key===` `&&!e.defaultPrevented&&v(e)}),Q=s;Q===`button`&&(I.href||I.to)&&(Q=g);let $={};Q===`button`?($.type=F===void 0?`button`:F,$.disabled=c):(!I.href&&!I.to&&($.role=`button`),c&&($[`aria-disabled`]=c));let fe=C(t,R),pe={...n,centerRipple:i,component:s,disabled:c,disableRipple:d,disableTouchRipple:p,focusRipple:m,tabIndex:N,focusVisible:V},me=ie(pe);return(0,L.jsxs)(ae,{as:Q,className:u(me.root,o),ownerState:pe,onBlur:ce,onClick:v,onContextMenu:G,onFocus:le,onKeyDown:ue,onKeyUp:de,onMouseDown:W,onMouseLeave:J,onMouseUp:q,onDragLeave:K,onTouchEnd:oe,onTouchMove:se,onTouchStart:X,ref:fe,tabIndex:c?-1:N,type:F,...$,...I,children:[a,U?(0,L.jsx)(re,{ref:B,center:i,...te}):null]})});function Y(e,t,n,r=!1){return S(i=>(n&&n(i),r||e[t](i),!0))}function X(e){return typeof e.main==`string`}function oe(e,t=[]){if(!X(e))return!1;for(let n of t)if(!e.hasOwnProperty(n)||typeof e[n]!=`string`)return!1;return!0}function se(e=[]){return([,t])=>t&&oe(t,e)}export{w as a,m as c,E as i,p as l,J as n,C as o,D as r,b as s,se as t};