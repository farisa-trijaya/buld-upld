import{_ as m}from"./C2Lm12Wi.js";import{a as y,u as x}from"./DN7188LG.js";import{k as c,b as f,I as i,J as t,W as g,u as o,V as r,R as b,U as v,a0 as _,H as d}from"./CzoN8ZlC.js";const C={class:"relative mx-5 py-5 px-4 border border-gray-400 dark:border-gray-700"},k={class:"text-gray-100 mt-2"},w={key:0,class:"absolute top-0 bg-gray-700 py-1.5 px-3 rounded-md shadow-lg shadow-gray-600"},T=c({__name:"verify-reset-success",setup(V){const l=y();x({title:"Verify Reset Successfully "});const s=f(!1),a=l.fullPath.split("/auth/verify-reset-success?pass=")[1];async function u(n){try{await navigator.clipboard.writeText(n),s.value=!0,setTimeout(()=>{s.value=!1},2e3)}catch(e){alert(`${e}`)}}return(n,e)=>{const p=m;return d(),i("div",C,[e[5]||(e[5]=t("h3",{class:"text-lg text-gray-100 mb-2"},"Your temporary password is",-1)),t("code",{class:"text-xl text-gray-400 font-semibold cursor-pointer border border-gray-400 rounded-sm px-2 py-1",onClick:e[0]||(e[0]=N=>u(o(a)))},g(o(a)),1),t("h3",k,[e[2]||(e[2]=r(" Copy it, ")),b(p,{to:"/auth/login",class:"text-orange-600 font-semibold hover:underline"},{default:v(()=>e[1]||(e[1]=[r("log in")])),_:1}),e[3]||(e[3]=r(", and change it. "))]),o(s)?(d(),i("div",w,e[4]||(e[4]=[t("p",{class:"text-xs text-gray-50"},"Code Copied",-1)]))):_("",!0)])}}});export{T as default};
//# sourceMappingURL=DaVecfs2.js.map