<template>
  <div class="poster">
    <div class="title">晨曦之下&nbsp;共繪美好回憶</div>
    <div class="sub-title">Intoxicated by the dawn</div>
    <div class="button" @click="toReserve">
      點我預約
      <div class="arrow">>></div>
    </div>
  </div>
  <div class="introduce">
    <div class="left">
      <div class="border">
        <img src="@/assets/home/tub.jpg" />
      </div>
    </div>
    <div class="right">
      <div class="bar"></div>
      <div class="content">
        <div class="top" data-aos="fade-left" data-aos-duration="1500">
          Step In,<br />
          Unwind in Elegance,<br />
          Savor the Moment.
        </div>
        <div class="bottom" data-aos="fade-right" data-aos-duration="1500">
          走進，<br />
          在優雅中解放，<br />
          細味這一刻，<br />
          讓旅程超脫平凡。
        </div>
      </div>
    </div>
    <div class="info" @click="toAbout">VIEW MORE</div>
  </div>
  <homeNews></homeNews>
  <homeRoom></homeRoom>
</template>
  
<script setup>
import homeNews from "./homeNews.vue";
import homeRoom from "./homeRoom.vue";
import { useRouter } from "vue-router";

const router = useRouter();
function toAbout() {
  router.push({
    path: "/about",
  });
}
function toReserve() {
  router.push({
    path: "/reserve",
  });
}

</script>
  
  <style scoped>
.poster {
  background-image: url(@/assets/home/poster.jpg);
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.title {
  color: white;
  font-size: 40px;
  font-weight: bold;
  text-shadow: 2px 2px black;
}
.sub-title {
  color: white;
  font-size: 30px;
  font-weight: bold;
  text-shadow: 2px 2px black;
}
.button {
  width: 200px;
  height: 50px;
  border: 2px solid white;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  right: 30px;
  bottom: 30px;
}
.button:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.6);
}
.arrow {
  font-size: 25px;
  font-weight: bold;
}
@keyframes moveRight {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(20px);
    opacity: 0;
  }
}

.arrow {
  animation: moveRight 1.5s infinite;
}
.introduce {
  height: 700px;
  display: flex;
  position: relative;
  color: rgb(114, 139, 102);
}
.left {
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right {
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  padding-left: 10%;
  box-sizing: border-box;
  overflow: hidden;
}
.introduce .border {
  border: 3px solid rgb(114, 139, 102);
  width: 300px;
  height: 450px;
  position: relative;
}
.introduce .border img {
  position: absolute;
  top: 50%;
  left: 15%;
  width: 450px;
  height: 300px;
  transform: translateY(-50%);
}
.introduce .bar {
  width: 3px;
  height: 150px;
  background-color: rgb(114, 139, 102);
  margin-right: 50px;
}
.introduce .top {
  font-size: 35px;
}
.introduce .bottom {
  font-size: 20px;
  margin-top: 30px;
}
.introduce .info {
  position: absolute;
  right: 100px;
  bottom: 50px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  overflow: hidden;
  z-index: 20;
}
.introduce .info:hover {
  cursor: pointer;
  color: white;
}
.introduce .info::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transition: transform 0.2s ease;
  background: black;
  transform-origin: left;
  transform: scaleX(0);
  z-index: -1;
}

.introduce .info:hover::after {
  transform: scaleX(1);
}
@media screen and (max-width: 1024px) {
  .poster{
    height: 50vh;
  }
  .introduce .border {
    width: 200px;
    height: 300px;
  }
  .introduce .border img {
    width: 300px;
    height: 200px;
  }
  .introduce .bar {
    margin-right: 15px;
  }
  .introduce .top {
    font-size: 30px;
  }
  .introduce .bottom {
    font-size: 18px;
    margin-top: 20px;
  }
}
@media screen and (max-width: 767px) {
  .title {
    font-size: 30px;
  }
  .sub-title {
    font-size: 16px;
  }
  .button {
    width: 150px;
    height: 40px;
    font-size: 18px;
  }
  .arrow {
    font-size: 20px;
  }
  .introduce {
    height: 100%;
    flex-direction: column;
    align-items: center;
  }
  .introduce .border {
    margin-top: 50px;
    width: 230px;
    height: 350px;
    transform: translateX(-50%);
  }
  .introduce .border img {
    width: 350px;
    height: 230px;
  }
  .right{
    width: 100%;
    margin: 50px 0 150px 0;
  }
  .introduce .bar {
    margin-right: 20px;
  }
  .introduce .top {
    font-size: 28px;
  }
  .introduce .bottom {
    font-size: 18px;
    margin-top: 20px;
  }
  .introduce .info {
    right: 50%;
    transform: translateX(50%);
  }
}
@media screen and (max-width: 414px) {
  .title {
    font-size: 25px;
  }
  .sub-title {
    font-size: 16px;
  }
  .button {
    right: 50%;
    transform: translateX(50%);
  }
  .introduce .border {
    width: 166px;
    height: 250px;
    transform: translateX(-50%);
  }
  .introduce .border img {
    width: 250px;
    height: 166px;
  }
  .introduce .top {
    font-size: 25px;
  }
  .introduce .bottom {
    font-size: 16px;
  }
  .introduce .info{
    font-size: 16px;
    width: 150px;
    height: 40px;
   
  }
}
</style>