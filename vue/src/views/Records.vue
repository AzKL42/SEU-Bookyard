<template>
    <div class="record">
      <div class="record-header">
        <!-- 筛选状态 -->
        <el-select v-model="filterStatus" placeholder="筛选/选择状态" clearable>
          <el-option label="所有" value=""></el-option>
          <el-option label="已借阅" value="borrowed"></el-option>
          <el-option label="已归还" value="returned"></el-option>
        </el-select>
      </div>
  
      <!-- 借阅记录表格 -->
      <el-table :data="paginatedRecords" :default-sort="{ prop: 'borrowDate', order: 'descending' }" border style="width: 100%;">
        <el-table-column prop="title" label="书名" width="250" ></el-table-column>
        <el-table-column prop="name" label="借阅人" width="250"></el-table-column>
        <el-table-column prop="borrowDate" label="借阅日期" sortable width="250"></el-table-column>
        <el-table-column prop="returnDate" label="归还日期" width="250"></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ scope.row.status === "borrowed" ? "Borrowed" : "Returned" }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          layout="prev, pager, next, jumper"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="filteredRecords.length"
          :pager-count="11"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Record",
    data() {
      return {
        records: [
          {
            id: 1,
            title: "Book 1",
            name: "User 1",
            borrowDate: "2024-11-01",
            returnDate: "2024-11-15",
            status: "returned",
          },
          {
            id: 2,
            title: "Book 2",
            name: "User 2",
            borrowDate: "2024-11-05",
            returnDate: "",
            status: "borrowed",
          },
          {
            id: 3,
            title: "Book 3",
            name: "User 3",
            borrowDate: "2024-10-20",
            returnDate: "2024-11-03",
            status: "returned",
          },
          {
            id: 4,
            title: "Book 4",
            name: "User 4",
            borrowDate: "2024-11-01",
            returnDate: "2024-11-15",
            status: "returned",
          },
          {
            id: 5,
            title: "Book 5",
            name: "User 5",
            borrowDate: "2024-11-05",
            returnDate: "",
            status: "borrowed",
          },
          {
            id: 6,
            title: "Book 6",
            name: "User 6",
            borrowDate: "2024-10-20",
            returnDate: "2024-11-03",
            status: "returned",
          },
          {
            id: 7,
            title: "Book 7",
            name: "User 7",
            borrowDate: "2024-11-01",
            returnDate: "2024-11-15",
            status: "returned",
          },
          {
            id: 8,
            title: "Book 8",
            name: "User 8",
            borrowDate: "2024-11-05",
            returnDate: "",
            status: "borrowed",
          },
          {
            id: 9,
            title: "Book 9",
            name: "User 9",
            borrowDate: "2024-10-20",
            returnDate: "2024-11-03",
            status: "returned",
          },
          {
            id: 10,
            title: "Book 10",
            name: "User 10",
            borrowDate: "2024-11-01",
            returnDate: "2024-11-15",
            status: "returned",
          },
          {
            id: 11,
            title: "Book 11",
            name: "User 11",
            borrowDate: "2024-11-05",
            returnDate: "",
            status: "borrowed",
          },
          {
            id: 12,
            title: "Book 12",
            name: "User 12",
            borrowDate: "2024-10-20",
            returnDate: "2024-11-03",
            status: "returned",
          },
          {
            id: 13,
            title: "Book 13",
            name: "User 13",
            borrowDate: "2024-11-01",
            returnDate: "2024-11-15",
            status: "returned",
          },
          {
            id: 14,
            title: "Book 14",
            name: "User 14",
            borrowDate: "2024-11-05",
            returnDate: "",
            status: "borrowed",
          },
          {
            id: 15,
            title: "Book 15",
            name: "User 15",
            borrowDate: "2024-10-20",
            returnDate: "2024-11-03",
            status: "returned",
          },
          {
            id: 16,
            title: "Book 16",
            name: "User 16",
            borrowDate: "2024-11-01",
            returnDate: "2024-11-15",
            status: "returned",
          },
          {
            id: 17,
            title: "Book 17",
            name: "User 17",
            borrowDate: "2024-11-05",
            returnDate: "",
            status: "borrowed",
          },
          {
            id: 18,
            title: "Book 18",
            name: "User 18",
            borrowDate: "2024-10-20",
            returnDate: "2024-11-03",
            status: "returned",
          },
          // 添加更多借阅记录
        ],
        filterStatus: "", // 筛选状态
        currentPage: 1,
        pageSize: 16, // 每页显示条数
      };
    },
    computed: {
      filteredRecords() {
        // 根据状态筛选借阅记录
        const filtered = this.filterStatus
          ? this.records.filter((record) => record.status === this.filterStatus)
          : this.records;
        return filtered;
      },
      paginatedRecords() {
        // 根据当前页码分页
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredRecords.slice(start, end);
      },
    },
    methods: {
      handlePageChange(page) {
        this.currentPage = page;
      },
      getStatusType(status) {
        return status === "borrowed" ? "warning" : "success";
      },
    },
  };
  </script>
  
  <style scoped>
  .record {
    padding: 20px;
  }
  
  .record-header {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .pagination-container {
    position: fixed;
    bottom: 20px; /* 距离页面底部的距离 */
    left: 50%; /* 水平居中 */
    transform: translateX(-50%); /* 水平居中偏移 */
  }
  </style>
  