<template>
  <div class="book-entry-container">
    <h2 class="title">图书入库</h2>
    <el-tabs v-model="activeTab" class="book-entry-tabs">
      <!-- 单个添加 -->
      <el-tab-pane label="单个添加" name="singleAdd">
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
            <!-- <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :limit="1"
              :on-success="handleUploadSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload> -->
            <el-input v-model="bookForm.image" placeholder="请输入图片URL" style="width: 100%;"/>
          </el-form-item>

          <!-- 操作按钮 -->
          <el-form-item>
            <div class="btn-group">
              <el-button class="single-add-btn" type="primary" @click="submitForm">提交</el-button>
              <el-button class="single-add-btn" type="primary" @click="updateForm">更新</el-button>
              <el-button class="single-add-btn" @click="resetForm">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 批量导入 -->
      <el-tab-pane label="批量导入" name="bulkImport">
        <!-- 添加模板下载链接 -->
        <a download class="download-link">
          <el-button type="primary" @click="downloadTemplate">下载模板</el-button>
        </a>

        <el-upload
          class="upload-demo"
          drag
          :auto-upload="false"
          multiple
          style="width: 100%;"
          list-type="text"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-success="handleBulkImportSuccess"
          :on-change="handleChange"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              csv, xls, xlsx, files with a size less than 5mb
            </div>
          </template>
        </el-upload>

        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="importSubmitForm">导入</el-button>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
  
<script>
import uploadRequest from "../utils/uploadRequest";
import request from "../utils/request";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  name: "BookEntry",
  data() {
    return {
      activeTab: "singleAdd",
      bookForm: {
        bname: "tbk1",
        detail: "入库测试",
        price: "1",
        author: "tau1",
        printer: "tpr1",
        date: "",
        type: "",
        image: "/img/test.jpg", // 上传的封面图片 URL
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
      fileList: [], // 批量导入的文件列表
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

            if (response.status=== 201) {
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
    updateForm() {
      this.$refs.bookForm.validate((valid) => {
        if (valid) {
          request.post("/books/update", {
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

            if (response.status=== 201) {
              ElMessage.success("图书更新成功！");
              // router.push("/book/list");
            } else {
              ElMessage.error("图书更新失败！");
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
    handleChange(file, fileList) {
      console.log('Selected files:', fileList); // 调试信息
      this.fileList = fileList; // 保留所有文件，或根据需要调整
    },
    beforeUpload(file) {
      const isExcel = file.type === 'application/vnd.ms-excel' || 
                    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isExcel) {
        ElMessage.error('只能上传 Excel 文件！');
      }
      if (!isLt5M) {
        ElMessage.error('上传文件大小不能超过 5MB!');
      }
      return isExcel && isLt5M;
    },
    handleBulkImportSuccess(response, file, fileList) {
      if (response.code === 200) {
        ElMessage.success("批量导入成功！");
      } else {
        ElMessage.error("批量导入失败！");
      }
    },
    downloadTemplate() {
      request.get("/books/download-book-template", { responseType: "blob" }).then((response) => {
        // 尝试从响应头中获取文件名
        const contentDisposition = response.headers['content-disposition'];
        let filename = "book_template.xlsx"; // 默认文件名
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="([^"]+)"/);
          if (match && match[1]) {
            filename = decodeURIComponent(match[1]);
          }
        }

        // 创建一个临时链接来触发下载
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename); // 使用从响应头中获取的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // 下载完成后移除临时链接
        window.URL.revokeObjectURL(url); // 释放对象 URL
      }).catch((error) => {
        console.error('Error downloading template:', error);
        ElMessage.error('模板下载失败，请稍后再试。');
      });
    },
    importSubmitForm() {
      console.log('Current fileList:', this.fileList); // 输出当前的 fileList
      if (!this.fileList || this.fileList.length === 0) {
        ElMessage.warning('请先选择要上传的文件');
        return;
      }

      // 创建 FormData 对象
      const formData = new FormData();
      
      // 遍历 fileList 并将每个文件添加到 formData
      this.fileList.forEach((file) => {
        console.log('Adding file:', file.raw); // 日志输出以确认文件存在
        formData.append('file', file.raw);
      });

      // 发送文件到后端
      uploadRequest.post("/books/import", formData)
        .then((response) => {
          if (response.data.startsWith("书籍导入成功")) {
            ElMessage.success(response.data);
          } else {
            ElMessage.error(response.data);
          }
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          ElMessage.error('文件上传失败，请稍后再试。');
        });
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

.book-entry-tabs {
    width: 80%;
}

.download-link {
  display: block;
  margin-bottom: 20px;
}

.download-link .el-button {
  width: 100%;
  background: #7494ec;
}

.btn-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.single-add-btn {
  flex: 1;
  width: 30%;
  height: 36px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
}
</style>
  