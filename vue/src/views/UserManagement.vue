<!--
  @author: <Applepie>
  @date: 2025/1/1
  @description: 用户管理页面
-->

<template>
    <div class="user-management">
      <div class="user-management-header">
        <!-- 查找用户 -->
        <el-input
            v-model="searchQuery"
            placeholder="查找用户..."
            clearable
            @input="handleSearch"
            style="width: 70%;"
        >
            <template #suffix>
                <el-icon><Search /></el-icon>
            </template>
        </el-input>

        <!-- 筛选状态 -->
        <el-select v-model="filterStatus" placeholder="筛选/选择状态" clearable style="width: 25%; margin-left: 10px;">
          <el-option label="所有" value=""></el-option>
          <el-option label="信誉良好" value="good"></el-option>
          <el-option label="信誉较差" value="bad"></el-option>
        </el-select>
      </div>
  
      <!-- 用户列表 -->
      <el-table 
        :data="paginatedRecords" 
        border 
        stripe
        style="width: 100%;"
      >
        <el-table-column prop="userName" label="用户名" style="width: 20%;" ></el-table-column>
        <el-table-column prop="password" label="密码" style="width: 20%;"></el-table-column>
        <el-table-column prop="email" label="邮箱" style="width: 20%;"></el-table-column>
        <el-table-column prop="credit" label="信誉积分" style="width: 10%;"></el-table-column>
        <el-table-column prop="userType" label="用户权限" style="width: 10%;">
          <template #default="scope">
            <el-tag>
              {{ scope.row.userType === "admin" ? "管理员" : "普通用户" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="信誉情况" style="width: 20%;">
            <template #default="scope">
            <el-tag :type="getStatusType(scope.row.credit)">
              {{ scope.row.credit >= 15 ? "信誉良好" : "信誉较差" }}
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
          :total="filteredUsers.length"
          :pager-count="11"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </template>
  
<script>
import request from "@/utils/request";

export default {
    name: "Record",
    data() {
        return {
            users: [
            ],
            currentPage: 1,
            pageSize: 16, // 每页显示条数
            searchQuery: "", // 搜索关键字
            filterStatus: "", // 筛选状态
        };
    },
    created() {
        this.fetchUsers();
    },
    computed: {
        filteredUsers() {
            let filtered = this.users;

            // 根据搜索关键字过滤用户
            if (this.searchQuery) {
                filtered = filtered.filter((user) =>
                user.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }

            // 根据筛选状态过滤用户
            if (this.filterStatus === 'good') {
                filtered = filtered.filter((user) => user.credit >= 15);
            } else if (this.filterStatus === 'bad') {
                filtered = filtered.filter((user) => user.credit < 15);
            }

            return filtered;
        },
        paginatedRecords() {
            // 根据当前页码分页
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredUsers.slice(start, end);
        },
    },
    methods: {
        fetchUsers() {
            request.get('/user/list')
            .then(response => {
                this.users = response.data; // 获取到所有用户数据
                console.log('Fetched Users:', this.users);
                //sessionStorage.setItem('books', JSON.stringify(response));
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        getStatusType(credit) {
            return credit >= 20 ? "success" : "error";
        },
    },
};
</script>
  
<style scoped>
.user-management {
  padding: 20px;
}

.user-management-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.pagination-container {
  position: fixed;
  bottom: 10px; /* 距离页面底部的距离 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中偏移 */
  background: #c9d6ff; /* 可选：背景色 */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* 可选：阴影 */
  border-radius: 8px; /* 可选：圆角 */
  padding: 10px 20px; /* 可选：内边距 */
  z-index: 10;
}
</style>
  