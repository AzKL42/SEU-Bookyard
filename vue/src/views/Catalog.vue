<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 全部图书目录页面
-->

<template>
  <div class="catalog">
    <div class="catalog-header">
      <el-input
        v-model="searchQuery"
        placeholder="Search books..."
        clearable
        @input="handleSearch"
      >
          <template #suffix>
              <el-icon><Search /></el-icon>
          </template>
      </el-input>

      <el-button class="sort-btn" @click="sortBooksBySales">
        按借阅量排序<el-icon><Sort /></el-icon>
      </el-button>
      <el-button class="sort-btn" @click="sortBooksByDate">
        按上新时间排序<el-icon><Sort /></el-icon>
      </el-button>
      <el-button class="sort-btn" @click="sortBooksByStore">
        按库存量排序<el-icon><Sort /></el-icon>
      </el-button>
    </div>

    <div class="book-list">
      <BookCard
        v-for="book in paginatedBooks"
        :key="book.id"
        :book="book"
        @click="showBookDetails(book)"
      />
    </div>

    <div class="pagination-container">
      <el-pagination
          background layout="prev, pager, next, jumper"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="filteredBooks.length"
          :pager-count="11"
          @current-change="handlePageChange"
      />
    </div>

    <BookDetailModal
      :book="selectedBook"
      :isVisible="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script>
import BookCard from "@/components/Bookcard.vue";
import BookDetailModal from "@/views/BookDetailModal.vue";
import { Search } from "@element-plus/icons-vue";
import request from "@/utils/request";

export default {
  name: "Catalog",
  components: {
      BookCard,
      BookDetailModal,
  },
  data() {
      return {
        books: [
            // { id: 1, title: "Book 1", author: "Author 1", cover: "/img/book1.jpg" },
            // { id: 2, title: "Book 2", author: "Author 2", cover: "/img/book2.jpg" },
            // { id: 3, title: "Book 3", author: "Author 3", cover: "/img/book3.jpg" },
            // { id: 4, title: "Book 4", author: "Author 4", cover: "/img/Walden.jpg" },
            // { id: 5, title: "Book 5", author: "Author 5", cover: "/img/CyberSecurity.jpg" },
            // { id: 6, title: "Book 6", author: "Author 6", cover: "/img/Underwater.jpg" },
            // 添加更多图书数据
        ],
        searchQuery: "",
        currentPage: 1,
        pageSize: 14, // 每页显示的图书数量

        // 以下是排序相关的属性
        sortField: null, // 排序类型，默认无排序
        sortOrder: "desc", // 排序顺序，默认降序
        selectedBook: null, // **当前选择的书籍**
        isModalVisible: false, // **控制弹窗显示与否**
      };
  },
  computed: {
      filteredBooks() {
          // 根据搜索关键字过滤图书
          return this.books.filter((book) =>
              book.bname.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
      },
      paginatedBooks() {
          // 根据当前页码分页
          const start = (this.currentPage - 1) * this.pageSize;
          const end = start + this.pageSize;
          return this.filteredBooks.slice(start, end);
      },
  },
  created() {
    this.fetchBooks();
  },
  methods: {
      fetchBooks() {
        request.get('/books/all')
          .then(response => {
            this.books = response.data; // 获取到所有图书数据
            console.log('Fetched Books:', this.books);
            //sessionStorage.setItem('books', JSON.stringify(response));
          })
          .catch(error => {
            console.error('Error fetching books:', error);
          });
      },
      handleSearch() {
          // 重置分页到第一页
          this.currentPage = 1;
      },
      handlePageChange(page) {
          this.currentPage = page;
      },
      handleSort(field) {
        if (this.sortField === field) {
            // 如果是相同的字段，则切换排序顺序
            this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
        } else {
            // 否则设置为升序
            this.sortField = field;
            this.sortOrder = 'desc';
        }
        this.currentPage = 1; // 每次排序后重置分页到第一页
        this.sortBooks();
      },
      sortBooks() {
          const order = this.sortOrder === 'desc' ? 1 : -1;
          this.books.sort((a, b) => {
              let result = 0;

              switch (this.sortField) {
                  case 'sales':
                      result = a.sales - b.sales;
                      break;
                  case 'date':
                      // 将日期字符串转换为 Date 对象再比较
                      result = new Date(a.date) - new Date(b.date);
                      break;
                  case 'store':
                      result = a.store - b.store;
                      break;
                  default:
                      break;
              }

              return result * order;
          });
      },
      sortBooksBySales() {
          this.handleSort('sales');
      },
      sortBooksByDate() {
          this.handleSort('date');
      },
      sortBooksByStore() {
          this.handleSort('store');
      },

      // **显示书籍详细信息**
      showBookDetails(book) {
        this.selectedBook = book;
        this.isModalVisible = true; // **显示弹窗**
      },

      // **关闭弹窗**
      closeModal() {
        this.isModalVisible = false;
        this.selectedBook = null; // 清空书籍信息
      },
  },
};
</script>

<style scoped>
.catalog {
  padding: 20px;
}
.catalog-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}
.pagination-container {
  position: fixed;
  bottom: 20px; /* 距离页面底部的距离 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中偏移 */
  background: #c9d6ff; /* 可选：背景色 */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* 可选：阴影 */
  border-radius: 8px; /* 可选：圆角 */
  padding: 10px 20px; /* 可选：内边距 */
}

.sort-btn {
  margin-left: 10px;
  background: #c9d6ff;
  border: 1px solid #c9d6ff;
  border-radius: 4px;
  padding: 5px 10px;
}
</style>
