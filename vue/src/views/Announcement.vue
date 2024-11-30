<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 公告页面
-->

<template>
    <div class="announcement-page">
      <div class="announcement-header">
        <el-input
          v-model="searchQuery"
          placeholder="搜索公告标题或内容"
          clearable
          class="search-input"
          style="width: 50%"
        >
          <template #append>
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
            </el-button>
          </template>
        </el-input>
      </div>
  
      <!-- 公告列表 -->
      <div class="announcement-list">
        <el-card
          v-for="announcement in paginatedAnnouncements"
          :key="announcement.id"
          shadow="hover"
          class="announcement-card"
        > <!--@click="viewAnnouncement(announcement)" -->
          <div class="announcement-title">{{ announcement.title }}</div>
          <div class="announcement-meta">
            <span class="announcement-date">{{ announcement.date }}</span>
            <span class="announcement-summary">{{ announcement.summary }}</span>
          </div>
        </el-card>
      </div>
  
      <div class="pagination-container">
        <!-- 分页 -->
        <el-pagination
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="filteredAnnouncements.length"
            @current-change="handlePageChange"
        />
      </div>
    </div>
</template>
  
<script>
export default {
    name: "Announcement",
    data() {
        return {
        searchQuery: "", // 搜索关键字
        announcements: [
            {
                id: 1,
                title: "系统维护通知",
                date: "2024-11-01",
                summary: "系统将于本周末进行维护，期间可能无法正常使用。",
                content: "详细内容：系统维护将从2024年11月1日晚10点持续到11月2日早6点...",
            },
            {
                id: 2,
                title: "图书馆新书推荐",
                date: "2024-10-25",
                summary: "本周图书馆新增100本热门书籍，欢迎借阅。",
                content: "详细内容：新增书籍包括小说、科技、历史等分类...",
            },
            // 更多公告...
        ],
            currentPage: 1,
            pageSize: 14, // 每页显示条数
        };
    },
    computed: {
        // 根据搜索关键字过滤公告
        filteredAnnouncements() {
            return this.announcements.filter(
                (announcement) =>
                announcement.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                announcement.content.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        // 分页后的公告列表
        paginatedAnnouncements() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredAnnouncements.slice(start, end);
        },
    },
    methods: {
        handleSearch() {
            this.currentPage = 1; // 搜索后重置到第一页
        },
        handlePageChange(page) {
            this.currentPage = page; // 更新当前页码
        },
        // viewAnnouncement(announcement) {
        //     // 点击公告后跳转到详情页，传递公告数据
        //     this.$router.push({ name: "AnnouncementDetail", params: { id: announcement.id } });
        // },
    },
};
</script>
  
<style scoped>
.announcement-page {
    padding: 20px;
}

.announcement-header {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}

.announcement-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.announcement-card {
    cursor: pointer;
}

.announcement-title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
}

.announcement-meta {
    color: #666;
    font-size: 14px;
}

.announcement-date {
    margin-right: 10px;
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
  