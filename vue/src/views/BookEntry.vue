<template>
  <div class="book-entry-container">
    <h2 class="title">图书入库</h2>
    <el-form
      ref="bookForm"
      :model="bookForm"
      :rules="rules"
      label-width="120px"
      class="book-entry-form"
    >
      <!-- 书名 -->
      <el-form-item label="书名" prop="bname">
        <el-input v-model="bookForm.bname" placeholder="请输入书名" />
      </el-form-item>

      <!-- 作者 -->
      <el-form-item label="作者" prop="author">
        <el-input v-model="bookForm.author" placeholder="请输入作者" />
      </el-form-item>

      <!-- 出版社 -->
      <el-form-item label="出版社" prop="printer">
        <el-input v-model="bookForm.printer" placeholder="请输入出版社" />
      </el-form-item>

      <!-- 分类 -->
      <el-form-item label="分类" prop="type">
        <el-select v-model="bookForm.type" placeholder="请选择分类">
          <el-option label="治愈" value="治愈" />
          <el-option label="童话" value="童话" />
          <el-option label="小说" value="小说" />
          <el-option label="管理学" value="管理学" />
          <el-option label="历史" value="历史" />
          <el-option label="心理" value="心理" />
          <el-option label="文学" value="文学" />
          <el-option label="经济" value="经济" />
          <el-option label="政治理论" value="政治理论" />
          <el-option label="艺术" value="艺术" />
          <el-option label="社会科学" value="社会科学" />
          <el-option label="计算机" value="计算机" />
        </el-select>
      </el-form-item>

      <!-- 出版日期 + 价格 -->
      <div style="display: flex; justify-content: space-between;">
        <el-form-item label="出版日期" prop="date" flex="1">
          <el-date-picker
            v-model="bookForm.date"
            type="date"
            placeholder="选择出版日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="价格" prop="price" style="flex: 1; margin-left: 20px;">
          <el-input v-model="bookForm.price" placeholder="请输入价格" style="width: 100%;"/>
        </el-form-item>
      </div>
      

      <!-- 备注 -->
      <el-form-item label="备注" prop="detail">
        <el-input v-model="bookForm.detail" />
      </el-form-item>

      <!-- 封面图片 -->
      <el-form-item label="封面图片" prop="image">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :limit="1"
          :on-success="handleUploadSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import request from "../utils/request";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  name: "BookEntry",
  data() {
    return {
      bookForm: {
        bname: "tbk1",
        detail: "入库测试",
        price: "1",
        author: "tau1",
        printer: "tpr1",
        date: "",
        type: "",
        image: null, // 上传的封面图片 URL
      },
      rules: {
        bname: [{ required: true, message: "请输入书名", trigger: "blur" }],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        printer: [{ required: true, message: "请输入出版社", trigger: "blur" }],
        type: [{ required: true, message: "请选择分类", trigger: "change" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        date: [
          { required: true, message: "请选择出版日期", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.bookForm.validate((valid) => {
        if (valid) {
          request.post("/books/add", {
            bname: this.bookForm.bname,
            detail: this.bookForm.detail,
            price: this.bookForm.price,
            author: this.bookForm.author,
            printer: this.bookForm.printer,
            date: this.bookForm.date,
            type: this.bookForm.type,
            image: this.bookForm.image,
          }).then((response) => {
            console.log('Response:', response); // Debugging line to see the actual response
            // console.log(typeof response.data);

            if (response.data.code === 200) {
              ElMessage.success("图书入库成功！");
              // router.push("/book/list");
            } else {
              ElMessage.error("图书入库失败！");
            }
          }).catch(error => {
            console.error('Error:', error); // Debugging line to see the actual error

            if (error.response) {
              // 请求已发出，但服务器响应的状态码不在 2xx 范围内
              console.error(`Error: ${error.response.status}, Message: ${error.response.statusText}`);
              ElMessage.error(`请求错误：${error.response.status} - ${error.response.statusText}`);

              // 检查是否有 data 字段，并进一步检查 message 或 error 字段
              if (error.response.data && typeof error.response.data === 'object') {
                ElMessage.error(error.response.data.message || error.response.data.error || "未知错误");
              }
            } else if (error.request) {
              // 请求已发出，但没有收到响应
              console.error('No response received');
              ElMessage.error('网络连接错误');
            } else {
              // 发起请求时发生了某些错误
              console.error('Error setting up the request:', error.message);
              ElMessage.error('请求设置错误');
            }
          });
        } else {
          this.$message.error("请完整填写表单！");
        }
      });
    },
    resetForm() {
      this.$refs.bookForm.resetFields();
    },
    handleUploadSuccess(response, file) {
      this.bookForm.image = file.url;
      this.$message.success("封面上传成功！");
    },
  },
};
</script>
  
<style scoped>
.book-entry-container {
    width: 80%;
    margin: 50px auto;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
}

.book-entry-form {
    width: 90%;
    display: flex;
    flex-direction: column;
}

.el-button {
    margin-top: 10px;
    width: 40%;
    height: 36px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    cursor: pointer;
    font-weight: 600;
}
</style>
  