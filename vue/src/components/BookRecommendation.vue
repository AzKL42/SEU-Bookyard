<template>
    <el-card style="max-width: 100%; max-height: 100%; margin: auto;;" class="recommendation-container" shadow="always">
        <template #header>
            <div class="card-header">
                <span>推荐书籍</span>
            </div>
        </template>
        <div class="book-list">
            <div v-for="book in books" :key="book.id" class="book-item">
            <img :src="book.cover" alt="Book Cover" />
            <p>{{ book.title }}</p>
            </div>
        </div>
    </el-card>

  </template>
  
  <script>
  export default {
    name: "BookRecommendation",
    data() {
      return {
        books: [
          { id: 1, title: "瓦尔登湖", cover: "/img/Walden.jpg" },
          { id: 2, title: "简·爱", cover: "/img/JaneEyre.jpg" },
          { id: 3, title: "海底两万里", cover: "/img/Underwater.jpg" },
          { id: 4, title: "天龙八部", cover: "/img/TianlongBaBu.jpg" },
          { id: 5, title: "党建", cover: "/img/PartyBuilding.jpg" },
          { id: 6, title: "一千零一夜", cover: "/img/Thousand.jpg" },
          { id: 7, title: "爱的教育", cover: "/img/Love.jpg" },
          { id: 8, title: "计算机网络安全", cover: "/img/CyberSecurity.jpg" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .recommendation-container {
    margin-top: 20px;
    background: linear-gradient(90deg, #e2e2e2, #c9d6ff)
  }
  .book-list {
    display: flex;
    gap: 10px;
  }
  .book-item {
    text-align: center;
    width: 200px;
    height: 250px;
  }
  </style>
  