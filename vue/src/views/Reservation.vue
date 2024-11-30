<!--
  @author: <Applepie>
  @date: 2024/11/30
  @description: 用户预约界面
-->

<template>
    <div class="reservation">
      <h2>预约界面</h2>
      <el-divider></el-divider>

      <!-- 当前预约记录 -->
      <div class="section">
        <h3>当前预约记录</h3>
        <el-table :data="paginatedReservations" border style="width: 100%">
            <el-table-column prop="title" label="书名" style="width: 20%" />
            <el-table-column prop="category" label="分类" style="width: 5%" />
            <el-table-column prop="language" label="语言" style="width: 5%" />
            <el-table-column prop="reservationDate" label="预约日期" style="width: 15%" />
            <el-table-column prop="status" label="状态" style="width: 15%">
                <template #default="scope">
                <el-tag :type="scope.row.status === 'confirmed' ? 'success' : 'warning'">
                    {{ scope.row.status === "confirmed" ? "已确认" : "待确认" }}
                </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="note" label="备注" style="width: 25%" />
            <el-table-column label="操作" style="width: 15%">
                <template #default="scope">
                    <el-button
                        type="danger"
                        size="mini"
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
  
      <!-- 新书预约 -->
      <div class="section">
        <h3>新书预约</h3>
        <el-input
          v-model="searchQuery"
          placeholder="搜索书名或作者"
          clearable
          class="search-input"
          style="width: 50%; margin-bottom: 20px"
        >
          <template #append>
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
            </el-button>
          </template>
        </el-input>
  
        <el-table :data="paginatedSearchResults" border style="width: 100%">
            <el-table-column prop="title" label="书名" style="width: 40%" />
            <el-table-column prop="author" label="作者" style="width: 20%" />
            <el-table-column prop="category" label="分类" style="width: 15%" />
            <el-table-column prop="language" label="语言" style="width: 15%" />
            <el-table-column label="操作" style="width: 10%">
            <template #default="scope">
                <el-button
                    type="primary"
                    size="mini"
                    @click="makeReservation(scope.row)"
                >
                预约
                </el-button>
            </template>
            </el-table-column>
        </el-table>
  
        <div class="pagination-container">
          <el-pagination
            layout="prev, pager, next"
            :current-page="searchCurrentPage"
            :page-size="searchPageSize"
            :total="filteredSearchResults.length"
            @current-change="handleSearchPageChange"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Reservation",
    data() {
      return {
        // 当前预约记录
        reservations: [
            {
                id: 1,
                title: "Book 1",
                category: "小说",
                language: "中文",
                reservationDate: "2024-10-01",
                status: "confirmed", // 已确认状态
                note: "请于三日内领取",
            },
            {
                id: 2,
                title: "Book 2",
                category: "科技",
                language: "英文",
                reservationDate: "2024-09-28",
                status: "pending", // 待确认状态
                note: "等待确认中",
            },
          // 更多预约记录...
        ],
        reservationCurrentPage: 1,
        reservationPageSize: 5,
  
        // 搜索和预约功能
        searchQuery: "",
        books: [
            { id: 1, title: "Book A", author: "Author A", category: "历史", language: "中文" },
            { id: 2, title: "Book B", author: "Author B", category: "科技", language: "英文" },
            // 更多书籍...
        ],
        searchCurrentPage: 1,
        searchPageSize: 5,
      };
    },
    computed: {
      // 当前预约记录分页
      paginatedReservations() {
        const start = (this.reservationCurrentPage - 1) * this.reservationPageSize;
        const end = start + this.reservationPageSize;
        return this.reservations.slice(start, end);
      },
      // 搜索结果筛选和分页
      filteredSearchResults() {
        return this.books.filter((book) =>
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      paginatedSearchResults() {
        const start = (this.searchCurrentPage - 1) * this.searchPageSize;
        const end = start + this.searchPageSize;
        return this.filteredSearchResults.slice(start, end);
      },
    },
    methods: {
      handleReservationPageChange(page) {
        this.reservationCurrentPage = page;
      },
      handleSearchPageChange(page) {
        this.searchCurrentPage = page;
      },
      handleSearch() {
        this.searchCurrentPage = 1; // 搜索后重置到第一页
      },
      cancelReservation(reservation) {
        this.reservations = this.reservations.filter((r) => r.id !== reservation.id);
        this.$message.success(`取消预约成功: ${reservation.title}`);
      },
      makeReservation(book) {
        this.reservations.push({
          id: Date.now(),
          title: book.title,
          category: book.category,
          language: book.language,
          reservationDate: new Date().toISOString().split("T")[0],
          status: "pending",
          note: "等待确认中",
        });
        this.$message.success(`预约成功: ${book.title}`);
      },
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
  