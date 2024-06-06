import{_ as M,B as $,a as i,L as D,W as O,u as R,c as V,d as W,e as j,i as e,f as c,w as u,t as b,k as x,Q as r,R as d,p as L,j as Q,V as q,E as n,$ as U,a0 as E,a1 as z,O as F,a2 as G}from"./index-Bj6ZKCGR.js";const s=f=>(L("data-v-c319af4d"),f=f(),Q(),f),H={class:"setting"},J=s(()=>e("div",{class:"title"},"設定",-1)),K={class:"container"},X=s(()=>e("div",{class:"type"},"個人資訊",-1)),Y=s(()=>e("div",{class:"topic"},"姓名",-1)),Z={class:"info"},ee={class:"content"},te=s(()=>e("br",null,null,-1)),le=s(()=>e("br",null,null,-1)),ae=s(()=>e("div",{class:"topic"},"Email",-1)),oe={class:"info"},ne={class:"content"},se=s(()=>e("br",null,null,-1)),ie=s(()=>e("br",null,null,-1)),ue=s(()=>e("br",null,null,-1)),ce=s(()=>e("div",{class:"type"},"帳號安全",-1)),re={class:"content"},de=s(()=>e("br",null,null,-1)),pe={__name:"infoSetting",emits:["updateName"],setup(f,{emit:k}){const p=$(),w=i(""),_=i(""),B=i(""),T=i(""),N=D(()=>B.value+T.value);O(p,l=>{l&&(w.value=l.email,_.value=l.displayName)});const C=k;function S(){const l=p.currentUser;l&&q(l,{displayName:N.value}).then(()=>{_.value=N.value,C("updateName",_.value),n.alert("姓名更新成功","提示",{confirmButtonText:"確認"})}).catch(t=>{console.error("姓名更新失敗",t),n.alert("姓名更新失敗","提示",{confirmButtonText:"確認"})})}const y=i(""),h=i(""),P=R(),I=async()=>{const l=p.currentUser;if(l)if(h.value===w.value)n.alert("新信箱不得與舊信箱相同","提示",{confirmButtonText:"確認"});else{const t=U.credential(l.email,y.value);try{await E(l,t),await z(l,h.value),n.alert("驗證信已成功發送，請查看您的新信箱","提示",{confirmButtonText:"確認"}).then(()=>{n.confirm("請在驗證成功後重新登入","提示",{confirmButtonText:"登出",cancelButtonText:"取消"}).then(()=>{p.signOut(),P.push({path:"/member"})}).catch(()=>{F({type:"info",message:"信箱尚未更新成功，請驗證後重新登入"})})}).catch(()=>{})}catch(a){console.error("驗證信發送失敗",a),a.code==="auth/missing-password"&&n.alert("密碼不得為空","提示",{confirmButtonText:"確認"}),a.code==="auth/invalid-credential"&&n.alert("密碼錯誤","提示",{confirmButtonText:"確認"}),a.code==="auth/missing-new-email"&&n.alert("信箱不得為空","提示",{confirmButtonText:"確認"}),a.code==="auth/invalid-new-email"&&n.alert("信箱格式錯誤","提示",{confirmButtonText:"確認"})}}},m=i(""),v=i("");function A(){const l=p.currentUser;if(l){const t=U.credential(l.email,m.value);!m.value||!v.value?n.alert("密碼欄不得為空","提示",{confirmButtonText:"確認"}):E(l,t).then(()=>{G(l,v.value).then(()=>{n.alert("密碼更新成功","提示",{confirmButtonText:"確認"}),m.value="",v.value=""}).catch(a=>{console.error("密碼更新失敗",a),a.code==="auth/weak-password"&&n.alert("密碼不能少於6位數","提示",{confirmButtonText:"確認"})})}).catch(a=>{console.error("舊密碼不符合",a),n.alert("舊密碼不符合","提示",{confirmButtonText:"確認"})})}}return(l,t)=>{const a=V("el-collapse-item"),g=V("el-collapse");return W(),j("div",H,[J,e("div",K,[X,c(g,null,{default:u(()=>[c(a,null,{title:u(()=>[Y,e("div",Z,b(_.value),1)]),default:u(()=>[e("div",ee,[x(" 修改姓名"),te,r(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=o=>B.value=o),placeholder:"姓氏"},null,512),[[d,B.value]]),le,r(e("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=o=>T.value=o),placeholder:"名字"},null,512),[[d,T.value]]),e("button",{onClick:t[2]||(t[2]=o=>S())},"儲存")])]),_:1})]),_:1}),c(g,null,{default:u(()=>[c(a,null,{title:u(()=>[ae,e("div",oe,b(w.value),1)]),default:u(()=>[e("div",ne,[x(" 修改信箱"),se,r(e("input",{type:"password","onUpdate:modelValue":t[3]||(t[3]=o=>y.value=o),placeholder:"請輸入密碼"},null,512),[[d,y.value]]),ie,r(e("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=o=>h.value=o),placeholder:"請輸入新信箱"},null,512),[[d,h.value]]),ue,e("button",{onClick:t[5]||(t[5]=o=>I())},"發送驗證信件")])]),_:1})]),_:1}),ce,c(g,null,{default:u(()=>[c(a,{title:"修改密碼"},{default:u(()=>[e("div",re,[x(" 舊密碼"),r(e("input",{type:"password","onUpdate:modelValue":t[6]||(t[6]=o=>m.value=o),placeholder:"請輸入舊密碼"},null,512),[[d,m.value]]),de,x(" 新密碼"),r(e("input",{type:"password","onUpdate:modelValue":t[7]||(t[7]=o=>v.value=o),placeholder:"請輸入新密碼"},null,512),[[d,v.value]]),e("button",{onClick:A},"儲存")])]),_:1})]),_:1})])])}}},ve=M(pe,[["__scopeId","data-v-c319af4d"]]);export{ve as default};
