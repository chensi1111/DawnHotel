<template>
  <div class="list" v-loading="loading">
    <div class="title">訂單列表</div>
    <div class="container">
      <div
        class="empty"
        v-if="!loading && !pageItems.length"
        @click="toReserve"
      >
        尚無任何訂單<br />來去看看
      </div>
      <el-collapse
        v-for="(item, index) in pageItems"
        :key="index"
        v-model="clickOrder"
        accordion
      >
        <el-collapse-item>
          <template #title>
            <div class="order-title">
              <span
                :style="{
                  textDecoration:
                    item.state === '訂單已取消' ? 'line-through' : 'none',
                }"
                >訂單編號: {{ item.id.slice(0, 10) }}</span
              >
              <span class="time"> {{ item.orderDate }}</span>
            </div>
          </template>
          <div class="order">
            <div class="pic">
              <img :src="getPic(item.room)" />
              <div
                class="cancle"
                @click="cancelOrder(item)"
                v-if="item.state != '訂單已取消'"
              >
                取消訂單
              </div>
            </div>
            <div class="info-container">
              <div class="info">
                入住房型:
                <span>{{ item.room }}</span>
              </div>
              <div class="info">
                入住時間:
                <span>{{ item.date1 }}~{{ item.date2 }}</span>
              </div>
              <div class="info">
                房間數量:
                <span>{{ item.number }}</span>
              </div>
              <div class="info">
                價格:
                <span>${{ item.total }}</span>
              </div>
              <div class="info">
                狀態:
                <span
                  :style="{
                    color: item.state === '訂單已取消' ? 'red' : 'black',
                  }"
                  >{{ item.state }}</span
                >
                <span
                  class="delete"
                  v-if="item.state === '訂單已取消'"
                  @click="deleteOrder(item)"
                  >刪除訂單</span
                >
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-pagination
      layout="prev, pager, next"
      :total="items.length"
      :page-size="6"
      v-model:current-page="currentPage"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {collection,getDocs,doc,updateDoc,runTransaction,} from "firebase/firestore";
import { db } from "@/services/firebase";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import classicPic from "@/assets/room/classic.jpg";
import classicPic2 from "@/assets/room/classic-2.jpg";
import luxuaryPic from "@/assets/room/luxuary.jpg";
import luxuaryPic2 from "@/assets/room/luxuary-2.jpg";
import mountainPic from "@/assets/room/mountain.jpg";
import mountainPic2 from "@/assets/room/mountain-2.jpg";
import oceanPic from "@/assets/room/ocean.jpg";
import oceanPic2 from "@/assets/room/ocean-2.jpg";

//選擇的訂單
const clickOrder = ref("");

//獲取房型照片
const getPic = (room) => {
  switch (room) {
    case "經典雙人套房":
      return classicPic;
    case "經典四人套房":
      return classicPic2;
    case "豪華雙人套房":
      return luxuaryPic;
    case "豪華四人套房":
      return luxuaryPic2;
    case "山景雙人套房":
      return mountainPic;
    case "山景四人套房":
      return mountainPic2;
    case "海景雙人套房":
      return oceanPic;
    case "海景四人套房":
      return oceanPic2;
  }
};

//頁碼
const currentPage = ref(1);
const pageSize = 6;
const pageItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return items.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

//登入狀態則獲取訂單
const auth = getAuth();
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      getOrders(user.uid);
    } else {
      console.error("無登入狀態");
    }
  });
});

//獲取訂單
const loading = ref(false);
const items = ref([]);
const getOrders = async (userId) => {
  loading.value = true;
  const ordersCollectionRef = collection(db, "users", userId, "userOrders");
  const querySnapshot = await getDocs(ordersCollectionRef);
  const orders = [];
  querySnapshot.forEach((doc) => {
    const orderData = doc.data();
    orderData.id = doc.id;

    //訂單狀態若為"訂單已刪除"則不渲染
    if (!orderData.state) {
      orderData.state = "訂單已送出";
    } else if (orderData.state === "訂單已取消") {
      orderData.state = "訂單已取消";
    } else {
      return;
    }
    orders.push(orderData);
  });
  orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  items.value = orders;
  loading.value = false;
};

