import{_ as F}from"./DOXczUm3.js";import H from"./CEVRfAhG.js";import{_ as J}from"./B5_h2jd3.js";import{_ as O}from"./C2Lm12Wi.js";import{k as W,b as n,I as y,u as t,N as v,a0 as u,J as s,a1 as C,a2 as z,y as M,W as E,a4 as G,R as b,U as I,a3 as K,H as l}from"./CzoN8ZlC.js";import{c as Q,a as N,u as X,b as R}from"./sSTy_hj_.js";import{o as Y,u as Z,n as $}from"./DN7188LG.js";import{u as ee}from"./DO2dREFA.js";import{u as te}from"./BDKvLFNl.js";import{u as se}from"./D1z8ek6k.js";const oe={class:"relative mx-5 py-5 px-4 border border-gray-400 dark:border-gray-700"},re={class:"relative space-y-1 mt-2"},ae={key:0,class:"text-xs text-red-500 italic mt-1 font-semibold"},ne={class:"relative space-y-1 mt-2"},le=["type"],ie={key:0,class:"text-xs text-red-500 italic mt-1 font-semibold"},ue={class:"flex items-center justify-center gap-2 mt-2"},_e=W({__name:"login",setup(me){const w=ee(),m=te(),i=n("password"),d=n(null),f=n(!1),{login:B,getProfile:P}=se(),g=n(null),_=n({}),U=n(!1);Y(()=>{w.disableBottomNav(),w.closeCollapseMenu()}),Z({title:"Login"});const V=Q().shape({email:N().email().required("Email Required"),password:N().required("Password Required").matches(/^(\S+$)/g,"Columns are not allowed to contain spaces")}),{handleSubmit:q}=X({validationSchema:V}),{value:p,errorMessage:k}=R("email"),{value:x,errorMessage:h}=R("password"),S=q(async a=>{const{email:e,password:o}=a;await T(e,o)});async function T(a,e){const{status:o,error:c}=await B(a,e);if(o==="fail"){d.value=c,c.message==="account is not verified"&&(m.setRegisterEmail(a),setTimeout(()=>{$("/auth/verify-registration")},1e3));return}o==="success"&&await L()}async function L(){const{status:a,error:e,data:o}=await P();if(e){console.log("error: ",e),g.value=e;return}a==="success"&&o&&(_.value=o,U.value=o.email_verified,m.setUser(_.value),m.setIsLoggedIn(!0),m.setUpdateCount(),f.value=!0,setTimeout(()=>{$("/")},300))}function j(){i.value==="password"?i.value="text":i.value="password"}return(a,e)=>{const o=F,c=H,A=J,D=O;return l(),y("div",oe,[t(d)?(l(),v(o,{key:0,theme:"danger",message:t(d).message,"show-close":!0,onCloseMessage:e[0]||(e[0]=r=>d.value=null)},null,8,["message"])):u("",!0),t(g)?(l(),v(o,{key:1,theme:"danger",message:t(g).message,"show-close":!0,onCloseMessage:e[1]||(e[1]=r=>g.value=null)},null,8,["message"])):u("",!0),t(f)?(l(),v(o,{key:2,theme:"success",message:"Success Login","show-close":!0,onCloseMessage:e[2]||(e[2]=r=>f.value=!1)})):u("",!0),e[11]||(e[11]=s("h1",{class:"text-xl text-gray-50 font-bold"},"Sign In",-1)),s("form",{onSubmit:e[5]||(e[5]=K((...r)=>t(S)&&t(S)(...r),["prevent"]))},[s("div",re,[e[6]||(e[6]=s("label",{for:"email",class:"text-sm text-gray-50 font-semibold"},"Email Address *",-1)),C(s("input",{type:"text",name:"email","onUpdate:modelValue":e[3]||(e[3]=r=>M(p)?p.value=r:null),class:"inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",required:""},null,512),[[z,t(p)]]),t(k)?(l(),y("div",ae,E(t(k)),1)):u("",!0)]),s("div",ne,[e[7]||(e[7]=s("label",{for:"password",class:"text-sm text-gray-50 font-semibold"},"Password *",-1)),C(s("input",{type:t(i),name:"password","onUpdate:modelValue":e[4]||(e[4]=r=>M(x)?x.value=r:null),class:"inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"},null,8,le),[[G,t(x)]]),b(A,null,{default:I(()=>[b(c,{name:t(i)==="password"?"ic:outline-remove-red-eye":"mdi:eye-off-outline",class:"absolute top-8 right-2 h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-50",onClick:j},null,8,["name"])]),_:1}),t(h)?(l(),y("div",ie,E(t(h)),1)):u("",!0)]),e[8]||(e[8]=s("button",{class:"inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5"}," SIgn In ",-1)),e[9]||(e[9]=s("div",{class:"flex items-center justify-center gap-2 mt-2"},[s("input",{type:"checkbox"}),s("label",{for:"remember",class:"text-sm text-gray-200"},"Remember Me")],-1))],32),s("div",ue,[b(D,{to:"/auth/forgot"},{default:I(()=>e[10]||(e[10]=[s("p",{class:"text-sm font-semibold text-orange-500 hover:underline cursor-pointer"}," Forgot your password? ",-1)])),_:1})])])}}});export{_e as default};
//# sourceMappingURL=BdKTiowi.js.map