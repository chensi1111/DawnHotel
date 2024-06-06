import{_ as R,r as f,u as T,o as V,c as _,d as n,e as l,f as a,w as i,q as z,F as b,g as k,i as e,k as s,v as D,t,h as F,x as M,p as P,j as q}from"./index-Bj6ZKCGR.js";import{o as E,a as H}from"./ocean-2-DkZglmbB.js";const c=r=>(P("data-v-541b5078"),r=r(),q(),r),O={class:"container"},$=c(()=>e("div",{class:"title"},"海景套房",-1)),j=["id"],A={class:"info"},L={class:"left","data-aos":"fade-right","data-aos-duration":"1500"},W=["src"],G={class:"right","data-aos":"fade-left","data-aos-duration":"1500"},J={class:"detail"},K=c(()=>e("div",{class:"block"},"坪數大小",-1)),Q={class:"detail"},U=c(()=>e("div",{class:"block"},"入住人數",-1)),X={class:"detail"},Y=c(()=>e("div",{class:"block"},"床型規格",-1)),Z={class:"detail"},ee=c(()=>e("div",{class:"block"},"入住時間",-1)),oe={class:"detail"},se=c(()=>e("div",{class:"block"},"退房時間",-1)),te={class:"detail"},ce=c(()=>e("div",{class:"block"},"定價",-1)),ae=c(()=>e("br",null,null,-1)),ne={class:"detail"},ie=["onClick"],de={class:"introduce"},le=c(()=>e("div",{class:"facility"},"設施說明",-1)),re={class:"items"},_e={__name:"roomOcean",setup(r){const g=f([{name:"海景雙人套房",id:"ocean",pic:E,size:"10",people:"2人",bed:"一大床",checkin:"15:00後",checkout:"11:00前",price:"5000"},{name:"海景四人套房",id:"ocean2",pic:H,size:"12",people:"4人",bed:"兩大床",checkin:"15:00後",checkout:"11:00前",price:"6600"}]),I=f([{name:"迎賓茶包咖啡包",icon:"CoffeeCup"},{name:"32吋液晶電視",icon:"Monitor"},{name:"電熱水壺、礦泉水",icon:"Mug"},{name:"冰箱",icon:"Refrigerator"},{name:"吹風機",icon:"Tools"},{name:"乾濕分離衛浴設備",icon:"ToiletPaper"},{name:"陽台",icon:"Sunny"},{name:"免費WIFI無線上網",icon:"Iphone"}]),m=T();function y(){m.push({path:"/room"})}function C(d){m.push({path:"/reserve/calendar",query:d})}const S=()=>{const d=sessionStorage.getItem("id");if(d){const u=document.getElementById(d);u&&u.scrollIntoView({behavior:"smooth"}),sessionStorage.removeItem("id")}};return V(()=>{S()}),(d,u)=>{const x=_("House"),v=_("el-icon"),h=_("el-breadcrumb-item"),w=_("el-breadcrumb");return n(),l("div",O,[a(w,{"separator-icon":z(D)},{default:i(()=>[a(h,{to:{path:"/"}},{default:i(()=>[a(v,null,{default:i(()=>[a(x)]),_:1})]),_:1}),a(h,{to:{path:"/room"}},{default:i(()=>[s("房價一覽表")]),_:1}),a(h,null,{default:i(()=>[s("海景套房")]),_:1})]),_:1},8,["separator-icon"]),$,(n(!0),l(b,null,k(g,(o,B)=>(n(),l("div",{class:"room",key:B},[e("div",{class:"type",id:o.id},t(o.name),9,j),e("div",A,[e("div",L,[e("img",{src:o.pic},null,8,W)]),e("div",G,[e("div",J,[K,s(" "+t(o.size),1)]),e("div",Q,[U,s(" "+t(o.people),1)]),e("div",X,[Y,s(" "+t(o.bed),1)]),e("div",Z,[ee,s(" "+t(o.checkin),1)]),e("div",oe,[se,s(" "+t(o.checkout),1)]),e("div",te,[ce,s("NT$ "+t(o.price),1),ae,s("(假日"+t(parseInt(o.price)+1e3)+") ",1)]),e("div",ne,[e("div",{class:"reserve",onClick:p=>C(o)},"立即訂位",8,ie)])])]),e("div",de,[le,e("div",re,[(n(!0),l(b,null,k(I,(p,N)=>(n(),l("div",{class:"item",key:N},[a(v,null,{default:i(()=>[(n(),F(M(p.icon)))]),_:2},1024),s(" "+t(p.name),1)]))),128))])])]))),128)),e("div",{class:"back",onClick:y},"返回列表")])}}},pe=R(_e,[["__scopeId","data-v-541b5078"]]);export{pe as default};