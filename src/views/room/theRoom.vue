<template>
  <div class="poster">
      <div class="slogan">日出之時</div>
      <div class="slogan">迎來嶄新的開始</div>
      <div class="sub-slogan">At the break of dawn, welcome a fresh new beginning</div>
    </div>
  <div class="topic">
    <h1 data-aos="fade-down" data-aos-duration="1000">房型介紹</h1>
    <h2 data-aos="fade-down" data-aos-duration="1500">Room</h2>
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style scoped>
.poster {
  width: 100%;
  height: 400px;
  background-image: url(@/assets/room/poster.jpg);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.slogan {
  font-size: 35px;
  color: white;
  text-shadow: 1px 1px black;
  letter-spacing: 10px;
  font-style: italic;
}
.sub-slogan{
  font-size: 25px;
  color: white;
  text-shadow: 1px 1px black;
  font-style: italic;
}
.topic {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
h1 {
  font-size: 35px;
  margin: 0;
  margin-top: 50px;
}
h2 {
  font-size: 25px;
  margin: 0;
  margin-bottom: 30px;
}
@media screen and (max-width:767px){
  .poster{
    height: 350px;
  }
  .slogan{
    font-size: 25px;
  }
  .sub-slogan{
    font-size: 16px;
  }
  h1{
    font-size: 25px;
  }
  h2{
    font-size: 20px;
  }
  
}
@media screen and (max-width:414px){
  .poster{
    height: 300px;
  }
  .slogan{
    font-size: 20px;
  }
  .sub-slogan{
    font-size: 12px;
  }
}
</style>