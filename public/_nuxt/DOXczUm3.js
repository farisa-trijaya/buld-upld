import l from"./CEVRfAhG.js";import{k as m,H as t,I as o,J as a,W as d,R as g,a0 as p,a6 as u}from"./CzoN8ZlC.js";const _={class:"col-span-11 inline-flex items-center justify-center"},f={class:"text-xs text-gray-50 italic capitalize"},h={key:0,class:"col-span-1 inline-flex items-center justify-end"},C=m({__name:"AlertMessageBox",props:{message:String,theme:{validator(e){return["primary","secondary","success","info","warning","danger","light","dark"].includes(e)},default:"danger"},showClose:{type:Boolean,default:!1}},emits:["closeMessage"],setup(e,{emit:n}){const c=n,s=e;function r(){c("closeMessage")}return(x,y)=>{const i=l;return t(),o("div",{class:u(["grid grid-cols-12 px-2 py-2 mb-3 rounded-md",s.theme==="danger"?"bg-red-600 bg-opacity-50":s.theme==="success"?"bg-green-600":s.theme==="info"?"bg-blue-600":""])},[a("div",_,[a("p",f,d(s.message),1)]),e.showClose?(t(),o("div",h,[g(i,{name:"mi:circle-error",class:"h-5 w-5 text-gray-50 cursor-pointer",onClick:r})])):p("",!0)],2)}}});export{C as _};
//# sourceMappingURL=DOXczUm3.js.map
