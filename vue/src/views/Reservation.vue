<template>
  <div class="reservation">
    <h2>预约界面</h2>
    <el-divider></el-divider>

    <!-- 当前预约记录 -->
    <div class="section">
      <h3>当前预约记录</h3>
      <el-table :data="paginatedReservations" border style="width: 100%">
        <el-table-column prop="title" label="书名" style="width: 20%" />
        <el-table-column prop="reservationDate" label="预约日期" style="width: 15%" />
        <el-table-column prop="status" label="状态" style="width: 15%">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'confirmed' ? 'success' : 'warning'">
              {{ scope.row.status === "confirmed" ? "已确认" : "待确认" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="width: 15%">
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              @click="cancelReservation(scope.row)"
            >
              取消预约
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          layout="prev, pager, next"
          :current-page="reservationCurrentPage"
          :page-size="reservationPageSize"
          :total="reservations.length"
          @current-change="handleReservationPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request"; // 确保路径正确

export default {
  name: "Reservation",
  data() {
    return {
      reservations: [], // 当前预约记录
      reservationCurrentPage: 1,
      reservationPageSize: 5,
    };
  },
  computed: {
    paginatedReservations() {
      const start = (this.reservationCurrentPage - 1) * this.reservationPageSize;
      const end = start + this.reservationPageSize;
      return this.reservations.slice(start, end);
    },
  },
  methods: {
    async fetchReservations() {
      try {
        // 从 sessionStorage 获取当前用户信息
        const userJson = sessionStorage.getItem("userInfo");
        const user = JSON.parse(userJson)?.user;

        if (!user) {
          this.$message.error("用户未登录，请先登录后再尝试。");
          return;
        }

        // 使用从 sessionStorage 获取的用户 ID 发起请求
        const response = await request.get("/reservation/queryByUserId", {
          params: { userId: user.uid },
        });

        // 直接更新 reservations 为所有返回的数据
        this.reservations = response.data.map((record) => ({
          bookId: record.bid,
          title: record.bookName || "未知书名",
          reservationDate: record.reservationDate || "未知日期",
        }));
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
        this.$message.error("获取预约信息失败，请稍后重试。");
      }
    },

    handleReservationPageChange(page) {
      this.reservationCurrentPage = page;
    },

    cancelReservation(reservation) {
      // 取消预约时，移除相应的记录
      this.reservations = this.reservations.filter((r) => r.bookId !== reservation.bookId);
      this.$message.success(`取消预约成功: ${reservation.title}`);
    },
  },

  mounted() {
    this.fetchReservations();
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
h3 {
  margin-bottom: 20px;
}
.reservation {
  padding: 20px;
}
.section {
  margin-bottom: 40px;
}
.pagination-container {
  margin-top: 20px;
}
</style>
