<template>
  <div class="container">
    <div class="logo" @click="toHome"><img src="../assets/logo.png" /></div>
    <div class="member-container">
      <div class="member" @click="toInfo" v-if="isSignedIn">
        <el-icon><UserFilled /></el-icon>用戶資訊
      </div>
      <div class="member" @click="toMember" v-if="!isSignedIn">登入</div>
      <div class="member" @click="handleSignOut" v-if="isSignedIn">登出</div>
      <div class="member" @click="toSignUp" v-if="!isSignedIn">註冊</div>
    </div>
    <div class="rwd">
      <div class="rwd-member" @click="toggleMember">
        <el-icon :style="{ color: isMemberOpen ? 'white' : 'black' }"
          ><UserFilled
        /></el-icon>
      </div>
      <div class="burger" @click="toggleNav">
        <div
          class="bar"
          :class="{ bar1: isNavOpen, close: !isNavOpen }"
          :style="{ backgroundColor: isNavOpen ? 'white' : 'black' }"
        >
          &nbsp;
        </div>
        <div
          class="bar"
          :class="{ bar2: isNavOpen, close: !isNavOpen }"
          :style="{ backgroundColor: isNavOpen ? 'white' : 'black' }"
        >
          &nbsp;
        </div>
        <div
          class="bar"
          :class="{ bar3: isNavOpen, close: !isNavOpen }"
          :style="{ backgroundColor: isNavOpen ? 'white' : 'black' }"
        >
          &nbsp;
        </div>
      </div>
    </div>
  </div>
  <div class="nav-container">
    <div class="nav" @click="toNews">最新消息</div>
    <div class="nav" @click="toAbout">關於我們</div>
    <div class="nav" @click="toggleRooms">
      <span
        >房型介紹<el-icon><CaretBottom /></el-icon
      ></span>
      <div class="rooms" v-show="isClicked">
        <div class="room" @click="toRoomList">房價一覽表</div>
        <div class="room" @click="toRoomMountain">山景套房</div>
        <div class="room" @click="toRoomOcean">海景套房</div>
        <div class="room" @click="toRoomClassic">經典套房</div>
        <div class="room" @click="toRoomLuxuary">豪華套房</div>
      </div>
    </div>
    <div class="nav" @click="toFacility">休閒設施</div>
    <div class="nav" @click="toFood">美食餐飲</div>
    <div class="nav" @click="toTrafic">交通資訊</div>
  </div>
  <div class="rwd-container" :style="{ top: isNavOpen ? '0' : '-100vh' }">
    <div class="rwd-nav-list" :class="{ roomsVisible: isRoomsVisible }">
      <div class="nav" @click="toNews">最新消息</div>
      <div class="nav" @click="toAbout">關於我們</div>
      <div class="nav" @click="showRooms">房型介紹</div>
      <div class="nav" @click="toFacility">休閒設施</div>
      <div class="nav" @click="toFood">美食餐飲</div>
      <div class="nav" @click="toTrafic">交通資訊</div>
    </div>
    <div class="rwd-rooms" :class="{ roomsVisible: isRoomsVisible }">
      <div class="rwd-room" @click="hideRooms">返回</div>
      <div class="rwd-room" @click="toRoomList">房價一覽表</div>
      <div class="rwd-room" @click="toRoomMountain">山景套房</div>
      <div class="rwd-room" @click="toRoomOcean">海景套房</div>
      <div class="rwd-room" @click="toRoomClassic">經典套房</div>
      <div class="rwd-room" @click="toRoomLuxuary">豪華套房</div>
    </div>
  </div>
  <div class="rwd-member-container" :style="{ top: isMemberOpen ? '0' : '-100vh' }">
    <div class="member" @click="toInfo" v-if="isSignedIn">用戶資訊</div>
    <div class="member" @click="toMember" v-if="!isSignedIn">登入</div>
    <div class="member" @click="handleSignOut" v-if="isSignedIn">登出</div>
    <div class="member" @click="toSignUp" v-if="!isSignedIn">註冊</div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();

//登入狀態
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    user ? (isSignedIn.value = true) : (isSignedIn.value = false);
  });
});

//登出
const isSignedIn = ref(false);
const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      isMemberOpen.value = false;
      isSignedIn.value = false;
      router.push({
        path:'/member'
      })
    })
    .catch((error) => {
      isMemberOpen.value = false;
      console.log("登出失敗", error);
    });
};

//房間下拉選單
const isClicked = ref(false);
function toggleRooms() {
  isClicked.value = !isClicked.value;
}

//RWD選單
//導覽頁
const isNavOpen = ref(false);
function toggleNav() {
  if (isMemberOpen.value) {
    isMemberOpen.value = false;
    setTimeout(() => {
      isNavOpen.value = !isNavOpen.value;
    }, 500);
  } else {
    isNavOpen.value = !isNavOpen.value;
  }
}
//會員
const isMemberOpen = ref(false);
function toggleMember() {
  if (isNavOpen.value) {
    isNavOpen.value = false;
    setTimeout(() => {
      isMemberOpen.value = !isMemberOpen.value;
    }, 500);
  } else {
    isMemberOpen.value = !isMemberOpen.value;
  }
}
//房型
const isRoomsVisible = ref(false);
function showRooms() {
  isRoomsVisible.value = true;
}
function hideRooms() {
  isRoomsVisible.value = false;
}

