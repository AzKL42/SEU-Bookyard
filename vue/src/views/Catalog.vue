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
      </div>
  
      <div class="book-list">
        <BookCard
          v-for="book in paginatedBooks"
          :key="book.id"
          :book="book"
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
    </div>
  </template>
  
<script>
import BookCard from "@/components/Bookcard.vue";
import { Search } from "@element-plus/icons-vue";

export default {
    name: "Catalog",
    components: {
        BookCard,
    },
    data() {
        return {
            books: [
                { id: 1, title: "Book 1", author: "Author 1", cover: "/img/book1.jpg" },
                { id: 2, title: "Book 2", author: "Author 2", cover: "/img/book2.jpg" },
                { id: 3, title: "Book 3", author: "Author 3", cover: "/img/book3.jpg" },
                { id: 4, title: "Book 4", author: "Author 4", cover: "/img/Walden.jpg" },
                { id: 5, title: "Book 5", author: "Author 5", cover: "/img/CyberSecurity.jpg" },
                { id: 6, title: "Book 6", author: "Author 6", cover: "/img/Underwater.jpg" },
                { id: 7, title: "Book 7", author: "Author 7", cover: "/img/Thousand.jpg" },
                { id: 8, title: "Book 8", author: "Author 8", cover: "/img/TianlongBaBu.jpg" },
                { id: 9, title: "Book 9", author: "Author 9", cover: "/img/PartyBuilding.jpg" },
                { id: 10, title: "Book 10", author: "Author 10", cover: "/img/JaneEyre.jpg" },
                { id: 11, title: "Book 1", author: "Author 1", cover: "/img/book1.jpg" },
                { id: 12, title: "Book 2", author: "Author 2", cover: "/img/book2.jpg" },
                { id: 13, title: "Book 3", author: "Author 3", cover: "/img/book3.jpg" },
                { id: 14, title: "Book 4", author: "Author 4", cover: "/img/Walden.jpg" },
                { id: 15, title: "Book 5", author: "Author 5", cover: "/img/CyberSecurity.jpg" },
                { id: 16, title: "Book 6", author: "Author 6", cover: "/img/Underwater.jpg" },
                { id: 17, title: "Book 7", author: "Author 7", cover: "/img/Thousand.jpg" },
                { id: 18, title: "Book 8", author: "Author 8", cover: "/img/TianlongBaBu.jpg" },
                { id: 19, title: "Book 9", author: "Author 9", cover: "/img/PartyBuilding.jpg" },
                { id: 20, title: "Book 10", author: "Author 10", cover: "/img/JaneEyre.jpg" },
                { id: 21, title: "Book 1", author: "Author 1", cover: "/img/book1.jpg" },
                { id: 22, title: "Book 2", author: "Author 2", cover: "/img/book2.jpg" },
                { id: 23, title: "Book 3", author: "Author 3", cover: "/img/book3.jpg" },
                { id: 24, title: "Book 4", author: "Author 4", cover: "/img/Walden.jpg" },
                { id: 25, title: "Book 5", author: "Author 5", cover: "/img/CyberSecurity.jpg" },
                { id: 26, title: "Book 6", author: "Author 6", cover: "/img/Underwater.jpg" },
                { id: 27, title: "Book 7", author: "Author 7", cover: "/img/Thousand.jpg" },
                { id: 28, title: "Book 8", author: "Author 8", cover: "/img/TianlongBaBu.jpg" },
                { id: 29, title: "Book 9", author: "Author 9", cover: "/img/PartyBuilding.jpg" },
                { id: 30, title: "Book 10", author: "Author 10", cover: "/img/JaneEyre.jpg" },
                // 添加更多图书数据
            ],
            searchQuery: "",
            currentPage: 1,
            pageSize: 14, // 每页显示的图书数量
        };
    },
    computed: {
        filteredBooks() {
            // 根据搜索关键字过滤图书
            return this.books.filter((book) =>
                book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        },
        paginatedBooks() {
            // 根据当前页码分页
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredBooks.slice(start, end);
        },
    },
    methods: {
        handleSearch() {
            // 重置分页到第一页
            this.currentPage = 1;
        },
        handlePageChange(page) {
            this.currentPage = page;
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
</style>
  