<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 书本展示卡片组件
-->

<template>
    <div class="book-card">
      <img :src="book.cover" :alt="book.title" class="book-cover" />
      <div class="book-info">
        <h3 class="book-title">{{ book.title }}</h3>
        <p class="book-author">{{ book.author }}</p>
      </div>
    </div>
</template>
  
<script>
export default {
    name: "BookCard",
    props: {
        book: {
            type: Object,
            required: true,
        },
    },
};
</script>
  
<style scoped>
.book-card {
    border: 1px solid #ebeef5;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    transition: box-shadow 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.book-card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.book-cover {
    width: 100%;
    height: 250px;
    object-fit: cover;
}
.book-info {
    padding: 10px;
}
.book-title {
    font-size: 16px;
    margin: 0;
}
.book-author {
    font-size: 14px;
    color: #888;
    margin: 5px 0 0;
}
</style>
  