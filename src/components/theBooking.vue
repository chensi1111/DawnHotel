<template>
  <div class="booking" @click="toReserve">
    <el-icon><HomeFilled /></el-icon>立即訂房
  </div>
  <div class="rwd-booking" @click="toReserve">立即訂房</div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function toReserve() {
  router.push({
    path: "/reserve",
  });
}
</script>



<style scoped>
.booking {
  position: fixed;
  right: 20px;
  bottom: 20%;
  writing-mode: vertical-rl;
  font-size: 25px;
  font-weight: bold;
  z-index: 300;
  transition: transform 0.2s;
}
.booking:hover {
  cursor: pointer;
  transform: translate(-15px);
}
.rwd-booking{
  display: none;
}
@media screen and (max-width: 767px) {
  .booking{
    display: none;
  }
  .rwd-booking {
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .rwd-booking:hover{
    cursor: pointer;
  }
}
</style>