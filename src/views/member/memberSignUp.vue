<template>
  <div class="container">
    <div class="title">會員註冊</div>
    <div class="name">
      <label for="first-name"></label>
      <input
        class="first"
        type="text"
        id="first-name"
        placeholder="姓"
        v-model="firstName"
        :class="{ 'error-border': errorName }"
      />
      <label for="last-name"></label>
      <input
        type="text"
        id="last-name"
        placeholder="名"
        v-model="lastName"
        :class="{ 'error-border': errorName }"
      />
    </div>
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
    <label for="password-check"></label>
    <input
      type="password"
      id="password-check"
      placeholder="再輸入密碼"
      v-model="passwordCheck"
      :class="{ 'error-border': errorPassword }"
    />
    <div class="logup" @click="signUP">註冊</div>
    <div class="signin">已經有帳號?<span @click="toSignIn">立即登入</span></div>
    <div class="error" v-show="errorName">{{ errorName }}</div>
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
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, computed ,onMounted,onBeforeUnmount} from "vue";
import { ElMessage } from "element-plus";

//獲得全名
const firstName = ref("");
const lastName = ref("");
const fullName = computed(() => {
  return firstName.value + lastName.value;
});

//註冊
const email = ref("");
const password = ref("");
const passwordCheck = ref("");
const errorName = ref("");
const errorEmail = ref("");
const errorPassword = ref("");
const auth = getAuth();
const dialogVisible = ref(false);
const count = ref(3);

const signUP = () => {
  errorName.value = "";
  errorEmail.value = "";
  errorPassword.value = "";

  if (fullName.value === "") {
    errorName.value = "請輸入姓名";
  } else {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: fullName.value })
          .then(() => {
            //3秒後自動跳轉
            dialogVisible.value = true;
            const counting = setInterval(() => {
              count.value--;
              if (count.value === 0) {
                clearInterval(counting);
                confirmSignUp();
              }
            }, 1000);
          })
          .catch((error) => {
            ElMessage({
              message: "註冊失敗",
              type: "error",
            });
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("error", error);
        if (error.code === "auth/invalid-email") {
          errorEmail.value = "請輸入正確Email";
        }
        if (error.code === "auth/email-already-in-use") {
          errorEmail.value = "該email已使用";
        } else {
          if (password.value !== passwordCheck.value) {
            errorPassword.value = "密碼不相同";
          } else {
            if (error.code === "auth/missing-password") {
              errorPassword.value = "密碼不能為空";
            }
            if (error.code === "auth/weak-password") {
              errorPassword.value = "密碼不能少於6位數";
            }
          }
        }
      });
  }
};

//路由方法
const router = useRouter();
function toSignIn() {
  router.push({
    path: "/member",
  });
}
function confirmSignUp() {
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
  height: 500px;
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
  margin: 15px 0;
  height: 30px;
  padding-left: 10px;
}
.name {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.name input {
  width: 195px;
  margin: 5px 0;
}
.name .first {
  margin-right: 10px;
}
.logup {
  margin: 0 auto;
  padding: 5px 0;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
}
.logup:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
}

.signin {
  margin: 20px auto 0;
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
  margin-top: 10px;
}
.error-border {
  border: 2px solid red;
}
@media screen and (max-width: 767px) {
  .container {
    width: 350px;
  }
  .name input {
    width: 100%;
  }
  .name .first {
    margin-right: 0;
  }
}
@media screen and (max-width: 414px) {
  .container {
    width: 280px;
  }
  input {
    margin: 5px 0;
  }
}
</style>