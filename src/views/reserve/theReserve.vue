<template>
  <div class="poster">
    <div class="nav" id="nav">
      <div class="sub-nav">快速訂房</div>
      <div class="search-container">
        <div class="search-input">
          <div class="date-picker">
            <el-date-picker
              v-model="date1"
              type="date"
              :disabled-date="disabledDate1"
              placeholder="入住日期"
              :size="datePickerSize"
              popper-class="popperClass"
            />
          </div>
        </div>
        <div class="search-input">
          <div class="date-picker">
            <el-date-picker
              v-model="date2"
              type="date"
              :disabled-date="disabledDate2"
              placeholder="退房日期"
              :size="datePickerSize"
              popper-class="popperClass"
            />
          </div>
        </div>
        <div class="search-input">
          <el-select
            v-model="room"
            placeholder="選擇房型"
            style="width: 240px"
            :size="datePickerSize"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="sub-nav">
        <div class="search" @click="toSearch">
          <el-icon><Search /></el-icon>搜尋
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>
  
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import dayjs from 'dayjs';

//入住時間
const date1 = ref("");
const date2 = ref("");

// date1 改變，date2 設置為 date1 的隔天
watch(date1, (newVal) => {
  if (newVal) {
    const nextDay = dayjs(newVal).add(1, 'day');
    date2.value = formatDate(nextDay);
  }
});

//下拉選單資料
const room = ref("");
const options = [
  {
    value: "全部",
    label: "全部",
  },
  {
    value: "經典雙人套房",
    label: "經典雙人套房",
  },
  {
    value: "經典四人套房",
    label: "經典四人套房",
  },
  {
    value: "豪華雙人套房",
    label: "豪華雙人套房",
  },
  {
    value: "豪華四人套房",
    label: "豪華四人套房",
  },
  {
    value: "山景雙人套房",
    label: "山景雙人套房",
  },
  {
    value: "山景四人套房",
    label: "山景四人套房",
  },
  {
    value: "海景雙人套房",
    label: "海景雙人套房",
  },
  {
    value: "海景四人套房",
    label: "海景四人套房",
  },
];

//簡化日期
const formatDate = (date) => {
  return dayjs(date).format('YYYY/MM/DD');
};

// 禁用今天之前的日期
const disabledDate1 = (time) => {
  return dayjs(time).isBefore(dayjs(), 'day');
};

// 必须先填寫 date1，並禁用其以前的日期
const disabledDate2 = (time) => {
  if (!date1.value) return true;
  return dayjs(time).isSameOrBefore(dayjs(date1.value), 'day');
};

//路由
const router = useRouter();
function toSearch() {
  if (!date1.value ) {
    ElMessageBox.alert("訂房日期不能為空", "提示", {
      confirmButtonText: "OK",
    });
  } else if (!date2.value ) {
    ElMessageBox.alert("退房日期不能為空", "提示", {
      confirmButtonText: "OK",
    });
  } else if (!room.value ) {
    ElMessageBox.alert("房型不能為空", "提示", {
      confirmButtonText: "OK",
    });
  } else {
    router.push({
      path: "/reserve/search",
      query: {
        date1: formatDate(new Date(date1.value)),
        date2: formatDate(new Date(date2.value)),
        room: room.value,
      },
    });
  }
}

//根據視窗大小改變datePicker
const datePickerSize = ref("large");
const checkWindowSize = () => {
  datePickerSize.value = window.innerWidth < 414 ? "small" : "large";
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
.poster {
  background-image: url(@/assets/reserve/poster.jpg);
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  position: relative;
}
.nav {
  width: 80%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 80px;
  margin: 20px;
  display: flex;
}
.sub-nav {
  width: 20%;
  color: white;
  font-size: 25px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-container {
  display: flex;
  width: 60%;
}
.search-input {
  width: 33%;
  color: white;
  font-size: 25px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-input {
  width: 100%;
}
.search {
  border: 1px solid white;
  width: 80%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.2);
}
.search:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.4);
}
@media screen and (max-width: 1024px) {
  .sub-nav {
    font-size: 18px;
  }
  ::v-deep .el-input--large .el-input__wrapper{
    padding: 1px 10px;
  }
  ::v-deep .el-input--large {
    font-size: 12px;
  }
  ::v-deep .el-select--large .el-select__wrapper {
    font-size: 12px;
    
  }
  .search {
    font-size: 18px;
  }
}
@media screen and (max-width: 767px) {
  .poster {
    height: 350px;
  }
  .nav {
    width: 90%;
    height: 120px;
    flex-direction: column;
    justify-content: center;
    padding: 15px 10px 15px 0;
  }
  .sub-nav,
  .search-container {
    width: 100%;
  }
  .search-container {
    margin: 10px;
  }
  .search {
    width: 30%;
  }
}
@media screen and (max-width: 414px) {
  .nav {
    height: 180px;
  }
  .search-container {
    flex-direction: column;
    align-items: center;
  }
  .search-input {
    width: 80%;
  }
  .date-picker {
    width: 100%;
  }
  .el-select {
    margin-top: 10px;
  }
}
</style>
<style>
@media screen and (max-width: 414px) {
  .popperClass .el-date-picker {
    width: 280px;
  }
  .popperClass .el-date-picker .el-picker-panel__content {
    width: 280px;
    margin-left: 0;
  }
}
</style>