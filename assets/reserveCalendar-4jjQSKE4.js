import{_ as te,a as u,m as ae,r as oe,y as K,z as l,A as se,o as le,B as ne,u as re,c as w,d as m,e as y,i as r,f as v,w as f,C as ue,D as ce,G as de,H as ie,E as Y,F as P,g as U,h as ve,k as j,t as R,n as me,s as L,I as fe,p as pe,j as ye,J as De,K as _e}from"./index-Bj6ZKCGR.js";const h=C=>(pe("data-v-3d18f6a2"),C=C(),ye(),C),ke={class:"container"},be={class:"room"},Ye=h(()=>r("div",{class:"block"},"房型",-1)),he={class:"day"},Ce=h(()=>r("div",{class:"block"},"入住天數",-1)),ge={class:"day"},Me=h(()=>r("div",{class:"block"},"訂購間數",-1)),xe=h(()=>r("div",{class:"info"},"選擇您的入住日期(開放訂購半年內的房間)",-1)),Ve=["onClick"],we={key:0,class:"price"},Re=h(()=>r("div",{class:"rwd"},"餘",-1)),Be={__name:"reserveCalendar",setup(C){const B=u(),z=t=>{B.value&&B.value.selectDate(t)},D=u(""),N=ae(),_=u(N.query.name),k=u(parseInt(N.query.price)),W=oe([{value:"經典雙人套房"},{value:"經典四人套房"},{value:"豪華雙人套房"},{value:"豪華四人套房"},{value:"山景雙人套房"},{value:"山景四人套房"},{value:"海景雙人套房"},{value:"海景四人套房"}]),G=t=>{switch(t){case"經典雙人套房":return 4e3;case"經典四人套房":return 5600;case"豪華雙人套房":return 6600;case"豪華四人套房":return 12e3;case"山景雙人套房":return 4600;case"山景四人套房":return 6200;case"海景雙人套房":return 5e3;case"海景四人套房":return 6600}};K(_,(t,a)=>{t!==a&&(k.value=G(t),Q())});const S=t=>l(t).format("YYYY/MM/DD"),p=t=>l(t).format("YYYY-MM-DD"),b=u(l()),g=u(S(b.value)),$=u(""),q=u(p(b.value)),E=u("");K(b,t=>{g.value=S(t),q.value=p(t),F(t)}),se(()=>{const t=l(g.value).add(D.value,"day");$.value=S(t),E.value=p(t)});const H={經典雙人套房:"classicDoubleRoomCounts",經典四人套房:"classicQuadrupleRoomCounts",豪華雙人套房:"luxuryDoubleRoomCounts",豪華四人套房:"luxuryQuadrupleRoomCounts",山景雙人套房:"mountainDoubleRoomCounts",山景四人套房:"mountainQuadrupleRoomCounts",海景雙人套房:"oceanDoubleRoomCounts",海景四人套房:"oceanQuadrupleRoomCounts"},Q=async()=>{const t=H[_.value],a=ue(De,"counts",t),s=await ce(a),n=new Date,d=p(n);if(s.exists()){const c=s.data(),e={},o={};for(const i in c)i>=d?e[i]=c[i]:o[i]=_e();const V=Object.keys(e).length;for(let i=0;i<180-V;i++){const ee=l(n).add(V+i,"day").toDate();e[p(ee)]=5}I.value=e,await ie(a,o)}else{const c={};for(let e=0;e<180;e++){const o=l(n).add(e,"day").toDate();c[p(o)]=5}await de(a,c)}};le(()=>{Q(),F()});const T=u(""),F=t=>{const s=l(t).day();s===0||s===6?T.value=k.value+1e3:T.value=k.value},A=t=>{const a=l(),s=l(t);if(s<a.startOf("day"))return"";const n=s.day(),d=n===0||n===6?k.value+1e3:k.value;return new Intl.NumberFormat("en-US").format(d)},I=u({}),O=t=>{const a=l(t).format("YYYY-MM-DD"),s=I.value[a];return s!==void 0?`${s}`:""},M=u(1),J=ne();function X(){if(!J.currentUser)Y.alert("請先登入會員","提示",{confirmButtonText:"OK",callback:()=>{x.push({path:"/member",query:{redirect:x.currentRoute.value.fullPath}})}});else if(!D.value)Y.alert("請選擇入住天數","提示",{confirmButtonText:"ok"});else{const a=l().format("YYYY-MM-DD"),s=l().add(180,"day").format("YYYY-MM-DD"),n=l(g.value).format("YYYY-MM-DD");if(n<a)Y.alert("無法選擇今天以前的日期","提示",{confirmButtonText:"ok"});else if(n>=s)Y.alert("只能選擇半年內的日期","提示",{confirmButtonText:"ok"});else{const d=l(g.value),c=l($.value);let e=!0;for(let o=d;o<c;o=o.add(1,"day")){const V=o.format("YYYY-MM-DD");if(I.value[V]<M.value){e=!1;break}}e?x.push({path:"/reserve/confirm",query:{date1:q.value,date2:E.value,day:D.value,number:M.value,reservePrice:T.value,room:_.value}}):Y.alert("剩餘房間不足","提示",{confirmButtonText:"ok"})}}}const x=re();function Z(){x.push({path:"/reserve"})}return(t,a)=>{const s=w("el-option"),n=w("el-select"),d=w("el-button"),c=w("el-calendar");return m(),y("div",ke,[r("div",be,[Ye,v(n,{modelValue:_.value,"onUpdate:modelValue":a[0]||(a[0]=e=>_.value=e),placeholder:"選擇房型"},{default:f(()=>[(m(!0),y(P,null,U(W,(e,o)=>(m(),ve(s,{key:o,label:e.value,value:e.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),r("div",he,[Ce,v(n,{modelValue:D.value,"onUpdate:modelValue":a[1]||(a[1]=e=>D.value=e),placeholder:"選擇天數"},{default:f(()=>[(m(),y(P,null,U(7,(e,o)=>v(s,{key:o,label:e,value:e},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),r("div",ge,[Me,v(n,{modelValue:M.value,"onUpdate:modelValue":a[2]||(a[2]=e=>M.value=e)},{default:f(()=>[(m(),y(P,null,U(5,(e,o)=>v(s,{key:o,label:e,value:e},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),xe,v(c,{modelValue:b.value,"onUpdate:modelValue":a[5]||(a[5]=e=>b.value=e),ref_key:"calendar",ref:B},{header:f(({date:e})=>[v(d,{size:"large",onClick:a[3]||(a[3]=o=>z("prev-month"))},{default:f(()=>[j("上個月")]),_:1}),r("span",null,R(e),1),v(d,{size:"large",onClick:a[4]||(a[4]=o=>z("next-month"))},{default:f(()=>[j("下個月")]),_:1})]),"date-cell":f(({data:e})=>[r("div",{class:me(["date",e.isSelected?"is-selected":""]),onClick:o=>F(e.day)},R(e.day.split("-").slice(2).join("-")),11,Ve),A(e.day)?(m(),y("div",we," $"+R(A(e.day)),1)):L("",!0),O(e.day)?(m(),y("div",{key:1,class:"count",style:fe({color:O(e.day)<2?"red":"black"})},[Re,j(" "+R(O(e.day))+"間 ",1)],4)):L("",!0)]),_:1},8,["modelValue"]),r("div",{class:"button"},[r("div",{class:"back",onClick:Z},"上一步"),r("div",{class:"back",onClick:X},"下一步")])])}}},Te=te(Be,[["__scopeId","data-v-3d18f6a2"]]);export{Te as default};
