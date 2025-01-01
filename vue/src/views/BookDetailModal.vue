<template>
    <div v-if="isVisible" class="book-detail-overlay" @click="close">
      <div class="book-detail" @click.stop>
        <h2 class="book-title">{{ book.bname }}</h2>
        <p class="book-author"><strong>作者:</strong> {{ book.author }}</p>
        <p class="book-detail-text"><strong>简介:</strong> {{ book.detail }}</p>
        <p class="book-type"><strong>类型:</strong> {{ book.type }}</p>
        <p class="book-price"><strong>价格:</strong> ￥{{ book.price }}</p>

        <!-- 修改为使用 image 字段 -->
        <div v-if="book.image" class="book-image-container">
          <img :src="book.image" alt="Book Image" class="book-image" />
        </div>

        <div class="button-container">
          <button @click="close" class="close-btn">关闭</button>
          <button v-if="user.userType === 'admin'" @click="updateBook" class="borrow-btn">更新书籍信息</button>
          <button v-else @click="borrowBook" class="borrow-btn">借阅</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "BookDetailModal",
  data() {  
    return {
      user: {
        userName: "",
        email: "",
        userType: "",
      },
    };
  },
  props: {
    book: {
      type: Object,
      default: () => ({})
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    let userJson = sessionStorage.getItem("userInfo")
    // console.log(userJson)
    this.userInfo = JSON.parse(userJson)
    // console.log(this.userInfo)
    this.user = this.userInfo.user;
    console.log(this.user)
  },
  methods: {
    close() {
      this.$emit("close");
    },
    borrowBook() {
      // 这里可以加入借阅的逻辑，比如弹出借阅成功的提示或调用后端接口
      console.log(`借阅了《${this.book.bname}》`);
      this.$emit("close");  // 关闭弹窗
    },
    updateBook() {
      this.$router.push("/bookentry");
    }
  }
};
</script>

<style scoped>
/* 背景遮罩 */
.book-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;
}

/* 弹窗样式 */
.book-detail {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
}

/* 书名 */
.book-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

/* 作者 */
.book-author {
  font-size: 16px;
  color: #555;
  margin: 5px 0;
}

/* 书籍简介 */
.book-detail-text {
  font-size: 14px;
  color: #777;
  margin: 5px 0;
}

/* 类型 */
.book-type {
  font-size: 16px;
  font-weight: 600;
  color: #2196f3;
  margin: 10px 0;
}

/* 价格 */
.book-price {
  font-size: 16px;
  font-weight: 600;
  color: #2196f3;
  margin: 10px 0;
}

/* 图片容器 */
.book-image-container {
  margin-top: 20px;
  text-align: center;
}

/* 图片样式 */
.book-image {
  width: 100%;
  height: 300px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 按钮容器 */
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

/* 关闭按钮样式 */
.close-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 48%;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: #0056b3;
}

/* 借阅按钮样式 */
.borrow-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 48%;
  transition: background-color 0.3s ease;
}

.borrow-btn:hover {
  background-color: #218838;
}

/* 动画效果 */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
