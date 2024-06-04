<template>
  <div class="setting">
    <div class="title">設定</div>
    <div class="container">
      <div class="type">個人資訊</div>
      <el-collapse>
        <el-collapse-item>
          <template #title>
            <div class="topic">姓名</div>
            <div class="info">{{ name }}</div>
          </template>
          <div class="content">
            修改姓名
            <input type="text" v-model="firstName" placeholder="姓氏"/>
            <input type="text" v-model="lastName" placeholder="姓字"/>
            <button @click="changeName()">儲存</button>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="email">
        <div class="topic">信箱</div>
        <div class="info">{{ email }}</div>
      </div>
      <div class="type">帳號安全</div>
      <el-collapse>
        <el-collapse-item title="修改密碼">
          <div class="content">
            舊密碼<input
              type="password"
              v-model="oldPassword"
              placeholder="請輸入舊密碼"
            /><br />
            新密碼<input
              type="password"
              v-model="newPassword"
              placeholder="請輸入新密碼"
            />
            <button @click="changePassword">儲存</button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits,computed } from "vue";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { ElMessageBox } from "element-plus";

//獲取用戶資料
const auth = getAuth();
const email = ref("");
const name = ref("");
const firstName = ref("");
const lastName = ref("");
const fullName = computed(() => {
  return firstName.value + lastName.value;
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    email.value = user.email;
    name.value = user.displayName;
  }
});

//更新用戶名
const emits = defineEmits(["updateName"]);
function changeName() {
  const user = auth.currentUser;
  if (user) {
    updateProfile(user, { displayName: fullName.value })
      .then(() => {
        name.value = fullName.value;
        //傳給theInfo
        emits("updateName", name.value);
        ElMessageBox.alert("姓名更新成功", "提示", {
          confirmButtonText: "確認",
        });
      })
      .catch((error) => {
        console.error("姓名更新失敗", error);
        ElMessageBox.alert("姓名更新失敗", "提示", {
          confirmButtonText: "確認",
        });
      });
  }
}

//更新密碼
const oldPassword = ref("");
const newPassword = ref("");
function changePassword() {
  const user = auth.currentUser;
  if (user) {
    //用email和舊密碼作為認證
    const credential = EmailAuthProvider.credential(
      user.email,
      oldPassword.value
    );
    if (!oldPassword.value || !newPassword.value) {
      ElMessageBox.alert("密碼欄不得為空", "提示", {
        confirmButtonText: "確認",
      });
    } else {
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword.value)
            .then(() => {
              ElMessageBox.alert("密碼更新成功", "提示", {
                confirmButtonText: "確認",
              });
              oldPassword.value = "";
              newPassword.value = "";
            })
            .catch((error) => {
              console.error("密碼更新失敗", error);
              if (error.code === "auth/weak-password") {
                ElMessageBox.alert("密碼不能少於6位數", "提示", {
                  confirmButtonText: "確認",
                });
              }
            });
        })
        .catch((error) => {
          console.error("舊密碼不符合", error);
          ElMessageBox.alert("舊密碼不符合", "提示", {
            confirmButtonText: "確認",
          });
        });
    }
  }
}
</script>

<style scoped>
.setting {
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
}
.container {
  width: 100%;
  min-height: 350px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
}
.type {
  font-size: 20px;
  font-weight: bold;
  margin: 5px 0;
}
.el-collapse {
  border-top: unset;
  --el-collapse-header-bg-color: transparent;
  --el-collapse-content-bg-color: transparent;
  --el-collapse-header-font-size: 18px;
}
.email {
  font-size: 18px;
  display: flex;
  margin: 5px 0;
}
.info {
  margin-left: 30px;
  color: blue;
}
.content {
  font-size: 16px;
  margin-left: 10px;
}
input {
  margin: 3px 10px;
}
@media screen and (max-width:767px){
  .setting{
    padding: 30px 10px;
  }
  .container{
    padding: 10px;
  }
  .email{
    flex-wrap: wrap;
  }
}
@media screen and (max-width:414px){
  .type{
    font-size: 18px;
  }
  .info{
    font-size: 16px;
  }
}
</style>
