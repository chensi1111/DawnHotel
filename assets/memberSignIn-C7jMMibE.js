import{_ as R,a,B as W,u as N,o as T,b as A,c as I,d as D,e as F,i as e,Q as d,R as S,n as V,k,S as x,t as h,f as y,w as f,F as L,T as M,p as P,j}from"./index-Bj6ZKCGR.js";const w=i=>(P("data-v-5963e795"),i=i(),j(),i),q={class:"container"},Q=w(()=>e("div",{class:"title"},"會員登入",-1)),G=w(()=>e("label",{for:"account"},null,-1)),H=w(()=>e("label",{for:"password"},null,-1)),J={class:"dialog-footer"},K={__name:"memberSignIn",setup(i){const c=a(""),v=a(""),l=a(""),o=a(""),C=W(),u=a(!1),p=a(3),r=N(),m=a(""),E=()=>{l.value="",o.value="",M(C,c.value,v.value).then(()=>{u.value=!0;const t=setInterval(()=>{p.value--,p.value===0&&(clearInterval(t),g())},1e3)}).catch(t=>{t.code==="auth/invalid-email"&&(l.value="請輸入正確Email"),t.code==="auth/missing-password"&&(o.value="密碼不能為空"),t.code==="auth/invalid-credential"&&(o.value="密碼錯誤")})};function B(){r.push({path:"/member/signup"})}function g(){u.value=!1,m.value?r.push(m.value):r.push({path:"/"})}const b=a("500"),_=()=>{b.value=window.innerWidth<767?"300":"500"};return T(()=>{_(),window.addEventListener("resize",_),m.value=r.currentRoute.value.query.redirect||"/"}),A(()=>{window.removeEventListener("resize",_)}),(t,s)=>{const U=I("el-button"),z=I("el-dialog");return D(),F(L,null,[e("div",q,[Q,G,d(e("input",{type:"text",id:"account",placeholder:"請輸入e-mail","onUpdate:modelValue":s[0]||(s[0]=n=>c.value=n),class:V({"error-border":l.value})},null,2),[[S,c.value]]),H,d(e("input",{type:"password",id:"password",placeholder:"請輸入密碼","onUpdate:modelValue":s[1]||(s[1]=n=>v.value=n),class:V({"error-border":o.value})},null,2),[[S,v.value]]),e("div",{class:"login",onClick:E},"登入"),e("div",{class:"signup"},[k("還沒有帳號?"),e("span",{onClick:B},"立即註冊")]),d(e("div",{class:"error"},h(l.value),513),[[x,l.value]]),d(e("div",{class:"error"},h(o.value),513),[[x,o.value]])]),y(z,{modelValue:u.value,"onUpdate:modelValue":s[2]||(s[2]=n=>u.value=n),title:"提示",width:b.value},{footer:f(()=>[e("div",J,[y(U,{type:"primary",onClick:g},{default:f(()=>[k(" 確認 ")]),_:1})])]),default:f(()=>[e("span",null,"登入成功，"+h(p.value)+"秒後將自動跳轉",1)]),_:1},8,["modelValue","width"])],64)}}},X=R(K,[["__scopeId","data-v-5963e795"]]);export{X as default};