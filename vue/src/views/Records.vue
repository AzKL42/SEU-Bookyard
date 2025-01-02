<template>
  <div class="record">
    <div class="record-header">
      <!-- 筛选状态 -->
      <el-select v-model="filterStatus" placeholder="筛选/选择状态" clearable>
        <el-option label="所有" value=""></el-option>
        <el-option label="已借阅" value="borrowed"></el-option>
        <el-option label="已归还" value="returned"></el-option>
      </el-select>
    </div>

    <!-- 借阅记录表格 -->
    <el-table 
      :data="paginatedRecords" 
      :default-sort="{ prop: 'actionDate', order: 'descending' }" 
      border 
      stripe
      style="width: 100%;"
    >
    <el-table-column v-if="false" prop="bookId" label="编号" style="width: 20%;"></el-table-column>  
    <el-table-column prop="bookName" label="书名" style="width: 20%;"></el-table-column>
      <el-table-column prop="userName" label="借阅人" style="width: 20%;"></el-table-column>
      <el-table-column prop="actionDate" label="借阅日期" sortable style="width: 20%;"></el-table-column>
      <el-table-column prop="returnDate" label="归还日期" style="width: 20%;"></el-table-column>
      <el-table-column prop="actionType" label="状态" style="width: 20%;">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.actionType)">
            {{ scope.row.actionType === "BORROW" ? "Borrowed" : "Returned" }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- 归还按钮列 -->
      <el-table-column label="操作" style="width: 15%;">
  <template #default="scope">
    <el-button
      v-if="scope.row.actionType === 'BORROW'"
      size="small"
      type="primary"
      @click="returnBook(scope.row)"
    >
      归还
    </el-button>
    <el-button
      v-else
      size="small"
      type="primary"
      :disabled="true"
    >
      已归还
    </el-button>
  </template>
</el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        layout="prev, pager, next, jumper"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="filteredRecords.length"
        :pager-count="11"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import request from "@/utils/request"; // 确保引入正确的封装 axios 实例
import request1 from "@/utils/request1"; // 确保引入正确的封装 axios 实例

export default {
  name: "Record",
  data() {
    return {
      records: [], // 初始化为空数组
      filterStatus: "", // 筛选状态
      currentPage: 1,
      pageSize: 16, // 每页显示条数
      user: null, // 存储当前用户信息
    };
  },
  computed: {
    filteredRecords() {
      // 根据状态筛选借阅记录
      const filtered = this.filterStatus
        ? this.records.filter((record) => record.status === this.filterStatus)
        : this.records;
      return filtered;
    },
    paginatedRecords() {
      // 根据当前页码分页
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredRecords.slice(start, end);
    },
  },
  methods: {
    async fetchRecords() {
      try {
        // 从 sessionStorage 获取当前用户信息
        let userJson = sessionStorage.getItem("userInfo");
        this.user = JSON.parse(userJson)?.user;

        if (!this.user) {
          alert("用户未登录，请先登录后再尝试");
          return;
        }

        // 使用从 sessionStorage 获取的用户 ID 发起请求
        const response = await request.get(`/record/queryByUserId`, {
          params: { userId: this.user.uid },
        });
        console.log(response)
        console.log(this.user.uid);
        this.records = response.data.map((item) => ({
          bookName: item.bookName || "未知书名", // 如果书名为 null，显示占位符
          userName: item.userName || "未知用户", // 如果用户名为 null，显示占位符
          actionDate: item.actionDate || "未知日期", // 确保日期字段有值
          returnDate: item.returnDate || "未归还", // 如果未归还则显示占位符
          actionType: item.actionType,
          bookId: item.bid,
        }));
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    },
    async returnBook(record) {
      console.log(record.bookId);
      console.log(this.user.uid);
    try {
      const response = await request1.post("/books/return", {
        bookId: record.bookId,
        userId: this.user.uid,
      });

      // 根据后端返回的结果，更新借阅记录
      alert(response);
      // 刷新数据
      this.fetchRecords();
    } catch (error) {
      console.error("Failed to return book:", error);
    }
  },
    handlePageChange(page) {
      this.currentPage = page;
    },
    getStatusType(actionType) {
      return actionType === "BORROW" ? "warning" : "success";
    },
    handleReturn(record) {
      // 处理归还操作，后续可以根据后端接口进行修改
      alert(`归还书籍: ${record.bookName}`);
      // 这里可以调用归还接口，更新借阅记录
    },
  },
  mounted() {
    this.fetchRecords(); // 组件加载完成后获取数据
  },
};
</script>

<style scoped>
.record {
  padding: 20px;
}

.record-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.pagination-container {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: #c9d6ff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px 20px;
  z-index: 10;
}
</style>
