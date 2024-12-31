<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 分类图书页面
-->

<template>
  <div class="catalog-category">
    <div class="catalog-header">
      <!-- 分类选择 -->
      <el-select v-model="selectedType" placeholder="主题分类" clearable @change="handleCategoryChangeType" style="width: 15%">
        <el-option v-for="type in types" :key="type.value" :label="type.label" :value="type.value" />
      </el-select>
      <el-select v-model="selectedLanguage" placeholder="语言分类" clearable @change="handleCategoryChangeLanguage" style="width: 15%">
        <el-option v-for="language in languages" :key="language.value" :label="language.label" :value="language.value" />
      </el-select>
      <el-select v-model="selectedFormat" placeholder="形式分类" clearable @change="handleCategoryChangeFormat" style="width: 15%">
        <el-option v-for="format in formats" :key="format.value" :label="format.label" :value="format.value" />
      </el-select>
      <el-select v-model="selectedUsage" placeholder="用途分类" clearable @change="handleCategoryChangeUsage" style="width: 15%">
        <el-option v-for="usage in usages" :key="usage.value" :label="usage.label" :value="usage.value" />
      </el-select>
      <el-input
        v-model="searchQuery"
        placeholder="搜索书名、作者或分类"
        clearable
        class="search-input"
        style="width: 30%"
      >
        <template #append>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
          </el-button>
        </template>
      </el-input>
    </div>

    <!-- 图书列表 -->
    <div class="book-list">
      <BookCard v-for="book in paginatedBooks" :key="book.bid" :book="book" />
    </div>

    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="filteredBooks.length"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
import BookCard from "@/components/Bookcard.vue";
import request from "@/utils/request";

export default {
  name: "CatalogByCategory",
  components: { BookCard },
  data() {
    return {
      // 分类内容
      types: [
        { label: "治愈", value: "治愈" },
        { label: "童话", value: "童话" },
        { label: "小说", value: "小说" },
        { label: "管理学", value: "管理学" },
        { label: "历史", value: "历史" },
        { label: "心理", value: "心理" },
        { label: "文学", value: "文学" },
        { label: "经济", value: "经济" },
        { label: "政治理论", value: "政治理论" },
        { label: "艺术", value: "艺术" },
        { label: "社会科学", value: "社会科学" },
        { label: "计算机", value: "计算机" },
      ],
      languages: [
        { label: "English", value: "english" },
        { label: "Chinese", value: "chinese" },
        { label: "French", value: "french" },
        { label: "German", value: "german" },
      ],
      formats: [
        { label: "E-book", value: "ebook" },
        { label: "Hardcover", value: "hardcover" },
        { label: "Paperback", value: "paperback" },
      ],
      usages: [
        { label: "Educational", value: "educational" },
        { label: "Leisure", value: "leisure" },
        { label: "Research", value: "research" },
      ],

      // 用户选择的分类
      // 如果选择器是单选，v-model 绑定的值应为字符串，并调整筛选逻辑。如果选择器是多选，v-model 绑定的值应为数组，确保筛选逻辑支持多选情况。
      selectedType: "",
      selectedLanguage: "",
      selectedFormat: "",
      selectedUsage: "",
      searchQuery: "", // 搜索关键词

      // 图书数据
      books: [
        // { id: 1, title: "Book 1", category: "fiction", language: "english", format: "hardcover", usage: "leisure", cover: "/img/book1.jpg" },
        // { id: 2, title: "Book 2", category: "science", language: "chinese", format: "ebook", usage: "educational", cover: "/img/book2.jpg" },
        // { id: 3, title: "Book 3", category: "history", language: "french", format: "paperback", usage: "research", cover: "/img/book3.jpg" },
        // { id: 4, title: "Book 4", category: "technology", language: "english", format: "ebook", usage: "educational", cover: "/img/Love.jpg" },
        // 更多图书数据
      ],

      currentPage: 1,
      pageSize: 14, // 每页显示条数
    };
  },
  computed: {
    // 根据分类和搜索关键词筛选图书
    filteredBooks() {
      return this.books.filter((book) => {
        const matchType = !this.selectedType || book.type === this.selectedType;
        const matchLanguage = !this.selectedLanguage || book.language === this.selectedLanguage;
        const matchFormat = !this.selectedFormat || book.format === this.selectedFormat;
        const matchUsage = !this.selectedUsage || book.usage === this.selectedUsage;
        const matchQuery =
          !this.searchQuery || book.bname.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchType && matchLanguage && matchFormat && matchUsage && matchQuery;
      });
    },
    // 分页后的图书列表
    paginatedBooks() {
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
          this.books = response.data.content; // 获取到所有图书数据
          console.log('Fetched Books:', this.books);
          //sessionStorage.setItem('books', JSON.stringify(response));
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    },
    handleCategoryChangeType() {
      this.currentPage = 1; // 切换分类后回到第一页
    },
    handleCategoryChangeLanguage() {
      this.currentPage = 1; // 切换分类后回到第一页
    },
    handleCategoryChangeFormat() {
      this.currentPage = 1; // 切换分类后回到第一页
    },
    handleCategoryChangeUsage() {
      this.currentPage = 1; // 切换分类后回到第一页
    },
    handleSearch() {
      this.currentPage = 1; // 搜索后回到第一页
    },
    handlePageChange(page) {
      this.currentPage = page; // 更新当前页码
    },
  },
};
</script>

<style scoped>
.catalog-category {
  padding: 20px;
}

.catalog-header {
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}
</style>