//路由
const router = useRouter();
function toHome() {
  router.push({
    path: "/",
  });
}
function toNews() {
  toggleNav();
  router.push({
    path: "/news",
  });
}
function toAbout() {
  toggleNav();
  router.push({
    path: "/about",
  });
}
function toRoomList() {
  toggleNav();
  router.push({
    path: "/room",
  });
}
function toRoomMountain() {
  toggleNav();
  router.push({
    path: "/room/room-mountain",
  });
}
function toRoomOcean() {
  toggleNav();
  router.push({
    path: "/room/room-ocean",
  });
}
function toRoomClassic() {
  toggleNav();
  router.push({
    path: "/room/room-classic",
  });
}
function toRoomLuxuary() {
  toggleNav();
  router.push({
    path: "/room/room-luxuary",
  });
}
function toFacility() {
  toggleNav();
  router.push({
    path: "/facility",
  });
}
function toFood() {
  toggleNav();
  router.push({
    path: "/food",
  });
}
function toTrafic() {
  toggleNav();
  router.push({
    path: "/trafic",
  });
}
function toMember() {
  isMemberOpen.value = false; 
  router.push({
    path: "/member",
    query: { redirect: router.currentRoute.value.fullPath }
  });
}
function toSignUp() {
  isMemberOpen.value = false;
  router.push({
    path: "/member/signup",
  });
}
function toInfo() {
  isMemberOpen.value = false;
  router.push({
    path: "/info/list",
  });
}
</script>

<style scoped>
.container {
  display: flex;
  position: relative;
}

.logo {
  display: flex;
  justify-content: center;
  margin: 20px auto 0;
  width: 40%;
}
.logo:hover {
  cursor: pointer;
  opacity: 0.8;
}
.rwd {
  display: none;
}
img {
  width: 100%;
}
.member-container {
  position: absolute;
  right: 20px;
  bottom: 0;
  display: flex;
}
.member {
  font-size: 25px;
  margin-right: 15px;
}
.member:hover {
  cursor: pointer;
}
.nav-container {
  display: flex;
  justify-content: center;
  padding: 45px 20px;
  background-image: linear-gradient(
    to bottom,
    rgb(255, 255, 230),
    rgb(255, 195, 30)
  );
}
.nav {
  font-size: 25px;
  border-right: 3px solid black;
  padding: 0 20px;
  position: relative;
}
.nav:hover {
  cursor: pointer;
  font-weight: bold;
}
.nav-container .nav:nth-child(3):hover {
  cursor: unset;
  font-weight: normal;
}
span:hover {
  cursor: pointer;
  font-weight: bold;
}
.rooms {
  position: absolute;
  margin-top: 15px;
  padding-top: 20px;
  box-sizing: border-box;
  transform: translateX(-30px);
  width: 100%;
  border: 1px solid black;
  background-color: rgba(255, 195, 30, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 200;
}
.room {
  font-size: 25px;
  margin-bottom: 20px;
}
.room:hover {
  cursor: pointer;
  font-weight: bold;
}
.rwd-container {
  display: none;
}
.rwd-member-container{
  display: none;
}
@media screen and (max-width: 1024px) {
  .logo {
    width: 50%;
  }
  .member-container {
    right: 10px;
  }
  .member {
    font-size: 20px;
    margin-right: 10px;
  }
  .nav-container {
    padding: 45px 0;
  }
  .nav {
    font-size: 20px;
    padding: 0 15px;
  }
  .room {
    font-size: 20px;
  }
}
@media screen and (max-width: 767px) {
  .container {
    align-items: center;
    justify-content: space-around;
  }
  .rwd {
    display: flex;
    align-items: center;
    z-index: 100;
  }
  .rwd-member {
    font-size: 40px;
    margin: 10px;
  }
  .rwd-member:hover {
    cursor: pointer;
  }
  .logo {
    margin: 0;
  }
  .member-container {
    display: none;
  }
  .nav-container {
    display: none;
  }
  .rwd-member-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
    transition: 0.5s;
  }
  .rwd-container {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    position: absolute;
    transition: 0.5s;
  }
  .rwd-nav-list {
    position: absolute;
    width: 100vw;
    height: 100vh;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
  }
  .rwd-rooms {
    position: absolute;
    width: 100vw;
    height: 100vh;
    right: -100vw;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
  }
  .nav,
  .rwd-room,
  .member {
    color: white;
    border: unset;
    font-size: 30px;
    font-weight: bold;
    margin: 10px 0;
  }
  .rwd-room:hover {
    cursor: pointer;
  }
  .roomsVisible {
    transform: translateX(-100vw);
  }
  .burger {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .bar {
    width: 30px;
    height: 4px;
    margin: 4px;
    background-color: black;
  }
  .bar1 {
    transform: translateY(12px) rotate(45deg);
    transition: 0.5s;
  }

  .bar2 {
    opacity: 0;
    transition: 0.5s;
  }
  .bar3 {
    transform: translateY(-12px) rotate(-45deg);
    transition: 0.5s;
  }
  .close {
    transform: translateY(0) rotate(0);
    opacity: 1;
    transition: 0.5s;
  }
  .burger:hover {
    cursor: pointer;
  }
}
@media screen and (max-width: 414px) {
  .nav,
  .rwd-room,
  .member {
    font-size: 25px;
  }
}
</style>