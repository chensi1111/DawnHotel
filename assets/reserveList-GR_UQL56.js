import{_,r as v,u as h,d as a,e as i,i as o,F as t,g as f,t as n,p as x,j as y}from"./index-Bj6ZKCGR.js";import{C,a as P,L as k,b,M as I,c as L,O as g,d as S}from"./ocean-2-CONVmRj5.js";const B=c=>(x("data-v-febb1750"),c=c(),y(),c),M=B(()=>o("div",{class:"title"},"房型",-1)),O={class:"container"},$={class:"top"},F=["src"],N={class:"bottom"},R={class:"name"},j={class:"price"},q=["onClick"],w=["onClick"],D={__name:"reserveList",setup(c){const u=v([{pic:C,name:"經典雙人套房",price:"4000",route:"/room/room-classic",id:"classic"},{pic:P,name:"經典四人套房",price:"5600",route:"/room/room-classic",id:"classic2"},{pic:k,name:"豪華雙人套房",price:"6600",route:"/room/room-luxuary",id:"luxuary"},{pic:b,name:"豪華四人套房",price:"12000",route:"/room/room-luxuary",id:"luxuary2"},{pic:I,name:"山景雙人套房",price:"4600",route:"/room/room-mountain",id:"mountain"},{pic:L,name:"山景四人套房",price:"6200",route:"/room/room-mountain",id:"mountain2"},{pic:g,name:"海景雙人套房",price:"5000",route:"/room/room-ocean",id:"ocean"},{pic:S,name:"海景四人套房",price:"6600",route:"/room/room-ocean",id:"ocean2"}]),r=h();function d(e){r.push({path:e.route}),sessionStorage.setItem("id",e.id)}function p(e){r.push({path:"/reserve/calendar",query:e})}return(e,E)=>(a(),i(t,null,[M,o("div",O,[(a(!0),i(t,null,f(u,(s,m)=>(a(),i("div",{class:"room",key:m},[o("div",$,[o("img",{src:s.pic},null,8,F)]),o("div",N,[o("div",R,n(s.name),1),o("div",j,"NT$"+n(s.price)+"起",1),o("div",{class:"info",onClick:l=>d(s)},"詳細資訊",8,q),o("div",{class:"reserve",onClick:l=>p(s)},"立即訂房",8,w)])]))),128))])],64))}},z=_(D,[["__scopeId","data-v-febb1750"]]);export{z as default};