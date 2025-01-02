<template>
  <div class="borrow-or-renew">
    <h2>续借</h2>
    <el-divider></el-divider>

    <!-- 当前借阅列表 -->
    <div class="section">
      <h3>当前借阅</h3>
      <el-table :data="paginatedBorrowedBooks" border style="width: 100%">
        <el-table-column v-if="false" prop="bookId" label="书编号" style="width: 20%;" />
        <el-table-column prop="title" label="书名" style="width: 20%;" />
        <el-table-column prop="borrowDate" label="借阅日期" style="width: 20%;" />
        <el-table-column prop="dueDate" label="到期日期" style="width: 20%;" />
        <el-table-column label="状态" style="width: 20%;">
          <template #default="scope">
            <el-tag :type="scope.row.overdue ? 'danger' : 'success'">
              {{ scope.row.overdue ? "逾期" : "正常" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="width: 20%;">
          <template #default="scope">
            <el-button
              type="primary"
              size="mini"
              @click="renewBook(scope.row)"
              :disabled="scope.row.overdue"
            >
              续借
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          layout="prev, pager, next"
          :current-page="borrowedCurrentPage"
          :page-size="borrowedPageSize"
          :total="borrowedBooks.length"
          @current-change="handleBorrowedPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request"; // 确保正确引入封装好的 axios 实例
import request1 from "@/utils/request1"; // 确保正确引入封装好的 axios 实例

export default {
  name: "BorrowOrRenew",
  data() {
    return {
      borrowedBooks: [], // 动态获取的当前借阅书籍
      borrowedCurrentPage: 1,
      borrowedPageSize: 5,
    };
  },
  computed: {
    // 当前借阅分页
    paginatedBorrowedBooks() {
      const start = (this.borrowedCurrentPage - 1) * this.borrowedPageSize;
      const end = start + this.borrowedPageSize;
      return this.borrowedBooks.slice(start, end);
    },
  },
  methods: {
    async fetchBorrowedBooks() {
      try {
        const userJson = sessionStorage.getItem("userInfo");
        const user = JSON.parse(userJson)?.user;

        if (!user) {
          this.$message.error("用户未登录，请先登录后再尝试。");
          return;
        }

        const response = await request.get("/record/queryByUserId", {
          params: { userId: user.uid },
        });
        console.log(response);

        this.borrowedBooks = response.data
        .filter(record => record.actionType === "BORROW"|| record.actionType === "REBORROW")  // 只保留 actionType 为 BORROW 的项
        .map((record) => ({
          bookId: record.bid,
          title: record.bookName || "未知书名",
          borrowDate: record.actionDate || "未知日期",
          dueDate: record.returnDate || "未知日期",
          actionType: record.actionType,
          overdue: new Date(record.returnDate) < new Date(),
        }));
        console.log(this.borrowedBooks);
      } catch (error) {
        console.error("Failed to fetch borrowed books:", error);
        this.$message.error("获取借阅信息失败，请稍后重试。");
      }
    },

    async renewBook(book) {
      try {
        const userJson = sessionStorage.getItem("userInfo");
        const user = JSON.parse(userJson)?.user;

        if (!user) {
          this.$message.error("用户未登录，请先登录后再尝试。");
          return;
        }

        const response = await request1.post("/books/reborrow", {
          bookId: book.bookId,
          userId: user.uid,
        });

        console.log(response);
        this.$message.success(response);
        this.fetchBorrowedBooks(); // 续借成功后刷新数据
      } catch (error) {
        console.error("Failed to renew book:", error);
        if (error.response && error.response.data) {
          this.$message.error(error.response.data.message);
        } else {
          this.$message.error("续借失败，请稍后重试。");
        }
      }
    },

    handleBorrowedPageChange(page) {
      this.borrowedCurrentPage = page;
    },
  },
  mounted() {
    this.fetchBorrowedBooks(); // 组件加载完成后获取数据
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

.borrow-or-renew {
  padding: 20px;
}

.section {
  margin-bottom: 40px;
}

.pagination-container {
  position: fixed;
  bottom: 20px; /* 距离页面底部的距离 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中偏移 */
  z-index: 10; /* 保证能显示在所有组件上方，防止遮挡 */
}

.el-button {
  width: 50%;
}
</style>
