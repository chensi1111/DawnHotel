<template>
  <div class="container">
    <div class="title">會員登入</div>
    <label for="account"></label>
    <input
      type="text"
      id="account"
      placeholder="請輸入e-mail"
      v-model="email"
      :class="{ 'error-border': errorEmail }"
    />
    <label for="password"></label>
    <input
      type="password"
      id="password"
      placeholder="請輸入密碼"
      v-model="password"
      :class="{ 'error-border': errorPassword }"
    />
    <div class="login" @click="signIn">登入</div>
    <div class="signup">還沒有帳號?<span @click="toSignUp">立即註冊</span></div>
    <div class="error" v-show="errorEmail">{{ errorEmail }}</div>
    <div class="error" v-show="errorPassword">{{ errorPassword }}</div>
  </div>
  <el-dialog v-model="dialogVisible" title="提示" :width="dialogWidth">
    <span>登入成功，{{ count }}秒後將自動跳轉</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirmSignIn"> 確認 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

//登入認證
const email = ref("");
const password = ref("");
const errorEmail = ref("");
const errorPassword = ref("");
const auth = getAuth();
const dialogVisible = ref(false);
const count = ref(3);

const signIn = () => {
  errorEmail.value = "";
  errorPassword.value = "";

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      //3秒後自動跳轉
      dialogVisible.value = true;
      const counting = setInterval(() => {
        count.value--;
        if (count.value === 0) {
          clearInterval(counting);
          confirmSignIn();
        }
      }, 1000);
    })
    .catch((error) => {
      if (error.code === "auth/invalid-email") {
        errorEmail.value = "請輸入正確Email";
      }
      if (error.code === "auth/missing-password") {
        errorPassword.value = "密碼不能為空";
      }
      if (error.code === "auth/invalid-credential") {
        errorPassword.value = "密碼錯誤";
      }
    });
};

//路由方法
const router = useRouter();
function toSignUp() {
  router.push({
    path: "/member/signup",
  });
}
function confirmSignIn() {
  dialogVisible.value = false;
  router.push({
    path: "/",
  });
}

//根據視窗大小改變dialog
const dialogWidth = ref("500");
const checkWindowSize = () => {
  dialogWidth.value = window.innerWidth < 767 ? "300" : "500";
};

onMounted(() => {
  checkWindowSize();
  window.addEventListener("resize", checkWindowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkWindowSize);
});
</script>
  
  <style scoped>
.container {
  width: 500px;
  height: 400px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.7);
}
.title {
  margin: 0 auto 20px;
  font-size: 25px;
  font-weight: bolder;
}
input {
  margin: 5px 0 15px;
  height: 30px;
  padding-left: 10px;
}
.login {
  margin: 0 auto;
  padding: 5px 0;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
}
.login:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
}
.signup {
  margin: 20px auto;
}

span {
  margin-left: 10px;
  font-weight: bold;
}
span:hover {
  cursor: pointer;
}
.error {
  color: red;
  font-size: 18px;
}
.error-border {
  border: 2px solid red;
}
@media screen and (max-width: 767px) {
  .container {
    width: 350px;
  }
}
@media screen and (max-width: 414px) {
  .container {
    width: 280px;
  }
}
</style>
<style >
@media screen and (max-width: 414px) {
  .el-dialog {
    width: 280px;
  }
}
</style>