//獲取房型
const getRoomType = (room) => {
  switch (room) {
    case "經典雙人套房":
      return "classicDoubleRoomCounts";
    case "經典四人套房":
      return "classicQuadrupleRoomCounts";
    case "豪華雙人套房":
      return "luxuryDoubleRoomCounts";
    case "豪華四人套房":
      return "luxuryQuadrupleRoomCounts";
    case "山景雙人套房":
      return "mountainDoubleRoomCounts";
    case "山景四人套房":
      return "mountainQuadrupleRoomCounts";
    case "海景雙人套房":
      return "oceanDoubleRoomCounts";
    case "海景四人套房":
      return "oceanQuadrupleRoomCounts";
  }
};

//獲取天數
const getDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = dayjs(startDate);
  const end = dayjs(endDate);

  while (currentDate.isBefore(end)) {
    dates.push(currentDate.toDate());
    currentDate = currentDate.add(1, "day");
  }

  return dates;
};

//取消訂單
const cancelOrder = (item) => {
  ElMessageBox.confirm("確定要取消訂單嗎?", "警告", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      ElMessage({
        type: "success",
        message: "訂單已取消",
      });
      item.state = "訂單已取消";
      const userId = auth.currentUser.uid;
      const orderDocRef = doc(db, "users", userId, "userOrders", item.id);
      await updateDoc(orderDocRef, { state: "訂單已取消" });

      const roomType = getRoomType(item.room);
      const roomNumber = item.number;
      const roomDocRef = doc(db, "counts", roomType);

      //確保操作的一致性，更新只有全部成功或全部失敗
      await runTransaction(db, async (transaction) => {
        const roomDoc = await transaction.get(roomDocRef);
        if (!roomDoc.exists()) {
          throw "數據不存在";
        }
        const roomData = roomDoc.data();
        const dateRange = getDateRange(item.date1, item.date2);

        dateRange.forEach((date) => {
          const dateString = dayjs(date).format("YYYY-MM-DD");
          if (roomData[dateString] !== undefined) {
            roomData[dateString] += parseInt(roomNumber);
          }
        });

        transaction.update(roomDocRef, roomData);
      });
    })

    .catch(() => {
      ElMessage({
        type: "error",
        message: "取消失敗",
      });
    });
};

//刪除訂單
const deleteOrder = async (item) => {
  item.state = "訂單已刪除";
  const userId = auth.currentUser.uid;
  const orderDocRef = doc(db, "users", userId, "userOrders", item.id);
  await updateDoc(orderDocRef, { state: "訂單已刪除" });
  items.value = items.value.filter((order) => order.id !== item.id);
};

//路由
const router = useRouter();
function toReserve() {
  router.push({
    path: "/reserve",
  });
}
</script>

<style scoped>
.list {
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
  align-items: center;
  border: 1px solid black;
}
.empty {
  margin: auto;
  font-size: 20px;
  text-align: center;
}
.empty:hover {
  cursor: pointer;
  font-weight: bold;
}
.el-collapse {
  width: 100%;
  border-top: unset;
  --el-collapse-header-bg-color: transparent;
  --el-collapse-content-bg-color: transparent;
  --el-collapse-header-font-size: 18px;
}
.el-collapse:hover .order-title {
  color: blue;
}
::v-deep .el-collapse-item__content {
  padding-bottom: 0;
}
.order-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
span {
  margin-right: 10px;
}
.time {
  font-size: 18px;
}
.order {
  display: flex;
  align-items: center;
}
.pic {
  width: 200px;
}
img {
  width: 100%;
}
.cancle {
  width: 100px;
  font-size: 18px;
  color: red;
}
.cancle:hover {
  cursor: pointer;
}
.info-container {
  width: 60%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 18px;
}
.info {
  margin: 5px 0;
  font-weight: bold;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.info span {
  margin-left: 10px;
}
.delete {
  color: blue;
}
.delete:hover {
  cursor: pointer;
}

.el-pagination {
  margin-top: 20px;
  --el-pagination-font-size: 20px;
  --el-pagination-bg-color: transparent;
  --el-pagination-button-disabled-bg-color: transparent;
}
.el-icon {
  font-size: 20px;
}
@media screen and (max-width: 767px) {
  .list {
    padding: 30px 10px;
  }
  .container {
    padding: 10px;
  }
  .order-title {
    flex-wrap: wrap;
  }
  span {
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 25px;
  }
  .time {
    font-size: 14px;
  }
  .order {
    flex-direction: column;
  }
  .pic,
  .info-container {
    width: 100%;
  }
  .info-container {
    padding: 10px;
  }
}
@media screen and (max-width: 414px) {
  .info-container {
    padding: 5px;
  }
  .info {
    font-size: 16px;
  }
  .info span {
    font-size: 14px;
    margin-left: 5px;
  }
}
</style>