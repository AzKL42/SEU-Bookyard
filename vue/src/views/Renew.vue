<!--
  @author: <Applepie>
  @date: 2024/11/30
  @description: 用户续借界面
-->

<template>
  <div class="borrow-or-renew">
    <h2>续借</h2>
    <el-divider></el-divider>

    <!-- 当前借阅列表 -->
    <div class="section">
      <h3>当前借阅</h3>
      <el-table :data="paginatedBorrowedBooks" border style="width: 100%">
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
export default {
  name: "BorrowOrRenew",
  data() {
    return {
      // 当前借阅书籍
      borrowedBooks: [
        {
          id: 1,
          title: "Book 1",
          borrowDate: "2024-10-01",
          dueDate: "2024-11-01",
          overdue: false,
        },
        {
          id: 2,
          title: "Book 2",
          borrowDate: "2024-09-15",
          dueDate: "2024-10-15",
          overdue: true,
        },
        // 更多书籍...
      ],
      borrowedCurrentPage: 1,
      borrowedPageSize: 5,

      // 新书借阅搜索
      searchQuery: "",
      books: [
        { id: 1, title: "Book A", author: "Author A" },
        { id: 2, title: "Book B", author: "Author B" },
        // 更多可借阅书籍...
      ],
      searchCurrentPage: 1,
      searchPageSize: 5,
    };
  },
  computed: {
    // 当前借阅分页
    paginatedBorrowedBooks() {
      const start = (this.borrowedCurrentPage - 1) * this.borrowedPageSize;
      const end = start + this.borrowedPageSize;
      return this.borrowedBooks.slice(start, end);
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
    handleBorrowedPageChange(page) {
      this.borrowedCurrentPage = page;
    },
    renewBook(book) {
      this.$message.success(`续借成功: ${book.title}`);
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
  z-index: 10; /* 保证能显示在所有组件上方，防止遮挡（有没有更好的办法？） */
}

.el-button {
  width: 50%;
}
</style>
  